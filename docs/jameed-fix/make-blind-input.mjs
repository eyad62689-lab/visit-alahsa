// يولّد مدخل القارئ الأعمى (المرحلة 6) — **مقصوصاً من dist لا من المصدر**:
// يأخذ الصفحاتِ المنشورةَ كما يراها الزائر، ثم يستبدل فيها القيمةَ الحالية بالمقترحة.
// فما يُعرض على القارئ هو الصفحةُ كما ستصير، كاملةً بسياقها — لا خمسةَ أسطرٍ منتزعة.
// لا يمسّ dist ولا المصدر. يُخفق إن لم يجد النصَّ الحالي في الصفحة المنشورة.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));

/* ---- تحويل سطر المصدر إلى القيمة كما تُصيَّر في الصفحة ---- */
const rendered = (line, file) => {
  let s = line.trim();
  if (file.endsWith('.md')) {
    if (s.startsWith('## ')) s = s.slice(3);
    else if (/^\s*a:\s*"/.test(s)) s = JSON.parse(s.replace(/^\s*a:\s*/, ''));
    else if (/^\s*description:\s*"/.test(s)) s = JSON.parse(s.replace(/^\s*description:\s*/, ''));
    s = s.replace(/\*\*(.+?)\*\*/g, '$1');            // التشديد يُصيَّر <strong> فيبقى نصُّه
    s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');    // الروابط تُصيَّر نصَّها
  } else {
    s = s.replace(/^\s*(pre|blurb|[a-zA-Z0-9_]+)\s*:\s*/, '').replace(/,\s*$/, '');
    const q = s[0];
    if (q === "'" || q === '"') {
      s = s.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
  }
  return s;
};

/* ---- نصُّ الصفحة كما يقرؤه الزائر ---- */
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const visible = (html) => {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/(p|div|section|article|li|h1|h2|h3|h4|tr|figcaption|blockquote|details|summary)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  s = s.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return s.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

const slugOf = (base, lg) =>
  readFileSync(`${R}/src/content/blog/${base}-${lg}.md`, 'utf8').match(/^slug:\s*"([^"]+)"/m)[1];

const PAGES = (lg) => [
  { key: 'blog', title: `/${lg}/blog/${slugOf('hasawi-lomi', lg)}/`, path: `${lg}/blog/${slugOf('hasawi-lomi', lg)}/index.html` },
  { key: 'fruits', title: `/${lg}/fruits/`, path: `${lg}/fruits/index.html` },
  { key: 'events', title: `/${lg}/events/hasawi-lomi-exhibition/`, path: `${lg}/events/hasawi-lomi-exhibition/index.html` },
];
const PAGE_OF = { 'hasawi-lomi': 'blog', events: 'events', fruits: 'fruits' };

let hardFail = 0;
for (const lg of ['de', 'zh', 'ru']) {
  const s5 = JSON.parse(readFileSync(`${HERE}/out/${lg}/05.json`, 'utf8'));
  const texts = {};
  for (const pg of PAGES(lg)) {
    const f = `${R}/dist/${pg.path}`;
    if (!existsSync(f)) { console.error(`✗ ${lg}: ${pg.path} غير موجودة`); hardFail++; continue; }
    texts[pg.key] = visible(readFileSync(f, 'utf8'));
  }

  const report = [];
  for (const pos of s5.positions) {
    const base = pos.id.replace(`${lg}-`, '').replace(/-\d+$/, '');
    const key = PAGE_OF[base] || PAGE_OF[base.replace(/-\d+$/, '')];
    const cur = rendered(pos.current, pos.file);
    const pro = rendered(pos.proposed, pos.file);
    if (pos.file.endsWith('.md') && /description:/.test(pos.current.trim())) {
      report.push(`  ~ ${pos.id}: وصفٌ لا يُصيَّر في المتن — خارج نصّ القارئ (بلا تغيير)`);
      continue;
    }
    const t = texts[key];
    if (t === undefined) continue;
    const n = t.split(cur).length - 1;
    if (n !== 1) {
      console.error(`✗ ${lg}/${pos.id}: النصُّ الحالي ورد ${n} مرةً في ${key} — لا استبدالَ آمن`);
      hardFail++; continue;
    }
    texts[key] = t.split(cur).join(pro);
    report.push(`  ✓ ${pos.id}: استُبدل في ${key} (${cur === pro ? 'بلا تغيير' : 'مغيَّر'})`);
  }

  const dir = `${HERE}/out/${lg}`;
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  // مقتطفاتُ نتائج البحث: تُنشر ولا تظهر في الصفحة، فتُعرض كتلةً مستقلةً بلا ذكرِ أنها وسوم
  const snips = PAGES(lg)
    .filter((p) => existsSync(`${R}/dist/${p.path}`))
    .map((p) => {
      const h = readFileSync(`${R}/dist/${p.path}`, 'utf8');
      const m = h.match(/<meta name="description" content="([^"]*)"/);
      return m ? `• ${p.title}\n  ${visible(m[1])}` : null;
    })
    .filter(Boolean)
    .join('\n\n');

  const body = PAGES(lg)
    .filter((p) => texts[p.key] !== undefined)
    .map((p) => `\n=================== ${p.title} ===================\n\n${texts[p.key]}\n`)
    .join('\n') +
    `\n=================== ما يظهر لهذه الصفحات في نتائج البحث ===================\n` +
    `(سطرٌ واحد لكل صفحة، يُقرأ وحده بلا الصفحة)\n\n${snips}\n`;
  writeFileSync(`${dir}/06-blind-input.txt`, body, 'utf8');
  console.log(`\n── ${lg} ──`);
  for (const r of report) console.log(r);
  console.log(`  → out/${lg}/06-blind-input.txt (${body.length} محرفاً، ${PAGES(lg).length} صفحات)`);
}
if (hardFail) { console.error(`\n✗ ${hardFail} إخفاقاً`); process.exit(1); }
console.log('\n✓ تمّ');
