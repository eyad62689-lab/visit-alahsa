# Judge brief — batch `tr-attr-10` (najim-museum, qaisariyah, ardh-alhadarat, craftsmen-souq, duqat-algharash), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-a10\tr-translation\output\tr-attr-10`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-a10` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest page; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, name policy, body rules, the three lessons, this batch's own traps).
3. `BATCH\pack.json` (65 strings: `en`, `ar`/`arabic_body`, `ctx`, `precedent`) and `BATCH\ref.json` (approved frame, calibration page, places, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `fence_checked`, `fence_removed`, `facts_not_added`, termbase proposals with attested/unattested status, source defects, the pass-05 `checklist`). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the five pages as built from stage 05. The reader's input is `BATCH\stages\06-blind-reader-input.on-05.filtered.txt`, taken mechanically from the build cut `06-blind-input.on-05.txt` (search-engine description lines and the nearby block dropped by pattern; nothing added). The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings` — P1, P3, P4, P5, P10 —, `_meta.batch_rulings` for `tr-ui-1` and `tr-attr-1` … `tr-attr-9`, `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Standing rules
- **Out of scope**: the frame (header, footer, card labels, «Ziyaret bilgileri», «En iyi zaman», «Sık sorulan sorular», the breadcrumb and back link, the category label, the hours notice, «[button]» markers); published Turkish titles of other pages («Cebel el-Kare»).
- **Visit-card rows and FAQ answers reuse approved tm pairs verbatim** where the English recurs («Her gün 08.00–23.00 (tatillerde uzatılabilir)», «Her gün 08.00'den 23.00'e kadar açıktır; tatillerde saatler uzatılabilir.», «15 Suudi riyali (SAR)», «Giriş ücretsiz»).
- **The English is the translation source.** A source defect (English or Arabic) is recorded, never repaired in the Turkish; nothing invented to cover one (no "Daily" where the English has none — qaisariyah card; no phone; no clock for "Evenings").
- Rulings (calibration, tr-ui-1, tr-attr-1 … 9) are not reopened. Open items P6/P7/P11/P12 are not settled silently.
- **Decisions this batch forces — rule each with its evidence (binding for later batches):**
  1. **Titles that are ruled termbase pairs**: «El-Kaysariye Çarşısı» and «Duğa el-Garaş Çömlek Atölyesi» are byte-binding; «Medeniyetler Diyarı» is bare as a title — rule whether this page's body/FAQ/card carry the calibration's quotes “…” (the English on this page quotes nothing; the calibration page quoted it inside the Cebel el-Kare fee line).
  2. **The qaisariyah sub-heading** «## El-Kaysariye Çarşısı ziyaret saatleri» (the English `## Qaisariyah Souq hours`): sentence case, name byte-identical to the title, and the paragraph under it keeps the published pair for "listed in the visit-information card below".
  3. **Craft words**: «El-Ahsa bişti» + gloss «pelerin» (TDK pelerin read by stage 2); «sırma» and the collocation for "washed with gold or silver"; «tandır fırını»; «çömlekçi çarkı»; «Zanaatkârlar Çarşısı» vs «Zanaatçılar» (TDK cross-reference) — rule each.
  4. **Day-name capitalisation in schedules**: stage 2 capitalised («Cuma yalnızca akşam», «Cuma günleri», «Pazar ve Pazartesi günleri»); P10's own «Pazar–Perşembe» and the tm's «Cuma günü 16.00–20.00» are capitalised, the tm's «cuma ve cumartesi kapalı» (ahsa-museum) is not — rule one form for cards and FAQ, with TDK's rule quoted, and say whether the one published lower-case card is a drift item for the owner (not edited here).
  5. **Names**: «Velid en-Nacim Müzesi», «El-Cefr kasabası» (cefr = divination echo), «Er-Rifa mahallesi» (on A4 «Güney er-Rifa»), «El-Garaş ailesi», «Suudi Arabistan'ın Kültür Bakanlığı», the lower-case «Suudi Arabistan'ın turizm ve miras otoritesi» (A9-saudi-bodies; which body the Arabic names is recorded by stage 4), «UNESCO Yaratıcı Şehirler Ağı» (attested or not, per stage 4).
  6. **SAR on the ardh-alhadarat card**: «Yetişkinler için 50 Suudi riyali (SAR) — tek bilet Medeniyetler Diyarı'nı ve Cebel el-Kare'yi kapsar» (A7 first mention) against the calibration page's pre-A7 pair «Yetişkinler için 50 SAR — …»: rule A7 for this page and record the calibration page as a drift item, not an edit.
- **Check against the English, sentence by sentence, at least** (the operator's own reading before the blind reader):
  - qaisariyah.body: the bisht sentence (who is distinguished by what — "Hasawi weaving is distinguished by the precision of its hand embroidery"), and «yani itibarın ve büyük günlerin pelerinini» as an appositive — does the reader take «pelerin» as the bisht or as a second garment?
  - najim-museum.body: the list of corners (seven items, then "along with …") — split, not reordered; «Suudi Arabistan'ın turizm ve miras otoritesi yetkilileri, müzeyi … olarak övdü» (who praises what).
  - ardh-alhadarat.body: sentence 3 «Köy, Cebel el-Kare'yi ve mağaralarını ziyaret deneyimiyle rotalar, tesisler ve manzara noktaları aracılığıyla bütünleşmiştir.» — the operator read it twice: the accusative «Cebel el-Kare'yi» hangs before «ziyaret deneyimiyle», and two instrumentals («deneyimiyle», «aracılığıyla») compete; the English: "integrated with the experience of visiting the mountain and its caves through trails, facilities and viewpoints". If the reader stumbles too, split it (what the village is joined to; by what means), no new fact.
  - qaisariyah.summary «… zanaat ile yerel ürünler için bir gezi noktası» — «ile» inside a «için» phrase; the English "a destination for crafts and local products"; weigh «zanaat ve yerel ürünler için».
  - craftsmen-souq.body: «112 dükkân», «12.000 metrekareden fazla», the academy clause and the UNESCO clause ("a mission bound up with Al-Ahsa's accession to …").
  - duqat-algharash.body: "press accounts record that pottery has endured on this spot for more than six hundred years" — hedge kept; "from kneading the clay to the wheel to the kiln" as a plain sequence.
- Each termbase proposal becomes a `termbase_additions` entry only with its source (URL seen) or marked `"status": "unattested"` with the Arabic spelling it was built from.
- Do not ask the owner for approvals; only facts the sources do not settle become `owner_questions` (the qaisariyah "best hours" contradiction between body and FAQ is one; the najim "by phone" in the Arabic only is another).
- **Lessons:** fix a stumbling sentence by splitting it, naming the subject or putting the place in the locative — never by reordering, never with a new fact. Re-read every sentence you touch for who does the verb. Readers always ask for things the source does not have — those are owner questions or rejected, not edits. Keep edits few and name them all: every edit you make will be proofread independently and read by a fresh reader before anything ships.

## Your output — `BATCH\stages\07-judge.r1.json` (Write tool, or a node script reading 05)
```
{ "batch": "tr-attr-10", "stage": "07", "round": 1, "date": "YYYY-MM-DD",
  "scores": { "per_page": { "najim-museum": n, "qaisariyah": n, "ardh-alhadarat": n, "craftsmen-souq": n, "duqat-algharash": n } },
  "batch_score": n, "breakdown": { "method": "…", "axes": [ { "axis", "score", "of", "note" } ] },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "01".."05",
  "strings": { all 65, final text after your edits },
  "changes": [ { "key", "before", "after", "why" } ],
  "blind_reader_rulings": [ { "n", "quote", "verdict": "accepted|rejected|source_defect|out_of_scope", "reason", "edit": "<key or null>" } ],  // one per reader item
  "rulings": [ { "id": "A10-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "<slug>", "field": "<field>" } ],  // one per string of the final text
  "source_defects": [ { "keys", "defect" } ], "owner_questions": [ { "id", "question", "options", "from" } ],
  "notes": [ "…" ], "scores_row": "\"tr-attr-10 (tr): najim-museum · qaisariyah · ardh-alhadarat · craftsmen-souq · duqat-algharash — 65 strings\",YYYY-MM-DD,1,<score>,\"<decision and summary>\"" }
```
Then run `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a10 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-10 C:/Users/truyr/node-store/va-wt/tr-a10/tr-translation/output/tr-attr-10/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-a10/tr-translation/output/tr-attr-10/stages/05-proofreader.json` until RESULT [OK]. Touch no other file; Turkish text never through a shell.

Report back: the RESULT line, per-page scores and decision, every edit with its reason, the rulings, owner questions, and what you could not verify.
