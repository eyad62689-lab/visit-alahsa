// بيانات خرائط قوقل الحية (التقييم، أوقات العمل، الحالة) — قارئ واحد للملف
// src/data/places-live.json الذي يكتبه tools/fetch-places.mjs قبل البناء إن وُجد
// المفتاح. الملف خارج المستودع (شروط قوقل) وغيابه متوقَّع في البناء المحلي،
// فكل دالة هنا تتدهور رشيقاً إلى null/undefined ولا تُختلق قيمة.
//
// كانت هذه القراءة والأنواع منسوخة حرفياً في أربع واجهات (المطاعم والإقامة
// وصفحتيهما المفردتين) — نسخة واحدة تمنع تباعدها.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from '../i18n/ui';
import { formatMonth } from './dates';

export type Live = {
  rating: number | null;
  count: number | null;
  status: string | null;
  /** أوقات العمل نصوصاً بلغتَي قوقل — للمنشآت التي تُرجعها فقط (المطاعم) */
  hoursAr?: string[];
  hoursEn?: string[];
  /** الفترات الأسبوعية [يومُ الفتح، دقيقته، يومُ الإغلاق، دقيقته] — 0 = الأحد */
  periods?: (number | null)[][];
  utcOffset?: number | null;
};

export type LiveFile = { fetchedAt: string; places: Record<string, Live> };

// process.cwd() لا import.meta.url: الأخير يشير إلى الملف المُجمَّع وقت البناء
// فيفشل العثور على JSON بصمت. البناء يعمل دائماً من جذر المشروع.
const livePath = join(process.cwd(), 'src', 'data', 'places-live.json');
let cached: LiveFile | null | undefined;

/** الملف كاملاً أو null إن غاب — يُقرأ مرة واحدة لكل بناء. */
export function loadLive(): LiveFile | null {
  if (cached === undefined) {
    cached = existsSync(livePath) ? (JSON.parse(readFileSync(livePath, 'utf8')) as LiveFile) : null;
  }
  return cached;
}

/** بيانات منشأة من مسار صورتها — المفتاح في الملف هو اسم الصورة بلا مجلدها. */
export const liveFor = (img: string): Live | undefined =>
  loadLive()?.places?.[img.replace(/^\/img\/(?:dining|stay)\//, '')];

/** «مفتوح الآن»: تُمرَّر البنية الأسبوعية والإزاحة إلى المتصفح ولا تُصيَّر حالةٌ
 *  في البناء إطلاقاً — الشارة تخرج hidden ويملؤها OpenNowBadge من ساعة الزائر.
 *  المنشأة التي لا تُرجِع periods لا شارة لها: لا تُعرض «مغلق» استنتاجاً من غياب بيانات.
 *  صيغة مضغوطة بلا علامات اقتباس: «الإزاحة|يوم,دقيقة,يوم,دقيقة;…» — JSON كان
 *  يكلّف ~42KB في الصفحة لأن كل اقتباس يُهرَّب إلى &quot; داخل سمة HTML.
 *  اليوم الفارغ = null (فترة بلا إغلاق ⇒ 24 ساعة). */
export const hoursData = (lv?: Live): string | null =>
  lv?.periods?.length && typeof lv.utcOffset === 'number'
    ? `${lv.utcOffset}|${lv.periods.map((x) => x.join(',')).join(';')}`
    : null;

/** تاريخ آخر جلب للعرض (أرقام لاتينية دائماً) — null حين لا ملف. */
export const fetchedLabel = (lang: Lang): string | null => {
  const raw = loadLive()?.fetchedAt;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : formatMonth(d, lang);
};
