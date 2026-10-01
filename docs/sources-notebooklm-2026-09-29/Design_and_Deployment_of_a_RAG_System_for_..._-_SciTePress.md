# Design and Deployment of a RAG System for ... - SciTePress

Design and Deployment of a RAG System for Navigating Heterogeneous Legal and Technical Documents 

Marco Claps2,3 a, Giovanni Simonini1 b and Giorgio Zucchi3 c 

1DIEF, University of Modena and Reggio Emilia, Reggio Emilia, Italy 2DISMI, University of Modena and Reggio Emilia, Reggio Emilia, Italy 

3CoopService S.Coop.p.A., Reggio Emilia, Italy 

Keywords: Decision Support Systems (DSS), Retrieval-Augmented Generation (RAG), Knowledge-Based Systems, Energy and Technical Services, Regulatory Compliance. 

Abstract: This work presents a Retrieval-Augmented Generation (RAG) system deployed in an industrial environment to support navigation of heterogeneous legal and technical documents in the energy and technical services (ETS) domain. Modern regulatory frameworks in ETS are becoming increasingly complex due to rapidly evolving norms at regional, national, and European levels. This complexity, combined with the diversity of technical and legal documentation, creates bottlenecks in operational decision-making and compliance verification. Researching information is a very important but also very time-consuming task. RAG systems mitigate these challenges by pairing large language models (LLMs) with retrieval mechanisms that ground generated answers in authoritative and legal documents. In our system, documents are continuously ingested, cleaned, embedded, and indexed; during query time, relevant portions of text are retrieved and used to produce accurate, context-aware, and auditable responses. We evaluated the system on a corpus of more than 70 real ETS documents written in Italian. Compared to keyword-based baselines, our approach improved Recall@k and reduced query resolution time. The user study involved 25 industry professionals, who evaluated the proposed system and workflow. Participants reported high perceived usefulness, correctness, and usability.. We also report methodological insights—including query augmentation and cross-encoder re-ranking—that generalize across regulated domains. 

1 INTRODUCTION 

Recent advances in artificial intelligence (AI), particularly in large language models (LLMs), have transformed the way organizations extract knowledge from documents, reports, and operational records. LLMs offer strong capabilities in natural language understanding, summarization, and reasoning, encouraging their rapid adoption across industrial workflows. However, their apparent ease of use can obscure critical limitations: LLM outputs are non-deterministic, often unverifiable, and can be difficult to audit in safety- or regulation-sensitive contexts. Industrial environments—especially those involving public tenders, technical standards, and regulatory compliance—require systems that provide traceable, source-

a https://orcid.org/0009-0004-7217-8606 b https://orcid.org/0000-0002-3466-509X c https://orcid.org/0000-0002-5459-7290 

grounded responses. Using LLMs as opaque oracles introduces substantial risks, since incorrect or hallucinated answers can have legal, financial, or safety consequences. This has motivated growing interest in Retrieval-Augmented Generation (RAG), a paradigm that enhances LLMs by conditioning their outputs on retrieved passages from curated document collections. RAG systems have shown promise in extending the effective context window of LLMs, improving factual grounding, and reducing hallucinations. By retrieving authoritative content on demand, RAG enables transparent and verifiable reasoning, which is crucial in highly regulated domains such as energy services, logistics, and public administration. Several studies illustrate this trend. Here-dia Álvaro and González Barreda (2025) demonstrate improvements in manufacturing quality inspection through RAG-assisted anomaly interpretation. Wan (2024) show gains in domain-specific search when integrating knowledge graphs with dense retrieval. 

Claps, M., Simonini, G. and Zucchi, G. Design and Deployment of a RAG System for Navigating Heterogeneous Legal and Technical Documents. DOI: 10.5220/0014715500004015 Paper published under CC license (CC BY-NC-ND 4.0) In Proceedings of the 21st International Conference on Evaluation of Novel Approaches to Software Engineering (ENASE 2026) - Volume 2, pages 1125-1132 

1125

Radeva et al. (2024) apply RAG to smart agriculture using open-source LLMs. These works confirm the viability of RAG for practical deployments but often focus on homogeneous or well-structured datasets. In contrast, the Energy and Technical Ser-vices (ETS) domain involves highly heterogeneous documents: legal decrees, technical reports, building specifications, annexes, and scanned tender documents (typical formats of small local administrations). This diversity, along with constantly evolving regulations, makes it difficult for technical staff to efficiently locate and interpret relevant and up-to-date information. In addition, errors have concrete consequences: (i) misinterpreting contractual Service Level Agreements (SLAs) produces financial penalties; (ii) overlooking region-specific efficiency obligations invalidates bids; (iii) and missing safety norms affects compliance. These scenarios require traceable citations rather than opaque model judgments. Our work addresses this challenge through a RAG-based Decision Support System (DSS) developed for a major Italian provider of energy and technical services. The system assists personnel in navigating complex regulatory content during tender preparation and operational planning. Our contributions include a scalable ingestion pipeline, hybrid retrieval with domain-specific query augmentation, and a realworld user study that evaluates system effectiveness across multiple professional roles. To the best of our knowledge, this is among the first deployed RAG-based Decision Support Systems tailored to coupled legal–technical document ecosystems in the Energy and Technical Services (ETS) domain. While previous industrial RAG systems demonstrate feasibility in relatively homogeneous enterprise repositories or narrow vertical tasks, our setting combines (i) high document heterogeneity (decrees, tenders, annexes, technical manuals, scanned PDFs, tables), (ii) legal–technical coupling where clause-level correctness and traceable evidence are operational requirements, and (iii) deployment depth inside an existing Decision Support System (SSO access, concurrent request handling, source-linked PDF inspection, monitoring, and feedback-driven iteration). Beyond describing a deployment, we provide actionable design choices validated in production—selective query augmentation, cross-encoder re-ranking with compression, and retrieval-aware caching—together with a multi-role user study that reflects real ETS workflows. 

The remainder of the paper is organized as follows: Section 2 reviews related work; Section 3 details the system architecture; Section 4 presents the evaluation; ; Section 5 concludes with future research directions. 

2 LITERATURE REVIEW 

State-of-the-Art RAG. Retrieval-Augmented Gen-eration (RAG) is a central paradigm for improving factual grounding and transparency in language model outputs. Recent work emphasizes hybrid retrieval pipelines combining dense retrieval Lee et al. (2019) with sparse representations such as SPLADE Formal et al. (2021), as well as re-ranking with cross-encoders Nogueira and Cho (2019). Faith-fulness remains a key concern, motivating monitoring techniques (e.g., SynCheck (Wu et al., 2024)), hallucination-focused datasets (e.g., RAGTruth (Niu et al., 2024)), and evaluation frameworks such as RA-GAs (Es et al., 2024). Overall, these studies show that retrieval alone does not eliminate unsupported reasoning, and that RAG should be evaluated at multiple levels (retrieval, grounding, generation) Gao et al. (2023); Es et al. (2024). However, many advances rely on clean English benchmarks (e.g., Natural Ques-tions Kwiatkowski et al. (2019), TriviaQA Joshi et al. (2017)), which differ from the noisy, scanned, multilingual, and legally sensitive documents encountered in industrial contexts. 

Enterprise RAG Architectures. Several studies explore RAG for enterprise knowledge management. Packowski et al. (2024) show that content design impacts retrieval effectiveness, while Sahin et al. (2024) propose QA frameworks for organizational repositories but largely exclude highly technical or legally binding documents with heterogeneous layouts. Work on PDF parsing (Adhikari and Agar-wal, 2024) and document benchmarks (e.g., Om-niDocBench (Ouyang et al., 2024)) highlights that extraction errors can significantly degrade retrieval quality, motivating robust ingestion workflows (OCR, table extraction, and structure-aware segmentation). Although these works demonstrate RAG’s promise in enterprise settings, they do not fully address the complexity of regulatory ecosystems and coupled legal– technical corpora. 

Evaluation beyond Automatic Metrics. Recent literature critiques relying solely on traditional textgeneration metrics (e.g., BLEU/ROUGE) for RAG. Sahin et al. (2024) report weak correlation with human judgments of utility in specialized domains, while Salemi and Zamani (2024) advocate retrievalaware, user-centered assessments. LegalBench-RAG (Pipitone and Houir Alami, 2024) further emphasizes snippet-level precision and authority-sensitive retrieval, aligning with ETS settings where clauselevel correctness matters. 

ENASE 2026 - 21st International Conference on Evaluation of Novel Approaches to Software Engineering 

1126

Industrial Deployments and Regulated Domains. Early deployments demonstrate RAG viability but often assume relatively uniform document ecosystems Heredia Álvaro and González Barreda (2025); Radeva et al. (2024), unlike ETS workflows spanning legislation, tenders, engineering documents, and operational procedures. Query-routing techniques (Oriol, 2024; Zhang et al., 2025) are increasingly used to adapt strategies to query type and complexity. In legal and regulatory contexts, structured preprocessing and segmentation are critical Lee and Lee (2025), and combining RAG with domain adaptation (e.g., fine-tuning) can improve accuracy on normative texts Garcı́a-Montero et al. (2025). Regulatory compliance assistants also highlight the need for traceability and auditability Kibirige and Wandabwa (2025), consistent with our focus on evidence-grounded responses and terminology mapping. 

To make the novelty explicit, we separate the contributions into engineering and research contributions. 

Engineering Contributions. 

 An industry-grade RAG-enabled Decision Sup-

port System integrated into an enterprise workflow (SSO access, concurrent request management, source-linked PDF inspection, monitoring, and user feedback collection). 

 A robust ingestion and preprocessing pipeline for heterogeneous ETS documents (scanned PDFs, tables, annexes, and inconsistent layouts), producing traceable chunk-level metadata (document, page, offsets). 

Research Contributions. 

 A retrieval strategy for coupled legal–technical 

corpora combining selective query augmentation, dense retrieval with MMR diversification, and cross-encoder re-ranking with context compression. 

 An empirical evaluation linking retrieval effectiveness (Recall@k) and operational constraints (latency), plus a multi-role user study with ETS professionals assessing perceived correctness, usefulness, and usability. 

 Practical design insights on when to activate augmentation and re-ranking, and how to trade off accuracy vs. responsiveness in traceability-centric settings. 

3 SYSTEM ARCHITECTURE 

The system is a modular Retrieval-Augmented Gener-ation (RAG) architecture integrated into an enterprise Decision Support System (DSS) to enable efficient, traceable navigation of heterogeneous legal and technical documents. The design emphasizes robustness to noisy sources, evidence traceability, and responsiveness under real workloads. 

The architecture comprises four components: (1) ingestion and preprocessing, (2) retrieval and generation, (3) workflow and user interface, and (4) deployment and performance management. 

3.1 Knowledge Base Ingestion and Preprocessing 

The knowledge base was curated by ETS domain experts and includes ∼70 documents (2020–2025), spanning regulations and decrees, technical reports, operational manuals, tender documents, annexes, tables, and scanned PDFs. Heterogeneous layouts and OCR noise make ingestion a primary challenge. We apply layout-aware preprocessing (denoising, thresholding, header/footer removal) and robust table extraction using multi-strategy fallbacks (Adhikari and Agarwal, 2024). Figure 1 illustrates the ingestion pipeline: 

Raw Labelled Documents 

OCR Reading 

Text Cleaning 

Tokenization 

Embedding & Indexing 

Vector Storage 

Figure 1: Preprocessing the knowledge-base. 

1) OCR Reading. Most documents are scanned PDFs. Text extraction uses OCR methods benchmarked in (Hadi et al., 2024), achieving ∼95% character-level accuracy; OCR is also required when digitally born PDFs prevent direct extraction. 

2) Text Cleaning. OCR output is normalized with regular-expression post-processing to remove artifacts (line breaks, hyphenation, headers, page numbers) while preserving structure. 

Design and Deployment of a RAG System for Navigating Heterogeneous Legal and Technical Documents 

1127

3) Segmentation. Cleaned text is chunked into overlapping segments of ∼6000 tokens with 1000-token overlap to retain regulatory context. An ablation study (Table 1) indicates that larger chunks improve semantic coherence for long-form queries, while smaller chunks favor short-answer precision; we choose 6000 tokens to balance recall and latency. 

4) Embedding and Indexing. Chunks are embedded with the multilingual mbxai-embed-large model (Lee et al., 2024) and indexed in FAISS (Douze et al., 2024) with traceability metadata (document, page, offsets). 

Table 1: Chunk-length ablation with 1000-token overlap on the expert-curated query set. 

Chunk Size Recall@10 BERT F1 Time (s) 1024 tokens 0.927 0.662 41 2048 tokens 0.938 0.675 45 6000 tokens 0.953 0.693 48 

3.2 Retrieval and Generation Pipeline 

The pipeline (Figure 2) routes queries and orchestrates retrieval, re-ranking, and grounded generation: 

User Query 

1) Routing & Augmentation 

2) Retrieval Module 

2a) Vector Database (FAISS) 

2b) Re-ranking & Compression 

3) LLM 

Response 

Figure 2: Question-answering schema. 

1) Routing and Augmentation. A lightweight rule-based router selects among three modes: Basic (dense retrieval and concise answer), Document (document-scoped retrieval with hierarchical summarization), and Multi (augmentation, re-ranking, and expanded retrieval). Selective augmentation uses a legal/technical glossary plus LLM-assisted rewriting to reduce vocabulary mismatch; Appendix 5 shows an example. In an ablation on our query set, selective augmentation yields +2–4% Recall@10 at the retrieval stage (top-10 contains at least one ground-truth source) with a small latency overhead due to rout-ing/rewriting. 

2) Retrieval and Re-Ranking. We perform dense retrieval over FAISS candidates, then apply a two-

step refinement: (i) MMR diversification to balance relevance and coverage; (ii) cross-encoder re-ranking with the BGE reranker (Xiao et al., 2024) on a limited top-k pool. The cross-encoder scores each query– chunk pair jointly (more accurate than bi-encoder similarity) and is therefore applied selectively to control latency; context compression removes redundancy before passing evidence to the LLM. 

3) Generative Layer. Answers are generated with GPT-o4-mini using an evidence-grounded prompt that requires citations and abstention when support is insufficient; we set temperature = 0 to maximize determinism. 

3.3 Workflow and User Interface 

The system is embedded in the company DSS (Fig-ure 3): users authenticate via SSO (step 1) and a session loads the retrieval configuration (step 2). A queuing and rate-limiting layer (step 3) enforces deployment policies (service quotas and organizational constraints) to keep latency stable under concurrent usage. The UI returns the answer with source-linked excerpts (step 4) and an embedded PDF viewer with highlighted passages for rapid verification. Users can flag per-source relevance (step 5); feedback is stored with query and source metadata and used offline to refine ingestion/normalization rules, glossary terms, and metadata cleanup. 

Figure 3: RAG Chatbot Workflow. 

3.4 Deployment 

The system runs on a dedicated virtual machine connected to Azure AI services and configured via stress testing. To reduce repeated work, we cache frequent retrieval outputs, which lowers duplicated computations during routine usage. Monitoring collects latency, retrieval traces, and error logs to detect noisy documents and guide iterative improvements. 

ENASE 2026 - 21st International Conference on Evaluation of Novel Approaches to Software Engineering 

1128

3.5 Operational Trade-Offs 

Deployment required balancing accuracy, traceability, and responsiveness. Larger chunks improve long-context coherence but increase redundancy; reranking improves evidence quality but adds latency, so it is activated selectively. Augmentation reduces terminology mismatch but can broaden retrieval if over-applied, motivating rule-triggered activation. Fi-nally, deterministic generation and abstention improve auditability but increase reliance on retrieval quality, reinforcing the importance of ingestion and feedback-driven refinement. 

4 EXPERIMENTAL EVALUATION 

We evaluate the system along two axes: (i) retrieval effectiveness and latency under realistic workloads, and (ii) user-perceived quality via a structured user study. Ground truth was provided by the company’s Technical Office, which defined representative queries and their authoritative supporting documents. We report automatic metrics (Recall@k, BERTScore) together with usability-oriented Likert-scale measures. 

Experiments were run on a virtual machine integrated with the company’s Azure infrastructure (Red Hat Enterprise Linux 9.5; Intel(R) Xeon(R) Platinum 8370C @ 2.80GHz; 8 cores; 16 GB RAM). 

4.1 Evaluation Setup 

We built a dataset of 100 queries reflecting real user intents, grouped into: procedural (workflows), factual (specific requests), and referential (explicit citations of regulations/clauses/sections). Each query is associated with one or more ground-truth documents. We use Recall@k as the primary retrieval metric following recent recommendations Finardi et al. (2024); Roychowdhury et al. (2024); Jin et al. (2024) and prior RAG work Gao et al. (2023), since retrieval failure typically implies an incomplete or unsupported answer. 

We compare two configurations: 

1. Dense retrieval (baseline): FAISS nearestneighbor search over multilingual embeddings. 

2. Dense + re-ranking + compression: baseline plus BGE cross-encoder re-ranking to refine candidate ordering and a compressor to remove redundancy before generation. 

Latency is reported as time-to-first-token (retrieval + optional re-ranking). 

4.2 Retrieval Performance 

## 0

## 0.2

## 0.4

## 0.6

## 0.8

## 1

## 1.2

## 1 3 5 10

## Compressor = 0 Compressor = 1

## R e

## c a

## ll a

## t K

## K

Figure 4: Recall@k for dense retrieval vs. dense + reranking. 

### 0

### 10

### 20

### 30

### 40

### 50

### 60

### 70

### 0  1  2  3  4  5  6  7  8  9  1 0

### 1 1

### 1 2

### Retrieval Reranking

### F re

### q u e n c y

### time [s]

### Retrieval and Reranking Time Distribution

Figure 5: Answer-time distributions (with/without reranking). 

Figure 4 shows that re-ranking + compression improves Recall@k across k, with the largest gains for referential/procedural queries where long, heterogeneous documents increase ambiguity. Figure 5 shows the expected latency increase due to re-ranking; in our deployment this cost is mitigated by selective activation for complex or multi-document queries. 

4.3 Generative Quality 

We compute BERTScore on a curated subset of 25 queries spanning the three categories. The system achieves an F1 of 75%± 5%, consistent with the retrieval results: better evidence selection tends to improve semantic agreement with gold answers. 

4.4 User Study Design 

We conducted a user study with N = 25 participants across five roles: contract leaders (CL), field operators (FO), design engineers (DE), project technicians (PT), and technical coordinators (TC). Participants used the web interface remotely and answered 15 queries (balanced across categories) after a short tutorial, without live assistance. 

Design and Deployment of a RAG System for Navigating Heterogeneous Legal and Technical Documents 

1129

Users rated (i) answer quality on six metrics (coherence, relevance, clarity, optimality, correctness, conciseness) and (ii) user experience on six dimensions (accessibility, aesthetics, learnability, responsiveness, usability, utility), all on 1–5 Likert scales. After each query, users could flag retrieved sources as useful/non-useful. 

4.5 User Study Results 

Table 2: Answer-quality scores across roles (CL=Contract Leader, DE=Design Engineer, FO=Field Operator, PT=Project Technician, TC=Technical Coordinator). 

Metric CL DE FO PT TC 

Coherence 4.59 4.10 3.64 4.56 4.08 

Relevance 4.14 4.14 3.62 4.58 4.08 

Clarity 3.78 4.26 4.25 3.77 3.70 

Optimality 4.09 4.14 3.66 4.11 4.53 

Correctness 4.58 4.56 4.11 4.10 4.15 

Conciseness 4.42 3.92 4.35 3.48 3.95 

Table 3: Interface evaluation across roles. 

Metric CL DE FO PT TC 

Accessibility 4.00 4.06 4.38 4.67 3.87 

Aesthetics 2.00 2.00 1.67 2.12 1.50 

Learnability 3.91 4.22 4.40 3.84 3.77 

Responsiveness 3.22 4.29 4.12 4.20 4.16 

Usability 3.50 4.45 4.43 3.93 3.77 

Utility 4.10 3.68 3.81 4.82 3.86 

Tables 2 and 3 show high perceived correct-ness/relevance and positive usability/utility, while aesthetics scores are lower, reflecting a deliberate focus on auditability and stability. User feedback flags also revealed recurring overlaps among heterogeneous sources (e.g., annexes vs. decree summaries), suggesting opportunities for improved clustering and metadata normalization. 

4.6 Reproducibility & System Configuration 

Table 4 summarizes the main configuration parameters of ingestion, retrieval, re-ranking, and generation. 

Unless otherwise stated, the environment consisted of Red Hat Enterprise Linux 9.5, FAISS Douze et al. (2024), PyMuPDF/pdfplumber for parsing, and Azure-hosted inference. We encourage practitioners and system builders to adapt chunking and re-ranking budgets to their SLA constraints and corpus characteristics. 

Table 4: Key configuration parameters for the RAG pipeline. 

Component Setting / Value OCR Character-level accuracy ≈ 95% (scanned PDFs) Text cleaning Regex-based normalization (headers/footers, hyphenation) Chunking 6000 tokens per chunk; 1000-token overlap Embeddings mbxai-embed-large; multilingual (Italian-focused) Embedding dim. 1024 (model default) Index FAISS IVF Flat with cosine similarity Retrieval top-k k = 50 (candidate pool) MMR λ = 0.5 (balance relevance/diversity), k = 20 retained Cross-encoder bge-reranker (Xiao et al., 2024); re-rank top 50 → top 10 Compressor Remove duplicates; keep max coverage within 16–32K context LLM gpt-o4-mini; temperature = 0; max output tokens = 1024 Prompting Evidence-grounded; abstain if no sufficient support Augmentation Glossary expansion: selective (domain terms, synonyms) Caching Query/result-level cache; 40% reuse in routine workloads Monitoring Latency, retrieval traces, error logs, user feedback flags Hardware 8 vCPU, 16GB RAM (VM); Azure AI endpoint for generation 

4.7 Interface Snapshot 

Figure 6: Chat interface (Italian version). 

Figure 7: Embedded PDF viewer for source inspection (Ital-ian version). 

The interface provides an integrated workspace where users ask questions and receive responses grounded in retrieved evidence. A dedicated panel lists top re-

ENASE 2026 - 21st International Conference on Evaluation of Novel Approaches to Software Engineering 

1130

trieved chunks; selecting an item opens the source PDF at the corresponding page with highlighted passages for verification. The screenshots are presented in Figure 6 and 7. 

5 CONCLUSION AND FUTURE WORK 

This paper presented the deployment of a Retrieval-Augmented Generation (RAG) system within a real industrial setting in the Energy and Technical Ser-vices (ETS) domain. The system addresses the challenges posed by heterogeneous technical and legal documents, frequent regulatory updates, and the need for transparent decision-support tools. Through a modular architecture encompassing ingestion, retrieval, re-ranking, and grounded generation, the proposed solution demonstrates that domain-adapted RAG pipelines can effectively support regulatory navigation and operational reasoning in complex industrial environments. The system was validated through a structured user study involving 25 professionals across five operational roles, confirming both the perceived usefulness and the practical applicability of the approach 

Beyond quantitative and qualitative results, our evaluation also revealed several important sources of error and limitations that shape the current performance of the system and guide future improvements. Ambiguous queries that mix informal language with legal terminology sometimes lead the system to match with non-authoritative summaries rather than primary sources. In addition, while glossary-based augmentation helps reduce these cases, it also increases latency and, therefore, requires more selective application. Very long documents, especially multi-annex tenders, occasionally dilute retrieval relevance; although cross-encoder re-ranking could mitigate this effect, further improvements in segmentation around structural boundaries and richer metadata are expected to strengthen Recall@k in these settings. The user study, while covering five representative ETS roles, may not generalize fully across all departments. A broader sampling or task-specific protocols (e.g., tender analysis vs. maintenance planning) would improve external validity. Additionally, the evaluation currently focuses on Italian-language sources; although embeddings and generation models are multilingual, cross-lingual robustness has not yet been assessed, and extending the pipeline to mixedlanguage repositories or domain-adapted multilingual encoders would further enhance applicability. To-gether, these observations underline both the practi-

cal viability of the system and the importance of continued refinement in retrieval precision, augmentation selectivity, and document normalization. Our evaluation as a whole showed that robust retrieval remains a critical component for ensuring factual consistency in RAG systems. The introduction of query augmentation and cross-encoder re-ranking significantly improved Recall@k, while the user study confirmed that professionals across diverse operational roles found the system useful, accurate, and accessible. These findings provide concrete empirical support for the adoption of grounded AI systems in industries where traceability and verifiability are required. These directions aim to enhance both the scalability and the robustness of RAG systems deployed in real-world, high-stakes industrial contexts. 

While our evaluation is based on a corpus of 70 documents and 25 users, the system architecture is designed to scale to larger and more diverse document collections. Future work will focus on extending the pipeline to larger datasets and additional languages, assessing cross-lingual robustness and operational scalability. 

REFERENCES 

Adhikari, N. S. and Agarwal, S. (2024). A comparative study of pdf parsing tools across diverse document categories. arXiv preprint arXiv:2410.09871. 

Douze, M., Guzhva, A., Deng, C., Johnson, J., Szilvasy, G., Mazare, P.-E., Lomeli, M., Hosseini, L., and Je-gou, H. (2024). The faiss library. arXiv preprint arXiv:2401.08281. 

Es, S., James, J., Espinosa-Anke, L., and Schockaert, S. (2024). Ragas: Automated evaluation of retrievalaugmented generation. In Proceedings of the 18th Con-ference of the European Chapter of the Association for Computational Linguistics: System Demonstrations, pages 150–158. 

Finardi, P., Avila, L., Castaldoni, R., Gengo, P., Larcher, C., Piau, M., Costa, P., and Caridá, V. (2024). The chronicles of rag: The retriever, the chunk and the generator. arXiv preprint arXiv:2401.07883. 

Formal, T., Piwowarski, B., and Clinchant, S. (2021). Splade: Sparse lexical and expansion model for first stage ranking. In Proceedings of the 44th International ACM SIGIR Conference on Research and Development in Information Retrieval, pages 2288–2292. 

Gao, Y., Xiong, Y., Gao, X., Jia, K., Pan, J., Bi, Y., Dai, Y., Sun, J., and Wang, H. (2023). Retrieval-augmented generation for large language models: A survey. arXiv preprint arXiv:2312.10997. 

Garcı́a-Montero, P. S., Reyes-Chacón, I. G., Vizcaı́no, P., and Morocho-Cayamcela, M. E. (2025). Legal ai for all: Reducing perplexity and boosting accuracy in normative texts with fine-tuned llms and rag. IEEE Access. 

Design and Deployment of a RAG System for Navigating Heterogeneous Legal and Technical Documents 

1131

Hadi, M. A. N., Gul, M., Khan, M., Alwakid, G. N., and Jhanjhi, N. Z. (2024). Benchmarking performance analysis of optical character recognition techniques. In 26th International Multi-Topic Conference (INMIC), pages 1– 6. 

Heredia Álvaro, J. A. and González Barreda, J. (2025). An advanced retrieval-augmented generation system for manufacturing quality control. Advanced Engineering Informatics, 64:103007. 

Jin, B., Yoon, J., Han, J., and Arik, S. O. (2024). Long-context llms meet rag: Overcoming challenges for long inputs in rag. arXiv preprint arXiv:2410.05983. 

Joshi, M., Choi, E., Weld, D., and Zettlemoyer, L. (2017). Triviaqa: A large scale distantly supervised challenge dataset for reading comprehension. In Proceedings of the 55th Annual Meeting of the Association for Compu-tational Linguistics, pages 1601–1611. 

Kibirige, K. S. and Wandabwa, J. (2025). Enhancing access to service delivery through information transparency: A rag-based ai chatbot for regulatory compliance. Interna-tional Journal of Science and Engineering Applications, 14(9):59–75. 

Kwiatkowski, T., Palomaki, J., Redfield, O., et al. (2019). Natural questions: A benchmark for question answering research. Transactions of the Association for Computa-tional Linguistics, 7:453–466. 

Lee, J. and Lee, G. (2025). Long context window-based zero-shot legal interpretation of building codes and regulations. Automation in Construction, 179:106450. 

Lee, K., Chang, M.-W., and Toutanova, K. (2019). Latent retrieval for weakly supervised open domain question answering. arXiv preprint arXiv:1906.00300. 

Lee, S., Shakir, A., Koenig, D., and Lipp, J. (2024). Open source strikes bread: New fluffy embeddings model. 

Niu, C., Wu, Y., Zhu, J., et al. (2024). Ragtruth: A hallucination corpus for developing trustworthy retrieval-augmented language models. arXiv preprint arXiv:2401.00396. 

Nogueira, R. and Cho, K. (2019). Passage re-ranking with bert. arXiv preprint arXiv:1901.04085. 

Oriol, R. (2024). Build an advanced rag app: Query routing. DEV Community. Accessed: 2026-03-05. 

Ouyang, L. et al. (2024). Omnidocbench: Benchmarking diverse pdf document parsing with comprehensive annotations. arXiv preprint arXiv:2412.07626. 

Packowski, S., Halilovic, I., Schlotfeldt, J., and Smith, T. (2024). Optimizing and evaluating enterprise retrievalaugmented generation (rag): A content design perspective. In Proceedings of the 2024 8th International Con-ference on Advances in Artificial Intelligence, pages 162–167. 

Pipitone, N. and Houir Alami, G. (2024). Legalbench-rag: A benchmark for retrieval-augmented generation in the legal domain. arXiv preprint arXiv:2408.10343. 

Radeva, I., Popchev, I., Doukovska, L., and Dimitrova, M. (2024). Web application for retrieval-augmented generation: Implementation and testing. Electronics, 13(7):1361. 

Roychowdhury, S., Soman, S., Ranjani, H., Gunda, N., Chhabra, V., and Bala, S. K. (2024). Evaluation of rag metrics for question answering in the telecom domain. arXiv preprint arXiv:2407.12873. 

Sahin, G., Varol, K., and Pak, B. K. (2024). Llm and rag-based question answering assistant for enterprise knowledge management. In Proceedings of the 9th Interna-tional Conference on Computer Science and Engineering (UBMK), pages 1–6. 

Salemi, A. and Zamani, H. (2024). Evaluating retrieval quality in retrieval-augmented generation. In Proceed-ings of the 47th International ACM SIGIR Conference on Research and Development in Information Retrieval, pages 2395–2400. 

Wan, Y. (2024). Enabling Knowledge Representation and Management for Smart Manufacturing Using KGs and LLMs. PhD thesis, Cardiff University. 

Wu, D., Gu, J.-C., Yin, F., Peng, N., and Chang, K.-W. (2024). Synchronous faithfulness monitoring for trustworthy retrieval-augmented generation. In EMNLP. 

Xiao, S., Liu, Z., Zhang, P., Muennighoff, N., Lian, D., and Nie, J.-Y. (2024). C-pack: Packed resources for general chinese embeddings. In Proceedings of the 47th Interna-tional ACM SIGIR Conference on Research and Devel-opment in Information Retrieval, pages 641–649. 

Zhang, J., Liu, X., Hu, Y., Niu, C., Wu, F., and Chen, G. (2025). Ragrouter: Learning to route queries to multiple retrieval-augmented language models. 

EXAMPLE OF QUERY TRANSLATION AND AUGMENTATION 

Question: What percentage improvement in energy efficiency is projected compared to energy consumption in 2030, according to forecasts? 

Query Augmentation: 

 projected energy efficiency improvement per-

centage by 2030 

 forecasted percentage increase in energy effi-

ciency relative to 2030 energy consumption 

 expected energy efficiency gains compared to 

2030 baseline consumption 

 energy efficiency improvement projections for 

2030 (percentage) 

 predicted reduction in energy consumption due 

to efficiency improvements by 2030 

 outlook on energy efficiency enhancement ver-

sus 2030 consumption levels 

ENASE 2026 - 21st International Conference on Evaluation of Novel Approaches to Software Engineering 

1132