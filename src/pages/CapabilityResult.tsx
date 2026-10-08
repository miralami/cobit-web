import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import cobitFactors from '../data/cobitDesignFactors.json';
import type { CapabilityLevel } from '../types';
import './CapabilityResult.css';

const capabilityLevelLabels: Record<CapabilityLevel, string> = {
  0: 'Incomplete — Tidak beroperasi',
  1: 'Initial — Aktivitas berjalan ad-hoc',
  2: 'Managed — Terencana & termonitor',
  3: 'Defined — Standar organisasi formal',
  4: 'Quantitatively Managed — Berbasis metrik kuantitatif',
  5: 'Optimizing — Perbaikan berkelanjutan otomatis',
};

export default function CapabilityResult() {
  const { state } = useAssessment();
  const { scopedObjectiveIds, objectiveTargets, assessments } = state;

  const [selectedId, setSelectedId] = useState<string>(
    scopedObjectiveIds[0] || 'EDM03'
  );

  const activeId = scopedObjectiveIds.includes(selectedId)
    ? selectedId
    : scopedObjectiveIds[0] || 'EDM03';

  const assessmentData = assessments[activeId];
  const objMeta = cobitFactors.objectives.find((o) => o.id === activeId);
  const targetLevel = objectiveTargets[activeId] ?? 3;
  const currentLevel = assessmentData?.currentLevel ?? 1;
  const gap = assessmentData?.gap ?? Math.max(0, targetLevel - currentLevel);

  // Aggregation trail: Level 2 through 5
  const trail = useMemo(() => {
    if (!assessmentData) return [];
    const steps: {
      level: number;
      pct: number;
      rating: string;
      isComplete: boolean;
      status: string;
      validCount: number;
      explanation: string;
    }[] = [];

    for (const lvl of [2, 3, 4, 5]) {
      const res = assessmentData.levelResults[lvl];
      if (!res) continue;
      const pct = Math.round(res.fulfillmentPercentage * 100);
      let explanation = '';
      if (res.isComplete) {
        explanation = `Level ${lvl} terpenuhi ${pct}% (>85%, rating ${res.cpmRating}). Memenuhi kriteria, evaluasi berlanjut ke level berikutnya.`;
      } else {
        explanation = `Level ${lvl} hanya terpenuhi ${pct}% (≤85%, rating ${res.cpmRating}). Aturan Stop Here aktif! Capaian terhenti pada level sebelumnya.`;
      }
      steps.push({
        level: lvl,
        pct,
        rating: res.cpmRating,
        isComplete: res.isComplete,
        status: res.status,
        validCount: res.validCount,
        explanation,
      });
    }
    return steps;
  }, [assessmentData]);

  // Strengths and Gaps
  const strengths = useMemo(() => {
    if (!assessmentData) return [];
    return assessmentData.activities
      .filter((a) => a.response === 'Yes')
      .map((a) => `(L${a.level}) ${a.description}`);
  }, [assessmentData]);

  const gaps = useMemo(() => {
    if (!assessmentData) return [];
    return assessmentData.activities
      .filter((a) => a.response === 'No' || a.response === 'Partially')
      .map((a) => `(L${a.level} - ${a.response}) ${a.description}`);
  }, [assessmentData]);

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>COBIT Performance Management (CPM)
          </p>
          <h1 className="page-title">Hasil Pengukuran Capability Level</h1>
          <p className="page-lead">
            Level kapabilitas dihitung secara berjenjang dari skala respon aktivitas Level 2–5 menggunakan ambang batas pemenuhan &gt;85% dan aturan Stop Here yang ketat.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/gap-analysis" className="btn btn--secondary">
            Analisis Kesenjangan (Gap) →
          </Link>
          <Link to="/recommendations" className="btn btn--primary">
            Matriks Rekomendasi 3 Aspek →
          </Link>
        </div>
      </header>

      {/* Comparative Grouped Bar Overview */}
      <section className="cap-overview-section">
        <h3>Ringkasan Seluruh Objektif: Current vs Target Level</h3>
        <div className="grouped-bars-chart">
          {scopedObjectiveIds.map((id) => {
            const data = assessments[id];
            const target = objectiveTargets[id] ?? 3;
            const current = data?.currentLevel ?? 1;
            const delta = Math.max(0, target - current);
            const isSelected = id === activeId;
            return (
              <div
                key={id}
                className={`chart-bar-group ${isSelected ? 'chart-bar-group--active' : ''}`}
                onClick={() => setSelectedId(id)}
              >
                <div className="chart-bar-header">
                  <strong>{id}</strong>
                  <span className={`mini-gap ${delta > 0 ? 'mini-gap--active' : 'mini-gap--ok'}`}>
                    {delta > 0 ? `Gap ${delta}` : 'Achieved'}
                  </span>
                </div>
                <div className="bars-pair">
                  <div className="bar-wrapper" title={`Current: Level ${current}`}>
                    <div className="bar-fill bar-fill--current" style={{ height: `${(current / 5) * 100}%` }}>
                      <span>L{current}</span>
                    </div>
                  </div>
                  <div className="bar-wrapper" title={`Target: Level ${target}`}>
                    <div className="bar-fill bar-fill--target" style={{ height: `${(target / 5) * 100}%` }}>
                      <span>L{target}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chart-legend">
          <span className="legend-item"><span className="legend-box legend-box--current" /> Current Capability Level</span>
          <span className="legend-item"><span className="legend-box legend-box--target" /> Target Level</span>
        </div>
      </section>

      {/* Objective Selector Tabs */}
      <div className="objtabs">
        {scopedObjectiveIds.map((id) => {
          const meta = cobitFactors.objectives.find((o) => o.id === id);
          const active = id === activeId;
          const cur = assessments[id]?.currentLevel ?? 1;
          const tgt = objectiveTargets[id] ?? 3;
          return (
            <button
              key={id}
              type="button"
              className={`objtab ${active ? 'is-active' : ''}`}
              onClick={() => setSelectedId(id)}
            >
              <span className="mono objtab__id">{id}</span>
              <span className="objtab__name">{meta?.name || id}</span>
              <span className="objtab__levels">L{cur} / T{tgt}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Objective Detail Card */}
      <section className="card levelcard reveal">
        <div className="card__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__num">{activeId}</span>
              <span className="tag tag--edm">{objMeta?.domain}</span>
            </p>
            <h2 className="card__title levelcard__title">
              {objMeta?.name}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className={`badge ${gap > 0 ? 'badge--warning' : 'badge--success'}`}>
              {gap > 0 ? `Kesenjangan ${gap} Level` : 'Target Tercapai!'}
            </span>
            <Link to={`/assessments/workspace/${activeId}`} className="btn btn--subtle btn--sm">
              ✏️ Buka Workspace Asesmen
            </Link>
          </div>
        </div>

        <div className="card__body">
          <div className="levels">
            <div className="levelbox">
              <span className="eyebrow">Current Capability Level</span>
              <p className="levelbox__value">
                <span className="levelbox__num mono">{currentLevel}</span>
                <span className="levelbox__label">{capabilityLevelLabels[currentLevel]}</span>
              </p>
            </div>

            <div className="levelbox levelbox--target">
              <span className="eyebrow">Target Level</span>
              <p className="levelbox__value">
                <span className="levelbox__num mono">{targetLevel}</span>
                <span className="levelbox__label">{capabilityLevelLabels[targetLevel]}</span>
              </p>
            </div>

            <div className="levelbox levelbox--completion">
              <span className="eyebrow">Delta Kesenjangan</span>
              <p className="levelbox__value">
                <span className="levelbox__num mono" style={{ color: gap > 0 ? '#c5221f' : '#137333' }}>
                  {gap}
                </span>
                <span className="levelbox__label">
                  {gap === 0 ? 'Memenuhi target organisasi' : `${gap} level di bawah target`}
                </span>
              </p>
            </div>
          </div>

          {/* Rantai Agregasi (Aggregation Trail) */}
          <div className="aggregation-trail-section">
            <h3 className="section-subhead">Rantai Agregasi Evaluasi Berjenjang (Audit Trail)</h3>
            <p className="text-secondary" style={{ fontSize: '13px', margin: '0 0 16px' }}>
              Rekam jejak evaluasi CPM per level yang membuktikan mengapa proses evaluasi berhenti pada level tertentu:
            </p>

            <div className="trail-timeline">
              {trail.map((step) => (
                <div
                  key={step.level}
                  className={`trail-item ${step.isComplete ? 'trail-item--pass' : 'trail-item--stop'}`}
                >
                  <div className="trail-item__marker">
                    {step.isComplete ? '✓' : '🛑'}
                  </div>
                  <div className="trail-item__content">
                    <div className="trail-item__top">
                      <strong>Level {step.level}</strong>
                      <span className="trail-item__stat">
                        Pemenuhan: <strong>{step.pct}%</strong> | Rating: <strong>{step.rating}</strong> | Status: <strong>{step.status}</strong>
                      </span>
                    </div>
                    <p className="trail-item__desc">{step.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths and Gaps */}
          <div className="strengths-gaps-grid">
            <div className="card-subcol">
              <h4>Kekuatan (Praktik Terpenuhi Penuh)</h4>
              {strengths.length === 0 ? (
                <p className="text-muted" style={{ fontSize: '13px' }}>Belum ada aktivitas yang dinilai 'Yes'.</p>
              ) : (
                <ul className="audit-points-list">
                  {strengths.map((str, idx) => (
                    <li key={idx}>✓ {str}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card-subcol">
              <h4>Area Kelemahan (Kesenjangan / Gap)</h4>
              {gaps.length === 0 ? (
                <p className="text-muted" style={{ fontSize: '13px' }}>Tidak ada kesenjangan teridentifikasi.</p>
              ) : (
                <ul className="audit-points-list audit-points-list--gaps">
                  {gaps.map((g, idx) => (
                    <li key={idx}>⚠️ {g}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
