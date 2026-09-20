# دفعة `de-dind-4` — متون أربعة مقاهٍ (ج7، الدفعة 4 من 4)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining-detail/`)
TOOLS = أدوات الخط المؤقتة

## ما هذه الصفحة
`/de/restaurants-cafes/<slug>/` — صفحة المنشأة المفردة. بنيتها من أعلى لأسفل: فتات «Alle Restaurants und Cafés» ← صورة المنشأة ← تسمية النوع الصغيرة فوق الاسم ← **اسم المنشأة اللاتيني** عنواناً ← نبذة بطاقتها المنشورة ← شارة «Jetzt geöffnet» والتقييم وأوقات العمل من خرائط Google ← **المتن** (فقرات) ← صندوق «Lage» ← قائمة «Sehenswürdigkeiten in der Nähe: …» ← صندوق «Über diese Seite» ← رابط العودة.

**إطار الصفحة كلّه معتمدٌ في `de-dind-1`** (‏`context.approved_prev`) — **ملزم حرفاً**. هذه الدفعة **متون فقط**، وهي الأخيرة في ج7.

## النطاق — 4 متون (`BATCH/pack.json → strings`)
`soulaf` · `baking-up` · `dot-bakery` · `karak-raslan` — كلها مقاهٍ، **وثلاثة منها علامات تجارية متعددة الفروع** خارج الهفوف القديمة.
لكل مفتاح: `en` (المصدر) · `ar` (**الفيصل** عند اختلاف واقعة) · `ctx` (**اقرأه لكل مفتاح**).

الملفات: `BATCH/pack.json` · `BATCH/context.json` · المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## المنشور سلفاً — ملزم حرفاً (في `context.json`)
- **بطاقات هذه المنشآت الأربع** على الفهرس الألماني (ج6): الموقع والنبذة والنص البديل — الصفحة تعرض نبذتها فوق المتن، **فلا يناقضها المتن ولا يكرّرها حرفاً**.
- **من المعجم**: «die König-Abdullah-Straße» · «die Ain-Najm-Straße» · «die Katar-Straße» · «Al-Khaleej-Straße» · «Al-Rawdah» · «Al-Mubarraz» · «Khobar» (بلا أداة) · «Dammam» · «Riad» · «Dschidda» · «Karak (gewürzter Milchtee)».
- بنود **BINDING** من حكّام ج5 وج6 وج7/b1 في `context.binding_from_previous_judges` و`context.approved_prev`.

## أفخاخ عامة لكل متن
1. **بنية الفقرات = بنية الإنجليزية حرفاً** (الحارس يعدّها). الإنجليزية هي المصدر **ونطاقه**؛ **والعربية فيصلٌ في الواقعة لا في النطاق** — فقرةٌ عربيةٌ زائدة لا تُضاف (وهي هنا في `soulaf` و`karak-raslan`: مقارنةٌ بجيران من القائمة؛ وفي `baking-up` و`dot-bakery`: جملةٌ ختامية تشرح ما لا تشرحه الإنجليزية).
2. **المتن نصٌّ خام**: لا ماركداون ولا روابط ولا تشديد.
3. **اسم المنشأة لاتينيٌّ حرفاً وغير مصرَّف**.
4. **لا اختلاق**: لا موعد ولا سعر ولا مسافة ولا سنة لا يقولها المصدر.
5. **سياج الأرقام آلي**. التواريخ `November 2025` · `2012` · `2016` · `2017`.
6. **الگلوس مرة واحدة داخل المتن الواحد** عند أول ورود.
7. **Denglisch ممنوع** (Spot · Location · Guide · Must-see · Vibe)، و«Highlight» مرة واحدة على الأكثر. «Croissant» و«Doughnut/Donut» و«Brioche» مداخل Duden فلا تُعدّ Denglisch — وتحقّق من الرسم الذي يقرّه Duden.
8. **لا حكم جودة بلا مصدر** (beste · empfehlenswert · köstlich · lecker · berühmt · authentisch) — الحارس يُفشلها.

## أفخاخ هذه الدفعة
9. **`soulaf`**: شرحٌ لغويٌّ عمود المتن — «sulaf and sulafah mean the first pressing of a thing — its purest and finest part». **«أوّل ما يُعصر» معنى معجميّ عربي**: انقله بدقّة («das Erste, was ausgepresst wird») ولا تُحوّله إلى استعارةٍ ألمانية جاهزة. «quoting a line of verse in which the word appears» — **بيتُ شعرٍ لا يورده المصدر**، فلا تخترع نصّه ولا تصفه بأكثر مما قيل. «Al-Ghassaniyah in Al-Mubarraz» حيٌّ جديد: نقحرةٌ بنمط المعجم ومدخلٌ بشاهد أو `pending`. «Khobar» بلا أداة (المعجم). «an olive tree standing beneath a skylight» = شجرة زيتون تحت فتحة سماوية (وصفٌ حرفي). **الجملة الأخيرة تقابل رسمَين للاسم**: «Soulaf» باللاتينية و«سُلاف» بالعربية لا «سوالف» الشائعة — انقل الواقعة بحرفها؛ والرسم العربي يُنقحَر لا يُكتب بالحرف العربي.
10. **`baking-up`**: «Baking Up» اسمٌ لاتيني. «a bakery and pastry brand founded in 2016 and based in Dammam» — **العلامة دمّامية لا أحسائية**، وهي واقعةٌ مميِّزة في هذه القائمة فلا تُطمس. الفروع: «Dammam, Khobar, Al-Ahsa, Riyadh and Jeddah» ⇐ **«Dammam · Khobar · Al-Ahsa · Riad · Dschidda»** (المعجم). «it announced that it had begun taking orders from its Al-Ahsa kitchen through delivery apps while the branch's furnishing was still under way» — **حالةٌ مؤقتة بتاريخها**: تُنقل بزمنها الماضي المنسوب للإعلان، **ولا تُقلَب إلى وصفٍ لحالٍ قائم اليوم**. «inside Fakhr Tower — a commercial unit in a modern building rather than a standalone one» اسمٌ لاتيني وتوضيحٌ نافٍ. «where we can trEAT you butter» **تلاعبٌ لفظي إنجليزي هو شعار العلامة**: يبقى بالإنجليزية بحرفه (وبرسمه ذاك بالضبط) — لا يُترجم ولا يُعاد بناؤه بالألمانية، ويجوز تقديمه بما يفيد أنه شعارها الإنجليزي.
11. **`dot-bakery`**: «Dot» ثم «Dot Bakery and Café» — الاسمان في المصدر بموضعيهما. «began in 2012 as an Instagram account selling baked goods made in a home kitchen» ثم «in 2017 the project moved out of the home and opened its first shop in Hofuf» — **تسلسلٌ زمنيّ دقيق** بثلاثة أرقام. «craft baking: sourdough, brioche and croissants» ⇐ «Sauerteig» هو المقابل الألماني المستقر لـsourdough. «cakes made for occasions» = كيك المناسبات. «three branches, in Khobar, Al-Mubarraz and Hofuf, and this is the Ain Najm Road branch in Al-Mubarraz» ⇐ «die Ain-Najm-Straße» المنشورة. «when in doubt, Dot» **تلاعبٌ لفظي إنجليزي هو شعار العلامة**: يبقى بالإنجليزية بحرفه. **والعربية تشرح اللعبة («لعبٌ على تقارب doubt وDot») والإنجليزية لا تشرحها** — الإنجليزية هي المصدر ونطاقه، **لكن القارئ الألماني لا يرى اللعبة إن لم تُشرح**: قرّر أحد الأمرين وسجّل قرارك في `notes` ليبتّه الحاكم، ولا تخترع شرحاً ثالثاً.
12. **`karak-raslan`**: «Raslan» هو الاسم المعتمد — **لا «Karak Raslan» كما شاع**، والمصدر يقول ذلك صراحةً (ومُعرّف الملف `karak-raslan` لا يظهر في النص). «a road known locally as the Qatar Road» ⇐ **«die Katar-Straße»** المنشورة، و«Al-Khaleej Road» ⇐ «Al-Khaleej-Straße» المنشورة. «the Raslan dallah, one of the recognised forms of the Arabic coffee pot» — **«الدلّة» إناء القهوة العربية**: تُنقل بحرفها مع گلوس مرة واحدة («die Dallah»، مدخلُ معجم بجنسه وشاهده). «a shortened form of the Turkish Arslan, meaning lion» اشتقاقٌ مسنَدٌ في المصدر يُنقل. «karak» ⇐ **«Karak (gewürzter Milchtee)»** (المعجم — والگلوس مرة واحدة). «simple breakfast plates» = أصناف فطور بسيطة.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · لا محارف ماركداون.
- **لا تُحرَّر ملفات المستودع** — مخرجك ملف JSON في `BATCH` وحده.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-dind-4"`، `stage`، `strings` (**المفاتيح الأربعة كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<TOOLS>/verify-stage.mjs" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
