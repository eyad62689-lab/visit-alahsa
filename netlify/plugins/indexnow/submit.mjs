// إشعار IndexNow — يدفع الروابط المحدَّثة إلى Bing وYandex وSeznam وNaver
// (وهي البوابة التي تقرأ منها ChatGPT Search وCopilot).
//
// لماذا لا GitHub Action كما اقترحت الدراسة: رمز اعتماد git على جهاز إياد رمز
// OAuth بلا نطاق `workflow`، فأي ملف في `.github/workflows/` يُعطِّل الدفع
// (قرار 2026-08-16 في CLAUDE.md). البديل إضافة Netlify تعمل بعد نجاح النشر.
//
// اختيار الروابط: من `lastmod` في sitemap المبنيّ — وهو مشتقّ أصلاً من تواريخ
// git الحقيقية (src/lib/git-dates.ts). تُدفع الروابط التي تغيّرت منذ آخر نشر
// ناجح (`CACHED_COMMIT_REF`)، فلا يُعاد دفع ما لم يتغيّر.
//
// التشغيل يدوياً للفحص:  node netlify/plugins/indexnow/submit.mjs --dry-run

import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

export const HOST = 'visit-alahsa.com';
export const KEY = 'bfa79848415477bf3b25134e4b45f0a3';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const MAX_URLS = 10000; // سقف IndexNow لكل طلب

/** تاريخ آخر نشر ناجح (YYYY-MM-DD) من التزام Netlify المخزَّن، أو null. */
function lastDeployDate(cwd) {
  const ref = process.env.CACHED_COMMIT_REF;
  if (!ref) return null;
  try {
    const out = execFileSync('git', ['show', '-s', '--format=%cI', ref], {
      cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    });
    return out.trim().slice(0, 10);
  } catch {
    return null;
  }
}

/**
 * يقرأ sitemap المبنيّ ويعيد الروابط التي تغيّرت.
 * بلا مرجع نشرٍ سابق: يُقتصر على روابط تاريخها اليوم — أضيق احتمال وأسلمه،
 * فدفع الخريطة كاملة في كل نشر إزعاجٌ للمحركات بلا فائدة.
 */
export async function pickUrls(distDir, sinceDate) {
  const xml = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)]
    .map((m) => ({ url: m[1], lastmod: m[2] ?? null }));
  const cutoff = sinceDate ?? new Date().toISOString().slice(0, 10);
  const changed = entries.filter((e) => e.lastmod && e.lastmod >= cutoff).map((e) => e.url);
  return { total: entries.length, cutoff, urls: changed.slice(0, MAX_URLS) };
}

export async function submit(urls) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  });
  return { status: res.status, ok: res.ok, body: (await res.text()).slice(0, 300) };
}

/** المنطق كاملاً. يُعيد سطر تقرير — ولا يرمي أبداً: النشر لا يفشل بسبب الفهرسة. */
export async function run({ distDir, cwd, dryRun }) {
  try {
    const since = lastDeployDate(cwd);
    const { total, cutoff, urls } = await pickUrls(distDir, since);
    const basis = since ? `منذ آخر نشر (${cutoff})` : `تاريخ اليوم (${cutoff}) — لا مرجع نشرٍ سابق`;
    if (urls.length === 0) return `IndexNow: لا رابط تغيّر ${basis} من أصل ${total} — لا إشعار.`;
    if (dryRun) return `IndexNow [تجربة]: ${urls.length} رابطاً من ${total} ${basis}.\n  ${urls.slice(0, 5).join('\n  ')}${urls.length > 5 ? `\n  … و${urls.length - 5} غيرها` : ''}`;
    const r = await submit(urls);
    return r.ok
      ? `IndexNow: أُشعِر بـ${urls.length} رابطاً ${basis} (HTTP ${r.status}).`
      : `IndexNow: رُفض الإشعار (HTTP ${r.status}) — ${r.body}`;
  } catch (e) {
    return `IndexNow: تعذّر الإشعار — ${e.message}`;
  }
}

// تشغيل مباشر من سطر الأوامر. الحارس يحتمل غياب argv[1] كلياً — يكون كذلك حين
// تستورد الوحدةَ إضافةُ Netlify أو `node -e`، وبلا الحارس ينهار الاستيراد نفسه.
if (process.argv[1]?.endsWith('submit.mjs')) {
  const dryRun = process.argv.includes('--dry-run');
  const cwd = process.cwd();
  run({ distDir: path.join(cwd, 'dist'), cwd, dryRun }).then((msg) => console.log(msg));
}
