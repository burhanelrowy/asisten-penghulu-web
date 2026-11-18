# Peta Modul

| Modul | Halaman | Inisialisasi | Data khusus |
|---|---|---|---|
| Beranda | `index.html` | `app-core.js` | — |
| Cek Wali Nikah | `pages/wali.html` | `app-core.js` | `data/wali-data.js` |
| Kalkulator Iddah | `pages/iddah.html` | `app-core.js` | — |
| Terjemah Mahar | `pages/mahar.html` | `app-core.js` | `data/mahar-data.js` |
| Lafaz Akad Nikah | `pages/akad.html` | `app-core.js` | — |
| Kumpulan Khutbah | `pages/khutbah.html` | `app-core.js` | `data/khutbah-data.js` |
| Bank Nasihat Perkawinan | `pages/nasihat.html` | `app-core.js` | `data/nasihat-data.js`, `data/bank-nasehat.js` |
| Kalkulator & Konversi | `pages/konversi.html` | `app-core.js` | — |
| Ensiklopedia Kepenghuluan | `pages/ensiklopedia.html` | `app-core.js` | `data/knowledge.js` |
| Referensi Fikih & KHI | `pages/referensi.html` | `app-core.js` | — |

## Prinsip Pemuatan

- `assets/css/app.css` dan `assets/js/app-core.js` digunakan bersama.
- CSS khusus modul hanya dimuat pada halaman yang membutuhkannya.
- Data khutbah, nasihat, dan ensiklopedia tidak dimuat pada halaman beranda.
- Font Arab disimpan sebagai aset lokal.
- Service Worker menyimpan shell aplikasi dan aset yang berhasil diminta browser.

Untuk gambaran layer aplikasi, lihat [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
