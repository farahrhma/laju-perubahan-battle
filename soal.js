// 50 soal Laju Perubahan Satuan - Kelas VII
// a = indeks jawaban benar (0=A, 1=B, 2=C, 3=D), p = pembahasan
const SOAL = [
  {
    "id": 1,
    "q": "Sebuah mobil menempuh jarak 120 km dalam waktu 3 jam. Kecepatan rata-rata mobil tersebut adalah ....",
    "o": [
      "30 km/jam",
      "40 km/jam",
      "50 km/jam",
      "60 km/jam"
    ],
    "a": 1,
    "p": "v = jarak ÷ waktu = 120 ÷ 3 = 40 km/jam."
  },
  {
    "id": 2,
    "q": "Rina bersepeda sejauh 15 km selama 45 menit. Kecepatan rata-rata Rina adalah ....",
    "o": [
      "15 km/jam",
      "18 km/jam",
      "20 km/jam",
      "25 km/jam"
    ],
    "a": 2,
    "p": "45 menit = 0,75 jam. v = 15 ÷ 0,75 = 20 km/jam."
  },
  {
    "id": 3,
    "q": "Sebuah bus melaju dengan kecepatan rata-rata 60 km/jam selama 2,5 jam. Jarak yang ditempuh bus tersebut adalah ....",
    "o": [
      "120 km",
      "135 km",
      "150 km",
      "180 km"
    ],
    "a": 2,
    "p": "Jarak = kecepatan × waktu = 60 × 2,5 = 150 km."
  },
  {
    "id": 4,
    "q": "Jarak rumah Budi ke sekolah adalah 9 km. Jika kecepatan rata-rata kendaraannya 18 km/jam, waktu yang diperlukan untuk sampai ke sekolah adalah ....",
    "o": [
      "15 menit",
      "20 menit",
      "30 menit",
      "45 menit"
    ],
    "a": 2,
    "p": "Waktu = 9 ÷ 18 = 0,5 jam = 30 menit."
  },
  {
    "id": 5,
    "q": "Kendaraan A menempuh jarak 80 km dalam waktu 2 jam, sedangkan kendaraan B menempuh jarak 105 km dalam waktu 3 jam. Selisih kecepatan kedua kendaraan tersebut adalah ....",
    "o": [
      "3 km/jam",
      "5 km/jam",
      "7 km/jam",
      "10 km/jam"
    ],
    "a": 1,
    "p": "Kecepatan A = 80 ÷ 2 = 40 km/jam. Kecepatan B = 105 ÷ 3 = 35 km/jam. Selisih = 40 − 35 = 5 km/jam."
  },
  {
    "id": 6,
    "q": "Sebuah sepeda motor menempuh jarak 24 km dalam waktu 40 menit. Kecepatan rata-ratanya adalah ....",
    "o": [
      "24 km/jam",
      "30 km/jam",
      "36 km/jam",
      "40 km/jam"
    ],
    "a": 2,
    "p": "40 menit = 2/3 jam. Kecepatan = 24 ÷ (2/3) = 36 km/jam."
  },
  {
    "id": 7,
    "q": "Sebuah ember terisi 24 liter air dalam waktu 6 menit. Debit air tersebut adalah ....",
    "o": [
      "2 liter/menit",
      "3 liter/menit",
      "4 liter/menit",
      "6 liter/menit"
    ],
    "a": 2,
    "p": "Debit = volume ÷ waktu = 24 ÷ 6 = 4 liter/menit."
  },
  {
    "id": 8,
    "q": "Keran mengalirkan air dengan debit 8 liter/menit selama 7 menit. Volume air yang terkumpul adalah ....",
    "o": [
      "48 liter",
      "54 liter",
      "56 liter",
      "64 liter"
    ],
    "a": 2,
    "p": "Volume = debit × waktu = 8 × 7 = 56 liter."
  },
  {
    "id": 9,
    "q": "Sebuah bak mandi diisi dengan debit 5 liter/menit hingga terkumpul 75 liter air. Waktu yang diperlukan adalah ....",
    "o": [
      "10 menit",
      "12 menit",
      "15 menit",
      "20 menit"
    ],
    "a": 2,
    "p": "Waktu = volume ÷ debit = 75 ÷ 5 = 15 menit."
  },
  {
    "id": 10,
    "q": "Keran A mengalirkan 36 liter air dalam 6 menit, sedangkan keran B mengalirkan 40 liter air dalam 8 menit. Selisih debit kedua keran adalah ....",
    "o": [
      "0,5 liter/menit",
      "1 liter/menit",
      "1,5 liter/menit",
      "2 liter/menit"
    ],
    "a": 1,
    "p": "Debit A = 36 ÷ 6 = 6 liter/menit. Debit B = 40 ÷ 8 = 5 liter/menit. Selisih = 1 liter/menit."
  },
  {
    "id": 11,
    "q": "Sebuah tangki berisi 120 liter air. Air dialirkan keluar dengan debit 4 liter/menit. Jika tangki awalnya penuh dan tidak ada air yang masuk, waktu yang diperlukan untuk mengeluarkan seluruh air adalah ....",
    "o": [
      "20 menit",
      "25 menit",
      "30 menit",
      "40 menit"
    ],
    "a": 2,
    "p": "Waktu = volume ÷ debit = 120 ÷ 4 = 30 menit."
  },
  {
    "id": 12,
    "q": "Sebuah bak mandi berisi 30 liter air. Keran mengalirkan air dengan debit 6 liter/menit selama 8 menit. Volume air di dalam bak setelah pengisian adalah ....",
    "o": [
      "48 liter",
      "60 liter",
      "72 liter",
      "78 liter"
    ],
    "a": 3,
    "p": "Air yang masuk = 6 × 8 = 48 liter. Volume akhir = 30 + 48 = 78 liter."
  },
  {
    "id": 13,
    "q": "Tinggi tanaman bertambah dari 10 cm menjadi 28 cm selama 6 minggu. Laju pertumbuhan rata-ratanya adalah ....",
    "o": [
      "2 cm/minggu",
      "3 cm/minggu",
      "4 cm/minggu",
      "6 cm/minggu"
    ],
    "a": 1,
    "p": "Pertambahan tinggi = 28 − 10 = 18 cm. Laju = 18 ÷ 6 = 3 cm/minggu."
  },
  {
    "id": 14,
    "q": "Tinggi tanaman pada minggu kedua adalah 12 cm dan pada minggu keenam menjadi 28 cm. Laju pertumbuhan rata-rata tanaman tersebut adalah ....",
    "o": [
      "2 cm/minggu",
      "3 cm/minggu",
      "4 cm/minggu",
      "5 cm/minggu"
    ],
    "a": 2,
    "p": "Selang waktu = 6 − 2 = 4 minggu. Pertambahan tinggi = 28 − 12 = 16 cm. Laju = 16 ÷ 4 = 4 cm/minggu."
  },
  {
    "id": 15,
    "q": "Sebuah tanaman memiliki tinggi awal 15 cm. Jika tanaman bertambah tinggi rata-rata 3 cm setiap minggu selama 5 minggu, tinggi akhirnya adalah ....",
    "o": [
      "25 cm",
      "28 cm",
      "30 cm",
      "35 cm"
    ],
    "a": 2,
    "p": "Pertambahan tinggi = 3 × 5 = 15 cm. Tinggi akhir = 15 + 15 = 30 cm."
  },
  {
    "id": 16,
    "q": "Tanaman A bertambah tinggi 16 cm selama 4 minggu, sedangkan tanaman B bertambah tinggi 21 cm selama 7 minggu. Selisih laju pertumbuhan kedua tanaman tersebut adalah ....",
    "o": [
      "1 cm/minggu",
      "2 cm/minggu",
      "3 cm/minggu",
      "4 cm/minggu"
    ],
    "a": 0,
    "p": "Laju A = 16 ÷ 4 = 4 cm/minggu. Laju B = 21 ÷ 7 = 3 cm/minggu. Selisih = 1 cm/minggu."
  },
  {
    "id": 17,
    "q": "Harga 5 pensil adalah Rp15.000. Harga satu pensil adalah ....",
    "o": [
      "Rp2.000",
      "Rp2.500",
      "Rp3.000",
      "Rp3.500"
    ],
    "a": 2,
    "p": "Harga satu pensil = Rp15.000 ÷ 5 = Rp3.000."
  },
  {
    "id": 18,
    "q": "Toko A menjual 500 gram gula seharga Rp8.000, sedangkan Toko B menjual 1 kg gula seharga Rp15.000. Harga per kilogram gula di Toko A adalah ....",
    "o": [
      "Rp8.000",
      "Rp12.000",
      "Rp15.000",
      "Rp16.000"
    ],
    "a": 3,
    "p": "500 gram = 0,5 kg. Harga per kg di Toko A = Rp8.000 ÷ 0,5 = Rp16.000/kg."
  },
  {
    "id": 19,
    "q": "Sebuah toko menjual 2,5 kg jeruk seharga Rp40.000. Harga jeruk per kilogram adalah ....",
    "o": [
      "Rp12.000",
      "Rp14.000",
      "Rp16.000",
      "Rp20.000"
    ],
    "a": 2,
    "p": "Harga per kg = Rp40.000 ÷ 2,5 = Rp16.000/kg."
  },
  {
    "id": 20,
    "q": "Kemasan A berisi 250 ml jus seharga Rp5.000, sedangkan kemasan B berisi 500 ml jus seharga Rp9.000. Selisih harga per mililiter kedua kemasan adalah ....",
    "o": [
      "Rp1/ml",
      "Rp2/ml",
      "Rp3/ml",
      "Rp4/ml"
    ],
    "a": 1,
    "p": "Harga A = Rp5.000 ÷ 250 = Rp20/ml. Harga B = Rp9.000 ÷ 500 = Rp18/ml. Selisih = Rp2/ml."
  },
  {
    "id": 21,
    "q": "Toko A menjual 3 kg beras seharga Rp42.000, sedangkan Toko B menjual 5 kg beras seharga Rp65.000. Selisih harga per kilogram kedua toko adalah ....",
    "o": [
      "Rp500",
      "Rp1.000",
      "Rp1.500",
      "Rp2.000"
    ],
    "a": 1,
    "p": "Harga A = Rp42.000 ÷ 3 = Rp14.000/kg. Harga B = Rp65.000 ÷ 5 = Rp13.000/kg. Selisih = Rp1.000/kg."
  },
  {
    "id": 22,
    "q": "Harga 4 botol minuman adalah Rp28.000. Jika harga setiap botol sama, harga 7 botol minuman tersebut adalah ....",
    "o": [
      "Rp42.000",
      "Rp45.000",
      "Rp49.000",
      "Rp56.000"
    ],
    "a": 2,
    "p": "Harga per botol = Rp28.000 ÷ 4 = Rp7.000. Harga 7 botol = 7 × Rp7.000 = Rp49.000."
  },
  {
    "id": 23,
    "q": "Sebuah mobil menggunakan 5 liter bensin untuk menempuh jarak 60 km. Jarak yang dapat ditempuh setiap 1 liter bensin adalah ....",
    "o": [
      "10 km/liter",
      "12 km/liter",
      "15 km/liter",
      "20 km/liter"
    ],
    "a": 1,
    "p": "Jarak per liter = 60 ÷ 5 = 12 km/liter."
  },
  {
    "id": 24,
    "q": "Sebuah kendaraan menempuh jarak 180 km dengan konsumsi 15 km/liter. Banyak bensin yang diperlukan adalah ....",
    "o": [
      "10 liter",
      "12 liter",
      "15 liter",
      "18 liter"
    ],
    "a": 1,
    "p": "Bensin yang diperlukan = 180 ÷ 15 = 12 liter."
  },
  {
    "id": 25,
    "q": "Kendaraan A menempuh 14 km dengan 1 liter bensin, sedangkan kendaraan B menempuh 12 km dengan 1 liter bensin. Jika keduanya menggunakan 5 liter bensin, selisih jarak yang ditempuh adalah ....",
    "o": [
      "5 km",
      "10 km",
      "12 km",
      "15 km"
    ],
    "a": 1,
    "p": "Jarak A = 14 × 5 = 70 km. Jarak B = 12 × 5 = 60 km. Selisih = 10 km."
  },
  {
    "id": 26,
    "q": "Sebuah mesin menghasilkan 240 roti dalam waktu 4 jam. Rata-rata produksi mesin setiap jam adalah ....",
    "o": [
      "40 roti/jam",
      "50 roti/jam",
      "60 roti/jam",
      "80 roti/jam"
    ],
    "a": 2,
    "p": "Laju produksi = 240 ÷ 4 = 60 roti/jam."
  },
  {
    "id": 27,
    "q": "Sebuah printer mencetak 150 lembar dalam waktu 5 menit. Jika kecepatannya tetap, jumlah lembar yang dapat dicetak dalam 8 menit adalah ....",
    "o": [
      "200 lembar",
      "220 lembar",
      "240 lembar",
      "250 lembar"
    ],
    "a": 2,
    "p": "Laju cetak = 150 ÷ 5 = 30 lembar/menit. Dalam 8 menit: 30 × 8 = 240 lembar."
  },
  {
    "id": 28,
    "q": "Seorang pekerja mengemas 180 kotak dalam waktu 6 jam. Jika laju kerjanya tetap, waktu yang diperlukan untuk mengemas 300 kotak adalah ....",
    "o": [
      "8 jam",
      "9 jam",
      "10 jam",
      "12 jam"
    ],
    "a": 2,
    "p": "Laju kerja = 180 ÷ 6 = 30 kotak/jam. Waktu = 300 ÷ 30 = 10 jam."
  },
  {
    "id": 29,
    "q": "Mesin A menghasilkan 210 barang dalam 3 jam, sedangkan mesin B menghasilkan 280 barang dalam 4 jam. Selisih laju produksi kedua mesin adalah ....",
    "o": [
      "0 barang/jam",
      "5 barang/jam",
      "10 barang/jam",
      "15 barang/jam"
    ],
    "a": 0,
    "p": "Laju A = 210 ÷ 3 = 70 barang/jam. Laju B = 280 ÷ 4 = 70 barang/jam. Selisih = 0 barang/jam."
  },
  {
    "id": 30,
    "q": "Sebuah mesin mengisi 96 botol dalam waktu 8 menit. Mesin lain mengisi 135 botol dalam waktu 9 menit. Selisih laju pengisian kedua mesin adalah ....",
    "o": [
      "1 botol/menit",
      "2 botol/menit",
      "3 botol/menit",
      "4 botol/menit"
    ],
    "a": 2,
    "p": "Laju mesin pertama = 96 ÷ 8 = 12 botol/menit. Laju mesin kedua = 135 ÷ 9 = 15 botol/menit. Selisih = 3 botol/menit."
  },
  {
    "id": 31,
    "q": "Sebuah kereta menempuh jarak 210 km dalam waktu 3,5 jam. Kecepatan rata-rata kereta adalah ....",
    "o": [
      "50 km/jam",
      "55 km/jam",
      "60 km/jam",
      "70 km/jam"
    ],
    "a": 2,
    "p": "Kecepatan = jarak ÷ waktu = 210 ÷ 3,5 = 60 km/jam."
  },
  {
    "id": 32,
    "q": "Dina berjalan sejauh 1,2 km selama 20 menit. Kecepatan rata-ratanya dalam km/jam adalah ....",
    "o": [
      "2,4 km/jam",
      "3,6 km/jam",
      "4,2 km/jam",
      "6 km/jam"
    ],
    "a": 1,
    "p": "20 menit = 1/3 jam. Kecepatan = 1,2 ÷ (1/3) = 3,6 km/jam."
  },
  {
    "id": 33,
    "q": "Sebuah sepeda melaju dengan kecepatan 12 km/jam selama 45 menit. Jarak yang ditempuh adalah ....",
    "o": [
      "6 km",
      "8 km",
      "9 km",
      "12 km"
    ],
    "a": 2,
    "p": "45 menit = 0,75 jam. Jarak = 12 × 0,75 = 9 km."
  },
  {
    "id": 34,
    "q": "Sebuah mobil menempuh 150 km dengan kecepatan rata-rata 50 km/jam. Waktu yang diperlukan adalah ....",
    "o": [
      "2 jam",
      "2,5 jam",
      "3 jam",
      "3,5 jam"
    ],
    "a": 2,
    "p": "Waktu = jarak ÷ kecepatan = 150 ÷ 50 = 3 jam."
  },
  {
    "id": 35,
    "q": "Kendaraan A menempuh 96 km dalam 2 jam, sedangkan kendaraan B menempuh 126 km dalam 3 jam. Selisih kecepatan keduanya adalah ....",
    "o": [
      "6 km/jam",
      "8 km/jam",
      "10 km/jam",
      "12 km/jam"
    ],
    "a": 0,
    "p": "Kecepatan A = 96 ÷ 2 = 48 km/jam. B = 126 ÷ 3 = 42 km/jam. Selisih = 6 km/jam."
  },
  {
    "id": 36,
    "q": "Sebuah selang mengalirkan 42 liter air dalam 7 menit. Debit airnya adalah ....",
    "o": [
      "5 liter/menit",
      "6 liter/menit",
      "7 liter/menit",
      "8 liter/menit"
    ],
    "a": 1,
    "p": "Debit = volume ÷ waktu = 42 ÷ 7 = 6 liter/menit."
  },
  {
    "id": 37,
    "q": "Pompa air memiliki debit 9 liter/menit. Volume air yang dialirkan selama 12 menit adalah ....",
    "o": [
      "96 liter",
      "108 liter",
      "112 liter",
      "120 liter"
    ],
    "a": 1,
    "p": "Volume = debit × waktu = 9 × 12 = 108 liter."
  },
  {
    "id": 38,
    "q": "Bak berisi 144 liter air akan dikosongkan dengan debit 8 liter/menit. Waktu yang diperlukan adalah ....",
    "o": [
      "16 menit",
      "18 menit",
      "20 menit",
      "22 menit"
    ],
    "a": 1,
    "p": "Waktu = volume ÷ debit = 144 ÷ 8 = 18 menit."
  },
  {
    "id": 39,
    "q": "Keran A mengalirkan 54 liter dalam 9 menit. Keran B mengalirkan 64 liter dalam 8 menit. Selisih debit kedua keran adalah ....",
    "o": [
      "1 liter/menit",
      "2 liter/menit",
      "3 liter/menit",
      "4 liter/menit"
    ],
    "a": 1,
    "p": "Debit A = 54 ÷ 9 = 6 liter/menit. Debit B = 64 ÷ 8 = 8 liter/menit. Selisih = 2 liter/menit."
  },
  {
    "id": 40,
    "q": "Sebuah wadah berisi 25 liter air. Air ditambahkan dengan debit 7 liter/menit selama 5 menit. Volume akhir air adalah ....",
    "o": [
      "55 liter",
      "60 liter",
      "65 liter",
      "70 liter"
    ],
    "a": 1,
    "p": "Air yang ditambahkan = 7 × 5 = 35 liter. Volume akhir = 25 + 35 = 60 liter."
  },
  {
    "id": 41,
    "q": "Tinggi tanaman bertambah dari 18 cm menjadi 42 cm selama 8 minggu. Laju pertumbuhan rata-ratanya adalah ....",
    "o": [
      "2 cm/minggu",
      "3 cm/minggu",
      "4 cm/minggu",
      "5 cm/minggu"
    ],
    "a": 1,
    "p": "Pertambahan tinggi = 42 − 18 = 24 cm. Laju = 24 ÷ 8 = 3 cm/minggu."
  },
  {
    "id": 42,
    "q": "Sebuah tanaman bertambah tinggi 2,5 cm setiap minggu. Pertambahan tinggi selama 6 minggu adalah ....",
    "o": [
      "12 cm",
      "13 cm",
      "15 cm",
      "18 cm"
    ],
    "a": 2,
    "p": "Pertambahan tinggi = 2,5 × 6 = 15 cm."
  },
  {
    "id": 43,
    "q": "Tinggi tanaman pada minggu pertama 14 cm dan pada minggu kelima 30 cm. Laju pertumbuhan rata-rata selama selang waktu tersebut adalah ....",
    "o": [
      "3 cm/minggu",
      "4 cm/minggu",
      "4,5 cm/minggu",
      "5 cm/minggu"
    ],
    "a": 1,
    "p": "Selang waktu = 5 − 1 = 4 minggu. Pertambahan tinggi = 30 − 14 = 16 cm. Laju = 16 ÷ 4 = 4 cm/minggu."
  },
  {
    "id": 44,
    "q": "Harga 750 gram kacang adalah Rp18.000. Harga 1 kg kacang dengan harga satuan yang sama adalah ....",
    "o": [
      "Rp20.000",
      "Rp22.000",
      "Rp24.000",
      "Rp26.000"
    ],
    "a": 2,
    "p": "750 gram = 0,75 kg. Harga per kg = Rp18.000 ÷ 0,75 = Rp24.000."
  },
  {
    "id": 45,
    "q": "Enam buku tulis berharga Rp27.000. Harga 10 buku tulis dengan harga satuan yang sama adalah ....",
    "o": [
      "Rp40.000",
      "Rp42.000",
      "Rp45.000",
      "Rp48.000"
    ],
    "a": 2,
    "p": "Harga satu buku = Rp27.000 ÷ 6 = Rp4.500. Harga 10 buku = 10 × Rp4.500 = Rp45.000."
  },
  {
    "id": 46,
    "q": "Kemasan A berisi 400 ml susu seharga Rp8.000. Harga per mililiter susu tersebut adalah ....",
    "o": [
      "Rp15/ml",
      "Rp20/ml",
      "Rp25/ml",
      "Rp30/ml"
    ],
    "a": 1,
    "p": "Harga per ml = Rp8.000 ÷ 400 = Rp20/ml."
  },
  {
    "id": 47,
    "q": "Sebuah kendaraan menempuh 225 km dengan 15 liter bensin. Efisiensi bahan bakarnya adalah ....",
    "o": [
      "12 km/liter",
      "13 km/liter",
      "15 km/liter",
      "18 km/liter"
    ],
    "a": 2,
    "p": "Jarak per liter = 225 ÷ 15 = 15 km/liter."
  },
  {
    "id": 48,
    "q": "Motor menempuh 40 km dengan 2 liter bensin. Jika efisiensinya tetap, bensin yang dibutuhkan untuk menempuh 140 km adalah ....",
    "o": [
      "5 liter",
      "6 liter",
      "7 liter",
      "8 liter"
    ],
    "a": 2,
    "p": "Efisiensi = 40 ÷ 2 = 20 km/liter. Bensin untuk 140 km = 140 ÷ 20 = 7 liter."
  },
  {
    "id": 49,
    "q": "Sebuah mesin menghasilkan 360 kemasan dalam 6 jam. Jika laju produksi tetap, jumlah kemasan yang dihasilkan dalam 9 jam adalah ....",
    "o": [
      "480 kemasan",
      "520 kemasan",
      "540 kemasan",
      "600 kemasan"
    ],
    "a": 2,
    "p": "Laju produksi = 360 ÷ 6 = 60 kemasan/jam. Dalam 9 jam: 60 × 9 = 540 kemasan."
  },
  {
    "id": 50,
    "q": "Mesin A mengemas 320 barang dalam 4 jam, sedangkan mesin B mengemas 450 barang dalam 5 jam. Selisih laju produksi kedua mesin adalah ....",
    "o": [
      "10 barang/jam",
      "15 barang/jam",
      "20 barang/jam",
      "25 barang/jam"
    ],
    "a": 0,
    "p": "Laju A = 320 ÷ 4 = 80 barang/jam. Laju B = 450 ÷ 5 = 90 barang/jam. Selisih = 10 barang/jam."
  }
];
