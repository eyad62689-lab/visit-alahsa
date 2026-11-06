// يولّد مدخل القارئ الأعمى لدفعة owner-rulings-1106 مقصوصاً من dist بعد apply: من صفحة مسار الهفوف التاريخي المبنية
// في كل لغة تُقصّ السطور المحيطة بالمقدمة المقترحة، ثم سطور المحطة الأخيرة (السوق) ليرى القارئ ما يحيل إليه التنبيه.
//   node docs/owner-rulings-1106/make-blind-input.mjs <root> <stage: 05|final> <lg…>
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visible } from '../owner-rulings-1023/visible.mjs';

const R = process.argv[2] || '.';
const STAGE = process.argv[3] || '05';
const LANGS = process.argv.slice(4);
const HERE = dirname(fileURLToPath(import.meta.url));
if (!LANGS.length) { console.error('usage: make-blind-input.mjs <root> <05|final> zh de ru ur tr'); process.exit(2); }

let fail = 0;
for (const lg of LANGS) {
  const [p] = JSON.parse(readFileSync(`${HERE}/out/${lg}/${STAGE}.json`, 'utf8')).positions;
  const [k] = JSON.parse(readFileSync(`${R}/${lg}-translation/output/owner-rulings-1106/pack.json`, 'utf8')).positions;
  if (!p || p.current !== k.current) { console.error(`FAIL ${lg}: stage ${STAGE} does not match the pack`); fail++; continue; }
  const rel = `${lg}/trails/historic-hofuf/`;
  const L = visible(readFileSync(`${R}/dist/${rel}index.html`, 'utf8')).split('\n');
  const at = L.findIndex((l) => l === p.proposed);
  if (at < 0) { console.error(`FAIL ${lg}: the proposed intro is not a whole visible line of /${rel}`); fail++; continue; }
  // المحطة الأخيرة: سطرها يبدأ برقم ترتيبها ثم اسمها (والشارة ملتصقة بعده)
  const stopName = JSON.parse(readFileSync(`${R}/src/data/trails.${lg}.json`, 'utf8')).trails['historic-hofuf'].stops['souq-al-qaisariya'];
  const nm = stopName && (stopName.name || stopName.title);
  const s = nm ? L.findIndex((l, i) => i > at && l.startsWith('4' + nm)) : -1;
  let body = `\n=================== /${rel} — the top of the page ===================\n\n${L.slice(Math.max(0, at - 4), at + 2).join('\n')}\n`;
  if (s > 0) body += `\n=================== /${rel} — the last stop of the trail ===================\n\n${L.slice(s, s + 3).join('\n')}\n`;
  else console.log(`  note ${lg}: last stop not located (name ${nm ?? '?'})`);
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${STAGE}.txt`, body, 'utf8');
  console.log(`  ok ${lg} -> out/${lg}/06-blind-input.on-${STAGE}.txt (${body.length} chars)`);
}
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
