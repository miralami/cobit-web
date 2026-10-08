import { useContext } from 'react';
import { AssessmentContext } from './assessmentContextDef';

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return ctx;
}
