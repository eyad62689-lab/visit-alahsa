RESULT: must-fix=0 should-fix=1 note=4

# Proof pass on the round-3 text — batch b0-ui (161 interface strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. Nothing was changed.
Text read: `strings` of `stages/07-judge.round3.json` (file sha256 `5252d31305cd9a9ceb6d5fcd155d1fe9dd7cb19ce6935138a33c6814802fd32f`; text hash as the tools compute it `6e0f7f9180af83621b0994212dcd7b50e270c54fa7d7de9d660181896a2651ee`; 161 strings, 5048 code points; pack `f7af9992b906`). The same hash stands in `blind/blind-input.on-r3.json` and in the evidence block of `stages/final.json`; the 161 strings of `final.json` equal this text, and its `termbase_final`, `calibration` and `source_defects` equal the judge file's lists.
The 3 entries of the change log replay on the round-2 text to exactly this text; no unlogged difference. What the text is made of: 136 strings as stage 5 left them, 17 in their round-1 form (home.name.body among them), 6 in their round-2 form (nav.stayShort, nav.stay, cat.crafts.d, home.route.s2.d, home.route.s5.d, list.lead), 2 new in this round (nav.leisure, map.locate.err).
Judged by the role file as amended by the rulings of `calibration` (20 items). Scans are this pass's own (`s5p-r3-scan.mjs`, `s5p-r3-lists.mjs`, `s5p-r3-view.mjs`; they import nothing from the tools). The three changed strings were read in place on the built page text (`blind/blind-input.on-r3.md`). The stage checker was not run.

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 5048 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key, the counts unchanged since round 1: «الاحساء» 16, «جبل القارہ» 2, «قصر ابراہیم» 2, «سوق القیصریہ» 3, «العقیر» 2, «مسجد جواثا» 1, «حساوی لیموں کا باغ» 1, «سعودی عرب» 1, «یونیسکو» 5, «الاحساء کا نخلستان» 1, «واٹس ایپ» 1, «گوگل میپس» 1, «خلیج» 3. No banned variant. Latin only where allowed ({op}, {n}, Enter, UR).
- item 3, قواعد (grammar): PASS. At the seams of the three edits: «زرعی فارم» (an adjective that does not inflect, the noun's plural unchanged, as its entry says); «براؤزر میں دیکھ لیں کہ اس ویب سائٹ کو یہ جاننے کی اجازت ہے یا نہیں» (dative «کو», oblique infinitive with «کی», feminine «اجازت» with «ہے», the alternative closed by «یا نہیں»); home.name.body as proofed in round 1 («“حسی” کی جمع ہے»).
- item 4, خطاب (address): PASS. «آپ» 7 times with honorific forms; the request of the edited message, «دیکھ لیں», is the honorific subjunctive. «تو» twice, the particle. No «تم», «تمہارا», «تیرا».
- item 5, عنوانات (headings): PASS. 31 strings end with «۔», each where the English ends a sentence; the edited label carries no stop; no bracket anywhere.
- item 6, termbase compliance: PASS. Keys, genders and plurals as the 24 entries have them. The new entry «چوغہ» and the two strings that carry the word agree (see "The cloak entry").
- item 7, رموز (punctuation): PASS. «۔» 43, «،» 37 (one more than in round 2: the comma of home.name.body is back), «؟» 2, «؛» 1; quotation marks 3 pairs, balanced; ellipsis 4; middle dot 3; ASCII colon 7; one plus sign. No ASCII full stop or comma, no straight quote, no «», no dash, no bracket, no doubled mark, no space before a mark, no double, leading or trailing space, no U+00A0.
- item 8, اعداد (numbers, dates, currency): PASS. Latin digits only: 25, 25, 2018, 1. No «ملین», «بلین».
- item 9, انگریزیت (loans, banned lists): PASS. The words new to the text in this round are «زرعی» and «دیکھ»; neither is a loan («زَرْعی», adjective, is a dictionary headword). The loans in Urdu letters are the entries that cite P16 and nothing else; «فارم» inside «زرعی فارم» equals its key. None of the refused, banned or withdrawn forms occurs («شیئر», «لوکیشن», «گائیڈ», «فوٹوگرافی», «فیملی», «ہال», «ہیریٹیج», «ہوٹل», «پروگرام», «بلاگ», «ریستوراں», «کیفے», «بٹن», «لائم», «وڈیو», «عالمی ثقافتی», «مینیو», «فارمز», «چغے», «چغوں», «قیام گاہیں», «اپنے مقام», «مقام کی اجازت», «اجازت دے دیں»). No officialese chain.
- item 10, گلوس (glossing): PASS. No bracket in any string; the quoted word of home.name.body stands bare inside its quotation marks, with no label before it.
- item 11, ساخت (structure): PASS. 161 ids, the pack's, in pack order; one line each; {op} and {n} once each, between spaces; det.openMaps, fav.added, plan.copied and det.allSights end with a space and their symbol. No Markdown, link or HTML.

No finding below is a breach of one of the eleven items, and none asks for a change in a string. Four are in the lists that go into the repository; one is the reading of this round's new label against its sources.

## Findings

1. [should-fix] `calibration`, item N4, field `guard` — 'as in the four other languages of the key'
   - What is wrong: the key has five other languages, not four. `src/i18n/ui.ts` carries map.locate.err in Arabic, English, Chinese, German and Russian, and all five say 'check'. The same entry says so in its evidence ('the English, the Arabic and the Russian, German and Chinese values'), and the judge's note to this proof names the five.
   - Rule: an entry that says one thing in its evidence and another in its guard; the guard is what a later proofreader is told to hold the string to.
   - Minimal correction: 'five' for 'four' (or 'as in the other languages of the key').
   - Effect on the text: none. String and ruling agree word for word (see "N4 and the string").

2. [note] `calibration`, item N5, field `guard` — 'the repository's tool is to be run again on a build of the final text before it is applied'
   - What it is: a task for the apply step written into a guard. The batch's `measure` folder holds files dated after the judge file that look like that run on this text: `repo-tool.verify.on-r3.txt` (the Urdu bar stands from 1518px with an overlap of -38px; every cell sound) and `summary.on-r3.txt` (nav.leisure 155.8px; the bar needs 1457px). Those are the figures the guard quotes from the probe.
   - Rule: none broken. If those files are that run, the clause is out of date on the day it enters the repository; the guard should then state the result. Correction: the coordinator's, when the ruling is written.

3. [note] `calibration`, items P16-test, N3, N6, P27 — words that point at a round or a file without naming it
   - P16-test, `evidence`: 'This round added what stage 4 could not fetch' — that was round 1; the entry goes on to 'Round 2' and 'Round 3', so in the final list 'this round' reads as the third.
   - N3, `evidence`: 'fetched in this run' — round 1 again.
   - N6, `evidence`: '(see the two change entries)' — the entries of round 1's change log; this file's three change entries are others.
   - P27, `ruling_or_recommendation`: 'as they are in this file' — true beside the strings; in the termbase no string stands beside the ruling (it does spell out all nine wordings, so nothing is lost).
   - Rule: none broken; the statements are right once the round is known. Correction: name the round ('round 1', 'round 1's change log').

4. [note] `termbase_final`, entries «خلیج» and «چوغہ» — two small things in entries that are otherwise in order
   - «خلیج», field `source`: 'the bare form is the founding decision recorded in open item P5'. P5 is ruled (the item says so, and the entry's own note opens 'P5 ruled in b0-ui round 1'); once the ruling is entered, 'open item P5' points at nothing.
   - «چوغہ», field `note`: 'direct plural «چوغے», oblique plural «چوغوں» (cat.crafts.d, home.route.s2.d)'. The strings are listed in the reverse order of the forms: the direct plural stands in home.route.s2.d, the oblique in cat.crafts.d.
   - Rule: none broken. Correction: 'ruled in P5'; swap the two ids.

5. [note] `nav.leisure` — «بازار، تفریح گاہیں اور زرعی فارم»
   - What entered: «زرعی» ('agricultural'). Neither source carries it: the English says 'Farms', the Arabic «المزارع». It is an explicitation — a farm is agricultural by what the word means — let in to keep the loan from being read as the form one fills in, which two readers in a row did. No fact changes. It does make the label sound narrower than its source for a group that, by N5's own evidence, also holds a bird garden and a zoo; the judge charges the word under accuracy.
   - What it does not settle: the batch still names farms with two words (see "Farms"), and the third reader, whose remark this edit answers, asked for 'one word throughout' (the third reader's report, `06-blind-reader.on-r2.md`, observation 2). The label as it now stands has been read by no blind reader.
   - Rule: none broken; N5 rules the wording and quotes the label whole. Correction: none proposed.

## Code points

- Forbidden letterforms: none.
- Non-Latin digits, U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, presentation forms: none.
- 72 distinct code points, the same inventory as the round-1 and round-2 texts: no code point new, none gone.
- U+06BE 61 times (60 in round 2: «دیکھ» is back in map.locate.err), every time after a ruled aspirate; «ڑھ» in the four words of ruling P22a.
- U+06C1 directly after an aspirable consonant: the same 21 words, all plain he.
- Read and right: U+064B twice («تقریباً», «اندازاً»); U+0621 16 times, all in «الاحساء»; U+0624 twice («پڑاؤ», «براؤزر»).
- The new word: «زرعی» = U+0632 U+0631 U+0639 U+06CC; the two-word form = U+0632 U+0631 U+0639 U+06CC U+0020 U+0641 U+0627 U+0631 U+0645.

## The 3 edits, each read in its place

| # | string, where it renders | Urdu now | reading |
|---|---|---|---|
| e1 | nav.leisure — header bar, third link, and the same key as a footer link under «سیر کریں» | «بازار، تفریح گاہیں اور زرعی فارم» | A label, no stop; three groups, the last joined by «اور». One word entered, «زرعی»; the loan after it equals its key. Finding 5. |
| e2 | home.name.body — paragraph under «الاحساء… جہاں ریت اپنا پانی چھپائے رکھتی ہے» | «لفظ “الاحساء”، “حسی” کی جمع ہے، یعنی وہ میٹھا پانی جو …» | Equal to the round-1 string, all 332 code points. «عربی» is gone from the string and from the whole text. Nothing entered. The homograph «حسی» stands as it did; N7 is open and the entry pending. |
| e3 | map.locate.err — shown after «مجھ سے کتنی دور؟» fails; also on the map page | «معلوم نہیں ہو سکا کہ آپ کہاں ہیں۔ براؤزر میں دیکھ لیں کہ اس ویب سائٹ کو یہ جاننے کی اجازت ہے یا نہیں۔» | Two sentences, two stops, no comma before «کہ». The verb is the sources' again: 'check' («تحقق», «دیکھ لیں»), and it holds in every case in which the page shows the message. Left: 'give'. Still entered, as since stage 2 and charged by the judge: 'this website', where both sources say the browser's permission; the permission is said by a clause, not a noun. |

## The four things to confirm

- N4 and the string: they agree word for word. The wording quoted in N4's ruling equals map.locate.err byte for byte, both sentences. The second sentence is also, letter for letter, the literal form N4 had recorded in round 2. The wordings N4 withdraws or keeps as an option («مقام کی اجازت», the form with «دے دیں») do not occur in the text. N4's guard names «دیکھ لیں», which stands in the string. (Finding 1 is in that guard's count of languages, not in the wording.)
- home.name.body and round 1: byte-identical to `strings["home.name.body"]` of `07-judge.round1.json`. Its opening is U+0644 U+0641 U+0638, a space, the first quoted name, U+060C closed up to the closing mark, a space, the second quoted word. No string of the batch carries «عربی».
- The cloak entry: see the next section.
- nav.leisure and the farms: see "Farms".

## The cloak entry

- Entry: key «چوغہ» (U+0686 U+0648 U+063A U+06C1), masculine, plural «چوغے», verified; the note gives the oblique plural «چوغوں» and bars «چغے» / «چغوں». The term schema has no field for the oblique, so it stands in the note.
- home.route.s2.d: «کڑھے ہوئے چوغے» — direct plural, equal to the entry's `plural` (U+0686 U+0648 U+063A U+06D2); the participle is masculine plural, as the entry's gender asks. The English and the Arabic are plural here too ('cloaks', «بشوتٌ»).
- cat.crafts.d: «چوغوں پر کڑھائی» — oblique plural before the postposition, the form the note gives (U+0686 U+0648 U+063A U+0648 U+06BA). Plural in both sources ('cloaks', «البشوت»).
- Number and case agree with the entry in both strings. The singular (the key itself) stands in no string, which the note says. Neither barred form occurs. The note lists the two strings in the reverse order of the two forms (finding 4).
- Read in this run: the entry page the source field cites, rekhtadictionary.com/meaning-of-choga — headword «چوغَہ», «اسم، مذکر», «عبا کی قسم کا ڈھیلا ڈھالا لباس جس کا اگلا حصہ کھلا رہتا ہے، چغا، عبا، لباس، لبادہ». The source field quotes it rightly.

## Farms

- Strings whose source names farms: two. nav.leisure ('Souqs, Parks & Farms', «… والمزارع») says «زرعی فارم»; home.route.s5.n ('Hasawi Lime Farm', «مزرعة الليمون الحساوي») says «حساوی لیموں کا باغ».
- The footer: it has no string of its own for this link. `Footer.astro` prints nav.leisure, so the menu and the footer show the same label by construction; on the built page they are the same line twice.
- One word or two: two. The group is «زرعی فارم»; the one farm that is named keeps «باغ» inside its name, by ruling N5, until the round that writes its page (entry pending). «باغ / باغات» is also the batch's word for orchards (home.hero.title, foot.tagline), groves (cat.nature.d, home.route.s5.d) and gardens (CATEGORY_LABELS.parks). That is the state the round-1 proof noted and the judge kept; this round changed the form of the first word, not the count.
- The bare loan: it stands in no string. The only occurrence of «فارم» in the 161 strings is inside «زرعی فارم»; «کھیت» occurs nowhere. Outside the strings the bare word stands as the termbase key, in N5 and P16-test as the word for the category, and in the judge's list of recurring choices ('farms that receive visitors = «فارم» (alone in a label: «زرعی فارم»)'). That is right: the key is the loan that P16 admits and that must be spelled one way, and the entry's note and N5 both give the label form and quote the label whole. No list still quotes the label in an earlier form.
- Two things to know about that record. The bare word in a sentence, the use N5 keeps for it, is exercised by no string of this batch: the only reader evidence on the bare word is the two readers who read it as a form in this label. And N5 puts the qualifier on 'where the word stands alone in a label' (the entry: 'Standing alone in a label'), while the example both give is a label in which it is the third of three; what is meant is a label as against a sentence, and a later label writer may ask.

## Strings that quote or follow another

- inline.404.text names crumb.home («صفحہ اول») and nav.attractions («سیاحتی مقامات»), the labels of its two buttons: in step.
- home.route.link quotes nav.myTrip inside “ ” («میرے محفوظ کردہ مقامات»): in step.
- The nine `same_source_as` groups, each one value: crumb.attractions = nav.attractions; cat.events.t = foot.l.events = nav.events; cat.taste.t = nav.food; nav.dine = nav.dining; nav.stay = nav.stayShort; home.plan.cta = nav.plan = nav.planVisit; CATEGORY_LABELS.historic = cat.historic.t; CATEGORY_LABELS.nature = cat.nature.t; CATEGORY_LABELS.market = cat.market.t.
- nav.leisure shares its first two words with the labels they come from: «بازار» (cat.market.t, «روایتی بازار») and «تفریح گاہیں» (CATEGORY_LABELS.parks, «تفریح گاہیں اور باغات»).
- Unchanged and in step: a11y.mainNav with a11y.menu; a11y.skip with a11y.scrollDown; list.title with nav.attractions; list.lead and home.feat.lead up to «تک»; foot.tagline with home.hero.title; the figure card with the hero lead; home.route.time.day with the opening of home.route.s3.d; cat.crafts.d with home.route.s2.d; det.hoursNotice with det.hoursNotice.op.

## Names, loans, rulings, termbase

- The two structured-data names, which no blind reader sees, are unchanged since stage 5 and were read again code point by code point: inline.home.country = U+0633 U+0639 U+0648 U+062F U+06CC U+0020 U+0639 U+0631 U+0628 («سعودی عرب»); data.oasisName = U+0627 U+0644 U+0627 U+062D U+0633 U+0627 U+0621 U+0020 U+06A9 U+0627 U+0020 U+0646 U+062E U+0644 U+0633 U+062A U+0627 U+0646 («الاحساء کا نخلستان»). Each is the whole string and equals its key.
- The admitted loans, each equal to its key and each with a note that cites P16: «مینو», «لنک», «کاپی», «براؤزر», «فارم».
- `termbase_final`: 24 entries, 19 verified and 5 pending («حساوی لیموں کا باغ», «مفلق», «حسی», «بندرگاہ», «براؤزر»), as the judge's note counts them. No key or plural carries a forbidden letterform, a vowel sign or stray spacing; none collides with a key already in the worktree's termbase. Every note that names strings names only strings in which its key stands («ویب سائٹ»: the five that carry it; the quotation of map.locate.err in that note and in «براؤزر» is the string as it now reads; «حسی» quotes the opening as it now reads and is pending with N7, which is open; «فارم» and «حساوی لیموں کا باغ» give the label form).
- Every wording quoted in a ruled item stands in the string the item names, letter for letter: the nine strings of P27; the four phrases of N2; «الاحساء کے لیموں»; bare «خلیج» three times; «25 لاکھ سے زیادہ» and «25 لاکھ+»; «UR»; «اشتراک کریں»; both sentences of N4; the whole label in N5; «مرکزی مینو», «لنک کاپی ہو گیا ✓», «مضامین», «کھانے پینے کی جگہیں», «ویڈیو»; «رہائش». N7, which is open, quotes the opening of home.name.body as it stands.

## `calibration` read entry by entry

- Statuses: 14 ruled (P3c-labels, P5, P6, P10, P22a, P27, P16-test, LANG, N1 to N6), 4 open (P3c, P22, BRAND, N7), 2 untouched (P4, P9). The judge's notes, the pending entries and the source-defect list say the same of each; no ruled item is called open and no open one ruled anywhere in the calibration, the notes or the source defects. The one slip of that kind is in a termbase source field (finding 4).
- Guards: every form a guard says must not occur is absent from the text («خلیج فارس», «خلیج عرب», «لائم», «ملین», «بلین», «عالمی ثقافتی», «وڈیو», «شیئر», «لوکیشن»), and every form a guard or a ruling says stands does stand («دیکھ لیں», «زرعی فارم», «رہائش», «قدرتی» in its own element, «ڑھ» in the four strings named). No guard names a form the text no longer has. The clauses of P10 that the tools parse are in its ruling, word for word as the guard lists them.
- `strings_affected`: every id named exists in the batch and carries what the item says.
- What was found: the count in N4's guard (finding 1); the task in N5's guard (finding 2); the four unanchored references (finding 3). Nothing else.
- Checked against the worktree because it is stated as fact in N7: `tools/check-ur-text.mjs` does exempt a termbase key that carries U+0650 or U+06C2 from the P8 guard (the keys are cut out of the page text before the test). N7 reports it rightly.
- N7's evidence still carries round 2's argument for the label, followed by round 3's finding that it did not cure and a ruling that withdraws it. Read in order it is a history, not a contradiction.

## Not verified

- Nothing was seen in a browser. The page text of `blind-input.on-r3.md` is cut from a build that carries these strings; widths and the header are the judge's probe and the files of the `measure` folder, which were read, not reproduced.
- The stage checker was not run by this pass; its recorded lines for round 3 and for `final.json` report no finding.
- Dictionary pages opened in this run: two, through a fetch tool that relays the page — «چوغَہ», «اسم، مذکر» (rekhtadictionary.com/meaning-of-choga) and «زَرْعی», adjective, 'agricultural, agrarian' (meaning-of-zar-ii). The page counts in the «چوغہ» entry are stage 2's.
- What the judge files say of the third reader was checked against his report for the three observations this round acts on (2, 8, 26) and found as stated; the rest of the reader record in the lists was not compared line by line.
- What only a reader can show: whether «زرعی فارم» reads as farms one visits and not as farming land; whether the 'check' form of the location message is as clear as the clause it is built on was to the third reader. Neither string has been read blind as a whole.
- That the page shows the location message on every failure rests on reading the two page scripts, not on running them.
