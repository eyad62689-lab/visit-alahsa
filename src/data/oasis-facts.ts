// أرقام الواحة الكبرى — مصدر واحد للأرقام ومصادرها وصيغها في كل لغة.
//
// قبل هذا الملف كان «2.5 مليون» مكتوباً في الرئيسية وصفحة الثمار، لكل لغة فرعٌ يدوي
// بفاصلتها العشرية ومقياسها (万، Mio.، млн، لاکھ)، فتعديل أحدهما ينسى الآخر بصمت.
// الصيغ هنا منقولة كما مرّت بخطوط الترجمة (de 2026-09-03، ru 2026-09-05، ur 2026-10-12)
// ولا تُعدَّل إلا عبرها. أرقام لاتينية في كل اللغات بحكم قاعدة الموقع.
//
// المصادر:
// - غينيس، سجل «Largest oasis»: «more than 2.5 million palm trees» و«more than 280 artesian
//   springs» (والمساحة 85.4 كم² والتدفق 712 مليون م³ سنوياً — غير معروضة بعد).
// - إحصاءات وزارة البيئة والمياه والزراعة: يذكرها سطر مصدر صفحة الثمار مع غينيس للرقمين
//   معاً، وسجل غينيس لا يذكر أشجار الفاكهة.
// - قائمة التراث العالمي لليونسكو، الموقع 1563 (2018).
// رقم العيون اعتُمد «أكثر من 280» من غينيس لا «60–70» (ويكيبيديا العربية بلا إحالة)
// — مراجعة مواصفات «الواحة تتكشّف»، القرار أ4 (2026-10-20).
import type { Lang } from '../i18n/ui';
import { UNESCO_WHS_URL } from '../lib/schema';

type PerLang = Readonly<Record<Lang, string>>;

export const OASIS_SOURCES = {
  guinness: 'https://www.guinnessworldrecords.com/world-records/largest-oasis',
  unesco: UNESCO_WHS_URL,
} as const;

export const OASIS_FACTS = {
  palms: {
    value: 2_500_000,
    /** صيغة «أكثر من» (الرئيسية). في العربية معزولة اتجاهياً (LRI…PDI) ليبقى «+» قبل الرقم. */
    plus: {
      ar: '⁦+2.5⁩ مليون',
      en: '2.5M+',
      zh: '250 多万',
      de: 'Über 2,5 Mio.',
      ru: 'Более 2,5 млн',
      ur: '25 لاکھ+',
    } satisfies PerLang,
    /** الصيغة المجرّدة (صفحة الثمار). */
    short: {
      ar: '2.5 مليون',
      en: '2.5M',
      zh: '250 万',
      de: '2,5 Mio.',
      ru: '2,5 млн',
      ur: '25 لاکھ',
    } satisfies PerLang,
  },
  fruitTrees: {
    value: 400_000,
    short: {
      ar: '400 ألف',
      en: '400K',
      zh: '40 万',
      de: '400 Tsd.',
      ru: '400 тыс.',
      ur: '4 لاکھ',
    } satisfies PerLang,
  },
  /** للرئيسية الجديدة (الفصل 2)؛ صيغها تُكتب مع نصوص الفصل عبر خطوط الترجمة. */
  springs: { value: 280, plus: true },
  unescoYear: { value: 2018 },
  /** سطر المصدر تحت أرقام صفحة الثمار (النخيل وأشجار الفاكهة). */
  fruitsStatsSrc: {
    ar: 'وفق تسجيل موسوعة غينيس للأرقام القياسية (أكتوبر 2020م) وإحصاءات وزارة البيئة والمياه والزراعة.',
    en: 'Per the Guinness World Records listing (October 2020) and Ministry of Environment, Water and Agriculture statistics.',
    zh: '依据吉尼斯世界纪录认证（2020 年 10 月）及沙特环境水务与农业部的统计数据。',
    de: 'Laut Eintrag von Guinness World Records (Oktober 2020) und Statistiken des Ministeriums für Umwelt, Wasser und Landwirtschaft.',
    ru: 'Источники: запись в Книге рекордов Гиннесса (октябрь 2020 года) и статистика Министерства окружающей среды, водных ресурсов и сельского хозяйства.',
    ur: 'گنیز ورلڈ ریکارڈز کے اندراج (اکتوبر 2020) اور ماحولیات، پانی اور زراعت کی وزارت کے اعداد و شمار کے مطابق۔',
  } satisfies PerLang,
} as const;
