# المرحلة 4 — التغييرات وسياج الوقائع · دفعة المعالم الألمانية 3

نُسخ `fields.stage3.json` إلى `fields.stage4.json` وحُرّر بأداة Edit. **المتغيّر 2 من 39 · ومضافٌ حقلٌ واحد · و37 بايتاً ببايت** (فرقٌ آليّ: 7 أسطر) ⇐ المفاتيح **8** · الحقول **40**.

## أ. الجمل المغيَّرة (قبل ← بعد)

| # | الصفحة · الحقل | قبل ← بعد | العلّة |
|---|---|---|---|
| 1 | `khalifa` · `body_de` | «… Privatmuseen Al-Ahsas, **lizenziert von der Museumskommission**.» ← «…, **von der Museumskommission lizenziert**.» | **ترتيبٌ إنجليزيّ في مجموعةٍ وصفية مُلحَقة.** قاعدة Duden: ترتيبُها كترتيب صلة الموصول — **الاسمُ الفاعل آخراً بعد متعلّقاته**، والاستثناء لمتعلَّقٍ طويلٍ أو مركّب (هنا أربعُ كلمات). **والدفعةُ نفسها تحمل الترتيب الألمانيّ** في `najim`: «Das Museum ist **vom Kulturministerium lizenziert**». |
| 2 | `ahsa-house` · `summary_de` | «…, **gegründet von Sulaiman Al-Majed**.» ← «…, **von Sulaiman Al-Majed gegründet**.» | العلّة نفسها (متعلَّقٌ من أربع كلمات). وهو `<meta name="description">` الألمانية. |
| 3 | `hamidiyah` · **`practical[0].value_de`** (جديد) | «**Historische Stätte** – als Souk …» ← «**Sehenswürdigkeit, die zum kulturellen Erbe Hofufs gehört** – als Souk …» | سياجُ وقائع لا أسلوب — القسم ب. |

**لم يُمَسّ من البند 3 إلا `value_de`**: ‏`label_de` («Aktueller Status») و`source_de` و`verified` و`value_en` بالحرف، وذيلُ القيمة بايتاً ببايت (الشرطة U+2013 بمسافتيها كما في المنشور). **وهذا الحقل لم تمرّ عليه المراحل 1–3.**

## ب. ما حذفه السياج

| الدعوى المحذوفة | من أين | السند على أنها ليست في المصدر |
|---|---|---|
| **عمرٌ مسنَدٌ بالمصادر** لمبنى سوق الحميدية، في بند «الوضع الحالي» | من المنشور (الدفعة 2)، عبر `Historische Stätte` | DWDS يعرّف `historisch` بـ«…, (schriftlich) überliefert, **durch Quellen beglaubigt**». والمصدر يقول «**heritage** landmark» / «معلم **تراثي**» — موروثاً لا عمراً موثّقاً؛ وصفحةُ المعلم نفسها تقول إن تفاصيل المبنى وتاريخه **بانتظار التأكيد**. فالكلمة كانت تُثبِت في بطاقة الزيارة ما تنفيه آخرُ جملةٍ في المتن. |

**ولا حذفَ ثانٍ**: الحقول التسعة والثلاثون التي مرّت بالمراحل 1–3 **لم تُدخل واقعةً واحدة ليست في المصدر** (القسم ج). والحذفان الآخران في الدفعة وقعا في المرحلة 1، وأعدتُ التحقّق منهما فصحّا:

- `dhafar` — «its **celebrated** scouting museum»: صفةُ مدحٍ إنجليزيةٌ وحدها، والفيصل «أما ما يميّزه فهو متحفه الكشفي» بلا صفة. **مؤكَّد.**
- `khalifa` — «a **traditional** Hasawi diwaniyah»: الفيصل «ومجلس يحاكي الديوانية الأحسائية» بلا صفة. **مؤكَّد.**

## ج. تدقيقُ السياج — ما فُحص وبقي

**كلُّ رقمٍ في الألمانية له نظيرٌ حرفيّ في المصدر، ولا رقمَ من المصدر سقط** (55 رقماً، فحصٌ آليّ): 2019 · 750 · 150 · 180 · 1980er · 1404 · 4.000 · 1930er · 1940er · 25 · 2017 · 300 · 35 · 20+20 · 400 · 26 · وصفرٌ في hamidiyah.

**الصفاتُ المطلقة والتفضيل — منقولةٌ لا مضافة:**

| الألمانية | نظيرها |
|---|---|
| `eines der bekanntesten Privatmuseen Al-Ahsas` | «most **prominent**» — وDuden: `prominent` = «weithin **bekannt**, bedeutend». |
| `eines der bedeutendsten Privatmuseen der Region` | «most **notable**» (لفظٌ إنجليزيّ مغاير ⇐ صفةٌ مغايرة). |
| `der frühesten Schullehrpläne und der ersten Lehrmittel` | «the Kingdom's **earliest** …» + الفيصل «أقدم المناهج … ومستلزمات التعليم **الأولى**». |
| `das … erste seiner Art … **gilt**` · `**gilt als** die erste ihrer Art` | «**described as**» / «**يوصف بأنه**» — النسبةُ باقيةٌ في الحقلين. |
| `einzigartige` · `seltene` · `ein idealer` · `eine besondere Station` · `die ersten Maschinen` | unique · rare · ideal · distinctive · «الآلات **الأولى**». |

**وأسماءُ الأعلام كلُّها في المعجم** بجنسها ومصدرها. **والأسماءُ الألمانية المستقرّة مطبَّقة**: `Saudi-Arabien` ✔؛ ولا ذكرَ في الدفعة للرياض ولا جدة ولا مكة ولا الخليج (فحصٌ آليّ: صفر) فلا موضعَ لـ`Riad`/`Dschidda`/`Golfregion`.

## د. فُحص وأُبقي بعلّةٍ مسمّاة

- **`Rösten und Mahlen des Kaffees`** (ahsa-house): الطحنُ في الفيصل وحده، والإنجليزية أسقطته ⇐ الفيصل يَغلِب، **ويُبلَّغ لمالك النصّ الإنجليزي**.
- **`seltene Objekte des Kulturerbes und historische Stücke`** (dar-alturath): المصدر يجعل «rare/نادرة» على المعطوفَين، والألمانيةُ تقصرها على الأول — **دعوى أضعفُ لا أقوى، فليست خرقَ سياج**؛ وتقويتُها تقتضي تكرار `seltene` أو عطفَ جزءِ مركّبٍ على صفة (خطأ إملائيّ). والانفصالُ مفروضٌ بـPOL-DE-11 (المصدر يعطف «heritage» على «historical»).
- **`Waffen, darunter Schwerter und Militärhelme`**: فرقٌ تصنيفيّ بين المصدرين لا وقائعيّ — **مُبلَّغ بلا مصالحة**.
- **اسمُ الجهة مزدوجاً** (`Nationalerbe` في abdulrazaq · `Kulturerbe` في najim): المصدران نفساهما يختلفان في اللغتين، وسابقةُ المعجم صريحة بأن التوحيد **خطأٌ وقائعيّ** ⇐ لا توحيد، والصفحتان منفصلتان فلا تصادمَ مع قاعدة عدم الانطباق.
- **`Hier verstehen Sie die Tiefe der Oase …`** (ahsa-museum): الجملةُ نفسها تحمل «ein idealer Ausgangspunkt» من المصدر، والتالية تفكّها؛ خبرٌ لا أمر، فخارج منع `ton` («Erleben Sie …» = صفر).
- **`Werkstätten zum Kulturerbe`** (ahsa-house): `veranstaltet` تحسم الفعاليةَ نحواً، و`Werkstatt` مصطلحٌ قائمٌ في التربية المتحفية الألمانية؛ والبديل `Workshops` ممنوعٌ بـDenglisch. **نقطةُ الرصد للقارئ الأعمى قائمة.**
- **`zeichnen Jahrzehnte der Pfadfinderbewegung nach`** (dhafar): **ليست خرقاً لمدخل «nicht nachzeichnen»** — المدخل مقصورٌ على `Kulturepochen` لأن `Epoche` وحداتٌ مفصولة، وقائمةُ DWDS للتركيبات النمطية تعطي `Entwicklung`/`Werdegang`، وهو نوعُ المفعول هنا. مسجَّلٌ في المعجم **لئلا تُصلحه مرحلةٌ لاحقة**.
