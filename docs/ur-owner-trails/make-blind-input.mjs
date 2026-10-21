// يولّد مدخل القارئ الأعمى لدفعة ur-owner-trails — **مقصوصاً من dist لا من المصدر** (سابقة 7st-touch):
// صفحة المعلم /ur/attractions/duqat-algharash/ كاملة، ومحطتا المسارين (من اسم المحطة إلى المحطة التالية)، وبطاقة
// المعلم في فهرس /ur/souqs-parks-farms/؛ ثم يُستبدل فيها كل `current` بـ`proposed` من out/<FROM>.json.
// لا يمسّ dist ولا المصدر. يُخفق إن لم يجد النصَّ الحالي في موضعه.
//   node docs/ur-owner-trails/make-blind-input.mjs <dist-root> [--from 05|07]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
const fromAt = process.argv.indexOf('--from');
const FROM = fromAt > 0 ? process.argv[fromAt + 1] : '05';

/* ---- نصُّ الصفحة كما يقرؤه الزائر (ماسحٌ محرفاً محرفاً، كسابقة 7st-touch) ---- */
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const RAW = new Set(['script', 'style', 'svg']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4',
  'tr', 'figcaption', 'blockquote', 'details', 'summary', 'dt', 'dd']);
const visible = (html) => {
  let out = '';
  let i = 0;
  const n = html.length;
  while (i < n) {
    const c = html[i];
    if (c !== '<') { out += c; i++; continue; }
    if (html.startsWith('<!--', i)) {
      const e = html.indexOf('-->', i + 4);
      i = e === -1 ? n : e + 3;
      continue;
    }
    let j = i + 1;
    const closing = html[j] === '/';
    if (closing) j++;
    let name = '';
    while (j < n && /[A-Za-z0-9]/.test(html[j])) name += html[j++];
    name = name.toLowerCase();
    let k = j;
    let q = '';
    while (k < n) {
      const d = html[k];
      if (q) { if (d === q) q = ''; }
      else if (d === '"' || d === "'") q = d;
      else if (d === '>') break;
      k++;
    }
    const tagEnd = k < n ? k + 1 : n;
    if (!closing && RAW.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, tagEnd);
      if (close === -1) { i = n; continue; }
      const ce = html.indexOf('>', close);
      i = ce === -1 ? n : ce + 1;
      continue;
    }
    if (!closing && name === 'iframe') out += '\n[embedded map]\n';
    if (!closing && name === 'button') out += '\n[button → ';
    if (closing && name === 'button') out += ']\n';
    if (name === 'br' || (closing && BLOCK.has(name))) out += '\n';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

const stage = JSON.parse(readFileSync(`${HERE}/out/${FROM}.json`, 'utf8')).positions;
const pack = JSON.parse(readFileSync(`${HERE}/../../ur-translation/output/ur-owner-trails/pack.json`, 'utf8')).positions;
let fail = 0;
const pos = (id) => {
  const p = stage.find((x) => x.id === id), k = pack.find((x) => x.id === id);
  if (!p || !k || p.current !== k.current) { console.error(`FAIL ${id}: stage ${FROM} does not match the pack`); fail++; return null; }
  return p;
};
const page = (rel) => {
  const f = `${R}/dist/${rel}`;
  if (!existsSync(f)) { console.error(`FAIL missing ${f}`); fail++; return ''; }
  return visible(readFileSync(f, 'utf8'));
};
const sub = (t, p, where) => {
  const n = t.split(p.current).length - 1;
  if (n < 1) { console.error(`FAIL ${p.id}: current not found in ${where}`); fail++; return t; }
  console.log(`  ok ${p.id} in ${where}: ${n} time(s)`);
  return t.split(p.current).join(p.proposed);
};
// the lines from the line holding `anchor` (a stop name or card title) through the line holding the text, plus 2
const around = (t, anchor, text) => {
  const L = t.split('\n');
  const e = L.findIndex((l) => l.includes(text));
  let a = e;
  while (a >= 0 && !L[a].includes(anchor)) a--;
  if (e < 0 || a < 0 || e - a > 6) return null;
  return L.slice(a, e + 3).join('\n');
};

const S = pos('ur-duqat-summary'), B = pos('ur-duqat-body'), U = pos('ur-trail-uqair-beach'), J = pos('ur-trail-jawatha');
let body = '';
if (S && B) {
  let t = page('ur/attractions/duqat-algharash/index.html');
  t = sub(t, B, 'attraction page');
  if (t.includes(S.current)) t = sub(t, S, 'attraction page');
  body += `\n=================== /ur/attractions/duqat-algharash/ ===================\n\n${t}\n`;
  const list = page('ur/souqs-parks-farms/index.html');
  const name = 'دوغہ الغراش';
  const card = around(list, name, S.current);
  if (!card) { console.error('FAIL ur-duqat-summary: card not found in the souqs index'); fail++; }
  else body += `\n=================== this place's card in /ur/souqs-parks-farms/ ===================\n\n${sub(card, S, 'souqs card')}\n`;
}
for (const [P, rel, anchorKey] of [[U, 'ur/trails/al-uqair-coast/index.html', 'العقیر'], [J, 'ur/trails/qarah-and-jawatha/index.html', 'جواثا']]) {
  if (!P) continue;
  const t = page(rel);
  const blk = around(t, anchorKey, P.current);
  if (!blk) { console.error(`FAIL ${P.id}: stop block not found in ${rel}`); fail++; continue; }
  body += `\n=================== one stop of the trail page /${rel.replace(/index\.html$/, '')} ===================\n\n${sub(blk, P, rel)}\n`;
}
writeFileSync(`${HERE}/out/06-blind-input.on-${FROM}.txt`, body, 'utf8');
console.log(`  -> out/06-blind-input.on-${FROM}.txt (${body.length} chars)`);
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
