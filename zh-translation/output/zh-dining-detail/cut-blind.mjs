// node cut-blind.mjs <batch-dir> — يقصّ نصّ الصفحات الصينية المبنية من dist لمدخل القارئ الأعمى.
// يُفشل نفسه إن لم تبلغ كلُّ سلسلة من سلاسل الدفعة (النهائية المطبَّقة تجريبياً) نصَّ الصفحة.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const dir = process.argv[2];
const pack = JSON.parse(fs.readFileSync(path.join(dir, 'pack.json'), 'utf8'));
const finFile = fs.existsSync(path.join(dir, 'zh-05.json')) ? 'zh-05.json' : null;
const fin = JSON.parse(fs.readFileSync(path.join(dir, finFile), 'utf8')).strings;

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");
function pageText(file) {
  let h = fs.readFileSync(file, 'utf8');
  const m = h.match(/<main[\s\S]*?<\/main>/);
  h = m ? m[0] : h;
  h = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');
  h = h.replace(/<(h1|h2|h3|p|li|dt|dd|div|section|header|footer|nav|a|span)[^>]*>/g, '\n').replace(/<[^>]+>/g, '');
  return decode(h).split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
}

const pages = [];
for (const [k, v] of Object.entries(pack.strings)) {
  if (!k.endsWith('.body')) continue;
  const route = v._meta.coll === 'stay' ? 'stay' : 'restaurants-cafes';
  pages.push({ k, file: `${REPO}/dist/zh/${route}/${v._meta.slug_en}/index.html`, url: `/zh/${route}/${v._meta.slug_en}/` });
}
if (fin['ev.shop']) pages.push({ k: 'ev.shop', file: `${REPO}/dist/zh/events/index.html`, url: '/zh/events/', eventsCard: true });

const errs = [];
let out = '';
let i = 0;
for (const p of pages) {
  if (!fs.existsSync(p.file)) { errs.push(`لا صفحة مبنية: ${p.url}`); continue; }
  let t = pageText(p.file);
  if (p.eventsCard) {
    // بطاقة معرض اللومي وحدها
    const lines = t.split('\n');
    const at = lines.findIndex((l) => l === fin['ev.shop']);
    t = lines.slice(Math.max(0, at - 14), at + 3).join('\n');
  }
  i++;
  out += `\n\n======== 第 ${i} 页 ========\n${t}\n`;
}
// كل سلسلة من سلاسل الدفعة يجب أن تكون في المدخل (فقراتٍ فقراتٍ للمتون)
for (const [k, s] of Object.entries(fin)) {
  if (k === 'dv.kindBakery') continue; // لا مخبز له صفحة مفردة بعد — التسمية تُشحن ولا تُصيَّر (ctx)
  const parts = k === 'dv.sightsH' ? s.split('{district}').filter(Boolean) : s.split(/\n{2,}/);
  for (const part of parts) if (!out.includes(part.trim())) errs.push(`${k}: لم تبلغ المدخل: ${part.trim().slice(0, 40)}`);
}
if (errs.length) { console.error('✗'); for (const e of errs) console.error(' -', e); process.exit(1); }
fs.writeFileSync(path.join(dir, 'blind-input.txt'), out.trim() + '\n');
console.log(`✓ blind-input.txt: ${i} صفحة، ${out.length} محرفاً`);
