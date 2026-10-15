RESULT: must-fix=0 should-fix=2 note=9

Proof pass (stage-5 role, report only) on b17 judge round 1 (`07-judge.round1.json`, sha256 708f660f…, pack db4baac3…). Nothing was modified. Scripts: `b17\s5p-dump.mjs`, `s5p-src.mjs`, `s5p-judge.mjs`, `s5p-tb.mjs`, `s5p-note.mjs`, `s5p-guard.mjs`, `s5p-scan.mjs`, `s5p-style.mjs`, `s5p-sister.mjs`, `s5p-tm.mjs`, `s5p-frond.mjs`, `s5p-lf2.mjs`, `s5p-openprec.mjs` (outputs `s5p-*.out.txt`).

1. SHOULD-FIX — N139, field `binds` (calibration, goes to the termbase as written): it still reads "… dar-alturath::body (change 0). Every later war helmet." The b17 amendment changes dar-alturath::body («جنگی خود … پرانے» → «آہنی ٹوپیاں … پرانی»), and the entry's own new line says so ("dar-alturath body (b17): …"). As it stands, `binds` contradicts the ruling text above it. The b17 line was added to `ruling`, `guard` and `ruled_by`, but not to `binds`. Smallest correction: "dar-alturath::body (b9: change 0; b17: the helmet, «آہنی ٹوپیاں»)". Everything else in `binds` stays.

2. SHOULD-FIX — termbase_final «بادیہ نشین», `note`: this is the only one of the four entries whose termbase note is not kept whole. The other three («جھونپڑی», «اریاف زکی», and the `source` of this one) keep the termbase text as an exact prefix and add ‖ lines. Here the opening sentence was rewritten in place: the termbase has «شہری بھی اور بادیہ نشین بھی» (of women), and the judge's version has «مقامی بھی اور بادیہ نشین بھی» (of women; «شہری» until b17). The common prefix is 84 of 676 characters. Because of that rewrite, the note now quotes as history a pair that never stood in b11. It also keeps "Pending: no dictionary page, and not yet read in place", which its own STAGE 4 line disproves: rekhta meaning-of-baadiya-nashiin was found, and the word was read in place by b11 on-r2 and b17 on-05. Smallest correction: put the termbase note back word for word (the new pair is already in the appended STAGE 4 line), and have the STAGE 7 line state the current reason for "pending": the gender is the inferred citation gender and is not exercised.

3. NOTE — P4: the leaf zaki-alsalem-farm::practical[2].value is «تصدیق باقی ہے», byte-identical to the start text, with no stop. The row is hidden (verified: false) and is listed in blind-input.on-r1.json `not_shown`. tm.json has exactly one pair { en "Pending confirmation", ur «تصدیق باقی ہے», page zaki-alsalem-farm, field practical[2].value, status "candidate" }, and it is the only candidate pair. So the three things the entry asks of the meta step can be carried out as written: take P4 out of open_items, leaving BRAND only; enter it among the calibration rulings; set the pair to approved. Inside the entry, the candidate list is "A owner_decision / B stays_open", but the ruling text uses "B («تصدیق کی منتظر» …) and C (a process under way)", which are b6's letters. Each letter is described where it is used, so the termbase text (ruling only) still reads correctly on its own. No change needed.

4. NOTE — P4 and the meta step: the judge entry has no `title`. The termbase schema needs one (id, title, binds, ruling, guard, ruled_by), so the meta step takes it from the open item's own `title`. The open item's `provisional` text (b6's recommendation and the b11 exception, "‖ AMENDED IN b11 …") and its `first_bites` (event pages) are summarized in the ruling ("carried provisionally since b11", "The b11 exception … is spent") but not carried over. The precedent (coord/meta-build.mjs, `removed_now_ruled`) also removes a ruled open item without carrying its text over, so this follows practice. Recorded for the meta step: carry the title across.

5. NOTE — N178 is byte-identical to b16's entry (JSON.stringify, same key order) and equal to the termbase's (ruling, guard, binds, ruled_by). Its b14 line says the clause "is now a whole-word clause". guardClauses actually reads the guard as a substring clause (whole=false) on the longer span «الخلیج سڑک پر، نخلستان کے مشرق», which is the narrowing in the b14 addendum. This wording was inherited, and the repeat has to be byte-identical, so it is not a b17 matter. The clause fires nowhere.

6. NOTE — hamidiyah-souq body and faq[2].a: stage 1 moved the adverbial to the front: «ہفوف کے تاریخی مرکز کی ترقی کے منصوبوں/منصوبے کے تحت اس کی مرمت کی گئی». This puts «اس کی» right after «… مرکز …». The start text began with «اسے». The pronoun can still only be read as the topic (the building), and the on-05 reader read the building as restored (items 3, 9, 10). N263 rules the word order of the summary only; its evidence says body and faq order are natural. No action.

7. NOTE — N261's evidence understates its own precedent. "restored" → «مرمت» appears in 15 approved tm pairs on 13 pages (sahood, ameeriah, khuzam ×2, baiah, jabri-mosque, jalaniyah, dibs, bubakr-ribat, umzurainiq, jawatha-mosque ×2, uqair-castle, uqair-mosque ×2), not "seven pages". "Restored" with no «مرمت»: 0. «بحال»: only in the four "rehabilitated" pairs, as claimed. The ruling holds and is stronger than stated. The other precedent claims also check out: palm fronds = «کھجور کے پتوں» (qaisariyah ×2, muhairis; jalaniyah «کھجور کے تنوں اور پتوں»); the only mid-month on /ur/ is home.route.s5.d, which contains «وسط جون سے اگست» and «لیموں کی چنائی».

8. NOTE — termbase_final «جھونپڑی» keeps en "hut (rural)" from the old "countryside chalets" source. The decided thing is a traditional palm-frond hut. This is the English gloss of a generic and does not affect the text. If touched, "hut" alone would do.

9. NOTE — the judge's guard test (s7-guard.out.txt), column "the five b17 files as live now": N171's «بدو» shows 1 there, which is the Arabic «وبدويات» in women-souq.md (the column scans whole files). My Urdu-fields-only run gives 0. The checker reads Urdu leaves only. None of the judge's recorded claims (start text, r1 text, approved files outside b17) is affected.

10. NOTE — counting: "nine changed leaves" means 8 changed plus 1 new (lemon-farm::bestTime, empty in the start text). 48 of 57 leaves are byte-identical to the start text. All nine appear verbatim in blind-input.on-r1.md, which is byte-identical to on-05 and built from this exact judge file (stage_sha256 matches).

11. NOTE — remarks from the on-05 reader that touch changed leaves, and how they were ruled: item 17 (the gloss «زکی کا دیہی علاقہ» no longer echoes the huts) is bound by the owner ("the name and its bracket stay") and charged. Item 34 («چنائی» against «توڑتے») is N269's named cost. Item 32 (SERIOUS: open outside the season?) is the source's. Nothing in them is owed to the proof, and the judge ruled all three on the record.

## Checks run (all by script; Urdu read from the files, never typed in a shell)

- Text = stage 5, letter for letter: 57 leaves in the same order, `pages` JSON identical, 0 differing leaves; `changes` = 0. Checker on file: `RESULT [b17 07-judge round 1]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | … changes=0 … scores 92/93/92/93/94 batch_score=92 … rulings=39 | termbase_final=4 | selftest PASS`. The check.txt was written after the judge file.
- The nine leaves against EN, AR and the start text (cells read in place):
  - hamidiyah-souq summary: «جسے … دوبارہ تعمیر کیا گیا» → «جس کی مرمت … کی گئی». EN "restored", AR «رُمِّم». Feminine «مرمت» → «کی گئی» ✓. Head adjacent (N263) ✓.
  - hamidiyah-souq body and faq[2].a: «اسے … دوبارہ تعمیر کیا گیا» → «… کے تحت اس کی مرمت کی گئی», and the two «بھی» are gone (N262). Qaisariyah's «نئے سرے سے بنا» (the source's "reconstruction") stays. The restoration sentence is the same in both leaves apart from «منصوبوں/منصوبے», as in the start text. «دوبارہ تعمیر» and «بحال» do not stand on the page ✓.
  - zaki-alsalem-farm summary and body: «دیہی جھونپڑیاں» → «کھجور کے پتوں کی روایتی جھونپڑیاں». EN "traditional palm-frond huts", AR «أكواخ تراثية من السعف». Same words in both leaves. Feminine plural «بھی ہیں» / «بنائی گئی ہیں … کہلاتی ہیں» ✓. «دیہی» occurs once on the page, inside the gloss ✓. The N170 naming clause is intact, and the judge's N170 line quotes the live sentence byte for byte ✓. «سرخ» is in the body only (N178) ✓.
  - women-souq body and faq[2].a: «شہری» → «مقامی». EN "local women", AR «محليّاتٌ». The pair «مقامی بھی اور بادیہ نشین بھی» is the same in both leaves. «شہری» is gone from the page, and «بادیہ نشین» occurs only inside the pair ✓.
  - lemon-farm bestTime (new): «وسط جون سے اگست تک، لیموں کی چنائی کا موسم». EN "From mid-June to August, the lime-picking season.", AR «من منتصف يونيو إلى أغسطس، موسم قطف الليمون.» Urdu month names, the range with «سے … تک» (N13), U+060C, no final stop (P26). Rendered as "| بہترین وقت | … |" ✓. Nothing was added: «کے آخر» from the home route was not imported ✓.
  - dar-alturath body: «جنگی خود … پرانے» → «آہنی ٹوپیاں … پرانی». EN "military helmets", AR «خوذاً عسكرية». Both nouns are feminine, so «پرانی» is right. «خود» no longer stands as a word ✓. 'Iron' entered and 'military' left the noun: this is the owner's form, with the cost recorded in N139 and N270.
- Amended rulings against the termbase (242 rulings, open items P4 and BRAND):
  - N139, N171, N175, N158 and N170 each keep the termbase `ruling` as an exact prefix and add exactly one line "‖ AMENDED IN b17 (judge round 1, 2026-10-15; …)".
  - `title` and `binds` are unchanged in all five (see item 1).
  - `ruled_by` in each gains "; amended by the b17 judge, round 1, 2026-10-15".
  - Guards changed in N139, N171 and N175 (as ruled). N158 and N170 guards are unchanged.
  - N171's first clause («بدو» does not occur) is kept letter for letter.
- Guards through the checker's own reader (`tools/lib/rulings.mjs` guardClauses):
  - Clauses read: N139 3 (banned), N171 4 (banned), N175 2 (banned), N158 1, N178 1. P4, N261–N270, N273 and N170: 0, as their guards say ("not machine-read" / "For the proofreader").
  - Corpus: every Urdu `_ur` leaf of all 58 files in WT\src\content\attractions — 581 leaves outside b17. The five b17 pages were read from the r1 text instead of their files.
  - Result: every clause fires on 0 leaves outside b17 and 0 on the r1 text.
  - On the planted start text: «جنگی خود» fires (dar-alturath::body), «شہری بھی اور بادیہ نشین» fires (women-souq body and faq[2].a), and «دیہی جھونپڑیاں» fires (zaki summary and body). These are the three withdrawn wordings, so the new clauses bite.
  - The full set in force for b17 r1 (roundRulings: 18 files, 62 clauses, 30 retired keys): 0 banned clauses fire and 0 retired keys stand on the corpus.
  - The checker takes N139, N171, N175, N158 and N178 from b17/stages/07-judge.round1.json. It was written last (09:10Z); the files that share those ids are b9, b10, b11, b14, b15 and b16, all earlier.
- termbase_final:
  - «آہنی ٹوپی» is new: feminine, plural «آہنی ٹوپیاں», pending. No old term to retire: there is no «خود» / «ٹوپی» / «ہیلمٹ» key. "helmet" occurs on dar-alturath only.
  - «جھونپڑی» and «اریاف زکی» keep their notes and sources whole and append.
  - «بادیہ نشین»: source kept whole; note not kept whole (item 2).
  - Fields ar, en, gender, plural, kind, gloss and status are unchanged in the three existing entries.
- Sister batch: N178 is byte-identical to b16's (and to b15's, = in the script). b16 shares no other ruling id with b17 except P4 and BRAND, which b17 supersedes (written last). No shared sentence: b16's pages are different.

## Eleven-item checklist (role file 05, with the round rulings)

- item 1 letterforms: PASS. Regex [ي ك ة ه ى أ إ ۃ] over all 57 leaves gives none. Also none in the 8 termbase_final strings and none in the 190 Urdu «…» quotes of the calibration. U+06BE occurs only after aspirate bases (ک ت ب د ج پ چ گ ٹ ڑ).
- item 2 names: PASS. Keys stand byte for byte (stage checker NAME clean), 0 retired keys stand, no new pleonasm, no Latin name.
- item 3 grammar: PASS. Agreement read in all nine leaves (see above). The ergative and postpositions are untouched.
- item 4 address: PASS. No تم / تمہارا / تیرا / تجھے, and no «تو» at all.
- item 5 headings: PASS. No title, kicker or label ends in ۔.
- item 6 termbase: PASS (N139, N171, N175, N158, N170, N261–N270 guards met; see above).
- item 7 punctuation: PASS. No ASCII . or , after a word, no space before ۔ or ،, no «», no straight quotes, no U+061B, no U+2013, no NBSP, no bidi or ZWNJ marks. Card values carry no stop. Every answer, summary and body ends in ۔ and every question in ؟.
- item 8 numbers and dates: PASS. Latin digits only. Month names are Urdu (جون، اگست), and there is no new figure.
- item 9 loans and register: PASS. No new loan. The style-list hits are the admitted «فیس» (P16) and the mandated «نخلستان» (P2). «ریستوران» / «ہیلمٹ» / «کاٹیج» / «فیملی» / «موجود ہے» / «کا انعقاد»: 0.
- item 10 glossing: PASS. «“اریاف زکی”» is in marks with its gloss once, under the N170 exception to item 10 (no «نامی»). «سوق القیصریہ نامی بازار» follows P3c. No gloss in a heading.
- item 11 structure: PASS. Same 57 leaves and keys as stage 5, no `source_ur`, and area lines are untouched.
