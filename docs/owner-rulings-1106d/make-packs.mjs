// Builds <lg>-translation/output/owner-rulings-1106d/pack.json: each item carries the full published line,
// the English line before and after the source edit, and the Arabic line, so the translator returns
// exact { find, replace } edits on the line.
// Usage: node docs/owner-rulings-1106d/make-packs.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const line = (text, n) => text.split(/\r?\n/)[n - 1];
const cur = (f) => readFileSync(f, 'utf8');
const base = (f) => execFileSync('git', ['show', `origin/main:${f}`], { encoding: 'utf8', maxBuffer: 1 << 26 });

// [id, topic, file, line, en file, en line, ar file, ar line]
const SRC = {
  cave: ['src/content/blog/jabal-qarah-en.md', 20, 'src/content/blog/jabal-qarah-ar.md', 20],
  'crafts-desc': ['src/content/blog/crafts-en.md', 3, 'src/content/blog/crafts-ar.md', 3],
  'crafts-faq': ['src/content/blog/crafts-en.md', 15, 'src/content/blog/crafts-ar.md', 15],
  'crafts-body': ['src/content/blog/crafts-en.md', 22, 'src/content/blog/crafts-ar.md', 22],
  qaisariyah: ['src/content/attractions/qaisariyah.md', 45, 'src/content/attractions/qaisariyah.md', 158],
  'souvenirs-faq': ['src/content/blog/souvenirs-en.md', 15, 'src/content/blog/souvenirs-ar.md', 15],
  'souvenirs-list': ['src/content/blog/souvenirs-en.md', 30, 'src/content/blog/souvenirs-ar.md', 30],
  events: ['src/data/events.ts', 385, 'src/data/events.ts', 226],
  stores: ['src/data/stores-directory.en.json', 269, 'src/data/stores-directory.ar.json', 660],
};
const ITEMS = {
  zh: { cave: ['src/content/blog/jabal-qarah-zh.md', 20], 'crafts-desc': ['src/content/blog/crafts-zh.md', 3],
    'crafts-faq': ['src/content/blog/crafts-zh.md', 15], 'crafts-body': ['src/content/blog/crafts-zh.md', 22],
    qaisariyah: ['src/content/attractions/qaisariyah.md', 8], 'souvenirs-faq': ['src/content/blog/souvenirs-zh.md', 15],
    'souvenirs-list': ['src/content/blog/souvenirs-zh.md', 30], events: ['src/data/events.ts', 543],
    stores: ['src/data/stores-directory.zh.json', 269] },
  de: { cave: ['src/content/blog/jabal-qarah-de.md', 20], 'crafts-desc': ['src/content/blog/crafts-de.md', 3],
    'crafts-faq': ['src/content/blog/crafts-de.md', 15], 'crafts-body': ['src/content/blog/crafts-de.md', 22],
    qaisariyah: ['src/content/attractions/qaisariyah.md', 15], 'souvenirs-faq': ['src/content/blog/souvenirs-de.md', 15],
    'souvenirs-list': ['src/content/blog/souvenirs-de.md', 30], events: ['src/data/events.ts', 765],
    stores: ['src/data/stores-directory.de.json', 269] },
  ru: { cave: ['src/content/blog/jabal-qarah-ru.md', 20], 'crafts-desc': ['src/content/blog/crafts-ru.md', 3],
    'crafts-faq': ['src/content/blog/crafts-ru.md', 15], 'crafts-body': ['src/content/blog/crafts-ru.md', 22],
    qaisariyah: ['src/content/attractions/qaisariyah.md', 22], 'souvenirs-faq': ['src/content/blog/souvenirs-ru.md', 15],
    'souvenirs-list': ['src/content/blog/souvenirs-ru.md', 30], events: ['src/data/events.ts', 659],
    stores: ['src/data/stores-directory.ru.json', 269] },
  ur: { cave: ['src/content/blog/jabal-qarah-ur.md', 20], 'crafts-desc': ['src/content/blog/crafts-ur.md', 3],
    'crafts-faq': ['src/content/blog/crafts-ur.md', 15], 'crafts-body': ['src/content/blog/crafts-ur.md', 22],
    qaisariyah: ['src/content/attractions/qaisariyah.md', 29], 'souvenirs-faq': ['src/content/blog/souvenirs-ur.md', 15],
    'souvenirs-list': ['src/content/blog/souvenirs-ur.md', 30], events: ['src/data/events.ts', 872],
    stores: ['src/data/stores-directory.ur.json', 269] },
  tr: { cave: ['src/content/blog/jabal-qarah-tr.md', 20], 'crafts-desc': ['src/content/blog/crafts-tr.md', 3],
    'crafts-faq': ['src/content/blog/crafts-tr.md', 15], 'crafts-body': ['src/content/blog/crafts-tr.md', 22],
    qaisariyah: ['src/content/attractions/qaisariyah.md', 35], 'souvenirs-faq': ['src/content/blog/souvenirs-tr.md', 15],
    'souvenirs-list': ['src/content/blog/souvenirs-tr.md', 30], events: ['src/data/events.ts', 1005],
    stores: ['src/data/stores-directory.tr.json', 269] },
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
  const dir = `${lg}-translation/output/owner-rulings-1106d`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/pack.json`, JSON.stringify({ lang: lg, batch: 'owner-rulings-1106d', items: out }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${out.length} items`);
}
