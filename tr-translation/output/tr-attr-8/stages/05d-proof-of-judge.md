# tr-attr-8 — independent proofread of the judge's round-1 edits (05d)

## Checker
`RESULT [OK] 0 findings (full text: 07-judge.r1.json.check.txt)` (verify.mjs tr-attr-8 stages/07-judge.r1.json --prev stages/05-proofreader.json)

## 1. Change log integrity
- 39 strings in both files. Strings differing from stage 05: exactly `kanzan-park.body` and `musa-park.summary`; the other 37 are byte-equal.
- Both `changes[].before` equal the stage 05 string; both `after` equal the judge's string.
- No U+00A0, no «», no straight quotes, no Markdown in any of the 39 strings; the only non-letter non-ASCII characters in the two edited strings are “ ” (U+201C/U+201D).

## 2. kanzan-park.body — last clause
05: «…sürüyor; tam işletmeye geçiş henüz teyit edilmedi.»
07: «…sürüyor; parkın tamamen hizmete girmesi henüz teyit edilmedi.»

- Grammar: «parkın tamamen hizmete girmesi» is a genitive plus possessive verbal noun, and it is the subject of «teyit edilmedi». That is well formed. Harmony is correct («parkın», «girmesi»), the letters are right, and «tamamen» modifies the verbal noun correctly.
- Who does the verb: the explicit subject «parkın» takes over from «Projenin kalan inşaat aşamaları», so the last clause does not hang on the previous sentence's subject (lesson 1).
- Repetition: «kısmen hizmete girdi» (sentence 4) and «tamamen hizmete girmesi» (last clause) is the intended partial-versus-full scale, not a stutter. Different forms, two sentences apart. Acceptable.
- Faithfulness: English «full operation is yet to be confirmed». The Turkish keeps the hedge «henüz teyit edilmedi», which is page-local P6 as the judge ruled. It adds no fact and does not change the tense, and it does not present the park as open. The park stays «inşa ediyor» and «kısmen».
- Minor, not an error: «hizmete girmesi» reads slightly more literally as «entering service» than «full operation». It is the same sense and the page's own verb, so this is a choice, not a defect.
- Verdict: **OK**.

## 3. musa-park.summary
05: «Müberrez'in El-Faysal mahallesinde, “Birlikte Oynuyoruz” girişiminin parçası olan aile parkı; parkta kapsayıcı oyun ekipmanları engelli çocukları akranlarıyla buluşturuyor.»
07: «Müberrez'in El-Faysal mahallesinde bir aile parkı, “Birlikte Oynuyoruz” girişiminin parçası; parkta kapsayıcı oyun ekipmanları engelli çocukları akranlarıyla buluşturuyor.»

- Appositive: «[Müberrez'in El-Faysal mahallesinde bir aile parkı], [“Birlikte Oynuyoruz” girişiminin parçası]; …» is a well-formed verbless lead line.
  - The first noun phrase is a locative modifier plus an indefinite head, which matches the English «A family park in the Faisal district of Al-Mubarraz».
  - The second is a possessive-suffixed appositive («girişiminin parçası»), a normal Turkish pattern.
  - The sentence matches the published pattern of koot-park.summary («…bir belediye bahçesi; … programının bir parçası») and the English apposition.
  - No verb is needed in the lead. The semicolon then opens a finite clause, as in 05.
- Who does the verb: unchanged. «parkta» keeps the park as the place and the equipment as the subject of «buluşturuyor» (lesson 3).
- Harmony and suffixes: «Müberrez'in», «mahallesinde», «girişiminin», «parçası» and «akranlarıyla» are all correct.
- Faithfulness: same elements and same order as the English («part of» is the English's own order). Nothing is added or dropped. «engelli çocuklar» respects the disability wording ruling. The programme name is in “” as in 05.
- Length: 171 characters against the ~160 guide (05 was 172, so the edit is one character shorter). The English source is 169. There is no hard limit in the checker (0 findings). OPTIONAL only, and not caused by this edit.
- Residual note: the new text has «bir» only on «aile parkı», so the apposition after the comma could be read by a slow reader as a second item of a list («a family park, [and] the initiative's part»). The «;» and the following «parkta» resolve this, and koot-park.summary has the same shape. Not an error.
- Verdict: **OK**.

## Verdict counts
- kanzan-park.body: OK
- musa-park.summary: OK
- OK 2 · MANDATORY 0 · OPTIONAL 0 (the summary length of 171 against the ~160 guide is noted above, pre-existing, and not an edit defect).

## MANDATORY items
None.
