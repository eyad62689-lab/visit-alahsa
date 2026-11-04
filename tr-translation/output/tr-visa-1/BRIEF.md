# Batch `tr-visa-1` — the Turkish Saudi visit-visa guide (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
One page, published already in ar/en/zh/de/ru/ur from the same record, built now in Turkish: **`/tr/visa-guide/`**,
a short guide to the eight Saudi visit-visa routes for a trip to Al-Ahsa. **138 strings** in `pack.json` (keys and
`ctx` are the sister lines' scheme; read `ctx` for every string):
- `seo.title` (the `<title>` before the brand — **at most 60 characters**, must hold «Saudi visit visa» and
  «Al-Ahsa»), `seo.description` (**140–160 characters**, hard limits — the build guard C28 fails outside them), `h1`,
  `lead`, `feesLine`, `verifyLine`, `updatedLine`.
- `intro.*`, `table.*` (a 4-column table of the eight routes), `routes.<id>.*` (a section per route: heading, «who is
  it for» label + text, validity label + text, the button label), `arrive.*`, `next.*` (five next steps),
  `faq.*` (seven questions — visible and in FAQPage JSON-LD, each answer stands alone), `links.*` (the table of
  official links: route name and issuing authority).
- `ui.foot.l.visa` (the footer link, column «Keşfedin», beside «Ulaşım» = ref.ui foot.l.getThere) and `ui.plan.visa`
  (a button on «Gezinizi planlayın», section on getting there). Today both English strings are «Visa guide».

The frame around the page is published Turkish (`ref.json` → `ui`): eyebrow «Gezinizi planlayın» (nav.plan), «Ana
sayfa» (crumb.home), «Gezilecek yerler», «Etkinlikler», «Konaklama».

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Two short sentences rather than a chain; an explicit subject when it changes.
2. **The English is the translation source.** Where the Arabic differs, follow the English and put the divergence in
   `source_defects`. The Arabic is the arbiter for a fact the English leaves ambiguous, and the source of every
   transliterated spelling.
3. **Who does the verb.** No comma after a plain subject (DN16-r2); no long participial chains; no evidential «-miş».
4. **Buttons are polite-plural imperatives** (UI1-controls) or the site's noun phrase; headings, labels and nouns are
   not. No final stop where the English has none.
5. **The approved frame and the termbase bind byte-identically**; a tm pair is reused verbatim when its English
   recurs (e.g. «Riyad'dan El-Ahsa'ya nasıl gidilir?» shape for travel questions).

## This batch's own traps
- **Links are structure.** Eight strings carry `[text](href)` (`intro.parts`, `arrive.land`, `arrive.more`,
  `next.items.*.parts`). Keep every link in the same order with its **href byte-identical** (the apply tool rebuilds
  the links and maps `/en/…` to `/tr/…` itself); translate only the text inside `[…]`, and build the sentence so the
  bracketed text reads naturally where it stands (Turkish word order may move the link inside the sentence; the
  number and order of links stay). No other Markdown. The checker's `LINK` rule compares the hrefs.
- **Invent nothing; this is a legal-adjacent page.** No fee, no currency, no processing time, no refund rule, no
  doubt words («doğrulanmadı», «teyit edilmedi»…) — the page was rewritten to carry none. The only fee sentence is
  `feesLine`. Durations, counts, ages and dates exactly as the English: «1 year», «90 days», «3 months», «96 hours»
  … with Latin digits. Every hedge and condition stays («may», «check before applying», «if eligible»).
- **Official names.** Saudi ministries in the Turkish form used for foreign ministries: «Suudi Arabistan Dışişleri
  Bakanlığı» / «Dışişleri Bakanlığı» in the table (the English writes the short form — follow it), «Turizm
  Bakanlığı», «Hac ve Umre Bakanlığı»; «King Fahd Causeway» = «Kral Fahd Köprüsü» (termbase) and its authority —
  attest or translate descriptively («Kral Fahd Köprüsü İdaresi» …) in stage 4, propose a term. «Visit Saudi», «Nusuk»
  and the platform hosts (visa.visitsaudi.com, ksavisa.sa …) are Latin brands, byte-identical. «Al-Ahsa International
  Airport» / «King Fahd International Airport» = termbase. Riyadh = «Riyad», Dammam = «Dammam», Bahrain =
  «Bahreyn», Hofuf = «Hüfuf», Saudi Arabia = «Suudi Arabistan».
- **Visa vocabulary.** «eVisa» = the Turkish administrative form «e-Vize» (as Türkiye's own e-Vize system writes
  it; attest in stage 4); «tourist eVisa» = «turist e-Vizesi» or «turistik e-Vize» — one form across the page.
  «Umrah» = «umre» (common noun, lower case; «umre vizesi»), «GCC» = «Körfez İşbirliği Konseyi (KİK)» spelled out
  once, then a consistent short form; «GCC residents» = people *living* in a GCC state with a residence permit
  («ikamet izni»), not citizens. «Schengen», «UK», «US», «EU» as Turkish writes them («Schengen», «Birleşik
  Krallık», «ABD», «AB»). «Stopover (transit)» — keep the English's bracket logic: a Turkish word plus the term the
  airlines' Turkish pages use («aktarma», «transit»); attest. «Electronic Travel Authorisation» = the Turkish
  rendering of ETA as attested; «multiple entry» = «çoklu giriş», «single entry» = «tek giriş».
  «host» (who starts a family/business visit application) = «ev sahibi» for family, the inviting company for
  business only if the English says so — otherwise one neutral word.
- **`updatedLine`** «Son güncelleme: 17 Ekim 2026» shape (date in Turkish order, Latin digits). It also feeds a
  constant the guard C28 reads verbatim — one exact form.
- **FAQ** as real Turkish search queries (`ctx`); each answer stands alone and keeps every condition.
- **«Al-Ahsa»** = «El-Ahsa» with an apostrophe before a suffix (P2, P8). «Visit Al-Ahsa» Latin.
- **Register**: plain, exact, siz; sentence case (P9) for headings; quotes “…”; no «eşsiz»/«büyüleyici».
- **The two ui strings** are short labels parallel with the footer's sibling «Ulaşım»: no stop.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-visa-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-visa-1`. Stage outputs go in `BATCH\stages\` with the file name your message
  gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-visa-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it. (The SPELLING rule flags «q w x sh kh th dh» inside words; a Latin brand in
  `pack.latinNames` or a capitalised word copied from the English passes.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-stores-1`). **A ruling supersedes any
   role-file sentence that still calls the item open**; a ruling with `superseded_by` is replaced by the named one.
   `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `unit`; `precedent` = published zh/de/ru/ur (for
   understanding, never copied). `ref.json`: the approved tr frame strings.
5. Site rules: invent nothing; Latin digits; plain text except the eight strings' links; «Visit Al-Ahsa» Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-visa-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 138 … },
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
