# notes.stage3 — article-tarafa-ibn-al-abd (de) — الموائم (DACH)

المدخل `tarafa-ibn-al-abd.stage2.md`، المخرج `tarafa-ibn-al-abd.stage3.md`. **تعديلان فقط**، كلاهما أسلوبي. المقال تاريخي منقول عن كتب التراث، فلا مادة تخطيط زيارة فيه تُقدَّم، وسياج الوقائع يمنع جلبها.

## ما أُضيف أو حُذف من الوقائع
**لا شيء.**
- لم تُضف واقعة، ولا تعريف بشخص أو كتاب أو موضع، ولا سنة ميلادية (`n. Chr.` = 0)، ولا نصيحة زيارة أو تصوير أو موعد أو مدة، ولا مقارنة بوجهة أخرى.
- لم يُرجَّح بين الروايات (`Wir entscheiden nicht zwischen ihnen` باقية؛ روايتا العمر 20 و26 باقيتان بلا ترتيب).
- لم يُحوَّل خبر منسوب إلى تقرير مجرد: أفعال النسبة والـKonjunktiv I في مواضعها كما في stage2.
- لم يُحذف تحفّظ: جرد `notes.stage1.md` و`notes.stage2.md` يطابق stage3 بنداً بنداً (التعديلان لا يمسّان أي بند منه).
- لا گلوس جديد: `Gouvernorat`، `Banu`، `Qasaba`، `Sahifa`، `Mu'allaqa`، `hisy`، `Hidschra` كلها إمّا مشروحة بلفظ المصدر أو بقاعدة المعجم منذ المرحلة 1. طلب البرومبت «اشرح المحافظة والتقويم الهجري» لا يُنفَّذ هنا إلا بما حمله المصدر والمعجم (`nach der Hidschra (n. H.)` عند أول ذكر).

## التعديلان
1. بند المنتزه: `Angaben für den Besuch stehen auf der Seite des Parks.` ⇒ `Die Angaben für Ihren Besuch finden Sie auf der Seite des Parks.` (مخاطبة Sie كما في بقية القسم: `Was Ihnen bleibt`، `zu dem wir Sie führen könnten`؛ المصدر «Details for visiting are on its page» / «تفاصيل زيارته في صفحته»، لا معلومة جديدة).
2. تمهيد المصادر: `Die klassischen Werke sind … zitiert` ⇒ `Die klassischen Werke zitieren wir …` (صوت المقال «wir» بدل المبني للمجهول). الجملة الأولى `Aufgeführt in der Reihenfolge ihres Vorkommens.` زوج ذاكرة ملزم، لم تُمسّ.

## ما فُحص ولم يُغيَّر
- **السجلّ:** Feuilleton رصين، `Sie` حصراً (الخطاب في القسم 6 والخاتمة فقط، كما في المصدر)؛ `dich`/`Flieh` داخل حوار العامل وطرفة المقتبَس لا خطاب للقارئ.
- **حياد DACH:** لا لفظ إقليمي (`Jungen`، `Schulzeit`، `10. Oktober 2026`)؛ `ß` وفق Duden de-DE.
- **المحتوى الديني والتراثي:** `Bei Gott`، `Eroberung` (الفتح)، `vorislamisch`/`Dschahiliyya` بلا حكم قيمي؛ `der ihn tötete` لا `Mörder`.
- **ثوابت:** لا ذكر للدولة العثمانية بأي لفظ؛ الخليج غير مسمّى (`die Küste`)؛ لا Denglisch.

## الفحص الآلي على stage3 (سكربت `s3.py`، مقارنة قائمة بقائمة مع `tarafa-ibn-al-abd-en.md`)
روابط خارجية 56 = 56 مطابقة حرفاً وترتيباً · داخلية 6 = 6 (كل `/en/` ⇒ `/de/`، بشرطة ختامية) · أسطر الأبيات 10 = 10 حرفاً بحرف، والشطر الافتتاحي بين «» مطابق · أسطر المصادر 25 وروابطها بين `(...)` مطابقة سطراً بسطر · 8 `##`، 48 كتلة، 22 سطر اقتباس، 14 بنداً، 6 مواضع تغميق، 4 FAQ = المصدر · `key`/`slug`/`pubDate`/`heroImage` مطابقة · U+00A0 = 0، U+2014 = 0، U+2009 = 0، U+202F = 0 · `"` مستقيمة في المتن = 0 · „ 52 = “ 52، ‚ 1 = ‘ 1 · أرقام عربية-هندية = 0 · `osman`/`ottoman` = 0 · `Souq` = 0 · نصوص روابط مطابقة للإنجليزي 8.

## يُرفع للمرحلة 4
1. التحقق بالويب من 71 مدخلاً `[house-derived]`، وأولها: `Tarafa`، `Ibn Qutaiba`، `Imru' al-Qais`، `al-Hira`، `Mu'allaqa`/`Mu'allaqat`، `Dschahiliyya`.
2. `Dubai'a` (تُقرأ «Dubai»): أُبقيت اتساقاً مع `Ubaida`؛ القرار النهائي للمرحلة 4.
3. `kh`/`aw` مقابل `Al-Buchari`: حُكم بالإبقاء (غالب المنشور `kh`)؛ يُثبَّت أو يُنقض بمصدر.
4. اسم المنصة: هل لـ`Al-Maktaba Al-Shamela` صيغة ألمانية موثّقة تُستبدل بها في 23 نصّ رابط وجملة التمهيد.
5. `die Levante` لـ«الشام» (العربية فيصل) مقابل `Syrien` الإنجليزية: للمالك.
6. `für ein einziges Gedicht der beste Dichter von allen` (إعادة ترتيب اقتباس ابن سلام في المرحلة 2): تُطابَق بالعربية «أشعر الناس واحدة».
7. `Die klassischen Quellen` بلا `arabischen` في FAQ 1 والخاتمة (على المصدر)، مع بقاء `klassischen arabischen` في العنوان والمقدمة حيث يحملها المصدر.
8. القارئ الأعمى سيطلب السنة الميلادية وتعريفاً بالأعلام: يُرفض بتعليل الموجز.
