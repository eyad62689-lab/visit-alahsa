// يكتب مخرج الخطوط الأربعة (de · zh · ru · ur) لدفعة touch-click في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node docs/touch-click/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,current,proposed}]}، ويتحقق أن current يطابق الحزمة:
//   ui.ts ← سطر `'<key>': <literal>,` داخل كتلة `  <lg>: {` (السلسلة بتنصيصها الأصلي، مفرد أو مزدوج)
//   DiningView.astro ← سطر `heroSum: '<literal>',` الذي قيمته current بالضبط
// موضعٌ proposed فيه = current لا يُكتب. يُخفق قبل أي كتابة إن لم يوجد الأصل مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: node apply.mjs <root> de zh ru ur [--dry]'); process.exit(2); }
const UI = 'src/i18n/ui.ts', DV = 'src/components/views/DiningView.astro';
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const lit = (s, q) => q + String(s).replace(/\\/g, '\\\\').split(q).join('\\' + q) + q;
const files = { [UI]: readFileSync(`${ROOT}/${UI}`, 'utf8'), [DV]: readFileSync(`${ROOT}/${DV}`, 'utf8') };
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
// the span of a language block in ui.ts: from `\n  <lg>: {` to the next `\n  <xx>: {` (or the end)
const uiBlock = (s, lg) => {
  const a = s.indexOf(`\n  ${lg}: {`);
  if (a < 0) return null;
  const m = /\n {2}[a-z]{2}: \{/g;
  m.lastIndex = a + 1;
  const nx = m.exec(s);
  return [a, nx ? nx.index : s.length];
};
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/touch-click/pack.json`, 'utf8')).positions;
  if (fin.length !== pack.length) { console.error(`FAIL ${lg}: final.json has ${fin.length} positions, the pack ${pack.length}`); fails++; continue; }
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: final.json does not match the pack`); fails++; continue; }
    if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / thin space`); fails++; continue; }
    if (pos.proposed === pos.current) { kept++; console.log(`  kept ${k.id}`); continue; }
    if (k.file === UI) {
      const key = k.id.slice(lg.length + 1);
      const s = files[UI], span = uiBlock(s, lg);
      if (!span) { console.error(`FAIL ${k.id}: no ${lg} block`); fails++; continue; }
      const block = s.slice(span[0], span[1]);
      const hit = ["'", '"'].map((q) => [q, `'${key}': ${lit(pos.current, q)},`]).filter(([, f]) => once(block, f));
      if (hit.length !== 1) { console.error(`FAIL ${k.id}: the current string is not in the ${lg} block exactly once`); fails++; continue; }
      const [q, from] = hit[0];
      files[UI] = s.slice(0, span[0]) + block.replace(from, () => `'${key}': ${lit(pos.proposed, q)},`) + s.slice(span[1]);
    } else {
      const from = `heroSum: ${lit(pos.current, "'")},`;
      if (!once(files[DV], from)) { console.error(`FAIL ${k.id}: the current heroSum is not in ${DV} exactly once`); fails++; continue; }
      files[DV] = files[DV].replace(from, () => `heroSum: ${lit(pos.proposed, "'")},`);
    }
    applied++; console.log(`  ok ${k.id}`);
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
for (const [rel, s] of Object.entries(files)) if (/(?<!\r)\n/.test(s)) { console.error(`FAIL a line without CRLF in ${rel}`); process.exit(1); }
if (!DRY) for (const [rel, s] of Object.entries(files)) writeFileSync(`${ROOT}/${rel}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written, ${kept} kept`);
