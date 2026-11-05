# Judge brief — batch `tr-blog-1`, round 4 (narrow fix)

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r3.json`; write
`stages\07-judge.r4.json` (round 4, `changes` = every edit vs r3), checker with `--prev` set to 07-judge.r3.json.

Evidence:
- the proof of round 3 `BATCH\stages\05d-proof-of-judge-r3.md` (1 minor finding — apply it);
- the fourth blind reader `BATCH\stages\06-blind-reader.on-r3.md` (92 items, cite P4.<page>.<n>). Rule all of them in
  one line each. Most repeat what you have already classed: names and frame («Kare», «Kasr»/kale, «Duğa el-Garaş»,
  «Mulla», «Hüfuf», «AlUla», «bişt», «El-» density, «Beyt», «Abdülaziz»), curly vs straight apostrophes (artifact),
  the hedge and the «çünkü» of the source, the bazaar hours and Friday, Kasr İbrahim's slot on two pages, the pottery
  activity, the museum, distances, the lime farm, climbing, the car FAQ, the FAQ day order, weekly days, «bayramlar»,
  «doğa harikası», «hayatın nabzı», the repeated «not staged» idea, the publication date — all `source_defect` or
  ruled; do not reopen a ruling on one reader.

## Fix (real Turkish faults, most introduced in r3)
1. S1 (proof) and P4.4.15: drop the comma after the plain subject «El-Ahsa» in the «rakibi değil, tamamlayıcısıdır»
   sentence.
2. P4.3.8: «Ardından buradan doğuya ilerleyin» — doubled adverb; keep one, anchored to the quarter as the English is.
3. P4.3.15: «mevsimi … süren yaz dönemidir» is tautological — say the season runs from mid-June to late August
   without «mevsim … dönem» twice; no fact added or dropped.
4. P4.4.17: «Pratik seçenek arabadır» — align with «en pratik» of the other two articles (the English «the practical
   option» / Arabic: check, keep one sense).
5. P4.2.30: «El-Ahsa'ya ulaşım ve şehir içi ulaşım» — the noun repeated; recast (e.g. «El-Ahsa'ya nasıl
   gelineceği ve şehirde nasıl dolaşılacağı») keeping the English's two items.
6. P4.2.8: «Bu geleneksel atölye … kuşaktan kuşağa aktarılır» — it is the workshop/craft the family keeps across
   generations; make the subject what is handed down, as the English says.

## Weigh (one reader; fix only if the Turkish is plainly at fault)
P4.2.22 (the two «bitirin/kapatın» closings of the bazaar section — check the English has both), P4.3.3 (the «için»
fragments of the r3 sentence), P4.3.21 «güzelce noktalar», P4.4.2 «bunun … nedenleri var» (r3), P4.4.13 «kilden
çömlek», P4.4.20 the double «ve», P4.4.21 «bu durumda da» (r3), P4.4.1 «Açık sözlü bir rehber» (second reader after
P3.4.1), P4.3.13 vs P4.4.10 «ilk / en eski sayfalarından» (one form if the English allows), P4.3.20 / P4.4.14 «ilk
limanı» still read as "first you meet" (BL1-port-r2: weigh, add no date), P4.5.1 «Bu yerden söz eden yazılar»
(ui.det.mentions.h — ruled; reopen only on new evidence).

Touch only the keys these items need; every other string stays byte-identical. Check every edited string against the
English and the Arabic sentence by sentence. Report back as in r1, with the final scores.
