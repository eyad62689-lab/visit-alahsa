# Batch `tr-leisure-fruits-1` — the Turkish souqs/parks/farms index and the fruits page (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
Two pages, published already in ar/en/zh/de/ru/ur from the same sources, built now in Turkish. **114 strings** in
`pack.json`:
- **`/tr/souqs-parks-farms/`** — `ui.list2.*` (3 keys of `src/i18n/ui.ts`, unit `leisure`): the kicker, H1 and lead
  of the leisure index (AttractionsView in its `leisure` scope). Around them the page prints published Turkish: the
  18–19 landmark cards (`ref.leisure_cards`: title_tr/summary_tr), the category labels (`ref.categories` market /
  parks / farm), the approved «Tümü», the search box («Gezilecek yer arayın…»), the map link.
- **`/tr/fruits/`** — unit `fv` (the FruitsView block, 22 strings: hero kicker/H1/lead, two stat labels, the
  filter section, five season chips, the tags «Pending confirmation»/«Nearly extinct», the toggle, the empty
  message, the screen-reader count prefix, the method note; + the meta description `fv.description`; + the three
  seasons-table heads `fv.heads.*`; + the two oasis-facts strings the page prints, `of.fruitTrees.short` (the big
  number «400K») and `of.fruitsStatsSrc` (the sources line), both English placeholders today) and unit `fg`
  (`FRUIT_GROUPS`, 81 strings: 4 group titles, 1 intro, 15 fruits × alt/k/name/season/pre, plus one `sci` Latin
  name and its `post`). The published Turkish number «2,5 milyon» (`ref.oasis.palms_short`) prints as the first stat.

**Read `ctx` for every string — it was written from the component code** (what renders where: a card kicker, a
season pill that is also a table cell, an alt text, a toggle, an aria-label of a chip group). `unit` names the
judge's scoring unit.

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** The 15 card descriptions (`fg.*.pre`) and the dates intro are long: two or three
   plain sentences each, an explicit subject when it changes, no participle chains before the verb.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects`. The Arabic is the arbiter for **name spellings**: every variety
   name (Khalas = termbase «Halas»; Shishi, Razeez, Barhi, Tayyar, Mignaz, Ghar, Khneizi, Umm Rahim, Zamli, Hilali,
   Shubaibi, Shahl, Wusaili, Hatimi, Kasbi …; Bin Zuhairi; Suwari = «Suvari»; kanar; the dish words sifsif, dibs,
   jameed; the cultivar names of the kanar «Tuffahi», «Umm Sulaim», «Sini») is transliterated from the Arabic
   spelling in the plain journalistic form (P1/P4: ق→k, ج→c, ش→ş, خ→h, no circumflex, no ʿayn mark), never from
   the English romanisation («q», «kh», «sh», «th», «dh» never inside a Turkish word — the checker flags them).
3. **Who does the verb.** No «eski» before a proper name; no «yer almak» opening a heading; no comma between a
   participle subject and its predicate.
4. **Buttons and action labels are polite-plural imperatives** (UI1-controls: `fv.more`/`fv.less`, `fv.frLead`);
   headings, chips, tags and column heads are nouns in sentence case (P9); no final stop on any of them.
5. **The approved frame binds byte-identically**: «Gezi rehberi» (`ui.map.eyebrow`/`list.eyebrow` for the same
   English «Visit guide»), «Vaha meyveleri» (`nav.fruits`), «Çarşı, park ve çiftlikler» (`nav.leisure`), «Çarşılar
   ve parklar» (`crumb.leisure`), the category labels, «Teyit bekleniyor» (A12-P6-card: the card value for
   "Pending confirmation" — `fv.pending` byte-identical), «Guinness Dünya Rekorları», «Suudi Basın Ajansı (SPA)»
   (T3), «misket limonu» (A11-lime), «Halas», «kanar», «Suvari narı» / «“Suvari” nar çeşidi» at first mention
   (M5-r3), «El-Ahsa inciri», «hurma» for date, the fixed phrase «dünyanın en büyük vahası» (C15 — never hurma
   before vaha, never doğal), «El-Ahsa» (P2), the Hasawi rule (A9/A11: «El-Ahsa …» for things, never a demonym).

## This batch's own traps
- **The stage words of the date**: the English uses «rutab» (the fresh, soft stage) and «full dates»/«tamr» (the
  ripe dried stage) in the season pills and descriptions, and «balah (bisr)» for the yellow crunchy stage. Rule one
  Turkish form for each on the whole page, used identically in every pill and description and in `fv.heroSum`;
  gloss each once at its first mention in running text (not in a pill), as the de precedent does («Tamr (die
  reife, getrocknete Dattel)»). No Turkish word that claims a fact the English does not (TDK «hurma» is the fruit;
  «yaş hurma»/«taze hurma» for rutab is a description, not a name — the quoted Arabic word may stay).
- **Season pills** (`fg.*.season`): compact labels, not sentences: stage word + colon, month names in lower case
  (TDK: «temmuz ortası – ağustos sonu»), «•» kept, «c.»/«around» = «yaklaşık», ranges exactly as the English
  («15–25 Eylül»? — a date range inside a month: TDK writes «15–25 Eylül» with the month capitalised in a date);
  every digit as the English (the checker holds digits to the two sources). The same pill prints in the seasons
  table, so it must read in a table cell too.
- **Numbers in the descriptions**: percentages «%15–20» (Turkish puts the sign before the number: «%15–20»),
  «25–30 kg», «100.000» (thousands with a point), «127», years «2021», «19. yüzyılın sonlarında» for «the late
  nineteenth century». Latin digits; the checker allows digits present in the English or Arabic.
- **Institutions**: «Saudi Press Agency (October 2024)» = «Suudi Basın Ajansı (SPA)» with the month in the sentence
  (calibration «Citation form (in-text year)»: no bracketed year after a source name — «SPA Ekim 2024'te … bildirdi»);
  «the Palms and Dates Center in Al-Ahsa» — a new institution for stage 4 to attest (its own Turkish/English name)
  or to render descriptively with `unattested`; «Ministry of Environment, Water and Agriculture» = termbase
  («Çevre, Su ve Tarım Bakanlığı»; the home batch wrote «Suudi Arabistan'ın Çevre, Su ve Tarım Bakanlığı» in the
  sources line — follow that form in `of.fruitsStatsSrc`); «Guinness World Records» = «Guinness Dünya Rekorları».
- **Places**: Iraq = «Irak», Qassim = «Kasım» collides with the month — write «Kasım bölgesi» or the exonym the
  termbase/tr.wikipedia gives («Kasım» is tr.wikipedia's title for the region: stage 4 attests; the collision with
  the month name must be defused in the sentence, not by respelling); Hofuf = «Hüfuf».
- **The Latin scientific name** (`fg.2.f2.sci`) is byte-identical in every language and sits inside the sentence
  between `pre` and `post`: keep the three pieces grammatical as one sentence (keepSpace on the edges).
- **Alt texts** describe the photo in one phrase (what is in the picture — bowls, a cluster, a cut half), no claim
  beyond the English, no final stop.
- **Pending/rare tags**: `fv.pending` = «Teyit bekleniyor» byte-identical (A12-P6-card); `fv.rare` «Nearly
  extinct» for the Suwari pomegranate — two words, no final stop. P6 stays open as a termbase item (the card value
  is fixed; the formula for running text is not).
- **Chips**: «All seasons» + the four seasons as capitalised button labels («Tüm mevsimler», «Kış», «İlkbahar»,
  «Yaz», «Sonbahar»); `fv.chipsAria` a noun phrase (M1-r3 pattern: «… için mevsim filtreleri»).
- **`fv.countPrefix`** ends with a colon and a space (keepSpace); `of.fruitTrees.short` is a display number («400
  bin» — the count-up script animates the first number and keeps the word).
- **Register**: a warm, exact fruit guide — no «eşsiz»/«büyüleyici»/«muhteşem», no brochure cheers, no fact the
  source does not carry; hedges kept exactly («relatively rare today», «described as among the finest»).
- Links: the leisure index's map link goes to `/tr/map/` (built); the fruits page links nowhere in its text.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-lf` (branch `i18n/tr-leisure-fruits-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-leisure-fruits-1`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-lf node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-leisure-fruits-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it. (The SPELLING rule flags «q w x sh kh th dh» inside words: a transliteration that keeps
  an English «kh»/«sh» is a real fault; a Latin brand or scientific name is the judge's call.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1`, `tr-attr-1` … `tr-attr-12`, `tr-trails-1`,
   `tr-home-1`, `tr-map-plan-1`). **A ruling supersedes any role-file sentence that still calls the item open.**
   `_meta.open_items` (P6 P7 P11 P12) are not decided silently — P7 (the dried lime: «kurutulmuş limon», never
   «kara limon») is touched by the lime description: apply the site rule, raise P7 in stage 4.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `allowNums`; `keepSpace`; `unit`;
   `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr
   frame), `home`, `categories`, `leisure_cards`, `oasis`, `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; "the largest oasis in the world" (never palm/natural); the dried lime
   is never «black»; plain text — no links, no bold, no headings, no lists; the brand «Visit Al-Ahsa» stays Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-leisure-fruits-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 114 … },
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
