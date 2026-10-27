// يكتب مخرج دفعة gulf-unify-1027 في المستودع: المقترح (05) للبناء والقراءة العمياء، أو النهائي (final) بعد الحاكم.
//   node docs/gulf-unify-1027/apply.mjs <root> <stage: 05|final> <lg…> [--prev 05] [--dry]
// يقرأ out/<lg>/<stage>.json ‏{positions:[{id,current,proposed}]} ويتحقق أن current يطابق الحزمة، ثم يستبدل المقطع في
// ملفه مرةً واحدةً بالضبط. موضعٌ proposed فيه = النصّ الذي في الشجرة لا يُكتب. لا يُكتب شيء إن أخفق موضع واحد.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const [ROOT, STAGE] = process.argv.slice(2);
const DRY = process.argv.includes('--dry');
// --prev 05: الشجرة تحمل مقترح المرحلة السابقة لا المنشور، فيُستبدل مقترحُها لا `current`
const prevAt = process.argv.indexOf('--prev');
const PREV = prevAt > 0 ? process.argv[prevAt + 1] : null;
const LANGS = process.argv.slice(4).filter((x, i, a) => x !== '--dry' && x !== '--prev' && a[i - 1] !== '--prev');
if (!ROOT || !STAGE || !LANGS.length) { console.error('usage: node apply.mjs <root> <05|final> zh de ru ur [--prev 05] [--dry]'); process.exit(2); }
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
// التنصيص غير المهرَّب يحدّ القيمة في YAML/JSON/TS؛ عدده في المقترح يساوي عدده في الأصل
const quotes = (s) => (s.match(/(?<!\\)["'`]/g) ?? []).join('');
const UR_BAD = /[يكةهىأإۃ]/; // ي ك ة ه ى أ إ ۃ
const UR_KASRA = /[ِۂ]/;
const files = new Map();
const rd = (rel) => { if (!files.has(rel)) files.set(rel, readFileSync(`${ROOT}/${rel}`, 'utf8')); return files.get(rel); };
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/${STAGE}.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8')).positions;
  const prev = PREV ? JSON.parse(readFileSync(`${HERE}/out/${lg}/${PREV}.json`, 'utf8')).positions : null;
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/gulf-unify-1027/pack.json`, 'utf8')).positions;
  if (fin.length !== pack.length) { console.error(`FAIL ${lg}: ${STAGE}.json has ${fin.length} positions, the pack ${pack.length}`); fails++; continue; }
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: ${STAGE}.json does not match the pack`); fails++; continue; }
    if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / thin space`); fails++; continue; }
    if (quotes(pos.proposed) !== quotes(k.current)) { console.error(`FAIL ${k.id}: unescaped quote characters differ from the original`); fails++; continue; }
    if (lg === 'ur' && (UR_BAD.test(pos.proposed) || UR_KASRA.test(pos.proposed))) { console.error(`FAIL ${k.id}: Arabic letterform or kasra in Urdu`); fails++; continue; }
    const inTree = prev ? prev.find((x) => x.id === k.id)?.proposed : k.current;
    if (typeof inTree !== 'string') { console.error(`FAIL ${k.id}: no ${PREV} proposal`); fails++; continue; }
    if (pos.proposed === inTree) { kept++; continue; }
    const s = rd(k.file);
    if (!once(s, inTree)) { console.error(`FAIL ${k.id}: the text in the tree is not in ${k.file} exactly once`); fails++; continue; }
    files.set(k.file, s.replace(inTree, () => pos.proposed));
    applied++;
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (!DRY) for (const [rel, s] of files) writeFileSync(`${ROOT}/${rel}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} applied, ${kept} kept; ${files.size} files`);
