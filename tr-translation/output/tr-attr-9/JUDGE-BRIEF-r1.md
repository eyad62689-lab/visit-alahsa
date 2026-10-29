# Judge brief — batch `tr-attr-9` (ahsa-house-museum, khalifa-museum, abdulrazaq-museum, dar-alturath, dhafar-museum), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a9\tr-translation\output\tr-attr-9`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a9` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the three lessons, this batch's own traps).
3. `BATCH\pack.json` (34 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `fence_checked`, `fence_removed`, `facts_not_added`, 22 termbase proposals with attested/unattested status, 8 source defects, the pass-05 `checklist`). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05. The reader's input is `BATCH\stages\06-blind-reader-input.on-05.filtered.txt`, taken mechanically from the build cut `06-blind-input.on-05.txt` (search-engine description lines and the nearby block dropped by pattern; nothing added). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P1, P3, P4, P10 —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-8`, `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels, «Ziyaret bilgileri», the breadcrumb and back link, the category label «Müzeler», the hours notice, «[button]» markers); published Turkish titles of other pages («El-Ahsa Müzesi», «El-Kaysariye Çarşısı»).
- **Visit-card rows reuse approved tm pairs verbatim** where the English recurs («Ziyaret saatleri», «Ücretler»).
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one (no phone number for "by prior arrangement", no clock for dhafar-museum's "Evenings").
- Rulings (calibration, tr-ui-1, tr-attr-1 … 8) are not reopened. Open items P6/P7/P11/P12 are not settled silently.
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **The three collision names** (family names that are ordinary Turkish words): «El-Halife Miras Müzesi» / «Hüseyin Ali el-Halife» (halife = caliph), «Salih ez-Zafer Müzesi» / «Salih bin Abdüllatif ez-Zafer» (zafer = victory), «Abdürrezzak el-Arab Müzesi» / «Abdürrezzak el-Arab» (b kept from ب; Arap = Arab). The mitigation is the calibration's (Kare, Busalih): full name at first body mention, no bare family name in running text. Weigh what the blind reader actually did with each.
  2. **«Dar et-Turas»**: stage 4 moved the gloss «(Miras Evi)» out of the title into the body's first mention, on the A2 precedent — the published title is «Beyt el-Biat», bare. Rule it (title_en carries the bracket; P3 says generics follow title_en; SKILL.md says the explanation goes in the body, not the title).
  3. **«El-Mansure»** with the article vs article-less «Mansure» (stage 4: tr.wikipedia and TDV «MANSÛRE» write other places of that name bare; adding it to the P1 closed list is a ruling).
  4. **Saudi bodies**: «Suudi Arabistan'ın Müzeler Kurumundan ruhsat almıştır» (unattested, on the attested «Miras Kurumu»); the lower-case former body «Suudi Arabistan'ın turizm ve millî miras otoritesinin El-Ahsa ofisi» (not «Suudi Turizm Otoritesi»).
  5. **Words**: «divanhane» for diwaniyah (TDK «divanhane: Geniş sofa» — a wide hall, not a reception room; stage 2's note was wrong; alternative «misafir salonu»); «kahve ibrikleri» for dallah (tr.wikipedia «Dallah» calls it «cezve»); «fular» (tr.wikipedia İzcilik); «El-Ahsa evi» for "Hasawi house" (no demonym, on «El-Ahsa mutfağı»); «El-Ahsa Evi Müzesi» over «Ev Müzesi»; «halk kültürü» for folk heritage, «Miras» in titles.
  6. **dhafar-museum.summary**: stage 2 moved "first of its kind" onto the collection (Arabic الأولى; the body hedges "described as") — check against the English summary, which states it flat of the museum's collection.
- **Check against the English, sentence by sentence, at least** (the operator's own reading before the blind reader):
  - dhafar-museum.body «Müzeyi farklı kılan, ünlü izcilik müzesidir. Bu müze, Suudi Arabistan'da türünün ilki olarak tanımlanır.» — «Bu müze» can be read as the whole museum; the English describes the *scouting museum* as the first of its kind. Name the subject if the reader stumbled.
  - khalifa-museum.body «… müze bu sürede büyüyerek bugünkü biçimini aldı: El-Kaysariye Çarşısı'nın eski halini andıran bir halk çarşısı.» — the English "until the museum grew into its present form" and "echoing the old Qaisariyah".
  - Spelling consistency: «eski halini» (khalifa) vs «geliştirilmiş hâliyle» (dar-alturath); «dahildir» (dar-alturath) — TDK's current spelling of each; rule one form for both.
  - dar-alturath's closing section (`## El-Ahsa'daki başka miras müzeleri` and its paragraph): the three names byte-identical to this batch's titles and «El-Ahsa Müzesi».
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lessons:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact. Re-read every sentence you touch for who does the verb. Readers always ask for things the source does not have (who is the founder, what is in the scouting museum, a phone number) — those are owner questions or rejected, not edits. Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-9", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "ahsa-house-museum": n, "khalifa-museum": n, "abdulrazaq-museum": n, "dar-alturath": n, "dhafar-museum": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 34, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A9-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-9 (tr): ahsa-house-museum · khalifa-museum · abdulrazaq-museum · dar-alturath · dhafar-museum — 34 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a9 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-9 stages/07-judge.r1.json --prev stages/05-proofreader.json` (from BATCH) until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
