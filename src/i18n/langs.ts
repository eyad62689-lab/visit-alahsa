// بيانات اللغات الخمس — مصدر واحد للترويسة وشريط اقتراح اللغة وصفحة 404 وبيان التطبيق.
// (كانت LANG_META محلية في Header.astro؛ نُقلت هنا في الخطوة 2 من خطة التفاعل العالمي.)
// الأسماء الأصلية معتمدة سلفاً في مبدّل اللغة، فلا تمرّ بخطوط الترجمة مجدداً.
import type { Lang } from './ui';

export const LANG_META: Record<Lang, { short: string; native: string; code: string; dir: 'rtl' | 'ltr' }> = {
  ar: { short: 'ع', native: 'العربية', code: 'ar', dir: 'rtl' },
  en: { short: 'EN', native: 'English', code: 'en', dir: 'ltr' },
  zh: { short: '中文', native: '中文（简体）', code: 'zh-CN', dir: 'ltr' },
  de: { short: 'DE', native: 'Deutsch', code: 'de', dir: 'ltr' },
  ru: { short: 'RU', native: 'Русский', code: 'ru', dir: 'ltr' },
};

export const LANGS = Object.keys(LANG_META) as Lang[];
