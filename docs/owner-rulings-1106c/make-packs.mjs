// يولّد حزم دفعة owner-rulings-1106c (zh · de · ru · ur · tr): مقدمة الخريطة التضاريسية (`tmap.lead`) كانت تقول «اضغط أي معلم
// في القائمة ليظهر على الخريطة»، والصفحة بخلافه: الاسم رابط لصفحة المعلم، والزرّ الذي بجانبه (`tmap.locate`) هو ما يُظهره على
// الخريطة (TerrainMapView.astro، terrain-map/index.ts). والمقدمة هي وصف الصفحة أيضاً، فلا تصلح لتعليمة واجهة (C72 يمنع تطويل
// الوصف): بقيت المقدمة بجملتها الوصفية، وانتقلت التعليمة المصحَّحة إلى مفتاح جديد `tmap.howto` يُعرض فقرةً تحتها.
// موضعان لكل لغة: `tmap.lead` (تُحذف الجملة الأخيرة وحدها) و`tmap.howto` (جديد).
//   node docs/owner-rulings-1106c/make-packs.mjs <جذر الشجرة> [الأساس، مثل HEAD]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { uiLine, lastSentence } from './lib.mjs';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'HEAD';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const F = 'src/i18n/ui.ts';
const show = execFileSync('git', ['-C', R, 'show', BASE + ':' + F], { encoding: 'utf8', maxBuffer: 1 << 26 });
const cur = readFileSync(path.join(R, F), 'utf8');
const RULING = 'SOURCE FIX 2026-11-06 (tr-static-1 source defect on ui.tmap.lead): the old instruction «tap any name in the list to see it on the map» does not match the page. In each list row the NAME is a link that opens the landmark\'s own page, and the small icon BUTTON beside it (its label is `locate`, shown as a tooltip) flies the map to the place. The lead is also the meta description, so the instruction leaves it: tmap.lead keeps its descriptive sentence(s) only, byte-identical, and the corrected instruction is the NEW key tmap.howto, shown as a second paragraph under the lead. Do not name the icon\'s shape; call it the button beside the name.';
for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) {
  const published = uiLine(show, lg, 'tmap.lead').value;
  const { head } = lastSentence(published);
  const ctx = { locate_label: uiLine(cur, lg, 'tmap.locate').value, list_title: uiLine(cur, lg, 'tmap.list.title').value };
  const P = [
    { id: `${lg}-tmap.lead`, file: F, kind: 'ui', key: 'tmap.lead',
      role: `Lead paragraph under the H1 of /${lg}/terrain-map/ and the page's meta description. One TS string.`, ruling: RULING,
      current: published, target: head,
      en_before: uiLine(show, 'en', 'tmap.lead').value, en_after: uiLine(cur, 'en', 'tmap.lead').value,
      ar_before: uiLine(show, 'ar', 'tmap.lead').value, ar_after: uiLine(cur, 'ar', 'tmap.lead').value },
    { id: `${lg}-tmap.howto`, file: F, kind: 'ui-new', key: 'tmap.howto', anchor: 'tmap.lead',
      role: `NEW KEY (current is empty). Second paragraph under the lead of /${lg}/terrain-map/: how to use the list. One TS string.`, ruling: RULING,
      current: '', en: uiLine(cur, 'en', 'tmap.howto').value, ar: uiLine(cur, 'ar', 'tmap.howto').value, ...ctx },
  ];
  if (P[0].en_before === P[0].en_after) throw new Error(lg + ': the source lead did not change');
  const dir = path.join(R, `${lg}-translation/output/owner-rulings-1106c`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch: 'owner-rulings-1106c', lang: lg, date: '2026-11-06', base: BASE, positions: P }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: lead -> …${head.slice(-40)}`);
}
