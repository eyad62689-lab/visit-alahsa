// بيانات الفعاليات — مصدر واحد تقرأ منه قائمة الفعاليات وصفحاتها التفصيلية.
// كانت مضمّنة داخل EventsView.astro، فأُخرجت هنا لمّا صار لكل فعالية صفحة مستقلة
// (2026-08-16) — نسخة واحدة تمنع تباعد القائمة عن الصفحة.
//
// قاعدة ملزمة: لا تُختلق معلومة. الحقول أدناه من مصادر إياد والجهات المنظّمة،
// ولا يُضاف حقل لا يسنده مصدر — لا موعد ولا رابط حجز ولا إحداثيات.

export type Ev = {
  /** مفتاح الربط بين النسختين العربية والإنجليزية — ثابت لا يُترجم */
  id: string;
  /** مقطع الرابط بلغة الصفحة: /فعاليات/<slug>/ و /en/events/<slug>/ */
  slug: string;
  name: string; place: string; season: string; time: string;
  span: string; org: string; acts: string[]; img: string; start: number;
  map?: string; // رابط خرائط جوجل (اختياري)
  ticket?: string; // رابط حجز التذاكر الرسمي (اختياري) — لا يُضاف إلا لفعالية أعلنت الحجز فعلاً
  /** إحداثيات الدبوس حين لا يكون المكان معلماً في الموقع — تُستخرج من رابط خرائط
   *  قدّمه إياد لا بالتقدير، ويبقى رابطه الأصلي في map لزرّ «افتح في خرائط جوجل». */
  coords?: { lat: number; lng: number };
  /** مقطع ملف معلم يُقام فيه الحدث — تُسحب منه الإحداثيات ورابط الخريطة الموثّقان.
   *  لا يُوضع إلا حين يكون المكان هو المعلم نفسه؛ وما لا معلم له تبقى صفحته بلا خريطة. */
  venue?: string;
  // شارة الحالة: 'confirmed' فقط عندما تُعلن الجهة المنظمة موعد النسخة القادمة رسمياً
  // (ويُحدَّث حقل time بالموعد المعلن)، و'tba' لما توقف أو لم يتأكد تكراره.
  // الافتراضي 'expected': موسم متوقع قياساً على النسخ السابقة — لا نختلق تأكيداً.
  status?: 'confirmed' | 'expected' | 'tba';
  // نافذة الموسم بالأشهر الميلادية (start..end، وتلتفّ عبر رأس السنة إن كان end < start).
  // **مشتقّة حرفياً من حقل time المعروض** ولا تُعرض للقارئ — تُستخدم للترتيب التلقائي
  // وشارة «نحن الآن هنا» فقط. لا تُضِف نافذةً لا يسندها نصّ time الظاهر.
  end?: number;
  // ليالي كفو موسمها هجري متنقل (رمضان) فلا يصلح لها شهر ميلادي ثابت — يُحسب
  // قربها من تقويم جهاز الزائر الهجري. حقل start = 13 يبقى ترتيباً احتياطياً بلا JS.
  ramadan?: true;
};

export const EVENTS_AR: Ev[] = [
  {
    id: 'bisht', slug: 'مهرجان-البشت-الحساوي',
    name: 'مهرجان البشت الحساوي', place: 'قصر إبراهيم التاريخي، الهفوف', venue: 'qasr-ibrahim',
    season: 'الشتاء', time: 'ديسمبر تقريباً', span: 'أيامٌ معدودة', img: '/img/event-bisht', start: 12, end: 12,
    org: 'هيئة التراث (وزارة الثقافة)',
    acts: ['معرض البشت', 'ورش تعليم الحياكة', 'سوق البشوت التفاعلي', 'عروض فولكلورية'],
  },
  {
    id: 'qaisariyah-nights', slug: 'ليالي-القيصرية',
    name: 'ليالي القيصرية', place: 'سوق القيصرية التاريخي، الهفوف', venue: 'qaisariyah',
    season: 'أواخر الشتاء', time: 'فبراير – مارس', span: 'عدة أسابيع', img: '/img/event-qaisariyah-nights', start: 2, end: 3,
    org: 'أمانة الأحساء، هيئة تطوير الأحساء، هيئة التراث',
    acts: ['عروض فنون شعبية', 'جلسات مجتمعية', 'ألعاب تراثية', 'ورش حرفية'],
  },
  {
    id: 'kafu-nights', slug: 'ليالي-كفو',
    name: 'ليالي كفو', place: 'منتزه الملك عبدالله البيئي، الهفوف', venue: 'king-abdullah-park',
    season: 'شهر رمضان المبارك', time: 'خلال شهر رمضان', span: 'ليالٍ رمضانية ممتدة', img: '/img/event-kafu-nights', start: 13, ramadan: true,
    org: 'جامعة الملك فيصل',
    acts: ['عروض مسرحية', 'منطقة الطفل', 'مطبخ كفو التفاعلي', 'عشاء «الغُبقة»'],
  },
  {
    id: 'dates-festival', slug: 'مهرجان-التمور-المصنعة',
    name: 'مهرجان التمور المصنّعة', place: 'قلعة أمانة الأحساء، الهفوف',
    season: 'الشتاء', time: 'يناير – فبراير', span: 'عدة أسابيع', img: '/img/event-dates-festival', start: 1, end: 2,
    org: 'أمانة الأحساء، هيئة تطوير الأحساء',
    acts: ['جناح التذوق والتسوق', 'أجنحة المنتجات التحويلية', 'ورش ثقافية', 'مسابقات'],
  },
  {
    id: 'palm-village', slug: 'قرية-النخيل',
    name: 'قرية النخيل', place: 'واحة الأحساء',
    season: 'الشتاء والربيع', time: 'يناير – مارس', span: 'موسم ممتد', img: '/img/event-palm-village', start: 1, end: 3,
    org: 'المركز الوطني للنخيل والتمور',
    acts: ['متاجر التمور', 'مطاعم ومقاهٍ محلية', 'أجنحة الحرفيين (الخوصيات)', 'تسويق المنتجات الريفية'],
  },
  {
    // موعد نسخة 2026 المعلن: 19 أغسطس – 5 سبتمبر (من إياد، 2026-07-22) — لذلك status: 'confirmed'.
    // عند انقضاء النسخة يعود الحقل إلى الموسم التقريبي «أغسطس – سبتمبر» بحالة 'expected'.
    id: 'lomi', slug: 'معرض-اللومي-الحساوي',
    name: 'معرض اللومي الحساوي', place: 'مركز الأحساء للمعارض',
    season: 'الصيف', time: '19 أغسطس – 5 سبتمبر 2026م', span: 'نحو 18 يوماً', img: '/img/event-lomi', start: 8, end: 9,
    status: 'confirmed',
    org: 'غرفة الأحساء',
    ticket: 'https://lomi.evento.sa/home',
    map: 'https://maps.app.goo.gl/uY5gEBdUJ43pMEFV7',
    coords: { lat: 25.3903836, lng: 49.5619631 },
    acts: ['معارض منتجات اللومي', 'الطهي الحي', 'ورش عمل زراعية', 'ركن الطفل', 'جلسات عائلية'],
  },
  {
    id: 'uqair-winter', slug: 'شتاء-العقير',
    name: 'شتاء العقير', place: 'منتزه شاطئ العقير', venue: 'uqair-beach',
    season: 'الشتاء', time: 'ديسمبر – فبراير', span: 'عدة أسابيع', img: '/img/event-uqair-winter', start: 12, end: 2,
    org: 'هيئة تطوير الأحساء، أمانة الأحساء',
    acts: ['فعاليات بحرية ورياضية عائلية', 'ورش فنية حرفية', 'ألعاب ترفيهية'],
  },
  {
    // شتاء الوفرة: تجمع شتوي موسمي لعربات الطعام بإشراف أمانة الأحساء
    // (صحيفة اليوم 2024-11-22 وجريدة الوطن 2025-11-08) — أُضيف بطلب إياد 2026-07-13.
    id: 'wafrah-winter', slug: 'شتاء-الوفرة',
    name: 'شتاء الوفرة', place: 'حي الوفرة، جنوب الهفوف',
    // النافذة 11→2: البداية من حقل time («من نوفمبر تقريباً») والامتداد من
    // season «الشتاء» + span «موسم شتوي ممتد» — نهايته غير معلنة في المصدر.
    season: 'الشتاء', time: 'من نوفمبر تقريباً', span: 'موسم شتوي ممتد', img: '', start: 11, end: 2,
    org: 'ملاك ومستثمرون بإشراف أمانة الأحساء',
    acts: ['أكثر من 150 عربة طعام (فود ترك)', 'أكلات شعبية حساوية', 'جلسات شتوية مفتوحة'],
    map: 'https://maps.app.goo.gl/7MASkCUkw7JA4Hds8',
  },
  {
    id: 'horse-racing', slug: 'موسم-سباقات-الخيل',
    name: 'موسم سباقات الخيل', place: 'ميدان الفروسية، الطرف',
    season: 'الشتاء', time: 'نوفمبر – فبراير', span: 'موسم ممتد', img: '/img/event-horse-racing', start: 11, end: 2,
    org: 'ميدان الفروسية بالأحساء',
    acts: ['سباقات الخيل', 'فعاليات الفروسية'],
  },
  {
    id: 'creative-ahsa', slug: 'مهرجان-الأحساء-المبدعة',
    name: 'مهرجان الأحساء المبدعة', place: 'الفريج التراثي، قلعة الأمانة',
    season: 'الربيع', time: 'مارس – أبريل', span: 'نحو أسبوع', img: '/img/event-creative-ahsa', start: 3, end: 4,
    org: 'أمانة الأحساء',
    acts: ['صناعة الفخار', 'الخوصيات', 'النجارة التقليدية', 'فنون تشكيلية', 'عروض شعبية'],
  },
];

export const EVENTS_EN: Ev[] = [
  {
    id: 'bisht', slug: 'hasawi-bisht-festival',
    name: 'Hasawi Bisht Festival', place: 'Historic Ibrahim Palace, Hofuf', venue: 'qasr-ibrahim',
    season: 'Winter', time: 'Around December', span: 'A few days', img: '/img/event-bisht', start: 12, end: 12,
    org: 'Heritage Commission (Ministry of Culture)',
    acts: ['Bisht exhibition', 'Weaving workshops', 'Interactive bisht souq', 'Folklore performances'],
  },
  {
    id: 'qaisariyah-nights', slug: 'qaisariyah-nights',
    name: 'Qaisariyah Nights', place: 'Historic Qaisariyah Souq, Hofuf', venue: 'qaisariyah',
    season: 'Late winter', time: 'February – March', span: 'Several weeks', img: '/img/event-qaisariyah-nights', start: 2, end: 3,
    org: 'Al-Ahsa Municipality, Al-Ahsa Development Authority, Heritage Commission',
    acts: ['Folk arts shows', 'Community gatherings', 'Heritage games', 'Craft workshops'],
  },
  {
    id: 'kafu-nights', slug: 'kafu-nights',
    name: 'Kafu Nights', place: 'King Abdullah Environmental Park, Hofuf', venue: 'king-abdullah-park',
    season: 'The holy month of Ramadan', time: 'During Ramadan', span: 'Extended Ramadan nights', img: '/img/event-kafu-nights', start: 13, ramadan: true,
    org: 'King Faisal University',
    acts: ['Theatre shows', 'Kids’ zone', 'Interactive Kafu kitchen', '“Ghabqa” dinner'],
  },
  {
    id: 'dates-festival', slug: 'processed-dates-festival',
    name: 'Processed Dates Festival', place: 'Al-Ahsa Municipality Fort, Hofuf',
    season: 'Winter', time: 'January – February', span: 'Several weeks', img: '/img/event-dates-festival', start: 1, end: 2,
    org: 'Al-Ahsa Municipality, Al-Ahsa Development Authority',
    acts: ['Tasting & shopping pavilion', 'Dates-product pavilions', 'Cultural workshops', 'Competitions'],
  },
  {
    id: 'palm-village', slug: 'palm-village',
    name: 'Palm Village', place: 'Al-Ahsa Oasis',
    season: 'Winter & spring', time: 'January – March', span: 'An extended season', img: '/img/event-palm-village', start: 1, end: 3,
    org: 'National Center for Palms and Dates',
    acts: ['Date shops', 'Local restaurants & cafés', 'Artisan pavilions (palm-frond crafts)', 'Rural products market'],
  },
  {
    // 2026 edition announced: 19 August – 5 September (كما في النسخة العربية).
    id: 'lomi', slug: 'hasawi-lomi-exhibition',
    name: 'Hasawi Lomi Exhibition', place: 'Al-Ahsa Expo Center',
    season: 'Summer', time: '19 August – 5 September 2026', span: 'About 18 days', img: '/img/event-lomi', start: 8, end: 9,
    status: 'confirmed',
    org: 'Al-Ahsa Chamber',
    ticket: 'https://lomi.evento.sa/home',
    map: 'https://maps.app.goo.gl/uY5gEBdUJ43pMEFV7',
    coords: { lat: 25.3903836, lng: 49.5619631 },
    acts: ['Lomi (dried lime) product shows', 'Live cooking', 'Agricultural workshops', 'Kids’ corner', 'Family sessions'],
  },
  {
    id: 'uqair-winter', slug: 'al-uqair-winter',
    name: 'Al-Uqair Winter', place: 'Al-Uqair Beach Park', venue: 'uqair-beach',
    season: 'Winter', time: 'December – February', span: 'Several weeks', img: '/img/event-uqair-winter', start: 12, end: 2,
    org: 'Al-Ahsa Development Authority, Al-Ahsa Municipality',
    acts: ['Family sea & sports activities', 'Art & craft workshops', 'Fun games'],
  },
  {
    id: 'wafrah-winter', slug: 'al-wafrah-winter',
    name: 'Al-Wafrah Winter', place: 'Al-Wafrah district, south Hofuf',
    // النافذة 11→2 كما في النسخة العربية (نهايتها غير معلنة في المصدر).
    season: 'Winter', time: 'From around November', span: 'An extended winter season', img: '', start: 11, end: 2,
    org: 'Private operators under Al-Ahsa Municipality supervision',
    acts: ['150+ food trucks', 'Hasawi folk dishes', 'Open-air winter gatherings'],
    map: 'https://maps.app.goo.gl/7MASkCUkw7JA4Hds8',
  },
  {
    id: 'horse-racing', slug: 'horse-racing-season',
    name: 'Horse Racing Season', place: 'Al-Ahsa Equestrian Arena, Al-Taraf',
    season: 'Winter', time: 'November – February', span: 'An extended season', img: '/img/event-horse-racing', start: 11, end: 2,
    org: 'Al-Ahsa Equestrian Arena',
    acts: ['Horse races', 'Equestrian events'],
  },
  {
    id: 'creative-ahsa', slug: 'creative-alahsa-festival',
    name: 'Creative Al-Ahsa Festival', place: 'Heritage Freej, the Municipality Fort',
    season: 'Spring', time: 'March – April', span: 'About a week', img: '/img/event-creative-ahsa', start: 3, end: 4,
    org: 'Al-Ahsa Municipality',
    acts: ['Pottery making', 'Palm-frond crafts', 'Traditional carpentry', 'Fine arts', 'Folk performances'],
  },
];

export const eventsFor = (lang: string): Ev[] => (lang === 'ar' ? EVENTS_AR : EVENTS_EN);

/** نظير الفعالية باللغة الأخرى — لبناء رابط تبديل اللغة على الصفحة التفصيلية */
export const counterpart = (id: string, lang: string): Ev | undefined =>
  (lang === 'ar' ? EVENTS_EN : EVENTS_AR).find((e) => e.id === id);
