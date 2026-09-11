# ملاحظات المرحلة 3 — الموائم الثقافي لسوق DACH (دفعة المعالم الألمانية 1)

المدخل: `fields.stage2.json` (ناتج المرحلة 2 كاملاً، لا `stage1`). الدور: `de-translation/prompts/03-localizer.md`.
**السياج: لم أُضف واقعة واحدة** — لا زاوية تصوير، ولا نصيحة آداب زيارة، ولا مدة، ولا أفضل وقتٍ جديد، ولا مقارنة بوجهة أخرى. قائمة ما امتنعت عنه صراحةً في §3، وهي الأهم في هذا الملف.

**الحصيلة المقيسة: 4 حقول في 4 معالم** (‏`qaisariyah`/`body_de` · `craftsmen-souq`/`body_de` · `baiah`/`body_de` · `lemon-farm`/`body_de`)، و`duqat-algharash` بلا تغيير (‏§4). **ولم أشطر جملة واحدة في هذه المرحلة** — كل تغييراتي إقحام گلوس أو تحويل إطار، والفحص في §2.

---

## 1. التغييرات الأربعة — واحدة واحدة

### 1.1 `qaisariyah`/`body_de` — گلوس «Hasawi» + تحويل الخاتمة إلى قيد تخطيط
- `den Umhang für Ansehen und große Anlässe` ← **`den Umhang aus Al-Ahsa für Ansehen und große Anlässe`**.
  القارئ الألماني يمرّ في هذه الصفحة على `Hasawi` مرتين (`Hasawi-Bischt` ثم `„Hasawi-Weberei“`) بلا أن يعرف أنها نسبةٌ إلى المكان الذي يقرأ عنه. والگلوس **ترجمةٌ لا واقعة**: العربية الفيصل تقول «البشت **الحساوي**»، وسابقته معتمدة حرفياً في الخط نفسه — `Die Hasawi-Limette (die Limette aus Al-Ahsa)` في `48-hours-de.md`. موضعه أول ورود في المتن لا في العنوان، ومرة واحدة للصفحة كلها (‏`Hasawi-Weberei` بعده بلا گلوس، و`Neben dem Bischt` بلا تكرار).
- `Familien aus Al-Ahsa` ← **`die Familien der Oase`** — **أثرٌ لازمٌ للگلوس أعلاه، لا تغيير مستقل:** إقحام `aus Al-Ahsa` على البشت جعل العبارة نفسها تتكرر بعد جملتين (`den Umhang aus Al-Ahsa` … `Familien aus Al-Ahsa`). و`die Familien der Oase` مرجعها هو هو (الأحساء هي الواحة)، والتسمية معتمدة في الموقع بالألمانية (`Wahrzeichen der Oase` · `Höhlen im Herzen der Oase`). فالگلوس لم يُشترَ بصدىً لفظي.
- `die beste Zeit ist der Abend` ← **`den Besuch legen Sie am besten auf den Abend`**.
  المضمون هو هو (المصدر: «أفضل أوقاته الفترة المسائية»)، والمتغيّر إطاره: **الوقت صار قيد تخطيط لا وصفاً**، وهو أول ما يخطّط عليه قارئ DACH. صيغة خبرية بتقديم المفعول لا صيغة أمر، فلا تضخّم عدّاد `Erleben Sie/Entdecken Sie` (وهو صفر في الدفعة).

### 1.2 `craftsmen-souq`/`body_de` — مخاطبة الزائر بدل الوصف المحايد
- `Auf mehr als 12.000 Quadratmetern vereint er 112 Geschäfte …` ← **`… finden Sie 112 Geschäfte …`**.
  القائمة (الفناء · القهوة · المخبز · الساحة) هي ما يخطّط عليه الزائر فعلاً، فنُقلت من صيغة تقريرٍ عن المنشأة إلى صيغة ما ستجده أنت — وهي مخاطبة `Sie` المسنَدة في `_meta.style_rules.anrede_sie`. **لا رقم تغيّر ولا عنصر في القائمة، ولا بندٌ نُقل من `practical` إلى المتن.** و`vereint` باقية في `summary_de` فلا يضيع إطار «يجمع تحت مظلّة واحدة».

### 1.3 `baiah`/`body_de` — ما يراه الزائر ينتقل إلى جملة رئيسة
- `Heute ist es ein Museum, dessen Räume … zeigen, die seine Geschichte erzählen.` ← **`Heute ist es ein Museum: Seine Räume zeigen …, die seine Geschichte erzählen.`**
  البيت اليوم متحفٌ يُزار، والمعروضات هي سبب الزيارة لقارئ DACH؛ وكانت مدفونةً في صلة موصولٍ داخل صلة موصول. النقطتان ترفعانها إلى جملة رئيسة وتفكّان الطبقتين. **لا معروض أُضيف ولا حُذف.**
- وما يخصّ التخطيط في هذه الصفحة كان في موضعه أصلاً ولم يحتج نقلاً: الجملة الأولى تفتتح بالموقع والمشي (`nur wenige Schritte von Qasr Ibrahim … und dem Qaisariyah-Souk entfernt`)، وهي تماماً ربط المعلم ببقية اليوم في الهفوف.

### 1.4 `lemon-farm`/`body_de` — گلوس «Hasawi» على صفحة رقيقة
- `… die berühmte Hasawi-Limette (Lomi).` ← **`… die berühmte Hasawi-Limette (Lomi), die Limette aus Al-Ahsa.`**
  الگلوس المعتمد حرفياً في `48-hours-de.md`. وعلى صفحةٍ متنها جملة واحدة يكون هذا كل ما يملكه القارئ ليعرف لماذا لهذه الليمونة اسمٌ خاص. `(Lomi)` كما في المصدر بلا مساس.

---

## 2. فحص «الجملة وحدها» على مخرج المرحلة 3

**لم أشطر جملة واحدة في هذه المرحلة** (القيد المقيس عليّ يقول: حيث لا أجزم لا أشطر — وهنا لم تكن حاجة، فالمرحلة 2 فرغت من الشطر). ومع ذلك فحصت الجمل الأربع المعدَّلة **مغطّياً المصدر**، لأن إقحام الگلوس يطيل الجملة ويمكن أن يقطع إسناداً:

| الجملة بعد تعديلي | فاعل ومسند؟ | مراجع الضمائر |
|---|---|---|
| `Der Souk ist der ideale Ort, um den berühmten Hasawi-Bischt zu erwerben, den Umhang aus Al-Ahsa für Ansehen und große Anlässe.` | `Der Souk` + `ist` ✔ | البدل `den Umhang …` في المنصوب مطابقاً لـ`den … Bischt`؛ لا ضمير عائد إلى خارج الجملة. ✔ |
| `Öffnungszeiten und Eintritt finden Sie weiter unten unter „Besuchsinformationen“; den Besuch legen Sie am besten auf den Abend.` | الشطران فاعلهما `Sie` ومسندهما `finden` و`legen` ✔ | `den Besuch` اسم كامل لا ضمير؛ و`weiter unten` إحالة إلى موضعٍ في الصفحة لا إلى نصٍّ غائب. ✔ |
| `Auf mehr als 12.000 Quadratmetern finden Sie 112 Geschäfte für Handwerker, einen offenen Innenhof, ein traditionelles Kaffeehaus, eine Bäckerei mit Tanur (Lehmofen) und einen Veranstaltungsplatz.` | `Sie` + `finden` ✔ | كل عناصر القائمة في المنصوب ✔؛ `Auf mehr als 12.000 Quadratmetern` ظرف مساحةٍ مرساه `der Handwerker-Souk` في الجملتين السابقتين، وليس ضميراً. ✔ |
| `Heute ist es ein Museum: Seine Räume zeigen Sammlungsstücke, Werkzeuge, Handschriften und Fotografien, die seine Geschichte erzählen.` | شطران: `es` + `ist`، ثم `Seine Räume` + `zeigen` ✔ | `es` محايد ← `das Haus`، وهو المحايد الوحيد في الجملتين السابقتين (`den saudischen Nationalfeiertag` مذكّر)؛ و`Seine` و`seine` داخل الجملة نفسها ← `das Museum`/`das Haus`. ✔ |
| `Auf dieser Zitrusfarm pflücken Besucher in der Saison die berühmte Hasawi-Limette (Lomi), die Limette aus Al-Ahsa.` | `Besucher` + `pflücken` ✔ | البدل الختامي مطابق لـ`die … Limette` في المنصوب، فلا يُقرأ صلةَ موصولٍ مبتورة. ✔ |

---

## 3. السياج — ما امتنعت عنه عمداً وهو مغرٍ (لتقرأه المرحلة 4 فلا تبحث عن محذوف)

1. **موسم الليمون الحساوي.** `48-hours-de.md` المعتمد يقول «`ab Mitte Juni`»، و`lemon-farm` تقول «`in der Saison`» ولا تسمّي شهراً. **لم أنقل الشهر** — واقعةٌ من صفحةٍ أخرى تبقى في صفحتها، ونقلها إلى هنا اختلاق بمقياس هذا المشروع.
2. **اليوم الوطني السعودي بتاريخه.** `baiah` تذكر الاحتفال ولا تذكر 23 سبتمبر في أي من النسختين. لم أُضفه.
3. **آداب الزيارة واللباس.** الدور يسمح بها «حيث ينصّ المصدر» فقط، ولا نصّ عليها في أيٍّ من الصفحات الخمس (بخلاف `jawatha-mosque` التي تحمل بنداً معتمداً). صفر إضافة.
4. **الحرّ والظلّ وأوقات الذروة.** لا `qaisariyah` ولا `craftsmen-souq` تذكران حرّاً؛ ومسوّغ المساء في المصدر هو فتح المتاجر لا الحرارة. فلم أكتب `Hitze` ولا `Schatten` في أي منهما.
5. **مدة الزيارة.** `qasr-ibrahim` تحمل بند `Besuchsdauer` معتمداً؛ صفحاتي الخمس لا تحمله. لم أقدّر مدةً لأي منها.
6. **المسافات بين المعالم.** `24-hours-de.md` يقول «`etwa einen halben Kilometer von Qasr Ibrahim entfernt`» عن القيصرية. **لم أنقله** إلى `baiah` ولا إلى `qaisariyah`؛ ما في المصدر هنا هو «خطوات» وحدها وبقيت وحدها.
7. **الوصول والعائلات وكبار السن ودورات المياه والماء.** لا سند لأيٍّ منها في هذه المصادر الخمسة. صفر.
8. **نقل بندٍ من `practical` إلى المتن.** مغرٍ في `craftsmen-souq` (الفتح حتى منتصف الليل قيد تخطيط ثمين)، لكنه يغيّر ما يقوله المتن المصدر. تُرك في بطاقة الزيارة حيث وضعه المصدر.

**ثغرة محتوى لا ثغرة ترجمة — مرفوعة للمرحلة 7:** `baiah` صفحة متحفٍ **بلا `practical` وبلا `bestTime` في المصدر أصلاً** (ولا في أي لغة)، فالقارئ الألماني يخرج منها بلا مواعيد ولا رسوم. لا يجوز لي سدّها، وسدّها قرار محتوى للمالك بمصدر موثّق.

---

## 4. لماذا `duqat-algharash` بصفر تغيير — وهو قرار لا إهمال

فحصت الصفحة على بنود الدور واحداً واحداً: الگلوسات في مواضعها بعد المرحلة 2 (‏`Jabal al-Qarah (des Qarah-Bergs)` بترتيبٍ محكوم بعنوان صفحة الجبل، و`Dougha Al-Gharash, ein traditionelles Töpferhaus` بدلاً يشرح الاسم للقارئ الذي لا يعرف ما «الدوغة»)؛ وخاتمة المتن **مخاطِبة للزائر أصلاً** وتحمل بالضبط ما يخطّط عليه قارئ DACH في ورشة حرفية: ماذا يرى (مراحل الصنعة الثلاث) وهل يقتني (`nehmen eines seiner Erzeugnisse mit nach Hause`)؛ والعزو الصحفي (`Presseberichten zufolge`) يخدم قارئاً ألمانياً يقرأ دعوى «600 عام» بعين ناقدة. ولا في الصفحة موسم ولا مواعيد ولا وصول ولا عائلة أُبرزها — **وكل ما كان يمكن أن أضيفه هنا هو بالضبط ما يمنعه السياج.** فالصفر هنا التزامٌ بالدور لا تخلٍّ عنه.

---

## 5. المعجم — لا مدخل جديد، وعلّة ذلك

**لم أُنشئ `termbase-additions.stage3.json`: مرحلتي لم تُدخل اسم علمٍ واحداً جديداً.** جردتُ كل اسم في مخرجي على `de-translation/glossary/termbase.json` (‏62 مدخلاً) و`termbase-additions.stage1.json` (‏17 مدخلاً) فوجدت الجميع مغطّى — ومنها ما تحتاجه گلوساتي بالذات: `die Hasawi-Limette` · `die Hasawi-Limettenfarm` · `der Tanur (Lehmofen)` · `Al-Qarah (village)` · `der Qarah-Berg (Jabal al-Qarah)` · `der Bischt (traditioneller Umhang)`. وسياسة التسمية (`_meta.naming_policy.default`) تُبقي النقحرة اللاتينية كما في النسخة الإنجليزية، فالگلوس الذي أضفته **ترجمة نسبةٍ لا اسمٌ جديد**.

**تنبيه واحد للمرحلة 4 كي لا تقرأه خرقاً:** مدخل المعجم للبشت يحمل الگلوس `der Bischt (traditioneller Umhang)`، ونصّي يقول `den berühmten Hasawi-Bischt, den Umhang aus Al-Ahsa für Ansehen und große Anlässe`. كلمة الگلوس المعتمدة (`Umhang`) **محفوظة**، لكنها تصل عبر البدل الذي يحمله المصدر نفسه («عباءة الوجاهة والمناسبات») بدل قوسٍ ثانٍ — لأن جمع الاثنين يُنتج گلوسين لمصطلح واحد في صفحة واحدة، وهو ما تمنعه `gloss_regel` نصّاً.

---

## 6. القرارات المعلّقة الثلاثة — محمولة كما هي، بلا بتّ

1. **عنوان `duqat-algharash`**: `title_de: "Dougha Al-Gharash"` **كما اختارته المرحلة 1** (ترجيح `no_pleonasm` على `titel_regel`). لم أمسّه، ولم أُرجّح، والبتّ للمرحلتين 4 و7. ويبقى ما سجّلته المرحلة 2 قائماً: اعتماد `Dougha-Al-Gharash-Töpferei` لاحقاً لا يستلزم إعادة كتابة أي جملة، فالبدل `ein traditionelles Töpferhaus` في موضعه.
2. **الهجري في `baiah`**: `nach der Hidschra` كاملةً في النبذة (أول ذكر فعليّ) و`n. H.` في المتن، وثمنه ظهور `1203` بصيغتين على بُعد سطرين. **أبقيت الحال**؛ گلوساتي لم تمسّ أياً من الصيغتين ولا موضعهما.
3. **`det.faq` غائبة من كتلة `de:` في `src/i18n/ui.ts`**: شأن تطبيق لا شأن نصّ. **لم أفعل شيئاً حياله.**

---

## 7. فحص الحرّاس — أُعيد بعد آخر تحريرٍ لي (لا قبله)

شُغّل الفاحص الآلي نفسه على `fields.stage3.json` بعد كتابة آخر گلوس — تنفيذاً للدرس المقيس في الدفعة الصينية 19، حيث ولّدت المرحلةُ الأخيرة كلمتين محظورتين **بعد** مسحها:

**C18** صفر `Souq` (مسحٌ بحدود الكلمات `\bSouqs?\b` لا بحثاً عن الكلمة مفردةً) · **C17** صفر U+2014 · **C14** `bestTime_de` بلا كلمة من `SEASONAL_DE` (بالتعبير النمطي المنسوخ حرفياً من `tools/check-consistency.mjs`؛ و`Saison` ترد في `lemon-farm` وحدها وهي بلا `bestTime`) · **C4** صفر رقم عربي-هندي · **C15/C16** لا دعوى واحة ولا كهوف في الدفعة · صفر U+00A0 · صفر `"` مستقيمة (والفاصلة العليا الوحيدة في `Bayt Al-Bay'ah` هي U+0027) · صفر `du` بحدود الكلمات · صفر صيغة سويسرية `ss` · صفر Denglisch من `Spot · Location · Must-see · Hotspot · Guide · Feeling · Vibe · Shopping · Stopp · Event` · `Highlight` صفر مرة · صفر علامة تعجب · `Erleben/Entdecken Sie` صفر مرة · كل شرطة اعتراض U+2013 بمسافتين وكل نطاقٍ بلا مسافة.

**البنية:** المفاتيح الخمسة، وحقول كل معلم، وعدد بنود `practical` و`faq` وترتيبها — **مطابقة حرفياً** لـ`fields.stage1.json`، ولا حقل نصّي فارغ.
