# Proofread r1 — ur-legal-1 (/ur/legal/): 2 MANDATORY, 8 RECOMMENDED

Text before: ur-05.json. Judge text: judge-r1.json. Method: node diff of the two `strings` objects, scans over all 118 final strings, a source-by-source read (en + ar) of the 41 edited strings, a check of rulings, termbase_additions and tm_pairs against the termbase, tm.json and the other batches' id ranges.

## Checks that pass (no finding)
- Diff: 118 keys, same order; 41 changed keys = exactly the 41 `judge_edits` keys (no silent change, no duplicate, every `before` equals ur-05, every `after` equals judge-r1 `strings`).
- Letterforms: zero hits for [يكةهىأإۃ] in all 118 strings; no ھ outside aspirates; no «؛», «», straight quote; no U+00A0; no Arabic-Indic or extended digits; no Latin `.` or `,` after Urdu; no space before ۔ or ،; no newline, no markdown. Latin tokens of the edited strings unchanged (Visit Al-Ahsa, visit-alahsa.com, Google Analytics, GA4, IP, Cookies, M/19, 1443/2/9, the quoted add-on name); digits unchanged. `legal.contactPre` keeps its trailing space and colon. No heading/chip ends in ۔; every body string ends in ۔ (or the contactPre colon).
- Guards of the new rulings on the final text: no «اقرار / ضمناً / ضمنی» (N765), no «رابطہ ذرائع» without «رابطے کے» (N766), no «خیر مقدم» (N767), no «دست برداری» (N768), no «ٹول / ورژن / بکنگ / ڈیوائس / ایڈ آن» (N769), «کے طور پر پیش کرنا» present and «ظاہر کرنا» absent (N770).
- آپ forms honorific everywhere in the edited strings; «ویب سائٹ» (feminine, ref.terms) agrees in every edited string; «گوگل» masculine «کرتا ہے»; «پراسیسنگ» feminine; «مواد» masculine; «شقیں … رہیں گی», «فائلیں», «کارروائی … ہو سکتی ہے» agree.
- Rulings: N765–N770 are inside the batch range (judge starts at 765; the next batch ur-stores-1 begins at s4 775), unused in termbase.json (highest N739; N760–N764 are the stage-4 ids) and in every other batch; each is confined to /ur/legal/; none adds an automatic guard (all «for the proofreader»); N766 refines N761 at the noun phrase and says so; no earlier ruling is contradicted, so `withdrawn: []` is right. `base_amendments: []` is right (none of the proposals is in termbase.json yet; no `before` to match).
- tm_pairs: 118, in pack order, `en` equals pack, `ur` equals the final `strings` for every key, page = legal.
- termbase_additions: 36 = 27 (ur-05) + 9 new + 2 amended in place (disclaimer, tracking files); none dropped; every entry has en, ur, source, gender; no entry duplicates an existing termbase key (searched by key, by `en` and by the Urdu form).
- verify.mjs prints OK (118 strings, 36 termbase additions, 56 notes).

## MANDATORY

1. **MANDATORY — `legal.sec.2.sub.1.list.3`: «ہمارے» is an added referent.**
   EN: "technical failures or software errors beyond reasonable control". AR: «خارجة عن السيطرة المعقولة». Neither source says whose control. Judge text: «… جو **ہمارے** معقول قابو سے باہر ہو۔» (ur-05 had the neutral «جو معقول قابو سے باہر ہو»). The judge's `why` mentions only the clause and the singulars, so the narrowing of an exemption to "our" control is unlogged; SD-L13 does not cover it either.
   Fix: «ویب سائٹ تک رسائی میں کوئی تعطل، تکنیکی خرابی یا پروگرام کی غلطی، جو معقول قابو سے باہر ہو۔» (or keep «ہمارے» only if the judge logs it as a deliberate reading in SD-L13 and in the edit's `why`).

2. **MANDATORY — termbase_additions entry «official (of the site's own channels, email and add-on)» (ur «باضابطہ») keeps the form N766 refuses.**
   Its note still reads: «باضابطہ رابطہ ذرائع», «باضابطہ ای میل», «باضابطہ ایڈ آن». After this round «باضابطہ رابطہ ذرائع» is exactly what N766 forbids (and its guard checks), and no string has «باضابطہ ایڈ آن» any more (the text is «باضابطہ “Google Analytics Opt-out Browser Add-on”»; N769 refuses the generic «ایڈ آن»). The judge amended only 2 entries; this one was left stale, so the record contradicts the ruling.
   Fix: note → «باضابطہ رابطے کے ذرائع», «باضابطہ ای میل», «باضابطہ “Google Analytics Opt-out Browser Add-on”». 'Formal' is its dictionary sense: PROVISIONAL for 'official'. «سرکاری ادارے» stays for government bodies. Rulings N761, N766.

## RECOMMENDED

1. **RECOMMENDED — `legal.sec.2.sub.0.before.0`:** «ان معلومات کے ہر وقت درست، مکمل **اور** تازہ ہونے کی ضمانت نہیں دیتی». The English is "accuracy, completeness **or** currency"; the stronger disclaimer keeps the alternation. Fix: «ہر وقت درست، مکمل یا تازہ ہونے».
2. **RECOMMENDED — `legal.sec.5.sub.0.list.1`:** «اس کے درست، قانونی **اور** تازہ ہونے کی بھی ذمہ دار نہیں» for "accuracy, legality **or** currency". Same fix: «درست، قانونی یا تازہ ہونے».
3. **RECOMMENDED — `legal.sec.0.sub.3.list.4`:** «جبکہ واپسی سے پہلے … متاثر نہیں ہوتا» — «جبکہ» is 'whereas', and «اس سے» has no clear noun (the withdrawal). Fix: «… کسی بھی وقت واپس لینا، اور واپسی سے پہلے کی گئی پراسیسنگ کا جائز ہونا اس واپسی سے متاثر نہیں ہوتا۔» (nothing dropped either way).
4. **RECOMMENDED — `legal.intro.0`:** «ان قوانین میں … قانون شامل ہے جو … جاری ہوا، اور اس کے نفاذ کے ضوابط بھی۔» leaves the verb to be supplied. Fix: «… اور اس کے نفاذ کے ضوابط بھی شامل ہیں۔»
5. **RECOMMENDED — `legal.sec.2.sub.2.before.0`:** «اپنے طور پر تصدیق کر لے» for "independent verification" (AR «التحقق المستقل»): 'on one's own' loses 'independent of the site'. Optional fix: «آزادانہ ذرائع سے تصدیق کر لے» is not available without adding words; leaving it is acceptable, but log the loss of 'independent' in the edit's `why`.
6. **RECOMMENDED — `scores_row` (and the summary inside it):** says "termbase 8 new entries and 2 amended"; the count is 9 new (acknowledge, express acceptance, implicit acceptance, official channels, welcome, platform, processing, social media, opt-out tool) and 2 amended (36 = 27 + 9). Fix: "9 new entries and 2 amended".
7. **RECOMMENDED — termbase entry «tracking files»:** the `note` repeats its own sentence («PROVISIONAL loan; the owner may prefer another wording. ‖ PROVISIONAL loan; …»). Fix: keep one copy, then the [j1] sentence.
8. **RECOMMENDED — termbase entry «official channels (of the site)»:** `note` says "Five places on /ur/legal/"; «رابطے کے ذرائع» occurs in four keys (sec.0.sub.3.after.0, sec.4.sub.2.before.0, sec.4.sub.3.before.0, sec.5.sub.1.before.0); contactPre has «باضابطہ ای میل» only. Fix: "Four places (+ «باضابطہ ای میل» in legal.contactPre)", matching N766's `binds`.

## Fact-fence result for the 41 edited strings
No clause, right, exception, number or name of the English/Arabic was dropped. Softenings accepted: «ڈیجیٹل ذریعہ» for "digital gateway" (judge-logged), "(بشمول GA4)" for "including the GA4 version" (judge-logged), «کے منتظر ہیں» for "we welcome hearing from you" (N767), «حوالے کی درستی» for "correcting the attribution" (acceptable; AR «النسبة»). One addition: «ہمارے» (MANDATORY 1). Sentence splits in intro.0, sec.1.sub.1, sec.2.sub.0, sec.4.sub.2.after.0, sec.1.sub.5 keep every list item (sec.1.sub.1: all 9 content types; sec.2.sub.0: all 4 information types, "without our knowledge", "at any time", "at all times", the advice to verify).

## Not verified
The ur.wikipedia page counts quoted in N765, N768 and N769 (and the termbase source lines) were not re-fetched here; they are taken as the judge's HTTP-200 measurements.
