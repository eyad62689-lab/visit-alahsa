// Checks the built site for four fixes: the home "water" figures are static (no count-up that a
// snapshot can catch mid-way), the permanently closed Bu Mubarak bakery is gone from every dining
// page, the three inspection notes are gone from every online-stores page, and Jabal Al-Qarah and
// Land of Civilisations carry the 11 pm closing time on their attraction and plan pages.
// Usage: node docs/site-fixes-1107/verify-dist.mjs [distRoot] [--break]
//   --break: runs the same checks on in-memory copies with one planted fault per page and expects each caught.
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const args = process.argv.slice(2);
const brk = args.includes('--break');
const [distRoot = 'dist'] = args.filter((a) => a !== '--break');
const LANGS = ['zh', 'de', 'ru', 'ur', 'tr'];
const at = (ar, en) => [ar, en, ...LANGS.map((lg) => `${lg}/${en.replace(/^en\//, '')}`)];

// visible text: tags dropped character by character (no regex over markup), entities left as written
function textOf(html) {
  let out = '', inTag = false, skip = '';
  for (let i = 0; i < html.length; i++) {
    if (skip) { if (html.startsWith(`</${skip}`, i)) { skip = ''; inTag = true; } continue; }
    const c = html[i];
    if (inTag) { if (c === '>') { inTag = false; out += ' '; } continue; }
    if (c === '<') {
      inTag = true;
      for (const t of ['script', 'style']) if (html.startsWith(`<${t}`, i)) skip = t;
      continue;
    }
    out += c;
  }
  return out.replace(/\s+/g, ' ');
}

const STORE_NOTES = [
  'بعض الأصناف كان غير متوفر وقت الفحص', 'آخر منشور له قبل نحو ثمانية أشهر', 'تفاصيل المنتجات لم تُقرأ كاملة',
  'at the time of checking', 'Its latest post was about eight months ago', 'were not read in full',
  '核查时', '最近一条动态发布于大约八个月前', '产品详情未完整阅读',
  'Bei der Prüfung', 'Der letzte Beitrag liegt etwa acht Monate zurück', 'nicht vollständig gelesen',
  'На момент проверки', 'Последняя публикация — около восьми месяцев назад', 'изучены не полностью',
  'جانچ کے وقت', 'آخری پوسٹ تقریباً آٹھ ماہ پہلے', 'پوری نہیں پڑھی گئیں',
  'Kontrol edildiği sırada', 'son paylaşımı yaklaşık sekiz ay önce', 'tamamı okunmadı',
];
const BAKERY = ['بومبارك', 'بومبارک', 'Bu Mubarak', 'bu-mubarak'];
// 10 pm closing in the forms each language writes it
const TEN_PM = ['10:00 م', '10:00 مساءً', '10:00 pm', '22:00', '22.00', '晚上10', '22 Uhr', 'رات 10 بجے'];

const HOME_FIGS = {
  ar: ['⁦+2.5⁩ مليون', '⁦+280⁩'], en: ['2.5M+', '280+'], zh: ['250 多万', '280 多'],
  de: ['Über 2,5 Mio.', 'Über 280'], ru: ['Более 2,5 млн', 'Более 280'], ur: ['25 لاکھ+', '280+'],
  tr: ['2,5 milyondan fazla', '280&#39;den fazla'],
};
// one attraction page per directory under /en/attractions/
const SITES = readdirSync(`${distRoot}/en/attractions`, { withFileTypes: true }).filter((d) => d.isDirectory()).length;

const CHECKS = [
  {
    name: 'home', pages: ['', 'en', ...LANGS],
    check(html, text, p) {
      // the four figures as written in HTML, against the language's palm and spring forms and the attraction count
      const e = [];
      if (html.includes('data-count')) e.push('count-up markup present');
      const got = [...html.matchAll(/class="wf-n"[^>]*><bdi[^>]*>([^<]*)/g)].map((m) => m[1]);
      const want = [...HOME_FIGS[p || 'ar'], '2018', String(SITES)];
      if (got.join('|') !== want.join('|')) e.push(`figures ${got.join(' / ')} != ${want.join(' / ')}`);
      return e;
    },
    plant: (h) => h.replace('<bdi data-astro-cid', '<bdi data-count data-astro-cid'),
  },
  {
    name: 'dining', pages: at('مطاعم-ومقاهي', 'en/restaurants-cafes'),
    check(html, text) { return BAKERY.filter((b) => html.includes(b) || text.includes(b)).map((b) => `closed bakery: ${b}`); },
    plant: (h) => h.replace('</main>', '<p>Bu Mubarak</p></main>'),
  },
  {
    name: 'stores', pages: at('متاجر-الأحساء-الإلكترونية', 'en/online-stores'),
    check(html, text) { return STORE_NOTES.filter((n) => text.includes(n)).map((n) => `draft note: ${n}`); },
    plant: (h) => h.replace('</main>', '<p>The product details were not read in full.</p></main>'),
  },
  {
    name: 'hours', pages: [...at('معالم/جبل-القارة', 'en/attractions/jabal-al-qarah'), ...at('معالم/أرض-الحضارات', 'en/attractions/ardh-alhadarat')],
    check(html, text) { return TEN_PM.filter((t) => text.includes(t)).map((t) => `10 pm closing: ${t}`); },
    plant: (h) => h.replace('</main>', '<p>8:00 am – 10:00 pm</p></main>'),
  },
  {
    name: 'plan', pages: at('خطط', 'en/plan-your-trip'),
    check(html, text) {
      // the hours table row of each attraction, up to the next row
      const e = [];
      for (const [k, name] of [['ar', 'جبل القارة'], ['ar', 'أرض الحضارات'], ['en', 'Jabal Al-Qarah'], ['en', 'Land of Civilisations']]) {
        const i = text.indexOf(name);
        if (i < 0) continue;
        const row = text.slice(i, i + 80);
        for (const t of TEN_PM) if (row.includes(t)) e.push(`${k} ${name}: ${t}`);
      }
      return e;
    },
    plant: (h) => h.replaceAll('11:00 م', '10:00 م').replaceAll('11:00 pm', '10:00 pm'),
  },
];

let bad = 0, n = 0, caught = 0, planted = 0;
for (const c of CHECKS) for (const p of c.pages) {
  n++;
  const f = `${distRoot}/${p ? p + '/' : ''}index.html`;
  if (!existsSync(f)) { console.error(`MISSING ${f}`); bad++; continue; }
  const html = readFileSync(f, 'utf8');
  const errs = c.check(html, textOf(html), p);
  if (errs.length) { bad++; console.error(`FAIL ${c.name} /${p}: ${errs.join(' | ')}`); }
  if (brk) {
    const broken = c.plant(html);
    if (broken === html) { console.error(`NOTHING PLANTED ${c.name} /${p}`); continue; }
    planted++;
    if (c.check(broken, textOf(broken), p).length > errs.length) caught++; else console.error(`NOT CAUGHT ${c.name} /${p}`);
  }
}
console.log(bad ? `${bad}/${n} pages failed` : `OK ${n}/${n}`);
if (brk) console.log(`break test: ${caught}/${planted} caught (${n - planted} pages with nothing to plant)`);
process.exit(bad || (brk && caught < planted) ? 1 : 0);
