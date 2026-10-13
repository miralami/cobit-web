# COBIT Assessment System (v2.0 Execution Ready)

Sistem Informasi Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit dan Smart Design Factor Engine.

- **Versi:** 2.0 (DSRM Ready)
- **Framework Referensi:** ISACA COBIT 2019 Framework, Design Guide, & Performance Management (CPM)
- **Metodologi Riset:** Design Science Research Methodology (DSRM)
- **Validasi Matematis:** Pengujian unit + *reference-calculation oracle* independen untuk engine CPM (`npm test`). Bukan klaim "identik dengan Excel ISACA" — COBIT 2019 tidak menyediakan workbook penghitung capability.

---

## Fitur Utama

1. **Smart Design Factor Engine (Step 2 Canvas):**
   - Mengimplementasikan perhitungan DF1 (Strategi Organisasi), DF2 (Enterprise Goals / BSC), DF3 (Profil Risiko TI), dan DF4 (Isu Masalah I&T) menggunakan perkalian matriks standar ISACA 40 objektif.
   - Normalisasi skor Canvas Step 2 $(-100 \text{ s/d } +100)$ dengan auto-suggest target capability level.

2. **Mesin CPM Level 2–5 yang Transparan & Dapat Dikonfigurasi:**
   - Evaluasi bertingkat aktivitas COBIT 2019 dengan skala *Yes (1.0), Partially (0.5), No (0.0), N.A.*
   - Persentase pemenuhan per level, predikat CPM (*F, L, P, N*) memakai ambang **ISO/IEC 33020:2019 §5.3** (≤15% N · ≤50% P · ≤85% L · >85% F).
   - **Gate agregasi dapat dipilih** (`aggregate-85` default, `all-l-or-f`, `iso-staged`) dan ditampilkan eksplisit ke pengguna — karena ISACA tidak menetapkan formula agregasi resmi, aturan ini dilabeli *adaptasi operasional*, bukan standar ISACA. **Aturan yang dipertahankan sebagai acuan penelitian: `aggregate-85`** (level tercapai ketika pemenuhan agregat melewati ambang *Fully* >85%); dua aturan lain disertakan sebagai uji ketahanan (*robustness*).
   - **Sensitivitas aturan** (level per gate) dan **rantai agregasi** (audit trail *Stop Here*) ditampilkan pada halaman hasil.
   - Level yang seluruh aktivitasnya N.A. ditandai **Insufficient Evidence**, bukan otomatis dinilai N.

3. **Assessment Management (Multi-Assessment, Snapshot & Perbandingan):**
   - Riwayat *snapshot* ringkas per assessment (`cobit_assessment_snapshots_v1`) berisi level, gap, dan gate yang aktif saat snapshot dibuat.
   - Halaman perbandingan baseline → candidate dengan delta rata-rata level, total gap, objektif tercapai, dan dokumen bukti.

4. **Traceability Bukti Audit Dua Arah + Workflow Verifikasi:**
   - Forward Traceability: penautan dokumen/kutipan pada butir aktivitas.
   - Backward Traceability: register bukti yang menampilkan chip seluruh aktivitas terkait.
   - Status verifikasi bukti **pending → reviewed → attached** yang dapat dimajukan dari register.

5. **Matriks Rekomendasi 3 Dimensi:**
   - Klasifikasi rekomendasi perbaikan berbasis gap ke dalam aspek **People** (Tanggung jawab, pelatihan), **Process** (Kebijakan, SOP), dan **Technology** (Alat, enkripsi, otomasi).
   - Dukungan cetak bersih untuk lampiran skripsi.

6. **State Persistence & Dataset Demo:**
   - Tersinkronisasi otomatis ke `localStorage` (`cobit_assessment_store_v2`).
   - Tombol instan *Load Benchmark Dataset* memuat **data demo sintetis** (`src/data/benchmarkData.ts`) untuk keperluan demonstrasi — bukan dataset empiris Kementerian PANRB maupun benchmark resmi ISACA.
   - Fitur Ekspor dan Impor JSON untuk portabilitas asesmen.

---

## Perintah Proyek

```bash
# Menjalankan test suite (reference-calculation oracle untuk engine CPM)
npm test

# Menjalankan type-check dan production build
npm run build

# Menjalankan linter oxlint
npm run lint

# Menjalankan development server
npm run dev
```

---

## Hasil Pengujian Otomatis (`npm test`)

Suite pengujian memvalidasi implementasi terhadap aturan yang **didokumentasikan sendiri** oleh sistem:

- **`engine.test.ts` (regression):** memastikan hasil engine tetap konsisten dengan perilaku yang diharapkan pada dataset demo.
  - **Test Case 1:** Perhitungan DF1 Relative Scores (EDM01=+5, EDM02=+30, EDM03=+25, APO02=-20, DSS05=+35) — cocok dengan workbook pembanding (bukan benchmark resmi ISACA).
  - **Test Case 2:** Normalisasi Canvas 40 Objektif (MaxScale = 285, EDM03=+20, DSS04=+65, DSS05=+50) — cocok dengan workbook pembanding.
  - **Test Case 3:** CPM Gatekeeper & Stop Here Rule (DSS05 Level 2, pemenuhan 50% [Partially] → Stop Here pada Level 1, Gap = 3).
- **`referenceCalculation.test.ts` (independent oracle):** menghitung ulang hasil yang diharapkan secara manual/independen dari aturan CPM terdokumentasi, lalu membandingkannya dengan engine. Mencakup batas N/P/L/F, divergensi antar-gate, *insufficient evidence* untuk level N.A., dan kebijakan pengecualian N.A. dari penyebut.

> Catatan integritas klaim: pengujian ini membuktikan **ekuivalensi implementasi** terhadap aturan yang dipilih (verifikasi), bukan bahwa hasil COBIT "benar" secara bisnis. ISACA tidak menerbitkan workbook penghitung capability maupun formula agregasi resmi untuk COBIT 2019.
