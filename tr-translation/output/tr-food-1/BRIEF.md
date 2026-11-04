# Batch `tr-food-1` — the Turkish food page /tr/food/ (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
One page, published already in ar/en/zh/de/ru/ur from the same sources, built now in Turkish. **44 strings** in
`pack.json`:
- unit **`fd`** — the FoodView block (11 strings: hero kicker/H1/lead, the grid kicker and H2, the «Read more» /
  «Hide description» toggle, the method note H2 + two paragraphs, the closing link to the restaurants list) and
  the meta description `fd.description`.
- unit **`dg`** — `DISH_GROUPS` (32 strings): eight dish cards × kicker `k` / name / photo alt / description `pre`.
  The group has no title; the dish name is the card's H3. Cards: 1 Hasawi rice, 2 mandi, 3 harees, 4 mufallaq
  (main dishes); 5 balaleet with date syrup, 6 date asida, 7 sago (sweets); 8 date bread (bread).

Around them the page prints published Turkish: the header/footer (`nav.food` = «El-Ahsa mutfağı»), the breadcrumb
home, the footer. **Read `ctx` for every string — it was written from the component code.** `unit` names the
judge's scoring unit.

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** The eight descriptions are long and literary: two or three plain sentences each, an
   explicit subject when it changes, no participle chains before the verb.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects`. The Arabic is the arbiter for **name spellings**: every dish
   word new to the termbase (mandi, mufallaq, jareesh, asida, sago) is transliterated from the Arabic spelling in
   the plain journalistic form (P1/P4: ق→k, ج→c, ش→ş, خ→h; no circumflex, no ʿayn mark), never from the English
   romanisation («q kh sh th dh» never inside a Turkish word — the checker flags them) — **unless Turkish has its
   own established word for that very dish or ingredient** (sago: Turkish «sagu»? — stage 4 attests from TDK /
   Nişanyan / a Turkish recipe press; cracked wheat: «yarma» or «dövme buğday» are the Turkish words for the
   ingredient, «jareesh» the bracketed Arabic name as the English brackets it).
3. **Who does the verb.** No comma between a participle subject and its predicate; no «yer almak» opening a
   heading; the dish is the subject of its card unless the English makes the people the subject.
4. **Buttons are polite-plural imperatives** (UI1-controls); headings, kickers, the dish names are nouns in
   sentence case (P9); no final stop on any of them.
5. **The approved frame binds byte-identically**: «El-Ahsa mutfağı» (termbase, `ui.nav.food`, ruling UI1-hasawi —
   the H1 `fd.title` for the same English «Hasawi Cuisine»), the toggle pair of the fruits page (`ref.fruits`
   fv.more / fv.less — the same English, the same button), «Restoranlar ve kafeler» (`ui.nav.dine`), «haris»,
   «balalit», «hurma ekmeği» (termbase), «misket limonu» (A11-lime; «(lomi)» Latin once at the first mention on
   the page), «hurma pekmezi (dibs)» (F21-r2: the Turkish word first, «(dibs)» once in brackets at the first
   mention on the page, then «hurma pekmezi» alone; «dibs» never opens a sentence), «sadeyağ» (ghee), «El-Ahsa»
   (P2), the Hasawi rule (A9/A11: «El-Ahsa …» for things — «El-Ahsa mutfağı», «El-Ahsa sofrası» — never a demonym
   adjective; «El-Ahsalı» only for persons, A12-r3-people).

## This batch's own traps
- **The dish names are the page.** Each name appears as the H3, in the photo alt, in its description, and in the
  meta description list — one Turkish form per dish, byte-identical everywhere on the page. «haris», «balalit»,
  «hurma ekmeği» are fixed. **Rice**: the English card is «Hasawi Rice», a cooked rice dish (meat or chicken,
  tomato, spices); the published Turkish for the grain is «El-Ahsa pirinci» and for the red grain «El-Ahsa kırmızı
  pirinci» (ref.tm: trails, plan-your-trip). The card describes a dish, and Turkish names a cooked rice dish
  «pilav» — decide in stage 1 between «El-Ahsa pirinci» (the grain's published name, as the English) and «El-Ahsa
  pilavı» (the dish), record the choice in notes; the description itself still names the local rice «El-Ahsa
  pirinci» as the ingredient. Never «kırmızı» on this card: the English does not say red.
- **The M6-r3 glosses are for pages that only name a dish.** On this page each dish has its own card that
  describes it, so the H3 names stay bare (no bracketed gloss in a heading); the description is the gloss.
- **Date bread = red bread.** Card 8 ends «Also known as “red bread”» — Turkish quotes “”; the second name is
  «kırmızı ekmek» as the plan-your-trip FAQ printed it («hurma ekmeği (kırmızı ekmek olarak da bilinir)», ref.tm).
  Site rule: two names for one dish, never two dishes.
- **Dried lime / lomi** (hero lead, cards 1 and 4): «misket limonu» per the termbase — but the English says «dried
  lime», which is the dried fruit used as a spice, not the fresh lime. Rule one form for the page that keeps
  «dried» (P7 is open: «kurutulmuş limon» / «kuru limon»; never «kara»/«siyah» — site rule) and attaches it to
  the termbase word, e.g. «kurutulmuş misket limonu (lomi)» at the first mention, then the same phrase without
  the bracket; raise P7 in stage 4 with the form you used. The Arabic says «لومي» on every mention.
- **The poetic cards** (mandi, harees, asida, sago) are deliberately literary in the source. Keep the image and
  its hedge; do not add new ones. Mandi has its own plain restatement («Put plainly, …»): keep both registers —
  the image, then the plain fact (cooked in a tannour buried in a pit in the ground). «tannour» = «tandır» (the
  termbase «tandır fırını» is the bakery; here the pit oven itself — «toprağa gömülü bir tandır»).
- **Occasions** (cards 1, 3, 6, 7 and `fd.methodP2`): celebrations and tables of hospitality (rice); banquets and
  weddings, Ramadan tables (harees); cold winter nights (asida); Ramadan tables (sago). `fd.methodP2` names the
  four occasions in its own list — the Turkish words there must match the words of the cards.
- **Figures that are not titles**: «a land that is the capital of the palm» (balaleet) is the source's image for
  Al-Ahsa, not an official title — keep it figurative (no capital letters, no quotation marks); «the foremost dish
  of generosity» (harees) the same.
- **Ingredients**: saffron «safran», cardamom «kakule», cinnamon «tarçın», black pepper «karabiber», wheat flour
  «buğday unu», walnuts «ceviz», pistachios «fıstık»/«antep fıstığı», black seed (nigella) «çörek otu», Arabic
  coffee «Arap kahvesi», egg omelette «omlet», vermicelli «tel şehriye», boiled eggs «haşlanmış yumurta». No
  ingredient the English does not name.
- **The restaurants link** (`fd.dineCta`) points to the English list — no Turkish restaurants page yet. Keep the
  question + siz imperative + «→»; the label may name the section with the approved nav word.
- **Alt texts** describe the photo in one phrase (a pot stirred over a wood fire, a plate beside a glowing pit),
  no claim beyond the English, no final stop. «wood fire» = «odun ateşi».
- **Register**: a warm, exact food guide — no «eşsiz»/«büyüleyici»/«muhteşem», no brochure cheers, no fact the
  source does not carry.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-food` (branch `i18n/tr-food-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-food-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-food node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-food-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-leisure-fruits-1`). **A ruling
   supersedes any role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not
   decided silently — P7 is touched by the dried lime: apply the site rule, raise P7 in stage 4.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `allowNums`; `unit`; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr frame),
   `home`, `fruits` (approved strings of the fruits page), `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; the dried lime is never «black»; «red bread» = date bread (one dish);
   plain text — no links, no bold, no headings, no lists; the brand «Visit Al-Ahsa» stays Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-food-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 44 … },
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
