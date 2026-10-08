# Thesis Decision Log

> Chain of thought dan keputusan dari diskusi scope, judul, dan arah penelitian.
> Builds on [`01-literature-review.md`](01-literature-review.md) → [`02-system-design-research.md`](02-system-design-research.md).

**Date:** 2026-09-30  
**Status:** Draft — scope diperbarui; menunggu persetujuan dospem

---

## 1. Scope Decision

### 1.1 Opsi yang Dipertimbangkan

| Opsi | Deskripsi | Verdict |
|------|-----------|---------|
| A | Core Assessment System only (CPM scoring, gap analysis, report) | Terlalu dasar, kurang diferensiasi |
| **B** | **Assessment + Evidence Management** | **Dipilih** |
| C | Assessment + AI/RAG Recommendations | Overload untuk S1 SAGE |
| D | Full: Assessment + Evidence + AI | Jebakan scope creep, tidak realistis |
| E | Assessment + Historical Comparison | Bagus tapi kurang menjawab gap utama |

### 1.2 Alasan Option B Dipilih

1. **Sweet spot kontribusi vs beban kerja.** Traceability evidensi adalah gap nyata yang tidak dijawab tools komersial maupun prototipe akademik.
2. **Prototype sudah ada.** 8 halaman (Dashboard, AssessmentSetup, AssessmentWorkspace, CapabilityResult, GapAnalysis, EvidenceFindings, Recommendations, Landing) sudah siap pondasinya.
3. **Menjawab masalah riil audit.** Auditor kesulitan melacak bukti pendukung untuk setiap rating F/L/P/N. Option B langsung menyelesaikan ini.
4. **Arsitektur scalable.** Meski diimplementasi subset, sistem dirancang extensible ke semua 40 objektif.

### 1.3 Batas Scope Implementasi (Keputusan Terbaru)

Option B tetap menjadi fokus kontribusi: capability assessment dan evidence traceability. Design Factor DF1–DF4 masuk ke alur Assessment Setup sebagai alat penentuan prioritas objektif dan suggested target capability level.

- DF1 Enterprise Strategy, DF2 Enterprise Goals, DF3 Risk Profile, dan DF4 I&T-Related Issues masuk cakupan.
- Assessment Setup yang sudah ada menjadi titik integrasi: metadata dan pemilihan scope manual dikembangkan menjadi setup berbasis DF, dengan assessor tetap mengonfirmasi rekomendasi.
- Capability assessment tetap menjadi fokus utama. Sistem tidak menjanjikan implementasi semua 40 objektif dan 1.202 aktivitas.
- Jumlah objektif/aktivitas yang di-seed masih perlu diputuskan setelah inventarisasi konten COBIT yang dapat digunakan dan konfirmasi dosen.
- Workbook PANRB dari tugas mata kuliah sebelumnya hanya referensi untuk memahami formula/struktur workbook; bukan studi kasus, benchmark resmi ISACA, atau dataset validasi.
- DF5–DF11 berada di luar scope versi ini.

### 1.3 Kenapa Option C/D Ditolak

- **RAG pipeline kompleks:** chunking, embedding, vector DB, retrieval logic, evaluasi metrik (faithfulness, precision/recall).
- **Domain SAGE ≠ AI research.** Penguji lab SAGE menilai tata kelola & rekayasa perangkat lunak, bukan benchmark retrieval AI.
- **Risiko tinggi:** kalau RAG tidak bekerja baik, seluruh skripsi terancam. Padahal rekomendasi COBIT sudah ada template bakunya.
- **Overengineering:** rekomendasi COBIT bisa di-generate dari template + gap analysis tanpa perlu RAG.

---

## 2. AI/RAG Position

### 2.1 Keputusan

- **RAG bukan fokus utama.** Tidak masuk judul, tidak masuk rumusan masalah, tidak masuk bab metodologi.
- **Posisi: fitur bonus opsional** di halaman Recommendations.
- **Implementasi: direct LLM API call** (bukan arsitektur RAG penuh).

### 2.2 Mekanisme Fitur Bonus

```
Gap Analysis Result → Susun prompt ringkas + konteks praktik COBIT
  → Fetch ke LLM API (OpenAI/Anthropic/Gemini)
    → Tampilkan draf rekomendasi di text editor
      → Label: "AI-generated draft — auditor review required"
```

### 2.3 Alasan Posisi Ini Aman

1. **Tidak mengundang pertanyaan rumit.** Penguji tidak akan minta metrik akurasi AI karena bukan fokus penelitian.
2. **Nilai plus di demo.** Penguji melihat fitur AI sebagai value-add, bukan beban metodologi.
3. **Etika audit terjaga.** Label "auditor review required" menegaskan AI hanya assistif, tidak menggantikan penilaian auditor.
4. **Waktu pengerjaan singkat.** 1–2 hari untuk integrasi API call sederhana.

---

## 3. Title Decision

### 3.1 Judul Final

> **Rancang Bangun Sistem Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit**

### 3.2 Formula Judul

```
[Rancang Bangun] + [Output: Pengukuran Capability Level] + [Framework: COBIT 2019]
  + [Platform: Berbasis Web] + [Diferensiasi: Traceability Evidensi Audit]
```

### 3.3 Kenapa Istilah "Capability Level" (Bukan "Maturity Level")

- **COBIT 2019** membedakan:
  - **Capability Level (0–5):** per Process / Governance & Management Objective. Ini yang dihitung dari aktivitas (F/L/P/N).
  - **Maturity Level (0–5):** per Focus Area secara keseluruhan.
- Output sistem ini adalah **Capability Level** per objektif, jadi istilah ini lebih presisi.

### 3.4 Diferensiasi dari Penelitian Terdahulu

| Peneliti | Judul | Kelemahan |
|----------|-------|-----------|
| Mandiangan (2023) | Rancang Bangun Sistem Informasi Capability Assessment Tools COBIT 2019 | Cuma mindahin Excel ke web, rumus tidak transparan, tidak ada evidensi |
| Anwar & Harits (2025) | Perancangan Sistem Kuisioner Penilaian Kapabilitas Framework COBIT 2019 | Salah kaprah: kuesioner persepsi, bukan penilaian berbasis bukti |
| Noor (2021) | Implementasi Sistem Penilaian Kapabilitas Tata Kelola TI Berbasis COBIT 2021 | Cuma 1 domain (BAI), tidak ada manajemen evidensi |
| **Penelitian ini** | **Rancang Bangun Sistem Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit** | **Setup prioritas DF1–DF4 + scoring transparan + evidensi terintegrasi pada scope terbatas** |

---

## 4. Research Questions

### RQ Set (Option B + Design Factor Setup)

**RQ1:** *Bagaimana merancang dan membangun sistem berbasis web yang mendukung penentuan prioritas objektif melalui Design Factor DF1–DF4 serta pengukuran capability level COBIT 2019 secara transparan?*

**RQ2:** *Bagaimana mengintegrasikan manajemen evidensi agar setiap hasil capability level dapat ditelusuri ke dokumen bukti pendukungnya?*

**RQ3:** *Bagaimana tingkat usability sistem ini menurut perspektif assessor/auditor tata kelola TI?*

---

## 5. Methodology

### 5.1 Design Science Research Methodology (DSRM)

Peffers et al. (2007) — pilihan paling tepat untuk paradigma "rancang bangun" di S1 Sistem Informasi.

```
Phase 1: Problem Identification
  → Literature review (done)
  → Problem: No transparent, web-based COBIT 2019 assessment tool with evidence traceability

Phase 2: Solution Design
  → Requirements derivation
  → Architecture design (React 19 + TypeScript SPA)
  → Design Factor DF1–DF4 scoring and scope recommendation
  → Scoring methodology design (F/L/P/N + aggregation)

Phase 3: Development
  → Refine existing prototype
  → Implement scoring engine
  → Implement evidence management
  → Implement gap analysis and recommendations

Phase 4: Evaluation
  → Expert review (2–3 COBIT practitioners)
  → Usability testing (SUS questionnaire, 5–8 assessors)
  → Black-box testing (functional requirements)

Phase 5: Communication
  → Thesis write-up
  → Documentation
```

### 5.2 Evaluation Methods

| Method | What It Measures | S1 Feasibility |
|--------|------------------|----------------|
| Expert review | Correctness of COBIT 2019 implementation | High |
| Usability (SUS) | Ease of use for assessors | High |
| Black-box testing | Functional correctness | High |
| Comparison with manual | Scoring accuracy vs Excel | Medium |

---

## 6. Thesis Description (Untuk Presentasi Dospem)

### 6.1 Latar Belakang

ISACA sebagai penerbit COBIT 2019 tidak menyediakan Process Assessment Model (PAM) resmi. Akibatnya:

1. **Tools komersial** (ServiceNow, Diligent, Hyperproof, MetricStream) hanya menyediakan *content mapping* — daftar kontrol/objektif sebagai referensi — bukan instrumen penilaian yang menghitung capability level.
2. **Prototipe akademik** (Mandiangan 2023, Anwar & Harits 2025, Noor 2021) memindahkan proses Excel ke web, tetapi:
   - Rumus scoring tidak transparan/terdokumentasi.
   - Tidak ada manajemen evidensi — hasil penilaian tidak bisa ditelusuri ke dokumen bukti.
   - Sebagian menggunakan pendekatan kuesioner persepsi, padahal COBIT 2019 mensyaratkan penilaian berbasis bukti riil.
3. **Masalah di lapangan:** Auditor memberikan rating F/L/P/N pada aktivitas COBIT, tetapi tidak ada mekanisme sistematis untuk membuktikan rating tersebut berasal dari dokumen bukti yang mana.

### 6.2 Tujuan

Merancang dan membangun sistem berbasis web yang:

1. Mengimplementasikan skala penilaian CPM COBIT 2019 (F/L/P/N dengan threshold <15% / 15–50% / 50–85% / >85%) secara transparan.
2. Menghitung capability level (0–5) melalui rantai agregasi: **Aktivitas → Praktik → Objektif → Domain**.
3. Menyediakan **traceability evidensi audit** — setiap rating aktivitas terhubung ke dokumen bukti pendukung yang dapat ditelusuri balik.
4. Menghasilkan gap analysis (current vs. target level) beserta rekomendasi perbaikan.

### 6.3 Output Sistem

Aplikasi web (React 19 + TypeScript, client-side SPA) dengan modul:

| Modul | Fungsi |
|-------|--------|
| Assessment Setup | Pilih domain, objektif, periode, design factors |
| Assessment Workspace | Input rating F/L/P/N per aktivitas + lampirkan bukti |
| Capability Result | Kalkulasi level 0–5 dengan jejak agregasi |
| Evidence Management | Upload, kategorisasi, mapping bukti ke praktik/aktivitas |
| Gap Analysis | Current vs. target + visualisasi |
| Recommendations | Rekomendasi perbaikan berbasis gap (+ AI draft opsional) |

---

## 7. Open Questions

| # | Question | Status | Notes |
|---|----------|--------|-------|
| 1 | Berapa objektif/aktivitas COBIT yang di-seed untuk implementasi dan evaluasi? | **Belum diputuskan** | Batasi subset; konfirmasi dosen dan ketersediaan konten resmi. |
| 2 | Apakah kampus mewajibkan studi kasus instansi? | **Belum diputuskan** | PANRB bukan studi kasus penelitian saat ini. |
| 3 | Prioritas: drafting proposal atau revisi prototype dulu? | **Belum diputuskan** | Tergantung timeline sidang |
| 4 | LLM provider untuk fitur bonus? | **Belum diputuskan** | OpenAI / Anthropic / Gemini — pilih yang paling accessible |

---

## 8. Chain of Reasoning

```
01-literature-review.md
  → Identifikasi masalah audit tata kelola TI
  → State of AI/RAG untuk assessment
  → Research gap awal

02-system-design-research.md
  → Tools comparison (komersial, ISACA, open source, akademik)
  → Konfirmasi gap: tidak ada tool yang implementasi CPM transparan + evidensi
  → 5 opsi scope (A–E) dengan trade-offs
  → Rekomendasi: Option A (core only)

Diskusi dengan user
  → Re-evaluasi: Option A terlalu dasar
  → Option B (Assessment + Evidence Management) dipilih
  → Keputusan diperbarui: DF1–DF4 masuk Assessment Setup untuk rekomendasi scope; PANRB hanya referensi workbook
    → Alasan: gap nyata, prototype sudah ada, menjawab masalah audit riil
  → AI/RAG diposisikan sebagai fitur bonus, bukan fokus utama
    → Alasan: overload S1, domain SAGE ≠ AI, overengineering
  → Judul diformulasikan: "Rancang Bangun Sistem Pengukuran Capability Level
    COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit"
    → Alasan: output jelas, diferensiasi kuat, istilah presisi COBIT 2019
  → RQ diformulasikan (3 RQ: rancang bangun, integrasi evidensi, usability)
  → Deskripsi thesis disiapkan untuk presentasi dospem

Status saat ini
  → Scope: Option B + DF1–DF4 setup (diperbarui; menunggu persetujuan dospem)
  → Judul: final
  → RQ: final
  → Metodologi: DSRM (final)
  → Deskripsi: siap presentasi
  → DF1–DF4 masuk Assessment Setup; PANRB hanya referensi formula, bukan studi kasus/dataset
  → Menunggu: keputusan open questions + persetujuan dospem
```

---

## 9. Prototype Current State

### 9.1 Yang Sudah Ada

| Halaman | Status | Catatan |
|---------|--------|---------|
| Dashboard | ✅ | Progress visualization |
| AssessmentSetup | ✅ | Project config, domain selection |
| AssessmentWorkspace | ✅ | Activity rating N/P/L/F |
| CapabilityResult | ✅ | CL 0–5 calculation |
| GapAnalysis | ✅ | Current vs. target |
| EvidenceFindings | ✅ | Evidence management (mock) |
| Recommendations | ✅ | Gap-based generation |
| Landing | ✅ | Entry point |

### 9.2 Yang Perlu Disempurnakan (Option B + DF1–DF4)

| Area | Yang Perlu Dilakukan |
|------|---------------------|
| Scoring engine | Pastikan threshold F/L/P/N sesuai CPM (<15% / 15–50% / 50–85% / >85%) |
| Agregasi | Rantai penuh: Aktivitas → Praktik → Objektif → Domain |
| Evidence mapping | Relasi data evidensi ↔ rating aktivitas (traceability) |
| Evidence validation | Status flow: pending → reviewed → attached |
| AI bonus | Tombol "Generate AI Draft" di Recommendations (direct API call) |
| Design Factor scope | Implementasi DF1–DF4 pada Assessment Setup; verifikasi formula dan batas cakupan sebelum coding |

---

*Document generated: 2026-09-30*  
*Based on: 01-literature-review.md + 02-system-design-research.md + diskusi scope & judul*
