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
