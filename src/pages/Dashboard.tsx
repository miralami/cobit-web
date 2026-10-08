import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import cobitFactors from '../data/cobitDesignFactors.json';
import './Dashboard.css';

const STAGES = ['Setup & Design Factor', 'Workspace CPM', 'Evidence Register', 'Capability Results', 'Gap Analysis', 'Recommendations'];

export default function Dashboard() {
  const { state } = useAssessment();
  const { scopedObjectiveIds, objectiveTargets, assessments, evidenceList, recommendations } = state;

  const firstScopedId = scopedObjectiveIds[0] || 'EDM03';

  // Calculate stats
  const totalScoped = scopedObjectiveIds.length;

  const { avgCurrent, totalGaps, ratedActivitiesCount, totalActivitiesCount } = useMemo(() => {
    let sumCurrent = 0;
    let sumGaps = 0;
    let rated = 0;
    let totalAct = 0;

    for (const id of scopedObjectiveIds) {
      const data = assessments[id];
      const target = objectiveTargets[id] ?? 3;
      const current = data?.currentLevel ?? 1;
      sumCurrent += current;
      sumGaps += Math.max(0, target - current);

      if (data) {
        for (const act of data.activities) {
          totalAct++;
          if (act.response && act.response !== 'N.A.') rated++;
        }
      }
    }

    return {
      avgCurrent: totalScoped > 0 ? (sumCurrent / totalScoped).toFixed(1) : '0',
      totalGaps: sumGaps,
      ratedActivitiesCount: rated,
      totalActivitiesCount: totalAct,
    };
  }, [scopedObjectiveIds, assessments, objectiveTargets, totalScoped]);

  const progressPercent = totalActivitiesCount > 0 ? Math.round((ratedActivitiesCount / totalActivitiesCount) * 100) : 0;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>COBIT 2019 Assessment Dashboard
          </p>
          <h1 className="page-title">{state.title}</h1>
          <p className="page-lead">
            Dasbor terpusat pemantauan status evaluasi tata kelola TI berbasis COBIT 2019. Menampilkan progres pemenuhan aktivitas, capaian level kapabilitas, dan kesenjangan (gap) terhadap target institusi.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/assessments/setup" className="btn btn--secondary">
            Konfigurasi &amp; Design Factor
          </Link>
          <Link to={`/assessments/workspace/${firstScopedId}`} className="btn btn--primary">
            Lanjutkan Asesmen
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* ---------------- Facts KPI Strip ---------------- */}
      <section className="facts" aria-label="Assessment summary">
        <div className="card facts__card">
          <span className="eyebrow">Organisasi / Kementerian</span>
          <p className="facts__value" style={{ fontSize: '18px', fontWeight: 600 }}>{state.organization}</p>
          <p className="facts__meta mono">{state.assessor} · {state.period}</p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Status Ruang Lingkup</span>
          <p className="facts__value num">{totalScoped} <span style={{ fontSize: '14px', fontWeight: 500 }}>Objektif</span></p>
          <p className="facts__meta">{totalGaps} level kesenjangan tersisa</p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Progres Rating Aktivitas</span>
          <p className="facts__value num">{progressPercent}%</p>
          <div className="progress" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress__fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="facts__meta">{ratedActivitiesCount} dari {totalActivitiesCount} butir selesai dinilai</p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Rata-rata Capability Level</span>
          <p className="facts__value num">Level {avgCurrent}</p>
          <p className="facts__meta">Dari 5 skala COBIT CPM</p>
        </div>
      </section>

      {/* ---------------- Stage tracker ---------------- */}
      <section className="card stagecard" aria-label="Assessment lifecycle stage">
        <div className="card__head">
          <h2 className="card__title">Tahapan Siklus Evaluasi COBIT 2019</h2>
          <span className="tag mono">Live Reactive State</span>
        </div>
        <div className="stagebar">
          {STAGES.map((st, i) => (
            <div key={st} className="stagebar__step stagebar__step--complete">
              <div className="stagebar__marker mono">0{i + 1}</div>
              <div className="stagebar__meta">
                <span className="stagebar__name">{st}</span>
                <span className="stagebar__status">Aktif</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Scoped Objectives Overview Table ---------------- */}
      <section className="card" style={{ marginTop: 'var(--space-5)' }}>
        <div className="card__head">
          <h2 className="card__title">Objektif dalam Ruang Lingkup Asesmen ({totalScoped})</h2>
          <Link to="/results" className="btn btn--subtle btn--sm">
            Lihat Analisis Lengkap →
          </Link>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Kode</th>
                <th>Nama Objektif</th>
                <th style={{ width: '100px' }} className="table__num">Current</th>
                <th style={{ width: '100px' }} className="table__num">Target</th>
                <th style={{ width: '120px' }} className="table__num">Gap</th>
                <th style={{ width: '140px' }}>Status CPM</th>
                <th style={{ width: '120px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {scopedObjectiveIds.map((id) => {
                const meta = cobitFactors.objectives.find((o) => o.id === id);
                const data = assessments[id];
                const target = objectiveTargets[id] ?? 3;
                const current = data?.currentLevel ?? 1;
                const gap = Math.max(0, target - current);
                return (
                  <tr key={id}>
                    <td><strong>{id}</strong></td>
                    <td>
                      <strong>{meta?.name || id}</strong>
                      <span className="tag" style={{ marginLeft: '8px' }}>{meta?.domain}</span>
                    </td>
                    <td className="table__num"><strong>Level {current}</strong></td>
                    <td className="table__num" style={{ color: '#137333' }}><strong>Level {target}</strong></td>
                    <td className="table__num" style={{ color: gap > 0 ? '#c5221f' : '#137333' }}>
                      <strong>{gap} Level</strong>
                    </td>
                    <td>
                      <span className={`badge ${gap === 0 ? 'badge--success' : 'badge--warning'}`}>
                        {gap === 0 ? 'Tercapai' : 'Kesenjangan'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/assessments/workspace/${id}`} className="btn btn--subtle btn--sm">
                        Asesmen →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
        <div className="card">
          <div className="card__head">
            <h3 className="card__title">Evidensi Terdaftar ({evidenceList.length})</h3>
            <Link to="/evidence" className="btn btn--subtle btn--sm">Kelola Bukti →</Link>
          </div>
          <p className="text-secondary" style={{ fontSize: '13px', margin: '0 0 12px' }}>
            Bukti audit yang telah ditautkan ke aktivitas COBIT untuk menjamin keterlacakan temuan:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {evidenceList.slice(0, 4).map((e) => (
              <li key={e.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>{e.id}</strong> — {e.title.slice(0, 45)}...</span>
                <span className="tag mono">{e.type}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card__head">
            <h3 className="card__title">Rencana Rekomendasi ({recommendations.length})</h3>
            <Link to="/recommendations" className="btn btn--subtle btn--sm">Lihat Matriks →</Link>
          </div>
          <p className="text-secondary" style={{ fontSize: '13px', margin: '0 0 12px' }}>
            Rekomendasi perbaikan tata kelola TI dalam 3 aspek (People, Process, Technology):
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {recommendations.slice(0, 4).map((r) => (
              <li key={r.id}>
                <strong>{r.practiceCode}</strong>: {r.gapDescription.slice(0, 50)}...
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
