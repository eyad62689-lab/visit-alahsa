// بيانات الرئيسية الجديدة «الواحة تتكشّف» (العربية والإنجليزية) — مواصفات الإصدار 2
// في مصادر-المشروع/مستندات-العمل/مفهوم-الواحة-تتكشف-مواصفات-الرئيسية-v2-2026-10-20.md.
//
// لا وصف جديد هنا لأي مكان: المعالم تُعرض بعناوينها وخلاصاتها من مجموعتها، والمسارات
// بعناوينها من trails.json. الجديد وحده سطور عناوين القوالب وفقرات المرافقين، وكلها
// اعتمدها إياد (قوالب-المسارات-الفصل6-مسودة-2026-10-20.md) — كل عبارة فيها تحيل إلى نصّ منشور.

import type { HomeLang } from './home-copy';

/** خريطة الفصل 4 (القرار ج8): المواضع تُسقط من حقل location في المجموعة. */
export const MAP_SLUGS = ['jabal-al-qarah', 'qasr-ibrahim', 'jawatha-mosque', 'asfar', 'najm-park', 'al-uqair'] as const;

/** بطاقات الفصل 5 (القرار ج6): التاريخ بصيغته من متن صفحة المعلم، وما لا تاريخ في متنه بلا تاريخ. */
export const MEMORY_CARDS: { slug: string; date?: Record<HomeLang, string> }[] = [
  // متن الجعلانية: «في القرن الخامس الهجري» / «in the fifth century AH»
  { slug: 'jalaniyah', date: { ar: 'القرن الخامس الهجري', en: 'Fifth century AH', zh: '伊斯兰历 5 世纪', de: '5. Jahrhundert n. H.' } },
  // متن القيصرية: «يعود لأكثر من قرنين» / «going back more than two centuries»
  { slug: 'qaisariyah', date: { ar: 'أكثر من قرنين', en: 'Over two centuries', zh: '200 多年历史', de: 'Mehr als zwei Jahrhunderte' } },
  { slug: 'qasr-ibrahim' },
  { slug: 'jawatha-mosque' },
  { slug: 'al-uqair' },
];

export type Interest = 'heritage' | 'nature' | 'markets';
export type Companion = 'family' | 'friends' | 'solo';
export type Stop = { trail: string } | { place: string };

type Day = { stops: Stop[] };
type Text = Record<HomeLang, string>;
type Template = { title: Text; days: Day[]; note?: Text };

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
const ASFAR_NOTE: Record<HomeLang, string> = {
  ar: 'الوصول إلى البحيرة يتطلب سيارة دفع رباعي.',
  en: 'Reaching the lake requires a 4x4.',
  zh: '前往湖边需要四驱车。',
  de: 'Die Fahrt zum See erfordert einen Geländewagen.',
};

/** القوالب التسعة (القرار ب4): المفتاح `${interest}-${days}`. */
export const TEMPLATES: Record<string, Template> = {
  'heritage-1': {
    title: { ar: 'يومٌ بين حصون الهفوف وأقدم مساجد الشرق', en: 'A day between Hofuf’s fortresses and the East’s oldest mosques', zh: '一天，穿行于胡富夫的城堡与东部最古老的清真寺之间', de: 'Ein Tag zwischen den Festungen von Hofuf und den ältesten Moscheen des Ostens' },
    // قالب اليوم الواحد: المسار التاريخي ثم القارة وجواثى (بلا إضافات اليومين)
    days: [{ stops: [T('historic-hofuf'), T('qarah-and-jawatha')] }],
  },
  'heritage-2': {
    title: { ar: 'يومان: المدينة القديمة، ثم القرى الشرقية', en: 'Two days: the old city, then the eastern villages', zh: '两天：先走老城，再访哈萨东部村落', de: 'Zwei Tage: erst die Altstadt, dann die Dörfer im Osten' },
    days: HERITAGE.slice(0, 2),
  },
  'heritage-3': {
    // صياغة الدارة المعتمدة لميناء العقير (حكم إياد 2026-09-30، يحرسه C34) — لا «أول موانئ المنطقة»
    title: { ar: 'ثلاثة أيام تنتهي عند أول ميناء بحري شرق المملكة', en: 'Three days ending at Saudi Arabia’s first seaport on its eastern coast', zh: '三天，终点是沙特阿拉伯东部沿海的第一座海港', de: 'Drei Tage, die am ersten Seehafen an der Ostküste Saudi-Arabiens enden' },
    days: HERITAGE,
  },
  'nature-1': {
    title: { ar: 'يومٌ بين كهوف القارة وبساتين الواحة', en: 'A day between Al-Qarah’s caves and the oasis groves', zh: '一天，穿行于卡拉山的洞穴与绿洲果园之间', de: 'Ein Tag zwischen den Höhlen des Jabal al-Qarah und den Hainen der Oase' },
    days: NATURE.slice(0, 1),
  },
  'nature-2': {
    title: { ar: 'يومان: الجبل والبساتين، ثم البحيرة وسط الكثبان', en: 'Two days: the mountain and groves, then the lake among the dunes', zh: '两天：先访山与果园，再赴沙丘间的湖泊', de: 'Zwei Tage: erst der Berg und die Haine, dann der See inmitten der Dünen' },
    days: NATURE.slice(0, 2),
    note: ASFAR_NOTE,
  },
  'nature-3': {
    title: { ar: 'ثلاثة أيام تنتهي على ساحل الخليج', en: 'Three days ending on the Gulf coast', zh: '三天，终点在海湾之滨', de: 'Drei Tage, die an der Golfküste enden' },
    days: NATURE,
    note: ASFAR_NOTE,
  },
  'markets-1': {
    title: { ar: 'يومٌ في أسواق الهفوف التراثية', en: 'A day in Hofuf’s heritage souqs', zh: '一天，漫步胡富夫的传统市集', de: 'Ein Tag in den traditionellen Souks von Hofuf' },
    days: MARKETS.slice(0, 1),
  },
  'markets-2': {
    title: { ar: 'يومان: الأسواق، ثم الفخار عند جبل القارة', en: 'Two days: the souqs, then pottery at Jabal Al-Qarah', zh: '两天：先逛市集，再到卡拉山寻访陶器', de: 'Zwei Tage: erst die Souks, dann die Töpferei am Jabal al-Qarah' },
    days: MARKETS.slice(0, 2),
  },
  'markets-3': {
    title: { ar: 'ثلاثة أيام تنتهي في بساتين الواحة', en: 'Three days ending in the oasis groves', zh: '三天，终点在绿洲果园', de: 'Drei Tage, die in den Hainen der Oase enden' },
    days: MARKETS,
  },
};

/** فقرات المرافقين (اعتمدها إياد) — المراجع: jawatha-park وking-abdullah-park ومقدمة
 *  al-uqair-coast للعائلة؛ مقدمة al-asfar-and-national-park وarbaa للأصدقاء؛ historic-hofuf
 *  (mode: walking) وahsa-museum للمنفرد. */
export const COMPANION_TIPS: Record<Companion, Record<HomeLang, string>> = {
  family: {
    ar: 'أضف إلى يومك منتزهاً عائلياً: منتزه جواثا السياحي بجوار مسجد جواثا، أو منتزه الملك عبدالله البيئي للمشي والتنزّه.',
    en: 'Add a family park to your day: Jawatha Park beside Jawatha Mosque, or King Abdullah Environmental Park for walking and outings.',
    zh: '为当天行程添一处家庭公园：贾瓦塔清真寺旁边的贾瓦塔公园，或适合散步和出游的阿卜杜拉国王环境公园。',
    de: 'Ergänzen Sie Ihren Tag um einen Park für die ganze Familie: den Jawatha-Park neben der Jawatha-Moschee oder den König-Abdullah-Umweltpark für Spaziergänge und Ausflüge.',
  },
  friends: {
    ar: 'لمن يحبّ الرحلات البرية: مسار بحيرة الأصفر يحتاج سيارة دفع رباعي، وجبل الأربع وجهة تخييم ورحلات جنوب شرق الهفوف.',
    en: 'For desert-trip lovers: the Al-Asfar Lake trail needs a 4x4, and Al-Arba Mountain, south-east of Hofuf, is a camping and desert-trip destination.',
    zh: '如果您喜欢沙漠出游：阿斯法湖与国家公园路线需要四驱车；阿尔巴山位于胡富夫东南，是露营与沙漠出游的目的地。',
    de: 'Für alle, die gern in die Wüste fahren: Die Route zum Al-Asfar-See erfordert einen Geländewagen, und der Al-Arba-Berg südöstlich von Hofuf ist ein Ausflugsziel für Camping und Touren in die Wüste.',
  },
  solo: {
    ar: 'مسار الهفوف التاريخي يُقطع مشياً، فهو يومٌ هادئ بين الحصن والسوق، وللمزيد متحف الأحساء يعرض تاريخ المنطقة وآثارها.',
    en: 'The Historic Hofuf Trail is walked on foot, a quiet day between the fortress and the souq; for more, Al-Ahsa Museum presents the region’s history and antiquities.',
    zh: '胡富夫历史路线全程步行，在城堡与市集之间度过安静的一天；若想了解更多，哈萨博物馆呈现了这一地区的历史与文物。',
    de: 'Die Route durch das historische Hofuf legen Sie zu Fuß zurück – ein ruhiger Tag zwischen Festung und Souk. Möchten Sie mehr sehen, zeigt Ihnen das Al-Ahsa-Museum Geschichte und Altertümer der Region.',
  },
};

/** تتمة فقرة المرافقين تظهر فقط في قالب فيه يوم الساحل (مسار al-uqair-coast): كانت جزءاً من فقرة
 *  العائلة فتَعِد بـ«يوم الساحل» في قوالب اليوم واليومين التي لا ساحل فيها (2026-10-20). */
export const COAST_TRAIL = 'al-uqair-coast';
export const COAST_TIPS: Partial<Record<Companion, Record<HomeLang, string>>> = {
  family: {
    ar: 'وفي يوم الساحل أضف شاطئ العقير.',
    en: 'On the coast day, add Al-Uqair Beach.',
    zh: '去海岸的那天，再添上乌盖尔海滩。',
    de: 'Ergänzen Sie den Tag an der Küste um den Al-Uqair-Strand.',
  },
};
