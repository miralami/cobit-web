import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAssessment } from '../context';
import cobitFactors from '../data/cobitDesignFactors.json';
import cobitActivities from '../data/cobitActivities.json';
import './ReferencePanel.css';

interface ReferencePanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ReferencePanel({ open, onClose }: ReferencePanelProps) {
  const location = useLocation();
  const { state } = useAssessment();
  const { scopedObjectiveIds } = state;

  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>('');

  // Get objectiveId from URL if in workspace
  const urlObjectiveId = useMemo(() => {
    const match = location.pathname.match(/\/assessments\/[^/]+\/workspace\/([^/]+)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  // Auto-select objective from URL or first scoped
  useEffect(() => {
    if (urlObjectiveId && scopedObjectiveIds.includes(urlObjectiveId)) {
      setSelectedObjectiveId(urlObjectiveId);
    } else if (scopedObjectiveIds.length > 0) {
      setSelectedObjectiveId(scopedObjectiveIds[0]);
    }
  }, [urlObjectiveId, scopedObjectiveIds]);

  const selectedObjective = useMemo(() => {
    return cobitFactors.objectives.find((o) => o.id === selectedObjectiveId);
  }, [selectedObjectiveId]);

  const activities = useMemo(() => {
    if (!selectedObjectiveId) return [];
    return (cobitActivities as Record<string, any[]>)[selectedObjectiveId] || [];
  }, [selectedObjectiveId]);

  const groupedByLevel = useMemo(() => {
    const groups: Record<number, typeof activities> = { 2: [], 3: [], 4: [], 5: [] };
    for (const act of activities) {
      if (groups[act.level]) {
        groups[act.level].push(act);
      }
    }
    return groups;
  }, [activities]);

  const practiceCodes = useMemo(() => {
    const codes = new Set<string>();
    for (const act of activities) {
      if (act.practiceCode) codes.add(act.practiceCode);
    }
    return Array.from(codes).sort();
  }, [activities]);

  if (!open) return null;

  return (
    <>
      <div className="ref-backdrop" onClick={onClose} />
      <aside className="ref-panel" role="dialog" aria-label="COBIT Reference">
        {/* Header */}
        <div className="ref-panel__header">
          <div className="ref-panel__title">
            <span className="ref-panel__icon">📖</span>
            <span>COBIT 2019 Reference</span>
          </div>
          <button className="ref-panel__close" onClick={onClose} aria-label="Close reference">
            ✕
          </button>
        </div>

        {/* Objective Selector */}
        <div className="ref-panel__selector">
          <label className="ref-panel__label">Objective</label>
          <select
            className="ref-panel__select"
            value={selectedObjectiveId}
            onChange={(e) => setSelectedObjectiveId(e.target.value)}
          >
            {scopedObjectiveIds.map((id) => {
              const obj = cobitFactors.objectives.find((o) => o.id === id);
              return (
                <option key={id} value={id}>
                  {id} — {obj?.name || id}
                </option>
              );
            })}
          </select>
        </div>

        {/* Content */}
        <div className="ref-panel__content">
          {selectedObjective ? (
            <>
              {/* Objective Overview */}
              <section className="ref-section">
                <div className="ref-section__header">
                  <span className="ref-section__badge">{selectedObjective.domain}</span>
                  <h3 className="ref-section__title">{selectedObjective.id}</h3>
                </div>
                <h4 className="ref-section__name">{selectedObjective.name}</h4>
                <p className="ref-section__desc">{selectedObjective.description}</p>
                {selectedObjective.purpose && (
                  <p className="ref-section__purpose">
                    <strong>Purpose:</strong> {selectedObjective.purpose}
                  </p>
                )}
              </section>

              {/* Practice Codes */}
              {practiceCodes.length > 0 && (
                <section className="ref-section">
                  <h4 className="ref-section__heading">Practice Groups</h4>
                  <div className="ref-chips">
                    {practiceCodes.map((code) => (
                      <span key={code} className="ref-chip">{code}</span>
                    ))}
                  </div>
                </section>
              )}

              {/* Activities by Level */}
              <section className="ref-section">
                <h4 className="ref-section__heading">Activities by Level</h4>
                {[2, 3, 4, 5].map((level) => {
                  const acts = groupedByLevel[level];
                  if (!acts || acts.length === 0) return null;
                  return (
                    <div key={level} className="ref-level-group">
                      <div className="ref-level-header">
                        <span className="ref-level-badge">Level {level}</span>
                        <span className="ref-level-count">{acts.length} activities</span>
                      </div>
                      <ul className="ref-activity-list">
                        {acts.map((act) => (
                          <li key={act.id} className="ref-activity-item">
                            <span className="ref-activity-num">{act.activityNumber}.</span>
                            <span className="ref-activity-desc">{act.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </section>
            </>
          ) : (
            <div className="ref-empty">
              <p>No objective selected. Start an assessment and select objectives to see COBIT reference.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="ref-panel__footer">
          <span>COBIT 2019 Framework</span>
          <span className="ref-panel__version">ISACA</span>
        </div>
      </aside>
    </>
  );
}
