# Proof of the judge's round-3 edits — tr-map-plan-1

Scope: the 8 `changes` of `07-judge.r3.json` against `07-judge.r2.json`, checked against `pack.json` (en/ar/ctx), `ref.json` (ui, home, places), the termbase, the tm, `src/data/dishes.ts`, and the rulings M1-r3 … M8-r3 plus the carried ones.

**6 SOUND · 0 FAULT · 2 NOTE**

## Per key

- `ui.map.filter.aria` — «Gezilecek yerler için kategori filtreleri» — **SOUND**
  A noun phrase naming the role="group" of chips, as M1-r3 rules; it fits ctx ("a short noun phrase or infinitive") and keeps «attractions» and «category» from the English. Sentence case, no final stop. A screen reader announces it as "…, grup", which reads naturally.

- `ui.plan.lead` — «Seçtiğiniz gezilecek yerler bu cihaza kaydedilir. Listenizi düzenleyin ve hazır rotanızı alın.» — **SOUND**
  M2-r3 is applied: «hazır» restores «ready-made», and «alın» is a verb of receiving, so no route builder is promised. «Google Haritalar» is correctly not added, because this English does not name the app. Both facts are kept, with siz imperatives and a closing stop.

- `ui.plan.empty.d` — «Gezilecek yerlere göz atın ve gitmek istediğiniz yerler için “Bu yeri kaydedin” düğmesine basın. Kaydettiğiniz yerler burada toplanır; ardından hazır rotanızı alın.» — **SOUND**
  M3-r3: the button is no longer placed on a page, matching the English (it also appears on the map popup and the index card). «düğmesine basın» follows M7 and is input-neutral for "click or tap". The button name is “Bu yeri kaydedin”, byte-identical to `ref.ui fav.add`. The route clause is identical to ui.plan.lead.

- `pt.ctaD` — «Gezilecek yerlere göz atın, beğendiklerinizi “Kayıtlı yerlerim” listenize ekleyin, ardından Google Haritalar'da hazır rotanızı alın.» — **SOUND**
  This is the only route string with «Google Haritalar'da», because only this English names Google Maps. The suffix is correct (Haritalar'da, U+0027). “Kayıtlı yerlerim” is byte-identical to nav.myTrip. The three imperatives are chained in the English's order. The «Hazır mısınız? … hazır» echo with pt.ctaH comes from the English ("Ready? … ready-made").

- `ui.plan.shared.d` — «Bu liste size bir paylaşım bağlantısıyla ulaştı. Listeye göz atabilir ya da “Kayıtlı yerlerim” listenize ekleyebilirsiniz.» — **SOUND**
  M4-r3: dropping «kendi» is the lightest fix. «listenize» still carries "your own", and the page name stays quoted and byte-identical (H10). In the second clause the accusative object ("it") is left out after the dative «Listeye». This is natural in Turkish and was already in r2.

- `ui.plan.shared.import` — «Listeyi kayıtlı yerlerinize ekleyin» — **SOUND**
  M7-r3: this button and «Kayıtlı yerlerinizi görüntüleyin» (shared.mine) now differ at the first word, as the English pair does ("Add …" / "View …"). «Listeyi» names what ctx says the button adds (the shared list's sights), so no new fact is added. It is a plain lower-case phrase, not the page name, which ctx allows, consistent with shared.mine. Siz imperative, no stop.

- `pt.faq.0.a` — «Kesinlikle. El-Ahsa dünyanın en büyük vahasıdır (Guinness Dünya Rekorları, 2020) ve bir UNESCO Dünya Mirası alanıdır (2018). El-Ahsa, doğa harikalarını Hüfuf'un hâlâ canlı olan mirasıyla buluşturur. Cebel el-Kare'nin mağaraları, El-Asfar Gölü ve tatlı su pınarları doğanın; Kasr İbrahim, El-Kaysariye Çarşısı ve Cüvasa Camii ise bu mirasın örnekleridir. Bunlara hurmalıklar, vaha meyveleri ve kendine özgü yerel mutfak da eklenir. Ailelere uygun bir yöre olan El-Ahsa'da tarih, doğa ve konukseverlik buluşur.» — **NOTE**
  M8-r3 is met: «doğa harikaları» now appears once, and the answer ends on the English's blend. Nominative «tarih» satisfies M13-r2, the tm phrase «dünyanın en büyük vahası» is kept (C15), all five names are byte-identical, the digits are 2020 and 2018 as the source, and the suffixes are right (Kare'nin, Hüfuf'un, El-Ahsa'da). The backward gapping is grammatical, but the shortened first conjunct «… pınarları doğanın [örnekleri]» says only "examples of nature". It no longer says what the previous sentence named, "natural wonders", and it is lopsided against «bu mirasın». Optional fix that keeps the single «doğa harikaları» and the symmetry: «… ve tatlı su pınarları bu harikaların; Kasr İbrahim, El-Kaysariye Çarşısı ve Cüvasa Camii ise bu mirasın örnekleridir.» This is not a fault: the meaning is recoverable and nothing is wrong.

- `pt.faq.10.a` — «El-Ahsa, bölgenin en bilinen çeşidi olan altın renkli Halas hurmasıyla ünlüdür. El-Ahsa kırmızı pirinci ve haris (buğday ve etle yapılan bir yemek), balalit (şehriye tatlısı), hurma ekmeği (kırmızı ekmek olarak da bilinir) gibi yöresel yemekler de buranın ünlü lezzetleri arasındadır. Vahanın meyveleri arasında El-Ahsa inciri, misket limonu (lomi), kanar (sidr ağacının meyvesi) ve “Suvari” nar çeşidi vardır. El sanatlarında sırma işlemeli El-Ahsa bişti (bir erkek pelerini) öne çıkar; El-Kaysariye Çarşısı'nda çömlekler, hurma yaprağından ürünler, tütsüler ve parfümler de bulunur.» — **NOTE**
  **Fence check (M6-r3) passes.** `dishes.ts` describes harees as en "When wheat and meat blend …" / ar «حين يمتزج القمح باللحم», with k "Main dish" / «طبق رئيسي». The gloss «buğday ve etle yapılan bir yemek» says exactly wheat + meat + a dish, and nothing more («dövülmüş» is gone from every string). It describes balaleet as en "Golden vermicelli … sweetened … with date syrup" / ar «شعيريةٌ ذهبية … تتحلّى», with k "Sweet" / «حلى». The gloss «şehriye tatlısı» says vermicelli + sweet, and nothing more. Each name is glossed once, at its first mention. In faq.12.a the four dish names are byte-identical and bare. M5-r3: «“Suvari” nar çeşidi» is quoted with curly quotes, spelled from السواري, and adds nothing beyond the English's "Suwari pomegranate".
  The NOTE: in the dish sentence, three bracketed glosses now come one after another, and there is a second «ve» inside the first gloss. That makes the pre-existing «El-Ahsa kırmızı pirinci ve haris (…), balalit (…), hurma ekmeği (…) gibi …» harder to parse. It is less clear that the red rice stands apart from the «gibi» list, as it does in the English. Optional reshape, with no new content: «El-Ahsa kırmızı pirinci de buranın ünlü lezzetleri arasındadır; haris (buğday ve etle yapılan bir yemek), balalit (şehriye tatlısı) ve hurma ekmeği (kırmızı ekmek olarak da bilinir) gibi yöresel yemekler de öyle.» Alternatively, leave it as it is: it is grammatical, and every fact is correct.

## Consistency and script checks

The node script is ASCII-only: every Turkish literal is a \u escape, and it reads the JSON files from disk. 63 PASS / 0 real FAIL.
- r3 and r2 have the same 101 keys. Every `after` equals `strings[key]`, every `before` equals the r2 string, and every change is a real change. The diff from r2 is exactly the 8 `changes` keys, with nothing outside them.
- Typography: no straight double quotes, no U+2019, no U+00A0, no «» guillemets, no double or edge spaces, and every string is NFC. The only "straight quote" the scan flagged is in `pt.faq.2.a`, which is unchanged: it is the U+0027 suffix apostrophe after digits («08.00'den», «23.00'e», «50 SAR'dır»), as P8 requires. That is a false positive of my letter-only pattern, not a defect.
- Label endings: ui.map.filter.aria and ui.plan.shared.import have no final stop. The prose strings end with «.».
- `{n}` appears exactly once in ui.map.lead.a.
- savedTwo = savedFew = savedSuffix.
- pt.ctaBrowse = ui.plan.empty.browse. pt.ctaTrip = ui.plan.title = ref.ui nav.myTrip «Kayıtlı yerlerim».
- “Bu yeri kaydedin” (= ref.ui fav.add) is quoted byte-identical in ui.plan.empty.d. “Kayıtlı yerlerim” is quoted byte-identical in ui.plan.shared.d, pt.ctaD and pt.faq.1.a.
- The route phrase «hazır rotanızı alın» is in exactly ui.plan.lead, ui.plan.empty.d and pt.ctaD, and closes each of them. «Google Haritalar'da hazır rotanızı alın» appears in pt.ctaD only, and «Google» appears in neither ui.plan.lead nor ui.plan.empty.d.
- Absent from all 101 strings: «rota edinin», «hazır bir rota», «Demiryolları (SAR)», «rotanızı oluşturun».
- «El-Ahsa kırmızı pirinci», «haris», «balalit» and «hurma ekmeği» appear in both faq.10.a and faq.12.a. The glosses are in 10.a only, and 12.a is bare. «Suvari» occurs only in faq.10.a.
- pt.faq.0.a: «dünyanın en büyük vahası» is present, «doğa harikalar-» occurs once, the five landmark names and Hüfuf are byte-identical, and the digits are exactly 2020 and 2018.
- tm_pairs: there are 101 pairs, and every `tm_pairs[i].tr` equals `strings[field]`.
- The termbase and tm have no entries for harees/balaleet/Suwari or for the filter or route phrases. Nothing binding there is contradicted, and the judge's `termbase_additions` (haris, balalit, Suvari narı) match the strings.
