RESULT: must-fix=0 should-fix=3 note=10
1. SHOULD-FIX — N377's machine guard still names an ordinary phrase. The guard reads "none of «چکھنے اور خریداری کا حصہ», «کھجور کی مصنوعات کے حصے», «دستکاروں کے حصے (», «بچوں کا حصہ» occurs". tools/lib/rulings.mjs (guardClauses) reads this as four SUBSTRING bans, and they bind every later interface batch. Three of the four are specific collocations. «بچوں کا حصہ» is not: it is the everyday Urdu for "the children's share/section". The reference uses it in exactly that ordinary sense: ur.wikipedia exact phrase gives 2 pages, both inheritance ("children's share"; «حساب الفرائض», «اسلامی قانون وراثت»), HTTP 200, 2026-10-16, b22-ui/s5q-web.json. A later interface batch that needs "children's section" (a park, a map filter, a home card) would fail on it. The judge's round-2 note "Guards" says the machine clauses "name only exact withdrawn wordings". That is true of the wording, but this one is also an ordinary phrase, which the batch brief rules out ("scoped to the exact forms it withdraws", and none that would bind an ordinary phrase later). The r1 proof (item 3) accepted it; on the evidence above I do not. Ask (record only, no string moves): take «بچوں کا حصہ» out of the machine clause and make it proofreader-only on ev.kafu-nights.acts.1, e.g. "For the proofreader, not machine-read: ev.kafu-nights.acts.1 is «بچوں کے لیے مخصوص حصہ»". The other three forms can stay machine-read.
2. SHOULD-FIX — N353 (round 2) cites the proof's evidence selectively, and the owner line repeats the gap. The ruling, the «شاہ فیصل یونیورسٹی» entry source and the change-3 "why" give «شاہ عبد العزیز یونیورسٹی» 51 vs «جامعہ شاہ عبد العزیز» 3, and «شاہ سعود یونیورسٹی» 112 vs «جامعہ شاہ سعود» 8. The same file they cite (b22-ui/s5p-web.json, HTTP 200) also has «جامعہ ملک عبد العزیز» 33, «جامعہ ملک عبدالعزیز» 3, «شاہ عبدالعزیز یونیورسٹی» 3 and «جامعہ ملک سعود» 5. With these included, the class reads Saud 112:13 and Abdulaziz 54:39 (loan : native). The loan is still the majority form in every case, so the ruling's outcome stands, but not by "about 17:1". The notes' FOR THE OWNER line (7) also says "the native «جامعہ» unattested for this class", which is wrong: 33 + 8 + 5 + 3 + 2 pages carry it. The same file also records «جامعہ ام القری» 88 for a Saudi university that is not named after a king. That makes "king-named" the boundary the ruling depends on. Ask: N353, the entry's source field and owner line (7) give the full counts, say the loan is the majority form of the class (not that the native noun is unattested), and name the class boundary.
3. SHOULD-FIX — the termbase_final entry «حساوی چوغے کا میلہ» was not carried into round 2 and now contradicts N362 as amended. Its note ends "STAGE 7 (b22-ui, round 1): N362 B: in marks in running text (events.seoDesc), bare in titles". Round 2 classes events.seoDesc as a META DESCRIPTION where the name stands bare (N362, change 0), and the bisht name "stands bare everywhere" in this batch. A later stage reading this entry would put the bisht name in marks in a meta description, the thing round 2 withdrew. The other two entries round 2 touched («حساوی لیموں کی نمائش», «“کفو” کی راتیں») got a round-2 line; this one did not (s5q-stale.txt). Ask (record only): add "‖ STAGE 7 (b22-ui, round 2): N362 as amended — bare everywhere in this batch, events.seoDesc and its template description included; no running text here."
4. NOTE — evd.mapNone (N379 C), the judge's own wording, read hardest: «منتظمین نے ابھی اس تقریب کی جگہ کی ٹھیک ٹھیک نشاندہی نہیں کی، اس لیے یہاں نقشہ نہیں دکھایا گیا۔».
   - Grammar: ergative «نے» + the compound «نشاندہی کرنا» in the negative perfect, with the verb agreeing with the feminine object «نشاندہی» → «نہیں کی». Correct. «ابھی … نہیں» = "not yet", as EN "yet" / AR «بعد».
   - Meaning against EN "have not announced a precise location for this event yet, so no map is shown" and AR «لم تُعلن الجهة المنظّمة موقعاً دقيقاً لهذه الفعالية بعد، فلم نضع لها خريطة»:
     - Left: the verb "announce" (a public statement).
     - Entered: "point out / pinpoint". «نشاندہی» still describes the organisers communicating a spot, but it can also read as "have not yet identified/fixed the spot", which is slightly stronger than "not announced". It is within the source's scope; no fact is added.
     - "Precise" moved from the noun to the act («ٹھیک ٹھیک نشاندہی» = "pinpoint exactly"): same sense.
     - Seam: the clause before the comma now explains why no map is shown («… نشاندہی نہیں کی، اس لیے … نقشہ نہیں»), and it reads more naturally than either earlier wording. Under «نقشے پر» (evd.mapH) it reads cleanly. The named-venue contradiction left over is the template's (logged as a source defect, every language).
   - Spelling: the site's approved Urdu has neither «نشاندہی» nor «نشان دہی» (0 in src/ and tm.json, s5q-rul.txt). ur.wikipedia exact word: «نشان دہی» 2047, «نشاندہی» 567 (HTTP 200, s5q-web.json). Both are standard, and the spaced form is the reference majority. The exact collocations «ٹھیک ٹھیک نشاندہی», «جگہ کی نشاندہی» and «درست نشاندہی» returned 0 (the phrase search is strict).
   - N379's evidence has no line for candidate C. Record the spelling choice and these counts, as N376 and N381 recorded theirs. No text change asked.
   - Guard: the two withdrawn wordings, exact multi-word forms, 0 hits in the text, 0 on the site. In scope.
5. NOTE — events.seoDesc and ev.lomi.after.seoDesc (N362 amended), read in place.
   - events.seoDesc: «… سمیت: حساوی چوغے کا میلہ، القیصریہ کی راتیں، حساوی لیموں کی نمائش اور دوسری تقریبات۔» The three names now stand in one form, so the on-r1 item 3 (two quoted names round a bare one) is cured.
   - ev.lomi.after.seoDesc: «ہفوف میں حساوی لیموں کی نمائش کا تعارف: یہ ہر سال …» The name is byte-identical to the key, and «یہ … ہوتی ہے» agrees with the feminine «نمائش».
   - Against EN/AR: only the marks left. Nothing entered.
   - On the lomi page the h1, seo title and meta description are bare and the intro is marked. That is the split N362 rules, and it is what on-r1 item 3 noticed ("its heading doesn't"). By ruling; the fresh reader is the check.
   - Marks in the batch: 6 U+201C / 6 U+201D, in events.ctaD, ev.kafu-nights.name, .acts.2, .acts.3, ev.lomi.intro and ev.lomi.related.0.label. All are balanced, with no space inside.
   - N362's proofreader guard holds field by field: marked in ev.lomi.intro; bare in ev.bisht.name, ev.lomi.name, ev.lomi.after.seoTitle, events.seoDesc and ev.lomi.after.seoDesc.
6. NOTE — ev.kafu-nights.org «شاہ فیصل یونیورسٹی» (N353 A), read in place.
   - Card: «منتظمین: شاہ فیصل یونیورسٹی». The season-page organiser row matches.
   - The name is byte-identical to the termbase_final key and has no agreeing word. "King Faisal University" occurs once in the pack, so there is one Urdu for it.
   - events.srcNote names no university, so there is nothing to align.
   - Meaning: King Faisal University in both sources. Nothing entered or left. On the card, the seminary reading of «جامعہ» beside «رمضان المبارک» and «“غبقہ” کا کھانا» is gone.
   - The loan is admitted pending, in an entry that cites P16 (checklist item 9 passes on that entry).
   - Scope: N353 says "for this class of body" and "does not reopen «جامعہ» for Pakistani bodies". It does not say whether «یونیورسٹی» outside a name of the class (a free noun, "the university") is admitted. N125 (b) shows the line's way of writing this: the loan "inside this institution's name only". Worth one clause.
7. NOTE — N351's ground (round 2) and the rest of the record.
   - N351 now states its own ground and amends N16 (5), as the r1 proof asked.
   - N362 (round 2) cites P3c-labels for keeping meta descriptions bare, while N351 keeps «“کفو” کی راتیں» marked in the h1, crumb, card, seo title and the template meta description. The two agree only because the Kafu KEY itself carries the marks: P3c-labels asks for the name "bare, byte-identical to its termbase key", and the key includes U+201C/U+201D. N351 says "The key carries the marks" but not that this is how it meets P3c-labels.
   - N137's guard ("a quoted title passes only where it is a glossed key", stage checker for attraction titles) is also not answered for this unglossed key.
   - N351's candidate B still reads "(as N137 lets a registered key stand quoted in a title)". That is history, but it is the ground round 2 dropped.
   - Suggest one sentence in N351: it meets P3c-labels through its key, and it is an exception to N137's quoted-title rule for this key only. No text change.
8. NOTE — N362's reach in later batches. "N286's scope is widened only to running text that the Arabic does not quote" reads as general, but "binds" lists only b22 strings. The ruling does not say whether the widening covers the bisht name «حساوی چوغے کا میلہ» in a later batch's running text (an attraction body naming the festival), or only the lomi exhibition. One clause would settle it.
9. NOTE — every machine guard of the round-2 calibration, read the way the tool reads it (guardClauses, s5q-scan.txt), with hits in the r2 text and on the approved site (src/ + tm.json):
   - N351: «کفو کی راتیں», «کفو کا تفاعلی باورچی خانہ»
   - N353: «جامعہ شاہ فیصل»
   - N355: «چوغوں کا تفاعلی بازار», «کفو کا تفاعلی باورچی خانہ»
   - N365: «اپنے موسم کو مکمل سفر بنائیں»
   - N377: four forms (item 1)
   - N378: «کھانے پینے کی 150 سے زیادہ گاڑیاں»
   - N379: two forms
   - N381: «سب کے سامنے کھانا پکانا»

   Each is 0 in the text and 0 on the site. All are exact withdrawn wordings, and all but «بچوں کا حصہ» (item 1) are specific enough not to catch an ordinary later phrase. N376's new guard yields NO machine clause: the words "is «متوقع وقت»" match no clause pattern, including the "<h> am/pm is «…»" one, which is read from the ruling text only. N352, N354, N356–N364 and N380 are proofreader-only and hold in the text. The checker (re-run by this pass, check file rewritten byte-identical) reads 36 guard clauses and 32 retired keys across the round, with 0 findings.
10. NOTE — names and retired keys.
   - All 30 termbase_final keys stand letter for letter in the strings that carry them. «ڈراما» stands as its recorded plural «ڈرامے».
   - Retired «کفو کی راتیں» (N351) and «جامعہ شاہ فیصل» (N353): 0 in the text, not keys in termbase_final. Each is named only inside its replacement's note, for search.
   - «شاہ فیصل یونیورسٹی» is live again: no longer listed as retired, and back in termbase_final. The tool's roundRulings confirms it is not among the 32 retired keys.
   - Same English → same Urdu over all 167 ids: one Urdu per repeated English, except "Festivals & Events" (events.title / evd.crumb, ruled N368).
11. NOTE — the r1 proof's should-fix items, checked in text and in the record.
   - (1) N353: text back to «شاہ فیصل یونیورسٹی» (change 3); ruling re-made; guard and retired key swapped; the entry carried with a round-2 line; «جامعہ شاہ فیصل» dropped from termbase_final. RESOLVED, save the completeness of the evidence (item 2).
   - (2) The marks: text, both meta descriptions bare (changes 0, 1). Record: N351 states its own ground and its amendment of N16 (5); N362 is amended and records the bisht template description as bare by design. RESOLVED, save the stale bisht entry (item 3) and the coherence note (item 7).
   - (3) N376: the machine clause is withdrawn and the tool reads none. RESOLVED.
   - Notes 7, 8, 11 and 14 of r1 were carried (the «پنڈال» source, the «میلہ» note listing ctaH, the lomi entry, the N359 and N365 lines). One exception: proof_rulings n=14 says "the «جامعہ شاہ فیصل» source field states its build (0 pages)", but that entry no longer exists in round 2. Moot, but the record describes a change that was not made.
12. NOTE — the judge's scores. All eleven page sums match (list 91, bisht 93, qaisariyah 95, kafu 90, dates 91, palm 91, lomi 92, uqair 95, wafrah 92, horse 91, creative 92). Batch = lowest = 90 = threshold: APPROVE. blind_reader_rulings 1–63 and proof_rulings 1–18 are each ruled once, and every change_ref points at the change it names (0, 1 seoDesc; 2 mapNone; 3 org). The note "Fit -1 on the four mapNone pages and Wafrah" does not explain fit 9 on the events list and on hasawi-bisht-festival, which carried 9 in round 1 as well. Cosmetic; the batch score is not affected.
13. NOTE — the eleven-item checklist on the r2 text (167 strings, 6271 code points; own scripts b22-ui/s5q-scan.mjs, s5q-stale.mjs, s5q-rul.mjs, s5q-web.mjs).
   - (1) Letterforms: regex [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3 U+00A0 U+06F0–06F9 U+0660–0669] over every string finds none. termbase_final keys and plurals, and every guard form: none. The one hit in the re-worded record is the Arabic quotation «موقعاً دقيقاً» in N379 (U+064A, by design). Code points in the strings: Urdu letters, U+064B (tanwin of «تقریباً»/«اندازاً»), ، ؟ ۔ “ ” and ↗ only.
   - (2) Names: keys byte for byte; no Latin name; no pleonasm.
   - (3) Grammar: the four changed strings are correct (items 4–6).
   - (4) Address: no «تم», no pronoun «تو».
   - (5) Headings: no final «۔», no gloss.
   - (6) Termbase: 100% in the text. The record items are 1–3.
   - (7) Punctuation: Urdu marks only; ASCII only «: ( )» and digits; no Latin full stop; no double space, no space before «۔ ،», no repeated word except the reduplication «ٹھیک ٹھیک».
   - (8) Digits: unchanged.
   - (9) Loans: «یونیورسٹی» only inside the entry citing P16; «اسٹیج ڈرامے» as admitted pending (N354); «نشاندہی» is native.
   - (10) No gloss added.
   - (11) 167 ids; {n} once each in cd.pre.other and cd.left.other; ↗ kept in ev.shop and events.mapK.
   - Strings read in place: the 4 changed (items 4–6), with their seams in evd.mapH, the ten season-page descriptions built from the ur template and the eleven card blocks (s5q-scan.txt).
   - Checker: RESULT [b22-ui 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 0 note(s) | 1 unit (interface), 167 strings, 6271 code points | changes=4 over 4 leaf(s) | scores 90 batch_score=90 threshold=90 decision=APPROVE | rulings=63 proof_rulings=18 | termbase_final=30 | selftest PASS.
