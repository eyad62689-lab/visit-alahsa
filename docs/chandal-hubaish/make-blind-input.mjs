// (نسخة دفعة chandal-hubaish: صفحة الحبيش وحدها) يولّد مدخل القارئ الأعمى (المرحلة 6) مقصوصاً من dist لا من المصدر، على سابقة
// docs/jameed-fix/make-blind-input.mjs: الصفحات المنشورة كما يراها الزائر، مستبدَلاً فيها
// المقترحُ بالحالي. لا يمسّ dist ولا المصدر، ويُخفق إن لم يجد النصَّ الحالي مرةً واحدة.
//   node docs/towers-fix/make-blind-input.mjs <جذر الشجرة> [lang...]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const LANGS = process.argv.slice(3).length ? process.argv.slice(3) : ['de', 'ru'];
const HERE = dirname(fileURLToPath(import.meta.url));

/* ---- سطر المصدر كما يُصيَّر ---- */
const rendered = (line, file) => {
  let s = line.trim();
  if (file.endsWith('.md')) {
    const fm = s.match(/^[a-z_]+:\s*(".*")$/);
    if (fm) s = JSON.parse(fm[1]);
    s = s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    if (!fm) s = s.replace(/(\p{L})'(\p{L})/gu, '$1’$2'); // smartypants في متن الماركداون
  } else {
    s = s.replace(/^'[^']+':\s*/, '').replace(/,\s*$/, '');
    s = s.slice(1, -1).replace(/\\'/g, "'");
  }
  return s;
};

/* ---- نصّ الصفحة المرئي: ماسح محرفاً محرفاً (لا تعبير نمطي على الوسوم) ---- */
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const RAW = new Set(['script', 'style', 'svg']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4',
  'tr', 'figcaption', 'blockquote', 'details', 'summary']);
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
    if (name === 'br' || (closing && BLOCK.has(name))) out += '\n';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

const slugOf = (base, lg) =>
  readFileSync(`${R}/src/content/blog/${base}-${lg}.md`, 'utf8').match(/^slug:\s*"([^"]+)"/m)[1];

const PAGES = (lg) => [
  { key: 'attraction', path: `${lg}/attractions/hubaish/index.html` },
];
const pageOf = (file) =>
  file.endsWith('ui.ts') ? 'home'
    : file.includes('attractions/') ? 'attraction'
      : file.match(/blog\/(24-hours|48-hours|worth-visiting)-/)[1];

let hardFail = 0;
for (const lg of LANGS) {
  const s5 = JSON.parse(readFileSync(`${HERE}/out/${lg}/05.json`, 'utf8'));
  const texts = {};
  const metas = {};
  for (const pg of PAGES(lg)) {
    const f = `${R}/dist/${pg.path}`;
    if (!existsSync(f)) { console.error(`✗ ${lg}: ${pg.path} غير موجودة`); hardFail++; continue; }
    const h = readFileSync(f, 'utf8');
    texts[pg.key] = visible(h);
    const m = h.match(/<meta name="description" content="([^"]*)"/);
    metas[pg.key] = m ? visible(m[1]) : '';
  }
  const report = [];
  for (const pos of s5.positions ?? s5.sites) {
    pos.id ??= `${lg}-${pageOf(pos.file)}`;
    const key = pageOf(pos.file);
    const cur = rendered(pos.current, pos.file);
    const pro = rendered(pos.proposed, pos.file);
    const t = texts[key];
    if (t === undefined) continue;
    const n = t.split(cur).length - 1;
    const inMeta = metas[key] === cur;
    if (n > 1 || (n === 0 && !inMeta)) {
      console.error(`✗ ${lg}/${pos.id}: النص الحالي ورد ${n} مرة في ${key} (وفي الوصف: ${inMeta}) — لا استبدال آمن`);
      hardFail++; continue;
    }
    if (n === 1) texts[key] = t.split(cur).join(pro);
    if (inMeta) metas[key] = pro;
    report.push(`  ✓ ${pos.id}: ${key} — المتن ${n}، الوصف ${inMeta ? 1 : 0} (${cur === pro ? 'بلا تغيير' : 'مغيَّر'})`);
  }
  const body = PAGES(lg)
    .filter((p) => texts[p.key] !== undefined)
    .map((p) => `\n=================== /${p.path.replace(/index\.html$/, '')} ===================\n\n${texts[p.key]}\n`)
    .join('\n') +
    `\n=================== ما يظهر لهذه الصفحات في نتائج البحث ===================\n` +
    `(سطر واحد لكل صفحة، يُقرأ وحده بلا الصفحة)\n\n` +
    PAGES(lg).filter((p) => metas[p.key]).map((p) => `• /${p.path.replace(/index\.html$/, '')}\n  ${metas[p.key]}`).join('\n\n') + '\n';
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.txt`, body, 'utf8');
  console.log(`\n── ${lg} ──`);
  for (const r of report) console.log(r);
  console.log(`  → out/${lg}/06-blind-input.txt (${body.length} محرفاً)`);
}
if (hardFail) { console.error(`\n✗ ${hardFail} إخفاقاً`); process.exit(1); }
console.log('\n✓ تمّ');
