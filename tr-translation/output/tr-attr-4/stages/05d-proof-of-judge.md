# tr-attr-4: independent proofread of the judge's round-1 edits (stage 05d)

## Scope

Input: `stages/07-judge.r1.json` against `stages/05-proofreader.json`, read with `BRIEF.md`, the role file `prompts/05-proofreader.md`, `pack.json` (English `en`, Arabic `ar` / `arabic_body`) and `termbase.json`. Six strings were edited by the judge: tahimiyah-e.body, hubaish.body, umzurainiq.body, uqair-mosque.summary, uqair-mosque.body, abubakr-mosque.body. Every sentence the judge touched was read for grammar, case and vowel harmony, repetition created by the edit, faithfulness to the English, name forms, register and punctuation. No JSON was edited.

## Whole-file scans (07-judge.r1.json, all 26 strings)

- Change integrity: strings that differ from stage 05 = exactly the 6 `changes[].key` values; for all 6, `before` equals stage 05 and `after` equals the judge's string. The other 20 strings are byte-equal to stage 05, and key order is the same.
- U+00A0: none. U+2019: none in strings. Straight `"`: none. «» in strings: none (quotes are “”). Markdown characters: none. `sen`-forms: none. ASCII-stripped Turkish words (Ilk/Ozel/Carsi/Gunes/sehir): none. Apostrophe (U+0027) appears only on names and numerals in the six edited strings (Ahsa'nın, Hüfuf'un, Kare'ye, Arabistan'ın, Bölgesi'ndeki, Limanı'nın, Necid'in; Kur'an is the TDK form).
- Name forms: «Ez-Züheyri» occurs only in tahimiyah-e.body and no «Zuheyri» remains anywhere. Titles and areas are unchanged and agree with the body forms (Et-Tahimiye Doğu Camii, El-Hubeyş Camii, Ümm Zureynik Camii, Ukayr Limanı Camii, Şeyh Muhammed bin Ebu Bekir el-Mulla Camii; Güney er-Rifa mahallesi, El-Uveymiriye mahallesi, El-Kut mahallesi).
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a4 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-4 stages/07-judge.r1.json --prev stages/05-proofreader.json`
  `RESULT [OK] 0 findings (full text: 07-judge.r1.json.check.txt)`
  The checker does not catch the two MANDATORY items below (a parse problem and a subject/verb agreement problem).

## Verdict counts

OK 3 (hubaish.body, umzurainiq.body, uqair-mosque.summary) · OPTIONAL 1 (tahimiyah-e.body) · MANDATORY 2 (uqair-mosque.body, abubakr-mosque.body).

MANDATORY fixes:
1. abubakr-mosque.body, last sentence: «cami yaklaşık 125 kişi namaz kılabilir» → «camide yaklaşık 125 kişi namaz kılabilir» (or drop «cami», as the sibling pages do).
2. uqair-mosque.body, second-to-last sentence: «Eski liman ziyaretçilerine bütün hikâyesini anlatır;» → «Eski liman, ziyaretçilerine bütün hikâyesini anlatır;»

## Per string

### tahimiyah-e.body - OPTIONAL
Three edits, all sound.
- «Cenazeler yakındaki mezarlığa defnedilmeden önce cenaze namazı burada kılınırdı.» Grammar is correct: «Cenazeler» is the subject of «defnedilmeden», «cenaze namazı» of «kılınırdı», «burada» is the mosque. Faithful to «funeral prayers were held before burial in the nearby cemetery»; no fact added. The edit does create a repetition, «Cenazeler … cenaze namazı», in one sentence. OPTIONAL: «Cenazeler yakındaki mezarlığa defnedilmeden önce namazları burada kılınırdı.» Not required; the current sentence is correct.
- «Dış duvarla çevrilidir» is the same fact as the English «enclosed by an outer wall». The subject «Cami» comes from the previous sentence, and «yaklaşık elli kişi namaz kılabilir» has «elli kişi» as its subject, so there is no agreement problem. OK.
- «Ez-Züheyri deresinin» follows ruling A4-Zuheyri (stem زهير, TDV «ZÜHEYR»). Front-vowel harmony on «-nin» is right and the generic «dere» stays lower case. OK.

### hubaish.body - OK
The split is «Çatısı şandal ağacı, bambu ve dokuma hasırlarla örtülüdür. Şandal, eskiden Arap Körfezi bölgesine dışarıdan getirilen bir kerestedir.» Both sentences are grammatical and the English order is kept. The gloss («timber once imported to the Arabian Gulf region») is carried in full with no fact added or dropped; «Arap Körfezi» agrees with P5. «şandal ağacı» agrees with the termbase generic. The initial capital «Şandal» is correct. The next sentence restates the subject «Cami», so there is no stray reference. The published qasr-ibrahim gloss («eskiden … dışarıdan getirilen bir kereste») is the same wording. No leftover from the bracket.

### umzurainiq.body - OK
- «Silindir biçimli, ahşap balkonlu minaresiyle öne çıkar» has a clean comma between two modifiers (the English order: cylindrical, with a wooden balcony). The subject «Cami» comes from the previous sentence. OK.
- «Suudi Arabistan'ın Doğu Bölgesi'ndeki cami mimarisinin ayırt edici bir özelliğidir.» Morphology is correct: the genitive+possessive pair «Suudi Arabistan'ın … Bölgesi» and «-ndeki» on «Bölgesi'nde». Apostrophes are on names only. On the faithfulness question: the words «Suudi Arabistan'ın» are not in the English («the Eastern Province's») or the Arabic, and stage 4 removed them as an addition under the fence. The judge re-adds them, and I find the stated reason sound enough to accept. (a) «Doğu Bölgesi» alone is a documented real misread by the blind reader (Doğu Anadolu Bölgesi). (b) The country is not a new claim about the mosque; it is the disambiguator of the proper name that tr.wikipedia itself prints in its title («Doğu Bölgesi (Suudi Arabistan)»). (c) The batch's own precedent, A1-O1, says a later reader's misreading restores the full referent in one edit. (d) The sibling uqair bodies already say «Suudi Arabistan'ın doğu kıyısındaki ilk deniz limanı». This is the judge's call. The rule «the English is the source» is read here as «no new fact», which is not breached, and the judge records the single-edit revert («Doğu Bölgesi'nin cami mimarisinin»). No change requested; the fresh reader and the fence are where it will be tested.
- «Ayrıca iç mekânda duvarlar, pencereler ve kemerler alçı süslemelerle bezelidir.» Grammar is correct: one subject (three coordinated nouns), predicate «bezelidir», and «mekân» with the TDK circumflex. It matches «interior plaster ornament on its walls, windows and arches». «bezeli … süslemelerle» is a mild near-pleonasm but not an error, and «alçı» recurs from the previous sentences, which is harmless. OK.

### uqair-mosque.summary - OK
«Ukayr Limanı'nın yapıları arasında yer alan tarihî cami; …» The genitive «Limanı'nın» has correct harmony and apostrophe (name «Ukayr Limanı» is in the termbase). The wording matches the published uqair-castle sentence. The English summary says «within the Al-Uqair port complex»; «yapıları arasında» renders the Arabic «ضمن مباني» and the following clause covers «facilities». No fact changes. No repetition problem.

### uqair-mosque.body - MANDATORY
- «Limanın yapıları arasında tarihî bir cami bulunur.» is correct and agrees with the summary. OPTIONAL remark only: the English body says «within the complex of the historic Al-Uqair port» and «yapıları arasında» is the published wording of a different English sentence, so «complex» is slightly weakened. This is acceptable and is not a request.
- Second-to-last sentence of the pair: «Bugün cami, tarihî liman alanının içindedir.» is correct («within the historic port site»).
- «Eski liman ziyaretçilerine bütün hikâyesini anlatır; cami bu hikâyenin bir parçasıdır.» The meaning is right and faithful to «part of the full story the old port tells its visitors». The problem is the parse. «Eski liman ziyaretçilerine» reads first as one compound («old-port visitors», dative), and the reader then reaches «anlatır» with no subject, exactly the kind of noun-stack the edit was meant to remove (cf. the judge's own fix in the summary). The nominative subject «liman» is hidden inside a compound.
  Exact fix: «Eski liman, ziyaretçilerine bütün hikâyesini anlatır; cami bu hikâyenin bir parçasıdır.» (one comma; TDK allows it to prevent a misreading).

### abubakr-mosque.body - MANDATORY
- Opening three sentences: «Hüfuf'un tarihî El-Kut mahallesinin kalbinde Şeyh Muhammed bin Ebu Bekir el-Mulla Camii bulunur. Caminin yakınında El-Mulla ailesinin evi ve dinî okulları vardır. Cami Doğu Camii adıyla da bilinir.» The relations now follow the English (the mosque is in the heart of the district, the house and schools are near the mosque). Name forms are byte-identical to the termbase and to the title; «mahallesinin» has correct harmony. Three «cami/Camii/Caminin» in a row is mild repetition, accepted (the previous reading was worse). OK.
- «uzun süre bir ilim merkezi olarak görev yaptı» is faithful to «long served as». OK.
- MANDATORY: «Geleneksel karakteri korundu; cami yaklaşık 125 kişi namaz kılabilir.» The explicit nominative «cami» directly before «yaklaşık 125 kişi namaz kılabilir» makes the mosque the grammatical subject of «namaz kılabilir» (the mosque prays), and the place relation is missing. The siblings the judge cites («yaklaşık doksan / 94 kişi namaz kılabilir») have no nominative «cami» beside the numeral, so they parse. The edit replaced a colloquial but grammatical «cami … alıyor» with an ungrammatical sentence.
  Exact fix: «Geleneksel karakteri korundu; camide yaklaşık 125 kişi namaz kılabilir.» (acceptable alternative: «…korundu; yaklaşık 125 kişi namaz kılabilir.», as in hubaish and umzurainiq).
