# Judge brief — batch `tr-attr-5` (five mountains: shaban, kanzan, arbaa, thulaim, tuwaither), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a5\tr-translation\output\tr-attr-5`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a5` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the three lessons: split don't reorder; the English is the translation source; who does the verb).
3. `BATCH\pack.json` (50 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `verb_doer_checks`, `fence_removed`, `facts_not_added`, 17 termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05 (`BATCH\stages\06-blind-input.on-05.txt` is the full cut; the reader got the tab title, lead, body and visit card of each page). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P3 and the Kare and Şaban collision rulings in particular —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-4`, `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels from ui.tr, «Ziyaret bilgileri», «Bölge», «Gününüzü tamamlayın», the nearby list, the distances note, the hours notice) — approved in `tr-ui-1`; the English names of nearby places; «[button]» markers; published Turkish titles of other pages (Cebel el-Kare, Cüvasa Camii). A note there is `out_of_scope`; a real defect in published approved text goes to `source_defects`, not an edit.
- **The visit-card rows are verbatim tm pairs** («Ziyaret saatleri ve giriş» / «Herkese açık alan — giriş ücretsiz», «Ziyaret saatleri», «Ücretler», «Giriş ücretsiz») plus the new «24 saat açık». Each page's English card has three rows that repeat each other (hours & entry, hours, fees): that is the source's structure; if the reader trips on it, it is a `source_defect` for the owner, not an edit.
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one (no heat, water, footwear, safety, best hour, route — none is in the English).
- Rulings (calibration, tr-ui-1, tr-attr-1 … 4) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so (P11: «Hicri 1333 (1915)»).
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **The «Cebel» gloss.** Stage 3 added «Cebel sözcüğü Arapçada “dağ” demektir» to four pages; stage 4 removed all four (P3 «by need»; the calibration glossed «Cebel» once inside the village-name sentence; earlier batches left it bare; «Dağ,» in the next sentence carries the meaning; TDK does list «cebel» as Arabic «dağ»). Stage 4 recorded the counter-argument: `style_rules.gloss_kurali` (a transliterated word explained once per page). Decide from what the blind reader actually did with «Cebel» on these pages, and state the rule for later mountain pages.
  2. **«Cebel X» titles vs P3's letter** (title_en «X Mountain» would give «X Dağı»): the termbase already holds «Cebel eş-Şaban»; rule it for the whole mountain series.
  3. **Name forms**: Cebel eş-Şaban and «Eba el-Kabari»; Cebel Kanzan, «Kanzan Muharebesi» (tr.wikipedia red link; «Kanzan Savaşı» in another article's running text); Cebel eş-Şube / Eş-Şube (collision with «şube» — accepted or mitigated?); El-Curn; Cebel el-Erba and the gloss «dörtler» (the English's own «the Four»); Et-Taraf (collision with «taraf»; stage 4 offers «Et-Taraf kasabası yakınları» for arbaa.area); Cebel es-Suleym; El-Uyun; Cebel Ebu Huseys; El-Ku (weakest spelling; alternatives El-Kuu, El-Kav); Prens Saad; Yakut el-Hamevi; Selva; El-Ahsa Belediyesi.
  4. **Word choices**: «iyileştirecek» for «humanise» (أنسنة); «simge» for «landmark»; «dinlenme ve eğlence parkı»; «turistik bir tesis».
- **Check against the English, sentence by sentence, at least these places**: kanzan.body «Batı yanında eski Cüvasa Camii'nin çevresine bitişir» (the subject is the massif — does the Turkish make that clear after a sentence about villages?); tuwaither.body «Mahalle, Hüfuf'un yaklaşık yirmi kilometre doğusunda …» (the English attaches the distance and the belt to the mountain's setting — does making the quarter the subject change a fact?); tuwaither.body «yıl boyunca serin esintiler» (site rule C16 binds Cebel el-Kare's warmth to winter; here the English says cool draughts year-round — keep exactly that).
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lessons of the earlier batches:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact. In batch 4 two of the judge's own edits introduced grammar errors that the checker cannot see («cami … namaz kılabilir»); re-read every sentence you touch for who does the verb. Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-5", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "shaban": n, "kanzan": n, "arbaa": n, "thulaim": n, "tuwaither": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 50, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A5-…", "title", "ruling", "evidence" } ],       // name rulings and any batch-level decision
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-5 (tr): shaban · kanzan · arbaa · thulaim · tuwaither — 50 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a5 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-5 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
