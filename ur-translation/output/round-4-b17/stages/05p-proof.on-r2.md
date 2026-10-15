RESULT: must-fix=0 should-fix=1 note=4

Proof pass (stage-5 role, report only) on b17 judge round 2 (`07-judge.round2.json`, sha256 b93e3477…). Nothing was modified. Scripts: `b17\s5p2-diff.mjs` (output `s5p2-diff.out.txt`) and `s5p2-lf.mjs`.

1. SHOULD-FIX — termbase_final «بادیہ نشین»: the new STAGE 7 line says "Read in place by three readers (b11 on-r2 item 8; b17 on-05 item 26)" but cites only two. The third is this round's reader (b17 on-r1, item 24: "bookish and Persianized"), whom N266's round-2 line already cites. This line goes into the termbase as written. Smallest correction: "(b11 on-r2 item 8; b17 on-05 item 26; b17 on-r1 item 24)". Everything else in the line is correct.
   - The termbase note is now an exact prefix of the judge's note: restored word for word, as asked.
   - Stage 4's line is kept.
   - The pending reason is now the real one: the gender is the inferred citation gender and is not exercised.
   - The superseded sentence is named.

2. NOTE — the count of «بادیہ نشین» readers differs between the record and this file. Blind-reader ruling 24 says "Bookish to four readers now". Three readers have read «بادیہ نشین» in place: b11 on-r2, b17 on-05 and b17 on-r1. b11's first two readers read «بدو». The N171 and term-note lines also call the b17 on-05 reader "the third reader to say so"; by the same record that reader was the second. These counts are in the judge's rationale and in round-1 text already applied in the record. Nothing in the text depends on them. If the line is touched for item 1, "three" is the count it can cite.

3. NOTE — new source defect (hamidiyah "project"/"projects"): it is accurate for the Arabic. The Arabic body has «مشاريع تطوير», and the summary and faq[2].a have «تطوير» alone. The English writes "development" in all three, with no "project" at all. So the Urdu «منصوبوں» in the body follows the Arabic only. The singular «منصوبے» in the summary and faq[2].a is approved start text that names a "project" neither source has. Both are outside the decision and are not reopened. The owner line ("one wording in the source") covers it.

4. NOTE — the ROUND 2 lines in N261, N264, N266, N268, N269, N270 and N170 match the on-r1 report:
   - 34 items.
   - No remark on «چنائی», «مرمت» or «آہنی ٹوپی».
   - «مقامی» appears only inside item 24's quote.
   - The huts appear only in items 16 and 17, with no 'shack' reading.
   - Item 14 is one project or several; item 17 is the gloss; item 29 is SERIOUS (plural seasons).
   One wording goes further than the report: N261's "the on-r1 reader too read the building as restored" is inferred from his silence, since he names no rebuilt reading either way.

5. NOTE — record corrections, checked against round 1. P4, BRAND, N262, N263, N265, N267, N171, N175, N158, N273 and N178 are byte-identical to round 1. N178 is still identical to b16's.
   - Every changed `ruling_or_recommendation` keeps its round-1 text as an exact prefix and only appends a "‖ ROUND 2" line.
   - N139 and N170 still keep the termbase ruling as an exact prefix. N170's title, binds and guard equal the termbase's.
   - N139's `binds` now reads «… dar-alturath::body (b9: change 0; b17: the helmet, «آہنی ٹوپیاں»). Every later war helmet.», which is exactly the round-1 item 1 correction. Its `ruled_by` appends "; binds corrected in round 2 (proof on r1, item 1)".
   - Guards are unchanged in every entry.
   - termbase_final: «آہنی ٹوپی», «جھونپڑی» and «اریاف زکی» are byte-identical to round 1. All three existing entries keep their termbase notes and sources as exact prefixes.
   - The 11 proof rulings cover items 1–11 once each.

## Checks run
- Text: `pages` of round 2 = round 1 = stage 5 (JSON identical); `changes` = 0. blind-input.on-r2.md is byte-identical to on-r1 and was built from this exact file (stage_sha256 b93e3477… matches). Checker on file: `RESULT [b17 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | 5 page(s), 57 strings, 5144 code points | changes=0 over 0 leaf(s) | scores 92/92/91/92/94 batch_score=91 threshold=90 decision=APPROVE | rulings=34 proof_rulings=11 | termbase_final=4 | selftest PASS`.
- Guards, read by guardClauses: N139 has 3 clauses, N171 4, N175 2, N158 1 and N178 1. Corpus: the 581 Urdu leaves of the 53 approved attraction files outside b17, plus the r2 text. Every clause fires 0 times outside b17 and 0 times on r2. On the start text, the three withdrawn wordings still fire (1, 2 and 2 leaves).
- All guards in force for b17 r2: roundRulings gives 62 clauses; 0 banned clauses fire. Of 30 retired keys, 0 stand. The checker now takes N139, N171, N175, N158 and N178 from b17 round 2, which was written last.
- Letterforms: 227 Urdu «…» quotes in the calibration and termbase_final notes, plus keys, plurals and glosses. None contains [ي ك ة ه ى أ إ ۃ].
- The eleven-item checklist stands as on round 1 (all PASS), because the text is byte-identical.
