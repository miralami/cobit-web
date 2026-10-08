import { useEffect, useState, useMemo, useCallback } from 'react';
import type {
  FullAssessmentState,
  DF1Input,
  DesignFactorWeights,
  CapabilityLevel,
  ResponseRating,
  EvidenceRecord,
  RecommendationItem,
} from '../types';
import { calculateDesignFactors } from '../utils/designFactorEngine';
import { calculateObjectiveAssessment } from '../utils/cpmEngine';
import { createBenchmarkState } from '../data/benchmarkData';
import cobitActivitiesData from '../data/cobitActivities.json';
import { AssessmentContext } from './assessmentContextDef';

const STORAGE_KEY_LIST = 'cobit_assessments_history_v2';
const STORAGE_KEY_ACTIVE = 'cobit_active_assessment_id_v2';
const LEGACY_STORAGE_KEY = 'cobit_assessment_store_v2';

function createDefaultState(customId?: string, title?: string): FullAssessmentState {
  const id = customId || 'assessment-' + Date.now();
  const df1: DF1Input = { growth: 3, innovation: 3, costLeadership: 3, clientService: 3 };
  const df2Goals: Record<string, number> = {};
  for (let i = 1; i <= 13; i++) {
    df2Goals[`EG${i.toString().padStart(2, '0')}`] = 3;
  }
  const df3Risks: Record<string, { impact: number; likelihood: number }> = {};
  for (let i = 1; i <= 19; i++) {
    df3Risks[`RSK${i.toString().padStart(2, '0')}`] = { impact: 3, likelihood: 3 };
  }
  const df4Issues: Record<string, number> = {};
  for (let i = 1; i <= 20; i++) {
    df4Issues[`ISS${i.toString().padStart(2, '0')}`] = 2;
  }
  const weights: DesignFactorWeights = { df1: 2, df2: 1, df3: 3, df4: 4 };
  const dfResults = calculateDesignFactors(df1, { goals: df2Goals }, { risks: df3Risks }, { issues: df4Issues }, weights);

  return {
    id,
    title: title || 'COBIT 2019 Capability Assessment',
    organization: 'Organisasi Penilai',
    assessor: 'Assessor TI',
    period: '2026',
    weights,
    df1,
    df2: { goals: df2Goals },
    df3: { risks: df3Risks },
    df4: { issues: df4Issues },
    dfResults,
    scopedObjectiveIds: [],
    objectiveTargets: {},
    assessments: {},
    evidenceList: [],
    recommendations: [],
    updatedAt: new Date().toISOString(),
  };
}

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assessmentsList, setAssessmentsList] = useState<FullAssessmentState[]>(() => {
    try {
      const storedList = localStorage.getItem(STORAGE_KEY_LIST);
      if (storedList) {
        const parsed = JSON.parse(storedList) as FullAssessmentState[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => ({
            ...item,
            dfResults: calculateDesignFactors(item.df1, item.df2, item.df3, item.df4, item.weights || { df1: 2, df2: 1, df3: 3, df4: 4 }),
          }));
        }
      }
      // Check legacy single-assessment storage
      const storedSingle = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (storedSingle) {
        const single = JSON.parse(storedSingle) as FullAssessmentState;
        if (single && single.id) {
          single.dfResults = calculateDesignFactors(single.df1, single.df2, single.df3, single.df4, single.weights || { df1: 2, df2: 1, df3: 3, df4: 4 });
          return [single];
        }
      }
    } catch (e) {
      console.warn('Failed to load assessment history:', e);
    }
    // Default initial assessment history: benchmark data
    return [createBenchmarkState()];
  });

  const [activeAssessmentId, setActiveAssessmentId] = useState<string>(() => {
    try {
      const storedActive = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (storedActive && assessmentsList.some((a) => a.id === storedActive)) {
        return storedActive;
      }
    } catch (e) {
      console.warn('Failed to load active assessment id:', e);
    }
    return assessmentsList[0]?.id || 'assessment-panrb-2026';
  });

  // Current active assessment
  const state = useMemo(() => {
    const found = assessmentsList.find((a) => a.id === activeAssessmentId);
    return found || assessmentsList[0] || createBenchmarkState();
  }, [assessmentsList, activeAssessmentId]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(assessmentsList));
      localStorage.setItem(STORAGE_KEY_ACTIVE, activeAssessmentId);
      // Keep legacy key updated for backwards compatibility
      if (state) {
        localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
      }
    } catch (e) {
      console.error('Failed to sync assessments to localStorage:', e);
    }
  }, [assessmentsList, activeAssessmentId, state]);

  // Helper to mutate active assessment
  const updateCurrent = useCallback((updater: (current: FullAssessmentState) => FullAssessmentState) => {
    setAssessmentsList((prevList) => {
      return prevList.map((item) => {
        if (item.id === activeAssessmentId) {
          return updater(item);
        }
        return item;
      });
    });
  }, [activeAssessmentId]);

  const switchAssessment = useCallback((id: string) => {
    if (assessmentsList.some((a) => a.id === id)) {
      setActiveAssessmentId(id);
    }
  }, [assessmentsList]);

  const createNewAssessment = useCallback(() => {
    const newAssess = createDefaultState();
    setAssessmentsList((prev) => [newAssess, ...prev]);
    setActiveAssessmentId(newAssess.id);
    return newAssess.id;
  }, []);

  const duplicateAssessment = useCallback((id: string) => {
    const target = assessmentsList.find((a) => a.id === id);
    if (!target) return id;
    const cloned: FullAssessmentState = JSON.parse(JSON.stringify(target));
    cloned.id = 'assessment-' + Date.now();
    cloned.title = `${target.title} (Salinan)`;
    cloned.updatedAt = new Date().toISOString();
    setAssessmentsList((prev) => [cloned, ...prev]);
    setActiveAssessmentId(cloned.id);
    return cloned.id;
  }, [assessmentsList]);

  const deleteAssessment = useCallback((id: string) => {
    setAssessmentsList((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (remaining.length === 0) {
        const fresh = createBenchmarkState();
        setActiveAssessmentId(fresh.id);
        return [fresh];
      }
      if (id === activeAssessmentId) {
        setActiveAssessmentId(remaining[0].id);
      }
      return remaining;
    });
  }, [activeAssessmentId]);

  const updateMetadata = useCallback((meta: { title?: string; organization?: string; assessor?: string; period?: string }) => {
    updateCurrent((prev) => ({
      ...prev,
      ...meta,
      updatedAt: new Date().toISOString(),
    }));
  }, [updateCurrent]);

  const updateWeights = useCallback((weights: Partial<DesignFactorWeights>) => {
    updateCurrent((prev) => {
      const newWeights = { ...prev.weights, ...weights };
      const dfResults = calculateDesignFactors(prev.df1, prev.df2, prev.df3, prev.df4, newWeights);
      return {
        ...prev,
        weights: newWeights,
        dfResults,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const updateDF1 = useCallback((df1Update: Partial<DF1Input>) => {
    updateCurrent((prev) => {
      const newDF1 = { ...prev.df1, ...df1Update };
      const dfResults = calculateDesignFactors(newDF1, prev.df2, prev.df3, prev.df4, prev.weights);
      return {
        ...prev,
        df1: newDF1,
        dfResults,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const updateDF2Goal = useCallback((goalId: string, value: number) => {
    updateCurrent((prev) => {
      const newGoals = { ...prev.df2.goals, [goalId]: value };
      const newDF2 = { goals: newGoals };
      const dfResults = calculateDesignFactors(prev.df1, newDF2, prev.df3, prev.df4, prev.weights);
      return {
        ...prev,
        df2: newDF2,
        dfResults,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const updateDF3Risk = useCallback((riskId: string, impact: number, likelihood: number) => {
    updateCurrent((prev) => {
      const newRisks = { ...prev.df3.risks, [riskId]: { impact, likelihood } };
      const newDF3 = { risks: newRisks };
      const dfResults = calculateDesignFactors(prev.df1, prev.df2, newDF3, prev.df4, prev.weights);
      return {
        ...prev,
        df3: newDF3,
        dfResults,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const updateDF4Issue = useCallback((issueId: string, value: number) => {
    updateCurrent((prev) => {
      const newIssues = { ...prev.df4.issues, [issueId]: value };
      const newDF4 = { issues: newIssues };
      const dfResults = calculateDesignFactors(prev.df1, prev.df2, prev.df3, newDF4, prev.weights);
      return {
        ...prev,
        df4: newDF4,
        dfResults,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const setScopedObjectives = useCallback((objectiveIds: string[]) => {
    updateCurrent((prev) => {
      const newTargets = { ...prev.objectiveTargets };
      const newAssessments = { ...prev.assessments };

      for (const objId of objectiveIds) {
        if (!newTargets[objId]) {
          const dfMatch = prev.dfResults.find((r) => r.objectiveId === objId);
          newTargets[objId] = dfMatch?.suggestedTargetLevel ?? 3;
        }
        if (!newAssessments[objId]) {
          const preSeeded = (cobitActivitiesData as Record<string, any>)[objId] || [];
          newAssessments[objId] = calculateObjectiveAssessment(objId, newTargets[objId], preSeeded);
        }
      }

      return {
        ...prev,
        scopedObjectiveIds: objectiveIds,
        objectiveTargets: newTargets,
        assessments: newAssessments,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const setObjectiveTarget = useCallback((objectiveId: string, target: CapabilityLevel) => {
    updateCurrent((prev) => {
      const newTargets = { ...prev.objectiveTargets, [objectiveId]: target };
      const existing = prev.assessments[objectiveId];
      const newAssessments = { ...prev.assessments };
      if (existing) {
        newAssessments[objectiveId] = calculateObjectiveAssessment(
          objectiveId,
          target,
          existing.activities
        );
      }
      return {
        ...prev,
        objectiveTargets: newTargets,
        assessments: newAssessments,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const updateActivityResponse = useCallback(
    (objectiveId: string, activityId: string, response: ResponseRating, comment?: string) => {
      updateCurrent((prev) => {
        const assessment = prev.assessments[objectiveId];
        if (!assessment) return prev;

        const updatedActivities = assessment.activities.map((a) => {
          if (a.id === activityId) {
            return {
              ...a,
              response,
              comment: comment !== undefined ? comment : a.comment,
            };
          }
          return a;
        });

        const target = prev.objectiveTargets[objectiveId] ?? assessment.targetLevel;
        const updatedAssessment = calculateObjectiveAssessment(objectiveId, target, updatedActivities);

        return {
          ...prev,
          assessments: {
            ...prev.assessments,
            [objectiveId]: updatedAssessment,
          },
          updatedAt: new Date().toISOString(),
        };
      });
    },
    [updateCurrent]
  );

  const addEvidence = useCallback((evidenceData: Omit<EvidenceRecord, 'id'>): string => {
    const newId = `EVD-${Date.now().toString().slice(-4)}`;
    const newRecord: EvidenceRecord = {
      ...evidenceData,
      id: newId,
    };

    updateCurrent((prev) => {
      const updatedList = [newRecord, ...prev.evidenceList];
      const updatedAssessments = { ...prev.assessments };
      for (const actId of newRecord.linkedActivityIds) {
        for (const [objId, objData] of Object.entries(updatedAssessments)) {
          const actIndex = objData.activities.findIndex((a) => a.id === actId);
          if (actIndex >= 0) {
            const act = objData.activities[actIndex];
            if (!act.evidenceIds.includes(newId)) {
              const newActivities = [...objData.activities];
              newActivities[actIndex] = {
                ...act,
                evidenceIds: [...act.evidenceIds, newId],
              };
              updatedAssessments[objId] = calculateObjectiveAssessment(
                objId,
                objData.targetLevel,
                newActivities
              );
            }
          }
        }
      }

      return {
        ...prev,
        evidenceList: updatedList,
        assessments: updatedAssessments,
        updatedAt: new Date().toISOString(),
      };
    });

    return newId;
  }, [updateCurrent]);

  const updateEvidence = useCallback((evidence: EvidenceRecord) => {
    updateCurrent((prev) => ({
      ...prev,
      evidenceList: prev.evidenceList.map((e) => (e.id === evidence.id ? evidence : e)),
      updatedAt: new Date().toISOString(),
    }));
  }, [updateCurrent]);

  const deleteEvidence = useCallback((evidenceId: string) => {
    updateCurrent((prev) => {
      const updatedList = prev.evidenceList.filter((e) => e.id !== evidenceId);
      const updatedAssessments = { ...prev.assessments };
      for (const [objId, objData] of Object.entries(updatedAssessments)) {
        let changed = false;
        const newActivities = objData.activities.map((act) => {
          if (act.evidenceIds.includes(evidenceId)) {
            changed = true;
            return {
              ...act,
              evidenceIds: act.evidenceIds.filter((id) => id !== evidenceId),
            };
          }
          return act;
        });
        if (changed) {
          updatedAssessments[objId] = calculateObjectiveAssessment(
            objId,
            objData.targetLevel,
            newActivities
          );
        }
      }

      return {
        ...prev,
        evidenceList: updatedList,
        assessments: updatedAssessments,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const linkEvidenceToActivity = useCallback((evidenceId: string, activityId: string, objectiveId?: string) => {
    updateCurrent((prev) => {
      const updatedEvidence = prev.evidenceList.map((ev) => {
        if (ev.id === evidenceId && !ev.linkedActivityIds.includes(activityId)) {
          return { ...ev, linkedActivityIds: [...ev.linkedActivityIds, activityId] };
        }
        return ev;
      });

      const updatedAssessments = { ...prev.assessments };
      const targetObjIds = objectiveId ? [objectiveId] : Object.keys(updatedAssessments);

      for (const objId of targetObjIds) {
        const objData = updatedAssessments[objId];
        if (!objData) continue;
        const actIndex = objData.activities.findIndex((a) => a.id === activityId);
        if (actIndex >= 0) {
          const act = objData.activities[actIndex];
          if (!act.evidenceIds.includes(evidenceId)) {
            const newActivities = [...objData.activities];
            newActivities[actIndex] = { ...act, evidenceIds: [...act.evidenceIds, evidenceId] };
            updatedAssessments[objId] = calculateObjectiveAssessment(objId, objData.targetLevel, newActivities);
          }
        }
      }

      return {
        ...prev,
        evidenceList: updatedEvidence,
        assessments: updatedAssessments,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const unlinkEvidenceFromActivity = useCallback((evidenceId: string, activityId: string, objectiveId?: string) => {
    updateCurrent((prev) => {
      const updatedEvidence = prev.evidenceList.map((ev) => {
        if (ev.id === evidenceId) {
          return { ...ev, linkedActivityIds: ev.linkedActivityIds.filter((id) => id !== activityId) };
        }
        return ev;
      });

      const updatedAssessments = { ...prev.assessments };
      const targetObjIds = objectiveId ? [objectiveId] : Object.keys(updatedAssessments);

      for (const objId of targetObjIds) {
        const objData = updatedAssessments[objId];
        if (!objData) continue;
        const actIndex = objData.activities.findIndex((a) => a.id === activityId);
        if (actIndex >= 0) {
          const act = objData.activities[actIndex];
          if (act.evidenceIds.includes(evidenceId)) {
            const newActivities = [...objData.activities];
            newActivities[actIndex] = { ...act, evidenceIds: act.evidenceIds.filter((id) => id !== evidenceId) };
            updatedAssessments[objId] = calculateObjectiveAssessment(objId, objData.targetLevel, newActivities);
          }
        }
      }

      return {
        ...prev,
        evidenceList: updatedEvidence,
        assessments: updatedAssessments,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const addRecommendation = useCallback((recData: Omit<RecommendationItem, 'id'>) => {
    updateCurrent((prev) => {
      const newRec: RecommendationItem = {
        ...recData,
        id: `REC-${Date.now().toString().slice(-4)}`,
      };
      return {
        ...prev,
        recommendations: [...prev.recommendations, newRec],
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const updateRecommendation = useCallback((rec: RecommendationItem) => {
    updateCurrent((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((r) => (r.id === rec.id ? rec : r)),
      updatedAt: new Date().toISOString(),
    }));
  }, [updateCurrent]);

  const deleteRecommendation = useCallback((recId: string) => {
    updateCurrent((prev) => ({
      ...prev,
      recommendations: prev.recommendations.filter((r) => r.id !== recId),
      updatedAt: new Date().toISOString(),
    }));
  }, [updateCurrent]);

  const loadBenchmarkData = useCallback(() => {
    const benchmark = createBenchmarkState();
    // Add to history if not existing or replace benchmark instance
    setAssessmentsList((prev) => {
      const existsIndex = prev.findIndex((a) => a.id === benchmark.id);
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = benchmark;
        return copy;
      }
      return [benchmark, ...prev];
    });
    setActiveAssessmentId(benchmark.id);
  }, []);

  const resetToDefault = useCallback(() => {
    const fresh = createDefaultState();
    updateCurrent(() => fresh);
  }, [updateCurrent]);

  const exportStateJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cobit-assessment-${state.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  const importStateJSON = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr) as FullAssessmentState;
      if (parsed && parsed.df1 && parsed.df2 && parsed.df3 && parsed.df4) {
        parsed.dfResults = calculateDesignFactors(parsed.df1, parsed.df2, parsed.df3, parsed.df4, parsed.weights || { df1: 2, df2: 1, df3: 3, df4: 4 });
        if (!parsed.id) parsed.id = 'assessment-' + Date.now();
        setAssessmentsList((prev) => [parsed, ...prev.filter((a) => a.id !== parsed.id)]);
        setActiveAssessmentId(parsed.id);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      state,
      assessmentsList,
      activeAssessmentId,
      switchAssessment,
      createNewAssessment,
      duplicateAssessment,
      deleteAssessment,
      updateMetadata,
      updateWeights,
      updateDF1,
      updateDF2Goal,
      updateDF3Risk,
      updateDF4Issue,
      setScopedObjectives,
      setObjectiveTarget,
      updateActivityResponse,
      addEvidence,
      updateEvidence,
      deleteEvidence,
      linkEvidenceToActivity,
      unlinkEvidenceFromActivity,
      addRecommendation,
      updateRecommendation,
      deleteRecommendation,
      loadBenchmarkData,
      resetToDefault,
      exportStateJSON,
      importStateJSON,
    }),
    [
      state,
      assessmentsList,
      activeAssessmentId,
      switchAssessment,
      createNewAssessment,
      duplicateAssessment,
      deleteAssessment,
      updateMetadata,
      updateWeights,
      updateDF1,
      updateDF2Goal,
      updateDF3Risk,
      updateDF4Issue,
      setScopedObjectives,
      setObjectiveTarget,
      updateActivityResponse,
      addEvidence,
      updateEvidence,
      deleteEvidence,
      linkEvidenceToActivity,
      unlinkEvidenceFromActivity,
      addRecommendation,
      updateRecommendation,
      deleteRecommendation,
      loadBenchmarkData,
      resetToDefault,
      exportStateJSON,
      importStateJSON,
    ]
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
};
