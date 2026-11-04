# Judge brief — batch `tr-food-1`, closing addendum (round 4)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-food\tr-translation\output\tr-food-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-food` (read only)

You are stage 7, the final judge, closing addendum. Read `JUDGE-BRIEF-r1.md` (output shape, checker, standing rules) and `stages\07-judge.r3.json` (input text, rulings). New inputs: `stages\05d-proof-of-judge-r3.md` (6 sound, 1 defect) and `stages\06-blind-reader.on-r3.md` (a fourth fresh reader, 42 items). **This is a closing round: change only what the list below names; every other reader item is ruled with its existing class (source shape / frame / standing ruling / rejected) and no edit.** The fourth reader did not misread the asida name — D1-r3 holds; record that.

## Edit scope (only these)
1. `dg.5.pre` — «karabiber de onun sıcaklığını alevlendirir»: «onun» ambiguous (audit + reader #28) → «tatlının sıcaklığını» or equivalent; avoid a sixth «tatlı» if a cleaner subject exists.
2. `dg.4.pre` — «hurma pekmeziyle de El-Ahsa usulünce tatlandırılır» (#23: the «de» reads off) — drop or rephrase it.
3. `dg.6.pre` — «elden ele aktarılır» (#32: mixes «elden ele geçmek» and «aktarılmak»; second reader on this phrase) → an idiomatic form (e.g. «elden ele geçer»), keeping the English «handed down among the people of the oasis».
4. `dg.2.pre` — «cömertliğin en önde gelen yemeğidir» (#17 here, #15 on-r1: two readers) — the English «the foremost dish of generosity»: a Turkish form that says foremost without «önde gelen» reading as leading (e.g. «cömertliğin başta gelen yemeği» / «cömertliği en çok temsil eden yemek» — choose; no new fact).
5. Nothing else. The toggle «Devamını gizleyin» (#41, and on-05 #42) is the fruits page's approved pair (cross-page): do not change it here — add an `owner_questions`/`notes` entry proposing a joint review of the pair for both pages in a later batch.

Write `BATCH\stages\07-judge.r4.json` (same shape, `"round": 4`; `changes` vs `07-judge.r3.json`; `blind_reader_rulings` for the 42 on-r3 items plus `audit_rulings` for 05d-r3; carry forward `rulings` (add/update ids for the four edits), `termbase_additions`, `source_defects`, `owner_questions`; `tm_pairs` for all 44 final strings; `scores_row` `tr-food-1,2026-11-04,4,<score>,<decision>`). Also write a short `BATCH\stages\07-judge.r4-addendum.md` (what the addendum changed and why, in a few lines). Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-food node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-food-1 C:/Users/truyr/node-store/va-wt/tr-food/tr-translation/output/tr-food-1/stages/07-judge.r4.json --prev C:/Users/truyr/node-store/va-wt/tr-food/tr-translation/output/tr-food-1/stages/07-judge.r3.json` until `RESULT [OK]`. Turkish only via Write or a node script reading r3 (scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Do not edit any repository file. Report as in round 1.
