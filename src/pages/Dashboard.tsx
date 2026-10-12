import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import cobitFactors from '../data/cobitDesignFactors.json';

const STAGES = [
  { name: 'Setup & Design Factor', path: 'setup' },
  { name: 'Workspace CPM', path: 'workspace' },
  { name: 'Evidence Register', path: 'evidence' },
  { name: 'Capability Results', path: 'results' },
  { name: 'Gap Analysis', path: 'gap' },
  { name: 'Recommendations', path: 'recommendations' },
];

export default function Dashboard() {
  const { state } = useAssessment();
  const { scopedObjectiveIds, objectiveTargets, assessments, evidenceList, recommendations, dfResults } = state;

  const firstScopedId = scopedObjectiveIds[0] || 'EDM03';
  const totalScoped = scopedObjectiveIds.length;

  const { avgCurrent, totalGaps, ratedActivitiesCount, totalActivitiesCount, ratedObjectives } = useMemo(() => {
    let sumCurrent = 0;
    let sumGaps = 0;
    let rated = 0;
    let totalAct = 0;
    let ratedObj = 0;

    for (const id of scopedObjectiveIds) {
      const data = assessments[id];
      const target = objectiveTargets[id] ?? 3;
      const current = data?.currentLevel ?? 1;
      sumCurrent += current;
      sumGaps += Math.max(0, target - current);

      if (data) {
        let objHasResponse = false;
        for (const act of data.activities) {
          totalAct++;
          if (act.response && act.response !== 'N.A.') {
            rated++;
            objHasResponse = true;
          }
        }
        if (objHasResponse) ratedObj++;
      }
    }

    return {
      avgCurrent: totalScoped > 0 ? (sumCurrent / totalScoped).toFixed(1) : '0',
      totalGaps: sumGaps,
      ratedActivitiesCount: rated,
      totalActivitiesCount: totalAct,
      ratedObjectives: ratedObj,
    };
  }, [scopedObjectiveIds, assessments, objectiveTargets, totalScoped]);

  const progressPercent = totalActivitiesCount > 0 ? Math.round((ratedActivitiesCount / totalActivitiesCount) * 100) : 0;

  /* A stage counts as done once it has produced data. */
  const stageDone = useMemo(
    () => [
      dfResults.length > 0 || totalScoped > 0,
      ratedActivitiesCount > 0,
      evidenceList.length > 0,
      ratedObjectives > 0,
      totalGaps >= 0 && ratedObjectives > 0,
      recommendations.length > 0,
    ],
    [dfResults.length, totalScoped, ratedActivitiesCount, evidenceList.length, ratedObjectives, totalGaps, recommendations.length]
  );

  const currentStage = stageDone.findIndex((d) => !d);
  const activeStage = currentStage === -1 ? STAGES.length - 1 : currentStage;

  const basePath = `/assessments/${state.id}`;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>COBIT 2019 Assessment Dashboard
          </p>
          <h1 className="page-title">{state.title}</h1>
          <p className="page-lead">
            Dasbor terpusat pemantauan status evaluasi tata kelola TI berbasis COBIT 2019. Menampilkan progres
            pemenuhan aktivitas, capaian level kapabilitas, dan kesenjangan (gap) terhadap target institusi.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to={`${basePath}/setup`} className="btn btn--subtle">
            Konfigurasi &amp; Design Factor
          </Link>
          <Link to={`${basePath}/workspace/${firstScopedId}`} className="btn btn--primary">
            Lanjutkan Asesmen
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      {/* ---------------- Facts KPI Strip ---------------- */}
      <section className="facts" aria-label="Assessment summary">
        <div className="card facts__card">
          <span className="eyebrow">Organisasi / Kementerian</span>
          <p className="facts__value facts__value--sm">{state.organization}</p>
          <p className="facts__meta mono">{state.assessor} · {state.period}</p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Status Ruang Lingkup</span>
          <p className="facts__value num">
            {totalScoped} <span className="text-sm text-muted">Objektif</span>
          </p>
          <p className={`facts__meta ${totalGaps > 0 ? 'text-danger' : 'text-success'}`}>
            {totalGaps} level kesenjangan tersisa
          </p>
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

      {/* ---------------- Stage rail ---------------- */}
      <section className="card" aria-label="Assessment lifecycle stage">
        <div className="card__head">
          <h2 className="card__title">Tahapan Siklus Evaluasi COBIT 2019</h2>
          <span className="tag mono">Live Reactive State</span>
        </div>
        <div className="card__body">
          <ol className="stagerail">
            {STAGES.map((st, i) => {
              const stateClass = stageDone[i]
                ? 'stagerail__step--done'
                : i === activeStage
                  ? 'stagerail__step--current'
                  : '';
              return (
                <li key={st.name} className={`stagerail__step ${stateClass}`}>
                  <Link to={`${basePath}/${st.path}`} className="stagerail__marker mono">
                    {String(i + 1).padStart(2, '0')}
                  </Link>
                  <span className="stagerail__label">{st.name}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------- Two-column: objectives + previews ---------------- */}
      <div className="dash-cols">
        {/* Left: scoped objectives list */}
        <section className="card card--flush">
          <div className="card__head">
            <h2 className="card__title">Objektif dalam Ruang Lingkup ({totalScoped})</h2>
            <Link to={`${basePath}/results`} className="btn btn--subtle btn--sm">
              Analisis Lengkap →
            </Link>
          </div>

          {totalScoped === 0 ? (
            <div className="card__body">
              <div className="empty-box">
                Belum ada objektif dalam ruang lingkup. Buka halaman Setup &amp; Design Factor untuk memilih objektif
                yang akan dinilai.
              </div>
            </div>
          ) : (
            <ul className="objlist">
              {scopedObjectiveIds.map((id) => {
                const meta = cobitFactors.objectives.find((o) => o.id === id);
                const data = assessments[id];
                const target = objectiveTargets[id] ?? 3;
                const current = data?.currentLevel ?? 1;
                const gap = Math.max(0, target - current);
                const domain = meta?.domain || 'EDM';
                return (
                  <li key={id} className={`objlist__row objlist__row--${domain}`}>
                    <span className="objlist__id mono">{id}</span>
                    <div className="objlist__body">
                      <div className="objlist__title-row">
                        <span className="objlist__name">{meta?.name || id}</span>
                        <span className={`tag tag--${domain}`}>{domain}</span>
                        <span className={`badge ${gap === 0 ? 'badge--success' : 'badge--warning'}`}>
                          {gap === 0 ? 'Tercapai' : `Gap ${gap}`}
                        </span>
                      </div>
                      <p className="objlist__desc">
                        Current Level {current} · Target Level {target}
                      </p>
                    </div>
                    <Link to={`${basePath}/workspace/${id}`} className="btn btn--subtle btn--sm">
                      Asesmen →
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Right: evidence + recommendation previews */}
        <div className="stack stack-4">
          <section className="card card--flush">
            <div className="card__head">
              <h2 className="card__title">Evidensi Terdaftar ({evidenceList.length})</h2>
              <Link to={`${basePath}/evidence`} className="btn btn--subtle btn--sm">Kelola →</Link>
            </div>
            <div className="card__body">
              <p className="text-sm text-secondary" style={{ margin: '0 0 12px' }}>
                Bukti audit yang ditautkan ke aktivitas COBIT untuk menjamin keterlacakan temuan:
              </p>
              {evidenceList.length === 0 ? (
                <div className="empty-box">Belum ada bukti terdaftar.</div>
              ) : (
                <ul className="feed">
                  {evidenceList.slice(0, 4).map((e) => (
                    <li key={e.id} className="feed__row">
                      <span className="feed__mark feed__mark--evidence" />
                      <div className="feed__body">
                        <div className="feed__head">
                          <span className="feed__action">{e.title}</span>
                          <span className="feed__type">{e.type}</span>
                        </div>
                        <span className="feed__details mono-ref">{e.referenceNumber || e.id}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="card card--flush">
            <div className="card__head">
              <h2 className="card__title">Rencana Rekomendasi ({recommendations.length})</h2>
              <Link to={`${basePath}/recommendations`} className="btn btn--subtle btn--sm">Matriks →</Link>
            </div>
            <div className="card__body">
              <p className="text-sm text-secondary" style={{ margin: '0 0 12px' }}>
                Rekomendasi perbaikan tata kelola TI dalam 3 aspek (People, Process, Technology):
              </p>
              {recommendations.length === 0 ? (
                <div className="empty-box">Belum ada rekomendasi. Lengkapi analisis gap terlebih dahulu.</div>
              ) : (
                <ul className="feed">
                  {recommendations.slice(0, 4).map((r) => (
                    <li key={r.id} className="feed__row">
                      <span className="feed__mark feed__mark--review" />
                      <div className="feed__body">
                        <div className="feed__head">
                          <span className="feed__action">{r.practiceCode}</span>
                        </div>
                        <span className="feed__details">{r.gapDescription}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
