// نصوص واجهة الرئيسية «الواحة تتكشّف» لكل لغة — مصدر واحد تقرؤه مكوّنات src/components/home.
// العربية والإنجليزية منقولتان كما اعتمدهما إياد (مواصفات الإصدار 2)، وكل لغة أخرى تُضاف هنا
// من خط ترجمتها حصراً ثم تُضمّ إلى HOME_LANGS. أوصاف الأماكن ليست هنا: تأتي من مجموعاتها.
import type { Lang } from '../i18n/ui';

export const HOME_LANGS = ['ar', 'en'] as const;
export type HomeLang = (typeof HOME_LANGS)[number];

type Pair = readonly [string, string];

export type HomeCopy = {
  /** عنوان الصفحة ووصفها واسما الوجهة والدولة في JSON-LD — منقولة من HomeView كما مرّت بخطوطها */
  seo: { title: string; description: string; place: string; country: string };
  /** سهم الروابط بحسب اتجاه الكتابة */
  arrow: string;
  paths: { attractions: string; map: string; plan: string; myTrip: string; trails: string };
  gate: { title: string; lead: string; begin: string; skip: string };
  rail: { label: string; items: readonly Pair[] };
  water: { title: string; lead: string; springsL: string; srcLabel: string; srcGuinness: string; srcMid: string; srcUnesco: string; srcEnd: string; link: string };
  qarah: { title: string; drag: string; timeLabel: string; times: readonly string[]; link: string };
  map: { title: string; lead: string; svgLabel: string; km: string; legend: string; empty: string; more: string; link: string };
  memory: { title: string; lead: string; track: string; link: string };
  plan: {
    title: string; lead: string; link: string;
    int: { legend: string; opts: readonly Pair[] };
    dur: { legend: string; opts: readonly Pair[] };
    com: { legend: string; opts: readonly Pair[] };
    L: { wait: string; title: string; days: readonly string[]; trail: string; place: string; saved: string };
  };
  finale: { title: string; lead: string; plan: string; open: string; replay: string };
  saved: { count: string; build: string };
};

export const HOME_COPY: Record<HomeLang, HomeCopy> = {
  ar: {
    seo: {
      title: 'زوروا الأحساء — دليلك السياحي لأكبر واحة في العالم',
      description: 'دليل سياحة الأحساء: جبل القارة وقصر إبراهيم وسوق القيصرية والعقير، مع خرائط ومسارات وفعاليات ومطاعم — واحة مسجلة في تراث اليونسكو العالمي.',
      place: 'الأحساء',
      country: 'المملكة العربية السعودية',
    },
    arrow: '←',
    paths: { attractions: '/معالم/', map: '/خريطة/', plan: '/خطط/', myTrip: '/رحلتي/', trails: '/trails/' },
    gate: {
      title: 'أكبر واحةٍ في العالم تتكشّف لك، فصلاً بعد فصل',
      lead: 'ماءٌ تحت الرمل، وجبلٌ تسكنه الكهوف، وأسواقٌ تعاقبت عليها الأجيال. مرّر لتبدأ الحكاية.',
      begin: 'ابدأ الحكاية',
      skip: 'انتقل إلى التخطيط',
    },
    rail: {
      label: 'فصول الصفحة',
      items: [['ch-gate', 'البوابة'], ['ch-water', 'الماء تحت الرمل'], ['ch-qarah', 'جبل القارة'], ['ch-map', 'الخريطة الحيّة'], ['ch-memory', 'ذاكرة الطين والسوق'], ['ch-plan', 'خطّط رحلتك'], ['ch-finale', 'الختام']],
    },
    water: {
      title: 'الماء تحت الرمل',
      lead: 'خزانٌ جوفيٌّ هائل يغذّي الواحة، فتخضرّ في قلب الصحراء.',
      springsL: 'عيناً ارتوازية تروي الواحة',
      srcLabel: 'المصادر: ',
      srcGuinness: 'موسوعة غينيس للأرقام القياسية، سجل «أكبر واحة»',
      srcMid: ' (النخيل والعيون)؛ وإحصاءات وزارة البيئة والمياه والزراعة (النخيل)؛ و',
      srcUnesco: 'قائمة التراث العالمي لليونسكو',
      srcEnd: ' (2018).',
      link: 'اكتشف معالم الطبيعة',
    },
    qarah: {
      title: 'جبل القارة: حرّك اليوم بيدك',
      drag: 'اسحب الشريط من الفجر إلى الغروب.',
      timeLabel: 'وقت اليوم',
      times: ['الفجر', 'الضحى', 'الأصيل', 'الغروب'],
      link: 'صفحة جبل القارة',
    },
    map: {
      title: 'اختر ما يناديك',
      lead: 'المعالم في مواضعها الحقيقية. المس معلماً لتراه، واحفظه لرحلتك.',
      svgLabel: 'خريطة تحريرية لمعالم الأحساء',
      km: '10 كم',
      legend: 'معالم الخريطة',
      empty: 'اختر معلماً من الخريطة لترى صورته ووصفه.',
      more: 'صفحة المعلم',
      link: 'الخريطة الكاملة',
    },
    memory: {
      title: 'ذاكرة الطين والسوق',
      lead: 'حصونٌ من طين، ومساجد من أوائل الإسلام، وأسواقٌ تعاقبت عليها الأجيال.',
      track: 'معالم التراث، تمرير أفقي',
      link: 'المعالم التراثية',
    },
    plan: {
      title: 'خطّط رحلتك في ثلاثة أسئلة',
      lead: 'أجب، فيظهر مسارك فوراً، ويدخل فيه ما حفظته من الخريطة.',
      link: 'دليل التخطيط الكامل',
      int: { legend: 'ما الذي يشدّك؟', opts: [['heritage', 'التراث والتاريخ'], ['nature', 'الطبيعة والماء'], ['markets', 'الأسواق والحِرف']] },
      dur: { legend: 'كم يوماً معك؟', opts: [['1', 'يوم'], ['2', 'يومان'], ['3', 'ثلاثة أيام']] },
      com: { legend: 'مع من تسافر؟', opts: [['family', 'العائلة'], ['friends', 'الأصدقاء'], ['solo', 'وحدي']] },
      L: { wait: 'أجب عن الأسئلة الثلاثة ليظهر مسارك هنا.', title: 'مسارك', days: ['اليوم الأول', 'اليوم الثاني', 'اليوم الثالث'], trail: 'مسار', place: 'معلم', saved: 'من محفوظاتك' },
    },
    finale: {
      title: 'الواحة بانتظارك',
      lead: 'من رمال الأصفر إلى ظلال النخيل، رحلتك تبدأ من هنا.',
      plan: 'خطّط زيارتك',
      open: 'افتح رحلتي',
      replay: 'أعِد الحكاية',
    },
    saved: { count: 'معالمي:', build: 'ابنِ رحلتي منها' },
  },
  en: {
    seo: {
      title: 'Visit Al-Ahsa — Travel Guide to the World’s Largest Oasis',
      description: 'Your guide to Al-Ahsa: Jabal Al-Qarah, Qasr Ibrahim, Qaisariyah Souq and Al-Uqair — maps, itineraries, events and dining in the UNESCO-listed oasis.',
      place: 'Al-Ahsa',
      country: 'Saudi Arabia',
    },
    arrow: '→',
    paths: { attractions: '/en/attractions/', map: '/en/map/', plan: '/en/plan-your-trip/', myTrip: '/en/plan/', trails: '/en/trails/' },
    gate: {
      title: 'The world’s largest oasis, unfolding chapter by chapter',
      lead: 'Water beneath the sand, a mountain of caves, and souqs passed down through generations. Scroll to begin.',
      begin: 'Begin the story',
      skip: 'Skip to planning',
    },
    rail: {
      label: 'Page chapters',
      items: [['ch-gate', 'The Gate'], ['ch-water', 'Water beneath the sand'], ['ch-qarah', 'Jabal Al-Qarah'], ['ch-map', 'The living map'], ['ch-memory', 'Memory of clay and souq'], ['ch-plan', 'Plan your trip'], ['ch-finale', 'Finale']],
    },
    water: {
      title: 'Water beneath the sand',
      lead: 'A vast underground aquifer feeds the oasis, keeping it green in the heart of the desert.',
      springsL: 'artesian springs water the oasis',
      srcLabel: 'Sources: ',
      srcGuinness: 'Guinness World Records, “Largest oasis”',
      srcMid: ' (palms and springs); Ministry of Environment, Water and Agriculture statistics (palms); ',
      srcUnesco: 'UNESCO World Heritage List',
      srcEnd: ' (2018).',
      link: 'Explore nature sites',
    },
    qarah: {
      title: 'Jabal Al-Qarah: move the day yourself',
      drag: 'Drag the slider from dawn to sunset.',
      timeLabel: 'Time of day',
      times: ['Dawn', 'Morning', 'Afternoon', 'Sunset'],
      link: 'Jabal Al-Qarah page',
    },
    map: {
      title: 'Choose what calls you',
      lead: 'Landmarks in their true positions. Tap one to see it, and save it for your trip.',
      svgLabel: 'Editorial map of Al-Ahsa landmarks',
      km: '10 km',
      legend: 'Map landmarks',
      empty: 'Pick a landmark on the map to see its photo and description.',
      more: 'Landmark page',
      link: 'Full map',
    },
    memory: {
      title: 'Memory of clay and souq',
      lead: 'Clay fortresses, some of Islam’s earliest mosques, and souqs passed down through generations.',
      track: 'Heritage landmarks, scroll sideways',
      link: 'Heritage sites',
    },
    plan: {
      title: 'Plan your trip in three questions',
      lead: 'Answer, and your route appears at once, with the places you saved from the map.',
      link: 'Full trip-planning guide',
      int: { legend: 'What draws you?', opts: [['heritage', 'Heritage & history'], ['nature', 'Nature & water'], ['markets', 'Souqs & crafts']] },
      dur: { legend: 'How many days do you have?', opts: [['1', 'One day'], ['2', 'Two days'], ['3', 'Three days']] },
      com: { legend: 'Who are you travelling with?', opts: [['family', 'Family'], ['friends', 'Friends'], ['solo', 'On my own']] },
      L: { wait: 'Answer the three questions to see your route here.', title: 'Your route', days: ['Day one', 'Day two', 'Day three'], trail: 'Trail', place: 'Landmark', saved: 'From your saved places' },
    },
    finale: {
      title: 'The oasis awaits',
      lead: 'From the sands of Al-Asfar to the shade of the palms, your journey starts here.',
      plan: 'Plan your visit',
      open: 'Open my trip',
      replay: 'Replay the story',
    },
    saved: { count: 'My places:', build: 'Build my trip from them' },
  },
};

export const isHomeLang = (l: Lang): l is HomeLang => (HOME_LANGS as readonly string[]).includes(l);
