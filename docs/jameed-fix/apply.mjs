// يكتب مخرج الخطوط الثلاثة في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node apply.mjs <جذر الشجرة> <lg…>
// يقرأ out/<lg>/final.json ‏{positions:[{file,line,current,proposed}], termbase_ops:[…]}
// ويُخفق بصخب قبل أي كتابة إن اختلف السطر الحالي عمّا في الملف حرفياً.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const LANGS = process.argv.slice(3);
if (!ROOT || !LANGS.length) { console.error('استعمال: node apply.mjs <root> de zh ru'); process.exit(1); }

const bufs = new Map();        // ملف → نصّه (تتراكم عليه كل تعديلاته)
const eols = new Map();
const load = (f) => {
  if (!bufs.has(f)) {
    const s = readFileSync(ROOT + '/' + f, 'utf8');
    bufs.set(f, s);
    eols.set(f, s.includes('\r\n') ? '\r\n' : '\n');
  }
  return bufs.get(f);
};
let fails = 0, applied = 0, skipped = 0;
const tbOps = [];

for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p)) { console.error(`FAIL  ${lg}: لا ${p}`); fails++; continue; }
  const pack = JSON.parse(readFileSync(p, 'utf8'));
  console.log(`\n── ${lg} (${pack.positions.length} موضعاً) ──`);
  for (const pos of pack.positions) {
    if (pos.proposed === pos.current) { skipped++; console.log(`  –  ${pos.id}: بلا تغيير (بقرار الخط)`); continue; }
    const s = load(pos.file);
    const EOL = eols.get(pos.file);
    const lines = s.split(EOL);
    const idx = pos.line - 1;
    if (lines[idx] !== pos.current) {
      console.error(`FAIL  ${pos.id}: السطر ${pos.line} في ${pos.file} لا يطابق current`);
      console.error(`        في الملف: ${JSON.stringify((lines[idx] || '').slice(0, 120))}`);
      console.error(`        المتوقَّع : ${JSON.stringify(pos.current.slice(0, 120))}`);
      fails++; continue;
    }
    lines[idx] = pos.proposed;
    bufs.set(pos.file, lines.join(EOL));
    applied++; console.log(`  ok ${pos.id}`);
  }
  for (const op of pack.termbase_ops || []) tbOps.push({ lg, op });
}

if (fails) { console.error(`\n✗ ${fails} إخفاقاً — لم يُكتب أي ملف.`); process.exit(1); }

// حرّاس ما قبل الكتابة
for (const [f, s] of bufs) {
  if (/[  ]/.test(s)) { console.error(`✗ ${f}: محرف مسافة غير مرئي (U+00A0/U+2009)`); process.exit(1); }
  const EOL = eols.get(f);
  if (EOL === '\r\n' && /(?<!\r)\n/.test(s)) { console.error(`✗ ${f}: سطر بلا CRLF`); process.exit(1); }
}
for (const [f, s] of bufs) writeFileSync(ROOT + '/' + f, s, 'utf8');

console.log(`\n✓ ${applied} موضعاً مكتوباً · ${skipped} بلا تغيير · ${bufs.size} ملفاً`);
if (tbOps.length) {
  console.log(`\nعمليات المعجم (${tbOps.length}) — تُطبَّق بيدك أو بسكربت مخصّص:`);
  for (const { lg, op } of tbOps) console.log(`  [${lg}] ${op.op} :: ${op.en || op.entry_index} :: ${op.field || ''}`);
}
