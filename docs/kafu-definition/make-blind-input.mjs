// يولّد مدخل القارئ الأعمى (المرحلة 6) لدفعة kafu-definition — **مقصوصاً من dist لا من المصدر**
// (سابقة food-amend): يأخذ صفحة /<lg>/events/kafu-nights/ المنشورة كما يراها الزائر، ثم يستبدل فيها القيمةَ
// الحالية لكل موضع بالمقترحة من out/<lg>/05.json (أو ملفٍ آخر يُسمّى في الوسيط الثالث).
// لا يمسّ dist ولا المصدر. يُخفق إن لم يجد النصَّ الحالي مرةً واحدةً بالضبط.
//   node docs/kafu-definition/make-blind-input.mjs <root> <lg…> [--from 05|07]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
const fromAt = process.argv.indexOf('--from');
const FROM = fromAt > 0 ? process.argv[fromAt + 1] : '05';
const LANGS = process.argv.slice(3).filter((x, i, a) => x !== '--from' && a[i - 1] !== '--from');

/* ---- نصُّ الصفحة كما يقرؤه الزائر ---- */
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
// ماسحٌ محرفاً محرفاً لا تعبيرٌ نمطيّ: التعبيرُ النمطيّ على الوسوم مصفاةٌ ناقصةٌ بطبعها
// (‏`<SCRIPT>` والتعليقاتُ والاقتباسُ داخل السمات) — وCodeQL يسمه `bad-tag-filter` بحقّ.
// والماسحُ يعرف السياق فيصيب، ولا يدّعي تنقيةً أصلاً: مخرجُه نصٌّ خامٌّ يقرؤه إنسان.
const RAW = new Set(['script', 'style', 'svg']);          // محتواها ليس نصّاً معروضاً
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4',
  'tr', 'figcaption', 'blockquote', 'details', 'summary']);
const visible = (html) => {
  let out = '';
  let i = 0;
  const n = html.length;
  while (i < n) {
    const c = html[i];
    if (c !== '<') { out += c; i++; continue; }
    if (html.startsWith('<!--', i)) {                      // تعليق
      const e = html.indexOf('-->', i + 4);
      i = e === -1 ? n : e + 3;
      continue;
    }
    // اسمُ الوسم
    let j = i + 1;
    const closing = html[j] === '/';
    if (closing) j++;
    let name = '';
    while (j < n && /[A-Za-z0-9]/.test(html[j])) name += html[j++];
    name = name.toLowerCase();
    // نهايةُ الوسم، مع احترام الاقتباس داخل السمات
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
    if (!closing && RAW.has(name)) {                       // تخطَّ محتواها إلى وسم إغلاقها
      const close = html.toLowerCase().indexOf(`</${name}`, tagEnd);
      if (close === -1) { i = n; continue; }
      const ce = html.indexOf('>', close);
      i = ce === -1 ? n : ce + 1;
      continue;
    }
    if (name === 'br' || (closing && BLOCK.has(name))) out += '\n';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

let hardFail = 0;
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${FROM}.json`, 'utf8'));
  const page = `${R}/dist/${lg}/events/kafu-nights/index.html`;
  if (!existsSync(page)) { console.error(`FAIL ${lg}: ${page} missing`); hardFail++; continue; }
  const html = readFileSync(page, 'utf8');
  let text = visible(html);
  const report = [];
  for (const pos of stage.positions) {
    const n = text.split(pos.current).length - 1;
    if (n !== 1) { console.error(`FAIL ${lg}/${pos.id}: current found ${n} time(s) in the page`); hardFail++; continue; }
    text = text.split(pos.current).join(pos.proposed);
    report.push(`  ok ${pos.id} (${pos.current === pos.proposed ? 'unchanged' : 'changed'})`);
  }
  // the search-result line of the page (meta description) — published, not shown on the page
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  const body = `\n=================== /${lg}/events/kafu-nights/ ===================\n\n${text}\n` +
    `\n=================== search-result line of this page ===================\n\n${m ? visible(m[1]) : ''}\n`;
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${FROM}.txt`, body, 'utf8');
  console.log(`-- ${lg} --`);
  for (const r of report) console.log(r);
  console.log(`  -> out/${lg}/06-blind-input.on-${FROM}.txt (${body.length} chars)`);
}
if (hardFail) { console.error(`FAIL ${hardFail}`); process.exit(1); }
console.log('OK');
