# أثر معايرة الخط التركي — جبل القارة

مخرجات المراحل التي أنتجت صفحة المعايرة `jabal-al-qarah` (tr-TR، 2026-10-27). هي **سند** الأحكام في `glossary/termbase.json` والتقرير في `تقرير-المعايرة.md`، لا نصوص تُحرَّر: لا يُعدَّل شيء هنا.

المرجع الواحد هو `stages/final.json`: النص المُقفل ودرجات الدورات الثلاث.

| الملف | ما هو |
|---|---|
| `pack.json` | حزمة المصدر: الحقول الإنجليزية والعربية من `src/content/attractions/jabal-al-qarah.md` على `b0f8ccd`، ونصوص القالب، وترتيب العرض، وقواعد الموقع الملزمة |
| `stages/01-translator.json` | المرحلة 1 — المسودة، ومداخل الأسماء، وسجل البحث، والبنود المرفوعة |
| `stages/02-editor.json` | المرحلة 2 — المحرر: 14 تعديلاً |
| `stages/03-localizer.json` | المرحلة 3 — الموائم: تعديل واحد، و11 واقعة لم تُضف |
| `stages/04-benchmarker.json` | المرحلة 4 — المقارن وسياج الوقائع: سجل التحقق والمداخل المصحّحة |
| `stages/05-proofreader.json` | المرحلة 5 — المدقق على نص السلسلة |
| `stages/06-blind-input.r1.txt` · `06-blind-reader.r1.md` | مدخل القارئ الأعمى الأول وملاحظاته (39) |
| `stages/07-judge.r1.json` | الحاكم، الدورة 1 — 88، RETURN |
| `stages/05-proofreader.r2.json` | تدقيق نص الدورة 1 |
| `stages/06-blind-input.r2.txt` · `06-blind-reader.r2.md` | القارئ الثاني المستقل (38) |
| `stages/07-judge.r2.json` | الحاكم، الدورة 2 — 89، RETURN |
| `stages/05-proofreader.r3.json` | تدقيق نص الدورة 2 |
| `stages/06-blind-input.r3.txt` · `06-blind-reader.r3.md` | القارئ الثالث المستقل (51) |
| `stages/07-judge.r3.json` | الحاكم، الدورة 3 — 90، APPROVE؛ وفيه `source_defects` الكاملة و`tm_pairs` |
| `stages/05d-proof-of-final.md` | تدقيق مستقل للنص النهائي (تعديلات الدورة 3 السبعة التي لم يقرأها قارئ أعمى) |
| `stages/final.json` | المرجع الواحد: النص المُقفل + الدرجات |
