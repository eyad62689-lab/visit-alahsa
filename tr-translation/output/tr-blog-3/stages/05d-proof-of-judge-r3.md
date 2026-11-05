# Independent proof of the judge's round 3 (tr-blog-3)

## Checked clean

All five `changes` entries match the files exactly (`before` equals the r2 string and `after` equals the r3 string for every key). Only five of the 34 strings differ between `07-judge.r2.json` and `07-judge.r3.json`: `hasawi-lomi-history.faq.1.a`, `hasawi-lomi-history.body`, `tarafa-ibn-al-abd.title`, `.description` and `.body`. The other 29 are byte-identical to r2, and no other key was touched.

Checked against the English and the Arabic, sentence by sentence, and found faithful:
- faq.1.a «özel olarak» renders «specifically» / «تحديداً».
- Body of the lime article:
  - «## Anavatan:» follows BL3-homeland.
  - The Nature sentence is now one attribution over both clauses («Sonuçlarına göre … çeşitlendi ve … bağlantılıydı»), as the English «concluded that … linked to» and the Arabic «ارتبط».
  - «bildirilmemiştir» renders «no published … evidence».
  - «buna işaret eder» is as weak as «as witnessed by».
- Tarafa article:
  - Title and description carry «Hecer şehri» at the first mention.
  - The verse gloss «seçiyor» now matches Sources 19, and the dictionary gloss «seçer» matches «يختار» / «chooses».
  - The ya'tam sentence is restored to the English shape, with the added clause gone.
  - «bu tabloyu tamamlar» is the English «completes the picture».
  - The Arabic term «kasabetü Hecer» is followed by the English gloss «yani Hecer'in ana kenti»; line 62 (Abu Ubayda's «قصبة هجر الصفا والمشقر») keeps «ana kenti», as the English «principal town».
  - «adıyla geçer» and «sayar» leave no suffix after a closing quote in this article.
  - Hrefs and structure are unchanged.
- Suffix harmony in the new strings is correct («Havle'nin yurdundan», «onuruna yediremedi», «adıyla geçer», «hevdeçlerini»).

## Findings

1. **Key `hasawi-lomi-history.body` and `hasawi-lomi-history.faq.3.a`** (not in `changes`). Printed text: «Bileşik kökü “badzehr”dir».
   - Why: BL3-quote-suffix says "recast so that no case or copula suffix follows a closing quotation mark". It was applied only to the Tarafa body. The lime unit still has «”dir» in two strings, so the ruling is not applied in every place it applies. The proof and the third blind reader (P3.2.37, P3.2.69) targeted the same shape.
   - Severity: minor.
   - Fix: «Bileşik kökü “badzehr” biçimindedir» or «Kökü “badzehr” sözcüğüdür», in both strings. Both keys are outside r3's edit set, so the fix is a new edit.

2. **Key `tarafa-ibn-al-abd.body`, ya'tam / qasaba paragraph.** Printed text: «“…” Ayrıca şehri imar edip güçlendiren kişinin burayı “kasabetü Hecer”, yani Hecer'in ana kenti yaptığını … kaydeder. … Yakut ayrıca El-Ezheri'nin …»
   - Why: this is the judge's own unreached note. Two «ayrıca» now sit in one paragraph. The English has a single «also», at «He also quotes al-Azhari». The first sentence is joined to the quotation by «and records that». The first «Ayrıca» is the judge's addition, made to give «kaydeder» its subject, and it competes with the real one.
   - Severity: minor.
   - Fix: drop the first «Ayrıca» and write «…tanınmış ve ünlü.” Yakut, şehri imar edip güçlendiren kişinin burayı … yaptığını ve … olduğunu da kaydeder.» Keep «Yakut ayrıca» for al-Azhari.

3. **Key `tarafa-ibn-al-abd.body`, same sentence.** Printed text: «ve onun zamanında El-Ahsa'nın “ünlü, gelişen bir şehir” olduğunu kaydeder»
   - Why: BL3-his-time claims the pronoun keeps it open whose time it is. In Turkish, «onun» after a subject (Yakut) and an intervening third person («şehri imar edip güçlendiren kişi») points to the nearer referent, the builder. A reference back to Yaqut would require «kendi». English «in his own time» and Arabic «في زمنه» are genuinely open, and the Turkish leans one way. The ambiguity is smaller than the source's, and the leaning is toward the builder, not Yaqut.
   - Severity: minor.
   - Fix: restructure so that no nearer male referent intervenes, for example «ve El-Ahsa'nın kendi zamanında “ünlü, gelişen bir şehir” olduğunu». That leans to Yaqut, so «onun zamanında» is arguably the better of the two. If the judge wants it truly open, state it in the ruling as accepted leaning rather than "kept open".

4. **Key `tarafa-ibn-al-abd.body`, opening quotation.** Printed text: «“Burkat Sehmed'de Havle'nin yurdundan kalıntılar var.”»
   - Why: English «ruins of a camp», Arabic «أطلال» (the effaced remains of an encampment). «yurt» in TDK is mostly homeland, home or hostel. Together with «Havle'nin» it reads as "ruins from Khawla's homeland". The nomad camp has gone. The ablative «yurdundan kalıntılar» also makes a vague partitive. «Camp» was the whole point of the r1/r2 discussion («kamp yeri» read as a campsite, «konak yeri» as a mansion). This is a new wrong-sense risk, not a faithful rendering.
   - Severity: minor.
   - Fix: «Burkat Sehmed'de Havle'nin obasının kalıntıları var.» («oba» is the nomad camp in TDK.) If «oba» is rejected, «Havle'nin konakladığı yerden izler var» is the fallback. Do not return to «kamp yeri».

5. **Key `tarafa-ibn-al-abd.body`, governor sentence.** Printed text: «vali onu öldürmeyi onuruna yediremedi ve krala onu öldürmeyeceğini yazdı»
   - Why: English «held himself above killing him», Arabic «تكرّم العامل عن قتله» (refrained out of nobility or generosity). «onuruna yedirememek» idiomatically means that something offends or hurts one's honour and one cannot swallow it. It can be read as the governor's pride being wounded (by the order, or by the idea of killing a relative), not as his nobility. The source says magnanimity, and the Turkish says injured dignity. The facts (he refrained and wrote to the king) are unchanged.
   - Severity: minor.
   - Fix: «vali onu öldürmeyi kendine yakıştıramadı» or «onu öldürmekten kendini alıkoydu; krala onu öldürmeyeceğini yazdı». Either keeps "held himself above" without the wounded-pride reading.

6. **Key `tarafa-ibn-al-abd.body`, verse introduction.** Printed text: «gemilere benzetir» preceded by «develer üzerindeki örtülü oturaklarını, yani hevdeçlerini»
   - Why: the English says only «the camel litters»; «örtülü» is an addition. A hawdaj is usually covered, but the source does not say so, and the rule is not to add. «oturak» in everyday Turkish is also the small seat (potty, child's seat), so the gloss has a comic or wrong-sense risk. The word is plausible as TDK's gloss, but TDK was not checked this round.
   - Severity: minor.
   - Fix: drop «örtülü» («develer üzerindeki oturakları, yani hevdeçleri») or use «yolculuk sedirleri». Better, put the gloss in the shape of the English: «yola çıkan kadınların hevdeçlerini (deve üstündeki taşıma sedirlerini)». The verse and the gloss «hevdeç» in Sources 25 stay.

7. **Key `tarafa-ibn-al-abd.faq.1.q`** (plus the body's first mention, which BL3-hecer-first keeps as «Hecer»). Printed text: «Hecer, Bahreyn ve El-Ahsa arasında nasıl bir ilişki var?»
   - Why: the brief asks for «Hecer şehri» at the first mention of each unit. The judge applied it to the title and description only and kept the body as «Hecer», "explained in the next sentence". That is defensible for the body. The FAQ question is a unit of its own (FAQPage schema, read as a standalone line), and this is where an unprimed reader sees «Hecer» first, with the same «Hacer» risk the three readers recorded (P1.2.4, P2.2.1, P3.2.1). The answer explains it in the same string, so the harm is small.
   - Severity: minor.
   - Fix: optional, «Hecer şehri, Bahreyn ve El-Ahsa arasında nasıl bir ilişki var?». If the judge keeps the ruling, say in BL3-hecer-first that FAQ questions are covered by the "explained in the same string" clause.

No serious findings. No fact or hedge was changed in the five edited strings; no reference was made wrong.

Count: serious 0, minor 7.
