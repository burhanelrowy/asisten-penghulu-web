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
