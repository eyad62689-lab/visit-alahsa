// دليل المتاجر الإلكترونية الأحسائية — المصدر العربي src/data/stores-directory.ar.json
// والترجمات src/data/stores-directory.<lang>.json (من خطوط الترجمة حصراً).
//
// الحقول evidence_internal وflags وdocx_row وconfirmed_by_owner بيانات تحرير داخلية:
// لا تُعرض في الصفحة ولا تدخل JSON-LD ولا أي سمة data-*. publicStore() يسقطها قبل
// أي تسلسل، والواجهة لا تقرأ من الكائن الخام إلا عبره.
//
// ملف لغة غائب = لا صفحة بتلك اللغة (storesLangs يبني مبدّل اللغة من الملفات الموجودة).
import type { Lang } from '../i18n/ui';
import ar from '../data/stores-directory.ar.json';

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
export interface StoreSeo { h1: string; title_tag: string; meta_description: string; }

/** وحدة ترجمة لغة واحدة (مخرج خط الترجمة) */
interface StoresUnit {
  seo: StoreSeo;
  sections: StoreSectionMeta[];
  stores: { id: string; name: string; platform: string; description: string }[];
  faq: StoreFaq[];
}

export interface StoresPage {
  seo: StoreSeo;
  sections: StoreSectionMeta[];
  stores: Store[];
  faq: StoreFaq[];
}

const IMG_BASE = '/img/stores/';
const INSTAGRAM_HOST = /^https?:\/\/(www\.)?instagram\.com\//i;

// الترجمات تُحمَّل بـimport.meta.glob كي لا يفشل البناء بلغة لم تُترجم بعد
const unitFiles = import.meta.glob<{ default: StoresUnit }>('../data/stores-directory.*.json', { eager: true });
const units: Partial<Record<Lang, StoresUnit>> = {};
for (const [path, mod] of Object.entries(unitFiles)) {
  const m = /stores-directory\.([a-z]{2})\.json$/.exec(path);
  if (m && m[1] !== 'ar') units[m[1] as Lang] = mod.default;
}

/** اللغات التي لها صفحة: العربية دائماً + كل لغة لها ملف ترجمة */
export const storesLangs: Lang[] = ['ar', ...(Object.keys(units) as Lang[])];

/** يُسقط الحقول الداخلية ويطبّع مسارات الصور، ويطبّق نصوص اللغة إن وُجدت. */
export function publicStore(s: StoreRaw, tr?: { name: string; platform: string; description: string }): Store {
  return {
    order: s.order,
    id: s.id,
    section: s.section,
    featured: s.featured,
    name: tr?.name ?? s.name,
    url: s.url,
    platform: tr?.platform ?? s.platform,
    description: tr?.description ?? s.description,
    image: IMG_BASE + s.image.replace(/\.webp$/i, ''),
    logo: IMG_BASE + s.logo,
    // من الرابط لا من نصّ المنصة — ثابت عبر اللغات
    instagram: INSTAGRAM_HOST.test(s.url),
  };
}

const rawSorted: StoreRaw[] = [...(ar.stores as StoreRaw[])].sort((a, b) => a.order - b.order);

/** صفحة الدليل بلغة — ترتيب order ثابت، والنصوص من وحدة اللغة (العربية من المصدر). */
export function storesPage(lang: Lang): StoresPage {
  if (lang === 'ar') {
    return {
      seo: ar.seo as StoreSeo,
      sections: ar.sections as StoreSectionMeta[],
      stores: rawSorted.map((s) => publicStore(s)),
      faq: ar.faq as StoreFaq[],
    };
  }
  const u = units[lang];
  if (!u) throw new Error(`stores: no translation unit for "${lang}" — translate through the ${lang} pipeline first`);
  const byId = new Map(u.stores.map((s) => [s.id, s]));
  const missing = rawSorted.filter((s) => !byId.has(s.id)).map((s) => s.id);
  if (missing.length || u.faq.length !== ar.faq.length || u.sections.length !== ar.sections.length) {
    throw new Error(`stores: ${lang} unit incomplete (missing stores: ${missing.join(', ') || 'none'}; faq ${u.faq.length}/${ar.faq.length}; sections ${u.sections.length}/${ar.sections.length})`);
  }
  return {
    seo: u.seo,
    sections: u.sections,
    stores: rawSorted.map((s) => publicStore(s, byId.get(s.id))),
    faq: u.faq,
  };
}

/** للتوافق مع الاستدعاءات العربية القائمة */
export const sortedStores: Store[] = storesPage('ar').stores;

export function countsBySection(stores: Store[]): Record<StoreSection, number> {
  const c: Record<StoreSection, number> = { dates: 0, crafts: 0, other: 0 };
  for (const s of stores) c[s.section]++;
  return c;
}
