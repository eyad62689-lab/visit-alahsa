// نصوص السياسات والشروط القانونية — كانت محبوسة داخل LegalView.astro (~300
// سطر) فأُخرجت هنا (دفعة 3 — 2026-08-29). النص العربي منقول حرفياً من وثيقة
// اعتمدها إياد (docx، آخر تحديث 10 يوليو 2026م) والإنجليزية ترجمة أمينة لها —
// **لا يُعدَّل أي بند إلا بوثيقة معتمدة جديدة من إياد.** تكيّف وحيد معتمد
// (2026-07-10): مرجع «صفحة اتصل بنا» غير الموجودة → البريد الرسمي.
// وبند «دليل المرشدين السياحيين» في قسم إخلاء المسؤولية (عربي/إنجليزي فقط) نصّه من
// مصدره الواحد في src/data/guides.ts — لا يُكتب لـzh/de/ru إلا عبر خطوط الترجمة.
import { GUIDES_DISCLAIMER } from './guides';

export type LegalSub = { h: string; before?: string[]; list?: string[]; after?: string[] };
export type LegalSection = { n: string; h: string; lead?: string; subs: LegalSub[] };

export const LEGAL_SECTIONS_AR: LegalSection[] = [
  {
    n: 'أولًا', h: 'سياسة الخصوصية',
    lead: 'نولي في «زوروا الأحساء» خصوصية زوارنا أهمية قصوى، ونلتزم بحماية بياناتهم الشخصية وفق أفضل الممارسات وبما يتفق مع نظام حماية البيانات الشخصية في المملكة العربية السعودية. توضح هذه السياسة طبيعة البيانات التي نجمعها، وكيفية استخدامها وحمايتها، وحقوقكم المتعلقة بها.',
    subs: [
      { h: '1. البيانات التي نجمعها',
        before: ['موقع «زوروا الأحساء» موقع معلوماتي في المقام الأول، ولا يشترط التسجيل أو إنشاء حساب لتصفح محتواه. ومع ذلك، قد نجمع الفئات التالية من البيانات:'],
        list: [
          'بيانات تقنية تُجمع تلقائيًا عند تصفح الموقع، مثل: عنوان بروتوكول الإنترنت (IP)، ونوع المتصفح ونظام التشغيل، والصفحات التي تمت زيارتها ومدة الزيارة، ومصدر الوصول إلى الموقع.',
          'بيانات الاستخدام والتحليلات المجمعة عبر خدمة Google Analytics وما يماثلها من أدوات تحليلية، وهي بيانات إحصائية مجهولة الهوية في الغالب تُستخدم لفهم أنماط التصفح.',
          'بيانات تقدمونها طوعًا عند التواصل معنا عبر البريد الإلكتروني أو نماذج الاتصال، مثل: الاسم، وعنوان البريد الإلكتروني، ومحتوى الرسالة.',
        ] },
      { h: '2. أغراض جمع البيانات واستخدامها',
        before: ['نستخدم البيانات المشار إليها أعلاه للأغراض المشروعة التالية حصرًا:'],
        list: [
          'تحسين محتوى الموقع وتجربة المستخدم بناءً على أنماط التصفح والاهتمامات العامة للزوار.',
          'قياس أداء الموقع وتحليل حركة الزيارات إحصائيًا لأغراض التطوير المستمر.',
          'الرد على الاستفسارات والرسائل الواردة من الزوار.',
          'حماية الموقع من إساءة الاستخدام والأنشطة الاحتيالية أو الضارة.',
        ],
        after: ['لا نبيع بياناتكم الشخصية ولا نؤجرها ولا نتاجر بها مع أي طرف ثالث بأي حال من الأحوال، ولا نشاركها إلا في الحدود اللازمة لتشغيل الأدوات التحليلية المذكورة، أو حين يُلزمنا النظام بالإفصاح عنها لجهة مختصة.'] },
      { h: '3. خدمة Google Analytics وملفات التتبع',
        before: ['يستخدم الموقع خدمة Google Analytics (بما في ذلك إصدار GA4) المقدمة من شركة Google لتحليل استخدام الموقع. تعتمد هذه الخدمة على ملفات تعريف الارتباط (Cookies) ووسائل تتبع مشابهة لجمع معلومات إحصائية عن الزيارات، وقد تُنقل هذه المعلومات إلى خوادم Google وتُخزن فيها. وتخضع معالجة Google لهذه البيانات لسياسة الخصوصية الخاصة بها. ويمكنكم الاطلاع على تفاصيل إدارة ملفات التتبع وخيارات التعطيل في «سياسة ملفات تعريف الارتباط» الواردة في القسم الرابع من هذه الوثيقة.'] },
      { h: '4. حقوق المستخدمين',
        before: ['وفقًا لنظام حماية البيانات الشخصية السعودي، تتمتعون بالحقوق التالية فيما يخص بياناتكم الشخصية:'],
        list: [
          'حق العلم: أن تعرفوا طبيعة البيانات التي نجمعها عنكم والغرض من جمعها وطريقة معالجتها.',
          'حق الوصول: طلب الاطلاع على بياناتكم الشخصية المتوفرة لدينا والحصول على نسخة منها.',
          'حق التصحيح: طلب تصحيح أي بيانات غير دقيقة أو غير مكتملة.',
          'حق الحذف (الإتلاف): طلب حذف بياناتكم الشخصية متى زالت الحاجة إليها أو سحبتم موافقتكم، ما لم يوجد مسوغ نظامي للاحتفاظ بها.',
          'حق سحب الموافقة: التراجع عن موافقتكم على معالجة بياناتكم في أي وقت، دون أن يؤثر ذلك على مشروعية المعالجة السابقة للسحب.',
        ],
        after: ['لممارسة أي من هذه الحقوق، يمكنكم التواصل معنا عبر قنوات الاتصال الرسمية للموقع، وسنستجيب لطلبكم خلال مدة معقولة وبما يتفق مع المتطلبات النظامية.'] },
      { h: '5. حماية البيانات ومدة الاحتفاظ بها',
        before: ['نطبق تدابير تقنية وتنظيمية مناسبة لحماية البيانات من الوصول غير المصرح به أو الإفصاح أو التعديل أو الإتلاف، ومن ذلك: تشفير الاتصال بالموقع عبر بروتوكول HTTPS، وتفعيل رؤوس الحماية الأمنية (Security Headers)، وتقييد الوصول إلى البيانات على من يحتاج إليها فقط. ولا نحتفظ بالبيانات الشخصية إلا للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، أو للمدة التي تقتضيها الأنظمة المعمول بها.'] },
      { h: '6. خصوصية القاصرين',
        before: ['لا يستهدف الموقع جمع بيانات شخصية ممن هم دون الثامنة عشرة عن قصد. وإذا تبين لنا أننا جمعنا بيانات من قاصر دون موافقة ولي أمره، فسنبادر إلى حذفها فور العلم بذلك.'] },
    ],
  },
  {
    n: 'ثانيًا', h: 'شروط الاستخدام',
    lead: 'تنظم هذه الشروط استخدامكم لموقع «زوروا الأحساء» وما يتضمنه من محتوى وخدمات. ويُعد دخولكم إلى الموقع واستخدامه قبولًا بهذه الشروط والتزامًا بها.',
    subs: [
      { h: '1. طبيعة الموقع والغرض منه',
        before: ['«زوروا الأحساء» موقع معلوماتي مستقل يهدف إلى التعريف بواحة الأحساء ومعالمها التراثية والطبيعية وفعالياتها الموسمية، وتقديم محتوى إرشادي وثقافي للزوار والمهتمين. والموقع ليس جهة حكومية، ولا يمثل أي هيئة رسمية، ولا يقدم خدمات حجز أو بيع مباشرة.'] },
      { h: '2. حقوق الملكية الفكرية',
        before: ['جميع محتويات الموقع — من نصوص ومقالات وسرود أدبية وصور وتصاميم وشعارات وخرائط تفاعلية وهوية بصرية وشيفرة برمجية — مملوكة لموقع «زوروا الأحساء» أو مرخصة له، ومحمية بموجب نظام حماية حقوق المؤلف السعودي والاتفاقيات الدولية ذات الصلة. ولا يجوز نسخها أو إعادة نشرها أو توزيعها أو تعديلها أو استغلالها تجاريًا دون إذن كتابي مسبق.'] },
      { h: '3. الاستخدام المسموح به',
        list: [
          'تصفح الموقع والاطلاع على محتواه للأغراض الشخصية وغير التجارية.',
          'مشاركة روابط صفحات الموقع عبر وسائل التواصل الاجتماعي أو غيرها، مع الإشارة إلى المصدر.',
          'الاقتباس المحدود من المحتوى لأغراض التعليم أو البحث أو النقد، وفق ما تجيزه الأنظمة، مع نسبة المحتوى إلى الموقع بوضوح.',
        ] },
      { h: '4. الاستخدام المحظور',
        before: ['يُحظر عليكم عند استخدام الموقع القيام بأي مما يلي:'],
        list: [
          'نسخ المحتوى أو الصور أو إعادة نشرها كليًا أو جزئيًا لأغراض تجارية دون إذن كتابي مسبق.',
          'استخدام الموقع في أي نشاط مخالف للأنظمة المعمول بها في المملكة العربية السعودية، ومنها نظام مكافحة الجرائم المعلوماتية.',
          'محاولة اختراق الموقع أو تعطيله أو الوصول غير المصرح به إلى أنظمته أو بياناته.',
          'استخدام برامج آلية (مثل Bots أو Scrapers) لاستخلاص المحتوى أو جمع البيانات بشكل ممنهج دون موافقة، ولا يشمل ذلك محركات البحث ووكلاء الإجابة والمساعدات الذكية التي يأذن لها ملف robots.txt بالزحف، في حدود ما يأذن به.',
          'انتحال صفة الموقع أو الإيحاء بوجود شراكة أو رعاية أو تأييد منه دون اتفاق موثق.',
          'نشر أو إرسال أي محتوى مسيء أو تشهيري أو مخالف للآداب العامة والقيم الإسلامية عبر أي من قنوات التواصل المرتبطة بالموقع.',
        ] },
      { h: '5. التعديلات وإيقاف الخدمة',
        before: ['يحتفظ الموقع بحقه في تعديل محتواه أو خدماته أو تعليقها أو إيقافها كليًا أو جزئيًا في أي وقت ودون إشعار مسبق، ولا يترتب على ذلك أي مسؤولية تجاه المستخدمين.'] },
      { h: '6. النظام الواجب التطبيق',
        before: ['تخضع هذه الشروط وتُفسر وفقًا للأنظمة المعمول بها في المملكة العربية السعودية، ويكون الاختصاص في أي نزاع ينشأ عنها للمحاكم والجهات القضائية المختصة في المملكة.'] },
    ],
  },
  {
    n: 'ثالثًا', h: 'إخلاء المسؤولية',
    lead: 'نبذل في «زوروا الأحساء» جهدًا كبيرًا لضمان دقة المعلومات المنشورة وحداثتها، غير أن طبيعة المحتوى السياحي والمعلوماتي تقتضي التنبيه إلى ما يلي:',
    subs: [
      { h: '1. دقة المعلومات وتحديثها',
        before: ['تُقدم المعلومات الواردة في الموقع — ومنها أوقات فتح المعالم والمواقع، وأسعار الدخول والخدمات، ومواعيد الفعاليات والمهرجانات الموسمية، وتفاصيل المطاعم والمقاهي وأماكن الإقامة — على سبيل الإرشاد العام، وهي عرضة للتغيير في أي وقت من قبل الجهات المشغلة لها دون علمنا. لذا فإن الموقع لا يضمن دقة هذه المعلومات أو اكتمالها أو حداثتها في كل حين، وننصح الزوار دائمًا بالتحقق منها مباشرة من الجهات الرسمية أو مشغلي المواقع والفعاليات قبل التخطيط للزيارة.'] },
      { h: '2. حدود المسؤولية',
        before: ['لا يتحمل موقع «زوروا الأحساء» ولا القائمون عليه أي مسؤولية عن:'],
        list: [
          'أي أضرار مباشرة أو غير مباشرة أو تبعية تنشأ عن استخدام الموقع أو الاعتماد على معلوماته.',
          'أي خسائر مالية أو تكاليف أو التزامات تترتب على قرارات اتُخذت بناءً على محتوى الموقع، كتغير الأسعار أو إلغاء الفعاليات أو إغلاق المعالم.',
          'جودة الخدمات المقدمة من الجهات والمنشآت المذكورة في الموقع، إذ إن ذكرها لا يُعد توصية ملزمة ولا ضمانًا لمستوى خدماتها.',
          'أي انقطاع في الوصول إلى الموقع أو أعطال تقنية أو أخطاء برمجية خارجة عن السيطرة المعقولة.',
        ] },
      { h: '3. المحتوى الإرشادي لا الاستشاري',
        before: ['المحتوى المنشور في الموقع محتوى تعريفي وإرشادي عام، ولا يُعد استشارة متخصصة من أي نوع. وعلى المستخدم بذل العناية الشخصية اللازمة والتحقق المستقل قبل اتخاذ أي قرار يستند إلى محتوى الموقع.'] },
      { h: '4. دليل المرشدين السياحيين',
        before: [GUIDES_DISCLAIMER.ar] },
    ],
  },
  {
    n: 'رابعًا', h: 'سياسة ملفات تعريف الارتباط (Cookies)',
    lead: 'توضح هذه السياسة ماهية ملفات تعريف الارتباط المستخدمة في موقع «زوروا الأحساء»، والغرض منها، وكيفية التحكم بها.',
    subs: [
      { h: '1. ما ملفات تعريف الارتباط؟',
        before: ['ملفات تعريف الارتباط (Cookies) ملفات نصية صغيرة تُخزن على جهازكم عند زيارة المواقع الإلكترونية، وتساعد الموقع على التعرف على جهازكم وتذكر بعض المعلومات عن زيارتكم، بما يحسن تجربة التصفح ويتيح تحليل أداء الموقع.'] },
      { h: '2. أنواع الملفات المستخدمة في الموقع',
        list: [
          'ملفات ضرورية للتشغيل: تلزم لعمل الموقع الأساسي وعرض صفحاته بشكل صحيح، ولا يمكن تعطيلها من خلال الموقع.',
          'ملفات تحليلية: تُستخدم عبر خدمة Google Analytics (GA4) لجمع إحصاءات مجهولة الهوية عن الزيارات، مثل عدد الزوار والصفحات الأكثر مشاهدة ومدة التصفح ومصادر الوصول، بهدف تطوير المحتوى وتحسين التجربة.',
          'ملفات الأداء والقياس التابعة لأدوات تحليلية مشابهة قد تُضاف مستقبلًا، وستُحدَّث هذه السياسة عند اعتمادها.',
        ],
        after: ['لا يستخدم الموقع حاليًا ملفات تعريف ارتباط إعلانية أو تسويقية لاستهداف الزوار.'] },
      { h: '3. خيارات التحكم والتعطيل',
        before: ['تملكون كامل الحرية في إدارة ملفات تعريف الارتباط أو تعطيلها من خلال الخيارات التالية:'],
        list: [
          'إعدادات المتصفح: تتيح جميع المتصفحات الحديثة (Chrome، Safari، Firefox، Edge) حذف ملفات تعريف الارتباط أو حظرها كليًا أو جزئيًا من خلال إعدادات الخصوصية.',
          'أداة إلغاء الاشتراك من Google Analytics: يمكنكم تثبيت الإضافة الرسمية Google Analytics Opt-out Browser Add-on لمنع مشاركة بيانات تصفحكم مع الخدمة.',
          'وضع التصفح الخاص: يحد استخدام وضع التصفح الخفي أو الخاص من تخزين ملفات التتبع على جهازكم.',
        ],
        after: ['يرجى العلم أن تعطيل بعض الملفات قد يؤثر على أداء بعض خصائص الموقع، دون أن يمنع الوصول إلى محتواه الأساسي.'] },
    ],
  },
  {
    n: 'خامسًا', h: 'سياسة حقوق الملكية الفكرية',
    subs: [
      { h: '1. بيان الملكية',
        before: ['جميع الحقوق محفوظة © لموقع «زوروا الأحساء» (visit-alahsa.com). يشمل ذلك — على سبيل المثال لا الحصر — النصوص والمقالات والسرود الأدبية والتاريخية، والصور الفوتوغرافية والمعالجة، والرسوم والتصاميم، والشعار والهوية البصرية (بما فيها شخصية البلبل أبيض الخدين)، والخرائط التفاعلية، وبنية الموقع وشيفرته البرمجية. وكل ما ورد في الموقع من محتوى مرخص من أطراف أخرى يبقى ملكًا لأصحابه ويُستخدم وفق تراخيصه.'] },
      { h: '2. نطاق الحماية',
        before: ['يتمتع محتوى الموقع بالحماية المقررة بموجب نظام حماية حقوق المؤلف في المملكة العربية السعودية والاتفاقيات الدولية التي تكون المملكة طرفًا فيها، ومنها اتفاقية برن لحماية المصنفات الأدبية والفنية. ويُعد أي استخدام غير مصرح به تعديًا يوجب المساءلة النظامية.'] },
      { h: '3. آلية الإبلاغ عن انتهاك الحقوق',
        before: ['إذا كنتم تعتقدون أن أي محتوى منشور في الموقع ينتهك حقوق ملكية فكرية تعود لكم أو لمن تمثلونهم، فنرجو إشعارنا عبر قنوات التواصل الرسمية للموقع، على أن يتضمن البلاغ ما يلي:'],
        list: [
          'تحديد المصنف محل الحق المدعى انتهاكه وصفة مقدم البلاغ (صاحب الحق أو وكيله).',
          'رابط المحتوى محل الاعتراض في الموقع ووصفه بدقة.',
          'ما يثبت ملكية الحق أو التفويض بالتصرف نيابة عن مالكه.',
          'بيانات التواصل مع مقدم البلاغ (الاسم، والبريد الإلكتروني).',
        ],
        after: ['سننظر في كل بلاغ جدي خلال مدة معقولة، وسنتخذ الإجراء المناسب — من تصحيح النسبة أو إزالة المحتوى — متى ثبتت صحة الادعاء، مع إشعار مقدم البلاغ بالنتيجة.'] },
      { h: '4. طلبات الترخيص والاستخدام',
        before: ['للراغبين في استخدام محتوى الموقع أو صوره لأغراض إعلامية أو تعليمية أو تجارية، يمكن التقدم بطلب ترخيص عبر قنوات التواصل الرسمية، وسيُنظر في كل طلب وفق طبيعته والغرض منه.'] },
    ],
  },
  {
    n: 'سادسًا', h: 'سياسة الروابط الخارجية',
    lead: 'قد يتضمن موقع «زوروا الأحساء» روابط تؤدي إلى مواقع إلكترونية أو تطبيقات أو منصات تديرها أطراف أخرى، مثل: مواقع الجهات الرسمية، ومنصات الحجز، وخرائط Google، وحسابات التواصل الاجتماعي، ومواقع الفعاليات والمنشآت السياحية. وتُدرج هذه الروابط تسهيلًا على الزوار وإثراءً للمحتوى فحسب.',
    subs: [
      { h: '1. حدود المسؤولية عن الروابط',
        list: [
          'إدراج أي رابط خارجي لا يعني بالضرورة تأييد الموقع لمحتوى الجهة المرتبطة أو ضمانه لخدماتها.',
          'لا يتحمل الموقع أي مسؤولية عن محتوى المواقع والتطبيقات الخارجية أو دقته أو مشروعيته أو تحديثه.',
          'لا يتحمل الموقع مسؤولية سياسات الخصوصية أو شروط الاستخدام أو ممارسات جمع البيانات لدى تلك الجهات، وننصح بمراجعة سياساتها قبل التعامل معها.',
          'أي تعامل مالي أو تعاقدي تجرونه مع جهة خارجية عبر رابط في الموقع يقع على مسؤوليتكم الكاملة وبينكم وبين تلك الجهة مباشرة.',
        ] },
      { h: '2. الإبلاغ عن الروابط المعطلة أو المخالفة',
        before: ['نحرص على مراجعة الروابط الخارجية دوريًا، ونرحب بإبلاغنا عن أي رابط معطل أو يؤدي إلى محتوى غير لائق أو مخالف، عبر قنوات التواصل الرسمية، وسنبادر إلى معالجته في أقرب وقت.'] },
    ],
  },
];

export const LEGAL_SECTIONS_EN: LegalSection[] = [
  {
    n: 'One', h: 'Privacy Policy',
    lead: "At Visit Al-Ahsa we place the utmost importance on our visitors' privacy, and we are committed to protecting their personal data according to best practices and in line with the Personal Data Protection Law of the Kingdom of Saudi Arabia. This policy explains the nature of the data we collect, how we use and protect it, and your rights regarding it.",
    subs: [
      { h: '1. Data we collect',
        before: ['Visit Al-Ahsa is primarily an informational site, and browsing its content requires no registration or account. Nevertheless, we may collect the following categories of data:'],
        list: [
          'Technical data collected automatically when you browse the site, such as: the Internet Protocol (IP) address, the browser and operating-system type, the pages visited and duration of the visit, and the source of access to the site.',
          'Usage and analytics data aggregated through Google Analytics and similar analytical tools — statistical data that is largely anonymous, used to understand browsing patterns.',
          'Data you provide voluntarily when contacting us by email or contact forms, such as: your name, email address and the content of your message.',
        ] },
      { h: '2. Purposes of collecting and using data',
        before: ['We use the data referred to above solely for the following legitimate purposes:'],
        list: [
          "Improving the site’s content and the user experience based on browsing patterns and visitors' general interests.",
          "Measuring the site’s performance and analysing visit traffic statistically for ongoing development.",
          'Responding to enquiries and messages received from visitors.',
          'Protecting the site from misuse and fraudulent or harmful activity.',
        ],
        after: ['We do not sell, rent or trade your personal data with any third party under any circumstances, and we share it only to the extent necessary to operate the analytical tools mentioned, or where the law requires us to disclose it to a competent authority.'] },
      { h: '3. Google Analytics and tracking files',
        before: ["The site uses Google Analytics (including the GA4 version) provided by Google to analyse use of the site. This service relies on cookies and similar tracking means to collect statistical information about visits, and this information may be transferred to and stored on Google’s servers. Google’s processing of this data is subject to its own privacy policy. You can find details on managing tracking files and opt-out options in the “Cookie Policy” set out in Section Four of this document."] },
      { h: '4. User rights',
        before: ['In accordance with the Saudi Personal Data Protection Law, you enjoy the following rights regarding your personal data:'],
        list: [
          'Right to be informed: to know the nature of the data we collect about you, the purpose of collecting it, and how it is processed.',
          'Right of access: to request access to your personal data held by us and to obtain a copy of it.',
          'Right to rectification: to request correction of any inaccurate or incomplete data.',
          'Right to erasure (destruction): to request deletion of your personal data once it is no longer needed or you withdraw your consent, unless there is a legal ground to retain it.',
          'Right to withdraw consent: to withdraw your consent to the processing of your data at any time, without affecting the lawfulness of processing prior to withdrawal.',
        ],
        after: ["To exercise any of these rights, you may contact us through the site’s official channels, and we will respond to your request within a reasonable period and in line with regulatory requirements."] },
      { h: '5. Data protection and retention period',
        before: ['We apply appropriate technical and organisational measures to protect data from unauthorised access, disclosure, alteration or destruction, including: encrypting the connection to the site via the HTTPS protocol, enabling security headers, and restricting access to data to those who need it only. We retain personal data only for the period necessary to achieve the purposes for which it was collected, or for the period required by the applicable regulations.'] },
      { h: '6. Minors’ privacy',
        before: ["The site does not knowingly collect personal data from those under eighteen. If we become aware that we have collected data from a minor without their guardian’s consent, we will move to delete it as soon as we learn of it."] },
    ],
  },
  {
    n: 'Two', h: 'Terms of Use',
    lead: 'These terms govern your use of Visit Al-Ahsa and the content and services it includes. Your access to and use of the site constitutes acceptance of and commitment to these terms.',
    subs: [
      { h: '1. Nature and purpose of the site',
        before: ['Visit Al-Ahsa is an independent informational site that aims to introduce the Al-Ahsa Oasis, its heritage and natural landmarks and its seasonal events, and to provide guidance and cultural content for visitors and those interested. The site is not a government body, does not represent any official authority, and does not provide direct booking or sales services.'] },
      { h: '2. Intellectual property rights',
        before: ['All the site’s contents — text, articles, literary narratives, images, designs, logos, interactive maps, visual identity and source code — are owned by or licensed to Visit Al-Ahsa, and are protected under the Saudi Copyright Law and the relevant international conventions. They may not be copied, republished, distributed, modified or exploited commercially without prior written permission.'] },
      { h: '3. Permitted use',
        list: [
          'Browsing the site and viewing its content for personal, non-commercial purposes.',
          'Sharing links to the site’s pages via social media or otherwise, with attribution to the source.',
          'Limited quotation of the content for education, research or criticism, as permitted by the regulations, with clear attribution of the content to the site.',
        ] },
      { h: '4. Prohibited use',
        before: ['When using the site, you are prohibited from doing any of the following:'],
        list: [
          'Copying content or images, or republishing them in whole or in part for commercial purposes without prior written permission.',
          'Using the site in any activity that violates the regulations in force in the Kingdom of Saudi Arabia, including the Anti-Cyber Crime Law.',
          'Attempting to hack or disrupt the site, or gain unauthorised access to its systems or data.',
          'Using automated programs (such as bots or scrapers) to extract content or collect data systematically without consent. This does not apply to search engines, answer engines or AI assistants that the site’s robots.txt permits to crawl, within the limits it sets.',
          'Impersonating the site or implying the existence of a partnership, sponsorship or endorsement from it without a documented agreement.',
          'Publishing or sending any offensive or defamatory content, or content that violates public morals and Islamic values, through any of the communication channels associated with the site.',
        ] },
      { h: '5. Amendments and service suspension',
        before: ['The site reserves the right to amend, suspend or discontinue its content or services, in whole or in part, at any time and without prior notice, with no resulting liability towards users.'] },
      { h: '6. Governing law',
        before: ['These terms are governed by and construed in accordance with the regulations in force in the Kingdom of Saudi Arabia, and jurisdiction over any dispute arising from them lies with the competent courts and judicial authorities in the Kingdom.'] },
    ],
  },
  {
    n: 'Three', h: 'Disclaimer',
    lead: 'At Visit Al-Ahsa we make considerable effort to ensure the accuracy and currency of the information published; however, the nature of tourism and informational content calls for noting the following:',
    subs: [
      { h: '1. Accuracy and updating of information',
        before: ['The information provided on the site — including opening hours of landmarks and sites, entry and service prices, dates of events and seasonal festivals, and details of restaurants, cafés and accommodation — is offered as general guidance and is subject to change at any time by the operating parties without our knowledge. The site therefore does not guarantee the accuracy, completeness or currency of this information at all times, and we always advise visitors to verify it directly with the official bodies or the operators of the sites and events before planning a visit.'] },
      { h: '2. Limits of liability',
        before: ['Neither Visit Al-Ahsa nor those running it bear any liability for:'],
        list: [
          'Any direct, indirect or consequential damages arising from use of the site or reliance on its information.',
          'Any financial losses, costs or obligations resulting from decisions taken based on the site’s content, such as price changes, event cancellations or landmark closures.',
          'The quality of services provided by the bodies and establishments mentioned on the site, as their mention is not a binding recommendation nor a guarantee of the level of their services.',
          'Any interruption in access to the site, technical failures or software errors beyond reasonable control.',
        ] },
      { h: '3. Guidance, not specialised advice',
        before: ['The content published on the site is general introductory and guidance content and does not constitute specialised advice of any kind. The user must exercise the necessary personal care and independent verification before taking any decision based on the site’s content.'] },
      { h: '4. Tour guides directory',
        before: [GUIDES_DISCLAIMER.en] },
    ],
  },
  {
    n: 'Four', h: 'Cookie Policy',
    lead: 'This policy explains the nature of the cookies used on Visit Al-Ahsa, their purpose, and how to control them.',
    subs: [
      { h: '1. What are cookies?',
        before: ['Cookies are small text files stored on your device when you visit websites; they help the site recognise your device and remember some information about your visit, improving the browsing experience and enabling analysis of the site’s performance.'] },
      { h: '2. Types of files used on the site',
        list: [
          'Files essential for operation: required for the basic functioning of the site and correct display of its pages; they cannot be disabled through the site.',
          'Analytical files: used via Google Analytics (GA4) to collect anonymous statistics about visits — such as the number of visitors, the most-viewed pages, browsing duration and sources of access — with the aim of developing content and improving the experience.',
          'Performance and measurement files belonging to similar analytical tools that may be added in future; this policy will be updated when they are adopted.',
        ],
        after: ['The site does not currently use advertising or marketing cookies to target visitors.'] },
      { h: '3. Control and disabling options',
        before: ['You have full freedom to manage or disable cookies through the following options:'],
        list: [
          'Browser settings: all modern browsers (Chrome, Safari, Firefox, Edge) allow you to delete or block cookies wholly or partly through the privacy settings.',
          'Google Analytics opt-out tool: you can install the official Google Analytics Opt-out Browser Add-on to prevent your browsing data being shared with the service.',
          'Private browsing mode: using incognito or private mode limits the storage of tracking files on your device.',
        ],
        after: ['Please note that disabling some files may affect the performance of certain site features, without preventing access to its basic content.'] },
    ],
  },
  {
    n: 'Five', h: 'Intellectual Property Policy',
    subs: [
      { h: '1. Ownership statement',
        before: ['All rights reserved © to Visit Al-Ahsa (visit-alahsa.com). This includes — by way of example, not limitation — texts, articles and literary and historical narratives; photographs and processed images; illustrations and designs; the logo and visual identity (including the white-eared bulbul character); interactive maps; and the site’s structure and source code. Any content on the site licensed from other parties remains the property of its owners and is used according to its licences.'] },
      { h: '2. Scope of protection',
        before: ['The site’s content enjoys the protection afforded under the Copyright Law of the Kingdom of Saudi Arabia and the international conventions to which the Kingdom is a party, including the Berne Convention for the Protection of Literary and Artistic Works. Any unauthorised use constitutes an infringement warranting legal accountability.'] },
      { h: '3. Reporting an infringement of rights',
        before: ['If you believe that any content published on the site infringes intellectual property rights belonging to you or those you represent, please notify us through the site’s official channels, provided that the report includes the following:'],
        list: [
          'Identification of the work in which the allegedly infringed right subsists, and the capacity of the reporter (rights holder or their agent).',
          'The link to the content objected to on the site and an accurate description of it.',
          'Proof of ownership of the right, or authorisation to act on behalf of its owner.',
          'Contact details of the reporter (name and email).',
        ],
        after: ['We will consider every serious report within a reasonable period, and take the appropriate action — from correcting the attribution to removing the content — where the claim is proven valid, and notify the reporter of the outcome.'] },
      { h: '4. Licensing and use requests',
        before: ['Those wishing to use the site’s content or images for media, educational or commercial purposes may submit a licensing request through the official channels, and each request will be considered according to its nature and purpose.'] },
    ],
  },
  {
    n: 'Six', h: 'External Links Policy',
    lead: 'Visit Al-Ahsa may contain links leading to websites, applications or platforms operated by other parties, such as: official bodies’ sites, booking platforms, Google Maps, social media accounts, and the sites of events and tourism establishments. These links are provided merely to facilitate matters for visitors and to enrich the content.',
    subs: [
      { h: '1. Limits of liability for links',
        list: [
          'The inclusion of any external link does not necessarily mean the site endorses the linked party’s content or guarantees its services.',
          'The site bears no liability for the content of external sites and applications, or its accuracy, legality or currency.',
          'The site bears no liability for the privacy policies, terms of use or data-collection practices of those parties, and we advise reviewing their policies before dealing with them.',
          'Any financial or contractual dealing you conduct with an external party via a link on the site is entirely your responsibility and directly between you and that party.',
        ] },
      { h: '2. Reporting broken or non-compliant links',
        before: ['We are keen to review external links periodically, and we welcome reports of any broken link or one leading to inappropriate or non-compliant content, through the official channels, and we will move to address it as soon as possible.'] },
    ],
  },
];

// خط zh-translation-pipeline (المرحلة هـ، 2026-09-26) — بنية LEGAL_SECTIONS_EN نفسها، والعربية الأصل المعتمد.
export const LEGAL_SECTIONS_ZH: LegalSection[] = [
  {
    n: "一", h: "隐私政策",
    lead: "游览哈萨高度重视访客隐私，并按照最佳实践，依据沙特阿拉伯王国《个人数据保护法》的规定，致力于保护访客的个人数据。本政策说明我们所收集数据的性质、使用与保护方式，以及您在此方面享有的权利。",
    subs: [
      { h: "1. 我们收集的数据",
        before: [
          "游览哈萨主要是一个信息性网站，浏览其内容无需注册或创建账户。尽管如此，我们可能会收集以下类别的数据：",
        ],
        list: [
          "浏览本网站时自动收集的技术数据，例如：互联网协议（IP）地址、浏览器与操作系统类型、访问的页面及停留时长，以及访问本网站的来源。",
          "通过 Google Analytics 及类似分析工具汇总的使用与分析数据——这些数据大多为匿名统计数据，用于了解浏览模式。",
          "您通过电子邮件或联系表单主动联系我们时自愿提供的数据，例如：姓名、电子邮箱地址及消息内容。",
        ] },
      { h: "2. 数据收集与使用目的",
        before: [
          "我们仅将上述数据用于以下合法目的：",
        ],
        list: [
          "根据浏览模式及访客的一般兴趣改善网站内容与用户体验。",
          "衡量网站表现，并对访问流量进行统计分析，以持续改进。",
          "回复访客提出的咨询与消息。",
          "保护本网站免受滥用及欺诈性或有害活动的侵害。",
        ],
        after: [
          "在任何情况下，我们均不会向任何第三方出售、出租或交易您的个人数据，仅在运营上述分析工具所必需的范围内共享数据，或在法律要求我们向主管机关披露时共享。",
        ] },
      { h: "3. Google Analytics 服务与跟踪文件",
        before: [
          "本网站使用 Google 提供的 Google Analytics 服务（包括 GA4 版本）来分析网站使用情况。该服务依赖 Cookie 及类似跟踪手段收集有关访问情况的统计信息，这些信息可能被传输至 Google 服务器并存储于其中。Google 对这些数据的处理受其自身隐私政策约束。您可在本文件第四部分“Cookie 政策”中查阅有关跟踪文件管理及退出选项的详细信息。",
        ] },
      { h: "4. 用户权利",
        before: [
          "根据沙特阿拉伯王国《个人数据保护法》，您就您的个人数据享有以下权利：",
        ],
        list: [
          "知情权：了解我们收集的有关您的数据的性质、收集目的及处理方式。",
          "查阅权：请求查阅我们所持有的您的个人数据，并获取其副本。",
          "更正权：请求更正任何不准确或不完整的数据。",
          "删除权（销毁）：在不再需要您的个人数据或您撤回同意时，请求删除该数据，但存在法律依据需保留的除外。",
          "撤回同意权：随时撤回您对数据处理的同意，且不影响撤回前处理行为的合法性。",
        ],
        after: [
          "如需行使上述任何权利，您可通过本网站的官方联系渠道与我们联系，我们将在合理期限内并依据监管要求回复您的请求。",
        ] },
      { h: "5. 数据保护与保留期限",
        before: [
          "我们采取适当的技术与组织措施，保护数据免遭未经授权的访问、披露、篡改或销毁，包括：通过 HTTPS 协议对网站连接进行加密、启用安全防护标头（Security Headers），并将数据访问权限限制在确有需要的人员范围内。我们仅在实现数据收集目的所需的期限内，或适用法规所要求的期限内保留个人数据。",
        ] },
      { h: "6. 未成年人隐私",
        before: [
          "本网站不会故意收集十八岁以下人士的个人数据。如我们发现在未经监护人同意的情况下收集了未成年人的数据，将在获悉后立即着手删除。",
        ] },
    ],
  },
  {
    n: "二", h: "使用条款",
    lead: "本条款规范您对游览哈萨及其所含内容与服务的使用。您访问并使用本网站，即表示接受并承诺遵守本条款。",
    subs: [
      { h: "1. 网站的性质与宗旨",
        before: [
          "游览哈萨是一个独立的信息类网站，旨在介绍哈萨绿洲及其遗产与自然景观、季节性活动，并为游客与相关人士提供指南性与文化性内容。本网站并非政府机构，不代表任何官方部门，也不提供直接预订或销售服务。",
        ] },
      { h: "2. 知识产权",
        before: [
          "本网站的全部内容——包括文字、文章、文学叙述、图片、设计、标识、互动地图、视觉识别系统及源代码——均为游览哈萨所有或已获其许可使用，并受沙特阿拉伯《版权保护法》及相关国际公约保护。未经事先书面许可，不得复制、再次发布、传播、修改或用于商业开发。",
        ] },
      { h: "3. 允许的使用",
        list: [
          "出于个人及非商业目的浏览本网站并查阅其内容。",
          "通过社交媒体或其他方式分享本网站页面的链接，并注明来源。",
          "在相关法规允许的范围内，出于教育、研究或评论目的有限引用内容，并明确将内容注明来源于本网站。",
        ] },
      { h: "4. 禁止的使用",
        before: [
          "您在使用本网站时，禁止从事以下任何行为：",
        ],
        list: [
          "未经事先书面许可，复制内容或图片，或将其全部或部分再次发布用于商业目的。",
          "将本网站用于任何违反沙特阿拉伯王国现行法规的活动，包括《反网络犯罪法》。",
          "试图入侵或破坏本网站，或未经授权访问其系统或数据。",
          "在未经本网站同意的情况下，使用自动化程序（如 Bots 或 Scrapers）系统性地提取内容或收集数据，但搜索引擎、答案引擎或 AI 助手经本网站 robots.txt 文件允许，在该文件许可的范围内进行抓取的除外。",
          "冒充本网站，或在没有书面协议的情况下暗示与本网站存在合作、赞助或背书关系。",
          "通过与本网站相关的任何通信渠道发布或发送任何冒犯性、诽谤性或违反公序良俗及伊斯兰价值观的内容。",
        ] },
      { h: "5. 修改与服务中止",
        before: [
          "本网站保留随时且无需事先通知，全部或部分修改、暂停或终止其内容或服务的权利，且由此不对用户承担任何责任。",
        ] },
      { h: "6. 适用法律",
        before: [
          "本条款受沙特阿拉伯王国现行法规管辖并据此解释，因本条款产生的任何争议均由沙特阿拉伯王国境内有管辖权的法院及司法机关管辖。",
        ] },
    ],
  },
  {
    n: "三", h: "免责声明",
    lead: "游览哈萨在此作出较大努力，以确保所发布信息的准确性与时效性；但鉴于旅游及信息类内容的性质，仍须提请注意以下事项：",
    subs: [
      { h: "1. 信息的准确性与更新",
        before: [
          "本网站提供的信息——包括景点及场所的开放时间、门票及服务价格、活动与季节性节庆的日期，以及餐厅、咖啡馆和住宿场所的详情——仅作一般性指引之用，运营方可能在我们不知情的情况下随时予以变更。因此，本网站不保证这些信息在任何时候均准确、完整或为最新，我们始终建议游客在规划出行前，直接向相关官方机构或场所与活动的运营方核实。",
        ] },
      { h: "2. 责任限制",
        before: [
          "游览哈萨及其管理者对以下事项不承担任何责任：",
        ],
        list: [
          "因使用本网站或依赖其信息而产生的任何直接、间接或后果性损害。",
          "因根据本网站内容所作决定而导致的任何经济损失、费用或义务，如价格变动、活动取消或景点关闭。",
          "本网站提及的机构与场所所提供服务的质量：提及本身并不构成有约束力的推荐，也不构成对其服务水准的任何保证。",
          "任何超出合理控制范围的网站访问中断、技术故障或软件错误。",
        ] },
      { h: "3. 指南性内容，非专业建议",
        before: [
          "本网站发布的内容为一般性介绍与指南性内容，不构成任何形式的专业建议。用户在依据本网站内容作出任何决定之前，应尽必要的个人审慎义务并独立核实。",
        ] },
    ],
  },
  {
    n: "四", h: "Cookie 政策",
    lead: "本政策说明游览哈萨所使用 Cookie 的性质、用途及控制方式。",
    subs: [
      { h: "1. 什么是 Cookie？",
        before: [
          "Cookie 是您访问网站时存储在设备上的小型文本文件，可帮助网站识别您的设备并记住有关您本次访问的部分信息，从而改善浏览体验并支持对网站性能的分析。",
        ] },
      { h: "2. 网站使用的文件类型",
        list: [
          "运营必需文件：网站基本运行及页面正常显示所必需，无法通过网站关闭。",
          "分析类文件：通过 Google Analytics（GA4）收集有关访问的匿名统计数据，例如访客人数、浏览量最高的页面、浏览时长及访问来源，旨在改进内容并提升体验。",
          "属于日后可能新增的同类分析工具的性能与统计文件；采用此类工具时将相应更新本政策。",
        ],
        after: [
          "网站目前不使用用于定向访客的广告类或营销类 Cookie。",
        ] },
      { h: "3. 控制与关闭方式",
        before: [
          "您可通过以下方式自由管理或关闭 Cookie：",
        ],
        list: [
          "浏览器设置：所有主流浏览器（Chrome、Safari、Firefox、Edge）均可通过隐私设置全部或部分删除或屏蔽 Cookie。",
          "Google Analytics 停用工具：您可安装官方的 Google Analytics Opt-out Browser Add-on，以阻止您的浏览数据与该服务共享。",
          "隐私浏览模式：使用无痕或隐私模式可减少跟踪类文件在您设备上的存储。",
        ],
        after: [
          "请注意，关闭部分文件可能影响网站某些功能的表现，但不会妨碍您访问其基本内容。",
        ] },
    ],
  },
  {
    n: "五", h: "知识产权政策",
    subs: [
      { h: "1. 所有权声明",
        before: [
          "版权所有 © 归游览哈萨（visit-alahsa.com）所有，包括但不限于：文字、文章及文学与历史叙述；摄影作品及经处理的图片；插图与设计；标志与视觉识别（含白耳鹎形象）；互动地图；以及网站结构与源代码。网站中经授权自其他方获得的内容仍归其所有者所有，并依其授权条款使用。",
        ] },
      { h: "2. 保护范围",
        before: [
          "网站内容受沙特阿拉伯王国《版权保护法》及王国所加入的国际公约保护，包括《保护文学和艺术作品伯尔尼公约》。任何未经授权的使用均构成侵权，须承担相应法律责任。",
        ] },
      { h: "3. 侵权举报机制",
        before: [
          "如您认为网站发布的任何内容侵犯了您本人或您所代表方的知识产权，请通过网站官方渠道告知我们，举报内容须包含以下事项：",
        ],
        list: [
          "指明被主张侵权的作品，并说明举报人身份（权利人本人或其代理人）。",
          "网站中被投诉内容的链接及其准确描述。",
          "证明权利归属的材料，或代表权利人行事的授权证明。",
          "举报人的联系方式（姓名及电子邮箱）。",
        ],
        after: [
          "我们将在合理期限内审核每一份认真提交的举报；如举报被证实成立，将视情况采取更正署名、删除内容等适当措施，并将处理结果告知举报人。",
        ] },
      { h: "4. 授权与使用申请",
        before: [
          "如需将网站内容或图片用于媒体、教育或商业用途，可通过官方渠道提交授权申请，我们将根据申请的性质与用途逐一审核。",
        ] },
    ],
  },
  {
    n: "六", h: "外部链接政策",
    lead: "游览哈萨可能包含指向其他方运营的网站、应用程序或平台的链接，例如：官方机构网站、预订平台、谷歌地图、社交媒体账号，以及活动和旅游场所的网站。此类链接仅为方便访客并丰富内容而设置。",
    subs: [
      { h: "1. 链接责任限制",
        list: [
          "网站列入任何外部链接，并不必然意味着认可该链接方的内容或保证其服务。",
          "网站对外部网站及应用程序的内容及其准确性、合法性或时效性不承担任何责任。",
          "网站对该等第三方的隐私政策、使用条款或数据收集做法不承担责任，建议您在与其互动前先查阅其相关政策。",
          "您通过网站链接与外部方进行的任何财务或合同往来，均由您自行承担全部责任，并直接发生在您与该方之间。",
        ] },
      { h: "2. 举报失效或违规链接",
        before: [
          "我们注重定期审查外部链接，欢迎您通过官方渠道举报任何失效链接或指向不当或违规内容的链接，我们将尽快处理。",
        ] },
    ],
  },
];

// خط de-translation-pipeline (المرحلة هـ، 2026-09-26) — بنية LEGAL_SECTIONS_EN نفسها، والعربية الأصل المعتمد.
export const LEGAL_SECTIONS_DE: LegalSection[] = [
  {
    n: "Erstens", h: "Datenschutzrichtlinie",
    lead: "Bei Visit Al-Ahsa legen wir größten Wert auf die Privatsphäre unserer Besucher und verpflichten uns, ihre personenbezogenen Daten nach bewährten Verfahren und im Einklang mit dem Gesetz zum Schutz personenbezogener Daten des Königreichs Saudi-Arabien zu schützen. Diese Richtlinie erläutert die Art der von uns erhobenen Daten, wie wir sie nutzen und schützen, sowie Ihre diesbezüglichen Rechte.",
    subs: [
      { h: "1. Von uns erhobene Daten",
        before: [
          "Visit Al-Ahsa ist in erster Linie eine informative Website: Sie können ihre Inhalte durchsuchen, ohne sich zu registrieren oder ein Konto anzulegen. Dennoch können wir folgende Datenkategorien erheben:",
        ],
        list: [
          "Technische Daten, die automatisch bei der Nutzung der Website erhoben werden, wie zum Beispiel: die Internetprotokoll-Adresse (IP-Adresse), der Browser- und Betriebssystemtyp, die besuchten Seiten und die Dauer des Besuchs sowie die Zugriffsquelle zur Website.",
          "Nutzungs- und Analysedaten, die über Google Analytics und ähnliche Analysetools erhoben werden – größtenteils anonyme statistische Daten, die zum Verständnis der Nutzungsmuster dienen.",
          "Freiwillig von Ihnen bereitgestellte Daten bei der Kontaktaufnahme per E-Mail oder Kontaktformular, wie zum Beispiel: Ihr Name, Ihre E-Mail-Adresse und der Inhalt Ihrer Nachricht.",
        ] },
      { h: "2. Zwecke der Datenerhebung und -nutzung",
        before: [
          "Wir nutzen die oben genannten Daten ausschließlich für folgende rechtmäßige Zwecke:",
        ],
        list: [
          "Verbesserung der Inhalte der Website und der Nutzererfahrung auf Grundlage der Nutzungsmuster und allgemeinen Interessen der Besucher.",
          "Messung der Leistung der Website und statistische Analyse des Besucherverkehrs zur fortlaufenden Weiterentwicklung.",
          "Beantwortung von Anfragen und Nachrichten der Besucher.",
          "Schutz der Website vor Missbrauch sowie betrügerischen oder schädlichen Aktivitäten.",
        ],
        after: [
          "Wir verkaufen, vermieten oder tauschen Ihre personenbezogenen Daten unter keinen Umständen mit Dritten und geben sie nur in dem Umfang weiter, der zum Betrieb der genannten Analysetools erforderlich ist, oder wenn das Gesetz uns zur Offenlegung gegenüber einer zuständigen Behörde verpflichtet.",
        ] },
      { h: "3. Google Analytics und Tracking-Dateien",
        before: [
          "Die Website nutzt den von Google bereitgestellten Dienst Google Analytics (einschließlich der Version GA4) zur Analyse der Websitenutzung. Dieser Dienst stützt sich auf Cookies und ähnliche Tracking-Mittel, um statistische Informationen über Besuche zu erheben, und diese Informationen können an Server von Google übertragen und dort gespeichert werden. Die Verarbeitung dieser Daten durch Google unterliegt deren eigener Datenschutzrichtlinie. Einzelheiten zur Verwaltung von Tracking-Dateien und zu Deaktivierungsmöglichkeiten finden Sie in der „Cookie-Richtlinie“ im vierten Abschnitt dieses Dokuments.",
        ] },
      { h: "4. Rechte der Nutzer",
        before: [
          "Gemäß dem saudischen Gesetz zum Schutz personenbezogener Daten stehen Ihnen in Bezug auf Ihre personenbezogenen Daten die folgenden Rechte zu:",
        ],
        list: [
          "Recht auf Information: zu erfahren, welche Art von Daten wir über Sie erheben, zu welchem Zweck sie erhoben werden und wie sie verarbeitet werden.",
          "Recht auf Zugang: Zugang zu Ihren bei uns gespeicherten personenbezogenen Daten zu beantragen und eine Kopie davon zu erhalten.",
          "Recht auf Berichtigung: die Berichtigung unrichtiger oder unvollständiger Daten zu beantragen.",
          "Recht auf Löschung (Vernichtung): die Löschung Ihrer personenbezogenen Daten zu beantragen, sobald sie nicht mehr benötigt werden oder Sie Ihre Einwilligung widerrufen, sofern kein rechtlicher Grund für deren Aufbewahrung besteht.",
          "Recht auf Widerruf der Einwilligung: Ihre Einwilligung zur Verarbeitung Ihrer Daten jederzeit zu widerrufen, ohne dass dies die Rechtmäßigkeit der vor dem Widerruf erfolgten Verarbeitung berührt.",
        ],
        after: [
          "Um eines dieser Rechte auszuüben, können Sie uns über die offiziellen Kontaktkanäle der Website kontaktieren, und wir werden innerhalb einer angemessenen Frist und im Einklang mit den regulatorischen Anforderungen auf Ihre Anfrage reagieren.",
        ] },
      { h: "5. Datenschutz und Aufbewahrungsfrist",
        before: [
          "Wir wenden angemessene technische und organisatorische Maßnahmen an, um Daten vor unbefugtem Zugriff, Offenlegung, Veränderung oder Vernichtung zu schützen: Wir verschlüsseln die Verbindung zur Website über das HTTPS-Protokoll, aktivieren Sicherheits-Header und beschränken den Datenzugriff auf Personen, die ihn benötigen. Personenbezogene Daten bewahren wir nur so lange auf, wie es zur Erreichung der Zwecke erforderlich ist, für die sie erhoben wurden, oder so lange, wie es die geltenden Vorschriften vorschreiben.",
        ] },
      { h: "6. Privatsphäre Minderjähriger",
        before: [
          "Die Website erhebt nicht wissentlich personenbezogene Daten von Personen unter achtzehn Jahren. Sollten wir feststellen, dass wir Daten eines Minderjährigen ohne die Einwilligung seines Erziehungsberechtigten erhoben haben, werden wir diese unverzüglich nach Kenntnisnahme löschen.",
        ] },
    ],
  },
  {
    n: "Zweitens", h: "Nutzungsbedingungen",
    lead: "Diese Bedingungen regeln, wie Sie Visit Al-Ahsa sowie die darauf enthaltenen Inhalte und Dienste nutzen. Wenn Sie auf die Website zugreifen und sie nutzen, akzeptieren Sie diese Bedingungen und verpflichten sich zu ihrer Einhaltung.",
    subs: [
      { h: "1. Art und Zweck der Website",
        before: [
          "Visit Al-Ahsa ist eine unabhängige Informationswebsite. Sie stellt die Al-Ahsa-Oase, ihr Erbe, ihre Naturdenkmäler und ihre saisonalen Veranstaltungen vor und bietet Besuchern und Interessierten Informationen zur Orientierung sowie kulturelle Inhalte. Die Website ist keine Regierungsstelle, vertritt keine offizielle Behörde und bietet keine direkten Buchungs- oder Verkaufsdienste an.",
        ] },
      { h: "2. Rechte des geistigen Eigentums",
        before: [
          "Sämtliche Inhalte der Website – Texte, Artikel, literarische Erzählungen, Bilder, Designs, Logos, interaktive Karten, visuelle Identität und Quellcode – gehören Visit Al-Ahsa oder wurden ihr lizenziert und sind durch das saudische Urheberrechtsgesetz sowie die einschlägigen internationalen Übereinkommen geschützt. Sie dürfen ohne vorherige schriftliche Genehmigung weder kopiert noch erneut veröffentlicht, verbreitet, verändert oder kommerziell verwertet werden.",
        ] },
      { h: "3. Erlaubte Nutzung",
        list: [
          "Das Durchsuchen der Website und die Einsichtnahme ihrer Inhalte zu persönlichen, nicht kommerziellen Zwecken.",
          "Das Teilen von Links zu den Seiten der Website über soziale Medien oder anderweitig, mit Angabe der Quelle.",
          "Das begrenzte Zitieren des Inhalts zu Bildungs-, Forschungs- oder kritischen Zwecken, soweit dies nach den geltenden Vorschriften zulässig ist, mit eindeutiger Zuordnung des Inhalts zur Website.",
        ] },
      { h: "4. Untersagte Nutzung",
        before: [
          "Bei der Nutzung der Website ist Ihnen Folgendes untersagt:",
        ],
        list: [
          "Inhalte oder Bilder zu kopieren oder ganz oder teilweise zu kommerziellen Zwecken erneut zu veröffentlichen, ohne vorherige schriftliche Genehmigung.",
          "Die Website für Aktivitäten zu nutzen, die gegen die im Königreich Saudi-Arabien geltenden Vorschriften verstoßen, einschließlich des Gesetzes zur Bekämpfung von Internetkriminalität.",
          "Zu versuchen, die Website zu hacken oder zu stören oder sich unbefugten Zugang zu ihren Systemen oder Daten zu verschaffen.",
          "Automatisierte Programme (wie Bots oder Scraper) einzusetzen, um ohne Zustimmung Inhalte zu extrahieren oder systematisch Daten zu sammeln. Dieses Verbot gilt nicht für Suchmaschinen, Antwortmaschinen oder KI-Assistenten, soweit ihnen die robots.txt-Datei der Website das Crawlen gestattet.",
          "Sich als die Website auszugeben oder den Eindruck zu erwecken, es bestehe eine Partnerschaft, ein Sponsoring oder eine Billigung durch die Website, ohne dass eine dokumentierte Vereinbarung vorliegt.",
          "Beleidigende oder verleumderische Inhalte oder Inhalte, die gegen die öffentliche Sittlichkeit und islamische Werte verstoßen, über einen der Kommunikationskanäle der Website zu veröffentlichen oder zu versenden.",
        ] },
      { h: "5. Änderungen und Einstellung des Dienstes",
        before: [
          "Die Website behält sich das Recht vor, ihre Inhalte oder Dienste jederzeit und ohne vorherige Ankündigung ganz oder teilweise zu ändern, auszusetzen oder einzustellen, ohne dass sich daraus eine Haftung gegenüber den Nutzern ergibt.",
        ] },
      { h: "6. Anwendbares Recht",
        before: [
          "Diese Bedingungen unterliegen den im Königreich Saudi-Arabien geltenden Vorschriften und werden nach ihnen ausgelegt. Über jeden daraus entstehenden Streit entscheiden die zuständigen Gerichte und Justizbehörden im Königreich.",
        ] },
    ],
  },
  {
    n: "Drittens", h: "Haftungsausschluss",
    lead: "Bei Visit Al-Ahsa bemühen wir uns erheblich, die Genauigkeit und Aktualität der veröffentlichten Informationen zu gewährleisten; aufgrund der Natur touristischer und informativer Inhalte weisen wir jedoch auf Folgendes hin:",
    subs: [
      { h: "1. Genauigkeit und Aktualisierung der Informationen",
        before: [
          "Die auf der Website bereitgestellten Informationen – einschließlich der Öffnungszeiten von Sehenswürdigkeiten und Stätten, der Eintritts- und Servicepreise, der Termine von Veranstaltungen und saisonalen Festen sowie der Angaben zu Restaurants, Cafés und Unterkünften – werden als allgemeine Orientierung angeboten und können jederzeit von den jeweiligen Betreibern ohne unser Wissen geändert werden. Die Website übernimmt daher keine Gewähr für die Genauigkeit, Vollständigkeit oder Aktualität dieser Informationen zu jedem Zeitpunkt. Wir raten Besuchern stets, diese vor der Planung eines Besuchs direkt bei den offiziellen Stellen oder den Betreibern der Stätten und Veranstaltungen zu überprüfen.",
        ] },
      { h: "2. Haftungsgrenzen",
        before: [
          "Weder Visit Al-Ahsa noch die Betreiber der Website übernehmen eine Haftung für:",
        ],
        list: [
          "Jegliche unmittelbaren, mittelbaren oder Folgeschäden, die aus der Nutzung der Website oder dem Vertrauen auf ihre Informationen entstehen.",
          "Jegliche finanziellen Verluste, Kosten oder Verpflichtungen aufgrund von Entscheidungen, die auf Grundlage der Inhalte der Website getroffen wurden, wie Preisänderungen, Absagen von Veranstaltungen oder Schließungen von Sehenswürdigkeiten.",
          "Die Qualität der Dienstleistungen der auf der Website genannten Stellen und Einrichtungen, da deren Erwähnung weder eine verbindliche Empfehlung noch eine Garantie für das Niveau ihrer Dienstleistungen darstellt.",
          "Jegliche Unterbrechung des Zugangs zur Website, technische Störungen oder Softwarefehler, die außerhalb ihrer zumutbaren Kontrolle liegen.",
        ] },
      { h: "3. Orientierung, keine Fachberatung",
        before: [
          "Die auf der Website veröffentlichten Inhalte sind allgemeine einführende und orientierende Inhalte und stellen keine Fachberatung jeglicher Art dar. Der Nutzer hat die erforderliche persönliche Sorgfalt walten zu lassen und eine unabhängige Überprüfung vorzunehmen, bevor er eine Entscheidung auf Grundlage der Inhalte der Website trifft.",
        ] },
    ],
  },
  {
    n: "Viertens", h: "Cookie-Richtlinie",
    lead: "Diese Richtlinie erläutert die Art der auf Visit Al-Ahsa verwendeten Cookies, ihren Zweck und die Möglichkeiten, sie zu kontrollieren.",
    subs: [
      { h: "1. Was sind Cookies?",
        before: [
          "Cookies sind kleine Textdateien, die beim Besuch von Websites auf Ihrem Gerät gespeichert werden; sie helfen der Website, Ihr Gerät wiederzuerkennen und sich einige Informationen über Ihren Besuch zu merken, wodurch sich das Surferlebnis verbessert und sich die Leistung der Website analysieren lässt.",
        ] },
      { h: "2. Arten der auf der Website verwendeten Dateien",
        list: [
          "Für den Betrieb notwendige Dateien: erforderlich für die grundlegende Funktion der Website und die korrekte Anzeige ihrer Seiten; sie können nicht über die Website deaktiviert werden.",
          "Analytische Dateien: werden über Google Analytics (GA4) verwendet, um anonyme Statistiken über Besuche zu erfassen – etwa die Zahl der Besucher, die meistgesehenen Seiten, die Verweildauer und die Zugriffsquellen –, mit dem Ziel, den Inhalt weiterzuentwickeln und das Erlebnis zu verbessern.",
          "Leistungs- und Messdateien ähnlicher analytischer Tools, die künftig hinzugefügt werden können; diese Richtlinie wird bei ihrer Einführung aktualisiert.",
        ],
        after: [
          "Die Website verwendet derzeit keine Werbe- oder Marketing-Cookies zur Zielgruppenansprache der Besucher.",
        ] },
      { h: "3. Kontroll- und Deaktivierungsmöglichkeiten",
        before: [
          "Sie haben die volle Freiheit, Cookies über die folgenden Optionen zu verwalten oder zu deaktivieren:",
        ],
        list: [
          "Browsereinstellungen: Alle modernen Browser (Chrome, Safari, Firefox, Edge) ermöglichen es Ihnen, Cookies über die Datenschutzeinstellungen ganz oder teilweise zu löschen oder zu blockieren.",
          "Google-Analytics-Opt-out-Tool: Sie können das offizielle Google Analytics Opt-out Browser Add-on installieren, um zu verhindern, dass Ihre Browserdaten an den Dienst weitergegeben werden.",
          "Privater Browsermodus: Die Nutzung des Inkognito- oder privaten Modus schränkt die Speicherung von Tracking-Dateien auf Ihrem Gerät ein.",
        ],
        after: [
          "Bitte beachten Sie, dass die Deaktivierung einzelner Dateien die Leistung bestimmter Website-Funktionen beeinträchtigen kann, ohne den Zugang zu ihren grundlegenden Inhalten zu verhindern.",
        ] },
    ],
  },
  {
    n: "Fünftens", h: "Richtlinie zum geistigen Eigentum",
    subs: [
      { h: "1. Eigentumserklärung",
        before: [
          "Alle Rechte vorbehalten © Visit Al-Ahsa (visit-alahsa.com). Dies umfasst – beispielhaft und nicht abschließend – Texte, Artikel sowie literarische und historische Erzählungen; Fotografien und bearbeitete Bilder; Illustrationen und Designs; das Logo und die visuelle Identität (einschließlich der Figur des Weißohrbülbüls); interaktive Karten; sowie die Struktur und den Quellcode der Website. Jeglicher auf der Website enthaltene Inhalt, der von Dritten lizenziert wurde, bleibt Eigentum seiner jeweiligen Inhaber und wird gemäß deren Lizenzen genutzt.",
        ] },
      { h: "2. Umfang des Schutzes",
        before: [
          "Die Inhalte der Website genießen den Schutz, den das saudische Urheberrechtsgesetz sowie die internationalen Übereinkommen gewähren, denen das Königreich beigetreten ist, darunter die Berner Übereinkunft zum Schutz von Werken der Literatur und Kunst. Jede unbefugte Nutzung stellt eine Rechtsverletzung dar, die eine rechtliche Verantwortlichkeit begründet.",
        ] },
      { h: "3. Verfahren zur Meldung einer Rechtsverletzung",
        before: [
          "Wenn Sie der Ansicht sind, dass auf der Website veröffentlichte Inhalte Rechte des geistigen Eigentums verletzen, die Ihnen oder den von Ihnen Vertretenen zustehen, teilen Sie uns dies bitte über die offiziellen Kommunikationskanäle der Website mit; die Meldung sollte Folgendes enthalten:",
        ],
        list: [
          "Die Identifizierung des Werks, auf das sich das angeblich verletzte Recht bezieht, sowie die Eigenschaft der meldenden Person (Rechteinhaber oder dessen Vertreter).",
          "Den Link zu dem beanstandeten Inhalt auf der Website sowie dessen genaue Beschreibung.",
          "Einen Nachweis des Eigentums an dem Recht oder der Befugnis, im Namen des Rechteinhabers zu handeln.",
          "Kontaktdaten der meldenden Person (Name und E-Mail-Adresse).",
        ],
        after: [
          "Wir prüfen jede ernsthafte Meldung innerhalb einer angemessenen Frist und ergreifen die geeignete Maßnahme – von der Korrektur der Urheberangabe bis zur Entfernung des Inhalts –, sofern sich der Vorwurf als zutreffend erweist, und benachrichtigen die meldende Person über das Ergebnis.",
        ] },
      { h: "4. Anfragen zu Lizenzierung und Nutzung",
        before: [
          "Wer die Inhalte oder Bilder der Website für mediale, pädagogische oder kommerzielle Zwecke nutzen möchte, kann über die offiziellen Kommunikationskanäle einen Lizenzantrag stellen; jeder Antrag wird entsprechend seiner Art und seinem Zweck geprüft.",
        ] },
    ],
  },
  {
    n: "Sechstens", h: "Richtlinie zu externen Links",
    lead: "Visit Al-Ahsa kann Links enthalten, die zu Websites, Anwendungen oder Plattformen führen, die von anderen Parteien betrieben werden, wie etwa: Websites offizieller Stellen, Buchungsplattformen, Google Maps, Konten sozialer Medien sowie Websites von Veranstaltungen und touristischen Einrichtungen. Diese Links sollen den Besuchern lediglich das Zurechtfinden erleichtern und den Inhalt bereichern.",
    subs: [
      { h: "1. Grenzen der Haftung für Links",
        list: [
          "Die Aufnahme eines externen Links bedeutet nicht zwangsläufig, dass die Website die Inhalte der verlinkten Partei billigt oder deren Dienstleistungen garantiert.",
          "Die Website übernimmt keine Haftung für die Inhalte externer Websites und Anwendungen, deren Richtigkeit, Rechtmäßigkeit oder Aktualität.",
          "Die Website übernimmt keine Haftung für die Datenschutzrichtlinien, Nutzungsbedingungen oder Datenerhebungspraktiken dieser Parteien, und wir empfehlen, deren Richtlinien vor jeder Interaktion mit ihnen zu prüfen.",
          "Jede finanzielle oder vertragliche Transaktion, die Sie über einen Link auf der Website mit einer externen Partei tätigen, erfolgt vollständig auf Ihre eigene Verantwortung und unmittelbar zwischen Ihnen und dieser Partei.",
        ] },
      { h: "2. Meldung defekter oder unzulässiger Links",
        before: [
          "Wir sind bestrebt, externe Links regelmäßig zu überprüfen, und begrüßen Meldungen über defekte Links oder solche, die zu unangemessenen oder unzulässigen Inhalten führen, über die offiziellen Kommunikationskanäle, und wir werden uns bemühen, das Problem schnellstmöglich zu beheben.",
        ] },
    ],
  },
];

// خط ru-translation-pipeline (المرحلة هـ، 2026-09-26) — بنية LEGAL_SECTIONS_EN نفسها، والعربية الأصل المعتمد.
export const LEGAL_SECTIONS_RU: LegalSection[] = [
  {
    n: "Раздел первый", h: "Политика конфиденциальности",
    lead: "На сайте «Аль-Ахса» мы придаём первостепенное значение конфиденциальности наших посетителей и обязуемся защищать их персональные данные в соответствии с передовой практикой и Законом о защите персональных данных Королевства Саудовская Аравия. Настоящая политика разъясняет характер собираемых нами данных, порядок их использования и защиты, а также ваши права в отношении них.",
    subs: [
      { h: "1. Собираемые данные",
        before: [
          "Сайт «Аль-Ахса» — прежде всего информационный сайт, и для просмотра его содержимого не требуется регистрация или создание учётной записи. Тем не менее мы можем собирать следующие категории данных:",
        ],
        list: [
          "Технические данные, собираемые автоматически при просмотре сайта, в том числе: IP-адрес, тип браузера и операционной системы, посещённые страницы и продолжительность визита, а также источник перехода на сайт.",
          "Данные об использовании и аналитические данные, агрегируемые с помощью Google Analytics и аналогичных аналитических инструментов, — по большей части анонимные статистические данные, используемые для изучения моделей просмотра.",
          "Данные, предоставляемые вами добровольно при обращении к нам по электронной почте или через контактные формы, такие как: ваше имя, адрес электронной почты и содержание сообщения.",
        ] },
      { h: "2. Цели сбора и использования данных",
        before: [
          "Указанные выше данные мы используем исключительно в следующих законных целях:",
        ],
        list: [
          "Улучшение содержимого сайта и удобства использования на основе моделей просмотра и общих интересов посетителей.",
          "Измерение эффективности работы сайта и статистический анализ посещаемости в целях постоянного развития.",
          "Ответы на запросы и сообщения, поступающие от посетителей.",
          "Защита сайта от злоупотреблений, мошеннических и вредоносных действий.",
        ],
        after: [
          "Мы ни при каких обстоятельствах не продаём, не сдаём в аренду и не передаём в обмен ваши персональные данные какой-либо третьей стороне, а раскрываем их лишь в объёме, необходимом для работы упомянутых аналитических инструментов, либо когда закон обязывает нас раскрыть их компетентному органу.",
        ] },
      { h: "3. Google Analytics и файлы отслеживания",
        before: [
          "Сайт использует сервис Google Analytics (включая версию GA4), предоставляемый компанией Google, для анализа использования сайта. Этот сервис использует файлы cookie и аналогичные средства отслеживания для сбора статистической информации о посещениях, и эта информация может передаваться на серверы Google и храниться на них. Обработка этих данных компанией Google регулируется её собственной политикой конфиденциальности. Подробности об управлении файлами отслеживания и вариантах отказа вы найдёте в «Политике использования файлов cookie», изложенной в разделе четвёртом настоящего документа.",
        ] },
      { h: "4. Права пользователей",
        before: [
          "В соответствии с Законом о защите персональных данных Королевства Саудовская Аравия вы обладаете следующими правами в отношении ваших персональных данных:",
        ],
        list: [
          "Право на информирование: знать характер данных, которые мы собираем о вас, цель их сбора и порядок обработки.",
          "Право доступа: запрашивать доступ к вашим персональным данным, имеющимся у нас, и получать их копию.",
          "Право на исправление: требовать исправления любых неточных или неполных данных.",
          "Право на удаление (уничтожение): требовать удаления ваших персональных данных, когда необходимость в них отпадает или вы отзываете своё согласие, если только не существует законного основания для их хранения.",
          "Право на отзыв согласия: отозвать своё согласие на обработку ваших данных в любое время, что не влияет на законность обработки, произведённой до отзыва.",
        ],
        after: [
          "Чтобы воспользоваться любым из этих прав, вы можете обратиться к нам через официальные каналы связи сайта, и мы ответим на ваш запрос в разумный срок и в соответствии с нормативными требованиями.",
        ] },
      { h: "5. Защита данных и срок их хранения",
        before: [
          "Мы применяем надлежащие технические и организационные меры для защиты данных от несанкционированного доступа, раскрытия, изменения или уничтожения, включая: шифрование соединения с сайтом по протоколу HTTPS, применение заголовков безопасности (Security Headers) и ограничение доступа к данным только теми, кому нужен такой доступ. Мы храним персональные данные лишь в течение срока, необходимого для достижения целей, ради которых они были собраны, либо в течение срока, установленного применимыми нормативными актами.",
        ] },
      { h: "6. Конфиденциальность несовершеннолетних",
        before: [
          "Сайт сознательно не собирает персональные данные лиц младше восемнадцати лет. Если нам станет известно, что мы собрали данные несовершеннолетнего без согласия его законного представителя, мы примем меры к их удалению незамедлительно по получении такой информации.",
        ] },
    ],
  },
  {
    n: "Раздел второй", h: "Условия использования",
    lead: "Настоящие условия регулируют использование вами сайта «Аль-Ахса» и включённых в него содержания и услуг. Заходя на сайт и используя его, вы принимаете настоящие условия и обязуетесь их соблюдать.",
    subs: [
      { h: "1. Характер и назначение сайта",
        before: [
          "Сайт «Аль-Ахса» — независимый информационный сайт, цель которого — знакомить с оазисом Аль-Ахса, его культурными и природными памятниками и сезонными мероприятиями, а также давать посетителям и всем интересующимся справочный и культурный контент. Сайт не является государственным органом, не представляет какую-либо официальную инстанцию и не предоставляет услуг прямого бронирования или продажи.",
        ] },
      { h: "2. Права интеллектуальной собственности",
        before: [
          "Всё содержание сайта — тексты, статьи, литературные повествования, изображения, дизайны, логотипы, интерактивные карты, визуальная айдентика и исходный код — принадлежит сайту «Аль-Ахса» или используется им по лицензии и охраняется Законом об охране авторского права Королевства Саудовская Аравия и соответствующими международными конвенциями. Его запрещается копировать, повторно публиковать, распространять, изменять или использовать в коммерческих целях без предварительного письменного разрешения.",
        ] },
      { h: "3. Разрешённое использование",
        list: [
          "Просмотр сайта и ознакомление с его содержанием в личных, некоммерческих целях.",
          "Распространение ссылок на страницы сайта в социальных сетях или иным способом с указанием источника.",
          "Ограниченное цитирование содержания в целях образования, исследования или критики в пределах, допускаемых законодательством, с чётким указанием сайта как источника содержания.",
        ] },
      { h: "4. Запрещённое использование",
        before: [
          "При использовании сайта вам запрещается:",
        ],
        list: [
          "Копировать содержание или изображения либо повторно публиковать их полностью или частично в коммерческих целях без предварительного письменного разрешения.",
          "Использовать сайт в любой деятельности, которая нарушает нормы, действующие в Королевстве Саудовская Аравия, включая Закон о борьбе с преступлениями в сфере информационных технологий.",
          "Пытаться взломать сайт или нарушить его работу либо получить несанкционированный доступ к его системам или данным.",
          "Использовать автоматизированные программы (такие как боты или скраперы) для извлечения содержания или систематического сбора данных без согласия. Этот запрет не распространяется на поисковые системы, системы ответов и ИИ-ассистентов, если файл robots.txt сайта разрешает им сканирование (автоматический обход страниц), причём в пределах, установленных этим файлом.",
          "Выдавать себя за сайт или создавать впечатление о наличии партнёрства, спонсорства или одобрения с его стороны без документально оформленного соглашения.",
          "Публиковать или направлять любое оскорбительное или клеветническое содержание либо содержание, нарушающее общественную нравственность и исламские ценности, через любые каналы коммуникации, связанные с сайтом.",
        ] },
      { h: "5. Изменения и приостановление услуги",
        before: [
          "Сайт оставляет за собой право изменять, приостанавливать или прекращать своё содержание или услуги полностью или частично в любое время без предварительного уведомления, что не влечёт какой-либо ответственности перед пользователями.",
        ] },
      { h: "6. Применимое право",
        before: [
          "Настоящие условия регулируются законодательством Королевства Саудовская Аравия и толкуются в соответствии с ним, а любые споры, которые могут из них возникнуть, подсудны компетентным судам и судебным органам Королевства.",
        ] },
    ],
  },
  {
    n: "Раздел третий", h: "Отказ от ответственности",
    lead: "На сайте «Аль-Ахса» мы прилагаем значительные усилия, чтобы публикуемая информация была точной и актуальной; однако характер туристического и информационного содержания требует обратить внимание на следующее:",
    subs: [
      { h: "1. Точность информации и её обновление",
        before: [
          "Информация на сайте — включая часы работы достопримечательностей и объектов, цены на вход и услуги, даты мероприятий и сезонных фестивалей, а также сведения о ресторанах, кафе и местах размещения — приводится в качестве общего ориентира и может быть изменена в любое время операторами без нашего ведома. Поэтому сайт не гарантирует точность, полноту или актуальность этой информации во всякое время, и мы всегда рекомендуем посетителям уточнять её непосредственно у официальных органов или у операторов объектов и мероприятий перед планированием визита.",
        ] },
      { h: "2. Пределы ответственности",
        before: [
          "Ни сайт «Аль-Ахса», ни лица, управляющие им, не несут ответственности за:",
        ],
        list: [
          "Любой прямой, косвенный или последующий ущерб, возникший в результате использования сайта или доверия к его информации.",
          "Любые финансовые потери, расходы или обязательства, возникшие в результате решений, принятых на основании содержания сайта, такие как изменение цен, отмена мероприятий или закрытие достопримечательностей.",
          "Качество услуг, предоставляемых упомянутыми на сайте организациями и заведениями, поскольку их упоминание не выступает в качестве обязывающей рекомендации и не гарантирует уровень их услуг.",
          "Любые перебои в доступе к сайту, технические сбои или программные ошибки, находящиеся вне разумного контроля.",
        ] },
      { h: "3. Справочный, а не консультационный характер содержания",
        before: [
          "Содержание сайта носит общий ознакомительный и справочный характер и не представляет собой специализированную консультацию какого-либо рода. Пользователь обязан проявлять необходимую личную осмотрительность и проводить самостоятельную проверку перед принятием любого решения на основании содержания сайта.",
        ] },
    ],
  },
  {
    n: "Раздел четвёртый", h: "Политика использования файлов cookie",
    lead: "Настоящая политика разъясняет природу файлов cookie, используемых на сайте «Аль-Ахса», их назначение и способы управления ими.",
    subs: [
      { h: "1. Что такое файлы cookie?",
        before: [
          "Файлы cookie — небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении веб-сайтов; они помогают сайту распознавать ваше устройство и запоминать некоторые сведения о вашем визите, что улучшает удобство просмотра и позволяет анализировать эффективность работы сайта.",
        ] },
      { h: "2. Виды файлов, используемых на сайте",
        list: [
          "Файлы, необходимые для работы сайта: требуются для базового функционирования сайта и корректного отображения его страниц; их нельзя отключить через сам сайт.",
          "Аналитические файлы: используются через сервис Google Analytics (GA4), чтобы собирать анонимную статистику о посещениях — число посетителей, наиболее просматриваемые страницы, продолжительность просмотра и источники перехода на сайт — и развивать на этой основе контент и пользовательский опыт.",
          "Файлы производительности и измерений, относящиеся к аналогичным аналитическим инструментам, которые могут быть добавлены в будущем; настоящая политика будет обновлена при их внедрении.",
        ],
        after: [
          "Сайт пока не использует рекламные или маркетинговые файлы cookie для таргетирования посетителей.",
        ] },
      { h: "3. Способы управления и отключения",
        before: [
          "Вы вправе свободно управлять файлами cookie или отключать их с помощью следующих способов:",
        ],
        list: [
          "Настройки браузера: все современные браузеры (Chrome, Safari, Firefox, Edge) позволяют полностью или частично удалять или блокировать файлы cookie через настройки конфиденциальности.",
          "Инструмент отказа от Google Analytics: вы можете установить официальное расширение для браузера — Google Analytics Opt-out Browser Add-on, чтобы предотвратить передачу данных о вашем просмотре в этот сервис.",
          "Режим приватного просмотра: использование режима инкогнито или приватного просмотра ограничивает сохранение файлов отслеживания на вашем устройстве.",
        ],
        after: [
          "Обращаем ваше внимание: отключение некоторых файлов может повлиять на работу отдельных функций сайта, но не ограничивает доступ к его основному содержимому.",
        ] },
    ],
  },
  {
    n: "Раздел пятый", h: "Политика интеллектуальной собственности",
    subs: [
      { h: "1. Заявление о собственности",
        before: [
          "Все права защищены. © «Аль-Ахса» (visit-alahsa.com). Это включает — в качестве примера, а не исчерпывающего перечня, — тексты, статьи, а также литературные и исторические повествования; фотографии и обработанные изображения; иллюстрации и дизайны; логотип и визуальную идентичность (включая персонажа белоухого бюльбюля); интерактивные карты; а также структуру сайта и его исходный код. Любой контент на сайте, лицензированный у третьих сторон, остаётся собственностью его владельцев и используется в соответствии с условиями его лицензий.",
        ] },
      { h: "2. Объём охраны",
        before: [
          "Содержимое сайта пользуется охраной, предусмотренной Законом об охране авторского права Королевства Саудовская Аравия, а также международными конвенциями, участником которых является Королевство, включая Бернскую конвенцию об охране литературных и художественных произведений. Любое несанкционированное использование представляет собой нарушение, влекущее юридическую ответственность.",
        ] },
      { h: "3. Сообщение о нарушении прав",
        before: [
          "Если вы полагаете, что какой-либо контент, опубликованный на сайте, нарушает права интеллектуальной собственности, принадлежащие вам или тем, кого вы представляете, просим уведомить нас через официальные каналы связи сайта при условии, что сообщение будет содержать следующее:",
        ],
        list: [
          "Указание произведения, в отношении которого заявляется нарушение права, и статус заявителя (правообладатель либо его представитель).",
          "Ссылку на оспариваемый контент на сайте и его точное описание.",
          "Доказательство принадлежности права либо полномочие действовать от имени его владельца.",
          "Контактные данные заявителя (имя и адрес электронной почты).",
        ],
        after: [
          "Мы рассмотрим каждое добросовестное сообщение в разумный срок и примем соответствующие меры — от исправления указания авторства до удаления контента — если заявление окажется обоснованным, и уведомим заявителя о результате.",
        ] },
      { h: "4. Запросы на лицензирование и использование",
        before: [
          "Желающие использовать контент или изображения сайта в медийных, образовательных или коммерческих целях могут подать запрос на лицензирование через официальные каналы связи, и каждый запрос будет рассмотрен с учётом его характера и цели.",
        ] },
    ],
  },
  {
    n: "Раздел шестой", h: "Политика внешних ссылок",
    lead: "Сайт «Аль-Ахса» может содержать ссылки, ведущие на веб-сайты, приложения или платформы, управляемые другими сторонами, такие как: сайты официальных органов, платформы бронирования, Google Карты, аккаунты в социальных сетях, а также сайты мероприятий и туристических объектов. Эти ссылки размещаются исключительно для удобства посетителей и обогащения содержания.",
    subs: [
      { h: "1. Пределы ответственности за ссылки",
        list: [
          "Включение любой внешней ссылки не обязательно означает одобрение сайтом содержания связанной стороны или гарантию её услуг.",
          "Сайт не несёт ответственности за содержание внешних сайтов и приложений, а также за его точность, законность или актуальность.",
          "Сайт не несёт ответственности за политику конфиденциальности, условия использования или практику сбора данных этих сторон, и мы рекомендуем ознакомиться с их политиками до взаимодействия с ними.",
          "Любое финансовое или договорное взаимодействие, которое вы осуществляете с внешней стороной по ссылке на сайте, полностью относится к вашей ответственности и происходит непосредственно между вами и этой стороной.",
        ] },
      { h: "2. Сообщение о неработающих или несоответствующих ссылках",
        before: [
          "Мы стремимся периодически проверять внешние ссылки и приветствуем сообщения о любой неработающей ссылке или ссылке, ведущей к неприемлемому или несоответствующему содержанию, направленные через официальные каналы связи, и примем меры по её устранению в кратчайшие сроки.",
        ] },
    ],
  },
];

// الأوردية — خط ur-translation-pipeline (الدفعة ur-legal-1).
export const LEGAL_SECTIONS_UR: LegalSection[] = [
  {
    n: 'پہلا حصہ', h: 'رازداری کی پالیسی',
    lead: 'Visit Al-Ahsa میں ہم اپنے صارفین کی رازداری کو انتہائی اہمیت دیتے ہیں۔ ہم ان کے ذاتی ڈیٹا کی حفاظت بہترین عملی طریقوں اور مملکت سعودی عرب کے ذاتی ڈیٹا کے تحفظ کے قانون کے مطابق کرنے کے پابند ہیں۔ یہ پالیسی بتاتی ہے کہ ہم کس نوعیت کا ڈیٹا جمع کرتے ہیں، اسے کیسے استعمال کرتے اور اس کی حفاظت کرتے ہیں، اور اس کے بارے میں آپ کے کیا حقوق ہیں۔',
    subs: [
      { h: '1. ہم جو ڈیٹا جمع کرتے ہیں',
        before: [
          'Visit Al-Ahsa بنیادی طور پر معلوماتی ویب سائٹ ہے، اور اس کا مواد دیکھنے کے لیے اندراج یا اکاؤنٹ بنانا ضروری نہیں۔ اس کے باوجود ہم ڈیٹا کی درج ذیل اقسام جمع کر سکتے ہیں:',
        ],
        list: [
          'تکنیکی ڈیٹا جو ویب سائٹ دیکھتے وقت خودکار طور پر جمع ہو جاتا ہے، مثلاً: انٹرنیٹ پروٹوکول (IP) پتا، براؤزر اور آپریٹنگ سسٹم کی قسم، دیکھے گئے صفحات اور ویب سائٹ پر گزارا گیا وقت، اور یہ کہ آپ ویب سائٹ تک کس ذریعے سے پہنچے۔',
          'استعمال اور تجزیاتی ڈیٹا، جو گوگل اینالیٹکس (Google Analytics) اور اس جیسے تجزیاتی اوزار کے ذریعے یکجا کیا جاتا ہے۔ یہ بیشتر گمنام شماریاتی ڈیٹا ہوتا ہے جو ویب سائٹ دیکھنے کے رجحانات سمجھنے کے لیے استعمال ہوتا ہے۔',
          'وہ ڈیٹا جو آپ ہم سے ای میل یا رابطہ فارم کے ذریعے رابطہ کرتے وقت اپنی مرضی سے فراہم کرتے ہیں، مثلاً: آپ کا نام، ای میل پتا اور پیغام کا متن۔',
        ],
      },
      { h: '2. ڈیٹا جمع کرنے اور استعمال کرنے کے مقاصد',
        before: [
          'ہم مذکورہ بالا ڈیٹا کو صرف درج ذیل جائز مقاصد کے لیے استعمال کرتے ہیں:',
        ],
        list: [
          'ویب سائٹ دیکھنے کے رجحانات اور صارفین کی عمومی دلچسپیوں کی بنیاد پر اس کے مواد اور صارف کے تجربے کو بہتر بنانا۔',
          'ویب سائٹ کی کارکردگی جانچنا اور مسلسل ترقی کے لیے ویب سائٹ پر آمد و رفت کا شماریاتی تجزیہ کرنا۔',
          'صارفین کی طرف سے موصول ہونے والے استفسارات اور پیغامات کا جواب دینا۔',
          'ویب سائٹ کو غلط استعمال اور دھوکا دہی پر مبنی یا نقصان دہ سرگرمیوں سے محفوظ رکھنا۔',
        ],
        after: [
          'ہم آپ کا ذاتی ڈیٹا کسی بھی صورت میں کسی تیسرے فریق کو فروخت نہیں کرتے، کرائے پر نہیں دیتے اور نہ ہی اس کی تجارت کرتے ہیں۔ ہم اسے صرف اتنی حد تک دوسروں کے ساتھ بانٹتے ہیں جتنی مذکورہ تجزیاتی اوزار چلانے کے لیے ضروری ہو، یا جب قانون ہمیں کسی مجاز ادارے کے سامنے اس کے افشا کا پابند کرے۔',
        ],
      },
      { h: '3. Google Analytics اور ٹریکنگ فائلیں',
        before: [
          'یہ ویب سائٹ اپنے استعمال کا تجزیہ کرنے کے لیے گوگل کی فراہم کردہ خدمت Google Analytics (بشمول GA4) استعمال کرتی ہے۔ یہ خدمت کوکیز (Cookies) اور اسی طرح کے ٹریکنگ ذرائع پر انحصار کرتی ہے تاکہ ویب سائٹ دیکھے جانے کے بارے میں شماریاتی معلومات جمع کی جا سکیں، اور یہ معلومات گوگل کے سرورز پر منتقل اور محفوظ کی جا سکتی ہیں۔ گوگل اس ڈیٹا کی پراسیسنگ اپنی رازداری کی پالیسی کے تحت کرتا ہے۔ ٹریکنگ فائلوں کے انتظام اور انہیں بند کرنے کے اختیارات کی تفصیل آپ اس دستاویز کے چوتھے حصے میں دی گئی “کوکیز کی پالیسی” میں دیکھ سکتے ہیں۔',
        ],
      },
      { h: '4. صارفین کے حقوق',
        before: [
          'ذاتی ڈیٹا کے تحفظ کے سعودی قانون کے مطابق آپ کو اپنے ذاتی ڈیٹا کے بارے میں درج ذیل حقوق حاصل ہیں:',
        ],
        list: [
          'باخبر ہونے کا حق: یہ جاننا کہ ہم آپ کے بارے میں کس نوعیت کا ڈیٹا جمع کرتے ہیں، اسے جمع کرنے کا مقصد کیا ہے اور اس کی پراسیسنگ کیسے ہوتی ہے۔',
          'رسائی کا حق: ہمارے پاس موجود اپنے ذاتی ڈیٹا تک رسائی کی درخواست کرنا اور اس کی نقل حاصل کرنا۔',
          'درستی کا حق: کسی بھی غلط یا نامکمل ڈیٹا کی درستی کی درخواست کرنا۔',
          'مٹانے (تلف کرنے) کا حق: اپنا ذاتی ڈیٹا مٹانے کی درخواست کرنا، جب اس ڈیٹا کی ضرورت باقی نہ رہے یا آپ اپنی رضامندی واپس لے لیں، سوائے اس صورت کے جب اسے محفوظ رکھنے کا کوئی قانونی جواز ہو۔',
          'رضامندی واپس لینے کا حق: اپنے ڈیٹا کی پراسیسنگ کے لیے دی گئی رضامندی کسی بھی وقت واپس لینا۔ رضامندی واپس لینے کا واپسی سے پہلے کی گئی پراسیسنگ کے جائز ہونے پر کوئی اثر نہیں پڑتا۔',
        ],
        after: [
          'ان میں سے کوئی بھی حق استعمال کرنے کے لیے آپ ویب سائٹ کے باضابطہ رابطے کے ذرائع پر ہم سے رابطہ کر سکتے ہیں، اور ہم آپ کی درخواست کا جواب معقول مدت کے اندر اور قانونی تقاضوں کے مطابق دیں گے۔',
        ],
      },
      { h: '5. ڈیٹا کی حفاظت اور اسے رکھنے کی مدت',
        before: [
          'ہم ڈیٹا کو غیر مجاز رسائی، افشا، تبدیلی یا تلف سے بچانے کے لیے مناسب تکنیکی اور تنظیمی اقدامات کرتے ہیں، جن میں یہ شامل ہیں: ویب سائٹ سے جڑنے کے عمل کی HTTPS پروٹوکول کے ذریعے خفیہ کاری کرنا، حفاظتی ہیڈرز فعال کرنا، اور ڈیٹا تک رسائی صرف انہی لوگوں تک محدود رکھنا جنہیں اس کی ضرورت ہے۔ ہم ذاتی ڈیٹا کو صرف اتنی مدت تک محفوظ رکھتے ہیں جتنی اس کے جمع کرنے کے مقاصد کی تکمیل کے لیے ضروری ہو، یا اس مدت تک جس کا نافذ العمل قوانین تقاضا کریں۔',
        ],
      },
      { h: '6. نابالغوں کی رازداری',
        before: [
          'ویب سائٹ جان بوجھ کر اٹھارہ سال سے کم عمر افراد کا ذاتی ڈیٹا جمع نہیں کرتی۔ اگر ہمیں پتا چل جائے کہ ہم نے کسی نابالغ کا ڈیٹا اس کے سرپرست کی رضامندی کے بغیر جمع کر لیا ہے تو ہم اس بات کا علم ہوتے ہی یہ ڈیٹا مٹانے کی کارروائی کریں گے۔',
        ],
      },
    ],
  },
  {
    n: 'دوسرا حصہ', h: 'استعمال کی شرائط',
    lead: 'آپ جب Visit Al-Ahsa اور اس میں شامل مواد اور خدمات کو استعمال کرتے ہیں تو اس استعمال پر یہ شرائط لاگو ہوتی ہیں۔ ویب سائٹ تک رسائی اور اس کے استعمال کو ان شرائط کی قبولیت اور ان کی پابندی سمجھا جائے گا۔',
    subs: [
      { h: '1. ویب سائٹ کی نوعیت اور مقصد',
        before: [
          'Visit Al-Ahsa آزاد معلوماتی ویب سائٹ ہے جس کا مقصد الاحساء کے نخلستان، اس کے ورثے اور قدرتی مقامات، اور موسمی تقریبات کا تعارف کرانا، اور صارفین اور دلچسپی رکھنے والوں کے لیے رہنمائی اور ثقافتی مواد فراہم کرنا ہے۔ یہ ویب سائٹ کوئی حکومتی ادارہ نہیں، کسی سرکاری ادارے کی نمائندگی نہیں کرتی، اور براہ راست جگہ محفوظ کرانے یا فروخت کی خدمات فراہم نہیں کرتی۔',
        ],
      },
      { h: '2. دانشورانہ ملکیت کے حقوق',
        before: [
          'ویب سائٹ کے تمام مواد میں متن، مضامین، ادبی بیانیے، تصاویر، ڈیزائن، علامتی نشانات، تعاملی نقشے، بصری شناخت اور سورس کوڈ شامل ہیں۔ یہ سارا مواد Visit Al-Ahsa کی ملکیت ہے یا اسے اجازت نامے کے تحت حاصل ہے، اور کاپی رائٹ کے سعودی قانون اور متعلقہ بین الاقوامی معاہدوں کے تحت محفوظ ہے۔ پیشگی تحریری اجازت کے بغیر اسے نقل کرنا، دوبارہ شائع کرنا، تقسیم کرنا، اس میں تبدیلی کرنا یا اسے تجارتی طور پر استعمال کرنا جائز نہیں۔',
        ],
      },
      { h: '3. اجازت یافتہ استعمال',
        list: [
          'ذاتی اور غیر تجارتی مقاصد کے لیے ویب سائٹ دیکھنا اور اس کا مواد ملاحظہ کرنا۔',
          'سوشل میڈیا یا کسی اور ذریعے سے ویب سائٹ کے صفحات کے لنکس بانٹنا، ماخذ کے حوالے کے ساتھ۔',
          'تعلیم، تحقیق یا تنقید کے مقاصد کے لیے مواد سے محدود اقتباس لینا، جس حد تک قوانین اجازت دیں، اور مواد کو واضح طور پر ویب سائٹ سے منسوب کرنا۔',
        ],
      },
      { h: '4. ممنوعہ استعمال',
        before: [
          'ویب سائٹ کو استعمال کرتے وقت آپ کے لیے درج ذیل میں سے کوئی بھی عمل ممنوع ہے:',
        ],
        list: [
          'پیشگی تحریری اجازت کے بغیر مواد یا تصاویر کی نقل کرنا، یا انہیں مکمل یا جزوی طور پر تجارتی مقاصد کے لیے دوبارہ شائع کرنا۔',
          'ویب سائٹ کو ایسی کسی بھی سرگرمی میں استعمال کرنا جو مملکت سعودی عرب میں نافذ العمل قوانین، بشمول سائبر جرائم کی روک تھام کے قانون، کی خلاف ورزی ہو۔',
          'ویب سائٹ کو ہیک کرنے، اس کے کام میں خلل ڈالنے، یا اس کے نظاموں یا ڈیٹا تک غیر مجاز رسائی حاصل کرنے کی کوشش کرنا۔',
          'خودکار پروگراموں (جیسے بوٹس یا اسکریپرز) کے ذریعے رضامندی کے بغیر مواد نکالنا یا ڈیٹا کو منظم طریقے سے جمع کرنا۔ یہ پابندی ان سرچ انجنوں، جواب دینے والے انجنوں اور مصنوعی ذہانت کے معاونین پر لاگو نہیں ہوتی جنہیں ویب سائٹ کی robots.txt فائل کرال کرنے کی اجازت دیتی ہے۔ یہ استثنا بھی اسی فائل کی مقرر کردہ حدود کے اندر رہتا ہے۔',
          'کسی دستاویزی معاہدے کے بغیر خود کو اس ویب سائٹ کے طور پر پیش کرنا، یا یہ تاثر دینا کہ اس کے ساتھ شراکت داری ہے یا اس کی سرپرستی یا تائید حاصل ہے۔',
          'کوئی دل آزار یا ہتک عزت پر مبنی مواد، یا عوامی اخلاق اور اسلامی اقدار کے منافی مواد، ویب سائٹ سے وابستہ رابطے کے کسی بھی ذریعے سے شائع کرنا یا بھیجنا۔',
        ],
      },
      { h: '5. ترامیم اور خدمت کی معطلی',
        before: [
          'ویب سائٹ کسی بھی وقت اور پیشگی اطلاع کے بغیر اپنے مواد یا خدمات میں مکمل یا جزوی طور پر ترمیم کرنے، انہیں معطل کرنے یا بند کرنے کا حق محفوظ رکھتی ہے، اور اس بنا پر ویب سائٹ صارفین کے سامنے کسی بھی طرح ذمہ دار نہیں ہو گی۔',
        ],
      },
      { h: '6. قابل اطلاق قانون',
        before: [
          'یہ شرائط مملکت سعودی عرب میں نافذ العمل قوانین کے تابع ہیں، اور ان قوانین کے مطابق ہی ان شرائط کی تشریح کی جائے گی۔ ان شرائط سے پیدا ہونے والے کسی بھی تنازع کا دائرہ اختیار مملکت کی مجاز عدالتوں اور عدالتی اداروں کو حاصل ہو گا۔',
        ],
      },
    ],
  },
  {
    n: 'تیسرا حصہ', h: 'ذمہ داری سے دستبرداری',
    lead: 'Visit Al-Ahsa میں ہم شائع کی گئی معلومات کی درستی اور تازہ ترین ہونے کو یقینی بنانے کے لیے بڑی کوشش کرتے ہیں، تاہم سیاحتی اور معلوماتی مواد کی نوعیت کے پیش نظر ہم آپ کو درج ذیل نکات سے آگاہ کرنا ضروری سمجھتے ہیں:',
    subs: [
      { h: '1. معلومات کی درستی اور تازہ کاری',
        before: [
          'ویب سائٹ پر دی گئی معلومات عمومی رہنمائی کے طور پر پیش کی جاتی ہیں۔ ان میں سیاحتی مقامات کے کھلنے کے اوقات، داخلے اور خدمات کی قیمتیں، تقریبات اور موسمی میلوں کی تاریخیں، اور کھانے پینے کی جگہوں اور رہائش کی تفصیلات شامل ہیں۔ متعلقہ مقامات، تقریبات اور خدمات کو چلانے والے ادارے ہمارے علم کے بغیر کسی بھی وقت ان معلومات میں تبدیلی کر سکتے ہیں۔ اس لیے ویب سائٹ ان معلومات کے ہر وقت درست، مکمل یا تازہ ہونے کی ضمانت نہیں دیتی، اور ہم صارفین کو ہمیشہ مشورہ دیتے ہیں کہ سیر کی منصوبہ بندی سے پہلے براہ راست سرکاری اداروں یا مقامات اور تقریبات کے منتظمین سے ان کی تصدیق کر لیں۔',
        ],
      },
      { h: '2. ذمہ داری کی حدود',
        before: [
          'Visit Al-Ahsa اور اسے چلانے والے درج ذیل کی کوئی ذمہ داری نہیں اٹھاتے:',
        ],
        list: [
          'ویب سائٹ کے استعمال یا اس کی معلومات پر انحصار سے پیدا ہونے والا کوئی بھی براہ راست، بالواسطہ یا نتیجتاً ہونے والا نقصان۔',
          'ویب سائٹ کے مواد کی بنیاد پر کیے گئے فیصلوں کے نتیجے میں ہونے والے مالی نقصانات، اخراجات یا ذمہ داریاں، جیسے قیمتوں میں تبدیلی، تقریبات کی منسوخی یا مقامات کا بند ہو جانا۔',
          'ویب سائٹ پر مذکور اداروں اور کاروباروں کی فراہم کردہ خدمات کا معیار، کیونکہ ان کا ذکر نہ کوئی لازمی سفارش ہے اور نہ ان کی خدمات کے معیار کی ضمانت۔',
          'ویب سائٹ تک رسائی میں کوئی تعطل، تکنیکی خرابی یا پروگرام کی غلطی، جو معقول قابو سے باہر ہو۔',
        ],
      },
      { h: '3. رہنمائی، ماہرانہ مشورہ نہیں',
        before: [
          'ویب سائٹ پر شائع ہونے والا مواد عمومی تعارفی اور رہنمائی پر مبنی مواد ہے، اور اسے کسی بھی قسم کا ماہرانہ مشورہ نہیں سمجھا جائے گا۔ ویب سائٹ کے مواد کی بنیاد پر کوئی بھی فیصلہ کرنے سے پہلے صارف پر لازم ہے کہ وہ خود ضروری احتیاط برتے اور آزادانہ طور پر تصدیق کر لے۔',
        ],
      },
    ],
  },
  {
    n: 'چوتھا حصہ', h: 'کوکیز کی پالیسی',
    lead: 'یہ پالیسی بتاتی ہے کہ Visit Al-Ahsa پر استعمال ہونے والی کوکیز کیا ہیں، ان کا مقصد کیا ہے اور ان کا انتظام کیسے کیا جا سکتا ہے۔',
    subs: [
      { h: '1. کوکیز کیا ہیں؟',
        before: [
          'کوکیز (Cookies) چھوٹی متنی فائلیں ہیں جو ویب سائٹس دیکھنے پر آپ کے آلے پر محفوظ ہو جاتی ہیں۔ ان کی مدد سے ویب سائٹ آپ کے آلے کو پہچان سکتی ہے اور آپ کے ویب سائٹ دیکھنے کے بارے میں کچھ معلومات یاد رکھ سکتی ہے۔ اس سے ویب سائٹ دیکھنے کا تجربہ بہتر ہوتا ہے اور ویب سائٹ کی کارکردگی کا تجزیہ ممکن ہوتا ہے۔',
        ],
      },
      { h: '2. ویب سائٹ پر استعمال ہونے والی کوکیز کی اقسام',
        list: [
          'ویب سائٹ چلنے کے لیے لازمی کوکیز: یہ ویب سائٹ کے بنیادی کام اور اس کے صفحات کے درست طور پر ظاہر ہونے کے لیے ضروری ہیں، اور انہیں ویب سائٹ کے ذریعے بند نہیں کیا جا سکتا۔',
          'تجزیاتی کوکیز: یہ Google Analytics (GA4) کے ذریعے ویب سائٹ دیکھے جانے کے بارے میں گمنام اعداد و شمار جمع کرنے کے لیے استعمال ہوتی ہیں، جیسے صارفین کی تعداد، سب سے زیادہ دیکھے گئے صفحات، ویب سائٹ دیکھنے کا دورانیہ اور وہ ذرائع جن سے صارفین ویب سائٹ تک پہنچتے ہیں، تاکہ مواد کو ترقی دی جا سکے اور تجربہ بہتر ہو۔',
          'کارکردگی اور پیمائش کی وہ کوکیز جو اسی طرح کے تجزیاتی اوزار سے وابستہ ہیں جنہیں مستقبل میں شامل کیا جا سکتا ہے۔ ایسے اوزار اپنائے جانے پر یہ پالیسی تازہ کی جائے گی۔',
        ],
        after: [
          'یہ ویب سائٹ فی الحال صارفین کو ہدف بنانے کے لیے اشتہاری یا تجارتی فروغ کی کوکیز استعمال نہیں کرتی۔',
        ],
      },
      { h: '3. انتظام اور بند کرنے کے اختیارات',
        before: [
          'آپ کو درج ذیل اختیارات کے ذریعے کوکیز کا انتظام کرنے یا انہیں بند کرنے کی مکمل آزادی حاصل ہے:',
        ],
        list: [
          'براؤزر کی ترتیبات: تمام جدید براؤزر (کروم، سفاری، فائرفاکس، ایج) رازداری کی ترتیبات کے ذریعے کوکیز کو مکمل یا جزوی طور پر حذف کرنے یا روکنے کی سہولت دیتے ہیں۔',
          'Google Analytics کو اپنا ڈیٹا نہ دینے کا اوزار: آپ باضابطہ “Google Analytics Opt-out Browser Add-on” نصب کر سکتے ہیں تاکہ ویب سائٹس دیکھنے سے متعلق آپ کا ڈیٹا اس خدمت کے ساتھ نہ بانٹا جائے۔',
          'نجی طور پر ویب سائٹس دیکھنے کی حالت: انکوگنیٹو یا نجی حالت استعمال کرنے سے آپ کے آلے پر ٹریکنگ فائلوں کا ذخیرہ محدود ہو جاتا ہے۔',
        ],
        after: [
          'براہ کرم یاد رکھیں کہ کچھ کوکیز بند کرنے سے ویب سائٹ کی بعض خصوصیات کی کارکردگی متاثر ہو سکتی ہے، لیکن اس کے بنیادی مواد تک رسائی نہیں رکتی۔',
        ],
      },
    ],
  },
  {
    n: 'پانچواں حصہ', h: 'دانشورانہ ملکیت کی پالیسی',
    subs: [
      { h: '1. ملکیت کا بیان',
        before: [
          'جملہ حقوق © Visit Al-Ahsa (visit-alahsa.com) کے نام محفوظ ہیں۔ ان حقوق کے دائرے میں مثال کے طور پر درج ذیل شامل ہیں، مگر یہ صرف انہی تک محدود نہیں: متن، مضامین اور ادبی و تاریخی بیانیے، تصاویر اور ترمیم شدہ تصاویر، خاکے اور ڈیزائن، علامتی نشان اور بصری شناخت (بشمول سفید گالوں والی بلبل کا کردار)، تعاملی نقشے، اور ویب سائٹ کی ساخت اور سورس کوڈ۔ ویب سائٹ پر موجود جو مواد دوسرے فریقوں سے اجازت نامے کے تحت حاصل کیا گیا ہے وہ اپنے مالکان کی ملکیت رہتا ہے اور ان کے اجازت ناموں کے مطابق استعمال ہوتا ہے۔',
        ],
      },
      { h: '2. تحفظ کا دائرہ',
        before: [
          'ویب سائٹ کا مواد مملکت سعودی عرب کے کاپی رائٹ کے قانون اور ان بین الاقوامی معاہدوں کے تحت محفوظ ہے جن کا مملکت فریق ہے، اور ان میں ادبی اور فنی کاموں کے تحفظ کے لیے برن کنونشن بھی شامل ہے۔ کوئی بھی غیر مجاز استعمال خلاف ورزی شمار ہوتا ہے جس پر قانونی جواب دہی لازم آتی ہے۔',
        ],
      },
      { h: '3. حقوق کی خلاف ورزی کی اطلاع دینے کا طریقہ',
        before: [
          'اگر آپ سمجھتے ہیں کہ ویب سائٹ پر شائع شدہ کوئی مواد دانشورانہ ملکیت کے ان حقوق کی خلاف ورزی کرتا ہے جو آپ کے ہیں یا ان کے جن کی آپ نمائندگی کرتے ہیں، تو براہ کرم ویب سائٹ کے باضابطہ رابطے کے ذرائع پر ہمیں مطلع کریں۔ اطلاع میں درج ذیل کا شامل ہونا ضروری ہے:',
        ],
        list: [
          'اس تخلیق کی نشاندہی جس کے حق کی مبینہ طور پر خلاف ورزی ہوئی ہے، اور اطلاع دینے والے کی حیثیت (حق کا مالک یا اس کا نمائندہ)۔',
          'ویب سائٹ پر اس مواد کا لنک جس پر اعتراض ہے، اور اس کی درست وضاحت۔',
          'حق کی ملکیت کا ثبوت، یا اس کے مالک کی طرف سے کارروائی کرنے کے اختیار کا ثبوت۔',
          'اطلاع دینے والے کے رابطے کی تفصیلات (نام اور ای میل پتا)۔',
        ],
        after: [
          'ہم ہر سنجیدہ اطلاع پر معقول مدت کے اندر غور کریں گے، اور دعویٰ درست ثابت ہونے پر مناسب کارروائی کریں گے۔ یہ کارروائی ماخذ کے حوالے کی درستی سے لے کر مواد ہٹانے تک ہو سکتی ہے۔ ہم اطلاع دینے والے کو نتیجے سے بھی آگاہ کریں گے۔',
        ],
      },
      { h: '4. اجازت نامے اور استعمال کی درخواستیں',
        before: [
          'جو لوگ ویب سائٹ کا مواد یا تصاویر میڈیا، تعلیمی یا تجارتی مقاصد کے لیے استعمال کرنا چاہتے ہیں وہ باضابطہ رابطے کے ذرائع سے اجازت نامے کی درخواست دے سکتے ہیں، اور ہر درخواست پر اس کی نوعیت اور مقصد کے مطابق غور کیا جائے گا۔',
        ],
      },
    ],
  },
  {
    n: 'چھٹا حصہ', h: 'بیرونی لنکس کی پالیسی',
    lead: 'Visit Al-Ahsa میں ایسے لنکس ہو سکتے ہیں جو ان ویب سائٹس، ایپس یا پلیٹ فارمز تک لے جاتے ہیں جنہیں دوسرے فریق چلاتے ہیں، جیسے: سرکاری اداروں کی ویب سائٹس، جگہ محفوظ کرانے کے پلیٹ فارمز، گوگل میپس، سوشل میڈیا اکاؤنٹس، اور تقریبات اور سیاحتی اداروں کی ویب سائٹس۔ یہ لنکس محض صارفین کی سہولت اور مواد کو بھرپور بنانے کے لیے دیے جاتے ہیں۔',
    subs: [
      { h: '1. لنکس سے متعلق ذمہ داری کی حدود',
        list: [
          'کسی بیرونی لنک کو شامل کرنے کا مطلب ضروری طور پر یہ نہیں کہ ویب سائٹ جس فریق کا لنک دے رہی ہے اس کے مواد کی تائید کرتی ہے یا اس کی خدمات کی ضمانت دیتی ہے۔',
          'ویب سائٹ بیرونی ویب سائٹس اور ایپس کے مواد کی، نیز اس کے درست، قانونی یا تازہ ہونے کی، ذمہ دار نہیں۔',
          'ویب سائٹ ان فریقوں کی رازداری کی پالیسیوں، استعمال کی شرائط یا ڈیٹا جمع کرنے کے طریقوں کی ذمہ دار نہیں، اور ہم مشورہ دیتے ہیں کہ آپ ان سے معاملہ کرنے سے پہلے ان کی پالیسیوں کا جائزہ لیں۔',
          'ویب سائٹ کے کسی لنک کے ذریعے آپ کسی بیرونی فریق کے ساتھ جو بھی مالی یا معاہدے سے متعلق معاملہ کریں، وہ پوری طرح آپ کی اپنی ذمہ داری ہے اور براہ راست آپ اور اس فریق کے درمیان ہے۔',
        ],
      },
      { h: '2. ٹوٹے ہوئے یا ضوابط کے خلاف لنکس کی اطلاع',
        before: [
          'ہم بیرونی لنکس کا وقتاً فوقتاً جائزہ لینے کا اہتمام کرتے ہیں۔ باضابطہ رابطے کے ذرائع سے آپ کسی بھی ٹوٹے ہوئے لنک، یا نامناسب یا ضوابط کے خلاف مواد تک لے جانے والے لنک کی اطلاع دے سکتے ہیں، اور ہم ایسی ہر اطلاع کو خوش آمدید کہتے ہیں۔ ہم جلد از جلد اس کے ازالے کی کارروائی کریں گے۔',
        ],
      },
    ],
  },
];
