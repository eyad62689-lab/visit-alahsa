# Judge brief — batch `tr-attr-4` (five attractions: tahimiyah-e, hubaish, umzurainiq, uqair-mosque, abubakr-mosque), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a4\tr-translation\output\tr-attr-4`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a4` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the two lessons: split don't reorder; the English is the translation source).
3. `BATCH\pack.json` (26 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `fence_removed`, `facts_not_added`, 11 termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05 (`BATCH\stages\06-blind-input.on-05.txt` is the exact cut the reader got). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` for `tr-ui-1`, `tr-attr-1`, `tr-attr-2`, `tr-attr-3`, `_meta.open_items`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels from ui.tr, «Gününüzü tamamlayın», «Rotanıza ekleyebileceğiniz yakın yerler», the distances note) — approved in `tr-ui-1`; the English names of nearby places (fallback until their batches); «[button]» markers; published Turkish titles of other pages (Et-Tahimiye Batı Camii, Cebel el-Kare, Huzam Sarayı, El-Emiriye Okulu, Ukayr Kalesi, Ukayr, Ebu Bekir el-Mulla Ailesi Ribatı, Beyt el-Biat, Ed-Dibs Camii). A note there is `out_of_scope`; a real defect in published approved text goes to `source_defects`, not an edit.
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one. Stage 4 removed stage 3's «Suudi Arabistan'ın» before «Doğu Bölgesi» in umzurainiq.body because the English does not carry it; if the reader read «Doğu Bölgesi» as a region of Türkiye, rule it (leave bare, or a mitigation that adds no fact) and say why.
- Rulings (calibration, tr-ui-1, tr-attr-1/2/3) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so.
- **Check against the English, sentence by sentence, at least these two places** (a split can change a relation): abubakr-mosque.body opens «Hüfuf'un tarihî El-Kut mahallesinin kalbi, El-Mulla ailesinin evi ve dinî okullarının yakınındadır. Burada … bulunur» — does the English say the *mosque* stands in the heart of the district near the family's house, or that the district's heart is near the house? uqair-mosque.body «Cami, programın kapsadığı El-Ahsa camilerinden biriydi» — does the past tense and «programın kapsadığı» say what the English says?
- **Name rulings you must make in this batch** (binding for later batches, each with its evidence): «Et-Tahimiye Doğu Camii» (on the West mosque's pattern) and «Et-Tahimiye Birinci Camii»; «Ebu en-Nuuş Camii»; «Ez-Zuheyri deresi» vs «Ez-Züheyri» (TDV «ZÜHEYR b. EBÛ SÜLMÂ» attests the stem with ü); «Güney er-Rifa mahallesi» (lower-case article after «Güney»; alternative «er-Rife»); «Şeyh Abdülaziz el-Alci»; «Ümm Zureynik Camii»; «El-Uveymiriye mahallesi»; «Ukayr Limanı Camii»; «Doğu Bölgesi» (tr.wikipedia «Doğu Bölgesi (Suudi Arabistan)»); «Doğu Camii» as the Mulla mosque's other name; «rehabilite edildi» vs «restore edildi» (the English uses both verbs); «tarihî cami» for «heritage mosque»; «ilim ehli»; «kare biçimli minare». Collisions with ordinary Turkish words are accepted as inherent unless the reader actually misread.
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lesson of the earlier batches:** fix a stumbling sentence by splitting it into two short ones or by naming the subject, not by reordering it. Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool)
```
{ "batch": "tr-attr-4", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "tahimiyah-e": n, "hubaish": n, "umzurainiq": n, "uqair-mosque": n, "abubakr-mosque": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 26, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A4-…", "title", "ruling", "evidence" } ],       // name rulings and any batch-level decision
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-4 (tr): tahimiyah-e · hubaish · umzurainiq · uqair-mosque · abubakr-mosque — 26 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a4 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-4 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. JSON only with the Write tool. Touch no other file.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the name rulings, owner questions, and what you could not verify.
