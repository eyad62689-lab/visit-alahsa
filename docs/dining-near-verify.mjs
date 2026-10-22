// تحقق مستقل من dist لحقل near في المنشآت: في صفحات 7st بلغاتها الخمس، قسم «معالم قريبة» يربط قصر إبراهيم وعنوانه
// det.nearby.h بلغته (لا «… في {الحي}»)، ومعالم الحيّ (سوق الحميدية) باقية؛ وصفحة منشأة بلا near لا يتغيّر عنوانها.
//   node docs/dining-near-verify.mjs <root> [--break]
// --break: يكسر نسخةً في الذاكرة (يحذف رابط القصر، ويعيد عنوان الحي) ويشترط أن يُمسك الفاحص كل كسر — لا يمسّ dist.
import { readFileSync } from 'node:fs';
import path from 'node:path';

const R = process.argv[2];
const BREAK = process.argv.includes('--break');
if (!R) { console.error('usage: dining-near-verify.mjs <root> [--break]'); process.exit(2); }
const read = (rel) => readFileSync(path.join(R, 'dist', rel), 'utf8');
const sec = (html) => html.match(/<section class="dd-panel dd-sights"[\s\S]*?<\/section>/)?.[0] ?? '';
// the approved det.nearby.h of each language (src/i18n/ui.ts)
const H = { ar: 'أكمل يومك', en: 'Complete your day', zh: '让这一天更完整', de: 'Den Tag abrunden', ru: 'Дополните свой день' };
const PAGES = [
  ['ar', 'مطاعم-ومقاهي/مقهى-شارع-7/index.html', '/معالم/قصر-إبراهيم/', '/معالم/سوق-الحميدية/'],
  ['en', 'en/restaurants-cafes/7st/index.html', '/en/attractions/qasr-ibrahim/', '/en/attractions/hamidiyah-souq/'],
  ...['zh', 'de', 'ru'].map((l) => [l, `${l}/restaurants-cafes/7st/index.html`, `/${l}/attractions/qasr-ibrahim/`, `/${l}/attractions/hamidiyah-souq/`]),
];
const checks = PAGES.map(([l, rel, palace, souq]) => ({ label: `${l} 7st`, rel, test: (h) => { const s = sec(h); return s.includes(`href="${palace}"`) && s.includes(`href="${souq}"`) && s.includes(`>${H[l]}</h2>`); } }));
// an eatery without near keeps the district heading
checks.push({ label: 'en baithana (no near)', rel: 'en/restaurants-cafes/baithana/index.html', test: (h) => { const s = sec(h); return !s || (s.includes('Sights nearby in') && !s.includes('Complete your day')); } });

const run = (get) => checks.filter((c) => { const ok = c.test(get(c.rel)); if (!BREAK) console.log(`${ok ? 'ok  ' : 'FAIL'} ${c.label}`); return !ok; }).length;
const bad = run(read);
if (bad) { console.error(`FAIL ${bad}`); process.exit(1); }
console.log(`ALL PASS ${checks.length}/${checks.length}`);
if (BREAK) {
  let caught = 0, tried = 0;
  for (const [l, rel, palace] of PAGES) {
    for (const [what, f] of [['palace link removed', (h) => h.replace(`href="${palace}"`, 'href="/x/"')], ['district heading back', (h) => h.replace(`>${H[l]}</h2>`, '>X in Y</h2>')]]) {
      tried++;
      if (run((r) => (r === rel ? f(read(r)) : read(r))) > 0) caught++; else console.error(`NOT CAUGHT: ${l} ${what}`);
    }
  }
  console.log(`break: ${caught}/${tried} caught`);
  if (caught !== tried) process.exit(1);
}
