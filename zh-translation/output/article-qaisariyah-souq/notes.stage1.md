# Stage 1 notes: qaisariyah-souq (zh)

## Decisions taken
- Register: sober history prose. Every report keeps its narrator (沙特通讯社称 / 据该报报道 / 沙特百科记载 / 在他笔下). The site's own voice stays 我们 (我们找到的 / 我们没有找到). Direct address is 您.
- **«the Qaisariyah» (short name of the Hofuf souq) = 凯撒利亚集市**, the same string as the full name. Reason: one referent, one name (PF1); bare 凯撒利亚 reads as the city Caesarea and collides with the restaurant-branch entry. Precedent: «القيصرية القديمة» → 老凯撒利亚集市.
- **«qaisariyah» as a word or a market type = “凯撒利亚”** in quotation marks, Latin gloss （qaisariyah） once in the name section. The same quoted form is used where the source cites the name itself (Cheesman) and for the Granada market: 格拉纳达的“凯撒利亚”，也就是 Alcaicería.
- First body mention carries （Qaisariyah Souq）. The termbase entry has no gloss flag, but the article later sets the name beside “Keysareeyah”, “Kaisariyeh” and alcaicería, and the Chinese transliteration hides the sound.
- Travellers' spellings stay Latin in Chinese quotation marks. Zwemer's phrase has one Chinese gloss in the body: （意为“胡富夫的 Kaisariyeh，或称巴扎”）.
- Cheesman: 柱廊 and “新巴扎”; the sentence says he does not use the name “凯撒利亚” for the colonnade.
- The mud-and-palm-trunk sentence is its own paragraph, with no connector to the fire paragraph before it or to 后来，集市回来了 after it. No cause, no losses, no injuries anywhere.
- World Heritage: every sentence makes the oasis the inscribed property (列入名录的是整片哈萨绿洲，而不是单独这座集市). In the description and the intro, «its place on the World Heritage List» is worded 它与《世界遗产名录》的关系, so that no phrase places the souq on the list.
- Granada: 名字相同，市场的类型也相同；我们没有找到任何来源能证明两者之间有直接的历史联系. No word of kinship or influence.
- Friday notice: 出发前请先查一查，周五尤其要查, with no hours.
- Dried lomi = 干青柠, no colour. Hasawi = 哈萨 + noun.
- Al-Jazirah = 《半岛报》（Al-Jazirah） at first mention (binding entry + gloss), then 《半岛报》.
- Offices and bodies from the termbase: 哈萨县县长 · 哈萨县 · 哈萨市政局 · 哈萨发展管理局 · 沙特遗产委员会 · 里法阿区 · 东部省 · 沙特通讯社（SPA） · 沙特百科（Saudipedia）. «SPA» after the first mention is 沙特通讯社 or 该社.
- Verbs kept apart: renewed 翻新 / built anew 重新建起 / rebuilt 重建 / rehabilitated 整修; burned 被烧 / consumed 烧掉 / destroyed 烧毁; returned 回来了, 归来.
- Fixed quoted hedge: “据部分来源所述” (4 places).
- Numerals: statistics in digits (14 座入口大门, 422 家, 200 多年, 80%, 第 13 届, 19 世纪); closed sets in Chinese numerals (十二处组成部分, 九座门, 三块, 两块, 第五处), per the termbase numeral rule.
- Dates: 伊斯兰历 1238 年（公元 1822 年） at the first body mention and in FAQ answer 1; 伊历 afterwards. Ranges in prose: 1862 至 1863 年, 1917 年至 1923 年间. «about 5:40» = 5:40 前后, with the source's 星期四早晨 only.
- Headings: 归根结底 and 参考来源 follow the two published precedents. FAQ question 3 and heading 7 share one wording, as in the English.
- Bold: the full stop sits outside the closing `**` (`**开放时间会有变动**。`), the published house pattern (24-hours-zh line 45). A closing `**` after 。 and before a Chinese character does not close in CommonMark.
- Internal link texts follow the published Chinese titles: 哈萨活着的手艺 · 哈萨一日 · 哈萨 48 小时 · 在哈萨买什么 · 景点地图 (tm.json) · 凯撒利亚集市页面.
- Source list: Latin book titles in 《》, publishers Latin, descriptions translated, 第 2 卷第 150 页 / 第 840–841 页, Leiden = 莱顿, 新版（第二版）. Link texts: 沙特通讯社 · 互联网档案馆 · 联合国教科文组织世界遗产中心 · 《半岛报》 · 沙特百科; the Patronato keeps its Spanish name.
- No `seoDescription`. `topic: "哈萨地标"`.

## Open points for stages 3 and 4
1. **Nothing was web-verified at stage 1.** All new names are tagged `[house-derived]`. To verify: 帕尔格雷夫, 兹韦默, 奇斯曼, 麦格里齐, 国际古迹遗址理事会, 咨询机构, 完整性, 阿拉伯城市组织, 互联网档案馆, 《伊斯兰百科全书》, 阿巴亚长袍, 麦纳麦, 非斯.
2. **“库法”（quffa）**: the table form 古法 is a Chinese word and misreads; 库法 is also the Chinese name of Kufa. Stage 4 to decide (a third option is a descriptive noun with the Latin word only, on ZH-W2, but the brief asks for a transliteration).
3. **“卡班克”（kabank）**: the Arabic-script form (كبنك) printed in the English body is dropped; the brief asks for the Latin gloss. Restore it if stage 3 counts it as content.
4. **传统萨杜编织**: binding craft name, but 传统 is not in this source sentence. Keep, or shorten to 萨杜编织.
5. **翻新 for «renewed» (جُدّد)**: neutral, but it may understate a rebuilding. Alternative 重修. The source does not say which.
6. **The shop-door sentence** keeps the source's own wording without resolving it: two pieces the shopkeeper sits on «and in which» he places the quffa (放在这两块里). I did not make it more concrete.
7. **哈萨比什特长袍与阿巴亚长袍**: «Hasawi» may govern both nouns in the source; the Chinese leaves the same ambiguity.
8. **Fez sentence**: left unattributed inside the paragraph, exactly as the English (the paragraph opens with 据这部百科全书 for al-Maqrizi only).
9. **Gloss （意为“胡富夫的 Kaisariyeh，或称巴扎”）** is a translation of Zwemer's English phrase, not a new fact. Drop it if the fact fence reads it as an addition.
10. **Cross-page observation for the owner (not changed here):** the published components page lists 凯撒利亚集市 as component 1563-005 of the property, while this article says the inscribed property is the oasis and calls the souq one of its landmarks. The article follows its source and the brief.
11. **«the fifth Saudi site»** = 沙特第五处列入名录的遗产地; 沙特 used as the short country adjective.
12. **“皇帝的市场”** for «the imperial market»: stage 4 may check how Chinese reference works gloss the Greek phrase.

## Hard checks (node check-stage1.mjs, 49 checks, all pass)
34 external links identical to the English in order; 13 internal links, all `/zh/…/`, same order as the English after `/en/` → `/zh/`; 13 `##` headings; 18 numbered source lines, none identical to the English, line 17 without a link; no U+00A0, no CR, no Arabic-Indic or full-width digits; no 奥斯曼, 半岛电视台, 哈萨人, 哈萨维, 市集, `seoDescription`; key / slug / pubDate / heroImage identical; lang zh; topic; 4 FAQ pairs; 69 non-empty body lines, 9 bullets, 8 bold markers and the block sequence equal to the English; the mud paragraph is a single sentence with no causal connector; traveller spellings and the two glosses present; Friday notice has a verb and no clock time; misparse sweep clean; no half-width punctuation after a Chinese character.
