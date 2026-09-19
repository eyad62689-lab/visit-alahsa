# دفعة `de-din-5` — بطاقات المقاهي الخمسة الباقية ومخابز الخبز الأحمر الأربعة في `/de/restaurants-cafes/` (ج6، الدفعة 5 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining/`)

## النطاق — 22 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (نوع المنشأة واسمها وحيّها — **اقرأه لكل مفتاح**).

البطاقات (9): `aknan` · `bun` · `volk` · `shylm` · `ouda` · `abu-fahd-alrabee` · `khudud-bakery` · `buhussain-bakery` · `bu-mubarak-bakery` — لكلٍّ `area` (سطر الموقع، حيث وُجد) و`blurb` (نبذة جملة واحدة تصف **ما تُظهره الصورة**) و`alt` (النص البديل للصورة). **عنوان البطاقة = اسم المنشأة اللاتيني** كما تسمّي نفسها (`name_en`، لا يُترجم ولا يمرّ بهذه الدفعة) — والقارئ يراه فوق النبذة.

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
7. **`aknan`**: «Jabal Al-Qarah» ⇐ المعجم **«der Qarah-Berg (Jabal al-Qarah)»**؛ «at the foot of Jabal Al-Qarah» و«the rock face of Jabal Al-Qarah» و«the rocks of Jabal Al-Qarah» — لا تكرار لاسم الجنس (`no_pleonasm`: لا «Jabal-al-Qarah-Berg»). «Al-Qarah» القرية (`dist.qarah` المعتمد). و«glass skylight set into the terrace floor / منوَر زجاجي في أرض التراس» — وصفٌ حرفي بلا تزيين.
8. **`bun` · `shylm` · `ouda`** بلا سطر موقع (لا حقل `area` في المصدر — لا تختلق موقعاً). أسماؤها لاتينية حرفاً: «Bun Café» · «SHYLM» · «OUDA» · «VOLK» (بالحروف الكبيرة كما تكتب نفسها). «Aknan Café».
9. **المخابز الأربعة**: «tannour / تنّور» ⇐ المعجم **«der Tanur (Lehmofen)»** والگلوس **حُسم موضعه في `de-din-1`** (`ix.bakeriesNote`/`ix.bakeriesEyebrow` — context.approved_prev): **لا گلوس ثانٍ** هنا. «floor tannour / تنّور أرضي» = تنور في الأرض. «Hasawi Red Bread» داخل اسم مخبز أبي فهد اللاتيني يبقى حرفاً كجزء من الاسم.
10. **أسماء المخابز** («Abu Fahd Al-Rabee Bakery for Hasawi Red Bread» · «Al-Khudud Traditional Bakery» · «Bu Hussain Traditional Bakery» · «Bu Mubarak Traditional Bakery») تسميات لاتينية بها تظهر البطاقة عنواناً — **وسابقة الروسية المنشورة: يبقى المقطع اللاتيني في النص البديل حرفاً كما في المصدر** («Гостиная Bu Hussain Traditional Bakery…»). فلا تُترجم داخل النص البديل.
11. **`bu-mubarak-bakery.blurb`** «crenellations and protruding beams / بشُرفات وجذوع بارزة» ⇐ مصطلح معماري ألماني صحيح (Zinnen) بلا «Schießscharten» ولا وظيفة لا يقولها المصدر؛ «mud-plaster» بالمعجم («Lehm»، «Lehmputz») — والصيغة نفسها ترد في بطاقة `baithana` بدفعة موازية (`de-din-4`)، فسجّل اختيارك في notes ليوحّده المنسّق.
12. **`abu-fahd-alrabee.area`** «near Ain Al-Khudud / قرب عين الخدود» — «عين» = نبع؛ نمط المعجم «Ain Najm (die Najm-Quelle)» — مدخل جديد بمصدره.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel). الطرق والأحياء بلا أداة تُسجَّل على سابقة المعجم.
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي**.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-din-5"`، `stage`، `strings` (**المفاتيح الـ22 كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
