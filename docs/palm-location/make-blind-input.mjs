// يولّد مدخل القارئ الأعمى (المرحلة 6) لدفعة palm-location — **مقصوصاً من dist لا من المصدر** (سابقة
// kafu-definition): صفحة /<lg>/events/palm-village/ المبنية كما يراها الزائر (وفيها الخريطة الجديدة)، ثم تُستبدل فيها
// القيمةُ الحالية للمكان بالمقترحة من out/<lg>/05.json (أو ملفٍ آخر يُسمّى بـ--from). وكذلك سطر نتيجة البحث وبطاقة
// الفعالية في قائمة /<lg>/events/. لا يمسّ dist ولا المصدر. يُخفق إن لم يجد النصَّ الحالي في الصفحة.
//   node docs/palm-location/make-blind-input.mjs <dist-root> <lg…> [--from 05|07]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
const fromAt = process.argv.indexOf('--from');
const FROM = fromAt > 0 ? process.argv[fromAt + 1] : '05';
const LANGS = process.argv.slice(3).filter((x, i, a) => x !== '--from' && a[i - 1] !== '--from');

/* ---- نصُّ الصفحة كما يقرؤه الزائر (ماسحٌ محرفاً محرفاً، كسابقة kafu-definition) ---- */
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
    if (name === 'br' || (closing && BLOCK.has(name))) out += '\n';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

let hardFail = 0;
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${FROM}.json`, 'utf8'));
  const page = `${R}/dist/${lg}/events/palm-village/index.html`;
  const list = `${R}/dist/${lg}/events/index.html`;
  if (!existsSync(page) || !existsSync(list)) { console.error(`FAIL ${lg}: page or list missing under ${R}/dist`); hardFail++; continue; }
  const html = readFileSync(page, 'utf8');
  const sub = (t, pos, where) => {
    const n = t.split(pos.current).length - 1;
    if (n < 1) { console.error(`FAIL ${lg}/${pos.id}: current not found in ${where}`); hardFail++; return t; }
    console.log(`  ok ${pos.id} in ${where}: ${n} time(s)`);
    return t.split(pos.current).join(pos.proposed);
  };
  let text = visible(html);
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  let desc = m ? visible(m[1]) : '';
  // the Palm Village card of the events list: the lines from its name to the next blank card boundary
  const lt = visible(readFileSync(list, 'utf8')).split('\n');
  const name = JSON.parse(readFileSync(`${HERE}/../../${lg}-translation/output/palm-location/pack.json`, 'utf8')).positions[0].context.name;
  const at = lt.findIndex((l) => l === name);
  let card = at >= 0 ? lt.slice(at, at + 8).join('\n') : '';
  for (const pos of stage.positions) { text = sub(text, pos, 'page'); desc = sub(desc, pos, 'meta description'); if (card) card = sub(card, pos, 'list card'); }
  const body = `\n=================== /${lg}/events/palm-village/ ===================\n\n${text}\n` +
    `\n=================== search-result line of this page ===================\n\n${desc}\n` +
    (card ? `\n=================== this event's card in the list /${lg}/events/ ===================\n\n${card}\n` : '');
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${FROM}.txt`, body, 'utf8');
  console.log(`  -> out/${lg}/06-blind-input.on-${FROM}.txt (${body.length} chars)`);
}
if (hardFail) { console.error(`FAIL ${hardFail}`); process.exit(1); }
console.log('OK');
