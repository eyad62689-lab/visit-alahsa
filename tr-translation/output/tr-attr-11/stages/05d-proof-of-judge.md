# 05d - independent proofread of the stage-07 round-1 edits (tr-attr-11)

Scope: the five strings the judge changed (E1-E5), each with the sentence before and after. Checked against `pack.json` `en` (and `ar` where it bears). No stage file edited.
Mechanical checks (node, on the 07 strings): no U+00A0; no U+2019/U+2018; apostrophe only U+0027 and only on Hüfuf'un (taraf-zoo.area 1, hamidiyah-souq.body 2); no ASCII-stripped Turkish words; Latin digits; clock ranges with U+2013, no spaces; sawsan-gardens.body === sawsan-gardens.summary (true, byte for byte).

## strawberry-farm.practical.0.value - SOUND
Text: «Kış ve ilkbahar mevsimlerinde 15.30–21.30»
- EN "Winter and spring season, 3:30–9:30 pm": 15.30–21.30 is the P10 form of 3:30–9:30 pm; nothing added (no «Her gün», as the English has none).
- «Kış ve ilkbahar mevsimlerinde»: locative plural -lerinde, harmony correct; two seasons under a plural noun is the ordinary Turkish. Agrees with lemon-farm «yetişme mevsimlerinde». No stumble; the bare time range after the locative needs no connector in a card value (cf. the approved «Her gün 16.00–21.30»).

## sawsan-gardens.summary - SOUND (one non-defect remark)
Text: «El-Ahsa vahasının atmosferi içinde kuşların sergilendiği bir bahçe.»
- «atmosferi içinde» is grammatical: «El-Ahsa vahasının atmosferi» (izafet, -nın/-si correct after a vowel-final «vaha» and «atmosfer») + «içinde». It is the same construction as «şehrin gürültüsü içinde»; it is not idiomatic-minimal (the plain form is «atmosferinde») but it is ordinary tourism Turkish, read at once, and it keeps both English words ("amid the atmosphere of"). «vahasının» has no apostrophe (common noun) and «El-Ahsa» is a bare modifier here, correct under the Hasawi/El-Ahsa rule. Remark only: «atmosferinde» would be shorter but loses «amid»; no change proposed.
- Who does what: «kuşların sergilendiği» has «kuşlar» as the displayed subject of the passive; «bir bahçe» is the head. The locative phrase before the participle clause can only attach to the displaying, which is what the English "amid" does. No reorder, nothing added, nothing lost. Suffixes -ın/-dığı correct; sentence-final full stop; no TDK error.

## sawsan-gardens.body - SOUND
Byte-identical to the summary (verified by script); same reading as above.

## taraf-zoo.area - SOUND
Text: «Et-Taraf kasabası — Hüfuf'un doğusu»
- «Et-Taraf» byte-identical to the termbase name; «kasabası» (3rd-person possessive, ı harmony, correct) is the generic from the Arabic row بلدة and agrees with the body/summary «Et-Taraf kasabası/kasabasında». «Hüfuf'un» : proper name, apostrophe U+0027, -un is right (last vowel of «Hüfuf» is u). «doğusu» correct. The em dash with spaces mirrors the English "Al-Taraf — east of Hofuf". Nothing added: the generic is the town the English summary already names ("the town of Al-Taraf").
- Neighbours: the row is a standalone card value; no adjacent sentence.

## hamidiyah-souq.body - SOUND
Touched sentence: «Günümüzde bina çalışan bir çarşı değil, tarihî bir yapıdır: artık halk çarşısı olarak çalışmıyor; içinde bugün Şark Restoranı hizmet veriyor.»
- Punctuation question. The colon follows a complete sentence («... bir yapıdır») whose content the rest explains - exactly the TDK use of the iki nokta (açıklama). It is not placed inside a verb-less fragment, so the nominal predicate «-dır» before it is no obstacle. The text after the colon begins lowercase («artık»), which is right in Turkish continuation after a colon. The semicolon then separates two coordinate clauses inside the explanation (the first about the market status, the second about the occupant): acceptable TDK use (noktalı virgül between related independent clauses, esp. when one already stands after a colon). It is slightly dense, but it reads at once: the repeated word «çalışan ... çalışmıyor» frames the contrast, and the colon says "i.e.". It mirrors the single English sentence with a colon and two clauses. No change needed.
- Who does the verb: «çalışmıyor» - the unstated subject is «bina» (the sentence's own subject, the explicit «bina» two clauses back); «hizmet veriyor» - explicit subject «Şark Restoranı», with «içinde» pointing back to the building. No misreading is possible (a restaurant cannot be what «çalışmıyor»). The semicolon marks the subject shift.
- Sense vs EN: "Today it is a heritage landmark rather than a working souq: it no longer trades as a folk market, and the activity in its building is Sharq Restaurant." - all three facts present; «halk çarşısı» is the approved tm rendering of "folk souq"; nothing added or lost, no reorder.
- New stumble? None created: «Bina» openers reduced; «Günümüzde» + «artık» is mildly redundant but is the source's own "Today ... no longer". Letters: «tarihî» with circumflex-i as the TDK form, «Şark» capital Ş, i/İ and ı/I clean. Apostrophes: only «Hüfuf'un» ×2 (before and after the touched sentence, untouched).
- Sentence before: «Böylece bina, şehrin kalbindeki geleneksel çarşı binaları kümesine katıldı.» - sound. Sentence after: «Binaya ve tarihine dair daha fazla ayrıntı, burada yayımlanmadan önce güvenilir kaynaklardan teyit edilmeyi bekliyor.» - sound, untouched; the comma after the subject sets off the adverbial «burada yayımlanmadan önce ...» (two-subject-predicate confusion is not possible: plain noun phrase, not a participle subject); it was in the stage-05 text and was not touched by the judge.

## Summary
SOUND x5 (E1-E5). No defects, no fixes proposed.

## Checker
`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a11 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-11 .../stages/07-judge.r1.json --prev .../stages/05-proofreader.json`
RESULT [OK] 0 findings (full text: 07-judge.r1.json.check.txt)
