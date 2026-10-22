// معجم «الفوائد» في عنوان صفحة المعلم (ar/en فقط) — المصدر الواحد للنص وشرط دليله.
//
// عنوان صفحة المعلم يُركَّب بنية لا بنصّ حرّ: «[العنوان] في [المكان]: [الفائدة]»، والفائدة تُختار
// من هذا المعجم بمفتاح (`seo.benefit` في ملف المعلم)، وكل مفتاح له شرط دليل يُفحص على بيانات
// الملف نفسه — فلا يعد العنوان بما لا تعرضه الصفحة (مواعيد ورسوم لا بند موثّق لها، ودخول
// «مجاني» بلا fee). المخطط (content.config.ts) يرفض الملف الذي لا يحقق شرط فائدته،
// وC24 يحرس المنشور على dist. لا تُكتب لغة غير ar/en هنا إلا عبر خطوط الترجمة.
//
// الشروط تقرأ البنية نفسها التي تعرضها DetailView (shownPractical/showsHoursFee):
// بند practical موثّق (verified)، ولصفحة الإنجليزية أن يحمل label_en وvalue_en (وإلا لا يظهر البند).

export const SEO_BENEFIT_KEYS = ['hours-fees', 'hours', 'free', 'unesco', 'guide'] as const;
export type SeoBenefitKey = (typeof SEO_BENEFIT_KEYS)[number];

/** الشكل الأدنى من بيانات المعلم الذي تقرأه الشروط (يطابقه مدخل المجموعة). */
export interface BenefitSource {
  openSite?: boolean;
  unesco?: string;
  fee?: { free?: true; amount?: number; min?: number };
  practical: ReadonlyArray<{ label: string; label_en?: string; value_en?: string; verified?: boolean }>;
}

export type BenefitLang = 'ar' | 'en';

// بنود البطاقة الظاهرة بلغة الصفحة: موثّقة، وللإنجليزية بترجمتها (DetailView.shownPractical)
const shown = (a: BenefitSource, lang: BenefitLang) =>
  a.practical.filter((p) => p.verified && (lang === 'ar' || (p.label_en && p.value_en)));

const hasHours = (a: BenefitSource, lang: BenefitLang) => shown(a, lang).some((p) => /المواعيد|ساعات/.test(p.label));
const hasFees = (a: BenefitSource, lang: BenefitLang) => shown(a, lang).some((p) => /الرسوم|الدخول/.test(p.label));

export const SEO_BENEFITS: Record<SeoBenefitKey, { ar: string; en: string; requires: (a: BenefitSource, lang: BenefitLang) => boolean }> = {
  // المواعيد والرسوم معاً: بنداهما موثّقان ويظهران في البطاقة، والموقع ليس مفتوحاً (يعرض سطر المواعيد والرسوم)
  'hours-fees': { ar: 'المواعيد والرسوم', en: 'Hours & Fees', requires: (a, lang) => !a.openSite && hasHours(a, lang) && hasFees(a, lang) },
  hours: { ar: 'مواعيد الزيارة', en: 'Visiting Hours', requires: (a, lang) => hasHours(a, lang) },
  // الدخول المجاني: fee مجاني في المصدر (يلزمه المخطط ببند رسوم/دخول موثّق) ويظهر ذلك البند بلغة الصفحة
  free: { ar: 'الدخول مجاني', en: 'Free Entry', requires: (a, lang) => Boolean(a.fee && 'free' in a.fee) && hasFees(a, lang) },
  unesco: { ar: 'ضمن واحة الأحساء في اليونسكو', en: 'Part of UNESCO’s Al-Ahsa Oasis', requires: (a) => Boolean(a.unesco) },
  guide: { ar: 'دليل الزيارة', en: 'Visitor Guide', requires: () => true },
};
