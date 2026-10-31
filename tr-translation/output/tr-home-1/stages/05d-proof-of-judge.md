# tr-home-1 — independent proof of the round-1 judge edits (07-judge.r1.json)

Scope: the 16 entries of `changes`, checked against `en` (the `ar` where they diverge), `ctx`, rulings H1–H15,
termbase `terms` / batch rulings (incl. `tr-attr-1` çamur, `tr-trails-1` T1 rota/durak) and the tm.
Result: **13 SOUND · 0 FAULT · 3 NOTE**.

## Per key

- `rail.ch-gate` «Giriş» — SOUND. "The Gate" as the opening chapter; reads bare in the rail and as «01 · Giriş»; pairs with «Kapanış» (07). H1.
- `gate.lead` — SOUND. «kuşaklardır süregelen çarşılar» = "souqs passed down through generations" (the Arabic «أسواق تعاقبت عليها الأجيال», generations following one another, fits it even better than the handed-on verb). Published names unchanged: «Suudi Arabistan'ın Doğu Bölgesi'nde», «El-Ahsa'da». Same phrase as memory.lead (H7).
- `water.lead` — SOUND. «çölün ortasında» keeps "in the heart of the desert" without a second «kalbinde» beside the published Cebel el-Kare summary («Vahanın kalbindeki»). No fact added or lost. H13.
- `ui.fact.unesco.l` «UNESCO Dünya Mirası Listesi'ne alındığı yıl» — NOTE. Correct Turkish (the apostrophe goes before the case suffix on the proper-name compound, U+0027; the 3sg possessive «alındığı» refers to the oasis, implied) and right under «2018»; the year agrees with srcEnd «(2018)». Worth the judge's eye: H2 says the four labels are parallel, but three are now noun phrases and the second («280+ artezyen pınar vahayı sular», not edited) stays a finite clause. That follows the English (also a clause), so it is not a fault. If the judge wants strict parallelism, the only candidate is «vahayı sulayan artezyen pınar», which reads «280+ vahayı sulayan artezyen pınar» with the number away from its noun. My view: keep it as it is.
- `ui.fact.sites.l` «keşfedilecek yer» — SOUND. "sites and destinations" are near-synonyms for one count (Arabic «معلماً ووجهةً»); one noun loses no fact; «yer» is the site's landmark word (nav.attractions «Gezilecek yerler»). It reads «59 keşfedilecek yer»; no final stop; lower case like the other labels.
- `qarah.title` «Cebel el-Kare: Günün saatini siz seçin» — SOUND. The published name is byte-identical; the capital after the colon fits TDK (a full sentence follows), as in gate.title; it ties to qarah.timeLabel «Günün saati». The drag image of "move the day" is gone, but qarah.drag gives it right below. H3.
- `rail.ch-map` «Etkileşimli harita» — SOUND. It makes no live-data claim, does not contradict the aria-label «… sadeleştirilmiş haritası», and avoids nav.map «Harita». Sentence case. H5.
- `map.lead` — SOUND. The hedge «gerçek konumlarında» is kept; «gösterilir» is the plain verb; «Birini açıp inceleyin» fits touch and mouse alike (ctx); «geziniz için kaydedin» uses the approved action fav.add «Bu yeri kaydedin». H6.
- `rail.ch-memory` «Toprağın ve çarşının hafızası» — SOUND. Byte-identical to memory.title (script). "Clay" as earthen building material; no kerpiç. Sentence case, no stop. H8.
- `memory.title` — SOUND (same string; see the note on memory.lead).
- `memory.lead` «Topraktan kaleler, İslam'ın en eski camilerinden bazıları ve kuşaklardır süregelen çarşılar.» — NOTE. Accurate: the hedge «bazıları» stays, and the generations wording is identical to gate.lead. Two points for the judge: (1) the chapter's Kasr İbrahim card prints its published summary «Duvarları çamurdan … bir kale» under «Topraktan kaleler», so one screen uses two words for one material. «toprak» is the broader word (toprak yapı), so the reader is not misled, but the `tr-attr-1` ruling is keyed to the Arabic «الطين», which is also the Arabic here. H8 should go into the termbase batch rulings with its scope stated (English "clay" in an editorial heading or lead → «toprak»; "mud" in factual bodies → «çamur»), so that a later batch does not "correct" it back. (2) "earliest" is rendered «en eski». This was unchanged in this round and is acceptable; «İslam'ın ilk camilerinden bazıları» would sit closer to «من أوائل الإسلام», but it is not required.
- `memory.date.qaisariyah` «İki yüzyıldan fazla» — SOUND. Word for word "Over two centuries"; this is the published body form («geçmişi iki yüzyıldan fazla»); three words, no digits, dotted capital İ, no stop. H12.
- `tip.friends` «Çöl gezilerini sevenler için: Hüfuf'un güneydoğusundaki Cebel el-Erba bir kamp ve gezi noktasıdır.» — NOTE. Accurate and has one person: «Hüfuf'un» follows the termbase vowel u; «Cebel el-Erba» is byte-identical; there is no comma between subject and predicate; «çöl gezilerini sevenler» is tm-verbatim. The point: «gezi» comes twice in one short sentence («gezilerini … gezi noktasıdır»), which was part of the companion#2 complaint about «gezintiye» beside «çöl gezileri». A possible alternative: «… Cebel el-Erba bir kamp ve gezinti noktasıdır.» (This repeats «gezinti» from tip.family, but under a different person-tip.) Or keep it as it is: «gezi noktası» is the published word for destination.
- `finale.lead` «El-Asfar Gölü'nün kumullarından hurma ağaçlarının gölgesine, yolculuğunuz burada başlıyor.» — SOUND. The published name is used with the termbase suffix «Gölü'nün» (ü); «kumul» is the tm word (asfar intro «Kumulların arasında»); the ctx states "sands" = the dunes around the lake. No fact added.
- `saved.build` «Bu yerlerden rota oluşturun» — SOUND. Siz imperative, no stop. The line reads «Kayıtlı yerlerim: 3 Bu yerlerden rota oluşturun» with no clash of persons, and «Bu yerlerden» points back to the label. «rota» agrees with chapter 6's own «Rotanız» (plan.routeTitle), the place the button jumps to. H10.
- `finale.open` «Kayıtlı yerleri açın» — SOUND. It echoes the approved name without the clashing possessive; with the appended count it reads «Kayıtlı yerleri açın (3)»; no Turkish page is promised. H10.

## Consistency and script checks (node, on 07-judge.r1.json vs 05-proofreader.json)

- All 16 `after` values equal `strings[key]`. All 16 `before` values equal the stage-05 strings. No diff from 05 appears outside `changes`.
- In the 16 strings: no straight quote, no U+2018/U+2019, no double space, no edge space. NFC throughout. The apostrophes are U+0027. No final stop on rail/label/badge/button keys.
- The five sources pieces are byte-unchanged from stage 05, edge spaces intact. The assembled line has no double space:
  «Kaynaklar: Guinness Dünya Rekorları, “En büyük vaha” (hurma ağaçları ve pınarlar); Çevre, Su ve Tarım Bakanlığı istatistikleri (hurma ağaçları); UNESCO Dünya Mirası Listesi (2018).»
- The four fact cards as they read:
  - «2,5 milyon+ hurma ağacı — dünyanın en büyük vahası»
  - «280+ artezyen pınar vahayı sular»
  - «2018 UNESCO Dünya Mirası Listesi'ne alındığı yıl»
  - «59 keşfedilecek yer»
- Pairs:
  - rail.ch-memory = memory.title: byte-identical. rail.ch-water = water.title: byte-identical.
  - rail.ch-map «Etkileşimli harita» vs map.svgLabel «El-Ahsa'daki gezilecek yerlerin sadeleştirilmiş haritası»: compatible, with no live claim.
  - gate.lead and memory.lead both carry «kuşaklardır süregelen çarşılar».
  - saved.count «Kayıtlı yerlerim:» = ref.ui nav.myTrip + colon. The buttons «Bu yerlerden rota oluşturun» and «Kayıtlı yerleri açın» carry no possessive against it. plan.kindSaved «Kayıtlı yerlerinizden» (a tag, kept by H10) is the one remaining second-person form; it sits in chapter 6, not on the bar.
- Published names are byte-identical where the edits use them: Suudi Arabistan, Doğu Bölgesi, El-Ahsa, UNESCO Dünya Mirası Listesi, Cebel el-Kare, Cebel el-Erba, Hüfuf, El-Asfar Gölü (ref.places title_tr checked for asfar, arbaa, jabal-al-qarah).
- Not verified: the rendered page (no dist build was looked at). The `07-judge.r1.json.check.txt` file shows no RESULT line from this side.
