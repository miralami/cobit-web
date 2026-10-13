import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context';
import cobitFactors from '../data/cobitDesignFactors.json';
import type { CapabilityLevel } from '../types';

const STEPS = [
  { n: 1, label: 'Inisiasi Asesmen' },
  { n: 2, label: 'DF1: Strategi' },
  { n: 3, label: 'DF2: Enterprise Goals' },
  { n: 4, label: 'DF3: Profil Risiko' },
  { n: 5, label: 'DF4: Isu I&T' },
  { n: 6, label: 'Canvas & Scoping' },
];

interface AssessmentSetupProps {
  mode?: 'create' | 'edit';
}

export default function AssessmentSetup({ mode = 'edit' }: AssessmentSetupProps) {
  const navigate = useNavigate();
  const {
    state,
    updateMetadata,
    updateDF1,
    updateDF2Goal,
    updateDF3Risk,
    updateDF4Issue,
    setScopedObjectives,
    setObjectiveTarget,
    loadBenchmarkData,
    resetToDefault,
    exportStateJSON,
    importStateJSON,
  } = useAssessment();

  // In edit mode with existing scope, start at Canvas (step 6)
  const initialStep = mode === 'edit' && state.scopedObjectiveIds.length > 0 ? 6 : 1;
  const [step, setStep] = useState(initialStep);
  const [selectedBscTab, setSelectedBscTab] = useState<string>('All');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [showConfirm, setShowConfirm] = useState(false);

  const { df1, df2, df3, df4, dfResults, scopedObjectiveIds, objectiveTargets } = state;

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleToggleObjective = (objId: string) => {
    if (scopedObjectiveIds.includes(objId)) {
      setScopedObjectives(scopedObjectiveIds.filter((id) => id !== objId));
    } else {
      setScopedObjectives([...scopedObjectiveIds, objId]);
    }
  };

  const handleTargetChange = (objId: string, target: CapabilityLevel) => {
    setObjectiveTarget(objId, target);
  };

  const startAssessment = () => {
    if (scopedObjectiveIds.length === 0) {
      alert('Pilih minimal satu objektif COBIT untuk memulai asesmen.');
      return;
    }
    setShowConfirm(true);
  };

  const confirmStart = () => {
    setShowConfirm(false);
    navigate(`/assessments/${state.id}/workspace/${scopedObjectiveIds[0]}`);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importStateJSON(content);
        if (ok) {
          alert('Konfigurasi asesmen berhasil dimuat!');
        } else {
          alert('Format file JSON tidak valid.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Grouped DF2 by BSC
  const bscCategories = ['All', 'Financial', 'Customer', 'Internal', 'Learning & Growth'];
  const filteredDF2 = useMemo(() => {
    if (selectedBscTab === 'All') return cobitFactors.df2_categories;
    return cobitFactors.df2_categories.filter((c) => c.category === selectedBscTab);
  }, [selectedBscTab]);

  // Filtered Canvas results
  const filteredDFResults = useMemo(() => {
    if (domainFilter === 'All') return dfResults;
    return dfResults.filter((r) => r.domain === domainFilter);
  }, [dfResults, domainFilter]);

  // Top recommendations: sorted by normalized score desc
  const sortedByPriority = useMemo(() => {
    return [...dfResults].sort((a, b) => b.normalizedScore - a.normalizedScore);
  }, [dfResults]);

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>COBIT 2019 Design Factor Toolkit
          </p>
          <h1 className="page-title">
            {mode === 'create' ? 'Asesmen Baru — Setup & Design Factor' : `Edit Konfigurasi — ${state.title}`}
          </h1>
          <p className="page-lead">
            {mode === 'create'
              ? 'Konfigurasi parameter organisasi dan hitung skor prioritas objektif COBIT 2019 melalui perkalian matriks standar ISACA (DF1–DF4).'
              : 'Edit parameter organisasi dan skor prioritas objektif COBIT 2019. Perubahan akan langsung memperbarui hasil perhitungan.'}
          </p>
        </div>
        <div className="setup__header-actions">
          <button
            type="button"
            className="btn btn--subtle"
            onClick={() => {
              if (confirm('Reset asesmen ke pengaturan default?')) resetToDefault();
            }}
          >
            Reset
          </button>
          <button type="button" className="btn btn--subtle" onClick={exportStateJSON}>
            Export JSON
          </button>
          <label className="btn btn--subtle file-upload-btn">
            Import JSON
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
          </label>
        </div>
      </header>

      {/* ---------------- Step Indicator ---------------- */}
      <ol className="steps" aria-label="Setup progress">
        {STEPS.map((s) => {
          const stateClass = s.n < step ? 'done' : s.n === step ? 'current' : 'todo';
          return (
            <li
              key={s.n}
              className={`steps__item steps__item--${stateClass}`}
              onClick={() => setStep(s.n)}
              style={{ cursor: 'pointer' }}
            >
              <span className="steps__marker">{s.n < step ? '✓' : s.n}</span>
              <span className="steps__label">{s.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="setup__layout">
        {/* ================= STEP 1: INISIASI ================= */}
        {step === 1 && (
          <div className="setup__step-card">
            <div className="setup__step-head">
              <h2>Langkah 1: Inisiasi Assessment Record</h2>
              <p className="text-secondary">
                Isi profil institusi dan metadata audit untuk pelaporan audit resmi.
              </p>
            </div>
            <div className="form-grid">
              <div className="field form-grid__wide">
                <label className="field__label">Nama Organisasi / Kementerian</label>
                <input
                  type="text"
                  className="input"
                  value={state.organization}
                  onChange={(e) => updateMetadata({ organization: e.target.value })}
                  placeholder="e.g. Kementerian PANRB"
                />
              </div>
              <div className="field form-grid__wide">
                <label className="field__label">Judul Audit / Evaluasi</label>
                <input
                  type="text"
                  className="input"
                  value={state.title}
                  onChange={(e) => updateMetadata({ title: e.target.value })}
                  placeholder="e.g. Evaluasi SPBE & Tata Kelola Keamanan Siber 2026"
                />
              </div>
              <div className="field">
                <label className="field__label">Nama Assessor / Tim Audit</label>
                <input
                  type="text"
                  className="input"
                  value={state.assessor}
                  onChange={(e) => updateMetadata({ assessor: e.target.value })}
                  placeholder="e.g. Vio Salman Kafiyan"
                />
              </div>
              <div className="field">
                <label className="field__label">Periode Evaluasi</label>
                <input
                  type="text"
                  className="input"
                  value={state.period}
                  onChange={(e) => updateMetadata({ period: e.target.value })}
                  placeholder="e.g. Semester I - 2026"
                />
              </div>
            </div>

            <div className="setup__benchmark-banner">
              <div className="setup__benchmark-text">
                <strong>Ingin mencoba sistem dengan contoh data?</strong>
                <p>
                  Klik tombol <em>Muat Data Demo</em> untuk mengisi otomatis formulir DF1–4 dan respons asesmen. Data ini
                  bersifat <strong>sintetis/demo</strong> (diturunkan dari latihan asesmen sebelumnya), bukan dataset resmi
                  PANRB maupun benchmark ISACA.
                </p>
                <p className="setup__benchmark-hint">
                  Data demo sintetis · hasil hanya cek konsistensi internal terhadap aturan CPM yang didokumentasikan aplikasi.
                </p>
              </div>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  loadBenchmarkData();
                  alert('Data demo berhasil dimuat!');
                }}
              >
                ⚡ Muat Data Demo
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: DF1 ENTERPRISE STRATEGY ================= */}
        {step === 2 && (
          <div className="setup__step-card">
            <div className="setup__step-head">
              <h2>Langkah 2: Design Factor 1 — Enterprise Strategy (DF1)</h2>
              <p className="text-secondary">
                Tentukan bobot kepentingan strategi organisasi pada skala 1 (Sangat Rendah) hingga 5 (Sangat Tinggi). Nilai acuan baseline ISACA adalah 3.
              </p>
            </div>
            <div className="df-cards-grid">
              {cobitFactors.df1_categories.map((cat) => {
                const currentVal = (df1 as any)[cat.id] ?? 3;
                return (
                  <div key={cat.id} className="df-slider-card">
                    <div className="df-slider-card__head">
                      <h3>{cat.name}</h3>
                      <span className="df-val-badge">Nilai: {currentVal}</span>
                    </div>
                    <p className="df-slider-card__desc">{cat.description}</p>
                    <div className="df-slider-container">
                      <div className="range-slider__labels">
                        <span>1 (Rendah)</span>
                        <span className="range-slider__baseline">Baseline: 3</span>
                        <span>5 (Tinggi)</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={currentVal}
                        onChange={(e) => updateDF1({ [cat.id]: parseInt(e.target.value, 10) })}
                        className="range-slider"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 3: DF2 ENTERPRISE GOALS ================= */}
        {step === 3 && (
          <div className="setup__step-card">
            <div className="setup__step-head">
              <h2>Langkah 3: Design Factor 2 — Enterprise Goals (DF2)</h2>
              <p className="text-secondary">
                Tentukan tingkat prioritas 13 Enterprise Goals COBIT 2019 berdasarkan Balanced Scorecard (BSC).
              </p>
              <div className="tabs-nav">
                {bscCategories.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`tab-btn ${selectedBscTab === tab ? 'tab-btn--active' : ''}`}
                    onClick={() => setSelectedBscTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="df-cards-grid">
              {filteredDF2.map((goal) => {
                const val = df2.goals[goal.id] ?? 3;
                return (
                  <div key={goal.id} className="df-slider-card">
                    <div className="df-slider-card__head">
                      <div>
                        <span className="domain-chip domain-chip--apo">{goal.category}</span>
                        <h3 style={{ marginTop: '6px' }}>{goal.id} — {goal.name}</h3>
                      </div>
                      <span className="df-val-badge">Nilai: {val}</span>
                    </div>
                    <div className="df-slider-container">
                      <div className="range-slider__labels">
                        <span>1 (Tidak Relevan)</span>
                        <span className="range-slider__baseline">Baseline: 3</span>
                        <span>5 (Kritis)</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={val}
                        onChange={(e) => updateDF2Goal(goal.id, parseInt(e.target.value, 10))}
                        className="range-slider"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 4: DF3 RISK PROFILE ================= */}
        {step === 4 && (
          <div className="setup__step-card">
            <div className="setup__step-head">
              <h2>Langkah 4: Design Factor 3 — Risk Profile (DF3)</h2>
              <p className="text-secondary">
                Nilai 19 Kategori Risiko TI berdasarkan Dampak (Impact 1–5) dan Probabilitas (Likelihood 1–5). Rating aktual dihitung otomatis (Impact × Likelihood, skala 1–25, baseline 9).
              </p>
            </div>
            <div className="risk-table-container">
              <table className="risk-table">
                <thead>
                  <tr>
                    <th>No & Kategori Risiko</th>
                    <th>Impact (1–5)</th>
                    <th>Likelihood (1–5)</th>
                    <th>Actual Rating</th>
                    <th>Kategori Risiko</th>
                  </tr>
                </thead>
                <tbody>
                  {cobitFactors.df3_categories.map((rsk) => {
                    const item = df3.risks[rsk.id] || { impact: 3, likelihood: 3 };
                    const rating = item.impact * item.likelihood;
                    let riskCategory = 'Medium';
                    let riskClass = 'risk-badge--med';
                    if (rating >= 15) {
                      riskCategory = 'High';
                      riskClass = 'risk-badge--high';
                    } else if (rating <= 6) {
                      riskCategory = 'Low';
                      riskClass = 'risk-badge--low';
                    }
                    return (
                      <tr key={rsk.id}>
                        <td>
                          <strong>{rsk.id}</strong> — {rsk.name}
                        </td>
                        <td>
                          <select
                            className="select"
                            value={item.impact}
                            onChange={(e) =>
                              updateDF3Risk(rsk.id, parseInt(e.target.value, 10), item.likelihood)
                            }
                          >
                            {[1, 2, 3, 4, 5].map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="select"
                            value={item.likelihood}
                            onChange={(e) =>
                              updateDF3Risk(rsk.id, item.impact, parseInt(e.target.value, 10))
                            }
                          >
                            {[1, 2, 3, 4, 5].map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <span className="rating-num">{rating}</span>
                          <span className="text-muted" style={{ fontSize: '11px', marginLeft: '4px' }}>
                            (base: 9)
                          </span>
                        </td>
                        <td>
                          <span className={`risk-badge ${riskClass}`}>{riskCategory}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= STEP 5: DF4 I&T ISSUES ================= */}
        {step === 5 && (
          <div className="setup__step-card">
            <div className="setup__step-head">
              <h2>Langkah 5: Design Factor 4 — I&T-Related Issues (DF4)</h2>
              <p className="text-secondary">
                Tentukan kondisi 20 permasalahan teknologi informasi yang dialami institusi (1 = Rendah/Tidak Ada Masalah, 2 = Sedang, 3 = Serius).
              </p>
            </div>
            <div className="issues-list">
              {cobitFactors.df4_categories.map((iss) => {
                const val = df4.issues[iss.id] ?? 2;
                return (
                  <div key={iss.id} className="issue-row">
                    <div className="issue-row__text">
                      <span className="issue-code">{iss.id}</span>
                      <p className="issue-desc">{iss.description}</p>
                    </div>
                    <div className="segmented">
                      <button
                        type="button"
                        className={`segmented__btn ${val === 1 ? 'segmented__btn--active' : ''}`}
                        onClick={() => updateDF4Issue(iss.id, 1)}
                      >
                        1 (Rendah)
                      </button>
                      <button
                        type="button"
                        className={`segmented__btn ${val === 2 ? 'segmented__btn--active' : ''}`}
                        onClick={() => updateDF4Issue(iss.id, 2)}
                      >
                        2 (Sedang)
                      </button>
                      <button
                        type="button"
                        className={`segmented__btn ${val === 3 ? 'segmented__btn--danger' : ''}`}
                        onClick={() => updateDF4Issue(iss.id, 3)}
                      >
                        3 (Serius)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 6: CANVAS & SCOPING ================= */}
        {step === 6 && (
          <div className="setup__step-card">
            <div className="setup__step-head">
              <h2>Langkah 6: Canvas Step 2 — Hasil Skoring & Penentuan Ruang Lingkup</h2>
              <p className="text-secondary">
                Grafik skor normalisasi (-100 hingga +100) seluruh 40 objektif COBIT 2019 hasil integrasi DF1–DF4. Pilih objektif yang masuk dalam ruang lingkup audit dan tentukan Target Capability Level.
              </p>
            </div>

            <div className="canvas-panels">
            <div className="canvas-panels__main">

            {/* Filter Domain */}
            <div className="canvas-filter-bar">
              <span className="filter-label">Filter Domain:</span>
              {['All', 'EDM', 'APO', 'BAI', 'DSS', 'MEA'].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`btn-filter ${domainFilter === d ? 'btn-filter--active' : ''}`}
                  onClick={() => setDomainFilter(d)}
                >
                  {d}
                </button>
              ))}
              <div className="scoped-counter-badge">
                Terpilih: <strong>{scopedObjectiveIds.length}</strong> Objektif
              </div>
            </div>

            {/* Interpretation Callout */}
            <div className="canvas-callout">
              <div className="canvas-callout__icon" aria-hidden="true">💡</div>
              <div className="canvas-callout__body">
                <strong>Cara membaca grafik:</strong>
                <p>
                  Skor positif = objektif ini diprioritaskan berdasarkan profil strategi, tujuan bisnis, risiko,
                  dan isu I&amp;T organisasi Anda. Skor negatif = relevansinya lebih rendah untuk konteks Anda.
                  Pilih objektif dengan skor tertinggi agar audit tetap terfokus.
                </p>
                {sortedByPriority.length > 0 && (
                  <div className="canvas-extrema">
                    <span className="canvas-extrema__chip canvas-extrema__chip--pos">
                      Skor Tertinggi: <strong>{sortedByPriority[0].objectiveId}</strong> ({sortedByPriority[0].normalizedScore >= 0 ? '+' : ''}
                      {sortedByPriority[0].normalizedScore})
                    </span>
                    <span className="canvas-extrema__chip canvas-extrema__chip--neg">
                      Skor Terendah: <strong>{sortedByPriority[sortedByPriority.length - 1].objectiveId}</strong> ({sortedByPriority[sortedByPriority.length - 1].normalizedScore})
                    </span>
                    <span className="canvas-extrema__chip canvas-extrema__chip--neutral">
                      Total objektif: <strong>{dfResults.length}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Horizontal Bar Visualizer */}
            <div className="canvas-bars-container">
              <h3>Visualisasi Skor Normalisasi Canvas Step 2</h3>
              <div className="bars-list">
                {filteredDFResults.map((res) => {
                  const isPositive = res.normalizedScore >= 0;
                  const barWidth = Math.min(100, Math.abs(res.normalizedScore));
                  const isScoped = scopedObjectiveIds.includes(res.objectiveId);
                  return (
                    <div
                      key={res.objectiveId}
                      className={`canvas-bar-row ${isScoped ? 'canvas-bar-row--scoped' : ''}`}
                      onClick={() => handleToggleObjective(res.objectiveId)}
                    >
                      <div className="canvas-bar-code">
                        <input
                          type="checkbox"
                          checked={isScoped}
                          onChange={() => handleToggleObjective(res.objectiveId)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <strong>{res.objectiveId}</strong>
                        <span className="canvas-bar-domain">{res.domain}</span>
                      </div>
                      <div className="canvas-bar-name" title={`${res.name} — Domain ${res.domain}`}>
                        {res.name}
                      </div>
                      <div className="canvas-bar-track">
                        <div className="canvas-bar-center-line" />
                        {isPositive ? (
                          <div
                            className="canvas-bar-fill canvas-bar-fill--pos"
                            style={{
                              left: '50%',
                              width: `${barWidth / 2}%`,
                            }}
                          />
                        ) : (
                          <div
                            className="canvas-bar-fill canvas-bar-fill--neg"
                            style={{
                              right: '50%',
                              width: `${barWidth / 2}%`,
                            }}
                          />
                        )}
                      </div>
                      <div className={`canvas-bar-score ${isPositive ? 'text-pos' : 'text-neg'}`}>
                        {isPositive ? `+${res.normalizedScore}` : res.normalizedScore}
                      </div>
                      <div className="canvas-bar-target">
                        Target Rec: L{res.suggestedTargetLevel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            </div>
            <div className="canvas-panels__side">

            {/* Scoped Objectives & Target Adjustment Table */}
            <div className="scoping-table-section">
              <h3>Objektif Terpilih dalam Ruang Lingkup Audit ({scopedObjectiveIds.length})</h3>
              {scopedObjectiveIds.length === 0 ? (
                <div className="empty-box">
                  Belum ada objektif yang dipilih. Klik checkbox pada grafik di atas atau pilih dari daftar rekomendasi prioritas di bawah.
                </div>
              ) : (
                <table className="scoping-table">
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Nama Objektif</th>
                      <th>Skor Normalisasi</th>
                      <th>Suggested Target</th>
                      <th>Target Capability Level (Kustom)</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scopedObjectiveIds.map((id) => {
                      const res = dfResults.find((r) => r.objectiveId === id);
                      const currentTarget = objectiveTargets[id] ?? res?.suggestedTargetLevel ?? 3;
                      return (
                        <tr key={id}>
                          <td><strong>{id}</strong></td>
                          <td>{res?.name}</td>
                          <td>
                            <span className={res && res.normalizedScore >= 0 ? 'text-pos' : 'text-neg'}>
                              {res && res.normalizedScore >= 0 ? `+${res.normalizedScore}` : res?.normalizedScore}
                            </span>
                          </td>
                          <td>Level {res?.suggestedTargetLevel}</td>
                          <td>
                            <div className="target-selector">
                              {[1, 2, 3, 4, 5].map((lvl) => (
                                <button
                                  key={lvl}
                                  type="button"
                                  className={`lvl-pill ${currentTarget === lvl ? 'lvl-pill--active' : ''}`}
                                  onClick={() => handleTargetChange(id, lvl as CapabilityLevel)}
                                >
                                  L{lvl}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn--subtle btn--sm"
                              onClick={() => handleToggleObjective(id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Top Priority Recommendations */}
            <div className="priority-recs-section">
              <h3>Rekomendasi Prioritas Tertinggi (Top 5 Normalisasi)</h3>
              <div className="priority-cards">
                {sortedByPriority.slice(0, 5).map((rec) => {
                  const isScoped = scopedObjectiveIds.includes(rec.objectiveId);
                  return (
                    <div key={rec.objectiveId} className="priority-card">
                      <div className="priority-card__top">
                        <span className="domain-chip">{rec.domain}</span>
                        <span className="priority-card__score text-pos">+{rec.normalizedScore}</span>
                      </div>
                      <h4>{rec.objectiveId} — {rec.name}</h4>
                      <p className="text-sm text-secondary">
                        Suggested Target: Level {rec.suggestedTargetLevel}
                      </p>
                      <button
                        type="button"
                        className={`btn btn--sm btn--block priority-card__btn ${isScoped ? 'btn--secondary' : 'btn--primary'}`}
                        onClick={() => handleToggleObjective(rec.objectiveId)}
                      >
                        {isScoped ? '✓ Sudah Terpilih' : '+ Tambah ke Ruang Lingkup'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div className="setup__footer">
          {step > 1 && (
            <button type="button" className="btn btn--subtle" onClick={back}>
              ← Kembali
            </button>
          )}
          <div className="setup__footer-nav">
            {step < 6 ? (
              <button type="button" className="btn btn--primary" onClick={next}>
                Lanjut ke Langkah {step + 1} →
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={startAssessment}
              >
                🚀 Kunci Ruang Lingkup & Mulai Asesmen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Confirmation Modal ---------------- */}
      {showConfirm && (
        <div className="confirm-backdrop" onClick={() => setShowConfirm(false)}>
          <div
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-modal__head">
              <div>
                <p className="confirm-modal__eyebrow">Ringkasan Sebelum Asesmen</p>
                <h3 id="confirm-title">Konfigurasi Ruang Lingkup Audit</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowConfirm(false)}
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="confirm-modal__meta">
              <div className="confirm-meta-item">
                <span className="confirm-meta-label">Organisasi</span>
                <strong>{state.organization || '—'}</strong>
              </div>
              <div className="confirm-meta-item">
                <span className="confirm-meta-label">Judul Audit</span>
                <strong>{state.title || '—'}</strong>
              </div>
              <div className="confirm-meta-item">
                <span className="confirm-meta-label">Assessor</span>
                <strong>{state.assessor || '—'}</strong>
              </div>
              <div className="confirm-meta-item">
                <span className="confirm-meta-label">Periode</span>
                <strong>{state.period || '—'}</strong>
              </div>
            </div>

            <div className="confirm-modal__list">
              <p className="confirm-modal__list-title">
                {scopedObjectiveIds.length} objektif dipilih untuk dinilai:
              </p>
              <div className="confirm-table-wrap">
                <table className="confirm-table">
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Nama Objektif</th>
                      <th className="confirm-table__num">Skor</th>
                      <th className="confirm-table__num">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scopedObjectiveIds.map((id) => {
                      const res = dfResults.find((r) => r.objectiveId === id);
                      const target = objectiveTargets[id] ?? res?.suggestedTargetLevel ?? 3;
                      return (
                        <tr key={id}>
                          <td><strong>{id}</strong></td>
                          <td>{res?.name}</td>
                          <td className={`confirm-table__num ${res && res.normalizedScore >= 0 ? 'text-pos' : 'text-neg'}`}>
                            {res ? (res.normalizedScore >= 0 ? `+${res.normalizedScore}` : res.normalizedScore) : '—'}
                          </td>
                          <td className="confirm-table__num">Level {target}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="confirm-modal__note">
              Di langkah berikutnya Anda akan menilai tiap aktivitas COBIT per level (Yes / Partially / No / N.A.),
              lalu sistem menghitung capability level dengan ambang batas &gt;85% dan aturan <strong>Stop Here</strong>.
            </div>

            <div className="confirm-modal__actions">
              <button type="button" className="btn btn--subtle" onClick={() => setShowConfirm(false)}>
                ← Kembali Edit
              </button>
              <button type="button" className="btn btn--primary" onClick={confirmStart}>
                Konfirmasi &amp; Mulai Asesmen →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
