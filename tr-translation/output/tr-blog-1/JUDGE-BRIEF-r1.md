# Judge brief — batch `tr-blog-1` (the Turkish blog `/tr/blog/`: frame + three articles, 43 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-blog-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (body structure and links; C15/C16; nothing invented; the frame decisions).
3. `BATCH\pack.json` (43 strings: `en`, `ar`, `ctx`, `precedent`, and `links`) and `BATCH\ref.json` (published tr frame, the linked landmarks' published titles, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (read every `notes`; stage 04 holds the AlUla attestation — Turkish travel pages and the Saudi tourism bodies write «AlUla»; «Ula»/«El-Ula» only in historical/encyclopedic text). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the pages as built from stage 05 (93 items: cite as P1.<n>). Its input `BATCH\stages\06-blind-reader-input.on-05.filtered.txt` was cut mechanically from dist; the reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings`; skip rulings with `superseded_by`) and `REPO\tr-translation\memory\tm.json`, and the published tr block of `REPO\src\i18n\ui.ts` for frame names. Web search is allowed to attest a Turkish usage.

## Units and scores
Score four units and take the lowest: `frame` (the ten `ui.*` keys), `24-hours` (all `24-hours.*`), `48-hours` (all `48-hours.*`), `worth-visiting` (all `worth-visiting.*`). Tags are stored, not rendered: check them, but they do not drive a unit's score.

## Not Turkish faults — rule them, do not edit for them
- **Extraction artifacts** (verdict `artifact`): P1.8 and P1.92 "topic fused with the title" — on the page the topic and the title are two separate elements (checked in dist); the cutter joined them. P1.38 curly vs straight apostrophes — the Markdown renderer prints the body's «'» as «’» in every language; FAQ and breadcrumb print «'»; the source text uses one apostrophe (U+0027) throughout.
- **Published frame and names** (verdict `frame` / `published`): «Visit Al-Ahsa» Latin in the tab beside «El-Ahsa» (P1.1 — brand rule); the published landmark titles «Cebel el-Kare», «Kasr İbrahim», «Duğa el-Garaş Çömlek Atölyesi», «El-Kaysariye Çarşısı», «Ukayr», «Beyt el-Biat», «El-Kut» district (P1.7, P1.14, P1.23, P1.35, P1.58) are not reopened. You may let the English's own descriptive noun stand next to a name where the English has it («the mountain», «the port», «the fort» — P1.16 «Kasr İbrahim kalesi» is a doubling you may remove or keep; rule). «bişt, yani pelerin» is ruling A10-craft (P1.25, P1.73). «Kayıtlı yerlerim» is the published page name (nav.myTrip).
- **Source content** (verdict `source_defect`, listed in `source_defects` with the key; do not add facts): what to do inside the caves, tickets or hours (P1.13, P1.37); which official channels (P1.12, P1.84 — the English has «holidays» on page 4 only: keep it); the 1913 pledge as history (P1.21); walking time, driving distance to Ukayr (P1.23, P1.58); the Friday-only evening opening vs a morning visit (P1.26); whether non-Muslims may enter (P1.29); the lime season defined on page 3 not page 2 (P1.35); the «water» day that visits no spring or canal (P1.50, P1.79 — the English promises «water, green and coast» / «springs and channels»); outdoor stops at midday in a heat page (P1.83); «a car is the practical way» not answering «do I need a car» (P1.89 — keep the English's hedge); «deneyimler» in the index lead (P1.2 — the English «experiences»); the hisy etymology wording (P1.68 — keep its content; fix the Turkish so the name's meaning reads, as the English states it).

## Turkish faults — yours to fix (split, don't reorder; every fact stays)
1. **The calque «miras ___»** (P1.5, P1.10, P1.24, P1.81): «miras kalbi / miras mahallesi / miras çarşısı» → the Turkish a travel writer uses («tarihî merkez», «tarihî mahalle», «tarihî çarşı» …). One pattern for the three articles and their FAQs.
2. **Titles** (P1.3, P1.4): «Yolu buradan geçenler için» misreads (transit only?) — the English «for the Passing Visitor» = a visitor with one day; find the Turkish. Keep «24 saatlik» / «48 Saat» (the English titles). Rule title case: stage 02 set title case before the colon because a published Turkish landmark body quotes the article as «El-Ahsa'da 48 Saat»; keep the H1 and that quote matching.
3. **Wrong-sense or misread words**: «benzetmeyen» (P1.6), «Hayat … canlıdır» (P1.40, P1.67), «parfüm kokar» (P1.24), «Ayrılmadan önce akşam saatleri … kapanış olur» (P1.27 — no subject), «yaşanmış» for lived-in (P1.79), «canlandırma» (P1.75), «Pratik yön» (P1.80 — the English «The Practical Side»; the other two pages print «Pratik ipuçları»: one heading per English heading), «Karar» (P1.86 — «The Verdict» → the Turkish conclusion heading), «İkindi» as a heading among plain times of day (P1.54 — «Öğleden sonra» or the Turkish travel form; one time-of-day system across both itineraries), «tek bir surun altında» (P1.17), «Hemen yakında» (P1.19), «yerel ellerle» vs «halkının elleriyle» (P1.25, P1.49 — one wording), «aynı randevuyu tuttuğu» (P1.88), «yine de» without a contrast (P1.87), «Tam tablo … artı» (P1.81), «işaret eder» (P1.72), «öykünemeyeceği» (P1.65), «sizi bekliyor» (P1.52), «Gezilecek yerler haritası» as a link text (P1.33, P1.61).
4. **One name per feature** (P1.62, P1.82, P1.90): the saved-places feature is called a list, a page and a tool; «aracı» right after «araba» reads as «the car». Use the published page name «Kayıtlı yerlerim» with one consistent noun (the English: «My Trip»/«saved places» — read it) and keep «araç» away from «araba».
5. **Long chains** (P1.15, P1.20, P1.41, P1.51, P1.55, P1.69, P1.77): split where the reader lost the subject; the genitive the ear needs; one idea per sentence.
6. **Frame keys**: `ui.det.mentions.h` «Bu yerin geçtiği yazılar» (P1.92 — misread «passed»; e.g. «Bu yerden söz eden yazılar»); `ui.blog.lead` (P1.2 — filler «ziyaretinizi zenginleştirecek her şey»: keep the English's three items, current Turkish); `ui.blog.title`, `ui.blog.eyebrow`, `ui.blog.published/updated` («Yayımlandı / Güncellendi» unattested — rule and record), `ui.blog.back`, `ui.crumb.blog` «Blog» (nav.blog). «Neden El-Ahsa» as a topic label (P1.8 second part): rule against the English «Why Al-Ahsa» and the published topic system.
7. **Everything else**: applied or rejected with the reason. One line per reader item in `blind_reader_rulings` — all 93.

- AlUla: rule it (stage 04 attests «AlUla»); a `termbase_additions` entry with the attestation URLs.
- Body structure and hrefs exactly as the checker holds them; link texts of landmarks byte-identical to `ref.places[*].title_tr` (suffix after an apostrophe).
- Each termbase proposal of stages 1–5 becomes a `termbase_additions` entry (attested with `"status": "attested"` and the source URL; else `unattested`), using the forms you finally print.
- **Check against the English and the Arabic, sentence by sentence, all 43 strings** after your edits.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-blog-1", "stage": "07", "round": 1, "date": "2026-11-05",
  "scores": { "frame": n, "24-hours": n, "48-hours": n, "worth-visiting": n }, "batch_score": <lowest>,
  "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 43, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json, full text, no "..."
  "blind_reader_rulings": [ { "item": "P1.1", "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published" | "artifact", "key": "…", "why": "…" } ],   // all 93
  "rulings": [ { "id": "BL1-…", "title", "ruling", "evidence" } ],   // binding for tr-blog-2 and later; ids BL1, BL2, …
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "blog", "field" } ],   // every approved string except bodies (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ] }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-blog-1 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-blog-1/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-blog-1/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository other than your output.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the four scores and the decision; the number of keys changed; the rulings in one line each; owner questions (facts only — wording is yours); what you could not verify.
