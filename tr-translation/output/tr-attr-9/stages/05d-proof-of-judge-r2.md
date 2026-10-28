# 05d proofread of the stage 07 round 2 edits (tr-attr-9)

Scope: the three strings the judge changed in round 2 (khalifa-museum.body, abdulrazaq-museum.body, dhafar-museum.body). Each read against the English in pack.json, the edited sentence and its neighbours. No stage file edited.

Mechanical (script-checked on the three strings): r1 to r2 differs in exactly these three keys; no NBSP, no U+2019/U+2018, no «», no straight quotes in any of them; Turkish letters and İ/ı intact; apostrophes are U+0027 on proper names only; no ASCII-stripped forms.

## khalifa-museum.body — SOUND
Text: «… Müzede ayrıca El-Ahsa evi, çiftçilik, çöl yaşamı ve denizcilik konulu bölümler ve Aramco dönemine ayrılmış bir köşe vardır. Bir meclis salonu da geleneksel El-Ahsa tarzında düzenlenmiştir.»

- Grammar: subject «Bir meclis salonu», passive predicate «düzenlenmiştir», «da» = "also" (closes the list of what the displays cover, as the English "and a majlis …" does), adjective «geleneksel» before the noun phrase «El-Ahsa tarzında». No suffix or harmony fault; «El-Ahsa» is the ruled demonym substitute (El-Ahsa + noun), so «El-Ahsa tarzında» is on precedent («El-Ahsa mutfağı», «El-Ahsa evi»).
- «El-Ahsa tarzında düzenlenmiştir» is natural Turkish: «X tarzında döşenmiş/düzenlenmiş/inşa edilmiş» is the ordinary frame («Osmanlı tarzında döşenmiş salon»). «geleneksel … tarzında» is a mild pleonasm of the common kind, not a stumble.
- Who does the verb: the room is the passive subject, no agent needed; the English is equally agentless ("done up").
- Sense vs English ("a majlis done up as a traditional Hasawi diwaniyah"): dropping the noun «diwaniyah» loses a word, not a fact. In Gulf usage majlis and diwaniyah are two names for the same kind of room (the guests' reception room); the English itself does not gloss diwaniyah, and the Arabic (مجلس يحاكي الديوانية الأحسائية) uses it as the model of the style. What survives: a majlis, arranged in the traditional Hasawi manner. What shifts, slightly: "as a diwaniyah" (a type of room it imitates) becomes "in the manner" (a style); for a room that is already named «meclis salonu» the two come to the same picture. Nothing added: «tarzında» adds no claim the English lacks. The judge logged this in source_defects, which is the right place.
- New stumble? None. The old circular reading («misafir salonu» beside «meclis salonu») is gone; the sentence cannot be misread as "a hall arranged like a hall". The residual «meclis salonu» parliament reading is the raised A9-meclis-raised item, unchanged and not this edit's.
- Neighbours: previous sentence unchanged and sound; «Müzede ayrıca … vardır» then «Bir meclis salonu da …» keeps the English list order (sections, Aramco corner, majlis last).
- Smallest fix: none required.

## abdulrazaq-museum.body — SOUND
Text: «Bu da müzeyi, Suudi Arabistan'da öğrenimin nasıl başladığının izini sürmek isteyen ziyaretçiler için kendine özgü bir durak yapar.»

- Grammar of «başladığının izini sürmek»: correct. «izini sürmek» takes the genitive of what is traced («bir şeyin izini sürmek»); a nominalised indirect question («öğrenimin nasıl başladığı») in the genitive («başladığının») is the regular way to put a clause there («bir olayın nasıl geliştiğinin izini sürmek»). The possessive on «izini» (3rd person) agrees. The two stacked genitives («öğrenimin … başladığının») are heavy but each is required by its head; no repair is smaller than rewording the clause, which is not needed.
- Sense vs English ("tracing how learning began in the Kingdom"): «izini sürmek» is the verb "trace" and fixes the two readers' «izlemek» (watch) fault. «öğrenim» for "learning" is untouched by this edit (nearest plain word; the judge's accuracy note already carries it).
- Who does the verb: visitors («ziyaretçiler … sürmek isteyen») trace; the museum is the object of «yapar»; «Bu da» still points at the sentence before (the local-heritage pieces beside the education collection), as in the English "making it". Unchanged.
- New stumble? None. Neighbours untouched.
- Smallest fix: none required.

## dhafar-museum.body — SOUND
Text: «… Müzeyi farklı kılan şey ünlü izcilik müzesidir. Bu izcilik müzesi, Suudi Arabistan'da türünün ilki olarak tanımlanır. … Halk kültürü ve izcilik koleksiyonları birlikte müzeyi El-Ahsa'nın en kendine özgü özel müzelerinden biri yapar.»

- «Müzeyi farklı kılan şey ünlü izcilik müzesidir.»: a headless relative clause «Müzeyi farklı kılan şey» (subject) + nominal predicate «ünlü izcilik müzesidir». This is the standard Turkish equivalent of "What sets it apart is …". Carrying the subject by «şey» is correct; the earlier comma-only form («kılan, ünlü …») left a participle without a head and is rightly dropped. «şey ünlü» adjacent does not misparse (şey is not a filler here: it is the object of the verbless predicate). «farklı kılmak» is slightly more formal than «öne çıkarmak» but plain and idiomatic. Sense: "sets it apart" and "celebrated" both kept; «ünlü» for "celebrated" is the pack's established choice. Nothing added or lost.
- Comma after «birlikte» removed: correct. Order is Subject («Halk kültürü ve izcilik koleksiyonları») – adverb («birlikte») – Object («müzeyi») – complement («… biri») – verb («yapar»). The adverb now sits next to its verb phrase instead of being fenced by a comma. Could «birlikte» be read as a postposition ("together with the museum")? No: the postposition would need «müzeyle birlikte»; here the accusative «müzeyi» follows, so no misreading. «müzeyi … müzelerinden biri yapar» ("makes it one of …") is regular double-complement syntax.
- Sense vs English ("Together the two collections make it one of Al-Ahsa's most distinctive private museums"): «en kendine özgü» = "most distinctive", «biri» keeps the hedge; "the two collections" kept as «Halk kültürü ve izcilik koleksiyonları». Nothing added or lost.
- Neighbours: sentence 4 «Bu izcilik müzesi … tanımlanır» (hedged, passive = the English "described as") unchanged; the museum/collection wording difference is the logged source defect, not touched.
- Smallest fix: none required.

## Summary
All three round-2 edits SOUND. No defects found; no new stumble introduced; no fact added or lost (the only loss is the Gulf noun «diwaniyah», a near-synonym of «majlis», already logged as a source defect).

## verify.mjs
`RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)`
(command: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a9 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-9 .../stages/07-judge.r2.json --prev .../stages/07-judge.r1.json`)
