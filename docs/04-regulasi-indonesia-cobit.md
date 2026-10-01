# Regulasi Indonesia Tata Kelola TI & Adopsi COBIT 2019

> **Sumber:** Hasil riset librarian 2026-10-01. Dokumen konteks untuk mendukung Bab 1 Latar Belakang.
> **Chain:** Feeds into [`latar-belakang.md`](latar-belakang.md).

---

## Catatan Metodologis Penting

**Temuan negatif yang memperkuat klaim novelti skripsi:**

> **Tidak ada satu pun regulasi Indonesia yang menyebut "COBIT" secara eksplisit/obligatory.**

Regulasi hanya menyebut standar generik ("standar dan praktik-praktik terbaik", "ISO", "SNI"). Adopsi COBIT saat ini bersifat **voluntary/adopted**, bukan mandatory. Ini celah riset yang legitimate — sistem pengukuran berbasis COBIT + traceability evidence adalah **fill-in-the-gap**.

---

# BAGIAN 1 — REGULASI INDONESIA TERKAIT TATA KELOLA TI

## 1.1 PP 71/2019 — Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE)

**Relevansi: 5/5**

| Item | Detail |
|---|---|
| **Nama** | Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik |
| **Tahun** | 2019 (Ditetapkan 4 Okt 2019; Diundangkan 10 Okt 2019) |
| **Status** | Berlaku — Mencabut PP 82/2012 |
| **Rujukan** | LN 2019/185, TLN 6400, 57 halaman |
| **URL** | https://peraturan.bpk.go.id/Details/122030/pp-no-71-tahun-2019 |

### Pasal Kunci — Pasal 22 (REKAM JEJAK AUDIT)

Landasan hukum paling langsung untuk judul skripsi ("Traceability Evidensi Audit"):

> **Pasal 22**
> (1) **Penyelenggara Sistem Elektronik wajib menyediakan rekam jejak audit terhadap seluruh kegiatan penyelenggaraan Sistem Elektronik.**
> (2) Rekam jejak audit sebagaimana dimaksud pada ayat (1) digunakan untuk keperluan **pengawasan, penegakan hukum, penyelesaian sengketa, verifikasi, pengujian, dan pemeriksaan lainnya.**

**Penjelasan Pasal 22 ayat (1)** — mekanisme *audit trail* mencakup:
- a. memelihara **log transaksi** sesuai kebijakan retensi data penyelenggara;
- b. memberikan notifikasi kepada konsumen apabila transaksi berhasil;
- c. memastikan tersedianya **fungsi jejak audit untuk mendeteksi penyusupan** yang harus direviu/dievaluasi secara berkala;
- d. dalam hal sistem pemrosesan dan jejak audit merupakan **tanggung jawab pihak ketiga**, proses tersebut harus sesuai **standar yang ditetapkan** oleh Penyelenggara Sistem Elektronik.

### Pasal pendukung
- **Pasal 4–5**: Penyelenggara Sistem Elektronik **harus menyelenggarakan Sistem Elektronik secara andal dan aman serta bertanggung jawab**.
- **Pasal 100**: Sanksi administratif (teguran tertulis, denda administratif, penghentian sementara, pemutusan akses).

### Cara pemakaian di skripsi

> *"Pasal 22 PP 71/2019 mewajibkan penyelenggara sistem elektronik menyediakan rekam jejak audit terhadap seluruh kegiatan. Namun regulasi ini hanya outcome-oriented (wajib memiliki jejak audit) dan tidak menyediakan instrumen baku untuk mengukur serta memverifikasi mutu jejak audit tersebut. Kondisi ini menimbulkan kesenjangan implementasi yang memerlukan sistem pengukuran berbasis capability level dengan pelacakan bukti audit."*

---

## 1.2 Perpres 95/2018 — Sistem Pemerintahan Berbasis Elektronik (SPBE)

**Relevansi: 5/5**

| Item | Detail |
|---|---|
| **Nama** | Peraturan Presiden Nomor 95 Tahun 2018 tentang Sistem Pemerintahan Berbasis Elektronik |
| **Tahun** | 2018 (Ditetapkan 2 Okt 2018; Diundangkan 5 Okt 2018) |
| **Rujukan** | LN 2018/182, 110 halaman |
| **URL** | https://peraturan.bpk.go.id/Details/96913/perpres-no-95- |

### Pasal kunci

- **Pasal 1 angka 2** — Definisi Tata Kelola SPBE:
  > *"Tata Kelola SPBE adalah **kerangka kerja yang memastikan terlaksananya pengaturan, pengarahan, dan pengendalian** dalam penerapan SPBE secara terpadu."*

  **Analogi kuat:** "Pengaturan, pengarahan, pengendalian" identik secara struktural dengan **EDM — Evaluate, Direct and Monitor** pada COBIT 2019.

- **Pasal 3** — Ruang lingkup: a. Tata Kelola SPBE; b. Manajemen SPBE; **c. Audit Teknologi Informasi dan Komunikasi**; d. Penyelenggara SPBE; e. Percepatan SPBE; f. Pemantauan dan evaluasi SPBE.
- **Pasal 4** — 10 unsur SPBE.
- **Pasal 55 ayat (5)** — Dasar hukum penerbitan Permenkominfo 16/2022 tentang Audit TIK.
- **Pasal 70** — Pemantauan dan Evaluasi SPBE.
- **Audit TIK** (Bagian Kedelapan) meliputi pemeriksaan: a. penerapan **tata kelola dan manajemen TIK**; b. fungsionalitas TIK; c. kinerja TIK; d. aspek TIK lainnya.

---

## 1.3 Permenkominfo 16/2022 — Kebijakan Umum Penyelenggaraan Audit TIK

**Relevansi: 5/5 — Paling relevan untuk skripsi**

| Item | Detail |
|---|---|
| **Nama** | Peraturan Menteri Komunikasi dan Informatika Nomor 16 Tahun 2022 tentang Kebijakan Umum Penyelenggaraan Audit Teknologi Informasi dan Komunikasi |
| **Tahun** | 2022 (Ditetapkan 27 Des 2022; Diundangkan 30 Des 2022) |
| **Rujukan** | Berita Negara RI Tahun 2022 Nomor 1374, 30 halaman |
| **Dasar hukum** | Pasal 55 ayat (5) Perpres 95/2018 |
| **URL** | https://peraturan.bpk.go.id/Details/255601/permenkominfo-no-16-tahun-2022 |

### Definisi Audit TIK (Pasal 1 angka 2)

> *"Audit TIK adalah **proses yang sistematis untuk memperoleh dan mengevaluasi bukti secara objektif** terhadap aset TIK dengan tujuan untuk **menetapkan tingkat kesesuaian antara TIK dengan kriteria dan/atau standar** yang telah ditetapkan."*

**"Bukti secara objektif"** + **"tingkat kesesuaian dengan kriteria/standar"** = persis traceability evidence + capability level assessment.

### 4 objek audit TIK:
1. **Audit TIK terhadap tata kelola TIK** — pemeriksaan atas kerangka kerja "pengaturan, pengarahan, dan pengendalian" = **struktur EDM COBIT 2019 dalam bahasa regulasi Indonesia**
2. **Audit TIK terhadap fungsionalitas TIK**
3. **Audit TIK terhadap manajemen TIK**
4. **Audit TIK terhadap Outcome TIK**

### Kriteria Audit (dari materi SPBE resmi):
> *"Berbagai peraturan perundang-undangan dan/atau **kebijakan, prosedur, dan instruksi kerja, serta standar dan praktik-praktik terbaik**, yang digunakan oleh Auditor TIK untuk melakukan **evaluasi dan pengujian atas pengendalian intern TIK, manajemen risiko TIK dan tata kelola TIK**."*

**Jembatan ke gap:** "Standar dan praktik-praktik terbaik" sengaja dibiarkan terbuka — tidak menetapkan framework mana. Inilah celah di mana COBIT 2019 + sistem pengukuran berbasis bukti masuk secara legit.

**Pelaporan:** Instansi Pusat & Pemerintah Daerah wajib menyampaikan laporan periodik penyelenggaraan Audit TIK kepada Menteri **paling sedikit 1 kali dalam 2 tahun**.

---

## 1.4 Apakah Evaluasi SPBE Mengikuti COBIT?

### Jawaban: **TIDAK.**

| Aspek | Faktanya |
|---|---|
| **Instrumen** | **PermenPANRB 59/2020** + **Pedoman MenPANRB 3/2024** |
| **Struktur** | **47 indikator** dalam 4 domain: Kebijakan, Tata Kelola, Manajemen, Layanan |
| **Skala** | **5 tingkat kematangan (1–5)**, masing-masing dengan "Kriteria Bukti Dukung" |
| **Apakah = COBIT?** | **TIDAK.** Tidak ada EDM/APO/BAI/DSS/MEA, tidak ada proses/objektif COBIT |
| **URL** | https://tauval.spbe.go.id/ (aplikasi evaluasi) |

### Bukti pendukung (Laporan SPBE Kabupaten Mamuju 2025)
```
Domain Kebijakan SPBE           1,40
  └ Kebijakan Internal Tata Kelola SPBE  1,40
Domain Tata Kelola SPBE         1,60
  ├ Perencanaan Strategis SPBE          1,50
  ├ Teknologi Informasi dan Komunikasi  1,25
  └ Penyelenggara SPBE                 2,50
Domain Manajemen SPBE           1,18
  ├ Penerapan Manajemen SPBE           1,25
  └ Audit TIK                          1,00  ← SELALU 1.00
Domain Layanan SPBE             4,07
```

**Observasi kritis:** "Audit TIK" sebagai SATU indikator tunggal di Level 1 — tidak pernah naik di berbagai laporan daerah (2024: 1,00; 2025: 1,00). Gap spesifik: tidak ada pemetaan kapabilitas di level proses seperti COBIT.

**Catatan penting:** Modul Tata Kelola SPBE 2024 mencantumkan asesor eksternal SPBE dengan kredensial "(ITIL, COBIT, TOGAF)" — COBIT-literate assessors dipakai dalam penilaian resmi SPBE, namun bahasa/indikator resminya tidak mengadopsi COBIT. **COBIT sudah de facto tapi belum de jure.**

---

## 1.5 Data Indeks SPBE Nasional (Terbaru)

| Tahun | Indeks SPBE Nasional | Predikat | Sumber |
|---|---|---|---|
| 2022 | 2,34 | Cukup | SPBE Summit 2024 |
| 2023 | 2,79 | Baik | SPBE Summit 2024 |
| **2024** | **3,12** (skala 5) | **Baik** | MenPANRB, 6 Jan 2025 |

**Detail Indeks SPBE 2024:**
- Dilaksanakan terhadap **615 instansi pusat dan pemerintah daerah**
- **48 instansi** meraih predikat Memuaskan
- Melampaui target RPJMN 2020–2024 (2,60)
- Formalized: **Keputusan Menteri PANRB No. 663/2024**
- 34 perguruan tinggi sebagai asesor eksternal

**Data pembanding internasional:**

| Indikator | 2020 | 2022 | 2024 |
|---|---|---|---|
| UN E-Government Development Index (EGDI) | Peringkat 88 | Peringkat 77 | **Peringkat 64 / 193** |
| GovTech Maturity Index Indonesia | B | **A** | — |

**Transisi penting:** Mulai 2025, Indeks SPBE bertransformasi menjadi **Indeks Pemerintah Digital (Indeks Pemdi)**. Ditambah **Perpres 82/2023** tentang Percepatan Transformasi Digital & Keterpaduan Layanan Digital Nasional + pembentukan **GovTech Indonesia**.

**URL:**
- https://megapolitan.antaranews.com/berita/334138/menteri-panrb-sebut-indeks-spbe-nasional-2024-berpredikat-baik
- https://www.menpan.go.id/site/berita-terkini/indeks-spbe-nasional-meningkat-menteri-rini-penguatan-integrasi-pelayanan-publik-berbasis-digital

---

## 1.6 Regulasi OJK — Sektor Keuangan

### 1.6.1 POJK 11/POJK.03/2022 — Penyelenggaraan TI oleh Bank Umum

**Relevansi: 5/5**

| Item | Detail |
|---|---|
| **Nama** | POJK Nomor 11/POJK.03/2022 tentang Penyelenggaraan Teknologi Informasi Oleh Bank Umum |
| **Tahun** | 2022 (Ditetapkan 6 Jul 2022; Diundangkan 7 Jul 2022) |
| **Status** | Mencabut POJK 38/POJK.03/2016 & POJK 13/POJK.03/2020 |
| **URL** | https://peraturan.bpk.go.id/Details/227376/ |

**POJK 11/2022 mengadopsi Design Factors COBIT 2019 secara implisit:**

> *"Banks are required to apply good IT governance in their IT implementation by weighing the following factors at the very minimum:"*
> a. strategy and business objectives of the Bank;
> b. the size and complexity of the Bank's business;
> c. the role of IT for the Bank;
> d. IT resources procurement method;
> e. IT-related risks and issues;
> f. implementation of IT governance is in line with the Bank's needs and characteristics

**Perbandingan dengan COBIT 2019 Design Factors:**

| POJK 11/2022 | COBIT 2019 Design Factor |
|---|---|
| (a) strategy & business objectives | **Enterprise Strategy** & **Enterprise Goals** |
| (b) size & complexity of business | Enterprise Strategy |
| (c) role of IT for the Bank | **Enterprise Strategy** (IT role) |
| (d) IT resources procurement method | **Resource Optimization** (EDM04/APO07) |
| (e) IT-related risks and issues | **Risk Profile** + **IT-related Issues** |
| (f) alignment with needs/characteristics | Prinsip **Tailored to Enterprise Needs** |

OJK **tidak menyebut COBIT**, tetapi secara substansi mereplikasi Design Factors COBIT 2019. **COBIT adalah "missing normative link".**

**Kewajiban lain:**
- **Pasal 54**: Audit intern TI **paling sedikit 1 kali dalam 1 tahun**.
- **Pasal 55**: Wajib memiliki pedoman audit intern & pedoman manajemen risiko TI.
- **Pasal 28**: Manajemen risiko TI terintegrasi.

### 1.6.2 POJK 38/POJK.03/2016 — Manajemen Risiko Penggunaan TI oleh Bank Umum

**Relevansi: 4/5**

| Item | Detail |
|---|---|
| **Tahun** | 2016 |
| **Status** | Tetap berlaku sepanjang tidak bertentangan dengan POJK 11/2022 |
| **URL** | https://ojk.go.id/id/kanal/perbankan/regulasi/peraturan-ojk/Documents/Pages/POJK-tentang-Penerapan-Manajemen-Resiko-dalam-Penggunaan-Teknologi-Informasi-Oleh-Bank-Umum/POJK%20MRTI.pdf |

Penjelasan secara eksplisit menyebut "information technology governance":
> *"Dalam rangka meningkatkan efisiensi kegiatan operasional dan berbagai risiko maka Bank perlu menerapkan **tata kelola teknologi informasi (information technology governance)**."*

### 1.6.3 SEOJK 21/SEOJK.03/2017 — Pedoman Penerapan Manajemen Risiko TI

**Relevansi: 4/5**

Definisi **Standar**:
> *"Standar adalah seperangkat aturan teknis yang harus dipatuhi organisasi dalam rangka menerapkan suatu **kerangka kerja dan tata kelola TI** (dapat berasal dari intern atau ekstern). Standar ... **International Organization for Standardization (ISO)** dan **Standar Nasional Indonesia (SNI)**."*

OJK menyatakan standar eksternal yang diakui adalah **ISO & SNI — TIDAK menyebut COBIT**. Peluang legitimasi COBIT 2019: standar de-facto yang belum masuk daftar rujukan eksplisit.

### 1.6.4 POJK Lainnya

| Regulasi | Tahun | Isi Pokok |
|---|---|---|
| **POJK 17/2023** Tata Kelola Bank Umum | 2023 | Integritas pelaporan dan sistem TI; good corporate governance |
| **POJK 21/2023** Layanan Digital Bank Umum | 2023 | Persyaratan infrastruktur TI & pengelolaan |
| **POJK 30/2025** Tata Kelola & Manajemen Risiko ITSK | 2025 | Tindak lanjut temuan audit; berlaku 1 Jul 2026 |
| **POJK 34/2025** Penyelenggaraan TI oleh BPR & BPRS | 2025 | Menggantikan POJK 75/POJK.03/2016 |

---

## 1.7 Regulasi Bank Indonesia

### 1.7.1 PBI 2/2024 — Keamanan Sistem Informasi & Ketahanan Siber (KKS)

**Relevansi: 4/5**

| Item | Detail |
|---|---|
| **Nama** | PBI Nomor 2 Tahun 2024 tentang Keamanan Sistem Informasi dan Ketahanan Siber |
| **Tahun** | 2024 (berlaku sejak 22 April 2024) |
| **URL** | https://kadin.id/analisa/semua-pihak-yang-diawasi-oleh-bi-kini-wajib-menerapkan-tata-kelola-dan-upaya-keamanan-siber |

5 Aspek: tata kelola, pencegahan, penanganan, pengawasan, kolaborasi.

### 1.7.2 PBI 22/23/PBI/2020 — Sistem Pembayaran

**Relevansi: 4/5**

**Pasal 31 ayat (2)** — 5 aspek wajib PJP: tata kelola; manajemen risiko; standar keamanan sistem informasi; interkoneksi; pemenuhan regulasi.

**Pasal 32** — Prinsip tata kelola: keterbukaan, akuntabilitas, tanggung jawab, independensi, kewajaran. Termasuk **pelaksanaan fungsi audit secara berkala**.

---

## 1.8 Regulasi Lainnya yang Relevan

| Regulasi | Tahun | Isi Pokok | Relevansi |
|---|---|---|---|
| **Permenkominfo 5/2020** | 2020 | Penyelenggara Sistem Elektronik Lingkup Privat | 4/5 |
| **Permen BSSN 4/2021** | 2021 | Pedoman Manajemen Keamanan Informasi SPBE | 4/5 |
| **Peraturan BRIN 1/2024** | 2024 | Standar Audit Infrastruktur dan Audit Aplikasi SPBE | 5/5 |
| **Perpres 82/2023** | 2023 | Percepatan Transformasi Digital; GovTech Indonesia | 5/5 |
| **PP 60/2008** | 2008 | Sistem Pengendalian Intern Pemerintah (SPIP) | 4/5 |
| **UU 11/2008 jo. UU 19/2016** | 2008/2016 | Informasi & Transaksi Elektronik — payung PP 71/2019 | 4/5 |
| **UU 27/2022 (PDP)** | 2022 | Pelindungan Data Pribadi | 3/5 |

---

# BAGIAN 2 — DATA ADOPSI COBIT DI INDONESIA

## 2.1 Jawaban Jujur: Tidak Ada Survei Nasional

| Yang Dicari | Status |
|---|---|
| Survei nasional "% organisasi Indonesia yang memakai COBIT" | **TIDAK ADA** |
| Data adopsi dari ISACA Indonesia Chapter | **TIDAK ADA** |
| Statistik resmi ISACA (global) tentang COBIT adoption | Tidak ditemukan laporan publik |

**Jangan kutip:**
- Angka "86" dari "Knowledge Map of Audit Tata Kelola TI (2024)" — sumber primer tidak terverifikasi
- Klaim "95% perusahaan" dari Inixindo — tidak terverifikasi pada dokumen ISACA asli

**Gunakan proxy berbasis publikasi ilmiah** yang dapat diverifikasi (Bagian 2.2).

---

## 2.2 Proxy Adopsi Terverifikasi (Publikasi Ilmiah)

### 2.2.1 Intan, Setiawan & Maengkom (2023) — SLR Khusus Indonesia

> **Intan, A., Setiawan, A., & Maengkom, M. R. (2023). Studi Literatur terhadap Peran dan Manfaat COBIT 2019 dalam Tata Kelola Teknologi Informasi di Indonesia. *Innovative: Journal of Social Science Research*, 3(5), 1681–1692.**

Referensi utama untuk poin "peran dan manfaat COBIT 2019 di Indonesia". Studi literatur yang fokus khusus COBIT 2019 dalam konteks Indonesia.

### 2.2.2 Sebatik SLR (2025) — Distribusi Versi COBIT

> **"Analysis of Information Technology Governance Implementation in Consulting Firms Using the COBIT Framework Approach: A Literature Review"**, *Sebatik*, 2025. DOI: https://doi.org/10.46984/sebatik.v27i2.2336

**Distribusi framework dalam literatur Indonesia:**

| Versi COBIT | Jumlah studi |
|---|---|
| COBIT 4.1 | 1 |
| COBIT 5 | 4 |
| **COBIT 2019** | **9** |

> *"COBIT 2019 merupakan versi yang **paling umum digunakan** dibandingkan dengan versi lainnya."*

Proses paling banyak diteliti: **APO12 (Managed Risk)** — 5 artikel.

### 2.2.3 Antariksa, Perangin Angin & Widodo (2025) — SLR COBIT 2019 Lintas Sektor

> **Antariksa, M. D. S., Perangin Angin, M., & Widodo, A. P. (2025). COBIT 2019 Framework in IT Governance: A Systematic Literature Review of Implementation Challenges and Benefits Across Various Industry Sectors. *JREECE*, 5(1), 99–105. DOI: 10.29103/jreece.v5i1.19501**

SLR yang otoritatif untuk justifikasi metodologi. Menguji challenges & benefits COBIT 2019 lintas sektor.

---

## 2.3 Studi Kasus COBIT di BUMN

### 2.3.1 PT Telkom Indonesia — Transisi COBIT 4.1 ke COBIT 2019

> **Sari, R. K., Ginardi, R. V. H., & Indrawanti, A. S. (2023). Perancangan Tata Kelola TI Berbasis COBIT 2019: Studi Kasus di Divisi IT PT Telkom Indonesia. *Jurnal Teknik ITS*, 12(1). DOI: 10.12962/j23373539.v12i1.100436**

PT Telkom masih berbasis COBIT 4.1, perlu transisi ke COBIT 2019. Hasil: domain BAI dan DSS sebagian besar pada Level 4.

### 2.3.2 PT Telkom Akses — COBIT + ISO 27001 + ISO 20000-1

> **Akbar, H., & Saputra, R. (2023). Evaluasi Kinerja Tata Kelola TI Terhadap Tools Internal Framework COBIT 2019. *Sebatik*, 27(2). DOI: 10.46984/sebatik.v27i2.2336**

PT Telkom Akses mengintegrasikan COBIT dengan ISO 27001 dan ISO 20000-1. Capability Level 3.

### 2.3.3 PT Kereta Commuter Indonesia — Evaluasi Periodik

> **Comparison of IT Governance Maturity Levels Based on COBIT 2019 at PT KCI in 2023 and 2024. *JUTIF*, 14(2), 162–170. DOI: 10.21456/vol14iss2pp162-170**

2023: mayoritas domain Level 2 (Managed). 2024: peningkatan signifikan. Rekomendasi: *"continuous measurement is needed in the form of a periodic evaluation cycle based on the COBIT 2019 framework."*

### 2.3.4 BUMN Lainnya

| Perusahaan | Studi | DOI |
|---|---|---|
| PT Krakatau Steel | Nugroho & Ginardi (2024). *JIST*, 5(8), 3721–3733 | 10.59141/jist.v5i8.1198 |
| PT Telkom Regional VI Kalimantan | Belo, Wiranti & Atrinawati (2020). *JUSIKOM PRIMA*, 4(1) | 10.34012/jusikom.v4i1.1202 |

---

## 2.4 Studi Kasus COBIT di Sektor Pemerintah

### 2.4.1 Sekretariat Kabinet — Data Gap Paling Kuat

> **Afrianda, G. O., Wirani, Y., & Sucahyo, Y. G. (2024). Evaluation of IT Governance Capability and Design Using COBIT 2019: Cabinet Secretariat. *The Indonesian Journal of Computer Science*, 13(4), 205–215. DOI: 10.33022/ijcs.v13i4.4145**

**13 dari 15 proses berada pada Level 0 (Incomplete)** dengan target Level 3.

Kesenjangan kapabilitas masif pada instansi pemerintah tertinggi yang sudah wajib comply SPBE.

### 2.4.2 Irzavika & Mahda (2024) — Paper Paling Dekat dengan Skripsi

> **Irzavika, N., & Mahda, F. R. (2024). Capability Level of SPBE Application and Infrastructure Audit Tools Using COBIT 2019. *ICIMCIS*, IEEE, pp. 692–696. DOI: 10.1109/ICIMCIS63449.2024.10957022**

Paper ini menilai kapabilitas **alat audit SPBE** menggunakan COBIT 2019.

**Positioning pembeda:**
- Irzavika & Mahda (2024) → mengukur kapabilitas **alat audit SPBE** (tools)
- Skripsi ini → mengukur kapabilitas **proses tata kelola** (COBIT processes) dengan **traceability evidence**

### 2.4.3 Instansi Pemerintah Lainnya

| Instansi | Paper | Temuan |
|---|---|---|
| Dinas Kominfo Sulawesi Utara | *CESS*, 9(2). DOI: 10.24114/cess.v9i2.60904 | Prioritas: APO12, DSS01, DSS05 |
| Diskominfo Kota Jambi | Widasari & Oktadini (2025). *JAIC*, 9(6) | SPBE assessments macro-level, no process-level capability map |
| Kementerian Dalam Negeri RI | Lusinta et al. (2024). *ICIMCIS* | Evaluation COBIT 2019 |
| Poltekkes Kemenkes Surabaya | *JSIBC*, 19(1), 2026 | Rata-rata Level 1 |

### 2.4.4 Sektor Pendidikan

| Instansi | Paper |
|---|---|
| Universitas Sebelas Maret | Setyawan et al. (2025). *JISI*, 7(3). DOI: 10.51519/journalisi.v7i3.1200 |
| IPB Fakultas Teknik | Windasari et al. (2022). *JPTIS* |
| Perguruan Tinggi Harapan Maju | Fitri & Hartono (2023). *ABIS*, 11(3). DOI: 10.22146/abis.v11i3.86440 |

---

# BAGIAN 3 — PAPER AKADEMIK TAMBAHAN

## Tier 1 — Prioritas Tinggi

| # | Paper | Alasan |
|---|---|---|
| 1 | **Afrianda, Wirani & Sucahyo (2024)** — *IJCS* 13(4). DOI: 10.33022/ijcs.v13i4.4145 | Studi pemerintah paling otoritatif; data gap dahsyat |
| 2 | **Irzavika & Mahda (2024)** — *ICIMCIS*, IEEE. DOI: 10.1109/ICIMCIS63449.2024.10957022 | Positioning paling dekat dengan skripsi |
| 3 | **Antariksa, Perangin Angin & Widodo (2025)** — *JREECE* 5(1). DOI: 10.29103/jreece.v5i1.19501 | SLR COBIT 2019 — justifikasi metodologi |
| 4 | **Intan, Setiawan & Maengkom (2023)** — *Innovative JSSR* 3(5), 1681–1692 | SLR khusus konteks Indonesia |
| 5 | **Sari, Ginardi & Indrawanti (2023)** — *J. Tek. ITS* 12(1). DOI: 10.12962/j23373539.v12i1.100436 | BUMN Telkom — transisi COBIT 4.1→2019 |
| 6 | **Akbar & Saputra (2023)** — *Sebatik* 27(2). DOI: 10.46984/sebatik.v27i2.2336 | BUMN Telkom Akses — COBIT + ISO 27001 |
| 7 | **Widasari & Oktadini (2025)** — *JAIC* 9(6), 3706–3715 | Kritik eksplisit keterbatasan evaluasi SPBE |

## Tier 2 — Pendukung

| Paper | Catatan |
|---|---|
| Rusman, Nadlifatin & Subriadi (2022). *SinkrOn* 7(3). DOI: 10.33395/sinkron.v7i3.11476 | Literature Review: COBIT and ITIL |
| Mariatama, Atrinawati & Putra (2022). *JSI/SIMIKA* 5(1), 19–29 | PT JWT Global Logistics |
| Febriyani, Hendrawan & Kusumasari (2023). *ICIC* IEEE. DOI: 10.1109/ICIC60109.2023.10382082 | COBIT 2019 in Higher Education Indonesia |
| Suryawan & Veronica (2020). *TSSA* IEEE. DOI: 10.1109/TSSA51342.2020.9310875 | ITIL + COBIT 2019 + ISO 27001 roadmap |

---

# BAGIAN 4 — ALUR LOGIKA UNTUK INTEGRASI KE LATAR BELAKANG

```
[1] REGULASI MEMBENTUK KEWAJIBAN TATA KELOLA TI
    ├── PP 71/2019 Pasal 22 → WAJIB rekam jejak audit (OUTCOME, tanpa instrumen)
    ├── Perpres 95/2018 Pasal 3 & 4 → WAJIB Tata Kelola SPBE ("atur, arah, kendali" = EDM)
    └── Permenkominfo 16/2022 → WAJIB "proses sistematis memperoleh & mengevaluasi BUKTI"
         dengan KRITERIA = "standar & praktik-praktik terbaik" [TERBUKA]
                    ↓
[2] TAPI INSTRUMEN PENGUKURANNYA TIDAK DIATUR
    ├── SPBE (PermenPANRB 59/2020 + Pedoman MenPANRB 3/2024):
    │   └── 47 indikator, 5 level maturity, TIDAK berbasis COBIT,
    │       "Audit TIK" = SATU indikator, selalu Level 1
    │   → CAPABILITY MAP TIDAK ADA di level proses
    ├── OJK & BI: WAJIB audit TI berkala & IT governance,
    │   TETAPI rujukan standar = "ISO dan SNI", BUKAN COBIT
    │   (padahal POJK 11/2022 Design Factors ≈ COBIT Design Factors!)
    └── Bukti empiris: 13/15 proses Level 0 di Sekretariat Kabinet
                    ↓
[3] COBIT 2019 ADALAH JEMBATAN YANG SUDAH DIADOPSI DE FACTO
    ├── Diadopsi voluntary oleh BUMN (Telkom, Telkom Akses, KCI)
    ├── 9 dari 14 studi Indonesia memakai COBIT 2019 (versi terpopuler)
    ├── COBIT-trained assessors dipakai sebagai Asesor Eksternal SPBE
    └── TAPI belum pernah diintegrasikan dengan traceability evidence
                    ↓
[4] GAP PENELITIAN (POSITIONING SKRIPSI)
    └── Belum ada sistem BERBASIS WEB yang mengukur capability level
        COBIT 2019 secara transparan dengan TRACEABILITY EVIDENCE
```

---

# BAGIAN 5 — CATATAN KEHATI-HATIAN

1. **Jangan** kutip angka "86" dari "Knowledge Map of Audit Tata Kelola TI (2024)" — sumber primer tidak terverifikasi.
2. **Jangan** kutip klaim "95% perusahaan" dari Inixindo — tidak terverifikasi pada dokumen ISACA asli.
3. **Jangan** klaim "COBIT digunakan oleh X% organisasi Indonesia" — data ini tidak ada.
4. **Gunakan** proxy berbasis publikasi ilmiah yang dapat diverifikasi.
5. **PP 71/2019 tanggal**: "Ditetapkan 4 Oktober 2019, diundangkan 10 Oktober 2019" (mengikuti JDIH BPK).
6. **PP 71/2019 Pasal 22** — sudah diverifikasi silang di 4 sumber independen (JDIH BPK, JDIH Kemenkeu, JDIH Komdigi, datahukum).
7. **Transisi Indeks SPBE → Indeks Pemerintah Digital (2025)** — sebut di bab kesimpulan/implikasi.

---

*Document generated: 2026-10-01*
*Based on: Librarian research session lib-1*
