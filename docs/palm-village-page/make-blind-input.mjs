import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/* ---- نصُّ الصفحة كما يقرؤه الزائر (ماسحٌ محرفاً محرفاً، كسابقة kafu-definition) ---- */
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const RAW = new Set(['script', 'style', 'svg']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4',
  'tr', 'figcaption', 'blockquote', 'details', 'summary', 'dt', 'dd']);
const visible = (html) => {
  let out = '';
  let i = 0;
  const n = html.length;
  while (i < n) {
    const c = html[i];
    if (c !== '<') { out += c; i++; continue; }
    if (html.startsWith('<!--', i)) {
      const e = html.indexOf('-->', i + 4);
      i = e === -1 ? n : e + 3;
      continue;
    }
    let j = i + 1;
    const closing = html[j] === '/';
    if (closing) j++;
    let name = '';
    while (j < n && /[A-Za-z0-9]/.test(html[j])) name += html[j++];
    name = name.toLowerCase();
    let k = j;
    let q = '';
    while (k < n) {
      const d = html[k];
      if (q) { if (d === q) q = ''; }
      else if (d === '"' || d === "'") q = d;
      else if (d === '>') break;
      k++;
    }
    const tagEnd = k < n ? k + 1 : n;
    if (!closing && RAW.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, tagEnd);
      if (close === -1) { i = n; continue; }
      const ce = html.indexOf('>', close);
      i = ce === -1 ? n : ce + 1;
      continue;
    }
    if (!closing && name === 'iframe') out += '\n[embedded map]\n';
    if (name === 'br' || (closing && BLOCK.has(name))) out += '\n';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

// مدخل القارئ الأعمى لدفعة palm-village-page: صفحة /<lg>/attractions/palm-village/ المبنية بعد تطبيق 05
// (apply.mjs 05) — مقصوصةً من dist: محتوى <main> وسطر نتيجة البحث. لا يمسّ dist ولا المصدر.
//   node docs/palm-village-page/make-blind-input.mjs <lg…>
const HERE = dirname(fileURLToPath(import.meta.url));
let fail = 0;
for (const lg of process.argv.slice(2)) {
  const page = `dist/${lg}/attractions/palm-village/index.html`;
  if (!existsSync(page)) { console.error(`FAIL ${lg}: ${page} missing`); fail++; continue; }
  const html = readFileSync(page, 'utf8');
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
  const desc = visible(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const out = `=================== /${lg}/attractions/palm-village/ ===================\n\n${visible(main)}\n` +
    `\n=================== search-result line of this page ===================\n\n${desc}\n`;
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.txt`, out, 'utf8');
  console.log(`${lg}: ${out.length} chars`);
}
if (fail) process.exit(1);
