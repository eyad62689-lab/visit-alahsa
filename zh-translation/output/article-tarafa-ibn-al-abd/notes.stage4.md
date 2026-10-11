# Stage 4 notes: tarafa-ibn-al-abd (zh) — benchmarker and web verification

Run on 2026-10-11. Outputs: `tarafa-ibn-al-abd.stage4.md`, `termbase-additions.stage4.json` (62 entries: the 61 of stage 1 + one new entry for verse terminology), `stage4-changes.md`.

## What could and could not be opened

Opened and read:
- zh.wikipedia through its API (article text and full-text phrase search): 悬诗, 蒙昧时代, 阿拉伯文学, 乌姆鲁勒·盖斯, 伊本·古泰拜, 希拉赫, 前伊斯兰时期的阿拉伯, 阿拉伯帝国, 黎凡特, 沙姆地区, 盖绥达, 阿布·塔利卜·本·阿卜杜勒·穆塔利卜, plus en→zh interlanguage links for 50 titles and about 70 phrase searches.
- The table of contents of 葛铁鹰辑译《阿拉伯古籍中的中国：文史卷》(商务印书馆 2024) at https://inbetweenreview.substack.com/p/1d3.

Not reachable, stated plainly:
- Baidu Baike: HTTP 403. Bing, Baidu, Sogou: refused automated queries (no result page). Google Books API: quota exceeded.
- WebSearch (8 queries in Chinese) returned English and Arabic pages only, no Chinese page for any of these names.
- 仲跻昆《阿拉伯文学通史》 and the Chinese translation of 《阿拉伯通史》 were not opened; 仲跻昆 is reached only as the cited source of the zh.wikipedia 悬诗 article. CNKI was not searched (no access).
- Saudipedia zh / VisitSaudi zh / UNESCO zh: one WebSearch for Saudipedia zh returned nothing on the poet or the festival; these portals do not cover classical authors.

Nothing is tagged `[verified]` on recollection. Where only the parts of a compound are attested, the entry stays `[house-derived]` and says so.

## Result

- `[verified]`: 19 entries. `[house-derived]`: 43 entries.
- Forms changed: 4 names (泰米姆部落, 阿布·乌拜达, 阿迪·本·宰德·伊巴迪, 阿腊（al-Ara）), the verse pair (联 / 半联), one oath (凭神起誓), one register fix (作者). Details in `stage4-changes.md`.

## Decisions on the listed doubts

a. **Names.**
- 塔拉法, 悬诗, 乌姆鲁勒·盖斯, 莱比德: attested on zh.wikipedia (悬诗 article, sourced to 仲跻昆). Kept.
- 伊本·古太白: zh.wikipedia article 伊本·古泰拜 says «又译作古太白», and 阿拉伯帝国 writes 伊本·古太白. Kept.
- 伊本·萨拉姆·朱马希: exact form on zh.wikipedia; 伊本·赛拉姆 has no hit. Kept.
- 阿慕尔·本·杏德: 杏德 (zh.wikipedia «杏德国王») and 阿慕尔 (阿慕尔·本·阿绥) are attested separately, the compound is not. Kept, `[house-derived]`.
- 雅库特·哈马维: binding (published TM and brief). zh.wikipedia has 雅古特·哈迈维 / 雅各特. Not open to change; noted for the owner.
- 《地名辞典》: attested (葛铁鹰 2024; zh.wikipedia 阿拉伯帝国). Kept.
- 巴士拉, 阿曼: standard, zh.wikipedia titles. Kept.
- 塔米姆 → 泰米姆: zh.wikipedia usage. Changed.
- 穆塔莱米斯: neither it nor 穆太莱米斯 is attested anywhere I could open. Table form kept.
- 栽德 → 宰德: one spelling of زيد on the site (termbase 伊本·宰德商店; zh.wikipedia majority). Changed.
- 阿布· / 艾布·: one rule, 阿布·. Reasons: the termbase binds 阿布·努乌什 and 阿布·胡赛斯, a site cannot write أبو two ways, and zh.wikipedia itself prefers 阿布· (阿布·贾法尔 10 hits against 艾布·贾法尔 1; 阿布·乌拜达 13 against 0). 艾布· is common in literary scholarship and is reported to the owner as the alternative.
- 阿布·欧拜达 → 阿布·乌拜达: table (عُ→乌) and zh.wikipedia agree. Changed.
- 伯克尔 (tribe): zh.wikipedia writes 贝克尔部族; kept as 伯克尔 because the binding 阿比·伯克尔 fixes بكر on this site. Reported to the owner.

b. **蒙昧时期**: verified as standard (zh.wikipedia title 蒙昧时代; «蒙昧时期» in 悬诗; «贾希利叶(蒙昧)时期» in 阿拉伯文学). Kept because the source names the term and explains it. Needs owner confirmation against the termbase note; the exact fallback strings for both occurrences (tag included) are in `stage4-changes.md` section F.

c. **希拉**: attested for al-Hira (zh.wikipedia 前伊斯兰时期的阿拉伯: «将希拉作为首都»; the city's article is titled 希拉赫). Kept with its Latin gloss at first mention. The collision with 希拉（Al-Hillah） is reported; 希拉赫 is the attested alternative if the owner wants the two apart.

d. **al-Ara**: no attested Chinese form. `阿腊（al-Ara）`: same sound as the table form, a character that cannot be read as Allah, and the Latin gloss at its single mention.

e. **印度海**: kept. Yaqut's own words are being quoted (بحر الهند; the English keeps "Sea of India" on purpose). 印度洋 would put a modern name, with a modern extent, into a 7th-century-AH author's mouth, and the source never says it. No Chinese set term 印度海 was found, so it stays a literal house rendering.

f. **والله**: `凭神起誓`. 真主 marks the speaker as Muslim in Chinese; 上帝 and 天 import other traditions; 安拉 is a transliteration that reads as Islamic too. 神 is the plain word for "God" and adds nothing.

g. **Verse / half-line**: `联` / `半联`, after zh.wikipedia 悬诗 citing 仲跻昆 («一联两句», «全诗共104联»). Applied in the body, the summary list and the source list (17 places). Where the source says "what Tarafa was first to say" without the word verse, plain `诗`.

h. **酒友, 名家诗人, 掌故家, 总督, 首府 / 中心城镇**: no attested Chinese counterpart could be opened for nadim, fuhul or akhbariyyun, so the house forms stay. 酒友 matches the English "drinking companion" and the Arabic منادمة literally. 总督 follows the termbase precedent for a ruler's appointed governor. 首府 (قاعدة) and 中心城镇 (قصبة) remain two different fixed words; counts match the English (10 and 6).

i. **沙米拉文库**: no Chinese name attested; house form kept. **《文学宝库》**: house meaning-translation; 葛铁鹰's table of contents has 《文学宝库与语言菁华》, which fits the full Arabic title, but the page shows no Arabic, so this is support, not proof.

j. **黎凡特** for الشام: unchanged, as the brief orders; listed for the owner.

## Fact fence

Nothing added or dropped. The only new parenthesis is the Latin gloss `（al-Ara）` at the name's single mention. No CE year, no identification of Abu Ja'far, Abu Ubayda, al-Azhari, Awal or Adawla beyond the source. Every report still carries its narrator.

## Checks

The stage-3 checker (kept outside the repo) passes on `tarafa-ibn-al-abd.stage4.md`: links, Arabic lines byte-identical, structure, 25 source lines, frontmatter, forbidden words, misparse sweep.
