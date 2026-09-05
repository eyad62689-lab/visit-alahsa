// تسميات فئات المعالم — مصدر موحّد للقائمة/الخريطة/التفصيل.
// الصينية من خط zh-translation-pipeline (دفعة نصوص الواجهة 2026-08-29).
// الجدول **جزئي عمداً** (Partial): لغة لم تمرّ دفعة واجهتها بخط إنتاجها لا
// جدول لها، وتتراجع في catLabel أدناه — الألمانية كذلك منذ تكاملها 2026-09-03،
// والروسية منذ دفعة واجهتها 2026-09-05 (خط ru-translation-pipeline).
import type { Lang } from '../i18n/ui';

export const CATEGORY_LABELS: Partial<Record<Lang, Record<string, string>>> & { ar: Record<string, string>; en: Record<string, string> } = {
  ar: {
    historic: 'المعالم',
    museum: 'المتاحف',
    religious: 'المساجد والمواقع الدينية',
    nature: 'الطبيعة والمغارات',
    parks: 'المتنزّهات والحدائق',
    market: 'الأسواق التراثية',
    farm: 'المزارع والنخيل',
    experience: 'التجارب والحِرف',
    taste: 'المذاق والتمور',
    events: 'الفعاليات والمواسم',
  },
  en: {
    historic: 'Landmarks',
    museum: 'Museums',
    religious: 'Mosques & religious sites',
    nature: 'Nature & caves',
    parks: 'Parks & gardens',
    market: 'Heritage souqs',
    farm: 'Farms & palms',
    experience: 'Experiences & crafts',
    taste: 'Cuisine & dates',
    events: 'Events & seasons',
  },
  zh: {
    historic: '历史古迹',
    museum: '博物馆',
    religious: '清真寺与宗教场所',
    nature: '自然与洞穴',
    parks: '公园与园林',
    market: '传统市集',
    farm: '农场与椰枣林',
    experience: '体验与手工艺',
    taste: '美食与椰枣',
    events: '活动与节庆',
  },
  // الألمانية من خط de-translation-pipeline (دفعة نصوص الواجهة 2026-09-03، الحاكم 90/100).
  de: {
    historic: 'Historische Stätten',
    museum: 'Museen',
    religious: 'Moscheen und religiöse Stätten',
    nature: 'Natur und Höhlen',
    parks: 'Parks und Gärten',
    market: 'Traditionelle Souks',
    farm: 'Farmen und Dattelpalmen',
    experience: 'Erlebnisse und Handwerk',
    taste: 'Küche und Datteln',
    events: 'Veranstaltungen und Saisonales',
  },
  // الروسية من خط ru-translation-pipeline (دفعة نصوص الواجهة 2026-09-05، الحاكم 91/100).
  ru: {
    historic: 'Исторические места',
    museum: 'Музеи',
    religious: 'Мечети и религиозные места',
    nature: 'Природа и пещеры',
    parks: 'Парки и сады',
    market: 'Традиционные рынки',
    farm: 'Фермы и пальмы',
    experience: 'Впечатления и ремёсла',
    taste: 'Кухня и финики',
    events: 'События и сезоны',
  },
};

export const CATEGORY_ORDER = ['historic', 'museum', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'];

/** تسمية الفئة بلغة الصفحة — والتراجع على سلسلة الموقع (اللغة ← en ← ar).
 *  الإنجليزية قبل العربية إلزامية: لغةٌ لا جدول لها بعد (de عند تكاملها
 *  2026-09-03، وقاموسها في خط الإنتاج) كانت ستقع على التسمية العربية داخل
 *  صفحة لاتينية — وهي المخالفة نفسها التي يحرسها فلتر label_en في المعالم. */
export const catLabel = (c: string, lang: Lang = 'ar') =>
  CATEGORY_LABELS[lang]?.[c] ?? CATEGORY_LABELS.en[c] ?? CATEGORY_LABELS.ar[c] ?? c;
