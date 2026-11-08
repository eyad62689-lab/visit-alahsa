// «ألوان الأحساء» — محرّك التلوين (منقول من الملف الأصلي المعتمد مع مواءمته للموقع):
// ورقة 1000×1415 بثلاث طبقات (لون/خطوط/توقيع) وحبيبات ورق ثابتة، وأدوات خشبي وشمعي وماركر ومائي
// وتعبئة وممحاة وتحريك، وتكبير بإصبعين، وتراجع/إعادة، وحفظ تلقائي في IndexedDB بمعرّف الرسمة،
// وتصدير PNG بإطار الموقع واسم الطفل. النصوص والرسومات من حمولة JSON في الصفحة (data-alwan-data).
// المستمعات العامة تُلغى عند مغادرة الصفحة (astro:before-swap) لأن الموقع يتنقّل بلا إعادة تحميل.

const W = 1000, H = 1415, TOUCH_LIFT = 48;
const DB_NAME = 'alwan-alahsa-site-art-v2';
const PALETTE = ['#c99a4a', '#e66c43', '#ca4150', '#ef92ae', '#9754a1', '#6557b0', '#377bb5', '#58b9d0', '#006e61', '#63a65d', '#a5be64', '#efe8d6', '#976344', '#5a4135', '#15211e'];
const CURSOR_TIPS = { pencil: [23.04, 67.14], crayon: [55.9, 65.44], marker: [23.04, 67.14], water: [21.45, 69.68], fill: [62, 68], eraser: [25.8, 60.7] };
const RADIUS = { pencil: 0.34, crayon: 0.64, marker: 0.5, water: 1.02, eraser: 0.5 };
const SPACING = { pencil: 0.075, crayon: 0.13, marker: 0.15, water: 0.17, eraser: 0.12 };

/** أول قيمة شرطها صحيح، وإلا البديل — بدل الشروط الثلاثية المتداخلة. */
const pick = (pairs, fallback) => (pairs.find(([cond]) => cond) || [false, fallback])[1];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const fill = (tpl, k, v) => tpl.replace('{' + k + '}', v);
const hexRGB = (hex) => [1, 3, 5].map((k) => Number.parseInt(hex.slice(k, k + 2), 16));

function hexToHSV(hex) {
  const [r, g, b] = hexRGB(hex).map((n) => n / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d) {
    h = pick([[max === r, ((g - b) / d) % 6], [max === g, (b - r) / d + 2]], (r - g) / d + 4);
    h = (((h * 60) % 360) + 360) % 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}
function hsvToHex(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const sector = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.min(5, Math.floor(h / 60))];
  return '#' + sector.map((n) => Math.round((n + m) * 255).toString(16).padStart(2, '0')).join('');
}

function initAlwan() {
  const root = document.querySelector('[data-alwan]');
  const raw = document.querySelector('[data-alwan-data]');
  if (!root || !raw || root.dataset.wired) return;
  root.dataset.wired = '1';
  const { lang, R, art, captions } = JSON.parse(raw.textContent || '{}');
  const rtl = lang === 'ar';
  const $ = (id) => document.getElementById('aw-' + id);
  const ac = new AbortController();
  const on = { signal: ac.signal };
  document.addEventListener('astro:before-swap', () => { save(); ac.abort(); observer?.disconnect(); db?.close(); }, { once: true });

  const paint = $('paint'), lines = $('lines'), vp = $('viewport'), sheet = $('sheet');
  const ctx = paint.getContext('2d', { willReadFrequently: true }), lc = lines.getContext('2d', { willReadFrequently: true });
  for (const c of [paint, lines]) { c.width = W; c.height = H; }
  sheet.style.width = W + 'px'; sheet.style.height = H + 'px';
  const cssFont = (name) => getComputedStyle(root).getPropertyValue(name).trim() || 'sans-serif';
  const bodyFont = cssFont('--font-body'), headFont = cssFont('--font-heading'), latinFont = cssFont('--font-latin');

  let current = -1, category = 'heritage', tool = 'pencil', color = PALETTE[0], size = 18, opacity = 0.8;
  let undoStack = [], future = [], scale = 1, fitScale = 1, tx = 0, ty = 0, ready = false, busy = false, dirty = false, saveTimer = 0, db = null, storageOK = false;
  const cache = new Map(), pointers = new Map();
  let stroke = null, gesture = null, toastTimer = 0, observer = null;

  const toast = (t) => { const el = $('toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2800); };
  const status = (t) => { $('status').textContent = t; };

  function openDB() {
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore('paintings');
        req.onsuccess = () => { db = req.result; storageOK = true; resolve(); };
        req.onerror = () => resolve();
      } catch { resolve(); }
    });
  }
  function readSaved(id) {
    return new Promise((resolve) => {
      if (cache.has(id)) { resolve(cache.get(id)); return; }
      if (!db) { resolve(null); return; }
      try {
        const r = db.transaction('paintings').objectStore('paintings').get(id);
        r.onsuccess = () => resolve(r.result instanceof Blob ? r.result : null);
        r.onerror = () => resolve(null);
      } catch { resolve(null); }
    });
  }
  function save() {
    clearTimeout(saveTimer);
    if (current < 0 || !ready || !dirty) return;
    const id = art[current].id;
    dirty = false;
    paint.toBlob((blob) => {
      if (!blob) return;
      cache.set(id, blob);
      if (!db) { status(R.sessionOnly); return; }
      try {
        const t = db.transaction('paintings', 'readwrite');
        t.objectStore('paintings').put(blob, id);
        t.oncomplete = () => { if (art[current]?.id === id) status(R.saved); };
        t.onerror = () => status(R.saveFailed);
      } catch { toast(R.keepByExport); }
    });
  }
  function updateHistory() { $('undo').disabled = !undoStack.length; $('redo').disabled = !future.length; }
  function changed() { dirty = true; status(R.changed); clearTimeout(saveTimer); saveTimer = setTimeout(save, 700); updateHistory(); }
  function snapshot() { undoStack.push(ctx.getImageData(0, 0, W, H)); if (undoStack.length > 12) undoStack.shift(); future = []; updateHistory(); }

  function renderGallery() {
    for (const b of root.querySelectorAll('[data-category]')) {
      const selected = b.dataset.category === category;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-pressed', String(selected));
    }
    $('categoryCaption').textContent = captions[category];
    const cards = art.flatMap((p, i) => {
      if (p.cat !== category) return [];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = i === current ? 'card active' : 'card';
      b.setAttribute('aria-pressed', String(i === current));
      const img = document.createElement('img');
      img.alt = ''; img.draggable = false; img.loading = 'lazy'; img.src = p.thumb; img.width = 240; img.height = 340;
      const name = document.createElement('span');
      name.textContent = p.name;
      b.append(img, name);
      b.addEventListener('click', () => selectPage(i));
      return [b];
    });
    $('gallery').replaceChildren(...cards);
  }
  const loadImage = (src) => new Promise((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = src; });

  async function selectPage(i) {
    if (busy || i === current) return;
    finishStroke(); save();
    busy = true; ready = false;
    try {
      const img = await loadImage(art[i].img);
      const blob = await Promise.race([readSaved(art[i].id), new Promise((resolve) => setTimeout(() => resolve(null), 1000))]);
      ctx.clearRect(0, 0, W, H); lc.clearRect(0, 0, W, H); lc.fillStyle = '#fff'; lc.fillRect(0, 0, W, H);
      const f = Math.min(W / img.width, H / img.height);
      lc.drawImage(img, (W - img.width * f) / 2, (H - img.height * f) / 2, img.width * f, img.height * f);
      if (blob) {
        const url = URL.createObjectURL(blob);
        try { ctx.drawImage(await loadImage(url), 0, 0, W, H); } finally { URL.revokeObjectURL(url); }
      }
      current = i; category = art[i].cat; undoStack = []; future = []; dirty = false; ready = true;
      $('pageName').textContent = art[i].name;
      updateSource();
      status(blob ? R.welcomeBack : R.start);
      renderGallery(); updateHistory(); fit();
    } catch { toast(R.openFailed); } finally { busy = false; }
  }

  const transform = () => { sheet.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`; };
  function fit() {
    const r = vp.getBoundingClientRect();
    fitScale = Math.min((r.width - 32) / W, (r.height - 28) / H);
    scale = fitScale; tx = (r.width - W * scale) / 2; ty = (r.height - H * scale) / 2; transform();
  }
  function zoom(f) {
    const r = vp.getBoundingClientRect(), ns = clamp(scale * f, fitScale * 0.7, fitScale * 8);
    tx = r.width / 2 - ((r.width / 2 - tx) * ns) / scale; ty = r.height / 2 - ((r.height / 2 - ty) * ns) / scale; scale = ns; transform();
  }

  // حبيبات ورق ثابتة لكل التمريرات: الصبغة تتجمع على ألياف لا تتغير (مولّد خطّي ثابت البذرة، لا عشوائية).
  const paper = document.createElement('canvas');
  paper.width = W; paper.height = H; paper.id = 'aw-paper'; paper.setAttribute('aria-hidden', 'true');
  sheet.appendChild(paper);
  const pc = paper.getContext('2d'), paperPixels = pc.createImageData(W, H), tooth = new Float32Array(W * H);
  let seed = 47381;
  const noise = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, fiber = 0.5 + 0.5 * Math.sin(x * 1.7 + y * 0.28);
    tooth[i] = 0.78 * noise() + 0.22 * fiber;
    const shade = 250 + Math.floor(tooth[i] * 5), k = i * 4;
    paperPixels.data[k] = shade; paperPixels.data[k + 1] = shade; paperPixels.data[k + 2] = shade - 2; paperPixels.data[k + 3] = 255;
  }
  pc.putImageData(paperPixels, 0, 0);
  const dab = document.createElement('canvas');
  dab.width = dab.height = 192;
  const dc = dab.getContext('2d'), dabPixels = dc.createImageData(192, 192);
  let stampRemainder = 0, cursorTool = '';

  function contactPoint(e) {
    const r = vp.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top - (e.pointerType === 'touch' && tool !== 'pan' ? TOUCH_LIFT : 0) };
  }
  function point(e) {
    const q = contactPoint(e);
    const p = e.pointerType === 'pen' ? clamp(Number.isFinite(e.pressure) ? e.pressure : 0.5, 0.03, 1) : 0.65;
    return { x: (q.x - tx) / scale, y: (q.y - ty) / scale, p };
  }
  const brushRadius = (p) => Math.max(1, size * (RADIUS[tool] || 0.5) * (0.35 + clamp(p.p, 0.03, 1) * 0.9));
  const hideBrushCursor = () => { $('brushCursor').hidden = true; };
  function showBrushCursor(e) {
    if (!ready || busy || tool === 'pan' || pointers.size !== 1 || gesture) { hideBrushCursor(); return; }
    const p = point(e);
    if (p.x < 0 || p.y < 0 || p.x >= W || p.y >= H) { hideBrushCursor(); return; }
    const q = contactPoint(e), tip = CURSOR_TIPS[tool] || [40, 72], artEl = $('cursorArt');
    if (cursorTool !== tool) {
      const icon = root.querySelector(`[data-tool="${tool}"] svg`);
      artEl.replaceChildren(icon ? icon.cloneNode(true) : '');
      artEl.style.left = -tip[0] * 0.8 + 'px'; artEl.style.top = -tip[1] * 0.8 + 'px';
      cursorTool = tool;
    }
    const diameter = tool === 'fill' ? 8 : Math.max(4, brushRadius(p) * 2 * scale);
    $('brushRing').style.width = diameter + 'px'; $('brushRing').style.height = diameter + 'px';
    $('brushCursor').style.transform = `translate(${q.x}px,${q.y}px)`;
    $('brushCursor').hidden = false;
  }

  // تغطية الماركر تُثبَّت مرة لكل خط؛ التداخل داخل الخط الواحد يبقى متجانساً.
  const markerBase = document.createElement('canvas'), markerLayer = document.createElement('canvas');
  markerBase.width = markerLayer.width = W; markerBase.height = markerLayer.height = H;
  const mb = markerBase.getContext('2d'), ml = markerLayer.getContext('2d');
  let markerActive = false, markerBounds = null;
  function beginMaterialStroke() {
    markerActive = tool === 'marker'; markerBounds = null;
    if (markerActive) { mb.clearRect(0, 0, W, H); mb.drawImage(paint, 0, 0); ml.clearRect(0, 0, W, H); }
  }
  function renderMaterialStroke() {
    if (!markerActive || !markerBounds) return;
    const b = markerBounds, x = Math.max(0, Math.floor(b.x)), y = Math.max(0, Math.floor(b.y));
    const w = Math.min(W - x, Math.ceil(b.r) - x), h = Math.min(H - y, Math.ceil(b.b) - y);
    if (w <= 0 || h <= 0) return;
    ctx.save(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(x, y, w, h); ctx.drawImage(markerBase, x, y, w, h, x, y, w, h);
    ctx.globalAlpha = opacity * 0.94; ctx.drawImage(markerLayer, x, y, w, h, x, y, w, h);
    ctx.restore(); markerBounds = null;
  }
  function stampGrain(p, radius, pressure) {
    const wax = tool === 'crayon', left = Math.floor(p.x - radius - 1), top = Math.floor(p.y - radius - 1), extent = Math.min(192, Math.ceil(radius * 2 + 3));
    const rgb = hexRGB(color), data = dabPixels.data;
    data.fill(0);
    for (let y = 0; y < extent; y++) for (let x = 0; x < extent; x++) {
      const px = left + x, py = top + y;
      if (px < 0 || py < 0 || px >= W || py >= H) continue;
      const distance = Math.hypot(px + 0.5 - p.x, py + 0.5 - p.y) / radius;
      if (distance >= 1) continue;
      const grain = tooth[py * W + px], gx = px / 3, gy = py / 3, ix = Math.floor(gx), iy = Math.floor(gy), fx = gx - ix, fy = gy - iy;
      const coarse = (tooth[iy * W + ix] * (1 - fx) + tooth[iy * W + ix + 1] * fx) * (1 - fy) + (tooth[(iy + 1) * W + ix] * (1 - fx) + tooth[(iy + 1) * W + ix + 1] * fx) * fy;
      // حبيبات ورق ناعمة ثابتة للخشبي؛ ترسّبات شمع كبيرة متقطعة للشمعي.
      const surface = wax ? 0.72 * coarse + 0.28 * grain : grain;
      const waxContact = surface > 0.35 ? Math.min(1, (surface - 0.35) * 4.5) : 0.045;
      const contact = wax ? waxContact : clamp((surface - (0.57 - pressure * 0.32)) * 3.3, 0, 1);
      const edge = Math.min(1, (1 - distance) * (wax ? 10 : 4));
      const alpha = opacity * (wax ? 0.68 : 0.22) * (0.55 + pressure * 0.6) * contact * edge;
      const k = (y * 192 + x) * 4;
      data[k] = rgb[0]; data[k + 1] = rgb[1]; data[k + 2] = rgb[2]; data[k + 3] = Math.round(alpha * 255);
    }
    dc.putImageData(dabPixels, 0, 0);
    ctx.drawImage(dab, 0, 0, extent, extent, left, top, extent, extent);
  }
  function stamp(p) {
    const pressure = clamp(p.p, 0.03, 1), radius = brushRadius(p);
    if (tool === 'marker' && markerActive) {
      ml.fillStyle = color; ml.beginPath(); ml.ellipse(p.x, p.y, radius, radius * 0.72, -0.35, 0, Math.PI * 2); ml.fill();
      const b = { x: p.x - radius - 2, y: p.y - radius - 2, r: p.x + radius + 2, b: p.y + radius + 2 };
      markerBounds = markerBounds ? { x: Math.min(markerBounds.x, b.x), y: Math.min(markerBounds.y, b.y), r: Math.max(markerBounds.r, b.r), b: Math.max(markerBounds.b, b.b) } : b;
      return;
    }
    ctx.save();
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.fillStyle = color;
    if (tool === 'eraser' || tool === 'marker') {
      ctx.globalAlpha = tool === 'eraser' ? 1 : opacity * 0.94;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, radius, radius * (tool === 'marker' ? 0.72 : 1), -0.35, 0, Math.PI * 2); ctx.fill();
    } else if (tool === 'water') {
      const rgb = hexRGB(color), rgba = (a) => `rgba(${rgb.join(',')},${a})`, g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      g.addColorStop(0, rgba(0.085)); g.addColorStop(0.45, rgba(0.065)); g.addColorStop(0.78, rgba(0.035)); g.addColorStop(0.94, rgba(0.015)); g.addColorStop(1, rgba(0));
      ctx.globalAlpha = opacity; ctx.fillStyle = g; ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
    } else {
      stampGrain(p, radius, pressure);
    }
    ctx.restore();
  }
  // المسافة غير المستهلكة تُرحَّل بين الأحداث كي لا يُغمِّق تواترُ الأحداث الخط.
  function segment(a, b) {
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    if (!distance) return;
    const spacing = Math.max(0.6, size * (SPACING[tool] || 0.075));
    for (let next = spacing - stampRemainder; next <= distance; next += spacing) {
      const t = next / distance;
      stamp({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, p: a.p + (b.p - a.p) * t });
    }
    stampRemainder = (stampRemainder + distance) % spacing;
  }
  function flood(p) {
    const x = Math.floor(p.x), y = Math.floor(p.y);
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const outline = lc.getImageData(0, 0, W, H).data, d = ctx.getImageData(0, 0, W, H), a = d.data, start = (y * W + x) * 4;
    const base = [a[start], a[start + 1], a[start + 2], a[start + 3]];
    if (outline[start] < 165 && outline[start + 1] < 165 && outline[start + 2] < 165) return;
    const seen = new Uint8Array(W * H), stack = new Int32Array(W * H), rgb = hexRGB(color);
    let top = 0;
    stack[top++] = y * W + x; seen[y * W + x] = 1;
    while (top) {
      const idx = stack[--top], k = idx * 4;
      if (Math.min(outline[k], outline[k + 1], outline[k + 2]) < 165) continue;
      if (Math.abs(a[k] - base[0]) + Math.abs(a[k + 1] - base[1]) + Math.abs(a[k + 2] - base[2]) + Math.abs(a[k + 3] - base[3]) > 100) continue;
      a[k] = rgb[0]; a[k + 1] = rgb[1]; a[k + 2] = rgb[2]; a[k + 3] = Math.round(opacity * 255);
      const px = idx % W;
      for (const n of [px ? idx - 1 : -1, px < W - 1 ? idx + 1 : -1, idx - W, idx + W]) {
        if (n >= 0 && n < W * H && !seen[n]) { seen[n] = 1; stack[top++] = n; }
      }
    }
    ctx.putImageData(d, 0, 0);
  }
  function finishStroke() { renderMaterialStroke(); markerActive = false; hideBrushCursor(); if (stroke?.drawing) changed(); stroke = null; }

  function startGesture() {
    hideBrushCursor(); markerActive = false; markerBounds = null;
    if (stroke?.drawing) { const before = undoStack.pop(); if (before) ctx.putImageData(before, 0, 0); updateHistory(); stroke = null; }
    const [a, b] = [...pointers.values()];
    gesture = { distance: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, scale, tx, ty };
  }
  vp.addEventListener('pointerdown', (e) => {
    if (!ready || busy || e.button > 0) return;
    e.preventDefault();
    try { vp.setPointerCapture(e.pointerId); } catch { /* المؤشر قد يكون أُلغي */ }
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) { startGesture(); return; }
    if (pointers.size > 2) return;
    const p = point(e);
    if (tool === 'pan') { hideBrushCursor(); stroke = { x: e.clientX, y: e.clientY, tx, ty }; return; }
    if (p.x < 0 || p.y < 0 || p.x >= W || p.y >= H) { hideBrushCursor(); return; }
    showBrushCursor(e); snapshot();
    if (tool === 'fill') { flood(p); changed(); return; }
    beginMaterialStroke(); stampRemainder = 0; stroke = { drawing: true, last: p }; stamp(p); renderMaterialStroke();
  });
  vp.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    e.preventDefault();
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gesture && pointers.size >= 2) {
      hideBrushCursor();
      const [a, b] = [...pointers.values()], r = vp.getBoundingClientRect(), cx = (a.x + b.x) / 2 - r.left, cy = (a.y + b.y) / 2 - r.top;
      scale = clamp((gesture.scale * Math.hypot(a.x - b.x, a.y - b.y)) / Math.max(1, gesture.distance), fitScale * 0.7, fitScale * 8);
      tx = cx - ((gesture.x - r.left - gesture.tx) * scale) / gesture.scale; ty = cy - ((gesture.y - r.top - gesture.ty) * scale) / gesture.scale;
      transform(); return;
    }
    if (!stroke) { if (tool === 'fill') showBrushCursor(e); return; }
    if (!stroke.drawing) { tx = stroke.tx + e.clientX - stroke.x; ty = stroke.ty + e.clientY - stroke.y; transform(); return; }
    const coalesced = e.getCoalescedEvents?.() || [];
    for (const ev of coalesced.length ? coalesced : [e]) { const p = point(ev); segment(stroke.last, p); stroke.last = p; }
    renderMaterialStroke(); showBrushCursor(e);
  });
  const up = (e) => { if (!pointers.has(e.pointerId)) return; pointers.delete(e.pointerId); finishStroke(); if (pointers.size < 2) gesture = null; };
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) vp.addEventListener(ev, up);
  vp.addEventListener('pointerleave', (e) => { if (!pointers.has(e.pointerId)) hideBrushCursor(); });
  vp.addEventListener('wheel', (e) => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1); }, { passive: false });

  const toolSizes = { pencil: 18, crayon: 18, marker: 18, water: 18, eraser: 60 };
  function syncToolSettings() {
    const erasing = tool === 'eraser';
    $('eraserSizes').hidden = !erasing;
    $('sizeControl').hidden = tool === 'fill' || tool === 'pan';
    $('opacityControl').hidden = erasing || tool === 'pan';
    $('sizeLabel').textContent = pick([[erasing, R.sizeEraser], [tool === 'water', R.sizeBrush]], R.sizePen);
    $('size').max = erasing ? '160' : '90';
    $('size').value = String(size);
    $('sizeValue').textContent = String(size);
    for (const b of root.querySelectorAll('[data-eraser-size]')) b.setAttribute('aria-pressed', String(Number(b.dataset.eraserSize) === size));
  }
  function setToolSize(value) {
    size = clamp(Number(value) || 3, 3, tool === 'eraser' ? 160 : 90);
    if (tool in toolSizes) toolSizes[tool] = size;
    syncToolSettings();
  }
  for (const b of root.querySelectorAll('[data-eraser-size]')) b.addEventListener('click', () => { if (tool === 'eraser') setToolSize(b.dataset.eraserSize); });
  const toolButtons = [...root.querySelectorAll('[data-tool]')];
  for (const b of toolButtons) b.addEventListener('click', () => {
    finishStroke();
    if (tool in toolSizes) toolSizes[tool] = size;
    tool = b.dataset.tool;
    if (tool in toolSizes) size = toolSizes[tool];
    syncToolSettings();
    $('toolDescription').textContent = R.toolDesc[tool];
    for (const t of toolButtons) { t.classList.toggle('active', t === b); t.setAttribute('aria-pressed', String(t === b)); }
    vp.style.cursor = tool === 'pan' ? 'grab' : 'crosshair';
  });

  function setColor(c) {
    color = c;
    root.style.setProperty('--tool-color', c);
    for (const b of root.querySelectorAll('.swatch')) { const on2 = b.dataset.color === c; b.classList.toggle('active', on2); b.setAttribute('aria-pressed', String(on2)); }
  }
  $('colors').replaceChildren(...PALETTE.map((c, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'swatch'; b.style.background = c; b.dataset.color = c;
    b.setAttribute('aria-label', R.colorNames[i]);
    b.addEventListener('click', () => setColor(c));
    return b;
  }));
  setColor(color);
  $('size').addEventListener('input', (e) => setToolSize(e.target.value));
  $('opacity').addEventListener('input', (e) => { $('opacityValue').textContent = e.target.value + '%'; opacity = e.target.value / 100; });
  for (const b of root.querySelectorAll('[data-category]')) b.addEventListener('click', () => { category = b.dataset.category; renderGallery(); });

  $('undo').addEventListener('click', () => { if (!undoStack.length || !ready) return; future.push(ctx.getImageData(0, 0, W, H)); ctx.putImageData(undoStack.pop(), 0, 0); changed(); });
  $('redo').addEventListener('click', () => { if (!future.length || !ready) return; undoStack.push(ctx.getImageData(0, 0, W, H)); ctx.putImageData(future.pop(), 0, 0); changed(); });
  $('clear').addEventListener('click', () => $('confirm').showModal());
  $('cancelClear').addEventListener('click', () => $('confirm').close());
  $('yesClear').addEventListener('click', () => { if (ready) { snapshot(); ctx.clearRect(0, 0, W, H); changed(); } $('confirm').close(); });
  $('fit').addEventListener('click', fit);
  $('zoomIn').addEventListener('click', () => zoom(1.3));
  $('zoomOut').addEventListener('click', () => zoom(1 / 1.3));

  let artistName = '', exporting = false;
  const signature = $('signature'); signature.width = W; signature.height = H;
  const signatureCtx = signature.getContext('2d');
  const cleanArtistName = (value) => String(value).replace(/\p{Cc}/gu, ' ').replace(/\s+/g, ' ').trim().slice(0, 40);
  function drawArtistName(target, name, offsetX = 0, offsetY = 0) {
    if (!name) return;
    target.save(); target.translate(offsetX, offsetY);
    target.direction = rtl ? 'rtl' : 'ltr'; target.textAlign = rtl ? 'right' : 'left'; target.textBaseline = 'middle';
    const label = R.by + name;
    let fontSize = 31;
    target.font = `${fontSize}px ${bodyFont}`;
    while (target.measureText(label).width > W - 140 && fontSize > 22) { fontSize--; target.font = `${fontSize}px ${bodyFont}`; }
    const width = Math.min(W - 96, target.measureText(label).width + 38), left = rtl ? W - 48 - width : 48, top = H - 104;
    target.fillStyle = '#f7f3eaf2'; target.strokeStyle = '#c99a4a88'; target.lineWidth = 1.5;
    target.beginPath(); target.roundRect(left, top, width, 60, 12); target.fill(); target.stroke();
    target.fillStyle = '#004f46'; target.fillText(label, rtl ? W - 67 : 67, top + 30, width - 38);
    target.restore();
  }
  const renderSignature = () => { signatureCtx.clearRect(0, 0, W, H); drawArtistName(signatureCtx, artistName); };
  $('artistName').addEventListener('input', (e) => { artistName = cleanArtistName(e.target.value); renderSignature(); });
  document.fonts?.ready.then(renderSignature);

  function createBrandedExport(artCanvas, name, pageName) {
    const margin = 40, header = 120, footer = 60, c = document.createElement('canvas');
    c.width = W + margin * 2; c.height = H + header + footer;
    const x = c.getContext('2d'), brandX = rtl ? c.width - margin - 4 : margin + 4, titleX = rtl ? margin : c.width - margin;
    x.fillStyle = '#f7f3ea'; x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = '#006e61'; x.fillRect(0, 0, c.width, 7);
    x.fillStyle = '#fff'; x.fillRect(margin, header, W, H);
    x.drawImage(artCanvas, margin, header);
    drawArtistName(x, name, margin, header);
    x.strokeStyle = '#c99a4a70'; x.lineWidth = 1.5; x.strokeRect(margin - 0.5, header - 0.5, W + 1, H + 1);
    // علامة الموقع النصية ثنائية اللغة كما في ترويسته.
    x.textBaseline = 'alphabetic';
    x.direction = 'rtl'; x.textAlign = rtl ? 'right' : 'left'; x.fillStyle = '#006e61'; x.font = `700 42px ${headFont}`; x.fillText('الأحساء', brandX, 60);
    x.direction = 'ltr'; x.fillStyle = '#8a6224'; x.font = `17px ${latinFont}`; x.fillText('VISIT AL-AHSA', brandX, 89);
    x.direction = rtl ? 'rtl' : 'ltr'; x.textAlign = rtl ? 'left' : 'right';
    x.fillStyle = '#15211e'; x.font = `700 24px ${headFont}`; x.fillText(R.exportTitle, titleX, 48);
    x.font = `18px ${bodyFont}`; x.fillStyle = '#52635d'; x.fillText(pageName, titleX, 79, 550);
    x.strokeStyle = '#c99a4a88'; x.beginPath(); x.moveTo(margin, 105); x.lineTo(c.width - margin, 105); x.stroke();
    x.textAlign = 'center'; x.direction = 'ltr'; x.font = `17px ${latinFont}`; x.fillStyle = '#006e61'; x.fillText('visit-alahsa.com', c.width / 2, c.height - 23);
    return c;
  }
  $('download').addEventListener('click', async () => {
    if (!ready || busy || exporting) return;
    finishStroke(); save();
    exporting = true; $('download').disabled = true;
    const pageName = art[current].name, name = artistName;
    try {
      const flat = document.createElement('canvas');
      flat.width = W; flat.height = H;
      const a = flat.getContext('2d');
      a.fillStyle = '#fff'; a.fillRect(0, 0, W, H); a.drawImage(paint, 0, 0);
      a.globalCompositeOperation = 'multiply'; a.drawImage(lines, 0, 0); a.drawImage(paper, 0, 0);
      if (document.fonts?.ready) await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 2000))]);
      const c = createBrandedExport(flat, name, pageName);
      const blob = await new Promise((resolve) => c.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('export');
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url;
      link.download = `${R.exportTitle} - ${pageName}${name ? ' - ' + name.replace(/[/\\:*?"<>|]/g, '') : ''}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      toast(R.exportReady);
    } catch { toast(R.exportFailed); } finally { exporting = false; $('download').disabled = false; }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.target.closest?.('input')) { e.preventDefault(); $(e.shiftKey ? 'redo' : 'undo').click(); }
  }, on);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { finishStroke(); save(); } }, on);
  window.addEventListener('pagehide', save, on);
  if (typeof ResizeObserver === 'undefined') window.addEventListener('resize', fit, on);
  else { observer = new ResizeObserver(() => { if (!pointers.size) fit(); }); observer.observe(vp); }

  let pickerHSV = { h: 0, s: 1, v: 1 }, pickerPointer = null;
  const colorField = $('colorField'), colorFieldCtx = colorField.getContext('2d');
  function renderColorPicker() {
    const w = colorField.width, h = colorField.height;
    colorFieldCtx.fillStyle = hsvToHex(pickerHSV.h, 1, 1); colorFieldCtx.fillRect(0, 0, w, h);
    let g = colorFieldCtx.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#fff'); g.addColorStop(1, '#ffffff00'); colorFieldCtx.fillStyle = g; colorFieldCtx.fillRect(0, 0, w, h);
    g = colorFieldCtx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#00000000'); g.addColorStop(1, '#000'); colorFieldCtx.fillStyle = g; colorFieldCtx.fillRect(0, 0, w, h);
    const selected = hsvToHex(pickerHSV.h, pickerHSV.s, pickerHSV.v);
    $('colorPoint').style.left = pickerHSV.s * 100 + '%'; $('colorPoint').style.top = (1 - pickerHSV.v) * 100 + '%';
    $('nextColor').style.background = selected;
    $('colorHex').value = selected; $('colorHex').setAttribute('aria-invalid', 'false');
    $('colorHue').value = String(Math.round(pickerHSV.h));
    $('colorError').textContent = ''; $('applyColor').disabled = false;
    colorField.setAttribute('aria-label', fill(R.fieldLabel, 'c', selected));
  }
  function updatePickerPoint(e) {
    const r = colorField.getBoundingClientRect();
    pickerHSV.s = clamp((e.clientX - r.left) / r.width, 0, 1);
    pickerHSV.v = 1 - clamp((e.clientY - r.top) / r.height, 0, 1);
    renderColorPicker();
  }
  $('openColorPicker').addEventListener('click', () => { finishStroke(); pickerHSV = hexToHSV(color); $('previousColor').style.background = color; renderColorPicker(); $('colorPicker').showModal(); });
  $('cancelColor').addEventListener('click', () => $('colorPicker').close());
  $('colorPicker').addEventListener('close', () => { pickerPointer = null; });
  colorField.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || pickerPointer !== null) return;
    e.preventDefault(); pickerPointer = e.pointerId;
    try { colorField.setPointerCapture(e.pointerId); } catch { /* المؤشر قد يكون أُلغي */ }
    updatePickerPoint(e);
  });
  colorField.addEventListener('pointermove', (e) => { if (e.pointerId === pickerPointer) { e.preventDefault(); updatePickerPoint(e); } });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) colorField.addEventListener(ev, (e) => { if (e.pointerId === pickerPointer) pickerPointer = null; });
  const PICKER_KEYS = { ArrowRight: ['s', 1], ArrowLeft: ['s', -1], ArrowUp: ['v', 1], ArrowDown: ['v', -1] };
  colorField.addEventListener('keydown', (e) => {
    const k = PICKER_KEYS[e.key];
    if (!k) return;
    e.preventDefault();
    pickerHSV[k[0]] = clamp(pickerHSV[k[0]] + k[1] * (e.shiftKey ? 0.1 : 0.01), 0, 1);
    renderColorPicker();
  });
  $('colorHue').addEventListener('input', (e) => { pickerHSV.h = Number(e.target.value); renderColorPicker(); });
  $('colorHex').addEventListener('input', (e) => {
    const v = e.target.value.trim();
    if (/^#[0-9a-f]{6}$/i.test(v)) { pickerHSV = hexToHSV(v); renderColorPicker(); return; }
    $('colorHex').setAttribute('aria-invalid', 'true'); $('colorError').textContent = R.hexError; $('applyColor').disabled = true;
  });
  $('applyColor').addEventListener('click', () => { if ($('applyColor').disabled) return; setColor(hsvToHex(pickerHSV.h, pickerHSV.s, pickerHSV.v)); $('colorPicker').close(); });
  syncToolSettings();

  function updateSource() {
    const p = art[current];
    for (const id of ['sourceThumb', 'inlineOriginal', 'sourcePhoto']) $(id).src = p.photo;
    $('inlineOriginal').alt = fill(R.originalAlt, 'n', p.name);
    $('inlineOriginalName').textContent = p.name;
    $('sourcePhoto').alt = fill(R.originalAlt, 'n', p.name);
    $('sourceTitle').textContent = fill(R.originalTitle, 'n', p.name);
    $('sourceLink').href = p.href;
  }
  const openSource = () => { if (ready) { updateSource(); $('sourceDialog').showModal(); } };
  $('showSource').addEventListener('click', openSource);
  $('openInlineOriginal').addEventListener('click', openSource);
  $('closeSource').addEventListener('click', () => $('sourceDialog').close());
  $('sourceDialog').addEventListener('click', (e) => {
    if (e.target !== $('sourceDialog')) return;
    const r = e.target.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) e.target.close();
  });

  (async () => {
    await Promise.race([openDB(), new Promise((resolve) => setTimeout(resolve, 1200))]);
    await selectPage(art.findIndex((p) => p.cat === 'heritage'));
    if (!storageOK) toast(R.noStorage);
  })();
}

initAlwan();
document.addEventListener('astro:page-load', initAlwan);
