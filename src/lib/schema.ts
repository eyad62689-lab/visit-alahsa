// ثوابت JSON-LD المشتركة — مصدر واحد لهوية الموقع في كل السكيمات.
//
// كانت كتلتا Organization وWebSite تُكتبان يدوياً في الرئيسية، ومنشئ المدونة
// وحامل الحقوق في Base بأسماء متفاوتة («الأحساء»، «زوروا الأحساء»، «Visit
// Al-Ahsa»…). هنا كيان واحد بمعرّف @id ثابت تشير إليه كل الصفحات فتتطابق.
// الاسم ثنائي اللغة عمداً: الكيان القانوني واحد لا يتغيّر بلغة الصفحة.

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
