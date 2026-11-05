# Judge brief — batch `tr-blog-3` (the Turkish blog: the two long sourced articles, 34 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-blog-3`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (Arabic verse byte for byte; external hrefs unchanged; classical names in their established Turkish form; dates without a converted year; the Sources lists; the lime and Tarafa rulings; nothing invented).
3. `BATCH\pack.json` (34 strings: `en`, `ar`, `ctx`, `precedent`, `links`) and `BATCH\ref.json`.
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (read every `notes` and `source_defects`). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` (94 items: cite P1.<page>.<n>; page 1 = hasawi-lomi-history, 45 items; page 2 = tarafa-ibn-al-abd, 49 items). Its input `06-blind-reader-input.on-05.filtered.txt` was cut from dist; the reader reads no Arabic, saw no source and was not told it is a translation.
6. The published Turkish articles `REPO\src\content\blog\*-tr.md` (seven; `hasawi-lomi-tr.md` is the sister article) and `REPO\tr-translation\output\tr-blog-2\README.md` (the BL2 rulings and what readers kept tripping on).
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings`; skip rulings with `superseded_by`) and `REPO\tr-translation\memory\tm.json`. Web search is allowed to attest a Turkish usage (TDV İslâm Ansiklopedisi for names, Turkish plant-pathology usage).

## Units and scores
Two units, take the lowest: `hasawi-lomi-history`, `tarafa-ibn-al-abd` (all keys of each). Tags are stored, not rendered: check them, they do not drive a score.

## The first question for every reader item: is it the Turkish, or is it the source?
These articles are long and argued; many reader items describe **what the English says** (a claim the page does not
source, an argument the reader finds weak, a name the English does not introduce, a question the English leaves open).
For each item, read the English and the Arabic sentence: if the English carries the same gap or claim, it is a
`source_defect` (list it; add no fact, no explanation the source lacks). If the Turkish creates it — a misparse, a
wrong-sense word, a dropped connective, a stronger or weaker claim, a reference made ambiguous — it is yours to fix.
Likely source items (check each, do not assume): P1.1.1 (opening vs «most likely» later — but check whether the
Turkish made the opening more certain than the English), P1.1.10, P1.1.14, P1.1.16 (after the 1970s), P1.1.18, P1.1.20,
P1.1.22, P1.1.27, P1.1.30, P1.1.32, P1.1.36, P1.1.40, P1.2.6 (image note), P1.2.12, P1.2.18, P1.2.33, P1.2.34, P1.2.35,
P1.2.47 («ağladığı» — the English «wept over»?), the Gregorian years in P1.2.7 (never added: the BRIEF forbids them).
**Counts that do not stay the same** (P1.1.6 «üç ad» vs «iki ad» vs four in the conclusion; P1.1.12 «bin yıl»; P1.2.38
«birkaç» with two; P1.2.48 «iki beyit» for three pages; P1.1.37 «bir milyon» vs «bir milyondan fazla»): read the English
for each — fix the Turkish if it drifted, `source_defect` if the English itself says it.

## Turkish faults — yours to weigh and fix (split, don't reorder; every fact and every hedge stays)
1. **Words a Turkish reader takes in another sense**: «haber» for a classical report (P1.2.20 — «rivayet»/«anlatı» is the
   Turkish of the field; one choice, `rulings`), «bir sözde» = "so-called" (P1.2.25), «bağ» = vineyard (P1.2.15, P1.2.44
   «manzara bağı / kayıt bağı»), «konak yeri» (P1.2.2), «Hire çocuklarından biri» (P1.2.22 — the English «a youth of
   al-Hira»), «aldığı» borrowed (P1.2.39), «cinsin» (P1.1.8), «kasaba» (P1.2.33 — gloss once, as the English does),
   «Suriye» for al-Sham (P1.2.22 — the English «Syria»? then it is the source's), «tabaka» (P1.2.13), «sahife», «nedim»,
   «ravi», «hevdeç», «lafız», «ahali» (P1.2.3, P1.2.21, P1.2.26, P1.2.38 — plain Turkish where a plain word exists; the
   field term only where the English uses the field term), «Malikli kadın» (P1.2.37), «Dad» (P1.2.37 — the English's
   name; weigh only a misread), «Sehmed/Havle» (P1.2.2 — names, published by the English as names: `source`/`frame`).
2. **Reference and agency made ambiguous by the Turkish**: P1.2.10 «söylendiğini, söylediği», P1.2.23 «kendisine», P1.2.24
   «ona/onu» and who killed him, P1.2.33 three «onu/onun», P1.2.11 «malını», P1.2.14 «onların», P1.2.17 «buluştukları» (the
   quote says «arrived» — no stronger than the English), P1.2.12 «Muallakasında … bir beyit vardır» vs the dispute
   (follow the English wording exactly — if it says «contains a verse», keep; if «a verse attributed to», keep that),
   P1.2.49 FAQ 3 attribution (check: is the letter story İbn Kuteybe's in the English FAQ?), P1.1.27 plural/singular.
3. **The name**: «Tarafe b. Abd» (stages 01–05 kept the TDV heading). P1.2.7: «b.» looks like an initial and is never
   glossed. Weigh: one gloss at first mention in the body is allowed only if the English has one; otherwise weigh the
   form itself against the English «Tarafa ibn al-Abd» and the Turkish literature (TDV body text «Tarafe b. el-Abd»; F30-r4
   «bin» read as 1000 — for a name preceded by a personal name the reading may differ: decide and record). «Abd» as the
   Turkish word «abd»: weigh. One form across title, H1, FAQ, Sources.
4. **Abbreviations** «ö. H. 232», «c. 1, s. 137» (P1.2.7, P1.2.48): standard in Turkish scholarship; weigh whether the body
   (not the Sources list) should spell out «ölümü hicrî 232» once or use a reader form — add no year.
5. **Calques and chains** (P1.1.8, P1.1.9, P1.1.17, P1.1.19, P1.1.21, P1.1.24, P1.1.29, P1.2.4 «yolunun sonunu … koyduğunu»,
   P1.2.8, P1.2.15, P1.2.19 «sessizliğini koyuyoruz», P1.2.42): split where the reader lost the verb.
6. **Fragments without a predicate** (P1.1.37, P1.2.40, P1.2.38 quote) — a colon fragment is fine only if the English has
   one and it parses.
7. **Register drift**: preachy/brochure lines (P1.1.3, P1.1.15, P1.1.33 «ziyaretçi deneyimine dönüştü», P1.1.39
   «rehberinizdir», P1.2.45 «tabloyu tamamlar», P1.1.44 «doğrusu») — check against the English register first.
8. **Digits in headings and prose** (P1.1.12, P1.1.20, P1.1.38): Latin digits are a site rule and the English writes «3»
   — keep the digit; «3 on yılda» (P1.1.35) is a calque of «3 decades»: «30 yılda»? — a number not in the source is
   flagged by the checker; weigh «üç on yılda» → choose a Turkish that keeps the source's number.
9. **Consistency**: «lomi / lomisi / lominin» (P1.1.2 — the sister article's forms), «Hint Denizi» vs «Arap Körfezi»
   (P1.2.30 — Yaqut's quoted words «بحر الهند»: a quotation keeps its words; C76 «Arap Körfezi» binds the site's own
   voice, not a quote — record), «doğu / güneydoğu Himalaya» (P1.1.11 — the English's), «aurantifolia» vs «aurantiifolia»
   (P1.1.34 — two different Latin names in the English? then byte-identical, `source`), the apostrophe style (P1.1.45 =
   `artifact`, the renderer).
10. **The verse renderings** (P1.2.37 «fiyal oyunu»): the Turkish gloss follows the English's rendering; a game the
   English names stays named.
11. Everything else: applied or rejected with the reason. One line per reader item in `blind_reader_rulings` — all 94.

- The Arabic lines, every href and the structure exactly as the checker holds them; link texts of landmarks
  byte-identical to `ref.places[*].title_tr`.
- Each termbase proposal of stages 01–05 becomes a `termbase_additions` entry or is rejected in `notes`; `rulings` ids
  BL3-… (binding for later batches).
- **Check against the English and the Arabic, sentence by sentence, all 34 strings** after your edits.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-blog-3", "stage": "07", "round": 1, "date": "2026-11-05",
  "scores": { "hasawi-lomi-history": n, "tarafa-ibn-al-abd": n }, "batch_score": <lowest>,
  "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 34, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json, full text, no "..."
  "blind_reader_rulings": [ { "item": "P1.1.1", "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published" | "artifact", "key": "…", "why": "…" } ],   // all 94
  "rulings": [ { "id": "BL3-…", "title", "ruling", "evidence" } ],
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "blog", "field" } ],   // every approved string except bodies (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ] }
```
The bodies are long: write the file with a node script that reads 05-proofreader.json and applies your edits from a
UTF-8 file you wrote with Write (Turkish never through a shell heredoc or `node -e`; scratch in
`C:\Users\truyr\node-store\va-scratch\tr-r1\blog3j\`). Never retype an Arabic line. Then run the checker:
`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-blog-3 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-blog-3/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-blog-3/stages/05-proofreader.json`
until `RESULT [OK]`. Do not edit any file of the repository other than your output.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the two scores and the decision; the number of keys changed; the rulings in one line each; owner questions (facts only — wording is yours); what you could not verify.
