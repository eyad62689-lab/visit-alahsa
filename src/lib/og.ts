// صورة Open Graph الافتراضية بلغة الصفحة — الخطوة 4 من خطة التفاعل العالمي.
// العربية تبقى og-default.png الأصلية؛ والبقية تولّدها tools/gen-og-images.mjs.
// مصدر واحد تستعمله Seo.astro وكتل JSON-LD التي تحمل حقل image.
import type { Lang } from '../i18n/ui';

export const ogDefault = (lang: Lang): string => (lang === 'ar' ? '/og-default.png' : `/og-default-${lang}.png`);
