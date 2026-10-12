# BAB I PENDAHULUAN

> **Judul penelitian:** Rancang Bangun Sistem Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit

## I.1 Latar Belakang

Teknologi Informasi (TI) berperan penting dalam mendukung operasional, pencapaian tujuan bisnis, pengelolaan risiko, dan penyediaan layanan organisasi. Karena itu, penerapan TI perlu dikelola melalui tata kelola yang memastikan manfaat investasi tercapai, risiko terkendali, serta sumber daya digunakan secara bertanggung jawab (ISACA, 2019). Kompleksitas penggunaan aplikasi, data, layanan awan, dan tuntutan kepatuhan juga meningkatkan kebutuhan terhadap evaluasi tata kelola TI yang sistematis serta didukung bukti yang dapat diperiksa kembali.

Dalam konteks Indonesia, kebutuhan tersebut sejalan dengan PP Nomor 71 Tahun 2019 yang mewajibkan penyelenggara sistem elektronik menyediakan rekam jejak audit. Permenkominfo Nomor 16 Tahun 2022 juga mendefinisikan audit TIK sebagai proses sistematis untuk memperoleh dan mengevaluasi bukti secara objektif berdasarkan kriteria atau standar tertentu. Oleh sebab itu, assessment tata kelola TI tidak hanya memerlukan hasil penilaian, tetapi juga dokumentasi bukti yang jelas.

COBIT 2019 merupakan salah satu kerangka kerja untuk mengevaluasi tata kelola dan manajemen TI. Kerangka ini mencakup 40 *Governance and Management Objectives* dalam lima domain serta menyediakan *Design Factors* untuk membantu organisasi menentukan objektif yang relevan (ISACA, 2019). Pengukuran capability menggunakan *COBIT Performance Management* (CPM) melalui rating *Not Achieved* (N), *Partially Achieved* (P), *Largely Achieved* (L), dan *Fully Achieved* (F). Penilaian tersebut harus didasarkan pada pemeriksaan aktivitas dan bukti pendukung, bukan hanya persepsi responden.

Pelaksanaan assessment sering menghadapi kendala karena evidensi audit tersebar dalam dokumen kebijakan, prosedur, log, hasil wawancara, maupun tangkapan layar. Bukti tersebut dapat berada pada repositori dan format yang berbeda, sedangkan istilah organisasi belum tentu sama dengan aktivitas COBIT. Kondisi ini menyulitkan assessor ketika memetakan bukti, menetapkan rating, dan meninjau kembali dasar hasil penilaian. Tanpa keterhubungan yang jelas antara aktivitas, rating, dan bukti, hasil assessment berisiko kurang transparan dan sulit diverifikasi oleh pihak lain.

Keterlacakan bukti merupakan bagian penting dari kualitas dokumentasi audit. IIA Standard 14.6 mengharuskan dokumentasi audit memungkinkan auditor yang kompeten mengulangi pekerjaan dan memperoleh hasil yang sama (IIA, 2024). ISACA ITAF 1205 juga menekankan kecukupan dan kesesuaian bukti untuk mendukung kesimpulan audit (ISACA, 2020). Namun, alat bantu assessment COBIT 2019 yang ada umumnya berfokus pada daftar kontrol, pemetaan konten, atau kuesioner. Penelitian terdahulu juga menunjukkan ruang pengembangan pada transparansi scoring, pengelolaan evidensi, dan keterlacakan hasil penilaian (Noor, 2021; Mandiangan, 2023; Anwar dan Harits, 2025).

Berdasarkan kondisi tersebut, penelitian ini merancang sistem pengukuran *Capability Level* COBIT 2019 berbasis web dengan *traceability* evidensi audit. Sistem membantu assessor menentukan prioritas objektif melalui Design Factor DF1 sampai DF4, mencatat rating CPM, menghitung *Capability Level*, menganalisis kesenjangan terhadap target, serta menghubungkan rating dengan evidensi pendukung. Sistem berfungsi sebagai alat bantu dokumentasi dan pengambilan keputusan; penilaian akhir tetap menjadi tanggung jawab assessor.

Penelitian menggunakan *Design Science Research Methodology* (DSRM) karena menghasilkan artefak sistem informasi (Peffers et al., 2007). Sistem dievaluasi melalui pengujian fungsional *black-box*, *expert review*, dan *System Usability Scale* (SUS). Hasil penelitian diharapkan menghasilkan sistem assessment yang lebih terdokumentasi, konsisten, dan mudah ditinjau kembali.

## I.2 Perumusan Masalah

Berdasarkan latar belakang tersebut, rumusan masalah penelitian adalah sebagai berikut:

1. Bagaimana merancang dan membangun sistem berbasis web untuk membantu penentuan prioritas objektif serta pengukuran *Capability Level* COBIT 2019 secara transparan?
2. Bagaimana menerapkan rating CPM N/P/L/F dan perhitungan *Capability Level* pada sistem agar hasil penilaian terdokumentasi dengan jelas?
3. Bagaimana mengintegrasikan evidensi audit agar setiap rating aktivitas dapat ditelusuri ke bukti pendukungnya serta sistem dapat dievaluasi secara fungsional dan usability?

## I.3 Tujuan Penelitian

Tujuan penelitian ini adalah sebagai berikut:

1. Merancang dan membangun sistem berbasis web untuk menentukan prioritas objektif COBIT 2019 dan mengukur *Capability Level*.
2. Menerapkan rating CPM N/P/L/F serta perhitungan *Capability Level* secara transparan pada sistem.
3. Mengembangkan keterlacakan antara rating aktivitas dan evidensi audit, serta mengevaluasi fungsionalitas dan usability sistem.

## I.4 Batasan Penelitian

Untuk menjaga fokus penelitian, batasan yang ditetapkan adalah sebagai berikut:

1. Penelitian berfokus pada rancang bangun sistem assessment tata kelola dan manajemen TI berbasis COBIT 2019.
2. Penentuan prioritas objektif dibatasi pada Design Factor DF1 *Enterprise Strategy*, DF2 *Enterprise Goals*, DF3 *Risk Profile*, dan DF4 *I&T-Related Issues*.
3. Objektif dan aktivitas COBIT yang diterapkan berupa subset sesuai kebutuhan penelitian dan konten yang dapat digunakan secara sah; sistem tidak mengimplementasikan seluruh 40 objektif dan 1.202 aktivitas COBIT 2019.
4. Evidensi berupa metadata dan dokumen yang dipetakan secara manual oleh assessor. Sistem tidak memverifikasi kebenaran bukti atau menentukan rating akhir secara otomatis.
5. Sistem dikembangkan sebagai aplikasi web sisi klien menggunakan React dan TypeScript; integrasi repositori eksternal, data organisasi nyata, dan penggunaan multi-tenant tidak dibahas.
6. Sistem bukan *Process Assessment Model* resmi ISACA. Fitur AI, bila digunakan, hanya membantu penyusunan draf rekomendasi dan tidak menentukan keputusan assessment.

## I.5 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini adalah sebagai berikut:

1. Bagi assessor atau auditor TI, sistem membantu pencatatan rating, pengelolaan evidensi, perhitungan *Capability Level*, dan penelusuran dasar penilaian.
2. Bagi organisasi, sistem menyediakan informasi capability level, kesenjangan terhadap target, dan bukti pendukung untuk perencanaan perbaikan tata kelola TI.
3. Bagi akademisi dan peneliti selanjutnya, penelitian ini menjadi referensi penerapan CPM COBIT 2019 berbasis web, khususnya pada transparansi scoring dan *traceability* evidensi.

## I.6 Sistematika Laporan

Sistematika laporan penelitian disusun sebagai berikut:

1. **BAB I PENDAHULUAN** membahas latar belakang, perumusan masalah, tujuan, batasan, manfaat, dan sistematika laporan.
2. **BAB II TINJAUAN PUSTAKA** membahas teori dan penelitian terdahulu terkait tata kelola TI, COBIT 2019, CPM, capability level, evidensi audit, *traceability*, DSRM, dan pengujian sistem.
3. **BAB III METODE PENYELESAIAN MASALAH** menjelaskan tahapan DSRM, pengumpulan data, analisis kebutuhan, perancangan sistem, rancangan scoring dan evidensi, serta metode evaluasi.
4. **BAB IV HASIL PENELITIAN** menyajikan analisis, perancangan, dan implementasi sistem.
5. **BAB V VALIDASI HASIL DAN DISKUSI** membahas hasil pengujian fungsional, *expert review*, usability, dan keterbatasan sistem.
6. **BAB VI KESIMPULAN DAN SARAN** menyajikan kesimpulan dan saran pengembangan.

## Daftar Referensi Sementara

1. Anwar dan Harits. (2025). *Perancangan Sistem Kuisioner Penilaian Kapabilitas Framework COBIT 2019*.
2. IIA. (2024). *Global Internal Audit Standards*.
3. ISACA. (2019). *COBIT 2019 Framework: Introduction and Methodology*.
4. ISACA. (2020). *ITAF: A Professional Practices Framework for IS Audit/Assurance*.
5. Mandiangan. (2023). *Rancang Bangun Sistem Informasi Capability Assessment Tools COBIT 2019*. UPN Veteran Jakarta.
6. Noor. (2021). *Implementasi Sistem Penilaian Kapabilitas Tata Kelola TI Berbasis COBIT 2019*. ITTP Purwokerto.
7. Peffers, K., Tuunanen, T., Rothenberger, M. A., dan Chatterjee, S. (2007). “A Design Science Research Methodology for Information Systems Research.” *Journal of Management Information Systems*, 24(3), 45-77.
8. Peraturan Pemerintah Republik Indonesia Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
9. Peraturan Menteri Komunikasi dan Informatika Republik Indonesia Nomor 16 Tahun 2022 tentang Audit Teknologi Informasi dan Komunikasi.
