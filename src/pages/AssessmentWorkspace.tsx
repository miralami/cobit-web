import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  assessmentItems,
  cobitObjectives,
  currentAssessment,
  domainLabels,
  evidenceRecords,
  responseOptions,
} from '../data/mockData';
import type { AssessmentItem, ResponseRating } from '../types';
import './AssessmentWorkspace.css';

const TONE: Record<ResponseRating, string> = {
  'not-achieved': 'danger',
  'partially-achieved': 'warning',
  'largely-achieved': 'info',
  'fully-achieved': 'success',
};

const responseValue = (r: ResponseRating | null) => r ?? '';

export default function AssessmentWorkspace() {
  const { objectiveId = 'BAI06' } = useParams();
  const objective = cobitObjectives.find((o) => o.id === objectiveId);

  const items: AssessmentItem[] = useMemo(() => {
    if (!objective) return [];
    const seeded = assessmentItems.filter((i) => i.objectiveId === objective.id);
    if (seeded.length) return seeded;
    // No seeded responses for this objective — derive items from its practices
    return objective.practices.map((practice) => ({
      id: `${objective.id}-${practice.id}`,
      objectiveId: objective.id,
      statement: practice.description,
      response: null,
      notes: '',
      evidenceIds: [],
    }));
  }, [objective]);

  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseRating | null>>(() =>
    Object.fromEntries(assessmentItems.map((i) => [i.id, i.response])),
  );
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    Object.fromEntries(items.map((i) => [i.id, i.notes])),
  );
  const [attachNote, setAttachNote] = useState(false);
  const [scopedObjectiveId, setScopedObjectiveId] = useState(objectiveId);

  // Route params change without a remount. Reset during render, not in an effect: an effect runs
  // after commit, where a stale `index` (e.g. 4) would index past a shorter item list and crash.
  // Only reset the index and attach state — notes and responses persist across objectives so
  // the assessor can navigate freely without losing entered data.
  if (scopedObjectiveId !== objectiveId) {
    setScopedObjectiveId(objectiveId);
    setIndex(0);
    setAttachNote(false);
  }

  if (!objective) {
    return (
      <div className="page">
        <header className="page-head">
          <div className="page-head__text">
            <p className="eyebrow">
              <span className="eyebrow__num">◆</span>Assessment workspace
            </p>
            <h1 className="page-title">Objective not found</h1>
            <p className="page-lead">
              No COBIT 2019 objective exists with the identifier{' '}
              <span className="mono">{objectiveId}</span>.
            </p>
          </div>
        </header>
        <div className="empty">
          <p className="empty__title">Check the objective identifier</p>
          <p className="empty__body">
            Select an objective from the dashboard, or restart the assessment setup to choose from
            the catalogue.
          </p>
          <Link to="/dashboard" className="btn btn--primary">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const current = items[index];
  const rated = items.filter((i) => responses[i.id]).length;
  const progress = items.length ? Math.round((rated / items.length) * 100) : 0;
  const currentResponse = responses[current.id] ?? null;
  const currentEvidence = evidenceRecords.filter((e) => current.evidenceIds.includes(e.id));

  const setResponse = (value: ResponseRating) =>
    setResponses((prev) => ({ ...prev, [current.id]: value }));

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Assessment workspace
          </p>
          <h1 className="page-title ws__title">
            <span className="ws__id mono">{objective.id}</span>
            <span className="ws__dash" aria-hidden="true">
              —
            </span>
            {objective.name}
          </h1>
          <p className="page-lead">{objective.description}</p>
        </div>
        <div className="page-head__actions">
          <Link to="/evidence" className="btn btn--secondary">
            Evidence register
          </Link>
          <Link to="/results" className="btn btn--primary">
            Capability result
          </Link>
        </div>
      </header>

      {/* ---------------- Objective record bar ---------------- */}
      <div className="ws__record">
        <dl className="ws__record-meta">
          <div>
            <dt>Domain</dt>
            <dd>
              <span className={`tag tag--${objective.domain}`}>{objective.domain}</span>
              <span className="ws__record-domain">{domainLabels[objective.domain]}</span>
            </dd>
          </div>
          <div>
            <dt>Assessment criteria</dt>
            <dd className="mono">{objective.practices.length}</dd>
          </div>
          <div>
            <dt>Items in scope</dt>
            <dd className="mono">{items.length}</dd>
          </div>
          <div>
            <dt>Assessment</dt>
            <dd>{currentAssessment.organization}</dd>
          </div>
          <div>
            <dt>Assessor</dt>
            <dd>{currentAssessment.assessor}</dd>
          </div>
        </dl>

        <div className="ws__record-progress">
          <div className="progress-row">
            <span>Rated items</span>
            <span className="progress-value">
              {rated} / {items.length} · {progress}%
            </span>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${rated} of ${items.length} items rated`}
          >
            <div className="progress__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="ws__cols">
        {/* ---------------- Criteria rail ---------------- */}
        <aside className="card ws__rail" aria-labelledby="criteria-heading">
          <div className="card__head">
            <h2 id="criteria-heading" className="card__title">
              Criteria
            </h2>
            <span className="tag">{items.length}</span>
          </div>
          <ol className="critlist">
            {items.map((item, i) => {
              const response = responses[item.id];
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`crit${i === index ? ' is-current' : ''}`}
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    <span className="crit__num mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="crit__body">
                      <span className="crit__statement">{item.statement}</span>
                      <span className="crit__status">
                        {response ? (
                          <span className={`badge badge--${TONE[response]}`}>
                            {responseOptions.find((r) => r.value === response)?.label}
                          </span>
                        ) : (
                          <span className="badge badge--neutral">Not rated</span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* ---------------- Item under assessment ---------------- */}
        <section className="ws__main" aria-labelledby="item-heading">
          <article className="card reveal" key={current.id}>
            <div className="card__head">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow__num">{String(index + 1).padStart(2, '0')}</span>
                  Item {index + 1} of {items.length}
                </p>
                <h2 id="item-heading" className="ws__statement">
                  {current.statement}
                </h2>
              </div>
              <span className="tag mono">{current.id}</span>
            </div>

            <div className="card__body stack stack-6">
              {/* --- Achievement scale --- */}
              <fieldset className="rates">
                <legend className="field__label">Achievement</legend>
                <p className="rates__hint">
                  Rate the practice against its assessment criteria. A rating should be supported by
                  a finding; attach evidence where available.
                </p>

                <div className="rates__list">
                  {responseOptions.map((option, i) => {
                    const checked = currentResponse === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`rate rate--${option.value}${checked ? ' is-checked' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`response-${current.id}`}
                          className="visually-hidden"
                          value={option.value}
                          checked={checked}
                          onChange={() => setResponse(option.value)}
                        />
                        <span className="rate__scale" aria-hidden="true">
                          {[0, 1, 2, 3].map((tick) => (
                            <span
                              key={tick}
                              className={`rate__tick${tick <= i ? ' is-on' : ''}`}
                            />
                          ))}
                        </span>
                        <span className="rate__text">
                          <span className="rate__label">
                            {option.label}
                            <span className="rate__index mono">{i}</span>
                          </span>
                          <span className="rate__desc">{option.description}</span>
                        </span>
                        <span className="rate__radio" aria-hidden="true" />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* --- Findings --- */}
              <div className="field">
                <label className="field__label" htmlFor={`notes-${current.id}`}>
                  Findings &amp; notes
                </label>
                <textarea
                  id={`notes-${current.id}`}
                  className="textarea"
                  value={notes[current.id] ?? ''}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [current.id]: e.target.value }))}
                  placeholder="Record what was examined, the control owner interviewed, and the basis for the rating above."
                />
                <div className="ws__notes-foot">
                  <span className="field__hint">
                    Findings are retained against the assessment record and surfaced in the
                    capability result.
                  </span>
                  <span className="mono xs muted">
                    {(notes[current.id] ?? '').length} chars
                  </span>
                </div>
              </div>

              {/* --- Evidence --- */}
              <div className="field">
                <span className="field__label">Evidence</span>
                <div className="ws__evidence">
                  {currentEvidence.length > 0 ? (
                    <ul className="evlist">
                      {currentEvidence.map((e) => (
                        <li key={e.id} className="evlist__row">
                          <span className={`evlist__type evlist__type--${e.type}`}>{e.type}</span>
                          <span className="evlist__name">
                            {e.name}
                            <span className="evlist__notes">{e.notes}</span>
                          </span>
                          <span
                            className={`badge badge--${
                              e.status === 'reviewed'
                                ? 'success'
                                : e.status === 'attached'
                                  ? 'info'
                                  : 'warning'
                            }`}
                          >
                            {e.status}
                          </span>
                          <span className="mono xs muted">{e.date}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ws__evidence-empty">
                      No evidence linked to this item. A rating of{' '}
                      <strong>Largely Achieved</strong> or above is expected to cite at least one
                      source record.
                    </p>
                  )}

                  <div className="ws__attach">
                    <button
                      type="button"
                      className="attachbtn"
                      onClick={() => setAttachNote((v) => !v)}
                      aria-expanded={attachNote}
                    >
                      <span className="attachbtn__plus" aria-hidden="true">
                        +
                      </span>
                      Attach evidence
                    </button>
                    {attachNote && (
                      <p className="field__hint" role="status">
                        Prototype: document upload and linking are not implemented. Evidence shown
                        here is sample data from the register.
                      </p>
                    )}
                    <Link to="/evidence" className="linkbtn xs">
                      Open evidence register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* --- Item navigation --- */}
          <nav className="ws__nav" aria-label="Assessment item navigation">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              ← Previous item
            </button>

            <div className="ws__nav-status">
              <span className="ws__nav-count mono">
                {index + 1} / {items.length}
              </span>
              {/* Redundant pointer shortcut for the criteria rail; kept out of the tab order,
                  so it must not be hidden from assistive tech while remaining focusable. */}
              <span className="ws__nav-dots">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`ws__dot${i === index ? ' is-current' : ''}${
                      responses[item.id] ? ' is-rated' : ''
                    }`}
                    onClick={() => setIndex(i)}
                    tabIndex={-1}
                    aria-current={i === index ? 'true' : undefined}
                    aria-label={`Item ${i + 1}: ${item.statement}${responses[item.id] ? ', rated' : ', not rated'}`}
                  />
                ))}
              </span>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
              disabled={index === items.length - 1}
            >
              Save &amp; next
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </nav>

          <p className="ws__disclaimer">
            <span className="mono">Prototype</span> — ratings, findings, and item navigation are
            held in memory and are not persisted. Current response for this item:{' '}
            <span className="mono">{currentResponse ? responseValue(currentResponse) : 'unrated'}</span>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
