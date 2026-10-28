# Judge brief — batch `tr-ui-1`, round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-ui\tr-translation\output\tr-ui-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-ui` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — your role and rubric (pass threshold 90 from `REPO\tr-translation\config.json`; the batch score is the lowest page score; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, Turkish specifics).
3. `BATCH\pack.json` (95 strings: `en` source, `ar` arbiter, where each renders, `precedent`, `calibration_candidate`).
4. The stage files in `BATCH\stages\`: `01-translator.json` … `05-proofreader.json` (with their notes, checks, open questions and termbase proposals). Your input text is `05-proofreader.json`.
5. The blind reader's notes: `BATCH\stages\06-blind-reader.on-05.md`. The reader saw only the page text as built from stage 05 (`BATCH\stages\06-blind-input.on-05.txt` is the raw cut; the reader got it lightly regrouped: lists joined with «·», the repeated header/footer of page 2 abbreviated), never the sources, and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (terms, `_meta.calibration_rulings`, `_meta.open_items`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules for the blind-reader rulings
- **Out of scope**: text that is not a string of this batch — the Jabal Al-Qarah page body, title, summary, card values and FAQ (approved calibration text, 90/100), the brand, the language names, the English names of nearby attractions and trails (English fallback until their own batches), and the Arabic/Chinese wordmark. A note on such text is `out_of_scope`; if it shows a real defect in published approved text, log it under `source_defects` (do not edit it).
- **Tool artefacts**: "[button]" markers, the group counts on page 1 (the lists were shortened for the reader), hidden blocks. A note that treats an artefact as page text is `out_of_scope` with that reason.
- Every source defect (English or Arabic) is recorded, not deducted from the translation score; invent nothing to cover one.
- Do not ask the owner for approvals; settle by rulings and precedents. Only facts the sources do not settle become owner questions.

## Measured facts you can rely on
- Header row (`tools/measure-header-fit.mjs`, 1920px, stage-05 labels): the Turkish nine links + trails need 1732px of window at the default font (en 1476, ru 1668 at its compressed 13px font). Link widths at 15px: Gezilecek yerler 113 · Rotalar 50 · Çarşı, park ve çiftlikler 157 · Etkinlikler 71 · Vaha meyveleri 106 · El-Ahsa mutfağı 111 · Yeme içme 76 · Konaklama 77 · Çevrim içi mağazalar 145 · Harita 44 (total 950; Russian 935). The coordinator will place Turkish under the Russian precedent (trails link moved to the footer, compressed font and gap, burger below the measured width): **no label has to be shortened for the row to fit**. Shorten a header label only on linguistic grounds.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool)
```
{ "batch": "tr-ui-1", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "/tr/attractions/": n, "/tr/attractions/jabal-al-qarah/": n, "404": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 95, the final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],          // your edits vs 05, nothing else
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "UI1-…", "title", "ruling" } ],         // batch-level decisions that bind later Turkish batches (e.g. the circumflex rule, «gezilecek yer», control forms)
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "ui", "field": "<key>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [],
  "notes": [ "…" ], "scores_row": "\"tr-ui-1 (tr): interface strings — 95\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `node C:\Users\truyr\node-store\va-scratch\tr-r1\tools\verify.mjs tr-ui-1 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. Write Turkish only with the Write tool (no `node -e`, no shell heredoc). Do not edit any other file.

Report back: the RESULT line, the score and decision, your edits with reasons, the rulings you made, and what you could not verify.
