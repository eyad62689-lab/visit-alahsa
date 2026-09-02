// تواريخ آخر تعديل الحقيقية لملفات المصدر — لحقل lastmod في sitemap.
//
// المبدأ: لا تاريخ مختلَق. المصدر الوحيد المقبول هو تاريخ آخر التزام git مسّ
// الملف فعلاً. وإن تعذّر (لا git، أو استنساخ ضحل يعطي كل الملفات تاريخاً واحداً
// كاذباً) تُعاد خريطة فارغة ويُحذف lastmod من الخريطة كلها — وغيابه أصدق من
// تاريخ موحَّد لا يعني شيئاً. (قاعدة «لا تُختلق أي معلومة» — CLAUDE.md)
//
// استدعاء واحد لـgit لكل بناء، والنتيجة تُخزَّن في الذاكرة.
import { execFileSync } from 'node:child_process';

let cache: Map<string, string> | null = null;

function run(args: string[]): string | null {
  try {
    return execFileSync('git', args, {
      cwd: process.cwd(),
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      timeout: 120_000,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
}

/** خريطة: مسار الملف نسبةً لجذر المستودع → تاريخ ISO ليوم آخر تعديل. */
export function gitDates(): Map<string, string> {
  if (cache) return cache;
  cache = new Map();

  // الاستنساخ الضحل يجعل `git log -- <file>` يعيد تاريخ الالتزام الوحيد
  // لكل ملف — رقم موحَّد كاذب. يُرفض كلياً.
  let shallow = run(['rev-parse', '--is-shallow-repository']);
  if (shallow === null) return cache;
  // Netlify يستنسخ ضحلاً افتراضياً فيضيع lastmod كله (وبه تعمل إضافة IndexNow).
  // محاولة واحدة لجلب التاريخ الكامل؛ فشلها (لا شبكة/لا remote) يعيدنا إلى «لا تاريخ».
  if (shallow.trim() === 'true') {
    run(['fetch', '--unshallow', '--quiet']);
    shallow = run(['rev-parse', '--is-shallow-repository']);
  }
  if (shallow === null || shallow.trim() === 'true') return cache;

  // مرور واحد على السجل: سطر التاريخ يتبعه أسماء الملفات التي مسّها الالتزام.
  // السجل من الأحدث للأقدم، فأول ظهور لأي ملف هو آخر تعديل له.
  const log = run(['log', '--no-merges', '--date-order', '--pretty=format:@%cI', '--name-only']);
  if (!log) return cache;

  let current = '';
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) { current = line.slice(1, 11); continue; } // YYYY-MM-DD
    const p = line.trim();
    if (p && current && !cache.has(p)) cache.set(p, current);
  }
  return cache;
}

/** أحدث تاريخ بين عدة ملفات — يُهمل ما لا تاريخ له. `undefined` إن لم يُعرف أيٌّ منها. */
export function newestDate(paths: string[]): string | undefined {
  const m = gitDates();
  const found = paths.map((p) => m.get(p)).filter((d): d is string => Boolean(d));
  return found.length ? found.sort().at(-1) : undefined;
}
