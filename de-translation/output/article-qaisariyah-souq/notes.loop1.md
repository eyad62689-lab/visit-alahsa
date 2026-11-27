# Hinweise der Korrekturschleife 1 an den Richter (Runde 2) – qaisariyah-souq (de)

Zu beurteilen: `qaisariyah-souq.loop1.md`. Einzelheiten und Messwerte: `loop1-changes.md`.

## Stand
- Alle 23 must_fix (26 Ersetzungen) sind wörtlich angewandt. Keine „before“-Zeichenfolge hat gefehlt oder kam mehrfach vor; nichts wurde von Hand nachgeführt. `optional` war leer.
- Nach dem Ersetzen war keine Nachkorrektur nötig; kein Satz außerhalb der 26 Ersetzungen wurde angefasst (22 geänderte Zeilen von 135).
- `check-final.mjs`: 41/41, `--break` 16/16, ohne dass ein Anker oder ein Sollwert geändert wurde (wie vom Richter vorhergesagt). Titel 58 Zeichen, Beschreibung 225 Zeichen, „ 37 = “ 37, 13 Überschriften, 34 externe und 13 interne Links, 18 Quellenzeilen, 4 FAQ, U+00A0 = 0.

## Was der Richter an den eigenen Formulierungen noch einmal ansehen kann (nicht geändert, weil nicht verlangt)
1. **M19, „findet laut SPA“**: artikellos, während der Artikel sonst „die SPA“, „Nach Angaben der SPA“ und „laut der Encyclopaedia of Islam“ / „Laut der ICOMOS-Evaluierung“ schreibt. „laut SPA“ ist üblicher Agenturstil und kein Fehler; wer Einheitlichkeit will, schreibt „findet laut der SPA“.
2. **M14, „Der Beschluss erwähnt den Souk namentlich: Wo er aufzählt, … nennt er … und führt … an.“**: „er“ steht unmittelbar nach „den Souk“; gemeint ist der Beschluss (Subjekt des Vorsatzes), und der Inhalt lässt keine andere Lesart zu. Ein Blindleser könnte trotzdem kurz stocken.
3. **M4, „Sie erfahren, wann …“**: der Rahmen „Sie erfahren“ steht weder im Englischen noch im Arabischen (dort hängt die Aufzählung am Doppelpunkt). Er trägt keine Angabe, ist aber eine Anrede mehr; das Prüfskript führt ihn in der Info-Zeile „sentence-initial Sie“.
4. **M4, „den auch Souks von Kairo bis Granada trugen“**: „auch“ steht nicht in der Quelle («اسم حملته أسواق من القاهرة إلى غرناطة»); es löst den Holzweg „den Souks“ und fügt keine Angabe hinzu.
5. **M6**: „Historiker“ steht jetzt in zwei aufeinanderfolgenden Sätzen („was Historiker sagen: … Das Argument der Historiker: …“). Gewollt, um den Bezug zu klären.
6. **M12**: Im Text stehen jetzt nebeneinander „wiedererstand“ / „erstand … wieder“ (Einleitung, Abschnitt Brand, Schlusssatz, Beschreibung), „neu erbaut“ (Einleitung, Saudipedia, Fazit) und „Wiederaufbau“ / „wiederaufgebaut“ (Überschrift, SPA-Meldung, Granada). Die Verben folgen ihrer Stelle in der Quelle («عاد» · «بُني من جديد» · «أُعيد بناؤه»); das Substantiv „Wiederaufbau“ in der Überschrift steht nach M12 für «عودته». Nicht vereinheitlicht.

## Termbase (`termbase-additions.stage4.json`, an Ort und Stelle)
- Nachgezogen wie verlangt: Hinweis „the Qaisariyah (bare short name …)“ (Brücke M3) und Eintrag „Architectural Heritage Award (second place) · 13th cycle“ (M13) – dort außer `note` auch `de`, weil das Feld sonst „(zweiter Platz) · in der 13. Runde“ geführt hätte, das im Text nicht mehr steht.
- Zusätzlich, vom Richter nicht genannt: In den Hinweisen zu „kabank“ und „alcaicería“ stand je ein wörtliches Zitat, das M9 bzw. M21 ersetzt hat; nur das Zitat wurde nachgeführt. Wenn das zu weit geht: beide Stellen sind in `loop1-changes.md`, Abschnitt 3, mit Vorher/Nachher aufgeführt.
- „sadu weaving“ hat in dieser Datei keinen Eintrag; „(Webstoff)“ stand nirgends in ihr. Nichts geändert, Haupt-termbase nicht angefasst.

## Offen und unverändert übernommen aus Runde 1
- Die elf abgelehnten Blindleser-Punkte (3, 9, 18, 22, 24, 27, 28, 30, 31, 32, 37) und die zwei Quellenmängel (4, 5: „Kabank“-Türen im wiederaufgebauten Souk; Anordnung der drei Türteile) sind im Text nicht berührt.
- Hinweis U1 des Richters (leere Glosse „Sadu-Gewebe (Webstoff)“ in `src/content/stay/alkoot-heritage.md`, außerhalb dieser Charge): nicht angefasst.
- Der kürzere Titel (58 Zeichen) lässt sich mit einer Zeile zurückstellen, falls die Leitung den alten will.

## Nicht geprüft
Build, C22 auf `dist` (16 mit dem Englischen wortgleiche Linktexte, unverändert gegenüber Stufe 5), `tools/check-links.mjs`, Erreichbarkeit der Links. In dieser Schleife kein git, kein Build, kein Netz.

## Dateien dieser Schleife
`qaisariyah-souq.loop1.md` · `loop1-changes.md` · `notes.loop1.md` · `check-final.mjs` · `termbase-additions.stage4.json` (geändert).
Nicht geschrieben (Sache des Richters nach Runde 2): `qaisariyah-souq.final.md`, `tm-additions.json`, `scores-row.txt`, `posts.json`.
