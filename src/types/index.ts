export type COBITDomain = 'EDM' | 'APO' | 'BAI' | 'DSS' | 'MEA';

export type CapabilityLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ResponseRating = 'not-achieved' | 'partially-achieved' | 'largely-achieved' | 'fully-achieved';

export type AssessmentStatus = 'not-started' | 'in-progress' | 'completed' | 'archived';

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
  type: 'policy' | 'record' | 'documentation' | 'log' | 'interview' | 'other';
  status: 'attached' | 'pending' | 'reviewed';
  linkedItemId: string;
  assessor: string;
  date: string;
  notes?: string;
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
}

export interface Activity {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'assessment' | 'evidence' | 'review' | 'setup';
}
