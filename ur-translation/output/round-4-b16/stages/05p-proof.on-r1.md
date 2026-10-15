RESULT: must-fix=0 should-fix=1 note=13
Proof pass (stage-5 role, report only) on b16 judge round 1 (`b16/stages/07-judge.round1.json`, 11:59:33). Nothing was modified. Scripts: `b16/s5p-check.mjs` (out `s5p-check.out.txt`), `b16/s5p-check2.mjs` (out `s5p-check2.out.txt`). Inputs read: RUNBOOK, BRIEFS B, DECISIONS (ROUND 4, b16/b17, owner 2026-10-14 and 2026-10-15), tools/README (reopening), role file 05-proofreader.md, termbase.json (230 rulings), tm.json, pack.json, 05-proofreader.json, start-approved.stage01.json, b15 r1, b14 r2 addendum, blind-input.on-r1.md, coord/r4-b16-triage.txt.

1. SHOULD-FIX (record only, no text change). N251's ruling text says N30 was amended for "the five Al-Uqair / Al-Jafr lines and the two lake lines". N30's own amendment, its strings_affected and the checker's six NOTE P20 name six lines: al-uqair, uqair-castle, uqair-mosque, uqair-beach, najim-museum and delfoon-lake. hubail-lake::area («الاحساء کے شمالی حصے میں») is a single position with no comma. It is not one of N30's lines and gets no NOTE P20. hubail-lake's structure "why" also cites N30 for that line. N30 is right and N251 is not, so the two entries disagree, and N251 does not stand alone once it is in the termbase. Fix: in N251 write "the four Al-Uqair lines, najim-museum's line and delfoon-lake's line (six; NOTE P20 on each)". Drop "(N30)" from hubail-lake's structure note, or say "one position, ending in a postposition; not an N30 line".

2. NOTE: the text is stage 5 letter for letter. The pages JSON is identical (85 leaves, 0 differences), and `changes` is empty in both files. `blind/blind-input.on-r1.md` is byte-identical to `blind-input.on-05.md`. The JSON differs only in its source label. So the on-05 blind read covers exactly this text. The checker's line on the file says 0 mandated, 0 extra, 0 ruling findings, 6 notes (all six are the NOTE P20 that N30 expects), selftest PASS.

3. NOTE: the 16 changed leaves, start text against the r1 text, each checked by script. Every leaf matches the start text with only the old words replaced. There are 9 replacements of «الاحساء کے مشرق میں» → «الاحساء کے مشرقی حصے میں» and 7 of «الاحساء کے شمال میں» → «الاحساء کے شمالی حصے میں»; no other character moved. The 16 leaves are exactly the fields coord/r4-b16-triage.txt lists as changed by #175 on the seven pages (2+2+2+2+4+3+1); none is missing and none is extra. answer/answer_en of uqair-castle and uqair-beach have no Urdu counterpart, as N252 (2) says. Cells read in place, against EN and AR:
   al-uqair::area «خلیج کا ساحل، الاحساء کے مشرقی حصے میں» = EN "The Arabian Gulf coast — eastern Al-Ahsa" / AR «… — شرق الأحساء» (P5 Gulf bare);
   al-uqair::faq[1].a «خلیج کے ساحل پر، الاحساء کے مشرقی حصے میں۔» = EN "…, in eastern Al-Ahsa." / AR «في شرق الأحساء»;
   uqair-castle::body s1 «قلعہ العقیر خلیج کے ساحل پر، الاحساء کے مشرقی حصے میں، العقیر کی تاریخی بندرگاہ کی عمارتوں کے درمیان واقع ہے۔» = EN "On the Arabian Gulf coast of eastern Al-Ahsa …" / AR «شرقي الأحساء» (owner's reading);
   uqair-castle::area and uqair-mosque::area «العقیر کی بندرگاہ، الاحساء کے مشرقی حصے میں خلیج کے ساحل پر» = EN "Al-Uqair port — the Gulf coast of eastern Al-Ahsa" (byte-identical cells, N247/N30);
   uqair-mosque::body s1 «یہ تاریخی مسجد خلیج کے ساحل پر، الاحساء کے مشرقی حصے میں، العقیر کی تاریخی بندرگاہ کے احاطے میں واقع ہے۔» = EN "On the Arabian Gulf coast of eastern Al-Ahsa, within the complex …" (= N56's amended quote, byte for byte);
   uqair-beach::area «العقیر کا ساحل، الاحساء کے مشرقی حصے میں» and ::faq[3].a «الاحساء کے مشرقی حصے میں العقیر کے ساحل پر، العقیر کی تاریخی بندرگاہ کے پہلو میں۔» = N177/N242 amended text, byte for byte; order N248 A;
   hubail-lake::summary «الاحساء کے شمالی حصے میں ایک جھیل، …», ::body s1 «… پانی کا ایک پھیلاؤ ہے جو الاحساء کے شمالی حصے میں ہے۔», ::area «الاحساء کے شمالی حصے میں», ::faq[1].a «الاحساء کے شمالی حصے میں۔» = EN "in northern Al-Ahsa" / "Northern Al-Ahsa" / AR «في شمال الأحساء»;
   delfoon-lake::body s1 «… جو الاحساء کے شمالی حصے میں جھیل الحبیل کے قریب ہے۔» (N249 A), ::area «جھیل الحبیل کے قریب، الاحساء کے شمالی حصے میں», ::faq[1].a «جھیل الحبیل کے قریب، الاحساء کے شمالی حصے میں۔»;
   najim-museum::area «الجفر قصبہ، الاحساء کے مشرقی حصے میں» = EN "Al-Jafr — eastern Al-Ahsa".
   Agreement: «حصے» is the oblique of the masculine «حصہ» before «میں»; «مشرقی»/«شمالی» do not inflect; no other word agrees with the changed words. Seams: the comma pairs around the inserted position in the two port bodies are the approved ones. Card values have no final «۔»; the three answers keep theirs (P26). Nothing entered or left: the change narrows "direction from" to "part of", which is the owner's decision (2026-10-15) and what both sources now say. No name, figure or claim moved. The termbase names in each changed leaf are the same set before and after (script, section G).

4. NOTE: direction words in leaves left unchanged. These are correct to stay. najim-museum::body «الاحساء کے نخلستان کے مشرق میں، الجفر قصبے میں» is EN "east of the oasis" / AR «شرقي الواحة» (N245). It is the only «کے مشرق میں» left in the batch. al-uqair::summary, and sentence 2 of uqair-castle::body and uqair-mosque::body, keep «سعودی عرب کے مشرقی ساحل» (Saudi Arabia's east coast, C34). The text has no «کے شمال میں» anywhere.

5. NOTE: the new forms match the approved in-Al-Ahsa lines byte for byte. «الاحساء کے مشرقی حصے میں» is in the area_ur of duqat-algharash and of mushaqar, and «الاحساء کے شمالی حصے میں» is in the area_ur of thulaim (read from the worktree files). After apply, one wording stands on the ten pages, as N250 says.

6. NOTE: the nine amended rulings against the termbase (section C). N88, N177, N141, N114, N153, N74, N56, N93 and N30 each start with their termbase `ruling` text whole, letter for letter. Each adds one tail that begins « ‖ AMENDED IN b16 (judge round 1, 2026-10-15; …». Each keeps its `title` and `binds` unchanged and extends `ruled_by` with "; amended by the b16 judge, round 1, 2026-10-15". The `guard` changed only on N88, N177 and N141, as N251 announces. The new guards remove the old texts that contradict the new wording ('none says "part"', 'a direction, not a part', 'a direction and not a part'). N93's machine-read guard is unchanged letter for letter, as its tail says. N114, N153, N74, N56 and N30 also keep their guards. The new entries N241–N252 are numbered as DECISIONS allots (stage-4 N241–N252; nothing from N253 is used). P4 and BRAND are `untouched`. The P4 claim holds: no leaf carries «تصدیق باقی ہے».

7. NOTE: guard clauses, read with the checker's own `guardClauses` (tools/lib/rulings.mjs; section D):
   - N241 and N88 give the banned clause «الاحساء کے شمال میں» (substring).
   - N242, N177, N141 and N245 give the banned clause «الاحساء کے مشرق میں» (substring).
   - N93 gives «آبی ذخائر» and «آبی ذخیرہ».
   - N178 gives «الخلیج سڑک پر، نخلستان کے مشرق».
   - The other new or amended entries give 0 clauses, and their guards say "not machine-read". The quoted «الاحساء کے نخلستان کے مشرق میں» inside N245's and N141's guard is not read as a ban.
   Where they fire:
   - 0 hits on the 552 approved Urdu leaves of the 51 attraction files outside b16 (the seven b16 pages were taken from the r1 text, not from the files).
   - 0 hits on the 85 r1 leaves.
   - 0 hits on the 57 leaves of b17/stages/05-proofreader.json.
   - On the planted start text, the north clause fires 7 times and the east clause 9 times.
   The checker's own `roundRulings` for b16 r1 (and for b17 r1/final and b15 final) reads these bans from b16's file, the newest-written. It keeps one clause per form, so the ids are N88 for the north ban and N141 for the east ban. With all 38 bans in reach it has 0 substring hits on the r1 text.

8. NOTE: N178 is byte-identical to b15's entry (JSON with key order). Its guard is the b14 addendum's correction, letter for letter, and equals the termbase's N178 guard. Its ruling text equals the termbase text, with no b16 tail, which is right for an entry repeated rather than amended. najim-museum's «نخلستان کے مشرق میں» does not reach the narrowed clause.

9. NOTE: where the old strings still stand. The judge's "verified vs inferred" note says the two old phrases stand "in the worktree only on the seven b16 pages". That holds for `src/content/attractions/` only. The north phrase is also in `src/data/content-fingerprints.json` (the build regenerates it). Both phrases also stand in termbase.json ruling texts and in the 16 tm.json pairs. Each of those 16 pairs has the start Urdu and the pre-#175 English (section H), and apply replaces them. N251's evidence says all this correctly. The note's wording is broader than what s7-scan checked.

10. NOTE: N250's evidence on repetition undercounts uqair-mosque::body. It names «مشرقی» twice and «ایک حصہ ہے», but the paragraph also has «بندرگاہ کے ان حصوں میں» in sentence 4. So «حصہ» now stands three times in that body («حصے», «حصوں», «حصہ»), and twice in uqair-castle::body («مشرقی حصے», «کچھ حصے»). Each is in its own sense and the source's, sentences apart. The ruling (A) stands; the record should give the full count.

11. NOTE: b17's `07-judge.round1.json` (12:02:32) was written after b16's (11:59:33). For now it is a skeleton with an empty `calibration`, so it overrides nothing. `roundRulings` takes each id from the file written last. If b17's judge repeats any of N88, N177, N141, N93, N178, N30 or P4, his copy will govern for both batches, so a repeated copy must carry b16's text and guard unchanged.

12. NOTE: the eleven-item checklist, on the r1 text (85 leaves, 7 pages):
   (1) letterforms: none. The scan `[يكةهىأإۃ]` over every leaf finds 0 hits; the only harakat are U+064B in «تقریباً» (najim-museum body, approved, standard spelling).
   (2) name forms: PASS. The termbase names in the changed leaves are unchanged, there is no Latin letter in any leaf, and the new words bring no name or pleonasm. «حصہ» is a common noun, not a termbase entry.
   (3) grammar: PASS (item 3 above).
   (4) address: PASS. No «تم», «تمہارا», «تیرا» or «تمہیں».
   (5) headings: PASS. No title, kicker or card label changed, and none ends in «۔».
   (6) termbase: 100 %; no key change; termbase_final is empty, as the judge's note says.
   (7) punctuation: PASS. There is no «», straight quote, Latin comma, semicolon, question mark or U+061B; no Latin point after an Urdu letter; no space before «۔»/«،»; no double space; no U+00A0; no bidi mark. Card values have no stop, every answer ends in «۔», and every question ends in «؟».
   (8) digits: PASS. No U+06F0–06F9 and no U+0660–0669.
   (9) loans and banned words: PASS. No «فیملی», «فوٹوگرافی», «گائیڈ», «پارکس» or «نیشنل پارک», and the new words are native.
   (10) gloss: not reached by the changed leaves.
   (11) structure: PASS. Leaves are in pack order. The six NOTE P20 are N30's lines; hubail-lake::area is a single position (item 1).

13. NOTE: the "repeated word" hits are Urdu reduplication and correct: «کنارے کنارے» (uqair-beach body), «ساتھ ساتھ» (hubail-lake body, faq[0].a), «چھوٹی چھوٹی» (delfoon-lake summary, body, faq[0].a), all approved text.

14. NOTE: the judge record adds up. Every page breakdown sums to its score (93/91/92/91/90/91/93). batch_score 90 = the lowest page = the threshold, and the decision is APPROVE. `blind_reader_rulings` rules items 1–40 once each. The judge's evidence on Al-Jafr is labelled correctly: it rests on the #175 source text, not on the owner's list. The facts and statuses of the guarded claims are unchanged (C34 seaport claim, N100 caravan leaves, N99 pending sentence, N55 status row: none of these leaves changed).
