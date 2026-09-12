# المرحلة 2 — ملاحظات المحرّر · دفعة المعالم الألمانية 3

نُسخ `fields.stage1.json` إلى `fields.stage2.json` وحُرّر حقلاً حقلاً. **المتغيّر 11 من 37**، و26 باقيةٌ **بايتاً ببايت** (فرقٌ آليّ).

## أ. ما تغيّر

| الصفحة | الحقول | أبرز علّة |
|---|---|---|
| `abdulrazaq` | `summary` · `body` | التصاقُ «in Al-Ahsa» بـ`Nationalerbe` ⇐ `das Al-Ahsa-Büro …`؛ `Schullehrpläne`. |
| `ahsa-house` | `body` | شطرُ جملةِ الغرف (70 كلمة)؛ `veranstaltet …`؛ خاتمةٌ فعليّة. |
| `ahsa-museum` | `body` | تكرارُ `mit` يمنع قراءةَ المضاف إليه؛ `der ideale` ⇐ `ein idealer` («an ideal»). |
| `dar-alturath` | `body` | `Sammeln von Kulturerbe` ⇐ `… die dem Kulturerbe gilt`؛ `Militärhelme`؛ شطر. |
| `dhafar` | `summary` · `body` | `im Königreich` بلا مرجعٍ ⇐ `in Saudi-Arabien`؛ و`eigenständigsten` (ب.6). |
| `khalifa` | `body` | ذيلٌ مقلوب ⇐ صفةٌ معترضة؛ شطرُ 50 كلمة ومطابقةُ حالةِ البدل (`die eines … Souks`). |
| `najim` | `body` | تقديمٌ متكلَّف وجملةٌ 60 كلمة ⇐ جملتان. |
| `hamidiyah` | `summary` · `body` | تحفُّظُ المرحلة 1 على قراءة الإدراج (ب.1). |

## ب. بتُّ العُهَد الستّ

**1. `Kulturerbe` — التحفُّظ صحيحٌ في موضعين من أحد عشر.** قرأتُ المواضع كلَّها مغطّياً المصدر: الفارق **رتبةٌ نحوية لا مفردة**. الوصفيةُ/المركّبة تُقرأ تصنيفاً (وسابقتُها المنشورة `Kulturerbe-Dorf`) — فبقيت **كلُّها بلا مسّ**. والخبريةُ بالمصطلح مجرَّداً وحدها تُقرأ وسماً، وأشدُّها `eine Stätte des Kulturerbes` لأنها في حقل `Kulturerbestätte`/`Welterbestätte` والصفحةُ في واحةٍ **مُدرَجةٍ فعلاً**. فغُيّرت الرتبةُ لا الخانة: `zum kulturellen Erbe der Stadt/Hofufs gehören` (فضفاضةٌ يومية + مضافٌ إليه يثبّت المرجع في هفوف لا في سجلّ) و`eine Sehenswürdigkeit dieses Erbes` (مقابلُ «معلم» في `ui.ts`). **لا عبارةَ مفروضة ولا عنصرَ مصدرٍ ساقط.** المدخل في `termbase-additions.stage2.json`.

**2. `hamidiyah` — القيود الثلاثة محترمة، والانقسامُ أوسعُ ممّا رُفع.** `kicker_de` غيرُ ممسوس؛ جملةُ «Weitere Angaben … belegen.» **باقيةٌ بالحرف** (فحصٌ آليّ)؛ والممسوسُ مواضعُ POL-DE-11 الثلاثة. **وعلّةُ مسّ «معلم تراثي» مسمّاة** (الموجز سادساً/3): إبقاؤها `historische Stätte` يُبقي لفظاً ألمانياً واحداً على لفظَي مصدرٍ مختلفين (`historic downtown` + `heritage landmark`) — عينُ دَينِ الدفعة 2. **والانقسام المنشور ثلاثةُ مواضع لا اثنان**: `kicker_de` · `faq[0].a_de` · **`faq[2].q_de`** («historischen Souks» ⟵ «heritage souqs») — والأخيرةُ لم تُرفع في المرحلة 1. الأثر صفرٌ في اللصيقة (POL-DE-17) **وغيرُ صفريّ في `faq`** (معروضةٌ وفي `FAQPage`). **لا أوسّع النطاق؛ القرار للحاكم.**

**3. `dhafar` — «الأولى من نوعها» تبقى منسوبةً في الحقلين: أمانةٌ للمصدر.** السندُ الوحيد `described as` / «يوصف بأنه»؛ فالنبذةُ المثبِتة تنقل **صياغةَ المصدر** لا **سندَه**، والسندُ هو الحاكم (الموجز 131). وهي وصفُ الصفحة في نتائج البحث، فدعوى تفرُّدٍ بلا ناسبٍ فيها «صفةٌ مطلقةٌ بلا سند». **لا تغيير على النسبة.**

**4. `ahsa-house` — «الطحن» مثبَتٌ ومفحوص.** `Geräten zum Rösten und **Mahlen** des Kaffees` في الناتج: الفيصلُ العربي حيث أسقطت الإنجليزيةُ الطحن. **لا مصالحة بين المصدرين بغيره.**

**5. اسم الجهة — إبقاءٌ معلَّل.** المصدران **نفساهما** يختلفان: `abdulrazaq` يحمل «الوطني/national» و`najim` لا يحمله، في اللغتين معاً؛ فالتوحيدُ إضافةُ لفظٍ أو حذفُه = عملُ وقائع محظورٌ على المحرّر، وسابقةُ المعجم صريحة («توحيدهما خطأٌ وقائعيّ» — `Agentur …`). **والرأسُ الألمانيّ موحَّدٌ أصلاً.** المدخلان في `stage1` بجنسهما (`die`) ومصدرهما، ومدخلُ تصديقٍ في `stage2`؛ والتصحيحُ تركيبيّ.

**6. قراءةُ الناتج لا المدخل — ستُّ قراءاتٍ خاطئةٍ محتملة، كلُّها في جملٍ مسستُها.** (أ) `Karten … und historischen Fotografien` ⇐ كُرّرت `mit`. (ب) `… Qaisariyah-Souks, in dem …` — الموصولُ يقع على **المثال** لا على سوق المتحف ⇐ جملةٌ مستقلّة بفاعلٍ صريح. (ج) `So fand **es** …` — رُدّت: `es` تحتمل `das Haus` ⇐ `das Museum`. (د) `die dem Kulturerbe gilt` ⟵ `Familientradition` وحدَه. (هـ) `wie es … haben` — `es` = `ein Profil`. (و) `dieses Erbes` — مرجعُه في الجملة السابقة. وجملي الممسوسةُ ذاتُ فاعلٍ ومسندٍ ظاهرين، وأقواسُها قصيرة.
و`eigenständigsten` (خيارٌ رفعته المرحلة 1 إليّ) **رُدّ**: يُقرأ «مستقلّ» وهو حشوٌ في متحفٍ **خاصّ**؛ و`einzigartigst` محجوزةٌ في الصفحة، و`ungewöhnlichst` تُقرأ غرابةً. فحُلّ بلا صفة: `ein Profil, wie es … nur wenige haben`.

## ج. فُحصت وأُبقيت

`Bestände aus Archäologie und Kulturerbe` · `gibt es` (وجوديّةٌ) · `darunter Schwerter und Militärhelme` (الإنجليزيةُ تُدخل الخوذَ تحت السلاح والعربيةُ تعطفها: فرقٌ تصنيفيّ لا وقائعيّ — **يُبلَّغ** ولا يُصالَح) · `die ersten Maschinen` · `Diwaniyya` بلا گلوس (‏`Madschlis (Empfangsraum)` يسبقها) · `einzigartige Sammlung` (المصدران يقولانها) · العناوينُ واللصائقُ و`area_de` السبعة.

## د. الفحوص الآلية **بعد آخر تحريرٍ لي**

`json.tool` ✅ · المفاتيح **8** · الحقول **37**. بحدود الكلمات = **0** لكلٍّ: `du/dich/dir/dein` · `volkstümlich` · `denkmalgeschützt` · `Baudenkmal` · `Souq` · Denglisch ومعها `Highlight` · `Erleben/Entdecken Sie`؛ وU+2014 · U+00A0/U+2009 · أرقام عربية-هندية · `"` مستقيمة · تعجّب = 0.
**عدم الانطباق على كل صفحةٍ كاملة (على ناتجي):** لا صفحة تَرُدّ لفظين مختلفين إلى لفظٍ ألمانيّ واحد. أكثفُها `khalifa` (Kulturerbe 3 · traditionell 2 ⟵ folk souq · historisch 1 ⟵ historic crafts) و`hamidiyah` (kulturelles Erbe 3 · historisch 2 ⟵ historic downtown · traditionell 1 ⟵ folk market).

## هـ. مرفوعٌ للمراحل التالية

1. **للحاكم:** انقسامُ `hamidiyah` الثلاثيّ (ب.2)؛ وسحبُ مدخل الدفعة 2 «heritage souq building ⇐ das historische Souk-Gebäude» بموجب POL-DE-11 (مقترحٌ في المعجم).
2. **للقارئ الأعمى:** أتُقرأ `zum kulturellen Erbe der Stadt gehören` تصنيفاً لا إدراجاً؟ · أفعالياتٌ `Werkstätten` بعد `veranstaltet`؟ · أيستقيم `eine Sehenswürdigkeit dieses Erbes`؟ · أيُفهم `Diwaniyya` بلا گلوس؟
3. **للمرحلة 4:** `Volkskultur` داخل أسرة `Volks-` قرارُها — لم أمسّه.
