// ثوابت JSON-LD المشتركة — مصدر واحد لهوية الموقع في كل السكيمات.
//
// كانت كتلتا Organization وWebSite تُكتبان يدوياً في الرئيسية، ومنشئ المدونة
// وحامل الحقوق في Base بأسماء متفاوتة («الأحساء»، «زوروا الأحساء»، «Visit
// Al-Ahsa»…). هنا كيان واحد بمعرّف @id ثابت تشير إليه كل الصفحات فتتطابق.
// الاسم ثنائي اللغة عمداً: الكيان القانوني واحد لا يتغيّر بلغة الصفحة.

import type { Lang } from '../i18n/ui';

export const SITE = 'https://visit-alahsa.com';

export const ORG_NAME = 'زوروا الأحساء — Visit Al-Ahsa';

/** الجهة الناشرة وحاملة الحقوق — العقدة نفسها في كل صفحة (@id ثابت). */
export const ORG = {
  '@type': 'Organization',
  '@id': `${SITE}/#org`,
  name: ORG_NAME,
  url: `${SITE}/`,
  logo: `${SITE}/icon-512.png`,
} as const;

/** الموقع ككيان — تشير إليه WebPage في Base عبر isPartOf. */
export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: ORG_NAME,
  url: `${SITE}/`,
  publisher: { '@id': ORG['@id'] },
} as const;

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
const OASIS_NAME: Record<Lang, string> = {
  ar: 'واحة الأحساء', en: 'Al-Ahsa Oasis', zh: '哈萨绿洲', de: 'Al-Ahsa-Oase',
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
