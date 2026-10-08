import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context';
import './AssessmentHistory.css';

export default function AssessmentHistory() {
  const navigate = useNavigate();
  const {
    assessmentsList,
    activeAssessmentId,
    switchAssessment,
    createNewAssessment,
    duplicateAssessment,
    deleteAssessment,
    loadBenchmarkData,
    importStateJSON,
  } = useAssessment();

  const [search, setSearch] = useState('');

  const filteredList = useMemo(() => {
    return assessmentsList.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.organization.toLowerCase().includes(search.toLowerCase()) ||
        a.assessor.toLowerCase().includes(search.toLowerCase()) ||
        a.period.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [assessmentsList, search]);

  const handleCreateNew = () => {
    createNewAssessment();
    navigate('/assessments/setup');
  };

  const handleOpen = (id: string) => {
    switchAssessment(id);
    navigate('/dashboard');
  };

  const handleDuplicate = (id: string) => {
    duplicateAssessment(id);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus asesmen "${title}"?`)) {
      deleteAssessment(id);
    }
  };

  const handleExportSingle = (item: typeof assessmentsList[0]) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cobit-assessment-${item.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
          alert('Asesmen berhasil diimpor ke riwayat!');
        } else {
          alert('Format file JSON tidak valid.');
        }
      }
    };
    reader.readAsText(file);
  };

  // Stats
  const totalAssessments = assessmentsList.length;
  const totalEvidenceAll = assessmentsList.reduce((sum, a) => sum + a.evidenceList.length, 0);
  const totalRecsAll = assessmentsList.reduce((sum, a) => sum + a.recommendations.length, 0);

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Multi-Assessment Registry
          </p>
          <h1 className="page-title">Riwayat &amp; Daftar Asesmen</h1>
          <p className="page-lead">
            Kelola seluruh rekam jejak evaluasi tata kelola TI berbasis COBIT 2019. Buka asesmen aktif, duplikat untuk periode baru, atau impor data cadangan institusi.
          </p>
        </div>
        <div className="page-head__actions">
          <button type="button" className="btn btn--secondary" onClick={() => {
            loadBenchmarkData();
            alert('Benchmark dataset PANRB ditambahkan ke riwayat!');
          }}>
            ⚡ Muat Benchmark PANRB
          </button>
          <label className="btn btn--subtle file-upload-btn">
            📥 Impor JSON
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
          </label>
          <button type="button" className="btn btn--primary" onClick={handleCreateNew}>
            + Buat Asesmen Baru
          </button>
        </div>
      </header>

      {/* ---------------- KPI Overview Strip ---------------- */}
      <section className="facts" aria-label="History overview">
        <div className="card facts__card">
          <span className="eyebrow">Total Asesmen Tersimpan</span>
          <p className="facts__value num">{totalAssessments}</p>
          <p className="facts__meta">Tersimpan dalam memori lokal browser</p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Asesmen Aktif Saat Ini</span>
          <p className="facts__value facts__value--sm" style={{ fontWeight: 600 }}>
            {assessmentsList.find((a) => a.id === activeAssessmentId)?.title || 'Tidak ada'}
          </p>
          <p className="facts__meta">
            {assessmentsList.find((a) => a.id === activeAssessmentId)?.organization}
          </p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Akumulasi Dokumen Bukti</span>
          <p className="facts__value num">{totalEvidenceAll}</p>
          <p className="facts__meta">Tersebar di seluruh riwayat asesmen</p>
        </div>

        <div className="card facts__card">
          <span className="eyebrow">Total Butir Rekomendasi</span>
          <p className="facts__value num">{totalRecsAll}</p>
          <p className="facts__meta">Rencana perbaikan 3 dimensi tersimpan</p>
        </div>
      </section>

      {/* ---------------- Filter & Search Bar ---------------- */}
      <div className="history-search-bar">
        <input
          type="text"
          className="input-text history-search-input"
          placeholder="Cari berdasarkan judul asesmen, organisasi, assessor, atau periode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="history-count-badge">
          Menampilkan <strong>{filteredList.length}</strong> dari {totalAssessments} asesmen
        </div>
      </div>

      {/* ---------------- Assessments Cards / Table ---------------- */}
      <div className="history-grid">
        {filteredList.map((item) => {
          const isActive = item.id === activeAssessmentId;
          const scopedCount = item.scopedObjectiveIds.length;

          // Calculate average current level
          let avgLevel = '1.0';
          if (scopedCount > 0) {
            let sumLvl = 0;
            for (const id of item.scopedObjectiveIds) {
              sumLvl += item.assessments[id]?.currentLevel ?? 1;
            }
            avgLevel = (sumLvl / scopedCount).toFixed(1);
          }

          const updatedDate = new Date(item.updatedAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={item.id}
              className={`history-card ${isActive ? 'history-card--active' : ''}`}
            >
              <div className="history-card__top">
                <div className="history-card__tags">
                  {isActive && <span className="status-badge status-badge--active">Aktif Sedang Dibuka</span>}
                  <span className="domain-chip">{item.period}</span>
                </div>
                <span className="history-card__date">{updatedDate}</span>
              </div>

              <h3 className="history-card__title">{item.title}</h3>
              <p className="history-card__org">
                🏛️ <strong>{item.organization}</strong>
              </p>
              <p className="history-card__assessor">
                👤 Assessor: {item.assessor}
              </p>

              {/* Scoped Objectives Preview */}
              <div className="history-card__scoped">
                <span className="history-card__scoped-label">
                  Ruang Lingkup ({scopedCount} Objektif):
                </span>
                <div className="history-scoped-chips">
                  {item.scopedObjectiveIds.length === 0 ? (
                    <span className="text-muted" style={{ fontSize: '11px' }}>Belum dikonfigurasi</span>
                  ) : (
                    item.scopedObjectiveIds.map((objId) => (
                      <span key={objId} className="scoped-mini-chip">
                        {objId}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="history-card__metrics">
                <div className="metric-box">
                  <span className="metric-label">Avg Level</span>
                  <strong className="metric-val">L{avgLevel}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Evidensi</span>
                  <strong className="metric-val">{item.evidenceList.length}</strong>
                </div>
                <div className="metric-box">
                  <span className="metric-label">Rekomendasi</span>
                  <strong className="metric-val">{item.recommendations.length}</strong>
                </div>
              </div>

              <div className="history-card__actions">
                <button
                  type="button"
                  className={`btn btn--sm ${isActive ? 'btn--secondary' : 'btn--primary'}`}
                  onClick={() => handleOpen(item.id)}
                >
                  {isActive ? 'Buka Dashboard' : 'Pilih & Buka'}
                </button>
                <button
                  type="button"
                  className="btn btn--subtle btn--sm"
                  title="Duplikat asesmen ini"
                  onClick={() => handleDuplicate(item.id)}
                >
                  📋 Salin
                </button>
                <button
                  type="button"
                  className="btn btn--subtle btn--sm"
                  title="Ekspor ke file JSON"
                  onClick={() => handleExportSingle(item)}
                >
                  📤 Ekspor
                </button>
                <button
                  type="button"
                  className="btn btn--subtle btn--sm text-neg"
                  title="Hapus asesmen"
                  onClick={() => handleDelete(item.id, item.title)}
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
