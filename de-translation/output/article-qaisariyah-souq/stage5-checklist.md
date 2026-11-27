# stage5-checklist — article-qaisariyah-souq (de) — المدقق

المدخل `qaisariyah-souq.stage4.md`، المخرج `qaisariyah-souq.stage5.md` (**تصحيح واحد**، السطر 88). الفحص الآلي: `check-stage5.mjs` في مجلد الدفعة (41/41، وبـ`--break` أُمسكت 16/16)، وسكربت التدقيق `s5.mjs` في scratchpad (46/46، وكسره `s5-break.mjs` أُمسك 16/16).

## البنود العشرة
| # | البند | النتيجة | ما فُحص |
|---|---|---|---|
| 1 | Rechtschreibung (Duden de-DE) | **FIXED** | الحرف بعد النقطتين قبل جملة تامة (انظر التصحيحات). ما عداه سليم: `ß` في مواضعها (`heißt`، `heißen`، `außerdem`، `weißem`، `große`، `schließen`، `beschließt`)؛ لا `ss` سويسرية (فحص آلي)؛ الأسماء بحرف كبير؛ `alcaicería` صغيرة بوصفها كلمة إسبانية كما في المصدر وde.wikipedia |
| 2 | Durchkopplung | PASS | `Qaisariyah-Souk`، `Al-Ahsa-Oase`، `Al-Rifaa-Viertel`، `Al-Ahsa-Entwicklungsbehörde`، `Amiriah-Schule`، `Jawatha-Moschee`، `Ibrahim-Palast`، `Sadu-Gewebe`، `Hasawi-Bischte und -Abayas` (شرطة الإكمال)، `Hasawi-Reis`، `ICOMOS-Evaluierung`، `UNESCO-Welterbezentrum`، `„Kabank“-Türen`، `PDF-Datei`؛ لا حشو (`Souk-Markt`، `Basar-Markt`، `Qaisariyah-Markt` = 0)؛ المهرجان والمكتبة باسم جنس متبوع بالعلم فلا وصل |
| 3 | Grammatik والأجناس | PASS | `der Qaisariyah-Souk` / `des Qaisariyah-Souks` · `die Qaisariyah` (والضمائر تتبع الصيغة الواردة في الجملة) · `die Al-Ahsa-Oase` · `das Welterbekomitee` / `des Welterbekomitees` · `ICOMOS` بلا أداة (`von ICOMOS, dem Beratungsgremium, das …`) · `die Saudi Press Agency (SPA)` ثم `die SPA` · `die Zeitung Al-Jazirah` · `der Encyclopaedia of Islam` (Dat. مؤنث) · `die Alcaicería` · `die für die Alhambra zuständige Einrichtung` · `Kabank` و`Quffa` بلا أداة مباشرة في أي موضع (فحص آلي) · أسماء الأشخاص بلا تصريف، والإضافة بـ`von` |
| 4 | Anrede | PASS | `Sie`/`Ihnen`/`Ihrem`/`Ihres` بحرف كبير (21 موضعاً)؛ `du`/`dein` = 0؛ `Sie` في أول الجملة مرة واحدة (`Sie treten …`) وهي خطاب للقارئ لا ضمير غائب (فحص آلي + تصنيف يدوي) |
| 5 | Termbase 100% | PASS | مداخل المستخرَج الواردة كلها بلفظها وجنسها: `Al-Ahsa`، `Hofuf`، `der Qaisariyah-Souk`، `die Al-Ahsa-Oase`، `der Gouverneur von Al-Ahsa`، `die Kommunalverwaltung von Al-Ahsa`، `die Al-Ahsa-Entwicklungsbehörde`، `das Al-Rifaa-Viertel`، `die Saudi Press Agency (SPA)`، `Saudipedia` (مجرّدة على السابقة المنشورة، بحكم القائد)، `das Sadu-Gewebe`، `Hasawi-Bischt`، `Hasawi-Reis`، `die Ostprovinz (asch-Scharqiyya)`، صيغة الهجري. والإضافات الـ40 (stage4) مطبَّقة بصيغة واحدة لكل علم. `## Fazit` و`## Quellen` على المنشور |
| 6 | Interpunktion | PASS | „ 34 = “ 34، ‚ 0 = ‘ 0، `"` مستقيمة في المتن = 0، ولا » « في المتن؛ `–` (U+2013) بمسافتين للاعتراض وبلا مسافة للمدى (`S. 840–841`، `Iran–Kha`)؛ U+2014 = 0؛ لا مسافة قبل علامة ترقيم ولا مسافتان؛ فاصلة قبل كل جملة تابعة؛ لا فاصلة تسلسلية إنجليزية؛ الفاصلة العليا U+0027 في `Year's` و`Bay'ah` (U+2019 = 0)؛ `80 %` بمسافة عادية (U+00A0 = 0) |
| 7 | Zahlen / Datum / Hidschra | PASS | أرقام لاتينية فقط؛ `29. Juni 2018`، `19. Oktober 2001`، `16. Mai 2017`، `Im Februar 2026`، `20. Juli 1843` وسائر تواريخ المصادر بالصيغة الألمانية؛ لا اسم شهر أو يوم إنجليزي؛ الهجري: صيغتان كاملتان `1238 nach der Hidschra (1822 n. Chr.)` ثم `n. H.` ×3 = 5 `AH` في الإنجليزي؛ `n. Chr.` ×5؛ المدى في النثر بـ`zwischen 1917 und 1923` / `von … bis`؛ أرقام المتن = الإنجليزي (بعد إسقاط `19.` مقابل «nineteenth» مرتين) |
| 8 | Denglisch | PASS | القائمة المحظورة = 0 (`Spot`، `Location`، `Must-see`، `Hotspot`، `Guide`، `Highlight`)؛ `Festival`، `Souk`، `Basar` ألفاظ Duden؛ `Internet Archive` و`Saudi Press Agency` أعلام |
| 9 | Glossierung | PASS | مرة واحدة لكل لفظ في المتن: `(traditionelle Umhänge)`، `(„Hasawi“ heißt „aus Al-Ahsa“)`، `(Webstoff)`، `(dem Ibrahim-Palast)`، `(Lomi)`، `(asch-Scharqiyya)`، `(كبنك)`؛ لا قوس گلوس في أي عنوان؛ `Enzyklopädie` ×3 كلها عن The Encyclopaedia of Islam لا عن Saudipedia |
| 10 | Struktur | PASS | انظر الفحوص الآلية |

## الفحوص الآلية (مقارنةً بـ`src/content/blog/qaisariyah-souq-en.md`)
| الفحص | النتيجة |
|---|---|
| الروابط الخارجية | 34 = 34، مطابقة حرفاً وترتيباً (PASS) |
| الروابط الداخلية | 13، كلها `/de/…/` بشرطة ختامية (PASS) |
| السلاسل العربية | `كبنك` والمقاطع العربية الأربعة داخل عناوين الروابط مطابقة حرفاً وبالترتيب (PASS) |
| أسطر المصادر | 18، والسطر 17 بلا رابط كالمصدر؛ عناوين الكتب والناشرون بلفظها (PASS) |
| بنية Markdown | 13 `##` · 45 كتلة بأنواعها · 9 بنود نقطية · 4 مواضع تغميق = المصدر؛ لا سطر متن مطابق للإنجليزي (PASS) |
| الترويسة | تُحلَّل YAML سليمة (`yaml.parse` من حزمة المستودع)؛ `key`/`slug`/`pubDate`/`heroImage` مطابقة للإنجليزي؛ `lang: de`؛ `topic: "Sehenswürdigkeiten Al-Ahsas"`؛ 4 FAQ، 5 وسوم؛ لا `"` مستقيمة داخل قيمة نصية (PASS) |
| محارف ممنوعة | CR = 0 · U+00A0 = 0 · U+2014 = 0 · U+2009 = 0 · U+202F = 0 · U+2019 = 0 · U+200B–200F = 0 (PASS) |
| محظورات | `osman…`/`ottoman` = 0 · `Al Jazeera` = 0 · `schwarz`/`Zitrone`/`Souq`/`Golfregion` = 0 (سطرا `key` و`slug` مستثنيان) (PASS) |
| قيود الموجز | جملة مواد البناء فقرة مستقلة بلا رابط سببي · المُدرَج الواحة لا السوق · رواق تشيزمان `Kolonnade` + `„neuen Basar“` · غرناطة بلا لفظ قرابة · تنبيه الجمعة بلا ساعات · رسوم الرحالة كما هي · لا سبب للحريق ولا أرقام خسائر (PASS) |
| أحكام القائد | `Saudi Press Agency (SPA)` ثم `die SPA` · `Die Zeitung Al-Jazirah` بلا `saudische`/`Tages-` · `Saudipedia` مجرّدة · لا تعريف اختصار داخل اقتباس الوكالة · صيغة الحمراء · `## Fazit` (PASS) |
| قرارات المرحلة 4 | `Fès` وحدها ×4 · `der Encyclopaedia of Islam` ×3 والعنوان الحرفي في المصدر 17 وحده · لا `Nach Palgrave` · لا أداة قبل `Kabank`/`Quffa` (PASS) |
| فروق المراحل | stage3 → stage4: 12 سطراً · stage4 → stage5: سطر واحد (88) (PASS) |

## عدّ C22
محاكاة تقطيع `tools/check-consistency.mjs` (كتلة عند كل وسم: رابط، تغميق، سطر؛ كتل من كلمتين فأكثر؛ استثناء `Al-Ahsa`) على **جزء المقال وحده**، لا على `dist` (الصفحة لم تُبنَ بعد):

- كتل المقال: **144**
- كتل لاتينية مطابقة حرفاً لكتلة في الإنجليزية: **14** = `Saudi Press Agency` ×8 · `Internet Archive` ×3 · `Qasr Ibrahim` ×1 · `Bayt Al-Bay'ah` ×1 · `Patronato de la Alhambra y Generalife` ×1. (`Saudipedia` ×2 كلمة واحدة فلا تُعدّ كتلة؛ لذلك 14 لا 16.)
- النسبة على كتل المقال وحدها: **9.7%**. العتبة 20%. **PASS**، والهامش أضيق من الدفعة السابقة (4.7%) لأن ثمانية أسطر مصادر تحمل اسم الوكالة نصاً للرابط.
- **تحفّظ:** العدّ محاكاة على Markdown؛ الرقم النهائي يُقرأ من `npm run build` (C22 على `dist`) بعد النشر. إن ضاق الهامش على `dist` فالخيار الأقل كلفة نصّ وظيفي لروابط `Internet Archive` الثلاثة.

## التصحيحات
| السطر | قبل | بعد | القاعدة |
|---|---|---|---|
| 88 | `Das Wort ging auch ins Spanische über: alcaicería ist daraus entlehnt.` | `Das Wort ging auch ins Spanische über: Daraus ist alcaicería entlehnt.` | Duden: بعد النقطتين حرف كبير إذا تلتها جملة تامة. الكلمة الإسبانية تبقى صغيرة كما في المصدر، فأُخّرت عن أول الجملة بدل تكبيرها. لا واقعة تغيّرت |

ما عداه: `qaisariyah-souq.stage5.md` = `qaisariyah-souq.stage4.md`.

## سكربت الفحص
`check-stage5.mjs` نسخة من `check-stage3.mjs` بفرقين: اسم الملف المفحوص (`qaisariyah-souq.stage5.md`)، ومرساة طفرة `--break` لفحص «13 عنواناً» (`## Fazit` بدل `## Kurz gefasst`، بعد حكم القائد في العنوان). **لم يُعدَّل أي فحص**: لا فحص في السكربت كان يقيس لفظاً غيّرته الأحكام.
