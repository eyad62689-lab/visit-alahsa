// يولّد حزمة كل لغة (de · zh · ru) لدفعة events-amend: موضعٌ واحد هو مدخل صفحة «ليالي كفو» (intro) الذي أُضيف
// إلى المصدر الإنجليزي بقرار إياد (2026-10-17)، ولا مقابل عربي له بقراره («أبقِ العربية كما هي»).
// الموضع جديد: current = '' (لا نصّ منشور في اللغة)، ومعه نصوص الفعالية المعتمدة في اللغة سياقاً.
//   node docs/events-amend/make-packs.mjs <جذر الشجرة>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import { createRequire } from 'node:module';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]);
if (!R) { console.error('usage: make-packs.mjs <root>'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const esbuild = require('esbuild');
const DATA = 'src/data/events.ts';
const src = readFileSync(path.join(R, DATA), 'utf8');
// the transpiled module is loaded from a temporary file (no code built from strings)
const js = esbuild.transformSync(src, { loader: 'ts', format: 'cjs' }).code;
const dir = mkdtempSync(path.join(os.tmpdir(), 'events-amend-'));
const file = path.join(dir, 'events.cjs');
writeFileSync(file, js, 'utf8');
let M;
try { M = require(file); } finally { rmSync(dir, { recursive: true, force: true }); }

const ID = 'kafu-nights';
const en = M.EVENTS_EN.find((e) => e.id === ID), ar = M.EVENTS_AR.find((e) => e.id === ID);
if (!en?.intro) throw new Error('the English source has no intro for ' + ID);
if (ar?.intro) throw new Error('the Arabic source carries an intro for ' + ID + ': the owner decided it has none');
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU' };
for (const lg of ['de', 'zh', 'ru']) {
  const ev = M['EVENTS_' + KEY[lg]].find((e) => e.id === ID);
  if (!ev) throw new Error(lg + ': no ' + ID);
  if (ev.intro) throw new Error(lg + ': ' + ID + ' already carries an intro');
  const pack = {
    lang: lg, batch: 'events-amend',
    ruling: 'قرار إياد 2026-10-17: «ليالي» جمع ليلة، و«كفو» من «كوفئ» (الشرح المعتمد: نال المكافأة والثناء)؛ و«الغبقة» وجبة وعادة اجتماعية شعبية تُقام في ليالي شهر رمضان المبارك في دول الخليج العربي. يُشرح للقارئ غير العربي وحده: أُضيف مدخلٌ إلى صفحة الفعالية في المصدر الإنجليزي، والعربية تبقى بلا مدخل بقراره (الاسم مفهوم للعربي).',
    positions: [{
      id: lg + '-ev-kafu-intro', file: DATA, field: 'TEXT_' + KEY[lg] + "['kafu-nights'].intro",
      role: 'الفقرة الافتتاحية لصفحة الفعالية /' + lg + '/events/kafu-nights/ تحت عنوانها مباشرة (حقل جديد: لا نصّ منشور قبله). نصّ خام لا ماركداون. ترجمة الإنجليزية وحدها — لا مقابل عربي بقرار إياد، فلا يُستورد شيء ولا يُضاف.',
      current: '',
      en_before: null, en_after: en.intro,
      ar_before: null, ar_after: null,
      context: { name: ev.name, place: ev.place, season: ev.season, time: ev.time, span: ev.span, org: ev.org, acts: ev.acts, en_acts: en.acts },
    }],
  };
  const out = path.join(R, lg + '-translation', 'output', 'events-amend');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log(lg + ': 1 position');
}
