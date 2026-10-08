import { useState } from 'react';
import { useAssessment } from '../context';
import type { EvidenceRecord } from '../types';

interface EvidenceModalProps {
  activityId: string;
  activityDescription: string;
  objectiveId: string;
  onClose: () => void;
}

export default function EvidenceModal({
  activityId,
  activityDescription,
  objectiveId,
  onClose,
}: EvidenceModalProps) {
  const { state, addEvidence, linkEvidenceToActivity, unlinkEvidenceFromActivity } = useAssessment();
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing');
  const [search, setSearch] = useState('');

  // New evidence form
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EvidenceRecord['type']>('documentation');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [assessor, setAssessor] = useState(state.assessor || 'Auditor Tim');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const currentObj = state.assessments[objectiveId];
  const currentAct = currentObj?.activities.find((a) => a.id === activityId);
  const attachedEvidenceIds = currentAct?.evidenceIds || [];

  const filteredEvidence = state.evidenceList.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.referenceNumber && e.referenceNumber.toLowerCase().includes(search.toLowerCase())) ||
    e.notes.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul bukti wajib diisi.');
      return;
    }

    const newId = addEvidence({
      title,
      type,
      referenceNumber: referenceNumber.trim() || undefined,
      assessor,
      date,
      notes,
      linkedActivityIds: [activityId],
    });

    linkEvidenceToActivity(newId, activityId, objectiveId);
    onClose();
  };

  const handleToggleLink = (evId: string) => {
    if (attachedEvidenceIds.includes(evId)) {
      unlinkEvidenceFromActivity(evId, activityId, objectiveId);
    } else {
      linkEvidenceToActivity(evId, activityId, objectiveId);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>Tautkan Evidensi Audit</h3>
            <p className="modal-subtitle">
              Butir Aktivitas: <strong>{activityId}</strong> — {activityDescription.slice(0, 80)}...
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab ${activeTab === 'existing' ? 'modal-tab--active' : ''}`}
            onClick={() => setActiveTab('existing')}
          >
            Pilih dari Register Bukti ({state.evidenceList.length})
          </button>
          <button
            type="button"
            className={`modal-tab ${activeTab === 'new' ? 'modal-tab--active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            + Buat Bukti Baru
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'existing' ? (
            <div className="existing-evidence-section">
              <input
                type="text"
                className="input-text modal-search"
                placeholder="Cari judul, nomor referensi, atau petikan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="evidence-picker-list">
                {filteredEvidence.length === 0 ? (
                  <p className="empty-picker-msg">Tidak ada bukti yang cocok dengan pencarian.</p>
                ) : (
                  filteredEvidence.map((ev) => {
                    const isAttached = attachedEvidenceIds.includes(ev.id);
                    return (
                      <div
                        key={ev.id}
                        className={`evidence-picker-item ${isAttached ? 'evidence-picker-item--attached' : ''}`}
                        onClick={() => handleToggleLink(ev.id)}
                      >
                        <div className="evidence-picker-item__info">
                          <div className="evidence-picker-item__top">
                            <span className="domain-chip">{ev.type}</span>
                            <strong>{ev.id}</strong>
                            {ev.referenceNumber && (
                              <span className="mono-ref">{ev.referenceNumber}</span>
                            )}
                          </div>
                          <h4>{ev.title}</h4>
                          <p className="evidence-snippet">{ev.notes}</p>
                        </div>
                        <button
                          type="button"
                          className={`btn btn--sm ${isAttached ? 'btn--secondary' : 'btn--primary'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleLink(ev.id);
                          }}
                        >
                          {isAttached ? '✓ Terhubung' : '+ Hubungkan'}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateNew} className="new-evidence-form">
              <div className="form-group">
                <label className="field-label">Judul Dokumen / Nama Bukti *</label>
                <input
                  type="text"
                  className="input-text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SOP Penanganan Insiden Keamanan TI"
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="field-label">Tipe Dokumen</label>
                  <select
                    className="select-input"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                  >
                    <option value="policy">Policy (Kebijakan Formal)</option>
                    <option value="procedure">Procedure (SOP / Prosedur)</option>
                    <option value="record">Record (Notulensi / Log Sistem)</option>
                    <option value="documentation">Documentation (Manual / Panduan)</option>
                    <option value="interview">Interview (Rekaman Wawancara)</option>
                    <option value="log">Audit Log</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="field-label">Nomor Referensi / Lokasi</label>
                  <input
                    type="text"
                    className="input-text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="e.g. SOP-TI-04 / Record 01 (14:36)"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="field-label">Assessor</label>
                  <input
                    type="text"
                    className="input-text"
                    value={assessor}
                    onChange={(e) => setAssessor(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="field-label">Tanggal Temuan</label>
                  <input
                    type="date"
                    className="input-text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Catatan / Kutipan Evidensi</label>
                <textarea
                  className="input-text"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Petikan wawancara atau fakta observasi dokumen pendukung..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn--subtle" onClick={onClose}>
                  Batal
                </button>
                <button type="submit" className="btn btn--primary">
                  Simpan & Tautkan Bukti
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
