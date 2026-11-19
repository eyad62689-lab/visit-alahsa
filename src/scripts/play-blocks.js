import { boardFrom, deal, fits, fitsAnywhere, mulberry32, place, scoreMove } from './play-blocks-engine.js';
import { sitePath } from './play-shared.js';

const storageKey = 'va-oasis-blocks-v1';
const defaults = () => ({ v: 1, journey: { unlocked: 1, levels: {} }, classic: { best: 0 }, sound: true });
const validScore = value => Number.isSafeInteger(value) && value >= 0;

function loadProgress(levels) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.v !== 1 || typeof saved.sound !== 'boolean' || !validScore(saved.classic?.best) ||
        !Number.isInteger(saved.journey?.unlocked) || saved.journey.unlocked < 1 ||
        saved.journey.unlocked > levels.length || !saved.journey.levels ||
        typeof saved.journey.levels !== 'object' || Array.isArray(saved.journey.levels)) return defaults();
    for (const { id } of levels) {
      const record = saved.journey.levels[id];
      if (record !== undefined && (typeof record?.done !== 'boolean' || !validScore(record.best))) return defaults();
    }
    return saved;
  } catch {
    return defaults();
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // The current session remains playable when storage is unavailable.
  }
}

const cues = {
  pick: [330], place: [220], clear: [440, 550], complete: [392, 494, 587], over: [330, 247],
};

function makeAudio() {
  let context;
  return {
    async play(name, lines = 1) {
      try {
        context ??= new AudioContext();
        if (context.state === 'suspended') await context.resume();
        if (context.state !== 'running') return;
        cues[name].forEach((frequency, i) => {
          const start = context.currentTime + i * 0.075;
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.frequency.value = frequency * (name === 'clear' ? 1 + (lines - 1) * 0.14 : 1);
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.exponentialRampToValueAtTime(0.05, start + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);
          oscillator.connect(gain).connect(context.destination);
          oscillator.start(start);
          oscillator.stop(start + 0.09);
        });
      } catch {
        // Sound is optional on devices without Web Audio.
      }
    },
    close() {
      if (context && context.state !== 'closed') context.close().catch(() => {});
    },
  };
}

function registerOffline(scope, signal) {
  if (!scope || !('serviceWorker' in navigator)) return;
  const sendResources = worker => {
    if (signal.aborted) return;
    const urls = performance.getEntriesByType('resource')
      .map(entry => new URL(entry.name))
      .filter(url => url.origin === location.origin)
      .map(url => url.href);
    worker.postMessage({ type: 'cache-resources', urls });
  };
  navigator.serviceWorker.register('/oasis-blocks-sw.js', { scope })
    .then(() => navigator.serviceWorker.ready)
    .then(({ active }) => {
      if (!active || signal.aborted) return;
      sendResources(active);
      if (document.readyState !== 'complete') {
        window.addEventListener('load', () => sendResources(active), { once: true, signal });
      }
      document.fonts.ready.then(() => sendResources(active)).catch(() => {});
    })
    .catch(() => {});
}

function element(tag, text) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  return node;
}

function shapePreview(piece, slot) {
  const preview = element('span');
  preview.className = 'bk-piece';
  preview.dataset.tint = String((slot + piece.cells.length) % 4);
  const height = Math.max(...piece.cells.map(([y]) => y)) + 1;
  const width = Math.max(...piece.cells.map(([, x]) => x)) + 1;
  for (let y = 0; y < height; y++) {
    const row = element('span');
    row.className = 'bk-piece-row';
    for (let x = 0; x < width; x++) {
      const cell = element('span');
      if (piece.cells.some(([dy, dx]) => dy === y && dx === x)) cell.className = 'bk-brick';
      row.append(cell);
    }
    preview.append(row);
  }
  return preview;
}

function initBlocks() {
  const root = document.querySelector('[data-blocks]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const { C, levels, pieces, classicPool, scope } = JSON.parse(root.querySelector('#bk-payload').textContent);
  const $ = id => root.querySelector('#bk-' + id);
  const controller = new AbortController();
  const { signal } = controller;
  const on = (node, event, handler) => node.addEventListener(event, handler, { signal });
  const audio = makeAudio();
  document.addEventListener('astro:before-swap', () => {
    controller.abort();
    audio.close();
  }, { once: true, signal });

  // Gameplay randomness is not security-sensitive: one non-crypto seed, then the seeded PRNG.
  const random = mulberry32(Math.floor(Math.random() * 4294967296));
  const grid = $('board');
  const trayNode = $('tray');
  const feedback = $('feedback');
  const resultDialog = $('result');
  const dragNode = $('drag');
  const cells = [];
  const slots = [];
  let progress = loadProgress(levels);
  let mode = 'journey';
  let level = levels[progress.journey.unlocked - 1];
  let board, tray, score, streak, lines, ended;
  let selected = -1;
  let anchor = 0;
  let drag;
  let suppressClick = false;

  function sound(name, count) {
    if (progress.sound) audio.play(name, count).catch(() => {});
  }

  for (let y = 0; y < 8; y++) {
    const row = element('div');
    row.setAttribute('role', 'row');
    for (let x = 0; x < 8; x++) {
      const cell = element('div');
      cell.setAttribute('role', 'gridcell');
      cell.dataset.index = String(cells.length);
      cell.tabIndex = -1;
      cells.push(cell);
      row.append(cell);
    }
    grid.append(row);
  }

  for (let slot = 0; slot < 3; slot++) {
    const button = element('button');
    button.type = 'button';
    button.dataset.slot = String(slot);
    slots.push(button);
    trayNode.append(button);
  }

  const best = () => (mode === 'journey' ? progress.journey.levels[level.id]?.best ?? 0 : progress.classic.best);
  function drawStats() {
    $('score').textContent = score;
    $('best').textContent = best();
    $('goal-wrap').hidden = mode === 'classic';
    $('goal').textContent = lines + ' / ' + level.goalLines;
  }

  function passportDetail(item, record) {
    if (item.id > progress.journey.unlocked) return C.locked;
    const detail = C.best + ' ' + (record?.best ?? 0);
    return record?.done ? C.earned + ' · ' + detail : detail;
  }

  function drawPassport() {
    $('passport').hidden = mode === 'classic';
    const unlocked = progress.journey.unlocked;
    const records = progress.journey.levels;
    const count = levels.filter(item => records[item.id]?.done).length;
    $('stamps').textContent = C.stamps + ' ' + count + ' / ' + levels.length;
    const items = levels.map(item => {
      const record = records[item.id];
      const row = element('li');
      const button = element('button');
      button.type = 'button';
      button.dataset.level = String(item.id);
      button.disabled = item.id > unlocked;
      if (item.id === level.id) button.setAttribute('aria-current', 'step');
      button.append(element('b', String(item.id)), element('span', item.name));
      button.append(element('small', passportDetail(item, record)));
      row.append(button);
      return row;
    });
    $('levels').replaceChildren(...items);
  }

  function drawGhost(index = anchor) {
    cells.forEach((cell, i) => {
      delete cell.dataset.ghost;
      cell.tabIndex = i === anchor ? 0 : -1;
    });
    slots.forEach((button, slot) => button.setAttribute('aria-pressed', String(selected === slot)));
    if (selected < 0 || index < 0 || !tray[selected]) return;
    const offsets = pieces[tray[selected]].cells;
    const row = index >> 3;
    const col = index % 8;
    const state = fits(board, offsets, row, col) ? 'fit' : 'invalid';
    for (const [dy, dx] of offsets) {
      if (row + dy < 8 && col + dx < 8) cells[(row + dy) * 8 + col + dx].dataset.ghost = state;
    }
    if (!offsets.some(([dy, dx]) => row + dy < 8 && col + dx < 8)) cells[index].dataset.ghost = state;
  }

  function drawBoard(cleared = []) {
    cells.forEach((cell, i) => {
      cell.classList.toggle('bk-brick', Boolean(board[i]));
      cell.classList.remove('bk-cleared');
      cell.setAttribute('aria-label', C.cell + ' ' + ((i >> 3) + 1) + ', ' + (i % 8 + 1) + ' · ' + (board[i] ? C.filled : C.empty));
    });
    for (const i of cleared) {
      cells[i].classList.add('bk-cleared');
    }
    drawGhost();
  }

  function drawTray() {
    slots.forEach((button, slot) => {
      const piece = pieces[tray[slot]];
      button.disabled = !piece || ended;
      button.replaceChildren();
      button.removeAttribute('aria-label');
      if (!piece) return;
      const preview = shapePreview(piece, slot);
      preview.setAttribute('aria-hidden', 'true');
      button.append(preview, element('small', String(slot + 1)));
      const size = piece.cells.length;
      const label = Array.isArray(C.piece) ? C.piece[size - 1] : C.piece.replace('{size}', size);
      button.setAttribute('aria-label', (slot + 1) + ' · ' + label.replace('{shape}', C.shapes[piece.shape]));
    });
  }

  function refill() {
    tray = deal(board, mode === 'journey' ? level.pool : classicPool, pieces, random);
  }

  function start() {
    board = boardFrom(mode === 'journey' ? level.stones : []);
    score = streak = lines = anchor = 0;
    ended = false;
    selected = -1;
    refill();
    $('journey').setAttribute('aria-pressed', String(mode === 'journey'));
    $('classic').setAttribute('aria-pressed', String(mode === 'classic'));
    $('sound').setAttribute('aria-pressed', String(progress.sound));
    $('title').textContent = mode === 'journey' ? C.level + ' ' + level.id + ' · ' + level.name : C.classic;
    feedback.textContent = '';
    drawStats();
    drawPassport();
    drawBoard();
    drawTray();
  }

  function showResult(complete) {
    const content = $('result-content');
    const next = $('continue');
    ended = true;
    drawTray();
    resultDialog.returnValue = '';
    $('result-title').textContent = complete ? C.complete : C.over;
    content.replaceChildren();
    if (complete) {
      const img = element('img');
      const photo = sitePath(level.photo);
      if (photo) img.src = photo;
      img.alt = '';
      img.width = 800;
      img.height = level.height;
      const link = element('a', C.visit);
      const href = sitePath(level.href);
      if (href) link.href = href;
      content.append(img, element('h3', level.name), element('p', level.summary), link, element('p', '✓ ' + C.earned));
      next.hidden = level.id === levels.length;
      next.textContent = C.next;
      next.value = 'next';
    } else {
      content.append(element('p', C.score + ' ' + score + ' · ' + C.best + ' ' + best()));
      next.hidden = false;
      next.textContent = C.again;
      next.value = 'again';
    }
    resultDialog.showModal();
  }

  function put(index) {
    if (ended || selected < 0 || index < 0) return;
    const piece = pieces[tray[selected]];
    const move = place(board, piece.cells, index >> 3, index % 8);
    if (!move) {
      feedback.textContent = C.invalid;
      return;
    }
    const focusInTray = trayNode.contains(document.activeElement);
    const boardEmpty = move.lines > 0 && move.board.every(cell => !cell);
    const gained = scoreMove(piece.cells.length, move.lines, streak, boardEmpty);
    board = move.board;
    score += gained.points;
    streak = gained.streak;
    lines += move.lines;
    tray[selected] = null;
    selected = -1;
    const complete = mode === 'journey' && lines >= level.goalLines;
    if (mode === 'journey') {
      const previous = progress.journey.levels[level.id];
      progress.journey.levels[level.id] = { done: complete || Boolean(previous?.done), best: Math.max(score, best()) };
      if (complete) progress.journey.unlocked = Math.max(progress.journey.unlocked, Math.min(level.id + 1, levels.length));
    } else {
      progress.classic.best = Math.max(score, best());
    }
    saveProgress(progress);
    if (!tray.some(Boolean) && !complete) refill();

    const message = [];
    if (move.lines > 0) message.push(move.lines === 2 ? C.two : C.cleared + ' ' + move.lines);
    message.push(C.score + ' ' + score);
    if (mode === 'journey') message.push(C.goal + ' ' + lines + ' / ' + level.goalLines);
    if (streak >= 2) message.push(C.streak + ' ' + streak);
    if (boardEmpty) message.push(C.clearedBoard);

    drawStats();
    if (mode === 'journey') {
      $('levels').querySelector('[aria-current] small').textContent = passportDetail(level, progress.journey.levels[level.id]);
    }
    drawBoard(move.cleared);
    drawTray();
    if (focusInTray) cells[anchor].focus();
    if (complete) {
      sound('complete');
      drawPassport();
      showResult(true);
    } else if (!tray.some(id => id && fitsAnywhere(board, pieces[id].cells))) {
      sound('over');
      if (mode === 'journey') {
        start();
        message.push(C.restart);
      } else {
        showResult(false);
      }
    } else {
      sound(move.lines ? 'clear' : 'place', move.lines);
    }
    feedback.textContent = message.join(' · ');
  }

  function select(slot) {
    if (ended || !tray[slot]) return;
    selected = slot;
    sound('pick');
    drawGhost();
  }

  function cellAt(x, y) {
    const rect = grid.getBoundingClientRect();
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return -1;
    return Math.floor((y - rect.top) / rect.height * 8) * 8 + Math.floor((x - rect.left) / rect.width * 8);
  }

  on(trayNode, 'pointerdown', event => {
    const button = event.target.closest('button[data-slot]');
    if (!button || button.disabled || !event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    drag = { pointer: event.pointerId, button, slot: Number(button.dataset.slot), x: event.clientX, y: event.clientY, moving: false };
    button.setPointerCapture(event.pointerId);
  });
  const lift = event => event.pointerType === 'touch' ? grid.clientWidth / 8 : 0;
  on(trayNode, 'pointermove', event => {
    if (!drag || event.pointerId !== drag.pointer) return;
    if (!drag.moving && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return;
    if (!drag.moving) {
      drag.moving = true;
      select(drag.slot);
      dragNode.replaceChildren(shapePreview(pieces[tray[drag.slot]], drag.slot));
      dragNode.hidden = false;
    }
    const y = event.clientY - lift(event);
    dragNode.style.transform = 'translate(' + event.clientX + 'px, ' + y + 'px)';
    drawGhost(cellAt(event.clientX, y));
  });
  function endDrag(event, cancelled) {
    if (!drag || event.pointerId !== drag.pointer) return;
    const { moving, button, pointer } = drag;
    drag = null;
    if (button.hasPointerCapture(pointer)) button.releasePointerCapture(pointer);
    if (!moving) return;
    suppressClick = true;
    dragNode.hidden = true;
    const index = cancelled ? -1 : cellAt(event.clientX, event.clientY - lift(event));
    if (index >= 0) {
      anchor = index;
      put(index);
    }
    selected = -1;
    drawGhost();
  }
  on(trayNode, 'pointerup', event => endDrag(event, false));
  on(trayNode, 'pointercancel', event => endDrag(event, true));
  on(trayNode, 'lostpointercapture', event => endDrag(event, true));
  on(document, 'keydown', event => {
    if (event.key !== 'Escape' || !drag?.moving) return;
    event.preventDefault();
    endDrag({ pointerId: drag.pointer }, true);
  });
  on(trayNode, 'click', event => {
    const slot = event.target.closest('button[data-slot]')?.dataset.slot;
    if (slot === undefined || (suppressClick && event.detail > 0)) return;
    select(Number(slot));
  });
  on(grid, 'animationend', event => event.target.classList.remove('bk-cleared'));
  on(grid, 'click', event => {
    const cell = event.target.closest('[data-index]');
    const index = cell ? Number(cell.dataset.index) : cellAt(event.clientX, event.clientY);
    if (index < 0) return;
    anchor = index;
    drawGhost();
    cells[anchor].focus({ preventScroll: true });
    put(anchor);
  });

  const directions = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] };
  on(root, 'keydown', event => {
    if (ended || event.target.closest('dialog') || event.altKey || event.metaKey || event.ctrlKey) return;
    if (/^[1-3]$/.test(event.key)) {
      event.preventDefault();
      select(Number(event.key) - 1);
      cells[anchor].focus();
    } else if (Object.hasOwn(directions, event.key) && (selected >= 0 || grid.contains(event.target))) {
      event.preventDefault();
      const [dy, dx] = directions[event.key];
      const clamp = n => Math.max(0, Math.min(7, n));
      anchor = clamp((anchor >> 3) + dy) * 8 + clamp(anchor % 8 + dx);
      drawGhost();
      cells[anchor].focus();
    } else if ((event.key === 'Enter' || event.key === ' ') && grid.contains(event.target)) {
      event.preventDefault();
      put(anchor);
    } else if (event.key === 'Escape' && selected >= 0 && !drag?.moving) {
      event.preventDefault();
      const button = slots[selected];
      selected = -1;
      drawGhost();
      button.focus();
    }
  });

  on($('levels'), 'click', event => {
    const id = Number(event.target.closest('[data-level]')?.dataset.level);
    if (!id || id > progress.journey.unlocked) return;
    level = levels[id - 1];
    start();
    cells[anchor].focus();
  });
  for (const item of ['journey', 'classic']) {
    on($(item), 'click', () => {
      if (mode === item && !ended) return;
      mode = item;
      start();
    });
  }
  on($('sound'), 'click', () => {
    progress.sound = !progress.sound;
    $('sound').setAttribute('aria-pressed', String(progress.sound));
    saveProgress(progress);
    sound('pick');
  });
  on($('help'), 'click', () => $('help-dialog').showModal());
  on($('reset'), 'click', () => {
    if (!window.confirm(C.confirm)) return;
    progress = defaults();
    mode = 'journey';
    level = levels[0];
    start();
    saveProgress(progress);
    $('help-dialog').close();
  });
  on(resultDialog, 'close', () => {
    if (resultDialog.returnValue === 'next') {
      level = levels[level.id];
      start();
      cells[anchor].focus();
    } else if (resultDialog.returnValue === 'again') {
      start();
      cells[anchor].focus();
    } else {
      const target = mode === 'journey' ? $('levels').querySelector('[aria-current]') : $('classic');
      target.focus();
    }
  });
  $('interface').hidden = false;
  start();
  registerOffline(sitePath(scope), signal);
}

document.addEventListener('astro:page-load', initBlocks);
