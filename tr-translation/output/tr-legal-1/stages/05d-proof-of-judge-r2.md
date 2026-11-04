# Independent proof of the judge's round 2 (`07-judge.r2.json`), batch tr-legal-1

Method: all 37 `changes` compared with `pack.json` en/ar; the 37 `after` texts equal `strings` and the 37 `before` texts equal r1 (no unlogged edit). All 117 strings searched for «kendi», «resmî», «ifşa», «reşit olmayan», «sonuç olarak», «harekete», «ileri sür», «teyit», «yetkisiz/izinsiz». Termbase read: A2-Hijri-date, E1-calendar-case-r4, DN16-r2, VG2, VG4/VG14, P9, M9-print-note.

Checked and correct (not listed as findings): `legal.intro.0` decree sentence (9 Safar 1443 = 16 Sep 2021 by the Umm al-Qura calendar — verified with `Intl islamic-umalqura`: 16/09/2021 = 2/9/1443; month 2 = Safer; the sentence still carries the decree number (M/19), the Hijri and Gregorian dates, the Implementing Regulation in the preceding sentence, and the country name; form matches A2-Hijri-date and E1-calendar-case-r4); `legal.contactPre` still ends with a colon and one space; no «kendi» is left for the site's own channels (the one remaining, `sec.0.sub.2.before.0` «kendi gizlilik politikasına», is Google's own policy, correct); no «ifşa», «reşit olmayan», «sonuç olarak ortaya çıkan», «harekete geçeriz», «ileri sürülen» remain; `sec.1.sub.3.list.0` follows the Arabic (no comma between the verbs) and the divergence from the English comma is recorded in `source_defects` and `owner_questions`.

1. **`legal.sec.2.sub.1.list.3` — the scope fault Q2 was meant to cure is back, and «beyond reasonable control» is weakened.**
   Printed: «Makul ölçüde kontrol edilemeyen, siteye erişimdeki her türlü kesinti, teknik arıza veya yazılım hatası.»
   Problems: (a) both modifiers («kontrol edilemeyen», «siteye erişimdeki») now stand before «her türlü kesinti, teknik arıza veya yazılım hatası», so «siteye erişimdeki» again reads as scoping all three nouns (the exact Q2 fault, moved, not removed). In the English and the Arabic only the interruption is «in access to the site». (b) The comma between two pre-modifiers of one noun phrase is not Turkish punctuation; it makes the first modifier float. (c) «makul ölçüde kontrol edilemeyen» = «not controllable to a reasonable degree», a degree hedge; the source standard is «beyond reasonable control» (control that could reasonably be exercised does not reach it).
   Fix: «Siteye erişimdeki her türlü kesinti ile makul ölçüde kontrol edilemeyen teknik arıza veya yazılım hataları.» (interruption first with its own modifier; the control clause attached to the two nouns it follows in the English; no comma). If the judge wants a sharper standard: «makul kontrolün ötesindeki» was rejected as a calque, so «makul bir kontrolle önlenemeyen» is the alternative.
   Evidence: EN «Any interruption in access to the site, technical failures or software errors beyond reasonable control.» AR «أي انقطاع في الوصول إلى الموقع أو أعطال تقنية أو أخطاء برمجية خارجة عن السيطرة المعقولة.» (the «في الوصول إلى الموقع» is attached to the interruption alone).

2. **`legal.sec.2.sub.1.list.0` — «tali zarar» for «consequential damages» is a weak equivalent.**
   Printed: «… doğan her türlü doğrudan, dolaylı veya tali zarar.»
   «tali» means «secondary / ancillary / subordinate»; it is not a standing Turkish legal term for consequential damage (the usual renderings are «sonuç olarak doğan / sonuçsal zarar», «netice zararı», or «ardıl zarar»; «arızi» = incidental). The judge's own evidence (LG6) is a commercial terms page in which «tali» sits in a four-member series «doğrudan, dolaylı, arızi, tali», i.e. it carries «consequential» only by position, and «dolaylı» and «tali» overlap in everyday sense, so a lay reader (and a court) gets «direct, indirect, indirect» and the third member of the English («consequential») is lost. The Arabic «تبعية» (derivative, ensuing) supports «ensuing damage», not «secondary».
   Fix: «doğrudan, dolaylı veya ardıl zarar» (or, safer and lay-readable, «doğrudan, dolaylı veya sonuç olarak doğan zarar», dropping the heavy «ortaya çıkan»). Update LG6 accordingly. I could not confirm any of these online here; the judge should attest one.
   Evidence: EN «direct, indirect or consequential damages»; AR «أضرار مباشرة أو غير مباشرة أو تبعية».

3. **The qualifier «official / الرسمية» has now vanished from every instance of the site's channels and e-mail (six keys).**
   Keys and printed text: `legal.contactPre` «sitenin e-posta adresi üzerinden»; `legal.sec.0.sub.3.after.0` «sitenin iletişim kanalları üzerinden»; `legal.sec.4.sub.2.before.0` «sitenin iletişim kanalları üzerinden»; `legal.sec.4.sub.3.before.0` «sitenin iletişim kanalları üzerinden»; `legal.sec.5.sub.1.before.0` «sitenin iletişim kanalları üzerinden»; `legal.sec.3.sub.2.list.1` «Google'ın sunduğu tarayıcı eklentisi» (EN «the official … Add-on»).
   Problem: the brief says nothing is dropped, hedged or softened. «official» tells the reporter which channel is authoritative (an infringement notice, a rights request, a licence request); r1 kept it as «kendi», r2 deleted it altogether on the argument that the genitive already makes them the site's. A genitive says whose, not that they are the designated channels. The `source_defects` entry for contactPre does not record the drop, so it is silent.
   Fix (one phrase, no «resmî», no «kendi»): «sitede yayımlanan iletişim kanalları» / «sitede yayımlanan e-posta adresi», for the add-on «Google'ın yayımladığı resmî olmayan…» is wrong, so keep «Google'ın sunduğu» (acceptable, provider-attributed). Alternatively keep r2 and add the drop to `source_defects` and `owner_questions`. The judge must decide; as it stands it is an unrecorded omission against the standing rule.
   Evidence: EN «the site's official email / official channels»; AR «البريد الرسمي للموقع / قنوات الاتصال الرسمية للموقع / قنوات التواصل الرسمية».

4. **`legal.sec.3.sub.1.after.0` — «hedefli reklam» shifts the meaning and brings back the «aimed at visitors» reading.**
   Printed: «Site şu anda ziyaretçilere yönelik hedefli reklam veya pazarlama çerezleri kullanmaz.»
   English/Arabic: advertising or marketing cookies *to target visitors* (purpose of the cookie = profiling visitors). «ziyaretçilere yönelik» again means «directed at visitors» (the very reading P1.48 complained about); «hedefli … pazarlama çerezleri» is also ungrammatical in scope (the adjective «hedefli» has to qualify both nouns, and «hedefli pazarlama çerezi» is not a term).
   Fix: «Site şu anda ziyaretçileri hedeflemeye yönelik reklam veya pazarlama çerezleri kullanmaz.»
   Evidence: EN «advertising or marketing cookies to target visitors»; AR «لاستهداف الزوار».

5. **`legal.sec.0.sub.2.before.0` — the actor of the first sentence is lost (against LG7).**
   Printed: «Sitenin kullanımını analiz etmek için Google'ın sunduğu Google Analytics hizmeti (GA4 sürümü dahil) kullanılır.»
   LG7 (the judge's own ruling) says each sentence keeps the English actor («Site»); the English and Arabic say «The site uses» / «يستخدم الموقع». The agentless passive, with «kullanım … kullanılır» in one line, also reads heavily and lets a reader ask who uses it.
   Fix: «Site, kullanımını analiz etmek için…» was the problem; use «Site, ziyaretlerin analizi için Google'ın sunduğu Google Analytics hizmetini (GA4 sürümü dahil) kullanır.» («to analyse use of the site» → «ziyaretlerin analizi için»; «kullanım» not needed again). No comma needed after «Site» only if DN16-r2 is read strictly; if the judge keeps the fusion comma elsewhere (LG7 «Site, içeriğini…»), omit it here because «ziyaretlerin» does not fuse with «Site».
   Evidence: EN «The site uses Google Analytics … to analyse use of the site»; AR «يستخدم الموقع خدمة Google Analytics … لتحليل استخدام الموقع».

6. **`legal.sec.3.sub.2.list.2` — the label and the body now use different words, and «mod» is dropped.**
   Printed: «Özel gezinme modu: gizli pencere veya özel pencere kullanmak, izleme çerezlerinin cihazınızda saklanmasını sınırlar.»
   The English names two things under one label («using incognito or private mode»); the Turkish now lists two window names where the English gives two *modes*, and the label «Özel gezinme modu» is repeated as «özel pencere» in the body, so the body's second item duplicates the label while «incognito» is the only distinct one. A reader gets «private browsing mode: using a hidden window or a private window».
   Fix (small): «Özel gezinme modu: gizli pencere veya özel gezinme modunu kullanmak, izleme çerezlerinin cihazınızda saklanmasını sınırlar.» (or keep r2 if the judge considers «özel pencere» the Firefox/Safari name; then say so in `notes`). Low; the fix is optional.
   Evidence: EN «Private browsing mode: using incognito or private mode»; AR «وضع التصفح الخاص: يحد استخدام وضع التصفح الخفي أو الخاص».

7. **`legal.closing.0` — comma policy contradicts the judge's own edit in `legal.sec.4.sub.2.after.0`.**
   Printed: «Yetkili bir makam bu hükümlerden herhangi birinin geçersiz veya uygulanamaz olduğuna karar verirse, bu durum diğer hükümlerin…»
   In `sec.4.sub.2.after.0` the judge removed the comma after «kanıtlanırsa» «as on the page's other -sa clauses»; the page's other -sa clauses (`intro.1` «kabul etmiyorsanız lütfen», `sec.0.sub.5.before.0` «öğrenirsek bu verileri») have no comma; `closing.0` is now the only one with it. One comma rule on the page is needed.
   Fix: remove the comma («…karar verirse bu durum diğer hükümlerin…») or add it in all three and in `sec.4.sub.2.after.0`.

8. **`legal.sec.0.sub.4.before.0` / `legal.sec.1.sub.3.list.2` / `legal.sec.4.sub.1.before.0` — «unauthorised» now has two Turkish words.**
   Printed: «yetkisiz erişime, izinsiz açıklanmaya» (same sentence); `sec.1.sub.3.list.2` «yetkisiz erişim»; `sec.4.sub.1` «İzinsiz her kullanım». The English and Arabic use one word (unauthorised / غير المصرح به) for access, disclosure and use. The judge replaced «ifşa» with «izinsiz açıklanma» and thereby put «yetkisiz» and «izinsiz» side by side in one list (the brief's one-term-per-concept rule).
   Fix: «yetkisiz erişime, yetkisiz açıklanmaya» (or «yetkisiz erişim, açıklama, değiştirme veya imha» as a series — «Verileri yetkisiz erişime, açıklanmaya, değiştirilmeye veya imha edilmeye karşı» keeps one «yetkisiz» for the whole series as the English/Arabic series is read); keep «İzinsiz her kullanım» only if the judge records the distinction (permission vs authority) in LG6.

9. **`legal.sec.0.sub.1.list.1` — «Siteyi» adds an object the source does not give.**
   Printed: «Siteyi sürekli geliştirmek için sitenin performansını ölçmek ve ziyaret trafiğini istatistiksel olarak analiz etmek.»
   English «for ongoing development» and Arabic «لأغراض التطوير المستمر» do not say what is developed (site, content, experience; cf. `sec.3.sub.1.list.1` «develop content and improve the experience»). The new text fixes it to the site, and repeats «site» twice in the line.
   Fix: «Sürekli geliştirme amacıyla sitenin performansını ölçmek ve ziyaret trafiğini istatistiksel olarak analiz etmek.»

10. **`legal.sec.1.sub.0.before.0` — «konuyla ilgilenenlere» adds a restriction.**
    Printed: «… ziyaretçilere ve konuyla ilgilenenlere yol gösterici ve kültürel içerik sunmayı hedefler.»
    The English «for visitors and those interested» and the Arabic «للزوار والمهتمين» leave the object of interest open. «Konuyla» limits it to the topic of the page; it is a harmless but real addition in a no-addition document. Fix: «ziyaretçilere ve ilgilenenlere» was rejected because it hung; use «ilgi duyanlara» («ziyaretçilere ve ilgi duyanlara»), which stands without an object.

11. **`legal.sec.2.sub.0.before.0` — «doğrulamalarını» vs the published frame's «teyit».**
    `M9-print-note` (published frame) writes «resmî kanallardan teyit edin» for the same advice (verify with official channels). LG6 now fixes «doğrulamak» for the page, which is internally consistent but breaks "the approved frame binds byte-identically" for the one term «verify … with official bodies». Either record in LG6 that M9 is not an authority for this page (the verb differs from the frame's), or restore «teyit etmelerini» in this key and in `sec.2.sub.2.before.0`. Low.

TOTAL: 11 findings
