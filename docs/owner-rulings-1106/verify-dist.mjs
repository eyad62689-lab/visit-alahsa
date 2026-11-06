// يتحقق من dist بعد البناء النهائي لدفعة owner-rulings-1106: في صفحة مسار الهفوف التاريخي باللغات السبع تظهر المقدمة
// سطراً مرئياً كاملاً يطابق مصدرها حرفياً (ar/en من trails.json، والبقية من final.json)، وتحمل تنبيه الجمعة.
// --break يكسر نسخة الصفحة في الذاكرة (يحذف المحرف الأخير من التنبيه) ويجب أن يُمسَك الكسر في كل لغة.
//   node docs/owner-rulings-1106/verify-dist.mjs <root> [--break]
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visible } from '../owner-rulings-1023/visible.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const R = process.argv[2] || '.';
const BREAK = process.argv.includes('--break');
const FRIDAY = { ar: 'الجمعة', en: 'Fridays', zh: '周五', de: 'Freitags', ru: 'пятницам', ur: 'جمعہ', tr: 'Cuma' };
const src = JSON.parse(readFileSync(`${R}/src/data/trails.json`, 'utf8')).trails.find((t) => t.slug === 'historic-hofuf');
const expected = (lg) => (lg === 'ar' || lg === 'en' ? src[lg].intro : JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions[0].proposed);
let caught = 0, fails = 0;
for (const lg of Object.keys(FRIDAY)) {
  const page = `${R}/dist/${lg === 'ar' ? '' : lg + '/'}trails/historic-hofuf/index.html`;
  const want = expected(lg);
  let html = readFileSync(page, 'utf8');
  if (BREAK) {
    // يُحذف آخر محرف من التنبيه في كل مواضعه داخل الصفحة المنسوخة
    const tail = want.slice(-12);
    html = html.split(tail).join(tail.slice(0, -2) + tail.slice(-1));
  }
  const L = visible(html).split('\n');
  const ok = L.includes(want) && want.includes(FRIDAY[lg]);
  if (BREAK) { if (!ok) caught++; else console.error(`  NOT CAUGHT ${lg}`); continue; }
  if (!ok) { console.error(`FAIL ${lg}: the intro with the Friday notice is not a whole visible line of ${page}`); fails++; }
  else console.log(`  ok ${lg}`);
}
if (BREAK) { console.log(`break test: ${caught}/7 caught`); process.exit(caught === 7 ? 0 : 1); }
if (fails) { console.error(`FAIL ${fails}`); process.exit(1); }
console.log('OK 7/7');
