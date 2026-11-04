Method: node diff of strings in 05-proofreader.json vs 07-judge.r1.json (20 keys differ: dd.sightsH + 19 bodies; dd.noteP and the rest unchanged); each new Turkish body read sentence by sentence against pack.json en, ar (alsayed checked), DN1-DN14, ref.cards / ref.stayDining / ref.food / ref.places and the judge's termbase_additions; mechanical sweeps over all 25 strings (kahve evi, kahvehane, bu listeden, bu listedeki, sıradan, üzerinden tanıtır, barındırır, Bağlantılar sayfası, yokluğun kanıtı, double spaces, straight double quotes: all zero hits; the only straight quote characters are the apostrophe suffix separators). Rulings DN1-DN14 are applied consistently in every body that carries the item; names match ref.cards byte for byte (Dot Bakery & Café, Al-Koot Heritage Hotel & Restaurant, Ratio Al-Koot, Sharq Restaurant, Al-Sayed Café, Greasy Fingers, 7st Al-Bait). No meaning change, dropped or added fact found, except the one judgement item at the end of defect 2. The only defect class is the comma between subject and predicate (BRIEF lesson 1), which the judge's rewrites introduced or left in many sentences. Not counted: "Otel, El-Ahsa'da ruhsat alan ilk tarihî otel oldu;" in alkoot-hotel (byte-identical to the published stay body, binds), and paired adverbial commas of the type "Lava, Hüfuf'un El-Ulya mahallesinde, Arap Körfezi Yolu üzerinde bir restoran ve kafedir" (bracketed, acceptable).

## Defects (15)

1. db.baithana.body: comma after the subject in the last sentence. "Bethanah Chalet, kendi hesabı olan ayrı bir işletmedir." Fix: "Bethanah Chalet kendi hesabı olan ayrı bir işletmedir."

2. db.dar-basma.body: comma after subject: "Ev, karakterini koruyan çağdaş dokunuşlarla restore edildi." Fix: "Ev karakterini koruyan çağdaş dokunuşlarla restore edildi." Judgement item (optional): "ağır ateşte pişirilmiş et suları" adds "et" that the English "slow-cooked broths" does not say; safer "ağır ateşte pişirilmiş çorbalar".

3. db.7st.body: three subject commas. "Kafe, El-Ahsa'daki iki şubesini kendisi adlandırır:" -> "Kafe El-Ahsa'daki iki şubesini kendisi adlandırır:"; "El-Kut, Kasr İbrahim'i ve El-Cebri Camii'ni içine alır" -> "El-Kut Kasr İbrahim'i ve El-Cebri Camii'ni içine alır"; "Bu konum, kafeyi eski şehrin ..." -> "Bu konum kafeyi eski şehrin yürüyerek gezilen güzergâhına dahil eder."

4. db.alhawi.body: four subject commas. "“el-havi”, bir evin avlusu, yani evin açık hava alanıdır." -> "“el-havi” bir evin avlusu, yani evin açık hava alanıdır."; "bu sözcük, ziyaret anlamındaki “ziyare”den gelir" -> "bu sözcük ziyaret anlamındaki “ziyare”den gelir"; "El-Halidiye'deki konumu, Al Hawy'yi restoran ve kafe listemizdeki ..." -> "El-Halidiye'deki konumu Al Hawy'yi restoran ve kafe listemizdeki Khunaina ve Greasy Fingers ile aynı mahalleye yerleştirir."

5. db.bait-alkoot.body: "Hüfuf'un en eski mahallesi olan El-Kut, Kasr İbrahim'i ve El-Cebri Camii'ni içine alır ..." -> "Hüfuf'un en eski mahallesi olan El-Kut Kasr İbrahim'i ve El-Cebri Camii'ni içine alır ve El-Kaysariye Çarşısı'na kadar uzanır."

6. db.dar-huwaija.body: two subject commas. "yani ziyaret, dükkâna ulaşmanın yollarından yalnızca biridir." -> "yani ziyaret dükkâna ulaşmanın yollarından yalnızca biridir."; "Dar Huwaija, Hüfuf'taki El-Kaysariye Çarşısı'nın kalbindedir ve ..." -> "Dar Huwaija Hüfuf'taki El-Kaysariye Çarşısı'nın kalbindedir ve hem kafe hem el sanatları dükkânıdır."

7. db.alsayed.body: three subject commas. "Al-Sayed Café, Hüfuf'taki tarihî ..." -> "Al-Sayed Café Hüfuf'taki tarihî El-Kaysariye Çarşısı'nın içinde yer alır;"; "Girişi, tarihî Ukayr Limanı'nın kapısı örnek alınarak tasarlandı." -> "Girişi tarihî Ukayr Limanı'nın kapısı örnek alınarak tasarlandı."; "Duvarlar, Hüfuf'un eski mahallelerini ..." -> "Duvarlar Hüfuf'un eski mahallelerini temsil eden köşelere ayrılmıştır:"

8. db.sinyar.body: "Sözcük, bir limanda birlikte demirlemiş çok sayıda gemi için kullanılır." -> "Sözcük bir limanda birlikte demirlemiş çok sayıda gemi için kullanılır."

9. db.ratio-alkoot.body: three commas. "Ratio, El-Ahsa'da doğmuş bir kahve markasıdır:" -> "Ratio El-Ahsa'da doğmuş bir kahve markasıdır:"; "Marka bu şubeyi, “kültürel Ratio” olarak adlandırdığı ..." -> "Marka bu şubeyi “kültürel Ratio” olarak adlandırdığı fikrin faaliyete geçen ilk örneği olarak tanımlar."; "Oturma alanları, El-Ahsa'daki ailelerin ..." -> "Oturma alanları El-Ahsa'daki ailelerin eskiden evlerinin bölümlerine verdiği adları taşır;"

10. db.soulaf.body: "“sulaf” ve “sulafe”, bir şeyin ilk sıkımı, yani en saf ve en iyi kısmı anlamına gelir." -> "“sulaf” ve “sulafe” bir şeyin ilk sıkımı, yani en saf ve en iyi kısmı anlamına gelir."

11. db.baking-up.body: (a) "Baking Up, 2016'da kurulmuş ve merkezi Dammam'da bulunan bir fırın ve pastane markasıdır." -> "Baking Up 2016'da kurulmuş ve merkezi Dammam'da bulunan bir fırın ve pastane markasıdır." (b) ambiguous parse of "fırın ürünleri ve tatlı üreten ve tedarik eden bir şirket" (tatlı singular, reads as one object with the verbs) -> "fırın ürünlerini ve tatlıları üreten ve tedarik eden bir şirket".

12. db.dot-bakery.body: three subject commas. "Dot, 2012'de bir Instagram hesabı olarak başladı." -> "Dot 2012'de bir Instagram hesabı olarak başladı."; "Hesap, El-Ahsa'da bir ev mutfağında ..." -> "Hesap El-Ahsa'da bir ev mutfağında yapılan fırın ürünlerini satıyordu."; "Oyun, “doubt” (şüphe) sözcüğü ile ..." -> "Oyun “doubt” (şüphe) sözcüğü ile Dot adı arasındaki ses benzerliğine dayanır."

13. db.sharq-alqaisariah.body: "bu şube, Ocak 2024'te açılan Diriyye'deki Es-Semhaniye şubesinden önce açıldı." -> "bu şube Ocak 2024'te açılan Diriyye'deki Es-Semhaniye şubesinden önce açıldı."; "Mutfak, El-Ahsa yemeklerini çağdaş bir yorumla sunar." -> "Mutfak El-Ahsa yemeklerini çağdaş bir yorumla sunar."

14. db.karak-raslan.body: "Raslan, Hüfuf'ta Arap Körfezi Yolu üzerinde bir kafedir;" -> "Raslan Hüfuf'ta Arap Körfezi Yolu üzerinde bir kafedir;" and "bu, Arap kahve ibriğinin tanınmış biçimlerinden biridir." -> "bu Arap kahve ibriğinin tanınmış biçimlerinden biridir."

15. db.koud.body: "Burada, bir süredir kullanılan Koud yazımı yerine Code biçimi kullanılır." -> "Burada bir süredir kullanılan Koud yazımı yerine Code biçimi kullanılır." (comma after a locative adverb, same family; trivial).

## Sound

- dd.sightsH: sound (DN10; no suffix on placeholder; works with every DISTRICT_NAMES.tr value including Arap Körfezi Yolu).
- db.greasy-fingers.body: sound (DN3, DN5, DN7, DN12 applied; facts complete; "Greasy Fingers, ... farklı olarak, ... seçenektir" is a paired adverbial).
- db.lava.body: sound (DN3, DN5, DN6; El-Huber, El-Ulya per termbase; Lava Chocolate sentence faithful).
- db.ammo.body: sound (DN4, DN6, DN7; "özenle döşenmiş" = well-appointed, not raised; slogan translated).
- db.alkoot-hotel.body: sound (stay-body sentences byte-identical; supervision kept as supervision; both authority names consistent with the batch trap).
