# Batch `tr-blog-1` — the Turkish blog: index frame and three articles (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The blog, published already in ar/en/zh/de/ru/ur, built now in Turkish under **`/tr/blog/`**. **43 strings** in
`pack.json` (keys are the Urdu blog packs' scheme; read `ctx` for every string):
1. **Blog frame** — ten `ui.*` keys of `src/i18n/ui.ts`: `ui.crumb.blog` (breadcrumb name of the blog), `ui.blog.eyebrow`
   (small label above the index H1), `ui.blog.title` (index H1 and tab), `ui.blog.lead` (index lead AND meta description),
   `ui.blog.empty` (never rendered), `ui.blog.published` / `ui.blog.updated` (labels before the dates in an article
   header), `ui.blog.back` (button back to the index), `ui.blog.faq` (H2 of an article's questions), and
   `ui.det.mentions.h` (H2 on a landmark page listing the Turkish articles that link it).
2. **Three articles** `src/content/blog/<stem>-en.md`; for each: `title`, `description`, `topic` (eyebrow), `tags.N`
   (stored in the frontmatter, rendered nowhere today), `faq.N.q` / `faq.N.a` (visible after the article and in FAQPage JSON-LD), and **`body`**
   (Markdown).
   - `24-hours` — one day in Al-Ahsa (`/tr/blog/one-day-in-al-ahsa/`), topic «Itineraries».
   - `48-hours` — 48 hours in Al-Ahsa (`/tr/blog/48-hours-in-al-ahsa/`), topic «Itineraries» (one label for both).
   - `worth-visiting` — is Al-Ahsa worth visiting? (`/tr/blog/is-al-ahsa-worth-visiting/`), topic «Why Al-Ahsa».
   The six other articles come in `tr-blog-2`; until then the Turkish index shows their English cards.

## The article body (`<stem>.body`)
- **Structure as in the English, exactly**: the same number of «## » headings, paragraphs (one blank line between),
  list items «- », bold spans «**…**»; italic «*…*» where the English has it. No H1. The checker counts all of these.
- **Links**: every `[text](/en/…/)` becomes `[Turkish text](<target>)` with the target from `pack.json → links`, byte for
  byte (all targets are built in Turkish; a link to another article goes to its `/tr/blog/…/` path). The link text that
  names a landmark is its **published Turkish title** (`ref.json → places[*].title_tr`, byte-identical, with a suffix
  after an apostrophe where Turkish needs one); a link to a page uses that page's published name (`ref.json → ui`:
  «Kayıtlı yerlerim» nav.myTrip, «Gezinizi planlayın» nav.plan, «Harita» nav.map, «Restoranlar ve kafeler» nav.dine,
  «Çarşı, park ve çiftlikler» nav.leisure, «El-Ahsa mutfağı» nav.food) — or a natural phrase around it, as the English
  does («the “Restaurants & cafés” guide»).
- Quotes “…” (never "…" or «»). Latin digits. Hijri years at first mention «1203 / 1788» the way the published Turkish
  landmark bodies write them (tm, ref.places), lower-case «hicrî/miladi» if spelled out (tr-events-1).

## Rulings that bind this batch (beyond the termbase)
- **C15**: «dünyanın en büyük vahası» (never «hurma vahası», never «doğal»). **C16**: the caves of Cebel el-Kare are
  **cool in summer and warm in winter** — warmth belongs to winter, never to the night.
- **«Cebel el-Kare»** stays the bare name (tr-attr-5: «Cebel X» without a gloss). Three earlier readers took «Kare» for
  "square" — do not add a gloss in a title; in a body, the English's own description («the geological wonder…», «the
  mountain») carries the meaning; keep it close to the name.
- «Arap Körfezi» for the Gulf. «Google Maps» → the termbase form «Google Haritalar» when the English names the app.
  UNESCO: the termbase «UNESCO Dünya Mirası Listesi» / «UNESCO Dünya Mirası» (2018).
- **Nothing invented**: no hours, fees, distances or durations the source does not give; «about» stays approximate.
  The Arabic decides a divergent fact (record it in `source_defects`).
- Siz throughout, no evidential «-miş» in an instruction, no comma after a plain subject (DN16-r2), split rather than
  chain (one idea per sentence where the English chains three).
- **Brand**: «Visit Al-Ahsa» Latin; it appears in no string of this batch except where the English writes it.

## Frame decisions to make in stage 1 (and list in `notes`)
- **The blog's name**: the header/footer link is the approved «Blog» (nav.blog); `ui.crumb.blog` takes it unless you
  give a reason. `ui.blog.title` is the index H1 (English «The Al-Ahsa Blog»); `ui.blog.back` = a link back to the
  index with «→» after the text, consistent with that name.
- `ui.blog.faq` = the approved «Sıkça sorulan sorular» (det.faq) — byte-identical.
- `ui.blog.published` / `ui.blog.updated`: labels the template follows with a Turkish date («22 Ağustos 2026»); pick a
  form that reads before a date («Yayımlanma: …» or «Yayımlandı …» — decide and attest).
- **Topic labels**: «Itineraries» (one label shared by two articles) and «Why Al-Ahsa»; short, sentence case.
- **Tags**: as a Turkish visitor would search («El-Ahsa'da bir gün», …), not word-for-word.
- **FAQ questions**: as typed into a search engine; each answer stands on its own (it is read in search results
  without the article).

## Register
A living Turkish travel article (the register of a Turkish travel magazine or a city-guide feature): varied sentence
length, siz, concrete, no promotional padding («mutlaka görülmeli» in every paragraph), no calques of English
connectors. A heading is a phrase in sentence case, no final stop.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-blog-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-blog-1`. Stage outputs go in `BATCH\stages\` with the file name your message
  gives you. (`stages\00-dry-en.json` is the English dry run of the build — not a stage to start from.)
- Sources: `REPO\src\content\blog\<stem>-{en,ar,de,ru,ur}.md`; templates `REPO\src\components\views\BlogIndexView.astro`,
  `BlogPostView.astro`.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-blog-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. It checks for bodies: hrefs mapped through `pack.links` in
  order, and the structure counts (h2, paragraphs, list items, bold). If a finding looks wrong, do not shape the text
  to it — leave it and report it. (SPELLING flags «q w x sh kh th dh» inside words; a Latin name in `pack.latinNames`
  or a capitalised word copied from the English passes.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-legal-1`). **A ruling supersedes any
   role-file sentence that still calls the item open**; a ruling with `superseded_by` is replaced by the named one.
   `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on names and facts; `ctx`; `precedent` = published zh/de/ru/ur
   (for understanding, never copied; the German and Russian articles show the structure and the link texts).
   `ref.json`: the approved tr frame (`ui`), the linked landmarks (`places`), `terms`, `tm`.
5. Site rules: invent nothing; Latin digits.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-blog-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 43 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit with full before/after text
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
A body is one JSON string with `\n` line breaks. A `changes` entry on a body may carry the whole body before/after.
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII. Leave no scratch files in BATCH.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
