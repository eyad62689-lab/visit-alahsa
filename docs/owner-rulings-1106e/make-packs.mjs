// Builds <lg>-translation/output/owner-rulings-1106e/pack.json: each item carries the full published line,
// the English line before and after the source edit (when English has one), and the Arabic line.
// Usage: node docs/owner-rulings-1106e/make-packs.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const line = (text, n) => text.split(/\r?\n/)[n - 1];
const cur = (f) => readFileSync(f, 'utf8');
const base = (f) => execFileSync('git', ['show', `origin/main:${f}`], { encoding: 'utf8', maxBuffer: 1 << 26 });

// topic -> [en file, en line, ar file, ar line]; en null where the English line has no jameed gloss
const SRC = {
  'lomi-desc': ['src/content/blog/hasawi-lomi-en.md', 3, 'src/content/blog/hasawi-lomi-ar.md', 3],
  'lomi-faq': ['src/content/blog/hasawi-lomi-en.md', 18, 'src/content/blog/hasawi-lomi-ar.md', 18],
  'lomi-heading': ['src/content/blog/hasawi-lomi-en.md', 37, 'src/content/blog/hasawi-lomi-ar.md', 37],
  'lomi-body': ['src/content/blog/hasawi-lomi-en.md', 39, 'src/content/blog/hasawi-lomi-ar.md', 39],
  'history-72': ['src/content/blog/hasawi-lomi-history-en.md', 72, 'src/content/blog/hasawi-lomi-history-ar.md', 72],
  'history-86': ['src/content/blog/hasawi-lomi-history-en.md', 86, 'src/content/blog/hasawi-lomi-history-ar.md', 86],
  events: ['src/data/events.ts', 450, 'src/data/events.ts', 291],
  fruits: ['src/data/fruits.ts', 182, 'src/data/fruits.ts', 66],
};
const ITEMS = {
  de: { 'lomi-faq': ['src/content/blog/hasawi-lomi-de.md', 18], 'lomi-heading': ['src/content/blog/hasawi-lomi-de.md', 37],
    'lomi-body': ['src/content/blog/hasawi-lomi-de.md', 39], 'history-72': ['src/content/blog/hasawi-lomi-history-de.md', 72],
    'history-86': ['src/content/blog/hasawi-lomi-history-de.md', 86], events: ['src/data/events.ts', 809],
    fruits: ['src/data/fruits.ts', 538] },
  ru: { 'lomi-faq': ['src/content/blog/hasawi-lomi-ru.md', 18], 'lomi-heading': ['src/content/blog/hasawi-lomi-ru.md', 37],
    'lomi-body': ['src/content/blog/hasawi-lomi-ru.md', 39], 'history-86': ['src/content/blog/hasawi-lomi-history-ru.md', 86],
    events: ['src/data/events.ts', 733], fruits: ['src/data/fruits.ts', 419] },
  tr: { 'lomi-desc': ['src/content/blog/hasawi-lomi-tr.md', 3], 'lomi-faq': ['src/content/blog/hasawi-lomi-tr.md', 18],
    'lomi-heading': ['src/content/blog/hasawi-lomi-tr.md', 37], 'lomi-body': ['src/content/blog/hasawi-lomi-tr.md', 39],
    'history-72': ['src/content/blog/hasawi-lomi-history-tr.md', 72], 'history-86': ['src/content/blog/hasawi-lomi-history-tr.md', 86],
    fruits: ['src/data/fruits.ts', 772] },
};

for (const [lg, items] of Object.entries(ITEMS)) {
  const out = [];
  for (const [id, [file, n]] of Object.entries(items)) {
    const [enF, enN, arF, arN] = SRC[id];
    const text = line(cur(file), n);
    if (text !== line(base(file), n)) throw new Error(`${lg} ${id}: target line already differs from main`);
    out.push({ id, file, line: n, current: text,
      en_before: line(base(enF), enN), en_after: line(cur(enF), enN), ar: line(cur(arF), arN) });
  }
  const dir = `${lg}-translation/output/owner-rulings-1106e`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/pack.json`, JSON.stringify({ lang: lg, batch: 'owner-rulings-1106e', items: out }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${out.length} items`);
}
