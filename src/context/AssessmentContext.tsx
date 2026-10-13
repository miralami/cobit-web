import { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type {
  FullAssessmentState,
  DF1Input,
  DesignFactorWeights,
  CapabilityLevel,
  CpmMethodConfig,
  EvidenceStatus,
  AssessmentSnapshot,
  SnapshotSummary,
  ResponseRating,
  EvidenceRecord,
  RecommendationItem,
} from '../types';
import { calculateDesignFactors } from '../utils/designFactorEngine';
import { calculateObjectiveAssessment, DEFAULT_CPM_CONFIG } from '../utils/cpmEngine';
import { createBenchmarkState } from '../data/benchmarkData';
import cobitActivitiesData from '../data/cobitActivities.json';
import { AssessmentContext } from './assessmentContextDef';

const STORAGE_KEY_LIST = 'cobit_assessments_history_v2';
const STORAGE_KEY_ACTIVE = 'cobit_active_assessment_id_v2';
const STORAGE_KEY_SNAPSHOTS = 'cobit_assessment_snapshots_v1';
const LEGACY_STORAGE_KEY = 'cobit_assessment_store_v2';

function resolveConfig(state: Pick<FullAssessmentState, 'methodConfig'>): CpmMethodConfig {
  return state.methodConfig ?? DEFAULT_CPM_CONFIG;
}

/**
 * Recompute every scoped objective's result under the given method config.
 * Used on load and whenever the assessor switches the gate rule.
 */
function recomputeAssessments(
  state: FullAssessmentState,
  config: CpmMethodConfig
): FullAssessmentState['assessments'] {
  const recomputed: FullAssessmentState['assessments'] = {};
  for (const [objId, objData] of Object.entries(state.assessments)) {
    recomputed[objId] = calculateObjectiveAssessment(
      objId,
      state.objectiveTargets[objId] ?? objData.targetLevel ?? 3,
      objData.activities,
      config
    );
  }
  return recomputed;
}

function buildSnapshotSummary(state: FullAssessmentState): SnapshotSummary {
  const rows = state.scopedObjectiveIds.map((id) => {
    const data = state.assessments[id];
    const target = state.objectiveTargets[id] ?? 3;
    const current = data?.currentLevel ?? 1;
    return {
      objectiveId: id,
      currentLevel: current,
      targetLevel: target,
      gap: Math.max(0, target - current),
    };
  });
  const totalObjectives = rows.length;
  const avgCurrentLevel =
    totalObjectives > 0
      ? Math.round((rows.reduce((sum, r) => sum + r.currentLevel, 0) / totalObjectives) * 100) / 100
      : 0;
  const totalGap = rows.reduce((sum, r) => sum + r.gap, 0);
  return {
    totalObjectives,
    avgCurrentLevel,
    totalGap,
    achievedCount: rows.filter((r) => r.gap === 0).length,
    evidenceCount: state.evidenceList.length,
    recommendationCount: state.recommendations.length,
    rows,
  };
}

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
    methodConfig: { ...DEFAULT_CPM_CONFIG },
  };
}

export const EVIDENCE_STATUS_FLOW: Record<EvidenceStatus, EvidenceStatus | null> = {
  pending: 'reviewed',
  reviewed: 'attached',
  attached: null,
};

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [assessmentsList, setAssessmentsList] = useState<FullAssessmentState[]>(() => {
    try {
      const storedList = localStorage.getItem(STORAGE_KEY_LIST);
      if (storedList) {
        const parsed = JSON.parse(storedList) as FullAssessmentState[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => {
            const withMethod: FullAssessmentState = {
              ...item,
              methodConfig: resolveConfig(item),
            };
            return {
              ...withMethod,
              dfResults: calculateDesignFactors(withMethod.df1, withMethod.df2, withMethod.df3, withMethod.df4, withMethod.weights || { df1: 2, df2: 1, df3: 3, df4: 4 }),
              assessments: recomputeAssessments(withMethod, withMethod.methodConfig as CpmMethodConfig),
            };
          });
        }
      }
      // Check legacy single-assessment storage
      const storedSingle = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (storedSingle) {
        const single = JSON.parse(storedSingle) as FullAssessmentState;
        if (single && single.id) {
          single.methodConfig = resolveConfig(single);
          single.dfResults = calculateDesignFactors(single.df1, single.df2, single.df3, single.df4, single.weights || { df1: 2, df2: 1, df3: 3, df4: 4 });
          single.assessments = recomputeAssessments(single, single.methodConfig);
          return [single];
        }
      }
    } catch (e) {
      console.warn('Failed to load assessment history:', e);
    }
    // Default initial assessment history: benchmark data
    const benchmark = createBenchmarkState();
    benchmark.methodConfig = resolveConfig(benchmark);
    benchmark.assessments = recomputeAssessments(benchmark, benchmark.methodConfig);
    return [benchmark];
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

  // Sync activeAssessmentId from URL
  useEffect(() => {
    const match = location.pathname.match(/^\/assessments\/(.+?)(?:\/|$)/);
    if (match && match[1] !== 'new') {
      const idFromUrl = match[1];
      if (assessmentsList.some((a) => a.id === idFromUrl) && idFromUrl !== activeAssessmentId) {
        setActiveAssessmentId(idFromUrl);
      }
    }
  }, [location.pathname, assessmentsList, activeAssessmentId]);

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

  // Immutable snapshots (kept in a separate store so FullAssessmentState stays acyclic)
  const [snapshots, setSnapshots] = useState<AssessmentSnapshot[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SNAPSHOTS);
      if (stored) {
        const parsed = JSON.parse(stored) as AssessmentSnapshot[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load snapshots:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SNAPSHOTS, JSON.stringify(snapshots));
    } catch (e) {
      console.error('Failed to sync snapshots to localStorage:', e);
    }
  }, [snapshots]);

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

  const navigateToAssessment = useCallback((id: string) => {
    if (assessmentsList.some((a) => a.id === id)) {
      setActiveAssessmentId(id);
      navigate(`/assessments/${id}`);
    }
  }, [assessmentsList, navigate]);

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
        fresh.methodConfig = resolveConfig(fresh);
        fresh.assessments = recomputeAssessments(fresh, fresh.methodConfig);
        setActiveAssessmentId(fresh.id);
        return [fresh];
      }
      if (id === activeAssessmentId) {
        setActiveAssessmentId(remaining[0].id);
      }
      return remaining;
    });
  }, [activeAssessmentId]);

  /**
   * Switch the transient/documentation gate rule and recompute all results.
   * This is the "inspectable scoring method" contribution: the rule is data,
   * not a hard-coded constant.
   */
  const setMethodConfig = useCallback((partial: Partial<CpmMethodConfig>) => {
    updateCurrent((prev) => {
      const baseConfig = resolveConfig(prev);
      const nextConfig: CpmMethodConfig = {
        ...baseConfig,
        ...partial,
        thresholds: { ...baseConfig.thresholds, ...(partial.thresholds ?? {}) },
      };
      return {
        ...prev,
        methodConfig: nextConfig,
        assessments: recomputeAssessments(prev, nextConfig),
        updatedAt: new Date().toISOString(),
      };
    });
  }, [updateCurrent]);

  const createSnapshot = useCallback((label: string): string => {
    const target = assessmentsList.find((a) => a.id === activeAssessmentId);
    if (!target) return '';
    const newSnapshot: AssessmentSnapshot = {
      id: `SNAP-${Date.now()}`,
      assessmentId: target.id,
      label: label.trim() || `Snapshot ${new Date().toLocaleString('id-ID')}`,
      createdAt: new Date().toISOString(),
      methodConfig: resolveConfig(target),
      summary: buildSnapshotSummary(target),
    };
    setSnapshots((prev) => [newSnapshot, ...prev]);
    return newSnapshot.id;
  }, [assessmentsList, activeAssessmentId]);

  const deleteSnapshot = useCallback((id: string) => {
    setSnapshots((prev) => prev.filter((s) => s.id !== id));
  }, []);

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
          newAssessments[objId] = calculateObjectiveAssessment(objId, newTargets[objId], preSeeded, resolveConfig(prev));
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
          existing.activities,
          resolveConfig(prev)
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
        const updatedAssessment = calculateObjectiveAssessment(objectiveId, target, updatedActivities, resolveConfig(prev));

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
      status: evidenceData.status ?? 'pending',
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
                newActivities,
                resolveConfig(prev)
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

  /** Explicit, one-step-at-a-time verification workflow for audit evidence. */
  const advanceEvidenceStatus = useCallback((evidenceId: string) => {
    updateCurrent((prev) => ({
      ...prev,
      evidenceList: prev.evidenceList.map((e) => {
        if (e.id !== evidenceId) return e;
        const current = e.status ?? 'pending';
        return { ...e, status: EVIDENCE_STATUS_FLOW[current] ?? current };
      }),
      updatedAt: new Date().toISOString(),
    }));
  }, [updateCurrent]);

  const setEvidenceStatus = useCallback((evidenceId: string, status: EvidenceStatus) => {
    updateCurrent((prev) => ({
      ...prev,
      evidenceList: prev.evidenceList.map((e) => (e.id === evidenceId ? { ...e, status } : e)),
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
            newActivities,
            resolveConfig(prev)
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
            updatedAssessments[objId] = calculateObjectiveAssessment(objId, objData.targetLevel, newActivities, resolveConfig(prev));
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
            updatedAssessments[objId] = calculateObjectiveAssessment(objId, objData.targetLevel, newActivities, resolveConfig(prev));
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
    benchmark.methodConfig = resolveConfig(benchmark);
    benchmark.assessments = recomputeAssessments(benchmark, benchmark.methodConfig);
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
        parsed.methodConfig = resolveConfig(parsed);
        parsed.dfResults = calculateDesignFactors(parsed.df1, parsed.df2, parsed.df3, parsed.df4, parsed.weights || { df1: 2, df2: 1, df3: 3, df4: 4 });
        parsed.assessments = recomputeAssessments(parsed, parsed.methodConfig);
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
      snapshots,
      navigateToAssessment,
      createNewAssessment,
      duplicateAssessment,
      deleteAssessment,
      createSnapshot,
      deleteSnapshot,
      setMethodConfig,
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
      advanceEvidenceStatus,
      setEvidenceStatus,
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
      snapshots,
      navigateToAssessment,
      createNewAssessment,
      duplicateAssessment,
      deleteAssessment,
      createSnapshot,
      deleteSnapshot,
      setMethodConfig,
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
      advanceEvidenceStatus,
      setEvidenceStatus,
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
