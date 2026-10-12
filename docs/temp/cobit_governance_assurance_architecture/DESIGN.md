---
name: COBIT Governance & Assurance Architecture
colors:
  surface: '#f8f9ff'
  surface-dim: '#d7dae2'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3fc'
  surface-container: '#ebeef6'
  surface-container-high: '#e5e8f1'
  surface-container-highest: '#dfe2eb'
  on-surface: '#181c22'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3137'
  inverse-on-surface: '#eef1f9'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#5c5e65'
  on-secondary: '#ffffff'
  secondary-container: '#dedfe8'
  on-secondary-container: '#60626a'
  tertiary: '#6a1edb'
  on-tertiary: '#ffffff'
  tertiary-container: '#8343f4'
  on-tertiary-container: '#f7edff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e1e2ea'
  secondary-fixed-dim: '#c4c6ce'
  on-secondary-fixed: '#191c22'
  on-secondary-fixed-variant: '#44474d'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#f8f9ff'
  on-background: '#181c22'
  surface-variant: '#dfe2eb'
typography:
  headline-xl:
    fontFamily: IBM Plex Serif
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: IBM Plex Serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: IBM Plex Serif
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  kpi-stat:
    fontFamily: IBM Plex Serif
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  code-tabular:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system establishes a high-density, authoritative environment tailored for enterprise IT governance, risk evaluations, and executive audit committee reporting under the COBIT 2019 framework. The visual tone balances administrative sobriety with crisp analytical precision.

### Target Persona & Mindset
- **Primary Audience:** Chief Information Officers (CIOs), Chief Information Security Officers (CISOs), Internal Audit Directors, and Enterprise Risk Executives.
- **Emotional Mandate:** Impartiality, institutional trustworthiness, operational defensibility, and executive readiness. Every screen must resemble an official regulatory instrument rather than an ephemeral SaaS workflow.

### Stylistic Philosophy: Corporate Assurance & Systematic Audit
The design integrates formal editorial rigor with dense, instrument-grade data displays:
- **Serif Primacy for Accountability:** Major analytical verdicts, governance levels, and top-tier metrics leverage an authoritative corporate serif to signal legal and institutional permanence.
- **Technical Precision:** Operational controls, sub-process mappings, and audit evidentiary data leverage systematic sans-serif and tabular monospace typefaces.
- **Controlled Contrast:** A muted institutional canvas (`#F7F8FA`) paired with a dark executive shell (`#1A1D23`) creates distinct separation between navigation mechanics and regulatory work surfaces.

## Colors

The color system delivers high accessibility standards (WCAG AAA for primary data reading, WCAG AA for interface controls) while encoding domain-specific COBIT governance objectives into clear visual cues.

### Core Canvas & Structure
- **Surface Canvas:** `#F7F8FA` provides an anti-glare, document-like background for prolonged review sessions.
- **Card & Elevated Containers:** `#FFFFFF` with precise, single-pixel perimeter rules (`#E4E7EC`).
- **Dark Structural Shell:** `#1A1D23` anchors the navigation and platform-wide tenancy shell, isolated via `#2A2E36` borders with active indicators in `#2E333D`.

### Typography Hierarchy Tokens
- **Ink Primary:** `#12161C` for core headings, compliance scores, and primary table data.
- **Muted Label:** `#667085` for table column headers, secondary process descriptions, and metadata.
- **Faint Hint:** `#98A2B3` for structural rules, inactive states, and placeholder elements.

### Operational State Tokens
- **Focus / Accent:** `#2563EB` (Royal Blue)
- **Compliant / Target Met (Success):** `#16A34A`
- **Tolerable Deviation (Warning):** `#D97706`
- **Critical Deficiency (Danger):** `#DC2626`
- **Informational / Baseline (Info):** `#0891B2`

### COBIT 2019 Domain Taxonomy
Domain identifiers are strictly pinned to standardized semantic accents across tags, radar matrices, and capability level indicators:
- **EDM (Evaluate, Direct and Monitor):** `#7C3AED`
- **APO (Align, Plan and Organize):** `#2563EB`
- **BAI (Build, Acquire and Implement):** `#0891B2`
- **DSS (Deliver, Service and Support):** `#16A34A`
- **MEA (Monitor, Evaluate and Assess):** `#D97706`

## Typography

The typography strategy unites administrative weight with structured utility. 

- **Headings & Key Metrics (`IBM Plex Serif`):** Reserved for board-level reports, governance objective headlines, assessment capability tiers, and aggregate KPI statistics. Conveys institutional permanence.
- **General Body & Interface (`IBM Plex Sans`):** Carries all transactional UI, governance criteria checklists, user instructions, and form elements. Ensures legibility across dense dashboard configurations.
- **Audit Tables & Objective Identifiers (`IBM Plex Mono`):** Applied to COBIT objective codes (e.g., `APO01.01`, `EDM05.02`), target-versus-actual numerical spreads, audit timestamps, and control reference IDs. All numbers in data grids must employ tabular sizing to guarantee column alignment.

## Layout & Spacing

To accommodate extensive regulatory control matrices and audit trails, this design system operates on an expanded 12-column fluid grid paired with condensed component spacing tokens.

### Spatial Architecture
- **Desktop Grid:** 12 columns with 24px (`1.5rem`) gutters and 32px (`2rem`) page borders.
- **Compact Assessment Views:** High-density evaluation grids can tighten gutters to 16px (`1rem`) to present simultaneous domain criteria side-by-side.
- **Fixed Enterprise Shell:** A permanent left rail navigation (260px wide) anchors the dark shell, collapsing to an 72px icon-only state on smaller screens. The main workspace expands dynamically.

### Spacing Rhythm
Spacing tokens emphasize compact, readable grouping over decorative whitespace:
- Use `space-xs` (4px) and `space-sm` (8px) for control alignment, inline badges, and form labels.
- Use `space-md` (12px) and `space-lg` (16px) for card body padding and cell padding within comprehensive governance matrices.
- Reserve `space-xl` (24px) and `space-2xl` (32px) for inter-section separation within executive audit decks.

## Elevation & Depth

To sustain an audit-ready, document-grade aesthetic, this design system suppresses exaggerated drop shadows in favor of crisp, structural definition through tonal layering and hair-line border containment.

### Surface Elevation Levels
- **Canvas Base (`Level 0`):** `#F7F8FA` background with zero elevation.
- **Panels & Grid Cards (`Level 1`):** Flat `#FFFFFF` surface enclosed in a 1px solid border of `#E4E7EC`. No ambient shadow is used; structural delineation comes entirely from boundary rules.
- **Popovers, Dropdowns, and Flyouts (`Level 2`):** `#FFFFFF` surface with a 1px border (`#E4E7EC`) paired with a tight, desaturated perimeter shadow: `0px 4px 12px rgba(18, 22, 28, 0.08)`.
- **Audit Modals & Capability Drawers (`Level 3`):** `#FFFFFF` surface surrounded by `0px 12px 32px rgba(18, 22, 28, 0.14)`. Modal backdrops utilize `#12161C` at 45% opacity to focus reviewer attention.

## Shapes

The shape system adopts a formal corporate profile (`roundedness: 1`), keeping corner radii sharp and structured to maximize usable data real estate within information-dense tables and evaluation scorecards.

### Geometric Scale
- **Micro Radii (`4px` / `rounded-sm`):** Standard form inputs, checkboxes, table cell tags, and granular domain control chips.
- **Interactive Controls (`8px` / `rounded-md`):** Primary/secondary action buttons, dropdown trigger containers, and segmented view switchers.
- **Structured Cards (`12px` / `rounded-lg`):** Analytical cards, assessment score panels, and chart containers.
- **Overlays (`16px` / `rounded-xl`):** Governance assessment dialogs and full-screen audit review drawers.
- **Pill Geometry (`9999px` / `rounded-full`):** Exclusively reserved for COBIT domain tags (`EDM`, `APO`, `BAI`, `DSS`, `MEA`) and capability level status indicators (`Level 0` through `Level 5`).

## Components

### Buttons & Operational Actions
- **Primary Action:** Solid `#2563EB` background with white text, 8px border-radius, 36px total height for standard actions (32px for high-density tables). Hover transitions to `#1D4ED8`.
- **Secondary Action:** White background with 1px solid `#E4E7EC` border and `#12161C` text. Hover shifts background to `#F7F8FA`.
- **Destructive Action:** White background with 1px solid `#DC2626` border and `#DC2626` text. Active audit dismissals switch to solid `#DC2626` fill with white text.

### Domain & Status Chips
- Chips maintain a height of 22px with 6px horizontal padding and a strict 9999px radius (pill-shaped).
- **Domain Accents:** Use a 10% tint background matching the specific domain color (e.g., `#7C3AED1A` for EDM) paired with the saturated domain accent for the label (`IBM Plex Mono`, 11px uppercase).
- **Maturity / Capability Indicators:** Display numeric scores (0 to 5) using monospace tabular weights with high-contrast indicator dots.

### Forms & Input Fields
- Input fields use a 1px solid border (`#E4E7EC`) on a pure white surface, 36px field height, and 4px border-radius.
- Focused inputs deploy a 1px border of `#2563EB` along with a 2px outer outline ring colored `#2563EB20`.
- Labels are rendered in `#667085` (`13px`, medium weight), positioned 4px above the active input field.

### Checkboxes & Regulatory Toggles
- Square 16px checkboxes with a 4px corner radius.
- Unselected states utilize an explicit `#E4E7EC` border; selected states take a `#2563EB` fill with a crisp white check icon.
- Toggles for framework flags (e.g., "Applicable / Non-Applicable") display binary status using monospaced labels directly adjacent to the switch mechanism.

### Data Tables & Governance Grids
- **Header Row:** Background `#F7F8FA` with 1px top and bottom borders in `#E4E7EC`. Text is styled via `label-sm` (`11px`, `#667085`, all-caps, tracking +0.03em).
- **Body Rows:** Zebra-striping is avoided; separate rows using 1px horizontal borders in `#E4E7EC`. On hover, the row transitions to `#F7F8FA`.
- **Data Cells:** 44px standard height for dense audit matrices; 56px for rows containing evidence upload links and multi-line notes. Numerical metrics align right with `code-tabular`.

### Capability Cards
- Enclosed with a 1px border (`#E4E7EC`), `#FFFFFF` background, and 12px corner radius.
- Card headers feature an authoritative serif title alongside a domain badge and capability score pill.
- The footer contains an audit timestamp and certified reviewer sign-off metadata in `body-sm`.