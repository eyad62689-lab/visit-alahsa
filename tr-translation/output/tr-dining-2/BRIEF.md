# Batch `tr-dining-2` — the Turkish single dining pages (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The 19 single dining pages `/tr/restaurants-cafes/<slug>/`, published already in ar/en/zh/de/ru/ur from the same
sources, built now in Turkish (a page is built only when its card carries `body_tr`). The scope mirrors the Urdu
batches ur-dining-3/4/5. **25 strings** in `pack.json`:
- unit **`dd`** (6) — the DiningDetailView frame: the three type labels (café, bakery, restaurant), the back link
  to the index, the «About this page» paragraph, the «Sights nearby in {district}» heading. The other eleven frame
  strings (hours heading and note, rating label, open/closed badges, «Location», «About this page», the index
  name, the new-window note) are **not in the pack**: their English is byte-identical to approved strings of the
  dining index and the stay page, and they are copied from there (`ref.copied`). Read them — your strings sit
  beside them on the same page.
- unit **`db`** (19) — the body of each page (`db.<file>.body`): one paragraph each, 568–1047 characters, 2466 words
  in all. This is the batch's real weight.

Around these strings each page prints published Turkish: the header/footer, the breadcrumb, the place's Latin name
as H1, its card blurb (`ref.cards.<file>.blurb_tr`), its area line (`area_tr`), «Google Haritalar'da açın ↗», and
the titles of nearby sights (`ref.places`). **Read `ctx` for every string — it was written from the component code.**

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** The bodies are long English chains: make plain Turkish sentences with an explicit
   subject when it changes; no participle chains before the verb; no comma between a subject and its predicate.
   Keep the English order of the facts.
2. **The English is the translation source.** Where the Arabic differs on a fact, follow the English and file a
   `source_defects` entry. The Arabic is the arbiter for **name spellings**: a district, road, person or place new
   to the termbase is transliterated from the Arabic spelling in the termbase's journalistic style («El-Kut»,
   «Kuzey er-Rifa mahallesi», «Ayn en-Necm Yolu», «Abdülaziz bin Muhammed el-Abdülkadir»), never from the English
   romanisation. Cities with an established Turkish exonym take it (Medine, Mekke, Riyad, Cidde — check tm and
   termbase first; Khobar is «El-Huber», Dammam «Dammam», Qatar «Katar»).
3. **The places' own names stay as they name themselves.** Every place on these pages (the page's own and the
   others «from this list») is written **byte-identical to its card `name_en`** (`ref.cards`): «Al Hawy», «Dar
   Basma», «7st», «Bait Al-Koot», «Ratio», «Sharq Restaurant» where the English uses that registered name — with an
   apostrophe before any suffix, harmony by pronunciation. Where a body *discusses* a name (its spelling, its
   meaning, a sub-brand like «Futoor Al Hawy», «7st Al-Bait», «Lava Chocolate», «Rayouq Sharq»), keep the Latin form
   the English gives.
4. **Who does the verb.** No ambiguous «onun»/«kendi»: name the owner when the subject changes (D19 of tr-food-1).
5. **A foreign word is defined at its first mention only where the English defines it** (D1-r3), with no case
   suffix glued to it in running text. **The dishes of the approved food page bind byte-identically**
   (`ref.food`: «El-Ahsa pilavı» for Hasawi rice, «haris», «mufallak», «balalit», «hurma ekmeği»; termbase
   «mandi»). A dish not in `ref.food` (marqooq, balilah, bajilla, kleija, zalabia, sleeq, majboos, fatteh) is
   transliterated from the Arabic, lower case, and glossed only if the English glosses it; file it as a termbase
   proposal.
6. **The approved frame binds byte-identically**: `ref.ui`, `ref.places` (Kasr İbrahim, El-Kaysariye Çarşısı,
   El-Cebri Camii, El-Hamidiye Çarşısı, Ukayr; «Ukayr Limanı» for the Al-Uqair port), `ref.stayDining` (district names, the Al-Koot stay body —
   the dining page `alkoot-hotel` tells the same facts: reuse its forms for the founder, the princes, the licensing
   body, «Hicri 1439 (2018)», «963 metrekare», «tarihî konukevi»), the termbase («El-Ahsa», «Hüfuf», «Müberrez»,
   «El-Kut», «Suudi Turizm Otoritesi», «Suudi Turizm ve Millî Miras Kurumu», «Kral Faysal Üniversitesi», «Kral
   Abdullah Yolu», «Katar Yolu», «Arap Körfezi Yolu», «nitelikli kahve», «karak çayı», «meclis salonu», «kahve
   ibriği», «Google Haritalar»), the Hasawi rule (A9: «El-Ahsa …» for things, never a demonym; «El-Ahsalı» only for
   persons), «Arap Körfezi».

## This batch's own traps
- **Two names of one authority.** `alkoot-hotel` names the Saudi Commission for Tourism and **National Heritage**
  (its 2018 name; termbase). `alsayed` names, for 2013, the Saudi Commission for Tourism and **Antiquities** — the
  older name of the same body, a different string: transliterate it in the same official-name style from the
  Arabic, do not normalise one into the other.
- **The site's editorial voice.** «We found no reliable source…», «so neither is stated here», «the absence of
  evidence is not evidence of absence» are the site saying what it could not confirm: keep the first person plural
  and the exact limit of the claim — never turn «not stated» into «unknown» or a guess.
- **Word mentions.** Bodies explain words (al-hawi, zawara/ziyara, huwaija/haja, sinyar, sulaf/sulafah/sawlaf, aysh,
  al-kindiyyah, al-areesh, «Qreisi Feenqerz», «Kod», «Koud»). Mark a mentioned word with typographic quotes “…”
  (plain text, no italics), transliterate it in the Turkish style from the Arabic where it is an Arabic word, and
  keep the Latin spellings the English *compares* (Code vs Koud, Soulaf vs sawlaf, Raslan vs Karak Raslan) exactly.
- **The brands' own lines.** A slogan quoted from a place's accounts is translated in quotes when it is Arabic
  in origin («the taste of home», «a sea voyage in every dish», «different tastes from all over the world»). The two
  **English wordplays** («where we can trEAT you butter», «when in doubt, Dot») cannot be translated: keep them in the
  original English inside quotes, byte-identical, and let the Turkish sentence say it is a play on words.
- **«From this list» / «this page covers».** The pages link back to the index; «bu listedeki» (the index list) and
  «bu sayfa» (the single page) keep their referents.
- **Dates and numbers**: Latin digits; months in Turkish («Mayıs 2024», «Kasım 2025», «Ocak 2024»); «yaklaşık yarım
  kilometre», «150 metrekare», «yüz yılı aşkın»; Hijri year as the stay body.
- **«Sights nearby in {district}»** (`dd.sightsH`): `{district}` is any of DISTRICT_NAMES.tr («El-Kut mahallesi»,
  «Kuzey er-Rifa mahallesi», «El-Halidiye mahallesi», «Hüfuf tarihî merkezi» …). No case suffix glued to the
  placeholder; a colon pattern is the safe form (Urdu precedent «قریبی سیاحتی مقامات: {district}»).
- **Type labels**: «Kafe» / «Fırın» (SD15-r2: the shop) / «Restoran», sentence case, singular — the index filters
  are their plurals.
- **Register**: a plain descriptive guide — no «eşsiz»/«büyüleyici»/«muhteşem», no recommendation, no quality claim
  beyond what the English says (it calls Ammo's building «well-appointed», Code's menu «refined»: translate the
  English adjective, do not raise it).

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-dining-2`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-dining-2`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-dining-2 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-stay-dining-1`; skip a ruling with
   `superseded_by`). **A ruling supersedes any role-file sentence that still calls the item open.**
   `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter (for a body: the Markdown body of the card — the Arabic page
   text); `ctx`; `placeholders`; `allowNums`; `unit`; `precedent` = published zh/de/ru/ur (for understanding, never
   copied); `latinNames` (the places' Latin names — the spelling checker skips them). `ref.json`: `cards`, `food`,
   `stayDining`, `copied`, `ui`, `places`, `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; plain text — no links, no bold, no headings, no lists; the brand
   «Visit Al-Ahsa» stays Latin; «Arap Körfezi».

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-dining-2", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 25 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII. A body may change by a whole sentence in one `changes` entry; quote enough of before/after to find it.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
