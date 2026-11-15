# Blind reader report: /de/emergency/ (post)

Totals: 25 findings. HIGH 0, MEDIUM 9, LOW 16. Overall the German is fluent, correct and consistently in the formal Sie register. No garbled sentences and no case or agreement errors that block comprehension. The issues are a handful of ambiguous safety instructions and some translationese.

## Findings

1. Quote: "Verzögern Sie den Anruf nicht, um auf dieser Seite zu suchen oder der Website zu schreiben." | Problem: "der Website zu schreiben" is slightly foreign. Native phrasing would be "die Website anzuschreiben" or "uns zu schreiben". | Severity: low | Fix: "...oder der Website eine Nachricht zu senden."

2. Quote: "Name der Straße oder eines markanten Punkts und der nächste Eingang." | Problem: The "Eingang" of what? A building, a park, a farm? Unclear on first read. | Severity: low | Fix: say which entrance is meant (for example "der nächste Eingang des Gebäudes oder Geländes"), if the source supports it.

3. Quote: "teilen Sie Ihren Standort auf dem Weg, den Ihnen die Leitstelle nennt." | Problem: "auf dem Weg" reads as a physical route. What is meant is a channel (app, SMS, link). I misread it on the first pass. | Severity: medium | Fix: "über den Kanal/das Verfahren, das Ihnen die Leitstelle nennt".

4. Quote: "Fahren Sie nicht selbst Auto, wenn Ihr eigener Zustand Ihre Fahrtüchtigkeit beeinträchtigen könnte." | Problem: Safety-relevant, but the context is missing. It is not clear whom I would otherwise drive (the patient to hospital?). "selbst" and "eigener" together double the emphasis and read like a back-translation. | Severity: medium | Fix: make the purpose explicit, for example "Fahren Sie die verletzte Person nicht selbst, wenn…". If something is missing from the source, mark it as missing.

5. Quote: "Nur weil ein Krankenhaus am nächsten liegt, ist es nicht unbedingt das richtige für diesen Fall." | Problem: Register is a little casual next to the rest. "das richtige" is lowercase, which is correct but looks odd. | Severity: low | Fix: "Das nächstgelegene Krankenhaus ist nicht in jedem Fall das passende."

6. Quote: "König-Fahad-Krankenhaus, Hofuf Gesundheitsministerium (öffnet in einem neuen Fenster)" and "Geburts- und Kinderkrankenhaus, Al-Ahsa" | Problem: In the plain text the operator runs straight into the name (known extraction artifact). "Geburts- und Kinderkrankenhaus" is understandable but the usual German term is "Entbindungs- und Kinderklinik" or "Mutter-und-Kind-Krankenhaus". "Hofuf" is never introduced as a place. | Severity: low | Fix: check the layout separates name and operator; consider the usual German hospital term.

7. Quote: "Lassen Sie sich in der Apotheke oder unter 937 zu dem beraten, was Sie brauchen" | Problem: "zu dem beraten, was Sie brauchen" is awkward. Nobody is advised "on what they need"; one is advised about a medicine or a problem. | Severity: medium | Fix: "Lassen Sie sich in der Apotheke oder unter 937 beraten, welches Mittel Sie brauchen".

8. Quote: "Verlassen Sie die Fahrspur, wenn Sie das gefahrlos tun können" | Problem: "die Fahrspur verlassen" can be misread as leaving the vehicle or changing lanes. The intent seems to be clearing the carriageway. | Severity: medium | Fix: "Räumen Sie die Fahrbahn / fahren Sie an den Rand", if that is the meaning.

9. Quote: "Wenden Sie sich an Najm – über die offizielle App oder den Kundenservice unter 199033 –, um zu klären, wie Sie den Unfall melden, soweit er unter die Zuständigkeit und die Servicebedingungen von Najm fällt." | Problem: Very long and stiff, with an en-dash parenthesis plus a "soweit" clause. "Zuständigkeit und die Servicebedingungen von Najm" is heavy bureaucratese. The whole passage then continues with a 920000560 number and a fallback to 993. I had to read it twice. "Ausweis" is also odd for a foreign visitor (Reisepass?). | Severity: medium | Fix: split into two or three sentences and state one action per sentence: first Najm; if not responsible, 993.

10. Quote: "Halten Sie sich von Senken und von Rinnen fern, durch die Sturzfluten abfließen" | Problem: "Rinnen" is the wrong image for flash-flood channels (it suggests small gutters). A German reader expects "Bachbetten", "trockene Flussbetten" or "Wadis". | Severity: medium | Fix: "Bachbetten/Wadis" (if the source means that), otherwise "Abflussrinnen" at least.

11. Quote: "Halten Sie Kinder von stehendem Wasser und von Rinnen fern, durch die Sturzfluten abfließen." | Problem: The relative clause repeats word for word from the sentence above, two paragraphs apart in the same section. Reads redundant. | Severity: low | Fix: shorten the second mention.

12. Quote: "Gehen Sie nicht ins Wasser und versuchen Sie keine Rettung, wenn Sie dabei selbst zu ertrinken drohen; holen Sie sofort Hilfe." | Problem: The "wenn" clause attaches to both verbs. First reading gives "do not go into the water if you risk drowning", which is pointless. The intended meaning is probably "do not go into the water to rescue someone". Safety-critical ambiguity. | Severity: medium | Fix: separate the two ideas, for example "Gehen Sie nicht ins Wasser, um jemanden zu retten, wenn Sie selbst zu ertrinken drohen".

13. Quote: "rufen Sie 997 an, wenn die Person das Bewusstsein verliert, Atemnot oder starke Symptome hat." | Problem: Zeugma. "verliert" is read with all three objects (so I read "verliert Atemnot") before the sentence ends with "hat". | Severity: medium | Fix: "…wenn die Person bewusstlos wird, Atemnot oder starke Symptome hat."

14. Quote: "Bewahren Sie den Namen oder die Verpackung des Stoffes auf" | Problem: One cannot "aufbewahren" a name. The verb fits only the packaging. | Severity: medium | Fix: "Notieren Sie den Namen des Stoffes oder bewahren Sie die Verpackung auf".

15. Quote: "nähern Sie sich keinem Wasser in der Umgebung" | Problem: "keinem Wasser" sounds unnatural. | Severity: low | Fix: "meiden Sie Wasser in der Umgebung" or "gehen Sie nicht in die Nähe von Wasserlachen".

16. Quote: "...rufen Sie bei unmittelbarer Bedrohung 911 an, und melden Sie Stromstörungen unter 933." and "…Notaufnahme, und verlassen Sie sich…" and "…zu holen" in the fire paragraph | Problem: Comma before "und" is used inconsistently between two imperative main clauses. It is permitted when emphasising, but it appears in some places and not in others on the page. | Severity: low | Fix: pick one pattern (no comma before "und" between two imperative main clauses is the safer one).

17. Quote: "Warten Sie nicht, bis Ihre eigene Suche abgeschlossen ist, wenn die Sicherheit eines Menschen gefährdet ist" | Problem: Stiff and slightly double-conditioned. | Severity: low | Fix: "Suchen Sie nicht erst selbst zu Ende, wenn ein Mensch gefährdet sein könnte" (wording only, no added information).

18. Quote: "nutzen Sie die Gerätesperre, die der Anbieter des Betriebssystems Ihres Telefons bereitstellt" | Problem: Bureaucratic circumlocution; four genitive/relative layers. | Severity: low | Fix: "nutzen Sie die Sperrfunktion Ihres Telefon-Betriebssystems".

19. Quote: "931 / Meldungen zur Wasserversorgung / Probleme bei der Wasserversorgung und Lecks" | Problem: Every other row has an authority or service name in line 2 (Gesundheitsministerium, Balady, Stromnotdienst). Here the second line is a function, and the third line repeats it. Inconsistent row structure. | Severity: low | Fix: give the row a name (the source list names the national water company).

20. Quote: "Wie in den Notrufnummern der Nationalen Plattform aufgeführt" | Problem: Says only where the number is listed, not what it is for. Reads like a placeholder. | Severity: low | Fix: say what the number is for.

21. Quote: "Mein Kind ist verschwunden." | Problem: When reporting to authorities Germans say "Mein Kind wird vermisst." "verschwunden" is more dramatic and slightly different in tone from the Arabic gloss "missing". | Severity: low | Fix: "Mein Kind wird vermisst."

22. Terminology: "Leitstelle", "911-Zentrale", "Einheitliche Sicherheitsleitstelle der Ostprovinz" and "Rettungsdienst" / "Rettungswagen" / "Rettungsteam" are used for related things. Mostly consistent, but the reader cannot tell if "Leitstelle" and "911-Zentrale" are the same body. | Severity: low | Fix: use one term for the 911 call centre throughout.

23. Quote: "Nutzen Sie die 937 für Beratung, Weiterleitung und Gesundheitsdienste." | Problem: "Gesundheitsdienste" is vague next to "Beratung" and "Weiterleitung". | Severity: low | Fix: say what service (for example "Gesundheitsauskünfte").

24. Quote: "Wie finde ich eine Gesundheitseinrichtung, die gerade geöffnet hat?" | Problem: "geöffnet hat" is colloquial; elsewhere the page is formal. | Severity: low | Fix: "die gerade geöffnet ist".

25. Quote: "Diese Hinweise unterstützen Sie dabei, Hilfe zu holen; sie ersetzen weder die Einschätzung durch Fachleute noch die Anweisungen der Einsatzkräfte." | Problem: "unterstützen Sie dabei, Hilfe zu holen" is stiff. Otherwise fine. | Severity: low | Fix: "Diese Hinweise helfen Ihnen, Hilfe zu holen; …"

## Content questions

- "Najm", "Nationale Plattform", "SPA", "Balady" and "asch-Scharqiyya" are never explained. A German visitor does not know what Najm is (an insurer? an app? a state service?). "Najm" and "Nationale Plattform" matter most because they carry the accident advice.
- "Berater Bulbul" is mentioned without introduction.
- Snakebite/scorpion paragraph says "Rufen Sie sofort einen Rettungswagen" without a number, while the other paragraphs give 997.
- Heat stroke: the page first says drink regularly, then "Geben Sie einer Person mit Verdacht auf Hitzschlag nichts zu trinken". Not contradictory (prevention vs. first aid) but a reader may pause.
- The 112 appears only in the FAQ and is not in the number table.
- 937 and 997 differ by one digit; the page never warns about confusing them, though both appear side by side often.
- The phrase block offers Arabic script without transliteration, so a visitor who cannot read Arabic cannot say the phrases. The German gloss helps only for showing the screen.
- "Stand der Informationen: 15. November 2026" appears twice (top and bottom). Harmless.
