# Deep-Research Report — Establishing a Defensible Research Gap for *Sistem Informasi Assessment Berbasis COBIT 2019*

> **Working title under review:** *Rancang Bangun Sistem Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit*
>
> **Date of report:** 2026-10-13
> **All sources accessed:** 2026-10-13 (unless a different date is stated)
> **Repository:** `cobit-web` (`docs/06-deep-research-research-gap.md`)
> **Supersedes / reconciles with:** `01-literature-review.md`, `02-system-design-research.md`, `03-thesis-decision-log.md`, `04-regulasi-indonesia-cobit.md`, `05-product-requirements-document.md`, `latar-belakang.md`

This report is **adversarial to the existing drafts on purpose**. It independently re-checks the claims that the thesis's novelty rests on, separates verified fact from interpretation, labels every claim with its evidence status, and flags where the current drafts over-claim. It does **not** invent sources or convert "not found" into "does not exist."

---

## 1. Executive Summary

**Overall verdict: a defensible gap exists — but it is *not* "Excel → web".**

The research gap is defensible only when framed as an **Information Systems design problem**:

> *ISACA provides no official Process Assessment Model (PAM) or computational assessment instrument for COBIT 2019. The only official digital artifact — the COBIT 2019 Design Guide Tool Kit — is a **design/prioritisation spreadsheet**, not a capability-measurement engine. The published COBIT 2019 rating scale (F/L/P/N) is defined as an assessor **judgment**, and ISACA/ISACA-Journal sources give “no single mandatory aggregation formula”. Existing commercial GRC tools map COBIT content but do not compute COBIT capability levels; academic prototypes move the spreadsheet to the web without documented scoring or evidence traceability. There is therefore a documented, reproducible gap for a system that (a) makes the CPM scoring/aggregation logic **explicit and inspectable**, (b) links every activity rating to **audit evidence** (traceability), and (c) manages the assessment as a **repeatable, comparable, reportable IS artifact** (multi-assessment, history, comparison, reporting).*

### 1.1 Key findings (with confidence)

| # | Finding | Confidence | Anchor |
|---|---------|-----------|--------|
| F1 | **COBIT 2019 has no PAM.** COBIT 5 did (ISO/IEC 15504/330xx); COBIT 2019 moved to a CMMI-based scheme called COBIT Performance Management (CPM). ISACA's own text: *"No separate process assessment model (PAM) publications are necessary, nor will they be provided with COBIT 2019."* | **High** | *COBIT 2019 Framework: Introduction and Methodology* §6.3 (p. 38); ISACA Journal 2021 Vol 6 (Gorgona) |
| F2 | **The official digital toolkit is design-only.** The Design Guide Tool Kit weights the 40 objectives by design factors to produce a prioritised design (initial/refined/concluded scope). It is **not** a capability-assessment instrument. | **High** | ISACA Industry News 2020 (Harisaiprasad); ISACA 2020 "COBIT Tool Kit Enhancements" |
| F3 | **The N/P/L/F thresholds used by the prototype are correct and match ISO/IEC 33020:2019 §5.3 exactly** (N 0–≤15%; P >15–≤50%; L >50–≤85%; F >85–≤100%). COBIT 2019's own prose is loose at the 15/50/85 boundaries; ISO resolves them. | **High** | *COBIT 2019 Framework: I&M* §6.4.2 (p. 39); ISACA COBIT-Focus 2019 (Dhulipalla); **ISO/IEC 33020:2019 §5.3** |
| F4 | **ISACA defines *no* mandatory aggregation formula.** Simple average is proposed for early maturity; weighted average is "recommended" otherwise. The 2021 Journal article explicitly says organisations must define the **expected evidence per activity**. | **High** | ISACA Journal 2021 Vol 6 |
| F5 | **The rating scale is a judgment, not a mechanical count.** ISACA: *"Fully … remains a judgment call, but it can be substantiated by the examination or assessment of the components of the enabler."* | **High** | ISACA COBIT-Focus 2019 / Souza Neto et al. 2019 |
| F6 | **There is no single official "gate"; three readings compete.** (i) COBIT's literal sentence: a process reaches a level *"as soon as **all activities of that level are performed successfully**"*; (ii) the published **proposal** (Souza Neto, Almeida & Mira da Silva 2019): all activities **L or F**; (iii) the **ISO/IEC 33020 staged model**: the level *claimed* needs only **Largely (>50%)**, all lower levels need **Fully (>85%)**. | **High** | *COBIT 2019 Framework: G&M Objectives* §3.4 (p. 20); ISACA Industry News 2019; ISO/IEC 33020 (via Automotive SPICE PAM 3.1, Table 16) |
| F7 | **"Excel → web" by itself is an engineering activity, not a research contribution.** It becomes a gap only when tied to a validated problem (transparency, traceability, reproducibility, assessment management). | **High (interpretation)** | See §3 |
| F8 | **The RAG/AI layer is not needed to defend the gap.** The existing RAG-heavy framing (a) is not required by CPM, (b) contains at least three source-integrity problems (see §7), and (c) dilutes the IS contribution. | **Medium-High** | See §7 |
| F9 | **The prototype's "100% match vs Excel" test claim is not supported by the test that exists.** `engine.test.ts` compares against hand-coded literals and an **interview-derived demo dataset** (`benchmarkData.ts`; not a validated or official benchmark) — not against the ISACA toolkit (which is design-only, §5.1) and not against any official reference. | **High** | `src/utils/__tests__/engine.test.ts`; `src/data/benchmarkData.ts` |
| F10 | **The prototype's gate (>85% mean at every level) is stricter than the ISO staged rule and a different operationalisation from COBIT's literal "all activities" sentence** — defensible only if labelled an *adaptation* and made configurable (see §4.2 B5, §4.3). It is recognisable in prior Indonesian practice (Marcela & Fianty 2023; Simatupang & Fianty 2023). | **High** | §4.2; *COBIT 2019 Framework: G&M* §3.4; ISO/IEC 33020:2019; DOI 10.33022/ijcs.v12i4.3353; DOI 10.33379/gtech.v7i4.3141 |
| F11 | **Indonesian regulation does not mandate COBIT, and is context — not the justification.** COBIT appears only as an optional best-practice reference, mostly in *revoked* instruments. Current SPBE-evaluation law is **PermenPANRB 8/2026** (revoking 59/2020); Perpres 132/2022 is *not* an amendment to Perpres 95/2018. | **High** | §9.5 (verified 2026-10-13) |

### 1.2 What must change in the existing drafts (top 6)

1. **Stop claiming a COBIT 2019 PAM exists** — the drafts mostly get this right; keep it, and never let it drift into "COBIT 2019 assesses process attributes/outcomes like COBIT 5 PAM did."
2. **Downgrade "verified from COBIT 2019 I&M"** for the capability-level *names* in `01-literature-review.md` §3.4 — the framework text provides **six descriptive characteristics**, not the CMMI one-word labels; the drafts mixed two naming systems (see §4.4).
3. **Fix the "critical rule"** in `01-literature-review.md` §3.5/§3.3: the published gate is *"all activities rated **L or F**"*, not *"all activities rated **F**"*. The prototype (>85% aggregate) is a *different* rule (see §4.2).
4. **Correct the citation "Almeida 2019"** → **Souza Neto, Almeida & Mira da Silva (2019)**, ISACA Industry News (a *proposal*), not an ISACA standard.
5. **Remove or re-label the "validated 100% vs ISACA Excel" claim.** There is no ISACA Excel assessment workbook to validate against; the reference is the documented CPM rules or the PANRB workbook, both of which must be labelled as such.
6. **Rebalance the literature review away from RAG.** Move AI/RAG to an *optional future-work* paragraph; the gap must stand on the assessment/evidence/management argument (§7).

### 1.3 AI/RAG recommendation (short form)

**OPTIONAL-SIMPLE** — a single direct LLM call that drafts a recommendation from the gap result, always labelled *"AI-generated draft — assessor review required"*. **No RAG pipeline, no retrieval metrics, no AI in the title, RQs, or methodology.** Rationale and the decision rule are in §7. (If time pressure is real, **OMIT** entirely — the gap does not need it.)

---

## 2. Method and Evidence-Labeling Conventions

### 2.1 What was done

- Independently re-verified the **official COBIT 2019 / ISACA** primary sources (CPM, capability levels, rating scale, toolkit purpose, counts).
- Re-read the prototype's actual implementation (`src/utils/cpmEngine.ts`, `src/utils/__tests__/engine.test.ts`) and the PRD's CPM section, and checked them against the primary sources.
- Re-checked a sample of the RAG/audit claims in `01-literature-review.md` against the real literature.
- Cross-checked DOI-level references for DSRM and evaluation methods.

### 2.2 Evidence labels (used throughout this report and required in the thesis)

| Label | Meaning |
|-------|---------|
| `[VER-P]` | **Verified – primary.** ISACA/ISO/IIA/peer-reviewed page fetched this session; the claim is visible on that page. |
| `[VER-S]` | **Verified – secondary.** Real, findable source, but the specific claim is reported by a third party, not the origin page. |
| `[2ND-UNV]` | **Secondary, unverified.** A number/name attributed to a source that could not be confirmed from the source page. Treat as suspect. |
| `[NF]` | **Not found in this search.** *Not* evidence of absence. |
| `[OWN]` | **Interpretation / reasoning by this report.** Not a source claim. |

### 2.3 Known limitations

- **Paywalled primaries:** ISO/IEC 33020:2015/2019 §5.6 and ISO/IEC 33004:2015 body text are restricted; the COBIT 2019 *books* and the Design Guide Tool Kit were read this session from **publicly available PDF/ZIP copies** (content matches ISACA's published titles/archived pages), so exact quotes carry `[VER-P]` but should be cited via the ISACA store/ISBN, not a mirror. The ISO staged rule (§5.6) is quoted via the 2015 model reproduced in Automotive SPICE PAM 3.1 (Table 16).
- **Search instability:** the web-search tool failed intermittently; Brave Search via fetch was used, with occasional HTTP 429. `lite.duckduckgo.com` gave a certificate error. Where a search failed, the item is marked `[NF]` rather than assumed absent.
- **Vendor claims** (GRC platforms) were not all re-verified this session; those rows are labelled `[2ND-UNV]` and must be re-verified before they appear in the thesis.

---

## 3. Focus A — Is “Excel → Web Migration” Itself a Valid Research Gap?

### 3.1 Direct answer

**No — not on its own.** Migration of a spreadsheet artefact to a web application is an *implementation activity* (a software engineering task). A thesis contribution (DSRM "design knowledge") requires evidence of a **problem class** that the artefact addresses, plus a **design principle** that generalises beyond the one artefact (Gregor & Hevner 2013; Hevner et al. 2004). "We put the Excel in the browser" satisfies neither.

It becomes a **valid** gap when the following chain holds, and each link is evidenced:

> (1) an authoritative artefact exists that is **only** a file → (2) it is **not** an assessment instrument → (3) the assessment task therefore relies on **un-inspectable, undocumented, non-traceable** practice → (4) existing tools/prototypes do **not** close this → (5) the thesis contributes a **system + explicit design principles** for the scoring/evidence/management problem.

### 3.2 The chain, item by item

| Element | Status | Evidence |
|---------|--------|----------|
| The official digital artefact is a **design** workbook, not an assessment engine | `[VER-P]` | ISACA Industry News 2020 (Harisaiprasad, 27 Apr 2020): the tool kit "provides a chart for weighting the 40 processes … initial/refined/concluded scopes"; ISACA 2020 "COBIT Tool Kit Enhancements" |
| No official COBIT 2019 PAM / capability-measurement instrument | `[VER-P]` | ISACA Journal 2021 Vol 6 (Gorgona): *"There is no PAM for COBIT 2019"* |
| COBIT 2019 capability ratings are designed to be **judgment + evidence based** | `[VER-P]` | ISACA COBIT-Focus 2019 (Dhulipalla): "Fully … remains a judgment call"; "traceability must be maintained between the objective evidence collected and the process activity ratings assigned" |
| Existing academic prototypes migrate the spreadsheet **without documenting scoring or evidence linkage** | `[2ND-UNV]` | Claims carried in `02-system-design-research.md` §2.5 / `03-thesis-decision-log.md` §3.4 — **must be re-verified from each paper before the thesis states it** |
| The thesis's own product decision already concedes the framing risk | `[VER-P]` (repo) | `05-product-requirements-document.md` line 78 and 43; `03-thesis-decision-log.md` line 38 |

### 3.3 How to phrase the gap (defensible vs indefensible)

| ✗ Indefensible | ✓ Defensible |
|----------------|--------------|
| "No web version of the COBIT 2019 Excel tool exists." | "The official COBIT 2019 artefact is a *design* spreadsheet; no official *capability-assessment* instrument exists (no PAM), so scoring and evidence-linkage practice is undocumented and non-reproducible." |
| "We move the 27-sheet workbook to the web." | "We make the **CPM scoring/aggregation logic explicit and inspectable**, and bind each activity rating to **auditable evidence**, so a third party can reproduce the result (cf. IIA 2024 documentation principle; ISACA ITAF evidence requirement)." |
| "Faster data entry." | "Assessment **management**: repeated assessments across periods/units, historical comparison, and report generation — an IS artefact class, not a data-entry convenience." |

### 3.4 Focus-A gap table

| Element | Claim to be defended | Evidence anchor | Status | Verdict |
|---------|----------------------|-----------------|--------|---------|
| A1 Official artefact is a file | Toolkit is `.xlsx`, distributed as a file | ISACA tool kit pages | `[VER-S]` | Supports "file-only" |
| A2 Artefact purpose | Design/prioritisation, not assessment | ISACA Industry News 2020 | `[VER-P]` | **Core support** |
| A3 Assessment-specific instrument | None published for COBIT 2019 | ISACA Journal 2021 | `[VER-P]` | **Core support** |
| A4 Manual practice is non-reproducible | Scoring/aggregation not standardised | ISACA gives no mandatory formula | `[VER-P]` | Supports |
| A5 Prior prototypes do not close it | Undocumented scoring, no evidence mgmt | Draft claims | `[2ND-UNV]` | **Must re-verify per paper** |
| A6 Migration alone is a contribution | — | — | `[OWN]` | **Rejected** |

**Focus-A conclusion:** the *migration* is not the gap; the **absence of an official, transparent, evidence-traceable COBIT 2019 capability-assessment instrument and its management workflow** is.

---

## 4. Focus B — Validating the Official COBIT 2019 CPM Mechanism

> This is the section that most affects whether the thesis's scoring is defensible. The instruction was: **do not assume all scores can be averaged.** The evidence below shows *why*.

### 4.1 What ISACA actually specifies

**(a) CPM is CMMI-based; COBIT 5's ISO/IEC-330xx PAM was dropped.**

| | COBIT 5 | COBIT 2019 |
|---|---|---|
| Performance model | ISO/IEC 33000 (SPICE) | CMMI Performance Management scheme |
| Scale | 0–5 | 0–5 (capability *and* maturity) |
| PAM | Yes (ISO/IEC 15504/330xx) | **No** |
| Processes | 37 | 40 |

`[VER-P]` *COBIT 2019 Framework: Introduction and Methodology* §6.3/§6.4.1 (p. 38): *"COBIT 2019 supports a CMMI-based process capability scheme … ranging from 0 to 5"*; *"In COBIT 2019, the explicit process outcomes or process goals are replaced by the process practices themselves"*; and, decisively, *"**No separate process assessment model (PAM) publications are necessary, nor will they be provided with COBIT 2019**."* The same point is official in ISACA (2018) *Introducing COBIT 2019: Major Differences with COBIT 5*. Corroborated by ISACA Industry News 2020 (Harisaiprasad) and ISACA Journal 2021 Vol 6 (Gorgona).

**(b) Two distinct constructs — do not conflate them.**

- **Capability level** — per **process**; "a measure of how well a process is implemented and performing."
- **Maturity level** — per **focus area**; "achieved if all required capability levels are achieved" across the processes in that focus area.

`[VER-P]` ISACA Industry News 2020 (Elue, "Effective Capability and Maturity Assessment Using COBIT 2019"); ISACA COBIT-Focus 2019 (Dhulipalla).

**(c) Capability-level characteristics 0–5** (quoted from *COBIT 2019 Framework: Introduction and Methodology*, fig. 6.2):

| Level | Characteristic (framework wording) |
|-------|-----------------------------------|
| 0 | Process lacks basic capability; incomplete approach to the governance/management purpose; may or may not be meeting the intent of any process practices |
| 1 | Process more or less achieves its purpose through an **incomplete** set of activities — initial/intuitive, not very organised |
| 2 | Achieves its purpose through a **basic, yet complete, set of activities**; characterised as *performed* |
| 3 | Achieves its purpose in a much more **organised** way using organisational assets; processes typically **well defined** |
| 4 | Achieves its purpose, well defined, **performance quantitatively measured** |
| 5 | Achieves its purpose, well defined, measured to **improve** performance, **continuous improvement** pursued |

`[VER-P]` Souza Neto, Almeida & Mira da Silva (2019), ISACA Industry News, quoting *COBIT 2019 Framework: I&M* fig. 6.2.

**(d) The rating scale (F/L/P/N) — exact wording.**

> **Fully (F)** — the capability level is achieved for **more than 85%**. *(This remains a judgment call, but it can be substantiated by the examination or assessment of the components of the enabler, such as process activities, process goals or organisational structure good practices.)*
> **Largely (L)** — achieved **between 50% and 85%**.
> **Partially (P)** — achieved **between 15% and 50%**.
> **Not (N)** — achieved **less than 15%**.

`[VER-P]` ISACA COBIT-Focus 2019 (Dhulipalla, 16 Sep 2019); reproduced by Souza Neto et al. 2019, who cite `ISO/IEC 33004:2015` "as referenced in ISACA, *COBIT 2019 Framework: Introduction and Methodology*".

> **Boundary note:** ISACA's own prose is **ambiguous at the boundaries** (Largely "between 50 and 85"; Partially "between 15 and 50"; exact-15% sits only in P). The exact partition is resolved by **ISO/IEC 33020:2019 §5.3** — N 0–≤15%, P >15–≤50%, L >50–≤85%, F >85–≤100% — which is **identical to the prototype's `≤15/≤50/≤85/>85` mapping** (see B2). State in the thesis that the percentages are cited from ISO/IEC 33020:2019, with COBIT's §6.4.2 prose as corroboration — not the reverse.

**(e) The rating is per activity *per capability level*, and it is a judgment.**

ISACA: "For each objective assessed, a rating is assigned for each process activity **up to and including the highest capability level defined in the assessment scope**. The rating is based on validated data, and **traceability must be maintained** between the objective evidence collected and the process activity ratings assigned." `[VER-P]`

**(f) There is no official aggregation formula.**

- *COBIT 2019 Framework: I&M* gives the scale but **no mandatory arithmetic** to roll activities → practices → objectives → domains.
- ISACA Journal 2021 Vol 6 (Gorgona) *proposes*: "For organisations in early maturity stages, a **simple average** calculation for the activity values can be used … If an organisation has a greater capacity … then a **weighted average** … is recommended." It also requires organisations to "**create milestones** … to identify the **expected evidence** for the capability level in each activity." `[VER-P]`
- Counts used by the framework: **1,202 activities → 231 practices → 40 objectives → 5 domains**. `[VER-P]` (Gorgona 2021; ISACA 2020 "COBIT Tool Kit Enhancements" confirms 231 practices).

**(g) The "gate" that decides when a level is achieved — three competing readings.**

| Reading | Rule | Source | Nature |
|---------|------|--------|--------|
| COBIT 2019 literal | *"A process reaches a certain capability level as soon as **all activities of that level are performed successfully**"* | *COBIT 2019 Framework: G&M Objectives* §3.4 (p. 20) | **Official text** — effectively a 100% rule |
| ISACA-published proposal | A level is at least attended if **all** its activities are rated **L or F**; any **N/P** drops it | Souza Neto, Almeida & Mira da Silva (2019), ISACA Industry News | **Proposal**, not a standard |
| ISO/IEC 33020 staged model | The level **claimed** needs only **Largely (>50%)**; all **lower** levels need **Fully (>85%)** | ISO/IEC 33020 (quoted via Automotive SPICE PAM 3.1, Table 16) | **ISO measurement framework** that COBIT 5 inherited; COBIT 2019 does **not** bind to it |

`[VER-P]` for all three. Souza Neto et al. also note processes influence each other via outputs ("garbage in, garbage out"), so they argue a low-scoring process feeding a high-scoring one should not be auto-capped.

### 4.2 Is the prototype's algorithm valid? (`src/utils/cpmEngine.ts`)

The engine implements:

```text
score: Yes=1.0, Partially=0.5, No=0.0, N.A.=excluded
P_L   = sum(scores of level-L activities) / count(non-N.A. level-L activities)
rating: P_L ≤0.15 → N; ≤0.50 → P; ≤0.85 → L; >0.85 → F
gate : level passes iff P_L > 0.85   (i.e. "Fully")
base : level 1 assumed achieved; levels 2..5 evaluated in order; first failure closes the gate
gap  : max(0, target − currentLevel)
```

| ID | Element | Assessment | Severity |
|----|---------|-----------|----------|
| B1 | Threshold values match ISACA | ✅ F/L/P/N = >85 / 50–85 / 15–50 / <15 | — |
| B2 | Boundary partition | ✅ **The engine's partition (≤15→N, >15–≤50→P, >50–≤85→L, >85→F) matches ISO/IEC 33020:2019 §5.3 exactly.** COBIT's own prose is loose at 15/50/85 (e.g. "between 50 and 85"); adopting the ISO boundaries is the correct disambiguation — cite ISO for the boundaries, not COBIT. | — |
| B3 | Activities → percentage → band | ⚠️ **Category shift.** ISACA assigns F/L/P/N **per activity** (judgment of how far the capability level is achieved). The engine derives a **percentage of activity-answers** and applies the band to *that*. Defensible as an operationalisation, but it is **not** ISACA's mechanism. | **High (must be disclosed)** |
| B4 | Simple mean | ✅ Permitted for early maturity by Gorgona 2021 — *as a proposal*. Not officially mandated. | Medium (disclose) |
| B5 | Gate ">85% aggregate = pass" | ⚠️ **Diverges from all three official/published readings** (§4.1g): stricter than the ISO staged rule (the level claimed needs only *Largely* there), and a percentage substitution for COBIT's literal "*all activities*" sentence. It can pass a level while **one activity is rated N (0.0)** (e.g. 9×F + 1×N = 0.90). Must be labelled an **adaptation**, cited to the published "cannot continue below 85%" precedents (Marcela & Fianty 2023; Simatupang & Fianty 2023), and made configurable. | **High (design decision)** |
| B6 | 3-point response scale (Yes/Partially/No) | ⚠️ Drops ISACA's **L (Largely)** at the activity level; recovers it only after aggregation. Acceptable simplification, must be stated. | Medium |
| B7 | `N.A.` excluded from denominator | ⚠️ If **all** activities at a level are `N.A.`, `P_L = 0 → N → gate closes`. "Not assessed" is silently treated as "not achieved." Violates the audit principle of not equating absence of evidence with evidence of absence. | **High (validity)** |
| B8 | Level 1 assumed achieved | ✅ Reasonable for target-based assessment of selected objectives; but level 0 (process absent) cannot be produced. State the assumption. | Low–Medium |
| B9 | Level with **no defined activities** | ⚠️ `validCount = 0 → 0 → fail`, which *happens* to yield the intended "cap at level 4" outcome for level-5-less processes — but only **accidentally**; it is fragile and undocumented. | Medium |
| B10 | No persistence / single assessment | ⚠️ No history, comparison, or traceable assessment lifecycle across time (`05-PRD` line 78: "Belum ada persistensi lintas halaman"). Bound to Focus D. | **High (for the promised contribution)** |
| B11 | "100% match vs Excel" claim | ❌ **Not supported.** `engine.test.ts` asserts against hard-coded literals and the **interview-derived demo** `BENCHMARK_ASSESSMENT_STATE`; there is no ISACA assessment workbook in the repo to match. | **High (claim integrity)** |
| B12 | Design-factor formula | ⚠️ `DF1–DF4` weighted sum + normalisation + target mapping (25/50/75) matches the *Design Guide* example logic (`[VER-P]` Souza Neto et al. quote of *Design Guide* §7.2.4.1), but the prototype's matrix constants and `BENCHMARK_ASSESSMENT_STATE` are **demo/interview-derived** (`src/data/benchmarkData.ts`), not ISACA data. | Medium |

### 4.3 Recommended fix (cheap, high value)

Make the aggregation rule **configurable and visible**, and state it in the thesis as an explicit design decision:

0. **Name the construction honestly**: an *"adaptation of the COBIT 2019 capability-level scale using the ISO/IEC 33020:2019 N/P/L/F percentage bands"*, never "the COBIT 2019 method". Justify the adaptation with ISACA's own words: COBIT is a reference model and *"it is the user's choice to determine how it is utilized"* (Elue 2020), and COBIT 2019 ships **no PAM and no normative algorithm** (§4.1a).
1. Offer **two gates**: **(i) all-activities-L-or-F** (matches the published proposal) and **(ii) aggregate >85%** (current). Report both in results for the same dataset — this *is* a research finding, not a bug.
2. For `N.A.`-only levels, mark the level **"incomplete/insufficient evidence"**, not N.
3. Rename the existing test file's banner from "GROUND TRUTH" to "reference/regression test"; add a **separate** documented reference-calculation fixture (see §8.3).

### 4.4 Corrections to existing drafts (Focus B)

| Where | Claim in draft | Problem | Correct statement |
|-------|----------------|---------|-------------------|
| `01-literature-review.md` §3.4 | Capability names "Incomplete/Initial/Managed/Defined/Quantitatively Managed/Optimizing", labelled *"verified from COBIT 2019 I&M"* | **Wrong ladder mixed in.** The framework gives **six descriptive characteristics** (§4.1c). The *canonical* capability-level names are ISO/IEC 33020:2019 §5.2 — **0 Incomplete · 1 Performed · 2 Managed · 3 Established · 4 Predictable · 5 Innovating**. The "Initial/Managed/Defined/Quantitative/Optimizing" words belong to COBIT's **separate focus-area maturity** ladder (I&M §6.4.3, fig. 6.3) | Present the six capability characteristics verbatim; if a name is used, use the ISO/IEC 33020:2019 §5.2 names; keep the maturity names for focus areas only |
| `01-literature-review.md` §3.5 / `03-decision-log.md` | "level achieved only if **all activities receive F**" | Published proposal says **all L or F** — different | Correct to "all activities rated **Largely or Fully**" (Souza Neto et al. 2019) |
| `01-literature-review.md` §3.5 | Scale labelled "ISO/IEC 33000-based" | Attribution should be: **COBIT 2019 I&M §6.4.2**, whose percentage bands in turn mirror **ISO/IEC 33004:2015** and are identical to **ISO/IEC 33020:2019 §5.3** (for the precise boundaries) | Fix attribution; cite ISO/IEC 33020:2019 §5.3 for the exact bands |
| `01-literature-review.md` §3.6 / `02-...` | "Target-Level Cascade Algorithm (**Almeida 2019**)" | Authors are Souza Neto, **Almeida**, Mira da Silva; it is an ISACA Industry News **proposal** | Correct citation + label "proposal" |
| `05-PRD` §3.6 (already good) | Scale called "asumsi operasional" | ✅ Already correct — keep this discipline; apply it to the "vs Excel" test claim too | — |
| `01-lit-review.md` §3.7 | "JKU academic paper", "NETBankAudit (2025) 1,378 evaluations" | Unverifiable as written | `[2ND-UNV]` until primary located |

### 4.5 Focus-B gap table

| Element | Claim | Evidence | Status | Verdict |
|---------|-------|----------|--------|---------|
| B-A | COBIT 2019 has **no** official PAM | ISACA Journal 2021 | `[VER-P]` | **Solid** |
| B-B | Scale F/L/P/N + thresholds are official | ISACA COBIT-Focus 2019 | `[VER-P]` | **Solid** |
| B-C | No official aggregation formula exists | ISACA 2021 + absence in I&M | `[VER-P]` | **Solid (this is the gap)** |
| B-D | Aggregation must be documented + evidence-anchored | ISACA 2021 (milestones/expected evidence) | `[VER-P]` | **Solid (supports Focus D)** |
| B-E | A per-level gate exists | Souza Neto et al. 2019 | `[VER-P]` | **Solid (proposal)** |
| B-F | Prototype's aggregate gate == published gate | Engine code | `[VER-P]` (repo) | **False — different** |
| B-G | Prototype "matches Excel 100%" | Test file | `[VER-P]` (repo) | **False — unsupported** |

---

## 5. Focus C — Existing Tools and Software Comparison

> **Label discipline:** rows marked `[VER-P]` were fetched this session; `[2ND-UNV]` are inherited from `02-system-design-research.md` §2 and **must be independently re-verified** before publication. Absence of a feature = "not found in this source", **not** "does not exist."

### 5.1 ISACA official artefacts

| Artefact | Type | What it does | Assessment capability? | Status |
|----------|------|--------------|------------------------|--------|
| **COBIT 2019 Tool Kit** (free ZIP: overview, exec summary, FAQ, objectives/practices/activities `.xlsx`, RACI matrix) | `.zip` + PDFs + `.xlsx` | Reference material; the objectives/practices/activities file is a **flat data dump** (sheets `Objectives`, `Objectives-Practices`, `Activities`); the `Management-Awareness-Diagnostic.xls` is a self-diagnostic, not a 0–5 calculator | **No** | `[VER-P]` (ZIP downloaded, contents verified 2026-10-13) |
| **COBIT 2019 Design Guide Tool Kit** (a.k.a. Governance System Design Toolkit; paid) | `.xlsx` (27 sheets) | Weights the 40 objectives by **10 of the 11 design factors** (DF11 Enterprise Size deliberately excluded) via automatic `SUMPRODUCT`/`MROUND` formulas → prioritised design (initial/refined/concluded scopes); target capability levels are set **manually**; **single-assessment** (no history) | **No** — design/prioritisation only; rigid, protected formulas and expert-panel mapping values (criticised in Utomo et al. 2022; Amore et al. 2023) | `[VER-P]` (workbook downloaded, formulas/sheets verified) |
| COBIT 2019 Implementation Guide / I&M / G&M Objectives | Books | Describe the framework, CPM constructs, **1,202 activities / 231 practices / 40 objectives / 5 domains** | Guidance only, no computational instrument | `[VER-P]` |
| *Introducing COBIT 2019: Major Differences with COBIT 5* | PDF (in free kit) | States the PAM/ISO-33000 model was **replaced** by a CMMI-inspired model; no separate PAM publication is provided | n/a | `[VER-P]` |
| COBIT 5 PAM, Assessor Guide | Books | COBIT 5 process assessment (ISO/IEC 15504) | COBIT **5** only; superseded | `[VER-P]` |

**Central finding (upgraded):** ISACA's only official *digital, computational* artefact is a **design/prioritisation** tool that (a) does **not** compute 0–5 capability/maturity, (b) is single-assessment (no history/versioning), and (c) uses protected formulas whose scores even ISACA says are directional. **There is no official assessment engine — verified at the artifact level this session.** `[VER-P]`

### 5.2 Commercial GRC / IT-assurance platforms (re-verified this session)

| Platform | COBIT 2019 native? | Implements COBIT **CPM** (0–5)? | Evidence mgmt | Reporting / history | Key limitation | Status |
|----------|--------------------|-------------------------------|---------------|--------------------|----------------|--------|
| Hyperproof | COBIT template + crosswalking (180+ frameworks) | **No evidence** (control status) | Yes | Yes / partial | Control-status model | `[VER-S]` |
| ServiceNow GRC | via ISACA content pack (community thread cites **COBIT 5**) | **No evidence** | Yes | Yes / Yes | Version ambiguity | `[VER-S]` |
| Archer IRM | none found on official page | **No evidence** | Yes | Yes / Yes | Control/risk model | `[VER-S]` |
| MetricStream | third-party only | **No evidence** | unconfirmed | Yes / unconfirmed | — | `[2ND-UNV]` |
| ZenGRC (RiskOptics) | dedicated COBIT page | **No evidence** | Yes | Yes / unconfirmed | Version unconfirmed | `[VER-S]` |
| Diligent (HighBond) | none found | **No evidence** | Yes | Yes / Yes | Control/risk model | `[VER-S]` |
| SAP GRC (Pathlock) | none found | **No evidence** | Yes | Yes / unconfirmed | Page blocked — **not absence** | `[2ND-UNV]` |
| LogicGate / OneTrust | none found | **No evidence** | Yes | Yes / unconfirmed | Control/risk model | `[VER-S]` |
| Complyance | not in framework list | **No evidence** | Yes | Yes / unconfirmed | COBIT in blog only | `[VER-S]` |
| Drata / Secureframe | no native COBIT (Secureframe: only inside C5) | **No evidence** | Yes | Yes / unconfirmed | Compliance, not COBIT | `[VER-S]` |
| Vanta / Optro(AuditBoard) / Wolters Kluwer TeamMate | — | — | — | — | **Blocked/404 — could not verify, NOT absence** | `[2ND-UNV]` |
| CMMI Cybermaturity Platform (ISACA/CMMI) | COBIT not the model | **CMMI maturity** (0–5), not COBIT CPM | Yes | Yes / Yes | Scores CMMI cybermaturity | `[VER-S]` |

**Pattern (verified):** commercial GRC tools use **control-status or risk scoring** (SATISFIED/PARTIAL/GAP, inherent/residual risk). **None verifiably implements COBIT 2019 CPM capability levels (0–5).** Where COBIT content exists it is a licensed pack or a crosswalk, usually for an unconfirmed version. `[VER-S]`

### 5.3 Dedicated COBIT tools & open source

| Tool | Type | Capability calc? | Notes | Status |
|------|------|------------------|-------|--------|
| ITS Governance | Service+platform | Claimed, formula undocumented | — | `[2ND-UNV]` |
| Complyance | SaaS | Not confirmed | Monitoring model | `[2ND-UNV]` |
| Dynaflow | Commercial | Not confirmed | Control library (>1,200 controls) | `[2ND-UNV]` |
| ControlWeave | Open source (AGPL-3.0) | Not confirmed (NIST/ISO model) | Evidence versioning (SHA-256) — closest analogue | `[2ND-UNV]` |
| A-COBIT-2019-Risk-Assessment | Open source (GPL-3.0) | No (risk assessment) | — | `[2ND-UNV]` |
| evaluador-ti | Open source | Maturity scoring (COBIT/ITIL) | Unmaintained | `[2ND-UNV]` |
| CMMI Cybermaturity Platform | ISACA/CMMI commercial | Yes — but **COBIT 5**, cyber-scoped | — | `[2ND-UNV]` |

### 5.4 Academic prototypes (re-verified at repository/DOI level)

| Study | Year | Venue/Inst. | COBIT | Dev method | Scoring | Evaluation | Evidence mgmt | Status |
|-------|------|-------------|-------|-----------|---------|-----------|---------------|--------|
| **Mandiangan, S. S.** | 2023 | S1 thesis, UPN Veteran Jakarta ([repository](http://repository.upnvj.ac.id/28558/)) | 2019 | Agile Scrum (4 sprints), PHP/Bootstrap/MySQL | **Skala Guttman + NPLF** status | Black-box UAT (all pages pass) | No | `[VER-S]` — **closest prior art** |
| **Abdullah, Putra & Kartika** | 2023 | J. Sistem Informasi & Ilmu Komputer, DOI 10.59581/jusiik-widyakarya.v1i4.1319 | 2019 | SCRUM, Laravel | not exposed in abstract | UAT | No | `[VER-S]` |
| **Anwar & Harits** | 2025 | J. Informatika Utama 3(1), DOI 10.55903/jitu.v3i1.271 | 2019 | RAD, PHP/Java/MySQL | Capability score + graph | not in abstract | No | `[VER-S]` |
| **Noor, M. S.** | 2021 | Thesis, ITTP ([repository](http://repository.ittelkom-pwt.ac.id/6445/)) | 2019 (**BAI only**) | Prototyping | capability assessment | Black-box | No | `[VER-S]` |
| **Pamuji, Putra & Wahdiniwaty** | 2022 | J. TK3TI, DOI 10.34010/jtk3ti.v8i2.8131 | 2019 + ISO/IEC 15504-2 | assessment model | capability level | audit application | No | `[VER-S]` |
| **Kurniawan et al.** | 2025 | INTI Nusa Mandiri, DOI 10.33480/inti.v19i2.6389 | **COBIT 5** (EDM) | integrated audit system | **still manual** | 20 respondents | No | `[VER-S]` |
| **Indrawati, Rozas & Wahyudi** | 2023 | Edu Komputika, DOI 10.15294/edukomputika.v10i1.59761 | 2019 | R&D instrument | maturity instrument | R&D validation | No | `[VER-S]` |
| ~~Cobvapps (UB)~~ | — | — | — | — | — | — | — | **`[NF]` — not found; likely misattributed. Remove from drafts.** |

**Consequence for novelty (important):** web-based COBIT 2019 assessment tools **already exist** (Mandiangan 2023; Abdullah et al. 2023; Anwar & Harits 2025; Noor 2021). The thesis therefore **cannot** claim novelty in *kind*. The defensible novelty must be in **one of**:
- the **scoring model** (Mandiangan itself lists its limited parameters and suggests a Likert scale as future work → an explicit, documented CPM aggregation rule is a real improvement);
- **process coverage / design-factor-driven prioritisation** (Noor = single domain; Kurniawan = COBIT 5);
- **evidence traceability** (absent in all surveyed prototypes);
- **evaluation rigour** (prior art = black-box/UAT only; add reference-calculation + expert review + SUS);
- **domain context**.

### 5.5 What exists vs. what the thesis contributes

| Capability | Commercial GRC | ISACA official | Dedicated COBIT | Open source | Academic | **This thesis** |
|------------|:--:|:--:|:--:|:--:|:--:|:--:|
| COBIT 2019 content | ✔ | ✔ (design) | ✔ | partial | ✔ | ✔ (subset) |
| Official capability **instrument** | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ (not official — must say so) |
| Automated CPM calculation | ✘ | ✘ | unverified | ✘ | partial | ✔ |
| **Transparent/inspectable** scoring | ✘ | n/a | unverified | ✘ | ✘ | ✔ |
| **Evidence-to-rating traceability** | partial | ✘ | unverified | partial | ✘ | ✔ |
| Assessment **management** (history/comparison/report) | partial | ✘ | unverified | partial | ✘ | ✔ (design goal) |

### 5.6 Focus-C gap table

| Element | Claim | Evidence | Status |
|---------|-------|----------|--------|
| C1 | Official tool = design only | ISACA 2020 | `[VER-P]` |
| C2 | Commercial GRC ≠ capability assessment | Draft matrix | `[2ND-UNV]` |
| C3 | No open-source COBIT 2019 CPM engine found | Draft matrix | `[2ND-UNV]` |
| C4 | Academic prototypes lack transparent/documented scoring | Mandiangan uses Guttman+NPLF (documented *in the thesis*, not in the tool); Capability calc is not plainly inspectable in the others | `[VER-S]` |
| C5 | No prototype links scoring to **evidence** or manages **multi-assessment** | Verified across #1–#8 | `[VER-S]` — the pivotal row |
| C6 | Web-based COBIT 2019 assessment tools are novel | **False** — several exist | `[VER-S]` — **do not claim** |

> **Rule for the thesis:** never write "no tool exists." Write *"no tool with [feature] was found in the sources surveyed on 2026-10-13 (see Table X)."*
>
> **Rule for novelty:** do not claim "first web-based COBIT 2019 assessment system." Claim the **specific** differentiator (transparent CPM aggregation + evidence traceability + assessment management + stronger evaluation).

---

## 6. Focus D — Assessment Management as an IS Concern

### 6.1 Why this is an Information Systems problem (not a feature list)

An assessment is not a one-off calculation; it is an **information artefact with a lifecycle**. The IS concerns are:

| IS concern | Question the system must answer |
|-----------|--------------------------------|
| **Identity & scope** | Which organisation, which period, which objectives, which target levels? |
| **Multi-assessment** | Can the same organisation be assessed repeatedly (year/unit/department)? |
| **History** | What was rated before, by whom, on what evidence, when? |
| **Comparison** | Is capability improving or regressing between periods/units? |
| **Traceability** | For each rating, *which* evidence supports it, and can a third party reproduce it? |
| **Reporting** | Can the result be communicated to non-experts (management), reproducibly? |

This is exactly the "data → information → audit conclusion" chain that audit standards govern: the IIA *Global Internal Audit Standards* (2024) organise Domain V (*Performing Internal Audit Services*; Principles 13/14/15 = Plan Engagements Effectively / Conduct Engagement Work / Communicate Engagement Results and Monitor Action Plans), and **Standard 14.6 "Engagement Documentation"** (verified from the official IIA text) governs documenting the engagement. ISACA's **ITAF Standard 1205 "Evidence"** (4th ed., 2020) requires that *"IT audit and assurance practitioners shall obtain sufficient and appropriate evidence to draw reasonable conclusions."* `[VER-P]` (both verified this session; cite ITAF/IIA by edition).

ISACA itself names the missing layer: the 2021 Journal article says the maturity model must culminate in *"a tool that allows an assessment of the organisation and creates the proper reporting in a language that top-level management can understand."* `[VER-P]`

### 6.2 Requirement classes (IS framing)

| Class | Requirement | Anchor |
|-------|-------------|--------|
| Assessment identity | assessment ID, org, unit, period, assessor, target levels | CPM step 2–3 |
| Rating capture | per activity (and per level), with comment + reason for N.A. | CPM step 5 |
| **Traceability** | each rating ↔ ≥0 evidence items; evidence has source/type/date/status | CPM step 4–5 (`[VER-P]` ISACA: "traceability must be maintained") |
| Scoring transparency | the method and its parameters are visible in the UI and the export | Gap under B (§4.2) |
| Multi-assessment & history | compare assessments over time/units | IS concern (§6.1) |
| Reporting | export (PDF/print) with method, assumptions, gaps | ISACA step 6 |
| Reproducibility | re-running the same data yields the same result, with the method recorded | IIA 2024 documentation principle |

### 6.3 Prototype honesty check

- Current state: **client-side SPA, no persistence** — `05-PRD` line 78.
- Benchmark dataset: **synthetic** — `src/data/benchmarkData.ts`.
- Therefore "multi-assessment / history / comparison" is currently a **design goal**, not an implemented capability. The thesis must either implement a minimal persistence + version/snapshot mechanism, **or** scope it as a design principle and evaluate it conceptually. Do not claim more than is built.

### 6.4 Focus-D gap table

| Element | Claim | Evidence | Status |
|---------|-------|----------|--------|
| D1 | CPM requires evidence traceability | ISACA 2019 | `[VER-P]` |
| D2 | Evidence must be definable per activity | ISACA Journal 2021 | `[VER-P]` |
| D3 | Audit documentation must be reproducible | IIA 2024 (principle); exact number `[NF]` | `[VER-P]`/`[NF]` |
| D4 | Tool should produce management-language reporting | ISACA Journal 2021 | `[VER-P]` |
| D5 | Existing tools lack the management layer | Draft matrix | `[2ND-UNV]` |
| D6 | Prototype implements multi-assessment/history | Repo | `[VER-P]` (repo) | **Not yet** |

---

## 7. Focus E — AI / RAG: Include, Simple, or Omit?

### 7.1 Recommendation

> **OPTIONAL-SIMPLE (fallback: OMIT).** A single direct LLM call that drafts a recommendation from the computed gap, always labelled *"AI-generated draft — assessor review required"*. **No RAG pipeline. No retrieval metrics. No AI in the title, RQs, or method chapter.** `[OWN]`

Decision rule to state in the thesis: *AI is included only if it adds demonstrable value at low methodological cost; it must not be on the critical path of any research question.*

### 7.2 Why the RAG framing is now a liability

The existing `01-literature-review.md` is heavily RAG-weighted. Three problems surfaced when sampling its claims:

| # | Claim in draft | Finding | Action |
|---|----------------|---------|--------|
| E1 | "Eulerich et al. (2023), *Contemporary Accounting Research* (n=internal audit functions)" with barrier stats 45.9% / 34.1% / 46.5% | The CAR 2023 Eulerich et al. paper located is *"The Impact of Audit Technology on Audit Task Outcomes: Evidence for Technology-Based Audit Techniques"*, **40(2), 981–1012, DOI 10.1111/1911-3846.12847** — it does **not** match the described adoption-barrier study | `[2ND-UNV]` — locate the true source or delete the stats |
| E2 | "KPMG 2025 SOX Survey: controls in scope more than doubled in 2 years; 16 hours per control" | The KPMG survey exists, but the reported figure is **in-scope *systems* 17 → 40** (≈2.3×) and avg program cost **$2.3M**; automated controls **21% (FY22) → 17% (FY24)**. "16 hours/control" not found | Correct "controls" → "systems"; drop the 16-hr figure unless sourced |
| E3 | RAG claims: "93.6% validate on isolated academic data" (Karakurt 2026); "NETBankAudit 2025: 1,378 evaluations" | Karakurt & Akbulut (2026) **is real** (Appl. Sci. 16(1), 368, DOI 10.3390/app16010368) but the 93.6% figure was not confirmed; NETBankAudit not found | `[2ND-UNV]` both |

The pattern (`[OWN]`): the RAG layer imported a **large, partly unverifiable** body of claims that are *not needed* to defend the assessment gap. Under examiner scrutiny this is the most fragile part of the draft — while the COBIT/CPM/evidence argument is the strongest.

### 7.3 If AI is kept, the minimal safe design

```text
gap result (objective, current vs target, evidence count)
   → templated prompt + COBIT practice context (short, cited)
     → single LLM API call
       → draft text in an editable field
         → label: "AI-generated draft — assessor review required"
```

No vector store, no embeddings, no retrieval evaluation. Value is demonstrable in a demo; risk is contained.

### 7.4 Focus-E gap table

| Element | Claim | Evidence | Status |
|---------|-------|----------|--------|
| E1 | RAG is required for COBIT assessment | No source requires it | `[OWN]` | **Rejected** |
| E2 | AI improves recommendation quality | Not established in draft | `[2ND-UNV]` | Unproven |
| E3 | AI adds demo value at low cost | Reasonable | `[OWN]` | Keep as optional |
| E4 | RAG-literature claims are solid | 3 source problems | `[2ND-UNV]` | **Trim** |

---

## 8. Focus F — DSRM Methodology and Evaluation Plan

### 8.1 Methodology (verified references)

**Peffers, Tuunanen, Rothenberger & Chatterjee (2007)**, *A Design Science Research Methodology for Information Systems Research*, JMIS 24(3), 45–77, DOI **10.2753/MIS0742-1222240302**. `[VER-P]`

Six activities: (1) problem identification & motivation; (2) definition of solution objectives; (3) design & development; (4) demonstration; (5) evaluation; (6) communication.
Four entry points: problem-centred; objective-centred; design/development-centred; client/context-initiated. `[VER-P]`

Supporting: **Hevner et al. (2004)**, MISQ 28(1), **75–105**, DOI **10.2307/25148625** — the IS-research framework + **seven guidelines** + **five evaluation-method categories** (Table 2): Observational, Analytical, Experimental, **Testing → Functional (Black-Box)**, Descriptive. `[VER-P]` *(Note: the "three-cycle view" is **not** from 2004 — it is Hevner (2007), SJIS 19(2), Art. 4. Do not mis-attribute it.)*

**Contribution framing — Gregor & Hevner (2013)**, MISQ 37(2), 337–355, DOI **10.25300/MISQ/2013/37.2.01** `[VER-P]`. 2×2 knowledge-contribution framework: Invention / **Improvement** / **Exaptation** / Routine Design. Because web COBIT 2019 assessment tools already exist (§5.4), this thesis should frame its contribution as **Improvement** (a better artefact for a known problem) or **Exaptation** (a known method applied in a new context) — **not** Invention. `[OWN]`

### 8.2 Evaluation framework

**Venable, Pries-Heje & Baskerville (2016)**, *FEDS*, EJIS 25(1), 77–89, DOI **10.1057/ejis.2014.36**. `[VER-P]`
Dimensions: formative/summative × artificial/naturalistic. Strategies: Quick&Simple; Human Risk & Effectiveness; Technical Risk & Efficacy; Purely Technical Artefact.

**Recommended hybrid for this thesis:** *Technical Risk & Efficacy* (artificial — reference-calculation tests of the scoring engine) **+** *Human Risk & Effectiveness* (naturalistic — expert review and SUS). `[OWN]`

### 8.3 Evaluation plan (what each method proves — and does not)

| Method | What it proves | What it does **not** prove | Reference |
|--------|----------------|----------------------------|-----------|
| **Black-box functional testing** | Observable outputs conform to expected outputs for chosen inputs; defects discovered | Absence of defects; correctness of untested paths | Hevner et al. 2004 Table 2 (`[VER-P]`); ISO/IEC/IEEE 29119-4:2021, DOI 10.1109/IEEESTD.2021.9591574 |
| **Reference-calculation validation** (test oracle) | The engine reproduces an independently derived expected result | That the *method itself* is valid | Barr et al. 2015, DOI 10.1109/TSE.2014.2372785 (`[VER-P]`) |
| **Expert review / content validity** | Domain experts judge the COBIT mapping and scoring model as appropriate | Statistical accuracy | Lynn 1986 (I-CVI), DOI 10.1097/00006199-198611000-00017; Polit & Beck 2006, DOI 10.1002/nur.20147 (`[VER-P]`) |
| **SUS** | *Perceived* usability (ordinal comparison) | Correctness or functionality | Brooke 1996, DOI 10.1201/9781498710411-35; Lewis 2018, DOI 10.1080/10447318.2018.1455307; Fiandhika & Kelana 2024, DOI 10.1051/e3sconf/202448303008 (`[VER-P]`) |

**SUS practicals:** 10 items; positive items (1,3,5,7,9) score = (position − 1); negative items (2,4,6,8,10) = (5 − position); sum × 2.5 → 0–100. Acceptability (Bangor et al. 2008): <50 not acceptable, 50–70 marginal, >70 acceptable; benchmark ≈ 71. Adjective scale (Bangor et al. 2009). Missing item → midpoint (3). `[VER-P]` for items/scoring; `[VER-S]` for bands.

**Sample size & reporting (the part students get wrong):** there is **no universal minimum** for SUS, but the *precision of the mean* is poor at small N. Recommend **N ≥ 20–30** respondents and always report a **confidence interval** (SUS SD ≈ 17.7–21; at n=20 the 90% margin ≈ ±8 points). Label the study *summative, naturalistic* per FEDS. `[VER-S]`

**Expert review — scope caution:** Aiken's V (Aiken 1985, DOI 10.1177/0013164485451012) and the CVI family (Lawshe 1975, DOI 10.1111/j.1744-6570.1975.tb01393.x; Polit & Beck 2006, DOI 10.1002/nur.20147) validate the **questionnaire/instrument**, **not the software**. Do not write "the system has a content-validity index of 0.89" — that is a category error. Validate the instrument with experts; evaluate the system by testing / reference comparison / usability. `[VER-P]` + `[OWN]`

**Inter-rater agreement (if two assessors score the same cases):** Cohen's κ (Cohen 1960, DOI 10.1177/001316446002000104) with Landis & Koch (1977, DOI 10.2307/2529310) bands (<0 poor · 0–0.20 slight · 0.21–0.40 fair · 0.41–0.60 moderate · 0.61–0.80 substantial · 0.81–1.00 almost perfect). Use **weighted kappa / ICC** for the ordinal 0–5 levels; use **Fleiss' κ** for >2 raters. `[VER-P]`

### 8.4 The credibility problem in "comparison with manual / vs Excel"

`02-system-design-research.md` §EV and `05-PRD` line 471 claim the test script verifies "akurasi matematis vs Excel". **There is no ISACA assessment workbook** to compare against (the official artefact is a *design* tool). Therefore the "reference" must be one of:

1. **Recommended:** an **independently derived reference calculation** — compute expected level results by hand/independent script from the *documented CPM rules* (the F/L/P/N bands + the chosen gate), store inputs+outputs as a fixture, and assert equality (a golden/reference test). Document the derivation.
2. **Acceptable, if labelled:** the **PANRB course workbook** as *"a comparison workbook, not an official ISACA benchmark"* — which the PRD already says (lines 43, 429).
3. **Not acceptable:** calling any of these "matching the ISACA Excel 100%."

**Precedent exists and should be cited.** System-vs-manual reference comparison is an established validation pattern in Indonesian IS research — e.g., a 2026 palm-oil reporting app compared system output against manual Excel over 177 data points (paired test + regression); a credit-scoring SPK reported 97.78% agreement with manual calculation. `[VER-S]` For ordinal capability levels, prefer **Wilcoxon signed-rank** or **ICC** over a paired *t*-test.

**Honesty requirement:** if the engine re-implements the same formula you also applied by hand, the comparison proves **implementation equivalence (verification)**, not that the COBIT result is *correct* in a business sense. Say exactly that. `[OWN]` This is the difference between a defensible S1 evaluation and an overclaim.

### 8.5 Focus-F gap table

| Element | Claim | Evidence | Status |
|---------|-------|----------|--------|
| F1 | DSRM is the right method for a design artefact | Peffers 2007 | `[VER-P]` |
| F2 | Evaluation must be designed, not ad hoc | FEDS | `[VER-P]` |
| F3 | Black-box + SUS + expert review is a valid bundle | Hevner 2004; precedents | `[VER-P]` |
| F4 | SUS measures usability, not correctness | Lewis 2018; Fiandhika 2024 | `[VER-P]` |
| F5 | Reference-calculation must be an independent oracle | Barr 2015 | `[VER-P]` |
| F6 | Current "vs Excel" claim is credible | Repo | `[VER-P]` | **No — must be reframed** |

---

## 9. Gap Tables, Corrections Register, and Bab 1 Scaffold

### 9.1 Consolidated gap table (the defensible gap)

| ID | Gap element | Evidence anchor | Status | Role in thesis |
|----|-------------|-----------------|--------|----------------|
| G1 | No official COBIT 2019 PAM / assessment instrument | ISACA Journal 2021 (`[VER-P]`) | Solid | Problem statement |
| G2 | Official digital artefact is design-only | ISACA Industry News 2020 (`[VER-P]`) | Solid | Problem statement |
| G3 | CPM aggregation is **undefined by ISACA** | ISACA Journal 2021 (`[VER-P]`) | Solid | **Design contribution** |
| G4 | CPM ratings require **evidence traceability** | ISACA 2019 (`[VER-P]`) | Solid | **Design contribution** |
| G5 | Assessment is a lifecycle artefact (multi/history/compare/report) | IS concern; ISACA reporting (`[OWN]`/`[VER-P]`) | Solid | **IS contribution** |
| G6 | Commercial GRC lacks capability computation | Draft matrix (`[2ND-UNV]`) | Needs re-verify | Existing-system gap |
| G7 | Academic prototypes lack transparent scoring + evidence | Draft matrix (`[2ND-UNV]`) | Needs re-verify | Existing-system gap |
| G8 | "Excel → web" per se | — | Rejected | **Not a gap** |

**One-sentence gap statement (for the thesis):**
> *COBIT 2019 provides a rating scale and a capability-level construct but **no official assessment instrument, no mandated aggregation formula, and no evidence-traceable assessment-management tool**; existing GRC products map controls and academic prototypes move the spreadsheet online without documented scoring or evidence linkage. This thesis designs and evaluates a web-based system that makes the CPM scoring explicit and inspectable and links every rating to audit evidence.*

### 9.2 Corrections register (claims to fix before submission)

| # | Location | Issue | Action | Priority |
|---|----------|-------|--------|----------|
| 1 | `01-lit-review.md` §3.4 | Capability names mis-stated as framework-verified | Replace with the six characteristics; label one-word names `[2ND-UNV]` | High |
| 2 | `01-lit-review.md` §3.5 | "all activities receive F" | Correct to "all **L or F**" | High |
| 3 | `01-lit-review.md` §3.5 | "ISO/IEC 33000-based" | Attribute to COBIT 2019 I&M (from ISO/IEC 33004:2015) | Medium |
| 4 | `01-lit-review.md` §3.6 | "Almeida 2019" | → Souza Neto, Almeida & Mira da Silva (2019), ISACA Industry News (proposal) | High |
| 5 | `02-...` §EV / `05-PRD` 471 / `engine.test.ts` | "100% match vs Excel" | Reframe as reference-calculation/regression test; delete "Excel match" | **Critical** |
| 6 | `01-lit-review.md` line 10 | Eulerich 2023 CAR stats | Verify or delete | High |
| 7 | `01-lit-review.md` line 40 | KPMG "controls doubled / 16 hrs" | Correct to systems 17→40; drop 16-hr | Medium |
| 8 | `01-lit-review.md` §3.7 | JKU / NETBankAudit / 93.6% | `[2ND-UNV]`; verify or delete | Medium |
| 9 | `landing`/`benchmarkData.ts` framing | Synthetic data implied as benchmark | Label "synthetic demo data" | High |
| 10 | `latar-belakang.md` ¶1 | Indonesian regulation as direct justification | Keep as **context**, not justification for the COBIT tool | High |
| 11 | Whole draft | RAG centrality | Demote to optional future work | High |
| 12 | Title/RQ | "Capability Level" vs "Maturity Level" | Keep "Capability Level" (per process) — correct | — |
| 13 | `02-system-design-research.md` §2.5 | "Cobvapps (UB)" row | **Not found; likely misattributed** — remove unless a primary record is produced | High |
| 14 | Draft novelty claims | Implied "first web COBIT 2019 tool" | Web COBIT 2019 tools already exist (Mandiangan 2023; Abdullah 2023; Anwar & Harits 2025; Noor 2021) — claim **Improvement/Exaptation** only | **Critical** |
| 15 | DSRM chapter | If it cites "Hevner et al. 2004" for the three-cycle view or page range 75–106 | Correct to Hevner (2007), SJIS 19(2); pages **75–105** | Medium |
| 16 | Evaluation plan | If it claims "expert validation proves the software works" | Experts validate the **instrument**, not the software | High |
| 17 | Evaluation plan | SUS sample size / reporting | Use N ≥ 20–30 and report a confidence interval | Medium |
| 18 | `02-...` §2.5 / `03-decision-log` §3.4 | Mandiangan characterised as "cuma mindahin Excel ke web, rumus tidak transparan" | It uses a **documented** Guttman+NPLF method (in the thesis); soften to "scoring not inspectable *within the tool* / limited parameters (author-acknowledged)" | High |
| 19 | `04-regulasi-...md` line 12 | *"Tidak ada satu pun regulasi Indonesia yang menyebut 'COBIT'"* | **FALSE as written.** COBIT is *named* (as an optional best practice, not a mandate) in POJK 38/2016 (Penjelasan I. umum), SEOJK 21/2017 (Lampiran §5.2, §7.6.1), PermenPANRB 5/2018 (revoked), and PermenPANRB 59/2020 (Lampiran). Correct to: **no** Indonesian regulation **mandates** COBIT; it appears only as an optional best-practice reference, chiefly in revoked instruments | High |
| 20 | `04-...` §1.2 / this report's earlier note | Perpres 132/2022 treated as an amendment to Perpres 95/2018 | **Not an amendment.** Perpres 132/2022 = *Arsitektur SPBE Nasional* — a separate Perpres issued under Pasal 9(4)/74 of Perpres 95/2018 | Medium |
| 21 | `04-...` §1.4 | PermenPANRB 59/2020 cited as the current SPBE-evaluation instrument | **Revoked** by **PermenPANRB No. 8/2026** (*Evaluasi Kinerja Pemerintah Digital*; current index = *Indeks Pemerintah Digital*, ~20 indicators). Cite 8/2026 for current law; 59/2020 (47 indicators, 1–5 maturity) historically only | **High (currency)** |
| 22 | `04-...` §1.3 | Permenkominfo 16/2022 *Audit TIK* definition quoted with "standar dan praktik-praktik terbaik" | That phrase is the **Lampiran's definition of "kriteria"**, not the Pasal 1 definition of *Audit TIK* ("kriteria dan/atau standar yang telah ditetapkan"). Separate the two quotes | Medium |
| 23 | `04-...` §1.6.3 | "SEOJK 21/2017 cites ISO & SNI and **does not** mention COBIT" | **Wrong at document level** — only §1.7(b) says ISO/SNI; §5.2 and §7.6.1 **do** name COBIT/ITIL/IEC | Medium |
| 24 | `04-...` §2.2.2 | Sebatik reference dated 2025 | It is **Akbar & Saputra (2023), *Sebatik* 27(2): 589–605**, DOI 10.46984/sebatik.v27i2.2336 | Low |
| 25 | `01-...`/`02-...`/dashboard | "Design Guide Tool Kit" described as an assessment tool or the reference for the "vs Excel" claim | The Design Toolkit is a **design/prioritisation** workbook (10/11 design factors, protected formulas, no 0–5 computation, single-assessment) — it cannot be the oracle for capability results | **Critical** |

### 9.3 Recommended `latar-belakang.md` structure (Bab 1)

| ¶ | Move | Point to make | Cite |
|---|------|---------------|------|
| 1 | IT governance need | IT value/risk/resource management require governance | ISACA 2019 |
| 2 | COBIT 2019 as reference | 40 objectives, 5 domains, design factors, CPM (0–5), F/L/P/N | ISACA 2019/2020 |
| 3 | **The instrument gap** | No PAM for COBIT 2019; official toolkit is design-only; **no mandated aggregation** | ISACA Journal 2021; ISACA Industry News 2020 |
| 4 | **The evidence problem** | Ratings must be evidence-based and traceable; evidence is scattered; third parties must be able to reproduce | ISACA 2019 (traceability); IIA 2024 (documentation) |
| 5 | **The management problem** | Assessment is repeated over time/units; results must be compared and reported to management | ISACA Journal 2021 |
| 6 | Existing tools | GRC maps controls; prototypes move Excel without transparency/evidence | §5 of this report |
| 7 | Research response | DSRM + explicit scoring + evidence traceability + evaluation | Peffers 2007; FEDS |
| 8 | *Optional* Indonesian context | PP 71/2019 Pasal 22 audit-trail **obligation** + Permenkominfo 16/2022 Audit-TIK **definition** as *context*, **not** justification. Never claim regulation mandates COBIT; cite current law (**PermenPANRB 8/2026**, not 59/2020) | `[VER-P]` PP 71/2019 Pasal 22(1); Permenkominfo 16/2022 Pasal 1(2); §9.5 |

**Do not** write: "SPBE evaluation requires COBIT 2019." SPBE evaluation uses PermenPANRB indicators; COBIT is a voluntary reference. (`[OWN]` — consistent with `04-regulasi-indonesia-cobit.md` claims, which still need verification of current status.)

### 9.4 Title & RQ recommendations

- **Keep** the title (it names an artefact + a differentiator).
- Consider tightening the third RQ from "usability" to include **correctness/traceability validation**, e.g.: *"Bagaimana validitas perhitungan CPM dan keterlacakan evidensi sistem dinilai melalui pengujian black-box, validasi terhadap perhitungan referensi independen, expert review, dan SUS?"*
- **Remove** any RQ that implies AI/RAG.

---

### 9.5 Indonesian regulation — verified facts and the correct use (access 2026-10-13)

> Verified against JDIH BPK / peraturan.go.id official PDFs, including full-text keyword checks ("COBIT" occurrences). This section exists so the thesis neither over-claims nor under-claims the regulatory angle.

| # | Instrument | Status | Names "COBIT"? | Correct use in the thesis |
|---|-----------|--------|----------------|--------------------------|
| R1 | **PP 71/2019** (PSTE) | In force | **No** | Pasal 22(1) verbatim: "*Penyelenggara Sistem Elektronik **wajib menyediakan rekam jejak audit** terhadap seluruh kegiatan penyelenggaraan Sistem Elektronik.*" → motivation for **evidence traceability**, not for COBIT |
| R2 | **Perpres 95/2018** (SPBE) | In force | **No** (0 occurrences) | Pasal 1(2) defines Tata Kelola SPBE as "pengaturan, pengarahan, dan pengendalian" (structural analogue of COBIT's EDM); Pasal 3(c) puts **Audit TIK** in scope; Pasal 55(5) delegates Audit-TIK policy to a ministerial regulation |
| R3 | **Perpres 132/2022** | In force | **No** | *Arsitektur SPBE Nasional* — a **separate** Perpres (legal basis Pasal 9(4)/74 of Perpres 95/2018), **not** an amendment to it |
| R4 | **Permenkominfo 16/2022** | In force | **No** ("standar dan praktik-praktik terbaik" only, in the Lampiran's definition of *kriteria*) | Pasal 1(2) defines *Audit TIK* as "*proses yang sistematis untuk memperoleh dan mengevaluasi **bukti secara objektif** … menetapkan **tingkat kesesuaian** … dengan kriteria dan/atau standar*" → motivation for **evidence-based capability measurement** against criteria |
| R5 | **PermenPANRB 59/2020** | **Revoked** by **PermenPANRB 8/2026** | **Yes** (Lampiran, one maturity model among several) | SPBE evaluation = 4 domains / 8 aspects / **47 indicators** / maturity 1–5; **not** COBIT. Cite only historically |
| R6 | **PermenPANRB 8/2026** (*Evaluasi Kinerja Pemerintah Digital*) | In force; revoked R5 | **No** | **Current** instrument (~20 indicators); "Indeks SPBE" renamed "Indeks Pemerintah Digital" |
| R7 | **Pedoman MenPANRB 3/2024** | In force | **No** | Technical guide for SPBE evaluation; still the 47-indicator instrument per 59/2020 |
| R8 | **POJK 38/2016** · **SEOJK 21/2017** · **PermenPANRB 5/2018** | **Revoked** | **Yes** (as an example, non-mandatory) | Evidence that COBIT is *recognised* in Indonesia — but only as one best-practice option, in revoked instruments |
| R9 | **POJK 11/POJK.03/2022** | In force | **No** | Pasal 2(2) lists 7 factors that **resemble** COBIT Design Factors but are **not labelled** COBIT; Pasal 54(4) requires annual internal IT audit |

**Correct statements (write these):**
- "No Indonesian regulation **mandates** COBIT (any version); where COBIT appears it is one optional best practice among ISO/SNI/ITIL, mostly in revoked instruments." `[VER-P]`
- "SPBE evaluation uses **PermenPANRB** indicators and its own 1–5 maturity scale — **not** COBIT processes; COBIT is a voluntary, deeper self-assessment complement." `[VER-P]`
- "PP 71/2019 Pasal 22 and Permenkominfo 16/2022 establish the **obligations** (audit trail; evaluate objective evidence against criteria) but provide **no measurement instrument** — that instrument gap is the thesis's *context*, not its justification." `[VER-P]`

**Wrong statements (do not write):**
- ✗ "No Indonesian regulation mentions COBIT." *(false — see R5, R8)*
- ✗ "Perpres 132/2022 amended Perpres 95/2018." *(false — see R3)*
- ✗ "SPBE evaluation uses COBIT 2019." *(false — see R5/R6)*
- ✗ "COBIT 2019 is required because of [regulation]." *(no such requirement exists)*
- ✗ "PermenPANRB 59/2020 is the current SPBE instrument." *(revoked by PermenPANRB 8/2026)*
- ✗ "The PERMENPANRB course workbook defines the N/P/L/F method." *(`[NF]` — no such official workbook was found; the method's origin is ISO/IEC 15504→33020 / COBIT PAM)*

---

## 10. Final Source List

> Access date **2026-10-13** for all URLs. Labels: `[VER-P]` primary verified this session; `[VER-S]` secondary verified; `[2ND-UNV]` unverified; `[NF]` not found.

### 10.1 ISACA — official / published

1. ISACA. *COBIT 2019 Framework: Introduction and Methodology* (ISBN 978-1-60420-763-7; §6.3, §6.4.1–6.4.3, pp. 38–39: CPM, CMMI alignment, "no PAM", rating scale, focus-area maturity); *Governance and Management Objectives* (ISBN 978-1-60420-764-4; §3.4, p. 20: "*a process reaches a certain capability level as soon as all activities of that level are performed successfully*"); *Design Guide* (ISBN 978-1-60420-765-1; Ch. 6: the toolkit); *Implementation Guide* (ISBN 978-1-60420-766-8). 2018/2019. https://www.isaca.org/resources/cobit — `[VER-P]` (specific clauses; text read from publicly available PDF copies of the books — cite via the ISACA store/ISBN, not the mirror)
2. Dhulipalla, L. R. S. (2019, 16 Sep). *Using COBIT 2019 Performance Management Model to Assess Governance and Management Objectives*. ISACA COBIT Focus. https://www.isaca.org/resources/news-and-trends/newsletters/cobit-focus/2019/using-cobit-2019-performance-management-model-to-assess-governance-and-management-objectives (archive: `web.archive.org/web/20200804121432/…`) — `[VER-P]`
3. Elue, E. (2020). *Effective Capability and Maturity Assessment Using COBIT 2019*. ISACA Industry News. https://www.isaca.org/resources/news-and-trends/industry-news/2020/effective-capability-and-maturity-assessment-using-cobit-2019 — `[VER-P]`
4. Souza Neto, J., Almeida, R., & Mira da Silva, M. (2019, 18 Mar). *Defining Target Capability Levels in COBIT 2019: A Proposal for Refinement*. ISACA Industry News. https://www.isaca.org/resources/news-and-trends/industry-news/2019/defining-target-capability-levels-in-cobit-2019-a-proposal-for-refinement — `[VER-P]`
5. Harisaiprasad, K. (2020, 27 Apr). *COBIT 2019 and COBIT 5 Comparison*. ISACA Industry News. https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-2019-and-cobit-5-comparison — `[VER-P]`
6. Gorgona, L. (2021, 28 Dec). *Building a Maturity Model for COBIT 2019 Based on CMMI*. ISACA Journal, 6. https://www.isaca.org/resources/isaca-journal/issues/2021/volume-6/building-a-maturity-model-for-cobit-2019-based-on-cmmi — `[VER-P]`
7. ISACA. (2019). *COBIT Design Factors*. Industry News. https://www.isaca.org/resources/news-and-trends/industry-news/2019/cobit-design-factors — `[VER-P]` (prior session)
8. ISACA. (2020). *COBIT Tool Kit Enhancements*. Industry News. https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-tool-kit-enhancements — `[VER-P]` (prior session)
9. ISACA. (2022). *Getting Creative with Maturity Models and COBIT 2019*. ISACA Now Blog. https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2022/getting-creative-with-maturity-models-and-cobit-2019 — `[VER-P]` (prior session)

### 10.2 ISO/IEC — standards

10. ISO/IEC 33020:2015 / 33020:2019 — *Process measurement framework for assessment of process capability*. https://www.iso.org/standard/78526.html — §5.2 level names (0 Incomplete · 1 Performed · 2 Managed · 3 Established · 4 Predictable · 5 Innovating) and §5.3 rating bands (N 0–≤15%; P >15–≤50%; L >50–≤85%; F >85–≤100%) `[VER-P]` (preview); §5.6 staged rule (lower levels Fully, level claimed Largely) via the 2015 model reproduced in Automotive SPICE PAM 3.1, Table 16 `[VER-S]`
11. ISO/IEC 33004:2015 — *Requirements for process reference, process assessment and maturity models*. https://www.iso.org/standard/54178.html — `[VER-S]`
12. ISO/IEC/IEEE 29119-1:2022; 29119-2:2021; 29119-3:2021; 29119-4:2021 (DOI 10.1109/IEEESTD.2021.9591574) — `[VER-P]`

### 10.3 Audit standards & evidence

13. IIA. (2024). *Global Internal Audit Standards* (Domain V — Performing Internal Audit Services; **Standard 14.6 "Engagement Documentation"**; Principles 13/14/15). https://www.theiia.org/en/standards/2024-standards/ — `[VER-P]` (exact numbering verified from official text, 2026-10-13)
14. ISACA. *ITAF™: A Professional Practices Framework for IT Audit*, **4th edition (2020)** — **Standard 1205 "Evidence"** (1205.1: "…shall obtain sufficient and appropriate evidence to draw reasonable conclusions."); 1200-series = 1201 Risk Assessment in Planning · 1202 Audit Scheduling · 1203 Engagement Planning · 1204 Performance and Supervision · **1205 Evidence** · 1206 Using the Work of Other Experts · 1207 Irregularities and Illegal Acts. — `[VER-P]` (verified from the official ITAF 4th-edition document, 2026-10-13). *Note: a 5th edition exists (2026); state the edition when citing.*
15. ISACA. (2013). *COBIT Assessor Guide: Using COBIT 5*. — cited by ISACA 2019 article — `[VER-S]`

### 10.4 DSRM & design-science evaluation

16. Peffers, K., Tuunanen, T., Rothenberger, M. A., & Chatterjee, S. (2007). JMIS 24(3), 45–77. DOI 10.2753/MIS0742-1222240302 — `[VER-P]`
17. Hevner, A. R., March, S. T., Park, J., & Ram, S. (2004). MISQ 28(1), 75–105. DOI 10.2307/25148625 — `[VER-P]`
18. Gregor, S., & Hevner, A. R. (2013). MISQ 37(2), 337–355. DOI 10.25300/MISQ/2013/37.2.01 — `[VER-P]`
19. Hevner, A. R. (2007). *A Three Cycle View of DSR*. SJIS 19(2). https://aisel.aisnet.org/sjis/vol19/iss2/4/ — `[VER-P]`
20. Venable, J., Pries-Heje, J., & Baskerville, R. (2016). FEDS. EJIS 25(1), 77–89. DOI 10.1057/ejis.2014.36 — `[VER-P]`
21. Barr, E. T., et al. (2015). *The Oracle Problem in Software Testing*. IEEE TSE 41(5), 507–525. DOI 10.1109/TSE.2014.2372785 — `[VER-P]`

### 10.5 Usability & validity

22. Brooke, J. (1996). SUS. DOI 10.1201/9781498710411-35 — `[VER-P]`
23. Bangor, A., Kortum, P. T., & Miller, J. T. (2008). IJHCI 24(6), 574–594. DOI 10.1080/10447310802205776 — `[VER-P]`
24. Bangor, A., Kortum, P., & Miller, J. (2009). *Determining What Individual SUS Scores Mean*. JUS 4(3), 114–123 — `[VER-S]`
25. Lewis, J. R. (2018). IJHCI 34(7), 577–590. DOI 10.1080/10447318.2018.1455307 — `[VER-P]`
26. Fiandhika, M. F., & Kelana, B. (2024). E3S Web Conf. 483, 03008. DOI 10.1051/e3sconf/202448303008 — `[VER-P]`
27. Lynn, M. R. (1986). DOI 10.1097/00006199-198611000-00017; Polit & Beck (2006). DOI 10.1002/nur.20147 — `[VER-P]`

### 10.6 Tools & software (re-verify `[2ND-UNV]` rows)

28. ISACA **COBIT 2019 Design Guide Tool Kit** — `[VER-P]` design/prioritisation only (ZIP `isaca.org/-/media/files/isacadp/feature/downloads/c/cobit-2019-design-toolkit_tkt_eng_0222.zip`; single `.xlsx`; DF1–DF10 implemented, DF11 excluded; protected `SUMPRODUCT` formulas; no 0–5 computation; single-assessment). **Free "COBIT 2019 Tool Kit"** (ZIP `…/isaca/resources/cobit-2019-toolkit.zip`; reference-only; includes *Introducing COBIT 2019: Major Differences with COBIT 5* — the official "no PAM" statement). Critiques: **Utomo et al. (2022)**, CommIT J. 16(2):129–141, DOI 10.21512/commit.v16i2.8172 ("rigid … protected formula"); **Amore et al. (2023)**, KnE Soc. Sci., DOI 10.18502/kss.v8i1.12636 ("limited prescriptive power").
29. ServiceNow IRM/GRC; RSA Archer; MetricStream; SAP GRC; OneTrust; LogicGate; Diligent HighBond; Hyperproof; Wolters Kluwer TeamMate; Thomson Reuters ONESOURCE — vendor pages — `[2ND-UNV]`
30. ControlWeave; A-COBIT-2019-Risk-Assessment; evaluador-ti — repositories — `[2ND-UNV]`
31. CMMI Cybermaturity Platform — `[2ND-UNV]`

### 10.7 Academic prototypes & Indonesian studies — re-verified at DOI level (§5.4); per-paper scoring details still `[2ND-UNV]`

32. Mandiangan (2023), UPN Veteran Jakarta (repo 28558) — `[VER-S]`; Abdullah, Putra & Kartika (2023), DOI 10.59581/jusiik-widyakarya.v1i4.1319 — `[VER-S]`; Anwar & Harits (2025), DOI 10.55903/jitu.v3i1.271 — `[VER-S]`; Noor (2021), ITTP Purwokerto (repo 6445) — `[VER-S]`; Pamuji et al. (2022), DOI 10.34010/jtk3ti.v8i2.8131 — `[VER-S]`; Kurniawan et al. (2025), DOI 10.33480/inti.v19i2.6389 (COBIT 5) — `[VER-S]`; Indrawati et al. (2023), DOI 10.15294/edukomputika.v10i1.59761 — `[VER-S]`. **Removed from novelty discussion:** "Cobvapps (UB)" (`[NF]` — not found; likely misattributed).
32b. **Per-level-% + ">85% to continue" gate precedents** (defensible operationalisation of the prototype's rule): Marcela & Fianty (2023), *Indonesian Journal of Computer Science* 12(4):1763–1766, DOI 10.33022/ijcs.v12i4.3353 — `[VER-P]`; Simatupang & Fianty (2023), *G-Tech* 7(4), DOI 10.33379/gtech.v7i4.3141 — `[VER-P]`. Both reproduce the ISO/IEC 33020 bands verbatim and stop the assessment when a level "does not reach 85%".
32c. **Indonesian adoption proxies** (see `04-regulasi-...`): Akbar & Saputra (2023), *Sebatik* 27(2):589–605, DOI 10.46984/sebatik.v27i2.2336 — `[VER-P]` (year corrected from 2025); Sari, Ginardi & Indrawanti (2023), *J. Teknik ITS* 12(1):A9–A14, DOI 10.12962/j23373539.v12i1.100436 — `[VER-P]`; Afrianda, Wirani & Sucahyo (2024), *IJCS* 13(4), DOI 10.33022/ijcs.v13i4.4145 — `[VER-P]` (primary abstract says "13 processes … below maturity level 3"; the "Level 0" detail is secondary — flag it); Irzavika & Mahda (2024), *ICIMCIS* pp. 692–696, DOI 10.1109/ICIMCIS63449.2024.10957022 — `[VER-P]`.

### 10.8 AI / RAG (optional section only)

33. Karakurt, E., & Akbulut, A. (2026). Appl. Sci. 16(1), 368. DOI 10.3390/app16010368 — `[VER-S]` (existence); specific figures `[2ND-UNV]`
34. Eulerich, M., Masli, A., Pickerd, J. S., & Wood, D. (2023). CAR 40(2), 981–1012. DOI 10.1111/1911-3846.12847 — `[VER-P]`
35. KPMG. (2025). *SOX Survey* — `[VER-S]` (existence); details via optro.ai `[2ND-UNV]`

### 10.9 Indonesian regulation — **verified 2026-10-13** (supersedes the earlier pending note)

36. **PP No. 71/2019** (PSTE) — Pasal 22(1) verbatim audit-trail obligation; Pasal 103(2) revokes PP 82/2012. `[VER-P]` https://peraturan.bpk.go.id/Details/122030/pp-no-71-tahun-2019 (PDF full-text checked: "COBIT" = 0)
37. **Perpres No. 95/2018** (SPBE) — Pasal 1(2), Pasal 3(c) (Audit TIK), Pasal 55(5). "COBIT" = 0. `[VER-P]` https://peraturan.bpk.go.id/Details/96913/perpres-no-95-tahun-2018
38. **Perpres No. 132/2022** — *Arsitektur SPBE Nasional*; **not** an amendment to 95/2018. `[VER-P]` https://peraturan.bpk.go.id/Details/233483/perpres-no-132-tahun-2022
39. **Permenkominfo No. 16/2022** (Audit TIK) — Pasal 1(2) definition; "standar dan praktik-praktik terbaik" is from the Lampiran's definition of "kriteria". "COBIT" = 0. `[VER-P]` https://peraturan.bpk.go.id/Details/255601/permenkominfo-no-16-tahun-2022
40. **PermenPANRB No. 59/2020** — SPBE evaluation (4 domains / 8 aspects / 47 indicators / maturity 1–5); **revoked by PermenPANRB No. 8/2026**. `[VER-P]` https://peraturan.bpk.go.id/Details/150381/permen-pan-rb-no-59-tahun-2020 ; https://peraturan.bpk.go.id/Details/351330/permen-panrb-no-8-tahun-2026
41. **Pedoman Menteri PANRB No. 3/2024** — current SPBE-evaluation technical guide. `[VER-P]`
42. **PermenPANRB No. 5/2018** (revoked) · **POJK 38/2016** (revoked) · **SEOJK 21/2017** (revoked) — the only instruments that **name COBIT**, always optionally/referentially. `[VER-P]`

> **Bottom line:** **no** Indonesian regulation *mandates* COBIT; the only explicit COBIT references are optional best-practice mentions, mostly in revoked instruments. This is **context** for the thesis, not the justification for the tool.

---

## Appendix A — Prototype algorithm vs published CPM (one-glance)

| Aspect | ISACA / published | Prototype | Verdict |
|--------|-------------------|-----------|---------|
| Level construct | Capability per process; maturity per focus area | Capability per objective | OK |
| Scale | 0–5 | 0–5 subjective, base 1 | OK |
| Rating granularity | F/L/P/N **per activity per level**, judgment + evidence | Yes/Partial/No per activity → % → F/L/P/N | Simplified; disclose |
| Thresholds | >85 / 50–85 / 15–50 / <15 | ≤15 / ≤50 / ≤85 / >85 | Match modulo boundaries |
| Aggregation | **Not mandated**; simple avg proposed for early maturity | Simple mean | Permitted-as-proposal; disclose |
| Gate | Published proposal: all activities L or F | mean > 0.85 | **Different**; make configurable |
| N.A. | Judgment ("judgment call") | excluded; all-N.A. → fail | **Risk**; mark insufficient evidence |
| Evidence | Traceability required | evidenceIds field (not enforced) | Gap to close |
| Cases (121) count | 1,202 activities / 231 practices / 40 objectives / 5 domains | subset | Scope-limited |

## Appendix B — Open items (status as of 2026-10-13)

| # | Item | Status |
|---|------|--------|
| 1 | Re-verify every `[2ND-UNV]` tool/prototype row from the primary paper/vendor page | ✅ **Mostly done** — academic prototypes re-verified at DOI/repository level (§5.4, §10.7). ⏳ **Still open:** commercial GRC rows (§5.2) — Vanta/AuditBoard/TeamMate pages were blocked; re-verify before the thesis lists them |
| 2 | Verify IIA 14.6 and ITAF 1205 exact numbering/title | ✅ **Done** (2026-10-13): IIA 14.6 = *Engagement Documentation*; ITAF 4th ed. 1205 = *Evidence* (§6.1, §10.3) |
| 3 | Verify Indonesian regulation status | ✅ **Done** (§9.5, §10.9): no mandate for COBIT; PermenPANRB 8/2026 revoked 59/2020; Perpres 132/2022 is not an amendment |
| 4 | Decide + document the **gate rule** (all-L-or-F vs aggregate >85% vs ISO staged) | ⏳ **Open** — §4.3 recommends offering two gates; thesis must pick and label the choice as an *adaptation* |
| 5 | Replace the "vs Excel" framing with a reference-calculation fixture | 🟡 **Partly done (2026-10-13)** — the "vs Excel" framing is replaced in `02` §5.4, `05` line 471, `03` §5, and the test banner is relabelled; the **independent reference fixture itself** still has to be built (`06` §8.3) |
| 6 | Decide the seeded COBIT subset (objectives/activities) and its licensing | ⏳ **Open** — ISACA content is copyrighted; a small seeded subset + attribute must be decided and documented |
| 7 | Decide whether minimal persistence + history/comparison is **built** or **design-only** | ⏳ **Open** — the promised assessment-management contribution (Focus D) needs either an implemented snapshot/persistence layer or an explicit design-only scope |
| 8 | Verify ITAF edition and IIA edition to cite | ✅ **Done** — cite ITAF 4th ed. (2020; a 5th ed. exists in 2026), IIA 2024 Standards |
| 9 | Reconcile `04-regulasi-indonesia-cobit.md` against §9.2 rows 19–24 | ✅ **Done (2026-10-13)** — a 6-item correction banner at the top of `04` now covers rows 19–24 (incl. §9.2 #23, SEOJK 21/2017 §5.2/§7.6.1 naming COBIT) |
| 10 | Apply the §9.2 register rows 1–8, 13, 18 to `01`/`02`/`03`/`05` | ✅ **Done (2026-10-13)** — capability names, all-L-or-F gate, attribution, Almeida→Souza Neto, Eulerich/KPMG, Mandiangan, Cobvapps removal, `[2ND-UNV]` flags all applied |
