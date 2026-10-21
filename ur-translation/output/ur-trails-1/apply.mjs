// node apply.mjs <REPO> <BATCH_DIR> <file.json> — يكتب نصوص دفعة المسارات الأوردية: src/data/trails.ur.json
// (بمفاتيح trails.json نفسها وترتيبها) ومفاتيح الواجهة trails.* في كتلة ur من ui.ts. قابل للإعادة.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const pack = JSON.parse(fs.readFileSync(path.join(DIR, 'pack.json'), 'utf8'));
if (pack.lang !== 'ur') throw new Error('دفعة غير أوردية');
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const need = (k) => { if (typeof Z[k] !== 'string' || !Z[k].trim()) throw new Error(`مفتاح ناقص: ${k}`); return Z[k]; };
for (const k of Object.keys(pack.strings)) need(k);

// 1) trails.ur.json — البنية نفسها لملفات zh/de/ru
const T = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/trails.json'), 'utf8'));
const out = {
  meta: { attribution: need('meta.attribution'), unescoNote: need('meta.unescoNote') },
  seoDesc: need('seoDesc'),
  listSep: need('listSep'),
  sources: Object.fromEntries(Object.keys(T.sources).map((k) => [k, need(`sources.${k}`)])),
  trails: Object.fromEntries(T.trails.map((t) => [t.slug, {
    title: need(`trails.${t.slug}.title`),
    tagline: need(`trails.${t.slug}.tagline`),
    intro: need(`trails.${t.slug}.intro`),
    stops: Object.fromEntries(t.stops.map((s) => [s.key, { name: need(`trails.${t.slug}.stops.${s.key}.name`), text: need(`trails.${t.slug}.stops.${s.key}.text`) }])),
  }])),
};
const ru = fs.readFileSync(path.join(REPO, 'src/data/trails.ru.json'), 'utf8');
const eol = ru.includes('\r\n') ? '\r\n' : '\n';
fs.writeFileSync(path.join(REPO, 'src/data/trails.ur.json'), JSON.stringify(out, null, 2).replace(/\n/g, eol) + eol);

// 2) ui.ts — مفاتيح trails.* قبل إغلاق كتلة ur (آخر كتلة في الملف)
const uiPath = path.join(REPO, 'src/i18n/ui.ts');
const raw = fs.readFileSync(uiPath, 'utf8');
const crlf = raw.includes('\r\n');
let s = raw.replace(/\r\n/g, '\n');
const urAt = s.indexOf('\n  ur: {\n');
if (urAt < 0 || s.indexOf('\n  ur: {\n', urAt + 1) >= 0) throw new Error('كتلة ur غير فريدة');
const endMark = '\n  } as Record<string, string>,\n} as const;';
const endAt = s.indexOf(endMark, urAt);
if (endAt < 0) throw new Error('إغلاق كتلة ur');
let block = s.slice(urAt, endAt);
const q = (v) => `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const uiKeys = Object.keys(pack.strings).filter((k) => k.startsWith('ui.')).map((k) => k.slice(3));
// إعادة التشغيل: إزالة الكتلة السابقة بتعليقها وأسطرها
block = block.replace(/\n    \/\/ المسارات المقترحة — دفعة ur-trails-1[^\n]*(\n    '[^']+': '(?:[^'\\]|\\.)*',)*/, '');
for (const k of uiKeys) if (block.includes(`\n    '${k}':`)) throw new Error(`المفتاح موجود سلفاً في ur: ${k}`);
block += `\n    // المسارات المقترحة — دفعة ur-trails-1 (خط ur-translation-pipeline)` + uiKeys.map((k) => `\n    '${k}': ${q(need(`ui.${k}`))},`).join('');
s = s.slice(0, urAt) + block + s.slice(endAt);
fs.writeFileSync(uiPath, crlf ? s.replace(/\n/g, '\r\n') : s);
console.log(`applied: trails.ur.json (${T.trails.length} مسارات، ${Object.keys(T.sources).length} مصدراً) + ${uiKeys.length} مفتاح واجهة`);
