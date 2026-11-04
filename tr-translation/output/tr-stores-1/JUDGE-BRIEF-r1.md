# Judge brief — batch `tr-stores-1` (the Turkish online-stores directory `/tr/online-stores/`, 157 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-stores-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, lessons, this batch's traps).
3. `BATCH\pack.json` (157 strings: `en`, `ar`, `ctx`, `placeholders`, `unit`, `precedent`; `latinNames`) and `BATCH\ref.json` (`ui`, `terms`, `tm`).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (stage 04 holds the attestation table in its notes and termbase_proposals). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the page as built from stage 05 (64 items, one page: cite as P1.<n>). Its input `BATCH\stages\06-blind-reader-input.on-05.filtered.txt` was cut mechanically from dist; the reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` — especially `tr-ui-1` (UI1-controls), `tr-attr-6` (A6-governorate), `tr-attr-7` (Millî), `tr-stay-dining-1`, `tr-dining-2` (DN16-r2 comma rule), `tr-static-1`; skip rulings with `superseded_by`; `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Units and scores
Score six units and take the lowest as the batch score: `ui` (14), `seo` (6: seo + sections), `dates` (45), `crafts` (21), `other` (51), `faq` (20).

## Standing rules
- **The English is the source; the reader judges the page, not the source.** Many reader items are the source's content: the FAQ's claims «verified / approved / guaranteed / trusted / authentic / all Gulf states / exclusively» (P1.3, P1.52, P1.53, P1.54, P1.56, P1.60, P1.61), «red Hasawi rice, rich in minerals» (P1.51 second part), the cards' editorial hedges «out of stock at the time of checking», «not read in full», «about eight months ago», «rated highly by buyers», «more than 27,000 followers» (P1.14, P1.26, P1.30, P1.39, P1.42), «hand-woven» in FAQ 3 vs «hand-stitched» on a card (P1.54), «Shaabiyyat» unglossed (P1.9 second part), what «Mahally» / «Salla» / «Zid» are (P1.6, P1.7), menswear and cosmetics under «local products» (P1.4 second part, P1.47), the half-answered rice question (P1.55), «a representative» (P1.35). Verdict `source_defect` (list each in `source_defects`; the claims against the disclaimer are an owner question already raised by stages 1–4). Do not soften or drop a claim; do not add an explanation the English lacks.
- **Brands stay** (verdict `rejected`, ruling): store names whose Turkish transliteration looks like a Turkish word — «Kaytan», «Kiral», «Saaf», «Kulla», «Et-Tacira», «El-Faravla», «Lomi Hasavi», «Flower Hasa», «Gülleri» (P1.16 first part, P1.24 first part, P1.37, P1.41, P1.43, P1.44, P1.47, P1.48) — a brand is the store's own name; the quotes on «Kulla»/«Şanna» stay. You may decide whether «Kaytan» etc. need quotation marks in the card heading — the Russian precedent quotes the transliterated part («Финики «Эш-Шира»»); rule one convention for the whole page if you change it.
- **Rulings are not reopened** (verdict `rejected` with the ruling id): buttons as polite-plural imperatives (P1.8 «Mağazayı ziyaret edin» — UI1-controls; the same text on every card is the design); «nitelikli kahve» (termbase entry, P1.38); «Gar», «Halas», «Şişi», «Raziz» (termbase, P1.57); «Hüfuf» (termbase, P1.39); «Merkezinin» without an apostrophe — institution names take none (tr-leisure-fruits-1, tr-dining-2, P1.61 second part); «Acve», «Sukkari», «Sugay» attested in stage 4 (P1.21).
- **Facts**: compare with `en` and `ar` before any edit: «polen suyu» (P1.9 — the Arabic says what pollen: if it is palm pollen, the Turkish may say it, since the Arabic is the arbiter of an ambiguous English fact), «hurma şekeri» (P1.11 — sugar, as the English), «limon ürünleri» (P1.19 second part — the English says lemon; ar decides), «hand-made dates» (P1.18 — the English says «handmade Khalas»; ar decides whether it is «يدوي» and what it qualifies; say it the way a Turkish shop would — «el emeği»? — without inventing «hand-picked»), «ikal from wool or goat hair» in FAQ 9 vs the card (P1.60 — both are the English; source).

## Items to rule (apply where the reader names a real Turkish fault the English allows you to fix)
1. **Words that misread** (real faults): «halkum» = throat in Turkish (P1.19) — find a form that does not misread (stage 4: halkum unattested; «hurma lokumu» alone, or with a different bracket); «ot dükkânı» / «ot» for herbs (P1.32, P1.36) — Turkish says «aktar» for a spice-and-herb shop and «bitki»/«kuru bitki» for herbs; «yan ürün» = by-product (P1.33) — «ek ürün» or recast; «Ud» = the instrument (P1.28) — «ud yağı» is the attested Turkish name of the perfume oil? check, keep if so; «derece» for grades (P1.10) — «kalite»/«çeşit»; «lapa karışımları» (P1.13); «takviye ürünler» (P1.42 — «takviye edici gıdalar»); «el tasarımı» (P1.30); «Hesap her gün aktiftir» (P1.27); «vitrin» in the photo alt text (P1.62 — the photo is a screenshot of the online store's page: rule `ui.stores.shotAlt` so a screen-reader user hears a web page, still with `{name}` once and no suffix).
2. **«El-Ahsa Valiliği»** (P1.50): stage 4 kept the apostrophe forms for the FAQ (the English says «Al-Ahsa Governorate» in FAQ 0, 4, 8, 9); the reader read «Valilik» as the governor's office. Rule between: keep «El-Ahsa Valiliği'…» (A6), use «El-Ahsa ili» (il = the Turkish province as a territory — attest), or plain «El-Ahsa» where the English's contrast with the oasis does not carry a fact. Record the ruling; if it changes A6, say so (superseded_by).
3. **Inconsistency on the page** (P1.13 «hurma maamulü» vs «maamul»; P1.34 «macbus» glossed vs «maabuc» unglossed — two different things in the English (majbous a dish, maaboj a lumi product): keep apart, rule whether «maabuc» needs anything the English does not give; P1.53 «platform» meaning store in the FAQ vs Salla/Zid on the cards; P1.63 «Seçkin» repeated — stage 4 attested; rule).
4. **Fluency and calques** (P1.1, P1.2 «Tek rehber», P1.4 H1 genitive stack, P1.10 «Bunların yanında … de vardır», P1.12 the four-item chain before «kurulmuş», P1.16 «içine ve dışına» → «yurt içine ve yurt dışına», P1.20, P1.23, P1.29, P1.31, P1.35 «Ev için gıda ürünleri», P1.40 newborn/heat-printing sentence, P1.45 «meraklı», P1.46, P1.49 «politikasını», P1.51 the misparse «el sanatları ile işlenmiş lomi» — a real fault: split, P1.54 «biştinin», «genel olarak», P1.55–P1.59, P1.61): fix where the reader names a Turkish fault; split, don't reorder (lesson 1); every fact stays.
5. **Everything else**: applied or rejected with the Turkish a travel-guide writer uses. One line per reader item in `blind_reader_rulings` — all 64.

- Each termbase proposal of stages 1–5 becomes a `termbase_additions` entry (the 39 store names kind `brand`; the attested ones with `"status": "attested"` and stage 4's source URL; anything else `unattested`).
- **Check against the English, sentence by sentence, all 157 strings** after your edits; placeholders `{n}` and `{name}` once each with no suffix; brands byte-identical across the name, the alt texts and the FAQ.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-stores-1", "stage": "07", "round": 1, "date": "2026-11-04",
  "scores": { "ui": n, "seo": n, "dates": n, "crafts": n, "other": n, "faq": n }, "batch_score": <lowest>,
  "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 157, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json, full text, no "..."
  "blind_reader_rulings": [ { "item": "P1.1", "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published", "key": "…", "why": "…" } ],   // all 64 reader items
  "rulings": [ { "id": "OS1-…", "title", "ruling", "evidence" } ],   // binding for later batches; ids OS1, OS2, …
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "stores", "field" } ],   // every approved string (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ],
  "scores_row": "tr-stores-1,2026-11-04,1,<batch_score>,<decision>" }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-stores-1 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-stores-1/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-stores-1/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository other than your output.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the six scores and the decision; the number of keys changed; the rulings in one line each; owner questions; what you could not verify.
