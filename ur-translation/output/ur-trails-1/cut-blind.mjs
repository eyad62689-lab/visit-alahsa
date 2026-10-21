// node cut-blind.mjs <REPO> <BATCH_DIR> <file.json> — يقصّ نصّ صفحات المسارات الأوردية المبنية (الفهرس والصفحات الخمس)
// لمدخل القارئ الأعمى، بترتيب العرض، مع وصف الصفحة وتسميات قارئ الشاشة. يُفشل نفسه إن غابت سلسلة من الدفعة.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const fin = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const T = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/trails.json'), 'utf8'));
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&#34;': '"' };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27|#34);/g, (e) => ENT[e]);
const strip = (s, re, sep = '') => { let p; do { p = s; s = s.replace(re, sep); } while (s !== p); return s; };
const cut = (rel) => {
  const h = fs.readFileSync(path.join(REPO, 'dist', rel), 'utf8');
  const title = decode(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const main = h.match(/<main[\s\S]*?<\/main>/)[0];
  const attrs = [...main.matchAll(/aria-label="([^"]+)"/g)].map((m) => `[aria-label] ${decode(m[1])}`);
  let body = strip(strip(main, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi), /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
  body = strip(strip(body, /<(h1|h2|h3|h4|p|li|div|section|header|nav|span|button|a|dt|dd|figcaption|small|strong)[^>]*>/gi, '\n'), /<[^>]*>/g);
  const lines = decode(body).split('\n').map((l) => l.trim()).filter(Boolean);
  return `# صفحہ: ${title}\n[تفصیل] ${desc}\n\n${lines.join('\n')}\n${attrs.length ? '\n' + attrs.join('\n') + '\n' : ''}`;
};
let out = cut('ur/trails/index.html');
for (const t of [...T.trails].sort((a, b) => a.order - b.order)) out += '\n\n' + cut(`ur/trails/${t.slug}/index.html`);
// السلسلة المركّبة (seoDesc) تُفحص بعد تعويض نائبيها كما تظهر
const titles = [...T.trails].sort((a, b) => a.order - b.order).map((t) => fin[`trails.${t.slug}.title`]);
const expanded = { ...fin, seoDesc: fin.seoDesc.replace('{n}', String(titles.length)).replace('{titles}', titles.join(fin.listSep)) };
const missing = Object.entries(expanded).filter(([k, v]) => k !== 'listSep' && !out.includes(v)).map(([k]) => k);
if (missing.length) { console.error('✗ سلاسل لم تبلغ المقصوص:', missing.join(' ')); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'blind-input.txt'), out);
console.log(`✓ blind-input.txt: ${out.length} حرفاً، كل السلاسل الـ${Object.keys(fin).length} حاضرة`);
