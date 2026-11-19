# GitHub Repository Setup — Asisten Penghulu

Dokumen ini berisi metadata dan pengaturan yang disarankan agar halaman repository GitHub terlihat konsisten dan profesional.

## 1. Identitas Repository

| Field GitHub | Nilai yang disarankan |
|---|---|
| Repository name | `asisten-penghulu-web` |
| Project name | `Asisten Penghulu` |
| Short description | `Platform web modular untuk pengetahuan profesional penghulu: regulasi, fikih munakahat, dalil, khutbah, nasihat perkawinan, dan alat bantu pembelajaran.` |
| Website | `https://asistenpenghulu.vercel.app` |
| Default branch | `main` |
| Repository type | Git repository |
| Primary language | JavaScript |
| License | Belum ditetapkan — verifikasi hak kode, font, dan materi terlebih dahulu |

## 2. Topics

Masukkan topics berikut pada bagian **About → Topics** di GitHub:

```text
asisten-penghulu
kepenghuluan
pengetahuan-kepenghuluan
pernikahan
nikah
fikih-munakahat
islamic-web-app
vanilla-javascript
static-website
progressive-web-app
pwa
vercel
netlify
```

Topics membantu orang menemukan repository melalui pencarian GitHub. Gunakan topik yang benar-benar menggambarkan isi proyek.

## 3. About Section

Rekomendasi teks:

**Description**
```text
Platform web modular untuk pengetahuan profesional penghulu: regulasi, fikih munakahat, dalil, khutbah, nasihat perkawinan, dan alat bantu pembelajaran.
```

**Website**
```text
https://asistenpenghulu.vercel.app
```

Ganti contoh alamat di atas dengan domain deployment yang benar-benar aktif. Jangan mengisi website dengan URL contoh.

## 4. Visibilitas Repository

Pilih berdasarkan tujuan publikasi dan kepemilikan materi:

- **Public:** cocok jika repository memang akan dijadikan portofolio, dibagikan, atau menerima kontribusi komunitas.
- **Private:** lebih tepat jika kode, materi, atau aset masih perlu ditinjau hak kepemilikannya.

Penting: repository Public tidak otomatis berarti berlisensi open-source. Tanpa lisensi, pengguna lain tidak memperoleh izin otomatis untuk menggunakan, memodifikasi, atau mendistribusikan kode.

## 5. Pengaturan Repository yang Disarankan

Pada **Settings → General**:

- Default branch: `main`.
- Aktifkan Issues agar laporan masalah dapat dikelola.
- Discussions bersifat opsional; aktifkan jika ingin membuka diskusi komunitas.
- Projects dan Wiki dapat dibiarkan nonaktif pada tahap awal karena dokumentasi utama sudah berada di repository.

Pada **Settings → Branches** setelah ada kolaborator:

- Lindungi branch `main`.
- Utamakan perubahan melalui pull request.
- Larang force push dan penghapusan branch utama.
- Jangan mewajibkan status check sebelum workflow CI benar-benar dibuat.

## 6. Social Preview

Agar repository lebih menarik ketika dibagikan, tambahkan gambar Social Preview melalui:

**Settings → General → Social preview → Edit**

Spesifikasi desain yang disarankan:

- Ukuran: 1280 × 640 px.
- Judul: `ASISTEN PENGHULU`.
- Subjudul: `Professional Knowledge Platform for Marriage Officers`.
- Identitas warna: hijau tua, hijau lembut, dan aksen emas.
- Elemen visual: simbol geometris islami yang sederhana, ilustrasi dokumen, dan tampilan antarmuka.
- Hindari menampilkan data pribadi atau dokumen pengguna.

Gambar preview belum disertakan dalam repository ini; tambahkan setelah desain final tersedia.

## 7. Checklist Sebelum Repository Dipublikasikan

- [ ] Nama repository sudah benar.
- [ ] Deskripsi dan topics sudah diisi.
- [ ] `README.md` tampil dengan baik.
- [ ] `index.html` berada di root repository.
- [ ] Seluruh folder `pages/` dan `assets/` terunggah.
- [ ] File konfigurasi Vercel/Netlify ikut terunggah.
- [ ] Tidak ada file sementara, password, token, atau data pribadi.
- [ ] Hak penggunaan font dan materi sudah diperiksa.
- [ ] Keputusan lisensi sudah dibuat secara sadar.
- [ ] Deployment berhasil dan URL website sudah ditambahkan.
- [ ] Social Preview ditambahkan jika sudah tersedia.

## 8. Deskripsi Singkat untuk Profil atau Portofolio

```text
Asisten Penghulu adalah platform pengetahuan profesional yang dikembangkan untuk penghulu melalui integrasi ensiklopedia regulasi, fikih munakahat, dalil, materi khutbah, bank nasihat perkawinan, dan alat bantu pembelajaran. Aplikasi ini tidak mengelola data calon pengantin atau administrasi pencatatan nikah. Dibangun menggunakan HTML, CSS, dan Vanilla JavaScript dengan pendekatan static multi-page application serta dukungan Progressive Web App.
```
