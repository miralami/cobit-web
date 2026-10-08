import type { FullAssessmentState, EvidenceRecord, RecommendationItem, ObjectiveAssessmentData } from '../types';
import cobitActivitiesData from './cobitActivities.json';
import { calculateDesignFactors } from '../utils/designFactorEngine';
import { calculateObjectiveAssessment } from '../utils/cpmEngine';

export const BENCHMARK_EVIDENCE: EvidenceRecord[] = [
  {
    "id": "EVD-001",
    "title": "Evidence for EDM03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(0:25–1:07) Risiko TI yang paling sering menjadi perhatian organisasi adalah gangguan jaringan internet dan keamanan informasi. Narasumber menyampaikan bahwa \"kalau berdasarkan insiden yang sering terjadi, nomor satu itu adalah kendala jaringan internet\" dan \"yang kedua, keamanan\". Selain itu, pemantauan dilakukan secara rutin karena \"kalau pemantauan, pasti setiap hari ya. Tapi kan by system kan, kan ada IPS ya.\"",
    "linkedActivityIds": [
      "EDM03.01-2"
    ]
  },
  {
    "id": "EVD-002",
    "title": "Evidence for EDM03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:18–1:36) Organisasi telah memiliki batas layanan yang dijadikan acuan dalam pengelolaan risiko TI. Narasumber menjelaskan bahwa \"SLA-nya ada, tapi berapa-berapanya saya nggak tahu\".",
    "linkedActivityIds": [
      "EDM03.02-2"
    ]
  },
  {
    "id": "EVD-003",
    "title": "Evidence for EDM03 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:42–2:17) Prioritas penanganan risiko ditentukan berdasarkan kondisi operasional dan tingkat kepentingan layanan. Narasumber menjelaskan bahwa \"pertama pasti based on manajemen risiko lagi\" dan \"misalnya lagi pendaftaran CPNS, pas lagi dipakai gangguan berarti kan top priority itu\".",
    "linkedActivityIds": [
      "EDM03.03-2"
    ]
  },
  {
    "id": "EVD-004",
    "title": "Evidence for EDM03 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(2:32–2:50) Risiko TI dibahas dalam konteks risiko organisasi ketika terjadi insiden tertentu. Narasumber menyampaikan bahwa pembahasan dilakukan \"pembahasan risiko dilakukan ketika insiden tersebut terjadi\". Namun belum ditemukan bukti adanya evaluasi risiko TI yang terintegrasi dan dilakukan secara rutin dalam manajemen risiko organisasi.",
    "linkedActivityIds": [
      "EDM03.04-2"
    ]
  },
  {
    "id": "EVD-005",
    "title": "Evidence for EDM03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(3:25–3:33) Belum ditemukan SOP formal terkait pengelolaan risiko TI. Narasumber menyatakan bahwa \"kalau SOP saya kayaknya belum pernah lihat SOP ya\" dan \"secara dokumen kayaknya belum ada sih\".",
    "linkedActivityIds": [
      "EDM03.01-2"
    ]
  },
  {
    "id": "EVD-006",
    "title": "Evidence for EDM03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(3:41–4:03) Informasi terkait keamanan sistem disampaikan kepada pegawai melalui sosialisasi dan pengumuman tertentu. Narasumber menjelaskan bahwa informasi keamanan \"diumumkan dalam kondisi tertentu\" dan \"sosialisasi rutin, setahun-setahun kali ya\". Namun komunikasi risiko belum dilakukan secara intensif dan terstruktur.",
    "linkedActivityIds": [
      "EDM03.02-2"
    ]
  },
  {
    "id": "EVD-007",
    "title": "Evidence for EDM03 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(4:09–4:42) Organisasi telah memiliki mekanisme pelaporan dan eskalasi insiden melalui contact center. Narasumber menyatakan bahwa \"kita punya contact center sih, HaloDatin\" dan \"kalau ada insiden, ada trouble-trouble kita kontaknya ke sana\". Selain itu, telah terdapat PIC yang jelas dalam proses penanganan insiden.",
    "linkedActivityIds": [
      "EDM03.03-2"
    ]
  },
  {
    "id": "EVD-008",
    "title": "Evidence for EDM03 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(4:47–4:58) Organisasi telah menyediakan mekanisme pelaporan gangguan yang dapat digunakan oleh seluruh pegawai. Narasumber menyampaikan bahwa \"udah, siapapun bisa melaporkan\".",
    "linkedActivityIds": [
      "EDM03.04-2"
    ]
  },
  {
    "id": "EVD-009",
    "title": "Evidence for EDM03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(5:11–5:31) Organisasi telah menerapkan mekanisme persetujuan dalam pemberian akses layanan TI. Narasumber menjelaskan bahwa \"itu pasti ada mekanisme dasarnya, bisa daftar approval\".",
    "linkedActivityIds": [
      "EDM03.01-2"
    ]
  },
  {
    "id": "EVD-010",
    "title": "Evidence for EDM03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-EDM03-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:07–1:15) pemantauan dilakukan secara rutin karena \"kalau pemantauan, pasti setiap hari ya\" dan dilakukan menggunakan sistem monitoring, yaitu \"kan ada IPS ya\".",
    "linkedActivityIds": [
      "EDM03.02-3"
    ]
  },
  {
    "id": "EVD-011",
    "title": "Evidence for EDM03 (Act 3)",
    "type": "documentation",
    "referenceNumber": "Ref-EDM03-L4-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "Hasil monitoring biasanya dicatat dan ditindaklanjuti apabila terdapat gangguan atau kendala pada sistem. Namun, belum terlihat adanya laporan risiko yang dibuat secara khusus dan berkala.",
    "linkedActivityIds": [
      "EDM03.03-4"
    ]
  },
  {
    "id": "EVD-012",
    "title": "Evidence for EDM03 (Act 4)",
    "type": "documentation",
    "referenceNumber": "Ref-EDM03-L4-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "Apabila terdapat kejadian atau gangguan yang cukup penting, informasi tersebut biasanya disampaikan kepada pimpinan. Namun, belum ditemukan informasi mengenai pelaporan risiko TI yang dilakukan secara rutin sebagai bahan evaluasi pimpinan.",
    "linkedActivityIds": [
      "EDM03.04-4"
    ]
  },
  {
    "id": "EVD-013",
    "title": "Evidence for APO12 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:34:04–01:34:39] Proses pengumpulan/klasifikasi/analisis data risiko ada dalam manajemen risiko umum, bukan spesifik I&T. [01:35:50–01:35:53] Risk register ada.",
    "linkedActivityIds": [
      "APO12.01-2"
    ]
  },
  {
    "id": "EVD-014",
    "title": "Evidence for APO12 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:35:07–01:35:30] Pencatatan dan dokumentasi khusus belum ada; biasanya langsung disimpan, belum ada metode khusus.",
    "linkedActivityIds": [
      "APO12.02-2"
    ]
  },
  {
    "id": "EVD-015",
    "title": "Evidence for APO12 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:36:05–01:36:22] Tidak punya taksonomi khusus; langsung asesmen penyebab dan mitigasi. [01:36:53–01:37:26] Ada 12 kategori risiko mengacu PermenPANRB No. 5 Tahun 2020.",
    "linkedActivityIds": [
      "APO12.03-3"
    ]
  },
  {
    "id": "EVD-016",
    "title": "Evidence for APO12 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:38:26–01:38:54] Dampak kerugian didokumentasikan dan frekuensi kejadian risiko dicatat. [01:36:05–01:36:22] Tidak ada taksonomi khusus.",
    "linkedActivityIds": [
      "APO12.04-3"
    ]
  },
  {
    "id": "EVD-017",
    "title": "Evidence for APO12 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:07:56–02:08:16] Kejadian masa lalu dianalisis dan dijadikan pembelajaran; tidak ada evidence spesifik untuk sumber historis eksternal.",
    "linkedActivityIds": [
      "APO12.05-4"
    ]
  },
  {
    "id": "EVD-018",
    "title": "Evidence for APO12 (Act 6)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-6",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:37:05] Ada 12 kategori risiko. [02:06:59–02:07:36] Risiko dikategorikan berdasarkan area seperti aplikasi, infrastruktur, kepatuhan, keamanan. [01:36:15] Asesmen melihat penyebab dan mitigasi.",
    "linkedActivityIds": [
      "APO12.06-4"
    ]
  },
  {
    "id": "EVD-019",
    "title": "Evidence for APO12 (Act 7)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-7",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:02:23–02:02:50] Tindak lanjut diarahkan ke penyebab, misalnya sumber bocor. [02:03:47–02:04:35] Mitigasi menekan dampak, tetapi penyebab yang harus dibereskan.",
    "linkedActivityIds": [
      "APO12.07-4"
    ]
  },
  {
    "id": "EVD-020",
    "title": "Evidence for APO12 (Act 8)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-8",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:37:53–01:38:02] Risiko I&T diperbarui mengikuti periode penerapan manajemen risiko.",
    "linkedActivityIds": [
      "APO12.08-4"
    ]
  },
  {
    "id": "EVD-021",
    "title": "Evidence for APO12 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:36:53–01:37:26] Ada 12 kategori risiko, mengacu PermenPANRB No. 5 Tahun 2020; terdapat kategori risiko dan dampaknya.",
    "linkedActivityIds": [
      "APO12.01-3"
    ]
  },
  {
    "id": "EVD-022",
    "title": "Evidence for APO12 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:37:53–01:38:54] Risiko I&T diperbarui sesuai periode manajemen risiko; dampak kerugian dan frekuensi kejadian risiko dicatat.",
    "linkedActivityIds": [
      "APO12.02-3"
    ]
  },
  {
    "id": "EVD-023",
    "title": "Evidence for APO12 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:39:32–01:39:47] Ada risk appetite; contoh di bawah 10 tidak ditindaklanjuti. [02:01:36–02:02:16] Dampak 1–5 dikalikan frekuensi 1–5, maksimum 25.",
    "linkedActivityIds": [
      "APO12.03-3"
    ]
  },
  {
    "id": "EVD-024",
    "title": "Evidence for APO12 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:40:37–01:40:47] Risiko di atas batas ditindaklanjuti. [01:48:53–01:49:24] Risiko >20 menjadi perhatian dan harus segera ditindaklanjuti/dimitigasi.",
    "linkedActivityIds": [
      "APO12.04-3"
    ]
  },
  {
    "id": "EVD-025",
    "title": "Evidence for APO12 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:07:56–02:08:16] Kejadian masa lalu dianalisis sebagai bahan pembelajaran.",
    "linkedActivityIds": [
      "APO12.05-3"
    ]
  },
  {
    "id": "EVD-026",
    "title": "Evidence for APO12 (Act 6)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-6",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:48:53–01:49:24] Risiko >20 harus ditindaklanjuti/dimitigasi. [02:03:47–02:04:35] Mitigasi diarahkan ke penyebab, misalnya bocor diperbaiki atau pintu ditambah gembok.",
    "linkedActivityIds": [
      "APO12.06-3"
    ]
  },
  {
    "id": "EVD-027",
    "title": "Evidence for APO12 (Act 7)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-7",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:51:16–01:51:29] Hasil analisis risiko atau BIA tidak dipakai untuk pengambilan keputusan.",
    "linkedActivityIds": [
      "APO12.07-4"
    ]
  },
  {
    "id": "EVD-028",
    "title": "Evidence for APO12 (Act 8)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L5-8",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:00:56–02:01:36] Penyusunan/prioritas tindak lanjut berdasarkan besaran risiko/risk appetite. [01:57:53–01:58:54] Untuk risiko tinggi biasanya mencari win-win dan cenderung cari aman.",
    "linkedActivityIds": [
      "APO12.08-5"
    ]
  },
  {
    "id": "EVD-029",
    "title": "Evidence for APO12 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:51:51–01:52:30] Tidak semuanya dicatat; kebanyakan dikelola mandiri; sebagian tetap ada yang dicatat, tetapi ketergantungan tidak tinggi.",
    "linkedActivityIds": [
      "APO12.01-2"
    ]
  },
  {
    "id": "EVD-030",
    "title": "Evidence for APO12 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:52:40–01:53:15] Penyepakatan layanan esensial ada di standar pelayanan, domain layanan arsitektur, dan SOP. [01:51:51–01:52:30] Ketergantungan I&T/vendor tidak semuanya dicatat.",
    "linkedActivityIds": [
      "APO12.02-2"
    ]
  },
  {
    "id": "EVD-031",
    "title": "Evidence for APO12 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:53:24–01:54:15] Form manajemen risiko tidak ada kolom proses bisnis; bisa dikaitkan manual. [01:54:43–01:55:16] Risiko digabungkan per unit kerja, termasuk risiko TIK.",
    "linkedActivityIds": [
      "APO12.03-2"
    ]
  },
  {
    "id": "EVD-032",
    "title": "Evidence for APO12 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:54:43–01:55:16] Informasi profil risiko dikonsolidasikan per unit kerja; risiko dalam unit kerja masuk ke profil risiko unit tersebut, termasuk risiko TIK.",
    "linkedActivityIds": [
      "APO12.04-3"
    ]
  },
  {
    "id": "EVD-033",
    "title": "Evidence for APO12 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:59:21–01:59:41] Dokumen manajemen risiko memuat PIC, waktu tindak lanjut, review, dan cara penanganan. [02:00:09–02:00:26] Unit kerja dan Inspektorat memantau risiko/tindak lanjut.",
    "linkedActivityIds": [
      "APO12.05-3"
    ]
  },
  {
    "id": "EVD-034",
    "title": "Evidence for APO12 (Act 6)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-6",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:01:36–02:02:16] Risk appetite memakai tabel dampak 1–5 dan frekuensi 1–5, dikalikan hingga maksimum 25.",
    "linkedActivityIds": [
      "APO12.06-4"
    ]
  },
  {
    "id": "EVD-035",
    "title": "Evidence for APO12 (Act 7)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-7",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:38:26–01:38:54] Dampak kerugian dan frekuensi kejadian risiko dicatat. [02:06:43–02:07:36] Insiden tidak dikategorikan khusus; yang dikategorikan adalah risiko.",
    "linkedActivityIds": [
      "APO12.07-4"
    ]
  },
  {
    "id": "EVD-036",
    "title": "Evidence for APO12 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:55:37–01:55:49] Stakeholder diberi tahu skenario risiko, potensi kerugian, dan dampaknya saat pengambilan keputusan.",
    "linkedActivityIds": [
      "APO12.01-3"
    ]
  },
  {
    "id": "EVD-037",
    "title": "Evidence for APO12 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:57:23–01:57:35] Risiko dan opsi penanganan tercatat, tinggal keputusan yes/no pimpinan. [01:57:53–01:58:54] Risiko tinggi dipertimbangkan dan cenderung dicari opsi aman.",
    "linkedActivityIds": [
      "APO12.02-3"
    ]
  },
  {
    "id": "EVD-038",
    "title": "Evidence for APO12 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:56:00–01:56:40] Risiko terkini tidak dilaporkan ke semua stakeholder; yang bisa melihat hanya unit kerja tersebut dan Inspektorat.",
    "linkedActivityIds": [
      "APO12.03-3"
    ]
  },
  {
    "id": "EVD-039",
    "title": "Evidence for APO12 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:56:55–01:57:35] Keputusan/peluang berisiko tinggi dicatat dan opsi penanganannya ada. [01:57:53–01:58:54] Dampak tinggi dipertimbangkan, biasanya dicari solusi aman.",
    "linkedActivityIds": [
      "APO12.04-3"
    ]
  },
  {
    "id": "EVD-040",
    "title": "Evidence for APO12 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:00:18–02:00:26] Inspektorat memantau tindak lanjut risiko pada level kementerian.",
    "linkedActivityIds": [
      "APO12.05-4"
    ]
  },
  {
    "id": "EVD-041",
    "title": "Evidence for APO12 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[01:59:21–01:59:41] Siapa yang menangani, kapan ditindaklanjuti, review, dan cara penanganan ada di dokumen manajemen risiko.",
    "linkedActivityIds": [
      "APO12.01-2"
    ]
  },
  {
    "id": "EVD-042",
    "title": "Evidence for APO12 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:00:09–02:00:26] Unit kerja memantau risiko internal; Inspektorat memantau tindak lanjut risiko pada level kementerian.",
    "linkedActivityIds": [
      "APO12.02-3"
    ]
  },
  {
    "id": "EVD-043",
    "title": "Evidence for APO12 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:00:56–02:01:30] Prioritas tindak lanjut sesuai besaran risiko. [02:01:36–02:02:16] Risk appetite memakai dampak 1–5 dan frekuensi 1–5.",
    "linkedActivityIds": [
      "APO12.03-3"
    ]
  },
  {
    "id": "EVD-044",
    "title": "Evidence for APO12 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:03:03–02:03:35] Tidak semua rencana respons diuji; kebakaran ada simulasi. [02:04:41–02:06:34] Eskalasi dilakukan bila unit tidak mampu/tidak berwenang, contoh ruang server bocor, vendor internet, tikus.",
    "linkedActivityIds": [
      "APO12.01-3"
    ]
  },
  {
    "id": "EVD-045",
    "title": "Evidence for APO12 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:03:47–02:04:35] Ada mitigasi risiko; penyebab yang harus dibereskan, contoh bocor diperbaiki dan kemalingan ditambah gembok.",
    "linkedActivityIds": [
      "APO12.02-3"
    ]
  },
  {
    "id": "EVD-046",
    "title": "Evidence for APO12 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:06:43–02:07:36] Insiden tidak ada pengategorian khusus; yang dikategorikan adalah risiko berdasarkan area seperti aplikasi, infrastruktur, kepatuhan, keamanan.",
    "linkedActivityIds": [
      "APO12.03-4"
    ]
  },
  {
    "id": "EVD-047",
    "title": "Evidence for APO12 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L4-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:07:56–02:08:16] Kejadian masa lalu dianalisis sebagai bahan pembelajaran. [02:08:22–02:08:42] Root cause, kebutuhan respons tambahan, dan perbaikan proses dikomunikasikan.",
    "linkedActivityIds": [
      "APO12.04-4"
    ]
  },
  {
    "id": "EVD-048",
    "title": "Evidence for APO12 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-APO12-L5-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "[02:08:22–02:08:42] Root cause, kebutuhan respons tambahan, dan perbaikan proses dikomunikasikan kepada pengambil keputusan dan masuk ke tata kelola risiko.",
    "linkedActivityIds": [
      "APO12.05-5"
    ]
  },
  {
    "id": "EVD-049",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(01:10:45) Mitigation plan memang diterapkan dalam manajemen risiko. Ketika suatu risiko muncul, biasanya sudah terdapat contingency plan untuk menangani risiko tersebut. Hal tersebut umumnya tertuang dalam dokumen manajemen risiko",
    "linkedActivityIds": [
      "DSS04.01-3"
    ]
  },
  {
    "id": "EVD-050",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(01:11:20) Ada tim khusus untuk menganani manajemen risiko",
    "linkedActivityIds": [
      "DSS04.02-3"
    ]
  },
  {
    "id": "EVD-051",
    "title": "Evidence for DSS04 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:11:59) Tidak ada BCP",
    "linkedActivityIds": [
      "DSS04.03-3"
    ]
  },
  {
    "id": "EVD-052",
    "title": "Evidence for DSS04 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:12:32) Melalui manajemen risiko dan arsitektur sistem biasanya sudah terdapat mapping antara layanan, aplikasi, dan proses bisnis. Dengan adanya mapping tersebut, ketika terjadi suatu insiden, dapat diketahui layanan atau proses bisnis mana yang terdampak dan mengalami gangguan.",
    "linkedActivityIds": [
      "DSS04.04-3"
    ]
  },
  {
    "id": "EVD-053",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:13:25) Daftar potensi risiko dan insiden biasanya sudah didokumentasikan berdasarkan pengalaman insiden yang pernah terjadi sebelumnya. Risiko-risiko tersebut kemudian dilisting sebagai bahan antisipasi terhadap kemungkinan insiden yang dapat terjadi di masa mendatang.",
    "linkedActivityIds": [
      "DSS04.01-2"
    ]
  },
  {
    "id": "EVD-054",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:14:00) Belum terdapat kajian khusus mengenai dampak apabila layanan TI mengalami gangguan atau downtime. Penanganan yang dilakukan saat ini lebih bersifat berdasarkan insiden yang terjadi secara langsung (doing by incident).",
    "linkedActivityIds": [
      "DSS04.02-2"
    ]
  },
  {
    "id": "EVD-055",
    "title": "Evidence for DSS04 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:14:36) Terdapat Service Level Agreement (SLA) sebagai acuan batas layanan ketika terjadi gangguan atau downtime. Setiap layanan memiliki ketentuan SLA yang berbeda-beda, termasuk terkait batas toleransi downtime dan target availability layanan.",
    "linkedActivityIds": [
      "DSS04.03-2"
    ]
  },
  {
    "id": "EVD-056",
    "title": "Evidence for DSS04 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:15:28) Sudah ada timnya Itu, jadi ketika itu mengalami kendala, maka tim tersebut yang bertanggung jawab untuk memperbaiki.",
    "linkedActivityIds": [
      "DSS04.04-2"
    ]
  },
  {
    "id": "EVD-057",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:16:12) Terdapat prosedur komunikasi internal dan eksternal ketika terjadi insiden atau gangguan, biasanya dilakukan melalui pengumuman, community, maupun WhatsApp agar dapat segera ditindaklanjuti.",
    "linkedActivityIds": [
      "DSS04.01-2"
    ]
  },
  {
    "id": "EVD-058",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:17:20) Gangguan pada pihak ketiga atau vendor cukup sering terjadi dan berdampak pada layanan, terutama terkait gangguan internet dan layanan yang terhubung dengan Pusat Data Nasional.",
    "linkedActivityIds": [
      "DSS04.02-2"
    ]
  },
  {
    "id": "EVD-059",
    "title": "Evidence for DSS04 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:18:20) Prosedur pemulihan belum terdokumentasi secara tertulis dan masih bersifat pengetahuan umum di dalam tim berdasarkan pengalaman masing-masing personel.",
    "linkedActivityIds": [
      "DSS04.03-2"
    ]
  },
  {
    "id": "EVD-060",
    "title": "Evidence for DSS04 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:19:20) Belum terdapat dokumen Business Continuity Plan (BCP) dan Disaster Recovery Plan (DRP). Penyusunan dokumen tersebut terkendala anggaran karena proses pembuatannya biasanya melibatkan pihak vendor.",
    "linkedActivityIds": [
      "DSS04.04-2"
    ]
  },
  {
    "id": "EVD-061",
    "title": "Evidence for DSS04 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:20:00) Tidak terdapat anggaran khusus yang dialokasikan untuk proses recovery atau penanganan insiden. Ketika terjadi insiden, tindak lanjut dilakukan langsung oleh pegawai internal tanpa melibatkan vendor, sehingga umumnya tidak memerlukan anggaran tambahan.",
    "linkedActivityIds": [
      "DSS04.05-2"
    ]
  },
  {
    "id": "EVD-062",
    "title": "Evidence for DSS04 (Act 6)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-6",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:20:30) Sudah ada kebijakan resmi untuk melakukan backup data.",
    "linkedActivityIds": [
      "DSS04.06-2"
    ]
  },
  {
    "id": "EVD-063",
    "title": "Evidence for DSS04 (Act 7)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-7",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:21:10) Terdapat tim yang secara khusus bertanggung jawab menangani insiden yang terjadi. Anggota tim tersebut diharapkan memiliki kompetensi yang sesuai, khususnya dalam bidang keamanan dan pengelolaan pusat data. Untuk mendukung kompetensi tersebut, pegawai juga mengikuti berbagai pelatihan yang relevan.",
    "linkedActivityIds": [
      "DSS04.07-2",
      "DSS04.03-2"
    ]
  },
  {
    "id": "EVD-064",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:22:30) Organisasi pernah menyusun tujuan, strategi, dan skenario yang ingin dicapai dalam pelaksanaan simulasi atau penanganan insiden. Skenario tersebut digunakan sebagai acuan dalam mengantisipasi dan merespons berbagai kemungkinan insiden yang dapat terjadi.",
    "linkedActivityIds": [
      "DSS04.01-2"
    ]
  },
  {
    "id": "EVD-065",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:23:05) Tidak pernah melakukan simulasi atau latihan yang melibatkan berbagai unit kerja.",
    "linkedActivityIds": [
      "DSS04.02-2"
    ]
  },
  {
    "id": "EVD-066",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:24:50) Terdapat proses monitoring dan evaluasi secara informal untuk memastikan rencana tetap sesuai dengan kondisi terkini. Kegiatan tersebut dilakukan secara rutin melalui pertemuan berkala, diskusi di lingkungan kerja, maupun komunikasi melalui WhatsApp.",
    "linkedActivityIds": [
      "DSS04.01-3"
    ]
  },
  {
    "id": "EVD-067",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:25:54) Perubahan pada vendor atau pihak ketiga dapat memengaruhi rencana keberlangsungan layanan. Namun, perubahan tersebut umumnya diatur melalui kontrak dan proses adendum. Sebelum perubahan disetujui, organisasi terlebih dahulu mempertimbangkan dampaknya terhadap kebutuhan dan kondisi internal.",
    "linkedActivityIds": [
      "DSS04.02-3"
    ]
  },
  {
    "id": "EVD-068",
    "title": "Evidence for DSS04 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:26:30) Terdapat proses untuk menilai apakah suatu perubahan memerlukan pembaruan kajian dampak bisnis.",
    "linkedActivityIds": [
      "DSS04.03-3"
    ]
  },
  {
    "id": "EVD-069",
    "title": "Evidence for DSS04 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L3-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:27:05) Terdapat catatan perubahan (log) yang digunakan untuk mendokumentasikan perubahan atau revisi yang dilakukan terhadap sistem maupun layanan.",
    "linkedActivityIds": [
      "DSS04.04-3"
    ]
  },
  {
    "id": "EVD-070",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:27:35) Pegawai diberikan arahan dan panduan penanganan insiden, termasuk langkah-langkah yang harus dilakukan ketika terjadi gangguan layanan.",
    "linkedActivityIds": [
      "DSS04.01-2"
    ]
  },
  {
    "id": "EVD-071",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:28:50) Backup data dilakukan secara rutin. Namun, periode atau jadwal pelaksanaan backup tidak diketahui secara pasti oleh narasumber.",
    "linkedActivityIds": [
      "DSS04.01-2"
    ]
  },
  {
    "id": "EVD-072",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:29:20) Belum terdapat ketentuan atau regulasi resmi yang mengatur lokasi penyimpanan data cadangan. Penentuan lokasi penyimpanan backup saat ini lebih didasarkan pada pemahaman dan praktik yang telah disepakati secara internal.",
    "linkedActivityIds": [
      "DSS04.02-2"
    ]
  },
  {
    "id": "EVD-073",
    "title": "Evidence for DSS04 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:29:52) Data cadangan yang tersimpan dilakukan pengujian untuk memastikan data dapat digunakan kembali apabila diperlukan dalam proses pemulihan.",
    "linkedActivityIds": [
      "DSS04.03-2"
    ]
  },
  {
    "id": "EVD-074",
    "title": "Evidence for DSS04 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:31:30) Data dan sistem yang dikelola telah memiliki prosedur pencadangan (backup) yang ditetapkan, baik oleh pihak internal maupun vendor yang terkait.",
    "linkedActivityIds": [
      "DSS04.04-2"
    ]
  },
  {
    "id": "EVD-075",
    "title": "Evidence for DSS04 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:32:10) Terdapat proses evaluasi terhadap penanganan insiden dan penerapan prosedur yang telah ditetapkan, meskipun narasumber tidak dapat menjelaskan secara pasti mekanisme pelaksanaannya.",
    "linkedActivityIds": [
      "DSS04.01-2"
    ]
  },
  {
    "id": "EVD-076",
    "title": "Evidence for DSS04 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS04-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:32:47) Setelah insiden selesai ditangani, evaluasi biasanya difokuskan pada penyebab terjadinya insiden sebagai bahan perbaikan dan pencegahan agar kejadian serupa tidak terulang kembali.",
    "linkedActivityIds": [
      "DSS04.02-2"
    ]
  },
  {
    "id": "EVD-077",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(2:48) \"Kalo di server pastinya sudah ya, Biro Datin sudah melakukan secara menyeluruh, tetapi kalau laptop saya gak yakin. Karena kalau windows biasanya sudah ada bawaan windows defender\"",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-078",
    "title": "Evidence for DSS05 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(4:40) \"Kita pake Zimbra untuk email kantornya, sejauh ini masih sering sekali masuk email yang berkonotasi negatif, tindak lanjut dilakukan manual\"",
    "linkedActivityIds": [
      "DSS05.02-2"
    ]
  },
  {
    "id": "EVD-079",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(6:43) \"Di kementrianPANRB AP (Access Point) nya itu ada 'bersih melayani', dan 'tamu kantor'. 'Bersih melayani' hanya digunakan oleh pegawai PANRB\".",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-080",
    "title": "Evidence for DSS05 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(8:00) \"Firewall dalam bentuk software maupun hardware ada. IDS ada juga dan beberapakali pernah deteksi serangan yang masuk ke jaringan PANRB\"",
    "linkedActivityIds": [
      "DSS05.02-2"
    ]
  },
  {
    "id": "EVD-081",
    "title": "Evidence for DSS05 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(8:40) \"HTTPS Pasti, VPN itu hanya digunakan ketika mengakses layanan elektronik kantor ketika diluar kantor. Kalo dikantor tidak pake VPN.\"",
    "linkedActivityIds": [
      "DSS05.03-2"
    ]
  },
  {
    "id": "EVD-082",
    "title": "Evidence for DSS05 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(9:30) \"Ada expertise dibidang keamanan di biro Datin dan sudah menerapkan ISO 27001\"",
    "linkedActivityIds": [
      "DSS05.04-2"
    ]
  },
  {
    "id": "EVD-083",
    "title": "Evidence for DSS05 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L3-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(10:20) \"Kayaknya belum deh ketika ada akses jaringan internal, tidak dilakukan enkripsi.  Kalo dari luar kantor tetap melalui VPN. Dalam konteks data, ada pengklasifikasian data, hanya orang tertentu yang bisa mengaksesnya\"",
    "linkedActivityIds": [
      "DSS05.05-3"
    ]
  },
  {
    "id": "EVD-084",
    "title": "Evidence for DSS05 (Act 6)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L3-6",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(11:36) \"Enggak Kayaknya\"",
    "linkedActivityIds": [
      "DSS05.06-3"
    ]
  },
  {
    "id": "EVD-085",
    "title": "Evidence for DSS05 (Act 7)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L3-7",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(11:58) \"Kayaknya gak ada deh, based on trust saja. Pastinya asal pengirimnya dari orang yang kita harapkan untuk kirimkan, pasti trust aja sih\"",
    "linkedActivityIds": [
      "DSS05.07-3"
    ]
  },
  {
    "id": "EVD-086",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(12:51) \"Secara peraturan gak ada, tetapi untuk edukasi itu ada seperti mengganti password secara berkala\"",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-087",
    "title": "Evidence for DSS05 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(13:31) \"Komputer/laptop yang diberikan kepada masing masing pegawai penggunaannya dibebaskan kepada pegawai tersebut\"",
    "linkedActivityIds": [
      "DSS05.02-2"
    ]
  },
  {
    "id": "EVD-088",
    "title": "Evidence for DSS05 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(14:15) \"Menggunakan VPN\"",
    "linkedActivityIds": [
      "DSS05.03-2"
    ]
  },
  {
    "id": "EVD-089",
    "title": "Evidence for DSS05 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(14:37) \"Tidak ada\"",
    "linkedActivityIds": [
      "DSS05.04-2"
    ]
  },
  {
    "id": "EVD-090",
    "title": "Evidence for DSS05 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(15:00) \"Kalo kayak website radikal (pornografi, judi) itu biasanya sudah otomatis ya dari komdigi, kita hanya mengandalkan itu saja\"",
    "linkedActivityIds": [
      "DSS05.05-2"
    ]
  },
  {
    "id": "EVD-091",
    "title": "Evidence for DSS05 (Act 6)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-6",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(15:00) \"Gak ada mekanismenya, balik lagi ke personal atau pemilik pemegang komputer\"",
    "linkedActivityIds": [
      "DSS05.06-2"
    ]
  },
  {
    "id": "EVD-092",
    "title": "Evidence for DSS05 (Act 7)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-7",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(16:41) \"Kebanyakan laptop di kantor kami dibawa pulang, walaupun ada beberapa orang yang meninggalkan di kantor\"",
    "linkedActivityIds": [
      "DSS05.07-2"
    ]
  },
  {
    "id": "EVD-093",
    "title": "Evidence for DSS05 (Act 8)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-8",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(17:55) \"Ada pengelolaan barang milik negara, ketika ada ASN memindah tangankan barang milik negara tersebut dia harus migrasi data dan  factory reset\"",
    "linkedActivityIds": [
      "DSS05.08-2"
    ]
  },
  {
    "id": "EVD-094",
    "title": "Evidence for DSS05 (Act 9)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-9",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(18:53) \"Hanya dalam bentuk edukasi, Broadcast WA, secara prosedur itu tidak ada. Gak ada mekanisme otomatis memantau aktivitas setiap laptop ASN. Tapi ketika ada report/insiden bisa ditinjaklanjuti oleh Datin\"",
    "linkedActivityIds": [
      "DSS05.09-2"
    ]
  },
  {
    "id": "EVD-095",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(23:24) \"Gak ada, bebas. Pejabat maupun pegawai itu bebas. Kalo pembagian akses palingan standar seperti Super Admin, Admin, dan User\"",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-096",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(24:49) \"Logbook ada untuk setiap visitor\"",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-097",
    "title": "Evidence for DSS05 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(25:36) \"Kita biasanya pas masuk awal kantor itu ada resepsionis, biasanya di register disitu dulu, lalu input keperluannya apa. Ada proses approve\"",
    "linkedActivityIds": [
      "DSS05.02-2"
    ]
  },
  {
    "id": "EVD-098",
    "title": "Evidence for DSS05 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(26:58) \"Kalo tamu selalu dikawal oleh penanggung jawab karyawan internal\"",
    "linkedActivityIds": [
      "DSS05.03-2"
    ]
  },
  {
    "id": "EVD-099",
    "title": "Evidence for DSS05 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(28:40) \"Kalo Cuma visit biasa itu gak ada, tapi kalo masuk ke dalam ruang server itu ada minta surat kunjungan atau nota dinas dari kepala biro Datin. Kalo ada intrusion, kalo didobrak itu pasti ada alert gitu\"",
    "linkedActivityIds": [
      "DSS05.04-2"
    ]
  },
  {
    "id": "EVD-100",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(33:42) \"Dalam konteks kearsipan kita punya jadwal retensi masa periode lima tahun maka dokumen tersebut dapat dimusnahkan dan ada mesing penghancur. Kalo dalam bentuk digital kurang tahu\"",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-101",
    "title": "Evidence for DSS05 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(34:38) \"Gak ada, semua dokumen yang ditaro di laptop ya gitu aja sensitif atau tidak sensitif. Kecuali kalo dia menyimpannya di drive cloudnya kemenpan mungkin berlaku enkripsi\"",
    "linkedActivityIds": [
      "DSS05.02-2"
    ]
  },
  {
    "id": "EVD-102",
    "title": "Evidence for DSS05 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(38:12) \"di Datin ini sebelum aplikasi Go Public sudah melewati tahap penetration test. Cuman memang kita gak tahu nih ya tiba tiba ada celah gitu, ketika ada serangan yang muncul atau jenis serangan baru, dilakukan pengetesan kembali\"",
    "linkedActivityIds": [
      "DSS05.01-2"
    ]
  },
  {
    "id": "EVD-103",
    "title": "Evidence for DSS05 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(40:00) \"Mereka punya standar pengujian kemanan dari setiap aplikasi yang dilakukan di awal ketika ada serangan yang muncul atau jenis serangan baru, dilakukan pengetesan kembali. Datin update terhadap keamanan yang lagi viral, dan menginfokan ke seluruh pegawai ASN sebagai langkah mitigasi\"",
    "linkedActivityIds": [
      "DSS05.02-2"
    ]
  },
  {
    "id": "EVD-104",
    "title": "Evidence for DSS05 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(42:00) \"Ketika ada serangan, terdapat log dan Datin pernah menginfokan ada serangan terhadap server dan terlihat detail IP dan sebagainya\"",
    "linkedActivityIds": [
      "DSS05.03-2"
    ]
  },
  {
    "id": "EVD-105",
    "title": "Evidence for DSS05 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-DSS05-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(43:05) \"Tiket sih ada, konteksnya jika ditemukan oleh pengguna. Misal pegawai PANRB menemukan ada anomali. Ada aplikasi menyediakan fitur ticketing ketika menemukan kendala (request incident). Bukan hanya serangan, tapi ketika ada masalah lain itu bisa dilaporkan\"",
    "linkedActivityIds": [
      "DSS05.04-2"
    ]
  },
  {
    "id": "EVD-106",
    "title": "Evidence for MEA03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(47:14) Sudah ada unit yang bertanggung jawab dalam mengidentifikasi dan melakukan monitoring perubahan kebijakan terkait dengan IT di unit Datin.",
    "linkedActivityIds": [
      "MEA03.01-2"
    ]
  },
  {
    "id": "EVD-107",
    "title": "Evidence for MEA03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(48:07) Secara SOP tidak ada, dan \"go with the flow\" aja. Kalau ada audit yang harus memenuhi suatu kriteria maka Kementrian PANRB akan melakukan usaha untuk memenuhi kriteria tersebut. Tetapi di PANRB juga ada penilaian evaluasi SPBE, jadi dari penilaian yang dilakukan tersebut dapat diidentifikasi kurangnya di mana lalu diimplementasikan.",
    "linkedActivityIds": [
      "MEA03.02-2"
    ]
  },
  {
    "id": "EVD-108",
    "title": "Evidence for MEA03 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(49:58) \"Belum, dan tidak ada.\"",
    "linkedActivityIds": [
      "MEA03.03-2"
    ]
  },
  {
    "id": "EVD-109",
    "title": "Evidence for MEA03 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(49:58) Tidak ada konsekuensi tertulis secara peraturan. Hanya saja jika ada instansi yang tidak ikut evaluasi maka instansi tersebut tidak akan ada nilainya, yang berarti kinerja atau citranya jelek.",
    "linkedActivityIds": [
      "MEA03.04-2"
    ]
  },
  {
    "id": "EVD-110",
    "title": "Evidence for MEA03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(51:56) Harus ada trigger, dan tidak semua peraturan kebijakan pemerintah itu langsung tersosialisasikan.Ketika ada sosialisasi, dan PANRB ada di sana, maka PANRB pasti akan mengikuti. Tetapi kalau tidak ada sosialisasi, dan PANRB tidak tahu, maka kebijakannya tidak akan terimplementasikan kebijakannya di PANRB.",
    "linkedActivityIds": [
      "MEA03.01-3"
    ]
  },
  {
    "id": "EVD-111",
    "title": "Evidence for MEA03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(52:51) \"Secara umum dilakukan melalui sosialisasi, kemudian pengumuman lewat WhatsApp, dan melalui Aplikasi berupa notifikasi pop-up.\"",
    "linkedActivityIds": [
      "MEA03.02-3"
    ]
  },
  {
    "id": "EVD-112",
    "title": "Evidence for MEA03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L3-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(53:43) Dalam konteks SPBE sudah ada evaluasi. Banyak yang sudah tingkat kematangannya 5 berarti sudah ada monev desain, dan untuk IT secara umum sudah pasti ada evaluasinya.",
    "linkedActivityIds": [
      "MEA03.01-3"
    ]
  },
  {
    "id": "EVD-113",
    "title": "Evidence for MEA03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L3-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(54:34) Tidak prosedur tertulis untuk meindak lanjut gap yang ditemukan, jadi \"go with the flow\" aja. Misalnya jika ada clearance, dan membutuhkan klasifikasi data, maka tindak lanjut gapnya adalah membuat klasifikasi data.",
    "linkedActivityIds": [
      "MEA03.02-3"
    ]
  },
  {
    "id": "EVD-114",
    "title": "Evidence for MEA03 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L3-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(56:28) Sudah melakukan audit terkait dengan aplikasi dan infrastruktur pada tahun 2024, serta keamanan informasinya. Evidence tambahan (https://drive.google.com/file/d/1ZIe7Cf-RCd1l4ZRVIWhci_bfLVtlFENc/view?usp=sharing): Audit Keamanan SPBE terdiri atas:\n- Audit Keamanan Infrastruktur SPBE Nasional (dilaksanakan 1 kali dalam 1 tahun oleh BSSN)\n- Audit Keamanan Infrastruktur SPBE IPPD (dilaksanakan 1 kali dalam 2 tahun oleh IPPD,\nberkoordinasi dengan Kemenkominfo)\n- Audit Keamanan Aplikasi umum (dilaksanakan 1 kali dalam 1 tahun oleh BSSN)\n- Audit Keamanan Aplikasi khusus (dilaksanakan 1 kali dalam 2 tahun oleh IPPD,\nberkoordinasi dengan Kemenkominfo)",
    "linkedActivityIds": [
      "MEA03.03-3"
    ]
  },
  {
    "id": "EVD-115",
    "title": "Evidence for MEA03 (Act 1)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-1",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:01:45) Pasti akan rapat secara rutin baik secara mingguan maupun bulanan, terkait dengan audit atau evaluasi pemdi, dan kegiatannya lainnya yang membutuhkan review dari setiap penanggung jawab unit.",
    "linkedActivityIds": [
      "MEA03.01-2"
    ]
  },
  {
    "id": "EVD-116",
    "title": "Evidence for MEA03 (Act 2)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-2",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:01:45) Sudah melakukan audit baik internal maupun external.",
    "linkedActivityIds": [
      "MEA03.02-2"
    ]
  },
  {
    "id": "EVD-117",
    "title": "Evidence for MEA03 (Act 3)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-3",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:04:28) Paling pada saat pengadaan biasanya dari PANB akan ada kriteria yang dimintain ke vendor. Seperti halnya apakah mereka memiliki sertifikasi tertentu misalnya ISO, dan ketika itu dimintakan maka vendor wajib memenuhi.",
    "linkedActivityIds": [
      "MEA03.03-2"
    ]
  },
  {
    "id": "EVD-118",
    "title": "Evidence for MEA03 (Act 4)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L2-4",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:05:50) Iya, termasuk dengan adanya dokumen NDA yaitu Non Disclosure Agreement, pasti akan menjadi hal yang wajib terkait dengan pertukaran data.",
    "linkedActivityIds": [
      "MEA03.04-2"
    ]
  },
  {
    "id": "EVD-119",
    "title": "Evidence for MEA03 (Act 5)",
    "type": "interview",
    "referenceNumber": "Ref-MEA03-L3-5",
    "assessor": "Assessor Tim PANRB",
    "date": "2026-06-10",
    "notes": "(1:06:57) Saya tidak tahu pasti. Paling portal terkait layanan SMART yang mengintegrasikan semua unit PANRB, tapi kalau untuk yang laporan kepatuhan peraturan itu belum ada.",
    "linkedActivityIds": [
      "MEA03.05-3"
    ]
  }
];

export const BENCHMARK_RECOMMENDATIONS: RecommendationItem[] = [
  {
    "id": "REC-001",
    "objectiveId": "DSS05",
    "practiceCode": "DSS05.01",
    "gapDescription": "Belum optimalnya penerapan perlindungan malware pada seluruh perangkat, belum adanya pengelolaan dan monitoring perlindungan malware yang terstandarisasi, serta belum tersedianya mekanisme evaluasi dan peningkatan perlindungan malware secara berkala",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Penetapan tanggung jawab Biro Datin secara formal dalam pengelolaan dan monitoring antimalware pada seluruh endpoint pegawai"
    },
    "processAspect": {
      "type": "Policy",
      "action": "Penyusunan kebijakan perlindungan malware yang mewajibkan standar minimum antimalware pada seluruh perangkat organisasi"
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Implementasi solusi endpoint protection yang mendukung pengelolaan dan monitoring terpusat."
    }
  },
  {
    "id": "REC-002",
    "objectiveId": "DSS05",
    "practiceCode": "DSS05.02",
    "gapDescription": "Belum tersedianya mekanisme untuk menjamin trustworthiness informasi pada proses transmisi data internal, serta belum dilakukannya pengujian keamanan jaringan dan sistem secara berkala.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Menetapkan penanggung jawab pengelolaan keamanan konektivitas jaringan, termasuk pengawasan penggunaan enkripsi dan mekanisme verifikasi komunikasi."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Penyusunan kebijakan keamanan konektivitas berbasis risk assessment yang mencakup standar enkripsi transmisi data internal"
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Implementasi solusi penetration testing seperti Nessus atau OpenVAS untuk pengujian keamanan jaringan secara berkala"
    }
  },
  {
    "id": "REC-003",
    "objectiveId": "DSS05",
    "practiceCode": "DSS05.03",
    "gapDescription": "Belum terdapatnya prosedur formal atau mekanisme lockdown endpoint. Sebagian besar pengelolaan keamanan endpoint masih diserahkan kepada masing-masing pengguna perangkat.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-004",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.01",
    "gapDescription": "Belum ada request model untuk layanan yang sering diminta",
    "peopleAspect": {
      "type": "Skill & awareness",
      "action": ""
    },
    "processAspect": {
      "type": "Policy",
      "action": ""
    },
    "technologyAspect": {
      "type": "Tools",
      "action": ""
    }
  },
  {
    "id": "REC-005",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.02",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-006",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.03",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-007",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.04",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-008",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.05",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-009",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.06",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-010",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.07",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-011",
    "objectiveId": "DSS04",
    "practiceCode": "DSS04.08",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": ""
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-012",
    "objectiveId": "MEA03",
    "practiceCode": "MEA03.01-3",
    "gapDescription": "Belum adanya mekanisme formal untuk menilai dampak regulasi dan persyaratan hukum terkait TI terhadap kontrak pihak ketiga.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Memberikan tanggung jawab penilaian terkait dengan dampak regulasi dan persyaratan hukum terkait TI terhadap kontrak pihak ketiga di Datin"
    },
    "processAspect": {
      "type": "Policy",
      "action": "Menyusun kebijakan yang mewajibkan setiap instansi untuk melakukan penilaian compliance regulasi TI dalam setiap kontrak pihak ketiga"
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-013",
    "objectiveId": "MEA03",
    "practiceCode": "MEA03.01-4",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Communication",
      "action": "Mengomunikasikan kebijakan baru yang telah disusun terkait dengan konsekuensi ketidakpatuhan melalui sosialisasi"
    },
    "processAspect": {
      "type": "Procedure",
      "action": "Menyusun prosedur penanganan pelanggaran compliance yang mencakup mekanisme pelaporan, evaluasi, dan pemberian konsekuensi"
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-014",
    "objectiveId": "MEA03",
    "practiceCode": "MEA03.02-1",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Responsibility",
      "action": ""
    },
    "processAspect": {
      "type": "Procedure",
      "action": "Menyusun SOP review dan pembaruan kebijakan yang mencakup tahapan identifikasi, analisis, dan penyesuaian"
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-015",
    "objectiveId": "MEA03",
    "practiceCode": "MEA03.03-2",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Skill & awareness",
      "action": "Meningkatkan kemampuan tim dalam mengidentifikasi, menganalisis, dan menyelesaikan gap compliance yang ditemukan"
    },
    "processAspect": {
      "type": "Procedure",
      "action": "Menyusun SOP tindak lanjut gap compliance yang mencakup identifikasi dan verifikasi penyelesaian"
    },
    "technologyAspect": {
      "type": "Features",
      "action": ""
    }
  },
  {
    "id": "REC-016",
    "objectiveId": "MEA03",
    "practiceCode": "MEA03.04-5",
    "gapDescription": "",
    "peopleAspect": {
      "type": "Skill & awareness",
      "action": "Memberikan pemahaman kepada setiap unit pentinganya melaporkan compliance lintas unit dan memberikan pelatihan mekanisme pelaporan di portal SMART"
    },
    "processAspect": {
      "type": "Procedure",
      "action": "Menyusun SOP pengumpulan, konsolidasi, dan pelaporan status compliance secara periodik"
    },
    "technologyAspect": {
      "type": "Features",
      "action": "Menambahkan fitur dashboard compliance dengan visualisasi status kepatuhan setiap unit secara real-time"
    }
  },
  {
    "id": "REC-017",
    "objectiveId": "APO12",
    "practiceCode": "APO12.01",
    "gapDescription": "Kementerian PANRB sudah memiliki manajemen risiko umum dan risk register, termasuk pencatatan dampak dan frekuensi risiko. Namun, dokumentasi internal/eksternal, taksonomi, historical risk review, dan analisis event-condition belum terlihat spesifik untuk risiko I&T. Gap yang paling terlihat ada di cara PANRB memperjelas cara data risiko I&T dicatat dalam kerangka manajemen risiko yang sudah ada.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "-"
    },
    "processAspect": {
      "type": "Policy",
      "action": "Tambahkan aturan data risiko I&T, sumber data, taxonomy, dan minimum evidence dalam kebijakan manajemen risiko."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Sediakan repository risk register I&T terpusat."
    }
  },
  {
    "id": "REC-018",
    "objectiveId": "APO12",
    "practiceCode": "APO12.02",
    "gapDescription": "Analisis risiko sudah berjalan melalui kategori risiko, risk appetite, dampak × frekuensi, dan threshold risiko tinggi. Namun, hasil risk analysis/BIA belum menjadi input formal untuk keputusan, dan pembandingan biaya-manfaat atas opsi respons belum terlihat. Gap-nya lebih ke pemakaian hasil analisis dalam proses keputusan, bukan kemampuan menghitung risiko.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Libatkan risk analyst, service owner, business process owner, dan decision maker dalam analisis risiko I&T."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Wajibkan risk analysis/BIA formal untuk layanan, proyek, perubahan, atau risiko I&T yang kritikal."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Gunakan template/modul risk analysis dan BIA."
    }
  },
  {
    "id": "REC-019",
    "objectiveId": "APO12",
    "practiceCode": "APO12.03",
    "gapDescription": "Profil risiko saat ini dikumpulkan per unit kerja dan dapat memuat risiko TIK. Layanan esensial juga sudah mengacu pada standar pelayanan, arsitektur layanan, dan SOP. Namun dependency proses bisnis terhadap layanan/aplikasi/infrastruktur/vendor belum seluruhnya dicatat, formulir risiko belum memetakan proses bisnis/area fungsional, dan KRI/materialized I&T event belum formal.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Tunjuk service/dependency owner untuk aplikasi, infrastruktur, fasilitas, personel, vendor, dan layanan kritikal."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Wajibkan profil risiko I&T memuat dependency, mapping proses bisnis, owner, action status, KRI, dan event yang terjadi."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Gunakan dashboard risk profile terpusat yang terhubung dengan service catalog/CMDB."
    }
  },
  {
    "id": "REC-020",
    "objectiveId": "APO12",
    "practiceCode": "APO12.04",
    "gapDescription": "Risiko dan dampaknya sudah disampaikan kepada pengambil keputusan, tetapi pelaporan risk profile masih terbatas pada unit terkait dan Inspektorat. Pembatasan akses bisa dipahami dalam konteks instansi pemerintah, namun dari requirement COBIT masih perlu pemetaan stakeholder relevan, format exposure/worst-case, dan keterkaitan hasil audit/assessment ke profil risiko.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Definisikan audience risk reporting: unit, Pusdatin, Inspektorat, decision maker, dan stakeholder terdampak."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Tetapkan kebijakan komunikasi risiko I&T berbasis akses, sensitivitas informasi, dan stakeholder mapping."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Gunakan portal/dashboard risk reporting berbasis role-based access."
    }
  },
  {
    "id": "REC-021",
    "objectiveId": "APO12",
    "practiceCode": "APO12.05",
    "gapDescription": "Inventaris kontrol, PIC, waktu tindak lanjut, review, monitoring unit, dan pemantauan Inspektorat sudah berjalan dalam dokumen manajemen risiko. Gap yang tersisa ada pada belum eksplisitnya keseimbangan biaya-manfaat, regulasi, effort, dan residual risk dalam usulan tindakan. Karena target level 3, perbaikannya cukup realistis berupa penambahan atribut portofolio tindakan, bukan tools baru.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Tunjuk owner/komite portofolio tindakan risiko I&T bersama unit, Pusdatin, Inspektorat, dan perencanaan/anggaran."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Tetapkan prioritas treatment berdasarkan cost, benefit, compliance impact, residual risk, timeline, dan budget, bukan hanya risk score."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Gunakan action/portfolio tracker yang terhubung ke risk register."
    }
  },
  {
    "id": "REC-022",
    "objectiveId": "APO12",
    "practiceCode": "APO12.06",
    "gapDescription": "Respons, mitigasi, dan eskalasi sudah ada serta mengikuti kewenangan unit kerja. Mitigasi diarahkan ke penyebab risiko, bukan sekadar dampak. Namun pengujian belum dilakukan untuk seluruh skenario risiko besar, insiden belum diklasifikasikan sebagai incident class tersendiri, dan belum terlihat pembandingan kerugian I&T terhadap risk tolerance.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Tetapkan response team, escalation contact, incident commander, risk owner, dan decision maker untuk skenario kritikal."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Tetapkan kebijakan risk response dan post-incident review untuk kejadian I&T kritikal."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Gunakan incident/risk response tracker yang terintegrasi dengan risk register."
    }
  },
  {
    "id": "REC-023",
    "objectiveId": "EDM03",
    "practiceCode": "EDM03.01",
    "gapDescription": "Belum terdapat mekanisme formal yang mendefinisikan risk appetite dan risk tolerance TI serta belum terdapat integrasi yang terstruktur antara pengelolaan risiko TI dengan manajemen risiko organisasi.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Menetapkan penanggung jawab koordinasi identifikasi, evaluasi, dan pemantauan risiko TI pada Pusdatin."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Menyusun kebijakan manajemen risiko TI yang mengacu pada COBIT 2019 dan ISO 31000, termasuk definisi risk appetite dan risk tolerance organisasi."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Memanfaatkan sistem manajemen dokumen atau repositori internal yang telah tersedia untuk penyimpanan dan pengelolaan Risk Register TI."
    }
  },
  {
    "id": "REC-024",
    "objectiveId": "EDM03",
    "practiceCode": "EDM03.02",
    "gapDescription": "Belum terdapat kebijakan, prosedur, dan mekanisme komunikasi risiko TI yang terdokumentasi secara formal sehingga pengelolaan risiko masih bergantung pada praktik operasional dan pengalaman personel terkait.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Menetapkan penanggung jawab pengelolaan komunikasi dan eskalasi risiko TI pada Pusdatin."
    },
    "processAspect": {
      "type": "Policy",
      "action": "Menyusun kebijakan komunikasi dan eskalasi risiko TI yang mencakup jalur pelaporan, pihak terkait, serta mekanisme tindak lanjut risiko."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Mengoptimalkan HaloDatin sebagai sarana pencatatan, pelaporan, dan eskalasi risiko maupun insiden TI."
    }
  },
  {
    "id": "REC-025",
    "objectiveId": "EDM03",
    "practiceCode": "EDM03.03",
    "gapDescription": "Pemantauan risiko TI telah dilakukan, namun belum terdapat pengukuran berbasis indikator risiko yang terdokumentasi, laporan risiko berkala kepada pimpinan, serta mekanisme evaluasi pencapaian target risiko secara formal.",
    "peopleAspect": {
      "type": "Responsibility",
      "action": "Menetapkan penanggung jawab penyusunan laporan monitoring dan evaluasi risiko TI secara berkala kepada pimpinan."
    },
    "processAspect": {
      "type": "Procedure",
      "action": "Menyusun prosedur monitoring dan evaluasi risiko TI yang mencakup penetapan indikator risiko (KRI), metode pengukuran, frekuensi pemantauan, dan mekanisme pelaporan."
    },
    "technologyAspect": {
      "type": "Tools",
      "action": "Memanfaatkan data dari IPS, monitoring jaringan, dan HaloDatin sebagai sumber informasi pengukuran risiko TI."
    }
  }
];

export const BENCHMARK_ASSESSMENT_STATE: FullAssessmentState = {
  id: 'assessment-panrb-2026',
  title: 'Evaluasi Tata Kelola SPBE & Keamanan Siber Kementerian PANRB',
  organization: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB)',
  assessor: 'Vio Salman Kafiyan & Tim Audit Eksternal',
  period: 'Semester I - 2026',
  weights: {
    df1: 2,
    df2: 1,
    df3: 3,
    df4: 4
  },
  df1: {
  "growth": 1,
  "innovation": 2,
  "costLeadership": 1,
  "clientService": 5
},
  df2: {
  "goals": {
    "EG01": 1,
    "EG02": 5,
    "EG03": 5,
    "EG04": 5,
    "EG05": 5,
    "EG06": 4,
    "EG07": 4,
    "EG08": 5,
    "EG09": 4,
    "EG10": 5,
    "EG11": 5,
    "EG12": 5,
    "EG13": 5
  }
},
  df3: {
  "risks": {
    "RSK01": {
      "impact": 5,
      "likelihood": 1
    },
    "RSK02": {
      "impact": 3,
      "likelihood": 1
    },
    "RSK03": {
      "impact": 5,
      "likelihood": 1
    },
    "RSK04": {
      "impact": 2,
      "likelihood": 3
    },
    "RSK05": {
      "impact": 4,
      "likelihood": 1
    },
    "RSK06": {
      "impact": 3,
      "likelihood": 5
    },
    "RSK07": {
      "impact": 5,
      "likelihood": 1
    },
    "RSK08": {
      "impact": 4,
      "likelihood": 1
    },
    "RSK09": {
      "impact": 5,
      "likelihood": 2
    },
    "RSK10": {
      "impact": 4,
      "likelihood": 1
    },
    "RSK11": {
      "impact": 5,
      "likelihood": 1
    },
    "RSK12": {
      "impact": 3,
      "likelihood": 1
    },
    "RSK13": {
      "impact": 3,
      "likelihood": 2
    },
    "RSK14": {
      "impact": 2,
      "likelihood": 3
    },
    "RSK15": {
      "impact": 3,
      "likelihood": 1
    },
    "RSK16": {
      "impact": 4,
      "likelihood": 1
    },
    "RSK17": {
      "impact": 2,
      "likelihood": 1
    },
    "RSK18": {
      "impact": 4,
      "likelihood": 1
    },
    "RSK19": {
      "impact": 5,
      "likelihood": 1
    }
  }
},
  df4: {
  "issues": {
    "ISS01": 1,
    "ISS02": 1,
    "ISS03": 1,
    "ISS04": 1,
    "ISS05": 1,
    "ISS06": 2,
    "ISS07": 1,
    "ISS08": 1,
    "ISS09": 1,
    "ISS10": 1,
    "ISS11": 1,
    "ISS12": 1,
    "ISS13": 1,
    "ISS14": 1,
    "ISS15": 1,
    "ISS16": 2,
    "ISS17": 1,
    "ISS18": 1,
    "ISS19": 1,
    "ISS20": 1
  }
},
  dfResults: [],
  scopedObjectiveIds: ['EDM03', 'APO12', 'DSS04', 'DSS05', 'MEA03'],
  objectiveTargets: {
    EDM03: 2,
    APO12: 4,
    DSS04: 4,
    DSS05: 4,
    MEA03: 4
  },
  assessments: {},
  evidenceList: BENCHMARK_EVIDENCE,
  recommendations: BENCHMARK_RECOMMENDATIONS,
  updatedAt: new Date().toISOString()
};

export function createBenchmarkState(): FullAssessmentState {
  const state: FullAssessmentState = JSON.parse(JSON.stringify(BENCHMARK_ASSESSMENT_STATE));
  state.dfResults = calculateDesignFactors(state.df1, state.df2, state.df3, state.df4, state.weights);
  const assessments: Record<string, ObjectiveAssessmentData> = {};
  for (const objId of state.scopedObjectiveIds) {
    const activities = (cobitActivitiesData as Record<string, any>)[objId] || [];
    const target = state.objectiveTargets[objId] || 3;
    assessments[objId] = calculateObjectiveAssessment(objId, target, activities);
  }
  state.assessments = assessments;
  return state;
}

