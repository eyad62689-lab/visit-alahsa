// C27 — سلامة المسارات المقترحة (/trails/ و/en/trails/، 2026-09-26).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بالمصدر (src/data/trails.json)
// وصفحات dist، ويستدعيها اختبار الكسر بنسخ معدَّلة في الذاكرة — فيُثبَت أن كل حارس يُخفق
// فعلاً دون مسّ المصدر ولا إعادة بناء (فخّ استعادة حلقة الكسر في CLAUDE.md).
//
// يحرس:
//   (أ) المصدر: كل مفتاح مصدر تحت محطة معرَّف في sources؛ نصوص ar/en كاملة لكل مسار
//       ومحطة؛ لا «المعتمدة/الرسمية/من روح السعودية/official/approved» في عنوان المسار
//       وتسميته ومقدّمته (هذه الحقول وحدها — نصوص المحطات والإسناد تحمل «رسمياً»
//       و«الجهات الرسمية» بحق)؛ «المسرح الروماني»/"Roman Theatre" لا يرد في نص محطة إلا
//       ومعه «لا أثر روماني»/"not a Roman antiquity" في النص نفسه.
//   (ب) المنشور لكل لغة (ar/en): 5 صفحات مسار بالضبط و13 محطة و5 شارات يونسكو على
//       المحطات الخمس المسمّاة وحدها؛ ملاحظة اليونسكو مرة واحدة في كل صفحة؛ الإسناد في
//       رأس الفهرس وذيل كل مسار (بعد آخر محطة)؛ نص كل محطة منشور حرفياً (التشكيل كما هو)؛
//       المصادر تحت كل محطة بعناوينها وروابطها وtarget=_blank rel=noopener؛ لا وصف رسمي في
//       <title> والوصف وog/twitter وh1؛ hreflang عربي/إنجليزي فقط.

export const EXPECT = {
  trails: 5,
  stops: 13,
  // قصر إبراهيم · سوق القيصرية · مسجد جواثى · بساتين الواحة · بحيرة الأصفر
  unescoStops: ['qasr-ibrahim', 'souq-al-qaisariya', 'jawatha-mosque', 'oasis-farms', 'al-asfar-lake'],
  // المحطات المرتبطة بصفحة معلم (التلميح الحرفي + جدول src/lib/trails.ts) — 11 من 13
  unlinkedStops: ['oasis-farms', 'natural-springs'],
};

const FORBIDDEN_AR = ['المعتمدة', 'الرسمية', 'من روح السعودية'];
const FORBIDDEN_EN = [/\bofficial\b/i, /\bapproved\b/i];
const hasForbidden = (s) => FORBIDDEN_AR.filter((w) => s.includes(w)).concat(FORBIDDEN_EN.filter((re) => re.test(s)).map(String));

const decode = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'").replace(/&amp;/g, '&');
const strip = (s) => { let p; do { p = s; s = s.replace(/<[^>]*>/g, ''); } while (s !== p); return s; };
const count = (s, needle) => s.split(needle).length - 1;

/** الفحص على المصدر وحده */
export function checkTrailsSource(data) {
  const problems = [];
  const langs = ['ar', 'en'];
  for (const t of data.trails ?? []) {
    for (const l of langs) {
      for (const f of ['title', 'tagline', 'intro']) {
        const v = t[l]?.[f];
        if (!v || !String(v).trim()) problems.push(`${t.slug}: ${l}.${f} فارغ`);
        else { const bad = hasForbidden(v); if (bad.length) problems.push(`${t.slug}: ${l}.${f} يحمل وصفاً رسمياً (${bad.join('، ')})`); }
      }
    }
    for (const s of t.stops ?? []) {
      for (const l of langs) for (const f of ['name', 'text']) {
        if (!s[l]?.[f] || !String(s[l][f]).trim()) problems.push(`${t.slug}/${s.key}: ${l}.${f} فارغ`);
      }
      for (const k of s.sources ?? []) if (!data.sources?.[k]) problems.push(`${t.slug}/${s.key}: مفتاح مصدر غير معرَّف «${k}»`);
      if (!(s.sources ?? []).length) problems.push(`${t.slug}/${s.key}: بلا مصادر`);
      const ar = s.ar?.text ?? '', en = s.en?.text ?? '';
      if (ar.includes('المسرح الروماني') && !ar.includes('لا أثر روماني')) problems.push(`${t.slug}/${s.key}: «المسرح الروماني» بلا «لا أثر روماني»`);
      if (/roman theatre/i.test(en) && !en.includes('not a Roman antiquity')) problems.push(`${t.slug}/${s.key}: "Roman Theatre" بلا "not a Roman antiquity"`);
    }
  }
  for (const l of langs) {
    if (!data.meta?.attribution?.[l]) problems.push(`meta.attribution.${l} فارغ`);
    if (!data.meta?.unescoNote?.[l]) problems.push(`meta.unescoNote.${l} فارغ`);
  }
  return problems;
}

/** رأس الصفحة: العنوان والوصف ووسوم og/twitter وh1 — لا وصف رسمي */
const headTexts = (html) => {
  const out = [];
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  if (title) out.push(['title', title]);
  for (const m of html.matchAll(/<meta (?:name|property)="(description|og:title|og:description|twitter:title|twitter:description)" content="([^"]*)"/g)) out.push([m[1], m[2]]);
  for (const m of html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)) out.push(['h1', strip(m[1])]);
  return out.map(([k, v]) => [k, decode(v)]);
};

/**
 * pages: { ar: { index: html, trails: Map(slug → html) }, en: {...} }
 * يعيد { problems, stats }
 */
export function checkTrails(data, pages) {
  const problems = checkTrailsSource(data);
  const stats = {};
  const trails = [...(data.trails ?? [])].sort((a, b) => a.order - b.order);
  const allStops = trails.flatMap((t) => t.stops);
  if (trails.length !== EXPECT.trails) problems.push(`المصدر ${trails.length} مسارات — المتوقع ${EXPECT.trails}`);
  if (allStops.length !== EXPECT.stops) problems.push(`المصدر ${allStops.length} محطة — المتوقع ${EXPECT.stops}`);
  const srcUnesco = allStops.filter((s) => s.unesco).map((s) => s.key).sort().join(',');
  if (srcUnesco !== [...EXPECT.unescoStops].sort().join(',')) problems.push(`محطات اليونسكو في المصدر [${srcUnesco}] ≠ المتوقع`);

  for (const l of ['ar', 'en']) {
    const P = pages?.[l];
    if (!P?.index) { problems.push(`${l}: فهرس المسارات غير منشور`); continue; }
    const st = { pages: P.trails.size, stops: 0, badges: 0, landmarks: 0, sources: 0 };
    stats[l] = st;
    const attr = data.meta.attribution[l];
    const note = data.meta.unescoNote[l];
    const checkHead = (rel, html) => {
      for (const [k, v] of headTexts(html)) { const bad = hasForbidden(v); if (bad.length) problems.push(`${rel}: ${k} يحمل وصفاً رسمياً (${bad.join('، ')})`); }
      const langs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/g)].map((m) => m[1]).sort().join(',');
      if (langs !== 'ar,en,x-default') problems.push(`${rel}: hreflang [${langs}] — المسارات عربي/إنجليزي فقط`);
      const notes = count(html, 'data-unesco-note');
      if (notes !== 1) problems.push(`${rel}: ملاحظة اليونسكو ${notes} مرة — المطلوب مرة واحدة`);
      else if (!decode(html).includes(note)) problems.push(`${rel}: نص ملاحظة اليونسكو لا يطابق المصدر`);
    };

    // الفهرس: الإسناد في الرأس (داخل الهيرو قبل القائمة) وبطاقة لكل مسار
    const idx = P.index;
    checkHead(`${l}/trails/index`, idx);
    const attrAt = idx.indexOf('data-trail-attribution');
    const listAt = idx.indexOf('data-trail-card');
    const heroAt = idx.indexOf('page-hero');
    if (attrAt === -1 || !decode(idx).includes(attr)) problems.push(`${l}/trails/index: الإسناد غائب أو لا يطابق المصدر`);
    else if (!(heroAt !== -1 && heroAt < attrAt && attrAt < listAt)) problems.push(`${l}/trails/index: الإسناد ليس في رأس الصفحة`);
    const cards = count(idx, 'data-trail-card=');
    if (cards !== EXPECT.trails) problems.push(`${l}/trails/index: ${cards} بطاقات — المتوقع ${EXPECT.trails}`);

    // صفحات المسار
    if (P.trails.size !== EXPECT.trails) problems.push(`${l}: ${P.trails.size} صفحة مسار منشورة — المتوقع ${EXPECT.trails}`);
    for (const t of trails) {
      const html = P.trails.get(t.slug);
      const rel = `${l}/trails/${t.slug}`;
      if (!html) { problems.push(`${rel}: غير منشورة`); continue; }
      checkHead(rel, html);
      const segs = html.split('data-stop="').slice(1);
      const keys = segs.map((s) => s.slice(0, s.indexOf('"')));
      if (keys.join(',') !== t.stops.map((s) => s.key).join(',')) problems.push(`${rel}: المحطات [${keys}] ≠ المصدر مرتّباً`);
      st.stops += segs.length;
      segs.forEach((seg, i) => {
        const end = seg.indexOf('data-unesco-note');
        const body = end === -1 ? seg : seg.slice(0, end);
        const s = t.stops[i];
        if (!s) return;
        const badge = body.includes('data-unesco-badge');
        if (badge) st.badges++;
        if (badge !== s.unesco) problems.push(`${rel}/${s.key}: شارة اليونسكو ${badge ? 'ظاهرة' : 'غائبة'} و unesco=${s.unesco}`);
        const text = body.match(/<p class="trd-text"[^>]*>([\s\S]*?)<\/p>/)?.[1];
        if (text === undefined || decode(strip(text)) !== s[l].text) problems.push(`${rel}/${s.key}: نص المحطة المنشور لا يطابق المصدر حرفياً`);
        if (body.includes('data-landmark-link')) st.landmarks++;
        const links = [...body.matchAll(/<a\b([^>]*\bdata-source="([^"]+)"[^>]*)>([\s\S]*?)<\/a>/g)];
        st.sources += links.length;
        if (links.map((m) => m[2]).join(',') !== s.sources.join(',')) problems.push(`${rel}/${s.key}: المصادر [${links.map((m) => m[2])}] ≠ [${s.sources}]`);
        for (const m of links) {
          const src = data.sources[m[2]];
          if (!src) continue;
          const href = decode(m[1].match(/href="([^"]*)"/)?.[1] ?? '');
          if (href !== src.url) problems.push(`${rel}/${s.key}: رابط ${m[2]} ≠ المصدر`);
          if (!/target="_blank"/.test(m[1]) || !/rel="noopener"/.test(m[1])) problems.push(`${rel}/${s.key}: رابط ${m[2]} بلا target=_blank rel=noopener`);
          if (decode(strip(m[3])).trim() !== src.title) problems.push(`${rel}/${s.key}: عنوان ${m[2]} ≠ المصدر`);
        }
      });
      // الإسناد في ذيل الصفحة: بعد آخر محطة
      const a = html.lastIndexOf('data-trail-attribution');
      const lastStop = html.lastIndexOf('data-stop="');
      if (a === -1 || !decode(html).includes(attr)) problems.push(`${rel}: الإسناد غائب أو لا يطابق المصدر`);
      else if (a < lastStop) problems.push(`${rel}: الإسناد ليس في ذيل الصفحة`);
    }
    if (st.stops !== EXPECT.stops) problems.push(`${l}: ${st.stops} محطة منشورة — المتوقع ${EXPECT.stops}`);
    if (st.badges !== EXPECT.unescoStops.length) problems.push(`${l}: ${st.badges} شارة يونسكو — المتوقع ${EXPECT.unescoStops.length}`);
    const wantLinks = EXPECT.stops - EXPECT.unlinkedStops.length;
    if (st.landmarks !== wantLinks) problems.push(`${l}: ${st.landmarks} رابط معلم — المتوقع ${wantLinks}`);
  }
  return { problems, stats };
}
