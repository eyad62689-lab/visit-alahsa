// سجل انجراف الترجمة — القراءة والكتابة (المنطق النقي في drift.mjs).
//
//   node tools/translation/lock.mjs bootstrap [--rebuild]
//       يبني tools/translation/lock.json من الحالة الحالية: لكل معلم ولكل لغة تحمل body_<lang>
//       مدخلٌ موسومٌ baseline:true = «مُفترَض متزامناً، غير متحقَّق». افتراضياً يملأ **الفجوات
//       فقط** ولا يمسّ مدخلاً قائماً (كي لا يمحو تسجيلاً حقيقياً)؛ و--rebuild يعيد البناء كاملاً.
//   node tools/translation/lock.mjs record <slug_en> <lang>
//       يسجّل بصمة body_en الحالية لزوجٍ تُرجم لتوّه، بتاريخ اليوم وبلا baseline.
//
// سكربتات التطبيق تستورد recordFile لا تُنفّذ عملية فرعية:
//   import { recordFile } from '<root>/tools/translation/lock.mjs';  recordFile(fp, lang);
//
// المفتاح slug_en من ترويسة الملف لا من اسمه (tahimiyah-s.md يحمل tahimiyah-w).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { LANGS, enSha, byCode } from './drift.mjs';

export const ROOT = path.resolve(import.meta.dirname, '../..');
export const LOCK_PATH = path.join(ROOT, 'tools/translation/lock.json');
export const ATTRACTIONS_DIR = path.join(ROOT, 'src/content/attractions');

const KEYS = ['slug_en', 'body_en', ...LANGS.map((l) => `body_${l}`)];
const today = () => new Date().toISOString().slice(0, 10);

// قيمة حقل علوي من سطر واحد: «"..."» (مهروبة كـJSON) أو «'...'» أو سطر مجرّد. كتلة متعددة الأسطر
// (| أو > أو اقتباس لم يُغلق في السطر) تُرفض بصوت عالٍ: الحقول المترجمة كلها سطر واحد، وتخمينٌ
// هنا يعطي بصمة كاذبة بصمت.
function scalar(raw, where) {
  const v = raw.trim();
  if (v === '') return '';
  if (v[0] === '"') {
    if (v.length < 2 || v[v.length - 1] !== '"') throw new Error(`${where}: اقتباس مزدوج غير مغلق في السطر نفسه`);
    try { return JSON.parse(v); } catch (e) { throw new Error(`${where}: هروب غير مقروء — ${e.message}`); }
  }
  if (v[0] === "'") {
    if (v.length < 2 || v[v.length - 1] !== "'") throw new Error(`${where}: اقتباس مفرد غير مغلق في السطر نفسه`);
    return v.slice(1, -1).replace(/''/g, "'");
  }
  if (v[0] === '|' || v[0] === '>') throw new Error(`${where}: كتلة نصية (${v[0]}) غير مدعومة`);
  return v;
}

export function readFields(text, where = 'ملف') {
  const t = text.replace(/\r\n?/g, '\n');
  if (!t.startsWith('---\n')) throw new Error(`${where}: لا ترويسة`);
  const end = t.indexOf('\n---', 4);
  if (end < 0) throw new Error(`${where}: ترويسة غير مغلقة`);
  const out = {};
  for (const line of t.slice(4, end).split('\n')) {
    for (const k of KEYS) {
      if (line.startsWith(k + ':')) out[k] = scalar(line.slice(k.length + 1), `${where} ${k}`);
    }
  }
  return out;
}

// { slug_en: { file, body_en, body_zh?, ... } }
export function readAttractions(dir = ATTRACTIONS_DIR) {
  const out = {};
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.md')).sort(byCode)) {
    const fields = readFields(readFileSync(path.join(dir, f), 'utf8'), f);
    if (!fields.slug_en) throw new Error(`${f}: لا slug_en`);
    if (out[fields.slug_en]) throw new Error(`${f}: slug_en مكرر مع ${out[fields.slug_en].file}`);
    out[fields.slug_en] = { file: f, ...fields };
  }
  return out;
}

export function loadLock(p = LOCK_PATH) {
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : {};
}

// مفاتيح مرتّبة لثبات الفرق: المعالم أبجدياً، واللغات بترتيب LANGS، وحقول المدخل enSha ثم at ثم baseline.
export function saveLock(lock, p = LOCK_PATH) {
  const sorted = {};
  for (const slug of Object.keys(lock).sort(byCode)) {
    sorted[slug] = {};
    for (const lang of LANGS) {
      const e = lock[slug][lang];
      if (!e) continue;
      sorted[slug][lang] = e.baseline ? { enSha: e.enSha, at: e.at, baseline: true } : { enSha: e.enSha, at: e.at };
    }
  }
  writeFileSync(p, JSON.stringify(sorted, null, 2) + '\n');
}

const has = (v) => typeof v === 'string' && v.trim() !== '';

export function bootstrap({ rebuild = false, dir = ATTRACTIONS_DIR, lockPath = LOCK_PATH, date = today() } = {}) {
  const cur = readAttractions(dir);
  const lock = rebuild ? {} : loadLock(lockPath);
  const added = Object.fromEntries(LANGS.map((l) => [l, 0]));
  for (const [slug, a] of Object.entries(cur)) {
    for (const lang of LANGS) {
      if (!has(a[`body_${lang}`]) || lock[slug]?.[lang]) continue;
      (lock[slug] ??= {})[lang] = { enSha: enSha(a.body_en), at: date, baseline: true };
      added[lang]++;
    }
  }
  saveLock(lock, lockPath);
  return { added, total: Object.fromEntries(LANGS.map((l) => [l, Object.values(lock).filter((e) => e[l]).length])) };
}

// تسجيل زوج تُرجم لتوّه من ملف المعلم نفسه (يستعمله سكربت التطبيق بعد كتابة الملف).
export function recordFile(file, lang, { lockPath = LOCK_PATH, date = today() } = {}) {
  if (!LANGS.includes(lang)) throw new Error(`لغة غير مدعومة في القفل: ${lang}`);
  const f = readFields(readFileSync(file, 'utf8'), path.basename(file));
  if (!f.slug_en) throw new Error(`${file}: لا slug_en`);
  if (!has(f[`body_${lang}`])) throw new Error(`${file}: لا body_${lang} ليُسجَّل`);
  if (!has(f.body_en)) throw new Error(`${file}: لا body_en`);
  const lock = loadLock(lockPath);
  (lock[f.slug_en] ??= {})[lang] = { enSha: enSha(f.body_en), at: date };
  saveLock(lock, lockPath);
  return f.slug_en;
}

export function record(slug, lang, opts = {}) {
  const a = readAttractions(opts.dir ?? ATTRACTIONS_DIR)[slug];
  if (!a) throw new Error(`لا معلم slug_en=${slug}`);
  return recordFile(path.join(opts.dir ?? ATTRACTIONS_DIR, a.file), lang, opts);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd === 'bootstrap') {
    const r = bootstrap({ rebuild: args.includes('--rebuild') });
    console.log('أُضيف (baseline):', JSON.stringify(r.added));
    console.log('المجموع في القفل:', JSON.stringify(r.total));
  } else if (cmd === 'record' && args.length === 2) {
    const slug = record(args[0], args[1]);
    console.log(`سُجّل ${slug}/${args[1]} ببصمة body_en الحالية`);
  } else {
    console.error('الاستعمال: lock.mjs bootstrap [--rebuild] | lock.mjs record <slug_en> <lang>');
    process.exit(2);
  }
}
