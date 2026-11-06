// يولّد مدخل القارئ الأعمى لدفعة owner-rulings-1106c مقصوصاً من dist: رأس صفحة الخريطة التضاريسية (العنوان والمقدمة وفقرة
// التعليمة) ثم عنوان قائمة المعالم وأول صفّين منها. زرّ الصف أيقونة بلا نص مرئي؛ يُكتب في القصّ بتلميحه كما يراه الزائر.
//   node docs/owner-rulings-1106c/make-blind-input.mjs <root> <stage: 05|final> <lg…>
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
  const [lead, howto] = JSON.parse(readFileSync(`${HERE}/out/${lg}/${STAGE}.json`, 'utf8')).positions;
  const [, k] = JSON.parse(readFileSync(`${R}/${lg}-translation/output/owner-rulings-1106c/pack.json`, 'utf8')).positions;
  const rel = `${lg}/terrain-map/`;
  const L = visible(readFileSync(`${R}/dist/${rel}index.html`, 'utf8')).split('\n');
  const at = L.indexOf(lead.proposed);
  const lt = L.indexOf(k.list_title);
  if (at < 0 || L[at + 1] !== howto.proposed || lt < 0) { console.error(`FAIL ${lg}: lead + howto + list title not found as visible lines of /${rel}`); fail++; continue; }
  const icon = `[a small icon button — its tooltip reads «${k.locate_label}»]`;
  const rows = L.slice(lt, lt + 6).map((l) => (/^\[button → \]?$/.test(l) ? icon : l));
  const body = `\n=================== /${rel} — the top of the page ===================\n\n${L.slice(at - 1, at + 2).join('\n')}\n`
    + `\n=================== /${rel} — further down: the start of the list ===================\n\n${rows.join('\n')}\n`;
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${STAGE}.txt`, body, 'utf8');
  console.log(`  ok ${lg} -> out/${lg}/06-blind-input.on-${STAGE}.txt (${body.length} chars)`);
}
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
