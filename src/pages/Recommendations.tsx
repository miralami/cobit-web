import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import type { RecommendationItem } from '../types';
import cobitFactors from '../data/cobitDesignFactors.json';
import './Recommendations.css';

export default function Recommendations() {
  const { state, addRecommendation, updateRecommendation, deleteRecommendation } = useAssessment();
  const { recommendations, scopedObjectiveIds } = state;

  const [objFilter, setObjFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [editingRec, setEditingRec] = useState<RecommendationItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Omit<RecommendationItem, 'id'>>({
    objectiveId: scopedObjectiveIds[0] || 'DSS05',
    practiceCode: 'DSS05.01',
    gapDescription: '',
    peopleAspect: { type: 'Responsibility', action: '' },
    processAspect: { type: 'Policy', action: '' },
    technologyAspect: { type: 'Features', action: '' },
  });

  const filteredRecs = useMemo(() => {
    return recommendations.filter((r) => {
      const matchObj = objFilter === 'All' || r.objectiveId === objFilter;
      const matchSearch =
        r.practiceCode.toLowerCase().includes(search.toLowerCase()) ||
        r.gapDescription.toLowerCase().includes(search.toLowerCase()) ||
        r.peopleAspect.action.toLowerCase().includes(search.toLowerCase()) ||
        r.processAspect.action.toLowerCase().includes(search.toLowerCase()) ||
        r.technologyAspect.action.toLowerCase().includes(search.toLowerCase());
      return matchObj && matchSearch;
    });
  }, [recommendations, objFilter, search]);

  const handleOpenCreate = () => {
    setFormData({
      objectiveId: scopedObjectiveIds[0] || 'DSS05',
      practiceCode: `${scopedObjectiveIds[0] || 'DSS05'}.01`,
      gapDescription: '',
      peopleAspect: { type: 'Responsibility', action: '' },
      processAspect: { type: 'Policy', action: '' },
      technologyAspect: { type: 'Features', action: '' },
    });
    setIsCreating(true);
  };

  const handleOpenEdit = (rec: RecommendationItem) => {
    setEditingRec(rec);
    setFormData({
      objectiveId: rec.objectiveId,
      practiceCode: rec.practiceCode,
      gapDescription: rec.gapDescription,
      peopleAspect: { ...rec.peopleAspect },
      processAspect: { ...rec.processAspect },
      technologyAspect: { ...rec.technologyAspect },
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gapDescription.trim()) {
      alert('Deskripsi gap wajib diisi.');
      return;
    }

    if (editingRec) {
      updateRecommendation({
        ...editingRec,
        ...formData,
      });
      setEditingRec(null);
    } else {
      addRecommendation(formData);
      setIsCreating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page recommendations-page">
      <header className="page-head no-print">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Rencana Perbaikan Berkelanjutan
          </p>
          <h1 className="page-title">Matriks Rekomendasi Perbaikan (3 Aspek)</h1>
          <p className="page-lead">
            Rekomendasi tindakan peningkatan kapabilitas diklasifikasikan ke dalam 3 dimensi holistik COBIT 2019: <strong>People</strong> (SDM &amp; Budaya), <strong>Process</strong> (Tata Kelola &amp; SOP), dan <strong>Technology</strong> (Otomasi &amp; Infrastruktur).
          </p>
        </div>
        <div className="page-head__actions">
          <button type="button" className="btn btn--secondary" onClick={handlePrint}>
            🖨️ Cetak / Ekspor Laporan
          </button>
          <button type="button" className="btn btn--primary" onClick={handleOpenCreate}>
            + Tambah Rekomendasi
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="rec-filter-bar no-print">
        <input
          type="text"
          className="input-text rec-search"
          placeholder="Cari kode praktik, deskripsi gap, atau tindakan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select-input"
          value={objFilter}
          onChange={(e) => setObjFilter(e.target.value)}
        >
          <option value="All">Semua Objektif ({recommendations.length})</option>
          {scopedObjectiveIds.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      {/* Print Document Header */}
      <div className="print-only print-doc-header">
        <h2>LAPORAN REKOMENDASI PENINGKATAN KAPABILITAS TATA KELOLA TI (COBIT 2019)</h2>
        <p><strong>Organisasi:</strong> {state.organization} | <strong>Periode:</strong> {state.period} | <strong>Assessor:</strong> {state.assessor}</p>
        <hr />
      </div>

      {/* 3-Aspect Matrix Table */}
      <div className="rec-table-card">
        {filteredRecs.length === 0 ? (
          <div className="empty-box">
            Belum ada rekomendasi perbaikan untuk kriteria yang dipilih.
          </div>
        ) : (
          <table className="rec-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Objektif &amp; Praktik</th>
                <th style={{ width: '240px' }}>Deskripsi Kesenjangan (Gap)</th>
                <th style={{ width: '260px' }}>Aspek People (SDM &amp; Struktur)</th>
                <th style={{ width: '260px' }}>Aspek Process (Kebijakan &amp; Prosedur)</th>
                <th style={{ width: '260px' }}>Aspek Technology (Alat &amp; Otomasi)</th>
                <th style={{ width: '80px' }} className="no-print">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecs.map((rec) => {
                const meta = cobitFactors.objectives.find((o) => o.id === rec.objectiveId);
                return (
                  <tr key={rec.id}>
                    <td className="rec-code-cell">
                      <strong>{rec.practiceCode}</strong>
                      <span className="rec-obj-title">{meta?.name || rec.objectiveId}</span>
                      <Link
                        to={`/assessments/workspace/${rec.objectiveId}`}
                        className="rec-link-workspace no-print"
                      >
                        Lihat Asesmen →
                      </Link>
                    </td>

                    <td className="rec-gap-cell">
                      <p className="rec-gap-text">{rec.gapDescription}</p>
                    </td>

                    <td className="rec-aspect-cell rec-aspect-cell--people">
                      <div className="aspect-badge-tag">
                        👤 {rec.peopleAspect.type}
                      </div>
                      <p className="aspect-action-text">{rec.peopleAspect.action}</p>
                    </td>

                    <td className="rec-aspect-cell rec-aspect-cell--process">
                      <div className="aspect-badge-tag">
                        📋 {rec.processAspect.type}
                      </div>
                      <p className="aspect-action-text">{rec.processAspect.action}</p>
                    </td>

                    <td className="rec-aspect-cell rec-aspect-cell--tech">
                      <div className="aspect-badge-tag">
                        💻 {rec.technologyAspect.type}
                      </div>
                      <p className="aspect-action-text">{rec.technologyAspect.action}</p>
                    </td>

                    <td className="no-print">
                      <div className="rec-row-actions">
                        <button
                          type="button"
                          className="btn-icon"
                          title="Edit"
                          onClick={() => handleOpenEdit(rec)}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="btn-icon text-neg"
                          title="Hapus"
                          onClick={() => {
                            if (confirm('Hapus rekomendasi ini?')) deleteRecommendation(rec.id);
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Dialog */}
      {(isCreating || editingRec) && (
        <div className="modal-backdrop" onClick={() => { setIsCreating(false); setEditingRec(null); }}>
          <div className="modal-content modal-content--wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{editingRec ? 'Edit Rekomendasi Perbaikan' : 'Tambah Rekomendasi Perbaikan'}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => { setIsCreating(false); setEditingRec(null); }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="modal-body new-evidence-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="field-label">Objektif Terkait</label>
                  <select
                    className="select-input"
                    value={formData.objectiveId}
                    onChange={(e) => {
                      const obj = e.target.value;
                      setFormData({
                        ...formData,
                        objectiveId: obj,
                        practiceCode: `${obj}.01`,
                      });
                    }}
                  >
                    {scopedObjectiveIds.map((id) => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="field-label">Kode Praktik / Butir</label>
                  <input
                    type="text"
                    className="input-text"
                    value={formData.practiceCode}
                    onChange={(e) => setFormData({ ...formData, practiceCode: e.target.value })}
                    placeholder="e.g. DSS05.01"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Deskripsi Kesenjangan (Gap) *</label>
                <textarea
                  className="input-text"
                  rows={2}
                  value={formData.gapDescription}
                  onChange={(e) => setFormData({ ...formData, gapDescription: e.target.value })}
                  placeholder="Deskripsi temuan kesenjangan hasil audit..."
                  required
                />
              </div>

              <div className="aspect-form-box aspect-form-box--people">
                <h4>Aspek People (SDM &amp; Budaya Organisasi)</h4>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="field-label">Kategori</label>
                    <select
                      className="select-input"
                      value={formData.peopleAspect.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          peopleAspect: { ...formData.peopleAspect, type: e.target.value },
                        })
                      }
                    >
                      <option value="Responsibility">Responsibility (Tanggung Jawab Formal)</option>
                      <option value="Skill & awareness">Skill &amp; Awareness (Pelatihan &amp; Kompetensi)</option>
                      <option value="Communication">Communication (Sosialisasi Kebijakan)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="field-label">Tindakan Rekomendasi</label>
                    <textarea
                      className="input-text"
                      rows={2}
                      value={formData.peopleAspect.action}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          peopleAspect: { ...formData.peopleAspect, action: e.target.value },
                        })
                      }
                      placeholder="e.g. Penetapan tanggung jawab formal Biro Datin dalam monitoring..."
                    />
                  </div>
                </div>
              </div>

              <div className="aspect-form-box aspect-form-box--process">
                <h4>Aspek Process (Tata Kelola, SOP, Dokumen)</h4>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="field-label">Kategori</label>
                    <select
                      className="select-input"
                      value={formData.processAspect.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          processAspect: { ...formData.processAspect, type: e.target.value },
                        })
                      }
                    >
                      <option value="Policy">Policy (Kebijakan Formal)</option>
                      <option value="Procedure">Procedure (SOP / Prosedur)</option>
                      <option value="Record">Record (Pencatatan &amp; Register)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="field-label">Tindakan Rekomendasi</label>
                    <textarea
                      className="input-text"
                      rows={2}
                      value={formData.processAspect.action}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          processAspect: { ...formData.processAspect, action: e.target.value },
                        })
                      }
                      placeholder="e.g. Penyusunan SOP penanganan insiden malware..."
                    />
                  </div>
                </div>
              </div>

              <div className="aspect-form-box aspect-form-box--tech">
                <h4>Aspek Technology (Alat, Enkripsi, Otomasi)</h4>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="field-label">Kategori</label>
                    <select
                      className="select-input"
                      value={formData.technologyAspect.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          technologyAspect: { ...formData.technologyAspect, type: e.target.value },
                        })
                      }
                    >
                      <option value="Features">Features (Konfigurasi Fitur Keamanan)</option>
                      <option value="Infrastructure">Infrastructure (Infrastruktur Server/Jaringan)</option>
                      <option value="Automation">Automation (Otomasi Log &amp; Monitoring)</option>
                      <option value="Tools">Tools (Peralatan &amp; Software)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="field-label">Tindakan Rekomendasi</label>
                    <textarea
                      className="input-text"
                      rows={2}
                      value={formData.technologyAspect.action}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          technologyAspect: { ...formData.technologyAspect, action: e.target.value },
                        })
                      }
                      placeholder="e.g. Pemasangan EDR terpusat pada seluruh endpoint..."
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn--subtle"
                  onClick={() => { setIsCreating(false); setEditingRec(null); }}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn--primary">
                  Simpan Rekomendasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
