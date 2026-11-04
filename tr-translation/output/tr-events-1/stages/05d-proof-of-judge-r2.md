# Proof of judge round 2 (tr-events-1), 36 changed keys

Method: node scripts in `va-scratch\tr-r1\pj2-pj4.mjs` read pack.json and 07-judge.r2.json. Checks run: the 36 changes equal the r1-to-r2 diff and each `after` equals `strings[key]`; repeated English has one Turkish form across vl/vd/e (no inconsistency found); no U+2019, no NBSP, no double space, no final stop on cells and labels; the old forms (İşlenmiş, Yaratıcı , Plajı Parkı, Miras Füreyci, Beklenen, teyit, Etkileşimli, Halk gösterileri, oturum, civarından) occur nowhere; the renamed events appear only in `e.*.name` (and the three unchanged names in `vl.seoDesc` are byte-identical to `e.*.name`); «Ukayr Sahil Parkı» and «Geleneksel Füreyc mahallesi» occur once each, and no text still says «Ukayr Plajı» or «Dates Festival».

## Defects (3)

1. **vl.nowBadge** «Şimdi tam zamanı» (EN «You are here now», AR «نحن الآن هنا»). It claims more than the English. «Tam zamanı» means «now is exactly the right time», a recommendation or peak claim. The English only says you are standing in the season. The script sets the badge from an approximate season only, so the card can show it while the event is not open. Fix (one edit): «Şu an bu dönemdesiniz» (no sezon, no verdict). Alternative: «Şu an bu zamandayız».
2. **e.kafu-nights.span** «Ramazan gecelerinde geç saatlere kadar» (EN «Extended Ramadan nights», AR «ليالٍ رمضانية ممتدة»). «Geç saatlere kadar» (until late hours) is a time-of-day opening-hours claim that neither source carries, and in a cell labelled «Approximate length» it reads as hours, not length. Fix: «Uzun ramazan geceleri» (adjective for «extended», lower case «ramazan» in running text per D2; cell starts with a capital). Update E1-ramadan-cells-r2.
3. **ui.ev.shopNote** «El-Ahsa Ticaret Odası mağazasında sergiye katılan kuruluşların misket limonu ürünleri, yiyecekleri ve kişisel bakım ürünleri satılır.» (EN «Lomi products, foods and care items from the establishments taking part in the exhibition.»). Minor additions: «El-Ahsa Ticaret Odası» is not in this string (the button next to it already names the store), and «kişisel» is not in «care items» / «مستحضرات عناية». Fix: «Sergiye katılan kuruluşların misket limonu ürünleri, yiyecekleri ve bakım ürünleri satılır.» (the button supplies the store; the verb stays from ctx.)

## Sound (33)

Each checked sentence by sentence against the English, then for grammar, TDK, apostrophes (all U+0027), sentence case.

- vl.eyebrow «Vahanın yıllık etkinlikleri», vd.eyebrow «Vahanın yıllık etkinliklerinden biri»: sound; pair is singular/plural of the same phrase (ruled E1-season-vocab-r2; «yıllık» is the judge's reading of «seasons», acceptable).
- vd.moreH «Diğer etkinlikler»: sound, matches «Tüm etkinlikler».
- vl.lead: sound; «pulses» as «hareketlenir», «in their season» as «kendi zamanında», nothing added or lost, no ambiguous pronoun.
- vl.notice, vl.notes.1.d, vl.notes.2.d: sound. «Yıldan yıla» matches vd.notice and vl.notes.0.d. «Üzerine kuruludur» renders «focused on».
- vl.orderNote: sound; one sentence, no comma after subject. The tail «ardından tarihi en yakın olanlar gelir» restates «nearest to date» and adds no new fact.
- vl.statusL.expected and vd.statusL.expected «Tarihler tahminî»: sound and byte-identical. It states what the ctx gives (expected around the usual time, no official dates) and claims no more than «Expected season». Note: modern TDK sources also give «tahmini» without the circumflex; keep «tahminî» only if the site-wide rule (resmî, tarihî) is meant to cover it. Not a defect.
- vl.statusL.confirmed and vd.statusL.confirmed «Bu yıl kesinleşti»: sound, byte-identical.
- vl.ctaH «Etkinlik ziyaretinizi tam bir geziye dönüştürün»: sound.
- vl.seoTitle, vl.seoDesc: sound; the three event names equal e.bisht.name, e.qaisariyah-nights.name, e.lomi.name byte for byte.
- e.bisht.org «Miras Kurumu (Suudi Arabistan'ın Kültür Bakanlığı)»: sound (termbase ministry).
- e.bisht.acts.2 «Ziyaretçilerin katılabildiği bişt çarşısı», e.kafu-nights.acts.2 «Ziyaretçilerin katılabildiği Kafu mutfağı»: sound per E1-interactive-r2; parallel in both; the lomi intro keeps «etkileşimli» in running text.
- e.creative-ahsa.acts.4 «Folklor gösterileri» now equals e.bisht.acts.3 (same «Folklore» and «Folk» form); «Halk sanatları gösterileri» stays distinct: sound.
- e.kafu-nights.intro: sound. Five sentences against the English: festival, organiser, 2024; verb gloss «ödül ve övgüyle karşılık görmek» carries both halves; Gabka defined with no case suffix; meal on Ramadan nights in the Gulf, popular custom. «Holy» and «Governorate» not carried (ruled). The comma after «Kafu Geceleri» is gone.
- e.dates-festival.name «Hurma Ürünleri Festivali»: sound; matches «Hurma ürünleri stantları»; no other text names the event, so no stale form.
- e.creative-ahsa.name «El-Ahsa Yaratıcılık Festivali»: sound; no other text names it.
- e.creative-ahsa.place «Geleneksel Füreyc mahallesi, El-Ahsa Belediye Kalesi»: sound. «Geleneksel» for «Heritage» parallels «Geleneksel oyunlar»; spelling from the Arabic فريج; «mahallesi» lower case as «Muheyris mahallesi».
- e.uqair-winter.place «Ukayr Sahil Parkı»: sound, uses the «X Sahil Parkı» pattern; «Ukayr Plajı» appears nowhere else.
- e.wafrah-winter.time «Kasım civarında başlar»: sound; «From around» becomes «starts around», no added fact; capital as cell start; sits with «Aralık ayı civarında».
- e.wafrah-winter.org «Özel işletmeciler (El-Ahsa Belediyesinin gözetiminde)»: sound; same shape as e.bisht.org.
- e.lomi.intro: sound; name is the subject, «olarak da bilinir» follows, the comma after «Sergisi» is justified by E1-subject-comma («El-Ahsa'nın» would fuse), «(lomi)» once, five sentences match the English.
- e.lomi.acts.0 «Kurutulmuş misket limonundan yapılan ürünlerin sergileri», e.lomi.acts.4 «Aile buluşmaları», e.lomi.faq.2.a (same «aile buluşmaları»): sound and consistent.
- e.lomi.sec.0.p.1 and e.lomi.faq.1.a «tazesi, suyu ve kurutulmuşu»: sound and the same three forms in both. Note (not an r2 change): sentence 2 of sec.0.p.1 omits «suyunu» that the approved fruits pair has («meyveyi sıkar ve suyunu … saklar»); the English «juice and preserve it» does not carry it, so leave.
- e.lomi.rel.0 «“El-Ahsa'nın mevsim meyveleri” sayfasında El-Ahsa misket limonu»: sound; the page title equals `ref.fruits` `fv.title` byte for byte; «our» dropped by ruling.

## Rulings (…-r2) applied everywhere

All nine r2 rulings are applied in the strings. No «sezon» remains for an event except the ruled run-of-events uses (At Yarışı Sezonu, 2026–2027 sezonu, Uzun bir sezon, Uzun bir kış sezonu, the horse-racing paragraph). «Mevsim» stays for weather seasons. Renamed events are byte-identical wherever they occur. Fixes 1 and 2 above change rulings E1-season-vocab-r2 (badge clause) and E1-ramadan-cells-r2 (length clause).

## Counts

Changed keys 36: sound 33, defect 3 (vl.nowBadge, e.kafu-nights.span, ui.ev.shopNote). Consistency across vl/vd/e: no defect.
