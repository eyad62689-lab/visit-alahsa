# 05d - proofread of the judge's round-1 edits (tr-attr-1)

Scope: the 6 strings the judge edited in `07-judge.r1.json` (17 edits). Checked against `pack.json` (en + arabic_body), the judge's rulings (A1-Ukayr, A1-Müberrez, A1-Kasr İbrahim, A1-Sahud, A1-Cüvasa Camii, A1-El-Emiriye, A1-O1, A1-O2, A1-midnight, A1-collisions), the termbase style_rules and the other 58 strings.

Mechanical checks (all 64 strings of the judge file): the 6 changed keys are exactly the 6 listed in `changes`; each `before` equals the stage-05 text and each `after` equals the `strings` value; the other 58 strings are byte-identical to stage 05. No U+00A0, no U+2019, no straight or guillemet quotes, no space before . , :, no `Ilk`-type case error, no ASCII-stripped Turkish word. Every apostrophe in the 6 strings sits on a proper name (Hüfuf'un, El-Ahsa'nın/'daki, Ukayr'da, Körfezi'nin, İslam'ın/'ı, Medine'deki, Nebevî'den, Müberrez'in, Paşa'nın, Çarşısı'nın, Listesi'ne as part of the UNESCO list name). Name forms are identical across the batch (Hüfuf, El-Ahsa, Arap Körfezi, Kasr İbrahim, Cüvasa Camii, Ukayr, Sahud Sarayı, Müberrez, Hicri 1356 (1937)). Latin digits; clock form P10; each edited body has the paragraph count of its English (one paragraph, no `\n\n`; the English of all five bodies is a single paragraph).

## Per string

### qasr-ibrahim.body - OK
- "Gösterişli bir saray değil, bir kaledir; tek bir surun içinde, nadiren bir arada bulunan yapıları toplamıştır: ..." keeps every fact and the order of the English (not a palace / a fortress / one wall / mosque, barracks, towers, stables, stores). Colon and list intact; "El-Kubbe Camii" and "(İbrahim Sarayı)" unchanged.
- "inşa edilmiştir ... yapılmıştır": both perfect tense, so the tense switch is gone; the list (palm trunks, chandal wood, stone) is untouched and "şandal ağacından (...)" keeps its gloss. Suffix harmony correct throughout.
- Cosmetic only, no change requested: the closing sentence is still the long "hem ... hem de" clause, which is the source's own shape.

### al-uqair.body - OK
- "demir atardı" (past, parallel to "girerdi"), "Ukayr'da" (a-vowel, d after r: correct), "iki nadir manzara buluşuyor: ... kumlar ve ... mavisi" (nominative list, faithful to "two rare scenes meet"), "burada nöbet tutar" (= "guard"; no fact added), "Hem tarihe hem de düşüncelere dalmak için bir yer", "yürürsünüz ... oturursunuz" (person marker on both verbs). All correct Turkish, diacritics and i/İ intact, the spaced em dash is the source's, nothing added or dropped against the English or the Arabic. A singular verb with the two inanimate subjects ("kalıntıları ve eski kale ... tutar") is normal usage.

### jawatha-mosque.body - OK
- "pek az yapıda görülen bir saygınlığa sahiptir" renders "holds a standing few landmarks can match" faithfully; "sahiptir" no longer sits next to a second "taşır" except in its own sentence.
- The rejoined long sentence ("... halkı İslam'ı ilk kabul edenler arasında olan bir vahada yüzyıllar boyunca süren namazları ve toplanmaları gözünüzde canlandırırsınız") parses: the locative "bir vahada" belongs to "süren", and the plural "namazları ve toplanmaları" removes the one-prayer reading. It is long but unambiguous and it is the English single sentence.
- The project sentence now has the English order (project first, then "birlikte" the three mosques) and is byte-identical in names and quotes to faq.4.a (“Prens Muhammed bin Selman Tarihî Camileri Geliştirme Projesi”, El-Calaniye, Şeyh Muhammed bin Ebu Bekir el-Mulla, El-Hubeyş).
- "tarihinin derin köklerine" is the idiom for the source's "a deep root"; no fact change. "Rivayete göre" still covers the Friday-prayer claim, as the English "is said to be" and the Arabic ويُذكر do. Nothing added or dropped.

### jawatha-mosque.faq.0.a - OK
- "Hayır. Camiyi ziyaret etmek ücretsizdir; yandaki parka giriş kişi başı 10–15 SAR." The verbless second clause is grammatical, mirrors the English and the calibration FAQ pattern; en dash U+2013 without spaces; amount unchanged. Bare "SAR" is fine because the card row on the same page gives "Suudi riyali (SAR)" first.

### sahood.body - OK
- "Sahud Sarayı (Kasr Sahud), Müberrez'in kalbinde yükselir:" follows ruling A1-Sahud exactly: the title form first, the English body's own "Qasr Sahood" once in a bracket, spelling from the Arabic (Sahud). "Kasr Sahud" occurs nowhere else in the 64 strings and "Sahud Sarayı" is byte-identical to the title.
- "Kale, Hicri on ikinci yüzyılın sonlarında yapıldı; Ali Paşa'nın seferine karşı El-Ahsa'nın direnişi sırasında yaşanan bazı olaylara tanık oldu." Correct: subject next to its verb, "Ali Paşa'nın" (a-vowel) and "Müberrez'in" (e-vowel) right. "bazı olaylar" for "episodes" (Arabic وقائع) is faithful; no Gregorian year or identity added. Rest unchanged.

### ameeriah.body - OK
- "El-Emiriye Okulu, eski Hüfuf'un doğusunda, En-Naasil mahallesindeki Ümm el-Hubeysi yükseltisinde, El-Kaysariye Çarşısı'nın yakınında bulunur." Same locatives in the same order as the English and Arabic; all suffixes correct (Hüfuf'un, mahallesindeki, yükseltisinde, Çarşısı'nın); the name is byte-identical to the title and to A1-El-Emiriye.
- "Bölgenin evlatları kuşaklar boyunca burada okudu." keeps sons and generations and drops the added quantifier "nice". Hicri forms and the “Beyt es-Sekafe” (Kültür Evi) bracket unchanged.

## Consistency with the other 58 strings
Titles, summaries, area rows, card rows and FAQ answers use the same name forms and wording as the edited bodies (for example "Tek bir surun içinde" in qasr-ibrahim.faq.3.a, "Arap Körfezi", "El-Ahsa Vahası alanı", "Hüfuf'un"). No conflict with any ruling; "Kasr Sahud" is the only new surface form and it is limited to the single bracket the ruling allows.

## Verdict
OK 6 / MANDATORY 0 / OPTIONAL 0 (one cosmetic remark under qasr-ibrahim.body, no change requested).

## Housekeeping note outside the 6 strings (not a string defect)
In `07-judge.r1.json`, `tm_pairs` entry for `jawatha-mosque.body` ends "...bir yapıdan çok bir zaman yolculuğudur..." while the `strings` value (and stage 05) has "...bir yapıyı görmekten çok bir zaman yolculuğudur...". It is the only one of the 64 tm_pairs that differs from `strings`. Whoever appends the TM after the fresh blind read should regenerate the pair from the final `strings` value so the memory does not store a text that never shipped.
