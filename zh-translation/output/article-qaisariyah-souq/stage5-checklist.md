# Stage 5 checklist: qaisariyah-souq (zh) — proofreader

File checked: `qaisariyah-souq.stage5.md`. Two node scripts were run on it: `check-stage5.mjs` in this folder (49 checks) and a stage-5 add-on kept outside the repo (41 checks). All 90 pass. Status values: PASS (nothing to fix) or FIXED.

One item was fixed at stage 5 (section 6). `stage5.md` differs from `stage4.md` in one character.

## 1. Punctuation
| Check | Result |
|---|---|
| Only full-width marks next to Chinese characters (`, ; ? ! ( )` half-width after a Chinese character: none) | PASS |
| No ASCII double quote in the body; “ ” balanced (37/37); （ ） balanced (35/35); 《 》 and [ ] balanced on every line | PASS |
| No stray space next to full-width punctuation; no doubled marks | PASS |
| One space between Latin letters or digits and Chinese characters, everywhere | PASS |
| No U+00A0; LF line endings; no tab; no trailing whitespace; single final newline | PASS |
| Bold: 4 bullet leads, each `**…**` closed before its punctuation mark (`**开放时间会有变动**。`), the published house pattern | PASS |

## 2. Termbase compliance
| Check | Result |
|---|---|
| Bound forms present where the English has the term: 凯撒利亚集市 (45), 胡富夫, 里法阿区, 哈萨县 / 哈萨县县长, 哈萨市政局, 哈萨发展管理局, 沙特遗产委员会, 阿米里亚学校, 贾瓦塔清真寺, 易卜拉欣宫, 效忠之家（拜特·拜阿）, 哈萨红米, 干青柠, 藏红花, 东部省, 十二处组成部分, “哈萨绿洲，变迁的文化景观”, 第 42 COM 8B.16 号决定, 《半岛报》, 传统萨杜编织, 哈萨居民 | PASS |
| Every 凯撒利亚 is 凯撒利亚集市 or the quoted word “凯撒利亚” (no bare form) | PASS |
| `沙特通讯社（SPA）`, `沙特百科（Saudipedia）`, `《半岛报》（Al-Jazirah）` glossed once, at first mention | PASS |
| Each Latin gloss occurs exactly once (14); `国际古迹遗址理事会（ICOMOS）` three times by design (FAQ answer 1, first body mention, source line 6); no Latin in headings | PASS |
| topic `"哈萨地标"` | PASS |
| Never 奥斯曼 / 鄂图曼 / 土耳其 / 半岛电视台 / 哈萨人 / 哈萨维 / 市集 / 黑青柠 / 黑柠檬 / `seoDescription` | PASS |
| Every zh form of `termbase-additions.stage4.json` (52 entries) occurs in the article as recorded; every entry has `en`, `zh`, one tag, a source | PASS |
| No retired form left: 麦格里齐, 阿巴亚, 库法, 被烧, 点名, 限定语 | PASS |
| Fixed hedge “据部分来源所述”: one wording, four places, always inside quotation marks | PASS |
| Verb set kept apart: 翻新 / 重新建起 / 重建 / 整修; 遭遇火灾 (遭过火灾) / 烧掉 / 烧毁; 回来了 / 归来 | PASS |

## 3. Numbers, dates, units
| Check | Result |
|---|---|
| Latin digits only (no Arabic-Indic or full-width digits) | PASS |
| Every digit run in the body equals the English; the only differences are month numbers and 19 for «nineteenth» (twice) | PASS |
| Hijri dates: `伊斯兰历 1238 年（公元 1822 年）` in FAQ answer 1 and at the first body mention, `伊历` afterwards (3); no CE year or century added | PASS |
| `5:40 前后` with the source's `星期四早晨` only; no 上午 / 凌晨 added | PASS |
| Closed sets in Chinese numerals (十二处, 九座门, 三块, 两块, 第五处), statistics in digits (14 座, 422 家, 200 多, 80%, 第 13 届) | PASS |
| `第 2 卷第 150 页`, `第 840–841 页`, `“Ḳaysāriyya”条`; no `vol.` / `p.` / `pp.` left in the source list | PASS |
| Weekdays: 星期五 / 星期四 for the dated newspaper issue (3), 周五 for the recurring day of the visiting tip (1): house pattern | PASS |

## 4. Grammar and script
| Check | Result |
|---|---|
| Simplified characters only (probe of common Traditional forms) | PASS |
| No doubled particles (的的 / 了了 / 在在 / 是是) | PASS |
| 您 for the reader throughout (7); no 你 | PASS |
| Full read-through for grammar and leftover particles | PASS |

## 5. Structure integrity
| Check | Result |
|---|---|
| Frontmatter parses as YAML; keys in the English order minus `seoDescription`; `key`, `slug`, `pubDate`, `heroImage` verbatim; `lang: zh`; 5 tags; 4 FAQ pairs; FAQ question 3 equals heading 7 | PASS |
| 34 external link targets identical to the English, in order | PASS |
| 13 internal links, all under `/zh/` with a trailing slash, same targets and order as the English | PASS |
| Block sequence identical to the English: 13 `##` headings, 29 paragraphs, 9 bullets, 18 numbered lines, 8 bold markers; 69 non-empty body lines | PASS |
| 18 source lines numbered 1 to 18; URLs identical line by line; line 17 without a link; Latin titles and publishers on the same lines as the English; none identical to its English counterpart | PASS |
| The mud-and-palm-trunk sentence is a paragraph of its own, one sentence, no causal connector; none in the fire paragraph either | PASS |
| Traveller spellings in Latin inside Chinese quotation marks; `“卡班克”（kabank）` at first mention; `“quffa”` once | PASS |
| Friday notice carries a verb (查) and no clock time | PASS |

## 6. Mandatory misparse sweep (`style_rules_additions.misparse_sweep`)
| Check | Result |
|---|---|
| No 上海 / 北京 / 中国 across word boundaries | PASS |
| No 环卫, 东北约, 时下, 日更 | PASS |
| Extra sweep for this article: `把它同城里其他地方隔开` read `同城` across the word boundary → `把它与城里其他地方隔开` | FIXED |
| Extra sweep: 库法 (the city of Kufa) no longer stands for the basket | PASS |

## 7. Fact fence (read against the English, Arabic as arbiter)
| Check | Result |
|---|---|
| No added fact, year, identification, tip or gloss beyond the source and first-mention Latin glosses | PASS |
| Every report under its narrator; the hedges of the source kept (据部分来源所述, 我们找到的最早描述, 我们没有找到……来源) | PASS |
| The inscribed property is the oasis in every sentence; Cheesman does not say “凯撒利亚”; Granada shares the name and the type of market only | PASS |
| No cause, losses or injuries for the fire; no hours; dried lomi without a colour word | PASS |
