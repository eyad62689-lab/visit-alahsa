# المرحلة 5 · `batch-de-5` — المدقّق اللغوي الألماني (de-DE)

**صفرُ حقلٍ مغيَّر من 52.** `fields.stage5.json` نسخةُ (`cp`) `fields.stage4.json`، و**التطابقُ مُثبَتٌ بـ`cmp` لا مُدّعى**:

```
cmp fields.stage4.json fields.stage5.json   → IDENTICAL
md5  e8270748482c54c6d6feaba0a12331db (كلاهما) · 8535 بايتاً (كلاهما) · json deep-equal: True
```

**البنودُ العشرةُ كلُّها PASS، ولا FIXED فيها.** ولم أُجرِ تصحيحاً تجميلياً واحداً: كلُّ ما بدا مرشَّحاً للإصلاح قِيس فسلَم (التفصيل في القسم ج)، والعُهَدُ السبعُ لم تُمَسّ بحرف.

---

## أ. البنودُ العشرة

### 1. إملاء Duden بـ`ß` — **PASS**
- `ß` ثلاثُ مواضع، كلُّها بعد علّةٍ طويلةٍ أو مزدوجة: `größer` · `heißen` · `heißt`. **صفرُ `ss` سويسريّة.**
- `ss` ستُّ مواضع، كلُّها بعد علّةٍ قصيرة: `Altersgenossen` · `Bedürfnisse` · `Wasser` · `dass` · `lassen` · `passendes`. ولا موضعَ يطلب `ß` فجاء بـ`ss`.
- **الأحرفُ المعتلّة**: جردُ الرموز كاملاً (434 كلمةً مميَّزة) — لا نقصَ ولا خلطَ `Städte`/`Stätte` (الأولى «مدن» في اسم البرنامج، والثانية «موقع» في `archäologische Stätte` و`touristische Stätte`) ✓.
- **تعظيمُ الأسماء**: مسحٌ على 434 كلمة. والمشتبهاتُ فُحصت فرداً: `bekannteste`/`bekanntesten` صغيرةٌ بحقّ (نعتٌ لموصوفٍ محذوفٍ مفهوم — Duden D 72) · `Seite an Seite` · `Leben` (في `ins Leben gerufen`) مقابل `leben` الفعل · `Nationalen` كبيرةٌ لأنها جزءُ الاسم الرسميّ.
- **لا مركَّبَ مشقوق**: مسحُ الكلمتين المتعاظمتين المتجاورتين أعطى 5 مرشَّحات، **كلُّها زائفة** (القسم ب-9).

### 2. Durchkopplung — **PASS**
- 30 مركَّباً موصولاً بشرطة، **صفرُ حرفٍ صغيرٍ بعد شرطة**، وكلُّ اسمِ علمٍ + اسمِ جنسٍ موصول: `Jawatha-Park` · `Jawatha-Moschee` · `Jawatha-Wald` · `Al-Koot-Park` · `Al-Koot-Viertel(s)` · `Al-Moosa-Park` · `Al-Faisal-Viertel` · `Al-Mushaqar-Park` · `Al-Shaibani-Park` · `Mushaqar-Palast` · `Ain-Najm-Park` · `Najm-Quelle` · `Al-Ahsa-Nationalpark` · `Qarah-Bergs` · `König-Abdullah-Umweltpark` · `Sportstadion-Park` · `Qaisariyah-Souk` · `Ibrahim-Palast` · `Al-Ahsa-Reiseführers` · `Saudi-Riyal`.
- والمفصولةُ بمسافةٍ **بحقّ** (اسمُ الجنس متبوعٌ لا مركَّب): `die Ortschaft Al-Kilabiyah` · `die archäologische Stätte Jawatha` · `die Festung Mushaqar` · `der Markt von Mushaqar` · `die Stadt Al-Omran` · `dem Dorf Al-Qarah` · `Qasr Ibrahim` · `Jabal al-Qarah` · `Ain Najm` · `Ayyam al-Arab`.
- **لا حشوَ اسمِ جنس** (‏`no_pleonasm`): `Jabal-al-Qarah-Berg` · `Souk-Markt` · `Markt-Souk` · `Ain Najm-Quelle` · `Park-Park` — **صفرٌ في كلٍّ**. والصيغتان في `national-park` مفصولتان گلوساً لا مركَّباً واحداً.
- `Al-Shaibani-/Al-Mushaqar-Park`: شرطةُ التكملة قبل المائلة صحيحةٌ بقاعدة دودن، و`title_en` يترجم اسمَ الجنس مرّةً واحدةً لاسمين ⇒ بدونها يبقى الاسمُ الأول بلا اسمِ جنس.
- **العناوينُ الثمانيةُ كلُّها موافقةٌ لـ`titel_regel`** بالنظر إلى `title_en` وحده (الجدولُ مقيسٌ آلياً).

### 3. القواعد والأجناس والإعراب — **PASS**
- **الجنس**: مسحٌ آليٌّ يقابل كلَّ مدخلِ معجمٍ بأداته الفعلية في النصّ. **صفرُ مخالفةٍ** بعد بتِّ 30 علامةَ «CHECK» كلِّها زائفة (القسم ب-8).
- **الإعرابُ بعد حروف الجرّ**: `nahe dem Dorf` · `inmitten dichter Pflanzungen` (جرٌّ بالمضاف) · `unweit des Jabal al-Qarah` · `an jene alte Festung` (نصب) · `in den Jawatha-Park` (نصبُ الاتجاه) مقابل `im Jawatha-Park` (ظرفيةٌ بالدات) · `seit alter Zeit` · `aus vorislamischer Zeit` — كلُّها صحيحة.
- **الإضافة**: 13 موضعاً، كلُّها بـ`-s`/`-es` حيث تلزم: `Al-Ahsa-Reiseführers` · `Programms` (×2) · `Al-Koot-Viertels` · `Viertels` (×2) · `Parks` (×3) · `Qarah-Bergs` · `Nationalen Zentrums` · و`Al-Ahsas` (×2) على اسم العلم · و`des Jabal` بلا تصريفٍ للعلم الأعجميّ (سابقةٌ منشورة).
- **نهاياتُ النعت**: فُحصت في 45 مركَّباً اسمياً — القويُّ بعد `ein`/`als`/بلا أداة (`ein weitläufiger grüner Park` · `als zweiter Park` · `traditioneller Markt` · `dichter Pflanzungen` · `heimischer, salztoleranter Arten`) والضعيفُ بعد الأداة (`der berühmten vorislamischen Festung` · `den markanten halbovalen Kuppeln` · `zum kulturellen Erbe`) ✓.
- **قوسُ الجملة مُغلَق**: الأفعالُ ذاتُ السوابق المنفصلة ستَّةٌ كلُّها مُغلَقة آلياً (`weihte … ein` · `ging … hervor` · `fand … statt` · `suchte … auf` · `wuchsen … heran` · `bringen … zusammen`)، والمساعداتُ كلُّها مُغلَقةٌ داخل جملتها (ومنها المقدَّمُ اسمُ مفعولِه: `Erwähnt wird sie …` · `Angelegt hat ihn …` · `Vorausgegangen war ihm …`).

### 4. `Sie` — **PASS**
- **صفرٌ** لـ`\bdu\b` · `dein\w*` · `dich` · `dir` · `euch` · `euer\w*` · ولـ`ihr` بصيغة المخاطبة الجمعية · ولـ`Erleben/Entdecken/Besuchen/Genießen Sie`.
- الدفعةُ خاليةٌ من المخاطبة أصلاً، فلا خلط. و**لا جملةَ تبدأ بـ`Sie`** (قيدُ المرحلة 1).
- الموضعُ الوحيدُ بحرفٍ كبير `Ihre Bauten …` (‏`najm-park`) ضميرُ غائبٍ مؤنّثٍ في **صدر جملة**، والتعظيمُ فيه إلزاميٌّ لا اختيار — ولا بديلَ عنه (التفصيل في ج-7).

### 5. الامتثال المعجميّ — **PASS، 100 %**
- **النصّ ⇒ المعجم**: كلُّ اسمِ علمٍ ومصطلحٍ في الحقول الـ52 له مدخلٌ في `termbase.json` (200) أو في `termbase-additions.stage4.json` (37). **صفرُ اسمٍ خارج المعجم.**
- **المعجم ⇒ النصّ**: كلُّ مدخلٍ يُشغّله المصدرُ مستعمَلٌ بصيغته ومعه گلوسُه حيث وجب. والمُهمَلُ معلَّلٌ بالمصدر: `die Al-Ahsa-Oase` و`Saudi-Arabien` (المصدرُ يقول «the oasis»/«the Kingdom») · `Imam Saud bin Abdulaziz` (المصدرُ «later Imam» ⇒ `Saud bin Abdulaziz, den späteren Imam`) · `König Abdullah` مجرَّداً (لا يَرِد إلا في اسم المنتزه) · `das Volkshandwerk` (لا يَرِد «folk craft»).
- **مطابقاتٌ حرفيةٌ للمعجم والمنشور** فُحصت بايتاً: `das Nationale Zentrum für die Entwicklung der Vegetationsdecke und die Bekämpfung der Wüstenbildung` (بالإضافة) · `Genehmigter Entwurf des Al-Ahsa-Reiseführers` (‏5 مواضعَ منشورة) · `Öffnungszeiten und Eintritt stehen weiter unten bei „Besuchsinformationen“` (زوجُ ذاكرةٍ منشورٌ في `ardh-alhadarat` و`qaisariyah`، و`det.visitInfo` في `src/i18n/ui.ts` = `Besuchsinformationen`) · `Nalaab Ma'an` بفاصلةٍ عليا U+0027 **مطابقةً للمدخل بايتاً**، وهي وحدَها المستعملةُ في حقول `_de` المنشورة (5 نقحرات، وصفرُ U+2019).
- `kicker_de` = `Park` ×8، والمنشورُ يكتب الـkicker اسماً مفرداً بلا أداة (‏`Religiöse Stätte` · `Historische Stätte` · `Traditioneller Markt`) ⇒ النمطُ واحد.

### 6. الترقيم و`„…“` و`–` — **PASS**
- `„…“`: **7 و7 متوازنة**، وكلُّ زوجٍ حسنُ التكوين، و**صفرُ `“` في موضع الافتتاح**. صفرُ `"` مستقيمة وصفرُ `‘`/`’`/`‚`/`«`/`‹`.
- `–` (‏U+2013) 19 موضعاً: **13 اعتراضاً بمسافتين** و**6 مدىً رقمياً بلا مسافة** (`8:00–24:00` · `10–15` ×3 وما في `area_de`). **صفرُ U+2014** (‏C17) وصفرُ U+00A0 وصفرُ شرطةٍ لينة.
- **الفاصلةُ قبل الجملة التابعة**: `dass` ✓ · `um … zu` ×2 ✓ · `statt … zu` ✓ · **12 صلةَ موصولٍ كلُّها مسبوقةٌ بفاصلة** ✓ · `Wo … stand, ist …` ✓ · والأبدالُ محصورةٌ بفاصلتين (`, an der Ostseite der Oase,` · `, den späteren Imam,` · `, bei der Stadt Al-Omran und unweit …,`) ✓.
- **لا فاصلةَ عطفٍ إنجليزية**: `، und` = **2** (بثلاث طرائقِ عدٍّ مستقلّة)، و`، sowie` = 0، و`، oder` = 0 — **والاثنتان صحيحتان** (ب-6)، وكلُّ تعدادٍ في الدفعة (‏9 تعدادات) بلا فاصلةٍ قبل حرف العطف.

### 7. الأرقام والتواريخ والعملة والهجري — **PASS**
- **الأرقامُ لاتينيةٌ حصراً** (‏C4: صفرُ عربيّ-هنديّ).
- نقطةُ الآلاف على المقادير: `2.200 Quadratmetern` · `4.500 Hektar` — **والسنواتُ بلا فاصل** (‏1115 · 1367 · 1382 · 1703 · 1799 · 1948 · 1962 · 2015 · 2019 · 2020) وهو الصوابُ الألمانيّ. ولا عددَ عشريَّ في الدفعة فلا موضعَ لفاصلة العشرية.
- الوقت: `Täglich 8:00–24:00 Uhr` — صيغةُ `datum` (‏`10:00–17:00 Uhr`)، **وهي الصيغةُ المنشورة** (‏`Täglich H:MM–H:MM Uhr` في ثلاثِ صفحاتٍ منشورة على الأقل).
- العملة: أولُ ذكرٍ في الصفحة `10–15 Saudi-Riyal (SAR)` (البطاقة) ثم `10–15 SAR` (السؤال) — قاعدةُ `waehrung` حرفاً.
- الهجريّ: `1115 nach der Hidschra (n. H.; 1703 n. Chr.)` ثم `1367 n. H. (1948 n. Chr.)` — **والفاصلةُ المنقوطةُ داخل القوس سابقةٌ منشورةٌ في 5 ملفات** منها `baiah.md` (مقيسةً). و`national-park` مرّةً واحدةً ⇒ `1382 nach der Hidschra (1962 n. Chr.)` بلا تقديمِ اختصار (سابقة `khuzam`). **لم تُمَسّ صيغةٌ منهما.**
- `1799` ميلاديٌّ مجرَّدٌ بلا قرينٍ هجريّ ✓.

### 8. Denglisch — **PASS**
`Spot(s)` · `Location(s)` · `Must-see` · `Hotspot` · `Guide(s)` · `Feeling` · `Vibe` · **`Highlight` (صفرٌ لا واحدة)** · وزيادةً: `Event` · `Top` · `Trip` · `Tour` · `Style` · `Shopping` · `Facility` · `Area` — **صفرُ إصابةٍ في الجميع** (مسحٌ بحدود الكلمات وبالصيغ المصرَّفة). و`Almoosa Specialist Hospital` اسمُ علمٍ معجميّ (المدخل 13) لا Denglisch.

### 9. الگلوس — **PASS** (مفحوصٌ في الاتجاهين، وبالجوار لا بالوجود)
- **الگلوساتُ الملزمةُ أربعةٌ، كلٌّ مرّةً واحدةً في المتن مُلاصِقةً لرأسه**: `einem Souk (traditioneller Markt)` · `die Ayyam al-Arab (die Schlachttage der Araber)` · `Ain Najm (die Najm-Quelle)` · `„Wir spielen gemeinsam“ (Nalaab Ma'an)`. ومعها زوجُ المدخلين المقترنِ **بلا قوسٍ في المعجم**: `Qasr Ibrahim (dem Ibrahim-Palast)` (المدخلان 77 و18) — وهو بعينه ما أسقطه فاحصُ الدفعة 4.
- **لا گلوسَ في عنوان**: الثمانيةُ بلا قوس.
- **لا مضاعفة**: `Ain Najm` يَرِد في المتن مرّتين والگلوسُ مرّةً واحدةً عند الأولى ✓؛ و`Qasr Ibrahim` و„Wir spielen gemeinsam“ يَرِدان في النبذة مجرَّدين وفي المتن مگلوسين مرّةً — والقاعدةُ «أول ورودٍ **في المتن**» ✓ (والنمطُ واحدٌ في الصفحات الثلاث).
- `Qaisariyah-Souk` **بلا گلوس** بسابقةِ `baiah` المنشور — والمسألةُ معلَّقةٌ لا مخالفة (ج-2).
- الأقواسُ غيرُ الگلوسية مُيَّزت ولم تُحسَب: `(SAR)` عملةً · `(früher Al-Shaibani-Park)` اسماً سابقاً يقوله المصدر · `(n. H.; 1703 n. Chr.)` و`(1948 n. Chr.)` و`(1962 n. Chr.)` تقويماً · و`(Pl.: die Tamarisken)` ملاحظةٌ معجميةٌ لا گلوسٌ مطلوبٌ في النصّ.

### 10. البنية — **PASS**
- **52 حقلاً** بترتيب مفاتيحه، و**قائمةُ المسارات مطابقةٌ لـstage4 حرفاً** (‏19·5·5·5·5·5·4·4 مقيسةً لكلِّ صفحة).
- **أسماءُ الحقول مطابقةٌ للمخطط بايتاً**: `title_de` · `kicker_de` · `summary_de` · `body_de` · `area_de` · `label_de` · `value_de` · `source_de` · `q_de` · `a_de` (‏`src/content.config.ts`). **صفرُ حقلٍ غيرِ `_de`**، وصفرُ `answer_de`/`bestTime_de`، وصفرُ مساسٍ بـ`district`/`hoursSpec`/`fee`/`sameAs`/`slug`/`order`/`category`.
- **صفرُ رابطٍ وصفرُ ترميز**: `https?://` · `](` · `<tag` · `/img/` · `/de/` · باكتِك · نجمة · `__` — لا شيءَ منها.
- `area_de` موجودٌ في الستِّ ذواتِ `area_en` ومعدومٌ في الرقيقتين ✓، و`–` فيه في **6 من 6** ✓.
- الميتا: وصفُ الصفحة مأخوذٌ من `summary_de`، وهو خاضعٌ للقواعد نفسها ومفحوصٌ معها (‏`geltungsbereich`). ولا نصَّ بديلَ صورةٍ في هذه الدفعة.

---

## ب. الفحوصُ التي كذب فيها فاحصي — وكيف أمسكتُه

**عشرةُ مواضع.** ولم أصدّق فاحصاً قبل أن أقيسه.

1. **«`“` علامةٌ إنجليزية»** — قائمةُ المحارف المحظورة صنّفت U+201C (وهو **علامةُ الإغلاق الألمانية** في `„…“`) علامةَ افتتاحٍ إنجليزية ⇒ **7 إصاباتٍ زائفة**. أمسكتُها بفحصِ الدور والتزاوج: 7 `„` و7 `“`، تعاقبٌ سليمٌ في كلِّ حقل، و**صفرُ `“` في موضع افتتاح**.
2. **الگلوسُ في اتجاهٍ واحد** — مسحي الأولُ قوسيٌّ من النصّ وحده، وهو بعينه عطبُ الدفعة 4: **المدخلُ المقترنُ بلا قوسٍ لا يراه** (‏`Qasr Ibrahim` مدخلاً 77 و`der Ibrahim-Palast` مدخلاً 18 — زوجٌ لا قوسَ في المعجم بينهما). أمسكتُه بإضافة الاتجاه **المعجم ⇒ النصّ** على 237 مدخلاً.
3. **«الگلوسُ موجودٌ في الصفحة» بدل «مُلاصِقٌ لرأسه»** — أولُ فحصٍ لاتجاه المعجم⇒النصّ أعلن `GLOSS-OK` لمجرّد ورود سلسلةِ الگلوس في مكانٍ ما من الصفحة، وهي **كذبةُ الدفعة 4 نفسُها بصيغةٍ أخرى**. صحّحتُه بشرط الجوار `رأس + (أداةٌ اختيارية + گلوس)` ثم أعدتُ القياس: أربعةُ گلوساتٍ حقيقية، كلٌّ **مرّةً واحدةً في المتن** (‏`adjacent in body = 1`).
4. **عمى الاتجاه في زوج القارة** — الفاحصُ أعلن `GLOSS-MISSING` للمدخل 15 (`der Qarah-Berg (Jabal al-Qarah)`) لأن النصّ يعكس الترتيب: `des Jabal al-Qarah (des Qarah-Bergs)`. أمسكتُها **بقياس المنشور**: ثلاثُ صفحاتٍ منشورة (`ardh-alhadarat` · `duqat-algharash` · `tahimiyah-e`) تكتب المعكوسَ **بايتاً بايت**، والصيغةُ غيرُ المعكوسة في صفحة القارة وحدها (`jabal-al-qarah.md`) — وهو نصُّ `gloss_regel`. ⇒ النصُّ مطابقٌ للمنشور 3/3.
5. **عمى النطاق في العملة** — أعلن `GLOSS-MISSING` للمدخل 26 (`der Saudi-Riyal (SAR)`) لأنه حصر «الصفحة» في `body_de`، والعملةُ أولُ ذكرِها **في البطاقة** بنصّ قاعدة `waehrung` والعهدة 1. أمسكتُها بعمود `anywhere=1`؛ وهي أصلاً بندُ 7 لا بندُ 9.
6. **«كلُّ فاصلةٍ قبل `und` فاصلةُ عطفٍ إنجليزية»** — كذبةُ الدفعة 3 بعينها: إصابتان، **كلتاهما صحيحة**:
   - `mushaqar.summary_de`: «… Festung Mushaqar, und in seinem Herzen steht …» — عطفُ **جملتين رئيستين**، والفاصلةُ **جائزةٌ** بـDuden D 88/§72 E1.
   - `najm-park.body_de`: «… Saud bin Abdulaziz, den späteren Imam, und König Abdulaziz suchte …» — الفاصلةُ **واجبةٌ** لأنها تُغلق البدلَ `den späteren Imam` (‏D 122)، وحذفُها خطأ.
   ودرءاً لنقصِ العدّ (‏4 مقابل 5 في الدفعة 4): عُدَّت بثلاث طرائقَ مستقلّة (حقلاً حقلاً · على الملفّ الخام · بلا مسافة) ⇒ **2 في الثلاث**، ومعها `، sowie` = 0 و`، oder` = 0.
7. **مرشَّحاتُ Durchkopplung** — ستُّ إصاباتٍ **كلُّها زائفة**: `Die Moschee` · `Der Garten` · `Ein Park` · `Der Park` · `Ein Park` · `Die Quelle` — أدواتٌ في صدر الجملة التقطها `[A-ZÄÖÜ]…`. صفرُ شرطةٍ ناقصة.
8. **مسحُ الأجناس** — 30 علامةَ «CHECK» **كلُّها زائفة**، بثلاث عللٍ في فاحصي: (أ) التقطيعُ ألصق القوسَ بالأداة (`(des` · `(dem`)؛ (ب) نافذةُ الرجوع كلمتان فضاعت الأداةُ البعيدةُ ثلاثاً (`ein weitläufiger grüner Park`)؛ (ج) اختصارُ حقلِ `artikel` متعدّدِ الأجناس إلى جنسٍ واحد (`die (Quelle) / der (Park)` و`die (Pl.) · der · —`). وبعد البتِّ الفرديّ: **صفرُ مخالفةِ جنسٍ أو إعراب**.
9. **مرشَّحاتُ المركَّب المشقوق** — خمسُ إصاباتٍ **كلُّها زائفة**: `Park Natur` (فاعلٌ ومفعولٌ حول الفعل) · `Wasser Heilung` (جارٌّ ومفعول) · `Millionen Tamarisken`/`Bäume`/`Bäumen` (مقدارٌ ومعدود).
10. **تضارُبٌ موهومٌ بين صفحتين** — فاحصُ اتّساقٍ ساذجٌ يصادم `der zweite Ort` (هذه الدفعة) بـ`der erste Ort nach der Moschee in Medina` المنشورةِ في `jawatha-mosque`. والحسابُ يوحّدهما: **الأولُ بعد المدينة هو الثاني في الإسلام**، وكلُّ حقلٍ مرآةُ مصدرِه (‏`body_en`: «the second place …»، والعربية: «ثاني موضع …»). ⇒ لا تضارُبَ ولا تغيير.

---

## ج. ما أبلغتُ عنه ولم أُصلحه — والعلّة

1. **`jawatha-mosque.value_de` شاذٌّ وهو منشور** — يكتب ساعاتِ المنتزه نفسِه `umliegender Park: 8–24 Uhr` و`Park: 10–15 SAR`، وهذه الدفعةُ تكتب `Täglich 8:00–24:00 Uhr`. **قياسي**: صيغةُ `H:MM–H:MM Uhr` في المنشور خمسُ صفحاتٍ على الأقل، وقاعدةُ `datum` وC21 مع صيغة الدفعة؛ **والرسومُ متطابقةٌ رقماً** (‏10–15). والملفُّ في `src/` وخارجَ نطاقي. ⇒ **يُرفع** (مرفوعٌ سلفاً: المرحلة 1 ب-2 والمرحلة 4، البند 2). ولا حارسَ يمسك تفاوتَ صفحتين.
2. **وجوبُ گلوس `Souk`** — معلَّقٌ منذ الدفعة 3 (المدخل 102 قاس صفرَ «Souk (…)» في 11 صفحةً منشورة). تبعتُ **الوجوبَ القائم** كما فعلت المرحلة 4، و`(traditioneller Markt)` في `mushaqar` هي الموضعُ الوحيدُ المتأثّر إن قُضي بغيره. و`Qaisariyah-Souk` بلا گلوسٍ بسابقةِ `baiah`.
3. **علّةُ `musa-park.summary_en`** (العهدة 3) — في **الإنجليزية المنشورة**، لا تُصلَح في الألمانية. باقيةٌ كما رُفعت.
4. **قراراتُ المرحلة 4 الخمس** — نافذةٌ ولم أنقض منها شيئاً: `im Königreich` ×2 · `bei der Stadt Al-Omran` · `wollte` · گلوسُ `Ayyam al-Arab` بالقوسين وبلا نعت · `eine öffentliche Anlage`.
5. **مواضعُ الفاصلة الاختيارية والذوق** — لم أمسَّها (‏POL-DE-9، و«صفرُ تغييرٍ مُثبَتةٌ أشرفُ من تصحيحٍ تجميليّ»):
   - `einem üppigen, künstlich angelegten Wald`: الفاصلةُ جائزةٌ باختبار إدخال `und` (نعتان متساويا الرتبة)، وحذفُها جائزٌ أيضاً — فلا خطأَ يُصلَح.
   - `einem Souk (traditioneller Markt)`: گلوسٌ بالمرفوع بعد رأسٍ مجرور. **قياسي على المنشور**: النمطُ قائمٌ (`mit Tanur (Lehmofen)` · `des Fiqh (islamische Rechtswissenschaft)` · `Aqit (getrockneter Joghurt)`) إلى جانب الموافِقِ في الحالة (`den Bischt (den traditionellen Umhang)` · `dem Khan (der Karawanserei)`)، ودودن يجيز المرفوعَ في الأبدال المقوَّسة. ⇒ PASS.
6. **ثلاثُ إحالاتِ ضميرٍ قابلةٍ للحلّ** تُركت للقارئ الأعمى (المرحلة 6) ولا تُفرَض عليها صياغة: `mit ihrem Wasser` (‏`najm-park`، و`hierher` يثبّت المرجع) · `zu seiner Wiederherstellung` (‏`national-park`، والمعنى يفصل: المركزُ لا يُرمَّم) · `in deren Rahmen` (‏`koot-park`، و«الإطار» للمشاريع لا للوسط التاريخيّ).
7. **`Ihre Bauten …`** (‏`najm-park`) — ضميرُ غائبٍ في صدر جملة، والتعظيمُ إلزاميٌّ فلا خيارَ فيه؛ والصفحةُ والدفعةُ خاليتان من المخاطبة فلا خلط. **غيرُ إصلاحيّ**، وأسجّله لأن فاحصاً ساذجاً للـAnrede سيصطاده.
8. **العُهَدُ السبعُ مقيسةٌ بعد آخر ما فعلت (ولم أفعل شيئاً)**:
   - **C21 بالدالّة `numInText` الحقيقيةِ منقولةً من `tools/check-consistency.mjs`** وبمُقسِّم الأرقام الحقيقيّ: `8:00` · `24:00` · `10` · `15` ⇒ **PASS (4 أرقام، 0 مشكلة)**. **وضوابطُ سلبيةٌ تُثبت أنّ الحارسَ حيٌّ لا صوريّ**: `8` · `24` · `18` · `9` · `16` · `11` · `12` كلُّها `false`. ⇒ وحدةُ الصيغة بين البطاقة والأسئلة **حاملةٌ للبناء**، وأيُّ «تصحيحٍ» ترقيميّ يكسرها — فلم أقترب منها.
   - **الرقيقتان**: `summary_de == body_de` **بايتاً ببايت** (‏66 و54 بايتاً)، ولا كلمةَ رفعٍ فوق عتبة C23.
   - **`najm-park`**: صيغتا التقويم لم تُمَسّا، والفاصلةُ المنقوطةُ داخل القوس بسابقةٍ منشورةٍ مقيسة.
   - **`mushaqar`**: الخلافُ الثلاثيُّ بلا ترجيحٍ ولا إسقاط، وتمييزُ `Souk` (حيّ) / `Markt` (جاهليّ) قائم، و`Qaisariyah-Souk` بلا گلوس.
   - **أصنافُ الحماية**: `Schutzgebiet\w*` · `Naturschutz\w*` · `Naturpark\w*` · `unter Schutz` · `Heilquell\w*` · `Thermal\w*` · `Kurort\w*` · `Heilb\w*` · `barrierefrei\w*` · `denkmalgesch\w*` · `Baudenkm\w*` — **صفرٌ في الجميع**. و`Nationalpark` **مرّتان اسماً لا صنفاً** (العنوان و`der Al-Ahsa-Nationalpark`)، والجملةُ التالية تقول `ein öffentlicher Park`.
   - **C17** صفرُ U+2014 · **C18** صفرُ `Souq` · **C4** صفرُ رقمٍ عربيّ-هنديّ · **لا رابطَ في أيّ متن**.
   - وزيادةً: `Parkanlage\w*` · `Grünanlage\w*` · `Stadtverwaltung\w*` · `städtisch\w*` · `gefeier\w*` · `es gibt` · `!` — **صفرٌ في الجميع**.

---

## د. الفحوصُ الآليةُ النهائية (على `fields.stage5.json` بعد آخر تحريرٍ لي = لا تحرير)

```
cmp stage4 ⇄ stage5 : IDENTICAL · md5 متطابق · 8535 بايتاً · json deep-equal
52 حقلاً · ترتيبُ المفاتيح والمسارات مطابق · 19·5·5·5·5·5·4·4
U+2014 0 · U+00A0 0 · شرطةٌ لينة 0 · Souq 0 · عربيّ-هنديّ 0 · du/dein 0
Denglisch 0 · Highlight 0 · أصنافُ حماية 0 · روابط 0 · ! 0 · Erleben/Entdecken Sie 0
„…“ 7/7 متوازنة · –: 13 اعتراضاً بمسافتين + 6 مدىً بلا مسافة · «، und» = 2 (صحيحتان)
C21 (الدالّة الحقيقية): 4/4 PASS + 7 ضوابطَ سلبيةٍ كلُّها false
الرقيقتان متطابقتان بايتاً · kicker = Park ×8 · لا answer_de/bestTime_de
```

**الحكم: البنودُ العشرةُ PASS · صفرُ حقلٍ مغيَّر من 52 · صفرُ عهدةٍ مُخترقة.**
