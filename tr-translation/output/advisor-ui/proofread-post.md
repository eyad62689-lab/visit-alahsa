# advisor-ui (tr): post-judge proofread of judge.json final_strings (16 keys)

Checked: key set and order equal pack.json (16, same order); mechanical rules of tools/check-tr-text.mjs (P8, P2, P10, i-with-combining-dot, straight/guillemet quotes) run by node on all 16: no hits; digits, spaces, `sen`/`Siz`: no hits.

- advisor.open: PASS. "Bulbul'a sorun", 14 characters (target is 14 or fewer, so exactly at the limit); polite imperative; dative -a is right for the name's last vowel u.
- advisor.title: PASS. Brand "Visit Al-Ahsa" verbatim; unsuffixed compound "Visit Al-Ahsa danışmanı" is grammatical.
- advisor.intro: PASS. Exactly 2 line feeds (U+000A); the two emoji U+1F426 U+1F334 close line 1; "El-Ahsa'nın" harmony correct; E4 "Şöyle bir dolaşmaya mı geldiniz, yoksa yalnızca buralıların bildiği yerlerin peşinde misiniz?" is grammatical, uses siz, the "only locals" fact kept (ar "ما يعرفها إلا أهل الديرة"), no gezinmek; "mı" written apart; "Hoş geldiniz" apart.
- advisor.placeholder: PASS. Ellipsis U+2026.
- advisor.send: PASS (E1). "Gönderin" polite imperative (UI1-controls), matches the published "Bildirimi gönderin".
- advisor.close: PASS (E2). "Kapatın" is identical to the published lang.suggest.close.
- advisor.notice: PASS (E7). Subject "Bulbul" is made explicit; "yalnızca ... dayanarak" keeps the scope "only the site's content"; sentence 2 unchanged: processed through Anthropic's service, not stored (no strengthening or softening; "saklanmaz" = not retained). "Anthropic'in": pronounced Antropik, so -in is correct; U+0027; "Anthropic" in Latin.
- advisor.resting: PASS. "Gezinizi planlayın" verbatim (nav.plan) inside U+201C/U+201D (the pair the published tr block uses); "Gezilecek yerlere" matches nav.attractions / plan.empty.browse; "göz atabilirsiniz" is siz.
- advisor.rate: PASS (E5). Facts kept: daily limit reached, see you tomorrow, attraction pages available meanwhile. "sizi bekliyor" is a warm rendering of ar "بين يديك" / en "all yours" and adds no fact. Not a defect; only register-level warmth, which the judge ruled.
- advisor.error: PASS. "Bulbul'a ulaşılamadı" dative OK; "Lütfen birazdan yeniden deneyin" is siz.
- advisor.cards: PASS. "İlgili sayfalar" carries İ (U+0130) correctly; no final full stop.
- advisor.chip1: PASS. First person, "görmeliyim".
- advisor.chip2: PASS (E6). "Cebel el-Kare" is the termbase/tm form verbatim, no suffix, no "Dağı"; both asks kept (hours = ne zaman açık, fees = giriş ücreti); grammatical question a visitor would type; 51 characters.
- advisor.chip3: PASS. "El-Ahsa mutfağını" built on the published nav.food "El-Ahsa mutfağı" (accusative; ğ present); follows ar "المطبخ الأحسائي", not "Hasawi".
- advisor.thinking: PASS. Participial status line, ellipsis U+2026.
- advisor.reset: PASS (E3). "Yeni sohbet başlatın" polite imperative (UI1-controls); no "temizleyin" added.

## Code points found (non-ASCII in the 16 strings)
- Apostrophe: U+0027 only (Bulbul'a, El-Ahsa'nın, Anthropic'in); no U+2019 or U+02BC. No apostrophe on a common noun.
- Quotes: U+201C and U+201D (advisor.resting only); no straight quotes, no guillemets.
- Ellipsis: U+2026 (advisor.placeholder, advisor.thinking); no "...".
- Turkish letters present and correct: U+0131 (ı), U+015F (ş), U+011F (ğ), U+00F6 (ö), U+00E7 (ç), U+00FC (ü), U+015E (Ş, intro line 3), U+0130 (İ, advisor.cards).
- Emoji U+1F426, U+1F334 (advisor.intro line 1 end); line break U+000A x2 (advisor.intro only).
- No NBSP (U+00A0), no zero-width characters, no combining dot U+0307, no non-Latin digits, no digits at all.

## Verdict
CLEAN (0 defects).
