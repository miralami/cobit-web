import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssessment } from '../context';
import type { EvidenceRecord } from '../types';
import './EvidenceFindings.css';

const typeLabel: Record<EvidenceRecord['type'], string> = {
  policy: 'Policy',
  procedure: 'Procedure',
  record: 'Record',
  documentation: 'Documentation',
  log: 'Log',
  interview: 'Interview',
  other: 'Other',
};

export default function EvidenceFindings() {
  const { state, addEvidence, updateEvidence, deleteEvidence } = useAssessment();
  const { evidenceList, assessments, scopedObjectiveIds } = state;

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [objectiveFilter, setObjectiveFilter] = useState<string>('All');
  const [editingEvidence, setEditingEvidence] = useState<EvidenceRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state for add/edit modal
  const [formData, setFormData] = useState<Omit<EvidenceRecord, 'id'>>(() => ({
    title: '',
    type: 'documentation',
    referenceNumber: '',
    assessor: state.assessor || 'Auditor Tim',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    linkedActivityIds: [],
  }));

  // Calculate stats
  const totalEvidence = evidenceList.length;
  const attachedCount = evidenceList.filter((e) => e.linkedActivityIds.length > 0).length;

  // Count unevidenced activities
  const unevidencedCount = useMemo(() => {
    let count = 0;
    for (const objData of Object.values(assessments)) {
      for (const act of objData.activities) {
        if (act.response && act.response !== 'N.A.' && act.evidenceIds.length === 0) {
          count++;
        }
      }
    }
    return count;
  }, [assessments]);

  // All available activities across scoped objectives
  const allActivities = useMemo(() => {
    const list: { id: string; label: string; objId: string }[] = [];
    for (const [objId, objData] of Object.entries(assessments)) {
      for (const act of objData.activities) {
        list.push({
          id: act.id,
          label: `${act.id} (L${act.level}) — ${act.description.slice(0, 50)}...`,
          objId,
        });
      }
    }
    return list;
  }, [assessments]);

  const filteredEvidence = useMemo(() => {
    return evidenceList.filter((e) => {
      const matchSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        (e.referenceNumber && e.referenceNumber.toLowerCase().includes(search.toLowerCase())) ||
        e.notes.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || e.type === typeFilter;
      const matchObj =
        objectiveFilter === 'All' ||
        e.linkedActivityIds.some((actId) => actId.startsWith(objectiveFilter));
      return matchSearch && matchType && matchObj;
    });
  }, [evidenceList, search, typeFilter, objectiveFilter]);

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      type: 'documentation',
      referenceNumber: '',
      assessor: state.assessor || 'Auditor Tim',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      linkedActivityIds: [],
    });
    setIsCreating(true);
  };

  const handleOpenEdit = (ev: EvidenceRecord) => {
    setEditingEvidence(ev);
    setFormData({
      title: ev.title,
      type: ev.type,
      referenceNumber: ev.referenceNumber || '',
      assessor: ev.assessor,
      date: ev.date,
      notes: ev.notes,
      linkedActivityIds: [...ev.linkedActivityIds],
    });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Judul bukti wajib diisi.');
      return;
    }

    if (editingEvidence) {
      updateEvidence({
        ...editingEvidence,
        ...formData,
      });
      setEditingEvidence(null);
    } else {
      addEvidence(formData);
      setIsCreating(false);
    }
  };

  const toggleActivityLink = (actId: string) => {
    setFormData((prev) => {
      const exists = prev.linkedActivityIds.includes(actId);
      return {
        ...prev,
        linkedActivityIds: exists
          ? prev.linkedActivityIds.filter((id) => id !== actId)
          : [...prev.linkedActivityIds, actId],
      };
    });
  };

  const firstScopedId = scopedObjectiveIds[0] || 'EDM03';

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Traceability Evidensi Audit
          </p>
          <h1 className="page-title">Register &amp; Pelacakan Bukti Audit</h1>
          <p className="page-lead">
            Daftar artefak, rekaman wawancara, dan dokumen kebijakan yang mendasari penilaian pemenuhan aktivitas COBIT 2019. Hubungan dua arah (forward &amp; backward traceability) menjamin akuntabilitas hasil audit.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to={`/assessments/workspace/${firstScopedId}`} className="btn btn--secondary">
            Ke Workspace Asesmen
          </Link>
          <button type="button" className="btn btn--primary" onClick={handleOpenCreate}>
            + Tambah Dokumen Bukti
          </button>
        </div>
      </header>

      {/* ---------------- Stat Cards ---------------- */}
      <section className="evsum" aria-label="Evidence summary">
        <div className="card evsum__card">
          <span className="eyebrow">Total Dokumen Bukti</span>
          <p className="evsum__value num">{totalEvidence}</p>
          <p className="evsum__meta">Tersimpan dalam register audit</p>
        </div>

        <div className="card evsum__card">
          <span className="eyebrow">Bukti Terlampir</span>
          <p className="evsum__value num">{attachedCount} <span className="evsum__of">/ {totalEvidence}</span></p>
          <p className="evsum__meta">Terhubung ke butir aktivitas COBIT</p>
        </div>

        <div className="card evsum__card">
          <span className="eyebrow">Butir Belum Ada Bukti</span>
          <p className="evsum__value num" style={{ color: unevidencedCount > 0 ? '#c5221f' : 'inherit' }}>
            {unevidencedCount}
          </p>
          <p className="evsum__meta">Aktivitas dinilai (Yes/Partially) tanpa bukti</p>
        </div>

        <div className="card evsum__card">
          <span className="eyebrow">Assessor Audit</span>
          <p className="evsum__value evsum__value--sm">{state.assessor}</p>
          <p className="evsum__meta">{state.organization} · {state.period}</p>
        </div>
      </section>

      {/* ---------------- Filter Bar ---------------- */}
      <div className="ev-filter-bar">
        <input
          type="text"
          className="input-text ev-search"
          placeholder="Cari judul, nomor referensi, catatan bukti..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="ev-filters-group">
          <select
            className="select-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">Semua Tipe Dokumen</option>
            {Object.entries(typeLabel).map(([val, lbl]) => (
              <option key={val} value={val}>{lbl}</option>
            ))}
          </select>

          <select
            className="select-input"
            value={objectiveFilter}
            onChange={(e) => setObjectiveFilter(e.target.value)}
          >
            <option value="All">Semua Objektif Terkait</option>
            {scopedObjectiveIds.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ---------------- Evidence Table ---------------- */}
      <div className="ev-table-card">
        {filteredEvidence.length === 0 ? (
          <div className="empty-box">
            Tidak ada bukti audit yang sesuai dengan filter atau kata kunci.
          </div>
        ) : (
          <table className="ev-table">
            <thead>
              <tr>
                <th style={{ width: '90px' }}>ID</th>
                <th>Judul Bukti &amp; Catatan / Kutipan</th>
                <th style={{ width: '120px' }}>Tipe</th>
                <th style={{ width: '160px' }}>Nomor Referensi</th>
                <th style={{ width: '130px' }}>Tanggal</th>
                <th style={{ width: '220px' }}>Backward Traceability (Linked Activities)</th>
                <th style={{ width: '110px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvidence.map((ev) => (
                <tr key={ev.id}>
                  <td><strong>{ev.id}</strong></td>
                  <td>
                    <h4 style={{ margin: '0 0 4px', fontSize: '14px' }}>{ev.title}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                      {ev.notes}
                    </p>
                  </td>
                  <td>
                    <span className="domain-chip">{typeLabel[ev.type] || ev.type}</span>
                  </td>
                  <td>
                    <span className="mono-ref">{ev.referenceNumber || '-'}</span>
                  </td>
                  <td>{ev.date}</td>
                  <td>
                    <div className="trace-chips">
                      {ev.linkedActivityIds.length === 0 ? (
                        <span className="text-muted" style={{ fontSize: '11px' }}>Belum terhubung</span>
                      ) : (
                        ev.linkedActivityIds.map((actId) => {
                          const objId = actId.split('.')[0];
                          return (
                            <Link
                              key={actId}
                              to={`/assessments/workspace/${objId}`}
                              className="trace-chip"
                              title={`Buka asesmen aktivitas ${actId}`}
                            >
                              🔗 {actId}
                            </Link>
                          );
                        })
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="ev-row-actions">
                      <button
                        type="button"
                        className="btn-icon"
                        title="Edit Dokumen"
                        onClick={() => handleOpenEdit(ev)}
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="btn-icon text-neg"
                        title="Hapus Bukti"
                        onClick={() => {
                          if (confirm(`Hapus bukti ${ev.id}?`)) deleteEvidence(ev.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ---------------- Add / Edit Modal ---------------- */}
      {(isCreating || editingEvidence) && (
        <div className="modal-backdrop" onClick={() => { setIsCreating(false); setEditingEvidence(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{editingEvidence ? `Edit Bukti: ${editingEvidence.id}` : 'Tambah Dokumen Bukti Baru'}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => { setIsCreating(false); setEditingEvidence(null); }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveModal} className="modal-body new-evidence-form">
              <div className="form-group">
                <label className="field-label">Judul Bukti / Dokumen *</label>
                <input
                  type="text"
                  className="input-text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. SOP Penanganan Insiden Keamanan Informasi"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="field-label">Tipe Dokumen</label>
                  <select
                    className="select-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    {Object.entries(typeLabel).map(([val, lbl]) => (
                      <option key={val} value={val}>{lbl}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="field-label">Nomor Referensi / Lokasi File</label>
                  <input
                    type="text"
                    className="input-text"
                    value={formData.referenceNumber}
                    onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                    placeholder="e.g. Ref-DSS05-L2-1 / SOP-TI-04"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="field-label">Assessor</label>
                  <input
                    type="text"
                    className="input-text"
                    value={formData.assessor}
                    onChange={(e) => setFormData({ ...formData, assessor: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="field-label">Tanggal Temuan</label>
                  <input
                    type="date"
                    className="input-text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Catatan / Kutipan Observasi Evidensi</label>
                <textarea
                  className="input-text"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Catatan wawancara atau fakta observasi dokumen..."
                />
              </div>

              {/* Multi-select checklist for linked activities */}
              <div className="form-group">
                <label className="field-label">
                  Tautkan ke Butir Aktivitas Asesmen ({formData.linkedActivityIds.length} dipilih)
                </label>
                <div className="modal-act-checklist">
                  {allActivities.map((act) => {
                    const isChecked = formData.linkedActivityIds.includes(act.id);
                    return (
                      <label key={act.id} className="act-check-item">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleActivityLink(act.id)}
                        />
                        <span>{act.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn--subtle"
                  onClick={() => { setIsCreating(false); setEditingEvidence(null); }}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn--primary">
                  Simpan Bukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
