// يكتب مخرج الخطوط الأربعة (de · zh · ru · ur) لدفعة 7st-touch في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node docs/7st-touch/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,current,proposed}]}، ويتحقق أن current يطابق الحزمة:
//   <lg>-7st-body      → السطر `body_<lg>: "<current>"` في src/content/dining/7st.md (سلسلة YAML مزدوجة التنصيص)
//   <lg>-home-map-lead → `lead: '<current>',` داخل كتلة `  <lg>: {` من src/data/home-copy.ts (سلسلة TS مفردة)
// موضعٌ proposed فيه = current لا يُكتب. يُخفق قبل أي كتابة إن لم يوجد الأصل مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: node apply.mjs <root> de zh ru ur [--dry]'); process.exit(2); }
const MD = 'src/content/dining/7st.md', HOME = 'src/data/home-copy.ts';
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const tsLit = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const yamlLit = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const files = { [MD]: readFileSync(ROOT + '/' + MD, 'utf8'), [HOME]: readFileSync(ROOT + '/' + HOME, 'utf8') };
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/7st-touch/pack.json`, 'utf8')).positions;
  if (fin.length !== pack.length) { console.error(`FAIL ${lg}: final.json has ${fin.length} positions, the pack ${pack.length}`); fails++; continue; }
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: final.json does not match the pack`); fails++; continue; }
    if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / thin space`); fails++; continue; }
    if (pos.proposed === pos.current) { kept++; console.log(`  kept ${k.id} (unchanged by decision)`); continue; }
    if (k.id.endsWith('-7st-body')) {
      const from = `body_${lg}: ${yamlLit(pos.current)}`;
      if (!once(files[MD], from)) { console.error(`FAIL ${k.id}: the current body is not in ${MD} exactly once`); fails++; continue; }
      files[MD] = files[MD].replace(from, () => `body_${lg}: ${yamlLit(pos.proposed)}`);
    } else {
      const s = files[HOME];
      const a = s.indexOf(`\n  ${lg}: {`);
      const b = s.indexOf('\n  },', a);
      const block = a < 0 || b < 0 ? '' : s.slice(a, b);
      const from = `lead: ${tsLit(pos.current)},`;
      if (!once(block, from)) { console.error(`FAIL ${k.id}: the current lead is not in the ${lg} block exactly once`); fails++; continue; }
      files[HOME] = s.slice(0, a) + block.replace(from, () => `lead: ${tsLit(pos.proposed)},`) + s.slice(b);
    }
    applied++; console.log(`  ok ${k.id}`);
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
for (const [rel, s] of Object.entries(files)) if (/(?<!\r)\n/.test(s)) { console.error(`FAIL a line without CRLF in ${rel}`); process.exit(1); }
if (!DRY) for (const [rel, s] of Object.entries(files)) writeFileSync(ROOT + '/' + rel, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written, ${kept} kept`);
