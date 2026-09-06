// بصمة المحتوى (طبقة الحماية ٢) — يولّد لكل صفحة محتوى عبارة بصمية فريدة
// موجودة حرفياً في النص المنشور (لا نص مخفي محقون — فلا خطر cloaking على SEO).
// العبارات تُستعمل في الدالة المجدولة theft-scan للبحث عمّن أعاد نشر المحتوى.
//
// التشغيل: node scripts/fingerprint.mjs
// المخرج: src/data/content-fingerprints.json (يُضمَّن في theft-scan وقت البناء)

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://visit-alahsa.com'
const OUT = join(ROOT, 'src', 'data', 'content-fingerprints.json')

// فصل الواجهة الأمامية (frontmatter) عن المتن — يكفي استخراج حقول مفردة بسيطة
function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: raw }
}

function fmField(fm, name) {
  const m = fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))
  if (!m) return undefined
  let v = m[1].trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
  return v
}

// تنظيف الماركداون إلى نص صافٍ كما يظهر للقارئ (العبارة يجب أن تطابق المنشور حرفياً)
function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // أسطر العناوين تُسقط كلياً (لا يُزال الوسم فقط): إبقاء نصها يلصقه
    // بالفقرة التالية بعد ضم الفراغات فتنتج عبارة لا وجود لها في الصفحة
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/^>\s?/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

// المتون الماركداونية تمر بـ smartypants عند البناء (افتراضي Astro): علامة '
// المستقيمة تصير ’ مطبعية في الصفحة المنشورة — نطبّق نفس التحويل على حالته
// الحاسمة الوحيدة (وسط الكلمة) كي تطابق العبارة النص المنشور حرفياً.
// (حقول body_en تُصيَّر نصاً خاماً بلا smartypants فلا تُمرَّر من هنا.)
const smartify = (s) => s.replace(/(\p{L})'(\p{L})/gu, '$1’$2')

// اختيار العبارة البصمية: أطول جملة ضمن نطاق يصلح للبحث المقتبس (60–180 حرفاً).
// الجمل الطويلة جداً تُقصّ عند حدود الكلمات — تبقى مقتطفاً حرفياً قابلاً للبحث.
// تُستبعد الجمل التي فيها رموز يحوّلها smartypants تحويلاً سياقياً لا يمكن
// التنبؤ به خارج المصيّر (اقتباسات مفردة/مزدوجة متبقية، --، ...).
// الألمانية تكتب الأعداد الترتيبية بنقطة («im 12. Jahrhundert») فلا تُعامَل نقطة
// بعد رقم فاصلَ جملة عندها — القاعدة ألمانية فقط لأن قوائم المدونة المرقّمة
// «1. بند» عناصر <li> مستقلة، وضمّها إلى ما قبلها ينتج عبارة لا وجود لها حرفياً.
function pickPhrase(text, taken, fromMarkdown = false, ordinalDots = false) {
  const sentences = text
    .split(ordinalDots ? /(?<=(?<!\d)[.!؟?…])\s+/ : /(?<=[.!؟?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 60)
    .sort((a, b) => b.length - a.length)
  for (let s of sentences) {
    if (s.length > 180) {
      s = s.slice(0, 180)
      s = s.slice(0, Math.max(s.lastIndexOf(' '), 60)).trim()
    }
    // إزالة علامة الترقيم الختامية — بعض المحركات تتحسس منها في البحث المقتبس
    s = s.replace(/[.!؟?…،,]+$/, '').trim()
    if (fromMarkdown && /['"]|--|\.\.\./.test(s)) continue
    if (s.length >= 60 && !taken.has(s)) { taken.add(s); return s }
  }
  return null
}

// النظير الصيني: الجملة تُفصل على ترقيم CJK (。！？；) لا على مسافة، والنطاق أقصر
// لأن كثافة المعنى في الحرف الصيني أعلى — 20–80 حرفاً تكافئ بحثياً 60–180 حرفاً
// لاتينياً. حقول body_zh تُصيَّر نصاً خاماً داخل <p> واحدة (كالإنجليزية) فلا
// تحويلات smartypants تُخشى، والقصّ عند 80 يبقى مقتطفاً حرفياً لأن الصينية بلا
// حدود كلمات مسافية.
function pickPhraseZh(text, taken) {
  const sentences = text
    .split(/(?<=[。！？；])/u)
    .map((s) => s.trim())
    .filter((s) => s.length >= 20)
    .sort((a, b) => b.length - a.length)
  for (let s of sentences) {
    if (s.length > 80) {
      // القصّ عند آخر فاصلة CJK قبل الحدّ لا وسط اسم لاتيني بين قوسين
      // («格拉（Gerrh» لا يطابق شيئاً في بحث مقتبس) — وإن لم توجد فعند 80
      const cut = s.slice(0, 80)
      const m = cut.search(/[，、：；）][^，、：；）]*$/u)
      s = m >= 20 ? cut.slice(0, m + 1) : cut
    }
    s = s.replace(/[。！？；，、：\s]+$/u, '').trim()
    if (s.length >= 20 && !taken.has(s)) { taken.add(s); return s }
  }
  return null
}

// نفس الاشتقاق في Base.astro (معرّف التعليق المخفي) — تطبيع: فك ترميز النسب
// المئوية للمسارات العربية + إسقاط الشرطة الختامية، كي يتطابق المعرّفان دوماً.
const id = (url) => createHash('sha256').update(`visit-alahsa:${decodeURI(url).replace(/\/$/, '')}`).digest('hex').slice(0, 12)

async function main() {
  const fingerprints = []
  const taken = new Set()
  const push = (entry) => { if (entry.phrase) fingerprints.push(entry) }

  // المعالم: المتن عربي + body_en حقل مفرد في الواجهة الأمامية
  const attractionsDir = join(ROOT, 'src', 'content', 'attractions')
  for (const f of (await readdir(attractionsDir)).filter((f) => f.endsWith('.md')).sort()) {
    const { fm, body } = splitFrontmatter(await readFile(join(attractionsDir, f), 'utf8'))
    const slugAr = fmField(fm, 'slug_ar')
    const slugEn = fmField(fm, 'slug_en')
    const urlAr = `${SITE}/معالم/${slugAr}/`
    const urlEn = `${SITE}/en/attractions/${slugEn}/`
    push({ id: id(urlAr), type: 'attraction', lang: 'ar', title: fmField(fm, 'title'), url: urlAr, phrase: pickPhrase(smartify(plainText(body)), taken, true) })
    const bodyEn = fmField(fm, 'body_en')
    if (bodyEn) push({ id: id(urlEn), type: 'attraction', lang: 'en', title: fmField(fm, 'title_en') || fmField(fm, 'title'), url: urlEn, phrase: pickPhrase(bodyEn.replace(/\s+/g, ' ').trim(), taken) })
    // الصينية: صفحة /zh/ تتولد فقط حين يوجد title_zh (نفس بوابة zh/attractions/[slug].astro)
    const bodyZh = fmField(fm, 'body_zh')
    if (bodyZh && fmField(fm, 'title_zh')) {
      const urlZh = `${SITE}/zh/attractions/${slugEn}/`
      push({ id: id(urlZh), type: 'attraction', lang: 'zh', title: fmField(fm, 'title_zh'), url: urlZh, phrase: pickPhraseZh(bodyZh.replace(/\s+/g, ' ').trim(), taken) })
    }
    // الألمانية: البوابة title_de (نفس de/attractions/[slug].astro)، والمتن body_de
    // يُصيَّر نصاً خاماً داخل <p> واحدة كالإنجليزية — المسار اللاتيني نفسه مع
    // حارس الأعداد الترتيبية.
    const bodyDe = fmField(fm, 'body_de')
    if (bodyDe && fmField(fm, 'title_de')) {
      const urlDe = `${SITE}/de/attractions/${slugEn}/`
      push({ id: id(urlDe), type: 'attraction', lang: 'de', title: fmField(fm, 'title_de'), url: urlDe, phrase: pickPhrase(bodyDe.replace(/\s+/g, ' ').trim(), taken, false, true) })
    }
    // الروسية: البوابة title_ru (نفس ru/attractions/[slug].astro)، والمتن body_ru
    // يُصيَّر نصاً خاماً داخل <p> واحدة كالإنجليزية — المسار اللاتيني نفسه بلا حارس
    // الأعداد الترتيبية: الروسية لا تكتب الترتيبيّ بنقطة كالألمانية.
    const bodyRu = fmField(fm, 'body_ru')
    if (bodyRu && fmField(fm, 'title_ru')) {
      const urlRu = `${SITE}/ru/attractions/${slugEn}/`
      push({ id: id(urlRu), type: 'attraction', lang: 'ru', title: fmField(fm, 'title_ru'), url: urlRu, phrase: pickPhrase(bodyRu.replace(/\s+/g, ' ').trim(), taken) })
    }
  }

  // المنشآت (مطاعم ومقاهٍ): تُبصَّم الصفحة المفردة فقط — أي من عبر متنُها عتبة
  // النشر. من لم يعبرها لا صفحة له فلا شيء يُسرق (docs/قرار-بنية-صفحات-المنشآت.md).
  const diningDir = join(ROOT, 'src', 'content', 'dining')
  const wc = (t) => t.trim().split(/\s+/).filter(Boolean).length
  for (const f of (await readdir(diningDir)).filter((f) => f.endsWith('.md')).sort()) {
    const { fm, body } = splitFrontmatter(await readFile(join(diningDir, f), 'utf8'))
    const blurb = fmField(fm, 'blurb') ?? ''
    const blurbEn = fmField(fm, 'blurb_en') ?? ''
    const bodyAr = (body ?? '').trim()
    const bodyEn = (fmField(fm, 'body_en') ?? '').trim()
    if (wc(bodyAr) >= 80 && bodyAr !== blurb) {
      const url = `${SITE}/مطاعم-ومقاهي/${fmField(fm, 'slug_ar')}/`
      push({ id: id(url), type: 'dining', lang: 'ar', title: fmField(fm, 'name'), url, phrase: pickPhrase(smartify(plainText(bodyAr)), taken, true) })
    }
    if (wc(bodyEn) >= 100 && bodyEn !== blurbEn) {
      const url = `${SITE}/en/restaurants-cafes/${fmField(fm, 'slug_en')}/`
      push({ id: id(url), type: 'dining', lang: 'en', title: fmField(fm, 'name_en'), url, phrase: pickPhrase(bodyEn.replace(/\s+/g, ' ').trim(), taken) })
    }
  }

  // أماكن الإقامة: الفرع نفسه بحرفه — المجموعة نسخة من نموذج dining، فبوابة
  // النشر واحدة والبصمة تُؤخذ للصفحة المفردة وحدها.
  const stayDir = join(ROOT, 'src', 'content', 'stay')
  for (const f of (await readdir(stayDir)).filter((f) => f.endsWith('.md')).sort()) {
    const { fm, body } = splitFrontmatter(await readFile(join(stayDir, f), 'utf8'))
    const blurb = fmField(fm, 'blurb') ?? ''
    const blurbEn = fmField(fm, 'blurb_en') ?? ''
    const bodyAr = (body ?? '').trim()
    const bodyEn = (fmField(fm, 'body_en') ?? '').trim()
    if (wc(bodyAr) >= 80 && bodyAr !== blurb) {
      const url = `${SITE}/إقامة/${fmField(fm, 'slug_ar')}/`
      push({ id: id(url), type: 'stay', lang: 'ar', title: fmField(fm, 'name'), url, phrase: pickPhrase(smartify(plainText(bodyAr)), taken, true) })
    }
    if (wc(bodyEn) >= 100 && bodyEn !== blurbEn) {
      const url = `${SITE}/en/stay/${fmField(fm, 'slug_en')}/`
      push({ id: id(url), type: 'stay', lang: 'en', title: fmField(fm, 'name_en'), url, phrase: pickPhrase(bodyEn.replace(/\s+/g, ' ').trim(), taken) })
    }
  }

  // المدونة: كل لغة ملفها المستقل — المسودات لا تُبصَّم (غير منشورة أصلاً)
  const blogDir = join(ROOT, 'src', 'content', 'blog')
  for (const f of (await readdir(blogDir)).filter((f) => f.endsWith('.md')).sort()) {
    const { fm, body } = splitFrontmatter(await readFile(join(blogDir, f), 'utf8'))
    if (fmField(fm, 'draft') === 'true') continue
    const lang = fmField(fm, 'lang')
    const slug = fmField(fm, 'slug')
    const url = lang === 'ar' ? `${SITE}/مدونة/${slug}/` : `${SITE}/en/blog/${slug}/`
    push({ id: id(url), type: 'blog', lang, title: fmField(fm, 'title'), url, phrase: pickPhrase(smartify(plainText(body)), taken, true), published: fmField(fm, 'pubDate') })
  }

  await mkdir(dirname(OUT), { recursive: true })
  // لا إعادة كتابة إن لم تتغيّر البصمات: كان الطابع generated يتبدّل مع كل
  // بناء فيتّسخ المستودع بتغيير لا معنى له في كل `npm run build`.
  let previous = null
  try { previous = JSON.parse(await readFile(OUT, 'utf8')) } catch { /* أول توليد */ }
  if (previous && JSON.stringify(previous.fingerprints) === JSON.stringify(fingerprints) && previous.site === SITE) {
    console.log(`بصمات بلا تغيير: ${fingerprints.length} — لم يُعَد كتابة ${OUT}`)
    return
  }
  const out = { generated: new Date().toISOString(), site: SITE, count: fingerprints.length, fingerprints }
  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8')
  const n = (lang) => fingerprints.filter((x) => x.lang === lang).length
  console.log(`بصمات مولَّدة: ${fingerprints.length} (عربي: ${n('ar')} | إنجليزي: ${n('en')} | صيني: ${n('zh')} | ألماني: ${n('de')} | روسي: ${n('ru')})`)
  console.log(`المخرج: ${OUT}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
