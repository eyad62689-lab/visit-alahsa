// أطباق المطبخ الأحسائي — كانت محبوسة داخل FoodView.astro فأُخرجت هنا
// (دفعة 3 — 2026-08-29) على سابقة events.ts: مصدر واحد للعرض ولأي صفحات
// مفردة مستقبلاً. الصور مقصوصة من لوحة إياد (2026-07-10) في public/img/food.
//
// قاعدة ملزمة: لا تُختلق معلومة — الأوصاف تعريفية بمكوّنات الأطباق المعروفة،
// بلا مواعيد ولا رسوم ولا ادّعاءات تاريخية غير موثقة. أزيلت عناوين المجموعات
// بطلب إياد (2026-07-13) — التصنيف على بطاقة كل طبق (طبق رئيسي/حلى/خبز).
//
// «الخبز الأحمر» = خبز التمر نفسه، اسمان لطبقٍ واحد (تأكيد إياد 2026-08-30).
// أُثبت مرادفاً على بطاقة خبز التمر لا طبقاً تاسعاً، لأن أسئلة «خطط لرحلتك»
// كانت تذكره فيبدو طبقاً مفقوداً من صفحة الأكلات.

export type Dish = { img: string; alt: string; k: string; name: string; pre: string; };
export type DishGroup = { title: string; dishes: Dish[] };

export const DISH_GROUPS_AR: DishGroup[] = [
  {
    /* أزيلت عناوين المجموعات («أطباق رئيسية» و«حلويات ومعجنات بالتمر») بطلب
       إياد (2026-07-13) — التصنيف يظهر على بطاقة كل طبق (طبق رئيسي/حلى/خبز) */
    title: '',
    dishes: [
      { img: '/img/food/hasawi-rice-v2', alt: 'قِدر الأرز الأحسائي يُقلَّب على نار الحطب', k: 'طبق رئيسي', name: 'الأرز الأحسائي',
        pre: 'من أشهر أطباق الأحساء: أرزٌ أحسائي محلي يُطهى مع اللحم أو الدجاج وصلصة الطماطم والبهارات (لومي وقرفة وهيل) حتى يكتسب لونه البني المحمّر ونكهته الغنية. يُقدَّم في المناسبات وموائد الضيافة.' },
      { img: '/img/food/mandi-v2', alt: 'صحن المندي بجوار فوهة التنور المتّقدة', k: 'طبق رئيسي', name: 'المندي',
        pre: 'في الأحساء، المندي لا يُطهى … بل يُستودَع في باطن الأرض كما تُستودَع الأسرار. لحمٌ يتشرّب أنفاس التنور الطيني ساعاتٍ طوال، وأرزٌ يحمل عبق النخيل والدخان، ليقدَّم إليك طبقًا يروي حكاية واحةٍ عرفت الكرم قبل أن تعرفه الكلمات.' },
      { img: '/img/food/harees-v3', alt: 'قِدر الهريس يُقلَّب على نار الحطب', k: 'طبق رئيسي', name: 'الهريس',
        pre: 'حين يمتزج القمح باللحم حتى يصيرا روحًا واحدة، يولد الهريس. طبق الكرم الأول في ولائم الأحساء وأفراحها، ورفيق موائد رمضان منذ القدم.' },
      { img: '/img/food/mufallaq-v2', alt: 'قِدر المفلق بالجريش والتمر يُطهى على نار الحطب في الواحة', k: 'طبق رئيسي', name: 'المفلق',
        pre: 'من الأطباق التراثية الأحسائية: قمحٌ مجروش (جريش) يُطهى بالبهارات ويُنكَّه باللومي، ثم يُزيَّن بالتمر والبيض المسلوق. طبقٌ دسمٌ يجمع نكهات الواحة.' },
      { img: '/img/food/balaleet-v2', alt: 'تحميص شعيرية البلاليط على نار الحطب مع مقلاة العجة', k: 'حلى', name: 'البلاليط بالدبس',
        pre: 'شعيريةٌ ذهبية معطّرة بالزعفران والهيل، تتحلّى على الطريقة الأحسائية بدبس التمر؛ فمن أرضٍ هي عاصمة النخيل، يأتي الحلا من التمر ذاته.' },
      { img: '/img/food/date-asida-v2', alt: 'صحن عصيدة التمر وحفرة الدبس في وسطها مع التمر والدلة', k: 'حلى', name: 'عصيدة التمر',
        pre: 'تمرُ الأحساء ذاته يذوب مع دقيق البرّ على نارٍ هادئة، وتُقلَّب العصيدة بصبرٍ حتى تتماسك وتلمع بالزعفران، ثم تُتوَّج بالسمن ورشّة فلفلٍ أسود تُشعل دفأها. حلا الشتاء الأحسائي الذي تلتفّ حوله العائلة في الليالي الباردة.' },
      { img: '/img/food/sago', alt: 'الساقو مزيّناً بالجوز والفستق', k: 'حلى', name: 'الساقو',
        pre: 'حبيباتٌ صغيرة تذوب على النار حتى تصير جوهرًا شفافًا يتلألأ بالزعفران والهيل. حلوى الأحساء التي تتصدّر موائد رمضان، رقيقةُ القوام، عريقةُ الحضور، توارث أهل الواحة طريقة إعدادها.' },
      { img: '/img/food/date-bread-v2', alt: 'خبز التمر على الصاج أمام فرن الطين المشتعل', k: 'خبز', name: 'خبز التمر',
        pre: 'خبزٌ محليٌّ يُعجن أو يُحشى بمعجون التمر ويُرشُّ بحبّة البركة (الحبّة السوداء)، فيجمع بين طيّبِ الخبز وحلاوةِ التمر. يُقدَّم مع القهوة العربية. ويُسمّى أيضاً «الخبز الأحمر».' },
    ],
  },
];

export const DISH_GROUPS_EN: DishGroup[] = [
  {
    title: '',
    dishes: [
      { img: '/img/food/hasawi-rice-v2', alt: 'Hasawi rice stirred in a clay pot over a wood fire', k: 'Main dish', name: 'Hasawi Rice',
        pre: 'One of Al-Ahsa’s best-known dishes: local Hasawi rice cooked with meat or chicken, tomato sauce and spices (dried lime, cinnamon, cardamom) until it takes on its reddish-brown colour and rich flavour. Served at celebrations and on tables of hospitality.' },
      { img: '/img/food/mandi-v2', alt: 'A mandi dish beside a glowing tannour pit', k: 'Main dish', name: 'Mandi',
        pre: 'In Al-Ahsa, mandi is not so much cooked as entrusted to the earth, the way secrets are. Meat draws in the breath of the clay tannour for long hours, and rice carries the scent of palm and smoke — a dish that tells the story of an oasis that knew generosity before it had words for it.' },
      { img: '/img/food/harees-v3', alt: 'A pot of harees stirred over a wood fire', k: 'Main dish', name: 'Harees',
        pre: 'When wheat and meat blend for long hours until they become a single soul, harees is born. The foremost dish of generosity at Al-Ahsa’s banquets and weddings, and a long-standing companion of Ramadan tables.' },
      { img: '/img/food/mufallaq-v2', alt: 'A pot of mufallaq — cracked wheat with dates — cooking over a wood fire in the oasis', k: 'Main dish', name: 'Mufallaq',
        pre: 'A traditional Hasawi dish of cracked wheat (jareesh) cooked with spices and dried lime, then garnished with dates and boiled eggs — a hearty plate gathering the flavours of the oasis.' },
      { img: '/img/food/balaleet-v2', alt: 'Balaleet vermicelli toasting over a wood fire beside an omelette pan', k: 'Sweet', name: 'Balaleet with Date Syrup',
        pre: 'Golden vermicelli scented with saffron and cardamom, sweetened the Hasawi way with date syrup; from a land that is the capital of the palm, the sweetness comes from the date itself.' },
      { img: '/img/food/date-asida-v2', alt: 'A plate of date asida with a well of dibs at its centre, with dates and a coffee pot', k: 'Sweet', name: 'Date Asida',
        pre: 'Al-Ahsa’s own dates melt into wheat flour over a gentle flame, stirred patiently until the asida thickens and gleams with saffron, then crowned with ghee and a scatter of black pepper that kindles its warmth. The Hasawi winter sweet a family gathers around on cold nights.' },
      { img: '/img/food/sago', alt: 'Sago garnished with walnuts and pistachios', k: 'Sweet', name: 'Sago',
        pre: 'Small grains that melt over the flame until they turn into a translucent jewel shimmering with saffron and cardamom. The Al-Ahsa sweet that heads Ramadan tables — delicate in texture, long-established in presence, its preparation handed down among the people of the oasis.' },
      { img: '/img/food/date-bread-v2', alt: 'Date bread on a griddle before a glowing clay oven', k: 'Bread', name: 'Date Bread',
        pre: 'A local bread kneaded or filled with date paste and sprinkled with black seed (nigella), uniting good bread with the sweetness of dates. Served with Arabic coffee. Also known as “red bread” (khubz ahmar).' },
    ],
  },
];

// النسخة الصينية — خط zh-translation-pipeline حصراً (دفعة food-map 2026-09-02،
// الحاكم 94/100 بعد القارئ الأعمى). الاقتران «红面包»/椰枣面包 على البطاقة نفسها (C5b).
export const DISH_GROUPS_ZH: DishGroup[] = [
  {
    title: '',
    dishes: [
      { img: '/img/food/hasawi-rice-v2', alt: '柴火上翻搅陶锅中的哈萨焖饭', k: '主菜', name: '哈萨焖饭',
        pre: '哈萨最负盛名的菜肴之一：本地哈萨大米配肉类或鸡肉，与番茄酱汁和香料（干青柠、肉桂、小豆蔻）同锅慢火焖煮，直至染上红褐色泽、滋味浓郁。节庆宴席与待客的餐桌上，总少不了它。' },
      { img: '/img/food/mandi-v2', alt: '一盘曼迪，旁边是炭火正旺的泥炉', k: '主菜', name: '曼迪',
        pre: '在哈萨，曼迪（Mandi）与其说是烹煮，不如说是像秘密一样托付给大地：肉在坦努尔泥炉深处静置数小时，吸足炉火的热气与烟香；米饭则浸染着椰枣树与炊烟交织的气息。端上桌的这一盘，便是这片绿洲自古好客的见证。' },
      { img: '/img/food/harees-v3', alt: '柴火上翻搅的一锅哈里斯', k: '主菜', name: '哈里斯',
        pre: '当小麦与肉经过漫长的文火熬煮，融为一体、难分彼此，哈里斯（Harees）便由此诞生。它是哈萨宴席与婚礼上的待客首选，也是斋月餐桌上相伴已久的老味道。' },
      { img: '/img/food/mufallaq-v2', alt: '绿洲柴火上炖煮的一锅碎麦椰枣穆法拉格', k: '主菜', name: '穆法拉格',
        pre: '哈萨的传统菜式穆法拉格（Mufallaq）：碎麦（jareesh）与香料同煮，以干青柠提味增香，再缀上椰枣与水煮蛋——厚实丰盛的一盘，将绿洲的种种风味收于一处。' },
      { img: '/img/food/balaleet-v2', alt: '柴火上烘炒巴拉利特细面，一旁是煎蛋锅', k: '甜点', name: '椰枣糖浆巴拉利特',
        pre: '巴拉利特（Balaleet）：金黄的细面浸润着藏红花与小豆蔻的芬芳，再按哈萨的传统淋上椰枣糖浆——在这座椰枣之都，甜味本就来自椰枣。' },
      { img: '/img/food/date-asida-v2', alt: '一盘椰枣阿西达，中央凹陷处盛着椰枣糖浆，旁边是椰枣与阿拉伯咖啡壶', k: '甜点', name: '椰枣阿西达',
        pre: '哈萨本地的椰枣与小麦面粉在文火上慢慢交融，耐心搅拌至稠滑光亮、泛着藏红花的色泽，最后浇上酥油，再撒一撮黑胡椒，暖意顿生。这道椰枣阿西达（Asida）是哈萨的冬日甜点——寒夜里，一家人围坐着分食一盘。' },
      { img: '/img/food/sago', alt: '缀以核桃与开心果的西米羹', k: '甜点', name: '西米羹',
        pre: '细小的西米在火上慢慢煮至晶莹剔透，化作透亮的甜羹，透着藏红花的色泽、小豆蔻的清香。这道当地称作“萨古”（Sago）的甜点是哈萨斋月餐桌上的主角——口感细腻、历史悠久，做法在绿洲人家代代相传。' },
      { img: '/img/food/date-bread-v2', alt: '炉火正旺的泥炉前，烤盘上的椰枣面包', k: '面包', name: '椰枣面包',
        pre: '一种本地面包：把椰枣泥揉进面团或作为馅料，再撒上黑种草籽，让面包的麦香与椰枣的甘甜合为一体，配阿拉伯咖啡最是相宜。当地也称它为“红面包”（khubz ahmar）。' },
    ],
  },
];
