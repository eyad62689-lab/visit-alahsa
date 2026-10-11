# Stage 3 notes: tarafa-ibn-al-abd (zh) — localizer under the fact fence

The role prompt asks for photo spots, family, food, shopping, comfort and extra glosses. The brief forbids all of it for this article, so stage 3 was run as a sensitivity and readability pass only. Nothing added, nothing dropped, no new gloss, no CE year, no identification of any person, book or place.

## Changes (2)
- `哈萨的门前有一个小湖` → `哈萨的城门前有一个小湖`: باب of a place Yaqut calls a city; `门前` alone reads like a house door.
- Closing invitation: `身在绿洲时，不妨……` → `您身在绿洲时，不妨……` (termbase tone rule: 您 in direct invitations; the rest of the page already uses 您).

## Checked and kept
- Units / numbers: Latin digits, `第 1 卷第 137 页`, `2023 年 11 月 16 日至 24 日`; Hijri dates without CE year as the brief orders.
- Religious / heritage wording: `伊斯兰教兴起之前`; the Jawatha link text is the bare place name `贾瓦塔` as in Yaqut's list; no value judgement on the pre-Islamic period beyond the term the source itself names.
- Nothing political; no `奥斯曼`; no `巴林王国`; the al-Bahrayn gloss sits in `description` and at the first body mention only, FAQ answers 1 to 3 carry the source's own explanation.
- Every report still carries its narrator; the three disputed names and the two ages are left side by side, unranked.

## Hard checks (node, script kept outside the repo; all pass on stage3.md)
62 link targets equal to the English in order after /en/ → /zh/; internal links under /zh/ with trailing slash; 10 Arabic verse lines and the opening half-line byte-identical, no stray Arabic script elsewhere; block-type sequence identical to the English (8 headings, 33 paragraphs, 14 bullet items + 25 numbered source lines, 3 blockquotes / 22 quote lines, 12 bold markers, 6 italic lines, 4 FAQ entries); 25 numbered lines, none identical to the English; key / slug / pubDate / heroImage verbatim, lang zh, topic `文化与手工艺`, frontmatter key order identical; no U+00A0, no Arabic-Indic digits, no 奥斯曼, no 哈萨人, misparse sweep clean, no common Traditional characters, no half-width punctuation next to CJK, quotes and parentheses balanced, LF endings.

## Doubts for stage 4 / the owner
1. **句 vs 半行**: a verse (bayt) is `一句诗 / 这句诗 / 第三句` throughout, while the opening hemistich is `这半行诗`. Chinese scholarship on Arabic poetry tends to count in 行 / 半行 (or 联 / 半联). Since each bayt is displayed on two lines, 行 would confuse; decide one pair (句 / 半句, or 联 / 半联) and apply it everywhere, source list included.
2. **以真主起誓** for the pre-Islamic speaker's والله ("By God"): literal, but 真主 reads as Islamic usage in Chinese. Owner to confirm or choose a neutral oath.
3. **蒙昧时期（Jahili）** and the tag `蒙昧时期诗歌` against the termbase note that the site avoids 蒙昧时期 (stage-1 doubt 2, still open).
4. **阿慕尔 twice**: Tarafa's reported birth name and King Amr ibn Hind read the same; the source gives no disambiguation and none was added.
5. **阿拉** (al-Ara) in the list of ten places looks like a rendering of Allah to some readers; **希拉（al-Hira）** collides with the termbase `希拉（Al-Hillah）`.
6. **黎凡特** for al-Sham in a pre-Islamic narrative (brief's instruction; 沙姆 / 叙利亚 are the alternatives).
7. **印度海** may be taken for a slip for 印度洋; **被征服之前** leaves the agent unnamed as the source does.
8. **阿布· / 艾布·**, **穆塔莱米斯 / 穆太莱米斯**, **塔米姆 / 泰米姆**, **栽德 / 宰德**: all 61 additions are still `[house-derived]`; web verification is stage 4's.
9. **酒友** for the king's nadim (drinking companion) is accurate but colloquial; 酒伴 or 陪饮之臣 only if stage 4 finds an attested form.
10. **名家诗人** (fuhul) and **掌故家** (akhbariyyun) are house renderings worth a check against 仲跻昆-style usage.
