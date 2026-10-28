# Batch `tr-attr-7` — five attractions + two frame strings (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The seventh Turkish attractions batch, after `tr-attr-1` to `tr-attr-6` (all 90/100) — parks and a seasonal
lake: **delfoon-lake** (Delfoon Lake), **national-park** (Al-Ahsa National Park), **jawatha-park** (Jawatha
Park), **najm-park** (Ain Najm Park), **mushaqar** (Al-Shaibani / Al-Mushaqar Park) — plus **two frame
strings** from `src/i18n/ui.ts` that the Turkish block lacks and that every souq/park page shows in English:
`ui.crumb.leisure` («Souqs & parks», the breadcrumb) and `ui.det.allLeisure` («All souqs & parks →», the back
link). 54 strings in `pack.json`: title, summary, body (plain text), area, visit-card rows, FAQ on delfoon-lake
(3) and jawatha-park (4), and the two `ui.*` strings. The name rulings in `_meta.batch_rulings` for
`tr-attr-1` … `tr-attr-6` bind (e.g. translated generics «Gölü/Plajı/Parkı» (A6), «Cüvasa Camii», «El-Kare»,
«Müberrez» article-less, «El-Kilabiye», the governorate folded into «El-Ahsa», «16.00–24.00» for midnight,
«ilk önemli yer» for landmark, «bitişiktir» for bordered by, «tarihî» not «eski» before a standing name).

**The two frame strings** must sit with their approved siblings (ref.json `ui_siblings`): the header nav item
for the same section is «Çarşı, park ve çiftlikler»; the attraction pages' breadcrumb is «Gezilecek yerler» and
their back link «Tüm gezilecek yerler →». Translate the English as it stands («Souqs & parks»), in the same
register and casing as the siblings, keep the arrow «→» exactly, and say in `notes` why the crumb does or does
not mirror the nav item's wording.

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Park, …», «Göl, …») when the previous sentence's subject was something else; after a
   genitive or place chain, end the sentence and name the place again (A6-r2-subject).
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the
   English and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and
   for flagging.
3. **Who does the verb.** With a capacity, a view, a walk or a picnic, name the place with a locative
   («parkta») or make the people the subject. Words readers misread before: «sınırlıdır», «eski» before a name,
   «simge», «diğer» before a list that is itself the content.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a7` (branch `i18n/tr-attr-7`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-7`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a7 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-7 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings — **P3**: the generic follows title_en, so
   «Park», «Lake», «National Park» are translated; **P10**: clock times «06.00–18.00», «16.00–23.30», midnight
   «24.00» per A1-midnight, in running text «… saatleri arasında»; currency «10–15 SAR» per the calibration's
   SAR form) and `_meta.batch_rulings` (`tr-ui-1`, `tr-attr-1` … `tr-attr-6`). **A ruling supersedes any
   role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided
   silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs —
   «Visiting» / «Open public natural site — no fee» (hubail-lake), «Hours» → «Ziyaret saatleri», «Fees» →
   «Ücretler», «Free entry» → «Giriş ücretsiz», the FAQ question patterns («X nerede?», «X'i ziyaret etmek
   ücretli mi?», …). The calibration page (ref.json `calibration`) shows the FAQ answer register.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, `arabic_body`); `ctx`
   says where it renders; `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`:
   approved frame (`ui`, `ui_siblings`), calibration page, `places` (**byte-binding** — e.g. «Cüvasa Camii»,
   «El-Hubeyl Gölü»), termbase entries present in the sources, `tm`.
5. Site rules: invent nothing (hours, fees, distances, areas, tree counts, dates, water temperature, healing
   claims beyond the English, superlatives the English does not have); Latin digits; "the largest oasis in the
   world" (never palm/natural); non-Arabic bodies and FAQ answers are plain text — no Markdown, no links; the
   Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin. **Ain Najm's "healing" springs:** keep
   the English's own hedge and attribution exactly (a reputation, not a medical claim). A FAQ answer stands on
   its own and carries the same facts as the English answer — nothing more.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: بحيرة دلفون (Delfoon — from the Arabic spelling) · متنزه الأحساء الوطني (P3: «El-Ahsa Millî
Parkı»? — rule the form and the circumflex per UI1-*) · العمران · منتزه جواثا (Cüvasa is in the termbase) ·
عين نجم and its park (TDV may have «AYN» compounds; rule «Ayn Necm») · المبرز (Müberrez, article-less) ·
الشيباني / المشقر — the pre-Islamic fort «Mushaqar» (TDV may have «MÜŞAKKAR»; check) · the 1962 project and any
body named · tamarisk («ılgın», check TDK). Collisions with ordinary Turkish words are accepted as inherent
with a light in-text mitigation only where the calibration did one.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre». Clock times per P10, Hijri per the calibration (P11 open), Gregorian years bare («1962'de»).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-7", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 54 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool, or with a node script
that reads an earlier stage's JSON (never through a shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
