# ⚔️ Laju Perubahan Battle – Kelas VII (TGT)

Game kuis kelompok bergaya Baamboozle: papan 50 kotak bernomor, tiap kotak berisi satu soal pilihan ganda.
Murni HTML/CSS/JavaScript, tanpa library dan tanpa internet (cocok dipakai di kelas).

## Isi folder

| File | Fungsi |
|------|--------|
| `index.html` | Halaman game |
| `style.css` | Tampilan |
| `script.js` | Logika permainan (giliran, skor, timer, hasil) |
| `soal.js` | **50 soal + kunci + pembahasan** (ubah soal cukup di sini) |

## Cara mengunggah ke GitHub Pages

1. Di repo GitHub, klik **Add file → Upload files**, lalu seret keempat file ke dalam sebuah folder, misalnya `laju-game/`
   (kalau mengetik nama folder di kolom path, GitHub akan membuatnya otomatis).
2. Klik **Commit changes**.
3. Buka **Settings → Pages**, pilih *Deploy from a branch* → branch `main` → folder `/ (root)` → **Save**.
4. Tunggu 1–2 menit. Alamatnya: `https://USERNAME.github.io/NAMA-REPO/laju-game/`

Kalau repo sudah memakai workflow deploy GitHub Actions, cukup commit folder ini ke dalam repo; Pages akan ikut ter-deploy.

## Cara bermain (alur TGT)

1. Pilih **jumlah kelompok (1–8)**, ubah nama kelompok bila perlu, atur poin dan timer, lalu **Mulai**.
2. Kelompok yang mendapat giliran memilih satu nomor di papan.
3. Soal tampil di layar (jawaban **belum** ditampilkan). Kelompok berdiskusi dan menjawab; timer berjalan bila diaktifkan.
4. Guru mengklik pilihan yang dijawab kelompok (atau tekan `A`–`D`), lalu menekan **Kunci Jawaban**.
   Centang **bonus** sebelum mengunci bila ingin memberi poin tambahan jika benar.
5. **Jika benar** → poin langsung masuk ke kelompok tersebut, jawaban dan pembahasan tampil.
   **Jika salah** (atau kelompok memilih **Tidak bisa menjawab**) → pilih salah satu:
   - **Tampilkan jawaban benar** (tanpa poin), atau
   - **Lempar ke kelompok lain** → pilih kelompok yang menjawab; ia mendapat poin penuh bila benar.
     Pilihan yang sudah salah dikunci, dan soal bisa dilempar lagi sampai semua kelompok mencoba.
6. Klik **Lanjut** → giliran pindah ke kelompok berikutnya. Setelah 50 kotak terpakai (atau tombol **Akhiri** ditekan), muncul peringkat akhir.

Tips: klik nama kelompok di papan skor untuk memindahkan giliran secara manual; tombol **−/+** di papan skor
mengoreksi skor sebesar satu kali poin dasar. Permainan tersimpan otomatis di browser, jadi aman bila halaman
tidak sengaja ter-refresh (tombol **Lanjutkan permainan terakhir** di menu).

Pintasan: `A`–`D` = pilih jawaban, `Enter` = kunci jawaban / lanjut, `Esc` = tutup soal.

## Mengubah soal

Buka `soal.js`. Setiap soal berbentuk:

```js
{
  "id": 1,
  "q": "Teks soal ....",
  "o": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
  "a": 1,                 // jawaban benar: 0 = A, 1 = B, 2 = C, 3 = D
  "p": "Pembahasan singkat."
}
```

Papan dirancang untuk 50 soal (10 × 5 kotak). Mengganti isi soal aman; jika jumlahnya diubah, atur
`grid-template-rows` pada `.board` di `style.css` agar tampilan tetap muat satu layar.
