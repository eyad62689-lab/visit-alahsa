// node apply.mjs <REPO> <BATCH_DIR> <file.json> — يكتب نصوص دفعة «خطّط لرحلتك» الأوردية: كتلة ur في
// localize() بـPlanTripView.astro (بعد كتلة ru، بالبنية نفسها) ورأس العمود الأول لجدول المواعيد في tables.ts.
// قابل للإعادة: يزيل كتلة ur السابقة ويكتبها من جديد، ثم يتحقق بقراءة الشجرة أن كل سلسلة وصلت حرفاً.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR, FILE] = process.argv.slice(2);
const pack = JSON.parse(fs.readFileSync(path.join(DIR, 'pack.json'), 'utf8'));
if (pack.lang !== 'ur') throw new Error('دفعة غير أوردية');
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const need = (k) => { if (typeof Z[k] !== 'string' || !Z[k].trim()) throw new Error(`مفتاح ناقص: ${k}`); return Z[k]; };
for (const k of Object.keys(pack.strings)) need(k);
const q = (v) => `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const { readLocalize } = await import(pathToFileURL(path.join(DIR, 'localize-literal.mjs')).href);
const EN = readLocalize(REPO, 'src/components/views/PlanTripView.astro').en;

// 1) كتلة ur
const I = '    ', I2 = '      ';
const lines = [
  '  ur: {',
  `${I}eyebrow: ${q(need('eyebrow'))},`,
  `${I}title: ${q(need('title'))},`,
  `${I}lead: ${q(need('lead'))},`,
  `${I}getThereH: ${q(need('getThereH'))},`,
  `${I}getThere: [`,
  ...EN.getThere.map((g, i) => `${I2}{ icon: ${q(g.icon)}, h: ${q(need(`getThere.${i}.h`))}, d: ${q(need(`getThere.${i}.d`))} },`),
  `${I}],`,
  `${I}practicalH: ${q(need('practicalH'))},`,
  `${I}practical: [`,
  ...EN.practical.map((_, i) => `${I2}{ k: ${q(need(`practical.${i}.k`))}, v: ${q(need(`practical.${i}.v`))} },`),
  `${I}],`,
  `${I}tipsH: ${q(need('tipsH'))},`,
  `${I}tipsLead: ${q(need('tipsLead'))},`,
  `${I}tips: [`,
  ...EN.tips.map((_, i) => `${I2}{ h: ${q(need(`tips.${i}.h`))}, d: ${q(need(`tips.${i}.d`))} },`),
  `${I}],`,
  `${I}faqH: ${q(need('faqH'))},`,
  `${I}faq: [`,
  ...EN.faq.map((_, i) => `${I2}{ q: ${q(need(`faq.${i}.q`))}, a: ${q(need(`faq.${i}.a`))} },`),
  `${I}],`,
  `${I}ctaH: ${q(need('ctaH'))},`,
  `${I}ctaD: ${q(need('ctaD'))},`,
  `${I}ctaBrowse: ${q(need('ctaBrowse'))},`,
  `${I}ctaTrip: ${q(need('ctaTrip'))},`,
  `${I}seoTitle: ${q(need('seoTitle'))},`,
  `${I}seoDesc: ${q(need('seoDesc'))},`,
  '  },',
];
const vPath = path.resolve(REPO, 'src/components/views/PlanTripView.astro');
const raw = fs.readFileSync(vPath, 'utf8');
const crlf = raw.includes('\r\n');
let s = raw.replace(/\r\n/g, '\n');
const start = s.indexOf('const C = localize(lang, {');
const end = s.indexOf('\n});', start);
if (start < 0 || end < 0) throw new Error('كتلة localize');
let body = s.slice(start, end);
const urAt = body.indexOf('\n  ur: {\n');
if (urAt >= 0) body = body.slice(0, urAt); // إعادة التشغيل: كتلة ur آخر الكتل
if (!body.endsWith('\n  },')) throw new Error('آخر كتلة لا تنتهي بـ «  },»');
s = s.slice(0, start) + body + '\n' + lines.join('\n') + s.slice(end);
fs.writeFileSync(vPath, crlf ? s.replace(/\n/g, '\r\n') : s);

// 2) رأس عمود «المعلم» في tables.ts
const tPath = path.resolve(REPO, 'src/lib/tables.ts');
const traw = fs.readFileSync(tPath, 'utf8');
const tcrlf = traw.includes('\r\n');
let t = traw.replace(/\r\n/g, '\n');
const headRe = /(const nameHead = \(\{ ar: 'المعلم', en: 'Attraction', zh: '景点', de: 'Sehenswürdigkeit', ru: 'Достопримечательность')(, ur: '(?:[^'\\]|\\.)*')? \}/;
if (!headRe.test(t)) throw new Error('nameHead في tables.ts');
t = t.replace(headRe, (_, a) => `${a}, ur: ${q(need('table.nameHead'))} }`);
fs.writeFileSync(tPath, tcrlf ? t.replace(/\n/g, '\r\n') : t);

// 3) تحقّق: الكتلة تُقرأ من الشجرة وكل سلسلة فيها حرفاً
const back = readLocalize(REPO, 'src/components/views/PlanTripView.astro').ur;
const flat = {
  eyebrow: back.eyebrow, title: back.title, lead: back.lead, getThereH: back.getThereH, practicalH: back.practicalH,
  tipsH: back.tipsH, tipsLead: back.tipsLead, faqH: back.faqH, ctaH: back.ctaH, ctaD: back.ctaD, ctaBrowse: back.ctaBrowse,
  ctaTrip: back.ctaTrip, seoTitle: back.seoTitle, seoDesc: back.seoDesc,
};
back.getThere.forEach((g, i) => { flat[`getThere.${i}.h`] = g.h; flat[`getThere.${i}.d`] = g.d; });
back.practical.forEach((p, i) => { flat[`practical.${i}.k`] = p.k; flat[`practical.${i}.v`] = p.v; });
back.tips.forEach((p, i) => { flat[`tips.${i}.h`] = p.h; flat[`tips.${i}.d`] = p.d; });
back.faq.forEach((f, i) => { flat[`faq.${i}.q`] = f.q; flat[`faq.${i}.a`] = f.a; });
const bad = Object.keys(pack.strings).filter((k) => k !== 'table.nameHead' && flat[k] !== Z[k]);
if (bad.length) throw new Error(`لم تصل حرفاً: ${bad.join(' ')}`);
console.log(`applied: كتلة ur في PlanTripView (${Object.keys(flat).length} سلسلة) + nameHead في tables.ts`);
