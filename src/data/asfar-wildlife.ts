// Wildlife section of the Al-Asfar Lake page (ar/en). Every statement here was matched against the page
// it cites on 2026-11-24; figures are the sources' own. Other languages get this section only through
// their translation pipelines, and it is not rendered for them until then.
// Photos are identification pictures from Wikimedia Commons (not taken at the lake), resized from the
// originals; author and licence come from each file's Commons page.

type Bi = { ar: string; en: string };

export const WILDLIFE_SOURCES = {
  spa: { url: 'https://www.spa.gov.sa/2199724', label: { ar: 'واس 2021', en: 'SPA, 2021' } },
  study: { url: 'https://www.mdpi.com/2079-6382/10/3/260', label: { ar: 'دراسة علمية 2021', en: 'Scientific study, 2021' } },
  field: { url: 'https://www.birdsofsaudiarabia.com/2024/01/northern-lapwings-al-asfar-lake.html', label: { ar: 'رصد ميداني 2024', en: 'Field record, 2024' } },
  saudipedia: { url: 'https://saudipedia.com/بحيرة-الأصفر2', label: { ar: 'سعوديبيديا', en: 'Saudipedia' } },
} as const;

export const WILDLIFE_TEXT = {
  kicker: { ar: 'طبيعة الأحساء', en: 'Nature in Al-Ahsa' },
  title: { ar: 'الحياة الفطرية في بحيرة الأصفر', en: 'Wildlife at Al-Asfar Lake' },
  lead: {
    ar: 'مسطّح مائي ضحل تحيط به الكثبان، تحوّل مع السنين إلى أرض رطبة يكسوها القصب، وتقصدها الطيور المهاجرة كل عام في طريقها بين الشمال والجنوب.',
    en: 'A shallow sheet of water ringed by dunes that has become, over the years, a reed-covered wetland where migratory birds stop each year on their way between north and south.',
  },
  facts: [
    { n: { ar: '39 نوعاً', en: '39 species' }, t: { ar: 'من النباتات سُجّلت على ضفافها في مسح منشور عام 2009', en: 'of plants recorded on its shores in a survey published in 2009' } },
    { n: { ar: 'نحو 100 نوع', en: 'About 100 species' }, t: { ar: 'من الطيور المقيمة والمهاجرة وثّقها باحث على مدى 10 سنوات', en: 'of resident and migratory birds documented by one researcher over 10 years' } },
    { n: { ar: 'نحو 24%', en: 'About 24%' }, t: { ar: 'من الأرض الرطبة غطّاها القصب عام 2020 بحسب دراسة بالأقمار الصناعية', en: 'of the wetland was covered by reeds in 2020, according to a satellite study' } },
    { n: { ar: '326 كم²', en: '326 km²' }, t: { ar: 'خصّصتها وزارة البيئة والمياه والزراعة عام 2019 لإقامة محمية طبيعية', en: 'allocated in 2019 by the Ministry of Environment, Water and Agriculture for a nature reserve' } },
  ] as { n: Bi; t: Bi }[],
  aboutK: { ar: 'عن البحيرة', en: 'About the lake' },
  aboutH: { ar: 'ماء في قلب الرمل', en: 'Water in the heart of the sand' },
  about: {
    ar: 'تتكوّن بحيرة الأصفر أساساً من مياه الصرف الزراعي الآتية من واحة الأحساء عبر المصارف، ومعها مياه معالجة، فنشأت حولها بيئة طبيعية كاملة بين الكثبان الرملية والسبخات. وتُظهر صور الأقمار الصناعية أن الأرض الرطبة اتّسعت كثيراً بين عامي 1990 و2020.',
    en: 'Al-Asfar Lake is formed mainly of agricultural drainage water that reaches it from the Al-Ahsa Oasis through drainage canals, together with treated water, and a whole natural environment has grown around it among the sand dunes and salt flats. Satellite images show that the wetland expanded considerably between 1990 and 2020.',
  },
  plantsK: { ar: 'الموائل والنباتات', en: 'Habitats and plants' },
  plantsH: { ar: 'أربعة أحزمة نباتية من الماء إلى الرمل', en: 'Four belts of vegetation, from water to sand' },
  plants: {
    ar: 'سجّل مسح نباتي منشور عام 2009 على ضفاف البحيرة 39 نوعاً من 20 فصيلة، أكثر من 61% منها شجيرات معمّرة، في أربعة أحزمة تتدرّج من حافة الماء إلى الرمل:',
    en: 'A botanical survey published in 2009 recorded 39 species from 20 families on the lake shores, more than 61% of them perennial shrubs, in four belts that run from the water’s edge to the sand:',
  },
  birdsK: { ar: 'الطيور', en: 'Birds' },
  birdsH: { ar: 'محطة على طريق الهجرة', en: 'A stop on the migration route' },
  birds: [
    {
      ar: 'الطيور أشهر ما في البحيرة. تصفها وكالة الأنباء السعودية بأنها محطة شتوية مؤقتة للطيور القادمة من أوروبا وروسيا وأواسط آسيا، وتنقل عن باحث وثّق فيها على مدى 10 سنوات نحو 100 نوع بين مقيم ومهاجر.',
      en: 'Birds are what the lake is best known for. The Saudi Press Agency describes it as a temporary winter station for birds arriving from Europe, Russia and Central Asia, and quotes a researcher who documented about 100 resident and migratory species there over 10 years.',
    },
    {
      ar: 'تصل مرزات البطائح في سبتمبر وتغادر في مارس أو أبريل، ويقضي الشتاء معها العقاب المنقّط الكبير. ومن طيور البحيرة المستوطنة الغطّاس الصغير ودجاجة الماء.',
      en: 'Western Marsh Harriers arrive in September and leave in March or April, and Greater Spotted Eagles winter alongside them. The Little Grebe and the Moorhen are among the birds resident at the lake.',
    },
  ] as Bi[],
  photosNote: {
    ar: 'الصور تعريفية بالأنواع: التُقطت في مواقع أخرى لا في البحيرة، وصُغّرت عن أصولها في ويكيميديا كومنز.',
    en: 'The photos are for identification: they were taken elsewhere, not at the lake, and are resized from the originals on Wikimedia Commons.',
  },
  listNote: {
    ar: 'القائمة مختارة من مصادر منشورة وليست حصراً لطيور البحيرة، ولا ضماناً لمشاهدة نوع بعينه في موعد محدّد. وتذكر وكالة الأنباء السعودية كذلك «درسة الشعير» ضمن الطيور المهاجرة إلى البحيرة.',
    en: 'This is a selection from published sources, not a full list of the lake’s birds, and no promise that a given species will be seen on a given day. The Saudi Press Agency also names a bunting (dirsat al-sha‘ir) among the lake’s migrants.',
  },
  otherK: { ar: 'أحياء أخرى', en: 'Other life' },
  otherH: { ar: 'في الماء وعلى الضفاف', en: 'In the water and on the shores' },
  other: [
    {
      ar: 'تذكر مراجعة علمية أن في البحيرة ضفادع وأسماكاً وسلاحف، وأنواعاً من الطحالب والأعشاب المائية. ومن أسماكها التي تناولتها الدراسات البلطي، وسمكة صغيرة اسمها العلمي Aphanius dispar.',
      en: 'A scientific review notes frogs, fish and turtles in the lake, along with several kinds of algae and waterweed. The fish that studies have examined include tilapia and a small species, Aphanius dispar.',
    },
    {
      ar: 'ورصدت دراسات علمية في ماء البحيرة معادن ثقيلة تتجاوز الحدود الدولية المسموح بها، ورصدتها في أنسجة أسماكها؛ فالبحيرة مقصد للمشاهدة والتصوير، لا للسباحة ولا لصيد السمك للأكل.',
      en: 'Scientific studies have found heavy metals in the lake water above international permissible limits, and in the tissues of its fish; the lake is a place for watching and photography, not for swimming or for catching fish to eat.',
    },
  ] as Bi[],
  tipsK: { ar: 'للزائر', en: 'For visitors' },
  tipsH: { ar: 'كيف تشاهد دون أن تُزعج', en: 'How to watch without disturbing' },
  tips: [
    { h: { ar: 'زُر في موسم الطيور', en: 'Come in the bird season' }, t: { ar: 'تستقرّ الطيور المهاجرة في البحيرة من مطلع الشتاء حتى مايو.', en: 'Migratory birds stay at the lake from the onset of winter until May.' } },
    { h: { ar: 'الزم المسارات المطروقة', en: 'Keep to the well-used tracks' }, t: { ar: 'السبخة رخوة في مواضع كثيرة وتعلق فيها السيارات، والوصول بسيارات الدفع الرباعي.', en: 'The salt flat is soft in many places and vehicles get stuck in it; access is by four-wheel drive.' } },
    { h: { ar: 'منظار وعدسة مقرّبة', en: 'Binoculars and a long lens' }, t: { ar: 'شاهد من بعيد، ولا تقترب من تجمّعات الطيور في القصب.', en: 'Watch from a distance and stay clear of the birds gathered in the reeds.' } },
    { h: { ar: 'لا صيد ولا أثر', en: 'No hunting, no trace' }, t: { ar: 'أعلنت وزارة البيئة والمياه والزراعة عام 2019 تحويل البحيرة إلى محمية طبيعية: لا تصطد، ولا تترك مخلّفات، ولا توقد ناراً قرب القصب.', en: 'In 2019 the ministry announced the lake’s conversion into a nature reserve: do not hunt, leave no litter, and light no fire near the reeds.' } },
  ] as { h: Bi; t: Bi }[],
  sourcesH: { ar: 'المصادر', en: 'Sources' },
  photoBy: { ar: 'تصوير', en: 'Photo' },
  via: { ar: 'ويكيميديا كومنز', en: 'Wikimedia Commons' },
  source: { ar: 'المصدر', en: 'Source' },
  reviewed: { ar: 'آخر مطابقة للمصادر: 24 نوفمبر 2026.', en: 'Sources last checked: 24 November 2026.' },
} as const;

export const WILDLIFE_BELTS: { h: Bi; sci: string; before: Bi; after: Bi }[] = [
  {
    h: { ar: 'الحزام المغمور', en: 'The inundated belt' }, sci: 'Phragmites australis',
    before: { ar: 'يسوده القصب', en: 'Dominated by the common reed,' },
    after: { ar: '، وقدّرت دراسة بالأقمار الصناعية أنه غطّى نحو 24% من مساحة الأرض الرطبة عام 2020.', en: '; a satellite study estimated that it covered about 24% of the wetland in 2020.' },
  },
  {
    h: { ar: 'الحزام الرطب', en: 'The moist belt' }, sci: 'Halocnemum strobilaceum',
    before: { ar: 'يسوده نبات ملحي هو', en: 'Dominated by a salt-tolerant plant,' },
    after: { ar: '.', en: '.' },
  },
  {
    h: { ar: 'الحزام شبه الجاف', en: 'The semi-dry belt' }, sci: 'Zygophyllum mandavillei',
    before: { ar: 'يسوده نوع من الهرم', en: 'Dominated by a bean-caper,' },
    after: { ar: '.', en: '.' },
  },
  {
    h: { ar: 'الحزام الجاف', en: 'The arid belt' }, sci: 'Haloxylon salicornicum',
    before: { ar: 'يسوده الرمث', en: 'Dominated by the desert shrub rimth,' },
    after: { ar: '. وتذكر سعوديبيديا من نبات محيط البحيرة الأرطى والطرفاء والشنان.', en: '. Saudipedia also lists arta, tamarisk and shinan among the plants around the lake.' },
  },
];

type Group = 'water' | 'waders' | 'raptors' | 'other';
export const WILDLIFE_GROUPS: Record<Group, Bi> = {
  water: { ar: 'طيور الماء', en: 'Waterbirds' },
  waders: { ar: 'الخوّاضات', en: 'Waders' },
  raptors: { ar: 'الجوارح', en: 'Birds of prey' },
  other: { ar: 'طيور أخرى', en: 'Other birds' },
};

export interface WildlifeBird {
  img: string; group: Group; name: Bi; sci: string; note: Bi;
  source: keyof typeof WILDLIFE_SOURCES;
  credit: { holder: string; license: string; licenseUrl: string; file: string };
  pos?: string; // object-position for portrait originals shown in a landscape frame
}
const BY_SA_4 = 'https://creativecommons.org/licenses/by-sa/4.0';
const BY_SA_3 = 'https://creativecommons.org/licenses/by-sa/3.0';
const BY_SA_25 = 'https://creativecommons.org/licenses/by-sa/2.5';
const BY_2 = 'https://creativecommons.org/licenses/by/2.0';
const CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/deed.en';
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const WILDLIFE_BIRDS: WildlifeBird[] = [
  {
    img: '/img/wildlife/little-grebe', group: 'water', sci: 'Tachybaptus ruficollis',
    name: { ar: 'الغطّاس الصغير', en: 'Little Grebe' },
    note: { ar: 'تعدّه سعوديبيديا من طيور البحيرة المستوطنة، ووثّقته دراسة علمية حولها خلال عام 2016.', en: 'Saudipedia counts it among the birds resident at the lake, and a scientific study recorded it around the lake during 2016.' },
    source: 'saudipedia',
    credit: { holder: 'Hans Hillewaert', license: 'CC BY-SA 4.0', licenseUrl: BY_SA_4, file: commons('Tachybaptus_ruficollis.jpg') },
  },
  {
    img: '/img/wildlife/ruddy-shelduck', group: 'water', sci: 'Tadorna ferruginea',
    name: { ar: 'بط أبو فروة', en: 'Ruddy Shelduck' },
    note: { ar: 'بطّ برتقالي اللون وثّقت دراسة علمية وجوده حول البحيرة خلال عام 2016.', en: 'An orange-coloured duck that a scientific study recorded around the lake during 2016.' },
    source: 'study',
    credit: { holder: 'Adam Kumiszcza', license: 'CC BY-SA 3.0', licenseUrl: BY_SA_3, file: commons('Tadorna_ferruginea_20080630.jpg') },
  },
  {
    img: '/img/wildlife/common-pochard', group: 'water', sci: 'Aythya ferina',
    name: { ar: 'الحمراوي (البط الغطّاس الشائع)', en: 'Common Pochard' },
    note: { ar: 'بطّ غوّاص وثّقته دراسة علمية حول البحيرة خلال عام 2016.', en: 'A diving duck that a scientific study recorded around the lake during 2016.' },
    source: 'study',
    credit: { holder: 'Charles J. Sharp', license: 'CC BY-SA 3.0', licenseUrl: BY_SA_3, file: commons('Common_pochard_(Aythya_ferina).jpg') },
  },
  {
    img: '/img/wildlife/greater-flamingo', group: 'water', sci: 'Phoenicopterus roseus',
    name: { ar: 'النحام الكبير (الفلامنجو)', en: 'Greater Flamingo' },
    note: { ar: 'تذكر وكالة الأنباء السعودية «النحام» ضمن الطيور المهاجرة إلى البحيرة.', en: 'The Saudi Press Agency names the flamingo among the lake’s migratory birds.' },
    source: 'spa',
    credit: { holder: 'Tim Sträter', license: 'CC BY 2.0', licenseUrl: BY_2, file: commons('Greater_Flamingo_aka_(Phoenicopterus_roseus).jpg') },
  },
  {
    img: '/img/wildlife/pied-avocet', group: 'waders', sci: 'Recurvirostra avosetta',
    name: { ar: 'النكّات الأبقع', en: 'Pied Avocet' },
    note: { ar: 'خوّاض أبيض وأسود بمنقار معقوف إلى الأعلى، وثّقته دراسة علمية حول البحيرة خلال عام 2016.', en: 'A black-and-white wader with an upturned bill that a scientific study recorded around the lake during 2016.' },
    source: 'study',
    credit: { holder: 'Andreas Trepte', license: 'CC BY-SA 2.5', licenseUrl: BY_SA_25, file: commons('Pied_Avocet_Recurvirostra_avosetta.jpg') },
  },
  {
    img: '/img/wildlife/northern-lapwing', group: 'waders', sci: 'Vanellus vanellus',
    name: { ar: 'الزقزاق الشمالي', en: 'Northern Lapwing' },
    note: { ar: 'زائر شتوي يُرى بأعداد قليلة في الأراضي الرطبة؛ سُجّل نحو 10 منه في يناير 2024.', en: 'A winter visitor seen in small numbers at wetlands; about 10 were recorded in January 2024.' },
    source: 'field',
    credit: { holder: 'Noordenbos', license: 'CC BY-SA 3.0', licenseUrl: BY_SA_3, file: commons('Vanellus_vanellus.jpg') },
  },
  {
    img: '/img/wildlife/common-redshank', group: 'waders', sci: 'Tringa totanus',
    name: { ar: 'الطيطوي أحمر الساق', en: 'Common Redshank' },
    note: { ar: 'خوّاض بساقين حمراوين، شوهد بأعداد جيدة في يناير 2024.', en: 'A red-legged wader, seen in good numbers in January 2024.' },
    source: 'field',
    credit: { holder: 'Hans Hillewaert', license: 'CC BY-SA 3.0', licenseUrl: BY_SA_3, file: commons('Tringa_totanus.jpg') },
  },
  {
    img: '/img/wildlife/bar-tailed-godwit', group: 'waders', sci: 'Limosa lapponica',
    name: { ar: 'البقويقة مخطّطة الذيل', en: 'Bar-tailed Godwit' },
    note: { ar: 'خوّاض طويل المنقار؛ سُجّلت 3 أفراد منه في يناير 2024.', en: 'A long-billed wader; 3 were recorded in January 2024.' },
    source: 'field',
    credit: { holder: 'Hobbyfotowiki', license: 'CC0', licenseUrl: CC0, file: commons('Limosa_lapponica_(Bar-tailed_godwit),_Heligoland.jpg') },
  },
  {
    img: '/img/wildlife/collared-pratincole', group: 'waders', sci: 'Glareola pratincola',
    name: { ar: 'أبو اليسر المطوّق', en: 'Collared Pratincole' },
    note: { ar: 'تصفه وكالة الأنباء السعودية بأنه من أكثر الطيور انتظاماً في هجرتها السنوية إلى شبه الجزيرة العربية.', en: 'The Saudi Press Agency describes it as one of the most regular birds in its yearly migration to the Arabian Peninsula.' },
    source: 'spa',
    credit: { holder: 'Dûrzan cîrano', license: 'CC BY-SA 4.0', licenseUrl: BY_SA_4, file: commons('Glareola_pratincola-ku.jpg') },
  },
  {
    img: '/img/wildlife/western-marsh-harrier', group: 'raptors', sci: 'Circus aeruginosus',
    name: { ar: 'مرزة البطائح', en: 'Western Marsh Harrier' },
    note: { ar: 'البحيرة من أفضل مواقع رؤيتها: يقضي فيها الشتاء أكثر من 20 طائراً.', en: 'The lake is one of the best places to see it: more than 20 birds spend the winter here.' },
    source: 'field',
    credit: { holder: 'Gidzy', license: 'CC BY 2.0', licenseUrl: BY_2, file: commons('Circus_aeruginosus_male_flight.jpg') },
  },
  {
    img: '/img/wildlife/greater-spotted-eagle', group: 'raptors', sci: 'Clanga clanga',
    name: { ar: 'العقاب المنقّط الكبير', en: 'Greater Spotted Eagle' },
    note: { ar: 'عقاب داكن كبير يُرى بأعداد قليلة شتاءً؛ سُجّلت 3 أفراد في يناير 2024.', en: 'A large dark eagle seen in small numbers in winter; 3 were recorded in January 2024.' },
    source: 'field',
    credit: { holder: 'Shino jacob koottanad', license: 'CC BY-SA 4.0', licenseUrl: BY_SA_4, file: commons('Greater_spotted_eagle_(Clanga_clanga).jpg') },
  },
  {
    img: '/img/wildlife/bonellis-eagle', group: 'raptors', sci: 'Aquila fasciata',
    name: { ar: 'عقاب بونلي', en: 'Bonelli’s Eagle' },
    note: { ar: 'مشاهدة مفردة: طائر واحد جاثم على أبراج الكهرباء في يناير 2024.', en: 'A single sighting: one bird perched on the electricity pylons in January 2024.' },
    source: 'field',
    credit: { holder: 'Zeddammer', license: 'CC BY-SA 4.0', licenseUrl: BY_SA_4, file: commons('Aquila_fasciata_(Wadi_Hinna,_Oman).jpg') },
  },
  {
    img: '/img/wildlife/pied-kingfisher', group: 'other', sci: 'Ceryle rudis',
    name: { ar: 'الرفراف الأبقع', en: 'Pied Kingfisher' },
    note: { ar: 'صيّاد سمك أبيض وأسود؛ شوهد فرد واحد يطير ثم يحطّ لبرهة في يناير 2024.', en: 'A black-and-white kingfisher; one was seen in flight and then perched briefly in January 2024.' },
    source: 'field',
    credit: { holder: 'Hans Hillewaert', license: 'CC BY-SA 3.0', licenseUrl: BY_SA_3, file: commons('Ceryle_rudis_(male).jpg') },
  },
  {
    img: '/img/wildlife/european-turtle-dove', group: 'other', sci: 'Streptopelia turtur', pos: 'center 8%',
    name: { ar: 'القمري الأوروبي', en: 'European Turtle Dove' },
    note: { ar: 'تذكر وكالة الأنباء السعودية «القمري» ضمن الطيور المهاجرة إلى البحيرة.', en: 'The Saudi Press Agency names the turtle dove among the lake’s migratory birds.' },
    source: 'spa',
    credit: { holder: 'Yuvalr', license: 'CC BY-SA 3.0', licenseUrl: BY_SA_3, file: commons('European_Turtle_Dove_(Streptopelia_turtur).jpg') },
  },
  {
    img: '/img/wildlife/barn-swallow', group: 'other', sci: 'Hirundo rustica', pos: 'center 15%',
    name: { ar: 'سنونو المخازن', en: 'Barn Swallow' },
    note: { ar: 'يرد باسم «خطّاف المخازن» في تقرير وكالة الأنباء السعودية ضمن الطيور المهاجرة إلى البحيرة.', en: 'Listed in the Saudi Press Agency report among the lake’s migratory birds.' },
    source: 'spa',
    credit: { holder: 'Luis Fernández García', license: 'CC BY-SA 4.0', licenseUrl: BY_SA_4, file: commons('Hirundo_rustica_20190505a.jpg') },
  },
];

// The reference list shown under the section. `cite` is the bibliographic line (kept in its own language),
// `note` the Arabic/English description for sources that are not journal papers.
export const WILDLIFE_REFS: { note?: Bi; cite?: string; links: { url: string; label?: Bi }[] }[] = [
  {
    note: {
      ar: 'وكالة الأنباء السعودية (واس): «بحيرة الأصفر بالأحساء.. محمية طبيعية تأوي الطيور المهاجرة إليها»، 13 مارس 2021.',
      en: 'Saudi Press Agency (SPA): report on Al-Asfar Lake and the migratory birds that stop at it, 13 March 2021 (in Arabic).',
    },
    links: [{ url: 'https://www.spa.gov.sa/2199724' }],
  },
  {
    cite: 'Elsohaby I. et al. (2021). Migratory Wild Birds as a Potential Disseminator of Antimicrobial-Resistant Bacteria around Al-Asfar Lake, Eastern Saudi Arabia. Antibiotics 10(3): 260.',
    links: [{ url: 'https://www.mdpi.com/2079-6382/10/3/260' }],
  },
  {
    cite: 'Babbington J., Birds of Saudi Arabia.',
    note: { ar: 'سجلات رصد ميداني:', en: 'Field records:' },
    links: [
      { url: 'https://www.birdsofsaudiarabia.com/2024/01/northern-lapwings-al-asfar-lake.html', label: { ar: 'يناير 2024', en: 'January 2024' } },
      { url: 'https://www.birdsofsaudiarabia.com/2018/02/western-marsh-harrier-al-asfar-lake.html', label: { ar: 'فبراير 2018', en: 'February 2018' } },
      { url: 'https://www.birdsofsaudiarabia.com/2012/02/al-asfar-lake-location-details.html', label: { ar: 'فبراير 2012', en: 'February 2012' } },
    ],
  },
  {
    cite: 'Youssef A.M., Al-Fredan M.A., Fathi A.A. (2009). Floristic Composition of Lake Al-Asfar, Alahsa, Saudi Arabia. International Journal of Botany 5(2): 116–125.',
    links: [{ url: 'https://doi.org/10.3923/ijb.2009.116.125' }],
  },
  {
    cite: 'Chouari W. (2021). Wetland land cover change detection using multitemporal Landsat data: a case study of the Al-Asfar wetland, Kingdom of Saudi Arabia. Arabian Journal of Geosciences 14: 523.',
    links: [{ url: 'https://doi.org/10.1007/s12517-021-06815-y' }],
  },
  {
    cite: 'Turk K.G.B., Alkhamis Y.A., Zeineldin F.I. (2023). The Environmental Impacts of Wetland Areas in Saudi Arabia: The Case Study of Al-Asfar Lake, Review and Perspectives (preprint).',
    links: [{ url: 'https://www.preprints.org/manuscript/202310.0574' }],
  },
  {
    cite: 'Fahmy G.H., Fathi A.A. (2011). Limnological Studies on the Wetland Lake, Al-Asfar, with Special References to Heavy Metal Accumulation by Fish. American Journal of Environmental Sciences 7(6): 515–524.',
    links: [{ url: 'https://doi.org/10.3844/ajessp.2011.515.524' }],
  },
  {
    cite: 'Abdel-Moneim A.M. (2014). Histopathological and ultrastructural perturbations in tilapia liver as potential indicators of pollution in Lake Al-Asfar, Saudi Arabia. Environmental Science and Pollution Research.',
    links: [{ url: 'https://doi.org/10.1007/s11356-013-2185-9' }],
  },
  {
    note: {
      ar: 'صحيفة عاجل: «البيئة تخصص أرض بحيرة الأصفر بالأحساء لإقامة محمية طبيعية»، 12 فبراير 2019.',
      en: 'Ajel newspaper: report on the ministry allocating the lake’s land for a nature reserve, 12 February 2019 (in Arabic).',
    },
    links: [{ url: 'https://ajel.sa/tourism/djx7bt' }],
  },
  {
    note: { ar: 'سعوديبيديا: «بحيرة الأصفر».', en: 'Saudipedia: “Al-Asfar Lake” (in Arabic).' },
    links: [{ url: 'https://saudipedia.com/بحيرة-الأصفر2' }],
  },
];
