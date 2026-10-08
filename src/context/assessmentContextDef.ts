import { createContext } from 'react';
import type {
  FullAssessmentState,
  DF1Input,
  DesignFactorWeights,
  CapabilityLevel,
  ResponseRating,
  EvidenceRecord,
  RecommendationItem,
} from '../types';

export interface AssessmentContextType {
  state: FullAssessmentState;
  assessmentsList: FullAssessmentState[];
  activeAssessmentId: string;
  switchAssessment: (id: string) => void;
  createNewAssessment: () => string;
  duplicateAssessment: (id: string) => string;
  deleteAssessment: (id: string) => void;
  updateMetadata: (meta: { title?: string; organization?: string; assessor?: string; period?: string }) => void;
  updateWeights: (weights: Partial<DesignFactorWeights>) => void;
  updateDF1: (df1: Partial<DF1Input>) => void;
  updateDF2Goal: (goalId: string, value: number) => void;
  updateDF3Risk: (riskId: string, impact: number, likelihood: number) => void;
  updateDF4Issue: (issueId: string, value: number) => void;
  setScopedObjectives: (objectiveIds: string[]) => void;
  setObjectiveTarget: (objectiveId: string, target: CapabilityLevel) => void;
  updateActivityResponse: (
    objectiveId: string,
    activityId: string,
    response: ResponseRating,
    comment?: string
  ) => void;
  addEvidence: (evidence: Omit<EvidenceRecord, 'id'>) => string;
  updateEvidence: (evidence: EvidenceRecord) => void;
  deleteEvidence: (evidenceId: string) => void;
  linkEvidenceToActivity: (evidenceId: string, activityId: string, objectiveId?: string) => void;
  unlinkEvidenceFromActivity: (evidenceId: string, activityId: string, objectiveId?: string) => void;
  addRecommendation: (rec: Omit<RecommendationItem, 'id'>) => void;
  updateRecommendation: (rec: RecommendationItem) => void;
  deleteRecommendation: (recId: string) => void;
  loadBenchmarkData: () => void;
  resetToDefault: () => void;
  exportStateJSON: () => void;
  importStateJSON: (jsonStr: string) => boolean;
}

export const AssessmentContext = createContext<AssessmentContextType | null>(null);
