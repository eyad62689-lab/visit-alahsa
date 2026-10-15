// يكتب مخرج الخطوط الثلاثة (de · zh · ru) لدفعة food-amend في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node docs/food-amend/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,file,line,current,proposed}]}. القيمة سلسلة TS بعلامة مفردة:
// يُبحث عن الحرفية المهرَّبة '<current>' في سطرها، ويُخفق قبل أي كتابة إن لم توجد مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: node apply.mjs <root> de zh ru [--dry]'); process.exit(2); }

const lit = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const bufs = new Map(), eols = new Map();
const load = (f) => {
  if (!bufs.has(f)) { const s = readFileSync(ROOT + '/' + f, 'utf8'); bufs.set(f, s); eols.set(f, s.includes('\r\n') ? '\r\n' : '\n'); }
  return bufs.get(f);
};
let fails = 0, applied = 0, skipped = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8'));
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/food-amend/pack.json`, 'utf8'));
  console.log(`-- ${lg} (${fin.positions.length} positions) --`);
  for (const pos of fin.positions) {
    const pk = pack.positions.find((x) => x.id === pos.id);
    if (!pk || pk.current !== pos.current) { console.error(`FAIL ${pos.id}: current differs from the pack`); fails++; continue; }
    if (pos.proposed === pos.current) { skipped++; console.log(`  -  ${pos.id}: unchanged`); continue; }
    if (/[\r\n  ]/.test(pos.proposed)) { console.error(`FAIL ${pos.id}: line break / NBSP / thin space in proposed`); fails++; continue; }
    const s = load(pk.file);
    const EOL = eols.get(pk.file);
    const lines = s.split(EOL);
    const L = lines[pk.line - 1] ?? '';
    const from = lit(pos.current);
    if (L.split(from).length - 1 !== 1) { console.error(`FAIL ${pos.id}: ${pk.file}:${pk.line} does not hold the current literal exactly once`); fails++; continue; }
    lines[pk.line - 1] = L.replace(from, () => lit(pos.proposed));
    bufs.set(pk.file, lines.join(EOL));
    applied++; console.log(`  ok ${pos.id}`);
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
for (const [f, s] of bufs) {
  if (eols.get(f) === '\r\n' && /(?<!\r)\n/.test(s)) { console.error(`FAIL ${f}: a line without CRLF`); process.exit(1); }
  if (!DRY) writeFileSync(ROOT + '/' + f, s, 'utf8');
}
console.log(`${DRY ? 'DRY ' : ''}${applied} written · ${skipped} unchanged · ${bufs.size} file(s)`);
