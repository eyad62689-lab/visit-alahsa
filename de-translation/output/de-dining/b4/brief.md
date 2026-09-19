# دفعة `de-din-4` — بطاقات المقاهي العشرة الأولى في `/de/restaurants-cafes/` (ج6، الدفعة 4 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining/`)

## النطاق — 30 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (نوع المنشأة واسمها وحيّها — **اقرأه لكل مفتاح**).

البطاقات (10): `baithana` · `7st` · `bait-alkoot` · `dar-huwaija` · `alsayed` · `ratio-alkoot` · `soulaf` · `baking-up` · `dot-bakery` · `karak-raslan` — لكلٍّ `area` (سطر الموقع، حيث وُجد) و`blurb` (نبذة جملة واحدة تصف **ما تُظهره الصورة**) و`alt` (النص البديل للصورة). **عنوان البطاقة = اسم المنشأة اللاتيني** كما تسمّي نفسها (`name_en`، لا يُترجم ولا يمرّ بهذه الدفعة) — والقارئ يراه فوق النبذة.

إطار الصفحة والأسئلة وأسماء الأحياء **معتمدة** من `de-din-1` و`de-din-2` (‏`context.json → approved_prev` مع بنود BINDING من حاكمَيهما) — **ملزمة**: كل حيّ أو طريق أو مصطلح حُسم هناك يُستعمل هنا حرفاً.

الملفات: `BATCH/pack.json` · `BATCH/context.json` · المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## أفخاخ عامة لكل البطاقات
1. **اسم المنشأة اللاتيني يبقى حرفاً** حيث يرد في المصدر (الحارس يُفشل تغيير الاسم الكامل)، بلا شرطة داخل الاسم (BINDING ج5). وفي النص البديل يبقى المقطع اللاتيني كما في الإنجليزية.
2. **النبذة تصف الصورة لا المكان**: لا حكم جودة ولا ترتيب ولا توصية ولا صنف لا يسمّيه المصدر (الحارس: beste · empfehlenswert · köstlich · lecker · berühmt). ولا اختلاق تفصيلة ليست في الإنجليزية أو العربية — **وما تزيده العربية واقعةً يُنقل** (العربية الفيصل).
3. **النص البديل وظيفيٌّ بسيط** (BINDING ج5): لا صفتان زخرفيتان متراكبتان، والنص البديل لا يعيد النبذة حرفاً إن اختلف مصدراهما.
4. **سطر الموقع** بصيغة المصدر: «X – Y» بشرطة U+2013 بمسافتين. الأحياء بالصيغ المعتمدة في `dist.*` حرفاً؛ الطرق بنمط المعجم («König-Abdulaziz-Straße»، «Al-Khaleej-Straße»، «Ain-Najm-Straße») وكل طريق جديد مدخلُ معجم بمصدره؛ «Hofuf» بلا أداة.
5. **الاتّساق بين البطاقات**: العبارة الإنجليزية الواحدة تُنقل بصيغة ألمانية واحدة عبر البطاقات (façade · outdoor seating · glass roof · lit sign · mud-plastered · heritage…). و«heritage / تراثي» ⇐ البادئة `Kulturerbe-` خاصة بـ«heritage» في المعجم — لكنها ثقيلة في وصف أثاث؛ قرّر صيغة واحدة للصفة («im traditionellen Stil»؟ «historisch anmutend»؟) وسجّلها في notes، والحاكم يبتّ.
6. **Denglisch ممنوع**: لا «Spot» ولا «Location»؛ و«Café/Cafés» بالعلامة كما في H1 المنشور.

## أفخاخ هذه الدفعة
7. **«North Al-Rifaa — Hofuf»** (أربع بطاقات) و**«Historic downtown Hofuf»** (ثلاث) هما `dist.rafah-north` و`dist.downtown` المعتمدان في `de-din-2` — **الصيغ هناك حرفاً** (الإنجليزية تتهجّى الحيّ الأول بطريقتين؛ الألمانية واحدة). «King Fahd Road» و«King Abdulaziz Road» و«Ain Najm Road» كما اعتُمدت في أسئلة `de-din-2`، و«King Abdullah Road» بالنمط نفسه. «Al-Khaleej Road (Qatar Road)» ⇐ «Al-Khaleej-Straße» المعتمدة و«Qatar Road» بالنمط («Katar» الاسم الألماني المستقر للدولة).
8. **`7st.blurb`** «Specialty coffee / قهوة مختصة» ⇐ الصيغة التي حسمتها `de-din-1` في `ix.heroSum` حرفاً (context.approved_prev). والاسم «7st» يبقى كما هو.
9. **`bait-alkoot.blurb`** «A Hasawi-style house» ⇐ المعجم لصفة Hasawi المركّبة («Hasawi-»، وsابقة «architektonische Motive aus Al-Ahsa»)؛ «in the historic heart of Hofuf» قريبة من `dist.downtown` لكنها وصف لا تسمية — لا تُلزمها الصيغة.
10. **`ratio-alkoot`** «Arabian majlis» (الموجز) و«traditional majlis» (البديل) — المعجم/المنشور «Madschlis (Empfangsraum)» سابقةُ گلوس (ج5)؛ **الگلوس مرة واحدة في الصفحة** — والصفحة واحدة لكل البطاقات، فقرّر موضعه (أول ورود في النصّ الجاري للبطاقة) ولا تكرّره في النص البديل. «palm-trunk ceiling» ⇐ المنشور «Palmstämme» (ج5: «Decken aus Palmstämmen»).
11. **`baking-up.blurb`** «as it calls itself on Google Maps» — الصفة كما تعرّف المنشأة نفسها؛ صياغة «laut eigener Beschreibung in Google Maps» أو ما يوازيها بلا ادعاء. والعربية تزيد «وجلسات خارجية» على الموجز الإنجليزي — العربية الفيصل في الواقعة (والنص البديل الإنجليزي يذكرها).
12. **`karak-raslan`** «Karak» شايٌ بالحليب والتوابل؛ ابحث في المعجم، وإلا اسم عربي ⇐ **گلوس مرة واحدة** بمعنى مسنَد (لا وصفة يخترعها المترجم). الاسم «Raslan».
13. **`soulaf.alt`** «slatted ceiling» والعربية «سقفها الخشبي» — لا تنقض إحداهما الأخرى («Lamellendecke aus Holz» أو ما يوازيها). «skylight» في الموجز = «فتحة سماوية».

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel). الطرق والأحياء بلا أداة تُسجَّل على سابقة المعجم.
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي**.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-din-4"`، `stage`، `strings` (**المفاتيح الـ30 كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
