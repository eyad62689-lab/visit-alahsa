// المكوّنات الاثنا عشر لموقع التراث العالمي 1563 «واحة الأحساء، مشهد ثقافي متطور» (2018).
// الأسماء الإنجليزية والمساحات حرفياً من جدول المكوّنات الرسمي (whc.unesco.org/en/list/1563/maps/)؛
// الأسماء العربية والأوصاف من «الوصف الكتابي لحدود الممتلكات المرشحة» في الملخص التنفيذي العربي
// لملف الترشيح (2017، ص 5–8)، بإملاء الموقع (جواثا لا جواثى). مساحة جواثا الأثري 284 من الجدول؛
// النص العربي للملف يكتبها 248 مقلوبة الخانتين، ومجموع المكوّنات لا يبلغ 8,544 إلا بـ284.
// الصفحة تعريف بالمكوّنات كما سُجّلت، لا دليل زيارة: لا مواعيد ولا رسوم ولا روابط معالم هنا.

export interface UnescoComponent {
  id: string;
  name: string;
  name_en: string;
  areaHa: number;
  desc: string;
  desc_en: string;
  /** المسار الأساسي بلا امتداد؛ غيابه = عنصر نائب حتى تتوفر صورة مرخّصة */
  img?: string;
  /** ما تُظهره الصورة حين لا تطابق المكوّن كله */
  imgNote?: string;
  imgNote_en?: string;
  /** صورة الغير: المصوّر والترخيص ورابط الملف */
  credit?: { author: string; license: string; licenseUrl: string; fileUrl: string };
}

export const UNESCO_MAPS_URL = 'https://whc.unesco.org/en/list/1563/maps/';
export const UNESCO_TOTAL_HA = 8544;

export const UNESCO_COMPONENTS: UnescoComponent[] = [
  {
    id: '1563-001', name: 'الواحة الشرقية', name_en: 'Eastern Oasis', areaHa: 3885,
    desc: 'أكبر المكوّنات: قطاع واسع من الواحة الشرقية على هيئة هلال يمتد نحو 9 كم من الشمال إلى الجنوب و12 كم من الشرق إلى الغرب، فيه بساتين نخيل كثيفة ومزارع تحدّها شبكة من القنوات، ويضم جبل القارة في شماله الشرقي.',
    desc_en: 'The largest component: a broad crescent of the eastern oasis about 9 km from north to south and 12 km from east to west, with dense palm groves and farmland bounded by a network of channels, and Jabal Al-Qarah in its north-east.',
    img: '/img/jabal-al-qarah', imgNote: 'في الصورة: جبل القارة داخل الواحة الشرقية', imgNote_en: 'Pictured: Jabal Al-Qarah, within the Eastern Oasis',
  },
  {
    id: '1563-002', name: 'الواحة الشمالية', name_en: 'Northern Oasis', areaHa: 2010,
    desc: 'قطاع كبير من الواحة الشمالية تحدّه قناة الصرف الرئيسة شرقاً، وشبكة قنوات من سبعينيات القرن الماضي في بقية الجهات، وقد استُثنيت منه القرى التاريخية وامتداداتها الحديثة.',
    desc_en: 'A large part of the northern oasis, bounded on the east by the main drainage channel and on its other sides by a network of channels from the 1970s; the historic villages and their modern extensions are left outside it.',
  },
  {
    id: '1563-003', name: 'السيف', name_en: 'As-Seef', areaHa: 108,
    desc: 'القطاع الأوسط من بساتين نخيل السيف في الهفوف، تحدّه المقبرة التاريخية الكبيرة للمدينة شرقاً، ويحيط به حزام أخضر بعرض 150 إلى 200 م يفصله عن الأحياء المجاورة.',
    desc_en: 'The central part of the As-Seef palm groves in Hofuf, bounded on the east by the city’s large historic cemetery and ringed by a green belt 150 to 200 m wide that separates it from the neighbouring districts.',
  },
  {
    id: '1563-004', name: 'قصر إبراهيم', name_en: 'Qasr Ibrahim', areaHa: 1.97,
    desc: 'المجمع التاريخي لقصر إبراهيم وسط الهفوف، أبرز البقايا المعمارية من حقبة الحكم العثماني للمدينة.',
    desc_en: 'The historic Qasr Ibrahim complex in central Hofuf, the main architectural remains of the city’s Ottoman period.',
    img: '/img/qasr-ibrahim',
  },
  {
    id: '1563-005', name: 'سوق القيصرية', name_en: 'Suq al-Qaysariyah', areaHa: 0.93,
    desc: 'من أبرز ملامح النسيج العمراني للهفوف: ثلاث وحدات معمارية تمتد نحو 250 م على طريق الملك عبدالعزيز، أُعيد بناؤها بعد حريق مدمّر.',
    desc_en: 'One of the defining features of Hofuf’s urban fabric: three architectural units stretching about 250 m along King Abdulaziz Road, rebuilt after a devastating fire.',
    img: '/img/qaisariyah',
  },
  {
    id: '1563-006', name: 'قصر خزام', name_en: 'Qasr Khuzam', areaHa: 0.67,
    desc: 'حصن تاريخي كان يقع جنوب غرب المدينة المسوّرة، وصار اليوم داخل العمران الحديث للهفوف.',
    desc_en: 'A historic fort that once stood south-west of the walled city and now lies within modern Hofuf.',
    img: '/img/khuzam-01',
  },
  {
    id: '1563-007', name: 'قصر صاهود', name_en: 'Qasr Sahood', areaHa: 1.2,
    desc: 'حصن مستطيل الشكل تقريباً في المبرز، كان يقع خارج سور المدينة الغربي.',
    desc_en: 'A roughly rectangular fort in Al-Mubarraz that originally stood outside the city’s western wall.',
    img: '/img/sahood',
  },
  {
    id: '1563-008', name: 'موقع جواثا الأثري', name_en: 'Jawatha archaeological site', areaHa: 284,
    desc: 'رقعة واسعة من الأرض الصحراوية مسيّجة بالكامل، تتبع حدودها حدود الأرض المملوكة للدولة، وتقع بين جبل بريقا ومنتزه الأحساء الوطني.',
    desc_en: 'A wide, fully fenced expanse of desert land whose boundary follows that of the state-owned plot, lying between Jabal Burayqa and Al-Ahsa National Park.',
  },
  {
    id: '1563-009', name: 'مسجد جواثا', name_en: 'Jawatha Mosque', areaHa: 0.08,
    desc: 'أصغر المكوّنات الاثني عشر: المسجد المرمّم وجداره الخارجي المحيط به.',
    desc_en: 'The smallest of the twelve components: the restored mosque and the outer wall around it.',
    img: '/img/jawatha-mosque',
  },
  {
    id: '1563-010', name: 'قرية العيون', name_en: 'Al-`Oyun village', areaHa: 63.35,
    desc: 'جزءان متصلان في الركن الشمالي للواحة: الحي القديم لقرية العيون بشكله الدائري، وأقرب بساتين الواحة إليه حتى قناة الصرف التي تعبر واحة العيون.',
    desc_en: 'Two connected parts at the northern corner of the oasis: the circular old quarter of Al-Oyun village, and the nearest palm groves of the oasis up to the drainage channel that crosses the Al-Oyun oasis.',
  },
  {
    id: '1563-011', name: 'موقع عين قناص الأثري', name_en: '`Ain Qinas archaeological site', areaHa: 18.8,
    desc: 'موقع أثري نُقِّب في سبعينيات القرن الماضي، مسيّج بالكامل.',
    desc_en: 'An archaeological site excavated in the 1970s and fully fenced.',
    img: '/img/unesco/ain-qinas',
    credit: {
      author: 'Richard Mortel', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
      fileUrl: 'https://commons.wikimedia.org/wiki/File:Ayn_Qannas_Neolithic_Site,_ca._7000_BCE_and_after,_al-Ahsa_(6)_(50620601991).jpg',
    },
  },
  {
    id: '1563-012', name: 'بحيرة الأصفر', name_en: 'Al-Asfar Lake', areaHa: 2170,
    desc: 'بحيرة الأصفر ومنطقة الصرف التي تتجمع فيها مياه الواحة، ومعها الجزء الشمالي من قناة الصرف الرئيسة للواحة الشرقية من الطريق السريع إلى شاطئ البحيرة؛ وفيها نظام بيئي طبيعي فريد.',
    desc_en: 'Al-Asfar Lake, the drainage area where the oasis’s water collects, together with the northern stretch of the Eastern Oasis’s main drainage channel from the highway to the lakeshore; it holds a unique natural ecosystem.',
    img: '/img/asfar',
  },
];
