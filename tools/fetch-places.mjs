// جلب تقييمات وأوقات عمل المطاعم والمقاهي من Google Places API (New) وقت البناء.
//
// لماذا API لا كشط: كشط صفحات خرائط قوقل مخالف لشروطها وهشّ؛ الـAPI هو المصدر
// الرسمي. البيانات لا تُخزَّن في المستودع (places-live.json في .gitignore) —
// تُجلب طازجة في كل بناء يملك المفتاح، التزاماً بحدود التخزين في شروط قوقل
// (معرّفات الأماكن وحدها قابلة للتخزين الدائم، وهي في place-ids.json).
//
// المفتاح: متغير البيئة GOOGLE_PLACES_API_KEY (يُضاف في Netlify ← Environment
// variables). بلا مفتاح يخرج السكربت بنجاح صامتاً والصفحة تُبنى بلا تقييمات —
// **هذا السكربت يجب ألا يُفشل البناء أبداً**.
//
// التشغيل: يعمل تلقائياً قبل البناء (prebuild في package.json)، أو يدوياً:
//   node tools/fetch-places.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEEDS = join(ROOT, 'src', 'data', 'place-seeds.json');
const IDS = join(ROOT, 'src', 'data', 'place-ids.json');
const OUT = join(ROOT, 'src', 'data', 'places-live.json');

const KEY = process.env.GOOGLE_PLACES_API_KEY;

// الأرقام العربية-الهندية تُحوَّل لاتينية — قاعدة الموقع (قرار إياد 2026-07-21)
const latinize = (s) => s.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

async function api(path, { body, lang } = {}) {
  const url = new URL(`https://places.googleapis.com/v1/${path}`);
  if (lang) url.searchParams.set('languageCode', lang);
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': body
        ? 'places.id,places.displayName'
        : 'displayName,rating,userRatingCount,regularOpeningHours.weekdayDescriptions,regularOpeningHours.periods,utcOffsetMinutes,businessStatus',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function main() {
  if (!KEY) {
    // تحذير صاخب لا سطر عابر: التدقيق (2026-08-28) وجد الإنتاج بلا تقييمات أصلاً
    // لأن الغياب كان يمرّ بصمت في سجل البناء. البناء يبقى ناجحاً عمداً.
    console.warn('════════════════════════════════════════════════════════════');
    console.warn('fetch-places: GOOGLE_PLACES_API_KEY غير موجود!');
    console.warn('صفحة المطاعم والمقاهي ستُبنى بلا تقييمات ولا أوقات عمل.');
    console.warn('أضف المفتاح في Netlify ← Site configuration ← Environment variables.');
    console.warn('════════════════════════════════════════════════════════════');
    return;
  }

  // ملاحظة تشغيلية: place-ids.json يُلتزم في git (شروط قوقل تجيز تخزين المعرّفات
  // وحدها). إن كان ناقصاً فكل بناء يعيد شراء بحث نصي لكل بذرة — وهو الاستدعاء
  // الأغلى — مع خطر تبدّل النتيجة الأولى بصمت. الحل: شغّل السكربت محلياً مرة
  // بالمفتاح والتزم الملف الناتج، فتبقى للبناء تفاصيلُ الأماكن الرخيصة فقط.

  const seeds = JSON.parse(await readFile(SEEDS, 'utf8'));
  const ids = existsSync(IDS) ? JSON.parse(await readFile(IDS, 'utf8')) : {};

  // المرحلة 1: حلّ معرّف المكان لكل بذرة جديدة — بالبحث النصي باسمه وعنوانه
  // الكاملين كما وردا من رابط مشاركة إياد نفسه (أدقّ استعلام ممكن).
  let idsChanged = false;
  for (const [slug, seed] of Object.entries(seeds)) {
    if (ids[slug]) continue;
    try {
      const r = await api('places:searchText', {
        body: { textQuery: seed.query, regionCode: 'SA' },
        lang: 'ar',
      });
      const hit = r.places?.[0];
      if (!hit) { console.warn(`fetch-places: لا نتيجة بحث لـ ${slug}`); continue; }
      ids[slug] = hit.id;
      idsChanged = true;
      console.log(`fetch-places: ${slug} → ${hit.id} (${hit.displayName?.text ?? ''})`);
    } catch (e) {
      console.warn(`fetch-places: فشل حلّ ${slug}: ${e.message}`);
    }
  }
  if (idsChanged) await writeFile(IDS, JSON.stringify(ids, null, 2) + '\n', 'utf8');

  // المرحلة 2: تفاصيل كل مكان باللغتين (أوقات العمل نصوص مُعرَّبة/مُنجلَزة من قوقل)
  const places = {};
  for (const [slug, id] of Object.entries(ids)) {
    try {
      const [ar, en] = await Promise.all([
        api(`places/${id}`, { lang: 'ar' }),
        api(`places/${id}`, { lang: 'en' }),
      ]);
      places[slug] = {
        rating: ar.rating ?? null,
        count: ar.userRatingCount ?? null,
        hoursAr: (ar.regularOpeningHours?.weekdayDescriptions ?? []).map(latinize),
        hoursEn: en.regularOpeningHours?.weekdayDescriptions ?? [],
        status: ar.businessStatus ?? null,
        // «مفتوح الآن» يُحسب في متصفح الزائر لا هنا: الصفحة ثابتة تُصيَّر مرة عند
        // البناء، فأي حالة لحظية تُخزَّن تصير كذباً بعد ساعة (سابقة عدّاد الفعاليات
        // وشارة «نحن الآن هنا»). لذلك نخزّن البنية الأسبوعية الثابتة وحدها، ولا
        // نطلب currentOpeningHours إطلاقاً. الإزاحة تؤخذ من البيانات لا تُفترض.
        periods: (ar.regularOpeningHours?.periods ?? []).map((p) => [
          p.open?.day ?? null, (p.open?.hour ?? 0) * 60 + (p.open?.minute ?? 0),
          p.close?.day ?? null, (p.close?.hour ?? 0) * 60 + (p.close?.minute ?? 0),
        ]),
        utcOffset: ar.utcOffsetMinutes ?? null,
      };
      // الاسم الرسمي باللغتين يُطبع ولا يُخزَّن: أسماء dining.ts تُعتمد من قوقل
      // (قرار إياد 2026-08-30)، وهذا السطر هو الطريق لمراجعتها دورياً من سجل البناء.
      const nameAr = ar.displayName?.text ?? '?';
      const nameEn = en.displayName?.text ?? '?';
      console.log(`fetch-places: ${slug} ★${places[slug].rating} (${places[slug].count}) | ar=«${nameAr}» | en=«${nameEn}»`);
    } catch (e) {
      console.warn(`fetch-places: فشل جلب ${slug}: ${e.message}`);
    }
  }

  if (!Object.keys(places).length) {
    console.warn('fetch-places: لم يُجلب أي مكان — لن يُكتب places-live.json.');
    return;
  }
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), places }, null, 2) + '\n', 'utf8');
  console.log(`fetch-places: كُتب ${Object.keys(places).length} مكاناً في places-live.json`);
}

main().catch((e) => {
  // فشل كامل ≠ فشل بناء: الصفحة تتدهور رشيقاً إلى ما قبل التقييمات
  console.warn(`fetch-places: خطأ غير متوقع (تجاهُل): ${e.message}`);
});
