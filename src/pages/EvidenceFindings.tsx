import { Link } from 'react-router-dom';
import { assessmentItems, currentAssessment, evidenceRecords } from '../data/mockData';
import type { Evidence } from '../types';
import './EvidenceFindings.css';

const statusTone = (status: Evidence['status']) =>
  status === 'reviewed' ? 'success' : status === 'attached' ? 'info' : 'warning';

const typeLabel: Record<Evidence['type'], string> = {
  policy: 'Policy',
  record: 'Record',
  documentation: 'Documentation',
  log: 'Log',
  interview: 'Interview',
  other: 'Other',
};

export default function EvidenceFindings() {
  const counts = evidenceRecords.reduce(
    (acc, e) => ({ ...acc, [e.status]: (acc[e.status] ?? 0) + 1 }),
    {} as Record<string, number>,
  );

  const unevidenced = assessmentItems.filter(
    (item) => item.evidenceIds.length === 0 && item.response !== null,
  );

  // The header link has no per-record context, so point it at the objective the register is
  // actually built on: the first evidence record that resolves to an assessment item.
  const workspaceObjectiveId =
    evidenceRecords
      .map((e) => assessmentItems.find((i) => i.id === e.linkedItemId)?.objectiveId)
      .find((id) => id !== undefined) ?? assessmentItems[0].objectiveId;

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Evidence &amp; findings
          </p>
          <h1 className="page-title">Evidence register</h1>
          <p className="page-lead">
            Source records collected against rated assessment items. Each entry is linked to the
            item it substantiates, so a reviewer can trace any rating back to the artefact that
            supports it.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to={`/assessments/workspace/${workspaceObjectiveId}`} className="btn btn--secondary">
            Back to workspace
          </Link>
          <button type="button" className="btn btn--primary" disabled title="Not implemented in this prototype">
            Add evidence
          </button>
        </div>
      </header>

      {/* ---------------- Register summary ---------------- */}
      <section className="evsum" aria-label="Evidence summary">
        {(['attached', 'pending', 'reviewed'] as const).map((status, i) => (
          <div key={status} className={`card evsum__card reveal reveal-${i + 1}`}>
            <span className="eyebrow">{status}</span>
            <p className="evsum__value num">
              {counts[status] ?? 0}
              <span className="evsum__of">/ {evidenceRecords.length}</span>
            </p>
            <p className="evsum__meta">
              {status === 'attached' && 'Linked to an item, not yet verified'}
              {status === 'pending' && 'Submitted, awaiting assessor review'}
              {status === 'reviewed' && 'Verified against the source system'}
            </p>
          </div>
        ))}

        <div className="card evsum__card reveal reveal-4">
          <span className="eyebrow">Assessor of record</span>
          <p className="evsum__value evsum__value--sm">{currentAssessment.assessor}</p>
          <p className="evsum__meta">
            {currentAssessment.organization} · {currentAssessment.period}
          </p>
        </div>
      </section>

      {/* ---------------- Register ---------------- */}
      <section className="card reveal reveal-5" aria-labelledby="register-heading">
        <div className="card__head">
          <h2 id="register-heading" className="card__title">
            Evidence records
          </h2>
          <span className="tag">{evidenceRecords.length} records</span>
        </div>

        <div className="table-wrap">
          <table className="table">
            <caption className="visually-hidden">
              Evidence records linked to assessment items in the {currentAssessment.title}.
            </caption>
            <thead>
              <tr>
                <th scope="col">Assessment item</th>
                <th scope="col">Evidence</th>
                <th scope="col">Status</th>
                <th scope="col">Type</th>
                <th scope="col">Notes</th>
                <th scope="col">Assessor</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {evidenceRecords.map((evidence) => {
                const item = assessmentItems.find((i) => i.id === evidence.linkedItemId);
                return (
                  <tr key={evidence.id} className={`evrow evrow--${evidence.status}`}>
                    <th scope="row" className="evrow__item">
                      {item ? (
                        <>
                          <span className="mono evrow__item-id">{item.id}</span>
                          <span className="evrow__item-statement">{item.statement}</span>
                          <Link
                            to={`/assessments/workspace/${item.objectiveId}`}
                            className="evrow__link"
                          >
                            <span className="evrow__connector" aria-hidden="true" />
                            Open in workspace
                          </Link>
                        </>
                      ) : (
                        <span className="muted">Unlinked</span>
                      )}
                    </th>
                    <td>
                      <span className="table__primary evrow__name">{evidence.name}</span>
                      <span className="mono evrow__id">{evidence.id}</span>
                    </td>
                    <td>
                      <span className={`badge badge--${statusTone(evidence.status)}`}>
                        {evidence.status}
                      </span>
                    </td>
                    <td>
                      <span className={`evtype evtype--${evidence.type}`}>
                        {typeLabel[evidence.type]}
                      </span>
                    </td>
                    <td className="evrow__notes">{evidence.notes}</td>
                    <td>{evidence.assessor}</td>
                    <td className="table__num">{evidence.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card__foot">
          <p className="xs muted">
            <span className="mono">Note</span> — register content is sample data for prototype
            demonstration. Document upload, version control, and reviewer sign-off are out of scope.
          </p>
        </div>
      </section>

      {/* ---------------- Coverage ---------------- */}
      {unevidenced.length > 0 && (
        <section className="card reveal" aria-labelledby="coverage-heading">
          <div className="card__head">
            <h2 id="coverage-heading" className="card__title">
              Evidence coverage
            </h2>
            <span className="badge badge--warning">
              {unevidenced.length} item{unevidenced.length === 1 ? '' : 's'} unsupported
            </span>
          </div>
          <div className="card__body">
            <p className="section-note">
              The following rated items carry no linked evidence. In a formal audit these would be
              flagged as unsubstantiated ratings.
            </p>
            <ul className="coverage">
              {unevidenced.map((item) => (
                <li key={item.id} className="coverage__row">
                  <span className="mono coverage__id">{item.id}</span>
                  <span className="coverage__statement">{item.statement}</span>
                  <Link to={`/assessments/workspace/${item.objectiveId}`} className="linkbtn xs">
                    Collect evidence
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
