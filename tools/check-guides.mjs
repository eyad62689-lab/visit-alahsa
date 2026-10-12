// منطق الحرّاس C54–C58 — دليل المرشدين السياحيين المرخّصين. دوالّ نقية على نصوص (صفحات dist
// وملفات المصدر وخريطة الموقع) لا على الملفات، فيُختبر كسرها على نسخة في الذاكرة بلا بناء
// ولا مسّ للمصدر؛ والقراءة في tools/check-consistency.mjs.
//
// ما يحرسه كل رقم (قواعد الدليل في CLAUDE.md):
//   C54  وسيلة تواصل المرشد لا تظهر نصاً: لا رقم ولا بريد في نصّ الصفحة ولا في سماتها غير href
//        ولا في JSON-LD؛ وكل زر تواصل يحمل data-track.
//   C55  لا تقييم ولا سعر: لا مخطط تقييم/عرض في JSON-LD ولا microdata ولا نجوم ولا مبلغ بعملة،
//        ولا عبارات الترتيب بالأفضلية.
//   C56  كل صفحة مرشد تعرض رقم رخصته كما في مصدره والجهة المرخِّصة وإخلاء المسؤولية بنصّه؛
//        والفهرس وصفحة السياسات يحملان الإخلاء؛ واللفظ «مرخّص» لا «معتمد».
//   C57  لا مرشد منتهي الرخصة ولا مسودة في dist: الصفحات المبنية = المنشور من المصدر بالضبط،
//        وتاريخ الانتهاء المعروض لم يمضِ، والفهرس والخريطة يطابقان العدّ.
//   C58  حالة الدليل مشتقة من العدّ: بلا مرشد منشور الفهرس مبنيّ بحالته الفارغة، noindex، بلا
//        hreflang، خارج sitemap، ولا رابط إليه؛ وبمرشد فأكثر مفهرَس ومعلَن ومربوط من العربية
//        والإنجليزية وحدهما.
//
// القاعدة: أرقام لاتينية (0-9).

export const GUIDES_AR_DIR = 'مرشدون-سياحيون';
export const GUIDES_EN_DIR = 'en/tour-guides';
export const GUIDES_PATHS = { ar: `/${GUIDES_AR_DIR}/`, en: `/${GUIDES_EN_DIR}/` };
const SITE = 'https://visit-alahsa.com';

/** إخلاء المسؤولية كما يجب أن يُنشر — نسخة الحارس المستقلة عن src/data/guides.ts. */
export const DISCLAIMER = {
  ar: 'زوروا الأحساء دليل تعريفي: يعرض المرشدين المرخّصين ويتيح التواصل المباشر معهم. الاتفاق والأسعار والدفع بينك وبين المرشد مباشرة؛ الموقع ليس طرفاً فيها، ولا يتقاضى نسبة أو عمولة، ولا يتحمّل مسؤولية التعامل بين الطرفين.',
  en: 'Visit Al-Ahsa is an informational directory: it lists licensed guides and enables direct contact with them. Agreement, prices and payment are directly between you and the guide; the site is not a party to them, takes no percentage or commission, and bears no responsibility for dealings between the two parties.',
};
const ISSUER = { ar: 'وزارة السياحة', en: 'Ministry of Tourism' };
const STATED = { ar: 'بإفادة المرشد', en: 'As stated by the guide' };
const LICENSED = { ar: /مرخّص/, en: /\blicensed\b/i };
// «معتمد» بتصاريفه و"certified"/"accredited": الموقع يتحقق من رخصة ولا يعتمد أحداً
const FORBIDDEN_WORDING = { ar: /معتمد/, en: /\b(?:certified|accredited)\b/i };

/** قناتا الموقع نفسه — مسموح ظهور بريده نصاً (دعوة الانضمام والتذييل). */
const SITE_EMAIL = 'info@visit-alahsa.com';
const SITE_WHATSAPP = '966532482544';

const DEC = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = (t) => t.replace(/&(?:amp|quot|#39|#x27|lt|gt|nbsp);/g, (e) => DEC[e]);

/** يوم بتوقيت الرياض بصيغة YYYY-MM-DD — المقابل لـbuildDay في src/lib/guides.ts. */
export const riyadhDay = (now = new Date()) => new Date(now.getTime() + 3 * 3600 * 1000).toISOString().slice(0, 10);

/**
 * ماسح HTML محرفاً محرفاً (لا تعبير نمطي على الوسوم): يفصل النص المرئي عن السمات وعن
 * كتل JSON-LD، ويُسقط محتوى script وstyle من النص.
 * @returns {{ text: string, attrs: { tag: string, name: string, value: string }[], ld: string[], els: { tag: string, raw: string, text: string }[] }}
 */
export function scan(html) {
  const lower = html.toLowerCase();
  let text = '';
  const attrs = [];
  const ld = [];
  const els = [];
  const open = [];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    const chunk = lt === -1 ? html.slice(i) : html.slice(i, lt);
    text += chunk;
    for (const el of open) el.text += chunk;
    if (lt === -1) break;
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    let j = lt + 1;
    let quote = null;
    while (j < html.length) {
      const c = html[j];
      if (quote) { if (c === quote) quote = null; }
      else if (c === '"' || c === "'") quote = c;
      else if (c === '>') break;
      j++;
    }
    const raw = html.slice(lt + 1, j);
    const closing = raw.startsWith('/');
    const name = (closing ? raw.slice(1) : raw).split(/[\s/]/)[0].toLowerCase();
    if (closing) {
      for (let k = open.length - 1; k >= 0; k--) {
        if (open[k].tag === name) { els.push(...open.splice(k)); break; }
      }
    } else {
      for (const m of raw.matchAll(/([^\s"'=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
        attrs.push({ tag: name, name: m[1].toLowerCase(), value: decode(m[2] ?? m[3] ?? '') });
      }
      if (name === 'script' || name === 'style') {
        const close = lower.indexOf(`</${name}`, j);
        const end = close === -1 ? html.length : close;
        if (name === 'script' && /type\s*=\s*["']application\/ld\+json["']/i.test(raw)) ld.push(html.slice(j + 1, end));
        i = end;
        continue;
      }
      // العناصر الموسومة للحرّاس تُجمع بنصّها
      if (/\sdata-guide/.test(raw)) open.push({ tag: name, raw, text: '' });
    }
    text += ' ';
    for (const el of open) el.text += ' ';
    i = j + 1;
  }
  els.push(...open);
  const norm = (t) => decode(t).replace(/\s+/g, ' ').trim();
  return { text: norm(text), attrs, ld, els: els.map((e) => ({ ...e, text: norm(e.text) })) };
}

/** محتوى <main> — نطاق الدليل داخل الصفحة (الترويسة والتذييل خارجه). */
export const mainOf = (html) => {
  const a = html.indexOf('<main');
  const b = html.lastIndexOf('</main>');
  return a === -1 || b === -1 ? '' : html.slice(a, b + 7);
};

const elText = (scanned, attr) => scanned.els.filter((e) => new RegExp(`\\s${attr}(?:[\\s=>]|$)`).test(e.raw)).map((e) => e.text);
const robots = (html) => html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
const hreflangs = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/g)].map((m) => m[1]);
const digits = (s) => s.replace(/\D/g, '');
/** النص بلا فواصل الأرقام الشائعة — رقم مكتوب بمسافات أو شرطات يُلتقط كما لو كان متصلاً. */
const compact = (s) => s.replace(/[\s ‎‏\-‐-―.()+/]/g, '');

/** قراءة ما يلزم الحرّاس من ترويسة ملف مرشد (بلا محلّل YAML: الحقول المقروءة بسيطة). */
export function parseGuideSource(md, file = '') {
  const src = md.replace(/\r\n?/g, '\n');
  const head = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const scalar = (text, key) => {
    const m = text.match(new RegExp(`^[ \\t]*${key}:[ \\t]*(.*)$`, 'm'));
    return m ? m[1].trim().replace(/^(["'])(.*)\1$/, '$2') : undefined;
  };
  const license = head.match(/^license:[ \t]*\n((?:[ \t]+.*\n?)+)/m)?.[1] ?? '';
  return {
    file,
    slug_ar: scalar(head, 'slug_ar'),
    slug_en: scalar(head, 'slug_en'),
    number: scalar(license, 'number'),
    expires: scalar(license, 'expires'),
    draft: scalar(head, 'draft') === 'true',
  };
}

/** هل تذكر صفحةٌ خارج الدليل فهرسَه؟ (رابط بأي ترميز) */
export const mentionsGuidesIndex = (html) =>
  html.includes(GUIDES_PATHS.en) || html.includes(GUIDES_PATHS.ar) || html.includes(encodeURI(GUIDES_PATHS.ar)) || html.includes(encodeURI(GUIDES_PATHS.ar).toLowerCase());

/**
 * @param {{
 *   today: string,
 *   sources: ReturnType<typeof parseGuideSource>[],
 *   index: { ar: string | null, en: string | null },
 *   details: { lang: 'ar' | 'en', slug: string, rel: string, html: string }[],
 *   legal: { ar: string | null, en: string | null },
 *   sitemap: string,
 *   inbound: string[],          // مسارات الصفحات خارج الدليل التي تذكر فهرسه
 * }} input
 */
export function checkGuides({ today, sources, index, details, legal, sitemap, inbound }) {
  const P = { C54: [], C55: [], C56: [], C57: [], C58: [] };
  const publishable = sources.filter((s) => !s.draft && s.expires && s.expires >= today);
  const bySlug = { ar: new Map(sources.map((s) => [s.slug_ar, s])), en: new Map(sources.map((s) => [s.slug_en, s])) };
  for (const s of sources) {
    if (!s.slug_ar || !s.slug_en || !s.number || !/^\d{4}-\d{2}-\d{2}$/.test(s.expires ?? '')) P.C57.push(`${s.file}: تعذّرت قراءة slug_ar/slug_en/license.number/license.expires من الترويسة`);
  }

  const pages = [
    ...(['ar', 'en']).filter((l) => index[l]).map((l) => ({ kind: 'index', lang: l, rel: `${l === 'ar' ? GUIDES_AR_DIR : GUIDES_EN_DIR}/index.html`, html: index[l] })),
    ...details.map((p) => ({ kind: 'detail', ...p })),
  ];
  let contactButtons = 0;

  for (const page of pages) {
    const main = mainOf(page.html);
    if (!main) { P.C56.push(`${page.rel}: لا عنصر <main>`); continue; }
    const m = scan(main);
    const whole = scan(page.html);
    const src = page.kind === 'detail' ? bySlug[page.lang].get(page.slug) : undefined;

    // ── C54: وسائل التواصل أزرار لا نصوص ──
    const hrefs = [...main.matchAll(/<a\b[^>]*?\shref="([^"]*)"[^>]*>/g)].map((x) => ({ href: decode(x[1]), tag: x[0] }));
    const phones = new Set();
    const emails = new Set();
    for (const { href, tag } of hrefs) {
      const wa = href.match(/^https:\/\/wa\.me\/(\d+)/)?.[1];
      const tel = href.startsWith('tel:') ? digits(href) : null;
      const mail = href.startsWith('mailto:') ? href.slice(7).split('?')[0].toLowerCase() : null;
      if (!wa && !tel && !mail) continue;
      contactButtons++;
      if (!/\sdata-track="guide_(?:contact|join)"/.test(tag)) P.C54.push(`${page.rel}: زر تواصل بلا data-track (${href.split(/[:/]/)[0]})`);
      if (wa && wa !== SITE_WHATSAPP) phones.add(wa);
      if (tel) phones.add(tel);
      if (mail && mail !== SITE_EMAIL) emails.add(mail);
    }
    const visible = [whole.text, ...whole.attrs.filter((a) => a.name !== 'href').map((a) => a.value), ...whole.ld].join(' \n ');
    const visibleCompact = compact(visible);
    for (const num of phones) {
      const forms = new Set([num]);
      if (num.startsWith('966')) { forms.add(`0${num.slice(3)}`); forms.add(num.slice(3)); }
      for (const f of forms) if (f.length >= 8 && visibleCompact.includes(f)) { P.C54.push(`${page.rel}: رقم تواصل المرشد ظاهر نصاً أو في سمة/JSON-LD (…${f.slice(-4)})`); break; }
    }
    for (const mail of emails) if (visible.toLowerCase().includes(mail)) P.C54.push(`${page.rel}: بريد المرشد ظاهر نصاً أو في سمة/JSON-LD`);
    // أنماط عامة في نصّ <main>: بريد غير بريد الموقع، أو رقم جوال — بعد إسقاط رقم الرخصة نفسه
    let body = m.text;
    for (const lic of elText(m, 'data-guide-license')) if (lic) body = body.split(lic).join(' ');
    for (const e of body.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g) ?? []) {
      if (e.toLowerCase() !== SITE_EMAIL) P.C54.push(`${page.rel}: بريد إلكتروني ظاهر نصاً في متن الصفحة`);
    }
    if (/(?:\+|00)\d(?:[\s\-.()]*\d){8,}/.test(body) || /(?<!\d)0?5\d(?:[\s\-.]?\d){7}(?!\d)/.test(body)) P.C54.push(`${page.rel}: رقم هاتف ظاهر نصاً في متن الصفحة`);
    for (const raw of whole.ld) {
      if (/"@type"\s*:\s*"Person"/.test(raw) && /"(?:telephone|email|contactPoint|faxNumber)"\s*:/.test(raw)) P.C54.push(`${page.rel}: وسيلة تواصل داخل JSON-LD Person`);
    }

    // ── C55: لا تقييم ولا سعر ──
    for (const raw of whole.ld) {
      const hit = raw.match(/AggregateRating|"Review"|"ratingValue"|"reviewCount"|"offers"|"Offer"|"price"|"priceRange"|"priceCurrency"/);
      if (hit) P.C55.push(`${page.rel}: ${hit[0]} في JSON-LD`);
    }
    for (const a of m.attrs) {
      if (a.name === 'itemprop' && /^(?:ratingValue|reviewCount|aggregateRating|review|price|priceCurrency|offers)$/i.test(a.value)) P.C55.push(`${page.rel}: itemprop="${a.value}"`);
      if (a.name === 'class' && a.value.split(/\s+/).some((c) => /(?:^|[-_])(?:rating|ratings|stars?|reviews?|price|prices)(?:$|[-_])/i.test(c))) P.C55.push(`${page.rel}: صنف تقييم/سعر «${a.value}»`);
    }
    if (/[★☆⭐\u{1F31F}]/u.test(m.text)) P.C55.push(`${page.rel}: رمز نجمة في متن الصفحة`);
    if (/\d[\d.,]*\s*(?:ريال|ر\.\s?س|SAR\b|SR\b|USD\b|EUR\b|دولار|[$€£﷼])|(?:SAR|SR|USD|EUR|[$€£﷼])\s*\d/i.test(m.text)) P.C55.push(`${page.rel}: مبلغ بعملة في متن الصفحة`);
    if (/(?<![\d.])[0-5](?:\.\d)?\s*\/\s*5(?![\d.])/.test(m.text)) P.C55.push(`${page.rel}: صيغة تقييم (س/5) في متن الصفحة`);
    const ranking = m.text.match(/الأكثر طلب|الأعلى تقييم|مميَّز|عضو منذ|سرعة الرد|تقييمات|\b(?:most requested|top[- ]rated|featured|member since|response time|reviews?|ratings?)\b/i);
    if (ranking) P.C55.push(`${page.rel}: عبارة ترتيب أو تقييم «${ranking[0]}»`);
    if (/[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}]/u.test(m.text)) P.C55.push(`${page.rel}: علم أو إيموجي في متن الصفحة`);

    // ── C56: الرخصة وإخلاء المسؤولية واللفظ ──
    const disc = elText(m, 'data-guides-disclaimer');
    if (!disc.length) P.C56.push(`${page.rel}: إخلاء المسؤولية غائب`);
    else if (disc.some((d) => d !== DISCLAIMER[page.lang])) P.C56.push(`${page.rel}: إخلاء المسؤولية يخالف نصّه المعتمد`);
    if (FORBIDDEN_WORDING[page.lang].test(m.text)) P.C56.push(`${page.rel}: لفظ «${m.text.match(FORBIDDEN_WORDING[page.lang])[0]}» — اللفظ «مرخّص» / licensed`);
    if (page.kind === 'detail') {
      const lic = elText(m, 'data-guide-license');
      if (lic.length !== 1 || !lic[0]) P.C56.push(`${page.rel}: رقم الرخصة غير معروض`);
      else if (!src) P.C56.push(`${page.rel}: لا ملف مصدر لهذه الصفحة`);
      else if (lic[0] !== src.number) P.C56.push(`${page.rel}: رقم الرخصة المعروض «${lic[0]}» يخالف المصدر «${src.number}»`);
      if (!m.text.includes(ISSUER[page.lang])) P.C56.push(`${page.rel}: الجهة المرخِّصة غير معروضة`);
      if (!LICENSED[page.lang].test(m.text)) P.C56.push(`${page.rel}: لا وصف «مرخّص» / licensed`);
      if (!m.text.includes(STATED[page.lang])) P.C56.push(`${page.rel}: وسم «${STATED[page.lang]}» غائب عن النبذة`);
      if (!/"@type"\s*:\s*"Person"/.test(whole.ld.join('\n'))) P.C56.push(`${page.rel}: لا JSON-LD Person`);

      // ── C57: تاريخ الانتهاء المعروض ──
      const exp = [...main.matchAll(/<time\b[^>]*>/g)].map((x) => x[0]).filter((tag) => /\sdata-guide-expires(?:[\s=>]|$)/.test(tag)).map((tag) => tag.match(/\sdatetime="([^"]*)"/)?.[1]);
      if (exp.length !== 1 || !/^\d{4}-\d{2}-\d{2}$/.test(exp[0] ?? '')) P.C57.push(`${page.rel}: تاريخ انتهاء الرخصة غير معروض بصيغة YYYY-MM-DD`);
      else {
        if (exp[0] < today) P.C57.push(`${page.rel}: رخصة منتهية منشورة (${exp[0]} قبل ${today})`);
        if (src && exp[0] !== src.expires) P.C57.push(`${page.rel}: تاريخ الانتهاء المعروض ${exp[0]} يخالف المصدر ${src.expires}`);
      }
    }
  }

  // ── C56 (تتمة): الفهرسان مبنيّان دائماً، وصفحة السياسات تحمل الإخلاء ──
  for (const l of ['ar', 'en']) {
    if (!index[l]) P.C56.push(`فهرس الدليل (${l}) غائب عن dist`);
    if (!legal[l]) P.C56.push(`صفحة السياسات (${l}) غائبة عن dist`);
    else if (!scan(mainOf(legal[l])).text.includes(DISCLAIMER[l])) P.C56.push(`صفحة السياسات (${l}) لا تحمل بند دليل المرشدين بنصّه`);
  }

  // ── C57: المبنيّ = المنشور من المصدر بالضبط ──
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => { try { return decodeURI(x[1]); } catch { return x[1]; } });
  for (const l of ['ar', 'en']) {
    const key = l === 'ar' ? 'slug_ar' : 'slug_en';
    const want = new Set(publishable.map((s) => s[key]));
    const got = new Set(details.filter((p) => p.lang === l).map((p) => p.slug));
    for (const slug of got) {
      if (want.has(slug)) continue;
      const s = bySlug[l].get(slug);
      P.C57.push(`${l}: صفحة مبنية لمرشد غير منشور «${slug}» (${!s ? 'لا ملف مصدر' : s.draft ? 'مسودة' : `رخصته انتهت ${s.expires}`})`);
    }
    for (const slug of want) if (!got.has(slug)) P.C57.push(`${l}: مرشد منشور بلا صفحة «${slug}»`);
    const base = `${SITE}${GUIDES_PATHS[l]}`;
    const inMap = new Set(locs.filter((u) => u.startsWith(base) && u !== base).map((u) => u.slice(base.length).replace(/\/$/, '')));
    for (const slug of inMap) if (!want.has(slug)) P.C57.push(`${l}: sitemap تعلن صفحة مرشد غير منشور «${slug}»`);
    for (const slug of want) if (!inMap.has(slug)) P.C57.push(`${l}: صفحة المرشد «${slug}» خارج sitemap`);
    if (index[l]) {
      const main = mainOf(index[l]);
      const declared = Number(main.match(/\sdata-guides-count="(\d+)"/)?.[1] ?? NaN);
      const cards = (main.match(/\sdata-gd-card(?:[\s=>])/g) ?? []).length;
      if (declared !== publishable.length || cards !== publishable.length) P.C57.push(`${l}: الفهرس يعرض ${cards} بطاقة (data-guides-count=${declared}) والمنشور من المصدر ${publishable.length}`);
    }
  }

  // ── C58: حالة الدليل مشتقة من العدّ ──
  const listed = publishable.length > 0;
  for (const l of ['ar', 'en']) {
    const html = index[l];
    if (!html) continue;
    const base = `${SITE}${GUIDES_PATHS[l]}`;
    const noindex = /noindex/.test(robots(html));
    const langs = hreflangs(html);
    const empty = /\sdata-guides-empty(?:[\s=>])/.test(html);
    if (listed) {
      if (noindex) P.C58.push(`${l}: الفهرس noindex وفيه ${publishable.length} مرشداً منشوراً`);
      if (!langs.includes('ar') || !langs.includes('en')) P.C58.push(`${l}: الفهرس بلا hreflang ar/en`);
      if (langs.some((x) => !['ar', 'en', 'x-default'].includes(x))) P.C58.push(`${l}: الفهرس يعلن لغة غير العربية والإنجليزية (${langs.join(',')})`);
      if (!locs.includes(base)) P.C58.push(`${l}: الفهرس خارج sitemap`);
      if (empty) P.C58.push(`${l}: الحالة الفارغة معروضة وفي الدليل مرشدون`);
    } else {
      if (!noindex) P.C58.push(`${l}: الفهرس مفهرَس بلا أي مرشد منشور`);
      if (langs.length) P.C58.push(`${l}: الفهرس الفارغ يعلن hreflang`);
      if (locs.includes(base)) P.C58.push(`${l}: الفهرس الفارغ في sitemap`);
      if (!empty) P.C58.push(`${l}: الحالة الفارغة غير معروضة`);
    }
  }
  const foreign = inbound.filter((rel) => /^(?:zh|de|ru|ur)\//.test(rel));
  if (foreign.length) P.C58.push(`رابط إلى الدليل من ${foreign.length} صفحة بلغة لا نسخة له بها: ${foreign.slice(0, 3).join(' · ')}`);
  if (listed) {
    const en = inbound.filter((rel) => rel.startsWith('en/')).length;
    const arN = inbound.length - en - foreign.length;
    if (!arN || !en) P.C58.push(`الدليل معلَن ولا رابط إليه من صفحات العربية (${arN}) أو الإنجليزية (${en})`);
  } else if (inbound.length) {
    P.C58.push(`الدليل بلا مرشد منشور و${inbound.length} صفحة تربط إليه: ${inbound.slice(0, 3).join(' · ')}`);
  }

  return {
    problems: P,
    stats: {
      sources: sources.length, publishable: publishable.length, withheld: sources.length - publishable.length,
      pages: pages.length, details: details.length, contactButtons, inbound: inbound.length, listed,
    },
  };
}
