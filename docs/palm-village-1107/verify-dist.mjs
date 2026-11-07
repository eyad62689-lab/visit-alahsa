// Checks the built Palm Village pages in every language: the new edition's dates and the ticket link are
// present, and the booth-registration link and the "November 2026, date not announced" wording are gone.
// The stage's translated values must appear on the pages too.
// Usage: node docs/palm-village-1107/verify-dist.mjs <stage> [distRoot] [--break]
//   --break: runs the same checks on an in-memory copy with one planted fault per page and expects each caught.
import { readFileSync, existsSync } from 'node:fs';
import { blocks } from './make-blind-input.mjs';

const args = process.argv.slice(2);
const brk = args.includes('--break');
const [stage, distRoot = 'dist'] = args.filter((a) => a !== '--break');
const TICKET = 'https://wahaevents.hozma.tech/event/10/register';
const OLD_HOST = 'waha-demo.hozma.tech';
const OLD = [OLD_HOST, 'booth-registration'];
const OLD_TEXT = {
  ar: ['لم يُعلن التاريخ الدقيق', 'لم تُعلن المدة بعد'], en: ['exact dates and duration not yet announced', 'Duration not yet announced'],
  zh: ['具体日期与时长尚未公布', '时长尚未公布'], de: ['Dauer noch nicht bekannt gegeben'],
  ru: ['точные даты и продолжительность ещё не объявлены', 'Продолжительность ещё не объявлена'],
  ur: ['دورانیے کا اعلان ابھی نہیں ہوا'], tr: ['Süre henüz açıklanmadı', 'kesin tarihler ve süre henüz açıklanmadı'],
};
const PAGES = {
  ar: ['معالم/قرية-النخيل', 'فعاليات/قرية-النخيل'], en: ['en/attractions/palm-village', 'en/events/palm-village'],
};
for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) PAGES[lg] = [`${lg}/attractions/palm-village`, `${lg}/events/palm-village`];
const NEW = { ar: ['11 نوفمبر 2026', '28 فبراير 2027'], en: ['11 November 2026', '28 February 2027'] };

const norm = (s) => s.replace(/\\"/g, '"').replace(/\\'/g, "'");
function check(lg, page, html) {
  const errs = [];
  const text = blocks(html).join('\n');
  // links compared as parsed href values, not substrings of the page
  const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  if (!hrefs.includes(TICKET)) errs.push('ticket link missing');
  for (const h of hrefs) {
    let u; try { u = new URL(h); } catch { continue; }
    if (u.hostname === OLD_HOST) errs.push(`old link: ${h}`);
  }
  for (const o of OLD) if (text.includes(o)) errs.push(`old link text: ${o}`);
  for (const o of OLD_TEXT[lg] ?? []) if (text.includes(o)) errs.push(`old text: ${o}`);
  for (const n of NEW[lg] ?? []) if (!text.includes(n)) errs.push(`new text missing: ${n}`);
  if (lg !== 'ar' && lg !== 'en') {
    const out = JSON.parse(readFileSync(`docs/palm-village-1107/out/${lg}/${stage}.json`, 'utf8'));
    const want = page.includes('/events/') ? ['event-time', 'event-span'] : ['card-dates', 'card-fees', 'faq-a', 'cta-label'];
    for (const id of want) {
      const v = norm(out.items.find((x) => x.id === id).value);
      if (!text.includes(v)) errs.push(`${id} not on page: ${v.slice(0, 40)}`);
    }
  }
  return errs;
}

let bad = 0, caught = 0, planted = 0;
for (const [lg, pages] of Object.entries(PAGES)) for (const p of pages) {
  const f = `${distRoot}/${p}/index.html`;
  if (!existsSync(f)) { console.error(`MISSING ${f}`); bad++; continue; }
  const html = readFileSync(f, 'utf8');
  const errs = check(lg, p, html);
  if (errs.length) { bad++; console.error(`FAIL ${p}: ${errs.join(' | ')}`); }
  if (brk) {
    planted++;
    const broken = html.replace(TICKET, 'https://waha-demo.hozma.tech/booth-registration');
    if (check(lg, p, broken).length > errs.length) caught++; else console.error(`NOT CAUGHT ${p}`);
  }
}
const n = Object.values(PAGES).flat().length;
console.log(bad ? `${bad}/${n} pages failed` : `OK ${n}/${n}`);
if (brk) console.log(`break test: ${caught}/${planted} caught`);
process.exit(bad || (brk && caught < planted) ? 1 : 0);
