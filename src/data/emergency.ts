// صفحة «الطوارئ والمساعدة في الأحساء» — عربي/إنجليزي فقط كأدوات السفر (src/lib/routes.ts EMERGENCY_ALT).
//
// المصدر: دليل الطوارئ المعتمد (PDF، مراجعة 2026-11-15)، وكل رقم فيه طوبق على مصدره الرسمي
// في 2026-11-15: المنصة الوطنية my.gov.sa/emergency-contact (911 997 998 999 993 996 994 112
// 937 940 933 1900 و920000560 لنجم)، وواس (مركز 911 بالشرقية يخدم 12 محافظة مع الدمام —
// w2717187؛ واستقبال البلاغات بعدة لغات — N2604869)، ووزارة الصحة (937 على مدار الساعة)،
// والمياه الوطنية (931). وثلاثة أحكام عند المراجعة:
//   - نجم: 199033 رقم خدمة العملاء كما في صفحة التطبيق، و920000560 كما تسمّيه المنصة الوطنية.
//   - تعريف نجم («شركة نجم لخدمات التأمين»، وتطبيقها يسهّل الإبلاغ عن الحوادث المرورية) من صفحة التطبيق نفسها، 2026-11-16.
//   - 930: لم يثبت أنه على مدار الساعة طوال العام، فلا يُكتب ذلك.
//   - مصدرا الهلال الأحمر وجمعية القلب (404) حُذفا، ومايو كلينك أُبدل بصفحة وزارة الصحة.
// أي رقم يُضاف هنا يلزمه مصدر رسمي — لا يُكتب من الذاكرة.
export type EmergencyLang = 'ar' | 'en';

type Src = { label: string; href: string };
type Num = { n: string; who: string; when: string };
type Para = { lead?: string; text: string };
type Section = { id: string; h: string; subs?: { h: string; paras: Para[]; src?: Src[] }[]; paras?: Para[]; steps?: Para[]; after?: Para[]; src?: Src[] };

const S = {
  platform: 'https://my.gov.sa/emergency-contact',
  spa911: 'https://spa.gov.sa/ar/w2717187',
  spa911Lang: 'https://www.spa.gov.sa/N2604869',
  moh937: 'https://www.moh.gov.sa/937/pages/default.aspx',
  mohMap: 'https://www.moh.gov.sa/eservices/interactive-maps/pages/default.aspx',
  stroke: 'https://www.moh.gov.sa/awarenessplateform/VariousTopics/Pages/Stroke.aspx',
  heat: 'https://www.moh.gov.sa/healthawareness/educationalcontent/miscellaneous/pages/004.aspx',
  heatstroke: 'https://www.moh.gov.sa/healthawareness/educationalcontent/firstaid/pages/022.aspx',
  bites: 'https://www.moh.gov.sa/healthawareness/educationalcontent/firstaid/pages/015.aspx',
  rain: 'https://spa.gov.sa/N2725237',
  ncm: 'https://www.ncm.gov.sa/',
  najm: 'https://apps.apple.com/sa/app/najm-%D9%86%D8%AC%D9%85/id953140409',
  tourism: 'https://mt.gov.sa/ar/complaints-guide',
  nwc: 'https://www.nwc.com.sa/AR/HowWeCanHelp/Pages/default.aspx',
} as const;

/** روابط تعريف المستشفيات الرسمية بترتيب hospitals في كل لغة. */
export const HOSPITAL_LINKS: string[] = [
  "https://www.moh.gov.sa/ministry/mediacenter/news/pages/news-2021-12-09-001.aspx",
  "https://www.moh.gov.sa/Ministry/MediaCenter/News/Pages/news-2019-03-20-008.aspx",
  "https://www.moh.gov.sa/ministry/mediacenter/news/pages/news-2019-10-09-001.aspx",
  "https://mngha.med.sa/arabic/medicalcities/alahsa/pages/default.aspx",
];
export const MOH_MAP = S.mohMap;

/** العبارات تُعرض بالعربية والإنجليزية حرفياً في كل لغة؛ وغير ar/en تضيف معناها بلغتها (phraseGloss). */
export const PHRASES: [string, string][] = [
  ["أحتاج إلى سيارة إسعاف", "I need an ambulance."],
  ["أنا في الأحساء وموقعي هو…", "I am in Al-Ahsa. My location is…"],
  ["يوجد شخص مصاب", "Someone is injured."],
  ["الشخص لا يستجيب", "The person is unresponsive."],
  ["الشخص لا يتنفس بصورة طبيعية", "The person is not breathing normally."],
  ["يوجد حريق", "There is a fire."],
  ["طفلي مفقود", "My child is missing."],
  ["لا أتحدث العربية وأحتاج إلى المساعدة بالإنجليزية", "I do not speak Arabic. I need help in English."],
];

type Page = {
  seoTitle: string; seoDesc: string; eyebrow: string; title: string; lead: string; reviewed: string;
  alertH: string; alertP: string[]; call: string;
  coreH: string; coreHead: [string, string, string]; core: Num[]; coreNote: string; coreSrc: Src[];
  sections: Section[];
  hospH: string; hospIntro: Para[]; hospListH: string; hospAfter: Para[];
  servH: string; servIntro: string; services: Num[]; servNote: string; servSrc: Src[];
  phrasesH: string; phrasesNote: string; phrasesSrc: Src[];
  faqH: string; faqs: { q: string; a: string }[]; faqSrc: Src[];
  keepH: string; keep: string[]; disclaimer: string;
  srcLabel: string; newWindow: string; listSep: string; tocLabel: string; mapLink: string;
  /** قالب تسمية زر الاتصال: {n} الرقم و{who} الجهة */
  callAria: string;
  hospitals: { name: string; via: string }[];
  /** معنى كل عبارة من PHRASES بلغة الصفحة — فارغ في ar/en */
  phraseGloss: string[];
};

export type EmergencyPage = Page;
export const PAGE: Record<EmergencyLang, Page> = {
  ar: {
    seoTitle: 'الطوارئ والمساعدة في الأحساء: أرقام الإسعاف والأمن',
    seoDesc: 'دليل زوّار الأحساء للوصول إلى المساعدة في الحالات الطارئة، ومعرفة أرقام الإسعاف والأمن والخدمات، والتصرف عند الحوادث أو فقدان الوثائق أثناء الرحلة.',
    eyebrow: 'دليل الزائر',
    title: 'الطوارئ والمساعدة في الأحساء',
    lead: 'دليل زوّار الأحساء للوصول إلى المساعدة في الحالات الطارئة، ومعرفة أرقام الإسعاف والأمن والخدمات، والتصرف عند الحوادث أو فقدان الوثائق أثناء الرحلة.',
    reviewed: 'آخر مراجعة للمعلومات: 15 نوفمبر 2026',
    alertH: 'خطر مباشر أو حالة طارئة في الأحساء؟ اتصل بـ911. ولطلب الإسعاف مباشرة اتصل بـ997.',
    alertP: [
      'ابتعد عن مصدر الخطر إذا استطعت بأمان، وحدّد موقعك واتبع تعليمات موظف الطوارئ. لا تؤخر الاتصال للبحث في هذه الصفحة أو مراسلة الموقع.',
      '«زوروا الأحساء» دليل سياحي مستقل؛ البريد وواتساب الموقع والمساعد «بلبل» ليست قنوات لاستقبال بلاغات الطوارئ.',
    ],
    call: 'اتصل',
    coreH: 'أرقام الطوارئ الأساسية',
    coreHead: ['الحالة', 'الرقم', 'الجهة'],
    core: [
      { when: 'خطر مباشر أو حالة طارئة تحتاج تدخل الجهات المختصة', n: '911', who: 'العمليات الأمنية الموحدة في المنطقة الشرقية' },
      { when: 'إصابة أو حالة صحية طارئة تحتاج إسعافاً', n: '997', who: 'الهلال الأحمر السعودي' },
      { when: 'حريق أو احتجاز أو حاجة إلى إنقاذ', n: '998', who: 'الدفاع المدني' },
      { when: 'بلاغ أمني أو اعتداء أو سرقة', n: '999', who: 'الشرطة' },
      { when: 'حادث مروري', n: '993', who: 'المرور' },
      { when: 'بلاغ على الطرق الخارجية', n: '996', who: 'أمن الطرق' },
      { when: 'طارئ بحري أو ساحلي', n: '994', who: 'حرس الحدود' },
    ],
    coreNote: '911 يعمل في المنطقة الشرقية التي تتبع لها الأحساء. الأرقام المختصرة أعلاه للاستخدام داخل المملكة؛ لا تضف إليها مفتاح الدولة +966. وتدرج المنصة الوطنية الموحدة 112 للاتصال دون شريحة (انظر الأسئلة الشائعة).',
    coreSrc: [{ label: 'المنصة الوطنية لأرقام الطوارئ', href: S.platform }, { label: 'واس عن مركز 911 بالمنطقة الشرقية', href: S.spa911 }],
    sections: [
      {
        id: 'what-to-say', h: 'ماذا تقول عند الاتصال',
        steps: [
          { lead: 'الموقع أولاً', text: 'الأحساء، ثم المدينة أو القرية، والحي، واسم الطريق أو المعلم وأقرب مدخل. على الطرق اذكر اتجاه السير وأقرب مخرج أو لوحة كيلومترية.' },
          { lead: 'ماذا حدث', text: 'حادث، إصابة، حريق، شخص مفقود، أو خطر آخر.' },
          { lead: 'عدد الأشخاص وحالتهم', text: 'هل المصاب واعٍ؟ هل يتنفس؟ هل يوجد نزيف أو أشخاص محاصرون؟ أجب بما تراه دون تخمين.' },
          { lead: 'الأخطار المحيطة', text: 'حركة مرور، دخان، كهرباء، مياه أو صعوبة وصول.' },
          { lead: 'رقم للاتصال بك', text: 'ثم ابقَ على الخط واتبع التعليمات حتى يُطلب منك إنهاء المكالمة.' },
        ],
        after: [{ text: 'افتح خريطة هاتفك لقراءة الإحداثيات أو وصف موقعك، وشارك الموقع عبر القناة التي يحددها موظف الطوارئ. إذا كنت داخل مزرعة أو منتزه أو ممر صخري، اذكر اسم المكان والبوابة وأقرب نقطة يمكن للمركبات الوصول إليها. لا تؤخر الاتصال حتى تتمكن من تشغيل الخريطة.' }],
      },
      {
        id: 'medical', h: 'الحالات الصحية العاجلة',
        paras: [
          { text: 'اطلب الإسعاف على 997 عند فقدان الوعي، أو صعوبة التنفس الشديدة، أو ألم الصدر الشديد، أو نزيف غزير، أو إصابة خطيرة. وكذلك عند ظهور ضعف مفاجئ في جانب من الجسم أو انحراف الوجه أو اضطراب الكلام.' },
          { text: 'ابقَ مع المصاب إذا كان المكان آمناً، واتبع تعليمات الإسعاف. لا تقد السيارة بنفسك إذا كانت حالتك قد تعيق القيادة. إذا كان لا يستجيب ولا يتنفس بصورة طبيعية، أخبر الموظف فوراً وشغّل مكبّر الصوت لاتباع إرشادات الإنعاش.' },
          { lead: 'للاستشارة الصحية غير الإسعافية اتصل بـ937.', text: 'تقدم وزارة الصحة استشارات طبية وإرشادات للتسمم وتستقبل البلاغات والشكاوى الصحية على مدار الساعة. عند وجود خطر على الحياة اتصل بالإسعاف أولاً.' },
        ],
        src: [{ label: 'خدمات 937', href: S.moh937 }, { label: 'وزارة الصحة عن السكتة الدماغية', href: S.stroke }],
      },
      {
        id: 'cars', h: 'حوادث السيارات وتعطل المركبة',
        paras: [
          { lead: 'عند وجود إصابات أو حريق أو خطر مباشر:', text: 'اتصل بـ911، واطلب الإسعاف على 997 عند الحاجة. ابتعد عن مسار المركبات إذا أمكن بأمان، ولا تعرّض نفسك للخطر لتصوير الحادث.' },
          { lead: 'للحوادث التي لا تتضمن إصابات:', text: 'تواصل مع نجم، وهي شركة نجم لخدمات التأمين ويسهّل تطبيقها الرسمي الإبلاغ عن الحوادث المرورية، عبر التطبيق أو خدمة العملاء على 199033، واسأل عن طريقة الإبلاغ وفق نطاق تغطيتها وشروط خدمتها. وتدرج المنصة الوطنية الموحدة الرقم 920000560 لحوادث المركبات المؤمنة. إذا لم يكن الحادث ضمن اختصاص نجم فاتبع توجيهها للمرور على 993. احتفظ بالهوية ورخصة القيادة واستمارة المركبة وبيانات التأمين، وأبلغ شركة التأجير إن كانت السيارة مستأجرة.' },
          { lead: 'عند التعطل دون خطر مباشر:', text: 'اتصل بخدمة المساعدة على الطريق لدى التأمين أو شركة التأجير. إذا كان موقع التعطل يهدد السلامة أو كنت عالقاً في مكان خطر، اتصل بـ911 واذكر الموقع واتجاه الطريق.' },
        ],
        src: [{ label: 'صفحة تطبيق نجم', href: S.najm }, { label: 'المنصة الوطنية لأرقام الطوارئ', href: S.platform }],
      },
      {
        id: 'nature', h: 'السلامة في الطبيعة والحرارة',
        subs: [
          {
            h: 'الإجهاد الحراري وضربة الشمس',
            paras: [
              { text: 'رتّب الجولات الخارجية لتتخللها فترات راحة في الظل أو مكان مكيّف، واشرب الماء بانتظام وفق احتياجاتك الصحية، وراقب الأطفال وكبار السن. لا تترك طفلاً داخل مركبة متوقفة.' },
              { lead: 'ارتفاع حرارة الجسم مع اضطراب الوعي أو الإغماء حالة طارئة:', text: 'اتصل بـ997، وانقل المصاب إلى مكان بارد إذا أمكن بأمان، وابدأ تبريده بالماء والكمادات الباردة. لا تُعطِ مشتبهاً بإصابته بضربة شمس سوائل للشرب، واتبع تعليمات الإسعاف.' },
            ],
            src: [{ label: 'وزارة الصحة عن حرارة الصيف', href: S.heat }, { label: 'إسعافات ضربة الشمس', href: S.heatstroke }],
          },
          {
            h: 'الأمطار والسيول والغبار',
            paras: [
              { text: 'راجع تنبيهات المركز الوطني للأرصاد قبل الخروج، خصوصاً للمواقع المكشوفة والطرق الخارجية. ابتعد عن المنخفضات ومجاري السيول، ولا تعبر المياه الجارية بالسيارة أو سيراً. عند تدنّي الرؤية خفّف السرعة وتوقف في مكان آمن خارج مسار السير إذا لزم الأمر.' },
              { text: 'إذا حاصرتك المياه أو واجهت خطراً مباشراً، اتصل بـ911 وحدّد موقعك. أبعد الأطفال عن تجمعات المياه ومجاري السيول.' },
            ],
            src: [{ label: 'المركز الوطني للأرصاد', href: S.ncm }, { label: 'تعليمات الدفاع المدني أثناء الأمطار', href: S.rain }],
          },
          {
            h: 'المزارع والبحيرات والكهوف والساحل',
            paras: [
              { text: 'التزم بالمسارات المفتوحة وتعليمات إدارة المكان، وتجنّب تسلّق الصخور أو دخول الممرات المغلقة. أبقِ الأطفال قريبين منك حول قنوات الري والبحيرات والآبار، ولا تدخل المياه أو تحاول إنقاذ شخص إذا كان ذلك يعرّضك للغرق؛ اطلب المساعدة فوراً. للطوارئ الساحلية والبحرية استخدم 994 أو 911.' },
              { text: 'قبل رحلة خارج التجمعات السكنية، شارك المسار ووقت العودة المتوقع مع شخص موثوق، واحمل ماءً وشاحناً متنقلاً وخريطة محفوظة. عند الضياع تجنّب التحرك العشوائي، وحدّد موقعك واطلب المساعدة؛ لا تفترض توافر التغطية في كل موقع.' },
            ],
          },
        ],
      },
      {
        id: 'poison', h: 'التسمم واللدغات',
        paras: [
          { lead: 'اشتباه ابتلاع مادة سامة أو جرعة دواء غير صحيحة:', text: 'اطلب توجيهاً طبياً فوراً عبر 937، واتصل بـ997 عند فقدان الوعي أو صعوبة التنفس أو الأعراض الشديدة. احتفظ باسم المادة أو عبوتها ووقت التعرض والكمية التقريبية إن عُرفت. لا تحاول إحداث القيء.' },
          { lead: 'لدغة ثعبان أو لسعة عقرب:', text: 'اطلب الإسعاف فوراً على 997. هدّئ المصاب واتبع تعليمات الموظف. في لدغة الثعبان لا تربط الطرف، ولا تجرح موضع اللدغة أو تمص السم. لا تحاول الإمساك بالحيوان.' },
        ],
        src: [{ label: 'خدمات 937 وإرشادات التسمم', href: S.moh937 }, { label: 'وزارة الصحة عن اللدغات واللسعات', href: S.bites }],
      },
      {
        id: 'fire', h: 'الحريق وتسرب الغاز والخطر الكهربائي',
        paras: [
          { text: 'غادر المكان عبر مخرج آمن، ونبّه من حولك دون تعريض نفسك للخطر، واتصل بـ911 من مكان آمن، أو بالدفاع المدني مباشرة على 998. اتبع خطة الإخلاء وتعليمات العاملين، ولا تعد إلى منطقة الخطر لأخذ المتعلقات.' },
          { text: 'عند الاشتباه بتسرب غاز، ابتعد عن المكان وتجنّب إشعال النار أو تشغيل المفاتيح والأجهزة داخل المنطقة المتأثرة، واتصل بـ911 من مكان آمن. عند رؤية سلك ساقط أو خطر كهربائي لا تلمسه ولا تقترب من المياه المحيطة به؛ أبلغ 911 إذا كان هناك تهديد مباشر، و933 لبلاغات الكهرباء.' },
        ],
      },
      {
        id: 'lost', h: 'فقدان طفل أو شخص أو وثائق',
        paras: [
          { lead: 'فقدان طفل أو شخص يحتاج رعاية:', text: 'أبلغ أمن المكان فوراً واتصل بـ911. جهّز وصف الملابس والعمر وصورة حديثة وآخر موقع ووقت شوهد فيه. لا تنتظر اكتمال بحثك الشخصي إذا كانت السلامة مهددة، واتبع توجيه الجهات المختصة.' },
          { lead: 'فقدان جواز سفر أو وثائق:', text: 'تواصل مع الشرطة على 999 لتوجيهك إلى إجراءات البلاغ، ومع سفارة بلدك أو قنصليتها عبر موقعها الرسمي للحصول على إرشادات الوثائق البديلة والسفر. احتفظ برقم البلاغ وأبلغ شركة النقل عند تأثير الفقد على رحلتك.' },
          { lead: 'فقدان بطاقة مصرفية أو هاتف:', text: 'أوقف البطاقة عبر البنك فوراً، واستخدم خدمات قفل الجهاز لدى مزود النظام، واتصل بمشغل الشريحة عند الحاجة. في حال السرقة قدّم بلاغاً للشرطة، ولا تشارك رموز التحقق مع من يدّعي العثور على متعلقاتك.' },
          { lead: 'متعلقات مفقودة دون خطر:', text: 'ابدأ باستقبال الفندق أو أمن الموقع أو شركة النقل، وقدّم وصفاً واضحاً ووقت الفقد ووسيلة اتصال.' },
        ],
      },
    ],
    hospH: 'المستشفيات والمراكز الصحية في الأحساء',
    hospIntro: [
      { lead: 'في الحالة الخطيرة، اطلب الإسعاف واترك اختيار جهة النقل للفريق الطبي.', text: 'قرب المستشفى وحده لا يعني أنه الأنسب للحالة.' },
      { text: 'للبحث عن منشأة صحية ومواعيدها، استخدم الخريطة الرسمية لوزارة الصحة، وحدّد الأحساء ونوع الخدمة المطلوبة، أو اطلب التوجيه عبر 937. تختلف ساعات المراكز الصحية والعيادات عن أقسام الطوارئ.' },
    ],
    hospListH: 'من المستشفيات في الأحساء',
    hospAfter: [
      { text: 'هذه قائمة تعريفية وليست ترتيباً حسب القرب أو ضماناً لتوافر تخصص أو قبول تأمين محدد. تحقّق من وجهة الوصول والخدمة الحالية عبر الخريطة الرسمية أو 937 للحالات غير الإسعافية.' },
      { lead: 'للصيدليات والأدوية:', text: 'اسأل الصيدلي أو 937 عن احتياجك، وتحقّق من ساعات الصيدلية قبل الذهاب. احتفظ باسم الدواء العلمي والوصفة، وتجنّب استبدال أدوية الأمراض المزمنة دون استشارة.' },
      { lead: 'للزائر من خارج المملكة:', text: 'احتفظ بصورة جواز السفر ووثيقة التأمين وأرقام المساعدة الخاصة بشركة التأمين وقائمة الأدوية والحساسيات. تختلف التغطية والموافقات بحسب الوثيقة والمنشأة؛ لا تؤخر طلب الإسعاف لإتمام إجراءات التأمين.' },
    ],
    servH: 'أرقام المساعدة والخدمات',
    servIntro: 'هذه القنوات للخدمة والاستفسار والبلاغات المتخصصة. عند وجود خطر مباشر على الأشخاص ابدأ بـ911.',
    services: [
      { who: 'وزارة الصحة', n: '937', when: 'استشارة صحية وتوجيه وبلاغات صحية' },
      { who: 'المركز الموحد للسياحة', n: '930', when: 'مساعدة وشكاوى تتعلق بالخدمات السياحية' },
      { who: 'نجم (خدمة العملاء)', n: '199033', when: 'الاستفسار وتوجيه بلاغات حوادث المركبات وفق نطاق الخدمة' },
      { who: 'نجم (حوادث المركبات المؤمنة)', n: '920000560', when: 'حوادث المركبات المؤمنة (رقم تدرجه المنصة الوطنية الموحدة)' },
      { who: 'بلدي', n: '940', when: 'بلاغات الخدمات البلدية' },
      { who: 'طوارئ الكهرباء', n: '933', when: 'أعطال ومخاطر شبكة الكهرباء' },
      { who: 'بلاغات المياه', n: '931', when: 'بلاغات المياه والتسربات' },
      { who: 'وزارة التجارة', n: '1900', when: 'بلاغات المخالفات التجارية' },
    ],
    servNote: 'احتفظ برقم الحجز أو الفاتورة واسم المنشأة عند تقديم شكوى سياحية أو تجارية.',
    servSrc: [{ label: 'المنصة الوطنية', href: S.platform }, { label: 'وزارة السياحة', href: S.tourism }, { label: 'المياه الوطنية', href: S.nwc }, { label: 'نجم', href: S.najm }],
    phrasesH: 'عبارات تساعد الزائر على طلب المساعدة',
    phrasesNote: 'اعرض العبارة على من يساعدك أو اقرأها له. اذكر اللغة التي تحتاجها في بداية المكالمة. يوفّر مركز 911 بالمنطقة الشرقية استقبالاً للبلاغات بعدة لغات، دون افتراض توافر كل لغة في جميع القنوات.',
    phrasesSrc: [{ label: 'واس عن خدمات مركز 911 للزوار', href: S.spa911Lang }],
    faqH: 'أسئلة شائعة',
    faqs: [
      { q: 'هل يعمل 911 في الأحساء؟', a: 'نعم، يخدم 911 المنطقة الشرقية، وتشمل الأحساء. استخدمه للخطر المباشر والحالات الطارئة، و997 لطلب الإسعاف مباشرة.' },
      { q: 'هل أستخدم 937 بدل الإسعاف؟', a: 'للحالة التي تهدد الحياة أو تحتاج فرقة إسعافية، اتصل بـ997 أو 911 فوراً. استخدم 937 للاستشارة والتوجيه والخدمات الصحية.' },
      { q: 'ماذا أفعل إذا تعذّر الاتصال من هاتفي؟', a: 'اطلب من شخص قريب أو استقبال الفندق أو أمن الموقع الاتصال فوراً. تدرج المنصة الوطنية 112 رقماً للطوارئ دون شريحة؛ لكنه لا يعني إمكان الاتصال دون وجود شبكة متاحة. لا تدخل منطقة خطرة بحثاً عن إشارة.' },
      { q: 'كيف أجد منشأة صحية مفتوحة الآن؟', a: 'استخدم الخريطة الرسمية لوزارة الصحة أو اتصل بـ937 للحالات غير الإسعافية. لا تعتمد على ساعات العيادات باعتبارها ساعات قسم الطوارئ، ولا على نتائج الخرائط التجارية وحدها لتحديد الخدمة المناسبة.' },
      { q: 'هل أرسل بلاغاً إلى زوروا الأحساء؟', a: 'اتصل بالجهة المختصة مباشرة. مراسلات الموقع مخصصة للملاحظات على الدليل وتصحيح المعلومات، ولا تُراقَب كخدمة طوارئ.' },
    ],
    faqSrc: [{ label: 'أرقام الطوارئ الوطنية', href: S.platform }, { label: 'خدمات 937', href: S.moh937 }, { label: 'الخريطة الصحية الرسمية', href: S.mohMap }],
    keepH: 'احتفظ بهذه المعلومات قبل رحلتك',
    keep: [
      'أرقام 911 و997، واسم سكنك وعنوانه ورقم الاستقبال.',
      'جهة اتصال موثوقة ومسار الرحلات خارج المدن.',
      'وثيقة التأمين وأرقام المساعدة وصورة الوثائق في مكان آمن.',
      'أسماء الأدوية والحساسيات والمعلومات الصحية الضرورية.',
      'خريطة محفوظة وشاحن متنقل ومياه مناسبة لمدة الرحلة.',
    ],
    disclaimer: 'هذه الإرشادات تساعدك على طلب المساعدة، ولا تحل محل تقييم المختصين أو تعليمات فرق الطوارئ. تخضع الخدمات والأرقام للتحديث؛ راجع المصادر الرسمية عند التخطيط للرحلة.',
    srcLabel: 'المصادر:',
    newWindow: '(يفتح في نافذة جديدة)',
    listSep: "، ",
    tocLabel: "محتويات الصفحة",
    mapLink: "الخريطة الرسمية لوزارة الصحة",
    callAria: "اتصل بـ{n} — {who}",
    hospitals: [
      { name: "مستشفى الملك فهد بالهفوف", via: "وزارة الصحة" },
      { name: "مستشفى الأمير سعود بن جلوي", via: "وزارة الصحة" },
      { name: "مستشفى الولادة والأطفال بالأحساء", via: "وزارة الصحة" },
      { name: "مستشفى الملك عبدالعزيز بالأحساء", via: "الشؤون الصحية بوزارة الحرس الوطني" },
    ],
    phraseGloss: [],
  },
  en: {
    seoTitle: 'Emergencies and Help in Al-Ahsa: Ambulance and Security',
    seoDesc: 'Getting help in Al-Ahsa: ambulance, security and service numbers, and what to do after an accident or if you lose your documents during your trip.',
    eyebrow: 'Visitor guide',
    title: 'Emergencies and Help in Al-Ahsa',
    lead: 'A guide for visitors to Al-Ahsa on reaching help in an emergency: the ambulance, security and service numbers, and what to do after an accident or if you lose your documents during the trip.',
    reviewed: 'Information last reviewed: 15 November 2026',
    alertH: 'Immediate danger or an emergency in Al-Ahsa? Call 911. To ask for an ambulance directly, call 997.',
    alertP: [
      'Move away from the danger if you can do so safely, give your location and follow the call handler’s instructions. Do not delay the call to search this page or message the site.',
      'Visit Al-Ahsa is an independent tourism guide. The site’s email, its WhatsApp and the Bulbul assistant are not channels for reporting emergencies.',
    ],
    call: 'Call',
    coreH: 'Main emergency numbers',
    coreHead: ['Situation', 'Number', 'Service'],
    core: [
      { when: 'Immediate danger or an emergency that needs the authorities', n: '911', who: 'Unified Security Operations, Eastern Province' },
      { when: 'Injury or a medical emergency that needs an ambulance', n: '997', who: 'Saudi Red Crescent' },
      { when: 'Fire, someone trapped, or a rescue', n: '998', who: 'Civil Defense' },
      { when: 'Security report, assault or theft', n: '999', who: 'Police' },
      { when: 'Traffic accident', n: '993', who: 'Traffic Police' },
      { when: 'Incident on highways outside the cities', n: '996', who: 'Roads Security' },
      { when: 'Sea or coastal emergency', n: '994', who: 'Border Guards' },
    ],
    coreNote: '911 operates in the Eastern Province, to which Al-Ahsa belongs. The short numbers above are for use inside Saudi Arabia; do not add the country code +966. The Unified National Platform lists 112 for calls without a SIM card (see the FAQs).',
    coreSrc: [{ label: 'National Platform emergency numbers', href: S.platform }, { label: 'SPA on the 911 centre in the Eastern Province', href: S.spa911 }],
    sections: [
      {
        id: 'what-to-say', h: 'What to say when you call',
        steps: [
          { lead: 'Location first', text: 'Al-Ahsa, then the town or village, the district, and the name of the road or landmark and the nearest entrance. On highways, give your direction of travel and the nearest exit or kilometre marker.' },
          { lead: 'What happened', text: 'An accident, an injury, a fire, a missing person, or another danger.' },
          { lead: 'How many people, and their condition', text: 'Is the injured person conscious? Breathing? Is there bleeding, or is anyone trapped? Say what you see, without guessing.' },
          { lead: 'Hazards around you', text: 'Traffic, smoke, electricity, water, or difficult access.' },
          { lead: 'A number to reach you', text: 'Then stay on the line and follow the instructions until you are told to end the call.' },
        ],
        after: [{ text: 'Open your phone’s map to read your coordinates or describe where you are, and share your location through whatever channel the call handler gives you. If you are inside a farm, a park or a rocky passage, give the name of the place, the gate and the nearest point a vehicle can reach. Do not hold off calling until the map loads.' }],
      },
      {
        id: 'medical', h: 'Urgent medical situations',
        paras: [
          { text: 'Call an ambulance on 997 for loss of consciousness, severe difficulty breathing, severe chest pain, heavy bleeding or a serious injury, and also for sudden weakness on one side of the body, a drooping face or slurred speech.' },
          { text: 'Stay with the injured person if the place is safe, and follow the ambulance service’s instructions. Do not drive yourself if your condition could affect your driving. If the person is unresponsive and not breathing normally, tell the call handler at once and switch to speaker so you can follow resuscitation instructions.' },
          { lead: 'For non-emergency medical advice, call 937.', text: 'The Ministry of Health offers medical consultations and poisoning guidance and takes health reports and complaints around the clock. If a life is at risk, call the ambulance first.' },
        ],
        src: [{ label: '937 services', href: S.moh937 }, { label: 'Ministry of Health on stroke', href: S.stroke }],
      },
      {
        id: 'cars', h: 'Car accidents and breakdowns',
        paras: [
          { lead: 'If there are injuries, a fire or immediate danger:', text: 'call 911, and ask for an ambulance on 997 if needed. Move out of the traffic lane if you can do so safely, and do not put yourself at risk to photograph the accident.' },
          { lead: 'For accidents with no injuries:', text: 'contact Najm, the company Najm for Insurance Services, whose official app makes it easier to report traffic accidents, through the app or its customer service on 199033, and ask how to report the accident within its coverage and terms of service. The Unified National Platform lists 920000560 for accidents involving insured vehicles. If the accident is outside Najm’s remit, follow its direction to call the Traffic Police on 993. Keep your ID, driving licence, vehicle registration and insurance details to hand, and tell the rental company if the car is rented.' },
          { lead: 'If you break down with no immediate danger:', text: 'call the roadside assistance service of your insurer or rental company. If the spot where you stopped is unsafe or you are stranded somewhere dangerous, call 911 and give your location and direction of travel.' },
        ],
        src: [{ label: 'Najm app page', href: S.najm }, { label: 'National Platform emergency numbers', href: S.platform }],
      },
      {
        id: 'nature', h: 'Safety outdoors and in the heat',
        subs: [
          {
            h: 'Heat exhaustion and heatstroke',
            paras: [
              { text: 'Plan outdoor outings with rest breaks in the shade or somewhere air-conditioned, drink water regularly as your health allows, and keep an eye on children and older people. Never leave a child in a parked vehicle.' },
              { lead: 'A high body temperature with confusion or fainting is an emergency:', text: 'call 997, move the person somewhere cool if it is safe to do so, and start cooling them with water and cold compresses. Do not give someone with suspected heatstroke anything to drink, and follow the ambulance service’s instructions.' },
            ],
            src: [{ label: 'Ministry of Health on summer heat', href: S.heat }, { label: 'Heatstroke first aid', href: S.heatstroke }],
          },
          {
            h: 'Rain, flash floods and dust',
            paras: [
              { text: 'Check the National Center for Meteorology’s alerts before you go out, especially for exposed sites and roads outside the cities. Keep away from low ground and flood channels, and do not cross running water by car or on foot. When visibility drops, slow down and, if you need to, stop somewhere safe off the road.' },
              { text: 'If water cuts you off or you face immediate danger, call 911 and give your location. Keep children away from standing water and flood channels.' },
            ],
            src: [{ label: 'National Center for Meteorology', href: S.ncm }, { label: 'Civil Defense guidance during rain', href: S.rain }],
          },
          {
            h: 'Farms, lakes, caves and the coast',
            paras: [
              { text: 'Stay on open paths and follow the site management’s instructions, and avoid climbing rocks or entering closed passages. Keep children close around irrigation channels, lakes and wells. Do not go into the water or try to rescue someone if doing so puts you at risk of drowning; call for help at once. For coastal and sea emergencies, use 994 or 911.' },
              { text: 'Before a trip outside populated areas, share your route and expected return time with someone you trust, and carry water, a power bank and an offline map. If you get lost, avoid wandering; work out where you are and ask for help. Do not assume there is phone coverage everywhere.' },
            ],
          },
        ],
      },
      {
        id: 'poison', h: 'Poisoning, bites and stings',
        paras: [
          { lead: 'If you suspect someone has swallowed a poisonous substance or the wrong dose of a medicine:', text: 'get medical guidance at once through 937, and call 997 if they lose consciousness, have difficulty breathing or have severe symptoms. Keep the name or container of the substance and note the time of exposure and the approximate amount, if known. Do not try to make them vomit.' },
          { lead: 'Snake bite or scorpion sting:', text: 'call an ambulance on 997 at once. Keep the person calm and follow the call handler’s instructions. For a snake bite, do not tie off the limb, cut the bite or suck out the venom. Do not try to catch the animal.' },
        ],
        src: [{ label: '937 services and poisoning guidance', href: S.moh937 }, { label: 'Ministry of Health on bites and stings', href: S.bites }],
      },
      {
        id: 'fire', h: 'Fire, gas leaks and electrical hazards',
        paras: [
          { text: 'Leave through a safe exit and warn the people around you without putting yourself in danger, then call 911 from a safe place, or Civil Defense directly on 998. Follow the evacuation plan and staff instructions, and do not go back into the danger zone for your belongings.' },
          { text: 'If you suspect a gas leak, move away and do not light a flame or use switches or appliances in the affected area, and call 911 from a safe place. If you see a fallen cable or another electrical hazard, do not touch it or go near any water around it; call 911 if there is an immediate threat, and 933 to report electricity faults.' },
        ],
      },
      {
        id: 'lost', h: 'A missing child or person, or lost documents',
        paras: [
          { lead: 'A missing child, or a missing person who needs care:', text: 'tell the site’s security at once and call 911. Have ready a description of their clothes, their age, a recent photo, and where and when they were last seen. Do not wait to finish searching yourself if anyone’s safety is at risk, and follow the authorities’ directions.' },
          { lead: 'Lost passport or documents:', text: 'contact the police on 999 to be directed to the reporting procedure, and contact your country’s embassy or consulate through its official website for guidance on replacement documents and travel. Keep the report number, and tell your airline or transport company if the loss affects your journey.' },
          { lead: 'Lost bank card or phone:', text: 'block the card through your bank at once, use your phone platform’s device-lock service, and contact your mobile operator if needed. If it was stolen, report it to the police, and never share verification codes with anyone who claims to have found your belongings.' },
          { lead: 'Lost belongings with no danger involved:', text: 'start with the hotel reception, site security or the transport company, and give a clear description, the time of the loss and a way to contact you.' },
        ],
      },
    ],
    hospH: 'Hospitals and health centres in Al-Ahsa',
    hospIntro: [
      { lead: 'In a serious case, call an ambulance and let the medical team choose where to take the patient.', text: 'Being the nearest hospital does not make it the right one for the case.' },
      { text: 'To find a health facility and its hours, use the Ministry of Health’s official map, select Al-Ahsa and the type of service you need, or ask for directions on 937. Health centres and clinics keep different hours from emergency departments.' },
    ],
    hospListH: 'Hospitals in Al-Ahsa include',
    hospAfter: [
      { text: 'This list is for reference only. It is not ordered by distance and does not guarantee that a particular specialty is available or that a particular insurance is accepted. For non-emergencies, check where to go and what services are currently offered through the official map or 937.' },
      { lead: 'Pharmacies and medicines:', text: 'ask a pharmacist or 937 about what you need, and check the pharmacy’s hours before you go. Keep the generic name of your medicine and your prescription, and avoid switching medicines for chronic conditions without advice.' },
      { lead: 'Visitors from outside Saudi Arabia:', text: 'keep a copy of your passport, your insurance policy, your insurer’s assistance numbers and a list of your medicines and allergies. Coverage and approvals vary by policy and facility; never delay calling an ambulance to sort out insurance.' },
    ],
    servH: 'Help and service numbers',
    servIntro: 'These lines are for services, enquiries and specialist reports. If people are in immediate danger, start with 911.',
    services: [
      { who: 'Ministry of Health', n: '937', when: 'Medical advice, directions and health reports' },
      { who: 'Unified Tourism Center', n: '930', when: 'Help and complaints about tourism services' },
      { who: 'Najm (customer service)', n: '199033', when: 'Enquiries and directing vehicle accident reports within its coverage' },
      { who: 'Najm (insured vehicle accidents)', n: '920000560', when: 'Accidents involving insured vehicles (a number listed by the Unified National Platform)' },
      { who: 'Balady', n: '940', when: 'Municipal service reports' },
      { who: 'Electricity emergencies', n: '933', when: 'Faults and hazards on the power network' },
      { who: 'Water reports', n: '931', when: 'Water supply problems and leaks' },
      { who: 'Ministry of Commerce', n: '1900', when: 'Reporting commercial violations' },
    ],
    servNote: 'Keep your booking or invoice number and the name of the business when you make a tourism or commercial complaint.',
    servSrc: [{ label: 'National Platform', href: S.platform }, { label: 'Ministry of Tourism', href: S.tourism }, { label: 'National Water Company', href: S.nwc }, { label: 'Najm', href: S.najm }],
    phrasesH: 'Phrases to help you ask for help',
    phrasesNote: 'Show the phrase to whoever is helping you, or read it out. Say which language you need at the start of the call. The 911 centre in the Eastern Province takes reports in several languages, but do not assume every language is available on every channel.',
    phrasesSrc: [{ label: 'SPA on 911 services for visitors', href: S.spa911Lang }],
    faqH: 'Frequently asked questions',
    faqs: [
      { q: 'Does 911 work in Al-Ahsa?', a: 'Yes. 911 serves the Eastern Province, which includes Al-Ahsa. Use it for immediate danger and emergencies, and 997 to call an ambulance directly.' },
      { q: 'Should I call 937 instead of an ambulance?', a: 'If a life is at risk or an ambulance crew is needed, call 997 or 911 at once. Use 937 for advice, directions and health services.' },
      { q: 'What if I cannot call from my phone?', a: 'Ask someone nearby, the hotel reception or site security to call at once. The National Platform lists 112 as an emergency number without a SIM card, but that does not mean you can call without an available network. Do not go into a dangerous area looking for a signal.' },
      { q: 'How do I find a health facility that is open now?', a: 'Use the Ministry of Health’s official map, or call 937 for non-emergencies. Do not treat clinic hours as emergency department hours, and do not rely on commercial map results alone to choose the right service.' },
      { q: 'Should I report an emergency to Visit Al-Ahsa?', a: 'Contact the relevant authority directly. Messages to the site are for feedback on the guide and corrections, and are not monitored as an emergency service.' },
    ],
    faqSrc: [{ label: 'National emergency numbers', href: S.platform }, { label: '937 services', href: S.moh937 }, { label: 'Official health facilities map', href: S.mohMap }],
    keepH: 'Keep this information before your trip',
    keep: [
      'The numbers 911 and 997, and the name, address and reception number of where you are staying.',
      'A trusted contact, and the route of any trips outside the cities.',
      'Your insurance policy, its assistance numbers and copies of your documents, kept somewhere safe.',
      'The names of your medicines, your allergies and any essential health information.',
      'An offline map, a power bank and enough water for the length of the trip.',
    ],
    disclaimer: 'This guidance helps you ask for help; it does not replace assessment by professionals or the instructions of emergency teams. Services and numbers change, so check the official sources when planning your trip.',
    srcLabel: 'Sources:',
    newWindow: '(opens in a new window)',
    listSep: ", ",
    tocLabel: "On this page",
    mapLink: "Ministry of Health official map",
    callAria: "Call {n}, {who}",
    hospitals: [
      { name: "King Fahad Hospital, Hofuf", via: "Ministry of Health" },
      { name: "Prince Saud bin Jalawi Hospital", via: "Ministry of Health" },
      { name: "Maternity and Children’s Hospital, Al-Ahsa", via: "Ministry of Health" },
      { name: "King Abdulaziz Hospital, Al-Ahsa", via: "Ministry of National Guard Health Affairs" },
    ],
    phraseGloss: [],
  },
};
