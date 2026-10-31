# Proof of the judge's round-4 edits — tr-map-plan-1

**Scope.** The 8 `changes` of `07-judge.r4.json` against `07-judge.r3.json` (pt.faq.0.a, pt.faq.10.a, ui.plan.shared.d, pt.practical.0.v, pt.faq.5.a, pt.faq.11.a, pt.practical.1.v, pt.faq.9.a), read against `pack.json` (`en`, `ar`, `ctx`), `ref.json`, the termbase, the tm, the r4 rulings M1-r4 … M8-r4 and the standing rulings they rest on (M2-r2 railway without «(SAR)», M6-r3 dish glosses, M13-r2 «tarihi» shapes, M11-r2 bounty, M4-r3/H10 quoted page name). Independent proofreader; not part of the batch. Role file `prompts/05-proofreader.md`. No file other than this one edited.

**Result: 6 SOUND · 0 FAULT · 2 NOTE**

## Per key

### pt.faq.0.a — SOUND
- English: natural wonders (caves, lake, springs) paired with living heritage in Hofuf (Qasr Ibrahim, Qaisariyah Souq, Jawatha Mosque). The split «… tatlı su pınarları bu harikalar arasındadır. Kasr İbrahim, El-Kaysariye Çarşısı ve Cüvasa Camii ise bu mirasın örnekleridir.» keeps both lists with their correct heads: «bu harikalar» points back to «doğa harikalarını» of the previous sentence, «bu mirasın» to «hâlâ canlı olan mirasıyla». The gapped «doğanın; … ise» is gone. The two sentences are parallel («arasındadır» / «örnekleridir») and «ise» still reads naturally as the contrast opener of the second.
- Names byte-identical with `ref.places` titles: Cebel el-Kare ('nin, U+0027), El-Asfar Gölü, Kasr İbrahim (İ U+0130), El-Kaysariye Çarşısı, Cüvasa Camii. tm phrase «dünyanın en büyük vahası» present; no «hurma»/«doğal» on it (C15). Guinness/UNESCO forms unchanged. Nothing added to the English; «arasındadır» ("among these wonders") matches the English's open list.

### pt.faq.10.a — SOUND
- «El-Ahsa kırmızı pirinci ve yöresel yemekler de buranın ünlü lezzetleri arasındadır. Bu yemeklerden bazıları şunlardır: haris (…), balalit (…) ve hurma ekmeği (…).» — the red rice is no longer read as one of the dishes; «bazıları» carries the English "such as"; the three glosses now stand after the colon, not stacked before a verb. «de» attaches to the coordinated subject ("these too", after the dates of sentence 1) — correct and written apart.
- Glosses identical to r3 (M6-r3), each once: «(buğday ve etle yapılan bir yemek)», «(şehriye tatlısı)», «(kırmızı ekmek olarak da bilinir)» — both bread names in one sentence as the brief requires. Fruit and craft sentences unchanged (Halas, El-Ahsa inciri, misket limonu (lomi), kanar (sidr ağacının meyvesi), “Suvari”, sırma, El-Ahsa bişti, El-Kaysariye Çarşısı'nda).
- faq.12.a unchanged and bare: «El-Ahsa kırmızı pirinci», «balalit», «haris», «hurma ekmeği» byte-identical between the two answers (script-checked). Stands alone as JSON-LD text: first sentence names El-Ahsa, so «buranın» resolves.

### ui.plan.shared.d — SOUND
- «Bu yerlere göz atabilir ya da “Kayıtlı yerlerim” listenize ekleyebilirsiniz.» — the «Listeye … listenize» echo is gone; «bu yerler» = what the shared list holds (English "browse it"); the elided accusative object of «ekleyebilirsiniz» is recoverable and normal Turkish pro-drop. siz forms. “Kayıtlı yerlerim” in U+201C/U+201D, byte-identical with `ref.ui nav.myTrip` and pt.ctaTrip; «listenize» attaches to «liste», so no apostrophe is due. Full stop at end. (Two sentences opening «Bu …» — cosmetic, no change asked.)

### pt.practical.0.v — SOUND
- «yaz ise vahanın bereketli mevsimidir, yaz akşamları da keyiflidir.» — the subject of the second clause is now explicit, so «akşamları» can no longer be read as the adverb "in the evenings" after the subject switch. «vahanın bereketli mevsimi» kept (M11-r2). The repeated «yaz» is the price of the explicit subject and reads naturally; the rejected reader form (dropping the bounty) was correctly not taken. «keyiflidir» for "evening experiences" is the r1–r3 rendering, not a new claim; months lower case («ekimden marta»); no weather claim added.

### pt.faq.5.a — SOUND
- «En hızlı ve en konforlu seçenek trendir: Suudi Arabistan Demiryolları ile Hüfuf istasyonuna yaklaşık iki saat on dakikada ulaşırsınız.» — option first, then company, station and time; the genitive chain is gone. «trendir» correct (-dir after e/consonant). Railway form byte-identical with getThere.2.d, faq.6.a, faq.7.a and the termbase addition «Suudi Arabistan Demiryolları»; no «(SAR)» (M2-r2), so «SAR» on the page remains the currency only; «ile» written apart avoids an apostrophe suffix on the company name.
- Numbers exactly as the source: «326 km», «yaklaşık iki saat on dakika» (words, now with the locative «-da» on «dakika», which the instruction's phrase contains intact), «yaklaşık 3 saat 20 dakika»; digits in the string are exactly 326, 3, 20. Person consistent with the following «gidebilirsiniz … uçabilirsiniz» (siz). «Riyad'a», «Havalimanı'na» U+0027.

### pt.faq.11.a — NOTE
- «kumu elinizle açar açmaz su yüzeye çıkar» — the hand-as-subject calque is gone; the instrumental is plain Turkish; differing subjects across «-ar -maz» are grammatical. Same image, same fact; «hisy» quoted once in “…” and then bare as the defined word; closing tm phrase intact.
- NOTE (no fix required): «kumu açmak» is understandable but a slightly loose collocation for "uncover"; if a later reader stumbles, «kumu elinizle aralar aralamaz» is the closer plain form. Not a fault — keep unless a reader flags it.

### pt.practical.1.v — NOTE
- «Vahanın dört bir yanında modern oteller ve tatil tesisleri var.» — «tatil tesisi» is the plain Turkish class word for a resort and makes no "holiday village / all-inclusive" claim; one treatment with faq.9.a; «tatil köy-» absent from all 101 strings.
- NOTE (ruling attribution, no text fix): the earlier ruling M8-r4 cites is **not a calibration ruling** — it is `_meta.batch_rulings` **A5-words (judge tr-attr-5, 2026-10-28)**, item (4): «turistik bir tesis» kept for «tourist resort», «"tatil köyü" says holiday village, a claim». Its substance is exactly what the judge says (tesis kept, tatil köyü rejected). tm search: "resort" occurs only once in `tm.json` (tuwaither body, «turistik bir tesis»); there is no stay/hotel page in the tm, so no competing rendering exists. Correct the citation to A5-words when the ruling is recorded.

### pt.faq.9.a — SOUND
- «modern oteller ve tatil tesisleri bulunur» — identical noun phrase to practical.1.v (M8-r4); rest of the answer unchanged (neutral, bracketed disclaimer kept in brackets, «Hüfuf'un ve Müberrez'in» U+0027).

## Consistency and script checks
ASCII-only node script (`chk.mjs` in the session scratchpad) reading `07-judge.r3.json`, `07-judge.r4.json`, `ref.json`; Turkish only as \u escapes. **79 checks, 0 FAIL.**
- 101 keys; same key set as r3; 8 `changes`.
- Every `after` = `strings[key]`; every `before` = r3 string; every pair differs; keys differing from r3 = exactly the 8 `changes` (nothing edited outside them).
- All 101 strings: no straight `"`, no U+2019, no U+00A0, no «»; no double or edge spaces; no space before `. , : ;`; all NFC.
- `{n}` exactly once in ui.map.lead.a; savedTwo = savedFew = savedSuffix; pt.ctaBrowse = ui.plan.empty.browse («Gezilecek yerlere göz atın»); pt.ctaTrip = «Kayıtlı yerlerim»; “Kayıtlı yerlerim” quoted in ui.plan.shared.d.
- Absent from all strings: «rota edinin», «hazır bir rota», «rotanızı oluşturun», «Demiryolları (SAR)», «tatil köy».
- faq.5.a: «yaklaşık iki saat on dakika», «326 km», «3 saat 20 dakika», «Suudi Arabistan Demiryolları ile», «El-Ahsa Uluslararası Havalimanı» present; digits = [326, 3, 20]. Railway form present in getThere.2.d, faq.5.a, faq.6.a, faq.7.a.
- faq.0.a: the five names present and each equal to a `ref` title; tm phrase present (also in faq.11.a).
- Dish names in both faq.10.a and faq.12.a; faq.12.a unchanged from r3 and bare (only the dish-list and disclaimer brackets); faq.10.a's five glosses each once and identical to r3.
- faq.2.a and faq.3.a unchanged (visit-card facts).
- «tatil tesisleri» in practical.1.v and faq.9.a.
- `tm_pairs`: 101 pairs, every `tr` = `strings[field]`, all keys covered.
- Every changed string ends with a stop; apostrophe suffixes in the changed strings all U+0027 (Hüfuf'un, Kare'nin, El-Ahsa'da/'ya, Çarşısı'nda, Riyad'a, Havalimanı'na, Müberrez'in).
- Ruling titles «FAQ 6» (faq.5.a) and «FAQ 12» (faq.11.a) use the 1-based answer numbers of `ctx` — consistent, not a key mismatch.
- M1-r4 (route phrase closed, «hazır rotanızı alın» unchanged) involves no edit; the three route strings are unchanged from r3.
