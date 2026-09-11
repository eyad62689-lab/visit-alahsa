# المرحلة 4 — جدول التغييرات وسياج الوقائع (دفعة المعالم الألمانية 1)

المدخل: `fields.stage3.json`. المخرج: `fields.stage4.json`. الدور: `de-translation/prompts/04-benchmarker.md`.
**الحصيلة: 7 استبدالات في 5 حقول من 3 معالم.** `duqat-algharash` و`lemon-farm` بصفر تغيير، وهو قرار معلَّل في `notes.stage4.md` §1 و§3.

طريقة التنفيذ: التغييرات طُبِّقت بسكربت استبدالٍ محسوب لا بإعادة كتابة الملف، وكل استبدال **يُتحقَّق من عدد إصاباته قبل تطبيقه** (أُلزم كلٌّ منها بإصابة واحدة)، ثم يُقارَن الملفان على ثلاثة ثوابت: مجموعة الأرقام (32 رقماً قبل وبعد، متطابقة)، ومفاتيح كل معلم وترتيبها، وعدد بنود `practical`/`faq` وترتيب مفاتيحها. فلا تغيير صامت.

---

## أ. الجمل المغيَّرة — قبل ← بعد

### 1. `qaisariyah` / `body_de` — رائحة ترجمة: حرف جرٍّ واحد يحمل معنيين لا يحملهما في الألمانية

> **قبل:** … um den berühmten Hasawi-Bischt zu erwerben, **den Umhang aus Al-Ahsa für Ansehen und große Anlässe.**
> **بعد:** … um den berühmten Hasawi-Bischt zu erwerben, **den Umhang aus Al-Ahsa für große Anlässe, ein Zeichen von Ansehen.**

الإنجليزية `the cloak of standing and of great occasions` تعطف بـ`of` مرتين، والعربية «عباءة الوجاهة والمناسبات» بإضافةٍ واحدة تحتمل الاثنين. والألمانية لا تحتملهما بـ`für` واحدة: `Umhang für große Anlässe` سليمة (ثوبٌ لمناسبة)، و`Umhang für Ansehen` تقرأ ثوباً *غرضه* الوجاهة — وهو تركيب لا يقوله الألمانيّ. فصار «الوجاهة» بدلاً مستقلاً في المنصوب (`ein Zeichen von Ansehen`، منصوبٌ محايد مطابقٌ لـ`den Umhang`). **الواقعتان باقيتان كلتاهما، ولا ثالثة أُضيفت.**

### 2. `qaisariyah` / `body_de` — سياج: أداة تعريف توسّع الدعوى

> **قبل:** Dieses Handwerk geben **die Familien der Oase** von Generation zu Generation weiter.
> **بعد:** Dieses Handwerk geben **Familien der Oase** von Generation zu Generation weiter.

المصدر نكرة في اللغتين: `a craft Al-Ahsa families have handed down` · «توارثته **أسر الأحساء**». والمعرفة الألمانية تُقرأ قراءةً عامة تشمل الأسر كلها، وهي دعوى أوسع من المصدر. وهذا بالضبط ما فعلته المرحلة 2 بنفسها في `summary_de` للمعلم الثاني («حُذفت أداة التعريف من `die Handwerker` — الإنجليزية نكرة»)، فالحذف هنا التزامٌ بمبدأٍ قائم في الدفعة لا اجتهادٌ جديد.

### 3–5. `craftsmen-souq` / `summary_de` · `body_de` · `faq[2].a_de` — سياج: رتبةٌ إدارية غير مسنَدة

> **قبل:** … unter der Aufsicht der **Stadtverwaltung** von Al-Ahsa.
> **بعد:** … unter der Aufsicht der **Kommunalverwaltung** von Al-Ahsa.

ثلاثة مواضع بالاستبدال نفسه. العلّة **وقائعية لا أسلوبية**: `Stadtverwaltung` تعني بالألمانية إدارةَ *مدينة*، والمتحقَّق منه (المرحلة 4، بحث الويب 2026-09-11) أن «أمانة الأحساء» جهةٌ على مستوى **المحافظة**، تابعة لوزارة الشؤون البلدية والإسكان، وتحتها **تسع بلديات** منها بلدية الهفوف نفسها وبلدية وسط الهفوف التاريخي. والسوق يقع في الهفوف، فالصيغة الأولى كانت تُنزل الجهة رتبةً وتوحي للقارئ الألماني أن الأحساء مدينة — وهو ما يناقض اسم الموقع الأممي نفسه (`Oase Al-Ahsa`). و`Kommunalverwaltung` محايدة الرتبة في الألمانية. التفصيل والمصادر في `termbase-additions.stage4.json`.

### 6. `craftsmen-souq` / `body_de` — المعجم: اسم البرنامج كما تكتبه اللجنة الألمانية لليونسكو

> **قبل:** … mit dem Beitritt Al-Ahsas zum **UNESCO-Netzwerk der Kreativstädte** verbunden ist.
> **بعد:** … mit dem Beitritt Al-Ahsas zum **Netzwerk der UNESCO Creative Cities** verbunden ist.

المرحلة 1 وسمت المدخل «بانتظار تحقق الويب — المرحلة 4» وعرضت بديلين. والتحقق (2026-09-11) رجّح الثاني: الجهةُ المرجعية الأولى في ملفّ دوري — Deutsche UNESCO-Kommission — تكتب اسم البرنامج بالإنجليزية في نصّها الألماني («Das weltweite Netzwerk der Creative Cities»، «Creative Cities in Deutschland»، واللقب الممنوح «UNESCO Creative City»)، و«Kreativstadt» ترد عندها اسمَ جنسٍ واصفاً لا اسماً للشبكة. وللموقع سابقتان معتمدتان في إبقاء الاسم الرسمي الإنجليزي داخل نصٍّ ألماني: `Heritage Commission` في `sahood.md` و`Land of Civilisations` في `jabal-al-qarah.md`.

### 7. `baiah` / `body_de` — المعجم: نقحرة الشهر الهجري

> **قبل:** Es war das erste Haus, das König Abdulaziz am 28. **Jumada I** 1331 n. H. (4. Mai 1913) …
> **بعد:** Es war das erste Haus, das König Abdulaziz am 28. **Dschumada I** 1331 n. H. (4. Mai 1913) …

مدخلٌ آخر كان موسوماً «بانتظار تحقق الويب». والتحقق أعطى الصيغة الألمانية نصّاً: مقالة `Dschumādā l-ūlā` تذكر الصيغة المختصرة **«Dschumada I»** حرفياً. وبهذا تنطبق `naming_policy.exception` (الاسم الألماني المستقر حين يوجد) لا `naming_policy.default`؛ والمعجم يحمل أصلاً `Dschidda` على النمط الصوتي نفسه. وحجةٌ ثانية مستقلة: `Jumada` يقرؤها الألمانيّ بصوت /j/ فتخرج «يومادا» — أي أن إبقاء الحرف اللاتيني هنا يُفسد النطق بدل أن يحفظه.

---

## ب. سياج الوقائع — الجرد الكامل

**المحذوف: 1 · الثابت بعد التحقق: 21 · المؤجَّل الموسوم: 0.**

المرحلة 3 أبلغت أنها أضافت صفراً. **تحققتُ ولم آخذ ذلك تسليماً**، بجردٍ آليّ ثم بمقابلةٍ يدوية واقعةً واقعة.

### ب-1. الجرد الآليّ (الأرقام والصفات المطلقة)

استُخرجت كل سلاسل الأرقام من الحقول الألمانية الخمسة ومن مصدرها الإنجليزي/العربي، وقوبلت:

| المعلم | أرقام النصّ الألماني | ليست حرفياً في المصدر |
|---|---|---|
| `qaisariyah` | 8:00 · 12:00 · 15:30 · 22:00 · «zwei Jahrhunderte» | صفر |
| `craftsmen-souq` | 112 · 12.000 · 2020 · 7:00 · 7:30 · 14:30 · 24:00 | صفر |
| `baiah` | 1203 · 1789 · 1853–1921 · 1331 · 28 · 4 · 1913 · 2005 · 2007 · 705 · 2 | صفر |
| `duqat-algharash` | 600 | **600** — والمصدر يكتبها لفظاً: `more than six hundred years` / «لأكثر من ستمائة عام». فهي في المصدر لا خارجه، ورسمُها رقماً هو قاعدة الموقع (‏C4 وأرقام `_meta.style_rules`). **ثابتة.** |
| `lemon-farm` | لا رقم | صفر |

وفحصُ الصفات التفضيلية أخرج تسعاً، ولكلٍّ سندها: `ältesten` ← `oldest` · `traditionsreichsten` ← `most storied` · `am besten` ← `best hours` · `bedeutendsten` ← `foremost` · `erste (Haus)` ← `first house` · `Älteste (der Familie)` ← `elder of the family` · `bekanntesten` ← `best-known` (النبذة) · `berühmtesten` ← `most celebrated` (المتن — والتمييز بين الاثنتين مقصود ومطابق للمصدر).

### ب-2. ما حُذف بالسياج

| # | الموضع | ما حُذف | من أين جاء | لماذا حُذف |
|---|---|---|---|---|
| 1 | `craftsmen-souq` ×3 | الرتبة الإدارية «مدينة» في `Stadtverwaltung` | ليست من المرحلة 3 بل من **المرحلة 1** (وقد وسمت مدخلها بنفسها «بانتظار تحقق») | المصدر يقول `Municipality` / «أمانة» بلا تحديد رتبة؛ والألمانية اختارت رتبةً ينفيها المتحقَّق منه (جهة محافظة تحتها تسع بلديات). دعوى إدارية بلا سند = واقعة مضافة. |

**ولا شيء غيرها.** المرحلة 3 لم تضف واقعة — تأكّد ذلك بالمقابلة أدناه.

### ب-3. ما فُحص وثبت (لم يُحذف) — وهذه أطول قائمة عمداً

الگلوسات هي أكثر ما يُشتبه فيه، لأنها تبدو زيادةً في النصّ. فُحصت واحداً واحداً:

| # | الموضع | العبارة | الحكم |
|---|---|---|---|
| 1 | `qaisariyah`/body | `den Umhang aus Al-Ahsa` | **ثابتة.** `aus Al-Ahsa` ترجمة النسبة في «الحساوي» لا واقعة جديدة؛ وسابقتها معتمدة حرفياً: `die Limette aus Al-Ahsa` في `48-hours-de.md`. |
| 2 | `qaisariyah`/body | `„Hasawi-Weberei“` بين قوسي اقتباس | **ثابتة.** المصدران يضعانها بين قوسين («الحياكة الحساوية» · `“Hasawi weaving”`). |
| 3 | `qaisariyah`/body | `die mit Gold oder Silber überzogen sind` | **ثابتة.** ← `washed with gold or silver` / «المغطّاة بماء الذهب أو الفضة». |
| 4 | `qaisariyah`/body | `unter „Besuchsinformationen“` | **ثابتة — وتُحقّق منها في الكود لا بالظن:** `src/i18n/ui.ts` → `de['det.visitInfo'] = 'Besuchsinformationen'`، و`DetailView.astro:249` يصيّرها عنواناً للبطاقة. فالإحالة صادقة على الصفحة المبنيّة. (لو كانت التسمية غير ذلك لكان النصّ يكذب على قارئه.) |
| 5 | `qaisariyah`/body | `Unverwechselbar ist seine Architektur` | **ثابتة.** `unverwechselbar` هو المقابل المعجمي القياسي لـ`distinctive`، ودعوى وصفٍ لا دعوى رتبة. (`einzigartig` كانت ستكون خرقاً، وليست في النصّ.) |
| 6 | `craftsmen-souq`/body | `Tanur (Lehmofen)` | **ثابتة.** الگلوس نصّ مدخل المعجم حرفياً: `der Tanur (Lehmofen)`. |
| 7 | `craftsmen-souq` ×3 | `Aufsicht` مقابل `run by` الإنجليزية | **ثابتة.** العربية الفيصل تقول «بإشراف» و«تشرف عليه» في الموضعين، والإنجليزية تتنقّل بين `overseen by` و`run by`. |
| 8 | `baiah`/body | `Bayt Al-Bay'ah (das Haus des Treueids)` | **ثابتة.** ← `the House of Allegiance` في `body_en`. |
| 9 | `baiah`/body | `Qasr Ibrahim (dem Ibrahim-Palast)` | **ثابتة.** مدخل معجم قائم، وترتيبه محكوم بعنوان صفحة القصر (`title_de: "Qasr Ibrahim"`). |
| 10 | `baiah`/body | `die saudische Agentur …` | **ثابتة.** `saudisch` من `the **Saudi** Agency` في `body_en` (والعربية بلا الوصف — فالإنجليزية مصدرٌ والعربية لا تناقضها). |
| 11 | `baiah`/body | `Seither begehen die Menschen in Al-Ahsa hier den saudischen Nationalfeiertag` | **ثابتة.** والصيغة على العربية («يحتفل الأحسائيون فيه») لا على الإنجليزية (التي تجعل البيت هو الفاعل المضياف). لا تاريخ (23 سبتمبر) أُضيف. |
| 12 | `baiah`/body | `zwei Geschosse` · `705 Quadratmeter` · `1853–1921` | **ثابتة** كلها بنصّ المصدر. |
| 13 | `duqat`/body | `ein traditionelles Töpferhaus` بدلاً | **ثابتة.** ← `a heritage pottery house` في `body_en` و«بيت فخار تراثي» في المتن العربي. |
| 14 | `duqat`/body | `Jabal al-Qarah (des Qarah-Bergs)` | **ثابتة.** مدخل معجم قائم. |
| 15 | `duqat`/body | `Presseberichten zufolge` | **ثابتة.** ← `press accounts record` / «تذكر التغطيات الصحفية». والعزو مقصود: هو الذي يجعل دعوى «600 عام» منسوبةً لا مُثبَتة. |
| 16 | `duqat`/body | `in Frankreich, den Vereinigten Staaten und Kanada` | **ثابتة.** الدول الثلاث بنصّ المصدر، ولا رابعة. |
| 17 | `lemon-farm` | `die Limette aus Al-Ahsa` | **ثابتة.** كالبند 1، وبالسابقة المعتمدة نفسها. |
| 18 | `lemon-farm` | `(Lomi)` | **ثابتة.** بنصّ المصدر `(lomi)`. |
| 19 | كل الدفعة | لا موعد ولا رسم ولا مسافة ولا مدة زيارة خارج المصدر | **مؤكَّد.** والثماني التي امتنعت عنها المرحلة 3 (موسم الليمون من صفحة أخرى · تاريخ اليوم الوطني · آداب اللباس · الحرّ والظل · مدة الزيارة · المسافة «نصف كيلومتر» من المقال · الوصول · نقل بندٍ من `practical` إلى المتن) — **فتّشت عن كلٍّ منها في `fields.stage3.json` فلم أجد لها أثراً.** الامتناع مطابقٌ لما أُبلغ عنه. |
| 20 | `qaisariyah`/summary | `einer der ältesten seiner Art` | **ثابتة.** المصدر `one of the oldest folk markets`؛ و«seiner Art» تحفظ نطاق الدعوى (الأسواق من نوعه) بلا أن تكرّر `Souk/Märkte` في سطر واحد. |
| 21 | `baiah`/summary | التاريخ الهجري بصيغته الكاملة | **ثابتة.** قرارٌ مستقل، معلَّل في `notes.stage4.md` §2. |

### ب-4. ما تحقّقت منه بالبحث — وما بقي موسوماً

خمسة مداخل من مداخل المرحلة 1 السبعة عشر كانت بمصدر «بانتظار تحقق الويب — المرحلة 4». `unesco.de` و`unesco.at` و`de.wikipedia.org` و`duden.de` **محجوبة فعلاً** عن هذه البيئة، و`WebSearch` وحدها تعمل — فاستُعملت، ومقتطفات الفهرس تحمل نصّ العناوين والفقرات الأولى فتصلح سنداً مكتوباً.

| المدخل | النتيجة | الأثر في النصّ |
|---|---|---|
| `Jumada I` | **حُسم وغُيّر** ← `Dschumada I`. المقالة الألمانية تذكر «oder kurz **Dschumada I**» نصّاً. | موضع واحد (`baiah`) |
| `das UNESCO-Netzwerk der Kreativstädte` | **حُسم وغُيّر** ← `das Netzwerk der UNESCO Creative Cities`. اللجنة الألمانية لليونسكو لا تترجم اسم البرنامج. | موضع واحد (`craftsmen-souq`) |
| `die Stadtverwaltung von Al-Ahsa` | **حُسم وغُيّر** ← `die Kommunalverwaltung von Al-Ahsa`. الأمانة على مستوى المحافظة، تحتها تسع بلديات. | ثلاثة مواضع (`craftsmen-souq`) |
| `die saudische Agentur für Altertümer und Museen` | **حُسم وثبت.** الجهة قائمة بهذا الاسم الإنجليزي في زمن الترميم، **ولا اسم ألماني رسمي لها** — فالترجمة الشفافة تبقى. | صفر (بلا تغيير) |
| `das Zari` | **حُسم بتضييق المدخل** ← `der Zari-Faden`. لم يُعثر على جنسٍ للمفرد، وتعليل المرحلة 1 («das Brokat») **خطأ: دودن يقول der Brokat**. | صفر (النصّ يقول `Zari-Fäden` أصلاً) |

**لم يبقَ مدخلٌ واحد موسوماً «بانتظار تحقق».** والمعلَّق الوحيد صراحةً هو **جنس مفرد `Zari`**، وهو معلَّقٌ *خارج* هذه الدفعة لأن الكلمة لا ترد مفردةً في أي من صفحاتها الخمس؛ مسجَّل في المدخل لئلا يُستنتج منه جنسٌ لاحقاً بلا سند.

وأضافت المرحلة 5 مدخلاً سادساً وجدته بالفحص الآلي لا بالنظر: **`die Lomi`** — كان الاسم الوحيد في الدفعة بلا مدخل خاص (المدخل القائم يحمل «lomi» في جانبه الإنجليزي وحده). بلا تغيير في النصّ.

---

## ج. ما فُحص ولم يُغيَّر — من بنود دور المقارن

- **الأسماء الألمانية المستقرة:** `Saudi-Arabien` (مرتان، ولا «the Kingdom» حرفية)، ولا `Riyadh`/`Jeddah`/`Mecca` في الدفعة أصلاً فلا موضع لـ`Riad`/`Dschidda`/`Mekka`.
- **الخليج:** `der Golfregion` مرة واحدة (`qaisariyah`)، **وصفر `Persischer Golf` وصفر `Arabischer Golf`**.
- **`es gibt`:** صفر في الدفعة كلها.
- **أقواس الأفعال (Satzklammer):** أطولها 8 كلمات (`zeichnet sich … aus`)، وكلها مغلقة.
- **حروف الجر المنسوخة** (`interessiert in`, `verantwortlich für`): صفر.
- **Durchkopplung:** `Qaisariyah-Souk` · `Handwerker-Souk` · `Hasawi-Bischt` · `Hasawi-Weberei` · `Zari-Fäden` · `Al-Rifaa-Viertel` · `Al-Koot-Viertel` · `Ibrahim-Palast` · `Qarah-Berg` · `Hasawi-Limette(nfarm)` — صفر مسافة مجرّدة بين اسم علم واسم جنس ألماني.
  والاستثناء الوحيد بالمسافة — `UNESCO Creative Cities` — **ليس خرقاً**: اسمٌ أجنبي مستشهَد به بصيغته، غير مستعمل وصفاً قبل اسم جنسٍ ألماني (ولذلك اختيرت `das Netzwerk der …` لا `das UNESCO-Creative-Cities-Netzwerk`). وللموقع سابقتان معتمدتان (`Heritage Commission` · `Land of Civilisations`).
- **تفاوتٌ قائم خارج الدفعة، مرفوع للحاكم:** `src/content/attractions/ameeriah.md` → `area_de: "Viertel Al-Na'athil – …"` (بدلٌ بمسافة)، بينما هذه الدفعة تكتب `Al-Rifaa-Viertel` و`Al-Koot-Viertel` بالشرطة على المدخل المعتمد 2026-09-10. القرى تبقى بالبدل في اللغتين (`Dorf Al-Qarah` هنا · `Dorf Al-Kilabiyah` في `jawatha-mosque` المعتمدة)، فالنمطان: **الحيّ بالشرطة والقرية بالبدل**. لم أمسّ `ameeriah` — خارج نطاق الدفعة.
