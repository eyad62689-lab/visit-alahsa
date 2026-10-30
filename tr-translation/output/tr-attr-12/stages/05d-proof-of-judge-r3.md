# tr-attr-12 — independent proof of the judge's round-3 edits (stage 07 r3)

Scope: the 15 changed strings = 11 distinct edits (R3-E1 … R3-E11). Sources used: English `en` and Arabic `ar` of each key in `pack.json`; `termbase.json` (P1, P3, P5, P8, P9, P10, A9 Hasawi rule via tr-attr-9/11 rulings, A11-road, A1-collisions); `tm.json` (searched: no pair for any of the new wordings; «kırsal» occurs elsewhere only in «kırsal konaklama birimleri» and «Et-Taraf kırsalını», unrelated to the product list).

## Mechanical checks (all by script, no Turkish through a shell)

- r2 and r3 both have 50 keys, same key set. Exactly 15 keys differ; 35 are byte-identical. Every one of the 15 is in `changes`; every `changes` entry is a real difference.
- For all 15 entries `before` = r2 string and `after` = r3 string, byte for byte.
- The r2 → r3 difference is exactly the eleven claimed substitutions and nothing else: applying the eleven (from → to) pairs to the r2 strings reproduces every r3 string byte for byte (15/15 REPRODUCED). No stray word moved.
- Byte-identical sets, all intact:
  - «Kadınlar Çarşısı» = `women-souq.title`, the first words of `body` («Kadınlar Çarşısı, »), and the start of all five FAQ questions (faq.0.q «…Çarşısı'nın», faq.4.q «…Çarşısı'nda», the other three bare).
  - «El-Ahsa Geliştirme Kurumu ve El-Ahsa Belediyesi» in summary, body, practical.1.value (whole value) and faq.1.a (×4).
  - «Hurma Ağacı Müzesi» once each in summary, body, faq.3.a (×3); no «Hurma Müzesi» / «Palmiye» anywhere.
  - «tüccarlar, çiftçiler, zanaatkârlar ve evde üretim yapanlar» in body, faq.2.a, cta.note (×3).
  - «Teyit bekleniyor» in zaki practical.2.value and palm-village practical.2.value (exact values).
  - «Arap Körfezi Yolu» in zaki body («…Yolu üzerindedir») and area («Arap Körfezi Yolu — El-Ahsa»).
  - «El-Ahsa yöresel ürünleri için 5 dükkân» in palm-village body and faq.3.a.
  - palm-village.body: five paragraphs, separated by `\n\n`, no single `\n`; paragraphs 1–4 carry the edits, paragraph 5 identical to r2.
  - `El-Ahsalı kadınlar` ×3 (summary, body, faq.2.a), `hem yerleşik hem bedevi kadınlar` ×2 (body, faq.2.a), the esnaf clause ×2 (summary, body), `Es-Süveyk adlı eski çarşı bölgesinin kalbindedir` ×2 (body, faq.1.a).
- Residuals: no «Halk Çarşısı», «El-Halic», «Es-Süveyk'in», «El-Ahsa'dan», «halk ticaret…», «kutlar», «kırsal», «yerli», «metrekareden büyük» left in any of the 50 strings.
- P8: no U+2019/U+2018 in any string (suffix apostrophes all U+0027). The only curly quotes are the intended “Eryaf Zeki” pair. No NBSP, no double spaces, no space-before-comma, all NFC.
- `verify.mjs tr-attr-12 <r3 copy> --prev <r2 copy>` (run on copies in the scratchpad so no repo file was touched): `RESULT [OK] 0 findings`.

## R3-E1 — title «Kadınlar Halk Çarşısı» → «Kadınlar Çarşısı» (title, body opening, faq.0–4.q: 7 strings) — SOUND

- English "Women's Folk Souq" / سوق النساء الشعبي. The Turkish drops the adjective «Halk» from the NAME only. This is a deliberate exception to P3 (generics follow title_en; "Folk" is not a generic but an adjective), and the ruling A12-r3-title says so in terms («"Folk" is an adjective, dropped in the name and kept in prose»; «Kadınlar Pazarı» rejected on TDK pazar).
- The prose still carries both English folk/traditional ideas: "traditional stall market" → «Geleneksel, tezgâhlı bir çarşı» (body and summary), and "living folk-trade scenes" → «geleneksel esnaf ticareti» (E3). So no fact is lost; only the name is shorter. The FAQ question "Why is it called the Women's Folk Souq?" → «Kadınlar Çarşısı neden bu adı taşıyor?» still works (the answer explains the women).
- Grammar: proper-name apostrophe correct («Çarşısı'nın», «Çarşısı'nda»; same pattern as «Hurma Köyü'nün»); the other three questions have no suffix. Set of seven verified byte-identical (script).
- Not a fault, housekeeping only: the `termbase_additions` entry «Kadınlar Çarşısı» still has the stale `suffix_vowel` text «ı - Kadınlar Halk Çarşısı'nın · Çarşısı'nda» (should read «Kadınlar Çarşısı'nın · Çarşısı'nda»); and the nearby-list fallbacks on other /tr/ pages still show English "Women's Folk Souq" (frame, out of this batch).

## R3-E2 — «El-Ahsa'dan kadınlar» → «El-Ahsalı kadınlar» (summary, body, faq.2.a) — SOUND

- English "women of Al-Ahsa" (Arabic نساء من الأحساء). «El-Ahsalı» = "of/from El-Ahsa" for persons; says the same, and removes the reading "women brought from elsewhere" that three readers had.
- Orthography: -lı is a derivational suffix on a place name, so no apostrophe (Ankaralı); vowel harmony a → ı correct; "El-Ahsa" keeps its P2 form.
- Rule check: the Hasawi/A9 rule (tr-attr-9 brief: «No invented demonym («Ahsalı», «Hasavi»)…» about the *Hasawi adjective of things*) is not triggered: the English here is "of Al-Ahsa", not "Hasawi", and it describes people, not products. The judge's reading (A12-r3-people) is correct and the form is recorded in `termbase_additions` as unattested, persons only. Residual risk is only "unattested"; a rule-compliant alternative that needs no demonym, if a later reader objects, is «El-Ahsa kadınları» (isim tamlaması), same meaning.
- Sentences are well formed in all three places: summary «Satıcıları El-Ahsalı kadınlardır; çarşı adını da bundan alır.»; faq.2.a «Çünkü buradaki satıcılar El-Ahsalı kadınlardır: hem yerleşik hem bedevi kadınlar.» Subject is named («satıcılar»); no new fact.

## R3-E3 — «halk ticareti» → «geleneksel esnaf ticareti» (summary, body) — SOUND

- English "one of the city's / Hofuf's living folk-trade scenes"; Arabic التجارة الشعبية. «halk ticareti» was a calque; «esnaf ticareti» (trade of the small shopkeepers and artisans) is the ordinary Turkish for popular/folk trade, and «geleneksel» keeps the "folk" shade. Not a new fact; hedge "one of" kept («yerlerden biri»); same wording in summary and body (script-verified).
- Grammar: «…geleneksel esnaf ticaretinin hâlâ canlı olduğu yerlerden biridir» — relative clause with genitive-possessive subject, correct; summary «Şehirde …» = "the city's"; body «Hüfuf'ta …» names the place as the English does.
- Non-blocking observations (not introduced by this edit): «hâlâ» ("still") sits in the summary where the English summary has only "living" (the English body has "remains"); «geleneksel» now appears three times in the three-sentence summary/body opening («geleneksel, tezgâhlı bir çarşı» … «geleneksel esnaf ticareti»), because one Turkish word now covers "traditional" and "folk". Acceptable.

## R3-E4 — «Es-Süveyk'in eski çarşı bölgesinin kalbindedir» → «Es-Süveyk adlı eski çarşı bölgesinin kalbindedir» (body, faq.1.a) — SOUND

- English "at the heart of the old Suwaiq market area" (Arabic وسط منطقة سوق السويق القديمة). The Turkish keeps "heart" («kalbindedir»), keeps «eski» on the generic (so «eski» cannot be read as "former" before a name — brief lesson 3), and removes the genitive chain the readers read twice. «adlı» says that the area is called Es-Süveyk, which is what "the old Suwaiq market area" says; nothing else is added. (The A12-r2-genitive objection to «adıyla anılan» was "adds 'known as'"; «adlı» is the plainer form of the same relation, not a new claim.)
- Grammar: «bölgesinin kalbindedir» = genitive + possessive + locative + copula, correct; the clause continues the subject «Kadınlar Çarşısı» (body) / «Çarşı» (faq.1.a), so the subject is not lost; two place complements before the verb in the FAQ, not three.
- Name: «Es-Süveyk» (P1 sun-letter article, capital name-initially, ü from the TDV/tr.wikipedia spelling of the word) is unchanged; no apostrophe now because «adlı» follows directly.
- Housekeeping: ruling `A12-Suveyk` still says «always as «Es-Süveyk'in eski çarşı bölgesi»» without a "superseded by A12-r3-genitive" mark; the `termbase_additions` entry already has the right form.

## R3-E5 — «hem yerli hem bedevi kadınlar» → «hem yerleşik hem bedevi kadınlar» (body, faq.2.a) — SOUND (least literal of the eleven; risk named)

- English "both local women and Bedouin" (Arabic محليّات وبدويات). «yerli» beside «bedevi» was read by three readers as unclear/redundant/contradictory because Bedouin are also "local". «yerleşik» ("settled, resident") states the contrast the English "local … and Bedouin" and the Arabic make; it is the natural Turkish pair of a nomadic/Bedouin term. It is an interpretation of "local", not a fact the English lacks (the contrast is already in the English sentence), and it is recorded in `termbase_additions` as such.
- Grammar: «hem … hem …» with two adjectives before «kadınlar»; the apposition after the comma (body) or colon (faq.2.a) is unchanged from r2. «bedevi» lower case is correct (TDK common noun/adjective; the brief's capitalised «Bedevi» is not what any stage used and was not touched this round).

## R3-E6 — «El-Halic Yolu» → «Arap Körfezi Yolu» (zaki body, area) — SOUND

- English "Al-Khaleej Road" / طريق الخليج. P5 (owner ruling 2026-10-27): الخليج = «Arap Körfezi», never a bare «Körfez» at a first mention; the judge applies P5 to the Arabic and keeps «Yolu» (A11-road). This removes the «Haliç» echo that three readers had and the doubt on «c». It is the one edit that departs from P3's "keep the transliterated specific" (the English keeps Al-Khaleej); the ruling A12-r3-road argues it explicitly (the Arabic is the arbiter of the name; the translation adds no text) and records the form as «road unattested; form by P5». «Arap» is P5's mandatory qualifier, not an added fact.
- Grammar: no apostrophe on a road name («Arap Körfezi Yolu üzerindedir», same shape as «Kral Abdülaziz Yolu üzerindedir» in women-souq); two place complements before the verb («El-Ahsa Vahası'nın doğusunda, Arap Körfezi Yolu üzerindedir»), within the "never three" limit; subject «Zeki es-Salim Çiftliği» opens the sentence.
- Body and area row are the same form (script-verified): body «Arap Körfezi Yolu üzerindedir», area «Arap Körfezi Yolu — El-Ahsa» (dash and spacing as r2).

## R3-E7 — palm-village.summary colon → full stop — SOUND

- English "A seasonal destination organised by … amid the oasis palm groves: date shops, restaurants, cafés, craft pavilions and a Palm Museum." r3: «…Hurma Köyü'nü vahanın hurmalıkları arasında düzenler. Hurma dükkânları, restoranlar, kafeler, el sanatları sergi alanları ve Hurma Ağacı Müzesi.»
- Order of the facts unchanged (organisers, groves, list); no verb, tense, «var» or other word added; the list is a verbless sentence of its own, exactly as «Mevsimlik bir gezi noktası.» already is. «Hurma» capital after the full stop is right. «Hurma Ağacı Müzesi» byte-identical with body and faq.3.a.
- Slight cost, acknowledged by the judge: the list is no longer tied to the village by a colon; the verbless fragment relies on the lede. The ruling names the next step if a reader still finds it cut off (colon-first shape). Not a fault.

## R3-E8 — «kutlar» → «öne çıkarır» (palm-village.body ¶1) — SOUND

- English "It celebrates the palm and everything that grows from it: the date and its many products, the farmers who tend it, and the crafts woven from its fronds". «Köy, hurma ağacını ve ondan çıkan her şeyi öne çıkarır: …» keeps the subject named («Köy»; the previous sentence's subject was the organisers) and the accusative colon list intact (hurmayı … ürünü, … çiftçileri, … el sanatlarını — all objects of the one verb). «öne çıkarmak» (to bring to the fore) loses the festive shade of "celebrates", which the judge states in A12-r3-kutlar; it does not add a claim.
- Grammar: transitive verb with accusative objects; participial attributes («bakımını yapan», «örülen») unchanged from r2.

## R3-E9 — «metrekareden büyük» → «metrekareden fazla» (palm-village.body ¶2) — SOUND

- English "more than 50,000 square metres". «50.000 metrekareden fazla bir alanda yer aldı» is the exact comparative; «metrekare» one word (TDK); thousands point (P-sayilar). Tense «yer aldı» as A12-tense.

## R3-E10 — «çeşidini» → «hurmanın çeşidini» (palm-village.body ¶4) — SOUND

- English "ask at the date shops about variety, origin and storage before you buy". r3: «hurma dükkânlarında hurmanın çeşidini, nereden geldiğini ve nasıl saklanacağını sorun.» The genitive gives "variety" its owner; the owner carries over to the two clauses that follow («nereden geldiğini», «nasıl saklanacağını»). Three accusative objects, one imperative («sorun», siz-form of the line). No fact added or dropped (variety, origin, storage). The «hurma … hurmanın» repetition is the price of the missing owner and is plain Turkish.

## R3-E11 — «El-Ahsa kırsal ürünleri» → «El-Ahsa yöresel ürünleri» (palm-village.body ¶3, faq.3.a) — SOUND (meaning shift named)

- English "5 shops for Hasawi rural products" (Arabic المنتجات الريفية الأحسائية). Hasawi rule kept: El-Ahsa + noun, no demonym. «yöresel» ("of the region, local-speciality") replaces «kırsal» ("rural"), which three readers called foreign. This is a small shift (rural → regional/local); the shop type remains clear and «yöresel ürünler» is the ordinary Turkish phrase for what such shops sell. The judge records it as reader-supplied and unattested and checked that the brief's «kırsal ürünleri» was an example, not a termbase entry (searched: none in termbase or tm), so no calibration needs revising.
- Body and faq.3.a identical (script-verified); the list keeps its English order and numbers (21 / 19 / 5 / 7).

## Lessons check (d)

- Split, don't reorder: E7 splits, nothing reorders; E1–E11 never move a clause.
- No new fact: none of the eleven adds a date, number, name or claim; the two most interpretive wordings («yerleşik», «yöresel») are recorded in `termbase_additions`.
- Name the subject: E8 keeps «Köy,»; E4 and E6 keep the subject as in r2.

## Notes outside the 11 edits (no action on the strings)

- Stale ruling text only: `A12-Suveyk` and `A12-words` still list the pre-round-3 forms as "kept" («Es-Süveyk'in eski çarşı bölgesi», «El-Ahsa'dan kadınlar», «halk ticareti», «kutlar», «hem yerli hem bedevi kadınlar») without a "superseded" pointer (the newer A12-r3-… rulings override them); `termbase_additions` «Kadınlar Çarşısı» `suffix_vowel` still shows «Halk». Worth a one-line tidy before the batch is merged.

11 sound, 0 faults
