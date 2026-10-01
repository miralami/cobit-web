# AI Model Risk Management in Finance: The 2026 Practitioner's Framework | Finrep Blog

AI Model Risk Management in Finance: The 2026 Practitioner's Framework | Finrep Blog

[Platform](https://www.finrep.ai/) [Use Cases](https://www.finrep.ai/use-cases) [Pricing](https://www.finrep.ai/pricing) [Security](https://www.finrep.ai/security) [Whitepaper](https://www.finrep.ai/whitepaper)

[Login](https://app.finrep.ai/) Start Free Trial

Authors 

Gana Misra

CEO, Finrep

Share

By Gana Misra

• CEO, Finrep

Wed Sep 09 2026

# AI Model Risk Management in Finance: The 2026 Practitioner's Framework

Share

# AI Model Risk Management in Finance: The 2026 Practitioner's Framework

If your institution is deploying AI or ML models in credit, AML, trading, or compliance functions, the question is no longer whether SR 11-7 applies. It does. The real question is how to operationalise AI-specific controls, from explainability requirements to GenAI hallucination testing, within a governance structure that satisfies examiners in Washington, London, Brussels, and Singapore simultaneously.

This walkthrough is for CFOs, Chief Risk Officers, and model risk teams who have moved past the basics and need a concrete, sequenced framework for 2026.

**Key takeaway:** SR 11-7 and OCC 2011-12 remain the foundational US framework for AI model risk management, but they were written for traditional statistical models. Institutions that simply bolt AI onto existing MRM programmes without addressing opacity, concept drift, and GenAI-specific risks are building examination findings into their roadmap.

## Does SR 11-7 Apply to Your AI and ML Models?

**Yes, and regulators have said so explicitly.** The Federal Reserve's [SR 11-7](https://www.federalreserve.gov/boarddocs/srletters/2011/sr1107.htm) defines a model as "a quantitative method, system, or approach that applies statistical, economic, financial, or mathematical theories, techniques, and assumptions to process input data into quantitative estimates." That definition captures most ML systems used in financial services.

The [April 2021 Interagency Statement](https://www.federalreserve.gov/newsevents/pressreleases/files/bcreg20210409a2.pdf), issued jointly by the Fed, OCC, FDIC, FinCEN, and NCUA, removed any remaining ambiguity by explicitly extending SR 11-7 obligations to AI/ML models used in BSA/AML and OFAC compliance. The statement is unambiguous: "Banks are ultimately responsible for complying with BSA/AML requirements, even if they choose to use third-party models."

As [KPMG's technical analysis](https://kpmg.com/us/en/articles/2024/artificial-intelligence-and-model-risk-management.html) puts it: "One of the first questions financial institutions should ask themselves when building and implementing AI/ML technology is whether it meets the organization's definition of a model. More times than not, the answer is yes given the conventional components of a model (input, calculation, and output)."

The Federal Reserve's 2023 supervision report ranked model risk management among the top three areas of supervisory concern, with AI/ML governance specifically cited as an emerging examination priority for 2024 and 2025. If your AI model inventory is not under formal MRM governance, that is where examiners will start.

## Where SR 11-7 Breaks Down for AI: The Four Gaps

SR 11-7 provides the foundation, but it was designed for econometric and statistical models, not neural networks or large language models. [KPMG notes](https://kpmg.com/us/en/articles/2024/artificial-intelligence-and-model-risk-management.html) that existing MRM guidelines "offer a strong foundation" but "require meaningful strengthening" to address AI-specific challenges. The four specific gaps practitioners need to close:

**Opacity.** Many ML models use proprietary algorithms that cannot be fully inspected. Traditional validation assumes you can examine the model's mathematical structure. With a black-box neural network or a third-party vendor model, you often cannot.

**Concept drift.** Traditional models are validated on a schedule, then monitored periodically. ML models can degrade silently as real-world data distributions shift away from training data. Unlike a regression model, a gradient-boosted tree trained on 2021 credit data may perform very differently on 2026 applicants without triggering any obvious alert.

**Emergent GenAI behaviour.** Large language models produce probabilistic, non-deterministic outputs. The same prompt can generate different answers on consecutive runs. Defining "ground truth" for validation purposes, a prerequisite for traditional backtesting, is genuinely difficult. The [MAS 2024 information paper](https://www.mas.gov.sg/publications/monographs-or-information-paper/2024/artificial-intelligence-model-risk-management), based on actual supervisory reviews of financial institutions, treats GenAI as a qualitatively distinct risk category requiring governance beyond standard MRM frameworks.

**Materiality thresholds.** SR 11-7 was designed around models that make one large decision, a credit limit, a capital number. AI models are increasingly embedded in thousands of micro-decisions simultaneously. Applying traditional materiality concepts to a model that influences 50,000 daily loan decisions requires a different calibration.

## Step 1: Build a Complete AI Model Inventory

**The most common examination finding is an incomplete model inventory.** A 2022 Bank of England survey found that 72% of UK financial institutions were already using ML in some form, with a median of 4 ML models in production per firm, but the range extended to over 100 models at the largest institutions. Many of those models were embedded in third-party software or built by business units outside of IT, making them invisible to the central MRM function.

Your inventory must capture:

Model name, owner, and business unit

Model type (traditional statistical, ML/AI, GenAI/LLM)

Use case and decision it influences

Whether the model is internally developed or third-party

Data inputs and training data provenance

Current validation status and last review date

Regulatory classification (see Step 2)

Inventory sprawl is real. Assign a named model owner in the first line of defence for every entry, and require business units to notify the MRM function before deploying any new AI tool, not after.

## Step 2: Classify and Tier Every AI Model

**Not every AI tool needs the same level of MRM treatment.** The tiering decision is where most institutions lose time, either over-governing low-risk tools or under-governing high-risk ones. Use this classification framework:

|   |   |   |

| --- | --- | --- |

|   |   |   |

|   |   |   |

|   |   |   |

The classification decision should be made jointly by the model owner (first line), the model risk function (second line), and, for any GenAI tool, your legal and compliance team. Document the rationale. Examiners will ask.

One practical test: if the model's output can trigger a regulatory obligation, an adverse action notice, a SAR filing, a capital add-on, it is Tier 1 regardless of how the vendor markets it.

## Step 3: Validate AI Models with the Right Techniques

**Traditional backtesting and sensitivity analysis are necessary but not sufficient for AI/ML models.** The OCC's Comptroller's Handbook on Model Risk Management requires independent validation, and examiners are now trained to assess AI-specific risks including explainability, bias, and data governance.

For ML models, add these techniques to your standard validation toolkit:

**Explainability analysis.** Use SHAP (SHapley Additive exPlanations) or LIME (Local Interpretable Model-agnostic Explanations) to identify which input features drive individual model outputs. This is not optional for consumer-facing credit models: the CFPB's 2023 guidance clarified that "the model said no" is not an acceptable adverse action reason. You must be able to extract and communicate the specific factors that drove a denial.

**Bias and disparate impact testing.** Test model outputs, not just inputs, across protected classes. The CFPB has signalled that algorithmic bias in credit decisions violates ECOA and the Fair Housing Act regardless of intent.

**Adversarial testing.** Stress-test model outputs with edge-case and out-of-distribution inputs to identify failure modes that standard performance metrics miss.

**Concept drift monitoring.** Establish statistical thresholds for input distribution shift and output performance degradation. When thresholds are breached, trigger an automated escalation to the model owner and second line.

For GenAI models (LLMs used for financial analysis, report generation, or compliance functions), standard validation approaches break down further. Add:

**Red-teaming.** Systematically probe the model for hallucination, prompt injection vulnerabilities, and outputs that contradict known facts or regulatory requirements. See our [AI hallucination in financial reporting walkthrough](https://finrep.ai/blog/ai-hallucination-in-financial-reporting-a-2026-practitioner-walkthrough) for specific control patterns.

**Output sampling and human review.** Because GenAI outputs are non-deterministic, validation must include repeated sampling across a range of inputs, not a single test run.

**Ground truth benchmarking.** Define the reference dataset or authoritative source against which outputs will be evaluated before deployment, not after.

## Step 4: Solve the Third-Party Vendor Problem

**Regulators hold you responsible for models you don't own and can't fully inspect.** This is the most operationally difficult aspect of AI MRM in 2026. As [Jason Chorlins at Kaufman Rossin notes](https://kaufmanrossin.com/blog/managing-ai-model-risk-in-financial-institutions-best-practices-for-compliance-and-governance/): "Model risk increases with a model's inherent complexity, and AI/ML-based third-party models present particular challenges for financial institutions to understand and be able to explain how they operate. Nonetheless, regulators hold institutions responsible for mitigating risk and ensuring the conceptual soundness of any model or algorithm their systems use."

The 2021 Interagency Statement is equally direct: "Sound risk management practices include obtaining sufficient information from the third party to understand how the model operates and performs, ensuring that it is working as expected, and tailoring its use to the unique risk profile of the bank."

Your vendor contracts for any Tier 1 or Tier 2 AI model should include:

**Model documentation access.** Sufficient technical documentation to understand model architecture, training data characteristics, key assumptions, and known limitations, even if the vendor will not share source code.

**Performance data sharing.** Ongoing model performance metrics, including drift indicators, delivered at a defined frequency.

**Notification of model updates.** A contractual obligation for the vendor to notify you before any material model change or retraining, with a defined window for your institution to re-validate before the update goes live.

**Audit rights.** The right to have an independent third party (or your internal audit function) review vendor model documentation and performance data.

**Right to validate on your own data.** The ability to run the model against your institution's own historical data to assess performance in your specific context.

If a vendor refuses all of these terms, that refusal is itself a model risk finding. Document it and escalate to your model risk committee.

Regulators evaluate third-party models through your MRM documentation. As Chorlins puts it: "Regulators typically evaluate third-party models through the institution's model risk management documentation, which must be comprehensive and detailed so that a knowledgeable third party can recreate the model without access to the model development code."

## Step 5: Build Continuous Monitoring, Not Periodic Review

**Concept drift is the silent killer of ML model performance.** Unlike a traditional model that you validate once and monitor quarterly, an ML model trained on historical data can degrade continuously as market conditions, customer behaviour, or regulatory environments shift. [KPMG's analysis](https://kpmg.com/us/en/articles/2024/artificial-intelligence-and-model-risk-management.html) identifies concept drift as one of the most operationally challenging AI-specific risks, requiring investment in MLOps infrastructure that most traditional MRM teams do not have.

Your continuous monitoring programme should include:

**Automated drift detection.** Monitor both input data distributions (feature drift) and model output distributions (prediction drift) against baseline thresholds established at validation.

**Performance KPIs with escalation triggers.** Define the specific metrics, accuracy, precision, recall, Gini coefficient, PSI (Population Stability Index), that will trigger a model review or suspension. Document these thresholds in the model's governance record.

**Escalation protocols.** When a threshold is breached, who is notified, within what timeframe, and what actions are required? This should be documented and tested.

**Retraining governance.** When a model is retrained on new data, does that trigger a full re-validation? Regulators have not issued definitive guidance on this, but the conservative position is that material retraining on new data constitutes a model change requiring at minimum an expedited validation review.

## Step 6: Structure Governance Across Three Lines

**The three-lines-of-defence model applies to AI MRM, but the talent requirements are different.** [KPMG's analysis](https://kpmg.com/us/en/articles/2024/artificial-intelligence-and-model-risk-management.html) identifies significant talent gaps in the second and third lines for AI/ML expertise at most institutions.

|   |   |   |

| --- | --- | --- |

|   |   |   |

|   |   |   |

|   |   |   |

For board and audit committee reporting, the PRA's SS1/23, published April 2023, requires firms to report model risk to the board at least annually and to maintain a formal model risk appetite statement approved at board level. Even for US institutions not subject to SS1/23, these are increasingly treated as best practice by examiners. Your board reporting pack should include: number of models by tier, validation backlog, open findings by severity, and any models operating outside approved parameters.

For a deeper look at how AI governance intersects with SOX ICFR controls, see our [AI prohibited uses in SOX ICFR walkthrough](https://finrep.ai/blog/ai-prohibited-uses-in-sox-icfr-controls-the-2026-governance-map).

## The EU AI Act Overlay: What Changes from August 2026

**If your institution operates in the EU, you now have a hard legal layer on top of MRM supervisory expectations.** The [EU AI Act (Regulation 2024/1689)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) became fully applicable for high-risk AI systems in August 2026. AI systems used in credit scoring, insurance risk assessment, and certain financial compliance functions are classified as high-risk.

High-risk designation under the EU AI Act requires:

**Mandatory conformity assessments** before deployment

**Technical documentation** covering system design, training data, performance metrics, and risk management measures

**Human oversight obligations** ensuring a human can intervene in or override AI decisions

**Registration** in the EU AI Act database

**Post-market monitoring** of system performance

For multinationals, this creates a dual compliance burden: SR 11-7 (or SS1/23 for UK entities) for prudential MRM, and the EU AI Act for legal conformity. The practical answer is to build your MRM documentation to the higher standard, which in most cases means the EU AI Act's technical documentation requirements, and use that documentation to satisfy both frameworks. The EBA's [Guidelines on Internal Governance (EBA/GL/2021/05)](https://www.eba.europa.eu/regulation-and-policy/internal-governance/guidelines-on-internal-governance) add EU-specific requirements around non-discrimination, GDPR data governance, and explainability for consumer-facing decisions.

The [NIST AI RMF 1.0](https://airc.nist.gov/airmf-resources/airmf/), published January 2023, provides a voluntary but increasingly adopted governance structure whose four functions, GOVERN, MAP, MEASURE, MANAGE, map reasonably well onto the three-lines-of-defence model and complement SR 11-7. Many US institutions are adopting NIST AI RMF as their internal AI governance standard alongside regulatory MRM requirements, which also helps satisfy the EU AI Act's risk management documentation expectations.

## What Examiners Are Actually Looking For in 2026

Based on the regulatory guidance and supervisory observations in the [MAS 2024 paper](https://www.mas.gov.sg/publications/monographs-or-information-paper/2024/artificial-intelligence-model-risk-management) and the OCC's Comptroller's Handbook, examiners reviewing AI MRM programmes in 2026 will focus on:

**Completeness of the model inventory.** Is every AI/ML tool in production captured, including those embedded in third-party software?

**Tiering rationale.** Is the classification of each model as high, medium, or low risk documented and defensible?

**Independent validation.** Has each Tier 1 model been independently validated before deployment, and is the validation current?

**Explainability for consumer decisions.** Can the institution produce the specific factors that drove an adverse action for any AI-based credit or compliance decision?

**Third-party model documentation.** Does the institution have sufficient vendor documentation to understand how third-party AI models operate, even if source code is not available?

**Concept drift monitoring.** Are there automated monitoring systems with defined thresholds and escalation protocols?

**GenAI governance.** Are LLMs and other generative tools subject to formal model risk treatment, or are they being used informally without governance?

As Chorlins warns: "Improper or insufficient model risk management can have significant consequences, such as erosion of regulators' trust, formal or informal regulatory actions including the possibility of expensive look-backs and remediation and regulatory fines, damaged reputation, financial loss, and internal inefficiencies."

For institutions building or upgrading their AI governance programmes, our [ISO 42001 vendor due diligence walkthrough](https://finrep.ai/blog/iso-42001-financial-reporting-vendor-due-diligence-a-2026-practitioner-walkthrou) covers the contractual and certification standards that complement the MRM framework described here.

## FAQ

**Does SR 11-7 apply to a GenAI tool we use internally for financial analysis?** Almost certainly yes, if the tool's output influences a quantitative estimate or decision. Apply the SR 11-7 model definition test: does it take inputs, apply a calculation or inference process, and produce a quantitative output that informs a business decision? If yes, it is a model. The MAS 2024 paper and the 2021 Interagency Statement both support this reading.

**How much explainability is enough for a credit AI model?** The CFPB's 2023 guidance sets the floor: you must be able to provide specific, accurate reasons for any adverse action, not a generic reference to the model. SHAP or LIME analysis at the individual decision level is the current best practice. The EU AI Act adds a human oversight requirement for high-risk systems, meaning a human must be able to review and override the AI's output.

**What if our AI vendor won't share model architecture or training data?** You are still responsible for the model's performance. Demand the minimum documentation needed to satisfy the 2021 Interagency Statement standard: sufficient information to understand how the model operates and performs. If the vendor refuses, document that refusal, escalate to your model risk committee, and consider whether the model can be deployed under your MRM framework at all. Some institutions have required independent third-party audits of vendor models as a contractual condition.

**When does retraining an AI model trigger a full re-validation?** Regulators have not issued definitive guidance. The conservative and defensible position is that any material change to training data, model architecture, or hyperparameters constitutes a model change requiring at minimum an expedited validation review. Define "material" in your model risk policy before an examiner defines it for you.

**How do we report AI model risk to the board?** At minimum annually, per PRA SS1/23 best practice. Your board pack should include: total model inventory by tier, validation completion rate, open findings by severity, models operating outside approved parameters, and any new AI tools deployed since the last report. The goal is to give non-technical board members enough information to exercise meaningful oversight, not a technical deep-dive.

On this page

[Does SR 11-7 Apply to Your AI and ML Models?](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#does-sr-11-7-apply-to-your-ai-and-ml-models)

[Where SR 11-7 Breaks Down for AI: The Four Gaps](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#where-sr-11-7-breaks-down-for-ai-the-four-gaps)

[Step 1: Build a Complete AI Model Inventory](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#step-1-build-a-complete-ai-model-inventory)

[Step 2: Classify and Tier Every AI Model](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#step-2-classify-and-tier-every-ai-model)

[Step 3: Validate AI Models with the Right Techniques](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#step-3-validate-ai-models-with-the-right-techniques)

[Step 4: Solve the Third-Party Vendor Problem](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#step-4-solve-the-third-party-vendor-problem)

[Step 5: Build Continuous Monitoring, Not Periodic Review](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#step-5-build-continuous-monitoring-not-periodic-review)

[Step 6: Structure Governance Across Three Lines](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#step-6-structure-governance-across-three-lines)

[The EU AI Act Overlay: What Changes from August 2026](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#the-eu-ai-act-overlay-what-changes-from-august-2026)

[What Examiners Are Actually Looking For in 2026](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#what-examiners-are-actually-looking-for-in-2026)

[FAQ](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework#faq)

## You might also like

[

### AI Goodwill Impairment Testing Under ASC 350: A 2026 Practitioner Walkthrough

Sep 29, 2026](https://www.finrep.ai/blog/ai-goodwill-impairment-testing-under-asc-350-a-2026-practitioner-walkthrough)

[

### AI Board Reporting and Audit Committee Oversight in 2026: Closing the Confidence Gap

Sep 28, 2026](https://www.finrep.ai/blog/ai-board-reporting-and-audit-committee-oversight-in-2026-closing-the-confidence-)

[

### AI Variance Analysis in Financial Reporting: A 2026 Practitioner Walkthrough

Sep 28, 2026](https://www.finrep.ai/blog/ai-variance-analysis-in-financial-reporting-a-2026-practitioner-walkthrough)

## Run your financial reporting on Finrep

Start Free Trial

Platform

[Platform Overview](https://www.finrep.ai/) [Financial Reporting Intelligence](https://www.finrep.ai/financial-reporting-intelligence) [Use Cases](https://www.finrep.ai/use-cases) [Pricing](https://www.finrep.ai/pricing)

Company

[About](https://www.finrep.ai/about) [Contact](mailto:support@finrep.ai) [Careers](https://www.finrep.ai/careers) Become a Partner

Resources

[Blog](https://www.finrep.ai/blog) [Careers](https://www.finrep.ai/careers) [SEC Reporting Journal](https://secreportingjournal.com/) [Security](https://www.finrep.ai/security) [Privacy Policy](https://www.finrep.ai/privacy-policy) [Terms of Service](https://www.finrep.ai/terms-of-service) Cookie Preferences

Ask AI about 

[ChatGPT](https://chat.openai.com/?q=How%20does%20finrep.ai%20help%20CFOs%20automate%20SEC%20reporting%20and%20compliance%3F%20Focus%20on%20its%20AI%20features%2C%20automation%20capabilities%2C%20and%20benefits%20for%20finance%20teams.)

[Claude](https://claude.ai/new?q=How%20does%20finrep.ai%20help%20CFOs%20automate%20SEC%20reporting%20and%20compliance%3F%20Focus%20on%20its%20AI%20features%2C%20automation%20capabilities%2C%20and%20benefits%20for%20finance%20teams.)

[Perplexity](https://www.perplexity.ai/?q=How%20does%20finrep.ai%20help%20CFOs%20automate%20SEC%20reporting%20and%20compliance%3F%20Focus%20on%20its%20AI%20features%2C%20automation%20capabilities%2C%20and%20benefits%20for%20finance%20teams.)  

Backed By   

Keep researching with Finrep

“What must an auditor's procedures under PCAOB AS 2501 establish when an estimate relies on a machine-learning model?”

[Ask Finrep now](https://app.finrep.ai/fina/1f0f9e6c-7759-45c8-ab05-3e9f4a115e72)

[Ask Finrep now](https://app.finrep.ai/fina/1f0f9e6c-7759-45c8-ab05-3e9f4a115e72)

We value your privacy

We use essential cookies to keep Finrep running. With your permission, we also use cookies to see how the site is used so we can improve it. Read our [Privacy Policy](https://www.finrep.ai/privacy-policy).

Manage preferences Reject all Accept all