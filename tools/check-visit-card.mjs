// بطاقة «معلومات الزيارة» في صفحات المعالم — منطق الفحص دالةً نقية (بلا قراءة ملفات)
// كي يُختبر كسرها على نسخة dist في الذاكرة. الاستدعاء من tools/check-consistency.mjs.
//
// ما يُفرض على كل صفحة معلم بكل لغة مبنية:
//   ١. لا سطر إسناد ولا تاريخ تحقق ولا ملاحظة مراجعة: لا .info-src ولا عبارات الإسناد
//      المعروفة (بأي لغة) ولا أيّ قيمة source/source_* من ملفات المعالم، في النص المرئي
//      وفي JSON-LD وفي السمات. حقول الإسناد في المصدر بيانات داخلية لا تُصيَّر.
//   ٢. داخل البطاقة لا رابط خارجي إلا رابط الخريطة ورابط المشغّل (وخرائط 高德 في zh).
//   ٣. سطر المواعيد والرسوم الموحَّد يظهر مرة واحدة بالضبط حين تعرض البطاقة بلغة الصفحة
//      بند مواعيد أو رسوم، ويغيب حين لا تعرضه؛ ونصّه يطابق قاموس اللغة حرفياً.
//      والمعلم الموسوم openSite: true لا سطر له بأي لغة.
//   ٤. حين يحمل المعلم operatorUrl تصير كلمة المشغّل رابطاً إليه (target=_blank rel=noopener)،
//      ولا رابط داخل السطر في غيره.

export const LANGS = ['ar', 'en', 'zh', 'de', 'ru', 'ur', 'tr'];
// لغاتٌ لم تمرّ دفعة واجهتها بخط ترجمتها بعد: الموقع ينشر فيها السطر بنصّه الإنجليزي (تراجع
// useTranslations: اللغة ← en)، فالمتوقَّع فيها مفتاح قاموسها إن وُجد وإلا الإنجليزي. بقية
// اللغات تبقى ملزمة بمفتاحَيها في قاموسها نفسه — غيابهما هناك إخفاق لا تراجع.
export const EN_FALLBACK_LANGS = ['ur', 'tr'];
// أدنى عدد لمعالم openSite (المفتوحة للعموم بلا رسوم أو على مدار الساعة)
export const MIN_OPEN_SITES = 10;

// عبارات إسناد وتحقق ومراجعة بكل لغات الموقع (تسميات السطر القديم وصيغه المعروفة).
export const ATTRIBUTION_PHRASES = [
  'تاريخ التحقق', 'تحقق مباشر', 'مسودة دليل', 'تأكيد فريق', 'رُوجعت', 'روجعت',
  'Verified', 'Approved draft', 'Confirmed by the Visit Al-Ahsa team', 'as confirmed by', 'Reviewed in', 'reviewed in',
  '核实日期', '编辑团队确认',
  'Zuletzt geprüft', 'Redaktionsteam',
  'Проверено', 'редакция этого сайта', 'редакцией этого сайта',
];
// تسميات «المصدر:» تُفحص داخل البطاقة وحدها: المتن العربي قد يُسند فقرةً إلى مرجعها (ويكيبيديا مثلاً)،
// وذلك استشهادٌ في المتن لا سطر إسناد لبطاقة الزيارة.
export const CARD_LABELS = ['المصدر:', 'Source:', '来源：', '来源:', 'Quelle:', 'Источник:'];

const decodeEntities = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&');

const stripTags = (html) => {
  let prev;
  do { prev = html; html = html.replace(/<[^<>]*>/g, ''); } while (html !== prev);
  return html;
};

// مقاطع <script>/<style> تُقطع بالبحث عن الوسوم لا بتعبير نمطي على HTML: الناتج نصّ للفحص لا للعرض.
export function cutBlocks(html, tag, keep) {
  const lower = html.toLowerCase();
  const open = `<${tag}`, close = `</${tag}`;
  let out = '', i = 0;
  const kept = [];
  for (;;) {
    const s = lower.indexOf(open, i);
    if (s === -1) { out += html.slice(i); break; }
    const gt = lower.indexOf('>', s);
    const e = gt === -1 ? -1 : lower.indexOf(close, gt);
    if (gt === -1 || e === -1) { out += html.slice(i); break; }
    const endGt = lower.indexOf('>', e);
    out += html.slice(i, s) + ' ';
    if (keep && keep(html.slice(s, gt + 1))) kept.push(html.slice(gt + 1, e));
    i = endGt === -1 ? html.length : endGt + 1;
  }
  return { out, kept };
}
const ldJsonBlocks = (html) => cutBlocks(html, 'script', (openTag) => openTag.includes('application/ld+json')).kept;
const visibleText = (html) => stripTags(cutBlocks(cutBlocks(html, 'script').out, 'style').out);
export const textAttributes = (html) => [...html.matchAll(/\s(?:alt|title|aria-label|content)="([^"]*)"/g)].map((m) => m[1]);

// سلاسل القاموس: det.hoursNotice وdet.hoursNotice.op من كل كتلة لغة في src/i18n/ui.ts
export function noticeStrings(uiText) {
  const lines = uiText.replace(/\r\n?/g, '\n').split('\n');
  const out = {};
  let cur = null;
  for (const l of lines) {
    const b = l.match(/^ {2}(ar|en|zh|de|ru|ur|tr): \{$/);
    if (b) { cur = b[1]; out[cur] = {}; continue; }
    const m = cur && l.match(/^ {4}'(det\.hoursNotice(?:\.op)?)': '((?:[^'\\]|\\.)*)',$/);
    if (m) out[cur][m[1]] = m[2].replace(/\\(.)/g, '$1');
  }
  for (const l of EN_FALLBACK_LANGS) out[l] = { ...out.en, ...out[l] };
  return out;
}

// التوقّع من ملف معلم واحد (نصّ Markdown كامل بنهايات LF)
export function expectFromSource(raw) {
  const fm = raw.split('\n---')[0];
  const val = (k) => {
    const m = fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
  };
  const items = fm.split('\n').filter((l) => /^\s*-\s*\{\s*label:/.test(l) && l.includes('verified: true'));
  const hoursFee = items.filter((l) => /label: "[^"]*(المواعيد|الرسوم)/.test(l));
  // الموقع المفتوح (openSite: true) لا سطر له بأي لغة
  const openSite = /^openSite:\s*true\s*$/m.test(fm);
  const shows = {
    ar: hoursFee.length > 0,
    en: hoursFee.some((l) => l.includes('label_en: "') && l.includes('value_en: "')),
    zh: hoursFee.some((l) => l.includes('label_zh: "') && l.includes('value_zh: "')),
    de: hoursFee.some((l) => l.includes('label_de: "') && l.includes('value_de: "')),
    ru: hoursFee.some((l) => l.includes('label_ru: "') && l.includes('value_ru: "')),
    ur: hoursFee.some((l) => l.includes('label_ur: "') && l.includes('value_ur: "')),
    tr: hoursFee.some((l) => l.includes('label_tr: "') && l.includes('value_tr: "')),
  };
  if (openSite) for (const l of LANGS) shows[l] = false;
  const sources = new Set();
  for (const l of items) for (const m of l.matchAll(/\bsource(?:_(?:en|zh|de|ru))?: "([^"]+)"/g)) sources.add(m[1]);
  return {
    slugAr: val('slug_ar'),
    slugEn: val('slug_en'),
    langs: LANGS.filter((l) => l === 'ar' || l === 'en' || new RegExp(`^title_${l}:`, 'm').test(fm)),
    shows,
    operatorUrl: val('operatorUrl'),
    openSite,
    mapUrl: val('mapUrl'),
    sources,
  };
}

// expects: [{...expectFromSource}], pages: Map `${lang}:${slugEn}` → html, strings: noticeStrings(ui)
export function checkVisitCards(expects, pages, strings) {
  const attr = [];   // إسناد/تحقق/مراجعة منشورة أو رابط مصدر في البطاقة
  const notice = []; // سطر المواعيد والرسوم ورابط المشغّل
  const stats = { pages: 0, notice: Object.fromEntries(LANGS.map((l) => [l, 0])), operatorLinks: Object.fromEntries(LANGS.map((l) => [l, 0])), openSiteClean: 0 };
  const allSources = new Set();
  for (const e of expects) for (const s of e.sources) allSources.add(s);
  const phrases = [...ATTRIBUTION_PHRASES, ...allSources];

  for (const lang of LANGS) {
    const s = strings[lang];
    if (!s || !s['det.hoursNotice'] || !s['det.hoursNotice.op'] || s['det.hoursNotice'].split('{op}').length !== 2) {
      notice.push(`${lang}: det.hoursNotice/det.hoursNotice.op غائبان أو بلا {op} واحد في القاموس`);
    }
  }

  for (const e of expects) {
    for (const lang of e.langs) {
      const key = `${lang}:${e.slugEn}`;
      const html = pages.get(key);
      if (html == null) { notice.push(`${key}: الصفحة غير مبنية`); continue; }
      stats.pages++;

      // ١. لا إسناد في أي قناة: النص المرئي + كتل JSON-LD + قيم السمات النصية
      if (/class="info-src"/.test(html)) attr.push(`${key}: سطر إسناد .info-src منشور`);
      const scan = decodeEntities([visibleText(html), ...ldJsonBlocks(html), ...textAttributes(html)].join('\n'));
      for (const p of phrases) if (scan.includes(p)) attr.push(`${key}: عبارة إسناد/تحقق منشورة «${p}»`);

      // ٢. روابط البطاقة
      const cardStart = html.indexOf('class="info-card"');
      const cardEnd = cardStart >= 0 ? html.indexOf('</aside>', cardStart) : -1;
      const card = cardStart >= 0 && cardEnd > cardStart ? html.slice(cardStart, cardEnd) : '';
      if (!card) { notice.push(`${key}: بطاقة معلومات الزيارة غائبة`); continue; }
      const cardText = decodeEntities(stripTags(card));
      for (const p of CARD_LABELS) if (cardText.includes(p)) attr.push(`${key}: تسمية مصدر في البطاقة «${p}»`);
      for (const m of card.matchAll(/href="([^"]*)"/g)) {
        const href = decodeEntities(m[1]);
        if (!/^https?:/i.test(href)) continue;
        if (href === e.mapUrl || href === e.operatorUrl || href.startsWith('https://uri.amap.com/')) continue;
        attr.push(`${key}: رابط خارجي غير متوقَّع في البطاقة ${href}`);
      }

      // ٣ + ٤. سطر المواعيد والرسوم
      const notes = [...card.matchAll(/<p\b[^>]*\bdata-hours-notice\b[^>]*>([\s\S]*?)<\/p>/g)];
      const s = strings[lang] ?? {};
      if (e.shows[lang]) {
        if (notes.length !== 1) { notice.push(`${key}: سطر المواعيد والرسوم ظهر ${notes.length} مرة والمتوقَّع 1`); continue; }
        stats.notice[lang]++;
        const inner = notes[0][1];
        const expectedText = (s['det.hoursNotice'] ?? '').replace('{op}', s['det.hoursNotice.op'] ?? '');
        const got = decodeEntities(stripTags(inner)).replace(/\s+/g, ' ').trim();
        if (got !== expectedText) notice.push(`${key}: نصّ السطر «${got}» لا يطابق القاموس «${expectedText}»`);
        const links = [...inner.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
        if (e.operatorUrl) {
          const ok = links.length === 1
            && links[0][1].includes(`href="${e.operatorUrl}"`)
            && /\btarget="_blank"/.test(links[0][1]) && /\brel="noopener"/.test(links[0][1])
            && decodeEntities(stripTags(links[0][2])).trim() === s['det.hoursNotice.op'];
          if (ok) stats.operatorLinks[lang]++;
          else notice.push(`${key}: رابط المشغّل غائب أو مختلف (المتوقَّع ${e.operatorUrl} على «${s['det.hoursNotice.op']}»)`);
        } else if (links.length) {
          notice.push(`${key}: رابط داخل سطر المواعيد والرسوم بلا operatorUrl في المصدر`);
        }
      } else if (notes.length) {
        notice.push(e.openSite
          ? `${key}: سطر المواعيد والرسوم ظاهر في موقع مفتوح (openSite)`
          : `${key}: سطر المواعيد والرسوم ظاهر والبطاقة لا تعرض مواعيد ولا رسوماً بهذه اللغة`);
      }
      if (e.openSite && notes.length === 0) stats.openSiteClean++;
    }
  }

  // حرّاس إيجابيون: السطر حاضر بكل لغة، ورابط المشغّل في كل صفحة معلمٍ مشغَّل بكل لغة مبنية
  for (const lang of LANGS) {
    const want = expects.filter((e) => e.langs.includes(lang) && e.shows[lang]).length;
    if (stats.notice[lang] === 0 || stats.notice[lang] !== want) notice.push(`${lang}: السطر في ${stats.notice[lang]} صفحة والمتوقَّع ${want} (>0)`);
    const wantOp = expects.filter((e) => e.operatorUrl && e.langs.includes(lang) && e.shows[lang]).length;
    if (stats.operatorLinks[lang] !== wantOp) notice.push(`${lang}: رابط المشغّل في ${stats.operatorLinks[lang]} صفحة والمتوقَّع ${wantOp}`);
  }
  const operatorPages = expects.filter((e) => e.operatorUrl).length;
  if (operatorPages < 2) notice.push(`معالم بـoperatorUrl: ${operatorPages} والمتوقَّع 2 على الأقل`);
  // حارس إيجابي للمواقع المفتوحة: عددها لا ينزل عن الحدّ، وكل صفحاتها المبنية بلا سطر
  const openSites = expects.filter((e) => e.openSite);
  const openPages = openSites.reduce((n, e) => n + e.langs.filter((l) => pages.has(`${l}:${e.slugEn}`)).length, 0);
  if (openSites.length < MIN_OPEN_SITES) notice.push(`معالم بـopenSite: ${openSites.length} والمتوقَّع ${MIN_OPEN_SITES} على الأقل`);
  if (stats.openSiteClean !== openPages) notice.push(`صفحات المواقع المفتوحة بلا سطر: ${stats.openSiteClean} من ${openPages}`);
  return { attr, notice, problems: [...attr, ...notice], stats, operatorPages, openSites: openSites.length, openPages };
}
