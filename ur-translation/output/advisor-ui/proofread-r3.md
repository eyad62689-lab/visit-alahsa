# Proofread r3 — advisor-ui (ur), after judge round 2

**Verdict: PASS**

Edited keys (judge-r2): advisor.notice, advisor.rate. Script check: the other 15 keys are byte-identical to judge-r1 text (15 same, 2 differ, 17 keys).

## advisor.notice
`بلبل صرف اس ویب سائٹ کے مواد سے جواب دیتی ہے۔ آپ کے سوالات کی پراسیسنگ Anthropic کی سروس کے ذریعے کی جاتی ہے اور انہیں محفوظ نہیں کیا جاتا۔`
- Letterforms: no [يكةهىأإۃ], no U+06F0-9/U+0660-9, no U+00A0 (none). Urdu stop ۔ closes both sentences.
- Grammar: پراسیسنگ is feminine (termbase N769, by usage) so «کی جاتی ہے» agrees; «انہیں» refers to سوالات (plural); آپ with honorific forms; feminine persona «دیتی ہے» kept.
- Loan test: پراسیسنگ is the termbase entry (PROVISIONAL, N769/P16-test) and is already published in src/data/legal.ts ur (lines 951, 955); «کارروائی» would collide per N769. Consistent.
- Fidelity: matches the Arabic (answers from site content only; processed via Anthropic; not stored). Nothing added or dropped.

## advisor.rate
`آپ آج کے سوالات کی حد تک پہنچ چکے ہیں۔ کل پھر ملیں گے، اور تب تک آپ سیاحتی مقامات کے صفحات دیکھ سکتے ہیں۔`
- Letterforms: none of the banned code points; Urdu ۔ and ، used.
- Grammar: «حد تک پہنچ چکے ہیں» and «ملیں گے» are honorific plural agreeing with آپ; «دیکھ سکتے ہیں» correct.
- Register: neutral, polite; no anglicism, arabism or banned form.
- Fidelity: daily limit reached; see you tomorrow; landmark pages in hand. The rendering «دیکھ سکتے ہیں» for «بين يديك» is idiomatic; nothing added or dropped.

No FIX needed.
