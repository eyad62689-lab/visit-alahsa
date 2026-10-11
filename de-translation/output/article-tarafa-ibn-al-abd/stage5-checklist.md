# stage5-checklist — article-tarafa-ibn-al-abd (de) — المدقق

المدخل `tarafa-ibn-al-abd.stage4.md`، المخرج `tarafa-ibn-al-abd.stage5.md` (**مطابق له حرفاً: لا تصحيح لزم**). الفحص الآلي بسكربت `s5.py` (scratchpad): 49 بنداً PASS، 0 FAIL.

## البنود العشرة
| # | البند | النتيجة | ما فُحص |
|---|---|---|---|
| 1 | Rechtschreibung (Duden de-DE) | PASS | `ß` في مواضعها (`heißt`, `weiß`, `gemäß` لا يرد)؛ لا `ss` سويسرية (فحص آلي)؛ الأسماء بحرف كبير؛ `seit Langem`، `sodass`، `noch einmal`، `der 20-Jährige`، `als Erster`، `der Beste` وفق Duden |
| 2 | Durchkopplung | PASS | `Tarafa-ibn-al-Abd-Festival`، `König-Abdullah-Umweltpark`، `Al-Ahsa-Museum`، `Adawli-Schiffe`، `Fiyal-Spiel`، `KI-generierte`؛ لا تكرار جنس (لا `der Stamm der Banu …`: `zum Stamm Bakr ibn Wa'il` بلا Banu) |
| 3 | Grammatik والأجناس | PASS | `das Al-Ahsa-Museum` · `im König-Abdullah-Umweltpark` (der) · `das Kulturministerium` · `im Gouvernorat Al-Ahsa` (das) · `in die Levante` (die) · `den Banu Qais ibn Tha'laba` / `den Abd al-Qais` / `den Tamim` (Pl.) · `al-Bahrain … vor seiner Eroberung` (محايد بلا أداة) و`die Region vor ihrer Eroberung` · `Hajar … dessen wichtigster Stadt` · `die Mu'allaqa` · `die Sahifa` · `der Maktaba Shamela` (Dat. مؤنث). أسماء الأشخاص بلا تصريف، الإضافة بـ`von`؛ `des al-Mutalammis`/`des Ibn Yamin` بالأداة فقط |
| 4 | Anrede | PASS | `Sie`/`Ihnen`/`Ihren` في القسم 6 والخاتمة فقط كالمصدر؛ `du`/`dein` = 0؛ `dich` و`Flieh` داخل حوار مقتبَس بين العامل وطرفة لا خطاب للقارئ؛ لا `Sie` غائبة في أول جملة (فحص آلي) |
| 5 | Termbase 100% | PASS | مداخل المستخرَج الواردة في المقال كلها بلفظها وجنسها: `Al-Ahsa`، `das Gouvernorat Al-Ahsa`، `Al-Uqair`، `das Al-Ahsa-Museum`، `das Kulturministerium`، `der König-Abdullah-Umweltpark`، `Yaqut al-Hamawi` (بلا `der Geograph`، بحكم الموجز)، `die Abd al-Qais`، `Qatif`، `Oman`، `die Levante`، `Saudipedia`، `vorislamisch`، `Jawatha`، `al-Mushaqar`. والإضافات الـ71 (stage4) مطبَّقة بصيغة واحدة لكل علم. أزواج الذاكرة: `## Fazit`، `## Quellen`، `Aufgeführt in der Reihenfolge ihres Vorkommens.`، `topic: "Kultur und Handwerk"`، `die lebendigen Handwerke Al-Ahsas` |
| 6 | Interpunktion | PASS | „ 52 = “ 52، ‚ 1 = ‘ 1، `"` مستقيمة في المتن = 0؛ `–` (U+2013) بمسافتين للاعتراض؛ U+2014 = 0؛ فاصلة قبل كل جملة تابعة (`dass`، الموصول، `sodass`، `ohne dass`، `wenn`)؛ لا فاصلة تسلسلية إنجليزية (`S. 132, 135 und 138`، `Veranstalter, Ort, Daten und Ziele`)؛ «…» حول الشطر العربي كما هي |
| 7 | Zahlen / Datum / Hidschra | PASS | أرقام لاتينية فقط (عربية-هندية = 0)؛ `vom 16. bis 24. November 2023`، `im November 2023`، `am 10. Oktober 2026`؛ `mit 20 Jahren`، `mit 26 Jahren`؛ `Bd. 1, S. 137`؛ الهجري: أول ذكر في المتن `gest. 232 nach der Hidschra (n. H.)` ثم `n. H.` (11 = 11 `AH` في المصدر)؛ **`n. Chr.` = 0** (استثناء الموجز المعلَّل) |
| 8 | Denglisch | PASS | القائمة المحظورة = 0؛ `Highlight` = 0؛ `Website`، `Links`، `Festival` ألفاظ Duden |
| 9 | Glossierung | PASS | `al-Bahrain (die historischen Ostküstenlande)` مرة في `description` ومرة عند أول ورود في المتن (الفقرة 2)؛ `Dschahiliyya` و`Mu'allaqa` و`Sahifa` و`Qasaba` و`hisy` و`ya'tam` مشروحة مرة واحدة بلفظ المصدر عند أول ورود في المتن؛ لا قوس گلوس في أي عنوان (`Mu'allaqa` في العنوان بلا شرح) |
| 10 | Struktur | PASS | انظر الفحوص الآلية |

## الفحوص الآلية (`s5.py`، مقارنةً بـ`src/content/blog/tarafa-ibn-al-abd-en.md`)
| الفحص | النتيجة |
|---|---|
| الروابط الخارجية | 56 = 56، مطابقة حرفاً وترتيباً (PASS) |
| الروابط الداخلية | 6 = 6، كلها `/de/…/` بشرطة ختامية، والأهداف نفسها بالترتيب (PASS) |
| الأبيات العربية | 10 أسطر مطابقة حرفاً بحرف؛ الشطر الافتتاحي بين «» مطابق؛ كل سلاسل الحروف العربية (ومنها رابط سعوديبيديا) مطابقة بالترتيب (PASS) |
| أسطر المصادر | 25، مرقّمة 1–25، وروابط كل سطر مطابقة لنظيره (السطر 25 بثلاثة روابط) (PASS) |
| بنية Markdown | 8 `##` · 48 كتلة · 3 كتل اقتباس (22 سطراً) · 14 بنداً نقطياً · 25 مرقّماً · 6 مواضع تغميق · 6 أسطر مائلة = المصدر (PASS) |
| الترويسة | `key`/`slug`/`pubDate`/`heroImage` مطابقة للإنجليزي؛ ترتيب المفاتيح على السابقة؛ `lang: de`؛ `topic: "Kultur und Handwerk"`؛ 4 FAQ، 5 وسوم؛ لا `updatedDate` (PASS) |
| محارف ممنوعة | U+00A0 = 0 · U+2014 = 0 · U+2009 = 0 · U+202F = 0 · U+2019 = 0 (PASS) |
| محظورات | `osman…`/`ottoman` = 0 · `Souq` = 0 · `Persisch`/`Arabischer Golf` = 0 (PASS) |
| بقايا إنجليزية | `governor`، `Syria`، `Ibn Qutaybah`، `al-Bahrayn`، `Qays`، `Ubayda`، `Zayd`، `Baynuna`، `Dubay` = 0 (PASS) |
| اتساق صيغ الأعلام | صيغة واحدة لكل من: Tarafa، Ibn Qutaiba، al-Bahrain (لا `Bahrain` مجرّداً)، Maktaba Shamela (لا `Al-Maktaba`)، Statthalter (لا `Gouverneur`)، Hauptort / wichtigste Stadt (لا `Hauptstadt`)، Levante (لا `Syrien`)، Dschahiliyya، Mu'allaqa، Yaqut، Hajar، Imru' al-Qais (PASS) |
| تكافؤ الألفاظ الثابتة | `Statthalter` 20 = `governor` 20 · `Hauptort` 10 = `chief town` 10 · `wichtigste Stadt` 6 = `principal town` 6 · `al-Bahrain` 33 = `al-Bahrayn` 33 (PASS) |
| `al-` | صغيرة وسط الجملة، كبيرة في أولها (6 مواضع `Al-Mutalammis`/`Al-Bahrain` كلها بعد نقطة أو نقطتين) (PASS) |

## عدّ C22
محاكاة تقطيع `tools/check-consistency.mjs` (كتلة عند كل وسم: رابط، تغميق، مائل، سطر؛ كتل من كلمتين فأكثر؛ استثناء `Al-Ahsa` و`VISIT AL-AHSA`) على **جزء المقال وحده** (الترويسة المعروضة + المتن)، لا على `dist` (الصفحة لم تُبنَ بعد):

- كتل المقال: **191**
- كتل لاتينية مطابقة حرفاً لكتلة في الإنجليزية: **9** = `Ibn al-Anbari` ×4 · `Ibn Sallam al-Jumahi` ×1 · `Yaqut al-Hamawi` ×1 · `Jawad Ali` ×1 · `Mu'jam al-Buldan` ×1 · `Tarafa ibn al-Abd` ×1 (الوسم)
- النسبة على كتل المقال وحدها: **4.7%**. بأسوأ فرض (+2 كتلة مطابقة من القالب، بلا أي كتلة قالب في المقام): 5.8%. المتوقع على الصفحة المبنية (المقام يكبر بكتل القالب الألمانية): نحو 4–5%.
- العتبة 20%؛ الحد الداخلي للدفعة 25 كتلة. **PASS بهامش واسع** (9 من 25).
- لا سطر مصادر ولا نصّ رابط منصة يطابق الإنجليزي (23 × `Seite in der Maktaba Shamela`؛ `S. 132`/`S. 135`/`S. 138`).
- **تحفّظ:** العدّ محاكاة على Markdown؛ الرقم النهائي يُقرأ من `npm run build` (C22 على `dist`) بعد النشر.

## التصحيحات
لا شيء. `tarafa-ibn-al-abd.stage5.md` = `tarafa-ibn-al-abd.stage4.md`.
