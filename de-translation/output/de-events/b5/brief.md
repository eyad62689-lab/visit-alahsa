# دفعة `de-ev-5` — إطار صفحة الفعالية المفردة ومتن معرض اللومي `/de/events/<slug>/` (ج4، الدفعة 5 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-events/bN/`)

## النطاق — 27 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| إطار صفحة الفعالية (13) | `dv.eyebrow` · `dv.seasonK` · `dv.timeK` · `dv.hoursK` · `dv.faqH` · `dv.relatedH` · `dv.mapH` · `dv.mapOpen` · `dv.mapNone` · `dv.mapFrameTitle` · `dv.notice` · `dv.moreH` · `dv.back` |
| متن معرض اللومي (14) | `ev.lomi.intro` · `ev.lomi.sec0.h` · `sec0.p0` · `sec0.p1` · `faq1.q/a` · `faq4.q/a` · `faq5.q/a` · `related.0/1.label` · `after.seoTitle` · `after.seoDesc` |

**تسميات صفحة الفعالية المشتركة مع الفهرس موروثة من الدفعة 1 ولا تُترجم هنا** (Ort · Veranstalter · Ungefähre Dauer · Höhepunkte · زرّ الحجز · الشارات · العدّاد · «Vor Ihrem Besuch» عنواناً لصندوق التنبيه · الفتات = H1 الفهرس) — ما تكتبه يجاورها في الصفحة نفسها فاتّسق معها.

**بنود نسخة 2026 المنتهية لا تُترجم** (قسم «التذاكر والدخول» وثلاثة أسئلة مؤرَّخة والساعات وعنوان النسخة ووصفها): تسقط آلياً بعد 13 سبتمبر 2026 ولا تُصيَّر (سابقة الروسية). **فلا تُشر إليها في أي نصّ** (لا تذاكر ولا أسعار ولا ساعات ولا حجز).

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` + المعجم ذو الصلة + الذاكرة + الجيران المنشورون (منها `det.faq` «Häufige Fragen» و`det.openMaps`) + **بطاقة اللومي المنشورة في `/de/fruits/` وعنوان تلك الصفحة H1** + **نصوص الدفعات 1–4 المعتمدة**). المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

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

**من حاكم الدفعة 4 (93/100، APPROVE) — حرفاً:**

- Ein im en/ar-Quellfeld eines span-/time-Feldes explizit stehendes Näherungswort (About/Around/تقريباً/نحو) bleibt auch dann in der deutschen Übersetzung stehen, wenn das Feldlabel selbst schon Näherung signalisiert (z. B. „Ungefähre Dauer“) oder wenn Start-/Enddatum anderswo exakt bekannt sind — Streichen würde eine vom Quelltext gemachte Unterscheidung auslöschen.
- ix.seoTitle/ix.seoDesc (und jedes künftige „u. a.“/„and more“-Aufzählungsfeld dieser Seite) darf nur die im en/ar-Quelltext tatsächlich namentlich genannten Veranstaltungen auflisten — ein zusätzlicher, an anderer Stelle der Seite bereits freigegebener Veranstaltungsname darf nicht ergänzt werden, auch wenn er korrekt wäre. „Al-Ahsa Municipality Fort“/«قلعة الأمانة» bleibt „Festung der Kommunalverwaltung von Al-Ahsa“ — bestätigt aus de-ev-2 und wortgleich für Folgechargen dieser Seite zu verwenden; „, Hofuf“ wird nur angehängt, wenn das jeweilige Quellfeld „Hofuf“ selbst führt.
- «طريق»/„Road“ vor einem Al-Ahsa-Straßennamen wird mit Durchkopplung als „-Straße“ übersetzt (nicht „-Weg“) — „Al-Salam-Straße“, „Ain-Najm-Straße“; damit ist der Stage-1-Vorbehalt aus Charge 3 endgültig aufgelöst.
- „Lomi (dried lime) product shows“ — die Klammer „(dried lime)“ ist ein Fehler der englischen Quelle (die arabische Autorität und die Eigentümer-Feldrecherche kennen keine solche Einschränkung); sie wird in keiner Sprachfassung nachgebildet, auch nicht in künftigen Batches, die von dieser Aktivität handeln.
- Fremdsprachige Eigennamen-Token ohne deutsche Bedeutungsquelle (Freej, Kafu, Ghabqa, Lomi in Kurzform) werden in Karten-/Tabellenfeldern dieser Seite nie geglosst — dies gilt jetzt ausdrücklich auch für „Freej“, bestätigt in Charge 4.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **`dv.notice`** نظير `ix.notice` المعتمد بالمفرد، ويحمل التصريح بأن المواعيد تقريبية بكلمة `ungefähr…` (حكم «Termine»؛ الحارس يشترطها).
2. **`dv.timeK`** («When»): تسمية صفّ في قائمة الحقائق فوق قيمٍ تقريبية («Etwa im Dezember») — لا تَعِد بموعد ثابت (`Termin` تحديداً يَعِد)؛ واتّسق مع `ix.notes.0.h` المعتمد إن صلح. و`dv.seasonK` («Season»): **قرار «Saison» مقابل «Jahreszeit» المعتمد** — القيم تحتها Winter/Sommer/«Winter und Frühling» (فصول تقويمية)، فالتسمية تتبع الحكم.
3. **`dv.faqH`** = الجار المنشور `det.faq` «Häufige Fragen» ما لم يمنع المصدر. **`dv.mapOpen`**: الجار `det.openMaps` «In Google Maps öffnen ↗» — هنا بلا سهم (المصدر بلا ↗).
4. **متن اللومي من الوقائع المنشورة**: بطاقة الليم الأحسائي في `/de/fruits/` (في context) تحمل الوقائع نفسها بالألمانية المعتمدة: «das zweite landwirtschaftliche Erzeugnis Al-Ahsas nach den Datteln» · «klein, dunkelgrün, dünnschalig» · «mehr als 100.000 tragende Limettenbäume» · «25–30 kg pro Saison» · «Jameed (die sonnengetrocknete Limette)». **اتّسق معها حرفاً حيث تتطابق الواقعة**، والأرقام `100.000` و`25–30 kg` (مسافة عادية). ولا `Zitrone` للومي (سابقاً: «Hasawi lemon» اسم شائع يُذكر اسماً لا تعريفاً — العربية الفيصل: قارن الأسماء البديلة في `intro` و`sec0.p0` بالعربية، ولا تضف اسماً لا تحمله).
5. **الگلوس مرة في الصفحة**: أول ورود للّومي في متن هذه الصفحة هو `ev.lomi.intro` — گلس «Lomi» مرة هناك (بصيغة المعجم)، ولا يُعاد في `sec0.p0`. و«الجميد» يرد في العربية («الجميد»)؟ قارن: إن حملته العربية ولم تحمله الإنجليزية فالعربية الفيصل — سجّل القرار.
6. **«Gulf cooking»** (المطبخ الخليجي) ⇐ حكم المعجم للخليج: `die Golfregion`/`der Golf` — لا `Persischer`/`Arabischer Golf`.
7. **الأسئلة الثلاثة** قالب ألماني واحد لصيغة السؤال؛ الجواب لا يحمل واقعة خارج متن الصفحة (المكان حرفياً كما اعتُمد في `ev.lomi.place`؛ «الخريطة في هذه الصفحة» تبقى). سؤال الأطفال: الأنشطة بأسمائها المعتمدة في `ev.lomi.acts` (الدفعة 4) حرفاً.
8. **`related.0.label`** يقصد `/de/fruits/` — اسم الصفحة كما هو منشور (H1 في context: «Saisonale Früchte Al-Ahsas» وتسمية الشريط `nav.fruits` «Oasenfrüchte»)؛ **`related.1.label`** يقصد صفحة الخطة الإنجليزية — التسمية المنشورة `nav.plan` «Reise planen» أو صيغتها الكاملة، بلا وعد بصفحة ألمانية.
9. **`after.seoTitle`** (≤ ~60، U+2013) و**`after.seoDesc`** (≤ 160): الموسم التقريبي وحده «August–September»، والمنظِّم `Al-Ahsa-Handelskammer` بتصريفه؛ **لا سنة 2026 ولا تواريخ ولا تذاكر**.
10. **`dv.mapNone`** جملة كاملة تُعرض بدل الخريطة لفعاليات بلا مكان معلن — «لم تُعلن الجهة المنظّمة… بعد» تبقى بـ«noch nicht».

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي** (كل رقم في الألمانية وارد في مصدر مفتاحه).
- ممنوع Denglisch: `Event(s)` · `Spot` · `Location` · `Must-see` · `Hotspot` · `Guide` · `Food-Truck` إن وُجد بديل ألماني مسنَد؛ `Highlight` مرة على الأكثر في الصفحة.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05) بالشكل نفسه للدفعة 1: `batch: "de-ev-5"`، `stage`، `strings` (**المفاتيح الـ27 كلها وبترتيب `pack.json`**)، `termbase_additions`، `notes` (تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
