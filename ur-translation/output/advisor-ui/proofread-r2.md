# advisor-ui proofread r2 (after judge-r1 edits)

Verdict: PASS (no fixes)

Scan of all 17 judge strings: no U+064A/0643/0629/0647/0649/0623/0625/06C3, no U+00A0, no digits in U+0660-0669 / U+06F0-06F9, no ASCII . , ; ? " ' « » in running Urdu (only the Latin ellipsis-free U+2026 in placeholder/thinking, as before). Item 1: none.

- advisor.intro (line 3): "سیر کا منصوبہ بنا دوں گی" - feminine future agrees with the bird persona; آپ forms consistent (آئے ہیں, بتائیں); three \n lines, two emoji (🐦🌴), ends with ۔ ; PASS.
- advisor.notice: "...کارروائی کی جاتی ہے اور انہیں محفوظ نہیں کیا جاتا۔" - passive agrees (کارروائی f. -> جاتی), انہیں refers to سوالات; Latin "Anthropic" kept; content equals the Arabic (site content only; processed via Anthropic service; not stored), nothing added or dropped; PASS.
- advisor.rate: "حد کو پہنچ گئے ہیں" - plural honorific agreement with آپ correct; "کو پہنچنا" is valid idiom (تک also valid, not required); "ہو گی" split form matches the line's convention (ui.ur uses split "ہو گیا"); "دستیاب ہیں" agrees with plural صفحات; ۔ closes both sentences; PASS.
- advisor.error: "بلبل سے رابطہ نہیں ہو سکا۔" - masculine "سکا" agrees with impersonal رابطہ (m.); imperative "کوشش کریں" honorific; PASS.
- Other 13 keys: unchanged, re-checked against edits (no dependency broken: resting keeps “ ” quotes and the quoted nav label; chips, labels, title untouched); PASS.

Binding constraints: آپ only (no تم/تو pronoun); Latin brand and Anthropic; Latin digits (none present); quotation marks “ ” only.

Fixes: none.
