# Judge brief — batch `tr-map-plan-1`, round 4 (closing addendum, or a last edit)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-mapplan\tr-translation\output\tr-map-plan-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-mapplan` (read only)

Round 3 (`stages\07-judge.r3.json`: 91, APPROVE, 8 edits, M1-r3 … M8-r3) was followed by an independent proof (`stages\05d-proof-of-judge-r3.md`: 6 SOUND · 0 FAULT · 2 NOTE — faq.0.a «doğanın … örnekleridir» uneven; faq.10.a three stacked glosses) and a fourth blind reader on the pages rebuilt from r3 (`stages\06-blind-reader.on-r3.md`: 15 + 7 + 33 = 55 items; input `06-blind-reader-input.on-r3.filtered.txt`). The three earlier briefs bind. Your input text is `07-judge.r3.json`.

Four readers have now read the pages. Rule the fourth reader's 55 items (class per item) and the two proof NOTEs, and decide the close:

1. **The route phrase — fourth reader, fourth form** (p2 #1, #2: «hazır rotanızı alın» — "from where, in what form?"): r1 «rota edinin» (foreign), r2 «hazır … oluşturun» (tension), r3 «rotanızı oluşturun» (promises a builder), r4 «hazır rotanızı alın» (unexplained). The source: «get a ready-made route» with no explanation in ui.plan.lead / ui.plan.empty.d either — the English leaves it to the button that follows. Four readers on four forms = **the source's shape**: close it with the current form (M2-r3 stands) and record the four objections as a source note for the owner (the English lead could name Google Maps as pt.ctaD does). No fifth form.
2. **pt.faq.0.a** (proof-r3 NOTE 1 + reader #21 — threshold): the elliptic «… tatlı su pınarları doğanın; … ise bu mirasın örnekleridir» stops the reader. Rule two plain sentences (the proof's «bu harikaların» or a split), keeping every name byte-identical and the hedge-free facts as the English.
3. **pt.faq.10.a** (proof-r3 NOTE 2 + reader #28 — threshold): three bracketed glosses before the verb; the red rice reads as part of the dish list. Rule a reshape (the proof's optional reshape in its file, or two sentences: the rice and the dishes; the fruits; the crafts), glosses kept exactly as M6-r3 ruled, names byte-identical with faq.12.a (which stays bare).
4. Single-reader items on batch strings — rule applied/rejected: p2 #7 «Listeye … listenize» (ui.plan.shared.d: the reader's «Bu yerlere göz atabilir …»); p3 #6 pt.practical.0.v subject switch («yazın ise akşamlar keyiflidir»); p3 #25 pt.faq.5.a the genitive chain before «trenidir» (a split that keeps «Suudi Arabistan Demiryolları» as M2-r2); p3 #32 pt.faq.11.a «eliniz kumu açar açmaz» → «elinizle»; p3 #33 «tatil köyleri» for "resorts" (the de precedent «Resorts», the ru «курорты»; weigh «tatil köyü» vs «resort» — the style rule allows settled loans by explicit decision); p3 #29–#31 bişt/sidr/lomi (published/termbase forms: A10 «El-Ahsa bişti», the kanar gloss from the site's data, «misket limonu (lomi)» A11 — keep, record; the fourth reader on «sidr» = a second gloss would be a gloss of a gloss: owner question, not an edit).
5. Published/frame/source as before (p1 all but the batch strings; p2 #5, #6; p3 #1–#5, #7, #18–#20, #22–#24, #26): carry the class; nothing new to the owner unless not yet recorded (p3 #3 «yakın» for 150 km — the English «close to Dammam»: source).

## Output
If you edit (items 2–4 may warrant it): write `BATCH\stages\07-judge.r4.json` in the round shape (`"round": 4`, `changes` vs r3, `blind_reader_rulings` for the 55 items with `"reader": "on-r3"`, `proof_rulings` for the 2 NOTEs, `rulings` M<n>-r4 / `rulings_carried`, the seven `scores`, `tm_pairs` for every string, carried `termbase_additions` and `owner_questions` merged, `scores_row` «tr-map-plan-1,2026-10-31,4,<score>,<decision>»), then the checker with `--prev …/07-judge.r3.json` until `RESULT [OK]`.
If you make no edit: write `BATCH\stages\07-judge.r3-addendum.md` — the 55 rulings and the 2 proof rulings in a table (page, item, class, one line), the route-phrase closure with the four objections, and a last line «Final text: 07-judge.r3.json».
Either way: Turkish only through the Write tool or a node script reading 07-judge.r3.json; no repository file edited.

## Report back
Plain ASCII: which file you wrote; the RESULT line if a JSON; the number of keys changed; the decisions on items 1–4 in one line each; what you could not verify.
