# دفعة `tr-static-1` — الصفحات الثابتة الأربع (`/tr/unesco/` و`/tr/report/` و`/tr/report/thanks/` و`/tr/terrain-map/`، 36 سلسلة)

أربع صفحات تُبنى بالتركية على نطاق الدفعة الأوردية ur-static-1: كتل TR في UnescoView (8) وReportView (11) وReportThanksView (3)، و13 مفتاحاً في ui.ts (`tmap.*` الاثنا عشر و`form.honeypot`)، و`TR_STATIC` في `src/lib/routes.ts` يضم الأربع (فتتبعها hreflang والتذييل وخريطة الموقع)، وعنوان المعلم التركي في قائمة الخريطة التضاريسية (`title_tr`). **ومعها مراجعة سلسلة منشورة**: رابط `map.terrain` على صفحة الخريطة «3D arazi haritası» ← «3D kabartma harita» (`frame.map.terrain` في `pack.json`، تُستبدل في مكانها؛ أداة `pack-add-frame-static.mjs`)، بعد ثلاثة قرّاء عثروا على «arazi» (أرض/قطعة) — عتبة الخط المنفّذة سابقاً على «Arap Körfezi Yolu». **السياق في `pack.json` كُتب من كود المكوّن**؛ والنائب `{names}` رمز لتعبير `names.join(', ')` تعيده أداة التطبيق. التنفيذ بوكلاء Sonnet 5.5. **بناء تجريبي بنصوص إنجليزية** (`stages/00-english.json`) أثبت البنية (أربع صفحات، البناء أخضر).

| المرحلة | الملف | النتيجة |
|---|---|---|
| 1 المترجم | `stages/01-translator.json` | 35؛ مقترح «UNESCO Dünya Mirası Merkezi» |
| 2 المحرر · 3 الموائم | `02-editor.json` · `03-localizer.json` | 4 (شطر المقدمة، «Doğru bilgi vermemize»، الفاصلة بعد «Katkınız») · 0 |
| 4 سياج الوقائع · 5 المدقق | `04-benchmarker.json` · `05-proofreader.json` | 1 (اسم المؤسسة المشهود «UNESCO Dünya Miras Merkezi» من اللجنة الوطنية التركية لليونسكو) · 1 |
| بناء مرحلي | `t9-build-05.log` (scratch) | أخضر؛ C22 وC77 |
| 6 القارئ الأعمى (على 05) | `06-blind-reader.on-05.md` | 52 |
| 7 الحاكم، الدورة 1 | `07-judge.r1.json` | 90 (tmap 90)، 10 مفاتيح؛ ST1–ST9 |
| تدقيق مستقل + قارئ طازج | `05d-proof-of-judge.md` · `06-blind-reader.on-r1.md` | 0 · 54 |
| الدورة 2 | `07-judge.r2.json` | 90، 6 مفاتيح؛ ST10 («{n} bileşenin» لا «{n} tanesi») |
| تدقيق + قارئ | `05d-proof-of-judge-r2.md` · `06-blind-reader.on-r2.md` | 0 · 55 (القارئ الثالث على «arazi») |
| ملحق ختامي | `07-judge.r3.json` · `07-judge.r3-addendum.md` | **91** (tmap 90 ← 91 بتعليل: حُسم الاسم)، 6 مفاتيح؛ ST9-r3 «kabartma harita» (TDK) |
| تدقيق + قارئ رابع | `05d-proof-of-judge-r3.md` · `06-blind-reader.on-r3.md` | 0 · 47 (لا عثرة على «kabartma»؛ الباقي تفضيلات أو مكرّر محكوم — لا دورة رابعة) |

الحصيلة: `final.json` (من r3)، 20 حكماً (عشرة `superseded_by`)، مدخلا معجم مشهودان («UNESCO Dünya Miras Merkezi»، «kabartma harita»)، 35 زوج ذاكرة جديداً وحُذف الزوج المسحوب «3D arazi haritası»، سطر الدرجات.

**أحكام ST الملزمة للدفعات اللاحقة:** اسم المؤسسة «UNESCO Dünya Miras Merkezi» والقائمة/الموقع «Dünya Mirası Listesi/alanı» · العدد بعد رقم يكتبه القالب اسم مفرد بلا لاحقة على النائب («{n} bileşenin»)، و«on iki» بالحروف · السنة داخل الجملة «2018'de … alınan» لا «(2018)» · «bildirim» على صفحتي الإبلاغ · H1 الذي هو عنوان التبويب بلا شرطة داخلية (فاصلة) · «kabartma harita» للخريطة التضاريسية في الرابط والعنوان والزر والمقدمة.

**علّة مصدر وسؤال لإياد:** مقدمة الخريطة التضاريسية الإنجليزية تقول «اضغط أي اسم في القائمة لتراه على الخريطة»، لكن الاسم في الصفحة رابط لصفحة المعلم، وما يحرّك الخريطة هو زرّ ◎ بجواره. هل يُصحَّح النص الإنجليزي (ومعه بقية اللغات) ليذكر الزر؟ التركية تتبع الإنجليزية حتى ذلك الحين.
