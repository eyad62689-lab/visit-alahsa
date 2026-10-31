# Proofread of the judge's round-2 edits — tr-map-plan-1

Scope: the 14 `changes` of `07-judge.r2.json` (before = `07-judge.r1.json`), checked against `pack.json` (en, ar, ctx), the r2 rulings M1-r2 … M15-r2, the carried r1 rulings, `ref.json` (ui, home, places), the termbase and the r2 `termbase_additions`; then a script pass over all 101 strings.

**13 SOUND · 0 FAULT · 1 NOTE**

## Per key

- `ui.plan.lead` — «Seçtiğiniz gezilecek yerler bu cihaza kaydedilir. Listenizi düzenleyin ve rotanızı oluşturun.» — **SOUND**
  Both facts kept (saved on this device; arrange and get a route). M1-r2 applied: «hazır» gone, verb «oluşturun» = approved `saved.build` «Bu yerlerden rota oluşturun». siz forms, final stop on a paragraph. Loss «ready-made» is recorded by the judge.

- `ui.plan.empty.d` — «Gezilecek yerlere göz atın ve gitmek istediğiniz her yerin sayfasındaki “Bu yeri kaydedin” düğmesine basın. Kaydettiğiniz yerler burada toplanır; ardından rotanızı oluşturun.» — **NOTE**
  M7-r2 removes the «yerlerde» = "when you are there" misreading; quoted name byte-identical to `fav.add`, “…” quotes, «basın» per M7. Point for the judge, not a fault: the labelled button is on every landmark page (DetailView) but also in the map popup (MapView `favAdd`), and the attractions grid carries the same action as a corner «+» icon (aria-label «Bu yeri kaydedin»). «her yerin sayfasındaki» is true but narrower than the English «click or tap “Save this place”» — the visitor who saves from the grid or the map is not wrong, only not told. Acceptable as is; no change needed unless the judge wants the location left open (e.g. drop «her yerin sayfasındaki» and keep «… gitmek istediğiniz yerler için “Bu yeri kaydedin” düğmesine basın»).

- `pt.ctaD` — «Gezilecek yerlere göz atın, beğendiklerinizi “Kayıtlı yerlerim” listenize ekleyin, ardından Google Haritalar'da rotanızı oluşturun.» — **SOUND**
  One sentence with a stop as ctx asks; “Kayıtlı yerlerim” byte-identical to `nav.myTrip`; «Google Haritalar'da» apostrophe U+0027, suffix -da correct. M1-r2 removes the second «hazır» under «Hazır mısınız?» (pt.ctaH).

- `pt.getThere.2.d` — «Riyad–Dammam demir yolu hattının Hüfuf'ta bir istasyonu vardır; hattı Suudi Arabistan Demiryolları işletir. … Tren ayrıca aynı hat üzerinde, yakındaki Abkayk'ta (Bukayk olarak da bilinir) durur. …» — **SOUND**
  M2-r2 applied: company byte-identical to the termbase addition, no «(SAR)», so «SAR» on the page is only the currency (practical.3.v, faq.2.a). Durations in words as the English («iki saat on dakika», «bir ila bir buçuk saat»); Abkayk/Bukayk per M17; nothing else moved.

- `pt.faq.7.a` — «Biletinizi Suudi Arabistan Demiryolları üzerinden alabilirsiniz: şirketin resmî uygulamasından, sar.com.sa sitesinden ya da istasyonlardaki bilet gişelerinden. Hat Riyad'ı Hüfuf'a ve Dammam'a bağlar; tatillerde ve yoğun sezonlarda biletinizi erken alın.» — **SOUND**
  Stands alone (JSON-LD); «sar.com.sa» byte-identical; app, site, counters, the early-booking advice all kept. Consistent with faq.5.a and faq.6.a, which already name the company in full without the acronym.

- `pt.practical.0.v` — «El-Ahsa'ya yıl boyu gidilebilir. Hava ekimden marta kadar en ılıman hâlindedir; yaz ise vahanın bereketli mevsimidir ve akşamları keyiflidir.» — **SOUND**
  M11-r2: whose bounty is now said (the oasis) with no fruit added; months lower case. «akşamları keyiflidir» reads either "its evenings are pleasant" or "it is pleasant in the evenings" — both carry «evening experiences» without a new claim.

- `pt.tips.1.d` — «Yaz taze meyvelerin tadını çıkarmaya, kış ise gezilecek yerleri ve bölgenin tarihini tanımaya uygundur.» — **SOUND**
  M13-r2: the genitive «bölgenin» makes «tarihini» unambiguously the noun; the two halves stay balanced (ctx). «bölgenin» is the minimal specifier, not a new fact.

- `pt.faq.0.a` — «Kesinlikle. … Tarih, doğa ve konukseverliğin buluştuğu El-Ahsa, ailelere uygun bir yöredir.» — **SOUND**
  M13-r2/M14-r2: the closing clause can no longer open as the adjective «tarihî»; the group genitive on the last coordinate is standard Turkish. The unmotivated «de» is gone. C15 «dünyanın en büyük vahası», «Guinness Dünya Rekorları, 2020», «UNESCO Dünya Mirası alanı (2018)» and all landmark names unchanged and byte-identical to `ref.places`.

- `pt.faq.10.a` — «… El-Ahsa kırmızı pirinci ve haris, balalit, hurma ekmeği (kırmızı ekmek olarak da bilinir) gibi yöresel yemekler de buranın ünlü lezzetleri arasındadır. Vahanın meyveleri arasında El-Ahsa inciri, misket limonu (lomi), kanar (sidr ağacının meyvesi) ve “Suvari” narı vardır. …» — **SOUND**
  «ile» → «ve» removes the "rice with harees" reading and follows the English shape «red rice and folk dishes such as …». M15-r2 quotes are “…” (U+201C/U+201D), spelling from السواري unchanged, Halas unquoted per the ruling. Dish names byte-identical with faq.12.a (El-Ahsa kırmızı pirinci, haris, balalit, hurma ekmeği); termbase forms Halas, misket limonu, sırma, El-Ahsa bişti intact.

- `ui.map.lead.a` — «Bu haritada vahadaki {n} gezilecek yeri bulabilirsiniz. Arama yapın ya da bir kategori seçin; ardından listeden veya haritadan bir yerin bilgi kartını açın.» — **SOUND**
  {n} once, before its noun (M3 sentence unchanged); «Arama yapın» cannot be read as "call"; H6 «açın» for mouse and touch alike; «bilgi kartı» = the popup (ctx «its card»). The first sentence still carries the count for the meta description.

- `ui.map.pop.view` — «Sayfasına gidin →» — **SOUND**
  Link, polite-plural imperative, no stop, the approved arrow «→» (`ref.home arrow`). The possessive points at the place named in the popup header above the link — the source's «View page» is equally context-bound.

- `pt.getThere.0.d` — «… Bu havalimanı arabayla yaklaşık iki saat uzaklıktadır ve daha fazla uçuş bağlantısı sunar.» — **SOUND**
  «wider connections» rendered as what it means for an airport; termbase airport names and apostrophes unchanged; «yaklaşık iki saat» in words as the English.

- `pt.faq.1.a` — «El-Ahsa'da öne çıkan yerler şunlardır: Cebel el-Kare (mağaraları ve “Medeniyetler Diyarı” miras köyüyle), tarihî Kasr İbrahim, … Müberrez'deki Sahud Sarayı (Kasr Sahud). Tam liste için “Gezilecek yerler” sayfasına göz atın; listedeki yerleri “Kayıtlı yerlerim” listenize ekleyebilirsiniz.» — **SOUND**
  Name first, its attributes in brackets, matching the Cüvasa Camii bracket in the same list; nothing added or lost. «Medeniyetler Diyarı», «Gezilecek yerler», «Kayıtlı yerlerim» byte-identical and in “…”; «tarihî» with circumflex; Sahud Sarayı (Kasr Sahud) per A1-Sahud.

- `pt.faq.4.a` — «… Yaz ise taze hurmanın, keyifli akşamların ve parkların mevsimidir. Yılın başlarında bir hurma festivali düzenlenir.» — **SOUND**
  Proof NOTE 3 fixed: summer no longer "brings" the parks; the English's three items kept in order, «fresh dates» from the English (not الرطب); festival still generic, no invented proper name. Parallel with practical.0.v («… mevsimidir»).

## Consistency and script checks

ASCII-only node script reading `07-judge.r2.json`, `07-judge.r1.json`, `ref.json`; all PASS:
- 14 `changes`, 14 unique keys; every `after` === `strings[key]`; every `before` === r1 string; every before ≠ after.
- 101 keys in both rounds; exactly 14 keys differ from r1, all inside `changes`; no key missing.
- All 101 strings: no straight `"`, no U+2019, no «»-guillemets, no double space, no leading/trailing space, no U+00A0, no space before . , : ; ; all NFC. Glyph scan: only Latin, Turkish letters, – — “ ” … → ✓ ↗ ·.
- `{n}` occurs exactly once in `ui.map.lead.a`.
- `ui.plan.savedTwo` === `ui.plan.savedFew` === `ui.plan.savedSuffix`.
- Dish names (El-Ahsa kırmızı pirinci, haris, balalit, hurma ekmeği) present byte-identical in both `pt.faq.10.a` and `pt.faq.12.a`; fruit and craft names occur only in 10.a.
- `pt.ctaBrowse` === `ui.plan.empty.browse` («Gezilecek yerlere göz atın»); `pt.ctaTrip` === «Kayıtlı yerlerim» === `ref.ui nav.myTrip`.
- «hazır bir rota»: absent from all strings (the only «Hazır» left is the approved M16 heading `pt.ctaH`). «Demiryolları (SAR)»: absent. «SAR» occurs only in `pt.practical.3.v` («Suudi riyali (SAR)») and `pt.faq.2.a` («50 SAR'dır») — the currency only.
- Visit-card facts untouched: `pt.faq.2.a` (08.00–23.00, 50 SAR) and `pt.faq.3.a` (08.00–12.00, 15.30–22.00, Cuma günleri yalnızca akşam, giriş ücretsiz) unchanged from r1.
- Checker re-run: `verify.mjs tr-map-plan-1 07-judge.r2.json --prev 07-judge.r1.json` → `RESULT [OK] 0 findings`.
