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
// الدخل كله على الدخل القياسي، يركّبه سير العمل — السكربت لا يشغّل أمراً ولا يفتح ملفاً:
//   بيانات الطلب JSON (title، body، headRefName)، ثم المحرف 0x1D، ثم مخرج
//   git log --no-merges --format=%H%x1f%B%x1e <الأساس>..HEAD
// المنطق في دوال نقية مصدَّرة (parseTerms، parseInput، checkMetadata) يُختبر كسرها في الذاكرة.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const ALLOWED_BY_TRAILERS = new Set(['signed-off-by']);
const PART_SEP = '\x1d';
const RECORD_SEP = '\x1e';
const FIELD_SEP = '\x1f';

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
    if (text.startsWith('!')) exceptions.push(text.slice(1).trim());
    else terms.push({ line: i + 1, text });
  }
  // الأطول أولاً: استثناء يحوي استثناء أقصر يُحجب كاملاً.
  const kept = exceptions.filter(Boolean).sort((a, b) => b.length - a.length || a.localeCompare(b));
  return { terms, exceptions: kept };
}

/**
 * يفصل الدخل القياسي إلى بيانات الطلب والتزاماته. يرمي عند JSON غير صالح أو غياب الفاصل.
 * @param {string} input
 * @returns {{ branch: string, title: string, body: string, commits: { sha: string, message: string }[] }}
 */
export function parseInput(input) {
  const cut = input.indexOf(PART_SEP);
  if (cut === -1) throw new Error('الفاصل بين بيانات الطلب والالتزامات غائب');
  const pr = JSON.parse(input.slice(0, cut));
  const commits = input.slice(cut + 1).split(RECORD_SEP).map((rec) => rec.trim()).filter(Boolean).map((rec) => {
    const at = rec.indexOf(FIELD_SEP);
    return at === -1 ? { sha: '', message: rec } : { sha: rec.slice(0, at), message: rec.slice(at + 1) };
  });
  return { branch: String(pr.headRefName ?? ''), title: String(pr.title ?? ''), body: String(pr.body ?? ''), commits };
}

const trailerProblems = (text) => text.split('\n').map(byTrailer).filter((name) => name && !ALLOWED_BY_TRAILERS.has(name));

const termHits = (text, list) => {
  let masked = text.toLowerCase();
  for (const ex of list.exceptions) masked = masked.split(ex).join(' ');
  return list.terms.filter((t) => masked.includes(t.text));
};

/**
 * @param {{ branch: string, title: string, body: string, commits: { sha: string, message: string }[] }} meta
 * @param {{ terms: { line: number, text: string }[], exceptions: string[] }} list
 * @returns {string[]}
 */
export function checkMetadata(meta, list) {
  const fields = [
    { label: 'اسم الفرع', text: meta.branch ?? '', trailers: false },
    { label: 'عنوان الطلب', text: meta.title ?? '', trailers: false },
    { label: 'نص الطلب', text: meta.body ?? '', trailers: true },
    ...meta.commits.map((c) => ({ label: `رسالة الالتزام ${c.sha.slice(0, 7)}`, text: c.message, trailers: true })),
  ];
  return fields.flatMap((f) => [
    ...(f.trailers ? trailerProblems(f.text) : []).map((name) => `${f.label}: تذييل غير مسموح «${name}»`),
    ...termHits(f.text, list).map((t) => `${f.label}: يحوي المصطلح الممنوع رقم ${t.line} في القائمة`),
  ]);
}

function main() {
  let meta;
  try { meta = parseInput(readFileSync(0, 'utf8')); } catch (e) {
    console.error(`✗ تعذّرت قراءة الدخل القياسي — ${e instanceof Error ? e.message : String(e)}`);
    process.exit(1);
  }
  const list = parseTerms(process.env.PR_METADATA_FORBIDDEN_TERMS);
  const problems = checkMetadata(meta, list);
  const scope = list.terms.length ? `${list.terms.length} مصطلحاً ممنوعاً و${list.exceptions.length} استثناء` : 'قائمة المصطلحات غير مضبوطة — فُحصت التذييلات وحدها';
  console.log(`pr-metadata: فرع وعنوان ونص و${meta.commits.length} التزاماً (${scope})`);
  if (problems.length) {
    console.error(`✗ ${problems.length} إخفاق:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log('✓ البيانات الوصفية للطلب سليمة.');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
