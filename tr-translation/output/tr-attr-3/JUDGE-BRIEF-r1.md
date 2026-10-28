# Judge brief — batch `tr-attr-3` (five attractions: jalaniyah, dibs, bubakr-ribat, qubba-mosque, tahimiyah-w), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a3\tr-translation\output\tr-attr-3`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a3` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the split-don't-reorder lesson).
3. `BATCH\pack.json` (22 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `fence_removed`, `facts_not_added`, open questions, 14 termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05 (`BATCH\stages\06-blind-input.on-05.txt` is the exact cut the reader got). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` for `tr-ui-1`, `tr-attr-1`, `tr-attr-2`, `_meta.open_items`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels from ui.tr, «Gününüzü tamamlayın», «Rotanıza ekleyebileceğiniz yakın yerler», the distances note) — approved in `tr-ui-1`; the English names of nearby places (fallback until their batches); «[button]» markers; published Turkish titles of other pages (Kasr İbrahim, Beyt el-Biat, El-Cebri Camii, Sahud Sarayı, Cebel el-Kare). A note there is `out_of_scope`; a real defect in published approved text goes to `source_defects`, not an edit.
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one. Stage 2 restored the English wherever stage 1 had followed the Arabic; do not undo that. Stage 4 kept «yerel adıyla» in bubakr-ribat.body on the Arabic's authority — rule whether the English («properly … known locally»?) carries it; if it does not, it goes.
- Rulings (calibration, tr-ui-1, tr-attr-1, tr-attr-2) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so (P11: «Hicri 1280 (yaklaşık 1863)» — the «yaklaşık» inside the bracket is new; rule it).
- **Name rulings you must make in this batch** (binding for later batches, each with its evidence): «Uyuniler Devleti» / «Uyuniler dönemi» (TDV «Uyûnîler Devleti»; P4 plain spelling); «Ed-Dibs Camii» as title with «El-Fatih Camii» as the official name (TDV CEBRÎLER «Mescidü'd-Dibs»); «Mehmed Ferruh Paşa» (TDV); «bint» for women; «Ebu Bekir el-Mulla Ailesi Ribatı» and the local «El-Bubekir Ribatı»; «ribat» unglossed or glossed; «Er-Ruveyde semti» inside «El-Kut mahallesi» (stage 1 flagged that semt/mahalle inverts the usual size order); «Et-Tahimiye Batı Camii»; «Cübeyl ve Yenbu Kraliyet Komisyonu» (Cübeyl collides with Byblos on tr.wikipedia); «İslami» and «Şafii» spelling; «kırk caminin köyü». Collisions with ordinary Turkish words (Fatih, Hibe, Battal) are accepted as inherent unless the reader actually misread.
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lesson of the two earlier batches:** fix a stumbling sentence by splitting it into two short ones, not by reordering it. Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool)
```
{ "batch": "tr-attr-3", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "jalaniyah": n, "dibs": n, "bubakr-ribat": n, "qubba-mosque": n, "tahimiyah-w": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 22, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A3-…", "title", "ruling", "evidence" } ],       // name rulings and any batch-level decision
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-3 (tr): jalaniyah · dibs · bubakr-ribat · qubba-mosque · tahimiyah-w — 22 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a3 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-3 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. JSON only with the Write tool. Touch no other file.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the name rulings, owner questions, and what you could not verify.
