// C29 — بند «الزيارة» في بطاقة معلومات الزيارة لصفحات المساجد، وعبارة زيارة مسجد جواثا في
// مقالَي «24 ساعة» و«48 ساعة».
//
// دالتان نقيتان بلا قراءة ملفات: يستدعيهما check-consistency.mjs بسطور المصدر وصفحات dist،
// ويستدعيهما اختبار الكسر بنسخ معدَّلة في الذاكرة.
//
// يحرس:
//   (أ) لا بطاقة زيارة في أي صفحة معلم وبأي لغة تنشر صيغة سابقة للبند: لا التي كانت تفرّق
//       بين الزوار بحسب الدين، ولا التي كانت تقصر الزيارة على خارج أوقات الصلاة (وتناقض بند
//       المواعيد في البطاقة نفسها) — ولا تبقى أيٌّ منهما في المصدر.
//   (ب) إيجاباً: قيمة البند في المصدر هي القيمة المعتمدة لكل لغة (VISIT_VALUE)، وكل معلم يحمله
//       ينشره في بطاقته بكل لغة يحمل ترجمتها، تسميةً وقيمةً حرفياً (dt ثم dd)، ولا يقلّ عددها
//       عن EXPECT.minPages في العربية — فلا يصير الحارس فارغاً.
//   (ج) صفحات المدونة بكل لغة (نصاً وJSON-LD وسمات): لا عبارة تفرّق بين الزوار بحسب الدين،
//       وعبارة الزيارة المعتمدة (BLOG_CLAUSE) منشورة في مقالَي 24 و48 ساعة بكل لغة، مع حدّ
//       أدنى لعدد صفحات المدونة المفحوصة.
//   (د) مساجد قيد الترميم (UNDER_RESTORATION): بند «الزيارة» فيها صيغة الترميم المعتمدة لا صيغة
//       الزيارة المتاحة، منشورةً في البطاقة بكل لغة — فلا تعود البطاقة تعد بزيارة متاحة.

// 11 بطاقة بصيغة الزيارة: المساجد الاثنا عشر عدا مسجد ميناء العقير (قيد الترميم، البند (د)).
export const EXPECT = { minPages: 11, minBlogPages: 40, minRestoration: 1 };

// حكم إياد 2026-10-02: بطاقة مسجد ميناء العقير تقول ترميم مجمّع الميناء لا «متاحة»، بتسمية «حالة
// الموقع» لا «الزيارة» — وجملة الترميم في البطاقة وحدها، فخرجت من المتن (لا تُقرأ مرتين).
export const RESTORATION_LABEL = { ar: 'حالة الموقع', en: 'Site status', zh: '__ZH_PENDING__', de: '__DE_PENDING__', ru: '__RU_PENDING__' };
export const UNDER_RESTORATION = {
  'uqair-mosque.md': {
    ar: 'يشهد مجمّع الميناء أعمال ترميم، وقد تكون بعض أجزائه مغلقة',
    en: 'The port complex is undergoing restoration work, and some parts may be closed',
    zh: '__ZH_PENDING__',
    de: '__DE_PENDING__',
    ru: '__RU_PENDING__',
  },
};

// حكم إياد 2026-10-02: لا يُشار إلى وقت زيارة المساجد العاملة لا نفياً ولا تأكيداً — فخرج «مراعاة
// أوقات الصلاة» من البند ومن عبارة المدونة، وخرجت صفوف «المواعيد» (أوقات الصلوات) ووقت مسجد جواثا.
export const VISIT_LABEL = { ar: 'الزيارة', en: 'Visiting', zh: '游览', de: 'Besuch', ru: 'Посещение' };
export const VISIT_VALUE = {
  ar: 'متاحة، مع اللباس المحتشم واحترام حرمة المكان',
  en: 'Open to visitors, with modest dress and respect for the sanctity of the place',
  zh: '开放参观，请注意衣着端庄，尊重场所的神圣',
  de: 'Für Besucher offen – bitte in bedeckender Kleidung und mit Respekt vor der Heiligkeit des Ortes',
  ru: 'Открыто для посетителей; приходите в скромной одежде и уважайте святость места',
};

// عبارة الزيارة في المقالين (مفتاح المقال ← لغة ← العبارة كما تُنشر)
export const BLOG_CLAUSE = {
  '24-hours-itinerary': {
    ar: 'وزيارته متاحة، مع اللباس المحتشم واحترام حرمة المكان',
    en: 'it is open to visitors, with modest dress and respect for the sanctity of the place',
    zh: '这里对游客开放，参观时请注意衣着端庄，尊重场所的神圣', de: 'Die Moschee steht Besuchern offen – bitte in bedeckender Kleidung und mit Respekt vor der Heiligkeit des Ortes', ru: 'Мечеть открыта для посетителей — приходите в скромной одежде и уважайте святость места',
  },
  '48-hours-itinerary': {
    ar: 'زيارة المسجد متاحة، مع اللباس المحتشم واحترام حرمة المكان',
    en: 'The mosque is open to visitors, with modest dress and respect for the sanctity of the place',
    zh: '清真寺向游客开放，入寺请注意衣着端庄，尊重场所的神圣', de: 'Die Moschee steht Besuchern offen – bitte in bedeckender Kleidung und mit Respekt vor der Heiligkeit des Ortes', ru: 'Мечеть открыта для посетителей — приходите в скромной одежде и уважайте святость места',
  },
};

// الصيغ السابقة للبند بلغاتها الخمس — تسمياتٍ وقيماً — ومعها كل صيغة لوقت زيارة المسجد (2026-10-02)
export const RETIRED = [
  'زيارة غير المسلمين', 'متاحة، مع المحافظة على اللباس المحتشم', 'متاحة خارج أوقات الصلاة',
  'Visitors of other faiths', 'Welcome, with modest dress', 'Open outside prayer times',
  '非穆斯林游客', '欢迎参观，请注意衣着端庄', '礼拜时间以外开放参观',
  'Nichtmuslimische Besucher', 'Willkommen – bedeckende Kleidung vorausgesetzt', 'Außerhalb der Gebetszeiten möglich',
  'Вход для немусульман', 'Открыт при условии скромной одежды', 'Доступно вне времени молитв',
  // وقت الزيارة: البند السابق، وصفوف المواعيد، ووقت مسجد جواثا
  'مع مراعاة أوقات الصلاة', 'يُفتح لأوقات الصلوات', 'يومياً خلال أوقات الصلوات', 'المسجد طوال اليوم', 'المسجد مفتوح طوال اليوم',
  'with respect for prayer times', 'open at prayer times', 'at the five prayer times', 'Mosque: all day', 'The mosque is open all day',
  '请留意礼拜时间', '清真寺全天开放',
  'Rücksicht auf die Gebetszeiten', 'zu den Gebetszeiten geöffnet', 'Moschee: ganztägig',
  'учитывайте время молитв', 'Мечеть: открыта весь день', 'Мечеть открыта весь день',
  // جملة ترميم العقير في المتن (صارت في البطاقة وحدها) — 2026-10-02
  'يشهد الموقع أعمال ترميم', 'The site is undergoing restoration work', '遗址内正在开展修缮工作',
  'Derzeit laufen auf dem Gelände Restaurierungsarbeiten', 'Сейчас здесь идут реставрационные работы',
];

// عبارات تفرّق بين الزوار بحسب الدين — ممنوعة في صفحات المدونة بكل لغة
export const BLOG_RETIRED = ['غير المسلمين', 'other faiths', 'non-Muslim', 'Non-Muslim', '非穆斯林', 'Nichtmuslim', 'немусульман'];

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
  for (const l of LANGS) if (/^__/.test(VISIT_VALUE[l])) problems.push(`VISIT_VALUE.${l} غير معبّأ`);
  for (const { file, text } of sources) {
    for (const r of RETIRED) if (text.includes(r)) problems.push(`${file}: المصدر يحمل صيغة سابقة «${r}»`);
    const line = text.split('\n').find((l) => l.includes(`label: "${VISIT_LABEL.ar}", value: "${VISIT_VALUE.ar}"`));
    if (!line) continue;
    const f = rowFields(line);
    for (const l of LANGS) {
      if (!f[l].label || !f[l].value) continue;
      if (f[l].label !== VISIT_LABEL[l] || f[l].value !== VISIT_VALUE[l]) { problems.push(`${file} [${l}]: البند في المصدر لا يطابق الصيغة المعتمدة`); continue; }
      // zh/de/ru: الصفحة لا تُبنى إلا بحقل title_<lang> (بوابة التوليد)
      if (l !== 'ar' && l !== 'en' && !new RegExp(`^title_${l}:`, 'm').test(text)) continue;
      const html = pagesFor(file, l);
      if (!html) { problems.push(`${file} [${l}]: الصفحة غير منشورة`); continue; }
      const card = cardOf(html);
      if (!card) { problems.push(`${file} [${l}]: بطاقة الزيارة غائبة`); continue; }
      if (!card.includes(`<dt>${VISIT_LABEL[l]}</dt><dd>${VISIT_VALUE[l]}</dd>`)) problems.push(`${file} [${l}]: بند «${VISIT_LABEL[l]}» غير منشور حرفياً في البطاقة`);
      else stats[l]++;
    }
  }
  for (const { rel, html } of allPages) {
    const card = cardOf(html);
    if (!card) continue;
    for (const r of RETIRED) if (card.includes(r)) problems.push(`${rel}: البطاقة تنشر صيغة سابقة «${r}»`);
  }
  if (stats.ar < EXPECT.minPages) problems.push(`الحارس صار فارغاً: ${stats.ar} صفحة عربية تنشر البند — المتوقع ≥${EXPECT.minPages}`);
  // (د) مساجد قيد الترميم
  let restoration = 0;
  for (const [file, want] of Object.entries(UNDER_RESTORATION)) {
    const src = sources.find((s) => s.file === file);
    if (!src) { problems.push(`${file}: غائب عن المصدر`); continue; }
    const line = src.text.split('\n').find((l) => l.includes(`label: "${RESTORATION_LABEL.ar}", value: "${want.ar}"`));
    if (!line) { problems.push(`${file}: بند «${RESTORATION_LABEL.ar}» لا يحمل صيغة الترميم المعتمدة`); continue; }
    const f = rowFields(line);
    for (const l of LANGS) {
      if (/^__/.test(want[l]) || /^__/.test(RESTORATION_LABEL[l])) { problems.push(`UNDER_RESTORATION.${file}.${l} غير معبّأ`); continue; }
      if (f[l].label !== RESTORATION_LABEL[l] || f[l].value !== want[l]) { problems.push(`${file} [${l}]: صيغة الترميم في المصدر لا تطابق المعتمدة`); continue; }
      if (l !== 'ar' && l !== 'en' && !new RegExp(`^title_${l}:`, 'm').test(src.text)) continue;
      const card = cardOf(pagesFor(file, l) ?? '');
      if (!card || !card.includes(`<dt>${RESTORATION_LABEL[l]}</dt><dd>${want[l]}</dd>`)) problems.push(`${file} [${l}]: صيغة الترميم غير منشورة في البطاقة`);
    }
    restoration++;
  }
  if (restoration < EXPECT.minRestoration) problems.push(`مساجد الترميم المفحوصة ${restoration} — المتوقع ≥${EXPECT.minRestoration}`);
  return { problems, stats };
}

/**
 * blogPages: [{ rel, lang, key, html }] — كل صفحات مقالات المدونة المنشورة بكل اللغات
 * (key = حقل key في ترويسة المقال)
 */
export function checkBlogVisitWording(blogPages) {
  const problems = [];
  let clauses = 0;
  for (const { rel, lang, key, html } of blogPages) {
    const page = decode(html);
    for (const r of BLOG_RETIRED) if (page.includes(r)) problems.push(`${rel}: المدونة تنشر عبارة تفرّق بين الزوار بحسب الدين «${r}»`);
    const want = BLOG_CLAUSE[key]?.[lang];
    if (!want) continue;
    if (/^__/.test(want)) { problems.push(`BLOG_CLAUSE.${key}.${lang} غير معبّأ`); continue; }
    if (!page.includes(want)) problems.push(`${rel}: عبارة الزيارة المعتمدة غائبة`);
    else clauses++;
  }
  const wantClauses = Object.values(BLOG_CLAUSE).reduce((n, m) => n + Object.keys(m).length, 0);
  if (clauses !== wantClauses) problems.push(`عبارة الزيارة منشورة في ${clauses} صفحة — المتوقع ${wantClauses}`);
  if (blogPages.length < EXPECT.minBlogPages) problems.push(`الحارس صار فارغاً: ${blogPages.length} صفحة مدونة — المتوقع ≥${EXPECT.minBlogPages}`);
  return { problems, stats: { pages: blogPages.length, clauses } };
}
