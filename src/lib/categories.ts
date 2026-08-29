// تسميات فئات المعالم — ثلاثية اللغة. مصدر موحّد للقائمة/الخريطة/التفصيل.
// الصينية من خط zh-translation-pipeline (دفعة نصوص الواجهة 2026-08-29).
import type { Lang } from '../i18n/ui';

export const CATEGORY_LABELS: Record<Lang, Record<string, string>> = {
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
};

export const CATEGORY_ORDER = ['historic', 'museum', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'];

export const catLabel = (c: string, lang: Lang = 'ar') =>
  CATEGORY_LABELS[lang]?.[c] ?? CATEGORY_LABELS.ar[c] ?? c;
