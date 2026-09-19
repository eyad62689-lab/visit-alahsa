# دفعة `de-ev-3` — بطاقات الفعاليات 5–8 في `/de/events/` (ج4، الدفعة 3 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-events/bN/`)

## النطاق — 36 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| الفعالية | المفاتيح |
|---|---|
| قرية النخيل (10) | `ev.palm-village.name/place/season/time/span/org` · `acts.0–3` |
| شتاء العقير (9) | `ev.uqair-winter.*` · `acts.0–2` |
| شتاء الوفرة (9) | `ev.wafrah-winter.*` · `acts.0–2` |
| موسم سباقات الخيل (8) | `ev.horse-racing.*` · `acts.0–1` |

كل حقل بطاقة يُصيَّر في **ثلاثة مواضع**: بطاقة الفهرس، وصفّ جدول الروزنامة (الاسم · المكان · «الموسم · الموعد»)، وصفحة الفعالية المفردة (الاسم عنوانها H1 وفتاتها وعنوان تبويبها). فالقيمة قصيرة، مستقلة، تصلح بلا سياق.

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + المداخل ذات الصلة + الذاكرة + الجيران المنشورون + أسماء المعالم-المواقع المنشورة + **`approved_earlier_batches_of_this_page_do_not_edit`: نصّا الدفعتين 1 و2 المعتمدان** — تسميات البطاقة والشارات، والبطاقات الأربع الأولى. **لا تُحرَّر، واتّسق معها حرفاً في الأنماط**: صيغة التقريب، نطاق الأشهر، «Several weeks»، «An extended season»، أسماء الجهات). المعجم الكامل `REPO/de-translation/glossary/termbase.json` — ابحث فيه، لا تقرأه كاملاً.

## قرارات الدفعتين السابقتين الملزمة (مقتبسة من حاكميهما)
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

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **الأنماط المعتمدة في الدفعة 2 تُنسخ لا تُعاد صياغتها**: «Several weeks» و«Winter» ونطاق الأشهر و«Al-Ahsa Municipality»/«Al-Ahsa Development Authority» بالصيغة المعتمدة حرفاً (في `approved_earlier_batches…`). «An extended season» (قرية النخيل والخيل) و«An extended winter season» (الوفرة) صيغتان متقاربتان متّسقتان.
2. **التقريب وقائعي**: «From around November» / «من نوفمبر تقريباً» يبقى تقريبياً (الحارس يشترط `ungefähr`/`etwa`/`gegen`/`rund`)، ولا تُضاف له نهاية (المصدر لا يعلنها).
3. **العربية الفيصل حيث تختلف** (سابقة الروسية ru-ev-3 بالمواضع نفسها):
   - قرية النخيل `acts.3`: «تسويق المنتجات الريفية» (تسويق/بيع) لا «سوق» كمكان — «Rural products market» الإنجليزية أضيق.
   - `acts.2`: «أجنحة الحرفيين (الخوصيات)» — الخوصيات = مشغولات سعف النخيل (palm-frond crafts)؛ القوس يبقى.
   - الوفرة `org`: «ملاك ومستثمرون بإشراف أمانة الأحساء» — مالكون ومستثمرون **بإشراف** الأمانة؛ «Private operators» الإنجليزية تُسقط «الملاك».
   - الوفرة `acts.0`: «أكثر من 150 عربة طعام» — «150+» ⇐ `Mehr als 150` (الرقم 150 وحده؛ لا رقم آخر). و«فود ترك» Denglisch — الألمانية `Foodtrucks` مدرجة في Duden؟ **المرحلة 4 تتحقق بشاهد** وإلا صيغة ألمانية واصفة (`Imbisswagen`/`Essenswagen`) — قرار يُكتب.
   - الخيل `place`: «ميدان الفروسية، الطرف» — `Al-Taraf` (معجم: artikellos)؛ «Al-Ahsa Equestrian Arena» في الإنجليزية تضيف «Al-Ahsa» — العربية في `org` تقول «ميدان الفروسية بالأحساء»، فالمكان والجهة اسمٌ واحد (علّة مصدر رصدتها الروسية: «الميدان مكانٌ ومنظِّم») — انقلها وفيةً وسجّلها.
   - قرية النخيل `place`: «واحة الأحساء» كاملة (المكان غير محدد) — `die Al-Ahsa-Oase` بالمعجم؛ لا تخترع موقعاً.
4. **الأسماء**: «Palm Village» / «قرية النخيل» اسم فعالية (ترجمته وصفية مسموحة، `titel_regel` يوازي بنية `title_en`: ترجم الإنجليزي ⇐ تُترجم: `Palmendorf`؟ — قرار يُكتب)؛ «Al-Uqair Winter» / «Al-Wafrah Winter» — بنية الإنجليزية «Al-Uqair Winter» (علم + جنس) ⇐ Durchkopplung ألماني (`Al-Uqair-Winter`)، أو صيغة `Winter in Al-Uqair` إن رُجّحت — قرار واحد للاسمين معاً يُكتب. «Horse Racing Season» ⇐ اسم وصفي ألماني.
5. **`place` يطابق المعالم المنشورة**: شتاء العقير في «منتزه شاطئ العقير» ⇐ عنوان المعلم المنشور `Al-Uqair-Strand` (في `venue_attractions_published`) و«منتزه» في المصدرين صفة المكان؛ رابطه يقصد صفحة ذلك المعلم. «حي الوفرة، جنوب الهفوف» ⇐ نمط المعجم (`das Al-Faisal-Viertel`) ⇐ `Al-Wafrah-Viertel` بجنسه (das Viertel) و`Hofuf`.
6. **الجهات**: «المركز الوطني للنخيل والتمور» — لا مدخل ألماني؛ المرحلة 4 تسنده (شاهد حرفي بURL) أو صيغة واصفة `pending` (سابقة ج3: «Palms and Dates Center» بلا صيغة مسنَدة بقي معلّقاً) — **لا تختلق**. «ميدان الفروسية بالأحساء» كذلك.
7. **لا وقائع مضافة**: لا وصف للبحر ولا للطقس ولا للخيل ولا للأحياء — ما لم يحمله المصدر.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي** (كل رقم في الألمانية وارد في مصدر مفتاحه).
- ممنوع Denglisch: `Event(s)` · `Spot` · `Location` · `Must-see` · `Hotspot` · `Guide` · `Food-Truck` إن وُجد بديل ألماني مسنَد؛ `Highlight` مرة على الأكثر في الصفحة.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05) بالشكل نفسه للدفعة 1: `batch: "de-ev-3"`، `stage`، `strings` (**المفاتيح الـ36 كلها وبترتيب `pack.json`**)، `termbase_additions`، `notes` (تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
