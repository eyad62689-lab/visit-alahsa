// سلاسل صفحة مكوّنات اليونسكو بلغات خطوط الترجمة (zh/de/ru/ur/tr)، كلٌّ من خط ترجمة لغته بعتبته
// (دفعات unesco-comp-<lang>). المصدر الإنجليزي والعربي في UnescoComponentsView.astro وunesco-components.ts.
// {total} و{n} أرقام تملؤها الصفحة بتنسيق لغتها؛ والأسماء اللاتينية في الإسناد (أصحاب الحقوق والرخص) لا تُترجم.
import type { Lang } from '../i18n/ui';

export interface UnescoPageStrings {
  title: string; lead: string; comp: string; area: string; noImg: string; photo: string; via: string;
  viaUnesco: string; viaCommons: string; srcH: string; src: string; srcBounds: string; srcMaps: string;
  srcSite: string; seoTitle: string; seoDesc: string;
}
export interface UnescoI18n {
  page: UnescoPageStrings;
  /** بمعرّف المكوّن؛ imgNote حيث يحمل المكوّن تعليق صورة في المصدر */
  comps: Record<string, { name: string; desc: string; imgNote?: string }>;
}

export const UNESCO_I18N: Partial<Record<Exclude<Lang, 'ar' | 'en'>, UnescoI18n>> = {
  // @zh
  zh: {
    page: {
      title: "哈萨绿洲列入联合国教科文组织世界遗产名录",
      lead: "哈萨绿洲于 2018 年列入该名录（编号 1563），共十二处组成部分，汇集了绿洲的椰枣林、古堡、集市、考古遗址与湖泊，总面积 {total} 公顷。本页介绍的是各组成部分列入名录时的范围，并非游览指南：有些是大片农田，有些是设有围栏的考古用地。",
      comp: "组成部分",
      area: "遗产区面积 {n} 公顷",
      noImg: "暂无授权图片",
      photo: "图片",
      via: "来源：",
      viaUnesco: "联合国教科文组织世界遗产中心 ↗",
      viaCommons: "维基共享资源 ↗",
      srcH: "资料来源",
      src: "各组成部分的名称与面积依据联合国教科文组织世界遗产中心 1563 号遗产地页面上的组成部分表格，描述出自该遗产地的申报文件（2017 年）。东部绿洲、赛夫、易卜拉欣宫、萨胡德宫和阿斯法湖的图片取自联合国教科文组织图库收录的该遗产地申报文件图片，完整展示、未作改动，并注明权利人。北部绿洲、贾瓦塔考古遗址和乌尤恩村则采用 Sentinel-2 卫星影像（2016 年），我们依据申报文件中的地图，在影像上描出了各组成部分的边界。",
      srcBounds: "联合国教科文组织网站上的组成部分边界图 ↗",
      srcMaps: "联合国教科文组织网站上的组成部分列表与地图 ↗",
      srcSite: "联合国教科文组织 1563 号遗产地 ↗",
      seoTitle: "哈萨绿洲世界遗产的十二处组成部分",
      seoDesc: "哈萨绿洲列入联合国教科文组织世界遗产名录的十二处组成部分：两片绿洲、赛夫椰枣林、三座古堡、一处集市、一座清真寺、两处考古遗址、一座村庄和一个湖泊。",
    },
    comps: {
      '1563-001': { name: "东部绿洲", desc: "面积最大的组成部分，是东部绿洲中一片宽阔的新月形地带，东西长约 12 公里、南北宽约 9 公里，椰枣林茂密，农田以渠网为界，东北部还包含卡拉山。", imgNote: "航拍卡拉山" },
      '1563-002': { name: "北部绿洲", desc: "北部绿洲的一大片区域，东面以主排水渠为界，其余各面以 20 世纪 70 年代的渠网为界；历史村落及其现代扩建部分不在范围之内。", imgNote: "卫星影像；图中线条依联合国教科文组织地图描出，为该组成部分的边界" },
      '1563-003': { name: "赛夫", desc: "位于胡富夫的赛夫椰枣林中部地段，东面以该市规模很大的历史墓地为界；外围有一条宽 150 至 200 米的绿化带，将其与相邻街区隔开。" },
      '1563-004': { name: "易卜拉欣宫", desc: "位于胡富夫市中心的易卜拉欣宫历史建筑群，是该市奥斯曼时期最主要的建筑遗存。" },
      '1563-005': { name: "凯撒利亚集市", desc: "胡富夫城市肌理中最具代表性的特征之一：三个建筑单元沿阿卜杜勒阿齐兹国王路延伸约 250 米，在一场严重的大火之后重建。" },
      '1563-006': { name: "胡扎姆宫", desc: "一座古堡，当年位于城墙环绕的城市西南面，该处如今已属胡富夫的现代市区。" },
      '1563-007': { name: "萨胡德宫", desc: "穆巴拉兹市内一座大致呈长方形的古堡，当年位于该市西城墙之外。" },
      '1563-008': { name: "贾瓦塔考古遗址", desc: "一大片被围栏完全围起的沙漠地带，边界与国有地块的边界一致，位于布赖卡山与哈萨国家公园之间。", imgNote: "卫星影像；图中线条依联合国教科文组织地图描出，为该组成部分的边界" },
      '1563-009': { name: "贾瓦塔清真寺", desc: "十二处组成部分中面积最小的一处：经修复的清真寺及其周围的围墙。" },
      '1563-010': { name: "乌尤恩村", desc: "位于绿洲北角，由两个相连的部分组成：呈圆形的乌尤恩村老区，以及距该老区最近的绿洲椰枣林，范围延伸至横穿乌尤恩绿洲的排水渠。", imgNote: "卫星影像；图中线条依联合国教科文组织地图描出，为该组成部分的边界" },
      '1563-011': { name: "艾因卡纳斯考古遗址（Ain Qannas）", desc: "一处 20 世纪 70 年代发掘的考古遗址，被围栏完全围起。" },
      '1563-012': { name: "阿斯法湖", desc: "阿斯法湖是汇集绿洲之水的排水区，范围还包括东部绿洲主排水渠从高速公路至湖岸的北段；该组成部分拥有独特的自然生态系统。" },
    },
  },
  // @de
  de: {
    page: {
      title: "Oase Al-Ahsa auf der UNESCO-Welterbeliste",
      lead: "Die Oase Al-Ahsa wurde 2018 mit zwölf Bestandteilen in die UNESCO-Welterbeliste aufgenommen (Stätte Nr. 1563). Die Bestandteile vereinen die Palmenhaine, Festungen, den Markt, die archäologischen Stätten und den See der Oase und erstrecken sich zusammen über {total} Hektar. Diese Seite stellt die Bestandteile so vor, wie sie aufgenommen wurden. Ein Reiseführer ist sie nicht: Manche Bestandteile sind weite Agrarflächen, andere umzäunte archäologische Areale.",
      comp: "Bestandteil",
      area: "Ausgewiesene Fläche {n} ha",
      noImg: "Noch kein lizenziertes Foto",
      photo: "Foto",
      via: "Quelle:",
      viaUnesco: "UNESCO-Welterbezentrum ↗",
      viaCommons: "Wikimedia Commons ↗",
      srcH: "Quelle",
      src: "Namen und Flächen der Bestandteile folgen der Tabelle der Bestandteile auf der Seite der Stätte 1563 beim UNESCO-Welterbezentrum; die Beschreibungen stammen aus dem Nominierungsdossier der Stätte (2017). Die Fotos der Östlichen Oase, von As-Seef, Qasr Ibrahim, dem Sahood-Palast und dem Al-Asfar-See stammen aus der UNESCO-Galerie der Stätte (Nominierungsdossier) und werden vollständig und unverändert gezeigt, mit Nennung der Rechteinhaber. Für die Nördliche Oase, die archäologische Stätte Jawatha und das Dorf Al-Oyoun zeigen wir Satellitenbilder von Sentinel-2 (2016), in die wir die Grenze jedes Bestandteils eingezeichnet haben, übertragen aus den Karten des Nominierungsdossiers.",
      srcBounds: "Grenzkarten der Bestandteile bei der UNESCO ↗",
      srcMaps: "Tabelle der Bestandteile und Karten bei der UNESCO ↗",
      srcSite: "Stätte 1563 bei der UNESCO ↗",
      seoTitle: "Die zwölf Bestandteile der Oase Al-Ahsa im UNESCO-Welterbe",
      seoDesc: "Die zwölf UNESCO-Bestandteile der Oase Al-Ahsa: zwei Oasen, As-Seef, drei Festungen, ein Markt, eine Moschee, zwei archäologische Stätten, ein Dorf und ein See.",
    },
    comps: {
      '1563-001': { name: "Östliche Oase", desc: "Der größte Bestandteil: ein breiter, halbmondförmiger Abschnitt der Östlichen Oase, etwa 9 km von Nord nach Süd und 12 km von Ost nach West. Er ist von einem Kanalnetz begrenzt und von dichten Palmenhainen und Ackerland geprägt; im Nordosten liegt Jabal al-Qarah (der Qarah-Berg).", imgNote: "Im Bild: Jabal al-Qarah aus der Luft" },
      '1563-002': { name: "Nördliche Oase", desc: "Ein großer Teil der Nördlichen Oase. Seine Grenze bildet im Osten der Hauptdrainagekanal, auf den übrigen Seiten ein Kanalnetz aus den 1970er-Jahren; die historischen Dörfer und ihre modernen Erweiterungen bleiben ausgeklammert.", imgNote: "Satellitenbild; die Linie zeigt die Grenze des Bestandteils, übertragen aus der UNESCO-Karte" },
      '1563-003': { name: "As-Seef", desc: "Der mittlere Teil der Palmenhaine von As-Seef in der Stadt Hofuf. Im Osten grenzt der große historische Friedhof der Stadt an; ein 150 bis 200 m breiter Grüngürtel umgibt den Teil und trennt ihn von den Nachbarvierteln." },
      '1563-004': { name: "Qasr Ibrahim", desc: "Die historische Anlage Qasr Ibrahim im Zentrum von Hofuf: die wichtigsten baulichen Überreste aus der osmanischen Zeit der Stadt." },
      '1563-005': { name: "Qaisariyah-Souk", desc: "Eines der prägenden Merkmale des Stadtgefüges von Hofuf: drei Baueinheiten auf etwa 250 m Länge entlang der König-Abdulaziz-Straße, nach einem verheerenden Brand wiederaufgebaut." },
      '1563-006': { name: "Khuzam-Palast", desc: "Eine historische Festung, die einst südwestlich der ummauerten Stadt lag und heute im modernen Hofuf liegt." },
      '1563-007': { name: "Sahood-Palast", desc: "Eine annähernd rechteckige Festung in Al-Mubarraz, die ursprünglich außerhalb der westlichen Stadtmauer lag." },
      '1563-008': { name: "Archäologische Stätte Jawatha", desc: "Eine weite, vollständig umzäunte Wüstenfläche zwischen Jabal Burayqa und dem Al-Ahsa-Nationalpark; ihre Grenze folgt der Grenze des staatseigenen Grundstücks.", imgNote: "Satellitenbild; die Linie zeigt die Grenze des Bestandteils, übertragen aus der UNESCO-Karte" },
      '1563-009': { name: "Jawatha-Moschee", desc: "Der kleinste der zwölf Bestandteile: die restaurierte Moschee und die Außenmauer, die sie umgibt." },
      '1563-010': { name: "Dorf Al-Oyoun", desc: "Zwei zusammenhängende Teile an der nördlichen Ecke der Oase: der kreisrunde alte Ortskern des Dorfes Al-Oyoun und die nächstgelegenen Palmenhaine der Oase bis zum Drainagekanal, der die Oase Al-Oyoun durchquert.", imgNote: "Satellitenbild; die Linie zeigt die Grenze des Bestandteils, übertragen aus der UNESCO-Karte" },
      '1563-011': { name: "Archäologische Stätte Ain Qannas", desc: "Eine archäologische Stätte, die in den 1970er-Jahren ausgegraben wurde und vollständig umzäunt ist." },
      '1563-012': { name: "Al-Asfar-See", desc: "Der Al-Asfar-See samt dem Drainagegebiet, in dem sich das Wasser der Oase sammelt, dazu der nördliche Abschnitt des Hauptdrainagekanals der Östlichen Oase von der Schnellstraße bis zum Seeufer. Der Bestandteil beherbergt ein einzigartiges natürliches Ökosystem." },
    },
  },
  // @ru
  ru: {
    page: {
      title: "Оазис Аль-Ахса в Списке всемирного наследия ЮНЕСКО",
      lead: "Оазис Аль-Ахса включён в Список всемирного наследия ЮНЕСКО в 2018 году (объект 1563) двенадцатью компонентами: в их числе пальмовые рощи оазиса, его крепости, рынок, археологические памятники и озеро. Общая площадь — {total} га. Страница представляет компоненты так, как они внесены в Список; это не путеводитель, поскольку одни из них — обширные сельскохозяйственные угодья, другие — огороженные археологические участки.",
      comp: "Компонент",
      area: "Площадь, включённая в Список: {n} га",
      noImg: "Лицензионного фото пока нет",
      photo: "Фото",
      via: "Источник:",
      viaUnesco: "Центр всемирного наследия ЮНЕСКО ↗",
      viaCommons: "Викисклад ↗",
      srcH: "Источник",
      src: "Названия компонентов и площади даны по таблице компонентов на странице объекта 1563 в Центре всемирного наследия ЮНЕСКО, описания — по номинационному досье объекта (2017). Фотографии Восточного оазиса, Эс-Сайфа, Каср-Ибрахим, дворца Сахуд и озера Эль-Асфар взяты из галереи объекта на сайте ЮНЕСКО (материалы номинационного досье) и показаны целиком и без изменений, с именем правообладателя. Северный оазис, археологический памятник Джавата и деревня Эль-Уюн показаны на спутниковых снимках Sentinel-2 (2016), на которые мы нанесли границу каждого из этих компонентов, перенеся её с карт номинационного досье.",
      srcBounds: "Карты границ компонентов на сайте ЮНЕСКО ↗",
      srcMaps: "Таблица компонентов и карты на сайте ЮНЕСКО ↗",
      srcSite: "Объект 1563 на сайте ЮНЕСКО ↗",
      seoTitle: "Двенадцать компонентов объекта ЮНЕСКО «Оазис Аль-Ахса»",
      seoDesc: "Двенадцать компонентов объекта ЮНЕСКО «Оазис Аль-Ахса»: два оазиса, Эс-Сайф, три крепости, рынок, мечеть, два археологических памятника, деревню и озеро.",
    },
    comps: {
      '1563-001': { name: "Восточный оазис", desc: "Самый крупный компонент: обширная часть восточного оазиса в форме полумесяца, протянувшаяся примерно на 9 км с севера на юг и на 12 км с востока на запад. Густые пальмовые рощи и сельскохозяйственные угодья окаймлены сетью каналов, а в северо-восточной части компонента находится гора Эль-Кара.", imgNote: "На снимке: гора Эль-Кара с воздуха" },
      '1563-002': { name: "Северный оазис", desc: "Значительная часть северного оазиса. Границей с востока служит главный дренажный канал, с остальных сторон — сеть каналов 1970-х годов; исторические деревни и их современная застройка остались за пределами компонента.", imgNote: "Спутниковый снимок; линия — граница компонента, перенесённая с карты ЮНЕСКО" },
      '1563-003': { name: "Эс-Сайф", desc: "Центральная часть пальмовых рощ Эс-Сайфа в Эль-Хуфуфе: она ограничена с востока большим историческим кладбищем города и окружена зелёным поясом шириной от 150 до 200 м, который отделяет её от соседних кварталов." },
      '1563-004': { name: "Каср-Ибрахим", desc: "Исторический комплекс Каср-Ибрахим в центре Эль-Хуфуфа: главные сохранившиеся архитектурные памятники османского периода в городе." },
      '1563-005': { name: "Рынок Эль-Кайсария", desc: "Одна из самых заметных черт городской застройки Эль-Хуфуфа: три архитектурных блока протяжённостью около 250 м вдоль дороги короля Абдул-Азиза, отстроенные заново после разрушительного пожара." },
      '1563-006': { name: "Дворец Хузам", desc: "Историческая крепость: когда-то она стояла к юго-западу от города, обнесённого стеной, а это место теперь находится внутри современного Эль-Хуфуфа." },
      '1563-007': { name: "Дворец Сахуд", desc: "Крепость примерно прямоугольной формы в Эль-Мубарразе; первоначально она стояла за западной стеной города." },
      '1563-008': { name: "Археологический памятник Джавата", desc: "Обширный, полностью огороженный участок пустынной земли; его границы совпадают с границами земли, принадлежащей государству. Участок расположен между горой Бурайка и Национальным парком Аль-Ахсы.", imgNote: "Спутниковый снимок; линия — граница компонента, перенесённая с карты ЮНЕСКО" },
      '1563-009': { name: "Мечеть Джавата", desc: "Самый маленький из двенадцати компонентов: отреставрированная мечеть и окружающая её внешняя стена." },
      '1563-010': { name: "Деревня Эль-Уюн", desc: "Две смежные части в северном углу оазиса: старый квартал деревни Эль-Уюн круглой формы и ближайшие к нему пальмовые рощи оазиса вплоть до дренажного канала, пересекающего оазис Эль-Уюн.", imgNote: "Спутниковый снимок; линия — граница компонента, перенесённая с карты ЮНЕСКО" },
      '1563-011': { name: "Археологический памятник Айн-Каннас", desc: "Археологический памятник, раскопанный в 1970-х годах и полностью огороженный." },
      '1563-012': { name: "Озеро Эль-Асфар", desc: "Озеро Эль-Асфар — дренажная зона, куда стекает вода оазиса; в компонент входит и северный участок главного дренажного канала Восточного оазиса от шоссе до берега озера. Здесь находится уникальная природная экосистема." },
    },
  },
  // @ur
  ur: {
    page: {
      title: "الاحساء کا نخلستان عالمی ورثے کی فہرست میں",
      lead: "الاحساء کا نخلستان 2018 میں یونیسکو کی عالمی ورثے کی فہرست میں درج ہوا (مقام نمبر 1563)۔ اندراج بارہ حصوں پر مشتمل ہے: کھجور کے باغات، قلعے، بازار، آثار قدیمہ کے مقامات اور جھیل، اور ان کا کل رقبہ {total} ہیکٹر ہے۔ یہ صفحہ حصوں کا تعارف ویسے ہی کراتا ہے جیسے وہ درج ہوئے۔ یہ سیاحتی رہنما نہیں ہے: حصوں میں سے کچھ کھیتوں کے وسیع قطعے ہیں اور کچھ باڑ سے گھری آثار قدیمہ کی زمین۔",
      comp: "حصہ",
      area: "درج شدہ رقبہ {n} ہیکٹر",
      noImg: "استعمال کی اجازت والی تصویر ابھی دستیاب نہیں",
      photo: "تصویر",
      via: "ماخذ:",
      viaUnesco: "یونیسکو کے عالمی ورثے کا مرکز ↗",
      viaCommons: "ویکی ذخائر ↗",
      srcH: "ماخذ",
      src: "حصوں کے نام اور رقبے یونیسکو کے عالمی ورثے کے مرکز پر مقام نمبر 1563 کے صفحے میں دی گئی فہرست کے مطابق ہیں، اور ہر حصے کا بیان مقام کی نامزدگی کی دستاویز (2017) سے لیا گیا ہے۔ مشرقی نخلستان، السیف، قصر ابراہیم، قصر صاہود اور جھیل الاصفر کی تصاویر یونیسکو پر اس مقام کے تصویری مجموعے (نامزدگی کی دستاویز) سے لی گئی ہیں، اور یہاں مکمل، بغیر تبدیلی کے اور حقوق کے مالک کے نام کے ساتھ دکھائی گئی ہیں۔ شمالی نخلستان، جواثا کا آثار قدیمہ کا مقام اور العیون گاؤں کو Sentinel-2 کے مصنوعی سیارے سے لی گئی تصاویر (2016) پر دکھایا گیا ہے، اور ان پر ہم نے نامزدگی کے نقشوں سے نقل کر کے ہر حصے کی حد کھینچی ہے۔",
      srcBounds: "یونیسکو پر حصوں کی حدود کے نقشے ↗",
      srcMaps: "یونیسکو پر حصوں کی فہرست اور نقشے ↗",
      srcSite: "یونیسکو پر مقام نمبر 1563 ↗",
      seoTitle: "یونیسکو کی فہرست میں الاحساء کے نخلستان کے بارہ حصے",
      seoDesc: "یونیسکو کی فہرست میں الاحساء کے نخلستان کے بارہ حصے: دو نخلستان، السیف، تین قلعے، ایک بازار، ایک مسجد، آثار قدیمہ کے دو مقامات، ایک گاؤں اور ایک جھیل۔",
    },
    comps: {
      '1563-001': { name: "مشرقی نخلستان", desc: "سب سے بڑا حصہ: مشرقی نخلستان کا ہلال کی شکل کا وسیع قطعہ، جو شمال سے جنوب تقریباً 9 کلومیٹر اور مشرق سے مغرب 12 کلومیٹر تک پھیلا ہے۔ اس میں کھجور کے گھنے باغات اور کھیت ہیں، جو نالیوں کے جال سے گھرے ہیں، اور قطعے کے شمال مشرق میں جبل القارہ بھی شامل ہے۔", imgNote: "تصویر میں: جبل القارہ کا فضائی منظر" },
      '1563-002': { name: "شمالی نخلستان", desc: "شمالی نخلستان کا بڑا قطعہ، جس کی مشرقی حد نکاسی کی مرکزی نالی ہے، اور باقی اطراف 1970 کی دہائی کی نالیوں کے جال سے گھرے ہیں۔ تاریخی گاؤں اور ان کی جدید توسیعیں اس میں شامل نہیں۔", imgNote: "مصنوعی سیارے سے لی گئی تصویر؛ اس حصے کی حد کی لکیر یونیسکو کے نقشے سے نقل کی گئی ہے" },
      '1563-003': { name: "السیف", desc: "ہفوف میں السیف کے کھجور کے باغات کا وسطی علاقہ۔ اس کی مشرقی حد شہر کا بڑا تاریخی قبرستان ہے، اور 150 سے 200 میٹر چوڑی سبز پٹی اس علاقے کو گھیرے ہوئے ہے اور اسے ساتھ کے محلوں سے الگ کرتی ہے۔" },
      '1563-004': { name: "قصر ابراہیم", desc: "ہفوف کے وسط میں قصر ابراہیم کا تاریخی احاطہ، جو شہر کے عثمانی دور کی تعمیراتی باقیات میں سب سے نمایاں ہے۔" },
      '1563-005': { name: "سوق القیصریہ", desc: "یہ بازار ہفوف کی شہری ساخت کے نمایاں خدوخال میں سے ہے: شاہ عبد العزیز سڑک کے ساتھ تقریباً 250 میٹر تک پھیلی تین تعمیراتی اکائیاں، جنہیں تباہ کن آگ کے بعد دوبارہ بنایا گیا۔" },
      '1563-006': { name: "قصر خزام", desc: "تاریخی قلعہ، جس کی جگہ کبھی فصیل بند شہر کے جنوب مغرب میں تھی اور اب جدید ہفوف کے اندر آ چکی ہے۔" },
      '1563-007': { name: "قصر صاہود", desc: "المبرز میں تقریباً مستطیل شکل کا قلعہ، جو شروع میں شہر کی مغربی فصیل سے باہر تھا۔" },
      '1563-008': { name: "جواثا کا آثار قدیمہ کا مقام", desc: "صحرائی زمین کا وسیع قطعہ، جس کے چاروں طرف باڑ لگی ہے اور جس کی حد سرکاری ملکیت کی زمین کی حد کے ساتھ ساتھ چلتی ہے۔ یہ علاقہ جبل بریقا اور الاحساء قومی پارک کے درمیان ہے۔", imgNote: "مصنوعی سیارے سے لی گئی تصویر؛ اس حصے کی حد کی لکیر یونیسکو کے نقشے سے نقل کی گئی ہے" },
      '1563-009': { name: "مسجد جواثا", desc: "بارہ حصوں میں سب سے چھوٹا: بحال کی گئی مسجد اور اس کے گرد بیرونی دیوار۔" },
      '1563-010': { name: "العیون گاؤں", desc: "نخلستان کے شمالی کونے میں دو جڑے ہوئے علاقے ہیں: العیون گاؤں کا گول شکل کا پرانا محلہ، اور اس محلے سے قریب ترین کھجور کے باغات، جو نکاسی کی اس نالی تک پھیلے ہیں جو العیون کے نخلستان سے گزرتی ہے۔", imgNote: "مصنوعی سیارے سے لی گئی تصویر؛ اس حصے کی حد کی لکیر یونیسکو کے نقشے سے نقل کی گئی ہے" },
      '1563-011': { name: "عین قناص کا آثار قدیمہ کا مقام", desc: "آثار قدیمہ کا مقام، جس کی کھدائی 1970 کی دہائی میں ہوئی اور جس کے چاروں طرف باڑ لگی ہے۔" },
      '1563-012': { name: "جھیل الاصفر", desc: "جھیل الاصفر اور نکاسی کا وہ علاقہ جہاں نخلستان کا پانی جمع ہوتا ہے، اور ان کے ساتھ مشرقی نخلستان کی نکاسی کی مرکزی نالی کا شمالی ٹکڑا، شاہراہ سے جھیل کے کنارے تک۔ یہاں منفرد قدرتی ماحولیاتی نظام ہے۔" },
    },
  },
  // @tr
  tr: {
    page: {
      title: "Dünya Mirası Listesi'nde El-Ahsa Vahası",
      lead: "El-Ahsa Vahası, 2018'de UNESCO Dünya Mirası Listesi'ne (1563 numaralı alan) on iki bileşen olarak alındı. Bu bileşenler vahanın hurmalıklarını, kalelerini, çarşısını, arkeolojik alanlarını ve gölünü bir araya getirir; toplam alan {total} hektardır. Bu sayfa bileşenleri tescil edildikleri biçimiyle tanıtır; bir gezi rehberi değildir, çünkü bileşenlerin bir kısmı geniş tarım arazisi, bir kısmı çitle çevrili arkeolojik alandır.",
      comp: "Bileşen",
      area: "Tescilli alan: {n} hektar",
      noImg: "Henüz lisanslı fotoğraf yok",
      photo: "Fotoğraf",
      via: "Kaynak:",
      viaUnesco: "UNESCO Dünya Miras Merkezi ↗",
      viaCommons: "Wikimedia Commons ↗",
      srcH: "Kaynak",
      src: "Bileşen adları ve alanları, UNESCO Dünya Miras Merkezi'nin 1563 numaralı alana ait sayfasındaki bileşen tablosuna dayanır; açıklamalar alanın adaylık dosyasından (2017) alınmıştır. Doğu Vahası, Es-Seyf, Kasr İbrahim, Sahud Sarayı ve El-Asfar Gölü fotoğrafları alanın UNESCO galerisinden (adaylık dosyası) alınmıştır; olduğu gibi, kırpılmadan ve değiştirilmeden, hak sahibinin adı belirtilerek gösterilir. Kuzey Vahası, Cüvasa arkeolojik alanı ve El-Uyun köyü ise Sentinel-2 uydu görüntüleriyle (2016) gösterilir; bu görüntülerin üzerine her bileşenin sınırını adaylık dosyasındaki haritalardan aktararak çizdik.",
      srcBounds: "UNESCO'da bileşen sınır haritaları ↗",
      srcMaps: "UNESCO'da bileşen tablosu ve haritalar ↗",
      srcSite: "UNESCO'da 1563 numaralı alan ↗",
      seoTitle: "UNESCO'da El-Ahsa Vahası'nın on iki bileşeni",
      seoDesc: "El-Ahsa Vahası'nın on iki UNESCO bileşeni: iki vaha, Es-Seyf, üç kale, bir çarşı, bir cami, iki arkeolojik alan, bir köy ve bir göl.",
    },
    comps: {
      '1563-001': { name: "Doğu Vahası", desc: "En büyük bileşen: Doğu Vahası'nın hilal biçimli geniş bir kesimi; kuzey-güney doğrultusunda yaklaşık 9 km, doğu-batı doğrultusunda 12 km uzanır. İçinde sık hurmalıklar ile bir kanal ağının sınırladığı tarım arazileri bulunur; kuzeydoğusunda Cebel el-Kare yer alır.", imgNote: "Fotoğrafta: havadan Cebel el-Kare" },
      '1563-002': { name: "Kuzey Vahası", desc: "Kuzey Vahası'nın büyük bir bölümü; doğuda ana drenaj kanalıyla, diğer yönlerde 1970'lere ait bir kanal ağıyla sınırlanır. Tarihî köyler ve bunların modern uzantıları bileşenin dışında bırakılmıştır.", imgNote: "Uydu görüntüsü: üzerindeki çizgi, UNESCO haritasından aktarılan bileşen sınırıdır" },
      '1563-003': { name: "Es-Seyf", desc: "Hüfuf'taki Es-Seyf hurmalıklarının orta kesimi; doğuda kentin büyük tarihî mezarlığıyla sınırlanır. Orta kesimi saran 150–200 m genişliğindeki yeşil kuşak, onu komşu mahallelerden ayırır." },
      '1563-004': { name: "Kasr İbrahim", desc: "Hüfuf'un merkezindeki tarihî Kasr İbrahim yapı topluluğu; kentin Osmanlı dönemine ait başlıca mimari kalıntıları." },
      '1563-005': { name: "El-Kaysariye Çarşısı", desc: "Hüfuf'un kentsel dokusunun belirleyici özelliklerinden biri: Kral Abdülaziz Yolu boyunca yaklaşık 250 m uzanan üç mimari birim; yıkıcı bir yangının ardından yeniden inşa edilmiştir." },
      '1563-006': { name: "Huzam Sarayı", desc: "Surlarla çevrili kentin güneybatısında bir zamanlar yer almış tarihî bir kale; bugün modern Hüfuf'un içinde bulunur." },
      '1563-007': { name: "Sahud Sarayı", desc: "Müberrez'de yer alan, yaklaşık dikdörtgen planlı bir kale; başlangıçta kentin batı suru dışındaydı." },
      '1563-008': { name: "Cüvasa arkeolojik alanı", desc: "Cebel Büreyka ile El-Ahsa Millî Parkı arasında uzanan, tamamen çitle çevrili geniş bir çöl arazisi; sınırı, devlete ait parselin sınırını izler.", imgNote: "Uydu görüntüsü: üzerindeki çizgi, UNESCO haritasından aktarılan bileşen sınırıdır" },
      '1563-009': { name: "Cüvasa Camii", desc: "On iki bileşenin en küçüğü: restore edilmiş cami ve onu çevreleyen dış duvar." },
      '1563-010': { name: "El-Uyun köyü", desc: "Vahanın kuzey köşesinde birbirine bağlı iki bölüm: El-Uyun köyünün dairesel biçimli eski mahallesi ve vahanın eski mahalleye en yakın hurmalıkları; bu hurmalıklar El-Uyun vahasından geçen drenaj kanalına kadar uzanır.", imgNote: "Uydu görüntüsü: üzerindeki çizgi, UNESCO haritasından aktarılan bileşen sınırıdır" },
      '1563-011': { name: "Ayn Kannas arkeolojik alanı", desc: "1970'lerde kazılmış, tamamen çitle çevrili bir arkeolojik alan." },
      '1563-012': { name: "El-Asfar Gölü", desc: "Bileşen, vahanın sularının toplandığı drenaj alanı olan El-Asfar Gölü'nden ve Doğu Vahası'nın ana drenaj kanalının otoyoldan göl kıyısına uzanan kuzey kesiminden oluşur. Bileşenin kendine özgü bir doğal ekosistemi vardır." },
    },
  },
};
