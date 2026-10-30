# 05d round 2 - proofread of the judge's round-2 edits (tr-attr-11)

Scope: the three strings changed in `07-judge.r2.json` against `07-judge.r1.json` (a diff of all 34 strings confirms exactly these three differ and no others).

## sawsan-gardens.summary - SOUND
Text: «El-Ahsa vahasının atmosferinde kuşların sergilendiği bir bahçe.»
EN: "A garden for displaying birds amid the atmosphere of the Al-Ahsa oasis."
- Suffixes: «vahasının atmosferinde» is a correct genitive-possessive chain plus locative (vowel harmony, no buffer problem); «kuşların sergilendiği» is a passive participle with its own subject, no stray comma.
- Letters and TDK: ş, ğ, ı all present; «sergilendiği» is spelled correctly; no NBSP, no straight quotes, no space before the full stop.
- Who does the verb: passive with no agent, matching "for displaying" (no agent in the English).
- Sense: nothing added or lost. «atmosferinde» = "amid the atmosphere of"; the oasis is kept as the possessor. It reads as a plain nominal fragment; the change did not create a new stumble. The previous «atmosferi içinde» is gone, so there is no longer a calque.
- Place name: «El-Ahsa vahası» follows the Hasawi/El-Ahsa rule (El-Ahsa + noun, no demonym).
Fix: none.

## sawsan-gardens.body - SOUND
Text: identical to the summary. A byte-for-byte comparison in node returns `true` (`strings['sawsan-gardens.body'] === strings['sawsan-gardens.summary']`). Same verdict as the summary. The title «Es-Sevsen Kuş Bahçeleri» is unchanged and not touched by the edit.
Fix: none.

## hamidiyah-souq.body - SOUND
Edited sentence now: «Günümüzde bina çalışan bir çarşı değil, tarihî bir yapıdır: artık halk çarşısı olarak çalışmıyor; içinde Şark Restoranı hizmet veriyor.»
EN: "Today it is a heritage landmark rather than a working souq: it no longer trades as a folk market, and the activity in its building is Sharq Restaurant."
- Grammar: «içinde» refers back to «bina», the subject of both clauses before it, so there is no change of subject. «Şark Restoranı» is the subject of «hizmet veriyor». The suffix on «Restoranı» is the possessive of the compound name; the name is byte-identical to the earlier ruling («Şark Restoranı»).
- Punctuation: colon, then semicolon. Both are legitimate, and the sentence is long but not broken. No space before punctuation; no NBSP; no «» or straight quotes.
- Sense: the second «bugün» is gone. The English has "Today" once (here carried by «Günümüzde») and "no longer" once (carried by «artık»), and the last clause of the English has no time word, so nothing is lost. The status is still given twice, as the English gives it: "a heritage landmark rather than a working souq" and "no longer trades as a folk market". The owner's landmark ruling is therefore intact, and no fact was dropped or added.
- Did the edit make a new stumble? No. Without «bugün», «hizmet veriyor» in the present continuous still reads as current because «Günümüzde» opens the sentence.
- Neighbours checked: «Hüfuf'un tarihî şehir merkezini geliştirme çalışmaları kapsamında restore edildi» (subject «Bina», carried over from the sentence before); «El-Kaysariye Çarşısı yeniden inşa edildi, Zanaatkârlar Çarşısı da kuruldu» (the two souq names are byte-identical to their page titles; «da» is written apart as "also"); «Binaya ve tarihine dair … teyit edilmeyi bekliyor» (keeps the site's pending-confirmation sentence). All unchanged and sound. Letters ç, ğ, ı, ö, ş, ü and â (in «Zanaatkârlar») are correct, and no ASCII-stripped forms were found.
Fix: none.

## Verifier
RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)

Overall: three of three SOUND, no defect, nothing to fix.
