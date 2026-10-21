// يولّد حزمة كل لغة (de · zh · ru · ur) لدفعة touch-click: قرار إياد (2026-10-21، ثانياً) أن يُطبَّق قرار «المس»
// (#211) على بقية نصوص «tap» في كل اللغات: map.lead.a · tmap.lead · plan.empty.d (src/i18n/ui.ts) وheroSum المطاعم
// (src/components/views/DiningView.astro). العربية تقول «اضغط»/«بضغطة» أصلاً فلم تتغيّر؛ الإنجليزية صارت «click or tap».
// لكل لغة كل سلسلة منشورة من الأربع (الموضع الذي فعلُه يصح للحالتين أصلاً يبقى بقرار يعلّله المترجم).
//   node docs/touch-click/make-packs.mjs <جذر الشجرة> [الأساس، مثل origin/main]
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'origin/main';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const esbuild = require('esbuild');
const show = (rel) => execFileSync('git', ['-C', R, 'show', BASE + ':' + rel], { encoding: 'utf8', maxBuffer: 1 << 26 });
const cur = (rel) => readFileSync(path.join(R, rel), 'utf8');

// ui.ts: the transpiled module is loaded from a temporary file (no code built from strings)
const UI = 'src/i18n/ui.ts';
const loadUi = (src) => {
  const js = esbuild.transformSync(src, { loader: 'ts', format: 'cjs' }).code;
  const dir = mkdtempSync(path.join(os.tmpdir(), 'touch-click-'));
  const file = path.join(dir, 'ui.cjs');
  writeFileSync(file, js, 'utf8');
  try { return require(file).ui; } finally { rmSync(dir, { recursive: true, force: true }); }
};
const U0 = loadUi(show(UI)), U1 = loadUi(cur(UI));

// DiningView.astro: one heroSum literal per language block, single-quoted on one line
const DV = 'src/components/views/DiningView.astro';
const langOf = (s) => (/[一-鿿]/.test(s) ? 'zh' : /[а-яё]/i.test(s) ? 'ru' : /^Ihr /.test(s) ? 'de' : /^Your /.test(s) ? 'en'
  : /[ہےۓکیگ]/.test(s) ? 'ur' : 'ar');
const heroSums = (src) => {
  const out = {};
  for (const l of src.split(/\r?\n/)) {
    const m = l.match(/^\s*heroSum: '((?:[^'\\]|\\.)*)',\s*$/);
    if (!m) continue;
    const v = m[1].replace(/\\(.)/g, '$1');
    const lg = langOf(v);
    if (out[lg]) throw new Error(DV + ': two heroSum lines for ' + lg);
    out[lg] = v;
  }
  return out;
};
const D0 = heroSums(show(DV)), D1 = heroSums(cur(DV));
for (const lg of ['ar', 'en', 'zh', 'de', 'ru', 'ur']) if (!D1[lg]) throw new Error(DV + ': no heroSum for ' + lg);

const KEYS = ['map.lead.a', 'tmap.lead', 'plan.empty.d'];
for (const k of KEYS) {
  if (U0.ar[k] !== U1.ar[k]) throw new Error('ar ' + k + ' changed — the Arabic source is not part of this batch');
  if (U0.en[k] === U1.en[k]) throw new Error('en ' + k + ' did not change');
}
if (D0.ar !== D1.ar || D0.en === D1.en) throw new Error('heroSum: ar must be unchanged and en changed');

const RULING = 'قرار إياد 2026-10-21 (ثانياً): يُطبَّق قرار فعل «المس» (#211، مقدمة خريطة الرئيسية) على بقية نصوص «tap» في كل اللغات — فعلٌ يصح للمس ونقرة الفأرة معاً. العربية تقول «اضغط»/«بضغطة» أصلاً فبقيت؛ والإنجليزية صارت «click or tap». السابقة: #211 أبقى 点击 الصينية و«Нажмите» الروسية لأنهما تصحان للحالتين، وغيّر «Tippen Sie … an» الألمانية و«چھو کر» الأوردية. المأمورية: الفعل وحده.';
const PAGES = { 'map.lead.a': '/<lg>/map/ (lead under the title; {n} is the count)', 'tmap.lead': '/<lg>/terrain-map/ (lead under the title)', 'plan.empty.d': '/<lg>/plan/ (the empty state of «My trip»)' };
for (const lg of ['de', 'zh', 'ru', 'ur']) {
  const positions = [];
  for (const k of KEYS) {
    const v = U1[lg]?.[k];
    if (!v) continue; // that page has no text in this language yet
    if (v !== U0[lg][k]) throw new Error(`${lg} ${k}: changed in this branch`);
    positions.push({ id: `${lg}-${k}`, file: UI, field: `ui.${lg}['${k}']`, ruling: RULING, role: 'Shown on ' + PAGES[k].replace('<lg>', lg) + '. One TS string, plain text, one line.',
      current: v, en_before: U0.en[k], en_after: U1.en[k], ar: U1.ar[k] });
  }
  if (D1[lg] !== D0[lg]) throw new Error(`${lg} heroSum: changed in this branch`);
  positions.push({ id: `${lg}-dining-heroSum`, file: DV, field: `heroSum (${lg} block)`, ruling: RULING, role: `Hero lead of /${lg}/restaurants-cafes/ (and the page description). One TS string, plain text, one line. Mission: the "one tap away" phrase only.`,
    current: D1[lg], en_before: D0.en, en_after: D1.en, ar: D1.ar });
  const out = path.join(R, lg + '-translation', 'output', 'touch-click');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, 'pack.json'), JSON.stringify({ lang: lg, batch: 'touch-click', date: '2026-10-22', positions }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${positions.map((p) => p.id.slice(3)).join(', ')}`);
}
