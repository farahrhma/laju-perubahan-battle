/* =========================================================
   BELAJAR RASIO - SMP KELAS 7
   Bagian yang biasanya kamu ubah: MATERI, LATIHAN, KUIS
========================================================= */


/* ---------- 1. NAVIGASI ---------- */

function showPage(id) {
  document.querySelectorAll(".page").forEach(function (p) {
    p.classList.toggle("active", p.id === id);
  });
  document.querySelectorAll(".links button").forEach(function (b) {
    b.classList.toggle("on", b.dataset.page === id);
  });
  window.scrollTo({ top: 0 });
}

document.querySelectorAll("[data-page]").forEach(function (el) {
  el.addEventListener("click", function () { showPage(el.dataset.page); });
});


/* ---------- 2. MATERI ----------
   Taruh file PDF kamu di folder "materi/" dengan nama
   sesuai kolom "pdf" di bawah (atau ganti namanya di sini). */

/* Versi materi. Versi 1 memakai nama file di kolom "pdf" apa adanya.
   Versi 2 memakai nama yang sama ditambah "-v2", misalnya
   materi/1-konsep-rasio-v2.pdf. Ubah "nama" sesuka kamu
   (misalnya "Ringkas" dan "Lengkap"). */

const VERSI = [
  { nama: "Versi 1", akhiran: "" },
  { nama: "Versi 2", akhiran: "-v2" }
];

const MATERI = [
  {
    judul: "Konsep Rasio",
    pdf: "materi/1-konsep-rasio.pdf",
    isi: "Rasio adalah perbandingan dua besaran yang sejenis. Rasio a dan b ditulis a : b atau a/b.",
    contoh: "Di kelas ada 12 siswa laki-laki dan 18 siswa perempuan. Rasio laki-laki : perempuan = 12 : 18 = 2 : 3."
  },
  {
    judul: "Selisih dan Rasio",
    pdf: "materi/2-selisih-dan-rasio.pdf",
    isi: "Selisih menunjukkan berapa lebihnya (pengurangan), sedangkan rasio menunjukkan berapa kali lipatnya (perbandingan).",
    contoh: "Bilangan 4 dan 8 punya selisih 4 dan rasio 1 : 2. Jika keduanya ditambah 4 menjadi 8 dan 12, selisihnya tetap 4 tetapi rasionya berubah menjadi 2 : 3."
  },
  {
    judul: "Faktor Skala",
    pdf: "materi/3-faktor-skala.pdf",
    isi: "Faktor skala adalah bilangan pengali untuk memperbesar atau memperkecil ukuran. Pada peta, skala 1 : 200 berarti 1 cm pada peta mewakili 200 cm sebenarnya.",
    contoh: "Sebuah gambar panjangnya 4 cm. Dengan faktor skala 3, panjangnya menjadi 4 × 3 = 12 cm."
  },
  {
    judul: "Rasio Ekuivalen dan Proporsi",
    pdf: "materi/4-rasio-ekuivalen-proporsi.pdf",
    isi: "Rasio ekuivalen didapat dengan mengalikan atau membagi kedua bagian rasio dengan bilangan yang sama. Proporsi adalah pernyataan bahwa dua rasio bernilai sama.",
    contoh: "2 : 3 = 4 : 6 = 6 : 9. Untuk proporsi 2/3 = x/12, kalikan 3 dengan 4 untuk mendapat 12, jadi x = 2 × 4 = 8."
  },
  {
    judul: "Laju Perubahan",
    pdf: "materi/5-laju-perubahan.pdf",
    isi: "Laju membandingkan dua besaran yang satuannya berbeda, misalnya kecepatan = jarak ÷ waktu.",
    contoh: "Mobil menempuh 180 km dalam 3 jam. Lajunya = 180 ÷ 3 = 60 km/jam."
  }
];

const menu = document.getElementById("materi-menu");
const isi = document.getElementById("materi-isi");

MATERI.forEach(function (m, i) {
  const btn = document.createElement("button");
  btn.textContent = (i + 1) + ". " + m.judul;
  btn.addEventListener("click", function () {
    menu.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    let tabs = "";
    VERSI.forEach(function (v, k) {
      tabs += '<button data-v="' + k + '"' + (k === 0 ? ' class="on"' : "") + ">" + v.nama + "</button>";
    });

    isi.innerHTML =
      "<h3>" + m.judul + "</h3>" +
      "<p>" + m.isi + "</p>" +
      '<div class="contoh"><b>Contoh:</b> ' + m.contoh + "</div>" +
      '<div class="versi">' + tabs + "</div>" +
      '<iframe src="' + m.pdf + '" title="Slide ' + m.judul + '"></iframe>' +
      '<a class="unduh" href="' + m.pdf + '" target="_blank" rel="noopener">Buka atau unduh PDF</a>';

    const frame = isi.querySelector("iframe");
    const tautan = isi.querySelector(".unduh");
    const tombolVersi = isi.querySelectorAll(".versi button");

    tombolVersi.forEach(function (t) {
      t.addEventListener("click", function () {
        const v = VERSI[Number(t.dataset.v)];
        const alamat = m.pdf.replace(".pdf", v.akhiran + ".pdf");
        tombolVersi.forEach(function (x) { x.classList.remove("on"); });
        t.classList.add("on");
        frame.src = alamat;
        tautan.href = alamat;
      });
    });
  });
  menu.appendChild(btn);
});


/* ---------- 3. SIMULASI (5 buah) ---------- */

function fpb(a, b) { return b === 0 ? a : fpb(b, a % b); }
function sed(a, b) { const g = fpb(a, b); return (a / g) + " : " + (b / g); }
function koma(n) { return String(n).replace(".", ","); }
function el(id) { return document.getElementById(id); }


/* Pilihan simulasi (tab) */

document.querySelectorAll(".sim-menu button").forEach(function (b) {
  b.addEventListener("click", function () {
    document.querySelectorAll(".sim-menu button").forEach(function (x) {
      x.classList.toggle("on", x === b);
    });
    document.querySelectorAll(".sim").forEach(function (p) {
      p.classList.toggle("active", p.id === "sim-" + b.dataset.sim);
    });
    if (b.dataset.sim === "5") gambar5();
  });
});


/* Simulasi 1: Konsep rasio */

const sR = el("s-r");
const sB = el("s-b");

function updateSimulasi() {
  const r = Number(sR.value);
  const b = Number(sB.value);
  const g = fpb(r, b);

  el("n-r").textContent = r;
  el("n-b").textContent = b;
  el("r-asli").textContent = r + " : " + b;
  el("r-sederhana").textContent = (r / g) + " : " + (b / g);

  let bola = "";
  for (let i = 0; i < r; i++) bola += '<span class="dot r big"></span>';
  for (let i = 0; i < b; i++) bola += '<span class="dot b big"></span>';
  el("bola").innerHTML = bola;

  el("r-catatan").textContent = g > 1
    ? "Kedua bilangan dibagi " + g + " (FPB dari " + r + " dan " + b + ") supaya rasionya sederhana."
    : "Rasio ini sudah sederhana karena FPB dari " + r + " dan " + b + " adalah 1.";
}

sR.addEventListener("input", updateSimulasi);
sB.addEventListener("input", updateSimulasi);
updateSimulasi();


function fmt(n) { return n.toLocaleString("id-ID", { maximumFractionDigits: 2 }); }


/* Sub-tab di dalam simulasi (Faktor skala dan Rasio ekuivalen) */

document.querySelectorAll(".subtabs").forEach(function (box) {
  if (box.id === "mode2") return;
  box.querySelectorAll("button").forEach(function (b) {
    b.addEventListener("click", function () {
      box.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
      box.parentElement.querySelectorAll(":scope > .sub").forEach(function (p) {
        p.classList.toggle("active", p.id === b.dataset.sub);
      });
    });
  });
});


/* Simulasi 2: Selisih dan rasio (penjumlahan, selisih, perkalian) */

let mode2 = "tambah";

function aturMode2(m) {
  mode2 = m;
  const s = el("s2t");
  if (m === "kali") {
    s.min = 1; s.max = 5; s.value = 1;
    el("lab2").textContent = "Keduanya dikali";
  } else {
    s.min = 0; s.max = 20; s.value = 0;
    el("lab2").textContent = m === "tambah" ? "Keduanya ditambah" : "Keduanya dikurangi";
  }
  updateSim2();
}

function updateSim2() {
  const a = Number(el("s2a").value);
  const b = Number(el("s2b").value);
  const s = el("s2t");

  if (mode2 === "kurang") {
    const mx = Math.max(0, Math.min(a, b) - 1);
    s.max = mx;
    if (Number(s.value) > mx) s.value = mx;
  }
  const t = Number(s.value);

  const A = mode2 === "tambah" ? a + t : mode2 === "kurang" ? a - t : a * t;
  const B = mode2 === "tambah" ? b + t : mode2 === "kurang" ? b - t : b * t;

  el("a2").textContent = a;
  el("b2").textContent = b;
  el("t2").textContent = t;

  const skala = Math.max(A, B, 20);
  el("bar2a").style.width = (A / skala * 100) + "%";
  el("bar2b").style.width = (B / skala * 100) + "%";
  el("v2a").textContent = A;
  el("v2b").textContent = B;

  const sel0 = Math.abs(b - a);
  const sel1 = Math.abs(B - A);
  el("sel2").textContent = "awal " + sel0 + ", sekarang " + sel1;
  el("ras2").textContent = sed(a, b) + " (awal)  →  " + sed(A, B) + " (sekarang)";

  let cat;
  if (a === b) {
    cat = "Kedua bilangan sama, jadi rasionya selalu 1 : 1. Coba buat A dan B berbeda.";
  } else if (mode2 === "kali") {
    cat = t === 1
      ? "Geser faktor pengali untuk melihat perubahannya."
      : "Rasio tetap " + sed(a, b) + ", tetapi selisihnya menjadi " + t + " kali lebih besar (" + sel1 + ").";
  } else {
    cat = t === 0
      ? "Geser slider di atas untuk melihat perubahannya."
      : "Selisih tetap " + sel0 + ", tetapi rasionya berubah menjadi " + sed(A, B) + ".";
  }
  el("cat2").textContent = cat;
}

document.querySelectorAll("#mode2 button").forEach(function (b) {
  b.addEventListener("click", function () {
    document.querySelectorAll("#mode2 button").forEach(function (x) { x.classList.toggle("on", x === b); });
    aturMode2(b.dataset.m);
  });
});
["s2a", "s2b", "s2t"].forEach(function (id) { el(id).addEventListener("input", updateSim2); });
updateSim2();


/* Simulasi 3: Faktor skala */

const PX_PER_CM = 30;

function updateSim3() {
  const k = Number(el("s3").value);
  const p = 4 * k;
  const l = 3 * k;

  el("k3").textContent = koma(k);
  el("rect3").style.width = (p * PX_PER_CM) + "px";
  el("rect3").style.height = (l * PX_PER_CM) + "px";
  el("p3").textContent = "4 × " + koma(k) + " = " + koma(p) + " cm";
  el("l3").textContent = "3 × " + koma(k) + " = " + koma(l) + " cm";

  const arah = k < 1
    ? "Faktor skala di bawah 1 memperkecil gambar."
    : k > 1
      ? "Faktor skala di atas 1 memperbesar gambar."
      : "Faktor skala 1 membuat ukuran tetap sama.";
  el("c3").textContent = arah + " Perbandingan panjang : lebar tetap 4 : 3.";
}

el("s3").addEventListener("input", updateSim3);
updateSim3();


/* Simulasi 3 (lanjutan): Skala, JP, JS */

function updatePeta() {
  const cari = el("cari3").value;
  const S = Number(el("skala3").value);
  const jp = Number(el("jp3").value);
  const js = Number(el("js3").value);

  el("skala3").disabled = cari === "skala";
  el("jp3").disabled = cari === "jp";
  el("js3").disabled = cari === "js";
  el("vjp3").textContent = cari === "jp" ? "?" : jp;
  el("vjs3").textContent = cari === "js" ? "?" : js;

  let h;
  if (cari === "js") {
    const cm = jp * S;
    h = "JS = JP ÷ skala = " + jp + " × " + fmt(S) + " = " + fmt(cm) + " cm = " + fmt(cm / 100000) + " km";
  } else if (cari === "jp") {
    const cm = js * 100000;
    h = "JP = JS × skala = " + fmt(cm) + " ÷ " + fmt(S) + " = " + fmt(cm / S) + " cm";
  } else {
    const cm = js * 100000;
    h = "Skala = JP : JS = " + jp + " : " + fmt(cm) + " = 1 : " + fmt(cm / jp);
  }
  el("hasil3").textContent = h;
}

["cari3", "skala3", "jp3", "js3"].forEach(function (id) {
  el(id).addEventListener("input", updatePeta);
});
updatePeta();


/* Simulasi 4: Rasio ekuivalen */

function updateSim4() {
  const a = Number(el("s4a").value);
  const b = Number(el("s4b").value);
  const kk = Number(el("s4k").value);

  el("a4").textContent = a;
  el("b4").textContent = b;
  el("k4").textContent = kk;

  let h = "<tr><th>Faktor</th><th>Rasio</th><th>Pecahan</th></tr>";
  for (let k = 1; k <= 6; k++) {
    h += "<tr" + (k === kk ? ' class="pilih"' : "") + ">" +
      "<td>× " + k + "</td>" +
      "<td>" + (a * k) + " : " + (b * k) + "</td>" +
      "<td>" + (a * k) + "/" + (b * k) + "</td></tr>";
  }
  el("tabel4").innerHTML = h;
  el("prop4").textContent = "Proporsi: " + a + "/" + b + " = " + (a * kk) + "/" + (b * kk);
}

["s4a", "s4b", "s4k"].forEach(function (id) { el(id).addEventListener("input", updateSim4); });
updateSim4();


/* Simulasi 4 (lanjutan): Proporsi */

function updateProporsi() {
  const a = Number(el("pa").value);
  const b = Number(el("pb").value);
  const c = Number(el("pc").value);
  const x = b * c / a;

  el("pav").textContent = a;
  el("pbv").textContent = b;
  el("pcv").textContent = c;
  el("pr1").textContent = a + " : " + b + " = " + c + " : x";
  el("pr2").textContent = "Kali silang: " + a + " × x = " + b + " × " + c + " = " + (b * c);
  el("pr3").textContent = "x = " + (b * c) + " ÷ " + a + " = " + fmt(x);
  el("cpr").textContent = "Cek: " + a + "/" + b + " dan " + c + "/" + fmt(x) + " sama-sama bernilai " + fmt(a / b) + ".";
}

["pa", "pb", "pc"].forEach(function (id) { el(id).addEventListener("input", updateProporsi); });
updateProporsi();


/* Simulasi 4 (lanjutan): Perbandingan senilai */

function updateSenilai() {
  const q1 = Number(el("q1s").value);
  const q2 = Number(el("q2s").value);
  const u = Number(el("us").value) * 1000;
  const h1 = q1 * u;
  const h2 = q2 * u;

  el("q1sv").textContent = q1;
  el("q2sv").textContent = q2;
  el("usv").textContent = "Rp" + fmt(u);
  el("rs1").textContent = "Harga " + q1 + " buku = Rp" + fmt(h1);
  el("rs2").textContent = "Harga " + q2 + " buku = Rp" + fmt(h2);
  el("rs3").textContent = "Banyak buku: " + q1 + " : " + q2 + " = " + sed(q1, q2);
  el("rs4").textContent = "Harga: " + fmt(h1) + " : " + fmt(h2) + " = " + sed(h1, h2);
  const arah = q2 > q1
    ? "Banyak buku bertambah (" + q1 + " → " + q2 + "), harga ikut bertambah (Rp" + fmt(h1) + " → Rp" + fmt(h2) + ")."
    : q2 < q1
      ? "Banyak buku berkurang (" + q1 + " → " + q2 + "), harga ikut berkurang (Rp" + fmt(h1) + " → Rp" + fmt(h2) + ")."
      : "Banyak buku tidak berubah, harga juga tidak berubah.";
  el("cs").textContent = arah + " Itulah ciri senilai: besaran bertambah, besaran lain ikut bertambah.";
}

["q1s", "us", "q2s"].forEach(function (id) { el(id).addEventListener("input", updateSenilai); });
updateSenilai();


/* Simulasi 4 (lanjutan): Perbandingan berbalik nilai */

function updateBalik() {
  const p1 = Number(el("p1b").value);
  const h1 = Number(el("h1b").value);
  const p2 = Number(el("p2b").value);
  const total = p1 * h1;
  const h2 = total / p2;

  el("p1bv").textContent = p1;
  el("h1bv").textContent = h1;
  el("p2bv").textContent = p2;
  el("rb1").textContent = "Total pekerjaan = " + p1 + " × " + h1 + " = " + total + " pekerja-hari";
  el("rb2").textContent = "Hari yang dibutuhkan = " + total + " ÷ " + p2 + " = " + fmt(h2) + " hari";
  el("rb3").textContent = "Pekerja " + p1 + " : " + p2 + " = " + sed(p1, p2) +
    ", sedangkan hari " + fmt(h1) + " : " + fmt(h2) + " = " +
    (Number.isInteger(h2) ? sed(h1, h2) : "tidak bulat");
  const arah = p2 > p1
    ? "Pekerja bertambah (" + p1 + " → " + p2 + "), hari berkurang (" + fmt(h1) + " → " + fmt(h2) + ")."
    : p2 < p1
      ? "Pekerja berkurang (" + p1 + " → " + p2 + "), hari bertambah (" + fmt(h1) + " → " + fmt(h2) + ")."
      : "Pekerja tidak berubah, hari juga tidak berubah.";
  el("cb").textContent = arah + " Itulah ciri berbalik nilai: besaran bertambah, besaran lain berkurang. " +
    "Pekerja × hari selalu tetap " + total + ".";
}

["p1b", "h1b", "p2b"].forEach(function (id) { el(id).addEventListener("input", updateBalik); });
updateBalik();


/* Simulasi 5: Laju perubahan (grafik jarak-waktu) */

const cv = el("grafik5");
const cx = cv.getContext("2d");
let t5 = 5;
let anim5 = null;

function gambar5() {
  const v = Number(el("s5").value);
  const W = cv.width, H = cv.height;
  const L = 55, R = W - 15, T = 20, B = H - 40;
  const jarak = v * t5;

  cx.clearRect(0, 0, W, H);
  cx.font = "13px sans-serif";
  cx.lineWidth = 1;

  for (let i = 0; i <= 5; i++) {
    const x = L + (R - L) * i / 5;
    const y = B - (B - T) * i / 5;
    cx.strokeStyle = "#e6e1cf";
    cx.beginPath(); cx.moveTo(x, T); cx.lineTo(x, B); cx.stroke();
    cx.beginPath(); cx.moveTo(L, y); cx.lineTo(R, y); cx.stroke();
    cx.fillStyle = "#5d6785";
    cx.textAlign = "center"; cx.fillText(i, x, B + 17);
    cx.textAlign = "right"; cx.fillText(i * 100, L - 8, y + 4);
  }

  cx.strokeStyle = "#1d2b4f"; cx.lineWidth = 2;
  cx.beginPath(); cx.moveTo(L, T); cx.lineTo(L, B); cx.lineTo(R, B); cx.stroke();
  cx.fillStyle = "#1d2b4f";
  cx.textAlign = "center"; cx.fillText("waktu (jam)", (L + R) / 2, H - 6);
  cx.textAlign = "left"; cx.fillText("jarak (km)", 6, 14);

  const px = L + (R - L) * t5 / 5;
  const py = B - (B - T) * jarak / 500;
  cx.strokeStyle = "#2a6fdb"; cx.lineWidth = 4;
  cx.beginPath(); cx.moveTo(L, B); cx.lineTo(px, py); cx.stroke();
  cx.fillStyle = "#e4572e";
  cx.beginPath(); cx.arc(px, py, 6, 0, Math.PI * 2); cx.fill();

  el("v5").textContent = v;
  el("mobil5").style.left = "calc((100% - 44px) * " + (jarak / 500) + ")";
  el("info5").textContent = t5 === 0
    ? "Tekan Jalankan untuk memulai."
    : "Setelah " + koma(Math.round(t5 * 10) / 10) + " jam: jarak = " + v + " × " +
      koma(Math.round(t5 * 10) / 10) + " = " + koma(Math.round(jarak)) + " km. " +
      "Laju = jarak ÷ waktu = " + v + " km/jam.";
}

function jalankan5() {
  cancelAnimationFrame(anim5);
  let mulai = null;
  function langkah(ts) {
    if (mulai === null) mulai = ts;
    t5 = Math.min(5, (ts - mulai) / 1000);
    gambar5();
    if (t5 < 5) anim5 = requestAnimationFrame(langkah);
  }
  t5 = 0;
  anim5 = requestAnimationFrame(langkah);
}

el("s5").addEventListener("input", function () {
  cancelAnimationFrame(anim5);
  t5 = 5;
  gambar5();
});
el("go5").addEventListener("click", jalankan5);
gambar5();


/* ---------- 4. LATIHAN DAN KUIS ----------
   Tiap soal: tanya, opsi (daftar), jawab (nomor opsi benar,
   mulai dari 0), bahas (penjelasan singkat). */

/* Soal Latihan: 5 sub-bab, masing-masing 2 level, tiap level 10 soal.
   Urutan sub-bab sama dengan MATERI. Tiap soal: tanya, opsi (daftar),
   jawab (nomor opsi benar, mulai dari 0), bahas (penjelasan singkat). */

const LATIHAN = [

  /* ===== 1. KONSEP RASIO ===== */
  {
    judul: "Konsep Rasio",
    level1: [
      {
        tanya: "Di kelas terdapat 12 siswa laki-laki dan 18 siswa perempuan. Rasio laki-laki : perempuan dalam bentuk paling sederhana adalah...",
        opsi: ["2 : 3", "3 : 2", "12 : 30", "1 : 3"],
        jawab: 0,
        bahas: "Rasio laki-laki : perempuan = 12 : 18. Kedua bilangan dibagi 6 (FPB), sehingga 12 : 18 = 2 : 3."
      },
      {
        tanya: "Rasio yang setara dengan 4 : 6 adalah...",
        opsi: ["3 : 2", "2 : 3", "4 : 3", "1 : 3"],
        jawab: 1,
        bahas: "Rasio 4 : 6 disederhanakan dengan membagi kedua bilangan dengan 2, sehingga diperoleh 2 : 3."
      },
      {
        tanya: "Di meja terdapat 8 buku dan 12 pensil. Rasio buku : pensil dalam bentuk paling sederhana adalah...",
        opsi: ["3 : 2", "2 : 3", "8 : 20", "1 : 2"],
        jawab: 1,
        bahas: "Rasio buku : pensil = 8 : 12. Kedua bilangan dibagi 4, sehingga diperoleh 2 : 3."
      },
      {
        tanya: "Rasio 15 : 20 dalam bentuk paling sederhana adalah...",
        opsi: ["4 : 3", "5 : 4", "3 : 4", "3 : 5"],
        jawab: 2,
        bahas: "FPB dari 15 dan 20 adalah 5. Maka, 15 : 20 = (15 ÷ 5) : (20 ÷ 5) = 3 : 4."
      },
      {
        tanya: "Bentuk pecahan dari rasio 3 : 5 adalah...",
        opsi: ["5/3", "3/5", "3/8", "5/8"],
        jawab: 1,
        bahas: "Rasio a : b dapat ditulis sebagai pecahan a/b. Jadi, rasio 3 : 5 dapat ditulis sebagai 3/5."
      },
      {
        tanya: "Di dalam keranjang terdapat 5 bola merah dan 7 bola biru. Rasio bola merah terhadap seluruh bola adalah...",
        opsi: ["5 : 7", "7 : 12", "5 : 12", "5 : 2"],
        jawab: 2,
        bahas: "Jumlah seluruh bola = 5 + 7 = 12. Rasio bola merah terhadap seluruh bola adalah 5 : 12."
      },
      {
        tanya: "Rasio 2 : 3 yang kedua bilangannya dikalikan 4 menjadi...",
        opsi: ["4 : 6", "6 : 8", "8 : 12", "2 : 12"],
        jawab: 2,
        bahas: "Kalikan kedua bilangan dengan 4: (2 × 4) : (3 × 4) = 8 : 12. Rasio ini setara dengan 2 : 3."
      },
      {
        tanya: "Sebuah kelompok terdiri atas 6 siswa yang memilih sepak bola dan 9 siswa yang memilih bulu tangkis. Rasio sepak bola : bulu tangkis adalah...",
        opsi: ["2 : 3", "3 : 2", "6 : 15", "1 : 3"],
        jawab: 0,
        bahas: "Rasio = 6 : 9. Kedua bilangan dibagi 3, sehingga rasio paling sederhana adalah 2 : 3."
      },
      {
        tanya: "Diketahui rasio apel : jeruk = 3 : 4. Jika jumlah apel 12 buah, jumlah jeruk adalah...",
        opsi: ["9 buah", "12 buah", "16 buah", "18 buah"],
        jawab: 2,
        bahas: "Faktor pengali = 12 ÷ 3 = 4. Jumlah jeruk = 4 × 4 = 16 buah."
      },
      {
        tanya: "Pernyataan yang benar tentang rasio 6 : 8 adalah...",
        opsi: [
          "Rasio tersebut setara dengan 2 : 3",
          "Rasio tersebut setara dengan 3 : 4",
          "Rasio tersebut setara dengan 4 : 3",
          "Rasio tersebut setara dengan 1 : 4"
        ],
        jawab: 1,
        bahas: "Rasio 6 : 8 disederhanakan dengan membagi kedua bilangan dengan 2, sehingga diperoleh 3 : 4."
      }
    ],
    level2: [
      {
        tanya: "Di sebuah kelas terdapat 42 siswa. Sebanyak 24 siswa adalah perempuan dan sisanya laki-laki. Rasio laki-laki : perempuan dalam bentuk paling sederhana adalah...",
        opsi: ["3 : 4", "4 : 3", "3 : 7", "7 : 4"],
        jawab: 0,
        bahas: "Jumlah siswa laki-laki = 42 - 24 = 18. Rasio laki-laki : perempuan = 18 : 24. Kedua bilangan dibagi 6, sehingga diperoleh 3 : 4."
      },
      {
        tanya: "Tinggi badan Fiya adalah 160 cm, sedangkan tinggi tiang basket 2,5 m. Rasio tinggi Fiya : tinggi tiang basket dalam bentuk paling sederhana adalah...",
        opsi: ["16 : 25", "25 : 16", "8 : 15", "16 : 5"],
        jawab: 0,
        bahas: "Samakan satuan terlebih dahulu: 2,5 m = 250 cm. Rasio = 160 : 250. Kedua bilangan dibagi 10, sehingga diperoleh 16 : 25."
      },
      {
        tanya: "Ibu mencampurkan 2 gelas sirup jeruk dengan 5 gelas air. Jika ibu menggunakan 6 gelas sirup, banyak air yang diperlukan agar rasionya tetap sama adalah...",
        opsi: ["10 gelas", "12 gelas", "15 gelas", "18 gelas"],
        jawab: 2,
        bahas: "Rasio sirup : air = 2 : 5. Faktor pengali = 6 ÷ 2 = 3. Banyak air = 5 × 3 = 15 gelas."
      },
      {
        tanya: "Rasio kelereng Andi : Budi = 3 : 5. Jika jumlah kelereng mereka 40 buah, banyak kelereng Budi adalah...",
        opsi: ["15 buah", "20 buah", "25 buah", "30 buah"],
        jawab: 2,
        bahas: "Jumlah bagian = 3 + 5 = 8. Nilai satu bagian = 40 ÷ 8 = 5. Kelereng Budi = 5 × 5 = 25 buah."
      },
      {
        tanya: "Perbandingan panjang pita merah dan pita biru adalah 4 : 7. Jika panjang pita merah 28 cm, panjang pita biru adalah...",
        opsi: ["35 cm", "42 cm", "49 cm", "56 cm"],
        jawab: 2,
        bahas: "Faktor pengali = 28 ÷ 4 = 7. Panjang pita biru = 7 × 7 = 49 cm."
      },
      {
        tanya: "Perbandingan tepung : gula dalam sebuah resep adalah 5 : 2. Jika jumlah tepung dan gula 28 kg, banyak tepung yang digunakan adalah...",
        opsi: ["8 kg", "10 kg", "20 kg", "22 kg"],
        jawab: 2,
        bahas: "Jumlah bagian = 5 + 2 = 7. Nilai satu bagian = 28 ÷ 7 = 4 kg. Tepung = 5 × 4 = 20 kg."
      },
      {
        tanya: "Rasio panjang dan lebar sebuah persegi panjang adalah 5 : 3. Jika panjangnya 35 cm, lebarnya adalah...",
        opsi: ["15 cm", "18 cm", "21 cm", "25 cm"],
        jawab: 2,
        bahas: "Faktor pengali = 35 ÷ 5 = 7. Lebar = 3 × 7 = 21 cm."
      },
      {
        tanya: "Rasio berat beras dalam karung A dan karung B adalah 2 : 3. Jika berat karung A 4 kg dan berat karung B 6 kg, rasio berat keduanya dalam gram adalah...",
        opsi: ["2 : 3", "3 : 2", "4 : 6", "200 : 600"],
        jawab: 0,
        bahas: "Ubah satuan ke gram: 4 kg = 4.000 gram dan 6 kg = 6.000 gram. Rasio = 4.000 : 6.000 = 2 : 3."
      },
      {
        tanya: "Di sebuah taman terdapat 15 pohon mangga dan 25 pohon jambu. Jika ditanam lagi 5 pohon mangga, rasio pohon mangga : pohon jambu yang baru adalah...",
        opsi: ["2 : 5", "3 : 5", "4 : 5", "5 : 4"],
        jawab: 2,
        bahas: "Jumlah pohon mangga yang baru = 15 + 5 = 20. Rasio baru = 20 : 25. Kedua bilangan dibagi 5, sehingga diperoleh 4 : 5."
      },
      {
        tanya: "Sebuah gambar memiliki rasio panjang : lebar = 8 : 5. Jika lebarnya 20 cm, panjang gambar tersebut adalah...",
        opsi: ["25 cm", "28 cm", "32 cm", "40 cm"],
        jawab: 2,
        bahas: "Faktor pengali = 20 ÷ 5 = 4. Panjang gambar = 8 × 4 = 32 cm."
      }
    ]
  },

  /* ===== 2. SELISIH DAN RASIO ===== */
  {
    judul: "Selisih dan Rasio",
    level1: [
      {
        tanya: "Perbandingan jumlah buku Rani dan Sinta adalah 3 : 5. Jika jumlah buku mereka 32 buku, jumlah buku Rani adalah...",
        opsi: ["10 buku", "12 buku", "15 buku", "20 buku"],
        jawab: 1,
        bahas: "Jumlah bagian = 3 + 5 = 8. Nilai satu bagian = 32 ÷ 8 = 4. Jumlah buku Rani = 3 × 4 = 12 buku."
      },
      {
        tanya: "Perbandingan uang Andi dan Budi adalah 2 : 3. Jika jumlah uang mereka Rp50.000, uang Budi adalah...",
        opsi: ["Rp20.000", "Rp25.000", "Rp30.000", "Rp35.000"],
        jawab: 2,
        bahas: "Jumlah bagian = 2 + 3 = 5. Nilai satu bagian = Rp50.000 ÷ 5 = Rp10.000. Uang Budi = 3 × Rp10.000 = Rp30.000."
      },
      {
        tanya: "Perbandingan umur Kakak dan Adik adalah 5 : 3. Jika jumlah umur mereka 32 tahun, umur Kakak adalah...",
        opsi: ["12 tahun", "15 tahun", "20 tahun", "24 tahun"],
        jawab: 2,
        bahas: "Jumlah bagian = 5 + 3 = 8. Nilai satu bagian = 32 ÷ 8 = 4 tahun. Umur Kakak = 5 × 4 = 20 tahun."
      },
      {
        tanya: "Perbandingan jumlah apel Rina dan Sari adalah 2 : 5. Jika selisih jumlah apel mereka 12 buah, jumlah apel Sari adalah...",
        opsi: ["8 buah", "12 buah", "20 buah", "24 buah"],
        jawab: 2,
        bahas: "Selisih bagian = 5 - 2 = 3. Nilai satu bagian = 12 ÷ 3 = 4 buah. Apel Sari = 5 × 4 = 20 buah."
      },
      {
        tanya: "Perbandingan berat badan Alya dan Nisa adalah 3 : 5. Jika selisih berat badan mereka 14 kg, berat badan Alya adalah...",
        opsi: ["14 kg", "21 kg", "28 kg", "35 kg"],
        jawab: 1,
        bahas: "Selisih bagian = 5 - 3 = 2. Nilai satu bagian = 14 ÷ 2 = 7 kg. Berat Alya = 3 × 7 = 21 kg."
      },
      {
        tanya: "Perbandingan umur Andre, Azka, dan Arif adalah 2 : 3 : 4. Jika jumlah umur mereka 36 tahun, umur Arif adalah...",
        opsi: ["8 tahun", "12 tahun", "16 tahun", "20 tahun"],
        jawab: 2,
        bahas: "Jumlah bagian = 2 + 3 + 4 = 9. Nilai satu bagian = 36 ÷ 9 = 4 tahun. Umur Arif = 4 × 4 = 16 tahun."
      },
      {
        tanya: "Perbandingan panjang pita Rina, Sari, dan Dita adalah 2 : 4 : 5. Jika jumlah panjang pita mereka 44 cm, panjang pita Sari adalah...",
        opsi: ["8 cm", "12 cm", "16 cm", "20 cm"],
        jawab: 2,
        bahas: "Jumlah bagian = 2 + 4 + 5 = 11. Nilai satu bagian = 44 ÷ 11 = 4 cm. Panjang pita Sari = 4 × 4 = 16 cm."
      },
      {
        tanya: "Umur Kakak adalah 3 kali umur Talita. Jika umur Talita 8 tahun, umur Kakak adalah...",
        opsi: ["11 tahun", "16 tahun", "24 tahun", "32 tahun"],
        jawab: 2,
        bahas: "Umur Kakak = 3 × umur Talita = 3 × 8 = 24 tahun."
      },
      {
        tanya: "Umur Yanto adalah 2 kali umur Budi. Jika umur Budi 6 tahun, umur Yanto adalah...",
        opsi: ["8 tahun", "10 tahun", "12 tahun", "18 tahun"],
        jawab: 2,
        bahas: "Umur Yanto = 2 × umur Budi = 2 × 6 = 12 tahun."
      },
      {
        tanya: "Uang Beni adalah 2 kali uang Andi. Jika uang Andi Rp15.000, uang Beni adalah...",
        opsi: ["Rp17.000", "Rp25.000", "Rp30.000", "Rp45.000"],
        jawab: 2,
        bahas: "Uang Beni = 2 × Rp15.000 = Rp30.000."
      }
    ],
    level2: [
      {
        tanya: "Perbandingan jumlah siswa laki-laki dan perempuan adalah 4 : 7. Jika selisih jumlah mereka 15 orang, jumlah seluruh siswa adalah...",
        opsi: ["45 orang", "55 orang", "60 orang", "75 orang"],
        jawab: 1,
        bahas: "Selisih bagian = 7 - 4 = 3. Nilai satu bagian = 15 ÷ 3 = 5 orang. Jumlah seluruh bagian = 4 + 7 = 11. Jadi, jumlah siswa = 11 × 5 = 55 orang."
      },
      {
        tanya: "Perbandingan kelereng Andi, Budi, dan Caca adalah 4 : 6 : 9. Jika selisih kelereng Budi dan Caca 12 buah, jumlah seluruh kelereng mereka adalah...",
        opsi: ["57 buah", "63 buah", "76 buah", "84 buah"],
        jawab: 2,
        bahas: "Selisih bagian Budi dan Caca = 9 - 6 = 3. Nilai satu bagian = 12 ÷ 3 = 4 buah. Jumlah seluruh bagian = 4 + 6 + 9 = 19. Total kelereng = 19 × 4 = 76 buah."
      },
      {
        tanya: "Perbandingan panjang pita Rina, Sari, dan Dita adalah 5 : 7 : 9. Jika selisih panjang pita Dita dan Rina 16 cm, panjang pita Sari adalah...",
        opsi: ["24 cm", "28 cm", "32 cm", "36 cm"],
        jawab: 1,
        bahas: "Selisih bagian Dita dan Rina = 9 - 5 = 4. Nilai satu bagian = 16 ÷ 4 = 4 cm. Panjang pita Sari = 7 × 4 = 28 cm."
      },
      {
        tanya: "Perbandingan umur Kakak dan Adik adalah 7 : 5. Jika selisih umur mereka 6 tahun, jumlah umur mereka adalah...",
        opsi: ["24 tahun", "30 tahun", "36 tahun", "42 tahun"],
        jawab: 2,
        bahas: "Selisih bagian = 7 - 5 = 2. Nilai satu bagian = 6 ÷ 2 = 3 tahun. Jumlah bagian = 7 + 5 = 12. Jumlah umur = 12 × 3 = 36 tahun."
      },
      {
        tanya: "Perbandingan uang Andi dan Beni adalah 3 : 5. Jika selisih uang mereka Rp40.000, jumlah uang mereka adalah...",
        opsi: ["Rp80.000", "Rp100.000", "Rp120.000", "Rp160.000"],
        jawab: 3,
        bahas: "Selisih bagian = 5 - 3 = 2. Nilai satu bagian = Rp40.000 ÷ 2 = Rp20.000. Jumlah bagian = 3 + 5 = 8. Jumlah uang = 8 × Rp20.000 = Rp160.000."
      },
      {
        tanya: "Perbandingan umur Andre, Azka, dan Arif adalah 3 : 5 : 6. Jika selisih umur Azka dan Andre 8 tahun, jumlah umur mereka bertiga adalah...",
        opsi: ["48 tahun", "56 tahun", "64 tahun", "72 tahun"],
        jawab: 1,
        bahas: "Selisih bagian Azka dan Andre = 5 - 3 = 2. Nilai satu bagian = 8 ÷ 2 = 4 tahun. Jumlah bagian = 3 + 5 + 6 = 14. Jumlah umur = 14 × 4 = 56 tahun."
      },
      {
        tanya: "Perbandingan jumlah buah mangga, apel, dan jeruk adalah 4 : 3 : 5. Jika jumlah seluruh buah 96 buah, jumlah jeruk adalah...",
        opsi: ["24 buah", "32 buah", "40 buah", "48 buah"],
        jawab: 2,
        bahas: "Jumlah bagian = 4 + 3 + 5 = 12. Nilai satu bagian = 96 ÷ 12 = 8 buah. Jumlah jeruk = 5 × 8 = 40 buah."
      },
      {
        tanya: "Umur Kakak adalah 2 kali umur Talita. Umur Ibu adalah 3 kali umur Kakak. Jika umur Talita 7 tahun, umur Ibu adalah...",
        opsi: ["21 tahun", "28 tahun", "35 tahun", "42 tahun"],
        jawab: 3,
        bahas: "Umur Kakak = 2 × 7 = 14 tahun. Umur Ibu = 3 × 14 = 42 tahun."
      },
      {
        tanya: "Uang Beni adalah 2 kali uang Andi, sedangkan uang Citra adalah 3 kali uang Andi. Jika uang Andi Rp12.000, jumlah uang Beni dan Citra adalah...",
        opsi: ["Rp36.000", "Rp48.000", "Rp60.000", "Rp72.000"],
        jawab: 2,
        bahas: "Uang Beni = 2 × Rp12.000 = Rp24.000. Uang Citra = 3 × Rp12.000 = Rp36.000. Jumlahnya = Rp24.000 + Rp36.000 = Rp60.000."
      },
      {
        tanya: "Perbandingan jumlah buku A, B, dan C adalah 2 : 3 : 5. Jika jumlah buku A dan B adalah 25 buku, jumlah buku C adalah...",
        opsi: ["15 buku", "20 buku", "25 buku", "30 buku"],
        jawab: 2,
        bahas: "Jumlah bagian A dan B = 2 + 3 = 5. Nilai satu bagian = 25 ÷ 5 = 5 buku. Jumlah buku C = 5 × 5 = 25 buku."
      }
    ]
  },

  /* ===== 3. FAKTOR SKALA ===== */
  {
    judul: "Faktor Skala",
    level1: [
      {
        tanya: "Sebuah foto memiliki panjang awal 10 cm dan diperbesar menjadi 20 cm. Faktor skalanya adalah...",
        opsi: ["1/2", "2", "3", "10"],
        jawab: 1,
        bahas: "Faktor skala = ukuran baru ÷ ukuran awal = 20 ÷ 10 = 2. Jadi, foto diperbesar 2 kali."
      },
      {
        tanya: "Sebuah gambar berukuran 24 cm diperkecil menjadi 8 cm. Faktor skalanya adalah...",
        opsi: ["1/3", "2", "3", "1/2"],
        jawab: 0,
        bahas: "Faktor skala = ukuran baru ÷ ukuran awal = 8 ÷ 24 = 1/3. Jadi, gambar diperkecil menjadi sepertiga ukuran awal."
      },
      {
        tanya: "Sebuah peta memiliki skala 1 : 100.000. Jika jarak pada peta 4 cm, jarak sebenarnya adalah...",
        opsi: ["400 m", "4 km", "40 km", "400 km"],
        jawab: 1,
        bahas: "Jarak sebenarnya = 4 × 100.000 = 400.000 cm. Karena 100.000 cm = 1 km, jarak sebenarnya adalah 4 km."
      },
      {
        tanya: "Jarak rumah ke sekolah pada peta adalah 5 cm. Jika skala peta 1 : 200.000, jarak sebenarnya adalah...",
        opsi: ["1 km", "5 km", "10 km", "20 km"],
        jawab: 2,
        bahas: "Jarak sebenarnya = 5 × 200.000 = 1.000.000 cm = 10 km."
      },
      {
        tanya: "Jarak dua kota sebenarnya adalah 15 km. Jika skala peta 1 : 300.000, jarak kedua kota pada peta adalah...",
        opsi: ["3 cm", "5 cm", "10 cm", "15 cm"],
        jawab: 1,
        bahas: "Ubah 15 km menjadi 1.500.000 cm. Jarak pada peta = 1.500.000 ÷ 300.000 = 5 cm."
      },
      {
        tanya: "Jarak pada denah adalah 4 cm, sedangkan jarak sebenarnya 8 m. Skala denah tersebut adalah...",
        opsi: ["1 : 20", "1 : 100", "1 : 200", "1 : 2.000"],
        jawab: 2,
        bahas: "Ubah 8 m menjadi 800 cm. Skala = 4 : 800. Sederhanakan dengan membagi kedua bilangan dengan 4, sehingga diperoleh 1 : 200."
      },
      {
        tanya: "Sebuah maket memiliki tinggi 12 cm. Jika faktor skala perbesaran terhadap model awal adalah 3, tinggi setelah diperbesar adalah...",
        opsi: ["4 cm", "15 cm", "24 cm", "36 cm"],
        jawab: 3,
        bahas: "Ukuran baru = faktor skala × ukuran awal = 3 × 12 = 36 cm."
      },
      {
        tanya: "Sebuah benda memiliki panjang 30 cm. Benda tersebut diperkecil dengan faktor skala 1/5. Panjang benda setelah diperkecil adalah...",
        opsi: ["5 cm", "6 cm", "10 cm", "25 cm"],
        jawab: 1,
        bahas: "Ukuran baru = faktor skala × ukuran awal = 1/5 × 30 = 6 cm."
      },
      {
        tanya: "Pada peta berskala 1 : 500.000, jarak antara dua tempat adalah 6 cm. Jarak sebenarnya adalah...",
        opsi: ["3 km", "6 km", "30 km", "300 km"],
        jawab: 2,
        bahas: "Jarak sebenarnya = 6 × 500.000 = 3.000.000 cm = 30 km. Jadi, jawaban yang benar adalah 30 km."
      },
      {
        tanya: "Sebuah menara digambar dengan tinggi 7 cm menggunakan skala 1 : 200. Tinggi menara sebenarnya adalah...",
        opsi: ["7 m", "14 m", "70 m", "140 m"],
        jawab: 1,
        bahas: "Tinggi sebenarnya = 7 × 200 = 1.400 cm. Karena 100 cm = 1 m, tinggi sebenarnya adalah 14 m."
      }
    ],
    level2: [
      {
        tanya: "Jarak kota A dan B sebenarnya 42 km. Jika jarak pada peta 6 cm, skala peta tersebut adalah...",
        opsi: ["1 : 600.000", "1 : 700.000", "1 : 800.000", "1 : 900.000"],
        jawab: 1,
        bahas: "Ubah 42 km menjadi 4.200.000 cm. Skala = 6 : 4.200.000. Bagi kedua bilangan dengan 6, sehingga diperoleh 1 : 700.000."
      },
      {
        tanya: "Sebuah denah rumah memiliki skala 1 : 250. Jika panjang kamar pada denah 5,2 cm, panjang kamar sebenarnya adalah...",
        opsi: ["10 m", "11 m", "13 m", "15 m"],
        jawab: 2,
        bahas: "Panjang sebenarnya = 5,2 × 250 = 1.300 cm = 13 m."
      },
      {
        tanya: "Jarak sebenarnya dua kota adalah 72 km. Jika skala peta 1 : 1.200.000, jarak kedua kota pada peta adalah...",
        opsi: ["4 cm", "5 cm", "6 cm", "8 cm"],
        jawab: 2,
        bahas: "Ubah 72 km menjadi 7.200.000 cm. Jarak pada peta = 7.200.000 ÷ 1.200.000 = 6 cm."
      },
      {
        tanya: "Sebuah foto berukuran panjang 18 cm dan lebar 12 cm. Foto diperbesar sehingga panjangnya menjadi 27 cm. Lebar foto setelah diperbesar adalah...",
        opsi: ["15 cm", "16 cm", "18 cm", "20 cm"],
        jawab: 2,
        bahas: "Faktor skala = 27 ÷ 18 = 1,5. Lebar baru = 12 × 1,5 = 18 cm."
      },
      {
        tanya: "Sebuah miniatur mobil memiliki panjang 15 cm. Jika panjang mobil sebenarnya 4,5 m, skala miniatur tersebut adalah...",
        opsi: ["1 : 20", "1 : 30", "1 : 300", "1 : 450"],
        jawab: 1,
        bahas: "Ubah 4,5 m menjadi 450 cm. Skala = 15 : 450. Sederhanakan dengan membagi kedua bilangan dengan 15, sehingga diperoleh 1 : 30."
      },
      {
        tanya: "Jarak pada peta dengan skala 1 : 750.000 adalah 8 cm. Jika jarak sebenarnya ditempuh dengan kendaraan berkecepatan rata-rata 40 km/jam, waktu perjalanan adalah...",
        opsi: ["60 menit", "30 menit", "15 menit", "90 menit"],
        jawab: 3,
        bahas: "Jarak sebenarnya = 8 × 750.000 = 6.000.000 cm = 60 km. Waktu = jarak ÷ kecepatan = 60 ÷ 40 = 1,5 jam atau 90 menit. Jadi, jawaban yang benar adalah 90 menit."
      },
      {
        tanya: "Sebuah gambar memiliki panjang 8 cm. Setelah diperbesar, panjangnya menjadi 20 cm. Jika lebar awal gambar 6 cm, lebar setelah diperbesar adalah...",
        opsi: ["10 cm", "12 cm", "15 cm", "18 cm"],
        jawab: 2,
        bahas: "Faktor skala = 20 ÷ 8 = 2,5. Lebar baru = 6 × 2,5 = 15 cm."
      },
      {
        tanya: "Jarak kota P dan Q sebenarnya 36 km. Pada peta, jaraknya 9 cm. Jika jarak kota R dan S pada peta yang sama adalah 12 cm, jarak sebenarnya kota R dan S adalah...",
        opsi: ["42 km", "45 km", "48 km", "54 km"],
        jawab: 2,
        bahas: "Jarak 36 km = 3.600.000 cm. Skala = 9 : 3.600.000 = 1 : 400.000. Jarak sebenarnya R–S = 12 × 400.000 = 4.800.000 cm = 48 km."
      },
      {
        tanya: "Sebuah denah menggunakan skala 1 : 400. Jika panjang ruang tamu sebenarnya 8 m, panjang ruang tamu pada denah adalah...",
        opsi: ["1 cm", "2 cm", "4 cm", "8 cm"],
        jawab: 1,
        bahas: "Ubah 8 m menjadi 800 cm. Jarak pada denah = 800 ÷ 400 = 2 cm."
      },
      {
        tanya: "Sebuah foto memiliki panjang 16 cm. Foto tersebut diperkecil sehingga panjangnya menjadi 10 cm. Jika lebar awalnya 12 cm, lebar setelah diperkecil adalah...",
        opsi: ["6,5 cm", "7 cm", "7,5 cm", "8 cm"],
        jawab: 2,
        bahas: "Faktor skala = 10 ÷ 16 = 5/8. Lebar baru = 12 × 5/8 = 7,5 cm."
      }
    ]
  },

  /* ===== 4. RASIO EKUIVALEN DAN PROPORSI ===== */
  {
    judul: "Rasio Ekuivalen dan Proporsi",
    level1: [
      {
        tanya: "Rasio 2 : 3 ekuivalen dengan rasio ? : 12. Bilangan yang tepat untuk mengisi bagian kosong adalah...",
        opsi: ["6", "8", "9", "10"],
        jawab: 1,
        bahas: "Bilangan 3 dikalikan 4 menjadi 12. Agar rasio tetap ekuivalen, bilangan 2 juga dikalikan 4. Jadi, bilangan yang tepat adalah 2 × 4 = 8."
      },
      {
        tanya: "Manakah rasio berikut yang ekuivalen dengan 4 : 6?",
        opsi: ["2 : 5", "3 : 4", "2 : 3", "4 : 5"],
        jawab: 2,
        bahas: "Rasio 4 : 6 dapat disederhanakan dengan membagi kedua suku dengan 2. Hasilnya adalah 2 : 3. Jadi, rasio yang ekuivalen adalah 2 : 3."
      },
      {
        tanya: "Untuk membuat 6 potong kue diperlukan 18 ons gula halus. Berapa ons gula yang diperlukan untuk membuat 9 potong kue?",
        opsi: ["24 ons", "27 ons", "30 ons", "36 ons"],
        jawab: 1,
        bahas: "Banyak kue bertambah dari 6 menjadi 9, sehingga gula juga bertambah secara senilai. Gula yang diperlukan = 18 × (9 ÷ 6) = 27 ons."
      },
      {
        tanya: "Sebuah mobil membutuhkan 8 liter bensin untuk menempuh jarak 44 km. Jika jaraknya menjadi 88 km dengan kondisi yang sama, bensin yang diperlukan adalah...",
        opsi: ["12 liter", "14 liter", "16 liter", "18 liter"],
        jawab: 2,
        bahas: "Jarak bertambah 2 kali lipat, yaitu 88 ÷ 44 = 2. Bensin yang diperlukan = 8 × 2 = 16 liter."
      },
      {
        tanya: "Sebuah mesin mengemas 100 roti dalam waktu 5 menit. Jika kemampuan mesin tetap, waktu untuk mengemas 300 roti adalah...",
        opsi: ["10 menit", "12 menit", "15 menit", "20 menit"],
        jawab: 2,
        bahas: "Jumlah roti bertambah 3 kali lipat, yaitu 300 ÷ 100 = 3. Waktu yang diperlukan = 5 × 3 = 15 menit."
      },
      {
        tanya: "Suatu pekerjaan selesai dalam 42 hari jika dikerjakan oleh 12 orang. Jika pekerjaan yang sama dikerjakan oleh 14 orang, waktu yang diperlukan adalah...",
        opsi: ["28 hari", "32 hari", "36 hari", "49 hari"],
        jawab: 2,
        bahas: "Jumlah pekerja dan waktu merupakan perbandingan berbalik nilai. Banyak hari = (12 × 42) ÷ 14 = 36 hari."
      },
      {
        tanya: "Dua orang tukang dapat menyelesaikan pekerjaan dalam 12 hari. Jika kemampuan setiap tukang sama, waktu yang diperlukan oleh 6 tukang adalah...",
        opsi: ["3 hari", "4 hari", "6 hari", "8 hari"],
        jawab: 1,
        bahas: "Jumlah tukang bertambah 3 kali lipat, sehingga waktu menjadi sepertiga. Waktu = (2 × 12) ÷ 6 = 4 hari."
      },
      {
        tanya: "Manakah pasangan besaran yang menunjukkan perbandingan senilai?",
        opsi: [
          "Jumlah pekerja dan waktu menyelesaikan pekerjaan",
          "Kecepatan kendaraan dan waktu untuk jarak tetap",
          "Jumlah buku yang dibeli dan total harga dengan harga per buku tetap",
          "Jumlah keran dan waktu untuk mengisi bak dengan debit tetap"
        ],
        jawab: 2,
        bahas: "Jumlah buku dan total harga berubah searah jika harga setiap buku tetap. Semakin banyak buku yang dibeli, semakin besar total harganya. Jadi, hubungan tersebut merupakan perbandingan senilai."
      },
      {
        tanya: "Foto A memiliki ukuran 10 cm × 8 cm. Foto B memiliki ukuran 15 cm × 12 cm. Apakah ukuran kedua foto proporsional?",
        opsi: [
          "Ya, karena kedua rasio panjang dan lebarnya sama",
          "Tidak, karena panjang kedua foto berbeda",
          "Tidak, karena lebar foto B lebih besar",
          "Ya, karena selisih panjang dan lebar kedua foto sama"
        ],
        jawab: 0,
        bahas: "Rasio foto A adalah 10 : 8 = 5 : 4. Rasio foto B adalah 15 : 12 = 5 : 4. Karena kedua rasio sama, kedua foto proporsional."
      },
      {
        tanya: "Perbandingan sirup dan air untuk membuat minuman adalah 2 : 3. Jika air yang digunakan 12 gelas, banyak sirup yang diperlukan agar rasanya tetap sama adalah...",
        opsi: ["6 gelas", "8 gelas", "9 gelas", "10 gelas"],
        jawab: 1,
        bahas: "Air sebanyak 3 bagian menjadi 12 gelas, sehingga faktor pengalinya adalah 12 ÷ 3 = 4. Sirup yang diperlukan = 2 × 4 = 8 gelas."
      }
    ],
    level2: [
      {
        tanya: "Perbandingan 3 : 5 ekuivalen dengan x : 35. Nilai x adalah...",
        opsi: ["15", "18", "21", "25"],
        jawab: 2,
        bahas: "Bilangan 5 dikalikan 7 menjadi 35. Maka, x = 3 × 7 = 21 agar kedua rasio tetap ekuivalen."
      },
      {
        tanya: "Diketahui rasio A = 12 : 18, rasio B = 8 : 12, dan rasio C = 10 : 15. Pernyataan yang benar adalah...",
        opsi: [
          "Hanya rasio A dan B yang ekuivalen",
          "Hanya rasio B dan C yang ekuivalen",
          "Ketiga rasio ekuivalen",
          "Ketiga rasio tidak ekuivalen"
        ],
        jawab: 2,
        bahas: "Rasio A = 12 : 18 = 2 : 3. Rasio B = 8 : 12 = 2 : 3. Rasio C = 10 : 15 = 2 : 3. Jadi, ketiganya ekuivalen."
      },
      {
        tanya: "Sebuah mesin mengemas 240 roti dalam 12 menit. Jika kecepatan pengemasan tetap, waktu yang diperlukan untuk mengemas 1.500 roti adalah...",
        opsi: ["60 menit", "65 menit", "70 menit", "75 menit"],
        jawab: 3,
        bahas: "Waktu berbanding senilai dengan jumlah roti. Waktu yang diperlukan = (1.500 ÷ 240) × 12 = 75 menit."
      },
      {
        tanya: "Sebuah mobil membutuhkan 10 liter bensin untuk menempuh jarak 50 km. Jika mobil tersebut menempuh jarak 175 km dengan kondisi yang sama, bensin yang dibutuhkan adalah...",
        opsi: ["25 liter", "30 liter", "35 liter", "40 liter"],
        jawab: 2,
        bahas: "Bensin yang dibutuhkan = (175 ÷ 50) × 10 = 35 liter. Hubungan jarak dan kebutuhan bensin merupakan perbandingan senilai."
      },
      {
        tanya: "Sebuah proyek selesai dalam 60 hari jika dikerjakan oleh 80 orang. Agar proyek selesai dalam 48 hari, jumlah tambahan pekerja yang diperlukan adalah...",
        opsi: ["10 orang", "15 orang", "20 orang", "25 orang"],
        jawab: 2,
        bahas: "Jumlah pekerja × waktu tetap. Jumlah pekerja yang dibutuhkan = (80 × 60) ÷ 48 = 100 orang. Tambahan pekerja = 100 − 80 = 20 orang."
      },
      {
        tanya: "Sebuah foto berukuran 5 cm × 7 cm diperbesar sehingga setiap ukurannya menjadi 2 kali ukuran semula. Keliling foto setelah diperbesar adalah...",
        opsi: ["24 cm", "36 cm", "42 cm", "48 cm"],
        jawab: 3,
        bahas: "Panjang baru = 5 × 2 = 10 cm dan lebar baru = 7 × 2 = 14 cm. Keliling = 2 × (10 + 14) = 48 cm."
      },
      {
        tanya: "Jarak kota P dan Q ditempuh dalam 5 jam dengan kecepatan rata-rata 60 km/jam. Jika kecepatan ditingkatkan menjadi 75 km/jam, waktu yang diperlukan adalah...",
        opsi: ["3 jam", "4 jam", "4,5 jam", "6 jam"],
        jawab: 1,
        bahas: "Jarak kedua kota = 5 × 60 = 300 km. Waktu baru = 300 ÷ 75 = 4 jam. Kecepatan dan waktu untuk jarak tetap merupakan perbandingan berbalik nilai."
      },
      {
        tanya: "Perbandingan jumlah siswa laki-laki dan perempuan adalah 4 : 7. Jika selisih jumlah mereka 18 orang, jumlah seluruh siswa adalah...",
        opsi: ["54 orang", "60 orang", "66 orang", "72 orang"],
        jawab: 2,
        bahas: "Selisih bagian = 7 − 4 = 3. Nilai satu bagian = 18 ÷ 3 = 6 orang. Jumlah seluruh bagian = 4 + 7 = 11. Jadi, jumlah siswa = 11 × 6 = 66 orang."
      },
      {
        tanya: "Sebanyak 15 pekerja dapat menyelesaikan pekerjaan dalam 24 hari. Jika jumlah pekerja menjadi 20 orang dan kemampuan setiap pekerja sama, pekerjaan selesai dalam...",
        opsi: ["16 hari", "18 hari", "20 hari", "22 hari"],
        jawab: 1,
        bahas: "Jumlah pekerja dan waktu berbanding terbalik. Waktu baru = (15 × 24) ÷ 20 = 18 hari."
      },
      {
        tanya: "Foto A memiliki ukuran 10 cm × 8 cm. Tiga foto lain memiliki ukuran: B = 15 cm × 10 cm, C = 15 cm × 12 cm, dan D = 20 cm × 15 cm. Foto manakah yang proporsional dengan foto A?",
        opsi: ["Foto B", "Foto C", "Foto D", "Foto B dan D"],
        jawab: 1,
        bahas: "Rasio foto A = 10 : 8 = 5 : 4. Foto B memiliki rasio 15 : 10 = 3 : 2. Foto C memiliki rasio 15 : 12 = 5 : 4. Foto D memiliki rasio 20 : 15 = 4 : 3. Hanya foto C yang memiliki rasio sama dengan foto A."
      }
    ]
  },

  /* ===== 5. LAJU PERUBAHAN ===== */
  {
    judul: "Laju Perubahan",
    level1: [
      {
        tanya: "Sebuah motor menempuh jarak 120 km dalam waktu 2 jam. Kecepatan rata-rata motor tersebut adalah...",
        opsi: ["40 km/jam", "50 km/jam", "60 km/jam", "80 km/jam"],
        jawab: 2,
        bahas: "Kecepatan = jarak ÷ waktu = 120 ÷ 2 = 60 km/jam."
      },
      {
        tanya: "Harga 3 kg apel adalah Rp24.000,00. Harga apel per kilogram adalah...",
        opsi: ["Rp6.000,00", "Rp8.000,00", "Rp10.000,00", "Rp12.000,00"],
        jawab: 1,
        bahas: "Harga per kilogram = total harga ÷ berat = Rp24.000 ÷ 3 = Rp8.000,00/kg."
      },
      {
        tanya: "Sebuah keran mengalirkan 24 liter air dalam waktu 6 menit. Debit air keran tersebut adalah...",
        opsi: ["2 liter/menit", "3 liter/menit", "4 liter/menit", "6 liter/menit"],
        jawab: 2,
        bahas: "Debit air = volume air ÷ waktu = 24 ÷ 6 = 4 liter/menit."
      },
      {
        tanya: "Jarak rumah ke sekolah adalah 6 km dan ditempuh selama 15 menit. Kecepatan rata-rata kendaraan tersebut adalah...",
        opsi: ["12 km/jam", "18 km/jam", "24 km/jam", "30 km/jam"],
        jawab: 2,
        bahas: "Ubah 15 menit menjadi 15 ÷ 60 = 0,25 jam. Kecepatan = 6 ÷ 0,25 = 24 km/jam."
      },
      {
        tanya: "Kemasan susu berisi 400 ml dengan harga Rp8.000,00. Harga susu per mililiter adalah...",
        opsi: ["Rp10/ml", "Rp15/ml", "Rp20/ml", "Rp25/ml"],
        jawab: 2,
        bahas: "Harga per mililiter = Rp8.000 ÷ 400 = Rp20/ml."
      },
      {
        tanya: "Kemasan A berisi 400 ml susu seharga Rp8.000,00, sedangkan kemasan B berisi 600 ml seharga Rp10.200,00. Kemasan yang lebih hemat per mililiter adalah...",
        opsi: ["Kemasan A, karena Rp20/ml", "Kemasan B, karena Rp17/ml", "Kemasan A, karena Rp17/ml", "Keduanya sama hemat"],
        jawab: 1,
        bahas: "Harga A per ml = Rp8.000 ÷ 400 = Rp20/ml. Harga B per ml = Rp10.200 ÷ 600 = Rp17/ml. Karena Rp17 lebih murah daripada Rp20, kemasan B lebih hemat."
      },
      {
        tanya: "Keran A mengalirkan 54 liter air dalam 9 menit, sedangkan keran B mengalirkan 64 liter dalam 8 menit. Selisih debit kedua keran adalah...",
        opsi: ["1 liter/menit", "2 liter/menit", "3 liter/menit", "4 liter/menit"],
        jawab: 1,
        bahas: "Debit A = 54 ÷ 9 = 6 liter/menit. Debit B = 64 ÷ 8 = 8 liter/menit. Selisih debit = 8 − 6 = 2 liter/menit."
      },
      {
        tanya: "Sebuah sepeda motor menempuh jarak 24 km dalam waktu 40 menit. Kecepatan rata-ratanya adalah...",
        opsi: ["24 km/jam", "30 km/jam", "36 km/jam", "40 km/jam"],
        jawab: 2,
        bahas: "Ubah 40 menit menjadi 40 ÷ 60 = 2/3 jam. Kecepatan = 24 ÷ (2/3) = 36 km/jam."
      },
      {
        tanya: "Tinggi tanaman kacang adalah 8 cm pada minggu pertama dan 20 cm pada minggu keempat. Laju pertumbuhan rata-rata tanaman per minggu adalah...",
        opsi: ["3 cm/minggu", "4 cm/minggu", "5 cm/minggu", "6 cm/minggu"],
        jawab: 1,
        bahas: "Pertambahan tinggi = 20 − 8 = 12 cm. Selang waktu = 4 − 1 = 3 minggu. Laju pertumbuhan = 12 ÷ 3 = 4 cm/minggu."
      },
      {
        tanya: "Toko A menjual 2 kg apel seharga Rp36.000,00, sedangkan Toko B menjual 3 kg apel seharga Rp51.000,00. Toko yang lebih murah per kilogram adalah...",
        opsi: ["Toko A, Rp18.000/kg", "Toko B, Rp17.000/kg", "Toko A, Rp17.000/kg", "Keduanya sama murah"],
        jawab: 1,
        bahas: "Harga per kg di Toko A = Rp36.000 ÷ 2 = Rp18.000. Harga per kg di Toko B = Rp51.000 ÷ 3 = Rp17.000. Jadi, Toko B lebih murah."
      }
    ],
    level2: [
      {
        tanya: "Sebuah mobil menempuh jarak 150 km dalam waktu 2 jam 30 menit. Kecepatan rata-rata mobil tersebut adalah...",
        opsi: ["50 km/jam", "55 km/jam", "60 km/jam", "75 km/jam"],
        jawab: 2,
        bahas: "Ubah 2 jam 30 menit menjadi 2,5 jam. Kecepatan = 150 ÷ 2,5 = 60 km/jam."
      },
      {
        tanya: "Sebuah pompa mengalirkan 180 liter air dalam 5 menit. Jika debitnya tetap, banyak air yang dialirkan dalam 1 menit adalah...",
        opsi: ["18 liter", "30 liter", "36 liter", "45 liter"],
        jawab: 2,
        bahas: "Debit air = 180 ÷ 5 = 36 liter/menit. Jadi, dalam 1 menit pompa mengalirkan 36 liter air."
      },
      {
        tanya: "Tinggi tanaman cabai 12 cm pada minggu kedua dan 30 cm pada minggu kelima. Laju pertumbuhan rata-rata tanaman tersebut adalah...",
        opsi: ["4 cm/minggu", "5 cm/minggu", "6 cm/minggu", "9 cm/minggu"],
        jawab: 2,
        bahas: "Pertambahan tinggi = 30 − 12 = 18 cm. Selang waktu = 5 − 2 = 3 minggu. Laju pertumbuhan = 18 ÷ 3 = 6 cm/minggu."
      },
      {
        tanya: "Toko A menjual 1 liter minyak goreng seharga Rp20.000,00, sedangkan Toko B menjual 2 liter seharga Rp35.000,00. Jika membeli 4 liter, berapa penghematan jika memilih Toko B dibandingkan Toko A?",
        opsi: ["Rp5.000,00", "Rp10.000,00", "Rp15.000,00", "Rp20.000,00"],
        jawab: 1,
        bahas: "Harga 4 liter di Toko A = 4 × Rp20.000 = Rp80.000. Harga 4 liter di Toko B = 2 × Rp35.000 = Rp70.000. Penghematan = Rp80.000 − Rp70.000 = Rp10.000,00."
      },
      {
        tanya: "Kemasan A berisi 750 ml jus seharga Rp12.000,00. Kemasan B berisi 1.200 ml jus seharga Rp18.000,00. Kemasan yang lebih hemat dan selisih harga per mililiternya adalah...",
        opsi: ["A, lebih murah Rp1/ml", "B, lebih murah Rp1/ml", "A, lebih murah Rp2/ml", "Keduanya sama hemat"],
        jawab: 1,
        bahas: "Harga A per ml = Rp12.000 ÷ 750 = Rp16/ml. Harga B per ml = Rp18.000 ÷ 1.200 = Rp15/ml. Jadi, kemasan B lebih hemat dengan selisih Rp1/ml."
      },
      {
        tanya: "Sebuah kendaraan menempuh jarak 90 km dalam waktu 1,5 jam. Jika kecepatannya tetap, waktu yang diperlukan untuk menempuh jarak 150 km adalah...",
        opsi: ["2 jam", "2,5 jam", "3 jam", "3,5 jam"],
        jawab: 1,
        bahas: "Kecepatan = 90 ÷ 1,5 = 60 km/jam. Waktu untuk menempuh 150 km = 150 ÷ 60 = 2,5 jam."
      },
      {
        tanya: "Keran A mengalirkan 45 liter air dalam 6 menit, sedangkan keran B mengalirkan 56 liter air dalam 7 menit. Selisih debit kedua keran adalah...",
        opsi: ["0,25 liter/menit", "0,5 liter/menit", "1 liter/menit", "1,5 liter/menit"],
        jawab: 1,
        bahas: "Debit A = 45 ÷ 6 = 7,5 liter/menit. Debit B = 56 ÷ 7 = 8 liter/menit. Selisih debit = 8 − 7,5 = 0,5 liter/menit."
      },
      {
        tanya: "Toko A menjual 2 kg apel seharga Rp36.000,00, sedangkan Toko B menjual 3 kg seharga Rp51.000,00. Jika seseorang membeli 6 kg apel, berapa penghematan jika memilih Toko B?",
        opsi: ["Rp3.000,00", "Rp6.000,00", "Rp9.000,00", "Rp12.000,00"],
        jawab: 1,
        bahas: "Harga 6 kg di Toko A = 3 × Rp36.000 = Rp108.000. Harga 6 kg di Toko B = 2 × Rp51.000 = Rp102.000. Penghematan = Rp108.000 − Rp102.000 = Rp6.000,00."
      },
      {
        tanya: "Tinggi tanaman bertambah dari 7 cm menjadi 25 cm selama 6 hari. Laju pertumbuhan rata-rata tanaman tersebut adalah...",
        opsi: ["2 cm/hari", "3 cm/hari", "4 cm/hari", "5 cm/hari"],
        jawab: 1,
        bahas: "Pertambahan tinggi = 25 − 7 = 18 cm. Laju pertumbuhan rata-rata = 18 ÷ 6 = 3 cm/hari."
      },
      {
        /* CATATAN: di soal asli, kunci jawabnya "Kedua mesin memiliki laju yang sama",
           padahal pembahasan menghasilkan A lebih cepat dengan selisih 1⅔ barang/menit.
           Opsi A diperbaiki menjadi "selisih 1⅔ barang/menit" dan kunci diubah ke opsi A. */
        tanya: "Mesin A menghasilkan 420 barang dalam 12 menit, sedangkan mesin B menghasilkan 500 barang dalam 15 menit. Pernyataan yang benar adalah...",
        opsi: [
          "Mesin A lebih cepat, selisih 1⅔ barang/menit",
          "Mesin B lebih cepat, selisih 1 barang/menit",
          "Kedua mesin memiliki laju yang sama",
          "Mesin A lebih lambat, selisih 2 barang/menit"
        ],
        jawab: 0,
        bahas: "Laju mesin A = 420 ÷ 12 = 35 barang/menit. Laju mesin B = 500 ÷ 15 = 33⅓ barang/menit. Jadi, mesin A lebih cepat, dengan selisih 35 − 33⅓ = 1⅔ barang/menit."
      }
    ]
  }

];

/* Soal Kuis: 3 level, tiap level 15 soal.
   Tiap soal: tanya, opsi (daftar), jawab (nomor opsi benar, mulai dari 0), bahas. */

const KUIS = [

  /* ===== LEVEL 1 ===== */
  [
    {
      tanya: "Di sebuah keranjang terdapat 18 apel merah dan 24 apel hijau. Rasio apel merah : apel hijau dalam bentuk paling sederhana adalah...",
      opsi: ["2 : 3", "3 : 2", "3 : 4", "4 : 3"],
      jawab: 2,
      bahas: "Rasio apel merah : apel hijau = 18 : 24. FPB dari 18 dan 24 adalah 6. Kedua bilangan dibagi 6, sehingga diperoleh 3 : 4."
    },
    {
      tanya: "Perbandingan siswa yang menyukai matematika dan IPA adalah 4 : 7. Jika siswa yang menyukai matematika berjumlah 12 orang, jumlah siswa yang menyukai IPA adalah...",
      opsi: ["18 orang", "21 orang", "24 orang", "28 orang"],
      jawab: 1,
      bahas: "Faktor pengali = 12 ÷ 4 = 3. Jumlah siswa yang menyukai IPA = 7 × 3 = 21 orang."
    },
    {
      tanya: "Bentuk pecahan dari rasio 5 : 8 adalah...",
      opsi: ["8/5", "5/13", "5/8", "8/13"],
      jawab: 2,
      bahas: "Rasio a : b dapat ditulis sebagai pecahan a/b. Jadi, rasio 5 : 8 dapat ditulis sebagai 5/8."
    },
    {
      tanya: "Perbandingan jumlah buku Rina dan Sinta adalah 2 : 5. Jika jumlah buku mereka 35 buah, jumlah buku Rina adalah...",
      opsi: ["10 buku", "12 buku", "14 buku", "15 buku"],
      jawab: 0,
      bahas: "Jumlah bagian = 2 + 5 = 7. Nilai satu bagian = 35 ÷ 7 = 5. Jumlah buku Rina = 2 × 5 = 10 buku."
    },
    {
      tanya: "Perbandingan uang Dika dan Roni adalah 3 : 5. Jika selisih uang mereka Rp12.000, uang Roni adalah...",
      opsi: ["Rp18.000", "Rp24.000", "Rp30.000", "Rp36.000"],
      jawab: 2,
      bahas: "Selisih bagian = 5 - 3 = 2. Nilai satu bagian = Rp12.000 ÷ 2 = Rp6.000. Uang Roni = 5 × Rp6.000 = Rp30.000."
    },
    {
      tanya: "Rasio 4 : 6 ekuivalen dengan rasio...",
      opsi: ["2 : 3", "3 : 2", "4 : 3", "2 : 5"],
      jawab: 0,
      bahas: "Rasio 4 : 6 disederhanakan dengan membagi kedua suku dengan 2. Hasilnya adalah 2 : 3."
    },
    {
      tanya: "Nilai x agar perbandingan 3 : 4 = x : 12 adalah...",
      opsi: ["6", "8", "9", "12"],
      jawab: 2,
      bahas: "Bilangan 4 dikalikan 3 menjadi 12. Agar rasio tetap ekuivalen, bilangan 3 juga dikalikan 3. Jadi, x = 9."
    },
    {
      tanya: "Sebuah foto memiliki panjang 10 cm. Setelah diperbesar, panjangnya menjadi 20 cm. Faktor skala perbesaran foto tersebut adalah...",
      opsi: ["1/2", "2", "5", "10"],
      jawab: 1,
      bahas: "Faktor skala = ukuran baru ÷ ukuran awal = 20 ÷ 10 = 2. Jadi, foto diperbesar 2 kali."
    },
    {
      tanya: "Sebuah denah menggunakan skala 1 : 200. Artinya, setiap 1 cm pada denah mewakili jarak sebenarnya sebesar...",
      opsi: ["2 cm", "20 cm", "200 cm", "2.000 cm"],
      jawab: 2,
      bahas: "Skala 1 : 200 berarti setiap 1 cm pada denah mewakili 200 cm pada ukuran sebenarnya."
    },
    {
      tanya: "Jarak rumah ke sekolah pada peta adalah 4 cm. Jika skala peta 1 : 50.000, jarak sebenarnya adalah...",
      opsi: ["200 meter", "500 meter", "1 km", "2 km"],
      jawab: 3,
      bahas: "Jarak sebenarnya = 4 × 50.000 = 200.000 cm. Karena 100.000 cm = 1 km, jarak sebenarnya adalah 2 km."
    },
    {
      tanya: "Jika 5 buku tulis berharga Rp20.000, harga 10 buku tulis dengan harga satuan yang sama adalah...",
      opsi: ["Rp30.000", "Rp35.000", "Rp40.000", "Rp45.000"],
      jawab: 2,
      bahas: "Jumlah buku bertambah 2 kali lipat, dari 5 menjadi 10. Karena merupakan perbandingan senilai, harga juga menjadi 2 kali lipat. Harga baru = 2 × Rp20.000 = Rp40.000."
    },
    {
      tanya: "Sebuah keran mengalirkan 36 liter air selama 6 menit. Debit air keran tersebut adalah...",
      opsi: ["4 liter/menit", "5 liter/menit", "6 liter/menit", "8 liter/menit"],
      jawab: 2,
      bahas: "Debit = volume ÷ waktu = 36 ÷ 6 = 6 liter/menit."
    },
    {
      tanya: "Sebuah mobil menempuh jarak 90 km dalam waktu 2 jam. Kecepatan rata-ratanya adalah...",
      opsi: ["35 km/jam", "40 km/jam", "45 km/jam", "50 km/jam"],
      jawab: 2,
      bahas: "Kecepatan rata-rata = jarak ÷ waktu = 90 ÷ 2 = 45 km/jam."
    },
    {
      tanya: "Tinggi tanaman bertambah dari 10 cm menjadi 22 cm selama 3 minggu. Jika pertumbuhan dihitung dari selisih tinggi, laju pertumbuhan rata-ratanya adalah...",
      opsi: ["3 cm/minggu", "4 cm/minggu", "6 cm/minggu", "12 cm/minggu"],
      jawab: 1,
      bahas: "Pertambahan tinggi = 22 - 10 = 12 cm. Laju pertumbuhan rata-rata = 12 ÷ 3 = 4 cm/minggu."
    },
    {
      tanya: "Toko A menjual 1 kg gula seharga Rp16.000, sedangkan Toko B menjual 2 kg gula seharga Rp30.000. Toko yang lebih hemat berdasarkan harga per kilogram adalah...",
      opsi: ["Toko A, Rp16.000/kg", "Toko B, Rp15.000/kg", "Keduanya sama", "Toko A, Rp15.000/kg"],
      jawab: 1,
      bahas: "Harga per kg Toko A = Rp16.000. Harga per kg Toko B = Rp30.000 ÷ 2 = Rp15.000. Jadi, Toko B lebih hemat."
    }
  ],

  /* ===== LEVEL 2 ===== */
  [
    {
      tanya: "Perbandingan siswa laki-laki dan perempuan di suatu kelas adalah 5 : 7. Jika jumlah seluruh siswa 48 orang, jumlah siswa perempuan adalah...",
      opsi: ["20 orang", "24 orang", "28 orang", "32 orang"],
      jawab: 2,
      bahas: "Jumlah bagian = 5 + 7 = 12. Nilai satu bagian = 48 ÷ 12 = 4. Jumlah siswa perempuan = 7 × 4 = 28 orang."
    },
    {
      tanya: "Perbandingan kelereng Andi dan Budi adalah 4 : 9. Jika selisih kelereng mereka 25 buah, jumlah seluruh kelereng mereka adalah...",
      opsi: ["45 buah", "60 buah", "65 buah", "75 buah"],
      jawab: 2,
      bahas: "Selisih bagian = 9 - 4 = 5. Nilai satu bagian = 25 ÷ 5 = 5. Jumlah kelereng = (4 + 9) × 5 = 65 buah."
    },
    {
      tanya: "Perbandingan usia Kakak dan Adik adalah 7 : 4. Jika jumlah usia mereka 33 tahun, selisih usia Kakak dan Adik adalah...",
      opsi: ["6 tahun", "9 tahun", "12 tahun", "15 tahun"],
      jawab: 1,
      bahas: "Jumlah bagian = 7 + 4 = 11. Nilai satu bagian = 33 ÷ 11 = 3 tahun. Selisih usia = (7 - 4) × 3 = 9 tahun."
    },
    {
      tanya: "Perbandingan pita merah, kuning, dan biru adalah 2 : 3 : 5. Jika panjang seluruh pita 80 cm, panjang pita kuning adalah...",
      opsi: ["16 cm", "24 cm", "32 cm", "40 cm"],
      jawab: 1,
      bahas: "Jumlah bagian = 2 + 3 + 5 = 10. Nilai satu bagian = 80 ÷ 10 = 8 cm. Pita kuning = 3 × 8 = 24 cm."
    },
    {
      tanya: "Perbandingan berat dua paket adalah 3 : 8. Jika selisih beratnya 25 kg, berat paket yang lebih berat adalah...",
      opsi: ["30 kg", "35 kg", "40 kg", "45 kg"],
      jawab: 2,
      bahas: "Selisih bagian = 8 - 3 = 5. Nilai satu bagian = 25 ÷ 5 = 5 kg. Paket yang lebih berat = 8 × 5 = 40 kg."
    },
    {
      tanya: "Perbandingan 5 : 8 ekuivalen dengan x : 40. Nilai x adalah...",
      opsi: ["20", "25", "30", "35"],
      jawab: 1,
      bahas: "Bilangan 8 dikalikan 5 menjadi 40. Maka, x = 5 × 5 = 25 agar kedua rasio tetap ekuivalen."
    },
    {
      tanya: "Diketahui rasio A = 12 : 20, rasio B = 9 : 15, dan rasio C = 8 : 12. Pernyataan yang benar adalah...",
      opsi: [
        "Hanya A dan B ekuivalen",
        "Hanya A dan C ekuivalen",
        "Ketiga rasio ekuivalen",
        "A, B, dan C tidak ekuivalen"
      ],
      jawab: 0,
      bahas: "Rasio A = 12 : 20 = 3 : 5. Rasio B = 9 : 15 = 3 : 5. Rasio C = 8 : 12 = 2 : 3. Jadi, hanya A dan B yang ekuivalen."
    },
    {
      tanya: "Perbandingan sirup dan air adalah 2 : 5. Jika air yang digunakan 25 gelas, banyak sirup yang dibutuhkan adalah...",
      opsi: ["5 gelas", "10 gelas", "12 gelas", "15 gelas"],
      jawab: 1,
      bahas: "Faktor pengali = 25 ÷ 5 = 5. Banyak sirup = 2 × 5 = 10 gelas agar rasanya tetap sama."
    },
    {
      tanya: "Sebuah peta berskala 1 : 400.000. Jika jarak dua kota pada peta adalah 6,5 cm, jarak sebenarnya adalah...",
      opsi: ["13 km", "20 km", "26 km", "32 km"],
      jawab: 2,
      bahas: "Jarak sebenarnya = 6,5 × 400.000 = 2.600.000 cm. Karena 100.000 cm = 1 km, jarak sebenarnya = 26 km."
    },
    {
      tanya: "Jarak sebenarnya antara dua tempat adalah 12 km. Jika jarak pada peta 4 cm, skala peta tersebut adalah...",
      opsi: ["1 : 30.000", "1 : 300.000", "1 : 400.000", "1 : 3.000.000"],
      jawab: 1,
      bahas: "Jarak sebenarnya = 12 km = 1.200.000 cm. Skala = 4 : 1.200.000. Sederhanakan dengan membagi kedua bilangan dengan 4, sehingga diperoleh 1 : 300.000."
    },
    {
      tanya: "Sebuah foto berukuran 8 cm × 12 cm diperbesar dengan faktor skala 1,5. Luas foto setelah diperbesar adalah...",
      opsi: ["96 cm²", "120 cm²", "144 cm²", "216 cm²"],
      jawab: 3,
      bahas: "Panjang baru = 8 × 1,5 = 12 cm dan lebar baru = 12 × 1,5 = 18 cm. Luas baru = 12 × 18 = 216 cm²."
    },
    {
      tanya: "Sebuah mesin menghasilkan 180 botol dalam 6 menit. Jika kecepatannya tetap, waktu yang diperlukan untuk menghasilkan 450 botol adalah...",
      opsi: ["12 menit", "15 menit", "18 menit", "20 menit"],
      jawab: 1,
      bahas: "Waktu berbanding senilai dengan jumlah botol. Waktu = (450 ÷ 180) × 6 = 15 menit."
    },
    {
      tanya: "Sebuah pekerjaan selesai dalam 18 hari oleh 8 pekerja. Jika pekerjaan yang sama dikerjakan oleh 12 pekerja dengan kemampuan sama, waktu yang diperlukan adalah...",
      opsi: ["9 hari", "12 hari", "14 hari", "27 hari"],
      jawab: 1,
      bahas: "Jumlah pekerja dan waktu berbanding berbalik nilai. Waktu baru = (8 × 18) ÷ 12 = 12 hari."
    },
    {
      tanya: "Sebuah sepeda motor menempuh 42 km dalam 35 menit. Kecepatan rata-ratanya dalam km/jam adalah...",
      opsi: ["60 km/jam", "66 km/jam", "72 km/jam", "84 km/jam"],
      jawab: 2,
      bahas: "Waktu = 35/60 jam. Kecepatan = 42 ÷ (35/60) = 42 × 60 ÷ 35 = 72 km/jam."
    },
    {
      tanya: "Kemasan A berisi 800 ml susu seharga Rp12.000, sedangkan kemasan B berisi 1.200 ml susu seharga Rp16.800. Kemasan yang lebih hemat berdasarkan harga per ml adalah...",
      opsi: [
        "Kemasan A, Rp12/ml",
        "Kemasan A, Rp15/ml",
        "Kemasan B, Rp14/ml",
        "Keduanya sama hemat"
      ],
      jawab: 2,
      bahas: "Harga per ml A = Rp12.000 ÷ 800 = Rp15/ml. Harga per ml B = Rp16.800 ÷ 1.200 = Rp14/ml. Jadi, kemasan B lebih hemat."
    }
  ],

  /* ===== LEVEL 3 ===== */
  [
    {
      tanya: "Perbandingan uang Andi, Budi, dan Citra adalah 3 : 5 : 7. Jika selisih uang Citra dan Andi Rp40.000, jumlah uang mereka bertiga adalah...",
      opsi: ["Rp100.000", "Rp120.000", "Rp150.000", "Rp200.000"],
      jawab: 2,
      bahas: "Selisih bagian Citra dan Andi = 7 - 3 = 4. Nilai satu bagian = Rp40.000 ÷ 4 = Rp10.000. Jumlah bagian = 3 + 5 + 7 = 15. Total uang = 15 × Rp10.000 = Rp150.000."
    },
    {
      /* DIPERBAIKI: jawaban benar 4 cm tidak ada di pilihan asli (6, 8, 12, 14). */
      tanya: "Perbandingan panjang pita A dan B adalah 4 : 7. Pita A ditambah 6 cm dan pita B ditambah 3 cm sehingga panjang keduanya menjadi sama. Panjang pita A semula adalah...",
      opsi: ["4 cm", "8 cm", "12 cm", "14 cm"],
      jawab: 0,
      bahas: "Misalkan panjang pita A = 4x dan B = 7x. Karena 4x + 6 = 7x + 3, maka 3 = 3x sehingga x = 1. Panjang pita A semula = 4x = 4 cm."
    },
    {
      /* DIPERBAIKI: jawaban benar 144 siswa tidak ada di pilihan asli (60, 66, 72, 84). */
      tanya: "Perbandingan jumlah siswa laki-laki dan perempuan adalah 5 : 7. Setelah 6 siswa laki-laki bergabung, perbandingan menjadi 11 : 14. Jumlah siswa semula adalah...",
      opsi: ["120 siswa", "132 siswa", "144 siswa", "156 siswa"],
      jawab: 2,
      bahas: "Misalkan jumlah awal laki-laki = 5x dan perempuan = 7x. Setelah 6 siswa laki-laki bergabung, (5x + 6) : 7x = 11 : 14. Maka 14(5x + 6) = 77x, sehingga 70x + 84 = 77x dan x = 12. Jumlah awal = 5(12) + 7(12) = 144 siswa."
    },
    {
      /* DIPERBAIKI: kunci asli menunjuk 6 cm, padahal jawaban benar 3 cm (opsi pertama). */
      tanya: "Perbandingan panjang dan lebar sebuah denah adalah 5 : 3. Jika panjang sebenarnya 25 meter dan denah dibuat dengan skala 1 : 500, lebar denah adalah...",
      opsi: ["3 cm", "6 cm", "10 cm", "15 cm"],
      jawab: 0,
      bahas: "Lebar sebenarnya = (3/5) × 25 = 15 meter = 1.500 cm. Lebar denah = 1.500 ÷ 500 = 3 cm. Jadi, jawaban yang benar adalah 3 cm."
    },
    {
      tanya: "Sebuah foto berukuran 10 cm × 15 cm diperkecil sehingga panjangnya menjadi 6 cm. Luas foto setelah diperkecil adalah...",
      opsi: ["36 cm²", "45 cm²", "54 cm²", "90 cm²"],
      jawab: 2,
      bahas: "Faktor skala = 6 ÷ 10 = 0,6. Lebar baru = 15 × 0,6 = 9 cm. Luas baru = 6 × 9 = 54 cm²."
    },
    {
      /* DIPERBAIKI: kunci asli menunjuk 9 cm, padahal jawaban benar 12 cm (opsi ketiga). */
      tanya: "Sebuah peta berskala 1 : 750.000. Jarak sebenarnya dua kota adalah 45 km. Jika peta diperbesar 2 kali tanpa mengubah jarak sebenarnya, jarak kedua kota pada peta baru adalah...",
      opsi: ["6 cm", "9 cm", "12 cm", "15 cm"],
      jawab: 2,
      bahas: "Jarak sebenarnya = 45 km = 4.500.000 cm. Jarak pada peta awal = 4.500.000 ÷ 750.000 = 6 cm. Setelah peta diperbesar 2 kali, jarak pada peta baru = 6 × 2 = 12 cm."
    },
    {
      /* DIPERBAIKI: jumlah diubah dari 138 menjadi 140 agar habis dibagi 35. */
      tanya: "Rasio A : B = 3 : 4 dan B : C = 6 : 7. Jika jumlah A, B, dan C adalah 140, nilai C adalah...",
      opsi: ["42", "49", "56", "63"],
      jawab: 2,
      bahas: "Samakan nilai B. Rasio A : B = 9 : 12 dan B : C = 12 : 14. Jadi, A : B : C = 9 : 12 : 14. Jumlah bagian = 35, sehingga satu bagian = 140 ÷ 35 = 4. Nilai C = 14 × 4 = 56."
    },
    {
      tanya: "Sebuah mesin menghasilkan 240 barang dalam 8 menit. Mesin lain menghasilkan 315 barang dalam 9 menit. Selisih laju produksi kedua mesin adalah...",
      opsi: ["3 barang/menit", "5 barang/menit", "8 barang/menit", "15 barang/menit"],
      jawab: 1,
      bahas: "Laju mesin pertama = 240 ÷ 8 = 30 barang/menit. Laju mesin kedua = 315 ÷ 9 = 35 barang/menit. Selisih laju = 35 - 30 = 5 barang/menit."
    },
    {
      /* DIPERBAIKI: kunci asli menunjuk 12 orang, padahal jawaban benar 9 orang (opsi kedua). */
      tanya: "Sebanyak 15 pekerja dapat menyelesaikan proyek dalam 24 hari. Setelah bekerja selama 8 hari, proyek berhenti. Agar proyek selesai dalam 10 hari berikutnya, jumlah pekerja tambahan yang diperlukan adalah...",
      opsi: ["6 orang", "9 orang", "12 orang", "15 orang"],
      jawab: 1,
      bahas: "Total pekerjaan = 15 × 24 = 360 hari-orang. Pekerjaan yang selesai selama 8 hari = 15 × 8 = 120 hari-orang. Sisa pekerjaan = 360 - 120 = 240 hari-orang. Pekerja yang dibutuhkan untuk 10 hari = 240 ÷ 10 = 24 orang. Tambahan pekerja = 24 - 15 = 9 orang."
    },
    {
      tanya: "Sebuah mobil menempuh 120 km dengan 8 liter bensin. Jika mobil menggunakan 15 liter bensin dengan kondisi yang sama, jarak yang dapat ditempuh adalah...",
      opsi: ["180 km", "200 km", "225 km", "240 km"],
      jawab: 2,
      bahas: "Jarak per liter = 120 ÷ 8 = 15 km/liter. Dengan 15 liter, jarak = 15 × 15 = 225 km."
    },
    {
      /* DIPERBAIKI: debit keran B diubah dari 5 menjadi 3 liter/menit agar waktunya bulat (20 menit);
         kalimat awal juga dirapikan menjadi "bak berkapasitas 180 liter". */
      tanya: "Sebuah bak kosong berkapasitas 180 liter. Keran A mengisi air dengan debit 12 liter/menit, sedangkan keran B mengeluarkan air dengan debit 3 liter/menit. Jika keduanya dibuka bersamaan, waktu yang diperlukan sampai bak penuh adalah...",
      opsi: ["15 menit", "20 menit", "25 menit", "30 menit"],
      jawab: 1,
      bahas: "Debit bersih = 12 - 3 = 9 liter/menit. Waktu = 180 ÷ 9 = 20 menit."
    },
    {
      tanya: "Tinggi tanaman A bertambah dari 12 cm menjadi 30 cm dalam 6 minggu. Tinggi tanaman B bertambah dari 15 cm menjadi 39 cm dalam 8 minggu. Perbandingan laju pertumbuhan rata-rata tanaman A : tanaman B adalah...",
      opsi: ["1 : 1", "3 : 4", "4 : 3", "2 : 3"],
      jawab: 0,
      bahas: "Laju A = (30 - 12) ÷ 6 = 3 cm/minggu. Laju B = (39 - 15) ÷ 8 = 3 cm/minggu. Perbandingan laju A : B = 3 : 3 = 1 : 1."
    },
    {
      /* DIPERBAIKI: selisih benar Rp6.000 tidak ada di pilihan asli (4.000, 8.000, 12.000, 16.000). */
      tanya: "Toko A menjual 1,5 kg apel seharga Rp36.000, sedangkan Toko B menjual 2 kg apel seharga Rp46.000. Jika membeli 6 kg apel, selisih total harga di kedua toko adalah...",
      opsi: ["Rp4.000", "Rp6.000", "Rp12.000", "Rp16.000"],
      jawab: 1,
      bahas: "Harga per kg A = Rp36.000 ÷ 1,5 = Rp24.000. Harga per kg B = Rp46.000 ÷ 2 = Rp23.000. Selisih harga per kg = Rp1.000. Untuk 6 kg, selisih = 6 × Rp1.000 = Rp6.000."
    },
    {
      /* DIPERBAIKI: kecepatan diubah dari 5 km/jam menjadi 30 km/jam agar jawabannya 30 menit (ada di pilihan). */
      tanya: "Sebuah peta memiliki skala 1 : 200.000. Jarak dua tempat pada peta adalah 7,5 cm. Jika seseorang berkendara dengan kecepatan rata-rata 30 km/jam, waktu yang diperlukan untuk menempuh jarak sebenarnya adalah...",
      opsi: ["15 menit", "18 menit", "30 menit", "45 menit"],
      jawab: 2,
      bahas: "Jarak sebenarnya = 7,5 × 200.000 = 1.500.000 cm = 15 km. Waktu = jarak ÷ kecepatan = 15 ÷ 30 = 0,5 jam = 30 menit."
    },
    {
      tanya: "Sebuah pekerjaan dapat diselesaikan oleh 12 pekerja dalam 20 hari. Setelah bekerja 5 hari, 4 pekerja berhenti. Berapa hari tambahan yang diperlukan oleh pekerja tersisa untuk menyelesaikan pekerjaan?",
      opsi: ["15 hari", "18 hari", "20 hari", "22,5 hari"],
      jawab: 3,
      bahas: "Total pekerjaan = 12 × 20 = 240 hari-orang. Pekerjaan selama 5 hari = 12 × 5 = 60 hari-orang. Sisa pekerjaan = 240 - 60 = 180 hari-orang. Pekerja tersisa = 12 - 4 = 8 orang. Waktu tambahan = 180 ÷ 8 = 22,5 hari."
    }
  ]

];


/* Mesin soal: dipakai bersama oleh Latihan dan Kuis */

function buatSoal(idBox, daftar) {
  const box = document.getElementById(idBox);
  let nomor = 0;
  let skor = 0;

  function tampil() {
    if (nomor >= daftar.length) {
      box.innerHTML =
        "<h3>Selesai!</h3>" +
        '<div class="skor">' + skor + " / " + daftar.length + "</div>" +
        "<p>" + (skor === daftar.length
          ? "Sempurna! Kamu sudah paham rasio."
          : skor >= daftar.length / 2
            ? "Bagus! Baca lagi bagian yang masih keliru lalu coba lagi."
            : "Ayo baca materinya dulu, lalu coba lagi.") + "</p>" +
        '<button class="btn" id="' + idBox + '-ulang">Coba lagi</button>';
      document.getElementById(idBox + "-ulang").addEventListener("click", function () {
        nomor = 0; skor = 0; tampil();
      });
      return;
    }

    const s = daftar[nomor];
    let opsiHTML = "";
    s.opsi.forEach(function (o, i) {
      opsiHTML += '<button data-i="' + i + '">' + String.fromCharCode(65 + i) + ". " + o + "</button>";
    });

    box.innerHTML =
      '<div class="soal-atas"><span>Soal ' + (nomor + 1) + " / " + daftar.length + "</span><span>Skor " + skor + "</span></div>" +
      '<p class="tanya">' + s.tanya + "</p>" +
      '<div class="opsi">' + opsiHTML + "</div>" +
      '<div class="umpan"></div>';

    const tombol = box.querySelectorAll(".opsi button");
    tombol.forEach(function (t) {
      t.addEventListener("click", function () { jawab(Number(t.dataset.i), tombol); });
    });
  }

  function jawab(pilih, tombol) {
    const s = daftar[nomor];
    tombol.forEach(function (t) { t.disabled = true; });
    tombol[s.jawab].classList.add("benar");

    let judul = "Benar!";
    if (pilih === s.jawab) {
      skor++;
    } else {
      tombol[pilih].classList.add("salah");
      judul = "Belum tepat.";
    }

    const akhir = nomor === daftar.length - 1;
    box.querySelector(".umpan").innerHTML =
      '<div class="bahas"><b>' + judul + "</b> " + s.bahas + "</div>" +
      '<button class="btn" id="' + idBox + '-lanjut">' + (akhir ? "Lihat skor" : "Soal berikutnya") + "</button>";
    document.getElementById(idBox + "-lanjut").addEventListener("click", function () {
      nomor++; tampil();
    });
  }

  tampil();
}

/* Mesin Latihan: pilih sub-bab, pilih level, kerjakan 10 soal, lihat nilai.
   Atur poin di sini. */

const POIN_BENAR = 10;  // poin jika jawaban benar
const POIN_SALAH = 0;   // poin jika jawaban salah (isi angka negatif, misalnya -2, jika ingin ada pengurangan)

function teksPoin(p) {
  return (p < 0 ? "−" : "+") + Math.abs(p) + " poin";
}

function mulaiLatihan(idBox) {
  const box = document.getElementById(idBox);
  const terbaik = {};   // skor terbaik per sub-bab dan level (selama halaman dibuka)

  function pilihSubbab() {
    let h =
      "<h3>Pilih sub-bab</h3>" +
      '<p class="catatan">Tiap sub-bab punya 2 level, masing-masing 10 soal. ' +
      "Jawaban benar mendapat " + POIN_BENAR + " poin.</p>" +
      '<div class="menu" style="margin-top:16px">';
    LATIHAN.forEach(function (s, i) {
      h += '<button data-s="' + i + '">' + (i + 1) + ". " + s.judul + "</button>";
    });
    h += "</div>";
    box.innerHTML = h;
    box.querySelectorAll(".menu button").forEach(function (b) {
      b.addEventListener("click", function () { pilihLevel(Number(b.dataset.s)); });
    });
  }

  function pilihLevel(si) {
    const sub = LATIHAN[si];
    let h =
      "<h3>" + (si + 1) + ". " + sub.judul + "</h3>" +
      '<p class="catatan">Pilih level yang mau dikerjakan.</p>' +
      '<div class="level-pilih">';
    [1, 2].forEach(function (lv) {
      const jml = (lv === 1 ? sub.level1 : sub.level2).length;
      const t = terbaik[si + "-" + lv];
      h += '<button data-l="' + lv + '"><span>Level ' + lv + "</span>" +
        "<small>" + jml + " soal" + (t !== undefined ? " · skor terbaik: " + t : "") + "</small></button>";
    });
    h += '</div><button class="btn ghost" id="lat-kembali">← Semua sub-bab</button>';
    box.innerHTML = h;
    box.querySelectorAll(".level-pilih button").forEach(function (b) {
      b.addEventListener("click", function () { kerjakan(si, Number(b.dataset.l)); });
    });
    document.getElementById("lat-kembali").addEventListener("click", pilihSubbab);
  }

  function kerjakan(si, lv) {
    const sub = LATIHAN[si];
    const daftar = lv === 1 ? sub.level1 : sub.level2;
    let nomor = 0;
    let poin = 0;
    let benar = 0;

    function tampil() {
      if (nomor >= daftar.length) { selesai(); return; }

      const s = daftar[nomor];
      let opsiHTML = "";
      s.opsi.forEach(function (o, i) {
        opsiHTML += '<button data-i="' + i + '">' + String.fromCharCode(65 + i) + ". " + o + "</button>";
      });

      box.innerHTML =
        '<div class="soal-atas"><span>' + sub.judul + " · Level " + lv + " · Soal " + (nomor + 1) + " / " + daftar.length +
        "</span><span>Poin " + poin + "</span></div>" +
        '<p class="tanya">' + s.tanya + "</p>" +
        '<div class="opsi">' + opsiHTML + "</div>" +
        '<div class="umpan"></div>';

      const tombol = box.querySelectorAll(".opsi button");
      tombol.forEach(function (t) {
        t.addEventListener("click", function () { jawab(Number(t.dataset.i), tombol); });
      });
    }

    function jawab(pilih, tombol) {
      const s = daftar[nomor];
      tombol.forEach(function (t) { t.disabled = true; });
      tombol[s.jawab].classList.add("benar");

      let judul;
      if (pilih === s.jawab) {
        poin += POIN_BENAR;
        benar++;
        judul = "Benar! " + teksPoin(POIN_BENAR) + ".";
      } else {
        tombol[pilih].classList.add("salah");
        poin += POIN_SALAH;
        judul = "Belum tepat. " + teksPoin(POIN_SALAH) + ".";
      }
      box.querySelector(".soal-atas span:last-child").textContent = "Poin " + poin;

      const akhir = nomor === daftar.length - 1;
      box.querySelector(".umpan").innerHTML =
        '<div class="bahas"><b>' + judul + "</b> " + s.bahas + "</div>" +
        '<button class="btn" id="lat-lanjut">' + (akhir ? "Lihat nilai" : "Soal berikutnya") + "</button>";
      document.getElementById("lat-lanjut").addEventListener("click", function () {
        nomor++; tampil();
      });
    }

    function selesai() {
      const maks = daftar.length * POIN_BENAR;
      const kunci = si + "-" + lv;
      if (terbaik[kunci] === undefined || poin > terbaik[kunci]) terbaik[kunci] = poin;

      const pesan = benar === daftar.length
        ? "Sempurna! Semua jawabanmu benar."
        : benar >= daftar.length * 0.7
          ? "Bagus! Cek lagi pembahasan soal yang masih keliru."
          : benar >= daftar.length / 2
            ? "Lumayan. Baca lagi materinya, lalu coba lagi."
            : "Ayo baca materinya dulu, lalu coba lagi.";

      let h =
        "<h3>Selesai! " + sub.judul + " · Level " + lv + "</h3>" +
        '<div class="skor">' + poin + " / " + maks + "</div>" +
        "<p><b>Benar:</b> " + benar + " soal · <b>Salah:</b> " + (daftar.length - benar) + " soal</p>" +
        '<p class="catatan">' + pesan + "</p>" +
        '<div class="row">' +
        '<button class="btn" id="lat-ulang">Ulangi level ini</button>';
      if (lv === 1) h += '<button class="btn" id="lat-lv2">Lanjut ke Level 2</button>';
      h += '<button class="btn ghost" id="lat-sub">Pilih sub-bab lain</button></div>';
      box.innerHTML = h;

      document.getElementById("lat-ulang").addEventListener("click", function () { kerjakan(si, lv); });
      if (lv === 1) document.getElementById("lat-lv2").addEventListener("click", function () { kerjakan(si, 2); });
      document.getElementById("lat-sub").addEventListener("click", pilihSubbab);
    }

    tampil();
  }

  pilihSubbab();
}


/* Mesin Kuis: pilih level (1-3), kerjakan 15 soal, lihat poin dan nilai.
   Atur poin di sini. */

const KUIS_POIN_BENAR = 10;  // poin jika jawaban benar
const KUIS_POIN_SALAH = 0;   // poin jika jawaban salah (isi angka negatif, misalnya -2, jika ingin ada pengurangan)

function teksPoinKuis(p) {
  return (p < 0 ? "−" : "+") + Math.abs(p) + " poin";
}

function mulaiKuis(idBox) {
  const box = document.getElementById(idBox);
  const terbaik = {};   // nilai terbaik per level (selama halaman dibuka)
  const H3 = '<h3 style="font-size:24px;margin-bottom:8px">';

  function pilihLevel() {
    let h =
      H3 + "Pilih level kuis</h3>" +
      '<p class="catatan">Ada ' + KUIS.length + " level, masing-masing 15 soal. " +
      "Jawaban benar mendapat " + KUIS_POIN_BENAR + " poin. Nilai akhir ditampilkan setelah soal terakhir.</p>" +
      '<div class="level-pilih">';
    KUIS.forEach(function (daftar, i) {
      const t = terbaik[i];
      h += '<button data-l="' + i + '"><span>Level ' + (i + 1) + "</span>" +
        "<small>" + daftar.length + " soal" + (t !== undefined ? " · nilai terbaik: " + t : "") + "</small></button>";
    });
    h += "</div>";
    box.innerHTML = h;
    box.querySelectorAll(".level-pilih button").forEach(function (b) {
      b.addEventListener("click", function () { kerjakan(Number(b.dataset.l)); });
    });
  }

  function kerjakan(li) {
    const daftar = KUIS[li];
    let nomor = 0;
    let poin = 0;
    let benar = 0;

    function tampil() {
      if (nomor >= daftar.length) { selesai(); return; }

      const s = daftar[nomor];
      let opsiHTML = "";
      s.opsi.forEach(function (o, i) {
        opsiHTML += '<button data-i="' + i + '">' + String.fromCharCode(65 + i) + ". " + o + "</button>";
      });

      box.innerHTML =
        '<div class="soal-atas"><span>Level ' + (li + 1) + " · Soal " + (nomor + 1) + " / " + daftar.length +
        "</span><span>Poin " + poin + "</span></div>" +
        '<p class="tanya">' + s.tanya + "</p>" +
        '<div class="opsi">' + opsiHTML + "</div>" +
        '<div class="umpan"></div>';

      const tombol = box.querySelectorAll(".opsi button");
      tombol.forEach(function (t) {
        t.addEventListener("click", function () { jawab(Number(t.dataset.i), tombol); });
      });
    }

    function jawab(pilih, tombol) {
      const s = daftar[nomor];
      tombol.forEach(function (t) { t.disabled = true; });
      tombol[s.jawab].classList.add("benar");

      let judul;
      if (pilih === s.jawab) {
        poin += KUIS_POIN_BENAR;
        benar++;
        judul = "Benar! " + teksPoinKuis(KUIS_POIN_BENAR) + ".";
      } else {
        tombol[pilih].classList.add("salah");
        poin += KUIS_POIN_SALAH;
        judul = "Belum tepat. " + teksPoinKuis(KUIS_POIN_SALAH) + ".";
      }
      box.querySelector(".soal-atas span:last-child").textContent = "Poin " + poin;

      const akhir = nomor === daftar.length - 1;
      box.querySelector(".umpan").innerHTML =
        '<div class="bahas"><b>' + judul + "</b> " + s.bahas + "</div>" +
        '<button class="btn" id="kuis-lanjut">' + (akhir ? "Lihat nilai" : "Soal berikutnya") + "</button>";
      document.getElementById("kuis-lanjut").addEventListener("click", function () {
        nomor++; tampil();
      });
    }

    function selesai() {
      const maks = daftar.length * KUIS_POIN_BENAR;
      const nilai = Math.round(benar / daftar.length * 100);   // nilai 0-100 dari jumlah jawaban benar
      if (terbaik[li] === undefined || nilai > terbaik[li]) terbaik[li] = nilai;

      const pesan = benar === daftar.length
        ? "Sempurna! Semua jawabanmu benar."
        : benar >= daftar.length * 0.7
          ? "Bagus! Cek lagi pembahasan soal yang masih keliru."
          : benar >= daftar.length / 2
            ? "Lumayan. Baca lagi materinya, lalu coba lagi."
            : "Ayo baca materinya dulu, lalu coba lagi.";

      let h =
        H3 + "Selesai! Kuis Level " + (li + 1) + "</h3>" +
        '<div class="skor">Nilai ' + nilai + "</div>" +
        "<p><b>Poin:</b> " + poin + " / " + maks + "</p>" +
        "<p><b>Benar:</b> " + benar + " soal · <b>Salah:</b> " + (daftar.length - benar) + " soal</p>" +
        '<p class="catatan">' + pesan + "</p>" +
        '<div class="row">' +
        '<button class="btn" id="kuis-ulang">Ulangi level ini</button>';
      if (li < KUIS.length - 1) h += '<button class="btn" id="kuis-next">Lanjut ke Level ' + (li + 2) + "</button>";
      h += '<button class="btn ghost" id="kuis-level">Pilih level lain</button></div>';
      box.innerHTML = h;

      document.getElementById("kuis-ulang").addEventListener("click", function () { kerjakan(li); });
      if (li < KUIS.length - 1) {
        document.getElementById("kuis-next").addEventListener("click", function () { kerjakan(li + 1); });
      }
      document.getElementById("kuis-level").addEventListener("click", pilihLevel);
    }

    tampil();
  }

  pilihLevel();
}

mulaiLatihan("latihan-box");
mulaiKuis("kuis-box");


/* ---------- 5. MULAI ---------- */

showPage("home");
