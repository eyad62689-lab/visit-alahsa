# الدفعة `nav-three` — ثلاث ملاحظات (de · ru · zh)، إياد 2026-10-04

المصدر في الالتزام 29df30f (`git show 29df30f`).

1. **التذييل:** صفحة «الأسواق والمنتزهات والمزارع» رابط واحد باسمها (`nav.leisure`) بدل ثلاثة مرشّحات — تغيير كود، لا نص.
2. **الألمانية وحدها — «Hasawi-Küche» ← «Küche aus Al-Ahsa»** اسماً للقسم/الصفحة: `nav.food`، `cat.taste.t`، `src/lib/categories.ts` (taste)، عنوان صفحة المطبخ `src/components/views/FoodView.astro` (title، وما يكرّر اسم الصفحة)، وكل إحالة إلى الصفحة باسمها (DiningView «auf der Seite Hasawi-Küche»، المدونة worth-visiting-de وغيرها — ابحث). **أسماء الأصناف تبقى** (Hasawi-Reis، Hasawi-Limette، Hasawi-Bischt…)، والاستعمال الوصفي داخل المتن (مثل «Die Hasawi-Küche schöpft…») يُقرَّر بالسياق: اسم الصفحة يتغيّر، والوصف يجوز إبقاؤه أو جعله «Die Küche Al-Ahsas…» بما يخدم الوضوح. رأس الصفحة يُقاس بعدها.
3. **وصف بطاقة المطبخ `cat.taste.d`:** «مطبخٌ دافئ: الأرز الأحسائي والهريس والمفلق وخبز التمر.» / «A warm kitchen: Hasawi rice, harees, mufallaq and date bread.» — بأسماء الأطباق كما هي منشورة في صفحة المطبخ بلغتك (`src/data/dishes.ts` كتلة لغتك) حرفياً.

## قيود
CRLF؛ U+0020؛ لا اختلاق؛ لا نشر دون 90/100.
