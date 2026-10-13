import type {
  AssessmentActivity,
  CapabilityLevel,
  CPMRating,
  CpmGateRule,
  CpmMethodConfig,
  CpmThresholds,
  LevelAssessmentResult,
  ObjectiveAssessmentData,
} from '../types';

/**
 * N/P/L/F percentage bands as resolved by ISO/IEC 33020:2019 §5.3
 * (N 0–≤15%; P >15–≤50%; L >50–≤85%; F >85–≤100%). COBIT 2019 I&M §6.4.2
 * states the same scale but is loose at the 15/50/85 boundaries.
 */
export const ISO_33020_THRESHOLDS: CpmThresholds = { nMax: 0.15, pMax: 0.50, lMax: 0.85 };

/**
 * Default operational rule set of the engine.
 *
 * COBIT 2019 ships **no Process Assessment Model and no mandated aggregation
 * formula** (ISACA Journal 2021, Vol. 6). This config therefore records our
 * explicit, inspectable adaptation — never an ISACA standard. The default gate
 * (`aggregate-85`) follows published Indonesian practice (Marcela & Fianty
 * 2023; Simatupang & Fianty 2023); the other gates are selectable so the rule
 * itself can be compared as a research finding.
 */
export const DEFAULT_CPM_CONFIG: CpmMethodConfig = {
  gate: 'aggregate-85',
  thresholds: { ...ISO_33020_THRESHOLDS },
  naPolicy: 'exclude-from-denominator',
};

export function getResponseScore(response: string | null | undefined): { score: number; isValid: boolean } {
  if (!response || response === 'N.A.') {
    return { score: 0, isValid: false };
  }
  switch (response) {
    case 'Yes':
      return { score: 1.0, isValid: true };
    case 'Partially':
      return { score: 0.5, isValid: true };
    case 'No':
      return { score: 0.0, isValid: true };
    default:
      return { score: 0, isValid: false };
  }
}

export function getCPMRating(
  percentage: number,
  thresholds: CpmThresholds = DEFAULT_CPM_CONFIG.thresholds
): CPMRating {
  if (percentage <= thresholds.nMax) return 'N';
  if (percentage <= thresholds.pMax) return 'P';
  if (percentage <= thresholds.lMax) return 'L';
  return 'F';
}

function resolvePerLevelGate(
  gate: CpmGateRule,
  gateResults: NonNullable<LevelAssessmentResult['gateResults']>
): boolean {
  switch (gate) {
    case 'aggregate-85':
      return gateResults.aggregate85;
    case 'all-l-or-f':
      return gateResults.allLOrF;
    case 'iso-staged':
      // Per-level view of the staged rule: can this level be *claimed*?
      return gateResults.isoStagedClaimed;
  }
}

export function evaluateActivitiesByLevel(
  activities: AssessmentActivity[],
  level: CapabilityLevel,
  config: CpmMethodConfig = DEFAULT_CPM_CONFIG
): LevelAssessmentResult {
  const levelActivities = activities.filter((a) => a.level === level);

  let validCount = 0;
  let naCount = 0;
  let totalScore = 0;

  for (const act of levelActivities) {
    const { score, isValid } = getResponseScore(act.response);
    if (isValid) {
      validCount += 1;
      totalScore += score;
    } else if (act.response === 'N.A.') {
      naCount += 1;
    }
  }

  const totalActivities = levelActivities.length;
  const fulfillmentPercentage = validCount > 0 ? totalScore / validCount : 0;
  const cpmRating = getCPMRating(fulfillmentPercentage, config.thresholds);

  // Honesty guard: a level whose activities are all N.A. has no evidence base.
  // "Not assessed" must not be silently read as "not achieved" (B7).
  const insufficientEvidence = totalActivities > 0 && validCount === 0;

  const gateResults = {
    aggregate85:
      !insufficientEvidence && fulfillmentPercentage > config.thresholds.lMax,
    allLOrF: validCount > 0 && totalScore === validCount,
    isoStagedLower: !insufficientEvidence && fulfillmentPercentage > config.thresholds.lMax,
    isoStagedClaimed: !insufficientEvidence && fulfillmentPercentage > config.thresholds.pMax,
  };

  const isComplete = !insufficientEvidence && resolvePerLevelGate(config.gate, gateResults);

  let status: LevelAssessmentResult['status'];
  if (insufficientEvidence) {
    status = 'Insufficient Evidence';
  } else {
    status = isComplete ? 'Complete!' : 'Stop Here!';
  }

  return {
    level,
    validCount,
    naCount,
    totalActivities,
    totalScore,
    fulfillmentPercentage,
    cpmRating,
    isComplete,
    status,
    insufficientEvidence,
    gateResults,
  };
}

/** Sequential climb under a simple per-level pass predicate. */
function climbByGate(
  levelResults: Record<number, LevelAssessmentResult>,
  gate: Exclude<CpmGateRule, 'iso-staged'>
): CapabilityLevel {
  let current: CapabilityLevel = 1;
  for (const lvl of [2, 3, 4, 5] as CapabilityLevel[]) {
    const result = levelResults[lvl];
    if (!result || result.insufficientEvidence) break;
    if (!result.gateResults) break;
    const passed =
      gate === 'aggregate-85'
        ? result.gateResults.aggregate85
        : result.gateResults.allLOrF;
    if (!passed) break;
    current = lvl;
  }
  return current;
}

/** ISO/IEC 33020 staged rule: lower levels must be Fully; the claimed level Largely. */
function climbIsoStaged(levelResults: Record<number, LevelAssessmentResult>): CapabilityLevel {
  let current: CapabilityLevel = 1;
  const allLevels: CapabilityLevel[] = [2, 3, 4, 5];
  for (const lvl of allLevels) {
    const result = levelResults[lvl];
    if (!result || result.insufficientEvidence || !result.gateResults) break;

    const lowerAllFully = allLevels
      .filter((x) => x < lvl)
      .every((x) => levelResults[x]?.gateResults?.isoStagedLower);

    if (!lowerAllFully || !result.gateResults.isoStagedClaimed) break;

    current = lvl;
    // Only a Fully level can support a higher claim; stop right after a Largely claim.
    if (!result.gateResults.isoStagedLower) break;
  }
  return current;
}

export function calculateObjectiveAssessment(
  objectiveId: string,
  targetLevel: CapabilityLevel,
  activities: AssessmentActivity[],
  config: CpmMethodConfig = DEFAULT_CPM_CONFIG
): ObjectiveAssessmentData {
  const levelResults: Record<number, LevelAssessmentResult> = {};

  // Levels evaluated: 2, 3, 4, 5 (level 1 is the assumed base).
  const evaluatedLevels: CapabilityLevel[] = [2, 3, 4, 5];
  for (const lvl of evaluatedLevels) {
    levelResults[lvl] = evaluateActivitiesByLevel(activities, lvl, config);
  }

  const currentLevelByGate: Record<CpmGateRule, CapabilityLevel> = {
    'aggregate-85': climbByGate(levelResults, 'aggregate-85'),
    'all-l-or-f': climbByGate(levelResults, 'all-l-or-f'),
    'iso-staged': climbIsoStaged(levelResults),
  };

  const currentLevel = currentLevelByGate[config.gate];
  const gap = Math.max(0, targetLevel - currentLevel);

  return {
    objectiveId,
    targetLevel,
    currentLevel,
    activities,
    levelResults,
    gap,
    methodConfig: config,
    currentLevelByGate,
  };
}
