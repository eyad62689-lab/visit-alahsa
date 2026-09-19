# دفعة `de-ev-2` — بطاقات الفعاليات 1–4 في `/de/events/` (ج4، الدفعة 2 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-events/bN/`)

## النطاق — 40 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| الفعالية | المفاتيح (10 لكل واحدة) |
|---|---|
| مهرجان البشت الحساوي | `ev.bisht.name/place/season/time/span/org` · `acts.0–3` |
| ليالي القيصرية | `ev.qaisariyah-nights.*` |
| ليالي كفو | `ev.kafu-nights.*` |
| مهرجان التمور المصنّعة | `ev.dates-festival.*` |

كل حقل بطاقة يُصيَّر في **ثلاثة مواضع**: بطاقة الفهرس، وصفّ جدول الروزنامة (الاسم · المكان · «الموسم · الموعد»)، وصفحة الفعالية المفردة (الاسم عنوانها H1 وفتاتها وعنوان تبويبها، والباقي صفوف حقائقها وقائمة أنشطتها). فالقيمة قصيرة، مستقلة، تصلح بلا سياق.

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + المداخل ذات الصلة + الذاكرة + الجيران المنشورون + **أسماء المعالم-المواقع المنشورة** (`venue_attractions_published_do_not_edit`) + **`approved_earlier_batches_of_this_page_do_not_edit`: نص الدفعة 1 المعتمد** — تسميات البطاقة والشارات والتنبيه. **لا تُحرَّر، واتّسق معها**). المعجم الكامل `REPO/de-translation/glossary/termbase.json` — ابحث فيه، لا تقرأه كاملاً.

## قرارات الدفعة 1 الملزمة (مقتبسة من حاكمها)
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

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **التقريب وقائعي لا أسلوبي**: «Around December» / «ديسمبر تقريباً» يبقى تقريبياً (الحارس الآلي يشترط `ungefähr`/`etwa`/`gegen`/`rund` في كل `time` يحمل التقريب في مصدره). ونطاق الأشهر «February – March» ⇐ `Februar–März` أو `Februar – März` — قرار واحد تلتزمه البطاقات العشر (اكتبه في `notes`)؛ والشرطة U+2013 لا U+2014.
2. **`season`** شارة على صورة البطاقة وجزء من خلية «الموسم · الموعد» في الجدول: أسماء الفصول كما قرّرتها الدفعة 1 (Winter · Frühling · Sommer · Herbst)، و«Late winter» ⇐ صيغة قصيرة («Spätwinter»). و«The holy month of Ramadan» / «شهر رمضان المبارك» ⇐ صيغة محترمة قصيرة دون تفخيم ولا تسطيح (قرار يُكتب).
3. **الأسماء الرسمية للفعاليات**: «مهرجان البشت الحساوي» اسم رسمي يُبقي «الحساوي» (قاعدة المالك)، والمعجم فيه `der Hasawi-Bischt` و`der Bischt (traditioneller Umhang)` — والاسم بـDurchkopplung (`Hasawi-Bischt-Festival` أو ما تسنده المرحلة 4). «ليالي القيصرية» و«ليالي كفو»: «Kafu» علمٌ على الفعالية يبقى لاتينياً كما في الإنجليزية (`titel_regel`)؛ «ليالي» ⇐ `Nächte` بصيغة ألمانية طبيعية (`Qaisariyah-Nächte`؟ `Kafu-Nächte`؟ — Durchkopplung إن رُكّب). **لا گلوس داخل الاسم** (يُعرض عنواناً وفي الفتات).
4. **`place` يطابق أسماء المعالم المنشورة** (رابطه في صفحة الفعالية يقصد صفحة المعلم): قصر إبراهيم ⇐ عنوانه المنشور `Qasr Ibrahim` (والمعجم: `der Ibrahim-Palast` في المتن — «التاريخي» صفةٌ في المصدرين فلا تُسقط)؛ سوق القيصرية ⇐ `der Qaisariyah-Souk`؛ منتزه الملك عبدالله البيئي ⇐ `der König-Abdullah-Umweltpark`؛ «الهفوف» ⇐ `Hofuf` (معجم). **«قلعة أمانة الأحساء»** (مكان مهرجان التمور): لا مدخل لها — المرحلة 4 تبحث عن صيغة مسنَدة، وإلا صيغة واصفة مطابقة للعربية (قلعة **الأمانة** = مقرّ الجهة التي اسمها في المعجم `die Kommunalverwaltung von Al-Ahsa`) تُسجَّل `pending`. واحفظ الصيغة: الدفعة 4 تذكر «قلعة الأمانة» ثانيةً (مكان مهرجان الأحساء المبدعة).
5. **الجهات بأسمائها المعجمية** (والفاصلة بينها كما في المصدر): `die Kommission für Kulturerbe` (هيئة التراث) · `das Kulturministerium` · `die Kommunalverwaltung von Al-Ahsa` · `die Al-Ahsa-Entwicklungsbehörde` (منشورة في `/de/fruits/` — إن سجّلتها الدفعة 1 في المعجم فالتزمها حرفاً). **جامعة الملك فيصل**: لا مدخل — المرحلة 4 تسندها (de.wikipedia أو صفحة ألمانية موثوقة، بشاهد حرفي) وإلا تبقى بصيغة واصفة متّسقة مع `der König-Abdullah-Umweltpark` (نمط «König-…») بـ`pending`. **لا تختلق اسم جهة** (سابقة ج3: «Saudische Presseagentur» المختلَقة).
6. **«الغُبقة»** (عشاء رمضاني متأخر): الإنجليزية «“Ghabqa” dinner» بعلامتي تنصيص ⇐ „Ghabqa“ بعلامات ألمانية. الگلوس: قاعدة `gloss_regel` تُجيزه مرة عند أول ورود في المتن — وقائمة الأنشطة تُعرض على البطاقة وفي صفحة الفعالية معاً؛ **أي شرح لمعناها واقعةٌ تحتاج مصدراً** (مدخل معجم بمصدر)، وإلا تبقى بلا شرح. (الروسية حكمت: لا گلوس في حقول البطاقة.) قرار يُكتب في `notes`.
7. **العربية الفيصل** في الأنشطة: «ورش تعليم الحياكة» (تعليم — لا ورش عرض)، «سوق البشوت التفاعلي»، «جلسات مجتمعية»، «أجنحة المنتجات التحويلية» (منتجات التمور المصنّعة/التحويلية). و«&» في «Tasting & shopping pavilion» ⇐ `und`. كل نشاط عبارة اسمية متوازية مع أخواتها، بلا أداة.
8. **«A few days» / «أيامٌ معدودة»**, «Several weeks» / «عدة أسابيع», «Extended Ramadan nights» / «ليالٍ رمضانية ممتدة»: مُدد تقريبية تحت تسمية «المدة التقريبية» المعتمدة في الدفعة 1 — قصيرة ومتّسقة عبر البطاقات العشر (الدفعتان 3 و4 تلتزمان صيغتك لـ«Several weeks» و«An extended season»).
9. **لا وقائع مضافة**: لا وصف للبشت ولا لرمضان ولا للجامعة ولا لمكان — ما لم يحمله المصدر.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي** (كل رقم في الألمانية وارد في مصدر مفتاحه).
- ممنوع Denglisch: `Event(s)` · `Spot` · `Location` · `Must-see` · `Hotspot` · `Guide` · `Food-Truck` إن وُجد بديل ألماني مسنَد؛ `Highlight` مرة على الأكثر في الصفحة.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05) بالشكل نفسه للدفعة 1: `batch: "de-ev-2"`، `stage`، `strings` (**المفاتيح الـ40 كلها وبترتيب `pack.json`**)، `termbase_additions`، `notes` (تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
