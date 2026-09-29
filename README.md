# COBIT Assessment System

A structured instrument for **IT governance** assessment against the ISACA COBIT 2019 framework. Records a formal, evidence-based evaluation of an organisation's IT governance practices — from scoping the audit, through capability rating, to gap analysis and improvement planning.

**Research Prototype · v0.1.0**

---

## Overview

The COBIT Assessment System guides assessors through a four-stage audit workflow:

1. **Scope** — Define the organisation, reporting period, and COBIT 2019 objectives within the audit boundary.
2. **Collect** — Rate each assessment item against a four-point achievement scale and record findings with supporting evidence.
3. **Rate** — Derive a capability level per objective on the COBIT 0–5 scale, and record the target level set by the audit plan.
4. **Analyse** — Compare current capability against target to expose gaps, then organise improvement work against the findings.

Every stage produces an artefact that an auditor, an academic reviewer, or a control owner can inspect later. Ratings are never recorded without a finding and, where available, corroborating evidence.

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | React 19 + TypeScript                         |
| Build      | Vite 8                                        |
| Routing    | React Router 7                                |
| Styling    | Hand-written CSS (custom properties, no framework) |
| Linting    | Oxlint                                        |
| Fonts      | IBM Plex Sans, IBM Plex Mono, Spectral        |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Sidebar shell + navigation
│   └── Layout.css
├── pages/
│   ├── Landing.tsx         # Full-bleed masthead + method + domains
│   ├── Dashboard.tsx       # Assessment summary, lifecycle rail, activity feed
│   ├── AssessmentSetup.tsx # 3-step wizard: details → domains → objectives
│   ├── AssessmentWorkspace.tsx  # Criteria rail + item rating + evidence
│   ├── EvidenceFindings.tsx     # Evidence register + coverage audit
│   ├── CapabilityResult.tsx     # 0–5 scale comparison + strengths & gaps
│   ├── GapAnalysis.tsx          # Area comparison table + AI placeholder
│   └── Recommendations.tsx       # Empty state + intended scope
├── styles/
│   ├── global.css          # Design tokens (color, spacing, typography)
│   └── ui.css              # Shared UI primitives (cards, buttons, badges, tables)
├── data/
│   └── mockData.ts         # Sample assessment data
├── types/
│   └── index.ts            # TypeScript domain types
├── App.tsx                 # Router setup
└── main.tsx                # Entry point
```

---

## Assessment Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Scope    │────▶│   Collect   │────▶│    Rate     │────▶│   Analyse   │
│             │     │             │     │             │     │             │
│ Setup       │     │ Workspace   │     │ Capability  │     │ Gap Analysis│
│             │     │ + Evidence  │     │ Results     │     │ + Recommend │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Pages

| Route                            | Page                 | Purpose                                                        |
| -------------------------------- | -------------------- | -------------------------------------------------------------- |
| `/`                              | Landing              | Masthead, method overview, framework coverage, CTA             |
| `/dashboard`                     | Dashboard            | Assessment summary, lifecycle rail, selected objectives, activity |
| `/assessments/setup`             | Assessment Setup     | 3-step wizard to define scope and select objectives           |
| `/assessments/workspace/:id`     | Assessment Workspace | Rate items against achievement scale, attach evidence, record findings |
| `/evidence`                      | Evidence Register    | Evidence records, status tracking, coverage audit              |
| `/results`                       | Capability Results   | Current vs target level, 0–5 scale, strengths & gaps           |
| `/gap-analysis`                  | Gap Analysis         | Area comparison, levels to close, AI-assisted recommendations  |
| `/recommendations`               | Recommendations      | Improvement actions (planned capability)                       |

---

## Design System

The UI follows a **document-led enterprise language**: hairline rules, mono data, serif display.

### Typography

| Role        | Font           | Usage                              |
| ----------- | -------------- | ---------------------------------- |
| Display     | Spectral       | Page titles, section headings      |
| Body        | IBM Plex Sans  | UI text, descriptions, labels      |
| Mono        | IBM Plex Mono  | Data identifiers, timestamps, codes |

### Colour Palette

| Token                | Value     | Usage                          |
| -------------------- | --------- | ------------------------------ |
| `--color-ink`        | `#12161c` | Primary text, dark surfaces    |
| `--color-canvas`     | `#f6f7f8` | Page background                |
| `--color-accent`     | `#2563eb` | Interactive elements, links    |
| `--color-success`    | `#16a34a` | Completed, achieved            |
| `--color-warning`    | `#d97706` | In progress, pending           |
| `--color-danger`     | `#dc2626` | Gaps, not achieved             |

### Domain Colours

| Domain | Colour     | Full Name                     |
| ------ | ---------- | ----------------------------- |
| EDM    | `#7c3aed`  | Evaluate, Direct and Monitor  |
| APO    | `#2563eb`  | Align, Plan and Organize      |
| BAI    | `#0891b2`  | Build, Acquire and Implement  |
| DSS    | `#16a34a`  | Deliver, Service and Support  |
| MEA    | `#d97706`  | Monitor, Evaluate and Assess  |

---

## Development

### Design Tokens

All visual values are defined as CSS custom properties in `src/styles/global.css`. Use these tokens rather than hardcoding values in component styles.

### Shared UI Primitives

`src/styles/ui.css` provides reusable classes:

- **Layout:** `.page`, `.page-head`, `.stack-*`, `.row`, `.row--between`
- **Cards:** `.card`, `.card__head`, `.card__body`, `.card__foot`
- **Buttons:** `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--sm`, `.btn--lg`
- **Badges:** `.badge`, `.badge--success`, `.badge--warning`, `--danger`, `--info`, `--neutral`
- **Forms:** `.field`, `.input`, `.textarea`, `.select`, `.field__label`, `.field__error`
- **Tables:** `.table`, `.table-wrap`, `.table__primary`, `.table__num`
- **Progress:** `.progress`, `.progress__fill`, `.progress-row`
- **Scale:** `.level-scale`, `.level-cell`, `.scalekey`

### Accessibility

- Semantic HTML throughout (`header`, `main`, `nav`, `section`, `article`, `aside`)
- ARIA labels on icon-only buttons and visual indicators
- `aria-current` on active navigation and pagination
- `aria-pressed` on toggle buttons
- `role="progressbar"` with `aria-valuenow` on progress indicators
- `role="alert"` on form validation errors
- `prefers-reduced-motion` support disables all animations
- Visible focus indicators via `:focus-visible`

---

## Known Limitations

- **No persistence** — All data is held in memory; ratings, findings, and scope selections are lost on refresh.
- **Sample data only** — Assessment items, evidence records, and capability results are illustrative prototype data.
- **No document upload** — Evidence attachment is not implemented; the register shows pre-loaded sample records.
- **No AI recommendations** — The recommendation engine is a planned capability; the page documents intended scope only.
- **No authentication** — Single-user prototype with no access control.
- **No export** — Assessment reports cannot be exported for management review.

---

## License

Research prototype. All rights reserved.
