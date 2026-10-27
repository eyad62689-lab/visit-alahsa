// حلقة الكسر لحارسَي الخليج العربي (C76 لـzh/de/ru/tr، وC59 للأوردية): تُكسر نسخ صفحات dist في الذاكرة لا المصدر.
//   node docs/gulf-unify-1027/break-test.mjs <root>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { checkGulfName } from '../../tools/check-gulf-name.mjs';
import { checkUrRound1Rulings } from '../../tools/check-ur-text.mjs';

const R = process.argv[2] || '.';
const list = (d, acc = []) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) list(p, acc); else if (f.endsWith('.html')) acc.push(p); } return acc; };
const load = (lg) => list(join(R, 'dist', lg)).map((f) => ({ rel: relative(join(R, 'dist'), f).split('\\').join('/'), lang: lg, html: readFileSync(f, 'utf8') }));
const pages = ['zh', 'de', 'ru'].flatMap(load);
const ur = load('ur');
const tb = JSON.parse(readFileSync(join(R, 'ur-translation/glossary/termbase.json'), 'utf8'));
const urGulf = (ps) => checkUrRound1Rulings(ps, tb).find((r) => r.id === 'P5').problems.length;

const base = checkGulfName(pages).problems.length, baseUr = urGulf(ur);
console.log(`clean: C76 ${base} problems (mentions ${checkGulfName(pages).stats.mentions}), C59 ${baseUr}`);
let ok = base === 0 && baseUr === 0;
// كل حقنة تُطبَّق على أول صفحة تحمل النصّ المستهدف، ويجب أن ترفع عدد المشكلات
const inject = (set, lg, from, to, run) => {
  const i = set.findIndex((p) => p.lang === lg && p.html.includes(from));
  if (i < 0) { console.log(`  ? ${lg} «${from}» not found`); ok = false; return; }
  const copy = set.map((p, j) => (j === i ? { ...p, html: p.html.replace(from, to) } : p));
  const caught = run(copy) > 0;
  console.log(`  ${caught ? 'caught' : 'MISSED'} ${lg}: «${from}» → «${to}» (${set[i].rel})`);
  ok &&= caught;
};
const c76 = (ps) => checkGulfName(ps).problems.length;
inject(pages, 'zh', '阿拉伯湾', '海湾', c76);
inject(pages, 'zh', '阿拉伯湾', '波斯湾', c76);
inject(pages, 'de', 'Arabischen Golf', 'Golf', c76);
inject(pages, 'de', 'Arabischen Golf', 'Persischen Golf', c76);
inject(pages, 'de', 'des Arabischen Golfs', 'der Golfregion', c76);
inject(pages, 'ru', 'Арабского залива', 'Залива', c76);
inject(pages, 'ru', 'Арабского залива', 'Персидского залива', c76);
inject(ur, 'ur', 'خلیج عرب', 'خلیج', urGulf);
inject(ur, 'ur', 'خلیج عرب', 'خلیج فارس', urGulf);
inject(ur, 'ur', 'خلیج عرب کے خطے', 'خلیجی خطے', urGulf);
// المستثنى لا يُمسك: علم الشارع ومجلس التعاون
const keepZh = pages.some((p) => p.html.includes('海湾路')) && base === 0;
console.log(`  exceptions pass clean: 海湾路 ${keepZh ? 'yes' : 'NO'}`);
ok &&= keepZh;
// الحارس ليس فارغاً: إزالة الاسم الموصوف من كل صفحات لغة تُمسك
const emptied = pages.map((p) => (p.lang === 'de' ? { ...p, html: p.html.split('Golf').join('Meer') } : p));
const caughtEmpty = checkGulfName(emptied).problems.some((x) => x.includes('فارغاً'));
console.log(`  ${caughtEmpty ? 'caught' : 'MISSED'} de: no qualified name at all`);
ok &&= caughtEmpty;
console.log(ok ? 'BREAK-TEST OK' : 'BREAK-TEST FAILED');
process.exit(ok ? 0 : 1);
