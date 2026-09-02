// بيانات الفعاليات — مصدر واحد تقرأ منه قائمة الفعاليات وصفحاتها التفصيلية.
// كانت مضمّنة داخل EventsView.astro، فأُخرجت هنا لمّا صار لكل فعالية صفحة مستقلة
// (2026-08-16) — نسخة واحدة تمنع تباعد القائمة عن الصفحة.
//
// قاعدة ملزمة: لا تُختلق معلومة. الحقول أدناه من مصادر إياد والجهات المنظّمة،
// ولا يُضاف حقل لا يسنده مصدر — لا موعد ولا رابط حجز ولا إحداثيات.
//
// البنية (2026-09-02): الحقول البنيوية غير اللغوية (الصورة، نافذة الأشهر،
// الإحداثيات، روابط الخريطة والحجز، التواريخ ISO، الأسعار، المعلم، الحالة) تُكتب
// مرة واحدة في EVENT_META، والنصوص وحدها في TEXT_AR/TEXT_EN — كانت النسختان
// تكرّران كل حقل بنيوي فتتباعدان بصمت. eventsFor يدمجهما فتبقى Ev كما هي
// لكل مستهلك (القائمة، الصفحة، sitemap، llms.txt).
import type { Lang } from '../i18n/ui';

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
  /** محتوى تحريري للصفحة التفصيلية — فقرات موثّقة المصدر، لا تُختلق.
   *  dated: بند خاص بالنسخة الجارية (مواعيدها أو رسومها أو حجزها) — يسقط تلقائياً
   *  بعد انقضائها فلا تبقى الصفحة تصف نسخةً منتهية. */
  intro?: string;
  sections?: { h: string; ps: string[]; dated?: true }[];
  faq?: { q: string; a: string; dated?: true }[];
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
  /** ما تعود إليه الفعالية تلقائياً بعد انقضاء النسخة المؤكدة (بعد endISO):
   *  موسم تقريبي بلا تواريخ ولا ساعات ولا رسوم ولا رابط حجز. يُطبَّق في البناء
   *  (evView) وفي متصفّح الزائر أيضاً، فلا تبقى نسخة منتهية معروضة كـ«مؤكدة»
   *  لو تأخّر النشر التالي. إلزامي مع كل status: 'confirmed' — يفرضه النوع
   *  على مستوى المصدر (EventMeta/EventTexts أدناه). */
  after?: { time: string; span: string; status: 'expected' | 'tba'; seoTitle?: string; seoDesc?: string };
};

/** انقضت النسخة المؤكدة؟ — بنهاية اليوم الأخير بتوقيت السعودية (UTC+3، بلا توقيت صيفي) */
export const editionOver = (ev: Ev, now: Date = new Date()): boolean =>
  !!ev.endISO && now.getTime() > Date.parse(`${ev.endISO}T23:59:59+03:00`);

/** العرض الفعّال للفعالية في لحظةٍ ما: النسخة المؤكدة ما دامت قائمة، وبعد انقضائها
 *  الموسمُ التقريبي في after — تسقط معها المواعيد والساعات والرسوم والحجز والبنود
 *  الموسومة dated، فتنتفي سكيما Event تلقائياً (شرطها startISO/endISO). */
export function evView(ev: Ev, now: Date = new Date()): Ev {
  if (!ev.after || !editionOver(ev, now)) return ev;
  const { hours: _h, ticket: _t, priceRange: _p, startISO: _s, endISO: _e, ...rest } = ev;
  return {
    ...rest,
    time: ev.after.time,
    span: ev.after.span,
    status: ev.after.status,
    seoTitle: ev.after.seoTitle ?? ev.seoTitle,
    seoDesc: ev.after.seoDesc ?? ev.seoDesc,
    sections: ev.sections?.filter((s) => !s.dated),
    faq: ev.faq?.filter((f) => !f.dated),
  };
}

// ── الحقول البنيوية — مرة واحدة لكل فعالية ──────────────────────────────────
/** ما يشترك فيه كل الأنواع (انظر Ev لشرح كل حقل). */
type MetaCommon = Pick<Ev, 'img' | 'start' | 'end' | 'ramadan' | 'map' | 'ticket' | 'coords' | 'priceRange' | 'venue'>;
/** النسخة المؤكدة تلزمها تواريخ ISO وحالةُ ما بعد الانقضاء؛ وسواها لا تحمل شيئاً منها.
 *  اتحادٌ مميَّز: لا يمكن كتابة status: 'confirmed' بلا afterStatus، ولا تواريخ ISO بلا تأكيد. */
type EventMeta = MetaCommon & (
  | { status: 'confirmed'; startISO: string; endISO: string; afterStatus: 'expected' | 'tba' }
  | { status?: 'expected' | 'tba'; startISO?: undefined; endISO?: undefined; afterStatus?: undefined }
);

// ترتيب المفاتيح هنا هو ترتيب القائمة الافتراضي (EVENTS_AR/EN) — لا يُغيَّر عبثاً.
const EVENT_META = {
  bisht: { img: '/img/event-bisht', start: 12, end: 12, venue: 'qasr-ibrahim' },
  'qaisariyah-nights': { img: '/img/event-qaisariyah-nights', start: 2, end: 3, venue: 'qaisariyah' },
  'kafu-nights': { img: '/img/event-kafu-nights', start: 13, ramadan: true, venue: 'king-abdullah-park' },
  'dates-festival': { img: '/img/event-dates-festival', start: 1, end: 2 },
  'palm-village': { img: '/img/event-palm-village', start: 1, end: 3 },
  // موعد نسخة 2026 المعلن: 19 أغسطس – 5 سبتمبر (من إياد، 2026-07-22)، ثم مُدِّد
  // إلى 13 سبتمبر (من إياد، 2026-08-28) — لذلك status: 'confirmed'.
  // العودة إلى الموسم التقريبي بعد الانقضاء تلقائية عبر after (النصوص في
  // TEXT_AR/TEXT_EN وحالتها هنا): يطبّقها البناء (evView) ومتصفّح الزائر معاً،
  // فلا حاجة لتحرير يدوي بعد 13 سبتمبر.
  // المصدر: صفحة الحجز الرسمية على إيفينتو (تُحقّق منها 2026-08-22) — المواعيد
  // والرسوم منقولة عنها حرفياً، وتمديد الختام إلى 13 سبتمبر من إياد (2026-08-28).
  // الإحداثيات من رابط الخرائط الذي قدّمه إياد لا بالتقدير. لا رقم هنا بلا مصدر.
  lomi: {
    img: '/img/event-lomi', start: 8, end: 9,
    status: 'confirmed', afterStatus: 'expected',
    startISO: '2026-08-19', endISO: '2026-09-13',
    ticket: 'https://www.evento.sa/event-details/62ccadc9-df5c-4e0c-8d10-90eeb297ef74',
    map: 'https://maps.app.goo.gl/uY5gEBdUJ43pMEFV7',
    coords: { lat: 25.3903836, lng: 49.5619631 },
    priceRange: { low: 10, high: 15, currency: 'SAR' },
  },
  'uqair-winter': { img: '/img/event-uqair-winter', start: 12, end: 2, venue: 'uqair-beach' },
  // شتاء الوفرة: تجمع شتوي موسمي لعربات الطعام بإشراف أمانة الأحساء
  // (صحيفة اليوم 2024-11-22 وجريدة الوطن 2025-11-08) — أُضيف بطلب إياد 2026-07-13.
  // النافذة 11→2: البداية من حقل time («من نوفمبر تقريباً») والامتداد من
  // season «الشتاء» + span «موسم شتوي ممتد» — نهايته غير معلنة في المصدر.
  'wafrah-winter': { img: '', start: 11, end: 2, map: 'https://maps.app.goo.gl/7MASkCUkw7JA4Hds8' },
  'horse-racing': { img: '/img/event-horse-racing', start: 11, end: 2 },
  'creative-ahsa': { img: '/img/event-creative-ahsa', start: 3, end: 4 },
} as const satisfies Record<string, EventMeta>;

export type EventId = keyof typeof EVENT_META;
const EVENT_IDS = Object.keys(EVENT_META) as EventId[];

// ── النصوص — لكل لغة نسخة ────────────────────────────────────────────────────
type AfterText = { time: string; span: string; seoTitle?: string; seoDesc?: string };
type EvTextBase = Pick<Ev, 'slug' | 'name' | 'place' | 'season' | 'time' | 'span' | 'org' | 'acts'
  | 'hours' | 'intro' | 'sections' | 'faq' | 'related' | 'seoTitle' | 'seoDesc'>;
/** نصّ after إلزامي لكل فعالية مؤكدة في EVENT_META وممنوع لسواها — يفرضه النوع. */
type TextFor<K extends EventId> = (typeof EVENT_META)[K] extends { status: 'confirmed' }
  ? EvTextBase & { after: AfterText }
  : EvTextBase & { after?: never };
type EventTexts = { [K in EventId]: TextFor<K> };

const TEXT_AR: EventTexts = {
  bisht: {
    slug: 'مهرجان-البشت-الحساوي',
    name: 'مهرجان البشت الحساوي', place: 'قصر إبراهيم التاريخي، الهفوف',
    season: 'الشتاء', time: 'ديسمبر تقريباً', span: 'أيامٌ معدودة',
    org: 'هيئة التراث (وزارة الثقافة)',
    acts: ['معرض البشت', 'ورش تعليم الحياكة', 'سوق البشوت التفاعلي', 'عروض فولكلورية'],
  },
  'qaisariyah-nights': {
    slug: 'ليالي-القيصرية',
    name: 'ليالي القيصرية', place: 'سوق القيصرية التاريخي، الهفوف',
    season: 'أواخر الشتاء', time: 'فبراير – مارس', span: 'عدة أسابيع',
    org: 'أمانة الأحساء، هيئة تطوير الأحساء، هيئة التراث',
    acts: ['عروض فنون شعبية', 'جلسات مجتمعية', 'ألعاب تراثية', 'ورش حرفية'],
  },
  'kafu-nights': {
    slug: 'ليالي-كفو',
    name: 'ليالي كفو', place: 'منتزه الملك عبدالله البيئي، الهفوف',
    season: 'شهر رمضان المبارك', time: 'خلال شهر رمضان', span: 'ليالٍ رمضانية ممتدة',
    org: 'جامعة الملك فيصل',
    acts: ['عروض مسرحية', 'منطقة الطفل', 'مطبخ كفو التفاعلي', 'عشاء «الغُبقة»'],
  },
  'dates-festival': {
    slug: 'مهرجان-التمور-المصنعة',
    name: 'مهرجان التمور المصنّعة', place: 'قلعة أمانة الأحساء، الهفوف',
    season: 'الشتاء', time: 'يناير – فبراير', span: 'عدة أسابيع',
    org: 'أمانة الأحساء، هيئة تطوير الأحساء',
    acts: ['جناح التذوق والتسوق', 'أجنحة المنتجات التحويلية', 'ورش ثقافية', 'مسابقات'],
  },
  'palm-village': {
    slug: 'قرية-النخيل',
    name: 'قرية النخيل', place: 'واحة الأحساء',
    season: 'الشتاء والربيع', time: 'يناير – مارس', span: 'موسم ممتد',
    org: 'المركز الوطني للنخيل والتمور',
    acts: ['متاجر التمور', 'مطاعم ومقاهٍ محلية', 'أجنحة الحرفيين (الخوصيات)', 'تسويق المنتجات الريفية'],
  },
  lomi: {
    slug: 'معرض-اللومي-الحساوي',
    name: 'معرض اللومي الحساوي', place: 'مركز الأحساء للمعارض، شارع السلام (طريق عين النجم)، الهفوف',
    season: 'الصيف', time: '19 أغسطس – 13 سبتمبر 2026م', span: 'نحو 26 يوماً',
    after: {
      time: 'أغسطس – سبتمبر تقريباً', span: 'عدة أسابيع',
      seoTitle: 'معرض اللومي الحساوي: الموسم والموقع والأنشطة',
      seoDesc: 'دليل معرض اللومي الحساوي بالهفوف: موسمه التقريبي في أغسطس وسبتمبر من كل عام وأنشطته — تابع إعلان غرفة الأحساء لموعد النسخة القادمة.',
    },
    org: 'غرفة الأحساء',
    // المصدر: صفحة الحجز الرسمية على إيفينتو (تُحقّق منها 2026-08-22) — المواعيد
    // والساعات والرسوم منقولة عنها حرفياً، وتمديد الختام إلى 13 سبتمبر من إياد
    // (2026-08-28). فقرات «ما هو اللومي» من صفحة ثمار الأحساء المعتمدة
    // (رُوجعت يوليو 2026). لا رقم هنا بلا مصدر.
    hours: 'يومياً من 5:00 إلى 11:00 مساءً',
    seoTitle: 'معرض اللومي الحساوي 2026: المواعيد والتذاكر والموقع',
    seoDesc: 'دليل معرض اللومي الحساوي 2026 بالهفوف: من 19 أغسطس إلى 13 سبتمبر بعد التمديد، يومياً 5:00-11:00 مساءً، والتذاكر من 10 ريالات عبر منصة إيفينتو.',
    intro: 'يُعدّ معرض اللومي الحساوي — ويُعرف أيضاً باسم معرض الليمون الحساوي — أبرز الفعاليات الزراعية الموسمية في الأحساء، تنظّمه غرفة الأحساء احتفاءً بثمرة الواحة الأشهر بعد التمور. يقدّم المعرض تجربةً تفاعلية للتعرّف على خصائص اللومي الأحسائي وفوائده وتقنيات زراعته، والتواصل مع المزارعين، وتسوّق منتجات الأسر المنتجة، إلى جانب الفعاليات المصاحبة.',
    sections: [
      {
        h: 'ما هو اللومي الأحسائي؟',
        ps: [
          'اللومي الأحسائي (البن زهيري) — ويسمّيه كثيرون الليمون الأحسائي — ثمرة صغيرة خضراء داكنة، رقيقة القشرة غزيرة العصير، بطعم حمضي قوي ورائحة عطرية نفّاذة تميّزه عن سائر الحمضيات. وهو المنتج الزراعي الثاني في الأحساء بعد التمور: تنتشر في الواحة أكثر من 100 ألف شجرة لومي مثمرة، تنتج الشجرة الواحدة ما بين 25 و30 كيلوغراماً في الموسم.',
          'وترتبط به عادة أحسائية صيفية أصيلة: تجتمع الأسر لعصره وتخزينه («الجميد» أو اللومي المشمّس) لاستعماله على مدار العام — طازجاً وعصيراً ومجففاً في المطبخ الأحسائي والخليجي.',
        ],
      },
      {
        // موسوم dated: رسوم هذه النسخة وحدها — يسقط القسم تلقائياً بعد انقضائها
        h: 'التذاكر والدخول', dated: true,
        ps: [
          'وفق صفحة الحجز الرسمية على منصة إيفينتو: تذكرة الدخول بـ10 ريالات من الأحد إلى الأربعاء، و15 ريالاً من الخميس إلى السبت (للشراء الإلكتروني)، وتُضاف رسوم خدمة وتشغيل قدرها 5 ريالات على كل تذكرة تُشترى من شباك التذاكر في الموقع — فالحجز الإلكتروني المسبق أوفر.',
          'الدخول مجاني للأطفال دون 5 سنوات، والتذكرة مخصصة لدخول المعرض فقط وصالحة لليوم المحدد فيها وحده، وتُباع حصراً عبر منصة إيفينتو.',
        ],
      },
    ],
    faq: [
      // البنود الموسومة dated خاصة بهذه النسخة (مواعيدها ورسومها وحجزها) وتسقط بانقضائها
      { q: 'متى يقام معرض اللومي الحساوي 2026؟', a: 'من 19 أغسطس إلى 13 سبتمبر 2026م بعد التمديد، يومياً من 5:00 إلى 11:00 مساءً.', dated: true },
      { q: 'أين يقام المعرض؟', a: 'في مركز الأحساء للمعارض على شارع السلام (طريق عين النجم) بالهفوف — وتجد الخريطة في هذه الصفحة.' },
      { q: 'هل الدخول مجاني؟', a: 'الدخول مجاني للأطفال دون 5 سنوات فقط. التذكرة 10 ريالات من الأحد إلى الأربعاء و15 ريالاً من الخميس إلى السبت عند الشراء الإلكتروني، وتُضاف 5 ريالات على تذاكر الشباك.', dated: true },
      { q: 'كيف أحجز التذاكر؟', a: 'عبر منصة إيفينتو حصراً — زر «احجز تذكرتك» أعلى هذه الصفحة يوصلك إلى صفحة الحجز الرسمية.', dated: true },
      { q: 'ما الفرق بين اللومي الأحسائي والليمون العادي؟', a: 'اللومي الأحسائي أصغر حجماً وأرقّ قشرة وأغزر عصارة وأقوى رائحة، ويُستخدم طازجاً وعصيراً ومجففاً في المطبخ الأحسائي.' },
      { q: 'هل توجد فعاليات للأطفال؟', a: 'نعم — يضم المعرض ركن الطفل، إلى جانب الطهي الحي وورش العمل الزراعية والجلسات العائلية.' },
    ],
    related: [
      { label: 'اللومي الأحسائي في صفحة ثمار الأحساء', href: '/ثمار/' },
      { label: 'خطّط لرحلتك إلى الأحساء', href: '/خطط/' },
    ],
    acts: ['معارض منتجات اللومي', 'الطهي الحي', 'ورش عمل زراعية', 'ركن الطفل', 'جلسات عائلية'],
  },
  'uqair-winter': {
    slug: 'شتاء-العقير',
    name: 'شتاء العقير', place: 'منتزه شاطئ العقير',
    season: 'الشتاء', time: 'ديسمبر – فبراير', span: 'عدة أسابيع',
    org: 'هيئة تطوير الأحساء، أمانة الأحساء',
    acts: ['فعاليات بحرية ورياضية عائلية', 'ورش فنية حرفية', 'ألعاب ترفيهية'],
  },
  'wafrah-winter': {
    slug: 'شتاء-الوفرة',
    name: 'شتاء الوفرة', place: 'حي الوفرة، جنوب الهفوف',
    season: 'الشتاء', time: 'من نوفمبر تقريباً', span: 'موسم شتوي ممتد',
    org: 'ملاك ومستثمرون بإشراف أمانة الأحساء',
    acts: ['أكثر من 150 عربة طعام (فود ترك)', 'أكلات شعبية أحسائية', 'جلسات شتوية مفتوحة'],
  },
  'horse-racing': {
    slug: 'موسم-سباقات-الخيل',
    name: 'موسم سباقات الخيل', place: 'ميدان الفروسية، الطرف',
    season: 'الشتاء', time: 'نوفمبر – فبراير', span: 'موسم ممتد',
    org: 'ميدان الفروسية بالأحساء',
    acts: ['سباقات الخيل', 'فعاليات الفروسية'],
  },
  'creative-ahsa': {
    slug: 'مهرجان-الأحساء-المبدعة',
    name: 'مهرجان الأحساء المبدعة', place: 'الفريج التراثي، قلعة الأمانة',
    season: 'الربيع', time: 'مارس – أبريل', span: 'نحو أسبوع',
    org: 'أمانة الأحساء',
    acts: ['صناعة الفخار', 'الخوصيات', 'النجارة التقليدية', 'فنون تشكيلية', 'عروض شعبية'],
  },
};

const TEXT_EN: EventTexts = {
  bisht: {
    slug: 'hasawi-bisht-festival',
    name: 'Hasawi Bisht Festival', place: 'Historic Ibrahim Palace, Hofuf',
    season: 'Winter', time: 'Around December', span: 'A few days',
    org: 'Heritage Commission (Ministry of Culture)',
    acts: ['Bisht exhibition', 'Weaving workshops', 'Interactive bisht souq', 'Folklore performances'],
  },
  'qaisariyah-nights': {
    slug: 'qaisariyah-nights',
    name: 'Qaisariyah Nights', place: 'Historic Qaisariyah Souq, Hofuf',
    season: 'Late winter', time: 'February – March', span: 'Several weeks',
    org: 'Al-Ahsa Municipality, Al-Ahsa Development Authority, Heritage Commission',
    acts: ['Folk arts shows', 'Community gatherings', 'Heritage games', 'Craft workshops'],
  },
  'kafu-nights': {
    slug: 'kafu-nights',
    name: 'Kafu Nights', place: 'King Abdullah Environmental Park, Hofuf',
    season: 'The holy month of Ramadan', time: 'During Ramadan', span: 'Extended Ramadan nights',
    org: 'King Faisal University',
    acts: ['Theatre shows', 'Kids’ zone', 'Interactive Kafu kitchen', '“Ghabqa” dinner'],
  },
  'dates-festival': {
    slug: 'processed-dates-festival',
    name: 'Processed Dates Festival', place: 'Al-Ahsa Municipality Fort, Hofuf',
    season: 'Winter', time: 'January – February', span: 'Several weeks',
    org: 'Al-Ahsa Municipality, Al-Ahsa Development Authority',
    acts: ['Tasting & shopping pavilion', 'Dates-product pavilions', 'Cultural workshops', 'Competitions'],
  },
  'palm-village': {
    slug: 'palm-village',
    name: 'Palm Village', place: 'Al-Ahsa Oasis',
    season: 'Winter & spring', time: 'January – March', span: 'An extended season',
    org: 'National Center for Palms and Dates',
    acts: ['Date shops', 'Local restaurants & cafés', 'Artisan pavilions (palm-frond crafts)', 'Rural products market'],
  },
  lomi: {
    // 2026 edition announced: 19 August – 5 September, then extended to 13 September
    // (from Eyad, 2026-08-28) — كما في النسخة العربية.
    slug: 'hasawi-lomi-exhibition',
    name: 'Hasawi Lomi Exhibition', place: 'Al-Ahsa Expo Center, Al-Salam St (Ain Najm Rd), Hofuf',
    season: 'Summer', time: '19 August – 13 September 2026', span: 'About 26 days',
    after: {
      time: 'Around August – September', span: 'Several weeks',
      seoTitle: 'Hasawi Lomi Exhibition: Season, Location & Highlights',
      seoDesc: 'Guide to the Hasawi Lomi Exhibition in Hofuf: its approximate season in August-September each year — follow the Al-Ahsa Chamber for the next edition’s dates.',
    },
    org: 'Al-Ahsa Chamber',
    // Source: the official Evento booking page (verified 2026-08-22) — dates, hours
    // and fees quoted from it. "What is the lomi" paragraphs come from the approved
    // Fruits page (reviewed July 2026). No number here without a source.
    hours: 'Daily, 5:00-11:00 PM',
    seoTitle: 'Hasawi Lomi Exhibition 2026: Dates, Tickets & Location',
    seoDesc: 'Guide to the 2026 Hasawi Lomi Exhibition in Hofuf: 19 August - 13 September after the extension, daily 5:00-11:00 PM, tickets from SAR 10 via Evento.',
    intro: 'The Hasawi Lomi Exhibition — also known as the Hasawi Lemon Exhibition or the Al-Ahsa Lemon Festival — is Al-Ahsa’s flagship seasonal agricultural event, organised by the Al-Ahsa Chamber to celebrate the oasis’s most famous crop after dates. The exhibition offers an interactive experience of the Hasawi lomi’s qualities, benefits and cultivation, direct contact with the farmers, and shopping from productive-family stalls, alongside the accompanying programme.',
    sections: [
      {
        h: 'What is the Hasawi lomi?',
        ps: [
          'The Hasawi lomi — often called the Hasawi lemon or Hasawi lime — is a small, dark-green citrus with a thin skin, abundant juice, a sharp tang and a distinctive aroma that sets it apart from other citrus. It is Al-Ahsa’s second crop after dates: the oasis grows more than 100,000 fruiting lomi trees, each yielding some 25-30 kilograms a season.',
          'A cherished summer tradition surrounds it: families gather to juice and preserve it for the whole year — fresh, as juice, or dried for Hasawi and Gulf cooking.',
        ],
      },
      {
        // dated: this edition's fees only — the section drops automatically once it ends
        h: 'Tickets & entry', dated: true,
        ps: [
          'According to the official booking page on Evento: entry is SAR 10 from Sunday to Wednesday and SAR 15 from Thursday to Saturday (online purchase), with a SAR 5 service fee added to every ticket bought at the on-site box office — so booking online is cheaper.',
          'Entry is free for children under 5. A ticket covers exhibition entry only, is valid solely for the day stated on it, and tickets are sold exclusively through Evento.',
        ],
      },
    ],
    faq: [
      // dated entries belong to this edition (its dates, fees and booking) and drop when it ends
      { q: 'When is the Hasawi Lomi Exhibition 2026?', a: 'From 19 August to 13 September 2026 after the extension, daily from 5:00 to 11:00 PM.', dated: true },
      { q: 'Where is the exhibition held?', a: 'At the Al-Ahsa Expo Center on Al-Salam Street (Ain Najm Road) in Hofuf — the map is on this page.' },
      { q: 'Is entry free?', a: 'Entry is free only for children under 5. Tickets are SAR 10 from Sunday to Wednesday and SAR 15 from Thursday to Saturday online, with SAR 5 added at the box office.', dated: true },
      { q: 'How do I book tickets?', a: 'Exclusively through the Evento platform — the "Book your ticket" button on this page takes you to the official booking page.', dated: true },
      { q: 'How does the Hasawi lomi differ from a regular lemon?', a: 'It is smaller, thinner-skinned, juicier and more aromatic, and is used fresh, as juice, and dried in Hasawi cooking.' },
      { q: 'Are there activities for children?', a: 'Yes — the exhibition has a kids’ corner, alongside live cooking, agricultural workshops and family sessions.' },
    ],
    related: [
      { label: 'The Hasawi lomi on our Fruits of Al-Ahsa page', href: '/en/fruits/' },
      { label: 'Plan your trip to Al-Ahsa', href: '/en/plan-your-trip/' },
    ],
    acts: ['Lomi (dried lime) product shows', 'Live cooking', 'Agricultural workshops', 'Kids’ corner', 'Family sessions'],
  },
  'uqair-winter': {
    slug: 'al-uqair-winter',
    name: 'Al-Uqair Winter', place: 'Al-Uqair Beach Park',
    season: 'Winter', time: 'December – February', span: 'Several weeks',
    org: 'Al-Ahsa Development Authority, Al-Ahsa Municipality',
    acts: ['Family sea & sports activities', 'Art & craft workshops', 'Fun games'],
  },
  'wafrah-winter': {
    slug: 'al-wafrah-winter',
    name: 'Al-Wafrah Winter', place: 'Al-Wafrah district, south Hofuf',
    season: 'Winter', time: 'From around November', span: 'An extended winter season',
    org: 'Private operators under Al-Ahsa Municipality supervision',
    acts: ['150+ food trucks', 'Hasawi folk dishes', 'Open-air winter gatherings'],
  },
  'horse-racing': {
    slug: 'horse-racing-season',
    name: 'Horse Racing Season', place: 'Al-Ahsa Equestrian Arena, Al-Taraf',
    season: 'Winter', time: 'November – February', span: 'An extended season',
    org: 'Al-Ahsa Equestrian Arena',
    acts: ['Horse races', 'Equestrian events'],
  },
  'creative-ahsa': {
    slug: 'creative-alahsa-festival',
    name: 'Creative Al-Ahsa Festival', place: 'Heritage Freej, the Municipality Fort',
    season: 'Spring', time: 'March – April', span: 'About a week',
    org: 'Al-Ahsa Municipality',
    acts: ['Pottery making', 'Palm-frond crafts', 'Traditional carpentry', 'Fine arts', 'Folk performances'],
  },
};

// النسخة الصينية — خط zh-translation-pipeline حصراً (دفعة events 2026-09-02،
// الحاكم 94/100 بعد القارئ الأعمى). المقاطع slug تشارك الإنجليزية (سابقة صفحات
// المعالم الصينية)، والأسماء من termbase (أسماء الفعاليات السبعة مثبتة من بطاقات
// المواسم). أعلام dated كما في العربية — عليها تقوم آلية evView/EventEdition.
const TEXT_ZH: EventTexts = {
  bisht: {
    slug: 'hasawi-bisht-festival',
    name: '哈萨比什特长袍节', place: '胡富夫历史悠久的易卜拉欣宫',
    season: '冬季', time: '12 月前后', span: '为期数天',
    org: '沙特遗产委员会（文化部）',
    acts: ['比什特长袍展', '织造技艺工作坊', '互动比什特市集', '民俗表演'],
  },
  'qaisariyah-nights': {
    slug: 'qaisariyah-nights',
    name: '凯萨利亚市集之夜', place: '胡富夫历史悠久的凯萨利亚市集',
    season: '冬末', time: '2 月至 3 月', span: '为期数周',
    org: '哈萨市政局、哈萨发展管理局、沙特遗产委员会',
    acts: ['民间艺术表演', '社区聚会', '传统游戏', '手工艺工作坊'],
  },
  'kafu-nights': {
    slug: 'kafu-nights',
    name: '卡夫之夜', place: '胡富夫阿卜杜拉国王环境公园',
    season: '斋月（拉马丹）', time: '斋月期间', span: '贯穿斋月（夜间举行）',
    org: '费萨尔国王大学',
    acts: ['戏剧演出', '儿童乐园', '卡夫互动厨房', '“盖布加”晚宴（斋月夜间聚餐）'],
  },
  'dates-festival': {
    slug: 'processed-dates-festival',
    name: '椰枣制品节', place: '胡富夫哈萨市政局城堡',
    season: '冬季', time: '1 月至 2 月', span: '为期数周',
    org: '哈萨市政局、哈萨发展管理局',
    acts: ['品鉴与选购展馆', '椰枣深加工产品展馆', '文化工作坊', '各类竞赛'],
  },
  'palm-village': {
    slug: 'palm-village',
    name: '椰枣村', place: '哈萨绿洲',
    season: '冬春两季', time: '1 月至 3 月', span: '持续整季',
    org: '沙特国家棕榈和椰枣中心',
    acts: ['椰枣专卖店', '本地餐厅与咖啡馆', '手工艺人展馆（棕榈叶编织）', '乡村产品市集'],
  },
  lomi: {
    slug: 'hasawi-lomi-exhibition',
    name: '哈萨青柠展', place: '胡富夫萨拉姆街（艾因奈杰姆路）哈萨会展中心',
    season: '夏季', time: '2026 年 8 月 19 日至 9 月 13 日', span: '约 26 天',
    after: {
      time: '8 月至 9 月前后', span: '为期数周',
      seoTitle: '哈萨青柠展：举办时节、地点与亮点',
      seoDesc: '胡富夫哈萨青柠展指南：每年 8 月至 9 月前后举办——下一届的具体日期，请关注哈萨商会官方公告。',
    },
    org: '哈萨商会',
    hours: '每日 17:00 至 23:00',
    seoTitle: '2026 年哈萨青柠展：日期、门票与地点',
    seoDesc: '2026 年胡富夫哈萨青柠展指南：延期后展期为 8 月 19 日至 9 月 13 日，每日 17:00 至 23:00，门票 10 沙特里亚尔起，通过 Evento 平台购票。',
    intro: '哈萨青柠展（Hasawi Lomi Exhibition）——民间也俗称哈萨柠檬展——由哈萨商会主办，是哈萨最具代表性的季节性农业盛会，为礼赞这片绿洲中名气仅次于椰枣的招牌物产而设。展会主打互动体验：您可以了解哈萨青柠的特色、益处与种植技艺，与果农面对面交流，选购本地家庭工坊的自制产品，并参与丰富多彩的配套活动。',
    sections: [
      {
        h: '什么是哈萨青柠？',
        ps: [
          '哈萨青柠（本地品种名 Bin Zuhairi）果实小巧，色泽深绿，皮薄汁多，酸味强劲，香气馥郁独特，在众多柑橘类水果中自成一格。它是哈萨仅次于椰枣的第二大农产品：绿洲里生长着 10 万余棵挂果的青柠树，每棵每季可产 25 至 30 公斤。',
          '围绕这种果实，还流传着一项地道的哈萨夏日习俗：家家户户齐聚一堂，榨汁封存，或制成晒制青柠干（当地称“贾米德”，jameed），以备全年取用——无论鲜食、榨汁还是晒干入馔，都是哈萨与海湾菜肴中不可或缺的风味。',
        ],
      },
      {
        h: '门票与入场', dated: true,
        ps: [
          '据 Evento 平台官方购票页面显示：周日至周三门票为 10 沙特里亚尔（SAR），周四至周六为 15 里亚尔（均为线上购票价）；在现场售票窗口购票，每张另加收 5 里亚尔服务与运营费——提前在线预订更划算。',
          '5 岁以下儿童免费入场。门票仅作入场之用，且只在票面所载当日有效，一律通过 Evento 平台发售。',
        ],
      },
    ],
    faq: [
      { q: '2026 年哈萨青柠展何时举行？', a: '展期延长后，为 2026 年 8 月 19 日至 9 月 13 日，每日 17:00 至 23:00。', dated: true },
      { q: '展会在哪里举办？', a: '位于胡富夫萨拉姆街（艾因奈杰姆路）的哈萨会展中心——本页附有地图。' },
      { q: '入场是否免费？', a: '仅 5 岁以下儿童免费入场。线上购票周日至周三 10 里亚尔、周四至周六 15 里亚尔；现场窗口购票每张另加 5 里亚尔。', dated: true },
      { q: '如何预订门票？', a: '一律通过 Evento 平台购票——点击本页上方“预订门票”按钮，即可进入官方购票页面。', dated: true },
      { q: '哈萨青柠与普通柠檬有何不同？', a: '哈萨青柠果形更小、皮更薄、汁水更足、香气更浓，在哈萨菜肴中可鲜食、榨汁或晒干使用。' },
      { q: '有适合儿童的活动吗？', a: '有——展会设有儿童天地，还有现场烹饪、农业工作坊和亲子家庭活动。' },
    ],
    related: [
      { label: '“哈萨时令水果”页面上的哈萨青柠', href: '/zh/fruits/' },
      { label: '规划您的哈萨之旅', href: '/zh/plan-your-trip/' },
    ],
    acts: ['青柠产品展销', '现场烹饪', '农业工作坊', '儿童天地', '家庭亲子活动'],
  },
  'uqair-winter': {
    slug: 'al-uqair-winter',
    name: '乌盖尔之冬', place: '乌盖尔海滩公园',
    season: '冬季', time: '12 月至次年 2 月', span: '为期数周',
    org: '哈萨发展管理局、哈萨市政局',
    acts: ['亲子海滨与运动活动', '艺术手工工作坊', '趣味游乐项目'],
  },
  'wafrah-winter': {
    slug: 'al-wafrah-winter',
    name: '瓦夫拉之冬', place: '胡富夫以南的瓦夫拉区',
    season: '冬季', time: '一般自 11 月起', span: '贯穿整个冬季',
    org: '私营商家与投资者（哈萨市政局监管）',
    acts: ['150 余辆美食餐车', '哈萨风味民间小吃', '露天冬日聚会'],
  },
  'horse-racing': {
    slug: 'horse-racing-season',
    name: '赛马季', place: '塔拉夫（Al-Taraf）哈萨马术赛场',
    season: '冬季', time: '11 月至次年 2 月', span: '持续整季',
    org: '哈萨马术赛场',
    acts: ['赛马赛事', '马术活动'],
  },
  'creative-ahsa': {
    slug: 'creative-alahsa-festival',
    name: '创意哈萨节', place: '“弗里季”传统街区（哈萨市政局城堡）',
    season: '春季', time: '3 月至 4 月', span: '约一周',
    org: '哈萨市政局',
    acts: ['陶艺制作', '棕榈叶编织', '传统木工', '造型艺术', '民俗表演'],
  },
};

// ── الدمج: Ev واحدة لكل فعالية ولغة — الشكل نفسه الذي يقرؤه كل مستهلك ─────────
function merge(id: EventId, text: EvTextBase & { after?: AfterText }): Ev {
  const m: EventMeta = EVENT_META[id];
  const { after, ...t } = text;
  if (m.status === 'confirmed') {
    // afterStatus حقل مصدرٍ لا يخرج في Ev — يذوب في after.status
    const { afterStatus, ...meta } = m;
    return { id, ...t, ...meta, after: { ...after!, status: afterStatus } };
  }
  return { id, ...t, ...m };
}

export const EVENTS_AR: Ev[] = EVENT_IDS.map((id) => merge(id, TEXT_AR[id]));
export const EVENTS_EN: Ev[] = EVENT_IDS.map((id) => merge(id, TEXT_EN[id]));
export const EVENTS_ZH: Ev[] = EVENT_IDS.map((id) => merge(id, TEXT_ZH[id]));

/** فعاليات لغة الصفحة */
export const eventsFor = (lang: Lang): Ev[] =>
  lang === 'ar' ? EVENTS_AR : lang === 'zh' ? EVENTS_ZH : EVENTS_EN;

/** نظير الفعالية باللغة الأخرى — لبناء رابط تبديل اللغة على الصفحة التفصيلية */
export const counterpart = (id: string, lang: Lang): Ev | undefined =>
  (lang === 'ar' ? EVENTS_EN : EVENTS_AR).find((e) => e.id === id);

/** روابط الفعالية بلغاتها الثلاث — مصدر alt (hreflang ومبدّل اللغة) لصفحاتها المفردة.
 *  النسخة الصينية كاملة (الفعاليات العشر) فتُدرج zh دائماً. */
export const eventAlt = (id: string): { ar: string; en: string; zh: string } => ({
  ar: `/فعاليات/${EVENTS_AR.find((e) => e.id === id)!.slug}/`,
  en: `/en/events/${EVENTS_EN.find((e) => e.id === id)!.slug}/`,
  zh: `/zh/events/${EVENTS_ZH.find((e) => e.id === id)!.slug}/`,
});
