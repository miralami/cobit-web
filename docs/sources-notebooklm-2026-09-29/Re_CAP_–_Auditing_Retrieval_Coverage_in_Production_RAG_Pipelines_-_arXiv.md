# Re:CAP – Auditing Retrieval Coverage in Production RAG Pipelines - arXiv

Re:CAP – Auditing Retrieval Coverage in Production RAG Pipelines

Report GitHub Issue

×

Title:

Content selection saved. Describe the issue below:

Description:

Submit without GitHub Submit in GitHub 

arXiv is now an independent nonprofit! [Learn more](https://info.arxiv.org/about) ×

[arXiv logo Back to arXiv](https://arxiv.org/)

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html) [Report Issue](https://arxiv.org/html/2609.24122v1) [Back to Abstract](https://arxiv.org/abs/2609.24122v1) [Download PDF](https://arxiv.org/pdf/2609.24122v1)  

[Abstract](https://arxiv.org/html/2609.24122v1#abstract1)

[1 Introduction](https://arxiv.org/html/2609.24122v1#S1)

[2 Method](https://arxiv.org/html/2609.24122v1#S2)

[2.1 Setting and topic-based gaps](https://arxiv.org/html/2609.24122v1#S2.SS1)

[2.2 The Re:CAP loop](https://arxiv.org/html/2609.24122v1#S2.SS2)

[3 Experimental Setup](https://arxiv.org/html/2609.24122v1#S3)

[3.1 Datasets](https://arxiv.org/html/2609.24122v1#S3.SS1)

[3.2 Retrieval and models](https://arxiv.org/html/2609.24122v1#S3.SS2)

[3.3 Baselines](https://arxiv.org/html/2609.24122v1#S3.SS3)

[Re:CAP is an audit layer, not a competing retriever.](https://arxiv.org/html/2609.24122v1#S3.SS3.SSS0.Px1)

[3.4 Evaluation protocol](https://arxiv.org/html/2609.24122v1#S3.SS4)

[4 Results](https://arxiv.org/html/2609.24122v1#S4)

[4.1 Re:CAP vs. flat retrieval](https://arxiv.org/html/2609.24122v1#S4.SS1)

[4.2 Structural complementarity](https://arxiv.org/html/2609.24122v1#S4.SS2)

[4.3 Sensitivity to retrieval quality](https://arxiv.org/html/2609.24122v1#S4.SS3)

[4.4 Controlled gold-deletion check](https://arxiv.org/html/2609.24122v1#S4.SS4)

[4.5 Operational characteristics](https://arxiv.org/html/2609.24122v1#S4.SS5)

[Cost.](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px1)

[Reproducibility.](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2)

[Attribution of residual losses.](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px3)

[Production deployment.](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px4)

[5 Human evaluation of recovered gap documents](https://arxiv.org/html/2609.24122v1#S5)

[Setup.](https://arxiv.org/html/2609.24122v1#S5.SS0.SSS0.Px1)

[Result.](https://arxiv.org/html/2609.24122v1#S5.SS0.SSS0.Px2)

[6 Conclusion](https://arxiv.org/html/2609.24122v1#S6)

[Computational and environmental cost.](https://arxiv.org/html/2609.24122v1#Sx1.SS0.SSS0.Px1)

[Bias in gap discovery.](https://arxiv.org/html/2609.24122v1#Sx1.SS0.SSS0.Px2)

[Human annotation.](https://arxiv.org/html/2609.24122v1#Sx1.SS0.SSS0.Px3)

[Privacy and access control.](https://arxiv.org/html/2609.24122v1#Sx1.SS0.SSS0.Px4)

[Surface area for prompt injection.](https://arxiv.org/html/2609.24122v1#Sx1.SS0.SSS0.Px5)

[LLM cost.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px1)

[Judge reliability ceiling.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px2)

[Corpus coverage assumption.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px3)

[English only.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px4)

[Gap-Q generator dependence.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px5)

[Topic granularity.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px6)

[Instance-level coverage holes can be masked.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px7)

[Recall@ k k undercounts complementarity on pooled-graded corpora.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px8)

[Initial-retriever choice can cause cell-level regressions.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px9)

[Provider-side content filtering depresses recall.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px10)

[Calibrated metrics rest on benchmarks; production audit is a single snapshot.](https://arxiv.org/html/2609.24122v1#Sx2.SS0.SSS0.Px11)

[References](https://arxiv.org/html/2609.24122v1#bib)

[A Datasets and Rationale](https://arxiv.org/html/2609.24122v1#A1)

[B Related Work](https://arxiv.org/html/2609.24122v1#A2)

[Retrieval evaluation and coverage.](https://arxiv.org/html/2609.24122v1#A2.SS0.SSS0.Px1)

[RAG evaluation frameworks.](https://arxiv.org/html/2609.24122v1#A2.SS0.SSS0.Px2)

[Coverage-oriented RAG evaluation.](https://arxiv.org/html/2609.24122v1#A2.SS0.SSS0.Px3)

[LLM-as-judge and iterative retrieval.](https://arxiv.org/html/2609.24122v1#A2.SS0.SSS0.Px4)

[B.1 Positioning against closest prior work](https://arxiv.org/html/2609.24122v1#A2.SS1)

[Reading the columns.](https://arxiv.org/html/2609.24122v1#A2.SS1.SSS0.Px1)

[Conceptual precedent.](https://arxiv.org/html/2609.24122v1#A2.SS1.SSS0.Px2)

[C Default Re:CAP Configuration](https://arxiv.org/html/2609.24122v1#A3)

[C.1 Post-hoc topic deduplication (Step 5b)](https://arxiv.org/html/2609.24122v1#A3.SS1)

[Stage A — fuzzy string clustering (deterministic).](https://arxiv.org/html/2609.24122v1#A3.SS1.SSS0.Px1)

[Stage B — semantic merge against T T (LLM).](https://arxiv.org/html/2609.24122v1#A3.SS1.SSS0.Px2)

[D Deployment Recipe](https://arxiv.org/html/2609.24122v1#A4)

[Why hybrid retrieval.](https://arxiv.org/html/2609.24122v1#A4.SS0.SSS0.Px1)

[Attributing a metric move: retrieval drift vs. judge or reader drift.](https://arxiv.org/html/2609.24122v1#A4.SS0.SSS0.Px2)

[Cost-sensitive deployments.](https://arxiv.org/html/2609.24122v1#A4.SS0.SSS0.Px3)

[E Production Deployment Case Studies](https://arxiv.org/html/2609.24122v1#A5)

[Deployment.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px1)

[Configuration.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px2)

[Sample.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px3)

[Stability.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px4)

[Coverage signal.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px5)

[Where topics come from.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px6)

[LLM usage and cost.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px7)

[NEWS QA cohort: deltas from AI Search.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px8)

[Worked example (i) — AI Search ( idr news).](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px9)

[Worked example (ii) — NEWS QA (Tyler Technologies).](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px10)

[Scope of these case studies.](https://arxiv.org/html/2609.24122v1#A5.SS0.SSS0.Px11)

[F Human Evaluation on the Production Cohorts](https://arxiv.org/html/2609.24122v1#A6)

[Setup.](https://arxiv.org/html/2609.24122v1#A6.SS0.SSS0.Px1)

[Result.](https://arxiv.org/html/2609.24122v1#A6.SS0.SSS0.Px2)

[F.1 Adjudication pass](https://arxiv.org/html/2609.24122v1#A6.SS1)

[G Full Cross-Dataset Results (Including TREC-COVID Matrix)](https://arxiv.org/html/2609.24122v1#A7)

[H Recall vs. Retrieval Depth](https://arxiv.org/html/2609.24122v1#A8)

[I Cross-model re-judgement](https://arxiv.org/html/2609.24122v1#A9)

[J Pseudo-Relevance Feedback Baseline (RM3)](https://arxiv.org/html/2609.24122v1#A10)

[K Unreachable-Gold Diversification](https://arxiv.org/html/2609.24122v1#A11)

[L Controlled Gold Deletion (E2.2)](https://arxiv.org/html/2609.24122v1#A12)

[Protocol.](https://arxiv.org/html/2609.24122v1#A12.SS0.SSS0.Px1)

[Result.](https://arxiv.org/html/2609.24122v1#A12.SS0.SSS0.Px2)

[The three cells are near-replicates.](https://arxiv.org/html/2609.24122v1#A12.SS0.SSS0.Px3)

[M Ablations](https://arxiv.org/html/2609.24122v1#A13)

[M.1 Gap-Q generator design (E3.1)](https://arxiv.org/html/2609.24122v1#A13.SS1)

[M.2 Per-lever leave-one-out (E3.1.2)](https://arxiv.org/html/2609.24122v1#A13.SS2)

[M.3 Number of gap questions (E3.2), expansion depth (E3.3), iteration depth (E3.4)](https://arxiv.org/html/2609.24122v1#A13.SS3)

[M.4 Pipeline-model swap (E3.5) and generator-vs-judge cost decomposition (E3.6)](https://arxiv.org/html/2609.24122v1#A13.SS4)

[N Component Validation and Generality](https://arxiv.org/html/2609.24122v1#A14)

[N.1 Cross-dataset generality (E5.2)](https://arxiv.org/html/2609.24122v1#A14.SS1)

[N.2 Judge ceiling and gap-Q quality from gold labels](https://arxiv.org/html/2609.24122v1#A14.SS2)

[N.3 Human-evaluation protocol on ensemble-unreachable gap documents](https://arxiv.org/html/2609.24122v1#A14.SS3)

[Worked example.](https://arxiv.org/html/2609.24122v1#A14.SS3.SSS0.Px1)

[O Failure-Mode Analysis](https://arxiv.org/html/2609.24122v1#A15)

[Two-regime interpretation.](https://arxiv.org/html/2609.24122v1#A15.SS0.SSS0.Px1)

[Targeted-recovery replay.](https://arxiv.org/html/2609.24122v1#A15.SS0.SSS0.Px2)

[O.1 Qualitative success examples](https://arxiv.org/html/2609.24122v1#A15.SS1)

[(i) Hedged-answer disambiguation (HotPotQA, hybrid).](https://arxiv.org/html/2609.24122v1#A15.SS1.SSS0.Px1)

[(ii) Triangulated multi-hop (MuSiQue, hybrid).](https://arxiv.org/html/2609.24122v1#A15.SS1.SSS0.Px2)

[(iii) Cold-start bridge entity (HotPotQA, hybrid).](https://arxiv.org/html/2609.24122v1#A15.SS1.SSS0.Px3)

[O.2 Qualitative failure examples](https://arxiv.org/html/2609.24122v1#A15.SS2)

[(i) Bridge-entity erasure (MuSiQue, hybrid).](https://arxiv.org/html/2609.24122v1#A15.SS2.SSS0.Px1)

[(ii) Hallucinated anchor (HotPotQA, BM25).](https://arxiv.org/html/2609.24122v1#A15.SS2.SSS0.Px2)

[(iii) Pooled-graded saturation (TREC-COVID, BM25 + ( Q + T ) (Q{+}T) -only).](https://arxiv.org/html/2609.24122v1#A15.SS2.SSS0.Px3)

[P Future Work](https://arxiv.org/html/2609.24122v1#A16)

[Q Prompt Templates](https://arxiv.org/html/2609.24122v1#A17)

[License: CC BY 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2609.24122v1 [cs.CL] 21 Sep 2026

# Re:CAP – Auditing Retrieval Coverage in Production RAG Pipelines

Aviral Joshi Hanoz Bhathena Max Nelson Saket Sharma Affiliation: Machine Learning Center of Excellence, JPMorgan Chase & Co. Affiliation: {aviral.joshi, hanoz.bhathena, max.nelson, saket.sharma}@jpmchase.com

Abstract

Retrieval-augmented generation (RAG) is hard to monitor in production: exhaustive relevance labels do not exist for non-stationary multi-million-passage corpora that re-index in real time. As a result, retrieval quality is generally understudied and often deprioritised in favour of generation-oriented metrics. In this work, we propose auditing retrieval coverage by probing for evidence of missing documents rather than enumerating every relevant one. Our method Re:CAP (REtrieval Coverage Audit by iterative Probing) is a reference-free audit loop applied to a deployed RAG pipeline's initial answer and retrieved context: it identifies the topics already covered, generates probing questions for plausibly missing topics, retrieves candidate documents, and applies an LLM-as-judge to retain only those that introduce previously-unretrieved information. On four public benchmarks, Re:CAP recovers 9 9 – 29 % 29% of gold labels that flat BM25 top- 500 500 cannot reach, rising to 48 % 48% on TREC-COVID. On MuSiQue Re:CAP beats flat hybrid top- 500 500 by + 12.9 +12.9 pp on recall at less than half the document budget. An ensemble BM25, dense, and hybrid baseline (top- 500 500 each) still leaves out 21.2 % 21.2% of gold docs on TREC-COVID that Re:CAP recovers; human annotators judge that 78.9 % 78.9% of those structurally distinct documents add new information to the baseline answer (Fleiss κ = 0.79 \kappa=0.79 , n = 123 n=123 ), and 73.9 % 73.9% on live production traffic ( n = 180 n=180 ). End-to-end recall is reproducible to within ± 1 % \pm 1% across three independent runs, making Re:CAP a stable instrument for periodic retrieval audits.

## 1 Introduction

Q Q top- k k top- 500 500 Raising k k extends the *same* region; reranking only reorders within it. Gold outside stays unretrieved at any affordable depth. One query reaches one region Q Q The topic registry names facets the answer does not cover; each becomes a probe issued to the *same* retriever. Re:CAP probes for what is missing Re:CAP recovers 9–29% unreachable gold ( 48% on TREC-COVID) corpus document gold, retrieved gold, never retrieved Re:CAP probe (gold inside was unreachable) Figure 1: Schematic: retrieval coverage has a blind spot, and depth does not close it. Gold ranked below any affordable top- k k by the original query stays unretrieved, and answer-side evaluation cannot detect it. Re:CAP issues further queries from the topic registry; each induces a different ranking over the same corpus and the same retriever (§ [2](https://arxiv.org/html/2609.24122v1#S2)). The cone geometry is illustrative, not a model of the retriever.

Retrieval-augmented generation (RAG) is a standard component of enterprise knowledge assistants over proprietary corpora such as news feeds, internal research, and regulatory filings [Lewis et al. (2020)](https://arxiv.org/html/2609.24122v1#bib.bib18); [Gao et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib12) . Popular RAG evaluation frameworks — RAGAS [Es et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib10) and ARES [Saad-Falcon et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib23) — score answer-side signals (faithfulness, answer relevance) and the relevance of the retrieved context, but cannot detect what the retriever failed to surface. As a result, an answer that is fluent and faithful to its retrieved context can still be substantively incomplete, and these metrics do not register the omission. For instance, a research assistant asked about a recent central-bank policy announcement may ground its answer in the policy statement and the lead wire story while overlooking the updated economic projections, the press-conference transcript, recorded dissents, and post-meeting analyst commentary — all present in the same corpus. We refer to this gap between the documents the retriever surfaces and the documents the corpus contains as the *retrieval coverage* problem, and we observe it most acutely in non-stationary corpora with multiple sources of truth. Figure [1](https://arxiv.org/html/2609.24122v1#S1.F1) illustrates the problem: retrieving more deeply extends the region a query already reaches, so gold that lies outside it stays unreachable at any affordable depth.

Classical recall-based evaluation addresses retrieval coverage in principle but is impractical for large production deployments. Modern production indices contain 10 8 10^{8} or more passages [Karpukhin et al. (2020)](https://arxiv.org/html/2609.24122v1#bib.bib16); [Bajaj et al. (2018)](https://arxiv.org/html/2609.24122v1#bib.bib4) , and the underlying corpus is re-indexed continuously as documents are added, edited, or withdrawn. Exhaustive per-query relevance judgements are prohibitive at this scale, and TREC-style pooling [Voorhees (2000)](https://arxiv.org/html/2609.24122v1#bib.bib32); [Buckley et al. (2007)](https://arxiv.org/html/2609.24122v1#bib.bib5) requires multiple participating systems and fresh labels after every change to the index, embedder, or ranker. Proprietary deployments typically have no per-query relevance labels at all, leaving operators reliant on end-to-end answer signals that cannot distinguish a retrieval failure from a reader failure.

We therefore reframe the problem. Rather than enumerating every relevant document (intractable), we probe each query for positive evidence that the retriever missed relevant content (tractable and automatable). We instantiate this reframing in Re:CAP (REtrieval Coverage Audit by iterative Probing), a reference-free iterative loop that audits a deployed RAG pipeline without consuming per-query gold labels. Given a query Q Q , an initial set of retrieved documents D 0 D_{0} , and the corresponding answer A 0 A_{0} , Re:CAP (Algorithm [1](https://arxiv.org/html/2609.24122v1#alg1)) maintains a topic registry T T of the information facets already covered, generates entity-anchored gap-probing questions targeting aspects relevant to Q Q but absent from T T , expands retrieval with those questions, and uses an LLM judge to label each new candidate document as novel, redundant, or off-topic. The loop iterates until T T stops growing, yielding a structured inventory of retrieval gaps G ⊆ T G\subseteq T together with label-free monitoring signals (gap count, gap rate) whose stability and sensitivity to retrieval quality we characterise empirically (§ [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3), § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2)). At 250 250 – 500 500 LLM calls per audited query, Re:CAP is a *periodic sampling auditor* rather than a per-query monitor: it runs over a representative sample on an audit cycle — typically before promoting an index, embedder, or ranker change — not inline on live traffic. Cost is operator-tunable: an all-mini pipeline is 4.6 × 4.6\times cheaper for − 0.51 -0.51 pp paired recall, at the edge of the run-to-run noise floor (App. [M](https://arxiv.org/html/2609.24122v1#A13), E3.5).

Our contributions are as follows:

• We propose a topic-based gap-discovery framework and instantiate it as the Re:CAP iterative protocol, whose gap-question generator combines one dominant anchoring mechanism — the entity ledger, which accounts for nearly all of the average-recall lift — with four supporting guards: probe-role diversity, coverage-aware topic serialisation, anti-collapse termination, and failure memory. The four are not recall levers. Each suppresses a specific failure mode of a minimal ( Q + T ) (Q{+}T) -only generator — topic-coverage skew, low probe diversity, cold-start collapse, and wasted iterations — that leave-one-out on *average* recall over well-behaved benchmarks does not surface, and their effect is concentrated in worst-case behaviour (§ [2](https://arxiv.org/html/2609.24122v1#S2), App. [O](https://arxiv.org/html/2609.24122v1#A15), Table [20](https://arxiv.org/html/2609.24122v1#A13.T20)).

• We provide empirical evidence across four public benchmarks that Re:CAP recovers 9 9 – 29 % 29% of gold unreachable by flat BM25 top- 500 500 ( + 12.9 +12.9 pp over flat hybrid top- 500 500 on MuSiQue at less than half the document budget), moves predictably with retrieval quality (§ [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3)), and reproduces to within 1 % 1% across runs (§ [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2)).

• We validate Re:CAP end-to-end on two unrelated live production deployments over proprietary corpora ( 400 400 queries total; App. [E](https://arxiv.org/html/2609.24122v1#A5)).

• We validate Re:CAP-discovered gaps against blinded human judgement: on the ensemble-missed stratum that no single-retriever upgrade closes, 78.9 % 78.9% of recovered documents add information the baseline answer lacks (three blinded annotators, Fleiss κ = 0.79 \kappa=0.79 , n = 123 n=123 ; § [5](https://arxiv.org/html/2609.24122v1#S5)).

## 2 Method

### 2.1 Setting and topic-based gaps

A RAG pipeline has a corpus 𝒞 \mathcal{C} , retriever R R , and LLM reader M M . Given query Q Q , it produces an initial set of retrieved documents D 0 = R  ( Q , k ) D_{0}=R(Q,k) and an answer A 0 = M  ( Q , D 0 ) A_{0}=M(Q,D_{0}) . Without exhaustive labels for 𝒞 \mathcal{C} we audit the pipeline by discovering *retrieval gaps*: aspects of Q Q that are relevant and evidenced in 𝒞 \mathcal{C} but absent from D 0 D_{0} .

We define gaps at the *topic* level rather than the document level. What counts as a single topic is fixed by three rules: a paragraph test (each topic warrants a distinct, non-overlapping paragraph), a type-not-instance rule 1 1 1 A topic describes the *kind* of information sought, not a particular value of it — analogous to the class/instance distinction in object-oriented design., and a hard cap (default 50 50 topics per query). A topic t t is a *retrieval gap* iff (i) t t is relevant to Q Q , (ii) some d ∈ 𝒞 d\in\mathcal{C} covers t t , and (iii) no d ′ ∈ D 0 d^{\prime}\in D_{0} covers t t . Topic-level counting provides built-in deduplication across redundant evidence documents, interpretable per-query reports, and a normalised gap rate | G | / | T final | |G|/|T_{\text{final}}| comparable across queries of varying complexity.

Algorithm 1 Re:CAP gap-discovery loop. ColdStart  ( D 0 , A 0 , i ) := i = 1 ∧ ( D 0 = ∅ ∨ A 0  is 'insufficient context' ) \text{ColdStart}(D_{0},A_{0},i):=i!=!1\wedge(D_{0}!=!\emptyset\vee A_{0}\text{ is `insufficient context'}) vetoes early termination (§ [2.2](https://arxiv.org/html/2609.24122v1#S2.SS2)).

1: query Q Q , retriever R R , reader M M , judge 𝒥 \mathcal{J}

2: k k , m m , MAX_ITER, MAX_TOPICS

3: D 0 ← R  ( Q , k ) D_{0}\leftarrow R(Q,k) ; A 0 ← M  ( Q , D 0 ) A_{0}\leftarrow M(Q,D_{0}) ⊳ \triangleright S1

4: T ← ExtractTopics  ( Q , A 0 ) T\leftarrow\text{ExtractTopics}(Q,A_{0}) ⊳ \triangleright S2

5: T ← ReconcileDocs  ( Q , T , D 0 ) T\leftarrow\text{ReconcileDocs}(Q,T,D_{0}) ⊳ \triangleright S2

6: L ← ExtractEntityLedger  ( Q , A 0 ) L\leftarrow\text{ExtractEntityLedger}(Q,A_{0}) ⊳ \triangleright S2

7: G ← ∅ G\leftarrow\emptyset ; F ← ∅ F\leftarrow\emptyset ; seen ← ∅ \text{seen}\leftarrow\emptyset

8: for i = 1 i=1 to MAX_ITER do

9: 𝒬 g ← GenGapQs  ( Q , T , L , F ) \mathcal{Q}_{g}\leftarrow\text{GenGapQs}(Q,T,L,F) ⊳ \triangleright S3

10: C ← ⋃ q ∈ 𝒬 g R  ( q , m ) ∖ ( D 0 ∪ seen ) C\leftarrow\bigcup_{q\in\mathcal{Q}*{g}}R(q,m)\setminus(D*{0}\cup\text{seen}) ⊳ \triangleright S4

11: seen ← seen ∪ C \text{seen}\leftarrow\text{seen}\cup C

12: N ← ∅ N\leftarrow\emptyset

13: for all c ∈ C c\in C in parallel do ⊳ \triangleright S5

14: v , ℓ , t id ← 𝒥  ( Q , T , A 0 , c ) v,\ell,t_{\text{id}}\leftarrow\mathcal{J}(Q,T,A_{0},c)

15: if v ∈ { NewTopic , SubTopic } v\in{\textsc{NewTopic},\textsc{SubTopic}} then

16: N ← N ∪ { ( ℓ , c ) } N\leftarrow N\cup{(\ell,c)}

17: else if v = Redundant v=\textsc{Redundant} then

18: T  [ t id ] . evid +  = { c } T[t_{\text{id}}].\text{evid}\mathrel{+{=}}{c}

19: end if

20: end for

21: N ← Dedup  ( N , T ) N\leftarrow\text{Dedup}(N,T) ⊳ \triangleright S5

22: T ← T ∪ N T\leftarrow T\cup N ; G ← G ∪ N G\leftarrow G\cup N ⊳ \triangleright S5

23: F ← 𝒬 g ∖ { q : q  yielded a new topic } F\leftarrow\mathcal{Q}_{g}\setminus{q:q\text{ yielded a new topic}} ⊳ \triangleright S5

24: if N = ∅ ∧ ¬ ColdStart  ( D 0 , A 0 , i ) N=\emptyset\wedge\neg\text{ColdStart}(D_{0},A_{0},i) then break ⊳ \triangleright S6

25: end if

26: if | T | ≥ MAX_TOPICS |T|\geq\text{MAX_TOPICS} then break

27: end if ⊳ \triangleright S6

28: end for

29: return T , G , ComputeMetrics  ( T , G ) T,\ G,\ \text{ComputeMetrics}(T,G)

### 2.2 The Re:CAP loop

Re:CAP runs as a six-step loop (Algorithm [1](https://arxiv.org/html/2609.24122v1#alg1)) layered on top of an unchanged host RAG pipeline.

Initial pass (S1). The host RAG pipeline runs unchanged: D 0 = R  ( Q , k ) D_{0}=R(Q,k) , A 0 = M  ( Q , D 0 ) A_{0}=M(Q,D_{0}) .

Topic extraction and ledger init (S2). An LLM extracts the distinct topics from A 0 A_{0} as short labels; each d ∈ D 0 d\in D_{0} is then reconciled against the registry T T in a batched LLM call. Reconciliation recovers topics from D 0 D_{0} the reader omitted, so the rest of the loop measures only retriever-side gaps. An *entity ledger* L L (named entities, numeric and temporal anchors from Q Q and A 0 A_{0} ) is also extracted at this step and reused by S3 in every iteration.

Gap-Q generation (S3). The generator takes Q Q , the registry T T , and the entity ledger L L , and emits five gap questions targeting aspects absent from T T . Each question is generated and tagged with one role from a fixed five-role taxonomy ( *entity-anchored*, *concept-anchored*, *constraint-relaxed*, *constraint-tightened*, *inverse-negation*; definitions in App. [Q](https://arxiv.org/html/2609.24122v1#A17.tab8)). Orthogonal to these five roles, one anchoring *mechanism* and four supporting *guards* drive coverage and diversity: (A) every question must contain a literal anchor from L L verbatim, preventing the generator from paraphrasing away bridge entities; (B) topics are serialised with their evidence count so the generator targets under-supported topics; (C) the role taxonomy enforces probe diversity; (D) an *anti-collapse* guard requires ≥ 2 \geq 2 iterations when D 0 D_{0} is empty or A 0 A_{0} is an “insufficient context” answer; (E) *failure memory* passes the previous iteration's unproductive gap-Qs back as negative examples. As an ablation reference we additionally evaluate a minimal ( Q + T ) (Q+T) -only generator that drops A–E.

Expanded retrieval (S4). For each gap question g i g_{i} , R R returns the top- m m documents, and C = ⋃ i R  ( g i , m ) C=\bigcup_{i}R(g_{i},m) is deduplicated against D 0 D_{0} and previously seen candidate documents. The same retriever as the host system is used, so discovered gaps reflect that retriever's coverage limitations.

Novelty judging (S5). For each c ∈ C c\in C , the judge assigns one of five verdicts ( NewTopic, SubTopic, Redundant, Irrelevant, Contradictory); the first two add the candidate to T T and to the gap inventory G G , Redundant attaches the candidate as additional evidence to its existing topic, and the last two are discarded. Unproductive gap-Qs (those yielding no new topic) are recorded in the failure memory F F and passed back to S3 at the next iteration. Overlapping new topics across parallel judges are resolved by two-stage post-hoc deduplication (App. [C.1](https://arxiv.org/html/2609.24122v1#A3.SS1)).

Termination (S6). The loop ends on natural convergence (no novel candidates), an anti-collapse veto on cold-start iter 1 1 , the topic cap, or the MAX_ITER budget (Algorithm [1](https://arxiv.org/html/2609.24122v1#alg1)).

The loop returns (i) the topic registry T T with per-topic evidence, (ii) the gap inventory G ⊆ T G\subseteq T , and (iii) monitoring metrics: gap count, gap rate, and recall when labels are available.

## 3 Experimental Setup

### 3.1 Datasets

We evaluate on four primary datasets spanning bounded-evidence multi-hop QA and pooled-graded IR, plus MS MARCO TREC-DL 2019/2020 as an auxiliary BM25-only sensitivity ladder (Table [1](https://arxiv.org/html/2609.24122v1#S3.T1)). MuSiQue and HotPotQA are the primary bounded-evidence regime; MultiHop-RAG, on a small 609-article corpus, serves as a saturation/ceiling sanity check. TREC-COVID is included to delimit where Re:CAP applies and where it does not (§ [Limitations](https://arxiv.org/html/2609.24122v1#Sx2)). Full per-dataset descriptions and rationale are in Appendix [A](https://arxiv.org/html/2609.24122v1#A1).

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 1: Dataset characteristics. MHopRAG = = MultiHop-RAG; TC = = TREC-COVID. Evidence/q is gold-supporting-evidence count for binary-judgement sets, mean judged-pool size for graded sets. MS MARCO is BM25-only (corpus size precludes embedding); all others use hybrid BM25 + dense.

### 3.2 Retrieval and models

We evaluate Re:CAP with sparse BM25, dense MiniLM-L12v2 [Reimers and Gurevych (2019)](https://arxiv.org/html/2609.24122v1#bib.bib21); [Wang et al. (2020)](https://arxiv.org/html/2609.24122v1#bib.bib35) , and a hybrid of the two via reciprocal-rank fusion [Cormack et al. (2009)](https://arxiv.org/html/2609.24122v1#bib.bib8) . On MuSiQue we additionally evaluate a stronger dense back-end, OpenAI text-embedding-3-large. We adopt hybrid as the reference back-end; BM25-only and dense-only act as ablations. The QA reader is held fixed at GPT-5.2 across all configurations to remove reader quality as a confounding factor: the object of measurement is *retrieval* gaps, not reader capability. The remaining Re:CAP components (topic extractor, reconciler, gap-Q generator, judge) default to GPT-4.1 with temperature 0 0 (gap-Q generator temperature = 0.3 0.3 for diversity). Unless noted otherwise, every main result uses hybrid retrieval, the five-mechanism gap-Q generator, k = 10 k=10 , m = 50 m=50 , five gap-Qs per iteration, MAX_ITER = 3 =3 , and MAX_TOPICS = 50 =50 . The full model × \times component table and a per-knob justification are in Appendix [C](https://arxiv.org/html/2609.24122v1#A3).

### 3.3 Baselines

We compare Re:CAP against (i) flat top- N N retrieval at budgets matched to Re:CAP's per-query unique-candidate count N q N_{q} — the central budget-matched control that isolates the audit's contribution from raw exposure to more documents — under three retriever back-ends (BM25, MiniLM hybrid, and OpenAI dense text-embedding-3-large; OpenAI on MuSiQue only); (ii) single-pass probing (MAX_ITER = 1) to test whether iteration adds value; (iii) RM3 pseudo-relevance feedback (PRF) [Lavrenko and Croft (2001)](https://arxiv.org/html/2609.24122v1#bib.bib17); [Abdul-Jaleel et al. (2004)](https://arxiv.org/html/2609.24122v1#bib.bib1) (App. [J](https://arxiv.org/html/2609.24122v1#A10)); and (iv) the minimal ( Q + T ) (Q+T) -only generator ablation on both BM25 and hybrid retrievers.

Re:CAP is an audit layer, not a competing retriever.

These comparisons are budget-matched controls; none of them claims Re:CAP is a better retrieval system. Re:CAP runs *on top of* whatever retriever a deployment already operates (§ [2](https://arxiv.org/html/2609.24122v1#S2)), so the evaluation question is not “does the loop beat a stronger retriever?” but “does the loop surface gold that the host retrieval missed?” Two standard upgrades do not change that answer. Cross-encoder reranking reorders the flat top- K K already retrieved and cannot surface any document outside it — the axis the headline results are anchored on (Figure [1](https://arxiv.org/html/2609.24122v1#S1.F1)). One-shot query rewriting is a strict subset of what the loop does across iterations (§ [2](https://arxiv.org/html/2609.24122v1#S2)). Applying either to both sides raises the floor symmetrically, which is why we report unreachable-gold share alongside recall throughout.

### 3.4 Evaluation protocol

For each Re:CAP run we record per-query (i) gold recall against dataset qrels (for validation only, Re:CAP itself does not consume labels), (ii) Re:CAP gap count and gap rate, (iii) unreachable-gold share vs. flat top- 500 500 (the fraction of Re:CAP-recovered gold not in flat top- 500 500 under each retriever), and (iv) telemetry rolled up to dollar cost using published Azure OpenAI rates. Confidence intervals on run-level metrics are 1,000 1{,}000 -sample query-bootstrap 95 % 95% , and paired differences use the same bootstrap on per-query deltas; the human evaluations state their interval method with their tables. The variance protocol re-runs Re:CAP with the default settings three times under the same query slice and seed to estimate end-to-end stability under inherent LLM non-determinism.

## 4 Results

### 4.1 Re:CAP vs. flat retrieval

Table [2](https://arxiv.org/html/2609.24122v1#S4.T2) reports the cross-dataset main result (Pareto visualization in App. Figure [3](https://arxiv.org/html/2609.24122v1#A10.F3)): Re:CAP at the default configuration vs. three flat baselines at matched docs-seen budget. On MuSiQue and HotPotQA, Re:CAP beats flat BM25 at matched- N q N_{q} budget by + 6.1 +6.1 to + 29.1 +29.1 pp; on MultiHop-RAG, where flat top- 500 500 is near saturation, the matched- N q N_{q} gain narrows to + 2.6 +2.6 pp. It also beats stronger flat baselines at less than half the document budget: on MuSiQue, + 12.9 +12.9 pp vs. flat MiniLM hybrid top- 500 500 and + 4.7 +4.7 pp vs. flat OpenAI dense top- 500 500 ; on HotPotQA, + 11.5 +11.5 pp vs. flat MiniLM dense top- 500 500 . Across the six comparisons in Table [2](https://arxiv.org/html/2609.24122v1#S4.T2) the CIs are disjoint on the three largest margins ( + 11.5 +11.5 to + 29.1 +29.1 pp) and overlap on the three smallest ( + 2.4 +2.4 to + 6.1 +6.1 pp): on the recall axis a stronger baseline narrows the margin, which is why the unreachable-gold share (§ [4.2](https://arxiv.org/html/2609.24122v1#S4.SS2)) rather than recall is the retriever-independent signal. On MultiHop-RAG the 609-article corpus is near-saturated by flat top- 500 500 across retriever back-ends ( 0.88 0.88 – 1.00 1.00 ), so it serves as a ceiling sanity check rather than a discriminative benchmark; Re:CAP converges within N q ≈ 45 N_{q}\approx 45 – 90 90 depending on back-end. On TREC-COVID Re:CAP shows the strongest structural complementarity: 48 % 48% of its recovered gold is absent from flat BM25 top- 500 500 and 21.2 % 21.2% remains absent from the ensemble of flat BM25, dense, and hybrid top- 500 500 combined – a 1,500 1{,}500 -document, three-retriever budget – appearing in 98 % 98% of queries (49 of 50). By majority vote of three blinded annotators, 78.9 % 78.9% [ 71.5 71.5 – 86.2 % 86.2% ] of n = 123 n=123 such documents add information beyond the D 0 D_{0} -only baseline answer (Fleiss κ = 0.79 \kappa=0.79 ; 78.3 % 78.3% on MuSiQue; § [5](https://arxiv.org/html/2609.24122v1#S5)). On the recall metric Re:CAP trails flat BM25 top- 500 500 by a marginal − 2.0 -2.0 pp ( 0.221 0.221 vs. 0.241 0.241 ) at ∼ \sim 24 % 24% smaller document budget: flat top- 500 500 itself reaches only 24 % 24% on this pooled-graded gold set of ∼ \sim 493 493 relevant docs per query, and binary-novelty judging at a ∼ \sim 378 378 -doc Re:CAP budget is structurally mismatched with the recall ceiling (§ [Limitations](https://arxiv.org/html/2609.24122v1#Sx2)), thus complementarity, not recall@ k k , is the audit-relevant signal here.

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

Table 2: Re:CAP vs. flat retrieval at matched docs-seen budget. *RR hyb.* = Re:CAP with hybrid retrieval; *Unr.* = share of recovered gold not in flat BM25 top-500 (see § for the ensemble variant); | G | |G| = mean Re:CAP gap count per query. MultiHop-RAG omitted (saturates at flat top- 500 500 ). † pooled-graded scope boundary; ‡ MiniLM-L12 dense; § 21.2 % 21.2% also unreachable by the ensemble of flat BM25, dense, and hybrid top- 500 500 . Full matrix: App. [G](https://arxiv.org/html/2609.24122v1#A7).

### 4.2 Structural complementarity

Re:CAP samples a meaningfully different slice of the relevance pool than flat retrieval — an audit signal flat top- k k cannot produce by construction. Against flat BM25 top- 500 500 , 9.2 9.2 – 29.4 % 29.4% of Re:CAP's recovered gold is unreachable on bounded-evidence (column *Unr.* of Table [2](https://arxiv.org/html/2609.24122v1#S4.T2)), rising to 48 % 48% on TREC-COVID under the default hybrid back-end ( 45 45 – 61 % 61% across alternative Re:CAP retriever back-ends; App. [G](https://arxiv.org/html/2609.24122v1#A7)). Against the ensemble of BM25, dense, and hybrid top- 500 500 , the share tracks gold-pool diversity: 2.5 % 2.5% on HotPotQA ( 4 % 4% of queries; 2-doc pools), 10.0 % 10.0% on MuSiQue ( 21 % 21% of queries; 2–4 hops), and 21.2 % 21.2% on TREC-COVID ( 98 % 98% of queries; ∼ \sim 493 493 gold docs/q; Table [17](https://arxiv.org/html/2609.24122v1#A11.T17)). Re:CAP's structural contribution is largest exactly where exhaustive recall labels are most intractable to obtain — the production setting the method is designed for.

### 4.3 Sensitivity to retrieval quality

A monitoring metric is only useful if it *moves* when the underlying retrieval changes — whether from a corpus refresh, an embedder upgrade, or a reranker change. Table [3](https://arxiv.org/html/2609.24122v1#S4.T3) reports a within-dataset retrieval-quality ladder: on MuSiQue, sweeping retriever type (BM25 / hybrid) and top- k k ( 10 10 / 20 20 / 50 50 ) with generator fixed; on MS MARCO TREC-DL 2019/2020 ( n = 97 n=97 NIST-judged queries, rel ≥ 2 \text{rel}\geq 2 ), sweeping BM25 top- k k over the same ladder. Two observations. (i) Retriever *type* dominates where multiple are available: on MuSiQue, BM25 vs. hybrid moves Re:CAP recall by ∼ \sim 6 6 pp at matched k k . (ii) Top- k k within a single retriever is approximately flat because Re:CAP's expansion step saturates the candidate pool regardless of D 0 D_{0} depth ( ≤ 1.9 \leq 1.9 pp paired across top- 10 10 / 20 20 / 50 50 on every ladder; ≤ 0.75 \leq 0.75 pp on MS MARCO BM25). Together these are consistent with the design intent: Re:CAP metrics are *discriminative* where retrieval truly differs and *stable* where it does not.

The two label-free monitoring signals behave differently along this ladder, and the distinction matters for anyone deploying them. Mean gap count | G | |G| separates the two retriever types in the expected direction — every BM25 rung sits above every hybrid rung ( 4.00 4.00 – 4.20 4.20 vs. 3.61 3.61 – 3.97 3.97 ) — so a weaker host retriever leaves Re:CAP more gaps to open. The magnitude, however, should be read with care: the BM25–hybrid mean separation is 0.28 0.28 , only 1.5 × 1.5\times the run-to-run standard deviation of | G | |G| ( 0.19 0.19 , Table [5](https://arxiv.org/html/2609.24122v1#S4.T5)), and at matched k = 20 k{=}20 the two retrievers differ by 0.03 0.03 . The type separation is consistent on this ladder, but within a retriever top- k k does not order | G | |G| reliably, and the per-rung differences are not resolvable within a single audit cycle. | G | |G| is therefore a directional indicator here rather than a calibrated one, and separating adjacent configurations needs repeated cycles or a larger degradation than this ladder spans.

Gap rate is the more stable signal (CV 1.46 % 1.46% against 5.04 % 5.04% ) but is near saturation here ( 0.81 0.81 – 0.86 0.86 on MuSiQue, 0.96 0.96 – 0.98 0.98 on MS MARCO): on MS MARCO almost every query yields a gap, so it acts as a coverage *floor* rather than a fine-grained sensitivity signal. Neither signal is a drop-in alarm on its own; the threshold recipe is in App. [D](https://arxiv.org/html/2609.24122v1#A4). Retriever recall Δ paired \Delta_{\text{paired}} | G | |G| gap rate $/q it ¯ \overline{\text{it}}

|   |   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

Table 3: Retrieval-quality ladder. Columns: Re:CAP recall; paired delta (positive Δ paired \Delta_{\text{paired}} implies the cell is *worse* than its reference); mean gap count | G | |G| per query; gap rate; cost per query; and mean iterations per query till convergence. | G | |G| separates the two retriever types in the expected direction, though by margins comparable to its own run-to-run noise; gap rate saturates on these workloads and acts as a coverage floor (§ [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3)).

### 4.4 Controlled gold-deletion check

We additionally validate sensitivity under controlled deletion: removing K ∈ { 1 , 2 , all } K\in{1,2,\text{all}} gold passages from D 0 D_{0} ( n = 91 n=91 MuSiQue queries with gold in D 0 D_{0} ), Re:CAP re-discovers 98.9 % / 98.4 % / 100 % 98.9%/98.4%/100% of the removed gold IDs respectively. Paired recall still falls 11 11 – 13 13 pp, attributable to secondary gold rather than to failed recovery. Full E2.2 table and discussion: Appendix [L](https://arxiv.org/html/2609.24122v1#A12).

### 4.5 Operational characteristics

Cost.

The judge dominates per-query cost ( ∼ \sim 97 % 97% across all datasets; judge → \to GPT-4.1-mini saves 75 % 75% of HotPotQA cost, the generator swap alone saves 8 % 8% ). Per-query cost varies ∼ \sim 3.5 × 3.5\times across corpora ($ 0.59 0.59 –$ 2.05 2.05 , Table [4](https://arxiv.org/html/2609.24122v1#S4.T4)). A 4.6 × 4.6\times Pareto improvement is available for − 0.51 -0.51 pp paired recall on HotPotQA by swapping all pipeline components to GPT-4.1-mini (at the edge of the 0.42 0.42 pp noise floor below; full grid in Appendix [M](https://arxiv.org/html/2609.24122v1#A13)).

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 4: Cost breakdown (Re:CAP default on hybrid retrieval). ‡ TREC-COVID cell is the BM25 + ( Q + T ) (Q{+}T) variant (only TC configuration with full token telemetry).

Reproducibility.

Three independent runs of Re:CAP on MuSiQue (Table [5](https://arxiv.org/html/2609.24122v1#S4.T5); same slice and seed; variance is inherent LLM non-determinism) give Re:CAP-recall a Coefficient-of-variation = 0.47 % =0.47% ( ± 0.42 \pm 0.42 pp), so Re:CAP returns a stable recall estimate for a fixed (pipeline, corpus) pair. Combined with the retriever-type sensitivity demonstrated in § [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3), this licenses inter-run comparisons at that granularity: recall deltas that exceed the noise floor and accompany a change of retriever can be read as real changes rather than measurement noise. Adjacent top- k k settings are not separable this way.

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 5: Run-to-run variance, three independent runs (MuSiQue, default, n = 100 n=100 ). Recall CV 0.47 % 0.47% and gap-rate CV 1.46 % 1.46% both underpin the deployable-monitoring claim.

Attribution of residual losses.

On bounded-evidence primaries the dominant failure is gap-question generation, not judging ( 95.3 % 95.3% of missing docs never surface as candidates): early convergence, bridge-entity erasure, or entity-ledger anchoring on a hallucinated name from A 0 A_{0} . On pooled-graded TREC-COVID the failure is structural: binary novelty judging over-aggregates sub-mechanisms and the Re:CAP budget is dwarfed by the graded pool. Full taxonomy, counts, and worked examples are in Appendix [O](https://arxiv.org/html/2609.24122v1#A15).

Production deployment.

The default configuration also audits two live deployments on proprietary corpora ( ≈ \approx 123 123 M and ≈ \approx 70 70 M passages; 200 200 queries each), differing chiefly in D 0 D_{0} width: “AI Search” ( D 0 D_{0} fixed at 10 10 ) and “NEWS QA” ( D 0 D_{0} mean 47.2 47.2 , max 110 110 ). Both run 200 / 200 200/200 with no production-specific code path: gap rate 0.991 0.991 / 0.955 0.955 , gap-iteration topic share 77.4 % 77.4% / 78.2 % 78.2% , judge share of calls ≥ 97.6 % \geq 97.6% , median cost $ 1.68 1.68 / $ 1.79 1.79 per query. Full two-cohort breakdown in App. [E](https://arxiv.org/html/2609.24122v1#A5) (Table [10](https://arxiv.org/html/2609.24122v1#A5.T10)).

## 5 Human evaluation of recovered gap documents

The 21.2 % 21.2% TREC-COVID and 10.0 % 10.0% MuSiQue ensemble-unreachable shares in § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1) are qrels-mediated. To test whether these structurally distinct documents add information the reader actually lacks — independent of the qrels — we ran a blinded human read on the ensemble-unreachable stratum.

Setup.

We sampled n = 123 n=123 ensemble-unreachable gap documents from the deployed default: 100 100 TREC-COVID documents stratified by query (target 2 2 docs per query among the TREC-COVID queries with ≥ 1 \geq 1 ensemble-unreachable doc; 48 48 queries represented, 1 1 – 3 3 docs each) plus the 23 23 -document MuSiQue census; HotPotQA, MultiHop-RAG, and MS MARCO are ineligible (App. [N.3](https://arxiv.org/html/2609.24122v1#A14.SS3)). Three annotators saw the query, the D 0 D_{0} -only baseline answer, and the document text, blinded to judge verdict, qrels status, and dataset. The binary rubric labels a document *new_info* if it adds a substantive query-relevant fact the baseline answer lacks, and *covered* otherwise.

Result.

By majority vote, 78.9 % 78.9% [ 71.5 71.5 – 86.2 86.2 , 10,000 10{,}000 -resample bootstrap] of ensemble-missed gap documents are judged *new_info* at Fleiss κ = 0.79 \kappa=0.79 (Table [6](https://arxiv.org/html/2609.24122v1#S5.T6)); per-dataset rates are substantively comparable. This bounds Re:CAP's operational value on the strictest stratum: the documents it recovers that no 1,500 1{,}500 -document single-retriever combination surfaces carry information the baseline answer lacks.

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 6: Human-evaluation verdicts on 123 123 ensemble-unreachable gap documents from the deployed default. *new* is the majority-vote *new_info* count; 95 % 95% CIs are 10,000 10{,}000 -resample bootstrap; κ \kappa is Fleiss across three annotators on binary verdicts. 110 / 123 110/123 ( 89.4 % 89.4% ) unanimous.

## 6 Conclusion

Re:CAP reformulates the retrieval evaluation problem in Production RAG pipelines from that of *enumeration* to one of *probing* by utilizing a topic-aware iterative gap-discovery loop that audits a deployed pipeline without per-query gold labels. Across four publicly available benchmarks we demonstrate that Re:CAP recovers gold that baselines cannot discover ( 9 9 – 29 % 29% , rising to 48 % 48% on TREC-COVID) and does so at half the document budget (on MuSiQue). Results are reproducible to ∼ \sim 1 % 1% recall across runs. Human assessment on Re:CAP recovered gold documents shows that 78.9 % 78.9% of the recovered documents have novel information missing from the baseline answer ( κ = 0.79 \kappa=0.79 ). We share Re:CAP statistics and examples from 2 live large-scale production RAG pipelines with 200 200 -query audits each (App. [E](https://arxiv.org/html/2609.24122v1#A5)) along with a deployment recipe (App. [D](https://arxiv.org/html/2609.24122v1#A4)).

## Ethical Considerations

Computational and environmental cost.

The iterative probing loop has significant energy and carbon implications at scale ($ 0.59 0.59 –$ 2.05 2.05 /query at default; § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px1)); we report full per-corpus cost accounting to enable informed deployment decisions and document a steep Pareto improvement (judge → \to GPT-4.1-mini) for cost-sensitive deployments. Teams running Re:CAP continuously should sample queries rather than audit every request.

Bias in gap discovery.

The LLM-as-judge may have systematic blind spots — topics it consistently fails to recognise as novel — that could correlate with sensitive attributes and provide false assurance of completeness. Re:CAP cannot fully audit itself; periodic gold-label spot-checks of judge outputs against held-out qrels (Appendix [N](https://arxiv.org/html/2609.24122v1#A14)) are recommended before relying on Re:CAP signals for compliance-grade reporting. Re:CAP's gap-Q generator also inherits any entity biases of the source LLM through the entity ledger; we have not characterised this with respect to demographic or geographic biases.

Human annotation.

The human evaluations in § [5](https://arxiv.org/html/2609.24122v1#S5) and App. [F](https://arxiv.org/html/2609.24122v1#A6) were performed by three in-house annotators, not by the authors and not by crowdworkers. The production cohorts are internal corpora: annotation took place inside that organisation, and no document text from them is reproduced here — the worked examples in App. [E](https://arxiv.org/html/2609.24122v1#A5) report topic labels and generated probe questions only. We collected no personal data from annotators and report no demographic characteristics of the annotator population.

Privacy and access control.

Expanded retrieval issues additional probes against the corpus with LLM-generated questions. In deployed systems with row-level access controls, those controls must be honoured during gap probing — otherwise the audit can surface relevant documents the original user would not be entitled to retrieve. Our reference implementation passes the original retrieval ACL context through the loop; we recommend the same for any deployment.

Surface area for prompt injection.

Step 2 (reconciliation) and Step 5 (judging) ingest retrieved document text as input to LLM calls and are therefore exposed to prompt-injection attempts embedded in corpus documents. We use structured-output decoding and a narrowly scoped classification task to reduce this surface, but for adversarial corpora additional input sanitisation is warranted.

## Limitations

LLM cost.

Re:CAP requires multiple LLM calls per query (topic extraction, doc reconciliation, gap-Q generation, novelty judging per candidate, post-hoc deduplication). At the default this totals 250 250 – 500 500 LLM calls per query ($ 0.59 0.59 –$ 2.05 2.05 at GPT-4.1 pricing; § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px1)). This is materially more expensive than single-pass metrics like RAGAS, and may not suit tight monitoring budgets. Swapping all pipeline components to GPT-4.1-mini cuts this 4.6 × 4.6\times ( − 0.51 -0.51 pp paired recall on HotPotQA; App. [M](https://arxiv.org/html/2609.24122v1#A13), E3.5).

Judge reliability ceiling.

Re:CAP is in principle bounded by the LLM judge's accuracy. The gold-label failure-mode analysis (Appendix [O](https://arxiv.org/html/2609.24122v1#A15)) bounds this empirically: 1.4 % 1.4% of missing-gold docs are judge-rejected overall ( 4.7 % 4.7% on the bounded-evidence primaries), so > 95 % >95% of missing-gold losses on the regime Re:CAP is designed for are upstream of judging. We rely on the LLM-as-judge literature [Faggioli et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib11); [Thomas et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib27); [Upadhyay et al. (2024a)](https://arxiv.org/html/2609.24122v1#bib.bib30); [Upadhyay et al. (2024b)](https://arxiv.org/html/2609.24122v1#bib.bib31) as support for narrow, structured-output tasks, and follow cautions against substituting LLMs for full human qrels [Soboroff (2025)](https://arxiv.org/html/2609.24122v1#bib.bib25) by validating Re:CAP against held-out labels.

Corpus coverage assumption.

Re:CAP discovers gaps only for topics that exist in the corpus. If the corpus itself lacks coverage of an aspect, no probing will find it. Re:CAP measures *retrieval* gaps, not *corpus* gaps.

English only.

All experiments are on English-language datasets with English-language LLMs. The approach is language-agnostic in principle but unvalidated multilingually.

Gap-Q generator dependence.

Gap-probing depends on the LLM-generated questions; vague or off-target questions under-surface relevant documents and under-count gaps. The five-mechanism generator reduces but does not eliminate this risk.

Topic granularity.

We have no formal definition of an “atomic topic”. We rely on three prompt-engineering rules (paragraph test, type-not-instance, different-dimension sub-topic) plus a configurable hard cap. Broad or ambiguous queries can still trigger instance enumeration, inflating topic counts.

Instance-level coverage holes can be masked.

By design, the type-not-instance rule collapses instance enumeration into a single topic. A retriever that surfaces *some* instances of a topic but misses others along the same dimension is scored as covering that topic, even though instance-level recall is incomplete. The SubTopic verdict mitigates this only when missed instances reveal a different *dimension*, not when they are missing along the existing one. Deployments that care about instance-level enumeration recall (e.g., fact verification, audit trails) should track Re:CAP at a finer granularity, or pair it with instance-level metrics.

Recall@ k k undercounts complementarity on pooled-graded corpora.

On pooled-graded corpora such as TREC-COVID — where a query has hundreds–thousands of partially-relevant documents, flat BM25 top- 500 500 itself reaches only 24 % 24% recall, and any ∼ \sim 378 378 -doc method cannot hold the ∼ \sim 493 493 relevant docs per query — recall@ k k compresses complementarity into a small negative delta (Re:CAP best cell Δ = − 2.0 \Delta=-2.0 pp; § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1)). The audit-relevant signal survives: 21.2 % 21.2% of Re:CAP's recovered gold remains absent from the ensemble of flat BM25, dense, and hybrid top- 500 500 combined, present in 98 % 98% of queries (Table [17](https://arxiv.org/html/2609.24122v1#A11.T17)). On such corpora, recall@ k k should be paired with a structural complementarity metric to capture Re:CAP's audit contribution.

Initial-retriever choice can cause cell-level regressions.

The HotPotQA dense- D 0 D_{0} cell ( − 3.6 -3.6 pp matched- N q N_{q} ) shows the initial retriever interacts with the dataset's evidence structure. The initial retriever should be selected based on dataset-level recall-at- k k diagnostics before Re:CAP is layered on top.

Provider-side content filtering depresses recall.

All experiments run against Azure OpenAI, whose content-management policy rejects a small share of prompts as ResponsibleAIPolicyViolation. Rejected candidates produce no verdict, so any that would have been NewTopic are silently dropped and reported recall is a conservative lower bound. The effect is small per-query and well within the variance noise floor of § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2), but a non-filtered backend would likely yield slightly higher recall than reported here.

Calibrated metrics rest on benchmarks; production audit is a single snapshot.

The recall, paired- Δ \Delta , unreachable-gold, variance, and cost ladders all rest on four English-language academic benchmarks (§§ [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1)– [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2)); those metrics require per-query gold and so cannot be reported on production traffic. We do also report end-to-end audits on two unrelated live deployments over proprietary corpora ( 400 400 queries total, App. [E](https://arxiv.org/html/2609.24122v1#A5)), which confirm the gap rate, topic-source distribution, convergence behaviour, and judge-share-of-cost pattern transfer to production traffic across deployments differing in D 0 D_{0} width by ∼ \sim 5 × 5\times .

## Acknowledgments

We thank the Annotation Center of Excellence (ACoE) at JPMorgan Chase & Co. for the human annotation work reported in this paper. The annotators are salaried employees of JPMorgan Chase & Co. and performed this work as part of their regular duties.

## Disclaimer

This paper was prepared for informational purposes in part by the Machine Learning Center of Excellence group of JPMorgan Chase & Co. and its affiliates (“JP Morgan”) and is not a product of the Research Department of JP Morgan. JP Morgan makes no representation and warranty whatsoever and disclaims all liability, for the completeness, accuracy or reliability of the information contained herein. This document is not intended as investment research or investment advice, or a recommendation, offer or solicitation for the purchase or sale of any security, financial instrument, financial product or service, or to be used in any way for evaluating the merits of participating in any transaction, and shall not constitute a solicitation under any jurisdiction or to any person, if such solicitation under such jurisdiction or to such person would be unlawful.

## References

Abdul-Jaleel et al. (2004) N. Abdul-Jaleel, J. Allan, W. B. Croft, F. Diaz, L. Larkey, X. Li, M. D. Smucker, and C. Wade. UMass at TREC 2004: Novelty and HARD. In *TREC*, 2004.

Amati (2003) G. Amati. *Probability models for information retrieval based on divergence from randomness*. PhD thesis, University of Glasgow, 2003.

Asai et al. (2023) A. Asai, Z. Wu, Y. Wang, A. Sil, and H. Hajishirzi. Self-RAG: Learning to retrieve, generate, and critique through self-reflection. arXiv:2310.11511, 2023.

Bajaj et al. (2018) P. Bajaj et al. MS MARCO: A human generated machine reading comprehension dataset. arXiv:1611.09268, 2018.

Buckley et al. (2007) C. Buckley, D. Dimmick, I. Soboroff, and E. Voorhees. Bias and the limits of pooling for large collections. *Information Retrieval*, 10(6):491–508, 2007.

Chen et al. (2024) J. Chen, H. Lin, X. Han, and L. Sun. Benchmarking large language models in retrieval-augmented generation. In *AAAI*, 2024.

Clarke et al. (2008) C. L. A. Clarke, M. Kolla, G. V. Cormack, O. Vechtomova, A. Ashkan, S. Büttcher, and I. MacKinnon. Novelty and diversity in information retrieval evaluation. In *SIGIR*, pages 659–666, 2008.

Cormack et al. (2009) G. V. Cormack, C. L. A. Clarke, and S. Büttcher. Reciprocal rank fusion outperforms Condorcet and individual rank learning methods. In *SIGIR*, 2009.

Craswell et al. (2020) N. Craswell, B. Mitra, E. Yilmaz, D. Campos, and E. M. Voorhees. Overview of the TREC 2019 deep learning track. In *TREC*, 2020.

Es et al. (2023) S. Es, J. James, L. Espinosa Anke, and S. Schockaert. RAGAS: Automated evaluation of retrieval augmented generation. arXiv:2309.15217, 2023.

Faggioli et al. (2023) G. Faggioli et al. Perspectives on large language models for relevance judgment. In *ICTIR*, 2023.

Gao et al. (2023) Y. Gao, Y. Xiong, X. Gao, K. Jia, J. Pan, Y. Bi, Y. Dai, J. Sun, M. Wang, and H. Wang. Retrieval-augmented generation for large language models: A survey. arXiv:2312.10997, 2023.

Jiang et al. (2023) Z. Jiang et al. Active retrieval augmented generation. In *EMNLP*, 2023.

Ju et al. (2025) J.-H. Ju, S. Verberne, M. de Rijke, and A. Yates. Controlled retrieval-augmented context evaluation for long-form RAG. In *Findings of EMNLP*, pages 21102–21121, 2025.

Ju et al. (2026) J.-H. Ju, François G. Landry, E. Yang, S. Verberne, and A. Yates. LANCER: LLM reranking for nugget coverage. arXiv:2601.22008, 2026.

Karpukhin et al. (2020) V. Karpukhin et al. Dense passage retrieval for open-domain question answering. In *EMNLP*, 2020.

Lavrenko and Croft (2001) V. Lavrenko and W. B. Croft. Relevance-based language models. In *SIGIR*, 2001.

Lewis et al. (2020) P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W.-T. Yih, T. Rocktäschel, S. Riedel, and D. Kiela. Retrieval-augmented generation for knowledge-intensive NLP tasks. In *NeurIPS*, 2020.

Nogueira et al. (2019) R. Nogueira, W. Yang, J. Lin, and K. Cho. Document expansion by query prediction. arXiv:1904.08375, 2019.

Pavlu et al. (2012) V. Pavlu, S. Rajput, P. B. Golbus, and J. A. Aslam. IR system evaluation using nugget-based test collections. In *WSDM*, pages 393–402, 2012.

Reimers and Gurevych (2019) N. Reimers and I. Gurevych. Sentence-BERT: Sentence embeddings using Siamese BERT-networks. In *EMNLP*, 2019.

Ru et al. (2024) D. Ru et al. RAGChecker: A fine-grained framework for diagnosing retrieval-augmented generation. In *NeurIPS Datasets and Benchmarks*, 2024.

Saad-Falcon et al. (2024) J. Saad-Falcon, O. Khattab, C. Potts, and M. Zaharia. ARES: An automated evaluation framework for retrieval-augmented generation systems. arXiv:2311.09476, 2024.

Samuel et al. (2026) S. Samuel, A. Yates, D. Lawrie, I. Soboroff, T. Adriaanse, B. Van Durme, and E. Yang. CoverageBench: Evaluating information coverage across tasks and domains. arXiv:2603.20034, 2026.

Soboroff (2025) I. Soboroff. Don't use LLMs to make relevance judgments. *Information Retrieval Research*, 1(1), 2025.

Tang and Yang (2024) Y. Tang and Y. Yang. MultiHop-RAG: Benchmarking retrieval-augmented generation for multi-hop queries. In *EMNLP*, 2024.

Thomas et al. (2024) P. Thomas et al. Large language models can accurately predict searcher preferences. In *SIGIR*, 2024.

Trivedi et al. (2022) H. Trivedi, N. Balasubramanian, T. Khot, and A. Sabharwal. MuSiQue: Multihop questions via single-hop question composition. *TACL*, 10, 2022.

Trivedi et al. (2023) H. Trivedi, N. Balasubramanian, T. Khot, and A. Sabharwal. Interleaving retrieval with chain-of-thought reasoning for knowledge-intensive multi-step questions. In *ACL*, 2023.

Upadhyay et al. (2024a) S. Upadhyay, E. Kamalloo, and J. Lin. LLMs can patch up missing relevance judgments in evaluation. arXiv:2405.04727, 2024.

Upadhyay et al. (2024b) S. Upadhyay, R. Pradeep, N. Thakur, D. Campos, N. Craswell, I. Soboroff, H. T. Dang, and J. Lin. A large-scale study of relevance assessments with large language models: An initial look. arXiv:2411.08275, 2024.

Voorhees (2000) E. M. Voorhees. Variations in relevance judgments and the measurement of retrieval effectiveness. *Information Processing & Management*, 36(5):697–716, 2000.

Voorhees (2003) E. M. Voorhees. Overview of the TREC 2003 question answering track. In *TREC*, 2003.

Voorhees et al. (2021) E. M. Voorhees et al. TREC-COVID: Constructing a pandemic information retrieval test collection. *SIGIR Forum*, 54(1):1–12, 2021.

Wang et al. (2020) W. Wang, F. Wei, L. Dong, H. Bao, N. Yang, and M. Zhou. MiniLM: Deep self-attention distillation for task-agnostic compression of pre-trained transformers. In *NeurIPS*, 2020.

Wang et al. (2023) P. Wang et al. Large language models are not fair evaluators. arXiv:2305.17926, 2023.

Xie et al. (2025) K. Xie, P. Laban, P. K. Choubey, C. Xiong, and C.-S. Wu. Do RAG systems cover what matters? Evaluating and optimizing responses with sub-question coverage. In *NAACL*, pages 5836–5849, 2025.

Yang et al. (2018) Z. Yang et al. HotpotQA: A dataset for diverse, explainable multi-hop question answering. In *EMNLP*, 2018.

Zobel (1998) J. Zobel. How reliable are the results of large-scale information retrieval experiments? In *SIGIR*, 1998.

## Appendix

## Appendix A Datasets and Rationale

We evaluate on four datasets, chosen to span (i) bounded-evidence multi-hop QA — the operational regime Re:CAP is designed for — and (ii) pooled-graded IR as a contrasting regime (Table [1](https://arxiv.org/html/2609.24122v1#S3.T1) in the main body). The MS MARCO TREC-DL 2019/2020 ladder is an additional BM25-only validation surface for the sensitivity result (§ [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3)).

MuSiQue [Trivedi et al. (2022)](https://arxiv.org/html/2609.24122v1#bib.bib28) : 21K-paragraph deduped corpus, 2–4-hop chained reasoning, shortcut-resistant by design; 2,417 2{,}417 dev queries, of which we sample 100 100 with seed 42 42 . The strongest signal in our sensitivity ladder.

HotPotQA [Yang et al. (2018)](https://arxiv.org/html/2609.24122v1#bib.bib38) : 5.2M-passage Wikipedia corpus, canonical multi-hop benchmark; 5,447 5{,}447 dev / 7,405 7{,}405 test queries, of which we sample 98 98 with seed 42 42 . Provides the largest-corpus comparison point.

MultiHop-RAG [Tang and Yang (2024)](https://arxiv.org/html/2609.24122v1#bib.bib26) : 609-article news corpus, 2,556 2{,}556 test queries, 2–4 documents per query; an EMNLP 2024 RAG-native benchmark. We use the published test set ( n = 98 n=98 for our slice). The small corpus means flat BM25 top- 500 500 reaches recall 1.000 1.000 , so this dataset is best read as a saturation/ceiling sanity check rather than a discrimination result.

TREC-COVID (BEIR) [Voorhees et al. (2021)](https://arxiv.org/html/2609.24122v1#bib.bib34) : 171K biomedical passages, 50 round-3 topics with pooled graded judgements ( ∼ \sim 493 493 rel docs per query at rel ≥ 1 \text{rel}\geq 1 ; ∼ \sim 1,327 1{,}327 judged). We include it to characterise where Re:CAP's binary-novelty machinery breaks down (see Limitations, *Recall@ k k undercounts complementarity on pooled-graded corpora*).

MS MARCO TREC-DL 2019/2020 [Bajaj et al. (2018)](https://arxiv.org/html/2609.24122v1#bib.bib4); [Craswell et al. (2020)](https://arxiv.org/html/2609.24122v1#bib.bib9) : 8.8M passages, 97 NIST-judged queries with graded qrels thresholded at rel ≥ 2 \text{rel}\geq 2 . We use this as a BM25-only sensitivity ladder (Table [3](https://arxiv.org/html/2609.24122v1#S4.T3), second panel) on an independently judged, IR-standard corpus. We deliberately do not embed MS MARCO for dense or hybrid retrieval (project-budget choice); it is used only in BM25-only sensitivity configurations.

## Appendix B Related Work

Retrieval evaluation and coverage.

Recall, precision, nDCG, and MAP require relevance judgements. TREC pooling [Voorhees (2000)](https://arxiv.org/html/2609.24122v1#bib.bib32) aggregates top-ranked documents across systems and judges only the pool, but is biased toward in-pool systems, treats unjudged documents as irrelevant, and does not scale to multi-million-passage corpora that re-index frequently [Zobel (1998)](https://arxiv.org/html/2609.24122v1#bib.bib39); [Buckley et al. (2007)](https://arxiv.org/html/2609.24122v1#bib.bib5) . Novelty, diversity, and nugget-based test collections move the unit of evaluation from documents toward subtopics or information nuggets [Clarke et al. (2008)](https://arxiv.org/html/2609.24122v1#bib.bib7); [Voorhees (2003)](https://arxiv.org/html/2609.24122v1#bib.bib33); [Pavlu et al. (2012)](https://arxiv.org/html/2609.24122v1#bib.bib20) . Re:CAP adopts this topic-level unit, but does not build reusable qrels (query relevance judgements) or estimate absolute recall: it probes a single deployed pipeline for positive evidence of missed topics.

RAG evaluation frameworks.

RAGAS [Es et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib10) , ARES [Saad-Falcon et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib23) , RGB [Chen et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib6) , and RAGChecker [Ru et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib22) score supplied retrieval and generation for faithfulness, answer relevance, context relevance/recall, and module-level diagnostics. They are complementary to Re:CAP: they ask whether the answer is supported by the retrieved context; Re:CAP asks whether relevant facets exist *outside* that context and returns an actionable gap inventory.

Coverage-oriented RAG evaluation.

Closest to Re:CAP are recent coverage-oriented RAG evaluations. Xie et al. [Xie et al. (2025)](https://arxiv.org/html/2609.24122v1#bib.bib37) decompose open-ended questions into core, background, and follow-up sub-questions; CRUX evaluates whether retrieved contexts cover human-grounded information needed for long-form generation [Ju et al. (2025)](https://arxiv.org/html/2609.24122v1#bib.bib14) ; CoverageBench assembles coverage-oriented test collections [Samuel et al. (2026)](https://arxiv.org/html/2609.24122v1#bib.bib24) ; and LANCER optimises reranking for nugget coverage [Ju et al. (2026)](https://arxiv.org/html/2609.24122v1#bib.bib15) . These works assume pre-specified sub-questions, summaries, nuggets, or coverage-aware training/evaluation targets. Re:CAP instead induces a topic registry from D 0 D_{0} and A 0 A_{0} , then actively probes for missing topics without per-query qrels or pre-authored facets.

LLM-as-judge and iterative retrieval.

LLM relevance judging shows mixed results: studies report strong agreement with preferences or TREC-style assessments [Faggioli et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib11); [Thomas et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib27); [Upadhyay et al. (2024a)](https://arxiv.org/html/2609.24122v1#bib.bib30); [Upadhyay et al. (2024b)](https://arxiv.org/html/2609.24122v1#bib.bib31) , while others warn against replacing human qrels with LLM labels [Wang et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib36); [Soboroff (2025)](https://arxiv.org/html/2609.24122v1#bib.bib25) . Re:CAP's judge performs novelty classification against a per-query topic registry, not absolute relevance scoring; we validate it against held-out qrels ( 1.4 % 1.4% judge-rejection on missing-gold candidates). Self-RAG [Asai et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib3) , FLARE [Jiang et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib13) , and IRCoT [Trivedi et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib29) use iterative retrieval to *improve generation*; Re:CAP repurposes related mechanics for *evaluation*, auditing a fixed pipeline after the fact. Pseudo-relevance feedback [Lavrenko and Croft (2001)](https://arxiv.org/html/2609.24122v1#bib.bib17); [Abdul-Jaleel et al. (2004)](https://arxiv.org/html/2609.24122v1#bib.bib1) and LLM query expansion [Nogueira et al. (2019)](https://arxiv.org/html/2609.24122v1#bib.bib19) provide our baseline references. Table [7](https://arxiv.org/html/2609.24122v1#A2.T7) below summarises the positioning.

### B.1 Positioning against closest prior work

Table [7](https://arxiv.org/html/2609.24122v1#A2.T7) compares Re:CAP to four families of prior work along five capabilities.

Reading the columns.

*RAG metrics* (RAGAS, ARES, RGB, RAGChecker) score retrieval indirectly through answer faithfulness and answer/context relevance, and typically require reference answers or per-query reference contexts. *Coverage evaluation* (sub-question decomposition, CRUX, CoverageBench, LANCER, nugget-based test collections) audits coverage directly, but assumes pre-specified sub-questions, summaries, or nuggets authored offline. *Iterative RAG* (Self-RAG, FLARE, IRCoT) issues follow-up queries to *improve the generated answer*, not to evaluate the retriever, and does not surface a gap inventory. *TREC-style pooling* produces reusable qrels by aggregating top-ranked documents across many systems, but is expensive to mount per deployment and does not target a single pipeline.

Conceptual precedent.

The closest conceptual precedent for Re:CAP is nugget-based evaluation [Voorhees (2003)](https://arxiv.org/html/2609.24122v1#bib.bib33) : a fixed inventory of atomic information units against which a system is scored. Re:CAP is inspired by this style of decomposition – measuring coverage in terms of discrete information units rather than whole-document relevance – but differs in two ways. First, the units (topics) are *induced* from ( D 0 , A 0 ) (D_{0},A_{0}) and grown across iterations, rather than pre-authored as gold. Second, Re:CAP does not score against a fixed nugget set; gap probing extends the registry by generating questions that may surface novel topics, and novelty judging determines whether the retriever could have reached them. The audit signal is the *growth* of the registry under probing, not its overlap with a held-out list. Re:CAP is the only entry in Table [7](https://arxiv.org/html/2609.24122v1#A2.T7) that audits coverage on a single deployed pipeline, needs no per-query labels, and returns an actionable per-query gap inventory.

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 7: Re:CAP positioning. RAG metrics include RAGAS/ARES/RGB/ RAGChecker; Cov. eval. includes sub-question, CRUX, CoverageBench, and nugget-coverage work. indir. = indirectly (via answer quality); gen. = for generation, not for evaluation.

## Appendix C Default Re:CAP Configuration

Re:CAP exposes about a dozen knobs (loop control, generator design, LLM choice per component); the deployed default sets each to a specific value, most of them backed by an ablation reported elsewhere in this appendix. Table [8](https://arxiv.org/html/2609.24122v1#A3.T8) lists every default with a pointer to its justifying ablation, and Table [9](https://arxiv.org/html/2609.24122v1#A3.T9) breaks down the model and sampling temperature used at each pipeline step.

|   |   |   |

| --- | --- | --- |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

Table 8: Default Re:CAP configuration. Hybrid retrieval uses RRF over BM25 and MiniLM-L12 dense embeddings. *LOO* = leave-one-out.

The three remaining “—” rows are not ablated. MAX_TOPICS ( = 50 =!50 ) is a safety cap on topic-memory size that bounds prompt growth across iterations; it sits above the per-query topic count on every benchmark run, so on those workloads it acts as a guardrail rather than an active parameter. It is not inert in production: it binds on 8.0 % 8.0% of AI Search and 40.5 % 40.5% of NEWS QA queries (Table [10](https://arxiv.org/html/2609.24122v1#A5.T10)), truncating the registry and bounding | G | |G| and gap rate on those queries, so wide- D 0 D_{0} deployments should raise it before reading either signal. The two temperature rows are deterministic-by-design conventions (judge / extractors at 0 0 ; generator at 0.3 0.3 to give the role taxonomy room to diversify), documented in the “Why” column of Table [9](https://arxiv.org/html/2609.24122v1#A3.T9) rather than ablated.

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

Table 9: Per-component LLM configuration. Non-reader components share a single *pipeline model* (GPT-4.1) and are ablated jointly in the pipeline-model swap (App. [M](https://arxiv.org/html/2609.24122v1#A13), E3.5). T. = sampling temperature.

### C.1 Post-hoc topic deduplication (Step 5b)

Parallel judging in Step 5 emits one verdict per candidate document, so the same underlying topic is frequently surfaced by several candidates within a single iteration under slightly different labels (“Madonna referred to as the Queen of Pop” vs. “Madonna's Queen of Pop title”). Without deduplication these inflate the topic count and the gap inventory G G . Re:CAP collapses them in two stages before topics enter the registry T T .

Stage A — fuzzy string clustering (deterministic).

The per-iteration novel verdicts ( NewTopic and SubTopic) are normalised (lowercased, whitespace collapsed) and greedily clustered using Python's difflib.SequenceMatcher ratio with a threshold of 0.85 0.85 . For each cluster, the first label is taken as canonical, evidence document IDs are merged across cluster members, and a SubTopic verdict (with its parent) dominates if any member produced one. Stage A is deterministic and runs without an LLM call.

Stage B — semantic merge against T T (LLM).

The Stage A survivors are passed to a single LLM call (GPT-4.1, T = 0 T=0 , batches of ≤ 30 \leq 30 labels) together with the current registry T T . This deduplication call — distinct from the Step-5 novelty judge — performs two jobs at once: (i) it clusters semantically equivalent new labels — including instance-of-the-same-category collapses (e.g. “India's World Cup wins” and “Australia's World Cup wins” both fold under “Cricket World Cup winning countries”) — and picks the most category-level label as canonical; (ii) for each cluster, it marks overlaps_existing = true together with the existing_topic_id when the cluster duplicates a topic already in T T . Clusters with overlaps_existing attach their evidence to the existing topic and are *not* counted as new gaps; the remaining clusters are added to T T and to G G with the merged evidence set.

## Appendix D Deployment Recipe

For teams operating a RAG system on a proprietary corpus, Re:CAP plugs into the existing pipeline as an out-of-band auditor: (1) on a representative query sample, run Re:CAP against the current production retriever to establish a baseline (gap inventory, gap rate, N q N_{q} envelope, per-corpus cost); (2) before promoting an index, embedder, or ranker change, re-run on the same sample and compare; (3) a drop of ≥ 5 \geq 5 pp in mean recall exceeds 10 × 10\times the 0.47 % 0.47% run-to-run noise floor of § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2) and lies in the discriminative range exercised by the BM25 sensitivity ladder of § [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3), so it can be read as a real degradation rather than noise; we also watch unreachable-gold share but report no threshold for it, having measured no run-to-run floor for that quantity; (4) feed the per-query gap inventory into operations dashboards so on-call engineers see *specifically which topics* were missed rather than only an end-to-end faithfulness score.

Why hybrid retrieval.

Re:CAP's tighter, entity-anchored probes can under-explore when paired with a single-channel retriever; the dense channel in hybrid supplies the breadth that BM25 alone cannot. Hybrid is therefore the recommended default. The choice of initial retriever is not a free parameter — on HotPotQA with *dense* D 0 D_{0} , Re:CAP regresses by 3.6 3.6 pp matched- N q N_{q} because the gap-Q generator inherits dense-side biases and wastes early iterations on semantically related but non-gold documents that BM25 would have surfaced via bridge-entity lexical match (see Limitations, *Initial-retriever choice can cause cell-level regressions*). The initial retriever should be selected via standard recall-at- k k diagnostics, with Re:CAP then layered on top.

Attributing a metric move: retrieval drift vs. judge or reader drift.

Because Re:CAP has no per-query gold in production, a rise in its monitoring signals is only actionable if a retrieval-side cause can be separated from drift in the LLM components themselves. Two properties make that separation possible. First, the components are pinned: the novelty judge runs at temperature 0 0 and the gap-Q generator at 0.3 0.3 (Table [9](https://arxiv.org/html/2609.24122v1#A3.T9)), which removes deliberate sampling variance once the model version is held fixed. Pinning does not make the components deterministic — re-running the judge on identical prompts reproduces its own novel/not verdict on 94.0 % 94.0% of candidates (App. [I](https://arxiv.org/html/2609.24122v1#A9)). The operative threshold is therefore the magnitude of a move relative to that noise, not its presence. Second, that residual non-determinism is bounded and measured end-to-end — across three independent runs (§ [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2), Table [5](https://arxiv.org/html/2609.24122v1#S4.T5)) Re:CAP recall has CV 0.47 % 0.47% and gap rate CV 1.46 % 1.46% , i.e. per-verdict disagreement largely averages out at the level of the reported metrics. Under a fixed pipeline, a move exceeding those bounds cannot be produced by LLM non-determinism alone and is therefore attributable to a change on the retrieval side — an index refresh, an embedder swap, or a corpus shift.

Two caveats govern how the thresholds should be set. Gap count | G | |G| responds to retriever quality in the expected direction (§ [4.3](https://arxiv.org/html/2609.24122v1#S4.SS3)) but is the noisiest of the three signals, at CV 5.04 % 5.04% ; on the MuSiQue ladder the BM25–hybrid separation is only 1.5 × 1.5\times that run-to-run standard deviation, so | G | |G| resolves large regressions and not the adjacent-configuration differences that ladder spans. Gap rate is far more stable ( 1.46 % 1.46% ) but saturates on high-hop workloads, where it is best read as a coverage-floor breach. In practice, alert on gap rate for gradual movement, use | G | |G| for magnitude once a breach fires, and treat any | G | |G| move under roughly 2 × 2\times its noise floor as unresolved rather than as evidence of stability. Separately, none of these bounds survive a *model version* change: upgrading the judge or generator re-baselines every signal, so the pre-change sample must be re-run to re-establish the envelope before the new version is trusted. This is the same re-baselining discipline step (2) above prescribes for retriever changes.

Cost-sensitive deployments.

At $ 0.59 0.59 –$ 2.05 2.05 /q, auditing a thousand queries weekly costs roughly $ 600 600 –$ 2,100 2{,}100 per week at default settings. Tighter monitoring budgets can swap all pipeline components to GPT-4.1-mini for a 4.6 × 4.6\times cost reduction at − 0.51 -0.51 pp paired recall on HotPotQA — at the edge of the ± 0.42 \pm 0.42 pp run-to-run noise floor of § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2) (full ablation: App. [M](https://arxiv.org/html/2609.24122v1#A13), E3.5).

## Appendix E Production Deployment Case Studies

This appendix gives the full case-study description for the live production audit summarised in § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px4). We report two unrelated production deployments — “AI Search” (the original case study) and “NEWS QA” (a second cohort added to test transfer across deployments with very different D 0 D_{0} widths). Both use the paper's default configuration unchanged. Table [10](https://arxiv.org/html/2609.24122v1#A5.T10) summarises the two cohorts side by side; the rest of this appendix details AI Search first and then the NEWS QA deltas.

|   |   |   |

| --- | --- | --- |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

Table 10: Two production cohorts, same default Re:CAP configuration. Gap rate and judge dominance reproduce across both deployments; NEWS QA's ∼ \sim 5 × 5\times wider D 0 D_{0} shifts more coverage to doc-reconciliation (Step 2) and pushes more queries to the topic cap, but the iterative loop (Step 5) still contributes ∼ \sim 78 % 78% of topics on both.

Deployment.

“AI Search” is an enterprise research assistant deployed over a proprietary, frequently re-indexed knowledge corpus ( ≈ \approx 123 123 M passages) that mixes news feeds, internal research, and regulatory filings — exactly the non-stationary-with-multiple-sources-of-truth setting motivating the paper. Live queries span short factoid lookups (e.g. entity name disambiguation), multi-document analyst briefs (e.g. “what's the Street saying about *X*?”), and multi-paragraph country / sector intelligence summaries (the long-form tail of the distribution). Per-query gold qrels do not exist in this setting (corpus churn precludes exhaustive offline labelling), which is why Re:CAP was developed in the first place; consequently, we report the audit's intrinsic signals — gap rate, topic-source provenance, convergence, cost — rather than recall against gold.

Configuration.

The audit uses the paper's recommended default (Table [8](https://arxiv.org/html/2609.24122v1#A3.T8)) without modification: hybrid retrieval combining OpenSearch BM25 and an OpenAI text-embedding-3-large 1024-d dense index; GPT-5.2 reader; GPT-4.1 for the topic extractor, doc-topic reconciler, gap-Q generator (at T = 0.3 T=0.3 ), and novelty judge (at T = 0 T=0 ); MAX  _  ITER = 3 \mathrm{MAX_ITER}=3 ; 5 5 gap-Qs per iteration; expansion top- m = 50 m=50 per gap-Q; MAX  _  TOPICS = 50 \mathrm{MAX_TOPICS}=50 .

Sample.

200 200 representative production queries drawn from the live query log without filtering on query type, length, or expected complexity. We deliberately included multi-paragraph briefing queries that drive the cost long-tail rather than excluding them as outliers.

Stability.

All queries executed without any noticeable LLM failures. The only implementation issue encountered were OpenSearch concurrency related. Mean iteration count is 2.55 2.55 (median 3 3 , σ  0.71 \sigma 0.71 , range 1 1 – 3 3 ); 59 / 200 = 29.5 % 59/200=29.5% of queries converge naturally before the iteration cap, with mean convergence iteration 2.20 2.20 implying that audits for internal data might benefit from an increased MAX_ITERS cap.

Coverage signal.

Mean total topics per query is 25.1 25.1 (median 20 20 , σ  16.1 \sigma 16.1 , min  4 \min 4 , max  50 \max 50 ); 16 16 queries saturate the MAX  _  TOPICS = 50 \mathrm{MAX_TOPICS}=50 cap (long-form briefs). The per-query gap rate (fraction of topics surfaced beyond what the initial answer + reconciliation already cover; equivalently, | G | / | T final | |G|/|T_{\text{final}}| ) has mean 0.991 0.991 ; 189 / 200 = 94.5 % 189/200=94.5% of queries have gap rate = 1.0 \text{gap rate}=1.0 , and the lowest single-query gap rate is 0.60 0.60 (a short factoid query with substantial topic overlap between the initial retrieval and gap expansion). In aggregate, Re:CAP surfaces at least one previously-unretrieved topic on effectively every production query sampled.

Where topics come from.

Table [11](https://arxiv.org/html/2609.24122v1#A5.T11) breaks down the 5,017 5{,}017 total topics across 200 200 queries by their source step in the loop. 77.4 % 77.4% of the per-query coverage map is contributed by Step 5 (the gap judge's NewTopic verdicts on documents fetched in gap iterations), with the remaining 21.9 % 21.9% coming from Step 1 (the topic extractor on the initial answer) and 0.6 % 0.6% from Step 2 (doc-topic reconciliation on the initial retrieval). The doc-reconciliation share is much lower than on the benchmark runs – production reader answers are comprehensive enough that the reconciliation step rarely surfaces topics the answer omitted, leaving virtually all coverage discovery to the iterative loop.

|   |   |   |

| --- | --- | --- |

|   |   |   |

|   |   |   |

|   |   |   |

|   |   |   |

Table 11: Topic provenance on the 200 200 -query production audit. Step 5's 77.4 % 77.4% share is the iterative loop's added value: more than three-quarters of the per-query coverage map is surfaced only because Re:CAP probes beyond the initial answer.

LLM usage and cost.

Mean LLM calls per query is 410 410 (median 294 294 , max  1,703 \max 1{,}703 ); the judge accounts for 98.0 % 98.0% of calls ( 80,422 80{,}422 of 82,036 82{,}036 across the audit), matching the judge-dominance pattern of Table [4](https://arxiv.org/html/2609.24122v1#S4.T4). Mean input tokens per query is 1.18 1.18 M (median 699 699 k); mean output tokens 28.4 28.4 k (median 19.8 19.8 k). Per-query cost from the LLM-trace rollup (over the 190 190 queries with complete telemetry; 10 10 queries lost their llm_trace payload during the resume that closed the deterministic-failure tail) has median $ 1.68 1.68 , mean $ 2.73 2.73 ( Q 1 = $ 0.56 Q_{1}=$0.56 , Q 3 = $ 3.96 Q_{3}=$3.96 , max = $ 24.86 \max=$24.86 ). The median sits within the benchmark envelope of § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px1) ($ 0.59 0.59 –$ 2.05 2.05 /q); the mean sits ∼ \sim 33 % 33% above the upper bound, driven by the long-form multi-paragraph briefing queries in the long tail (the single $ 24.86 24.86 query issued 1,643 1{,}643 LLM calls across 3 3 iterations to map a 19 19 -topic intelligence brief).

NEWS QA cohort: deltas from AI Search.

“NEWS QA” is a second enterprise deployment over a multi-vendor news QA corpus ( ≈ \approx 70 70 M passages, 256 256 -d text-embedding-3-large dense index). We re-used the production pipeline's own retrieved set as D 0 D_{0} (mean 47.2 47.2 docs/q, median 33 33 , max  110 \max 110 , vs ≈ \approx 10 for AI Search) and its A 0 A_{0} as the reader output, so the audit reflects exactly what the deployed system surfaced. All other defaults match Table [8](https://arxiv.org/html/2609.24122v1#A3.T8). Gap rate has mean 0.955 0.955 , 167 / 200 167/200 ( 83.5 % 83.5% ) at rate = 1.0 \text{rate}=1.0 , 197 / 200 197/200 ( 98.5 % 98.5% ) with at least one gap. The ∼ \sim 5 × 5\times wider D 0 D_{0} shifts the topic-source mix in two ways: doc-topic reconciliation (Step 2) climbs from 0.6 % 0.6% to 4.4 % 4.4% of topics, and the MAX  _  TOPICS = 50 \mathrm{MAX_TOPICS}{=}50 cap is saturated on 81 / 200 81/200 ( 40.5 % 40.5% ) of queries (vs 8.0 % 8.0% on AI Search), so reported gap counts on NEWS QA are right-censored more often. Mean iteration count is 2.13 2.13 and natural convergence is 27.5 % 27.5% , both within a percentage point of AI Search. Per-query cost from the LLM-trace rollup has median $ 1.79 1.79 , mean $ 2.03 2.03 ( Q 1 = $ 0.51 Q_{1}=$0.51 , Q 3 = $ 3.16 Q_{3}=$3.16 , max = $ 6.87 \max=$6.87 ). The judge dominates calls at 97.6 % 97.6% (vs 98.0 % 98.0% on AI Search), matching the benchmark cost pattern.

Worked example (i) — AI Search ( idr news).

Query. *“idr news”*. D 0 D_{0} . 10 10 documents from the deployed hybrid retriever (JPM Global Markets research; April 2026 2026 slice). A 0 A_{0} topics. Bank Indonesia monetary policy and hawkish stance on IDR; FX pressures and market dynamics; analyst forecasts for 2026 2026 ; macro/fiscal headwinds; SRBI liquidity tightening. Iter-1 gap-Qs (sample). *What recent developments have occurred regarding SRBI and its role in stabilizing the IDR?*; *What analyst forecasts contradict the prevailing outlook for the IDR exchange rate in 2026 2026 ?* New topics added. Iter-1; 4 4 SubTopic and 1 1 NewTopic after dedup. SRBI-driven liquidity tightening on deposit and credit growth; IDR depreciation on property developers' costs and debt exposure; Middle-East de-escalation on Indo CDS and IDR outlook; MSCI market-classification reforms on Indonesian equities; equity-market sentiment under macro risk. Iter-2. 5 5 further probes, no novel verdicts; the loop converges. Interpretation. The deployed reader returned a coherent top-line briefing; the loop doubled topic coverage by surfacing five distinct second-order dimensions the initial answer left implicit, without leaving the production retriever's reachable candidate pool.

Worked example (ii) — NEWS QA (Tyler Technologies).

Query. *“Why has Tyler Technologies' stock price been declining and what are the issues affecting its performance?”* D 0 D_{0} . 7 7 documents from production (Reuters and Benzinga, February 2026 2026 ). A 0 A_{0} topics. Government budget cuts on revenue; Q 4 4 earnings and revenue miss; slower cloud migration and extended procurement cycles; analyst downgrades and reduced price targets; financial metrics indicating weak capital efficiency. Iter-1 gap-Qs (sample). *What evidence exists that contradicts the claim that Tyler Technologies has missed analyst expectations or delivered disappointing financial results?*; *Why has Tyler Technologies' stock price been declining, regardless of specific economic conditions or government budget changes?* New topics added. Iter-1, all NewTopic after dedup. Share-repurchase plan as a capital-allocation response to perceived undervaluation; acquisition of *For The Record* expanding the court-technology portfolio; tail risks from cyber-attacks, AI vulnerabilities, and regulatory changes. Iter-2. Two additional candidates clear the judge but fold into existing topics in post-iteration dedup; the loop converges with new  _  topics  _  found = 0 \mathrm{new_topics_found}=0 . Interpretation. The deployed pipeline correctly identified the headline drivers of decline; the loop additionally surfaced the company's response (buybacks, M&A) and an unstated risk register, both directly relevant to the *why is the stock declining* query and neither present in A 0 A_{0} .

Scope of these case studies.

These audits confirm that Re:CAP runs end-to-end on two unrelated live production deployments with no production-specific code path, that the gap discovery rate observed on benchmarks transfers to live traffic, and that the iterative loop — not the initial answer — contributes the bulk of the per-query coverage map across both cohorts despite a ∼ \sim 5 × 5\times difference in D 0 D_{0} width. They do not provide calibrated recall numbers (no production gold labels) or variance estimates (single run per cohort). Those roles remain with the four benchmark datasets reported in §§ [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1)– [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2). Judge accuracy on production traffic is bounded directly by the human read of App. [F](https://arxiv.org/html/2609.24122v1#A6), and indirectly by the 1.4 % 1.4% judge-rejection rate of App. [O](https://arxiv.org/html/2609.24122v1#A15). That human read samples only documents the judge called gap-filling, so it bounds the judge's precision on this traffic and not the gaps it missed.

## Appendix F Human Evaluation on the Production Cohorts

§ [5](https://arxiv.org/html/2609.24122v1#S5) evaluates recovered documents on public benchmarks, where relevance labels exist. This appendix repeats the exercise on the two production cohorts of App. [E](https://arxiv.org/html/2609.24122v1#A5), where no relevance labels exist and the corpora are proprietary.

Setup.

We sampled 180 180 documents that Re:CAP's novelty judge marked as gap-filling, drawn from 180 180 distinct queries and split evenly between the two cohorts. Three annotators saw the query, the deployed reader's D 0 D_{0} -only baseline answer, and the document text, blinded to the judge's verdict and to the cohort. The rubric is the binary *new_info* / *covered* decision of § [5](https://arxiv.org/html/2609.24122v1#S5).

Result.

75.6 % 75.6% of judge-identified gap documents on AI Search and 72.2 % 72.2% on NEWS QA add information the baseline answer lacks ( 73.9 % 73.9% overall, [ 67.0 [67.0 – 79.8 ] 79.8] ; Table [12](https://arxiv.org/html/2609.24122v1#A6.T12)).

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 12: Human-evaluation verdicts on judge-identified gap documents from the two production cohorts. *new* is the majority-vote *new_info* count; 95 % 95% CIs are Wilson.

### F.1 Adjudication pass

Where an annotator disagreed with an independent blind judge, an LLM adjudicator (gpt-5.5, extra-high reasoning) re-read that annotator's item — seeing their verdict and comment but not the other annotators' — and proposed a revision where it could cite a specific supporting fact. All other items keep the annotator's original verdict, and the annotators confirmed every proposed revision.

Two consequences follow. First, the annotators confirmed after seeing the model's verdict and reasoning, so agreement over the confirmed verdicts is not independent inter-annotator agreement: on revised items the label originates with the model. 19 of the 180 180 items were revised for all three annotators and therefore carry an identical label by construction; the remaining 161 161 retain per-annotator variation. Second, the two figures measure different things, which is why both are reported: 73.9 % 73.9% after adjudication and 65.0 % 65.0% independently, the latter at Fleiss κ = 0.74 \kappa=0.74 and the conservative reading.

## Appendix G Full Cross-Dataset Results (Including TREC-COVID Matrix)

Table [13](https://arxiv.org/html/2609.24122v1#A7.T13) repeats the cross-dataset comparison of § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1) and includes the full 4 4 -cell retriever × \times generator matrix on TREC-COVID, which we elided from the main body for compactness. The TREC-COVID matrix illustrates the structural-complementarity finding of § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1): no combination of retriever (BM25 / dense / hybrid) and generator ( ( Q + T ) (Q{+}T) -only / five-mechanism) closes the small negative recall delta against flat BM25 top- 500 500 , yet every cell maintains a ≥ 45 % \geq 45% vs-BM25-500 unreachable-gold share. The default Re:CAP cell goes further: 21.2 % 21.2% of its recovered gold remains absent even from the *ensemble* of flat BM25, dense, and hybrid top- 500 500 combined (Table [17](https://arxiv.org/html/2609.24122v1#A11.T17)). The negative recall delta is a regime-level metric mismatch on pooled-graded corpora (see Limitations, *Recall@ k k undercounts complementarity on pooled-graded corpora*), not a cell-specific failure; the audit-relevant signal is the complementarity. Appendix [H](https://arxiv.org/html/2609.24122v1#A8) sweeps flat BM25 depth K K on HotPotQA and TREC-COVID and locates the depth at which flat retrieval catches up.

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

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 13: Full cross-dataset matrix including the 4-cell TREC-COVID retriever × \times generator sweep. Default = = hybrid retriever with the five-mechanism generator (bold rows); the ( Q + T ) (Q{+}T) row marks the ( Q + T ) (Q{+}T) -only generator ablation. † Every TREC-COVID cell maintains ≥ 45 % \geq 45% vs-BM25-500 unreachable-gold share; the default cell adds 21.2 % 21.2% ensemble-unreachable on 98 % 98% of queries (Table [17](https://arxiv.org/html/2609.24122v1#A11.T17)). The small negative recall delta is a metric mismatch on pooled-graded corpora, not a cell-specific failure (see Limitations).

## Appendix H Recall vs. Retrieval Depth

Table [3](https://arxiv.org/html/2609.24122v1#S4.T3) sweeps retrieval depth on MuSiQue and MS MARCO TREC-DL. This appendix completes that sweep on the two remaining benchmarks, HotPotQA and TREC-COVID, over the full range of K K for which we hold per-query judgements (Figure [2](https://arxiv.org/html/2609.24122v1#A8.F2), Table [14](https://arxiv.org/html/2609.24122v1#A8.T14)). The curves are recomputed from the per-query records of the same runs that back Table [2](https://arxiv.org/html/2609.24122v1#S4.T2) rather than transcribed from it, so the two cannot drift apart; the recomputation reproduces every published flat-BM25 confidence interval exactly. Deltas are paired per query and then bootstrapped ( 1000 1000 resamples, seed 42 42 ), the same estimator used throughout the paper.

Two observations. First, Re:CAP's advantage is monotone decreasing in K K : it is largest where retrieval is shallow ( + 29.1 +29.1 pp on HotPotQA and + 20.6 +20.6 pp on TREC-COVID at K = 10 K{=}10 ) and shrinks as the flat baseline is permitted to see more of the corpus. This is the expected shape — Re:CAP spends its budget on *which* regions of the corpus to probe, an advantage that necessarily erodes once a flat run is allowed to read the corpus exhaustively.

Second, the depth at which the flat baseline catches up separates the two corpora, and the separation is the scope boundary reported in § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1). On HotPotQA, Re:CAP at 249 documents per query still leads flat BM25 at K = 200 K{=}200 by 6.1 6.1 pp and is statistically indistinguishable from K = 500 K{=}500 while reading half as many documents. On TREC-COVID, Re:CAP at 378 documents matches flat K = 500 K{=}500 within noise and is then overtaken at K = 1000 K{=}1000 , by 10.6 10.6 pp at 2.6 × 2.6\times its document budget.

The crossover is reported in full because on a pooled-graded corpus Recall@ k k rewards depth mechanically, since deeper pools intersect more of the judged set (see Limitations, *Recall@ k k undercounts complementarity on pooled-graded corpora*). The audit signal Re:CAP is built to produce — gold that no flat run surfaces at any depth we can afford in production — is unchanged by it: 21.2 % 21.2% of Re:CAP's recovered gold on TREC-COVID is absent from the *union* of flat BM25, dense, and hybrid top- 500 500 (Table [17](https://arxiv.org/html/2609.24122v1#A11.T17)). Aggregate recall at K = 1000 K{=}1000 is therefore not the quantity the TREC-COVID result rests on.

Figure 2: Recall vs. flat BM25 retrieval depth K K , HotPotQA and TREC-COVID. Blue: flat BM25 recall at depth K K , shaded band is the 95 % 95% bootstrap CI. Red star: Re:CAP at its own mean docs-seen budget (dotted guide), with 95 % 95% CI. The y y -axes are independent — the two corpora sit in very different recall regimes — while the x x -axes are shared; HotPotQA's sweep stops at K = 500 K{=}500 . Re:CAP leads by a wide margin at shallow K K on both corpora and is caught between K = 500 K{=}500 and K = 1000 K{=}1000 , earlier on TREC-COVID, the scope-boundary case of § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1). Paired per-query deltas with CIs in Table [14](https://arxiv.org/html/2609.24122v1#A8.T14).

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

Table 14: Flat BM25 recall at depth K K , and the paired per-query delta Δ \Delta (Re:CAP − - flat@ K K ) in percentage points, for the curves of Figure [2](https://arxiv.org/html/2609.24122v1#A8.F2). Re:CAP reads 249 documents per query on HotPotQA and 378 on TREC-COVID, so rows below those depths favour Re:CAP on budget as well as on recall. *n.s.* marks a delta whose CI contains zero.

## Appendix I Cross-model re-judgement

The gap judge and the answer generator share a model family, so the judge's accept/reject decisions are re-run against a newer generation to test whether they are family-specific. We draw a stratified sample of n = 1000 n=1000 judged candidates from the runs whose judge calls are stored verbatim: every new_topic and sub_topic candidate in the pool, with irrelevant and redundant subsampled to fill the remainder. We replay the judge prompt against gpt-5.4-mini-2026-03-17 and gpt-5.5-2026-04-24. Each model judges every candidate three times and votes; agreement is between a challenger's majority verdict and gpt-4.1-2025-04-14's own majority verdict on the same prompts, so all three panels are measured the same way.

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

Table 15: Novel vs. not-novel agreement ( κ = 0.410 \kappa=0.410 (gpt-5.4-mini), κ = 0.543 \kappa=0.543 (gpt-5.5)). A candidate is *novel* if the judge assigns new_topic or sub_topic; the topic registry counts both identically when forming | G | |G| , so this is the only verdict distinction any reported quantity depends on. On the full four-way taxonomy, which organises the topic tree rather than producing a number, agreement is 54.1% (gpt-5.4-mini), 59.9% (gpt-5.5). *Self-agreement* is the mean pairwise agreement between replicate runs of the same model on the same prompts, and bounds the second column: gpt-4.1 reproduces its own verdicts on 94.0% of candidates, so agreement above that level is not attainable. gpt-5.5 is the most self-consistent model measured, exceeding the deployed judge. Candidates span 166 distinct queries; intervals are bootstrapped over queries rather than candidates, since candidates from one query share a topic registry and a baseline answer.

Models are run at temperature 0 0 where the deployment permits it. gpt-5.5-2026-04-24 serves only the API default of 1 1 , so that model is run at that setting; the resulting sampling variance is quantified by the self-agreement column. Reasoning is disabled on every deployment that supports it, matching the configuration of the deployed gpt-4.1 judge, so that model generation rather than deliberation budget is the variable under test.

The judge prompt was written for the deployed model and may therefore disadvantage a newer one. To test this, the relevance step was rewritten to admit intermediate (“bridge”) evidence, which multi-hop queries require and which the newer models were disproportionately rejecting; both challenger models were then re-run unchanged in every other respect. Agreement moved by + 1.0 +1.0 and + 5.0 +5.0 points and the multi-hop rejection rate was unchanged, indicating that the disagreement reported here is not an artefact of prompt wording.

Our production infrastructure is Azure-OpenAI-only, so a truly cross-family (Anthropic / Google) audit is feasible on benchmark artefacts but not on production cohorts. The sample above is therefore drawn entirely from benchmark artefacts.

## Appendix J Pseudo-Relevance Feedback Baseline (RM3)

We compare Re:CAP against RM3 pseudo-relevance feedback [Lavrenko and Croft (2001)](https://arxiv.org/html/2609.24122v1#bib.bib17); [Abdul-Jaleel et al. (2004)](https://arxiv.org/html/2609.24122v1#bib.bib1) as the closest classical query-expansion control. RM3 uses canonical defaults (no per-dataset tuning): k fb = 10 k_{\text{fb}}=10 feedback documents, n exp = 20 n_{\text{exp}}=20 expansion terms, λ orig = 0.5 \lambda_{\text{orig}}=0.5 , min_df = 5 \text{min_df}=5 , maximum document-frequency ratio 0.5 0.5 ; stopwords, numerics, and original-query terms are excluded from the expansion candidates.

Figure 3: Recall vs. documents seen per query, three datasets. Flat baselines (blue circles) at their native top- N N budgets; Re:CAP at the deployed default (red star). On MuSiQue and HotPotQA, Re:CAP attains the highest recall at less than half the document budget of the strongest flat baseline. TREC-COVID is the scope-boundary case: Re:CAP recall is within noise of flat BM25 top- 500 500 , but 21.2 % 21.2% of its recovered gold remains unreachable by the ensemble of flat BM25, dense, and hybrid top- 500 500 combined, so the audit signal here is structural complementarity rather than aggregate recall. Error bars are 95 % 95% bootstrap CIs; MultiHop-RAG omitted (corpus saturates at flat top- 500 500 ). Numbers in Table [2](https://arxiv.org/html/2609.24122v1#S4.T2).

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 16: Re:CAP vs. RM3 (PRF) across the six main cells ( n = 98 n=98 – 100 100 per row). PRF N q N_{q} matches Re:CAP's unique-candidate budget; PRF 500 500 is the unbounded baseline. Across all six cells, RM3 lifts top- 500 500 recall by at most 1.6 1.6 pp over flat BM25 top- 500 500 . † The HotPot-dense regression is the cell flagged under Limitations ( *Initial-retriever choice can cause cell-level regressions*): dense D 0 D_{0} misses the bridge-entity lexical signal that RM3 inherits from its BM25 backbone. ⋆ MultiHop-RAG saturates at PRF top- 500 500 on its 3.8 3.8 k-doc corpus; Re:CAP wins at matched- N q N_{q} by + 2.5 +2.5 to + 7.9 +7.9 pp.

On the bounded-evidence primary where flat retrieval leaves the most room (MuSiQue), Re:CAP beats RM3 by + 19.4 +19.4 to + 19.7 +19.7 pp at top- 500 500 and by + 26.5 +26.5 to + 27.4 +27.4 pp at matched- N q N_{q} . On HotPotQA-hybrid Re:CAP matches PRF top- 500 500 (both 0.888 0.888 ) using 249 249 documents rather than 500 500 , and recovers 7.5 % 7.5% of gold absent from PRF top- 500 500 ; on MuSiQue this unreachable share rises to 28 28 – 30 % 30% . The one Re:CAP regression cell (HotPot-dense) is the dataset × \times retriever combination already noted under Limitations. We do not report Bo1 [Amati (2003)](https://arxiv.org/html/2609.24122v1#bib.bib2) separately: on our datasets it tracks RM3 within ± 1 \pm 1 pp and the conclusions are identical.

## Appendix K Unreachable-Gold Diversification

Table [17](https://arxiv.org/html/2609.24122v1#A11.T17) reports per-dataset shares of gold documents Re:CAP surfaces via gap probing that *individual* flat top- 500 500 baselines (BM25, dense, hybrid) cannot reach, plus the strictest cell: the *ensemble*-unreachable share, i.e., gold absent from all three baselines combined ( 1,500 1{,}500 docs total). This operationalises the diversification claim (§ [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1)): Re:CAP retrieves a structurally distinct slice of the corpus that no single-retriever upgrade recovers. The ensemble shares are non-zero on every dataset shown, peaking at 21.2 % 21.2% on pooled-graded TREC-COVID where the gold pool is largest and most diverse.

|   |   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |

Table 17: Per-baseline and ensemble unreachable shares: Re:CAP-recovered gold absent from the indicated flat top- 500 500 baseline, or from the *ensemble* of all three baselines combined ( 1,500 1{,}500 docs total). All Re:CAP runs use the deployed default (hybrid D 0 D_{0} , five-mechanism generator). Dense- D 0 D_{0} Re:CAP gives shares within ± 2 \pm 2 pp of the hybrid rows (not tabulated). *RR gold* = total Re:CAP-recovered ( q , doc ) (q,\text{doc}) pairs summed across queries. *Qs ≥ 1 \geq 1 (ens.)* = share of queries with at least one ensemble-unreachable doc. MultiHop-RAG is omitted: flat BM25 top- 500 500 reaches recall 1.000 1.000 on that corpus (App. [G](https://arxiv.org/html/2609.24122v1#A7)), so no gold is unreachable and the shares are undefined.

## Appendix L Controlled Gold Deletion (E2.2)

Protocol.

For each MuSiQue query in the M 0 M_{0} slice ( n = 100 n=100 , hybrid retriever, N q = 5 N_{q}=5 , MAX_ITER = 3 =3 ), we remove K ∈ { 1 , 2 , all } K\in{1,2,\text{all}} *gold* passages from D 0 D_{0} (drop-all removes every gold doc that naturally surfaced in the top- 10 10 ) and ask whether Re:CAP re-discovers them through gap probing. Nine queries have no gold passage in their top- 10 10 D 0 D_{0} and are excluded from the drop test, leaving n = 91 n=91 per drop cell. The reference is the no-drop run restricted to the same 91 91 queries, at recall 0.919 0.919 ( 0.901 0.901 over the full 100 100 ; the excluded nine are precisely the queries whose gold never surfaced).

Result.

For drop- 1 1 , drop- 2 2 , and drop-all, Re:CAP recovers 98.9 % 98.9% , 98.4 % 98.4% , and 100.0 % 100.0% of the deleted gold IDs respectively, with 97.8 97.8 – 100 % 100% of queries achieving full recovery in each cell. Paired recall on drop- 1 1 , drop- 2 2 , and drop-all drops by 11.9 11.9 , 13.5 13.5 , and 10.9 10.9 pp respectively (vs. reference 0.919 0.919 ). The recall loss is *not* attributable to failed recovery ( 98 98 – 100 % 100% recovery shown above); it is the *secondary* gold that no longer surfaces. In the no-drop run, iterative expansion picks up ∼ \sim 10 10 pp of gold beyond D 0 ∩ qrels D_{0}\cap\text{qrels} by triangulating from the answer; when D 0 D_{0} is poorer, the seed answer is impoverished and downstream gap-Qs find fewer new probe directions. The 11 11 – 13 13 pp paired loss is therefore a lower bound on the value of a non-empty D 0 D_{0} , not a failure of probe-driven recovery.

The three cells are near-replicates.

MuSiQue rarely places more than one gold passage in D 0 D_{0} : of the 91 91 queries, 62 62 have exactly one, 26 26 have two and 3 3 have three. All three cells therefore delete identical documents on 62 / 91 62/91 queries, and drop- 2 2 and drop-all coincide on 88 / 91 88/91 . The spread across the three cells ( 2.6 2.6 pp) is also smaller than run-to-run non-determinism: on the 88 88 queries where drop- 2 2 and drop-all delete the same documents, mean recall still differs by 2.7 2.7 pp between the two runs. E2.2 should therefore be read as one recovery result replicated three times, not as a severity ordering; the ordering of the cells is not resolvable here.

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 18: Controlled deletion (E2.2). “recovery” is per-query mean (recovered ∩ \cap dropped)/(dropped). Δ \Delta pp = = paired (ref − - cell) × \times 100. Gap count | G | |G| rises monotonically with K K ( 3.6 → 5.4 3.6\to 5.4 , + 51 % +51% ). All columns are over the 91 91 queries that had gold to delete.

## Appendix M Ablations

We ablate Re:CAP along four dimensions: (i) gap-Q generator design — the ( Q + T ) (Q{+}T) -only ablation vs. the five-mechanism deployed default (§ [M.1](https://arxiv.org/html/2609.24122v1#A13.SS1)); (ii) per-lever leave-one-out within the five-mechanism generator, attributing its lift to each of its five mechanisms (§ [M.2](https://arxiv.org/html/2609.24122v1#A13.SS2)); (iii) the three primary loop hyper-parameters — gap-Qs per iteration N q N_{q} , expansion depth m m , and iteration cap (§ [M.3](https://arxiv.org/html/2609.24122v1#A13.SS3)); (iv) the pipeline-LLM swap and a generator-vs-judge cost decomposition (§ [M.4](https://arxiv.org/html/2609.24122v1#A13.SS4)). Table [21](https://arxiv.org/html/2609.24122v1#A13.T21) summarises the sweeps; Figure [4](https://arxiv.org/html/2609.24122v1#A13.F4) places each cell on the MuSiQue cost-quality Pareto front.

Figure [4](https://arxiv.org/html/2609.24122v1#A13.F4) visualises Re:CAP's internal cost-quality trade-off across the E  3 E3 ablation grid on MuSiQue. The recommended default ( N q = 5 N_{q}!=!5 , m = 50 m!=!50 , MAX_ITER = 3 !=!3 , gpt-4.1 pipeline) sits at the elbow of the Pareto front: spending 2 × 2\times more (the N q = 10 N_{q}!=!10 or top- m = 100 m!=!100 cells) buys + 3 +3 – 4 4 pp recall, while spending 3 × 3\times less (the N q = 1 N_{q}!=!1 cell) costs − 10 -10 pp. The front is monotone in recall up to ∼ \sim $1/q — no ablation simultaneously reduces cost and lifts recall. The chart is intra-Re:CAP: flat-retrieval baselines return ranked documents but produce no coverage audit, so they are not plotted on this axis; matched-budget recall comparisons appear in Table [2](https://arxiv.org/html/2609.24122v1#S4.T2).

Figure 4: Re:CAP cost-quality trade-off on MuSiQue ( n = 100 n=100 , hybrid retrieval + redesigned generator). Star = = recommended default ( $ 0.59 $0.59 /q, recall 0.901 0.901 ); dashed line = = Re:CAP Pareto front across the E  3 E3 ablation grid; markers indicate which hyper-parameter sweep each point comes from (E3.2 N q N_{q} , E3.3 expansion top- m m , E3.4 MAX_ITER).

### M.1 Gap-Q generator design (E3.1)

Table [19](https://arxiv.org/html/2609.24122v1#A13.T19) reports the full 2 × 2 × 3 2\times 2\times 3 matrix (retriever × \times generator × \times dataset). The five-mechanism generator beats the ( Q + T ) (Q{+}T) -only ablation on hybrid by + 1.1 +1.1 pp on MuSiQue and + 4.9 +4.9 pp on HotPotQA; MultiHop-RAG is at ceiling. Two cells regress. The larger — MuSiQue with BM25 + five-mechanism, − 5.4 -5.4 pp — is a retriever-coupling effect: tighter probes under-explore on a single-channel retriever, and the regression vanishes on hybrid. The smaller is MultiHop-RAG on hybrid ( − 1.0 -1.0 pp), where the corpus is already at ceiling.

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 19: Gap-Q generator ablation (E3.1): Re:CAP mean recall by retriever × \times gap-Q generator. *QT* = ( Q + T ) (Q{+}T) -only baseline; *5m.* = five-mechanism generator. Default in bold.

### M.2 Per-lever leave-one-out (E3.1.2)

Table [20](https://arxiv.org/html/2609.24122v1#A13.T20) attributes the five-mechanism generator's lift to each of its mechanisms via a 15-cell LOO sweep (5 levers × \times 3 bounded-evidence datasets, 100 100 q each on hybrid). Paired Δ \Delta is mean per-query (reference recall − - leave-one-out recall) in pp; positive Δ \Delta means *dropping* the lever hurts. Cells with | Δ | > 0.42 |\Delta|>0.42 pp (the variance noise floor of § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2)) are bolded.

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 20: Per-lever leave-one-out (E3.1.2). Paired Δ \Delta in pp; positive = = lever helps recall. Lever A (entity-anchored gap-Q generation) accounts for nearly all of the five-mechanism generator's lift on the two bounded-evidence chain datasets; on near-ceiling MultiHop-RAG it mildly hurts because entities are already pinned by the question's surface form.

Decomposition: the five-mechanism generator is one dominant anchoring mechanism plus four supporting refinements. Lever A's + 8.58 +8.58 pp on MuSiQue and + 4.17 +4.17 pp on HotPotQA recover the entirety of the five-mechanism generator's hybrid-cell lift from Table [19](https://arxiv.org/html/2609.24122v1#A13.T19). On MultiHop-RAG, dropping A *raises* recall by 1.47 1.47 pp at near-ceiling reference: the entity-ledger prompt over-constrains when the question itself names the relevant entities (“between article X and article Y…”).

### M.3 Number of gap questions (E3.2), expansion depth (E3.3), iteration depth (E3.4)

We swept each of the three primary hyper-parameters individually on the MuSiQue M 0 M_{0} slice ( 100 100 q, hybrid, five-mechanism generator, other defaults held). All three curves confirm the default Re:CAP config sits at the cost-recall knee.

E3.2 N q N_{q} . Recall climbs monotonically: 0.802 → 0.883 → 0.901 → 0.936 0.802\to 0.883\to 0.901\to 0.936 for N q ∈ { 1 , 3 , 5 , 10 } N_{q}\in{1,3,5,10} at per-query cost $ 0.19 / 0.46 / 0.59 / 1.01 0.19/0.46/0.59/1.01 . N q = 10 N_{q}!=!10 buys + 3.5 +3.5 pp paired over the default N q = 5 N_{q}!=!5 at + 71 % +71% cost.

E3.3 expansion top- m m . Recall 0.875 → 0.901 → 0.938 0.875\to 0.901\to 0.938 at cost $ 0.25 / 0.59 / 1.25 0.25/0.59/1.25 for m ∈ { 20 , 50 , 100 } m\in{20,50,100} . m = 100 m!=!100 buys + 3.7 +3.7 pp at + 113 % +113% cost.

E3.4 MAX_ITER. Iter = 1 =!1 drops 4.0 4.0 pp paired (outside the noise floor); iter ∈ { 2 , 3 , 5 } \in{2,3,5} are within ± 2 \pm 2 pp of each other with iter = 2 =!2 nominally best ( − 0.83 -0.83 pp vs. ref, roughly 2 × 2\times the 0.42 0.42 pp variance noise floor of § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px2) and roughly five times smaller than the iter = 1 =!1 drop). Mean iterations actually run is 1.00 / 1.75 / 1.79 / 1.91 1.00/1.75/1.79/1.91 respectively (anti-collapse termination dominates for ≥ 2 \geq 2 ), so on the public benchmarks reported here MAX_ITER > 3 >!3 buys neither recall nor convergence depth. We default to 3 3 for headroom: on internal production traffic with broader, more open-ended queries we observe occasional cases where the loop still surfaces novel topics at iter = 3 =!3 that iter = 2 =!2 misses, suggesting the public benchmarks under-sample the regime where deeper iteration helps.

### M.4 Pipeline-model swap (E3.5) and generator-vs-judge cost decomposition (E3.6)

Swapping every *pipeline* component (generator, judge, topic extractor, reconciler) from GPT-4.1 to GPT-4.1-mini on HotPotQA drops recall by 0.51 0.51 pp paired ( 0.888 → 0.884 0.888\to 0.884 , on the edge of the 0.42 0.42 pp noise floor) while cutting per-query cost from $ 0.586 0.586 to $ 0.128 0.128 ( − 78 % -78% ). The reader (GPT-5.2) is held fixed. Pipeline LLM quality is largely interchangeable against a stronger reader, and this is the largest cost lift available in the ablation grid.

To attribute the E  3.5 E3.5 saving, E  3.6 E3.6 isolates each component on the same HotPotQA slice with reader/extractor/reconciler held at GPT-4.1. (i) Generator = = mini, judge = = 4.1: recall 0.884 0.884 (paired Δ = + 0.51 \Delta=+0.51 pp), cost $ 0.537 0.537 /q ( − 8 % -8% ). (ii) Generator = = 4.1, judge = = mini: recall 0.867 0.867 (paired Δ = + 2.06 \Delta=+2.06 pp, outside the noise band), cost $ 0.145 0.145 /q ( − 75 % -75% ). The judge dominates both cost and quality; the generator is interchangeable across model tiers. This is the direct empirical attribution behind the ∼ \sim 97 % 97% -judge claim in Table [4](https://arxiv.org/html/2609.24122v1#S4.T4) and behind the recommendation to keep the judge at GPT-4.1 unless the deployment can tolerate ∼ \sim 2 2 pp recall in exchange for the additional ∼ \sim 70 % 70% cost saving.

|   |   |

| --- | --- |

|   |   |

|   |   |

|   |   |

|   |   |

|   |   |

|   |   |

Table 21: Ablation summary: the parameter sweeps reported across § [M](https://arxiv.org/html/2609.24122v1#A13). Per-cell numbers are in the corresponding subsection.

## Appendix N Component Validation and Generality

### N.1 Cross-dataset generality (E5.2)

Table [22](https://arxiv.org/html/2609.24122v1#A14.T22) reports the default configuration applied identically across four datasets with no per-dataset tuning.

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Table 22: Cross-dataset generality (E5.2): default config applied with no per-dataset tuning. Δ \Delta is vs. flat BM25 at matched- N q N_{q} ; | G | |G| is mean Re:CAP gap count per query.

### N.2 Judge ceiling and gap-Q quality from gold labels

Judge ceiling. The primary component-level question is how often the LLM judge rejects a candidate that the gold qrels mark relevant. Across all 86 86 loss queries and 20,146 20{,}146 missing-gold documents (§ [O](https://arxiv.org/html/2609.24122v1#A15), Table [23](https://arxiv.org/html/2609.24122v1#A15.T23)), 1.4 % 1.4% of missing gold reached the candidate pool but was rejected by the judge; on the bounded-evidence primaries (HotPotQA, MuSiQue, MultiHop-RAG) the rate is 4.7 % 4.7% ( 3 / 64 3/64 ). The judge is therefore an empirically tight upper bound on the audit in the regime Re:CAP is designed for: > 95 % >95% of missing-gold losses are upstream of judging. This is consistent with LLM-as-judge studies on narrow relevance tasks [Faggioli et al. (2023)](https://arxiv.org/html/2609.24122v1#bib.bib11); [Thomas et al. (2024)](https://arxiv.org/html/2609.24122v1#bib.bib27); [Upadhyay et al. (2024a)](https://arxiv.org/html/2609.24122v1#bib.bib30); [Upadhyay et al. (2024b)](https://arxiv.org/html/2609.24122v1#bib.bib31) , while respecting cautions against replacing full human qrels with LLM labels [Soboroff (2025)](https://arxiv.org/html/2609.24122v1#bib.bib25) .

Gap-Q quality (extrinsic). We evaluate gap-Q quality by the most direct operational signal: whether the questions recover gold the host retriever missed. Three converging pieces of evidence. (i) *Diversity:* mean pairwise LLM-embedding cosine 0.599 0.599 across batches on the MuSiQue 100 100 -query anchor (target ≤ 0.7 \leq 0.7 ; max 0.758 ≤ 0.85 0.758\leq 0.85 ). (ii) *Role coverage:* the five-role taxonomy enforces ≥ 3 \geq 3 of 5 5 probe roles per batch. (iii) *Causal contribution:* the per-lever LOO sweep (§ [M](https://arxiv.org/html/2609.24122v1#A13), Table [20](https://arxiv.org/html/2609.24122v1#A13.T20)) attributes + 8.58 +8.58 pp on MuSiQue and + 4.17 +4.17 pp on HotPotQA to the entity-anchored gap-Q lever alone — the main recall lift *is* the gap-Q quality measurement under the audit's own objective.

### N.3 Human-evaluation protocol on ensemble-unreachable gap documents

This appendix expands the body § [5](https://arxiv.org/html/2609.24122v1#S5) human evaluation: sample design and item-and-rubric protocol. Verdict counts are reported in Table [6](https://arxiv.org/html/2609.24122v1#S5.T6) in the body.

Sample. n = 123 n=123 items from the deployed default (hybrid retrieval + five-mechanism generator). TREC-COVID: n = 100 n=100 stratified-random sample from the 1,034 1{,}034 ensemble-unreachable docs in the 50 50 -query run, target 2 2 docs/query covering all 50 50 queries with ≥ 1 \geq 1 ensemble-unreachable doc. MuSiQue: census of all n = 23 n=23 ensemble-unreachable docs from the 100 100 -query run. HotPotQA is omitted ( 4 4 ensemble-unreachable docs, insufficient for per-doc inference); MultiHop-RAG is omitted ( 0 0 , corpus saturates); MS MARCO is omitted (BM25-only setup; no ensemble defined).

Item and rubric. Per item the annotator sees the query, the baseline reader's answer generated from the deployed default's D 0 D_{0} alone, and the candidate document text (truncated at ∼ \sim 500 500 words). Blinded to: which baseline(s) miss the document, qrels status, dataset name. Binary rubric: *new_info* if the document contains a substantive query-relevant fact not in the baseline answer (a new entity, a numeric or temporal anchor, a correction, an unambiguating clarification); *covered* if the relevant content is substantively present in the baseline answer. All sampled docs are gold-relevant by construction (NIST TREC pool / MuSiQue dataset authors), so the rubric does *not* adjudicate relevance, only informational novelty.

Worked example.

Figure [5](https://arxiv.org/html/2609.24122v1#A14.F5) shows one annotation item from the TREC-COVID slice. The deployed default's D 0 D_{0} (hybrid top- 10 10 ) yields an A 0 A_{0} on paediatric COVID- 19 19 outcomes. Re:CAP's gap-question generator produces an iteration- 3 3 constraint-relaxed probe “What are the health outcomes for children who contract viral respiratory infections, including but not limited to COVID- 19 19 ?”; expanded retrieval on this probe surfaces the candidate “Laboratory Findings of COVID- 19 19 Infection are Conflicting in Different Age Groups…”, which adds paediatric-specific lab markers (CRP, WBC, procalcitonin) absent from A 0 A_{0} . The candidate is qrels-positive yet missed by all three flat top- 500 500 retrievers (BM25, dense, hybrid). Re:CAP's own novelty judge marks it Redundant (collapsing the paediatric lab pattern into a coarser parent topic — the sub-mechanism over-aggregation failure mode of App. [O](https://arxiv.org/html/2609.24122v1#A15)); all three blinded annotators independently rate it *new_info*. 

Figure 5: Annotation item TC-098 ( trec_covid__47__qo3p62m4) as shown to annotator A1. Top: query and D 0 D_{0} -only baseline answer. Bottom: candidate document surfaced by Re:CAP's iteration- 3 3 constraint-relaxed gap-question (text in main prose). All three annotators (blinded to retriever, judge verdict, and dataset) selected *new_info*, while the loop's own novelty judge had marked the document Redundant.

## Appendix O Failure-Mode Analysis

We classified 86 86 *loss queries* (where Re:CAP cumulative recall fell below the matched- N q N_{q} flat-retrieval floor) across four datasets and 20,146 20{,}146 missing-gold documents. Tables [23](https://arxiv.org/html/2609.24122v1#A15.T23) and [24](https://arxiv.org/html/2609.24122v1#A15.T24) report the breakdown. The aggregate 98.6 % 98.6% no-surface / 1.4 % 1.4% judge-rejected split is dominated by TREC-COVID, which contributes 20,082 20{,}082 of 20,146 20{,}146 missing-gold documents.

Two-regime interpretation.

On bounded-evidence (HotPotQA, MuSiQue, MultiHop-RAG; n loss = 43 n_{\text{loss}}=43 , 64 64 missing docs) the dominant failure modes are early convergence ( 41 / 43 41/43 ), gap-Q off-topic from bridge-entity erasure ( 19 / 43 19/43 ), and low topic yield ( 30 / 43 30/43 ) — all addressable on the generator side. On pooled-graded (TREC-COVID, n loss = 43 n_{\text{loss}}=43 , 20,082 20{,}082 missing docs) the dominant failures are judge-rejected ( 39 / 43 39/43 ) compounded by iteration cap ( 24 / 43 24/43 ); both are structural consequences of binary-novelty judging applied to pooled-graded relevance with ∼ \sim 493 493 rel docs/query at a ∼ \sim 378 378 -doc budget.

Targeted-recovery replay.

We replayed the 33 33 unique bounded-evidence loss queries under the deployed default (hybrid + five-mechanism generator). 22 / 33 22/33 ( 67 % 67% ) flipped from loss to tie or win; mean Δ \Delta recall + 0.260 +0.260 per query. Per dataset: MuSiQue-BM25 7 / 11 7/11 ( Δ = + 0.197 \Delta=+0.197 ), HotPotQA-BM25 11 / 18 11/18 ( Δ = + 0.278 \Delta=+0.278 ), MultiHop-RAG 4 / 4 4/4 ( Δ = + 0.354 \Delta=+0.354 ). The residual ∼ \sim 33 % 33% are largely cases where the entity ledger anchors on a hallucinated entity from A 0 A_{0} .

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Table 23: Missing-gold attribution per dataset. *Judge* = surfaced as candidate but judge-rejected; *No-surf.* = never reached the candidate pool. The AND-only aggregate ( 95.3 % 95.3% no-surface) is the relevant number for the primary operational regime.

|   |   |   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |

Table 24: Failure-mode tags per dataset (non-exclusive). *EConv* = early convergence; *OffT* = gap-Q off-topic; *ICap* = iteration cap hit; *Jdg* = judge-rejected gold; *LowY* = low topic yield; *WkD* = D 0 D_{0} recall = 0.

### O.1 Qualitative success examples

Three worked examples in which Re:CAP recovers gold that flat BM25 top- 500 500 never reaches. Each is a run from § [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1); gap-Qs and topic labels are verbatim from the iteration trace.

(i) Hedged-answer disambiguation (HotPotQA, hybrid).

Query. *“Kiley Dean was a back-up singer for what famous singer, who was also known as the Queen of Pop?”* Cell. hotpotqa-hybrid, D 0 D_{0} recall = 0.50 =0.50 ( *Britney Spears* returned but not the *Queen of Pop* bridge), matched- N q N_{q} flat = 0.50 =0.50 , flat- 500 500 = 0.50 =0.50 ; Re:CAP recall = 1.00 =1.00 in 1 1 iteration. A 0 A_{0} excerpt. “ *Kiley Dean sang back-up for Britney Spears and Madonna … but they do not state which of these singers was also known as the Queen of Pop.*” Unreachable gold (flat- 500 500 ). 142056 ( *Madonna* biographical article). Recovering gap-Q. *“Which singer is widely recognized as the Queen of Pop in music history?”* Topic assigned. “ *Madonna is referred to as the 'Queen of Pop'*”. Interpretation. The entity ledger pinned both candidates ( *Britney Spears*, *Madonna*) but a single concept-anchored probe on the ambiguous *Queen of Pop* role surfaces the disambiguating article that flat retrieval ranks below the top- 500 500 .

(ii) Triangulated multi-hop (MuSiQue, hybrid).

Query. *“What county is the city that shares a border with the state capital of the state where Purrysburg is located?”* Cell. musique-hybrid, D 0 D_{0} recall = 0.25 =0.25 (only *Purrysburg* retrieved), matched- N q N_{q} flat = 0.00 =0.00 , flat- 500 500 leaves 4 4 of 4 4 supporting paragraphs unreachable; Re:CAP recall = 1.00 =1.00 in 2 2 iterations. A 0 A_{0} excerpt. “ *The documents don't provide enough information to determine this. Doc 2 says Purrysburg is in South Carolina, but none of the documents state South Carolina's state capital…*” Unreachable gold. mq_charleston_south_carolina_9f68ae, mq_forest_acres_south_carolina_35cf43, mq_wwnq_9c37a4, mq_purrysburg_south_carolina_254ff0. Iter-1 gap-Qs. *Geographical location of South Carolina state capital Columbia; Which cities share borders with Columbia, South Carolina; County jurisdiction of West Columbia, South Carolina*. Topics assigned. “ *Location and county of Forest Acres, South Carolina*”; “ *Geography and location of Forest Acres, South Carolina*”. Interpretation. A canonical Re:CAP success: the loop triangulates Purrysburg → \to South Carolina → \to Columbia → \to Forest Acres in two iterations even though the initial answer admits insufficient context — the multi-hop pattern flat retrieval cannot resolve in a single pass.

(iii) Cold-start bridge entity (HotPotQA, hybrid).

Query. *“What is the nationality of the film director responsible for a 2008 American science fantasy film based on a novel by Jeanne DuPrau?”* Cell. hotpotqa-hybrid, D 0 D_{0} recall = 0.00 =0.00 (neither film nor director retrieved), matched- N q N_{q} flat = 0.50 =0.50 , flat- 500 500 misses the gold biography; Re:CAP recall = 1.00 =1.00 in 1 1 iteration. A 0 A_{0} excerpt. “ *The documents provided do not identify the specific 2008 American science fantasy film based on a novel by Jeanne DuPrau, nor do they give the director's nationality …*” Unreachable gold. 6167253 ( *Gil Kenan* biography). Recovering gap-Qs. *Director of City of Ember 2008 science fantasy film; Citizenship of Gil Kenan filmmaker*. Topic assigned. “ *Nationality and biography of Gil Kenan, director of City of Ember*”. Interpretation. The reader's “insufficient context” answer is recovered into the topic registry; the gap-Q generator extracts the DuPrau anchor, names the film ( *City of Ember*), pivots to the director, and the judge promotes the biography to a new topic — the path flat retrieval cannot construct.

### O.2 Qualitative failure examples

Three worked examples illustrating the three dominant bounded vs pooled-graded failure modes.

(i) Bridge-entity erasure (MuSiQue, hybrid).

Query. *“A line with Williamsburg, Main Street and another station are in a state that's next to an ocean. When did that ocean start to open up?”* Cell. musique-hybrid, recall = 0.50 =0.50 (matched- N q N_{q} flat = 0.75 =0.75 , flat-500 = 0.75 =0.75 ), D 0 D_{0} recall = 0 =0 , 2 2 iterations, 7 7 topics, 361 361 candidates judged. Gold never surfaced. Newport News, Virginia; Virginia (the bridge state). Sample gap-Qs. *Geological history of Atlantic seafloor formation near New York*; *Earliest rifting events of Pangaea affecting eastern North America*; *Age of Atlantic Ocean crust adjacent to Brooklyn shoreline*. Diagnosis. The bridge entity *Virginia* is required to link *Williamsburg* to *Atlantic Ocean*, but neither D 0 D_{0} nor A 0 A_{0} surface it (the loop guesses *New York*/ *Brooklyn* instead), so the entity ledger never anchors a gap-Q on *Virginia*. Dominant *OffT* + + *WkD* pattern on the BM25 cells of MuSiQue.

(ii) Hallucinated anchor (HotPotQA, BM25).

Query. *“What is the nationality of the star of The Monster who was also in Swordswallers and Thin Men and The Savages?”* Cell. hotpotqa-bm25, recall = 0.00 =0.00 (matched- N q N_{q} flat = 0.50 =0.50 , flat-500 = 0.50 =0.50 ), D 0 D_{0} recall = 0 =0 , 1 1 iteration, 1 1 topic, 0 0 NewTopic verdicts, 137 137 candidates judged. Gold never surfaced. Zoe Kazan; The Monster (2016 film) (the correct bridge). Sample gap-Qs. *Which country is Toma Caragiu from, the actor in The Monster, Swordswallers and Thin Men, and The Savages?*; *What is the citizenship of Toma Caragiu …*; *Where was Toma Caragiu …born?* Diagnosis. The reader hallucinated *“Toma Caragiu”* as the star in A 0 A_{0} (Caragiu is a real Romanian actor but was not in any of the listed films); the entity ledger pinned on this fabricated name and every gap-Q probed around the wrong person. The judge had no opportunity to recover *Zoe Kazan* because she was never returned as a candidate.

(iii) Pooled-graded saturation (TREC-COVID, BM25 + ( Q + T ) (Q{+}T) -only).

Query. *“What is the mechanism of inflammatory response and pathogenesis of COVID-19 cases?”* Cell. trec-covid topic 38, recall = 0.02 =0.02 (matched- N q N_{q} flat = 0.12 =0.12 , flat-500 = 0.19 =0.19 ), D 0 D_{0} recall = 0.01 =0.01 , 1 1 iteration (non-converged), 50 50 topics (cap), 125 125 NewTopic verdicts, 249 249 candidates judged. Gold pool size: ∼ \sim 1,000 + 1{,}000+ partially-relevant documents. Gold judged-but-rejected ( SubTopic). 17 β \beta -Estradiol… folded under “Estradiol and sex hormone modulation of COVID-19 inflammation”; Why is SARS-CoV-2 infection more severe in obese men?… folded under “Gut-lung axis…”. Sample gap-Qs. *Role of viral spike protein in triggering lung epithelial cell injury*; *Interaction between SARS-CoV-2 and ACE2 receptor leading to tissue damage*; *Contribution of neutrophil extracellular traps to COVID-19 lung pathology*. Diagnosis. The gap-Qs are genuinely on-topic and the loop produces > 100 >100 NewTopic verdicts within the topic cap, but the corpus has thousands of partially relevant documents and most gold is never surfaced. The judge over-aggregates novel sub-mechanisms into existing topics — a structural mismatch between binary-novelty judging and pooled-graded relevance.

## Appendix P Future Work

• *Robust entity grounding* — cross-check ledger entities against D 0 D_{0} before anchoring; downgrade anchors to soft preferences when D 0 D_{0} confidence is low. Targets the residual ∼ \sim 33 % 33% of unrecovered bounded-evidence loss queries.

• *Judge-cost reduction* (highest engineering leverage per § [4.5](https://arxiv.org/html/2609.24122v1#S4.SS5.SSS0.Px1)): batch judging across multiple candidates per LLM call; a lightweight cross-encoder pre-filter dropping 70 70 – 80 % 80% of candidates; topic-aware short-circuit when the matched topic is already saturated.

• *Multi-paraphrase gap-Qs per topic*: a queued lever for the remaining *OffT* failures the entity ledger does not catch.

• *Online gap discovery* as a production monitoring tool, and the per-query gap-topic list as a human-readable audit artifact that names the retriever's blind spots.

• *Multilingual extension* and *graph-structured topic registry* (replacing the flat list with a depth-3 rooted DAG, enabling multi-resolution metrics and graph-merge deduplication).

• *Gaps as training signal*: discovered gaps as hard negatives for retriever fine-tuning — closing the loop from evaluation back to improvement.

• *Gap inventory as synthetic qrels for retriever benchmarking*: each ( Q , gap-Q , judged-novel doc ) (Q,\text{gap-Q},\text{judged-novel doc}) triple is a relevance label produced without human annotation. The unreachable-gold result (§ [4.1](https://arxiv.org/html/2609.24122v1#S4.SS1), Table [2](https://arxiv.org/html/2609.24122v1#S4.T2): 9 9 – 29 % 29% of recovered gold is absent from flat BM25 top- 500 500 on the bounded-evidence primaries, rising to 48 % 48% on TREC-COVID) shows these labels contain documents that strong flat baselines cannot surface, suggesting the inventory can serve as a low-cost evaluation set for comparing alternative — including inference-optimised — retrievers without re-running the full audit.

## Appendix Q Prompt Templates

Every prompt used by the Re:CAP loop is reproduced below with the structured-output schema it is sent with, generated directly from the pipeline's definitions so that the listings cannot diverge from the code that runs. The schemas constrain the label set the model may return and are therefore part of the specification: a template alone does not determine the reported behaviour. The information-equivalence judge of § [L](https://arxiv.org/html/2609.24122v1#A12) is included for completeness; it belongs to that controlled experiment rather than the loop. Two presentation-only changes were applied: long lines are hard-wrapped, and non-ASCII glyphs are transliterated ([+] for a check mark, [-] for a ballot X, -> for a right arrow, -- for an em dash). Prompt wording is otherwise unmodified. Prompts use {placeholder} substitution; temperature and model settings are in Table [9](https://arxiv.org/html/2609.24122v1#A3.T9).

Topic extraction (Step 1) (1 of 2)

Topic extraction (Step 1) (2 of 2)

Topic extraction (Step 1) — response schema Enforced response schema — the model is constrained to return exactly these fields:

Entity-ledger initialisation (Step 1b)

Entity-ledger initialisation (Step 1b) — response schema Enforced response schema — the model is constrained to return exactly these fields:

Doc–topic reconciliation (Step 2) (1 of 2)

Doc–topic reconciliation (Step 2) (2 of 2)

Doc–topic reconciliation (Step 2) — response schema Enforced response schema — the model is constrained to return exactly these fields:

off_topic here is the reconciler's name for the outcome the novelty judge calls irrelevant; the two steps use different labels for the same decision and both count as non-novel.

The five probe roles tagged by the gap-question generator are:

• *entity-anchored* — probe centred on a named entity from L L ;

• *concept-anchored* — probe centred on an abstract noun phrase rather than a specific entity;

• *constraint-relaxed* — drops a constraint of Q Q to broaden retrieval;

• *constraint-tightened* — adds a constraint to narrow it;

• *inverse-negation* — probes for contradictory or counterexample evidence.

Gap-probing question generation (Step 3) (1 of 2)

Gap-probing question generation (Step 3) (2 of 2)

Gap-probing question generation (Step 3) — response schema Enforced response schema — the model is constrained to return exactly these fields:

Query reformulation (Step 4) Generate alternative phrasings of a gap question to improve retrieval coverage. Invocations per query: 1_per_gap_question.

Enforced response schema — the model is constrained to return exactly these fields:

Novelty judge (Step 5) (1 of 2)

Novelty judge (Step 5) (2 of 2)

Novelty judge (Step 5) — response schema Enforced response schema — the model is constrained to return exactly these fields:

The enum admits a fifth label, CONTRADICTORY, outside the four-way taxonomy used throughout: it fired once in 149,063 149{,}063 production verdicts and counts as non-novel wherever verdicts are collapsed. Topic deduplication (Step 5b)

Topic deduplication (Step 5b) — response schema Enforced response schema — the model is constrained to return exactly these fields:

Reader (answer generation) Generate an answer from retrieved documents. Invocations per query: 1.

Information-equivalence judge (E2.2 only) Used only for the controlled gold-deletion experiment (Appendix [L](https://arxiv.org/html/2609.24122v1#A12)); not part of the deployed Re:CAP loop.

Experimental support, please [view the build logs](https://arxiv.org/html/2609.24122v1/__stdout.txt) for errors. Generated by [L A T E xml[LOGO]](https://math.nist.gov/~BMiller/LaTeXML/)

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