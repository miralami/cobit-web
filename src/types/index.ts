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
  cpmRating: CPMRating;          // N, P, L, F
  isComplete: boolean;           // true if > 0.85
  status: 'Complete!' | 'Stop Here!';
}

export interface ObjectiveAssessmentData {
  objectiveId: string;
  targetLevel: CapabilityLevel;
  currentLevel: CapabilityLevel;
  activities: AssessmentActivity[];
  levelResults: Record<number, LevelAssessmentResult>;
  gap: number;
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
  status?: 'attached' | 'pending' | 'reviewed';
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
