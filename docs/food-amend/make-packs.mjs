// يولّد حزمة كل لغة (de · zh · ru) لدفعة food-amend: لكل موضع النصّ الحالي الحرفي في اللغة،
// ومصدرُه الإنجليزي والعربي قبل تصحيح المصدر (main) وبعده (شجرة العمل).
//   node docs/food-amend/make-packs.mjs <جذر الشجرة> <الأساس، مثل origin/main>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'origin/main';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const esbuild = require('esbuild');
const DATA = 'src/data/dishes.ts', VIEW = 'src/components/views/FoodView.astro';
const now = (f) => readFileSync(path.join(R, f), 'utf8');
const then = (f) => execFileSync('git', ['-C', R, 'show', BASE + ':' + f], { encoding: 'utf8', maxBuffer: 1 << 26 });

const groups = (src) => {
  const js = esbuild.transformSync(src, { loader: 'ts', format: 'cjs' }).code;
  // the transpiled module is loaded from a temporary file (no code built from strings)
  const dir = mkdtempSync(path.join(os.tmpdir(), 'food-amend-'));
  const file = path.join(dir, 'dishes.cjs');
  writeFileSync(file, js, 'utf8');
  try { return require(file); } finally { rmSync(dir, { recursive: true, force: true }); }
};
// methodP2 of a block: the line `    methodP2: '…',` inside `const XX = {` (zh/de/ru) or `  ar: {` / `  en: {` in localize
const methodP2 = (src, head) => {
  const a = src.indexOf(head);
  if (a < 0) throw new Error('block not found: ' + head);
  const m = /\n\s*methodP2: '((?:[^'\\]|\\.)*)',/.exec(src.slice(a));
  return m[1].replace(/\\'/g, "'");
};

const DISHES = [[1, 'mandi', 'المندي — جملة صريحة أنه يُنضَج في تنور مدفون في حفرة بالأرض (N312، قرار إياد)'],
  [4, 'balaleet', 'البلاليط — تُقدَّم مع عجة البيض (قرار إياد)'],
  [5, 'asida', 'عصيدة التمر — لا زعفران فيها: اللمعان من السمن؛ وعصيدة ليّنة تُغرَف (قرار إياد)'],
  [6, 'sago', 'الساقو — يُطهى بالماء ويُحلّى بالسكر (قرار إياد)'],
  [7, 'date-bread', 'خبز التمر — تُحذف النقحرة «(khubz ahmar)» وحدها؛ الاسم المترجم للخبز الأحمر باقٍ على البطاقة (C5b)']];
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU' };

const G0 = groups(then(DATA)), G1 = groups(now(DATA));
const V0 = then(VIEW), V1 = now(VIEW);
for (const lg of ['de', 'zh', 'ru']) {
  const data = now(DATA), view = now(VIEW);
  const lines = (t) => t.split(/\r?\n/);
  const lineOf = (t, value) => {
    const L = lines(t); const hits = L.map((l, i) => (l.includes(value) ? i + 1 : 0)).filter(Boolean);
    if (hits.length !== 1) throw new Error(lg + ': value must stand on exactly one line (' + hits.length + ')');
    return hits[0];
  };
  const positions = [];
  for (const [i, slug, role] of DISHES) {
    const cur = G1['DISH_GROUPS_' + KEY[lg]][0].dishes[i].pre;
    const ln = lineOf(data, cur.replace(/'/g, "\\'"));
    positions.push({
      id: lg + '-food-' + slug, file: DATA, line: ln, field: 'DISH_GROUPS_' + KEY[lg] + '[0].dishes[' + i + '].pre',
      role: 'نبذة بطاقة الطبق في /' + lg + '/food/ — مطويّة حتى يُضغط زر البطاقة؛ نصّ خام لا ماركداون. ' + role,
      current: cur,
      en_before: G0.DISH_GROUPS_EN[0].dishes[i].pre, en_after: G1.DISH_GROUPS_EN[0].dishes[i].pre,
      ar_before: G0.DISH_GROUPS_AR[0].dishes[i].pre, ar_after: G1.DISH_GROUPS_AR[0].dishes[i].pre,
    });
  }
  const cur = methodP2(view, '\nconst ' + KEY[lg] + ' = {');
  positions.push({
    id: lg + '-food-methodP2', file: VIEW, line: lineOf(view, cur.replace(/'/g, "\\'")), field: KEY[lg] + '.methodP2',
    role: 'الفقرة الثانية من ملاحظة «حول هذه الصفحة» أسفل /' + lg + '/food/ — نصّ خام. قرار إياد: جملة «تُقدَّم أطباق هذه الصفحة في مطاعم الأحساء على مدار السنة» أولاً، ثم المناسبات الأربع (العدد والمناسبات كما هي)',
    current: cur,
    en_before: methodP2(V0, '\n  en: {'), en_after: methodP2(V1, '\n  en: {'),
    ar_before: methodP2(V0, '\n  ar: {'), ar_after: methodP2(V1, '\n  ar: {'),
  });
  for (const p of positions) if (p.en_before === p.en_after && p.ar_before === p.ar_after) throw new Error(p.id + ': the source did not change');
  const pack = {
    lang: lg, batch: 'food-amend',
    ruling: 'أجوبة إياد 2026-10-15 بعد #183 على صفحة الأكلات: المندي (تنور مدفون في حفرة) · العصيدة (لا زعفران، اللمعان من السمن؛ ليّنة تُغرَف) · الساقو (بالماء والسكر) · البلاليط (مع عجة البيض) · خبز التمر (تُحذف النقحرة) · methodP2 (السنة كلها أولاً). وباقٍ بلا تغيير: «طبق الكرم الأول» و«for long hours» في الهريس.',
    source_commit_base: BASE,
    positions,
  };
  const dir = path.join(R, lg + '-translation', 'output', 'food-amend');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log(lg + ': ' + positions.length + ' positions');
}
