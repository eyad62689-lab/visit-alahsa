// يولّد حزم دفعة flagged-fixes (de · zh · ru): قرار إياد (2026-10-21، ثانياً) أن تُصحَّح بخط كل لغة الأخطاءُ اللغوية
// الصريحة التي علّمها القرّاء العميان في نصوص منشورة خارج دفعتَي 7st-touch وtouch-click، وأن يذهب ما يحتاج شرحاً إلى
// المصدر أولاً. والمصدر هنا: «الحزام الذهبي» منطقة (إياد 2026-10-22) — «في حي السلام بمنطقة الحزام الذهبي» /
// "in the Al-Salam district of the Golden Belt area". ما هو أسلوب لا خطأ (stetig weiter، 民间风味، народных блюд…) خارج الدفعة.
//   node docs/flagged-fixes/make-packs.mjs <جذر الشجرة> [الأساس، مثل origin/main]
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'origin/main';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const esbuild = require('esbuild');
const yaml = require('js-yaml');
const show = (rel) => execFileSync('git', ['-C', R, 'show', BASE + ':' + rel], { encoding: 'utf8', maxBuffer: 1 << 26 });
const cur = (rel) => readFileSync(path.join(R, rel), 'utf8');

const UI = 'src/i18n/ui.ts';
const loadUi = (src) => {
  const js = esbuild.transformSync(src, { loader: 'ts', format: 'cjs' }).code;
  const dir = mkdtempSync(path.join(os.tmpdir(), 'flagged-fixes-'));
  const file = path.join(dir, 'ui.cjs');
  writeFileSync(file, js, 'utf8');
  try { return require(file).ui; } finally { rmSync(dir, { recursive: true, force: true }); }
};
const U = loadUi(cur(UI));
const MD = 'src/content/dining/7st.md';
const splitMd = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return { fm: yaml.load(m[1]), body: m[2].trim() };
};
const D0 = splitMd(show(MD)), D1 = splitMd(cur(MD));
if (D0.fm.body_en === D1.fm.body_en || D0.body === D1.body) throw new Error('7st: the source Golden Belt phrase did not change');

const RULE = 'قرار إياد 2026-10-21 (ثانياً): ما علّمه القرّاء العميان من أخطاء لغوية صريحة في النص المنشور يُصحَّح بخط لغته، وما يحتاج شرحاً يذهب إلى المصدر أولاً. المأمورية: الخطأ المسمّى وحده؛ كل ما عداه حرفياً.';
const body7 = (lg, flags) => ({ id: `${lg}-7st-body`, file: MD, field: 'body_' + lg, ruling: RULE,
  flagged: [...flags, 'SOURCE CHANGE (owner 2026-10-22: the Golden Belt is an area): ar «في حي السلام بالحزام الذهبي» → «في حي السلام بمنطقة الحزام الذهبي»; en "in the Al-Salam district on the Golden Belt" → "in the Al-Salam district of the Golden Belt area". Render it as an area name in your language.'],
  role: `Body of /${lg}/restaurants-cafes/7st/. YAML double-quoted, plain text.`,
  current: D1.fm['body_' + lg], en_before: D0.fm.body_en, en_after: D1.fm.body_en, ar_before: D0.body, ar_after: D1.body });
const ui = (lg, key, flags, role) => ({ id: `${lg}-${key}`, file: UI, field: `ui.${lg}['${key}']`, ruling: RULE, flagged: flags, role,
  current: U[lg][key] ?? '', en: U.en[key], ar: U.ar[key] });

const PACKS = {
  de: [
    body7('de', ['blind reader 7st-touch #2: «im Al-Salam-Viertel an „Golden Belt“» — wrong preposition (an + name without article)', 'blind reader 7st-touch #3: «7st Al-Bait, den neben dem Palast» — elliptical; the palace is Qasr Ibrahim, named earlier in the body']),
    ui('de', 'map.lead.a', ['blind reader touch-click #1: «suchen Sie oder wählen Sie eine Kategorie» — «suchen Sie» has no object'], 'Lead of /de/map/ ({n} = the count). One TS string.'),
    ui('de', 'tmap.lead', ['blind reader touch-click #2: «um ihn auf der Karte zu sehen» — «ihn» points to the name, not the place'], 'Lead of /de/terrain-map/. One TS string.'),
    ui('de', 'foot.l.visa', ['blind reader 7st-touch #9: the German footer shows "Visa guide" in English — the key is missing in the de block, so it falls back to English'], 'NEW KEY (current is empty = missing). Footer link label to /de/visa-guide/ (the German visa guide page exists). Name it as the German page names itself — read its German title (grep src for the de visa guide data) and the other footer labels in the de block.'),
    ui('de', 'plan.visa', ['same missing key on the plan page button (falls back to "Visa guide")'], 'NEW KEY (current is empty = missing). Button label on /de/plan-your-trip/ linking to /de/visa-guide/. Same wording as foot.l.visa unless the button needs a verb (check the other languages: ar «دليل التأشيرات», ru «Как получить визу»).'),
  ],
  zh: [body7('zh', ['blind reader 7st-touch #2: 紧邻城堡的 7st Al-Bait — 城堡 is unidentified; it is 易卜拉欣宫, named earlier in the body', 'blind reader 7st-touch #3: 黄金地带 unclear (a place name or "prime location"?)'])],
  ru: [
    body7('ru', ['blind reader 7st-touch #2: «Кофейня улицы №7» reads as a café belonging to the street (the name means "Street 7 Café")', 'blind reader 7st-touch #4: «Золотой пояс» unexplained']),
    ui('ru', 'search.escHint', ['blind reader 7st-touch #9: «Esc закрыть · стрелки — переход · Enter — открыть» — the dash after the key is missing in the first item only (the hint renders as "<kbd>Esc</kbd> " + this string)'], 'Search dialog footer hint, rendered after a <kbd>Esc</kbd> key. One TS string.'),
  ],
};
for (const [lg, positions] of Object.entries(PACKS)) {
  for (const p of positions) if (p.id.endsWith('-7st-body') ? !p.current : p.current === undefined) throw new Error(p.id + ': no published text');
  const out = path.join(R, lg + '-translation', 'output', 'flagged-fixes');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, 'pack.json'), JSON.stringify({ lang: lg, batch: 'flagged-fixes', date: '2026-10-22', positions }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${positions.map((p) => p.id.slice(3) + (p.current ? '' : ' (new)')).join(', ')}`);
}
