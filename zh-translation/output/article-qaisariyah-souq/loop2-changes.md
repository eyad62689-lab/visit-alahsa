# Loop 2 changes: qaisariyah-souq (zh) — post-judgement addendum

Base `qaisariyah-souq.loop1.md` → `qaisariyah-souq.loop2.md` (→ `qaisariyah-souq.final.md`, a byte copy). 4 replacements, each matched exactly once, applied by `apply-loop2.mjs`. Lines touched: 17, 28, 70, 86. No fact, number, link, heading, hedge, attribution or paragraph boundary moved. «Reader n» is the note number in `blind-reader.round2.md`.

| # | Where | Before | After | Reason | Reader |
|---|---|---|---|---|---|
| E20 | «Where», sentence 1 | `沙特通讯社说它在市中心，位于该区西侧。` | `沙特通讯社说它在市中心，位于里法阿区西侧。` | 该区 could point to 里法阿区 or to 市中心. The Arabic (بالجهة الغربية للحي) and the English («on the western side of the district») mean the Al-Rifaa district; the district is now named, nothing added. | 11 |
| E21 | name section, paragraph 2 | `所以，这个词在帕尔格雷夫看来是拉丁语，按这部百科全书的说法则源出希腊语。` | `这个词在帕尔格雷夫看来是拉丁语，按这部百科全书的说法则源出希腊语。` | 所以 announces a conclusion that nothing before it yields; the Arabic فـ here resumes, it does not infer. The connector is dropped; the sentence and its two attributions stay. The first reader had stopped at the same sentence (round-1 note 26) without naming this cause. | 15 |
| E22 | FAQ answer 3 | `…于 2018 年 6 月 29 日宣布，它共有十二处组成部分。` | `…于 2018 年 6 月 29 日宣布；这片绿洲共有十二处组成部分。` | Introduced by judge edit E2: after the subject 消息, 它 was read as «the news». The oasis is named instead; 这处遗产 is not restored (处…处), and 十二处组成部分 keeps the termbase wording. | 17 |
| E23 | World Heritage, paragraph 3 | `[哈萨居民庆祝自己的绿洲列入名录](…)，也正是在凯撒利亚集市里。` | `[哈萨居民庆祝自己的绿洲列入名录](…)，正是在凯撒利亚集市里。` | Exposed by judge edit E11 (而 removed): in a paragraph of one sentence 也 echoed something the reader could not find. The source has no «also»; 正是 keeps «in Qaisariyah Souq itself». | 26 |

## Checked and left as they are

- `5:40 前后` (reader 9): the termbase has no rule for clock times, and the published Chinese pages write them as digits with a colon throughout (`8:00`, `23:00`; no `点…分` form anywhere in `src/content`). 清晨 would add to the source's «Thursday morning … at about 5:40».
- `以售卖和陈列的货品见长` (reader 20, judge edit E12): both readers called the claim empty, in two different wordings; the emptiness is SPA's («يمتاز السوق بما يُباع ويُعرض فيه»). Kept, and passed to the owner as a source defect.
- `决定列出了遗产地的完整性所依托的各个方面` (reader 12, judge edit E10): the same complaint the first reader made about the earlier wording (official register); 完整性 is the World Heritage term and the clause is the source's content. Not reopened.
- `（第二名）` (reader 27): the parenthesis is the source's and sits inside the link text; the form is recorded in the termbase additions.

## Checks on the result

- `check-final.mjs`: 49 of 49 pass (script unchanged).
- `check-parity.mjs`: 41 of 41 pass. One expected value changed, and only that: the byte-copy check now compares `final.md` with `loop2.md` (it named `loop1.md`). No pinned wording was affected by the four edits (十二处组成部分 still 3, hedges, link counts and digit runs unchanged).
- `tm-additions.json` rebuilt from the final: 61 pairs, 4 changed on the Chinese side (faq[2].a and three body pairs), English sides identical.
