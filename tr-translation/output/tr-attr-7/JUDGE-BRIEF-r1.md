# Judge brief — batch `tr-attr-7` (delfoon-lake, national-park, jawatha-park, najm-park, mushaqar + two frame strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a7\tr-translation\output\tr-attr-7`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a7` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, the two frame strings and their siblings, name policy, body rules, the three lessons).
3. `BATCH\pack.json` (54 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`; two of them are `ui.crumb.leisure` and `ui.det.allLeisure`) and `BATCH\ref.json` (approved frame, `ui_siblings`, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `checks`, `fence_removed`, `facts_not_added`, 12 termbase proposals with attested/unattested status, source defects). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05 — the new frame strings applied too. The reader's input is `BATCH\stages\06-blind-reader-input.on-05.filtered.txt`, taken mechanically from the build cut `06-blind-input.on-05.txt` (frame lines dropped by pattern; the breadcrumb and back-link lines kept on purpose; nothing added). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P1, P3, P6, P10, P11, P12 —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-6`, `_meta.open_items`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **In scope this time: the two frame strings** «Çarşılar ve parklar» (breadcrumb) and «Tüm çarşılar ve parklar →» (back link), which render on every souq/park/farm page — not only these five. Score them inside the pages they appear on, and rule them against their approved siblings (nav «Çarşı, park ve çiftlikler»; «Gezilecek yerler»; «Tüm gezilecek yerler →»).
- **Out of scope**: the rest of the frame (header, footer, card labels, «Ziyaret bilgileri», «Sıkça sorulan sorular», the category label in the breadcrumb line, the hours notice, «[button]» markers) — approved in `tr-ui-1`; published Turkish titles of other pages («Cüvasa Camii», «El-Hubeyl Gölü», «Cebel el-Kare»).
- **Visit-card rows and FAQ question patterns reuse approved tm pairs verbatim** where the English recurs.
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one. jawatha-park states flatly that Jawatha was «the first place where Friday prayer was held after the Prophet's Mosque», while the published Cüvasa Camii page hedges it — a `source_defect` for the owner, not an edit. Ain Najm: keep the English's hedge and attribution exactly — no medical claim stronger or weaker than «sought … for its healing waters», «described as».
- Rulings (calibration, tr-ui-1, tr-attr-1 … 6) are not reopened. Open items P6/P7/P11/P12 are not settled silently: rule only what this batch's text forces, and say so.
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **The two frame strings** (plural «Çarşılar», crumb not mirroring the nav item's «çiftlikler» because the English crumb has no farms, casing, the arrow). They will show on every souq and farm page too: say whether the wording fits those.
  2. **Names:** «Ed-Dilfun Gölü» (from the pack's Arabic الديلفوون; the English is «Delfoon»; alternative «Ed-Delfun»); «El-Ahsa Millî Parkı»; «El-Umran» (TDK has only archaic «ümran»); «Ayn en-Necm» vs «Ayn Necm» (P1 keeps the article the Arabic writes; tr.wikipedia «Ayn Calut»); «Muşakkar» article-less (TDV running text in two articles, «Müşakkar» in one) — a P1 closed-list candidate; «Eş-Şeybani»; «Hecer Kalesi»; «Cüvasa Ormanı»; «ılgın» (TDK).
  3. **Country before the ministry** («Suudi Arabistan'ın Tarım Bakanlığına aitti») on A6-ministry; **first-mention currency** «10–15 Suudi riyali (SAR)» on the card with bare «SAR» in the FAQ (published Cüvasa Camii pattern).
  4. **P10 forms**: «06.00–18.00», «08.00–24.00» / «08.00'den 24.00'e kadar», «16.00–23.30».
- **Check against the English, sentence by sentence, at least**: najm-park.body «1799'da El-Ahsa halkı pınarın yanında, daha sonra imamlık makamına gelen Suud bin Abdülaziz'e biat etti; Kral Abdülaziz de …» (long; who did what, where); national-park.body «Proje, Suudi Arabistan'ın Tarım Bakanlığına aitti» (the English: «began … as a Ministry of Agriculture project»); mushaqar.body «Kalenin komşusu, … Muşakkar Pazarı'ydı» (the English attaches «neighbour to the Mushaqar market» to the fort).
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lessons:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact. Re-read every sentence you touch for who does the verb. Words readers misread before: «sınırlıdır», «eski» before a name, «simge», «diğer». Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-7", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "delfoon-lake": n, "national-park": n, "jawatha-park": n, "najm-park": n, "mushaqar": n, "ui-frame": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 54, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A7-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug or ui>", "field": "<field or ui key>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-7 (tr): delfoon-lake · national-park · jawatha-park · najm-park · mushaqar + ui crumb.leisure/det.allLeisure — 54 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a7 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-7 stages/07-judge.r1.json --prev stages/05-proofreader.json` until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
