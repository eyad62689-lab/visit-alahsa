# Judge brief — batch `tr-attr-8` (kanzan-park, koot-park, musa-park, stadium-park, ahsa-museum), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a8\tr-translation\output\tr-attr-8`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a8` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the three lessons, this batch's own traps).
3. `BATCH\pack.json` (39 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `fence_checked`, `fence_removed`, `facts_not_added`, 18 termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05. The reader's input is `BATCH\stages\06-blind-reader-input.on-05.filtered.txt`, taken mechanically from the build cut `06-blind-input.on-05.txt` (frame lines dropped by pattern; breadcrumb and back link kept; nothing added). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P1, P3, P6, P10, P11 —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-7`, `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels, «Ziyaret bilgileri», the breadcrumb and back link — approved in tr-ui-1 and A7-frame —, the category label, the hours notice, «[button]» markers); published Turkish titles of other pages («Kasr İbrahim», «El-Kaysariye Çarşısı»).
- **Visit-card rows reuse approved tm pairs verbatim** where the English recurs.
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one. The kanzan-park card («Her gün 16.00–24.00», «Giriş ücretsiz») for a park still being built is a `source_defect` and an owner question, not an edit. stadium-park's identical summary and body and its unnamed stadium are a `source_defect`.
- Rulings (calibration, tr-ui-1, tr-attr-1 … 7) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so (P11: «1980'lerin başında (Hicri 1404)» — the English's own order; P6: «henüz teyit edilmedi»).
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **kanzan-park status and tense**: being built; the upper section in partial operation since late 2022 with its listed features; the cable car and two lakes only announced; full operation unconfirmed. Check the summary («dağ kaydırakları, asma köprüler ve şelaleler» after a verbless semicolon) does not read as a finished park.
  2. **«zipline hattı»** (stage 4 replaced «tirolyen hat»: no TDK or tr.wikipedia support; tr.wikipedia «Zipline» uses «zipline hattı»; alternative «ipte kayma hattı») against SKILL.md's ban on English loanwords where a common Turkish word exists — rule it.
  3. **«Cerha»** for Gerrha (tr.wikipedia redirect «Gerrha» → «Cerha», opened) — with stage 4's caveats (the article's Arabic is هجر; the echo of «cerrah»).
  4. **Programme names**: «“Şehirleri iyileştirme” programı» (A5-words «iyileştirecek» for humanise) and «“Birlikte Oynuyoruz” (Nalaab Ma'an)» (the English's own Latin bracket; P4 would give «Nelab Maan» — rule whether a bracket the English carries in Latin is kept as the English has it).
  5. **Names**: «Kanzan Macera Parkı (Eş-Şube)», «Cebel eş-Şube Parkı», «El-Kut Parkı», «El-Musa Parkı» (collision with the given name Musa), «El-Faysal mahallesi», «El-Huber», «El-Muheydib Toplum Hizmeti», «El-Musa Uzmanlık Hastanesi», «Spor Stadyumu Parkı», «El-Ahsa Müzesi» / «El-Ahsa Arkeoloji ve Halk Kültürü Müzesi», «Ayn Kannas», «Dilmun», «İlk ve İkinci Suudi Devleti».
  6. **Words**: «kapsayıcı» (TDK knows only the logic sense; current usage), «engelli», «halka açık tuvaletler», «Halk Kültürü» for Folk Heritage, **«restorasyon bölümü» for "conservation section"** (conservation is not restoration — rule the word), «konferans salonu» for "lecture hall».
- **Check against the English, sentence by sentence, at least**: kanzan-park.body sentences 4–6; ahsa-museum.body «Ana sergi salonunun yanı sıra müzede bir karşılama salonu, bir konferans salonu ve bir restorasyon bölümü bulunur. Karşılama salonunda …» (the English attaches the maps and photographs to the reception gallery — check the split keeps that); musa-park.body «Park, o dönemde … basit bir fikirden doğdu: …».
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lessons:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact. Re-read every sentence you touch for who does the verb. Words readers misread before: «sınırlıdır», «eski» before a name, «simge», «diğer». Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-8", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "kanzan-park": n, "koot-park": n, "musa-park": n, "stadium-park": n, "ahsa-museum": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 39, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A8-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-8 (tr): kanzan-park · koot-park · musa-park · stadium-park · ahsa-museum — 39 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a8 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-8 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
