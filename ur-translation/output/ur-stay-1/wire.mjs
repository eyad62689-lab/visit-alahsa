// node wire.mjs <REPO> — يصل /ur/stay/ و/ur/restaurants-cafes/ في الشجرة: صفحات /ur/ الأربع (الفهرسان وصفحتا
// المنشأة ببوابة body_ur)، وhreflang في نظيرات الفهرسين والخريطة، وروابط الترويسة والتذييل وصفحتي المنشأة وصفحة
// الأكلات ودليل التأشيرات الأوردي. قابل للإعادة: كل استبدال يُطبَّق مرة ويُفشل نفسه إن لم يجد مرساته ولا أثره.
import fs from 'node:fs';
import path from 'node:path';

const [REPO] = process.argv.slice(2);
const P = (r) => path.resolve(REPO, r);
const edit = (rel, pairs) => {
  const raw = fs.readFileSync(P(rel), 'utf8');
  const crlf = raw.includes('\r\n');
  let s = raw.replace(/\r\n/g, '\n');
  for (const [from, to] of pairs) {
    if (s.includes(to)) continue;
    const n = s.split(from).length - 1;
    if (n !== 1) throw new Error(`${rel}: المرساة ${n} مرة: ${from.slice(0, 80)}`);
    s = s.replace(from, () => to);
  }
  fs.writeFileSync(P(rel), crlf ? s.replace(/\n/g, '\r\n') : s);
  console.log('wired', rel);
};
const eolOf = (rel) => (fs.readFileSync(P(rel), 'utf8').includes('\r\n') ? '\r\n' : '\n');
const write = (rel, text, like) => { fs.mkdirSync(path.dirname(P(rel)), { recursive: true }); fs.writeFileSync(P(rel), text.replace(/\n/g, eolOf(like))); console.log('wrote', rel); };

// 1) hreflang في الفهارس الخمسة القائمة لكل قسم، والخريطة
const SEC = [
  { seg: 'stay', ar: '/إقامة/', arDir: 'إقامة', view: 'StayView' },
  { seg: 'restaurants-cafes', ar: '/مطاعم-ومقاهي/', arDir: 'مطاعم-ومقاهي', view: 'DiningView' },
];
for (const { seg, arDir } of SEC) {
  const old = `ru: '/ru/${seg}/' };`, neu = `ru: '/ru/${seg}/', ur: '/ur/${seg}/' };`;
  for (const rel of [`src/pages/${arDir}/index.astro`, `src/pages/en/${seg}/index.astro`, `src/pages/zh/${seg}/index.astro`, `src/pages/de/${seg}/index.astro`, `src/pages/ru/${seg}/index.astro`]) edit(rel, [[old, neu]]);
  edit('src/pages/sitemap.xml.ts', [[`ru: '/ru/${seg}/', lastmod:`, `ru: '/ru/${seg}/', ur: '/ur/${seg}/', lastmod:`]]);
}

// 2) صفحات /ur/
write('src/pages/ur/stay/index.astro', `---
// فهرس أماكن الإقامة الأوردي — كتلة ur في StayView وحقول *_ur للبطاقات من خط ur-translation-pipeline حصراً (ur-stay-1).
import StayView from '../../../components/views/StayView.astro';
const alt = { ar: '/إقامة/', en: '/en/stay/', zh: '/zh/stay/', de: '/de/stay/', ru: '/ru/stay/', ur: '/ur/stay/' };
---
<StayView lang="ur" alt={alt} />
`, 'src/pages/ru/stay/index.astro');
write('src/pages/ur/restaurants-cafes/index.astro', `---
// فهرس المطاعم والمقاهي الأوردي — كتلة ur في DiningView وDISTRICT_NAMES.ur وحقول *_ur للبطاقات من خط
// ur-translation-pipeline حصراً (ur-dining-1، ur-dining-2). صفحات المنشآت تتراجع للإنجليزية حتى تمرّ متونها بالخط.
import DiningView from '../../../components/views/DiningView.astro';
const alt = { ar: '/مطاعم-ومقاهي/', en: '/en/restaurants-cafes/', zh: '/zh/restaurants-cafes/', de: '/de/restaurants-cafes/', ru: '/ru/restaurants-cafes/', ur: '/ur/restaurants-cafes/' };
---
<DiningView lang="ur" alt={alt} />
`, 'src/pages/ru/restaurants-cafes/index.astro');
for (const [seg, coll, alt, view] of [['stay', 'stay', 'stayAlt', 'StayDetailView'], ['restaurants-cafes', 'dining', 'diningAlt', 'DiningDetailView']]) {
  const ru = fs.readFileSync(P(`src/pages/ru/${seg}/[slug].astro`), 'utf8').replace(/\r\n/g, '\n');
  const ur = ru
    .replace(/^---\n\/\/[^\n]*\n\/\/[^\n]*\n/, `---\n// صفحة ${coll === 'stay' ? 'مكان الإقامة' : 'المنشأة'} الأوردية. تُولَّد لمن عبر متنه الإنجليزي العتبة (100 كلمة) وحمل body_ur\n// المعتمد من خط ur-translation-pipeline — البوابة نفسها في ${alt}، والمقطع slug_en مشترك.\n`)
    .replace('!!e.data.body_ru?.trim()', '!!e.data.body_ur?.trim()')
    .replace(`<${view} entry={entry} lang="ru" alt={alt} />`, `<${view} entry={entry} lang="ur" alt={alt} />`);
  if (!ur.includes('body_ur') || !ur.includes('lang="ur"') || /body_ru|lang="ru"/.test(ur)) throw new Error(`[slug] ${seg}: نسخ قالب ru`);
  write(`src/pages/ur/${seg}/[slug].astro`, ur, `src/pages/ru/${seg}/[slug].astro`);
}

// 3) الروابط إلى القسمين من الأوردية
edit('src/components/Header.astro', [
  ["ru ? '/ru/restaurants-cafes/' : '/en/restaurants-cafes/',", "ru ? '/ru/restaurants-cafes/' : ur ? '/ur/restaurants-cafes/' : '/en/restaurants-cafes/',"],
  ["ru ? '/ru/stay/' : '/en/stay/',", "ru ? '/ru/stay/' : ur ? '/ur/stay/' : '/en/stay/',"],
]);
edit('src/components/Footer.astro', [
  ["ru ? '/ru/restaurants-cafes/' : '/en/restaurants-cafes/' },", "ru ? '/ru/restaurants-cafes/' : ur ? '/ur/restaurants-cafes/' : '/en/restaurants-cafes/' },"],
  ["ru ? '/ru/stay/' : '/en/stay/' },", "ru ? '/ru/stay/' : ur ? '/ur/stay/' : '/en/stay/' },"],
]);
for (const [rel, seg] of [['src/components/views/DiningDetailView.astro', 'restaurants-cafes'], ['src/components/views/DiningView.astro', 'restaurants-cafes'], ['src/components/views/StayDetailView.astro', 'stay'], ['src/components/views/StayView.astro', 'stay']]) {
  edit(rel, [[`ru ? '/ru/${seg}/' : '/en/${seg}/';`, `ru ? '/ru/${seg}/' : ur ? '/ur/${seg}/' : '/en/${seg}/';`]]);
}
// عنوان التبويب والوصف من الكتلة الأوردية المعتمدة (title وheroSum) كالصينية والألمانية والروسية، لا الإنجليزية
for (const rel of ['src/components/views/StayView.astro', 'src/components/views/DiningView.astro']) {
  edit(rel, [
    ["  : zh || de || ru ? `${C.title} ${titleSep(lang)} ${t('site.brand')}`", "  : zh || de || ru || ur ? `${C.title} ${titleSep(lang)} ${t('site.brand')}`"],
    ['  : zh || de || ru ? C.heroSum', '  : zh || de || ru || ur ? C.heroSum'],
  ]);
}
edit('src/components/views/FoodView.astro', [[
  "  dineCta: 'یہ پکوان کہاں چکھیں؟ کھانے پینے کی جگہیں دیکھیں ←',\n  dineHref: '/en/restaurants-cafes/',",
  "  dineCta: 'یہ پکوان کہاں چکھیں؟ کھانے پینے کی جگہیں دیکھیں ←',\n  dineHref: '/ur/restaurants-cafes/',",
]]);
{
  const rel = 'src/data/visa-guide.ur.ts';
  const raw = fs.readFileSync(P(rel), 'utf8');
  const n = raw.split('"href": "/en/stay/"').length - 1;
  if (n) { fs.writeFileSync(P(rel), raw.split('"href": "/en/stay/"').join('"href": "/ur/stay/"')); console.log(`wired ${rel} (${n})`); }
}
