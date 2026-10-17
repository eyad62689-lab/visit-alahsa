// منطق الحارس C28 — صفحة «دليل التأشيرات» (أُعيدت كتابته 2026-10-16 مع إعادة كتابة الصفحة).
// دالةٌ نقية على نصوص (صفحتا dist بلغتيهما وخريطة الموقع) لا على الملفات، فيُختبر كسرها على
// نسخةٍ في الذاكرة بلا بناء ولا مسّ للمصدر؛ والقراءة في tools/check-consistency.mjs.
//
// قرار إياد (2026-10-16): الصفحة دليل مختصر بلا أي معلومة غير مؤكدة، فالحارس يُلزم في كل لغة مبنية:
//   (أ) لا عبارة شك أو تعليم («لم يُتحقَّق» وأخواتها) في متن الصفحة.
//   (ب) لا رسوم ولا عملات: لا «ريال» ولا «دولار» ولا SAR/USD ولا رمز عملة، ولا رقم ملاصق لكلمة رسم.
//   (ج) كل رابط خارجي في المتن من الروابط الرسمية (VISA_OFFICIAL_LINKS) حرفياً، وكل الروابط
//       الرسمية حاضرة، وكلها بـtarget="_blank" وrel يحوي noopener.
//   (د) الأسئلة الشائعة بين 5 و7، وكتلة FAQPage في JSON-LD تطابقها سؤالاً وجواباً وترتيباً.
//   (هـ) 5 روابط داخلية مميزة على الأقل، كلها بشرطة ختامية قبل أي مرساة.
//   (و) سطر «تاريخ آخر تحديث» وسطر الرسوم العام حاضران حرفياً.
//   (ز) ملاحظة «يجب فتح كل رابط يدوياً قبل النشر» غائبةٌ عن بناء الإنتاج وحاضرةٌ في المعاينة.
//   (ح) hreflang متبادل بين اللغتين في الصفحة وفي sitemap (xhtml:link)، وBreadcrumbList حاضر.
//   (ط) العنوان (قبل اسم الموقع) ≤ 60 حرفاً، والوصف 140–160 حرفاً، ولا رقم عربي-هندي.
import {
  VISA_GUIDE_ALT, VISA_GUIDE_PATH, VISA_LANGS, VISA_UPDATED_LINE, VISA_FEES_LINE, VISA_PREVIEW_NOTE,
  VISA_OFFICIAL_LINKS, VISA_FORBIDDEN_PHRASES, VISA_LIMITS, visaLimits,
} from '../src/lib/visa-guide.mjs';
import { cutBlocks } from './check-visit-card.mjs';

export { VISA_GUIDE_ALT, VISA_GUIDE_PATH, VISA_LANGS, VISA_PREVIEW_NOTE };

const DEC = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = (t) => t.replace(/&(?:amp|quot|#39|#x27|lt|gt|nbsp);/g, (e) => DEC[e]);
// إسقاط <script> و<style> بالمسح الخطي (cutBlocks من check-visit-card.mjs، لا تعبير نمطي على HTML)
// ثم تقشير الوسوم حتى الاستقرار — الشكل الذي لا يعدّه CodeQL js/bad-tag-filter.
const stripTags = (html) => {
  let prev;
  do { prev = html; html = html.replace(/<[^<>]*>/g, ' '); } while (html !== prev);
  return html;
};
const strip = (html) => decode(stripTags(cutBlocks(cutBlocks(html, 'script').out, 'style').out)).replace(/\s+/g, ' ').trim();
const norm = (t) => decode(t).replace(/\s+/g, ' ').trim();

/** كل الوصلات في قطعة HTML: href وtarget وrel ونصّها. */
function anchors(html) {
  const out = [];
  for (const m of html.matchAll(/<a\s([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attrs = m[1];
    out.push({
      href: decode(attrs.match(/\shref="([^"]*)"|^href="([^"]*)"/)?.[1] ?? attrs.match(/href="([^"]*)"/)?.[1] ?? ''),
      target: attrs.match(/target="([^"]*)"/)?.[1],
      rel: attrs.match(/rel="([^"]*)"/)?.[1] ?? '',
      text: norm(strip(m[2])),
    });
  }
  return out;
}

/** كتل JSON-LD في الصفحة. */
function jsonLd(page) {
  const out = [];
  for (const m of page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const v = JSON.parse(m[1]); (Array.isArray(v) ? v : [v]).forEach((x) => out.push(x)); } catch { out.push(null); }
  }
  return out;
}

/** فحص صفحة واحدة بلغتها. */
function checkPage(lang, page, context) {
  const problems = [];
  const stats = {};
  const main = page.match(/<main id="main"[^>]*>([\s\S]*?)<\/main>/)?.[1];
  if (!main) return { problems: [`[${lang}] تعذّر عزل <main> في الصفحة المنشورة`], stats };
  const text = strip(main);
  stats.words = text.split(/\s+/).filter(Boolean).length;

  // (أ) عبارات الشك
  const lower = text.toLowerCase();
  for (const ph of VISA_FORBIDDEN_PHRASES) if (lower.includes(ph.toLowerCase())) problems.push(`[${lang}] عبارة شك منشورة: «${ph}»`);

  // (ب) رسوم وعملات
  const money = text.match(/ريال|دولار|\bSAR\b|\bUSD\b|[$€£]|\d\s*(?:رسم|رسوم)|(?:رسم|رسوم|fee|fees)\s*(?:of|:)?\s*\d/i);
  if (money) problems.push(`[${lang}] رسم أو عملة في المتن: «${money[0]}»`);
  if (/[٠-٩]/.test(text)) problems.push(`[${lang}] رقم عربي-هندي في المتن`);

  // (ج) الروابط الخارجية
  const official = new Set(Object.values(VISA_OFFICIAL_LINKS));
  const links = anchors(main);
  const ext = links.filter((a) => /^https?:\/\//.test(a.href));
  const strangers = ext.filter((a) => !official.has(a.href));
  if (strangers.length) problems.push(`[${lang}] ${strangers.length} رابطاً خارجياً ليس من الروابط الرسمية — أولها ${strangers[0].href}`);
  const missing = [...official].filter((h) => !ext.some((a) => a.href === h));
  if (missing.length) problems.push(`[${lang}] ${missing.length} رابطاً رسمياً غائباً — أولها ${missing[0]}`);
  const noTab = ext.filter((a) => a.target !== '_blank' || !a.rel.split(/\s+/).includes('noopener'));
  if (noTab.length) problems.push(`[${lang}] ${noTab.length} رابطاً خارجياً بلا target="_blank" وrel="noopener" — أولها ${noTab[0].href}`);
  stats.external = ext.length;

  // (د) الأسئلة الشائعة وFAQPage
  const faqHtml = main.match(/<section[^>]*data-vg-faq[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  const visible = [...faqHtml.matchAll(/<summary class="faq-q"[^>]*>([\s\S]*?)<\/summary>\s*<p class="faq-a"[^>]*>([\s\S]*?)<\/p>/g)].map((m) => ({ q: norm(strip(m[1])), a: norm(strip(m[2])) }));
  stats.faq = visible.length;
  if (visible.length < VISA_LIMITS.faqMin || visible.length > VISA_LIMITS.faqMax) problems.push(`[${lang}] الأسئلة الشائعة ${visible.length} — المتوقع ${VISA_LIMITS.faqMin}–${VISA_LIMITS.faqMax}`);
  const ld = jsonLd(page);
  if (ld.includes(null)) problems.push(`[${lang}] كتلة ld+json غير صالحة`);
  const faqLd = ld.find((x) => x && x['@type'] === 'FAQPage');
  if (!faqLd) problems.push(`[${lang}] كتلة FAQPage غائبة`);
  else {
    const ent = Array.isArray(faqLd.mainEntity) ? faqLd.mainEntity : [];
    if (ent.length !== visible.length) problems.push(`[${lang}] FAQPage تحمل ${ent.length} سؤالاً والمرئي ${visible.length}`);
    for (let k = 0; k < Math.min(ent.length, visible.length); k++) {
      if (norm(ent[k].name ?? '') !== visible[k].q) { problems.push(`[${lang}] السؤال ${k + 1} في FAQPage يخالف المرئي: «${ent[k].name}»`); break; }
      if (norm(ent[k].acceptedAnswer?.text ?? '') !== visible[k].a) { problems.push(`[${lang}] جواب السؤال ${k + 1} في FAQPage يخالف المرئي`); break; }
    }
  }
  if (!ld.some((x) => x && x['@type'] === 'BreadcrumbList')) problems.push(`[${lang}] كتلة BreadcrumbList غائبة`);

  // (هـ) الروابط الداخلية
  const self = VISA_GUIDE_ALT[lang];
  const internal = new Set(links.map((a) => a.href).filter((h) => h.startsWith('/') && h !== self && !h.startsWith(self + '#')));
  stats.internal = internal.size;
  if (internal.size < VISA_LIMITS.internalLinksMin) problems.push(`[${lang}] الروابط الداخلية ${internal.size} — المتوقع ≥${VISA_LIMITS.internalLinksMin}`);
  const noSlash = [...internal].filter((h) => !/\/(?:#[^#]*)?$/.test(h));
  if (noSlash.length) problems.push(`[${lang}] رابط داخلي بلا شرطة ختامية: ${noSlash[0]}`);

  // (و) سطرا التحديث والرسوم
  const updated = page.match(/data-vg-updated[^>]*>([^<]*)</)?.[1];
  if (updated === undefined || norm(updated) !== VISA_UPDATED_LINE[lang]) problems.push(`[${lang}] سطر «${VISA_UPDATED_LINE[lang]}» غائب أو محرَّف`);
  const fees = page.match(/data-vg-fees[^>]*>([^<]*)</)?.[1];
  if (fees === undefined || norm(fees) !== VISA_FEES_LINE[lang]) problems.push(`[${lang}] سطر الرسوم العام «${VISA_FEES_LINE[lang]}» غائب أو محرَّف`);

  // (ز) ملاحظة المعاينة
  const production = !context || context === 'production';
  const note = page.match(/data-vg-preview-note[^>]*>([^<]*)</)?.[1];
  if (production && (note !== undefined || page.includes(VISA_PREVIEW_NOTE))) problems.push(`[${lang}] ملاحظة «${VISA_PREVIEW_NOTE}» في بناء الإنتاج`);
  if (!production && (note === undefined || norm(note) !== VISA_PREVIEW_NOTE)) problems.push(`[${lang}] ملاحظة المعاينة غائبة عن بناء ${context}`);

  // (ح) hreflang متبادل
  for (const l of VISA_LANGS) {
    const re = new RegExp(`<link rel="alternate" hreflang="${l}" href="https://visit-alahsa.com${encodeURI(VISA_GUIDE_ALT[l]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`);
    if (!re.test(page)) problems.push(`[${lang}] hreflang="${l}" غائب أو يقصد مساراً آخر`);
  }

  // (ط) العنوان والوصف — بحدود لغة الصفحة
  const LIM = visaLimits(lang);
  const title = norm(page.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  const own = title.replace(/\s[—–|]\s[^—–|]*$/, ''); // ما قبل فاصل اسم الموقع (titleSep: — أو –)
  stats.title = [...own].length;
  if (!own || stats.title > LIM.titleMax) problems.push(`[${lang}] العنوان ${stats.title} حرفاً — المتوقع ≤${LIM.titleMax}`);
  const desc = norm(page.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  stats.desc = [...desc].length;
  if (stats.desc < LIM.descMin || stats.desc > LIM.descMax) problems.push(`[${lang}] الوصف ${stats.desc} حرفاً — المتوقع ${LIM.descMin}–${LIM.descMax}`);

  return { problems, stats };
}

/**
 * @param {{ pages: Record<string, string>, sitemap: string, context?: string }} input
 * @returns {{ problems: string[], stats: Record<string, object> }}
 */
export function checkVisaGuide({ pages, sitemap, context }) {
  const problems = [];
  const stats = {};
  for (const lang of VISA_LANGS) {
    const page = pages[lang];
    if (!page) { problems.push(`[${lang}] صفحة ${VISA_GUIDE_ALT[lang]} غائبة`); continue; }
    const r = checkPage(lang, page, context);
    problems.push(...r.problems);
    stats[lang] = r.stats;
    const loc = `<loc>https://visit-alahsa.com${encodeURI(VISA_GUIDE_ALT[lang])}</loc>`;
    const entry = sitemap.split('<url>').find((u) => u.includes(loc));
    if (!entry) problems.push(`[${lang}] الصفحة غائبة عن sitemap`);
    else for (const l of VISA_LANGS) if (!entry.includes(`hreflang="${l}"`)) problems.push(`[${lang}] مدخل sitemap بلا xhtml:link لـ${l}`);
  }
  return { problems, stats };
}
