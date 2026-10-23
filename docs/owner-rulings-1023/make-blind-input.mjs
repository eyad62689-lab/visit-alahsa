// يولّد مدخل القارئ الأعمى لدفعة owner-rulings-1023 — مقصوصاً من dist بعد apply (سابقة flagged-fixes --applied):
// لكل موضع تُبحث صفحاتُ لغته المبنية عن نصّه المقترح في النصّ المرئي، وتُقصّ أعمقُ صفحة تحمله مع السطور المحيطة.
//   node docs/owner-rulings-1023/make-blind-input.mjs <dist-root> <stage: 05|final> <lg…>
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const STAGE = process.argv[3] || '05';
const LANGS = process.argv.slice(4);
const HERE = dirname(fileURLToPath(import.meta.url));
if (!LANGS.length) { console.error('usage: make-blind-input.mjs <root> <05|final> zh de ru ur'); process.exit(2); }

/* ---- نصُّ الصفحة كما يقرؤه الزائر (ماسحٌ محرفاً محرفاً، كسابقة touch-click) ---- */
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const RAW = new Set(['script', 'style', 'svg', 'noscript', 'template']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4', 'tr', 'td', 'th', 'figcaption', 'blockquote', 'details', 'summary', 'dt', 'dd', 'title']);
const visible = (html) => {
  let out = '';
  let i = 0;
  const n = html.length;
  while (i < n) {
    const c = html[i];
    if (c !== '<') { out += c; i++; continue; }
    if (html.startsWith('<!--', i)) { const e = html.indexOf('-->', i + 4); i = e === -1 ? n : e + 3; continue; }
    let j = i + 1;
    const closing = html[j] === '/';
    if (closing) j++;
    let name = '';
    while (j < n && /[A-Za-z0-9]/.test(html[j])) name += html[j++];
    name = name.toLowerCase();
    let k = j, q = '';
    while (k < n) {
      const d = html[k];
      if (q) { if (d === q) q = ''; } else if (d === '"' || d === "'") q = d; else if (d === '>') break;
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
    if (name === 'br' || (closing && BLOCK.has(name)) || (!closing && name === 'td')) out += '\n';
    if (!closing && name === 'td') out += '| ';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};
const pages = (dir, acc = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) pages(p, acc); else if (f === 'index.html') acc.push(p);
  }
  return acc;
};

let fail = 0;
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${STAGE}.json`, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${HERE}/../../${lg}-translation/output/owner-rulings-1023/pack.json`, 'utf8')).positions;
  const cache = new Map();
  const textOf = (p) => { if (!cache.has(p)) cache.set(p, visible(readFileSync(p, 'utf8'))); return cache.get(p); };
  const all = pages(`${R}/dist/${lg}`);
  let body = '', seen = new Set();
  for (const k of pack) {
    const p = stage.find((x) => x.id === k.id);
    if (!p || p.current !== k.current) { console.error(`FAIL ${k.id}: stage ${STAGE} does not match the pack`); fail++; continue; }
    const needle = k.kind === 'ui-new' ? `(${p.proposed})` : p.proposed;
    const lineAt = (f) => textOf(f).split('\n').findIndex((l) => l.includes(needle));
    // عنوان الصفحة ووصفها يُقصّان من صفحتهما (حيث يردان في أول السطور)، وما عداهما من أعمق صفحة تحمله
    const own = k.kind === 'yaml' && /^(title|description)/.test(k.field);
    const hits = all.filter((f) => textOf(f).includes(needle)).sort((a, b) => own ? lineAt(a) - lineAt(b) : b.split(/[\\/]/).length - a.split(/[\\/]/).length);
    if (!hits.length) { console.error(`FAIL ${k.id}: proposed text not found in any built /${lg}/ page`); fail++; continue; }
    const page = hits[0], rel = relative(`${R}/dist`, page).replace(/\\/g, '/').replace(/index\.html$/, '');
    const L = textOf(page).split('\n');
    const at = L.findIndex((l) => l.includes(needle));
    const block = L.slice(Math.max(0, at - 3), at + 4).join('\n');
    const key = `${rel}#${at}`;
    if (seen.has(key)) continue;
    seen.add(key);
    body += `\n=================== /${rel} — the lines around one text ===================\n\n${block}\n`;
    console.log(`  ok ${k.id} in /${rel}`);
  }
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${STAGE}.txt`, body, 'utf8');
  console.log(`  -> out/${lg}/06-blind-input.on-${STAGE}.txt (${body.length} chars)`);
}
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
