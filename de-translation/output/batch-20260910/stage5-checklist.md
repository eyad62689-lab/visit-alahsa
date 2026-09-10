# Stage 5 – Deutschlektorat (de-DE), Zehn-Punkte-Liste · Charge 2026-09-10

Eingang: `24-hours-itinerary.stage4.md`, `48-hours-itinerary.stage4.md`, `fields.stage4.json`
Ausgang: `*.stage5.md`, `fields.stage5.json` – **byte-gleich mit Stage 4** (cmp-geprüft). Ergebnis: **10 × PASS, 0 × FIXED.**
Geprüft wurden alle Zeilen beider Beiträge, mit Schwerpunkt auf den 20 neu übersetzten Zeilen (24 h: 3, 13, 15, 18, 22, 24, 26, 28, 30, 34, 38, 39, 44, 45 · 48 h: 13, 18, 20, 30, 44, 48 sowie der gestrichene Listenpunkt) und der neuen Kartenzeile in `fields.stage4.json`. Regexproben mit `check-stage.mjs` (Scratchpad) plus gezielte Sonden; Befunde unten je Punkt.

---

## 1 · Rechtschreibung (Duden, de-DE) – **PASS**

- **ß nach langem Vokal/Diphthong**: `Beschließen` (24 h), `gemeißelt`, `Außerhalb`, `weiße` (48 h). Gegenprobe auf Schweizer/alte Schreibung (`gross`, `grösste`, `heiss`, `Strasse`, `schliesst`, `läßt`, `muß`, `daß`, `Fuss`, `weiss`): **null Treffer**. `größten Oase der Welt` in beiden Texten (C15-Formel, `oasen_anspruch`).
- **ss nur bei kurzem Vokal**, jedes Vorkommen einzeln geprüft: `Wasser`, `Lassen`, `nachlässt`, `schlossen`, `dessen`, `Gassen`, `Mittagessen`, `Abendessen`, `Adressen`, `passender`, `Abschluss` – alle korrekt.
- **Umlaute** vollständig (`Öffnungszeiten`, `Übernachtung`, `Höhlen`, `Küste`, `Gebäude`, `Cafés`, `ältesten`, `berühmte`, `nordöstlich`, `östlich`, `würdiger`).
- **Substantivgroßschreibung** einschließlich Nominalisierungen: `das Wesentliche`, `das Wichtigste`, `ihrem Grün`, `Zum ersten Mal`, `(Lomi)` groß (A2-23).
- **Zusammenschreibung / Komposita** nie getrennt: `Nichtmuslime` (Duden: Nichtmuslim, ein Wort, kein Bindestrich), `Treueid` (Duden-Form), `Vormittagslicht`, `Töpferhaus`, `Freitagsgebet`, `Gebetszeiten`, `Lehmmauern`, `Dattelpalmen`, `Wüstensand`, `Golfküste`, `Tagesplan`, `Reiseroute`.
- **Groß nach Doppelpunkt**, wo ein ganzer Satz folgt (`: Am Jabal al-Qarah …`, `: Die Palastfestung …`, `: Dann …`, `: Die Adressen …`, `: Manche …`, `: Daraus …`); **klein**, wo eine Aufzählung oder Ellipse folgt (`das Wesentliche: am frühen Morgen …`, `auf einen Tag: einen Berg …`, `gemeißelt wurden: im Sommer kühl …`) – alle 29 Doppelpunkte einzeln geprüft.
- Kleinschreibung der Adjektive `saudischen`, `historische`, `traditionellen`; `bin` klein im Namen (Präzedenz `jawatha-mosque.md`).

## 2 · Durchkopplung – **PASS**

Alle Eigenname-plus-Gattungsname-Verbindungen gekoppelt: `Al-Koot-Viertel` (auch in der Description) · `Qaisariyah-Souk` · `Jawatha-Moschee` · `Amiriah-Schule` · `Ibrahim-Palast` · `Qarah-Berg` · `Hasawi-Limettenfarm` · `Hasawi-Limette` · `UNESCO-Welterbe` · `24-Stunden-Route` · `Zwei-Tage-Route` · `Zwei-Tage-Plan`. Regexprobe auf getrennte Schreibung (`Jawatha Moschee`, `Qaisariyah Souk`, `Amiriah Schule`, `Ibrahim Palast`, `Qarah Berg`, `Koot Viertel`, `Hasawi Limette`, `UNESCO Welterbe`): **null Treffer**.

**Kein Pleonasmus:** kein `Jabal-al-Qarah-Berg`, kein `Souk-Markt`, kein `Kilabiyah-Dorf`, kein `Al-Qarah-Dorf`. Die Apposition „…, einem traditionellen Markt“ ist die vom Termbase-Eintrag 17 verlangte einmalige Souk-Erklärung, kein Pleonasmus.

**Bewusst getrennt**, weil der Gattungsname nicht Teil des Namens ist: `im Dorf Al-Qarah`, `im Dorf Al-Kilabiyah` (Termbase 57/58, `area_de` von `jawatha-mosque.md`); `das Haus der Familie Al-Mulla` (Genitivanschluss, Termbase 53).

**Artikel im Namen:** `Al-Ahsa`, `Al-Koot`, `Al-Uqair` (nie bloß „Uqair“ – Regexprobe), `Al-Qarah` (Dorf), `Al-Kilabiyah`, `Al-Mulla`, `Al-Gharash`, `Al-Bay'ah` groß am Namensanfang; `Jabal al-Qarah` klein in der Namensmitte (`title_de`). Apostroph in `Bayt Al-Bay'ah` U+0027 wie in EN und in der freigegebenen Fassung.

## 3 · Grammatik: Genus, Kasus, Genitiv, Adjektivendungen, Satzklammer – **PASS**

| Termbase / Addition | artikel | Vorkommen | Kasus |
|---|---|---|---|
| der Ibrahim-Palast (18) | der | `zu … (dem Ibrahim-Palast)` (24 h) · `bei … (dem Ibrahim-Palast)` (48 h) | Dativ ✔ |
| der Qarah-Berg (15) | der | `am … (dem Qarah-Berg)` · `zum … (dem Qarah-Berg)` · `die Höhlen des Jabal al-Qarah` | Dativ / Genitiv (Name unflektiert) ✔ |
| der Qaisariyah-Souk (16) · der Souk (17) | der | `im Qaisariyah-Souk` · `der Qaisariyah-Souk` (Nom.) · `der Puls des Souks` · `den Souk am Abend` · `traditionelle Souks` | Dat. / Nom. / Gen. `-s` / Akk. / Pl. ✔ |
| die Jawatha-Moschee (19) | die | `Die Jawatha-Moschee im Dorf …` · `steht die Jawatha-Moschee` | Nom. ✔ |
| die Oase (2) | die | `das Herz der Oase` · `im Herzen der Oase` · `ihr Wasser, ihre Küste` | Gen. / Possessiv fem. ✔ |
| das UNESCO-Welterbe (4) | das | `seit 2018 UNESCO-Welterbe` (artikellose Apposition) | ✔ |
| die Hasawi-Limette (32) · die Hasawi-Limettenfarm (33) | die | `Die Hasawi-Limette (die Limette aus Al-Ahsa) hat … Saison` (Nom., Glosse im Nom.) · `gehört der Nachmittag der Hasawi-Limettenfarm` (gehören + Dat.) · `die berühmte Hasawi-Limette (Lomi) pflücken` (Akk.) · `in der Saison die Hasawi-Limettenfarm` (Nom., Subjekt von „kommen … hinzu“) | ✔ |
| die Amiriah-Schule (56) | die | `zur Amiriah-Schule, der ersten … Schule` · `die Amiriah-Schule … hinzu` | Dat. / Nom. ✔ |
| das Al-Koot-Viertel (51) | das | `das historische Al-Koot-Viertel` · `das Al-Koot-Viertel am Vormittag` | Nom. ✔ |
| Bayt Al-Bay'ah (52, das) | das | `mit Bayt Al-Bay'ah, dem Haus der Familie Al-Mulla` | Dat. ✔ |
| Dougha Al-Gharash (54, das) | das | `liegt Dougha Al-Gharash – das Töpferhaus, das …` · `bei Dougha Al-Gharash, dem traditionellen Töpferhaus` | Nom. / Dat. ✔ |
| die Familie Al-Mulla (53) · die Familie Al-Gharash (55) | die | `der Familie Al-Mulla` · `die Familie Al-Gharash … weitergegeben hat` | Gen. / Nom. ✔ |
| **König Abdulaziz** (Addition, der) | der | `leisteten … König Abdulaziz den Treueid` | Dativobjekt ohne Artikel, Name unflektiert ✔ (jemandem den Treueid leisten) |
| **Scheich Abdulrahman bin Omar Al-Mulla** (Addition, der) | der | `Der Richter von Al-Ahsa, Scheich …, erbaute` | Nom., Apposition beidseitig mit Komma ✔ |
| die Einheimischen (22) | die (Pl.) | `die Einheimischen besticken` · `von einheimischen Händen` | Nom. / Dat. ✔ |
| der Golf / die Golfküste (8) | der / die | `an der Golfküste` · `das Blau des Golfs` | Dat. / Gen. ✔ |
| Al-Uqair (59) | — | `bei Al-Uqair, dem ältesten Hafen` · `die Küste von Al-Uqair` | Dat. ✔ |
| Nichtmuslime (Addition, die Pl.) | die | `Auch Nichtmuslime sind willkommen` | Nom. Pl. ✔ |

- **Genitiv-s:** `Al-Ahsas` (48 h), `des Islams` (3 ×), `des Golfs`, `des Souks`; Namen mit Artikel im Namen bleiben unflektiert (`des Jabal al-Qarah`).
- **Adjektivendungen:** `dem geologischen Wunder`, `einem traditionellen Markt`, `dem traditionellen Töpferhaus`, `der ersten regulären staatlichen Schule`, `einen mehr als zwei Jahrhunderte alten Souk`, `ein würdiger Abschluss für einen vollen Tag`, `dem saudischen Staat`, `bedeckende Kleidung`, `eine historische Festung und ein historisches Viertel`.
- **Satzklammer geschlossen:** `Kehren Sie … zurück` (Nachtrag „zu Qasr Ibrahim“ zulässig ausgeklammert), `Fügen Sie … hinzu`, `Beschließen Sie Ihren Tag im …`, `schlossen sich … an`, `Lassen Sie … ausklingen`, `Stellen Sie … zusammen`, `dort kommen … hinzu`, `machen Sie Halt bei`.
- **Präpositionen/Kasus:** `nahe Ihrer Route` (nahe + Dat.), `östlich von Hofuf`, `nordöstlich der Oase` (Gen.), `am Fuß des Berges`, `im Jahr 1203`, `ab Mitte Juni`, `außerhalb der Saison`; keine kalkierten Präpositionen (Regexprobe `interessiert in`, `verantwortlich für` u. Ä.: null).
- **Verb-Subjekt-Kongruenz** im neuen Listenpunkt: `dort kommen die Amiriah-Schule, … die Hasawi-Limettenfarm und die Küste … hinzu` (Plural) ✔. `Auch Nichtmuslime sind willkommen` (Plural) ✔. `Die Hasawi-Limette … hat … Saison` ✔.
- **Tempus/Modus** der historischen Sätze: Präteritum (`erbaute`, `leisteten`, `schlossen sich an`) gegen Präsens (`heute ist das Haus ein Museum`) – Wechsel durch „heute“ markiert ✔.

## 4 · Anrede – **PASS**

- Regexprobe (case-insensitive, Wortgrenzen) auf `du`, `dein*`, `dich`, `dir`, `euch`, `euer`, `eure`: **null Treffer** in beiden Beiträgen und in `fields.stage4.json`.
- Anredeformen groß und konsistent: 24 h 18 Vorkommen (`Sie`, `Ihren`, `Ihrer`, `Ihre`), 48 h 26 (`Sie`, `Ihre`, `Ihrem`, `Ihren`, `Ihr`, `Ihrer`, `Ihnen`, `Ihres`) – jedes einzeln auf seinen Bezug geprüft, alle meinen den Leser.
- Alle **klein** geschriebenen `sie`/`ihr*` (24 h: 2 Stellen, 48 h: 9 Stellen) mit Kontext geprüft: Bezug auf die Oase (`in ihrem eigenen Tempo – ihr Wasser, ihre Küste`, `ihre Natur`, `ihrem historischen Herzen`), die Angaben (`prüfen Sie sie … nach`), die Palastfestung (`sie vereint`), die Geschäfte (`ihre Türen`), die Station (`an ihrem Ort`). Kein satzinitiales Possessivum, das sich als Anrede lesen ließe (der Fall „Ihre Lehmmauern“ der Vorcharge bleibt behoben: „Die Lehmmauern“).
- Neue Imperative korrekt mit `Sie`: `Beginnen Sie Ihren Tag`, `Kehren Sie … zurück`, `Beschließen Sie Ihren Tag`, `wählen Sie daraus`, `Dann wechseln Sie`, `stöbern Sie … und wählen Sie`. Unpersönliche Sätze bleiben unpersönlich (`Wer mehr möchte, findet …` – Registerentscheidung der Quelle „If you want more“, in der Vorcharge freigegeben).

## 5 · Termbase-Konformität: 100 % – **PASS**

Jeder Eigenname und Fachbegriff steht in `glossary/termbase.json` oder in `termbase-additions.stage4.json` (Liste in `stage4-changes.md §c`, 26 Termbase-Einträge + 2 Namensadditionen + Kartenzeile). **Keine Verletzung.** Einzelproben:
- `Souk`/`Souks` (Termbase 17, Duden-Schreibung), **null** `Souq` außerhalb von URLs (`/en/souqs-parks-farms/`, `/en/attractions/qaisariyah/` sind Pfade).
- `die größte Oase der Welt` ohne „Palmen-“ (`oasen_anspruch`, C15).
- `Saudi-Arabien` mit Bindestrich, Adjektiv `saudisch` (Termbase 9) – kein „saudi-arabisch“, kein „Königreich“.
- `Medina` (`naming_policy.exception`), `der Golf` / `die Golfküste` (Termbase 8) – kein „Persischer/Arabischer Golf“.
- `die Hasawi-Limette` / `die Hasawi-Limettenfarm` (Termbase 32/33), kein „Zitrone“, kein „Ahsa-Limette“; Glosse der Nisba nach Termbase 36 gesetzt.
- `Al-Uqair` immer mit `Al-` (Termbase 59, Regexprobe auf bloßes „Uqair“: null).
- `„Meine Reise“` in Anführungszeichen, wo darauf verwiesen wird (Termbase 45); `Restaurants und Cafés`, `Souks, Parks und Farmen`, `Reise planen`, `Karte der Sehenswürdigkeiten` wörtlich aus dem de-Block von `ui.ts` / dem freigegebenen Text.
- `Öffnungszeiten und Eintritt` (Termbase 31) im Rhythmus-Absatz; neue Kartenzeile `Nichtmuslime` im Stil der kurzen Labels (`Eintritt`, `Besuchsdauer`, `Geeignet für`).
- `Angaben werden noch bestätigt` kommt nicht vor (kein unbestätigter Eintrag – `verified: true` in `jawatha-mosque.md`).
- **Dokumentierte, freigegebene Abweichung** (keine Verletzung): Tageszeiten-Überschriften `Früher Morgen · Vormittag · Mittag · Nachmittag · Abend · Sonnenuntergang` gegenüber Termbase 35 (nur Kartenbadges) – Urteil der Vorcharge, hier unverändert; „Vormittag“ für „mid-morning / الضحى“ entspricht zugleich Eintrag 35.

## 6 · Interpunktion – **PASS**

- **Anführungszeichen** ausschließlich `„…“`: `„Meine Reise“` (24 h 1 ×, 48 h 2 ×), paarweise ausgeglichen (Zählprobe „ = “). Keine geraden `"` im Fließtext – die einzigen `"` sind YAML-Begrenzer im Frontmatter, byte-gleich mit der englischen Vorlage.
- **Gedankenstrich U+2013 mit Leerzeichen** an jeder Stelle (24 h 10 ×, 48 h 8 ×, Kartenzeile 1 ×); Regexprobe auf `–` ohne Leerzeichen: null. **Null U+2014**, **null U+00A0/U+2009/U+202F** in beiden Texten, in `fields.stage4.json` und in `termbase-additions.stage4.json` (Codepoint-Zählung). Der Bindestrich `-` kommt im Fließtext nur in Komposita und Namen vor (`" - "` null Treffer im Body; die zwei Treffer der Gesamtdatei sind die YAML-Listenmarker `  - q:`).
- **Zahlenbereiche:** keine Bereiche im Text (keine Uhrzeiten, keine Preisspannen) – nichts zu verletzen.
- **Kommas vor Nebensätzen** vollständig: vor `dessen`/`deren`, `das`/`die`/`der` (relativ), `wenn`, `wo`, `an dem`, `auf der`, `bevor` (`…, bevor Sie abreisen`), `um … zu`, und im Wer-Satz (`Wer mehr möchte, findet …`); Apposition `, Scheich Abdulrahman bin Omar Al-Mulla,` beidseitig; Nachtrag `, bedeckende Kleidung vorausgesetzt` mit Komma; Einschub `, im Dorf Al-Qarah,` beidseitig.
- **Kein englisches serielles Komma:** `Moschee, Kaserne und Turm` · `Museen, Parks und traditionelle Souks` · `ihr Wasser, ihre Küste und ihre Farmen` · `die Amiriah-Schule, in der Saison die Hasawi-Limettenfarm und die Küste von Al-Uqair` · `Souks, Parks und Farmen` – überall ohne Komma vor „und“. Kommas vor „und“ nur zwischen vollständigen Hauptsätzen (`…, und der Puls des Souks schlägt schneller`; `…, und die Einheimischen besticken …`) – nach Duden zulässig und hier klärend.
- **Semikolon** nur zwischen gleichrangigen Hauptsätzen (`… an; heute ist das Haus ein Museum`; `… nachlässt; im Qaisariyah-Souk öffnen dann …`).
- **Doppelpunkt**: Groß-/Kleinschreibung danach siehe Punkt 1; kein Doppelpunkt vor unvollständiger Fortsetzung außer bei Aufzählungen.
- Keine Ausrufezeichen, keine Auslassungspunkte, keine doppelten Leerzeichen im Body.

## 7 · Zahlen, Datum, Währung, Hidschra – **PASS**

- **Ziffern** ausschließlich westlich (Regexprobe auf `[٠-٩۰-۹]`: null). Jahreszahlen ohne Tausenderpunkt (`1203`, `1789`, `1913`, `1937`, `2018`), wie es Duden für Jahreszahlen verlangt; `2,5 Millionen` mit Dezimalkomma (`style_rules.zahlen`).
- **Datum**: `ab Mitte Juni` (keine Ziffer nötig, Quelle „from mid-June“ / `fruits.ts` „من منتصف يونيو“); `pubDate: 2026-08-22` ist ISO-Frontmatter, unverändert.
- **Uhrzeiten/Währung**: keine im Text (bewusst, Faktensperre) – nichts zu verletzen.
- **Hidschra**: `1203 nach der Hidschra (1789 n. Chr.)` – Erstnennung ausgeschrieben (`style_rules.hidschra`), christliches Jahr in der Klammer mit `n. Chr.` und U+0020, wortgleich mit der freigegebenen Präzedenz `ameeriah.md` → `body_de` („1356 nach der Hidschra (1937 n. Chr.)“); keine zweite Hidschra-Angabe auf der Seite, daher keine Einführung der Abkürzung „(n. H.)“ nötig. `1913` und `1937` bare Jahreszahlen wie in EN/AR. **1788 kommt nirgends vor.** Zum Verhältnis zur Kurzformel des Briefings („1203 n. H. (1789 n. Chr.)“) siehe `notes.stage4.md §5.1` – Entscheidung des Judge, mechanisch ist beides regelkonform.

## 8 · Denglisch – **PASS**

Regexprobe auf `Spot`, `Location`, `Must-see`, `Hotspot`, `Guide`, `Feeling`, `Vibe`: **null**. `Highlight`: **0** (≤ 1 erlaubt). Keine „Erleben Sie“/„Entdecken Sie“-Ketten, keine Ausrufezeichen (`style_rules.ton`). `Route`, `Blog`, `Farm`, `Park`, `Museum`, `Souk` sind Duden-Lemmata; `Google Maps` Produktname. „Guide“ der englischen Quelle („Restaurants & Cafés guide“) korrekt als „auf der Seite …“ aufgelöst.

## 9 · Glossierung – **PASS**

- `Jabal al-Qarah (dem Qarah-Berg)`: einmal je Seite, bei der ersten Fließtextnennung (24 h Absatz „Früher Morgen“, 48 h Absatz „Früher Morgen“), Titelform voran (`gloss_regel`), nicht in der Überschrift; spätere Nennungen ohne Glosse.
- `Qasr Ibrahim (dem Ibrahim-Palast)`: einmal je Seite, erste Fließtextnennung; zweite Nennung im 24-h-Text (`wenige Schritte von Qasr Ibrahim`) ohne Glosse ✔.
- `Souk` → `einem traditionellen Markt`: einmal je Seite als Apposition (Termbase 17). Im 24-h-Text steht „Souk“ bereits in der Einleitungsaufzählung ungeglosst und wird im Abend-Absatz erklärt – wie in der freigegebenen Fassung (92/100) und wie von der Vorcharge in Punkt 9 durchgewinkt; nicht neu geöffnet (`notes.stage4.md §5.3`).
- `Hasawi-Limette (die Limette aus Al-Ahsa)`: einmal, erste Fließtextnennung der Nisba im 48-h-Text (Termbase 36); `(Lomi)` im folgenden tm-Paar ist die Glosse eines anderen Terms (Lokalname) und bleibt. Im 24-h-Text keine Nisba-Glosse (nur Eigenname in Aufzählung) – begründet in `stage4-changes.md b)`.
- `nach der Hidschra` ausgeschrieben = Selbstglosse des Kalenders (Punkt 7).
- Keine Glosse in einer Überschrift; keine doppelte Glosse desselben Terms auf einer Seite.

## 10 · Struktur – **PASS**

Automatisch gegen die englische Vorlage geprüft (`check-stage.mjs`):
- Frontmatter-Schlüssel byte-gleich in Reihenfolge und Namen (`title, description, lang, key, slug, heroImage, topic, pubDate, tags, faq`); `lang: de`; `key`, `slug`, `heroImage`, `pubDate` identisch mit der Vorlage bzw. der freigegebenen deutschen Fassung.
- Links: 24 h **12/12**, 48 h **14/14**, gleiche Reihenfolge, erwartete Ziele (`/de/` für `jabal-al-qarah`, `qasr-ibrahim`, `jawatha-mosque`, `ameeriah`, `al-uqair` und `/de/blog/48-hours-in-al-ahsa/`; `/en/` für `baiah`, `duqat-algharash`, `qaisariyah`, `lemon-farm` und alle statischen Seiten), alle mit Schrägstrich am Ende (`check-links`-Regel).
- Fettungen 4/4 und 6/6 an den Stellen der Vorlage; Überschriften `22222` bzw. `2333233332`; Listenpunkte 6/6 und 3/3 (der in EN/AR gestrichene Punkt „Öffnungszeiten und Eintritt“ fehlt korrekt); Zeilenzahl 47 und 59 = Vorlage; LF-Zeilenenden, abschließender Zeilenumbruch.
- Differenz zur freigegebenen deutschen Fassung exakt die `changes.diff`-Zeilen (24 h: 14 Zeilen, 48 h: 6 Zeilen + gestrichener Punkt) – nichts Unverändertes wurde angefasst.
- `fields.stage5.json` = Stage 4: `label_de` „Nichtmuslime“, `value_de` „Willkommen – bedeckende Kleidung vorausgesetzt“ (U+2013, U+0020), `source_de` wörtlich die in 7 Attraktionsdateien freigegebene Formel „Bestätigung durch das Redaktionsteam von Visit Al-Ahsa“; JSON valide.
- Meta-Description und Titel folgen denselben Sprachregeln (Durchkopplung `Al-Koot-Viertel`, U+2013, Sie-Register entfällt mangels Anrede); keine Alt-Texte in diesen Dateien (Hero-Bild per Pfad, unverändert).
