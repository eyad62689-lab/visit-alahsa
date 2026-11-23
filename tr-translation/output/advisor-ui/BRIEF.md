# دفعة `advisor-ui` (tr) — نصوص واجهة المستشار «بلبل» (16 سلسلة)

REPO = جذر المستودع
BATCH = `REPO/tr-translation/output/advisor-ui`

كل وكيل على هذه الدفعة يقرأ هذا الملف أولاً، ثم `REPO/.claude/skills/tr-translation-pipeline/SKILL.md` و`REPO/tr-translation/PLAN.md` و`REPO/tr-translation/config.json` وملف دوره في `REPO/tr-translation/prompts/`، ويلتزمها حرفياً (أحكام المعجم ومعايرته وأفخاخ SKILL.md ملزمة). السابقة الأقرب: الدفعة نفسها بالألمانية `REPO/de-translation/output/advisor-ui/` (للبنية والمنهج لا للصياغة)، وآخر دفعة تركية `REPO/tr-translation/output/transport/`.

## النطاق — `BATCH/pack.json` (16 سلسلة، 125 كلمة إنجليزية)
لكل مفتاح `en` (المصدر) و`ar` (الفيصل عند اختلاف واقعة أو نبرة) و`role` (اقرأه: موضع السلسلة في اللوحة وقيودها)، وفي رأس الملف `context` يصف المكوّن كله. المكوّن: `REPO/src/components/Advisor.astro`؛ والمفاتيح نفسها باللغات الست الأخرى في `REPO/src/i18n/ui.ts` (ابحث عن `'advisor.`). لوحة المحادثة تظهر في كل صفحة من الموقع، وصفحات `/tr/` تعرضها اليوم بلا نص.

## قيود لا تُنتهك
- **لا واقعة تُضاف ولا تُحذف ولا تُلطَّف.** `advisor.notice` إشعار خصوصية ونطاق: الأجوبة من محتوى الموقع وحده، والأسئلة تُعالَج عبر خدمة Anthropic ولا تُحفظ — لا يُقوّى ولا يُخفَّف ولا يُزاد عليه.
- **اسم الشخصية**: مدخل المعجم `Bulbul` (علامة لاتينية، لاحقته `Bulbul'a · Bulbul'un`) ملزم، وملاحظته تنصّ أن هذه الدفعة تستعمل الصيغة نفسها؛ ليس «Bülbül» (= العندليب بالتركية، انظر مدخل `arapbülbülü`). أي اعتراض عليه يُرفع للحاكم ولا يُحسم ضمناً.
- **العلامة** «Visit Al-Ahsa» بالحرف اللاتيني كما هي، و«Anthropic» كذلك.
- **تسميات الصفحات المنشورة** تُنقل حرفياً من `ui.tr`: `nav.plan` = «Gezinizi planlayın»، و`nav.attractions` = «Gezilecek yerler»، و`nav.food` = «El-Ahsa mutfağı». واسم جبل القارة كما في المعجم وذاكرة الترجمة حرفياً.
- **`advisor.chip3`**: العربية «المطبخ الأحسائي» هي الفيصل (الإنجليزية «Hasawi food» منحرفة عنها).
- **المخاطبة `siz`** بالتصريف المهذّب في كل السلاسل؛ ولا `sen`. الاقتراحات الثلاثة (`chip1–3`) تُرسَل بصوت الزائر نفسه سؤالاً منه، فتُكتب بضمير المتكلم.
- **`advisor.intro`**: ثلاثة أسطر يفصلها `\n` حقيقي، والرمزان 🐦🌴 في آخر السطر الأول كما هما. صوت الشخصية دافئ مرح بلا تكلّف، ولا تعجّب مضخَّم.
- **`advisor.open`**: نص زرّ عائم قصير (الهدف ≤ 14 حرفاً).
- **ذاكرة الترجمة** `REPO/tr-translation/memory/tm.json` والمعجم `REPO/tr-translation/glossary/termbase.json` ملزمان: أعد استعمال الصيغ المعتمدة حرفياً.
- أرقام لاتينية 0-9. نص خام بلا ماركداون ولا روابط.
- لا تُحرَّر ملفات المستودع خارج `BATCH/` (المعجم والذاكرة وscores.csv يحدّثها المنسّق بعد الحكم).

## المخرجات — بأداة Write
`BATCH/tr-0N.json`: `{ "batch": "advisor-ui", "lang": "tr", "stage": "N", "strings": { "<key>": "<text>", ... }, "termbase_additions": [], "source_defects": [], "notes": ["تراكمية، كلٌّ مسبوق بـ[sN]"], "stage_specific": {} }` — **كل مفاتيح pack.json الـ16 بترتيبها**، لا يسقط مفتاح. بعد الكتابة تحقّق بـnode أن الملف JSON صحيح وأن مفاتيحه تطابق pack.json عدداً وترتيباً، وأن `advisor.intro` يحمل سطرين فاصلين `\n` بالضبط.

التجميع: وكيل للمرحلة 1 ← `tr-01.json`؛ وكيل للمرحلتين 2+3 ← `tr-02.json` و`tr-03.json`؛ وكيل للمرحلتين 4+5 ← `tr-04.json` و`tr-05.json`؛ ثم القارئ الأعمى (المرحلة 6) على مدخلٍ يعدّه المنسّق؛ ثم الحاكم (المرحلة 7) ← `judge.json` بحقول: `score` و`breakdown` و`cycles` و`blind_reader_rulings` و`decision` و`return_to_stage` و`notes` و`source_defects` و`termbase_additions` و`final_strings`.
