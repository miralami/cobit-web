# System Design Research: Rancang Bangun Web-Based COBIT 2019 Assessment System

> **Builds on [`01-literature-review.md`](01-literature-review.md).**
> Covers: existing-tools gap, RAG assessment, scope options, DSRM methodology, titles, RQs.

**Date:** 2026-09-30  
**Domain:** SAGE (Software Engineering, Architecture, Governance)  
**Thesis Level:** S1 Information Systems

---

## 1. Executive Conclusion

### 1.1 The Core Finding: A Genuine Gap in Native COBIT 2019 Assessment

The most significant finding from this research is that **ISACA publishes no Process Assessment Model (PAM) for COBIT 2019**. This is stated explicitly by ISACA itself: "There is no PAM for COBIT 2019, but Capability Maturity Model Integration (CMMI) can be used to measure capability levels" (ISACA Journal, 2021). The consequence is profound: every commercial tool that claims "COBIT 2019 support" actually provides only **content mapping** (objectives, practices, controls as reference content), not an **assessment instrument** that implements the official Fully/Largely/Partially/Not rating scale or the 1,202-activity to 231-practice to 40-objective to 5-domain aggregation chain.

This means the student's project occupies a genuinely underserved niche. The commercial market is saturated with GRC platforms that treat COBIT as one framework among dozens, but essentially empty of tools that implement the actual COBIT 2019 Performance Management (CPM) methodology. The academic literature confirms this: existing prototypes (Mandiangan 2023, Anwar and Harits 2025, Noor 2021) are isolated, undocumented in terms of scoring methodology, and none implement the full ISACA rating scale with proper aggregation.

### 1.2 The Rebalance: From RAG-Centric to Assessment-Centric

The previous literature review was too RAG-heavy. This iteration rebalances toward **COBIT 2019 assessment system design and development** as the primary contribution. The research hierarchy is now clear:

```
COBIT 2019 assessment process and requirements
  -> Assessment workflow and evidence management problems
    -> Web-based assessment support system (rancang bangun)
      -> RAG/AI as ONE supporting feature (e.g., recommendations)
```

The student's thesis is about **building a system that implements the COBIT 2019 assessment methodology correctly**, not about advancing RAG techniques. RAG may assist with evidence retrieval or recommendation drafting, but the core contribution is the assessment system itself.

### 1.3 What the Prototype Already Does Well

The existing prototype (8 pages: Dashboard, AssessmentSetup, AssessmentWorkspace, CapabilityResult, GapAnalysis, EvidenceFindings, Recommendations, Landing) already covers the core assessment workflow. The type system (`src/types/index.ts`) correctly models COBIT domains, capability levels (0-5), response ratings (N/P/L/F), evidence, assessments, and gap analysis. This is a solid foundation that maps directly to the COBIT 2019 assessment process.

### 1.4 The Honest Assessment of RAG's Role

After evaluating each potential RAG use case against the criteria of necessity, feasibility, and risk, the conclusion is that **RAG is not necessary for the core assessment system**. Conventional search, filtering, and structured data retrieval can handle evidence-to-practice mapping. RAG may provide marginal value in drafting recommendation text from gap analysis results, but these are **convenience features**, not **core functionality**. The thesis should be positioned as an assessment system that *may* include AI-assisted features, not an AI system that happens to use COBIT.

### 1.5 The Defensible Contribution

The student's defensible contribution is:

1. **A working web-based system that implements the official COBIT 2019 CPM rating scale** (F/L/P/N thresholds) with full aggregation from activity to practice to objective to domain
2. **Transparent scoring methodology** — since ISACA provides no PAM, the system makes its scoring assumptions explicit and configurable
3. **Evidence-to-rating traceability** — every capability rating can be traced back to specific evidence documents
4. **Gap analysis with target vs. current comparison** — visual identification of capability gaps
5. **Assessment reporting** — structured output suitable for audit documentation

This is a **system development contribution** (rancang bangun), not an AI methodology contribution. It fits squarely in the SAGE domain.

### 1.6 Feasibility Assessment

For an S1 Information Systems thesis, this scope is **realistic and achievable**:
- The prototype already exists and works
- The COBIT 2019 framework is publicly documented
- No backend is required (client-side SPA)
- No real organizational data is needed (mock data suffices for development)
- Evaluation can be done via expert review and usability testing

The risk is **scope creep** — trying to implement all 40 objectives, all 1,202 activities, all 11 design factors, and full AI integration. The thesis should focus on a **representative subset** (e.g., 2-3 domains, 10-15 objectives) with the architecture designed for extensibility.

### 1.7 The Competitive Landscape

| Category | Tools | COBIT 2019 Assessment? |
|----------|-------|------------------------|
| Enterprise GRC | ServiceNow, RSA Archer, MetricStream, Diligent, Hyperproof, Optro | No — content mapping only |
| ISACA's own tools | CMMI Cybermaturity Platform | No — COBIT 5, cyber-scoped |
| Dedicated COBIT tools | ITS Governance, Complyance | Claimed but unverified scoring |
| Academic prototypes | Mandiangan 2023, Anwar and Harits 2025, Noor 2021 | Yes but isolated, undocumented |
| Open source | ControlWeave | No — NIST/ISO assessment model |

The student's system would be among the first to **transparently implement and document** the COBIT 2019 CPM methodology in a web-based tool.

### 1.8 Methodology Recommendation

**Design Science Research Methodology (DSRM)** is the most appropriate methodology for this thesis. It fits the "rancang bangun" (system development) paradigm common in Indonesian S1 theses, provides clear evaluation criteria, and allows the student to claim both a **system artifact** and a **design principle** as contributions.

### 1.9 Thesis Positioning

The thesis should be positioned as:

> "Rancang Bangun Sistem Pendukung Assessment Tata Kelola TI Berbasis COBIT 2019 dengan Pendekatan Performance Management"

With RAG/AI mentioned only as a supporting feature in specific chapters, not in the title or primary research questions.

### 1.10 Final Recommendation

**Build the assessment system. Make the scoring methodology transparent. Use RAG only if time permits and it adds clear value. Document everything. Evaluate with experts.**

The contribution is the system and its methodology, not the AI.

---

## 2. Existing Tools Comparison Table

### 2.1 Commercial GRC Platforms

| System | Type | COBIT Version | Evidence Mgmt | Assessment Workflow | Capability Calc | Gap Analysis | Recommendations | AI/GenAI | Collaboration | Reporting | Key Limitation |
|--------|------|---------------|---------------|---------------------|-----------------|--------------|-----------------|----------|---------------|-----------|----------------|
| **Diligent HighBond** | Commercial SaaS | 2019 (content library) | Yes | Compliance mapping only | Not confirmed | Yes | Not confirmed | Not confirmed | Yes | Yes | COBIT is content, not assessment instrument |
| **Optro (ex-AuditBoard)** | Commercial SaaS | Not stated (30+ frameworks) | Yes | Audit workflow | Not confirmed | Yes | Not confirmed | Yes (agentic) | Yes | Yes | COBIT version not published |
| **MetricStream** | Commercial enterprise | Version not stated | Yes | Compliance workflow | Not confirmed | Yes (auto gap) | Yes (AI remediation) | Yes (AI-First) | Yes | Yes | COBIT not in prominent framework list |
| **Hyperproof** | Commercial SaaS | 2019 (confirmed) | Yes | Control testing (Satisfied/Gap/N/A) | Not confirmed | Yes | Not confirmed | Yes (Hyperproof AI) | Yes | Yes | Control-based, not capability-level |
| **ServiceNow GRC** | Commercial platform | DIY (not shipped) | Yes | Custom build | Not confirmed | Custom | Custom | Yes (Now Platform) | Yes | Yes | Customer must build COBIT 2019 from scratch |
| **RSA Archer** | Commercial enterprise | None found | Yes | Custom | Not confirmed | Custom | Custom | Yes (Archer Evolv) | Yes | Yes | No COBIT app-pack found |
| **SAP GRC** | Commercial enterprise | None confirmed | Yes | SoD, access control | Not confirmed | Custom | Custom | Not confirmed | Yes | Yes | No COBIT content pack |
| **Thomson Reuters ONESOURCE** | Commercial suite | None found | Yes | Compliance workflow | Not confirmed | Custom | Custom | Not confirmed | Yes | Yes | No COBIT framework pack |
| **Wolters Kluwer TeamMate** | Commercial suite | Not in library | Yes | Audit test library | Not confirmed | Yes (control mapping) | Not confirmed | Not confirmed | Yes | Yes | COBIT absent from 150+ framework library |

### 2.2 ISACA / CMMI Tools

| System | Type | COBIT Version | Evidence Mgmt | Assessment Workflow | Capability Calc | Gap Analysis | Recommendations | AI/GenAI | Collaboration | Reporting | Key Limitation |
|--------|------|---------------|---------------|---------------------|-----------------|--------------|-----------------|----------|---------------|-----------|----------------|
| **CMMI Cybermaturity Platform** | Commercial (ISACA) | **COBIT 5** (not 2019) | Yes | Risk profile then self-assessment | Yes (practice in place/not in place) | Yes (practice gap reports) | Yes (prioritized roadmap) | Not mentioned | Yes (team assignment) | Yes (maturity vs. target) | COBIT 5 not 2019; cyber-scoped; subscription |
| **COBIT 2019 Tool Kit** | Free Excel | 2019 | No | Manual | Manual | Manual | Manual | No | No | No | Excel only; no automation |

### 2.3 Dedicated COBIT Assessment Tools

| System | Type | COBIT Version | Evidence Mgmt | Assessment Workflow | Capability Calc | Gap Analysis | Recommendations | AI/GenAI | Collaboration | Reporting | Key Limitation |
|--------|------|---------------|---------------|---------------------|-----------------|--------------|-----------------|----------|---------------|-----------|----------------|
| **ITS Governance** | Service + platform | 2019 | Not verified | Questionnaire then scoring | Claimed (method unverified) | Yes | Yes | Not confirmed | Not verified | Yes (dashboards) | Scoring formula undocumented |
| **Complyance** | Commercial SaaS | 2019 | Yes (evidence automation) | Continuous monitoring | Not confirmed | Yes | Yes (AI-assisted) | Yes (AI-assisted reviews) | Yes | Yes | Monitoring model, not maturity assessment |
| **Dynaflow** | Commercial | 2019 (>1200 controls) | No | Review and test cycles | Not confirmed | Not confirmed | Not confirmed | No | No | No | Control library product, not assessment tool |

### 2.4 Open Source Tools

| System | Type | COBIT Version | Evidence Mgmt | Assessment Workflow | Capability Calc | Gap Analysis | Recommendations | AI/GenAI | Collaboration | Reporting | Key Limitation |
|--------|------|---------------|---------------|---------------------|-----------------|--------------|-----------------|----------|---------------|-----------|----------------|
| **ControlWeave** | Open source (AGPL-3.0) | 2019 (among 44 frameworks) | Yes (version history, SHA-256) | Control testing (Satisfied/OTS/N/A) | Not confirmed | Yes (POA and M) | Yes (remediation playbooks) | Yes (optional BYOK) | Yes (RBAC, workpapers) | Yes (dashboard, PDF/CSV) | NIST/ISO model, not COBIT CPM; early stage (5 stars) |
| **A-COBIT-2019-Risk-Assessment** | Open source (GPL-3.0) | 2019 | No | Risk assessment | Not confirmed | Not confirmed | Not confirmed | No | No | CSV export | Risk assessment, not capability assessment |
| **evaluador-ti** | Open source | COBIT/ITIL | No | Maturity questionnaire | Yes (maturity scoring) | Yes | Not confirmed | No | No | Looker Studio dashboards | Unmaintained; limited documentation |

### 2.5 Academic Prototypes

| Study | Year | Method | COBIT Version | Capability Calc | Evidence Mgmt | Gap Analysis | Key Limitation |
|-------|------|--------|---------------|-----------------|---------------|--------------|----------------|
| Mandiangan (UPN Veteran Jakarta) | 2023 | Agile Scrum, web-based | 2019 | Yes (percentage-based) | No | Yes | Replaces Excel; undocumented scoring formula |
| Anwar and Harits (Jurnal Informatika Utama) | 2025 | RAD, PHP/Java/MySQL | 2019 | Yes (capability score) | No | Not confirmed | Questionnaire system; limited documentation |
| Noor (ITTP Purwokerto) | 2021 | Prototyping, black-box | 2019 | Yes (BAI domain) | No | Not confirmed | Single domain; no evidence management |
| Cobvapps (UB) | — | Web app | 2019 | Yes (maturity) | No | Not confirmed | Prototype; limited documentation |
| Pamuji et al. | 2022 | ISO/IEC 15504-2 | 2019 | Yes (audit assessment) | No | Not confirmed | Notes absence of PAM for COBIT 2019 |

### 2.6 Summary: What Exists vs. What is Missing

| Capability | Commercial GRC | ISACA Tools | Dedicated COBIT | Open Source | Academic | **This Project** |
|------------|---------------|-------------|-----------------|-------------|----------|-------------------|
| COBIT 2019 content | Yes (most) | Yes (Excel) | Yes | Yes | Yes | Yes |
| F/L/P/N rating scale | No | No | Unverified | No | Partial | Yes |
| Activity-Practice-Objective aggregation | No | No | Unverified | No | Partial | Yes |
| Evidence-to-rating traceability | Partial | No | Unverified | Partial | No | Yes |
| Gap analysis (current vs. target) | Partial | Yes (CMMI) | Yes | Yes | Yes | Yes |
| Recommendation generation | Partial | Yes (CMMI) | Yes | Yes | No | Yes |
| Transparent scoring methodology | No | No | No | No | No | Yes |
| Web-based, no backend | No | No | No | No | Partial | Yes |
| Open source / free | No | No | No | Yes | No | Yes |

---

## 3. System Requirements (Derived from COBIT 2019)

### 3.1 Core COBIT Assessment Functionality (Must-Have)

| ID | Requirement | COBIT 2019 Source | Prototype Module | Priority |
|----|-------------|-------------------|------------------|----------|
| CR-01 | Assessment project setup (org, period, assessor) | Step 1-3: Awareness, design, briefing | AssessmentSetup | High |
| CR-02 | COBIT domain selection (EDM/APO/BAI/DSS/MEA) | 5 domains, 40 objectives | AssessmentSetup | High |
| CR-03 | Goals Cascade visualization (EG-AG-GM) | 13 EG, 13 AG, 40 G and M | Dashboard | Medium |
| CR-04 | Design Factors configuration | 11 design factors | AssessmentSetup | Medium |
| CR-05 | Practice/activity listing per objective | 231 practices, 1,202 activities | AssessmentWorkspace | High |
| CR-06 | Activity rating (N/P/L/F) with thresholds | CPM: less than 15 percent / 15-50 / 50-85 / above 85 | AssessmentWorkspace | High |
| CR-07 | Capability level calculation (0-5) | CMMI-based levels | CapabilityResult | High |
| CR-08 | Aggregation: activity-practice-objective-domain | 1,202-231-40-5 | CapabilityResult | High |
| CR-09 | Target level setting per objective | Step 6: Reporting | GapAnalysis | High |
| CR-10 | Gap analysis (current vs. target) | Step 6: Strengths/opportunities | GapAnalysis | High |
| CR-11 | Findings documentation | Step 6: Reporting | EvidenceFindings | High |
| CR-12 | Recommendation generation | Step 6: Opportunities | Recommendations | High |
| CR-13 | Assessment report generation | Step 6: Reporting | Dashboard | Medium |

### 3.2 Evidence Management Functionality

| ID | Requirement | COBIT 2019 Source | Prototype Module | Priority |
|----|-------------|-------------------|------------------|----------|
| EV-01 | Evidence upload/import | Step 4: Evidence collection | EvidenceFindings | High |
| EV-02 | Evidence categorization (policy/record/log/interview) | Step 4: Methodologies | EvidenceFindings | High |
| EV-03 | Evidence metadata (date, source, type, status) | Step 4: Validation | EvidenceFindings | High |
| EV-04 | Evidence-to-practice mapping | Step 4-5: Evidence to rating | AssessmentWorkspace | High |
| EV-05 | Evidence validation status (pending/reviewed/attached) | Step 4: Validation | EvidenceFindings | High |
| EV-06 | Evidence search/filter | Step 4: Additional evidence | EvidenceFindings | Medium |
| EV-07 | Evidence sufficiency indicator | Step 4: Sufficient evidence | CapabilityResult | Medium |
| EV-08 | Evidence version control | Inter-context conflict risk | EvidenceFindings | Low |

### 3.3 Supporting Functionality

| ID | Requirement | COBIT 2019 Source | Prototype Module | Priority |
|----|-------------|-------------------|------------------|----------|
| SP-01 | Dashboard with progress visualization | — | Dashboard | High |
| SP-02 | Historical assessment comparison | — | Dashboard | Low |
| SP-03 | User roles (assessor, reviewer, admin) | — | — | Low |
| SP-04 | Collaboration features | — | — | Low |
| SP-05 | Export/reporting (PDF/print) | Step 6: Report | Dashboard | Medium |
| SP-06 | Assessment workflow stages | 6-step process | AssessmentWorkspace | Medium |

### 3.4 AI-Assisted Functionality (Optional)

| ID | Requirement | Problem Solved | RAG Necessary? | Alternative | Priority |
|----|-------------|---------------|----------------|-------------|----------|
| AI-01 | Evidence retrieval/suggestion | Finding relevant evidence for a practice | No | Structured search by practice ID | Low |
| AI-02 | Evidence-practice matching assistance | Mapping evidence to COBIT criteria | No | Manual mapping with tagging | Low |
| AI-03 | Draft recommendation generation | Writing recommendation text from gaps | Maybe | Template-based generation | Medium |
| AI-04 | Evidence summarization | Quick understanding of long documents | No | Abstract/summary field | Low |
| AI-05 | Capability rating suggestion | Suggesting N/P/L/F based on evidence | No | Assessor judgment (mandatory) | Low |

### 3.5 Requirements Traceability Matrix

```
COBIT 2019 6-Step Process          -> Prototype Modules
---------------------------------------------------------
Step 1: Awareness sessions        -> AssessmentSetup (project creation)
Step 2: Tailored governance design -> AssessmentSetup (domain/design factor selection)
Step 3: Process owner briefing     -> AssessmentSetup (stakeholder assignment)
Step 4: Evidence collection        -> EvidenceFindings (evidence management)
Step 5: Activity rating            -> AssessmentWorkspace (N/P/L/F rating)
                                      CapabilityResult (level calculation)
Step 6: Reporting                  -> GapAnalysis, Recommendations, Dashboard
```

---

## 4. RAG Opportunity Analysis

### 4.1 Use Case Evaluation

| Use Case | Problem Solved | RAG Necessary? | Alternative | Risk | Human Validation | S1 Feasibility |
|----------|---------------|----------------|-------------|------|------------------|----------------|
| **Evidence retrieval** | Find evidence relevant to a COBIT practice | **No** — structured search by practice ID, domain, or keyword suffices | SQL/filter query on evidence metadata | Low | Low | High |
| **Evidence-practice matching** | Suggest which evidence maps to which practice | **No** — manual mapping with tagging is more accurate and auditable | Tagging system with practice IDs | Low | Medium | High |
| **Draft recommendation generation** | Auto-write recommendation text from gap analysis | **Maybe** — templates may suffice, but RAG could produce more natural language | Template-based generation with fill-in fields | Medium | High | Medium |
| **Evidence summarization** | Summarize long evidence documents | **No** — assessors need to read full documents for audit reliability | Abstract field or manual summary | High | High | Low |
| **Capability rating suggestion** | Suggest N/P/L/F rating based on evidence | **No** — this is assessor judgment; AI suggestion would undermine audit reliability | Assessor decision with evidence reference | Very High | Mandatory | Low |
| **Missing evidence detection** | Identify what evidence is missing for a practice | **No** — checklist of required evidence types per practice | Structured checklist | Low | Low | High |
| **Cross-assessment learning** | Learn from past assessments to improve current | **No** — historical comparison is straightforward data analysis | Dashboard comparison | Low | Low | Medium |

### 4.2 Where RAG Could Add Value (If Included)

**Only one use case justifies RAG for an S1 thesis: Draft Recommendation Generation (AI-03)**

- **Problem:** Writing clear, actionable recommendation text from gap analysis results is time-consuming
- **RAG value:** Could retrieve similar past recommendations and adapt them to current gaps
- **Input:** Gap analysis results (current level, target level, specific gaps)
- **Output:** Draft recommendation text with references to COBIT practices
- **Risk:** Generated text may not be specific enough; requires heavy human editing
- **Human validation:** Mandatory — all AI-generated recommendations must be reviewed and approved by assessor
- **S1 feasibility:** Medium — requires building a recommendation corpus and RAG pipeline

### 4.3 Where RAG Should NOT Be Used

| Use Case | Why RAG Is Inappropriate |
|----------|------------------------|
| Capability rating (N/P/L/F) | This is professional judgment. AI suggestion undermines audit reliability and ISACA CPM requires assessor decision. |
| Evidence validation | Evidence reliability depends on source, nature, circumstances — not text similarity. |
| Assessment scoring | Scoring must follow deterministic rules (F/L/P/N thresholds), not probabilistic generation. |
| Audit opinion | Legal accountability requires human assessor. |

### 4.4 Minimum Viable RAG Integration (If Pursued)

If the student decides to include RAG as a supporting feature:

1. **Scope:** Recommendation drafting only
2. **Corpus:** COBIT 2019 framework documents + sample recommendation templates
3. **Retrieval:** BM25 + vector search (hybrid)
4. **Generation:** LLM with strict grounding in retrieved COBIT practices
5. **Evaluation:** Faithfulness score + human review by assessor
6. **Fallback:** Template-based generation if RAG confidence is low

### 4.5 Recommendation on RAG

**For an S1 SAGE thesis, RAG is optional and should not be the primary focus.** The core contribution is the assessment system. If included, RAG should be:
- Clearly scoped to one use case (recommendation drafting)
- Positioned as a "supporting feature" or "enhancement"
- Evaluated separately from the core system
- Developed only after the core system is complete

**If the student cannot build a working RAG system, the thesis is still valid without it.**

---

## 5. Research Methodology Comparison

### 5.1 Methodology Options

| Method | Fits "Rancang Bangun"? | Evaluation Approach | Contribution Claim | S1 Fit |
|--------|----------------------|---------------------|-------------------|--------|
| **Design Science Research (DSRM)** | Excellent — designed for system development | Expert review, usability testing, artifact evaluation | System artifact + design principles | Best fit |
| **Prototyping** | Good — iterative build-test-refine | Black-box testing, user feedback | Working system | Good fit |
| **SDLC (Waterfall)** | Partial — too rigid for research | System testing, requirements validation | System implementation | Weak fit |
| **Agile Scrum** | Partial — development method, not research | Sprint reviews, user stories | System implementation | Weak fit |
| **Case Study** | Partial — observation, not building | Interviews, observation | Understanding, not system | Poor fit |
| **Action Research** | Partial — participatory | Cyclical intervention | Change, not system | Poor fit |

### 5.2 Recommended: Design Science Research Methodology (DSRM)

DSRM (Peffers et al., 2007) is the most appropriate because:

1. **It is designed for "rancang bangun"** — the primary goal is to build an artifact (the assessment system)
2. **It has clear evaluation criteria** — the artifact must be evaluated against requirements
3. **It allows dual contribution** — both the system and the design principles
4. **It is widely accepted in IS research** — especially for S1/S2 theses in Indonesian universities
5. **It accommodates iterative development** — build, evaluate, refine cycles

### 5.3 DSRM Process for This Thesis

```
Phase 1: Problem Identification
  -> Literature review (done)
  -> Problem: No transparent, web-based COBIT 2019 assessment tool
  -> Objective: Build a system that implements CPM methodology

Phase 2: Solution Design
  -> Requirements derivation (Section 3)
  -> Architecture design (React 19 + TypeScript SPA)
  -> Scoring methodology design (F/L/P/N + aggregation)

Phase 3: Development
  -> Build prototype (already exists, needs refinement)
  -> Implement scoring engine
  -> Implement evidence management
  -> Implement gap analysis and recommendations

Phase 4: Evaluation
  -> Expert review (COBIT practitioners)
  -> Usability testing (SUS questionnaire)
  -> Black-box testing (functional requirements)
  -> Comparison with manual assessment

Phase 5: Communication
  -> Thesis write-up
  -> Documentation
```

### 5.4 Evaluation Methods

| Evaluation Method | What It Measures | How to Apply | S1 Feasibility |
|-------------------|------------------|--------------|----------------|
| **Expert review** | Correctness of COBIT 2019 implementation | 2-3 COBIT practitioners review scoring and methodology | High |
| **Usability testing (SUS)** | Ease of use | 5-8 assessors use system, fill SUS questionnaire | High |
| **Black-box testing** | Functional correctness | Test all requirements (CR-01 to CR-13) | High |
| **Comparison with manual** | Scoring accuracy | Compare system output with manual Excel assessment | Medium |
| **Inter-rater reliability** | Consistency across assessors | Multiple assessors rate same practices, compare | Medium |

### 5.5 What Can Be Claimed as Contribution

| Contribution Type | Claim | Evidence Required |
|-------------------|-------|-------------------|
| **System artifact** | A working web-based COBIT 2019 assessment system | Working prototype + documentation |
| **Design principle** | Transparent scoring methodology for COBIT 2019 CPM | Published methodology + expert validation |
| **Empirical insight** | Usability and usefulness for assessors | SUS scores + expert feedback |
| **Methodological** | DSRM applied to COBIT assessment | Thesis documentation |

**Cannot claim:**
- "First COBIT 2019 assessment tool" — academic prototypes exist
- "Novel AI technique" — RAG is not the focus
- "Improves audit quality" — no controlled study
- "Replaces assessor judgment" — system is decision-support only

---

## 6. Research Gap (Conservative)

### 6.1 What Existing Tools Do Not Address

| Gap | Evidence | Defensibility |
|-----|----------|---------------|
| **No commercial tool implements F/L/P/N rating scale** | Searched 9 commercial platforms; none document CPM rating | Strong — verified from official sources |
| **No tool documents the 1,202-231-40-5 aggregation** | Only Dynaflow productizes the 1,202 activities as a control library | Strong — verified |
| **No transparent scoring methodology** | ISACA provides no PAM; tools that claim COBIT 2019 do not document scoring | Strong — ISACA states this explicitly |
| **Academic prototypes are isolated and undocumented** | Mandiangan 2023, Anwar and Harits 2025 exist but do not document methodology | Moderate — papers exist but are hard to access |
| **No web-based, open-source COBIT 2019 assessment tool** | ControlWeave is NIST/ISO; no open-source COBIT CPM tool found | Moderate — search may have missed tools |
| **Evidence-to-rating traceability is weak** | Commercial tools have evidence management but do not link to COBIT ratings | Moderate — inferred from tool capabilities |

### 6.2 What the Student's System Adds

| Differentiator | Description | Defensibility |
|----------------|-------------|---------------|
| **Transparent F/L/P/N implementation** | System explicitly implements ISACA published thresholds | Strong — verifiable against ISACA documentation |
| **Full aggregation chain** | Activity-Practice-Objective-Domain with traceability | Strong — can be demonstrated |
| **Evidence-to-rating linkage** | Every rating can be traced to specific evidence | Moderate — depends on implementation quality |
| **Open source and free** | No licensing cost; accessible to students and small organizations | Strong — GitHub repository |
| **Web-based, no backend** | Client-side SPA; no server infrastructure needed | Moderate — technical choice, not unique |
| **Documented methodology** | Thesis documents scoring assumptions and limitations | Strong — thesis is the documentation |

### 6.3 Conservative Gap Statement

> "While COBIT 2019 is widely used for IT governance assessment, ISACA publishes no Process Assessment Model (PAM) for COBIT 2019, and no commercial or open-source tool transparently implements the official Fully/Largely/Partially/Not activity rating scale with full aggregation from activity to domain level. Existing academic prototypes implement partial solutions but do not document their scoring methodology or provide evidence-to-rating traceability. This project addresses this gap by developing a web-based assessment system that transparently implements the COBIT 2019 CPM methodology with full traceability."

---

## 7. Thesis Scope Options with Trade-offs

### Option A: Core Assessment System Only (Recommended)

**Scope:** Build a web-based system that implements COBIT 2019 CPM rating, aggregation, gap analysis, and reporting. No AI.

| Aspect | Evaluation |
|--------|------------|
| Description | Rancang Bangun Sistem Assessment COBIT 2019 dengan CPM |
| Complexity | Medium |
| Research depth | Medium |
| Implementation effort | Medium (prototype exists) |
| Evaluation effort | Medium (expert review + usability) |
| Data requirements | Mock data (sufficient) |
| S1 suitability | **High** — focused, achievable, defensible |
| Risk | Low |
| Contribution | System + methodology |
| **Verdict** | **Best for S1** — clear scope, realistic, defensible |

### Option B: Assessment System + Evidence Management

**Scope:** Option A + full evidence management (upload, categorization, mapping, validation).

| Aspect | Evaluation |
|--------|------------|
| Description | Sistem Assessment + Manajemen Evidensi |
| Complexity | Medium-High |
| Research depth | Medium |
| Implementation effort | High |
| Evaluation effort | Medium-High |
| Data requirements | Mock evidence documents |
| S1 suitability | **Medium-High** — more work but more complete |
| Risk | Medium |
| Contribution | System + methodology + evidence framework |
| **Verdict** | Good if time permits; evidence management adds value |

### Option C: Assessment System + AI-Assisted Recommendations

**Scope:** Option A + RAG-based recommendation drafting.

| Aspect | Evaluation |
|--------|------------|
| Description | Sistem Assessment + Rekomendasi Berbantuan AI |
| Complexity | High |
| Research depth | Medium-High |
| Implementation effort | Very High |
| Evaluation effort | High |
| Data requirements | COBIT docs + recommendation corpus |
| S1 suitability | **Medium** — RAG adds significant complexity |
| Risk | Medium-High |
| Contribution | System + methodology + AI feature |
| **Verdict** | Risky for S1; AI may not work well enough to be valuable |

### Option D: Full Assessment System + Evidence + AI

**Scope:** Everything — assessment, evidence management, gap analysis, recommendations, AI assistance.

| Aspect | Evaluation |
|--------|------------|
| Description | Sistem Komprehensif Assessment + Evidensi + AI |
| Complexity | Very High |
| Research depth | High |
| Implementation effort | Very High |
| Evaluation effort | Very High |
| Data requirements | Full organizational data |
| S1 suitability | **Low** — too large for S1 |
| Risk | High |
| Contribution | Would be impressive but unlikely to complete |
| **Verdict** | **Not recommended** — high risk of incomplete thesis |

### Option E: Assessment System + Historical Comparison

**Scope:** Option A + historical assessment comparison and trend analysis.

| Aspect | Evaluation |
|--------|------------|
| Description | Sistem Assessment + Perbandingan Historis |
| Complexity | Medium |
| Research depth | Medium |
| Implementation effort | Medium |
| Evaluation effort | Medium |
| Data requirements | Multiple assessment periods |
| S1 suitability | **High** — adds value without much complexity |
| Risk | Low |
| Contribution | System + methodology + trend analysis |
| **Verdict** | Good option; historical comparison is straightforward |

### 7.1 Recommendation

**Option A (Core Assessment System Only)** is the recommended scope for an S1 thesis. It provides:
- Clear, bounded scope
- Defensible contribution (system + methodology)
- Realistic timeline
- Low risk
- Foundation for future work (evidence management, AI can be added later)

If the student has time and energy after completing Option A, **Option B (Evidence Management)** or **Option E (Historical Comparison)** can be added as enhancements.

---

## 8. Potential Research Question Sets

### RQ Set 1: Core Assessment System (Option A — Recommended)

**RQ1:** *Bagaimana merancang dan membangun sistem pendukung assessment tata kelola TI berbasis web yang mengimplementasikan metodologi COBIT 2019 Performance Management secara transparan?*

**RQ2:** *Sejauh mana sistem yang dibangun mampu menghasilkan perhitungan capability level (0-5) yang sesuai dengan skala penilaian COBIT 2019 (F/L/P/N) berdasarkan input penilaian aktivitas?*

**RQ3:** *Bagaimana tingkat usability sistem pendukung assessment COBIT 2019 ini menurut perspektif assessor yang menggunakannya?*

### RQ Set 2: Assessment + Evidence Management (Option B)

**RQ1:** *Bagaimana merancang dan membangun sistem assessment tata kelola TI berbasis web dengan manajemen evidensi terintegrasi untuk mendukung proses assessment COBIT 2019?*

**RQ2:** *Sejauh mana sistem yang dibangun mampu memetakan evidensi ke dalam kriteria penilaian COBIT 2019 dan menghasilkan capability level yang traceable?*

**RQ3:** *Bagaimana dampak penggunaan sistem ini terhadap efisiensi dan konsistensi proses assessment COBIT 2019 dibandingkan dengan metode manual?*

### RQ Set 3: Assessment + AI-Assisted Recommendations (Option C)

**RQ1:** *Bagaimana merancang dan membangun sistem pendukung assessment tata kelola TI berbasis web dengan fitur rekomendasi berbantuan AI menggunakan pendekatan Retrieval-Augmented Generation?*

**RQ2:** *Sejauh mana sistem RAG yang diintegrasikan mampu menghasilkan draf rekomendasi yang grounded pada gap analysis COBIT 2019?*

**RQ3:** *Bagaimana dampak penggunaan fitur rekomendasi AI terhadap efisiensi penyusunan rekomendasi perbaikan tata kelola TI?*

### RQ Set 4: Assessment + Historical Comparison (Option E)

**RQ1:** *Bagaimana merancang dan membangun sistem assessment tata kelola TI berbasis web dengan fitur perbandingan historis untuk mendukung evaluasi progres COBIT 2019?*

**RQ2:** *Sejauh mana visualisasi tren capability level antar-periode assessment dapat membantu pemangku kepentingan memahami progres tata kelola TI?*

**RQ3:** *Bagaimana tingkat usability sistem ini menurut perspektif assessor dan manajemen yang menggunakannya untuk evaluasi progres?*

### RQ Set 5: Comprehensive System (Option D — Not Recommended for S1)

**RQ1:** *Bagaimana merancang dan membangun sistem komprehensif assessment tata kelola TI berbasis web yang mengintegrasikan assessment COBIT 2019, manajemen evidensi, dan fitur rekomendasi berbantuan AI?*

**RQ2:** *Sejauh mana sistem komprehensif ini mampu mendukung seluruh proses assessment COBIT 2019 dari pengumpulan evidensi hingga pelaporan?*

**RQ3:** *Bagaimana dampak penggunaan sistem komprehensif ini terhadap efisiensi, kualitas, dan konsistensi proses assessment tata kelola TI?*

---

## 9. Potential Thesis Titles

### Primary Titles (COBIT 2019 Assessment Focus)

1. **Rancang Bangun Sistem Pendukung Assessment Tata Kelola TI Berbasis COBIT 2019 dengan Pendekatan Performance Management**

2. **Rancang Bangun Aplikasi Web Assessment Kapabilitas TI Berbasis COBIT 2019 dengan Skala Penilaian F/L/P/N**

3. **Rancang Bangun Sistem Informasi Assessment COBIT 2019 Berbasis Web dengan Kemampuan Perhitungan Capability Level**

4. **Rancang Bangun Sistem Pendukung Penilaian Tata Kelola TI Berbasis COBIT 2019 dengan Metode Design Science Research**

5. **Rancang Bangun Aplikasi Assessment COBIT 2019 Berbasis Web untuk Mengukur Capability Level Tata Kelola TI**

### Titles with Evidence Management Focus

6. **Rancang Bangun Sistem Assessment COBIT 2019 Berbasis Web dengan Manajemen Evidensi Terintegrasi**

7. **Rancang Bangun Sistem Pendukung Assessment Tata Kelola TI Berbasis COBIT 2019 dengan Traceability Evidensi**

8. **Rancang Bangun Aplikasi Web Assessment COBIT 2019 dengan Kemampuan Pemetaan Evidensi ke Kriteria Penilaian**

### Titles with AI/RAG as Supporting Feature

9. **Rancang Bangun Sistem Assessment COBIT 2019 Berbasis Web dengan Fitur Rekomendasi Berbantuan AI**

10. **Rancang Bangun Sistem Pendukung Assessment Tata Kelola TI Berbasis COBIT 2019 dengan Rekomendasi Menggunakan Retrieval-Augmented Generation**

11. **Rancang Bangun Aplikasi Assessment COBIT 2019 Berbasis Web dengan Dukungan Rekomendasi Berbasis RAG**

### Titles with Historical/Trend Focus

12. **Rancang Bangun Sistem Assessment COBIT 2019 Berbasis Web dengan Analisis Tren Antar-Periode**

13. **Rancang Bangun Sistem Pendukung Evaluasi Progres Tata Kelola TI Berbasis COBIT 2019 dengan Perbandingan Historis**

### Titles with Specific Domain Focus

14. **Rancang Bangun Sistem Assessment COBIT 2019 Berbasis Web (Studi Kasus: Domain APO pada Organisasi X)**

15. **Rancang Bangun Aplikasi Assessment Kapabilitas COBIT 2019 Berbasis Web (Studi Kasus: Domain DSS dan MEA)**

### 9.1 Title Recommendation

**Recommended title (Option A scope):**

> **Rancang Bangun Sistem Pendukung Assessment Tata Kelola TI Berbasis COBIT 2019 dengan Pendekatan Performance Management**

This title:
- Clearly states "Rancang Bangun" (system development)
- Names COBIT 2019 as the framework
- Mentions "Performance Management" (the CPM methodology)
- Does not over-emphasize AI/RAG
- Is specific enough for S1 scope
- Can be adapted with study case or domain focus

---

## 10. Conceptual Positioning Diagram

```
+------------------------------------------------------------------+
|                    RESEARCH HIERARCHY                             |
+------------------------------------------------------------------+
|                                                                  |
|  COBIT 2019 Assessment Process and Requirements                  |
|  (ISACA Official: 6-step process, CPM, F/L/P/N, CL 0-5)          |
|       |                                                          |
|       v                                                          |
|  Assessment Workflow and Evidence Management Problems             |
|  (Traceability, subjectivity, dispersion, information overload)  |
|       |                                                          |
|       v                                                          |
|  Web-Based Assessment Support System (Rancang Bangun)            |
|  (Primary Contribution: System + Methodology)                   |
|       |                                                          |
|       +---> Core: Activity Rating, Capability Calculation        |
|       +---> Core: Gap Analysis, Recommendations                  |
|       +---> Core: Evidence Management, Traceability               |
|       |                                                          |
|       v                                                          |
|  RAG/AI as ONE Supporting Feature                                |
|  (Optional: Recommendation Drafting, Evidence Summarization)     |
|                                                                  |
+------------------------------------------------------------------+

+------------------------------------------------------------------|
|                    THESIS POSITIONING                             |
+------------------------------------------------------------------|
|                                                                  |
|  Domain: SAGE (Software Engineering, Architecture, Governance)   |
|  NOT: DELTA (AI, ML, NLP, Statistics)                            |
|                                                                  |
|  Primary Contribution:                                           |
|    - Web-based COBIT 2019 assessment system                      |
|    - Transparent CPM methodology implementation                  |
|    - Evidence-to-rating traceability                             |
|                                                                  |
|  Secondary Contribution (Optional):                               |
|    - AI-assisted recommendation drafting (RAG)                   |
|    - Usability evaluation with assessors                         |
|                                                                  |
|  NOT:                                                            |
|    - Novel AI technique                                          |
|    - RAG methodology advancement                                 |
|    - Replacement of assessor judgment                            |
|                                                                  |
+------------------------------------------------------------------+

+------------------------------------------------------------------|
|                    SYSTEM ARCHITECTURE                            |
+------------------------------------------------------------------|
|                                                                  |
|  +-------------------+  +-------------------+  +---------------+  |
|  |  AssessmentSetup  |  | AssessmentWorkspace | | CapabilityResult | |
|  |  - Project config |  |  - Activity rating |  |  - CL 0-5 calc |  |
|  |  - Domain select  |  |  - Evidence link   |  |  - Aggregation |  |
|  |  - Design factors |  |  - N/P/L/F input   |  |  - Traceability|  |
|  +-------------------+  +-------------------+  +---------------+  |
|           |                      |                     |          |
|           v                      v                     v          |
|  +-------------------+  +-------------------+  +---------------+  |
|  | EvidenceFindings  |  |   GapAnalysis     |  | Recommendations|  |
|  1  - Upload/import |  1  - Current vs.    |  1  - Gap-based  |  |
|  1  - Categorize    |  1    Target        |  1    generation  |  |
|  1  - Map to practice| 1  - Visualization |  1  - AI-assisted|  |
|  1  - Validate      |  1  - Findings      |  1    (optional) |  |
|  +-------------------+  +-------------------+  +---------------+  |
|           |                      |                     |          |
|           v                      v                     v          |
|  +-------------------------------------------------------------+ |
|  |                      Dashboard                               | |
|  |  - Progress visualization  - Historical comparison          | |
|  |  - Assessment report       - Export/print                   | |
|  +-------------------------------------------------------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Appendix: Key Sources

### ISACA Official
- COBIT 2019 Framework: Introduction and Methodology
- COBIT 2019 Framework: Governance and Management Objectives
- COBIT 2019 Design Guide
- COBIT 2019 Implementation Guide
- ISACA Journal: "Building a Maturity Model for COBIT 2019 Based on CMMI" (2021)
- ISACA Now Blog: "Getting Creative with Maturity Models and COBIT 2019" (2022)

### Commercial Tools
- Diligent HighBond: COBIT 2019 Control Libraries
- Hyperproof: Supported Frameworks (COBIT 2019 confirmed)
- MetricStream: Connected GRC
- ServiceNow GRC Community: COBIT 2019 mapping discussions
- Optro (ex-AuditBoard): Frameworks page
- ControlWeave: GitHub repository (AGPL-3.0)

### Academic
- Mandiangan (2023): Rancang Bangun Sistem Informasi Capability Assessment Tools COBIT 2019
- Anwar and Harits (2025): Perancangan Sistem Kuisioner Penilaian Kapabilitas Framework COBIT 2019
- Noor (2021): Implementasi Sistem Penilaian Kapabilitas Tata Kelola TI Berbasis COBIT 2019
- Pamuji et al. (2022): Using COBIT-19 with ISO/IEC 15504-2
- Mambu et al. (2025): EDM + APO domains assessment

---

*Document generated: 2026-09-30*  
*Based on: Literature review (existing) + Tool landscape research (this session)*
