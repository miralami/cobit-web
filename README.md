# COBIT Assessment System (v2.0 Execution Ready)

Sistem Informasi Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit dan Smart Design Factor Engine.

- **Versi:** 2.0 (DSRM Ready)
- **Framework Referensi:** ISACA COBIT 2019 Framework, Design Guide, & Performance Management (CPM)
- **Metodologi Riset:** Design Science Research Methodology (DSRM)
- **Validasi Matematis:** Terverifikasi 100% identik dengan Toolkit Resmi ISACA Excel (`npm test`)

---

## Fitur Utama

1. **Smart Design Factor Engine (Step 2 Canvas):**
   - Mengimplementasikan perhitungan DF1 (Strategi Organisasi), DF2 (Enterprise Goals / BSC), DF3 (Profil Risiko TI), dan DF4 (Isu Masalah I&T) menggunakan perkalian matriks standar ISACA 40 objektif.
   - Normalisasi skor Canvas Step 2 $(-100 \text{ s/d } +100)$ dengan auto-suggest target capability level.

2. **Hierarki CPM Level 2–5 Otomatis:**
   - Evaluasi bertingkat aktivitas COBIT 2019 dengan skala *Yes (1.0), Partially (0.5), No (0.0), N.A.*
   - Perhitungan persentase pemenuhan per level, predikat CPM (*F, L, P, N*), ambang batas $85\%$, dan aturan gerbang *Stop Here!* yang ketat.

3. **Traceability Bukti Audit Dua Arah:**
   - Forward Traceability: Penautan dokumen/kutipan wawancara langsung pada butir aktivitas.
   - Backward Traceability: Register bukti audit yang menampilkan chip seluruh aktivitas yang disubsidi oleh dokumen terkait.

4. **Matriks Rekomendasi 3 Dimensi:**
   - Klasifikasi rekomendasi perbaikan berbasis gap ke dalam aspek **People** (Tanggung jawab, pelatihan), **Process** (Kebijakan, SOP), dan **Technology** (Alat, enkripsi, otomasi).
   - Dukungan cetak bersih untuk lampiran skripsi.

5. **State Persistence & Benchmark Dataset Ground Truth:**
   - Tersinkronisasi otomatis ke `localStorage` (`cobit_assessment_store_v2`).
   - Tombol instan *Load Benchmark Dataset* (dataset riset empiris Kementerian PANRB).
   - Fitur Ekspor dan Impor JSON untuk portabilitas asesmen.

---

## Perintah Proyek

```bash
# Menjalankan test suite validasi matematis vs Excel ISACA
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

Suite pengujian matematis memvalidasi:
- **Test Case 1:** Perhitungan DF1 Relative Scores (EDM01=+5, EDM02=+30, EDM03=+25, APO02=-20, DSS05=+35) $\rightarrow$ 100% Match vs Excel.
- **Test Case 2:** Normalisasi Canvas 40 Objektif (MaxScale = 285, EDM03=+20, DSS04=+65, DSS05=+50) $\rightarrow$ 100% Match vs Excel.
- **Test Case 3:** CPM Gatekeeper & Stop Here Rule (DSS05 Level 2 50% [Partially] $\rightarrow$ Stop Here pada Level 1, Gap = 3) $\rightarrow$ 100% Match vs Excel.
