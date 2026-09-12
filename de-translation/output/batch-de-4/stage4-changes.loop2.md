# المرحلة 4 — سجلّ التغييرات وسياج الوقائع · `batch-de-4` · لفّة التصحيح 2

نُسخ `fields.stage3.loop2.json` ⇒ `fields.stage4.loop2.json`. **صفرُ تغييرٍ من 65 بالفرق**: `filecmp` مطابق · الفرقُ الحقليّ 0/65 · `json.tool` صالح · 65 حقلاً في 10 مفاتيح. والمخرجُ يفارق `fields.stage5.json` في **18 حقلاً** لا تسعةَ عشر.

بندا الردّ المسندان إليّ (أ-1 البطاقة · أ-2 النبذات) **نفّذتهما المرحلة 2 داخل السياج**، فدوري عليهما تحقّقٌ لا تحرير؛ والسياجُ على الثمانيةَ عشرَ لم يجد مضافاً ولا مُسقَطاً. وأثرُ المرحلة في المعجم.

## أ. أ-1 · بندُ البطاقة ×5

`Für das Gebet genutzt – zu den Gebetszeiten geöffnet, kein Eintrittsgeld`

| السؤال | القياس |
|---|---|
| تطابقٌ بايتاً ببايت في الخمس بحقولها الثلاثة؟ | **نعم**، بصمةٌ واحدة · `label_de`/`source_de` كما هما · U+2013 بمسافتين · U+2014 = 0 |
| ظرفُ استمرار؟ | تسعُ صيغ (`weiterhin`·`nach wie vor`·`immer noch`·`noch immer`·`seither`·`seitdem`·`durchgehend`·`ununterbrochen`·`ohne Unterbrechung`) = **0** |
| دعوى عودة؟ | `wieder` = **0** في البطاقة؛ وثلاثُها في المتون نصُّ مصدرها: `hubaish` («regained its life») · `umzurainiq` («returning a working mosque») · `jabri` («restored repeatedly») |
| أسقطت واقعة؟ | **لا**: الاستعمالُ للصلاة (`A working mosque`·«مسجد عامل») · الفتحُ لأوقات الصلوات · لا رسم. و`kein Eintrittsgeld` 5/5 و`kein Eintritt` 0 |

**والصيغةُ تسعُ المتونَ الخمسة**: حالٌ بلا تأريخ، فلا تصادم `hubaish` ولا `umzurainiq` — موضعَي قياس POL-DE-34.

## ب. أ-2 · كلُّ رقمٍ أُدخل له نظيرٌ حرفيٌّ في متن صفحته

| الحقل | ما أُدخل | النظيرُ الحرفيّ في المتن نفسه |
|---|---|---|
| `hubaish.summary_de` | `(etwa dem 19. Jahrhundert n. Chr.)` | `body_de` يحمله **حرفاً**؛ و`etwa` لفظُ المصدر («around the nineteenth century CE») |
| `bubakr.summary_de` | `(um 1863 n. Chr.)` | `body_de`: «(n. H.; **um 1863 n. Chr.**)»؛ و`um` لفظُ المصدر («around 1863 CE») |
| `dibs.summary_de` | لا رقم: الاسمُ والبدل | الاسمُ من `title_en`، و`offiziell` لفظُ `body_en` («**officially** Al-Fatih Mosque») |

**وقرنُ `jabri.summary_de` بقي عارياً** كما بتّ الحاكم (zh وru عاريان): `15. Jahrhundert n. Chr.` = 0.
**و34 رقماً قُوبلت بملفّات مصادرها آلياً: صفرُ رقمٍ لا يرد حرفياً في ملفّه**، ولا تحويلَ ولا تقريب.

## ج. سياجُ الوقائع على الثمانيةَ عشرَ حقلاً

| الحقل | الحكم |
|---|---|
| `value_de` ×5 · النبذاتُ الثلاث | القسمان أ وب: صفرُ مضافٍ وصفرُ مُسقَط |
| `qubba.body_de` | سبعُ وقائعَ باقية (قبةٌ نصفُ كروية · ~13 م · قبابُ أركان · مئذنةٌ مستقلةٌ مجاورة · 19 م · سلّمٌ حلزونيّ · لوحةُ جصّ). `freistehend` تردّ `free-standing`/«مستقلة» و`mit einer steinernen Wendeltreppe` تردّ «بسلّم حجري حلزوني» — **ولا `im Inneren`** (ru «внутри» ولا يقوله الفيصل) |
| `bubakr.body_de`+`area_de` | عشرُ وقائعَ باقية. `Herberge für Studierende` لفظُ إيواءٍ **داخلُ المصدر** («to house students of knowledge»·«لإيواء طلبة العلم») ⇒ صفرُ مضاف، و`Stiftung` تتصدّر بالمعجم والفيصل؛ و`Teil des` مسنَدٌ بـ«quarter **of** … district» |
| `uqair.body_de` | خمسُ وقائعَ باقية؛ `Golfküste` و«des ältesten Seehafens» حرفاً، والمجهولُ يسمّي الفاعلَ فلا تُسقَط الجهة |
| الخمسةُ الباقية | لفظٌ أو ترتيبٌ بلا واقعة، وكلُّ تفضيلٍ يقابل تفضيلَ مصدره. `Äcker` أرضٌ زراعيةٌ موقوفة («المزارع والنخيل») لا عقارٌ عامّ · «weit über tausend»·«vierzig»·«etwa elf»·«fünfzig» نصُّ المصدر بلا تدوير · كتلةُ `umzurainiq` تحمل الجدرانَ والنوافذَ والعقودَ ووصفَ الداخل |

## د. المسحُ بعد آخر تحريرٍ في اللفّة — 34 تعبيراً، كلٌّ مُختبَرٌ على ضابطٍ موجبٍ وسالب (إخفاقان، القسم هـ)

- **الحمايةُ النظامية صفرٌ كلُّها بحدود الكلمات والصيغ المصرَّفة**: `denkmalgesch*`·`Baudenkm[aä]l*`·`unter Denkmalschutz`·`Stätte(n) des Kulturerbes`·`Kulturerbestätte*`·`geschützt*`·`volkstümlich*`. و**`Arabischer/Persischer Golf` = 0** بكلّ تصريفٍ مع إبقاء `die Golfküste`/`der Golf`.
- **POL-DE-11 صفحةً صفحة 10/10**: `abubakr` 2⇒2·2⇒2·1⇒1 · `uqair` 1⇒1·5⇒5 · `umzurainiq` 4⇒4·1⇒1 · `qubba` 1⇒1 · `dibs`/`tahimiyah-e` 1⇒1 · `hubaish`/`jabri`/`jalaniyah` 2⇒2 · `bubakr` 0⇒0 — صفرُ انطباقٍ وانقسام، وتحريراتُ اللفّة لم تُزِح رقماً.
- **سياجُ `Ribat` الثلاثيّ**: ألفاظُ التحصين الإحدى عشرةَ (`Mauer*`·`Turm`·`Festung*`·`Wehr*`·`befestigt*`·`Burg*`·`Zitadelle*`·`Bollwerk*`·`Grenz*`·`Kastell*`·`Fort*`) = **0** · الدلالةُ تتصدّر النبذةَ والجملةَ الثانية · لا گلوس في العنوان.
- **الزيوغما مفحوصة**: `gegründet von …` يصحّ مع طرفَي العطف والقرينان مؤنّثان. ومدخلُ المعجم 143 **لا ينطبق**: شرطُه «solange die Erweiterung **kurz** ist» والتوسعةُ 13 كلمةً ⇒ الاستثناءُ كما في `dhafar` (20 كلمة).
- **الحرّاس والمحظورات = صفرٌ كلُّها**: U+2014 · أرقامٌ غيرُ لاتينية · `Souq(s)` · NBSP/لينة · اقتباسٌ مستقيم · رابط · تعجّب · Denglisch (12 لفظاً و`Highlight`) · `einzigartig*`/`atemberaubend*`/`weltberühmt*`/`unvergesslich*`/`spektakulär*` · حشوُ `natürlich/wirklich/einfach` · `(Erleben|Entdecken|Besuchen|Genießen) Sie` · `du/dich/dir/dein*` · السويسرية. و**U+2013 = 27 بمسافتين** و`„…“` 1/1.

## هـ. فاحصي كذب مرّتين، وكشفهما اختبارُ الضوابط

1. **`\bBaudenkmal\w*` أخفق على ضابطٍ موجب**: `Baudenkmäler` ليست `Baudenkmal`+لاحقة (`a ⇒ ä`). أُصلح إلى `\bBaudenkm[aä]l\w*` — علّةُ «الصيغ المصرَّفة» بعينها.
2. **ضابطي السالب لـ`\bwieder\b` كان خاطئاً لا التعبير**: «immer wieder» تحمل `wieder` قائمة. صُحّح الضابط وبقي التعبير.

ولا أُعلن بنداً فُحص في اتجاهٍ واحدٍ وله اتجاهان: POL-DE-11 قيست في الاتجاهين والأرقامُ كذلك.

## و. ما نُظر فيه وأُبقي بعلّته

1. **`Im Inneren schmücken Stuckornamente Wände …`** — المصدرُ يقول «on **its** walls»؛ أُبقي لأن `Im Inneren` يحدّد المالكَ والإسنادُ أحاديُّ الاتجاه دلالياً.
2. **`Verpflegung`** لـ«المأكل والمشرب» جامعٌ يغطّي الطرفين · **`Teil`** لـ`quarter` مسنَدٌ بـ`of`.
3. **`Gelehrsamkeit` لـ`scholarly`+`learning`** — التقاءٌ موصوفٌ ومخصومٌ منذ المرحلة 2، **غيرُ مستحدَثٍ هنا**، وتفكيكُه يمحو «وقف علمي» المتصدّرَ في الفيصل ⇒ خارج أمرِ الردّ.
