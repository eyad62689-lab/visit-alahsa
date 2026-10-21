# Proofread r2 — ur-home-1 (judge round 2 edits)

Scope: (a) the strings that differ between `judge-r1.json` and `judge-r2.json`; (b) `base_amendments`; (c) rulings N620–N625 and the round-2 amendments to N610–N612.

Diff computed by script over `strings`: **6 keys differ**, and they are exactly the six `judge_edits` of round 2: gate.skip, water.lead, qarah.drag, map.lead, tpl.heritage-2.title, tip.friends. No key added or missing. `node verify.mjs . judge-r2.json` prints ✓ (88 strings, 3 termbase entries, 50 notes).

**Totals: 2 MANDATORY, 3 RECOMMENDED.**

---

## (a) The six changed strings

### Mechanical checks: PASS
- **Letterforms.** Regex `[يكةهىأإۃ]`, U+00A0, U+06F0–06F9, U+0660–0669 over the six strings: **none**.
- **Punctuation.** Sentences close with `۔` (water.lead, qarah.drag, map.lead ×2, tip.friends). gate.skip (button) and tpl.heritage-2.title (title) have no final stop. No `؛`, `«»`, straight `"`, Latin `.` or `,`; no leading/trailing whitespace.
- **آپ forms / button pattern.** سرکائیں، دیکھیں، محفوظ کریں، جائیں: all -یں. No تم / تمہارا / تیرا.
- **Published names.** جبل القارہ، جبل الاربع، ہفوف verbatim; خیمہ زنی is the published arbaa wording (tm.json: arbaa summary and body).
- **TM.** No tm.json pair has the English of any of the six keys; nothing overridden.

### Per string
| key | verdict | note |
|---|---|---|
| map.lead | PASS | «سیاحتی مقامات (m. pl.) … دکھائے گئے ہیں»; «جگہوں» plural agrees; quantifier gone (M1 of r1 resolved, exact form). |
| water.lead | PASS | «ذخیرہ (m.) … کی پرورش کرتا ہے»; پرورش f. takes «کی»; «پانی» no longer repeated; «سیراب» stays water.springsL's alone. Figurative like «يغذّي», no added fact. |
| qarah.drag | PASS | «تصویر پر لگی پٹی» (پٹی f. → لگی); ticks فجر / غروب آفتاب unchanged. |
| tpl.heritage-2.title | PASS | «مشرقی دیہات» marks the plural of «القرى الشرقية»; published form (tm.json «الاحساء کے مشرقی دیہات»; termbase N30 «مشرقی دیہات میں»). No village named. |
| tip.friends | PASS | «خیمہ زنی اور تفریحی سفر کیے جا سکتے ہیں»: masculine plural with mixed-gender conjuncts is the standard agreement; «سیر» no longer repeated; no loan (P16). |
| gate.skip | **MANDATORY M1** | see below. |

---

## MANDATORY

### M1. gate.skip: «سیدھے» now parses as an adjective of «سفر» ("a direct trip")
- Judge's text: «سیدھے سفر کی منصوبہ بندی پر جائیں».
- Source: en "Skip to planning"; ar «انتقل إلى التخطيط».
- In round 1 «سیدھے منصوبہ بندی پر» could only be adverbial: «منصوبہ بندی» is feminine, so an adjective would have to be «سیدھی». The edit puts the masculine noun «سفر» in the oblique («سفر کی») directly after «سیدھے», and «سیدھے» now agrees with it perfectly as an adjective. The first parse becomes «[سیدھے سفر] کی منصوبہ بندی» = "planning of a direct/straight journey" («سیدھا سفر» is an ordinary collocation, like «سیدھی پرواز»). That is a reading the source does not have, and N622 itself says «سیدھے» is kept *adverbial*. The edit breaks the condition its own ruling states.
- **Exact form:** «سفر کی منصوبہ بندی پر سیدھے جائیں». The adverb stands before the verb and cannot attach to «سفر». The object «سفر کی» that N622 wanted stays. The button pattern (-یں) holds, and no page is promised.
- N622's ruling sentence should quote the new form and add: "«سیدھے» stands before the verb: before «سفر» it reads as the adjective of «سیدھا سفر»."

### M2. base_amendments N336: the `after` rewrites the owner's 2026-10-17 text in place instead of adding a dated line
- **`before` = current termbase `N336.ruling`, byte for byte: PASS.** Checked with a script: strict equality, 1648 = 1648 characters.
- **What the `after` changes.** It is one span inside the «OWNER DECIDED 2026-10-17:» block, before the «‖ JUDGE (amend, 2026-10-17)» line:
  - before: «, the approved «تجویز کردہ راستہ» pair of the home page»
  - after: «; the «تجویز کردہ راستہ» pair of the old home page retired with that page by N612, ur-home-1, 2026-10-21, which takes N336 as an analogy and does not reopen visa-guide»
- **The content is right:** it does carry the cross-reference that r1 M2 asked for. **The placement is wrong**, on the same ground that made r1 M2 mandatory (the owner's record must not carry words he did not write):
  - The amendment deletes «approved» from the owner's decision text. The pair *was* approved on 2026-10-17.
  - It puts a 2026-10-21 event inside a block headed «OWNER DECIDED 2026-10-17».
  - The termbase's own convention for later changes is a dated line appended after «‖»: N336's own «‖ JUDGE (amend, 2026-10-17)», N175's «‖ ROUND 2» / «‖ ADDENDUM», and N243's "amended in place with a dated line".
- **Exact `after`:** the `before` text unchanged, followed by:
  `" ‖ RECORD (ur-home-1, judge r2, 2026-10-21): the «تجویز کردہ راستہ» / «اپنا راستہ خود ترتیب دیں» pair of the home page, named above as approved, retired with the old home page by N612, which takes N336 as an analogy and does not reopen visa-guide. N336's decision, its guard and every visa-guide string (incl. «سفر کا بنا بنایا راستہ») are unchanged."`
- The `why` stands as written.

---

## (c) Rulings N620–N625 and the amendments to N610–N612

I searched the termbase for each ruling's terms: تجویز کردہ راستہ، دیہات، گاؤں، خیمہ زنی، کیمپنگ، تفریحی، سیر و تفریح، P3c, P16, P19. **No contradiction with a standing ruling.**

- **N610 (amended): PASS.** Restated as a cost, as r1 R1 asked. It is consistent with N600's evidence: «خود بخود» was the artesian component, and its loss is now recorded as a cost. Its binds carry the cost with the form.
- **N611 (amended): PASS.** «لگی» is accepted. The binds are narrowed as r1 R5 asked. It refuses «سلائیڈر» under P16.
- **N612 (amended): PASS.** The ground is r1 M2's sentence verbatim, and N336 is cited as analogy, not precedent. See R1 below for one word.
- **N620: PASS.** It applies P19 (an absolute is a claim, so the Arabic must carry it). Its binds («ہر» / «تمام» only where the source carries them) do not touch any standing ruling.
- **N621: PASS.** It keeps the approved image and records the cost and a fallback, in line with the N175 pattern.
- **N622: the ruling is sound, but its form fails its own adverbial condition.** See M1.
- **N623: PASS.** It agrees with N76: «گاؤں» needs a plural verb to show the number, and a title has none. It also agrees with N30's published «مشرقی دیہات».
- **N624: PASS.** It agrees with P16 (no «کیمپنگ»), with the published arbaa wording «خیمہ زنی», and with N221, which governs «تفریحی پارک» only.
- **N625: PASS.** It agrees with P3c (1) and (2), with P3c-labels, and with N73: N73 cites «سوق القیصریہ نامی بازار» as the *body* form of P3c (2), not as a form for a home page.

---

## RECOMMENDED

### R1. N612: "it decided the visa routes only" understates N336's binds
- N336 binds "every later string that names a regulatory route or option".
- Suggested wording: "N336 is an analogy here, not a precedent: it decided regulatory routes (the visa routes and later regulatory options), not itineraries."
- No string moves.

### R2. tm.json still offers the retired old-home pair
- `memory/tm.json` still holds these entries (page ui, 2026-10-12):
  - "Suggested route" → «تجویز کردہ راستہ» (`home.route.eyebrow`)
  - "Arrange your own route in “My saved places”" → «“میرے محفوظ کردہ مقامات” میں اپنا راستہ خود ترتیب دیں» (`home.route.link`)
- When N612 is applied, the coordinator should mark them retired with the old home, citing N612, so that a later TM match does not bring them back.
- Neither entry matches any English string in this pack.

### R3. tip.friends: two renderings of the root «رحلات» (note only)
- «الرحلات البرية» is rendered «صحرا کی سیر», which matches the published arbaa wording. The second «رحلات» is rendered «تفریحی سفر».
- This is acceptable, and it is what removed the repeated «سیر». It should be recorded in N624 as a deliberate split, so that a later page does not merge the two again.
