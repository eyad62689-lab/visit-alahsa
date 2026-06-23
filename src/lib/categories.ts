// تسميات فئات المعالم — ثنائية اللغة. مصدر موحّد للقائمة/الخريطة/التفصيل.
import type { Lang } from '../i18n/ui';

export const CATEGORY_LABELS: Record<Lang, Record<string, string>> = {
  ar: {
    historic: 'المعالم والمتاحف',
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
    historic: 'Landmarks & museums',
    religious: 'Mosques & religious sites',
    nature: 'Nature & caves',
    parks: 'Parks & gardens',
    market: 'Heritage souqs',
    farm: 'Farms & palms',
    experience: 'Experiences & crafts',
    taste: 'Cuisine & dates',
    events: 'Events & seasons',
  },
};

export const CATEGORY_ORDER = ['historic', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'];

export const catLabel = (c: string, lang: Lang = 'ar') =>
  CATEGORY_LABELS[lang]?.[c] ?? CATEGORY_LABELS.ar[c] ?? c;
