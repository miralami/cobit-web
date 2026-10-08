import type {
  AssessmentActivity,
  CapabilityLevel,
  CPMRating,
  LevelAssessmentResult,
  ObjectiveAssessmentData,
} from '../types';

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

export function getCPMRating(percentage: number): CPMRating {
  if (percentage <= 0.15) return 'N';
  if (percentage <= 0.50) return 'P';
  if (percentage <= 0.85) return 'L';
  return 'F';
}

export function evaluateActivitiesByLevel(
  activities: AssessmentActivity[],
  level: CapabilityLevel
): LevelAssessmentResult {
  const levelActivities = activities.filter((a) => a.level === level);

  let validCount = 0;
  let totalScore = 0;

  for (const act of levelActivities) {
    const { score, isValid } = getResponseScore(act.response);
    if (isValid) {
      validCount += 1;
      totalScore += score;
    }
  }

  const fulfillmentPercentage = validCount > 0 ? totalScore / validCount : 0;
  const cpmRating = getCPMRating(fulfillmentPercentage);
  const isComplete = fulfillmentPercentage > 0.85;

  return {
    level,
    validCount,
    totalScore,
    fulfillmentPercentage,
    cpmRating,
    isComplete,
    status: isComplete ? 'Complete!' : 'Stop Here!',
  };
}

export function calculateObjectiveAssessment(
  objectiveId: string,
  targetLevel: CapabilityLevel,
  activities: AssessmentActivity[]
): ObjectiveAssessmentData {
  const levelResults: Record<number, LevelAssessmentResult> = {};

  // Levels evaluated: 2, 3, 4, 5
  const evaluatedLevels: CapabilityLevel[] = [2, 3, 4, 5];

  let currentLevel: CapabilityLevel = 1; // Base level is 1
  let gateOpen = true;

  for (const lvl of evaluatedLevels) {
    const result = evaluateActivitiesByLevel(activities, lvl);
    levelResults[lvl] = result;

    if (gateOpen && result.isComplete) {
      currentLevel = lvl;
    } else {
      gateOpen = false;
    }
  }

  const gap = Math.max(0, targetLevel - currentLevel);

  return {
    objectiveId,
    targetLevel,
    currentLevel,
    activities,
    levelResults,
    gap,
  };
}
