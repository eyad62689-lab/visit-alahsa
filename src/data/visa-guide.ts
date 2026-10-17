// محتوى صفحة «دليل التأشيرات» بلغتيها — المصدر الوحيد لنصّها (2026-10-16).
//
// قرار إياد: دليل مختصر يرشد الزائر إلى مسار التأشيرة المناسب ثم يحيله إلى المنصة الرسمية.
// كل معلومة تنظيمية هنا كانت في الصفحة السابقة (src/data/visa-guide.md، حُذف) مؤكدةً بمصدر
// رسمي بلا علامة «لم يُتحقَّق» وبلا تعارض بين منصتين؛ وما سواها حُذف صامتاً: الرسوم كلها،
// وأرقام الدول، ومدد القرار، وسياسات الاسترداد، وتواريخ موسم حج بعينه، وأحكام المنافذ
// البرية. لا تُضاف هنا معلومة تنظيمية جديدة بلا مصدر، ولا تُعدَّل اعتماداً على الذاكرة.
// الروابط الرسمية من VISA_OFFICIAL_LINKS وحدها (الحارس C28 يرفض سواها).
// الإنجليزية كُتبت مباشرةً كصفحة «عن زوروا الأحساء»؛ zh/de/ru/ur عبر خطوط الترجمة فقط.
import { VISA_OFFICIAL_LINKS as L, VISA_UPDATED_LINE } from '../lib/visa-guide.mjs';
import type { Lang } from '../i18n/ui';
import { VISA_ZH } from './visa-guide.zh';
import { VISA_RU } from './visa-guide.ru';
import { VISA_DE } from './visa-guide.de';
import { VISA_UR } from './visa-guide.ur';
// @visa-lang-imports — تُدرج هنا سجلّات اللغات المعتمدة من خطوط الترجمة (tools/translation/apply-visa-guide.mjs)

/** لغات الصفحة المبنية — تتبع VISA_LANGS في src/lib/visa-guide.mjs */
export type VisaLang = Lang;

/** نصّ غنيّ: سلاسل ووصلات. الوصلة الخارجية تُفتح في نافذة جديدة. */
export type Part = string | { t: string; href: string };
export type Rich = Part[];

export type VisaRoute = {
  id: string;
  h: string;
  /** «لمن هذه التأشيرة؟» — بتسمية حين يكون القسم كاملاً، وبلا تسمية في الأقسام القصيرة */
  who: { label?: string; text: string };
  validity?: { label: string; text: string };
  cta: { label: string; href: string };
};

export type VisaGuideContent = {
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  feesLine: string;
  verifyLine: string;
  updatedLine: string;
  intro: { h: string; parts: Rich };
  table: { h: string; caption: string; head: [string, string, string, string]; rows: [string, string, string, string][] };
  routes: VisaRoute[];
  arrive: { h: string; air: Rich; land: Rich; more: Rich };
  next: { h: string; items: { label: string; parts: Rich }[] };
  faq: { h: string; items: { q: string; a: string }[] };
  links: { h: string; head: [string, string, string]; rows: { route: string; href: string; org: string }[] };
};

const ORG = {
  ar: { tourism: 'وزارة السياحة', mofa: 'وزارة الخارجية', hajj: 'وزارة الحج والعمرة', kfca: 'المؤسسة العامة لجسر الملك فهد' },
  en: { tourism: 'Ministry of Tourism', mofa: 'Ministry of Foreign Affairs', hajj: 'Ministry of Hajj and Umrah', kfca: 'King Fahd Causeway Authority' },
} as const;

const AR: VisaGuideContent = {
  seo: {
    title: 'تأشيرة زيارة السعودية لرحلة الأحساء: اختر مسارك',
    description: 'اختر تأشيرة زيارة السعودية المناسبة لرحلتك إلى الأحساء في دقائق: 8 مسارات، لمن كل مسار، صلاحيته، ورابط التقديم الرسمي. ابدأ التخطيط لرحلتك الآن.',
  },
  h1: 'تأشيرة زيارة السعودية: دليلك المختصر لرحلة الأحساء',
  lead: 'تبدأ رحلتك إلى الأحساء بخطوة واحدة: تأشيرة زيارة السعودية المناسبة لك. يجمع هذا الدليل مسارات التأشيرة الثمانية في صفحة واحدة، ويخبرك بإيجاز لمن كل مسار، وكم تدوم تأشيرته، وأين تقدّم عليها. ثم يسلّمك إلى منصة الجهة الحكومية لتكمل طلبك هناك.',
  feesLine: 'تُعرض الرسوم عند التقديم في المنصة الرسمية.',
  verifyLine: 'تحقّق من المصدر الرسمي قبل التقديم، فالشروط قد تتغيّر.',
  updatedLine: VISA_UPDATED_LINE.ar,
  intro: {
    h: 'ما الذي ينتظرك في الأحساء؟',
    parts: [
      'واحة الأحساء مسجّلة في قائمة التراث العالمي لليونسكو، وفيها جبل القارة وقصر إبراهيم وسوق القيصرية وعيون الواحة ونخيلها. تصفّح ',
      { t: 'معالم الأحساء', href: '/معالم/' }, '، واطّلع على ', { t: 'الفعاليات', href: '/فعاليات/' },
      ' القريبة من موعد رحلتك، واختر ', { t: 'مكان إقامتك', href: '/إقامة/' }, '، ثم ', { t: 'خطّط لرحلتك', href: '/خطط/' },
      ' بالتفاصيل. وإن كنت تبحث عن تأشيرة سياحية للأحساء تحديداً، فالأحساء مدينة سعودية، وتأشيرة زيارة السعودية هي ما تحتاجه.',
    ],
  },
  table: {
    h: 'اختر مسارك',
    caption: 'مسارات تأشيرة زيارة السعودية الثمانية في لمحة',
    head: ['المسار', 'لمن؟', 'الصلاحية ومدة الإقامة', 'المنصة الرسمية'],
    rows: [
      ['التأشيرة السياحية الإلكترونية', 'مواطنو الدول المؤهلة، وحاملو تأشيرات شنغن أو الولايات المتحدة أو المملكة المتحدة، والمقيمون الدائمون فيها، والمقيمون في دول المجلس', 'سنة، دخول متعدد، إقامة حتى 3 أشهر', 'visa.visitsaudi.com'],
      ['المقيمون في دول المجلس', 'حاملو إقامة خليجية سارية 3 أشهر على الأقل', 'سنة وإقامة 90 يوماً (متعدد)، أو 90 يوماً (دخول واحد)', 'ksavisa.sa'],
      ['العمرة عبر نُسك', 'الراغبون في العمرة', '365 يوماً، دخول متعدد، إقامة تراكمية حتى 90 يوماً', 'umrah.nusuk.sa'],
      ['المرور (التوقف)', 'مسافرو الخطوط السعودية أو طيران ناس بتوقف في المملكة', 'إقامة حتى 96 ساعة', 'أثناء حجز الرحلة'],
      ['الزيارة العائلية والشخصية', 'من يدعوه مواطن أو مقيم', 'تُحدَّد عند التقديم', 'visa.mofa.gov.sa'],
      ['زيارة الأعمال', 'من تدعوه جهة عمل في المملكة', 'تُحدَّد عند التقديم', 'ksavisa.sa'],
      ['تأشيرة الباقة', 'حاملو جوازات الهند وباكستان وبنغلاديش وإندونيسيا ومصر والأردن والمكسيك', 'تُحدَّد عند التقديم', 'مقدمو خدمات معتمدون'],
      ['تصريح السفر الإلكتروني', 'مواطنو المملكة المتحدة', 'زيارات متعددة خلال سنتين', 'ksavisa.sa'],
    ],
  },
  routes: [
    {
      id: 'tourist', h: 'التأشيرة السياحية الإلكترونية للسعودية: لمن هي؟',
      who: { label: 'لمن هذه التأشيرة؟', text: 'لمواطني الدول المؤهلة المدرجة في المنصة، ولحاملي تأشيرات زيارة سارية من شنغن أو الولايات المتحدة أو المملكة المتحدة، وللمقيمين الدائمين في الولايات المتحدة أو الاتحاد الأوروبي أو المملكة المتحدة، وللمقيمين في دول مجلس التعاون الخليجي. تصلح للسياحة وحضور الفعاليات وزيارة الأقارب والعمرة، ولا تصلح للحج ولا للعمل ولا للدراسة.' },
      validity: { label: 'الصلاحية ومدة الإقامة:', text: 'سنة من تاريخ الإصدار، بدخول متعدد، ومدة الإقامة حتى 3 أشهر.' },
      cta: { label: 'قدّم عبر المنصة الرسمية', href: L.tourist },
    },
    {
      id: 'gcc', h: 'زيارة الأحساء للمقيمين في دول الخليج',
      who: { label: 'لمن هذه التأشيرة؟', text: 'للمقيمين في إحدى دول مجلس التعاون بإقامة سارية 3 أشهر على الأقل.' },
      validity: { label: 'الصلاحية ومدة الإقامة:', text: 'خياران: دخول متعدد بصلاحية سنة وإقامة 90 يوماً، أو دخول واحد بصلاحية 90 يوماً وإقامة 90 يوماً.' },
      cta: { label: 'قدّم عبر المنصة الرسمية', href: L.gcc },
    },
    {
      id: 'umrah', h: 'تأشيرة العمرة عبر نُسك',
      who: { label: 'لمن هذه التأشيرة؟', text: 'للراغبين في أداء العمرة عبر باقات مقدمي الخدمات المعتمدين. وتتيح نُسك باقات دون تأشيرة لمواطني دول المجلس والمقيمين فيها وحاملي جميع أنواع التأشيرات.' },
      validity: { label: 'الصلاحية ومدة الإقامة:', text: '365 يوماً من تاريخ الإصدار، بدخول متعدد، وإقامة تراكمية حتى 90 يوماً.' },
      cta: { label: 'قدّم عبر المنصة الرسمية', href: L.umrah },
    },
    {
      id: 'stopover', h: 'تأشيرة المرور (التوقف) لمن لديه ترانزيت في السعودية',
      who: { label: 'لمن هذه التأشيرة؟', text: 'لمن يحجز رحلة مع الخطوط السعودية أو طيران ناس تتضمن توقفاً في المملكة، وتُطلب أثناء حجز الرحلة.' },
      validity: { label: 'مدة الإقامة:', text: 'حتى 96 ساعة.' },
      cta: { label: 'اطلع على التفاصيل في الصفحة الرسمية', href: L.stopover },
    },
    {
      id: 'family', h: 'تأشيرة الزيارة العائلية والشخصية',
      who: { label: 'لمن هذه التأشيرة؟', text: 'لمن يدعوه مواطن أو مقيم في المملكة. الزيارة العائلية للأقارب: أقارب الدرجة الأولى لمواطني دول المجلس (الوالدان والزوجة والأبناء)، وأقارب المقيمين. والزيارة الشخصية لمن لا تربطه بالداعي قرابة ولا علاقة تجارية. يبدأ الداعي الطلب إلكترونياً في منصة وزارة الخارجية.' },
      cta: { label: 'قدّم عبر المنصة الرسمية', href: L.family },
    },
    {
      id: 'business', h: 'تأشيرة زيارة الأعمال',
      who: { text: 'لمن تدعوه شركة أو مؤسسة في المملكة تربطه بها علاقة عمل. تبدأ الجهة الداعية الطلب، ثم يُستكمل عبر منصة وزارة الخارجية.' },
      cta: { label: 'قدّم عبر المنصة الرسمية', href: L.business },
    },
    {
      id: 'package', h: 'تأشيرة الباقة (مرحلة تجريبية)',
      who: { text: 'لحاملي جوازات الهند وباكستان وبنغلاديش وإندونيسيا ومصر والأردن والمكسيك، عبر باقة طيران وإقامة من مقدم خدمات معتمد.' },
      cta: { label: 'اطلع على التفاصيل في الصفحة الرسمية', href: L.package },
    },
    {
      id: 'uk', h: 'تصريح السفر الإلكتروني لمواطني المملكة المتحدة',
      who: { text: 'لمواطني المملكة المتحدة، بطلب مستقل لكل شخص بمن فيهم الأطفال. يتيح زيارات متعددة خلال سنتين.' },
      cta: { label: 'قدّم عبر المنصة الرسمية', href: L.uk },
    },
  ],
  arrive: {
    h: 'كيف تصل إلى الأحساء بعد التأشيرة؟',
    air: ['جواً: عبر مطار الأحساء الدولي، أو مطار الملك فهد الدولي بالدمام ومنه بالسيارة أو القطار.'],
    land: [
      'براً من البحرين: عبر جسر الملك فهد. تحقّق من شروط الدخول عبر الجسر قبل السفر في موقع ',
      { t: 'المؤسسة العامة لجسر الملك فهد', href: L.causeway }, '، ومن شروط الدخول عبر كل منفذ في ',
      { t: 'مركز مساعدة روح السعودية', href: L.helpCenter }, '.',
    ],
    more: ['تفاصيل الوصول بالقطار والسيارة والمسافات من الرياض والدمام في ', { t: 'كيف تصل؟', href: '/خطط/#getting-there' }, '.'],
  },
  next: {
    h: 'خطواتك بعد التأشيرة',
    items: [
      { label: 'كيف تصل:', parts: [{ t: 'الطرق والمطارات والقطار', href: '/خطط/#getting-there' }, '.'] },
      { label: 'أين تقيم:', parts: [{ t: 'أماكن الإقامة في الأحساء', href: '/إقامة/' }, '.'] },
      { label: 'متى تزور:', parts: [{ t: 'أفضل موسم للزيارة', href: '/خطط/#practical' }, '.'] },
      { label: 'ماذا تزور:', parts: [{ t: 'المعالم', href: '/معالم/' }, ' و', { t: 'الفعاليات', href: '/فعاليات/' }, ' و', { t: 'الخريطة التفاعلية', href: '/خريطة/' }, '.'] },
      { label: 'اجمع وجهاتك:', parts: ['احفظ ما يعجبك في ', { t: 'معالمي المحفوظة', href: '/رحلتي/' }, ' واحصل على مسار جاهز.'] },
    ],
  },
  faq: {
    h: 'الأسئلة الشائعة عن تأشيرة زيارة السعودية',
    items: [
      { q: 'كم مدة التأشيرة السياحية الإلكترونية للسعودية؟', a: 'صالحة سنة من تاريخ الإصدار بدخول متعدد، ومدة الإقامة في كل زيارة حتى 3 أشهر.' },
      { q: 'هل يمكن تمديد التأشيرة السياحية الإلكترونية؟', a: 'لا. وإذا انتهت صلاحيتها قبل دخولك المملكة، فيلزم تقديم طلب جديد.' },
      { q: 'هل يحتاج المقيم في دول الخليج إلى تأشيرة لزيارة الأحساء؟', a: 'نعم. المقيمون في دول مجلس التعاون مؤهلون للمسار السياحي، ويقدّمون عبر منصة وزارة الخارجية.' },
      { q: 'هل يمكن أداء العمرة بالتأشيرة السياحية؟', a: 'نعم، والعمرة من الأنشطة المسموح بها في التأشيرة السياحية الإلكترونية، باستثناء الحج.' },
      { q: 'هل يمكن العمل بالتأشيرة السياحية؟', a: 'لا. التأشيرة السياحية للسياحة والعمرة وزيارة الأقارب، ولا تصلح للعمل ولا للدراسة.' },
      { q: 'كيف أدعو قريبي لزيارتي في الأحساء؟', a: 'يبدأ الداعي الطلب إلكترونياً عبر منصة التأشيرات لوزارة الخارجية، ويجب أن تربطه بالضيف قرابة.' },
      { q: 'لدي توقف في السعودية، هل يمكنني الخروج من المطار؟', a: 'نعم. يمكن لمسافري الخطوط السعودية أو طيران ناس الحصول على تأشيرة توقف أثناء حجز الرحلة، للإقامة حتى 96 ساعة.' },
    ],
  },
  links: {
    h: 'الروابط الرسمية',
    head: ['المسار', 'الرابط', 'الجهة'],
    rows: [
      { route: 'التأشيرة السياحية الإلكترونية', href: L.tourist, org: ORG.ar.tourism },
      { route: 'المقيمون في دول المجلس', href: L.gcc, org: ORG.ar.mofa },
      { route: 'العمرة عبر نُسك', href: L.umrah, org: ORG.ar.hajj },
      { route: 'المرور (التوقف)', href: L.stopover, org: ORG.ar.tourism },
      { route: 'الزيارة العائلية والشخصية', href: L.family, org: ORG.ar.mofa },
      { route: 'زيارة الأعمال', href: L.business, org: ORG.ar.mofa },
      { route: 'تأشيرة الباقة', href: L.package, org: ORG.ar.tourism },
      { route: 'تصريح السفر الإلكتروني', href: L.uk, org: ORG.ar.mofa },
      { route: 'جسر الملك فهد', href: L.causeway, org: ORG.ar.kfca },
    ],
  },
};

const EN: VisaGuideContent = {
  seo: {
    title: 'Saudi Visit Visa for Al-Ahsa: Choose Your Route',
    description: 'Choose the right Saudi visit visa for your Al-Ahsa trip in minutes: 8 routes, who each is for, its validity, and the official link to apply. Start planning now.',
  },
  h1: 'Saudi Visit Visa: A Short Guide for Your Al-Ahsa Trip',
  lead: 'Your trip to Al-Ahsa starts with one step: the Saudi visit visa that fits you. This guide brings the eight visa routes together on one page and tells you briefly who each route is for, how long its visa lasts, and where to apply. It then hands you over to the government platform to complete your application there.',
  feesLine: 'Fees are shown when you apply on the official platform.',
  verifyLine: 'Check the official source before applying, as conditions may change.',
  updatedLine: VISA_UPDATED_LINE.en,
  intro: {
    h: 'What awaits you in Al-Ahsa?',
    parts: [
      'Al-Ahsa Oasis is inscribed on the UNESCO World Heritage List, and is home to Jabal Al-Qarah, Qasr Ibrahim, Al-Qaisariyah Souq, the oasis springs and its palms. Browse ',
      { t: "Al-Ahsa's attractions", href: '/en/attractions/' }, ', check the ', { t: 'events', href: '/en/events/' },
      ' close to your travel dates, choose ', { t: 'where to stay', href: '/en/stay/' }, ', then ', { t: 'plan your trip', href: '/en/plan-your-trip/' },
      ' in detail. If you are looking for a tourist visa for Al-Ahsa specifically, Al-Ahsa is a Saudi city, and a Saudi visit visa is what you need.',
    ],
  },
  table: {
    h: 'Choose your route',
    caption: 'The eight Saudi visit visa routes at a glance',
    head: ['Route', 'Who is it for?', 'Validity and length of stay', 'Official platform'],
    rows: [
      ['Tourist eVisa', 'Citizens of eligible countries, holders of Schengen, US or UK visas, permanent residents there, and GCC residents', '1 year, multiple entry, stay up to 3 months', 'visa.visitsaudi.com'],
      ['GCC residents', 'Holders of a GCC residency valid for at least 3 months', '1 year with a 90-day stay (multiple entry), or 90 days (single entry)', 'ksavisa.sa'],
      ['Umrah via Nusuk', 'Those wishing to perform Umrah', '365 days, multiple entry, cumulative stay up to 90 days', 'umrah.nusuk.sa'],
      ['Stopover (transit)', 'Saudia or flynas passengers with a stopover in the Kingdom', 'Stay up to 96 hours', 'During flight booking'],
      ['Family and personal visit', 'Those invited by a citizen or resident', 'Set when you apply', 'visa.mofa.gov.sa'],
      ['Business visit', 'Those invited by an employer in the Kingdom', 'Set when you apply', 'ksavisa.sa'],
      ['Package visa', 'Passport holders of India, Pakistan, Bangladesh, Indonesia, Egypt, Jordan and Mexico', 'Set when you apply', 'Licensed service providers'],
      ['Electronic Travel Authorisation', 'UK citizens', 'Multiple visits over 2 years', 'ksavisa.sa'],
    ],
  },
  routes: [
    {
      id: 'tourist', h: 'Saudi tourist eVisa: who is it for?',
      who: { label: 'Who is this visa for?', text: 'Citizens of the eligible countries listed on the platform; holders of a valid Schengen, US or UK visit visa; permanent residents of the US, the EU or the UK; and residents of GCC countries. It covers tourism, attending events, visiting relatives and Umrah. It does not cover Hajj, work or study.' },
      validity: { label: 'Validity and length of stay:', text: 'One year from the date of issue, multiple entry, with a stay of up to 3 months.' },
      cta: { label: 'Apply on the official platform', href: L.tourist },
    },
    {
      id: 'gcc', h: 'Visiting Al-Ahsa as a GCC resident',
      who: { label: 'Who is this visa for?', text: 'Residents of a GCC country holding a residency valid for at least 3 months.' },
      validity: { label: 'Validity and length of stay:', text: 'Two options: multiple entry valid for one year with a 90-day stay, or single entry valid for 90 days with a 90-day stay.' },
      cta: { label: 'Apply on the official platform', href: L.gcc },
    },
    {
      id: 'umrah', h: 'Umrah visa via Nusuk',
      who: { label: 'Who is this visa for?', text: 'Those wishing to perform Umrah through packages from licensed service providers. Nusuk also offers visa-free packages for GCC citizens and residents and for holders of all visa types.' },
      validity: { label: 'Validity and length of stay:', text: '365 days from the date of issue, multiple entry, with a cumulative stay of up to 90 days.' },
      cta: { label: 'Apply on the official platform', href: L.umrah },
    },
    {
      id: 'stopover', h: 'Stopover (transit) visa for a layover in Saudi Arabia',
      who: { label: 'Who is this visa for?', text: 'Passengers booking a Saudia or flynas flight that includes a stopover in the Kingdom. It is requested during flight booking.' },
      validity: { label: 'Length of stay:', text: 'Up to 96 hours.' },
      cta: { label: 'See the details on the official page', href: L.stopover },
    },
    {
      id: 'family', h: 'Family and personal visit visa',
      who: { label: 'Who is this visa for?', text: 'Those invited by a Saudi citizen or resident. The family visit is for relatives: first-degree relatives of GCC citizens (parents, spouse and children), and relatives of residents. The personal visit is for those with no family or business relationship to the host. The host starts the application online on the Ministry of Foreign Affairs platform.' },
      cta: { label: 'Apply on the official platform', href: L.family },
    },
    {
      id: 'business', h: 'Business visit visa',
      who: { text: 'For those invited by a company or organisation in the Kingdom with which they have a business relationship. The inviting organisation starts the application, which is then completed on the Ministry of Foreign Affairs platform.' },
      cta: { label: 'Apply on the official platform', href: L.business },
    },
    {
      id: 'package', h: 'Package visa (pilot phase)',
      who: { text: 'For passport holders of India, Pakistan, Bangladesh, Indonesia, Egypt, Jordan and Mexico, through a flight and accommodation package from a licensed service provider.' },
      cta: { label: 'See the details on the official page', href: L.package },
    },
    {
      id: 'uk', h: 'Electronic Travel Authorisation for UK citizens',
      who: { text: 'For UK citizens, with a separate application for each person, including children. It allows multiple visits over two years.' },
      cta: { label: 'Apply on the official platform', href: L.uk },
    },
  ],
  arrive: {
    h: 'How do you get to Al-Ahsa after your visa?',
    air: ['By air: via Al-Ahsa International Airport, or King Fahd International Airport in Dammam and onward by car or train.'],
    land: [
      'By land from Bahrain: via the King Fahd Causeway. Before travelling, check the entry conditions for the causeway on the ',
      { t: 'King Fahd Causeway Authority', href: L.causeway }, ' website, and the entry conditions for each border crossing at the ',
      { t: 'Visit Saudi help center', href: L.helpCenter }, '.',
    ],
    more: ['Details on arriving by train and car, and distances from Riyadh and Dammam, are in ', { t: 'How to get there', href: '/en/plan-your-trip/#getting-there' }, '.'],
  },
  next: {
    h: 'Your next steps after the visa',
    items: [
      { label: 'Getting there:', parts: [{ t: 'roads, airports and the train', href: '/en/plan-your-trip/#getting-there' }, '.'] },
      { label: 'Where to stay:', parts: [{ t: 'places to stay in Al-Ahsa', href: '/en/stay/' }, '.'] },
      { label: 'When to visit:', parts: [{ t: 'the best season to visit', href: '/en/plan-your-trip/#practical' }, '.'] },
      { label: 'What to see:', parts: [{ t: 'attractions', href: '/en/attractions/' }, ', ', { t: 'events', href: '/en/events/' }, ' and the ', { t: 'interactive map', href: '/en/map/' }, '.'] },
      { label: 'Collect your places:', parts: ['save what you like in ', { t: 'My saved places', href: '/en/plan/' }, ' and get a ready-made route.'] },
    ],
  },
  faq: {
    h: 'Frequently asked questions about the Saudi visit visa',
    items: [
      { q: 'How long is the Saudi tourist eVisa valid?', a: 'It is valid for one year from the date of issue with multiple entry, and each stay can last up to 3 months.' },
      { q: 'Can the tourist eVisa be extended?', a: 'No. If it expires before you enter the Kingdom, a new application is required.' },
      { q: 'Do GCC residents need a visa to visit Al-Ahsa?', a: 'Yes. Residents of GCC countries are eligible for the tourist route and apply through the Ministry of Foreign Affairs platform.' },
      { q: 'Can I perform Umrah on a tourist visa?', a: 'Yes. Umrah is among the activities permitted on the tourist eVisa, with the exception of Hajj.' },
      { q: 'Can I work on a tourist visa?', a: 'No. The tourist visa is for tourism, Umrah and visiting relatives. It does not permit work or study.' },
      { q: 'How do I invite a relative to visit me in Al-Ahsa?', a: 'The host starts the application online on the Ministry of Foreign Affairs visa platform, and must be related to the guest.' },
      { q: 'I have a stopover in Saudi Arabia. Can I leave the airport?', a: 'Yes. Saudia and flynas passengers can obtain a stopover visa during flight booking, for a stay of up to 96 hours.' },
    ],
  },
  links: {
    h: 'Official links',
    head: ['Route', 'Link', 'Authority'],
    rows: [
      { route: 'Tourist eVisa', href: L.tourist, org: ORG.en.tourism },
      { route: 'GCC residents', href: L.gcc, org: ORG.en.mofa },
      { route: 'Umrah via Nusuk', href: L.umrah, org: ORG.en.hajj },
      { route: 'Stopover (transit)', href: L.stopover, org: ORG.en.tourism },
      { route: 'Family and personal visit', href: L.family, org: ORG.en.mofa },
      { route: 'Business visit', href: L.business, org: ORG.en.mofa },
      { route: 'Package visa', href: L.package, org: ORG.en.tourism },
      { route: 'Electronic Travel Authorisation', href: L.uk, org: ORG.en.mofa },
      { route: 'King Fahd Causeway', href: L.causeway, org: ORG.en.kfca },
    ],
  },
};

export const VISA_GUIDE: Partial<Record<Lang, VisaGuideContent>> = {
  ar: AR,
  en: EN,
  zh: VISA_ZH,
  ru: VISA_RU,
  de: VISA_DE,
  ur: VISA_UR,
  // @visa-lang-registry
};
export const visaGuide = (lang: Lang): VisaGuideContent => {
  const c = VISA_GUIDE[lang];
  if (!c) throw new Error(`visa-guide: لا نصّ معتمداً بلغة ${lang} — لا تُبنى الصفحة قبل مرور نصّها بخط ترجمتها`);
  return c;
};
