# notes.stage5 — article-qaisariyah-souq (de) — المدقق

المدخل `qaisariyah-souq.stage4.md`، المخرج `qaisariyah-souq.stage5.md`. **تصحيح واحد** (السطر 88، الحرف بعد النقطتين). البنود العشرة والفحوص الآلية في `stage5-checklist.md`.

## نتيجة الفحص
- `node check-stage5.mjs`: **41/41**، رمز الخروج 0. `node check-stage5.mjs --break`: **16/16** طفرة أُمسكت (الطفرات في الذاكرة، لا تُكتب على الملف).
- `s5.mjs` (scratchpad، 46 فحصاً إضافياً للمرحلة 5): **46/46**. كسره `s5-break.mjs` على نسخة في scratchpad: **16/16**.
- `termbase-additions.stage4.json` يُحلَّل JSON سليماً: 40 مدخلاً، لا حقل ناقص، 18 + 22 = 40.
- `check-stage5.mjs` نسخة من `check-stage3.mjs` باسم الملف المفحوص ومرساة طفرة واحدة (`## Fazit`). **لا فحص عُدّل.**

## ما قُرئ يدوياً ولم يُغيَّر
- الحرف بعد النقطتين: كبير حيث تليها جملة تامة (`: Der Beschluss des …`، `: Die Agentur gibt …`، `: Der Souk habe …`، `: Reisende hätten ihn …`، `: In seinem 1900 …`، `: Dann gelten andere …`)، صغير حيث يليها تعداد أو شبه جملة (`: wann er erbaut …`، `: die Aufnahme der …`، `: ihre Waren, die …`). `: Waffen, Stoffen, Stickereien …` و`: Unter den Lebensmitteln …` و`: Wo dieser aufzählt, …` أسماء أو بدايات جمل فحرفها كبير في الحالين.
- `Wer für die Küche einkauft:` في بند النصائح: سليمة، مرفوعة للحاكم من المرحلة 4 لا للتصحيح.
- الكلام المنقول بصيغة Konjunktiv I (`gehe … zurück`، `habe`، `hätten` حيث يلتبس الأول بالمضارع): متّسق في المواضع كلها.
- `Hasawi-Bischte und -Abayas`: شرطة الإكمال صحيحة.
- `80 %` بمسافة عادية (الموجز يمنع U+00A0).
- الفاصلة العليا U+0027 في `Year's` و`Bay'ah`.
- علامات التنصيص حول الألفاظ المقتبسة من الرحالة (`„Keysareeyah“`، `„Kaisariyeh oder Basar von Hofhoof“`، `„neuen Basar“`) كما هي.

## C22
14 كتلة مطابقة من 144 (**9.7%** على جزء المقال)، العتبة 20%. محاكاة على Markdown لا على `dist`؛ يُؤكَّد بالبناء.

## حدود هذه المرحلة
- لم يُشغَّل `npm run build` ولا الناشر: خارج تكليف المرحلة، وملف `src/` يكتبه الناشر. C22 والروابط الداخلية الـ13 (وجود الصفحات الهدف) تُؤكَّد هناك.
- التدقيق الإملائي قراءة وفحوص نمطية بسكربت، لا مدقق Duden آلي.
- لم يُنفَّذ أي أمر git، ولم يُكتب خارج مجلد الدفعة (والـscratchpad)، ولم تُمسّ ملفات المراحل 1–3 ولا `src/` ولا المعجم الكامل.

## يُرفع (من المرحلة 4، بلا جديد)
`in der 13. Runde` · `laut der Encyclopaedia of Islam` مقابل قاعدة العنوان الحرفي · `n. H.` بلا تعريف · `(SPA)` في أجوبة FAQ · `die Qaisariyah` بلا جسر · `Wer für die Küche einkauft:` · هامش C22 (9.7%) ونصوص الروابط الـ16 المطابقة · للمالك: `Teilgebiete`/`Bestandteile` و`(Loomi)` في نوتة المعجم · ملف المرحلة 1 بصيغتَي Al-Jazirah والحمراء القديمتين.
