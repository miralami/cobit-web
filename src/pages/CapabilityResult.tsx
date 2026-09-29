import { useState } from 'react';
import { Link } from 'react-router-dom';
import { capabilityLevelLabels, capabilityResults, cobitObjectives, currentAssessment } from '../data/mockData';
import './CapabilityResult.css';

const LEVELS = [0, 1, 2, 3, 4, 5];

export default function CapabilityResult() {
  const [selectedId, setSelectedId] = useState(capabilityResults[0].objectiveId);
  const result = capabilityResults.find((r) => r.objectiveId === selectedId) ?? capabilityResults[0];
  const objective = cobitObjectives.find((o) => o.id === result.objectiveId);

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Capability results
          </p>
          <h1 className="page-title">Assessed capability level</h1>
          <p className="page-lead">
            Capability levels are derived from the rated assessment items for each objective on the
            COBIT 0–5 scale, then compared against the target level set in the audit plan.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/gap-analysis" className="btn btn--secondary">
            Gap analysis
          </Link>
          <Link to="/evidence" className="btn btn--primary">
            Evidence register
          </Link>
        </div>
      </header>

      {/* ---------------- Objective selector ---------------- */}
      {/* Toggle buttons, not tabs: the level card below is the only panel, so there is no
          tabpanel to associate `aria-controls` with. `aria-pressed` states the selection. */}
      <div className="objtabs">
        {capabilityResults.map((r) => {
          const obj = cobitObjectives.find((o) => o.id === r.objectiveId);
          const active = r.objectiveId === selectedId;
          return (
            <button
              key={r.objectiveId}
              type="button"
              aria-pressed={active}
              className={`objtab${active ? ' is-active' : ''}`}
              onClick={() => setSelectedId(r.objectiveId)}
            >
              <span className="mono objtab__id">{r.objectiveId}</span>
              <span className="objtab__name">{obj?.name}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------- Level comparison ---------------- */}
      <section className="card levelcard reveal" aria-labelledby="level-heading">
        <div className="card__head">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__num">{result.objectiveId}</span>
              {objective && <span className={`tag tag--${objective.domain}`}>{objective.domain}</span>}
            </p>
            <h2 id="level-heading" className="card__title levelcard__title">
              {objective?.name}
            </h2>
          </div>
          <span className="badge badge--warning">Gap of {result.gap} level{result.gap === 1 ? '' : 's'}</span>
        </div>

        <div className="card__body">
          <div className="levels">
            <div className="levelbox">
              <span className="eyebrow">Current level</span>
              <p className="levelbox__value">
                <span className="levelbox__num mono">{result.currentLevel}</span>
                <span className="levelbox__label">{capabilityLevelLabels[result.currentLevel]}</span>
              </p>
            </div>

            <div className="levelbox levelbox--target">
              <span className="eyebrow">Target level</span>
              <p className="levelbox__value">
                <span className="levelbox__num mono">{result.targetLevel}</span>
                <span className="levelbox__label">{capabilityLevelLabels[result.targetLevel]}</span>
              </p>
            </div>

            <div className="levelbox levelbox--completion">
              <span className="eyebrow">Assessment completion</span>
              <p className="levelbox__value">
                <span className="levelbox__num mono">{result.completionStatus}%</span>
                <span className="levelbox__label">
                  {result.completionStatus >= 75 ? 'Substantially assessed' : 'Partially assessed'}
                </span>
              </p>
            </div>
          </div>

          {/* 0–5 scale with current, gap and target markers */}
          <div className="scalewrap">
            <div
              className="level-scale"
              role="img"
              aria-label={`Current level ${result.currentLevel}, target level ${result.targetLevel}, gap ${result.gap}`}
            >
              {LEVELS.map((level) => {
                const filled = level <= result.currentLevel;
                const isGap = level > result.currentLevel && level <= result.targetLevel;
                const isTarget = level === result.targetLevel;
                return (
                  <span
                    key={level}
                    className={`level-cell${filled ? ' is-filled' : ''}${isGap ? ' is-gap' : ''}${
                      isTarget ? ' is-target' : ''
                    }`}
                    title={`Level ${level} — ${capabilityLevelLabels[level]}`}
                  >
                    <span className="level-cell__num mono">{level}</span>
                  </span>
                );
              })}
            </div>
            <div className="scale-legend">
              {LEVELS.map((level) => (
                <span key={level} className="scale-legend__item">
                  {capabilityLevelLabels[level]}
                </span>
              ))}
            </div>
            <div className="scalekey">
              <span className="scalekey__item">
                <i className="scalekey__swatch scalekey__swatch--current" aria-hidden="true" />
                Achieved (0–{result.currentLevel})
              </span>
              <span className="scalekey__item">
                <i className="scalekey__swatch scalekey__swatch--gap" aria-hidden="true" />
                Gap to target
              </span>
              <span className="scalekey__item">
                <i className="scalekey__swatch scalekey__swatch--target" aria-hidden="true" />
                Target level {result.targetLevel}
              </span>
            </div>
          </div>

          {objective && <p className="levelcard__summary">{objective.description}</p>}
        </div>
      </section>

      {/* ---------------- Strengths & gaps ---------------- */}
      <div className="result-cols">
        <section className="card reveal reveal-1" aria-labelledby="strengths-heading">
          <div className="card__head">
            <h2 id="strengths-heading" className="card__title">
              Strengths
            </h2>
            <span className="badge badge--success">{result.strengths.length}</span>
          </div>
          <ul className="findings findings--strengths">
            {result.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="card reveal reveal-2" aria-labelledby="gaps-heading">
          <div className="card__head">
            <h2 id="gaps-heading" className="card__title">
              Identified gaps
            </h2>
            <span className="badge badge--danger">{result.gaps.length}</span>
          </div>
          <ul className="findings findings--gaps">
            {result.gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* ---------------- Disclaimer ---------------- */}
      <div className="notice notice--warning resultdisclaimer">
        <div>
          <span className="notice__label">Sample data</span>
          Capability levels, strengths and gaps shown on this page are illustrative prototype data
          for the {currentAssessment.title} of {currentAssessment.organization}. They are not a
          formal COBIT 2019 capability assessment and carry no audit assurance. Documented
          capability level assignment is out of scope for this prototype.
        </div>
      </div>
    </div>
  );
}
