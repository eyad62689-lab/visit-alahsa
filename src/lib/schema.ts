// ثوابت JSON-LD المشتركة — مصدر واحد لهوية الموقع في كل السكيمات.
//
// كانت كتلتا Organization وWebSite تُكتبان يدوياً في الرئيسية، ومنشئ المدونة
// وحامل الحقوق في Base بأسماء متفاوتة («الأحساء»، «زوروا الأحساء»، «Visit
// Al-Ahsa»…). هنا كيان واحد بمعرّف @id ثابت تشير إليه كل الصفحات فتتطابق.
// المعرّف @id واحد لكل اللغات، والاسم اسم العلامة بلغة الصفحة (site.brand).

import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

export const SITE = 'https://visit-alahsa.com';

/** اسم العلامة بلغة الصفحة — «زوروا الأحساء» في العربية و«Visit Al-Ahsa» في بقية اللغات (مفتاح site.brand). */
export const brandName = (lang: Lang): string => useTranslations(lang)('site.brand');

/** الجهة الناشرة وحاملة الحقوق — العقدة نفسها في كل صفحة (@id ثابت). */
export const ORG_ID = `${SITE}/#org`;
// هوية الكيان (قرار المالك 2026-09-27 بعد تدقيق الظهور في محركات الإجابة): «مبادرة
// مستقلة» بلا اسم شخص ولا جهة؛ الاسمان معاً في alternateName حتى يلتقي البحث بالعربية
// والإنجليزية على العقدة نفسها، والوصف والبريد وصفحة «من نحن» تعطي النماذج جواب «ما هذا الموقع؟».
const ORG_DESC: Record<Lang, string> = {
  ar: 'مبادرة مستقلة: دليل سياحي رقمي عن محافظة الأحساء في السعودية — ليست جهة حكومية ولا تمثل أي هيئة رسمية.',
  en: 'An independent initiative: a digital travel guide to Al-Ahsa Governorate, Saudi Arabia — not a government body and not affiliated with any official authority.',
  zh: 'An independent initiative: a digital travel guide to Al-Ahsa Governorate, Saudi Arabia — not a government body and not affiliated with any official authority.',
  de: 'An independent initiative: a digital travel guide to Al-Ahsa Governorate, Saudi Arabia — not a government body and not affiliated with any official authority.',
  ru: 'An independent initiative: a digital travel guide to Al-Ahsa Governorate, Saudi Arabia — not a government body and not affiliated with any official authority.',
  ur: 'An independent initiative: a digital travel guide to Al-Ahsa Governorate, Saudi Arabia — not a government body and not affiliated with any official authority.',
  tr: 'An independent initiative: a digital travel guide to Al-Ahsa Governorate, Saudi Arabia — not a government body and not affiliated with any official authority.',
};
export const ORG_EMAIL = 'info@visit-alahsa.com';
/** واتساب الموقع — الرقم لا يُعرض نصاً في أي صفحة، يُضمَّن في الرابط فقط. */
export const ORG_WHATSAPP_URL = 'https://wa.me/966532482544';

/** حسابات الموقع في المنصات الاجتماعية، بالترتيب المعتمد. `name` اسم علم لاتيني لا يُترجم. */
export interface OrgSocial { id: 'x' | 'instagram' | 'tiktok' | 'youtube'; name: string; url: string }
// روابط الحسابات الرسمية (واردة من المالك 2026-10-23) بلا معاملات تتبع. فارغ = لا يُعرض (لا في التذييل ولا في sameAs).
export const ORG_SOCIAL: readonly OrgSocial[] = [
  { id: 'x', name: 'X', url: 'https://x.com/visitahsa' },
  { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/visitalahsacity' },
  { id: 'tiktok', name: 'TikTok', url: 'https://www.tiktok.com/@visitalahsa' },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/@visit-alahsa' },
];
/** المعبّأ رابطه فقط، بالترتيب نفسه. */
export const orgSocialLinks = (): OrgSocial[] => ORG_SOCIAL.filter((p) => p.url.trim() !== '');
export const orgNode = (lang: Lang) => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: brandName(lang),
  alternateName: lang === 'ar' ? ['Visit Al-Ahsa', 'visit-alahsa.com'] : ['زوروا الأحساء', 'visit-alahsa.com'],
  description: ORG_DESC[lang],
  url: `${SITE}/`,
  logo: `${SITE}/icon-512.png`,
  email: ORG_EMAIL,
  ...(orgSocialLinks().length ? { sameAs: orgSocialLinks().map((p) => p.url) } : {}),
  mainEntityOfPage: `${SITE}${lang === 'ar' ? encodeURI('/من-نحن/') : '/en/about/'}`,
});

/** الموقع ككيان — تشير إليه WebPage في Base عبر isPartOf. */
export const websiteNode = (lang: Lang) => ({
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: brandName(lang),
  url: `${SITE}/`,
  publisher: { '@id': ORG_ID },
});

// ── واحة الأحساء ككيان خارجي (بند 3.1 — 2026-09-04) ─────────────────────────
// الوجهة في الرئيسية والمكوّنات في صفحات المعالم تشير إلى الكيان نفسه: Wikidata
// Q311341 (واحة الأحساء) وقائمة اليونسكو 1563 وويكيبيديا باللغات الأربع. الروابط
// كلها فُحصت بـHTTP 200 يوم الإضافة، وروابط ويكيبيديا تُحفظ مفكوكةً وتُرمَّز عند
// الإصدار (encodeURI) كي يبقى المصدر مقروءاً والمخرج IRI صالحاً.
export const OASIS_WIKIDATA = 'https://www.wikidata.org/wiki/Q311341';
export const UNESCO_WHS_URL = 'https://whc.unesco.org/en/list/1563/';
export const OASIS_SAMEAS = [
  OASIS_WIKIDATA,
  UNESCO_WHS_URL,
  'https://en.wikipedia.org/wiki/Al-Ahsa_Oasis',
  'https://ar.wikipedia.org/wiki/واحة_الأحساء',
  'https://zh.wikipedia.org/wiki/哈薩綠洲',
  'https://de.wikipedia.org/wiki/Al-Hasa',
].map((u) => encodeURI(u));

/** معرّف الموقع في قائمة التراث العالمي — رقم الملف 1563 (سُجّل 2018). */
export const UNESCO_WHS_ID = {
  '@type': 'PropertyValue', propertyID: 'UNESCO World Heritage Site', value: '1563',
} as const;

// اسم الواحة بلغة الصفحة: الصينية من معجم zh (哈萨绿洲) والألمانية بالـDurchkopplung
// (Al-Ahsa-Oase) لا صيغة اليونسكو الوصفية «Oase Al-Ahsa» — تلك للاقتباس وحده.
// والروسية من معجم ru حرفياً (مدخل «Al-Ahsa Oasis») — لا نقحرة مرتجلة.
// والأوردية من خط ur-translation-pipeline (دفعة الواجهة 2026-10-12): الاسم مركّباً بالإضافة الأوردية.
const OASIS_NAME: Record<Lang, string> = {
  ar: 'واحة الأحساء', en: 'Al-Ahsa Oasis', zh: '哈萨绿洲', de: 'Al-Ahsa-Oase', ru: 'оазис Аль-Ахса', ur: 'الاحساء کا نخلستان',
  // التركية: الإنجليزية حتى تمرّ دفعة واجهتها بخطها
  tr: 'Al-Ahsa Oasis',
};

/** عقدة الواحة كموقع تراث عالمي — تُدرج في isPartOf لكل معلم يحمل معرّف مكوّن. */
export const unescoOasisNode = (lang: Lang) => ({
  '@type': 'Place',
  name: OASIS_NAME[lang],
  url: UNESCO_WHS_URL,
  sameAs: OASIS_SAMEAS,
  identifier: UNESCO_WHS_ID,
});

/** رابط مطلق من مسار موقعي — يقبل المسارات العربية كما هي. */
export const absUrl = (path: string, siteUrl: string = SITE): string => new URL(path, siteUrl).href;

/** BreadcrumbList من عناصر (اسم، مسار) — المسار نسبي ويُطلَق هنا. */
export const breadcrumb = (items: { name: string; path: string }[], siteUrl: string = SITE) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.path, siteUrl),
  })),
});
