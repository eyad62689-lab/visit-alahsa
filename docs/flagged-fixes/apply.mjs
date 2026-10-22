// يكتب مخرج دفعة flagged-fixes (de · zh · ru) في المستودع، بعد اعتماد الحاكم فقط.
//   node docs/flagged-fixes/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,current,proposed}]}، ويتحقق أن current يطابق الحزمة:
//   <lg>-7st-body ← السطر `body_<lg>: "<current>"` في src/content/dining/7st.md (YAML مزدوج التنصيص)
//   مفتاح ui قائم ← `'<key>': <literal>,` داخل كتلة `  <lg>: {` في src/i18n/ui.ts (التنصيص الأصلي، مفرد أو مزدوج)
//   مفتاح ui جديد (current فارغ) ← يُدرج سطرٌ `'<key>': '<proposed>',` بعد سطر المفتاح الذي يسبقه في الكتلة
//     الإنجليزية وهو موجود في كتلة اللغة؛ ويُخفق إن كان المفتاح موجوداً.
// موضعٌ proposed فيه = current لا يُكتب. يُخفق قبل أي كتابة إن لم يوجد الأصل مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: node apply.mjs <root> de zh ru [--dry]'); process.exit(2); }
const UI = 'src/i18n/ui.ts', MD = 'src/content/dining/7st.md';
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const lit = (s, q) => q + String(s).replace(/\\/g, '\\\\').split(q).join('\\' + q) + q;
const files = { [UI]: readFileSync(`${ROOT}/${UI}`, 'utf8'), [MD]: readFileSync(`${ROOT}/${MD}`, 'utf8') };
const EOL = files[UI].includes('\r\n') ? '\r\n' : '\n';
const once = (hay, needle) => hay.split(needle).length - 1 === 1;
const uiBlock = (s, lg) => {
  const a = s.indexOf(`\n  ${lg}: {`);
  if (a < 0) return null;
  const m = /\n {2}[a-z]{2}: \{/g;
  m.lastIndex = a + 1;
  const nx = m.exec(s);
  return [a, nx ? nx.index : s.length];
};
const keysOf = (block) => [...block.matchAll(/\n {4}'([^']+)':/g)].map((m) => m[1]);
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/flagged-fixes/pack.json`, 'utf8')).positions;
  if (fin.length !== pack.length) { console.error(`FAIL ${lg}: final.json has ${fin.length} positions, the pack ${pack.length}`); fails++; continue; }
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: final.json does not match the pack`); fails++; continue; }
    if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / thin space`); fails++; continue; }
    if (pos.proposed === pos.current) { kept++; console.log(`  kept ${k.id}`); continue; }
    if (k.file === MD) {
      const from = `body_${lg}: ${lit(pos.current, '"')}`;
      if (!once(files[MD], from)) { console.error(`FAIL ${k.id}: the current body is not in ${MD} exactly once`); fails++; continue; }
      files[MD] = files[MD].replace(from, () => `body_${lg}: ${lit(pos.proposed, '"')}`);
    } else {
      const key = k.id.slice(lg.length + 1);
      const s = files[UI], span = uiBlock(s, lg);
      if (!span) { console.error(`FAIL ${k.id}: no ${lg} block`); fails++; continue; }
      const block = s.slice(span[0], span[1]);
      if (!k.current) {
        // new key: after the nearest preceding English key that the language block has
        const have = keysOf(block);
        if (have.includes(key)) { console.error(`FAIL ${k.id}: the key already exists in the ${lg} block`); fails++; continue; }
        const enSpan = uiBlock(s, 'en'), enKeys = keysOf(s.slice(enSpan[0], enSpan[1]));
        const at = enKeys.indexOf(key);
        const prev = enKeys.slice(0, at).reverse().find((x) => have.includes(x));
        if (at < 0 || !prev) { console.error(`FAIL ${k.id}: no anchor key for the insertion`); fails++; continue; }
        const lineStart = block.indexOf(`\n    '${prev}':`);
        const lineEnd = block.indexOf('\n', lineStart + 1);
        const line = block.slice(lineStart + 1, lineEnd).replace(/\r$/, '');
        if (!/,$/.test(line)) { console.error(`FAIL ${k.id}: the anchor ${prev} is not a one-line entry`); fails++; continue; }
        const ins = `${EOL === '\r\n' ? '\r' : ''}\n    '${key}': ${lit(pos.proposed, "'")},`;
        const cut = lineEnd - (EOL === '\r\n' ? 1 : 0);
        files[UI] = s.slice(0, span[0]) + block.slice(0, cut) + ins + block.slice(cut) + s.slice(span[1]);
        console.log(`  new ${k.id} after '${prev}'`);
      } else {
        const hit = ["'", '"'].map((q) => [q, `'${key}': ${lit(pos.current, q)},`]).filter(([, f]) => once(block, f));
        if (hit.length !== 1) { console.error(`FAIL ${k.id}: the current string is not in the ${lg} block exactly once`); fails++; continue; }
        const [q, from] = hit[0];
        files[UI] = s.slice(0, span[0]) + block.replace(from, () => `'${key}': ${lit(pos.proposed, q)},`) + s.slice(span[1]);
      }
    }
    applied++; if (k.current) console.log(`  ok ${k.id}`);
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
for (const [rel, s] of Object.entries(files)) if (/(?<!\r)\n/.test(s)) { console.error(`FAIL a line without CRLF in ${rel}`); process.exit(1); }
if (!DRY) for (const [rel, s] of Object.entries(files)) writeFileSync(`${ROOT}/${rel}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written, ${kept} kept`);
