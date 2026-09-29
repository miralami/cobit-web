import { Link } from 'react-router-dom';
import { currentAssessment, gapAnalysisData } from '../data/mockData';
import './Recommendations.css';

const PLANNED = [
  {
    num: '01',
    title: 'Analyse assessment findings',
    body: 'Read the recorded ratings, findings and linked evidence across all assessed items, and identify where rated practice diverges from the criteria set out in the COBIT 2019 assessment model.',
  },
  {
    num: '02',
    title: 'Identify improvement areas',
    body: 'Cluster findings into improvement areas and weight them by capability gap, the number of affected assessment items, and the dependency between governance objectives.',
  },
  {
    num: '03',
    title: 'Generate improvement recommendations',
    body: 'Draft a recommended action for each improvement area — expressed as a control change rather than a technology change, so that it can be assigned to a process owner.',
  },
  {
    num: '04',
    title: 'Provide rationale from evidence',
    body: 'Cite the specific findings and evidence records behind every recommendation, so an assessor can verify the suggestion rather than accept it on trust.',
  },
  {
    num: '05',
    title: 'Organise recommended actions',
    body: 'Group actions into a sequenced improvement plan with an owner, a target level, and an expected effect on the capability gap, ready to be exported for management review.',
  },
];

export default function Recommendations() {
  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Recommendations
          </p>
          <h1 className="page-title">Improvement recommendations</h1>
          <p className="page-lead">
            The final stage of the assessment lifecycle, where findings and capability gaps are
            converted into a sequenced set of improvement actions.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/gap-analysis" className="btn btn--secondary">
            ← Back to gap analysis
          </Link>
        </div>
      </header>

      {/* ---------------- Empty state ---------------- */}
      <section className="rec-empty" aria-labelledby="rec-empty-heading">
        <div className="rec-empty__frame">
          <div className="rec-empty__mark" aria-hidden="true">
            <span className="rec-empty__num mono">00</span>
            <span className="rec-empty__rule" />
          </div>

          <p className="eyebrow">Status</p>
          <h2 id="rec-empty-heading" className="rec-empty__title">
            AI-assisted recommendations are not available in this prototype.
          </h2>
          <p className="rec-empty__body">
            Recommendation generation depends on a documented, rule-based capability level
            assignment across every assessed objective. That step is not implemented in this
            prototype, so no recommendation can yet be derived from the sample data.
          </p>

          <dl className="rec-empty__facts">
            <div>
              <dt>Assessment</dt>
              <dd>{currentAssessment.title}</dd>
            </div>
            <div>
              <dt>Areas with an open gap</dt>
              <dd className="mono">{gapAnalysisData.filter((g) => g.gap > 0).length}</dd>
            </div>
            <div>
              <dt>Recommendations generated</dt>
              <dd className="mono">0</dd>
            </div>
          </dl>

          <div className="rec-empty__actions">
            <Link to="/gap-analysis" className="btn btn--primary">
              Review gap analysis
            </Link>
            <Link to="/results" className="btn btn--secondary">
              View capability results
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Intended scope ---------------- */}
      <section aria-labelledby="planned-heading">
        <div className="planned__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__num">§</span>Planned capability
            </p>
            <h2 id="planned-heading" className="planned__title">
              What this page is intended to do
            </h2>
          </div>
          <p className="section-note">
            The following describes the intended behaviour of the recommendation engine. None of it
            is implemented or simulated in the current build.
          </p>
        </div>

        <ol className="planned__list">
          {PLANNED.map((item) => (
            <li key={item.num} className="planned__item">
              <span className="planned__num mono">{item.num}</span>
              <h3 className="planned__item-title">{item.title}</h3>
              <p className="planned__body">{item.body}</p>
            </li>
          ))}
        </ol>

        <div className="notice notice--warning planned__notice">
          <div>
            <span className="notice__label">Prototype limitation</span>
            Any output shown by a future version of this page would be advisory. Recommendations
            would remain subject to review and approval by the assessor and the process owner, and
            would not constitute an audit opinion.
          </div>
        </div>
      </section>
    </div>
  );
}
