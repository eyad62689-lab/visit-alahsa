// يكتب مخرج دفعة owner-rulings-1023 في المستودع: المقترح (05) للبناء والقراءة العمياء، أو النهائي (final) بعد الحاكم.
//   node docs/owner-rulings-1023/apply.mjs <root> <stage: 05|final> <lg…> [--dry]
// يقرأ out/<lg>/<stage>.json ‏{positions:[{id,current,proposed}]} ويتحقق أن current يطابق الحزمة، ثم يستبدل الأصلَ
// في ملفه مرةً واحدةً بالضبط بحسب نوعه (ts: سلسلة حرفية بتنصيصها؛ yaml: `field: "…"`؛ json: `"a": "…"`؛
// ui-new: سطر مفتاح جديد بعد مرساته في كتلة اللغة). موضعٌ proposed فيه = current لا يُكتب.
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
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const lit = (s, q) => q + String(s).replace(/\\/g, '\\\\').split(q).join('\\' + q) + q;
const yq = (s) => '"' + String(s).replace(/\\/g, '\\\\').split('"').join('\\"') + '"';
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
const files = new Map();
const rd = (rel) => { if (!files.has(rel)) files.set(rel, readFileSync(`${ROOT}/${rel}`, 'utf8')); return files.get(rel); };
const wr = (rel, s) => files.set(rel, s);
const uiBlock = (s, lg) => {
  const a = s.indexOf(`\n  ${lg}: {`);
  if (a < 0) return null;
  const m = /\n {2}[a-z]{2}: \{/g;
  m.lastIndex = a + 1;
  const nx = m.exec(s);
  return [a, nx ? nx.index : s.length];
};
const UR_BAD = /[يكةهىأإۃ]/; // ي ك ة ه ى أ إ ۃ
const UR_KASRA = /[ِۂ]/;
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/${STAGE}.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8')).positions;
  const prev = PREV ? JSON.parse(readFileSync(`${HERE}/out/${lg}/${PREV}.json`, 'utf8')).positions : null;
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/owner-rulings-1023/pack.json`, 'utf8')).positions;
  if (fin.length !== pack.length) { console.error(`FAIL ${lg}: ${STAGE}.json has ${fin.length} positions, the pack ${pack.length}`); fails++; continue; }
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: ${STAGE}.json does not match the pack`); fails++; continue; }
    if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / thin space`); fails++; continue; }
    if (lg === 'ur' && (UR_BAD.test(pos.proposed) || UR_KASRA.test(pos.proposed))) { console.error(`FAIL ${k.id}: Arabic letterform or kasra in Urdu`); fails++; continue; }
    // النصّ الذي تحمله الشجرة الآن: المنشور، أو مقترح المرحلة السابقة عند --prev
    const inTree = prev ? prev.find((x) => x.id === k.id)?.proposed : pos.current;
    if (prev && typeof inTree !== 'string') { console.error(`FAIL ${k.id}: no ${PREV} proposal`); fails++; continue; }
    if (pos.proposed === inTree) { kept++; console.log(`  kept ${k.id}`); continue; }
    const s = rd(k.file);
    if (k.kind === 'ts') {
      const hit = ["'", '"'].map((q) => [q, lit(inTree, q)]).filter(([, f]) => once(s, f));
      if (hit.length !== 1) { console.error(`FAIL ${k.id}: the current literal is not in ${k.file} exactly once`); fails++; continue; }
      const [q, from] = hit[0];
      wr(k.file, s.replace(from, () => lit(pos.proposed, q)));
    } else if (k.kind === 'yaml') {
      const from = `${k.field}: ${yq(inTree)}`;
      if (!once(s, from)) { console.error(`FAIL ${k.id}: \`${k.field}: "…"\` is not in ${k.file} exactly once`); fails++; continue; }
      wr(k.file, s.replace(from, () => `${k.field}: ${yq(pos.proposed)}`));
    } else if (k.kind === 'json') {
      const from = `"a": ${JSON.stringify(inTree)}`;
      if (!once(s, from)) { console.error(`FAIL ${k.id}: the current answer is not in ${k.file} exactly once`); fails++; continue; }
      wr(k.file, s.replace(from, () => `"a": ${JSON.stringify(pos.proposed)}`));
    } else if (k.kind === 'ui-new' && prev) {
      // المفتاح أُدرج في المرحلة السابقة؛ تُستبدل قيمته
      const span = uiBlock(s, lg);
      if (!span) { console.error(`FAIL ${k.id}: no ${lg} block`); fails++; continue; }
      const block = s.slice(span[0], span[1]);
      const from = `'${k.key}': ${lit(inTree, "'")},`;
      if (!once(block, from)) { console.error(`FAIL ${k.id}: the ${PREV} value of '${k.key}' is not in the ${lg} block exactly once`); fails++; continue; }
      wr(k.file, s.slice(0, span[0]) + block.replace(from, () => `'${k.key}': ${lit(pos.proposed, "'")},`) + s.slice(span[1]));
    } else if (k.kind === 'ui-new') {
      const EOL = s.includes('\r\n') ? '\r\n' : '\n';
      const span = uiBlock(s, lg);
      if (!span) { console.error(`FAIL ${k.id}: no ${lg} block`); fails++; continue; }
      const block = s.slice(span[0], span[1]);
      if (block.includes(`\n    '${k.key}':`)) { console.error(`FAIL ${k.id}: the key already exists in the ${lg} block`); fails++; continue; }
      const lineStart = block.indexOf(`\n    '${k.anchor}':`);
      if (lineStart < 0) { console.error(`FAIL ${k.id}: no anchor '${k.anchor}' in the ${lg} block`); fails++; continue; }
      const lineEnd = block.indexOf('\n', lineStart + 1);
      const line = block.slice(lineStart + 1, lineEnd).replace(/\r$/, '');
      if (!/,$/.test(line)) { console.error(`FAIL ${k.id}: the anchor is not a one-line entry`); fails++; continue; }
      const cut = lineEnd - (EOL === '\r\n' ? 1 : 0);
      const ins = `${EOL}    '${k.key}': ${lit(pos.proposed, "'")},`;
      wr(k.file, s.slice(0, span[0]) + block.slice(0, cut) + ins + block.slice(cut) + s.slice(span[1]));
      console.log(`  new ${k.id} after '${k.anchor}'`);
    } else { console.error(`FAIL ${k.id}: unknown kind ${k.kind}`); fails++; continue; }
    applied++; if (k.kind !== 'ui-new') console.log(`  ok ${k.id}`);
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (!DRY) for (const [rel, s] of files) writeFileSync(`${ROOT}/${rel}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} applied, ${kept} kept; ${files.size} files: ${[...files.keys()].join(', ')}`);
