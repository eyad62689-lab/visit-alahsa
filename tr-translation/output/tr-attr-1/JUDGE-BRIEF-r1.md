# Judge brief — batch `tr-attr-1` (five attractions), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a1\tr-translation\output\tr-attr-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a1` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules).
3. `BATCH\pack.json` (64 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `fence_removed`, open questions O1–O5, 26 termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05 (`BATCH\stages\06-blind-input.on-05.txt` is the cut; the reader got it lightly regrouped with card rows joined by «:» and FAQ pairs by «—»). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` P1–P5/P8–P10 and the named rulings, `_meta.batch_rulings['tr-ui-1']`, `_meta.open_items`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels from ui.tr, «Gününüzü tamamlayın», «Bu yeri içeren rotalar», the hours notice) — approved in `tr-ui-1`; the English names of nearby places and trails (fallback until their batches); «[button]» markers. A note there is `out_of_scope`; a real defect in published approved text goes to `source_defects`, not an edit.
- A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one. The Arabic is the arbiter on facts: where stage 4 found the English dropped a fact the Arabic has, it stays a source defect (the English is the translation source).
- Rulings (calibration and tr-ui-1) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so.
- **Name rulings you must make** (binding for later batches, each with its evidence): the P1 closed list (Ukayr, Müberrez — article-less per TDV; or El-Ukayr/El-Müberrez); «Kasr İbrahim (İbrahim Sarayı)» under P3; «Sahud Sarayı» in the body vs «Kasr Sahud» (the English body's «Qasr Sahood» vs title «Sahood Palace» is a source defect — decide which the Turkish follows and whether a one-time bracket is warranted, as de/ru/zh did); «Cüvasa Camii» vs «Mescidi» (O3); «El-Emiriye Okulu» vs «Emiriye Okulu» (O4); O1 «yarımadanın» vs «Arap Yarımadası'nın»; O2 «asfaltlanmadan». Accept collisions with ordinary Turkish words as inherent (precedent Kare, Busalih) unless a reader actually misread.
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool)
```
{ "batch": "tr-attr-1", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "qasr-ibrahim": n, "al-uqair": n, "jawatha-mosque": n, "sahood": n, "ameeriah": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 64, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A1-…", "title", "ruling", "evidence" } ],       // name rulings and any batch-level decision
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-1 (tr): qasr-ibrahim · al-uqair · jawatha-mosque · sahood · ameeriah — 64 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a1 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-1 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. JSON only with the Write tool. Touch no other file.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the name rulings, owner questions, and what you could not verify.
