import { Link } from 'react-router-dom';
import { capabilityLevelLabels, cobitObjectives, domainDescriptions, domainLabels } from '../data/mockData';
import './Landing.css';

const COBIT_DOMAINS = ['EDM', 'APO', 'BAI', 'DSS', 'MEA'] as const;

const METHOD = [
  {
    num: '01',
    title: 'Scope',
    body: 'Define the assessed organisation, the reporting period, and the COBIT 2019 objectives that fall inside the audit boundary.',
  },
  {
    num: '02',
    title: 'Collect',
    body: 'Rate each assessment item against the four-point achievement scale and record findings with supporting evidence.',
  },
  {
    num: '03',
    title: 'Rate',
    body: 'Derive a capability level per objective across the COBIT 0–5 scale, and record the target level set by the audit plan.',
  },
  {
    num: '04',
    title: 'Analyse',
    body: 'Compare current capability against target to expose gaps, then organise improvement work against the findings.',
  },
];

export default function Landing() {
  const specimen = cobitObjectives.find((o) => o.id === 'BAI06')!;

  return (
    <div className="landing">
      {/* ---------------- Top rule bar ---------------- */}
      <div className="landing__bar">
        <span className="mono">COBIT Assessment System</span>
        <span className="landing__bar-sep" aria-hidden="true" />
        <span className="mono">Research Prototype</span>
        <span className="spacer" />
        <span className="mono muted-on-ink">v0.1.0</span>
      </div>

      {/* ---------------- Masthead ---------------- */}
      <header className="masthead">
        <div className="masthead__grid" aria-hidden="true" />

        <div className="masthead__inner">
          <div>
            <p className="eyebrow eyebrow--ink reveal">
              <span className="eyebrow__num">◆</span>
              ISACA COBIT 2019 Framework
            </p>
            <h1 className="masthead__title reveal reveal-1">
              A structured instrument for
              <br />
              <em>IT governance</em> assessment.
            </h1>
            <p className="masthead__lead reveal reveal-2">
              The COBIT Assessment System records a formal, evidence-based evaluation of an
              organisation&rsquo;s IT governance practices against COBIT 2019 management objectives —
              from scoping the audit, through capability rating, to gap analysis and improvement
              planning.
            </p>

            <div className="masthead__actions reveal reveal-3">
              <Link to="/assessments/setup" className="btn btn--onInk btn--lg">
                Start Assessment
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link to="/dashboard" className="btn btn--outlineInk btn--lg">
                View Previous Assessments
              </Link>
            </div>

            <dl className="masthead__facts reveal reveal-4">
              <div>
                <dt>Framework</dt>
                <dd>COBIT 2019</dd>
              </div>
              <div>
                <dt>Domains</dt>
                <dd>5 · EDM → MEA</dd>
              </div>
              <div>
                <dt>Achievement scale</dt>
                <dd>4-point, 0–5 capability</dd>
              </div>
            </dl>
          </div>

          {/* Specimen record — deliberately breaks the masthead edge */}
          <figure className="specimen reveal reveal-3" aria-labelledby="specimen-caption">
            <div className="specimen__head">
              <span className="eyebrow">Assessment record</span>
              <span className="badge badge--warning">In progress</span>
            </div>

            <p className="specimen__id mono">{specimen.id}</p>
            <h2 className="specimen__name">{specimen.name}</h2>
            <p className="specimen__desc">{specimen.shortDescription}</p>

            <div className="specimen__scale">
              <div className="progress-row">
                <span>Capability level</span>
                <span className="progress-value">
                  2 · {capabilityLevelLabels[2]}
                </span>
              </div>
              <div className="level-scale" role="img" aria-label="Current capability level 2 of 5, target level 3">
                {Object.keys(capabilityLevelLabels).map((level) => {
                  const n = Number(level);
                  return (
                    <span
                      key={level}
                      className={`level-cell${n <= 2 ? ' is-filled' : ''}${n === 3 ? ' is-target' : ''}`}
                    >
                      <span className="level-cell__num mono">{n}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <ul className="specimen__meta">
              <li>
                <span className="muted">Target</span>
                <span className="mono">3 · {capabilityLevelLabels[3]}</span>
              </li>
              <li>
                <span className="muted">Evidence</span>
                <span className="mono">4 records</span>
              </li>
              <li>
                <span className="muted">Completion</span>
                <span className="mono">75%</span>
              </li>
            </ul>

            <figcaption id="specimen-caption" className="specimen__caption">
              Sample output — illustrative data only.
            </figcaption>
          </figure>
        </div>
      </header>

      {/* ---------------- Method ---------------- */}
      <section className="method" aria-labelledby="method-heading">
        <div className="method__head">
          <p className="eyebrow">
            <span className="eyebrow__num">§ 01</span>Method
          </p>
          <h2 id="method-heading" className="method__title">
            Four stages, one auditable record.
          </h2>
          <p className="section-note">
            Every stage produces an artefact that an auditor, an academic reviewer, or a control
            owner can inspect later. Ratings are never recorded without a finding and, where
            available, corroborating evidence.
          </p>
        </div>

        <ol className="method__list">
          {METHOD.map((step) => (
            <li key={step.num} className="method__item">
              <span className="method__num mono">{step.num}</span>
              <h3 className="method__item-title">{step.title}</h3>
              <p className="method__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Domains ---------------- */}
      <section className="domains" aria-labelledby="domains-heading">
        <div className="domains__head">
          <p className="eyebrow">
            <span className="eyebrow__num">§ 02</span>Framework coverage
          </p>
          <h2 id="domains-heading" className="section-title">
            The five COBIT 2019 domains
          </h2>
          <p className="section-note">
            Governance and management objectives are grouped into a cascading structure. An
            assessment selects objectives from one or more domains according to the audit scope.
          </p>
        </div>

        <ul className="domains__list">
          {COBIT_DOMAINS.map((domain) => (
            <li key={domain} className={`domains__item domains__item--${domain}`}>
              <div className="domains__code mono">{domain}</div>
              <h3 className="domains__name">{domainLabels[domain]}</h3>
              <p className="domains__body">{domainDescriptions[domain]}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Close ---------------- */}
      <section className="landing__cta">
        <div className="landing__cta-inner">
          <p className="eyebrow eyebrow--ink">
            <span className="eyebrow__num">◆</span>Prototype environment
          </p>
          <h2 className="landing__cta-title">Begin an assessment</h2>
          <p className="landing__cta-body">
            Sample data is preloaded so the workflow can be demonstrated end to end. No data leaves
            this environment.
          </p>
          <div className="landing__cta-actions">
            <Link to="/assessments/setup" className="btn btn--onInk btn--lg">
              Start Assessment
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/dashboard" className="btn btn--outlineInk btn--lg">
              View Previous Assessments
            </Link>
          </div>
        </div>
      </section>

      <footer className="landing__foot">
        <span className="mono">COBIT Assessment System</span>
        <span className="muted-on-ink">Research prototype · sample data · v0.1.0</span>
      </footer>
    </div>
  );
}
