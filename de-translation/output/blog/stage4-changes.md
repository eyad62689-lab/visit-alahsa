# Stage 4 – Benchmarker + Faktensperre

Eingang: `*.stage3.md` / `ui-strings.stage3.json` · Ausgang: `*.stage4.md` / `ui-strings.stage4.json`
Abgeglichen gegen `src/content/blog/24-hours-en.md` und `48-hours-en.md` (Übersetzungsvorlage) sowie
`24-hours-ar.md` und `48-hours-ar.md` (Faktenautorität).

**Prüfgrundlage statt Websuche.** In dieser Umgebung ist keine Websuche verfügbar, die
Referenzliste des Rollenprompts (unesco.de, visitsaudi.com/de, de.wikipedia.org) war also nicht
abrufbar. Jeder Eigenname wurde stattdessen gegen drei Quellen **im Repository** geprüft, die
selbst schon durch diese Pipeline gegangen sind: die `termbase.json`, die freigegebenen
`*_de`-Felder der Attraktionsdateien (`title_de`, `summary_de`, `area_de`, `body_de`,
`bestTime_de`) und den de-Block in `src/i18n/ui.ts`. Wo ein Name in keinem dieser drei belegt war,
wurde die Schreibung der **englischen** Website-Fassung übernommen, wie
`_meta.naming_policy.default` es vorschreibt. Kein Name steht unbelegt im Text; keiner wurde neu
erfunden. Das ist eine engere Prüfbasis als der Rollenprompt vorsieht – der Judge möge das
vermerken.

---

## a) Geänderte Sätze (vorher → nachher)

### 24 h – 7 Sätze

**1 · FAQ 1 – „altes Stadtviertel“ trägt eine Angabe, die die Quelle nicht macht**
- vorher: „… am Morgen eine historische Festung und **ein altes Stadtviertel**, …“
- nachher: „… am Morgen eine historische Festung und **ein historisches Viertel**, …“
- Grund: EN „a historic fortress and **heritage district**“, AR „حصن تاريخي و**حي تراثي**“. „alt“ ist
  eine eigene Altersaussage, „Stadt-“ ein Zusatz. Der Fließtext desselben Beitrags sagt bereits
  „eine Festung und ein historisches Viertel“ – jetzt sind FAQ und Text deckungsgleich.

**2 · FAQ 2 – „den Berg nehmen“ ist kein Deutsch**
- vorher: „Ja. **Am besten nehmen Sie den Berg tagsüber und den Souk abends**: Die Höhlen … mildern
  die Mittagshitze, **und am Abend öffnet der Qaisariyah-Souk** seine Geschäfte …“
- nachher: „Ja, und **am besten besuchen Sie den Berg am Tag und den Souk am Abend**: Die Höhlen …
  mildern die Mittagshitze, **und der Qaisariyah-Souk öffnet dann** seine Geschäfte …“
- Grund: „einen Berg nehmen“ gibt es im Deutschen nur beim Bergsteigen. „am Tag / am Abend“ hält
  außerdem die von Stage 1 (A2) aus dem Arabischen entschiedene Tageszeit fest („في النهار … في
  المساء“), und das rückverweisende „dann“ ersetzt die zweite Nennung von „am Abend“ im selben Satz.

**3 · Absatz 1 – Eigenname doppelt gesetzt**
- vorher: „Diese Route verdichtet das Herz der **Al-Ahsa-Oase** – der größten Oase der Welt …“
- nachher: „Diese Route verdichtet das Herz der **Oase** – der größten Oase der Welt …“
- Grund: EN „the heart of **the oasis**“. Der vorangehende Satz nennt den Ort schon („Nur ein Tag in
  Al-Ahsa?“); die Wiederholung war eine Zutat von Stage 2. Die von C15 verlangte Formel
  „größten Oase der Welt“ bleibt unangetastet.

**4 · Morgen – Kasus der Klammer-Apposition**
- vorher: „… bei [Qasr Ibrahim](…) **(der Ibrahim-Palast)**: …“
- nachher: „… bei [Qasr Ibrahim](…) **(dem Ibrahim-Palast)**: …“
- Grund: Die Apposition steht im Kasus ihres Bezugsworts, auch in Klammern; „bei“ regiert den Dativ.
  `_meta.style_rules.gloss_regel` schreibt die **Reihenfolge** vor (Titelform führt, die andere in
  der Klammer) – ihr Beispielsatz steht im Nominativ, sagt über den Kasus also nichts. Reihenfolge
  und Klammer bleiben, nur die Endung folgt der Grammatik. Ebenso in Satz 5 und im 48-h-Text.

**5 · Mittag – Kasus + bestimmter Artikel der Quelle**
- vorher: „… zum [Jabal al-Qarah](…) **(der Qarah-Berg), einem** geologischen Wunder im Herzen der Oase.“
- nachher: „… zum [Jabal al-Qarah](…) **(dem Qarah-Berg), dem** geologischen Wunder im Herzen der Oase.“
- Grund: Kasus wie oben; und EN hat den bestimmten Artikel („**the** geological wonder at the heart
  of the oasis“), das unbestimmte „einem“ schwächte die Aussage.

**6 · Mittag – Partizip und Nominalphrase waren koordiniert**
- vorher: „… liegt [Dougha Al-Gharash](…) – das Töpferhaus der Familie Al-Gharash, **über
  Generationen weitergegeben und eine der bekanntesten Stätten** dieses Handwerks im Königreich.“
- nachher: „… liegt [Dougha Al-Gharash](…) – das Töpferhaus, **das die Familie Al-Gharash über
  Generationen weitergegeben hat und das zu den bekanntesten Stätten** dieses Handwerks im
  Königreich **zählt**.“
- Grund: „weitergegeben **und** eine der bekanntesten Stätten“ verbindet ein Partizip mit einer
  Nominalphrase – das ist im Deutschen ungrammatisch, nicht bloß hart. Beide Angaben bleiben
  vollständig erhalten, jetzt in zwei Relativsätzen (genau die Auflösung, die der Rollenprompt für
  nachgestellte Partizipien verlangt). Parallel im 48-h-Text (dort zusätzlich mit Kasusfehler).

**7 · Mittagspause → Mittagessen**
- vorher: „**Für die Mittagspause** finden Sie die Adressen der Stadt unter [Restaurants und Cafés](…).“
- nachher: „**Zum Mittagessen** finden Sie die Adressen der Stadt unter [Restaurants und Cafés](…).“
- Grund: EN „**For lunch**“, AR „**للغداء**“ – die Mahlzeit, nicht die Arbeitspause. Stellt zugleich
  die Parallele zum 48-h-Text her, der „Zum Abendessen“ sagt.

### 48 h – 8 Sätze

**1 · FAQ 1 – verrutschtes Subjekt**
- vorher: „Wer die Museen, Parks und wöchentlichen Souks ergänzen möchte, **gibt der Reise mit drei
  Tagen mehr Luft**.“
- nachher: „Wer die Museen, Parks und wöchentlichen Souks ergänzen möchte, **plant besser drei Tage
  ein – das gibt der Reise mehr Luft**.“
- Grund: Im „Wer …“-Satz gibt nicht der Reisende der Reise Luft, sondern der dritte Tag; das
  englische „three days give the trip more room to breathe“ hatte im Nebensatz sein Subjekt
  verloren. Keine Faktenänderung: drei Tage bleiben drei Tage.

**2 · FAQ 2 – siehe Faktensperre (b-1); zusätzlich „innerhalb von Hofuf“**
- vorher: „**Am praktischsten mit dem Auto**: Manche Stationen liegen **innerhalb von** Hofuf, …“
- nachher: „**Das Auto ist die praktische Wahl**: Manche Stationen liegen **in Hofuf selbst**, …“
- Grund: „innerhalb von“ ist die Kalkierung von „inside“ und meint im Deutschen die Grenze eines
  abgeschlossenen Bereichs. Die neue Formulierung ist außerdem wortgleich mit dem 24-h-Text
  („**Ein Auto** ist zwischen den Stationen die praktische Wahl“), sodass beide Beiträge dieselbe
  Auskunft in denselben Worten geben.

**3 · Morgen – Kasus der Klammer-Apposition:** „(der Ibrahim-Palast)“ → „**(dem Ibrahim-Palast)**“.

**4 · Früher Morgen – Kasus + bestimmter Artikel:** „(der Qarah-Berg), **einem** geologischen Wunder“
→ „**(dem Qarah-Berg), dem** geologischen Wunder“.

**5 · Früher Morgen – Partizip/Kasus**
- vorher: „… machen Sie Halt bei [Dougha Al-Gharash](…), **dem** traditionellen Töpferhaus der
  Familie Al-Gharash – über Generationen weitergegeben und **eine** der bekanntesten Stätten …“
- nachher: „… machen Sie Halt bei [Dougha Al-Gharash](…), **dem traditionellen Töpferhaus, das die
  Familie Al-Gharash über Generationen weitergegeben hat und das zu den bekanntesten Stätten**
  dieses Handwerks im Königreich **zählt**.“
- Grund: wie 24 h Satz 6, hier zusätzlich mit Kasusbruch („dem Töpferhaus … **eine** der Stätten“).

**6 · Mittag – Verb der freigegebenen Fassung**
- vorher: „**Nehmen Sie Rücksicht auf** die Gebetszeiten und die Heiligkeit des Ortes.“
- nachher: „**Beachten Sie** die Gebetszeiten und die Heiligkeit des Ortes.“
- Grund: Auf eine Heiligkeit nimmt man im Deutschen keine Rücksicht. Die bereits freigegebene
  deutsche Fassung derselben Aussage steht in `src/content/attractions/jawatha-mosque.md`:
  `bestTime_de: „Tagsüber, **unter Beachtung** der Gebetszeiten und der Heiligkeit des Ortes.“` –
  dasselbe Verb, jetzt auch im Blog.

**7 · Nachmittag – eine Webseite wird nicht durchblättert**
- vorher: „Außerhalb der Saison **blättern Sie durch die Seite** [Souks, Parks und Farmen](…) …“
- nachher: „Außerhalb der Saison **stöbern Sie auf der Seite** [Souks, Parks und Farmen](…) …“
- Grund: EN „browse“; „durchblättern“ setzt Blätter voraus.

**8 · Praktische Hinweise – satzinitiales „Sie“ las sich als Anrede**
- vorher: „- **Öffnungszeiten und Eintritt**: **Sie** ändern sich je nach Saison und an Feiertagen – …“
- nachher: „- **Öffnungszeiten und Eintritt**: **Beide** ändern sich je nach Saison und an Feiertagen – …“
- Grund: Am Satzanfang ist „Sie“ (Pronomen) von „Sie“ (Anrede) nicht zu unterscheiden – in einem
  Text, der durchgehend siezt, liest der erste Blick die Anrede und stolpert. „Beide“ ist eindeutig
  und übersetzt das englische „they“ (= hours and fees) genau.

### UI-Strings – 0 Sätze
`ui-strings.stage4.json` ist byte-gleich mit Stage 3. Alle fünf Strings wurden gegen ihre
englischen Originale in `src/i18n/ui.ts` geprüft (`'Published'`, `'Updated'`, `'All articles →'`,
`'Frequently asked questions'`, `'Times and fees can change — confirm via official channels before
visiting.'`): keine Zutat, kein Denglisch, Gedankenstrich U+2013 mit Leerzeichen, „Öffnungszeiten
und Eintritt“ wie im Termbase-Eintrag „practical labels“. Das von Stage 2 ergänzte Objekt in
„bestätigen Sie **beides**“ ist keine Faktenzutat, sondern die im Deutschen nötige Ergänzung zum
transitiven Verb; sein Bezug („Öffnungszeiten und Eintritt“) steht im selben Satz.

---

## b) Von der Faktensperre entfernt

**Ergebnis vorweg: Stage 3 hat keine Tatsache, keine Zahl, keinen Tipp und keinen Ort erfunden.**
Die Diffs Stage 2 → Stage 3 sind ausschließlich Umstellungen und Wortwahl. Entfernt wurde genau
ein Element, und es stammt aus Stage 2:

**b-1 · Superlativ „am praktischsten“ (48 h, FAQ 2) – entfernt**
- Fundstelle: „**Am praktischsten** mit dem Auto: …“
- Herkunft: **Stage 2** (Stage 1 hatte „Ein Auto ist die praktische Art, sich zwischen diesen
  Stationen zu bewegen“ – quellentreu; Stage 3 hat den Superlativ unverändert übernommen).
- Quelle sagt: EN „**A car is the practical way** to move between these stops“; AR „**السيارة هي
  الوسيلة العملية** للتنقل بين محطات هذا الجدول“. Beide setzen den Positiv mit bestimmtem Artikel.
- Warum das zählt: „am praktischsten“ behauptet einen Vergleich mit **allen** anderen
  Fortbewegungsarten in Al-Ahsa – genau die Art absoluter Aussage ohne Beleg, die
  `_meta.style_rules.ton` und die Projektregel „لا صفات مطلقة بلا سند“ verbieten. Ersetzt durch
  „Das Auto ist die praktische Wahl“.

**Geprüft und nicht beanstandet** (jede Angabe steht in EN und/oder AR):
`2018` · `UNESCO-Welterbe` · `die größte Oase der Welt` · `mehr als 2,5 Millionen Dattelpalmen` ·
`mehr als zwei Jahrhunderte` (Souk) · `1203 nach der Hidschra (n. H.)` · `1937` (Amiriah-Schule) ·
`der älteste Hafen der Region` · `eine der ältesten Moscheen des Islams` · `der erste Ort, an dem
nach Medina ein Freitagsgebet stattfand` · `eine der bekanntesten Stätten dieses Handwerks im
Königreich` · `über Generationen weitergegeben` · `im Sommer kühl, im Winter warm` · `ihre
bedeutendsten Sehenswürdigkeiten` · `drei Tage` · alle „beste Zeit / beste Stunde“-Aussagen.

**Nicht ergänzt, obwohl belegbar** (die Sperre löscht, sie fügt nicht hinzu – für den Judge):
- *Gregorianisches Jahr zu 1203 n. H.* Weder der englische noch der arabische Blogtext nennt eines,
  also steht keines im Deutschen (Stage-1-Sperre B1, hier bestätigt). Belegt **wäre** es:
  `src/content/attractions/baiah.md` body_en sagt „built in 1203 AH / 1788 CE“. Wenn der Judge das
  Klammerjahr will, ist die Quelle vorhanden – es wäre aber eine Ergänzung gegenüber der Vorlage
  und müsste in **allen vier** Sprachfassungen des Beitrags fallen, nicht nur im Deutschen.
- *„vor dem Blau des Wassers“* (48 h, Sonnenuntergang). Der deutsche Text sagt „leuchtet der weiße
  Sand **vor dem Wasser**“ nach englischem Umfang („against the water“); AR sagt „على **زرقة** الماء“,
  und das freigegebene `bestTime_de` in `al-uqair.md` sagt „wenn der weiße Sand **vor dem Blau des
  Wassers** leuchtet“. Stage 1 (A6) hatte sich gegen die Wiederholung entschieden, weil „das Blau
  des Golfs“ schon im Satz davor steht. Bleibt bei Stage 1; die Alternative ist belegt.
- *„und das Al-Koot-Viertel“ in der 24-h-`description`* (AR hat es, EN nicht – Stage 1 A1). Bleibt
  beim englischen Umfang; beide Angaben stehen ohnehin im deutschen Fließtext.

**Zusätzlich geprüft:** Das Projektverbot aus dem Termbase-Eintrag „Uqair“ – *قصر الملك عبدالعزيز
بالعقير محذوف نهائياً من المشروع* – ist eingehalten: Der Palast kommt in keinem der beiden deutschen
Texte vor.

---

## c) Termbase-Entscheidungen

Die neun Vorschläge aus `termbase-additions.stage1.json` sind einzeln nachgeprüft und in
`termbase-additions.stage4.json` mit belegter Quelle und Genus festgeschrieben. `termbase.json`
selbst wurde **nicht** angefasst.

| # | en | de | artikel | Status nach Prüfung |
|---|---|---|---|---|
| 1 | Al-Koot District | das Al-Koot-Viertel | das | bestätigt (abgeleitet: `baiah.md` `area_en` + Durchkopplung + Duden „das Viertel“) |
| 2 | Bayt Al-Bay'ah | Bayt Al-Bay'ah | das | bestätigt (`baiah.md` `title_en`; `titel_regel` nennt den Namen) |
| 3 | Al-Mulla (family) | Al-Mulla · die Familie Al-Mulla | die (Familie) | bestätigt (`baiah.md`; Schreibung in freigegebenem `body_de` von `jawatha-mosque.md`) |
| 4 | Dougha Al-Gharash | Dougha Al-Gharash | das | bestätigt (`duqat-algharash.md`; kein Pleonasmus) |
| 5 | Al-Gharash (family) | Al-Gharash · die Familie Al-Gharash | die (Familie) | bestätigt (`duqat-algharash.md` `summary_en`/`body_en`) |
| 6 | Amiriah School | die Amiriah-Schule | die | **hochgestuft: bereits freigegebenes `title_de`** in `ameeriah.md` |
| 7 | Al-Kilabiyah (village) | Al-Kilabiyah | — | **hochgestuft: bereits freigegebenes `area_de`** in `jawatha-mosque.md` |
| 8 | Al-Qarah (village) | Al-Qarah | — | bestätigt (`duqat-algharash.md` `area_en`; `districts.ts` `qarah`) |
| 9 | Al-Uqair | Al-Uqair | — | bestätigt **und** als Ersetzung beantragt – siehe unten |

Zwei der neun mussten gar nicht mehr abgeleitet werden: „Amiriah-Schule“ und „Dorf Al-Kilabiyah“
stehen bereits als freigegebenes Deutsch in den Attraktionsdateien. Das ist die stärkste
verfügbare Quelle und wurde im Eintrag entsprechend vermerkt.

### Der Konflikt „Uqair“ vs. „Al-Uqair“ – Entscheidung

**Der Blog schreibt `Al-Uqair`, an jeder Stelle. Der bestehende Eintrag `Uqair → Uqair` soll durch
`Al-Uqair → Al-Uqair` ersetzt werden** (nicht ergänzt: zwei Zeilen für denselben Ort wären genau
das Auseinanderlaufen, das der Eintrag verhindern soll).

Begründung, vier unabhängige Belege:
1. `src/content/attractions/al-uqair.md` trägt `title_en: Al-Uqair` **und** `title_de: "Al-Uqair"` –
   die deutsche Form ist bereits durch diese Pipeline freigegeben.
2. `src/i18n/ui.ts`, de-Block: `'home.route.s6.n': 'Al-Uqair'`.
3. `_meta.style_rules.titel_regel` nennt „Al-Uqair“ **wörtlich** als Beispiel für einen Titel, der
   die Umschrift behält, und verlangt den großen Artikel am Namensanfang.
4. `_meta.naming_policy.default` macht die Umschrift der englischen Website-Fassung maßgeblich, und
   die führt den Ort durchgängig mit Präfix (`al-uqair.md`, `uqair-castle.md` → „Al-Uqair Castle“,
   `uqair-mosque.md` → „Al-Uqair Port Mosque“, beide Blogvorlagen).

Der alte Eintrag stand damit gegen den eigenen `_meta`-Teil derselben Datei. Seine Beispielsätze
werden neu gefasst („der historische Hafen **von Al-Uqair**“, „die Festung **von Al-Uqair**“).

**Zwei Dinge, die die Ersetzung ausdrücklich mitnehmen muss:**
- Das bloße `Uqair` bleibt richtig als gebundenes Element des Vertragsnamens **„das
  Uqair-Protokoll“** (EN „the Uqair Protocol“, `uqair-castle.md`, 1341 n. H. / 1922 n. Chr.) und in
  URLs (`en.wikipedia.org/wiki/Uqair` in `al-uqair.md` `sameAs`). Ohne diese Ausnahme im Eintrag
  würde eine spätere Stage den Vertragsnamen „korrigieren“.
- Das Verbot aus der alten Notiz – *قصر الملك عبدالعزيز بالعقير محذوف نهائياً من المشروع* – ist im
  neuen Eintrag wörtlich übernommen. Es darf bei der Ersetzung nicht verloren gehen.

Einzige Gegenstelle im ganzen Repository: `src/content/dining/alsayed.md` `body_en` sagt „the
historic **Uqair** port“, überall sonst steht „Al-Uqair“. Das ist eine Inkonsistenz **der englischen
Quelle**, kein Beleg für die alte Form – sie sollte dort getrennt gemeldet und nicht in die
deutsche Fassung übernommen werden.

### Weitere Prüfungen ohne Änderungsbedarf

- **Exonyme.** `der Golf` / `die Golfküste` / `das Blau des Golfs` – kein „Persischer Golf“, kein
  „Arabischer Golf“, in keiner der beiden Fassungen. `Medina` (nicht „Madinah“), `Hofuf`,
  `Königreich`. `Riad`, `Dschidda`, `Mekka`, `Saudi-Arabien`, `Arabische Halbinsel` und
  `Ostprovinz` kommen in beiden Texten nicht vor, es war also nichts einzudeutschen.
- **Durchkopplung.** `Al-Koot-Viertel` · `Qaisariyah-Souk` · `Jawatha-Moschee` · `Amiriah-Schule` ·
  `Hasawi-Limettenfarm` · `Hasawi-Limette` · `Qarah-Berg` · `Ibrahim-Palast` · `UNESCO-Welterbe` ·
  `24-Stunden-Route` · `Zwei-Tage-Route` – alle gekoppelt. Kein Pleonasmus: kein
  „Jabal-al-Qarah-Berg“, kein „Souk-Markt“. Bewusst **getrennt**, weil der Gattungsname nicht zum
  Namen gehört: „Dorf Al-Qarah“, „Dorf Al-Kilabiyah“ (so auch im freigegebenen `area_de`).
- **Groß-/Kleinschreibung des Artikels im Namen.** Berg `Jabal al-Qarah` (klein in der Mitte, wie
  `title_de`), Dorf `Al-Qarah` (groß am Anfang) – beide stehen im selben Absatz und sind beide
  richtig.
- **Struktur.** Zeilenzahl, Frontmatter-Schlüssel, `key`/`slug`/`heroImage`/`pubDate`/`lang: de`,
  Überschriften, Fettungen (24 h: 4, 48 h: 7) und alle Links unverändert; 12 Links im 24-h-, 14 im
  48-h-Text mit identischen Zielen wie in Stage 3. Null U+2014, null U+00A0, null „du“.
- **C15/C16** (`tools/check-consistency.mjs`): Beide Texte tragen „der größten Oase der Welt“ (die
  von C15 erwartete Formel) und keine „Palmenoase“. „Hochsommer … Nacht“ (C16-Verstoß) kommt nicht
  vor; die Kälte/Wärme-Gegenüberstellung ist in beiden Texten saisonal, nicht tageszeitlich.
