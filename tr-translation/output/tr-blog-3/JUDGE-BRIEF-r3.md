# Judge brief — batch `tr-blog-3`, round 3 (closing round)

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r2.json`; write
`stages\07-judge.r3.json` (round 3, `changes` = every edit vs r2), checker with `--prev` set to 07-judge.r2.json.

Evidence:
- the independent proof of round 2 `BATCH\stages\05d-proof-of-judge-r2.md` (0 serious, 7 minor — apply or rule each);
- the third blind reader `BATCH\stages\06-blind-reader.on-r2.md` (143 items: page 1 = lime 62, page 2 = Tarafa 81; cite
  P3.<page>.<n>). Rule all of them in one line each. Most repeat classes you ruled in r1/r2 (cite the ruling): a
  `source_defect` item stays one however many readers raise it.

## The threshold
**Three readers on the same Turkish (not source) item = fix** (the line's rule). Go through your r1 and r2 rulings
with verdict `rejected` and find every one the third reader raises again on the same Turkish: each of those is now a fix
unless it is the English's own wording (then re-rule it `source_defect` and say which English sentence). Candidates
that have now had three readers: «Hecer» read as Hacer (P1.2.4, P2.2.1, P3.2.1?), «Hint Denizi» (BL3-quote-sea — a
quotation keeps its words; if three readers stumble, weigh a minimal Turkish that keeps the quote: e.g. the quote
unchanged and nothing added; record), «kasaba», «sahife», the abbreviations, «sınıf», «tenezzül» (P3.2.35 — r2's own
fix: weigh a plainer verb that keeps «held himself above»). Name them in `notes`.

**BL3-name-r2 held**: the third reader read «ibn» as "son of" (P3.2.8, P3.2.10) — no reader misread it as a number or
an initial. Keep it.

## Fix (proof r2)
1. **«Yakut'un kendi zamanında»**: the Arabic «ويذكر أن من عمّرها وحصّنها جعلها … وأنها في زمنه» and the English «records
   that the man who built it up … and that in his own time it was …» leave open whose time (Yaqut's or the builder's).
   Turkish must leave it equally open: the proof's «onun zamanında» or a form with the same ambiguity — do not assert
   either reading. Amend your r2 note on proof S.
2. Proof 2–7: «kamp yeri» (a modern campsite — the English «a camp»: weigh «konaklama yeri» / «oba yeri»; r1 had
   «konak yeri», which the first reader read as a mansion — pick the form neither reader misreads), «bu resmi tamamlar»
   (resmi/resmî homograph — «tabloyu tamamlar» was r1's, the reader called it a cliché but the English says «completes
   the picture»: the English's own idiom stands), the ya'tam line (drop the added «Çeviride … diye verdiğimiz»; restore a
   sentence as close to the English as possible), «Anavatanı:» heading → «Anavatan:» or the English's heading shape,
   «bunu gösterir» → as weak as «as witnessed by», the repeated «çalışma»/«yayımlan-».

## Then
3. New Turkish items of the third reader (not seen before) — fix only a misparse, a wrong-sense word, a broken
   reference or a fragment the English does not have; everything else rule in one line.

This is the closing round: touch only the keys these items need; every other string stays byte-identical. Never retype
an Arabic line; hrefs and structure as the checker holds them. Check every edited string against the English and the
Arabic sentence by sentence. Report back as in r1, with the final scores, and list the items now fixed by the threshold.
