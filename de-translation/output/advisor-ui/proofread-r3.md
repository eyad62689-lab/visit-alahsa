# Proofread r3 — advisor-ui (de)

**Verdict: PASS** (no fix needed)

Scope: the one line the r2 judge edited, advisor.intro line 3. The mechanical check covered the other 16 keys.

Checked string (line 3):
"Möchten Sie schlendern oder Orte finden, die nur die Einheimischen kennen? Verraten Sie mir, was Ihnen gefällt, und ich stelle Ihnen einen Ausflug zusammen, der zu Ihrer Stimmung passt."

1. Rechtschreibung (Duden): PASS. Nouns capitalised, no Swiss ss, no split compounds.
2. Durchkopplung: PASS. The line has no proper-noun compounds (Al-Ahsa appears only on line 2, unchanged).
3. Grammatik: PASS. "Möchten Sie schlendern oder Orte finden" shares one modal verb with two parallel infinitives. The relative clause "die … kennen" has the verb at the end and agrees with "Orte". The imperative, "was Ihnen gefällt" and "der zu Ihrer Stimmung passt" are all correct.
4. Anrede: PASS. Sie, Ihnen and Ihrer are capitalised, and there is no du.
5. Termbase: PASS. "Einheimische" renders «أهل الديرة», and "Ausflug" renders «طلعة», as the judge ruled.
6. Interpunktion: PASS. Commas close the relative clause and the "was" and "der" clauses. The comma before "und ich" is optional, because it joins two main clauses. No serial comma.
7. Zahlen: PASS (n/a).
8. Denglisch: PASS.
9. Glossierung: PASS (n/a).
10. Struktur: PASS. See the script check below.

Register and fidelity against «جاي تتمشى، ولا تبي أماكن ما يعرفها إلا أهل الديرة؟ علّمني وش تحب، وأنا أضبط لك طلعة على مزاجك»:
- stroll = schlendern
- places only locals know = Orte … die nur die Einheimischen kennen
- tell me what you like = Verraten Sie mir, was Ihnen gefällt
- I'll set up an outing to your mood = ich stelle Ihnen einen Ausflug zusammen, der zu Ihrer Stimmung passt
- Nothing is added or dropped. The register is warm and polite with Sie, as bound. The edit only fixed the non-parallel "schlendern … suchen Sie Orte".

Script check (judge-r1 text vs judge-r2 text):
- Both have 17 keys in the same order.
- 16 keys are byte-identical. The only difference is advisor.intro, and only in line 3 ("oder suchen Sie Orte, die" -> "oder Orte finden, die").
- advisor.intro still has exactly 2 "\n" (three lines), 2 emoji (🐦🌴) and no CR.
