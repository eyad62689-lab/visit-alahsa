# Batch `tr-stay-dining-1` — the Turkish stay and dining pages (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
Three pages, published already in ar/en/zh/de/ru/ur from the same sources, built now in Turkish: the stay index
`/tr/stay/`, the single stay page `/tr/stay/alkoot-heritage-hotel/`, and the dining index `/tr/restaurants-cafes/`.
The scope mirrors the Urdu batches ur-stay-1 / ur-dining-1 / ur-dining-2. **174 strings** in `pack.json`:
- unit **`sv`** (22) — the StayView block: hero (kicker, H1, lead = meta description), list heading, the two type
  labels (heritage inn, hotel), the card texts (Google Maps screen-reader note, «details» link, rating label, the
  two «closed» badges), the source line, three FAQ, the «About this page» box.
- unit **`sd`** (5) — the StayDetailView block: back link, breadcrumb index name, «Location» box heading, «About
  this page» heading and paragraph. Its type label and card texts are copied from `sv.*` (same English).
- unit **`sc`** (7) — the two stay cards (`area`, `blurb`, `alt` of Al-Koot Heritage Hotel and Continent Al-Uqair)
  and the body of the Al-Koot page (`sc.alkoot-heritage.body`, the longest string: two paragraphs).
- unit **`dv`** (46) — the DiningView block: hero, three section headings and kickers (restaurants, cafés, red-bread
  bakeries), the bakeries note, the search/filter controls, «open now» badges and toggle, the result count for
  screen readers, the empty message, the source line, seven FAQ (the seventh has two versions: with and without
  fetched Google data), the «About this page» paragraph. `moreLabel newWindow ratingLabel closedPerm closedTemp
  methodH` are copied from `sv.*` — translate them once, in `sv.*`, so they read right on all three pages.
- unit **`dn`** (12) — `DISTRICT_NAMES.tr`: the district select options (and later the «Sights near …» heading).
- unit **`dc`** (82) — the 29 dining cards: `area` (27), `blurb`, `alt` per card.

Around these strings the pages print published Turkish: the header/footer (`nav.stay` «Konaklama», `nav.dine`
«Restoranlar ve kafeler»), the breadcrumb home, «Google Haritalar'da açın ↗» (`det.openMaps`), the footer.
**Read `ctx` for every string — it was written from the component code.**

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Long English chains (the Al-Koot body, the FAQ answers, the method paragraphs) become
   plain sentences with an explicit subject when it changes; no participle chains before the verb; no comma
   between a participle subject and its predicate (E1-subject-comma).
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects`. The Arabic is the arbiter for **name spellings**: a district or
   road new to the termbase is transliterated from the Arabic spelling (P1/P4, the journalistic form as the
   termbase does: «El-Kut», «Er-Rifa», «Ayn en-Necm Yolu», «Arap Körfezi Yolu»), never from the English
   romanisation.
3. **The places' own names stay as they name themselves.** A card title is the place's Latin name (`name_en`) and
   is not in the pack. Wherever a FAQ answer, a blurb or the body names one of these places, write its Latin name
   **byte-identical to its card** (e.g. «Dar Basma», «Bait Al-Koot», «7st», «Al-Koot Heritage Hotel») — no
   Turkish suffix glued without an apostrophe (P8: «Dar Basma'da»), no transliteration of its Arabic name.
4. **Who does the verb.** No ambiguous «onun» (name the owner, D19 of tr-food-1).
5. **Buttons and links are polite-plural imperatives** (UI1-controls); headings, kickers, labels, badges, options
   are nouns in sentence case (P9) with no final stop.
6. **A foreign dish word is defined at its first mention, with no case suffix on it in the running text**
   (D1-r3 of tr-food-1). The dish names the dining FAQ lists are those of the approved food page (`ref.food`):
   reuse them byte-identically — the FAQ points there.
7. **The approved frame binds byte-identically**: `ref.ui` (nav.stay, nav.dine, nav.food, det.openMaps, crumb.home,
   det.faq «Sıkça sorulan sorular» if the H2 is that phrase), `ref.places` (Kasr İbrahim, El-Kaysariye Çarşısı,
   Ukayr Plajı, Ukayr, Cebel el-Kare — and the published area «Hüfuf, Er-Rifa mahallesi»), the termbase names
   (El-Ahsa, Hüfuf, Müberrez, El-Kut, El-Kare, Ayn en-Necm Yolu, Arap Körfezi Yolu, Kral Abdülaziz Yolu, hurma
   ekmeği, haris, mandi, meclis salonu, El-Ahsa Belediyesi, Google Haritalar), the Hasawi rule (A9/A11: «El-Ahsa …»
   for things, never a demonym adjective; «El-Ahsalı» only for persons), «Arap Körfezi».

## This batch's own traps
- **One Turkish form per repeated English, across the three pages.** The type labels, «Rating on Google Maps», the
  two «closed» badges, «Location», «About this page», the district names (the select option `dn.*`, the card area
  lines `dc.*.area` and `dv.faqs.5.a` — one form), «— Hofuf» in the area lines («— Hüfuf»).
- **Red bread = date bread.** `dv.bakeriesNote`, `dv.heroSum`, `dv.faqs.3.*` name both; the build guard C5b pairs
  «red bread» with its canonical name per language — the Turkish canonical is the termbase «hurma ekmeği», and
  «red bread» is already decided by the approved food page (`ref.food` dg.7.pre; termbase gloss): «“Kırmızı
  ekmek”» in quotes, glossed once per page as the other name of «hurma ekmeği» («“Kırmızı ekmek” olarak da
  bilinir»). Follow that pattern; do not coin another. The «Hasawi Red Bread» in a bakery's own Latin name is not
  translated.
- **Screen-reader count.** `dv.countPrefix` + digits + `dv.countSuffix` («Showing 12 of 29») must read as one
  Turkish phrase in that fixed order; `{diningEntries.length}` kept exactly once; no plural after a number.
- **Placeholders**: `{fetchedLabel}` (a date) and `{diningEntries.length}` exactly once each, unchanged.
- **The «per Google Maps» badges** keep the source named; the rating/hours lines say «from Google Maps, may
  change» — never a quality judgement.
- **The Al-Koot body**: the licensing body by its 2018 name (Saudi Commission for Tourism and National Heritage —
  new term, official-name style; the Arabic is the arbiter); the Hijri year as the termbase/memory does («1439
  (2018)» or «hicrî 1439 (miladi 2018)» — `E1-calendar-case-r4` of tr-events-1: a calendar named in running text
  is lower case, «Hicri» only as a date prefix); the princes «Prens Sultan bin Selman», «Prens Suud bin Nayif» (A12:
  no HRH/HH; names as the termbase/memory spell them); «sadu» weaving is a foreign word — define it at its first
  mention (lesson 6). Its facts recur in `sv.faqs.0.a`: byte-identical names.
- **«Heritage inn»** (`sv.kindLabels.heritage-inn`): a restored historic house run as a guesthouse — a plain Turkish
  noun phrase that a Turkish traveller reads naturally on a card (not a brand).
- **Register**: a plain descriptive guide — no «eşsiz»/«büyüleyici»/«muhteşem», no «the best», no recommendation;
  the site's promise (no prices, no stars, no ranking) is kept in its own words.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-stay-dining-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-stay-dining-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-stay-dining-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-events-1`). **A ruling supersedes any
   role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `allowNums`; `unit`; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr frame), `food`
   (the approved food page), `places`, `siblings` (published Turkish with byte-identical English — reuse), `terms`,
   `tm`.
5. Site rules: invent nothing; Latin digits; plain text — no links, no bold, no headings, no lists; the brand
   «Visit Al-Ahsa» stays Latin; «Arap Körfezi».

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-stay-dining-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 174 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
