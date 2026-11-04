# Judge brief — batch `tr-events-1`, round 2

BATCH = `C:\Users\truyr\node-store\va-wt\tr-events\tr-translation\output\tr-events-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-events` (read only)

You are stage 7, the final judge, in its second round. Round 1 (`BATCH\stages\07-judge.r1.json`, 90, 39 keys changed, rulings E1-…) is your input text. Read:
1. `REPO\tr-translation\prompts\07-judge.md` (role, rubric, threshold 90; batch score = lowest unit).
2. `BATCH\BRIEF.md` and `BATCH\JUDGE-BRIEF-r1.md` (the standing rules, the items of round 1 — they still apply).
3. `BATCH\pack.json`, `BATCH\ref.json`, `BATCH\stages\07-judge.r1.json` (strings, rulings, blind_reader_rulings, source_defects, owner_questions).
4. **The independent proof of round 1**: `BATCH\stages\05d-proof-of-judge.md` (36 sound, 3 defects).
5. **A fresh blind reader** on the pages as built from round 1: `BATCH\stages\06-blind-reader.on-r1.md` (105 items), input `BATCH\stages\06-blind-reader-input.on-r1.filtered.txt` (cut from dist). This reader never saw round 1's reader.

## What to do
- **The proof's three defects**: rule each.
  - The commas in `e.kafu-nights.intro` («Kafu Geceleri, her yıl…», «Gabka, halk arasında…») and `e.lomi.intro` («Misket limonu (lomi), …»): TDK allows a comma after a long subject to mark it, and the batch rule forbids a comma only after a **participle** subject («…-an X, …»). Decide on the Turkish of each sentence, record the reasoning.
  - «olarak da bilinir» vs «adlarıyla da bilinir» in `e.lomi.intro`.
  - `vl.ctaH` «Festival ziyaretinizi…» against ruling E1-season-vocab and the English «Turn your season into a full trip».
- **The fresh reader's 105 items.** For each, give a verdict. An item that repeats a round 1 `source_defect` or `frame` verdict is recorded by reference to the round 1 ruling (do not reopen it). **A trip that a second, independent reader repeats on text round 1 changed, or on text round 1 kept against a reader, is strong evidence**: weigh it, and change the text if the English allows. A trip on new round 1 text is round 1's fault and must be fixed.
- Rulings are not reopened without a new reader's evidence. A ruling you revise gets an id `E1-…-r2`.
- Every repeated English stays byte-identical across vl/vd/e — check with a node script.
- **Check against the English, sentence by sentence, every key you change.**

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r2.json`
The same shape as round 1 (`round: 2`; `strings` all 187; `changes` = every edit vs 07-judge.r1.json; `blind_reader_rulings` for the 105 items of on-r1; `rulings` new or revised only; `termbase_additions` the full list (round 1's plus any new); `tm_pairs` every approved string; `source_defects`, `owner_questions`, `notes`; `scores_row`: `tr-events-1,2026-11-04,2,<batch_score>,<decision>`).
Write Turkish only with the Write tool or a node script that reads a JSON file (scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`) — **never `node -e` with Turkish text** (round 1 did; do not). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-events node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-events-1 C:/Users/truyr/node-store/va-wt/tr-events/tr-translation/output/tr-events-1/stages/07-judge.r2.json --prev C:/Users/truyr/node-store/va-wt/tr-events/tr-translation/output/tr-events-1/stages/07-judge.r1.json` until `RESULT [OK]`. Do not edit any file of the repository.

## Report back
Plain text, ASCII console: the RESULT line verbatim; the four scores and the decision; keys changed; new/revised rulings one line each; reader items that repeated round 1 trips; what you could not verify.
