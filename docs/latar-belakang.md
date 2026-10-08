# BAB I PENDAHULUAN

> **Judul penelitian:** Rancang Bangun Sistem Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit
>
> **Catatan draf:** Struktur mengikuti pola Bab I pada `docs/sources-i-found/ref.md`. Referensi dan format sitasi perlu disesuaikan dengan pedoman program studi pada tahap finalisasi.

## I.1 Latar Belakang

Teknologi Informasi (TI) telah menjadi bagian penting dalam penyelenggaraan kegiatan organisasi. TI tidak hanya digunakan untuk mendukung kegiatan operasional, tetapi juga untuk membantu organisasi mencapai tujuan bisnis, mengelola risiko, menyediakan layanan, dan memenuhi kebutuhan pemangku kepentingan. Oleh karena itu, penerapan TI perlu didukung oleh tata kelola yang mampu memastikan bahwa investasi teknologi memberikan manfaat, risiko dikelola, dan sumber daya digunakan secara bertanggung jawab (ISACA, 2019).

Perkembangan teknologi digital menyebabkan lingkungan TI organisasi menjadi semakin kompleks. Organisasi menghadapi penggunaan komputasi awan, peningkatan volume data, pemanfaatan kecerdasan buatan, integrasi berbagai aplikasi, serta tuntutan kepatuhan terhadap regulasi perlindungan data. Survei *IIA Vision 2035* terhadap 6.506 responden menunjukkan bahwa 97% pemimpin audit internal menilai teknologi meningkatkan volume dan kompleksitas data yang harus dikelola organisasi (IIA, 2025). Kondisi tersebut meningkatkan kebutuhan terhadap proses evaluasi tata kelola TI yang sistematis, terdokumentasi, dan didukung bukti yang dapat diverifikasi.

Urgensi tata kelola dan audit TI juga terlihat dalam konteks Indonesia. Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik mewajibkan penyelenggara sistem elektronik menyediakan rekam jejak audit atas kegiatan penyelenggaraan sistem elektronik. Peraturan Presiden Nomor 95 Tahun 2018 tentang Sistem Pemerintahan Berbasis Elektronik juga menempatkan tata kelola sebagai kerangka untuk memastikan adanya pengaturan, pengarahan, dan pengendalian penerapan SPBE secara terpadu. Selain itu, Peraturan Menteri Komunikasi dan Informatika Nomor 16 Tahun 2022 mendefinisikan audit TIK sebagai proses sistematis untuk memperoleh dan mengevaluasi bukti secara objektif berdasarkan kriteria atau standar yang telah ditetapkan. Ketentuan tersebut menunjukkan bahwa audit TI membutuhkan bukti yang memadai, dokumentasi yang tertata, dan kriteria penilaian yang jelas.

Salah satu kerangka kerja yang dapat digunakan untuk mengevaluasi tata kelola dan manajemen TI adalah COBIT 2019 yang diterbitkan oleh *Information Systems Audit and Control Association* (ISACA). COBIT 2019 mencakup 40 *Governance and Management Objectives* yang dikelompokkan ke dalam lima domain, yaitu *Evaluate, Direct and Monitor* (EDM), *Align, Plan and Organize* (APO), *Build, Acquire and Implement* (BAI), *Deliver, Service and Support* (DSS), serta *Monitor, Evaluate and Assess* (MEA). Kerangka kerja ini juga menyediakan *Goals Cascade* dan *Design Factors* untuk membantu organisasi menentukan objektif tata kelola dan manajemen TI yang sesuai dengan kebutuhan organisasi (ISACA, 2019).

Penilaian dalam COBIT 2019 menggunakan pendekatan *COBIT Performance Management* (CPM). Pada pendekatan tersebut, aktivitas proses dinilai menggunakan skala *Not Achieved* (N), *Partially Achieved* (P), *Largely Achieved* (L), dan *Fully Achieved* (F). Ambang penilaiannya adalah 0 sampai 15% untuk N, lebih dari 15% sampai 50% untuk P, lebih dari 50% sampai 85% untuk L, dan lebih dari 85% sampai 100% untuk F. Hasil penilaian kemudian digunakan untuk menentukan *Capability Level* dari Level 0 sampai Level 5 melalui proses agregasi aktivitas, praktik, objektif, dan domain. Dengan demikian, penilaian COBIT 2019 tidak cukup dilakukan melalui kuesioner persepsi, tetapi memerlukan pemeriksaan terhadap bukti yang relevan dan dapat ditelusuri.

Dalam pelaksanaannya, assessment tata kelola TI menghadapi kendala dalam pengumpulan dan pengelolaan bukti. Eulerich et al. (2023) menemukan bahwa 45,9% responden mengidentifikasi kualitas basis data sebagai hambatan adopsi teknologi audit, 34,1% mengalami masalah akses data, dan 46,5% menghadapi keterbatasan kompetensi. KPMG (2025) juga melaporkan bahwa jumlah kontrol yang termasuk dalam cakupan audit meningkat lebih dari dua kali lipat dalam dua tahun, dengan rata-rata waktu 16 jam untuk setiap kontrol. Kondisi tersebut menunjukkan bahwa pengelolaan bukti dapat menjadi bagian yang memerlukan waktu dan usaha besar dalam proses audit.

Permasalahan tersebut menjadi lebih kompleks karena bukti audit biasanya tersebar pada berbagai repositori dan memiliki format yang beragam. Dokumen kebijakan, prosedur, catatan aktivitas, log, hasil wawancara, dan tangkapan layar dapat tersimpan pada server lokal maupun layanan seperti SharePoint, Jira, dan Google Drive. Selain itu, istilah yang digunakan organisasi tidak selalu sama dengan istilah pada praktik COBIT. Perbedaan istilah tersebut dapat menyulitkan assessor ketika memetakan bukti terhadap aktivitas atau praktik COBIT yang sesuai.

Kendala lainnya adalah subjektivitas dalam menentukan rating. Assessor harus menginterpretasikan bukti, membandingkannya dengan kriteria aktivitas, kemudian menentukan apakah tingkat pencapaiannya termasuk N, P, L, atau F. Tanpa dokumentasi yang memadai, keputusan tersebut sulit ditinjau ulang oleh assessor lain. Masalah yang lebih penting adalah terputusnya hubungan antara rating dan bukti pendukung. Hasil penilaian atau rekomendasi dapat tersedia, tetapi dokumen atau bagian bukti yang menjadi dasar keputusan tidak selalu dapat ditemukan kembali secara langsung.

Keterlacakan tersebut merupakan bagian penting dari kualitas dokumentasi audit. IIA Standard 14.6 mensyaratkan dokumentasi engagement audit disusun sedemikian rupa sehingga auditor internal yang memiliki pengetahuan dan kehati-hatian dapat mengulangi pekerjaan dan memperoleh hasil yang sama (IIA, 2024). ISACA ITAF 1205 juga mensyaratkan auditor memperoleh bukti yang cukup dan sesuai untuk menarik kesimpulan yang wajar (ISACA, 2020). Dengan demikian, sistem assessment seharusnya tidak hanya menghasilkan nilai capability level, tetapi juga menyediakan hubungan yang jelas antara aktivitas, rating, dan bukti pendukungnya.

Kebutuhan terhadap instrumen assessment COBIT 2019 yang transparan masih menghadapi keterbatasan. ISACA tidak menerbitkan *Process Assessment Model* (PAM) resmi untuk COBIT 2019. ISACA menjelaskan bahwa CMMI dapat digunakan untuk mengukur capability level COBIT 2019 (ISACA Journal, 2021). Akibatnya, implementasi assessment dapat berbeda antarorganisasi dan perangkat yang digunakan. Hasil telaah terhadap beberapa platform GRC menunjukkan bahwa dukungan COBIT umumnya berupa *content mapping*, yaitu penyediaan daftar objektif, kontrol, atau praktik, bukan implementasi lengkap skala CPM dan rantai agregasi capability level.

Penelitian terdahulu juga telah mengembangkan beberapa prototipe assessment COBIT 2019 berbasis web. Mandiangan (2023) mengembangkan *Capability Assessment Tools* COBIT 2019 menggunakan metode Agile Scrum, tetapi formula penilaian dan pengelolaan evidensi belum didokumentasikan secara memadai. Anwar dan Harits (2025) mengembangkan sistem penilaian berbasis kuesioner, sedangkan Noor (2021) membatasi implementasi pada domain BAI. Penelitian-penelitian tersebut menunjukkan bahwa pengembangan sistem assessment COBIT 2019 telah dilakukan, tetapi masih terdapat ruang pengembangan pada transparansi scoring, manajemen evidensi, dan keterlacakan antara bukti dengan hasil penilaian.

Berdasarkan uraian tersebut, terdapat kesenjangan antara kebutuhan assessment COBIT 2019 yang berbasis bukti dan ketersediaan alat bantu yang dapat mengelola proses tersebut secara transparan. Assessor membutuhkan sistem yang dapat membantu menentukan ruang lingkup assessment, mencatat rating N/P/L/F, menghitung capability level berdasarkan aturan yang terdokumentasi, melakukan analisis kesenjangan, serta menghubungkan setiap rating dengan bukti audit yang relevan.

Penelitian ini mengusulkan rancang bangun sistem pengukuran *Capability Level* COBIT 2019 berbasis web dengan fitur *traceability* evidensi audit. Sistem dirancang untuk mendukung tahap penentuan prioritas objektif melalui Design Factor DF1 sampai DF4, pengisian rating aktivitas berdasarkan CPM, perhitungan capability level, analisis kesenjangan antara level saat ini dan level target, serta pemetaan evidensi terhadap aktivitas atau praktik yang dinilai. Sistem ditempatkan sebagai alat bantu keputusan yang mendukung pekerjaan assessor dan tidak menggantikan penilaian profesional assessor.

Metode penelitian yang digunakan adalah *Design Science Research Methodology* (DSRM) dari Peffers et al. (2007). Metode tersebut sesuai dengan karakteristik penelitian yang menghasilkan artefak berupa sistem informasi. Evaluasi sistem direncanakan melalui *expert review* oleh praktisi atau akademisi yang memahami COBIT 2019, pengujian fungsional menggunakan *black-box testing*, dan pengujian usability menggunakan *System Usability Scale* (SUS). Fitur pembuatan draf rekomendasi berbantuan AI, apabila dikembangkan, ditempatkan sebagai fitur tambahan dan hasilnya tetap harus ditinjau oleh assessor.

Dengan demikian, penelitian ini diharapkan menghasilkan artefak sistem yang memiliki metodologi scoring yang transparan serta mekanisme keterlacakan dari hasil rating menuju bukti audit. Kontribusi tersebut diharapkan dapat membantu proses assessment menjadi lebih terdokumentasi, konsisten, dan mudah ditinjau kembali.

## I.2 Perumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, perumusan masalah dalam penelitian ini adalah sebagai berikut:

1. Bagaimana merancang dan membangun sistem berbasis web yang dapat membantu penentuan prioritas objektif melalui Design Factor DF1 sampai DF4 serta pengukuran *Capability Level* COBIT 2019 secara transparan?
2. Bagaimana mengimplementasikan metode penilaian CPM dengan rating N/P/L/F dan perhitungan *Capability Level* pada sistem berbasis web?
3. Bagaimana mengintegrasikan evidensi audit sehingga setiap rating aktivitas dapat ditelusuri kembali ke dokumen bukti pendukungnya?
4. Bagaimana tingkat fungsionalitas dan usability sistem yang dibangun sebagai alat bantu assessment COBIT 2019?

## I.3 Tujuan Penelitian

Tujuan penelitian ini adalah sebagai berikut:

1. Merancang dan membangun sistem berbasis web untuk membantu penentuan prioritas objektif COBIT 2019 berdasarkan Design Factor DF1 sampai DF4.
2. Mengimplementasikan metode CPM dengan skala rating N/P/L/F dan perhitungan *Capability Level* COBIT 2019 secara transparan.
3. Mengembangkan mekanisme manajemen evidensi yang menghubungkan rating aktivitas dengan dokumen bukti pendukung.
4. Menghasilkan analisis kesenjangan antara *Capability Level* saat ini dan level target beserta informasi pendukung rekomendasi perbaikan.
5. Mengevaluasi fungsionalitas dan usability sistem yang dibangun melalui *black-box testing*, *expert review*, dan pengujian SUS.

## I.4 Batasan Penelitian

Untuk menjaga penelitian tetap terarah, batasan penelitian yang ditetapkan adalah sebagai berikut:

1. Penelitian berfokus pada rancang bangun sistem assessment tata kelola dan manajemen TI berbasis COBIT 2019.
2. Sistem menggunakan COBIT 2019 sebagai kerangka kerja utama, khususnya konsep *Design Factors*, CPM, rating N/P/L/F, dan *Capability Level*.
3. Design Factor yang digunakan dalam penentuan prioritas dibatasi pada DF1 *Enterprise Strategy*, DF2 *Enterprise Goals*, DF3 *Risk Profile*, dan DF4 *I&T-Related Issues*.
4. Implementasi objektif dan aktivitas COBIT 2019 dibatasi pada subset yang ditentukan berdasarkan kebutuhan penelitian dan ketersediaan konten yang dapat digunakan secara sah. Sistem tidak mengklaim telah mengimplementasikan seluruh 40 objektif dan 1.202 aktivitas COBIT 2019.
5. Evidensi yang dikelola berupa metadata dan dokumen bukti yang dipetakan secara manual oleh assessor. Sistem tidak menentukan kebenaran bukti secara otomatis.
6. Rating akhir tetap ditentukan oleh assessor. Sistem hanya membantu pencatatan, penghitungan, dokumentasi, dan penelusuran hasil assessment.
7. Penelitian tidak membahas pembangunan *Process Assessment Model* resmi baru untuk COBIT 2019 dan tidak mengklaim sebagai instrumen resmi ISACA.
8. Sistem dikembangkan sebagai aplikasi web sisi klien menggunakan React dan TypeScript. Penggunaan data organisasi nyata, integrasi ke repositori eksternal, dan implementasi multi-tenant berada di luar cakupan penelitian.
9. Fitur AI atau LLM, apabila digunakan, hanya berfungsi sebagai bantuan penyusunan draf rekomendasi dan bukan bagian utama dari metode penilaian atau pengambilan keputusan audit.

## I.5 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini adalah sebagai berikut:

1. **Bagi assessor atau auditor TI:** menyediakan alat bantu untuk mencatat rating, mengelola evidensi, menghitung capability level, dan menelusuri dasar penilaian secara lebih terstruktur.
2. **Bagi organisasi:** menyediakan informasi mengenai kondisi capability level, kesenjangan terhadap target, serta bukti pendukung yang dapat digunakan sebagai dasar perencanaan perbaikan tata kelola TI.
3. **Bagi akademisi:** memberikan referensi mengenai penerapan COBIT 2019 CPM pada sistem informasi berbasis web, khususnya terkait transparansi scoring dan traceability evidensi.
4. **Bagi peneliti selanjutnya:** menyediakan dasar pengembangan untuk cakupan objektif yang lebih luas, integrasi repositori evidensi, kolaborasi assessor, atau evaluasi pada studi kasus organisasi nyata.

## I.6 Sistematika Laporan

Sistematika laporan penelitian ini disusun untuk memberikan gambaran mengenai isi setiap bab sebagai berikut:

1. **BAB I PENDAHULUAN** membahas latar belakang, perumusan masalah, tujuan penelitian, batasan penelitian, manfaat penelitian, dan sistematika laporan.
2. **BAB II TINJAUAN PUSTAKA** membahas teori dan penelitian terdahulu yang menjadi landasan penelitian, meliputi tata kelola TI, COBIT 2019, CPM, capability level, evidensi audit, traceability, sistem informasi berbasis web, DSRM, dan metode pengujian sistem.
3. **BAB III METODE PENYELESAIAN MASALAH** menjelaskan tahapan penelitian menggunakan DSRM, metode pengumpulan data, analisis kebutuhan, perancangan sistem, rancangan scoring, rancangan manajemen evidensi, serta metode evaluasi.
4. **BAB IV HASIL PENELITIAN** menyajikan hasil analisis, perancangan, implementasi sistem, implementasi perhitungan capability level, implementasi manajemen evidensi, dan hasil pengembangan antarmuka.
5. **BAB V VALIDASI HASIL DAN DISKUSI** membahas hasil pengujian fungsional, hasil expert review, hasil pengujian usability, analisis temuan, serta keterbatasan sistem.
6. **BAB VI KESIMPULAN DAN SARAN** menyajikan kesimpulan berdasarkan tujuan penelitian dan saran untuk pengembangan sistem maupun penelitian selanjutnya.

## Daftar Referensi Sementara

Daftar referensi berikut merupakan sumber awal yang digunakan dalam penyusunan Bab I dan perlu difinalisasi sesuai format sitasi yang ditetapkan program studi:

1. ISACA. (2019). *COBIT 2019 Framework: Introduction and Methodology*.
2. ISACA. (2020). *ITAF: A Professional Practices Framework for IS Audit/Assurance*.
3. ISACA Journal. (2021). “Building a Maturity Model for COBIT 2019 Based on CMMI.”
4. Eulerich, M., Kramer, R., dan Mey, M. (2023). Artikel tentang adopsi teknologi pada fungsi audit internal. *Contemporary Accounting Research*, 40(2).
5. IIA. (2024). *Global Internal Audit Standards*.
6. IIA. (2025). *Vision 2035*.
7. KPMG. (2025). *SOX Survey*.
8. Peffers, K., Tuunanen, T., Rothenberger, M. A., dan Chatterjee, S. (2007). “A Design Science Research Methodology for Information Systems Research.” *Journal of Management Information Systems*, 24(3), 45–77.
9. Mandiangan. (2023). *Rancang Bangun Sistem Informasi Capability Assessment Tools COBIT 2019*. UPN Veteran Jakarta.
10. Anwar dan Harits. (2025). *Perancangan Sistem Kuisioner Penilaian Kapabilitas Framework COBIT 2019*.
11. Noor. (2021). *Implementasi Sistem Penilaian Kapabilitas Tata Kelola TI Berbasis COBIT 2019*. ITTP Purwokerto.
12. Peraturan Pemerintah Republik Indonesia Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
13. Peraturan Presiden Republik Indonesia Nomor 95 Tahun 2018 tentang Sistem Pemerintahan Berbasis Elektronik.
14. Peraturan Menteri Komunikasi dan Informatika Republik Indonesia Nomor 16 Tahun 2022 tentang Audit Teknologi Informasi dan Komunikasi.
