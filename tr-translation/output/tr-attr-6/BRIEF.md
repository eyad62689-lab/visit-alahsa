# Batch `tr-attr-6` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The sixth Turkish attractions batch, after `tr-attr-1` to `tr-attr-5` (all 90/100) — water and green spaces:
**asfar** (Al-Asfar Lake), **uqair-beach** (Al-Uqair Beach), **salwa-beach** (Salwa Beach), **hubail-lake**
(Al-Hubail Lake), **king-abdullah-park** (King Abdullah Environmental Park) — 59 strings in `pack.json`:
title, summary, body (plain text), area, **bestTime** (asfar, uqair-beach), visit-card rows on every page, and
**FAQ** pairs on asfar (4), uqair-beach (4) and hubail-lake (3). king-abdullah-park has a one-sentence body
and no area. The name rulings in `_meta.batch_rulings` for `tr-attr-1` … `tr-attr-5` bind (e.g. «Ukayr»
article-less, «Ukayr Limanı», «Selva», «Katar», «El-Ahsa Belediyesi», «ilk önemli yer» for landmark,
«bitişiktir» for bordered by, «tarihî» not «eski» before a standing building's name).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Göl, …», «Plaj, …») when the previous sentence's subject was something else. After a
   split, check that each sentence still says what the English says about *which thing* is where.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the
   English and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and
   for flagging.
3. **Who does the verb.** With a capacity, a view, a swim or a camp, name the place with a locative («gölde»,
   «plajda») or make the people the subject — never «göl … yüzebilir». Words readers misread in earlier
   batches: «sınırlıdır» (read as "restricted"), «eski» before a name (read as "former"), «simge».

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a6` (branch `i18n/tr-attr-6`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-6`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a6 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-6 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings — **P3**: the generic follows title_en, so
   «Lake», «Beach», «Park» are translated: «X Gölü», «X Plajı», «… Parkı»; **P10**: clock times «16.00–24.00»
   style, in running text «… saatleri arasında»; **the UNESCO component sentence** ruling for the asfar FAQ)
   and `_meta.batch_rulings` (`tr-ui-1`, `tr-attr-1` … `tr-attr-5`). **A ruling supersedes any role-file
   sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs —
   the visit card on salwa-beach («Ziyaret saatleri ve giriş» / «Herkese açık alan — giriş ücretsiz»,
   «Ziyaret saatleri» / «24 saat açık», «Ücretler» / «Giriş ücretsiz»), «Fees» → «Ücretler»; and the FAQ
   question patterns: «X nerede?», «X'i ziyaret etmek için en iyi zaman nedir?», «X'i ziyaret etmek ücretli
   mi?». The calibration page (ref.json `calibration`) shows the FAQ answer register and the bestTime form.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, the Arabic text is in
   `arabic_body`; FAQ strings may have no Arabic); `ctx` says where it renders; `precedent` = published
   zh/de/ru/ur (for understanding, never copied). `ref.json`: approved frame (`ui`), calibration page,
   `places` (**byte-binding**), termbase entries present in the sources, `tm`.
5. Site rules: invent nothing (hours, fees, distances, depths, water quality, swimming safety, bird species,
   dates, superlatives the English does not have); Latin digits; "the largest oasis in the world" (never
   palm/natural); non-Arabic bodies and FAQ answers are plain text — no Markdown, no links; the Gulf is
   «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin; no Turkish UNESCO reference exists — follow
   the calibration's UNESCO sentence and the English's own claim exactly («part of», «within», never «is»).
   A FAQ answer stands on its own and carries the same facts as the English answer — nothing more.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: بحيرة الأصفر (the specific «el-Asfar» is the Arabic word for "yellow" — note it, and rule
whether anything in the English asks for a gloss) · شاطئ العقير (Ukayr Plajı, article-less per A1-Ukayr) ·
شاطئ سلوى (Selva Plajı; «Selva» is in the termbase) · بحيرة الحبيل · منتزه الملك عبدالله البيئي (King
Abdullah — TDV/tr.wikipedia «Abdullah b. Abdülaziz» for the king; rule «Kral Abdullah Çevre Parkı» or what
the sources support) · any town, ministry or programme the bodies name. «Environmental Park», «caravan
site», «bays» are generic: translate them plainly («karavan alanı»), no English loanwords where Turkish has a
common word (SKILL.md forbids «lokasyon», «spot»…).

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre». Clock times per P10 («16.00–24.00»; «midnight» is «24.00» or «gece yarısı» as P10 allows — keep
the English's information exactly), Hijri per the calibration (P11 open), Gregorian years bare.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-6", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 59 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool, or with a node script
that reads an earlier stage's JSON (never through a shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
