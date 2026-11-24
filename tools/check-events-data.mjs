// C80 — ثوابت بيانات الفعاليات التي لا يفرضها النوع في src/data/events.ts.
//
// النوع EventMeta يُلزم النسخة المؤكدة بتاريخين ISO وحالة ما بعد الانقضاء، لكنه يقبل أي سلسلة
// تاريخاً، ولا يربط التاريخين بنص time الظاهر للزائر ولا بنافذة الأشهر start/end. فتاريخ يُعدَّل في
// EVENT_META ولا يُعدَّل في نص لغة يُبنى نظيفاً ويعرض موعدين متعارضين (البطاقة والسكيما).
//
// يحرس:
//   (أ) startISO/endISO تاريخان حقيقيان بصيغة YYYY-MM-DD، والختام لا يسبق البداية.
//   (ب) start/end أشهر 1..12 (و13 مع ramadan وحده)، وتطابقان شهري التاريخين في النسخة المؤكدة.
//   (ج) نص time في كل لغة تحمل نص الفعالية يذكر يومي التاريخين وسنتيهما بأرقامها.
//   (د) ما يخص النسخة الجارية (ticket، register، whatsapp، priceRange، وبنود dated) لا يرد إلا في
//       فعالية مؤكدة: evView يُسقطها بانقضاء endISO، وبلا endISO تبقى معروضة بلا نهاية.
//   (هـ) priceRange: الحد الأدنى موجب ولا يعلو الأعلى.
//   (و) venue ملف معلم قائم، وcoords داخل نطاق محافظة الأحساء.
//   (ز) الإيقاف المؤقت (paused): يوم إعلانٍ حقيقي لا يتجاوز الختام، لفعالية مؤقتة مؤكدة وحدها،
//       ومعه في كل لغة تحمل نصها pausedNote يذكر يوم الإعلان وسنته، وبلا ساعات يومية (hours).
//
// لا شرط هنا يتبدّل حكمه بمرور الأيام: البناء اليومي المجدول يجب ألا يسقط بلا تغيير في المصدر.
//
// وcheckPausedRender تقابل المصدر بالمبنيّ: الفعالية الموقوفة تُعرض موقوفةً في صفحتها وبطاقتها
// وخارج قسم «في موسمها الآن». شرطها يسقط بعد ختام الفعالية لأن صفحتها تخرج من البناء يومها.
//
// الملف وحدتان: parseEventsSource تقرأ المصدر بمحلل TypeScript (لا تنفيذ ولا تعابير نمطية على
// كائنات متداخلة)، وcheckEventsData دالة نقية يستدعيها check-consistency.mjs، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
import ts from 'typescript';

export const EXPECT = { minEvents: 10, minConfirmed: 1, minTimeChecks: 4 };

/** نطاق تقريبي لمحافظة الأحساء (يشمل ساحل العقير شرقاً) — يمسك إحداثيات مقلوبة أو من مدينة أخرى. */
export const BBOX = { latMin: 24.0, latMax: 26.6, lngMin: 48.4, lngMax: 50.8 };

const TEXT_BLOCKS = { TEXT_AR: 'ar', TEXT_EN: 'en', TEXT_ZH: 'zh', TEXT_DE: 'de', TEXT_RU: 'ru', TEXT_UR: 'ur', TEXT_TR: 'tr' };

/** قيمة لا تُقرأ ثابتةً من المصدر (تعبير محسوب أو مرجع) — تُبلَّغ حيث يلزم الفحصَ الحقلُ. */
export const UNRESOLVED = Symbol('unresolved');

const unwrap = (node) => {
  let n = node;
  while (n && (ts.isAsExpression(n) || ts.isSatisfiesExpression(n) || ts.isParenthesizedExpression(n))) n = n.expression;
  return n;
};

const propName = (name) => {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return undefined;
};

/** قيمة حرفية من عقدة: كائنات ومصفوفات وسلاسل وأرقام ومنطقيات. غير ذلك UNRESOLVED. */
function literal(node) {
  const n = unwrap(node);
  if (!n) return UNRESOLVED;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (n.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (n.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (n.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isPrefixUnaryExpression(n) && n.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(n.operand)) return -Number(n.operand.text);
  if (ts.isArrayLiteralExpression(n)) return n.elements.map((e) => literal(e));
  if (ts.isObjectLiteralExpression(n)) {
    const out = {};
    for (const p of n.properties) {
      if (!ts.isPropertyAssignment(p)) return UNRESOLVED;
      const key = propName(p.name);
      if (key === undefined) return UNRESOLVED;
      out[key] = literal(p.initializer);
    }
    return out;
  }
  return UNRESOLVED;
}

/**
 * @param {string} source نص src/data/events.ts
 * @returns {{ meta: Record<string, any> | undefined, texts: Record<string, Record<string, any>> }}
 *   meta: كائن EVENT_META؛ texts: لكل لغة كائن نصوصها بمفاتيح الفعاليات.
 */
export function parseEventsSource(source) {
  const sf = ts.createSourceFile('events.ts', source, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  let meta;
  const texts = {};
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue;
    for (const d of st.declarationList.declarations) {
      if (!ts.isIdentifier(d.name) || !d.initializer) continue;
      const name = d.name.text;
      if (name === 'EVENT_META') {
        const v = literal(d.initializer);
        if (v !== UNRESOLVED) meta = v;
      } else if (Object.hasOwn(TEXT_BLOCKS, name)) {
        const v = literal(d.initializer);
        if (v !== UNRESOLVED) texts[TEXT_BLOCKS[name]] = v;
      }
    }
  }
  return { meta, texts };
}

const isDigit = (c) => c >= '0' && c <= '9';
/** الرقم وارد في النص غير ملاصق لرقم آخر («11» لا تُقبل من «2011» ولا «110»). */
export const hasNumber = (text, num) => {
  for (let i = text.indexOf(num); i !== -1; i = text.indexOf(num, i + 1)) {
    if (!isDigit(text[i - 1] ?? '') && !isDigit(text[i + num.length] ?? '')) return true;
  }
  return false;
};

/** YYYY-MM-DD تاريخاً حقيقياً (لا 2026-02-30) ⇒ {y, m, d}، وإلا undefined. */
export const parseISODay = (s) => {
  if (typeof s !== 'string' || s.length !== 10 || s[4] !== '-' || s[7] !== '-') return undefined;
  const y = Number(s.slice(0, 4)), m = Number(s.slice(5, 7)), d = Number(s.slice(8, 10));
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return undefined;
  const t = new Date(Date.UTC(y, m - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) return undefined;
  return { y, m, d };
};

const EDITION_ONLY = ['ticket', 'register', 'whatsapp', 'priceRange'];

/**
 * @param {{ meta: Record<string, any> | undefined, texts: Record<string, Record<string, any>>, attractionSlugs: Set<string> }} input
 * @returns {{ problems: string[], stats: { events: number, confirmed: number, timeChecks: number, langs: number } }}
 */
export function checkEventsData({ meta, texts, attractionSlugs }) {
  const problems = [];
  const stats = { events: 0, confirmed: 0, timeChecks: 0, paused: 0, langs: Object.keys(texts ?? {}).length };
  if (!meta || typeof meta !== 'object') {
    return { problems: ['EVENT_META غير مقروء ثابتاً من src/data/events.ts'], stats };
  }
  for (const lang of ['ar', 'en']) if (!texts?.[lang]) problems.push(`نصوص ${lang} غير مقروءة ثابتاً`);

  for (const [id, m] of Object.entries(meta)) {
    stats.events++;
    if (m === UNRESOLVED || typeof m !== 'object' || m === null) { problems.push(`${id}: حقوله غير مقروءة ثابتاً`); continue; }
    const confirmed = m.status === 'confirmed';
    if (confirmed) stats.confirmed++;

    // (ب) نافذة الأشهر
    const monthOk = (v) => Number.isInteger(v) && v >= 1 && v <= 12;
    if (m.ramadan === true) {
      if (m.start !== 13) problems.push(`${id}: ramadan يلزمه start = 13 (الحالي ${String(m.start)})`);
    } else if (!monthOk(m.start)) problems.push(`${id}: start = ${String(m.start)} ليس شهراً 1..12`);
    if (m.end !== undefined && !monthOk(m.end)) problems.push(`${id}: end = ${String(m.end)} ليس شهراً 1..12`);

    // (أ) التاريخان
    let s, e;
    if (m.startISO !== undefined || m.endISO !== undefined) {
      s = parseISODay(m.startISO);
      e = parseISODay(m.endISO);
      if (!s) problems.push(`${id}: startISO «${String(m.startISO)}» ليس تاريخاً YYYY-MM-DD حقيقياً`);
      if (!e) problems.push(`${id}: endISO «${String(m.endISO)}» ليس تاريخاً YYYY-MM-DD حقيقياً`);
      if (s && e && m.endISO < m.startISO) problems.push(`${id}: endISO ${m.endISO} يسبق startISO ${m.startISO}`);
      if (!confirmed) problems.push(`${id}: تاريخ ISO بلا status: 'confirmed'`);
      if (s && m.start !== s.m) problems.push(`${id}: start = ${String(m.start)} وشهر startISO ${s.m}`);
      if (e && m.end !== undefined && m.end !== e.m) problems.push(`${id}: end = ${String(m.end)} وشهر endISO ${e.m}`);
    } else if (confirmed) problems.push(`${id}: مؤكدة بلا startISO/endISO`);

    // (د) ما يخص النسخة الجارية
    if (!confirmed) for (const k of EDITION_ONLY) if (m[k] !== undefined) problems.push(`${id}: ${k} في فعالية غير مؤكدة — لا يسقط بانقضاء نسخة`);

    // (هـ) الأسعار
    if (m.priceRange !== undefined) {
      const { low, high } = m.priceRange ?? {};
      if (!(typeof low === 'number' && typeof high === 'number' && low > 0 && low <= high)) problems.push(`${id}: priceRange ${JSON.stringify(m.priceRange)} غير صالح (0 < low ≤ high)`);
    }

    // (و) المكان
    if (m.venue !== undefined && !attractionSlugs.has(m.venue)) problems.push(`${id}: venue «${String(m.venue)}» ليس ملف معلم`);
    if (m.coords !== undefined) {
      const { lat, lng } = m.coords ?? {};
      if (!(typeof lat === 'number' && typeof lng === 'number' && lat >= BBOX.latMin && lat <= BBOX.latMax && lng >= BBOX.lngMin && lng <= BBOX.lngMax)) problems.push(`${id}: coords ${JSON.stringify(m.coords)} خارج نطاق الأحساء`);
    }

    // (ز) الإيقاف المؤقت
    const paused = m.paused !== undefined;
    let pz;
    if (paused) {
      stats.paused++;
      pz = parseISODay(m.paused);
      if (!pz) problems.push(`${id}: paused «${String(m.paused)}» ليس تاريخاً YYYY-MM-DD حقيقياً`);
      if (!(confirmed && m.oneOff === true)) problems.push(`${id}: paused لفعالية مؤقتة مؤكدة وحدها — نصّه عربي وإنجليزي فقط`);
      if (pz && e && m.paused > m.endISO) problems.push(`${id}: paused ${m.paused} بعد endISO ${m.endISO}`);
    }

    // (ج) و(د) و(ز) في النصوص
    for (const [lang, block] of Object.entries(texts ?? {})) {
      const t = block?.[id];
      if (t === undefined) continue; // الفعالية المؤقتة بلا نص في لغات الخطوط
      if (t === UNRESOLVED || typeof t !== 'object' || t === null) { problems.push(`${id} [${lang}]: نصوصها غير مقروءة ثابتاً`); continue; }
      if (s && e) {
        if (typeof t.time !== 'string') problems.push(`${id} [${lang}]: time غير مقروء ثابتاً`);
        else {
          stats.timeChecks++;
          const need = [...new Set([String(s.d), String(e.d), String(s.y), String(e.y)])];
          const missing = need.filter((n) => !hasNumber(t.time, n));
          if (missing.length) problems.push(`${id} [${lang}]: time «${t.time}» لا يذكر ${missing.join(' و')} من ${m.startISO} – ${m.endISO}`);
        }
      }
      if (paused) {
        if (typeof t.pausedNote !== 'string' || !t.pausedNote.trim()) problems.push(`${id} [${lang}]: paused بلا pausedNote`);
        else if (pz) {
          const missing = [String(pz.d), String(pz.y)].filter((n) => !hasNumber(t.pausedNote, n));
          if (missing.length) problems.push(`${id} [${lang}]: pausedNote لا يذكر ${missing.join(' و')} من يوم الإعلان ${m.paused}`);
        }
        if (t.hours !== undefined) problems.push(`${id} [${lang}]: hours في فعالية موقوفة مؤقتاً`);
      } else if (t.pausedNote !== undefined) problems.push(`${id} [${lang}]: pausedNote بلا paused`);
      if (!confirmed) {
        for (const key of ['sections', 'faq']) {
          const list = t[key];
          if (Array.isArray(list) && list.some((x) => x && typeof x === 'object' && x.dated === true)) problems.push(`${id} [${lang}]: بند dated في ${key} لفعالية غير مؤكدة — لا يسقط أبداً`);
        }
      }
    }
  }

  if (stats.events < EXPECT.minEvents) problems.push(`الفعاليات المفحوصة ${stats.events} — الحدّ الأدنى ${EXPECT.minEvents}`);
  if (stats.confirmed < EXPECT.minConfirmed) problems.push(`الفعاليات المؤكدة ${stats.confirmed} — الحدّ الأدنى ${EXPECT.minConfirmed}`);
  if (stats.timeChecks < EXPECT.minTimeChecks) problems.push(`نصوص time المفحوصة ${stats.timeChecks} — الحدّ الأدنى ${EXPECT.minTimeChecks}`);
  return { problems, stats };
}

/** مسارات dist للغتين اللتين تحملان الفعالية المؤقتة. */
const PAUSED_PAGES = {
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

/**
 * @param {{ meta: Record<string, any> | undefined, texts: Record<string, Record<string, any>>, today: string,
 *   read: (rel: string) => string | undefined }} input  today: يوم الرياض YYYY-MM-DD؛ read: نص ملف من dist أو undefined
 * @returns {{ problems: string[], stats: { paused: number, pages: number } }}
 */
export function checkPausedRender({ meta, texts, today, read }) {
  const problems = [];
  const stats = { paused: 0, pages: 0 };
  // بعد ختام الفعالية المؤقتة تخرج صفحتها وبطاقتها من البناء، فلا يبقى ما يُقابَل
  const live = Object.entries(meta ?? {}).filter(([, m]) => m && typeof m === 'object' && m.paused !== undefined
    && typeof m.endISO === 'string' && today <= m.endISO);
  stats.paused = live.length;

  for (const [lang, pages] of Object.entries(PAUSED_PAGES)) {
    const list = read(pages.list);
    const plan = read(pages.plan);
    if (list === undefined) { problems.push(`[${lang}] ${pages.list} غير مبنية`); continue; }
    if (plan === undefined) { problems.push(`[${lang}] ${pages.plan} غير مبنية`); continue; }
    const cards = articles(list).filter((a) => a.tag.includes('data-ev-paused'));
    if (cards.length !== live.length) problems.push(`[${lang}] قائمة الفعاليات: ${cards.length} بطاقة موسومة موقوفة والموقوفة في المصدر ${live.length}`);
    for (const card of cards) if (card.body.includes('data-ev-cd')) problems.push(`[${lang}] قائمة الفعاليات: بطاقة موقوفة تحمل عدّاداً`);

    for (const [id] of live) {
      const t = texts?.[lang]?.[id];
      if (!t || typeof t.slug !== 'string' || typeof t.pausedNote !== 'string') continue; // يبلّغه (ز)
      const html = read(pages.detail(t.slug));
      if (html === undefined) { problems.push(`${id} [${lang}]: صفحتها غير مبنية`); continue; }
      stats.pages++;
      if (!html.includes('schema.org/EventPostponed')) problems.push(`${id} [${lang}]: السكيما بلا EventPostponed`);
      if (html.includes('schema.org/EventScheduled')) problems.push(`${id} [${lang}]: السكيما تقول EventScheduled`);
      if (withoutScripts(html).includes('data-ev-cd')) problems.push(`${id} [${lang}]: الصفحة تحمل عدّاداً`);
      if (!html.includes(escapeHtml(t.pausedNote))) problems.push(`${id} [${lang}]: الصفحة لا تعرض pausedNote`);
      if (!cards.some((c) => c.body.includes(`/${t.slug}/`))) problems.push(`${id} [${lang}]: بطاقتها في القائمة غير موسومة موقوفة`);
      if (plan.includes(`data-track-event="${escapeHtml(t.slug)}"`)) problems.push(`${id} [${lang}]: معروضة في «فعاليات في موسمها الآن»`);
    }
  }
  return { problems, stats };
}
