// يتحقق من dist بعد البناء النهائي لدفعة owner-rulings-1106c: في صفحة الخريطة التضاريسية باللغات السبع المقدمةُ سطرٌ مرئي
// يتلوه سطر التعليمة، كلاهما كما في مصدره (ar/en من ui.ts، والبقية من final.json)، ووصف الصفحة هو المقدمة وحدها، ولا تبقى
// التعليمة القديمة («أي معلم في القائمة») في الصفحة. --break يعيد المقدمة القديمة في النصّ المرئي المنسوخ ويجب أن يُمسَك.
//   node docs/owner-rulings-1106c/verify-dist.mjs <root> [--break]
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visible } from '../owner-rulings-1023/visible.mjs';
import { uiLine } from './lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const R = process.argv[2] || '.';
const BREAK = process.argv.includes('--break');
const ui = readFileSync(`${R}/src/i18n/ui.ts`, 'utf8');
const pk = (lg) => JSON.parse(readFileSync(`${R}/${lg}-translation/output/owner-rulings-1106c/pack.json`, 'utf8')).positions;
const W = {}, OLD = {};
for (const lg of ['ar', 'en']) { W[lg] = [uiLine(ui, lg, 'tmap.lead').value, uiLine(ui, lg, 'tmap.howto').value]; OLD[lg] = pk('tr')[0][`${lg}_before`]; }
for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) { W[lg] = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions.map((p) => p.proposed); OLD[lg] = pk(lg)[0].current; }
const unent = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
let caught = 0, fails = 0;
for (const lg of Object.keys(W)) {
  const [lead, howto] = W[lg];
  const html = readFileSync(`${R}/dist/${lg === 'ar' ? 'خريطة-تضاريس' : lg + '/terrain-map'}/index.html`, 'utf8');
  let L = visible(html).split('\n');
  const meta = unent((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (BREAK) L = L.map((l) => (l === lead ? OLD[lg] : l));
  const i = L.indexOf(lead);
  const ok = i >= 0 && L[i + 1] === howto && !L.includes(OLD[lg]) && meta === lead;
  if (BREAK) { if (!ok) caught++; else console.error(`  NOT CAUGHT ${lg}`); continue; }
  if (!ok) { console.error(`FAIL ${lg}: lead ${i >= 0}, howto ${L[i + 1] === howto}, old gone ${!L.includes(OLD[lg])}, meta ${meta === lead}`); fails++; } else console.log(`  ok ${lg}`);
}
if (BREAK) { console.log(`break test: ${caught}/7 caught`); process.exit(caught === 7 ? 0 : 1); }
if (fails) { console.error(`FAIL ${fails}`); process.exit(1); }
console.log('OK 7/7');
