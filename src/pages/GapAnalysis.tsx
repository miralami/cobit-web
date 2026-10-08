import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import cobitFactors from '../data/cobitDesignFactors.json';
import './GapAnalysis.css';

const capabilityLevelLabels: Record<number, string> = {
  0: 'Incomplete',
  1: 'Initial',
  2: 'Managed',
  3: 'Defined',
  4: 'Quantitatively Managed',
  5: 'Optimizing',
};

export default function GapAnalysis() {
  const { state } = useAssessment();
  const { scopedObjectiveIds, objectiveTargets, assessments } = state;

  const gapRows = useMemo(() => {
    return scopedObjectiveIds.map((id) => {
      const meta = cobitFactors.objectives.find((o) => o.id === id);
      const data = assessments[id];
      const target = objectiveTargets[id] ?? 3;
      const current = data?.currentLevel ?? 1;
      const gap = Math.max(0, target - current);
      return {
        id,
        name: meta?.name || id,
        domain: meta?.domain || 'EDM',
        current,
        target,
        gap,
        isAchieved: gap === 0,
      };
    });
  }, [scopedObjectiveIds, objectiveTargets, assessments]);

  const totalGap = gapRows.reduce((sum, r) => sum + r.gap, 0);
  const widestGap = gapRows.length > 0 ? Math.max(...gapRows.map((r) => r.gap)) : 0;
  const achievedCount = gapRows.filter((r) => r.isAchieved).length;
  const avgFulfillment =
    gapRows.length > 0
      ? Math.round((gapRows.reduce((sum, r) => sum + (r.current / r.target), 0) / gapRows.length) * 100)
      : 0;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Analisis Kesenjangan Kapabilitas
          </p>
          <h1 className="page-title">Capability Gap Analysis</h1>
          <p className="page-lead">
            Perbandingan objektif antara capaian kapabilitas aktual saat ini (Current Capability Level) terhadap target tingkat kapabilitas yang diharapkan organisasi (Target Level).
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/results" className="btn btn--secondary">
            ← Hasil Kapabilitas
          </Link>
          <Link to="/recommendations" className="btn btn--primary">
            Rekomendasi Perbaikan 3 Aspek →
          </Link>
        </div>
      </header>

      {/* Aggregate KPI Cards */}
      <section className="gapsum" aria-label="Gap summary">
        <div className="card gapsum__card">
          <span className="eyebrow">Objektif Dinilai</span>
          <p className="gapsum__value num">{gapRows.length}</p>
          <p className="gapsum__meta">{achievedCount} objektif memenuhi target</p>
        </div>
        <div className="card gapsum__card">
          <span className="eyebrow">Total Kesenjangan</span>
          <p className="gapsum__value num" style={{ color: totalGap > 0 ? '#c5221f' : '#137333' }}>
            {totalGap} Level
          </p>
          <p className="gapsum__meta">Akumulasi level yang perlu ditingkatkan</p>
        </div>
        <div className="card gapsum__card">
          <span className="eyebrow">Kesenjangan Terlebar</span>
          <p className="gapsum__value num">{widestGap} Level</p>
          <p className="gapsum__meta">Gap terbesar pada satu objektif</p>
        </div>
        <div className="card gapsum__card">
          <span className="eyebrow">Rata-rata Pemenuhan Target</span>
          <p className="gapsum__value num">{avgFulfillment}%</p>
          <p className="gapsum__meta">{state.organization} · {state.period}</p>
        </div>
      </section>

      {/* Gap Comparison Table */}
      <section className="card reveal" aria-labelledby="gap-table-heading">
        <div className="card__head">
          <h2 id="gap-table-heading" className="card__title">
            Matriks Komparasi Capaian vs Target
          </h2>
          <span className="tag mono">{state.period}</span>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '100px' }}>Kode</th>
                <th scope="col">Nama Objektif Tata Kelola / Manajemen</th>
                <th scope="col" className="table__num">Current</th>
                <th scope="col" className="table__num">Target</th>
                <th scope="col" style={{ width: '180px' }}>Visualisasi Capaian</th>
                <th scope="col" className="table__num">Gap</th>
                <th scope="col" style={{ width: '130px' }}>Status</th>
                <th scope="col" style={{ width: '100px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {gapRows.map((row) => (
                <tr key={row.id}>
                  <td className="table__primary mono">
                    <strong>{row.id}</strong>
                  </td>
                  <td>
                    <strong>{row.name}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                      Target: {capabilityLevelLabels[row.target]}
                    </div>
                  </td>
                  <td className="table__num">
                    <span className="mono" style={{ fontSize: '16px', fontWeight: 700 }}>
                      Level {row.current}
                    </span>
                  </td>
                  <td className="table__num">
                    <span className="mono" style={{ fontSize: '16px', fontWeight: 700, color: '#137333' }}>
                      Level {row.target}
                    </span>
                  </td>
                  <td>
                    <div className="gap-scale-track">
                      {[1, 2, 3, 4, 5].map((lvl) => {
                        let fillClass = 'lvl-dot--empty';
                        if (lvl <= row.current) {
                          fillClass = 'lvl-dot--current';
                        } else if (lvl <= row.target) {
                          fillClass = 'lvl-dot--gap';
                        }
                        return (
                          <span
                            key={lvl}
                            className={`lvl-dot ${fillClass}`}
                            title={`Level ${lvl}`}
                          >
                            {lvl}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="table__num">
                    <span
                      className="mono"
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: row.gap > 0 ? '#c5221f' : '#137333',
                      }}
                    >
                      {row.gap}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        row.isAchieved ? 'badge--success' : 'badge--warning'
                      }`}
                    >
                      {row.isAchieved ? '✓ Tercapai' : `Gap ${row.gap} Level`}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/assessments/workspace/${row.id}`}
                      className="btn btn--subtle btn--sm"
                    >
                      Asesmen →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
