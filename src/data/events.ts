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
  /** ساعات العمل اليومية — لا تُذكر إلا منقولةً من مصدر رسمي */
  hours?: string;
  /** تاريخا البداية والنهاية ISO — للنسخ المؤكدة فقط؛ يغذّيان Event schema */
  startISO?: string; endISO?: string;
  /** مدى أسعار التذاكر — من صفحة الحجز الرسمية حصراً؛ يغذّي offers في السكيما */
  priceRange?: { low: number; high: number; currency: string };
  /** محتوى تحريري للصفحة التفصيلية — فقرات موثّقة المصدر، لا تُختلق */
  intro?: string;
  sections?: { h: string; ps: string[] }[];
  faq?: { q: string; a: string }[];
  related?: { label: string; href: string }[];
  seoTitle?: string;
  seoDesc?: string;
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
    name: 'معرض اللومي الحساوي', place: 'مركز الأحساء للمعارض، شارع السلام (طريق عين النجم)، الهفوف',
    season: 'الصيف', time: '19 أغسطس – 5 سبتمبر 2026م', span: 'نحو 18 يوماً', img: '/img/event-lomi', start: 8, end: 9,
    status: 'confirmed',
    org: 'غرفة الأحساء',
    ticket: 'https://www.evento.sa/event-details/62ccadc9-df5c-4e0c-8d10-90eeb297ef74',
    map: 'https://maps.app.goo.gl/uY5gEBdUJ43pMEFV7',
    coords: { lat: 25.3903836, lng: 49.5619631 },
    // المصدر: صفحة الحجز الرسمية على إيفينتو (تُحقّق منها 2026-08-22) — المواعيد
    // والساعات والرسوم منقولة عنها حرفياً. فقرات «ما هو اللومي» من صفحة ثمار
    // الأحساء المعتمدة (رُوجعت يوليو 2026). لا رقم هنا بلا مصدر.
    hours: 'يومياً من 5:00 إلى 11:00 مساءً',
    startISO: '2026-08-19', endISO: '2026-09-05',
    priceRange: { low: 10, high: 15, currency: 'SAR' },
    seoTitle: 'معرض اللومي الحساوي 2026: المواعيد والتذاكر والموقع',
    seoDesc: 'دليل زيارة معرض اللومي الحساوي 2026 في مركز الأحساء للمعارض بالهفوف: من 19 أغسطس إلى 5 سبتمبر، يومياً 5:00-11:00 مساءً، والتذاكر من 10 ريالات عبر منصة إيفينتو، مع فعاليات عائلية وأركان الأسر المنتجة.',
    intro: 'يُعدّ معرض اللومي الحساوي — ويُعرف أيضاً باسم معرض الليمون الحساوي — أبرز الفعاليات الزراعية الموسمية في الأحساء، تنظّمه غرفة الأحساء احتفاءً بثمرة الواحة الأشهر بعد التمور. يقدّم المعرض تجربةً تفاعلية للتعرّف على خصائص اللومي الحساوي وفوائده وتقنيات زراعته، والتواصل مع المزارعين، وتسوّق منتجات الأسر المنتجة، إلى جانب الفعاليات المصاحبة.',
    sections: [
      {
        h: 'ما هو اللومي الحساوي؟',
        ps: [
          'اللومي الحساوي (البن زهيري) — ويسمّيه كثيرون الليمون الحساوي — ثمرة صغيرة خضراء داكنة، رقيقة القشرة غزيرة العصير، بطعم حمضي قوي ورائحة عطرية نفّاذة تميّزه عن سائر الحمضيات. وهو المنتج الزراعي الثاني في الأحساء بعد التمور: تنتشر في الواحة أكثر من 100 ألف شجرة لومي مثمرة، تنتج الشجرة الواحدة ما بين 25 و30 كيلوغراماً في الموسم.',
          'وترتبط به عادة أحسائية صيفية أصيلة: تجتمع الأسر لعصره وتخزينه («الجميد» أو اللومي المشمّس) لاستعماله على مدار العام — طازجاً وعصيراً ومجففاً (اللومي الأسود) في المطبخ الحساوي والخليجي.',
        ],
      },
      {
        h: 'التذاكر والدخول',
        ps: [
          'وفق صفحة الحجز الرسمية على منصة إيفينتو: تذكرة الدخول بـ10 ريالات من الأحد إلى الأربعاء، و15 ريالاً من الخميس إلى السبت (للشراء الإلكتروني)، وتُضاف رسوم خدمة وتشغيل قدرها 5 ريالات على كل تذكرة تُشترى من شباك التذاكر في الموقع — فالحجز الإلكتروني المسبق أوفر.',
          'الدخول مجاني للأطفال دون 5 سنوات، والتذكرة مخصصة لدخول المعرض فقط وصالحة لليوم المحدد فيها وحده، وتُباع حصراً عبر منصة إيفينتو.',
        ],
      },
    ],
    faq: [
      { q: 'متى يقام معرض اللومي الحساوي 2026؟', a: 'من 19 أغسطس إلى 5 سبتمبر 2026م، يومياً من 5:00 إلى 11:00 مساءً.' },
      { q: 'أين يقام المعرض؟', a: 'في مركز الأحساء للمعارض على شارع السلام (طريق عين النجم) بالهفوف — وتجد الخريطة في هذه الصفحة.' },
      { q: 'هل الدخول مجاني؟', a: 'الدخول مجاني للأطفال دون 5 سنوات فقط. التذكرة 10 ريالات من الأحد إلى الأربعاء و15 ريالاً من الخميس إلى السبت عند الشراء الإلكتروني، وتُضاف 5 ريالات على تذاكر الشباك.' },
      { q: 'كيف أحجز التذاكر؟', a: 'عبر منصة إيفينتو حصراً — زر «احجز تذكرتك» أعلى هذه الصفحة يوصلك إلى صفحة الحجز الرسمية.' },
      { q: 'ما الفرق بين اللومي الحساوي والليمون العادي؟', a: 'اللومي الحساوي أصغر حجماً وأرقّ قشرة وأغزر عصارة وأقوى رائحة، ويُستخدم طازجاً وعصيراً ومجففاً (اللومي الأسود) في المطبخ الحساوي.' },
      { q: 'هل توجد فعاليات للأطفال؟', a: 'نعم — يضم المعرض ركن الطفل، إلى جانب الطهي الحي وورش العمل الزراعية والجلسات العائلية.' },
    ],
    related: [
      { label: 'اللومي الحساوي في صفحة ثمار الأحساء', href: '/ثمار/' },
      { label: 'خطّط لرحلتك إلى الأحساء', href: '/خطط/' },
    ],
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
    name: 'Hasawi Lomi Exhibition', place: 'Al-Ahsa Expo Center, Al-Salam St (Ain Najm Rd), Hofuf',
    season: 'Summer', time: '19 August – 5 September 2026', span: 'About 18 days', img: '/img/event-lomi', start: 8, end: 9,
    status: 'confirmed',
    org: 'Al-Ahsa Chamber',
    ticket: 'https://www.evento.sa/event-details/62ccadc9-df5c-4e0c-8d10-90eeb297ef74',
    map: 'https://maps.app.goo.gl/uY5gEBdUJ43pMEFV7',
    coords: { lat: 25.3903836, lng: 49.5619631 },
    // Source: the official Evento booking page (verified 2026-08-22) — dates, hours
    // and fees quoted from it. "What is the lomi" paragraphs come from the approved
    // Fruits page (reviewed July 2026). No number here without a source.
    hours: 'Daily, 5:00-11:00 PM',
    startISO: '2026-08-19', endISO: '2026-09-05',
    priceRange: { low: 10, high: 15, currency: 'SAR' },
    seoTitle: 'Hasawi Lomi Exhibition 2026: Dates, Tickets & Location',
    seoDesc: 'Visitor guide to the 2026 Hasawi Lomi (Lemon) Exhibition at the Al-Ahsa Expo Center in Hofuf: 19 August - 5 September, daily 5:00-11:00 PM, tickets from SAR 10 via Evento, with family activities and productive-family stalls.',
    intro: 'The Hasawi Lomi Exhibition — also known as the Hasawi Lemon Exhibition or the Al-Ahsa Lemon Festival — is Al-Ahsa\u2019s flagship seasonal agricultural event, organised by the Al-Ahsa Chamber to celebrate the oasis\u2019s most famous crop after dates. The exhibition offers an interactive experience of the Hasawi lomi\u2019s qualities, benefits and cultivation, direct contact with the farmers, and shopping from productive-family stalls, alongside the accompanying programme.',
    sections: [
      {
        h: 'What is the Hasawi lomi?',
        ps: [
          'The Hasawi lomi — often called the Hasawi lemon or Hasawi lime — is a small, dark-green citrus with a thin skin, abundant juice, a sharp tang and a distinctive aroma that sets it apart from other citrus. It is Al-Ahsa\u2019s second crop after dates: the oasis grows more than 100,000 fruiting lomi trees, each yielding some 25-30 kilograms a season.',
          'A cherished summer tradition surrounds it: families gather to juice and preserve it for the whole year — fresh, as juice, or dried into black lime (loomi) for Hasawi and Gulf cooking.',
        ],
      },
      {
        h: 'Tickets & entry',
        ps: [
          'According to the official booking page on Evento: entry is SAR 10 from Sunday to Wednesday and SAR 15 from Thursday to Saturday (online purchase), with a SAR 5 service fee added to every ticket bought at the on-site box office — so booking online is cheaper.',
          'Entry is free for children under 5. A ticket covers exhibition entry only, is valid solely for the day stated on it, and tickets are sold exclusively through Evento.',
        ],
      },
    ],
    faq: [
      { q: 'When is the Hasawi Lomi Exhibition 2026?', a: 'From 19 August to 5 September 2026, daily from 5:00 to 11:00 PM.' },
      { q: 'Where is the exhibition held?', a: 'At the Al-Ahsa Expo Center on Al-Salam Street (Ain Najm Road) in Hofuf — the map is on this page.' },
      { q: 'Is entry free?', a: 'Entry is free only for children under 5. Tickets are SAR 10 from Sunday to Wednesday and SAR 15 from Thursday to Saturday online, with SAR 5 added at the box office.' },
      { q: 'How do I book tickets?', a: 'Exclusively through the Evento platform — the "Book your ticket" button on this page takes you to the official booking page.' },
      { q: 'How does the Hasawi lomi differ from a regular lemon?', a: 'It is smaller, thinner-skinned, juicier and more aromatic, and is used fresh, as juice, and dried into black lime (loomi) in Hasawi cooking.' },
      { q: 'Are there activities for children?', a: 'Yes — the exhibition has a kids\u2019 corner, alongside live cooking, agricultural workshops and family sessions.' },
    ],
    related: [
      { label: 'The Hasawi lomi on our Fruits of Al-Ahsa page', href: '/en/fruits/' },
      { label: 'Plan your trip to Al-Ahsa', href: '/en/plan-your-trip/' },
    ],
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
