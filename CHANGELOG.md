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


## [5.1.1] — 2026-11-18

### Fixed
- Sidebar navigation now preserves its own scroll position when moving between pages.
- Scroll restoration is scoped to the destination path, so stale positions are discarded.
- Browser back/forward cache (`pageshow`) is handled.
- Modifier-click and links opened in a new tab do not overwrite the current tab's saved sidebar position.

### Improved
- Service Worker cache version bumped to `asisten-penghulu-v5.1.1`.
- Added automated static checks for sidebar scroll persistence.


## [5.2.0] — 2026-11-20

### Added
- Status keberadaan wali: diketahui, tidak diketahui, dan belum diverifikasi.
- Penjelasan dasar hukum PMA Nomor 30 Tahun 2024 Pasal 13 ayat (5) huruf c jo. ayat (7) untuk status keberadaan yang tidak diketahui.
- Pembedaan antara wali yang tidak diketahui keberadaannya dan wali yang diketahui tetapi tidak hadir; kondisi terakhir tetap diarahkan ke pemeriksaan taukil wali.

### Changed
- Kedua redaksi kabul Bahasa Indonesia menambahkan frasa “untuk diri saya sendiri”.
- Transliterasi dan teks Arab kabul menambahkan padanan “li-nafsii” / “لِنَفْسِي”.
- Nomor versi aplikasi dan cache Service Worker dinaikkan ke 5.2.0.

### Preserved
- Fitur wafat yang otomatis melanjutkan pemeriksaan ke urutan wali nasab berikutnya.
- Seluruh modul dan perbaikan stabilitas v5.1.1.
- Batasan produk sebagai platform pengetahuan, bukan aplikasi administrasi calon pengantin.


## [5.2.1] — 2026-11-20

### Fixed
- Replaced inline click handlers on the wali whereabouts selector with a delegated event listener initialized on the wali page.
- Added explicit click/touch interaction styling and stacking order to the three status buttons.
- Added a visible live status message so the selected whereabouts state is immediately clear.
- Bumped the Service Worker cache version to ensure the browser loads the updated interaction code.

### Tests
- Added a smoke test that invokes the delegated click handler and verifies that the selected status and live message update.
