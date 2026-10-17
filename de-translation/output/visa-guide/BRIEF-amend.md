# دفعة تصحيح `visa-guide-amend` (de) — قرارات المالك 2026-10-17

REPO = `/home/user/visit-alahsa` · BATCH = `REPO/de-translation/output/visa-guide`

## ما تغيّر في المصدر (`BATCH/pack.json` الجديد؛ القديم في `pack.v1.json`)
ثمانية مفاتيح تغيّر فيها en/ar بقرار المالك: `updatedLine` (التاريخ 17 أكتوبر 2026)، `table.rows.0.1` (المقيمون الدائمون في الولايات المتحدة أو الاتحاد الأوروبي أو المملكة المتحدة)، `table.rows.5.1` (شركة أو مؤسسة بدل جهة عمل/employer)، `routes.family.who.text` (الزوج أو الزوجة بدل الزوجة)، `routes.family.cta.label` و`routes.business.cta.label` (زر «يبدأ الداعي الطلب عبر المنصة الرسمية» — تسمية ثالثة بجانب الاثنتين القائمتين)، `faq.items.2.a` (نعم. يقدّمون عبر مسار المقيمين في دول المجلس في منصة وزارة الخارجية (ksavisa.sa).)، `faq.items.4.a` (إضافة «وحضور الفعاليات»). قارن en/ar الجديد بالقديم لكل مفتاح.

## النص المعتمد الذي تبني عليه
`BATCH/judge.json` → `final_strings` (138 مفتاحاً، معتمد بدرجة الحاكم). **لا يُمسّ إلا ما تقتضيه المفاتيح الثمانية وقرارات اللغة أدناه؛ كل ما عداه مقفول حرفياً.**

## قرارات اللغة
الألمانية: «Ehefrau» ← صيغة تشمل الزوج والزوجة (مثل «Ehepartnerin oder Ehepartner» أو «Ehepartner» بحسب أسلوب الموقع، بلا Gendersternchen). المحظورات القائمة كلها (Sie، ß، Durchkopplung، لا Denglisch، لا U+2014).

## القيود (كما في BRIEF.md): نص تنظيمي بلا إضافة ولا حذف؛ لا رسم ولا عملة ولا شك؛ href حرفياً؛ أرقام لاتينية؛ المعجم وذاكرة الترجمة ملزمان؛ seo.title وseo.description ضمن حدود اللغة.

## المخرج
`BATCH/de-amend-05.json`: `{ "batch": "visa-guide-amend", "lang": "de", "stage": "1-5", "strings": { <138 مفتاحاً بترتيب pack.json: المعتمد + المصحَّح> }, "amended_keys": [...], "termbase_additions": [...], "rulings_additions": [...], "open_items_additions": [...], "notes": [...], "stage_specific": { "checklist": ... } }`
