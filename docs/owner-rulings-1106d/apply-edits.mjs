// Applies [{ id, file, find, replace }] edits: each find must occur exactly once in its file.
// Usage: node docs/owner-rulings-1106d/apply-edits.mjs <edits.json> [--check]
import { readFileSync, writeFileSync } from 'node:fs';

const [listPath, flag] = process.argv.slice(2);
const edits = JSON.parse(readFileSync(listPath, 'utf8'));
const files = new Map();
let bad = 0;
for (const e of edits) {
  if (!files.has(e.file)) files.set(e.file, readFileSync(e.file, 'utf8'));
  const text = files.get(e.file);
  const n = text.split(e.find).length - 1;
  if (n !== 1) { console.error(`${e.id}: find occurs ${n} times in ${e.file}`); bad++; continue; }
  if (/[\r\n]/.test(e.replace)) { console.error(`${e.id}: replacement spans lines`); bad++; continue; }
  files.set(e.file, text.replace(e.find, () => e.replace));
}
if (bad) { console.error(`${bad} edit(s) rejected, nothing written`); process.exit(1); }
if (flag !== '--check') for (const [f, t] of files) writeFileSync(f, t, 'utf8');
console.log(`${edits.length} edit(s) ${flag === '--check' ? 'checked' : 'applied'} in ${files.size} file(s)`);
