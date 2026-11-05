# Judge brief — batch `tr-blog-2` (the Turkish blog: four articles, 53 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-blog-2`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (body structure and links; the tr-blog-1 rulings; C15/C16; Cebel el-Kare; the lime; the bisht verbs per article's Arabic; nothing invented).
3. `BATCH\pack.json` (53 strings: `en`, `ar`, `ctx`, `precedent`, and `links`) and `BATCH\ref.json` (published tr frame, the linked landmarks' published titles and summaries, terms, tm).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (read every `notes` and `source_defects`). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the pages as built from stage 05 (89 items, numbered per page: cite P1.<page>.<n>; page 1 = jabal-qarah, 2 = crafts, 3 = souvenirs, 4 = hasawi-lomi). Its input `BATCH\stages\06-blind-reader-input.on-05.filtered.txt` was cut mechanically from dist; the reader saw no source and was not told it is a translation.
6. The published Turkish articles `REPO\src\content\blog\{24-hours,48-hours,worth-visiting}-tr.md` and `REPO\tr-translation\output\tr-blog-1\README.md` (what the line already decided and what readers kept tripping on).
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings`; skip rulings with `superseded_by`) and `REPO\tr-translation\memory\tm.json`. Web search is allowed to attest a Turkish usage.

## Units and scores
Score four units and take the lowest: `jabal-qarah`, `crafts`, `souvenirs`, `hasawi-lomi` (all keys of each). Tags are stored, not rendered: check them, they do not drive a score.

## Not Turkish faults — rule them, do not edit for them
- **Extraction artifacts** (`artifact`): P1.1.27 curly vs straight apostrophes (the Markdown renderer prints the body's «'» as «’»; FAQs print «'»).
- **Published frame and names** (`frame` / `published`): «Cebel el-Kare» / «El-Kare» read as "square" (P1.1.2 — the line note; BL1-qarah-line lets «dağ» stand beside the name where the English says «the mountain»); «Duğa el-Garaş Çömlek Atölyesi», «El-Kaysariye Çarşısı», «Zanaatkârlar Çarşısı», «El-Ahsa Misket Limonu Çiftliği», «El-Ahsa Lomi Sergisi», the published page names «Harita», «Kayıtlı yerlerim», «Gezinizi planlayın», «Vaha meyveleri» (check ref.ui) — not reopened. **«Medeniyetler Diyarı» vs a transliteration** (P1.1.15): check ref.places title_tr for ardh-alhadarat and use the published title byte for byte wherever the article names it.
- **Source content** (`source_defect`, listed with the key; do not add facts): what the caves are for / shelter from what, how to reach the summit, the hours and fees pointed to the landmark page, distance and time to the mountain, the «press reports» hedge (the English has it — keep it), the international exhibitions without years, the UNESCO Creative Cities field, hours of the workshop and shops, the lime farm's location/hours/fees, the exhibition's exact dates and fees, «tüm narenciyelerden» (check the English «sets it apart from …»), the 100,000 trees (keep the number; fix only the misparse), how to tell a real bisht.

## Turkish faults — yours to fix (split, don't reorder; every fact stays)
1. **Introduced by stage 5**: P1.1.9 a sentence now starts with lower-case «ağustosta» after a full stop — capitalise the sentence start («Ağustosta …»; a month inside a sentence stays lower case); P1.4.23 «etmeyi da» → «de». Check every edit of stages 2–5 for the same kind of fault.
2. **Misread or wrong-sense words**: «yerini almıştır» = "replaced" (P1.4.19 → «yer almıştır»); «ziyaretçi rehberi» (P1.1.1); «sığınak» bomb-shelter reading (P1.1.21 — weigh against the Arabic ملاذ; «serin bir kaçış/mola» kind of Turkish); «Halas» / «Şişi» / «Bin Züheyri» read as words (P1.3.3, P1.3.8 — introduce each as a date variety at first mention without adding a fact: «Halas hurması», «Bin Züheyri çeşidi»); «hatıra» alone (P1.3.1 — «hediyelik eşya» in the title if that is the Turkish of «souvenir»; then one form across the title, description, body, FAQ and the other articles' link texts to this article); «ikinci ürün» as the farming term "second crop" (P1.4.1, P1.4.4 — the English «second crop» means the oasis's second product after dates: find the Turkish that reads so, e.g. «hurmadan sonra ikinci ürünü» or «ikinci büyük ürünü»; weigh); «manşet» / «yazlık imza» (P1.4.21); «tur» for an article (P1.1.19, P1.3.13, P1.4.10 — the English «tour» of crafts/fruits means the full guide; one wording, and the same article named the same way across pages: «zanaat turu» vs «zanaatlar turu»); «Arap Körfezi mutfağı» (P1.4.12 — «Arap Körfezi» is the line's ruling for the Gulf; weigh only whether «mutfak» needs it).
3. **Hanging or verbless fragments**: P1.3.9, P1.3.12 (colon fragments with no verb in list items — a list item may be a phrase, but it must parse), P1.3.2 (description ending on «-acağınız»), P1.1.8, P1.1.17, P1.2.17, P1.3.11, P1.3.18, P1.4.13 («lomi … pişer» — the subject is the rice), P1.4.22, P1.4.26.
4. **One term per thing**: dokuma vs nakış for the bisht (P1.2.6, P1.3.11) — **follow each article's Arabic** (BRIEF: never harmonise across articles), but inside one article the description, body and FAQ must not contradict each other where the Arabic of that article does not; if the Arabic itself splits (الحياكة in the description, التطريز in the body), make the Turkish read as one craft («sırma nakışlı El-Ahsa dokuması» kind), adding nothing. The bisht gloss (P1.2.5 — one gloss per article, «pelerin» per A10-craft; «büyük günlerin pelerini» vs «itibarın ve törenlerin pelerini»: one form). cemid as practice vs product (P1.4.11, P1.4.26 — follow the English per sentence; make the two readable as one thing). «misket limonu» vs «limon» (P1.4.11, P1.4.26 — always «misket limonu»). «Vaha meyveleri» vs «mevsimlik meyveler sayfası» (P1.4.10 — the published page name). «el sanatları / halk sanatları / zanaat» (P1.2.12 — follow the English's two terms, no third).
5. **Repetition and filler**: «çok eski» twice (P1.1.4), «kuşaktan kuşağa» as a tic (P1.2.7 — vary where the English does not repeat), «öyle … ki» twice (P1.4.5), «bilmeniz gereken her şey» (P1.1.3 — check the English), «belgelenmiştir / belgelendiği üzere» (P1.3.7, P1.4.8 — the English «documented»: plain Turkish), «Öyle ki» with no antecedent (P1.2.3), «budur» antecedent (P1.2.13), «Ama» contrasting nothing after the UNESCO sentence (P1.1.5).
6. **Long chains** (P1.1.8, P1.1.17, P1.1.25, P1.2.4, P1.2.17, P1.3.13, P1.3.18, P1.4.2, P1.4.6): split where the reader lost the subject; one idea per sentence.
7. **Everything else**: applied or rejected with the reason. One line per reader item in `blind_reader_rulings` — all 89.

- Body structure and hrefs exactly as the checker holds them; link texts of landmarks byte-identical to `ref.places[*].title_tr` (suffix after an apostrophe).
- Each termbase proposal becomes a `termbase_additions` entry; `rulings` ids BL2-… (binding for tr-blog-3 and later).
- **Check against the English and the Arabic, sentence by sentence, all 53 strings** after your edits.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-blog-2", "stage": "07", "round": 1, "date": "2026-11-05",
  "scores": { "jabal-qarah": n, "crafts": n, "souvenirs": n, "hasawi-lomi": n }, "batch_score": <lowest>,
  "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 53, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json, full text, no "..."
  "blind_reader_rulings": [ { "item": "P1.1.1", "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published" | "artifact", "key": "…", "why": "…" } ],   // all 89
  "rulings": [ { "id": "BL2-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "blog", "field" } ],   // every approved string except bodies (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ] }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\blog2j\`). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-blog-2 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-blog-2/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-blog-2/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository other than your output.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the four scores and the decision; the number of keys changed; the rulings in one line each; owner questions (facts only — wording is yours); what you could not verify.
