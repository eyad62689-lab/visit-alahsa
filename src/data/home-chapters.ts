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
  { slug: 'jalaniyah', date: { ar: 'القرن الخامس الهجري', en: 'Fifth century AH', zh: '伊斯兰历 5 世纪', de: '5. Jahrhundert n. H.', ru: 'V век хиджры', ur: 'پانچویں صدی ہجری' } },
  // متن القيصرية: «يعود لأكثر من قرنين» / «going back more than two centuries»
  { slug: 'qaisariyah', date: { ar: 'أكثر من قرنين', en: 'Over two centuries', zh: '200 多年历史', de: 'Mehr als zwei Jahrhunderte', ru: 'Более двух веков', ur: 'دو صدیوں سے زیادہ' } },
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
  ru: 'До озера не добраться без полноприводного автомобиля.',
  ur: 'جھیل تک پہنچنے کے لیے فور وہیل ڈرائیو گاڑی ضروری ہے۔',
};

/** القوالب التسعة (القرار ب4): المفتاح `${interest}-${days}`. */
export const TEMPLATES: Record<string, Template> = {
  'heritage-1': {
    title: { ar: 'يومٌ بين حصون الهفوف وأقدم مساجد الشرق', en: 'A day between Hofuf’s fortresses and the East’s oldest mosques', zh: '一天，穿行于胡富夫的城堡与东部最古老的清真寺之间', de: 'Ein Tag zwischen den Festungen von Hofuf und den ältesten Moscheen des Ostens', ru: 'День: крепости Эль-Хуфуфа и старейшие мечети востока страны', ur: 'ایک دن ہفوف کے قلعوں اور مشرقی خطے کی قدیم ترین مساجد کے بیچ' },
    // قالب اليوم الواحد: المسار التاريخي ثم القارة وجواثى (بلا إضافات اليومين)
    days: [{ stops: [T('historic-hofuf'), T('qarah-and-jawatha')] }],
  },
  'heritage-2': {
    title: { ar: 'يومان: المدينة القديمة، ثم القرى الشرقية', en: 'Two days: the old city, then the eastern villages', zh: '两天：先走老城，再访哈萨东部村落', de: 'Zwei Tage: erst die Altstadt, dann die Dörfer im Osten', ru: 'Два дня: старый город, затем восточные деревни', ur: 'دو دن: پرانا شہر، پھر مشرقی دیہات' },
    days: HERITAGE.slice(0, 2),
  },
  'heritage-3': {
    // صياغة الدارة المعتمدة لميناء العقير (حكم إياد 2026-09-30، يحرسه C34) — لا «أول موانئ المنطقة»
    title: { ar: 'ثلاثة أيام تنتهي عند أول ميناء بحري شرق المملكة', en: 'Three days ending at Saudi Arabia’s first seaport on its eastern coast', zh: '三天，终点是沙特阿拉伯东部沿海的第一座海港', de: 'Drei Tage, die am ersten Seehafen an der Ostküste Saudi-Arabiens enden', ru: 'Три дня, которые завершаются у первого морского порта на востоке Саудовской Аравии', ur: 'تین دن، جو سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ پر ختم ہوتے ہیں' },
    days: HERITAGE,
  },
  'nature-1': {
    title: { ar: 'يومٌ بين كهوف القارة وبساتين الواحة', en: 'A day between Al-Qarah’s caves and the oasis groves', zh: '一天，穿行于卡拉山的洞穴与绿洲果园之间', de: 'Ein Tag zwischen den Höhlen des Jabal al-Qarah und den Hainen der Oase', ru: 'День: Джабаль-эль-Кара с её пещерами и сады оазиса', ur: 'ایک دن جبل القارہ کے غاروں اور نخلستان کے باغات کے بیچ' },
    days: NATURE.slice(0, 1),
  },
  'nature-2': {
    title: { ar: 'يومان: الجبل والبساتين، ثم البحيرة وسط الكثبان', en: 'Two days: the mountain and groves, then the lake among the dunes', zh: '两天：先访山与果园，再赴沙丘间的湖泊', de: 'Zwei Tage: erst der Berg und die Haine, dann der See inmitten der Dünen', ru: 'Два дня: гора и сады, затем озеро среди дюн', ur: 'دو دن: پہاڑ اور باغات، پھر ریت کے ٹیلوں کے بیچ جھیل' },
    days: NATURE.slice(0, 2),
    note: ASFAR_NOTE,
  },
  'nature-3': {
    title: { ar: 'ثلاثة أيام تنتهي على ساحل الخليج', en: 'Three days ending on the Gulf coast', zh: '三天，终点在海湾之滨', de: 'Drei Tage, die an der Golfküste enden', ru: 'Три дня, которые завершаются на побережье Залива', ur: 'تین دن، جو خلیج کے ساحل پر ختم ہوتے ہیں' },
    days: NATURE,
    note: ASFAR_NOTE,
  },
  'markets-1': {
    title: { ar: 'يومٌ في أسواق الهفوف التراثية', en: 'A day in Hofuf’s heritage souqs', zh: '一天，漫步胡富夫的传统集市', de: 'Ein Tag in den traditionellen Souks von Hofuf', ru: 'День на традиционных рынках Эль-Хуфуфа', ur: 'ایک دن ہفوف کے تاریخی بازاروں میں' },
    days: MARKETS.slice(0, 1),
  },
  'markets-2': {
    title: { ar: 'يومان: الأسواق، ثم الفخار عند جبل القارة', en: 'Two days: the souqs, then pottery at Jabal Al-Qarah', zh: '两天：先逛集市，再到卡拉山寻访陶器', de: 'Zwei Tage: erst die Souks, dann die Töpferei am Jabal al-Qarah', ru: 'Два дня: рынки, затем Джабаль-эль-Кара и гончарное ремесло', ur: 'دو دن: بازار، پھر جبل القارہ کے پاس مٹی کے برتنوں کا ہنر' },
    days: MARKETS.slice(0, 2),
  },
  'markets-3': {
    title: { ar: 'ثلاثة أيام تنتهي في بساتين الواحة', en: 'Three days ending in the oasis groves', zh: '三天，终点在绿洲果园', de: 'Drei Tage, die in den Hainen der Oase enden', ru: 'Три дня, которые завершаются в садах оазиса', ur: 'تین دن، جو نخلستان کے باغات میں ختم ہوتے ہیں' },
    days: MARKETS,
  },
};

/** فقرات المرافقين (اعتمدها إياد) أجزاءٌ متتالية في فقرة واحدة: جزءٌ بلا شرط يظهر في القوالب التسعة،
 *  وجزءٌ بـ`when` يظهر فقط إن ضمّ القالب ذلك المسار — فلا تَعِد الفقرة بيوم ساحل أو بمسار لا يمرّ به القالب
 *  (رصده القارئان الأعميان الصيني والألماني، 2026-10-20/21). المراجع: jawatha-park وking-abdullah-park
 *  للعائلة (لا جزء للساحل: شاطئ العقير محطة في مسار al-uqair-coast نفسه، فكانت «أضفه» تكراراً)؛ arbaa للأصدقاء (تنبيه الدفع الرباعي في tpl.note حيث يمرّ القالب بالأصفر)؛
 *  historic-hofuf (mode: walking) وahsa-museum للمنفرد. */
export type TipPart = { id: string; when?: string; text: Record<HomeLang, string> };
export const COMPANION_TIPS: Record<Companion, TipPart[]> = {
  family: [
    {
      id: 'family',
      text: {
        ar: 'أضف إلى رحلتك منتزهاً عائلياً: منتزه جواثا السياحي بجوار مسجد جواثا، أو منتزه الملك عبدالله البيئي للمشي والتنزّه.',
        en: 'Add a family park to your trip: Jawatha Park beside Jawatha Mosque, or King Abdullah Environmental Park for walking and outings.',
        zh: '为这趟行程添一处家庭公园：贾瓦塔清真寺旁边的贾瓦塔公园，或适合散步和出游的阿卜杜拉国王环境公园。',
        de: 'Ergänzen Sie Ihre Reise um einen Park für die ganze Familie: den Jawatha-Park neben der Jawatha-Moschee oder den König-Abdullah-Umweltpark für Spaziergänge und Ausflüge.',
        ru: 'Добавьте в поездку семейный парк: парк Джавата (по соседству — мечеть Джавата) или Экологический парк короля Абдаллы для прогулок и отдыха на природе.',
        ur: 'اپنے سفر میں خاندان کے لیے کوئی پارک شامل کریں: مسجد جواثا کے پہلو میں جواثا پارک، یا چہل قدمی اور سیر و تفریح کے لیے شاہ عبد اللہ ماحولیاتی پارک۔',
      },
    },
  ],
  friends: [
    {
      id: 'friends',
      text: {
        ar: 'لمن يحبّ الرحلات البرية: جبل الأربع جنوب شرق الهفوف وجهة تخييم ورحلات.',
        en: 'For desert-trip lovers: Al-Arba Mountain, south-east of Hofuf, is a camping and excursion destination.',
        zh: '如果您喜欢沙漠出游：阿尔巴山位于胡富夫东南，适合露营与游览。',
        de: 'Für alle, die gern in die Wüste fahren: Der Al-Arba-Berg südöstlich von Hofuf ist ein Ziel für Camping und Ausflüge.',
        ru: 'Любите поездки по пустыне? Гора Эль-Арба к юго-востоку от Эль-Хуфуфа — место для кемпинга и вылазок на природу.',
        ur: 'صحرا کی سیر کے شوقینوں کے لیے ہفوف کے جنوب مشرق میں جبل الاربع ہے، جو خیمہ زنی اور گھومنے پھرنے کی جگہ ہے۔',
      },
    },
  ],
  solo: [
    {
      id: 'soloWalk',
      when: 'historic-hofuf',
      text: {
        ar: 'مسار الهفوف التاريخي جولةٌ مشياً بين الحصن والسوق.',
        en: 'The Historic Hofuf Trail is a walk between the fortress and the souq.',
        zh: '胡富夫历史路线全程步行，穿行于城堡与集市之间。',
        de: 'Die Route durch das historische Hofuf ist ein Rundgang zu Fuß zwischen Festung und Souk.',
        ru: 'Маршрут по историческому Эль-Хуфуфу — пешая прогулка между крепостью и рынком.',
        ur: 'تاریخی ہفوف کا راستہ قلعے اور بازار کے بیچ پیدل سیر ہے۔',
      },
    },
    {
      id: 'soloMuseum',
      text: {
        ar: 'متحف الأحساء يعرض تاريخ المنطقة وآثارها، لمن يريد التعمّق.',
        en: 'Al-Ahsa Museum presents the region’s history and antiquities, for those who want to go deeper.',
        zh: '哈萨博物馆呈现了这一地区的历史与文物，适合想深入了解的人。',
        de: 'Das Al-Ahsa-Museum zeigt Geschichte und Altertümer der Region – für alle, die tiefer eintauchen möchten.',
        ru: 'Музей Аль-Ахсы рассказывает об истории и древностях региона — для тех, кто хочет узнать больше.',
        ur: 'جو مزید جاننا چاہیں، ان کے لیے الاحساء کا عجائب گھر اس خطے کی تاریخ اور آثار قدیمہ پیش کرتا ہے۔',
      },
    },
  ],
};
