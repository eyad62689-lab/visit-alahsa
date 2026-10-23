// يولّد حزم دفعة owner-rulings-1023 (zh · de · ru · ur): أجوبة المالك (2026-10-23) على معلّقات الجولة الخامسة الأوردية
// التي تمسّ نصوصاً منشورة في اللغات الأربع. المصدران العربي والإنجليزي صُحِّحا في شجرة العمل أولاً، وهذه الحزم تحمل
// لكل موضع نصَّ اللغة المنشور حرفياً (`current`) والمصدرين قبل التصحيح وبعده (`*_before` / `*_after`).
//   node docs/owner-rulings-1023/make-packs.mjs <جذر الشجرة> [الأساس، مثل HEAD]
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'HEAD';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const esbuild = require('esbuild');
const show = (rel) => execFileSync('git', ['-C', R, 'show', BASE + ':' + rel], { encoding: 'utf8', maxBuffer: 1 << 26 });
const cur = (rel) => readFileSync(path.join(R, rel), 'utf8');
const DATE = '2026-10-23';

// وحدة TS تُحمَّل كما هي (مع استيراداتها النسبية) من نصّها، سواء كان نصّ الشجرة أو نصّ الأساس
const loadTs = (rel, src) => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'owner-rulings-1023-'));
  const file = path.join(dir, 'mod.cjs');
  esbuild.buildSync({ stdin: { contents: src, resolveDir: path.join(R, path.dirname(rel)), loader: 'ts', sourcefile: path.basename(rel) },
    bundle: true, format: 'cjs', platform: 'node', outfile: file, logLevel: 'silent' });
  try { return require(file); } finally { rmSync(dir, { recursive: true, force: true }); }
};
const LEGAL = 'src/data/legal.ts', UI = 'src/i18n/ui.ts';
const L0 = loadTs(LEGAL, show(LEGAL)), L1 = loadTs(LEGAL, cur(LEGAL));
const U1 = loadTs(UI, cur(UI)).ui;
const sec = (L, lg) => L['LEGAL_SECTIONS_' + lg.toUpperCase()];

// حقل YAML مضمّن (`field: "…"`) في سطر بنود practical أو في frontmatter — القيمة الأولى الوحيدة للحقل في الملف
const yamlField = (src, field) => {
  const re = new RegExp(`(?:^|[\\s{,])${field}: "((?:[^"\\\\]|\\\\.)*)"`, 'g');
  const hits = [...src.matchAll(re)];
  if (hits.length !== 1) throw new Error(`${field}: found ${hits.length} times, expected once`);
  return JSON.parse('"' + hits[0][1] + '"');
};
// سطر بند practical الواحد الذي تسميته العربية هي label (الرسوم / المواعيد)
const row = (src, label) => {
  const lines = src.split(/\r?\n/).filter((l) => l.includes(`label: "${label}"`));
  if (lines.length !== 1) throw new Error(`row «${label}»: found ${lines.length} times, expected once`);
  return lines[0];
};
const faq = (lg, i, src) => JSON.parse(src).faq[i].a;

const OWNER = {
  mascot: 'OWNER 2026-10-23 (OQ-L1): the mascot is the WHITE-CHEEKED bulbul («البلبل أبيض الخدين»), not white-eared; the legal page is corrected at source in ar/en and follows in every language. Change the species word only; every other word of the paragraph stays byte-identical.',
  lead: 'OWNER 2026-10-23 (SD-L14): drop the word «صريحًا» / "express" from the terms lead (access and use is acceptance of the terms, not EXPRESS acceptance), so that it no longer contradicts the intro\'s «موافقة ضمنية». Remove the adverb/adjective only; the rest of the sentence stays byte-identical.',
  ticket: 'OWNER 2026-10-23 (SD-P4): ONE ticket (SAR 50, adults) covers both Jabal Al-Qarah and the Land of Civilisations heritage village; the Qarah ticket is sold through the village. Render the new source fee line; keep the currency form and the village name exactly as your language\'s termbase / published card writes them. No child fare exists (nothing added).',
  bisht: 'OWNER 2026-10-23 (SD-S12): what UNESCO inscribed in 2025 is the BISHT in general (Representative List of the Intangible Cultural Heritage, "Bisht (men\'s Abaa)", a joint file of nine states), not a Hasawi element. The source sentence now says so; change that clause only, the rest of the answer stays byte-identical.',
  event: 'OWNER 2026-10-23 (SD-P13): the Palm Village row of the hours-and-fees table on /plan-your-trip/ is tagged as an EVENT in the name cell: «قرية النخيل (فعالية)» / "Palm Village (event)". NEW ui key plan.tableEvent = the one-word tag your language puts in that bracket (lower-case where the language has case; no punctuation). Nothing else changes.',
  qubba: 'OWNER 2026-10-23 (SD-P1): Al-Qubba Mosque follows Qasr Ibrahim\'s hours; the bracketed «(8 ص – 8 م)» that contradicted the palace card is removed at source. Remove the bracket only.',
  uqair: 'OWNER 2026-10-23 (SD-P3): Al-Uqair Castle is NOT entered; the fee line «الدخول مجاني» becomes «لا دخول إلى الداخل» / "No entry inside" (the hours line «متاح للزيارة الخارجية» stays).',
  nami: 'OWNER 2026-10-23 (N156 / N157 / the Tarafa article): «نامی» IS NOW ALLOWED IN A TITLE for a name that reads as a common word (Al-Sawsan read as the lily, Al-Taraf as "side", Hajar as a common word). P3c-labels\' guard is amended by this batch (the judge writes the amendment). Rebuild the three titles with «نامی» where the rulings\' recorded fallbacks put it (N156 C, N157 B); the Tarafa title and description carry «ہجر نامی شہر» where «ہجر» stands bare. The termbase key of each name is unchanged.',
};

const positions = (lg) => {
  const S0 = sec(L0, lg), S1 = sec(L1, lg), EN0 = sec(L0, 'en'), EN1 = sec(L1, 'en'), AR0 = sec(L0, 'ar'), AR1 = sec(L1, 'ar');
  const Q = 'src/content/attractions/jabal-al-qarah.md', H = 'src/content/attractions/ardh-alhadarat.md', ST = `src/data/stores-directory.${lg}.json`;
  const P = [
    { id: `${lg}-legal-lead`, file: LEGAL, kind: 'ts', role: `Lead sentence of part two (Terms of Use) on /${lg}/legal/. One TS string literal.`, ruling: OWNER.lead,
      current: S1[1].lead, en_before: EN0[1].lead, en_after: EN1[1].lead, ar_before: AR0[1].lead, ar_after: AR1[1].lead },
    { id: `${lg}-legal-mascot`, file: LEGAL, kind: 'ts', role: `Ownership statement paragraph of part five on /${lg}/legal/. One TS string literal.`, ruling: OWNER.mascot,
      current: S1[4].subs[0].before[0], en_before: EN0[4].subs[0].before[0], en_after: EN1[4].subs[0].before[0], ar_before: AR0[4].subs[0].before[0], ar_after: AR1[4].subs[0].before[0] },
    { id: `${lg}-qarah-fee`, file: Q, kind: 'yaml', field: `value_${lg}`, role: `Fees value of the Jabal Al-Qarah visit card (also a cell of the hours-and-fees table on /${lg}/plan-your-trip/). One YAML double-quoted value, no final full stop.`, ruling: OWNER.ticket,
      current: yamlField(row(cur(Q), 'الرسوم'), `value_${lg}`), en_before: yamlField(row(show(Q), 'الرسوم'), 'value_en'), en_after: yamlField(row(cur(Q), 'الرسوم'), 'value_en'), ar_before: yamlField(row(show(Q), 'الرسوم'), 'value'), ar_after: yamlField(row(cur(Q), 'الرسوم'), 'value') },
    { id: `${lg}-hadarat-fee`, file: H, kind: 'yaml', field: `value_${lg}`, role: `Fees value of the Land of Civilisations visit card (also a table cell on /${lg}/plan-your-trip/). One YAML double-quoted value, no final full stop.`, ruling: OWNER.ticket,
      current: yamlField(row(cur(H), 'الرسوم'), `value_${lg}`), en_before: yamlField(row(show(H), 'الرسوم'), 'value_en'), en_after: yamlField(row(cur(H), 'الرسوم'), 'value_en'), ar_before: yamlField(row(show(H), 'الرسوم'), 'value'), ar_after: yamlField(row(cur(H), 'الرسوم'), 'value') },
    { id: `${lg}-stores-bisht`, file: ST, kind: 'json', locator: 'faq[2].a', role: `Answer of FAQ 3 on /${lg}/online-stores/ (also JSON-LD). One JSON string.`, ruling: OWNER.bisht,
      current: faq(lg, 2, cur(ST)), en_before: faq('en', 2, show('src/data/stores-directory.en.json')), en_after: faq('en', 2, cur('src/data/stores-directory.en.json')), ar_before: faq('ar', 2, show('src/data/stores-directory.ar.json')), ar_after: faq('ar', 2, cur('src/data/stores-directory.ar.json')) },
    { id: `${lg}-plan.tableEvent`, file: UI, kind: 'ui-new', key: 'plan.tableEvent', anchor: 'plan.empty.map', role: `NEW KEY (current is empty = missing). The one-word event tag shown in brackets after the Palm Village name in the hours-and-fees table of /${lg}/plan-your-trip/. One TS string.`, ruling: OWNER.event,
      current: '', en: U1.en['plan.tableEvent'], ar: U1.ar['plan.tableEvent'] },
  ];
  if (lg === 'ur') {
    const QM = 'src/content/attractions/qubba-mosque.md', UC = 'src/content/attractions/uqair-castle.md', SW = 'src/content/attractions/sawsan-gardens.md', TZ = 'src/content/attractions/taraf-zoo.md', TB = 'src/content/blog/tarafa-ibn-al-abd-ur.md';
    const fm = (src, f) => yamlField(src.split(/\r?\n---/)[0], f);
    P.push(
      { id: 'ur-qubba-hours', file: QM, kind: 'yaml', field: 'value_ur', role: 'Hours value of the Al-Qubba Mosque visit card (also a table cell on /ur/plan-your-trip/). One YAML value, no final full stop.', ruling: OWNER.qubba,
        current: yamlField(row(cur(QM), 'المواعيد'), 'value_ur'), en_before: yamlField(row(show(QM), 'المواعيد'), 'value_en'), en_after: yamlField(row(cur(QM), 'المواعيد'), 'value_en'), ar_before: yamlField(row(show(QM), 'المواعيد'), 'value'), ar_after: yamlField(row(cur(QM), 'المواعيد'), 'value') },
      { id: 'ur-uqair-fee', file: UC, kind: 'yaml', field: 'value_ur', role: 'Fees value of the Al-Uqair Castle visit card (also a table cell on /ur/plan-your-trip/). One YAML value, no final full stop.', ruling: OWNER.uqair,
        current: yamlField(row(cur(UC), 'الرسوم'), 'value_ur'), en_before: yamlField(row(show(UC), 'الرسوم'), 'value_en'), en_after: yamlField(row(cur(UC), 'الرسوم'), 'value_en'), ar_before: yamlField(row(show(UC), 'الرسوم'), 'value'), ar_after: yamlField(row(cur(UC), 'الرسوم'), 'value') },
      { id: 'ur-sawsan-title', file: SW, kind: 'yaml', field: 'title_ur', role: 'title_ur of Al-Sawsan Bird Gardens: the H1, the tab title, the card name, the table cell and every link to the page. One YAML value.', ruling: OWNER.nami,
        current: fm(cur(SW), 'title_ur'), en_before: fm(show(SW), 'title_en'), en_after: fm(cur(SW), 'title_en'), ar_before: fm(show(SW), 'title'), ar_after: fm(cur(SW), 'title') },
      { id: 'ur-taraf-title', file: TZ, kind: 'yaml', field: 'title_ur', role: 'title_ur of Al-Taraf Zoo: the H1, the tab title, the card name, the table cell and every link to the page. One YAML value.', ruling: OWNER.nami,
        current: fm(cur(TZ), 'title_ur'), en_before: fm(show(TZ), 'title_en'), en_after: fm(cur(TZ), 'title_en'), ar_before: fm(show(TZ), 'title'), ar_after: fm(cur(TZ), 'title') },
      { id: 'ur-tarafa-title', file: TB, kind: 'yaml', field: 'title', role: 'title of the Urdu Tarafa ibn al-Abd article (H1, tab title, blog card). One YAML value.', ruling: OWNER.nami,
        current: fm(cur(TB), 'title'), en_before: fm(show('src/content/blog/tarafa-ibn-al-abd-en.md'), 'title'), en_after: fm(cur('src/content/blog/tarafa-ibn-al-abd-en.md'), 'title'), ar_before: fm(show('src/content/blog/tarafa-ibn-al-abd-ar.md'), 'title'), ar_after: fm(cur('src/content/blog/tarafa-ibn-al-abd-ar.md'), 'title') },
      { id: 'ur-tarafa-desc', file: TB, kind: 'yaml', field: 'description', role: 'description of the Urdu Tarafa article (meta description, blog card). One YAML value.', ruling: OWNER.nami,
        current: fm(cur(TB), 'description'), en_before: fm(show('src/content/blog/tarafa-ibn-al-abd-en.md'), 'description'), en_after: fm(cur('src/content/blog/tarafa-ibn-al-abd-en.md'), 'description'), ar_before: fm(show('src/content/blog/tarafa-ibn-al-abd-ar.md'), 'description'), ar_after: fm(cur('src/content/blog/tarafa-ibn-al-abd-ar.md'), 'description') },
    );
  }
  for (const p of P) {
    if (p.kind !== 'ui-new' && !p.current) throw new Error(p.id + ': no published text');
    // كل موضع غير «نامی» يتبع تصحيحاً في المصدرين؛ ومواضع «نامی» أوردية صرفة بلا تغيير في المصدر
    if (p.kind !== 'ui-new' && p.ruling !== OWNER.nami && p.en_before === p.en_after && p.ar_before === p.ar_after) throw new Error(p.id + ': the source did not change');
  }
  return P;
};

for (const lg of ['zh', 'de', 'ru', 'ur']) {
  const dir = path.join(R, `${lg}-translation/output/owner-rulings-1023`);
  mkdirSync(dir, { recursive: true });
  const P = positions(lg);
  writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch: 'owner-rulings-1023', lang: lg, date: DATE, base: BASE, positions: P }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${P.length} positions -> ${lg}-translation/output/owner-rulings-1023/pack.json`);
}
