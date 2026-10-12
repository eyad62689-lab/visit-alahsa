// توليد وجه النستعليق المشذَّب لصفحات /ur/ — يعمل محلياً لا في البناء.
//
// صفحة المعلم الأوردية كانت تنزّل وجهَي الحزمة (400 و700) كاملين: 310 كيلوبايت نستعليق، وخطوط
// الصفحة 436 كيلوبايت مقابل ميزانية 270 في tools/lighthouse-gate.mjs. الحلّ وجهٌ واحد يخدم مدى
// الوزن 400–700، مشذَّب إلى محارف النطاق المعلَن في src/styles/fonts.css لا أكثر ولا أقل، مع
// إبقاء كل جداول التشكيل (GSUB/GPOS/GDEF) وميزاتها وإغلاق الرسمات عبرها — وهي ما يقوم به النستعليق.
//
// المدخل: ملف الحزمة المثبّتة node_modules/@fontsource/noto-nastaliq-urdu/files/<SOURCE>.
// المخرج: public/vendor/noto-nastaliq-urdu-<إصدار الحزمة>/<FILE> (الإصدار في المسار لأن كاش
//         /vendor/ سنة وimmutable)، وملف القفل tools/nastaliq-subset.lock.json الذي يقرؤه الفحص
//         C53 (tools/check-nastaliq-subset.mjs) فيُفشل البناء إن رُفعت الحزمة أو غُيّر النطاق بلا
//         إعادة توليد.
//
// المتطلبات (للتوليد وحده — البناء لا يحتاجها): Python مع fonttools وbrotli
//   pip install fonttools brotli
// التشغيل:  node tools/gen-nastaliq-subset.mjs
//   PYFTSUBSET=<مسار pyftsubset> وPYTHON=<مسار python> إن لم يكونا على PATH.
// بعد رفع الحزمة: شغّله، ثم حدّث مسار src في fonts.css إلى المجلد الجديد واحذف القديم.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { familyFaces, parseUnicodeRange, FAMILY, PACKAGE, WEIGHT_RANGE } from './check-nastaliq-subset.mjs';

const ROOT = process.cwd();
const SOURCE = 'files/noto-nastaliq-urdu-arabic-400-normal.woff2';
const FILE = 'noto-nastaliq-urdu-arabic-400-subset.woff2';
const LOCK = path.join(ROOT, 'tools/nastaliq-subset.lock.json');
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

const pkgDir = path.join(ROOT, 'node_modules', PACKAGE);
const version = JSON.parse(readFileSync(path.join(pkgDir, 'package.json'), 'utf8')).version;
const faces = familyFaces(readFileSync(path.join(ROOT, 'src/styles/fonts.css'), 'utf8'));
if (faces.length !== 1 || !faces[0].range) throw new Error(`fonts.css: المتوقع وجه واحد لـ${FAMILY} يحمل unicode-range — وُجد ${faces.length}`);
const unicodeRange = faces[0].range.split(',').map((s) => s.trim().toUpperCase()).join(', ');
parseUnicodeRange(unicodeRange); // يرفض ما ليس محرفاً أو مدى صريحاً قبل تمريره للأداة

const src = path.join(pkgDir, SOURCE);
const publicPath = `/vendor/noto-nastaliq-urdu-${version}/${FILE}`;
const dest = path.join(ROOT, 'public', publicPath);
mkdirSync(path.dirname(dest), { recursive: true });

// الخيارات كلها هنا: المحارف = النطاق المعلَن؛ كل ميزات التخطيط وكل سكربتاتها (القيمة الافتراضية
// تُسقط ميزات لا تُعدّ «شائعة»)؛ جدول الأسماء كاملاً (حقوق النشر والرخصة)؛ ورسمة .notdef بحدودها.
// إغلاق الرسمات عبر GSUB على حاله الافتراضي (مفعَّل) — بدونه تسقط الأشكال السياقية.
const OPTIONS = [
  `--unicodes=${unicodeRange.replace(/U\+/g, '').replace(/\s+/g, '')}`,
  '--layout-features=*',
  '--layout-scripts=*',
  '--name-IDs=*',
  '--name-languages=*',
  '--notdef-outline',
  '--flavor=woff2',
];
execFileSync(process.env.PYFTSUBSET ?? 'pyftsubset', [src, ...OPTIONS, `--output-file=${dest}`], { stdio: 'inherit' });
let subsetter = 'fonttools';
try { subsetter = `fonttools ${execFileSync(process.env.PYTHON ?? 'python', ['-c', 'import fontTools; print(fontTools.version)'], { encoding: 'utf8' }).trim()}`; } catch { /* الإصدار للتوثيق وحده */ }

const out = readFileSync(dest);
const lock = {
  package: PACKAGE, version, source: SOURCE, sourceSha256: sha256(readFileSync(src)),
  unicodeRange, file: publicPath, sha256: sha256(out), bytes: out.length,
  subsetter, options: OPTIONS,
};
writeFileSync(LOCK, JSON.stringify(lock, null, 2) + '\n', 'utf8');
console.log(`✓ ${publicPath} — ${Math.round(out.length / 1024)} كيلوبايت (المصدر ${Math.round(readFileSync(src).length / 1024)}) · ${subsetter} · النطاق ${unicodeRange}`);
if (faces[0].url !== publicPath) console.log(`! مصدر الوجه في fonts.css «${faces[0].url}» — حدّثه إلى «${publicPath}»`);
if (faces[0].weight !== WEIGHT_RANGE) console.log(`! مدى وزن الوجه في fonts.css «${faces[0].weight}» والمتوقع «${WEIGHT_RANGE}»`);
