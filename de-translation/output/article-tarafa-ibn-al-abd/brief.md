# دفعة article-tarafa-ibn-al-abd (de) — مقال طرفة بن العبد

## المقال
| key | المصدر الإنجليزي | العربي (الفيصل عند الالتباس) | slug |
|---|---|---|---|
| `tarafa-ibn-al-abd` | `src/content/blog/tarafa-ibn-al-abd-en.md` | `src/content/blog/tarafa-ibn-al-abd-ar.md` | `tarafa-ibn-al-abd-and-al-ahsa` |

المخرج النهائي `src/content/blog/tarafa-ibn-al-abd-de.md` (**يكتبه الناشر لا أنت**) على سابقة
`src/content/blog/hasawi-lomi-history-de.md`: اقرأها نموذجاً للسجلّ وللبنية ولقسم المصادر.
مفاتيح الترويسة بترتيب السابقة: `title` `description` `lang: de` `key` `slug` `topic` `pubDate`
`heroImage` `tags` `faq`. تُنسخ حرفاً من الإنجليزي: `key` `slug` `pubDate` `heroImage` (الناشر يرفض
أي فرق، ولا `updatedDate` في المصدر فلا يُضاف). `topic` = `"Kultur und Handwerk"` (زوج ذاكرة ملزم
لـHeritage & Crafts، منشور في `crafts-de.md`). تُترجم: `title` `description` `tags` `faq.q` `faq.a`
والمتن. عنوان الخاتمة `## Fazit` وعنوان المصادر `## Quellen` وسطر تمهيدها يبدأ
`Aufgeführt in der Reihenfolge ihres Vorkommens.` (كلها منشورة في السابقة، وهي في `tm-extract.json`).

## طبيعة المقال (تغيّر السجلّ عن صفحات السياحة)
مقال ثقافي تاريخي يقوم على النقل عن كتب التراث العربي. السجلّ: نثر ألماني رصين على طريقة
Feuilleton ومقالات Kulturreise الجادّة، لا لغة تسويق ولا Nominalstil إداري. **كل خبر منسوب إلى
راويه** («Ibn Qutaiba berichtet»، «bei Yaqut»): لا تُحوَّل الرواية إلى تقرير مجرد (احذر أن يمحو
الـIndikativ الألماني النسبة: الخبر المنقول يبقى منقولاً بفعل النسبة أو بالـKonjunktiv I حيث يلزم،
**بلا إدخال شكّ لا يحمله المصدر**)، ولا يُرجَّح بين الروايات، ولا يُسدّ سكوت المصادر.

**لا حقيقة تُضاف ولا تُحذف**:
- **لا سنة ميلادية مقابل الهجرية — استثناء معلَّل من قاعدة الخط.** القاعدة العامة
  (`style_rules.hidschra`) هي `962 n. H. (1555 n. Chr.)`، لكن المصدرين العربي والإنجليزي هنا لا
  يذكران الميلادي لأي وفاة، فحساب المقابل إضافةُ واقعة يحذفها سياج المرحلة 4. يُكتب الهجري وحده:
  أول ذكر في المتن `gest. 232 nach der Hidschra (n. H.)` وما بعده `gest. 276 n. H.`، وفي قائمة
  المصادر `gest. 232 n. H.`. (القارئ الأعمى سيطلب السنة الميلادية: يُرفض طلبه بهذا التعليل.)
- لا تعريف بشخص أو كتاب أو موضع ليس في المصدر (لا «der Grammatiker»، لا «der berühmte»، لا
  تواريخ ملوك، لا موقع الحيرة). `der Geograph` قبل Yaqut al-Hamawi **لا يُكتب هنا** وإن كان في
  مدخل المعجم: المصدر لا يصفه بها في هذا المقال. و`der Historiker` قبل Jawad Ali يُكتب لأن المصدر يقولها.
- لا «نصيحة تصوير» ولا آداب زيارة ولا مواعيد (سياج الوقائع على المرحلة 3 خصوصاً).
- الگلوس المسموح به هو ما في المصدر نفسه (مثل «that is, one of the poets from before Islam»،
  «that is, its principal town»، «the sahifa being the sealed letter …») وگلوس المعجم الملزم.
- **جرد التحفّظات مهمة صريحة لكل مرحلة** (حكم de-blog-8): «we found no text»، «as far as we found»،
  «is said to have been»، «It is also said»، «in one statement»، «We do not choose between them»،
  «with no claim of a link»: كل تحفّظ واقعة تُحرس كالرقم، لا يُنقص ولا يُزاد.

## اصطلاحات محمولة من النسختين العربية والإنجليزية (ملزمة)
- **al-Bahrayn / البحرين**: الإقليم القديم بين البصرة وعُمان، **لا الدولة الحديثة**.
  السابقة المسجَّلة: مدخل المعجم `Bahrain` (artikellos) بگلوسه `[den historischen Ostküstenlanden]`
  داخل اقتباس ياقوت (منشور في `shaban.md` → `body_de`)، والمدخل الثاني للحقول التي لا تقبل القوس
  المربّع: `(Bahrain bezeichnet hier die historischen Ostküstenlande.)`. لا سابقة في المدونة الألمانية.
  **المرشّح لهذا المقال `al-Bahrain`** (يحاكي تمييز المصدر `al-Bahrayn` عن الدولة، وبالـ`-ai-`
  الألمانية كما في `Abd al-Qais`)؛ المرحلة 1 تختار بين `al-Bahrain` و`Bahrain`، والمرحلة 4 تتحقق
  (de.wikipedia) وتسجّل مدخلاً جديداً بمفتاح `en: "al-Bahrayn (…)"` يحيل إلى المدخل القائم، ثم
  **صيغة واحدة في المقال كله**. الگلوس عند أول ذكر في المتن، وفي `description` وفي كل جواب FAQ يرد
  فيه الاسم أولاً ما لم يشرحه الجواب نفسه (المصدر يشرحه في جوابين بـ«the ancient region between
  Basra and Oman» فيكفي الشرح؛ وحيث لا شرح في المصدر فگلوس المعجم `die historischen Ostküstenlande`).
  ممنوع: `Königreich Bahrain`، `Inselstaat`، وأي كلمة عن الدولة الحديثة.
- **Hajar / هجر** = `Hajar` (صيغة الموقع؛ سابقة المعجم `die „Festung von Hajar“` المنشورة في
  `mushaqar.md`، وملاحظتها: Hajar اسم الإقليم القديم، **ولا تُكتب مساواته بالهفوف**). artikellos.
- **governor (عامل)**: والٍ عيّنه الملك على الإقليم. لفظ ألماني **واحد** ثابت في المقال كله:
  المرشّح `der Statthalter` (سابقة المعجم `der osmanische Statthalter` للفظ نفسه بمرجع آخر).
  لا `Gouverneur` (يلتبس بـ`Gouvernorat Al-Ahsa` الحديث). يُسجَّل في إضافات المعجم.
- **chief town (قاعدة)** و**principal town (قصبة)**: لفظان ألمانيان **مختلفان ثابتان**، لأن ياقوت
  يفرّق بينهما والمقال يبني على الفرق. المرشّحان: `der Hauptort` للقاعدة و`die wichtigste Stadt`
  للقصبة (البديل: `die Hauptstadt` / `der Hauptort`، وتحذيره أن `Hauptstadt` توحي بعاصمة دولة).
  حيث يورد المصدر اللفظ العربي منقحراً (“the qasaba of Hajar”, that is, its principal town) تُحفظ
  البنية نفسها: `die „Qasaba von Hajar“, das heißt …`. المرحلة 4 تبتّ وتسجّل اللفظين.
- **الأبيات العربية** (كتل `>` والشطر الافتتاحي بين «») **تبقى بنصها العربي المشكول حرفاً بحرف**،
  ثم ترجمة معناها بالألمانية مائلةً `*…*` كما في المصدر (ترجمة معنى نثرية، لا وزن ولا قافية
  مصطنعة ولا لغة متقادمة). عدد الأسطر والفراغات داخل كتلة الاقتباس كالمصدر.
- **سطر بيان الصورة** (السطر المائل بعد المقدمة: تصوّر تخيّلي مولَّد بالذكاء الاصطناعي، لا صورة
  للشاعر) يُحمل كاملاً بلا تليين: `KI-generiert` و`kein Porträt des Dichters`.
- **Syria** في جملة فرار المتلمس: العربية «الشام». السابقة المنشورة في المدونة الألمانية لـ«بلاد
  الشام» هي `die Levante` (مدخل معجم `the Levant — بلاد الشام`، ومنشور في
  `hasawi-lomi-history-de.md`: «über Persien und die Levante»). تُستعمل `die Levante`
  (`floh in die Levante`) ويُسجَّل القرار في notes ليُرفع للمالك (البديل `nach Syrien` يوافق
  الإنجليزي لا العربي؛ وهو القرار نفسه الذي اتخذته الدفعة الصينية).
- **Jahili**: المدخل الملزم `vorislamisch` (لا `heidnisch` ولا `vorchristlich`). المصدر يورد اللفظ
  العربي ثم يشرحه، فتُحفظ البنية: اللفظ المنقحر (مرشّح `Dschahiliyya-Dichter`، يتحقق منه 4) ثم
  شرح المصدر. الوسم «Pre-Islamic poetry» في `tags` = `Vorislamische Dichtung`.
- **Saudipedia** = `Saudipedia` (artikellos، بلا گلوس؛ منشور). **Ministry of Culture** =
  `das Kulturministerium`. **Al-Ahsa Governorate** = `das Gouvernorat Al-Ahsa` (بـA كبيرة).
  **Yaqut al-Hamawi** أول ذكر ثم `Yaqut` حيث يختصر المصدر. **Abd al-Qays** = `Abd al-Qais`
  (مدخل `die Banu Abd al-Qais`؛ ولمن يحتاج اسم الجنس `der Stamm der Abd al-Qais`، لا `der Stamm der Banu …`).
- المعالم (عناوينها المنشورة): `der König-Abdullah-Umweltpark` · `Jawatha` · `al-Mushaqar` ·
  `das Al-Ahsa-Museum` · `Al-Uqair` · القطيف `Qatif` · `Oman` (artikellos) · `Indien` ⇒ «Sea of India»
  يحتاج مدخلاً (مرشّح `das Indische Meer` لا `der Indische Ozean`: لفظ ياقوت «بحر الهند» لا يُحدَّث).

## الأعلام الجديدة — تُسدّ في المعجم قبل الاستعمال (المرحلة 1 تقترح، المرحلة 4 تتحقق بالويب)
جُرد المقال الإنجليزي على `de-translation/glossary/termbase.json` (575 مدخلاً). **49 علماً بلا مدخل**:
- **أشخاص (22)**: Tarafa ibn al-Abd · Amr (اسمه الأول) · Warda · Khawla · Amr ibn Hind ·
  al-Mutalammis · Imru' al-Qays · Labid · al-Tirimmah · Adi ibn Zayd al-Ibadi · Abu Ja'far ·
  Abu Ubayda · al-Azhari · Rabi'a ibn al-Harith al-Abdi · al-Rabi' ibn Hawthara ·
  al-Mu'alla ibn Hanash al-Abdi · Ibn Yamin · Ibn Sallam al-Jumahi · Ibn Qutaybah ·
  Ibn al-Anbari · al-Baghdadi · Jawad Ali.
- **سلسلة النسب (1)**: ibn Sufyan ibn Sa'd ibn Malik ibn Dubay'a ibn Qays ibn Tha'laba (مدخل واحد).
- **قبائل ونِسَب (4)**: Bakr ibn Wa'il · Banu Qays ibn Tha'laba · Tamim · «the Malikite woman» (المالكية).
- **مواضع (15)**: al-Hira (ونهرها) · Basra · Sea of India · al-Khatt · al-Ara · Baynuna · al-Zara ·
  al-Sabur · Darin · al-Ghaba · al-Safa · Awal · Adawla (والنسبة Adawli) · Dad · Burqat Thahmad.
- **كتب ومنصات (7)**: Tabaqat Fuhul al-Shu'ara · Al-Shi'r wa al-Shu'ara ·
  Sharh al-Qasa'id al-Sab' al-Tiwal al-Jahiliyyat · Khizanat al-Adab · Mu'jam al-Buldan ·
  Al-Mufassal fi Tarikh al-Arab qabl al-Islam · Al-Maktaba Al-Shamela.

ومعها **5 صيغ مجرّدة** لها مدخل مركّب فقط وتحتاج حكماً مسجَّلاً: Hajar · al-Bahrayn · al-Mushaqar ·
Jawatha (الاسمان المجرّدان في نص ياقوت) · Syria/الشام. و**15 مصطلحاً** بلا مدخل: Mu'allaqa/Mu'allaqat ·
Jahili · sahifa / sahifat al-Mutalammis («the letter of al-Mutalammis») · qasaba · hisy · ya'tam ·
fiyal · Tarafa ibn al-Abd Festival (على نمط `das Hasawi-Bischt-Festival`) · governor · chief town ·
principal town · master poets / the fourth class · transmitters · chroniclers · «the 20-year-old».

**القاعدة:** المرحلة 1 تقترح، والمرحلة 4 تتحقق بالويب بترتيب المعجم (unesco.de / unesco.at ثم
de.wikipedia) وتضيف كل مدخل **بمصدره وجنسه النحوي** قبل المتابعة. الأولوية للصيغ المستقرة في
الاستشراق الألماني (DMG مبسَّطة) حيث يستعملها de.wikipedia (مثل Tarafa، Muʿallaqāt، al-Hīra،
Imruʾ al-Qais، Ibn Qutaiba، Labīd، Dschāhilīya)؛ وما لا سابقة له يبقى على نقحرة النسخة الإنجليزية
(`naming_policy.default`). **نظام نقحرة واحد لكل أعلام التراث في المقال** يُقرَّر في المرحلة 1
ويُثبَّت في 4 (المعجم يكتب `Abd al-Qais` و`Al-Buchari` و`Hidschra` بلا علامات DMG: هذا المرجَّح؛
العلامات `ʿ ā ī` لا تُدخل إلا بقرار مسجَّل يسري على الجميع). `al-` صغيرة وسط الاسم وكبيرة أول الجملة.
أسماء الأشخاص unflektiert، والجنس للأشخاص `— (Personenname, artikellos)`.

**صيغة الإضافات** (`termbase-additions.stage1.json` ثم المنقّحة المعتمدة `termbase-additions.stage4.json`):
`{"additions":[{"en","de","artikel","source","note","ar","stage","batch"}]}`.
- الناشر (`tools/translation/publish-blog-batch.py`) **يشترط آلياً** `en` و`de` فقط: يتخطّى ما نقصه
  أحدهما، ويتخطّى ما كان `en` فيه مطابقاً حرفاً لمدخل قائم (فلا «يصحّح» مدخلاً قائماً: مفتاح `en`
  الجديد يجب أن يختلف)، ويحذف حقل `replaces`، ويملأ `added` من `judge.date` إن غاب.
- **الخط يشترط ما لا يفحصه الناشر**: `artikel` (اسم الحقل هكذا، لا `gender`) بقيمة `der` / `die` /
  `das` / `die (Pl.)` أو `— (…)` معلَّلة للأسماء بلا أداة (`— (Personenname, artikellos)`،
  `— (Ortsname, artikellos: „in Basra“)`، `— (Werktitel, unübersetzt)`، `— (als Wort zitiert)`)،
  و`source` (رابط أو موضع في المستودع). مدخل بلا `artikel` أو بلا `source` مخالفة يردّها الحاكم.
- `note` ينتهي بوسم `[verified]` (موثّق بمصدر ألماني مذكور) أو `[house-derived]` (مشتق بقاعدة المعجم).
- `batch`: `article-tarafa-ibn-al-abd`، و`stage`: `1` أو `4`.

## أسماء الكتب وقائمة المصادر (القسم 8 من قواعد المقالات — ملزم)
- القائمة **25 سطراً مرقّماً بالعدد نفسه والروابط نفسها والترتيب نفسه**؛ ما بين `(...)` يُنسخ حرفاً
  بحرف (ومنه رابط سعوديبيديا بحروفه العربية `https://saudipedia.com/ar/مهرجان-طرفة-بن-العبد`)،
  وكذلك كل رابط خارجي داخل المتن. العدّ في المصدر: **56 رابطاً خارجياً و6 داخلية**، ويجب أن يطابق
  المخرج رابطاً برابط (السطر 25 يحمل ثلاثة روابط).
- **اسم الكتاب بلفظه**: العنوان المنقحر اللاتيني كما في الإنجليزية يبقى بلفظه في قائمة المصادر وفي
  المتن (سابقة مدخلَي المعجم `Agricultural Innovation in the Early Islamic World` و`The Citrus Route Revealed`: عناوين الكتب لا تُترجم ولا تُگلَّس ولا تُمال؛ وسابقة
  `das Wörterbuch Al-Mu'jam Al-Wasit` تجيز اسم جنس ألمانياً قبل العنوان **حيث يحمله المصدر فقط**).
- **الوصف يُترجم كاملاً** واسم المؤلف بصيغته الألمانية المعتمدة: «d. 232 AH» → `gest. 232 n. H.`؛
  «vol. 1, p. 137» → `Bd. 1, S. 137`؛ «pp. 132, 135 and 138» → `S. 132, 135 und 138`؛
  «entry "al-Bahrayn"» → `Eintrag „…“`؛ «Links checked on 2026-10-10» → `am 10. Oktober 2026`.
  المدى والتعداد في النثر بـ`bis`/`und` لا بالشرطة (حكم de-blog-6).
- **لا سطر يطابق نظيره الإنجليزي حرفاً. فحص C22** (`tools/check-consistency.mjs`، العتبة
  `THRESHOLD = 20`): يقسّم الصفحة المصيَّرة عند كل وسم HTML إلى كتل، ويعدّ كل كتلة من كلمتين
  لاتينيتين فأكثر **مطابقة حرفاً** لكتلة في النظيرة الإنجليزية نصاً غير مترجم، ويقسم على كل كتل
  الصفحة؛ فوق 20% يفشل البناء. المستثنى أسماء المعالم من ترويسات `attractions/dining/stay` فقط،
  **لا أسماء المؤلفين ولا الكتب ولا المنصات**.
  **وما يعنيه لهذا المقال (مقيس):** نصّ كل رابط كتلة مستقلة. في المصدر 40 نصّ رابط من كلمتين
  فأكثر هي أسماء صرفة: `Al-Maktaba Al-Shamela` ×23 · `Ibn Qutaybah` ×9 · `Ibn al-Anbari` ×4 ·
  `Ibn Sallam al-Jumahi` · `Yaqut al-Hamawi` · `Jawad Ali` · `Mu'jam al-Buldan`. والصفحة تُقدَّر
  بنحو 230 كتلة (قياساً على `dist/de/blog/hasawi-lime-history/`: 173 كتلة، 10%). لو بقيت الأربعون
  حرفاً بحرف مع `VISIT AL-AHSA` ×2 لبلغت النسبة **نحو 18–19%، على حافة العتبة**. لذلك:
  1. **نصّ رابط المنصة في القائمة لا يطابق الإنجليزي حرفاً**: اسم ألماني ثابت يُقرَّر في المرحلة 1
     ويُتحقق منه في 4 (مرشّح: الصيغة الألمانية للاسم إن وثّقها de.wikipedia، مثل
     `al-Maktaba asch-Schamila`؛ وإلا صيغة بأداتها مثل `in der Al-Maktaba Al-Shamela`). بهذا وحده
     تنزل النسبة إلى نحو 8%.
  2. `p. 132` → `S. 132` في روابط السطر 25.
  3. المرحلة 5 **تعدّ** الكتل اللاتينية المطابقة للإنجليزي وتكتب العدد في `stage5-checklist.md`؛
     الحد الداخلي للدفعة 25 كتلة (≈ 11%).
- نصّ الرابط `Saudipedia` كلمة واحدة فلا يُعدّ.

## الروابط الداخلية (يحرسها الناشر و`tools/check-links.mjs`)
الستة كلها لها صفحة ألمانية **مبنية** (المعالم الخمسة تحمل `title_de`، ومقال الحِرف له `crafts-de.md`
بالـkey `crafts-tour`؛ `src/i18n/unlisted.ts` فارغ)، فتُقلب كلها إلى `/de/` بشرطة ختامية ولا يبقى
رابط `/en/`:

| الرابط الإنجليزي | الهدف المعتمد | العنوان الألماني المنشور | نصّ الرابط |
|---|---|---|---|
| `/en/attractions/king-abdullah-park/` | `/de/attractions/king-abdullah-park/` | `König-Abdullah-Umweltpark` | على لفظ العنوان |
| `/en/attractions/jawatha-mosque/` | `/de/attractions/jawatha-mosque/` | `Jawatha-Moschee` | **`Jawatha` مجرّداً** |
| `/en/attractions/mushaqar/` | `/de/attractions/mushaqar/` | `Al-Shaibani-/Al-Mushaqar-Park` | **`al-Mushaqar` مجرّداً** |
| `/en/attractions/ahsa-museum/` | `/de/attractions/ahsa-museum/` | `Al-Ahsa-Museum` | على لفظ العنوان |
| `/en/attractions/al-uqair/` | `/de/attractions/al-uqair/` | `Al-Uqair` | على لفظ العنوان |
| `/en/blog/al-ahsa-traditional-crafts/` | `/de/blog/al-ahsa-traditional-crafts/` | `Die Handwerke Al-Ahsas: Bischt, Töpferei und wo sie lebendig sind` | `die lebendigen Handwerke Al-Ahsas` (زوج ذاكرة: «im Rundgang durch die lebendigen Handwerke») |

- حكم de-blog-6 «نصّ الرابط الداخلي يطابق عنوان هدفه المنشور» سارٍ، **باستثناء معلَّل في سطرَي
  Jawatha و al-Mushaqar**: المصدر يقول «We link name to name» ولا يدّعي أن الشاعر وقف عند المسجد أو
  المنتزه، فنصّ الرابط هو الاسم كما ورد عند ياقوت لا اسم المعلم الحديث (`Jawatha-Moschee` أو
  `…-Park` في نصّ الرابط يُدخل دعوى ينفيها السطر نفسه). يُسجَّل في notes ليبتّه الحاكم.
- **الناشر يرفض أي رابط داخلي خارج بادئة لغة الملف**: في `check_post` كل `](/…)` يجب أن ينتهي بـ`/`
  **وأن يبدأ بـ`/de/`** (`assert href.startswith(f'/{lang}/')`). فملف ألماني فيه `/en/…` لا يُنشر
  بهذا السكربت، ولا مخرج فيه لاستثناء. قاعدة CLAUDE.md «يبقى على الإنجليزية إن لم توجد الصفحة»
  لا تنطبق هنا لأن الأهداف الستة مبنية؛ ولو احتاجها مقال قادم لزم تعديل الناشر أولاً.
- `/de/blog/` (فهرس المدونة الألمانية) موجود اليوم (`src/pages/de/blog/index.astro`، والمقالات
  الثمانية منشورة)، والمقال لا يحيل إليه فلا يُضاف رابط.
- جواب FAQ الأخير و`description` حقلان منفصلان عن الصفحة (FAQPage): لا روابط فيهما، ويحملان مرجعهما
  بأنفسهما (اسم المنتزه كاملاً `König-Abdullah-Umweltpark`، واسم الواحة لا «die Oase» عارية).

## قواعد لا تُخالَف
- المعجم ملزم 100% **بأجناسه** (`termbase-extract.json`: 40 مدخلاً مع `_meta` كاملاً:
  `naming_policy` و`style_rules` و`batch_rulings`)، وأزواج `tm-extract.json` (30 زوجاً؛ «Sources» فيها مرتان: `Quellen` عنوان قسم المقال هو المعتمد، و`Quellenangaben` تسمية واجهة صفحة أخرى للتمييز) تُعاد حرفياً
  حيث طابق المصدر. المدخل `Ottoman (…)` في المستخرَج **سابقة للفظ `Statthalter` وحده**.
- **Sie** حصراً ولا `du`؛ و`Sie` لا تبدأ جملة ضميراً للغائب (حكم de-blog-8). إملاء **Duden de-DE بـß**.
- **Durchkopplung**: اسم علم + اسم جنس بشرطة واصلة (`König-Abdullah-Umweltpark`،
  `Tarafa-ibn-al-Abd-Festival`). **لا تكرار لاسم الجنس** (`Souk` لا `Souk-Markt`؛ ولا
  `der Stamm der Banu …`). و`Souq` بالقاف يُفشل البناء (C18).
- **الخليج** = `die Golfregion` / `der Golf` فقط (المقال لا يسمّيه: «the coast» = `die Küste`، ولا يُدخل اسم الخليج).
- **أرقام لاتينية 0-9** (C4)؛ العدد المستشهَد به يبقى رقماً (`mit 20 Jahren`، `der 20-Jährige`،
  `mit 26 Jahren`)؛ التواريخ `vom 16. bis 24. November 2023`.
- **لا Denglisch**: `Spot` `Location` `Must-see` `Hotspot` `Guide` `Feeling` `Vibe`؛ `Highlight` مرة على الأكثر.
- **الگلوس مرة لكل مصطلح** عند أول ورود في المتن **لا في العنوان**، وصيغة العنوان تتصدّر أول ورود
  (`gloss_regel`)؛ وجواب FAQ يجوز أن يعيد الگلوس لأنه يُعرض منفصلاً (حكم de-blog-7).
- علامات التنصيص الألمانية `„…“` والداخلية `‚…‘`، لا `"…"` المستقيمة في النثر (قيم YAML تبقى بين
  `"…"` وداخلها `„…“`). «…» حول الشطر العربي الافتتاحي تبقى كما هي.
- شرطة الاعتراض `–` (U+2013) بمسافتين؛ **لا `—` (U+2014)** (C17 على العنوان والوصف). **لا U+00A0
  ولا U+2009**: المسافة U+0020 وحدها (الناشر يرفض U+00A0 في الملف كله).
- **المحظورات**: لا ذكر للدولة العثمانية بأي لفظ (`osmanisch`، `Osmanen`، `Osmanisches Reich`) ولا
  شأن سياسي؛ لا يُعاد إدخالهما عبر شرح أو گلوس أو تعريف بموضع.
- **بنية Markdown مطابقة للمصدر**: عدد الفقرات والعناوين (8 عناوين `##`) والقوائم والتغميق وكتل
  الاقتباس (3، في أطولها ثلاثة أبيات) والروابط، وأربعة أسئلة FAQ وخمسة وسوم.
- عنوان القسم لا يحمل ضميراً عارياً فاعلاً؛ وأول جملة في القسم تحمل مرجع إشارتها؛ والتعداد بعد
  النقطتين في حالة الفعل الذي يحكمه (أحكام de-blog-5 و7).
- لا شيء يُكتب في `src/` ولا التزام ولا دفع: كل المخرجات في مجلد هذه الدفعة.

## المراحل والملفات (كلها في هذا المجلد)
`de-translation/prompts/01…07` بوكيل مستقل لكل مرحلة وبالتجميع `1 → 2+3 → 4+5 → 6 → 7`، وكل مرحلة
تقرأ المصدرين الإنجليزي والعربي معاً:
- `tarafa-ibn-al-abd.stage1.md` … `tarafa-ibn-al-abd.stage5.md` (كل ملف مقال كامل بترويسته)،
  و`notes.stage1.md` … `notes.stage5.md` (ومنها جرد التحفّظات).
- `termbase-additions.stage1.json` و`termbase-additions.stage4.json` (الصيغة أعلاه).
- `stage4-changes.md` (ما حذفه سياج الوقائع وما تحقّق بالويب بمصدره) و`stage5-checklist.md`
  (المعجم بنداً بنداً، الأجناس، عدّ الروابط 56 + 6، عدّ كتل C22، U+00A0، U+2014، `Souq`).
- `blind-reader.md` (المرحلة 6: وكيل جديد يُعطى **النص الألماني وحده**، لا يرى المصدر ولا يُخبَر أنها ترجمة).
- `judge.json` (المرحلة 7، العتبة 90، حتى 3 دورات تصحيح؛ ملفات الدورات `tarafa-ibn-al-abd.loopN.md`
  و`loopN-changes.md` و`judge.roundN.json`). الحقول:
  `round`، `date` (YYYY-MM-DD، يأخذ منه الناشر تاريخ أزواج الذاكرة ومداخل المعجم)، `batch_score`،
  `decision` (`APPROVE` أو `RETURN`)، `return_to_stage`، `pages: [{key, score, breakdown:
  {accuracy /30, nativeness /30, termbase_style /20, cultural_fit /10, structure /10}}]`،
  `blind_reader_rulings` (كل ملاحظة: applied أو rejected بتعليل)، `must_fix`، `optional`
  (`[{where, problem, fix}]`)، `notes`. **الناشر لا ينشر إلا بـ`decision == "APPROVE"` و`batch_score >= 90`.**
- عند الاعتماد:
  - `tarafa-ibn-al-abd.final.md` (اسم الملف من `key`).
  - `tm-additions.json`: `{"pairs":[{"en","de","page":"tarafa-ibn-al-abd","field","date"}],"remove":[]}`
    (الزوج بلا `en` أو `de` أو المكرَّر يُتخطّى؛ `page` الافتراضي `blog` و`field` الافتراضي `body`).
  - `scores-row.txt`: سطر CSV واحد على رأس `page,date,loop,score,decision`، مثل
    `"blog (de): tarafa-ibn-al-abd (article-tarafa-ibn-al-abd)",YYYY-MM-DD,<الدورات>,<الدرجة>,"APPROVE (…)"`.
  - ثم النشر من الجلسة الرئيسية: `python tools/translation/publish-blog-batch.py de article-tarafa-ibn-al-abd --dry` ثم بلا `--dry`.
