// يولّد مدخل القارئ الأعمى (المرحلة 6) لدفعة events-amend — **مقصوصاً من dist لا من المصدر** (سابقة food-amend):
// صفحة /<lg>/events/kafu-nights/ المنشورة كما يراها الزائر، ويُدرج فيها المدخلُ المقترح من out/<lg>/<stage>.json
// في موضعه من القالب: بعد سطر شارة الحالة، حيث يقع المدخل في الصفحة الإنجليزية المبنية من الشجرة نفسها
// (dist/en/events/kafu-nights/ تحمله). يُخفق إن اختلف بناء الصفحتين قبل ذلك الموضع.
//   node docs/events-amend/make-blind-input.mjs <dist root> <lg…> [--from 05|07]
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
const PAGE = (lg) => `${R}/dist/${lg}/events/kafu-nights/index.html`;
const enLines = visible(readFileSync(PAGE('en'), 'utf8')).split('\n');
const enIntro = enLines.findIndex((l) => l.startsWith('“Kafu” comes from'));
if (enIntro < 0) { console.error('FAIL en: the English page carries no intro'); process.exit(1); }
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${FROM}.json`, 'utf8'));
  const pos = stage.positions.find((p) => p.id === lg + '-ev-kafu-intro');
  if (!pos || !pos.proposed) { console.error(`FAIL ${lg}: no proposed intro in ${FROM}.json`); hardFail++; continue; }
  if (!existsSync(PAGE(lg))) { console.error(`FAIL ${lg}: ${PAGE(lg)} missing`); hardFail++; continue; }
  const html = readFileSync(PAGE(lg), 'utf8');
  const lines = visible(html).split('\n');
  // the template lines before the intro (header, crumb, heading, share, status badge) are as many as in the English
  // page; the footers differ between languages, so only that part is compared: the line at the English intro's index
  // must be the first facts row (it carries the season of this language's text), and no intro may stand yet
  const season = JSON.parse(readFileSync(`${HERE}/../../${lg}-translation/output/events-amend/pack.json`, 'utf8')).positions[0].context.season;
  if (lines.some((l) => l.includes(pos.proposed)) || !(lines[enIntro] ?? '').endsWith(season)) { console.error(`FAIL ${lg}: page shape differs from the English page before the intro`); hardFail++; continue; }
  lines.splice(enIntro, 0, pos.proposed);
  console.log(`   ${lg} around the intro: [${lines[enIntro - 1]}] | INTRO | [${lines[enIntro + 1]}]`);
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  const body = `\n=================== /${lg}/events/kafu-nights/ ===================\n\n${lines.join('\n')}\n` +
    `\n=================== search-result line of this page ===================\n\n${m ? visible(m[1]) : ''}\n`;
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${FROM}.txt`, body, 'utf8');
  console.log(`-- ${lg} -- intro inserted at line ${enIntro} -> out/${lg}/06-blind-input.on-${FROM}.txt (${body.length} chars)`);
}
if (hardFail) { console.error(`FAIL ${hardFail}`); process.exit(1); }
console.log('OK');
