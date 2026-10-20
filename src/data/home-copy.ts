// نصوص واجهة الرئيسية «الواحة تتكشّف» لكل لغة — مصدر واحد تقرؤه مكوّنات src/components/home.
// العربية والإنجليزية منقولتان كما اعتمدهما إياد (مواصفات الإصدار 2)، وكل لغة أخرى تُضاف هنا
// من خط ترجمتها حصراً ثم تُضمّ إلى HOME_LANGS. أوصاف الأماكن ليست هنا: تأتي من مجموعاتها.
import type { Lang } from '../i18n/ui';

export const HOME_LANGS = ['ar', 'en', 'zh', 'de'] as const;
export type HomeLang = (typeof HOME_LANGS)[number];

type Pair = readonly [string, string];

export type HomeCopy = {
  /** عنوان الصفحة ووصفها واسما الوجهة والدولة في JSON-LD — منقولة من HomeView كما مرّت بخطوطها */
  seo: { title: string; description: string; place: string; country: string };
  /** سهم الروابط بحسب اتجاه الكتابة */
  arrow: string;
  /** فاصل جملتين متتاليتين في فقرة واحدة (لا مسافة في الصينية) */
  sep: string;
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
    sep: ' ',
    paths: { attractions: '/معالم/', map: '/خريطة/', plan: '/خطط/', myTrip: '/رحلتي/', trails: '/trails/' },
    gate: {
      title: 'أكبر واحةٍ في العالم تتكشّف لك، فصلاً بعد فصل',
      // الموضع في أول البطل (2026-10-20): القارئ الأعمى الصيني لم يعرف أين الأحساء حتى الفصل الرابع
      lead: 'في المنطقة الشرقية من المملكة العربية السعودية: ماءٌ تحت الرمل، وجبلٌ تسكنه الكهوف، وأسواقٌ تعاقبت عليها الأجيال. مرّر لتبدأ الحكاية.',
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
    sep: ' ',
    paths: { attractions: '/en/attractions/', map: '/en/map/', plan: '/en/plan-your-trip/', myTrip: '/en/plan/', trails: '/en/trails/' },
    gate: {
      title: 'The world’s largest oasis, unfolding chapter by chapter',
      lead: 'In Saudi Arabia’s Eastern Province: water beneath the sand, a mountain of caves, and souqs passed down through generations. Scroll to begin.',
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
  // الصينية من خط zh-translation-pipeline (دفعة zh-home-1، 2026-10-20)؛ seo منقول من HomeView (misc.seo.*، 2026-08-29)
  zh: {
    seo: {
      title: '哈萨旅游指南——全球最大的绿洲',
      description: '沙特阿拉伯哈萨旅游指南：卡拉山、易卜拉欣宫、凯撒利亚集市、乌盖尔（Al-Uqair）。在这片列入联合国教科文组织世界遗产名录的绿洲，查看地图与行程，了解活动与美食。',
      place: '哈萨',
      country: '沙特阿拉伯',
    },
    arrow: '→',
    sep: '',
    paths: { attractions: '/zh/attractions/', map: '/zh/map/', plan: '/zh/plan-your-trip/', myTrip: '/zh/plan/', trails: '/zh/trails/' },
    gate: {
      title: '全球最大的绿洲，在您眼前一章章展开',
      lead: '在沙特阿拉伯东部省，沙下藏水，山中洞穴密布，集市世代相传。向下滑动，开启这段故事。',
      begin: '开启故事',
      skip: '直接前往行程规划',
    },
    rail: {
      label: '页面章节',
      items: [['ch-gate', '入口'], ['ch-water', '沙下之水'], ['ch-qarah', '卡拉山'], ['ch-map', '互动地图'], ['ch-memory', '泥土与集市的记忆'], ['ch-plan', '行程规划'], ['ch-finale', '尾声']],
    },
    water: {
      title: '沙下之水',
      lead: '一片巨大的地下含水层滋养着绿洲，让它在大漠腹地保持葱绿。',
      springsL: '处自流泉，灌溉着这片绿洲',
      srcLabel: '资料来源：',
      srcGuinness: '吉尼斯世界纪录“最大的绿洲”',
      srcMid: '（椰枣树与泉眼）；沙特环境水务与农业部统计数据（椰枣树）；',
      srcUnesco: '联合国教科文组织《世界遗产名录》',
      srcEnd: '（2018）。',
      link: '探索自然风光',
    },
    qarah: {
      title: '卡拉山：亲手拨转一天的时光',
      drag: '拖动滑块，从黎明到日落。',
      timeLabel: '一天中的时段',
      times: ['黎明', '上午', '下午', '日落'],
      link: '卡拉山页面',
    },
    map: {
      title: '选一处让您心动的地方',
      lead: '每个景点都标在真实位置上。点击即可查看，还能把它收进“我的收藏”。',
      svgLabel: '哈萨景点示意地图',
      km: '10 公里',
      legend: '地图上的景点',
      empty: '在地图上选一处景点，即可查看它的照片与介绍。',
      more: '景点页面',
      link: '查看完整地图',
    },
    memory: {
      title: '泥土与集市的记忆',
      lead: '泥筑的城堡、伊斯兰教早期兴建的清真寺，还有世代相传的传统市集。',
      track: '历史古迹列表，可左右滑动',
      link: '浏览历史古迹',
    },
    plan: {
      title: '行程规划，只需三个问题',
      lead: '答完问题，路线随即出现，您在地图上收藏的景点也会一并排入。',
      link: '完整行程规划指南',
      int: { legend: '什么最吸引您？', opts: [['heritage', '古迹与历史'], ['nature', '自然与水'], ['markets', '市集与手工艺']] },
      dur: { legend: '您有几天时间？', opts: [['1', '一天'], ['2', '两天'], ['3', '三天']] },
      com: { legend: '您和谁同行？', opts: [['family', '家人'], ['friends', '朋友'], ['solo', '独自出行']] },
      L: { wait: '回答这三个问题，您的路线将显示在这里。', title: '您的路线', days: ['第 1 天', '第 2 天', '第 3 天'], trail: '路线', place: '景点', saved: '来自我的收藏' },
    },
    finale: {
      title: '绿洲静候您的到来',
      lead: '从阿斯法湖畔的黄沙，到椰枣林的绿荫，您的旅程由此开始。',
      plan: '行程规划',
      open: '打开我的收藏',
      replay: '从头再读',
    },
    saved: { count: '我的收藏：', build: '用收藏的景点规划行程' },
  },
  // seo منقول من HomeView (دفعة الواجهة الألمانية) — نصوص الفصول من خط de-translation-pipeline (دفعة de-home-1)
  de: {
    seo: {
      title: 'Al-Ahsa-Reiseführer – die größte Oase der Welt',
      description: 'Ihr Al-Ahsa-Reiseführer: Jabal al-Qarah, Qasr Ibrahim, Qaisariyah-Souk und Al-Uqair – Karten, Routen, Veranstaltungen und Restaurants im UNESCO-Welterbe.',
      place: 'Al-Ahsa',
      country: 'Saudi-Arabien',
    },
    arrow: '→',
    sep: ' ',
    paths: { attractions: '/de/attractions/', map: '/de/map/', plan: '/de/plan-your-trip/', myTrip: '/de/plan/', trails: '/de/trails/' },
    gate: {
      title: 'Die größte Oase der Welt öffnet sich Ihnen Kapitel für Kapitel',
      lead: 'In der Ostprovinz Saudi-Arabiens: Wasser unter dem Sand, ein höhlenreicher Berg und Souks, in denen seit Generationen gehandelt wird. Scrollen Sie, und die Geschichte beginnt.',
      begin: 'Die Geschichte beginnen',
      skip: 'Zur Planung springen',
    },
    rail: {
      label: 'Kapitel dieser Seite',
      items: [['ch-gate', 'Das Tor'], ['ch-water', 'Wasser unter dem Sand'], ['ch-qarah', 'Jabal al-Qarah'], ['ch-map', 'Die interaktive Karte'], ['ch-memory', 'Was Lehm und Souk bewahren'], ['ch-plan', 'Reise planen'], ['ch-finale', 'Ausklang']],
    },
    water: {
      title: 'Wasser unter dem Sand',
      lead: 'Ein gewaltiges Grundwasservorkommen speist die Oase und lässt sie mitten in der Wüste ergrünen.',
      springsL: 'artesische Quellen bewässern die Oase',
      srcLabel: 'Quellen: ',
      srcGuinness: 'Guinness World Records, Eintrag „Largest oasis“',
      srcMid: ' (Palmen und Quellen); Statistiken des Ministeriums für Umwelt, Wasser und Landwirtschaft (Palmen); ',
      srcUnesco: 'UNESCO-Welterbeliste',
      srcEnd: ' (2018).',
      link: 'Natur entdecken',
    },
    qarah: {
      title: 'Jabal al-Qarah: Der Tag liegt in Ihrer Hand',
      drag: 'Ziehen Sie den Regler vom Morgengrauen bis zum Sonnenuntergang.',
      timeLabel: 'Tageszeit',
      times: ['Morgengrauen', 'Vormittag', 'Spätnachmittag', 'Sonnenuntergang'],
      link: 'Mehr über den Jabal al-Qarah',
    },
    map: {
      title: 'Wählen Sie, was Sie lockt',
      lead: 'Die Sehenswürdigkeiten sind dort eingezeichnet, wo sie tatsächlich liegen. Tippen Sie eine an, um mehr zu sehen, und setzen Sie sie auf Ihre Merkliste.',
      svgLabel: 'Vereinfachte Karte der Sehenswürdigkeiten von Al-Ahsa',
      km: '10 km',
      legend: 'Sehenswürdigkeiten auf der Karte',
      empty: 'Wählen Sie auf der Karte eine Sehenswürdigkeit, um Foto und Beschreibung zu sehen.',
      more: 'Seite der Sehenswürdigkeit',
      link: 'Zur vollständigen Karte',
    },
    memory: {
      title: 'Was Lehm und Souk bewahren',
      lead: 'Festungen aus Lehm, einige der frühesten Moscheen des Islams und Souks, in denen seit Generationen gehandelt wird.',
      track: 'Historische Stätten – seitlich scrollen',
      link: 'Zu den historischen Stätten',
    },
    plan: {
      title: 'Ihre Reise planen – in drei Fragen',
      lead: 'Antworten Sie, und Ihre Route erscheint sofort – was Sie auf der Karte gemerkt haben, fließt mit ein.',
      link: 'Ausführlicher Ratgeber zur Reiseplanung',
      int: { legend: 'Was zieht Sie an?', opts: [['heritage', 'Kulturerbe und Geschichte'], ['nature', 'Natur und Wasser'], ['markets', 'Souks und Handwerk']] },
      dur: { legend: 'Wie viele Tage haben Sie?', opts: [['1', 'Ein Tag'], ['2', 'Zwei Tage'], ['3', 'Drei Tage']] },
      com: { legend: 'Mit wem reisen Sie?', opts: [['family', 'Familie'], ['friends', 'Freunde'], ['solo', 'Allein']] },
      L: { wait: 'Beantworten Sie die drei Fragen, dann erscheint hier Ihre Route.', title: 'Ihre Route', days: ['Tag 1', 'Tag 2', 'Tag 3'], trail: 'Route', place: 'Sehenswürdigkeit', saved: 'Aus Ihrer Merkliste' },
    },
    finale: {
      title: 'Die Oase erwartet Sie',
      lead: 'Vom Sand am Al-Asfar-See bis in den Schatten der Palmen – hier beginnt Ihre Reise.',
      plan: 'Reise planen',
      open: 'Meine Merkliste öffnen',
      replay: 'Zurück zum Anfang',
    },
    saved: { count: 'Meine Merkliste:', build: 'Reise daraus planen' },
  },
};

export const isHomeLang = (l: Lang): l is HomeLang => (HOME_LANGS as readonly string[]).includes(l);

/** العنوان الصغير فوق الفصل («01 · The Gate»): لاتيني في العربية والإنجليزية كما اعتُمد التصميم
 *  (وموسوم lang="en" في العربية)، وفي غيرهما اسم الفصل المترجم من شريط الفصول — نصّ لاتيني في
 *  صفحة صينية يحسبه فحص سلامة اللغة C22 غير مترجم. */
export const chapterEyebrow = (lang: HomeLang, i: number, latin: string) => {
  const no = String(i + 1).padStart(2, '0');
  if (lang === 'ar' || lang === 'en') return { text: `${no} · ${latin}`, lang: lang === 'en' ? undefined : 'en' };
  return { text: `${no} · ${HOME_COPY[lang].rail.items[i][1]}`, lang: undefined };
};
