# Changelog

Semua perubahan penting pada proyek dicatat dalam dokumen ini.

## [5.0.0] — 2026-11-18

### Added
- Arsitektur static multi-page untuk memisahkan fitur ke halaman tersendiri.
- Peta modul dan dokumentasi deployment.
- Pemisahan stylesheet global dan stylesheet khusus modul.
- Pemisahan data wali, mahar, khutbah, nasihat, dan ensiklopedia.
- Font Arab sebagai aset lokal terpisah.
- Web App Manifest dan Service Worker untuk fondasi PWA/offline cache.
- Konfigurasi deployment dasar untuk Vercel dan Netlify.
- Dokumentasi repository, panduan kontribusi, dan kebijakan keamanan.

### Changed
- Navigasi utama menggunakan tautan antarhalaman.
- Beranda tidak lagi memuat seluruh data konten modul sekaligus.
- Dokumentasi proyek disesuaikan dengan arsitektur modular.

### Notes
- Versi ini merupakan migrasi arsitektur dari HTML mandiri V.55.
- Pengujian browser nyata pada domain HTTPS tetap diperlukan sebelum penggunaan operasional.
- Belum ada backend, autentikasi, database, sinkronisasi antarperangkat, atau lisensi open-source yang ditetapkan.


## [5.1.0] — 2026-11-18

### Fixed
- Status navigasi kategori ensiklopedia kini mengikuti kategori yang sedang dibuka.
- Pengisian tanggal kalkulator menggunakan tanggal lokal, bukan tanggal UTC.
- Input konversi Hijriah divalidasi terhadap hasil balik algoritma kalender.
- Kombinasi input iddah yang tidak konsisten tidak lagi menghasilkan estimasi otomatis.
- Salin Bank Nasihat menggunakan Clipboard API dengan fallback.
- Cetak Bank Nasihat menyertakan seluruh materi mendalam.

### Improved
- Service Worker melakukan precache terhadap halaman, stylesheet modul, data, dan font utama.
- Cache name dinaikkan ke `asisten-penghulu-v5.1.0`.
- Cache-Control aset yang belum menggunakan fingerprint diubah agar tidak tertahan sebagai immutable.
- Manifest menambahkan ikon PNG 192px dan 512px.
- Metadata dan dokumentasi menegaskan ruang lingkup platform pengetahuan, bukan sistem administrasi pencatatan nikah.
- Ditambahkan pemeriksaan statis dan GitHub Actions.

### Notes
- Konten fikih, dalil, dan regulasi tetap memerlukan telaah sumber resmi dan pemeriksaan ahli sebelum dinyatakan tervalidasi.
- Pengujian interaksi browser lintas perangkat masih perlu dilakukan pada deployment HTTPS.
