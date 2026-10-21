// يولّد حزمة كل لغة (de · zh · ru · ur) لدفعة 7st-touch، وفيها قراران لإياد (2026-10-21):
//   (1) مقهى شارع 7 في حي الرفعة الشمالية بجوار قصر إبراهيم، وهو فرع «البيت» — فسقط من المتن «في الكوت القديم»
//       وصارت فقرة الكوت حيّاً مجاوراً لا حيَّ المقهى. الموضع: body_<lg> في src/content/dining/7st.md (de · zh · ru؛
//       لا متن أوردياً للصفحة بعد).
//   (2) فعل «المس» في مقدمة فصل الخريطة بالرئيسية صار فعلاً يصح للمس ونقرة الفأرة معاً («اضغط على معلمٍ» /
//       «Open one»). الموضع: HOME_COPY.<lg>.map.lead في src/data/home-copy.ts (اللغات الأربع).
// لكل موضع: current = المنشور حرفياً، ومعه المصدر قبل التصحيح (الأساس) وبعده (الشجرة).
//   node docs/7st-touch/make-packs.mjs <جذر الشجرة> [الأساس، مثل origin/main]
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

// home-copy.ts: the transpiled module is loaded from a temporary file (no code built from strings)
const HOME = 'src/data/home-copy.ts';
const loadHome = (src) => {
  const js = esbuild.transformSync(src, { loader: 'ts', format: 'cjs' }).code;
  const dir = mkdtempSync(path.join(os.tmpdir(), '7st-touch-'));
  const file = path.join(dir, 'home-copy.cjs');
  writeFileSync(file, js, 'utf8');
  try { return require(file).HOME_COPY; } finally { rmSync(dir, { recursive: true, force: true }); }
};
const H0 = loadHome(show(HOME)), H1 = loadHome(cur(HOME));

// 7st.md: frontmatter by js-yaml, the Arabic body after the closing fence
const MD = 'src/content/dining/7st.md';
const splitMd = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(MD + ': no frontmatter');
  return { fm: yaml.load(m[1]), body: m[2].trim() };
};
const D0 = splitMd(show(MD)), D1 = splitMd(cur(MD));

if (H0.ar.map.lead === H1.ar.map.lead || H0.en.map.lead === H1.en.map.lead) throw new Error('the source map lead did not change');
if (D0.body === D1.body || D0.fm.body_en === D1.fm.body_en) throw new Error('the source 7st body did not change');

const RULING_7ST = 'قرار إياد 2026-10-21: مقهى شارع 7 (7st) في حي الرفعة الشمالية بالهفوف، بجوار قصر إبراهيم، وهو فرع «شارع 7 البيت» (يوافق حقل الحي في البطاقة وعنوان رابط الخرائط «حي الرفعة الشمالية، الهفوف»). فسقط من المتن «في الكوت القديم»، وصار حي الكوت في الفقرة الأخيرة حيّاً مجاوراً للمقهى («ويجاور المقهى حيَّ الكوت، أقدم أحياء الهفوف، الذي يضم…») لا الحيَّ الذي يقوم فيه. لا شيء غير ذلك تغيّر في المصدر.';
const RULING_TOUCH = 'قرار إياد 2026-10-21: فعل «المس» في مقدمة فصل الخريطة لا يناسب زائر الحاسوب، فيُغيَّر في كل اللغات إلى فعل يصح للمس ونقرة الفأرة معاً. المصدر: «اضغط على معلمٍ لتراه» / «Open one to see it». عنوان الفصل نفسه فعله «اختر» (Choose)، فلا يُكرَّر فعل الاختيار في المقدمة. إن كان فعل لغتك المنشور يصح للحالتين أصلاً فأبقِه وعلّل.';

const KEY = ['de', 'zh', 'ru', 'ur'];
for (const lg of KEY) {
  const positions = [];
  if (lg !== 'ur') {
    const f = 'body_' + lg;
    if (!D1.fm[f] || D1.fm[f] !== D0.fm[f]) throw new Error(lg + ': the published 7st body is missing or changed in this branch');
    positions.push({
      id: lg + '-7st-body', file: MD, field: f, ruling: RULING_7ST,
      role: 'متن صفحة المنشأة /' + lg + '/restaurants-cafes/7st/ (الصفحة المفردة). نصّ خام في حقل YAML بين علامتي تنصيص مزدوجتين؛ لا روابط ولا تشديد. المأمورية: موضعا الحي وحدهما (جملة الموقع، وجملة حي الكوت)، وكل ما عداهما يبقى حرفياً.',
      current: D1.fm[f],
      en_before: D0.fm.body_en, en_after: D1.fm.body_en,
      ar_before: D0.body, ar_after: D1.body,
      context: { name: D1.fm.name, name_en: D1.fm.name_en, area: D1.fm['area_' + lg] ?? null, area_en: D1.fm.area_en },
    });
  }
  if (H1[lg].map.lead !== H0[lg].map.lead) throw new Error(lg + ': the published map lead changed in this branch');
  positions.push({
    id: lg + '-home-map-lead', file: HOME, field: 'HOME_COPY.' + lg + '.map.lead', ruling: RULING_TOUCH,
    role: 'مقدمة فصل الخريطة في الرئيسية /' + lg + '/ تحت عنوانه. سلسلة TS مفردة، نصّ خام، سطر واحد. المأمورية: الفعل وحده.',
    current: H1[lg].map.lead,
    en_before: H0.en.map.lead, en_after: H1.en.map.lead,
    ar_before: H0.ar.map.lead, ar_after: H1.ar.map.lead,
    context: { title: H1[lg].map.title, title_en: H1.en.map.title, title_ar: H1.ar.map.title },
  });
  const pack = { lang: lg, batch: '7st-touch', date: '2026-10-21', positions };
  const out = path.join(R, lg + '-translation', 'output', '7st-touch');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log(lg + ': ' + positions.length + ' position(s)');
}
