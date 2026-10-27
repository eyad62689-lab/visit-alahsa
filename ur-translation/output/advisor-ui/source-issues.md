# Source issues, advisor-ui (ur batch, 2026-10-27)

Recorded, not fixed.

1. advisor.intro, Arabic vs English. The Arabic line 3 has two questions merged ("جاي تتمشى، ولا تبي أماكن ما يعرفها إلا أهل الديرة؟") and the verb "أضبط لك طلعة على مزاجك" (sets up an outing to your mood). The English says "shape an outing to your mood", and drops the word "أهل الديرة" as "locals" (neutral). The Urdu follows the Arabic meaning; the register difference (Gulf dialect "تبي", "وش", "ما يعرفها إلا") is not carried by the English and cannot be carried by standard Urdu.

2. advisor.intro, English line 1. "Hala!" is a Gulf-Arabic word left untranslated in the English; the Arabic has "يا هلا والله!". An English reader who does not know "Hala" gets a meaningless token. Urdu renders the sense (a hearty welcome), not the sound.

3. advisor.chip3, English deviates from the Arabic. The Arabic says "المطبخ الأحسائي" (Al-Ahsa cuisine); the English says "Hasawi food", which uses the nisba the site rule forbids outside proper names ("الأحسائي" not "الحساوي"). Urdu follows the Arabic. The English string should read "Al-Ahsa food" or similar.

4. advisor.rate, wording. Arabic "وصفحات المعالم بين يديك" (the attraction pages are in your hands) and English "the attraction pages are all yours" are both idioms; the English "all yours" adds a nuance of exclusivity that the Arabic lacks. Urdu says only that the pages are in front of the visitor.

5. advisor.notice, who stores. Arabic "تُعالَج الأسئلة عبر خدمة Anthropic ولا تُحفظ" is passive in both clauses and does not say whether Anthropic or the site does not store the questions. English copies the ambiguity ("are processed by Anthropic's service and are not stored"). Urdu keeps the ambiguity (the first clause names the service as actor, the second stays passive). The privacy page is the owner's; a clarification there is for the owner.

6. advisor.open vs advisor.title/thinking/error, persona gender. The Arabic verbs "بلبل يكتب", "بلبل يستريح" treat the persona as grammatically masculine (the Arabic noun "بلبل" is masculine), while Urdu "بلبل" is feminine (Rekhta) and the mascot is "سفید گالوں والی بلبل" (feminine, N859). Urdu agrees feminine. This is a language fact, not a content change; the owner may want to know that the Urdu persona is "she" while the Arabic one is "he".

7. advisor.title, brand. The Arabic title uses the Arabic brand "زوروا الأحساء"; the English uses "Visit Al-Ahsa". On /ur/ the brand is the open item BRAND; the Latin form is used provisionally and the title therefore mixes Latin into an Urdu sentence.

8. pack.json, key role of advisor.open. The role says "≤ 3 Urdu words"; "بلبل سے پوچھیں" is exactly 3. No defect, recorded for the count.
