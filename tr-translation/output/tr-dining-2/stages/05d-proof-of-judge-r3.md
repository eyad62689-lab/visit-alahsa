Method: node diff of `strings` in 07-judge.r2.json vs 07-judge.r3.json (5 keys changed, 20 identical); each new Turkish read sentence by sentence against pack.json English, against DN3, DN4, DN9-r2, DN12, DN16, DN16-r2, DN17, and against ref.cards `name_en`. Sweep of all 25 strings for double spaces and straight double quotes (script, not by eye).

## Defects (0)

None. Sweep: 0 double spaces, 0 straight double quotes in the 25 strings. Place names in the changed keys (Dar Basma, Sinyar, Greasy Fingers, Lava, Lava Chocolate, Dot Bakery & Café, Khunaina, Al Hawy, Sinyar and Raslan) are byte-identical to ref.cards or to the English sub-brand form; apostrophes before suffixes are correct (Sinyar'ın, Dot'un, El-Ahsa'da, Müberrez'deki).

Observation only, not a defect: in `db.lava.body` the English «in particular» is no longer rendered («özellikle» removed by the judge). This is the judge's deliberate choice (R3:P12.2); the fact stated is unchanged and nothing is added.

## Sound
- db.dar-basma.body: «Ev, karakterini koruyan …» applies DN16-r2 exactly (one-word common-noun subject plus possessed object, comma kept); meaning equals the English «restored with contemporary touches that kept its character»; all other sentences identical to r2.
- db.sinyar.body: «iki gemiye de “sinyar” denir» applies DN17; typographic quotes for the mentioned word; the sense (two ships sailing in company) matches the English; nothing added or dropped.
- db.greasy-fingers.body: «Bu, başka şubesi olmadığı anlamına gelmez; bu yüzden yalnızca bulamadığımızı belirtiyoruz.» matches DN12 second half and DN16 («Bu,» pronoun comma); first person plural and the limit of the claim kept; «listemizdeki yerler arasında» is the second mention and obeys DN3 (index named once, in «restoran ve kafe listemizdeki Al Hawy ve Khunaina»); the comma pair around «eski Hüfuf'un … farklı olarak,» is a paired insertion, not a subject-predicate comma.
- db.lava.body: «bu sayfa Arap Körfezi Yolu şubesini anlatır» is faithful to «this page covers the Al-Khaleej Road branch»; no fact added; DN3 form «restoran ve kafe listemizdeki Sinyar ve Raslan» unchanged.
- db.dot-bakery.body: «Bu hesap El-Ahsa'da …» applies DN17 (bare «Hesap» becomes «Bu hesap»); «Fırın bugün üç şubesini sayar: El-Huber, Müberrez ve Hüfuf.» keeps «now lists three branches» and the branch order of the English; DN9-r2 wordplay clause untouched and byte-identical.
