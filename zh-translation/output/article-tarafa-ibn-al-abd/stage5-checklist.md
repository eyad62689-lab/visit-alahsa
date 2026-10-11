# Stage 5 checklist: tarafa-ibn-al-abd (zh) — proofreader

File checked: `tarafa-ibn-al-abd.stage5.md`. Two node scripts, kept outside the repo, were run on it: the stage-3 checker (27 checks) and a stage-5 add-on (36 checks). All 63 pass. Status values: PASS (nothing to fix) or FIXED.

No item needed fixing at stage 5: `stage5.md` is byte-identical to `stage4.md`.

## 1. Punctuation
| Check | Result |
|---|---|
| Only full-width marks next to Chinese characters (`, ; : ? ! ( )` half-width: none) | PASS |
| No ASCII double quote in prose; “ ” balanced (57/57); （ ） balanced (45/45) | PASS |
| No stray space around full-width punctuation; no doubled marks | PASS |
| One space between Latin digits / Latin words and Chinese characters, everywhere | PASS |
| No U+00A0; LF line endings; no trailing whitespace; single final newline | PASS |

## 2. Termbase compliance
| Check | Result |
|---|---|
| Binding forms present where the English has the term: 盖提夫, 哈萨县 (3/3), 沙特文化部 (3/3), 阿卜杜拉国王环境公园 (4/4), 哈萨博物馆, 沙特百科, 雅库特·哈马维 before 雅库特, 阿卜杜·盖斯部落 (2/2), 贾瓦塔, 穆沙卡尔 | PASS |
| `巴林（此处指历史上的东部沿海地区）` in `description` and at the first body mention only (2) | PASS |
| `沙特百科（Saudipedia）` and `乌盖尔（Al-Uqair）` glossed once, at first mention | PASS |
| topic `"文化与手工艺"` | PASS |
| Never 奥斯曼 / 哈萨人 / 巴林王国; no 游牧 / 贝都因 | PASS |
| Every zh form of `termbase-additions.stage4.json` (62 entries) occurs in the article exactly as recorded | PASS |
| Each recorded Latin gloss occurs exactly once | PASS |
| No superseded form left: 塔米姆, 栽德, 欧拜达, 阿拉 (as a place), 真主, 句 / 诗句 / 半行诗, 作诗人 | PASS |
| Fixed words against the English: 首府 10 = "chief town" 10; 中心城镇 6 = "principal town" 6; 总督 23 = "governor" 23 | PASS |
| Verse terminology: 联 / 半联 only; no 句 anywhere in the file | PASS |

## 3. Numbers, dates, units
| Check | Result |
|---|---|
| Latin digits only (no Arabic-Indic digits) | PASS |
| Every number in the body equals the English (multiset; `11 月` = November) | PASS |
| Hijri dates: `伊斯兰历` once at the first mention, `伊历` afterwards; no CE year or century added | PASS |
| 4-digit years identical to the English (2023, 2026; 1657 / 1658 are URL page numbers) | PASS |
| `第 1 卷第 137 页`, `“……”条`; no `vol.` / `p.` / `entry` / `d.` left in the source list | PASS |

## 4. Grammar and script
| Check | Result |
|---|---|
| Simplified characters only (probe of common Traditional forms) | PASS |
| No doubled particles (的的 / 了了) | PASS |
| 您 for the reader throughout; the single 你 is the governor addressing Tarafa inside quoted speech | PASS |
| Full read-through for grammar and leftover particles | PASS |

## 5. Structure integrity
| Check | Result |
|---|---|
| Frontmatter: key order identical; `key`, `slug`, `pubDate`, `heroImage` verbatim; `lang: zh`; 4 FAQ entries | PASS |
| 62 link targets identical to the English, in order (after /en/ → /zh/) | PASS |
| Internal links under `/zh/` with trailing slash (6) | PASS |
| Block-type sequence identical to the English: 8 headings, 33 paragraphs, 14 bullets, 25 numbered lines, 3 blockquotes / 22 quote lines, 12 bold markers, 6 italic lines | PASS |
| 10 Arabic verse lines and the opening half-line byte-identical; no other Arabic script outside URLs | PASS |
| 25 source lines numbered 1 to 25; URLs character-identical line by line; Latin book titles on the same lines as the English; none identical to its English counterpart; link text `沙米拉文库` on 23 lines (line 13 is 沙特百科, line 25 is page links) as in the English | PASS |

## 6. Mandatory misparse sweep (`style_rules_additions.misparse_sweep`)
| Check | Result |
|---|---|
| No 上海 / 北京 / 中国 across word boundaries | PASS |
| No 环卫, 东北约, 时下, 日更 | PASS |
| Extra sweep for this article: `阿拉` no longer stands for a place (was the Allah misreading); `希拉` occurs 5 times, all al-Hira, first one glossed | PASS |

## 7. Fact fence (read against the English, Arabic as arbiter)
| Check | Result |
|---|---|
| No added fact, CE year, identification, tip or gloss beyond the source and first-mention Latin glosses | PASS |
| Every report attributed to its narrator; disputed names and the two ages left unranked | PASS |
| Verse translations in italics, plain prose | PASS |
