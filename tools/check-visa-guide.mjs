// منطق الحارس C28 — صفحة «دليل التأشيرات» (2026-09-26). دالةٌ نقية على نصوص (المصدر وصفحة
// dist وخريطة الموقع) لا على الملفات، فيُختبر كسرها على نسخةٍ في الذاكرة بلا بناء ولا مسّ
// للمصدر؛ والقراءة في tools/check-consistency.mjs.
//
// قرار إياد: النص منسوخ حرفياً من «الجزء الثاني» (src/data/visa-guide.md) ولا يُعاد صوغه،
// فالحارس يُلزم:
//   (أ) نصّ الصفحة المنشور (العنوان + النبذة + المتن) يساوي المصدر كلمةً بكلمة وبترتيبه،
//       بعد نزع رموز الماركداون وحدها — فلا حذف ولا إضافة ولا تبديل رقم.
//   (ب) كل «لم يُتحقَّق» في المصدر منشورٌ داخل <mark class="vg-unverified"> — العدد متساوٍ،
//       ولا ورود خارج الوسم، وقاعدة CSS الموسومة موجودة في الصفحة.
//   (ج) كل رابط في المصدر منشورٌ بترتيبه: href ونصّه حرفياً، وtarget="_blank" وrel يحوي
//       noopener — ولا رابط في المتن ليس في المصدر.
//   (د) سطر «تاريخ آخر تحديث: 26 سبتمبر 2026» منشورٌ حرفياً.
//   (هـ) ملاحظة «يجب فتح كل رابط يدوياً قبل النشر» غائبةٌ عن بناء الإنتاج (CONTEXT غائب أو
//       production) وحاضرةٌ في معاينة النشر (أي CONTEXT آخر).
//   (و) عربية فقط: لا hreflang في الصفحة، وهي في sitemap بلا روابط بديلة.
import { VISA_GUIDE_PATH, VISA_UPDATED_LINE, VISA_PREVIEW_NOTE, UNVERIFIED } from '../src/lib/visa-guide.mjs';

export { VISA_GUIDE_PATH, VISA_PREVIEW_NOTE };

/** أدنى عدد مقبول لـ«لم يُتحقَّق» وللروابط في المصدر — كي لا يصير الحارس فارغاً بصمت. */
export const EXPECT_MIN = { unverified: 30, links: 90 };

const DEC = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = (t) => t.replace(/&(?:amp|quot|#39|#x27|lt|gt|nbsp);/g, (e) => DEC[e]);
const count = (hay, needle) => hay.split(needle).length - 1;
const tokens = (t) => t.split(/\s+/).filter(Boolean);

// وسوم سطرية تُنزع بلا فاصل (الكلمة الملاصقة لرابط تبقى كلمةً واحدة كما في المصدر)،
// وما عداها كتليّ يُستبدل بمسافة. ماسحٌ محرفاً محرفاً لا تعبير نمطي على الوسوم.
const INLINE = new Set(['a', 'strong', 'em', 'b', 'i', 'mark', 'span', 'code']);
function scan(html) {
  let text = '';
  const anchors = [];
  let open = null;
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    const chunk = lt === -1 ? html.slice(i) : html.slice(i, lt);
    text += chunk;
    if (open) open.text += chunk;
    if (lt === -1) break;
    const gt = html.indexOf('>', lt);
    if (gt === -1) break;
    const tag = html.slice(lt + 1, gt);
    const closing = tag.startsWith('/');
    const name = (closing ? tag.slice(1) : tag).split(/[\s/]/)[0].toLowerCase();
    if (name === 'a') {
      if (closing && open) { anchors.push(open); open = null; }
      else if (!closing) {
        open = {
          href: decode(tag.match(/\shref="([^"]*)"/)?.[1] ?? ''),
          target: tag.match(/\starget="([^"]*)"/)?.[1],
          rel: tag.match(/\srel="([^"]*)"/)?.[1] ?? '',
          text: '',
        };
      }
    }
    if (!INLINE.has(name)) text += ' ';
    i = gt + 1;
  }
  return { text: decode(text), anchors: anchors.map((a) => ({ ...a, text: decode(a.text).trim() })) };
}

/** توقّعات المصدر: كلماته بلا رموز الماركداون، وروابطه بترتيبها، وعدد «لم يُتحقَّق». */
export function expectFromSource(md) {
  const src = md.replace(/\r\n?/g, '\n');
  const links = [];
  for (const m of src.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s|)]+)/g)) {
    links.push(m[3] ? { href: m[3], text: m[3] } : { href: m[2], text: m[1] });
  }
  const text = src.split('\n')
    // صفّ فاصل الجدول («|---|---|») والخط الأفقي «---» رمزان لا نصّ
    .filter((l) => !(l.includes('---') && /^[\s|:-]+$/.test(l)))
    .map((l) => l
      .replace(/^#{1,6}\s+/, '')
      .replace(/^\s*(?:[-*]|\d+\.)\s+/, '')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')
      .replace(/\*\*/g, '')
      .replace(/\|/g, ' '))
    .join('\n');
  return { tokens: tokens(text), links, unverified: count(src, UNVERIFIED) };
}

/**
 * @param {{ md: string, page: string, sitemap: string, context?: string }} input
 * @returns {{ problems: string[], stats: { unverified: number, marks: number, links: number, tokens: number } }}
 */
export function checkVisaGuide({ md, page, sitemap, context }) {
  const problems = [];
  const exp = expectFromSource(md);
  if (exp.unverified < EXPECT_MIN.unverified) problems.push(`المصدر يحمل ${exp.unverified} «لم يُتحقَّق» — المتوقع ≥${EXPECT_MIN.unverified} (الحارس صار فارغاً؟)`);
  if (exp.links.length < EXPECT_MIN.links) problems.push(`المصدر يحمل ${exp.links.length} رابطاً — المتوقع ≥${EXPECT_MIN.links}`);

  const pick = (re, what) => { const m = page.match(re); if (!m) problems.push(`تعذّر عزل ${what} في الصفحة المنشورة`); return m?.[1] ?? ''; };
  const h1 = pick(/<h1 class="pgh-title"[^>]*>([\s\S]*?)<\/h1>/, 'العنوان');
  const lead = pick(/<p class="pgh-lead"[^>]*>([\s\S]*?)<\/p>/, 'النبذة');
  const body = pick(/<article class="vg-body"[^>]*>([\s\S]*?)<\/article>/, 'المتن');

  // (أ) النص حرفياً
  const got = [...tokens(scan(h1).text), ...tokens(scan(lead).text), ...tokens(scan(body).text)];
  const n = Math.max(got.length, exp.tokens.length);
  for (let k = 0; k < n; k++) {
    if (got[k] !== exp.tokens[k]) {
      problems.push(`النص المنشور يخالف المصدر عند الكلمة ${k + 1}: المصدر «${exp.tokens.slice(Math.max(0, k - 3), k + 3).join(' ')}» والمنشور «${got.slice(Math.max(0, k - 3), k + 3).join(' ')}»`);
      break;
    }
  }

  // (ب) «لم يُتحقَّق» موسومة كلها
  const marks = [...body.matchAll(/<mark class="vg-unverified">([^<]*)<\/mark>/g)].map((m) => decode(m[1]));
  const marked = marks.filter((t) => t.startsWith(UNVERIFIED)).length;
  const inBody = count(body, UNVERIFIED);
  if (marked !== exp.unverified) problems.push(`«لم يُتحقَّق» الموسومة ${marked} — المصدر ${exp.unverified}`);
  if (inBody !== marked) problems.push(`«لم يُتحقَّق» في المتن ${inBody} مرة، الموسوم منها ${marked} — ورودٌ بلا وسم`);
  if (marks.length !== marked) problems.push(`${marks.length - marked} وسم vg-unverified على نصّ لا يبدأ بـ«لم يُتحقَّق»`);
  if (!/mark\.vg-unverified[^{]*\{[^}]*background:/.test(page)) problems.push('قاعدة CSS لـmark.vg-unverified (الخلفية المميِّزة) غائبة عن الصفحة');

  // (ج) الروابط بترتيبها وخصائصها
  const anchors = scan(body).anchors;
  if (anchors.length !== exp.links.length) problems.push(`روابط المتن ${anchors.length} — المصدر ${exp.links.length}`);
  for (let k = 0; k < Math.min(anchors.length, exp.links.length); k++) {
    const a = anchors[k], e = exp.links[k];
    if (a.href !== e.href) { problems.push(`الرابط ${k + 1}: href «${a.href}» ≠ المصدر «${e.href}»`); break; }
    if (a.text !== e.text) { problems.push(`الرابط ${k + 1}: النص «${a.text}» ≠ المصدر «${e.text}»`); break; }
  }
  const noTab = anchors.filter((a) => a.target !== '_blank' || !a.rel.split(/\s+/).includes('noopener'));
  if (noTab.length) problems.push(`${noTab.length} رابطاً بلا target="_blank" وrel="noopener" — أولها ${noTab[0].href}`);

  // (د) سطر التحديث
  const updated = page.match(/data-vg-updated[^>]*>([^<]*)</)?.[1];
  if (updated === undefined || decode(updated).trim() !== VISA_UPDATED_LINE) problems.push(`سطر «${VISA_UPDATED_LINE}» غائب أو محرَّف`);

  // (هـ) ملاحظة المعاينة
  const production = !context || context === 'production';
  const note = page.match(/data-vg-preview-note[^>]*>([^<]*)</)?.[1];
  if (production && (note !== undefined || page.includes(VISA_PREVIEW_NOTE))) problems.push(`ملاحظة «${VISA_PREVIEW_NOTE}» في بناء الإنتاج`);
  if (!production && (note === undefined || decode(note).trim() !== VISA_PREVIEW_NOTE)) problems.push(`ملاحظة المعاينة غائبة عن بناء ${context}`);

  // (و) عربية فقط
  if (/hreflang=/.test(page)) problems.push('الصفحة تعلن hreflang وهي عربية فقط');
  const loc = `<loc>https://visit-alahsa.com${encodeURI(VISA_GUIDE_PATH)}</loc>`;
  const entry = sitemap.split('<url>').find((u) => u.includes(loc));
  if (!entry) problems.push('الصفحة غائبة عن sitemap');
  else if (entry.includes('xhtml:link')) problems.push('مدخل الصفحة في sitemap يعلن روابط بديلة وهي عربية فقط');

  return { problems, stats: { unverified: exp.unverified, marks: marked, links: anchors.length, tokens: got.length } };
}
