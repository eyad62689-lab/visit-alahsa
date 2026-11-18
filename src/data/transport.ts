// «الوصول والتنقل في الأحساء» — عربي/إنجليزي (2026-11-18).
// المصدر التحريري: مسودة «visit-al-ahsa-transport-ar-en» (أكمل النسخ الخمس، 45 مصدراً)، وكل حقيقة
// منشورة هنا أُعيد التحقق منها في صفحة جهتها الرسمية أو المشغّل يوم 2026-11-18 (سجلّ التحقق في
// وصف طلب الدمج). ما تعارضت فيه المصادر أو لم يُقرأ في مصدره حُذف ولم يُقدَّر:
// مسافة المطار (14 أو 17 كم)، حجم شبكة الحافلات، رقم هاتف سار، أسعار التذاكر الحيّة، ساعات فروع التأجير،
// مدة استخدام الرخصة الأجنبية، ورسوم الجسر. لا رقم في الصفحة من خارج هذا الملف.
export type TransportLang = 'ar' | 'en';
export type Src = { label: string; href: string };
export type Para = string | (string | { tel: string } | { t: string; href: string })[];
export type Section = {
  id: string;
  h: string;
  paras: Para[];
  table?: { caption: string; head: string[]; rows: string[][] };
  after?: string[];
  links?: { id: string; t: string; href: string }[];
  src: Src[];
};
export type TransportPage = {
  seoTitle: string; seoDesc: string;
  eyebrow: string; title: string; lead: string; reviewed: string; date: string; tocLabel: string;
  srcLabel: string; checked: string; newWindow: string;
  groups: { h: string; sections: Section[] }[];
  faqH: string; faqs: { q: string; a: string }[];
  keepH: string; keepP: string; keepLink: string; disclaimer: string;
};

const U = {
  flyadealHof: 'https://www.flyadeal.com/flights/en/flights-from-hofuf',
  flyadealMed: 'https://www.flyadeal.com/flights/en-sa/flights-from-medina-to-hofuf',
  kfia: 'https://kfia.sa/en/Parking-Transport',
  sarNet: 'https://www.sar.com.sa/about-sar/railnetwork/',
  sarCat: 'https://www.sar.com.sa/east-train/ticketcategories/',
  sarBuy: 'https://www.sar.com.sa/northern-train/buyingtickets/',
  sarContact: 'https://www.sar.com.sa/help/contactus/',
  sarBook: 'https://tickets.sar.com.sa/',
  satHow: 'https://satrans.com.sa/news/how-to-book-sat-bus-ticket/',
  satBook: 'https://booking.satrans.com.sa/',
  darbRoutes: 'https://darbalwatan.com/en/routes.php',
  darbHow: 'https://darbalwatan.com/en/how.php',
  amana: 'https://unesco.alhasa.gov.sa/Ar/Details.aspx?ArticleID=3138',
  zatcaReport: 'https://zatca.gov.sa/ar/HelpCenter/Documents/ZATCA_REPORT_2024.pdf',
  zatcaSalwa: 'https://zatca.gov.sa/ar/MediaCenter/News/Pages/Salwa-Port-Preperation.aspx',
  zatcaRub: 'https://zatca.gov.sa/ar/MediaCenter/News/Pages/Services-Begin-at-Empty-Quarter-Port.aspx',
  zatcaCars: 'https://eservices.zatca.gov.sa/sites/sc/ar/CustomsGuideNew/HQweb/Pages/newGuide1438/%D8%A7%D9%84%D8%A5%D8%AF%D8%AE%D8%A7%D9%84-%D8%A7%D9%84%D9%85%D8%A4%D9%82%D8%AA-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A%D8%A9-%D8%A7%D9%84%D8%A3%D8%AC%D9%86%D8%A8%D9%8A%D8%A9.aspx',
  kfcaAbout: 'https://kfca.sa/ar/aboutus',
  kfcaE: 'https://kfca.sa/ar/eservices',
  kfcaRoad: 'https://kfca.sa/ar/roadassistance',
  saptco: 'https://www.saptco.com.sa/al-ahsa-bus',
  saptcoPdf: 'https://saptco.com.sa/pdf/2025-06/al_ahsa_buses_brochure.pdf',
  hafilatApp: 'https://play.google.com/store/apps/details?id=com.saptco.android.afch',
  tga: 'https://www.tga.gov.sa/ar/WebSiteFile/5455136d-91fc-46f3-99ee-066c08ee59cf',
  uber: 'https://www.uber.com/sa/en/r/cities/taxi/al-ahsa-al-mintaqah-al-sharqiyah-sa/',
  careem: 'https://www.careem.com/en-sa/rides/airport/hof/',
  lumi: 'https://lumirental.com/en/car-rental/cities/branches/al-ahsa-city-branch',
  lumiAr: 'https://lumirental.com/ar/car-rental/cities/branches/al-ahsa-city-branch',
  budget: 'https://www.budgetsaudi.com/en/Emergency-Support-Contact/Eastern-Region',
  mawgif: 'https://www.alhasa.gov.sa/Pages/AboutMawgif.aspx',
} as const;

const AR: TransportPage = {
  seoTitle: 'الوصول والتنقل في الأحساء: الطيران والقطار والحافلات',
  seoDesc: 'كيف تصل إلى الأحساء بالطائرة أو القطار أو الحافلة أو السيارة، وكيف تتنقّل فيها: حافلات المدينة وسيارات الأجرة والتطبيقات والمواقف، بروابط المشغّلين الرسمية.',
  eyebrow: 'خطّط لرحلتك',
  title: 'الوصول والتنقل في الأحساء',
  lead: 'اختر وسيلة وصولك إلى الأحساء، ثم رتّب تنقّلك بين وجهاتها. نجمع هنا ما تنشره الجهات الرسمية والمشغّلون، مع رابط كل مصدر؛ افتحه قبل الحجز، فالمواعيد والأسعار تتغيّر.',
  reviewed: 'آخر مراجعة للمعلومات:',
  date: '2026-11-18',
  tocLabel: 'محتويات الصفحة',
  srcLabel: 'المصدر:',
  checked: ' — آخر تحقق:',
  newWindow: '(يفتح في نافذة جديدة)',
  groups: [
    { h: 'الوصول إلى الأحساء', sections: [
      { id: 'air', h: 'بالطائرة',
        paras: [
          'رمز مطار الأحساء الدولي HOF، وتسمّيه شركات الطيران «الهفوف». تعرض طيران أديل في صفحاتها رحلات بين الهفوف ووجهات منها جدة والمدينة المنورة؛ ابحث بتاريخ رحلتك في محرك الحجز لمعرفة الرحلات المتاحة، المباشرة منها وغير المباشرة، وأسعارها.',
          'تتغيّر شركات الطيران العاملة ووجهاتها من موسم إلى آخر، فلا نعرض جدولاً ثابتاً ولا سعراً.',
        ],
        links: [{ id: 'flyadeal', t: 'رحلات طيران أديل من الهفوف', href: U.flyadealHof }],
        src: [{ label: 'طيران أديل', href: U.flyadealHof }, { label: 'طيران أديل: المدينة المنورة إلى الهفوف', href: U.flyadealMed }] },
      { id: 'dammam', h: 'عبر مطار الدمام',
        paras: [
          'إن وصلت إلى مطار الملك فهد الدولي في الدمام، فصفحة النقل في المطار تذكر سيارات الأجرة وتطبيقات النقل وتأجير السيارات والحافلات الترددية. ويمرّ قطار الشرق بين الدمام والهفوف، فرتّب رحلة القطار مستقلةً عن انتقالك من المطار إلى المحطة.',
        ],
        links: [{ id: 'kfia', t: 'النقل في مطار الملك فهد الدولي', href: U.kfia }],
        src: [{ label: 'مطار الملك فهد الدولي', href: U.kfia }, { label: 'الخطوط الحديدية السعودية (سار)', href: U.sarNet }] },
      { id: 'train', h: 'بالقطار',
        paras: [
          'تربط شبكة قطار الشرق التابعة للخطوط الحديدية السعودية «سار» الرياض بالدمام مروراً بالهفوف وبقيق. فئات التذاكر: الاقتصادية الموفّرة والاقتصادية والأعمال والأعمال المميّزة.',
          'احجز عبر موقع سار أو تطبيقها أو مكاتب التذاكر في المحطات؛ يقبل الحجز الإلكتروني بطاقات الدفع، وتقبل مكاتب المحطات النقد والبطاقات. وللاستفسار استخدم صفحة «تواصل معنا» في موقع سار.',
        ],
        links: [{ id: 'sar-booking', t: 'حجز تذاكر سار', href: U.sarBook }, { id: 'sar-contact', t: 'تواصل مع سار', href: U.sarContact }],
        src: [{ label: 'سار: شبكة القطارات', href: U.sarNet }, { label: 'سار: فئات التذاكر', href: U.sarCat }, { label: 'سار: شراء التذاكر', href: U.sarBuy }] },
      { id: 'bus', h: 'بالحافلة بين المدن',
        paras: [
          ['تتيح «سات» (سابتكو ألسا للنقل) حجز رحلات حافلات بين المدن إلى الأحساء، منها رحلات من الرياض، عبر موقعها أو تطبيقها. خدمة العملاء على مدار الساعة: ', { tel: '920018221' }, '.'],
          ['وتنشر «درب الوطن» رحلات يومية على المسار NN25 من محطة حافلات الأحساء وإليها، كما في الجدول؛ واحجز عبر موقعها أو تطبيقها أو مكاتب البيع. للاستفسار: ', { tel: '8003040155' }, '.'],
        ],
        table: { caption: 'رحلات درب الوطن اليومية على المسار NN25 كما ينشرها جدولها', head: ['الرحلة', 'المغادرة', 'الوصول'],
          rows: [['الأحساء إلى الخفجي', '14:00', '22:40'], ['الخفجي إلى الأحساء', '09:00', '17:30'], ['الجبيل إلى الأحساء', '09:30', '13:30'], ['الأحساء إلى الجبيل', '18:00', '22:00']] },
        after: ['جدول درب الوطن غير مؤرّخ في صفحتها؛ تأكّد من يوم سفرك في الحجز.'],
        links: [{ id: 'sat-booking', t: 'حجز حافلات سات', href: U.satBook }, { id: 'darb', t: 'مسارات درب الوطن', href: U.darbRoutes }],
        src: [{ label: 'سات: كيف تحجز تذكرتك', href: U.satHow }, { label: 'درب الوطن: المسارات', href: U.darbRoutes }, { label: 'درب الوطن: طريقة الحجز', href: U.darbHow }] },
      { id: 'car', h: 'بالسيارة',
        paras: [
          'تصف أمانة الأحساء شبكة طرقها بطريق دائري خارجي يحيط بالواحة، وطريق الملك عبدالله الدائري الداخلي حول الكتلة العمرانية. حدّد عنوان إقامتك قبل الانطلاق.',
        ],
        src: [{ label: 'أمانة الأحساء', href: U.amana }] },
      { id: 'gcc', h: 'براً من دول الخليج',
        paras: [
          ['تصل المملكة بدول مجلس التعاون منافذ برية رسمية، منها ما في الجدول؛ اختر المنفذ الذي يناسب بلد انطلاقك. وللتأشيرة وشروط الدخول راجع ', { t: 'دليل التأشيرات', href: '/دليل-التأشيرات/' }, '.'],
        ],
        table: { caption: 'منافذ برية بين المملكة ودول مجلس التعاون', head: ['الدولة', 'المنفذ'],
          rows: [['البحرين', 'جسر الملك فهد'], ['قطر', 'منفذ سلوى'], ['الإمارات العربية المتحدة', 'منفذ البطحاء'], ['سلطنة عُمان', 'منفذ الربع الخالي'], ['الكويت', 'منفذ الخفجي']] },
        src: [{ label: 'مؤسسة جسر الملك فهد', href: U.kfcaAbout }, { label: 'هيئة الزكاة والضريبة والجمارك: منفذ سلوى', href: U.zatcaSalwa }, { label: 'الهيئة: منفذ الربع الخالي', href: U.zatcaRub }, { label: 'الهيئة: التقرير السنوي 2024', href: U.zatcaReport }] },
      { id: 'vehicles', h: 'المركبات الأجنبية وجسر الملك فهد',
        paras: [
          'للسيارات السياحية المسجّلة خارج دول مجلس التعاون، يشترط دليل هيئة الزكاة والضريبة والجمارك للإدخال المؤقت تسجيلاً سارياً، وتأميناً يغطي المملكة طوال مدة الإدخال، ورخصة قيادة سارية، وأن تكون مالك المركبة أو تحمل تفويضاً مصدّقاً. راجع الدليل كاملاً قبل السفر.',
          ['يتيح تطبيق «جسر» الدفع المسبق لرسوم العبور وطلب المساعدة. والمساعدة على الطريق في جسر الملك فهد على الرقم ', { tel: '8004000999' }, ' أو عبر التطبيق.'],
        ],
        src: [{ label: 'هيئة الزكاة والضريبة والجمارك: الإدخال المؤقت للسيارات السياحية الأجنبية', href: U.zatcaCars }, { label: 'جسر الملك فهد: الخدمات الإلكترونية', href: U.kfcaE }, { label: 'جسر الملك فهد: المساعدة على الطريق', href: U.kfcaRoad }] },
    ] },
    { h: 'التنقل داخل الأحساء', sections: [
      { id: 'city-bus', h: 'حافلات الأحساء',
        paras: [
          ['تشغّل سابتكو حافلات الأحساء يومياً من 5:30 صباحاً إلى 11:30 مساءً، والحافلات مجهّزة لذوي الإعاقة. اشترِ التذكرة من تطبيق «حافلات الأحساء» أو ببطاقة الحافلة، ومرّر البطاقة أو رمز التطبيق على جهاز القراءة عند الصعود. للاستفسار: ', { tel: '920000877' }, '.'],
        ],
        table: { caption: 'الأسعار والمسارات كما ينشرها دليل سابتكو', head: ['البند', 'التفاصيل'],
          rows: [['الرحلة الواحدة', '3.45 ريال'], ['بطاقة الحافلة', '10 ريالات شاملة الضريبة'], ['المسار 1', 'المحطة الرئيسية إلى مدينة الملك عبدالله العسكرية؛ كل 20 دقيقة'], ['المسار 2', 'حلقة من المحطة الرئيسية عبر القيصرية ومحطة القطار؛ كل 15 دقيقة'], ['المسار 3', 'المحطة الرئيسية إلى الوسيطة 1؛ كل 20 دقيقة'], ['المسار 4', 'المحطة الرئيسية إلى حي غرناطة؛ التردّد بانتظار التأكيد'], ['المسار 5', 'المحطة الرئيسية إلى مدينة العيون؛ كل 30 دقيقة'], ['المسار 6', 'القيصرية إلى مدينة العمران 6؛ كل 30 دقيقة'], ['المسار 7', 'مجمع الدوائر الحكومية إلى مطار الأحساء؛ كل 120 دقيقة'], ['المسار 8', 'المحطة الرئيسية إلى المدينة الصناعية 4؛ كل 30 دقيقة'], ['المسار 9', 'المحطة الرئيسية إلى بلدة الشعبة؛ كل 30 دقيقة']] },
        after: ['المسارات وتردّدها كما ينشرها دليل سابتكو (غير مؤرّخ)؛ راجع التطبيق لأول رحلة وآخرها في كل مسار.'],
        links: [{ id: 'hafilat-app', t: 'تطبيق حافلات الأحساء', href: U.hafilatApp }],
        src: [{ label: 'سابتكو: حافلات الأحساء', href: U.saptco }, { label: 'سابتكو: دليل المسارات والأسعار', href: U.saptcoPdf }] },
      { id: 'taxi', h: 'سيارات الأجرة',
        paras: [
          ['تحدّد الهيئة العامة للنقل تعرفة الأجرة العامة (حتى 4 ركاب) كما في الجدول. تأكّد من تشغيل العدّاد؛ فالرحلة مجانية إن لم يعمل، بحسب بطاقة التعرفة. للاستفسارات والملاحظات: ', { tel: '19929' }, '.'],
        ],
        table: { caption: 'تعرفة الأجرة العامة بالريال السعودي (وثيقة الهيئة، أكتوبر 2024)', head: ['البند', 'التعرفة'],
          rows: [['بداية الرحلة', '6.4 (ليلاً 10)'], ['لكل كيلومتر', '2.1'], ['لكل دقيقة انتظار أو سير دون 20 كم/س', '0.9'], ['الحد الأدنى للأجرة', '10']] },
        after: ['الليل: الأحد إلى الخميس من 12 منتصف الليل إلى 6 صباحاً، والجمعة والسبت من 2 إلى 6 صباحاً. هذه تعرفة الأجرة العامة، وليست تسعيرة أجرة المطار.'],
        src: [{ label: 'الهيئة العامة للنقل: مواصفات سيارة الأجرة العامة', href: U.tga }] },
      { id: 'apps', h: 'تطبيقات النقل',
        paras: [
          'يمكنك طلب UberX في الأحساء عبر تطبيق أوبر، ومعرفة السعر قبل الطلب. وتعرض كريم رحلات من مطار الأحساء الدولي عبر تطبيقها؛ اتبع نقطة الالتقاء التي يحددها التطبيق وراجع السعر التقديري قبل التأكيد.',
        ],
        src: [{ label: 'أوبر: الأحساء', href: U.uber }, { label: 'كريم: مطار الأحساء', href: U.careem }] },
      { id: 'rental', h: 'تأجير السيارات',
        paras: [
          'تدرج لومي فرعاً في الأحساء، وتدرج بدجت السعودية رقماً لخدماتها في الأحساء. شروط التأجير (العمر والرخصة الدولية والتأمين والدفع) تحدّدها كل شركة، فراجعها معها عند الحجز.',
        ],
        links: [{ id: 'lumi', t: 'لومي: فرع الأحساء', href: U.lumiAr }, { id: 'budget', t: 'بدجت السعودية: المنطقة الشرقية', href: U.budget }],
        src: [{ label: 'لومي', href: U.lumiAr }, { label: 'بدجت السعودية', href: U.budget }] },
      { id: 'arrival', h: 'من المطار ومحطات الوصول',
        paras: [
          'يضم دليل حافلات الأحساء مساراً إلى المطار ومساراً يمرّ بمحطة القطار (انظر جدول المسارات). وتعرض أوبر وكريم رحلات من مطار الأحساء؛ افتح التطبيق عند وصولك لمعرفة نقطة الالتقاء والسعر.',
        ],
        src: [{ label: 'سابتكو: دليل المسارات', href: U.saptcoPdf }, { label: 'أوبر', href: U.uber }, { label: 'كريم', href: U.careem }] },
      { id: 'parking', h: 'مواقف السيارات',
        paras: [
          'تطبّق أمانة الأحساء نظام «مواقف» المدفوع في وسط الهفوف بالتعاون مع الشركة الوطنية للمواقف. ادفع بالعملات المعدنية أو بمحفظة تطبيق «موقف»، والتزم بالمكان المحدد والمدة المدفوعة.',
        ],
        table: { caption: 'تعرفة «مواقف» في وسط الهفوف وساعاتها', head: ['البند', 'التفاصيل'],
          rows: [['التعرفة', '2.30 ريال للساعة'], ['السبت إلى الخميس', '8 صباحاً – 12 ظهراً، و4 – 10 مساءً'], ['الجمعة', 'مجاناً']] },
        after: ['تُعلَن ساعات رمضان على أجهزة المواقف. التعرفة لنطاق وسط الهفوف وحده.'],
        src: [{ label: 'أمانة الأحساء: مواقف', href: U.mawgif }] },
      { id: 'access', h: 'التنقل لذوي الإعاقة',
        paras: [
          'تذكر سابتكو أن حافلات الأحساء مجهّزة لخدمة ذوي الإعاقة. وتمنح سار ذوي الإعاقة المسجّلين خصماً 50% على تذكرة البالغ في الدرجة الاقتصادية، ولمرافق واحد عند الحجز معاً، وفق شروطها. وتذكر صفحة أوبر للأحساء أن المركبات المهيّأة للكراسي المتحركة غير متاحة حالياً عبر خدمتها في المدينة.',
        ],
        src: [{ label: 'سابتكو', href: U.saptco }, { label: 'سار: فئات التذاكر', href: U.sarCat }, { label: 'أوبر', href: U.uber }] },
    ] },
  ],
  faqH: 'أسئلة شائعة',
  faqs: [
    { q: 'هل في الأحساء حافلات نقل عام؟', a: 'نعم. تشغّل سابتكو حافلات الأحساء يومياً من 5:30 صباحاً إلى 11:30 مساءً، وتُشترى التذكرة من تطبيق «حافلات الأحساء» أو ببطاقة الحافلة.' },
    { q: 'كيف أصل إلى الأحساء بالقطار؟', a: 'تمرّ شبكة قطار الشرق التابعة لسار بالهفوف بين الرياض والدمام. احجز من موقع سار أو تطبيقها أو مكاتب التذاكر في المحطات.' },
    { q: 'هل تعمل أوبر وكريم في الأحساء؟', a: 'تعرض أوبر خدمة UberX في الأحساء، وتعرض كريم رحلات من مطار الأحساء الدولي. افتح التطبيق لمعرفة السعر ونقطة الالتقاء.' },
    { q: 'كم تعرفة سيارة الأجرة في الأحساء؟', a: 'تحدّد الهيئة العامة للنقل تعرفة الأجرة العامة: 6.4 ريال بداية الرحلة (ليلاً 10)، و2.1 ريال لكل كيلومتر، والحد الأدنى 10 ريالات.' },
  ],
  keepH: 'في الطريق',
  keepP: 'لأرقام الطوارئ (ومنها المرور وأمن الطرق والإسعاف) وما تفعله عند حادث أو عطل، راجع صفحة',
  keepLink: 'الطوارئ والمساعدة',
  disclaimer: 'المعلومات كما نشرتها الجهات المذكورة يوم التحقق، وليست ضماناً للتوافر أو للسعر. «زوروا الأحساء» لا يبيع التذاكر ولا يحجز الرحلات.',
};

const EN: TransportPage = {
  seoTitle: 'Getting to and around Al-Ahsa: flights, trains and buses',
  seoDesc: 'How to reach Al-Ahsa by air, train, bus or car, and how to get around: city buses, taxis, ride-hailing apps and parking, with links to the official operators.',
  eyebrow: 'Plan your trip',
  title: 'Transport and getting around Al-Ahsa',
  lead: 'Choose how you will arrive in Al-Ahsa, then plan how to get between its sights. This page brings together what official bodies and operators publish, with a link to every source; open it before booking, as times and fares change.',
  reviewed: 'Information last reviewed:',
  date: '2026-11-18',
  tocLabel: 'On this page',
  srcLabel: 'Source:',
  checked: ' — last checked:',
  newWindow: '(opens in a new window)',
  groups: [
    { h: 'Getting to Al-Ahsa', sections: [
      { id: 'air', h: 'By air',
        paras: [
          'Al-Ahsa International Airport uses the code HOF, and airlines list it as Hofuf. flyadeal’s pages show flights between Hofuf and destinations including Jeddah and Medina; search your travel date in its booking tool to see which flights are available, whether they are non-stop, and their fares.',
          'Airlines and destinations serving the airport change from season to season, so we do not show a fixed timetable or fare.',
        ],
        links: [{ id: 'flyadeal', t: 'flyadeal flights from Hofuf', href: U.flyadealHof }],
        src: [{ label: 'flyadeal', href: U.flyadealHof }, { label: 'flyadeal: Medina to Hofuf', href: U.flyadealMed }] },
      { id: 'dammam', h: 'Through Dammam airport',
        paras: [
          'If you arrive at King Fahd International Airport in Dammam, the airport’s transport page lists taxis, ride-sharing, car rental and shuttle buses. The East train runs between Dammam and Hofuf, so book the train separately from your transfer between the airport and the station.',
        ],
        links: [{ id: 'kfia', t: 'King Fahd International Airport transport', href: U.kfia }],
        src: [{ label: 'King Fahd International Airport', href: U.kfia }, { label: 'Saudi Arabia Railways (SAR)', href: U.sarNet }] },
      { id: 'train', h: 'By train',
        paras: [
          'Saudi Arabia Railways (SAR) runs the East network between Riyadh and Dammam via Hofuf and Abqaiq. Ticket categories are Economy Saver, Economy, Business and Business Premium.',
          'Book on SAR’s website or app, or at station ticket offices. Online booking accepts payment cards, and station offices accept cash and cards. For enquiries, use the Contact Us page on SAR’s website.',
        ],
        links: [{ id: 'sar-booking', t: 'Book SAR train tickets', href: U.sarBook }, { id: 'sar-contact', t: 'Contact SAR', href: U.sarContact }],
        src: [{ label: 'SAR: rail network', href: U.sarNet }, { label: 'SAR: ticket categories', href: U.sarCat }, { label: 'SAR: buying tickets', href: U.sarBuy }] },
      { id: 'bus', h: 'By intercity bus',
        paras: [
          ['SAT (SAPTCO Alsa for Transportation) sells intercity bus trips to Al-Ahsa, including from Riyadh, on its website and app. Customer support is available 24/7: ', { tel: '920018221' }, '.'],
          ['Darb Alwatan publishes daily NN25 services to and from Al-Ahsa Bus Station, shown below; book on its website or app or at its ticket offices. Enquiries: ', { tel: '8003040155' }, '.'],
        ],
        table: { caption: 'Darb Alwatan daily NN25 services as published in its timetable', head: ['Service', 'Departs', 'Arrives'],
          rows: [['Al-Ahsa to Khafji', '14:00', '22:40'], ['Khafji to Al-Ahsa', '09:00', '17:30'], ['Jubail to Al-Ahsa', '09:30', '13:30'], ['Al-Ahsa to Jubail', '18:00', '22:00']] },
        after: ['Darb Alwatan’s timetable page is undated; confirm your travel day in the booking tool.'],
        links: [{ id: 'sat-booking', t: 'Book SAT buses', href: U.satBook }, { id: 'darb', t: 'Darb Alwatan routes', href: U.darbRoutes }],
        src: [{ label: 'SAT: how to book', href: U.satHow }, { label: 'Darb Alwatan: routes', href: U.darbRoutes }, { label: 'Darb Alwatan: how to book', href: U.darbHow }] },
      { id: 'car', h: 'By car',
        paras: [
          'Al-Ahsa Municipality describes an outer ring road around the oasis and the inner King Abdullah Ring Road around the urban area. Set your accommodation address before you set off.',
        ],
        src: [{ label: 'Al-Ahsa Municipality', href: U.amana }] },
      { id: 'gcc', h: 'By road from the GCC',
        paras: [
          ['Official land crossings link Saudi Arabia with the other GCC countries, including those in the table; choose the one that suits your country of departure. For visas and entry requirements, see our ', { t: 'visa guide', href: '/en/visa-guide/' }, '.'],
        ],
        table: { caption: 'Land crossings between Saudi Arabia and the GCC countries', head: ['Country', 'Crossing'],
          rows: [['Bahrain', 'King Fahd Causeway'], ['Qatar', 'Salwa Port'], ['United Arab Emirates', 'Al Batha Port'], ['Oman', 'Empty Quarter Port'], ['Kuwait', 'Al Khafji Port']] },
        src: [{ label: 'King Fahd Causeway Authority', href: U.kfcaAbout }, { label: 'ZATCA: Salwa Port', href: U.zatcaSalwa }, { label: 'ZATCA: Empty Quarter Port', href: U.zatcaRub }, { label: 'ZATCA: Annual Report 2024', href: U.zatcaReport }] },
      { id: 'vehicles', h: 'Foreign vehicles and the King Fahd Causeway',
        paras: [
          'For tourist vehicles registered outside the GCC, the ZATCA temporary-admission guide requires valid registration, insurance covering Saudi Arabia for the whole period, a valid driving licence, and that you own the vehicle or hold a certified authorisation. Read the full guide before you travel.',
          ['The Jesr app offers advance toll payment and assistance requests. Roadside assistance on the King Fahd Causeway is on ', { tel: '8004000999' }, ' or through the app.'],
        ],
        src: [{ label: 'ZATCA: temporary admission of foreign tourist vehicles', href: U.zatcaCars }, { label: 'King Fahd Causeway: e-services', href: U.kfcaE }, { label: 'King Fahd Causeway: roadside assistance', href: U.kfcaRoad }] },
    ] },
    { h: 'Getting around Al-Ahsa', sections: [
      { id: 'city-bus', h: 'Al-Ahsa city buses',
        paras: [
          ['SAPTCO runs Al-Ahsa buses daily from 5:30 AM to 11:30 PM, and the buses are equipped for passengers with disabilities. Buy tickets in the Hafilat Al Ahsa app or with a bus card, and swipe the card or the code in the app over the reader when boarding. Enquiries: ', { tel: '920000877' }, '.'],
        ],
        table: { caption: 'Fares and routes as published in SAPTCO’s guide', head: ['Item', 'Details'],
          rows: [['Single journey', 'SAR 3.45'], ['Bus card', 'SAR 10 including tax'], ['Route 1', 'Main Station to King Abdullah Military City; every 20 minutes'], ['Route 2', 'Main Station loop via Al Qaysariah and the Railway Station; every 15 minutes'], ['Route 3', 'Main Station to Alwasitah 1; every 20 minutes'], ['Route 4', 'Main Station to Gharnatah District; frequency awaiting confirmation'], ['Route 5', 'Main Station to Al Uyun; every 30 minutes'], ['Route 6', 'Al Qaysariah to Al Omran City 6; every 30 minutes'], ['Route 7', 'Government Departments Complex to Al-Ahsa Airport; every 120 minutes'], ['Route 8', 'Main Station to Industrial City 4; every 30 minutes'], ['Route 9', 'Main Station to Al Shuba; every 30 minutes']] },
        after: ['Routes and frequencies as published in SAPTCO’s guide (undated); check the app for each route’s first and last trip.'],
        links: [{ id: 'hafilat-app', t: 'Hafilat Al Ahsa app', href: U.hafilatApp }],
        src: [{ label: 'SAPTCO: Al-Ahsa buses', href: U.saptco }, { label: 'SAPTCO: route map and fares', href: U.saptcoPdf }] },
      { id: 'taxi', h: 'Taxis',
        paras: [
          ['The Transport General Authority sets the public-taxi tariff (up to 4 passengers) shown below. Make sure the meter is running; the tariff card states that the trip is free if it is not. Enquiries and comments: ', { tel: '19929' }, '.'],
        ],
        table: { caption: 'Public-taxi tariff in SAR (TGA document, October 2024)', head: ['Item', 'Tariff'],
          rows: [['Flagfall', '6.4 (night 10)'], ['Per kilometre', '2.1'], ['Per minute waiting or below 20 km/h', '0.9'], ['Minimum fare', '10']] },
        after: ['Night: Sunday to Thursday 12 midnight to 6 AM; Friday and Saturday 2 AM to 6 AM. This is the public-taxi tariff, not an airport-taxi fare.'],
        src: [{ label: 'TGA: public taxi specifications', href: U.tga }] },
      { id: 'apps', h: 'Ride-hailing apps',
        paras: [
          'You can request UberX in Al-Ahsa through the Uber app and see the price before you book. Careem lists rides from Al-Ahsa International Airport in its app; follow the pickup point the app shows and check the estimate before confirming.',
        ],
        src: [{ label: 'Uber: Al-Ahsa', href: U.uber }, { label: 'Careem: Al-Ahsa airport', href: U.careem }] },
      { id: 'rental', h: 'Car rental',
        paras: [
          'Lumi lists a branch in Al-Ahsa, and Budget Saudi lists a number for its Al-Ahsa services. Rental conditions (age, international licence, insurance and payment) are set by each company, so check them when you book.',
        ],
        links: [{ id: 'lumi', t: 'Lumi: Al-Ahsa branch', href: U.lumi }, { id: 'budget', t: 'Budget Saudi: Eastern Region', href: U.budget }],
        src: [{ label: 'Lumi', href: U.lumi }, { label: 'Budget Saudi', href: U.budget }] },
      { id: 'arrival', h: 'From the airport and arrival stations',
        paras: [
          'The Al-Ahsa bus guide includes a route to the airport and a route that passes the railway station (see the route table). Uber and Careem also list rides from Al-Ahsa airport; open the app when you arrive to see the pickup point and price.',
        ],
        src: [{ label: 'SAPTCO: route guide', href: U.saptcoPdf }, { label: 'Uber', href: U.uber }, { label: 'Careem', href: U.careem }] },
      { id: 'parking', h: 'Parking',
        paras: [
          'Al-Ahsa Municipality runs the paid Mawgif parking system in central Hofuf with the National Parking Company. Pay with coins or the Mawgif app wallet, and keep to the marked bay and the time you paid for.',
        ],
        table: { caption: 'Mawgif rate and hours in central Hofuf', head: ['Item', 'Details'],
          rows: [['Rate', 'SAR 2.30 per hour'], ['Saturday to Thursday', '8 AM – 12 noon and 4 PM – 10 PM'], ['Friday', 'Free']] },
        after: ['Ramadan hours are posted on the parking machines. The rate applies to central Hofuf only.'],
        src: [{ label: 'Al-Ahsa Municipality: Mawgif', href: U.mawgif }] },
      { id: 'access', h: 'Accessible travel',
        paras: [
          'SAPTCO states that Al-Ahsa buses are equipped for passengers with disabilities. SAR gives registered passengers with disabilities a 50% discount on adult Economy tickets, also for one companion booked together, under its conditions. Uber’s Al-Ahsa page states that wheelchair-accessible vehicles are not currently available through its service in the city.',
        ],
        src: [{ label: 'SAPTCO', href: U.saptco }, { label: 'SAR: ticket categories', href: U.sarCat }, { label: 'Uber', href: U.uber }] },
    ] },
  ],
  faqH: 'Frequently asked questions',
  faqs: [
    { q: 'Does Al-Ahsa have public buses?', a: 'Yes. SAPTCO runs Al-Ahsa buses daily from 5:30 AM to 11:30 PM; buy tickets in the Hafilat Al Ahsa app or with a bus card.' },
    { q: 'How do I get to Al-Ahsa by train?', a: 'SAR’s East network stops at Hofuf on the line between Riyadh and Dammam. Book on SAR’s website or app, or at station ticket offices.' },
    { q: 'Do Uber and Careem operate in Al-Ahsa?', a: 'Uber offers UberX in Al-Ahsa, and Careem lists rides from Al-Ahsa International Airport. Open the app to see the price and pickup point.' },
    { q: 'How much is a taxi in Al-Ahsa?', a: 'The Transport General Authority sets the public-taxi tariff: SAR 6.4 flagfall (10 at night), SAR 2.1 per kilometre, and a minimum fare of SAR 10.' },
  ],
  keepH: 'On the road',
  keepP: 'For emergency numbers (including traffic police, road security and ambulance) and what to do after an accident or breakdown, see',
  keepLink: 'Emergencies and help',
  disclaimer: 'Information is as published by the bodies named on the date checked; it is not a guarantee of availability or price. Visit Al-Ahsa does not sell tickets or book trips.',
};

export const PAGE: Record<TransportLang, TransportPage> = { ar: AR, en: EN };
