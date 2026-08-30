// أماكن صفحة «المطاعم والمقاهي» — كانت محبوسة داخل DiningView.astro فأُخرجت
// هنا (دفعة 3 — 2026-08-29) على سابقة events.ts: مصدر واحد للعرض ولأي صفحات
// مفردة مستقبلاً (سيو محلي: «مطعم X الهفوف»).
//
// الأسماء العربية = displayName الرسمي في خرائط قوقل (قرار إياد 2026-08-30،
// مصدره سجل بناء Netlify الذي طبع اسم كل مكان عند حلّ معرّفه). قاعدة التطبيق:
// يُؤخذ الشقّ العربي من الأسماء ثنائية النص، وتُسقط الذيول التسويقية التي ليست
// اسماً («مقرمشات لذيذة») والنقطة الزائدة، ولا يُترجَم اسمٌ لم يعطِ قوقل صيغته
// اللاتينية. أبرز التصحيحات: «شارع 7» كانت ترجمة خاطئة للعلامة 7st، و«كرك
// رسلان» اسمها الرسمي «رسلان كافيه»، و«بيذانة» ← «بيذانه» (وقد كان الاسم
// الصحيح في place-seeds.json منذ البداية).
//
// قاعدة ملزمة: لا تُختلق معلومة — الأسماء والصور وروابط الخرائط من ملفَي إياد
// (أفضل مطاعم/مقاهي الأحساء.docx)، والأحياء من عناوين خرائط قوقل (تحقق HTTP
// فعلي 2026-08-22). تصحيحان مثبتان: «بيت الموت» في ملف إياد = بيت الكوت،
// و«ريشيو الموت» = ريشيو الكوت. مفاتيح live (تقييمات Google Places) تُشتق من
// مسار img في tools/fetch-places.mjs — لا تغيّر المسارات دون مزامنة place-seeds.

// blurb: نبذة تعريفية موجزة — تصف ما تُظهره صورة المكان واسمه الموثق فقط
// (لا ادعاءات عن الجودة أو الأصناف أو الشهرة — قاعدة «لا تُختلق معلومة»)
// district: مفتاح الموقع المعياري للتصفية — مشتقّ من حقل area النصّي وعناوين قوقل
// في place-seeds.json، بلا استنتاج.
// حُسمت المنشآت الأربع التي لم يذكر عنوانُ قوقل حيَّها بإفادة إياد (2026-08-30):
// دار بسمة = الكوت، جريسي فنجرز = الخالدية، سلاف = الروضة، ورسلان كافيه لا حيَّ
// له بل طريق الخليج وحده (ويُعرف محلياً بطريق قطر). فلا قيمة null بعد اليوم.
export type District = 'alkoot' | 'downtown' | 'rafah-north' | 'khalidiyah' | 'rawdah'
  | 'mazrou' | 'uwaimriyah' | 'olaya' | 'khaleej' | 'mubarraz';
export type Place = { img: string; alt: string; name: string; area: string; maps: string; blurb: string; district: District };

// الحقول المشتركة بين اللغتين (الصورة والرابط والحي) تُعرَّف مرة واحدة.
// النوع مُصرَّح لأن TypeScript يوسّع 'alkoot' إلى string بلا تصريح فتنكسر District.
const P: Record<string, { img: string; maps: string; district: District }> = {
  darBasma: { img: '/img/dining/dar-basma', maps: 'https://maps.app.goo.gl/CLwUux3kdzc5Z4WE6', district: 'alkoot' },
  alkoot: { img: '/img/dining/alkoot-hotel', maps: 'https://maps.app.goo.gl/gjwiTHDg83VZEbz76', district: 'alkoot' },
  alhawi: { img: '/img/dining/alhawi', maps: 'https://maps.app.goo.gl/GZ61EihCSipwJyzJ8', district: 'khalidiyah' },
  khunaina: { img: '/img/dining/khunaina', maps: 'https://maps.app.goo.gl/LZWmKXLDNreXhUHL6', district: 'khalidiyah' },
  sinyar: { img: '/img/dining/sinyar', maps: 'https://maps.app.goo.gl/kiKK2QEshBwycpDn6', district: 'uwaimriyah' },
  greasy: { img: '/img/dining/greasy-fingers', maps: 'https://maps.app.goo.gl/AQhfw1PKHnLviEyt6', district: 'khalidiyah' },
  lava: { img: '/img/dining/lava', maps: 'https://maps.app.goo.gl/eYZPQBsVxoBjMyvb6', district: 'olaya' },
  ammo: { img: '/img/dining/ammo', maps: 'https://maps.app.goo.gl/sj8f9VMZL3LdthJX9', district: 'mazrou' },
  sharq: { img: '/img/dining/sharq-alqaisariah', maps: 'https://maps.app.goo.gl/BqEvhdZMRoYrbWDv8', district: 'rafah-north' },
  koud: { img: '/img/dining/koud', maps: 'https://maps.app.goo.gl/RVVLPpJCUVfpCdWt7', district: 'mazrou' },
  // المقاهي
  baithana: { img: '/img/dining/baithana', maps: 'https://maps.app.goo.gl/aeUQ4kyTwg2MoHVx5', district: 'rafah-north' },
  sevenSt: { img: '/img/dining/7st', maps: 'https://maps.app.goo.gl/bMQ48Y8Lj6gNyjUu6', district: 'rafah-north' },
  baitAlkoot: { img: '/img/dining/bait-alkoot', maps: 'https://maps.app.goo.gl/gkvgXUYMUZsV5BK38', district: 'downtown' },
  darHuwaija: { img: '/img/dining/dar-huwaija', maps: 'https://maps.app.goo.gl/EejCz9U79km3VEUL6', district: 'downtown' },
  alsayed: { img: '/img/dining/alsayed', maps: 'https://maps.app.goo.gl/QC9hzwbXQ6PT8m5W9', district: 'rafah-north' },
  ratio: { img: '/img/dining/ratio-alkoot', maps: 'https://maps.app.goo.gl/yRnN7ZTrcWPQ5XxJ8', district: 'downtown' },
  soulaf: { img: '/img/dining/soulaf', maps: 'https://maps.app.goo.gl/S47bGoYznnPUYTrm6', district: 'rawdah' },
  bakingUp: { img: '/img/dining/baking-up', maps: 'https://maps.app.goo.gl/Vq412YHJLwnKc1SE8', district: 'mubarraz' },
  dot: { img: '/img/dining/dot-bakery', maps: 'https://maps.app.goo.gl/hMbtPX8FL5XDQwWU6', district: 'mubarraz' },
  raslan: { img: '/img/dining/karak-raslan', maps: 'https://maps.app.goo.gl/ctJt3bVV2hDtSYX56', district: 'khaleej' },
};

export const RESTAURANTS_AR: Place[] = [
  { ...P.darBasma, name: 'مطعم دار بسمة', area: 'حي الكوت — بجوار حديقة قصر إبراهيم', alt: 'واجهة دار بسمة الزجاجية وجلساتها الخارجية بين النخيل مساءً',
    blurb: 'جلسات خارجية بين النخيل وواجهة زجاجية على طرف حديقة قصر إبراهيم.' },
  { ...P.alkoot, name: 'مطعم فندق الكوت التراثي', area: 'حي الكوت — مقابل قصر إبراهيم', alt: 'الفناء الداخلي لفندق الكوت التراثي بأروقته وسقفه الزجاجي',
    blurb: 'مطعم الفندق التراثي — موائد تحت سقف زجاجي في فناءٍ تحيط به الأروقة.' },
  { ...P.alhawi, name: 'مطعم الحوي', area: 'حي الخالدية — مقابل جامعة الملك فيصل', alt: 'سفرة فطور شعبي بأطباقها المتنوعة في مطعم الحوي',
    blurb: 'سفرة فطور شعبي تُبسط على الخوص طبقاً إلى جانب طبق.' },
  { ...P.khunaina, name: 'مطعم خنينة', area: 'حي الخالدية — الهفوف', alt: 'أطباق تراثية تُقدَّم في سلال الخوص على طاولة مطعم خنينة',
    blurb: 'أطباق تراثية تُقدَّم في سلال الخوص وسط جلسات مخملية داكنة الخضرة.' },
  { ...P.sinyar, name: 'سنيار', area: 'طريق الخليج — العويمرية', alt: 'واجهة مطعم سنيار الترابية وشعاره بالخط العربي عند المساء',
    blurb: 'مبنى ترابي بطابع تراثي حديث يحمل اسمه بالخط العربي.' },
  { ...P.greasy, name: 'جريسي فنجرز', area: 'حي الخالدية — شارع الأمير نواف', alt: 'برجر وبطاطس مقلية على صينية تقديم في جريسي فنجرز',
    blurb: 'برجر وبطاطس على صوانٍ معدنية — الخيار العصري السريع في القائمة.' },
  { ...P.lava, name: 'مطعم لافا', area: 'طريق الخليج — حي العليا', alt: 'أطباق متنوعة على طاولة رخامية في مطعم لافا',
    blurb: 'أطباق تصل ساخنة في مقالٍ حديدية على طاولات رخامية.' },
  { ...P.ammo, name: 'مطعم آمو', area: 'طريق الملك عبدالله — حي المزروع', alt: 'واجهة مطعم آمو الزجاجية بشعاره المضيء ليلاً',
    blurb: 'واجهة زجاجية حديثة يتوّجها شعاره المضيء.' },
  { ...P.sharq, name: 'مطعم شرق القيصرية', area: 'حي الرفعة الشمالية — الهفوف', alt: 'مدخل مطعم شرق القيصرية بقوسه المزخرف وجلساته الخارجية',
    blurb: 'بوابة بقوس مزخرف تفضي إلى جلسات بطابع تراثي.' },
  { ...P.koud, name: 'مطعم كود', area: 'طريق الملك عبدالله — حي المزروع', alt: 'واجهة كود — مطعم ومقهى — بشعارها المضيء بالخط العربي',
    blurb: 'مطعم ومقهى معاً — كما تعلن واجهته الداكنة بحروفها المضيئة.' },
];

export const CAFES_AR: Place[] = [
  { ...P.baithana, name: 'مقهى بيذانه', area: 'حي الرفعة الشمالية — الهفوف', alt: 'مدخل مقهى بيذانه بجدرانه الطينية وبابه الخشبي في حارة تراثية',
    blurb: 'بيت طيني بباب خشبي في حارة من حارات الهفوف القديمة.' },
  { ...P.sevenSt, name: '7st', area: 'حي الرفعة الشمالية — الهفوف', alt: 'ركن جلوس بكراسٍ جلدية ونافذة زجاج ملون داخل مقهى 7st',
    blurb: 'قهوة مختصة في جلسة كلاسيكية بكراسٍ جلدية ونوافذ من الزجاج الملون.' },
  { ...P.baitAlkoot, name: 'بيت الكوت', area: 'وسط الهفوف التاريخي', alt: 'واجهة بيت الكوت بإضاءتها المتدلية عند المساء',
    blurb: 'بيت بطراز أحسائي تتدلى فوقه الإضاءة في قلب الهفوف التاريخي.' },
  { ...P.darHuwaija, name: 'دار حويجة', area: 'شارع الملك فهد — وسط الهفوف التاريخي', alt: 'جلسات دار حويجة بين الأقواس الجصية والكراسي الخشبية',
    blurb: 'جلسات بين أقواس جصية بيضاء وأرفف تحمل عُدَّة القهوة.' },
  { ...P.alsayed, name: 'مقهى السيد', area: 'حي الرفعة الشمالية — الهفوف', alt: 'الجلسة التراثية بسقفها الخشبي داخل مقهى السيد',
    blurb: 'جلسة تراثية بسقف خشبي تحفظ ملامح المقاهي الشعبية.' },
  { ...P.ratio, name: 'ريشيو الكوت', area: 'طريق الملك عبدالعزيز — وسط الهفوف التاريخي', alt: 'مجلس تراثي بوسائد وسجاد تحت سقف من جذوع النخل في ريشيو الكوت',
    blurb: 'مجلس عربي بوسائد وسجاد تحت سقف من جذوع النخل.' },
  { ...P.soulaf, name: 'سلاف', area: 'حي الروضة — طريق الملك عبدالله', alt: 'داخلية مقهى سلاف العصرية بشجرة الزيتون وسقفها الخشبي',
    blurb: 'داخلية عصرية هادئة تتوسطها شجرة زيتون تحت فتحة سماوية.' },
  { ...P.bakingUp, name: 'بيكنج أب', area: 'طريق عين نجم — المبرز', alt: 'واجهة بيكنج أب وجلساتها الخارجية بمظلاتها',
    blurb: 'مخبوزات ومقرمشات — كما يعرّف نفسه في خرائط قوقل — بواجهة مبهجة وجلسات خارجية.' },
  { ...P.dot, name: 'مخبز ومقهى دوت', area: 'طريق عين نجم — المبرز', alt: 'ركن الطلب وواجهة عرض المخبوزات في مخبز ومقهى دوت',
    blurb: 'مخبز ومقهى معاً: واجهة عرض للمخبوزات وركن طلب بلمسة زرقاء.' },
  { ...P.raslan, name: 'رسلان كافيه', area: 'طريق الخليج (طريق قطر)', alt: 'أكواب الكرك على صينية خشبية مع أطباق فطور في رسلان كافيه',
    blurb: 'كركٌ يُصبّ في أكواب صغيرة مع أصناف فطور بسيطة.' },
];

export const RESTAURANTS_EN: Place[] = [
  { ...P.darBasma, name: 'Dar Basma', area: 'Al-Koot district — next to Qasr Ibrahim park', alt: 'Dar Basma’s glass façade and outdoor seating among the palms at night',
    blurb: 'Outdoor seating among the palms and a glass façade on the edge of the Qasr Ibrahim park.' },
  { ...P.alkoot, name: 'Al-Koot Heritage Hotel Restaurant', area: 'Al-Koot district — opposite Qasr Ibrahim', alt: 'The courtyard of Al-Koot Heritage Hotel with its arcades and glass roof',
    blurb: 'The heritage hotel’s restaurant — tables beneath a glass roof in an arcaded courtyard.' },
  { ...P.alhawi, name: 'Al-Hawi', area: 'Al-Khalidiyah — opposite King Faisal University', alt: 'A traditional breakfast spread of assorted dishes at Al-Hawi',
    blurb: 'A traditional breakfast spread laid out on woven mats, plate after plate.' },
  { ...P.khunaina, name: 'Khunaina', area: 'Al-Khalidiyah — Al-Hofuf', alt: 'Heritage dishes served in wicker baskets at Khunaina',
    blurb: 'Heritage dishes served in wicker baskets amid deep-green velvet seating.' },
  { ...P.sinyar, name: 'Sinyar', area: 'Al-Khaleej Road — Al-Uwaimriyah', alt: 'Sinyar’s earthen façade and Arabic calligraphy sign at dusk',
    blurb: 'A modern earthen building carrying its name in Arabic calligraphy.' },
  { ...P.greasy, name: 'Greasy Fingers', area: 'Al-Khalidiyah — Prince Nawwaf Street', alt: 'A burger and fries on a serving tray at Greasy Fingers',
    blurb: 'Burgers and fries on metal trays — the modern casual pick of the list.' },
  { ...P.lava, name: 'Lava', area: 'Al-Khaleej Road — Al-Olaya', alt: 'Assorted dishes on a marble table at Lava',
    blurb: 'Dishes arriving hot in iron skillets on marble tables.' },
  { ...P.ammo, name: 'Ammo', area: 'King Abdullah Road — Al-Mazrou‘', alt: 'Ammo’s glass façade with its illuminated sign at night',
    blurb: 'A modern glass façade crowned by its glowing sign.' },
  { ...P.sharq, name: 'Sharq Al-Qaisariyah', area: 'Al-Raf‘ah North — Al-Hofuf', alt: 'The ornate arched entrance and outdoor seating of Sharq Al-Qaisariyah',
    blurb: 'An ornate arched gateway opening onto heritage-styled seating.' },
  { ...P.koud, name: 'Koud', area: 'King Abdullah Road — Al-Mazrou‘', alt: 'Koud’s façade — restaurant and café — with its lit Arabic sign',
    blurb: 'Restaurant and café in one — as its dark façade announces in glowing Arabic letters.' },
];

export const CAFES_EN: Place[] = [
  { ...P.baithana, name: 'Baithana', area: 'Al-Raf‘ah North — Al-Hofuf', alt: 'Baithana’s mud-plastered entrance and wooden door in a heritage lane',
    blurb: 'A mud-plastered house with a wooden door in one of Hofuf’s old lanes.' },
  { ...P.sevenSt, name: '7st. Speciality Coffee', area: 'Al-Raf‘ah North — Al-Hofuf', alt: 'A sitting corner with leather armchairs and a stained-glass window at 7st',
    blurb: 'Specialty coffee in a classic sitting room of leather chairs and stained glass.' },
  { ...P.baitAlkoot, name: 'Bait Al-Koot', area: 'Historic downtown Al-Hofuf', alt: 'Bait Al-Koot’s façade with hanging lights at dusk',
    blurb: 'An Ahsai-style house strung with lights in the historic heart of Hofuf.' },
  { ...P.darHuwaija, name: 'Dar Huwaija', area: 'King Fahd Road — historic downtown Al-Hofuf', alt: 'Dar Huwaija’s seating among plaster arches and wooden chairs',
    blurb: 'Seating among white plaster arches and shelves of coffee-making gear.' },
  { ...P.alsayed, name: 'Al-Sayed Café', area: 'Al-Raf‘ah North — Al-Hofuf', alt: 'The heritage interior of Al-Sayed Café with its wooden ceiling',
    blurb: 'A heritage interior with a wooden ceiling that keeps the feel of the old coffeehouses.' },
  { ...P.ratio, name: 'Ratio Al-Koot', area: 'King Abdulaziz Road — historic downtown Al-Hofuf', alt: 'A traditional majlis with cushions and rugs beneath a palm-trunk ceiling at Ratio Al-Koot',
    blurb: 'An Arabian majlis of cushions and rugs beneath a palm-trunk ceiling.' },
  { ...P.soulaf, name: 'Soulaf Coffee', area: 'Al-Rawdah — King Abdullah Road', alt: 'Soulaf Coffee’s modern interior with an olive tree and slatted ceiling',
    blurb: 'A calm, modern interior centred on an olive tree beneath a skylight.' },
  { ...P.bakingUp, name: 'Baking Up', area: 'Ain Najm Road — Al-Mubarraz', alt: 'Baking Up’s storefront with umbrellas and outdoor seating',
    blurb: 'Bakes and crunchy treats — as it calls itself on Google Maps — behind a cheerful storefront.' },
  { ...P.dot, name: 'Dot Bakery & Café', area: 'Ain Najm Road — Al-Mubarraz', alt: 'The order counter and pastry display at Dot Bakery & Café',
    blurb: 'Bakery and café in one: a fresh-pastry display with a blue-accented order counter.' },
  { ...P.raslan, name: 'Raslan Cafe', area: 'Al-Khaleej Road (Qatar Road)', alt: 'Cups of karak on a wooden tray with breakfast dishes at Raslan Cafe',
    blurb: 'Karak poured into small cups alongside simple breakfast bites.' },
];
