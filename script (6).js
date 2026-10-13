/* =========================================================
   Laju Perubahan Battle – Kelas VII (TGT)
   Data soal ada di soal.js (variabel SOAL).
   ========================================================= */
(function () {
  'use strict';

  // ---------- Konstanta ----------
  var COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
  var EMOJI  = ['🦁', '🐯', '🐼', '🐸', '🐙', '🦄', '🐧', '🦊'];
  var HUES   = [350, 25, 45, 140, 185, 215, 265, 320];
  var LETTERS = ['A', 'B', 'C', 'D'];
  var STORE_KEY = 'laju-game-state-v1';

  // ---------- Variabel ----------
  var state = null;        // status permainan (disimpan di localStorage)
  var teamCount = 4;       // jumlah kelompok di layar pengaturan
  var currentTile = null;  // nomor kotak yang sedang dibuka (indeks 0..49)
  var revealed = false;    // apakah jawaban sudah ditampilkan
  var timerId = null;
  var audioCtx = null;

  // ---------- Helper ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clampInt(v, min, max, def) {
    var n = parseInt(v, 10);
    if (isNaN(n)) return def;
    return Math.min(max, Math.max(min, n));
  }
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function showScreen(id) {
    ['setup', 'game', 'result'].forEach(function (s) {
      $(s).classList.toggle('active', s === id);
    });
    window.scrollTo(0, 0);
  }

  // ---------- Penyimpanan ----------
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} }
  function clearSave() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      var ok = s && Array.isArray(s.teams) && s.teams.length >= 1 && s.teams.length <= 8 &&
               Array.isArray(s.order) && s.order.length === SOAL.length &&
               Array.isArray(s.done) && s.done.length === SOAL.length;
      return ok ? s : null;
    } catch (e) { return null; }
  }

  // ---------- Suara ----------
  function tone(freq, start, dur, type, vol) {
    var o = audioCtx.createOscillator();
    var g = audioCtx.createGain();
    var t0 = audioCtx.currentTime + start;
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.15, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t0); o.stop(t0 + dur);
  }
  function playSound(kind) {
    if (!state || !state.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      if (kind === 'correct') { tone(523, 0, .15); tone(659, .13, .15); tone(784, .26, .3); }
      else if (kind === 'wrong') { tone(200, 0, .35, 'sawtooth', .1); }
      else if (kind === 'timeup') { tone(330, 0, .25, 'square', .08); tone(330, .3, .25, 'square', .08); }
      else if (kind === 'finish') { tone(523, 0, .15); tone(659, .15, .15); tone(784, .3, .15); tone(1047, .45, .5); }
    } catch (e) {}
  }

  // ======================================================
  //  LAYAR PENGATURAN
  // ======================================================
  function buildCountButtons() {
    var wrap = $('teamCountBtns');
    wrap.innerHTML = '';
    for (var n = 1; n <= 8; n++) {
      (function (num) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'count-btn' + (num === teamCount ? ' active' : '');
        b.textContent = num;
        b.addEventListener('click', function () {
          teamCount = num;
          buildCountButtons();
          buildNameInputs();
        });
        wrap.appendChild(b);
      })(n);
    }
  }

  function buildNameInputs() {
    var wrap = $('teamNames');
    var old = Array.prototype.map.call(wrap.querySelectorAll('input'), function (i) { return i.value; });
    wrap.innerHTML = '';
    for (var i = 0; i < teamCount; i++) {
      var row = document.createElement('label');
      row.className = 'name-row';
      row.style.setProperty('--c', COLORS[i]);
      var dot = document.createElement('span');
      dot.className = 'dot';
      dot.textContent = EMOJI[i];
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.maxLength = 20;
      inp.value = (old[i] !== undefined) ? old[i] : ('Kelompok ' + (i + 1));
      row.appendChild(dot);
      row.appendChild(inp);
      wrap.appendChild(row);
    }
  }

  function updateResumeButton() { $('btnResume').hidden = !load(); }

  function startGame() {
    var inputs = document.querySelectorAll('#teamNames input');
    var names = Array.prototype.map.call(inputs, function (inp, i) {
      return inp.value.trim() || ('Kelompok ' + (i + 1));
    });
    var order = SOAL.map(function (_, i) { return i; });
    if ($('optShuffle').checked) shuffle(order);

    state = {
      teams: names.map(function (n) { return { name: n, score: 0 }; }),
      order: order,                                   // posisi kotak -> indeks soal
      done: SOAL.map(function () { return null; }),   // null | {w: indeksKelompok atau -1, pts}
      turn: 0,
      points: clampInt($('optPoints').value, 1, 1000, 10),
      bonus: clampInt($('optBonus').value, 0, 1000, 5),
      timer: parseInt($('optTimer').value, 10) || 0,
      sound: $('optSound').checked
    };
    save();
    showScreen('game');
    renderGame();
  }

  // ======================================================
  //  LAYAR PERMAINAN
  // ======================================================
  function renderGame() { renderTurn(); renderBoard(); renderScoreboard(); }

  function renderTurn() {
    var t = state.teams[state.turn];
    var answered = state.done.filter(Boolean).length;
    $('turnInfo').innerHTML =
      '<span class="turn-dot" style="background:' + COLORS[state.turn] + '">' + EMOJI[state.turn] + '</span>' +
      '<span>Giliran: <strong>' + esc(t.name) + '</strong></span>';
    $('progress').textContent = 'Soal selesai: ' + answered + '/' + SOAL.length;
  }

  function renderBoard() {
    var board = $('board');
    board.innerHTML = '';
    state.order.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tile';
      b.style.setProperty('--h', HUES[(i + Math.floor(i / 10)) % HUES.length]);
      var d = state.done[i];
      if (d) {
        b.classList.add('done');
        b.disabled = true;
        if (d.w >= 0) {
          b.style.setProperty('--tc', COLORS[d.w]);
          b.innerHTML = '<span class="tile-emoji">' + EMOJI[d.w] + '</span><span>' + (i + 1) + '</span>';
        } else {
          b.classList.add('nobody');
          b.innerHTML = '<span class="tile-emoji">✖</span><span>' + (i + 1) + '</span>';
        }
      } else {
        b.textContent = i + 1;
        b.addEventListener('click', function () { openQuestion(i); });
      }
      board.appendChild(b);
    });
  }

  function renderScoreboard() {
    var sb = $('scoreboard');
    sb.innerHTML = '';
    state.teams.forEach(function (t, i) {
      var card = document.createElement('div');
      card.className = 'team' + (i === state.turn ? ' active' : '');
      card.style.setProperty('--c', COLORS[i]);
      card.innerHTML =
        '<button type="button" class="team-main" data-turn="' + i + '" title="Jadikan giliran kelompok ini">' +
          '<span class="team-emoji">' + EMOJI[i] + '</span>' +
          '<span class="team-name">' + esc(t.name) + '</span>' +
        '</button>' +
        '<div class="team-score">' +
          '<button type="button" class="adj" data-adj="-1" data-i="' + i + '" title="Kurangi ' + state.points + ' poin">−</button>' +
          '<span class="score">' + t.score + '</span>' +
          '<button type="button" class="adj" data-adj="1" data-i="' + i + '" title="Tambah ' + state.points + ' poin">+</button>' +
        '</div>';
      sb.appendChild(card);
    });
  }

  function onScoreboardClick(e) {
    var turnBtn = e.target.closest('[data-turn]');
    if (turnBtn) {
      state.turn = parseInt(turnBtn.getAttribute('data-turn'), 10);
      save(); renderTurn(); renderScoreboard();
      return;
    }
    var adj = e.target.closest('[data-adj]');
    if (adj) {
      var i = parseInt(adj.getAttribute('data-i'), 10);
      var dir = parseInt(adj.getAttribute('data-adj'), 10);
      state.teams[i].score += dir * state.points;
      save(); renderScoreboard();
    }
  }

  // ======================================================
  //  MODAL SOAL
  //  Alur: jawab -> benar (poin langsung masuk)
  //                -> salah (tampilkan jawaban benar / lempar ke kelompok lain)
  // ======================================================
  var attempt = null; // {tried:[], current, selected, wrong:[], phase:'answering'|'wrong'|'resolved'}

  function currentQ() { return SOAL[state.order[currentTile]]; }
  function teamLabel(i) { return EMOJI[i] + ' ' + state.teams[i].name; }

  function setAttemptChip() {
    var chip = $('qTurn');
    chip.textContent = teamLabel(attempt.current) + (attempt.tried.length > 1 ? ' (lemparan)' : '');
    chip.style.background = COLORS[attempt.current];
  }

  function openQuestion(tile) {
    currentTile = tile;
    attempt = { tried: [state.turn], current: state.turn, selected: null, wrong: [], phase: 'answering' };
    var q = currentQ();

    $('qBadge').textContent = 'Soal ' + (tile + 1);
    setAttemptChip();
    $('qText').textContent = q.q;

    var opts = $('qOptions');
    opts.innerHTML = '';
    q.o.forEach(function (text, k) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'opt';
      d.innerHTML = '<span class="opt-l">' + LETTERS[k] + '</span><span>' + esc(text) + '</span>';
      d.addEventListener('click', function () { selectOption(k); });
      opts.appendChild(d);
    });

    $('bonusCheck').checked = false;
    $('bonusLabel').hidden = state.bonus <= 0;
    $('bonusVal').textContent = state.bonus;

    $('modal').hidden = false;
    $('modalBox').focus();
    showPhase();
    startAttemptTimer();
  }

  function startAttemptTimer() {
    if (state.timer > 0) startTimer(state.timer); else $('timerWrap').hidden = true;
  }

  // Menyesuaikan tampilan sesuai fase: answering / wrong / resolved
  function showPhase() {
    var ph = attempt.phase;
    $('answerControls').hidden = ph !== 'answering';
    $('wrongBox').hidden = ph !== 'wrong';
    $('nextBox').hidden = ph !== 'resolved';
    if (ph !== 'resolved') $('explain').hidden = true;
    if (ph !== 'wrong') $('throwList').hidden = true;
    $('btnLock').disabled = attempt.selected === null;

    Array.prototype.forEach.call($('qOptions').children, function (el, k) {
      var isWrong = attempt.wrong.indexOf(k) >= 0;
      el.disabled = ph !== 'answering' || isWrong;
      el.classList.toggle('selected', ph === 'answering' && attempt.selected === k);
      el.classList.toggle('wrong', isWrong);
    });
  }

  function selectOption(k) {
    if (attempt.phase !== 'answering' || attempt.wrong.indexOf(k) >= 0) return;
    attempt.selected = k;
    showPhase();
  }

  function lockAnswer() {
    if (!attempt || attempt.phase !== 'answering' || attempt.selected === null) return;
    stopTimer();
    if (attempt.selected === currentQ().a) correctAnswer(); else wrongAnswer();
  }

  function giveUp() {
    if (!attempt || attempt.phase !== 'answering') return;
    stopTimer();
    attempt.selected = null;
    wrongAnswer();
  }

  function correctAnswer() {
    var i = attempt.current;
    var add = state.points + ($('bonusCheck').checked && state.bonus > 0 ? state.bonus : 0);
    state.teams[i].score += add;
    state.done[currentTile] = { w: i, pts: add };
    playSound('correct');
    resolveQuestion('✅ Benar! ' + teamLabel(i) + ' mendapat +' + add + ' poin');
  }

  function wrongAnswer() {
    var sel = attempt.selected;
    var who = state.teams[attempt.current].name;
    if (sel !== null) attempt.wrong.push(sel);
    attempt.selected = null;
    attempt.phase = 'wrong';
    playSound('wrong');

    $('wrongMsg').textContent = sel !== null
      ? '❌ Jawaban ' + who + ' (' + LETTERS[sel] + ') kurang tepat'
      : '⏱ ' + who + ' belum bisa menjawab';

    var canThrow = state.teams.length > attempt.tried.length;
    $('btnThrow').hidden = !canThrow;
    showPhase();
  }

  // Tombol "Lempar ke kelompok lain": tampilkan daftar kelompok yang belum mencoba
  function toggleThrowList() {
    if (!attempt || attempt.phase !== 'wrong') return;
    var list = $('throwList');
    if (!list.hidden) { list.hidden = true; return; }
    list.innerHTML = '';
    state.teams.forEach(function (t, i) {
      if (attempt.tried.indexOf(i) >= 0) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'award-btn';
      b.style.setProperty('--c', COLORS[i]);
      b.textContent = teamLabel(i);
      b.addEventListener('click', function () { throwTo(i); });
      list.appendChild(b);
    });
    list.hidden = false;
  }

  function throwTo(i) {
    attempt.current = i;
    attempt.tried.push(i);
    attempt.selected = null;
    attempt.phase = 'answering';
    setAttemptChip();
    showPhase();
    startAttemptTimer();
  }

  // Tampilkan jawaban benar tanpa poin
  function showCorrectAnswer() {
    if (!attempt || attempt.phase !== 'wrong') return;
    state.done[currentTile] = { w: -1, pts: 0 };
    resolveQuestion('Jawaban benar ditampilkan – tidak ada poin');
  }

  function resolveQuestion(message) {
    var q = currentQ();
    attempt.phase = 'resolved';
    state.turn = (state.turn + 1) % state.teams.length;
    save();
    renderGame();

    Array.prototype.forEach.call($('qOptions').children, function (el, k) {
      el.classList.remove('selected');
      el.disabled = true;
      if (k === q.a) { el.classList.remove('wrong'); el.classList.add('correct'); }
      else if (!el.classList.contains('wrong')) el.classList.add('dim');
    });
    $('explain').innerHTML = '<strong>' + esc(message) + '</strong><br>' +
      'Jawaban: <strong>' + LETTERS[q.a] + '</strong> — ' + esc(q.p);
    showPhase();
    $('explain').hidden = false;
    $('nextBox').hidden = false;
    $('nextBox').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function nextQuestion() {
    closeModalUI();
    if (state.done.every(Boolean)) setTimeout(finishGame, 400);
  }

  function closeModalUI() {
    stopTimer();
    $('modal').hidden = true;
    currentTile = null;
    attempt = null;
  }

  function requestClose() {
    if ($('modal').hidden || !attempt) return;
    if (attempt.phase === 'resolved') { nextQuestion(); return; }
    var touched = attempt.phase === 'wrong' || attempt.wrong.length > 0 || attempt.tried.length > 1;
    if (!touched) { closeModalUI(); return; }  // belum dijawab -> kotak tetap bisa dipilih lagi
    if (confirm('Soal ini sudah dijawab salah. Tutup dan tandai terpakai tanpa poin?')) {
      state.done[currentTile] = { w: -1, pts: 0 };
      state.turn = (state.turn + 1) % state.teams.length;
      save();
      closeModalUI();
      renderGame();
      if (state.done.every(Boolean)) setTimeout(finishGame, 400);
    }
  }

  // ---------- Timer ----------
  function startTimer(sec) {
    stopTimer();
    var total = sec * 1000, t0 = Date.now();
    var wrap = $('timerWrap');
    wrap.hidden = false;
    wrap.classList.remove('warn', 'over');
    updateTimer(total, total);
    timerId = setInterval(function () {
      var left = Math.max(0, total - (Date.now() - t0));
      updateTimer(left, total);
      if (left <= 0) {
        stopTimer();
        wrap.classList.add('over');
        $('timerText').textContent = 'Waktu habis!';
        playSound('timeup');
      }
    }, 100);
  }
  function updateTimer(left, total) {
    $('timerBar').style.width = (left / total * 100) + '%';
    $('timerText').textContent = Math.ceil(left / 1000) + ' detik';
    $('timerWrap').classList.toggle('warn', left / total <= 0.25 && left > 0);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  // ======================================================
  //  HASIL AKHIR
  // ======================================================
  function finishGame() {
    closeModalUI();
    var list = state.teams.map(function (t, i) { return { name: t.name, score: t.score, i: i }; });
    list.sort(function (a, b) { return b.score - a.score; });
    var rank = 0, prev = null;
    list.forEach(function (t, idx) {
      if (t.score !== prev) { rank = idx + 1; prev = t.score; }
      t.rank = rank;
    });

    var winners = list.filter(function (t) { return t.rank === 1; });
    if (list.length === 1) {
      $('resultTitle').textContent = '🎉 Permainan Selesai!';
      $('resultSub').textContent = 'Skor akhir ' + list[0].name + ': ' + list[0].score + ' poin';
    } else {
      $('resultTitle').textContent = winners.length > 1 ? '🏆 Juara Bersama!' : '🏆 Juara!';
      $('resultSub').textContent = winners.map(function (w) { return w.name; }).join(' & ') +
        ' dengan ' + winners[0].score + ' poin';
    }

    var medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
    var ol = $('rankList');
    ol.innerHTML = '';
    list.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'rank-item' + (t.rank === 1 ? ' first' : '');
      li.style.setProperty('--c', COLORS[t.i]);
      li.innerHTML =
        '<span class="rank-medal">' + (medals[t.rank] || t.rank + '.') + '</span>' +
        '<span class="rank-name">' + EMOJI[t.i] + ' ' + esc(t.name) + '</span>' +
        '<span class="rank-score">' + t.score + '</span>';
      ol.appendChild(li);
    });

    clearSave();
    showScreen('result');
    confetti();
    playSound('finish');
  }

  function confetti() {
    for (var i = 0; i < 90; i++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      c.style.animationDelay = (Math.random() * 1.2) + 's';
      document.body.appendChild(c);
      (function (el) { setTimeout(function () { el.remove(); }, 7000); })(c);
    }
  }

  // ======================================================
  //  INISIALISASI
  // ======================================================
  function init() {
    buildCountButtons();
    buildNameInputs();
    updateResumeButton();

    $('btnStart').addEventListener('click', startGame);
    $('btnResume').addEventListener('click', function () {
      var s = load();
      if (!s) { updateResumeButton(); return; }
      state = s;
      showScreen('game');
      renderGame();
    });

    $('scoreboard').addEventListener('click', onScoreboardClick);

    $('btnLock').addEventListener('click', lockAnswer);
    $('btnGiveUp').addEventListener('click', giveUp);
    $('btnShowAnswer').addEventListener('click', showCorrectAnswer);
    $('btnThrow').addEventListener('click', toggleThrowList);
    $('btnNext').addEventListener('click', nextQuestion);
    $('btnClose').addEventListener('click', requestClose);

    $('btnFinish').addEventListener('click', function () {
      if (confirm('Akhiri permainan sekarang dan tampilkan hasil akhir?')) finishGame();
    });
    $('btnMenu').addEventListener('click', function () {
      if (confirm('Kembali ke menu? Permainan tetap tersimpan dan bisa dilanjutkan.')) {
        updateResumeButton();
        showScreen('setup');
      }
    });
    $('btnAgain').addEventListener('click', function () {
      updateResumeButton();
      showScreen('setup');
    });

    document.addEventListener('keydown', function (e) {
      if ($('modal').hidden || !attempt) return;
      var t = e.target;
      var isOpt = t.classList && t.classList.contains('opt');
      var otherControl = (t.tagName === 'BUTTON' && !isOpt) || t.tagName === 'INPUT';
      if (e.key === 'Escape') { requestClose(); return; }
      if (attempt.phase === 'answering') {
        var k = LETTERS.indexOf(e.key.toUpperCase());
        if (e.key.length === 1 && k >= 0) selectOption(k);
        else if (e.key === 'Enter' && !otherControl) { e.preventDefault(); lockAnswer(); }
      } else if (attempt.phase === 'resolved' && e.key === 'Enter' && !otherControl) {
        e.preventDefault(); nextQuestion();
      }
    });
  }

  init();
})();
