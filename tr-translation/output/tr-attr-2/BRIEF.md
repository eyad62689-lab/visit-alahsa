# Batch `tr-attr-2` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The second Turkish attractions batch, after `tr-attr-1` (qasr-ibrahim, al-uqair, jawatha-mosque, sahood,
ameeriah — 90/100; its name rulings A1-*/A2-* in `_meta.batch_rulings['tr-attr-1']` bind, e.g. «Ukayr»
article-less, «Camii» on every mosque name in a list, locative chains split at the English break). Five pages
in `order`: **muhairis, khuzam, baiah, uqair-castle, jabri-mosque** — 36 strings in `pack.json`: title,
summary, body (plain text), area, bestTime and visit-card rows wherever the English has them (no FAQ on these
pages).

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a2` (branch `i18n/tr-attr-2`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-2`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a2 node C:\Users\truyr\node-store\va-scratch\tr-r1\tools\verify.mjs tr-attr-2 <file> [--prev <file>]`
  (in Bash: `TR_REPO=... node ...`). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the
  text to it — leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings['tr-ui-1']`
   (UI1-*: circumflex rule, «gezilecek yer», «El-Ahsa X», control forms). **A ruling supersedes any
   role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided
   silently: where the text touches one, keep the calibration's form and raise it.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused verbatim when its English recurs
   (card labels «Ziyaret saatleri», «Ücretler»; FAQ patterns).
4. `pack.json`, per string: `en` source; `ar` arbiter on facts (for `body`, the Arabic text is in
   `arabic_body`); `ctx` says where it renders; `precedent` = published zh/de/ru/ur (for understanding what
   the string does and which facts the other lines kept, never copied). `ref.json`: the approved Turkish
   frame (`ui`), the calibration page (`calibration` — register, name forms, card and FAQ patterns),
   termbase entries present in the sources (`terms`), approved pairs (`tm`).
5. Site rules: invent nothing (hours, fees, distances, dates, superlatives); Latin digits; "the largest
   oasis in the world" (never palm/natural); non-Arabic bodies are plain text — no Markdown, no links;
   the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see). Expect at least: قصر محيرس · قصر خزام · بيت البيعة · قلعة العقير (the Turkish form of العقير is already ruled: «Ukayr», article-less) · مسجد الجبري · الهفوف (Hüfuf) · المبرز (Müberrez) · الكوت and any district, ruler, dynasty or tribe the bodies name. Published Turkish titles of places the sources mention are in `ref.json.places` and are byte-binding.
the Turkish keeps it (P3: «Kasr İbrahim»? — decide from the Arabic رسم and TDV usage, record it); where the
English translated it («Mosque», «School», «Palace», «Castle») the Turkish translates it.
Collisions with ordinary Turkish words are accepted as inherent (precedent: Kare, Busalih) with a light
in-text mitigation only where the calibration did one.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre» (ruling «Attribution placement»). Clock times «08.00–17.00» (P10), day ranges «Pazar–Perşembe»,
currency «50 Suudi riyali (SAR)» at first mention then «50 SAR», Hijri per the calibration «Hicri 962 (1555)»
(P11 open — keep this form and flag). The Arabic body is the arbiter where it differs from the English on a
fact: report the divergence in `source_defects`, never reconcile it in the Turkish.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-2", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 64 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool (never through a
shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
