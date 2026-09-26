// node verify.mjs <BATCH_DIR> <file.json> — تحقّق آلي من مخرج مرحلة (zh · de · ru).
import fs from 'node:fs';
import path from 'node:path';

const [dir, file] = process.argv.slice(2);
const pack = JSON.parse(fs.readFileSync(path.join(dir, 'pack.json'), 'utf8'));
const lang = pack.lang;
let out;
try { out = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')); }
catch (e) { console.error('✗ JSON غير صالح أو ملف مفقود:', e.message); process.exit(1); }
const errs = [];
if (out.batch !== pack.batch) errs.push(`batch = ${out.batch} لا ${pack.batch}`);
if (!Array.isArray(out.notes)) errs.push('notes ليست مصفوفة');
if (!Array.isArray(out.termbase_additions)) errs.push('termbase_additions ليست مصفوفة');
const want = Object.keys(pack.strings), got = Object.keys(out.strings ?? {});
if (want.join('|') !== got.join('|')) errs.push(`المفاتيح/الترتيب لا تطابق pack.json (المطلوب ${want.length}، الموجود ${got.length})`);

const CJK = /[㐀-鿿]/;
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
for (const k of want) {
  const s = out.strings?.[k];
  if (typeof s !== 'string' || !s.trim()) { errs.push(`${k}: فارغ`); continue; }
  const src = pack.strings[k];
  if (/ /.test(s)) errs.push(`${k}: U+00A0`);
  if (/[٠-٩۰-۹]/.test(s)) errs.push(`${k}: رقم عربي-هندي (C4)`);
  if (/[؀-ۿ]/.test(s)) errs.push(`${k}: حرف عربي`);
  if (/\*\*|`|^#|\]\(/m.test(s)) errs.push(`${k}: محرف ماركداون`);
  for (const ph of ['{count}', '{names}']) if (src.en.includes(ph) !== s.includes(ph) || s.split(ph).length > 2) errs.push(`${k}: النائب ${ph} يجب أن يرد مرة واحدة كما في المصدر`);
  // «Ctrl» ثابتٌ إلا في الألمانية: لوحة المفاتيح الألمانية تكتبه «Strg» (ملاحظة القارئ الأعمى de-ui #17)
  for (const lit of ['info@visit-alahsa.com', 'visit-alahsa.com', 'name@example.com', '↗', 'Ctrl', '⌘', '1563']) if (src.en.includes(lit) && !s.includes(lit) && !(lit === 'Ctrl' && lang === 'de' && s.includes('Strg'))) errs.push(`${k}: سقط «${lit}» الثابت`);
  if (src.en.startsWith(src.en.match(/^\d+\./)?.[0] ?? '\u0000') && !s.startsWith(src.en.match(/^\d+\./)[0])) errs.push(`${k}: سقط ترقيم «${src.en.match(/^\d+\./)[0]}» في رأس العنوان`);
  // أرقامٌ متتالية فحسب: «9.2.1443» و«9/2/1443» و«1443/2/9» تُنتج الأرقام نفسها بأي فاصل يفرضه أسلوب اللغة
  const nums = (x) => x.match(/\d+/g) ?? [];
  const allowed = new Set([...nums(src.en), ...nums(src.ar)]);
  for (const [i, m] of MONTHS.entries()) if (src.en.includes(m)) allowed.add(String(i + 1));
  for (const n of nums(s)) if (!allowed.has(n)) errs.push(`${k}: الرقم ${n} لا يرد في المصدرين`);
  if (lang === 'zh') {
    if (!CJK.test(s) && !/^[\w@.\s↗⌘+]+$/.test(s)) errs.push(`${k}: لا حرف صينياً`);
    const half = s.match(/[㐀-鿿][,.;:!?()]|[,.;:!?()][㐀-鿿]/g);
    if (half) errs.push(`${k}: ترقيم لاتيني ملاصق لحرف صيني: ${[...new Set(half)].join(' ')}`);
    const tight = s.match(/[㐀-鿿][A-Za-z0-9]|[A-Za-z0-9][㐀-鿿]/g);
    if (tight) errs.push(`${k}: صيني ملاصق للاتيني/رقم بلا مسافة: ${[...new Set(tight)].slice(0, 6).join(' ')}`);
    if (/[㐀-鿿] [㐀-鿿]/.test(s)) errs.push(`${k}: مسافة بين حرفين صينيين`);
    if (/—/.test(s.replace(/——/g, ''))) errs.push(`${k}: شرطة مفردة — (الصينية ——)`);
  }
  if (lang === 'de') {
    if (/—/.test(s)) errs.push(`${k}: U+2014 (الألمانية U+2013 — C17)`);
    if (/\bSouqs?\b/.test(s)) errs.push(`${k}: Souq (الألمانية Souk — C18)`);
    if (/[“”]/.test(s) && !/„/.test(s)) errs.push(`${k}: علامات اقتباس إنجليزية (الألمانية „…“)`);
  }
  if (lang === 'ru') {
    if (/[А-Яа-яЁё]/.test(src.en) === false && !/[А-Яа-яЁё]/.test(s) && !/^[\w@.\s↗⌘+]+$/.test(s)) errs.push(`${k}: لا حرف سيريلياً`);
    if (/"/.test(s)) errs.push(`${k}: علامات "…" (الروسية «…»)`);
    if (/\s–\s/.test(s)) errs.push(`${k}: شرطة نطاق بمسافتين (الاعتراض U+2014)`);
    if (/Эль-Ахс|\bАль-(?!Ахс)/.test(s)) errs.push(`${k}: انقسام الأداة (C20: Аль-Ахса رأساً و Эль- لما عداه)`);
  }
}
for (const [i, t] of (out.termbase_additions ?? []).entries()) if (!t?.en || !(t?.[lang] || t?.zh || t?.de || t?.ru) || !t?.source) errs.push(`termbase_additions[${i}]: يلزم en و${lang} وsource`);
if (errs.length) { console.error(`✗ ${file}: ${errs.length} علّة`); for (const e of errs.slice(0, 40)) console.error(' -', e); process.exit(1); }
console.log(`✓ ${file}: ${want.length} سلسلة، ${(out.termbase_additions ?? []).length} مدخل معجم، ${out.notes.length} ملاحظة`);
