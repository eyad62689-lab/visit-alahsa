// دليل المرشدين السياحيين المرخّصين — مصدر واحد لمفاتيح التخصصات ولغات الإرشاد وتسمياتها،
// ولنصّ إخلاء المسؤولية الذي يتكرر في فهرس الدليل وصفحة كل مرشد وصفحة السياسات.
//
// المفاتيح هنا هي ما يقبله مخطط مجموعة guides (src/content.config.ts)، والتسميات بالعربية
// والإنجليزية فقط: الدليل لا يُبنى بلغة أخرى حتى تمرّ نصوصه بخط ترجمتها.
// لا مستويات إتقان للّغات ولا شهادات غير رخصة الإرشاد — اللغة تُذكر أو لا تُذكر.

export const GUIDE_SPECIALTIES = [
  'heritage', 'unesco', 'farms', 'souqs', 'desert', 'families', 'food', 'mosques', 'nature',
] as const;
export type GuideSpecialty = (typeof GUIDE_SPECIALTIES)[number];

export const GUIDE_SPECIALTY_NAMES: Record<'ar' | 'en', Record<GuideSpecialty, string>> = {
  ar: {
    heritage: 'التراث والتاريخ', unesco: 'مواقع اليونسكو', farms: 'المزارع والنخيل',
    souqs: 'الأسواق والحِرف', desert: 'الصحراء', families: 'العائلات',
    food: 'المطبخ الأحسائي', mosques: 'المساجد التاريخية', nature: 'الطبيعة',
  },
  en: {
    heritage: 'Heritage & history', unesco: 'UNESCO sites', farms: 'Farms & palm groves',
    souqs: 'Souqs & crafts', desert: 'Desert', families: 'Families',
    food: 'Hasawi cuisine', mosques: 'Historic mosques', nature: 'Nature',
  },
};

// المفتاح رمز اللغة (BCP 47) نفسه، فيُصدَّر كما هو في knowsLanguage.
export const GUIDE_LANGUAGES = [
  'ar', 'en', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'tr', 'fa', 'ur', 'hi', 'bn',
  'zh', 'ja', 'ko', 'id', 'ms', 'tl',
] as const;
export type GuideLanguage = (typeof GUIDE_LANGUAGES)[number];

export const GUIDE_LANGUAGE_NAMES: Record<'ar' | 'en', Record<GuideLanguage, string>> = {
  ar: {
    ar: 'العربية', en: 'الإنجليزية', fr: 'الفرنسية', de: 'الألمانية', es: 'الإسبانية',
    it: 'الإيطالية', pt: 'البرتغالية', ru: 'الروسية', tr: 'التركية', fa: 'الفارسية',
    ur: 'الأردية', hi: 'الهندية', bn: 'البنغالية', zh: 'الصينية', ja: 'اليابانية',
    ko: 'الكورية', id: 'الإندونيسية', ms: 'الملايوية', tl: 'الفلبينية',
  },
  en: {
    ar: 'Arabic', en: 'English', fr: 'French', de: 'German', es: 'Spanish',
    it: 'Italian', pt: 'Portuguese', ru: 'Russian', tr: 'Turkish', fa: 'Persian',
    ur: 'Urdu', hi: 'Hindi', bn: 'Bengali', zh: 'Chinese', ja: 'Japanese',
    ko: 'Korean', id: 'Indonesian', ms: 'Malay', tl: 'Filipino',
  },
};

/** إخلاء المسؤولية — النص العربي معتمد حرفياً، والإنجليزي مقابله. يحرسه فاحص dist:
 *  كل صفحة من صفحات الدليل تحمله كما هو. */
export const GUIDES_DISCLAIMER: Record<'ar' | 'en', string> = {
  ar: 'زوروا الأحساء دليل تعريفي: يعرض المرشدين المرخّصين ويتيح التواصل المباشر معهم. الاتفاق والأسعار والدفع بينك وبين المرشد مباشرة؛ الموقع ليس طرفاً فيها، ولا يتقاضى نسبة أو عمولة، ولا يتحمّل مسؤولية التعامل بين الطرفين.',
  en: 'Visit Al-Ahsa is an informational directory: it lists licensed guides and enables direct contact with them. Agreement, prices and payment are directly between you and the guide; the site is not a party to them, takes no percentage or commission, and bears no responsibility for dealings between the two parties.',
};

/** الجهة المرخِّصة — رخصة الإرشاد السياحي تصدرها وزارة السياحة. */
export const GUIDE_LICENSE_ISSUER: Record<'ar' | 'en', string> = {
  ar: 'وزارة السياحة',
  en: 'Ministry of Tourism',
};
