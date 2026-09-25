// يولّد de.json / zh.json / ru.json بالنصّ الحالي الحرفي من المستودع.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2];
const HERE = dirname(fileURLToPath(import.meta.url));
if (!R) { console.error('مرّر جذر الشجرة'); process.exit(1); }

const ROLE = {
  'hasawi-lomi:3': 'وصف الصفحة (meta description) — يظهر في نتائج البحث',
  'hasawi-lomi:18': 'جواب سؤال «ما هو الجميد؟» — يُصدَّر في FAQPage JSON-LD (نتائج قوقل)',
  'hasawi-lomi:37': 'عنوان H2 في المقال',
  'hasawi-lomi:39': 'فقرة المتن تحت العنوان (ماركداون مُصيَّر)',
  'events:*': 'فقرة في قسم «ما هو اللومي الأحسائي؟» بصفحة معرض اللومي — نصّ خام لا ماركداون',
  'fruits:*': 'نبذة اللومي في صفحة «ثمار الواحة» — نصّ خام لا ماركداون',
};

const SPEC = {
  de: [['src/content/blog/hasawi-lomi-de.md', [18, 37, 39]], ['src/data/events.ts', [658]], ['src/data/fruits.ts', [538]]],
  zh: [['src/content/blog/hasawi-lomi-zh.md', [3, 18, 37, 39]], ['src/data/events.ts', [447]], ['src/data/fruits.ts', [301]]],
  ru: [['src/content/blog/hasawi-lomi-ru.md', [18, 37, 39]], ['src/data/events.ts', [584]], ['src/data/fruits.ts', [419]]],
};

// المرجع المُسنَد من الجار المنشور (السطر 86 من مقال التاريخ)
const NEIGHBOUR = { de: null, zh: null, ru: null };
for (const lg of ['de', 'zh', 'ru']) {
  const L = readFileSync(`${R}/src/content/blog/hasawi-lomi-history-${lg}.md`, 'utf8').split(/\r?\n/);
  NEIGHBOUR[lg] = L[85].trim();
}

for (const [lg, files] of Object.entries(SPEC)) {
  const positions = [];
  for (const [f, lines] of files) {
    const L = readFileSync(`${R}/${f}`, 'utf8').split(/\r?\n/);
    const base = f.includes('hasawi-lomi') ? 'hasawi-lomi' : f.includes('events') ? 'events' : 'fruits';
    for (const n of lines) {
      positions.push({
        id: `${lg}-${base}-${n}`,
        file: f,
        line: n,
        role: ROLE[`${base}:${n}`] || ROLE[`${base}:*`],
        current: L[n - 1],
      });
    }
  }
  const pack = {
    lang: lg,
    batch: 'jameed-fix',
    ruling: 'الجميد = عصير اللومي المشمّس المعتّق (قرار إياد 2026-09-25) — لا الثمرة المشمّسة',
    neighbour_approved: {
      file: `src/content/blog/hasawi-lomi-history-${lg}.md`,
      line: 86,
      text: NEIGHBOUR[lg],
      note: 'منشورٌ ومُسنَد (أخبار 24). لا يُمسّ — يُستورد منه الصوغ.',
    },
    positions,
  };
  writeFileSync(`${HERE}/${lg}.json`, JSON.stringify(pack, null, 2), 'utf8');
  console.log(`${lg}.json — ${positions.length} موضعاً`);
}
