import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import type { FullAssessmentState, SnapshotSummary } from '../types';

const LIVE_ID = 'live';

function summarize(state: FullAssessmentState): SnapshotSummary {
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
  return {
    totalObjectives,
    avgCurrentLevel:
      totalObjectives > 0
        ? Math.round((rows.reduce((sum, r) => sum + r.currentLevel, 0) / totalObjectives) * 100) / 100
        : 0,
    totalGap: rows.reduce((sum, r) => sum + r.gap, 0),
    achievedCount: rows.filter((r) => r.gap === 0).length,
    evidenceCount: state.evidenceList.length,
    recommendationCount: state.recommendations.length,
    rows,
  };
}

function delta(candidate: number, baseline: number): number {
  return Math.round((candidate - baseline) * 100) / 100;
}

function DeltaBadge({ value, unit = '', invert = false }: { value: number; unit?: string; invert?: boolean }) {
  if (value === 0) return <span className="delta delta--flat">0{unit}</span>;
  const positive = value > 0;
  const good = invert ? !positive : positive;
  return (
    <span className={`delta ${good ? 'delta--up' : 'delta--down'}`}>
      {positive ? '▲' : '▼'} {positive ? '+' : ''}
      {value}
      {unit}
    </span>
  );
}

export default function CompareAssessments() {
  const { state, snapshots, createSnapshot, deleteSnapshot } = useAssessment();

  const liveSummary = useMemo(() => summarize(state), [state]);
  const mySnapshots = useMemo(
    () => snapshots.filter((s) => s.assessmentId === state.id),
    [snapshots, state.id]
  );

  const options = useMemo(
    () => [
      { id: LIVE_ID, label: 'Live — kondisi saat ini', createdAt: state.updatedAt, summary: liveSummary },
      ...mySnapshots.map((s) => ({
        id: s.id,
        label: s.label,
        createdAt: s.createdAt,
        summary: s.summary,
      })),
    ],
    [liveSummary, mySnapshots, state.updatedAt]
  );

  const [baselineId, setBaselineId] = useState<string>(LIVE_ID);
  const [candidateId, setCandidateId] = useState<string>(LIVE_ID);

  const baseline = options.find((o) => o.id === baselineId) ?? options[0];
  const candidate = options.find((o) => o.id === candidateId) ?? options[0];

  // Per-objective comparison over the union of both rows
  const rowComparison = useMemo(() => {
    const ids = Array.from(
      new Set([...baseline.summary.rows.map((r) => r.objectiveId), ...candidate.summary.rows.map((r) => r.objectiveId)])
    );
    const bMap = new Map(baseline.summary.rows.map((r) => [r.objectiveId, r]));
    const cMap = new Map(candidate.summary.rows.map((r) => [r.objectiveId, r]));
    return ids.map((id) => {
      const b = bMap.get(id);
      const c = cMap.get(id);
      const bLevel = b?.currentLevel ?? 0;
      const cLevel = c?.currentLevel ?? 0;
      return {
        objectiveId: id,
        baselineLevel: b ? bLevel : null,
        candidateLevel: c ? cLevel : null,
        targetLevel: c?.targetLevel ?? b?.targetLevel ?? 3,
        levelDelta: b && c ? cLevel - bLevel : null,
      };
    });
  }, [baseline, candidate]);

  const handleSnapshot = () => {
    const label = prompt('Label snapshot (mis. "Semester I 2026" / "Unit A"):', `${state.period}`);
    if (label === null) return;
    createSnapshot(label);
  };

  const noSnapshots = mySnapshots.length === 0;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Assessment Management
          </p>
          <h1 className="page-title">Perbandingan Capability antar-Period / Unit</h1>
          <p className="page-lead">
            Bandingkan capaian kapabilitas pada dua titik waktu. Ambil <em>snapshot</em> untuk membekukan hasil periode
            tertentu, lalu bandingkan antar-snapshot atau terhadap kondisi terkini untuk melihat arah perbaikan.
          </p>
        </div>
        <div className="page-head__actions">
          <button type="button" className="btn btn--primary" onClick={handleSnapshot}>
            📸 Ambil Snapshot Sekarang
          </button>
        </div>
      </header>

      {/* Snapshot roster */}
      <section className="card snap-roster" aria-label="Daftar snapshot">
        <div className="card__head">
          <h2 className="card__title">Riwayat Snapshot ({mySnapshots.length})</h2>
          <span className="tag mono">{state.organization}</span>
        </div>
        <div className="card__body">
          {noSnapshots ? (
            <p className="text-muted">
              Belum ada snapshot. Klik <strong>Ambil Snapshot Sekarang</strong> untuk merekam kondisi hasil saat ini.
            </p>
          ) : (
            <ul className="snap-list">
              {mySnapshots.map((s) => (
                <li key={s.id} className="snap-item">
                  <div>
                    <strong>{s.label}</strong>
                    <span className="snap-item__meta">
                      {new Date(s.createdAt).toLocaleString('id-ID')} · Avg L{s.summary.avgCurrentLevel} ·{' '}
                      {s.summary.totalObjectives} objektif · gate {s.methodConfig.gate}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn--subtle btn--sm text-neg"
                    onClick={() => {
                      if (confirm(`Hapus snapshot "${s.label}"?`)) deleteSnapshot(s.id);
                    }}
                  >
                    🗑️ Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Selectors */}
      <section className="compare-selectors">
        <div className="field">
          <label className="field__label">Baseline (periode pembanding — lebih lama)</label>
          <select className="select" value={baselineId} onChange={(e) => setBaselineId(e.target.value)}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="compare-arrow">→</div>
        <div className="field">
          <label className="field__label">Candidate (periode terbaru)</label>
          <select className="select" value={candidateId} onChange={(e) => setCandidateId(e.target.value)}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {baseline.id === candidate.id && (
        <div className="empty-box">Pilih dua sumber yang berbeda untuk melihat perbandingan.</div>
      )}

      {/* Summary deltas */}
      <section className="gapsum" aria-label="Ringkasan perbandingan">
        <div className="card gapsum__card">
          <span className="eyebrow">Δ Rata-rata Level</span>
          <p className="gapsum__value num">{candidate.summary.avgCurrentLevel}</p>
          <DeltaBadge value={delta(candidate.summary.avgCurrentLevel, baseline.summary.avgCurrentLevel)} />
        </div>
        <div className="card gapsum__card">
          <span className="eyebrow">Δ Total Kesenjangan</span>
          <p className="gapsum__value num">{candidate.summary.totalGap} Level</p>
          <DeltaBadge value={delta(candidate.summary.totalGap, baseline.summary.totalGap)} unit=" Level" invert />
        </div>
        <div className="card gapsum__card">
          <span className="eyebrow">Δ Objektif Tercapai</span>
          <p className="gapsum__value num">
            {candidate.summary.achievedCount} / {candidate.summary.totalObjectives}
          </p>
          <DeltaBadge value={delta(candidate.summary.achievedCount, baseline.summary.achievedCount)} />
        </div>
        <div className="card gapsum__card">
          <span className="eyebrow">Δ Dokumen Bukti</span>
          <p className="gapsum__value num">{candidate.summary.evidenceCount}</p>
          <DeltaBadge value={delta(candidate.summary.evidenceCount, baseline.summary.evidenceCount)} />
        </div>
      </section>

      {/* Per-objective table */}
      <section className="card reveal" aria-labelledby="compare-table-heading">
        <div className="card__head">
          <h2 id="compare-table-heading" className="card__title">
            Matriks Perbandingan Capability per Objektif
          </h2>
          <span className="tag mono">
            {baseline.label} → {candidate.label}
          </span>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '110px' }}>Kode</th>
                <th scope="col" className="table__num">Baseline</th>
                <th scope="col" className="table__num">Candidate</th>
                <th scope="col" className="table__num">Target</th>
                <th scope="col" style={{ width: '170px' }}>Arah Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {rowComparison.map((row) => {
                const d = row.levelDelta;
                const cls = d === null ? 'delta--flat' : d > 0 ? 'delta--up' : d < 0 ? 'delta--down' : 'delta--flat';
                const label = d === null ? '—' : d > 0 ? `Naik ${d} level` : d < 0 ? `Turun ${Math.abs(d)} level` : 'Stabil';
                return (
                  <tr key={row.objectiveId}>
                    <td className="table__primary mono"><strong>{row.objectiveId}</strong></td>
                    <td className="table__num mono">{row.baselineLevel === null ? '—' : `L${row.baselineLevel}`}</td>
                    <td className="table__num mono">{row.candidateLevel === null ? '—' : `L${row.candidateLevel}`}</td>
                    <td className="table__num mono text-success">L{row.targetLevel}</td>
                    <td>
                      <span className={`delta ${cls}`}>{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card__body">
          <p className="text-secondary" style={{ fontSize: '12px' }}>
            Catatan: perbandingan ini merefleksikan perubahan <em>data asesmen</em> (rating, target, scope) antara dua
            titik, bukan pengukuran dampak intervensi. Setiap snapshot menyimpan gate aktif saat pembuatannya.
          </p>
          <Link to={`/assessments/${state.id}/results`} className="btn btn--subtle btn--sm">
            ← Kembali ke Hasil Kapabilitas
          </Link>
        </div>
      </section>
    </div>
  );
}
