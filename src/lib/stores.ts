// دليل المتاجر الإلكترونية الأحسائية — مصدر الحقيقة الوحيد src/data/stores-directory.ar.json.
//
// الحقول evidence_internal وflags وdocx_row وconfirmed_by_owner بيانات تحرير داخلية:
// لا تُعرض في الصفحة ولا تدخل JSON-LD ولا أي سمة data-*. publicStore() يسقطها قبل
// أي تسلسل، والواجهة لا تقرأ من الكائن الخام إلا عبره.
import data from '../data/stores-directory.ar.json';

export type StoreSection = 'dates' | 'crafts' | 'other';

export interface StoreRaw {
  order: number;
  id: string;
  docx_row: string;
  section: StoreSection;
  featured: boolean;
  name: string;
  url: string;
  platform: string;
  description: string;
  evidence_internal: string;
  image: string;
  logo: string;
  flags: string[];
  confirmed_by_owner?: string;
}

export interface Store {
  order: number;
  id: string;
  section: StoreSection;
  featured: boolean;
  name: string;
  url: string;
  platform: string;
  description: string;
  /** مسار اللقطة بلا امتداد (نمط Photo.astro) */
  image: string;
  /** مسار الشعار كاملاً (webp) */
  logo: string;
  /** حساب إنستجرام: الطلب مباشرة من الحرفي */
  instagram: boolean;
}

export interface StoreSectionMeta { id: StoreSection; title: string; }
export interface StoreFaq { q: string; a: string; }

const IMG_BASE = '/img/stores/';

/** يُسقط الحقول الداخلية ويطبّع مسارات الصور. */
export function publicStore(s: StoreRaw): Store {
  return {
    order: s.order,
    id: s.id,
    section: s.section,
    featured: s.featured,
    name: s.name,
    url: s.url,
    platform: s.platform,
    description: s.description,
    image: IMG_BASE + s.image.replace(/\.webp$/i, ''),
    logo: IMG_BASE + s.logo,
    instagram: s.platform.includes('إنستجرام'),
  };
}

/** المتاجر بترتيب الحقل order تصاعدياً — لا ترتيب أبجدي ولا غيره. */
export const sortedStores: Store[] = [...(data.stores as StoreRaw[])]
  .sort((a, b) => a.order - b.order)
  .map(publicStore);

export const storeSections: StoreSectionMeta[] = data.sections as StoreSectionMeta[];
export const storeFaq: StoreFaq[] = data.faq as StoreFaq[];
export const storeSeo = data.seo as { h1: string; title_tag: string; meta_description: string; keywords: string[] };

export function countsBySection(stores: Store[] = sortedStores): Record<StoreSection, number> {
  const c: Record<StoreSection, number> = { dates: 0, crafts: 0, other: 0 };
  for (const s of stores) c[s.section]++;
  return c;
}
