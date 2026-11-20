# Catatan Pengembangan Asisten Penghulu v5.2.0

## Ruang lingkup

v5.2.0 mempertahankan platform sebagai sarana pengetahuan dan alat bantu profesional penghulu. Tidak ada fitur administrasi calon pengantin, pendaftaran nikah, atau pengelolaan dokumen pelayanan yang ditambahkan.

## 1. Pemeriksaan status keberadaan wali

Ditambahkan pilihan status: `Diketahui`, `Tidak diketahui`, dan `Belum diverifikasi`.

- `Diketahui`: pemeriksaan berlanjut ke syarat wali dan pertanyaan kehadiran/taukil.
- `Tidak diketahui`: evaluasi menampilkan penjelasan PMA Nomor 30 Tahun 2024 Pasal 13 ayat (5) huruf c jo. ayat (7). Persyaratan yang disebutkan adalah surat pernyataan bermeterai dari calon pengantin dan disaksikan oleh 2 (dua) orang saksi. Aplikasi tidak otomatis menetapkan wali hakim.
- `Belum diverifikasi`: evaluasi dihentikan dan pengguna diarahkan untuk melakukan klarifikasi.
- Wali yang diketahui lokasinya tetapi tidak hadir tetap dibedakan dari wali yang tidak diketahui keberadaannya. Pemeriksaan kemungkinan taukil mengacu pada Pasal 12 ayat (5).
- Status wafat tetap memakai alur otomatis ke tingkat wali nasab berikutnya, sebagaimana fitur sebelumnya.

## 2. Penyempurnaan teks kabul

Kedua versi teks kabul Bahasa Indonesia kini mencantumkan frasa **“untuk diri saya sendiri”**.

Versi ringkas: `Saya terima nikah dan kawinnya [nama calon istri] untuk diri saya sendiri dengan maskawin tersebut dibayar tunai.`

Versi lengkap: `Saya terima nikah dan kawinnya [nama calon istri] untuk diri saya sendiri dengan maskawin [rincian maskawin] dibayar tunai.`

Pada transliterasi dan teks Arab, ditambahkan padanan `li-nafsii` / `لِنَفْسِي`. Mode pembayaran tetap mengikuti pilihan tunai atau hutang yang sudah ada.

## Sumber hukum

- PMA Nomor 30 Tahun 2024, Pasal 12 ayat (5): wali yang tidak hadir dapat melakukan taukil wali di hadapan PPN sesuai domisili/keberadaan wali dan disaksikan 2 orang.
- PMA Nomor 30 Tahun 2024, Pasal 13 ayat (5) huruf c dan ayat (7): keadaan wali tidak diketahui keberadaannya dan dasar surat pernyataan bermeterai dari calon pengantin yang disaksikan 2 orang saksi.
- Naskah resmi: https://peraturan.go.id/filespengundangan/permenag-no-30-tahun-2024.pdf

## Catatan penggunaan

Fitur pemeriksaan wali merupakan alat bantu pengetahuan dan penyaringan awal, bukan penetapan hukum otomatis. Redaksi kabul adalah contoh penyusunan naskah; pelaksanaan akad tetap mengikuti bimbingan dan ketentuan pejabat berwenang.
