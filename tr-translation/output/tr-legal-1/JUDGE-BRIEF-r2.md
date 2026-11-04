# Judge brief — batch `tr-legal-1`, round 2

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Your input is now your own `stages\07-judge.r1.json`;
write `stages\07-judge.r2.json` (round 2, `changes` = every edit vs 07-judge.r1.json) and run the checker with
`--prev` set to 07-judge.r1.json.

New evidence, both produced on the page as built from your r1 text:
1. **Independent proof of your r1 edits** — `BATCH\stages\05d-proof-of-judge.md` (9 findings; cite as Q<n>). Rule
   each: fix or reject with the English/Arabic evidence. The three heaviest: Q on `legal.sec.4.sub.2.after.0` (the
   reporter is now told the outcome only if the claim is proven — the English and Arabic notify in every case),
   `legal.sec.2.sub.1.list.3` («erişimde yaşanan» now scopes the faults and errors too), `legal.sec.0.lead` («en büyük
   önemi veriyoruz» — accusative on the light-verb noun).
2. **A fresh blind reader** — `BATCH\stages\06-blind-reader.on-r1.md` (95 items; cite as P2.<n>). Most repeat
   content the r1 brief already classed as `source_defect` (retention period, vague periods, operators unnamed,
   anonymity, overlap of sections 2 and 5, «serious» reports, the mascot, «currently», who decides) — rule them by
   reference to your r1 ruling in one line each.

## The three-reader threshold
A point raised by two readers so far is not yet binding, but **a point raised by both readers that is a Turkish
fault, not the source's content, should be fixed now**. Look in particular at:
- **«kendi» after LG1** (P2.27, P2.95, P2.20, P2.67): the reader hears «sitenin kendi …» repeated as a foreign
  filler. LG1's aim was to keep «resmî» off the site's own channels; review whether «kendi» is needed every time or
  whether «sitenin iletişim kanalları» / «sitenin e-posta adresi» already does the job (and «Site kendi kullanımını
  analiz etmek için» → the plain Turkish for «to analyse use of the site»). Revise LG1 with `superseded_by` if you
  change it.
- **The decree date** (P1.5, P2.6, P2.7): two readers read «9/2/1443» as 9 February and «Kanun (M/19) sayılı» as the
  law's number. The binding Hijri ruling fixes the prefix «Hicri»; check whether it also allows the month name for a
  numeric Hijri date in the source (the termbase calibration ruling and the events batch) — rendering the numeric
  date with its month name adds no fact; if the ruling forbids it, recast so the number reads as the decree's.
- **H1 vs footer** (P1.1, P2.1) and **«Al-Ahsa» brand vs «El-Ahsa» place** (P1.2, P2.2, P2.3): two readers each.
  Your LG5 and the brand rule stand; one more reader on either makes it the threshold — record the count in `notes`.
- **Register both ways** (P2.94 overall; bookish: «ifşa», «reşit olmayan», «ileri sürülen», «hukuka uygunluk»;
  brochure: «memnuniyet duyarız», «harekete geçeriz», «tamamen serbestsiniz» (P1.50 and P2.65 — two readers),
  «en büyük önem» (P1.9 and P2.12 — two readers)). Fix the two-reader points; the rest on merit.
- **Two readers on the same sentence**: «sonuç olarak ortaya çıkan zarar» (P1.42 calque → still calque P2.54 — find
  the attested Turkish legal triple, e.g. the terms pages of Turkish sites «doğrudan veya dolaylı zararlar», and keep
  all three of the English), «makul kontrolün dışında» (P1.45, P2.57), «Siteye hangi kaynaktan erişildiği» / «siteye
  erişilen kaynaklar» (P1.11, P2.15, P2.62 — the English «source of access» = the referring source; say it in
  Turkish), «Kullanıcı … göstermeli» person shift (P1.46, P2.59 — follow the English; fix only a Turkish fault),
  the IP formula sentence and «Bu hakların kapsamına» (P1.54, P2.70), «Tüm hakları saklıdır» twice (P1.66, P2.91 —
  source if the English has both).
- **New Turkish faults** worth fixing on merit: P2.4 (four «site» forms in one sentence), P2.8 («kabul ettiğinizi
  onaylamış olursunuz»), P2.25 («bunun dışındadır» antecedent), P2.39, P2.68 (three names for private browsing — check
  the English), P2.71 («işlenmiş görseller»), P2.77–78 (person shift and «Hakkın sahibi» vs «hak sahibi»), P2.82
  («mutlaka … gelmez» read as «necessarily does not» — make the scope of the negation unmistakable), P2.89 (comma).

Every clause, hedge, exception and actor of the English/Arabic stays; nothing is added. One line per item in
`blind_reader_rulings` for all 95 P2 items, and a `proof_rulings` list for Q1–Q9. Report back as in r1.
