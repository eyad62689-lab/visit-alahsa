# دفعة `de-fruits-3` — صفحة «ثمار الأحساء الموسمية» الألمانية `/de/fruits/` (ج3، الدفعة 3 من 3)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-fruits/bN/`)

## النطاق — 34 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| فواكه الصيف (26) | `g2.title` · ست بطاقات `g2.f0…f5` × `name` · `season` · `pre` · `alt` — البطيخ الأصفر · التين · البمبر (+`g2.f2.post`) · العنب · الرمان السواري (**بلا `season`**) · البابايا |
| فواكه الربيع والشتاء (9) | `g3.title` · بطاقتان `g3.f0…f1` × `name` · `season` · `pre` · `alt` — التوت · الكنار (النبق) |

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + المداخل ذات الصلة + الذاكرة + الجيران المنشورون، **و`approved_earlier_batches_of_this_page_do_not_edit`: نص الدفعتين 1 و2 المعتمد** — لا يُحرَّر، واتّسق معه). المعجم الكامل `REPO/de-translation/glossary/termbase.json` — ابحث فيه، لا تقرأه كاملاً.

## قرارات الدفعتين 1 و2 الملزمة (مقتبسة من حاكميهما)
**من حاكم الدفعة 1 (95/100، APPROVE) — حرفاً:**

- Gloss-Sperre: 'Rutab', 'Kanar' und 'Hasawi-Limette'/'Lomi' sind in ui.heroSum EIN letztes Mal geglosst — auf den Fruchtkarten NUR die nackten Namen 'Rutab', 'Kanar', 'Hasawi-Limette' (Lomi in Klammer erlaubt wie in lemon-farm.md), keine erneute Klammererklärung (Guard: pack.batch !== 'de-fruits-1' schlägt sonst fehl). 
- Rutab/Kanar bleiben OHNE eigenen Artikel (termbase-Status 'pending') — auf den Karten keinen Artikel für diese beiden Namen erfinden, bis ein Beleg nachgetragen wird; Konstruktionen nach dem Muster 'namens Rutab'/'namens Kanar' oder artikellose Titelverwendung nutzen. 
- Jahreszeiten-Wortwahl fix: Winter · Frühling · Sommer · Herbst (Filter, ohne Artikel); 'Jahreszeit' = Kalenderjahreszeit, 'Saison' = Erntefenster — nicht mischen. 
- Badge-Kompositionsmuster fix: '…früchte' geschlossen, ohne Artikel — Sommerfrüchte, Frühlingsfrüchte, Winterfrüchte, Zitrusfrüchte, Datteln (kein '-frucht' Singular). Kein 'Herbstfrüchte'-Badge vorgesehen (source_defect #16 — nur übernehmen, falls die Fruchtdaten es tatsächlich fordern, sonst nicht erfinden). 
- Zahlenformat fix: '2,5 Mio.' / '400 Tsd.' für kompakte Kacheln (kein 'mehr als' ohne Quellenbeleg in der jeweiligen Kachel); Datum 'Oktober 2020' unverändert lassen, falls erneut zitiert. 
- 'die Limette' NIE 'Zitrone', NIE 'schwarze Limette' — gilt für jede Karte mit Hasawi-Limette/Lomi. 
- 'Guinness World Records' und 'das Ministerium für Umwelt, Wasser und Landwirtschaft' sind jetzt verifizierte Termbase-Einträge — bei erneuter Nennung unverändert übernehmen, nicht mit 'das Landwirtschaftsministerium' (historischer 1962er-Eintrag) verwechseln. 
- ui.rare='Fast ausgestorben' bleibt Kurzetikett ohne Erläuterung — falls Batches 2–3 die Sawari-Granatapfelkarte selbst texten, dieselbe Kurzform ohne Ausschmückung verwenden.

**من حاكم الدفعة 2 (94/100، APPROVE) — حرفاً:**

- 'Rutab', 'Kanar' und 'Hasawi-Limette' bleiben für die GESAMTE Seite (auch Charge 3) EIN letztes Mal in ui.heroSum geglost — keine erneute Klammererklärung in Charge 3. Charge 2 fügt vier weitere Einmal-Glossen an ihrer ersten Nennung hinzu: 'Tamr' (g0.f0.season), 'Balah (Bisr)' (g0.f3.pre), 'Sifsif' (g0.f2.pre), 'Jameed' (g1.f0.pre) — auch diese vier dürfen in Charge 3 NICHT erneut geglost werden, falls sie dort erwähnt werden.
- Tamr/Balah/Sifsif/Jameed bleiben artikellos ('pending', kein Genus im Termbase) — kein WebSearch-Beleg gefunden. Charge 3 darf ihnen keinen Artikel zuweisen ohne wörtlichen deutschen Beleg mit URL; sonst bei Bedarf mit 'namens X'-Konstruktionen oder artikelloser Verwendung arbeiten.
- Institutionsnamen ohne veröffentlichte deutsche Eigenbezeichnung (Zentrum für Palmen und Datteln in Al-Ahsa / Al-Ahsa-Handelskammer / Al-Ahsa-Entwicklungsbehörde / Hasawi-Lomi-Ausstellung) bleiben transparente, durchgekoppelte Übersetzungen mit regulärem deutschem Kopfwort-Genus (das Zentrum / die Kammer / die Behörde / die Ausstellung) — Status 'pending', NICHT in termbase_additions_final aufgenommen. Charge 3 folgt demselben Muster für neue Einrichtungsnamen.
- Jahreszeiten-Wortwahl bestätigt und für Charge 3 (Sommer-, Frühlings- und Winterfrüchte) bindend: Winter · Frühling · Sommer · Herbst ohne Artikel als Filter-Chips; 'Jahreszeit' = Kalenderjahreszeit, 'Saison' = Erntefenster, nicht mischen. Saisonzellen-Muster: Trennpunkt '•' zwischen Reifestufen beibehalten, Zeitspannen mit U+2013 (mit Leerzeichen bei Wortspannen, ohne Leerzeichen bei reinen Zahlenspannen wie '15–20 %'), deutsche Ordnungszahl-Schreibweise 'ca. 15.–25. September' für Datumsspannen.
- Zahlenformat bestätigt für Charge 3: Tausenderpunkt (100.000 nicht 100,000), Prozent-/Gewichtsangaben mit normalem Leerzeichen U+0020 vor % und kg (NIE U+00A0), Komma nur als deutsches Dezimalkomma falls gebraucht.
- Sortennamen (Eigennamen von Dattel-/Zitrus-Kultivaren) bleiben in Charge 3 durchgängig lateinisch/unübersetzt wie im Englischen, keine deutsche Nachbildung, keine Anführungszeichen um sie herum (nur um tatsächliche Zitate/Fachbegriffe wie Sifsif/Jameed).
- 'die Limette' (nie 'Zitrone', nie 'schwarze Limette') gilt unverändert für jede weitere Nennung der Hasawi-Limette/Lomi in Charge 3.
- Zwei Stilkorrekturen aus dem Blind-Reader dieser Charge als Muster für Charge 3 übernehmen: (a) lange Ketten aus mehr als zwei Appositionen vor dem Verb auflösen (Komma statt 'und' zwischen gleichwertigen Beschreibungen, Verb bleibt Singular bei einem tatsächlichen Subjekt); (b) 'Grundlage für X ... sowie für Y' statt 'wird X hergestellt ... sowie Y selbst' als Satzmuster für '(ist die) Grundlage von/für'-Konstruktionen aus der Quelle.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **الگلوس مرة واحدة في الصفحة كلها**: «الرطب» و«الكنار» و«اللومي» گُلست في مقدمة الصفحة (الدفعة 1)، وما گُلس في الدفعة 2 مذكور أعلاه — **لا يُگلَس ثانية**. بطاقة الكنار `g3.f1` لا تعيد «Indische Jujube»؛ و«النبق» في اسمها (`Hasawi Kanar (Nabk)`) علمٌ بديل يبقى في القوس كما في الإنجليزية.
2. **البمبر: جملة مقسومة حول الاسم العلمي** — `g2.f2.pre` + الاسم اللاتيني (يُطبع مائلاً، **لا يُترجم ولا يُكتب في أي مفتاح**) + `g2.f2.post`. يجب أن تُقرأ السلسلة الثلاثية جملةً ألمانية سليمة: `pre` ينتهي حيث يقع الاسم اللاتيني نحوياً (مثلاً «… wissenschaftlich als ») و`post` يبدأ بما يكمّله («, auch … genannt» أو « bezeichnet und …»). المسافات عند الطرفين كما في المصدر. **اختبر القراءة بدمج الثلاثة** قبل الانتهاء.
3. **الرمان السواري `g2.f4` بلا موسم** بقرار المالك (وموسوم «Fast ausgestorben» من الدفعة 1) — لا تُضف له موسماً في `pre` ولا في غيره. «شبه منقرض من البساتين» وقائع المصدر بنطاقها.
4. **«القرآن الكريم»** مرتان (التين، السدر): صيغة ألمانية واحدة متّسقة (`im Koran` أو `im heiligen Koran` — ابحث في المعجم أولاً، واكتب قرارك في `notes`).
5. **الأسواق = `Souks`** (`C18` يُفشل البناء عند `Souq` في `/de/`): «buying it in the souqs» ⇐ `auf den Souks`.
6. **الأرقام والمواسم وقائع**: «around July–August» ⇐ `etwa Juli–August`؛ «from June to August» ⇐ `von Juni bis August`؛ «around April — a season of barely a month» (الشرطة ⇐ U+2013 بمسافتين)؛ «from around January to late March». أسماء الفصول كما قرّرتها الدفعة 1. `C24` يفحص كل رقم في خلية الجدول مقابل fruits.ts.
7. **البطيخ الأصفر `Hasawi Yellow Melon`**: `die Hasawi-Melone`/`gelbe Hasawi-Melone` بـDurchkopplung — والإنجليزية «melon» والعربية «البطيخ الأصفر»: هل هو بطيخ (Wassermelone) أم شمّام (Zuckermelone)؟ **العربية الفيصل؛ لا تُسمِّ صنفاً نباتياً لا يسمّيه المصدر** — «gelbe Melone» تحفظ الواقعة بلا دعوى، ووصف الدفعة 1 (`ui.description`) قال «gelbe Melone».
8. **الأصناف أعلام لاتينية كما في الإنجليزية**: Suwari · Tuffahi · Umm Sulaim · Sini · sebestan · mkheit · hambu. والاقتباس „…“ متّسق مع قرار الدفعة 2.
9. **دعاوى المصدر بتحوّطها**: «so no precise tree count exists»، «according to farmers and vendors quoted in the local press»، «its cultivation is considered one of the oasis’s promising crops»، «folk remedies for the digestive system» — تُنقل بنسبتها ولا تُحوَّل إلى تقرير طبي أو إحصائي. **لا نصيحة صحية ولا ادّعاء علاجي زائد.**
10. **«& » في `g3.title` («Spring & winter fruits»)** ⇐ `und`؛ واتّسق مع الشارتين `Frühlingsfrüchte`/`Winterfrüchte` من الدفعة 1.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بمصدره** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `pending` بلا artikel).
- **U+2013** للاعتراض بمسافتين (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`).
- لا «بانتظار التأكيد» ولا مرادفاتها (القرار 8). ممنوع Denglisch (`Superfood` · `Spot` · `Must-see`…).
- النصوص نصٌّ خام (لا ماركداون). لا تُحرَّر ملفات المستودع.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05) بالشكل نفسه للدفعتين قبلها: `batch: "de-fruits-3"`، `stage`، `strings` (**المفاتيح الـ34 كلها وبترتيب `pack.json`**)، `termbase_additions`، `notes` (تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed`؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء** (سكربت node تكتبه بأداة Write): 34 مفتاحاً بالترتيب، لا U+00A0، لا U+2014، لا `du`/`dein`، لا حرف عربي/سيريلي/صيني، لا `Souq`، لا گلوس ثانٍ لـRutab/Kanar، و`g2.f2.pre` + „Cordia myxa“ + `g2.f2.post` جملة واحدة سليمة. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
