<div align="center">

# Asisten Penghulu

### Professional Knowledge Platform for Marriage Officers

Platform web modular untuk memperkaya pengetahuan profesional penghulu melalui ensiklopedia regulasi, fikih munakahat, dalil, materi khutbah, nasihat perkawinan, dan alat bantu pembelajaran.

<p>
  <img src="https://img.shields.io/badge/version-5.1-176b52?style=flat-square" alt="Version 5.1">
  <img src="https://img.shields.io/badge/architecture-modular-2563eb?style=flat-square" alt="Modular architecture">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=111827" alt="Vanilla JavaScript">
  <img src="https://img.shields.io/badge/PWA-offline%20cache-5A0FC8?style=flat-square" alt="PWA">
  <img src="https://img.shields.io/badge/Deploy-Vercel%20%7C%20Netlify-111827?style=flat-square" alt="Vercel and Netlify">
</p>

**Bahasa:** Indonesia · **Platform:** Web · **Versi:** 5.1 · **Website:** [asistenpenghulu.vercel.app](https://asistenpenghulu.vercel.app)

</div>

---

## Tentang Proyek

**Asisten Penghulu** adalah platform pengetahuan profesional bagi penghulu. Aplikasi menyediakan referensi regulasi, fikih munakahat, dalil Al-Qur'an dan hadis, materi nasihat, khutbah, serta alat bantu pembelajaran. Aplikasi ini bukan sistem administrasi pencatatan nikah dan tidak mengelola basis data calon pengantin.

Versi 5.1 menyempurnakan stabilitas dan fondasi offline dari arsitektur multi-halaman modular yang diperkenalkan pada v5.0. Setiap fitur ditempatkan pada halaman tersendiri, sedangkan stylesheet, logika inti, dan data pendukung dipisahkan agar pemeliharaan dan pengembangan lebih terarah.

Aplikasi menggunakan teknologi web standar tanpa framework JavaScript dan tanpa proses build. Proyek dapat di-host sebagai static website melalui GitHub Pages, Vercel, atau Netlify.

## Fitur Utama

| Modul | Kegunaan |
|---|---|
| Beranda | Akses ringkas ke fitur dan ruang kerja aplikasi |
| Cek Wali Nikah | Alat bantu pembelajaran untuk memahami urutan dan kriteria awal wali nasab; bukan penetapan hukum |
| Kalkulator Iddah | Alat bantu pembelajaran dan estimasi awal masa iddah berdasarkan kondisi yang dipilih; hasil perlu verifikasi |
| Terjemah Mahar | Konversi nominal dan penyusunan istilah mahar |
| Lafaz Akad Nikah | Generator naskah ijab kabul berdasarkan data yang dimasukkan |
| Kumpulan Khutbah | Referensi naskah khutbah nikah |
| Bank Nasihat Perkawinan | Perpustakaan materi nasihat dan bahan penyampaian |
| Kalkulator & Konversi | Alat bantu tanggal, kalender, dan konversi terkait |
| Ensiklopedia Kepenghuluan | Materi regulasi, fikih munakahat, dalil, problematika akad, serta nasab dan mahram |
| Referensi Fikih & KHI | Kumpulan rujukan pendukung |

> Ruang lingkup dan isi fitur mengikuti materi yang tersedia di dalam repository. Ketersediaan materi tidak berarti seluruh konten telah ditinjau atau disahkan sebagai pedoman resmi.

## Tampilan dan Arsitektur

Aplikasi menggunakan pendekatan **static multi-page application**:

- HTML menyimpan struktur halaman masing-masing modul.
- CSS bersama mengatur sistem visual global.
- CSS modul memuat penyesuaian khusus halaman tertentu.
- JavaScript inti menyediakan fungsi bersama.
- Data fitur dipisahkan ke file JavaScript tersendiri.
- Service Worker menyediakan mekanisme cache untuk penggunaan offline setelah aset terkait pernah dimuat.

Lihat [Peta Modul](MODULE-MAP.md) dan [Dokumentasi Arsitektur](docs/ARCHITECTURE.md) untuk rincian lebih lanjut.

## Teknologi

| Teknologi | Peran |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Tata letak, responsivitas, dan tampilan |
| Vanilla JavaScript | Interaksi dan logika aplikasi |
| Web App Manifest | Metadata instalasi PWA |
| Service Worker | Cache halaman dan aset |
| GitHub | Version control dan kolaborasi |
| Vercel / Netlify | Hosting static website |

Tidak diperlukan `npm install`, bundler, framework, database, atau environment variable untuk menjalankan versi statis ini.

## Struktur Repository

```text
asisten-penghulu-web/
├── index.html
├── pages/
│   ├── wali.html
│   ├── iddah.html
│   ├── mahar.html
│   ├── akad.html
│   ├── khutbah.html
│   ├── nasihat.html
│   ├── konversi.html
│   ├── ensiklopedia.html
│   └── referensi.html
├── assets/
│   ├── css/
│   │   ├── app.css
│   │   └── modules/
│   ├── js/
│   │   ├── app-core.js
│   │   ├── pwa.js
│   │   └── data/
│   ├── fonts/
│   └── icons/
├── docs/
├── .github/
├── manifest.webmanifest
├── sw.js
├── netlify.toml
└── vercel.json
```

## Menjalankan Secara Lokal

Jalankan proyek melalui server lokal. Jangan membuka file langsung menggunakan skema `file://`, karena Service Worker dan fitur PWA memerlukan konteks `localhost` atau HTTPS.

### Opsi 1 — Python

Pastikan Python tersedia, lalu jalankan dari direktori repository:

```bash
python -m http.server 8000
```

Buka alamat berikut di browser:

```text
http://localhost:8000
```

### Opsi 2 — Visual Studio Code

1. Buka folder repository di Visual Studio Code.
2. Pasang ekstensi **Live Server** jika belum tersedia.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.

## Deployment

Repository telah menyertakan konfigurasi dasar untuk Vercel dan Netlify.

### Vercel

1. Push repository ke GitHub.
2. Masuk ke [Vercel](https://vercel.com/).
3. Pilih **Add New → Project**.
4. Import repository `asisten-penghulu-web`.
5. Gunakan konfigurasi berikut:

| Pengaturan | Nilai |
|---|---|
| Framework Preset | Other |
| Build Command | Kosong |
| Output Directory | `.` |
| Install Command | Kosong |

6. Klik **Deploy**.

### Netlify

1. Push repository ke GitHub.
2. Masuk ke [Netlify](https://www.netlify.com/).
3. Pilih **Add new site → Import an existing project**.
4. Hubungkan repository GitHub.
5. Gunakan konfigurasi berikut:

| Pengaturan | Nilai |
|---|---|
| Build Command | Kosong |
| Publish Directory | `.` |

6. Jalankan deployment.

Panduan lebih rinci tersedia di [DEPLOY.md](DEPLOY.md).

## Penggunaan Offline

Aplikasi menyediakan fondasi PWA melalui Web App Manifest dan Service Worker.

- Aplikasi harus pertama kali diakses melalui `localhost` atau HTTPS.
- Halaman dan aset yang sudah berhasil dimuat dapat tersimpan di cache.
- Buka setiap modul ketika online agar halaman dan data modul tersebut tersedia saat offline.
- Referensi eksternal tetap membutuhkan koneksi internet.
- Perilaku cache dapat berbeda menurut browser dan kebijakan penyimpanan perangkat.

Mode offline bukan berarti semua fitur eksternal atau sumber rujukan daring tersedia tanpa internet.

## Privasi dan Penyimpanan Data

Versi ini merupakan aplikasi statis dan tidak menyediakan backend atau sinkronisasi data antarperangkat.

- Tidak ada sistem akun pengguna bawaan.
- Tidak ada database server yang disertakan.
- Beberapa informasi aplikasi disimpan secara lokal melalui browser.
- Data lokal browser tidak otomatis tersinkronisasi ke perangkat lain.
- Jangan memasukkan data pribadi atau dokumen sensitif ke lingkungan yang tidak memiliki perlindungan memadai.

## Batasan dan Penggunaan yang Bertanggung Jawab

Asisten Penghulu merupakan **platform pengetahuan dan alat bantu pembelajaran**, bukan sistem administrasi pencatatan nikah dan bukan pengganti:

- pemeriksaan dokumen dan prosedur resmi KUA;
- kewenangan serta pertimbangan Pejabat Penghulu;
- peraturan perundang-undangan yang berlaku;
- penilaian fikih oleh pihak yang memiliki kompetensi;
- konsultasi hukum atau penetapan hukum dalam perkara tertentu.

Sebelum digunakan dalam pelayanan, periksa kembali dasar hukum, status keberlakuan regulasi, ketepatan kutipan dalil, dan kesesuaian materi dengan kebijakan resmi terbaru.

## Pengembangan

Kontribusi untuk perbaikan aplikasi dapat dilakukan melalui pelaporan bug, usulan fitur, dokumentasi, maupun pull request.

Sebelum mengajukan perubahan:

1. Baca [CONTRIBUTING.md](CONTRIBUTING.md).
2. Jelaskan masalah atau kebutuhan yang ingin diselesaikan.
3. Pertahankan pemisahan halaman, stylesheet, logika, dan data.
4. Uji halaman yang terdampak serta navigasi antarhalaman.
5. Jangan menambahkan dependensi eksternal tanpa alasan teknis yang jelas.

## Dokumentasi

- [Laporan Audit v5.0](AUDIT-v5.0.md)
- [Peta Modul](MODULE-MAP.md)
- [Arsitektur Aplikasi](docs/ARCHITECTURE.md)
- [Panduan Deployment](DEPLOY.md)
- [Panduan Kontribusi](CONTRIBUTING.md)
- [Riwayat Perubahan](CHANGELOG.md)
- [Pengaturan Repository GitHub](GITHUB-REPOSITORY-SETUP.md)

## Lisensi

Repository ini belum menyertakan file lisensi. Hak penggunaan, modifikasi, dan distribusi kode maupun materi di dalamnya belum dinyatakan melalui lisensi open-source. Jangan mengasumsikan bahwa konten, font, atau aset pihak ketiga bebas digunakan kembali.

---

<div align="center">

**Asisten Penghulu Web v5.1**

*Professional knowledge tools for accurate and responsible marriage guidance.*

</div>
