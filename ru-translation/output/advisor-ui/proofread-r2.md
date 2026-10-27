# Proofread r2 — advisor-ui (ru)

**Verdict: PASS** (no fixes). Text checked = judge-r1.json "text" (identical to final-r2.json, verified by script).

## Edited keys
- **advisor.intro** — PASS. Three lines split on \n, two emoji intact. Line 2: comma before "и" between two clauses correct. Line 3: «открыть для себя места, о которых знают только местные» — case government correct (о + prepositional, "которых" agrees with plural "места"); comma before "о которых" and before "что" correct; parallel infinitives (прогуляться / открыть); "вы" lowercase ("вам", "Хотите" is a sentence-initial verb). Nothing added or dropped vs the Arabic (stroll / places only locals know / tell me tastes / outing to mood). "Аль-Ахсе" is the published form (head_name ruling). No ё-words; no nbsp; no dash.
- **advisor.chip2** — PASS. «Когда работает Джабаль-эль-Кара и сколько стоит вход?»: first-person visitor question, hours and fees both kept. Джабаль = гора, masculine agreement «работает» fine; name hyphenated with lowercase article, indeclinable and not declined, no pleonasm («гора» absent), matches published ui.ru form. No comma needed between the two coordinated question parts joined by «и».
- **advisor.rate** — PASS. «Увидимся завтра, и страницы достопримечательностей у вас под рукой.» Comma before «и» joining two independent clauses is correct; «вы/вас» lowercase in the mid-sentence «у вас»; sentence-initial «Вы» capitalised only by sentence position (not address-capital), in line with the logged source issue. Genitive plural «достопримечательностей» correct.

## Re-check of the other 14
No edit touches them; unchanged from final.json. open, title (brand Latin, comma, no dash), placeholder, send, close, notice («Anthropic» Latin), resting («План поездки» = ui.ru nav.plan exactly, «ёлочки»), error, cards, chip1, chip3 («кухню Аль-Ахсы», no invented adjective), thinking, you, reset — all PASS. Whole batch: no U+00A0, no double spaces, no Title Case, Latin digits (none), ё policy not triggered (no ё/е ambiguity words), no «ты/твой», no capitalised address «Вы» except the one-word label advisor.you and sentence-initial advisor.rate (judge-accepted).

Nothing the edits broke.
