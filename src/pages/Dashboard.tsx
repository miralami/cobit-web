import { Link } from 'react-router-dom';
import { cobitObjectives, currentAssessment, recentActivity } from '../data/mockData';
import type { Activity } from '../types';
import './Dashboard.css';

const STAGES = ['Setup', 'Assessment', 'Evidence', 'Capability', 'Gap Analysis', 'Recommendations'];

const statusMeta: Record<string, { label: string; tone: string }> = {
  'in-progress': { label: 'In Progress', tone: 'info' },
  'not-started': { label: 'Not Started', tone: 'neutral' },
  completed: { label: 'Completed', tone: 'success' },
  archived: { label: 'Archived', tone: 'neutral' },
};

const activityLabel: Record<Activity['type'], string> = {
  assessment: 'Assessment',
  evidence: 'Evidence',
  review: 'Review',
  setup: 'Setup',
};

export default function Dashboard() {
  const { status, progress, currentStage } = currentAssessment;
  const statusTone = statusMeta[status].tone;
  const currentIndex = STAGES.indexOf(currentStage);
  const selected = currentAssessment.selectedObjectives
    .map((id) => cobitObjectives.find((o) => o.id === id))
    .filter((o) => o !== undefined);

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Dashboard
          </p>
          <h1 className="page-title">{currentAssessment.title}</h1>
          <p className="page-lead">
            Working record of the current assessment. Progress reflects the share of selected
            objectives that have been rated with supporting evidence.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/assessments/setup" className="btn btn--secondary">
            New Assessment
          </Link>
          <Link to={`/assessments/workspace/${selected[0]?.id ?? 'BAI06'}`} className="btn btn--primary">
            Continue Assessment
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* ---------------- Record summary ---------------- */}
      <section className="facts" aria-label="Assessment summary">
        <div className="card facts__card reveal">
          <span className="eyebrow">Organisation</span>
          <p className="facts__value">{currentAssessment.organization}</p>
          <p className="facts__meta mono">{currentAssessment.id}</p>
        </div>

        <div className="card facts__card reveal reveal-1">
          <span className="eyebrow">Status</span>
          <p className="facts__value">
            <span className={`badge badge--${statusTone}`}>{statusMeta[status].label}</span>
          </p>
          <p className="facts__meta">Updated {currentAssessment.updatedAt}</p>
        </div>

        <div className="card facts__card reveal reveal-2">
          <span className="eyebrow">Progress</span>
          <p className="facts__value num">{progress}%</p>
          <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment completion">
            <div className="progress__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="card facts__card reveal reveal-3">
          <span className="eyebrow">Current stage</span>
          <p className="facts__value facts__value--sm">{currentStage}</p>
          <p className="facts__meta">Stage {currentIndex + 1} of {STAGES.length}</p>
        </div>
      </section>

      {/* ---------------- Stage rail ---------------- */}
      <section className="card stage reveal reveal-4" aria-labelledby="stage-heading">
        <div className="card__body">
          <h2 id="stage-heading" className="card__title">
            Assessment lifecycle
          </h2>
          <ol className="stagerail">
            {STAGES.map((stage, i) => {
              const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo';
              return (
                <li key={stage} className={`stagerail__step stagerail__step--${state}`}>
                  <span className="stagerail__marker mono" aria-hidden="true">
                    {state === 'done' ? '✓' : i + 1}
                  </span>
                  <span className="stagerail__label">{stage}</span>
                  {state === 'current' && <span className="visually-hidden">(current stage)</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------- Two column ---------------- */}
      <div className="dash-cols">
        <section className="card reveal" aria-labelledby="objectives-heading">
          <div className="card__head">
            <h2 id="objectives-heading" className="card__title">
              Selected objectives
            </h2>
            <span className="tag">{selected.length} of {cobitObjectives.length}</span>
          </div>

          <ul className="objlist">
            {selected.map((objective) => (
              <li key={objective.id} className={`objlist__row objlist__row--${objective.domain}`}>
                <div className="objlist__id mono">{objective.id}</div>
                <div className="objlist__body">
                  <div className="objlist__title-row">
                    <h3 className="objlist__name">{objective.name}</h3>
                    <span className={`tag tag--${objective.domain}`}>{objective.domain}</span>
                  </div>
                  <p className="objlist__desc">{objective.shortDescription}</p>
                </div>
                <Link
                  to={`/assessments/workspace/${objective.id}`}
                  className="btn btn--ghost btn--sm"
                >
                  Open
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="card__foot">
            <Link to="/assessments/setup" className="small">
              Modify assessment scope
            </Link>
          </div>
        </section>

        <section className="card reveal reveal-1" aria-labelledby="activity-heading">
          <div className="card__head">
            <h2 id="activity-heading" className="card__title">
              Recent activity
            </h2>
            <span className="tag">{recentActivity.length} events</span>
          </div>

          <ol className="feed">
            {recentActivity.map((event, i) => (
              <li key={event.id} className="feed__row" style={{ animationDelay: `${i * 60}ms` }}>
                <span className={`feed__mark feed__mark--${event.type}`} aria-hidden="true" />
                <div className="feed__body">
                  <div className="feed__head">
                    <h3 className="feed__action">{event.action}</h3>
                    <span className="feed__type">{activityLabel[event.type]}</span>
                  </div>
                  <p className="feed__details">{event.details}</p>
                  <time className="feed__time mono" dateTime={event.timestamp.replace(' ', 'T')}>
                    {event.timestamp}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
