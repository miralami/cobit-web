# BAB I PENDAHULUAN

> **Judul penelitian:** Rancang Bangun Sistem Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit
>
> **Catatan penyusunan:** struktur latar belakang mengikuti rekomendasi `06-deep-research-research-gap.md` §9.3 (delapan paragraf) dan register koreksi §9.2. Regulasi Indonesia digunakan sebagai **konteks**, bukan sebagai justifikasi pemilihan COBIT.

## I.1 Latar Belakang

Teknologi Informasi (TI) kini menjadi tulang punggung operasional, layanan, dan pengambilan keputusan organisasi. Karena itu, pemanfaatan TI perlu dikelola melalui tata kelola yang memastikan manfaat investasi tercapai, risiko terkendali, dan sumber daya digunakan secara bertanggung jawab (ISACA, 2019). Meningkatnya penggunaan aplikasi, data, layanan awan, dan tuntutan kepatuhan membuat evaluasi tata kelola TI yang sistematis serta didukung bukti yang dapat diperiksa kembali menjadi semakin penting.

COBIT 2019 adalah salah satu kerangka kerja yang digunakan untuk mengevaluasi tata kelola dan manajemen TI. Kerangka ini mencakup 40 *Governance and Management Objectives* dalam lima domain dan menyediakan *Design Factors* untuk membantu organisasi menentukan objektif yang relevan (ISACA, 2019). Pengukuran tingkat pencapaian menggunakan *COBIT Performance Management* (CPM) pada skala capability 0–5, dengan predikat *Not Achieved* (N), *Partially Achieved* (P), *Largely Achieved* (L), dan *Fully Achieved* (F) berdasarkan persentase pencapaian aktivitas (ISACA, 2019; 2020). Penilaian ini seharusnya bersandar pada pemeriksaan aktivitas dan bukti pendukung, bukan semata persepsi responden.

Namun, COBIT 2019 memiliki keterbatasan instrumen yang mendasar. ISACA tidak menerbitkan *Process Assessment Model* (PAM) resmi untuk COBIT 2019, berbeda dengan COBIT 5 yang berbasis ISO/IEC 33000 (ISACA Journal, 2021; ISACA, 2018). Artefak digital resmi yang tersedia, seperti *Design Guide Tool Kit*, berfokus pada prioritisasi desain objektif dan tidak menghitung capability level. Yang lebih penting, ISACA **tidak menetapkan formula agregasi wajib** untuk menggulung nilai aktivitas menjadi capability level sebuah objektif; artikel ISACA Journal sekadar *mengusulkan* rata-rata sederhana atau rata-rata berbobot sebagai praktik yang dapat dipilih organisasi (Gorgona, 2021). Akibatnya, organisasi dan peneliti harus menetapkan sendiri aturan agregasi tersebut, dan aturan itu perlu dinyatakan secara eksplisit agar hasilnya transparan dan dapat dipertanggungjawabkan.

Keterbatasan berikutnya menyangkut evidensi. CPM mensyaratkan *traceability* antara bukti objektif yang dikumpulkan dan rating aktivitas yang diberikan (ISACA, 2019). Di lapangan, bukti audit tersebar dalam dokumen kebijakan, prosedur, log, notulen wawancara, maupun tangkapan layar, dengan repositori dan format yang berbeda serta istilah organisasi yang belum tentu sama dengan aktivitas COBIT. Kondisi ini menyulitkan assessor ketika memetakan bukti, menetapkan rating, dan meninjau ulang dasar penilaian. Padahal, standar audit menuntut dokumentasi yang memungkinkan auditor kompeten mengulangi pekerjaan dan memperoleh kesimpulan serupa (IIA, 2024), serta bukti yang cukup dan sesuai untuk mendukung kesimpulan (ISACA, 2020). Tanpa keterhubungan yang jelas antara aktivitas, rating, dan bukti, hasil assessment berisiko kurang transparan dan sulit diverifikasi pihak lain.

Persoalan berikutnya adalah bahwa assessment bukan kalkulasi sekali jalan, melainkan sebuah artefak informasi yang memiliki siklus hidup. Organisasi umumnya menilai ulang tata kelola TI pada periode berikutnya atau pada unit yang berbeda, sehingga pertanyaan yang muncul adalah bagaimana membandingkan capaian antar-periode atau antar-unit, apa yang dinilai sebelumnya dan atas dasar bukti apa, serta bagaimana hasilnya dilaporkan kepada manajemen dalam bahasa yang mudah dipahami. ISACA Journal menegaskan bahwa model kematangan seharusnya bermuara pada alat yang mampu menghasilkan pelaporan yang dapat dipahami manajemen puncak (Gorgona, 2021). Fungsi manajemen assessment ini belum menjadi perhatian utama pada alat bantu yang ada.

Alat bantu yang tersedia saat ini belum sepenuhnya menjawab kebutuhan tersebut. Perangkat GRC komersial umumnya menyediakan pemetaan konten kontrol dan objektif, bukan instrumen penilaian yang menghitung capability level secara berjenjang. Prototipe akademik yang ada telah memindahkan sebagian proses berbasis lembar kerja ke web, namun beberapa di antaranya belum memaparkan aturan *scoring* secara dapat diinspeksi di dalam aplikasi, belum menyediakan manajemen evidensi yang menghubungkan rating dengan dokumen bukti, dan belum mendukung pengelolaan assessment lintas waktu (Noor, 2021; Mandiangan, 2023; Anwar & Harits, 2025). Karena itu, masih terbuka ruang untuk sebuah sistem yang membuat perhitungan CPM **eksplisit dan dapat diperiksa**, menghubungkan setiap rating ke evidensi audit, dan mengelola assessment sebagai artefak yang dapat dibandingkan antar-periode.

Penelitian ini merespons keterbatasan tersebut dengan merancang dan membangun sistem pengukuran *Capability Level* COBIT 2019 berbasis web. Sistem membantu assessor menentukan prioritas objektif melalui Design Factor DF1 sampai DF4, mencatat rating CPM, menghitung capability level melalui aturan agregasi yang dinyatakan terbuka dan dapat dikonfigurasi, menganalisis kesenjangan terhadap target, menghubungkan rating dengan evidensi pendukung, serta membandingkan hasil antar-periode melalui snapshot. Sistem berfungsi sebagai alat bantu dokumentasi dan pengambilan keputusan; penilaian akhir tetap menjadi tanggung jawab assessor, dan aturan agregasi yang dipakai merupakan **adaptasi operasional yang dinyatakan eksplisit**, bukan standar resmi ISACA. Penelitian menggunakan *Design Science Research Methodology* (DSRM) karena menghasilkan artefak sistem informasi (Peffers et al., 2007), dan dievaluasi melalui pengujian fungsional *black-box*, validasi terhadap perhitungan referensi independen, *expert review* sebagai pengujian validitas instrumen, serta *System Usability Scale* (SUS) dalam kerangka FEDS (Hevner et al., 2004; Venable et al., 2016).

Sebagai konteks, bukan justifikasi, kebutuhan tersebut bersinggungan dengan kewajiban regulasi di Indonesia. Pasal 22 ayat (1) PP Nomor 71 Tahun 2019 mewajibkan penyelenggara sistem elektronik menyediakan rekam jejak audit, sedangkan Permenkominfo Nomor 16 Tahun 2022 mendefinisikan Audit TIK sebagai proses sistematis untuk memperoleh dan mengevaluasi bukti secara objektif terhadap kriteria dan/atau standar yang telah ditetapkan. Kedua ketentuan ini menegaskan pentingnya rekam jejak dan bukti, tetapi **tidak menyediakan instrumen pengukurannya** dan **tidak mewajibkan COBIT**. Evaluasi kinerja pemerintahan digital saat ini menggunakan instrumen PermenPANRB dengan indikator dan skala kematangannya sendiri (PermenPANRB Nomor 8 Tahun 2026), sehingga COBIT 2019 diposisikan sebagai pelengkap *self-assessment* yang bersifat sukarela dan lebih mendalam, bukan sebagai kewajiban regulasi.

## I.2 Perumusan Masalah

Berdasarkan latar belakang tersebut, rumusan masalah penelitian adalah sebagai berikut:

1. Bagaimana merancang dan membangun sistem berbasis web untuk membantu penentuan prioritas objektif serta pengukuran *Capability Level* COBIT 2019 secara transparan?
2. Bagaimana menerapkan rating CPM N/P/L/F dan aturan agregasi *capability level* yang eksplisit dan dapat diperiksa pada sistem agar hasil penilaian terdokumentasi dengan jelas?
3. Bagaimana mengintegrasikan evidensi audit agar setiap rating aktivitas dapat ditelusuri ke bukti pendukungnya, serta bagaimana validitas perhitungan CPM dan *usability* sistem dinilai melalui pengujian *black-box*, validasi terhadap perhitungan referensi independen, *expert review*, dan SUS?

## I.3 Tujuan Penelitian

Tujuan penelitian ini adalah sebagai berikut:

1. Merancang dan membangun sistem berbasis web untuk menentukan prioritas objektif COBIT 2019 dan mengukur *Capability Level*.
2. Menerapkan rating CPM N/P/L/F serta aturan agregasi *capability level* yang eksplisit dan dapat diubah pada sistem.
3. Mengembangkan keterlacakan antara rating aktivitas dan evidensi audit, serta mengevaluasi validitas perhitungan, fungsionalitas, dan usability sistem.

## I.4 Batasan Penelitian

Untuk menjaga fokus penelitian, batasan yang ditetapkan adalah sebagai berikut:

1. Penelitian berfokus pada rancang bangun sistem assessment tata kelola dan manajemen TI berbasis COBIT 2019.
2. Penentuan prioritas objektif dibatasi pada Design Factor DF1 *Enterprise Strategy*, DF2 *Enterprise Goals*, DF3 *Risk Profile*, dan DF4 *I&T-Related Issues*; DF5–DF11 berada di luar cakupan.
3. Objektif dan aktivitas COBIT yang diterapkan berupa subset sesuai kebutuhan penelitian dan konten yang dapat digunakan secara sah; sistem tidak mengimplementasikan seluruh 40 objektif dan 1.202 aktivitas COBIT 2019.
4. Aturan agregasi CPM yang digunakan adalah **adaptasi operasional** dari skala capability COBIT 2019 dengan ambang N/P/L/F ISO/IEC 33020:2019 §5.3. Karena ISACA tidak menetapkan formula agregasi resmi, sistem menyediakan beberapa aturan *gate* yang dapat dipilih dan menampilkan aturan yang sedang aktif; sistem tidak diklaim sebagai standar resmi ISACA atau PAM resmi.
5. Evidensi berupa metadata dan dokumen yang dipetakan secara manual oleh assessor. Sistem tidak memverifikasi kebenaran bukti atau menentukan rating akhir secara otomatis.
6. Sistem dikembangkan sebagai aplikasi web sisi klien (React dan TypeScript) dengan persistensi *localStorage* pada satu peramban; integrasi repositori eksternal, data organisasi nyata, dan arsitektur multi-tenant tidak dibahas.
7. Fitur AI, bila digunakan, hanya membantu penyusunan draf rekomendasi dan tidak menentukan keputusan assessment.

## I.5 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini adalah sebagai berikut:

1. Bagi assessor atau auditor TI, sistem membantu pencatatan rating, pengelolaan evidensi, perhitungan *Capability Level* yang transparan, dan penelusuran dasar penilaian.
2. Bagi organisasi, sistem menyediakan informasi capability level, kesenjangan terhadap target, dan bukti pendukung untuk perencanaan perbaikan tata kelola TI, serta riwayat capaian antar-periode.
3. Bagi akademisi dan peneliti selanjutnya, penelitian ini menjadi referensi penerapan CPM COBIT 2019 berbasis web, khususnya pada transparansi aturan *scoring*, *traceability* evidensi, dan pengelolaan assessment lintas waktu.

## I.6 Sistematika Laporan

Sistematika laporan penelitian disusun sebagai berikut:

1. **BAB I PENDAHULUAN** membahas latar belakang, perumusan masalah, tujuan, batasan, manfaat, dan sistematika laporan.
2. **BAB II TINJAUAN PUSTAKA** membahas teori dan penelitian terdahulu terkait tata kelola TI, COBIT 2019, CPM, capability level, evidensi audit, *traceability*, DSRM, dan pengujian sistem.
3. **BAB III METODE PENYELESAIAN MASALAH** menjelaskan tahapan DSRM, pengumpulan data, analisis kebutuhan, perancangan sistem, rancangan scoring dan evidensi, serta metode evaluasi.
4. **BAB IV HASIL PENELITIAN** menyajikan analisis, perancangan, dan implementasi sistem.
5. **BAB V VALIDASI HASIL DAN DISKUSI** membahas hasil pengujian fungsional, validasi perhitungan referensi, *expert review*, usability, dan keterbatasan sistem.
6. **BAB VI KESIMPULAN DAN SARAN** menyajikan kesimpulan dan saran pengembangan.

## Daftar Referensi Sementara

1. Anwar dan Harits. (2025). *Perancangan Sistem Kuisioner Penilaian Kapabilitas Framework COBIT 2019*.
2. Gorgona, J. (2021). “Establishing a Maturity Model for COBIT 2019.” *ISACA Journal*, Vol. 6.
3. Hevner, A. R., March, S. T., Park, J., dan Ram, S. (2004). “Design Science in Information Systems Research.” *MIS Quarterly*, 28(1), 75–105.
4. IIA. (2024). *Global Internal Audit Standards*. Institute of Internal Auditors.
5. ISACA. (2018). *Introducing COBIT 2019: Major Differences with COBIT 5*.
6. ISACA. (2019). *COBIT 2019 Framework: Introduction and Methodology*. Rolling Meadows, IL: ISACA.
7. ISACA. (2020). *ITAF: A Professional Practices Framework for IS Audit/Assurance* (4th ed.).
8. ISO/IEC. (2019). *ISO/IEC 33020:2019 — Information technology — Process assessment — Process measurement framework for assessment of process capability*. Geneva: ISO.
9. Mandiangan. (2023). *Rancang Bangun Sistem Informasi Capability Assessment Tools COBIT 2019*. UPN Veteran Jakarta.
10. Noor. (2021). *Implementasi Sistem Penilaian Kapabilitas Tata Kelola TI Berbasis COBIT 2019*. ITTP Purwokerto.
11. Peffers, K., Tuunanen, T., Rothenberger, M. A., dan Chatterjee, S. (2007). “A Design Science Research Methodology for Information Systems Research.” *Journal of Management Information Systems*, 24(3), 45–77.
12. Souza Neto, J., Almeida, R., dan Mira da Silva, M. (2019). “Effective Capability and Maturity Assessment Using COBIT 2019.” ISACA Industry News.
13. Venable, J., Pries-Heje, J., dan Baskerville, R. (2016). “FEDS: a Framework for Evaluation in Design Science Research.” *European Journal of Information Systems*, 25(1), 77–89.
14. Peraturan Pemerintah Republik Indonesia Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
15. Peraturan Menteri Komunikasi dan Informatika Republik Indonesia Nomor 16 Tahun 2022 tentang Audit Teknologi Informasi dan Komunikasi.
16. Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Republik Indonesia Nomor 8 Tahun 2026 tentang Evaluasi Kinerja Pemerintah Digital.
