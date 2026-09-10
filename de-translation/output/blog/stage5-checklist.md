# Stage 5 – Deutschlektorat (de-DE), Zehn-Punkte-Liste

Eingang: `*.stage4.md` / `ui-strings.stage4.json` · Ausgang: `*.stage5.md` / `ui-strings.stage5.json`
Geprüft: beide Blogbeiträge **und** die fünf UI-Strings. Ergebnis: **9 × PASS, 1 × FIXED.**
Die eine Korrektur betrifft den 48-h-Text; `24-hours-itinerary.stage5.md` und
`ui-strings.stage5.json` sind byte-gleich mit Stage 4.

---

## 1 · Rechtschreibung (Duden, de-DE) – **PASS**

- **ß nach langem Vokal und Diphthong**, keine Schweizer Form: `größten` (2 ×), `Am Fuß des Berges`,
  `gemeißelt`, `der weiße Sand`. Gegenprobe auf `gross`, `heiss`, `Strasse`, `schliess`, `läßt`,
  `muß`, `daß`: null Treffer in allen drei Dateien.
- `lässt nach` ist korrekt mit ss (kurzer Vokal), `läßt` wäre alte Rechtschreibung – nicht vorhanden.
- **Umlaute** vollständig: `Öffnungszeiten`, `Übernachtung`, `Höhlen`, `Küste`, `Gebäude`, `Cafés`,
  `wöchentlichen`, `Königreich`, `ältesten`, `Fließtext`-Formen durchgehend gesetzt.
- **Substantivgroßschreibung** einschließlich der Nominalisierungen: `das Wesentliche`,
  `das Wichtigste`, `Das Grün der Farmen`, `ihrem Grün`, `Zum ersten Mal`.
- **Großschreibung nach Doppelpunkt**, wo ein ganzer Satz folgt: `: Die Festung vereint …`,
  `: Seine Höhlen …`, `: Manche liegen …`, `: Daraus wird …`, `: Dann wird das Licht …`.
- **Komposita zusammen- oder durchgekoppelt, nie getrennt:** `Dattelpalmen`, `Mittagshitze`,
  `Tageslicht`, `Lehmmauern`, `Gebetszeiten`, `Töpferhaus`, `Zitrussaison`, `Sonnenuntergang`,
  `Staatsgründung`, `Innenhof`, `Wüstensand`, `Golfküste`, `Tagesplan`, `Reiseroute`.

## 2 · Durchkopplung – **PASS**

Alle Eigenname-plus-Gattungsname-Verbindungen gekoppelt: `Al-Koot-Viertel` · `Qaisariyah-Souk` ·
`Jawatha-Moschee` · `Amiriah-Schule` · `Ibrahim-Palast` · `Qarah-Berg` · `Hasawi-Limettenfarm` ·
`Hasawi-Limette` · `UNESCO-Welterbe` · `24-Stunden-Route` · `Zwei-Tage-Route` · `Zwei-Tage-Plan`.
Regexprobe auf die getrennte Schreibung (`Jawatha Moschee`, `Qaisariyah Souk`, `Amiriah Schule`,
`Ibrahim Palast`, `Qarah Berg`, `Koot Viertel`, `Hasawi Limette` …): null Treffer.

**Kein Pleonasmus:** kein `Jabal-al-Qarah-Berg`, kein `Souk-Markt`. Die Glosse
„… im [Qaisariyah-Souk] …, einem traditionellen Markt“ ist **kein** Pleonasmus, sondern genau die
vom Termbase-Eintrag „souq (generic)“ verlangte einmalige Erklärung – als Apposition statt in
Klammern, weil die englische Quelle sie dort selbst als Apposition führt.

**Bewusst getrennt**, weil der Gattungsname nicht Teil des Namens ist: `Dorf Al-Qarah`,
`Dorf Al-Kilabiyah` – so auch im freigegebenen `area_de` von `jawatha-mosque.md`.

**Artikel im Namen:** `Al-Ahsa`, `Al-Koot`, `Al-Uqair`, `Al-Qarah` (Dorf), `Al-Kilabiyah`,
`Al-Mulla`, `Al-Gharash`, `Al-Bay'ah` groß am Namensanfang; `Jabal al-Qarah` klein in der
Namensmitte (wie `title_de`). Das große `Al-` in `Bayt Al-Bay'ah` und `Dougha Al-Gharash` steht am
Anfang des jeweiligen zweiten Namensglieds und ist damit regelkonform – `titel_regel` führt
„Bayt Al-Bay'ah“ selbst als Beispiel.

## 3 · Grammatik: Genus, Kasus, Genitiv, Adjektivendungen, Satzklammer – **PASS**

Jedes Genus stimmt mit seinem Termbase-`artikel` überein, in jedem Kasus:

| Termbase | artikel | Vorkommen im Text | Kasus |
|---|---|---|---|
| der Ibrahim-Palast | der | `bei … (dem Ibrahim-Palast)` | Dativ ✔ |
| der Qarah-Berg | der | `zum … (dem Qarah-Berg)` · `des Qarah-Bergs` | Dativ / Genitiv ✔ |
| der Qaisariyah-Souk | der | `im [Qaisariyah-Souk]` · `der Qaisariyah-Souk öffnet` | Dativ / Nom. ✔ |
| der Souk | der | `der Souk zu pulsieren beginnt` · `wöchentlichen Souks` | Nom. / Akk. Pl. ✔ |
| die Jawatha-Moschee | die | `steht die …` · `sie ergänzt die …` | Nom. / Akk. ✔ |
| die Al-Ahsa-Oase / die Oase | die | `das Herz der Oase` · `im Herzen der Oase` | Genitiv ✔ |
| das UNESCO-Welterbe | das | `seit 2018 UNESCO-Welterbe` (artikellose Apposition) | ✔ |
| die Hasawi-Limettenfarm | die | `gehört der Nachmittag der [Hasawi-Limettenfarm]` | Dativ (gehören + D) ✔ |
| die Hasawi-Limette | die | `die berühmte Hasawi-Limette (lomi) pflücken` | Akk. ✔ |
| die Amiriah-Schule | die | `zur [Amiriah-Schule], der ersten … Schule` | Dativ ✔ |
| die Golfküste / der Golf | die / der | `an der Golfküste` · `das Blau des Golfs` | Dativ / Genitiv ✔ |
| Al-Uqair | — | `bei [Al-Uqair], dem ältesten Hafen der Region` | Dativ ✔ |
| das Al-Koot-Viertel | das | `das historische Al-Koot-Viertel` | Nom. ✔ |
| Bayt Al-Bay'ah | das | `mit […], dem Haus der Familie Al-Mulla` | Dativ ✔ |
| Dougha Al-Gharash | das | 24 h `liegt … – das Töpferhaus` (Nom.) · 48 h `bei …, dem … Töpferhaus` (Dativ) | ✔ |

- **Klammer-Appositionen** stehen jetzt im Kasus ihres Bezugsworts (Stage-4-Korrektur, hier
  nachgeprüft): `bei … (dem Ibrahim-Palast)`, `zum … (dem Qarah-Berg)`.
- **Genitiv-s an Namen:** `Al-Ahsas` (48 h), `des Islams` (2 ×), `des Golfs`, `des Qarah-Bergs`.
- **Adjektivendungen** stichprobenfrei geprüft: `dem geologischen Wunder`, `einem traditionellen
  Markt`, `dem traditionellen Töpferhaus`, `der ersten regulären staatlichen Schule`,
  `ein mehr als zwei Jahrhunderte alter Souk`, `ein passender Abschluss eines dichten Tages`,
  `von einheimischen Händen`, `zu den bekanntesten Stätten`.
- **Satzklammer geschlossen:** `Fügen Sie … hinzu`, `Lassen Sie den Tag … ausklingen`,
  `Stellen Sie … zusammen`, `machen Sie Halt bei`, `spricht … nicht gegen`, `lässt nach`.
- **Keine kalkierten Präpositionen** (`interessiert in`, `verantwortlich für` o. Ä.): null Treffer.
  `nahe dem Palast` (+ Dativ), `von Hofuf aus`, `voller Höhlen`, `gehören + Dativ` sind korrekt.
- Die Partizip-plus-Nominalphrase-Koordination bei „Dougha Al-Gharash“ war der einzige echte
  Grammatikfehler und wurde bereits in Stage 4 (Sätze 24 h-6 / 48 h-5) in Relativsätze aufgelöst.

## 4 · Anrede – **FIXED**

- **Null Vorkommen** von `du`, `dein`, `dich`, `dir`, `euch`, `euer` in allen drei Dateien
  (Regexprobe, case-insensitive).
- Alle echten Anredeformen groß und durchgehend: `Sie`, `Ihnen`, `Ihr`, `Ihre`, `Ihrem`, `Ihren`,
  `Ihrer`, `Ihres` – jedes Vorkommen einzeln auf seinen Bezug geprüft, alle meinen den Leser.
- **Korrigiert (48 h, „Mittag: Die Jawatha-Moschee“):**
  - vorher: „**Ihre** Lehmmauern tragen eine der ältesten Geschichten des Islams.“
  - nachher: „**Die** Lehmmauern tragen eine der ältesten Geschichten des Islams.“
  - Grund: Das große „Ihre“ war hier **nicht** die Anrede, sondern das satzinitiale Possessivum zu
    „die Jawatha-Moschee“ – in einem durchgehend siezenden Text liest der erste Blick „Ihre“ als
    „die Ihren“. Das ist genau die Vermischung, die Punkt 4 ausschließen soll. Die freigegebene
    Fassung derselben Aussage kommt ohne Possessivum aus (`src/i18n/ui.ts`, de →
    `'home.route.s4.d': 'Lehmmauern, die eine der ältesten Geschichten des Islams tragen.'`), der
    Blog folgt ihr jetzt. Keine Aussage geht verloren: Der Bezug steht im selben Absatz.
- Kein weiterer Fall: Alle übrigen klein geschriebenen `ihr`/`ihre`/`sie` stehen satzintern und
  beziehen sich auf die Oase, die Route oder die Angaben – dort ist die Kleinschreibung richtig.
- Der verwandte Fall „**Sie** ändern sich je nach Saison“ (satzinitiales Pronomen, das sich als
  Anrede las) war schon in Stage 4 (48 h, Satz 8) zu „**Beide** ändern sich“ korrigiert.

## 5 · Termbase-Konformität: 100 % – **PASS**

Jeder Eigenname und jeder Fachbegriff im Text steht entweder in `glossary/termbase.json` oder in
`termbase-additions.stage4.json`; **keine Verletzung, nichts zu korrigieren.**

- Aus dem bestehenden Termbase: `Al-Ahsa` · `die Oase` / `die Al-Ahsa-Oase` · `das UNESCO-Welterbe` ·
  `Hofuf` · `der Golf` / `die Golfküste` · `der Qarah-Berg (Jabal al-Qarah)` · `der Qaisariyah-Souk` ·
  `der Souk` (Schreibung **Souk**, nicht „Souq“ – Regexprobe auf `Souq`: null Treffer) ·
  `der Ibrahim-Palast` · `die Jawatha-Moschee` · `die Hasawi-Limette` · `die Hasawi-Limettenfarm` ·
  `die Dattelpalmen` · `die Einheimischen` (als `von einheimischen Händen`) · `die Anreise` ·
  `„Meine Reise“` · `die größte Oase der Welt` (Wortlaut nach `oasen_anspruch`, ohne „Palmen-“).
- Aus `ui.ts` (de) wörtlich übernommen, damit Blog und Website gleich klingen:
  `Restaurants und Cafés` (`nav.dine`) · `Souks, Parks und Farmen` (`list2.title`) ·
  `Reise planen` (`nav.plan`) · `Meine Reise` (`nav.myTrip`) · `Al-Uqair` (`home.route.s6.n`) ·
  `Hasawi-Limettenfarm` (`home.route.s5.n`) · `Das historische Herz` (`home.route.d1.t`) ·
  `Sehenswürdigkeiten` · `In Google Maps öffnen` → `die sich in Google Maps öffnet`.
- Aus `termbase-additions.stage4.json`: `das Al-Koot-Viertel` · `Bayt Al-Bay'ah` ·
  `die Familie Al-Mulla` · `Dougha Al-Gharash` · `die Familie Al-Gharash` · `die Amiriah-Schule` ·
  `Al-Kilabiyah` · `Al-Qarah` · `Al-Uqair`.
- **Eine bewusste, begründete Abweichung** (keine Verletzung, aber für den Judge sichtbar): Der
  Eintrag „daypart badges (Morning / Midday / Sunset) → der Vormittag · der Mittag · der
  Sonnenuntergang“ ist ausdrücklich auf die **Badges der Attraktionskarten** bezogen. Die
  Zwischenüberschriften der Blogbeiträge brauchen sieben unterscheidbare Tageszeiten (Stage 1, C1);
  würde man „Morning = Vormittag“ erzwingen, hießen im 48-h-Beitrag zwei Überschriften gleich
  („Morning“ und „Mid-morning“). Verwendet wird deshalb die überschneidungsfreie Reihe
  Morgen · Vormittag · Mittag · Nachmittag · Abend · Früher Morgen · Sonnenuntergang.

## 6 · Interpunktion – **PASS**

- **Anführungszeichen** durchgehend `„…“`: `„Meine Reise“` (24 h 1 ×, 48 h 2 ×), paarweise
  ausgeglichen. Keine geraden `"` im Fließtext – die einzigen `"` stehen als YAML-Begrenzer im
  Frontmatter und sind gegenüber der englischen Vorlage unverändert.
- **Gedankenstrich U+2013 mit Leerzeichen** an jeder Stelle (24 h 10 ×, 48 h 10 ×, UI 1 ×);
  Regexprobe auf `–` ohne umgebendes Leerzeichen: null Treffer. **Null U+2014** in allen drei
  Dateien, wie `_meta.style_rules.gedankenstrich` verlangt.
- **Zahlenbereiche ohne Leerzeichen**: in diesen Texten kommt kein Bereich vor (keine Uhrzeiten,
  keine Preisspannen) – die Regel greift nicht, es gibt nichts zu verletzen.
- **Komma vor Nebensätzen** vollständig gesetzt: vor `dessen`/`deren`, `das`/`die`, `wenn`, `wo`,
  `an dem`, `was`, `um … zu`, sowie vor dem erweiterten Infinitiv in „hilft Ihnen, die Reihenfolge
  Ihres Tages einzuschätzen“ und im Wer-Satz „Wer die Museen … möchte, plant besser drei Tage ein“.
- **Kein englisches serielles Komma**: `Moschee, Kaserne und Turm` · `die Museen, Parks und
  wöchentlichen Souks` · `ihr Wasser, ihre Küste und ihre Farmen` · `Souks, Parks und Farmen` –
  überall ohne Komma vor „und“. Das Komma vor „und“ in „…, und die Hitze lässt nach“ verbindet zwei
  Hauptsätze und ist nach Duden zulässig und hier klärend.
- Asyndetische Reihe `Morgen, Mittag, Sonnenuntergang` entspricht der Vorlage („morning, midday,
  sunset“) und ist im Deutschen korrekt.

## 7 · Zahlen, Datum, Währung, Hidschra – **PASS**

- **Nur lateinische Ziffern 0–9**; Regexprobe auf arabisch-indische Ziffern: null Treffer
  (zugleich die Projektregel, die C4 im Build erzwingt).
- **Dezimalkomma**: `2,5 Millionen Dattelpalmen` – wortgleich mit `home.hero.lead` in `ui.ts`.
  Ein Tausenderpunkt kommt in diesen Texten nicht vor.
- **Hidschra** nach `_meta.style_rules.hidschra`: erste (und einzige) Nennung je Beitrag
  ausgeschrieben mit eingeführter Abkürzung – „im Jahr 1203 **nach der Hidschra (n. H.)**“. **Kein**
  gregorianisches Klammerjahr, weil weder die englische noch die arabische Vorlage eines nennt
  (Stage-1-Sperre B1, in Stage 4 bestätigt).
- Übrige Zahlen: `2018`, `1937`, `24`, `48`, `Tag 1`, `Tag 2` – alle aus der Quelle, alle in der
  deutschen Schreibweise. `Tag 1`/`Tag 2` als Ziffer in den Überschriften folgt `ui.ts`
  (`home.route.d1.k` = „Tag 1“), ausgeschrieben („Tag eins“) im Fließtext wie in der Vorlage.
- **Währung**: kommt in beiden Beiträgen nicht vor – nichts zu prüfen, nichts erfunden.
- **Datum**: `pubDate: 2026-08-22` ist ein Frontmatter-Feld und bleibt im ISO-Format der Vorlage;
  die Regel „21. Juni 2026“ gilt für Fließtext, in dem hier kein Datum steht.

## 8 · Denglisch – **PASS**

- Verbotsliste `Spot`, `Location`, `Must-see`, `Hotspot`, `Guide`, `Feeling`, `Vibe`:
  **null Treffer** in allen drei Dateien.
- `Highlight`: **0 Vorkommen** (erlaubt wären höchstens 1).
- Die englische Vorlage sagt zweimal „guide“ (Restaurants & Cafés); beide Male steht im Deutschen
  eine Umschreibung: „finden Sie die Adressen der Stadt unter [Restaurants und Cafés]“.
- Zulässig und daher belassen: `Blog` (so auch `ui.ts` de → `'nav.blog': 'Blog'`,
  `'crumb.blog': 'Blog'`), `Google Maps` (Produktname, so auch `det.openMaps`), `Website` (Duden),
  `Café/Cafés` (Duden).

## 9 · Glossierung – **PASS**

Jeder fremde Begriff genau **einmal pro Beitrag**, jeweils beim ersten Vorkommen **im Fließtext**,
**nie in einer Überschrift**:

| Begriff | 24 h | 48 h | Ort |
|---|---|---|---|
| Qasr Ibrahim | `(dem Ibrahim-Palast)` 1 × | `(dem Ibrahim-Palast)` 1 × | erster Fließtextsatz des Abschnitts |
| Jabal al-Qarah | `(dem Qarah-Berg)` 1 × | `(dem Qarah-Berg)` 1 × | erster Fließtextsatz des Abschnitts |
| Souk / Qaisariyah-Souk | `, einem traditionellen Markt` 1 × | `, einem traditionellen Markt` 1 × | Apposition wie in der Quelle |
| Hidschra | `nach der Hidschra (n. H.)` 1 × | `nach der Hidschra (n. H.)` 1 × | ausgeschrieben + Abkürzung |
| Hasawi-Limette | — | `(lomi)` 1 × | Klammer steht so in der englischen Quelle |

- **Reihenfolge nach `gloss_regel`**: Die Form, die der Seitentitel trägt, führt; die andere steht in
  der Klammer. Maßgeblich sind hier die `title_de` der verlinkten Attraktionsseiten –
  `Qasr Ibrahim` und `Jabal al-Qarah` behalten beide die Umschrift, also führt die Umschrift und die
  Übersetzung steht in der Klammer. Umgesetzt.
- **Keine Glosse in einer Überschrift**: `## Morgen: Qasr Ibrahim und das Al-Koot-Viertel`,
  `## Mittag: Die Höhlen des Jabal al-Qarah und Dougha Al-Gharash`, `### Früher Morgen: Jabal
  al-Qarah und Dougha Al-Gharash` – alle ohne Klammerzusatz.
- **Keine Doppelglosse**: `Die Höhlen des Qarah-Bergs` in FAQ 2 des 24-h-Beitrags steht bewusst ohne
  erneute Erklärung.
- Keine Glosse nötig für `Al-Koot-Viertel`, `Amiriah-Schule`, `Jawatha-Moschee`,
  `Hasawi-Limettenfarm`: Der Gattungsname ist dort bereits eingedeutscht.
- `Bayt Al-Bay'ah` und `Dougha Al-Gharash` tragen ihre Erklärung als Apposition („dem Haus der
  Familie Al-Mulla“, „das Töpferhaus …“) – beide stehen so schon in der englischen Quelle und sind
  keine Zutat.

## 10 · Struktur – **PASS**

- **Frontmatter-Schlüssel byte-gleich** mit der englischen Vorlage und mit Stage 3, in Reihenfolge:
  `title` · `description` · `lang` · `key` · `slug` · `heroImage` · `topic` · `pubDate` · `tags` ·
  `faq` (mit `q`/`a`). Übersetzt wurden nur Werte.
- **Unverändert**, wie von der mechanischen Vorgabe verlangt: `key: 24-hours-itinerary` /
  `key: 48-hours-itinerary` · `slug: "one-day-in-al-ahsa"` / `slug: "48-hours-in-al-ahsa"` ·
  `heroImage: /img/qasr-ibrahim` / `/img/qaisariyah` · `pubDate: 2026-08-22` · `lang: de`.
- **Links: 12 (24 h) und 14 (48 h)**, Ziele zeichengleich mit Stage 3 – maschinell verglichen.
  Sprachpfad `/de/` nur dort, wo eine deutsche Seite existiert (`title_de` vorhanden):
  `qasr-ibrahim`, `jabal-al-qarah`, `jawatha-mosque`, `ameeriah`, `al-uqair` sowie der
  Querverweis `/de/blog/48-hours-in-al-ahsa/`; alle übrigen auf `/en/`. Jeder Pfad endet mit dem
  Schrägstrich, den `tools/check-links.mjs` verlangt.
- **Überschriftenzeilen zeichengleich** mit Stage 3 (Ebenen `##`/`###` unverändert),
  **Fettungen unverändert** (24 h: 4, 48 h: 7) und an denselben Stellen wie im englischen Original.
- **Zeilenzahl unverändert** (24 h: 47, 48 h: 60), Dateiende mit Zeilenumbruch, LF, keine
  Leerzeichen am Zeilenende.
- **Alt-Texte**: keine Bilder in diesen Dateien – nichts zu prüfen. Die **Meta-Beschreibung**
  (`description`) unterliegt denselben Regeln und erfüllt sie: U+2013 mit Leerzeichen, kein
  Denglisch, Termbase-Namen, lateinische Ziffern.
- **Unsichtbare Zeichen**: null U+00A0, null schmale Leerzeichen, null U+2014 – geprüft nach
  Codepoint, nicht nach Augenschein (`einheiten`-Regel: ein unsichtbares U+00A0 lässt
  `check-consistency` stumm scheitern).

---

## Was Stage 5 an Stage 6/7 weitergibt

1. **`ui-strings.stage5.json` ist unverändert** – die fünf Strings gingen ohne Korrektur durch alle
   zehn Punkte.
2. **`24-hours-itinerary.stage5.md` ist unverändert gegenüber Stage 4** – die einzige
   Lektoratskorrektur betraf den 48-h-Text.
3. Die drei Regeln, deren Anwendungsfall in diesen Texten **nicht vorkommt** (Zahlenbereiche,
   Währung, Fließtextdatum), sind als „nicht anwendbar“ vermerkt, nicht als bestanden getarnt.
