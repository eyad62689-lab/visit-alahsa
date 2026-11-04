# Batch `tr-stores-1` — the Turkish online-stores directory (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
One page, published already in ar/en/zh/de/ru/ur from the same data, built now in Turkish: **`/tr/online-stores/`**,
the directory of 39 Al-Ahsa online stores (dates, crafts, other products). **157 strings** in `pack.json`:
- **`ui.stores.*`** (14 keys of `src/i18n/ui.ts`, unit `ui`): the «All» chip, the filter and search labels, the search
  placeholder, the no-result line, the two card buttons (store / Instagram account) and the Instagram note, the
  screen-reader word «Platform», the disclaimer, the FAQ heading, the lead (carries `{n}`), the two alt texts
  (carry `{name}`).
- **`data.seo.*`** (H1, tab title — also the footer link label —, meta description) and **`data.sections.<id>.title`**
  (the three section titles: chips and H2s) — unit `seo`.
- **`data.store.<id>.name / .platform / .description`** for the 39 stores — units `dates` (15 stores), `crafts` (7),
  `other` (17).
- **`data.faq.<i>.q / .a`** — the ten FAQ (visible and FAQPage JSON-LD), unit `faq`.

The frame around them is published Turkish (`ref.ui`): the header/footer link «Çevrim içi mağazalar» (nav.stores),
«Sıkça sorulan sorular» (det.faq). **Read `ctx` for every string — it was written from the component code.**

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Two short sentences rather than a chain; an explicit subject when it changes.
2. **The English is the translation source.** Where the Arabic differs, follow the English and put the divergence in
   `source_defects`. The Arabic is the arbiter for a fact the English leaves ambiguous, and the source of every
   transliterated spelling.
3. **Who does the verb.** No comma after a plain subject (DN16-r2: only where two names fuse, a pronoun would read as a
   demonstrative, or the subject fuses with its possessed object); no long participial chains; no evidential «-miş»
   on a card (SD rulings).
4. **Buttons and action aria-labels are polite-plural imperatives** (UI1-controls) or the site's noun phrase;
   headings, labels and nouns are not. No final stop on a button, label, heading or placeholder that has none in
   English.
5. **The approved frame and the termbase bind byte-identically**; a tm pair is reused verbatim when its English
   recurs.

## This batch's own traps
- **Store names are brands** (`data.store.*.name`). The English decides the STRUCTURE (which words are translated —
  Dates, Factory, Store, Farm(s), Orchards, Prayer Beads, Royal, Premium, Markets, Coffee Roasters, Shops — and which
  are transliterated); the Arabic decides the SPELLING of the transliterated part by P1 (Turkish Arabic-name
  conventions as the termbase writes them: «El-», «Es-», «İbn», «Abdullatif»…; the Russian precedent shows where the
  sister line drew the line between translated and transliterated). A Latin brand the store writes in Latin stays
  byte-identical («LANT», «Flower Hasa»). Bracketed owner names stay bracketed. Every name you settle goes into
  `termbase_proposals` (kind `brand`, source «the store's own name, stores-directory.ar.json»). One form per store.
- **Platforms**: «Salla», «Zid», «Instagram» are Latin brands, byte-identical. «Independent website» is translated;
  «Salla, via the Mahally directory» = one Turkish form used on all its cards («Mahally» Latin). Social accounts
  (X, Instagram, Snapchat, TikTok, WhatsApp) Latin as the English.
- **Published product names bind** (`ref.terms`, `ref.tm`): «Halas» (Khalas), «Şişi», «Raziz», «Gar» (Ghar), «hurma
  pekmezi» (date molasses; «(dibs)» once only where the line needs the local word), «sadeyağ» (ghee), «sırma»
  (zari), «El-Ahsa bişti» (Hasawi bisht; bisht = «bişt»), «kurutulmuş misket limonu (lomi)» / «misket limonu» (Hasawi
  lime, lumi — never black, never «limon» alone, A11-lime), «El-Ahsa macbusu» (majbous; «mecbus» is avoided),
  «nitelikli kahve» (specialty coffee). **Rice here is the grain sold in bags: «El-Ahsa pirinci» / «El-Ahsa kırmızı
  pirinci»** (tm) — the dish «El-Ahsa pilavı» is the restaurant cards' word, not this page's. Varieties not in the
  termbase (Sukkari, Saqai, Ajwa, Halibi, Qulla, Shanna) are transliterated from the Arabic by P1 and proposed in
  `termbase_proposals`; attest a Turkish form where one exists (Ajwa is sold in Türkiye — stage 4 checks).
  maamoul, halqoum, maaboj, mashalih, iqal, faturan, yusr: a Turkish noun the reader knows first where the English
  glosses it, the local word once in brackets where the reader needs it (precedent «hurma pekmezi (dibs)»); no gloss
  invented beyond the English's.
- **Hasawi + noun = «El-Ahsa» + noun** (A9), no demonym («El-Ahsalı» is for people). «the Arabian Gulf states» =
  «Arap Körfezi ülkeleri» (or the tm's form); «Saudi Arabia» = «Suudi Arabistan»; «Al-Ahsa Governorate» = «El-Ahsa
  Valiliği» only where the English names the governorate; «Hofuf» = «Hüfuf».
- **Facts verbatim**: founding years (2011, 1995, 1993, 2016, 1957, 2015), «more than 27,000 followers» (Turkish
  27.000), «about eight months ago», «out of stock at the time of checking», «states it was founded in 1993» (the
  hedge stays), «not exclusively», «The product details were not read in full» (the hedge stays), «rated highly by
  buyers». Neutral directory tone: no price, no verdict, no recommendation, nothing added.
- **FAQ**: translate what the English says, every claim and hedge as written. Where the English claims more than the
  page's own disclaimer (`ui.stores.disclaimer`: the directory is for information only) — «guaranteed authenticity»,
  «verified», «approved platforms», «trusted platforms» — keep the English claim and record it in `source_defects`
  for the owner (do not soften it silently). Each answer stands alone. «the Visit Al-Ahsa directory» — «Visit
  Al-Ahsa» Latin, with an apostrophe suffix where one is needed (P8). The UNESCO list of the bisht: «UNESCO Somut
  Olmayan Kültürel Miras» — attest the list's Turkish name in stage 4 (UNESCO Türkiye Millî Komisyonu). The
  «National Center for Palms and Dates» — attest a Turkish rendering or translate descriptively; propose a term.
- **Placeholders, exactly once each**: `ui.stores.lead` `{n}` (a digit at build time; singular noun after it, no
  suffix on the placeholder); `ui.stores.shotAlt` and `ui.stores.logoAlt` `{name}` (a store name ending in any letter
  — no suffix on it: build the phrase so the name stands bare, e.g. «{name} mağaza vitrini» or «{name}: …»).
- **`data.seo.title_tag`**: no dash inside; it is also the footer link text.
- **Parallel sets**: the two card buttons; the three section titles; the two alt texts.
- **Register**: plain, neutral, exact; no «eşsiz»/«büyüleyici»/«muhteşem»; sentence case (P9) for headings; quotes
  “…”; Latin digits; siz where the reader is addressed.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-pages-2`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-stores-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-stores-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it. (The SPELLING rule flags «q w x sh kh th dh» inside words; a Latin brand in
  `pack.latinNames` or a capitalised word copied from the English passes.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1` …
   `tr-static-1`). **A ruling supersedes any role-file sentence that still calls the item open**; a ruling with
   `superseded_by` is replaced by the named one. `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `unit`; `precedent` = published
   zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr frame), `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; plain text — no links, no bold, no lists; «Visit Al-Ahsa» Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-stores-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 157 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit with full before/after text
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
