# Judge brief — batch `tr-food-1`, round 3

BATCH = `C:\Users\truyr\node-store\va-wt\tr-food\tr-translation\output\tr-food-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-food` (read only)

You are stage 7, the final judge, round 3. Read `JUDGE-BRIEF-r1.md` (everything in it still binds: files, units `fd`/`dg`, standing rules, output shape, checker) and `JUDGE-BRIEF-r2.md`, then `stages\07-judge.r2.json` (the round-2 text, rulings, reader and audit rulings). Your input text is `07-judge.r2.json`. New inputs:
- `stages\05d-proof-of-judge-r2.md` — independent audit of the round-2 edits: 7 sound, **1 defect** (`fd.heroSum`: the doublet «kuşaktan kuşağa sofradan sofraya»; proposed «Bu malzemelerden sıcak yemekler ortaya çıkar; bu yemekler sofralarda kuşaktan kuşağa aktarılır.») and a ruling note (D7-mandi quotes superseded wording — update its text to what dg.1.pre now says).
- `stages\06-blind-reader.on-r2.md` — a third, fresh blind reader on the page as built from round 2 (42 items). Rule all 42.

## Threshold items (a word three readers tripped on is a source of error in the Turkish, not in the readers)
1. **The asida name, third reader** (#24, #26, #27): «aside» still reads as the English word, and its suffixed forms («asideye», «asidenin») as «asi»/«asit»; the definition arrives only in the fourth sentence (#27). D1-r2 promised a defusing first mention but the card does not define the dish until late. Act structurally now: the card's **first sentence** must say what the dish is (the English's own definition is «A soft porridge eaten by the spoonful … the Hasawi winter sweet» — move the definition up front, e.g. «Hurmalı aside, kaşıkla yenen yumuşak bir kış tatlısıdır.» then the preparation), and **minimise suffixed forms of «aside»** in the card (use «tatlı», a pronoun, or restructure so «aside» rarely takes a case ending). The H3/alt/meta form «Hurmalı aside» stays. Record as D1-r3 with the three readers' items.
2. **The restatement marker of mandi, second reader** (#10 here; on-r1 #10 on «Daha açık söylemek gerekirse»): «Yalın söylersek» reads as a calque. The English «Put plainly» is a hedge the source makes; two readers rejected two Turkish markers. Rule a form a Turkish writer uses («Kısacası» was proposed by both readers) or drop the marker and let the plain sentence stand — the content stays.
3. **The hero doublet** (audit + #5): apply the audit's fix or equivalent; one «-dan … -a» pair.

## Other items
4. «balalit» read as «bal» = honey (#20): the termbase name stands (A1-collisions); the H3 «Hurma pekmezli balalit» already says what sweetens it — record, no change unless you find a placement issue.
5. Balaleet sentence chain (#21): the participle chain «Safran ve kakuleyle kokulandırılan altın sarısı tel şehriye … » before the verb — split into two sentences if it reads better; keep every fact.
6. «ramazan» lower case (#16): D2 stands (TDK) — record.
7. Sago (#29): the second sentence has no explicit subject — give it one («Taneler ateşte …»), keep the English's «melting» image (source shape).
8. «hurma ezmesi» (#32, read first as a meze «ezme»): rule; TDK «ezme» covers pastes; the English says «date paste».
9. The method note (#38): «Yemeğin» singular for four cards — fix the number agreement; the four-cards/four-occasions mapping is source shape (recorded).
10. Everything else: the source-shape / frame classes of rounds 1–2 (brand tab, El-Ahsa P2, poetic images, red bread unexplained, omelette, photo alts vs text, all-year promise, where El-Ahsa is) — carry the verdict with its reason.

Write `BATCH\stages\07-judge.r3.json` (same shape, `"round": 3`; `changes` = every edit vs `07-judge.r2.json`; `blind_reader_rulings` for the 42 on-r2 items plus `audit_rulings` for the 05d-r2 items; carry forward and update `rulings` (update D7 to the current text), `termbase_additions`, `source_defects`, `owner_questions`; `tm_pairs` for all 44 final strings; `scores_row` `tr-food-1,2026-11-04,3,<score>,<decision>`). Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-food node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-food-1 C:/Users/truyr/node-store/va-wt/tr-food/tr-translation/output/tr-food-1/stages/07-judge.r3.json --prev C:/Users/truyr/node-store/va-wt/tr-food/tr-translation/output/tr-food-1/stages/07-judge.r2.json` until `RESULT [OK]`. Turkish only via Write or a node script reading r2 (scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Do not edit any repository file. Report as in round 1.
