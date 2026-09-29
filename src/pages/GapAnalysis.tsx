import { Link } from 'react-router-dom';
import { capabilityLevelLabels, currentAssessment, gapAnalysisData } from '../data/mockData';
import './GapAnalysis.css';

const LEVELS = [0, 1, 2, 3, 4, 5];

export default function GapAnalysis() {
  const totalGap = gapAnalysisData.reduce((sum, row) => sum + row.gap, 0);
  const widestGap = Math.max(...gapAnalysisData.map((row) => row.gap));

  return (
    <div className="page">
      <header className="page-head">
        <div className="page-head__text">
          <p className="eyebrow">
            <span className="eyebrow__num">◆</span>Gap analysis
          </p>
          <h1 className="page-title">Capability gap analysis</h1>
          <p className="page-lead">
            Comparison of assessed capability against the target level for each area in scope. The
            gap is the number of capability levels that must be closed to meet the audit plan.
          </p>
        </div>
        <div className="page-head__actions">
          <Link to="/results" className="btn btn--secondary">
            Capability results
          </Link>
          <Link to="/recommendations" className="btn btn--primary">
            Recommendations
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* ---------------- Aggregate ---------------- */}
      <section className="gapsum" aria-label="Gap summary">
        <div className="card gapsum__card reveal">
          <span className="eyebrow">Areas analysed</span>
          <p className="gapsum__value num">{gapAnalysisData.length}</p>
        </div>
        <div className="card gapsum__card reveal reveal-1">
          <span className="eyebrow">Total gap</span>
          <p className="gapsum__value num">{totalGap} levels</p>
        </div>
        <div className="card gapsum__card reveal reveal-2">
          <span className="eyebrow">Widest gap</span>
          <p className="gapsum__value num">
            {widestGap} level{widestGap === 1 ? '' : 's'}
          </p>
        </div>
        <div className="card gapsum__card reveal reveal-3">
          <span className="eyebrow">Target level</span>
          <p className="gapsum__value gapsum__value--sm">
            Level 3 · {capabilityLevelLabels[3]}
          </p>
        </div>
      </section>

      {/* ---------------- Gap table ---------------- */}
      <section className="card reveal reveal-4" aria-labelledby="gap-table-heading">
        <div className="card__head">
          <h2 id="gap-table-heading" className="card__title">
            Area comparison
          </h2>
          <span className="tag mono">{currentAssessment.period}</span>
        </div>

        <div className="table-wrap">
          <table className="table">
            <caption className="visually-hidden">
              Capability gap by assessment area, showing current level, target level and the gap.
            </caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Capability</th>
                <th scope="col" className="table__num">
                  Current
                </th>
                <th scope="col" className="table__num">
                  Target
                </th>
                <th scope="col">Gap</th>
                <th scope="col" className="table__num">
                  Levels to close
                </th>
              </tr>
            </thead>
            <tbody>
              {gapAnalysisData.map((row) => (
                <tr key={row.area}>
                  <th scope="row" className="table__primary gaptable__area">
                    {row.area}
                  </th>
                  <td>
                    <div
                      className="level-scale level-scale--mini"
                      role="img"
                      aria-label={`Current level ${row.current}, target level ${row.target}`}
                    >
                      {LEVELS.map((level) => {
                        const filled = level <= row.current;
                        const isGap = level > row.current && level <= row.target;
                        return (
                          <span
                            key={level}
                            className={`level-cell${filled ? ' is-filled' : ''}${
                              isGap ? ' is-gap' : ''
                            }${level === row.target ? ' is-target' : ''}`}
                          >
                            <span className="level-cell__num mono">{level}</span>
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="table__num">{row.current}</td>
                  <td className="table__num">{row.target}</td>
                  <td>
                    <div className="gapbar">
                      <div className="gapbar__track">
                        <div
                          className="gapbar__fill"
                          style={{ width: `${(row.gap / widestGap) * 100}%` }}
                        />
                      </div>
                      <span className="gapbar__label">
                        {capabilityLevelLabels[row.current]} → {capabilityLevelLabels[row.target]}
                      </span>
                    </div>
                  </td>
                  <td className="table__num">
                    <span
                      className={`badge badge--${
                        row.gap >= 3 ? 'danger' : row.gap === 2 ? 'warning' : 'neutral'
                      }`}
                    >
                      {row.gap}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card__foot gaplegend">
          <span className="gaplegend__item">
            <i className="scalekey__swatch scalekey__swatch--current" aria-hidden="true" />
            Current capability
          </span>
          <span className="gaplegend__item">
            <i className="scalekey__swatch scalekey__swatch--gap" aria-hidden="true" />
            Gap to target
          </span>
          <span className="gaplegend__item">
            <i className="scalekey__swatch scalekey__swatch--target" aria-hidden="true" />
            Target level
          </span>
        </div>
      </section>

      {/* ---------------- Future: AI-assisted recommendations ---------------- */}
      <section className="aibox reveal" aria-labelledby="ai-heading">
        <div className="aibox__head">
          <span className="aibox__badge mono">Planned</span>
          <div>
            <h2 id="ai-heading" className="aibox__title">
              AI-Assisted Recommendation
            </h2>
            <p className="aibox__sub">
              Future capability of the COBIT Assessment System
            </p>
          </div>
        </div>

        <p className="aibox__placeholder">
          Recommendations will be generated from assessment findings and identified capability
          gaps.
        </p>

        <ul className="aibox__points">
          <li>Derive improvement actions from rated findings and capability gaps</li>
          <li>Propose a target sequence ordered by gap size and objective dependency</li>
          <li>Record the rationale, and the evidence each action is derived from</li>
        </ul>

        <div className="aibox__foot">
          <span className="xs muted">
            Not implemented in this prototype. See{' '}
            <Link to="/recommendations">Recommendations</Link> for the intended scope.
          </span>
        </div>
      </section>
    </div>
  );
}
