// يولّد حزمة كل لغة (de · zh · ru) لدفعة kafu-definition: موضعٌ واحد هو مدخل صفحة «ليالي كفو» المعتمد (events-amend،
// #186)، أُضيف إلى مصدره الإنجليزي جملةٌ أولى تعرّف الفعالية بقرار إياد (2026-10-17)، وصار للعربية مدخلٌ من الجملة
// نفسها وحدها. الموضع: current = مدخل اللغة المنشور حرفياً، ومعه المصدر قبل التصحيح (الأساس) وبعده (الشجرة).
//   node docs/kafu-definition/make-packs.mjs <جذر الشجرة> [الأساس، مثل origin/main]
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
  const dir = mkdtempSync(path.join(os.tmpdir(), 'kafu-definition-'));
  const file = path.join(dir, 'events.cjs');
  writeFileSync(file, js, 'utf8');
  try { return require(file); } finally { rmSync(dir, { recursive: true, force: true }); }
};
const M0 = load(execFileSync('git', ['-C', R, 'show', BASE + ':' + DATA], { encoding: 'utf8', maxBuffer: 1 << 26 }));
const M1 = load(readFileSync(path.join(R, DATA), 'utf8'));
const ID = 'kafu-nights';
const ev = (M, L) => M['EVENTS_' + L].find((e) => e.id === ID);
const en0 = ev(M0, 'EN').intro, en1 = ev(M1, 'EN').intro, ar0 = ev(M0, 'AR').intro ?? null, ar1 = ev(M1, 'AR').intro ?? null;
if (!en1 || en0 === en1) throw new Error('the English intro did not change');
if (!en1.endsWith(en0)) throw new Error('the English change is not a sentence added before the approved intro');
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU' };
for (const lg of ['de', 'zh', 'ru']) {
  const e = ev(M1, KEY[lg]);
  if (!e?.intro || e.intro !== ev(M0, KEY[lg]).intro) throw new Error(lg + ': the published intro is missing or changed in this branch');
  const pack = {
    lang: lg, batch: 'kafu-definition',
    ruling: 'قرار إياد 2026-10-17 (بعد #186، وقد سأل القرّاء في كل اللغات ما الفعالية): «مهرجان "ليالي كفو" هو مهرجان رمضاني ومجتمعي سنوي تُنظمه جامعة الملك فيصل في محافظة الأحساء، أول نسخة كانت سنة 2024». أُضيف جملةً أولى إلى المدخل الإنجليزي، وصار مدخل الصفحة العربية هذه الجملة وحدها (معنى الاسم والغبقة يبقى للقارئ غير العربي بقراره السابق).',
    positions: [{
      id: lg + '-ev-kafu-intro', file: DATA, field: 'TEXT_' + KEY[lg] + "['kafu-nights'].intro",
      role: 'الفقرة الافتتاحية لصفحة الفعالية /' + lg + '/events/kafu-nights/ تحت عنوانها. نصّ خام. المأمورية: الجملة الأولى الجديدة وحدها (الفرق بين en_before وen_after)؛ بقية المدخل المعتمد لا تُعاد صياغتها إلا لوصلٍ تفرضه الجملة الجديدة.',
      current: e.intro,
      en_before: en0, en_after: en1,
      ar_before: ar0, ar_after: ar1,
      context: { name: e.name, org: e.org, place: e.place, season: e.season },
    }],
  };
  const out = path.join(R, lg + '-translation', 'output', 'kafu-definition');
  mkdirSync(out, { recursive: true });
  writeFileSync(path.join(out, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', 'utf8');
  console.log(lg + ': 1 position');
}
