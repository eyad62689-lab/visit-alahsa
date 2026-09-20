# دفعة `de-dind-3` — متون خمسة مقاهٍ (ج7، الدفعة 3 من 4)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining-detail/`)
TOOLS = أدوات الخط المؤقتة

## ما هذه الصفحة
`/de/restaurants-cafes/<slug>/` — صفحة المنشأة المفردة. بنيتها من أعلى لأسفل: فتات «Alle Restaurants und Cafés» ← صورة المنشأة ← تسمية النوع الصغيرة فوق الاسم ← **اسم المنشأة اللاتيني** عنواناً ← نبذة بطاقتها المنشورة ← شارة «Jetzt geöffnet» والتقييم وأوقات العمل من خرائط Google ← **المتن** (فقرات) ← صندوق «Lage» ← قائمة «Sehenswürdigkeiten in der Nähe: …» ← صندوق «Über diese Seite» ← رابط العودة.

**إطار الصفحة كلّه معتمدٌ في `de-dind-1`** (‏`context.approved_prev`) — **ملزم حرفاً**. هذه الدفعة **متون فقط**.

## النطاق — 5 متون (`BATCH/pack.json → strings`)
`7st` · `bait-alkoot` · `dar-huwaija` · `alsayed` · `ratio-alkoot` — كلها مقاهٍ، **وأربعة منها في حيّ الكوت التاريخي أو داخل سوق القيصرية**، فالاتّساق بينها أشدّ لزوماً من أي دفعة سابقة.
لكل مفتاح: `en` (المصدر) · `ar` (**الفيصل** عند اختلاف واقعة) · `ctx` (**اقرأه لكل مفتاح**).

الملفات: `BATCH/pack.json` · `BATCH/context.json` · المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## المنشور سلفاً — ملزم حرفاً (في `context.json`)
- **بطاقات هذه المنشآت الخمس** على الفهرس الألماني (ج6): الموقع والنبذة والنص البديل — الصفحة تعرض نبذتها فوق المتن، **فلا يناقضها المتن ولا يكرّرها حرفاً**.
- **من المعجم** (تحقّق منه بنفسك، هذه أمثلة لا حصر): «der Qaisariyah-Souk» · «die Al-Jabri-Moschee» · «der Madschlis (Empfangsraum)» · «der Bischt (traditioneller Umhang)» · «Al-Uqair» · «die Al-Salam-Straße» · «Al-Koot-Viertel» · «Historisches Zentrum von Hofuf».
- بنود **BINDING** من حكّام ج5 وج6 وج7/b1 في `context.binding_from_previous_judges` و`context.approved_prev` — أثقلها هنا: أسماء المنشآت **لا تُصرَّف** («des Al-Koot Heritage Hotel»)؛ **«Kalligrafie»**؛ «im traditionellen Stil» للطابع التراثي الزخرفي و«Kulturerbe-» حيث يقول المصدر «heritage»؛ «Terrasse» لا «Freisitz»؛ «freistehende Bartheke».

## أفخاخ عامة لكل متن
1. **بنية الفقرات = بنية الإنجليزية حرفاً** (الحارس يعدّها). الإنجليزية هي المصدر **ونطاقه**؛ **والعربية فيصلٌ في الواقعة لا في النطاق** — فما زادته العربية شرحاً لا يُضاف، **وما زادته الإنجليزية على العربية يُنقل** (وفي هذه الدفعة: جملة المتجر الإلكتروني آخر `dar-huwaija` لا نظير لها في العربية، وهي في المصدر فتُنقل).
2. **المتن نصٌّ خام**: لا ماركداون ولا روابط ولا تشديد.
3. **اسم المنشأة لاتينيٌّ حرفاً وغير مصرَّف**.
4. **لا اختلاق**: لا موعد ولا سعر ولا مسافة ولا سنة لا يقولها المصدر.
5. **سياج الأرقام آلي**: كل رقم ألماني وارد في الإنجليزية أو العربية. التواريخ `Mai 2024` · `November 2024`؛ والمساحات `150 Quadratmeter`.
6. **الگلوس مرة واحدة داخل المتن الواحد** عند أول ورود — **وأربعة من هذه المتون تتشارك المصطلحات نفسها** (الكوت · القيصرية · قصر إبراهيم · مسجد الجبري): الصيغة واحدة عبرها، والگلوس يُعاد في كل متن لأن كلاًّ منها صفحةٌ مستقلة يقرؤها زائر لم يقرأ سواها.
7. **Denglisch ممنوع** (Spot · Location · Guide · Must-see · Vibe)، و«Highlight» مرة واحدة على الأكثر. «Espresso» و«Croissant» مدخلا Duden.
8. **لا حكم جودة بلا مصدر** (beste · empfehlenswert · köstlich · lecker · berühmt · authentisch) — الحارس يُفشلها.

## أفخاخ هذه الدفعة
9. **`7st`**: الاسم **يُكتب بالصيغتين معاً** («Maqha Shari' 7 alongside 7st») — انقل الواقعة بحرفها ولا تُوحِّد. فرعاه يسمّيهما بنفسه: «7st Al-Bait» و«7st Al-Kinnah» — لاتينيان حرفاً. «the Al-Salam district on the Golden Belt»: **حيّ** السلام لا شارعه (المعجم فيه «die Al-Salam-Straße» — **لا تخلط**)، و«الحزام الذهبي» طريقٌ دائري يُنقل بوصفه اسماً (مدخل معجم بشاهد أو `pending`). «the oldest [quarter] in Hofuf» و«Al-Jabri Mosque» ⇐ **«die Al-Jabri-Moschee»** و«the Qaisariyah Souq» ⇐ **«der Qaisariyah-Souk»** (`Souk` لا Souq — `C18`). «within the walking circuit of the old town» — مقدارٌ نسبي لا مسافة: **لا تحوّله إلى دقائق أو أمتار**. «specialty coffee» ⇐ **«der Spezialitätenkaffee»** (معتمد في ج6). «stained-glass window» = نافذة من الزجاج الملوّن.
10. **`bait-alkoot`**: «Al-Shayeb Engineering Consultancy» اسم مكتبٍ — لاتينيٌّ بنمط المعجم مع مقابلٍ وصفيّ للنوع. «placing it in what it called the heart of the historic city of Hofuf» **اقتباسٌ منسوبٌ للمكتب** — علامتا „…“ والنسبة تبقى. **الفقرة الأخيرة عمودها الفقري التفريق بين ثلاث منشآت** تحمل «Al-Koot» ولا صلة بينها: «Bait Al-Koot» و«Ratio Al-Koot» (داخل السوق) و«Al-Koot Heritage Hotel» (مقابل القصر) — الأسماء الثلاثة لاتينية حرفاً، وبناء الجملة يجب أن يُبقي التفريق صريحاً لا ضمنياً. **انتبه**: «the fort» هنا = قصر إبراهيم (سابقة ج6: العربية «القصر» هي الفيصل).
11. **`dar-huwaija`**: شرحٌ لغويٌّ عمود المتن — «huwaija is the diminutive of haja, a thing one needs» و«a warm ring tied to grandmothers». انقله بوصفه شرحاً لمفردة عربية (لا ماركداون؛ „…“ إن لزم)، **ولا تخترع اشتقاقاً ألمانياً موازياً**. «bisht cloaks» ⇐ **«der Bischt (traditioneller Umhang)»** (المعجم — والگلوس مرة واحدة). «palm-frond work» ⇐ سابقة «die Palmwedel-Flechtwaren» (ج4). «the produce of the oasis» = خيرات الأحساء. «a section it calls the art shop» = «دكان الفن» — **تسميةٌ تُنسب للدار**، فعلامتا „…“ والنسبة. «named local artisans and artists» = بأسمائهم. **الجملة الأخيرة** («It also ships through an online store, so a visit is one way to reach it rather than the only one») في الإنجليزية وحدها — تُنقل، وهي **نفيُ حصرٍ لا دعوة**.
12. **`alsayed`** — أثقل متون الدفعة: **«Saudi Commission for Tourism and Antiquities» (الهيئة العامة للسياحة والآثار) جهةٌ باسمٍ ثالثٍ غير الاسمين في المعجم** («die Kommission für Tourismus und Nationalerbe» و«die Kommission für Tourismus und Kulturerbe») — **لا تُسقطها على أحدهما**: تحقّق من الاسم الألماني المستعمَل لهذه الهيئة بمصدر، وأضفها مدخلاً جديداً بجنسها وشاهدها (أو `pending` بلا artikel). «Al-Sayed Hassan Al-Hussein» و«Ali Al-Haji, then director of the Al-Ahsa branch» — أسماءٌ لاتينية والصفة الزمنية «آنذاك» تبقى. «a tourism product supporting heritage travel» **وصفٌ منسوبٌ للتغطية الصحفية** لا حكمٌ للموقع. «built in the old style and with old materials, its doors and windows among them» — و«some 150 square metres» تقريبٌ يُنقل تقريباً. «its gateway was designed after the gate of the historic Al-Uqair port» ⇐ **«Al-Uqair»** المنشور. **أحياء الهفوف القديمة الخمسة**: «Al-Koot» ⇐ المنشور، و«Al-Naathil» ⇐ ابحث في المعجم (منشور برسمٍ فيه أبوستروف) و«Al-Fawaris» ⇐ سابقة «der Al-Fawaris-Souk» و«Al-Fareeq Al-Shamali» و«Al-Hillah» — لاتينية بنمط المعجم، **ولا تُترجم أسماء الأحياء**. «sitting rooms in the local majlis tradition» ⇐ **«der Madschlis (Empfangsraum)»** (گلوس مرة واحدة). الأطباق «balilah» · «bajilla» · «kleija» · «zalabia» أسماءٌ عربية لا مقابل ألماني لها: تُنقل بحرفها، **وگلوسٌ مسنَدٌ مرة واحدة لما تجد له سنداً فقط** — ما لا سند له يبقى بلا گلوس (لا وصفة تخترعها). «Arabic coffee» = «arabischer Kaffee».
13. **`ratio-alkoot`**: «Ratio» علامةٌ لاتينية — **وهي كلمة ألمانية قائمة أيضاً**، فاحرص أن يبقى وضوحُ أنها اسم علم. «"cultural Ratio"» اقتباسٌ للعلامة عن نفسها بعلامتَي „…“. «the old Al-Koot fort, which the brand dates to roughly three hundred years» — **التأريخ منسوبٌ للعلامة لا للموقع** («قلعة الكوت» لا «قصر إبراهيم»: كيانٌ يسمّيه المصدر هكذا، فلا تُسقطه على القصر). «old Hasawi engravings» ⇐ سابقة «Hasawi-» المركّبة. «al-kindiyyah and al-areesh» **أسماءٌ كان أهل الأحساء يسمّون بها أجزاء مساكنهم** — تُنقل بحرفها بعلامتَي „…“ بلا اختراع معنى. «the Saudi Tourism Authority» (الهيئة السعودية للسياحة) — **جهةٌ رابعة** غير الثلاث أعلاه: مدخلٌ جديد بشاهد. «its recommendations for the Saudi Winter season» = موسم «شتاء السعودية» — اسمُ موسمٍ رسمي يُنقل بوصفه كذلك. «specialty coffee» ⇐ «der Spezialitätenkaffee» المعتمد.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · لا محارف ماركداون.
- **لا تُحرَّر ملفات المستودع** — مخرجك ملف JSON في `BATCH` وحده.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-dind-3"`، `stage`، `strings` (**المفاتيح الخمسة كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<TOOLS>/verify-stage.mjs" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
