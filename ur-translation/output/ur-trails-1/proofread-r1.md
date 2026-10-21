# ur-trails-1: proofread of the judge's round 1 (stage 5 role, independent)

Scope: the strings that differ between `ur-05.json` and `judge-r1.json` (computed: **24**, identical to the 24 `judge_edits`; no key missing, none extra), rulings N520–N526, and the `[s7]` termbase additions (کارگاہ, اخبار, سعودی ریاست, the amended «سیاحتی مقام کا صفحہ دیکھیں» and «پڑاؤ», and the N523 notes on the ten mastheads). No file other than this report was edited.

`node verify.mjs . judge-r1.json` → `✓ judge-r1.json: 90 سلسلة، 32 مدخل معجم، 59 ملاحظة`.

**Result: MANDATORY 1 · RECOMMENDED 5**

---

## MANDATORY

**M1. N521 contradicts N294 and the P3c-labels guard. It needs a written amendment to both. No string has to change.**
- N294 limits its bracket case to fruit card names. It says: «Not other interface headings, labels or section titles: they stay under N103's one case.» It then wrote its case into the P3c-labels guard text. The guard now reads: «… the one case of item N103 … and the second case of item N294 … that second name being a termbase key byte for byte and nothing else standing in the bracket».
- N521 says only that it «extends P3c-labels' guard by this third case». The judge file has no `base_amendments` block, and the guard text is unchanged. N294's clause that excludes other interface headings is not mentioned.
- The quotation marks are a second problem. In «مدرسہ امیریہ (“بیت الثقافہ”)» the bracket holds the key «بیت الثقافہ» plus its P3b marks. The standing guard bars this ("nothing else standing in the bracket"). N521 allows it by citing P3b, but the guard does not.
- **Fix (record only, no string change):** the judge writes a third case into the P3c-labels guard text, the same way N294 did. The case is: trail stop names (H3) that close with one bracket holding a second name that both source names close with, as a termbase key, with that key's own P3b marks where its entry requires them, and nothing else. N521 must also say that it amends N294's «Not other interface headings…» clause for trail stop names. Without this, the next proofreader who applies the guard as written will flag both published H3s («بیت البیعہ (بیت الملا)» and «مدرسہ امیریہ (“بیت الثقافہ”)»).

---

## RECOMMENDED

**R1. N523: say how it relates to P3c-labels, and fix the "one form" claim.**
- P3c-labels (base ruling) says: in a label «the plain Urdu generic may stand in the neighbouring line and never touches the name». N523 puts «اخبار» directly against the masthead in a source label, and cites P3c-labels only to say this is "not a gloss or a bracket".
- I read P3c-labels as covering P3c names only: names with an opaque Arabic generic such as عین, سوق, قصر, مدرسہ. Mastheads are not that kind of name, so this is **not** a breach. N523 should say so in one sentence, so that a later reader does not see the two rulings as conflicting.
- The precedent N523 cites, «وزٹ سعودی ویب سائٹ», is not the form on this page. The label `sources.visitsaudi-qarah` is the bare «وزٹ سعودی — جبل القارہ», and N523 keeps it bare. So "one form across the lists" is true for the press labels only. Either drop that analogy, or state that brands stay bare in source labels.

**R2. `ui.trails.view` breaks the rule N525 sets for links.**
N525 adds «دیکھیں» because a bare noun phrase did not read as a link. `ui.trails.view` («راستے کی تفصیل», also a link followed by an arrow) is the same kind of label and stays a noun phrase. The two link labels on the site now follow different forms. Option, if the judge wants them to match: «راستے کی تفصیل دیکھیں». This is not a reader finding, so it is the judge's call.

**R3. Termbase addition "Landmark page (link label)": the key is now an imperative phrase.**
The key is now «سیاحتی مقام کا صفحہ دیکھیں», with gender مذکر. Gender means nothing for a verb phrase. Also, `ui.trails.mapNote` still uses the noun («کسی سیاحتی مقام کے صفحے سے»), which the entry's note cites, and that noun is no longer a key. Better: keep the key as the noun «سیاحتی مقام کا صفحہ» (masculine, N507), and record the link label «… دیکھیں» (N525) in the note.

**R4. N522 creates a site-wide split between کارخانہ and کارگاہ. Send it to the owner.**
- The trail strings now say «کارگاہ» (feminine). The published duqat-algharash summary in `ref.json` says «مٹی کے برتن بنانے کا ایک روایتی کارخانہ». The verified termbase entry «کارخانہ» (en "workshop", ar «مصنع، ورشة») and the new «کارگاہ» (ar «ورشة فخار») now cover the same concept.
- This is not an error on the trail page: the summary is not shown there, and N152 binds only the duqat-algharash page. The judge has already marked the alignment as the owner's decision.
- Feminine agreement is correct in both edits: «… کی ایک کارگاہ ہے جو … چلی آ رہی ہے» and «… کی ایک روایتی کارگاہ چلاتا ہے» (the verb agrees with «خاندان»).
- «کارگاہ»'s own dictionary page was not read. The entry should stay pending until it is.

**R5. `ui.trails.unescoCount` is now five words on a card cell.**
«یونیسکو کے عالمی ورثے میں شامل پڑاؤ» is the correct N2 form, and it matches `det.unesco` and `fact.unesco.l`. It now sits beside a number in the same card row as the one-word «پڑاؤ». Check the index card at 375 px in Nastaliq for wrapping and line height before merge. This is a layout check, not a language finding.

---

## Checklist on the judge's changes

| Item | Result | Detail |
|---|---|---|
| Letterforms | PASS | Regex `[يكةهىأإۃ]` over the 24 changed strings and every `[s7]` termbase `ur` value: **none**. Arabic letters appear only in Arabic quotations inside the ruling texts (N520 «تاريخ الدولة», «رجالات الدولة»), which is by design. «کارگاہ», «اخبار», «سعودی ریاست», «ٹھہرتے» are spelled correctly (ٹھ is an aspirate). |
| Punctuation | PASS | No `؛`, no U+00A0, no `,` `"` `«»` and no Latin `.` outside numbers. The only Latin comma is inside «1,200», unchanged. Sentences close with `۔`. Labels, the tagline and the ten source labels have no final stop. No space before `۔` or `،`. «“بیت الحرفیین”» and «“صرام”» are unchanged. |
| Gender and number | PASS | «کارگاہ» (f.) → «کی ایک کارگاہ … چلی آ رہی ہے». «سعودی ریاست کی … شخصیات نے … تعلیم پائی». «سمندری تجارت … آ ملی» (f., agrees with تجارت). «راستہ بنایا گیا ہے» (m.). «خلاص نامی کھجور … شامل ہے» follows the entry's feminine head and the N292 «نامی» pattern. «اخبار» (m.) is not exercised. «پرندے … ٹھہرتے ہیں». «سیر کا ہر راستہ … یکجا کرتا ہے». |
| آپ | PASS | «آپ نخلستان کی وہ زندگی دیکھتے ہیں» uses honorific forms. No تم, تمہارا or تیرا. |
| Published names (byte for byte) | PASS | «سوق القیصریہ», «محلہ الکوت», «الاحساء قومی پارک», «العمران», «جھیل الاصفر», «مسجد جواثا», «بیت الملا», «الدارہ», «مدرسہ امیریہ», «“بیت الحرفیین”», «“ارض الحضارات” (تہذیبوں کی سرزمین) نامی ثقافتی گاؤں», «خلاص» and «السیفہ» all match `ref.json` and the termbase. Every masthead is byte-identical to its key, with «اخبار» outside the key. |
| P1 / P2 | PASS | «ہفوف» has no article (closed list). Every other name keeps its article. «الاحساء» is used throughout. No «الاحسا» and no «جبل قارہ». |
| P9 | PASS | «مدینہ منورہ» in the ajel label is unchanged. «المدینہ اخبار» is the newspaper (termbase note), and «اخبار» now makes that clearer. |
| P15 / P3b | PASS | «“ارض الحضارات”» still carries its gloss once and «نامی ثقافتی گاؤں». The judge did not touch the gloss at the name's first mention. |
| P16 | PASS | No new loanword. «اخبار», «کارگاہ», «یکجا» and «ٹھہرنا» are native Urdu. «روزنامہ» is correctly refused because it would claim a daily print edition. |
| C27 (no officialness) | PASS | The changed taglines, intros and the lead contain no سرکاری, منظور شدہ or مستند. The «سرکاری» in the amiriya text means "government school", is unchanged, and says nothing about the trail's status. |
| Roman theatre negation | PASS | The uqair-beach text is unchanged and keeps «مگر یہ ایک نئی عمارت ہے، رومی دور کے آثار میں سے نہیں». The alriyadh label changed only its masthead. |
| Facts added? | PASS | **lead:** «کچھ» ("some") stops the reading that each trail joins *all* landmarks. It is not a new fact. «اس کی معلومات کے ذرائع» keeps the source's meaning. **components-list:** «عالمی ورثے کی فہرست» spells out what 'inscribed' already means (N2 form). **amiriya and tagline:** «سعودی ریاست» names the state the Arabic «الدولة» means (N520). The hofuf page names «سعودی ریاست» in the qasr-ibrahim stop, which comes earlier. **jabal-al-qarah:** the two facts are kept and «پیدل» is not added. **national-park:** «یوں» removes a cause the source does not give. |

## New rulings against standing rulings and the published site

- **N520:** consistent with N91. «مملکت» appears only after «سعودی عرب» on the same page. On the hofuf page, the bayt-al-bayah text names «سعودی عرب» before the amiriya label says «مملکت کے بانی». On the uqair page, the port text names «سعودی عرب» before «مملکت». Also consistent with the termbase note under «پہلی سعودی ریاست» and with the published baiah, khuzam and ahsa-museum bodies («سعودی ریاست»). No conflict.
- **N521:** see M1.
- **N522:** does not overrule N152, whose scope is the duqat-algharash page. See R4 for the site-wide split.
- **N523:** no published `/ur/` attraction page has a masthead source label. The only occurrences are the Arabic `src/data/trails.json` and the already-applied `trails.ur.json`, so there is no conflict with the published site. See R1 for the P3c-labels wording.
- **N524:** matches N2 and the approved `det.unesco` / `fact.unesco.l`. See R5.
- **N525:** amends N507, as it says. See R2 and R3.
- **N526:** the published asfar body («مہاجر پرندوں کا پڑاؤ») is on another page, and the asfar summary is not shown on trail pages (BRIEF: a stop shows its name, badge, text, sources and link). Every remaining «پڑاؤ» in the trail strings means a trail stop (hofuf intro, qarah intro, unescoNote, ui). No conflict.
