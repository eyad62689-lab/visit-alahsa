# Judge brief — batch `tr-blog-3`, round 2

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r1.json`; write
`stages\07-judge.r2.json` (round 2, `changes` = every edit vs r1), checker with `--prev` set to 07-judge.r1.json.

Evidence:
- the independent proof of round 1 `BATCH\stages\05d-proof-of-judge.md` (1 serious, 9 minor — apply or rule each, S = serious);
- the second blind reader `BATCH\stages\06-blind-reader.on-r1.md` (79 items: page 1 = lime 36, page 2 = Tarafa 43; cite
  P2.<page>.<n>). Rule all of them in one line each; many repeat classes you ruled in r1 as `source_defect` (name counts,
  the sea route in the opening and FAQ 1, «bin yıl», Hecer/Bahreyn layers, «ağladığı», the unnamed builder, «two seas»,
  Gregorian years) — a second reader on the same source item stays `source_defect`, cite your r1 ruling.

## Fix
1. **Proof S (serious)**: «El-Ahsa'nın kendi zamanında» — the Arabic «في زمنه», the English «in his own time»: it is the
   time of the man (or of Yaqut — read the Arabic sentence and decide whose «ه» it is; the English «his»), never the
   city's. Print exactly what the source says; this also answers your r1 owner question 3 (withdraw it: it is a reading
   of the text, not a fact for the owner).
2. **Proof minor 1–9**: apply or rule each (the monsoon link back inside «the study concluded»; «no published
   archaeobotanical evidence» as qualified as the English; the four parallel items; «farklar da»; «alıp kullandığı» →
   the source's «took»; «tabloyu/yazıyı tamamlar» as the English; the suffix after a closing quote; «Suudi Arabistan'ın
   Kültür Bakanlığı» where the English says only «the Ministry of Culture» — the termbase form may bind the name, weigh
   and record; «içki arkadaşı» one form in body and Sources; «sorusunun aslı» → the English «the truth behind»).

## Weigh — the second reader on your r1 rulings
3. **BL3-name**: the r1 reader stumbled on «b.» (an initial); the r2 reader now reads **«bin» as the number "thousand"**
   (P2.2.2 — «Süfyan bin Sad bin Malik …» = "Sufyan thousand Sad …"), notes that the same word is «İbn» in «İbn
   Kuteybe», and reads «Beni Kays» as «beni» = "me" (P2.2.3). Two readers, two forms, each misread. Decide a form that
   neither reader can misread, attested in Turkish (TDV body text, Turkish editions of the Mu'allaqât, Turkish
   literary histories: e.g. «Tarafe b. el-Abd», «Tarafe İbnü'l-Abd», a lower-case «ibn» chain); weigh whether the long
   genealogy can keep «b.» (a list a reader expects) while the running name takes another form, and whether «Beni
   Kays» → «Benî Kays» / «Kays b. Salebe oğulları». Record the evidence (URLs) in the revised ruling (BL3-name-r2).
4. **Two readers on the same Turkish item** (fix unless the English has it the same way — then `source_defect` and say
   which English sentence): FAQ 3 attributes the letter story to İbn Kuteybe while the body gives it to İbnü'l-Enbari
   (P1.2.49, P2.2.40 — read the English FAQ 3); one letter vs two letters (P2.2.15, P2.2.40 — the English: «each
   carrying a sealed letter»? then the FAQ/intro «bir mektup» drift is yours); «Bahreyn» bare before its gloss
   (P1.2.16, P2.2.42); «Hecer» read as Hacer (P1.2.4, P2.2.1); «kasaba» (P1.2.33, P2.2.25); «sahife» (P2.2.15); «Suriye»
   (P1.2.22, P2.2.17); «Hint Denizi» (P1.2.30, P2.2.23 — your BL3-quote-sea stands unless a third reader); «ya'tam»
   (P1.2.28, P2.2.22 — a transliterated Arabic word the reader cannot place: does the English write «ya'tam»? if yes,
   weigh a minimum like «beyitteki “ya'tam” (yeʿtâm) fiili» — no, add nothing: decide whether the Turkish needs the
   word at all as the English uses it); «Valilik» (P1.2.19, P2.2.14 — the published Turkish name of the governorate in
   termbase?); «fiyal» (P1.2.37, P2.2.31 — the English gloss of the game?); «cemid» (P1.1.25, P2.1.19 — BL2-cemid-r2 and
   the owner question stand: source); the curly vs straight apostrophe (`artifact`).
5. **New Turkish items of the r2 reader** worth a fix: «sorusunun aslı» (P2.1.1 = proof 9), «ilk vatan» (P2.1.10),
   «hemen komşusu» for Oman (P2.1.12 — the English «immediate neighbourhood»?), «kıyısına da Umman'a» (P2.1.15), verbless
   fragments and «taçlanan … tamamlar» (P2.1.18 = proof 3), subject/predicate mismatch «çeşittir … yetişir» (P2.1.28),
   «mevsimi yazdır» read as imperative (P2.1.31), «Gezinizi planlayın sayfamız» (P2.1.32 — the published page name;
   a marker such as «“Gezinizi planlayın” sayfamız» if the line has one in tr-blog-1/2), «geçiş sırası» (P2.1.33 = your
   BL3-sources-intro: the reader read «geçiş» as "transition" — weigh «ilk anıldıkları sıraya göre»), «coğrafi etiket»
   (P2.1.21), «ölümü hicrî 232» awkward (P2.2.5 — weigh «hicrî 232'de öldü» kind), «Önce bulamayacaklarınızla başlayalım»
   (P2.2.33), «yinelenen bir etkinlik» (P2.2.33), «yakıştırmadı» (P2.2.19), «sınıf» (P2.2.8 — your BL3-plain-words; weigh
   «tabaka (sınıf)» only if the English glosses), «obasından kalıntılar» (P2.2.4).

This is a narrow round: touch only the keys these items need; every other string stays byte-identical. Never retype an
Arabic line; hrefs and structure as the checker holds them. Check every edited string against the English and the
Arabic sentence by sentence. Report back as in r1, with the final scores.
