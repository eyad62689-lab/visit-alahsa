# Stage 4 notes: qaisariyah-souq (zh) — benchmarker and web verification

Run on 2026-11-27. Outputs: `qaisariyah-souq.stage4.md`, `termbase-additions.stage4.json` (52 entries: the 50 of stage 1, the Alhambra entry split in two, one new entry for 莱顿), `stage4-changes.md`.

## What could and could not be opened

Opened and read:
- en.wikipedia API, one request: Chinese interlanguage links for 30 titles.
- zh.wikipedia API (article leads and full-text phrase search, simplified variant): leads of 伊斯兰百科全书, 互联网档案馆, 麦纳麦, 非斯, 阿尔罕布拉宫, 国际古迹遗址理事会, 世界遗产委员会, 库法 / 库费, 巴扎 / 巴刹, 格拉纳达, 多哈, 开罗, 拜占庭帝国, 莱顿, 比什特, and the Zwemer article; phrase searches for Zwemer, Gifford Palgrave, Cheesman, four spellings of al-Maqrizi, the Arab Towns Organization, three spellings of abaya, 筒形拱顶, 石榴糖浆 / 石榴糖蜜.
- Chinese Ministry of Foreign Affairs: https://www.fmprc.gov.cn/wjdt_674879/zwbd_674895/202401/t20240118_11228585.shtml (阿拉伯城市组织).
- 人民论坛: https://paper.people.com.cn/rmlt/pc/content/202509/24/content_30117237.html (完整性, 申报, 世界遗产委员会, 列入《世界遗产名录》, 国际古迹遗址理事会).
- People's Daily overseas edition: http://paper.people.com.cn/rmrbhwb/html/2019-12/16/content_1961696.htm (ICOMOS（国际古迹遗址理事会）).
- Xinhua: https://www.news.cn/world/20240425/7c88af8437434381851cbb4da3688298/c.html (writes 黑袍, no transliteration of abaya).

Not reachable, stated plainly:
- UNESCO zh (`whc.unesco.org/zh/list/1563`): HTTP 403. Not retried; no other request was sent to that host.
- zh.wikipedia API: HTTP 429 after about 25 requests. The four queries then in the queue were cut off (Alcaicería; the qaysariyya spellings; 咨询机构; 完整性). They were not repeated and no further request went to that server.
- icomoschina.org.cn (two URLs) and culture.people.com.cn: certificate errors. moe.gov.cn: redirect loop. ncha.gov.cn: connection refused. One gov.cn page: 404.
- VisitSaudi zh: a domain-restricted search returned no Chinese page for any name of this article. Saudipedia zh: not tried (blocked in earlier batches). Baidu Baike: not tried (HTTP 403 recorded in the Tarafa batch).
- Two early fetches of the zh.wikipedia API went through the fetch tool, which paraphrased the Chinese instead of quoting it; their results were discarded and the same questions were asked again through the API directly.

Search-result summaries were never taken as evidence for a form that the query itself carried (ZH-W7). Nothing is tagged `[verified]` on recollection.

## Result

- `[verified]`: 25 entries. `[house-derived]`: 27 entries.
- Proper names verified (17): 帕尔格雷夫 and 奇斯曼 (surname form only, the two men have no Chinese page), 兹韦默, 国际古迹遗址理事会, 世界遗产委员会, 互联网档案馆, 阿拉伯城市组织, 麦纳麦, 多哈, 开罗, 非斯, 格拉纳达, 阿尔罕布拉宫, 《伊斯兰百科全书》, 马克里齐, 莱顿, 罗马帝国和拜占庭帝国.
- Terms verified (8): 申报, 《世界遗产名录》 / 列入, 完整性, 筒形拱顶, 巴扎, 阿巴雅长袍, 石榴糖浆, 传统萨杜编织 (the last from the termbase's own batch-14 record, not re-opened).
- Proper names left `[house-derived]` (8): 《半岛报》（Al-Jazirah）, 建筑遗产奖, “凯撒利亚集市之夜 2026”, the Patronato (described, Spanish name kept), Alcaicería (Latin kept), 阿卜杜拉·本·阿卜杜勒拉赫曼·穆拉, 塔阿温·萨卡菲书店, 联合国教科文组织世界遗产中心 (published in tm.json, not re-checked). The transliterated ones carry a Latin gloss at first mention (the Al-Mulla name gained one at this stage) or stay Latin; the award, the festival and the Patronato are translated or described, not transliterated, and the festival name rests on a bound termbase entry.
- Forms changed: 马克里齐, 阿巴雅长袍 (with 哈萨 repeated), “quffa”. One Latin gloss added (the Al-Mulla name). One register rewrite. Details in `stage4-changes.md`.

## Decisions on the listed doubts

- **Palgrave, Cheesman.** en.wikipedia has no Chinese link for either man. The surname forms are attested on zh.wikipedia (帕尔格雷夫·麦米伦, 新帕尔格雷夫经济学词典; 珍妮·奇斯曼). Kept, with the Latin gloss.
- **Zwemer.** The zh.wikipedia article is titled with 茨维默 but its text opens «塞缪尔·马里努斯·兹韦默». 兹韦默 kept.
- **al-Maqrizi.** 麦格里齐 → 马克里齐 (zh.wikipedia usage, four articles). The scholarly 麦格里齐 is reported to the judge as the alternative.
- **ICOMOS, World Heritage Committee, integrity, nomination.** Confirmed in Chinese press and on zh.wikipedia. **咨询机构** stays house-derived: the term is usual, but every page that would show it failed to open.
- **Arab Towns Organization.** 阿拉伯城市组织 confirmed on the Chinese Foreign Ministry site.
- **Internet Archive, The Encyclopaedia of Islam, Manama, Doha, Cairo, Fez, Granada, the Alhambra, Leiden.** zh.wikipedia article titles; kept.
- **Alcaicería.** No Chinese page; stays Latin, which is also what the argument of the passage needs.
- **abaya.** 阿巴亚 → 阿巴雅 (zh.wikipedia, including the compound 阿巴雅长袍). Mainland press mostly avoids a transliteration (黑袍, «Abaya长袍»), so this is the one attested transliteration found, not a press standard.
- **“库法”（quffa）.** Retired: 库法 is a name of Kufa. Latin word in quotation marks plus the source's own definition (ZH-W2; Tarafa precedent).
- **Quotation boundary of the SPA hedge.** Confirmed in both places; see `stage4-changes.md`, F.2.
- **“皇帝的市场”.** Kept as a house rendering.
- **石榴糖浆.** Attested for دبس الرمان (zh.wikipedia 石榴汁). 红石榴糖浆 is grenadine; the plain form in a list of foodstuffs is not misread.
- **筒形拱顶, 巴扎, 拜占庭帝国.** Attested; kept.
- **星期五 / 周五.** House pattern, kept.

## Fact fence

Read against the English line by line, the Arabic as arbiter. Nothing added, nothing dropped at this stage, and no earlier addition was found to delete. Checked in particular:
- the only Chinese gloss of foreign words is Zwemer's phrase, a translation of the quoted English, present in the Arabic as well; the one parenthesis added at this stage is the Latin spelling of the Al-Mulla name, taken from the English source;
- 国际古迹遗址理事会 and 联合国教科文组织 are the Chinese names of ICOMOS and UNESCO, not identifications;
- no country for 麦纳麦 or 多哈, no description of any traveller, author or book, no hours, no cause or losses for the fire;
- the mud-and-palm-trunk sentence is still a paragraph of its own with no connector;
- every sentence on the World Heritage List keeps the oasis as the inscribed property; Cheesman still does not say “凯撒利亚”; Granada shares the name and the type of market only.
The one wording that says more than its English sentence is `哈萨` on the abayas, and it says what the Arabic says. `传统` in 传统萨杜编织 is part of a bound name and is flagged for the judge.

## Checks

`check-stage5.mjs` (the copy of `check-stage3.mjs`) was run on the stage-4 text from a scratch copy outside the repo: all 49 checks pass. In that copy the quffa assertion follows change 3 (`“quffa”` once, no 库法); every other line is the stage-3 script. `termbase-additions.stage4.json` parses, and every entry has `en`, `zh`, `note` with one tag, and `source`.
