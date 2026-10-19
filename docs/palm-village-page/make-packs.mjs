// يبني حزم دفعة palm-village-page (صفحة معلم «قرية النخيل» كاملةً) للغات zh/de/ru/ur من المصدر نفسه:
// الإنجليزية مصدر الترجمة والعربية المرجع، ومعها نصوص الصفحة المعتمدة في اللغة (بطاقة الفعالية) سياقاً ملزماً.
//   node docs/palm-village-page/make-packs.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import yaml from 'js-yaml';

const md = readFileSync('src/content/attractions/palm-village.md', 'utf8').replace(/\r\n/g, '\n');
const [, head, bodyAr] = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const a = yaml.load(head);
const ev = readFileSync('src/data/events.ts', 'utf8').replace(/\r\n/g, '\n');
const BLOCK = { zh: 'TEXT_ZH', de: 'TEXT_DE', ru: 'TEXT_RU', ur: 'TEXT_UR' };
const evBlock = (name) => {
  const s = ev.indexOf(`const ${name}`);
  const p = ev.indexOf("'palm-village': {", s);
  return ev.slice(p, ev.indexOf('\n  },', p) + 4);
};

const paras = a.body_en.split(/\n{2,}/);
const positions = [
  { id: 'title', en: a.title_en, ar: a.title },
  { id: 'kicker', en: 'Seasonal experience', ar: a.kicker, note: 'kicker is not rendered on the page today (category label shows instead); translate for the record' },
  { id: 'summary', en: a.summary_en, ar: a.summary },
  ...paras.map((p, i) => ({ id: `body.${i + 1}`, en: p, ar: i === 0 ? '(see ar_body)' : '(see ar_body)' })),
  { id: 'galleryTitle', en: a.galleryTitle_en, ar: a.galleryTitle },
  { id: 'cta.label', en: a.cta.label_en, ar: a.cta.label, note: 'button text; the link opens the English registration page' },
  { id: 'cta.note', en: a.cta.note_en, ar: a.cta.note },
  ...a.practical.flatMap((r, i) => [
    { id: `practical.${i}.label`, en: r.label_en, ar: r.label },
    { id: `practical.${i}.value`, en: r.value_en, ar: r.value },
  ]),
  ...a.faq.flatMap((f, i) => [
    { id: `faq.${i}.q`, en: f.q_en, ar: f.q },
    { id: `faq.${i}.a`, en: f.a_en, ar: f.a },
  ]),
];
for (const lg of ['zh', 'de', 'ru', 'ur']) {
  const pack = {
    batch: 'palm-village-page', lang: lg, page: `/${lg}/attractions/palm-village/`,
    source_rule: 'English is the translation source; Arabic is the authority on facts and the only source of name spellings. Arabic-only sentences are not imported. Body paragraphs are rendered as separate <p> in the order body.1…body.5 (plain text, no Markdown).',
    fixed: {
      area: { en: a.area_en, ar: a.area, note: 'NOT translated in this batch: reuse verbatim the approved place string of this page in this language (events block below, field place).' },
    },
    approved_context_in_this_language: evBlock(BLOCK[lg]),
    approved_context_note: 'Approved strings of the same event in this language (name, place, season/time, organisers, activities). The page title MUST equal the approved name; organisers, place and the month/year form MUST match these strings.',
    ar_body: bodyAr.trim(),
    positions,
  };
  mkdirSync(`${lg}-translation/output/palm-village-page`, { recursive: true });
  writeFileSync(`${lg}-translation/output/palm-village-page/pack.json`, JSON.stringify(pack, null, 2) + '\n');
}
console.log(positions.length, 'positions');
