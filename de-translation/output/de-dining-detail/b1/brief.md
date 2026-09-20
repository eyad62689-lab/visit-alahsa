# دفعة `de-dind-1` — سلاسل قالب الصفحة المفردة ومتون خمسة مطاعم (ج7، الدفعة 1 من 4)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining-detail/`)
TOOLS = أدوات الخط المؤقتة

## ما هذه الصفحة
`/de/restaurants-cafes/<slug>/` — صفحة المنشأة المفردة. بنيتها من أعلى لأسفل: فتات «كل المطاعم والمقاهي» ← صورة المنشأة ← تسمية النوع الصغيرة فوق الاسم (مطعم/مقهى/مخبز) ← **اسم المنشأة اللاتيني** عنواناً ← النبذة المنشورة من بطاقتها ← شارة «مفتوح الآن» والتقييم وأوقات العمل من خرائط Google ← **المتن** (فقرات) ← صندوق «الموقع» ← قائمة «معالم قريبة في الحيّ» ← صندوق «Über diese Seite» ← رابط العودة.

## النطاق — 12 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (**الفيصل** عند اختلاف واقعة) · `ctx` (**اقرأه لكل مفتاح** — فيه موضع السلسلة في الصفحة وقيودها).

1. **سبع سلاسل قالب** (`dv.*`) تظهر في **كل** صفحة منشأة ألمانية، لا في هذه الخمس وحدها: `dv.kindRestaurant` · `dv.kindCafe` · `dv.kindBakery` · `dv.backLabel` · `dv.areaH` · `dv.noteP` · `dv.sightsH`.
2. **خمسة متون** (`<id>.body`): `dar-basma` · `alkoot-hotel` · `alhawi` · `sinyar` · `greasy-fingers` — كلها مطاعم.

الملفات: `BATCH/pack.json` · `BATCH/context.json` · المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## المنشور سلفاً — ملزم حرفاً (في `context.json`)
- **فهرس المطاعم الألماني** `/de/restaurants-cafes/` (ج6، `published_dining_index_de_do_not_edit`): منه **بطاقات هذه المنشآت الخمس** (الموقع والنبذة والنص البديل) — الصفحة تعرض نبذة بطاقتها فوق المتن، **فلا يناقضها المتن ولا يكرّرها حرفاً**. ومنه أيضاً ما يبقى مقفلاً في القالب ولا يمرّ بهذه الدفعة: `indexName` = «Restaurants und Cafés» · `hoursH` = «Öffnungszeiten» · `hoursNote` · `ratingLabel` = «Bewertung bei Google Maps» · `openNow`/`closedNow` · `closedPerm`/`closedTemp` · `noteH` = «Über diese Seite» · `newWindow`.
- **قالب الإقامة المفرد الألماني** `/de/stay/alkoot-heritage-hotel/` (ج5، `published_stay_detail_de_do_not_edit`): **الشقيق البنيوي** — سلاسله السبع نفسها بأسماء المفاتيح نفسها (`kindLabel` · `backLabel` · `areaH` = «Lage» · `noteH` · `noteP`). ابنِ على نمطه ولا تخالفه بلا سبب.
- **أسماء الأحياء الألمانية** المنشورة (`DISTRICT_NAMES.de`، ج6): Al-Koot-Viertel · Historisches Zentrum von Hofuf · Al-Rifaa-Nord-Viertel · Al-Khalidiyah · Al-Rawdah · Al-Mazrou' · Al-Uwaimriyah-Viertel · Al-Olaya · Al-Khaleej-Straße · Al-Mubarraz — **تُستعمل حرفاً** حيثما ورد الحيّ في المتن.
- بنود **BINDING** من حكّام ج5 وج6 في `context.binding_from_previous_judges` — **ملزمة**، وأثقلها هنا: أسماء المنشآت **لا تُصرَّف** («bei/von <Name>»، و«des Al-Koot Heritage Hotel»)؛ «Kalligrafie» لا Kalligraphie؛ «im traditionellen Stil» للطابع التراثي الزخرفي و«Kulturerbe-» حيث يقول المصدر «heritage»؛ «Terrasse» لا «Freisitz»؛ النص البديل بلا نقطة ختامية.

## أفخاخ عامة لكل متن
1. **بنية الفقرات = بنية الإنجليزية حرفاً** (الحارس يعدّها). الإنجليزية هي المصدر ونطاقه؛ **والعربية فيصلٌ في الواقعة لا في النطاق** — فقرةٌ عربيةٌ زائدة لا تُضاف إلى الألمانية (مثالها الفقرة الرابعة في `alhawi` و`greasy-fingers`)، لكن **إن ناقضت العربيةُ الإنجليزيةَ في واقعة فالعربية هي الصواب** وتُبلَّغ العلّة.
2. **المتن نصٌّ خام**: لا ماركداون ولا روابط ولا تشديد (القالب يضع كل فقرة في `<p>` بذاتها — والحقول غير العربية تُصيَّر خاماً، ففخّ الموقع المعروف).
3. **اسم المنشأة لاتينيٌّ حرفاً** كما تسمّي نفسها، **وغير مصرَّف** (BINDING ج6): «bei Dar Basma»، «die Küche von Dar Basma» — لا «Dar Basmas Küche».
4. **لا اختلاق**: لا موعد ولا سعر ولا مسافة ولا سنة لا يقولها المصدر. والتحفّظ المصدريّ يُنقل لا يُحذف («We found no reliable source…»، «the absence of evidence is not evidence of absence»).
5. **سياج الأرقام آلي**: كل رقم في الألمانية يجب أن يرد في الإنجليزية أو العربية. الأرقام لاتينية، الفاصلة عشرية والنقطة للآلاف، والتقويم `1439 n. H. (2018 n. Chr.)`.
6. **الگلوس مرة واحدة في الصفحة** عند أول ورود — والصفحة هنا **صفحة المنشأة الواحدة**، فلكل متن گلوسه المستقلّ (لا يُحسب تكراراً عبر المتون، ويُحسب داخل المتن الواحد).
7. **Denglisch ممنوع** (Spot · Location · Guide · Must-see · Vibe)، و«Highlight» مرة واحدة على الأكثر.
8. **لا حكم جودة بلا مصدر** (beste · empfehlenswert · köstlich · lecker · berühmt · authentisch) — الحارس يُفشلها.

## أفخاخ هذه الدفعة
9. **`dv.sightsH`**: `{district}` يُستبدل وقت البناء بأحد الأسماء العشرة أعلاه — فالصياغة يجب أن تبقى نحويةً مع **كلها**؛ «in {district}» عارية خطأ («im Al-Koot-Viertel»، «im Historischen Zentrum von Hofuf»). الشقيق الروسي المنشور يحلّها بنقطتين. `{district}` يرد **مرة واحدة حرفاً**.
10. **`dv.noteP`** يختلف عن شقيقه المنشور في `/de/stay/`: يزيد **أوقات العمل** و**عدم ذكر الأصناف الموصى بها** (شقيقه يذكر الأسعار والنجوم). فلا تنسخه كاملاً، وابنِ عليه جملةَ «يصف ولا يوصي» بصيغة فعلية (BINDING ج5).
11. **`dv.kind*`** تسميات مفردة عارية تظهر فوق الاسم — وجمعُها منشور في مرشّح الفهرس (Restaurants · Cafés · Bäckereien)، فاتّسق معها.
12. **`dar-basma`**: «Manzil Al-Afsah» اسم البيت كما ينطقه المصدر — لاتينياً، ومعناه لا يُخترع. «the Qasr Ibrahim park» = حديقة بجوار القصر، وقد حُسمت صيغتها في `de-din-2` (سؤال 2: «Qasr-Ibrahim-Park») — **حرفاً**. «the line "the taste of home"» شعارٌ يُنقل بعلامتَي „…“. «Hasawi rice» ⇐ «Hasawi-Reis» المنشور. «Madinah» و«Makkah» لهما صيغتان ألمانيتان مستقرّتان في الخطة (`Medina` / `Mekka`) — تحقّق في المعجم أولاً. **الفقرة الأخيرة في الإنجليزية («Outdoor seating among the palms…») لا نظير لها في العربية** — الإنجليزية مصدرٌ والعربية لا تنقضها، فتُنقل؛ لكن **انتبه: هي جملة داخل فقرة الإنجليزية الواحدة لا فقرة مستقلة**.
13. **`alkoot-hotel`**: أثقل متون الدفعة. «963 square metres» و«1439 AH (2018 CE)» و«close to two hundred years» — سياج الأرقام. «Saudi Commission for Tourism and National Heritage» ⇐ **المعتمد في ج5: «Kommission für Tourismus und Nationalerbe»** حرفاً. «Prince Sultan bin Salman» و«Prince Saud bin Nayef» و«Abdulaziz bin Mohammed Al-Abdulqader» أسماءٌ لاتينية بنمط المعجم. «heritage inn» ⇐ المعجم **«das Kulturerbe-Gasthaus»** (ج5)، و«the first heritage hotel» ⇐ «Kulturerbe-Hotel» (ج6). «Qaisariyah Souq» و«Al-Fawaris Souq» ⇐ المعجم (**`Souk` لا Souq — `C18`**، و«der Al-Fawaris-Souk» منشور في ج5). الأطباق: «Hasawi rice» · «harees» · «marqooq» · «mufallaq» — الأولان منشوران («Hasawi-Reis» · «Harees»)، والآخران يحتاجان گلوساً مرة واحدة بمعنى **مسنَد** لا مخترَع. «about half a kilometre» = «etwa einen halben Kilometer». **«القصر» العربية مقابل «palace» الإنجليزية — والفندق نفسه اسمه «Al-Koot Heritage Hotel and Restaurant» في الإنجليزية، وبطاقته المنشورة تسمّيه «Al-Koot Heritage Hotel»** — وحّد ولا تخترع اسماً ثالثاً.
14. **`alhawi`**: اسم المنشأة في `name_en` هو **«Al Hawy»** (بلا شرطة، كما تسمّي نفسها) — يبقى حرفاً، ولا تُصلَح تهجئته إلى «Al-Hawi». الشرح اللغوي («al-hawi is the courtyard… the hawi of the home») **شرحُ مفردة محلية** يُنقل بوصفه كذلك، والكلمة المشروحة تُكتب مائلةً؟ **لا** — لا ماركداون؛ استعمل „…“ إن لزم. «zawara … drawn from ziyara, a visit» كذلك. «Futoor Al Hawy — breakfast at Al Hawy» يحمل ترجمةً داخل النص نفسه: أعد بناءها بالألمانية بلا حشو. «woven palm matting» ⇐ المعجم «die Palmwedel-Flechtwaren» (ج4) أو ما يوازيه — وقد ترجمتها بطاقة `alhawi` المنشورة سلفاً، **فاتّسق معها حرفاً**. «King Faisal University» ⇐ **«die König-Faisal-Universität»** (المعجم، بشاهد de.wikipedia).
15. **`sinyar`**: «sinyar» كلمة تراثية بحرية بثلاثة معانٍ في المصدر (سفن راسية · سفينتان تتصاحبان · ارتحال القوافل) — **تُنقل الثلاثة بلا دمج ولا تبسيط**. «a diving and pearl-fishing festival in Qatar» — «Katar» الاسم الألماني المستقر (اعتُمد في ج6 لـ«Katar-Straße»). «X» منصة: اسمها كما هو. «Al-Khaleej Road in Al-Uwaimriyah» ⇐ `dist.khaleej` = «Al-Khaleej-Straße» و`dist.uwaimriyah` = «Al-Uwaimriyah-Viertel» المنشورتان. «The restaurant itself has not stated why it chose the name» تحفّظٌ يُنقل.
16. **`greasy-fingers`**: «Greasy Fingers» و«Qreisi Feenqerz» — **الاسمان معاً وبحرفهما**، والجملة تشرح أن المنشأة تكتب اسمها العربي بالقاف؛ الألمانية تنقل الواقعة (تهجئة المنشأة لنفسها) بلا محاولة شرح الحرف العربي للقارئ الألماني بما لا يقوله المصدر. «Burger» كلمة ألمانية مستقرة. «the modern, quick end of this list» **وصفُ موقعٍ في القائمة لا توصية** — لا «Empfehlung» ولا «Tipp» ولا «beste». «metal trays» = «Metalltabletts». «the absence of evidence is not evidence of absence» تحفّظٌ يُنقل كما هو لا يُحذف.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · لا محارف ماركداون.
- **لا تُحرَّر ملفات المستودع** — مخرجك ملف JSON في `BATCH` وحده.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-dind-1"`، `stage`، `strings` (**المفاتيح الـ12 كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<TOOLS>/verify-stage.mjs" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
