import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAssessment } from '../context';
import type { CapabilityLevel, ResponseRating } from '../types';
import EvidenceModal from '../components/EvidenceModal';
import cobitFactors from '../data/cobitDesignFactors.json';

export default function AssessmentWorkspace() {
  const { objectiveId: routeObjectiveId } = useParams<{ objectiveId?: string }>();
  const navigate = useNavigate();
  const { state, updateActivityResponse, setObjectiveTarget } = useAssessment();

  const { scopedObjectiveIds, objectiveTargets, assessments, evidenceList } = state;

  // Determine current active objective
  const activeObjectiveId = useMemo(() => {
    if (routeObjectiveId && scopedObjectiveIds.includes(routeObjectiveId)) {
      return routeObjectiveId;
    }
    if (scopedObjectiveIds.length > 0) {
      return scopedObjectiveIds[0];
    }
    return routeObjectiveId || 'EDM03';
  }, [routeObjectiveId, scopedObjectiveIds]);

  const [modalActivity, setModalActivity] = useState<{ id: string; desc: string } | null>(null);

  /* Accordion: one capability level open at a time. Starts at Level 2. */
  const [openLevel, setOpenLevel] = useState<number>(2);

  // Progress: how many scoped objectives have been rated
  const activeIndex = useMemo(
    () => Math.max(0, scopedObjectiveIds.indexOf(activeObjectiveId)),
    [scopedObjectiveIds, activeObjectiveId]
  );

  const filledCount = useMemo(
    () => scopedObjectiveIds.filter((id) => assessments[id]?.activities.some((a) => a.response)).length,
    [scopedObjectiveIds, assessments]
  );

  const unansweredCount = useMemo(() => {
    const data = assessments[activeObjectiveId];
    if (!data) return 0;
    return data.activities.filter((a) => !a.response).length;
  }, [assessments, activeObjectiveId]);

  // Get objective metadata
  const objMeta = useMemo(() => {
    return cobitFactors.objectives.find((o) => o.id === activeObjectiveId);
  }, [activeObjectiveId]);

  // Current assessment data from context
  const assessmentData = assessments[activeObjectiveId];
  const targetLevel = objectiveTargets[activeObjectiveId] ?? 3;
  const currentLevel = assessmentData?.currentLevel ?? 1;
  const gap = assessmentData?.gap ?? Math.max(0, targetLevel - currentLevel);

  // Group activities by level: 2, 3, 4, 5
  const activitiesByLevel = useMemo(() => {
    const grouped: Record<number, typeof assessmentData.activities> = { 2: [], 3: [], 4: [], 5: [] };
    if (!assessmentData) return grouped;
    for (const act of assessmentData.activities) {
      if (grouped[act.level]) {
        grouped[act.level].push(act);
      }
    }
    return grouped;
  }, [assessmentData]);

  if (!assessmentData) {
    return (
      <div className="page">
        <header className="page-head">
          <div className="page-head__text">
            <h1 className="page-title">Objektif Belum Dimasukkan ke Ruang Lingkup</h1>
            <p className="page-lead">
              Objektif <span className="mono">{activeObjectiveId}</span> belum dimasukkan ke dalam ruang lingkup audit.
            </p>
          </div>
        </header>
        <div className="empty">
          <Link to={`/assessments/${state.id}/setup`} className="btn btn--primary">
            Ke Halaman Setup & Scoping
          </Link>
        </div>
      </div>
    );
  }

  const levels: CapabilityLevel[] = [2, 3, 4, 5];

  return (
    <div className="page workspace-page">
      {/* Workspace Header */}
      <header className="workspace-header">
        <div className="workspace-header__top">
          <div className="workspace-selector-wrap">
            <label className="field__label" style={{ margin: 0 }}>Objektif Aktif:</label>
            <select
              className="select workspace-obj-select"
              value={activeObjectiveId}
              onChange={(e) => navigate(`/assessments/${state.id}/workspace/${e.target.value}`)}
            >
              {scopedObjectiveIds.map((id) => {
                const meta = cobitFactors.objectives.find((o) => o.id === id);
                return (
                  <option key={id} value={id}>
                    {id} — {meta?.name || id}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="workspace-badges">
            <span className="domain-chip domain-chip--edm">{objMeta?.domain || 'COBIT'}</span>
            <div className="badge-target">
              <span className="badge-label">Target Level:</span>
              <select
                className="select target-select"
                value={targetLevel}
                onChange={(e) => setObjectiveTarget(activeObjectiveId, parseInt(e.target.value, 10) as CapabilityLevel)}
              >
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <option key={lvl} value={lvl}>Level {lvl}</option>
                ))}
              </select>
            </div>
            <div className="badge-current">
              <span className="badge-label">Current Level:</span>
              <strong className="badge-value">Level {currentLevel}</strong>
            </div>
            <div className={`badge-gap ${gap > 0 ? 'badge-gap--active' : 'badge-gap--zero'}`}>
              <span className="badge-label">Gap:</span>
              <strong className="badge-value">{gap} Level</strong>
            </div>
          </div>
        </div>

        <div className="workspace-desc">
          <h2>{objMeta?.id} — {objMeta?.name}</h2>
          <p className="text-secondary">{objMeta?.description}</p>
        </div>
      </header>

      {/* Overall progress summary */}
      <div className="workspace-progress">
        <div className="workspace-progress__bar">
          <div
            className="workspace-progress__fill"
            style={{
              width: `${scopedObjectiveIds.length > 0 ? (filledCount / scopedObjectiveIds.length) * 100 : 0}%`,
            }}
          />
        </div>
        <div className="workspace-progress__text">
          Objektif <strong>{activeIndex + 1}</strong> dari <strong>{scopedObjectiveIds.length}</strong>
          <span className="dot-sep">•</span>
          <strong>{filledCount}</strong> sudah dinilai
          <span className="dot-sep">•</span>
          <strong>{scopedObjectiveIds.length - filledCount}</strong> belum selesai
        </div>
        {unansweredCount > 0 && (
          <div className="workspace-progress__warning">
            ⚠️ {unansweredCount} aktivitas pada objektif ini belum dinilai. Aktivitas kosong diperlakukan sama seperti N.A. — dikecualikan dari penyebut persentase pemenuhan, sehingga persentase bisa tampak lebih tinggi dari kenyataannya. Nilai semua aktivitas untuk hasil audit yang valid.
          </div>
        )}
      </div>

      {/* How-to instruction */}
      <div className="workspace-guide">
        <strong>Cara menilai:</strong>
        Pilih respons untuk tiap aktivitas —
        <span className="guide-chip guide-chip--yes">Yes</span> terpenuhi penuh (1.0),
        <span className="guide-chip guide-chip--partially">Partially</span> sebagian (0.5),
        <span className="guide-chip guide-chip--no">No</span> tidak ada (0.0),
        <span className="guide-chip guide-chip--na">N.A.</span> tidak berlaku (dikecualikan dari penyebut).
        Lampirkan bukti dokumen/wawancara untuk setiap rating agar audit dapat ditelusuri.
      </div>

      {/* Level-by-Level Hierarchical Assessment Blocks */}
      <div className="workspace-levels-container">
        {levels.map((lvl) => {
          const acts = activitiesByLevel[lvl] || [];
          if (acts.length === 0) return null;

          const lvlResult = assessmentData.levelResults[lvl] || {
            fulfillmentPercentage: 0,
            cpmRating: 'N',
            isComplete: false,
            status: 'Stop Here!',
          };

          const pctFormatted = Math.round(lvlResult.fulfillmentPercentage * 100);
          const isStop = lvlResult.status === 'Stop Here!';

          return (
            <div
              key={lvl}
              className={`level-block ${lvlResult.isComplete ? 'level-block--complete' : isStop ? 'level-block--stop' : ''}`}
            >
              {/* Level Block Header — acts as accordion toggle */}
              <button
                type="button"
                className="level-block__header level-block__toggle"
                aria-expanded={openLevel === lvl}
                onClick={() => setOpenLevel(openLevel === lvl ? 0 : lvl)}
              >
                <div className="level-block__title">
                  <span className="level-num-pill">Level {lvl}</span>
                  <h3>Pencapaian Kapabilitas Level {lvl}</h3>
                  <span className="level-threshold-tag" title="Ambang batas pemenuhan COBIT Performance Management">
                    Ambang: &gt;85% untuk lanjut ke level berikutnya
                  </span>
                </div>

                <div className="level-block__metrics">
                  <div className="cpm-pct-box">
                    <span className="cpm-label">% Pemenuhan</span>
                    <strong className="cpm-pct">{pctFormatted}%</strong>
                  </div>

                  <div className="cpm-rating-box">
                    <span className="cpm-label">Predikat CPM</span>
                    <span className={`cpm-badge cpm-badge--${lvlResult.cpmRating}`}>
                      {lvlResult.cpmRating} ({lvlResult.cpmRating === 'F' ? 'Fully' : lvlResult.cpmRating === 'L' ? 'Largely' : lvlResult.cpmRating === 'P' ? 'Partially' : 'None'})
                    </span>
                  </div>

                  <div className={`gate-status-banner ${lvlResult.isComplete ? 'gate-banner--complete' : 'gate-banner--stop'}`}>
                    {lvlResult.status}
                  </div>

                  <span className={`level-caret ${openLevel === lvl ? 'level-caret--open' : ''}`} aria-hidden="true">
                    ▾
                  </span>
                </div>
              </button>

              {/* Activities Table (accordion body) */}
              {openLevel === lvl && (
              <div className="level-activities-table-wrap">
                <div className="table-wrap">
                <table className="table level-activities-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>No</th>
                      <th>Butir Praktik & Aktivitas COBIT 2019</th>
                      <th style={{ width: '250px' }}>Skala Pemenuhan</th>
                      <th style={{ width: '210px' }}>Evidensi Terlampir</th>
                      <th style={{ width: '260px' }}>Catatan / Komentar Assessor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acts.map((act) => {
                      const attachedEvidence = evidenceList.filter((e) => act.evidenceIds.includes(e.id));
                      return (
                        <tr key={act.id} className="act-row">
                          <td className="act-num-cell">
                            <strong>{act.activityNumber}</strong>
                            <span className="act-code">{act.practiceCode || `L${lvl}`}</span>
                          </td>
                          <td className="act-desc-cell">
                            <p className="act-desc">{act.description}</p>
                            {act.evidenceSnippet && (
                              <div className="act-evidence-snippet" title="Kutipan evidensi hasil wawancara/observasi">
                                💬 <em>"{act.evidenceSnippet}"</em>
                              </div>
                            )}
                          </td>
                          <td className="act-response-cell">
                            <div className="segmented" role="group" aria-label={`Respons aktivitas ${act.activityNumber}`}>
                              {(['Yes', 'Partially', 'No', 'N.A.'] as ResponseRating[]).map((opt) => {
                                const isActive = act.response === opt;
                                const tone =
                                  opt === 'Yes' ? 'seg-success' : opt === 'Partially' ? 'seg-warning' : opt === 'No' ? 'seg-danger' : 'seg-na';
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    aria-pressed={isActive}
                                    className={`segmented__btn ${isActive ? `segmented__btn--active ${tone}` : ''}`}
                                    onClick={() => updateActivityResponse(activeObjectiveId, act.id, opt)}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </td>
                          <td className="act-evidence-cell">
                            <div className="evidence-chips-wrap">
                              {attachedEvidence.map((ev) => (
                                <span
                                  key={ev.id}
                                  className="evidence-chip"
                                  title={`${ev.title}: ${ev.notes}`}
                                  onClick={() => setModalActivity({ id: act.id, desc: act.description })}
                                >
                                  📄 {ev.referenceNumber || ev.id}
                                </span>
                              ))}
                              <button
                                type="button"
                                className="btn-link-evidence"
                                onClick={() => setModalActivity({ id: act.id, desc: act.description })}
                              >
                                + Tautkan Bukti
                              </button>
                            </div>
                          </td>
                          <td className="act-comment-cell">
                            <textarea
                              className="comment-textarea"
                              rows={2}
                              value={act.comment || ''}
                              onChange={(e) =>
                                updateActivityResponse(activeObjectiveId, act.id, act.response || 'N.A.', e.target.value)
                              }
                              placeholder="Catatan pertimbangan audit..."
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Navigation */}
      <footer className="workspace-footer">
        <div className="footer-left">
          <span>Objektif: <strong>{activeObjectiveId}</strong></span>
          <span className="dot-sep">•</span>
          <span>Status: <strong>Level {currentLevel}</strong></span>
          <span className="dot-sep">•</span>
          <span>Gap ke Target {targetLevel}: <strong>{gap} Level</strong></span>
        </div>
        <div className="footer-actions">
          <Link to={`/assessments/${state.id}/evidence`} className="btn btn--subtle">
            Ke Register Bukti →
          </Link>
          <Link to={`/assessments/${state.id}/results`} className="btn btn--primary">
            Lihat Rekapitulasi Hasil Kapabilitas →
          </Link>
        </div>
      </footer>

      {/* Evidence Modal */}
      {modalActivity && (
        <EvidenceModal
          activityId={modalActivity.id}
          activityDescription={modalActivity.desc}
          objectiveId={activeObjectiveId}
          onClose={() => setModalActivity(null)}
        />
      )}
    </div>
  );
}
