// فحص البيانات الوصفية لطلب الدمج: اسم الفرع، عنوان الطلب ونصه، ورسائل التزاماته.
//
// قاعدتان:
//   1. تذييلات «-by» (سطر يبدأ بـ«Xxx-by:») في رسائل الالتزام ونص الطلب: المسموح منها
//      Signed-off-by وحده.
//   2. مصطلحات ممنوعة تُقرأ من متغير البيئة PR_METADATA_FORBIDDEN_TERMS (سرّ في إعدادات
//      المستودع، لا يُكتب في الكود). سطر لكل مصطلح، والمطابقة جزء من نص بلا اعتبار لحالة
//      الأحرف. سطر يبدأ بـ«!» استثناء: يُحجب نصه قبل المطابقة (اسم ملف أو معرّف مشروع يحوي
//      مصطلحاً ممنوعاً). الأسطر الفارغة والتي تبدأ بـ«#» تُهمل.
//      غياب المتغير (طلب من نسخة متفرعة، أو قبل ضبطه) = تُفحص القاعدة الأولى وحدها ويُذكر ذلك.
//
// المخرجات لا تطبع المصطلح نفسه بل رقم سطره في القائمة.
//
// الاستعمال (في سير العمل):
//   gh pr view N --json title,body,headRefName | PR_BASE=origin/main node tools/automation/check-pr-metadata.mjs
// بيانات الطلب تُقرأ JSON من الدخل القياسي، والالتزامات من git (PR_BASE..HEAD بلا التزامات الدمج).
// المنطق في دوال نقية مصدَّرة (parseTerms، checkMetadata) يُختبر كسرها في الذاكرة.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const ALLOWED_BY_TRAILERS = new Set(['signed-off-by']);

const isLetter = (ch) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');

/**
 * اسم التذييل إن كان السطر بصيغة «Xxx-by: …» (أحرف لاتينية وشرطات تنتهي بـ«-by» ثم نقطتان)، وإلا undefined.
 * مسح خطي بلا تعبير نمطي.
 * @param {string} line
 */
export function byTrailer(line) {
  const text = line.trim();
  const colon = text.indexOf(':');
  if (colon < 4) return undefined;
  const name = text.slice(0, colon).trimEnd();
  for (const ch of name) if (!isLetter(ch) && ch !== '-') return undefined;
  const lower = name.toLowerCase();
  return lower.endsWith('-by') && isLetter(lower[0]) ? lower : undefined;
}

/**
 * @param {string | undefined} raw
 * @returns {{ terms: { line: number, text: string }[], exceptions: string[] }}
 */
export function parseTerms(raw) {
  const terms = [];
  const exceptions = [];
  const lines = (raw ?? '').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const text = lines[i].trim().toLowerCase();
    if (!text || text.startsWith('#')) continue;
    if (text.startsWith('!')) {
      const ex = text.slice(1).trim();
      if (ex) exceptions.push(ex);
    } else terms.push({ line: i + 1, text });
  }
  // الأطول أولاً: استثناء يحوي استثناء أقصر يُحجب كاملاً.
  exceptions.sort((a, b) => b.length - a.length || a.localeCompare(b));
  return { terms, exceptions };
}

const mask = (text, exceptions) => {
  let out = text.toLowerCase();
  for (const ex of exceptions) out = out.split(ex).join(' ');
  return out;
};

/**
 * @param {{ branch: string, title: string, body: string, commits: { sha: string, message: string }[] }} meta
 * @param {{ terms: { line: number, text: string }[], exceptions: string[] }} list
 * @returns {string[]}
 */
export function checkMetadata(meta, list) {
  const problems = [];
  const fields = [
    { label: 'اسم الفرع', text: meta.branch ?? '', trailers: false },
    { label: 'عنوان الطلب', text: meta.title ?? '', trailers: false },
    { label: 'نص الطلب', text: meta.body ?? '', trailers: true },
    ...meta.commits.map((c) => ({ label: `رسالة الالتزام ${c.sha.slice(0, 7)}`, text: c.message, trailers: true })),
  ];
  for (const f of fields) {
    if (f.trailers) {
      for (const line of f.text.split('\n')) {
        const name = byTrailer(line);
        if (name && !ALLOWED_BY_TRAILERS.has(name)) problems.push(`${f.label}: تذييل غير مسموح «${name}»`);
      }
    }
    const masked = mask(f.text, list.exceptions);
    for (const t of list.terms) {
      if (masked.includes(t.text)) problems.push(`${f.label}: يحوي المصطلح الممنوع رقم ${t.line} في القائمة`);
    }
  }
  return problems;
}

/** مرجع الأساس يُمرَّر وسيطاً لـgit: أحرف مرجع مألوفة وحدها، ولا يبدأ بشرطة. */
export const safeRef = (ref) => {
  if (!ref || ref.startsWith('-') || ref.includes('..')) return undefined;
  for (const ch of ref) {
    const ok = isLetter(ch) || (ch >= '0' && ch <= '9') || ch === '/' || ch === '.' || ch === '_' || ch === '-';
    if (!ok) return undefined;
  }
  return ref;
};

function readCommits(base) {
  const out = execFileSync('git', ['log', '--no-merges', '--format=%H%x1f%B%x1e', `${base}..HEAD`], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  return out.split('\x1e').map((rec) => rec.trim()).filter(Boolean).map((rec) => {
    const cut = rec.indexOf('\x1f');
    return { sha: rec.slice(0, cut), message: rec.slice(cut + 1) };
  });
}

function main() {
  const base = safeRef(process.env.PR_BASE ?? 'origin/main');
  if (!base) { console.error('✗ PR_BASE ليس مرجعاً صالحاً.'); process.exit(1); }
  let pr;
  try { pr = JSON.parse(readFileSync(0, 'utf8')); } catch { console.error('✗ تعذّرت قراءة بيانات الطلب (JSON على الدخل القياسي).'); process.exit(1); }
  const list = parseTerms(process.env.PR_METADATA_FORBIDDEN_TERMS);
  const commits = readCommits(base);
  const problems = checkMetadata({ branch: String(pr.headRefName ?? ''), title: String(pr.title ?? ''), body: String(pr.body ?? ''), commits }, list);
  const scope = list.terms.length ? `${list.terms.length} مصطلحاً ممنوعاً و${list.exceptions.length} استثناء` : 'قائمة المصطلحات غير مضبوطة — فُحصت التذييلات وحدها';
  console.log(`pr-metadata: فرع وعنوان ونص و${commits.length} التزاماً (${scope})`);
  if (problems.length) {
    console.error(`✗ ${problems.length} إخفاق:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log('✓ البيانات الوصفية للطلب سليمة.');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
