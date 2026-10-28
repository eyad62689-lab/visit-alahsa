# Batch `tr-attr-5` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The fifth Turkish attractions batch, after `tr-attr-1` to `tr-attr-4` (all 90/100) — and the first that is not
forts and mosques but **mountains**: open natural sites. The name rulings in `_meta.batch_rulings` for
`tr-attr-1` … `tr-attr-4` bind (e.g. «Ukayr» and «Müberrez» article-less, locative chains split at the English
break, «Uyuniler Devleti», «bint» for women, «yaklaşık» inside the bracket only where the English marks just
the Gregorian year as approximate, «Suudi Arabistan'ın Doğu Bölgesi» where a bare region name would read as
Türkiye's). Five pages in `order`: **shaban, kanzan, arbaa, thulaim, tuwaither** (the last is Abu Husais
Mountain at Al-Tuwaither) — 50 strings in `pack.json`: title, summary, body (plain text), area, and **three
visit-card rows on every page** (label + value each: «Hours & entry», «Hours», «Fees»).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Dağ, …») when the previous sentence's subject was something else. Check after a split
   that each sentence still says what the English says about *which thing* is where.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the
   English and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and
   for flagging; it does not rewrite the English facts.
3. **Who does the verb.** Batch 4's edits produced «cami … namaz kılabilir» (the mosque prays). With a
   capacity, a view, a climb or a camp, name the place with a locative («dağda», «tepede») or make the people
   the subject.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a5` (branch `i18n/tr-attr-5`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-5`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a5 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-5 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel — note
   «Cebel el-Kare», «El-Kare», «Et-Tuveysir», «El-Kilabiye», «Cüvasa Camii», «Kral Abdülaziz»),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings, including the Kare collision ruling)
   and `_meta.batch_rulings` (`tr-ui-1`, `tr-attr-1` … `tr-attr-4`). **A ruling supersedes any role-file
   sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs. The
   visit card is almost all there: «Hours & entry» → «Ziyaret saatleri ve giriş»; «Open public site — no entry
   fee» → «Herkese açık alan — giriş ücretsiz»; «Hours» → «Ziyaret saatleri»; «Fees» → «Ücretler»; «Free
   entry» → «Giriş ücretsiz». Only «Open 24 hours» is new: render it plainly («24 saat açık») with nothing
   added.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, the Arabic text is in
   `arabic_body`); `ctx` says where it renders; `precedent` = published zh/de/ru/ur (for understanding,
   never copied). `ref.json`: the approved Turkish frame (`ui`), the calibration page (`calibration` — the
   Cebel el-Kare page: register for a mountain, name forms, card patterns), published Turkish titles of
   places the sources mention (`places` — **byte-binding**), termbase entries present in the sources, `tm`.
5. Site rules: invent nothing (hours, fees, distances, heights, dates, routes, safety advice, superlatives);
   Latin digits (a number the English spells out may stay in words); "the largest oasis in the world" (never
   palm/natural); non-Arabic bodies are plain text — no Markdown, no links; the Gulf is «Arap Körfezi» (P5);
   the brand «Visit Al-Ahsa» stays Latin. **Jabal Al-Qarah's warmth belongs to winter, not to night** (site
   rule C16) — if a cave or grotto is called cool or warm, keep the English's season or time exactly.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
«Mountain» / جبل: the calibration's form is **«Cebel X»** for a named mountain (Cebel el-Kare) — follow it,
and rule whether a descriptive generic («dağ», «tepe») is added where the English uses «Mountain» as a common
noun. Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a
source** (tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what
it showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: جبل الشبعان and «أبا الكباري» · جبل كنزان and معركة كنزان 1915 (check TDV for the battle and
for the Acmân/Ajman tribe) · الشعبة · جبل الأربع (beware the collision with Turkish «erbain»/«dört» — rule it)
· الطرف · جبل الثليم · مدينة العيون · جبل أبو حصيص · التويثير (termbase: Et-Tuveysir) · any tribe, ruler or
village the bodies name. Where the English translated a generic («village», «city», «hills») the Turkish
translates it. Collisions with ordinary Turkish words are accepted as inherent with a light in-text
mitigation only where the calibration did one.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre» (ruling «Attribution placement»). Clock times «08.00–17.00» (P10), Hijri per the calibration
«Hicri 962 (1555)» (P11 open — keep this form and flag), Gregorian years bare («1915'te»).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-5", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 50 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool, or with a node script
that reads an earlier stage's JSON (never through a shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
