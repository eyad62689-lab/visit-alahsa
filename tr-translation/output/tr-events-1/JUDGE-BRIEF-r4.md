# Judge brief — batch `tr-events-1`, closing addendum (round 4)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-events\tr-translation\output\tr-events-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-events` (read only)

You are stage 7, the final judge, writing a **narrow closing addendum** on round 3 (`BATCH\stages\07-judge.r3.json`, 90, 17 keys changed). This is not a full round. Read:
1. `REPO\tr-translation\prompts\07-judge.md`; `BATCH\BRIEF.md`; `BATCH\JUDGE-BRIEF-r3.md`.
2. `BATCH\pack.json` (en/ar/ctx), `BATCH\stages\07-judge.r3.json` (strings, rulings, blind_reader_rulings, source_defects).
3. **The independent proof of round 3**: `BATCH\stages\05d-proof-of-judge-r3.md` (16 sound, 1 defect).
4. **The fourth fresh blind reader** on round 3: `BATCH\stages\06-blind-reader.on-r3.md` (106 items), input `BATCH\stages\06-blind-reader-input.on-r3.filtered.txt`.

## Scope — rule only these; everything else of the 106 items is a verdict by reference (source_defect / frame / rejected as already ruled in rounds 1–3), no text change
1. **«Hicri / Miladi»** in `vl.notes.0.d` (proof): the ctx says TDK writes «hicrî / miladi takvim» lower case; stage 2 capitalised after the termbase «Hicri». Check the termbase entry and its context (a date suffix «Hicri 1208» vs the calendar name) and rule one form.
2. **The badge `vl.nowBadge` «Yılın bu dönemindesiniz»** (on-r3 item 16: «sounds odd»). This is the fourth form; four readers rejected four forms for four different reasons (calque, produce, overclaim, odd). Do not chase a fifth unless the reader's objection is a real fault: decide whether «Yılın bu dönemindesiniz» is grammatical, plain and claims nothing beyond the English — if yes, keep it and record the badge history as the ruling's evidence; if you change it, the replacement must not reintroduce «mevsim» (produce sense, E1-season-vocab) or a claim the event is on.
3. **«El-Ahsa Yaratıcılık Festivali»** (on-r3 P1 #32, P11 #1; on-r2 P11 #1): two readers on this form, two on the earlier «Yaratıcı El-Ahsa Festivali». Rule finally with the English «Creative Al-Ahsa Festival» and the termbase «UNESCO Yaratıcı Şehirler Ağı»; record the four readers in the evidence. Change only if you have a form neither objection hits.
4. **«Uygulamalı Kafu mutfağı»** (on-r3 P1 #24, P4 #7: hands-on lessons? a stand?) — the English «Interactive Kafu kitchen». Rule whether a plainer phrase says the English without adding what happens there.
5. Any trip the fourth reader had on text **round 3 changed** (check its 106 items against round 3's 17 changed keys) — fix if it is a real fault the English allows.

## Score
The addendum scores the text as it stands after these rulings. **Do not raise a unit's score unless you state, per unit, which concrete fault the addendum removed** (an earlier batch's addendum raised the score without a stated reason). If nothing changes the score, it stays 90.

## Output — `BATCH\stages\07-judge.r4.json` (+ `BATCH\stages\07-judge.r4-addendum.md`, a short Markdown summary of the rulings)
The shape of round 3 (`round: 4`; `strings` all 187; `changes` vs 07-judge.r3.json — may be few; `blind_reader_rulings` for the 106 items of on-r3; `rulings` new/revised only (`…-r4`); `termbase_additions` the full list; `tm_pairs` every approved string; `source_defects`, `owner_questions` (the full, deduplicated list for the owner), `notes`; `scores_row` `tr-events-1,2026-11-04,4,<batch_score>,<decision>`). Repeated English byte-identical across vl/vd/e (node script). Turkish only via the Write tool or a node script reading JSON (scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`) — never `node -e` with Turkish. Then run: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-events node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-events-1 C:/Users/truyr/node-store/va-wt/tr-events/tr-translation/output/tr-events-1/stages/07-judge.r4.json --prev C:/Users/truyr/node-store/va-wt/tr-events/tr-translation/output/tr-events-1/stages/07-judge.r3.json` until `RESULT [OK]`. Do not edit any repository file.

## Report back
Plain text, ASCII: the RESULT line; the four scores (with the reason for any change) and decision; keys changed; the rulings one line each; the owner questions one line each.
