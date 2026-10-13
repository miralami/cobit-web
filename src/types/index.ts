export type COBITDomain = 'EDM' | 'APO' | 'BAI' | 'DSS' | 'MEA';

export type CapabilityLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ResponseRating =
  | 'Yes'
  | 'Partially'
  | 'No'
  | 'N.A.'
  | 'not-achieved'
  | 'partially-achieved'
  | 'largely-achieved'
  | 'fully-achieved';

export type CPMRating = 'N' | 'P' | 'L' | 'F';

export type AssessmentStatus = 'not-started' | 'in-progress' | 'completed' | 'archived';

/**
 * Gate rule that decides when a capability level is considered achieved.
 *
 * - `aggregate-85`  : mean fulfilment of a level > 85% (operational adaptation,
 *                     preceded by Marcela & Fianty 2023 / Simatupang & Fianty 2023)
 * - `all-l-or-f`    : every activity of the level is rated Largely or Fully
 *                     (Souza Neto, Almeida & Mira da Silva 2019, ISACA proposal)
 * - `iso-staged`    : lower levels need Fully, the claimed level needs Largely
 *                     (ISO/IEC 33020:2019 staged model)
 */
export type CpmGateRule = 'aggregate-85' | 'all-l-or-f' | 'iso-staged';

/** N/P/L/F percentage bands. F is implied by `> lMax`. */
export interface CpmThresholds {
  nMax: number; // <= nMax  => N
  pMax: number; // <= pMax  => P
  lMax: number; // <= lMax  => L, otherwise F
}

/**
 * The explicit, inspectable operational rule set applied by the engine.
 * COBIT 2019 mandates no aggregation formula (ISACA Journal 2021 Vol 6), so
 * this configuration *is* a documented design decision, not an ISACA standard.
 */
export interface CpmMethodConfig {
  gate: CpmGateRule;
  thresholds: CpmThresholds;
  /** How "not applicable" responses are treated. Kept explicit for auditability. */
  naPolicy: 'exclude-from-denominator';
}

export type EvidenceStatus = 'pending' | 'reviewed' | 'attached';

export interface DesignFactorWeights {
  df1: number; // default: 2
  df2: number; // default: 1
  df3: number; // default: 3
  df4: number; // default: 4
}

export interface DF1Input {
  growth: number;        // 1-5
  innovation: number;    // 1-5
  costLeadership: number;// 1-5
  clientService: number; // 1-5
}

export interface DF2Input {
  // EG01 through EG13 (1-5)
  goals: Record<string, number>;
}

export interface DF3Input {
  // 19 generic IT risk categories
  risks: Record<string, { impact: number; likelihood: number }>;
}

export interface DF4Input {
  // 20 generic IT-related issues (1-3)
  issues: Record<string, number>;
}

export interface DFCalculationResult {
  objectiveId: string;
  name: string;
  domain: COBITDomain;
  scoreDF1: number;
  scoreDF2: number;
  scoreDF3: number;
  scoreDF4: number;
  totalScore: number;
  normalizedScore: number; // -100 to +100
  suggestedTargetLevel: CapabilityLevel;
}

export interface AssessmentActivity {
  id: string;               // e.g. "DSS05.01-1"
  practiceCode?: string;    // e.g. "DSS05.01"
  activityNumber: number;   // e.g. 1
  level: CapabilityLevel;   // 2, 3, 4, or 5
  description: string;
  response: ResponseRating | null;
  comment: string;
  evidenceIds: string[];    // IDs of linked evidence
  evidenceSnippet?: string;
}

export interface LevelAssessmentResult {
  level: CapabilityLevel;
  validCount: number;
  totalScore: number;
  fulfillmentPercentage: number; // 0.0 - 1.0
  cpmRating: CPMRating;          // N, P, L, F (per-level band, judgment proxy)
  isComplete: boolean;           // true if the configured gate is passed
  status: 'Complete!' | 'Stop Here!' | 'Insufficient Evidence';
  naCount?: number;              // activities marked N.A. at this level
  totalActivities?: number;      // activities defined at this level
  insufficientEvidence?: boolean; // all defined activities are N.A. => cannot judge
  /** Outcome of every supported gate, so the thesis can report rule sensitivity. */
  gateResults?: {
    aggregate85: boolean;
    allLOrF: boolean;
    isoStagedLower: boolean;   // passes as a *lower* level (needs F)
    isoStagedClaimed: boolean; // passes as the *claimed* level (needs L or F)
  };
}

export interface ObjectiveAssessmentData {
  objectiveId: string;
  targetLevel: CapabilityLevel;
  currentLevel: CapabilityLevel;
  activities: AssessmentActivity[];
  levelResults: Record<number, LevelAssessmentResult>;
  gap: number;
  /** Method rule set used to compute this objective's result. */
  methodConfig?: CpmMethodConfig;
  /** Current level under each gate rule, for transparent rule comparison. */
  currentLevelByGate?: Record<CpmGateRule, CapabilityLevel>;
}

export interface EvidenceRecord {
  id: string;
  title: string;
  type: 'policy' | 'procedure' | 'record' | 'documentation' | 'log' | 'interview' | 'other';
  referenceNumber?: string;  // e.g. "SOP-TI-04" / "Interview 01:10:45"
  assessor: string;
  date: string;
  notes: string;
  linkedActivityIds: string[]; // IDs of activities this evidence supports
  status?: EvidenceStatus;
}

export interface RecommendationItem {
  id: string;
  objectiveId: string;
  practiceCode: string;
  gapDescription: string;
  peopleAspect: {
    type: 'Responsibility' | 'Skill & awareness' | 'Communication' | string;
    action: string;
  };
  processAspect: {
    type: 'Policy' | 'Procedure' | 'Record' | string;
    action: string;
  };
  technologyAspect: {
    type: 'Features' | 'Infrastructure' | 'Automation' | 'Tools' | string;
    action: string;
  };
}

export interface FullAssessmentState {
  id: string;
  title: string;
  organization: string;
  assessor: string;
  period: string;
  weights: DesignFactorWeights;
  df1: DF1Input;
  df2: DF2Input;
  df3: DF3Input;
  df4: DF4Input;
  dfResults: DFCalculationResult[];
  scopedObjectiveIds: string[];
  objectiveTargets: Record<string, CapabilityLevel>;
  assessments: Record<string, ObjectiveAssessmentData>;
  evidenceList: EvidenceRecord[];
  recommendations: RecommendationItem[];
  updatedAt: string;
  /** Explicit scoring rule set for this assessment (auditable method disclosure). */
  methodConfig?: CpmMethodConfig;
}

/** Compact, frozen metrics of an assessment at a point in time. */
export interface SnapshotSummary {
  totalObjectives: number;
  avgCurrentLevel: number;
  totalGap: number;
  achievedCount: number;
  evidenceCount: number;
  recommendationCount: number;
  rows: Array<{
    objectiveId: string;
    currentLevel: CapabilityLevel;
    targetLevel: CapabilityLevel;
    gap: number;
  }>;
}

/** Immutable snapshot used for period-over-period / unit comparison. */
export interface AssessmentSnapshot {
  id: string;
  assessmentId: string;
  label: string;
  createdAt: string;
  methodConfig: CpmMethodConfig;
  summary: SnapshotSummary;
}

// Legacy / Helper interfaces for compatibility with existing UI components
export interface COBITObjective {
  id: string;
  name: string;
  shortDescription: string;
  domain: COBITDomain;
  description: string;
  practices: Practice[];
}

export interface Practice {
  id: string;
  description: string;
  response?: ResponseRating;
  notes?: string;
  evidenceIds?: string[];
}

export interface Evidence {
  id: string;
  name: string;
  title?: string;
  type: 'policy' | 'procedure' | 'record' | 'documentation' | 'log' | 'interview' | 'other';
  status: 'attached' | 'pending' | 'reviewed';
  linkedItemId: string;
  assessor: string;
  date: string;
  notes?: string;
  linkedActivityIds?: string[];
}

export interface AssessmentItem {
  id: string;
  objectiveId: string;
  statement: string;
  response: ResponseRating | null;
  notes: string;
  evidenceIds: string[];
}

export interface Assessment {
  id: string;
  title: string;
  organization: string;
  assessor: string;
  period: string;
  status: AssessmentStatus;
  selectedObjectives: string[];
  progress: number;
  currentStage: string;
  createdAt: string;
  updatedAt: string;
}

export interface CapabilityResult {
  objectiveId: string;
  currentLevel: CapabilityLevel;
  targetLevel: CapabilityLevel;
  gap: number;
  completionStatus: number;
  strengths: string[];
  gaps: string[];
}

export interface GapAnalysisItem {
  area: string;
  current: CapabilityLevel;
  target: CapabilityLevel;
  gap: number;
  status?: string;
}

export interface Activity {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'assessment' | 'evidence' | 'review' | 'setup';
}
