# Proposal Tugas Akhir (Metopen) — Draf Isi

> **Judul (ID):** Rancang Bangun Sistem Pengukuran *Capability Level* COBIT 2019 Berbasis Web dengan *Traceability* Evidensi Audit
> **Judul (EN):** *Design and Development of a Web-Based COBIT 2019 Capability Level Assessment System with Audit Evidence Traceability*
>
> **Catatan:** Ini adalah **draf isi dalam format Markdown**, bukan berkas `.docx`. Ditujukan untuk disalin ke `Template Metopen Draft.docx`. Seluruh pernyataan teknis konsisten dengan `06-deep-research-research-gap.md` (Theory/fakta terverifikasi 2026-10-13). Sitasi dalam teks memakai gaya **Harvard** (mengikuti Bab 1 draf yang sudah ada); **Daftar Pustaka** disajikan bergaya **IEEE** sesuai ketentuan template — lihat catatan di akhir.
>
> **Status label** (`06` §2.2): `[VER-P]` terverifikasi primer · `[VER-S]` sekunder · `[2ND-UNV]` belum terverifikasi · `[NF]` tidak ditemukan (bukan berarti tidak ada).

---

## BAB 1 PENDAHULUAN

### 1.1 Latar Belakang

Teknologi Informasi (TI) kini menjadi tulang punggung operasional, layanan, dan pengambilan keputusan organisasi. Karena itu, pemanfaatan TI perlu dikelola melalui tata kelola yang memastikan manfaat investasi tercapai, risiko terkendali, dan sumber daya digunakan secara bertanggung jawab (ISACA, 2019). Meningkatnya penggunaan aplikasi, data, layanan awan, dan tuntutan kepatuhan membuat evaluasi tata kelola TI yang sistematis serta didukung bukti yang dapat diperiksa kembali menjadi semakin penting.

COBIT 2019 adalah salah satu kerangka kerja yang digunakan untuk mengevaluasi tata kelola dan manajemen TI. Kerangka ini mencakup 40 *Governance and Management Objectives* dalam lima domain dan menyediakan *Design Factors* untuk membantu organisasi menentukan objektif yang relevan (ISACA, 2019). Pengukuran tingkat pencapaian menggunakan *COBIT Performance Management* (CPM) pada skala *capability* 0–5, dengan predikat *Not Achieved* (N), *Partially Achieved* (P), *Largely Achieved* (L), dan *Fully Achieved* (F) berdasarkan persentase pencapaian aktivitas (ISACA, 2019). Penilaian ini seharusnya bersandar pada pemeriksaan aktivitas dan bukti pendukung, bukan semata persepsi responden.

Namun, COBIT 2019 memiliki keterbatasan instrumen yang mendasar. ISACA tidak menerbitkan *Process Assessment Model* (PAM) resmi untuk COBIT 2019, berbeda dengan COBIT 5 yang berbasis ISO/IEC 33000 (ISACA, 2018; ISACA Journal, 2021). Skema CPM pada COBIT 2019 berbasis CMMI dan tidak menyediakan model penilaian proses tersendiri. Artefak digital resmi yang tersedia, seperti *Design Guide Tool Kit*, berfokus pada prioritisasi desain objektif dan tidak menghitung *capability level*. Yang lebih penting, ISACA **tidak menetapkan formula agregasi wajib** untuk menggulung nilai aktivitas menjadi *capability level* sebuah objektif; artikel ISACA Journal sekadar *mengusulkan* rata-rata sederhana atau rata-rata berbobot sebagai praktik yang dapat dipilih organisasi (Gorgona, 2021). Akibatnya, organisasi dan peneliti harus menetapkan sendiri aturan agregasi tersebut, dan aturan itu perlu dinyatakan secara eksplisit agar hasilnya transparan dan dapat dipertanggungjawabkan.

Keterbatasan berikutnya menyangkut evidensi. CPM mensyaratkan *traceability* antara bukti objektif yang dikumpulkan dan rating aktivitas yang diberikan (ISACA, 2019). Di lapangan, bukti audit tersebar dalam dokumen kebijakan, prosedur, log, notulen wawancara, maupun tangkapan layar, dengan repositori dan format yang berbeda serta istilah organisasi yang belum tentu sama dengan aktivitas COBIT. Kondisi ini menyulitkan assessor ketika memetakan bukti, menetapkan rating, dan meninjau ulang dasar penilaian. Padahal, standar audit menuntut dokumentasi yang memungkinkan auditor kompeten mengulangi pekerjaan dan memperoleh kesimpulan serupa (IIA, 2024), serta bukti yang cukup dan sesuai untuk mendukung kesimpulan (ISACA, 2020). Tanpa keterhubungan yang jelas antara aktivitas, rating, dan bukti, hasil assessment berisiko kurang transparan dan sulit diverifikasi pihak lain.

Persoalan berikutnya adalah bahwa assessment bukan kalkulasi sekali jalan, melainkan sebuah artefak informasi yang memiliki siklus hidup. Organisasi umumnya menilai ulang tata kelola TI pada periode berikutnya atau pada unit yang berbeda, sehingga pertanyaan yang muncul adalah bagaimana membandingkan capaian antar-periode atau antar-unit, apa yang dinilai sebelumnya dan atas dasar bukti apa, serta bagaimana hasilnya dilaporkan kepada manajemen dalam bahasa yang mudah dipahami. ISACA Journal menegaskan bahwa model kematangan seharusnya bermuara pada alat yang mampu menghasilkan pelaporan yang dapat dipahami manajemen puncak (Gorgona, 2021). Fungsi manajemen assessment ini belum menjadi perhatian utama pada alat bantu yang ada.

Alat bantu yang tersedia saat ini belum sepenuhnya menjawab kebutuhan tersebut. Perangkat GRC komersial umumnya menyediakan pemetaan konten kontrol dan objektif, bukan instrumen penilaian yang menghitung *capability level* secara berjenjang. Prototipe akademik yang ada telah memindahkan sebagian proses berbasis lembar kerja ke web, namun beberapa di antaranya belum memaparkan aturan *scoring* secara dapat diinspeksi di dalam aplikasi, belum menyediakan manajemen evidensi yang menghubungkan rating dengan dokumen bukti, dan belum mendukung pengelolaan assessment lintas waktu (Noor, 2021; Mandiangan, 2023; Anwar dan Harits, 2025). Karena itu, masih terbuka ruang untuk sebuah sistem yang membuat perhitungan CPM **eksplisit dan dapat diperiksa**, menghubungkan setiap rating ke evidensi audit, dan mengelola assessment sebagai artefak yang dapat dibandingkan antar-periode.

Penelitian ini merespons keterbatasan tersebut dengan merancang dan membangun sistem pengukuran *Capability Level* COBIT 2019 berbasis web. Sistem membantu assessor menentukan prioritas objektif melalui *Design Factor* DF1 sampai DF4, mencatat rating CPM, menghitung *capability level* melalui aturan agregasi yang dinyatakan terbuka dan dapat dikonfigurasi, menganalisis kesenjangan terhadap target, menghubungkan rating dengan evidensi pendukung, serta membandingkan hasil antar-periode melalui *snapshot*. Sistem berfungsi sebagai alat bantu dokumentasi dan pengambilan keputusan; penilaian akhir tetap menjadi tanggung jawab assessor, dan aturan agregasi yang dipakai merupakan **adaptasi operasional yang dinyatakan eksplisit**, bukan standar resmi ISACA. Penelitian menggunakan *Design Science Research Methodology* (DSRM) karena menghasilkan artefak sistem informasi (Peffers et al., 2007), dan dievaluasi melalui pengujian fungsional *black-box*, validasi terhadap perhitungan referensi independen, *expert review* sebagai pengujian validitas instrumen, serta *System Usability Scale* (SUS) dalam kerangka FEDS (Hevner et al., 2004; Venable et al., 2016).

Sebagai konteks, bukan justifikasi, kebutuhan tersebut bersinggungan dengan kewajiban regulasi di Indonesia. Pasal 22 ayat (1) PP Nomor 71 Tahun 2019 mewajibkan penyelenggara sistem elektronik menyediakan rekam jejak audit, sedangkan Permenkominfo Nomor 16 Tahun 2022 mendefinisikan Audit TIK sebagai proses sistematis untuk memperoleh dan mengevaluasi bukti secara objektif terhadap kriteria dan/atau standar yang telah ditetapkan. Kedua ketentuan ini menegaskan pentingnya rekam jejak dan bukti, tetapi **tidak menyediakan instrumen pengukurannya** dan **tidak mewajibkan COBIT**. Evaluasi kinerja pemerintahan digital saat ini menggunakan instrumen PermenPANRB dengan indikator dan skala kematangannya sendiri (PermenPANRB Nomor 8 Tahun 2026, yang menggantikan PermenPANRB Nomor 59 Tahun 2020), sehingga COBIT 2019 diposisikan sebagai pelengkap *self-assessment* yang bersifat sukarela dan lebih mendalam, bukan sebagai kewajiban regulasi.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang tersebut, rumusan masalah penelitian adalah sebagai berikut:

1. Bagaimana merancang dan membangun sistem berbasis web untuk membantu penentuan prioritas objektif serta pengukuran *Capability Level* COBIT 2019 secara transparan?
2. Bagaimana menerapkan rating CPM N/P/L/F dan aturan agregasi *capability level* yang eksplisit dan dapat diperiksa pada sistem agar hasil penilaian terdokumentasi dengan jelas?
3. Bagaimana mengintegrasikan evidensi audit agar setiap rating aktivitas dapat ditelusuri ke bukti pendukungnya, serta bagaimana validitas perhitungan CPM, keterlacakan, dan *usability* sistem dinilai melalui pengujian *black-box*, validasi terhadap perhitungan referensi independen, *expert review*, dan SUS?

### 1.3 Tujuan Penelitian

Tujuan penelitian ini adalah sebagai berikut:

1. Merancang dan membangun sistem berbasis web untuk menentukan prioritas objektif COBIT 2019 dan mengukur *Capability Level*.
2. Menerapkan rating CPM N/P/L/F serta aturan agregasi *capability level* yang eksplisit dan dapat diubah pada sistem.
3. Mengembangkan keterlacakan antara rating aktivitas dan evidensi audit, serta mengevaluasi validitas perhitungan, fungsionalitas, keterlacakan, dan *usability* sistem.

### 1.4 Batasan Masalah

Untuk menjaga fokus penelitian, batasan yang ditetapkan adalah sebagai berikut:

1. Penelitian berfokus pada rancang bangun sistem assessment tata kelola dan manajemen TI berbasis COBIT 2019.
2. Penentuan prioritas objektif dibatasi pada *Design Factor* DF1 *Enterprise Strategy*, DF2 *Enterprise Goals*, DF3 *Risk Profile*, dan DF4 *I&T-Related Issues*; DF5–DF11 berada di luar cakupan.
3. Objektif dan aktivitas COBIT yang diterapkan berupa subset sesuai kebutuhan penelitian dan konten yang dapat digunakan secara sah; sistem tidak mengimplementasikan seluruh 40 objektif dan 1.202 aktivitas COBIT 2019.
4. Aturan agregasi CPM yang digunakan adalah **adaptasi operasional** dari skala *capability* COBIT 2019 dengan ambang N/P/L/F ISO/IEC 33020:2019 §5.3. Karena ISACA tidak menetapkan formula agregasi resmi, sistem menyediakan beberapa aturan *gate* yang dapat dipilih dan menampilkan aturan yang sedang aktif; sistem tidak diklaim sebagai standar resmi ISACA atau PAM resmi.
5. Evidensi berupa metadata dan dokumen yang dipetakan secara manual oleh assessor. Sistem tidak memverifikasi kebenaran bukti atau menentukan rating akhir secara otomatis.
6. Sistem dikembangkan sebagai aplikasi web sisi klien (React dan TypeScript) dengan persistensi *localStorage* pada satu peramban; integrasi repositori eksternal, data organisasi nyata, dan arsitektur multi-tenant tidak dibahas.
7. Fitur AI, bila digunakan, hanya membantu penyusunan draf rekomendasi dan tidak menentukan keputusan assessment.

### 1.5 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini adalah sebagai berikut:

1. Bagi assessor atau auditor TI, sistem membantu pencatatan rating, pengelolaan evidensi, perhitungan *Capability Level* yang transparan, dan penelusuran dasar penilaian.
2. Bagi organisasi, sistem menyediakan informasi *capability level*, kesenjangan terhadap target, dan bukti pendukung untuk perencanaan perbaikan tata kelola TI, serta riwayat capaian antar-periode.
3. Bagi akademisi dan peneliti selanjutnya, penelitian ini menjadi referensi penerapan CPM COBIT 2019 berbasis web, khususnya pada transparansi aturan *scoring*, *traceability* evidensi, dan pengelolaan assessment lintas waktu.

### 1.6 Sistematika Laporan

Sistematika laporan penelitian disusun sebagai berikut:

1. **BAB I PENDAHULUAN** membahas latar belakang, rumusan masalah, tujuan, batasan, manfaat, dan sistematika laporan.
2. **BAB II KAJIAN PUSTAKA** membahas teori dan penelitian terdahulu terkait tata kelola TI, COBIT 2019, CPM, *capability level*, evidensi audit, *traceability*, DSRM, dan pengujian sistem.
3. **BAB III METODOLOGI PENELITIAN** menjelaskan tahapan DSRM, pengumpulan data, analisis kebutuhan, perancangan sistem, rancangan *scoring* dan evidensi, serta metode evaluasi.
4. **BAB IV SIMPULAN** menyajikan simpulan singkat atas perancangan dan rencana penelitian.

---

## BAB 2 KAJIAN PUSTAKA

### 2.1 Kajian Penelitian Terkait

Penelitian terkait dapat dikelompokkan menjadi tiga: (i) artefak resmi ISACA, (ii) perkakas GRC/komersial, dan (iii) prototipe akademik. Tabel berikut merangkum posisi masing-masing terhadap kebutuhan penelitian.

**Tabel 2.1** Penelitian dan artefak terkait serta posisinya.

| Sumber | Tahun | COBIT | Metode / *scoring* | Evidensi | Pengelolaan assessment | Status |
|---|---|---|---|---|---|---|
| *Design Guide Tool Kit* (ISACA) | 2019/2020 | 2019 | Prioritisasi desain DF1–DF10; tanpa perhitungan 0–5; *single-assessment* | — | — | `[VER-P]` |
| *COBIT 2019 Tool Kit* (ISACA, gratis) | 2019 | 2019 | Materi referensi; bukan kalkulator | — | — | `[VER-P]` |
| Mandiangan | 2023 | 2019 | Skala Guttman + NPLF (dokumentasi di naskah, tidak tampak di alat) | Tidak ada | Tidak ada | `[VER-S]` — prior art terdekat |
| Abdullah, Putra & Kartika | 2023 | 2019 | SCRUM, Laravel; *scoring* tidak dijelaskan dalam abstrak | Tidak ada | Tidak ada | `[VER-S]` |
| Anwar & Harits | 2025 | 2019 | RAD; skor *capability* + grafik | Tidak ada | Tidak ada | `[VER-S]` |
| Noor | 2021 | 2019 (hanya BAI) | Prototyping; *capability assessment* | Tidak ada | Tidak ada | `[VER-S]` |
| Pamuji, Putra & Wahdiniwaty | 2022 | 2019 + ISO/IEC 15504-2 | Model assessment; *capability level* | Tidak ada | Tidak ada | `[VER-S]` |
| Kurniawan et al. | 2025 | **COBIT 5** | Sistem audit terintegrasi; **masih manual** | Tidak ada | Tidak ada | `[VER-S]` |
| Indrawati, Rozas & Wahyudi | 2023 | 2019 | R&D instrumen kematangan | Tidak ada | Tidak ada | `[VER-S]` |

Beberapa temuan penting:

1. **Instrumen resmi tidak ada.** ISACA tidak menyediakan PAM untuk COBIT 2019 dan artefak digital resminya (Design Guide Tool Kit) hanya untuk perancangan/prioritisasi, bukan pengukuran *capability* `[VER-P]`.
2. **Alat assessment berbasis web sudah ada.** Mandiangan (2023), Abdullah dkk. (2023), Anwar & Harits (2025), dan Noor (2021) telah membangun alat assessment COBIT 2019 berbasis web. Karena itu, penelitian ini **tidak** mengklaim "pertama"; kebaruan diletakkan pada fitur spesifik (lihat §2.3).
3. **Tidak ditemukan prototipe yang menghubungkan *scoring* dengan evidensi dan mengelola assessment lintas waktu** pada sumber yang disurvei pada 2026-10-13 `[VER-S]`. (Catatan: "tidak ditemukan" ≠ "tidak ada".)
4. **Cobvapps (UB)** tidak dapat diverifikasi pada sumber primer dan **dikeluarkan** dari pembahasan kebaruan `[NF]`.

### 2.2 Teori Dasar

#### 2.2.1 Tata Kelola dan Manajemen TI serta COBIT 2019

Tata kelola TI mengarahkan dan mengendalikan pemanfaatan TI agar sejalan dengan tujuan organisasi. COBIT 2019 menyediakan kerangka tata kelola dan manajemen TI dengan 40 *Governance and Management Objectives* dalam lima domain: *Evaluate, Direct and Monitor* (EDM), *Align, Plan and Organize* (APO), *Build, Acquire and Implement* (BAI), *Deliver, Service and Support* (DSS), dan *Monitor, Evaluate and Assess* (MEA). Kerangka ini memakai 11 *Design Factors* dan *Goals Cascade* untuk memilih objektif yang relevan bagi organisasi (ISACA, 2019).

#### 2.2.2 *Capability Level*, *COBIT Performance Management*, dan Skala N/P/L/F

COBIT 2019 memisahkan dua konstruk yang berbeda (ISACA, 2020):

- ***Capability level*** — per **proses/objektif**; seberapa baik sebuah proses diterapkan dan berjalan.
- ***Maturity level*** — per ***focus area***; dicapai bila seluruh *capability level* yang disyaratkan terpenuhi pada proses-proses dalam area tersebut.

Skala memiliki rentang 0–5. ISACA menyediakan enam karakteristik deskriptif level (figur 6.2 pada *Introduction and Methodology*). Predikat pencapaian memakai skala N/P/L/F dengan ambang persentase berikut, yang identik dengan ISO/IEC 33020:2019 §5.3:

- **Fully (F)** — pencapaian **> 85%**;
- **Largely (L)** — **> 50% s.d. ≤ 85%**;
- **Partially (P)** — **> 15% s.d. ≤ 50%**;
- **Not (N)** — **0% s.d. ≤ 15%**.

ISACA menegaskan bahwa penentuan predikat bersifat *judgment* yang harus disubstansiasi oleh pemeriksaan komponen enabler (aktivitas, tujuan proses, struktur organisasi), dan bahwa **traceability harus dijaga** antara bukti objektif yang dikumpulkan dengan rating aktivitas yang diberikan (Dhulipalla, 2019; ISACA, 2019).

#### 2.2.3 Ketiadaan PAM dan Formula Agregasi Resmi

COBIT 2019 tidak menerbitkan PAM dan tidak menetapkan formula agregasi wajib (ISACA, 2018; Gorgona, 2021). Terdapat tiga tafsir gerbang ketercapaian level yang saling bersaing:

1. **Teks literal COBIT 2019** — sebuah proses mencapai suatu capability level "as soon as all activities of that level are performed successfully" (*COBIT 2019 Framework: Governance and Management Objectives*, §3.4);
2. **Proposal yang diterbitkan ISACA** — sebuah level tercapai bila **seluruh aktivitas pada level tersebut bernilai L atau F** dan seluruh level di bawahnya terpenuhi (Souza Neto, Almeida & Mira da Silva, 2019);
3. **Model bertahap ISO/IEC 33020** — level yang *diklaim* cukup **Largely (>50%)**, sedangkan seluruh level di bawahnya harus **Fully (>85%)**.

Karena tidak ada satu aturan resmi yang mengikat, **aturan agregasi harus dinyatakan sebagai keputusan desain yang eksplisit** dan hasilnya harus dapat ditelusuri. Inilah salah satu inti kontribusi penelitian ini.

#### 2.2.4 Keterlacakan Evidensi Audit

Standar audit menuntut dokumentasi yang dapat direproduksi dan bukti yang cukup serta sesuai. IIA *Global Internal Audit Standards* (2024), khususnya *Standard 14.6 "Engagement Documentation"*, mengharuskan dokumentasi memungkinkan auditor kompeten mengulangi pekerjaan dan memperoleh kesimpulan serupa. ISACA *ITAF* edisi ke-4 (2020), *Standard 1205 "Evidence"*, mengharuskan praktisi memperoleh bukti yang cukup dan sesuai untuk menarik kesimpulan yang wajar. Konsekuensinya, sistem assessment perlu mengaitkan setiap rating dengan bukti pendukung dan menyimpan jejaknya secara dapat diperiksa.

#### 2.2.5 *Design Science Research* dan Evaluasi Artefak

Penelitian ini menggunakan DSRM (Peffers et al., 2007) dengan enam aktivitas: identifikasi masalah dan motivasi, definisi tujuan solusi, perancangan dan pengembangan, demonstrasi, evaluasi, dan komunikasi. Pedoman perancangan mengacu pada Hevner et al. (2004) (tujuh pedoman; hlm. 75–105) dan pandangan siklus (*three-cycle view*) dari Hevner (2007). Kerangka kontribusi pengetahuan mengikuti Gregor & Hevner (2013); karena alat assessment berbasis web sudah ada, kontribusi diframing sebagai ***Improvement*** (artefak yang lebih baik untuk masalah yang diketahui) atau ***Exaptation*** (metode yang dikenal diterapkan pada konteks baru), **bukan** *Invention*. Strategi evaluasi mengikuti FEDS (Venable, Pries-Heje & Baskerville, 2016), dengan kombinasi *Technical Risk & Efficacy* (artifisial) dan *Human Risk & Effectiveness* (naturalistik). Metode evaluasi yang akan dipakai: pengujian fungsional *black-box* (Hevner et al., 2004; ISO/IEC/IEEE 29119-4), validasi perhitungan referensi (Barr et al., 2015), *expert review* untuk validitas **instrumen** (Lynn, 1986; Polit & Beck, 2006), dan SUS untuk *usability* (Brooke, 1996; Bangor et al., 2008; Lewis, 2018).

### 2.3 Posisi dan Kebaruan Penelitian

Tabel berikut membandingkan kapabilitas yang ada dengan yang ditawarkan penelitian ini.

**Tabel 2.2** Perbandingan kapabilitas.

| Kapabilitas | GRC komersial | Resmi ISACA | Prototipe akademik | **Penelitian ini** |
|---|:--:|:--:|:--:|:--:|
| Konten COBIT 2019 | ✔ | ✔ (desain) | ✔ | ✔ (subset) |
| Instrumen *capability* resmi | ✘ | ✘ | ✘ | ✘ (bukan resmi — dinyatakan) |
| Perhitungan CPM otomatis | ✘ | ✘ | sebagian | ✔ |
| *Scoring* transparan/*inspectable* | ✘ | n/a | ✘ | ✔ |
| *Traceability* rating ↔ evidensi | sebagian | ✘ | ✘ | ✔ |
| Pengelolaan assessment (riwayat/perbandingan/laporan) | sebagian | ✘ | ✘ | ✔ (tujuan desain) |

**Pernyataan kebaruan:** penelitian ini tidak mengklaim "sistem COBIT 2019 berbasis web pertama". Kebaruan diletakkan pada **kombinasi** (i) aturan agregasi CPM yang transparan dan dapat dikonfigurasi, (ii) keterlacakan rating ke evidensi audit, (iii) pengelolaan assessment lintas periode, dan (iv) evaluasi yang lebih ketat (perhitungan referensi + *expert review* + SUS).

---

## BAB 3 METODOLOGI PENELITIAN

### 3.1 Sistematika Penelitian

Penelitian mengikuti enam aktivitas DSRM (Peffers et al., 2007) yang dipetakan pada tahapan berikut:

```
(1) Identifikasi Masalah & Motivasi  → literatur + regulasi konteks
(2) Definisi Tujuan Solusi           → kebutuhan fungsional & nonfungsional
(3) Perancangan & Pengembangan       → arsitektur, engine CPM, evidensi
(4) Demonstrasi                      → aplikasi web berjalan pada data kasus
(5) Evaluasi                         → black-box, perhitungan referensi, expert review, SUS
(6) Komunikasi                       → laporan tugas akhir
```

*Titik masuk:* **problem-centred** (berangkat dari keterbatasan instrumen dan praktik assessment).

### 3.2 Tahap 1 — Identifikasi Masalah dan Motivasi

Studi literatur atas kerangka COBIT 2019, mekanisme CPM, standar audit/keterlacakan, penelitian terkait, serta regulasi Indonesia (sebagai konteks) dilakukan untuk merumuskan masalah: tidak adanya instrumen *capability* resmi, ketiadaan formula agregasi wajib, dan lemahnya keterlacakan evidensi pada alat yang ada.

### 3.3 Tahap 2 — Definisi Tujuan Solusi

Tujuan solusi diturunkan dari rumusan masalah dan kebutuhan pengguna (§1.2, §1.3), mencakup: penentuan prioritas objektif (DF1–DF4), pencatatan rating CPM, perhitungan *capability level* yang transparan, analisis kesenjangan, keterlacakan evidensi, dan pengelolaan assessment lintas periode.

### 3.4 Tahap 3 — Perancangan dan Pengembangan

**a. Arsitektur.** Aplikasi web sisi klien (React + TypeScript) dengan *state store* terpusat; persistensi *localStorage*; ekspor/impor JSON.

**b. Prioritisasi objektif.** Mesin *Design Factor* menghitung skor DF1–DF4 dan menurunkan target *capability level* per objektif.

**c. Mesin CPM (*explicit & configurable*).** Setiap aktivitas diberi respons (Yes / Partially / No / N.A.); N.A. dikeluarkan dari penyebut, dan level yang seluruh aktivitasnya N.A. ditandai **Insufficient Evidence**. Persentase pemenuhan per level memetakan ke predikat N/P/L/F memakai ambang ISO/IEC 33020:2019 §5.3. Aturan gerbang dapat dipilih: `aggregate-85` (default), `all-l-or-f` (proposal Souza Neto dkk., 2019), dan `iso-staged` (ISO/IEC 33020); sistem menampilkan level hasil setiap aturan pada data yang sama sebagai analisis sensitivitas.

**d. Keterlacakan evidensi.** Setiap aktivitas menyimpan `evidenceIds`; setiap evidence menyimpan metadata (jenis, referensi, penilai, tanggal, catatan) dan `linkedActivityIds`, dengan alur status `pending → reviewed → attached` dan penelusuran dua arah.

**e. Pengelolaan assessment.** Registri assessment, *snapshot* metrik ringkas, dan halaman perbandingan *baseline → kandidat*.

### 3.5 Tahap 4 — Demonstrasi

Sistem dijalankan pada *dataset* kasus yang **dinyatakan sintetis/berasal dari wawancara** (bukan *benchmark* resmi). Demonstrasi menunjukkan alur end-to-end dari setup DF, pengisian rating, penautan evidensi, hingga hasil, gap, dan rekomendasi.

### 3.6 Tahap 5 — Evaluasi

**Tabel 3.1** Rencana evaluasi dan apa yang dibuktikan/tidak dibuktikan.

| Metode | Membuktikan | Tidak membuktikan |
|---|---|---|
| Pengujian fungsional *black-box* | Keluaran sistem sesuai keluaran yang diharapkan untuk masukan terpilih | Bebas cacat; kebenaran jalur yang tidak diuji |
| Validasi perhitungan referensi (*test oracle*) | Engine mereproduksi hasil yang diturunkan independen dari aturan terdokumentasi | Bahwa metode itu sendiri "benar" secara bisnis |
| *Expert review* (validitas instrumen) | Pakar menilai pemetaan COBIT dan model *scoring* sudah sesuai | Akurasi statistik; validitas perangkat lunak |
| SUS | *Usability* yang dipersepsikan | Kebenaran fungsional |

**Catatan penting.** (i) Validasi perhitungan referensi membuktikan **ekuivalensi implementasi (verifikasi)**, bukan kebenaran hasil COBIT. (ii) *Expert review* memvalidasi **instrumen/kuesioner**, bukan perangkat lunak; jangan menulis "sistem memiliki indeks validitas konten". (iii) SUS tidak memiliki jumlah minimum universal, tetapi presisi rata-rata buruk pada N kecil; disarankan **N ≥ 20–30** responden dan pelaporan **interval kepercayaan**. (iv) Bila dua assessor menilai kasus yang sama, gunakan **Cohen's κ** (bobot bila ordinal) atau **Fleiss' κ** untuk lebih dari dua penilai.

### 3.7 Tahap 6 — Komunikasi

Hasil penelitian dilaporkan dalam bentuk laporan tugas akhir, mencakup analisis, perancangan, implementasi, dan hasil evaluasi.

### 3.8 Alat dan Bahan Penelitian

- **Alat:** React + TypeScript, Vite, *library* pengujian unit; React Context untuk *state*; `localStorage` untuk persistensi; browser desktop modern.
- **Bahan:** subset objektif/aktivitas COBIT 2019 (sesuai lisensi), katalog *Design Factor* DF1–DF4, dan *dataset* kasus sintetis/wawancara.

---

## BAB 4 SIMPULAN

Penelitian ini merancang dan membangun sistem pengukuran *Capability Level* COBIT 2019 berbasis web yang membuat perhitungan CPM eksplisit dan dapat diperiksa, menghubungkan setiap rating aktivitas dengan evidensi audit, dan mengelola assessment lintas periode. Sistem diposisikan secara jujur sebagai **adaptasi operasional** — bukan PAM atau standar resmi ISACA — dengan aturan agregasi yang dinyatakan terbuka dan dapat dikonfigurasi. Evaluasi direncanakan melalui pengujian *black-box*, validasi perhitungan referensi independen, *expert review* untuk validitas instrumen, serta SUS dengan pelaporan interval kepercayaan. Diharapkan hasil penelitian ini memberikan kontribusi berupa artefak sistem informasi dan prinsip desain yang dapat direplikasi untuk transparansi *scoring* dan keterlacakan evidensi pada assessment tata kelola TI.

---

## DAFTAR PUSTAKA (sementara)

> **Catatan format.** Template meminta Daftar Pustaka bergaya **IEEE**. Senarai di bawah disusun bergaya IEEE (bernomor). Sitasi dalam teks draf ini masih bergaya **Harvard** (mengikuti Bab 1 yang sudah ada). Jika pembimbing meminta konsistensi penuh, ubah sitasi dalam teks menjadi `[n]` sesuai nomor di bawah, atau ubah senarai ini ke gaya Harvard (alfabetis).

1. ISACA, *COBIT 2019 Framework: Introduction and Methodology*. Rolling Meadows, IL, USA: ISACA, 2019.
2. ISACA, *COBIT 2019 Framework: Governance and Management Objectives*. Rolling Meadows, IL, USA: ISACA, 2019.
3. ISACA, *Introducing COBIT 2019: Major Differences with COBIT 5*. Rolling Meadows, IL, USA: ISACA, 2018.
4. ISACA, *ITAF: A Professional Practices Framework for IT Audit*, 4th ed. Rolling Meadows, IL, USA: ISACA, 2020.
5. L. R. S. Dhulipalla, "Using COBIT 2019 Performance Management Model to Assess Governance and Management Objectives," *ISACA COBIT Focus*, Sep. 2019.
6. L. Gorgona, "Building a Maturity Model for COBIT 2019 Based on CMMI," *ISACA Journal*, vol. 6, 2021.
7. E. Elue, "Effective Capability and Maturity Assessment Using COBIT 2019," *ISACA Industry News*, 2020.
8. J. Souza Neto, R. Almeida, and M. Mira da Silva, "Defining Target Capability Levels in COBIT 2019: A Proposal for Refinement," *ISACA Industry News*, Mar. 2019.
9. ISO/IEC, *ISO/IEC 33020:2019 — Information technology — Process assessment — Process measurement framework for assessment of process capability*. Geneva, Switzerland: ISO, 2019.
10. IIA, *Global Internal Audit Standards*. Lake Mary, FL, USA: The Institute of Internal Auditors, 2024.
11. K. Peffers, T. Tuunanen, M. A. Rothenberger, and S. Chatterjee, "A Design Science Research Methodology for Information Systems Research," *J. Manage. Inf. Syst.*, vol. 24, no. 3, pp. 45–77, 2007, doi: 10.2753/MIS0742-1222240302.
12. A. R. Hevner, S. T. March, J. Park, and S. Ram, "Design Science in Information Systems Research," *MIS Quart.*, vol. 28, no. 1, pp. 75–105, 2004, doi: 10.2307/25148625.
13. A. R. Hevner, "A Three Cycle View of Design Science Research," *Scand. J. Inf. Syst.*, vol. 19, no. 2, art. 4, 2007.
14. S. Gregor and A. R. Hevner, "Positioning and Presenting Design Science Research for Maximum Impact," *MIS Quart.*, vol. 37, no. 2, pp. 337–355, 2013, doi: 10.25300/MISQ/2013/37.2.01.
15. J. Venable, J. Pries-Heje, and R. Baskerville, "FEDS: A Framework for Evaluation in Design Science Research," *Eur. J. Inf. Syst.*, vol. 25, no. 1, pp. 77–89, 2016, doi: 10.1057/ejis.2014.36.
16. E. T. Barr, M. Harman, P. McMinn, M. Shahbaz, and S. Yoo, "The Oracle Problem in Software Testing: A Survey," *IEEE Trans. Softw. Eng.*, vol. 41, no. 5, pp. 507–525, 2015, doi: 10.1109/TSE.2014.2372785.
17. J. Brooke, "SUS: A 'Quick and Dirty' Usability Scale," in *Usability Evaluation in Industry*, 1996, doi: 10.1201/9781498710411-35.
18. A. Bangor, P. T. Kortum, and J. T. Miller, "An Empirical Evaluation of the System Usability Scale," *Int. J. Human–Comput. Interact.*, vol. 24, no. 6, pp. 574–594, 2008, doi: 10.1080/10447310802205776.
19. J. R. Lewis, "The System Usability Scale: Past, Present, and Future," *Int. J. Human–Comput. Interact.*, vol. 34, no. 7, pp. 577–590, 2018, doi: 10.1080/10447318.2018.1455307.
20. M. R. Lynn, "Determination and Quantification of Content Validity," *Nurs. Res.*, vol. 35, no. 6, pp. 382–385, 1986, doi: 10.1097/00006199-198611000-00017.
21. J. Cohen, "A Coefficient of Agreement for Nominal Scales," *Educ. Psychol. Meas.*, vol. 20, no. 1, pp. 37–46, 1960, doi: 10.1177/001316446002000104.
22. J. R. Landis and G. G. Koch, "The Measurement of Observer Agreement for Categorical Data," *Biometrics*, vol. 33, no. 1, pp. 159–174, 1977, doi: 10.2307/2529310.
23. S. Mandiangan, "Rancang Bangun Sistem Informasi Capability Assessment Tools COBIT 2019," Skripsi, UPN Veteran Jakarta, 2023.
24. M. S. Noor, "Implementasi Sistem Penilaian Kapabilitas Tata Kelola TI Berbasis COBIT 2019," Skripsi, ITTP Purwokerto, 2021.
25. Anwar and Harits, "Perancangan Sistem Kuisioner Penilaian Kapabilitas Framework COBIT 2019," *J. Informatika Utama*, vol. 3, no. 1, 2025, doi: 10.55903/jitu.v3i1.271.
26. Peraturan Pemerintah Republik Indonesia Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
27. Peraturan Menteri Komunikasi dan Informatika Republik Indonesia Nomor 16 Tahun 2022 tentang Audit Teknologi Informasi dan Komunikasi.
28. Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Republik Indonesia Nomor 8 Tahun 2026 tentang Evaluasi Kinerja Pemerintah Digital.

---

> **Butir terbuka yang harus diselesaikan sebelum submission** (dari `06` Appendix B):
> 1. **Lisensi konten COBIT** — tetapkan subset objektif/aktivitas final + pernyataan hak cipta ISACA.
> 2. **Re-verifikasi baris perkakas GRC komersial** (masih `[2ND-UNV]`) sebelum dicantumkan.
> 3. **Instrumen evaluasi** — siapkan kuesioner *expert review* dan instrumen SUS; tetapkan jumlah responden (N ≥ 20–30).
> 4. **Fixture perhitungan referensi** — sudah dibangun (`src/utils/__tests__/referenceCalculation.test.ts`); pastikan didokumentasikan sebagai *verifikasi*, bukan validasi kebenaran hasil.
