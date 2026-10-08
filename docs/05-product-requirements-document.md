# Product Requirements Document (PRD) & Master Execution Blueprint
## Sistem Informasi Pengukuran Capability Level COBIT 2019 Berbasis Web dengan Traceability Evidensi Audit

- **Versi Dokumen:** 2.0 (Execution Ready)
- **Tanggal:** 08 Oktober 2026
- **Status:** Draft aligned with current decision (DF1–DF4 Setup + Option B Assessment/Evidence)
- **Framework Referensi:** ISACA COBIT 2019 Framework, Design Guide, & Performance Management (CPM)
- **Metodologi Riset:** Design Science Research Methodology (DSRM - Peffers et al., 2007)
- **Lokasi Repositori:** `C:\Users\Sena\Documents\GitHub\cobit-web`

---

## DAFTAR ISI
1. [Latar Belakang Masalah & Value Proposition](#1-latar-belakang-masalah--value-proposition)
2. [Audit As-Is Codebase & Gap Analysis](#2-audit-as-is-codebase--gap-analysis)
3. [Spesifikasi Matematis & Rumus Referensi Workbook](#3-spesifikasi-matematis--rumus-referensi-workbook)
4. [Skema Data & Type Definitions (TypeScript)](#4-skema-data--type-definitions-typescript)
5. [Spesifikasi Seed Data & Matriks COBIT](#5-spesifikasi-seed-data--matriks-cobit)
6. [Spesifikasi Antarmuka & Wireframe Flow (Per Halaman)](#6-spesifikasi-antarmuka--wireframe-flow-per-halaman)
7. [Arsitektur State Management & Persistence](#7-arsitektur-state-management--persistence)
8. [Formula Verification Plan](#8-formula-verification-plan-workbook-reference)
9. [Grand Execution Plan & File-by-File Task Matrix](#9-grand-execution-plan--file-by-file-task-matrix)

---

## 1. Latar Belakang Masalah & Value Proposition

### 1.1 Masalah Riil
1. **Ketiadaan PAM Resmi ISACA:** ISACA tidak menerbitkan *Process Assessment Model* (PAM) resmi untuk COBIT 2019 (ISACA Journal, 2021). Akibatnya, software GRC komersial (ServiceNow, Diligent, Hyperproof) hanya menyediakan pemetaan teks statis, bukan instrumen penilaian berjenjang.
2. **Keterputusan Bukti Audit (Traceability Gap):** Di lapangan, auditor menentukan status pemenuhan aktivitas, namun hasil audit sering terputus dari dokumen bukti fisik/digital (SOP, notulensi, log, rekaman).
3. **Kekhawatiran Dosen Pembimbing:** Dosen menganggap memindahkan seluruh mekanisme toolkit COBIT 2019 (27 sheet Excel) ke aplikasi web akan memakan waktu terlalu lama dan berisiko gagal selesai tepat waktu.

### 1.2 Solusi Strategis (Option 1)
Membangun aplikasi web *Single Page Application* (React 19 + TypeScript) yang:
* **Generik & Terbuka:** Dapat digunakan oleh organisasi apa pun untuk menghitung skor prioritas dan kapabilitas.
* **Smart Design Factor Engine:** Mengimplementasikan kalkulator Design Factor Step 2 (DF1–DF4) dalam kode TypeScript teroptimasi (<150 baris) menggunakan perkalian matriks standar ISACA.
* **Hierarki CPM Level 2–5 Otomatis:** Mengimplementasikan skala penilaian CPM (*Fully, Largely, Partially, Not Achieved*) dengan ambang batas $85\%$ dan aturan *Stop Here* yang ketat.
* **Traceability Dua Arah:** Menghubungkan setiap butir penilaian ke dokumen bukti pendukung (*forward traceability*) dan melihat pemanfaatan setiap bukti pada butir asesmen (*backward traceability*).
* **Formula Verification:** Memverifikasi hasil Design Factor terhadap workbook referensi dan hasil hitung independen. File PANRB dari tugas sebelumnya hanya sumber pembanding formula; bukan studi kasus atau dataset aplikasi.

---

## 2. Audit As-Is Codebase & Gap Analysis

| Modul / File | Status Kode Saat Ini | Gap Fungsional Terhadap Target PRD |
| :--- | :--- | :--- |
| **`AssessmentSetup.tsx`** | Form 3 langkah: metadata, pilih domain, pilih objektif. | **Belum ada modul Design Factor.** Integrasikan DF1–DF4 ke halaman setup yang sudah ada; hasil prioritas membantu pemilihan objektif dan target, tetap dikonfirmasi assessor. |
| **`AssessmentWorkspace.tsx`** | Memuat 3–4 butir mock per objektif; rating `not-achieved`, `partially-achieved`, `largely-achieved`, `fully-achieved`; state React lokal. | **Belum mencerminkan CPM yang direncanakan.** Belum ada struktur aktivitas Level 2–5, agregasi CPM, *Stop Here*, atau persistensi. Skala input masih perlu diputuskan dan dipetakan. |
| **`EvidenceFindings.tsx`** | Tabel register bukti dari `mockData.ts`. Tombol *"Add evidence"* berstatus `disabled`. | **Tidak ada CRUD bukti.** Pengguna tidak dapat menambah, mengedit, atau menautkan dokumen bukti baru ke butir asesmen. |
| **`CapabilityResult.tsx`** | Menampilkan kartu hasil kapabilitas hardcoded dari `mockData.ts`. | **Kalkulasi tidak reaktif.** Level saat ini tidak dihitung otomatis dari respon pada workspace asesmen. |
| **`GapAnalysis.tsx`** | Tabel gap statis dari `mockData.ts`. | **Nilai delta statis.** Tidak menghitung selisih Target vs Current secara dinamis dari hasil asesmen aktif. |
| **`Recommendations.tsx`** | Placeholder yang menjelaskan rekomendasi belum tersedia. | **Belum ada tabel rekomendasi.** Belum ada rekomendasi rule-based per gap, termasuk klasifikasi *People, Process, Technology*. |
| **Data Layer (`mockData.ts`)** | Array statis dan sample values; sebagian input workspace hanya di React state. | **Belum ada persistensi lintas halaman.** Belum ada katalog aktivitas COBIT lengkap atau `localStorage`. Data PANRB bukan dataset benchmark default. |

---

## 3. Spesifikasi Matematis & Rumus Referensi Workbook

Sistem wajib mengimplementasikan formula perhitungan yang konsisten dengan formula pada workbook referensi yang tersedia. Workbook tersebut bukan file resmi ISACA yang diterbitkan oleh ISACA; hasilnya dipakai sebagai referensi implementasi dan perlu diverifikasi secara independen.

### 3.1 Design Factor 1: Enterprise Strategy (DF1)
* **Input:** Vektor $\mathbf{X}_{\text{DF1}} = [x_1, x_2, x_3, x_4]^T$, nilai skala $1 \text{ s/d } 5$.
  * $x_1$: Growth / Acquisition
  * $x_2$: Innovation / Differentiation
  * $x_3$: Cost Leadership
  * $x_4$: Client Service / Stability
* **Baseline:** Vektor $\mathbf{B}_{\text{DF1}} = [3, 3, 3, 3]^T$.
* **Matriks Bobot Mapping:** $\mathbf{M}_{\text{DF1}}$ berukuran $40 \times 4$ (diambil dari sheet `DF1map`).
* **Faktor Koreksi ($CF_{\text{DF1}}$):**
  $$CF_{\text{DF1}} = \frac{\text{mean}(\mathbf{B}_{\text{DF1}})}{\text{mean}(\mathbf{X}_{\text{DF1}})} = \frac{3.0}{\frac{1}{4}\sum_{j=1}^4 x_j}$$
* **Perhitungan Skor per Objektif ($i = 1 \dots 40$):**
  $$\text{ScoreRaw}_{i, \text{DF1}} = \sum_{j=1}^4 \mathbf{M}_{i,j} \cdot x_j$$
  $$\text{BaseRaw}_{i, \text{DF1}} = \sum_{j=1}^4 \mathbf{M}_{i,j} \cdot 3$$
  $$\text{RelativeScore}_{i, \text{DF1}} = \text{MROUND}\left(CF_{\text{DF1}} \times 100 \times \frac{\text{ScoreRaw}_{i, \text{DF1}}}{\text{BaseRaw}_{i, \text{DF1}}}, 5\right) - 100$$
  *(Jika terjadi division by zero atau error, bernilai 0)*.

### 3.2 Design Factor 2: Enterprise Goals (DF2)
* **Input:** Vektor $\mathbf{X}_{\text{DF2}} = [x_1, \dots, x_{13}]^T$, nilai skala $1 \text{ s/d } 5$ (EG01 s/d EG13).
* **Baseline:** Vektor $\mathbf{B}_{\text{DF2}} = [3, \dots, 3]^T$ (13 elemen).
* **Matriks Bobot Mapping:** $\mathbf{M}_{\text{DF2}}$ berukuran $40 \times 13$ (sheet `DF2map`).
* **Faktor Koreksi ($CF_{\text{DF2}}$):**
  $$CF_{\text{DF2}} = \frac{3.0}{\frac{1}{13}\sum_{j=1}^{13} x_j}$$
* **Skor Relatif per Objektif:**
  $$\text{RelativeScore}_{i, \text{DF2}} = \text{MROUND}\left(CF_{\text{DF2}} \times 100 \times \frac{\sum_{j=1}^{13} \mathbf{M}_{i,j} \cdot x_j}{\sum_{j=1}^{13} \mathbf{M}_{i,j} \cdot 3}, 5\right) - 100$$

### 3.3 Design Factor 3: Risk Profile (DF3)
* **Input:** 19 Kategori Risiko. Untuk setiap kategori $j$, assessor menginput:
  * Impact ($I_j \in [1..5]$)
  * Likelihood ($L_j \in [1..5]$)
  * Rating Risiko Aktual: $R_j = I_j \times L_j \in [1..25]$.
* **Baseline:** $B_j = 3 \times 3 = 9$ untuk seluruh 19 kategori.
* **Matriks Bobot Mapping:** $\mathbf{M}_{\text{DF3}}$ berukuran $40 \times 19$ (sheet `DF3map`).
* **Faktor Koreksi ($CF_{\text{DF3}}$):**
  $$CF_{\text{DF3}} = \frac{9.0}{\frac{1}{19}\sum_{j=1}^{19} R_j}$$
* **Skor Relatif per Objektif:**
  $$\text{RelativeScore}_{i, \text{DF3}} = \text{MROUND}\left(CF_{\text{DF3}} \times 100 \times \frac{\sum_{j=1}^{19} \mathbf{M}_{i,j} \cdot R_j}{\sum_{j=1}^{19} \mathbf{M}_{i,j} \cdot 9}, 5\right) - 100$$

### 3.4 Design Factor 4: I&T-Related Issues (DF4)
* **Input:** Vektor $\mathbf{X}_{\text{DF4}} = [x_1, \dots, x_{20}]^T$, nilai skala $1 \text{ s/d } 3$.
  * 1 = No issue / Low issue
  * 2 = Moderate issue
  * 3 = Serious issue
* **Baseline:** $\mathbf{B}_{\text{DF4}} = [2, \dots, 2]^T$ (20 elemen).
* **Matriks Bobot Mapping:** $\mathbf{M}_{\text{DF4}}$ berukuran $40 \times 20$ (sheet `DF4map`).
* **Faktor Koreksi ($CF_{\text{DF4}}$):**
  $$CF_{\text{DF4}} = \frac{2.0}{\frac{1}{20}\sum_{j=1}^{20} x_j}$$
* **Skor Relatif per Objektif:**
  $$\text{RelativeScore}_{i, \text{DF4}} = \text{MROUND}\left(CF_{\text{DF4}} \times 100 \times \frac{\sum_{j=1}^{20} \mathbf{M}_{i,j} \cdot x_j}{\sum_{j=1}^{20} \mathbf{M}_{i,j} \cdot 2}, 5\right) - 100$$

### 3.5 Canvas Step 2: Total Weighted Score & Normalisasi
Bobot bawaan ISACA untuk masing-masing Design Factor:
* $W_{\text{DF1}} = 2$
* $W_{\text{DF2}} = 1$
* $W_{\text{DF3}} = 3$
* $W_{\text{DF4}} = 4$

1. **Total Skor Terbobot per Objektif ($i = 1 \dots 40$):**
   $$F_i = W_{\text{DF1}} \cdot \text{Rel}_{i,\text{DF1}} + W_{\text{DF2}} \cdot \text{Rel}_{i,\text{DF2}} + W_{\text{DF3}} \cdot \text{Rel}_{i,\text{DF3}} + W_{\text{DF4}} \cdot \text{Rel}_{i,\text{DF4}}$$
2. **Faktor Skala Maksimal Canvas:**
   $$\text{MaxScale} = \max\left(\max_{k=1}^{40}(F_k), -\min_{k=1}^{40}(F_k)\right)$$
3. **Skor Normalisasi Akhir ($G_i \in [-100, +100]$):**
   $$G_i = \begin{cases}
   \text{MROUND}\left(\text{TRUNC}\left(100 \times \frac{F_i}{\text{MaxScale}}\right), 5\right) & \text{jika } F_i \ge 0 \\
   \text{MROUND}\left(\text{TRUNC}\left(100 \times \frac{F_i}{\text{MaxScale}}\right), -5\right) & \text{jika } F_i < 0
   \end{cases}$$
4. **Suggested Target Capability Level ($T_i \in [1..4]$):**
   $$T_i = \begin{cases}
   4 & \text{jika } G_i \ge 75 \\
   3 & \text{jika } G_i \ge 50 \\
   2 & \text{jika } G_i \ge 25 \\
   1 & \text{jika } G_i < 25
   \end{cases}$$

### 3.6 Logika Evaluasi Kapabilitas (COBIT Performance Management) — Perlu Konfirmasi Metode
Untuk setiap objektif yang diaudit, dilakukan penilaian per level kapabilitas ($L = 2, 3, 4, 5$).
1. **Konversi Respon Aktivitas:**
   * Jangan otomatis menyamakan jawaban `Yes/Partially/No/N.A.` dengan rating CPM `N/P/L/F`.
   * Workbook PANRB menggunakan Yes=1, Partially=0.5, No=0, N.A.=0; itu implementasi worksheet tugas, bukan bukti bahwa skala tersebut identik dengan CPM resmi.
   * Tetapkan model input berdasarkan sumber CPM yang dipilih dan persetujuan pembimbing. Jika menggunakan agregat persentase aktivitas, dokumentasikan sebagai asumsi operasional sistem.
2. **Persentase Pemenuhan Level $L$ ($P_L$):**
   $$N_{\text{valid}} = \text{Count}(\text{Aktivitas Level } L \text{ yang bukan N.A.})$$
   $$P_L = \begin{cases} 0 & \text{jika } N_{\text{valid}} = 0 \\ \frac{\sum \text{Skor Aktivitas Level } L}{N_{\text{valid}}} & \text{jika } N_{\text{valid}} > 0 \end{cases}$$
3. **Predikat CPM Level $L$:**
   $$\text{Rating}_L = \begin{cases}
   \text{Not Achieved (N)} & \text{jika } P_L \le 0.15 \\
   \text{Partially Achieved (P)} & \text{jika } 0.15 < P_L \le 0.50 \\
   \text{Largely Achieved (L)} & \text{jika } 0.50 < P_L \le 0.85 \\
   \text{Fully Achieved (F)} & \text{jika } P_L > 0.85
   \end{cases}$$
4. **Aturan Gerbang (*Stop Here* Rule) & Capaian Akhir:**
   * Level 1 dianggap tercapai jika minimal terdapat proses berjalan dasar.
   * Suatu level $L$ hanya dianggap lulus jika $\text{Rating}_L = \text{'Fully Achieved'}$.
   * **Gerbang:** Pada aturan agregat workbook referensi, level berstatus Fully bila pemenuhan $>85\%$; bila tidak, *Stop Here!* dan level berikutnya tidak dinilai. Konfirmasi terhadap sumber CPM sebelum menyebutnya aturan resmi COBIT.
   * Level Kapabilitas Aktual ($C_{\text{actual}}$):
     $$C_{\text{actual}} = \max \{ L \in \{1, 2, 3, 4, 5\} \mid \forall k \le L, \text{Rating}_k = \text{'F'} \}$$
     *(Jika Level 2 tidak tercapai penuh, maka $C_{\text{actual}} = 1$)*.
5. **Kalkulasi Kesenjangan (Gap):**
   $$\text{Gap} = \max(0, \text{Target Level} - C_{\text{actual}})$$

---

## 4. Skema Data & Type Definitions (TypeScript)

Didefinisikan dalam file `src/types/index.ts`:

```typescript
export type COBITDomain = 'EDM' | 'APO' | 'BAI' | 'DSS' | 'MEA';
export type CapabilityLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type ResponseRating = 'Yes' | 'Partially' | 'No' | 'N.A.';
export type CPMRating = 'N' | 'P' | 'L' | 'F';

export interface DesignFactorWeights {
  df1: number; // default: 2
  df2: number; // default: 1
  df3: number; // default: 3
  df4: number; // default: 4
}

export interface DF1Input {
  growth: number;        // 1-5
  innovation: number;    // 1-5
  costLeadership: number;// 1-5
  clientService: number; // 1-5
}

export interface DF2Input {
  // EG01 through EG13 (1-5)
  goals: Record<string, number>;
}

export interface DF3Input {
  // 19 generic IT risk categories
  risks: Record<string, { impact: number; likelihood: number }>;
}

export interface DF4Input {
  // 20 generic IT-related issues (1-3)
  issues: Record<string, number>;
}

export interface DFCalculationResult {
  objectiveId: string;
  name: string;
  domain: COBITDomain;
  scoreDF1: number;
  scoreDF2: number;
  scoreDF3: number;
  scoreDF4: number;
  totalScore: number;
  normalizedScore: number; // -100 to +100
  suggestedTargetLevel: CapabilityLevel;
}

export interface AssessmentActivity {
  id: string;               // e.g. "DSS05.01-1"
  activityNumber: number;   // e.g. 1
  level: CapabilityLevel;   // 2, 3, 4, or 5
  description: string;
  response: ResponseRating | null;
  comment: string;
  evidenceIds: string[];    // IDs of linked evidence
}

export interface LevelAssessmentResult {
  level: CapabilityLevel;
  validCount: number;
  totalScore: number;
  fulfillmentPercentage: number; // 0.0 - 1.0
  cpmRating: CPMRating;          // N, P, L, F
  isComplete: boolean;           // true if > 0.85
  status: 'Complete!' | 'Stop Here!';
}

export interface ObjectiveAssessmentData {
  objectiveId: string;
  targetLevel: CapabilityLevel;
  currentLevel: CapabilityLevel;
  activities: AssessmentActivity[];
  levelResults: Record<number, LevelAssessmentResult>;
  gap: number;
}

export interface EvidenceRecord {
  id: string;
  title: string;
  type: 'policy' | 'procedure' | 'record' | 'documentation' | 'log' | 'interview' | 'other';
  referenceNumber?: string;  // e.g. "SOP-TI-04" / "Interview 01:10:45"
  assessor: string;
  date: string;
  notes: string;
  linkedActivityIds: string[]; // IDs of activities this evidence supports
}

export interface RecommendationItem {
  id: string;
  objectiveId: string;
  practiceCode: string;
  gapDescription: string;
  peopleAspect: {
    type: 'Responsibility' | 'Skill & awareness' | 'Communication';
    action: string;
  };
  processAspect: {
    type: 'Policy' | 'Procedure' | 'Record';
    action: string;
  };
  technologyAspect: {
    type: 'Features' | 'Infrastructure' | 'Automation';
    action: string;
  };
}

export interface FullAssessmentState {
  id: string;
  title: string;
  organization: string;
  assessor: string;
  period: string;
  weights: DesignFactorWeights;
  df1: DF1Input;
  df2: DF2Input;
  df3: DF3Input;
  df4: DF4Input;
  dfResults: DFCalculationResult[];
  scopedObjectiveIds: string[];
  objectiveTargets: Record<string, CapabilityLevel>;
  assessments: Record<string, ObjectiveAssessmentData>;
  evidenceList: EvidenceRecord[];
  recommendations: RecommendationItem[];
  updatedAt: string;
}
```

---

## 5. Spesifikasi Seed Data & Matriks COBIT

### 5.1 Matriks Mapping JSON (`src/data/cobitDesignFactors.json`)
Diekstrak langsung dari workbook ISACA resmi:
1. `df1_mapping`: Matriks $40 \times 4$ yang memetakan 40 objektif terhadap 4 Archetype Strategi.
2. `df2_mapping`: Matriks $40 \times 13$ yang memetakan 40 objektif terhadap 13 Enterprise Goals.
3. `df3_mapping`: Matriks $40 \times 19$ yang memetakan 40 objektif terhadap 19 Kategori Risiko.
4. `df4_mapping`: Matriks $40 \times 20$ yang memetakan 40 objektif terhadap 20 Isu TI.
5. `objectives`: Daftar lengkap 40 objektif COBIT (kode, nama, domain, deskripsi singkat).

### 5.2 Assessment Activity Catalogue (`src/data/cobitActivities.json`)
Subset objektif/aktivitas yang disediakan sistem belum diputuskan. PANRB spreadsheet berasal dari tugas sebelumnya, bukan studi kasus penelitian. Sebelum mengisi katalog, tetapkan subset bersama pembimbing dan verifikasi sumber serta hak penggunaan konten. Implementasi penelitian dibatasi pada subset yang disetujui.

---

## 6. Spesifikasi Antarmuka & Wireframe Flow (Per Halaman)

```
[ Navigasi Utama: Top Header & Step Rail ]
  Landing ──> Setup (DF1-4 & Scope) ──> Workspace (CPM Assessment) ──> Evidence ──> Results ──> Gap Analysis ──> Recommendations
```

### 6.1 Halaman Setup & Design Factor (`/assessments/setup`)
Pertahankan route dan halaman setup yang sudah ada; perluas wizard 3 langkah menjadi metadata → DF1–DF4 → review scope.
* **Metadata:** Nama organisasi, judul assessment, assessor, periode.
* **DF1 Enterprise Strategy:** 4 archetypes, importance 1–5.
* **DF2 Enterprise Goals:** 13 goals, importance 1–5.
* **DF3 Risk Profile:** 19 kategori, impact dan likelihood 1–5; risk rating mengikuti formula workbook yang diverifikasi.
* **DF4 I&T-Related Issues:** 20 isu, importance 1–3.
* **Review hasil & scope:**
  * Tampilan grafik batang horizontal skor normalisasi seluruh 40 objektif (warna hijau untuk $>0$, abu-abu/merah untuk $\le 0$).
  * Tabel rekomendasi Top Priority Objectives: menampilkan skor akhir, suggested target level, dan checkbox seleksi ruang lingkup audit.
  * Form kustomisasi Target Level (1–5) per objektif yang dipilih.
  * Assessor mengonfirmasi atau mengubah objektif/target; rekomendasi tidak mengunci scope otomatis.
  * Tombol *"Mulai Assessment"* melanjutkan flow setup yang sudah ada ke Workspace.

### 6.2 Halaman Assessment Workspace (`/assessments/workspace/:objectiveId`)
* **Header:** Dropdown selector antar objektif yang dipilih, domain badge, Target Level badge, dan Live Current Capability Level badge.
* **Blok Level Berjenjang (Level 2 s/d Level 5):**
  * Setiap level memiliki kartu header yang memuat: Indikator Persentase Pemenuhan, Predikat CPM (F/L/P/N), dan Status Banner (*"Complete!"* warna hijau atau *"Stop Here!"* warna kuning/merah).
  * Di dalam level, terdapat tabel daftar aktivitas:
    * Kolom No & Butir Aktivitas COBIT.
    * Kolom Skala Respon: Radio Button Segmented Control (`Yes`, `Partially`, `No`, `N.A.`).
    * Kolom Evidensi: Menampilkan badge bukti terlampir (klik badge membuka drawer detail) + tombol *"+ Tautkan Bukti"*.
    * Kolom Komentar Assessor: Input teks catatan pertimbangan audit.
* **Live Calculation:** Mengubah radio button seketika memperbarui persentase level, predikat CPM, aturan Stop Here, dan Current Level di header.

### 6.3 Halaman Evidence Register & Traceability (`/evidence`)
* **Statistik Atas:** Total Bukti, Bukti Terverifikasi (*Reviewed*), Bukti Terlampir (*Attached*), dan Jumlah Butir yang Belum Memiliki Bukti (*Unevidenced Items*).
* **Bilah Filter:** Pencarian teks, filter kategori bukti (*Policy*, *Record*, dll.), dan filter berdasarkan objektif terkait.
* **Tabel Utama:**
  * Judul Dokumen & Tipe.
  * Nomor Referensi / Lokasi File.
  * Tanggal & Assessor.
  * **Backward Traceability:** Kolom *"Linked Activities"* menampilkan chips kode aktivitas yang didukung oleh dokumen ini (misal: `DSS05.01-1`, `DSS05.01-2`).
* **Modal Dialog *"Tambah / Edit Bukti"*:**
  * Input Title, Type, Reference/URL, Assessor, Date, Notes.
  * Multi-select checklist aktivitas COBIT yang ingin dihubungkan dengan bukti ini.

### 6.4 Halaman Hasil Kapabilitas (`/results`)
* **Visualisasi Ringkasan:** Radar Chart / Grouped Bar Chart membandingkan Current Level vs Target Level di semua objektif yang diaudit.
* **Panel Kartu Detail Objektif:**
  * Current Level (besar) vs Target Level (besar), selisih Gap badge.
  * Rantai Agregasi: Log rekam jejak evaluasi Level 2 s/d 5 yang membuktikan mengapa proses berhenti pada level tersebut (misal: *"Level 2: 87.5% (F) -> Lulus; Level 3: 50.0% (P) -> Gagal, Stop Here pada Level 2"*).
  * Daftar Kekuatan (*Strengths*) dan Kelemahan (*Gaps*).

### 6.5 Halaman Analisis Kesenjangan (`/gap-analysis`)
* **Ringkasan:** Total Gap Levels, Kesenjangan Terlebar (*Widest Gap*), Rata-rata Pemenuhan Target.
* **Tabel Komparasi:** Menampilkan daftar objektif, target, capaian, nilai gap kuantitatif, dan status penyelesaian (*Achieved / Gap*).

### 6.6 Halaman Rekomendasi Perbaikan (`/recommendations`)
* **Tabel Matriks 3 Aspek:**
  * Kolom Objektif & Area Kesenjangan (Gap).
  * **Aspek People:** Tanggung jawab, pelatihan, kesadaran personel.
  * **Aspek Process:** Penyusunan SOP, peninjauan kebijakan formal, dokumentasi register.
  * **Aspek Technology:** Penggunaan fitur teknis, otomasi kontrol, enkripsi, dashboard.
* **Aksi Ekspor:** Tombol *"Cetak / Ekspor Laporan Rekomendasi"* (menghasilkan format cetak bersih untuk lampiran skripsi).

---

## 7. Arsitektur State Management & Persistence

1. **State Store (`src/context/AssessmentContext.tsx`):**
   * Menggunakan React Context + `useReducer` / clean custom hooks.
   * State tersinkronisasi otomatis ke `window.localStorage` dengan key `cobit_assessment_store_v2`.
2. **Fitur Pengendali State:**
   * `loadSampleAssessment()`: Memuat data sintetis untuk demo. Data PANRB tidak menjadi dataset aplikasi.
   * `resetToDefault()`: Mengembalikan aplikasi ke kondisi awal bersih.
   * `exportStateJSON()`: Mengunduh file backup konfigurasi assessment.
   * `importStateJSON(file)`: Memulihkan konfigurasi assessment dari file JSON.

---

## 8. Formula Verification Plan (Workbook Reference)

Untuk memenuhi kaidah **DSRM**, verifikasi formula memakai input dan expected output yang dicatat serta diperiksa. Workbook PANRB hanya pembanding implementasi tugas, bukan benchmark resmi ISACA atau dataset validasi eksternal.

### Test Case 1: Design Factor DF1 Engine
* **Input:** Growth = 1, Innovation = 2, Cost Leadership = 1, Client Service = 5.
* **Baseline:** [3, 3, 3, 3].
* **Ekspektasi:**
  * $CF_{\text{DF1}} = 3.0 / 2.25 = 1.3333$
  * EDM01 Relative Score = `5`
  * EDM02 Relative Score = `30`
  * EDM03 Relative Score = `25`
  * APO02 Relative Score = `-20`
  * DSS05 Relative Score = `30`

### Test Case 2: Canvas Step 2 Normalisasi
* **Input:** Catat input/output workbook sebagai fixture beserta sumber dan asumsi formula; jangan menyebut fixture PANRB dataset resmi.
* **Ekspektasi Skor Normalisasi:**
  * EDM03 = `+20` (Suggested Target = 2)
  * DSS04 = `+75` (Suggested Target = 4)
  * DSS05 = `+80` (Suggested Target = 4)
  * APO12 = `+75` (Suggested Target = 4)
  * MEA03 = `+75` (Suggested Target = 4)

### Test Case 3: CPM Fulfillment & Stop Here Rule (DSS05)
* **Aktivitas Level 2:** Fixture sintetis untuk menguji rumus (dua butir bernilai Partially [0.5]).
  * Persentase = $(0.5 + 0.5) / 2 = 50\%$.
  * Predikat = `P (Partially Achieved)`.
  * **Gerbang:** $\le 85\% \rightarrow$ **Stop Here!**
  * Current Capability Level yang dihasilkan = **Level 1** (karena Level 2 belum *Fully*).
  * Target Level = **4**. Gap = $4 - 1 = \mathbf{3}$.

---

## 9. Grand Execution Plan & File-by-File Task Matrix

Implementasi dibagi menjadi 6 tahap terstruktur:

```
[ Phase 1: Engine & Reference Data ]
├── src/data/cobitDesignFactors.json  --> Ekstraksi DF1map-DF4map & 40 Objektif
├── src/data/cobitActivities.json     --> Katalog subset objektif/aktivitas yang disetujui pembimbing
├── src/utils/designFactorEngine.ts   --> Matrix multiplication & Canvas Step 2 calculation
├── src/utils/cpmEngine.ts            --> CPM scoring, threshold, & Stop Here gatekeeper
└── src/utils/__tests__/engine.test.ts --> Script verifikasi akurasi matematis vs Excel
                      │
                      ▼
[ Phase 2: State Store & Persistence Layer ]
├── src/types/index.ts                --> Pembaruan interface sesuai PRD
├── src/data/sampleAssessment.ts      --> Data sintetis untuk demo; bukan PANRB
└── src/context/AssessmentContext.tsx --> Central state store + localStorage sync
                      │
                      ▼
[ Phase 3: Setup UI - Design Factor Wizard ]
├── src/pages/AssessmentSetup.tsx     --> Existing setup expanded with DF1-DF4 + scope review
└── src/pages/AssessmentSetup.css     --> Styling visual modern & bar visualizer
                      │
                      ▼
[ Phase 4: Workspace UI - CPM Hierarchical Assessment ]
├── src/pages/AssessmentWorkspace.tsx --> Struktur berjenjang Level 2-5 + interaksi scoring
├── src/components/EvidenceModal.tsx  --> Modal penautan bukti ke aktivitas
└── src/pages/AssessmentWorkspace.css --> Styling progress bar level & stop-here badge
                      │
                      ▼
[ Phase 5: Evidence Register, Results, Gap, & Recommendations ]
├── src/pages/EvidenceFindings.tsx    --> CRUD bukti & backward traceability chips
├── src/pages/CapabilityResult.tsx    --> Live current level, aggregation trail, charts
├── src/pages/GapAnalysis.tsx         --> Dynamic gap matrix & target comparison
├── src/pages/Recommendations.tsx     --> Matriks rekomendasi 3 aspek (People, Process, Tech)
└── src/pages/Dashboard.tsx           --> Live assessment summary & resume button
                      │
                      ▼
[ Phase 6: Verifikasi & Build Quality ]
├── Run automated calculation tests   --> Verifikasi formula vs recorded workbook fixtures
├── Oxlint & Type-check (`npm run build`)
└── Update README & dokumentasi skripsi
```

Dokumen ini menjadi acuan mutlak selama proses pengembangan. Setiap baris kode yang ditulis harus tunduk pada kaidah matematis dan batasan arsitektur di atas.
