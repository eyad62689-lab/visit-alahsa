# Batch `tr-ui-1` — Turkish interface strings (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The Turkish structural core is built: `/tr/attractions/` and `/tr/attractions/jabal-al-qarah/` exist, but
their frame (header, footer, search, language suggestion, index and detail-page labels) is English
fallback, so both pages are unlisted. This batch translates those **95 strings** (`pack.json`):
78 keys of `src/i18n/ui.ts`, the ten category labels, the two distance labels, the oasis name in JSON-LD,
the attractions hint, and the three strings of the Turkish block of the 404 page.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-ui` (branch `i18n/tr-ui-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-ui-1`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you. Your own helper files (if any): `BATCH\stages\_<stage>-*`.
- Checker: `node C:\Users\truyr\node-store\va-scratch\tr-r1\tools\verify.mjs tr-ui-1 <file> [--prev <file>]`
  — run it on your output until it prints `RESULT [OK]`. If you think a finding is wrong, do not shape
  the text to it: leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, and your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (names, byte-identical in the text, with their
   suffix vowel) and `_meta.calibration_rulings` (P1 P2 P3 P4 P5 P8 P9 P10 and the named rulings).
   **A ruling is not reopened, and it supersedes any role-file sentence that still calls the item
   "open"** (the role files were written before the calibration). `_meta.open_items` (P6 P7 P11 P12) are
   not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused verbatim when its English recurs.
4. `pack.json`, per string: `en` is the source; `ar` is the arbiter where the two differ on a fact;
   `renders`/`element`/`where`/`nav` say where and how the string appears; `placeholders` must come back
   unchanged; `precedent` = the published approved zh/de/ru/ur (for understanding what the string does,
   never copied); `calibration_candidate` = the frame string written during the calibration — a strong
   proposal, not approved text: keep it unless your role finds a reason, and say the reason.
5. Site rules: invent nothing; Latin digits; "the largest oasis in the world" (never "palm"/"natural");
   no Markdown; the brand «Visit Al-Ahsa» stays Latin (P2).

## Turkish specifics for interface strings
- `siz` forms; buttons and links are imperatives in the polite plural (`Kaydedin`, `Paylaşın`) or noun
  phrases — whichever Turkish sites use for that control; be consistent across the batch.
- P9: sentence case for labels and headings (`Sıkça sorulan sorular`); proper names keep capitals.
- Header labels (`nav: …` in the pack) sit in one row of nine links: keep them short — the row is
  measured after the batch (`tools/measure-header-fit.mjs`), and a long label costs a breakpoint.
  `nav.stayShort` is the short header form of `nav.stay`; `nav.dining` and `nav.dine` are the header and
  footer forms of the same page.
- Category labels are short plural noun phrases. P4 settles circumflexes in **names** only; whether a
  common word carries one (the TDK adjective suffix -î, â after k/g/l) is not settled — decide once for
  the batch following the TDK Yazım Kılavuzu, apply it everywhere, and record the decision in `notes`.
- `search.escHint` follows a rendered key cap «Esc»; `det.openMaps` keeps its final «↗»;
  `det.allSights` keeps its arrow «→» (`det.allSights` in the pack shows where).
- There is no Turkish home page yet: `crumb.home` and the 404 «home» button lead to the English home.
  Translate the label as the label of a home page anyway (it will lead to the Turkish home once it exists).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-ui-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 95 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool (never through a shell heredoc or `node -e`). Keep console
output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one
line of reasoning each; open questions and termbase proposals; anything in the source that looks wrong;
what you could not verify.
