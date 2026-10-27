# 05d — Independent proof of the FINAL text (07-judge.r3, score 90, APPROVE)

Scope: `07-judge.r3.json` → `page` + `frame`, checked against `pack.json` (EN source, AR authority), the binding `calibration_rulings` of r3, `glossary/termbase.json` `_meta.style_rules`, and the eleven-item list in `prompts/05-proofreader.md`. I diffed the text against `05-proofreader.r3.json`. **Only E1–E7 differ** (six body sentences, plus `faq[index 5].a`). No other byte changed in `page` or `frame`.

Result: **must-fix 0 · should-fix 0 · notes 7**

## Findings

| # | Class | Exact quote | Where | Why |
|---|---|---|---|---|
| N1 | note | «Yetişkinler için giriş ücreti 50 Suudi riyali (SAR);» · «Ayrıntılar yukarıdaki ziyaret bilgileri kartında.» · «… izlemek için de uygun bir yer.» | body: hours section, hours section, best-time section | These are nominal sentences with no copula. The finite-predicate scan flags them, which proves the scan works. Zero copula is grammatical Turkish in a journalistic register, so nothing needs fixing. «yukarıdaki» is the source's «above», already logged as a source defect (r3 obs 32). None of these sentences comes from E1–E7. |
| N2 | note | «Onu özel kılan yüksekliği değil, mağaralarıdır.» | body, sentence 3 | After E1, the nearest grammatical subject before «Onu» is «cebel sözcüğü». The possessives «yüksekliği / mağaraları» resolve it to the mountain at once, so it does not misread. Before E1 the structure was the same («adındaki cebel sözcüğü»). The judge ruled on this (r3 obs 5, rejected), so E1 did not introduce it. |
| N3 | note | «Cebel el-Kare, Doğu Vahası'nda yer alır. Doğu Vahası, …» | body lead (E3); FAQ 5 (E4) | The EN/AR body has no «Eastern Oasis». The name is moved from EN FAQ[5] on the same page, and the pre-E3 text already carried it. Moving a fact within a page is allowed (ru P5), and no new fact is added. The lead now has five «vaha» forms (vahanın · Doğu Vahası'nda · Doğu Vahası · El-Ahsa Vahası · vahasıdır). That is a style echo forced by the names, not an error. |
| N4 | note | «Cebel el-Kare, Doğu Vahası'nda yer alır.» | body (E3) | A comma after a two-word subject in a five-word sentence is optional under TDK (emphasis comma). It matches the page's other uses («Mağaralar, Saudipedia'ya göre …»), so it is consistent and correct. |
| N5 | note | «… Cebel el-Kare'deki mağara ziyareti üzerine yazımızı okuyabilirsiniz; … “El-Ahsa'da 48 Saat” yazımıza göz atın.» | body, last sentence (E7) | The two article pointers are treated differently: the first is described, the second is cited as a quoted title (P9). The EN also describes the first («the guide to visiting …»), and «rehber» is avoided on purpose (r2 obs 31). Both forms are acceptable; this is recorded for consistency only. |
| N6 | note | «Suudi Turizm Otoritesi, … 28 uzun geçit bulunduğunu aktarıyor.» | body (E5) | «aktarmak» («relays») for a first-hand authority is slightly weaker than «belirtiyor», which the page uses later. It is idiomatic in the press, and the -iyor reporting tense matches «belirtiyor / tavsiye ediyor». No fault. |
| N7 | note | — | scan design | On the pre-edit `05-proofreader.r3` text, my "mountain IS component" regex fired on «Cebel el-Kare, … bileşeni olan Doğu Vahası'nda yer alır». That is a false positive: the old sentence did place the mountain within the component. On the final text it fires on nothing, and the positive check «Cebel el-Kare, Doğu Vahası'nda yer alır» holds in both the body and FAQ 5. |

## The eleven checklist items

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Letters / dotted–dotless | PASS: **none** | No word starts with an ASCII capital `I` (scan `capI` = []). There are no ASCII-stripped forms (`asciiStripped` = []). «İçindeki» and «El-İd» use U+0130. |
| 2 | Name forms | PASS | All 12 hyphenated names plus «Hüfuf», «Busalih», «Medeniyetler Diyarı», «Saudipedia», «Suudi Turizm Otoritesi», «Doğu Vahası», «Google Haritalar», «Duğa el-Garaş Çömlek Atölyesi» match the termbase byte for byte. No q/j/sh/kh/th appears inside a name: the only hits were the Turkish words «Jeoloji» and «Peyzaj». No bare «Kare», no «Kare/Kara Dağı», no «Cebel … Dağı». No «Bu Salih», «Ebu Salih» or «Busalih mağaraları». |
| 3 | Suffixes | PASS | I checked 33 apostrophe suffixes for vowel harmony, d/t assimilation and the n/y buffer, with numbers read aloud (2023'te «üç», 08.00'den «sekiz», 23.00'e «üç», %10'unu «on», 40°C'yi «derece»). Bad = []. No apostrophe falls on a common noun. «Suudi Turizm Otoritesine» has no apostrophe, per the termbase (TDK institution rule). The particle «mı» is written apart («parçası mı», «bilgi mi»), and «de» meaning "too" is written apart (×5). |
| 4 | Address | PASS | No sen/senin/sana/seni. No capitalised «Siz» mid-sentence. Imperatives are in the polite plural (göz atın, teyit edin, açın, bildirin). |
| 5 | Headings | PASS | The six `##` headings match the EN six, in sentence case (P9), with no gloss and no final stop (`headingStop` = []). Labels and frame strings have no stop. |
| 6 | Termbase compliance | PASS (100 %) | See items 2 and 3. Gloss wording = `termbase_final["Cebel el-Kare"].gloss`, byte-identical after E1. |
| 7 | Punctuation | PASS | U+2019 = 0, U+00A0 = 0, «» = 0, straight `"` = 0, “ ” balanced (difference 0), U+0027 = 33 (positive guard met). Ranges «08.00–23.00» use U+2013 with no spaces. No space before `. , : ;`. |
| 8 | Numbers / clock / currency | PASS | The digit multiset equals the EN multiset after the ruled mappings (8:00→08.00, 11:00→23.00, 1.5→1,5): `01 01 08.00×3 1,5 10 12 20 2016 2018×3 2020 2023×2 23.00×3 28 40 48 50×3`. «Ocak 2018». P10 clock form. «50 Suudi riyali (SAR)» comes first (the body renders before the card), then «50 SAR». |
| 9 | Anglicisms / Ottomanisms / bureaucratic | PASS | Zero hits from the banned lists (lokasyon, destinasyon, spot, must-see, deneyimle-, eşsiz, büyüleyici, kaçırılmaması, ziyaretgâh, «!»). No -mektedir/-maktadır/bulunmaktadır. E7 removed «ziyaretine dair». |
| 10 | Glossing | PASS | «cebel sözcüğü» appears exactly once, in body sentence 2, not in the title, summary or a heading. It explains both halves (P3 r2/r3). |
| 11 | Structure | PASS | Keys of `page` and `frame` are identical to 05-proofreader.r3. FAQ indices 0,1,2,4,5 match the pack. There are 3 practical rows, `{op}` is kept, ↗ is kept, and there is no Markdown (`markdown` = []). |

Site rules: «El-Ahsa dünyanın en büyük vahasıdır» (no hurma/doğal). Warmth goes with winter («kışın ise ılık», «kışın ortasında … hafif bir sıcaklık»), with no night hit. «En-Naka», no «deve». Hours are daily 08.00–23.00. The mountain is placed **within** Component 01: «Cebel el-Kare, Doğu Vahası'nda yer alır» (body and FAQ). The only sentences containing «bileşen» have «Doğu Vahası» as subject. `mountainIsComponent` = [].

## E1–E7

| Edit | Verdict | Check |
|---|---|---|
| E1 «Adını El-Kare köyünden alır; cebel sözcüğü ise Arapçada “dağ” demektir.» | OK | Grammatical, and «ise» contrast is natural. «Arapçada» correctly has no apostrophe (language name). It matches the termbase gloss and the r3 Kare ruling. Same two facts. The naming fact is repeated in History («dağ adını sonuncusundan alır»), which P3 allows. |
| E2 «kışın ise ılık kalır.» | OK | «ılık» carries «gently warm» / دفء هادئ. Warmth stays with winter (C16). Consistent with the summary «kışın ılık». |
| E3 «Cebel el-Kare, Doğu Vahası'nda yer alır. Doğu Vahası, 2018'de UNESCO Dünya Mirası Listesi'ne alınan “El-Ahsa Vahası, Gelişen Kültürel Peyzaj” alanının 01 numaralı bileşenidir.» | OK | The participle attaches to «alan», which is correct: the site was inscribed in 2018, not the component. The mountain is within, not equal to, the component. The site name is byte-identical to the termbase, and 01, 2018 and UNESCO are all kept. «Vahası'nda» is correct harmony. It matches the r3 ruling «UNESCO component sentence (form)» word for word. See N3 and N4. |
| E4 FAQ 5 «Evet. Cebel el-Kare, Doğu Vahası'nda yer alır; Doğu Vahası, 2018'de Dünya Mirası Listesi'ne yazılan … alanının 01 numaralı bileşenidir.» | OK | All the EN FAQ[5] facts are present (within, Component 01, Eastern Oasis, World Heritage List, 2018). Like the EN FAQ, it has no «UNESCO». It is the ruled semicolon form, and «Doğu Vahası» after «;» is capitalised correctly as a proper name. |
| E5 «Suudi Turizm Otoritesi, bu mağaralarda 1,5 kilometre boyunca uzanan 28 uzun geçit bulunduğunu aktarıyor.» | OK | Same source and numbers (1,5 and 28). The «total or each» ambiguity is kept as in the source. The attribution-placement ruling is met: no run of more than two «X'e göre» openers anywhere on the page (the longest run is 2: «Suudi Turizm Otoritesine göre» → «El-Yevm gazetesinin … haberine göre»). See N6. |
| E6 «Mağaralar, Saudipedia'ya göre dışarıda sıcaklık 40°C'yi aştığında bile 20°C civarında kalır.» | OK | Same source and figures. «40°C'yi» is correct (read «dereceyi»). The subject comes first, per the ruling. |
| E7 «Gitmeden önce Cebel el-Kare'deki mağara ziyareti üzerine yazımızı okuyabilirsiniz;» | OK | It points to the same article as the EN, «rehber» is still avoided, «Cebel el-Kare'deki» is correct, and the polite modal is kept. See N5. |

## Scan-bites evidence

Script: `C:/Users/truyr/AppData/Local/Temp/claude/C--Users-truyr-OneDrive-Documents-Claude-Projects-Visit-Alahsa/9a655013-ff34-42d6-85ff-30187f15830c/scratchpad/proof-final-scan.cjs` (run as `node proof-final-scan.cjs stages/07-judge.r3.json pack.json`). The digit baseline is derived from the EN fields of `pack.json`, not typed by hand. Each injection mutates a deep copy in memory only, and nothing was written to the source.

Clean run: every guard reads 0 / [] / true (u2019 0, nbsp 0, guil 0, straight 0, digitsMatch true, suffixBad [], capI [], asciiStripped [], sen [], missingFacts [] (74 EN body facts mapped), faqFacts [], mountainIsComponent [], mountainWithin true, largest true, palmOasis [], nightWarm [], camel [], markdown [], mektedir [], banned []).

| Injected error (in memory) | Result |
|---|---|
| `Hüfuf'un` → `Hüfuf’un` (U+2019) | BITES |
| U+00A0 in «12 mağara» | BITES |
| “…” → «…» | BITES |
| “dağ” → "dağ" | BITES |
| 28 → 26 | BITES |
| 1,5 → 1.5 | BITES |
| «01 numaralı» dropped (E3 span) | BITES |
| El-Ahsa'nın → El-Ahsa'nin | BITES |
| Doğu Vahası'nda → Vahası'nde (E3 span) | BITES |
| 2023'te → 2023'de | BITES |
| Cebel el-Kare'nin → Kare'in (buffer) | BITES |
| vahanın → vaha'nın | BITES |
| İçindeki → Içindeki | BITES |
| için → icin | BITES |
| copula removed («… üstü düz bir tepe.») | BITES |
| «yaya köprüsü» dropped | BITES |
| «2018'de» dropped from E3 | BITES |
| body: «Cebel el-Kare, … 01 numaralı bileşenidir» | BITES |
| FAQ 5: mountain made the component | BITES |
| «senin» / bare «göz at» | BITES |
| warmth moved to «gece» | BITES |
| «en büyük hurma vahası» | BITES |
| E2 reverted («hafifçe ılık») | BITES |
| E1 reverted («adındaki cebel») | BITES |
| «keser» → «kesmektedir» | BITES |

25 / 25 injections bite.
