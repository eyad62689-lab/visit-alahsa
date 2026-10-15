# b14 judge, round 2 — addendum (no text change, no new round)

Proof on r2 (`05p-proof.on-r2.md`, should-fix 1): the whole-word guard of N178 written in round 2,
«نخلستان کے مشرق» does not occur as a whole word, matches APPROVED text on dar-alturath (body, area) and
najim-museum (body), whose sources say "east of the oasis" in their own right. That contradicts N211's own
point: a clause meant for one page must use a pattern that cannot occur legitimately on another. Accepted.

Correction (N178, guard only; ruling, status and open owner question unchanged): the clause names the span
that only zaki-alsalem-farm's English-only phrase would produce — the approved road name of that body
followed by the phrase:

> For the proofreader and the stage checker: «الخلیج سڑک پر، نخلستان کے مشرق» does not occur; on
> zaki-alsalem-farm «سرخ» stands in the body only.

Verified by `b14/s7a-guard.mjs`: the guard reader (`guardClauses`) reads one banned clause from it; it fires
on a planted copy of zaki-alsalem-farm.md with ", نخلستان کے مشرق میں" after «الخلیج سڑک پر»; it fires on none
of the 58 approved attraction files in the worktree, on nothing in b15's stage 03, nor on b14's round-2 text.

The round-2 line of N211 ("a whole-word clause … bites on the phrase 'east of the oasis' itself") is
superseded by this addendum: the phrase is legitimate on other pages; only its zaki-specific span is barred.
The machine check stays live; page scoping by `binds` remains a tool question for the coordinator.
Scores, decision (APPROVE, 91) and the text are unchanged.
