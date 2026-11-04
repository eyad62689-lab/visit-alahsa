Method: node script diffed strings of 07-judge.r1.json and 07-judge.r2.json (16 of 25 keys differ; the 9 others, incl. all dd.* keys, are identical); sentence-level diff printed, each new sentence read against pack.json en, the arbiter where a fact was in doubt, DN1-DN16 (r1 + r2 rulings), ref.cards / ref.stayDining / ref.places and termbase; a pattern sweep over all 25 strings for the retired forms (kahve evi, bu listeden/bu listedeki, sıradan, üzerinden tanıtır, barındır*, Bağlantılar sayfası, yokluğun kanıtı, özenle döşenmiş, rafine bir çizgide, incelikli bir üslup, iyi donatılmış, et suları, double spaces, straight double quotes) found none; a comma scan of every sentence-initial clause checked against DN16.

## Defects (2)

1. db.greasy-fingers.body, sentence 7 («Bu, başka şubesi olmadığı anlamına gelmez; bu yüzden durumu olduğu gibi belirtiyoruz.»). DN12 (not superseded) fixes the second half as «bu yüzden yalnızca bulamadığımızı belirtiyoruz», which states the exact limit of the claim (we only report that we found nothing). r2 replaced it with the vaguer «durumu olduğu gibi belirtiyoruz», which no longer says what is stated and drops the first-person limit the brief demands. The «Bu,» comma is correct (pronoun-subject exception) and stays. Fix:
   «Bu, başka şubesi olmadığı anlamına gelmez; bu yüzden yalnızca bulamadığımızı belirtiyoruz.»

2. db.greasy-fingers.body, last sentence («… restoran ve kafe listemizdeki yerler arasında modern ve hızlı seçenektir.»). DN3 says the index is named once per body, and the same body already says «restoran ve kafe listemizdeki Al Hawy ve Khunaina» two sentences earlier; the second full naming is a repetition (r2 changed this sentence only to restore the list referent, so the repetition is new). Fix (shorter back-reference, keeps the list referent, no «bu liste»):
   «Greasy Fingers, eski Hüfuf'un geleneksel restoranlarından farklı olarak, listemizdeki yerler arasında modern ve hızlı seçenektir.»

## Sound

- db.baithana.body: «Bethanah Chalet kendi sosyal medya hesabı olan ayrı bir işletmedir» sound; no comma after the plain subject before a lowercase word (DN16); «sosyal medya» is the DN4 gloss of «account», not a platform added.
- db.dar-basma.body: «Ev karakterini …» comma gone correctly; «çorbalar» for «broths» sound (no «et» added); «Dar Basma, Hüfuf'un» is the name+capitalised exception.
- db.7st.body: rebuilt sentence «Kafe böylece eski şehri yürüyerek gezenlerin güzergâhı üzerinde kalır» keeps the meaning (within the walking circuit) with an unambiguous subject; «Kafe, El-Ahsa'daki» and «El-Kut, Kasr İbrahim'i» are kept by the exception.
- db.alhawi.body: «“el-havi” bir», «sözcük ziyaret» commas correctly dropped; «Al Hawy, El-Halidiye'deki konumuyla … aynı mahallededir» keeps the name+capitalised comma, same facts as the English.
- db.dar-huwaija.body: grandmother/grandchild logic corrected (grandmothers are the subject); the shipping sentence now follows the English (a visit is one way, not the only one); «Dar Huwaija, Hüfuf'taki» kept by the exception.
- db.alsayed.body: «Girişi tarihî …» comma dropped; «Duvarlarda … köşeler vardır» and «Kafe … bir araya getirir» keep the English facts; the Commission name «Suudi Turizm ve Eski Eserler Kurumunun» is the distinct older-name string the brief asks for; «Ukayr Limanı'nın» bound by ref.places.
- db.sinyar.body: three senses and their order preserved; «kullanılır» repetition reduced without changing meaning; «Arap Körfezi Yolu» bound.
- db.ratio-alkoot.body: «ortasında kuruldu» is a fair rendering of «launched from the middle of the oasis city»; «adını verdiği fikrin hayata geçirilmiş ilk örneği» correct; «Oturma alanları El-Ahsa'daki» comma rightly absent (common-noun subject).
- db.lava.body: «iki adın … yan yana görülmesinin nedeni budur» sound; «Sinyar ve Raslan da yer alır» keeps the names byte-identical to the cards.
- db.soulaf.body: «sulaf ve sulafe bir şeyin …» comma dropped; «öbürü» replaced by «diğeri» (register only); facts unchanged.
- db.ammo.body: «özenli bir binada yer alır» matches DN15 exactly; no retired form left.
- db.baking-up.body: DN9-r2 clause applied word for word (trEAT/eat, butter/better); quote byte-identical; commas dropped correctly (digit follows); «ürünlerini ve tatlıları» sound.
- db.dot-bakery.body: DN9-r2 clause applied word for word («Cümle kabaca “şüphedeyseniz, Dot” demektir; oyun “doubt” (şüphe) …»); quote «when in doubt, Dot» byte-identical; «Dot Bakery & Café» equals the card name; «Fırının kendi listesine göre … üç şubesi vardır» matches «lists three branches».
- db.sharq-alqaisariah.body: two commas dropped correctly («bu şube» and «Mutfak» are not names); all dishes and facts unchanged.
- db.koud.body: «özenli bir tarzda hazırlanmış çeşitli yemekler» matches DN15; «Burada bir süredir kullanılan Koud yazımı …» comma dropped, meaning intact.
