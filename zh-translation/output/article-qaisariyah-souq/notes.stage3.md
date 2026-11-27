# Stage 3 notes: qaisariyah-souq (zh) — localizer under the fact fence

The role prompt asks for photo spots, family, food, shopping, comfort and extra glosses. The brief forbids all of it for this article, so stage 3 was run as a sensitivity and readability pass for a mainland reader only. Nothing added, nothing dropped: no new gloss, no identification of any person, book, body or place (麦纳麦 and 多哈 stay without a country, as in the source), no hours, no visiting advice beyond the source's four items.

## Changes (8 edits, 2 reasons)
1. **`被烧` → `遭遇火灾 / 遭过火灾` (6 places)**: intro programme sentence, the mud paragraph, the Granada comparison, the summary bullet, the closing line, source line 9. The source verb is intransitive (احترق, "burned"). A bare 被-passive leaves an agent slot open in Chinese and can be read as "was burned by someone"; the brief rules that the article neither names nor suggests a cause. `遭遇火灾` has no agent. The fire-as-subject verbs stay: `一场大火烧掉大部分店铺`, `烧掉了其中 80% 以上的店铺`, Granada `一场大火将它烧毁`. Closing line now: `一座集市：遭过火灾，又回来了，至今仍在做买卖。`
   - Consequence for stage 4: the stage-1 additions entry «burned / consumed / destroyed» (`被烧 · 烧掉 · 烧毁`) should read `遭遇火灾（遭过火灾）· 烧掉 · 烧毁` in `termbase-additions.stage4.json`.
2. **`点名` removed (2 places)**: `集市在这份决定里是点了名的` → `这份决定里就有集市的名字`; FAQ 3 `决定点了它的名` → `决定提到了它的名字`. In mainland usage 被点名 / 点名 leans towards "called out" (点名批评); the source only says "present by name / mentions it by name".

## Stage-1 points addressed to stage 3
- **翻新 for «renewed» (جُدّد)**: kept. 重修 leans to rebuilding or repair, and the source does not say which; 翻新 is the neutral word and stays apart from 重新建起 / 重建 / 整修.
- **Arabic-script كبنك after “卡班克”**: not restored. The brief asks for the Latin gloss; the Arabic letters carry nothing a Chinese reader can use.
- **Zwemer gloss `（意为“胡富夫的 Kaisariyeh，或称巴扎”）`**: kept. It translates the quoted English phrase, as the Arabic original does («قيصرية أو بازار الهفوف»), and adds no fact.

## Checked and kept
- Numbers: every figure compared line by line with the English (digits per body line; the only differences are month names and "nineteenth" written as digits). Statistics in digits, closed sets in Chinese numerals, as stage 1 set them.
- Dates: `伊斯兰历 1238 年（公元 1822 年）` at the first body mention and in FAQ answer 1, `伊历` afterwards; `5:40 前后` with the source's `星期四早晨` only.
- World Heritage: every sentence keeps the oasis as the inscribed property (`列入名录的是整片哈萨绿洲，而不是单独一座集市`); no wording places the souq on the list.
- Cheesman: `柱廊` and `“新巴扎”`; he is not made to say “凯撒利亚”. Granada: same name, same type of market, `没有找到哪一份来源记载过……直接的历史联系`; no word of kinship or influence.
- Friday notice: `出发前请先查一查，周五尤其要查`, verb present, no hours.
- Religious wording: `一些收录祈祷词与赞念词的书`, neutral and respectful. Nothing political; no `奥斯曼`, no `半岛电视台`; `《半岛报》（Al-Jazirah）` at first mention.
- Direct address is 您 throughout (termbase tone rule); 干青柠 without a colour word; 哈萨 + noun for Hasawi; 哈萨居民, never 哈萨人.

## Hard checks (`node zh-translation/output/article-qaisariyah-souq/check-stage3.mjs`, a copy of check-stage1.mjs with the file name changed)
All 49 pass on stage3.md (and on stage2.md from a scratch copy). The script was also run on a corrupted copy outside the repo (one URL altered, `因此` put before the mud sentence, 周五 removed): it failed exactly those 3 checks.

## Doubts for stage 4 / the owner
1. **Nothing is web-verified yet.** All new names are still `[house-derived]`: 帕尔格雷夫, 兹韦默, 奇斯曼, 麦格里齐, 国际古迹遗址理事会, 咨询机构, 完整性, 阿拉伯城市组织, 互联网档案馆, 《伊斯兰百科全书》, 阿巴亚长袍, 麦纳麦, 非斯.
2. **“库法”（quffa）** is also the Chinese name of the city of Kufa. The quotation marks, the gloss and `篮子` fence it, but stage 4 should decide (the alternative is a descriptive noun with the Latin word only, ZH-W2).
3. **Quote boundary** (stage 2): `可追溯至“伊斯兰历 1238 年（公元 1822 年），据部分来源所述”` moves the preposition out of the quotation; and FAQ answer 1 fronts the quoted hedge. Confirm or revert to the trailing position.
4. **`传统萨杜编织`**: 传统 comes from the bound craft name, not from the source sentence (stage-1 flag 4, still open).
5. **`哈萨比什特长袍与阿巴亚长袍`**: in the Arabic, الأحسائية governs both nouns; the bound string 哈萨比什特长袍 leaves 阿巴亚长袍 unmarked. `哈萨的比什特长袍与阿巴亚长袍` would carry both but breaks the bound entry.
6. **`三块` and `放在这两块里`**: the reader cannot picture how a basket sits "in" two door pieces. This is the source's own wording in Arabic and English; it was not made more concrete (ZH-W10: no noun or classifier may carry a material claim the source lacks). A source question for all languages.
7. **星期五 / 星期四 in the newspaper passage and 周五 in the visiting tip**: left mixed on purpose; 周五 matches the hours card of the souq page the tip sends the reader to.
8. **“皇帝的市场”** for «the imperial market»: check how Chinese reference works gloss the Greek phrase.
9. **Cross-page observation for the owner (from stage 1, unchanged):** the published components page lists 凯撒利亚集市 as component 1563-005, while this article says the inscribed property is the oasis and calls the souq one of its landmarks. The article follows its source and the brief.
10. **麦纳麦** may be unfamiliar to some mainland readers; no country was added (fact fence).
