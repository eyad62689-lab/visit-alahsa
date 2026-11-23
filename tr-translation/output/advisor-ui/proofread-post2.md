CLEAN
# advisor-ui (tr): proofread of judge-addendum.json final_strings (16 keys), after the stage-7 addendum edits

Scope: mechanical pass on all 16 strings; judgement pass on the two strings edited since proofread-post.md (advisor.open, advisor.resting). No text was rewritten.

## Checked by tool (node, inline script, no file written)
- Key set and order: 16 keys, same set and order as pack.json and as judge.json final_strings.
- Byte comparison against judge.json final_strings (Buffer.equals on UTF-8 bytes): 14 of 16 byte-identical; the 2 that differ are exactly advisor.open and advisor.resting.
- advisor.resting: judge.json string with only "Bulbul şu an dinleniyor." replaced by "Bulbul şu an molada." is byte-identical to the new string, so sentence 2 and the quotes did not move.
- advisor.open equals "Bulbul'a danışın" code point for code point: U+0027 apostrophe, U+0131 twice (dotless ı), U+015F (ş); 16 characters.
- tools/check-tr-text.mjs (the file is at the worktree root, `tr-advisor/tools/`, not under `tr-translation/`; read and imported read-only): its exported pure function `checkTrText` was called on the 16 strings as 16 fields. Rules P8, P2, P5, P10 and i+U+0307: no hits. Positive guards satisfied: 4 U+0027 suffixes (Bulbul'a x2, El-Ahsa'nın, Anthropic'in), 58 Turkish letters. The only message returned is the MIN_FIELDS guard (16 fields, expected 100 or more); that guard measures the size of the whole published tr corpus and says nothing about these strings.
- Supplementary rules by the same script, all 16 strings, 0 hits: straight double quote, guillemets, U+2018/U+2019/U+02BC, NBSP and narrow spaces, zero-width and bidi controls, combining marks, any digit, "...", double space, leading or trailing space, space before punctuation, non-Latin letters, `sen` forms, capital `Siz` inside a sentence, tab or CR, Markdown characters, NFC normalisation, balance of U+201C/U+201D, line feeds (2 in advisor.intro, 0 elsewhere).

## Checked by reading
- advisor.open: PASS. "Bulbul'a danışın". Apostrophe U+0027 on the proper name; dative -a after the back vowel u (Bulbul + a), required by danışmak (birine danışmak); "danışın" = danış + -ın, back unrounded harmony after ı, both vowels dotless (U+0131), ş present; polite plural imperative (siz), consistent with Gönderin, Kapatın, Yeni sohbet başlatın; no final full stop on a button label; meaning stays inside ar "اسأل بلبل" / en "Ask Bulbul" (to ask the advisor, the panel title's "danışmanı"); nothing else in the string. Length 16 against the brief's "aim ≤ 14": a target, ruled by the judge (addendum 1a), not a defect.
- advisor.title: PASS. Byte-identical to judge.json.
- advisor.intro: PASS. Byte-identical to judge.json.
- advisor.placeholder: PASS. Byte-identical to judge.json.
- advisor.send: PASS. Byte-identical to judge.json.
- advisor.close: PASS. Byte-identical to judge.json.
- advisor.notice: PASS. Byte-identical to judge.json.
- advisor.resting: PASS. "Bulbul şu an molada. Gezilecek yerlere ya da “Gezinizi planlayın” sayfasına göz atabilirsiniz." Sentence 1: name unsuffixed, so no apostrophe is due; "şu an" written apart; "molada" = mola + locative -da (vowel-final stem, so d not t; back vowel a, so -da), written together as a locative; nominal predicate with a full stop; no dotted/dotless i at risk in the new word; meaning agrees with ar "بلبل يستريح الآن" / en "Bulbul is resting right now" (on a break right now), no reason and no return time added. Sentence 2 unchanged byte for byte: page label "Gezinizi planlayın" verbatim inside U+201C/U+201D with a space outside each quote and none inside, full stop after "göz atabilirsiniz", siz form.
- advisor.rate: PASS. Byte-identical to judge.json.
- advisor.error: PASS. Byte-identical to judge.json.
- advisor.cards: PASS. Byte-identical to judge.json.
- advisor.chip1: PASS. Byte-identical to judge.json.
- advisor.chip2: PASS. Byte-identical to judge.json.
- advisor.chip3: PASS. Byte-identical to judge.json.
- advisor.thinking: PASS. Byte-identical to judge.json.
- advisor.reset: PASS. Byte-identical to judge.json.

## Code points found (non-ASCII in the 16 strings)
- Apostrophe: U+0027 only, 4 occurrences (Bulbul'a in advisor.open and advisor.error, El-Ahsa'nın, Anthropic'in); none on a common noun.
- Quotes: U+201C and U+201D, advisor.resting only, one pair.
- Ellipsis: U+2026 (advisor.placeholder, advisor.thinking).
- Turkish letters: U+0131 ı, U+015F ş, U+011F ğ, U+00F6 ö, U+00E7 ç, U+00FC ü, U+015E Ş, U+0130 İ.
- Emoji U+1F426, U+1F334 (advisor.intro line 1); line feed U+000A x2 (advisor.intro only).

## Not checked here
- The 14 unchanged strings were not re-read for language; they rest on proofread-post.md (CLEAN) plus the byte comparison above.
- Whether a Turkish reader takes "danışın" and "molada" at first sight as intended is the fresh blind reader's question, not this stage's.
- No build, no rendering in the panel, no comparison with the live ui.ts.

## Verdict
CLEAN (0 defects).
