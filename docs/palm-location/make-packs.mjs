// يولّد حزمة كل لغة (de · zh · ru · ur) لدفعة palm-location: موضعٌ واحد هو حقل place لفعالية «قرية النخيل».
// قرار إياد (2026-10-17): للقرية موقع ثابت (موسمية فيه)، برابط خرائط قدّمه؛ فصار المكان «حي محيرس، المبرز» بدل
// «واحة الأحساء». الموضع: current = حقل اللغة المنشور حرفياً، ومعه المصدر قبل التصحيح (الأساس) وبعده (الشجرة).
//   node docs/palm-location/make-packs.mjs <جذر الشجرة> [الأساس، مثل origin/main]
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'origin/main';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const esbuild = require('esbuild');
const DATA = 'src/data/events.ts';
// the transpiled module is loaded from a temporary file (no code built from strings)
const load = (src) => {
  const js = esbuild.transformSync(src, { loader: 'ts', format: 'cjs' }).code;
  const dir = mkdtempSync(path.join(os.tmpdir(), 'palm-location-'));
  const file = path.join(dir, 'events.cjs');
  writeFileSync(file, js, 'utf8');
  try { return require(file); } finally { rmSync(dir, { recursive: true, force: true }); }
};
const M0 = load(execFileSync('git', ['-C', R, 'show', BASE + ':' + DATA], { encoding: 'utf8', maxBuffer: 1 << 26 }));
const M1 = load(readFileSync(path.join(R, DATA), 'utf8'));
const ID = 'palm-village';
const ev = (M, L) => M['EVENTS_' + L].find((e) => e.id === ID);
const en0 = ev(M0, 'EN').place, en1 = ev(M1, 'EN').place, ar0 = ev(M0, 'AR').place, ar1 = ev(M1, 'AR').place;
if (en0 === en1 || ar0 === ar1) throw new Error('the source place did not change');
if (!ev(M1, 'EN').coords || !ev(M1, 'EN').map) throw new Error('the map link and coordinates are not in the branch');
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU', ur: 'UR' };
for (const lg of Object.keys(KEY)) {
  const e = ev(M1, KEY[lg]);
  if (!e?.place || e.place !== ev(M0, KEY[lg]).place) throw new Error(lg + ': the published place is missing or changed in this branch');
  const pack = {
    lang: lg, batch: 'palm-location',
    ruling: 'قرار إياد 2026-10-17: لقرية النخيل موقع ثابت، وهي موسمية فيه، برابط خرائط قدّمه (https://maps.app.goo.gl/vCS7hUUttJzbwAVTA → «قرية النخيل، 7317 عين منصور، حي محيرس، المبرز»). فصار حقل المكان «حي محيرس، المبرز» بدل «واحة الأحساء»، وصار للصفحة خريطة بإحداثيات الرابط.',
    positions: [{
      id: lg + '-ev-palm-place', file: DATA, field: 'TEXT_' + KEY[lg] + "['palm-village'].place",
      role: 'قيمة صف «الموقع» في قائمة حقائق صفحة الفعالية /' + lg + '/events/palm-village/ وفي بطاقتها في قائمة الفعاليات، وتدخل وصف الصفحة (meta description). نصّ خام، اسم مكان قصير على نمط حقول place الأخرى في الكتلة نفسها.',
      current: e.place,
      en_before: en0, en_after: en1,
      ar_before: ar0, ar_after: ar1,
      context: { name: e.name, org: e.org, season: e.season, sibling_places: Object.fromEntries(M1['EVENTS_' + KEY[lg]].filter((x) => x.id !== ID).map((x) => [x.id, x.place])) },
    }],
  };
  const out = path.join(R, lg + '-translation', 'output', 'palm-location');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log(lg + ': 1 position');
}
