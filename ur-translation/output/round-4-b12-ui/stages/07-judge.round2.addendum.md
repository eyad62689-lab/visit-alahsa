# b12-ui — judge's addendum to round 2 (no text change)

Read for it: `07-judge.round2.json` (unchanged), `05p-proof.on-r2.md` (must-fix 0, should-fix 2, note 7). Written: this file and `07-judge.round2.addendum.json` (the machine-readable corrections). No other file was written.

## RESULT
No text change. The round-2 text stands: the lead is letter for letter the stage-5 text, and its blind input is byte-identical to on-05 (text_sha256 9b84b877…233a, proof item 3). Score 93 and APPROVE unchanged: the proof finds the clause faithful (item 3) and the text clean (items 4–6). Its two should-fix items concern the record, and no point turns on the record. Two calibration entries are corrected (N182, N185). The corrected fields replace the same fields of round 2.

## 1. Proof items
1. **applied** — N185's guard and ruling are tied to whether «فارم» is qualified, not to whether it stands beside another noun. Corrected wording in section 2.
2. **applied** — N182's condition (2) is restated in N47's own terms (any field of the rendered page, including one behind a tap). Corrected wording in section 2.
3. **kept** — The clause is faithful and agreement is right. The on-05 blind read covers exactly this text. Nothing to do.
4. **kept** — The letterform scan is clean (168 code points), and the change replays. Nothing to do.
5. **kept** — All eleven checklist items PASS. Nothing to do.
6. **kept** — Names and neighbours are byte-identical to their keys and approved pairs, and the N190 guard holds. Nothing to do.
7. **applied** — The loose cross-references are corrected in section 3 (record only).
8. **kept** — N190's repeated "never «گائیڈ»" is redundant, not contradictory. Left as written.
9. **kept** — The calibration entries, quotations and counts were read one by one. Nothing beyond items 1, 2 and 7.

## 2. Corrections (complete replacement text; also in the .json)

### N182 — ruling
A. An interface lead that says 'the oasis' as its source does keeps the bare «نخلستان» on two conditions. (1) The same sentence names «الاحساء». (2) N47-the-oasis-on-a-page-that-has-not-named-it is met on the page, in its own words: «الاحساء کے نخلستان» / «الاحساء کا نخلستان» stands in at least one field of the rendered page, including one behind a tap (a closed group, a collapsed card). On this index that field is the bird-garden card «الاحساء کے نخلستان کے ماحول میں ایک باغ،». It sits in the farms group, which is closed when the page opens, and it counts. Condition (1) never stands in for (2). B (the oasis named in the lead, 'Al-Ahsa' at the close becoming 'here') is not needed here.

### N182 — guard
For the proofreader, not machine-read. A lead with the bare «نخلستان» names «الاحساء» in the same sentence, AND N47 holds for the page: at least one field of the rendered page, including one behind a tap, names «الاحساء کے نخلستان» / «الاحساء کا نخلستان». What is visible at first view is not the test. If no field of the rendered page names it, the lead takes B's form.

Reason: round 2 said "a field shown on it" / "the page shows". The only field naming the oasis on this index is the bird-garden card, which sits in the farms group, closed when the page opens (blind-input line 134, marked ↻). A proofreader reading "shown" as "visible at first view" would find no naming and would impose B on approved text. N47 counts fields of the page, not what is visible, and this wording is N47's own.

### N185 — ruling
A. N5's qualifier «زرعی» is owed where «فارم» stands UNQUALIFIED as a label or a list item, as in nav.leisure «بازار، تفریح گاہیں اور زرعی فارم», where two readers read the bare word as the form one fills in. It is not owed where a possessive or an attribute already qualifies the word, because that context fixes the sense. Here «فارموں» is qualified by «نخلستان کے» («نخلستان کے باغوں اور فارموں»), so the bare oblique stands. This is the ground of the approved texts too: «زکی السالم کا فارم», «اسٹرابیری کا فارم», and «… کاشت کرنے والے سب سے بڑے فارموں» on zaki-alsalem-farm. The kind of string (lead, meta description, heading) does not decide it. A string ruled a meta description under N184 is not, by that alone, owed the qualifier. This agrees with N5 and changes none of its forms.

### N185 — guard
For the proofreader: «زرعی» before «فارم» where the word stands unqualified as a label or a list item (N5: nav.leisure, the farm-group label «زرعی فارم اور کھجور کے باغات»). It is not required where a possessive or an attribute qualifies it («… کا فارم», «نخلستان کے … فارموں», «… والے … فارموں»). A bare «فارم» as a label or list item is a finding; a qualified one is not.

Reason: the round-2 guard ("stands alone … beside another noun of the same list, it is not required") would pass a label «بازار، تفریح گاہیں اور فارم», where «فارم» is a list item beside other nouns. That is the exact case N5 was written for. It could also be read to demand «زرعی» in the approved headings «زکی السالم کا فارم» and «اسٹرابیری کا فارم». The ground that holds on every string is qualification: bare and unqualified in a label or list → «زرعی»; qualified by a possessive or attribute → bare. The corrected entry stands alone and contradicts neither N5 nor the approved titles.

## 3. Cross-references (proof item 7, record only)
- The eleven `source_defects` entries carried over from round 1 cite their items in on-05 numbering. Read "(item 5)" … "(item 31)" in those entries as "on-05 item 5" … "on-05 item 31". The twelfth entry (the tasting invitation) is on-r1 item 3, as it says.
- Round 2 `blind_reader_rulings` n=18 says the filing of «“ارض الحضارات”» "is logged with item 23". Read it as logged in the `source_defects` entry "src/lib/categories.ts: zoo, bird gardens, Land of Civilizations (on-05 item 14)". Ruling 23 itself covers the zoo and the bird garden only.
