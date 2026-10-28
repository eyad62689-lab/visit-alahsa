# Batch `tr-attr-4` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The fourth Turkish attractions batch, after `tr-attr-1`, `tr-attr-2` and `tr-attr-3` (all 90/100). Their name
rulings in `_meta.batch_rulings['tr-attr-1']`, `['tr-attr-2']` and `['tr-attr-3']` bind (e.g. «Ukayr» and
«Müberrez» article-less, «Camii» on every mosque name in a list, locative chains split at the English break,
one-time «(Kasr X)» bracket for translated palace titles, El-Kut / El-Mezruiye / El-Mulla always with
«mahallesi»/«ailesi», article-less Dammam on the P1 list, the full Hijri date form, «Uyuniler Devleti»,
«bint» for women, «yaklaşık» inside the bracket only where the English marks just the Gregorian year as
approximate). Five pages in `order`: **tahimiyah-e, hubaish, umzurainiq, uqair-mosque, abubakr-mosque** —
26 strings in `pack.json`: title, summary, body (plain text), area, and one visit-card row («Entry») on
hubaish, umzurainiq and abubakr-mosque (no FAQ, no bestTime).

**Two lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** The judge's rounds were spent on sentences that packed three locatives or a long
   name chain before the verb. What worked is two short sentences, never three place complements before the
   verb, and an explicit subject («Cami, …») when the previous sentence's subject was something else.
2. **The English is the translation source.** Where the Arabic body differs from the English on a fact
   (a number, a verb, a place relation), the Turkish follows the **English** and the divergence goes into
   `source_defects`. Batch 3's translator followed the Arabic and the editor had to restore five facts. The
   Arabic is the arbiter for *name spellings* and for flagging; it does not rewrite the English facts.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a4` (branch `i18n/tr-attr-4`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-4`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a4 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-4 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings`
   (`tr-ui-1`, `tr-attr-1`, `tr-attr-2`, `tr-attr-3`). **A ruling supersedes any role-file sentence that
   still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently: where the text
   touches one, keep the calibration's form and raise it.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused verbatim when its English recurs (the
   «Entry» row: «Giriş» / «İbadet için kullanılan bir cami; ücretsiz»; «kırk caminin köyü»; the Et-Tahimiye
   sentences of the West mosque page where the English is the same).
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, the Arabic text is in
   `arabic_body`); `ctx` says where it renders; `precedent` = published zh/de/ru/ur (for understanding,
   never copied). `ref.json`: the approved Turkish frame (`ui`), the calibration page (`calibration`),
   published Turkish titles of places the sources mention (`places` — **byte-binding**), termbase entries
   present in the sources (`terms` — already holds El-Hubeyş Camii, Şeyh Muhammed bin Ebu Bekir el-Mulla
   Camii, Et-Tahimiye, Ukayr Limanı, Kral Abdülaziz, Necid, Prens Muhammed bin Selman Tarihî Camileri
   Geliştirme Projesi, han, emirlik binası, kireç taşı, revak, şandal), approved pairs (`tm`).
   Published Turkish titles not in `places` but binding all the same: «Et-Tahimiye Batı Camii», «Ukayr
   Kalesi», «Ukayr Limanı» (via the termbase), «Ebu Bekir el-Mulla Ailesi Ribatı», «Ed-Dibs Camii»,
   «Beyt el-Biat», «El-Cebri Camii», «Kasr İbrahim».
5. Site rules: invent nothing (hours, fees, distances, dates, superlatives); Latin digits (a number the
   English spells out may stay in words); "the largest oasis in the world" (never palm/natural); non-Arabic
   bodies are plain text — no Markdown, no links; the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa»
   stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: مسجد التهيمية الشرقي (on the West mosque's pattern: «Et-Tahimiye Doğu Camii») · مسجد الحبيش
(termbase: El-Hubeyş Camii) · الرفعة الجنوبية · الشيخ عبدالعزيز العلجي · مسجد أم زرينيق and its cemetery ·
العويمرية · مسجد ميناء العقير (Ukayr article-less; the English title says «Port Mosque») · the scholars,
families and districts the bodies name. Where the English translated a generic («Mosque», «district»,
«Port») the Turkish translates it; district = «mahallesi» (precedent El-Kut mahallesi). Collisions with
ordinary Turkish words are accepted as inherent with a light in-text mitigation only where the calibration
did one.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre» (ruling «Attribution placement»). Clock times «08.00–17.00» (P10), currency «50 Suudi riyali
(SAR)» at first mention then «50 SAR», Hijri per the calibration «Hicri 962 (1555)» (P11 open — keep this
form and flag).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-4", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 26 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool (never through a
shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
