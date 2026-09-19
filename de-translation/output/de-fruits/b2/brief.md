# دفعة `de-fruits-2` — صفحة «ثمار الأحساء الموسمية» الألمانية `/de/fruits/` (ج3، الدفعة 2 من 3)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-fruits/bN/`)

## النطاق — 31 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| مجموعة التمور (22) | `g0.title` · `g0.intro` · خمس بطاقات `g0.f0…f4` × `name` · `season` · `pre` · `alt` — خلاص · شيشي · رزيز · برحي · البواكير |
| مجموعة الحمضيات (9) | `g1.title` · بطاقتان `g1.f0…f1` × `name` · `season` · `pre` · `alt` — الليم الأحسائي (بن زهيري) · الأترنج |

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + المداخل ذات الصلة + الذاكرة + الجيران المنشورون، **و`approved_earlier_batches_of_this_page_do_not_edit`: نص الدفعة 1 المعتمد** — إطار الصفحة نفسها: البطل والأزرار والشارات والجدول. **لا تُحرَّر، واتّسق معها**). المعجم الكامل `REPO/de-translation/glossary/termbase.json` — ابحث فيه، لا تقرأه كاملاً.

## قرارات الدفعة 1 الملزمة (مقتبسة من حاكمها)
**من حاكم الدفعة 1 (95/100، APPROVE) — حرفاً:**

- Gloss-Sperre: 'Rutab', 'Kanar' und 'Hasawi-Limette'/'Lomi' sind in ui.heroSum EIN letztes Mal geglosst — auf den Fruchtkarten NUR die nackten Namen 'Rutab', 'Kanar', 'Hasawi-Limette' (Lomi in Klammer erlaubt wie in lemon-farm.md), keine erneute Klammererklärung (Guard: pack.batch !== 'de-fruits-1' schlägt sonst fehl). 
- Rutab/Kanar bleiben OHNE eigenen Artikel (termbase-Status 'pending') — auf den Karten keinen Artikel für diese beiden Namen erfinden, bis ein Beleg nachgetragen wird; Konstruktionen nach dem Muster 'namens Rutab'/'namens Kanar' oder artikellose Titelverwendung nutzen. 
- Jahreszeiten-Wortwahl fix: Winter · Frühling · Sommer · Herbst (Filter, ohne Artikel); 'Jahreszeit' = Kalenderjahreszeit, 'Saison' = Erntefenster — nicht mischen. 
- Badge-Kompositionsmuster fix: '…früchte' geschlossen, ohne Artikel — Sommerfrüchte, Frühlingsfrüchte, Winterfrüchte, Zitrusfrüchte, Datteln (kein '-frucht' Singular). Kein 'Herbstfrüchte'-Badge vorgesehen (source_defect #16 — nur übernehmen, falls die Fruchtdaten es tatsächlich fordern, sonst nicht erfinden). 
- Zahlenformat fix: '2,5 Mio.' / '400 Tsd.' für kompakte Kacheln (kein 'mehr als' ohne Quellenbeleg in der jeweiligen Kachel); Datum 'Oktober 2020' unverändert lassen, falls erneut zitiert. 
- 'die Limette' NIE 'Zitrone', NIE 'schwarze Limette' — gilt für jede Karte mit Hasawi-Limette/Lomi. 
- 'Guinness World Records' und 'das Ministerium für Umwelt, Wasser und Landwirtschaft' sind jetzt verifizierte Termbase-Einträge — bei erneuter Nennung unverändert übernehmen, nicht mit 'das Landwirtschaftsministerium' (historischer 1962er-Eintrag) verwechseln. 
- ui.rare='Fast ausgestorben' bleibt Kurzetikett ohne Erläuterung — falls Batches 2–3 die Sawari-Granatapfelkarte selbst texten, dieselbe Kurzform ohne Ausschmückung verwenden.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **الگلوس مرة واحدة في الصفحة كلها**: «الرطب» و«الكنار» و«اللومي» **گُلست في مقدمة الصفحة** (الدفعة 1) — **لا تُگلَس ثانية هنا** («Rutab» يُكتب بلا قوس). ما يرد أول مرة هنا يُگلَس هنا مرة واحدة عند أول ورود في المتن (`g0.intro` قبل البطاقات، ثم البطاقات بترتيبها): «balah (bisr)» · «sifsif» · «majalis» · «jameed» · «Tamr/full dates». والاسم (H4) والنص البديل لا يحملان گلوساً.
2. **أسماء الأصناف أعلام تبقى لاتينية كما في الإنجليزية** (سياسة الألمانية في `_meta`): Khalas · Shishi · Razeez · Barhi · Bawakir · Tayyar · Mignaz · Ghar · Khneizi · Umm Rahim · Zamli · Hilali · Shubaibi · Shahl · Wusaili · Hatimi · Kasbi · Bin Zuhairi · Atranj. لا نقحرة ألمانية جديدة ولا ترجمة لها. ما يُقتبس من الأصناف في الجملة يتّسق طريقةً واحدة (بعلامات „…“ أو بلا — قرار يُكتب في `notes`).
3. **الأرقام والنِّسَب وقائع**: «100,000 و120,000 طن» ⇐ `100.000 bis 120.000 Tonnen` (فاصل الآلاف الألماني نقطة)، «أكثر من 200,000 طن» · «2021» · «أكثر من 127 صنفاً» · «ثلاثة أرباع» · «15–20%» ⇐ `15–20 %` · «أكثر من 100,000 شجرة» · «25–30 كغ» ⇐ `25–30 kg`. **المسافة قبل % وkg مسافة عادية U+0020** (U+00A0 يُفشل الفحوص بصمت). ولا يُحوَّل «أكتوبر 2024» ولا «أواخر القرن التاسع عشر».
4. **المواسم** (`season`) خانة موسم على البطاقة **وخلية في جدول المواسم**: المراحل مفصولة بـ«•» تبقى، والنطاقات بـU+2013. «c. 15–25 September» ⇐ `ca. 15.–25. September` (الترتيبية الألمانية). أسماء الفصول كما قرّرتها الدفعة 1 (Winter · Frühling · Sommer · Herbst). كل رقم في الموسم يجب أن يرد في المصدر (`C24` يفحص أرقام الجدول مقابل fruits.ts).
5. **جهات ومصادر بأسمائها**: «وكالة الأنباء السعودية» (Saudi Press Agency — ابحث في المعجم؛ الصيغة الألمانية الشائعة `die Saudische Presseagentur (SPA)`)، «مركز النخيل والتمور بالأحساء» (Palms and Dates Center — ابحث في المعجم، وإلا صيغة واصفة بمصدر)، «غرفة الأحساء» (Al-Ahsa Chamber = غرفة تجارية)، «هيئة تطوير الأحساء» (Al-Ahsa Development Authority)، «معرض اللومي الحساوي» (اسم فعالية رسمي — ابحث في المعجم عن صيغته المنشورة في `/de/`، ولا تبدّل «الحساوي» فيه). غينيس كما قرّرته الدفعة 1.
6. **اللومي ليم لا ليمون**: `Limette` لا `Zitrone`، ولا `schwarze Limette` أبداً؛ ومؤونته «الجميد» = اللومي المشمّس (sun-dried) — لا «أسود» ولا «مجفّف بالدخان».
7. **«Citrus»/«Atranj (Citron)»**: الأترنج `die Zitronatzitrone` (de.wikipedia) — اسم الثمرة المعروف بالألمانية في القوس، والعلم «Atranj» في العنوان كما في الإنجليزية (`titel_regel`).
8. **العربية الفيصل** حيث تختلف: قارن كل رقم ونسبة بالعربية؛ وإن اختلفت واقعة فخذ العربية وسجّلها `source_defect` في `notes`.
9. **«المجالس»** (guest majalis): مدخل المعجم **`der Madschlis (Empfangsraum)`** (موثَّق بـde.wikipedia، والگلوس بين القوسين هو گلوسه عند أول ورود) — لا `Diwaniyya` فهي مؤسسة أخرى، وجمعه بمصدره إن احتجته. **«التمر» (full dates)** مرحلة النضج الأخيرة مقابل الرطب — اتّسق مع گلوس «Rutab» المقرّر.
10. **«Bawakir — early & local varieties»**: الشرطة ⇐ U+2013 بمسافتين، و«& » ⇐ `und`.
11. **ما لا شاهد له لا يُضاف**: «أحد أكبر بنوك الجينات للنخيل في العالم» دعوى المصدر — تُنقل بتحوّطها («أحد») ولا تُضخَّم.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** (`Al-Ahsa-Oase`، `Hasawi-Limette`) · جنس نحوي لكل مدخل معجم جديد **بمصدره** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `pending` بلا artikel).
- **U+2013** للاعتراض بمسافتين (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`).
- لا «بانتظار التأكيد» ولا مرادفاتها (القرار 8). ممنوع Denglisch (`Superfood` · `Spot` · `Must-see`…).
- النصوص نصٌّ خام (لا ماركداون). لا تُحرَّر ملفات المستودع.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05) بالشكل نفسه للدفعة 1: `batch: "de-fruits-2"`، `stage`، `strings` (**المفاتيح الـ31 كلها وبترتيب `pack.json`**)، `termbase_additions`، `notes` (تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed`؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء** (سكربت node تكتبه بأداة Write): 31 مفتاحاً بالترتيب، لا U+00A0، لا U+2014، لا `du`/`dein`، لا حرف عربي/سيريلي/صيني، لا „schwarze Limette“ ولا „Zitrone“ للومي، ولا گلوس ثانٍ لـRutab. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
