// سحب تقارير حماية المحتوى الأسبوعية من Netlify Blobs إلى مجلد reports/ محلياً.
//
// الدالة المجدولة theft-scan تعمل في بيئة معزولة ولا تستطيع الكتابة في
// المستودع، فتكتب التقارير في Blobs (store: theft-reports) — هذا السكربت
// ينزّلها ملفات Markdown في reports/ للاطلاع أو الإيداع في git.
//
// يتطلب متغيري بيئة (محلياً فقط — لا يعملان في المتصفح ولا يُودَعان في الكود):
//   NETLIFY_SITE_ID     — من لوحة Netlify: Site configuration → Site ID
//   NETLIFY_AUTH_TOKEN  — من User settings → Applications → Personal access tokens
//
// التشغيل: npm run pull:reports

import { getStore } from '@netlify/blobs'
import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'reports')

const siteID = process.env.NETLIFY_SITE_ID
const token = process.env.NETLIFY_AUTH_TOKEN
if (!siteID || !token) {
  console.error('يلزم ضبط NETLIFY_SITE_ID وNETLIFY_AUTH_TOKEN — راجع التعليق أعلى هذا الملف.')
  process.exit(1)
}

const store = getStore({ name: 'theft-reports', siteID, token })
const { blobs } = await store.list()
if (!blobs.length) { console.log('لا تقارير بعد — أول تقرير يصدر بعد أول تشغيل أسبوعي لدالة theft-scan.'); process.exit(0) }

await mkdir(OUT, { recursive: true })
for (const b of blobs) {
  const content = await store.get(b.key)
  await writeFile(join(OUT, b.key.replace(/\//g, '-')), content, 'utf8')
  console.log(`⬇ reports/${b.key.replace(/\//g, '-')}`)
}
console.log(`اكتمل: ${blobs.length} تقريراً في مجلد reports/`)
