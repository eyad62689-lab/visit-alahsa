RESULT: must-fix=0 should-fix=1 note=3

# Proof pass on the round-1 text — batch b0-ui (161 interface strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. Nothing was changed.
Text read: `strings` of `stages/07-judge.round1.json` (file sha256 `8a753e07d5b9194fe2a3a302a551a6370c63b3ea5c4f15b5a04dd597596261e5`; text hash as the tools compute it `f14867605e36907fe254fc50077a35ae92c07b27f96f37e63f80be33842a968a`; 161 strings, 5031 code points; pack `f7af9992b906`). It differs from `05-proofreader.json` in 19 strings, and the 19 entries of the change log replay on the stage-5 text to exactly this text (no unlogged difference).
Judged by the role file as amended by this round's rulings (`calibration`: P5, P6, P10, P22a, P27, P3c-labels, P16-test, LANG, N1 to N6).
Scans are this pass's own (`s5p-scan.mjs`, `s5p-rulings.mjs`, `s5p-hash.mjs` in the batch folder; they import nothing from the tools). The stage checker was not run: it rewrites an existing file.

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 5031 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key: «الاحساء» 16, «جبل القارہ» 2, «قصر ابراہیم» 2, «سوق القیصریہ» 3, «العقیر» 2, «مسجد جواثا» 1, «حساوی لیموں کا باغ» 1, «سعودی عرب» 1, «یونیسکو» 5, «الاحساء کا نخلستان» 1, «واٹس ایپ» 1, «گوگل میپس» 1, «خلیج» 3. No head name without its final hamza, no «الہفوف», «جبل قارہ», «القارۃ», «خلیج فارس», «خلیج عرب». No pleonasm (every «قصر», «سوق», «جبل» is followed by its own name; «مسجد» stands once as a common noun, in home.route.s1.d). Latin letters only where allowed: {op}, {n}, the key name Enter, and the code UR (ruling LANG).
- item 3, قواعد (grammar): PASS. The agreements the edits touch are right: «لنک کاپی ہو گیا» (masculine singular with «لنک»), «اپنی سیر» (feminine), «فاصلے اندازاً دیے گئے ہیں» (masculine plural), «اپنے مقام کی اجازت» (oblique masculine, then feminine), «“حسی” کی جمع ہے» (feminine), «25 لاکھ سے زیادہ کھجور کے درختوں کے بیچ» (oblique plural before «کے بیچ», the scale word unchanged after the figure), «صفحہ اول یا سیاحتی مقامات پر جائیں». The 142 unchanged strings were re-read; nothing to report.
- item 4, خطاب (address): PASS. «آپ» 7 times, each with an honorific form; every request in the honorific subjunctive, the new ones included («جائیں», «دیکھ لیں», «سیر کریں», «اشتراک کریں»). «تو» twice, both the particle after a subjunctive. No «تم», «تمہارا», «تیرا».
- item 5, عنوانات (headings): PASS. 31 strings end with «۔» and each has an English that ends a sentence; no label, heading, button or accessible name ends with «۔»; none of the 13 edited labels gained one. No bracket anywhere, so no gloss in a heading.
- item 6, termbase compliance: FINDING. The text itself is compliant (keys, genders, plurals, the five admitted loans each spelled as its entry). Finding 1 (should-fix) is in three entry notes of `termbase_final`, not in the 161 strings; findings 2 to 4 (notes) are the words that have two senses or two forms across the batch after the edits.
- item 7, رموز (punctuation): PASS. «۔» 43, «،» 40, «؟» 2, «؛» 1; quotation marks U+201C / U+201D 3 pairs, balanced; ellipsis U+2026 4; middle dot 3; ASCII colon 6. No ASCII full stop (the decimal figure is gone), no ASCII comma, no straight quote, no «», no dash, no bracket, no space before a mark, no double, leading or trailing space, no U+00A0. One plus sign, the last character of the figure card (ruling P10).
- item 8, اعداد (numbers, dates, currency): PASS, by ruling P10. Latin digits only: 25 (home.hero.lead), 25 (inline.home.fact.palms.n), 2018, 1. No «ملین», no «بلین». No clock time, currency amount, date or Hijri year in the batch. Months «جون», «اگست».
- item 9, انگریزیت (loans, banned lists): PASS, by ruling P16-test. The English loans in Urdu letters are exactly the entries whose note cites P16 — «ویب سائٹ», «ویڈیو», «آن لائن», «فیس», the brands «گوگل میپس» and «واٹس ایپ», and the five admitted in this round, «مینو», «لنک», «کاپی», «فارم», «براؤزر» — plus the organisation's name «یونیسکو» and the unit «کلومیٹر» of the style rule. None of the refused or banned forms occurs: «شیئر», «لوکیشن», «گائیڈ», «فوٹوگرافی», «فیملی», «ہال», «ہیریٹیج», «ہوٹل», «پروگرام», «بلاگ», «ریستوراں», «کیفے», «بٹن», «لائم», «وڈیو», «عالمی ثقافتی», «مینیو», «فارمز». The one new passive, «دیے گئے ہیں», is a plain passive, not a verbal-noun chain.
- item 10, گلوس (glossing): PASS. No bracket in any string; «جبل القارہ» bare; the names with an opaque generic stand bare in labels, a list and the description (P3c-labels, ruled A).
- item 11, ساخت (structure): PASS. 161 ids, the pack's, in pack order; one line each; {op} once in det.hoursNotice and {n} once in data.dist.about, each between spaces; det.openMaps ends with a space and U+2197, fav.added and plan.copied with a space and U+2713, det.allSights with a space and U+2190. No Markdown, link or HTML.

## Findings

1. [should-fix] `termbase_final` — notes of the entries «ویب سائٹ», «حسی», «حساوی لیموں کا باغ»
   - What is wrong: three entry notes still describe the stage-4 text or the stage-4 state, and this round's own edits and rulings made the statements untrue.
     (a) «ویب سائٹ»: the note ends "Used in search.open, search.label, foot.col.site, foot.independence, map.locate.err." After edit 16 the word no longer stands in map.locate.err («معلوم نہیں ہو سکا کہ آپ کہاں ہیں۔ براؤزر میں اپنے مقام کی اجازت دیکھ لیں۔»); it stands in four strings.
     (b) «حسی»: the note says "quoted once, inside “ ” and after «لفظ», in home.name.body." After edit 8 the sentence opens «لفظ “الاحساء”، “حسی” کی جمع ہے»: «لفظ» now introduces «الاحساء», and «حسی» follows the comma.
     (c) «حساوی لیموں کا باغ»: the note opens "the fruit is ruled «لیموں» (P6) and the category of farms is ruled «فارم» (N5)" and further down still says "Pending on three counts: … the word for the fruit is open item P6 (provisional «لیموں», recommended for ruling); and the word for a farm is raised as item N5."
   - Rule: the batch's own consistency; the termbase binds every later stage (RUNBOOK, "What binds every stage", 2), and these notes are what the apply step writes into it.
   - Minimal correction: (a) delete ", map.locate.err" from the list; (b) "quoted once, inside “ ”, in home.name.body; «لفظ» now introduces «الاحساء»"; (c) delete the two superseded counts, so that one remains (no reference form of the name).
   - Effect on the text: none. No string changes, so the blind read is not affected.

2. [note] `map.locate.err` — «معلوم نہیں ہو سکا کہ آپ کہاں ہیں۔ براؤزر میں اپنے مقام کی اجازت دیکھ لیں۔»
   - What it is: after edit 16 the word «مقام» has two senses in the batch. Here it is the visitor's position; in the 27 other strings that carry it, it is an attraction. On the detail page the message appears inside the card whose notice says «اس مقام کی انتظامیہ», above «اس مقام کی تصویریں», beside «یہ مقام محفوظ کریں»; on the same page: «آس پاس کے مقامات», «تمام مقامات ←», «سیاحتی مقامات», «میرے محفوظ کردہ مقامات». Inside the message itself the same thing is said two ways: «آپ کہاں ہیں» in the first sentence, «اپنے مقام» in the second.
   - Rule: none broken. This is ruling N4 word for word ("«مقام» is the visitor's location in this phrase only, where «اپنے» marks it"); the string equals the ruled wording byte for byte.
   - Correction: none proposed. Recorded because the collision was created by the edit and has not been read by anyone; it is the blind read's to test.
   - The 27 strings: nav.attractions, search.placeholder, search.idle, nav.myTrip, home.hero.cta2, cat.historic.t, cat.nature.t, home.feat.title, home.feat.lead, home.feat.all, home.route.link, fact.sites.l, home.plan.lead, CATEGORY_LABELS.historic, CATEGORY_LABELS.nature, list.title, list.searchLabel, list.search, fav.add, CATEGORY_LABELS.religious, list.empty, crumb.attractions, det.hoursNotice.op, det.nearby.d, det.allSights, inline.404.text, det.fromPlace.

3. [note] `nav.leisure` — «بازار، تفریح گاہیں اور فارم» · `home.route.s5.n` — «حساوی لیموں کا باغ»
   - What it is: after edit 5 the source word 'farm' («مزرعة», «المزارع») has two Urdu words in the batch: «فارم» in the navigation label and «باغ» inside the name of the one farm the batch names. «باغ / باغات» is also the batch's word for orchards (home.hero.title, foot.tagline), groves (cat.nature.d, home.route.s5.d) and gardens (CATEGORY_LABELS.parks: «تفریح گاہیں اور باغات»). The label «… فارم» leads to the page where this «باغ» is listed.
   - Rule: none broken. Ruling N5 says so in terms ("The lime farm keeps «باغ» in its name until the round that writes its page settles the name (entry pending)"). No string carries «کھیت» any longer.
   - Correction: none in this batch. For the round that writes the farm's page.

4. [note] `det.nearby.note` — «فاصلے اندازاً دیے گئے ہیں، سیدھی لکیر کے حساب سے۔» · `data.dist.about` — «تقریباً {n} کلومیٹر»
   - What it is: the note stands directly under the cards whose distances read «تقریباً 3 کلومیٹر», and says of those same distances «اندازاً». Two words for 'approximately' in one block.
   - Rule: none broken. The pair is not new (stage 5 had «تقریباً» and «تخمینی»): edit 18 exchanged one of the two words and did not create the second. The sources vary as well ('~' and 'approximate'; «نحو» and «تقريبية»). «اَنْدازاً» is a dictionary headword (adverb) and is spelled with the tanwin on the alif, as «تقریباً» is.
   - Correction: none proposed.

## Code points

- Forbidden letterforms: none.
- Non-Latin digits (U+0660–0669, U+06F0–06F9): none. U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, presentation forms: none.
- 72 distinct code points. Yeh U+06CC 436, kaf U+06A9 231, he U+06C1 177, ye barree U+06D2 193, noon ghunna U+06BA 162.
- U+06BE 61 times, every time after a ruled aspirate: کھ پھ بھ تھ ٹھ جھ چھ دھ ڈھ گھ, and ڑھ in four words (کڑھائی, چڑھیں, کڑھے, پڑھیں; ruling P22a). New since stage 5: «لاکھ» twice; gone: «کھیت», «بھیجیں».
- U+06C1 directly after an aspirable consonant, 21 words, each read: all plain he (بہتا زیادہ جگہیں منصوبہ جگہ نتیجہ کردہ جہاں تہ وعدہ کہ کہاں پہاڑ راستہ پہلے پہلا پہر پسندیدہ پہنچیں بہترین کہیں).
- Read and right: U+064B twice — «تقریباً» (data.dist.about) and, new in this round, «اندازاً» (det.nearby.note); U+0621 16 times, all in «الاحساء»; U+0624 twice — «پڑاؤ» and, new, «براؤزر» (one precomposed letter, as in the entry's key).
- Code points new to the text since stage 5: U+002B (the plus of «25 لاکھ+»), U+0055 and U+0052 (the code UR). Gone: U+002E (the decimal point of «2.5»).

## The 19 edits, each read in its place

| # | string, where it renders | Urdu now | reading |
|---|---|---|---|
| e1 | home.hero.lead — hero paragraph; description in JSON-LD and the web manifest | «… اور 25 لاکھ سے زیادہ کھجور کے درختوں کے بیچ زندگی پھلتی پھولتی ہے۔» | 2.5 million = 25 lakh, exact. Oblique plural before «کے بیچ» right. The largest-oasis sentence still closes before the palms (C15). Nothing entered or left. |
| e2 | a11y.skip — skip link | «سیدھے مواد پر جائیں» | 'main', which neither source has, is gone. Now one word for 'content' with a11y.scrollDown («نیچے مواد پر جائیں»). |
| e3 | a11y.menu — aria-label of the menu toggle | «مینو» | Equals the entry's key. |
| e4 | a11y.mainNav — aria-label of the nav landmark | «مرکزی مینو» | Contains a11y.menu. 'Navigation' is said as 'menu' (stage 5 said 'list'): not literal before or after. |
| e5 | nav.leisure — header bar and footer link | «بازار، تفریح گاہیں اور فارم» | Three plurals; «فارم» plural as its entry. See finding 3. |
| e6 | search.placeholder — placeholder and aria-label of the search field | «تلاش کریں: سیاحتی مقام، سرگرمی یا جگہ…» | Three singulars with «یا»; ends with the ellipsis as the English. 'Experiences' narrowed to 'activity' (the judge charges it under accuracy). |
| e7 | data.langShort — text of the language button | «UR» | Ruling LANG; the pack allows the code. The accessible name composes to «زبان UR». |
| e8 | home.name.body — paragraph under the name heading | «لفظ “الاحساء”، “حسی” کی جمع ہے، یعنی وہ میٹھا پانی جو …» | Two pairs of U+201C / U+201D, the comma closed up to the first closing mark and followed by a space. «کی جمع ہے» right. The comma separates subject and predicate so that the two quoted words do not run together. «لفظ» now labels «الاحساء» instead of «حسی»; neither source has the word. Nothing else moved. |
| e9 | cat.crafts.t — card title (h3) | «سرگرمیاں اور دستکاری» | No stop. Same word as e6. Narrower than 'experiences' (charged by the judge). |
| e10 | home.route.time.day — time pill | «دن میں» | No stop. It is also the opening of the line beside it (home.route.s3.d: «دن میں اوپر چڑھیں …»), as 'Daytime' / 'by day' in the sources, and the approved card value of the calibration page (tm.json). The other four pills are bare nouns; in the series «صبح · دن میں · شام» the form reads as Urdu says it. No finding. |
| e11 | inline.home.fact.palms.n — the big figure, inside a bdi | «25 لاکھ+» | Same number and same scale as e1. U+0032 U+0035 U+0020 U+0644 U+0627 U+06A9 U+06BE U+002B: ASCII digits, one space, the scale word spelled as in e1, an ASCII plus with no space before it — the ruling's form letter for letter, and the order of the English ('2.5M+'). Under it: «کھجور کے درخت۔ دنیا کا سب سے بڑا نخلستان». |
| e12 | fact.sites.l — label under the figure 58 | «سیر کے لیے مقامات اور منزلیں» | Direct plurals after the figure. 'To discover' becomes 'for touring'. |
| e13 | foot.col.discover — footer column heading and its aria-label | «سیر کریں» | No stop; parallel to «منصوبہ بنائیں» (foot.col.plan). The column under it holds «سیر کے راستے». |
| e14 | plan.copied — shown in the share button after a copy | «لنک کاپی ہو گیا ✓» | Masculine with «لنک»; «ہو گیا» written apart, as in fav.added and inline.404.text; the tail is a space and U+2713. |
| e15 | share.btn — button label | «اشتراک کریں» | No stop. The added 'to others' of stage 5 is gone: now word for word the source. |
| e16 | map.locate.err — shown after «مجھ سے کتنی دور؟» fails; also on the map page | «معلوم نہیں ہو سکا کہ آپ کہاں ہیں۔ براؤزر میں اپنے مقام کی اجازت دیکھ لیں۔» | Two sentences, two stops. Entered: the browser, which both sources name. Left: 'this website', which neither source had. «اپنے» refers to the reader. Equals the wording of ruling N4. See finding 2. |
| e17 | det.nearby.d — lead under «اپنا دن بھرپور بنائیں» | «آس پاس کے مقامات، جن سے آپ اپنی سیر مکمل کر سکتے ہیں۔» | «جن سے» with the plural «مقامات»; «اپنی سیر» feminine. Follows the Arabic «جولتك» where the English says 'route'. |
| e18 | det.nearby.note — note under the nearby cards | «فاصلے اندازاً دیے گئے ہیں، سیدھی لکیر کے حساب سے۔» | Masculine plural participle and verb. A participle enters, no content. See finding 4. |
| e19 | inline.404.text — paragraph above the two buttons | «یہ صفحہ موجود نہیں یا کہیں اور منتقل ہو گیا ہے۔ نیچے سے صفحہ اول یا سیاحتی مقامات پر جائیں۔» | The two buttons are named exactly as they are labelled (crumb.home «صفحہ اول», nav.attractions «سیاحتی مقامات»). «پر جائیں» is the verb of the skip and scroll links. 'Try' is 'go to' (stage 5: 'head for'). |

## Recurring words after the edits

- 'discover' (was «دریافت»): fact.sites.l and foot.col.discover, both edited; no string carries «دریافت» now. «سیر» stands in six strings: fact.sites.l, foot.col.discover, list.lead («سیر شروع کریں», 'start exploring'), det.nearby.d («اپنی سیر»), nav.trails and inline.home.description («سیر کے راستے»). One Urdu word for 'discover' and 'explore', as the Arabic has one («الاكتشاف», «اكتشف») in the same three strings. Consistent.
- 'experience' (was «تجربہ», «تجربات»): search.placeholder and cat.crafts.t, both edited to one word; none left. Consistent.
- 'menu' (was «فہرست»): a11y.menu and a11y.mainNav, both edited; no string carries «فہرست» now. Consistent.
- 'copy' and 'link' (were «نقل», «ربط»): plan.copied only; none left; no other string of the batch speaks of either. Consistent. (plan.copy, the button of the planner page, is not in this batch: when its batch comes it has to say «لنک» and «کاپی».)
- 'farm' (was «کھیت»): nav.leisure only; none left. The name in home.route.s5.n keeps «باغ»: finding 3.
- 'route': «راستہ» in home.route.eyebrow, home.route.lead, home.route.link (Arabic «مسار»); «سیر» in det.nearby.d (Arabic «جولة»). The Urdu keeps the distinction the Arabic makes. «راستہ» also in the trails strings (nav.trails, trails.partOf, inline.404.heading) and a11y.crumbs, unchanged.
- 'content': a11y.skip and a11y.scrollDown, now both «مواد». In step.
- 'share', 'approximate', 'head for': one string each (share.btn, det.nearby.note, inline.404.text); for 'approximate' see finding 4.
- «دن»: 'day' in home.route.d1.k, home.route.d2.k, home.route.title, home.route.lead, home.plan.lead, det.nearby.h; 'by day' only with «میں» (home.route.time.day, home.route.s3.d). The bare word no longer has two senses in the route card.
- «ویب سائٹ»: four strings (search.open, search.label, foot.col.site, foot.independence); no longer in map.locate.err (finding 1a).

## Strings that quote or follow another

- home.route.link quotes nav.myTrip inside “ ”: in step.
- inline.404.text names crumb.home and nav.attractions: in step.
- a11y.mainNav and a11y.menu; a11y.skip and a11y.scrollDown: in step.
- The groups that share one English (`same_source_as`): all equal — nav.plan, nav.planVisit, home.plan.cta; nav.dining, nav.dine; nav.stayShort, nav.stay; nav.events, cat.events.t, foot.l.events; nav.attractions, crumb.attractions; nav.food, cat.taste.t; the category labels and their card titles.
- The figure card and the hero lead: the same figure and the same scale («25 لاکھ»); the card is no longer a substring of the lead, by ruling.
- home.route.time.day and the opening of home.route.s3.d: the same two words.
- det.hoursNotice with det.hoursNotice.op spliced in reads whole: «… جانے سے پہلے اس مقام کی انتظامیہ سے تصدیق کر لیں۔».
- list.title ends with nav.attractions; home.feat.lead and list.lead share their opening; foot.tagline ends with the clause of home.hero.title: unchanged, in step.

## Names and loans against `termbase_final`

- The two structured-data names, which no blind reader sees, were read code point by code point: inline.home.country = U+0633 U+0639 U+0648 U+062F U+06CC U+0020 U+0639 U+0631 U+0628 («سعودی عرب»); data.oasisName = U+0627 U+0644 U+0627 U+062D U+0633 U+0627 U+0621 U+0020 U+06A9 U+0627 U+0020 U+0646 U+062E U+0644 U+0633 U+062A U+0627 U+0646 («الاحساء کا نخلستان»). Each is the whole string and equals its key. The JSON-LD description of the destination is home.hero.lead and carries the converted figure.
- The admitted loans, each equal to its key and each with a note that cites P16: «مینو» U+0645 U+06CC U+0646 U+0648 (a11y.menu, a11y.mainNav); «لنک» U+0644 U+0646 U+06A9 and «کاپی» U+06A9 U+0627 U+067E U+06CC (plan.copied); «براؤزر» U+0628 U+0631 U+0627 U+0624 U+0632 U+0631 (map.locate.err); «فارم» U+0641 U+0627 U+0631 U+0645 (nav.leisure).
- Every wording quoted in a ruled item of `calibration` stands in the string the item names, letter for letter: the nine strings of P27, the four phrases of N2, «الاحساء کے لیموں», bare «خلیج» three times, «25 لاکھ سے زیادہ», «25 لاکھ+», «UR», «اشتراک کریں», the two sentences of N4, «مرکزی مینو», «لنک کاپی ہو گیا ✓», «مضامین», «کھانے پینے کی جگہیں», «ویڈیو».

## Not verified

- Nothing was seen on a build. Widths, wrapping and the header are the judge's measurements. That the plus sign is drawn after the scale word inside the bdi follows from the bidirectional algorithm (the first strong character is an Urdu letter) and was not looked at in a browser. U+002B is new to the Urdu text: whether the figure's face carries the glyph is the build's check.
- The stage checker was not run by this pass. Its six number findings on the two palm strings, recorded by the judge, are the P10 conversion; the conversion was checked here by arithmetic only (2.5 × 10 lakh = 25 lakh). `check-final` cannot pass on this text until the checker is taught the conversion.
- Dictionary pages opened in this run: two, through a fetch tool that relays the page — «سَیر — اسم، مؤنث» and the headword «اَنْدازاً» (adverb), both on rekhtadictionary.com. Every other gender is taken from the stage-5 record and from `termbase_final`; «لنک» is masculine by the agreement of the interfaces only, as its entry says.
- The judge's interface evidence (the Urdu resources of Android and Chrome, MediaWiki) was not fetched again; that «مقام کی اجازت» and «اشتراک کریں» are those interfaces' own wordings is the judge's reading.
- What only a reader can show: whether «اپنے مقام» is taken as the visitor's position on a page where «مقام» is the attraction; whether the comma in «لفظ “الاحساء”، “حسی” کی جمع ہے» is read as closing the subject and not as a list; whether «اشتراک کریں» is recognised; whether «فارم» is read as a farm.
- `blind/blind-input.on-r1.*` did not exist when this pass was made: the text was read from the judge file, identified by the hashes above.
