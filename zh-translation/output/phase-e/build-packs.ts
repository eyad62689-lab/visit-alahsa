// npx tsx build-packs.ts — يبني pack.json لدفعات المرحلة هـ الأربع × اللغات الثلاث من ملفات المستودع.
import fs from 'node:fs';
import path from 'node:path';
import { LEGAL_SECTIONS_AR, LEGAL_SECTIONS_EN } from '../../../src/data/legal.ts';

const REPO = '/home/user/visit-alahsa';
const OUT = path.dirname(new URL(import.meta.url).pathname);
type S = { en: string; ar: string; ctx: string };

// ── كتل localize في القوالب: يُقرأ `key: '…'` أو `key: \`…\`` داخل كتلتي ar/en ──
function block(file: string, lang: 'ar' | 'en'): Record<string, string> {
  const src = fs.readFileSync(`${REPO}/src/components/views/${file}`, 'utf8');
  const start = src.indexOf(`\n  ${lang}: {`);
  const end = src.indexOf('\n  },', start);
  const body = src.slice(start, end);
  const out: Record<string, string> = {};
  for (const m of body.matchAll(/^\s{4}([a-zA-Z]+):\s*(['`])((?:\\.|(?!\2).)*)\2,?\s*$/gm)) {
    out[m[1]] = m[3].replace(/\\'/g, "'")
      .replace(/\$\{comps\.length\}/g, '{count}').replace(/\$\{names\.join\([^)]*\)\}/g, '{names}');
  }
  return out;
}
function uiKeys(lang: 'ar' | 'en', prefix: string): Record<string, string> {
  const src = fs.readFileSync(`${REPO}/src/i18n/ui.ts`, 'utf8');
  const start = src.indexOf(`\n  ${lang}: {`);
  const end = src.indexOf('\n  } as', start) > 0 ? src.indexOf('\n  }', start) : src.length;
  const out: Record<string, string> = {};
  for (const m of src.slice(start, end).matchAll(/^\s{4}'([a-z0-9.]+)':\s*'((?:\\.|[^'])*)',/gm)) if (m[1].startsWith(prefix)) out[m[1]] = m[2].replace(/\\'/g, "'");
  return out;
}

// ── دفعة ui ──
const ui: Record<string, S> = {};
const TMAP_CTX: Record<string, string> = {
  'tmap.title': 'H1 of the 3D terrain-map page, also its <title> and breadcrumb name, and the label of the link to it from the regular map page (map.terrain is a separate, already published key). Short noun phrase.',
  'tmap.lead': 'Hero lead of the terrain-map page (also its meta description). Names Jabal Al-Qarah, the palm groves and the dunes east of the oasis — all three are termbase terms. «Tap any name in the list» refers to the attraction list printed under the map.',
  'tmap.open': 'Button that loads the interactive 3D map (the map is lazy-loaded; before the press only a poster image shows). Imperative.',
  'tmap.loading': 'Status text while the map library loads. Ends with an ellipsis.',
  'tmap.3d.on': 'Toggle button label that switches the map to 3D (tilted relief). Very short.',
  'tmap.3d.off': 'Toggle button label that switches the map back to flat 2D. Very short; must pair with tmap.3d.on.',
  'tmap.locate': 'Small button next to each attraction in the list: flies the map to that attraction. Imperative, short.',
  'tmap.list.title': 'H2 above the list of all attractions shown on the map (grouped by category).',
  'tmap.classic': 'Link to the ordinary 2D map page (the published key map.* calls that page «map»). An arrow symbol is appended by the template — do not add one.',
  'tmap.gest.win': 'Overlay hint when a Windows/Linux user scrolls over the map without Ctrl. «Ctrl» stays as the key name.',
  'tmap.gest.mac': 'Same hint for macOS; «⌘» stays as the key symbol.',
  'tmap.gest.touch': 'Same hint on touch screens when the user drags the map with one finger.',
};
const tAr = uiKeys('ar', 'tmap.'), tEn = uiKeys('en', 'tmap.');
for (const k of Object.keys(TMAP_CTX)) ui[k] = { en: tEn[k], ar: tAr[k], ctx: `/<lang>/terrain-map/ (TerrainMapView.astro, ui.ts key): ${TMAP_CTX[k]}` };

const RCTX: Record<string, string> = {
  eyebrow: 'small eyebrow line above the H1', title: 'H1 and <title>; the footer link to this page is the published key foot.l.report — keep consistent with it',
  lead: 'hero lead paragraph (also meta description)', pageL: 'form field label', pagePh: 'placeholder inside the field above (example of what to type)',
  msgL: 'form field label (a question)', msgPh: 'placeholder inside the message textarea', emailL: 'form field label; the email is optional — keep that clear',
  emailPh: 'placeholder — an example email address; keep it exactly as is unless your language needs a different example', submit: 'submit button', note: 'small print under the button — privacy reassurance',
};
const rAr = block('ReportView.astro', 'ar'), rEn = block('ReportView.astro', 'en');
for (const k of Object.keys(RCTX)) ui[`report.${k}`] = { en: rEn[k], ar: rAr[k], ctx: `/<lang>/report/ («Report an error» page — a Netlify form, noindex; ReportView.astro): ${RCTX[k]}.` };
const thAr = block('ReportThanksView.astro', 'ar'), thEn = block('ReportThanksView.astro', 'en');
for (const [k, c] of Object.entries({ title: 'H1 and <title> of the page shown after the error report is sent', d: 'the paragraph under the H1', back: 'button back to the home page' }))
  ui[`thanks.${k}`] = { en: thEn[k], ar: thAr[k], ctx: `/<lang>/report/thanks/ (ReportThanksView.astro, noindex): ${c}.` };
const uAr = block('UnescoView.astro', 'ar'), uEn = block('UnescoView.astro', 'en');
const UCTX: Record<string, string> = {
  title: 'H1 (and JSON-LD list name). The site already publishes, per language, det.unesco and foot.l.unesco (UNESCO badge/footer label) — use the same name for UNESCO and the World Heritage List',
  lead: 'hero lead. {count} is replaced at build time by the number of components with their own page in this guide (today 6) — keep {count} literally once and write the sentence so it is grammatical with that number. Facts: inscribed 2018, site number 1563, twelve components',
  comp: 'small label before each component number on the cards, e.g. «Component 1563-004»',
  officialH: 'H2 of the box that sends readers to UNESCO',
  official: 'text of that box',
  officialLink: 'external link label to whc.unesco.org; the template keeps the trailing ↗ from the source — keep it',
  seoTitle: 'the page <title> (short)',
  seoDesc: 'meta description. {count} = number of components with pages (6); {names} = their names joined by the language list separator, inserted at build time — keep both placeholders literally once, and end the sentence right after {names}',
};
for (const k of Object.keys(UCTX)) ui[`unesco.${k}`] = { en: uEn[k], ar: uAr[k], ctx: `/<lang>/unesco/ («Al-Ahsa Oasis at UNESCO» page, UnescoView.astro): ${UCTX[k]}.` };

// ── دفعات legal ──
const lAr = block('LegalView.astro', 'ar'), lEn = block('LegalView.astro', 'en');
const legalSrc = fs.readFileSync(`${REPO}/src/components/views/LegalView.astro`, 'utf8');
const arrOf = (lang: 'ar' | 'en', key: string) => {
  const s = legalSrc.indexOf(`\n  ${lang}: {`);
  const k = legalSrc.indexOf(`${key}: [`, s);
  const e = legalSrc.indexOf('],', k);
  return [...legalSrc.slice(k, e).matchAll(/'((?:\\.|[^'])*)'/g)].map((m) => m[1].replace(/\\'/g, "'"));
};
const seo = legalSrc.match(/const seoDesc = ar\s*\?\s*'([^']*)'\s*:\s*'([^']*)'/)!;
const LCTX = 'This is a legal document (policies & terms of the site). The Arabic is the owner-approved original and the authority on every provision; the English is its faithful translation and the source you translate from. Translate faithfully and completely in formal legal register — no summarising, no softening or strengthening of any obligation, right or disclaimer, no added clause. Keep law names, decree numbers and dates exactly (Royal Decree No. (M/19) dated 9/2/1443 AH). Product/service names (Google Analytics, GA4, Google, Netlify…) stay as written.';
const legal1: Record<string, S> = {
  'legal.title': { en: lEn.title, ar: lAr.title, ctx: `/<lang>/legal/ H1 and <title>; the footer link to this page is the published key foot.l.privacy. ${LCTX}` },
  'legal.updated': { en: lEn.updated, ar: lAr.updated, ctx: `Date line under the H1. Date format of your language. ${LCTX}` },
  'legal.introH': { en: lEn.introH, ar: lAr.introH, ctx: `H2. ${LCTX}` },
  'legal.closingH': { en: lEn.closingH, ar: lAr.closingH, ctx: `H2 of the last section. ${LCTX}` },
  'legal.contactPre': { en: lEn.contactPre, ar: lAr.contactPre, ctx: `Sentence immediately followed by the email address link info@visit-alahsa.com — it must end so that the address can follow directly (keep the final colon/space convention of your language). ${LCTX}` },
  'legal.copyright': { en: lEn.copyright, ar: lAr.copyright, ctx: `Copyright line at the foot of the document. «Visit Al-Ahsa» is the site name — use the published site.name form of your language; keep visit-alahsa.com. ${LCTX}` },
  'legal.seoDesc': { en: seo[2], ar: seo[1], ctx: `Meta description of the page — lists the six sections; the section names must match the H2s you write in legal.sN.h (this batch has only section One; the other five section titles are written in batches legal-2/legal-3 — keep these six names short and consistent). ${LCTX}` },
};
arrOf('en', 'intro').forEach((p, i) => { legal1[`legal.intro.${i}`] = { en: p, ar: arrOf('ar', 'intro')[i], ctx: `Paragraph ${i + 1} of the general introduction. ${LCTX}` }; });
arrOf('en', 'closing').forEach((p, i) => { legal1[`legal.closing.${i}`] = { en: p, ar: arrOf('ar', 'closing')[i], ctx: `Closing paragraph. ${LCTX}` }; });

function sectionStrings(i: number): Record<string, S> {
  const E = LEGAL_SECTIONS_EN[i], A = LEGAL_SECTIONS_AR[i];
  const o: Record<string, S> = {};
  const p = `legal.s${i}`;
  o[`${p}.n`] = { en: E.n, ar: A.n, ctx: `Ordinal before the section H2 («${E.n}: ${E.h}»), rendered as «<n>: <h>». Section ${i + 1} of six. Write it the way an ordinal section label reads in your language. ${LCTX}` };
  o[`${p}.h`] = { en: E.h, ar: A.h, ctx: `H2 of section ${i + 1}; also a jump-link chip at the top of the page and one of the six names listed in legal.seoDesc. ${LCTX}` };
  if (E.lead) o[`${p}.lead`] = { en: E.lead, ar: A.lead!, ctx: `Lead paragraph of section ${i + 1}. ${LCTX}` };
  E.subs.forEach((u, j) => {
    const a = A.subs[j];
    o[`${p}.sub${j}.h`] = { en: u.h, ar: a.h, ctx: `H3 of subsection ${j + 1} (numbered «${j + 1}. …» — keep the number). ${LCTX}` };
    for (const kind of ['before', 'list', 'after'] as const) (u[kind] ?? []).forEach((t, k) => {
      o[`${p}.sub${j}.${kind}.${k}`] = { en: t, ar: a[kind]![k], ctx: `${kind === 'list' ? `Bullet ${k + 1}` : `Paragraph (${kind} the list)`} in subsection «${u.h}». ${LCTX}` };
    });
  });
  return o;
}
const BATCHES: Record<string, { part: string; strings: Record<string, S> }> = {
  ui: { part: 'Terrain-map UI keys (tmap.*), the Report-an-error page and its thanks page, and the UNESCO page', strings: ui },
  'legal-1': { part: 'Legal page frame (title, date, introduction, closing, contact line, copyright, meta description) + section One (Privacy Policy)', strings: { ...legal1, ...sectionStrings(0) } },
  'legal-2': { part: 'Legal page sections Two (Terms of Use) and Three (Disclaimer)', strings: { ...sectionStrings(1), ...sectionStrings(2) } },
  'legal-3': { part: 'Legal page sections Four (Cookie Policy), Five (Intellectual Property Policy) and Six (External Links Policy)', strings: { ...sectionStrings(3), ...sectionStrings(4), ...sectionStrings(5) } },
};
for (const lang of ['zh', 'de', 'ru']) for (const [b, spec] of Object.entries(BATCHES)) {
  const strings = Object.fromEntries(Object.entries(spec.strings).map(([k, v]) => [k, { ...v, ctx: v.ctx.replaceAll('<lang>', lang) }]));
  for (const [k, v] of Object.entries(strings)) if (!v.en || !v.ar) throw new Error(`${b}/${k}: مصدر ناقص`);
  const dir = path.join(OUT, `${lang}-${b}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch: `${lang}-${b}`, lang, part: spec.part, strings }, null, 2) + '\n');
  if (lang === 'zh') console.log(b, Object.keys(strings).length, 'strings ·', Object.values(strings).reduce((n, s) => n + s.en.split(/\s+/).length, 0), 'EN words');
}
