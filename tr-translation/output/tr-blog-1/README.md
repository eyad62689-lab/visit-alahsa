# دفعة `tr-blog-1` — المدونة التركية: الإطار وثلاثة مقالات (`/tr/blog/`، 43 سلسلة)

صفحتا المسار `src/pages/tr/blog/index.astro` و`[slug].astro`، ومفاتيح إطار المدونة العشرة في كتلة tr من `ui.ts` (`crumb.blog`، `blog.*`، `det.mentions.h`)، وثلاثة مقالات بملفات `*-tr.md`: «يوم واحد في الأحساء» (`24-hours`)، و«48 ساعة في الأحساء» (`48-hours`)، و«هل تستحق الأحساء الزيارة؟» (`worth-visiting`). لكل مقال: العنوان والوصف والموضوع والوسوم والأسئلة الشائعة والمتن بالماركداون. الوسوم في frontmatter وحده، ولا تُصيَّر في أي صفحة. الوصل: `BLOG_INDEX.tr` وpostAlt وتذييل المدونة وsitemap وقوائم النظائر في فهارس اللغات الست. **الفهرس التركي يسرد مقالاته وحدها** لأن البناء التجريبي أخفق في C22 حين عرض الفهرس الجزئي ست بطاقات إنجليزية. وC25 (`check-consistency`) وُسِّع ليشمل tr، وكان قد أخفق بإضافات tr قبل التوسيع، فهذا اختبار كسره. الأدوات في العُدّة: `mkpack-blog`، و`apply-blog` (`--stage` للتجريب)، و`cut-blind-blog` من dist (اختُبر بكسرين أمسكهما)، و`verify` بفحص البنية للماركداون (`allowMarkdown`؛ الاختبار الذاتي 18/18).

| المرحلة | الملف | النتيجة |
|---|---|---|
| بناء تجريبي بالإنجليزية | `stages/00-dry-en.json` | أخفق C25 ثم C22 (الفهرس الجزئي)، وأُصلحا قبل الترجمة |
| 1–5 المترجم · المحرر · الموائم · سياج الوقائع · المدقق | `01`…`05-*.json` | 43 سلسلة؛ أحكام الإطار الأولى |
| 6 القارئ الأعمى (على 05) | `06-blind-reader.on-05.md` | 93 |
| 7 الحاكم، الدورة 1 | `07-judge.r1.json` | 90، 18 مفتاحاً |
| تدقيق + قارئ | `05d-proof-of-judge.md` · `06-blind-reader.on-r1.md` | 5 (منها «çömlekçi çarkında» مختلَقة فحُذفت) · 106 |
| الدورة 2 | `07-judge.r2.json` | 90، 12 مفتاحاً؛ العناوين بحالة الجملة، وأوقات اليوم -r2 |
| تدقيق + قارئ | `05d-proof-of-judge-r2.md` · `06-blind-reader.on-r2.md` | 3 · 59 (القارئ الثالث) |
| ملحق ختامي (عتبة القرّاء الثلاثة) | `07-judge.r3.json` | 91، 7 مفاتيح؛ «günübirlik»، «doğa harikası»، «İslam tarihinin … sayfaları»، صيغة الحيطة الواحدة |
| تدقيق + قارئ رابع | `05d-proof-of-judge-r3.md` · `06-blind-reader.on-r3.md` | 1 · 92 |
| إصلاح ضيّق رابع | `07-judge.r4.json` · `05d-proof-of-judge-r4.md` | 91، 5 مفاتيح · 2 |
| تصحيح التدقيق الأخير | `07-judge.r5.json` | سطر الليمون («denk gel-» مكرّرة)؛ «açılan ilk liman» حُكم بأنها لا تضيف واقعة |

الحصيلة: `final.json` (من r5)، الدرجات: الإطار 92 والمقالات الثلاثة 91، و23 حكماً (سبعة منها `superseded_by`)، وخمسة مداخل معجم (AlUla، Yayımlanma tarihi، Güncelleme tarihi، tarihî merkez، halk çarşısı)، و35 زوج ذاكرة جديداً، وسطر الدرجات. واقتباس عنوان المقال في متن جبل القارة المنشور صار «“El-Ahsa'da 48 saat”» بحالة الجملة (BL1-titles-r2)، وحُدِّث زوجه في الذاكرة في مكانه.

**أحكام BL1 الملزمة لـ`tr-blog-2`:**
- BL1-titles-r2: العناوين بحالة الجملة بعد النقطتين.
- BL1-times-r2: أوقات اليوم Sabah / Öğleye doğru / Öğleden sonra / Akşam / Gün batımı.
- BL1-day: «günübirlik gezi planı» لعنوان «24 ساعة» الذي لا ليل فيه.
- BL1-features-r2: اسم صفحة الموقع يليه «sayfası»، ويُنصَّص في الأسئلة الشائعة وحدها.
- BL1-dates: «Yayımlanma tarihi / Güncelleme tarihi».
- BL1-headings: Pratik ipuçları / Pratik bilgiler / Sonuç.
- BL1-topics: Gezi planları / Neden El-Ahsa.
- BL1-heritage: «tarihî» للمركز والحي والسوق.
- BL1-souqs: «halk çarşıları»، و«haftada bir kurulan halk çarşıları».
- BL1-kasr: لا «Kasr İbrahim kalesi».
- BL1-life: «hayatın nabzı … atar».
- BL1-port-r3: «doğu kıyısında açılan ilk liman»، بلا تاريخ.
- BL1-qarah-line: «dağ» بجوار الاسم في المتن حيث تقولها الإنجليزية.
- BL1-mentions: «Bu yerle ilgili yazılar».
- BL1-blog-phrases: «kesin bilgi için resmî kanallara bakın»، و«kapalı ve sade giyinmeniz, mekâna saygı göstermeniz beklenir»، و«(yerel adıyla lomi)»، و«nakışlayarak» للبشت حيث يقول العربي «تُطرَّز» وحده.

**ملاحظات للخط:** «Kare» تُقرأ «مربّعاً» عند القرّاء الأربعة، والاسم منشور فلا يُغيَّر، والحل «dağ» بجواره حيث يقولها المصدر. وما عثر عليه القرّاء في المحتوى (توقيت قصر إبراهيم بين المقالين، والمسافات، ونشاط المصنع، والصعود إلى الجبل، وترتيب أيام السؤال الشائع) علل في المصدر الإنجليزي لا تُضاف بالترجمة.

**أسئلة وقائع لإياد (مؤجلة مع البقية):**
1. مسجد جواثا: هل يدخله غير المسلمين؟ النص الحالي «مفتوح للزيارة» بلا قيد.
2. القيصرية لا تفتح يوم الجمعة إلا مساءً، والجدول يقترح الصباح. هل يُنبَّه زائر الجمعة؟
