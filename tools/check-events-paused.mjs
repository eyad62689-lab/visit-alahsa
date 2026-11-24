// C84 — الإيقاف المؤقت لفعالية مؤقتة (paused في EVENT_META وpausedNote في نصوصها).
//
// الجهة المنظّمة قد تعلن إيقاف فعالية مؤكدة بلا موعد استئناف. التاريخان المعلنان يبقيان في المصدر،
// فلو نُسي موضع واحد لعرضت الصفحة عدّاداً إلى ختامٍ لن يقع، أو سكيما تقول إن الفعالية قائمة في موعدها.
//
// يحرس في المصدر (checkPausedData):
//   (أ) paused يوم إعلانٍ حقيقي بصيغة YYYY-MM-DD لا يتجاوز endISO، ولفعالية مؤقتة مؤكدة وحدها
//       (نصّها عربي وإنجليزي فقط؛ الموسم المتكرّر يلزمه نص بكل لغة عبر خطوط الترجمة).
//   (ب) كل لغة تحمل نص الفعالية تحمل pausedNote يذكر يوم الإعلان وسنته بأرقامهما، وبلا ساعات يومية.
//   (ج) لا pausedNote بلا paused.
// ويقابل المصدر بالمبنيّ (checkPausedRender): صفحة الفعالية تعرض الجملة وسكيما EventPostponed بلا
// عدّاد، وبطاقتها في القائمة موسومة موقوفة بلا عدّاد، وهي غائبة عن «فعاليات في موسمها الآن».
//
// شرط المبنيّ يسقط بعد ختام الفعالية: صفحتها وبطاقتها تخرجان من البناء يومها، فلا يسقط البناء اليومي
// المجدول بلا تغيير في المصدر.
//
// دالتان نقيتان يستدعيهما check-consistency.mjs، ويُختبر كسرهما على نسخ في الذاكرة.
import { hasNumber, parseISODay } from './check-events-data.mjs';

const isObj = (v) => typeof v === 'object' && v !== null;

/** [id, meta] لكل فعالية تحمل paused. */
const pausedEntries = (meta) => Object.entries(isObj(meta) ? meta : {}).filter(([, m]) => isObj(m) && m.paused !== undefined);

function metaProblems(id, m) {
  const out = [];
  const day = parseISODay(m.paused);
  if (!day) out.push(`${id}: paused «${String(m.paused)}» ليس تاريخاً YYYY-MM-DD حقيقياً`);
  if (m.status !== 'confirmed' || m.oneOff !== true) out.push(`${id}: paused لفعالية مؤقتة مؤكدة وحدها — نصّه عربي وإنجليزي فقط`);
  if (day && typeof m.endISO === 'string' && m.paused > m.endISO) out.push(`${id}: paused ${m.paused} بعد endISO ${m.endISO}`);
  return out;
}

function noteProblems(id, lang, note, announced) {
  const day = parseISODay(announced);
  if (!day) return []; // يبلّغه metaProblems
  const missing = [String(day.d), String(day.y)].filter((n) => !hasNumber(note, n));
  return missing.length ? [`${id} [${lang}]: pausedNote لا يذكر ${missing.join(' و')} من يوم الإعلان ${announced}`] : [];
}

function textProblems(id, lang, t, m) {
  const out = [];
  const note = typeof t.pausedNote === 'string' ? t.pausedNote.trim() : '';
  if (note) out.push(...noteProblems(id, lang, note, m.paused));
  else out.push(`${id} [${lang}]: paused بلا pausedNote`);
  if (t.hours !== undefined) out.push(`${id} [${lang}]: hours في فعالية موقوفة مؤقتاً`);
  return out;
}

/**
 * @param {{ meta: Record<string, any> | undefined, texts: Record<string, Record<string, any>> | undefined }} input
 *   كما يعيدهما parseEventsSource.
 * @returns {{ problems: string[], stats: { paused: number, notes: number } }}
 */
export function checkPausedData({ meta, texts }) {
  const paused = new Map(pausedEntries(meta));
  const problems = [];
  const stats = { paused: paused.size, notes: 0 };
  for (const [id, m] of paused) problems.push(...metaProblems(id, m));

  for (const [lang, block] of Object.entries(isObj(texts) ? texts : {})) {
    for (const [id, t] of Object.entries(isObj(block) ? block : {})) {
      if (!isObj(t)) continue;
      const m = paused.get(id);
      if (m) {
        stats.notes++;
        problems.push(...textProblems(id, lang, t, m));
      } else if (t.pausedNote !== undefined) problems.push(`${id} [${lang}]: pausedNote بلا paused`);
    }
  }
  return { problems, stats };
}

/** مسارات dist للغتين اللتين تحملان الفعالية المؤقتة. */
const PAGES = {
  ar: { detail: (slug) => `فعاليات/${slug}/index.html`, list: 'فعاليات/index.html', plan: 'خطط/index.html' },
  en: { detail: (slug) => `en/events/${slug}/index.html`, list: 'en/events/index.html', plan: 'en/plan-your-trip/index.html' },
};

/** النص كما يكتبه البناء في HTML. */
const escapeHtml = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

/** الصفحة بلا كتل <script>: نص السكربت يذكر السمات التي يبحث عنها، والمطلوب العناصر وحدها. */
function withoutScripts(html) {
  let out = '';
  let at = 0;
  for (let i = html.indexOf('<script', at); i !== -1; i = html.indexOf('<script', at)) {
    const close = html.indexOf('</script>', i);
    out += html.slice(at, i);
    if (close === -1) return out;
    at = close + '</script>'.length;
  }
  return out + html.slice(at);
}

/** وسوم فتح <article> في الصفحة مع متن كل منها حتى إغلاقه. */
function articles(html) {
  const out = [];
  for (let i = html.indexOf('<article'); i !== -1; i = html.indexOf('<article', i + 1)) {
    const tagEnd = html.indexOf('>', i);
    const close = html.indexOf('</article>', i);
    if (tagEnd === -1 || close === -1) break;
    out.push({ tag: html.slice(i, tagEnd + 1), body: html.slice(tagEnd + 1, close) });
  }
  return out;
}

function pageProblems({ id, lang, t, html, cards, plan }) {
  const checks = [
    [!html.includes('schema.org/EventPostponed'), 'السكيما بلا EventPostponed'],
    [html.includes('schema.org/EventScheduled'), 'السكيما تقول EventScheduled'],
    [withoutScripts(html).includes('data-ev-cd'), 'الصفحة تحمل عدّاداً'],
    [!html.includes(escapeHtml(t.pausedNote)), 'الصفحة لا تعرض pausedNote'],
    [!cards.some((c) => c.body.includes(`/${t.slug}/`)), 'بطاقتها في القائمة غير موسومة موقوفة'],
    [plan.includes(`data-track-event="${escapeHtml(t.slug)}"`), 'معروضة في «فعاليات في موسمها الآن»'],
  ];
  return checks.filter(([bad]) => bad).map(([, message]) => `${id} [${lang}]: ${message}`);
}

function langProblems({ lang, live, texts, read }) {
  const pages = PAGES[lang];
  const list = read(pages.list);
  const plan = read(pages.plan);
  if (list === undefined) return { problems: [`[${lang}] ${pages.list} غير مبنية`], pages: 0 };
  if (plan === undefined) return { problems: [`[${lang}] ${pages.plan} غير مبنية`], pages: 0 };

  const cards = articles(list).filter((a) => a.tag.includes('data-ev-paused'));
  const problems = [];
  if (cards.length !== live.length) problems.push(`[${lang}] قائمة الفعاليات: ${cards.length} بطاقة موسومة موقوفة والموقوفة في المصدر ${live.length}`);
  if (cards.some((c) => c.body.includes('data-ev-cd'))) problems.push(`[${lang}] قائمة الفعاليات: بطاقة موقوفة تحمل عدّاداً`);

  let built = 0;
  for (const id of live) {
    const t = texts?.[lang]?.[id];
    if (!isObj(t) || typeof t.slug !== 'string' || typeof t.pausedNote !== 'string') continue; // يبلّغه checkPausedData
    const html = read(pages.detail(t.slug));
    if (html === undefined) { problems.push(`${id} [${lang}]: صفحتها غير مبنية`); continue; }
    built++;
    problems.push(...pageProblems({ id, lang, t, html, cards, plan }));
  }
  return { problems, pages: built };
}

/**
 * @param {{ meta: Record<string, any> | undefined, texts: Record<string, Record<string, any>> | undefined, today: string,
 *   read: (rel: string) => string | undefined }} input  today: يوم الرياض YYYY-MM-DD؛ read: نص ملف من dist أو undefined
 * @returns {{ problems: string[], stats: { paused: number, pages: number } }}
 */
export function checkPausedRender({ meta, texts, today, read }) {
  // بعد ختام الفعالية المؤقتة تخرج صفحتها وبطاقتها من البناء، فلا يبقى ما يُقابَل
  const live = pausedEntries(meta).filter(([, m]) => typeof m.endISO === 'string' && today <= m.endISO).map(([id]) => id);
  const problems = [];
  const stats = { paused: live.length, pages: 0 };
  for (const lang of Object.keys(PAGES)) {
    const result = langProblems({ lang, live, texts, read });
    problems.push(...result.problems);
    stats.pages += result.pages;
  }
  return { problems, stats };
}
