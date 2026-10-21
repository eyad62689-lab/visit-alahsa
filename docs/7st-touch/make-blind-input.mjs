// يولّد مدخل القارئ الأعمى (المرحلة 6) لدفعة 7st-touch — **مقصوصاً من dist لا من المصدر** (سابقة palm-location):
// صفحة /<lg>/restaurants-cafes/7st/ المبنية كاملةً كما يراها الزائر (de · zh · ru)، وفصل الخريطة من الرئيسية /<lg>/
// (من عنوانه إلى عنوان الفصل التالي)، ثم يُستبدل فيهما كل `current` بـ`proposed` من out/<lg>/<FROM>.json.
// لا يمسّ dist ولا المصدر. يُخفق إن لم يجد النصَّ الحالي في موضعه.
//   node docs/7st-touch/make-blind-input.mjs <dist-root> <lg…> [--from 05|07]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
const fromAt = process.argv.indexOf('--from');
const FROM = fromAt > 0 ? process.argv[fromAt + 1] : '05';
const LANGS = process.argv.slice(3).filter((x, i, a) => x !== '--from' && a[i - 1] !== '--from');

/* ---- نصُّ الصفحة كما يقرؤه الزائر (ماسحٌ محرفاً محرفاً، كسابقة palm-location) ---- */
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

let hardFail = 0;
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${FROM}.json`, 'utf8'));
  const pack = JSON.parse(readFileSync(`${HERE}/../../${lg}-translation/output/7st-touch/pack.json`, 'utf8'));
  const sub = (t, pos, where) => {
    const n = t.split(pos.current).length - 1;
    if (n < 1) { console.error(`FAIL ${lg}/${pos.id}: current not found in ${where}`); hardFail++; return t; }
    console.log(`  ok ${pos.id} in ${where}: ${n} time(s)`);
    return t.split(pos.current).join(pos.proposed);
  };
  const byId = (id) => {
    const p = stage.positions.find((x) => x.id === id);
    const k = pack.positions.find((x) => x.id === id);
    if (!p || !k || p.current !== k.current || typeof p.proposed !== 'string') { console.error(`FAIL ${lg}/${id}: stage ${FROM} does not match the pack`); hardFail++; return null; }
    return p;
  };
  let body = '';
  // the café page (de · zh · ru)
  if (lg !== 'ur') {
    const page = `${R}/dist/${lg}/restaurants-cafes/7st/index.html`;
    if (!existsSync(page)) { console.error(`FAIL ${lg}: ${page} missing`); hardFail++; continue; }
    const pos = byId(lg + '-7st-body');
    if (!pos) continue;
    const text = sub(visible(readFileSync(page, 'utf8')), pos, 'café page');
    body += `\n=================== /${lg}/restaurants-cafes/7st/ ===================\n\n${text}\n`;
  }
  // the map chapter of the home page: from its title to the next chapter title
  {
    const page = `${R}/dist/${lg}/index.html`;
    if (!existsSync(page)) { console.error(`FAIL ${lg}: ${page} missing`); hardFail++; continue; }
    const pos = byId(lg + '-home-map-lead');
    if (!pos) continue;
    const k = pack.positions.find((x) => x.id === pos.id);
    const lines = visible(readFileSync(page, 'utf8')).split('\n');
    // the eyebrow span shares the title's line, so the title is matched inside a line, nearest before the lead
    const leadAt = lines.findIndex((l) => l.includes(k.current));
    let a = leadAt;
    while (a >= 0 && !lines[a].includes(k.context.title)) a--;
    if (a < 0 || leadAt < 0 || leadAt - a > 4) { console.error(`FAIL ${lg}: map chapter title/lead not found together`); hardFail++; continue; }
    // the chapter: its eyebrow, title, lead and the next lines of the map block
    const chapter = lines.slice(Math.max(0, a - 1), a + 16).join('\n');
    body += `\n=================== /${lg}/ — the map chapter of the home page ===================\n\n${sub(chapter, pos, 'home map chapter')}\n`;
  }
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${FROM}.txt`, body, 'utf8');
  console.log(`  -> out/${lg}/06-blind-input.on-${FROM}.txt (${body.length} chars)`);
}
if (hardFail) { console.error(`FAIL ${hardFail}`); process.exit(1); }
console.log('OK');
