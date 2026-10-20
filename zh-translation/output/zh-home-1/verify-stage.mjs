// node verify-stage.mjs <BATCH_DIR> <file.json>
// يتحقق آلياً من ملف مخرج مرحلة: البنية والمفاتيح والفقرات وسياج الأرقام والترقيم.
import fs from 'node:fs';
import path from 'node:path';

const [dir, file] = process.argv.slice(2);
const pack = JSON.parse(fs.readFileSync(path.join(dir, 'pack.json'), 'utf8'));
let out;
const errs = [];
try { out = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')); }
catch (e) { console.error('✗ JSON غير صالح أو ملف مفقود:', e.message); process.exit(1); }

if (out.batch !== pack.batch) errs.push(`batch = ${out.batch} لا ${pack.batch}`);
if (typeof out.stage !== 'number' && typeof out.stage !== 'string') errs.push('stage مفقود');
if (!Array.isArray(out.notes)) errs.push('notes ليست مصفوفة');
if (!Array.isArray(out.termbase_additions)) errs.push('termbase_additions ليست مصفوفة');
const want = Object.keys(pack.strings);
const got = Object.keys(out.strings ?? {});
if (want.join('|') !== got.join('|')) errs.push(`المفاتيح/الترتيب لا تطابق pack.json\n   المطلوب: ${want.join(' ')}\n   الموجود: ${got.join(' ')}`);

const CJK = /[㐀-鿿]/;
const ref = JSON.parse(fs.readFileSync(path.join(dir, 'ref.json'), 'utf8'));
// أسماء تُذكر في المصدر الإنجليزي بالصيغة نفسها: عناوين المسارات وأسماء المعالم الإنجليزية
const REFNAMES = [
  ...Object.values(ref.trails).filter((t) => t.en && t.zh),
  ...Object.values(ref.places).filter((p) => p && p.title_en && p.title_zh).map((p) => ({ en: p.title_en, zh: p.title_zh })),
];
for (const k of want) {
  const zh = out.strings?.[k];
  if (typeof zh !== 'string' || !zh.trim()) { errs.push(`${k}: فارغ أو ليس نصاً`); continue; }
  const src = pack.strings[k];
  if (/ /.test(zh)) errs.push(`${k}: U+00A0`);
  if (/[٠-٩۰-۹]/.test(zh)) errs.push(`${k}: رقم عربي-هندي (C4)`);
  if (/[؀-ۿ]/.test(zh)) errs.push(`${k}: حرف عربي في النص الصيني`);
  if (/\*|`|^#|\]\(|\[[^\]]*\]/m.test(zh)) errs.push(`${k}: محرف ماركداون`);
  if (/—/.test(zh) && !/——/.test(zh)) errs.push(`${k}: شرطة مفردة — (الصينية ——)`);
  // ترقيم نصف العرض ملاصق لحرف صيني
  const half = zh.match(/[㐀-鿿][,.;:!?()]|[,.;:!?()][㐀-鿿]/g);
  if (half) errs.push(`${k}: ترقيم لاتيني ملاصق لحرف صيني: ${[...new Set(half)].join(' ')}`);
  // أسلوب المتون الصينية المنشورة بلا استثناء (0 ملاصق · 267 بمسافة): مسافة بين الصيني واللاتيني/الرقم
  const tight = zh.match(/[㐀-鿿][A-Za-z0-9]|[A-Za-z0-9][㐀-鿿]/g);
  if (tight) errs.push(`${k}: صيني ملاصق للاتيني/رقم بلا مسافة: ${[...new Set(tight)].slice(0, 8).join(' ')}`);
  if (/[㐀-鿿] [㐀-鿿]/.test(zh)) errs.push(`${k}: مسافة بين حرفين صينيين`);
  if (!CJK.test(zh) && !src.allowNoCJK) errs.push(`${k}: لا حرف صينياً`);
  // أرقام صينية مكتوبة حروفاً مخالفة لقاعدة الموقع (الأرقام لاتينية) حيث أجاز المنسّق الرقم
  if (src.allowNums && /[一二三四五六七八九十百两]/.test(zh) && !/[0-9]/.test(zh)) errs.push(`${k}: الرقم يُكتب لاتينياً (${src.allowNums.join('/')})`);
  // عناوين القوالب وفقرات المرافقين: كل اسم منشور في ref.json يرد حرفاً إن ذكره المصدر الإنجليزي
  for (const n of REFNAMES) if (src.en.includes(n.en) && !zh.includes(n.zh)) errs.push(`${k}: «${n.en}» يجب أن يرد بصيغته المنشورة «${n.zh}»`);
  // سياج الأرقام: كل عدد في الصينية يرد في الإنجليزية أو العربية
  const nums = (s) => (s.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace(/,/g, ''));
  const allowed = new Set([...nums(src.en), ...nums(src.ar), ...(src.allowNums ?? [])]);
  // أرقام الأشهر (5 月) تنقل اسم شهرٍ في المصدر — مسموحة متى سمّى المصدر الإنجليزي شهراً
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  for (const [i, m] of MONTHS.entries()) if (new RegExp(`\\b${m}\\b`).test(src.en)) allowed.add(String(i + 1));
  for (const n of nums(zh)) if (!allowed.has(n)) errs.push(`${k}: الرقم ${n} لا يرد في المصدرين`);
}
for (const [i, t] of (out.termbase_additions ?? []).entries()) {
  if (!t?.en || !t?.zh || !t?.source) errs.push(`termbase_additions[${i}]: يلزم en و zh و source`);
}

if (errs.length) { console.error(`✗ ${file}: ${errs.length} علّة`); for (const e of errs) console.error(' -', e); process.exit(1); }
console.log(`✓ ${file}: ${want.length} سلسلة، ${(out.termbase_additions ?? []).length} مدخل معجم، ${out.notes.length} ملاحظة`);
