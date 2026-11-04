# Judge brief — batch `tr-food-1` (the Turkish food page /tr/food/, 44 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-food\tr-translation\output\tr-food-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-food` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, the lessons, this batch's traps).
3. `BATCH\pack.json` (44 strings: `en`, `ar`, `ctx` written from the component code, `placeholders`, `allowNums`, `unit`, `precedent`) and `BATCH\ref.json` (approved frame `ui`, `home`, `fruits`, `terms`, `tm`).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `changes`, termbase proposals with stage-4 attestations, open items raised). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the page as built from stage 05 (42 items). The reader's input is `BATCH\stages\06-blind-reader-input.on-05.filtered.txt`, cut mechanically from `dist/tr/food/`. The reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` — especially `tr-ui-1` (UI1-hasawi, UI1-controls), `tr-attr-1` (A1-collisions), `tr-attr-11` (A11-lime), `tr-attr-12` (A12-r3-people), `tr-map-plan-1` (M6-r3 dish glosses), `tr-leisure-fruits-1` (F21-r2 dibs), `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Units and scores
One page. Score two units and take the lowest as the batch score: `fd` (the FoodView block + description), `dg` (the eight dish cards: k/name/alt/pre).

## Standing rules
- **Frame, not text**: the tab brand «Visit Al-Ahsa» is Latin by rule (reader #1); the reader's wish to be told where El-Ahsa is (#41) is the site frame (header/home), not this page; the toggle pair is the fruits page's approved pair byte-identical (#42).
- **The English is the translation source; a source defect is recorded, never repaired.** Source shape, not Turkish faults: «warm dishes» for a list with sweets (#4), the poetic images of mandi/harees/asida/sago (#10, #13, #14, #16, #27 «melting… jewel»), the omelette served with balaleet with no further detail (#22), the asida card that names no dibs while its photo does (#23 — both English), the meat of mandi unnamed (#12), «Small grains» with no noun (#26: the card's H3 is the noun — you may name «sagu taneleri» if it reads better; that adds no fact), red bread unexplained (#33), «all year round» (#37 — the English promises it), the occasion list of the method note leaving out «celebrations» of the rice card (#38 — the English list is the same). Record each in `source_defects` once, with the reader item numbers. The stage-1 source defects (2) carry over.
- **Rulings are not reopened**: «El-Ahsa mutfağı» (UI1-hasawi), «haris», «balalit», «hurma ekmeği» (termbase; the «haris» = greedy collision of reader #2 is the A1-collisions class — accept, record), «misket limonu» + «(lomi)» once (A11-lime), «hurma pekmezi (dibs)» (F21-r2), «sadeyağ», «El-Ahsa» (P2), sentence case (P9), siz imperatives for buttons (UI1-controls). P7 stays open: rule the page form, raise it.
- Every dish name byte-identical across H3 / alt / description / meta description; every number as the English; the `k` kickers identical within a category; no final stop on labels.

## Items to rule (reader item numbers)
1. **«aside» / «hurma asidesi»** (#3: read first as «asit» = acid). Stage 4 replaced «asida» with the TDK headword «aside» (ʿaṣīde, the same dish family). The collision is with the suffixed form «asidesi», not the headword. Rule one form for the H3, alt, description and meta: keep «hurma asidesi» and defuse in the card's first sentence (the dish word in a phrase the reader cannot take for acid), or a form that avoids the suffix (e.g. «Hurmalı aside»), or back to «asida». Give the ruling an id; it binds later batches (the events/dining pages name the dish).
2. **«sagu»** (TDK «Hint irmiği»; TDK's homonym «sagu» = ağıt, stage-4 note). The reader did not trip on it; record.
3. **«El-Ahsa pilavı»** (#9: reads as a plain rice side). The English names the grain («Hasawi Rice»); stage 1 chose the dish word. Rule (the kicker «Ana yemek» carries the main-course reading); record in `rulings`.
4. **Mandi card fluency** (#10–#13): «Sade söylemek gerekirse» (calque of «Put plainly» — a natural Turkish restatement marker), three stacked «bir» before the verb (#11 — split or simplify: «toprağa kazılmış bir çukurdaki tandır» or two sentences), «kelimeleri yokken cömertliği bilen bir vaha» (#13 ambiguous — the English: an oasis that knew generosity before it had words for it). Keep the image (source shape), make the grammar unambiguous.
5. **Harees** (#15): «cömertliğin ilk yemeği» — the English «the foremost dish of generosity»; «ilk» reads as first served/oldest. Choose the word that says foremost.
6. **Balaleet** (#20, #21): the causal «… geldiği için tatlılık … gelir» (repeated verb; the English is a figure, not a cause: «from a land that is the capital of the palm, the sweetness comes from the date itself»). Rewrite without the cause clause and without the repeated verb; keep the figure lower-case.
7. **Asida** (#24, #25): «karabiber sıcaklığını canlandırır» (whose warmth — the English: «kindles its warmth», the dish's); «ailenin çevresinde toplandığı» (#25 — read as «around the family»; the English: the sweet a family gathers around). Make the possessive unambiguous; split the participle chain. «lapa» (#25) — the English says «porridge»: rule whether «lapa» is the Turkish word a food writer uses here.
8. **Sago** (#27, #28, #29): «safran ve kakule onu ışıldatır» (#27 — the English: «shimmering with saffron and cardamom»: the sweet shimmers); «Ramazan sofralarının başında gelen» (#28 — read as served first; the English «heads Ramadan tables» = foremost: choose a phrase that cannot mean first course); the «-mıştır» shift (#29).
9. **Ramazan / ramazan** (#28): the cards write «Ramazan», `fd.methodP2` «ramazan». One form on the page (TDK spelling rules for the names of months and holy days; the tm has one lower-case «ramazan» on jabal-al-qarah — check its context). Rule and give the id.
10. **Date bread** (#31, #32): «hurma ezmesi» twice in one sentence; «Hamuruna … yoğrulur»; «Böylece» (#32 — the English «uniting good bread with the sweetness of dates» follows the kneading/filling, not the nigella).
11. **Method note** (#35, #36, #38, #39): «vesile» (#38 — Ottoman-bookish; a plain word for occasion), «bilinen malzemeler» (#35 — the English «well-known ingredients»), the closing sentence (#39 — stiff; split if it reads better). The four occasion words must stay the cards' words (Ramazan, kış geceleri, düğün ziyafetleri, misafir sofraları) — #15 notes the harees card says «ziyafetlerinde ve düğünlerinde»; the English card says «banquets and weddings» and the note «wedding feasts»: source shape, but the Turkish may align the note's phrase with the card if the English allows.
12. **«Lezzet turu»** (#6: reads as a bookable tour) — the English «A taste tour»; rule. **«Tadına bakacak bir yer»** (#40) — rule.
13. **Hero lead** (#4, #5, #8): «Yerel El-Ahsa pirinci» (#8 — the English «local Hasawi rice»: keep or trim, rule); «doğar» used twice on the page (hero and harees, #4/#14) — the harees image is the English's («harees is born»); the hero's «giving rise to» need not repeat it.
14. Everything else: applied/rejected with the Turkish a food writer uses.

- Each termbase proposal of stage 4 becomes a `termbase_additions` entry with its source, or `"status": "unattested"` (attested: sagu, aside, mandi (tr.wikipedia), yarma buğday, çörek otu, tel şehriye, Antep fıstığı, kahve ibriği; unattested: mufallak, ceriş, El-Ahsa pilavı).
- **Check against the English, sentence by sentence, at least**: fd.heroSum, fd.methodP1, fd.methodP2, fd.dineCta, fd.description, all eight `dg.*.pre`.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-food-1", "stage": "07", "round": 1, "date": "2026-11-04",
  "scores": { "fd": n, "dg": n },
  "batch_score": <lowest>, "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — with one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 44, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json
  "blind_reader_rulings": [ { "page": 1, "item": n, "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published", "key": "…", "why": "…" } ],   // all 42 reader items
  "rulings": [ { "id": "D1-…", "title", "ruling", "evidence" } ],   // binding for later batches
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "food", "field" } ],   // every approved string (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ],
  "scores_row": "tr-food-1,2026-11-04,1,<batch_score>,<decision>" }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-food node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-food-1 C:/Users/truyr/node-store/va-wt/tr-food/tr-translation/output/tr-food-1/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-food/tr-translation/output/tr-food-1/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the two scores and the decision; the number of keys changed; the rulings in one line each; what you could not verify.
