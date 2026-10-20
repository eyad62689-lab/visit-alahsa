// بيانات الرئيسية الجديدة «الواحة تتكشّف» (العربية والإنجليزية) — مواصفات الإصدار 2
// في مصادر-المشروع/مستندات-العمل/مفهوم-الواحة-تتكشف-مواصفات-الرئيسية-v2-2026-10-20.md.
//
// لا وصف جديد هنا لأي مكان: المعالم تُعرض بعناوينها وخلاصاتها من مجموعتها، والمسارات
// بعناوينها من trails.json. الجديد وحده سطور عناوين القوالب وفقرات المرافقين، وكلها
// اعتمدها إياد (قوالب-المسارات-الفصل6-مسودة-2026-10-20.md) — كل عبارة فيها تحيل إلى نصّ منشور.

/** خريطة الفصل 4 (القرار ج8): المواضع تُسقط من حقل location في المجموعة. */
export const MAP_SLUGS = ['jabal-al-qarah', 'qasr-ibrahim', 'jawatha-mosque', 'asfar', 'najm-park', 'al-uqair'] as const;

/** بطاقات الفصل 5 (القرار ج6): التاريخ بصيغته من متن صفحة المعلم، وما لا تاريخ في متنه بلا تاريخ. */
export const MEMORY_CARDS: { slug: string; date?: { ar: string; en: string } }[] = [
  // متن الجعلانية: «في القرن الخامس الهجري» / «in the fifth century AH»
  { slug: 'jalaniyah', date: { ar: 'القرن الخامس الهجري', en: 'Fifth century AH' } },
  // متن القيصرية: «يعود لأكثر من قرنين» / «going back more than two centuries»
  { slug: 'qaisariyah', date: { ar: 'أكثر من قرنين', en: 'Over two centuries' } },
  { slug: 'qasr-ibrahim' },
  { slug: 'jawatha-mosque' },
  { slug: 'al-uqair' },
];

export type Interest = 'heritage' | 'nature' | 'markets';
export type Companion = 'family' | 'friends' | 'solo';
export type Stop = { trail: string } | { place: string };

type Day = { stops: Stop[] };
type Template = { title: { ar: string; en: string }; days: Day[]; note?: { ar: string; en: string } };

const T = (trail: string): Stop => ({ trail });
const P = (place: string): Stop => ({ place });

// الأيام تتراكم: قالب اليومين = قالب اليوم + اليوم الثاني، والثلاثة = اليومان + الثالث.
const HERITAGE: Day[] = [
  { stops: [T('historic-hofuf'), P('jabri-mosque'), P('abubakr-mosque')] },
  { stops: [T('qarah-and-jawatha'), P('jalaniyah')] },
  { stops: [T('al-uqair-coast')] },
];
const NATURE: Day[] = [
  { stops: [P('jabal-al-qarah'), T('oasis-and-springs')] },
  { stops: [T('al-asfar-and-national-park')] },
  { stops: [T('al-uqair-coast')] },
];
const MARKETS: Day[] = [
  // سوق الحميدية خارج القالب (حكم إياد 2026-10-20): لم يعد سوقاً عاملاً، ويبقى معلماً في المعالم
  { stops: [T('historic-hofuf'), P('craftsmen-souq'), P('women-souq')] },
  { stops: [T('qarah-and-jawatha')] },
  { stops: [T('oasis-and-springs'), P('lemon-farm')] },
];

// تنبيه منقول من مقدمة مسار الأصفر المنشور: «الوصول إلى البحيرة يتطلب سيارة دفع رباعي»
const ASFAR_NOTE = {
  ar: 'الوصول إلى البحيرة يتطلب سيارة دفع رباعي.',
  en: 'Reaching the lake requires a 4x4.',
};

/** القوالب التسعة (القرار ب4): المفتاح `${interest}-${days}`. */
export const TEMPLATES: Record<string, Template> = {
  'heritage-1': {
    title: { ar: 'يومٌ بين حصون الهفوف وأقدم مساجد الشرق', en: 'A day between Hofuf’s fortresses and the East’s oldest mosques' },
    // قالب اليوم الواحد: المسار التاريخي ثم القارة وجواثى (بلا إضافات اليومين)
    days: [{ stops: [T('historic-hofuf'), T('qarah-and-jawatha')] }],
  },
  'heritage-2': {
    title: { ar: 'يومان: المدينة القديمة، ثم القرى الشرقية', en: 'Two days: the old city, then the eastern villages' },
    days: HERITAGE.slice(0, 2),
  },
  'heritage-3': {
    // صياغة الدارة المعتمدة لميناء العقير (حكم إياد 2026-09-30، يحرسه C34) — لا «أول موانئ المنطقة»
    title: { ar: 'ثلاثة أيام تنتهي عند أول ميناء بحري شرق المملكة', en: 'Three days ending at Saudi Arabia’s first seaport on its eastern coast' },
    days: HERITAGE,
  },
  'nature-1': {
    title: { ar: 'يومٌ بين كهوف القارة وبساتين الواحة', en: 'A day between Al-Qarah’s caves and the oasis groves' },
    days: NATURE.slice(0, 1),
  },
  'nature-2': {
    title: { ar: 'يومان: الجبل والبساتين، ثم البحيرة وسط الكثبان', en: 'Two days: the mountain and groves, then the lake among the dunes' },
    days: NATURE.slice(0, 2),
    note: ASFAR_NOTE,
  },
  'nature-3': {
    title: { ar: 'ثلاثة أيام تنتهي على ساحل الخليج', en: 'Three days ending on the Gulf coast' },
    days: NATURE,
    note: ASFAR_NOTE,
  },
  'markets-1': {
    title: { ar: 'يومٌ في أسواق الهفوف التراثية', en: 'A day in Hofuf’s heritage souqs' },
    days: MARKETS.slice(0, 1),
  },
  'markets-2': {
    title: { ar: 'يومان: الأسواق، ثم الفخار عند جبل القارة', en: 'Two days: the souqs, then pottery at Jabal Al-Qarah' },
    days: MARKETS.slice(0, 2),
  },
  'markets-3': {
    title: { ar: 'ثلاثة أيام تنتهي في بساتين الواحة', en: 'Three days ending in the oasis groves' },
    days: MARKETS,
  },
};

/** فقرات المرافقين (اعتمدها إياد) — المراجع: jawatha-park وking-abdullah-park ومقدمة
 *  al-uqair-coast للعائلة؛ مقدمة al-asfar-and-national-park وarbaa للأصدقاء؛ historic-hofuf
 *  (mode: walking) وahsa-museum للمنفرد. */
export const COMPANION_TIPS: Record<Companion, { ar: string; en: string }> = {
  family: {
    ar: 'أضف إلى يومك منتزهاً عائلياً قريباً من محطاتك: منتزه جواثا السياحي بجوار مسجد جواثا، ومنتزه الملك عبدالله البيئي للمشي والتنزّه، وفي يوم الساحل شاطئ العقير.',
    en: 'Add a family park near your stops: Jawatha Park beside Jawatha Mosque, King Abdullah Environmental Park for walking and outings, and on the coast day, Al-Uqair Beach.',
  },
  friends: {
    ar: 'لمن يحبّ الرحلات البرية: مسار بحيرة الأصفر يحتاج سيارة دفع رباعي، وجبل الأربع وجهة تخييم ورحلات جنوب شرق الهفوف.',
    en: 'For desert-trip lovers: the Al-Asfar Lake trail needs a 4x4, and Al-Arba Mountain, south-east of Hofuf, is a camping and desert-trip destination.',
  },
  solo: {
    ar: 'مسار الهفوف التاريخي يُقطع مشياً، فهو يومٌ هادئ بين الحصن والسوق، وللمزيد متحف الأحساء يعرض تاريخ المنطقة وآثارها.',
    en: 'The Historic Hofuf Trail is walked on foot, a quiet day between the fortress and the souq; for more, Al-Ahsa Museum presents the region’s history and antiquities.',
  },
};
