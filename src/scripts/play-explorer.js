// «مستكشف الأحساء الصغير» — محرّك لعبة الذاكرة (منقول من الملف الأصلي المعتمد مع مواءمته للموقع):
// ثلاثة مستويات (3 و4 و6 أزواج)، معاينة قبل البدء ثم خلط وقلب، تلميح واحد لكل جولة، عدّاد محاولات ووقت،
// أختام جواز تُجمع بالمطابقة، ونافذة اكتشاف لكل مكان. الصوت مولَّد بـWebAudio ومغلق افتراضياً.
// الحفظ في localStorage بمفتاح واحد وقيم مُتحقَّق منها فقط. النصوص والأماكن من حمولة JSON (data-explorer-data).
// المستمعات العامة والمؤقّتات تُلغى عند مغادرة الصفحة (astro:before-swap) لأن الموقع يتنقّل بلا إعادة تحميل.

const STORAGE = 'visit-alahsa-little-explorer-v1';
const LEVEL_IDS = [1, 2, 3];

/** أول قيمة شرطها صحيح، وإلا البديل — بدل الشروط الثلاثية المتداخلة. */
const pick = (pairs, fallback) => (pairs.find(([cond]) => cond) || [false, fallback])[1];
import { randInt, sitePath } from './play-shared.js';
const two = (n) => String(n).padStart(2, '0');
const format = (s) => `${two(Math.floor(s / 60))}:${two(s % 60)}`;
const isCount = (n) => Number.isFinite(n) && n >= 0 && Number.isInteger(n);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** عنصر بصنف ونص اختياريين. */
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function img(src, cls) {
  const i = el('img', cls);
  i.src = sitePath(src); i.alt = ''; i.draggable = false; i.decoding = 'async';
  return i;
}

function initExplorer() {
  const root = document.querySelector('[data-explorer]');
  const raw = document.querySelector('[data-explorer-data]');
  if (!root || !raw || root.dataset.wired) return;
  root.dataset.wired = '1';
  const { R, places, levels, oasis } = JSON.parse(raw.textContent || '{}');
  const PLACE_IDS = places.map((p) => p.id);
  const byId = (id) => places.find((p) => p.id === id);
  const $ = (id) => document.getElementById('ex-' + id);
  const ac = new AbortController();
  const on = { signal: ac.signal };

  const state = {
    level: 1, started: false, locked: false, deck: [], open: [], matched: new Set(),
    collected: new Set(), completed: new Set(), best: {}, moves: 0, seconds: 0,
    hintUsed: false, sound: false, preview: false, modalMatched: false, storage: true,
  };
  let pending = [], ticker = 0, round = 0, audio = null;
  const later = (fn, ms) => { pending.push(setTimeout(fn, ms)); };

  // القراءة: كل قيمة تمرّ بالمجموعة المغلقة أو بفحص الأعداد قبل قبولها.
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE) || '{}') || {};
    state.collected = new Set((Array.isArray(v.collected) ? v.collected : []).filter((x) => PLACE_IDS.includes(x)));
    state.completed = new Set((Array.isArray(v.completed) ? v.completed : []).filter((x) => LEVEL_IDS.includes(x)));
    for (const lv of LEVEL_IDS) {
      const b = v.best && typeof v.best === 'object' ? v.best[lv] : null;
      if (b && isCount(b.moves) && isCount(b.seconds)) state.best[lv] = { moves: b.moves, seconds: b.seconds };
    }
    state.sound = v.sound === true;
  } catch { state.storage = false; }

  // الكتابة: معرّفات من المجموعة المغلقة وأعداد ومنطقية فقط.
  function save() {
    const best = {};
    for (const lv of LEVEL_IDS) {
      const b = state.best[lv];
      if (b && isCount(b.moves) && isCount(b.seconds)) best[lv] = { moves: b.moves, seconds: b.seconds };
    }
    const data = {
      collected: PLACE_IDS.filter((id) => state.collected.has(id)),
      completed: LEVEL_IDS.filter((lv) => state.completed.has(lv)),
      best,
      sound: state.sound === true,
    };
    try { localStorage.setItem(STORAGE, JSON.stringify(data)); } catch { state.storage = false; }
    $('saveNote').textContent = state.storage ? R.saveNote : R.sessionOnly;
  }

  function sound() {
    if (!state.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audio = audio || new Ctx();
      if (audio.state === 'suspended') audio.resume();
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = 'sine'; o.frequency.value = 620;
      o.connect(g); g.connect(audio.destination);
      g.gain.setValueAtTime(0.07, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.12);
      o.start(); o.stop(audio.currentTime + 0.13);
    } catch { /* الصوت اختياري */ }
  }

  const pairs = () => levels[state.level - 1];

  function cardNode(p, i) {
    const b = el('button', 'card');
    b.type = 'button';
    b.dataset.index = String(i);
    b.disabled = true;
    const inner = el('span', 'card-inner');
    const back = el('span', 'face back');
    back.setAttribute('aria-hidden', 'true');
    const brand = el('span', 'brand');
    const wa = el('span', 'wm-ar', R.wmAr); wa.lang = 'ar';
    const we = el('span', 'wm-en', R.wmEn); we.lang = 'en';
    brand.append(wa, we);
    back.append(img(oasis, 'back-photo'), el('span', 'back-ring'), brand, el('small', '', R.cardBackHint));
    const front = el('span', 'face front');
    front.setAttribute('aria-hidden', 'true');
    const frame = el('span', 'photo-frame');
    const tag = el('span', 'photo-index', 'AL-AHSA'); tag.lang = 'en';
    frame.append(img(p.small), tag);
    const cap = el('span', 'card-caption');
    cap.append(el('span', 'card-title', p.title), el('span', 'card-kind', p.kind));
    front.append(frame, cap);
    inner.append(back, front);
    // الاسم المقروء نص مخفي بصرياً لا aria-label، فيتغيّر مع حال البطاقة.
    b.append(inner, el('span', 'sr-only'));
    b.addEventListener('click', () => flip(i));
    return b;
  }

  function setup(level = state.level) {
    round++;
    $('startBtn').disabled = false;
    pending.forEach(clearTimeout); pending = [];
    clearInterval(ticker);
    if ($('discovery').open) $('discovery').close();
    state.level = level; state.started = false; state.locked = false; state.open = []; state.matched = new Set();
    state.moves = 0; state.seconds = 0; state.hintUsed = false; state.preview = false;
    const pool = places.slice(0, levels[level - 1]);
    state.deck = [...pool, ...pool];
    const board = $('board');
    board.dataset.level = String(level);
    board.classList.remove('running');
    board.classList.add('ready');
    board.replaceChildren(...state.deck.map((p, i) => cardNode(p, i)));
    $('startCover').hidden = false;
    $('winBar').hidden = true;
    $('status').textContent = '';
    syncCards(); update();
  }

  function syncCards() {
    [...$('board').children].forEach((b, i) => {
      const p = state.deck[i];
      const done = state.matched.has(p.id);
      const shown = !state.started || state.preview || state.open.includes(i) || done;
      b.classList.toggle('flipped', shown);
      b.classList.toggle('matched', done);
      b.disabled = !state.started || done;
      b.setAttribute('aria-pressed', String(shown));
      b.querySelector('.sr-only').textContent = pick([[shown && done, `${p.title} — ${R.matched}`], [shown, p.title]], `${R.hiddenCard} ${i + 1}`);
    });
  }

  function update() {
    const n = pairs();
    $('sectionNo').textContent = `${two(state.level)} / ${two(levels.length)}`;
    $('matches').textContent = `${state.matched.size} / ${n}`;
    $('moves').textContent = String(state.moves);
    $('time').textContent = format(state.seconds);
    $('progressFill').style.width = `${(state.matched.size / n) * 100}%`;
    $('progress').setAttribute('aria-valuemax', String(n));
    $('progress').setAttribute('aria-valuenow', String(state.matched.size));
    $('hintBtn').disabled = !state.started || state.hintUsed || state.locked || state.matched.size === n;
    root.querySelectorAll('.level').forEach((e) => {
      const lv = Number(e.dataset.level);
      e.classList.toggle('active', lv === state.level);
      e.classList.toggle('done', state.completed.has(lv));
      e.setAttribute('aria-pressed', String(lv === state.level));
    });
    $('winNext').textContent = state.level < levels.length ? R.nextLevel : R.restart;
    const b = state.best[state.level];
    $('best').textContent = b ? `${R.bestLabel} ${b.moves} · ${format(b.seconds)}` : '';
  }

  function peek(ms) {
    state.locked = true; state.preview = true;
    $('status').textContent = R.memorize;
    syncCards(); update();
    later(() => {
      state.preview = false; state.locked = false;
      syncCards(); update();
      $('status').textContent = R.findPair;
    }, ms);
  }

  async function start() {
    if (state.started) return;
    const ownRound = round;
    $('startBtn').disabled = true;
    state.deck = shuffle(state.deck);
    $('board').replaceChildren(...state.deck.map((p, i) => cardNode(p, i)));
    await Promise.all([...$('board').querySelectorAll('img')].map((im) => im.decode().catch(() => {})));
    if (ownRound !== round) return;
    state.started = true;
    $('startBtn').disabled = false;
    $('startCover').hidden = true;
    $('board').classList.add('running');
    $('board').classList.remove('ready');
    syncCards();
    if (state.level < levels.length) peek(state.level === 1 ? 3000 : 2000);
    else { $('status').textContent = R.findPair; update(); }
    $('board').firstElementChild?.focus();
    ticker = setInterval(() => {
      if (state.started && !state.preview && !$('discovery').open && !document.hidden && state.matched.size < pairs()) {
        state.seconds++;
        $('time').textContent = format(state.seconds);
      }
    }, 1000);
  }

  function flip(i) {
    const p = state.deck[i];
    if (!state.started || state.locked || state.open.includes(i) || state.matched.has(p.id)) return;
    state.open.push(i);
    syncCards();
    if (state.open.length < 2) return;
    state.moves++;
    state.locked = true;
    const [a, b] = state.open;
    if (state.deck[a].id === state.deck[b].id) {
      state.matched.add(p.id);
      state.collected.add(p.id);
      state.open = [];
      sound();
      if (state.matched.size === pairs()) {
        state.completed.add(state.level);
        clearInterval(ticker);
        const old = state.best[state.level];
        if (!old || state.moves < old.moves || (state.moves === old.moves && state.seconds < old.seconds)) {
          state.best[state.level] = { moves: state.moves, seconds: state.seconds };
        }
        $('winBar').hidden = false;
      }
      save();
      renderCollection();
      syncCards();
      $('status').textContent = R.pairFound;
      update();
      later(() => { state.locked = false; showDiscovery(p, true); update(); }, 430);
    } else {
      $('status').textContent = R.tryAgain;
      update();
      later(() => {
        state.open = []; state.locked = false;
        syncCards(); update();
        $('status').textContent = R.findPair;
      }, 1100);
    }
  }

  function renderCollection() {
    $('collectionCount').textContent = `${state.collected.size} / ${places.length}`;
    $('stamps').replaceChildren(...places.map((p, i) => {
      const b = el('button', 'stamp');
      b.type = 'button';
      if (state.collected.has(p.id)) {
        b.classList.add('unlocked');
        b.append(img(p.small));
        b.setAttribute('aria-label', p.title);
        b.setAttribute('aria-haspopup', 'dialog');
        b.addEventListener('click', () => showDiscovery(p, false));
      } else {
        b.textContent = two(i + 1);
        b.disabled = true;
        b.setAttribute('aria-label', `${R.lockedStamp} ${two(i + 1)}`);
      }
      return b;
    }));
  }

  function fillModal(p) {
    const levelDone = state.modalMatched && state.matched.size === pairs();
    $('modalImage').src = sitePath(p.large);
    $('modalImage').alt = p.title;
    $('modalTitle').textContent = p.title;
    $('modalFact').textContent = p.fact;
    $('sourceLink').href = sitePath(p.href);
    $('modalTag').textContent = pick([[levelDone, R.levelComplete], [state.modalMatched, R.stampAdded]], R.galleryTag);
    $('continueBtn').textContent = state.modalMatched ? R.keepExploring : R.close;
    $('modalNext').hidden = !(levelDone && state.level < levels.length);
  }
  function showDiscovery(p, matched) {
    state.modalMatched = matched;
    fillModal(p);
    $('discovery').showModal();
  }
  function next() {
    setup(state.level < levels.length ? state.level + 1 : 1);
    $('startBtn').focus();
  }

  $('startBtn').addEventListener('click', start);
  $('restartBtn').addEventListener('click', () => setup());
  root.querySelectorAll('.level').forEach((b) => b.addEventListener('click', () => setup(Number(b.dataset.level))));
  $('hintBtn').addEventListener('click', () => {
    if (state.hintUsed || state.locked || !state.started) return;
    state.hintUsed = true;
    state.open = [];
    peek(2000);
  });
  function syncSound() {
    $('soundBtn').setAttribute('aria-pressed', String(state.sound));
    $('soundLabel').textContent = state.sound ? R.soundOn : R.soundOff;
  }
  $('soundBtn').addEventListener('click', () => { state.sound = !state.sound; save(); syncSound(); sound(); });
  $('continueBtn').addEventListener('click', () => $('discovery').close());
  $('closeDialog').addEventListener('click', () => $('discovery').close());
  $('modalNext').addEventListener('click', next);
  $('winNext').addEventListener('click', next);
  $('discovery').addEventListener('click', (e) => {
    if (e.target !== $('discovery')) return;
    const r = $('discovery').getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('discovery').close();
  });
  root.querySelectorAll('.gallery-card').forEach((b) => b.addEventListener('click', () => {
    const p = byId(b.dataset.place);
    if (p) showDiscovery(p, false);
  }));

  // المغادرة: أوقف المؤقّتات وأغلق الصوت وألغِ المستمعات العامة.
  document.addEventListener('astro:before-swap', () => {
    pending.forEach(clearTimeout); pending = [];
    clearInterval(ticker);
    try { audio?.close(); } catch { /* لا شيء */ }
    ac.abort();
  }, { once: true, ...on });

  $('saveNote').textContent = state.storage ? R.saveNote : R.sessionOnly;
  syncSound();
  renderCollection();
  setup(1);
}

initExplorer();
document.addEventListener('astro:page-load', initExplorer);
