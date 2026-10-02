// يجمع مواضع de/ru/zh التي ما زالت تذكر وقت زيارة المساجد، مع مصدرها ar/en بعد التصحيح.
//   node docs/mosque-visit-fix/make-packs.mjs <جذر الشجرة>
import { readFileSync, writeFileSync } from 'node:fs';

const R = process.argv[2] || '.';
const HERE = new URL('.', import.meta.url);
const MOSQUES = ['abubakr-mosque', 'bubakr-ribat', 'dibs', 'hubaish', 'jabri-mosque', 'jalaniyah', 'jawatha-mosque',
  'qubba-mosque', 'tahimiyah-e', 'tahimiyah-s', 'umzurainiq', 'uqair-mosque'];
const PAT = {
  de: /Gebetszeit|ganztägig|Öffnungszeiten und Eintritt|zu den Gebetszeiten/,
  ru: /время молитв|весь день|Часы работы|В какие часы/u,
  zh: /礼拜时间|全天开放|开放时间/,
};
const lines = (f) => readFileSync(`${R}/${f}`, 'utf8').split(/\r?\n/);

for (const lg of ['de', 'ru', 'zh']) {
  const sites = [];
  for (const m of MOSQUES) {
    const f = `src/content/attractions/${m}.md`;
    const L = lines(f);
    L.forEach((l, i) => {
      if (!PAT[lg].test(l)) return;
      const isRow = /^ {2}- \{ label:/.test(l);
      const isFaq = new RegExp(`^ {4}[qa]_${lg}:`).test(l);
      if (!isRow && !isFaq) return;
      let src;
      if (isRow) {
        src = { row_ar_en: l.replace(/, (?:label|value|source)_(?:de|ru|zh): "[^"]*"/g, '') };
      } else {
        // سؤال/جواب: ابحث صعوداً عن q/a/q_en/a_en للمدخل نفسه
        let j = i;
        while (j > 0 && !/^ {2}- q: /.test(L[j])) j--;
        src = { faq_ar_en: L.slice(j, j + 4).map((x) => x.trim()) };
      }
      sites.push({ id: `${lg}-${m}-${i + 1}`, file: f, line: i + 1, current: l, ...src });
    });
  }
  // المدونات: فقرتا جواثا وحدهما (24-hours:38، 48-hours:44). أسطر «المواعيد تتغير بالموسم» العامة
  // (السطر 20 و worth-visiting:43) لا تخص المساجد فلا تدخل.
  for (const [b, only] of [['24-hours', 38], ['48-hours', 44]]) {
    const f = `src/content/blog/${b}-${lg}.md`;
    const L = lines(f);
    const AR = lines(`src/content/blog/${b}-ar.md`);
    const EN = lines(`src/content/blog/${b}-en.md`);
    L.forEach((l, i) => {
      if (i + 1 !== only) return;
      sites.push({ id: `${lg}-blog-${b}-${i + 1}`, file: f, line: i + 1, current: l, ar_arbiter: AR[i], en_source: EN[i] });
    });
  }
  writeFileSync(new URL(`./${lg}.json`, HERE), JSON.stringify(sites, null, 1), 'utf8');
  console.log(`${lg}: ${sites.length} موضعاً — ${[...new Set(sites.map((s) => s.file.split('/').pop()))].join(' · ')}`);
}
