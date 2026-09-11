# المرحلة 4 (المقارن المرجعي + سياج الوقائع) — لفّة التصحيح، الدورة 2 من 3

**المدخل:** `fields.stage3.loop2.json` · **المخرج:** `fields.stage4.loop2.json` · **المرجع للمقارنة:** `fields.stage5.json` (مخرج الدورة 1 المحكوم بـ86).

**الحصيلة في سطر:** اللفّة غيّرت **10 حقول من 52** في **36 موضع تحرير** (قياس آلي بـ`difflib` على مستوى الكلمة). **35 موضعاً لها سند** في `must_fix` أو `applied`/`partly` أو في ملاحظات الحاكم على الصفحة — **وموضعٌ واحد تجاوز سنده فرُدّ**. وسياج الوقائع: **صفر واقعة مختلقة تُحذف**.

**تحريري أنا في هذه المرحلة: واحد** (ردّ ارتداد). فبقيت الحقول العشرة عشرةً، و42 حقلاً مطابقاً حرفاً لمخرج الدورة 1 (فُحص آلياً).

---

## 1 — سياج الوقائع

القاعدة: كل واقعة أو رقم أو صفة مطلقة أو نصيحة أضافتها اللفّة وليست في `body_en`/`summary_en` (المصدر) ولا في المتن العربي (الفيصل) **تُحذف ويُبلَّغ عنها**.

### الحصيلة: صفر حذف

فُحصت الكلمات والتراكيب الجديدة كلها (36 موضعاً) في مقابل المصدرين، فلم تُضف واقعة:

| الموضع الجديد | مقابله في المصدر | الحكم |
|---|---|---|
| `ein Ziel für` | `a destination for` | مطابق |
| `für Ansehen und große Anlässe` | `the cloak of standing and of great occasions` / «عباءة الوجاهة والمناسبات» | مطابق، والترتيب ترتيب المصدرين |
| `Familien aus Al-Ahsa` | `Al-Ahsa families` / «عائلاتٌ أحسائية» | استعادة نسبة كانت ساقطة |
| `Von dort sind es nur wenige Schritte zu …` | `steps away from Qasr Ibrahim and the Qaisariyah Souq` | مطابق؛ `Von dort` إشارة مكانية لا واقعة |
| `das Oberhaupt der Familie` | «كبير أسرة آل الملا» (الفيصل) | مطابق للفيصل |
| `Stätten Al-Ahsas` | `one of **its** … landmarks` / «ومن أهم معالمها» | مطابق |
| `überblickt von innen liegenden Balkonen` | `overlooked by inner balconies` / «تطل عليها شرفات داخلية» | مطابق، والاتجاه صحيح (الشرفات تطلّ على الفناء) |
| `ausgestellte Kleidung und persönliche Gegenstände` | `displays of clothing and personal effects` | مطابق |
| `auf die alte Art` | `in the old way` / «بالطريقة اليدوية القديمة» | مطابق، وأقرب للمصدر من مثال الحاكم (انظر §4/1) |
| `des Töpferhandwerks` | `homes of the craft` (والحرفة مسمّاة في المتن) | لا واقعة زائدة — حكم `applied` 60 |
| `eines der Erzeugnisse des Hauses` | `take home **its** wares` / «ويقتني من منتجاتها» | النسبة محفوظة |
| `die Limette aus Al-Ahsa` | گلوس `Hasawi` الواجب بـ`gloss_regel`، وأقرّه الحاكم نصّاً | گلوس لا واقعة |
| `112 Geschäfte von Handwerkern` | «يجمع الحرفيين **ومتاجرهم**» (الفيصل) | تحديدٌ في المصدر كان ساقطاً |

### واقعة استُعيدت لا أُضيفت — وتحقّقتُ منها بنفسي بفتح الملف

اللفّة أبلغت أنها استعادت «الشعبية»/`folk` في `duqat-algharash.body_de` (`dieses Handwerks` ← `dieses Volkshandwerks`). **فتحتُ `src/content/attractions/duqat-algharash.md` وتحقّقت:**

- **الإنجليزية (المصدر):** «making it one of the Kingdom's most celebrated homes of the **folk** craft».
- **العربية (الفيصل):** «مما يجعله من أشهر بيوت الحرفة **الشعبية** في المملكة».
- وزيادةً في التوثيق: النسختان المعتمدتان الأخريان تحملانها — الروسية «самых известных мест **народного** ремесла» والصينية «最有名的**民间**手工艺作坊».

**فالكلمة في المصدرين وفي لغتين معتمدتين، والألمانية وحدها أسقطتها.** وهي أحد سببي خصم الدقة عند الحاكم (`pages.duqat-algharash.notes[1]` نصّاً). **فالاستعادة صواب، وليست خرقاً للسياج بل إصلاحاً لخرقٍ معاكس** (إسقاط واقعة مصدر). أُقرّت.

**وموضعها صحيح:** وقعت في المتن وحده. والنبذة بلا `folk` في المصدرين معاً (`summary_en` = «homes of the craft»، والعربية «من أشهر مواقع الحرفة») — فلم تُنقل إليها، وهو الصواب.

### عنصرُ مصدرٍ سقط بسندٍ من الفيصل (يُسجَّل لا يُردّ)

`nach Hause` رُفعت مع تصحيح `eines seiner Erzeugnisse`. الإنجليزية تقول `take home its wares`، **والفيصل العربي بلا «بيته»**: «ويقتني من منتجاتها». والنسختان المعتمدتان تسقطانه كذلك: الروسية «увозят с собой» والصينية «选一件带走». فالإسقاط مسنَدٌ بالفيصل وبسابقتين، و`mitnehmen` تحفظ الاقتناء. **أُقرّ.**

---

## 2 — حارس الارتداد: كل اختلاف عن `fields.stage5.json` وسنده

المنهج: مقابلة آلية حقلاً حقلاً (‏52 مفتاحاً مسطَّحاً) ثم `difflib` على مستوى الكلمة لكل حقل مختلف. **42 حقلاً مطابقاً حرفاً · 10 حقول مختلفة · 36 موضع تحرير.**

### 2أ — المواضع الخمسة والثلاثون المسنَدة (أُقرّت)

| # | الحقل | قبل ← بعد | السند |
|---|---|---|---|
| 1 | `qais.summary_de` | `eine Adresse` ← `ein Ziel` | `must_fix` 5 · `applied` 3 |
| 2 | `qais.body_de` | `Architektur. Die` ← `Architektur, und die` | `must_fix` 4 · `applied` 8 |
| 3 | `qais.body_de` | `Einkaufens` ← `Einkaufs` | `applied` 11 |
| 4-5 | `qais.body_de` | `für große Anlässe, ein Zeichen von Ansehen.` ← `für Ansehen und große Anlässe.` | `must_fix` 4 · `applied` 13 |
| 6 | `qais.body_de` | `der Oase` ← `aus Al-Ahsa` | `must_fix` 4 · `applied` 17 · `partly` 81 |
| 7 | `qais.body_de` | `Keramik,` ← `Keramik sowie` | `must_fix` 4 · `applied` 18 |
| 9 | `qais.body_de` | `den Besuch legen Sie am besten auf den Abend` ← `die beste Zeit ist der Abend` | `must_fix` 4 · `applied` 19 |
| 10-11 | `craft.summary_de` | إعادة البناء بالنقطتين والمسنَد إليه `Er` | `must_fix` 1 · `applied` 25 — **وفُحص آلياً أنه مطابق لنصّ الحاكم حرفاً (`True`)** |
| 12 | `craft.body_de` | `steht` ← `liegt` | `must_fix` 3 · `partly` 29 |
| 13 | `craft.body_de` | `für Handwerker,` ← `von Handwerkern,` | `must_fix` 2 · `applied` 30 |
| 14 | `craft.body_de` | حذف `von Hofuf` | `must_fix` 3 · `applied` 36 |
| 15 | `craft.faq[1].a_de` | `für Handwerker,` ← `von Handwerkern,` | `must_fix` 2 (الموضعان) |
| 16-17 | `baiah.body_de` | شطر المفتتح جملتين | `must_fix` 6 · `applied` 46 |
| 18 | `baiah.body_de` | `1203 n. H. (1789` ← `1203 nach der Hidschra (n. H.; 1789` | `must_fix` 6 · `partly` 43 · القرار 2 |
| 19 | `baiah.body_de` | `der Älteste` ← `das Oberhaupt` | `applied` 47 |
| 20 | `baiah.body_de` | `einem` ← `einer` | تابعٌ لازم (مطابقة `die Stätte`) |
| 21 | `baiah.body_de` | `Wahrzeichen der Oase.` ← `Stätten Al-Ahsas.` | `must_fix` 6 · `applied` 49 |
| 22-23 | `baiah.body_de` | `auf den … blicken;` ← `überblickt von innen liegenden Balkonen;` | `must_fix` 6 · `applied` 54 |
| 24-25 | `baiah.body_de` | `und Ausstellungen von …` ← `sowie ausgestellte …` | `must_fix` 6 · `applied` 55 |
| 26-29 | `duqat.summary_de` | صلتا `das` ← اسم فاعل وبدل؛ و`dieses Handwerks` ← `des Töpferhandwerks` | `must_fix` 7 · `applied` 59 و60 |
| 30 | `duqat.body_de` | `nach alter Art` ← `auf die alte Art` | `must_fix` 7 · `applied` 64 (بحيادٍ عن المثال — §4/1) |
| 31 | `duqat.body_de` | `Handwerks` ← `Volkshandwerks` | `pages.duqat-algharash.notes[1]` (سببُ خصم دقة) — §4/5 |
| 32-33 | `duqat.body_de` | `eines seiner Erzeugnisse … nach Hause.` ← `eines der Erzeugnisse des Hauses mit.` | `must_fix` 7 · `applied` 69 (بحيادٍ عن المثال — §4/2) |
| 34 | `lemon.summary_de` | إضافة الگلوس `– die Limette aus Al-Ahsa.` | `must_fix` 8 («فليكن في الحقلين معاً») |
| 35-36 | `lemon.body_de` | العودة إلى صيغة المرحلة 1 المطابقة للنبذة | `must_fix` 8 · `applied` 78 · القرار 3 (‏`OVERTURN`) |

**وفُحص آلياً أن الحقلين في `lemon-farm` متطابقان حرفاً** — أي شرط الحاكم بحرفه.

### 2ب — الارتداد المردود: موضعٌ واحد

| الموضع | ما فعلته اللفّة | الحكم |
|---|---|---|
| 8 · `qais.body_de` | `weiter unten **unter** „Besuchsinformationen“` ← `weiter unten **in der Karte** „Besuchsinformationen“` | **يُردّ إلى أصغر إصلاحٍ مسنَد:** `weiter unten **bei** „Besuchsinformationen“` |

**العلّة — شقُّ مصطلحٍ قائم في الموقع، قِيس ولم يُقدَّر:**

1. أمر الحاكم كان **«ارفع ازدواج `weiter unten unter`»** لا أكثر (`must_fix` 4 · `applied` 19). فرفع الازدواج مسنَد، **وإقحام اسمٍ جديد يتجاوز السند**.
2. و`Karte` **مصطلح محجوز في الألمانية بهذا الموقع للخريطة**، قِيس في ملفين:
   - `src/i18n/ui.ts` كتلة `de:` — `'nav.map': 'Karte'` (في شريط التنقّل نفسه فوق الصفحة) و`'list.map': 'Auf der Karte ansehen'`.
   - `de-translation/memory/tm.json` — زوج معتمد 2026-09-10: «mit der **Karte der Sehenswürdigkeiten** bringen Sie …».
   فصفحة المعلم الألمانية تحمل في ترويستها رابطاً اسمه `Karte`، وفيها أزرار خرائط (`det.openMaps`) — ثم يقرأ الزائر «weiter unten **in der Karte** …» فتنعقد قراءةٌ أولى «على الخريطة». وهو بعينه نوع التعثّر الذي خصم عليه الحاكم في هذه الدفعة (`auf den innen liegende Balkone` · `der Handwerker`).
3. وحجّة اللفّة أن «البطاقة» في المصدرين صحيحةٌ في الواقعة **ولا تُسوّغ اللفظ**: `Karte` ليست مقابلاً محايداً للبطاقة هنا لأن الموقع صرفها إلى الخريطة. والروسية المعتمدة تجنّبت اللبس بلفظها («в **карточке**» لا «в карте»)، والصينية بـ«卡片».
4. و`bei` ترفع الازدواج (‏`unten … bei`)، وتُبقي «أدناه» التي في المصدرين، ولا تُدخل مصطلحاً. **وهو ما كانت عليه الدورة 1 ناقصاً حرف الجرّ وحده** — فالتغيير أصغر ما يفي بأمر الحاكم.

**وأُسجّل ما لم أفعله:** لم أُدخل `Infokarte` ولا `Infobox` — كلاهما مصطلحٌ جديد يحتاج مدخل معجم، وسدّ لبسٍ بلبس. **والحاجة قائمة ومرفوعة**: الألمانية بلا لفظٍ محسوم لبطاقة معلومات الزيارة، و`Karte` مصروفة للخريطة (انظر `notes.stage4.loop2.md` §4).

### 2ج — بنود `must_not_change`: فُحصت كلها آلياً — صفر مساس

| البند | العدد في المخرج | الحال |
|---|---|---|
| `Kommunalverwaltung von Al-Ahsa` | 3 | سليم (الثلاثة التي سمّاها الحاكم) |
| `das Netzwerk der UNESCO Creative Cities` | 1 | سليم |
| `Dschumada I` | 1 | سليم |
| `Beitritt` | 3 | سليم |
| `erbaute` | 2 | سليم |
| `Kupfer` + `duftet` | 1 + 1 | سليم (الزوج قائم) |
| `einheimisch*` | 3 | سليم |
| `die Hasawi-Limettenfarm` | 1 | سليم |
| `Farm` (‏لا `Plantage`) | `Zitrusfarm` · `Limettenfarm` · صفر `Plantage` | سليم |
| `Töpferhaus` | 3 | سليم |
| `Jabal al-Qarah` / `Al-Qarah` | 3 / 2 | سليم |
| بنية الحقول والمفاتيح والمسارات | 52 مفتاحاً بالترتيب نفسه · `practical` 2·1·0·0·0 · `faq` 5·4·0·0·0 | سليم |

و`title_de` و`kicker_de` و`area_de` و`bestTime_de` (15 حقلاً) **مطابقة حرفاً** — ومعها `practical` بكاملها و`faq` كلها عدا `craft.faq[1].a_de` المأمور بها.

---

## 3 — التحقّق المرجعي والمعجمي (مهمّة المرحلة 4 الأصلية)

- **الأسماء الأجنبية (Exonyme):** صفر `Riyadh`/`Jeddah`/`Mecca`/`Saudi Arabia`؛ و`Saudi-Arabien` و`die Vereinigten Staaten` على القاعدة. والخليج: صفر `Persischer Golf` وصفر `Arabischer Golf`، و`der Golfregion` وحدها.
- **ثلاث ثغرات معجمية كشفها الفحص الآلي لا النظر** — تفصيلها في `termbase-additions.stage4.loop2.json`: `Qasr Ibrahim` (‏مستعمل منذ الدورة 1 بلا مدخل، ومذكور في `_meta` وحده) · `Frankreich` · `Kanada` (‏أُضيف شريكهما `die Vereinigten Staaten` في الدورة 1 وتُركا). ومعها **حسمان**: `das Töpferhaus` (‏سند جنس `das Dougha Al-Gharash` كان غير مكتوب) و`das Volkshandwerk` (المصطلح الذي أدخلته هذه اللفّة).
- **Übersetzerdeutsch:** لا سلاسل `es gibt`، ولا حروف جرّ مقلوبة، ولا ترتيبٌ إنجليزي. و`überblickt von …` بدلٌ اسم مفعولٍ مؤخَّر — أسلوبُ وصفٍ ألماني قائم لا كالك، ويستوفي شرط الحاكم «بناءٌ لا يبدأ بـ`auf den`».

---

## 4 — بتُّ البنود الخمسة التي رفعتها اللفّة

### (1) `auf die alte Art` بدل مثال الحاكم `auf traditionelle Weise` — **تُقرّ**

حجّة اللفّة: `traditionell` كانت ستصير رابعةً في صفحةٍ من ستّ جمل. **فحصتُ العدد آلياً: 3 مواضع قائمة** — `kicker_de` = «Traditionelles Handwerk» · `summary_de` = «Ein traditionelles Töpferhaus» · `body_de` = «ein traditionelles Töpferhaus». فالحجّة صحيحةٌ عدداً، ومثال الحاكم كان سيجعلها أربعاً.

**وأقرّها سندٌ أقوى لم تذكره اللفّة:** مثال الحاكم **يفارق المصدر**. الإنجليزية `in the old way` والفيصل العربي «بالطريقة اليدوية **القديمة**» — كلاهما يقول «قديم» لا «تقليدي». فـ`auf traditionelle Weise` تُبدّل الصفة، و`auf die alte Art` تحفظها بحرفها. **فالحياد هنا أمانةٌ للمصدر لا تفضيلُ ذوق** — وسياج الوقائع يغلب مثالَ الحاكم حين يتصادمان، وعلّة الحاكم المكتوبة («صيغة أدلّ») مستوفاة بالاقتران الدارج `auf die alte Art`.

### (2) رفض `der Töpferei` والعدول إلى `des Hauses` — **تُقرّ**

حجّة اللفّة: `die Töpferei` تحتمل الحرفة والورشة معاً فتُدخل التباساً جديداً. **الحجّة صحيحة، ويسندها الحاكم نفسه من موضعين:**

1. ردّ الحاكم صيغة القارئ `ein fertiges Stück` بعلّة أنها **«تُسقط نسبة المنتجات إلى الدوغة، وهي في المصدر (`its wares`)»** (`applied` 69). وقراءةُ `der Töpferei` بمعنى الحرفة تُسقط النسبة نفسها («من منتجات الخزف» عامّةً) — فتقع في العلّة التي ردّ بها.
2. وردّ الحاكم `Töpferei` بديلاً لـ`Töpferhaus` صراحةً (ملاحظة 58): «`die Töpferei` … إبدالها يقطع سند الجنس ويناقض القرار 1». فإدخالها في الجملة نفسها مرجعاً يشقّ ما أغلقه.

و`des Hauses` مرجعها مسمّى في صدر الجملة نفسها («Heute ist **das Töpferhaus** eine Station für Besucher»). **وكلفةٌ أسجّلها:** `des Hauses` صارت 3 مرات في المتن (‏«Brennöfen des Hauses» · «Töpfer des Hauses» · «Erzeugnisse des Hauses») — وهي موازيةٌ لتكرار الضمائر في الفيصل العربي («أفرانه» · «حرفيوه» · «منتجاتها»)، فأُبقيت ولم أُدخل تحريراً بلا سند.

### (3) كلفة `baiah`: تكرار «Al-Ahsa» مرتين في جملة — **تُقرّ (والصيغة تبقى)**

الجملة: «… zum Symbol für den Beitritt **Al-Ahsas** zum modernen saudischen Staat und zu einer der bedeutendsten historischen und politischen Stätten **Al-Ahsas**».

الكلفة حقيقية. **وأخذُ أمر الحاكم بحرفه هو الصواب لثلاثة أسانيد:**
1. `must_fix` 6 ينصّ على `Stätten Al-Ahsas` **باللفظ**، و`Beitritt` في `must_not_change` — فالطرفان مثبّتان نصّاً.
2. وبديلُ الضمير (`ihrer bedeutendsten Stätten`) **عائدٌ على مضافٍ إليه** (`Al-Ahsas` داخل `den Beitritt Al-Ahsas`)، وهي بعينها العلّة التي خصم بها الحاكم في هذه الدفعة ثلاث مرات (`dieses Handwerks` · `eines seiner Erzeugnisse` · `Familien der Oase`). فرفعُ التكرار يشتري تعثّراً أشدّ.
3. والتكرار **في الفيصل العربي نفسه**: «رمزاً لانضمام **الأحساء** إلى الدولة السعودية الحديثة ومن أهم **معالمها**» — اسمٌ ثم عائدٌ عليه، والألمانية تعذّر فيها العائد فصار اسماً.

### (4) كلفة `duqat`: مفارقة زوج `tm.json` — **يُقرّ التغيير، ويُردّ التعليل**

**التغيير يُقرّ:** `must_fix` 7 يأمر به نصّاً، وعلّة الحاكم اللغوية صحيحة (الإشارة الألمانية لا تصل إلى جزء مركّب).

**والتعليل يُردّ — فتحتُ الملف وتحقّقت كما أُمرت.** حجّة اللفّة: «في المدوّنة `Töpferhaus` اسمٌ حرّ سبق الإشارة، وفي النبذة هو المركّب نفسه الذي تشير إليه». فتحتُ `src/content/blog/24-hours-de.md` سطر 24:

> «Am Fuß des Berges, im Dorf Al-Qarah, liegt Dougha Al-Gharash – **das Töpferhaus**, das die Familie Al-Gharash über Generationen weitergegeben hat und das zu den bekanntesten Stätten **dieses Handwerks** in Saudi-Arabien zählt.»

**البنية في المدوّنة هي البنية نفسها في النبذة**: `Töpferhaus` مركّبٌ في الموضعين، و`dieses Handwerks` تطلب مرجعاً لـ«Handwerk» فلا تجد إلا العنصر الأول من المركّب في الموضعين. وقرأتُ ما قبله في الفقرة (‏`Jabal al-Qarah` · `Höhlen` · `der frühe Morgen`) فلا اسمَ حرٌّ للحرفة سابق. **فالفرق الذي ادّعته اللفّة غير قائم، وعلّة الحاكم تسري على الزوج نفسه.**

**وأثر الردّ:** الزوج مشقوقٌ فعلاً بين المدوّنة وصفحة المعلم، والسبب ليس أن حالتيهما مختلفتان بل أن **الزوج نفسه يحمل العيب**. فيُرفع بنداً للصيانة: تصحيح جملة `24-hours-de.md` بالصيغة نفسها (`des Töpferhandwerks`) ثم تحديث `tm.json`، في دفعة مدونةٍ ألمانية بخطّها وقارئها الأعمى (‏`CLAUDE.md`: المقال لا يُكتب بالألمانية إلا عبر خطّه). **لا يُمسّ هنا** — خارج نطاق الدفعة.

### (5) استعادة «الشعبية» في `duqat-algharash` — **تُقرّ**

تحقّقتُ من المصدر بنفسي (§1 أعلاه): الكلمة في الإنجليزية (`folk`) وفي الفيصل العربي («الشعبية») وفي الروسية والصينية المعتمدتين. وسندها عند الحاكم ملاحظةُ صفحةٍ **هي أحد سببي خصم الدقة** — فتركها يُبقي الخصم قائماً، واستعادتها إصلاحُ إسقاطٍ لا إضافةُ واقعة. وموضعها صحيح (المتن وحده، لا النبذة). و`das Volkshandwerk` مركّبٌ شفّاف جنسه من رأسه، وسابقته في الدفعة نفسها `Volkskunst` مقابلاً لـ`folk arts` — فلا يشقّ مصطلحاً. **أُضيف لها مدخل معجم بجنسٍ ومصدر.**

---

## 5 — الخلاصة العددية

| البند | العدد |
|---|---|
| حقول غيّرتها اللفّة (من 52) | 10 |
| مواضع التحرير فيها | 36 |
| مواضع لها سند — أُقرّت | 35 |
| **ارتدادات رُدّت** | **1** |
| وقائع مختلقة حُذفت بالسياج | **0** |
| وقائع مصدرٍ ساقطة استُعيدت | 1 (‏«الشعبية»/`folk`) |
| عناصر مصدرٍ أُسقطت بسند الفيصل | 1 (‏`nach Hause`) |
| بنود `must_not_change` مُسّت | **0** من 12 |
| تحريري أنا في المرحلة 4 | 1 |
| ثغرات معجمية أُغلقت | 3 (+2 حسمان) |
