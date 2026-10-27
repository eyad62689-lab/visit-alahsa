# 05d: proofreading of the judge's edits (gulf-unify-1027)

Worktree: C:/Users/truyr/node-store/va-wt/gulf-unify. Each final string was confirmed on its stated line. Urdu letterforms were scanned with a script (ي ك ة ه ى أ إ ۃ U+0650 U+06C2), and no forbidden letter turned up.

**Result: 11 OK, 0 FIX.**

| id | file:line | verdict | notes |
|---|---|---|---|
| zh-22 | blog/hasawi-lomi-history-zh.md:80 | OK | EN says "a general Gulf name" and AR says «تسمية خليجية عامة». 阿拉伯湾地区通行的叫法 matches the regional sense and follows the ruling (region = 阿拉伯湾地区). Lines 62 (阿拉伯湾沿岸) and 100 (抵达阿拉伯湾) refer to geography and stay as they are, so the page is consistent. |
| zh-24 | blog/hasawi-lomi-zh.md:14 (faq a) | OK | EN "Hasawi and Gulf cooking", AR «المطبخ الأحسائي والخليجي». 哈萨与阿拉伯湾地区菜肴 reads naturally, and the page body (line 39) uses the same phrase. |
| zh-25 | blog/hasawi-lomi-zh.md:39 | OK | Faithful to EN/AR, natural, and consistent with the FAQ on line 14. |
| zh-39 | src/data/events.ts:572 | OK | AR (line 276) «المطبخ الأحسائي والخليجي», EN (431) "Hasawi and Gulf cooking". Same wording as the blog. |
| de-27 | src/data/events.ts:758 (intro) | OK | EN "in the Arab Gulf states". AR is the owner's note «بدول الخليج». Removing "arabischen" avoids the tautology "arabischen Ländern am Arabischen Golf", and nothing is lost because the region is named. The dative "in den Ländern am Arabischen Golf" is correct. |
| de-28 | src/data/events.ts:787 | OK | "für die Küche Al-Ahsas und der Region am Arabischen Golf": two coordinated genitives, grammatically correct. It matches the page FAQ ("in der Küche Al-Ahsas") and the stores FAQ ("der Küche Saudi-Arabiens und der Region am Arabischen Golf"). Faithful to «الأحسائي والخليجي». |
| de-35 | src/data/stores-directory.de.json:277 (a) | OK | AR «كافة دول الخليج العربي», EN "all the Arab Gulf states". "in alle Länder am Arabischen Golf" takes the correct accusative and repeats the wording of the question (line 276) and of lines 129/135. |
| ur-53 | src/data/stores-directory.ur.json:277 (a) | OK | AR «الاتفاقية الاقتصادية الخليجية», EN "the Gulf economic agreement". "خلیج عرب کے ممالک کے اقتصادی معاہدے سے" follows the ruling with no izafat sign. معاہدہ is masculine and agrees with "جو ... آسان بناتا ہے". The doubled کے is grammatical. It matches the earlier "خلیج عرب کے تمام ممالک" in the same answer. |
| ur-60 | src/data/visa-guide.ur.ts:59 | OK | AR «إقامة خليجية», EN "Holders of a GCC residency". This is the official GCC-residents route, so خلیج تعاون کونسل falls under the exception. "میعاد والا … کسی ملک کا اقامہ" agrees in the masculine. It is consistent with lines 58, 123 and 352 and with de/zh (GCC/海合会). |
| ur-62 | src/data/visa-guide.ur.ts:120 (h) | OK | EN "Saudi visa guide for GCC residents: visiting Al-Ahsa", id `gcc`. The GCC name is correct, and the heading matches the route label "خلیج تعاون کونسل کے ممالک میں مقیم افراد". |
| ur-66 | src/data/visa-guide.ur.ts:317 (q) | OK | EN "Do GCC residents need a visa…". AR «المقيم في دول الخليج» with the answer «دول المجلس». The question now matches its own answer (line 318) and the route name. "افراد کو … ویزے کی ضرورت ہے" is correct. |

## Side note (outside the 11 edits, not a verdict)
- In visa-guide.ru.ts the same GCC route is rendered «Резиденты стран Арабского залива», while de/zh/ur use the GCC name. This report does not rule on it. It is mentioned only for consistency across languages, if the batch owner wants to align it.
