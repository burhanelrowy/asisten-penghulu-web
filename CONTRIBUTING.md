# Contributing

Terima kasih atas minat Anda untuk membantu mengembangkan Asisten Penghulu.

Kontribusi dapat berupa laporan bug, usulan fitur, perbaikan dokumentasi, penyempurnaan tampilan, maupun perbaikan kode.

## Sebelum Memulai

1. Baca README dan peta modul.
2. Periksa issue yang sudah ada agar tidak membuat laporan duplikat.
3. Untuk perubahan besar, buat issue atau diskusikan terlebih dahulu.
4. Pastikan perubahan tidak memasukkan data pribadi, kredensial, atau aset tanpa izin.

## Alur Kontribusi

1. Fork repository.
2. Buat branch dari `main`, misalnya `fix/iddah-date-calculation` atau `docs/update-deployment-guide`.
3. Lakukan perubahan sekecil dan seterukur mungkin.
4. Uji halaman yang terdampak.
5. Commit dengan pesan yang jelas.
6. Buat pull request dan jelaskan alasan, perubahan, serta langkah pengujian.

## Prinsip Struktur Kode

- HTML halaman ditempatkan di `pages/`, kecuali beranda di `index.html`.
- CSS global ditempatkan di `assets/css/app.css`.
- CSS khusus fitur ditempatkan di `assets/css/modules/`.
- Logika bersama ditempatkan di `assets/js/app-core.js`.
- Data konten ditempatkan di `assets/js/data/`.
- Jangan memindahkan atau mengganti nama file tanpa memperbarui semua path yang menggunakannya.
- Pertahankan kompatibilitas halaman multi-page dan path relatif dari direktori `pages/`.

## Standar Perubahan

- Gunakan nama variabel dan fungsi yang jelas.
- Hindari menambah dependensi eksternal tanpa alasan yang kuat.
- Jangan menyimpan secret, token, atau data pribadi di repository.
- Hindari mengubah materi hukum atau dalil tanpa sumber yang dapat diverifikasi.
- Untuk materi regulasi, cantumkan identitas peraturan dan rujukan sumber resminya.
- Jangan menyatakan suatu materi sebagai keputusan hukum atau pedoman resmi tanpa dasar kewenangan.

## Pemeriksaan Sebelum Pull Request

Jalankan pemeriksaan sintaks JavaScript untuk file yang diubah:

```bash
node --check assets/js/app-core.js
```

Untuk file JavaScript data, sesuaikan path file yang diperiksa. Kemudian jalankan server lokal:

```bash
python -m http.server 8000
```

Periksa setidaknya:
- halaman yang diubah;
- navigasi ke dan dari halaman lain;
- tampilan desktop dan mobile;
- fungsi tombol, form, kalkulator, dan pencetakan yang terdampak;
- perilaku offline jika perubahan menyentuh Service Worker atau PWA.

## Pull Request

Sertakan:
- ringkasan masalah;
- ringkasan solusi;
- daftar file/modul yang berubah;
- langkah pengujian;
- screenshot sebelum/sesudah untuk perubahan UI, jika relevan.

Pull request yang mengubah materi fikih, regulasi, atau dalil harus menyertakan sumber rujukan dan catatan verifikasi.
