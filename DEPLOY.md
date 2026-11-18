# Deployment Guide

Asisten Penghulu Web v5.0 adalah static website. Tidak diperlukan build command, package manager, atau environment variable untuk deployment dasar.

## Sebelum Deploy

- Pastikan `index.html` berada di root repository.
- Pastikan folder `pages/` dan `assets/` ikut diunggah.
- Jangan mengunggah file ZIP sebagai satu-satunya isi repository.
- Jalankan aplikasi melalui server lokal untuk pemeriksaan awal.

## Vercel

1. Push repository ke GitHub.
2. Buka https://vercel.com/ dan pilih **Add New → Project**.
3. Import repository.
4. Atur:
   - Framework Preset: `Other`
   - Build Command: kosong
   - Output Directory: `.`
   - Install Command: kosong
5. Deploy.

## Netlify

1. Push repository ke GitHub.
2. Buka https://www.netlify.com/ dan pilih **Add new site → Import an existing project**.
3. Hubungkan repository.
4. Atur:
   - Build Command: kosong
   - Publish Directory: `.`
5. Deploy.

## Setelah Deploy

1. Buka URL HTTPS yang diberikan penyedia hosting.
2. Uji seluruh menu dan navigasi.
3. Periksa console browser untuk error.
4. Pastikan Service Worker berhasil terdaftar.
5. Buka setiap halaman saat online agar aset modul dapat tersimpan ke cache.
6. Uji kembali perilaku offline.

## Catatan

Setiap perubahan file Service Worker sebaiknya diikuti perubahan `CACHE_NAME` pada `sw.js` agar browser menggunakan versi cache baru.
