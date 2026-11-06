// يولّد مدخل القارئ الأعمى لدفعة owner-rulings-1106b مقصوصاً من dist بعد apply: من صفحة المهرجان المبنية في كل لغة تُقصّ
// السطور المحيطة بأول ظهور لسطر المكان المقترح، ومن فهرس الفعاليات سطور بطاقته.
//   node docs/owner-rulings-1106b/make-blind-input.mjs <root> <stage: 05|final> <lg…>
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visible } from '../owner-rulings-1023/visible.mjs';

const R = process.argv[2] || '.';
const STAGE = process.argv[3] || '05';
const LANGS = process.argv.slice(4);
const HERE = dirname(fileURLToPath(import.meta.url));
if (!LANGS.length) { console.error('usage: make-blind-input.mjs <root> <05|final> de ru ur tr'); process.exit(2); }

let fail = 0;
for (const lg of LANGS) {
  const [p] = JSON.parse(readFileSync(`${HERE}/out/${lg}/${STAGE}.json`, 'utf8')).positions;
  const [k] = JSON.parse(readFileSync(`${R}/${lg}-translation/output/owner-rulings-1106b/pack.json`, 'utf8')).positions;
  if (!p || p.current !== k.current) { console.error(`FAIL ${lg}: stage ${STAGE} does not match the pack`); fail++; continue; }
  let body = '';
  for (const [rel, label, before, after] of [[`${lg}/events/creative-alahsa-festival/`, 'the event page', 6, 6], [`${lg}/events/`, 'one card of the events list', 3, 4]]) {
    const L = visible(readFileSync(`${R}/dist/${rel}index.html`, 'utf8')).split('\n');
    const at = L.findIndex((l) => l.includes(p.proposed));
    if (at < 0) { console.error(`FAIL ${lg}: the proposed venue is not visible on /${rel}`); fail++; continue; }
    body += `\n=================== /${rel} — ${label} ===================\n\n${L.slice(Math.max(0, at - before), at + after).join('\n')}\n`;
  }
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${STAGE}.txt`, body, 'utf8');
  console.log(`  ok ${lg} -> out/${lg}/06-blind-input.on-${STAGE}.txt (${body.length} chars)`);
}
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
