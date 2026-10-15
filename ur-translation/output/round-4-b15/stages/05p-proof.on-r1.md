RESULT: must-fix=0 should-fix=1 note=13

Proof pass (stage-5 role, report only) on `b15/stages/07-judge.round1.json`. Nothing was modified. Scripts (in R\b15\): s5p-diff.mjs, s5p-park.mjs, s5p-check.mjs, s5p-tb.mjs, s5p-cal.mjs, s5p-rul.mjs, s5p-wtrul.mjs, s5p-sister.mjs; outputs in the matching s5p-*.txt files.

1. SHOULD-FIX (record, not text): blind_reader_rulings n=38 gives the reason "accurate, Imam from 1794/1803". The owner's fact in DECISIONS ("Owner's answers on 2026-10-14") is "Imam from 1803". 1794 is the year muhairis was built (the dates on the pages are najm-park 1799 and muhairis 1794), not a year he was Imam. So the judge's record now holds a date the source does not give. Fix: "Imam from 1803". No leaf changes.

2. NOTE — the text is stage 5, letter for letter. Checked by script: there are 75 leaves in both files with the same key order; JSON.stringify of pages/fields is identical; 0 leaves differ; 6327 code points; `changes` is empty. `blind/blind-input.on-r1.md` is byte-identical to `blind-input.on-05.md`. The two .json headers differ only in `on`, `stage_file` and `stage_sha256`. So the on-05 reading covers exactly this text.

3. NOTE — the 17 changed leaves (start text to stage 5). Each one was read in place against EN, AR and the start text. In every leaf only the noun and its agreement moved, and nothing entered or left the meaning:
   - king-abdullah-park: title, kicker, summary, body. «…ماحولیاتی پارک» for «منتزه … البيئي» / "Environmental Park". No agreeing verb is affected.
   - stadium-park: title «کھیلوں کے اسٹیڈیم کا پارک» (possessive «کی» changed to «کا»), kicker, summary, body «ایک عوامی پارک». practical[0].value is now «24 گھنٹے کھلا رہتا ہے» (N65 masculine string, N204; byte-equal to b14 musa-park and to tm.json's masculine pairs).
   - koot-park: kicker «پارک» (AR «منتزه»; N225).
   - jawatha-mosque: practical[0].label «ساتھ والے پارک کے اوقات» (oblique masculine); practical[1].value «پارک میں داخلہ»; faq[0].a «ساتھ والے پارک میں»; faq[1].q and faq[1].a «ساتھ والا پارک … کھلا رہتا ہے». One wording in all four leaves (N224).
   - kanzan::body, last clause: «ایک بڑا تفریحی پارک» (masculine «بڑا»; "major recreational park" / «منتزهاً ترفيهياً كبيراً»; N221).
   - muhairis::body: «ایک سرسبز پارک ہے» ("a green park" / «منتزه أخضر»; N223). The «اس کے احاطے» clause is unchanged (N226).
   The masculine agreement script found no feminine verb or possessive after «پارک». Its hits on «عوامی/سرسبز پارک» are invariable adjectives.

4. NOTE — jawatha-mosque VISITING row (practical[2]) is byte-identical to the start text in both label «زیارت» and value. Rows 0 and 1 differ only in the noun.

5. NOTE — banned and leftover forms in the 75 leaves:
   - «پارکس» 0; «نیشنل پارک» 0.
   - «تفریح گاہ» 1, on tuwaither::body: the resort «سیاحتی تفریح گاہ» (EN "tourist resort", AR «منتجعاً سياحياً»; N222).
   - Every leaf whose EN says park, or whose AR says «منتزه»/«حديقة», was matched. The park leaves are «پارک». The garden leaves are «باغ»: koot-park title/summary/body (N121) and muhairis practical[0].value, whose source is "garden" / «الحديقة».
   - No park is left as «تفریح گاہ». Worktree check: «تفریح گاہ» stands today only in the seven b15 attraction files (5+1+4+1+1+4+1 = the 17 changed leaves + tuwaither) and in content-fingerprints.json; ui.ts has 0. So N222's "after b14/b15 it stands on tuwaither::body only" holds.

6. NOTE — entries claimed as repeated from b14. All twelve were compared by script against `b14/stages/07-judge.round2.json`, with the addendum's correction overlaid for N178 (N199 N200 N201 N202 N65 N69 N85 N124 N121 N204 N211 N178).
   - All twelve are byte-identical, field order included.
   - N178's guard equals the ADDENDUM's narrowed clause («الخلیج سڑک پر، نخلستان کے مشرق» does not occur), not round 2's.
   - The same twelve also equal the worktree termbase `_meta.calibration_rulings` (ruling/guard/binds), where b14 is applied.
   - P4 and BRAND are b15's own wording and are not claimed as repeats.
   - Not carried from b14 r2: N203 N212 N101 N102 N103 N112 N117 N122 P3a. None of them touches a b15 leaf.

7. NOTE (for the coordinator, inherited and not owed by b15) — N178 and N211 do not stand alone. Both still say the guard is "now a whole-word clause … machine-read on every attraction page" and that it "bites on the phrase 'east of the oasis' itself". Their guard is the addendum's zaki-specific span. `07-judge.round2.addendum.md` declares N211's round-2 line superseded, but neither the addendum JSON nor the termbase carries a line saying so. b15 cannot change it without breaking word-for-word. The meta step could add one dated line to N211/N178: "guard narrowed by the b14 round-2 addendum".

8. NOTE — N69 and N222 agree in substance: the resort is «سیاحتی تفریح گاہ» with its offer named, and it is never used for a park. Two loose ends:
   - N69's last sentence ("kanzan::body and tuwaither::body are b15's") still points forward, and no b15 line was added to N69. N202 allowed that ("adds only what b15 alone changes"), and N222 changed nothing.
   - N222's strings_affected lists "ruling N69 (its resort clause)", though N69 is unchanged.
   Neither is a contradiction.

9. NOTE — new and amended entries checked against the text and the termbase:
   - N221: the clause is in the text; «سیر و تفریح» is one sentence earlier, as its cost says; b14 kanzan-park does carry «ایک بڑا پہاڑی پارک».
   - N223: b14 jawatha-park's summary does carry «ایک سرسبز پارک».
   - N224: four leaves, one wording. reopened.json lists "Adjacent park hours" under tm_labels_withdrawn; the tm.json pair is today «ساتھ والی تفریح گاہ کے اوقات».
   - N225: the quoted pack note ("Here and on najm-park the kicker's noun is not the generic …") is in the pack's koot-park review. The kicker is not rendered.
   - N226: the clause is unchanged.
   - N233: both titles are byte-identical to the new keys. reopened.json lists both retired keys, and both are still present in the worktree termbase, feminine, to be retired.
   - N234: «1 لاکھ مربع میٹر» stands in the text and once in the worktree tuwaither.md; there is no bare 100,000.
   - The hours-notice claim in the judge's notes (stadium-park, koot-park, kanzan, tuwaither are openSite) matches the pack.

10. NOTE — termbase_final:
   - «تفریح گاہ»: ar, en, gender, plural, kind, gloss and status equal the worktree entry. source and note are the worktree text with b15 lines appended only.
   - «شاہ عبد اللہ ماحولیاتی پارک» and «کھیلوں کے اسٹیڈیم کا پارک»: masculine, pending, with full schema. "Exercised / not exercised" is true of the text: stadium's Hours value is masculine, and king-abdullah has no agreeing verb.
   - All seven titles are a key: the two new ones in termbase_final, the other five in the worktree termbase.
   - None of the 31 keys retired across the round's judge files occurs in the text.

11. NOTE — letterform scan (`[يكةهىأإۃ]` over all 75 leaves): none. Also none for: ھ outside an aspirate, U+00A0, zero-width or bidi marks, tatweel, Latin letters, Eastern digits. Three U+064B (tanween) in «تقریباً»: kanzan::body, muhairis::body, tuwaither::body. These are standard Urdu spelling in approved, unchanged text, not a finding.

12. NOTE — the eleven-item checklist, all PASS:
   - (1) Letterforms: none.
   - (2) Names byte-identical to keys. No Latin script, no banned press form, no pleonasm.
   - (3) Gender and number: masculine «پارک» everywhere. «جوں جوں» and «ذرا ذرا» are idiomatic reduplication.
   - (4) Address: 0 تم/تمہارا/تیرا. The two «تو» are particles after a clause: jawatha-mosque::body «… ہوں تو» and muhairis::body «… ہیں تو».
   - (5) No stop on a title, kicker or label.
   - (7) Punctuation: no Latin point after Urdu, no ASCII comma, no «» or straight quotes, no ؛, no space before ۔/،. No card value ends in ۔. No en dash, no Latin «?».
   - (8) Latin digits only, no SAR, no ملین/بلین, no «:00». Every «بجے» has a part of day; muhairis «رات 11:30 بجے» is a half hour. No bare figure of one lakh or more.
   - (9) No banned loan: «ریزورٹ», «ایکو», «امیوزمنٹ» and «تھیم» are absent too. No «موجود ہے», no «انعقاد».
   - (10) No bracket after a jabal name.
   - (11) Area lines: muhairis and tuwaither open with «الاحساء،». The P20 NOTEs on koot-park, jawatha-mosque and kanzan are approved text, unchanged. Labels are the approved set.

13. NOTE — scores and rulings:
   - Each page's breakdown sums to its score (92/95/90/91/92/92/91). batch_score 90 is the lowest page and meets the threshold 90.
   - blind_reader_rulings cover n = 1..48, which equals the 48 items of `06-blind-reader.on-05.md`.
   - The checker's RESULT on the judge file is clean: 0 mandated, 0 extra, 0 ruling findings, selftest PASS.

14. NOTE — N222 evidence quotes the udb.gov.pk definition with a doubled letter, «تفریحح گاہ». It is probably verbatim from the page and is not in any text leaf. If it is not verbatim, it is a typo in the record only.
