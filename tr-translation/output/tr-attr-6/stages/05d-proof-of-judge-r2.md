# tr-attr-6 — proofread of the judge's round 2 (stage 05d-r2)

Checker (`--prev stages/07-judge.r1.json`):
`RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)`

## 1. Integrity of the changes
- 59 strings in both r1 and r2. Exactly two differ: `salwa-beach.body` and `hubail-lake.body`. The other 57 are byte-equal to round 1 (compared programmatically).
- Both `changes[].before` equal round 1 byte for byte; both `after` equal the round-2 string byte for byte.
- Both strings: no U+00A0, no U+2019, no «» or straight quotes, no Markdown characters, no line breaks, no double spaces, Latin digits only (150 is the only numeral). Apostrophes are U+0027 on names only.

## 2. salwa-beach.body — OK (one OPTIONAL note)

Round-2 text, sentence openers: «El-Ahsa'nın … Selva Plajı bulunur.» | «Plaj, … yanındadır.» | «Plaj, Arap Körfezi boyunca uzanır ve Hüfuf'a yaklaşık 150 kilometre uzaklıktadır.» | «Selva, idari olarak …» | «Plajın kumlarının …» | «Plajın batı yanı …» | «Plaj, deniz balıkçılığıyla …» | «Belediye, …»

- **Who does each verb.** S1: Selva Plajı (bulunur), with locatives only. S2: Plaj (yanındadır). S3: Plaj (uzanır, uzaklıktadır). This removes the ambiguity the round-2 reader raised: after the genitive chain «kapısının» the verbs could be read as belonging to the gateway. With the full stop and the subject named again, the gateway can no longer take «uzanır». The fix works.
- **Faithfulness to the English.** English: "At the town of Salwa … by the Kingdom's land gateway to Qatar, Salwa Beach stretches along the Arabian Gulf about 150 kilometres from Hofuf." The Turkish keeps the same facts in the same order (town, gateway, Gulf, distance). Nothing is added or dropped. The only change is punctuation and the repeated subject word, and the facts are not moved. The gateway still locates the beach, as in the English; the Arabic attaches it to the town, and that is already recorded as a source_defect.
- **Grammar and suffixes.** «kapısının yanındadır» (possessive plus genitive, then locative-possessive «yanında» plus copula) is correct. Katar'a, Hüfuf'a (back vowel, termbase suffix u: Hüfuf'un, Hüfuf'ta, and dative «a» is the right harmony after the last vowel «u»), Suudi Arabistan'ın, and «Arap Körfezi» (P5) are correct. The semicolon was the only thing removed. S4 «Selva, idari olarak El-Ahsa'ya bağlıdır.» now follows a «Plaj,» sentence with its own explicit subject, so there is no confusion over who is administratively attached.
- **Repetition created by the edit.** The three-in-a-row pattern the caller flagged is real but is two, not three, in a row: S1 opens with «El-Ahsa'nın …» (the locative chain), S2 and S3 open «Plaj, … / Plaj, …». Across the paragraph five of the eight sentences open with Plaj/Plajın (S2, S3, S5, S6, S7). This is stiff but not wrong, it is the price of the "name the subject" lesson, and the pre-existing S5–S7 pattern was already accepted in earlier rounds (S5–S7 are byte-equal to round 1 and to stage 05). No grammar or meaning problem.
- **OPTIONAL (not recommended).** If the owner ever wants less repetition, S3 could open «Arap Körfezi boyunca uzanan plaj, Hüfuf'a yaklaşık 150 kilometre uzaktadır.» (the beach stays the subject through «uzanan» and the Gulf phrase leads). I do not recommend editing now: it reorders the sentence, risks a new reader stumble, and the current form has no error. Leave as is.
- Dependents: no FAQ on salwa-beach, and the title, summary, area and visit-card rows are unchanged. The summary («Katar sınırına yakın sakin bir plaj») is consistent with the body.

## 3. hubail-lake.body — OK (one OPTIONAL note)

Round-2 text: «Gölün büyüklüğüne ve varsa ziyaretçi tesislerine dair ayrıntılar, güvenilir kaynaklardan teyit edilmeyi bekliyor.»

- **Grammar.** «büyüklüğüne ve … tesislerine dair» (dative on both coordinated nouns, then the postposition «dair», which takes the dative) is correct. «ayrıntılar … bekliyor» is a plural non-human subject with a singular verb, which is normal Turkish. «teyit edilmeyi bekliyor» is the page-local P6 wording, untouched. Who does the verb: the details wait for confirmation. No person or place is wrongly made the subject.
- **Faithfulness to the English.** English: "Further details about the lake — its extent and any visitor facilities — are pending confirmation from reliable sources." Dropping «diğer» removes the Turkish rendering of "Further". The claim that remains (the lake's extent and any visitor facilities are pending confirmation) is the full information content of the English: the dash list is what the details are, and «diğer» had made readers look for other details beyond that list. The nuance "in addition to what was just said" is lost, but that nuance is only in the single English word «Further», and the preceding sentence of the Turkish (the formation) already makes the "more" implicit by position. Nothing is added, no fact is moved. Not a mistake; no fix needed.
- **Note on "its extent" / «büyüklüğüne».** Unchanged from round 1 and accepted.
- **Consistency with the FAQs.** faq.0.a repeats the formation sentence of the body word for word («Göl, vahadaki çiftliklerden gelen tarımsal drenaj suyunun zaman içinde birikmesiyle oluştu.»). faq.1.a «El-Ahsa'nın kuzeyinde.» agrees with the first sentence («El-Ahsa'nın kuzeyindeki»). faq.2.a (no fee) is not contradicted: the body says nothing on fees and the visit card says «Herkese açık doğal alan — ücretsiz». No FAQ answer carries the pending-details sentence, so the edit touches no FAQ.
- **OPTIONAL (not recommended).** «Daha fazla ayrıntı» would keep the English "Further" exactly, but «daha fazla» can also be read as "more than has been given", the very reading the readers disliked in «diğer». Current text is the safer one.

## Verdict counts
- OK: 2 (salwa-beach.body, hubail-lake.body)
- MANDATORY: 0
- OPTIONAL: 2 (one per string, neither recommended for change)

No MANDATORY items; no fix required before shipping.
