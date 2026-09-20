# دفعة `de-din-1` — إطار فهرس المطاعم والمقاهي `/de/restaurants-cafes/` (ج6، الدفعة 1 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining/`)

## النطاق — 32 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| الهيرو وعناوين الأقسام (10) | `ix.heroEyebrow` · `ix.title` · `ix.heroSum` · `ix.listEyebrow` · `ix.listH` · `ix.cafesEyebrow` · `ix.cafesH` · `ix.bakeriesEyebrow` · `ix.bakeriesH` · `ix.bakeriesNote` |
| واجهة البطاقة (6) | `ix.newWindow` · `ix.moreLabel` · `ix.hoursLabel` · `ix.ratingLabel` · `ix.closedPerm` · `ix.closedTemp` |
| البحث والتصفية والعدّاد (14) | `ix.searchPh` · `ix.searchLabel` · `ix.kindAria` · `ix.kindRestaurants/Cafes/Bakeries` · `ix.districtLabel` · `ix.districtAll` · `ix.openNow` · `ix.closedNow` · `ix.openFilter` · `ix.countPrefix` · `ix.countSuffix` · `ix.emptyMsg` |
| ملاحظات Google (2) | `ix.hoursNote` · `ix.srcNote` |

**ما لا يُترجم هنا**: الأسئلة الشائعة وصندوق المنهج وأسماء الأحياء (دفعة `de-din-2` الموازية)، والبطاقات (الدفعات 3–5)، وزرّ «In Google Maps öffnen ↗» (`det.openMaps` منشور)، ورقاقة «Alle» (`list.all` منشور)، والفتات «Startseite». **عنوان التبويب** = `ix.title` + « – » + «Visit Al-Ahsa»، و**الوصف** = `ix.heroSum` نفسه. أسماء المنشآت على البطاقات لاتينية كما تسمّي نفسها.

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + مداخل ذات صلة + أزواج ذاكرة + الجيران المنشورون في `ui.de` + **كتلة `/de/stay/` المنشورة** + كتلة `/de/food/` وبطاقات أطباقها + بنود BINDING التسعة من حاكم ج5). المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **`ix.title`** هو H1 والفتات وعنوان التبويب واسم `ItemList`. المنشور في الترويسة والتذييل `nav.dine` = **«Restaurants und Cafés»** (والمعجم: `die Gastronomie · Restaurants und Cafés`) — الـH1 يطابقه حرفاً (القارئ الأعمى أمسك سابقاً «الصفحة تناقض نفسها» حين افترقت التسمية). `ix.searchLabel` يسمّي المحتوى نفسه فيتّسق معه.
2. **صيغ Google Maps مقفلة** (BINDING من ج5، منشورة على `/de/stay/` — الحارس يطابقها حرفاً): `ix.newWindow` = «(öffnet Google Maps in einem neuen Fenster)» · `ix.ratingLabel` = «Bewertung bei Google Maps» · `ix.closedPerm` = «Dauerhaft geschlossen – laut Google Maps» · `ix.closedTemp` = «Vorübergehend geschlossen – laut Google Maps». و**`ix.srcNote`** يوسّع صيغة `/de/stay/` («Bewertungen von Google Maps – zuletzt aktualisiert {date}») بإضافة أوقات العمل وحدها، والذيل «– zuletzt aktualisiert {date}» ثابت (الحارس يشترطه). `{date}` مرة واحدة حرفياً.
3. **«hand-picked / مختارة»** (`ix.listH` · `ix.cafesH` · `ix.heroSum`) = مختارة للقائمة **لا «الأفضل»** — الصفحة نفسها تقول في أسئلتها إنها لا ترتّب ولا توصي (BINDING: «beschreibt nur, ohne zu empfehlen» · «Wir bevorzugen keine … gegenüber …»). والحارس يُفشل «beste/empfehlenswert/köstlich/berühmt» بلا مصدر. `ix.listH` و`ix.cafesH` متوازيتان بنية.
4. **`ix.listEyebrow`** «The first batch / الدفعة الأولى» = المجموعة الأولى من الأماكن المدرجة — المنشور على `/de/stay/` لنظيرها **«Die erste Gruppe»**: اتّسق معه ما لم يمنع مانع.
5. **الخبز الأحمر وخبز التمر (`C5b`)**: الموقع ينشر الزوج الألماني **„rotes Brot“ / Dattelbrot** (بطاقة الطبق على `/de/food/`: «Auch als „rotes Brot“ (khubz ahmar) bekannt»). والحارس `C5b` يُفشل البناء إن ظهرت «rotes Brot» في صفحة بلا «Dattelbrot» — **`ix.bakeriesNote` هو موضع الاقتران في هذه الدفعة ويجب أن يحمل الاسمين معاً** («Red bread and date bread are one and the same»). `ix.bakeriesH` و`ix.heroSum` يسمّيان «rotes Brot»/مخابزه؛ صرّف الصفة صحيحاً (rotes/roten Brotes…). **لا گلوس «khubz ahmar» ثانٍ** إن لم يلزم (الگلوس مرة لكل مصطلح في الصفحة، ومقرّه المتن لا العنوان).
6. **«tannour / التنّور»** = المعجم **`der Tanur (Lehmofen)`**. الگلوس «(Lehmofen)» مرة واحدة في الصفحة عند **أول ورود في نصّ جارٍ** لا في عنوان أو سطر علوي — فـ`ix.bakeriesEyebrow` (سطر علوي) يسمّي «Tanur» بلا گلوس، و`ix.bakeriesNote` («clay ovens / التنانير») هو المتن الأول: قرّر أين يقع الگلوس وسجّله في notes. ولا تختلق وصفاً للتنّور ليس في المصدر.
7. **`ix.heroSum`** = الوصف في نتائج البحث أيضاً: كامل الوقائع أولاً (مطاعم ومقاهٍ ومخابز الخبز الأحمر · في Hofuf وAl-Mubarraz وما حولهما · من الأجواء التراثية والأكل الشعبي إلى الأماكن العصرية والقهوة المختصة · صورة وموقع في Google Maps · بضغطة واحدة · والقائمة تنمو)، والطول ثانياً. «Al Ahsa»/«Hofuf» بلا شرطة في الإنجليزية تهجئة سيو مقصودة — **الألمانية «Al-Ahsa» و«Hofuf» (المعجم) دائماً**. «heritage settings» ⇐ البادئة `Kulturerbe-` خاصة بـ«heritage» في المعجم؛ «modern spots» ⇐ **لا «Spots»** (Denglisch ممنوع). «specialty coffee / القهوة المختصة» ⇐ ابحث عن الصيغة المستقرة في الكتابة الألمانية عن المقاهي وسجّل شاهدها (لا تخمين).
8. **العدّاد**: يُصيَّر `ix.countPrefix` + الرقم + « » + `ix.countSuffix` («Showing 12 of 29» / «المعروض: 12 من 29»). `{n}` مرة واحدة حرفياً في `ix.countSuffix`، و`ix.countPrefix` ينتهي بمسافة.
9. **`ix.emptyMsg`** يقتبس `ix.districtAll` حرفياً بـ„…“ (الحارس يشترطه). **`ix.districtLabel`** «Area / الموقع» تسمية قائمة منسدلة خياراتها أحياء وطرق ومدن (Al-Koot-Viertel · Al-Khaleej-Straße · Al-Mubarraz) — لا «Bezirk» (إداري)؛ والمنشور `det.area` = «Lage» جارٌ يُستأنس به.
10. **`ix.openNow` · `ix.closedNow` · `ix.openFilter`** شارة حيّة ورقاقة تصفية؛ متوازية. `ix.hoursNote` بصيغة **Sie** («prüfen Sie …»)، و«the place’s link» = رابط Google Maps على البطاقة.
11. **`ix.heroEyebrow`** «From the tables of Al-Ahsa / من موائد الأحساء»: المنشور على `/de/food/` «Von der Oasentafel» — لا تكرّره حرفاً (صفحتان متجاورتان في التنقّل)، ولا تبتعد عن المصدر.
12. **`ix.moreLabel`** بلا سهم (القالب يضيف →)، والمنشور على `/de/stay/` «Details zum Ort» — اتّسق معه (المصدر واحد: «Place details»). **`ix.searchPh`** ينتهي بـ«…».

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي**.
- ممنوع Denglisch: `Event(s)` · `Spot(s)` · `Location` · `Must-see` · `Hotspot` · `Guide`.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-din-1"`، `stage`، `strings` (**المفاتيح الـ32 كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
