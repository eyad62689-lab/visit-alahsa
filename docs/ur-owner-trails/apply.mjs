// يكتب مخرج دفعة ur-owner-trails في المستودع، بعد اعتماد الحاكم فقط.
//   node docs/ur-owner-trails/apply.mjs <root> [--dry]
// يقرأ out/final.json ‏{positions:[{id,current,proposed}]}، ويتحقق أن current يطابق الحزمة:
//   حقول md (summary_ur · body_ur) ← السطر `<field>: "<current>"` (سلسلة YAML مزدوجة التنصيص)
//   trails.ur.json ← القيمة `"<current>"` بترميز JSON، مرةً واحدةً بالضبط في الملف
// يُخفق قبل أي كتابة إن لم يوجد الأصل مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: node apply.mjs <root> [--dry]'); process.exit(2); }
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const yamlLit = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const fin = JSON.parse(readFileSync(`${HERE}/out/final.json`, 'utf8')).positions;
const pack = JSON.parse(readFileSync(`${ROOT}/ur-translation/output/ur-owner-trails/pack.json`, 'utf8')).positions;
const files = new Map();
const get = (rel) => { if (!files.has(rel)) files.set(rel, readFileSync(`${ROOT}/${rel}`, 'utf8')); return files.get(rel); };
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
let fails = 0, applied = 0;
if (fin.length !== pack.length) { console.error(`FAIL final.json has ${fin.length} positions, the pack ${pack.length}`); process.exit(1); }
for (const k of pack) {
  const pos = fin.find((x) => x.id === k.id);
  if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: final.json does not match the pack`); fails++; continue; }
  if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / thin space`); fails++; continue; }
  if (/[يكةىه]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: an Arabic-only letter`); fails++; continue; }
  if (pos.proposed === pos.current) { console.log(`  kept ${k.id}`); continue; }
  const s = get(k.file);
  const [from, to] = k.file.endsWith('.md')
    ? [`${k.field}: ${yamlLit(pos.current)}`, `${k.field}: ${yamlLit(pos.proposed)}`]
    : [JSON.stringify(pos.current), JSON.stringify(pos.proposed)];
  if (!once(s, from)) { console.error(`FAIL ${k.id}: the current text is not in ${k.file} exactly once`); fails++; continue; }
  files.set(k.file, s.replace(from, () => to));
  applied++; console.log(`  ok ${k.id}`);
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
for (const [rel, s] of files) {
  if (rel.endsWith('.json')) JSON.parse(s);
  if (s.includes('\r\n') && /(?<!\r)\n/.test(s)) { console.error(`FAIL mixed line endings in ${rel}`); process.exit(1); }
}
if (!DRY) for (const [rel, s] of files) writeFileSync(`${ROOT}/${rel}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written`);
