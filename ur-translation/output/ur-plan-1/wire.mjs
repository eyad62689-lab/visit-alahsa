// node wire.mjs <REPO> — يصل /ur/plan-your-trip/ في الشجرة قبل التطبيق: الصفحة، وhreflang في نظيراتها
// الخمس والخريطة، وروابط الترويسة والتذييل والفعاليات والرئيسية الأوردية، ونمط رأس عمود «اوقات».
// قابل للإعادة: كل استبدال يُطبَّق مرة واحدة ويُفشل نفسه إن لم يجد مرساته ولم يجد أثره.
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
    if (n !== 1) throw new Error(`${rel}: المرساة ${n} مرة: ${from.slice(0, 70)}`);
    s = s.replace(from, () => to);
  }
  fs.writeFileSync(P(rel), crlf ? s.replace(/\n/g, '\r\n') : s);
  console.log('wired', rel);
};

const ALT_OLD = "ru: '/ru/plan-your-trip/' };";
const ALT_NEW = "ru: '/ru/plan-your-trip/', ur: '/ur/plan-your-trip/' };";
for (const rel of ['src/pages/خطط/index.astro', 'src/pages/en/plan-your-trip/index.astro', 'src/pages/zh/plan-your-trip/index.astro', 'src/pages/de/plan-your-trip/index.astro', 'src/pages/ru/plan-your-trip/index.astro']) edit(rel, [[ALT_OLD, ALT_NEW]]);

const page = `---
// صفحة «خطّط لرحلتك» الأوردية — كتلة ur في PlanTripView من خط ur-translation-pipeline حصراً (ur-plan-1).
import PlanTripView from '../../../components/views/PlanTripView.astro';
const alt = { ar: '/خطط/', en: '/en/plan-your-trip/', zh: '/zh/plan-your-trip/', de: '/de/plan-your-trip/', ru: '/ru/plan-your-trip/', ur: '/ur/plan-your-trip/' };
---
<PlanTripView lang="ur" alt={alt} />
`;
fs.mkdirSync(P('src/pages/ur/plan-your-trip'), { recursive: true });
const ruEol = fs.readFileSync(P('src/pages/ru/plan-your-trip/index.astro'), 'utf8').includes('\r\n') ? '\r\n' : '\n';
fs.writeFileSync(P('src/pages/ur/plan-your-trip/index.astro'), page.replace(/\n/g, ruEol));
console.log('wrote src/pages/ur/plan-your-trip/index.astro');

edit('src/pages/sitemap.xml.ts', [["ru: '/ru/plan-your-trip/', lastmod: dateOf(`${V}PlanTripView.astro`) },", "ru: '/ru/plan-your-trip/', ur: '/ur/plan-your-trip/', lastmod: dateOf(`${V}PlanTripView.astro`) },"]]);
const LINK_OLD = "ru ? '/ru/plan-your-trip/' : '/en/plan-your-trip/'";
const LINK_NEW = "ru ? '/ru/plan-your-trip/' : ur ? '/ur/plan-your-trip/' : '/en/plan-your-trip/'";
for (const rel of ['src/components/Footer.astro', 'src/components/Header.astro', 'src/components/views/EventsView.astro']) edit(rel, [[LINK_OLD, LINK_NEW]]);
edit('src/data/home-copy.ts', [["map: '/ur/map/', plan: '/en/plan-your-trip/'", "map: '/ur/map/', plan: '/ur/plan-your-trip/'"]]);
edit('src/data/events.ts', [["{ label: 'الاحساء کے سفر کا منصوبہ بنائیں', href: '/en/plan-your-trip/' }", "{ label: 'الاحساء کے سفر کا منصوبہ بنائیں', href: '/ur/plan-your-trip/' }"]]);
// دليل التأشيرات: الزرّ في «خطّط» والتذييل يقصدان نسخة اللغة متى بُنيت (كانت الإنجليزية لكل لغة غير العربية)،
// والدليل الأوردي يرجع إلى «خطّط» الأوردية لا الإنجليزية.
edit('src/lib/visa-guide.mjs', [[
  "export const visaHref = (lang) => (lang === 'ar' ? VISA_GUIDE_ALT.ar : VISA_GUIDE_ALT.en);",
  "export const visaHref = (lang) => String((VISA_LANGS.includes(lang) && VISA_GUIDE_ALT[lang]) || VISA_GUIDE_ALT.en);",
]]);
edit('src/components/views/VisaGuideView.astro', [[
  "// «خطّط لرحلتك» غير مبنية بالأوردو بعد، فمسار الفتات يتراجع للإنجليزية (builtLang)\nconst planPath = lang === 'ar' ? '/خطط/' : `/${builtLang(lang)}/plan-your-trip/`;",
  "// «خطّط لرحلتك» مبنية بلغات الدليل الست (الأوردية منذ ur-plan-1)\nconst planPath = lang === 'ar' ? '/خطط/' : `/${lang}/plan-your-trip/`;",
]]);
{
  const rel = 'src/components/views/VisaGuideView.astro';
  const raw = fs.readFileSync(P(rel), 'utf8');
  const out = raw.replace(/import \{ builtLang \} from '\.\.\/\.\.\/lib\/routes';\r?\n/, '');
  if (out !== raw) { if (/builtLang/.test(out)) throw new Error(`${rel}: builtLang ما زال مستعملاً`); fs.writeFileSync(P(rel), out); console.log(`wired ${rel} (builtLang import)`); }
}
{
  const rel = 'src/data/visa-guide.ur.ts';
  const raw = fs.readFileSync(P(rel), 'utf8');
  const n = raw.split('"href": "/en/plan-your-trip/').length - 1;
  if (n) { fs.writeFileSync(P(rel), raw.split('"href": "/en/plan-your-trip/').join('"href": "/ur/plan-your-trip/')); console.log(`wired ${rel} (${n})`); }
}
edit('src/lib/tables.ts', [[
  "/^(المواعيد|Hours|开放时间|Öffnungszeiten|Часы работы)$/",
  "/^(المواعيد|Hours|开放时间|Öffnungszeiten|Часы работы|اوقات)$/",
], [
  "  // لا رأس عمود أوردياً معتمداً بعد (ولا «اوقات» في نمط hoursHead أعلاه): الجدول لا يُبنى بالأوردو\n  // حتى تمرّ رؤوسه بخط ur-translation-pipeline — قاعدة رأس الملف.\n",
  "  // رأسا «اوقات» و«فیس» الأورديان من تسميات البنود المعتمدة نفسها، ورأس العمود الأول من دفعة ur-plan-1.\n",
]]);
