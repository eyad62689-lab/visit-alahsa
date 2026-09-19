// بيانات ثمار الواحة — كانت محبوسة داخل FruitsView.astro (~230 سطراً لكل لغة
// ضمن كتلة C) فأُخرجت هنا (دفعة 3 — 2026-08-29) على سابقة events.ts: مصدر واحد
// يقرأه العرض اليوم وأي صفحات مفردة مستقبلاً.
//
// قاعدة ملزمة: لا تُختلق معلومة. المصدران: مسودتا بحث إياد (compass + docx)،
// والصور من لوحتيه مقصوصةً في public/img/fruits. ما لم يتأكد يحمل وسم
// «بانتظار التأكيد» (namePending/seasonPending) ويظهر الوسم للقارئ. حُذف
// البرتقال (لا يُزرع في الأحساء)، والرمان السواري موسوم «شبه منقرض» بلا موسم
// بطلب إياد. رُوجعت المعلومات في يوليو 2026م.

export type Fruit = {
  img?: string; alt?: string;      // صورة حقيقية (مسار بلا امتداد) + بديلها
  k: string; name: string;
  namePending?: boolean;           // وسم «بانتظار التأكيد» بجانب الاسم
  rare?: boolean;                  // وسم «شبه منقرض»
  season: string; seasonPending?: boolean;
  seasons?: string;                // فصول الفلترة: winter spring summer autumn
  pre: string; sci?: string; post?: string; // نص البطاقة (sci = اسم علمي لاتيني)
};
export type Group = { title: string; intro?: string; introTagged?: string; fruits: Fruit[] };

export const FRUIT_GROUPS_AR: Group[] = [
  {
    title: 'التمور — تاج الواحة',
    intro: 'التمور هي المحصول الأول في الأحساء؛ تتفاوت التقارير الرسمية في تقدير إنتاجها السنوي بين نحو 100 و120 ألف طن، فيما ذكرت وكالة الأنباء السعودية «واس» (أكتوبر 2024م) ما يتجاوز 200 ألف طن. وتُعدّ الواحة من أكبر بنوك الأصول الوراثية للنخيل في العالم: سجّل مركز النخيل والتمور بالأحساء رقماً قياسياً في غينيس عام 2021م بضمّه أكثر من 127 صنفاً وطنياً ودولياً. وتشير مصادر إلى أن الخلاص والشيشي والرزيز تشكّل معاً نحو ثلاثة أرباع الإنتاج.',
    fruits: [
      {
        img: '/img/fruits/khalas-v2', alt: 'رطب الخلاص الذهبي وتمره الكهرماني في وعاءين متجاورين على طبق واحد',
        k: 'التمور', name: 'الخلاص',
        season: 'رطباً: منتصف يوليو – أواخر أغسطس • تمراً: نحو 15–25 سبتمبر', seasons: 'summer autumn',
        pre: 'أيقونة تمور الأحساء وأشهرها على الإطلاق، وصاحب النسبة الكبرى من المبيعات، ويشكّل ما بين 15 و20٪ من نخيل الواحة. ثمرته بيضوية متوسطة الحجم قليلة الألياف، ذات لون ذهبي مائل إلى الكهرماني، وقوام طري ونكهة عطرية حلوة متوازنة. يحتفظ بنكهته حتى بعد التخزين الطويل، ويُقدَّم عادة مع القهوة العربية رمزاً للكرم والضيافة، وهو غني بمعادن كالزنك والمنغنيز والسيلينيوم.',
      },
      {
        img: '/img/fruits/shishi-v2', alt: 'رطب الشيشي الأصفر وتمره البني في طبق تقديم واحد',
        k: 'التمور', name: 'الشيشي',
        season: 'رطباً: أواخر يونيو • تمراً: منتصف – أواخر أغسطس', seasons: 'summer',
        pre: 'ثاني أشهر أصناف الأحساء وأكثرها طلباً بعد الخلاص. يتميز بحجمه الكبير وقوامه السميك الطري نسبياً، ولونه البني الغالب مع قاعدة صفراء ذهبية، وطعمه شديد الحلاوة. يصمد طويلاً دون أن يفسد، ما يجعله مناسباً للتخزين والتجميد لاستهلاكه على مدار العام، ويدخل في صناعة الدبس (عسل التمر) والمنتجات المشتقة.',
      },
      {
        img: '/img/fruits/raziz-tamr-v2', alt: 'كرات السفسيف بالسمسم من تمر الرزيز في وعاء نحاسي',
        k: 'التمور', name: 'الرزيز',
        season: 'تمراً: متأخر الموسم، نحو مطلع أكتوبر', seasons: 'autumn',
        pre: 'من أعرق تمور الأحساء وأشهرها قديماً، ويوصف بأنه من أفضل الأصناف وأغناها غذائياً. يُصنع منه «السفسيف» — حلوى شتوية شهيرة من الرزيز مع الدبس والسمسم تُقدَّم في مجالس الضيافة — إضافة إلى الدبس. أصبح اليوم من التمور النادرة نسبياً بعدما توجّه معظم المزارعين إلى زراعة الخلاص.',
      },
      {
        img: '/img/fruits/barhi', alt: 'عذق البرحي الأصفر متدلياً بين سعف النخلة',
        k: 'التمور', name: 'البرحي',
        season: 'رطباً: صيفاً', seasons: 'summer',
        pre: 'من أشهر أنواع الرطب في الأحساء والعالم العربي؛ أصله عراقي دخل الأحساء والقصيم في أواخر القرن التاسع عشر. يتميز بحلاوته الفائقة وقوامه الطري وخلوّه من المرارة القابضة حتى في مرحلة البلح (البسر) الأصفر، فيُؤكل في مراحله الثلاث: بلحاً ورطباً وتمراً، ويتحول لونه من الأخضر إلى الأصفر ثم الكهرماني عند النضج.',
      },
      {
        img: '/img/fruits/bawakir-v2', alt: 'أوعية رطب متنوعة: الغر والخنيزي والشهل',
        k: 'التمور', name: 'البواكير والأصناف المحلية',
        season: 'رطباً وتمراً: من أواخر مايو حتى أكتوبر', seasons: 'spring summer autumn',
        pre: 'إلى جانب الأصناف الكبرى تزخر الواحة بعشرات الأصناف المحلية التي تفتتح الموسم أو تختمه: الطيار والمجناز والغر تفتتح البواكير، ثم الخنيزي فالشيشي فالخلاص، ويمتد الرطب المتأخر كأم رحيم والزاملي والهلالي حتى منتصف أغسطس. وتُضاف إليها أصناف كالشبيبي والشهل والوصيلي والحاتمي والكاسبي وغيرها.',
      },
    ],
  },
  {
    title: 'الحمضيات',
    fruits: [
      {
        img: '/img/fruits/lomi-v2', alt: 'حبات اللومي الأحسائي الأخضر مع نصف ثمرة',
        k: 'الحمضيات', name: 'اللومي الأحسائي (البن زهيري)',
        season: 'صيفاً: من منتصف يونيو', seasons: 'summer',
        pre: 'المنتج الزراعي الثاني في الأحساء بعد التمور. ثمرته صغيرة خضراء داكنة رقيقة القشرة غزيرة العصير، بطعم حمضي قوي ورائحة عطرية نفّاذة تميّزه عن سائر الحمضيات. تنتشر في الواحة أكثر من 100 ألف شجرة لومي مثمرة؛ إذ تنتج الشجرة الواحدة ما بين 25 و30 كيلوغراماً في الموسم. وترتبط به عادة أحسائية صيفية أصيلة: تجتمع الأسر لعصره وتخزينه («الجميد» أو اللومي المشمّس) لاستعماله طوال العام. وتحتفي به المحافظة سنوياً في «معرض اللومي الحساوي» الذي تنظمه غرفة الأحساء بالشراكة مع هيئة تطوير الأحساء.',
      },
      {
        img: '/img/fruits/atranj-v2', alt: 'ثمار الأترنج الخضراء المجعّدة القشرة',
        k: 'الحمضيات', name: 'الأترنج (الأترج)',
        season: 'شتاءً: من يناير إلى بداية مارس', seasons: 'winter',
        pre: 'من الحمضيات العريقة، ثمرته كبيرة معطّرة، سميكة القشرة مجعّدة السطح.',
      },
    ],
  },
  {
    title: 'فواكه الصيف',
    fruits: [
      {
        img: '/img/fruits/melon-v2', alt: 'ثمار البطيخ الأحسائي وشريحة مقطوعة',
        k: 'فواكه الصيف', name: 'البطيخ الأحسائي الأصفر',
        season: 'صيفاً: من نحو أواخر مايو', seasons: 'summer',
        pre: 'موروث زراعي وثقافي توارثه المزارعون عبر الأجيال؛ سلالة محلية تكوّنت بالانتخاب الزراعي والاحتفاظ بالبذور المتفوقة، فاكتسبت لونها الأصفر المميز وقدرتها على تحمل حرارة الأحساء وشح المياه. طعمه حلو ورائحته عطرية، وهو غني بالماء والألياف وفيتامين C والبوتاسيوم والكاروتينات، منخفض السعرات، ويساعد على ترطيب الجسم صيفاً.',
      },
      {
        img: '/img/fruits/fig', alt: 'ثمار التين الأحسائي ونصف ثمرة يظهر لبّها',
        k: 'فواكه الصيف', name: 'التين الأحسائي',
        season: 'صيفاً', seasons: 'summer',
        pre: 'فاكهة صيفية محبّبة، أشهر أنواعها في الأحساء المائل إلى الأخضر الفاتح الليموني، وحجم التينة بقدر اللقمة. طعمها سكري وقوامها طري، وتتميز بأنها — بخلاف كثير من أنواع التين — لا تفسد سريعاً. تُزرع غالباً متفرقةً داخل مزارع النخيل بجانب اللومي والرمان لا في بساتين مستقلة، ولذلك لا تتوفر إحصائية دقيقة بعدد أشجارها. يحفظها بعض المزارعين مجففةً، وهي ثمرة مباركة ذُكرت في القرآن الكريم.',
      },
      {
        img: '/img/fruits/bambar-v2', alt: 'حبات البمبر',
        k: 'فواكه الصيف', name: 'البمبر الأحسائي',
        season: 'صيفاً: نحو يوليو وأغسطس', seasons: 'summer',
        pre: 'فاكهة تراثية يعشقها كبار السن، اسمها العلمي ',
        sci: 'Cordia myxa',
        post: ' وتُعرف أيضاً بالسبستان والمخيط والهمبو. ثمرتها بيضوية صغيرة يتحول لونها من الأخضر إلى الأصفر أو البني عند النضج، ومذاقها حلو ولبّها لزج جداً حتى صار يُضرب به المثل في اللزوجة. تُؤكل طازجة، وتُستخدم تقليدياً في العلاجات الشعبية للجهاز الهضمي.',
      },
      {
        img: '/img/fruits/grapes-v2', alt: 'عنقود عنب أحسائي',
        k: 'فواكه الصيف', name: 'العنب الأحسائي',
        season: 'صيفاً: من مطلع الصيف', seasons: 'summer',
        pre: 'عنب محلي صغير الحبّات يحتوي على البذور، يوصف بطعمه الرائع رغم صغر حجمه، ويأتي بنوعيه الأحمر والأخضر. يبدأ إنتاجه مع موسم الصيف إلى جانب اللومي والتين والرطب. غير أنه — بحسب مزارعين وباعة نقلت عنهم الصحافة المحلية — تراجع إنتاجه كثيراً وبات مهدداً بالانقراض بسبب قلة المياه وتناقص المساحات المزروعة.',
      },
      {
        img: '/img/fruits/pomegranate-v2', alt: 'رمان سواري ونصف ثمرة يتلألأ حبّها الأحمر',
        k: 'فواكه الصيف', name: 'الرمان الأحسائي (السّواري)', rare: true,
        season: '', seasons: 'summer autumn',
        pre: 'من الفواكه المحلية العريقة، ويُطلق على الحبّة الكبيرة منه اسم «السّواري»، ويمتاز بحلاوته الشديدة حتى إنه يتشقق منها، وبزهوِّ لونه. كان يُزرع سابقاً بكثافة في الواحة إلى جانب التين واللومي، لكن إنتاجه — كمثل عدد من فواكه الأحساء التقليدية — تراجع كثيراً حتى بات شبه منقرض من بساتين الواحة، فالعثور عليه اليوم نادر.',
      },
      {
        img: '/img/fruits/papaya-v2', alt: 'ثمرة بابايا ونصف ثمرة يظهر لبّها البرتقالي',
        k: 'فواكه الصيف', name: 'البابايا',
        season: 'صيفاً: من يونيو إلى أغسطس', seasons: 'summer',
        pre: 'فاكهة استوائية برتقالية اللب حلوة المذاق، تثمر في بساتين الواحة صيفاً.',
      },
    ],
  },
  {
    title: 'فواكه الربيع والشتاء',
    fruits: [
      {
        img: '/img/fruits/mulberry-v2', alt: 'كومة توت أحسائي أحمر وأسود',
        k: 'فواكه الربيع', name: 'التوت الأحسائي',
        season: 'ربيعاً: نحو أبريل، وموسمه لا يتجاوز شهراً', seasons: 'spring',
        pre: 'فاكهة ربيعية قصيرة الموسم تطل مع نهاية موجات البرد، بحبيباتها الصغيرة شبه الكروية وألوانها الحمراء والسوداء والزرقاء، والأحمر والأسود هما الغالبان في مزارع الأحساء. يكثر الطلب عليها لقصر موسمها، وتُؤكل طازجة وتدخل في الحلويات والمثلجات والعصائر والمربيات، وتُحفظ مجمدة بعد الموسم. وتُعدّ زراعتها من الزراعات الواعدة اقتصادياً في الواحة.',
      },
      {
        img: '/img/fruits/kanar', alt: 'حبات الكنار',
        k: 'فواكه الشتاء', name: 'الكنار الأحسائي (النبق)',
        season: 'شتاءً: من نحو يناير حتى نهاية مارس', seasons: 'winter spring',
        pre: 'فاكهة شتوية عريقة مصدرها شجرة السدر المذكورة في القرآن الكريم. ظلت الواحة محضنها الخصب، ولها أنواع متعددة: «التفاحي» بحجم التفاح، و«أم صليم» الصغير بلا نوى، و«الصيني» الكبير الأخضر، إضافة إلى الكمثري والهندي. طعمها حلو محبّب خصوصاً للأطفال، ولا تُخزّن طويلاً، ويرتبط شراؤها في الأسواق بأهازيج شعبية خاصة.',
      },
    ],
  },
];

export const FRUIT_GROUPS_EN: Group[] = [
  {
    title: 'Dates — crown of the oasis',
    intro: "Dates are Al-Ahsa’s foremost crop; official reports place annual production between roughly 100,000 and 120,000 tonnes, while the Saudi Press Agency (October 2024) reported more than 200,000 tonnes. The oasis holds one of the world’s largest palm gene banks: in 2021 the Palms and Dates Center in Al-Ahsa set a Guinness record with more than 127 national and international cultivars. Some sources suggest that Khalas, Shishi and Razeez together account for about three-quarters of production.",
    fruits: [
      {
        img: '/img/fruits/khalas-v2', alt: 'Golden Khalas rutab and amber tamr dates in two bowls on one platter',
        k: 'Dates', name: 'Khalas',
        season: 'Rutab: mid-July – late August • Full dates: c. 15–25 September', seasons: 'summer autumn',
        pre: "The icon of Al-Ahsa dates and its most famous variety, the top seller, making up 15–20% of the oasis’s palms. The fruit is oval and medium-sized with little fibre, golden to amber in colour, soft in texture, with a balanced, aromatic sweetness. It keeps its flavour even after long storage, is traditionally served with Arabic coffee as a symbol of generosity and hospitality, and is rich in minerals such as zinc, manganese and selenium.",
      },
      {
        img: '/img/fruits/shishi-v2', alt: 'Yellow Shishi rutab and brown tamr dates together on one serving plate',
        k: 'Dates', name: 'Shishi',
        season: 'Rutab: late June • Full dates: mid–late August', seasons: 'summer',
        pre: "Al-Ahsa’s second most famous variety, the most sought-after after Khalas. Large fruit with a relatively soft, thick texture, mostly brown with a golden-yellow base, and intensely sweet. It keeps for a long time without spoiling, making it well suited to storing and freezing for year-round eating, and it goes into dibs (date molasses) and other date products.",
      },
      {
        img: '/img/fruits/raziz-tamr-v2', alt: 'Sesame-coated sifsif balls of Razeez dates in a brass bowl',
        k: 'Dates', name: 'Razeez',
        season: 'Full dates: late season, around early October', seasons: 'autumn',
        pre: 'One of the oldest and most storied dates of Al-Ahsa, described as among the finest and most nutritious varieties. It is the base of “sifsif” — a famous winter sweet of Razeez dates with date molasses and sesame, served in guest majalis — as well as of molasses itself. It has become relatively rare today, as most farmers have turned to growing Khalas.',
      },
      {
        img: '/img/fruits/barhi', alt: 'A cluster of yellow Barhi dates hanging among the palm fronds',
        k: 'Dates', name: 'Barhi',
        season: 'Rutab: in summer', seasons: 'summer',
        pre: 'One of the most celebrated rutab varieties in Al-Ahsa and the Arab world; originally from Iraq, it reached Al-Ahsa and Qassim in the late nineteenth century. Exceptionally sweet and soft, and free of astringent bitterness even at the yellow balah (bisr) stage, so it is eaten at all three stages — balah, rutab and full date — turning from green to yellow to amber as it ripens.',
      },
      {
        img: '/img/fruits/bawakir-v2', alt: 'Bowls of assorted rutab: Ghar, Khneizi and Shahl',
        k: 'Dates', name: 'Bawakir — early & local varieties',
        season: 'Rutab & dates: late May to October', seasons: 'spring summer autumn',
        pre: 'Beyond the major varieties, the oasis abounds in dozens of local ones that open or close the season: Tayyar, Mignaz and Ghar lead the early harvest, followed by Khneizi, Shishi and Khalas, while late rutab such as Umm Rahim, Zamli and Hilali run to mid-August — joined by Shubaibi, Shahl, Wusaili, Hatimi, Kasbi and more.',
      },
    ],
  },
  {
    title: 'Citrus',
    fruits: [
      {
        img: '/img/fruits/lomi-v2', alt: 'Green Hasawi limes with a cut half',
        k: 'Citrus', name: 'Hasawi Lime (Bin Zuhairi)',
        season: 'Summer: from mid-June', seasons: 'summer',
        pre: 'Al-Ahsa\'s second crop after dates. A small, dark-green, thin-skinned fruit bursting with juice, sharply tart with a piercing fragrance that sets it apart from all other citrus. More than 100,000 bearing lime trees spread across the oasis; a single tree yields 25–30 kg a season. A cherished Hasawi summer custom surrounds it: families gather to press and preserve it (“jameed”, or sun-dried lime) for use all year. The governorate celebrates it annually at the Hasawi Lomi Exhibition, organised by the Al-Ahsa Chamber in partnership with the Al-Ahsa Development Authority.',
      },
      {
        img: '/img/fruits/atranj-v2', alt: 'Green wrinkle-skinned atranj (citron) fruits',
        k: 'Citrus', name: 'Atranj (Citron)',
        season: 'Winter: from January to early March', seasons: 'winter',
        pre: 'An ancient citrus with large, fragrant fruit and a thick, wrinkled rind.',
      },
    ],
  },
  {
    title: 'Summer fruits',
    fruits: [
      {
        img: '/img/fruits/melon-v2', alt: 'Hasawi melons with a cut slice',
        k: 'Summer fruits', name: 'Hasawi Yellow Melon',
        season: 'Summer: from around late May', seasons: 'summer',
        pre: "A farming and cultural heirloom handed down through generations; a local strain shaped by selective cultivation and the keeping of superior seed, which gave it its distinctive yellow colour and its tolerance of Al-Ahsa’s heat and scarce water. Sweet and aromatic, rich in water, fibre, vitamin C, potassium and carotenoids, and low in calories — a natural summer hydrator.",
      },
      {
        img: '/img/fruits/fig', alt: 'Hasawi figs with a cut half showing the flesh',
        k: 'Summer fruits', name: 'Hasawi Fig',
        season: 'Summer', seasons: 'summer',
        pre: "A beloved summer fruit; Al-Ahsa’s most famous type is a pale lemony green, each fig about a single bite. Sugary and tender, it stands out for not spoiling quickly, unlike many figs. It is usually planted scattered through the palm groves beside lime and pomegranate rather than in dedicated orchards, so no precise tree count exists. Some farmers preserve it dried; it is a blessed fruit mentioned in the Holy Qur’an.",
      },
      {
        img: '/img/fruits/bambar-v2', alt: 'Bambar fruits',
        k: 'Summer fruits', name: 'Hasawi Bambar',
        season: 'Summer: around July–August', seasons: 'summer',
        pre: 'A heritage fruit adored by the older generation, known scientifically as ',
        sci: 'Cordia myxa',
        post: ' and also called sebestan, mkheit and hambu. The small oval fruit turns from green to yellow or brown as it ripens; its taste is sweet and its pulp so sticky it is proverbial. Eaten fresh, and used traditionally in folk remedies for the digestive system.',
      },
      {
        img: '/img/fruits/grapes-v2', alt: 'A bunch of Hasawi grapes',
        k: 'Summer fruits', name: 'Hasawi Grapes',
        season: 'Summer: from early summer', seasons: 'summer',
        pre: 'A small local seeded grape, prized for its flavour despite its size, grown in red and green varieties. Its harvest opens with the summer season alongside lime, figs and rutab. Yet according to farmers and vendors quoted in the local press, production has fallen sharply and the variety is threatened with extinction by water scarcity and shrinking farmland.',
      },
      {
        img: '/img/fruits/pomegranate-v2', alt: 'Suwari pomegranates with a cut half of glistening red seeds',
        k: 'Summer fruits', name: 'Hasawi Pomegranate (Suwari)', rare: true,
        season: '', seasons: 'summer autumn',
        pre: 'A venerable local fruit; its largest specimens are called “Suwari”. So intensely sweet that it splits from ripeness, and vivid in colour. Once planted densely across the oasis beside figs and lime, its production — like several of Al-Ahsa\'s traditional fruits — has declined so far that it is nearly extinct from the groves, and finding it today is rare.',
      },
      {
        img: '/img/fruits/papaya-v2', alt: 'A papaya and a cut half showing the orange flesh',
        k: 'Summer fruits', name: 'Papaya',
        season: 'Summer: from June to August', seasons: 'summer',
        pre: "A tropical fruit with sweet orange flesh, ripening in the oasis’s groves in summer.",
      },
    ],
  },
  {
    title: 'Spring & winter fruits',
    fruits: [
      {
        img: '/img/fruits/mulberry-v2', alt: 'A pile of red and black Hasawi mulberries',
        k: 'Spring fruits', name: 'Hasawi Mulberry',
        season: 'Spring: around April — a season of barely a month', seasons: 'spring',
        pre: "A short-season spring fruit that arrives as the last cold spells fade, with small, near-round berries in red, black and blue — red and black predominate on Al-Ahsa’s farms. Demand runs high precisely because the season is so short. Eaten fresh and used in sweets, ice creams, juices and jams, and frozen once the season ends; its cultivation is considered one of the oasis’s promising crops.",
      },
      {
        img: '/img/fruits/kanar', alt: 'Kanar fruits',
        k: 'Winter fruits', name: 'Hasawi Kanar (Nabk)',
        season: 'Winter: from around January to late March', seasons: 'winter spring',
        pre: 'A time-honoured winter fruit borne by the sidr tree mentioned in the Holy Qur\'an. The oasis remains its fertile home, and it comes in several types: “Tuffahi” (apple-sized), “Umm Sulaim” (small and stoneless) and “Sini” (large and green), along with pear-like and Indian types. Sweet and especially loved by children, it does not keep long, and buying it in the souqs comes with folk chants of its own.',
      },
    ],
  },
];

// النسخة الصينية — خط zh-translation-pipeline حصراً (دفعة fruits 2026-09-02، الحاكم 94/100
// بعد القارئ الأعمى). قرارات ملزمة: الكنار = 毛叶枣، اللومي = 青柠، الگلوس اللاتيني مرة
// واحدة في الصفحة وموضعه اسم البطاقة (استثناء معتمد لمطابقة عبوات السوق)، «مباركة» = 吉庆.
export const FRUIT_GROUPS_ZH: Group[] = [
  {
    title: '椰枣——绿洲之冠',
    intro: '椰枣是哈萨的第一大农作物。官方报告对年产量的估计在 10 万至 12 万吨之间，而据沙特通讯社（SPA）2024 年 10 月的报道，这一数字已超过 20 万吨。绿洲还坐拥世界上规模最大的椰枣种质资源库之一——2021 年，哈萨棕榈与椰枣中心凭借收集逾 127 个本国及国外品种，创下吉尼斯世界纪录。另有资料显示，哈拉斯、希希与拉齐兹三个品种合计约占总产量的四分之三。',
    fruits: [
      {
        img: '/img/fruits/khalas-v2', alt: '一盘之上两碗相邻：金黄的哈拉斯软熟鲜果与琥珀色的全熟干果',
        k: '椰枣', name: '哈拉斯（Khalas）',
        season: '软熟鲜果（Rutab）：7 月中旬至 8 月下旬 • 全熟干果（Tamr）：约 9 月 15 日至 25 日', seasons: 'summer autumn',
        pre: '哈萨椰枣的头号名片，最负盛名、销量最高的品种，约占绿洲椰枣树的 15% 至 20%。果实椭圆、大小适中、纤维少，色泽金黄透着琥珀色，入口绵软，甜香馥郁而不失均衡，即使久存也风味不减。当地素来以它佐阿拉伯咖啡待客，视之为慷慨与好客的象征；果实还富含锌、锰、硒等矿物质。',
      },
      {
        img: '/img/fruits/shishi-v2', alt: '黄色的希希软熟鲜果与棕色干果同盘摆放',
        k: '椰枣', name: '希希（Shishi）',
        season: '软熟鲜果：6 月下旬 • 全熟干果：8 月中下旬', seasons: 'summer',
        pre: '知名度与受欢迎程度仅次于哈拉斯的哈萨第二大品种。果实硕大，肉质厚实而相对绵软，通体棕褐、基部泛着金黄，甜度极高。它耐储存、不易变质，宜于冷冻储藏、全年享用，也常用于熬制椰枣糖浆（dibs）与各类椰枣制品。',
      },
      {
        img: '/img/fruits/raziz-tamr-v2', alt: '铜碗中裹满芝麻的拉齐兹椰枣甜球“西夫西夫”',
        k: '椰枣', name: '拉齐兹（Razeez）',
        season: '全熟干果：晚季成熟，约 10 月初', seasons: 'autumn',
        pre: '哈萨最古老的椰枣之一，旧时名重一方，素以品质上乘、营养丰富著称。以它配椰枣糖浆与芝麻制成的“西夫西夫”（sifsif），是待客席间常见的冬季名点；此外它也用于熬制糖浆本身。如今多数果农已改种哈拉斯，拉齐兹反倒成了相对难得的珍品。',
      },
      {
        img: '/img/fruits/barhi', alt: '一串黄色巴尔希椰枣垂挂在棕榈叶间',
        k: '椰枣', name: '巴尔希（Barhi）',
        season: '软熟鲜果：夏季', seasons: 'summer',
        pre: '哈萨乃至阿拉伯世界最著名的软熟鲜果品种之一，原产伊拉克，19 世纪末传入哈萨与盖西姆地区。它甜度出众、口感软糯，即便处于黄色半熟阶段（balah/bisr）也毫无涩味，因此半熟、软熟、全熟三个阶段皆可食用；成熟过程中果色由绿转黄，最终化作琥珀色。',
      },
      {
        img: '/img/fruits/bawakir-v2', alt: '几碗不同品种的软熟鲜枣：加尔、胡奈齐与沙赫勒',
        k: '椰枣', name: '早熟与本地品种（Bawakir）',
        season: '软熟鲜果与全熟干果：5 月下旬至 10 月', seasons: 'spring summer autumn',
        pre: '除几大主力品种外，绿洲还拥有数十个为椰枣季开场或收尾的本地品种：塔亚尔（Tayyar）、米季纳兹（Mignaz）与加尔（Ghar）率先登场，随后是胡奈齐（Khneizi）、希希与哈拉斯；乌姆·拉希姆（Umm Rahim）、扎姆利（Zamli）、希拉利（Hilali）等晚熟鲜果可一直吃到 8 月中旬；此外还有舒拜比（Shubaibi）、沙赫勒（Shahl）、伍赛利（Wusaili）、哈提米（Hatimi）、卡斯比（Kasbi）等众多品种。',
      },
    ],
  },
  {
    title: '柑橘类',
    fruits: [
      {
        img: '/img/fruits/lomi-v2', alt: '青绿色的哈萨青柠与一枚切开的半果',
        k: '柑橘类', name: '哈萨青柠（Bin Zuhairi）',
        season: '夏季：6 月中旬起', seasons: 'summer',
        pre: '哈萨仅次于椰枣的第二大农作物。果实小巧、深绿薄皮、汁水丰盈，酸味强劲，香气清冽独特，在柑橘家族中自成一格。绿洲中挂果的青柠树超过 10 万棵，单棵每季可收获 25 至 30 公斤。当地至今保留着一项地道的夏日习俗：家家户户一起动手榨汁，晒制成青柠干（当地称“贾米德”/jameed）以备全年之用。每年由哈萨商会与哈萨发展管理局联合举办的“哈萨青柠展”（Hasawi Lomi Exhibition），更是当地的年度盛事。',
      },
      {
        img: '/img/fruits/atranj-v2', alt: '表皮皱缩的青色香橼果实',
        k: '柑橘类', name: '香橼',
        season: '冬季：1 月至 3 月初', seasons: 'winter',
        pre: '历史悠久的柑橘果品，果实硕大而芳香，果皮厚实、表面皱缩。',
      },
    ],
  },
  {
    title: '夏季水果',
    fruits: [
      {
        img: '/img/fruits/melon-v2', alt: '哈萨黄西瓜与切开的一角',
        k: '夏季水果', name: '哈萨黄西瓜',
        season: '夏季：约 5 月下旬起', seasons: 'summer',
        pre: '世代相传的农耕与文化遗产：果农代代留种选优，培育出这一本地品系，使其形成独特的黄色，也练就了耐受哈萨酷热与缺水的本领。它味甜而清香，水分充足，富含膳食纤维、维生素 C、钾与类胡萝卜素，热量却很低，是夏日补水的天然佳品。',
      },
      {
        img: '/img/fruits/fig', alt: '哈萨无花果与露出果肉的半颗切果',
        k: '夏季水果', name: '哈萨无花果',
        season: '夏季', seasons: 'summer',
        pre: '备受喜爱的夏季水果。哈萨最出名的品种呈浅柠檬绿色，一颗恰好一口；果肉甘甜绵软，且不像多数无花果那样容易变质。它多零散种植于椰枣林间，与青柠、石榴为邻，而非独立成园，因此没有精确的株数统计。部分果农会将其晒干收藏；无花果也是《古兰经》中提及的吉庆果实。',
      },
      {
        img: '/img/fruits/bambar-v2', alt: '一把班巴尔果',
        k: '夏季水果', name: '哈萨班巴尔果',
        season: '夏季：约 7 月至 8 月', seasons: 'summer',
        pre: '深受老一辈钟爱的传统水果，学名为 ',
        sci: 'Cordia myxa',
        post: '，又名 sebestan、mkheit、hambu。果实小而椭圆，成熟时由绿转黄或棕，味道甘甜，果肉极为黏稠——当地形容东西黏稠时甚至会以它作比。可鲜食，传统上也用于调理肠胃的民间食疗。',
      },
      {
        img: '/img/fruits/grapes-v2', alt: '一串哈萨葡萄',
        k: '夏季水果', name: '哈萨葡萄',
        season: '夏季：初夏起', seasons: 'summer',
        pre: '本地小粒葡萄，带籽，个头虽小，风味却颇受称道，分红、绿两个品种，入夏便与青柠、无花果、软熟鲜枣一同上市。不过据当地媒体援引果农与商贩的说法，受水资源匮乏、种植面积缩减影响，其产量已大幅下滑，正面临绝迹的威胁。',
      },
      {
        img: '/img/fruits/pomegranate-v2', alt: '苏瓦里石榴与籽粒晶红的半颗切果',
        k: '夏季水果', name: '哈萨石榴（Suwari）', rare: true,
        season: '', seasons: 'summer autumn',
        pre: '历史悠久的本地水果，其中果形硕大者被称为“苏瓦里”。它以极致的甜度著称——甜得果实自行绽裂，色泽也格外艳丽。旧时曾与无花果、青柠一道遍植绿洲，但同哈萨多种传统水果一样，如今产量锐减，几乎已从果园中绝迹。',
      },
      {
        img: '/img/fruits/papaya-v2', alt: '一只木瓜与露出橙色果肉的半果',
        k: '夏季水果', name: '木瓜',
        season: '夏季：6 月至 8 月', seasons: 'summer',
        pre: '热带水果，果肉橙黄、味道甘甜，每逢夏季在绿洲果园中成熟。',
      },
    ],
  },
  {
    title: '春季与冬季水果',
    fruits: [
      {
        img: '/img/fruits/mulberry-v2', alt: '一堆红黑相间的哈萨桑葚',
        k: '春季水果', name: '哈萨桑葚',
        season: '春季：约 4 月，果期不足一个月', seasons: 'spring',
        pre: '果期短暂的春季水果，总在最后几波寒潮退去时如约而至。果实小巧近圆，有红、黑、蓝三色，哈萨农场以红、黑两色为主。正因季节稍纵即逝，市场需求格外旺盛。它可以鲜食，也可制成甜点、冰品、果汁与果酱，季末则冷冻收藏；其种植被视为绿洲颇具经济前景的产业之一。',
      },
      {
        img: '/img/fruits/kanar', alt: '几颗毛叶枣果实',
        k: '冬季水果', name: '哈萨毛叶枣（Kanar）',
        season: '冬季：约 1 月至 3 月底', seasons: 'winter spring',
        pre: '历史悠久的冬季水果，结于《古兰经》中提到的锡德尔树（sidr）。哈萨绿洲始终是它的丰饶家园，品种繁多：苹果大小的“图法希”（Tuffahi）、小而无核的“乌姆·苏莱姆”（Umm Sulaim）、大而青绿的“锡尼”（Sini），还有梨形种与印度种。果味清甜，尤得孩童喜爱，只是不耐久存；在传统市集选购时，还常能听到专属于它的民间叫卖歌谣。',
      },
    ],
  },
];

// النسخة الروسية — خط ru-translation-pipeline حصراً (دفعة ru-fruits 2026-09-16).
// أسماء الأصناف منقحرة من الرسم العربي، ومداخلها في ru-translation/glossary/termbase.json.
export const FRUIT_GROUPS_RU: Group[] = [
  {
    title: 'Финики — венец оазиса',
    intro: 'Финики — главная культура Аль-Ахсы. Официальные отчёты оценивают годовой урожай примерно в 100 000–120 000 тонн, а Саудовское агентство новостей (октябрь 2024 года) назвало цифру более 200 000 тонн. В оазисе находится один из крупнейших в мире генетических банков финиковой пальмы: в 2021 году Центр пальм и фиников в Аль-Ахсе установил рекорд Гиннесса, собрав более 127 саудовских и зарубежных сортов. По некоторым источникам, сорта «Халас», «Шиши» и «Разиз» вместе дают около трёх четвертей урожая.',
    fruits: [
      {
        img: '/img/fruits/khalas-v2', alt: 'Золотистый рутаб «Халас» и янтарные финики полной спелости в двух мисках на одном блюде',
        k: 'Финики', name: 'Халас',
        season: 'Рутаб: с середины июля до конца августа • Финики полной спелости: примерно 15–25 сентября', seasons: 'summer autumn',
        pre: 'Самый знаменитый сорт Аль-Ахсы и символ её фиников. На него приходится наибольшая доля продаж и 15–20 % пальм оазиса. Плоды овальные, среднего размера, от золотистого до янтарного цвета, мягкие, с небольшим количеством волокон, а вкус у них сладкий, ароматный и сбалансированный. Этот вкус не теряется даже при долгом хранении. «Халас» традиционно подают к арабскому кофе как символ щедрости и гостеприимства. Он богат минералами, в том числе цинком, марганцем и селеном.',
      },
      {
        img: '/img/fruits/shishi-v2', alt: 'Жёлтый рутаб «Шиши» и коричневые финики полной спелости на одной тарелке',
        k: 'Финики', name: 'Шиши',
        season: 'Рутаб: конец июня • Финики полной спелости: с середины до конца августа', seasons: 'summer',
        pre: 'Второй по известности и спросу сорт Аль-Ахсы после сорта «Халас». Плоды крупные, мясистые, со сравнительно мягкой мякотью, в основном коричневые, у основания золотисто-жёлтые, и очень сладкие. Они долго хранятся и не портятся, поэтому их удобно запасать и замораживать, чтобы есть круглый год. Из них делают дибс (финиковую патоку) и другие финиковые продукты.',
      },
      {
        img: '/img/fruits/raziz-tamr-v2', alt: 'Шарики «сифсиф» из фиников «Разиз», обсыпанные кунжутом, в латунной миске',
        k: 'Финики', name: 'Разиз',
        season: 'Финики полной спелости: поздний сезон, примерно начало октября', seasons: 'autumn',
        pre: 'Один из старейших сортов Аль-Ахсы; в старину он был одним из самых известных. Его называют одним из лучших и самых питательных сортов. Из него готовят «сифсиф» — известное зимнее лакомство из фиников «Разиз» с финиковой патокой и кунжутом, которое подают гостям в меджлисах (приёмных залах). Идёт этот сорт и на саму финиковую патоку. Сегодня «Разиз» стал сравнительно редким: большинство земледельцев перешли на сорт «Халас».',
      },
      {
        img: '/img/fruits/barhi', alt: 'Гроздь жёлтых фиников «Бархи» среди пальмовых листьев',
        k: 'Финики', name: 'Бархи',
        season: 'Рутаб: летом', seasons: 'summer',
        pre: 'Рутаб сорта «Бархи» — один из самых прославленных в Аль-Ахсе и в арабском мире. Этот сорт родом из Ирака, а в Аль-Ахсу и Эль-Касим попал в конце XIX века. Его финики исключительно сладкие и мягкие, и даже на стадии жёлтого балаха (или бисра) в них нет терпкой горечи, поэтому их едят на всех трёх стадиях — балаха, рутаба и полной спелости. Созревая, плоды из зелёных становятся жёлтыми, а затем янтарными.',
      },
      {
        img: '/img/fruits/bawakir-v2', alt: 'Миски с рутабом разных сортов: «Гар», «Хунайзи» и «Шахль»',
        k: 'Финики', name: 'Бавакир (ранние сорта) и местные сорта',
        season: 'Рутаб и финики полной спелости: с конца мая до октября', seasons: 'spring summer autumn',
        pre: 'Помимо главных сортов, в оазисе растут десятки местных — одни открывают сезон, другие его завершают. Первыми созревают «Тайяр», «Миджназ» и «Гар», за ними идут «Хунайзи», «Шиши» и «Халас», а поздний рутаб — например, «Умм-Рахим», «Замли» и «Хиляли» — держится до середины августа. К ним добавляются «Шубайби», «Шахль», «Вусайли», «Хатими», «Касби» и другие сорта.',
      },
    ],
  },
  {
    title: 'Цитрусовые',
    fruits: [
      {
        img: '/img/fruits/lomi-v2', alt: 'Зелёные лаймы Аль-Ахсы и половинка плода',
        k: 'Цитрусовые', name: 'Лайм Аль-Ахсы (или «Бин Зухайри»)',
        season: 'Лето: с середины июня', seasons: 'summer',
        pre: 'Вторая после фиников сельскохозяйственная культура Аль-Ахсы. Плод маленький, тёмно-зелёный, тонкокожий и очень сочный; вкус у него резко кислый, а пронзительный аромат отличает его от всех других цитрусовых. В оазисе растёт более 100 000 плодоносящих деревьев лайма; одно дерево даёт за сезон 25–30 кг. С лаймом связан давний летний обычай Аль-Ахсы: семьи собираются, чтобы выжать и заготовить его («джамид», или лайм, высушенный на солнце) и пользоваться им весь год. Ежегодно в мухафазе (административном округе) Аль-Ахса лайму посвящают «Выставку лайма Аль-Ахсы», которую Торгово-промышленная палата Аль-Ахсы организует совместно с Управлением по развитию Аль-Ахсы.',
      },
      {
        img: '/img/fruits/atranj-v2', alt: 'Зелёные плоды атранджа (или цитрона) с морщинистой кожурой',
        k: 'Цитрусовые', name: 'Атрандж (или цитрон)',
        season: 'Зима: с января до начала марта', seasons: 'winter',
        pre: 'Древний цитрус с крупными ароматными плодами и толстой морщинистой кожурой.',
      },
    ],
  },
  {
    title: 'Летние плоды',
    fruits: [
      {
        img: '/img/fruits/melon-v2', alt: 'Дыни Аль-Ахсы и отрезанный ломтик',
        k: 'Летние плоды', name: 'Жёлтая дыня Аль-Ахсы',
        season: 'Лето: примерно с конца мая', seasons: 'summer',
        pre: 'Сельскохозяйственное и культурное наследие, которое передаётся из поколения в поколение. Эта местная разновидность сложилась благодаря тому, что лучшие семена отбирали и сохраняли: так дыня получила свой характерный жёлтый цвет и стала выносить жару и нехватку воды в Аль-Ахсе. Она сладкая и ароматная, в ней много воды, клетчатки, витамина C, калия и каротиноидов, а калорий мало. Летом дыня помогает восполнять запас жидкости в организме.',
      },
      {
        img: '/img/fruits/fig', alt: 'Инжир Аль-Ахсы и половинка плода, в которой видна мякоть',
        k: 'Летние плоды', name: 'Инжир Аль-Ахсы',
        season: 'Лето', seasons: 'summer',
        pre: 'Любимый летний плод. Самый известный инжир Аль-Ахсы — светло-зелёный с лимонным оттенком, а каждый плод — на один укус. Вкус у него сахаристый, мякоть нежная, и, в отличие от многих сортов инжира, он не портится быстро. Обычно его сажают вразброс в пальмовых садах, рядом с лаймом и гранатом, а не в отдельных садах, поэтому точных данных о числе деревьев нет. Некоторые земледельцы сушат его впрок. Инжир — благословенный плод, упомянутый в Священном Коране.',
      },
      {
        img: '/img/fruits/bambar-v2', alt: 'Плоды бамбара',
        k: 'Летние плоды', name: 'Бамбар Аль-Ахсы',
        season: 'Лето: примерно в июле–августе', seasons: 'summer',
        pre: 'Старинный плод, который очень любят люди старшего поколения. Научное название — ',
        sci: 'Cordia myxa',
        post: '; другие его названия — себестан, мухайт и хамбу. Плод маленький и овальный: сначала он зелёный, а когда созревает, становится жёлтым или коричневым. Вкус у него сладкий, а мякоть настолько липкая, что это вошло в поговорку. Бамбар едят свежим, а в народной медицине его традиционно применяют при проблемах с пищеварением.',
      },
      {
        img: '/img/fruits/grapes-v2', alt: 'Гроздь винограда Аль-Ахсы',
        k: 'Летние плоды', name: 'Виноград Аль-Ахсы',
        season: 'Лето: с начала лета', seasons: 'summer',
        pre: 'Местный виноград с косточками — красный и зелёный. Ягоды у него мелкие, но вкус хвалят. Урожай начинают собирать с приходом лета — вместе с лаймом, инжиром и рутабом. Однако, по словам земледельцев и продавцов, которых цитирует местная пресса, из-за нехватки воды и сокращения возделываемых площадей урожаи сильно упали, и этому винограду грозит исчезновение.',
      },
      {
        img: '/img/fruits/pomegranate-v2', alt: 'Гранаты «Сувари» и половинка плода с блестящими красными зёрнами',
        k: 'Летние плоды', name: 'Гранат Аль-Ахсы («Сувари»)', rare: true,
        season: '', seasons: 'summer autumn',
        pre: 'Старинный местный плод; крупные гранаты называют «Сувари». Гранат ярко окрашен и так сладок, что трескается от сладости. Когда-то его густо сажали по всему оазису рядом с инжиром и лаймом. Но урожаи граната, как и ряда других традиционных плодов Аль-Ахсы, упали так сильно, что он почти исчез из садов оазиса и сегодня встречается редко.',
      },
      {
        img: '/img/fruits/papaya-v2', alt: 'Папайя и половинка плода с оранжевой мякотью',
        k: 'Летние плоды', name: 'Папайя',
        season: 'Лето: с июня по август', seasons: 'summer',
        pre: 'Тропический плод со сладкой оранжевой мякотью; летом он созревает в садах оазиса.',
      },
    ],
  },
  {
    title: 'Весенние и зимние плоды',
    fruits: [
      {
        img: '/img/fruits/mulberry-v2', alt: 'Горка красной и чёрной шелковицы Аль-Ахсы',
        k: 'Весенние плоды', name: 'Шелковица Аль-Ахсы',
        season: 'Весна: примерно в апреле — сезон длится не больше месяца', seasons: 'spring',
        pre: 'Весенний плод с коротким сезоном: он появляется, когда отступают последние холода. Мелкие, почти круглые ягоды бывают красными, чёрными и синими, а в садах Аль-Ахсы преобладают красные и чёрные. Спрос на шелковицу высок из-за короткого сезона. Её едят свежей, добавляют в сладости, мороженое, соки и варенье, а после сезона замораживают. Шелковица считается одной из экономически перспективных культур оазиса.',
      },
      {
        img: '/img/fruits/kanar', alt: 'Плоды канара',
        k: 'Зимние плоды', name: 'Канар Аль-Ахсы (или набк)',
        season: 'Зима: примерно с января до конца марта', seasons: 'winter spring',
        pre: 'Старинный зимний плод, который растёт на сидре — дереве, упомянутом в Священном Коране. Оазис и сегодня остаётся для канара плодородным краем. Разновидностей у него несколько: «Туффахи» — размером с яблоко, «Умм-Сулайм» — мелкий и без косточки, «Сини» — крупный и зелёный, а также грушевидный и индийский канар. Плоды сладкие, их особенно любят дети, но хранятся они недолго. Покупку канара на рынках сопровождают особые народные напевы.',
      },
    ],
  },
];

// @de-fruits:start
// النسخة الألمانية — خط de-translation-pipeline حصراً (دفعات de-fruits-1/2/3، ج3 من خطة إكمال اللغات).
// الصور والفصول (seasons) والاسم العلمي (sci) من البنية الإنجليزية نفسها؛ الرمان السواري بلا موسم بقرار إياد.
export const FRUIT_GROUPS_DE: Group[] = [
  {
    title: 'Datteln – Krone der Oase',
    intro: 'Datteln sind Al-Ahsas wichtigste Ernte; offizielle Berichte beziffern die jährliche Produktion auf rund 100.000 bis 120.000 Tonnen, während die Saudi Press Agency (SPA) im Oktober 2024 von mehr als 200.000 Tonnen berichtete. Die Oase besitzt eine der größten Genbanken für Dattelpalmen der Welt: 2021 stellte das Zentrum für Palmen und Datteln in Al-Ahsa einen Guinness-Rekord auf – mit mehr als 127 nationalen und internationalen Sorten. Manchen Quellen zufolge machen Khalas, Shishi und Razeez zusammen etwa drei Viertel der Produktion aus.',
    fruits: [
      {
        img: '/img/fruits/khalas-v2', alt: 'Goldener Khalas-Rutab und bernsteinfarbener Khalas-Tamr in zwei nebeneinanderstehenden Schälchen auf einer Platte',
        k: 'Datteln', name: 'Khalas',
        season: 'Rutab: Mitte Juli – Ende August • Tamr (die reife, getrocknete Dattel): ca. 15.–25. September', seasons: 'summer autumn',
        pre: 'Die Ikone der Datteln Al-Ahsas, ihre berühmteste und zugleich meistverkaufte Sorte, macht 15–20 % der Palmen der Oase aus. Die Frucht ist oval, mittelgroß und faserarm, golden bis bernsteinfarben, mit weicher Konsistenz und einer ausgewogenen, aromatischen Süße. Sie behält ihren Geschmack auch nach langer Lagerung und wird traditionell zu arabischem Kaffee gereicht – als Symbol für Großzügigkeit und Gastfreundschaft. Zudem ist sie reich an Mineralstoffen wie Zink, Mangan und Selen.',
      },
      {
        img: '/img/fruits/shishi-v2', alt: 'Gelber Shishi-Rutab und brauner Shishi-Tamr zusammen auf einer Servierplatte',
        k: 'Datteln', name: 'Shishi',
        season: 'Rutab: Ende Juni • Tamr: Mitte – Ende August', seasons: 'summer',
        pre: 'Al-Ahsas zweitberühmteste Sorte – nach Khalas am meisten gefragt. Die Frucht ist groß, mit einer vergleichsweise weichen, dicken Konsistenz, überwiegend braun mit goldgelber Basis und intensiv süß. Sie hält sich lange, ohne zu verderben – ideal zum Lagern und Einfrieren für den Verzehr übers ganze Jahr. Zudem wird sie zu Dibs (Dattelsirup) und anderen Dattelerzeugnissen weiterverarbeitet.',
      },
      {
        img: '/img/fruits/raziz-tamr-v2', alt: 'Mit Sesam bedeckte Sifsif-Kugeln aus Razeez-Datteln in einer Messingschale',
        k: 'Datteln', name: 'Razeez',
        season: 'Tamr: spät in der Saison, gegen Anfang Oktober', seasons: 'autumn',
        pre: 'Eine der ältesten und geschichtsträchtigsten Dattelsorten Al-Ahsas, die als eine der feinsten und nahrhaftesten Sorten gilt. Sie ist die Grundlage für „Sifsif“ – eine berühmte winterliche Süßspeise aus Razeez-Datteln mit Dattelsirup und Sesam, die in Gäste-Madschlis (Empfangsräumen) serviert wird – sowie für Dattelsirup selbst. Heute ist sie verhältnismäßig selten geworden, da sich die meisten Landwirte inzwischen dem Anbau von Khalas zugewandt haben.',
      },
      {
        img: '/img/fruits/barhi', alt: 'Eine Rispe gelber Barhi-Datteln, hängend zwischen den Palmwedeln',
        k: 'Datteln', name: 'Barhi',
        season: 'Rutab: im Sommer', seasons: 'summer',
        pre: 'Eine der berühmtesten Rutab-Sorten in Al-Ahsa und der arabischen Welt; ursprünglich aus dem Irak stammend, gelangte sie im späten 19. Jahrhundert nach Al-Ahsa und Qassim. Außergewöhnlich süß und weich, dazu frei von herber, zusammenziehender Bitterkeit selbst im gelben Balah-Stadium (Bisr) – deshalb wird sie in allen drei Stadien gegessen: als Balah, Rutab und Tamr. Beim Reifen wechselt sie dabei die Farbe von Grün über Gelb zu Bernsteinfarben.',
      },
      {
        img: '/img/fruits/bawakir-v2', alt: 'Schalen mit verschiedenem Rutab: Ghar, Khneizi und Shahl',
        k: 'Datteln', name: 'Bawakir – frühe und lokale Sorten',
        season: 'Rutab und Tamr: von Ende Mai bis Oktober', seasons: 'spring summer autumn',
        pre: 'Neben den großen Sorten hält die Oase Dutzende lokaler Sorten bereit, die die Saison eröffnen oder beschließen: Tayyar, Mignaz und Ghar führen die Frühernte an, gefolgt von Khneizi, Shishi und Khalas, während später Rutab wie Umm Rahim, Zamli und Hilali bis Mitte August reicht – dazu kommen Shubaibi, Shahl, Wusaili, Hatimi, Kasbi und weitere.',
      },
    ],
  },
  {
    title: 'Zitrusfrüchte',
    fruits: [
      {
        img: '/img/fruits/lomi-v2', alt: 'Grüne Hasawi-Limetten mit einer aufgeschnittenen Hälfte',
        k: 'Zitrusfrüchte', name: 'Hasawi-Limette (Bin Zuhairi)',
        season: 'Sommer: ab Mitte Juni', seasons: 'summer',
        pre: 'Das zweite landwirtschaftliche Erzeugnis Al-Ahsas nach den Datteln. Die kleine, dunkelgrüne, dünnschalige Frucht steckt voller Saft, schmeckt kräftig-sauer und besitzt einen durchdringenden Duft, der sie von allen anderen Zitrusfrüchten unterscheidet. In der Oase stehen mehr als 100.000 tragende Limettenbäume; ein einzelner Baum liefert 25–30 kg pro Saison. Ein liebgewonnener Hasawi-Sommerbrauch rankt sich um sie: Familien kommen zusammen, um sie zu pressen und als „Jameed“ (die sonnengetrocknete Limette) für den Gebrauch übers ganze Jahr haltbar zu machen. Alljährlich feiert das Gouvernorat sie mit der Hasawi-Lomi-Ausstellung, veranstaltet von der Al-Ahsa-Handelskammer in Partnerschaft mit der Al-Ahsa-Entwicklungsbehörde.',
      },
      {
        img: '/img/fruits/atranj-v2', alt: 'Grüne Atranj-Früchte mit runzliger Schale',
        k: 'Zitrusfrüchte', name: 'Atranj (Zitronatzitrone)',
        season: 'Winter: von Januar bis Anfang März', seasons: 'winter',
        pre: 'Eine altehrwürdige Zitrusart mit großer, duftender Frucht und dicker, runzliger Schale.',
      },
    ],
  },
  {
    title: 'Sommerfrüchte',
    fruits: [
      {
        img: '/img/fruits/melon-v2', alt: 'Hasawi-Melonen mit einer aufgeschnittenen Scheibe',
        k: 'Sommerfrüchte', name: 'Gelbe Hasawi-Melone',
        season: 'Sommer: ab etwa Ende Mai', seasons: 'summer',
        pre: 'Ein landwirtschaftliches und kulturelles Erbe, über Generationen weitergegeben: Die lokale Sorte entstand durch gezielte Auslese und die Bewahrung überlegenen Saatguts. So erhielt sie ihre unverwechselbare gelbe Farbe und ihre Widerstandsfähigkeit gegen die Hitze und den Wassermangel Al-Ahsas. Süß und aromatisch, reich an Wasser, Ballaststoffen, Vitamin C, Kalium und Carotinoiden, dabei kalorienarm – ein natürlicher Erfrischer für den Sommer.',
      },
      {
        img: '/img/fruits/fig', alt: 'Hasawi-Feigen mit einer aufgeschnittenen Hälfte, die das Fruchtfleisch zeigt',
        k: 'Sommerfrüchte', name: 'Hasawi-Feige',
        season: 'Sommer', seasons: 'summer',
        pre: 'Eine beliebte Sommerfrucht: Die bekannteste Sorte Al-Ahsas ist blassgrün mit einem Hauch von Zitronengelb, und jede Feige hat etwa die Größe eines Bissens. Sie ist zuckersüß und zart und zeichnet sich – anders als viele Feigenarten – dadurch aus, dass sie nicht schnell verdirbt. Meist wird sie verstreut zwischen den Palmenhainen neben Limetten und Granatäpfeln gepflanzt statt in eigenen Gärten, weshalb sich ihre Bäume nicht genau zählen lassen. Manche Landwirte bewahren sie getrocknet auf; sie ist eine gesegnete Frucht, die im heiligen Koran erwähnt wird.',
      },
      {
        img: '/img/fruits/bambar-v2', alt: 'Bambar-Früchte',
        k: 'Sommerfrüchte', name: 'Hasawi-Bambar',
        season: 'Sommer: etwa Juli – August', seasons: 'summer',
        pre: 'Eine traditionsreiche Frucht, die von der älteren Generation geliebt wird, ist wissenschaftlich bekannt als ', sci: 'Cordia myxa', post: ' und wird auch als Sebestan, Mkheit und Hambu bezeichnet. Die kleine, ovale Frucht wechselt beim Reifen die Farbe von Grün zu Gelb oder Braun; ihr Geschmack ist süß, und ihr Fruchtfleisch ist so klebrig, dass es dafür sprichwörtlich geworden ist. Sie wird frisch gegessen und traditionell in der Volksmedizin bei Verdauungsbeschwerden verwendet.',
      },
      {
        img: '/img/fruits/grapes-v2', alt: 'Eine Rispe Hasawi-Trauben',
        k: 'Sommerfrüchte', name: 'Hasawi-Trauben',
        season: 'Sommer: ab dem Frühsommer', seasons: 'summer',
        pre: 'Eine kleine lokale Traube mit Kernen, die trotz ihrer geringen Größe für ihren Geschmack geschätzt wird und in einer roten und einer grünen Sorte vorkommt. Ihre Ernte beginnt mit dem Sommer, zusammen mit Limette, Feige und Rutab. Doch laut Landwirten und Händlern, die in der lokalen Presse zitiert wurden, ist die Produktion stark zurückgegangen, und die Sorte ist durch Wassermangel und schwindende Anbauflächen vom Aussterben bedroht.',
      },
      {
        img: '/img/fruits/pomegranate-v2', alt: 'Suwari-Granatäpfel mit einer aufgeschnittenen Hälfte voller glänzender roter Kerne',
        k: 'Sommerfrüchte', name: 'Hasawi-Granatapfel (Suwari)', rare: true,
        season: '', seasons: 'summer autumn',
        pre: 'Eine altehrwürdige lokale Frucht: Ihre größten Exemplare werden „Suwari“ genannt. Der Granatapfel ist so intensiv süß, dass er davon aufplatzt. Zugleich strahlt er in kräftiger Farbe. Einst wurde er dicht in der ganzen Oase neben Feigen und Limetten gepflanzt. Doch seine Produktion ist – wie bei mehreren traditionellen Früchten Al-Ahsas – so stark zurückgegangen, dass er in den Hainen fast ausgestorben ist. Er ist heute nur noch selten zu finden.',
      },
      {
        img: '/img/fruits/papaya-v2', alt: 'Eine Papaya und eine aufgeschnittene Hälfte, die das orangefarbene Fruchtfleisch zeigt',
        k: 'Sommerfrüchte', name: 'Papaya',
        season: 'Sommer: von Juni bis August', seasons: 'summer',
        pre: 'Eine tropische Frucht mit süßem, orangefarbenem Fruchtfleisch, die im Sommer in den Hainen der Oase reift.',
      },
    ],
  },
  {
    title: 'Frühlings- und Winterfrüchte',
    fruits: [
      {
        img: '/img/fruits/mulberry-v2', alt: 'Ein Haufen roter und schwarzer Hasawi-Maulbeeren',
        k: 'Frühlingsfrüchte', name: 'Hasawi-Maulbeere',
        season: 'Frühling: etwa April – eine Saison von kaum einem Monat', seasons: 'spring',
        pre: 'Eine Frühlingsfrucht mit kurzer Saison: Sie erscheint, sobald die letzten Kälteperioden abklingen. Ihre kleinen, fast runden Beeren sind rot, schwarz oder blau, wobei Rot und Schwarz auf den Farmen Al-Ahsas überwiegen. Die Nachfrage ist gerade wegen der kurzen Saison hoch. Sie wird frisch gegessen und in Süßspeisen, Eiscreme, Säften und Konfitüren verwendet; nach Saisonende wird sie eingefroren. Ihr Anbau gilt als eine der vielversprechenden Kulturen der Oase.',
      },
      {
        img: '/img/fruits/kanar', alt: 'Kanar-Früchte',
        k: 'Winterfrüchte', name: 'Hasawi-Kanar (Nabk)',
        season: 'Winter: von etwa Januar bis Ende März', seasons: 'winter spring',
        pre: 'Eine altehrwürdige Winterfrucht vom Sidr-Baum, der im heiligen Koran erwähnt wird: Die Oase blieb die fruchtbare Heimat dieses Baums. Sie kommt in mehreren Sorten vor: „Tuffahi“ (apfelgroß), „Umm Sulaim“ (klein und kernlos) und „Sini“ (groß und grün), dazu birnenähnliche und indische Sorten. Süß und besonders bei Kindern beliebt, hält sie sich nicht lange, und ihr Kauf auf den Souks ist mit eigenen volkstümlichen Sprüchen verbunden.',
      },
    ],
  },
];

// @de-fruits:end
export const fruitGroupsFor = (lang: string): Group[] => (lang === 'ar' ? FRUIT_GROUPS_AR : lang === 'zh' ? FRUIT_GROUPS_ZH : lang === 'de' ? FRUIT_GROUPS_DE : lang === 'ru' ? FRUIT_GROUPS_RU : FRUIT_GROUPS_EN);
