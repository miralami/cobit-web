# Laporan Penelitian: Evaluasi Empiris Assessment Tata Kelola TI Berbasis COBIT 2019 dan Contextual Retrieval-Augmented Generation (RAG) dalam Auditing

# Laporan Penelitian: Evaluasi Empiris Assessment Tata Kelola TI Berbasis COBIT 2019 dan Contextual Retrieval-Augmented Generation (RAG) dalam Auditing

## Ringkasan Eksekutif

Proses assessment tata kelola Teknologi Informasi (TI) menggunakan kerangka kerja COBIT 2019 secara historis didominasi oleh peninjauan bukti digital (*evidence collection and review*) yang manual, memakan waktu, dan rentan terhadap subjektivitas penilai (*assessor*) [cite: 1, 2, 3]. Laporan penelitian ini menyajikan analisis objektif dan berbasis bukti (*evidence-based*) mengenai hambatan operasional dalam audit TI, mekanisme penilaian COBIT 2019, lanskap adopsi *Artificial Intelligence* (AI) dan *Generative AI* (GenAI), serta batas-batas kemampuan *Retrieval-Augmented Generation* (RAG) dalam konteks *decision-support system* [cite: 4, 5, 6, 7].

**Beban Kerja Pengumpulan Evidensi**: Data industri menunjukkan bahwa lebih dari 40% profesional kepatuhan keamanan TI masih memantau efektivitas kontrol secara manual [cite: 8], di mana aktivitas pengumpulan dan verifikasi bukti menyerap hingga 50% hingga 80% total durasi siklus audit [cite: 3].

**Gap Operasional dalam Tata Kelola TI**: Meskipun 70% organisasi telah mengadopsi perangkat lunak GRC (*Governance, Risk, and Compliance*) [cite: 1], mayoritas entitas mengalami ketidaksesuaian operasional (*operations gap*) antara pemetaan kontrol teoritis dan eksekusi bukti riil akibat tingginya volume data tidak terstruktur [cite: 1, 2].

**Kompleksitas COBIT 2019**: Kerangka kerja COBIT 2019 membutuhkan penelusuran *goals cascade* yang ketat (13 *Enterprise Goals* ke 13 *Alignment Goals* hingga 40 *Governance/Management Objectives*) [cite: 7, 9], serta pemetaan bukti multi-level untuk mengukur tingkat kapabilitas (*Capability Level* 0–5) dengan skala pemenuhan ISO/IEC 33000 (N, P, L, F) [cite: 7, 9, 10].

**Tingkat Adopsi GenAI yang Asimetris**: Berdasarkan data *Institute of Internal Auditors* (IIA) tahun 2025, meskipun 41% tim audit internal mengindikasikan adopsi atau rencana penggunaan GenAI [cite: 5, 11], hanya 6% yang menggunakannya secara ekstensif pada tahap pekerjaan lapangan (*fieldwork*) dan 60% belum melangkah sama sekali [cite: 5].

**Fenomena Lab-to-Market Gap pada RAG**: Tinjauan literatur sistematis mengungkapkan bahwa 93,6% penelitian RAG enterprise memvalidasi komponen retrival menggunakan data akademis terisolasi [cite: 4], namun gagal mengatasi kegagalan generasi akibat konflik konteks internal (*inter-context conflict*) dan memori parametrik model pada data dunia nyata [cite: 6, 12].

**Batasan Fundamental RAG**: Penggunaan RAG tidak secara otomatis menjamin peningkatan akurasi audit; penelitian terbaru membuktikan bahwa retrival konteks dapat menghasilkan efek *null* atau bahkan memperburuk performa model jika data bukti berisik (*noisy*), kadaluwarsa, atau bertentangan dengan fakta dasar [cite: 6, 13].

**Persyaratan Human-in-the-Loop**: Algoritma LLM/RAG tidak dapat bertindak sebagai penilai otonom dalam audit TI karena ketiadaan akuntabilitas hukum dan risiko *hallucination* [cite: 14, 15, 16, 17]. RAG harus diposisikan secara terbatas sebagai *decision-support framework* berbasis *traceability* [cite: 17, 18].

**Definisi Scope Penelitian S1 yang Realistis**: Untuk jenjang Sarjana (S1), membangun sistem *end-to-end* yang mencakup *assessment*, retrival bukti, *capability rating*, *gap analysis*, hingga rekomendasi otomatis membawa risiko kegagalan proyek yang sangat tinggi [cite: 4, 6, 19]. Fokus penelitian yang defensibel berada pada integrasi retrival bukti kontekstual dan evaluasi *groundedness* dari luaran AI [cite: 4, 6, 19].

---

## 1. Bukti Empiris Permasalahan Audit TI dan Manajemen Evidence

Permasalahan utama dalam audit TI dan assessment COBIT 2019 bukanlah ketiadaan kerangka kerja teoritis, melainkan friksi operasional pada tahap pengumpulan bukti (*evidence collection*), verifikasi (*verification*), dan pemetaan (*mapping*) [cite: 1, 2, 8]. Ketidakmampuan mengelola data bukti secara efisien menciptakan *operations gap* antara desain kontrol ideal dan kondisi operasional riil [cite: 1].

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

Rangkaian data di atas mengindikasikan bahwa hambatan terbesar penilai (*assessor*) bukanlah ketidakpahamannya terhadap standar COBIT, melainkan *information overload* dan fragmentasi bukti [cite: 2, 8]. Auditor membuang waktu secara tidak proporsional untuk mengumpulkan, mengedit, dan memetakan dokumen pendukung (*evidence*) ke indikator kontrol, ketimbang melakukan analisis risiko tingkat tinggi [cite: 23].

---

## 2. Analisis Proses Assessment Tata Kelola TI Berbasis COBIT 2019

### Kerangka Kerja dan Struktur COBIT 2019

COBIT 2019 yang diterbitkan oleh ISACA memisahkan secara tegas fungsi tata kelola (*governance*) dari manajemen (*management*) [cite: 7]. Kerangka kerja ini mencakup 40 *Governance and Management Objectives* yang terbagi ke dalam lima domain utama [cite: 7]:

**Evaluate, Direct and Monitor (EDM)**: Terdiri dari 5 sasaran tata kelola yang berfokus pada evaluasi pemangku kepentingan, penentuan arah strategis, dan pemantauan kinerja di tingkat dewan direksi/komisaris [cite: 7].

**Align, Plan and Organize (APO)**: Terdiri dari 14 sasaran manajemen yang mencakup organisasi keseluruhan, strategi, arsitektur, portofolio, dan manajemen risiko TI [cite: 7].

**Build, Acquire and Implement (BAI)**: Terdiri dari 11 sasaran manajemen yang menangani identifikasi kebutuhan, akuisisi, konstruksi, dan integrasi solusi teknologi [cite: 7].

**Deliver, Service and Support (DSS)**: Terdiri dari 6 sasaran manajemen yang berfokus pada penyampaian operasional layanan TI, manajemen insiden, dan keamanan data [cite: 7].

**Monitor, Evaluate and Assess (MEA)**: Terdiri dari 4 sasaran manajemen yang mencakup evaluasi kinerja internal, pemantauan kontrol internal, dan kepatuhan terhadap regulasi eksternal [cite: 7].

Proses penentuan prioritas domain dilakukan melalui *COBIT Goals Cascade* [cite: 7, 9]. Pemangku kepentingan mengidentifikasi *Stakeholder Drivers and Needs*, yang kemudian ditranslasikan menjadi 13 *Enterprise Goals* (EG) [cite: 7, 9]. *Enterprise Goals* selanjutnya dipetakan ke 13 *Alignment Goals* (AG), yang secara langsung memprioritaskan sasaran dari 40 *Governance and Management Objectives* [cite: 7, 9]. Selain itu, penetapan prioritas ini dipengaruhi oleh 11 *Design Factors*, termasuk strategi bisnis, profil risiko, lanskap ancaman, dan persyaratan kepatuhan [cite: 9].

### Praktik Operasional Assessor: Alur Kerja dari Evidence hingga Recommendation

Dalam praktik lapangan, seorang penilai (*assessor*) COBIT 2019 menjalankan alur kerja sistematis berurutan sebagai berikut [cite: 2, 7, 9]:

Pertama, pada tahap *Contextualization and Scoping*, assessor mengevaluasi 11 *Design Factors* organisasi dan menjalankan *Goals Cascade* untuk menentukan domain prioritas yang akan dinilai [cite: 7, 9]. Langkah ini memastikan penilaian terfokus pada area yang memberikan nilai strategis terbesar bagi organisasi [cite: 7, 9].

Kedua, pada tahap *Evidence Collection and Inventorying*, assessor mengumpulkan bukti-bukti audit yang relevan [cite: 2, 8]. Bukti ini mencakup dokumen kebijakan formal, Standar Prosedur Operasional (SOP), artefak arsitektur, log konfigurasi sistem, tiket insiden, hingga transkrip wawancara dengan pemilik proses [cite: 2, 8, 24].

Ketiga, pada tahap *Evidence Mapping to COBIT Practices*, assessor memetakan setiap bukti dokumen ke *Management Practices* dan *Activities* spesifik di dalam domain COBIT yang dipilih [cite: 2, 7]. Assessor harus memverifikasi kecukupan (*sufficiency*) dan kesesuaian (*appropriateness*) bukti tersebut [cite: 2].

Keempat, pada tahap *Capability Level Rating*, assessor menguji ketercapaian kriteria pada skala *COBIT Performance Management* (CPM) yang mengadopsi standar ISO/IEC 33000 [cite: 7, 9, 10]. Penilaian ketercapaian kriteria aktivitas (*Activity Rating Scale*) menggunakan ambang batas matematis sebagai berikut [cite: 7, 9, 10]:

**N (Not Achieved)**: 0% hingga 15% pemenuhan. Bukti sangat minim atau tidak ada pencapaian [cite: 7, 9, 10].

**P (Partially Achieved)**: >15% hingga 50% pemenuhan. Bukti menunjukkan pendekatan tidak terstruktur dan ketercapaian parsial [cite: 7, 9, 10].

**L (Largely Achieved)**: >50% hingga 85% pemenuhan. Bukti menunjukkan implementasi terstruktur meskipun masih terdapat celah minor [cite: 7, 9, 10].

**F (Fully Achieved)**: >85% hingga 100% pemenuhan. Bukti lengkap, konsisten, dan terbukti berjalan efektif secara berkelanjutan [cite: 7, 9, 10].

Prinsip utama CPM menetapkan bahwa suatu domain proses hanya dianggap mencapai *Capability Level* tertentu (misalnya Level 2) jika seluruh aktivitas pada tingkat tersebut mendapatkan predikat **Fully Achieved (F)** dan tingkat di bawahnya telah terpenuhi penuh [cite: 9, 25]. Sebagai contoh, jika sebuah proses mencapai rerata 73% (Largely Achieved) pada Level 2, secara resmi proses tersebut dinilai **gagal mencapai Level 2** [cite: 25].

Kelima, pada tahap *Gap Analysis and Findings Synthesis*, assessor membandingkan *Target Capability Level* yang diinginkan organisasi dengan *Current Capability Level* hasil pengujian [cite: 7, 9]. Ketidaksesuaian antara kriteria COBIT dan bukti nyata didokumentasikan sebagai temuan audit (*findings*) [cite: 7].

Keenam, pada tahap *Recommendations Roadmap*, assessor merumuskan rekomendasi perbaikan berbasis risiko untuk menutup celah kapabilitas yang ditemukan, yang kemudian disusun menjadi peta jalan implementasi (*implementation roadmap*) [cite: 7].

### Titik Friksi dan Hambatan Kualitatif Assessor

Proses manual peninjauan bukti menciptakan beberapa titik friksi kritis [cite: 2, 21, 26]:

**Ambiguasi Semantik**: Teks dokumen internal organisasi sering kali menggunakan terminologi lokal yang tidak sepadan secara langsung dengan *Standard Practice* COBIT [cite: 26].

**Dispersi Bukti Digital**: Dokumen bukti tersebar di berbagai repositori heterogen (SharePoint, Jira, Google Drive, server lokal) dalam format yang beragam (PDF, DOCX, tangkapan layar) [cite: 24, 26].

**Subjektivitas Penilai**: Penentuan ambang batas predikat P vs L sering kali bergantung pada persepsi individual auditor, bukan pada rasio kualitatif kuantitatif yang objektif [cite: 27].

**Keterputusan Traceability**: Rekomendasi audit sering kali terlepas dari bukti mentah, sehingga manajemen kesulitan memverifikasi apakah rekomendasi didasarkan pada celah riil atau asumsi auditor [cite: 12, 28].

---

## 3. Bukti Kualitatif dan Risiko Manajemen Audit Evidence

Berdasarkan standar profesional dari ISACA, IIA, dan ISO/IEC 27001/27002, bukti audit (*audit evidence*) didefinisikan sebagai seluruh informasi yang digunakan oleh auditor untuk menentukan apakah obyek yang diperiksa sesuai dengan kriteria yang ditetapkan [cite: 2, 14]. Kualitas bukti audit diukur berdasarkan dua pilar utama: kecukupan (*sufficiency*) yang merujuk pada kuantitas bukti, dan kesesuaian (*appropriateness*) yang mencakup relevansi serta keandalan (*reliability*) [cite: 2].

Keandalan bukti digital sangat bergantung pada keterlacakan (*traceability*) dan keutuhan rantai kepemilikan (*chain of custody*) [cite: 24, 29]. Dalam lingkungan TI yang kompleks, auditor menghadapi fenomena *information overload* [cite: 2, 30]. Volume dokumen operasional yang melimpah tidak serta-merta meningkatkan kualitas audit, melainkan justru meningkatkan risiko kesalahan manusia (*human error*) dalam mengenali bukti yang sudah kadaluwarsa (*outdated evidence*) atau tidak relevan [cite: 14, 24, 30].

Risiko utama dalam manajemen bukti mencakup hilangnya jejak audit (*audit trail breakage*), di mana keputusan penilaian tidak dapat ditelusuri kembali ke dokumen sumber [cite: 14, 28]. Selain itu, ketergantungan pada pemrosesan bukti secara manual menyebabkan lonjakan biaya operasional (*labor costs*) dan meningkatkan *audit fatigue* pada entitas yang diperiksa [cite: 2, 8, 21].

---

## 4. Lanskap Adopsi AI dan Generative AI dalam Audit dan GRC (2022–2026)

Penggunaan kecerdasan buatan dalam audit internal dan audit TI mengalami transisi dari alat analisis data terstruktur tradisional menuju model bahasa generatif (*Generative AI*) [cite: 2, 5]. Namun, adopsi di tingkat industri menunjukkan pola yang sangat berhati-hati (*cautious adoption*) [cite: 5].

### Data Empiris Adopsi AI

Data dari survei *Institute of Internal Auditors* (IIA) dan Gartner mengindikasikan tren berikut [cite: 5, 11, 31]:

**Tingkat Adopsi Umum**: IIA 2025 North American Pulse Report mencatat bahwa 41% fungsi audit internal melaporkan menggunakan atau merencanakan penggunaan GenAI [cite: 5]. Angka ini paralel dengan temuan Gartner 2024 yang menunjukkan 41% tim audit internal telah atau akan menggunakan GenAI [cite: 11].

**Tingkat Penggunaan Berkelanjutan**: Meskipun 41% menyatakan adopsi atau rencana, pemanfaatan ekstensif pada fase teknis sangat rendah: 59% organisasi dilaporkan tidak menggunakannya sama sekali, 13% menggunakannya untuk perencanaan audit, 6% pada pekerjaan lapangan (*fieldwork*), 11% pada pelaporan, dan hanya 2% pada tindak lanjut audit [cite: 5].

**Kompetensi Utama**: Analisis data (*Data Analytics*) menjadi kompetensi nomor satu yang paling dicari oleh Chief Audit Executives, dipilih oleh 78% responden [cite: 5].

### Kasus Penggunaan AI dalam Audit

Aplikasi GenAI dan LLM dalam domain audit mencakup [cite: 4, 32]:

**Otomatisasi Penelaahan Dokumen Kepatuhan**: Mengekstrak klausul dari regulasi eksternal dan membandingkannya dengan teks standar prosedur internal [cite: 26, 33].

**Penyusunan Draf Laporan Audit**: Mengubah kumpulan catatan temuan (*finding notes*) menjadi struktur paragraf laporan audit yang formal [cite: 4, 24].

**Penyesuaian Program Audit Berbasis Risiko**: Menggunakan LLM untuk menyarankan ukuran sampel audit berdasarkan profil risiko objek audit [cite: 32].

### Hambatan Adopsi, Riset Risiko, dan Human Oversight

Kekhawatiran utama industri terhadap adopsi AI secara penuh dalam audit didasarkan pada risiko-risiko berikut [cite: 14, 15, 16]:

**Hallucination & Non-Determinism**: Model GenAI bersifat probabilistik, di mana *prompt* yang sama dapat menghasilkan rekomendasi yang berbeda pada dua iterasi berurutan [cite: 16]. Hal ini bertentangan dengan prinsip audit yang membutuhkan keterulangan (*repeatability*) dan konsistensi [cite: 16, 34].

**Kerahasiaan Data**: Mengirimkan dokumen bukti internal yang berisi arsitektur jaringan atau data personal ke API LLM publik berisiko melanggar undang-undang perlindungan data [cite: 11, 16, 30].

**Ketiadaan Akuntabilitas**: Sistem AI tidak memiliki entitas hukum untuk bertanggung jawab atas kesalahan opini audit [cite: 18, 35]. Oleh karena itu, kerangka kerja audit dari IIA dan ISACA menegaskan posisi mutlak *Human-in-the-Loop* (HITL) [cite: 11, 17].

---

## 5. Kajian Literatur Terstruktur: RAG dan LLM dalam Audit, Regulasi, dan Governance

Berikut adalah tinjauan terhadap 16 riset utama yang relevan dengan penerapan RAG, LLM, dan automasi kepatuhan/audit dari tahun 2023 hingga 2026.

|   |   |   |   |   |   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

|   |   |   |   |   |   |   |   |   |   |   |

---

## 6. Metodologi Evaluasi Kualitas RAG untuk Assessment COBIT 2019

Dalam mengimplementasikan RAG untuk *decision-support system* assessment COBIT 2019, evaluasi tidak boleh hanya berpatokan pada metrik Generative AI standar (seperti BLEU atau ROUGE) [cite: 39]. Sistem harus dievaluasi menggunakan *RAG Triad* dan metrik spesifik domain audit [cite: 6, 39, 40].

### Triad Evaluasi RAG dan Metrik Turunan

**Context Precision**: Mengukur rasio *chunk* bukti yang diambil oleh retriever yang benar-benar relevan dengan kriteria aktivitas COBIT [cite: 19, 39].

**Context Recall**: Mengukur apakah seluruh dokumen bukti yang dibutuhkan untuk menilai suatu *practice* berhasil diambil secara lengkap [cite: 19, 39].

**Faithfulness (Groundedness)**: Mengukur apakah klaim atau penilaian yang dihasilkan oleh LLM **sepenuhnya didasarkan** pada *chunk* bukti yang diretriev, tanpa penyisipan memori parametrik yang tidak terverifikasi [cite: 6, 39].

**Answer Relevance**: Mengukur sejauh mana analisis gap atau rekomendasi menjawab langsung kebutuhan kriteria COBIT yang ditanyakan [cite: 39].

**Citation Correctness & Source Attribution**: Mengukur presisi penunjukan kutipan (*metadata mapping*) dari kalimat luaran ke dokumen bukti asal (nomor halaman, ID dokumen) [cite: 12, 24, 41].

### Framework Evaluasi Otomatis dan Kustom

Dua kerangka kerja evaluasi yang relevan untuk diintegrasikan meliputi kerangka kerja seperti RAGAS, TruLens, dan DeepEval yang memanfaatkan teknik *LLM-as-a-Judge* untuk mengkalkulasi skor matematis terisolasi pada Faithfulness, Answer Relevance, dan Context Precision [cite: 39, 40]. Selain itu, pendekatan Re:CAP (*Retrieval Coverage Audit by Iterative Probing*) memeriksa apakah ada dokumen bukti yang terlewat (*missing evidence*) dengan memunculkan *gap-questions* secara konsekutif [cite: 19].

### Skema Evaluasi Dual-Index

Sistem pendukung assessment COBIT 2019 mengelola dua jenis repositori pengetahuan yang memiliki karakteristik berbeda:

Indeks Pertama adalah **COBIT 2019 Core Knowledge Base**, yang bersifat statis, terstruktur, serta berisi definisi standar, *practices*, *activities*, dan skala kapabilitas [cite: 7]. Indeks Kedua adalah **Organizational Evidence Store**, yang bersifat dinamis, tidak terstruktur, serta berisi SOP, log sistem, sertifikat, dan dokumen operasional perusahaan [cite: 2, 24, 26].

Proses evaluasi dual-index berjalan dalam tiga tahap terpadu [cite: 24, 33, 36]. Ketika pengguna memasukkan query mengenai kriteria spesifik (misalnya, pemenuhan kriteria APO12.01 tentang Manajemen Risiko TI), sistem pertama-tama melakukan query ke COBIT Core Knowledge Base untuk mengekstrak definisi standar dan indikator aktivitas yang presisi [cite: 7]. Selanjutnya, kriteria standar tersebut dikombinasikan dengan query awal untuk melakukan retrival ke Organizational Evidence Store guna menemukan bukti dokumen organisasi yang relevan [cite: 24, 33].

Tahap akhir melibatkan evaluasi *groundedness* berkelanjutan, di mana LLM membandingkan bukti yang ditemukan dengan kriteria standar, menghitung skor *faithfulness*, serta menautkan setiap klaim penilaian secara presisi ke nomor halaman dan dokumen sumber (*citation linking*) [cite: 17, 39, 41].

---

## 7. Analisis Research Gap yang Defensibel

Berdasarkan penelaahan literatur yang mendalam, klaim bahwa *"belum ada penelitian yang membahas AI untuk audit"* adalah **keliru** [cite: 2, 4, 17]. Kesenjangan penelitian (*research gap*) yang defensibel terletak pada pemetaan terverifikasi antara bukti tidak terstruktur terhadap kerangka kerja COBIT 2019 secara spesifik [cite: 42].

Analisis kesenjangan ini dibagi menjadi empat tingkatan akademis:

Pertama, pada tingkat **Established Facts (Fakta Terbukti dalam Literatur)**, telah terbukti bahwa RAG menurunkan tingkat *hallucination* pada query pengetahuan spesifik [cite: 43, 44], otomasi kepatuhan menghemat waktu pengumpulan bukti hingga 80% [cite: 3], dan *hybrid search* (BM25 + Dense Vector) unggul atas *pure vector search* pada pemrosesan terminologi TI [cite: 24].

Kedua, pada tingkat **Literature Findings (Temuan Literatur Terkini)**, riset menunjukkan bahwa Graph-RAG meningkatkan akurasi pemetaan regulasi terstruktur seperti GDPR dan ISO 27001 [cite: 17, 33], mayoritas evaluasi RAG industri berfokus pada generasi teks namun mengabaikan *coverage retrival* [cite: 4, 19], serta LLM rentan mengalami kegagalan retrival jika bukti internal saling bertentangan [cite: 6].

Ketiga, pada tingkat **Logical Inferences (Inferensi Logis Peneliti)**, aturan penilaian COBIT 2019 (CPM) membutuhkan verifikasi bukti 100% pada tingkat kapabilitas di bawahnya sebelum dapat naik ke level berikutnya [cite: 9, 25]. Oleh karena itu, Naive RAG tanpa pemrosesan terstruktur tidak cocok untuk mengkalkulasi skala kapabilitas N, P, L, F [cite: 7, 10].

Keempat, pada tingkat **Claims Needing Validation (Research Gap Utama Skripsi)**, perlu divalidasi sejauh mana RAG berbasis *Contextual Retrieval* mampu mendeteksi ketiadaan bukti (*missing evidence*) dalam domain COBIT 2019, serta apakah RAG yang dilengkapi *metadata-filtering* mampu menghasilkan draf skor kapabilitas yang selaras dengan penilaian assessor pakar [cite: 19, 25, 36].

---

## 8. Tantangan Solusi RAG, Batasan Teknis, dan Human-in-the-Loop

### Kapan RAG Tidak Cocok dan Batasan Teknis

RAG bukanlah solusi mutlak untuk seluruh permasalahan audit TI [cite: 13]. Peneliti harus secara jujur mengakui batasan-batasan teknis berikut [cite: 6, 13, 14, 16]:

**Retrieval Failure akibat Evidence Ambiguity**: Jika dokumen bukti organisasi sangat buruk, tidak diberi tanggal, atau menggunakan penamaan yang tidak standar, mesin retrival akan mengambil *chunk* yang salah, sehingga menghasilkan analisis gap yang menyesatkan (*garbage in, garbage out*) [cite: 36].

**Inter-Context Conflict**: Ketika terdapat dua dokumen bukti yang bertentangan (misalnya SOP 2020 menyatakan "Backup bulanan" dan SOP 2024 menyatakan "Backup harian"), RAG dapat mengalami kegagalan penalaran tanpa adanya aturan penanganan kontrol versi [cite: 6, 24].

**CARS Ceiling Effect**: Penelitian Sarkar (2026) menunjukkan bahwa metrik ketataan konteks (*Context-Adherence*) sering kali memberikan skor tinggi secara semu (*ceiling effect*), padahal luaran LLM menyembunyikan asumsi implisit yang tidak ada di dalam bukti [cite: 6].

**Bukan Pengganti Professional Judgment**: RAG tidak mampu menilai konteks budaya organisasi, politik internal, atau efektivitas riil di lapangan. RAG hanya membandingkan teks bukti terhadap teks kriteria [cite: 21, 26].

---

## 9. Analisis Scope Penelitian Skripsi (S1) dan Trade-offs

Untuk memastikan skripsi S1 dapat diselesaikan secara tepat waktu namun tetap berbobot secara akademis, berikut adalah analisis komparatif dari empat pilihan lingkup (*scope*) penelitian:

|   |   |   |   |   |

| --- | --- | --- | --- | --- |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

|   |   |   |   |   |

Memilih Scope D membawa risiko kegagalan proyek yang tinggi karena alokasi waktu mahasiswa S1 akan habis untuk pekerjaan rekayasa perangkat lunak ketimbang analisis kritis hasil riset [cite: 4]. Scope B dan Scope C menawarkan keseimbangan ideal antara kontribusi ilmiah dan keterlaksanaan [cite: 4, 6, 39].

---

## 10. Rumusan Masalah Penelitian (Research Questions) S1

**RQ1 (Retrieval Accuracy)**: *Sejauh mana kombinasi strategi pemrosesan dokumen (hybrid search dan contextual chunking) mampu meningkatkan Context Precision dan Context Recall dalam mengambil bukti audit yang relevan dengan kriteria aktivitas COBIT 2019 dibandingkan dengan pencarian vektor standar (Naive RAG)?* [cite: 24, 36]

**RQ2 (Groundedness & Hallucination Mitigation)**: *Bagaimana tingkat Faithfulness (groundedness) dan akurasi atribusi sumber (citation correctness) dari luaran LLM saat memetakan bukti dokumen organisasi yang tidak terstruktur ke dalam kriteria penilaian kapabilitas COBIT 2019?* [cite: 6, 39]

**RQ3 (Capability Rating Alignment)**: *Sejauh mana draf penilaian kapabilitas (skala N, P, L, F) yang dihasilkan oleh sistem pendukung RAG memiliki tingkat kesesuaian (inter-rater agreement) dengan penilaian manual yang dilakukan oleh assessor pakar?* [cite: 9, 10, 27]

**RQ4 (Decision-Support Impact)**: *Bagaimana dampak penggunaan prototype RAG decision-support system terhadap efisiensi waktu peninjauan bukti dan tingkat kepuasan auditor manusia dalam mengidentifikasi gap kepatuhan COBIT 2019?* [cite: 3, 17]

---

## 11. Evidence Map dan Matriks Kualitas Evidensi

### Pemetaan Kausalitas Permasalahan dan Riset (Evidence Map Matrix)

|   |   |   |   |   |   |

| --- | --- | --- | --- | --- | --- |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

|   |   |   |   |   |   |

### Matriks Kualitas Evidensi (Evidence Quality Assessment)

|   |   |   |   |

| --- | --- | --- | --- |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

|   |   |   |   |

---

## 12. Analisis Sumber Utama dan Kontribusi Akademis

Landasan teoretis dan metodologis dari laporan penelitian ini dibangun di atas 10 sumber ilmiah dan organisasi profesional bereputasi tinggi:

Landasan utama penilaian tata kelola berasal dari terbitan resmi ISACA mengenai kerangka kerja COBIT 2019 [cite: 7, 9, 10]. Publikasi ini memberikan kontribusi teoretis mutlak mengenai struktur 40 *Governance and Management Objectives*, mekanisme *Goals Cascade*, serta aturan penilaian kapabilitas berbasis *COBIT Performance Management* (CPM) yang mengadopsi ISO/IEC 33000 [cite: 7, 9, 10].

Laporan *North American Pulse of Internal Audit* (2025) yang diterbitkan oleh IIA Foundation memberikan kontribusi statistik empiris mengenai tingkat adopsi nyata Generative AI di lapangan audit internal, membuktikan bahwa adopsi teknis pada *fieldwork* baru mencapai 6% [cite: 5]. Hal ini didukung oleh temuan *IT Risk Management and Compliance Benchmark Report* (2021) dari Hyperproof yang mengonfirmasi eksistensi *operations gap* dan fakta bahwa 40% profesional kepatuhan masih mengandalkan proses manual [cite: 1, 8].

Dari ranah ilmu komputer dan AI, tinjauan literatis sistematis oleh Karakurt (2026) dalam *Applied Sciences* menyumbangkan taksonomi RAG enterprise serta memetakan kesenjangan evaluasi *lab-to-market* [cite: 4, 30]. Riset Sarkar (2026) mengenai *Input-Regime Audit* memberikan kontribusi kritis dengan membongkar kelemahan metrik evaluasi RAGAS (seperti *ceiling effect* pada CARS) saat menghadapi dokumen bertentangan [cite: 6].

Dalam hal otomatisasi kepatuhan teks, Chen et al. (2025) pada konferensi COLING memperkenalkan arsitektur integrasi RAG dengan *Knowledge Graph* terstruktur untuk penilaian kepatuhan regulasi [cite: 33]. Riset Anthropic (2024) tentang *Contextual Retrieval* menyumbangkan solusi teknis *Contextual Embeddings* yang terbukti menurunkan kegagalan retrival hingga 67% pada pemrosesan dokumen panjang [cite: 36].

Selanjutnya, arsitektur Re:CAP (2026) menyumbangkan algoritma *iterative probing* untuk memverifikasi cangkupan dokumen bukti yang terlewat [cite: 19]. Gianola & Zerva (2025) menegaskan pentingnya integrasi RAG dengan penalaran simbolik untuk menjaga keterlacakan aturan hukum [cite: 26]. Terakhir, studi Amirizaniani et al. (2024) mengenai *AuditLLM* menyajikan kerangka kerja pengujian multiprobe untuk mengukur stabilitas kognitif dan konsistensi luaran LLM terhadap variasi query [cite: 34].

---

2021 IT Compliance Benchmark Report - Hyperproof, [https://hyperproof.io/2021-it-compliance-benchmark-report/](https://hyperproof.io/2021-it-compliance-benchmark-report/)

(PDF) A Systematic Literature Review for New Technologies in IT Audit - ResearchGate, [https://www.researchgate.net/publication/376731980_A_Systematic_Literature_Review_for_New_Technologies_in_IT_Audit](https://www.researchgate.net/publication/376731980_A_Systematic_Literature_Review_for_New_Technologies_in_IT_Audit)

Compliance Automation: Reducing Audit Preparation Time by 80% - Avatier, [https://www.avatier.com/blog/compliance-automation-audit/](https://www.avatier.com/blog/compliance-automation-audit/)

(PDF) Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs) for Enterprise Knowledge Management and Document Automation: A Systematic Literature Review - ResearchGate, [https://www.researchgate.net/publication/399264692_Retrieval-Augmented_Generation_RAG_and_Large_Language_Models_LLMs_for_Enterprise_Knowledge_Management_and_Document_Automation_A_Systematic_Literature_Review](https://www.researchgate.net/publication/399264692_Retrieval-Augmented_Generation_RAG_and_Large_Language_Models_LLMs_for_Enterprise_Knowledge_Management_and_Document_Automation_A_Systematic_Literature_Review)

Monitoring the Pulse of Internal Audit: 8 Key Takeaways from The IIA's New Report - Optro, [https://optro.ai/blog/monitoring-the-pulse-of-internal-audit-8-key-takeaways-from-the-iias-new-report](https://optro.ai/blog/monitoring-the-pulse-of-internal-audit-8-key-takeaways-from-the-iias-new-report)

An Input-Regime Audit of Conflict Detection for Retrieval-Augmented Generation, [https://www.dipankar.cc/publication/input-regime-audit-rag-conflict-detection/](https://www.dipankar.cc/publication/input-regime-audit-rag-conflict-detection/)

COBIT 2019: Design Factors, Risk Profile & Governance Objectives - CyberSigma, [https://cybersigmacs.com/knowledge-center/cobit/](https://cybersigmacs.com/knowledge-center/cobit/)

The Ultimate Guide to Compliance Operations | Hyperproof, [https://hyperproof.io/compliance-operations/](https://hyperproof.io/compliance-operations/)

Evaluation Of Information Technology Governance at Mikroskil University Using COBIT 2019 Framework with BAI11 Domain - ResearchGate, [https://www.researchgate.net/publication/365921381_Evaluation_Of_Information_Technology_Governance_at_Mikroskil_University_Using_COBIT_2019_Framework_with_BAI11_Domain](https://www.researchgate.net/publication/365921381_Evaluation_Of_Information_Technology_Governance_at_Mikroskil_University_Using_COBIT_2019_Framework_with_BAI11_Domain)

COBIT 2019 Process Assessment Guide - Governance - Scribd, [https://www.scribd.com/document/168021233/3-COBIT-5-Self-Assessment-Templates](https://www.scribd.com/document/168021233/3-COBIT-5-Self-Assessment-Templates)

Strategic Digital Transformation of Internal Audit: The Microsoft Case Study. - CCT ARC - CCT College Dublin, [https://arc.cct.ie/cgi/viewcontent.cgi?article=1063&context=business](https://arc.cct.ie/cgi/viewcontent.cgi?article=1063&context=business)

Deletion Isn't Enough: Auditing RAG for Selective Forgetting - Mark Sanderson, [https://marksanderson.org/files/papers/SIGIR2026_Leila_Main__Copy_.pdf](https://marksanderson.org/files/papers/SIGIR2026_Leila_Main__Copy_.pdf)

Component-Level Contributions of Retrieval-Augmented LLM Post-Processing in Streaming Anomaly Detection: A Matched-Operating-Point Case Audit - MDPI, [https://www.mdpi.com/1424-8220/26/16/5246](https://www.mdpi.com/1424-8220/26/16/5246)

ISACA® Industry News, [https://www.isaca.org/resources/news-and-trends/industry-news](https://www.isaca.org/resources/news-and-trends/industry-news)

ISACA® News and Trends, [https://www.isaca.org/resources/news-and-trends](https://www.isaca.org/resources/news-and-trends)

AI Model Risk Management in Finance: The 2026 Practitioner's Framework | Finrep Blog, [https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework](https://www.finrep.ai/blog/ai-model-risk-management-in-finance-the-2026-practitioners-framework)

IntelliAudit: Using Large Language Models to Evaluate Audit Controls - arXiv, [https://arxiv.org/html/2608.07688v1](https://arxiv.org/html/2608.07688v1)

A Systematic Review of Key Retrieval-Augmented Generation (RAG) Systems:Progress, Gaps, and Future Directions - arXiv, [https://arxiv.org/html/2507.18910v1](https://arxiv.org/html/2507.18910v1)

Re:CAP – Auditing Retrieval Coverage in Production RAG Pipelines - arXiv, [https://arxiv.org/html/2609.24122v1](https://arxiv.org/html/2609.24122v1)

Audit and Data Controls Market Size, Share | CAGR 24.50%, [https://market.us/report/audit-and-data-controls-market/](https://market.us/report/audit-and-data-controls-market/)

Journal of Accounting & Organizational Change - Lancashire Online Knowledge, [https://knowledge.lancashire.ac.uk/id/eprint/58033/1/Understanding%20challenges%20of%20conventional%20remote%20auditing%20and%20AI-enabled%20remote%20IT%20auditing%20audit%20professionals%20perspectives%20from%20an%20emerging%20economy.pdf](https://knowledge.lancashire.ac.uk/id/eprint/58033/1/Understanding%20challenges%20of%20conventional%20remote%20auditing%20and%20AI-enabled%20remote%20IT%20auditing%20audit%20professionals%20perspectives%20from%20an%20emerging%20economy.pdf)

Understanding challenges of conventional remote auditing and AI-enabled remote IT auditing: audit professionals' perspectives from an emerging economy | Journal of Accounting & Organizational Change | Emerald Publishing, [https://www.emerald.com/jaoc/article/doi/10.1108/JAOC-12-2024-0395/1309853/Understanding-challenges-of-conventional-remote](https://www.emerald.com/jaoc/article/doi/10.1108/JAOC-12-2024-0395/1309853/Understanding-challenges-of-conventional-remote)

Top Governance, Risk, and Compliance Software for U.S. Organizations in 2026 - Drata, [https://drata.com/learn/governance/risk-and-compliance-software-for-us-organizations](https://drata.com/learn/governance/risk-and-compliance-software-for-us-organizations)

Retrieval-Augmented Generation for Dept. Test & Evaluation, [https://itea.org/journals/volume-47-2/retrieval-augmented-generation-t-and-e/](https://itea.org/journals/volume-47-2/retrieval-augmented-generation-t-and-e/)

Evaluation Of Information Technology Governance at Mikroskil University Using COBIT 2019 Framework with BAI11 Domain - Universitas Komputer Indonesia, [https://ojs.unikom.ac.id/index.php/injuratech/article/download/8085/3319](https://ojs.unikom.ac.id/index.php/injuratech/article/download/8085/3319)

Compliance Checking for Public Administration Processes using Retrieval-Augmented Generation in LLMs: Novel Directions and Challenges - CEUR-WS, [https://ceur-ws.org/Vol-4142/paper22.pdf](https://ceur-ws.org/Vol-4142/paper22.pdf)

The Impact of Information Technology Audits on Audit Efficiency and Effectiveness: Evidence from UK Firms, [https://mpra.ub.uni-muenchen.de/id/eprint/127542/contents](https://mpra.ub.uni-muenchen.de/id/eprint/127542/contents)

Design and Deployment of a RAG System for ... - SciTePress, [https://www.scitepress.org/Papers/2026/147155/147155.pdf](https://www.scitepress.org/Papers/2026/147155/147155.pdf)

Environmental Accounting and Corporate Sustainability Reports Quality: Evidence From Ghana | Request PDF - ResearchGate, [https://www.researchgate.net/publication/393436168_Environmental_Accounting_and_Corporate_Sustainability_Reports_Quality_Evidence_From_Ghana](https://www.researchgate.net/publication/393436168_Environmental_Accounting_and_Corporate_Sustainability_Reports_Quality_Evidence_From_Ghana)

Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs) for Enterprise Knowledge Management and Document Automation: A Systematic Literature Review - MDPI, [https://www.mdpi.com/2076-3417/16/1/368](https://www.mdpi.com/2076-3417/16/1/368)

The Institute of Internal Auditors Released Findings From its New Survey - HRTech Series, [https://techrseries.com/analytics/the-institute-of-internal-auditors-released-findings-from-its-new-survey/](https://techrseries.com/analytics/the-institute-of-internal-auditors-released-findings-from-its-new-survey/)

2025 Volume 1 Refreshing IT Audit with LLMs - ISACA, [https://www.isaca.org/resources/isaca-journal/issues/2025/volume-1/refreshing-it-audit-with-llms](https://www.isaca.org/resources/isaca-journal/issues/2025/volume-1/refreshing-it-audit-with-llms)

A Compliance Checking Framework Based on Retrieval Augmented Generation - ACL Anthology, [https://aclanthology.org/2025.coling-main.178.pdf](https://aclanthology.org/2025.coling-main.178.pdf)

AuditLLM: A Tool for Auditing Large Language Models Using Multiprobe Approach - arXiv, [https://arxiv.org/abs/2402.09334](https://arxiv.org/abs/2402.09334)

(PDF) Auditing Large Language Models - ResearchGate, [https://www.researchgate.net/publication/397001523_Auditing_Large_Language_Models](https://www.researchgate.net/publication/397001523_Auditing_Large_Language_Models)

Contextual Retrieval in AI Systems - Anthropic, [https://www.anthropic.com/engineering/contextual-retrieval](https://www.anthropic.com/engineering/contextual-retrieval)

(PDF) Retrieval-Augmented Generation for AI-Generated Content: A Survey - ResearchGate, [https://www.researchgate.net/publication/399398595_Retrieval-Augmented_Generation_for_AI-Generated_Content_A_Survey](https://www.researchgate.net/publication/399398595_Retrieval-Augmented_Generation_for_AI-Generated_Content_A_Survey)

Say It Another Way: Auditing LLMs with a User-Grounded Automated Paraphrasing Framework - arXiv, [https://arxiv.org/html/2505.03563v2](https://arxiv.org/html/2505.03563v2)

RAGRAG Toolbox: Methodologies for Evaluating RAG Systems | by Ajaimlianzy - Medium, [https://medium.com/@ajaimlianzy/rag-toolbox-methodologies-for-evaluating-rag-systems-f95ed4b90bdc](https://medium.com/@ajaimlianzy/rag-toolbox-methodologies-for-evaluating-rag-systems-f95ed4b90bdc)

8 RAG Evaluation Tools to Test and Debug LLM Apps - QAwerk, [https://qawerk.com/blog/rag-evaluation-tools/](https://qawerk.com/blog/rag-evaluation-tools/)

Issues · RAG Evidence & Citation Auditor - Apify, [https://apify.com/rayanna/rag-evidence-citation-auditor/issues](https://apify.com/rayanna/rag-evidence-citation-auditor/issues)

Reframing Internal Audit Through Emerging AI Technologies: Toward an Integration Framework and Assessment Model - MDPI, [https://www.mdpi.com/2079-9292/15/11/2280](https://www.mdpi.com/2079-9292/15/11/2280)

When Retrieval Succeeds and Fails: Rethinking Retrieval-Augmented Generation for LLMs, [https://arxiv.org/html/2510.09106v1](https://arxiv.org/html/2510.09106v1)

RAG-Safety-Bench: Reliable Evaluation of Retrieval-Augmented LLM Safety - arXiv, [https://arxiv.org/html/2609.11758v1](https://arxiv.org/html/2609.11758v1)