# Judge brief — batch `tr-attr-11` (lemon-farm, strawberry-farm, sawsan-gardens, taraf-zoo, hamidiyah-souq), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a11\tr-translation\output\tr-attr-11`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a11` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, the three lessons, this batch's own traps).
3. `BATCH\pack.json` (34 strings: `en`, `ar`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `fence_checked`, `fence_removed`, `facts_not_added`, termbase proposals with attested/unattested status, source defects, the pass-05 `checklist`). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05. The reader's input is `BATCH\stages\06-blind-reader-input.on-05.filtered.txt`, taken mechanically from the build cut `06-blind-input.on-05.txt` (search-engine description, the Maps line, the nearby and trails blocks dropped by pattern; FAQ kept; nothing added). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P1, P3, P4, P10 —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-10`, `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels, «Ziyaret bilgileri», «En iyi zaman», «Sıkça sorulan sorular», the breadcrumb and back link, the category label, the hours notice, «[button]» markers); published Turkish titles of other pages («Ukayr», «El-Kaysariye Çarşısı», «Zanaatkârlar Çarşısı»).
- **Visit-card rows reuse approved tm pairs verbatim** where the English recurs («Her gün 16.00–21.30», «Güncel durum»).
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one (no season dates, no phone, no restaurant hours). lemon-farm's body = summary (one sentence) is the source's own shape; hamidiyah-souq's "pending confirmation" sentence is the site's editorial sentence and stays.
- Rulings (calibration, tr-ui-1, tr-attr-1 … 10) are not reopened. Open items P6/P7/P11/P12 are not settled silently.
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **The Hasawi lime**: «misket limonu» vs «limon» for the lomi (stage 4's attestation), the title's generic per P3, «(lomi)» kept Latin as the English has it; the Hasawi rule (El-Ahsa + noun) in the title and the sentence.
  2. **Collision names**: «Es-Sevsen» (süsen = iris), «Et-Taraf» (taraf = side; «kasabası» where the English says "the town of"; the area row with or without «kasabası» — the A5 open option, rule it), «Şark Restoranı» or the dining page's own Turkish name for Sharq Restaurant (şark = the Orient, dated) — the mitigation is the generic beside the name, never a respelling.
  3. **Hamidiyah's status wording**: "heritage landmark rather than a working souq", "no longer trades as a folk market", "the activity in its building is Sharq Restaurant", «Güncel durum» row value — the owner's ruling that it is a heritage landmark must survive every string, FAQ included.
  4. **Place chains**: «Kuzey er-Rifa mahallesi» + «Kral Abdülaziz Caddesi/Yolu» (rule the generic for "Road" with TDK/press usage) — split, don't stack three complements.
  5. **Season words** on the farm cards («Her gün, yetiştirme mevsimlerinde 16.00–21.30»? «Kış ve bahar mevsiminde 15.30–21.30»?) — plain, no dates; and «Haziran ortasından Ağustos'a» for bestTime.
  6. **The identical body/summary pairs** on three pages: byte-identical Turkish (a reader sees the sentence twice — that is the source's shape; log as source defect if the reader complains, do not vary the wording).
- **The operator's own reading before the blind reader**: hamidiyah-souq.body «Günümüzde bina çalışan bir çarşı değil, tarihî bir yapıdır. Bina artık halk çarşısı olarak çalışmıyor; içinde bugün Şark Restoranı hizmet veriyor.» — the English is one sentence with a colon ("Today it is a heritage landmark rather than a working souq: it no longer trades as a folk market, and the activity in its building is Sharq Restaurant"); the Turkish split makes the two halves read as a repetition — weigh whether the colon shape («… tarihî bir yapıdır: artık halk çarşısı olarak çalışmıyor; …») serves better, with no new fact. Also «Bina» opens five of the body's eight sentences where the English uses "it"; Turkish drops a known subject — vary only where the subject is unmistakable (A6-r2-subject still binds where it is not). sawsan-gardens.summary «El-Ahsa vahasının ortamında …» for "amid the atmosphere of the Al-Ahsa oasis" — «ortam» reads as "environment/setting"; weigh «havasında»/«atmosferinde» against the reader's note, if any. taraf-zoo.area «Et-Taraf — Hüfuf'un doğusu» — the A5 open option («Et-Taraf kasabası — …», the Arabic row has بلدة) is yours to rule.
- **Check against the English, sentence by sentence, at least**: taraf-zoo.body (three sentences; "easily combined with a visit to the nearby Al-Taraf countryside and the southern reaches of the oasis"; "Check locally before planning the trip" as a polite siz instruction); hamidiyah-souq.body sentences 2–3 (what was restored alongside what; "joining the cluster of heritage souq buildings at the city's core"); hamidiyah-souq.faq.0.a.
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions`.
- **Lessons:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact; a card lead with a participial chain before its head noun becomes two sentences (tr-attr-10). Re-read every sentence you touch for who does the verb. Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-11", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "lemon-farm": n, "strawberry-farm": n, "sawsan-gardens": n, "taraf-zoo": n, "hamidiyah-souq": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 34, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A11-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-11 (tr): lemon-farm · strawberry-farm · sawsan-gardens · taraf-zoo · hamidiyah-souq — 34 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Write the JSON as soon as it is complete, then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a11 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-11 C:/Users/truyr/node-store/va-wt/tr-a11/tr-translation/output/tr-attr-11/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-a11/tr-translation/output/tr-attr-11/stages/05-proofreader.json` until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
