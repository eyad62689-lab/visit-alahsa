// «مستكشف الأحساء الصغير» — لعبة ذاكرة بثلاثة مستويات (3 و4 و6 أزواج) من ست صور منشورة في الموقع (عربي/إنجليزي).
// كل مكان يحمل صورته (photo: مسار /img بلا امتداد) وصفحته (ref): معلم بمعرّفه في مجموعة attractions
// أو صفحة الثمار — تُحل الروابط وقت البناء. السطر القصير (fact) مطابق لنص المعلم في الموقع.

export type ExplorerLang = 'ar' | 'en';
export type ExplorerKind = 'nature' | 'heritage' | 'fruits';
export type ExplorerRef = { attraction: string } | 'fruits';

/** الأماكن الستة بترتيب المستويات: الأول يأخذ أول 3، والثاني أول 4، والثالث الستة. */
export const EXPLORER_PLACES: readonly {
  id: string;
  kind: ExplorerKind;
  photo: string;
  ref: ExplorerRef;
  ar: { title: string; fact: string };
  en: { title: string; fact: string };
}[] = [
  {
    id: 'jabal-al-qarah', kind: 'nature', photo: '/img/jabal-al-qarah', ref: { attraction: 'jabal-al-qarah' },
    ar: { title: 'جبل القارة', fact: 'تأمّل جبل القارة وسط نخيل الواحة. بين صخوره ممرات وكهوف تستحق الاكتشاف.' },
    en: { title: 'Jabal Al-Qarah', fact: 'Look at Jabal Al-Qarah rising among the oasis palms. Passages and caves hide between its rocks.' },
  },
  {
    id: 'qasr-ibrahim', kind: 'heritage', photo: '/img/qasr-ibrahim', ref: { attraction: 'qasr-ibrahim' },
    ar: { title: 'قصر إبراهيم', fact: 'في قلب الهفوف يقف قصر إبراهيم بسوره وأبراجه وقبّة مسجده. هل تستطيع تمييز برج دائري في الصورة؟' },
    en: { title: 'Qasr Ibrahim', fact: 'Qasr Ibrahim stands in the heart of Hofuf with its walls, towers and the dome of its mosque. Can you spot a round tower in the photo?' },
  },
  {
    id: 'qaisariyah', kind: 'heritage', photo: '/img/qaisariyah', ref: { attraction: 'qaisariyah' },
    ar: { title: 'سوق القيصرية', fact: 'سوق تراثي في الهفوف يعود لأكثر من قرنين. انظر إلى أقواسه وأبوابه وتفاصيل واجهته في الصورة.' },
    en: { title: 'Qaisariyah Souq', fact: 'A heritage souq in Hofuf that goes back more than two centuries. Look at its arches, doors and façade in the photo.' },
  },
  {
    id: 'khalas', kind: 'fruits', photo: '/img/fruits/khalas-v2', ref: 'fruits',
    ar: { title: 'تمور الخلاص', fact: 'الخلاص من أصناف النخيل المشهورة في الأحساء. ترى في الصورة رطبه الذهبي وتمره بلونه الكهرماني.' },
    en: { title: 'Khalas dates', fact: 'Khalas is a well-known date variety in Al-Ahsa. This photo shows golden rutab and amber-coloured ripe dates.' },
  },
  {
    id: 'asfar', kind: 'nature', photo: '/img/asfar', ref: { attraction: 'asfar' },
    ar: { title: 'بحيرة الأصفر', fact: 'بحيرة الأصفر مسطّح مائي نادر وسط الصحراء، تعبرها الطيور المهاجرة. تأمّل الماء والرمال في الصورة.' },
    en: { title: 'Al-Asfar Lake', fact: 'Al-Asfar Lake is a rare stretch of water in the middle of the desert, visited by migratory birds. Look at the water and sand in the photo.' },
  },
  {
    id: 'jawatha-mosque', kind: 'heritage', photo: '/img/jawatha-mosque', ref: { attraction: 'jawatha-mosque' },
    ar: { title: 'مسجد جواثا', fact: 'مسجد جواثا من أقدم المساجد في الإسلام. لاحظ بساطة بنائه الطيني.' },
    en: { title: 'Jawatha Mosque', fact: 'Jawatha Mosque is among the oldest mosques in Islam. Notice its simple mud building.' },
  },
];

/** أزواج كل مستوى (المستوى 1 = 3 أزواج). */
export const EXPLORER_LEVELS = [3, 4, 6] as const;

export const EXPLORER_PAGE = {
  ar: {
    seoTitle: 'مستكشف الأحساء الصغير: لعبة ذاكرة للأطفال بصور المعالم',
    seoDesc: 'لعبة ذاكرة مجانية للأطفال بثلاثة مستويات: طابق صور جبل القارة وقصر إبراهيم وسوق القيصرية وغيرها، واكتشف حكاية كل معلم، واجمع أختام جواز المستكشف.',
    eyebrow: 'العب · اكتشف · احفظ الحكاية',
    title: 'مستكشف الأحساء الصغير',
    lead: 'كل بطاقة… حكاية من الأحساء. جولة صغيرة بين الجبل والقصر والسوق: طابق الصور، واكتشف الحكايات، واجمع أختام الأحساء في جوازك. على مهلك، لا يوجد وقت محدد.',
    noscript: 'تحتاج اللعبة إلى متصفح يعمل فيه JavaScript.',
    realPhotos: 'صور من زوروا الأحساء', threeLevels: '3 مستويات من الاكتشاف', collectStamps: 'اجمع أختام جوازك',
    playTitle: 'افتح أبواب الاكتشاف', playDesc: 'اختر مستواك، ثم اعثر على الصور المتشابهة.',
    levelsLabel: 'مستويات اللعبة',
    levels: [['مستكشف', '3 أزواج'], ['مغامر', '4 أزواج'], ['سفير الواحة', '6 أزواج']],
    matches: 'المكتشفة', moves: 'المحاولات', time: 'الوقت',
    ready: 'خذ نظرة… ثم اختبر ذاكرتك!', startHelp: 'تأمّل الصور الآن. عند البدء ستُخلط البطاقات ثم تُقلب.', start: 'ابدأ التحدي',
    board: 'بطاقات اللعبة',
    hint: 'تلميح واحد', restart: 'جولة جديدة', won: 'أحسنت! اكتملت جولتك.',
    passport: 'جواز المستكشف', passportIntro: 'طابق الصور وافتح حكايات الأحساء الست.', stamps: 'أختامك',
    saveNote: 'تُحفظ أختامك وأفضل نتائجك في هذا المتصفح.',
    tipTitle: 'نصيحة بلبل', tip: 'ابدأ بصورة واحدة، وتذكّر مكانها. الخطأ جزء من الاكتشاف!',
    lakeTitle: 'بحيرة الأصفر', lakeTeaser: 'بين الماء والرمال، تنتظرك حكاية أخرى في المستوى الثالث.',
    galleryTitle: 'الأحساء… كما ستكتشفها', galleryDesc: 'جبل وقصر وسوق وثمار وبحيرة ومسجد؛ لكل صورة حكايتها.',
    beyondTitle: 'تبدأ باللعب… وتستمر بالاستكشاف.', beyondDesc: 'تعرّف على المعالم، وخطّط لرحلتك القادمة إلى الأحساء.', visitSite: 'اكتشف زوروا الأحساء',
    kinds: { nature: 'طبيعة الواحة', heritage: 'ذاكرة الأحساء', fruits: 'ثمار الواحة' },
    close: 'إغلاق', readMore: 'اكتشف المزيد في زوروا الأحساء', keepExploring: 'واصل الاستكشاف', nextLevel: 'انتقل إلى المستوى التالي',
  },
  en: {
    seoTitle: 'Little Al-Ahsa Explorer: A Memory Game of Oasis Landmarks',
    seoDesc: 'A free memory game for children in three levels: match photos of Jabal Al-Qarah, Qasr Ibrahim, Qaisariyah Souq and more, and collect your explorer stamps.',
    eyebrow: 'Play · Discover · Remember',
    title: 'Little Al-Ahsa Explorer',
    lead: 'Every card tells a story of Al-Ahsa. Turn the cards and find matching photos: every pair reveals another story, and a stamp for your explorer passport. Take your time, there is no time limit.',
    noscript: 'The game needs a browser with JavaScript enabled.',
    realPhotos: 'Photos from Visit Al-Ahsa', threeLevels: '3 levels of discovery', collectStamps: 'Collect passport stamps',
    playTitle: 'A journey in pictures', playDesc: 'Choose your level, then find the matching photos.',
    levelsLabel: 'Game levels',
    levels: [['Explorer', '3 pairs'], ['Adventurer', '4 pairs'], ['Oasis ambassador', '6 pairs']],
    matches: 'Discovered', moves: 'Moves', time: 'Time',
    ready: 'Take a look, then test your memory!', startHelp: 'Study the photos. Starting will shuffle and turn the cards.', start: 'Start the challenge',
    board: 'Game cards',
    hint: 'One hint', restart: 'New round', won: 'Well done! Round complete.',
    passport: 'Explorer passport', passportIntro: 'Six discoveries await. Match the photos to collect your stamps.', stamps: 'Your stamps',
    saveNote: 'Your stamps and best results are saved in this browser.',
    tipTitle: 'Bulbul’s tip', tip: 'Start with one photo and remember its place. Mistakes are part of discovery!',
    lakeTitle: 'Al-Asfar Lake', lakeTeaser: 'Between water and sand, another story awaits in level three.',
    galleryTitle: 'Stories behind the photos', galleryDesc: 'Photos from Al-Ahsa. Tap a picture to discover its story.',
    beyondTitle: 'Play today. Explore tomorrow.', beyondDesc: 'Discover the landmarks and plan your next visit to Al-Ahsa.', visitSite: 'Explore Visit Al-Ahsa',
    kinds: { nature: 'Oasis nature', heritage: 'Al-Ahsa heritage', fruits: 'Oasis fruits' },
    close: 'Close', readMore: 'Explore more on Visit Al-Ahsa', keepExploring: 'Keep exploring', nextLevel: 'Advance to the next level',
  },
} as const;

/** نصوص يحتاجها السكربت وقت التشغيل (الحالة والبطاقات والأختام ونافذة الاكتشاف). */
export const EXPLORER_RUNTIME = {
  ar: {
    soundOn: 'الصوت يعمل', soundOff: 'الصوت مغلق',
    saveNote: 'تُحفظ أختامك وأفضل نتائجك في هذا المتصفح.',
    sessionOnly: 'أختامك متاحة لهذه الجلسة؛ الحفظ غير متاح في هذا المتصفح.',
    bestLabel: 'أفضل نتيجة · محاولات:',
    cardBackHint: 'اضغط للكشف', matched: 'تمت المطابقة', hiddenCard: 'بطاقة مخفية', lockedStamp: 'ختم لم يُكتشف بعد',
    memorize: 'تأمّل الصور وتذكّر أماكنها…', findPair: 'اختر بطاقتين متشابهتين.', pairFound: 'رائع! اكتشفت زوجًا جديدًا.', tryAgain: 'ليستا متشابهتين… حاول مرة أخرى.',
    stampAdded: 'ختم جديد في جوازك', levelComplete: 'اكتمل المستوى بنجاح!', galleryTag: 'الأحساء… كما ستكتشفها',
    keepExploring: 'واصل الاستكشاف', close: 'إغلاق', nextLevel: 'انتقل إلى المستوى التالي', restart: 'جولة جديدة',
    wmAr: 'الأحساء', wmEn: 'VISIT AL-AHSA',
  },
  en: {
    soundOn: 'Sound on', soundOff: 'Sound off',
    saveNote: 'Your stamps and best results are saved in this browser.',
    sessionOnly: 'Stamps last for this session; saving is unavailable in this browser.',
    bestLabel: 'Best · moves:',
    cardBackHint: 'Tap to reveal', matched: 'Matched', hiddenCard: 'Hidden card', lockedStamp: 'Undiscovered stamp',
    memorize: 'Look closely and remember the photos…', findPair: 'Choose two matching cards.', pairFound: 'Great! You found a pair.', tryAgain: 'Not a match… try again.',
    stampAdded: 'A new passport stamp', levelComplete: 'Level complete!', galleryTag: 'Stories behind the photos',
    keepExploring: 'Keep exploring', close: 'Close', nextLevel: 'Advance to the next level', restart: 'New round',
    wmAr: 'الأحساء', wmEn: 'VISIT AL-AHSA',
  },
} as const;
export type ExplorerRuntime = (typeof EXPLORER_RUNTIME)[ExplorerLang];
