// «رحلة الدمج 2048» — محرّك اللعبة (منقول من الملف الأصلي المعتمد مع مواءمته للموقع):
// ست محطات بأهداف 64…2048، وثلاثة مستويات لكل منها تقدّم مستقل، وتراجع برصيد، وأختام لكل محطة.
// اللوحة ltr دائمًا فالأسهم والسحب فيزيائية في العربية أيضًا. النصوص والمحطات من حمولة JSON (data-merge-data).
// التخزين مفتاح واحد بأرقام وقيم منطقية فقط تُتحقق عند القراءة، وسجل التراجع في الذاكرة وحدها.
// المستمعات العامة تُلغى عند مغادرة الصفحة (astro:before-swap) لأن الموقع يتنقّل بلا إعادة تحميل.

const KEY = 'va-play-merge-v1';
const MAX_TILE = 131072;
const HISTORY_MAX = 20;

/** أول قيمة شرطها صحيح، وإلا البديل — بدل الشروط الثلاثية المتداخلة. */
const pick = (pairs, fallback) => (pairs.find(([cond]) => cond) || [false, fallback])[1];
const rnd = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
const fmt = (tpl, vals) => Object.entries(vals).reduce((s, [k, v]) => s.split('{' + k + '}').join(String(v)), tpl);
const isInt = (n, lo, hi) => Number.isInteger(n) && n >= lo && n <= hi;
const isTile = (v) => v === 0 || (isInt(v, 2, MAX_TILE) && (v & (v - 1)) === 0);

function initMerge() {
  const root = document.querySelector('[data-merge]');
  const raw = document.querySelector('[data-merge-data]');
  if (!root || !raw || root.dataset.wired) return;
  root.dataset.wired = '1';
  const { R, stages, rules, levels } = JSON.parse(raw.textContent || '{}');
  const last = stages.length - 1;
  const $ = (id) => document.getElementById('mg-' + id);
  const ac = new AbortController();
  const on = { signal: ac.signal };
  document.addEventListener('astro:before-swap', () => ac.abort(), { once: true });

  const makeRecord = () => ({ unlocked: 0, best: 0, stamps: stages.map(() => false), session: null });
  const validBoard = (b, size) => Array.isArray(b) && b.length === size * size && b.every(isTile);

  /** يقرأ سجل مستوى من التخزين ويُبقي ما يجتاز الفحص فقط. */
  function readRecord(m, level) {
    const rec = makeRecord();
    if (!m || typeof m !== 'object') return rec;
    const rule = rules[level];
    if (isInt(m.unlocked, 0, last)) rec.unlocked = m.unlocked;
    if (Number.isFinite(m.best) && m.best >= 0) rec.best = m.best;
    if (Array.isArray(m.stamps) && m.stamps.length === stages.length && m.stamps.every((x) => typeof x === 'boolean')) rec.stamps = m.stamps.slice();
    const s = m.session;
    if (s && typeof s === 'object' && isInt(s.stage, 0, rec.unlocked) && validBoard(s.board, rule.size)
      && Number.isFinite(s.score) && s.score >= 0 && isInt(s.moves, 0, Number.MAX_SAFE_INTEGER) && isInt(s.undosLeft, 0, rule.undos)) {
      rec.session = { stage: s.stage, board: s.board.slice(), score: s.score, moves: s.moves, undosLeft: s.undosLeft };
    }
    return rec;
  }

  const data = { level: 'normal', records: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') {
      if (levels.includes(saved.level)) data.level = levels.find((l) => l === saved.level);
      for (const l of levels) data.records[l] = readRecord(saved.levels?.[l], l);
    }
  } catch { /* تخزين غير متاح أو تالف: نبدأ من جديد */ }
  for (const l of levels) if (!data.records[l]) data.records[l] = makeRecord();

  const histories = Object.fromEntries(levels.map((l) => [l, []]));
  let undoStack = histories[data.level], spawn = -1, merged = [], confirmAction = null, resultAction = null, photoTiles = true;
  const rule = () => rules[data.level];
  const record = () => data.records[data.level];
  const session = () => record().session;
  const isComplete = (s) => Math.max(...s.board) >= stages[s.stage].target;

  /** يكتب أرقامًا وقيمًا منطقية فقط، ومعرّف المستوى من المجموعة المغلقة. */
  function save() {
    const out = { v: 1, level: levels.includes(data.level) ? data.level : 'normal', levels: {} };
    for (const l of levels) {
      const r = data.records[l], s = r.session;
      out.levels[l] = {
        unlocked: r.unlocked, best: r.best, stamps: r.stamps.map(Boolean),
        session: s ? { stage: s.stage, board: s.board.map(Number), score: s.score, moves: s.moves, undosLeft: s.undosLeft } : null,
      };
    }
    let ok = true;
    try { localStorage.setItem(KEY, JSON.stringify(out)); } catch { ok = false; }
    $('storage').textContent = ok ? R.saved : R.noSave;
  }
  const status = (t) => { $('status').textContent = t; };

  function addTile() {
    const s = session();
    const empty = s.board.map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);
    if (!empty.length) return;
    spawn = empty[Math.floor(rnd() * empty.length)];
    s.board[spawn] = rnd() < rule().four ? 4 : 2;
  }
  function start(stage) {
    record().session = { stage, board: new Array(rule().size ** 2).fill(0), score: 0, moves: 0, undosLeft: rule().undos };
    undoStack.length = 0; merged = [];
    addTile(); addTile(); save(); render(); status(R.start);
  }

  function lineMerge(line) {
    const items = line.filter((v) => v > 0), out = [], hits = [];
    let gained = 0;
    for (let i = 0; i < items.length; i++) {
      if (i + 1 < items.length && items[i] === items[i + 1]) {
        out.push(items[i] * 2); gained += items[i] * 2; hits.push(out.length - 1); i++;
      } else out.push(items[i]);
    }
    while (out.length < line.length) out.push(0);
    return { out, gained, hits };
  }
  function transform(board, size, dir) {
    const out = board.slice(), hits = [];
    let gained = 0;
    const horizontal = dir === 'left' || dir === 'right';
    for (let i = 0; i < size; i++) {
      const idx = [];
      for (let j = 0; j < size; j++) idx.push(horizontal ? i * size + j : j * size + i);
      if (dir === 'right' || dir === 'down') idx.reverse();
      const m = lineMerge(idx.map((k) => board[k]));
      gained += m.gained;
      idx.forEach((k, j) => { out[k] = m.out[j]; });
      m.hits.forEach((j) => hits.push(idx[j]));
    }
    return { board: out, gained, hits, moved: out.some((v, i) => v !== board[i]) };
  }
  function canMove(board = session().board, size = rule().size) {
    return board.some((v, i) => !v || (i % size < size - 1 && board[i + 1] === v) || (i + size < board.length && board[i + size] === v));
  }

  function move(dir) {
    if (root.querySelector('dialog[open]')) return;
    const s = session();
    if (isComplete(s)) return;
    const r = transform(s.board, rule().size, dir);
    if (!r.moved) {
      if (canMove()) status(R.noChange); else showResult(false);
      return;
    }
    undoStack.push({ board: s.board.slice(), score: s.score, moves: s.moves });
    if (undoStack.length > HISTORY_MAX) undoStack.shift();
    s.board = r.board; s.score += r.gained; s.moves++; merged = r.hits;
    addTile();
    const rec = record();
    rec.best = Math.max(rec.best, s.score);
    const done = isComplete(s);
    if (done) { rec.stamps[s.stage] = true; rec.unlocked = Math.max(rec.unlocked, Math.min(last, s.stage + 1)); }
    save(); render();
    if (done) showResult(true);
    else if (!canMove()) showResult(false);
    else status(r.gained ? fmt(R.gained, { n: r.gained }) : R.step);
  }
  function undo() {
    const s = session();
    if (isComplete(s) || !undoStack.length || s.undosLeft <= 0) return;
    const old = undoStack.pop();
    s.board = old.board; s.score = old.score; s.moves = old.moves; s.undosLeft--;
    spawn = -1; merged = [];
    save(); render(); status(R.undone);
  }

  const stamps = () => record().stamps.filter(Boolean).length;
  function buildCell(v, i, size) {
    const c = document.createElement('div');
    c.className = 'cell' + (i === spawn ? ' spawn' : '') + (merged.includes(i) ? ' merge' : '');
    c.dataset.v = String(v);
    c.setAttribute('role', 'img');
    c.setAttribute('aria-label', fmt(R.cell, { r: Math.floor(i / size) + 1, c: (i % size) + 1, v: v || R.empty }));
    if (v) {
      const place = stages[(Math.log2(v) - 1) % stages.length];
      const img = document.createElement('img');
      img.className = 'tile-photo'; img.src = place.thumb; img.alt = ''; img.draggable = false;
      const num = document.createElement('span');
      num.className = 'tile-number'; num.textContent = String(v);
      const label = document.createElement('small');
      label.className = 'tile-name'; label.textContent = place.name;
      c.append(img, num, label);
    } else {
      const mark = document.createElement('span');
      mark.className = 'empty-mark'; mark.setAttribute('aria-hidden', 'true');
      c.append(mark);
    }
    return c;
  }
  function buildStage(p, i, s) {
    const rec = record(), done = rec.stamps[i], locked = i > rec.unlocked;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'stage' + (i === s.stage ? ' active' : '') + (done ? ' done' : '');
    b.disabled = locked;
    if (i === s.stage) b.setAttribute('aria-current', 'step');
    const img = document.createElement('img');
    img.className = 'stage-photo'; img.src = p.thumb; img.alt = ''; img.draggable = false;
    const shade = document.createElement('span'); shade.className = 'stage-shade';
    const num = document.createElement('span');
    num.className = 'num'; num.setAttribute('aria-hidden', 'true');
    num.textContent = done ? '✓' : String(i + 1).padStart(2, '0');
    const text = document.createElement('span'); text.className = 'stage-text';
    const strong = document.createElement('strong'); strong.textContent = p.name;
    const small = document.createElement('small');
    small.textContent = pick([[locked, R.locked], [done, R.done]], '') + fmt(R.goal, { n: p.target });
    text.append(strong, small);
    b.append(img, shade, num, text);
    b.addEventListener('click', () => selectStage(i));
    return b;
  }

  function render() {
    const s = session(), m = rule(), place = stages[s.stage], max = Math.max(...s.board), complete = isComplete(s);
    $('difficulty').value = data.level;
    $('stageLabel').textContent = fmt(R.stageLabel, { n: s.stage + 1 });
    $('stageTitle').textContent = place.name;
    $('score').textContent = String(s.score);
    $('best').textContent = String(record().best);
    $('target').textContent = String(place.target);
    $('highest').textContent = String(max);
    const pct = Math.min(100, Math.round((max / place.target) * 100));
    $('progressFill').style.width = pct + '%';
    $('progress').setAttribute('aria-valuenow', String(pct));
    $('progress').setAttribute('aria-valuetext', fmt(R.progressText, { m: max, t: place.target }));
    const board = $('board');
    board.style.setProperty('--size', String(m.size));
    board.dataset.size = String(m.size);
    board.replaceChildren(...s.board.map((v, i) => buildCell(v, i, m.size)));
    $('moves').textContent = s.moves === 1 ? R.movesOne : fmt(R.moves, { n: s.moves });
    $('undo').textContent = m.undos ? fmt(R.undoN, { n: Math.max(0, s.undosLeft) }) : R.undoNone;
    $('undo').disabled = complete || !undoStack.length || s.undosLeft <= 0;
    $('modeDesc').textContent = R.modeDesc[data.level];
    $('placeImage').src = place.photo;
    $('placeImage').height = place.h;
    $('placeImage').alt = place.name;
    $('placeTitle').textContent = place.name;
    $('placeNote').textContent = place.note;
    $('placeLink').href = place.href;
    $('boardPlace').textContent = place.name;
    $('tip').textContent = place.tip;
    $('journeyProgress').textContent = `${stamps()} / ${stages.length}`;
    $('stampCount').textContent = fmt(R.stampCount, { n: stamps() });
    $('stages').replaceChildren(...stages.map((p, i) => buildStage(p, i, s)));
    $('nextStage').classList.toggle('hidden', !complete);
    $('nextStage').textContent = s.stage === last ? R.nextFinal : R.nextStage;
    for (const b of root.querySelectorAll('[data-dir]')) b.disabled = complete;
  }

  function ask(title, copy, action) {
    $('confirmTitle').textContent = title;
    $('confirmCopy').textContent = copy;
    confirmAction = action;
    $('confirm').showModal();
  }
  function selectStage(i) {
    const s = session();
    if (i === s.stage || i > record().unlocked) return;
    if (s.moves > 0 && !isComplete(s)) ask(R.switchH, R.switchP, () => start(i));
    else start(i);
  }
  function next() {
    if (session().stage < last) start(session().stage + 1);
    else showResult(true);
  }
  function showResult(won) {
    const s = session(), final = s.stage === last, place = stages[s.stage];
    $('resultIcon').textContent = won ? '✦' : '↻';
    $('resultPhoto').src = place.photo;
    $('resultPhoto').height = place.h;
    $('resultPhoto').alt = place.name;
    $('resultTitle').textContent = pick([[!won, R.loseH], [final, R.winFinalH]], R.winH);
    $('resultCopy').textContent = pick([[!won, R.loseP], [final, R.winFinalP]],
      fmt(R.winP, { t: place.target, s: place.name, x: stages[Math.min(last, s.stage + 1)].name }));
    $('resultScore').textContent = String(s.score);
    $('resultMoves').textContent = String(s.moves);
    $('resultPrimary').textContent = pick([[!won, R.retry], [final, R.back]], R.nextBtn);
    resultAction = () => {
      if (!won) start(s.stage);
      else if (!final) next();
    };
    $('resultUndo').classList.toggle('hidden', won || !undoStack.length || s.undosLeft <= 0);
    status(won ? R.winStatus : R.loseStatus);
    if (!$('result').open) $('result').showModal();
  }

  $('photoToggle').addEventListener('click', () => {
    photoTiles = !photoTiles;
    $('board').classList.toggle('numbers-only', !photoTiles);
    $('photoToggle').setAttribute('aria-pressed', String(photoTiles));
  });
  $('helpBtn').addEventListener('click', () => $('help').showModal());
  for (const b of root.querySelectorAll('[data-close]')) {
    const target = { help: 'help', result: 'result', confirm: 'confirm' }[b.dataset.close];
    if (target) b.addEventListener('click', () => $(target).close());
  }
  $('confirmYes').addEventListener('click', () => {
    $('confirm').close();
    const action = confirmAction;
    confirmAction = null;
    if (action) action();
  });
  $('confirm').addEventListener('close', () => { confirmAction = null; });
  $('resultPrimary').addEventListener('click', () => { $('result').close(); if (resultAction) resultAction(); });
  $('resultUndo').addEventListener('click', () => { $('result').close(); undo(); });
  $('restart').addEventListener('click', () => ask(R.restartH, R.restartP, () => start(session().stage)));
  $('undo').addEventListener('click', undo);
  $('nextStage').addEventListener('click', next);

  $('difficulty').addEventListener('change', (e) => {
    const level = levels.find((l) => l === e.target.value);
    if (!level) return;
    data.level = level;
    undoStack = histories[level];
    spawn = -1; merged = [];
    if (!session()) { start(0); return; }
    render();
    status(isComplete(session()) ? R.levelDone : R.levelRestored);
    save();
  });

  let demoValue = 2;
  $('demo').addEventListener('click', () => {
    demoValue = demoValue >= 32 ? 2 : demoValue * 2;
    const span = (v, cls) => { const el = document.createElement('span'); if (cls) el.className = cls; el.textContent = String(v); return el; };
    const op = (t) => { const el = document.createElement('b'); el.textContent = t; return el; };
    $('example').replaceChildren(span(demoValue), op('+'), span(demoValue), op('→'), span(demoValue * 2, 'result'));
    $('demoNote').textContent = fmt(R.demoNote, { a: demoValue, b: demoValue * 2 });
  });

  for (const b of root.querySelectorAll('[data-dir]')) b.addEventListener('click', () => move(b.dataset.dir));
  const KEYS = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
  document.addEventListener('keydown', (e) => {
    if (root.querySelector('dialog[open]') || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || e.target.isContentEditable || e.ctrlKey || e.metaKey || e.altKey) return;
    const dir = KEYS[e.key];
    if (dir) { e.preventDefault(); move(dir); }
  }, on);

  const board = $('board');
  let pointer = null;
  board.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || pointer) return;
    pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
    board.setPointerCapture(e.pointerId);
  });
  board.addEventListener('pointerup', (e) => {
    if (!pointer || pointer.id !== e.pointerId) return;
    const dx = e.clientX - pointer.x, dy = e.clientY - pointer.y;
    pointer = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    const horizontal = Math.abs(dx) > Math.abs(dy);
    move(pick([[horizontal && dx > 0, 'right'], [horizontal, 'left'], [dy > 0, 'down']], 'up'));
  });
  board.addEventListener('pointercancel', () => { pointer = null; });
  board.addEventListener('lostpointercapture', () => { pointer = null; });

  if (session()) {
    render();
    status(isComplete(session()) ? R.welcomeDone : R.welcome);
    save();
  } else start(0);
}

initMerge();
document.addEventListener('astro:page-load', initMerge);
