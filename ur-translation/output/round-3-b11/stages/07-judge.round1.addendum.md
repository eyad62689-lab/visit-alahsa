# b11 — judge's addendum to round 1 (no text change made here)

Read for it: `07-judge.round1.json` (unchanged), `05p-proof.on-r1.md` (must-fix 0, should-fix 4, note 10), `06-blind-reader.on-r1.md` (30 items, 1 serious), `blind/blind-input.on-r1.md`, and the first reader `06-blind-reader.on-05.md` for the side-by-side. No file other than this one was written.

## RESULT OF THIS ADDENDUM: A TEXT CHANGE IS NEEDED — N171 TAKES ITS FALLBACK. I STOP HERE (brief item 3).

## 1. The two readers side by side

### 1a. The edit: women-souq::summary, «… پتھاروں کا ایک روایتی بازار ہے، جہاں …» (change 0, N181)
- First reader (on-05, item 1, moderate): read the noun-phrase version twice to find the subject; offered a copula sentence himself.
- Second reader (on-r1): read the edited summary and made NO remark on its build. His item 2 (minor) touches the same sentence further on, on word order inside the relative clause («جہاں سامان الاحساء کی خواتین بیچتی ہیں»: object before subject, «سامان الاحساء» half-read as a compound). That clause is unchanged since stage 2 and was passed by the first reader; it is not the edit.
- Verdict: CONFIRMED by one reader of one who read it. N181 can stand on a read text.

### 1b. «بدو» (N171): women-souq::body and ::faq[2].a, «شہری بھی اور بدو بھی»
- First reader (on-05): read both leaves and made no remark on the word.
- Second reader (on-r1, item 6, moderate): "In everyday Urdu «بدو» can carry a mildly dismissive tone ('uncouth'); in a respectful line about women sellers it rang slightly wrong." He offers «صحرائی (بدوی)» or «بادیہ کی».
- The trigger I recorded in round 1 is met in its own words. My round 1 said C stays the fallback "if a later reader hears a slur". Stage 4's recommendation, which my ruling took over, names the trigger exactly: "if a reader hears contempt or 'uncouth' in «بدو», the judge replaces it by «بادیہ نشین» in both leaves". This reader wrote 'uncouth' of these women, on the one page where the word describes the people the reader is asked to respect. It is one reader of two. But the cost is the one stage 4 called "the worst misreading the page could suffer", and the references carry that sense (stage 4: the ur.wikipedia lead of the article itself, rekhta's homograph, and «بدوی» as 'uncouth').
- VERDICT: N171 NEEDS ITS FALLBACK. This is a text change, so per the brief I stop and the coordinator opens round 2.
- Stated for round 2, not applied here:
  - The change: «شہری بھی اور بدو بھی» → «شہری بھی اور بادیہ نشین بھی», in women-souq::body and women-souq::faq[2].a (one replacement each).
  - Termbase key «بدو» → «بادیہ نشین».
  - Evidence: ur.wikipedia 7 pages of neutral use (stage 4, HTTP 200); no rekhta entry page was found. The entry therefore stays pending and needs a gender basis in its note.
  - The reader's «صحرائی (بدوی)» is not taken: it puts «بدوی» back, and stage 4 records that word itself as 'uncouth, rustic'. His «بادیہ کی» changes the noun pair into a genitive against a noun, the imbalance stage 2 removed.
  - The edited string then needs a proof pass and a fresh blind read.

### 1c. «دیہی جھونپڑیاں» (N175): zaki-alsalem-farm::summary and ::body
- First reader (on-05, item 18, moderate): read 'shabby huts' first; the setting corrected him.
- Second reader (on-r1): no remark on the word. His item 17 is on «ان میں» (where the bathing happens) and on the singular gloss of a plural name. Neither is the noun.
- Verdict: NO FALLBACK. The condition I set ("if a second reader also reads shacks") is not met: one reader of two. The cost stands as round 1 charged it (one point each on accuracy, nativeness and fit of zaki-alsalem-farm). The record moves from "one reader" to "one reader of two".

## 2. What round 2 inherits (stated, not ruled — the rulings belong in the round-2 file)
Because the text moves, the 30 items of on-r1 and the 14 items of the proof are to be ruled in `07-judge.round2.json` (`proof_rulings` from round 2 on). Pages are to be re-scored there, after the proof and the fresh reader on the round-2 text. I do not re-score here: a number set now would be set on a text that is about to change.

Points round 2 should not miss:
- **«ان میں … نہاتے ہیں» (zaki body).** Two readers of two have now stopped on where the bathing happens (on-05 item 19, on-r1 item 17). Round 1 ruled it the source's: both sources put the bathing in the huts («يستحمّ فيها»; 'chalets … letting guests bathe'). The second reader's own repair («یہاں سیاح … چشمے کے … پانی میں») would place the bathing at the spring, a fact neither source states. It stays the source's unless round 2 finds a wording that keeps «فيها».
- **«جنوبی» (N63).** It is now unclear to a fourth reader across batches (on-r1 item 4, moderate; up from minor). This is N63's recorded cost and is not reopened by a batch judge.
- **Recurring and new remarks.** «گھر نما گاڑیاں» (item 25): the owner's decision, not reopened. The booking verb (item 26): N90 (3). Roads with «سڑک» (item 9): N159 and N172, P16. The serious item 18 (what the fee covers, family arrangements for bathing): a source gap, no point. Item 21, «تاریخی ساحل سمندر», is new: 'historic beach' is both sources' (التاريخي / 'the historic Al-Uqair Beach'), so it is the source's. Item 8 («خشک کیا ہوا دہی» over «سکھایا ہوا دہی») is new and minor.
- **The proof's four should-fix are records.** Round 2 should answer them in its calibration and termbase_final, and in the wording for ap-meta:
  - (1) N181's binds and its status after the reader. The reader has now read the edit (1a above).
  - (2) P4's amendment with the form written out in place of "A".
  - (3) The tm pair 'Pending confirmation' → «تصدیق باقی ہے» enters tm.json as `status: "candidate"`, never unstatused. My recommendation: candidate, because P4 stays open.
  - (4) One b11 line each on N84, N90 and N100, superseding their HELD lines.
- **The proof's notes 13 (a)–(c).** N170's exception to role file 05 item 10; «اریاف زکی» kind `institution` → a place; the gender basis of «بدو» (moot if the key becomes «بادیہ نشین», whose basis round 2 must state) and of «اقط».

## 3. Scores
None is re-scored in this addendum (section 2). For the record only, so that nobody holds a number: on the r1 text and two readers, no page reads below 90. women-souq is the page the change touches. The tone cost of «بدو» would fall on its nativeness and fit, and the change is made to remove that cost, not to rescue a number.

## 4. FOR THE OWNER (new since round 1)
1. women-souq: a reader heard «بدو» ('Bedouin') as mildly dismissive of the women sellers. Round 2 will write «بادیہ نشین» (the neutral 'desert dwellers'). No question to the owner unless he prefers another word for 'Bedouin' on /ur/.
2. zaki-alsalem-farm: a second reader (the only SERIOUS item of the round) could not decide whether to bring his family for the bathing: what the fee covers and how bathing is arranged for families and women is in neither source. This repeats question (4) of round 1, now on two readers.
3. zaki-alsalem-farm: whether the hours apply all year or only in the harvest season (on-r1 item 19) is a new gap, in neither source.

NOT VERIFIED: nothing was fetched in this addendum. The counts for «بادیہ نشین» are stage 4's, not re-fetched.
