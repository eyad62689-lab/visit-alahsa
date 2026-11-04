# Judge brief — batch `tr-events-1`, round 3

BATCH = `C:\Users\truyr\node-store\va-wt\tr-events\tr-translation\output\tr-events-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-events` (read only)

You are stage 7, the final judge, in its third round. Round 2 (`BATCH\stages\07-judge.r2.json`, 90, 36 keys changed, rulings …-r2) is your input text. Read:
1. `REPO\tr-translation\prompts\07-judge.md` (role, rubric, threshold 90; batch score = lowest unit).
2. `BATCH\BRIEF.md`, `BATCH\JUDGE-BRIEF-r1.md`, `BATCH\JUDGE-BRIEF-r2.md` (the standing rules and earlier items — they still apply).
3. `BATCH\pack.json`, `BATCH\ref.json`, `BATCH\stages\07-judge.r1.json` and `07-judge.r2.json` (strings, rulings, blind_reader_rulings, source_defects, owner_questions).
4. **The independent proof of round 2**: `BATCH\stages\05d-proof-of-judge-r2.md` (33 sound, 3 defects).
5. **A third, fresh blind reader** on the pages built from round 2: `BATCH\stages\06-blind-reader.on-r2.md` (111 items), input `BATCH\stages\06-blind-reader-input.on-r2.filtered.txt` (cut from dist).

## Where proof and reader converge (fix these — two independent checks agree)
1. **`vl.nowBadge` «Şimdi tam zamanı»**: the proof (claims more than «You are here now»; set by script from an approximate season) and the reader (on-r2, badge item 1: brochure-shouty, vague, suggests firm dates) agree. This badge has now failed three readers in three forms («Şu an bu sezondasınız» calque → «Şu an mevsiminde» produce → «Şimdi tam zamanı» overclaim). Choose a plain locative statement that says only «this is the season of the year you are in», short enough for a badge, in the frame vocabulary of E1-season-vocab-r2 (the frame now says «etkinlik»/«yıllık»; the proof suggests «Şu an bu dönemdesiniz»). Make `vl.orderNote` agree. Revise the ruling as `E1-season-vocab-r3` (badge clause).
2. **`e.kafu-nights.span` «Ramazan gecelerinde geç saatlere kadar»**: proof (invents a time-of-day claim; a length cell) and reader (on-r2 P1 #17, P4 #6: time of day, not a length; «Ramazan» twice with the time cell) agree. The English «Extended Ramadan nights» is source shape (a length cell with no length — already a round 1 source defect). Pick the Turkish that says what the English says without adding a clock claim, and that does not repeat the time cell word-for-word. Revise `E1-ramadan-cells-r2`.
3. **`ui.ev.shopNote`**: the proof finds «El-Ahsa Ticaret Odası» and «kişisel» added in round 2 (not in the English «Lomi products, foods and care items from the establishments taking part in the exhibition.»). Fix.

## Reader items on round 2 text (round 2's fault if confirmed — fix if the English allows)
- **«Ziyaretçilerin katılabildiği X»** (on-r2 P1 #16, #18, P2 #5, P4 #7): «you do not take part in a market». E1-interactive-r2 failed on the market and the kitchen. Choose per highlight what «Interactive» means there and a Turkish that a visitor reads naturally; revise the ruling.
- **«El-Ahsa Yaratıcılık Festivali»** (on-r2 P11 #1: an abstract noun as a festival name sounds odd; round 1's «Yaratıcı El-Ahsa Festivali» was read as a slogan by round 1's reader). Two readers, two forms rejected. Decide with the English «Creative Al-Ahsa Festival» and the termbase «UNESCO Yaratıcı Şehirler Ağı» (the festival name echoes the creative-city title) — rule and record why.
- **«Ukayr Sahil Parkı» vs the map caption «Ukayr Plajı»** (on-r2 P8 #2): the map block names the venue attraction by its termbase title. Decide whether the place line can say the beach park in a way that visibly is the same place («Ukayr Plajı'ndaki park»? the English «Al-Uqair Beach Park») — rule.
- **«Tarihler tahminî»** next to Ramadan and next to a dated season start (on-r2 P4 #8, P10 #1, P1 #2): the status badge is template text set per status; the contradictions are the round 1 source defects (Ramadan dates, 31 October) — record by reference, unless you find the badge wording itself misleads.
- Everything else of the 111 items: verdict each; repeats of round 1/2 `source_defect` or `frame` verdicts by reference.

## Rules
- Rulings are not reopened without a new reader's evidence; revised ones get `…-r3`.
- Every repeated English byte-identical across vl/vd/e — check with a node script.
- Check every key you change against the English, sentence by sentence.
- Write Turkish only with the Write tool or a node script that reads a JSON file (scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`) — never `node -e` with Turkish.

## Output — `BATCH\stages\07-judge.r3.json`
The shape of round 2 (`round: 3`; `strings` all 187; `changes` vs 07-judge.r2.json; `blind_reader_rulings` for the 111 items of on-r2; `rulings` new/revised; `termbase_additions` the full list; `tm_pairs` every approved string; `source_defects`, `owner_questions`, `notes`; `scores_row` `tr-events-1,2026-11-04,3,<batch_score>,<decision>`). Then run: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-events node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-events-1 C:/Users/truyr/node-store/va-wt/tr-events/tr-translation/output/tr-events-1/stages/07-judge.r3.json --prev C:/Users/truyr/node-store/va-wt/tr-events/tr-translation/output/tr-events-1/stages/07-judge.r2.json` until `RESULT [OK]`. Do not edit any repository file.

## Report back
Plain text, ASCII: the RESULT line; the four scores and decision; keys changed; new/revised rulings one line each; what you could not verify.
