# Batch `tr-attr-3` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The third Turkish attractions batch, after `tr-attr-1` (qasr-ibrahim, al-uqair, jawatha-mosque, sahood,
ameeriah) and `tr-attr-2` (muhairis, khuzam, baiah, uqair-castle, jabri-mosque), both 90/100. Their name
rulings in `_meta.batch_rulings['tr-attr-1']` and `['tr-attr-2']` bind (e.g. «Ukayr» and «Müberrez»
article-less, «Camii» on every mosque name in a list, locative chains split at the English break, one-time
«(Kasr X)» bracket for translated palace titles, El-Kut / El-Mezruiye / El-Mulla always with
«mahallesi»/«ailesi», article-less Dammam on the P1 list, the full Hijri date form). Five pages in `order`:
**jalaniyah, dibs, bubakr-ribat, qubba-mosque, tahimiyah-w** — 22 strings in `pack.json`: title, summary,
body (plain text), area, and one visit-card row on dibs (no FAQ, no bestTime on these pages).

**The lesson of the two earlier batches (apply it from stage 1):** the judge's rounds were spent on sentences
that packed three locatives or a long name chain before the verb. Readers stumbled on them however they were
reordered. What worked is **splitting** — two short sentences — not reordering. Never put three place
complements before the verb.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a3` (branch `i18n/tr-attr-3`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-3`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a3 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-3 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings`
   (`tr-ui-1`, `tr-attr-1`, `tr-attr-2`). **A ruling supersedes any role-file sentence that still calls the
   item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently: where the text touches one, keep
   the calibration's form and raise it.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused verbatim when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts (for `body`, the Arabic text is in
   `arabic_body`); `ctx` says where it renders; `precedent` = published zh/de/ru/ur (for understanding what
   the string does and which facts the other lines kept, never copied). `ref.json`: the approved Turkish
   frame (`ui`), the calibration page (`calibration`), published Turkish titles of places the sources
   mention (`places` — **byte-binding**: Kasr İbrahim, Beyt el-Biat, El-Cebri Camii), termbase entries
   present in the sources (`terms` — already holds El-Calaniye Camii, El-Kubbe Camii, Et-Tahimiye,
   El-Mulla ailesi), approved pairs (`tm`).
5. Site rules: invent nothing (hours, fees, distances, dates, superlatives); Latin digits; "the largest
   oasis in the world" (never palm/natural); non-Arabic bodies are plain text — no Markdown, no links;
   the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: مسجد الجعلانية (termbase: El-Calaniye Camii) · البطالية · الدولة العيونية (TDV: Uyûnîler;
check the calibration's circumflex ruling UI1-*) · مسجد الدبس and مسجد الفاتح (the English summary calls it
«Al-Fatih Mosque» while the title is «Al-Dibs Mosque» — follow the English, report the divergence) · حي
الكوت (ruled: El-Kut mahallesi) · رباط آل أبي بكر الملا (El-Mulla ailesi is ruled; decide «ribat» — TDV
«RİBÂT» — and the family name form) · مسجد القبة (termbase: El-Kubbe Camii) · التهيمية (termbase:
Et-Tahimiye) · any ruler, dynasty, scholar or district the bodies name. Where the English translated a
generic («Mosque», «Palace», «Village») the Turkish translates it. Collisions with ordinary Turkish words
are accepted as inherent (precedent: Kare, Busalih, Cebri) with a light in-text mitigation only where the
calibration did one.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre» (ruling «Attribution placement»). Clock times «08.00–17.00» (P10), currency «50 Suudi riyali
(SAR)» at first mention then «50 SAR», Hijri per the calibration «Hicri 962 (1555)» (P11 open — keep this
form and flag). The Arabic body is the arbiter where it differs from the English on a fact: report the
divergence in `source_defects`, never reconcile it in the Turkish.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-3", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 22 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool (never through a
shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
