// صفحة «أسواق المزارعين» — عربي/إنجليزي فقط كأدوات السفر (src/lib/routes.ts MARKETS_ALT).
//
// الأسواق الستة هنا وحدها ثبت قيامها عند المراجعة (2026-11-08): قائمة حيّة على خرائط قوقل
// بأوقات عمل أو مراجعات حديثة، ولسوق الأربعاء أخبار تطويره من الأمانة. استُبعد ما لم يثبت:
// سوقا الخميس والسبت (متحدث البلدية: لا جدول زمني ثابت حالياً — الوطن 2026-11-07)، وسوق
// الأحد بالقارة (بلا أوقات ولا مصدر)، وسوق الحليلة (مغلق نهائياً على قوقل)، ومجمع أسواق
// القرى الشرقية (تنظيم سابق)، والمواقع القديمة في ملف المصدر.
//
// لا مواعيد مكتوبة هنا: الأوقات والتقييم من بيانات قوقل الحية (place-ids.json) وتسقط حين
// تغيب. ولا صور: صور ملف المصدر لمصوّرين آخرين ومعدّلة، وتنتظر إذن النشر.
export type MarketsLang = 'ar' | 'en';
export type MarketKind = 'farmers' | 'seasonal' | 'wholesale' | 'souq' | 'haraj';

type Market = {
  /** مفتاح بيانات قوقل الحية في place-ids.json/place-seeds.json */
  slug: string;
  kind: MarketKind;
  placeId: string;
  /** اسم السوق كما يظهر في قائمة قوقل — استعلام رابط الخريطة */
  query: string;
  name: Record<MarketsLang, string>;
  area: Record<MarketsLang, string>;
  blurb: Record<MarketsLang, string>;
};

export const MARKETS: Market[] = [
  {
    slug: 'farmers-market-luwaimi', kind: 'farmers', placeId: 'ChIJoSUr8WqVNz4R-g8yZ8clIkQ', query: 'سوق المزارعين',
    name: { ar: 'سوق المزارعين بعين اللويمي', en: 'Farmers’ Market, Ain Al-Luwaimi' },
    area: { ar: 'النطاق الزراعي، الهفوف', en: 'Farmland belt, Hofuf' },
    blurb: {
      ar: 'بسطاتٌ قرب المزارع يبيع فيها المزارعون محصول الواحة: الرطب والتمور واللومي الأحسائي والخضار الموسمية.',
      en: 'Stalls beside the farms where growers sell the oasis harvest: fresh and dried dates, Hasawi dried lime and seasonal vegetables.',
    },
  },
  {
    slug: 'farmers-market-umm-sabaa', kind: 'farmers', placeId: 'ChIJx0O1DTa9Nz4RrLuJrtjIWs8', query: 'سوق المزارعين عين ام سبعة',
    name: { ar: 'سوق المزارعين بعين أم سبعة', en: 'Farmers’ Market, Ain Umm Sab‘a' },
    area: { ar: 'أم سبعة، المبرز', en: 'Umm Sab‘a, Al-Mubarraz' },
    blurb: {
      ar: 'بسطاتٌ لمحاصيل مزارع شمال الواحة، تتبدّل بين الورقيات والخضار، والرطب في موسمه.',
      en: 'Stalls of produce from the farms of the northern oasis, shifting between leafy greens and vegetables, with fresh dates in season.',
    },
  },
  {
    slug: 'seasonal-market-mazrouiya', kind: 'seasonal', placeId: 'ChIJzy8dGDGXNz4RA0-NnTWfXQU', query: 'سوق الرطب و الفواكة والخضار الموسمية بالهفوف',
    name: { ar: 'سوق الرطب والفواكه والخضار الموسمية', en: 'Seasonal Dates, Fruit and Vegetable Market' },
    area: { ar: 'المزروعية، الهفوف — طريق الأمير محمد بن عبدالعزيز', en: 'Al-Mazrouiya, Hofuf — Prince Mohammed bin Abdulaziz Road' },
    blurb: {
      ar: 'بسطاتٌ للرطب والفواكه والخضار الموسمية داخل الهفوف، يتبدّل معروضها بتبدّل المواسم.',
      en: 'Stalls of fresh dates, fruit and seasonal vegetables inside Hofuf; what is on sale changes with the season.',
    },
  },
  {
    slug: 'vegetable-market-ain-najm', kind: 'wholesale', placeId: 'ChIJmfgTHaGXNz4RZZj1TZAFDRk', query: 'سوق الخضار',
    name: { ar: 'سوق الخضار المركزي', en: 'Central Vegetable Market' },
    area: { ar: 'عين نجم، المبرز — شارع خالد بن الوليد', en: 'Ain Najm, Al-Mubarraz — Khalid bin Al-Walid Street' },
    blurb: {
      ar: 'سوقٌ للجملة والتجزئة يجمع الخضار والفواكه المحلية والواردة في مكان واحد.',
      en: 'A wholesale and retail market bringing local and imported vegetables and fruit together in one place.',
    },
  },
  {
    slug: 'wednesday-market-mubarraz', kind: 'souq', placeId: 'ChIJtQlyjBiXNz4RGd8Rn43OIgI', query: 'سوق الاربعاء',
    name: { ar: 'سوق الأربعاء بالمبرز', en: 'Wednesday Market, Al-Mubarraz' },
    area: { ar: 'الشعبة، المبرز', en: 'Al-Shu‘bah, Al-Mubarraz' },
    blurb: {
      ar: 'سوقٌ شعبي قديم في المبرز طُوّر مقرّه بممرات ومظلات وساحات، ويجمع الباعة بالمنتجات الزراعية والأكلات الشعبية والملابس والأدوات.',
      en: 'An old popular souq in Al-Mubarraz, its grounds redeveloped with walkways, shades and open squares, where vendors sell farm produce, traditional food, clothing and tools.',
    },
  },
  {
    slug: 'haraj-al-ahsa', kind: 'haraj', placeId: 'ChIJ2UZV94uWNz4RAG3KMfOBMsI', query: 'حراج الاحساء',
    name: { ar: 'حراج الأحساء', en: 'Al-Ahsa Haraj' },
    area: { ar: 'المسعودي، المبرز', en: 'Al-Mas‘oudi, Al-Mubarraz' },
    blurb: {
      ar: 'سوقٌ للسلع المستعملة والأدوات والمقتنيات الشعبية والطيور، يختلف بطابعه عن أسواق المحاصيل.',
      en: 'A market for second-hand goods, tools, old household pieces and birds, quite unlike the produce markets in character.',
    },
  },
];

/** رابط خرائط قوقل الرسمي بمعرّف المكان (Maps URLs API). */
export const mapsUrl = (m: Market): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.query)}&query_place_id=${m.placeId}`;

const WATAN = 'https://www.alwatan.com.sa/article/1188731';

export const PAGE = {
  ar: {
    seoTitle: 'أسواق المزارعين في الأحساء: الرطب والخضار والحراج الشعبي',
    seoDesc: 'ستة أسواق قائمة في الأحساء: سوقا المزارعين بعين اللويمي وأم سبعة، وسوق الرطب الموسمي، وسوق الخضار المركزي، وسوق الأربعاء، والحراج، بمواقعها في خرائط قوقل.',
    eyebrow: 'من المزرعة إلى السلّة',
    lead: 'أسواقٌ يبيع فيها المزارعون محصول الواحة، وأسواقٌ يومية وشعبية يقصدها أهل الأحساء. ستة أسواق ثبت قيامها، بمواقعها في خرائط قوقل.',
    listH: 'الأسواق في هذا الدليل',
    hoursNote: 'الأوقات والتقييمات من خرائط قوقل وقد تتغيّر، فتأكّد منها قبل الزيارة.',
    kinds: { farmers: 'سوق مزارعين', seasonal: 'سوق يومي وموسمي', wholesale: 'جملة وتجزئة', souq: 'سوق شعبي', haraj: 'حراج' } as Record<MarketKind, string>,
    hoursSum: 'أوقات العمل',
    openMaps: 'الموقع في خرائط قوقل',
    newWindow: '(يفتح في نافذة جديدة)',
    ratingLabel: 'التقييم في خرائط قوقل',
    closedPerm: 'مغلق نهائياً بحسب خرائط قوقل',
    closedTemp: 'مغلق مؤقتاً بحسب خرائط قوقل',
    fetched: (d: string) => `بيانات قوقل محدَّثة في ${d}.`,
    tipsH: 'قبل أن تذهب',
    tips: [
      ['ابدأ بالصباح', 'في الأسواق الصباحية يمنحك الوصول المبكر وقتاً أهدأ للاختيار.'],
      ['اسأل عن الموسم', 'الرطب واللومي والورقيات لا تتوفر بالقدر نفسه طوال العام، فاسأل عن محصول اليوم ومنشئه.'],
      ['جهّز سلّتك', 'كيسٌ يُعاد استعماله وحافظة باردة للمشتريات الحساسة يكملان الجولة براحة.'],
      ['راجع الوجهة', 'انتقل بعض الأسواق من الشوارع إلى مقرات منظَّمة، فراجع اسم السوق وموقعه في خرائط قوقل.'],
    ] as [string, string][],
    faqH: 'أسئلة شائعة',
    faqs: [
      { q: 'لماذا لا تظهر أسواق الخميس والسبت الشعبية؟',
        a: 'لأن موعدها غير ثابت الآن: أفاد متحدث بلدية الأحساء في نوفمبر 2026 بعدم وجود جدول زمني ثابت حالياً لأسواق الخميس والجمعة والسبت في مدن الأحساء، فلا نُدرج سوقاً لا يُعرف يومه.',
        linkText: 'الخبر في صحيفة الوطن', linkHref: WATAN, external: true },
      { q: 'أين أجد سوق القيصرية والأسواق التراثية؟',
        a: 'الأسواق التراثية كالقيصرية وسوق الحرفيين في صفحة الأسواق والمنتزهات والمزارع.',
        linkText: 'الأسواق والمنتزهات والمزارع ←', linkHref: '/أسواق-ومنتزهات-ومزارع/#cat-market' },
    ],
    methodH: 'عن هذه الصفحة',
    methodP: 'راجعنا كل سوق في نوفمبر 2026 على خرائط قوقل وفي أخبار البلدية، وأبقينا ما ثبت قيامه فقط. لا نكتب مواعيد ثابتة ولا أسعاراً، وترتيب البطاقات لا يفاضل بين الأسواق.',
  },
  en: {
    seoTitle: 'Farmers’ Markets in Al-Ahsa: Dates, Produce and the Haraj',
    seoDesc: 'Six working markets in Al-Ahsa: two farmers’ markets, a seasonal dates market, the central vegetable market, the Wednesday souq and the haraj, with map links.',
    eyebrow: 'From farm to basket',
    lead: 'Markets where growers sell the oasis harvest, and the daily and popular souqs Al-Ahsa’s people shop at. Six markets confirmed as running, each with its Google Maps location.',
    listH: 'The markets in this guide',
    hoursNote: 'Hours and ratings come from Google Maps and may change, so check them before you go.',
    kinds: { farmers: 'Farmers’ market', seasonal: 'Daily & seasonal', wholesale: 'Wholesale & retail', souq: 'Popular souq', haraj: 'Haraj' } as Record<MarketKind, string>,
    hoursSum: 'Opening hours',
    openMaps: 'Location on Google Maps',
    newWindow: '(opens in a new window)',
    ratingLabel: 'Rating on Google Maps',
    closedPerm: 'Permanently closed, according to Google Maps',
    closedTemp: 'Temporarily closed, according to Google Maps',
    fetched: (d: string) => `Google data updated ${d}.`,
    tipsH: 'Before you go',
    tips: [
      ['Start early', 'At the morning markets, arriving early gives you a calmer time to choose.'],
      ['Ask about the season', 'Fresh dates, dried lime and leafy greens are not equally available all year, so ask what came in today and where it was grown.'],
      ['Bring a bag', 'A reusable bag and a cool box for delicate produce make the round easier.'],
      ['Check the location', 'Some markets have moved from the street into organised grounds, so check the market’s name and pin on Google Maps.'],
    ] as [string, string][],
    faqH: 'Frequently asked questions',
    faqs: [
      { q: 'Why are the Thursday and Saturday popular markets not listed?',
        a: 'Because their days are not fixed at the moment: in November 2026 the Al-Ahsa municipality spokesman said there is currently no fixed schedule for the Thursday, Friday and Saturday markets in the region’s towns, and we do not list a market whose day is unknown.',
        linkText: 'Al-Watan report (Arabic)', linkHref: WATAN, external: true },
      { q: 'Where are Al-Qaisariyah and the heritage souqs?',
        a: 'Heritage souqs such as Al-Qaisariyah and the Craftsmen’s Souq are on the Souqs, Parks and Farms page.',
        linkText: 'Souqs, Parks and Farms →', linkHref: '/en/souqs-parks-farms/#cat-market' },
    ],
    methodH: 'About this page',
    methodP: 'We checked each market in November 2026 on Google Maps and in municipal news, and kept only those confirmed as running. We list no fixed hours or prices, and the order of the cards does not rank the markets.',
  },
} as const;
