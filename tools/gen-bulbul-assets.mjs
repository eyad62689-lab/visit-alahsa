// توليد أصول «بلبل» المستشار (البلبل أبيض الخدين الواقعي) في public/img/brand/ — يعمل محلياً لا في البناء.
//
// المصدر: حزمة إياد «بلبل الأحساء الواقعي» (2026-10-25) — ثلاث صور مولَّدة بلا حقوق طرف ثالث:
//   bulbul-full.png         1254×1254 شفافة: البلبل واقفاً على غصن.
//   bulbul-icon.png         1254×1254 شفافة: الرأس والصدر مقرّبين.
//   bulbul-flight-sheet.png 1536×1024 بخلفية داكنة متدرّجة غير شفافة: ست وضعيات أجنحة في شبكة 3×2
//                           (الخلايا العليا 512×540 والسفلى 512×484).
// الأصول ليست في المستودع (6 ميغابايت). التشغيل:
//   BULBUL_SRC=<مجلد الصور الثلاث> node tools/gen-bulbul-assets.mjs
//
// المخرجات (كلٌّ WebP + PNG احتياطي):
//   bulbul-perch.*   صورة الوقوف بعرض PERCH_W (≤256): قُصّ الغصن والقدمان (يغطيهما العش) — كل بكسل أسفل
//                    خط القصّ CUT_Y يسار حافة الذيل يُمحى، فيبقى الذيل متدلّياً على حافة العش كما يجثم البلبل.
//                    وبكسلات ألفا < 10 تُصفَّر (هوامش ملوّنة شبه شفافة في الأصل).
//   bulbul-fly.*     شريط أفقي بخلايا متساوية ≤192: الوضعيات بعد فصل الخلفية، كلٌّ مُزاحة بحيث تقع العين
//                    في النقطة نفسها من الخلية (مراسي العين EYE أدناه) فلا يقفز الرأس عند تبديل الأجنحة.
//   bulbul-head-64.* قرص رملي (قاعدة التميمة: قرص فاتح على الداكن) عليه الرأس المقرّب — رأس لوحة المحادثة.
//   src/data/bulbul-sprite.json  الهندسة التي يقرؤها Advisor.astro (أبعاد الخلية وموضع العين وعدد الوضعيات).
//
// فصل خلفية الورقة: الخلفية داكنة ناعمة مع توهّج حول كل طائر، والطائر محبَّب الملمس. القناع =
// (الملمس: انحراف معياري محلي > TEX) ∪ (البعد اللوني عن تقدير الخلفية > DIFF)، ثم أكبر مكوّن متصل،
// وملء الثقوب، وفتح مورفولوجي يزيل أطراف التوهّج، وحافة ناعمة مع إزالة تلوّث اللون الداكن عنها.
// تقدير الخلفية: متوسط موزون واسع للبكسلات خارج القناع الأولي الموسَّع.
// وضعية لا تنفصل نظيفاً تُستبعد من POSES (يكفي أربع) — كلها نظيفة في تحقق 2026-10-25.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = process.env.BULBUL_SRC;
if (!SRC) { console.error('BULBUL_SRC غير محدَّد (مجلد bulbul-full.png وbulbul-icon.png وbulbul-flight-sheet.png)'); process.exit(1); }
const OUT = path.join(ROOT, 'public', 'img', 'brand');
const src = (name) => path.join(SRC, name);

// ——— الثوابت ———
const PERCH_W = 136;            // عرض صورة الوقوف (يُعرض بنصفه على شاشات 2x)
const CUT_Y = 800;              // خط القصّ في الأصل 1254: ما دونه من الغصن والقدمين يغطيه العش
const FULL_EYE = [372, 213];    // مركز العين في bulbul-full.png
const FULL_BEAK = [176, 233];   // طرف المنقار في bulbul-full.png
// الخلايا ومراسي العين وأطراف المناقير مقيسة على الورقة الأصلية
const POSES = [
  { sx: 0, sy: 0, sw: 512, sh: 540, eye: [106, 226], beak: [28, 233] },
  { sx: 512, sy: 0, sw: 512, sh: 540, eye: [98, 225], beak: [20, 232] },
  { sx: 1024, sy: 0, sw: 512, sh: 540, eye: [82, 225], beak: [5, 232] },
  { sx: 0, sy: 540, sw: 512, sh: 484, eye: [108, 115], beak: [30, 123] },
  { sx: 512, sy: 540, sw: 512, sh: 484, eye: [97, 115], beak: [20, 123] },
  { sx: 1024, sy: 540, sw: 512, sh: 484, eye: [82, 114], beak: [5, 122] },
];
const TEX = 7, DIFF = 30;
const MAX_CELL_W = 192;

// ——— أدوات مصفوفات ———
function boxBlur(src, w, h, r) {
  // مجموع متكامل ← متوسط نافذة (2r+1)²، الحواف بالقصّ
  const I = new Float64Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) { let row = 0; for (let x = 0; x < w; x++) { row += src[y * w + x]; I[(y + 1) * (w + 1) + x + 1] = I[y * (w + 1) + x + 1] + row; } }
  const out = new Float64Array(w * h);
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - r), y1 = Math.min(h, y + r + 1);
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - r), x1 = Math.min(w, x + r + 1);
      const s = I[y1 * (w + 1) + x1] - I[y0 * (w + 1) + x1] - I[y1 * (w + 1) + x0] + I[y0 * (w + 1) + x0];
      out[y * w + x] = s / ((x1 - x0) * (y1 - y0));
    }
  }
  return out;
}
const dilate = (m, w, h, r) => { const b = boxBlur(Float64Array.from(m), w, h, r); return Uint8Array.from(b, (v) => (v > 0 ? 1 : 0)); };
const erode = (m, w, h, r) => { const b = boxBlur(Float64Array.from(m), w, h, r); return Uint8Array.from(b, (v) => (v > 0.9999 ? 1 : 0)); };

function floodFromBorder(free, w, h) {
  // يعلّم كل بكسل «حرّ» متصل بحافة الخلية
  const seen = new Uint8Array(w * h); const stack = [];
  const push = (i) => { if (free[i] && !seen[i]) { seen[i] = 1; stack.push(i); } };
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop(); const x = i % w, y = (i - x) / w;
    if (x > 0) push(i - 1); if (x < w - 1) push(i + 1); if (y > 0) push(i - w); if (y < h - 1) push(i + w);
  }
  return seen;
}
function largestComponent(m, w, h) {
  const lab = new Int32Array(w * h); let best = 0, bestSize = 0, n = 0;
  for (let s = 0; s < w * h; s++) {
    if (!m[s] || lab[s]) continue;
    n++; let size = 0; const stack = [s]; lab[s] = n;
    while (stack.length) {
      const i = stack.pop(); size++; const x = i % w, y = (i - x) / w;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && m[j] && !lab[j]) { lab[j] = n; stack.push(j); }
    }
    if (size > bestSize) { bestSize = size; best = n; }
  }
  return Uint8Array.from(lab, (l) => (l === best ? 1 : 0));
}

// ——— فصل خلية من الورقة ← RGBA ———
function cutPose(sheet, SW, p) {
  const { sw: w, sh: h } = p; const N = w * h;
  const R = new Float64Array(N), G = new Float64Array(N), B = new Float64Array(N), L = new Float64Array(N);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const k = ((p.sy + y) * SW + p.sx + x) * 3, i = y * w + x;
    R[i] = sheet[k]; G[i] = sheet[k + 1]; B[i] = sheet[k + 2]; L[i] = 0.299 * R[i] + 0.587 * G[i] + 0.114 * B[i];
  }
  const mean = boxBlur(L, w, h, 2), sq = boxBlur(L.map((v) => v * v), w, h, 2);
  let m0 = Uint8Array.from(mean, (v, i) => (Math.sqrt(Math.max(0, sq[i] - v * v)) > TEX ? 1 : 0));
  m0 = erode(dilate(m0, w, h, 4), w, h, 4);
  const filled0 = floodFromBorder(m0.map((v) => 1 - v), w, h);
  m0 = Uint8Array.from(filled0, (v) => 1 - v);
  // تقدير الخلفية من البكسلات البعيدة عن القناع الأولي
  const wgt = Float64Array.from(dilate(m0, w, h, 12), (v) => 1 - v);
  const bw = boxBlur(wgt, w, h, 45);
  const est = (C) => { const b = boxBlur(C.map((v, i) => v * wgt[i]), w, h, 45); return b.map((v, i) => (bw[i] > 1e-3 ? v / bw[i] : 0)); };
  const bR = est(R), bG = est(G), bB = est(B);
  const m1 = Uint8Array.from(R, (r, i) => (Math.max(Math.abs(r - bR[i]), Math.abs(G[i] - bG[i]), Math.abs(B[i] - bB[i])) > DIFF ? 1 : 0));
  let m = Uint8Array.from(m0, (v, i) => v | m1[i]);
  m = dilate(erode(m, w, h, 2), w, h, 2);               // فتح: يزيل نتوءات التوهّج الرفيعة
  m = largestComponent(m, w, h);
  const outside = floodFromBorder(m.map((v) => 1 - v), w, h);
  m = Uint8Array.from(outside, (v) => 1 - v);            // ملء الثقوب
  m = erode(m, w, h, 1);                                 // تقشير بكسل من حافة التوهّج
  const soft = boxBlur(boxBlur(Float64Array.from(m), w, h, 1), w, h, 1);
  const out = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    const a = soft[i]; if (a <= 0.02) continue;
    // إزالة تلوّث الحافة: C = a·F + (1−a)·Bg ⇒ F = (C − (1−a)·Bg)/a
    const un = (c, bg) => Math.max(0, Math.min(255, a >= 0.98 ? c : (c - (1 - a) * bg) / a));
    out[i * 4] = un(R[i], bR[i]); out[i * 4 + 1] = un(G[i], bG[i]); out[i * 4 + 2] = un(B[i], bB[i]); out[i * 4 + 3] = Math.round(a * 255);
  }
  return out;
}

function bbox(rgba, w, h, minA = 10) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (rgba[(y * w + x) * 4 + 3] >= minA) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1 };
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

async function writeBoth(img, name) {
  await img.clone().webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(path.join(OUT, `${name}.webp`));
  await img.clone().png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toFile(path.join(OUT, `${name}.png`));
}

// ——— 1) صورة الوقوف ———
const full = await sharp(src('bulbul-full.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const FW = full.info.width, FH = full.info.height; const fp = Buffer.from(full.data);
const tailEdge = (y) => 830 + Math.max(0, y - 850) * 0.6; // حافة الذيل اليسرى تقريباً
for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
  const i = (y * FW + x) * 4;
  if (fp[i + 3] < 10 || (y > CUT_Y && x < tailEdge(y))) { fp[i] = fp[i + 1] = fp[i + 2] = fp[i + 3] = 0; }
}
const fb = bbox(fp, FW, FH);
const pScale = PERCH_W / (fb.x1 - fb.x0 + 1);
const perchH = Math.round((fb.y1 - fb.y0 + 1) * pScale);
const perch = sharp(fp, { raw: { width: FW, height: FH, channels: 4 } })
  .extract({ left: fb.x0, top: fb.y0, width: fb.x1 - fb.x0 + 1, height: fb.y1 - fb.y0 + 1 })
  .resize(PERCH_W, perchH, { kernel: 'lanczos3' });
await writeBoth(sharp(await perch.png().toBuffer()), 'bulbul-perch');
const perchEye = [(FULL_EYE[0] - fb.x0) * pScale, (FULL_EYE[1] - fb.y0) * pScale];
const perchCut = (CUT_Y - fb.y0) * pScale;

// ——— 2) شريط الطيران ———
const sheet = await sharp(src('bulbul-flight-sheet.png')).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const SW = sheet.info.width;
const fullHead = dist(FULL_EYE, FULL_BEAK);
const cuts = POSES.map((p) => ({ p, rgba: cutPose(sheet.data, SW, p) }));
// مقياس الورقة إلى مقياس الوقوف: طول المنقار→العين متطابق (الرأس بحجم واحد عند التبديل)
const sheetHead = POSES.reduce((s, p) => s + dist(p.eye, p.beak), 0) / POSES.length;
const sScale = pScale * fullHead / sheetHead;
// اتحاد الإطارات حول العين
let L = 0, T = 0, Rr = 0, Bb = 0;
for (const { p, rgba } of cuts) {
  const b = bbox(rgba, p.sw, p.sh);
  L = Math.max(L, p.eye[0] - b.x0); T = Math.max(T, p.eye[1] - b.y0); Rr = Math.max(Rr, b.x1 - p.eye[0]); Bb = Math.max(Bb, b.y1 - p.eye[1]);
}
let cellW = Math.ceil((L + Rr + 2) * sScale), cellH = Math.ceil((T + Bb + 2) * sScale);
const fit = Math.min(1, MAX_CELL_W / cellW);
const cScale = sScale * fit; cellW = Math.ceil((L + Rr + 2) * cScale); cellH = Math.ceil((T + Bb + 2) * cScale);
const eyeCell = [Math.round((L + 1) * cScale), Math.round((T + 1) * cScale)];
const composites = [];
for (let k = 0; k < cuts.length; k++) {
  const { p, rgba } = cuts[k];
  const pw = Math.round(p.sw * cScale), ph = Math.round(p.sh * cScale);
  const small = await sharp(rgba, { raw: { width: p.sw, height: p.sh, channels: 4 } }).resize(pw, ph, { kernel: 'lanczos3' }).png().toBuffer();
  const left = k * cellW + eyeCell[0] - Math.round(p.eye[0] * cScale);
  const top = eyeCell[1] - Math.round(p.eye[1] * cScale);
  // القصّ داخل حدود الخلية (الإطار المحسوب يضمنها، والتقريب قد يزيد بكسلاً)
  const ex = { left: Math.max(0, -(left - k * cellW)), top: Math.max(0, -top) };
  const ew = Math.min(pw - ex.left, cellW - Math.max(0, left - k * cellW));
  const eh = Math.min(ph - ex.top, cellH - Math.max(0, top));
  const piece = await sharp(small).extract({ left: ex.left, top: ex.top, width: ew, height: eh }).png().toBuffer();
  composites.push({ input: piece, left: Math.max(k * cellW, left), top: Math.max(0, top) });
}
const strip = sharp({ create: { width: cellW * cuts.length, height: cellH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(composites);
await writeBoth(sharp(await strip.png().toBuffer()), 'bulbul-fly');

// ——— 3) رأس لوحة المحادثة: قرص رملي عليه الرأس المقرّب ———
const HEAD = 64;
const disc = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${HEAD}" height="${HEAD}"><circle cx="${HEAD / 2}" cy="${HEAD / 2}" r="${HEAD / 2}" fill="#F7F3EA"/></svg>`);
const headCrop = await sharp(src('bulbul-icon.png')).extract({ left: 110, top: 70, width: 1000, height: 1000 }).resize(HEAD, HEAD, { kernel: 'lanczos3' }).png().toBuffer();
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${HEAD}" height="${HEAD}"><circle cx="${HEAD / 2}" cy="${HEAD / 2}" r="${HEAD / 2}" fill="#fff"/></svg>`);
const head = await sharp(disc).composite([{ input: headCrop }, { input: mask, blend: 'dest-in' }]).png().toBuffer();
await writeBoth(sharp(head), 'bulbul-head-64');

// ——— الهندسة ———
const geo = {
  perch: { w: PERCH_W, h: perchH, eye: perchEye.map((v) => Math.round(v * 10) / 10), cut: Math.round(perchCut * 10) / 10 },
  fly: { w: cellW, h: cellH, n: cuts.length, eye: eyeCell },
};
writeFileSync(path.join(ROOT, 'src', 'data', 'bulbul-sprite.json'), JSON.stringify(geo, null, 2) + '\n');
console.log(JSON.stringify(geo));
