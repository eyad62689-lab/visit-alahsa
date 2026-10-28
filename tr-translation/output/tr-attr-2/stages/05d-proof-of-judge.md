# 05d - Proofread of the judge's round-1 edits (tr-attr-2)

Scope: the 17 edits in 9 strings of `07-judge.r1.json`. Verified `changes[].before` equals stage 05 and `changes[].after` equals the judge `strings` for all 9; the other 27 strings are byte-equal to stage 05. The checker run on the judge file gives `RESULT [OK] 0 findings`. (It rewrote the already existing `07-judge.r1.json.check.txt`; I created no other check file.)

Whole-file scans (36 strings): no U+00A0, no straight double quote, no U+2019/U+2018, no guillemets, no space before punctuation, no double space, no Arabic script or digits, no `Ilk`-type dotted/dotless error. All suffix apostrophes are U+0027 and sit on proper names or numerals only (Müberrez'in, Hüfuf'un, Ukayr'ın, El-Ahsa'nın, 1913'te, 2017'de, 1990'ların, UNESCO ... Listesi'ne).

Verdict counts: 9 OK, 0 MANDATORY, 2 OPTIONAL suggestions (on strings that are themselves OK).

## Per string

### muhairis.summary - OK
"Müberrez'in kenarında, İlk Suudi Devleti döneminden kalma, gözetleme ve koruma amaçlı küçük bir kale." Faithful to EN "small watch-and-guard fort ... on the edge of Al-Mubarraz" and AR (مراقبة وحراسة, على أطراف). Müberrez'in follows the A1-Müberrez vowel e. "kalma" matches the khuzam summary. Nothing added or dropped.

### muhairis.body - OK
- "(Kasr Muheyris)" appears once, at first mention, as A2-Muheyris / A2-Kasr-bracket / A1-Sahud require. Name forms are byte-identical to the title and area (Muheyris, Müberrez'in).
- "daha sonra imamlık makamına gelen" renders EN "(later Imam)" / AR (الإمام لاحقاً) and adds no fact. It matches ruling A2-imam, and the unqualified "imam" later in khuzam sits with the ordinal as the ruling says.
- "kalenin duvarları" is the fort's walls (EN "its walls", AR واجهاته), so the referent is correct.
- "kültürel miras ve sanat etkinlikleri" matches EN "heritage and arts events" and AR تراثية وفنية.
- "gözetleme ve koruma amaçlı küçük bir kaledir" with "duran" is grammatical; the vowel harmony of kaledir is correct.
- One paragraph, as in the English. P9, P10 and the Hijri form "Hicri 1208 (1794)" are fine.

### khuzam.body - OK
- "(Kasr Huzam)" once, at first mention (A2-Huzam). Names are identical to the title and area (Hüfuf'un, El-Mezruiye mahallesinin).
- "zincirinin bir halkasıdır" keeps the chain image; the facts are unchanged.
- "yönlendirmeye yarayan yulardır": "yular" is the halter by which camels are led, which fits AR الزمام الذي تُقاد به الإبل. The vowel of "yulardır" is correct.
- "altı kuleyle korunur" is the passive of EN "is guarded by six towers". Vowel harmony is correct and the old "surunu altı" misparse is gone.
- The split "bedevi işlerinin yürütüldüğü bir merkez olarak kullanıldı; ... anlaşmazlıklar da burada çözülüyordu" keeps both EN functions (managing tribal affairs, settling disputes over water) and the order. "da" here means "also" and is written apart, which is correct. The tense shift to the imperfect is natural.
- The quotes around "zimam" are “…”. One paragraph, as in the English.

### khuzam.practical.0.value - OK
"Şu anda kapalı (restorasyon ve kültürel miras geliştirme çalışmaları nedeniyle)". This renders EN "restoration and heritage development" / AR الترميم والتطوير التراثي. The term is the same as in muhairis.body. There is no final stop, matching the sibling card values.

### baiah.summary - OK
The split after the noun phrase names the object ("evi"). All facts are kept: the Al-Mulla family house, the judge, 1203 (1788), the 1913 allegiance, and the symbol. It matches EN and AR, and the name forms are the same as in the body and area.
OPTIONAL: "El-Ahsa kadısı evi ... yaptırdı" parses correctly (subject plus accusative), but "kadısı bu evi yaptırdı" would remove even a momentary compound reading. Not required.

### baiah.body - OK
- The three-way split "Adı “Biat Evi” anlamına gelir; Beyt el-Mulla olarak da bilinir. 705 metrekarelik bir evdir. Evi ..." keeps the gloss "Biat Evi" once, the family name "Beyt el-Mulla" untranslated, and the 705 m² fact, as A2-Beyt el-Biat requires.
- "tarihî ve siyasi açıdan en önemli yerlerinden biri" renders EN "foremost historical and political landmarks" and AR معالمها. "yer" is plain Turkish for a landmark and no longer reads as an institution.
- Names are identical to the rest of the batch (Kasr İbrahim'e, El-Kaysariye Çarşısı'na, El-Mulla, Hüfuf'un, El-Kut mahallesinde). The date "Hicri 28 Cemaziyelevvel 1331 (4 Mayıs 1913)" and the "1853–1921" range are in the correct form.
- It is still one paragraph, as in the English. The Arabic has four paragraphs, but the brief makes the English structure binding.
OPTIONAL: none beyond the source-level questions already logged by the judge.

### uqair-castle.body - OK
Dropping "de" gives "Sınırları belirleyen Ukayr Protokolü, Hicri 1341 (1922) yılında liman alanında imzalandı". This is a plain continuation as in EN "and it was on the port's grounds that ... was signed", and no fact is lost. The names are consistent: Ukayr Kalesi/Limanı'nın/Protokolü is article-less per A1-Ukayr, and "Dammam Limanı" is article-less per the P1 ruling. "Arap Körfezi" follows P5. One paragraph.

### jabri-mosque.body - OK
"yaklaşık 1.600 kişi namaz kılabilir" renders EN "holds around 1,600 worshippers" and AR يتسع لنحو 1600 مصلٍّ. The capacity meaning is kept and the number format is correct (1.600). The rest is unchanged. Names are identical across the batch: El-Cebri Camii, Cebriler Devleti, El-Kut mahallesi, Kasr İbrahim'e, Hüfuf'un. One paragraph.

### jabri-mosque.practical.0.value - OK
"İbadet için kullanılan bir cami; ücretsiz". Under the label "Giriş" this reads as no entry fee, which matches EN "no entry fee" / AR بلا رسوم دخول and removes the doubled "giriş". The sentence-case label fits P9, and there is no final stop.

## tm_pairs
All 36 `tm_pairs` entries (page.field) exist in `strings` with a `tr` byte-equal to `strings`, and every `en` equals the `pack.json` source. None differ.

## Rulings check
- One-time brackets: "(Kasr Muheyris)" and "(Kasr Huzam)" occur exactly once each (muhairis.body and khuzam.body) and nowhere else in the 36 strings.
- Name forms are byte-identical across all strings: Muheyris Sarayı, Huzam Sarayı, Beyt el-Biat, El-Cebri Camii, Ukayr, Müberrez, Hüfuf, El-Kut, El-Mezruiye, El-Mulla, Kasr İbrahim.
- P1 article-less Dammam is respected ("Dammam Limanı").
- P5, P8, P9 and P10 are respected, and no edit forced P11, which stays open (Hicri form unchanged).
