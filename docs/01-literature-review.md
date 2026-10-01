# Literature Review: COBIT 2019 Assessment with RAG for Evidence-Grounded IT Governance

> **Canonical literature review.** Supersedes `archive/00-initial-literature-review.md`.
> Next step in the chain: [`02-system-design-research.md`](02-system-design-research.md).

## 1. Executive Summary

**10 Most Critical Findings:**

1. **Real-world problems are empirically documented** — Eulerich et al. (2023) in *Contemporary Accounting Research* (n=internal audit functions) quantifies: 45.9% cite "lack of database quality," 34.1% cite "data access issues," 46.5% cite "insufficient competence" as barriers to technology adoption. These directly map to evidence collection, management, and traceability problems. KPMG 2025 SOX Survey shows controls in scope more than doubled in 2 years, averaging 16 hours per control.

2. **COBIT 2019 assessment is evidence-intensive by design** — The official 6-step process (ISACA) requires: (1) stakeholder awareness, (2) tailored governance system design (40 G&M objectives across 5 domains), (3) process owner briefings, (4) **evidence collection using agreed methodologies with validation**, (5) process activity rating (N/P/L/F thresholds: 0-15%/>15-50%/>50-85%/>85-100%), (6) reporting strengths/opportunities. Capability levels 0-5 use CMMI labels. The Goals Cascade translates 13 Enterprise Goals → 13 Alignment Goals → 40 G&M Objectives, influenced by 11 Design Factors.

3. **GenAI adoption in internal audit is real but uneven** — IIA NA Pulse 2025 (n=405 CAEs): **40% currently use GenAI** (up from 15% YoY); 67% plan to increase use. But fieldwork use lags significantly: only 6% use GenAI extensively in fieldwork vs 13% in planning and 11% in reporting. 59% of organizations have not adopted GenAI at all. Big 4 firms have multi-billion AI investments but GenAI in external audit remains in development due to hallucination concerns.

4. **RAG evaluation has standardized benchmarks but human ceiling gap persists** — RAGChecker (NeurIPS 2024) achieves 61.93 Pearson vs human-human 70.09 ceiling (280 double-annotated pairs). Key audit-relevant metrics: Faithfulness, Self-Knowledge (SK - defect metric for parametric memory use), Noise Sensitivity. ARES performs worst in meta-eval (18.63). Even the best automated evaluation framework has an ~8-point gap to human agreement.

5. **Direct COBIT+RAG research is nearly absent** — arXiv API: `abs:"internal audit" AND abs:"retrieval-augmented"` → 0 results; `all:"COBIT" AND all:"large language model"` → 1 result (McIntosh et al. 2024, framework comparison only). The "Hybrid COBIT 2019-RAG" paper exists but in Q4 venue with synthetic queries. This represents a genuine, defensible research gap.

6. **Traceability remains the weakest empirically documented problem** — No N-sized study measures traceability failure rates in internal/IT audit. COBIT 2019 CPM requires traceability between evidence and ratings while rating is explicitly subjective. NIST AU-10(3) Chain of Custody is not in any baseline. Recommendations often detach from raw evidence, making management verification difficult.

7. **Citation laundering and attribution compression are emerging threats** — CiteShade (arXiv 2026) shows wrong-answer rate 0.01→0.68 attributed to trusted sources. Attribution-Compression Frontier: citations score 0.86 precision against summaries but **0.12 against source spans**. These attacks directly target the audit-trail mechanism that audit systems depend on.

8. **Real deployment evidence exists but is narrow** — CTRAG (Big Four POC, 2026): 240 controls/45 documents, F1 78%, recall 85%, ~60% manual effort reduction. IntelliAudit (2026): ISO 27001 control evidence evaluation, multi-agent, human oversight, decision-support framing. Both are single-org, proprietary data, no inter-annotator agreement. Neither uses COBIT 2019.

9. **Evaluation must be adversarial** — RePASs and AIReg-Bench are gameable: AUEB-Archimedes reached RePASs 0.947 by verbatim concatenation (no generation). 4 of 7 compliance benchmarks are lexically degenerate (lexical floor 0.957). CARS (Context-Adherence) metric shows ceiling effect — high scores that hide implicit assumptions not present in evidence.

10. **Governance lags adoption** — IIA Foundation 2024: only 17% org-wide GenAI policy vs 50% implementing. ISACA 2026: 38% comprehensive AI policies, 11% strong ethics attention, 38% confident in board's AI risk understanding. Hallucination risk, non-determinism, data confidentiality, and absence of legal accountability are the top barriers to full AI adoption in audit.

---

## 2. Evidence of the Real-World Problem

### 2.1 Quantified Problems in IT Audit and Evidence Management

| Problem | Evidence/Data | Year | Population | Source | Relevance |
|---------|---------------|------|------------|--------|-----------|
| **P1: Evidence collection — data access** | 34.1% of TBAT users cite "issue with data access" as adoption barrier | 2023 | Internal audit functions (TBAT users vs non-users) | Eulerich et al., *Contemporary Accounting Research* 40(2) | Direct |
| **P2: Evidence management — database quality** | 45.9% of TBAT users cite "lack of database quality" | 2023 | Same as above | Eulerich et al. 2023 | Direct |
| **P3: Document review workload** | SOX controls in scope more than doubled in 2 years; 16 hrs/control average; evidence collection absorbs 50-80% of audit cycle | 2025 | ~150 SOX professionals, FY24 budget-hours N=120 | KPMG 2025 SOX Survey; Avatier 2025 | Strong |
| **P4: Evidence verification** | PCAOB-identified deficiencies positively associated with future misstatements across entire client portfolio | 2025 | PCAOB inspections | Constance (2025), *CAR* | Strong |
| **P5: Evidence→control mapping** | MITRE CRAF: only 21 of 110 NIST 800-171 controls (~19%) have automated mapping coverage; mapping is per-organization manual exercise | 2026 | MITRE CRAF Annex A | MITRE PR-26-00364-2 | Direct |
| **P6: Audit documentation burden** | Deloitte formal SEC comment: QC 1000 "substantially increase compliance costs... without apparent corresponding benefit to audit quality" | 2025 | Big Four firm adversarial testimony | Deloitte SEC comment letter PCAOB-2025-001 | Strong |
| **P7: Traceability** | No empirical study measuring traceability failure rates in internal/IT audit; COBIT CPM requires it while rating is subjective; NIST AU-10(3) not in baseline | — | — | Kotb et al. (2020) meta-review; COBIT 2019 CPM; NIST SP 800-53 Rev.5 | Gap |
| **P8: Finding generation** | Eulerich et al.: +10.8% risk factors, +12.3% recommendations cited as TBAT benefits but net cost-benefit unquantifiable | 2023 | Internal audit functions | Eulerich et al. 2023 | Moderate |
| **P9: Gap analysis** | NETBankAudit: 1,378 COBIT control evaluations across 347 engagements; distribution published (Change Mgmt 11.9%, BCP 8.1%, etc.) | 2025 | 347 engagements, ~170 financial institutions | NETBankAudit 2025 Annual IT Audit Issues | Moderate |
| **P10: Recommendation generation** | Eulerich: supervisory board support gap 16.5% vs 8.8% (TBAT users vs non-users); net cost-benefit unquantifiable | 2023 | Internal audit functions | Eulerich et al. 2023 | Moderate |
| **P11: Reporting burden** | IIA+AuditBoard 2026: 43% cite insufficient time; Vision 2035: advisory 24%→41%, assurance 76%→59% | 2025-2026 | 373 NA IA leaders; 6,506 global survey | IIA+AuditBoard 2026; Vision 2035 | Strong |
| **P12: Data volume/complexity** | Vision 2035: 97% say technology increases data volume/complexity; 70% orgs adopted GRC software but operations gap persists | 2025 | 6,506 global survey | IIA Vision 2035; Hyperproof 2021 | Strong |

### 2.2 Qualitative Friction Points in Assessor Workflow

| Friction Point | Description | Source |
|---------------|-------------|--------|
| **Semantic Ambiguity** | Internal organizational documents use local terminology that does not directly map to COBIT Standard Practices | Laporan Penelitian [cite: 26] |
| **Digital Evidence Dispersion** | Evidence documents scattered across heterogeneous repositories (SharePoint, Jira, Google Drive, local servers) in diverse formats (PDF, DOCX, screenshots) | Laporan Penelitian [cite: 24, 26] |
| **Assessor Subjectivity** | Threshold determination between P vs L often depends on individual auditor perception, not objective quantitative ratios | Laporan Penelitian [cite: 27] |
| **Traceability Breakage** | Audit recommendations often detach from raw evidence, making it difficult for management to verify whether recommendations are based on real gaps or auditor assumptions | Laporan Penelitian [cite: 12, 28] |

### 2.3 Evidence Quality Key
- **Strong**: Peer-reviewed + quantified + relevant population
- **Moderate**: Industry report/whitepaper with disclosed denominator
- **Gap**: Documented absence of measurement

---

## 3. COBIT 2019 Assessment Process

### 3.1 COBIT 2019 Framework Structure

COBIT 2019, published by ISACA, separates governance from management functions. The framework comprises **40 Governance and Management Objectives** across five domains:

| Domain | Count | Focus |
|--------|-------|-------|
| **Evaluate, Direct and Monitor (EDM)** | 5 | Board-level evaluation, strategic direction, performance monitoring |
| **Align, Plan and Organize (APO)** | 14 | Organization, strategy, architecture, portfolio, risk management |
| **Build, Acquire and Implement (BAI)** | 11 | Needs identification, acquisition, construction, integration |
| **Deliver, Service and Support (DSS)** | 6 | Operational service delivery, incident management, data security |
| **Monitor, Evaluate and Assess (MEA)** | 4 | Internal performance evaluation, control monitoring, compliance |

### 3.2 Goals Cascade and Design Factors

The **COBIT Goals Cascade** translates stakeholder priorities into actionable objectives:
1. **Stakeholder Drivers and Needs** →
2. **13 Enterprise Goals (EG)** →
3. **13 Alignment Goals (AG)** →
4. **40 Governance and Management Objectives**

This prioritization is influenced by **11 Design Factors**, including business strategy, risk profile, threat landscape, and compliance requirements.

### 3.3 Official ISACA 6-Step Assessment Process

| Step | Activity | Evidence Requirement |
|------|----------|---------------------|
| **1** | Conduct COBIT 2019 Awareness Sessions With Identified Stakeholders | Stakeholder register, session records |
| **2** | Design Tailored Governance System to Determine Applicable G&M Objectives | Design guide outputs; focus area selection (e.g., 21 objectives in typical focus area) |
| **3** | Identify Respective Process Owners and Conduct Briefing Sessions | Process owner assignments, briefing records |
| **4** | **Obtain Required Evidence Using Agreed-On Methodologies, Validate and Gather Additional Evidence Using Direct and Indirect Approaches** | **Core evidence collection step** — interviews, document review, observation, re-performance, data analytics |
| **5** | Perform the Process Activity Rating | **Rating scale**: Fully >85%, Largely 50-85%, Partially 15-50%, Not <15% (per practice activity); Capability levels 0-5 |
| **6** | Report the Identified Strengths and Opportunities | Assessment report with traceability to evidence |

### 3.4 Capability Levels (CMMI-based, verified from COBIT 2019 I&M)

| Level | Name | Characteristics |
|-------|------|-----------------|
| 0 | Incomplete | Process not implemented or fails to achieve purpose |
| 1 | Initial | Unpredictable, poorly controlled, reactive |
| 2 | **Managed** | Planned, documented, monitored at project level, often reactive |
| 3 | **Defined** | Proactive, organizational standard |
| 4 | **Quantitatively Managed** | Measured and controlled |
| 5 | **Optimizing** | Continuous improvement focus |

### 3.5 Activity Rating Scale (ISO/IEC 33000-based)

| Rating | Threshold | Interpretation |
|--------|-----------|----------------|
| **N (Not Achieved)** | 0% to 15% | Minimal or no evidence of achievement |
| **P (Partially Achieved)** | >15% to 50% | Unstructured approach, partial achievement |
| **L (Largely Achieved)** | >50% to 85% | Structured implementation with minor gaps |
| **F (Fully Achieved)** | >85% to 100% | Complete, consistent, proven effective sustainably |

**Critical Rule**: A process is considered to achieve a specific Capability Level (e.g., Level 2) only if **all activities at that level receive Fully Achieved (F)** and all lower levels are fully satisfied. For example, if a process achieves 73% (Largely Achieved) on Level 2, it officially **fails to achieve Level 2**.

### 3.6 Target-Level Cascade Algorithm (Almeida 2019)

1. Assign N/P/L/F for every Level 2 activity → if all L/F → at least Level 2
2. For Level 2 processes, rate Level 3 activities → any N/P drops to Level 2
3. For Level 3, rate Level 4 → any N/P drops to Level 3
4. For Level 4, rate Level 5 → if no Level 5 activities defined, target = 4; any N/P drops to Level 4

### 3.7 Key Constraints from Case Studies

- **JKU academic paper** (MEA02/03/04 assessment): One sub-threshold process caps entire focus area maturity
- **Capability levels 1 and 5 frequently have no defined activities** — "meaningless to formally describe" (JKU)
- **Not cost-effective to aim for highest rating** in many cases (JKU)
- **NETBankAudit** (2025): 1,378 COBIT evaluations across 347 engagements — real distribution of control assessments
- **Mikroskil University case**: BAI11 domain assessment using COBIT 2019

---

## 4. Audit Evidence & Documentation Standards

### 4.1 Professional Standards Requirements

| Standard | Requirement | Source |
|----------|-------------|--------|
| **IIA Standard 14.6** | Engagements documented such that "an informed, prudent internal auditor could repeat the work and derive the same engagement results" | IIA 2024 GIAS |
| **IIA Standard 2310** | Information must be sufficient, reliable, relevant, and useful | IIA Standards |
| **ISO 19011:2018** | Audit information collected by appropriate sampling, verified as far as practicable; only verifiable information accepted as evidence | ISO 19011 |
| **ISACA ITAF 1205** | "Shall obtain sufficient and appropriate evidence to draw reasonable conclusions"; apply professional skepticism; preserve evidence per retention periods | ISACA ITAF 4th Ed. |
| **PCAOB AS 1105** | Sufficiency = quantity; Appropriateness = relevance + reliability; reliability depends on nature/source/circumstances | PCAOB |
| **PCAOB AS 1215** | Documentation sufficient for experienced auditor with no prior connection; organized to link to significant findings | PCAOB |

### 4.2 Evidence Reliability Factors

- **Source**: Internal vs external; auditor-generated vs client-provided
- **Nature**: Direct evidence more reliable than indirect; originals more reliable than copies/digital images
- **Circumstances**: Company-produced information more reliable when controls (including ITGC) are effective
- **Chain of Custody**: NIST SP 800-53 AU-10(3) — tracks movement of evidence through collection, safeguarding, and analysis life cycle

### 4.3 Evidence Management Risks

| Risk | Description | Consequence |
|------|-------------|-------------|
| **Audit trail breakage** | Assessment decisions cannot be traced back to source documents | Management cannot verify findings |
| **Outdated evidence** | Volume of documents increases risk of using obsolete evidence | Incorrect capability ratings |
| **Inter-context conflict** | Contradictory evidence (e.g., SOP 2020 says "monthly backup" vs SOP 2024 says "daily backup") | RAG reasoning failure without version control rules |
| **Information overload** | Abundant documents do not improve audit quality | Increased human error risk |
| **Labor cost escalation** | Manual evidence processing causes cost spikes | Audit fatigue |

---

## 5. Current Use of AI in Internal Audit

### 5.1 Adoption Statistics (2022–2026)

| Statistic | Year | Population | Geography | Source |
|-----------|------|------------|-----------|--------|
| 40% CAEs use GenAI for IA (up from 15%) | 2025 | 405 NA CAEs | North America | IIA NA Pulse 2025 |
| 23% IT audit functions using AI/ML (~2× YoY) | 2024 | Global IA/IT audit functions | Global | Protiviti+IIA Top Tech Risks |
| 93% audit leaders report some AI use; 38% have strategy | 2026 | 743 professionals (webinar poll) | Global | Gartner 2026 |
| 12% using GenAI; 29% intend within year; 41% using/planning | 2023 | 112 CAEs | Global | Gartner 2024 |
| 83% IA leaders expect increased AI usage next year | 2025 | 373 NA IA leaders | North America | IIA+AuditBoard 2026 |
| 71% orgs regularly use GenAI in ≥1 function | 2024 | 1,491 respondents | Global | McKinsey State of AI |
| 59% organizations have not adopted GenAI at all | 2025 | 405 NA CAEs | North America | IIA NA Pulse 2025 |
| 6% use GenAI extensively in fieldwork | 2025 | 405 NA CAEs | North America | IIA NA Pulse 2025 |
| 13% use GenAI for audit planning | 2025 | 405 NA CAEs | North America | IIA NA Pulse 2025 |
| 11% use GenAI for reporting | 2025 | 405 NA CAEs | North America | IIA NA Pulse 2025 |
| 78% of CAEs seek Data Analytics as top competency | 2025 | 405 NA CAEs | North America | IIA NA Pulse 2025 |

### 5.2 Use Cases Being Implemented (Not Just Planned)

| Use Case | Adoption | Phase Concentration |
|----------|----------|---------------------|
| Drafting audit issues/ratings/reports | 60% | Reporting |
| Reviewing drafts | 41% | Reporting |
| Stakeholder communications | 35% | Reporting |
| Risk assessment & audit planning | 35% | Planning |
| Audit testing | 30% | Fieldwork |
| Knowledge management | 26% | All |
| **Fieldwork extensive use** | **6%** | Fieldwork |
| **Planning extensive use** | **13%** | Planning |

### 5.3 Barriers to Adoption (Ranked)

| Rank | Barrier | % | Source |
|------|---------|---|--------|
| 1 | Regulation & risk management | 82% | KPMG AI Pulse Q1 2025 |
| 2 | Quality of organizational data | 64-85% | KPMG/IIA |
| 3 | Lack of human capital/skills | 50-57% | AICPA/IIA |
| 4 | Data privacy & cybersecurity | 71% | KPMG |
| 5 | Personal trust in GenAI | 35% | KPMG |
| 6 | Hallucination & non-determinism | — | Li & Goel 2026; Kokina et al. 2025 |
| 7 | Absence of legal accountability | — | IIA/ISACA frameworks |

### 5.4 Risks Identified

- **Hallucination**: #1 concern at FIs in 2024, #2 in 2025 behind privacy (IIF-EY)
- **Non-determinism**: Same prompt can produce different recommendations in consecutive iterations, contradicting audit repeatability requirements
- **Overreliance without verification; opacity; inability to exercise professional skepticism** (Li & Goel 2026, 37 Big 4 interviews)
- **Data confidentiality**: Sending internal evidence documents containing network architecture or personal data to public LLM APIs risks violating data protection laws
- **AI-enabled fraud**: 88% phishing, 65% fabricated invoices, <40% feel prepared (IIA+AuditBoard 2026)
- **Governance lag**: 17% org-wide policy vs 50% implementing (IIA Foundation 2024)

---

## 6. Relevant Academic Research

### 6.1 Top 25+ Papers

| Paper | Year | Domain | Method | Dataset | Main Result | Limitation | Relevance |
|-------|------|--------|--------|---------|-------------|------------|-----------|
| Eulerich et al., CAR | 2023 | Internal audit tech adoption | Survey + archival | IA functions (TBAT users/non) | 45.9% DB quality, 34.1% data access, 46.5% competence barriers | Cross-sectional | ★★★★★ |
| NETBankAudit | 2025 | IT audit/COBIT | Case series | 347 engagements, 1,378 evals | COBIT control eval distribution published | Consulting whitepaper, client base | ★★★★☆ |
| IntelliAudit (Wilson et al.) | 2026 | ISO 27001 evidence eval | Multi-agent RAG | Simulated orgs, expert review | Decision-support for control sufficiency | Preprint, ISO not COBIT | ★★★★★ |
| CTRAG (arXiv) | 2026 | Big Four control assessment | RAG + human loop | 240 controls, 45 docs (1 org) | F1 78%, recall 85%, 60% effort reduction | Single org, proprietary, no IAA | ★★★★★ |
| Hybrid COBIT 2019-RAG (Salim et al.) | 2026 | COBIT assessment | DSR, RAGAS | 100 synthetic queries | Overall 0.8257, faithfulness 0.8502 | Q4 venue, synthetic, single-country | ★★★★☆ |
| ObliQA/RIRAG/RePASs | 2024 | Financial regulation | RAG + entailment | 27,869 Q, 40 ADGM docs | RePASs metric; best R@10 0.787 | Financial regs not COBIT | ★★★★★ |
| ALCE (Gao et al.) | 2023 | Long-form QA | RAG evaluation | ASQA/QAMPARI/ELI5 | 50% ELI5 outputs lack full citation support | General domain | ★★★★☆ |
| CLERC (Hou et al.) | 2025 | Legal RAG | Citation evaluation | 1.84M docs, 20.7M citations | Citation False Positive rate introduced | Legal domain | ★★★★☆ |
| RAGChecker (NeurIPS 2024) | 2024 | RAG evaluation | Benchmark | 4,162 queries, 280 meta-eval | Best meta-eval Pearson 61.93 vs human 70.09 | General domain | ★★★★★ |
| RAGTruth (ACL 2024) | 2024 | Hallucination detection | Annotation + detector | 17,790 responses, 450 test | 4-type taxonomy, IAA 91.8%/78.8% | General domain | ★★★★☆ |
| GraphCompliance | 2025 | GDPR compliance | Graph+RAG | 300 scenarios | +4.1-7.2pp micro-F1 | Preprint, GDPR not COBIT | ★★★★☆ |
| ER2-RAG | 2026 | Internal audit | Risk-sensitive RAG | Design science | Confidence-linked conclusions | No public benchmark | ★★★☆☆ |
| Alonso-Robisco et al. | 2026 | External audit supervision | RAG | 20 bank reports × 30 Qs | Kimi 0.873, Llama70B 0.870 | Central bank supervision, not IA | ★★★☆☆ |
| McIntosh et al. | 2024 | Framework comparison | Content analysis | ISO 42001, COBIT 2019, EU AI Act | COBIT 2019 closest to EU AI Act | Qualitative only | ★★★☆☆ |
| Wang et al. (FinAuditing) | 2026 | Financial audit | Benchmark | 1,102 instances, >33k tokens | Models find errors but struggle to explain/cite standards | SIGIR 2026, FinMR fig needs PDF | ★★★☆☆ |
| Kim & Lee (CIKM 2025) | 2025 | Legal AI failure modes | Empirical | 1,039 real civil complaints | Higher retrieval→worse generation; higher reranker→better generation | Korean civil law | ★★★★☆ |
| Li & Goel (JIS) | 2026 | Big 4 GenAI risks | Interviews | 37 Big 4 professionals | Overreliance, opacity, skepticism erosion | Qualitative | ★★★★☆ |
| Kokina et al. (IJAIS) | 2025 | IT audit AI adoption | Field evidence | Large public accounting firms | Simple AI widely used; GenAI slow due to hallucination | External audit focus | ★★★☆☆ |
| Vision 2035 (IIA) | 2025 | Profession future | Survey + qual | 6,506 global, 500+ qual | 97% data volume↑, 48% AI activities, advisory 24%→41% | Vision document | ★★★★☆ |
| Kotb et al. (AAAJ) | 2020 | IA literature meta-review | SLR | 471 papers, 64 journals | "IA literature has not significantly contributed to knowledge of IAF" | Pre-GenAI | ★★★★★ |
| CiteShade | 2026 | RAG security | Attack | Citation laundering | Wrong-answer 0.01→0.68 via trusted source | Attack paper | ★★★★☆ |
| Karakurt et al. (Applied Sciences) | 2026 | Enterprise RAG | SLR | RAG systems review | Lab-to-market gap: 93.6% validate on isolated academic data | SLR | ★★★★☆ |
| Sarkar (Input-Regime Audit) | 2026 | RAG evaluation | Audit of RAGAS | Conflict detection | CARS ceiling effect; RAGAS hides implicit assumptions | Metric audit | ★★★★☆ |
| Anthropic Contextual Retrieval | 2024 | RAG technique | Engineering | Contextual embeddings | Reduces retrieval failure by 67% on long documents | Blog post | ★★★★☆ |
| Re:CAP | 2026 | Retrieval coverage | Iterative probing | Production RAG | Recovers 9-29% of gold labels BM25 misses | Preprint | ★★★★☆ |
| Reframing Internal Audit (MDPI) | 2026 | IA + AI integration | SLR | AI in internal audit | Proposes integration framework; positions COBIT 2019 as insufficient | SLR | ★★★★☆ |
| AuditLLM (Amirizaniani et al.) | 2024 | LLM auditing | Multiprobe | LLM stability testing | Measures cognitive stability and output consistency | Tool paper | ★★★☆☆ |
| Compliance Checking (COLING 2025) | 2025 | Compliance RAG | RAG + KG | Public administration | Integrates RAG with Knowledge Graph for regulatory compliance | Conference paper | ★★★★☆ |

### 6.2 Research Themes Identified

1. **RAG for regulatory/compliance**: ObliQA, GraphCompliance, Compliance Checking (COLING), ER2-RAG
2. **RAG evaluation**: RAGChecker, RAGTruth, ALCE, CLERC, ARES, Re:CAP, KDAF
3. **RAG security/robustness**: CiteShade, Attribution-Compression Frontier, Input-Regime Audit
4. **AI in audit practice**: Eulerich, Li & Goel, Kokina, Reframing IA, Vision 2035
5. **COBIT-specific**: Hybrid COBIT-RAG (Q4), McIntosh framework comparison, NETBankAudit
6. **Enterprise RAG**: Karakurt SLR, Anthropic Contextual Retrieval, EnterpriseRAG-Bench

---

## 7. RAG Evaluation Methods

### 7.1 Comprehensive Framework Comparison

| Framework/Metric | Type | Key Metrics | Audit-Relevant Strengths | Key Limitation |
|------------------|------|-------------|--------------------------|----------------|
| **RAGChecker** (NeurIPS 2024) | Comprehensive | Faithfulness↑, Hallu↓, Self-Knowledge (SK)↓, Context Utilization↑, Noise Sensitivity NS(I)/NS(II)↓ | **SK is defect metric for parametric memory use**; claim-level eval; meta-eval Pearson 61.93 (best) | 280 pairwise instances only; general domain |
| **RAGTruth** (ACL 2024) | Hallucination taxonomy | Evident/Subtle Conflict, Evident/Subtle Baseless Introduction | 4-type taxonomy with span-level annotation; IAA 91.8%/78.8% | General domain; detector fine-tuned on same data |
| **ALCE** (EMNLP 2023) | Citation quality | Correctness + NLI citation quality + MAUVE | Citation precision/recall; 50% ELI5 lack full citation support | Long-form QA focus |
| **CLERC** (NAACL 2025 Findings) | Legal citation | Citation False Positive rate, ROUGE | 1.84M legal docs; CFP rate directly measures attribution errors | Legal domain |
| **RAGAS** | Popular toolkit | Faithfulness, Answer Relevance, Context Precision/Recall | Widely used; context recall 0.9217 in COBIT paper | Meta-eval correlation only 48.31; CARS ceiling effect |
| **CRUD-RAG** | Benchmark | Create/Read/Update/Delete operations | Operational RAG evaluation | Meta-eval 41.25 |
| **ARES** (NAACL 2024) | Automated eval | PPI, domain shift | Few-hundred human annotations | **Worst in RAGChecker meta-eval** (18.63) |
| **RePASs** (RIRAG) | Regulatory | Entailment-based (Es-Cs+OCs+1)/3, threshold 0.7 | Obligation coverage, contradiction detection | **Gameable**: 0.947 via verbatim concat |
| **KDAF** (arXiv 2026) | Auditability | Citation-traceability F1 0.515 | **"Auditable by construction"** framing; retrieval conditions indistinguishable on correctness | Negative result on accuracy |
| **TruLens** | Evaluation | RAG Triad (context relevance, groundedness, answer relevance) | Used in industry | Meta-eval 35.15 |
| **DeepEval** | Evaluation | LLM-as-Judge for multiple metrics | Flexible, customizable | Meta-eval not yet established |

### 7.2 Meta-Evaluation Correlation with Human Judgment

| Framework | Correctness | Completeness | Overall |
|-----------|-------------|--------------|---------|
| BLEU | 38.89 | 32.13 | 35.14 |
| ROUGE-L | 31.75 | 47.88 | 43.10 |
| BERTScore | 30.34 | 37.93 | 33.51 |
| TruLens | 35.01 | 37.24 | 35.15 |
| **ARES** | **18.63** | **20.13** | **17.81** |
| RAGAS | 41.07 | 53.16 | 48.31 |
| CRUD-RAG | 30.93 | 45.11 | 41.25 |
| **RAGChecker** | **49.66** | **60.67** | **61.93** |
| *Human–human (ceiling)* | *63.67* | *71.91* | *70.09* |

**Key insight**: Even the best framework (RAGChecker) reaches 61.93 where two humans agree at 70.09 — an ~8-point gap. This is the honest upper bound on automated RAG evaluation.

### 7.3 RAG Triad for COBIT Assessment

| Metric | Definition | Audit Context |
|--------|------------|---------------|
| **Context Precision** | Ratio of retrieved evidence chunks truly relevant to COBIT activity criteria | Ensures retriever finds pertinent evidence |
| **Context Recall** | Whether all evidence documents needed to assess a practice are retrieved | Ensures completeness for capability rating |
| **Faithfulness (Groundedness)** | Whether LLM-generated claims are **fully based** on retrieved evidence chunks | Prevents hallucinated control mappings |
| **Answer Relevance** | Whether gap analysis or recommendations directly answer COBIT criteria | Ensures output addresses the assessment question |
| **Citation Correctness** | Precision of source attribution (page numbers, document IDs) from output sentences to original evidence | Enables audit trail verification |

### 7.4 Dual-Index Evaluation Approach

A COBIT 2019 assessment system manages two distinct knowledge repositories:

| Index | Content | Characteristics |
|-------|---------|-----------------|
| **COBIT 2019 Core Knowledge Base** | Standard definitions, practices, activities, capability scales | Static, structured, authoritative |
| **Organizational Evidence Store** | SOPs, system logs, certificates, operational documents | Dynamic, unstructured, organization-specific |

**Three-stage evaluation process:**
1. Query COBIT Core Knowledge Base to extract standard definitions and activity indicators
2. Combine standard criteria with initial query to retrieve relevant organizational evidence
3. Evaluate groundedness: LLM compares found evidence against standard criteria, calculates faithfulness score, and links each assessment claim to specific page numbers and source documents

### 7.5 When to Use Each Metric (Audit Context)

| Evaluation Need | Recommended Metric(s) | Rationale |
|-----------------|----------------------|-----------|
| **Traceability/Attribution** | CLERC Citation False Positive, KDAF traceability F1, ALCE citation quality | Directly measure source-to-claim linkage |
| **Faithfulness to Evidence** | RAGChecker Faithfulness, RAGTruth Conflict types | Measure if answer contradicts or adds to retrieved context |
| **Parametric Memory Leakage** | RAGChecker Self-Knowledge (SK) | **Critical for audit**: lower = more grounded in evidence |
| **Retrieval Quality** | RAGChecker Claim Recall, Context Precision | Ensure relevant evidence is retrieved |
| **Completeness** | RAGChecker Completeness (meta-eval), RAGAS Context Recall | Audit findings must be comprehensive |
| **Adversarial Robustness** | CiteShade attack resistance, RePASs gameability test | Audit systems will face adversarial inputs |
| **Human Alignment** | RAGChecker meta-eval (61.93 ceiling) | Best proxy for expert auditor judgment |
| **Missing Evidence Detection** | Re:CAP iterative probing | Identifies evidence gaps that BM25 misses |

---

## 8. Research Gap Analysis

### 8.1 Established Facts (Strong Evidence)
1. Internal audit faces quantified evidence/data barriers (Eulerich 2023, n=IA functions)
2. COBIT 2019 assessment requires systematic evidence collection & traceability (ISACA official)
3. GenAI adoption in IA is 40% and growing but fieldwork lags planning (IIA Pulse 2025)
4. RAG evaluation has standardized benchmarks but 8-point gap to human ceiling (RAGChecker)
5. Citation/attribution mechanisms are vulnerable (CiteShade, Attribution-Compression Frontier)
6. RAG reduces hallucination on knowledge-specific queries; hybrid search (BM25 + Dense Vector) outperforms pure vector search on IT terminology
7. Compliance automation can reduce evidence collection time by up to 80%
8. Graph-RAG improves accuracy for structured regulations like GDPR and ISO 27001

### 8.2 Findings from Literature
1. **Domain gap**: AI/RAG for audit exists but predominantly external audit, financial reporting, or general compliance — **not COBIT/IT governance specific**
2. **Process gap**: Prior work addresses isolated tasks (evidence retrieval, control classification) but not **end-to-end evidence→assessment→finding→gap→recommendation**
3. **Evidence gap**: Most RAG systems generate answers but **few provide traceable evidence chains** suitable for audit working papers
4. **Evaluation gap**: Faithfulness/groundedness metrics exist but **audit-specific evaluation** (sufficiency, appropriateness, professional skepticism) is absent
5. **Framework gap**: COBIT 2019 + RAG has **one Q4 paper with synthetic data** and **zero peer-reviewed studies** with real organizational evidence
6. **Practical gap**: Academic prototypes rarely produce **decision-support tools usable by assessors** with audit-quality documentation
7. **Lab-to-market gap**: 93.6% of enterprise RAG research validates retrieval on isolated academic data, failing to address real-world inter-context conflicts and parametric memory issues
8. **Coverage gap**: Majority of RAG industry evaluation focuses on text generation but ignores retrieval coverage — missing evidence is a critical failure mode for audit

### 8.3 Inferred Gaps (Require Validation)
- No study measures whether RAG improves **assessment consistency** across assessors
- No study evaluates RAG for **capability level determination** (N/P/L/F rating)
- No study addresses **confidentiality/privacy** of organizational evidence in RAG
- No study tests **human-AI collaboration patterns** for COBIT assessment specifically
- Naive RAG without structured processing is unsuitable for calculating N/P/L/F capability scales because COBIT CPM requires 100% evidence verification at lower capability levels before advancing

### 8.4 Claims Requiring Validation
> "RAG can reduce evidence mapping effort by 60%" — only CTRAG (single Big Four POC, 240 controls)
> "RAG improves finding quality" — no controlled study in audit context
> "Traceability can be automated" — no empirical evidence in audit domain
> "Contextual Retrieval reduces failure by 67%" — Anthropic blog post, not peer-reviewed

---

## 9. When RAG Is Not Suitable

### 9.1 Conditions Where RAG Fails for Audit

| Condition | Failure Mode | Consequence |
|-----------|--------------|-------------|
| **Poor evidence quality** | Documents undated, non-standard naming, ambiguous terminology | Garbage in, garbage out — misleading gap analysis |
| **Inter-context conflict** | Contradictory evidence (e.g., SOP 2020 vs SOP 2024) | RAG reasoning failure without version control rules |
| **Missing evidence** | Required evidence does not exist or is incomplete | System cannot assess capability level accurately |
| **CARS ceiling effect** | Context-Adherence metric gives high scores hiding implicit assumptions | False confidence in assessment quality |
| **Organizational context** | Cultural factors, internal politics, real-world effectiveness | RAG only compares evidence text to criteria text; cannot assess nuance |
| **Legal accountability** | AI cannot be held legally responsible for audit opinions | HITL mandatory; RAG is decision-support only |

### 9.2 Fundamental Limitations

1. **Not a replacement for professional judgment**: RAG cannot assess organizational culture, internal politics, or real-world effectiveness. It only compares evidence text against criteria text.
2. **Non-determinism**: Same prompt can produce different outputs, violating audit repeatability requirements.
3. **Hallucination risk**: Even with RAG, LLMs can introduce baseless information (RAGTruth taxonomy: Evident/Subtle Introduction of Baseless Information).
4. **Retrieval failure**: If evidence is noisy, outdated, or contradictory, retrieval quality degrades.
5. **Citation laundering**: Attackers can manipulate attribution to make wrong answers appear supported by trusted sources.

### 9.3 Human-in-the-Loop Requirements

- **Mandatory human review**: All AI-generated capability ratings must be verified by certified assessors
- **Professional skepticism**: Auditors must independently verify AI-generated evidence mappings
- **Accountability**: Licensed auditors remain legally responsible for all assessment conclusions
- **Escalation protocols**: System must flag low-confidence assessments for human review

---

## 10. Possible Research Scope for S1 Thesis

| Scope | Description | Complexity | Research Depth | Implementation Effort | Evaluation Effort | Data Requirements | S1 Suitability | Risk |
|-------|-------------|------------|----------------|----------------------|-------------------|-------------------|----------------|------|
| **Option A: RAG as Evidence Retrieval/Support** | AI helps assessors find relevant evidence and explain linkage to COBIT criteria | Medium | Medium-High | Medium | Medium-High | COBIT framework docs + sample evidence corpus (can be synthetic/anonymized) | **High** — focused, evaluatable | Low |
| **Option B: Evidence-Grounded Assessment Assistant** | AI helps assessors perform capability rating (N/P/L/F) based on evidence with traceable justification | High | High | High | High | Real/simulated organizational evidence mapped to COBIT practices | Medium — scope creep risk | Medium |
| **Option C: RAG Evaluation for Audit Context** | **Primary contribution**: Develop/evaluate metrics for faithfulness, groundedness, citation correctness, evidence sufficiency in COBIT assessment | Medium-High | **Very High** | Low-Medium | **Very High** | Benchmark dataset (can build small annotated set) | **High** — pure research contribution | Low |
| **Option D: Full Assessment System** | End-to-end Assessment→Evidence→Capability→Gap→Recommendation | **Very High** | Medium | **Very High** | High | Full organizational evidence corpus + COBIT framework | **Low** — too large for S1 | **High** |

### 10.1 Trade-off Analysis

**Option A (Recommended for S1):**
- ✅ Clear boundary: retrieval + explanation only
- ✅ Can use existing RAG frameworks (LlamaIndex, LangChain) + COBIT knowledge base
- ✅ Evaluation: retrieval metrics (recall@k, precision) + human eval of explanation quality
- ✅ Data: COBIT 2019 framework (public) + synthetic/anonymized evidence
- ❌ Doesn't address full assessment workflow

**Option B:**
- ✅ Closer to real assessor workflow
- ❌ Requires capability rating logic implementation (N/P/L/F thresholds)
- ❌ Needs evidence sufficiency judgment — highly subjective
- ❌ Scope creep into "AI replaces assessor" territory

**Option C (Strongest Research Contribution):**
- ✅ Addresses core gap: **how to evaluate RAG for audit use**
- ✅ Can build on RAGChecker/RAGTruth/ALCE/CLERC
- ✅ Produces reusable evaluation framework
- ❌ Less "system building" — may feel less applied
- ❌ Needs annotated benchmark (can be small: 50-100 QA pairs)

**Option D:**
- ❌ **Explicitly too large** — combines software engineering, COBIT expertise, AI evaluation, audit certification
- ❌ Would require real organizational data (access/ethics issues)
- ❌ Evaluation alone would be a PhD

---

## 11. Possible Research Questions for S1 Thesis

**RQ1 (Retrieval Accuracy):** *To what extent can a combination of document processing strategies (hybrid search and contextual chunking) improve Context Precision and Context Recall in retrieving audit evidence relevant to COBIT 2019 activity criteria compared to standard vector search (Naive RAG)?*

**RQ2 (Groundedness & Hallucination Mitigation):** *What is the level of Faithfulness (groundedness) and citation correctness accuracy of LLM outputs when mapping unstructured organizational evidence documents to COBIT 2019 capability assessment criteria?*

**RQ3 (Capability Rating Alignment):** *To what extent do draft capability assessments (N/P/L/F scale) generated by a RAG decision-support system have inter-rater agreement with manual assessments performed by expert assessors?*

**RQ4 (Decision-Support Impact):** *What is the impact of using a RAG decision-support prototype on evidence review efficiency and auditor satisfaction in identifying COBIT 2019 compliance gaps?*

**RQ5 (Missing Evidence Detection):** *To what extent can a RAG system based on Contextual Retrieval detect missing evidence in COBIT 2019 assessment, and can a metadata-filtering equipped RAG produce draft capability scores aligned with expert assessor judgments?*

---

## 12. Background Evidence Map

```
Real-World Problem
    │
    ├─→ Evidence: Eulerich et al. (2023) — 45.9% DB quality, 34.1% data access, 46.5% competence barriers
    ├─→ Evidence: KPMG SOX 2025 — controls doubled, 16 hrs/control, 50-80% of audit cycle
    ├─→ Evidence: Vision 2035 — 97% data volume/complexity increase
    ├─→ Evidence: NETBankAudit — 1,378 COBIT evals show real assessment volume
    ├─→ Evidence: Hyperproof 2021 — 40% compliance professionals still manual; 70% adopted GRC but operations gap persists
    └─→ Evidence: IIA Pulse 2025 — 6% fieldwork GenAI use vs 13% planning
           │
           ▼
COBIT 2019 Assessment Process (ISACA Official)
    │
    ├─→ 40 G&M Objectives across 5 domains (EDM/APO/BAI/DSS/MEA)
    ├─→ Goals Cascade: 13 Enterprise Goals → 13 Alignment Goals → 40 G&M Objectives
    ├─→ 11 Design Factors influence prioritization
    ├─→ 6-step process culminating in evidence-grounded capability ratings (N/P/L/F)
    ├─→ Capability levels 0-5 (CMMI-based)
    ├─→ Traceability required between evidence and ratings (CPM)
    └─→ Capability levels 1 & 5 often have no defined activities (JKU case study)
           │
           ▼
Existing Approaches
    │
    ├─→ Manual: spreadsheets, document management, assessor judgment
    ├─→ Generic RAG: LangChain/LlamaIndex + vector DB (no COBIT knowledge)
    ├─→ Domain-specific: ObliQA (financial regs), IntelliAudit (ISO 27001), CTRAG (Big Four POC)
    ├─→ COBIT-specific: Hybrid COBIT-RAG (Q4, synthetic), ER2-RAG (design science only)
    ├─→ Evaluation: RAGChecker, RAGTruth, ALCE, CLERC (general/legal domains)
    └─→ Enterprise RAG: 93.6% validate on isolated academic data (lab-to-market gap)
           │
           ▼
Limitations
    │
    ├─→ No peer-reviewed COBIT+RAG with real organizational evidence
    ├─→ Evaluation metrics not validated for audit sufficiency/appropriateness
    ├─→ Citation/attribution vulnerable to laundering (CiteShade)
    ├─→ Fieldwork use of GenAI lags (6% vs 13% planning) — evidence stage neglected
    ├─→ Traceability unmeasured empirically in audit domain
    ├─→ Governance lag: 17-38% org-wide AI policies
    ├─→ CARS ceiling effect hides implicit assumptions
    └─→ Inter-context conflict unresolved without version control rules
           │
           ▼
Research Gap
    │
    ├─→ Domain: COBIT/IT governance assessment under-explored
    ├─→ Process: End-to-end evidence→assessment→finding→recommendation not addressed
    ├─→ Evidence: Traceable, audit-quality evidence chains missing
    ├─→ Evaluation: Audit-specific faithfulness/groundedness/sufficiency metrics absent
    ├─→ Framework: COBIT 2019 structure not leveraged in RAG design
    ├─→ Practical: Decision-support tools for assessors (not replacement) lacking
    └─→ Coverage: Missing evidence detection not addressed by standard RAG evaluation
           │
           ▼
Proposed Research (Option A or C)
    │
    ├─→ Scope: Evidence retrieval + explanation for COBIT practice activities
    ├─→ Method: RAG with COBIT knowledge base + organizational evidence corpus
    ├─→ Evaluation: Retrieval metrics + human assessor evaluation of explanation quality
    ├─→ Traceability: Citation mechanism with source span attribution
    ├─→ Missing evidence: Re:CAP-style iterative probing for coverage audit
    └─→ Contribution: Validated RAG approach + evaluation protocol for COBIT assessment support
```

---

## 13. Evidence Quality Assessment

| Major Claim | Evidence Quality | Justification |
|-------------|------------------|---------------|
| Internal audit has evidence/data barriers | **Strong** | Peer-reviewed (CAR), quantified, IA-specific population |
| COBIT 2019 requires systematic evidence collection | **Strong** | Official ISACA methodology, verified from multiple sources |
| GenAI adoption in IA is 40% and growing | **Strong** | IIA Pulse 2025 (n=405 CAEs), longitudinal (15%→40%) |
| Fieldwork GenAI use lags planning | **Strong** | IIA Pulse 2025 (n=405): 6% fieldwork vs 13% planning |
| RAGChecker best meta-eval correlation 61.93 | **Strong** | NeurIPS 2024 Datasets & Benchmarks, 280 double-annotated pairs |
| Citation laundering achieves 0.01→0.68 wrong answers | **Moderate** | arXiv 2026 attack paper, needs peer review |
| Direct COBIT+RAG peer-reviewed research absent | **Strong** | arXiv API: 0 results for internal audit+RAG; 1 for COBIT+LLM |
| CTRAG: 60% effort reduction in Big Four POC | **Weak** | arXiv preprint, single org, 240 controls, no IAA, proprietary |
| Hybrid COBIT-RAG achieves 0.8257 overall | **Weak** | Q4 venue (ASSET), 100 synthetic queries, single country |
| Traceability failure rates unmeasured in IA | **Strong** | Confirmed by Kotb et al. (2020) meta-review + systematic search |
| NIST AU-10(3) not in baseline | **Strong** | Verified from NIST CSF tools reference |
| Lab-to-market gap (93.6% academic data) | **Moderate** | SLR by Karakurt et al. 2026, needs journal publication |
| Contextual Retrieval reduces failure 67% | **Weak** | Anthropic engineering blog, not peer-reviewed |
| CARS ceiling effect | **Moderate** | Sarkar 2026 input-regime audit, needs peer review |
| Compliance automation saves 80% time | **Weak** | Avatier vendor marketing, no methodology disclosed |

---

## 14. Recommended Sources to Read First (Priority Order)

| # | Source | Type | Why Essential |
|---|--------|------|---------------|
| 1 | **Eulerich et al. (2023), *Contemporary Accounting Research*** | Peer-reviewed | Quantifies IA evidence/tech barriers — foundation for problem statement |
| 2 | **ISACA, *COBIT 2019 Performance Management Guide*** | Official standard | Defines assessment process, capability levels, evidence requirements |
| 3 | **IIA North American Pulse of Internal Audit 2025** | Industry survey | Best adoption statistics for GenAI in IA (n=405 CAEs) |
| 4 | **RAGChecker paper (NeurIPS 2024 Datasets & Benchmarks)** | Peer-reviewed | Best RAG evaluation framework; SK metric critical for audit |
| 5 | **RAGTruth (ACL 2024)** | Peer-reviewed | Hallucination taxonomy with span-level annotation |
| 6 | **IntelliAudit (arXiv 2026, Wilson et al.)** | Preprint | Closest analogue: ISO 27001 control evidence evaluation with multi-agent RAG |
| 7 | **CTRAG (arXiv 2026)** | Preprint | Only real Big Four deployment evidence; honest limitations |
| 8 | **ObliQA/RIRAG/RePASs (arXiv 2024 + COLING 2025)** | Peer-reviewed (shared task) | Obligation coverage, entailment metrics, financial regulation domain |
| 9 | **CLERC (NAACL 2025 Findings)** | Peer-reviewed | Citation False Positive rate — direct traceability metric |
| 10 | **Kim & Lee (CIKM 2025)** | Peer-reviewed | Counter-intuitive: higher retrieval→worse generation; reranker matters |
| 11 | **ALCE (EMNLP 2023)** | Peer-reviewed | Citation quality evaluation; 50% incomplete citations in best systems |
| 12 | **KDAF "Auditable by Construction" (arXiv 2026)** | Preprint | Negative result: auditability ≠ accuracy; structured retrieval for traceability |
| 13 | **CiteShade (arXiv 2026)** | Preprint | Citation laundering attack — threat model for audit RAG |
| 14 | **NETBankAudit 2025 Annual IT Audit Issues** | Industry whitepaper | Real COBIT control evaluation distribution (1,378 evals) |
| 15 | **Kotb, Elbardan & Halabi (2020), *Accounting, Auditing & Accountability Journal*** | Peer-reviewed SLR | "IA literature has not significantly contributed to knowledge of IAF" — justifies gap |
| 16 | **Karakurt et al. (2026), *Applied Sciences*** | SLR | Lab-to-market gap in enterprise RAG; 93.6% academic data validation |
| 17 | **Sarkar (2026), Input-Regime Audit** | Metric audit | CARS ceiling effect; RAGAS weakness with contradictory documents |
| 18 | **Anthropic Contextual Retrieval (2024)** | Engineering blog | 67% retrieval failure reduction; contextual embeddings technique |
| 19 | **Re:CAP (arXiv 2026)** | Preprint | Iterative probing for missing evidence detection in production RAG |
| 20 | **Reframing Internal Audit (MDPI 2026)** | SLR | Integration framework for AI in IA; positions COBIT 2019 as insufficient |

---

## 15. Critical Conclusions for Your Thesis

### 15.1 What the Evidence Supports
1. **Problem is real and quantified** — evidence management, data quality, traceability are documented pain points
2. **COBIT 2019 is evidence-intensive** — 6-step process, N/P/L/F ratings, capability levels 0-5, traceability mandated
3. **GenAI adoption is happening but immature** — 40% use, but fieldwork (evidence stage) lags at 6%, governance lags
4. **RAG evaluation has science but not audit-specific metrics** — RAGChecker best, but 8-point human ceiling gap
5. **COBIT+RAG is a genuine gap** — 0 arXiv results for internal audit+RAG; 1 for COBIT+LLM
6. **Contextual Retrieval and hybrid search improve retrieval** — 67% failure reduction, BM25+dense outperforms pure vector
7. **Graph-RAG helps structured regulations** — GDPR/ISO 27001 compliance mapping benefits from knowledge graphs
8. **Missing evidence is a critical failure mode** — Re:CAP shows BM25 misses 9-29% of gold labels

### 15.2 What the Evidence Does NOT Support
- ❌ RAG "solves" audit evidence problems — no controlled studies
- ❌ Full automation of COBIT assessment — IntelliAudit/CTRAG explicitly frame as decision-support
- ❌ Existing RAG metrics suffice for audit — sufficiency/appropriateness/professional skepticism not measured
- ❌ Synthetic benchmarks represent reality — EnterpriseRAG-Bench/CorporateBench are synthetic
- ❌ Contextual Retrieval's 67% improvement is peer-reviewed — it's an engineering blog
- ❌ Compliance automation's 80% time savings — vendor marketing without methodology

### 15.3 Recommended Path
**Option A or C** for S1 thesis:
- **Option A** if you want to build a prototype + evaluate with assessors
- **Option C** if you want a pure research contribution on evaluation methodology
- **Hybrid RQ3** balances both: build minimal RAG retriever + evaluate against manual baseline

**Critical success factor**: Partner with 2-3 practicing COBIT assessors for human evaluation. Without this, any claim about "usefulness to assessors" is unsupported.

**Scope boundary**: Explicitly frame as **"evidence retrieval and explanation support for COBIT 2019 practice activity assessment"** — not capability determination, not finding generation, not recommendation generation. This keeps it S1-feasible while addressing a validated gap.

**Methodological caution**: Evaluation harness must be adversarial against naive strategies (verbatim copying, policy-blind bag-of-words probes, generic violation-signal detectors). Any metric that a trivial system can max out should not be used as a primary control-effectiveness measure.
