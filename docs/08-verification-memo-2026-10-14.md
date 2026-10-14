# Verification Memo — Independent Check of the AI Answers (Grok) and the Research Gap Report

> **Date:** 2026-10-14
> **Checked:** the external claims in `06-deep-research-research-gap.md` and the AI (Grok) answers built on it.
> **Method:** every load-bearing claim re-checked against a primary/independent source where reachable. Where the web was unavailable, this is stated and **"not found" is never converted into "does not exist."**
> **Evidence labels (same as `06`):** `[VER-P]` primary verified; `[VER-S]` secondary verified; `[2ND-UNV]` secondary unverified; `[NF]` not found; `[OWN]` interpretation.
> **Key meta-caveat:** Grok was given `06` **first**, so wherever Grok agrees with `06` that is *not* independent confirmation. Only the checks recorded below against external sources count.

---

## 1. Verdict summary

| # | Claim | Verdict | Evidence |
|---|-------|---------|----------|
| 1 | "COBIT 2019 has no PAM" | ✅ **Confirmed** | `06` §1 F1 quote reproduced; Gorgona §below |
| 2 | Gorgona, ISACA Journal Vol 6, 2021 | ✅ **Confirmed verbatim** | see §2.1 |
| 3 | N/P/L/F bands (≤15 / ≤50 / ≤85 / >85) | ✅ **Confirmed** | see §2.2 |
| 4 | Design factors = 11 incl. Enterprise Size (DF11) | ✅ **Confirmed** | §2.3 |
| 5 | "Governance System Design Toolkit" = official name | ✅ **Confirmed** | §2.3 |
| 6 | Design Guide Tool Kit is **free** (not paid) | ✅ **Corrected in `06`** | §2.4 |
| 7 | PermenPANRB 8/2026 "Evaluasi Kinerja Pemerintah Digital" | ✅ **Confirmed** | §2.5 |
| 8 | Marcela & Fianty 2023 (DOI 10.33022/ijcs.v12i4.3353) | ✅ **Confirmed exact** | §2.6 |
| 9 | Simatupang & Fianty 2023 (DOI 10.33379/gtech.v7i4.3141) | ✅ **Confirmed exact** | §2.6 |
| 10 | Harisaiprasad / "COBIT Tool Kit Enhancements" (F2) | ✅ **Confirmed** | §2.7 |
| 11 | Souza Neto, Almeida & Mira da Silva (2019) Industry News | ✅ **Confirmed exact** | §2.8 |
| 12 | Elue (2020) "Effective Capability and Maturity Assessment…" | ✅ **Confirmed** | §2.8 |
| 13 | F5 quote *"Fully … remains a judgment call…"* | ✅ **Confirmed verbatim** (in Souza Neto et al. 2019) | §2.8 |
| 14 | Engine behaviour (Yes 1.0 / Part. 0.5 / No 0.0 / N.A. excluded; 3 gates; Insufficient Evidence; oracle test) | ✅ **Confirmed in source** | §2.9 |
| 15 | ISO/IEC 33020:2019 level-5 name = "Innovating" | ⚠️ **Unverified** (paywalled; high-confidence) | §5 |
| 16 | ISO/IEC 33020 §5.2/§5.3 **clause numbers** | ⚠️ **Unverified** | §5 |
| 17 | Dhulipalla (COBIT Focus 2019), Mandiangan (2023) | ⚠️ **Unverified** | §5 |
| 18 | Grok's APO12 worked example | ❌ **Wrong** (fabricated IDs + misattributed activity) | §4.1 |
| 19 | COBIT 7 (Oct 2026) — missed by Grok | 🔴 **New, material** | §6 |

---

## 2. Verified against independent sources

### 2.1 Gorgona — `[VER-P]`
ISACA Journal, **Volume 6, 2021**, Online Exclusive *"Building a Maturity Model for COBIT 2019 Based on CMMI"*, **Luis Gorgona**. All three cited details match **verbatim**:
- *"There is no PAM for COBIT® 2019"*;
- *"a simple average calculation for the activity values can be used … then a weighted average … is recommended"*;
- *"1202 COBIT activities"* → *"the 231 practices, the 40 objectives and the five domains"*.
URL: `https://www.isaca.org/resources/isaca-journal/issues/2021/volume-6/building-a-maturity-model-for-cobit-2019-based-on-cmmi` (accessed 2026-10-14).

### 2.2 N/P/L/F bands — `[VER-P]`
N 0–≤15 %; P >15–≤50 %; L >50–≤85 %; F >85–≤100 %. Independently reproduced in Souza Neto et al. 2019 (§2.8, quoting `ISO/IEC 33004:2015`), and matches `ISO_33020_THRESHOLDS` in `src/utils/cpmEngine.ts`.

### 2.3 Design factors / toolkit name — `[VER-S]`
11 factors with **11 = Enterprise Size**; official artifact name **"COBIT 2019 Governance System Design Toolkit"**.

### 2.4 Design Guide Tool Kit is **free** — `[VER-P]` (download) 
`COBIT-2019-Design-Toolkit_tkt_eng_0222.zip` is served **directly, without authentication**, from ISACA's media server (`HTTP 206`, `application/x-zip-compressed`, `Content-Disposition: attachment`). `06` §5.1 previously labelled it *"paid"*; that label was **corrected to "free"** (see §3).

### 2.5 Indonesian regulation — `[VER-S]`
**PermenPANRB 8/2026** (*Evaluasi Kinerja Pemerintah Digital*) exists; it revokes **PermenPANRB 59/2020** (SPBE) and moves to its own *Indeks Pemerintah Digital*. Consistent with `06` §9.5 / F11.

### 2.6 Fianty-group DOIs — `[VER-P]`
- `10.33022/ijcs.v12i4.3353` = *"Performance Evaluation IT Governance on Universities: COBIT 2019 Approach with Measurement Capability Levels"*, **Elisabet Dela Marcela & Melissa Indah Fianty**, *Indonesian Journal of Computer Science*, 2023-08-30.
- `10.33379/gtech.v7i4.3141` = *"Assessment of Capability Levels and Improvement Recommendations Using COBIT 2019 for the IT Consulting Industry"*, **Saul Carlos Immanuel Simatupang & Melissa Indah Fianty**, *G-Tech*, 2023-10-03.
Both read from the Crossref API (2026-10-14).

### 2.7 F2 anchors — `[VER-S]`
**Harisaiprasad Kumaragunta** is a real ISACA author (e.g. blog post *"Addressing Risk Using the New Enterprise Security Risk Management Cycle"*, 2020); *"COBIT Tool Kit Enhancements"* is a real ISACA item dated **4 May 2020**.

### 2.8 Souza Neto et al. 2019 and Elue 2020 — `[VER-P]`
- **"Defining Target Capability Levels in COBIT 2019: A Proposal for Refinement"** by *Joao Souza Neto, Ph.D., CRISC, CGEIT; Rafael Almeida; Miguel Mira da Silva, Ph.D.*, **ISACA Industry News, 18 March 2019** — title, authors, venue, date and URL all **exactly as cited** in `06` §10.1 #4. It states the gate verbatim: *"If all level 2 activities in every practice have been rated L or F … If any … have been rated N or P … a capability level of 1 should be the target"* — i.e. the *all-L-or-F* proposal; it also contains the **F5** quote (*"Fully … remains a judgment call, but it can be substantiated by the examination or assessment of the components of the enabler"*) and the **25/50/75** target-capability mapping from *Design Guide* §7.2.4.1.
- **"Effective Capability and Maturity Assessment Using COBIT 2019"** by **Emeka Elue, CISA, CDPSE**, ISACA Industry News, **2020** — confirmed as **Elue's** article (not Souza Neto's). It also documents the *separate* CMMI maturity ladder (*Initial … Optimizing*) used for **focus-area maturity**, matching `06` §4.4.

> Note: the authors also have a *different* article — *"A COBIT 5 PAM Update Compliant With ISO/IEC 330xx Family"* (ISACA Journal) — which is **not** the one cited by the thesis. No conflict.

### 2.9 Prototype engine — `[VER-P]` (source read)
`src/utils/cpmEngine.ts`: score map `Yes=1.0 / Partially=0.5 / No=0.0 / N.A.=excluded`; `insufficientEvidence` → status **"Insufficient Evidence"**; gates `aggregate-85` (default) / `all-l-or-f` / `iso-staged` all computed and `currentLevelByGate` exposed. `src/utils/__tests__/referenceCalculation.test.ts` is a hand-derived oracle with the banner *"(hand-derived oracle; NOT an external benchmark)"* — the earlier "GROUND TRUTH / 100 % vs Excel" framing is gone.

---

## 3. Changes applied to the repository (2026-10-14)

| File | Change | Reason |
|------|--------|--------|
| `06-deep-research-research-gap.md` §5.1 | Design Guide Tool Kit *"paid"* → **"free — public ISACA media download, no authentication"** | Verified fetch; resolves internal contradiction with §2.4/§10.6 |
| `06-…` §10.6 #28 | added *"free"* qualifier | consistency |
| `06-…` Appendix B | new row **#11 — COBIT 7 (external change)** | §6 below |
| `latar-belakang.md` #12 | corrected the reference (see §4.2) + added **#12b Elue (2020)** | title/author mismatch |
| `03-thesis-decision-log.md` §10 | new **"External Change Watch — COBIT 7"** section | §6 below |

---

## 4. Corrections to the *AI answer* (not the report)

### 4.1 Grok's APO12 worked example is wrong — `[VER-P]`
The activity text *"Define a balanced set of project proposals designed to reduce risk and/or projects that enable strategic enterprise opportunities…"* belongs to practice **APO12.05** (*Define a Risk Management Action Portfolio*), not APO12.01 — confirmed in `src/data/cobitActivities.json`. Grok also invented illustrative activity IDs. **Do not reuse that example verbatim.**

### 4.2 A genuine citation bug found — in `latar-belakang.md`, not in the AI answer
Reference #12 had attached **Elue's title** (*"Effective Capability and Maturity Assessment Using COBIT 2019"*) to **Souza Neto et al.'s** authors. Corrected to Souza Neto et al.'s real title (18 Mar 2019) and Elue (2020) added as #12b. `06`, `07` already carried both correctly.

### 4.3 Retraction
An intermediate draft of this memo suspected the *Souza Neto* citation in `06` was mis-dated/mis-venued. On fetching the article, that suspicion was **wrong** — the `06` citation is accurate (§2.8). Recorded here for transparency.

---

## 5. Open / unverified (do **not** treat as false)

- **ISO/IEC 33020:2019** level-5 name **"Innovating"** and the **§5.2/§5.3** clause numbers: the standard is paywalled (CHF 181). The catalogue page `https://www.iso.org/standard/78526.html` **is** correct (Ed. 2, 2019-11, 42 pp.). The name/ladder is high-confidence and consistent with `01` §3.4; record it as `[VER-S]` until the text is sighted. *(Wikipedia's "Optimizing" is the superseded ISO/IEC 15504 name.)*
- **Dhulipalla** (COBIT Focus, 16 Sep 2019) and **Mandiangan (2023, UPNVJ repo 28558)**: not re-verified this session. `[2ND-UNV]`.
- **Design Guide Tool Kit internals** ("27 sheets", "DF11 excluded", "protected SUMPRODUCT formulas"): `06` marks `[VER-P]` from a prior download; not re-downloaded here.

---

## 6. New external finding — COBIT 7 (material, missed by Grok)

ISACA Store, *"A First Look at COBIT 7"* (webinar **03 Nov 2026**):

> *"A new version of the COBIT® framework, COBIT® 7, will be published in October 2026! Learn about what's new in this version, including the new digital presentation of the framework, **the robust assessment tools**, and supporting guidance."*

Today is **2026-10-14**, so COBIT 7 is imminent/newly released. **Risk:** the thesis's instrument-gap premise ("no official assessment tool") must be **scoped to COBIT 2019**, and COBIT 7 must appear in **limitations / future work**. Added to `06` Appendix B (#11) and `03` §10.

---

## 7. Bottom line

Grok is **substantially correct** on the load-bearing claims — but it restates `06`, so it is not independent corroboration. Of the checkable items, everything material verified except: **(a)** Grok's APO12 worked example (fabricated IDs + misattributed activity), and **(b)** Grok got the toolkit price right where `06` was wrong. `06`'s sourcing is strong; one internal contradiction ("paid") and one reference-list bug (`latar-belakang.md` #12) were found and fixed. The largest outstanding item is **COBIT 7**.
