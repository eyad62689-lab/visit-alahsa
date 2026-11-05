# Batch `tr-blog-2` — the Turkish blog: four articles (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The Turkish blog `/tr/blog/` is live since `tr-blog-1` (index, frame, three articles). This batch adds **four
articles**, **53 strings** in `pack.json` (read `ctx` for every string). No ui key: the blog frame is approved and
published (`ref.json → ui`: «Blog», «El-Ahsa blogu», «Yayımlanma tarihi», «Sıkça sorulan sorular», «Bu yerle ilgili
yazılar» …). For each article `src/content/blog/<stem>-en.md`: `title`, `description`, `topic` (eyebrow), `tags.N`
(frontmatter only, rendered nowhere), `faq.N.q` / `faq.N.a` (visible after the article and in FAQPage JSON-LD), and
**`body`** (Markdown).
- `jabal-qarah` — a visitor's guide to Jabal Al-Qarah (`/tr/blog/jabal-al-qarah-guide/`), topic «Al-Ahsa Landmarks».
- `crafts` — the living crafts: bisht, pottery (`/tr/blog/al-ahsa-traditional-crafts/`), topic «Heritage & Crafts».
- `souvenirs` — what to buy, souvenirs and gifts (`/tr/blog/al-ahsa-souvenirs-guide/`), topic «Shopping & Gifts».
- `hasawi-lomi` — the Hasawi lime and its annual exhibition (`/tr/blog/hasawi-lomi-lime/`), topic «From the Oasis's
  Bounty».
The two long articles (the lime's history, Tarafa ibn al-Abd) come in `tr-blog-3`.

## The article body (`<stem>.body`)
- **Structure as in the English, exactly**: the same number of «## » headings, paragraphs (one blank line between),
  list items «- », bold spans «**…**»; italic «*…*» where the English has it. No H1. The checker counts all of these.
- **Links**: every `[text](/en/…/)` becomes `[Turkish text](<target>)` with the target from `pack.json → links`, byte for
  byte (a link to another article goes to its `/tr/blog/…/` path — the three published Turkish articles and the four of
  this batch). The link text that names a landmark is its **published Turkish title** (`ref.json → places[*].title_tr`,
  byte-identical, with a suffix after an apostrophe where Turkish needs one); a link to a page uses that page's
  published name (`ref.json → ui`, e.g. «Harita» nav.map, «Gezinizi planlayın» nav.plan, «El-Ahsa mutfağı» nav.food) —
  or a natural phrase around it, as the English does. A link to a published Turkish article uses its published Turkish
  title (`ref.json → tm` / the tr-blog-1 titles: «El-Ahsa'da bir gün: kısa ziyaretler için günübirlik gezi planı»,
  «El-Ahsa'da 48 saat: vahanın temposunda iki günlük gezi planı») or a natural phrase around it.
- Quotes “…” (never "…" or «»). Latin digits. Hijri years at first mention «1203 / 1788» the way the published Turkish
  bodies write them, lower-case «hicrî/miladi» if spelled out.

## Rulings that bind this batch (beyond the termbase)
- **The tr-blog-1 rulings** (`termbase.json → _meta.batch_rulings → tr-blog-1`, the live ones — a ruling with
  `superseded_by` is replaced): titles in sentence case after the colon (BL1-titles-r2); the times of day Sabah /
  Öğleye doğru / Öğleden sonra / Akşam / Gün batımı (BL1-times-r2); page name + «sayfası», quoted “…” only in FAQs
  (BL1-features-r2); Pratik ipuçları / Pratik bilgiler / Sonuç (BL1-headings); «tarihî» for the old centre, quarter and
  souq (BL1-heritage); «halk çarşıları», «haftada bir kurulan halk çarşıları» (BL1-souqs); no «Kasr İbrahim kalesi»
  (BL1-kasr); «doğu kıyısında açılan ilk liman» (BL1-port-r3); «dağ» beside «Cebel el-Kare» in a body where the English
  says «the mountain» (BL1-qarah-line); BL1-blog-phrases: «doğa harikası», «kesin bilgi için resmî kanallara bakın» for
  the hedge, «(yerel adıyla lomi)» at the first bare «lomi» of an article, **«nakışlayarak» for the bisht only where the
  Arabic of that article says «تُطرَّز»** — where the Arabic says «يُحاك/تُخاط/تُنسج», say what the Arabic says (an
  open owner question asks woven vs stitched: follow each article's Arabic, never harmonise across articles, and
  record the Arabic verb in `notes`).
- **C15**: «dünyanın en büyük vahası» (never «hurma vahası», never «doğal»). **C16**: the caves of Cebel el-Kare are
  **cool in summer and warm in winter** — warmth belongs to winter, never to the night.
- **Cebel el-Kare** (owner rulings 2026-10-22): the cave is «النقا» = termbase «En-Naka mağarası» (never «Nāqa»/«deve»);
  the article gives no hours (it sends the reader to the landmark page) — add none; if a time appears, the published
  Turkish landmark FAQ form is «Her gün 08.00'den 23.00'e kadar açıktır»; Cebel el-Kare is **not** itself a UNESCO component — keep exactly what the English
  says of UNESCO, never strengthen it.
- **The lime**: «El-Ahsa misket limonu» (termbase), the event «Lomi Sergisi» per its termbase entry and the published
  `/tr/events/hasawi-lomi-exhibition/` title (ref), the farm «El-Ahsa Misket Limonu Çiftliği». **Dried lomi is never
  described as black** (site rule) — if a source sentence implies it, write what the Arabic says and record it.
- **«Hasawi»** proper names keep the form the termbase gives (El-Ahsa bişti, El-Ahsa Bişt Festivali …); the adjective in
  running text is «El-Ahsa'ya özgü» / «El-Ahsa» as the termbase rules — never a Turkish «Hasavi» except the brand
  «Lomi Hasavi».
- «Arap Körfezi» for the Gulf. «Google Maps» → «Google Haritalar». UNESCO: «UNESCO Dünya Mirası Listesi» (2018).
- **Nothing invented**: no hours, fees, distances or durations the source does not give; «about» stays approximate.
  The Arabic decides a divergent fact (record it in `source_defects`). Do not add the Friday-evening note for the
  Qaisariyah or any other owner note: a translation follows its source (owner rulings are applied to all languages in a
  later batch).
- Siz throughout, no evidential «-miş» in an instruction, no comma after a plain subject (DN16-r2), split rather than
  chain (one idea per sentence where the English chains three).
- **Brand**: «Visit Al-Ahsa» Latin; it appears in no string of this batch except where the English writes it.

## Decisions to make in stage 1 (and list in `notes`)
- **Topic labels**: «Al-Ahsa Landmarks», «Heritage & Crafts», «Shopping & Gifts», «From the Oasis's Bounty» — short,
  sentence case, in line with «Gezi planları» / «Neden El-Ahsa» of tr-blog-1 (the Arabic decides the name).
- **Tags**: as a Turkish visitor would search, not word-for-word.
- **FAQ questions**: as typed into a search engine; each answer stands on its own.

## Register
A living Turkish travel article (the register of a Turkish travel magazine or a city-guide feature): varied sentence
length, siz, concrete, no promotional padding («mutlaka görülmeli» in every paragraph), no calques of English
connectors. A heading is a phrase in sentence case, no final stop.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-blog-2`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-blog-2`. Stage outputs go in `BATCH\stages\` with the file name your message
  gives you.
- Sources: `REPO\src\content\blog\<stem>-{en,ar,de,ru,ur}.md`; the published Turkish articles
  `REPO\src\content\blog\{24-hours,48-hours,worth-visiting}-tr.md` (the register and the rulings applied); templates
  `REPO\src\components\views\BlogPostView.astro`. The tr-blog-1 record: `REPO\tr-translation\output\tr-blog-1\README.md`.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-blog-2 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. It checks for bodies: hrefs mapped through `pack.links` in
  order, and the structure counts (h2, paragraphs, list items, bold). If a finding looks wrong, do not shape the text
  to it — leave it and report it. (SPELLING flags «q w x sh kh th dh» inside words; a Latin name in `pack.latinNames`
  or a capitalised word copied from the English passes.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-blog-1`). **A ruling supersedes any
   role-file sentence that still calls the item open**; a ruling with `superseded_by` is replaced by the named one.
   `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on names and facts; `ctx`; `precedent` = published zh/de/ru/ur
   (for understanding, never copied; the German and Russian articles show the structure and the link texts).
   `ref.json`: the approved tr frame (`ui`), the linked landmarks (`places`), `terms`, `tm`.
5. Site rules: invent nothing; Latin digits.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-blog-2", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 53 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit with full before/after text
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
A body is one JSON string with `\n` line breaks. A `changes` entry carries the whole string before/after (the checker
compares them with the texts). Write Turkish only with the Write tool, or with a node script that reads an earlier
stage's JSON (never through a shell heredoc or `node -e`). Write the file as soon as the strings are done, before
further checking. Keep console output ASCII. Leave no scratch files in BATCH.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
