# دفعة `de-dind-2` — متون أربعة مطاعم ومقهى (ج7، الدفعة 2 من 4)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining-detail/`)
TOOLS = أدوات الخط المؤقتة

## ما هذه الصفحة
`/de/restaurants-cafes/<slug>/` — صفحة المنشأة المفردة. بنيتها من أعلى لأسفل: فتات «Alle Restaurants und Cafés» ← صورة المنشأة ← تسمية النوع الصغيرة فوق الاسم ← **اسم المنشأة اللاتيني** عنواناً ← نبذة بطاقتها المنشورة ← شارة «Jetzt geöffnet» والتقييم وأوقات العمل من خرائط Google ← **المتن** (فقرات) ← صندوق «Lage» ← قائمة «Sehenswürdigkeiten in der Nähe: …» ← صندوق «Über diese Seite» ← رابط العودة.

**إطار الصفحة كلّه معتمدٌ في `de-dind-1`** (‏`context.approved_prev` مع بنود BINDING من حاكمها) — **ملزم حرفاً**. هذه الدفعة **متون فقط**.

## النطاق — 5 متون (`BATCH/pack.json → strings`)
`lava` · `ammo` · `sharq-alqaisariah` · `koud` (مطاعم) · `baithana` (مقهى).
لكل مفتاح: `en` (المصدر) · `ar` (**الفيصل** عند اختلاف واقعة) · `ctx` (**اقرأه لكل مفتاح**).

الملفات: `BATCH/pack.json` · `BATCH/context.json` · المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## المنشور سلفاً — ملزم حرفاً (في `context.json`)
- **بطاقات هذه المنشآت الخمس** على الفهرس الألماني (ج6): الموقع والنبذة والنص البديل — الصفحة تعرض نبذتها فوق المتن، **فلا يناقضها المتن ولا يكرّرها حرفاً**.
- **أسماء الأحياء الألمانية** المنشورة: Al-Koot-Viertel · Historisches Zentrum von Hofuf · Al-Rifaa-Nord-Viertel · Al-Khalidiyah · Al-Rawdah · Al-Mazrou' · Al-Uwaimriyah-Viertel · Al-Olaya · Al-Khaleej-Straße · Al-Mubarraz — **حرفاً**.
- **أسماء الطرق** المعتمدة في المعجم: «die König-Abdullah-Straße» · «die König-Abdulaziz-Straße» · «die König-Fahd-Straße» · «die Ain-Najm-Straße» · «die Prinz-Nawwaf-Straße» · «die Katar-Straße».
- بنود **BINDING** من حكّام ج5 وج6 وج7/b1 في `context.binding_from_previous_judges` و`context.approved_prev` — **ملزمة**، وأثقلها هنا: أسماء المنشآت **لا تُصرَّف**؛ **«Kalligrafie»** لا Kalligraphie؛ «im traditionellen Stil» للطابع التراثي الزخرفي و«Kulturerbe-» حيث يقول المصدر «heritage»؛ «Terrasse» لا «Freisitz».

## أفخاخ عامة لكل متن
1. **بنية الفقرات = بنية الإنجليزية حرفاً** (الحارس يعدّها). الإنجليزية هي المصدر **ونطاقه**؛ **والعربية فيصلٌ في الواقعة لا في النطاق** — فقرةٌ عربيةٌ زائدة لا تُضاف (وهي هنا في `lava` و`ammo` و`koud`: مقارنةٌ بجيران من القائمة، وعنوانٌ مرقّم في `ammo`)، لكن **إن ناقضت العربيةُ الإنجليزيةَ في واقعة فالعربية هي الصواب** وتُبلَّغ العلّة.
2. **المتن نصٌّ خام**: لا ماركداون ولا روابط ولا تشديد.
3. **اسم المنشأة لاتينيٌّ حرفاً وغير مصرَّف**: «bei Lava»، «die Karte von Code» — لا «Lavas Karte».
4. **لا اختلاق**: لا موعد ولا سعر ولا مسافة ولا سنة لا يقولها المصدر. والتحفّظ المصدريّ **يُنقل لا يُحذف** — وفي هذه الدفعة ثلاثة: `ammo` («no explanation from the business itself and none in any reliable source»)، `koud` («no year of opening in any reliable source»)، `baithana` («no reliable source giving the year it opened, and none explaining the name»).
5. **سياج الأرقام آلي**: كل رقم ألماني وارد في الإنجليزية أو العربية. أرقام لاتينية، فاصلة عشرية ونقطة للآلاف، والتواريخ `Januar 2024`.
6. **الگلوس مرة واحدة داخل المتن الواحد** عند أول ورود (والصفحة هنا صفحة المنشأة، فلكل متن گلوسه المستقل).
7. **Denglisch ممنوع** (Spot · Location · Guide · Must-see · Vibe)، و«Highlight» مرة واحدة على الأكثر. «Brunch» مدخلُ Duden فلا يُعدّ Denglisch، وكذلك «Chocolate» داخل اسم علم.
8. **لا حكم جودة بلا مصدر** (beste · empfehlenswert · köstlich · lecker · berühmt · authentisch) — الحارس يُفشلها.

## أفخاخ هذه الدفعة
9. **`lava`**: «Lava Chocolate» **نشاطٌ آخر للعلامة نفسها لا فرعٌ لهذا المطعم** — الجملة تفسّر ورود الاسمين معاً، فلا تُبسَّط إلى «فرع». «Khobar» — تحقّق من الصيغة الألمانية المستقرّة (de.wikipedia) قبل النقحرة، ومدخلُ معجم بشاهده. «iron skillets» = مقالٍ حديدية تصل ساخنة (وصفٌ حرفي بلا تزيين)، «marble tables» = طاولات رخامية. «no heritage character» ⇐ نفيُ الطابع التراثي: صيغته المعتمدة في ج6 للإثبات «im traditionellen Stil» — فالنفي يُبنى عليها. الحيّ والطريق: `Al-Olaya` و`Al-Khaleej-Straße` المنشورتان.
10. **`ammo`**: الاسم يُكتب «Ammo» و«AMMO» — **كلاهما في الجملة الأخيرة وبحرفه**، ولا تُوحَّد. «an international kitchen» و«different tastes from all over the world» شعارٌ يُنقل بعلامتَي „…“. «a well-appointed building with a glass frontage crowned by its illuminated sign» — «فاخر» في العربية صفة المبنى لا حكم جودة على المطعم. «Brunch, lunch and dinner» ثلاثتها. «digital menu» = قائمة رقمية. الطريق «die König-Abdullah-Straße» والحيّ «Al-Mazrou'» (بأبوستروف آسكي، منشور).
11. **`sharq-alqaisariah`** — أثقل متون الدفعة: «Sharq Restaurant» هو **الاسم الرسمي**، و«Qaisariyah» **تسمية الفرع لا جزءٌ من الاسم** (جملة صريحة في المصدر، تُنقل بدقّتها). «the historic Hamidiyah Souq» ⇐ **`Souk` لا Souq (`C18`)**، وصيغة الاسم بنمط المعجم («der Al-Fawaris-Souk» منشور). الأطباق: «harees balls» و«shrimp fatteh» و«aysh» (كلمة يسمّي بها المطعم قسم أطباقه الرئيسية — **تُنقل بحرفها مع گلوس مسنَد مرة واحدة**) و«Hasawi rice» ⇐ **«Hasawi-Reis» المنشور** و«sleeq lamb shanks» و«Hasawi majboos» و«Rayouq Sharq» (اسم قسم الفطور — يبقى بحرفه) و«balaleet» ⇐ **«Balaleet» المنشورة في `/de/food/`** و«date cake» = كيكة التمر (لا «Dattelbrot» — طبقٌ آخر). «Diriyah» و«Abha» و«The Valley»: تحقّق من الصيغة الألمانية المستقرّة لكلٍّ (de.wikipedia) قبل النقحرة؛ و«The Valley» اسم مجمّع لاتيني يبقى كما هو. «Harees» منشورة بهذا الرسم.
12. **`koud`**: الاسم المعتمد **«Code»** (لاتينياً) و«Kod» هي كتابة المنشأة بالعربية — والجملة تقول صراحةً إن «Koud» نقحرةٌ شائعة **غير معتمدة**؛ انقل الواقعة الثلاثية كما هي. **انتبه: مُعرّف الملف نفسه `koud`** — لا يظهر في النص. «illuminated Arabic lettering» / «حروف مضيئة بالخط العربي» ⇐ **«Kalligrafie»** بهذا الرسم (BINDING ج6). «a refined register» = طابع فاخر (وصف القائمة لا حكم جودة). الطريق والحيّ كما في `ammo` حرفاً.
13. **`baithana`**: «Baithana» اسم المقهى، و«Bethanah Chalet» **منشأة أخرى** — الرسمان مختلفان في المصدر عمداً، **ولا يُوحَّدان**. «in its own words, beside Qasr Ibrahim» مقابل عنوان خرائط Google في «North Al-Rifaa» ⇐ **`Al-Rifaa-Nord-Viertel` المنشور**، «the quarter bordering Al-Koot» ⇐ **`Al-Koot-Viertel` المنشور**. «mud-plastered house with a wooden door» — **بطاقة `baithana` الألمانية المنشورة تترجمها سلفاً** («lehmverputztes Haus mit Holztür»): اتّسق معها ولا تنسخ الجملة حرفاً فتصير الصفحة تكراراً. «a fine morning flavour begins here» شعارٌ بعلامتَي „…“.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · لا محارف ماركداون.
- **لا تُحرَّر ملفات المستودع** — مخرجك ملف JSON في `BATCH` وحده.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-dind-2"`، `stage`، `strings` (**المفاتيح الخمسة كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<TOOLS>/verify-stage.mjs" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
