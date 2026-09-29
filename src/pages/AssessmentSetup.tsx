import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cobitObjectives, domainDescriptions, domainLabels } from '../data/mockData';
import type { COBITDomain } from '../types';
import './AssessmentSetup.css';

const DOMAINS: COBITDomain[] = ['EDM', 'APO', 'BAI', 'DSS', 'MEA'];

const STEPS = [
  { n: 1, label: 'Assessment details' },
  { n: 2, label: 'Select domains' },
  { n: 3, label: 'Select objectives' },
];

type FormState = {
  organization: string;
  title: string;
  assessor: string;
  period: string;
};

const EMPTY_FORM: FormState = {
  organization: '',
  title: '',
  assessor: '',
  period: '',
};

export default function AssessmentSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [domains, setDomains] = useState<COBITDomain[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);

  const visibleObjectives = useMemo(
    () => (domains.length ? cobitObjectives.filter((o) => domains.includes(o.domain)) : cobitObjectives),
    [domains],
  );

  const toggleDomain = (domain: COBITDomain) => {
    const nextDomains = domains.includes(domain)
      ? domains.filter((d) => d !== domain)
      : [...domains, domain];
    setDomains(nextDomains);
    // Deselecting a domain drops any of its objectives already selected
    if (!nextDomains.includes(domain)) {
      setObjectives((prev) =>
        prev.filter((id) => cobitObjectives.find((o) => o.id === id)?.domain !== domain),
      );
    }
  };

  const toggleObjective = (id: string) => {
    setObjectives((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]));
  };

  const next = () => {
    if (step === 1) {
      const found: Partial<Record<keyof FormState, string>> = {};
      if (!form.organization.trim()) found.organization = 'Organisation name is required.';
      if (!form.title.trim()) found.title = 'Assessment title is required.';
      if (!form.assessor.trim()) found.assessor = 'Assessor name is required.';
      setErrors(found);
      if (Object.keys(found).length) return;
    }
    // Step 2 allows proceeding with zero domains — the objective list falls back to the full catalogue.
    setStep((s) => Math.min(3, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const begin = () => {
    if (!objectives.length) return;
    navigate(`/assessments/workspace/${objectives[0]}`);
  };

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>New assessment
          </p>
          <h1 className="page-title">Assessment setup</h1>
          <p className="page-lead">
            Define the assessment record, then select the COBIT 2019 domains and management
            objectives that fall within the audit boundary. The scope fixed here determines which
            items are rated and which capability results are produced.
          </p>
        </div>
      </header>

      {/* ---------------- Step indicator ---------------- */}
      <ol className="steps" aria-label="Setup progress">
        {STEPS.map((s) => {
          const state = s.n < step ? 'done' : s.n === step ? 'current' : 'todo';
          return (
            <li key={s.n} className={`steps__item steps__item--${state}`}>
              <span className="steps__marker mono" aria-hidden="true">
                {state === 'done' ? '✓' : s.n}
              </span>
              <span className="steps__label">{s.label}</span>
              {state === 'current' && <span className="visually-hidden">(current step)</span>}
            </li>
          );
        })}
      </ol>

      <div className="setup__cols">
        <div className="setup__main">
          {/* ---------------- Step 1 ---------------- */}
          {step === 1 && (
            <section className="card reveal" aria-labelledby="step1-heading">
              <div className="card__head">
                <div>
                  <p className="eyebrow">
                    <span className="eyebrow__num">01</span>Step 1 of 3
                  </p>
                  <h2 id="step1-heading" className="card__title">
                    Assessment details
                  </h2>
                </div>
              </div>

              <div className="card__body">
                <div className="form-grid">
                  <div className="field">
                    <label className="field__label" htmlFor="org">
                      Organisation<span className="field__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="org"
                      className={`input${errors.organization ? ' input--invalid' : ''}`}
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Sample Organization"
                      aria-invalid={Boolean(errors.organization)}
                      aria-describedby={errors.organization ? 'org-error' : undefined}
                      autoComplete="organization"
                    />
                    {errors.organization && (
                      <span id="org-error" className="field__error" role="alert">
                        {errors.organization}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="period">
                      Reporting period
                    </label>
                    <input
                      id="period"
                      className="input"
                      value={form.period}
                      onChange={(e) => setForm({ ...form, period: e.target.value })}
                      placeholder="e.g. Q3 2026"
                    />
                    <span className="field__hint">Optional. The period covered by the assessment.</span>
                  </div>

                  <div className="field form-grid__wide">
                    <label className="field__label" htmlFor="title">
                      Assessment title<span className="field__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="title"
                      className={`input${errors.title ? ' input--invalid' : ''}`}
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. IT Governance Baseline Assessment"
                      aria-invalid={Boolean(errors.title)}
                      aria-describedby={errors.title ? 'title-error' : undefined}
                    />
                    {errors.title && (
                      <span id="title-error" className="field__error" role="alert">
                        {errors.title}
                      </span>
                    )}
                  </div>

                  <div className="field form-grid__wide">
                    <label className="field__label" htmlFor="assessor">
                      Lead assessor<span className="field__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="assessor"
                      className={`input${errors.assessor ? ' input--invalid' : ''}`}
                      value={form.assessor}
                      onChange={(e) => setForm({ ...form, assessor: e.target.value })}
                      placeholder="e.g. Assessor Name"
                      aria-invalid={Boolean(errors.assessor)}
                      aria-describedby={errors.assessor ? 'assessor-error' : undefined}
                      autoComplete="name"
                    />
                    {errors.assessor && (
                      <span id="assessor-error" className="field__error" role="alert">
                        {errors.assessor}
                      </span>
                    )}
                    <span className="field__hint">
                      Recorded against every finding, evidence item, and rating in the assessment.
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ---------------- Step 2 ---------------- */}
          {step === 2 && (
            <section className="card reveal" aria-labelledby="step2-heading">
              <div className="card__head">
                <div>
                  <p className="eyebrow">
                    <span className="eyebrow__num">02</span>Step 2 of 3
                  </p>
                  <h2 id="step2-heading" className="card__title">
                    Select COBIT domains
                  </h2>
                </div>
                <span className="tag">
                  {domains.length ? `${domains.length} selected` : 'No selection'}
                </span>
              </div>

              <div className="card__body">
                <p className="section-note">
                  Select one or more domains. Selecting a domain narrows the objectives available in
                  the next step. Clearing all domains shows the full objective catalogue.
                </p>

                <fieldset className="pickgrid" style={{ marginTop: 'var(--space-5)' }}>
                  <legend className="visually-hidden">COBIT 2019 domains</legend>
                  {DOMAINS.map((domain) => {
                    const count = cobitObjectives.filter((o) => o.domain === domain).length;
                    const checked = domains.includes(domain);
                    return (
                      <label
                        key={domain}
                        className={`pick pick--domain pick--${domain}${checked ? ' is-checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          className="visually-hidden"
                          checked={checked}
                          onChange={() => toggleDomain(domain)}
                        />
                        <span className="pick__mark" aria-hidden="true" />
                        <span className="pick__code mono">{domain}</span>
                        <span className="pick__name">{domainLabels[domain]}</span>
                        <span className="pick__desc">{domainDescriptions[domain]}</span>
                        <span className="pick__count mono">
                          {count} objective{count === 1 ? '' : 's'}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              </div>
            </section>
          )}

          {/* ---------------- Step 3 ---------------- */}
          {step === 3 && (
            <section className="card reveal" aria-labelledby="step3-heading">
              <div className="card__head">
                <div>
                  <p className="eyebrow">
                    <span className="eyebrow__num">03</span>Step 3 of 3
                  </p>
                  <h2 id="step3-heading" className="card__title">
                    Select objectives
                  </h2>
                </div>
                <span className="tag">{objectives.length} selected</span>
              </div>

              <div className="card__body">
                {domains.length > 0 && (
                  <p className="section-note">
                    Filtered to {domains.join(', ')}.{' '}
                    <button type="button" className="linkbtn" onClick={() => setDomains([])}>
                      Show all domains
                    </button>
                  </p>
                )}

                {visibleObjectives.length === 0 ? (
                  <div className="empty">
                    <p className="empty__title">No objectives in the selected domains.</p>
                    <p className="section-note">
                      Clear the domain selection to view the full catalogue.
                    </p>
                    <button type="button" className="btn btn--secondary" onClick={() => setDomains([])}>
                      Clear domain filter
                    </button>
                  </div>
                ) : (
                  <fieldset className="pickgrid pickgrid--objectives">
                    <legend className="visually-hidden">COBIT 2019 management objectives</legend>
                    {visibleObjectives.map((objective) => {
                      const checked = objectives.includes(objective.id);
                      return (
                        <label
                          key={objective.id}
                          className={`pick pick--objective pick--${objective.domain}${
                            checked ? ' is-checked' : ''
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="visually-hidden"
                            checked={checked}
                            onChange={() => toggleObjective(objective.id)}
                          />
                          <span className="pick__mark" aria-hidden="true" />
                          <span className="pick__head">
                            <span className="pick__code mono">{objective.id}</span>
                            <span className={`tag tag--${objective.domain}`}>{objective.domain}</span>
                          </span>
                          <span className="pick__name">{objective.name}</span>
                          <span className="pick__desc">{objective.shortDescription}</span>
                          <span className="pick__count mono">
                            {objective.practices.length} assessment criteria
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>
                )}
              </div>
            </section>
          )}

          {/* ---------------- Navigation ---------------- */}
          <nav className="setup__nav" aria-label="Setup steps">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={back}
              disabled={step === 1}
            >
              ← Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={next}
              >
                Continue
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--primary"
                onClick={begin}
                disabled={objectives.length === 0}
              >
                Begin assessment
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* ---------------- Scope summary ---------------- */}
        <aside className="card setup__summary" aria-labelledby="summary-heading">
          <div className="card__head">
            <h2 id="summary-heading" className="card__title">
              Scope summary
            </h2>
          </div>
          <div className="card__body stack stack-4">
            <dl className="dl">
              <dt>Organisation</dt>
              <dd>{form.organization || <span className="muted">Not set</span>}</dd>
              <dt>Title</dt>
              <dd>{form.title || <span className="muted">Not set</span>}</dd>
              <dt>Assessor</dt>
              <dd>{form.assessor || <span className="muted">Not set</span>}</dd>
              <dt>Period</dt>
              <dd>{form.period || <span className="muted">Not set</span>}</dd>
              <dt>Domains</dt>
              <dd>
                {domains.length ? (
                  <span className="row row--wrap" style={{ gap: 6 }}>
                    {domains.map((d) => (
                      <span key={d} className={`tag tag--${d}`}>
                        {d}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="muted">All</span>
                )}
              </dd>
              <dt>Objectives</dt>
              <dd>
                <span className="mono">{objectives.length}</span>
                {objectives.length > 0 && (
                  <span className="muted mono" style={{ marginLeft: 8 }}>
                    {objectives.join(' · ')}
                  </span>
                )}
              </dd>
            </dl>

            <div className="notice notice--info">
              <div>
                <span className="notice__label">Prototype</span>
                Scope selections are held in memory for demonstration only and are not persisted.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
