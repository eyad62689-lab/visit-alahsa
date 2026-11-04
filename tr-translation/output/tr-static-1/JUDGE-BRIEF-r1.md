# Judge brief — batch `tr-static-1` (the Turkish UNESCO, report, report/thanks and terrain-map pages, 35 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-static-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, lessons, this batch's traps).
3. `BATCH\pack.json` (35 strings: `en`, `ar`, `ctx`, `placeholders`, `allowNums`, `constants`, `unit`, `precedent`; `latinNames`) and `BATCH\ref.json` (`ui`, `unesco_components`, `all_places`, `categories`, `terms`, `tm`).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json`. Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the pages as built from stage 05 (52 items, numbered **per page**: cite as P<page>.<n>). Its input `BATCH\stages\06-blind-reader-input.on-05.filtered.txt` was cut mechanically from dist; the reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` — especially `tr-ui-1` (UI1-controls), `tr-map-plan-1`, `tr-dining-2` (DN16-r2 comma rule); skip rulings with `superseded_by`; `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Units and scores
Score four units and take the lowest as the batch score: `unesco` (8), `report` (11 + ui.form.honeypot), `thanks` (3), `tmap` (12).

## Standing rules
- **Published, not in this batch** (verdict `published`, no edit): the six component card summaries and titles (P1.5–P1.13 — `ref.unesco_components`, approved in earlier batches; «Kasr», «Sarayı»/«kale», «Hüfuf», «Müberrez» are termbase names); every landmark name and category in the terrain list (P4.6 «Cebel el-Kare», P4.8–P4.19 — `ref.all_places`, `ref.categories`); the eyebrows «Gezi rehberi» and «UNESCO Dünya Mirası alanı · 2018»; the popup link «Sayfasına gidin →» (P4.23, `ref.ui map.pop.view`).
- **Rulings are not reopened**: «bileşen» for the UNESCO component (P1.2 — approved `det.unesco`, tm; the caption «Bileşen 1563-004» stays); buttons and action labels are polite-plural imperatives (UI1-controls: P2.7 «Bildirimi gönderin» and P4.20 «Haritada gösterin» keep the -in form; the reader's bare-imperative preference is rejected with the ruling id — but you may still change the noun of a button if it is wrong); «name@example.com» is a constant (P2.9); «Visit Al-Ahsa» Latin brand next to «El-Ahsa» (P2.8 second part — the site rule); «UNESCO Dünya Miras Merkezi» is the institution's attested Turkish name (stage 4: unesco.org.tr/Pages/149/44 and the Ministry of Culture and Tourism pages) — keep it (P1.14 first part rejected), only smooth «…sayfasındadır» if needed.
- **«Arazi haritası»** (P4.1): the published frame link on the map page is «3D arazi haritası» (`ref.ui map.terrain`) and is not in this batch; the H1 and the open button must agree with it. Rule whether the Turkish is acceptable as is (the lead's «kabartmalı» disambiguates). If you judge «arazi haritası» a real fault for a relief map, do NOT change the batch strings alone: keep them, and put the proposed noun for H1 + link in `owner_questions` with your reason.
- **Source defect — the terrain lead and the list** (P4.5): in the built page each list row is an icon button (◎) that flies the map to the place, followed by the landmark name, which is a LINK to the landmark's own page (see `REPO\src\components\views\TerrainMapView.astro` lines ~128–145 and `REPO\src\scripts\terrain-map\index.ts` ~82). The English «Click or tap any name in the list to see it on the map» therefore does not match the page. Record it in `source_defects` (and `owner_questions`: correct the English to the button?). The Turkish follows the English; you may make the Turkish no less accurate than the English, not invent a different instruction.
- **The 3D/2D toggle** (P4.21): the component's comment says the button text names the mode it will switch TO. Rule whether «3D görünüm / 2D görünüm» says that well enough for a button (the English «3D view / 2D view» is equally bare); no new words unless the English allows.
- **The English «Bileşenler … numara sırasına göre»** (P1.4): the English says the cards are listed in the order of their component numbers on the official list; the gaps are data — keep the content, smooth the Turkish only.

## Items to rule (reader items; apply where the reader names a real Turkish fault the English allows you to fix)
1. **UNESCO numbers and verbs** (P1.1, P1.3, P1.15): «on iki … 6 tanesinin» (word + digit side by side — the digit is the template's; «on iki» in words is approved; rule whether «tanesinin» stays or a plainer shape after the digit reads better, with no suffix on the placeholder); «1563 numaralı alan olarak alındı» (vague «alındı» — «listeye … olarak alındı»/«kaydedildi»?); «(2018)» inside the description (the English has it in brackets — keep or recast as «2018'de»?).
2. **The report page** (P2.1–P2.6, P2.8, P2.10): «Bizim için en önemli şey doğruluktur» (doğruluk = honesty or accuracy?: «bilgilerin doğruluğu»?); «biz de inceleyelim» → the plain future/aorist («inceleriz»/«inceleyip düzeltiriz» as the English says «we will review it»); «yanlış yerde duran bir fotoğraf» (calque — «yanlış yere konmuş»?); the eyebrow «Doğru bilgi vermemize yardım edin» (heavy/pleading?); «İlgili sayfa» (the English «The page concerned» — «Söz konusu sayfa»?); «(isteğe bağlı, yanıt istiyorsanız)»; «hiçbir bölümü yayımlanmaz» (the English «none of it is published»); the honeypot label (P2.10 — no reason is given in the English either; nobody sees it; reject unless a Turkish fault).
3. **The thanks page** (P3.1–P3.4): the two dashes in the tab title (the H1 has one; the layout adds the second — the H1 may be recast without a dash if the Turkish reads better, the English has the dash); «doğrulanan her bilgiyi düzeltecek» — a real meaning fault: the English «correct whatever is confirmed» = correct each error that is confirmed; «notunuzu» vs «Bildiriminiz» (one noun on a three-line page); «doğru kalmasını sağlar».
4. **The terrain page** (P4.2–P4.4, P4.7, P4.22): «Vahanın kabartmalı hâli»; «Gezilecek her yer de yerinde duruyor» (the English «with every attraction in place» = every attraction shown at its real location — say so plainly); «doğudaki kumullar» (the English «the dunes to the east» — east of the oasis; keep the English's measure); «Klasik harita» (the English «Classic map» — keep the meaning, a plain noun that a reader recognises as the ordinary map); «kaydırın» for scroll vs the touch hint's «hareket ettirmek» (one verb doing two jobs? the English uses «scroll» and «move» — rule the pair, keep the three hints parallel).
5. **Everything else**: applied or rejected with the Turkish a travel-guide writer uses. One line per reader item in `blind_reader_rulings` — all 52.

- Each termbase proposal of stages 1–5 becomes a `termbase_additions` entry; «UNESCO Dünya Miras Merkezi» with `"status": "attested"` and the source URL; anything else `unattested` unless a stage gave an attested source.
- **Check against the English, sentence by sentence, all 35 strings** after your edits; placeholders `{comps.length}` and `{names}` once each; constants byte-identical (↗, 1563, 2018, Ctrl, ⌘, 3D, 2D, name@example.com, the trailing «: » of ui.form.honeypot).

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-static-1", "stage": "07", "round": 1, "date": "2026-11-04",
  "scores": { "unesco": n, "report": n, "thanks": n, "tmap": n }, "batch_score": <lowest>,
  "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 35, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json, full text, no "..."
  "blind_reader_rulings": [ { "item": "P1.1", "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published", "key": "…", "why": "…" } ],   // all 52 reader items
  "rulings": [ { "id": "ST1-…", "title", "ruling", "evidence" } ],   // binding for later batches; ids ST1, ST2, …
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "static", "field" } ],   // every approved string (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ],
  "scores_row": "tr-static-1,2026-11-04,1,<batch_score>,<decision>" }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-static-1 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-static-1/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-static-1/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository other than your output.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the four scores and the decision; the number of keys changed; the rulings in one line each; owner questions; what you could not verify.
