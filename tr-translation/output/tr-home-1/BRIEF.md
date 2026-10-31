# Batch `tr-home-1` — the Turkish home page «the oasis unfolds» (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The Turkish home page `/tr/`: seven scroll-driven chapters, published already in ar/en/zh/de/ru/ur from the same
source (`src/data/home-copy.ts`, `src/data/home-chapters.ts`, `src/data/oasis-facts.ts`). **97 strings** in
`pack.json`, in page order:
- `ui.*` — 4 keys of `src/i18n/ui.ts` the page reads from the dictionary: `home.hero.lead` (the JSON-LD
  description only — not visible), `fact.palms.l`, `fact.unesco.l`, `fact.sites.l` (labels under the big numbers).
- `seo.*` — the `<title>`, meta description, and the JSON-LD place/country names.
- Chapter 1 `gate.*` (H1, lead, two buttons) · the rail `rail.*` (the seven chapter names: the side dots AND the
  eyebrow «01 · <name>» over each chapter) · chapter 2 `water.*` (title, lead, the two numbers `palmsN`/`springsN`
  and the springs label, the five pieces of the sources line, the link) · chapter 3 `qarah.*` (title, the drag
  sentence appended to the published summary of Cebel el-Kare, the four times of day, the link) · chapter 4 `map.*`
  (interactive map of six landmarks) · chapter 5 `memory.*` (five heritage cards, two with a date badge) · chapter 6
  `plan.*` (three questions, the route panel, the day/kind tags), `tpl.*` (nine template titles + the 4x4 note),
  `tip.*` (four companion-paragraph parts) · chapter 7 `finale.*` and the saved bar `saved.*`.

**Read `ctx` for every string — it was written from the component code** (what renders where, what comes before
and after, which element is a label or a button). The trails lesson: a brief that described the number/label order
from memory cost three readers; the ctx here says «number then label» because the code prints the number element
first.

**What the page prints beside the batch texts (published Turkish, byte-binding where a batch string names it):**
the summaries and titles of the landmarks (`ref.places`: Cebel el-Kare, Kasr İbrahim, Cüvasa Camii, El-Asfar Gölü,
Ayn en-Necm Parkı, Ukayr, El-Calaniye Camii, El-Kaysariye Çarşısı, and in the routes El-Cebri Camii, Şeyh Muhammed
bin Ebu Bekir el-Mulla Camii, Zanaatkârlar Çarşısı, Kadınlar Çarşısı, El-Ahsa Misket Limonu Çiftliği, Cüvasa
Parkı, Kral Abdullah Çevre Parkı, Cebel el-Erba, El-Ahsa Müzesi), the five trail titles (`ref.trails`: «Tarihî
Hüfuf Rotası», «Cebel el-Kare ve Cüvasa Rotası», «Vaha ve Pınarlar Rotası», «El-Asfar Gölü ve Millî Park Rotası»,
«Ukayr Kıyı Rotası»), the approved frame (`ref.ui`: «Bu yeri kaydedin» / «Kaydedildi ✓» on every map panel,
«Kayıtlı yerlerim», «Gezinizi planlayın», «Gezilecek yerler», «Rotalar», «UNESCO Dünya Mirası alanı · 2018»), the
category labels of the attractions index (`ref.categories`: «Tarihî yerler», «Doğa»), and the published intro of
the El-Asfar trail (`ref.asfar_trail_intro` — the source of `tpl.note.asfar`).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Two short sentences rather than a chain; an explicit subject when it changes. The
   leads are short editorial paragraphs: keep their rhythm, not a clause-for-clause copy.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and for the four
   times of day (ctx of `qarah.time.*`).
3. **Who does the verb.** Readers misread before: «eski» before a proper name, «durak» for sections (the trails
   batch ruled «durak» for a route stop — here `plan.kindTrail`/`plan.kindPlace` are tags, not stops), «simge», a
   comma between a participle subject and its predicate, long participial chains.

**This batch's own traps:**
- **Editorial register, not brochure.** The Arabic is literary-sparse («تتكشّف», «يناديك», «ذاكرة الطين والسوق»).
  The Turkish is magazine-travel prose: natural images, short headings, no «eşsiz»/«büyüleyici»/«muhteşem», no
  fact the source does not carry, no «resmî»/«tescilli».
- **The fixed phrase** «the largest oasis in the world» renders as the tm does («dünyanın en büyük vahası») — never
  with «hurma» before it, never «doğal» (C15). It appears in `gate.title`, `ui.home.hero.lead`, `ui.fact.palms.l`.
- **Numbers**: Turkish decimal comma «2,5»; «280+»; Latin digits; the count-up script animates the first number in
  `water.palmsN`/`water.springsN` and keeps what surrounds it. `allowNums` in the pack lists the digits a string may
  carry beyond its two sources (day counts, «200» for two centuries, «10» km).
- **Pairs that must agree**: `rail.ch-water` = `water.title`; `rail.ch-memory` = `memory.title`; `rail.ch-plan` ↔
  `plan.title` ↔ the approved «Gezinizi planlayın»; the four fact labels parallel; the nine `tpl.*` titles a series
  («Bir gün …» / «İki gün: …, sonra …» / «Üç gün … ile biter»); the three options of each question parallel; the
  three `plan.day*` parallel; the buttons imperative in the polite siz form with one pattern.
- **Links to pages not built in Turkish**: `map.link`, `plan.link`, `finale.plan`, `finale.open`, `saved.build`'s
  target page («Kayıtlı yerlerim») lead to the English pages (/en/map/, /en/plan-your-trip/, /en/plan/). Name the
  action, promise no Turkish page.
- **`heritage-3` title**: "Saudi Arabia's first seaport on its eastern coast" is the approved wording for Ukayr
  (C34) — take it from the published summary of al-uqair (`ref.places.al-uqair.summary_tr`), never "one of the
  first ports".
- **`memory.date.*`**: two or three words, the fact as the published Turkish body/summary states it (ref.places
  jalaniyah `body_tr`: «Hicri beşinci yüzyılda»; qaisariyah `summary_tr`: «İki yüzyıldan eski»). P11 (the Hijri
  form) is open: the tm form, no «Miladi», flag nothing new.
- **Companion parts**: `tip.family` ONE park of two («ya da»/«veya»); `tip.soloWalk` appears only under routes
  that include «Tarihî Hüfuf Rotası», followed by `tip.soloMuseum`, which also appears alone — so `tip.soloMuseum`
  reads both on its own and as a second sentence.
- **The sources line** is five pieces assembled in order: `srcLabel` + [link `srcGuinness`] + `srcMid` + [link
  `srcUnesco`] + `srcEnd`. Keep the spaces and punctuation at the edges of each piece so the assembled Turkish
  sentence is correct. The Guinness organisation: attest the Turkish name on tr.wikipedia («Guinness Dünya
  Rekorları»); keeping the English «Guinness World Records» trips the checker's SPELLING rule on «World» — that is
  then the judge's call, not a text to shape. The ministry: termbase «Çevre, Su ve Tarım Bakanlığı». The list:
  «UNESCO Dünya Mirası Listesi» (tm).
- **Hedges kept exactly**: "some of Islam's earliest mosques" (not the oldest), "passed down through generations",
  "in their true positions", "appears at once". No distances, no times, no fees.
- **Labels and buttons**: no final stop; headings sentence case (P9); quotes “…”; the Gulf is «Arap Körfezi» (P5,
  `tpl.nature-3.title`); «Visit Al-Ahsa» stays Latin.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-home` (branch `i18n/tr-home-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-home-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-home node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-home-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-12`, `tr-trails-1`). **A ruling supersedes any role-file sentence that still calls the
   item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs (search by
   a distinctive English phrase first: «largest oasis», «Save this place», «Plan your trip», «World Heritage»).
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx` says where it renders; `placeholders`; `allowNums`;
   `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`: approved frame (`ui`),
   `categories`, the published fields of every landmark the page shows (`places`), the trail titles (`trails`),
   the stops of the nine templates (`templates_stops`), the El-Asfar trail intro, `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; "the largest oasis in the world" (never palm/natural); plain text —
   no links, no bold, no headings, no lists; the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch
Every proper noun is already in the termbase or `ref.places`/`ref.trails` — none is new. A generic the English uses
instead of a name («a family park», «the lake», «the mountain and groves») stays generic. The only proper nouns not
yet in the termbase are the two organisations of the sources line (Guinness World Records; the UNESCO list is in
the tm): propose them with a source (tr.wikipedia.org URL seen) or mark `unattested`.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-home-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 97 … },
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
