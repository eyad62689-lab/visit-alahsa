# Stage 1 – Notizen zur EN→DE-Übersetzung der beiden Blogbeiträge

Quellen: `src/content/blog/24-hours-en.md` und `48-hours-en.md` (Übersetzungsvorlage),
`24-hours-ar.md` und `48-hours-ar.md` (Faktenautorität).
Keine Abweichung wurde stillschweigend „geglättet“; jede ist unten benannt.

## A. Abweichungen EN ↔ AR

### A1 · 24 h – `description`: Auslassung im Englischen
- AR: „… قصر إبراهيم **وحي الكوت** صباحاً … **بمحطات مرتّبة على إيقاع النهار**.“
- EN: „… Qasr Ibrahim in the morning, the caves of Jabal Al-Qarah at midday, and Qaisariyah Souq in the evening.“
- Das Englische lässt „und das Al-Koot-Viertel“ sowie „nach dem Rhythmus des Tages geordnet“ weg.
  Kein Widerspruch, nur ein kleinerer Umfang.
- **Entscheidung:** Die deutsche Fassung folgt dem englischen Umfang (Stage 1 erfindet keine
  Zusammenführung). Beide ausgelassenen Angaben stehen ohnehin im deutschen Fließtext.
  Stage 4 möge entscheiden, ob die Meta-Beschreibung an die arabische angeglichen wird.

### A2 · 24 h – FAQ 2: „by night“ vs. „المساء“ (Abend) → **Arabisch entschieden**
- AR: „الترتيب الأنسب أن يكون الجبل **في النهار** والسوق **في المساء**“ = Berg am Tag, Souk **am Abend**.
- EN: „the mountain by day and the souq **by night**“.
- **Entscheidung:** Arabisch gewinnt → deutsch „der Berg am Tag und der Souk **am Abend**“.
  Bestätigt wird das vom Folgesatz derselben Antwort in beiden Sprachen
  („finds its pulse **in the evening**“ / „الفترة المسائية“) und vom Abschnitt „Abend“ im Fließtext.
  „nachts“ wäre zudem sachlich falsch, weil der Souk am Abend öffnet.

### A3 · 24 h – Abschnitt „Abend“: Auslassung im Englischen
- AR: „… وهي خاتمة يوم مكثف **قبل مغادرتك**.“ · EN: „… a fitting end to a concentrated day.“
- Das Englische lässt „vor Ihrer Abreise“ weg. Kein Faktenkonflikt.
- **Entscheidung:** deutsche Fassung folgt dem Englischen.

### A4 · 48 h – `description`: Auslassung im Englischen
- AR ergänzt „**وروابط لصفحة كل معلم**“ (und Links zur Seite jeder Sehenswürdigkeit); EN nicht.
- **Entscheidung:** deutsche Fassung folgt dem englischen Umfang.

### A5 · 48 h – Jawatha-Moschee: „sanctity“ vs. „خصوصية المكان“ → **Arabisch entschieden**
- AR: „راعِ أوقات الصلاة و**خصوصية المكان**“ = der besondere Charakter / die Eigenart des Ortes.
- EN: „Be mindful of prayer times and **the sanctity** of the place.“
- „Heiligkeit“ wäre stärker als die arabische Autorität.
- **Entscheidung:** deutsch „Achten Sie auf die Gebetszeiten und **den besonderen Charakter des Ortes**.“

### A6 · 48 h – Sonnenuntergang: „against the water“ vs. „على زرقة الماء“
- AR: „تتوهّج الرمال البيضاء **على زرقة الماء**“ (gegen das **Blau** des Wassers); EN nur „against the water“.
- Kein Faktenkonflikt, nur ein weggefallenes Attribut.
- **Entscheidung:** deutsch „leuchtet der weiße Sand **vor dem Wasser**“ (englischer Umfang).
  Das Blau des Golfs steht bereits im vorhergehenden Satz; eine Wiederholung wäre Stilverlust.

## B. Faktensperren (nichts erfunden)

### B1 · 1203 AH – **keine gregorianische Umrechnung ergänzt**
`_meta.style_rules.hidschra` verlangt beim ersten Vorkommen die ausgeschriebene Form.
Umgesetzt als „im Jahr **1203 nach der Hidschra (n. H.)**“ – **ohne** Klammerjahr „n. Chr.“,
weil **weder** die englische **noch** die arabische Quelle ein gregorianisches Jahr nennt.
Eine Umrechnung wäre eine erfundene Tatsache und ist unterblieben.
(Falls ein späterer Stage das Jahr ergänzen will: nur mit Beleg aus einer Landmark-Seite.)

### B2 · Keine Uhrzeiten, Preise, Entfernungen oder Dauern
Beide Beiträge nennen keine – die deutsche Fassung ebenfalls nicht.
Der Satz „nicht festen Uhrzeiten … je nach Saison“ ist übersetzt, nicht ergänzt.

### B3 · Größenanspruch der Oase
`_meta.style_rules.oasen_anspruch`: **„die größte Oase der Welt“** ohne „Palmen-“ – so gesetzt
(24 h Absatz 1, 48 h Absatz 1). „größte Palmenoase“ kommt nicht vor.

## C. Bewusste Übersetzungsentscheidungen (für Stage 4/5/7)

### C1 · Tageszeit-Zwischenüberschriften
Beide Beiträge nutzen **eine** Zuordnung, damit sie nebeneinander gelesen konsistent sind:

| EN | DE |
|---|---|
| Morning | Morgen |
| Mid-morning (الضحى) | Vormittag |
| Midday | Mittag |
| Afternoon | Nachmittag |
| Evening | Abend |
| Early Morning | Früher Morgen |
| Sunset | Sonnenuntergang |

Der Termbase-Eintrag „daypart badges (Morning / Midday / Sunset) → der Vormittag · der Mittag ·
der Sonnenuntergang“ ist ausdrücklich auf die **Badges der Attraktionskarten** bezogen. Würde man
„Morning = Vormittag“ auch in den Blogüberschriften erzwingen, kollidierte das im 48-h-Beitrag mit
dem dort **eigenständigen** „Mid-morning“ (الضحى) – zwei Überschriften hießen gleich.
Deshalb hier die siebenteilige, überschneidungsfreie Reihe oben.

### C2 · Glossen (`_meta.style_rules.gloss_regel`) – je einmal pro Beitrag, nie in der Überschrift
- `Qasr Ibrahim` → beim ersten Vorkommen im Fließtext als Apposition „**, dem Ibrahim-Palast**“.
- `Jabal al-Qarah` → beim ersten Vorkommen als Apposition „**, dem Qarah-Berg**“.
- Beide Überschriften behalten die Umschrift (`titel_regel`: `title_en` ist „Qasr Ibrahim“ bzw.
  „Jabal Al-Qarah“, also führt die Umschrift, die Übersetzung steht in der Apposition).
- `Qaisariyah-Souk`, `Jawatha-Moschee`, `Hasawi-Limettenfarm`, `Amiriah-Schule`, `Al-Koot-Viertel`
  brauchen keine Glosse: Der Gattungsname ist bereits eingedeutscht (Durchkopplung).
- „(lomi)“ steht so in der englischen Quelle und ist durch den Termbase-Eintrag
  „lime (lomi / Hasawi lime) → die Hasawi-Limette“ gedeckt.

### C3 · Links – Sprachpfad nur, wo eine deutsche Seite existiert
- Auf `/de/` umgestellt: `qasr-ibrahim`, `jabal-al-qarah`, `jawatha-mosque`, `ameeriah`, `al-uqair`
  sowie der Querverweis `/de/blog/48-hours-in-al-ahsa/`.
- Auf `/en/` belassen (noch keine deutsche Seite): `baiah`, `duqat-algharash`, `qaisariyah`,
  `lemon-farm`, `restaurants-cafes`, `souqs-parks-farms`, `plan`, `map`, `plan-your-trip`.
- Alle Linktexte sind übersetzt; Struktur, Überschriftenebenen, Fettungen und Listenpunkte
  entsprechen eins zu eins der englischen Vorlage.

### C4 · Denglisch vermieden
- „guide“ (Restaurants & Cafés) → „**finden Sie … gesammelt unter [Restaurants und Cafés]**“
  statt „Guide“ (`denglisch_verboten`).
- „attractions map“ → „**Karte der Sehenswürdigkeiten**“ (die `map.*`-Schlüssel sind im deutschen
  Wörterbuch noch bewusst aufgeschoben, deshalb wörtlich aus dem Linktext übersetzt).
- „weekly souqs“ → „**wöchentliche Souks**“ (Termbase „souq (generic) → der Souk“), nicht „Wochenmärkte“.
- Kein „Spot“, „Location“, „Must-see“, „Hotspot“, „Highlight“, „Feeling“, „Vibe“.

### C5 · Wiederverwendung aus `memory/tm.json` (12 Stellen)
Formulierungen aus freigegebenen TM-Paaren wurden übernommen, damit Blog, Startseite und
Attraktionsseiten identisch klingen:
`vereint Moschee, Kaserne und Turm hinter einer einzigen Mauer` · `Gassen, die nach Parfüm und
Kupfer duften, dazu Umhänge, von einheimischen Händen bestickt` · `im Sommer kühl, im Winter warm` ·
`von der Zeit gemeißelt` · `im Herzen der Oase` · `wenn das Licht weich(er) … und die Hitze …` ·
`Lehmmauern, die eine der ältesten Geschichten des Islams tragen` · `wo der Wüstensand auf das Blau
des Golfs trifft` · `die größte Oase der Welt` · `zwischen mehr als 2,5 Millionen Dattelpalmen …
pulsiert das Leben` · `zuerst ihr historisches Herz, dann ihr Wasser und ihr Grün` (als
„Das historische Herz von Hofuf“ / „Wasser, Grün und Küste“) · `Öffnungszeiten und Eintritt können
sich je nach Saison und an Feiertagen ändern`.

### C6 · UI-Strings
- `blog.published` / `blog.updated`: Deutsch braucht vor einem Datum die Präposition, daher
  „Veröffentlicht **am**“ / „Aktualisiert **am**“ (so auch ar „نُشر في“ und zh „发布于“).
- `blog.back`: „Alle Artikel →“ – Pfeil erhalten, Muster wie `det.allSights` („Alle Sehenswürdigkeiten →“).
- `blog.faq`: „Häufige Fragen“ (kurz, wie ar/zh; „Häufig gestellte Fragen“ wäre für die Kopfzeile zu lang).
- `plan.printNote`: Gedankenstrich U+2013 mit Leerzeichen; Wortwahl „Öffnungszeiten und Eintritt“
  aus dem Termbase-Eintrag „practical labels“ und aus `detail.reviewNote` im TM.

## D. Termbase – 9 Vorschläge, keine Datei geändert
`termbase.json` wurde **nicht** angefasst. Die Vorschläge stehen in
`de-translation/output/blog/termbase-additions.stage1.json`, jeweils mit Genus und Quelle:
`das Al-Koot-Viertel` · `Bayt Al-Bay'ah (das)` · `Al-Mulla (die Familie)` · `Dougha Al-Gharash (das)` ·
`Al-Gharash (die Familie)` · `die Amiriah-Schule` · `Al-Kilabiyah (—)` · `Al-Qarah (—)` · `Al-Uqair (—)`.

**Konflikt zum Klären (Stage 4):** Der bestehende Eintrag lautet „Uqair → Uqair“, während
`_meta.style_rules.titel_regel` und `ui.ts` (de, `home.route.s6.n`) „**Al-Uqair**“ führen. Beide
Blogtexte nutzen „Al-Uqair“; der Eintrag sollte darauf vereinheitlicht werden.
