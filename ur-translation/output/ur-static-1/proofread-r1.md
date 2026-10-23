# Proofread after judge round 1, batch ur-static-1: 2 MANDATORY, 4 RECOMMENDED

Inputs: ur-05.json (before), judge-r1.json (judge), pack.json, ref.json, BRIEF.md, JUDGE-BRIEF-r1.md, termbase.json, tm.json. Judge file passes `verify.mjs` (OK, 34 strings, 6 termbase additions, 58 notes).

## Mechanical results (all PASS)

- **Diff of `strings`:** exactly 4 keys differ between ur-05 and judge-r1: `unesco.lead`, `unesco.seoDesc`, `thanks.d`, `tmap.classic`. They are exactly the 4 `judge_edits` keys. No silent change. Each edit's `before` equals ur-05 and each `after` equals the final string. Key order unchanged (34 keys, pack order).
- **Letterforms and punctuation:** scan of all 34 final strings for `[يكةهىأإۃ]`, `«»`, `؛`, straight `"`, U+00A0, U+06F0-06F9, U+0660-0669: none. No invisible or bidi characters, no double spaces, no space before `۔` `،` `؟`. Non-ASCII code points of the four changed strings are all Urdu-form letters (ی ک ہ ے ں ھ ٹ ڑ plus ۔).
- **Final stops:** `tmap.classic` is a label with no stop. `unesco.lead`, `unesco.seoDesc` and `thanks.d` are running text and close with `۔`. `unesco.seoDesc` closes with `۔` after the placeholder, as in ur-05.
- **Placeholders:** `{comps.length}` appears once in `unesco.lead` and once in `unesco.seoDesc`; `{names.join(', ')}` appears once in `unesco.seoDesc`. The Latin `, ` exists only inside the placeholder. `1563` and `2018` stay as digits.
- **Names and termbase:** "الاحساء کا نخلستان" is byte-identical to the termbase key. N2 forms are respected: «یونیسکو کے عالمی ورثے میں شامل» in seoDesc and «عالمی ورثے کی فہرست» in lead, so UNESCO-LIST-PAIR is untouched. «سیاحتی رہنما» is byte-identical to tm `inline.home.title`, `inline.home.description` and `foot.independence`. The banned lists (anglicisms, arabisms, hindi_leaning) give no hit. No `آپ`/`تم` problem; `thanks.d` keeps the honorific forms.
- **Facts against both sources:** `unesco.seoDesc` says the oasis was inscribed in 2018 (EN "(2018)", AR "(2018)", and `unesco.lead` states 2018), twelve components (`بارہ`), `{comps.length}` with own pages, nothing added or dropped. `unesco.lead`: one word added to a published guide name, no fact. `thanks.d`: "correct whatever is confirmed" is kept as «جس غلطی کی تصدیق ہو جائے گی اسے ٹھیک کر دے گا» (feminine `تصدیق ہو جائے گی` agrees; the verb with `عملہ` is masculine singular). «تصدیق» is the verb of tm `det.hoursNotice`.
- **Sibling and published strings:** `report.title` equals `ui.foot.l.report` byte for byte. `ref.ui map.title` is «سیاحتی مقامات کا نقشہ» (see finding 2 for how `tmap.classic` relates to it).
- **Rulings N750-N753:** ids are inside the batch range (judge starts at N750; the next batch starts at N760) and are absent from the termbase and from any other output file. Every `guard` is "None". `withdrawn` is empty, correctly: no stage-4 ruling (N745-N749 range; N745-N748 used) is contradicted. `base_amendments` is empty, so there is no `before` to compare. The text each ruling quotes (N750 phrases, N751 string, N752 string, N753 «سرکاری ماخذ» and «سرکاری فہرست») equals the final strings. The N750 counts were re-run on ur.wikipedia (HTTP 200 each): «نشیب و فراز» 63, «تضاریس» 0, «تضاریسی نقشہ» 0, «زمین کی اونچ نیچ» 0, «اونچ نیچ» 34. They match the ruling.
- **`tm_pairs`:** 34 entries, one per pack key (`field` = key, `page` = "static"), every `ur` identical to the final string, every `en` identical to pack. No duplicate, no extra.
- **Blind-reader record:** 51 items ruled, none left; counts 4 accepted / 19 rejected / 3 source defect / 25 out of scope match `blind_reader_counts`. The 4 accepted items map to exactly the 4 judge edits.
- **Notes:** cumulative (ur-05's 50 notes unchanged as a prefix, 8 `[j1]` notes added).
- **Termbase additions:** every entry has `en`, `ur` and `source`; no key duplicates an existing termbase key or an existing `en` with another meaning (checked on `ur`, `en`, and substring for «مرکز»/«منظر»/«ای میل»/«عملہ»/«سرکانا»). The six entries equal ur-04/ur-05's six (no amendment was ruled, none made).

## Findings

### 1. MANDATORY: `termbase_additions` entries with `gender: null`

Entries (judge-r1.json `termbase_additions`):
- `en` "zoom (the map): make it bigger or smaller", `ur` «نقشے کو بڑا یا چھوٹا کرنا», `gender: null`.
- `en` "scroll / slide (verb)", `ur` «سرکانا», `gender: null`.

The batch rule requires `en`, `ur`, `source` and `gender` on every entry, and the termbase schema allows only «مذکر | مؤنث». All 536 existing termbase entries have a gender. Two of the six new entries leave it empty.

Fix: set `"gender": "مذکر"` on both. Urdu infinitives («کرنا», «سرکانا») are masculine, and both entries are infinitive forms. Add a half-sentence to each `note`, such as "infinitive, masculine".

### 2. MANDATORY: N751 (and the `tmap.classic` edit's `why`) says the published page name "is kept inside the link", but the final string does not contain it

- Final string: «سیاحتی مقامات کا روایتی نقشہ».
- Published `ui.map.title`: «سیاحتی مقامات کا نقشہ».
- The published name is not a substring of the final string, because «روایتی» is inserted inside it, between «کا» and «نقشہ».
- N751 text: "The published page name is kept inside the link text". The `judge_edits` `why` says "The published page name stays inside the link (the BRIEF's intent)".
- Both sentences misdescribe the string. The BRIEF said to name the link by the published name, and the ruling does supersede that instruction (its `binds` says so), but the ruling's `ruling` text says the opposite of what was done.

Fix (record only, string unchanged): in N751 `ruling` and in the `tmap.classic` `judge_edits[].why`, replace the "kept inside" sentence with "the published name «سیاحتی مقامات کا نقشہ» with «روایتی» inserted before «نقشہ» (the link text is therefore not byte-identical to ui.map.title)". In the `[j1]` note on N751, which says "keeps the published name inside it", change it the same way. If the judge would rather keep the published name intact, the alternative string is «سیاحتی مقامات کا نقشہ (روایتی)». That is a different decision and not required.

### 3. RECOMMENDED: N753 quotes «سرکاری ذرائع» for `fruits.methodP1`, but the published text is «سرکاری اور زرعی ذرائع»

The tm string of `ui` `fruits.methodP1` reads «یہ صفحہ قابل اعتماد سرکاری اور زرعی ذرائع پر مبنی ہے…». The other two quotes check out: `events.srcNote` «تقریبات کے سرکاری ذرائع» and `visa-guide` `table.head.3` «سرکاری ویب سائٹ». The ruling's conclusion stands, since «سرکاری» there still renders 'official'. Fix: quote the phrase as published, «سرکاری اور زرعی ذرائع», in N753's `ruling` text.

### 4. RECOMMENDED: `kind: "org"` on the UNESCO World Heritage Centre entry is not a termbase kind

Termbase kinds in use: toponym, institution, generic, dish, person, plant, name. RUNBOOK-r5's list says "org", but the stored entries (for example «یونیسکو») use `institution`. Fix: `"kind": "institution"`.

### 5. RECOMMENDED: the 3D/2D entry puts two terms under one `ur` key

`ur` is «تین جہتی منظر / دو جہتی منظر». Termbase keys are matched byte for byte, so this key will never match either string (`tmap.3d.on`, `tmap.3d.off`). Fix: two entries, «تین جہتی منظر» (en "3D view") and «دو جہتی منظر» (en "2D view"), each with the shared `source`.

### 6. RECOMMENDED: `unesco.lead` now has «سیاحتی» twice in one clause

Final: «ان میں سے {comps.length} سیاحتی مقامات ہیں جن کے اس سیاحتی رہنما میں الگ صفحات ہیں۔». The edit is correct and sourced (the published guide name is «سیاحتی رہنما»), so this is not an error. A reader may find the repetition heavy. If the judge wants it lighter, «… جن کے الگ صفحات الاحساء کے اس سیاحتی رہنما میں ہیں۔» is not an improvement either (it adds «الاحساء کے»). The simplest course is to keep the string as it is and accept the repetition. No change needed unless the judge prefers one.

## Summary

- 2 MANDATORY (both in the record, not in the Urdu text): gender missing on two termbase additions; N751 and its `why` misstate that the published map name is kept intact.
- 4 RECOMMENDED: N753 quote of `fruits.methodP1`; `kind: "org"`; combined 3D/2D key; «سیاحتی» repetition in `unesco.lead`.
- No letterform, punctuation, digit, placeholder, agreement, fact, tm_pairs or ruling-id defect found in the four changed strings or in the other 30.
