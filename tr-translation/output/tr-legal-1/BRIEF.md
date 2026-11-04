# Batch `tr-legal-1` — the Turkish policies and legal terms page (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
One page, published already in ar/en/zh/de/ru/ur from the same record, built now in Turkish: **`/tr/legal/`**, the
site's policies and legal terms. The **Arabic text is the original document** approved by the site owner (last update
10 July 2026); the English is its faithful translation. **117 strings** in `pack.json` (keys and `ctx` are the sister
lines' scheme; read `ctx` for every string):
- **Page block**: `legal.title` (H1 and browser tab), `legal.updated` (last-updated line), `legal.introH` +
  `legal.intro.0–2` (general introduction), `legal.closingH` + `legal.closing.0` (final provisions),
  `legal.contactPre` (the sentence right before the e-mail link — it **ends with a colon and one space** as in the
  source; the template writes the address after it), `legal.copyright`, `legal.seoDesc` (meta description).
- **Six sections** `legal.sec.<i>.*`: an ordinal `n` (rendered before the heading with a colon: «One: Privacy
  Policy»), heading `h` (also a chip in the row of section links at the top), an optional `lead` paragraph, and items
  `sub.<j>` each with a heading `h` that **starts with its number «1. »** (keep it), paragraphs `before.<k>`, bullet
  items `list.<k>`, paragraphs `after.<k>`.
- The Arabic/English page has a fourth disclaimer item on the tour-guides directory; that directory exists in Arabic and
  English only, and every sister language omits the item — so does this batch (it is not in the pack).

The frame is published Turkish (`ref.json` → `ui`): the footer link to this page reads «Politikalar ve kullanım
koşulları» (foot.l.privacy). The H1 may be a fuller document title; keep it consistent with that link.

## The rule of this page
**Translation only, nothing changed.** `src/data/legal.ts` carries the owner's rule: no clause is amended without a new
approved document. Every right, condition, exception and hedge stays; nothing is summarised, added or softened.
**The English is the translation source; the Arabic, being the original document, decides any divergence** — follow
the Arabic where they differ in substance and record the case in `source_defects`. (`legal.sec.1.lead` changed after
the Urdu line by an owner ruling of 2026-10-23 — «express» acceptance was removed in every language; the precedents
show the current text.)

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Two short sentences rather than a chain; an explicit subject when it changes. Legal
   precision outranks smoothness, but a Turkish legal sentence still reads in one pass.
2. **Who does the verb.** No comma after a plain subject (DN16-r2); no long participial chains; no evidential «-miş».
3. **One term per concept across the whole document.** Decide in stage 1 and list them in `notes`: personal data,
   processing, consent / withdrawal of consent, cookies, tracking, third party, the site / the user, intellectual
   property, disclaimer, terms of use, policy, external link, competent authority, infringement.
4. **The approved frame and the termbase bind byte-identically**; a tm pair is reused verbatim when its English
   recurs. Note: ruling OS19 («mağazanın koşulları», not «politika») is about a *store's* return/shipping rules on the
   stores page. The titles of this site's own legal documents are the standard Turkish document names (Gizlilik
   Politikası, Kullanım Koşulları, Çerez Politikası … as Turkish sites and the KVKK guidance write them) — attest in
   stage 4, and say in `notes` why OS19 does not apply.

## This batch's own traps
- **The law and its date.** «Personal Data Protection Law issued by Royal Decree No. (M/19) dated 9/2/1443 AH
  (16 September 2021) and its Implementing Regulation»: this is a **Saudi** law. Do not let the Turkish name read as
  Türkiye's own KVKK (6698 sayılı Kanun) — name the country («Suudi Arabistan …») where the source names it, and
  attest the form Turkish law-firm or press pages use for the Saudi PDPL and «Kraliyet Kararnamesi», «Uygulama
  Yönetmeliği» in stage 4. Keep «(M/19)» exactly as the English writes it. The Hijri date stays numeric in the
  source's order with the Turkish Hijri marker (lower-case «hicrî/miladi» per tr-events-1), the Gregorian date in
  Turkish order («16 Eylül 2021»), Latin digits.
- **Brand and site name.** «Visit Al-Ahsa» stays Latin, never transliterated; «visit-alahsa.com» and the e-mail are
  byte-identical. Google Analytics, GA4, Google, IP stay as the English writes them; Turkish explains them where the
  English explains them (e.g. «Internet Protocol (IP) address» = the Turkish usual form with «(IP)»).
- **Ordinals `n`** («One» … «Six»; Arabic «أولاً» …) are section numbers before a colon: one consistent Turkish form
  for all six («Birinci bölüm» or «Birinci» …), parallel with the cross-reference in the body («Section Four of this
  document»).
- **Headings and chips** are noun phrases in sentence case (P9), no final stop; the item headings keep «1. ».
- **Bullet items** follow the English's shape (a fragment stays a fragment, a «Right to …: …» label stays a label with
  a colon), one grammatical pattern per list.
- **Address**: the document speaks to the user as «siz» throughout; the site is «site» / «Visit Al-Ahsa» as the
  English alternates. Quotes “…”; no Markdown, no links (the e-mail link is the template's).
- **`legal.updated`**: «Son güncelleme: 10 Temmuz 2026» shape (the visa page's line is «Son güncelleme: 17 Ekim
  2026»). **`legal.copyright`**: the Turkish copyright line «© 2026 Visit Al-Ahsa. Tüm hakları saklıdır. |
  visit-alahsa.com» shape.
- **`legal.seoDesc`**: one sentence listing the six documents in the order of the page; no length guard, but keep it
  near the English length (≤160 characters).

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-legal-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-legal-1`. Stage outputs go in `BATCH\stages\` with the file name your message
  gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-legal-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it. (The SPELLING rule flags «q w x sh kh th dh» inside words; a Latin brand in
  `pack.latinNames` or a capitalised word copied from the English passes.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-visa-1`). **A ruling supersedes any
   role-file sentence that still calls the item open**; a ruling with `superseded_by` is replaced by the named one.
   `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` the original document and arbiter; `ctx`; `precedent` = published
   zh/de/ru/ur (for understanding, never copied; the German and Russian blocks show the legal register). `ref.json`:
   the approved tr frame strings. Template `REPO\src\components\views\LegalView.astro`, data `REPO\src\data\legal.ts`.
5. Site rules: invent nothing; Latin digits; plain text; «Visit Al-Ahsa» Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-legal-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 117 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit with full before/after text
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII. Leave no scratch files in BATCH.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
