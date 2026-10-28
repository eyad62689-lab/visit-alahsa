# Judge brief — batch `tr-attr-6` (asfar, uqair-beach, salwa-beach, hubail-lake, king-abdullah-park), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a6\tr-translation\output\tr-attr-6`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a6` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the three lessons).
3. `BATCH\pack.json` (59 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `fence_removed`, `facts_not_added`, termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05 (`BATCH\stages\06-blind-input.on-05.txt` is the full cut from the build; the reader got the main text, card and FAQ). **One correction:** the reader's copy of page 5 carried an extra line «[button] Tüm çarşılar ve parklar» that is not on the built page (an error in assembling the reader's input; the built page shows only the English frame link «All souqs & parks →»). Any note on that line is void: rule it `out_of_scope` with that reason.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P3, P6, P10, the UNESCO component sentence —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-5`, `_meta.open_items`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels from ui.tr, «Ziyaret bilgileri», «Sıkça sorulan sorular», the UNESCO badge line, the nearby list, the routes block, the hours notice, «[button]» markers) — approved in `tr-ui-1`; English fallback names of other places and routes; published Turkish titles of other pages. **The English frame link «All souqs & parks →» on king-abdullah-park** is a missing `det.allLeisure` key in `ui.tr` (every other language has it; this is the first Turkish leisure page): rule it `out_of_scope`, record it in `notes` as a frame gap for a UI batch — it is not this batch's text and no Turkish is written for it here.
- **Visit-card rows and FAQ question patterns reuse approved tm pairs verbatim** where the English recurs.
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one (no water quality, swimming safety, bird species, facilities, distances the English lacks). king-abdullah-park has an identical summary and body in the English (one sentence, rendered twice on the page): a `source_defect` for the owner, not an edit.
- Rulings (calibration, tr-ui-1, tr-attr-1 … 5) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so (P6: hubail-lake «teyit edilmeyi bekliyor» vs «teyit bekliyor»).
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **Generic forms per P3:** «El-Asfar Gölü», «El-Hubeyl Gölü», «Ukayr Plajı», «Selva Plajı», «Kral Abdullah Çevre Parkı» (the «çevre» = "surroundings" risk: decide from what the reader actually did).
  2. **Administrative level:** stage 2 replaced «El-Ahsa ili» with «Selva, idari olarak El-Ahsa'ya bağlıdır»; stage 4 found «El-Ahsa Valiliği» on tr.wikipedia. Rule the form for "governorate" for later pages.
  3. **Names:** El-Cafura (AA, gas field), El-Hubeyl (attested only as a surname), the ministry with or without «Suudi Arabistan», «Suudi Arabistan'ın» for «the Kingdom», «karadan açılan kapısı».
  4. **UNESCO sentence for a component other than Cebel el-Kare:** the English says the lake «is one of the twelve components» — rule the form against the calibration's component-sentence ruling and the approved Khuzam/Sahood pairs.
  5. **Words:** «dört çekerli» (not a TDK headword), «drenaj suyu», «gezi noktası», «yaz tatili yöresi».
- **Check against the English, sentence by sentence, at least**: uqair-beach.body «ziyaretçilere ayrılmış gölgeliklere ve tesislere bitişiktir» (does the beach adjoin the facilities, as the English says, and is «bitişiktir» natural for shades and facilities?); salwa-beach.body sentence 1 (four place phrases before «bulunur» — lesson 1); asfar.bestTime and faq.3.a (identical; fine if the English is identical); the park hours card value (P10, «midnight»).
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lessons:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact. Re-read every sentence you touch for who does the verb (batch 4: «cami … namaz kılabilir»). Words readers misread before: «sınırlıdır», «eski» before a name, «simge». Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-6", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "asfar": n, "uqair-beach": n, "salwa-beach": n, "hubail-lake": n, "king-abdullah-park": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 59, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A6-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-6 (tr): asfar · uqair-beach · salwa-beach · hubail-lake · king-abdullah-park — 59 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a6 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-6 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
