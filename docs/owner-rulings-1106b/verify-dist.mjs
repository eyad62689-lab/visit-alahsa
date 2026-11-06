// يتحقق من dist بعد البناء النهائي لدفعة owner-rulings-1106b: في صفحة مهرجان الأحساء المبدعة وفهرس الفعاليات باللغات السبع
// يظهر سطر المكان الواحد حرفياً كما في مصدره (ar/en/zh من events.ts، والبقية من final.json)، ولا تظهر الصيغة المنشورة القديمة.
// --break يعيد في نسخة الصفحة في الذاكرة الصيغة القديمة مكان الجديدة، ويجب أن يُمسَك الكسر في كل لغة.
//   node docs/owner-rulings-1106b/verify-dist.mjs <root> [--break]
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visible } from '../owner-rulings-1023/visible.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const R = process.argv[2] || '.';
const BREAK = process.argv.includes('--break');
const OLD = { ar: 'الفريج التراثي، قلعة الأمانة', en: 'Heritage Freej, the Municipality Fort' };
for (const lg of ['de', 'ru', 'ur', 'tr']) OLD[lg] = JSON.parse(readFileSync(`${R}/${lg}-translation/output/owner-rulings-1106b/pack.json`, 'utf8')).positions[0].current;
const NEW = { ar: 'الفريج التراثي داخل قلعة الأمانة', en: 'Heritage Freej inside the Municipality Fort', zh: '“弗里季”传统街区（哈萨市政局城堡）' };
for (const lg of ['de', 'ru', 'ur', 'tr']) NEW[lg] = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions[0].proposed;
const pages = (lg) => lg === 'ar'
  ? ['فعاليات/مهرجان-الأحساء-المبدعة/', 'فعاليات/']
  : [`${lg}/events/creative-alahsa-festival/`, `${lg}/events/`];
const read = (rel) => readFileSync(`${R}/dist/${rel}index.html`, 'utf8');
let caught = 0, total = 0, fails = 0;
for (const lg of Object.keys(NEW)) for (const rel of pages(lg)) {
  // الكسر على النصّ المرئي لا على HTML: الفاصلة العليا التركية مرمّزة كياناً في الصفحة
  let t = visible(read(rel));
  if (BREAK) { if (lg === 'zh') continue; total++; t = t.split(NEW[lg]).join(OLD[lg]); }
  const ok = t.includes(NEW[lg]) && !(OLD[lg] && t.includes(OLD[lg]));
  if (BREAK) { if (!ok) caught++; else console.error(`  NOT CAUGHT ${lg} /${rel}`); continue; }
  if (!ok) { console.error(`FAIL ${lg} /${rel}`); fails++; } else console.log(`  ok ${lg} /${rel}`);
}
if (BREAK) { console.log(`break test: ${caught}/${total} caught`); process.exit(caught === total ? 0 : 1); }
if (fails) { console.error(`FAIL ${fails}`); process.exit(1); }
console.log('OK 14/14');
