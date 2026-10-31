# tr-attr-12 — proof of the judge's round-2 edits (07-judge.r2.json vs 07-judge.r1.json)

Scope: the 6 edits (4 strings) in `changes`. Checked against pack.json `en`, termbase (A6-r2-subject, A5-r2-historic, P8/P9) and the BRIEF lessons. Script checks (read-only): 50 keys in both files; exactly 4 keys differ (zaki-alsalem-farm.body, palm-village.summary, palm-village.body, palm-village.faq.4.a); the other 46 strings are byte-identical between r1 and r2; each `changes[].before` equals the r1 string and each `after` equals the r2 string.

## R2-E1 — zaki-alsalem-farm.body: «mineral bakımından zengin» -> «mineralce zengin»
EN: "the mineral-rich warm water". Same fact, one collocation swapped for a more ordinary one; nothing added or dropped; «mineralce zengin ılık suda» is grammatical (-CA adverbial/limitative on the noun, then the adjective modifies «ılık su»). Rest of the paragraph untouched (Eryaf Zeki, kükürtlü pınar, hurma yaprağından kulübeler). **SOUND**

## R2-E2 — palm-village.summary: «düzenliyor» -> «düzenler»
EN: "A seasonal destination organised by the Al-Ahsa Development Authority and Al-Ahsa Municipality amid the oasis palm groves: date shops, restaurants, cafés, craft pavilions and a Palm Museum."
(a) Same facts and order: organiser pair, named object (Hurma Köyü), place (hurmalıklar), then the colon list of five items. Only the tense changes; the aorist is the generic present the body already uses («Köyü … düzenler») and makes no claim about "now". Nothing added.
(b) Grammar: subject = «El-Ahsa Geliştirme Kurumu ve El-Ahsa Belediyesi» (nominative, plural agreement not needed with a compound organisational subject, -r singular is the norm); object «Hurma Köyü'nü»; one place complement before the verb; colon followed by a verbless noun list = the shape the brief asks for. U+0027 suffix apostrophe (P8) kept.
(c) Organiser pair present byte-identical in summary, body, practical.1.value, faq.1.a (4/4); «Hurma Ağacı Müzesi» in summary, body, faq.3.a (3/3).
(d) No reorder, no new fact. **SOUND**

## R2-E3 — palm-village.body ¶1: «birkaç duraktan … durakları» -> «birkaç bölümden … bölümleri»
EN: "A visit works as a tour of several stops, so each visitor can pick what suits their interests and their time."
New: «Ziyaret, birkaç bölümden oluşan bir gezidir; her ziyaretçi ilgi alanına ve zamanına uygun bölümleri seçebilir.»
(a) Same two clauses, same order, one noun swapped («durak» read as bus stop by two readers); «bölüm» = part of the visit, so "stops" is carried without a concrete-stop referent. Nothing added or dropped. (b) «birkaç bölümden oluşan bir gezi» and «… uygun bölümleri seçebilir» are grammatical; the subject of the second clause is «her ziyaretçi». (c)/(d) No reorder, no new fact. Note only (not a fault): «bölüm» recurs in ¶2 for the craftspeople's area («zanaatkârlara ve atölyelere ayrılmış bir bölüm»); different referent, no collision. **SOUND**

## R2-E4 — palm-village.body ¶1: «hurma ağaçlarına bakan çiftçileri» -> «hurma ağaçlarının bakımını yapan çiftçileri»
EN: "the farmers who tend it" (it = the palm). «bakımını yapan» = "who look after / tend"; the misreading «bakan» = "looking at" is removed. Grammar: genitive «hurma ağaçlarının» + possessive «bakımını» + «yapan» participle modifying «çiftçileri» (accusative, in the list of three objects of «kutlar»). Same list order: hurma and its products / farmers / crafts woven from its fronds. Nothing added. **SOUND**

## R2-E5 — palm-village.body ¶3: long sentence split into two finite sentences
EN: "Its programme included a Palm Museum on palm and date varieties and their history, an interactive theatre, folk arts, culture houses for arts, literature, crafts and folk heritage, and activities for children."
New: «Programda bir Hurma Ağacı Müzesi yer aldı; müze, … tanıtıyordu. Programda ayrıca etkileşimli bir tiyatro ve halk sanatları vardı. Kültür evleri sanata, edebiyata, el sanatlarına ve halk kültürüne ayrılmıştı; çocuklara yönelik etkinlikler de vardı.»
(a) Item order is the English order (museum, interactive theatre, folk arts, culture houses for arts / literature / crafts / folk heritage, children's activities); no item dropped or added; the culture-house list keeps its four members in order. (b) Each sentence has an overt finite verb (yer aldı / vardı / ayrılmıştı / vardı); «Kültür evleri» is an explicit subject (A6-r2-subject: name the subject, split rather than stack); «ayrılmıştı» (pluperfect-narrative, matching «yer aldı», «tanıtıyordu») is consistent with the paragraph's past frame; «de vardı» after the semicolon coordinates correctly. «Programda» ×3 in the paragraph is mildly repetitive but not wrong, and «ayrıca» marks the continuation. (c) Body still 5 paragraphs (split on blank line = 5); the closing sentence «Bu rakamlar ikinci döneme aittir; tesisler bir dönemden ötekine değişebilir.» and the figures (21/19/5/7, 90.000 m²) unchanged; «Hurma Ağacı Müzesi» unchanged. (d) Lesson 1 (split, don't reorder) applied as written. **SOUND**

## R2-E6 — palm-village.faq.4.a: «ilk dönemi» -> «projenin ilk dönemi»
EN: "The project was inaugurated in December 2024; its first edition opened on 22 April 2025 and the second on 27 January 2026."
New: «Proje Aralık 2024'te başlatıldı; projenin ilk dönemi 22 Nisan 2025'te, ikinci dönemi 27 Ocak 2026'da açıldı.» «projenin» = "its" with an overt genitive, shared by «ikinci dönemi» by ordinary ellipsis (projenin ilk dönemi …, ikinci dönemi …). Dates, month names capitalised (TDK, brief), «dönem» as "edition" consistent with body, galleryTitle, faq.3, cta.note. The repetition «Proje … projenin» is a minor stylistic cost, accepted for the explicit subject. No fact added. **SOUND**

## Byte-identical sets after round 2
- Organiser pair «El-Ahsa Geliştirme Kurumu ve El-Ahsa Belediyesi»: 4/4 (summary, body, practical.1.value, faq.1.a).
- «Hurma Ağacı Müzesi»: 3/3 (summary, body, faq.3.a).
- The four groups «tüccarlar, çiftçiler, zanaatkârlar ve evde üretim yapanlar»: 3/3 (body, faq.2.a, cta.note).
- Women-souq title «Kadınlar Halk Çarşısı» inside all five FAQ questions (faq.0–4.q): 5/5.
- «Teyit bekleniyor» in zaki practical.2.value and palm-village practical.2.value: identical.
- palm-village.body: 5 paragraphs.

## Not a fault, for the record
«halk kültürüne» for "folk heritage" (and Arabic التراث الشعبي) is carried over unchanged from r1; it is not a round-2 edit and is understandable as written.

6 sound, 0 faults
