// يكتب مخرج دفعة owner-rulings-1106b في المستودع: المقترح (05) أو النهائي (final).
//   node docs/owner-rulings-1106b/apply.mjs <root> <stage: 05|final> <lg…> [--prev 05] [--dry]
// يستبدل `place: '…'` في src/data/events.ts مرةً واحدةً بالضبط؛ موضعٌ proposed فيه = النص الذي في الشجرة لا يُكتب.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const [ROOT, STAGE] = process.argv.slice(2);
const DRY = process.argv.includes('--dry');
const prevAt = process.argv.indexOf('--prev');
const PREV = prevAt > 0 ? process.argv[prevAt + 1] : null;
const LANGS = process.argv.slice(4).filter((x, i, a) => x !== '--dry' && x !== '--prev' && a[i - 1] !== '--prev');
if (!ROOT || !STAGE || !LANGS.length) { console.error('usage: node apply.mjs <root> <05|final> de ru ur tr [--prev 05] [--dry]'); process.exit(2); }
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const lit = (s) => "'" + String(s).replace(/\\/g, '\\\\').split("'").join("\\'") + "'";
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
const UR_BAD = /[يكةهىأإۃ]/;
const UR_KASRA = /[ِۂ]/;
const F = 'src/data/events.ts';
let s = readFileSync(`${ROOT}/${F}`, 'utf8');
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/${STAGE}.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const [pos] = JSON.parse(readFileSync(p, 'utf8')).positions;
  const [k] = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/owner-rulings-1106b/pack.json`, 'utf8')).positions;
  if (!pos || pos.id !== k.id || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: ${STAGE}.json does not match the pack`); fails++; continue; }
  if (/[\r\n   ]/.test(pos.proposed) || /[.。۔]$/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / final full stop`); fails++; continue; }
  if (lg === 'ur' && (UR_BAD.test(pos.proposed) || UR_KASRA.test(pos.proposed))) { console.error(`FAIL ${k.id}: Arabic letterform or kasra in Urdu`); fails++; continue; }
  const inTree = PREV ? JSON.parse(readFileSync(`${HERE}/out/${lg}/${PREV}.json`, 'utf8')).positions[0].proposed : pos.current;
  if (pos.proposed === inTree) { kept++; console.log(`  kept ${k.id}`); continue; }
  const from = `place: ${lit(inTree)}`;
  if (!once(s, from)) { console.error(`FAIL ${k.id}: the place literal is not in ${F} exactly once`); fails++; continue; }
  s = s.replace(from, () => `place: ${lit(pos.proposed)}`);
  applied++; console.log(`  ok ${k.id}`);
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (!DRY) writeFileSync(`${ROOT}/${F}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} applied, ${kept} kept`);
