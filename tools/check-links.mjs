// فاحص الروابط الداخلية — يعمل على dist في postbuild (الخطوة 9 من خطة التفاعل العالمي، ف4).
//
// يجمع كل هدف داخلي في المخرج المبني (href وsrc وsrcset وposter وcontent لوسوم og،
// وروابط sitemap.xml وllms.txt) ويتحقق أن ملفه موجود في dist: المسار المنتهي بشرطة
// يقصد index.html في مجلده، والمسار ذو الامتداد ملفاً. رابط صفحةٍ بلا شرطة ختامية
// يُعدّ مكسوراً وإن وُجد مجلده (قاعدة routes.ts: الشرطة الختامية تطابق canonical،
// وبدونها تحويل 301 يُهمِل زوج hreflang). يخرج بـ1 عند أي رابط مكسور فيفشل البناء.
// القاعدة: أرقام لاتينية (0-9).
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://visit-alahsa.com';

async function listFiles(dir, ext) {
  const out = [];
  async function walk(d) {
    let entries;
    try { entries = await readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (ext.some((x) => e.name.endsWith(x))) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

/** يحوّل هدفاً إلى مسار داخلي (بلا استعلام ولا مرساة) أو null إن كان خارجياً/غير قابل للفحص */
const internalPath = (raw, fromRel) => {
  let u = raw.trim().replace(/&amp;/g, '&');
  if (!u || u.startsWith('#') || /^(mailto|tel|javascript|data|blob):/i.test(u)) return null;
  if (u.startsWith(SITE)) u = u.slice(SITE.length) || '/';
  else if (/^[a-z]+:/i.test(u) || u.startsWith('//')) return null;
  if (!u.startsWith('/')) {
    // مسار نسبي: يُحلّ على مجلد الصفحة
    const dir = '/' + fromRel.split(path.sep).slice(0, -1).join('/') + '/';
    u = new URL(u, 'http://x' + dir).pathname;
  }
  u = u.split('#')[0].split('?')[0];
  try { u = decodeURIComponent(u); } catch { /* يبقى كما هو */ }
  return u;
};

const resolves = (p) => {
  if (p === '/') return existsSync(path.join(DIST, 'index.html'));
  // صفحة 404 تبنيها Astro ملفاً مفرداً (404.html) وتشير إلى نفسها بـ/404/ في canonical
  if (p === '/404/' || p === '/404') return existsSync(path.join(DIST, '404.html'));
  const fs = path.join(DIST, p);
  if (p.endsWith('/')) return existsSync(path.join(fs, 'index.html'));
  return existsSync(fs);
};

const attrRe = /\b(?:href|src|poster|content)="([^"]*)"/g;
const srcsetRe = /\bsrcset="([^"]*)"/g;

const broken = new Map(); // target → [from…]
let checked = 0, pages = 0;
const seen = new Set();
const check = (target, from) => {
  const p = internalPath(target, from);
  if (p === null) return;
  const key = p + '|' + from;
  if (seen.has(key)) return;
  seen.add(key);
  checked++;
  const ok = resolves(p);
  // صفحة بلا شرطة ختامية: مجلدها موجود لكن الرابط يمرّ بـ301 — مكسور بقاعدة الموقع
  const dirOnly = !ok && !path.extname(p) && existsSync(path.join(DIST, p, 'index.html'));
  if (!ok) {
    const label = dirOnly ? `${p} (بلا شرطة ختامية)` : p;
    (broken.get(label) ?? broken.set(label, []).get(label)).push(from);
  }
};

for (const fp of await listFiles(DIST, ['.html'])) {
  pages++;
  const rel = path.relative(DIST, fp);
  // السكربتات والأنماط المضمّنة تحمل مقاطع سلاسل (src="' + url + '") لا روابط — تُنزع قبل المسح
  const html = (await readFile(fp, 'utf8')).replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  for (const m of html.matchAll(attrRe)) {
    // content="…" يُفحص فقط حين يكون رابطاً (og:image وأمثاله)
    if (m[0].startsWith('content=') && !/^(https?:)?\//.test(m[1])) continue;
    check(m[1], rel);
  }
  for (const m of html.matchAll(srcsetRe)) for (const part of m[1].split(',')) check(part.trim().split(/\s+/)[0], rel);
}
// sitemap.xml وllms.txt
for (const [file, re] of [['sitemap.xml', /<loc>([^<]+)<\/loc>/g], ['llms.txt', /\((https?:\/\/[^)\s]+)\)/g]]) {
  const fp = path.join(DIST, file);
  if (!existsSync(fp)) { broken.set(`/${file}`, ['(مفقود)']); continue; }
  const txt = await readFile(fp, 'utf8');
  for (const m of txt.matchAll(re)) check(m[1], file);
}

console.log('\n── فاحص الروابط الداخلية (dist) ──────────────────────');
if (pages < 300 || checked < 5000) {
  console.error(`✗ الحارس صار فارغاً: ${pages} صفحة و${checked} هدفاً — المتوقع ≥300 و≥5000.`);
  process.exit(1);
}
if (broken.size) {
  for (const [t, from] of [...broken].slice(0, 30)) console.error(`  ✗ ${t}  ← ${from.slice(0, 3).join(' · ')}${from.length > 3 ? ` (+${from.length - 3})` : ''}`);
  console.error(`✗ ${broken.size} هدفاً مكسوراً في ${pages} صفحة — البناء لا يصلح للنشر.\n`);
  process.exit(1);
}
console.log(`  ✓ ${checked} هدفاً داخلياً في ${pages} صفحة (وsitemap.xml وllms.txt) كلها موجودة، وكل رابط صفحة بشرطة ختامية.\n`);
