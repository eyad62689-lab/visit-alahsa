// Applies the Arabic/English source edits (source-edits.json): each find must occur exactly once in its file.
// Line endings are matched to the file (finds are written with the file's own endings).
// Usage: node docs/palm-village-1107/apply-edits.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const edits = JSON.parse(readFileSync('docs/palm-village-1107/source-edits.json', 'utf8'));
const text = {};
let bad = 0;
for (const e of edits) {
  text[e.file] ??= readFileSync(e.file, 'utf8');
  const crlf = text[e.file].includes('\r\n');
  const fix = (s) => (crlf ? s.replace(/\r?\n/g, '\r\n') : s.replace(/\r\n/g, '\n'));
  const find = fix(e.find), rep = fix(e.replace);
  const k = text[e.file].split(find).length - 1;
  if (k !== 1) { console.error(`${e.file}: find occurs ${k} times: ${e.find.slice(0, 60)}`); bad++; continue; }
  text[e.file] = text[e.file].replace(find, () => rep);
}
if (bad) { console.error(`${bad} problem(s), nothing written`); process.exit(1); }
for (const [f, t] of Object.entries(text)) writeFileSync(f, t, 'utf8');
console.log(`${edits.length} source edit(s) applied`);
