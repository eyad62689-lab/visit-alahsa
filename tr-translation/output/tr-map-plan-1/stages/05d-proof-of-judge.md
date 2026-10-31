# tr-map-plan-1 — independent proofread of the judge's round-1 edits

Scope: the 16 `changes` of `stages/07-judge.r1.json` (before = stage 05, after = judge), checked against `pack.json` (en, ar, ctx, unit), rulings M1–M17, `ref.json` (ui, home, places, terms, tm), `glossary/termbase.json` and `memory/tm.json`; plus the batch-wide consistency checks.

**13 SOUND · 0 FAULT · 3 NOTE**

## Per key

- `ui.map.lead.a` — «Bu haritada vahadaki {n} gezilecek yeri bulabilirsiniz. Arayın ya da bir kategori seçin, sonra kartını görmek istediğiniz yeri listeden veya haritadan açın.» — **SOUND**
  M3 shape: {n} directly before its noun («59 gezilecek yeri», singular accusative after a numeral, correct), the frame word «gezilecek yer», no «yer almak». «açın» is input-neutral as H6 rules for «click or tap». Two sentences work as the meta description (M3 supersedes the ctx's «one sentence»).
- `ui.map.locate` — «Konumunuzu haritada görüntüleyin» — **SOUND**
  UI1-controls names «Haritada görüntüleyin» as the action form; siz possessive agrees with the same button's error line «Konumunuz belirlenemedi — …». True to the code: MapView puts a marker on the map (`showMe`) and re-sorts the list. No final stop. The button is an `aria-pressed` toggle, and an imperative label still reads correctly when pressed. `ui.ts` uses the key only in MapView.
- `ui.plan.lead` — «Seçtiğiniz gezilecek yerler bu cihaza kaydedilir. Listenizi düzenleyin ve hazır bir rota oluşturun.» — **SOUND**
  Both English facts are kept. «kaydedilir» says what the page does, «düzenleyin» promises no sort control (PlanView has remove buttons only), and M1's «hazır bir rota oluşturun» matches the approved saved.build verb. «hazır … oluşturun» is a slight paradox but idiomatic for a one-click route; the M1 ruling applies.
- `ui.plan.empty.d` — «Gezilecek yerlere göz atın ve gitmek istediğiniz yerlerde “Bu yeri kaydedin” düğmesine basın. Kaydettiğiniz yerler burada toplanır; ardından hazır bir rota oluşturun.» — **NOTE**
  Correct otherwise: fav.add is quoted byte-identical in “…”, the verb is M7's «düğmesine basın», the purpose clause is split out, and the verb follows M1. The point: the locative «gitmek istediğiniz yerlerde … basın» can be read as «press it when you are at the places» (physically there) instead of «on those places' pages». Suggested: «… ve gitmek istediğiniz her yer için “Bu yeri kaydedin” düğmesine basın.» This is not a fault, and the fresh blind reader can decide.
- `ui.plan.waText` — «El-Ahsa için kaydettiğim yerler:» — **SOUND**
  M8 holds: this is the visitor's own message, so «kayıtlı» (read as «officially registered») is avoided. «için» matches the de precedent and no purpose is added. The colon is kept for the URL line, and the first person fits a message the visitor sends.
- `pt.getThere.2.d` — «… Tren ayrıca aynı hat üzerinde, yakındaki Abkayk'ta (Bukayk olarak da bilinir) durur. Başkent Riyad'dan ve Suudi Arabistan'ın Doğu Bölgesi'nden gelenler için tren çok iyi bir seçimdir.» — **SOUND**
  M10: explicit subject «tren», and «seçim» avoids a third «seçenek». M17: «Abkayk'ta» matches the termbase suffix (k → -ta, TDK). The company bracket «(SAR)» stays because the English brackets it (M2). Doğu Bölgesi has its first-mention «Suudi Arabistan'ın» (A4). Durations are in words, as the English.
- `pt.practical.0.v` — «El-Ahsa'ya yıl boyu gidilebilir. Hava ekimden marta kadar en ılıman hâlindedir; yaz ise bereket ve keyifli akşamlar mevsimidir.» — **SOUND**
  M11: a region is not «gezi noktası» (the tm pair is Cebel el-Kare's). The months are lowercase, «bereket» renders «bounty», and «keyifli akşamlar» replaces the calque without adding an activity. The opening is identical to pt.faq.4.a (same English).
- `pt.practical.2.v` — «El-Ahsa otantik, konuksever ve muhafazakâr bir yöredir. Mirasını modern ziyaretçi olanaklarıyla buluşturur; ailelere de tek başına seyahat edenlere de uygundur.» — **SOUND**
  M12: El-Ahsa is the subject and carries into the second sentence. All three qualities are kept unsoftened, «muhafazakâr» has the TDK circumflex, and «yöre» echoes the label «Yörenin karakteri». «families and solo travellers alike» = «de … de».
- `pt.tips.1.d` — «Yaz taze meyvelerin tadını çıkarmaya, kış ise gezilecek yerleri ve tarihi tanımaya uygundur.» — **SOUND**
  M13: the halves are balanced and one verb covers both. The heading verb «seçin» is not repeated. «tarihi» reads as the accusative of «tarih», helped by the parallel «gezilecek yerleri» and the site's circumflexed adjective «tarihî».
- `pt.faq.0.a` — «Kesinlikle. … El-Ahsa, doğa harikalarını Hüfuf'un hâlâ canlı olan mirasıyla buluşturur. … Kasr İbrahim, El-Kaysariye Çarşısı ve Cüvasa Camii ise bu mirasın örnekleridir. … Tarihi, doğayı ve konukseverliği bir araya getiren El-Ahsa, ailelere de uygun bir yöredir.» — **NOTE**
  M14 is applied correctly: «hâlâ canlı olan miras» replaces «yaşayan miras». The landmark names match ref.places byte for byte, «dünyanın en büyük vahası», Guinness and UNESCO are unchanged, and the digits are 2020 and 2018. Two points:
  (1) The closing sentence opens with «Tarihi,», which a reader first takes as the adjective «tarihî» or «historically» until «doğayı» arrives. It also has the lesson-3 shape (participle subject, then comma, then predicate). Optional: «Tarih, doğa ve konukseverliğin buluştuğu El-Ahsa, ailelere de uygun bir yöredir.»
  (2) The judge's `source_defects` entry for pt.faq.0.a still quotes the old Turkish «Hüfuf'un yaşayan mirası … Cüvasa Camii». Update it to «Hüfuf'un hâlâ canlı olan mirası».
- `pt.faq.4.a` — «El-Ahsa'ya yıl boyu gidilebilir. Hava ekimden marta kadar en ılıman hâlindedir; bu dönem gezilecek yerler ve kaleler için idealdir. Yaz ise taze hurmayı, keyifli akşamları ve parkları getirir. Yılın başlarında bir hurma festivali düzenlenir.» — **NOTE**
  The opening matches practical.0.v, the festival stays generic with no invented name, and «taze hurma» follows the English (logged). The point: «getirir» suits dates and evenings, but «yaz … parkları getirir» reads in Turkish as if summer produced the parks; the zeugma is the English's. Suggested: «Yaz ise taze hurmanın, keyifli akşamların ve parkların mevsimidir.» This keeps all three items and adds nothing.
- `pt.faq.5.a` — «… En hızlı ve en konforlu seçenek, Suudi Arabistan Demiryolları'nın Hüfuf istasyonuna giden trenidir (yaklaşık iki saat on dakika). …» — **SOUND**
  M2: the English has bare «with SAR», so the company is written in full with no acronym and «SAR» cannot be read as money. The suffix «Demiryolları'nın» follows the termbase. Digits 326, 3, 20 and the words «iki saat on dakika» match the English exactly. The airport name matches getThere.0.d.
- `pt.faq.6.a` — «… Suudi Arabistan Demiryolları'nın trenleri ayrıca aynı hat üzerinde, yakındaki Abkayk'ta (Bukayk olarak da bilinir) durur.» — **SOUND**
  M2 (no acronym, matching the English «SAR trains») and M17 (the Abkayk form is byte-identical with the train card; correct for a stand-alone JSON-LD answer). The 150 km and «1,5 saat» figures are unchanged. «aynı hat» has no antecedent in this answer, but that comes from the source and is already logged.
- `pt.faq.10.a` — «El-Ahsa, bölgenin en bilinen çeşidi olan altın renkli Halas hurmasıyla ünlüdür. El-Ahsa kırmızı pirinci ile haris, balalit ve hurma ekmeği (kırmızı ekmek olarak da bilinir) gibi yöresel yemekler de buranın ünlü lezzetleri arasındadır. … El-Kaysariye Çarşısı'nda çömlekler, hurma yaprağından ürünler, tütsüler ve parfümler de bulunur.» — **SOUND**
  M15: «Halas» appears once (termbase), with the hedge carried as the region's. Food names are byte-identical with pt.faq.12.a, and «date bread (also called red bread)» keeps both names in one sentence. The souq attribution is kept (Çarşısı'nda: ı → 'nda). «El-Ahsa bişti» and «sırma» follow the termbase, and «misket limonu (lomi)» is unchanged (P7 open). «X ile Y gibi» may group the rice among the example dishes, which is harmless.
- `pt.ctaH` — «Hazır mısınız? Listenizi oluşturmaya başlayın» — **SOUND**
  M16: «mısınız» is written apart, sentence case after «?», and there is no final stop after the imperative. «Listeniz» is the plan page's own word. The paragraph below also uses «oluşturun», so the verb appears twice in the band; that is acceptable.
- `pt.ctaD` — «Gezilecek yerlere göz atın, beğendiklerinizi “Kayıtlı yerlerim” listenize ekleyin, ardından Google Haritalar'da hazır bir rota oluşturun.» — **SOUND**
  M1 verb. The page name is quoted byte-identical in “…”, and «Google Haritalar'da» follows the termbase and frame. It is one sentence with a stop, and the «Kayıtlı yerlerim» + «listenize» shape matches ui.plan.shared.d.

## Consistency and script checks

Node script (ASCII source, reads 07-judge.r1.json, 05-proofreader.json, pack.json): 56 PASS, 0 FAIL, plus 1 INFO line.
- 101 strings, same key set as pack; 16 changes, unique keys, each a real diff.
- Every `after` == `strings[key]`; every `before` == stage-05 string; no diff from 05 outside `changes`.
- Across all 101 strings, none contains: a straight `"`, U+2019, U+00A0, «», a double space, an edge space, a space before `. , : ;`, an Arabic-Indic digit, or a hyphen in a numeric range. All strings are NFC.
- `{n}` occurs exactly once in ui.map.lead.a; savedTwo = savedFew = savedSuffix («kayıtlı yer»).
- Food names «El-Ahsa kırmızı pirinci», «haris», «balalit», «hurma ekmeği» are present in both pt.faq.10.a and pt.faq.12.a.
- pt.ctaBrowse = ui.plan.empty.browse («Gezilecek yerlere göz atın»); pt.ctaTrip = ui.plan.title = «Kayıtlı yerlerim»; “Bu yeri kaydedin” (empty.d) and “Kayıtlı yerlerim” (ctaD) quoted byte-identical.
- M1: «hazır bir rota oluşturun» in ui.plan.lead, ui.plan.empty.d, pt.ctaD; «rota edin» nowhere.
- M2: «Suudi Arabistan Demiryolları» byte-identical in getThere.2.d, faq.5.a, faq.6.a, faq.7.a. «(SAR)» follows it only in getThere.2.d and faq.7.a, and faq.5.a/faq.6.a have no «SAR». The currency is «Suudi riyali (SAR)» (practical.3.v) and «50 SAR» (faq.2.a). Every SAR occurrence: getThere.2.d, practical.3.v, faq.2.a, faq.7.a.
- Abkayk form «Abkayk'ta (Bukayk olarak da bilinir)» in getThere.2.d and faq.6.a.
- Visit-card facts: faq.2.a «08.00'den 23.00'e» (P10) and faq.3.a «08.00–12.00», «15.30–22.00», «Cuma» are untouched and agree with ref.places.
- Digits of each changed string equal the English's: faq.0.a 2020/2018; faq.5.a 326/3/20; faq.6.a 150/1,5; none elsewhere.
- Only U+0027 is used as an apostrophe in the changed strings. ui.map.locate and pt.ctaH have no final stop; ui.plan.waText ends with «:». No doubled adjacent word. None of «eşsiz/büyüleyici/muhteşem/destinasyon/lokasyon/yaşayan miras» appears.
- Pipeline checker on 07-judge.r1.json with --prev 05: `RESULT [OK] 0 findings`. Running it rewrote the 1-byte `07-judge.r1.json.check.txt` with the same content (one newline).
