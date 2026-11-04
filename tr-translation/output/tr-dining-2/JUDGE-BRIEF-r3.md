# Judge brief — batch `tr-dining-2`, round 3 (closing addendum)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-dining-2` · REPO read only.

Your input text is `BATCH\stages\07-judge.r2.json`. New inputs:
1. `BATCH\stages\05d-proof-of-judge-r2.md` — the independent proof of r2: two defects, both in `db.greasy-fingers.body` (DN12 wording lost; DN3 referent twice). Apply both unless you can show the proof misreads the ruling.
2. `BATCH\stages\06-blind-reader.on-r2.md` — the third blind reader (117 items; cite as R3:P<page>.<n>).

## Rules for the addendum
- **This round closes the batch.** Edit only where the R3 reader names a **new, real Turkish fault** that no earlier round ruled on and the English allows you to fix (meaning, grammar, a misreading the Turkish causes, a referent left open by the Turkish). Every item that repeats a ruled point (DN1–DN16, D1-r3 glosses, the authority names, the Qaisariyah/Hamidiyah data, the editorial «bulamadık» content, place names and their pronunciation, the published blurbs/alts/search descriptions, the nearby-sights data, «nitelikli kahve», «meclis salonu», «Gününüzü tamamlayın») is `rejected` with the ruling id. A reader who names no new fault does not open a new form; two readers pulling in opposite directions on one word do not either.
- If an item sits on a form an earlier round already revised twice, record it and do not revise a third time unless the fault is a meaning error.
- No sentence reordered; no fact added or dropped; names byte-identical to ref.cards / ref.stayDining / termbase; DN16 commas.
- **No score is raised without a stated per-unit reason** tied to a change in this round.

## Output
- `BATCH\stages\07-judge.r3.json` — same shape as r2 (`"round": 3`), all 25 strings, `changes` vs 07-judge.r2.json (full text), `blind_reader_rulings` for all R3 items, `proof_rulings` for the two proof items, only new/revised `rulings`, `tm_pairs` all 25, `scores`, `batch_score`, `decision`, `scores_row` "tr-dining-2,2026-11-04,3,<score>,<decision>".
- `BATCH\stages\07-judge.r3-addendum.md` — short: what changed and why, what was rejected by class (counts with ruling ids), the final scores with their reasons, and a checklist of the changed sentences for the next fresh reader.
Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-dining-2 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-dining-2/stages/07-judge.r3.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-dining-2/stages/07-judge.r2.json` until `RESULT [OK]`. Turkish only via Write or a node script reading the JSON. Do not edit any repository file.

## Report back
The RESULT line verbatim; scores and decision; keys changed; new rulings one line each; R3 items applied/rejected counts.
