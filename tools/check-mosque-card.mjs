// C29 — بند «الزيارة» في بطاقة معلومات الزيارة لصفحات المساجد.
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بسطور المصدر وصفحات dist،
// ويستدعيها اختبار الكسر بنسخ معدَّلة في الذاكرة.
//
// يحرس:
//   (أ) لا بطاقة زيارة في أي صفحة معلم وبأي لغة تنشر صيغة البند السابق التي كانت تفرّق
//       بين الزوار بحسب الدين (تسميته أو قيمته) — ولا يبقى في المصدر.
//   (ب) إيجاباً: كل معلم يحمل بند «الزيارة» بقيمته الموحّدة في المصدر ينشره في بطاقته
//       بكل لغة يحمل ترجمتها، تسميةً وقيمةً حرفياً (dt ثم dd)، ولا يقلّ عددها عن
//       EXPECT.minPages في العربية — فلا يصير الحارس فارغاً.

export const EXPECT = { minPages: 12 };

// الصيغة السابقة بلغاتها الخمس — تسمياتٍ وقيماً
export const RETIRED = [
  'زيارة غير المسلمين', 'متاحة، مع المحافظة على اللباس المحتشم',
  'Visitors of other faiths', 'Welcome, with modest dress',
  '非穆斯林游客', '欢迎参观，请注意衣着端庄',
  'Nichtmuslimische Besucher', 'Willkommen – bedeckende Kleidung vorausgesetzt',
  'Вход для немусульман', 'Открыт при условии скромной одежды',
];

// بصمة البند الجديد في المصدر: التسمية العربية وأول قيمتها
export const NEW_ROW_AR = { label: 'الزيارة', valuePrefix: 'متاحة خارج أوقات الصلاة' };

const LANGS = ['ar', 'en', 'zh', 'de', 'ru'];
const decode = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'").replace(/&amp;/g, '&');

/** مقطع البطاقة: من info-card إلى أول </dl> بعده */
export const cardOf = (html) => {
  const i = html.indexOf('class="info-card"');
  if (i === -1) return null;
  const j = html.indexOf('</dl>', i);
  // سمات نطاق Astro (data-astro-cid-…) تُحذف من dt/dd فتُقارَن الوسوم مجرّدة
  return j === -1 ? null : decode(html.slice(i, j).replace(/<(dt|dd)\b[^>]*>/g, '<$1>'));
};

/** حقول سطر practical في المصدر: label/value وlabel_xx/value_xx */
const field = (line, key) => line.match(new RegExp(`(?:^|[{,\\s])${key}: "([^"]*)"`))?.[1];
export const rowFields = (line) => Object.fromEntries(LANGS.map((l) => {
  const sfx = l === 'ar' ? '' : `_${l}`;
  return [l, { label: field(line, `label${sfx}`), value: field(line, `value${sfx}`) }];
}));

/**
 * sources: [{ file, text }] — ملفات المعالم كاملة
 * pagesFor(file, lang) → html | null — صفحة المعلم المنشورة بتلك اللغة
 * allPages: [{ rel, html }] — كل صفحات المعالم المنشورة بكل اللغات
 */
export function checkMosqueCards(sources, pagesFor, allPages) {
  const problems = [];
  const stats = Object.fromEntries(LANGS.map((l) => [l, 0]));
  for (const { file, text } of sources) {
    for (const r of RETIRED) if (text.includes(r)) problems.push(`${file}: المصدر يحمل الصيغة السابقة «${r}»`);
    const line = text.split('\n').find((l) => l.includes(`label: "${NEW_ROW_AR.label}", value: "${NEW_ROW_AR.valuePrefix}`));
    if (!line) continue;
    const f = rowFields(line);
    for (const l of LANGS) {
      if (!f[l].label || !f[l].value) continue;
      // zh/de/ru: الصفحة لا تُبنى إلا بحقل title_<lang> (بوابة التوليد)
      if (l !== 'ar' && l !== 'en' && !new RegExp(`^title_${l}:`, 'm').test(text)) continue;
      const html = pagesFor(file, l);
      if (!html) { problems.push(`${file} [${l}]: الصفحة غير منشورة`); continue; }
      const card = cardOf(html);
      if (!card) { problems.push(`${file} [${l}]: بطاقة الزيارة غائبة`); continue; }
      if (!card.includes(`<dt>${f[l].label}</dt><dd>${f[l].value}</dd>`)) problems.push(`${file} [${l}]: بند «${f[l].label}» غير منشور حرفياً في البطاقة`);
      else stats[l]++;
    }
  }
  for (const { rel, html } of allPages) {
    const card = cardOf(html);
    if (!card) continue;
    for (const r of RETIRED) if (card.includes(r)) problems.push(`${rel}: البطاقة تنشر الصيغة السابقة «${r}»`);
  }
  if (stats.ar < EXPECT.minPages) problems.push(`الحارس صار فارغاً: ${stats.ar} صفحة عربية تنشر البند — المتوقع ≥${EXPECT.minPages}`);
  return { problems, stats };
}
