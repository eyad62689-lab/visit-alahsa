# Batch `tr-static-1` — the Turkish UNESCO, report and terrain-map pages (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
Four pages, published already in ar/en/zh/de/ru/ur from the same sources, built now in Turkish. **35 strings** in
`pack.json`, in page order:
- **`/tr/unesco/`** — `unesco.*` (8, the `localize()` block of UnescoView, unit `unesco`): «Al-Ahsa Oasis on the World
  Heritage List» — H1, the lead (with the component count), the caption word «Component» printed on each of the six
  cards, the «Official source» box (heading, paragraph, external link) and `seoTitle`/`seoDesc`. Around them the page
  prints published Turkish: the eyebrow «UNESCO Dünya Mirası alanı · 2018» (`ref.ui home.hero.eyebrow`), the six
  component titles and summaries (`ref.unesco_components`), the category labels (`ref.categories`).
- **`/tr/report/`** — `report.*` (11, ReportView, unit `report`) + `ui.form.honeypot`: «Report an error», a form with
  three fields (the page concerned / what error / email, optional), a submit button and a note. Reached from the
  approved «Hatalı bir bilgi mi fark ettiniz? Bize bildirin» on every landmark page and the footer «Hata bildirin».
- **`/tr/report/thanks/`** — `thanks.*` (3, ReportThanksView, unit `thanks`): H1, paragraph, the button home.
- **`/tr/terrain-map/`** — `ui.tmap.*` (12 keys of `src/i18n/ui.ts`, unit `tmap`): the 3D terrain map — H1, lead,
  the open button, the loading text, the 3D/2D toggle, the per-landmark «show on map» button, the list heading, the
  link to the classic map, three gesture hints. Around them: the eyebrow «Gezi rehberi», the popup link «Sayfasına
  gidin →», the 59 landmark titles (`ref.all_places`) and categories. The map page links here with the approved
  **«3D arazi haritası →»** (`ref.ui map.terrain`) — that link now opens this Turkish page, so the page name agrees.

**Read `ctx` for every string — it was written from the component code** (what renders where, what precedes and
follows, which element is a label, a button, an aria-label or a placeholder). The `unit` field names the judge's
scoring unit.

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Two short sentences rather than a chain; an explicit subject when it changes.
2. **The English is the translation source.** Where the Arabic differs (the UNESCO lead has an SEO phrase the English
   lacks), follow the English and put the divergence in `source_defects`. The Arabic is the arbiter for a fact the
   English leaves ambiguous.
3. **Who does the verb.** No comma after a plain subject (DN16-r2: only where two names fuse, a pronoun would read
   as a demonstrative, or the subject fuses with its possessed object); no long participial chains.
4. **Buttons and action aria-labels are polite-plural imperatives** (UI1-controls); headings, labels and nouns are
   not. No final stop on a button, label, heading or placeholder that has none in English.
5. **The approved frame binds byte-identically** where a batch string names the same thing — `ref.ui`: «Hata
   bildirin» (foot.l.report), «UNESCO Dünya Mirası» (foot.l.unesco), «bileşen» (det.unesco «UNESCO Dünya Mirası
   alanının bileşenlerinden biri»), «UNESCO Dünya Mirası Listesi» (fact.unesco.l), «3D arazi haritası»
   (map.terrain), «Gezilecek yerler haritası» (map.title), «Gezilecek yerler» (nav.attractions), «Ana sayfa»
   (crumb.home). The tm pair is reused verbatim when its English recurs («on iki bileşen…»).

## This batch's own traps
- **Placeholders, exactly once each**: `unesco.lead` carries `{comps.length}` (the digit 6 at build time — write the
  number before its noun, singular after a number: «… {comps.length} bileşen …» or a shape that reads after «6»);
  `unesco.seoDesc` carries `{comps.length}` and `{names}` (the six Turkish component titles joined by «, », placed
  at the end after a colon as in the English). Never translate or move a placeholder into a suffix position that
  breaks after «6» («6'sı» needs the apostrophe P8 — avoid).
- **Constants, byte-identical**: «↗» at the end of `unesco.officialLink`; «1563» and «2018»; «name@example.com»
  (`report.emailPh`); «Ctrl» (`ui.tmap.gest.win`; Turkish keyboards print Ctrl); «⌘» (`ui.tmap.gest.mac`); «3D» /
  «2D» with Latin capitals. `ui.form.honeypot` ends with «: » (colon + space) — the input follows it directly.
- **«twelve» in words** («on iki»), as det.unesco/tm write it; «component» = «bileşen» everywhere (the card caption
  capitalised «Bileşen»).
- **UNESCO institution name**: «UNESCO World Heritage Centre» — attest the Turkish name in stage 4 (tr.wikipedia,
  UNESCO Türkiye Millî Komisyonu); if attested, new termbase entry; otherwise the plain descriptive form.
- **The site's own word for itself** («this guide», «the Al-Ahsa guide», «the site team»): find how the approved
  frame and tm say it (`ref.ui`, `ref.tm`: «rehber», «Visit Al-Ahsa ekibi»?) and follow; the brand «Visit Al-Ahsa»
  stays Latin; El-Ahsa with apostrophe suffixes (P8).
- **«click or tap»** (`ui.tmap.lead`): the map batch solved it in `ref.ui map.lead.a` («… bilgi kartını açın») — one
  verb that covers mouse and touch; reuse the solution, no touch-only verb.
- **Jabal Al-Qarah** = «Cebel el-Kare» (termbase), byte-identical; «palm groves» = «hurmalıklar» or the tm's form;
  «dunes to the east».
- **H1 vs the link that leads to the page**: `ui.tmap.title` agrees with «3D arazi haritası»; `report.title` with
  «Hata bildirin»; `unesco.title` with «UNESCO Dünya Mirası» / «El-Ahsa Vahası». `ui.tmap.classic` names the
  classic map so a reader recognises «Gezilecek yerler haritası».
- **Parallel sets**: `ui.tmap.3d.on`/`3d.off`; the three `ui.tmap.gest.*` (same verb and order); the three report
  field labels.
- **The report page promises**: we review and correct; the report is not published; a reply only if an email is
  given. No new promise (no time frame, no «within 24 hours»).
- **`seoTitle`**: no dash inside (the layout appends the separator and the brand).
- **Register**: plain, warm, exact; no «eşsiz»/«büyüleyici»/«muhteşem»; sentence case (P9); quotes “…”; Latin digits.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-unesco-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-static-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-static-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it. (The SPELLING rule flags «q w x sh kh th dh» inside words; a Latin constant it does not
  know is then the judge's call.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1` …
   `tr-dining-2`). **A ruling supersedes any role-file sentence that still calls the item open**; a ruling with
   `superseded_by` is replaced by the named one. `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `allowNums`; `constants`; `unit`;
   `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr
   frame), `unesco_components`, `all_places`, `categories`, `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; plain text — no links, no bold, no lists; «Visit Al-Ahsa» Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-static-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 35 … },
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
