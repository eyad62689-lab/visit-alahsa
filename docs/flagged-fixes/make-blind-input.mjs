// يولّد مدخل القارئ الأعمى لدفعة flagged-fixes — **مقصوصاً من dist لا من المصدر** (سابقة touch-click): لكل موضع
// صفحته المبنية — متن 7st كاملاً، وللسلاسل القصيرة السطور المحيطة بها — ثم يُستبدل current بـproposed من
// out/<lg>/<FROM>.json. المفتاح الجديد (current فارغ) يظهر اليوم بالإنجليزية فيُستبدل نصُّها الإنجليزي.
//   node docs/flagged-fixes/make-blind-input.mjs <dist-root> <lg…> [--from 05|07]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
const fromAt = process.argv.indexOf('--from');
const FROM = fromAt > 0 ? process.argv[fromAt + 1] : '05';
// --applied: dist was built after apply.mjs, so it already holds `proposed` everywhere (shared keys too); look for it
const APPLIED = process.argv.includes('--applied');
const LANGS = process.argv.slice(3).filter((x, i, a) => x !== '--from' && x !== '--applied' && a[i - 1] !== '--from');

/* ---- نصُّ الصفحة كما يقرؤه الزائر (ماسحٌ محرفاً محرفاً، كسابقة touch-click) ---- */
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

// the page of each key; the footer key is read on the home page
const PAGE = { '7st-body': 'restaurants-cafes/7st', 'map.lead.a': 'map', 'tmap.lead': 'terrain-map', 'foot.l.visa': '', 'plan.visa': 'plan-your-trip', 'search.escHint': '' };
const LABEL = { 'foot.l.visa': 'the site footer (every page)', 'search.escHint': 'the search dialog footer (every page)' };
const parts = (s) => s.split(/\{\w+\}/);

let fail = 0;
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${FROM}.json`, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${HERE}/../../${lg}-translation/output/flagged-fixes/pack.json`, 'utf8')).positions;
  let body = '';
  for (const k of pack) {
    const p = stage.find((x) => x.id === k.id);
    if (!p || p.current !== k.current) { console.error(`FAIL ${k.id}: stage ${FROM} does not match the pack`); fail++; continue; }
    const key = k.id.slice(lg.length + 1);
    const rel = `${lg}/${PAGE[key] ? PAGE[key] + '/' : ''}index.html`;
    if (!existsSync(`${R}/dist/${rel}`)) { console.error(`FAIL ${k.id}: ${rel} missing`); fail++; continue; }
    const text = visible(readFileSync(`${R}/dist/${rel}`, 'utf8'));
    const shown = APPLIED ? p.proposed : p.current || k.en; // a missing key renders the English today
    if (key === '7st-body') {
      if (!text.includes(shown)) { console.error(`FAIL ${k.id}: current not found in ${rel}`); fail++; continue; }
      body += `\n=================== /${rel.replace(/index\.html$/, '')} ===================\n\n${text.split(shown).join(p.proposed)}\n`;
    } else {
      const L = text.split('\n'), cp = parts(shown), pp = parts(p.proposed);
      const at = L.findIndex((l) => cp.every((c) => l.includes(c)));
      if (at < 0) { console.error(`FAIL ${k.id}: current not found in ${rel}`); fail++; continue; }
      let line = L[at];
      cp.forEach((c, i) => { line = line.replace(c, () => pp[i] ?? ''); });
      const block = [...L.slice(Math.max(0, at - 3), at), line, ...L.slice(at + 1, at + 3)].join('\n');
      body += `\n=================== ${LABEL[key] ?? '/' + rel.replace(/index\.html$/, '')} — the lines around one text ===================\n\n${block}\n`;
    }
    console.log(`  ok ${k.id} in ${rel}`);
  }
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${FROM}.txt`, body, 'utf8');
  console.log(`  -> out/${lg}/06-blind-input.on-${FROM}.txt (${body.length} chars)`);
}
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
