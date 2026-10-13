RESULT: must-fix=0 should-fix=1 note=4

# Proof pass on the round-2 text — batch b0-ui (161 interface strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. Nothing was changed.
Text read: `strings` of `stages/07-judge.round2.json` (file sha256 `b9af0eb51a0ccc20785aa42fd1b32ce3525c2da55ea822850515c299205c2e0d`; text hash as the tools compute it `860d1e775140599db886ea62961d7c9ba8c37651ddd20065816ab0810798e3f7`; 161 strings, 5031 code points; pack `f7af9992b906`). The same hash stands in `blind/blind-input.on-r2.json` and in the evidence block of `stages/final.json`, whose 161 strings equal this text.
The 8 entries of the change log replay on the round-1 text to exactly this text; no unlogged difference. 153 strings are byte for byte the text proofed in `05p-proof.on-r1.md`; 136 are as stage 5 left them, 17 carry round-1 edits only, 8 carry this round's edits (two of them, home.name.body and map.locate.err, were edited in both rounds).
Judged by the role file as amended by the rulings of `calibration` (20 items, the final list). Scans are this pass's own (`s5p-r2-scan.mjs`, `s5p-r2-view.mjs`; they import nothing from the tools). The eight changed strings were read in place on the built page text (`blind/blind-input.on-r2.md`) and against the components that render them. The stage checker was not run.

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 5031 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key, the counts as in round 1: «الاحساء» 16, «جبل القارہ» 2, «قصر ابراہیم» 2, «سوق القیصریہ» 3, «العقیر» 2, «مسجد جواثا» 1, «حساوی لیموں کا باغ» 1, «سعودی عرب» 1, «یونیسکو» 5, «الاحساء کا نخلستان» 1, «واٹس ایپ» 1, «گوگل میپس» 1, «خلیج» 3. No banned variant. Latin only where allowed ({op}, {n}, Enter, UR).
- item 3, قواعد (grammar): PASS. At the seams of the edits: «“حسی” کی جمع ہے» (feminine); «یہیں کے لوگوں کے ہاتھوں چوغوں پر کڑھائی تک» (two oblique plurals, the range closed by «تک»); «کڑھے ہوئے چوغے» (masculine plural, the participle agreeing); «اپنے موسم میں الاحساء کے لیموں کی چنائی» (feminine head, «کی»); «اس ویب سائٹ کو یہ جاننے کی اجازت دے دیں» (dative «کو», oblique infinitive with «کی», feminine «اجازت», honorific compound verb).
- item 4, خطاب (address): PASS. «آپ» 7 times with honorific forms; the one new request, «دے دیں», is the honorific subjunctive. «تو» twice, the particle. No «تم», «تمہارا», «تیرا».
- item 5, عنوانات (headings): PASS. 31 strings end with «۔», each where the English ends a sentence; the two edited labels («رہائش», twice) carry no stop; no bracket anywhere.
- item 6, termbase compliance: PASS. Keys, genders and plurals as the 23 entries have them; the five admitted loans each equal their entry. The three notes reported stale in round 1 are corrected (see "Round-1 finding 1").
- item 7, رموز (punctuation): PASS. «۔» 43, «،» 36 (four fewer than in round 1: one each in home.name.body, cat.crafts.d, home.route.s5.d, list.lead), «؟» 2, «؛» 1; quotation marks 3 pairs, balanced; ellipsis 4; middle dot 3; ASCII colon 7 (the new one in list.lead, closed up to «تک» and followed by a space); one plus sign. No ASCII full stop or comma, no straight quote, no «», no dash, no bracket, no doubled mark, no space before a mark, no double, leading or trailing space, no U+00A0.
- item 8, اعداد (numbers, dates, currency): PASS. Latin digits only: 25, 25, 2018, 1. No «ملین», «بلین». Months «جون», «اگست», now at the end of home.route.s5.d.
- item 9, انگریزیت (loans, banned lists): PASS. No new loan entered with this round: the words new to the text are «عربی», «چوغوں», «چوغے», «جاننے», «دے». The loans in Urdu letters are the entries that cite P16 and nothing else; «ویب سائٹ» is back in map.locate.err and is such an entry. None of the refused or banned forms occurs («شیئر», «لوکیشن», «گائیڈ», «فوٹوگرافی», «فیملی», «ہال», «ہیریٹیج», «ہوٹل», «پروگرام», «بلاگ», «ریستوراں», «کیفے», «بٹن», «لائم», «وڈیو», «عالمی ثقافتی», «مینیو», «فارمز»). No officialese chain.
- item 10, گلوس (glossing): PASS. No bracket in any string. «عربی لفظ» is a label before a quoted word, not a gloss; it stands once, directly before «“حسی”», and the word keeps its quotation marks (the guard of ruling N7).
- item 11, ساخت (structure): PASS. 161 ids, the pack's, in pack order; one line each; {op} and {n} once each, between spaces; det.openMaps, fav.added, plan.copied and det.allSights end with a space and their symbol. No Markdown, link or HTML.

No finding below is a breach of one of the eleven items. They concern the meaning against the sources, what the two blind readers are on record as saying, and the record that binds the next batch.

## Findings

1. [should-fix] `map.locate.err` — «معلوم نہیں ہو سکا کہ آپ کہاں ہیں۔ براؤزر میں اس ویب سائٹ کو یہ جاننے کی اجازت دے دیں۔»
   - What is wrong: the second sentence gives another instruction than both sources. English: 'check the browser’s location permission'; Arabic: «تحقق من إذن الموقع في المتصفح». The Urdu now says 'in the browser, give this website the permission to know this'. 'Check' left; 'give' entered. The Russian, German and Chinese values of the same key all say 'check'.
   - Why it is more than a turn of phrase: the page shows this one message on every failure, not only when the permission is refused — when the browser has no geolocation at all, on any error of the request (refused, position unavailable, the 10-second timeout) and when the 12-second guard runs out (`DetailView.astro`, lines 389 to 400; `MapView.astro`, lines 318 to 328). 'Check the permission' holds in all of these; 'give the permission' tells a visitor who has already given it to give it.
   - Rule: the RUNBOOK ('A defect in the source … is logged, never repaired in the Urdu'; where a choice arises, the earlier lines' values of the same key); ruling P23, first condition (a repair may change the form, not the content) — the judge's own accuracy note and source-defect entry describe the change as content ('where the sources say check'); and the precedent of P24 and P25, where the wording three readers asked for did not override the source and went on record as a one-line option.
   - What this finding is not: a mismatch between text and ruling. The string equals the wording of N4 byte for byte. It is the ground of N4 that is put back to the judge, with one fact the ruling does not mention (the four cases above).
   - Minimal correction: the literal form N4 itself records, «براؤزر میں دیکھ لیں کہ اس ویب سائٹ کو یہ جاننے کی اجازت ہے یا نہیں۔», with 'give' kept as the one-line option. Or, if the judge holds 'give' to be form only: keep the string and say so in N4 under P23, with the four cases named.

2. [note] `map.locate.err` — «اس ویب سائٹ کو یہ جاننے کی اجازت»
   - What it is: the clause is the one the first blind reader could not resolve. Of the stage-5 sentence, which carried it word for word, he wrote: 'Know what? Check where?' (round 1, observation 43). The change log says 'What each of them passed is kept'; for this clause that does not hold. The second reader never saw it: the round-1 text he read had no such clause. 'Where' is now answered by «براؤزر میں»; 'what' rests, as before, on «یہ» pointing back to «آپ کہاں ہیں», with two words between where stage 5 had three.
   - Also entered, as at stage 5: 'this website', which neither source says (both speak of the browser's permission).
   - Rule: none broken; the grammar is right and «مقام» is gone from the string. Correction: none proposed. It is the blind read's to show whether «یہ جاننے» is understood.

3. [note] `home.name.body` — «“الاحساء” عربی لفظ “حسی” کی جمع ہے، یعنی …»
   - What it is: «عربی» ('Arabic') stands in neither source. English: '“Al-Ahsa” is the plural of “hisy”'; Arabic: the name «الأحساء» is the plural («جمعُ») of «حِسْي», with no word for the language. It is an explicitation: that the singular of an Arabic name is an Arabic word is entailed by the sentence, and the Arabic source shows it by its script and vowel signs. It is true of the word. It adds no figure, date, rank, comparison or judgement, and no fact of the sentence changes: the name, the relation ('plural of') and the meaning that follows are as they were.
   - Rule: none broken once N7 is taken as ruled; under the fence read strictly, one word has entered that stage 3 declined for that reason. N7 records the literal wording («“الاحساء” لفظ “حسی” کی جمع ہے») and leaves the entry «حسی» pending until the labelled sentence is read blind. Correction: none proposed.

4. [note] `home.name.body` — the seam «“الاحساء” عربی لفظ “حسی”»
   - What it is: the sentence is back in the order of stages 1 to 5, with the label one word longer and no mark between the quoted subject and the label. On that order the first reader wrote: 'The word order also made me hesitate about which word «لفظ» belongs to' (round 1, observation 15). The change log answers that the second reader 'did not raise it'; he could not have, because he read the other order («لفظ “الاحساء”، “حسی” کی جمع ہے»). If the label is taken with the name before it, «حسی» stands unlabelled again and the cure of N7 does not reach it.
   - Rule: none broken. Urdu asks for no mark between subject and predicate, and a label before the word it names («عربی لفظ “…”») is the usual order. Correction: none proposed. If the next reader hesitates, the smallest remedy is a comma after the first closing mark, which is how round 1 closed the subject.

5. [note] `cat.crafts.d`, `home.route.s2.d` — «چوغوں», «چوغے»
   - What it is: the spelling is unified in the text (see "Recurring words"), but nothing binding records it. `termbase_final` and `calibration` carry the garment in no spelling; the choice stands only in the change log and in the judge's note of recurring choices, and neither says which singular the batch means («چوغہ» or «چوغا»: both give these two plurals). Gender is exercised («کڑھے ہوئے چوغے», masculine).
   - Rule: none broken in this batch. Recorded because the termbase is what keeps one word in one form across batches, and the pages of the souq and of the crafts will name the same garment. Correction: none in the text; an entry by the round that next meets the word. Read in this run: the Rekhta headword «چوغَہ», noun, masculine, 'a type of over coat, cloak'.

## Code points

- Forbidden letterforms: none.
- Non-Latin digits, U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, presentation forms: none.
- 72 distinct code points, the same inventory as the round-1 text: no code point new, none gone. The ASCII colon went from 6 to 7; «،» from 40 to 36.
- U+06BE 60 times (61 in round 1: «دیکھ» left map.locate.err), every time after a ruled aspirate; «ڑھ» in the four words of ruling P22a. The new words «چوغوں» and «چوغے» carry no U+06BE: U+0686 U+0648 U+063A U+0648 U+06BA and U+0686 U+0648 U+063A U+06D2.
- U+06C1 directly after an aspirable consonant: the same 21 words as in round 1, all plain he. «رہائش» is U+0631 U+06C1 U+0627 U+0626 U+0634.
- Read and right: U+064B twice («تقریباً», «اندازاً»); U+0621 16 times, all in «الاحساء»; U+0624 twice («پڑاؤ», «براؤزر»).

## The 8 edits, each read in its place

| # | string, where it renders | Urdu now | reading |
|---|---|---|---|
| e1 | nav.stayShort — header bar, between «کھانے پینے کی جگہیں» and «آن لائن دکانیں» | «رہائش» | A label, no stop. 'Places' («أماكن») is not said: the label names the thing, as the German and Chinese values do. Rekhta headword «رَہائِش — اسم، مؤنث — رہن سہن، بود و باش، قیام، سکونت»; gender not exercised. |
| e2 | nav.stay — footer link under «سیر کریں» | «رہائش» | Same source, same Urdu as e1. |
| e3 | home.name.body — paragraph under «الاحساء… جہاں ریت اپنا پانی چھپائے رکھتی ہے» | «“الاحساء” عربی لفظ “حسی” کی جمع ہے، یعنی وہ میٹھا پانی جو …» | Two pairs of U+201C / U+201D; the comma that followed the first closing mark in round 1 is gone and left no double space; the comma after «ہے» stands. Entered: «عربی». Findings 3 and 4. |
| e4 | cat.crafts.d — card line under «سرگرمیاں اور دستکاری» | «کھجوریں توڑنے سے لے کر یہیں کے لوگوں کے ہاتھوں چوغوں پر کڑھائی تک۔» | A range, 'from … to …', closed by «تک۔», a fragment as in both sources. «کے ہاتھوں» with a verbal noun is good Urdu. Left: «سب» ('everything'), which no source had, and the trailing «سے». 'By local hands' now governs the embroidery alone, as the Russian and German values read it; the Chinese reads it with both, and both sources leave the scope open (logged by the judge). |
| e5 | home.route.s2.d — line beside the stop «سوق القیصریہ» | «… اور یہیں کے لوگوں کے ہاتھوں کڑھے ہوئے چوغے۔» | One letter entered. Participle and noun masculine plural. |
| e6 | home.route.s5.d — line beside the stop «حساوی لیموں کا باغ» | «ہرے بھرے باغ اور ترشاوہ پھلوں کی مہک، اور اپنے موسم میں الاحساء کے لیموں کی چنائی، وسط جون سے اگست کے آخر تک۔» | The same words, token for token; only the order and one comma changed. The dates stand last, as in both sources. «الاحساء کے لیموں» (ruling P6) intact. |
| e7 | list.lead — lead under the heading of the index, and the page's search description | «غاروں سے بھرے پہاڑ سے لے کر خلیج کے کنارے کی بندرگاہ تک: کوئی زمرہ چنیں اور سیر شروع کریں۔» | One mark: U+003A in place of «،», closed up to «تک», a space after. The source has a dash there. No word touched. |
| e8 | map.locate.err — shown after «مجھ سے کتنی دور؟» fails; also on the map page | «معلوم نہیں ہو سکا کہ آپ کہاں ہیں۔ براؤزر میں اس ویب سائٹ کو یہ جاننے کی اجازت دے دیں۔» | Two sentences, two stops. Equals the wording of ruling N4. Left: «اپنے مقام», «دیکھ لیں» ('check'). Entered: «اس ویب سائٹ کو», «یہ جاننے», «دے دیں» ('give'). Findings 1 and 2. |

## Recurring words after the edits

- Accommodation, staying, lodging. Two strings name visitor accommodation, nav.stayShort and nav.stay, and both say «رہائش»: one source, one word. No string of the text carries «قیام» any longer, and neither `calibration` nor `termbase_final` still gives «قیام گاہیں» as the label (the one mention left there is a dictionary citation in the source field of the entry «بندرگاہ»). A third string has the same stem for another thing: home.route.s1.d, «سپاہیوں کی رہائش گاہیں», the barracks of the fort («الثكنات»), unchanged since stage 5. That is one common word in its one sense (where someone lives or stays), told apart by the compound and its owner; it is not a term with two referents, and it is right as it stands. What changed is only the echo: the label and the barracks used to share the ending («قیام گاہیں», «رہائش گاہیں») and now share the stem. No English or Arabic of the batch names staying anywhere else.
- The cloak. The source names the garment in two strings (cat.crafts.d: 'cloaks', «البشوت»; home.route.s2.d: 'cloaks', «بشوتٌ»). Both carry it, in one spelling: «چوغوں» (oblique plural) and «چوغے» (direct plural). No string carries «چغ…» in any inflection, and no other word for the garment occurs («بشت», «عبا», «لبادہ», «جبہ», «قبا»: none). Finding 5 is about the record, not the text.
- «مقام». 27 strings, and in every one it is the attraction or the sight: nav.attractions, search.placeholder, search.idle, nav.myTrip, home.hero.cta2, cat.historic.t, cat.nature.t, home.feat.title, home.feat.lead, home.feat.all, home.route.link, fact.sites.l, home.plan.lead, CATEGORY_LABELS.historic, CATEGORY_LABELS.nature, list.title, list.searchLabel, list.search, fav.add, CATEGORY_LABELS.religious, list.empty, crumb.attractions, det.hoursNotice.op, det.nearby.d, det.allSights, inline.404.text, det.fromPlace. The only words with these letters are «مقام» and «مقامات». map.locate.err carries neither. The visitor's position is said once in the batch, by a clause: «آپ کہاں ہیں».
- «ویب سائٹ». Five strings again: search.open, search.label, foot.col.site, foot.independence, map.locate.err; «اس ویب سائٹ کو» and «یہ ویب سائٹ» mean the same thing.
- 'By local hands'. «یہیں کے لوگوں کے ہاتھوں» in both strings that say it (cat.crafts.d, home.route.s2.d): one phrase.
- Everything listed in the round-1 report under this heading is unchanged: «سیر», «سرگرمی», «مینو», «لنک», «کاپی», «فارم» beside «باغ», «تقریباً» beside «اندازاً», «مواد», «دن میں».

## Strings that quote or follow another

- nav.stayShort and nav.stay; every other `same_source_as` group: equal.
- home.route.link quotes nav.myTrip inside “ ”; inline.404.text names crumb.home and nav.attractions; a11y.mainNav contains a11y.menu; list.title ends with nav.attractions: in step.
- list.lead and home.feat.lead share their opening word for word up to «تک»; after it list.lead now has the colon and home.feat.lead keeps its comma. That is right: in home.feat.lead the opening leads into «چار مقامات», in list.lead it is set off from an instruction.
- cat.crafts.d and home.route.s2.d: one phrase for the hands, one spelling for the garment.
- The figure card and the hero lead («25 لاکھ»); home.route.time.day and the opening of home.route.s3.d; foot.tagline and home.hero.title; det.hoursNotice with det.hoursNotice.op: unchanged, in step.

## Names, loans, rulings, termbase

- The two structured-data names, which no blind reader sees, are unchanged since stage 5 and were read again code point by code point: inline.home.country = U+0633 U+0639 U+0648 U+062F U+06CC U+0020 U+0639 U+0631 U+0628 («سعودی عرب»); data.oasisName = U+0627 U+0644 U+0627 U+062D U+0633 U+0627 U+0621 U+0020 U+06A9 U+0627 U+0020 U+0646 U+062E U+0644 U+0633 U+062A U+0627 U+0646 («الاحساء کا نخلستان»). Each is the whole string and equals its key.
- The admitted loans, each equal to its key and each with a note that cites P16: «مینو», «لنک», «کاپی», «براؤزر», «فارم». No entry was added or dropped in round 2 (23 entries).
- Every wording quoted in a ruled item of `calibration` stands in the string the item names, letter for letter: the nine strings of P27; the four phrases of N2; «الاحساء کے لیموں»; bare «خلیج» three times; «25 لاکھ سے زیادہ» and «25 لاکھ+»; «UR»; «اشتراک کریں»; the two sentences of N4 as round 2 rules them; «فارم»; «مرکزی مینو», «لنک کاپی ہو گیا ✓», «مضامین», «کھانے پینے کی جگہیں», «ویڈیو»; «رہائش» (named in P16-test); and the opening of N7. The wordings the rulings withdraw or keep on record do not occur: «مقام کی اجازت», the literal forms of N4 and N7, «زرعی فارم».
- Round-1 finding 1, the three stale notes: corrected, all three. «ویب سائٹ»: the note lists five strings and the word stands in exactly those five. «حسی»: the note quotes the opening as it now reads and says the word stands straight after «عربی لفظ». «حساوی لیموں کا باغ»: one count of pending remains, and the fruit and the farm word are stated as ruled; nothing in the note contradicts itself. No other note names a string in which its key does not stand.
- Round-1 finding 2 (the two senses of «مقام»): removed from the text, confirmed above. Round-1 findings 3 and 4: kept by the judge, text unchanged.

## Not verified

- Nothing was seen in a browser. The page text of `blind-input.on-r2.md` is cut from a build that carries these strings, and that is where the edits were read in place; widths and the header are the judge's probe and the coordinator's measurement.
- The stage checker was not run by this pass; its recorded line for round 2 reports no finding, and the P10 conversion it now tests was checked here by arithmetic in round 1.
- Dictionary pages opened in this run: two, through a fetch tool that relays the page — «رَہائِش — اسم، مؤنث» and «چوغَہ», noun, masculine (rekhtadictionary.com). The page counts behind the choice of «چوغ…» over «چغ…» are stage 2's and were not counted again; a headword spelled «چوغا» was not looked for.
- What only a reader can show: whether «رہائش» alone is read as accommodation and not as housing; whether «عربی لفظ» is taken with «حسی» and cures the misreading (finding 4); whether the colon lets a reader past the opening of list.lead; whether «یہ جاننے کی اجازت» is understood (finding 2); whether the crafts line now tells him what the card offers.
- Finding 1 rests on reading the two page scripts in the worktree, not on running them.
