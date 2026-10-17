# visa-guide (ur) — judge, loop 2

Responds to `ur-08-loop2-edit.json` (stage 2: 12 strings for the five RETURN tasks), `ur-09-loop2-proof.json` (11/11 PASS, 0 fixes) and `blind-reader-3.md` (37 items, a fresh reader). Nothing is written in `src/`, `memory/` or `glossary/`; `judge.json` carries the same content under `loop2` (loop = 2).

## 1. Stage 2's text, verified

- Changed by stage 2: 12 strings (seo.title, h1, lead, updatedLine, table.rows.1.1, table.rows.6.3, routes.tourist.who.text, routes.gcc.who.text, routes.umrah.who.text, routes.package.who.text, faq.items.0.q, faq.items.0.a); the other 126 are byte-identical to the approved loop-1 text (script diff).
- Every locked form stands at the same count: «دورے کا ویزا» 6, «راستہ» 7, «خارجہ امور کی وزارت» 8, «سیاحت کی وزارت» 3, «حج اور عمرے کی وزارت» 1, «ٹرانزٹ» 4, «ای ویز» 6, «الیکٹرانک سفری اجازت نامہ» 3, «سعودی ایئرلائن» 3, «وزٹ سعودی» 1, «مدد والے حصے» 1, «ریل گاڑی» 3, «[نقشہ](/en/map/)» 1, «خلیجی ممالک میں مقیم افراد» 2, «خلیج تعاون کونسل» 8, «“[کیسے پہنچیں]» 1, «“[میرے محفوظ کردہ مقامات]» 1.
- «کارآمد» for "valid" remains in 0 strings (kept only in its "covers" sense, routes.tourist.who.text); seo.title 58 ≤ 60, seo.description 160.
- Verdict: the twelve strings do the five tasks and touch nothing locked.

## 2. Score and decision

| axis | loop 1 | addendum | loop 2 |
|---|---|---|---|
| accuracy | 28 | 28 | 28 |
| nativeness | 26 | 24 | 26 |
| termbase_orthography | 18 | 18 | 18 |
| traveller_fit | 8 | 8 | 8 |
| structure | 10 | 10 | 10 |
| **total** | 90 | 88 | **90** |

- **Decision: APPROVE** (threshold 90). The six loop-2 strings (table.rows.6.3, routes.umrah.who.text, routes.package.who.text, arrive.land, links.rows.8.org, next.items.4.parts) take a proof pass and a fourth blind read before apply; a meaning fault on any of them returns that string to its loop-2 "before" text, which was proofed and read.

From the addendum's 88 (accuracy 28, nativeness 24, termbase 18, fit 8, structure 10). Stage 2's twelve strings discharge the five RETURN tasks and the third reader raises none of them again: no remark on «میعاد» (the «کارآمد»-for-valid charge is lifted), none on «آخری ترمیم» (the updated-line charge is lifted), none on the restored verb of the four groups beyond the source's own triple question (SD10), none on seo.title / H1. The judge's six loop-2 strings lift the remaining charges the Urdu could cure: «مجاز خدمات …» (three readers), «عمومی ادارہ» (three), the bare «وزٹ سعودی» (two on the edited text), «بنا بنایا راستہ» (three). New charges of the Urdu's own, each light and none reaching a misreading that survives the clause: the subjectless «طے ہوتی ہیں» cells (two readers), «پیکجوں» (two), the verbless package fragment (two), the colloquial «مدد والے حصے» (two), the generic reading of «سعودی ایئرلائن» (already charged). Items answered by a locked ruling or a raised owner decision («دورے کا ویزا», «راستہ», the ministries, «ریل گاڑی», the UNESCO pair, «نسک») are not deducted twice (the coordinator's rule; b10 precedent). Nativeness 24 → 26. Accuracy stays 28: the loop-2 edits cost half a point each for «ادارے» (providers → organisations) and the Arabic's «العامة» not rendered, against "interactive" (−1) and «ویب سائٹ» for platform (−0.5) already counted; they round to 28. Termbase/orthography 18 (every guard clean; the five press-attested loans unchanged; one entry key moves to its recorded alternative). Fit 8: the third reader's largest complaints — which route is a Pakistani's, the GCC contradiction, Nusuk, the 90-day cell, the family host — are the source's and take no point; what the Urdu costs him («نسک» cold, the two GCC forms, «سعودی ایئرلائن» generic) is charged. 28 + 26 + 18 + 8 + 10 = 90 ≥ 90 → APPROVE, on the condition stated: the six loop-2 strings take a proof pass and a fourth blind read before apply; if that read faults any of them on meaning, the fallback for each is its loop-2 "before" text.

## 3. Loop-2 edits (6 strings — proof pass and a fourth blind read before apply)

- **table.rows.6.3**
  - before: «مجاز خدمات دینے والے»
  - after: «خدمات دینے والے مجاز ادارے»
  - why: b3-13 (three readers of three: b1-26, b2-16, b3-13): «مجاز خدمات دینے / فراہم کرنے والے» was parsed as "those giving permitted services"; the reader this route is for calls it the most opaque word on the page. «خدمات دینے والے مجاز ادارے» puts «مجاز» on its referent (the providers) and gives the participle a head noun; "licensed" (EN) / «معتمدون» (AR) and "service" are kept, no agent, no list of who licenses. Cost on record: «ادارے» (organisations) narrows "providers" to entities — charged under accuracy. The reader's «ایجنٹ» is a loan and a fact. NEEDS a proof pass and a fourth blind read before apply. Cell: no stop.

- **routes.umrah.who.text**
  - before: «ان کے لیے جو مجاز خدمات دینے والوں کے پیکجوں کے ذریعے عمرہ ادا کرنا چاہتے ہیں۔ خلیج تعاون کونسل کے ممالک کے شہریوں اور وہاں مقیم افراد کے لیے، اور ہر قسم کا ویزا رکھنے والوں کے لیے، نسک ایسے پیکج بھی پیش کرتا ہے جن میں ویزے کی ضرورت نہیں ہوتی۔»
  - after: «ان کے لیے جو خدمات دینے والے مجاز اداروں کے پیکجوں کے ذریعے عمرہ ادا کرنا چاہتے ہیں۔ خلیج تعاون کونسل کے ممالک کے شہریوں اور وہاں مقیم افراد کے لیے، اور ہر قسم کا ویزا رکھنے والوں کے لیے، نسک ایسے پیکج بھی پیش کرتا ہے جن میں ویزے کی ضرورت نہیں ہوتی۔»
  - why: b3-13 (three readers of three: b1-26, b2-16, b3-13): «مجاز خدمات دینے / فراہم کرنے والے» was parsed as "those giving permitted services"; the reader this route is for calls it the most opaque word on the page. «خدمات دینے والے مجاز ادارے» puts «مجاز» on its referent (the providers) and gives the participle a head noun; "licensed" (EN) / «معتمدون» (AR) and "service" are kept, no agent, no list of who licenses. Cost on record: «ادارے» (organisations) narrows "providers" to entities — charged under accuracy. The reader's «ایجنٹ» is a loan and a fact. NEEDS a proof pass and a fourth blind read before apply. Oblique plural «اداروں»; the Nusuk sentence untouched (SD12).

- **routes.package.who.text**
  - before: «بھارت، پاکستان، بنگلہ دیش، انڈونیشیا، مصر، اردن اور میکسیکو کے پاسپورٹ رکھنے والوں کے لیے، پرواز اور رہائش کے ایسے پیکج کے ذریعے جو کسی مجاز خدمات دینے والے سے لیا جائے۔»
  - after: «بھارت، پاکستان، بنگلہ دیش، انڈونیشیا، مصر، اردن اور میکسیکو کے پاسپورٹ رکھنے والوں کے لیے، پرواز اور رہائش کے ایسے پیکج کے ذریعے جو خدمات دینے والے کسی مجاز ادارے سے لیا جائے۔»
  - why: b3-13 (three readers of three: b1-26, b2-16, b3-13): «مجاز خدمات دینے / فراہم کرنے والے» was parsed as "those giving permitted services"; the reader this route is for calls it the most opaque word on the page. «خدمات دینے والے مجاز ادارے» puts «مجاز» on its referent (the providers) and gives the participle a head noun; "licensed" (EN) / «معتمدون» (AR) and "service" are kept, no agent, no list of who licenses. Cost on record: «ادارے» (organisations) narrows "providers" to entities — charged under accuracy. The reader's «ایجنٹ» is a loan and a fact. NEEDS a proof pass and a fourth blind read before apply.

- **arrive.land**
  - before: «بحرین سے زمینی راستے سے: شاہ فہد پل سے ہو کر۔ سفر سے پہلے پل سے داخلے کی شرائط [شاہ فہد پل کے عمومی ادارے](https://kfca.sa/en/) کی ویب سائٹ پر دیکھ لیں۔ ہر سرحدی گزرگاہ سے داخلے کی شرائط [وزٹ سعودی کے مدد والے حصے](https://www.visitsaudi.com/en/help-center) میں دیکھ لیں۔»
  - after: «بحرین سے زمینی راستے سے: شاہ فہد پل سے ہو کر۔ سفر سے پہلے پل کے راستے داخلے کی شرائط [شاہ فہد پل کے ادارے](https://kfca.sa/en/) کی ویب سائٹ پر دیکھ لیں۔ ہر سرحدی گزرگاہ سے داخلے کی شرائط [وزٹ سعودی ویب سائٹ کے مدد والے حصے](https://www.visitsaudi.com/en/help-center) میں دیکھ لیں۔»
  - why: b3-25 (three readers of three on «عمومی ادارہ»: b1-39, b2-30, b3-25 — a calque of «مؤسسة عامة» that no reader took for a body's name; the loan «اتھارٹی» stays refused, P16): the entry's own recorded alternative, «شاہ فہد پل کا ادارہ» — the English source's name ("King Fahd Causeway Authority") — in its oblique «شاہ فہد پل کے ادارے»; the Arabic's «العامة» is recorded in the entry for search (cost charged under accuracy: one word of the Arabic name not rendered). b3-25: «پل کے راستے داخلے کی شرائط» ("entry by way of the causeway") for «پل سے داخلے», the reader's idiom, same sense. b3-26 (two readers of two on the edited text: b2-30, b3-26 read «وزٹ سعودی» as a verb phrase): «وزٹ سعودی ویب سائٹ کے …» marks the brand as a name by the generic the link opens (visitsaudi.com is the website; «ویب سائٹ» is the admitted loan the page already uses for the platforms); no Latin «(Visit Saudi)» (no Latin letters in Urdu text). «مدد والے حصے» kept (N89's frame). Both hrefs byte-identical. NEEDS a proof pass and a fourth blind read before apply.

- **links.rows.8.org**
  - before: «شاہ فہد پل کا عمومی ادارہ»
  - after: «شاہ فہد پل کا ادارہ»
  - why: b3-25: the authority column takes the same name as arrive.land (one name, one form); the termbase key moves from «شاہ فہد پل کا عمومی ادارہ» to «شاہ فہد پل کا ادارہ». Cell: no stop. NEEDS a proof pass and a fourth blind read before apply.

- **next.items.4.parts**
  - before: «جو پسند آئے اسے “[میرے محفوظ کردہ مقامات](/en/plan/)” میں محفوظ کر لیں، اور آپ کو بنا بنایا راستہ مل جائے گا۔»
  - after: «جو پسند آئے اسے “[میرے محفوظ کردہ مقامات](/en/plan/)” میں محفوظ کر لیں، اور آپ کو سفر کا بنا بنایا راستہ مل جائے گا۔»
  - why: b3-32 (three readers of three on «بنا بنایا راستہ» after a page of visa routes: b1-43, b2-31, b3-32): «سفر کا» names what the ready-made route is a route of — the trip — which is what the saved-places feature makes (the approved home.route.link pair: «اپنا راستہ خود ترتیب دیں»); the tm.json word «راستہ» stays, «منصوبہ» (the site's "plan") is not written; no fact enters. The save/saved echo and «مل جائے گا» are the source's. href byte-identical. NEEDS a proof pass and a fourth blind read before apply.

Checks re-run on the final 138 strings: arabic_letterforms PASS, non_latin_digits PASS, semicolon_nbsp_bidi_tatweel_izafat PASS, do_chashmi_he_only_on_aspirates PASS, hrefs_byte_identical PASS, no_latin_outside_hrefs_and_domain_cells PASS, punctuation PASS, address_aap_only PASS, banned_loans_and_forms PASS, kaaramad_only_in_covers_sense PASS, figures_match_source PASS, seo_lengths PASS, structure PASS, P3c_souq_nami_first PASS, locks_kept PASS — overall PASS.

## 4. Third reader, items 1–37

| n | ruling | reason |
|---|---|---|
| 1 | source_defect | The lead's promise ("who each route is for, how long its visa lasts, and where to apply") and the three rows that say "set when you apply" are the site's own; softening the claim is the owner's (P25). SD8 / new SD23 (the lead promises validity for eight routes, the table gives it for five). |
| 2 | rejected | "How long its visa lasts" — the source says the route's visa; «اس کے ویزے کی میعاد» renders it. One reader, a moment; «اس کی میعاد» would make the route itself the thing with a validity. |
| 3 | rejected | Three readers of three now (b1-7, b2-6, b3-3) — but «یونیسکو کی عالمی ورثے کی فہرست» is the approved tm.json pair (asfar faq[2].a) quoted by ruling N16 (2); a judge does not break an approved pair on this page alone. Charged once (round 1); RECORDED for the owner / the attraction rounds as a pair-level option: «یونیسکو کے عالمی ورثے کی فہرست» (N2's own build), one replacement wherever the pair stands. |
| 4 | rejected | «نخلستان کے چشمے» was set in the addendum to cure reader 2's antecedent misreading («اس کے چشمے» read as the palace's); reader 3 hears the repetition, reader 2 the ambiguity — one reader each. "Its palms" is the source's and is not dropped. On record if a fourth reader stumbles: bare «چشمے» («… قصر ابراہیم، چشمے اور کھجور کے درخت ہیں»). «قصر ابراہیم» read first as the prophet: the name as P3c (2) has it, bare in passing. |
| 5 | source_defect | NEW SD19: the page calls Al-Ahsa an oasis in its first sentence and a city in its last without relating the two (readers 2 and 3). Both sources. |
| 6 | source_defect | SD8 / SD5 (three readers of three): whether Pakistan is an eligible country and where the list is. |
| 7 | source_defect | SD5: "there" after the three visas, Schengen in the table against the EU in the body — the source's two statements. |
| 8 | source_defect | SD1 (three readers of three). |
| 9 | source_defect | SD6 (three readers of three): the cell's own source gives "90 days (single entry)" without saying which; the fuller cell is the owner's, not the Urdu's to complete. |
| 10 | source_defect | NEW SD20 (readers 1 and 3): one span written "1 year / 3 months" in row 1 and "365 days / 90 days" in row 3 — the sources' own figures (N104 keeps each as written). |
| 11 | source_defect | SD12 (three readers of three read the rite «نُسُک» or met the name cold): no source says what Nusuk is, so no «نامی» generic can be written (the reader himself says so); the owner's one line would cure it in every language. |
| 12 | source_defect | SD7 (three readers of three): the header over two cells that are not platforms; the reader's «درخواست کہاں» is the owner's option. |
| 13 | applied | «خدمات دینے والے مجاز ادارے» in three strings (judge_edits_loop2): three readers of three stumbled on the phrase the package route turns on, and the last parsed «مجاز» as the services' adjective. See the edit's record for what is kept and what it costs. |
| 14 | rejected | "Set when you apply" is subjectless in both sources and the header supplies the subject in every language; the reader's nouns would import the header into three cells (as b2-14). Two readers of two now: charged lightly under nativeness, not changed. |
| 15 | rejected | The H2 and the label repeat the question in the source (SD10); the lead-in «یہ ویزا ان کے لیے ہے:» was asked for by reader 2 (a verb for the four groups) and dropped by stage 2 before that. Two readers want opposite things; the source's template is the cause. The lighter «ان کے لیے:» after the label would leave the four groups verbless again. Charged once under SD10. |
| 16 | rejected | «کارآمد ہے» here is "covers" (serves for), the sense the RETURN allowed stage 2 to keep; «… کیا جا سکتا ہے» says "may be done", which is the FAQ answer's frame, not this sentence's. One reader, register. Recorded. |
| 17 | source_defect | SD11 (three readers of three): the H2 names a visit, not a visa, in both sources. |
| 18 | source_defect | NEW SD21: "a residency valid for at least 3 months" / «سارية 3 أشهر على الأقل» does not say whether the three months are the permit's whole term or what remains of it — decisive for a Gulf resident, as the reader says; the Urdu «میعاد کم از کم 3 ماہ ہو» keeps the source's ambiguity rather than settle it (a judge adds no fact). For the owner: say "remaining" if that is the rule. |
| 19 | source_defect | SD12 (three readers of three on the visa-free-packages sentence): the logic is the source's. The reader's rewrite says "a visa is not included", which is not what "visa-free" says — refused; the subject-last order was reader 1's cure for «نسکِ خلیج» (b1-34). |
| 20 | rejected | «پیکجوں» is the entry's oblique plural (a loan admitted as a common noun takes Urdu inflection, N5: «فارم» never «فارمز»); «پیکجز» is the English plural (two readers of two now: charged lightly). Whether an Umrah visa reaches Al-Ahsa is the source's silence (SD12). |
| 21 | source_defect | SD2 (three readers of three): (a) Saudi host against GCC citizens' relatives; (b) "first-degree relatives" is the sources' term; (c) «بیوی» is the Arabic authority's «الزوجة» (owner_questions 1 — a woman reader stops, as the owner was told). |
| 22 | source_defect | SD14 (three readers of three): the host starts, the button says "apply"; the label on two routes is the owner's (P25). The reader's «سرکاری ویب سائٹ دیکھیں» is the option on record. |
| 23 | rejected | «وہ» before «مکمل ہوتی ہے» resolves on the verb's gender (feminine: the application); one reader read the organisation first. The reader's repetition of «درخواست» is the fallback on record if a fourth reader stumbles; who completes it, and ksavisa.sa against "the MoFA platform", are SD18. |
| 24 | source_defect | SD8 (three readers of three): "pilot phase", validity, stay, where to apply. The verbless "For …, through …" is the source's own fragment (b2-28, b3-24: two readers; charged lightly under nativeness); the reader's «… سے ملتا ہے» would add "is obtained" — a statement the source does not make. |
| 25 | applied | «شاہ فہد پل کے ادارے» (the entry's recorded alternative, the English source's name) after three readers of three on «عمومی ادارہ»; «پل کے راستے داخلے» for «پل سے داخلے» (judge_edits_loop2: arrive.land, links.rows.8.org). «اتھارٹی» refused (P16); «بذریعہ سڑک» not taken (the source says "by land", «براً»). |
| 26 | applied | «وزٹ سعودی ویب سائٹ کے مدد والے حصے میں» (judge_edits_loop2: arrive.land): two readers of two on the edited text read the bare brand as a verb phrase. No Latin «(Visit Saudi)» (no Latin letters in Urdu text; the brand is in the entry). «مدد والے حصے» kept: N89's frame for a section (two readers call it colloquial: charged lightly). |
| 27 | source_defect | SD1 (three readers of three). |
| 28 | source_defect | SD13 (three readers of three). |
| 29 | source_defect | NEW SD22: the FAQ answer lists "tourism, Umrah and visiting relatives" where the route body lists "tourism, attending events, visiting relatives and Umrah" — the source's two lists; the Urdu follows each field. |
| 30 | source_defect | The FAQ answer's "must be related to the guest" without "for the family visit" is the source's (b2-34); the reader's qualifier would import the body's distinction into the answer. Logged under SD2. |
| 31 | rejected | N120 (owner decided) and N98; three readers of three now ask for «وزارت خارجہ» (owner_questions 5, weight raised); «وزارتِ» with the sign would break P8. Charged once in round 1; not deducted again. |
| 32 | applied | «سفر کا بنا بنایا راستہ» (judge_edits_loop2: next.items.4.parts): three readers of three took «راستہ» here for a visa route; «سفر کا» names the trip without touching the tm.json word; «منصوبہ» (the site's "plan") not written; the save/saved echo and «مل جائے گا» are the source's. |
| 33 | rejected | The blind input's rendering of the domain-name links (b1-49, b2-35); «سرکاری لنک» is the direct plural (entry; N192). |
| 34 | rejected | Two interface keys of one label shown together by the blind input (b1-50, b2-36). |
| 35 | rejected | The site's own meta description with the call to action the pack requires (P25; SD17; b1-51, b2-37). |
| 36 | rejected | Two readers of two on the edited text read «سعودی ایئرلائن» as "any Saudi airline" until «یا فلائی ناس» (b2-12, b3-36), after the first reader read «السعودیہ» as the country. Neither reading survives the clause; the press tag stands, and the form both readers name, «سعودی ایئرلائنز», has no attestation in the line's evidence (stage 1's unattested «سعودی ایئر لائنز» was retired by stage 4). Charged once (addendum); RECORDED for the owner: «سعودی ایئرلائنز» or «سعودیہ» as a brand decision with the Arabic «الخطوط السعودية» behind the first. |
| 37 | rejected | «ریل گاڑی» is a verified native headword and P16 refuses «ٹرین» (three readers of three: owner_questions 4, weight raised; charged once). The «اور … اور» rhythm renders the source's two "and"s; one reader, minor. |

**Count:** 4 applied, 14 rejected, 19 source defects.

## 5. Record for the coordinator and the owner

- SD19: Al-Ahsa is an oasis in the first sentence and a city in the last; nothing relates the two (readers 2 and 3).
- SD20: One span written "1 year / 3 months" in row 1 and "365 days / 90 days" in row 3; a reader asks whether the difference is meant (readers 1 and 3).
- SD21: "A residency valid for at least 3 months" / «سارية 3 أشهر على الأقل»: whole term or remaining validity? Decisive for a Gulf resident (reader 3, item 18).
- SD22: The FAQ answer's list of permitted purposes omits "attending events", which the route body lists (reader 3, item 29).
- SD23: The lead promises the validity and the platform of every route; three rows say "set when you apply" and the package row names no platform (reader 3, item 1).
- Termbase: key «شاہ فہد پل کا عمومی ادارہ» → «شاہ فہد پل کا ادارہ» (the Arabic's form recorded for search); notes added on «وزٹ سعودی», «سعودی ایئرلائن», «نسک», «پیکج».
- Owner, weight raised — owner_questions 4 («وزٹ ویزا», «ٹرین»): three readers of three.
- Owner, weight raised — owner_questions 5 (the ministries): three readers of three.
- Owner, weight raised — SD1 / SD12 / SD14: three readers of three.
- Owner, weight raised — UNESCO pair «یونیسکو کی عالمی ورثے کی فہرست»: three readers of three — a pair-level option, not this page's.
- Owner, weight raised — Saudia brand form: two readers name «سعودی ایئرلائنز» / «سعودیہ».
- tm.json: the 12 stage-2 strings and the 6 loop-2 strings are new pairs; ui.ur keys unchanged since loop 1 («ویزے کی معلومات»).