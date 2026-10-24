// بطاقة معرفة المستشار الذكي — خطوة postbuild: تأخذ dist/data/advisor-kb.json (تولّده نقطة النهاية
// src/pages/data/advisor-kb.json.ts من مصادر الحقيقة) وتتحقق منها ثم تنسخها إلى
// netlify/functions/advisor/kb.generated.json حيث تحزمها Netlify مع الدالة (التحزيم بعد أمر البناء).
//
// التحقق — يُفشل البناء لا المراجعة البشرية:
//   1. كل رابط في البطاقة صفحة مبنية فعلاً في dist (index.html موجود) — فلا يحيل المستشار إلى 404.
//   2. لا أرقام عربية-هندية في أي نصّ (قاعدة الموقع C4 تمتد إلى ما يقرؤه النموذج).
//   3. عدد المعالم في البطاقة = عدد ملفات src/content/attractions (لا معلم يسقط بصمت).
//   4. حجم كل لغة تحت سقف الرموز التقريبي (بطاقة أكبر = كلفة أعلى لكل محادثة؛ وHaiku يغيّر
//      شريحة سعره فوق 100 ألف رمز للطلب) — تحذير لا إخفاق، مع طباعة القياس.
//
// التشغيل: node tools/gen-advisor-kb.mjs   (بعد astro build)

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderKb, LANGS } from '../netlify/functions/advisor/core.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'dist', 'data', 'advisor-kb.json')
const OUT = join(ROOT, 'netlify', 'functions', 'advisor', 'kb.generated.json')
const TOKEN_BUDGET = 60_000 // تقدير: ~2.2 محرف لكل رمز في العربية/الأوردو، ~4 في اللاتينية، ~1.2 في الصينية

if (!existsSync(SRC)) { console.error(`✗ لم أجد ${SRC} — شغّل astro build أولاً`); process.exit(1) }
const kb = JSON.parse(readFileSync(SRC, 'utf8'))
const failures = []

// 1. الروابط
const hrefs = new Set()
for (const e of kb.entries) for (const h of Object.values(e.href ?? {})) hrefs.add(h)
for (const h of hrefs) {
  // الرابط قد يحمل مرساة قسم (#sec-dates في صفحة المتاجر): تُفحص الصفحة ما قبل المرساة، والمرساة بصيغتها
  const [page, frag, extra] = h.split('#')
  if (!page.startsWith('/') || !page.endsWith('/') || extra !== undefined || (frag !== undefined && !/^[a-z][a-z0-9-]*$/.test(frag))) { failures.push(`رابط بلا شرطة ختامية أو غير داخلي: ${h}`); continue }
  const file = join(ROOT, 'dist', decodeURI(page), 'index.html')
  if (!existsSync(file)) failures.push(`رابط إلى صفحة غير مبنية: ${h}`)
}

// 2. الأرقام
const ARABIC_INDIC = /[٠-٩۰-۹]/
const walk = (v, path) => {
  if (typeof v === 'string') { if (ARABIC_INDIC.test(v)) failures.push(`رقم غير لاتيني في ${path}: ${v.slice(0, 60)}`) }
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`))
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`)
}
walk(kb.entries, 'entries')

// 3. العدّ
const files = readdirSync(join(ROOT, 'src', 'content', 'attractions')).filter((f) => f.endsWith('.md')).length
const inKb = kb.entries.filter((e) => e.kind === 'attraction').length
if (files !== inKb) failures.push(`المعالم: ${files} ملفاً في المحتوى مقابل ${inKb} في البطاقة`)

// 4. القياس
const CHARS_PER_TOKEN = { zh: 1.2, ar: 2.2, ur: 2.2 } // وسواها لاتينية/سيريلية ≈ 4
const estTokens = (s, lang) => Math.round(s.length / (CHARS_PER_TOKEN[lang] ?? 4))
for (const lang of LANGS) {
  const text = renderKb(kb, lang)
  const t = estTokens(text, lang)
  console.log(`  · ${lang}: ${text.length.toLocaleString('en')} محرفاً ≈ ${t.toLocaleString('en')} رمزاً${t > TOKEN_BUDGET ? ' ⚠ فوق الميزانية' : ''}`)
}

if (failures.length) {
  console.error(`✗ بطاقة المستشار: ${failures.length} إخفاقاً`)
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(kb))
console.log(`✓ بطاقة المستشار: ${kb.entries.length} مدخلاً (${inKb} معلماً) → ${OUT.replace(ROOT, '.')}`)
