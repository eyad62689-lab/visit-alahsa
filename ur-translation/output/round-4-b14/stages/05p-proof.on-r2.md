RESULT: must-fix=0 should-fix=1 note=4

Proof pass on b14 judge round 2 (stage-5 role, report only; nothing modified). File proofed: b14/stages/07-judge.round2.json (mtime 2026-10-15 10:29:46). Scripts: b14/s5p2-cmp.mjs (round 2 against round 1 entry by entry and field by field, and against the worktree termbase; output in s5p2-cmp.out.txt), s5p2-guard.mjs (the guard reader's clauses from round 2, applied with the checker's own whole-word test to b14 r2, b15 stage 3 and every `*_ur` string of the worktree's 58 attraction files, plus a break probe; output in s5p2-guard.out.txt), s5p2-ctx.mjs (the contexts and sources of each hit), s5p2-letters.mjs (letterforms of every quoted form new in round 2).

## Findings

1. SHOULD-FIX — N178's new guard, «نخلستان کے مشرق» "does not occur as a whole word", hits approved text on two other published pages, where the sources themselves say "east of the oasis". The guard reader picks the clause up: `guardClauses` returns {N178, banned, «نخلستان کے مشرق», whole: true}. It does not hit b14 (mushaqar's «نخلستان کے مشرقی حصے میں» is a different whole word) or b15 stage 3 (kanzan's «نخلستان کے مشرقی کنارے»). The break probe «… نخلستان کے مشرق میں …» is caught. zaki-alsalem-farm's live body is clean. But run over every approved attraction page with the checker's own `hits()` test, it hits three cells on two b9 pages:
   - dar-alturath::body_ur «الاحساء کے نخلستان کے مشرق میں، المنصورہ قصبے …» (EN "Amid the palm farms of Al-Mansurah, east of the oasis");
   - dar-alturath::area_ur «المنصورہ قصبہ، نخلستان کے مشرق میں» (EN "Al-Mansurah — east of the oasis");
   - najim-museum::body_ur «الاحساء کے نخلستان کے مشرق میں، الجفر قصبے میں …» (EN "In the town of Al-Jafr, east of the oasis").
   The clause binds every attraction batch, so any later batch that reopens either page (or a final check over them) gets a RULING finding on correct, approved, sourced text. That is the same over-reach N211 set out to cure on mushaqar. It also breaks round 2's own new N211 guard: "a guard clause meant for one page is worded so that its pattern cannot occur legitimately on another". N178's ruling and N211 also say the whole-word clause "catches the phrase 'east of the oasis' wherever it stands", as if that were always wrong, but it is right where the source carries it. Smallest fix: word the clause with a string only zaki-alsalem-farm's English-only phrase could produce. For example «الخلیج سڑک پر، نخلستان کے مشرق» does not occur (its English is "On Al-Khaleej Road east of the oasis"; neither b9 page has the road). Then state in N211 that the clause is page-specific by its wording, not by scoping.

2. NOTE — Each round-1 item is corrected as reported (proof_rulings 1–10 match the file):
   - (1) N178's ruling keeps the termbase's ruling byte for byte as a prefix, including the restored "‖ ENTERED ON APPLY (2026-10-14) AS AN OWNER DECISION, OPEN … (N178)" segment, followed by one "AMENDED IN b14 (judge rounds 1–2 …)" line that states the guard change and that the ruling and the open question are unchanged. Its `ruled_by` starts with the termbase's "Round 2 judge, b11 round 2, 2026-10-14" and adds the b14 clause. Its status is now `owner_decision`, which the checker still reads (`ruledOf`).
   - (2) N211 says plainly that the reader has no scoping by binds (see item 1 on the clause it chose).
   - (3) termbase_final «تفریح گاہ» `ar` «منتجع», with a dated note line.
   - (4) Each of the seven keys' attestation lines now states only what stage 4 counted. Checked against s45-web.json: «الاحساء قومی پارک» 0 / «الاحساء کا قومی پارک» 0; «جواثا پارک» 0 / «جواثا کا پارک» 0; «عین النجم پارک» 0, possessive not looked up; «المشقر پارک» 0, possessive not looked up; the bracketed kanzan key not looked up; «جبل پارک» 0 only; «الموسیٰ پارک» not re-counted. All match.
   - (5) N212 carries a dated line saying the coordinator taught the checker. Confirmed: roundcheck.mjs changed at 10:17:09, and 07-judge.round2.json.check.txt reports "0 ruling finding(s)".
   - (6) N112, N117 and N121 `binds` read "owner decided 2026-10-14 (formerly …)".
   - (7)–(10) are recorded in N199, the notes and the key STATUS lines.

3. NOTE — The text is round 1's letter for letter. All six pages' fields are equal by script (JSON of every page's fields, r1 == r2), `changes` is [], termbase_final has the same nine keys, N199's `termbase_keys_retired` is unchanged, and blind/blind-input.on-r2.md is byte-identical to on-r1 (cmp). So my round-1 text checks stand unchanged: letterforms none; «تفریح گاہ» / «پارکس» / «نیشنل پارک» 0; retired keys 0; titles and mentions = keys; masculine agreement throughout; the eleven-item checklist PASS. Nothing new is ruled into the text. The checker on r2: 0 mandated, 0 extra, 0 ruling findings, selftest PASS.

4. NOTE — The new STATUS line at the head of «الموسیٰ پارک»'s note says "the possessive forms quoted below are stage 1–5 history", but that note quotes no possessive form (N85's compound under every candidate). Harmless template wording. The same line is accurate for the other six keys.

5. NOTE — Internal consistency of the other entries round 2 touched holds:
   - N199: its appended line says the meta step retires only the first seven keys; its evidence cites on-r1 reader items 10, 14, 24, 26, 34 and 38, and each says what is claimed.
   - N200: its evidence cites item 10; checked.
   - N211: ruling and guard agree with N178, apart from item 1.
   - N212.
   - The notes ("retire only the seven", "N178 stays an owner question", fingerprints and tm.json at apply) and FOR THE OWNER (6) N178 open.
   - Source defects and blind-reader rulings: the "ROUND 2" lines change no ruling.
   Of the 24 quoted forms new in round 2, five contain Arabic letterforms, and all five are Arabic quotations by design: «التاريخي», «الأثري», «تزلج جبلي», «جبل الشعبة», «المهيدب لخدمة المجتمع».
