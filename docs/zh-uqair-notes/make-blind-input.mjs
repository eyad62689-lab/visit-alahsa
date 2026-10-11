// مدخل القارئ الأعمى (المرحلة 6) لدفعة mosque-visit-times: مقصوص من dist لا من المصدر.
// صفحات المساجد الاثني عشر ومقالا 24/48 ساعة بلغة واحدة، مستبدَلاً فيها المقترح بالحالي:
// صفوف البطاقة بقيمة لغتها (label/value)، وأسطر FAQ والمدونة بنصّها المُصيَّر.
//   node docs/mosque-visit-fix/make-blind-input.mjs <جذر الشجرة> <lang>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const R = process.argv[2] || '.';
const lg = process.argv[3];
const HERE = new URL('.', import.meta.url);
if (!['de', 'ru', 'zh'].includes(lg)) throw new Error('اللغة: de|ru|zh');

const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const RAW = new Set(['script', 'style', 'svg']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4', 'tr', 'figcaption', 'blockquote', 'details', 'summary', 'dt', 'dd']);
const visible = (html) => {
  let out = '';
  let i = 0;
  const n = html.length;
  while (i < n) {
    const c = html[i];
    if (c !== '<') { out += c; i++; continue; }
    if (html.startsWith('<!--', i)) { const e = html.indexOf('-->', i + 4); i = e === -1 ? n : e + 3; continue; }
    let j = i + 1;
    const closing = html[j] === '/';
    if (closing) j++;
    let name = '';
    while (j < n && /[A-Za-z0-9]/.test(html[j])) name += html[j++];
    name = name.toLowerCase();
    let k = j;
    let q = '';
    while (k < n) { const d = html[k]; if (q) { if (d === q) q = ''; } else if (d === '"' || d === "'") q = d; else if (d === '>') break; k++; }
    const tagEnd = k < n ? k + 1 : n;
    if (!closing && RAW.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, tagEnd);
      if (close === -1) { i = n; continue; }
      const ce = html.indexOf('>', close); i = ce === -1 ? n : ce + 1; continue;
    }
    if (name === 'br' || (closing && BLOCK.has(name))) out += '\n';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};
const field = (line, key) => line.match(new RegExp(`(?:^|[{,\\s])${key}: "([^"]*)"`))?.[1];
const mdText = (s) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/(\p{L})'(\p{L})/gu, '$1’$2').replace(/^- /, '');

const { positions } = JSON.parse(readFileSync(new URL('./out/05.json', HERE), 'utf8'));
const slugOf = (b) => readFileSync(`${R}/src/content/blog/${b}-${lg}.md`, 'utf8').match(/^slug:\s*"([^"]+)"/m)[1];
const pathOf = (file) => {
  const m = file.match(/attractions\/(.+)\.md$/);
  if (m) {
    const slug = readFileSync(`${R}/${file}`, 'utf8').match(/^slug_en:\s*"([^"]+)"/m)?.[1] ?? m[1];
    return `${lg}/attractions/${slug}/index.html`;
  }
  const b = file.match(/blog\/(24-hours|48-hours|worth-visiting)-/)[1];
  return `${lg}/blog/${slugOf(b)}/index.html`;
};

// أسئلة FAQ: في zh/ru لا تُعرض في المتن، بل في FAQPage JSON-LD (مقتطفات نتائج البحث) — تُلحق بالصفحة كتلةً
const faqOf = (html) => {
  // JSON-LD قد يُضمَّن سلسلةً مُرمَّزة (علامات تنصيص مهرَّبة): يُفكّ الترميز حتى يصير كائناً
  const out = [];
  const walk = (v) => {
    if (typeof v === 'string') { try { walk(JSON.parse(v)); } catch { /* نص عادي */ } return; }
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (v && typeof v === 'object') {
      if (v['@type'] === 'FAQPage') for (const q of v.mainEntity ?? []) out.push(`س: ${q.name}\nج: ${q.acceptedAnswer?.text ?? ''}`);
      Object.values(v).forEach(walk);
    }
  };
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try { walk(JSON.parse(m[1])); } catch { /* تجاهل */ }
  }
  return out.join('\n\n');
};
const pages = new Map();
let fail = 0;
for (const p of positions) {
  const path = pathOf(p.file);
  if (!pages.has(path)) {
    const f = `${R}/dist/${path}`;
    if (!existsSync(f)) { console.error(`✗ ${path} غير موجودة`); fail++; continue; }
    const html = readFileSync(f, 'utf8');
    const faq = faqOf(html);
    pages.set(path, visible(html) + (faq ? `\n\n--- أسئلة وأجوبة كما تظهر في نتائج البحث ---\n${faq}` : ''));
  }
  let t = pages.get(path);
  const pairs = [];
  if (/^\w+_zh:\s/.test(p.current)) {
    // حقل ترويسة نصّي (body_zh/summary_zh) — مقتبس أو بلا علامات تنصيص في YAML: قيمته كما تُصيَّر
    const val = (s) => { const v = s.replace(/^\w+_zh:\s*/, ''); return v.startsWith('"') ? JSON.parse(v) : v; };
    pairs.push([val(p.current), val(p.proposed)]);
  } else if (/^ {2}- \{ label:/.test(p.current)) {
    // البطاقة تُصيَّر dt ثم dd في سطرين: يُستبدل الزوج متجاوراً — التسمية وحدها قصيرة فتصيب غير موضعها
    const la = field(p.current, `label_${lg}`); const lb = field(p.proposed, `label_${lg}`);
    const va = field(p.current, `value_${lg}`); const vb = field(p.proposed, `value_${lg}`);
    if (la !== undefined && va !== undefined) pairs.push([`${la}\n${va}`, `${lb ?? la}\n${vb ?? va}`]);
  } else if (/^ {4}[qa]_/.test(p.current)) {
    pairs.push([JSON.parse(p.current.replace(/^ {4}[qa]_\w+:\s*/, '')), JSON.parse(p.proposed.replace(/^ {4}[qa]_\w+:\s*/, ''))]);
  } else {
    pairs.push([mdText(p.current), mdText(p.proposed)]);
  }
  for (const [a, b] of pairs) {
    const n = t.split(a).length - 1;
    if (n < 1) { console.error(`✗ ${p.id}: «${a.slice(0, 50)}» غير موجود في ${path}`); fail++; continue; }
    t = t.split(a).join(b);
  }
  pages.set(path, t);
}
const body = [...pages].map(([p, t]) => `\n=================== /${p.replace(/index\.html$/, '')} ===================\n\n${t}\n`).join('\n');
writeFileSync(new URL('./out/06-blind-input.txt', HERE), body, 'utf8');
console.log(`${lg}: ${pages.size} صفحة، ${body.length} محرفاً`);
if (fail) { console.error(`✗ ${fail}`); process.exit(1); }
