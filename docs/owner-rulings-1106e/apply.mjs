// Applies out/<lg>/<stage>.json edits to the item lines named in the pack (each find must be unique in its line).
// Usage: node docs/owner-rulings-1106e/apply.mjs <stage> [lg ...]   e.g. apply.mjs 05  |  apply.mjs final tr
import { readFileSync, writeFileSync } from 'node:fs';

const [stage, ...only] = process.argv.slice(2);
const langs = only.length ? only : ['de', 'ru', 'tr'];
const files = new Map();
const read = (f) => { if (!files.has(f)) files.set(f, readFileSync(f, 'utf8')); return files.get(f); };
let bad = 0, n = 0;
for (const lg of langs) {
  const pack = JSON.parse(readFileSync(`${lg}-translation/output/owner-rulings-1106e/pack.json`, 'utf8'));
  const out = JSON.parse(readFileSync(`docs/owner-rulings-1106e/out/${lg}/${stage}.json`, 'utf8'));
  for (const it of out.items) {
    const p = pack.items.find((x) => x.id === it.id);
    if (!p) { console.error(`${lg} ${it.id}: not in pack`); bad++; continue; }
    const text = read(p.file);
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
    const lines = text.split(eol);
    if (lines[p.line - 1] !== p.current) { console.error(`${lg} ${it.id}: line ${p.line} changed since pack`); bad++; continue; }
    let l = p.current;
    for (const e of it.edits) {
      const k = l.split(e.find).length - 1;
      if (k !== 1) { console.error(`${lg} ${it.id}: find occurs ${k} times: ${e.find}`); bad++; continue; }
      if (/[\r\n]/.test(e.replace)) { console.error(`${lg} ${it.id}: replacement spans lines`); bad++; continue; }
      l = l.replace(e.find, () => e.replace); n++;
    }
    lines[p.line - 1] = l;
    files.set(p.file, lines.join(eol));
  }
}
if (bad) { console.error(`${bad} problem(s), nothing written`); process.exit(1); }
for (const [f, t] of files) writeFileSync(f, t, 'utf8');
console.log(`${n} edit(s) applied (${stage}: ${langs.join(' ')})`);
