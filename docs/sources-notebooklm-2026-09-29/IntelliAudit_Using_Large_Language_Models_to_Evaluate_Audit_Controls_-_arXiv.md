# IntelliAudit: Using Large Language Models to Evaluate Audit Controls - arXiv

IntelliAudit: Using Large Language Models to Evaluate Audit Controls

Report GitHub Issue

×

Title:

Content selection saved. Describe the issue below:

Description:

Submit without GitHub Submit in GitHub 

arXiv is now an independent nonprofit! [Learn more](https://info.arxiv.org/about) ×

[arXiv logo Back to arXiv](https://arxiv.org/)

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html) [Report Issue](https://arxiv.org/html/2608.07688v1) [Back to Abstract](https://arxiv.org/abs/2608.07688v1) [Download PDF](https://arxiv.org/pdf/2608.07688v1)  

[Abstract](https://arxiv.org/html/2608.07688v1#abstract1)

[Introduction](https://arxiv.org/html/2608.07688v1#Sx1)

[Related Work](https://arxiv.org/html/2608.07688v1#Sx2)

[LLMs for compliance and audit.](https://arxiv.org/html/2608.07688v1#Sx2.SS0.SSS0.Px1)

[Retrieval-augmented compliance systems.](https://arxiv.org/html/2608.07688v1#Sx2.SS0.SSS0.Px2)

[LLMs for financial audit.](https://arxiv.org/html/2608.07688v1#Sx2.SS0.SSS0.Px3)

[Human-in-the-loop LLM auditing.](https://arxiv.org/html/2608.07688v1#Sx2.SS0.SSS0.Px4)

[Multi-agent reasoning and document understanding.](https://arxiv.org/html/2608.07688v1#Sx2.SS0.SSS0.Px5)

[Methodology](https://arxiv.org/html/2608.07688v1#Sx3)

[Task Formulation](https://arxiv.org/html/2608.07688v1#Sx3.SSx1)

[Retrieval-Grounded Control Assessment](https://arxiv.org/html/2608.07688v1#Sx3.SSx2)

[Multi-Agent Review](https://arxiv.org/html/2608.07688v1#Sx3.SSx3)

[Auditor.](https://arxiv.org/html/2608.07688v1#Sx3.SSx3.SSS0.Px1)

[Defender.](https://arxiv.org/html/2608.07688v1#Sx3.SSx3.SSS0.Px2)

[Judge.](https://arxiv.org/html/2608.07688v1#Sx3.SSx3.SSS0.Px3)

[Human Feedback](https://arxiv.org/html/2608.07688v1#Sx3.SSx4)

[Control Assessment Procedure](https://arxiv.org/html/2608.07688v1#Sx3.SSx5)

[Implementation](https://arxiv.org/html/2608.07688v1#Sx4)

[Benchmark and Evaluation](https://arxiv.org/html/2608.07688v1#Sx5)

[Benchmark](https://arxiv.org/html/2608.07688v1#Sx5.SSx1)

[Human Evaluation](https://arxiv.org/html/2608.07688v1#Sx5.SSx2)

[Ablation and Metrics](https://arxiv.org/html/2608.07688v1#Sx5.SSx3)

[Results](https://arxiv.org/html/2608.07688v1#Sx6)

[Control Understanding (RQ1).](https://arxiv.org/html/2608.07688v1#Sx6.SSx3.SSS0.Px1)

[Evidence-Grounded Assessment (RQ2).](https://arxiv.org/html/2608.07688v1#Sx6.SSx3.SSS0.Px2)

[Reasoning Across Artifact Types (RQ3).](https://arxiv.org/html/2608.07688v1#Sx6.SSx3.SSS0.Px3)

[Audit-Preparation Usefulness (RQ4).](https://arxiv.org/html/2608.07688v1#Sx6.SSx3.SSS0.Px4)

[Effect of Multi-Agent Review.](https://arxiv.org/html/2608.07688v1#Sx6.SSx3.SSS0.Px5)

[Human Feedback as Audit Calibration.](https://arxiv.org/html/2608.07688v1#Sx6.SSx3.SSS0.Px6)

[Conclusion](https://arxiv.org/html/2608.07688v1#Sx7)

[References](https://arxiv.org/html/2608.07688v1#bib)

[License: CC BY-NC-SA 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2608.07688v1 [cs.AI] 07 Aug 2026

# IntelliAudit: Using Large Language Models to Evaluate Audit Controls

Allison Wilson 1 Sina Moradi Sabet 2 Diar Shakimov 1 Panteha Shahrivar 1 allison_wilson@sfu.ca sina.moradi@aut.ac.ir diar_shakimov@sfu.ca panteha_shahrivar@sfu.ca

Mohammad Reza Bagheri 4 Dean Konenkamp 3 Mohammad A. Tayebi 1 reza.bagheri@telus.com dean@coca-cola.com tayebi@sfu.ca

Abstract

IT audits require auditors to judge whether heterogeneous organizational evidence satisfies semantic security and compliance controls. This judgment is difficult to automate because relevant evidence is distributed across policies, records, spreadsheets, and operational artifacts, and because audit conclusions depend on evidentiary sufficiency rather than keyword matching. We present IntelliAudit, a retrieval-grounded multi-agent system for IT audit evidence evaluation. Given a control and an evidence corpus, IntelliAudit retrieves relevant artifacts, generates an evidence-grounded assessment, challenges adverse findings, adjudicates disagreements, and produces an auditor-facing recommendation with cited evidence, rationale, missing-evidence analysis, and remediation guidance. We instantiate IntelliAudit on ISO/IEC 27001 and evaluate it across multiple simulated organizations using expert auditor review and audit-readiness user feedback. The evaluation shows that IntelliAudit can support control interpretation, evidence-grounded reasoning, and audit-preparation workflows, while also revealing the importance of human oversight for calibrating sufficiency judgments and correcting overly permissive recommendations. These results suggest that retrieval-grounded multi-agent systems can assist audit evidence review, but should remain decision-support tools rather than autonomous certification systems.

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

## Introduction

IT audits verify whether an organization's controls adequately mitigate its security and compliance risks. Organizations design these controls themselves or tailor them from frameworks such as ISO/IEC 27001 ( [ISO/IEC 2022](https://arxiv.org/html/2608.07688v1#bib.bib17)) , hereafter ISO 27001, SOC 2 ( [AICPA 2022](https://arxiv.org/html/2608.07688v1#bib.bib3)) , the NIST Cybersecurity Framework ( [National Institute of Standards and Technology 2024](https://arxiv.org/html/2608.07688v1#bib.bib20)) , and PCI DSS ( [PCI Security Standards Council 2024](https://arxiv.org/html/2608.07688v1#bib.bib22)) ; auditors then independently assess them. Unlike checklist matching, this requires understanding the risk each control addresses, interpreting its semantic requirements, and determining whether heterogeneous organizational evidence sufficiently supports an audit conclusion.

This work remains labor-intensive and depends on scarce expertise. ISC2 estimates a global cybersecurity workforce gap of 4.8 million ( [ISC2 2024](https://arxiv.org/html/2608.07688v1#bib.bib15)) and identifies governance, risk, and compliance among the hardest skill areas to fill ( [ISC2 2025](https://arxiv.org/html/2608.07688v1#bib.bib16)) ; similarly reports a U.S. shortfall of roughly 265,000 cybersecurity workers, with only enough talent to fill 83% of employer demand. ( [CyberSeek 2024](https://arxiv.org/html/2608.07688v1#bib.bib8)) . AI-assisted evidence review could help auditors manage this growing workload.

However, audit evidence evaluation is a high-accountability task. It determines whether a control is suitably designed and whether it operates effectively, so unsupported claims or premature compliance judgments can mislead auditors and organizations. A useful system must ground conclusions in retrieved evidence, recognize partial or missing support, expose its reasoning, and allow human auditors to challenge its recommendations.

LLM-based auditing research has concentrated primarily on financial audits ( [Wang et al. 2026](https://arxiv.org/html/2608.07688v1#bib.bib30); [Wang et al. 2025a](https://arxiv.org/html/2608.07688v1#bib.bib29); [Wang et al. 2025b](https://arxiv.org/html/2608.07688v1#bib.bib31)) , while emerging work in IT auditing targets narrower but important tasks, including audit planning, password–policy checking, and policy-to-control assessment. To the best of our knowledge, however, no prior study has introduced an AI-driven workflow for assessing whether heterogeneous evidence bundles sufficiently satisfy semantic IT-audit controls.

To address this gap, we present IntelliAudit, a retrieval-grounded, selectively escalated multi-agent framework for IT audit evidence evaluation. The Auditor produces the initial evidence-grounded assessment, the Defender searches for overlooked mitigating evidence in adverse cases, and the Judge resolves disagreements and incorporates human feedback. Together, these agents produce traceable recommendations, identify evidentiary gaps, and suggest follow-up actions without making certification decisions.

We investigate four research questions: (RQ1) control understanding beyond surface text; (RQ2) evidence sufficiency for audit conclusions; (RQ3) cross-artifact reasoning across processed text, PDF, and spreadsheet evidence; and (RQ4) audit-readiness usefulness for users preparing for an audit.

Because no public benchmark exists for semantic IT-audit evidence evaluation, we worked with audit experts to build evidence for four simulated organizations covering 14 ISO 27001 controls. We evaluated IntelliAudit with practicing auditors, who assessed control interpretation and evidence use, and cybersecurity-informed audit-readiness users, who assessed audit-preparation usefulness.

The results show that IntelliAudit supports control interpretation and artifact-level evidence review, while sufficiency judgments over evidence bundles remain harder. Participants found its explanations useful for identifying gaps and next steps, and auditor feedback corrected overly permissive recommendations. Although evaluated on ISO 27001, IntelliAudit can generalize to other standards by encoding their controls and evidence requirements.

Our contributions are threefold:

• We formulate IT audit evidence evaluation as an explainable, evidence-grounded recommendation task rather than autonomous certification.

• We introduce a selectively escalated multi-agent workflow combining retrieval, primary assessment, adversarial review, adjudication, and human feedback.

• We construct an audit-realistic ISO/IEC 27001 benchmark and evaluate the system through Group A: practicing auditors and Group B: cybersecurity-informed audit-readiness users assessments.

## Related Work

LLMs for compliance and audit.

LLMs support compliance question answering, audit planning, and regulatory assessment. Prior systems combine multi-agent retrieval with regulatory knowledge ( [Agarwal et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib2)) , support industrial supply-chain audits ( [Yao et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib34)) , and automate ISO 27001 auditing ( [Riasat and Brachten 2024](https://arxiv.org/html/2608.07688v1#bib.bib24)) . Other work examines LLM readiness for cybersecurity governance ( [McIntosh et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib19)) , password-policy auditing ( [Chin et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib6)) , policy-context graph alignment ( [Chung et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib7)) , and GDPR agreement checking ( [Amaral Cejas et al. 2023](https://arxiv.org/html/2608.07688v1#bib.bib4)) . Unlike these approaches, IntelliAudit evaluates the sufficiency of heterogeneous evidence for semantic ISO 27001 controls.

Retrieval-augmented compliance systems.

RAG grounds outputs in external evidence ( [Lewis et al. 2020](https://arxiv.org/html/2608.07688v1#bib.bib18); [Gao et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib10)) , with extensions for agentic reasoning ( [Singh et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib25)) and multimodal inputs ( [Abootorabi et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib1)) . Regulated-domain applications include risk-and-quality queries ( [Hillebrand et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib13)) and FDA-guidance assessment ( [Waikar, Bhat, and Ramanathan 2026](https://arxiv.org/html/2608.07688v1#bib.bib27)) . IntelliAudit extends RAG to adversarial multi-agent control assessment with evidence-linked explanations.

LLMs for financial audit.

Financial-audit benchmarks expose limitations in taxonomy-aware reasoning, cross-document consistency, standards citation, and end-to-end execution ( [Wang et al. 2025b](https://arxiv.org/html/2608.07688v1#bib.bib31); [Wang et al. 2025a](https://arxiv.org/html/2608.07688v1#bib.bib29)) . AuditFlow combines agents grounded in US-GAAP and XBRL graphs with deterministic numerical checks ( [Wang et al. 2026](https://arxiv.org/html/2608.07688v1#bib.bib30)) . IntelliAudit instead addresses semantic IT controls that resist deterministic verification and adds adversarial review, adjudication, and auditor feedback.

Human-in-the-loop LLM auditing.

Human–AI collaboration can uncover failures missed by either alone ( [Rastogi et al. 2023](https://arxiv.org/html/2608.07688v1#bib.bib23)) . LLMAuditor combines LLM-generated probes with human verification ( [Amirizaniani et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib5)) , while broader work studies feedback integration in human-agent systems ( [Zou et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib35)) . In IntelliAudit, auditor feedback is routed through the Judge to revise traceable recommendations rather than overwrite them.

Multi-agent reasoning and document understanding.

Multi-agent debate elicits and adjudicates competing interpretations ( [Du et al. 2023](https://arxiv.org/html/2608.07688v1#bib.bib9)) , while surveys emphasize role specialization and structured coordination ( [Tran et al. 2025](https://arxiv.org/html/2608.07688v1#bib.bib26); [Guo et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib11)) . D3 implements advocate, judge, and jury roles ( [Harrasse, Bandi, and Bandi 2026](https://arxiv.org/html/2608.07688v1#bib.bib12)) ; IntelliAudit adapts this pattern through a Defender that challenges adverse findings and a Judge that resolves disagreements. Its benchmark also connects to layout-aware document understanding, including LayoutLM-style models ( [Huang et al. 2022](https://arxiv.org/html/2608.07688v1#bib.bib14); [Xu et al. 2021](https://arxiv.org/html/2608.07688v1#bib.bib33); [Xu et al. 2020](https://arxiv.org/html/2608.07688v1#bib.bib32)) and DocLLM ( [Wang et al. 2024](https://arxiv.org/html/2608.07688v1#bib.bib28)) .

## Methodology

We formulate IT audit evidence evaluation as an explainable recommendation task and instantiate it through a retrieval-grounded, selectively escalated multi-agent workflow. The formulation specifies what must be produced for each control, while the workflow describes how IntelliAudit retrieves evidence, evaluates its sufficiency, reviews adverse findings, resolves disagreements, and incorporates human feedback. 

Figure 1: IntelliAudit workflow for assessment, counterevidence review, adjudication, and human feedback.

### Task Formulation

Let R = { r 1 , … , r n } R={r_{1},\ldots,r_{n}} denote the requirements in an audit framework, and let ℰ \mathcal{E} denote the engagement-specific evidence corpus. Requirements may depend on one another. We represent prerequisite relationships as a directed graph G = ( R , 𝒫 ) G=(R,\mathcal{P}) , where ( r i , r j ) ∈ 𝒫 (r_{i},r_{j})\in\mathcal{P} means that requirement r i r_{i} must be satisfied before r j r_{j} can be meaningfully evaluated. Equivalently, G G can be encoded by a dependency matrix D ∈ { 0 , 1 } n × n D\in{0,1}^{n\times n} , where D i  j = 1 D_{ij}=1 iff ( r i , r j ) ∈ 𝒫 (r_{i},r_{j})\in\mathcal{P} .

Let S ⊆ R S\subseteq R denote the requirements whose prerequisites have been established in the current audit state. A requirement r j r_{j} is evaluable iff

∀ r i ∈ R : ( r i , r j ) ∈ 𝒫 ⇒ r i ∈ S . \forall r_{i}\in R:\ (r_{i},r_{j})\in\mathcal{P}\Rightarrow r_{i}\in S.

Non-evaluable requirements are surfaced as prerequisite gaps rather than assigned a substantive compliance status.

Each requirement is associated with an admissible evidence profile through the mapping

α : R → 2 𝒜 , \alpha:R\rightarrow 2^{\mathcal{A}},

where 𝒜 \mathcal{A} is the universe of audit artifacts, including policies, procedures, logs, documents, PDFs, and spreadsheets. For a target requirement r j r_{j} , α  ( r j ) \alpha(r_{j}) specifies the evidence types and criteria that the system should seek and cite.

Given an evaluable requirement r j r_{j} , evidence corpus ℰ \mathcal{E} , and audit state S S , IntelliAudit approximates the audit-assistance function

F  ( r j , ℰ , S ) → ( y ^ j , ℬ j , π j ) , F(r_{j},\mathcal{E},S)\rightarrow(\hat{y}*{j},\mathcal{B}*{j},\pi_{j}),

where

y ^ j ∈ { COMPLIANT , PARTIAL , NON_COMPLIANT , INSUFFICIENT_EVIDENCE } . \begin{gathered}\hat{y}_{j}\in{\texttt{COMPLIANT},\ \texttt{PARTIAL},\ \texttt{NON_COMPLIANT},\ \texttt{INSUFFICIENT_EVIDENCE}}.\end{gathered}

Here, y ^ j \hat{y}*{j} is a provisional auditor-facing recommendation, ℬ j ⊆ ℰ \mathcal{B}*{j}\subseteq\mathcal{E} is the cited evidence bundle, and π j \pi_{j} is an explanation that maps evidence to criteria, identifies gaps or conflicts, and recommends follow-up actions.

PARTIAL indicates that the evidence supports some criteria while leaving others unmet or unsupported. NON_COMPLIANT indicates that the cited record supports a substantive conclusion that the control is not satisfied. By contrast, INSUFFICIENT_EVIDENCE is an epistemic abstention indicating that the available evidence is too incomplete, conflicting, or inconclusive to support a reliable substantive determination. In the current prototype, this abstention is restricted to cases that reach the Judge through agent disagreement or human feedback. The goal is therefore not autonomous certification, but an inspectable recommendation package for human auditor review.

### Retrieval-Grounded Control Assessment

For each target requirement, IntelliAudit translates the evidence profile α  ( r j ) \alpha(r_{j}) into a requirement-specific search space:

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

The system then performs iterative retrieval over ℰ j \mathcal{E}_{j} . Each iteration identifies an evidence need, issues a targeted query, retrieves candidate artifacts, removes duplicates, and evaluates whether the current bundle is sufficient for assessment. Synthesis is restricted to the retrieved and cited bundle, reducing the risk that a status is assigned solely from the control text or unsupported model priors.

The assessment output is required to satisfy three traceability constraints. First, every substantive claim in π j \pi_{j} must be supported by at least one cited artifact in ℬ j \mathcal{B}*{j} . Second, missing or ambiguous evidence must be reported explicitly rather than treated as implicit compliance. Third, the recommended status y ^ j \hat{y}*{j} must follow from the explanation: the cited evidence and rationale must jointly justify the label.

### Multi-Agent Review

IntelliAudit implements selective escalation rather than mandatory multi-agent debate. The Auditor always produces the initial evidence-grounded recommendation, while additional review stages are invoked only when an assessment requires counterevidence search, adjudication, abstention, or incorporation of auditor feedback. Table [1](https://arxiv.org/html/2608.07688v1#Sx3.T1) summarizes the resulting division of responsibilities.

|   |   |

| --- | --- |

|   |   |

|   |   |

|   |   |

|   |   |

|   |   |

Table 1: Agents review responsibilities by audit risk.

This division is asymmetric by design. The Defender guards against premature adverse findings, while optimistic or contextually incorrect recommendations remain provisional and subject to human review. The Judge resolves conflicting interpretations and epistemic uncertainty, and every stage preserves the supporting evidence trail.

Auditor.

The Auditor performs the primary assessment. Given r j r_{j} and ℰ \mathcal{E} , it retrieves evidence and returns

( y ^ A , ℬ A , π A ) . (\hat{y}*{A},\mathcal{B}*{A},\pi_{A}).

The Auditor is a position-taking agent and must select a provisional substantive status:

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

|   |   |   |   |

It identifies satisfied criteria, missing evidence, and unresolved uncertainty in π A \pi_{A} . When the evidence supports some criteria but not others, the Auditor assigns PARTIAL. It cannot assign the adjudicative abstention INSUFFICIENT_EVIDENCE; uncertainty must instead be documented in its explanation for potential escalation or human review.

Defender.

The Defender is invoked only for adverse Auditor findings:

y ^ A ∈ 𝒴 − , 𝒴 − = { PARTIAL , NON_COMPLIANT } . \hat{y}_{A}\in\mathcal{Y}^{-},\qquad\mathcal{Y}^{-}={\texttt{PARTIAL},\texttt{NON_COMPLIANT}}.

Its role is to determine whether the Auditor overlooked compensating, mitigating, or differently located evidence. Given ( r j , ℬ A , π A , y ^ A ) (r_{j},\mathcal{B}*{A},\pi*{A},\hat{y}_{A}) , the Defender conducts a focused retrieval pass over underexplored parts of the evidence profile and returns

( y ^ D , ℬ D , π D ) . (\hat{y}*{D},\mathcal{B}*{D},\pi_{D}).

Like the Auditor, the Defender must propose a status in 𝒴 sub \mathcal{Y}^{\mathrm{sub}} and cannot assign INSUFFICIENT_EVIDENCE. The Defender therefore does not advocate for compliance unconditionally; it tests whether an adverse recommendation remains justified after a targeted search for mitigating evidence.

Judge.

During automated review, the Judge is invoked when the Auditor and Defender disagree. It is also invoked when a human auditor provides feedback. For an agent disagreement, it receives the competing rationales and the combined evidence bundle

ℬ A  D = DEDUP  ( ℬ A ∪ ℬ D ) , \mathcal{B}*{AD}=\mathrm{DEDUP}(\mathcal{B}*{A}\cup\mathcal{B}_{D}),

and produces

( y ^ J , ℬ J , π J ) . (\hat{y}*{J},\mathcal{B}*{J},\pi_{J}).

The Judge is the only agent permitted to return any status in the full label set, including INSUFFICIENT_EVIDENCE. It selects a substantive status when the combined evidence supports one; otherwise, it may abstain when neither interpretation can be justified reliably.

This distinction separates PARTIAL, a substantive judgment that some criteria are supported while others remain unmet, from INSUFFICIENT_EVIDENCE, an epistemic judgment that the available record cannot sustain a reliable substantive conclusion. Reserving abstention for the Judge allows the Defender to search for overlooked evidence before the record is declared indeterminate. When the Auditor and Defender agree, their evidence and explanations are merged without further adjudication, preserving selective escalation.

### Human Feedback

Every IntelliAudit recommendation remains provisional and subject to human auditor review. An auditor may provide feedback h j h_{j} to flag missing evidence, challenge a status label, correct scope assumptions, or add audit-specific context.

Rather than applying h j h_{j} as a manual overwrite, IntelliAudit treats it as an external escalation signal and routes it to the Judge. The Judge re-evaluates the previous recommendation, cited evidence, and auditor feedback, and returns:

( y ^ H , ℬ H , π H ) . (\hat{y}*{H},\mathcal{B}*{H},\pi_{H}).

The resulting tuple may preserve or revise the previous recommendation. When the feedback reveals an evidentiary gap or misinterpretation, the Judge updates the status, evidence bundle, or explanation accordingly. This preserves a traceable connection between the original assessment, the auditor's challenge, and the resulting recommendation.

### Control Assessment Procedure

Algorithm 1 summarizes the control-level procedure. The Auditor always runs; the Defender is invoked only for adverse findings where overlooked mitigating evidence could affect the recommendation. The Judge is invoked when the agents disagree or when human feedback is supplied. If the Auditor and Defender agree, their evidence and explanations are merged without adjudication. The procedure is selective and auditable. Additional review occurs only under defined escalation conditions, revisions retain supporting evidence, and the final audit decision remains with the human auditor.

Algorithm 1 IntelliAudit Control Assessment

1: Evaluable requirement r j r_{j} ; evidence corpus ℰ \mathcal{E}

2: Recommendation y ^ j \hat{y}*{j} , evidence bundle ℬ j \mathcal{B}*{j} , explanation π j \pi_{j}

3: ( y ^ A , ℬ A , π A ) ← Auditor  ( r j , ℰ ) (\hat{y}*{A},\mathcal{B}*{A},\pi_{A})\leftarrow\textsc{Auditor}(r_{j},\mathcal{E})

4: if y ^ A ∉ 𝒴 − \hat{y}_{A}\notin\mathcal{Y}^{-} then

5: ( y ^ , ℬ , π ) ← ( y ^ A , ℬ A , π A ) (\hat{y},\mathcal{B},\pi)\leftarrow(\hat{y}*{A},\mathcal{B}*{A},\pi_{A})

6: else

7: ( y ^ D , ℬ D , π D ) ← Defender  ( r j , ℰ , ℬ A , π A ) (\hat{y}*{D},\mathcal{B}*{D},\pi_{D})\leftarrow\textsc{Defender}(r_{j},\mathcal{E},\mathcal{B}*{A},\pi*{A})

8: ℬ A  D ← DEDUP  ( ℬ A ∪ ℬ D ) \mathcal{B}*{AD}\leftarrow\mathrm{DEDUP}(\mathcal{B}*{A}\cup\mathcal{B}_{D})

9: if y ^ D = y ^ A \hat{y}*{D}=\hat{y}*{A} then

10: ( y ^ , ℬ , π ) ← ( y ^ A , ℬ A  D , COMBINE  ( π A , π D ) ) (\hat{y},\mathcal{B},\pi)\leftarrow(\hat{y}*{A},\mathcal{B}*{AD},\mathrm{COMBINE}(\pi_{A},\pi_{D}))

11: else

12: ( y ^ , ℬ , π ) ← Judge  ( r j , ℬ A  D , π A , π D ) (\hat{y},\mathcal{B},\pi)\leftarrow\textsc{Judge}(r_{j},\mathcal{B}*{AD},\pi*{A},\pi_{D})

13: end if

14: end if

15: if human feedback h j h_{j} is supplied then

16: ( y ^ , ℬ , π ) ← Judge  ( r j , ℬ , π , h j ) (\hat{y},\mathcal{B},\pi)\leftarrow\textsc{Judge}(r_{j},\mathcal{B},\pi,h_{j})

17: end if

18: return ( y ^ , ℬ , π ) (\hat{y},\mathcal{B},\pi)

Each execution returns a provisional recommendation package ( y ^ j , ℬ j , π j ) (\hat{y}*{j},\mathcal{B}*{j},\pi_{j}) . The package is considered traceable only when the cited evidence bundle ℬ j \mathcal{B}*{j} supports the explanation π j \pi*{j} , and the explanation, in turn, justifies the recommended status y ^ j \hat{y}_{j} . This two-step requirement is central to IntelliAudit's design: it keeps each recommendation inspectable, contestable, and grounded in evidence while leaving the final audit determination to the human auditor.

## Implementation

Each control is encoded as a structured record containing its identifier, objective, evidence requirements, testing procedure, and compliance criteria. As shown in Figure [2](https://arxiv.org/html/2608.07688v1#Sx4.F2), the shared SearchAgent retrieves evidence from three complementary backends: semantic search over ChromaDB using OpenAI text-embedding-3-small embeddings ( [OpenAI 2024](https://arxiv.org/html/2608.07688v1#bib.bib21)) , Document Model Context Protocol (MCP) lexical search over source-traceable document chunks, and Excel MCP lexical search over structured XLSX rows.

Documents are split into overlapping chunks with file and chunk provenance, while spreadsheets are represented as row-level records with workbook, sheet, row, and column–value metadata. Each backend returns up to k = 15 k=15 candidates above a 0.35 threshold. Results are pooled, deduplicated by source identifier, and passed to a LangGraph plan–retrieve–deduplicate–evaluate loop.

Claude Sonnet 4.6 performs query planning, evidence evaluation, and synthesis. Each SearchAgent call uses an initial plan plus at most three adaptive queries. The Auditor is allowed up to four iterations, and the Defender and Judge up to three each. Search stops when sufficient evidence is found, no useful follow-up query remains, or the iteration limit is reached. 

Figure 2: IntelliAudit evidence-indexing and adaptive-search architecture.

## Benchmark and Evaluation

We evaluate IntelliAudit on ISO 27001 evidence review, focusing on whether it produces evidence-supported, explainable, and audit-useful recommendations rather than automated certification decisions.

### Benchmark

Because real audit evidence is sensitive and rarely public, we implement the benchmark across four simulated organizations. Each organization has its own evidence corpus, seeded compliance condition, and control-specific artifacts, allowing IntelliAudit to be evaluated across multiple audit contexts rather than a single static case. The corpus combines three sources: public standards and guidance documents, expert-crafted operational artifacts such as inventories and incident records, and synthetic policy or procedure documents generated from those seeds. Each artifact is anonymized and included in the supplementary archive with prompts and configuration files.

Each control instance is assigned one of three seeded evidence conditions— *compliant*, *semi-compliant*, or *non-compliant*—shown in italics; system recommendation labels are shown in typewriter font. Compliant instances contain evidence satisfying the control's semantic requirements, semi-compliant instances provide only partial support, and non-compliant instances provide no meaningful support. These conditions are distinct from IntelliAudit's output labels: *semi-compliant* typically maps to PARTIAL, whereas INSUFFICIENT_EVIDENCE has no direct seeded counterpart.

The evaluation is organized around the four research questions introduced in the Introduction. Table [2](https://arxiv.org/html/2608.07688v1#Sx5.T2) maps each question to its evaluation signal; evaluating 14 controls, spanning: policy, incident management, continuity, HR, and asset-management domains, with DOC, TXT, PDF, and XLSX evidence.

|   |   |   |

| --- | --- | --- |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

Table 2: Operationalization of the research questions through their evaluation basis and signals.

### Human Evaluation

For each control instance, IntelliAudit produces a structured recommendation containing a status label, cited evidence, rationale, missing-evidence analysis, and follow-up actions. Because no public ground-truth dataset exists for ISO 27001 evidence sufficiency, we use human evaluation as the primary reference. Group B ratings measure usefulness for audit preparation only; no correctness or evidence-sufficiency conclusion is drawn from them, which remains the role of Group A.

Group A consists of practicing auditors who evaluate whether the system's reasoning, evidence use, and conclusions are professionally acceptable. Group B consists of cybersecurity-informed audit-readiness users: non-auditors with cybersecurity or compliance background who assess whether the output is understandable and actionable for audit preparation; Group B does not assess audit correctness. Each review covers one simulated organization, and every organization is reviewed by at least two Group A auditors; participants answer 5-point Likert questions with free-text justification fields.

### Ablation and Metrics

We compare the full workflow against an Auditor-agent-only baseline while holding the corpus, retrieval configuration, prompts, and model backbone fixed. The full pipeline invokes the Defender agent only for adverse findings and the Judge only when agents disagree or when human feedback is provided. For Judge-activation cases, reviewers complete a blinded forced-choice comparison between Auditor-agent-only and Judge-final outputs. Because these cases are selected precisely when adjudication is triggered, this ablation measures preference on contested cases rather than universal superiority of multi-agent reasoning.

We report mean Likert scores, standard deviations (SD), and response counts per question ( n n ). For RQ1 and RQ2, Group A participants assess control understanding ( Underst.), factuality of the evidence evaluation ( Factual.), and the evidence's fulfillment of the control ( Fulfill.), reported per assessment unit in Table [3](https://arxiv.org/html/2608.07688v1#Sx6.T3). For RQ3, we group RQ1, RQ2, and RQ4 ratings by primary artifact type to descriptively compare text, PDF, and spreadsheet cases. For RQ4, Group B rates the output's usefulness ( Useful.) for identifying gaps, understanding missing evidence, and supporting remediation. Figure [3](https://arxiv.org/html/2608.07688v1#Sx5.F3) summarizes the evaluation design.

Figure 3: IntelliAudit evaluation design.

## Results

We organize results by the four research questions. Overall, Group A found IntelliAudit's recommendations understandable and evidence-grounded, while Group B found them useful for identifying gaps and next steps. The results also show limits: sufficiency judgments were harder than control interpretation, spreadsheet-heavy cases exposed completeness errors, and human feedback often corrected overly permissive recommendations. Thus, IntelliAudit is best viewed as an audit-assistance system for evidence review and preparation, not autonomous certification.

Control Understanding (RQ1).

Group A rated whether each recommendation reflected the semantic intent of the control rather than a surface reading of the control text. As shown in Table [3](https://arxiv.org/html/2608.07688v1#Sx6.T3), the ratings were consistently positive, with an overall mean of 3.92 (SD = 0.83) and 86% of the responses equal to 4 or 5. This suggests that Group A generally found that the explanations of IntelliAudit were aligned with the control objectives evaluated.

The main interpretation errors were not random misunderstandings, but overly narrow assumptions about required evidence. For Control 5.1, IntelliAudit treated the absence of training-completion records as an acknowledgment gap, although other mechanisms may satisfy the control. For Control 5.2, it treated a responsibility matrix as effectively required, although the control requires responsibilities to be defined and allocated, not documented in a specific format. These cases suggest that IntelliAudit usually identifies what a control asks for, but may convert flexible audit criteria into overly specific evidence expectations. RQ1 therefore supports IntelliAudit for control interpretation, while motivating stronger calibration between admissible evidence examples and mandatory evidence requirements. RQ2 evaluates whether the cited evidence justifies the assigned status.

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 3: Per-control mean (SD) Likert ratings. RQ1–RQ2 from Group A ( n = 12 n=12 – 17 17 per control), RQ4 from Group B ( n = 24 n=24 – 30 30 ).

Evidence-Grounded Assessment (RQ2).

Group A separately rated whether IntelliAudit's evidence evaluation was factually accurate and whether the submitted evidence justified the assigned status. As shown in Table [3](https://arxiv.org/html/2608.07688v1#Sx6.T3), factual evaluation was rated higher than evidence fulfillment, with overall means of 3.75 (SD = 1.04) and 3.20 (SD = 1.32), respectively. This distinction matters because low fulfillment scores often reflect intentionally incomplete benchmark evidence rather than system error. For Control 5.11, Group A gave a low fulfillment score because the evidence did not fully support the control, but a higher factual-evaluation score because IntelliAudit correctly identified evidence weaknesses. This suggests that IntelliAudit can often evaluate available evidence accurately even when the audit conclusion is adverse or only partially supported.

The main RQ2 failures involved evidence completeness and status calibration. Control 5.9 exposed a population-level spreadsheet reasoning error: IntelliAudit generalized from part of the asset inventory and missed other asset categories. Control 5.29 exposed a retrieval-scoping issue, where relevant incident evidence was associated with the consolidated 5.25–5.27 evidence path and was not surfaced for the disruption-control assessment. Controls 5.24 and 6.4 exposed calibration errors: IntelliAudit identified substantive gaps but still assigned overly permissive labels in some cases.

Overall, RQ2 shows that IntelliAudit is more reliable at factual evidence interpretation than at the harder audit task of converting evidence gaps into calibrated sufficiency judgments. This motivates stronger completeness checks, cross-control evidence linking, and stricter label calibration before such systems are used beyond assisted audit review.

Reasoning Across Artifact Types (RQ3).

RQ3 is a descriptive within-study comparison, not a modality benchmark: we group existing RQ1, RQ2, and RQ4 ratings by each case's primary evidence type, and controls and organizations were not randomized across types. As shown in Figure [4](https://arxiv.org/html/2608.07688v1#Sx6.F4), Group A ratings were similar across processed text, PDF, and spreadsheet evidence: 3.80 (SD = 0.99, n = 174 n=174 ratings), 3.93 (SD = 0.72, n = 55 n=55 ), and 3.85 (SD = 0.96, n = 114 n=114 ), respectively. Group B ratings followed the same pattern for text and PDFs, with means of 3.99 (SD = 0.86, n = 151 n=151 ) and 4.10 (SD = 0.89, n = 52 n=52 ), but were lower for spreadsheets at 3.47 (SD = 1.39, n = 98 n=98 ).

Within this study, IntelliAudit's outputs were rated similarly on narrative documents, processed PDFs, and structured spreadsheet records. Spreadsheet cases reveal the main limitation: although aggregate ratings remained reasonable, Control 5.9 exposed a population-level completeness error in which IntelliAudit generalized from part of an asset inventory rather than checking the full spreadsheet. RQ3 provides descriptive evidence of IntelliAudit's cross-artifact applicability.

Audit-Preparation Usefulness (RQ4).

Group B rated whether IntelliAudit helped them identify deficiencies and determine what to do next. Across the 12 assessment units (14 ISO 27001 controls; 5.25–5.27 consolidated), the mean usefulness rating was 3.84 (SD = 1.10, n = 301 n=301 response-level ratings across four organizations)), indicating that Group B generally found the output actionable. Ratings were strongest when the recommendation connected a concrete evidence gap to a clear remediation step, such as producing missing policy evidence, clarifying roles, or supplying additional records. These ratings measure audit-preparation usefulness; sufficiency judgments remain with Group A. This distinction is important because IntelliAudit is intended to help organizations prepare evidence and understand deficiencies, while leaving final audit conclusions to professional auditors.

1 2 3 4 5 Mean rating (1–5) Unstructured text (DOC/TXT) n = 174 / 151 n{=}174/151 PDF n = 55 / 52 n{=}55/52 Semi-structured (XLSX) n = 114 / 98 n{=}114/98 Group A (RQ1+RQ2) Group B (RQ4) Figure 4: Ratings by primary evidence type (RQ3), reported as mean ± 1 \pm 1 SD.

Effect of Multi-Agent Review.

The multi-agent stages are designed for selective escalation rather than routine rewriting. Across 48 control cases (12 assessment units × \times 4 organizations), the Judge was activated in 5 cases (10.4%). Among these activated cases, it changed the Auditor-only status in 3 and preserved it in 2. All changes were stricter: one moved from PARTIAL to INSUFFICIENT_EVIDENCE, and two moved from PARTIAL to NON_COMPLIANT; none made the recommendation more permissive. Overall, 44 of 48 final statuses (91.7%) matched the Auditor-agent-only label; of the four non-matches, three were Judge revisions and one case produced no output.

We further evaluated the five activation cases through a blinded forced-choice comparison (three reviewers, 15 judgments). Reviewers preferred the Judge-final output in 9 of 15 judgments, concentrated in status-changing cases (7 of 9); in the two status-preserving cases they preferred the Auditor-agent-only output (4 of 6). Given five purposively selected cases, we read this as reviewer preference on contested cases, not evidence of general multi-agent superiority.

Human Feedback as Audit Calibration.

Human feedback provides a second reliability mechanism by allowing Group A to challenge provisional recommendations. Group A interacted with the Judge in 27 case reviews (one auditor evaluating one case; six auditors, 20 distinct cases) with 15 reviews changing status after re-adjudication. Most revisions were stricter; 13 of 15 moved away from a more permissive status, and 9 of 15 began as COMPLIANT. No revision ended as COMPLIANT.

This addresses a central audit risk: unsupported positive findings. The feedback mechanism acted as a conservative calibration layer, allowing Group A to flag missing evidence, scope assumptions, or overly permissive conclusions for evidence-grounded re-adjudication rather than manual overwrite. For example, feedback on Control 5.30 revised a COMPLIANT finding to INSUFFICIENT_EVIDENCE because continuity-testing evidence was missing; Control 6.4 similarly moved downward in all three feedback-driven re-adjudications after Group A noted the missing disciplinary policy. Thus, human oversight is part of IntelliAudit's calibration process while preserving traceability between evidence, auditor challenge, and revised recommendation.

## Conclusion

IntelliAudit represents a step toward human-centered, AI-assisted auditing in which recommendations remain evidence-grounded, inspectable, and contestable. Our findings show the potential of selectively escalated agents to support complex audit reasoning, while reinforcing the need for professional oversight. Looking forward, audit-assistance systems should combine agentic reasoning with deterministic verification, calibrated abstention, continuous evidence linking, and structured human governance. This direction can enable scalable audit support across standards without treating AI-generated recommendations as autonomous certification decisions.

## Acknowledgments

We are grateful to the audit professionals and cybersecurity-informed participants who generously contributed their time, expertise, and feedback to our evaluation.

## References

Abootorabi et al. (2025) Abootorabi, M. M.; Zobeiri, A.; Dehghani, M.; Mohammadkhani, M.; Mohammadi, B.; Ghahroodi, O.; Baghshah, M. S.; and Asgari, E. 2025. Ask in Any Modality: A Comprehensive Survey on Multimodal Retrieval-Augmented Generation. arXiv:2502.08826.

Agarwal et al. (2025) Agarwal, B.; Jomraj, H. S.; Kaplunov, S.; Krolick, J.; and Rojkova, V. 2025. RAGulating Compliance: A Multi-Agent Knowledge Graph for Regulatory QA. arXiv:2508.09893.

AICPA (2022) AICPA. 2022. TSP Section 100: 2017 Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy (With Revised Points of Focus — 2022). American Institute of Certified Public Accountants, New York, NY. Control criteria for SOC 2 examinations.

Amaral Cejas et al. (2023) Amaral Cejas, O.; Azeem, M. I.; Abualhaija, S.; and Briand, L. C. 2023. NLP-Based Automated Compliance Checking of Data Processing Agreements Against GDPR. *IEEE Transactions on Software Engineering*, 49(9): 4282–4303.

Amirizaniani et al. (2024) Amirizaniani, M.; Yao, J.; Lavergne, A.; Okada, E. S.; Chadha, A.; Roosta, T.; and Shah, C. 2024. LLMAuditor: A Framework for Auditing Large Language Models Using Human-in-the-Loop. arXiv:2402.09346.

Chin et al. (2025) Chin, J. H.; Zhang, P.; Cheong, Y. X.; and Pan, J. 2025. Automating Security Audit Using Large Language Model based Agent: An Exploration Experiment. arXiv:2505.10732.

Chung et al. (2025) Chung, J.; Ko, R.; Yoo, W.; Onizuka, M.; Kim, S.; Kim, T.-W.; and Shin, W.-Y. 2025. GraphCompliance: Aligning Policy and Context Graphs for LLM-Based Regulatory Compliance. arXiv:2510.26309.

CyberSeek (2024) CyberSeek. 2024. CyberSeek: Cybersecurity Supply/Demand Heat Map. https://www.cyberseek.org/. Produced by CompTIA and Lightcast in partnership with NICE. October 2024 data release (457,398 cybersecurity job postings, Sept. 2023–Aug. 2024). Accessed: 2026-07-24.

Du et al. (2023) Du, Y.; Li, S.; Torralba, A.; Tenenbaum, J. B.; and Mordatch, I. 2023. Improving Factuality and Reasoning in Language Models through Multiagent Debate. arXiv:2305.14325.

Gao et al. (2024) Gao, Y.; Xiong, Y.; Gao, X.; Jia, K.; Pan, J.; Bi, Y.; Dai, Y.; Sun, J.; Wang, M.; and Wang, H. 2024. Retrieval-Augmented Generation for Large Language Models: A Survey. arXiv:2312.10997.

Guo et al. (2024) Guo, T.; Chen, X.; Wang, Y.; Chang, R.; Pei, S.; Chawla, N. V.; Wiest, O.; and Zhang, X. 2024. Large Language Model based Multi-Agents: A Survey of Progress and Challenges. arXiv:2402.01680.

Harrasse, Bandi, and Bandi (2026) Harrasse, A.; Bandi, C.; and Bandi, H. 2026. Debate, Deliberate, Decide (D3): A Cost-Aware Adversarial Framework for Reliable and Interpretable LLM Evaluation. In *Proceedings of the 19th Conference of the European Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)*, 8376–8392. Rabat, Morocco: Association for Computational Linguistics.

Hillebrand et al. (2024) Hillebrand, L.; Berger, A.; Uedelhoven, D.; Berghaus, D.; Warning, U.; Dilmaghani, T.; Kliem, B.; Schmid, T.; Loitz, R.; and Sifa, R. 2024. Advancing Risk and Quality Assurance: A RAG Chatbot for Improved Regulatory Compliance. In *2024 IEEE International Conference on Big Data (BigData)*, 8668–8670.

Huang et al. (2022) Huang, Y.; Lv, T.; Cui, L.; Lu, Y.; and Wei, F. 2022. LayoutLMv3: Pre-training for Document AI with Unified Text and Image Masking. arXiv:2204.08387.

ISC2 (2024) ISC2. 2024. ISC2 Cybersecurity Workforce Study 2024. https://www.isc2.org/Insights/2024/10/ISC2-2024-Cybersecurity-Workforce-Study. Accessed: 2026-07-24.

ISC2 (2025) ISC2. 2025. ISC2 Cybersecurity Workforce Study 2025. https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study. Accessed: 2026-07-24.

ISO/IEC (2022) ISO/IEC. 2022. ISO/IEC 27001:2022, Information Security, Cybersecurity and Privacy Protection — Information Security Management Systems — Requirements. International Organization for Standardization, Geneva, Switzerland. Third edition.

Lewis et al. (2020) Lewis, P.; Perez, E.; Piktus, A.; Petroni, F.; Karpukhin, V.; Goyal, N.; Küttler, H.; Lewis, M.; tau Yih, W.; Rocktäschel, T.; Riedel, S.; and Kiela, D. 2020. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. Published in Advances in Neural Information Processing Systems 33 (NeurIPS 2020), arXiv:2005.11401.

McIntosh et al. (2024) McIntosh, T. R.; Susnjak, T.; Liu, T.; Watters, P.; Nowrozy, R.; and Halgamuge, M. N. 2024. From COBIT to ISO 42001: Evaluating Cybersecurity Frameworks for Opportunities, Risks, and Regulatory Compliance in Commercializing Large Language Models. *Computers & Security*, 144: 103964. ArXiv:2402.15770.

National Institute of Standards and Technology (2024) National Institute of Standards and Technology. 2024. The NIST Cybersecurity Framework (CSF) 2.0. NIST Cybersecurity White Paper (CSWP) 29, Gaithersburg, MD. DOI: 10.6028/NIST.CSWP.29.

OpenAI (2024) OpenAI. 2024. New Embedding Models and API Updates. https://openai.com/index/new-embedding-models-and-api-updates/.

PCI Security Standards Council (2024) PCI Security Standards Council. 2024. Payment Card Industry Data Security Standard: Requirements and Testing Procedures, Version 4.0.1. PCI Security Standards Council, Wakefield, MA.

Rastogi et al. (2023) Rastogi, C.; Ribeiro, M. T.; King, N.; Nori, H.; and Amershi, S. 2023. Supporting Human-AI Collaboration in Auditing LLMs with LLMs. arXiv:2304.09991.

Riasat and Brachten (2024) Riasat, S. I.; and Brachten, C. E. W. 2024. Automating ISO 27001 Consultancy and Auditing using AI: A Feasibility Study Based on Expert Interviews. Preprint, Utrecht University, supervised by R. L. Jansen.

Singh et al. (2025) Singh, A.; Ehtesham, A.; Kumar, S.; Khoei, T. T.; and Vasilakos, A. V. 2025. Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG. arXiv:2501.09136.

Tran et al. (2025) Tran, K.-T.; Dao, D.; Nguyen, M.-D.; Pham, Q.-V.; O'Sullivan, B.; and Nguyen, H. D. 2025. Multi-Agent Collaboration Mechanisms: A Survey of LLMs. arXiv:2501.06322.

Waikar, Bhat, and Ramanathan (2026) Waikar, S.; Bhat, A. G.; and Ramanathan, M. 2026. Retrieval Augmented Generation (RAG) for Evaluating Regulatory Compliance of Drug Information and Clinical Trial Protocols. *CPT: Pharmacometrics & Systems Pharmacology*, 15(3): e70201.

Wang et al. (2024) Wang, D.; Raman, N.; Sibue, M.; Ma, Z.; Babkin, P.; Kaur, S.; Pei, Y.; Nourbakhsh, A.; and Liu, X. 2024. DocLLM: A Layout-Aware Generative Language Model for Multimodal Document Understanding. In *Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, 8529–8548. Bangkok, Thailand: Association for Computational Linguistics.

Wang et al. (2025a) Wang, R.; Liu, J.; Zhao, W.; Li, S.; and Zhang, D. 2025a. Automating Financial Statement Audits with Large Language Models. arXiv:2506.17282.

Wang et al. (2026) Wang, Y.; Ai, X.; Patel, J.; Peng, X.; Mo, F.; Cao, Y.; Li, H.; Cao, M.; Qian, L.; and Gutiérrez-Basulto, V. 2026. AuditFlow: Executable Symbolic Environments for Structured Financial Reporting Verification. arXiv:2606.03031.

Wang et al. (2025b) Wang, Y.; Wang, K.; Yang, S.; Patel, J.; Zhao, J.; Mo, F.; Peng, X.; Qian, L.; Chen, Y.; Gutiérrez-Basulto, V.; Huang, J.; Xiong, G.; Liu, X.-Y.; Liu, X.; and Nie, J.-Y. 2025b. FinAuditing: A Financial Taxonomy-Structured Multi-Document Benchmark for Evaluating LLMs. Accepted to SIGIR 2026 (Resource Track), arXiv:2510.08886.

Xu et al. (2020) Xu, Y.; Li, M.; Cui, L.; Huang, S.; Wei, F.; and Zhou, M. 2020. LayoutLM: Pre-training of Text and Layout for Document Image Understanding. In *Proceedings of the 26th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining*, KDD '20, 1192–1200. ACM.

Xu et al. (2021) Xu, Y.; Xu, Y.; Lv, T.; Cui, L.; Wei, F.; Wang, G.; Lu, Y.; Florencio, D.; Zhang, C.; Che, W.; Zhang, M.; and Zhou, L. 2021. LayoutLMv2: Multi-modal Pre-training for Visually-Rich Document Understanding. Published at ACL-IJCNLP 2021, arXiv:2012.14740.

Yao et al. (2024) Yao, X.; Wu, X.; Li, X.; Xu, H.; Li, C.; Huang, P.; Li, S.; Ma, X.; and Shan, J. 2024. Smart Audit System Empowered by LLM. arXiv:2410.07677.

Zou et al. (2025) Zou, H. P.; Huang, W.-C.; Wu, Y.; Guo, J.; Chen, Y.; Miao, C.; Nguyen, H.; Zhou, Y.; Zhang, W.; Fang, L.; Zhang, H.; Wang, F.; Zhang, P.; Wang, H.; He, L.; Li, Y.; Li, D.; Jiang, R.; Liu, X.; and Yu, P. S. 2025. LLM-Based Human-Agent Collaboration and Interaction Systems: A Survey. Accepted at ACL 2026, arXiv:2505.00753.

Experimental support, please [view the build logs](https://arxiv.org/html/2608.07688v1/__stdout.txt) for errors. Generated by [L A T E xml[LOGO]](https://math.nist.gov/~BMiller/LaTeXML/)

.

## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the methods listed below:

Click the "Report Issue" ( ) button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified [the following issues](https://github.com/arXiv/html_feedback/issues). We appreciate your time reviewing and reporting rendering errors we may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability should not be a barrier to accessing research. Thank you for your continued support in championing open access for all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a [list of packages that need conversion](https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML), and welcome [developer contributions](https://github.com/brucemiller/LaTeXML/issues).

We gratefully acknowledge support from our **major funders**, [member institutions](https://info.arxiv.org/about/ourmembers.html), , and all contributors.

[About](https://info.arxiv.org/about)

· [Help](https://info.arxiv.org/help)

· [Contact](https://info.arxiv.org/help/contact.html)

· [Subscribe](https://info.arxiv.org/help/subscribe)

· [Copyright](https://info.arxiv.org/help/license/index.html)

· [Privacy](https://info.arxiv.org/help/policies/privacy_policy.html)

· [Accessibility](https://info.arxiv.org/help/web_accessibility.html)

· [Operational Status (opens in new tab)](https://status.arxiv.org/)

Major funding support from