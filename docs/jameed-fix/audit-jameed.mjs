// جرد مستقل: كل موضع يذكر الجميد أو يعرّفه بلا أن يسمّيه.
// لا يصنّف — يعرض فقط، والتصنيف بالقراءة.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.argv[2] || '.';

// اسم الجميد بلغاته
const NAME = /الجميد|«?جميد»?|[Jj]ameed|贾米德|джамид|Джамид/;
// تعريفُه بلا اسمه: عبارات «المشمّس» ونظائرها
const DEF = [
  /اللومي المشمّس/,
  /sun-dried lime/i,
  /sonnengetrocknete Limette/,
  /晒制青柠干|青柠干/,
  /высушенн\w* на солнце|лайм, высушенный/i,
];

const SKIP = /node_modules|\.git|dist|\.astro/;
const EXT = /\.(md|ts|astro|json)$/;

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (SKIP.test(p)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.test(p)) out.push(p);
  }
  return out;
}

const files = walk(join(ROOT, 'src'));
let hits = 0, filesHit = new Set();

for (const f of files) {
  const lines = readFileSync(f, 'utf8').split(/\r?\n/);
  const rows = [];
  lines.forEach((ln, i) => {
    const byName = NAME.test(ln);
    const byDef = DEF.some((r) => r.test(ln));
    if (!byName && !byDef) return;
    rows.push({ n: i + 1, tag: byName ? (byDef ? 'اسم+تعريف' : 'اسم فقط ') : 'تعريف بلا اسم', ln: ln.trim() });
  });
  if (!rows.length) continue;
  filesHit.add(f);
  console.log('\n=== ' + relative(ROOT, f).replace(/\\/g, '/'));
  for (const r of rows) {
    hits++;
    console.log(`  ${String(r.n).padStart(4)}  [${r.tag}]  ${r.ln.slice(0, 300)}`);
  }
}
console.log(`\n--- ملفات: ${filesHit.size} | مواضع: ${hits}`);
