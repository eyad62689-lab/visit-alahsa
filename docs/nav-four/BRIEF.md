# الدفعة `nav-four` — أربعة قرارات تنقّل (de · ru · zh)، إياد 2026-10-04

المصدر في الالتزام على هذا الفرع (`git show HEAD~0` — أول التزام بعد main).

1. **الفعاليات اسم واحد:** `cat.events.t` = قيمة `nav.events` في لغتك حرفياً (كان «الفعاليات والمواسم» ← «الفعاليات» / Events).
2. **بطاقة المذاق:** `cat.taste.t` = قيمة `nav.food` في لغتك حرفياً (كان «المذاق والتمور» ← «المطبخ الأحسائي» / Hasawi Cuisine). الوصف `cat.taste.d` باقٍ.
3. **بطاقة الحِرف** تقود إلى مقال الحرف في المدونة — تغيير كود، لا نص.
4. **«رحلتي» ← «معالمي المحفوظة» / «My saved places»** — اسم الأداة التي تجمع المعالم المحفوظة (الرابط /plan/ باقٍ)، تمييزاً لها عن «خطّط لرحلتك» (الدليل). وزرّ الحفظ في صفحات المعالم: «احفظ المعلم» / «Save this place»، وحالته «محفوظ ✓» / «Saved ✓».
   المواضع بلغتك (كل ذكر للأداة باسمها): `src/i18n/ui.ts` — `nav.myTrip`، `fav.add`، `fav.added`، `home.route.link`، `plan.title`، `plan.empty.d`، `plan.waText`، `plan.shared.d`، `plan.shared.import`، `plan.shared.mine` (وأي مفتاح آخر يسمّي الأداة بلغتك — ابحث)؛ `src/components/views/PlanTripView.astro` و`EventsView.astro` (كتلة لغتك)؛ المدونة `src/content/blog/{24-hours,48-hours,crafts,jabal-qarah,souvenirs,worth-visiting}-<lang>.md`. انظر `git show HEAD` لصياغة ar/en.
   - الاسم يظهر في الترويسة (أدوات الشريط) — **قصير قدر الإمكان** مع وضوح المعنى («المحفوظة/saved»)؛ سيُقاس الرأس بعدها.
   - الصينية: «我的行程» تلتبس بـ«行程规划» — اسم يدل على الحفظ.

## قيود
CRLF؛ U+0020؛ لا اختلاق؛ لا نشر دون 90/100.
