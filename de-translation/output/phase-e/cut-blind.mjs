// node cut-blind.mjs <lang> — يقصّ من dist مدخلَي القارئ الأعمى للغة: صفحات الدفعة ui، والصفحة القانونية كاملة
// (مدخلٌ واحد تتشاركه دفعات legal الثلاث). يُفشل نفسه إن لم تبلغ كلُّ سلسلة مطبَّقة نصَّ المدخل.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const Z = path.dirname(new URL(import.meta.url).pathname);
const lang = process.argv[2];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&#34;/g, '"');
function text(url) {
  let h = fs.readFileSync(`${REPO}/dist${url}index.html`, 'utf8');
  const title = decode(h.match(/<title>([^<]*)/)?.[1] ?? '');
  const desc = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const m = h.match(/<main[\s\S]*?<\/main>/);
  h = (m ? m[0] : h).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');
  const attrs = [...h.matchAll(/(?:placeholder|aria-label)="([^"]{2,})"/g)].map((x) => `[${decode(x[1])}]`);
  h = h.replace(/<(h1|h2|h3|p|li|dt|dd|div|section|header|footer|nav|a|span|label|button|option)[^>]*>/g, '\n').replace(/<[^>]+>/g, '');
  const body = decode(h).split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
  return `（页面标题）${title}\n（搜索结果摘要）${desc}\n${body}\n${attrs.length ? '（输入框提示与按钮说明）\n' + attrs.join('\n') : ''}`;
}
const labels = { zh: ['页面标题', '搜索结果摘要', '输入框提示与按钮说明', '地图上出现的按钮与提示'], de: ['Seitentitel', 'Beschreibung in Suchergebnissen', 'Platzhalter und Schaltflächenbeschriftungen', 'Schaltflächen und Hinweise auf der Karte'], ru: ['Заголовок страницы', 'Описание в результатах поиска', 'Подсказки в полях и подписи кнопок', 'Кнопки и подсказки на карте'] }[lang];
const loc = (s) => s.replace('页面标题', labels[0]).replace('搜索结果摘要', labels[1]).replace('输入框提示与按钮说明', labels[2]);

function cut(batch, urls, extraKeys = []) {
  const fin = JSON.parse(fs.readFileSync(path.join(Z, `${lang}-${batch}`, `${lang}-05.json`), 'utf8')).strings;
  let out = urls.map((u, i) => `\n\n======== ${i + 1} ========\n${loc(text(u))}`).join('');
  if (extraKeys.length) out += `\n\n======== ${labels[3]} ========\n` + extraKeys.map((k) => fin[k]).join('\n');
  return { out, fin };
}
const errs = [];
const norm = (s) => s.replace(/\s+/g, ' ');
function check(out, fin, keys) {
  const o = norm(out);
  for (const k of keys) {
    let s = fin[k];
    if (k === 'unesco.lead' || k === 'unesco.seoDesc') s = s.split(/\{count\}|\{names\}/).filter((x) => x.trim().length > 3).join('\u0000');
    for (const part of norm(s).split('\u0000')) if (!o.includes(part.trim())) errs.push(`${k}: لم تبلغ المدخل: ${part.trim().slice(0, 50)}`);
  }
}
// ui
{
  const js = ['tmap.loading', 'tmap.3d.on', 'tmap.3d.off', 'tmap.gest.win', 'tmap.gest.mac', 'tmap.gest.touch'];
  const { out, fin } = cut('ui', [`/${lang}/terrain-map/`, `/${lang}/unesco/`, `/${lang}/report/`, `/${lang}/report/thanks/`], js);
  check(out, fin, Object.keys(fin));
  fs.writeFileSync(path.join(Z, `${lang}-ui`, 'blind-input.txt'), out.trim() + '\n');
  console.log(`${lang}-ui: ${out.length} محرفاً`);
}
// legal (الصفحة كاملة، لكل دفعاتها)
{
  const { out } = cut('legal-1', [`/${lang}/legal/`]);
  for (const b of ['legal-1', 'legal-2', 'legal-3']) {
    const fin = JSON.parse(fs.readFileSync(path.join(Z, `${lang}-${b}`, `${lang}-05.json`), 'utf8')).strings;
    check(out, fin, Object.keys(fin).filter((k) => !/\.n$/.test(k))); // الترتيبي يُطبع «<n>:» ملتصقاً بالعنوان — يُفحص معه
    fs.writeFileSync(path.join(Z, `${lang}-${b}`, 'blind-input.txt'), out.trim() + '\n');
  }
  console.log(`${lang}-legal: ${out.length} محرفاً (مدخلٌ واحد للدفعات الثلاث)`);
}
if (errs.length) { console.error('✗'); for (const e of errs.slice(0, 30)) console.error(' -', e); process.exit(1); }
console.log('✓');
