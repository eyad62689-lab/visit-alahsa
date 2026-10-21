// تسميات فئات المعالم — مصدر موحّد للقائمة/الخريطة/التفصيل.
// الصينية من خط zh-translation-pipeline (دفعة نصوص الواجهة 2026-08-29).
// الجدول **جزئي عمداً** (Partial): لغة لم تمرّ دفعة واجهتها بخط إنتاجها لا
// جدول لها، وتتراجع في catLabel أدناه — الألمانية كذلك منذ تكاملها 2026-09-03،
// والروسية منذ دفعة واجهتها 2026-09-05 (خط ru-translation-pipeline).
import type { Lang } from '../i18n/ui';

export const CATEGORY_LABELS: Partial<Record<Lang, Record<string, string>>> & { ar: Record<string, string>; en: Record<string, string> } = {
  ar: {
    historic: 'المعالم التاريخية',
    museum: 'المتاحف',
    religious: 'المساجد والمواقع الدينية',
    nature: 'الطبيعة',
    parks: 'المتنزّهات والحدائق',
    market: 'الأسواق التراثية',
    farm: 'المزارع',
    experience: 'التجارب والحِرف',
    taste: 'المطبخ الأحسائي',
    events: 'الفعاليات',
  },
  en: {
    historic: 'Historic landmarks',
    museum: 'Museums',
    religious: 'Mosques & religious sites',
    nature: 'Nature',
    parks: 'Parks & gardens',
    market: 'Heritage souqs',
    farm: 'Farms',
    experience: 'Experiences & crafts',
    taste: 'Hasawi Cuisine',
    events: 'Events',
  },
  zh: {
    historic: '历史古迹',
    museum: '博物馆',
    religious: '清真寺与宗教场所',
    nature: '自然风光',
    parks: '公园与园林',
    market: '传统集市',
    farm: '农场',
    experience: '体验与手工艺',
    taste: '哈萨美食',
    events: '活动',
  },
  // الألمانية من خط de-translation-pipeline (دفعة نصوص الواجهة 2026-09-03، الحاكم 90/100).
  de: {
    historic: 'Historische Stätten',
    museum: 'Museen',
    religious: 'Moscheen und religiöse Stätten',
    nature: 'Natur',
    parks: 'Parks und Gärten',
    market: 'Traditionelle Souks',
    farm: 'Farmen',
    experience: 'Erlebnisse und Handwerk',
    taste: 'Küche aus Al-Ahsa',
    events: 'Veranstaltungen',
  },
  // الروسية من خط ru-translation-pipeline (دفعة نصوص الواجهة 2026-09-05، الحاكم 91/100).
  ru: {
    historic: 'Исторические достопримечательности',
    museum: 'Музеи',
    religious: 'Мечети и религиозные места',
    nature: 'Природа',
    parks: 'Парки и сады',
    market: 'Традиционные рынки',
    farm: 'Фермы',
    experience: 'Впечатления и ремёсла',
    taste: 'Кухня Аль-Ахсы',
    events: 'События',
  },
  // الأوردية من خط ur-translation-pipeline (دفعة نصوص الواجهة 2026-10-12، الحاكم 90/100).
  // الأوردية من خط ur-translation-pipeline (دفعة نصوص الواجهة 2026-10-15، الحاكم 93/100).
  ur: {
    historic: 'تاریخی مقامات',
    museum: 'عجائب گھر',
    religious: 'مساجد اور مذہبی مقامات',
    nature: 'قدرتی مقامات',
    parks: 'پارک اور باغات',
    market: 'روایتی بازار',
    farm: 'زرعی فارم',
    // دفعة palm-village-page 2026-10-20 (الحاكم 92/100)
    experience: 'تجربات اور دستکاریاں',
  },
};

export const CATEGORY_ORDER = ['historic', 'museum', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'];

/** تسمية الفئة بلغة الصفحة — والتراجع على سلسلة الموقع (اللغة ← en ← ar).
 *  الإنجليزية قبل العربية إلزامية: لغةٌ لا جدول لها بعد (de عند تكاملها
 *  2026-09-03، وقاموسها في خط الإنتاج) كانت ستقع على التسمية العربية داخل
 *  صفحة لاتينية — وهي المخالفة نفسها التي يحرسها فلتر label_en في المعالم. */
export const catLabel = (c: string, lang: Lang = 'ar') =>
  CATEGORY_LABELS[lang]?.[c] ?? CATEGORY_LABELS.en[c] ?? CATEGORY_LABELS.ar[c] ?? c;
