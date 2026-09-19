# دفعة `de-ev-4` — بطاقتا الإبداع واللومي وعنوان فهرس الفعاليات ووصفه `/de/events/` (ج4، الدفعة 4 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-events/bN/`)

## النطاق — 26 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| مهرجان الأحساء المبدعة (11) | `ev.creative-ahsa.name/place/season/time/span/org` · `acts.0–4` |
| معرض اللومي الحساوي (13) | `ev.lomi.name/place/season/time/span/org` · `acts.0–4` · `after.time` · `after.span` |
| عنوان الفهرس ووصفه (2) | `ix.seoTitle` · `ix.seoDesc` |

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + المداخل ذات الصلة + الذاكرة + الجيران المنشورون + أسماء المعالم المنشورة + **بطاقة اللومي المنشورة في `/de/fruits/`** (`fruits_page_published_do_not_edit`) + **`approved_earlier_batches_of_this_page_do_not_edit`: نصوص الدفعات 1–3 المعتمدة**. **لا تُحرَّر، واتّسق معها حرفاً في الأنماط والأسماء**). المعجم الكامل `REPO/de-translation/glossary/termbase.json` — ابحث فيه، لا تقرأه كاملاً.

## قرارات الدفعات السابقة الملزمة (مقتبسة من حكّامها)
**من حاكم الدفعة 1 (95/100، APPROVE) — حرفاً:**

- «Saison» = das wiederkehrende Veranstaltungsfenster/die Ausgabe (Badges, ix.eyebrow, ix.lead, ix.ctaH, tbl.caption); «Jahreszeit» bleibt den vier Kalenderjahreszeiten (Winter/Frühling/Sommer/Herbst) vorbehalten — nicht mischen, auch nicht zur Auflösung einer Ambiguität (siehe Ruling 1, 2, 5).
- «Highlights» wird durchgehend mit «Höhepunkte» übersetzt (0 Verwendungen von «Highlight» in dieser Charge) — bindend auch für die H2 der Einzelseite in Charge 4.
- Die drei Status-Badges bleiben strukturell parallel und kurz: «Dieses Jahr bestätigt» / «Erwartete Saison» / «Ankündigung steht aus» — nie «Angaben werden noch bestätigt» oder ein Synonym von «بانتظار التأكيد», und «Zeitraum» bleibt exklusiv dem Tabellenspaltenkopf/H3 «Timing» vorbehalten (nicht für Badges wiederverwenden, siehe Ruling 5).
- «Ort» (ix.placeK) und «Veranstalter» (ix.orgK) sind die festen Ein-Wort-Labels für Karten 1–10 und die Einzelseite — keine Neuübersetzung in Folgechargen.
- Der Zähler (ix.cd.*) kennt nur zwei deutsche Formen, «one» (n = 1) und «other» (n ≠ 1); {n} bleibt in «other»-Formen wörtlich als Platzhalter stehen.
- Ein Bezug auf das Gerätedatum wird als „… auf Ihrem Gerät“ (nicht „das Datum Ihres Geräts hat/besitzt“) formuliert, wenn er über eine reine Genitivkette hinausgeht.
- Bei einer Aufzählung aus benannten Institutionen und „offiziellen Kanälen“ regiert ein einziges «(den) offiziellen Kanälen …» einheitlich alle Genitive, statt Institutionen und Kanäle als grammatisch ungleiche Objekte von „folgen“ zu mischen.
- «die Al-Ahsa-Entwicklungsbehörde» (die) ist ab sofort termbase-verifiziert (Beleg `src/data/fruits.ts:538`) und in allen Folgechargen ohne erneute Herleitung zu verwenden.
- Der Hidschra-Gloss «der islamische Mondkalender (Hidschra-Kalender)» ist auf dieser Seite bereits einmal (ix.notes.0.d) gesetzt — in Folgechargen derselben Seite nicht erneut glossieren, nur noch «Hidschra-Kalender» oder «n. H.» kurz verwenden, falls ein konkretes Jahr vorkommt.
- Der Tabellenspaltenkopf «Termine» (= nav.events, erste Spalte) bleibt ein offener Code-/UI-Punkt außerhalb des Batch-Umfangs — nicht in einer künftigen Textcharge „reparieren“; er ist dem Koordinator/Iyad als source_defect gemeldet.

**من حاكم الدفعة 2 (93/100، APPROVE) — حرفاً:**

- Bei einer Aufzählung aus Institutionen und „offiziellen Kanälen“ regiert ein einziges „(den) offiziellen Kanälen …“ alle Genitive einheitlich.
- Monatsspannen werden mit U+2013 ohne Leerzeichen geschrieben («Februar–März», «Januar–Februar») für alle zehn Ereigniskarten der Seite.
- Ein Näherungswort («Etwa»/„ungefähr“/„gegen“/„rund“) wird nur gesetzt, wenn das en/ar-Quellfeld selbst ein Näherungswort trägt (Around/تقريباً); ein bereits genauer Monatsbereich erhält keines.
- Ungefähre-Dauer-Wortlaute sind fest und für Chargen 3–5 wiederzuverwenden: „A few days“ = „Wenige Tage“; „Several weeks“ = „Mehrere Wochen“; ein Ramadan-spezifischer Dauertext folgt dem Muster „Verlängerte Ramadan-Nächte“ (Durchkopplung Eigenname+Nächte).
- Veranstaltungsnamen mit generischem deutschem Grundwort werden durchgekoppelt und bleiben wortgleich in Card-H2, Einzelseiten-H1, Tabellenzelle, Breadcrumb und Browser-Tab-Titel: „Hasawi-Bischt-Festival“, „die Qaisariyah-Nächte“, „die Kafu-Nächte“, „das Festival der verarbeiteten Datteln“ — kein Glossar-Einschub im Namen selbst.
- Fremdsprachige Eigennamen ohne deutsche Bedeutungsquelle (Bischt, Kafu, Ghabqa) werden in kurzen Karten-/Tabellenfeldern nicht geglosst; eine Glosse gehört ausschließlich in Fließtext mit eigenem Quellenbeleg.
- Das „place“-Feld erhält „Historischer/Historische/Historisches + [termbase-Ortsname], Hofuf“ nur, wenn die Quelle „Historic“/„التاريخي“ trägt, mit Adjektivendung nach dem termbase-Genus des Kopfnomens; ohne „Historic“ im Quelltext entfällt das Adjektiv ganz.
- „Al-Ahsa Municipality Fort“/«قلعة أمانة الأحساء» bleibt die Platzhalterform „die Festung der Kommunalverwaltung von Al-Ahsa“ (status pending) — wortgleich in Charge de-ev-4 («قلعة الأمانة») wiederzuverwenden.
- „König-Faisal-Universität“ (die) ist termbase-verifiziert (de.wikipedia.org/wiki/Dammam) und ohne erneute Herleitung zu verwenden.
- Ein als Saison-Badge verwendetes religiöses Kalenderereignis mit einer vollen Nominalphrase im Quelltext wird auf eine kurze, respektvolle Zweiwortform verkürzt, die die religiöse Qualifikation behält: „Heiliger Ramadan“ (nicht „Ramadan“ allein, nicht die volle Quellphrase als Badge).
- „Community gatherings“/«جلسات مجتمعية» als Festival-Highlight = „Geselliges Beisammensein“ (nicht „Gemeinschaftstreffen“, nicht „Nachbarschaftstreffen“).
- „Heritage games“/«ألعاب تراثية» bleibt „Kulturerbe-Spiele“ — die Vorsilbe „Kulturerbe-“ ist exklusiv „heritage“ vorbehalten, nie „historic“/„traditional“, auch auf Aktivitäten angewandt.
- „Folk arts shows“/«عروض فنون شعبية» = „Volkskunstvorführungen“ und „Folklore performances“/«عروض فولكلورية» = „Folkloristische Vorführungen“ bleiben unterschiedlich übersetzt, nicht vereinheitlichen.

**من حاكم الدفعة 3 (93/100، APPROVE) — حرفاً:**

- „An extended season“/«موسم ممتد» = „Verlängerte Saison“; „An extended winter season“/«موسم شتوي ممتد» = „Verlängerte Wintersaison“ — die fehlende Zahlenangabe ist ein Quellenmerkmal (kein konkreter Zeitraum im Quelltext), keine Übersetzungslücke; keine Zahl oder Wochenangabe nachträglich erfinden.
- „food truck(s)“/«فود ترك» = „der Foodtruck“ (Pl. „die Foodtrucks“) — Duden-belegt (https://www.duden.de/rechtschreibung/Foodtruck), kein Denglisch; ersetzt den früheren deskriptiven Kandidaten „Imbisswagen“ für diese Begriffsfamilie in allen Folgechargen.
- Ein rein gattungsbezeichnender englischer Veranstaltungsname ohne Eigennamen (z. B. „Palm Village“, „Horse Racing Season“) wird vollständig ins Deutsche übersetzt und nicht transliteriert — „Palmendorf“, „Pferderennsaison“ —, nach demselben Muster wie „Processed Dates Festival“ → „Festival der verarbeiteten Datteln“ (Charge 2).
- Ein Veranstaltungsname aus Ortsname + englischem Gattungswort (Eigenname + Gattungswort, z. B. „Al-Uqair Winter“, „Al-Wafrah Winter“) wird als EIN durchgekoppeltes Kompositum geschrieben — „Al-Uqair-Winter“, „Al-Wafrah-Winter“ —, nie als Präpositionalfügung wie „Winter in Al-Uqair“.
- Ein bereits auf der deutschen Seite veröffentlichter Attraktionsname (`venue_attractions_published_do_not_edit`) wird im `place`-Feld einer Veranstaltung wortgleich zitiert, mit vorangestelltem Gattungswort bei Bedarf («منتزه شاطئ العقير» → „Park am Al-Uqair-Strand“) — „Al-Uqair-Strand“ bleibt identisch mit `title_de` der Attraktionsseite, damit das Linkziel eindeutig bleibt.
- „National Center for Palms and Dates“/«المركز الوطني للنخيل والتمور» = „das Nationale Zentrum für Palmen und Datteln“ (status pending) und „Al-Ahsa Equestrian Arena“/«ميدان الفروسية بالأحساء / ميدان الفروسية» = „die Al-Ahsa-Reitsportanlage“ (status pending) — beide nach durchgeführter Web-Recherche ohne amtliche deutsche oder feststehende fremdsprachige Form; bei Wiederauftreten wortgleich übernehmen, nicht neu recherchieren.
- Nennt die arabische Autorität dieselbe Institution in verschiedenen Feldern desselben Ereignisses einmal mit und einmal ohne „Al-Ahsa“-Präfix (Ort vs. Veranstalter), wird jedes Feld einzeln treu übersetzt statt vereinheitlicht — dies ist ein Quellenmerkmal (auch in der russischen Charge ru-ev-3 an denselben Stellen beobachtet), kein stillschweigend zu korrigierender Fehler.
- «تسويق المنتجات الريفية» („Vermarktung/Verkauf“, nicht «سوق» als Ortsbegriff) = „Vermarktung ländlicher Erzeugnisse“ — auch aus Gründen der Lesbarkeit nie „Markt“/„Marktstände“ einsetzen, da die arabische Autorität den Ortsbegriff bewusst vermeidet.
- „Open-air winter gatherings“/«جلسات شتوية مفتوحة» = „Winterliches Beisammensein im Freien“ — reiht sich in die bereits freigegebene „Beisammensein“-Familie für Gatherings-Highlights ein (Charge 2: „Community gatherings“ → „Geselliges Beisammensein“); bei künftigen „gatherings“-Begriffen dieselbe Familie fortsetzen.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **اسم المعرض منشور سلفاً**: `/de/fruits/` يقول «die Hasawi-Lomi-Ausstellung, veranstaltet von der Al-Ahsa-Handelskammer» — **`ev.lomi.name` = `Hasawi-Lomi-Ausstellung`** و**`ev.lomi.org` = `Al-Ahsa-Handelskammer`** (بتصريفهما؛ الحارس الآلي يشترطهما). «الحساوي» في اسم المعرض اسم رسمي يبقى (قاعدة المالك). وسجّل الاسمين في المعجم بجنسيهما (die Ausstellung · die Handelskammer) بشاهد حرفي من `src/data/fruits.ts` (منشور).
2. **`ev.lomi.acts.0`**: الإنجليزية «Lomi (dried lime) product shows» تُقحم «(dried lime)» — **العربية الفيصل** («معارض منتجات اللومي» بلا قيد)، واللومي يُستعمل طازجاً وعصيراً ومجففاً (قاعدة المالك، وبطاقة `/de/fruits/`)؛ فلا تحصره في المجفّف، ولا `schwarze Limette` أبداً، ولا `Zitrone`. سجّل «(dried lime)» علّة مصدر. والگلوس: `die Lomi` / `die Hasawi-Limette` في المعجم — لا گلوس داخل عنصر قائمة (قرار الدفعات السابقة إن وُجد يُتّبع).
3. **النسخة المنتهية**: `ev.lomi.time` = «19 August – 13 September 2026» و`ev.lomi.span` = «About 26 days» **لا تُعرضان اليوم** (انتهت النسخة في 13 سبتمبر 2026 ويحلّ محلهما `after.*`) لكن النوع يلزمهما — ترجمة أمينة بصيغة التاريخ الألمانية `19. August – 13. September 2026` و`Etwa 26 Tage` (أو صيغة الدفعات السابقة للتقريب). **`ev.lomi.after.time`** («Around August – September») و**`after.span`** («Several weeks») هما المعروضان الآن: نطاق الأشهر وصيغة التقريب و«Several weeks» **حرفياً كما اعتُمدت في الدفعات 2–3**.
4. **`ev.lomi.place`**: «مركز الأحساء للمعارض، شارع السلام (طريق عين النجم)، الهفوف» — المعجم فيه `Ain Najm (die Najm-Quelle)` و`der Ain-Najm-Park`؛ أسماء الشوارع أعلام لاتينية (`Al-Salam-Straße`؟ — نمط Durchkopplung؛ قرار يُكتب) و«طريق» ⇐ `Straße`/`Weg` بقرار. «مركز الأحساء للمعارض» (Al-Ahsa Expo Center) — المرحلة 4 تبحث عن صيغة مسنَدة وإلا صيغة واصفة `pending`. **لا گلوس في حقل البطاقة.**
5. **مهرجان الأحساء المبدعة**: «الأحساء المبدعة» إشارة إلى انضمام الأحساء لشبكة المدن المبدعة لليونسكو (المعجم: `das Netzwerk der UNESCO Creative Cities`) — **لا تضف هذه الواقعة** إلى الاسم ولا إلى أي حقل؛ الاسم وحده. `place`: «الفريج التراثي، قلعة الأمانة» — «قلعة الأمانة» **بالصيغة التي اعتمدتها الدفعة 2** لمكان مهرجان التمور (قلعة أمانة الأحساء) حرفاً؛ و«الفريج» (الحيّ الشعبي) علم/مصطلح — لا شرح بلا مصدر.
6. **الحِرف في `creative-ahsa.acts`**: «صناعة الفخار» · «الخوصيات» (بالصيغة المعتمدة في الدفعة 3 لقرية النخيل حرفاً) · «النجارة التقليدية» · «فنون تشكيلية» · «عروض شعبية» (اتّسق مع صيغة «Folklore/Folk performances» المعتمدة في الدفعة 2).
7. **`ix.seoTitle`** (≤ ~60 محرفاً، U+2013 لا U+2014، ولا «Events») و**`ix.seoDesc`** (≤ 160): أسماء الفعاليات **كما اعتُمدت على البطاقات حرفاً** (البشت، ليالي القيصرية، معرض اللومي، شتاء العقير). عنوان الصفحة H1 المعتمد «Festivals und Veranstaltungen» — العنوان يتّسق معه. والدعوى «مواسم الواحة على مدار العام» بلا تضخيم.
8. **لا وقائع مضافة**: لا مواعيد جديدة ولا رسوم ولا ساعات (النسخة المنتهية لا تُعاد) ولا وصف للمعرض خارج المصدر.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي** (كل رقم في الألمانية وارد في مصدر مفتاحه).
- ممنوع Denglisch: `Event(s)` · `Spot` · `Location` · `Must-see` · `Hotspot` · `Guide` · `Food-Truck` إن وُجد بديل ألماني مسنَد؛ `Highlight` مرة على الأكثر في الصفحة.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05) بالشكل نفسه للدفعة 1: `batch: "de-ev-4"`، `stage`، `strings` (**المفاتيح الـ26 كلها وبترتيب `pack.json`**)، `termbase_additions`، `notes` (تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
