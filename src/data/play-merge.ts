// «رحلة الدمج 2048» — لعبة دمج أرقام بست محطات من الأحساء (عربي/إنجليزي).
// لكل محطة هدف (64…2048) وصورة من صور الموقع (img: اسم /img بلا لاحقة العرض) وصفحتها (ref):
// معرّف معلم في مجموعة attractions أو الرئيسية — تُحل الروابط وقت البناء.

export type MergeLang = 'ar' | 'en';
export type MergeRef = { attraction: string } | 'home';
export type MergeLevel = 'easy' | 'normal' | 'hard';

export const MERGE_LEVELS: readonly MergeLevel[] = ['easy', 'normal', 'hard'];

/** قواعد المستويات كما في الأصل: حجم اللوحة، ورصيد التراجع لكل محاولة، واحتمال ظهور 4. */
export const MERGE_RULES: Record<MergeLevel, { size: number; undos: number; four: number }> = {
  easy: { size: 5, undos: 20, four: 0.1 },
  normal: { size: 4, undos: 3, four: 0.1 },
  hard: { size: 4, undos: 0, four: 0.2 },
};

/** صورة كل محطة: العرض 800 وارتفاعه (لمنع إزاحة التخطيط). */
export const MERGE_STAGES: readonly {
  target: number; img: string; h800: number; ref: MergeRef;
  ar: { name: string; note: string; tip: string };
  en: { name: string; note: string; tip: string };
}[] = [
  {
    target: 64, img: 'hero-home', h800: 450, ref: 'home',
    ar: { name: 'واحة النخيل', note: 'بداية خضراء بين النخيل. كوّن 64 لتحصل على أول ختم في رحلتك.', tip: 'اختر زاوية للرقم الأكبر، وحاول إبقاءه فيها.' },
    en: { name: 'Palm oasis', note: 'A green start among the palms. Make 64 to earn the first stamp of your journey.', tip: 'Pick a corner for your biggest number and try to keep it there.' },
  },
  {
    target: 128, img: 'jabal-al-qarah', h800: 599, ref: { attraction: 'jabal-al-qarah' },
    ar: { name: 'جبل القارة', note: 'محطتك التالية بين تشكيلات جبل القارة. واصل الدمج حتى تصل إلى 128.', tip: 'رتّب الأرقام الكبيرة قرب بعضها، واترك مساحة للأرقام الصغيرة.' },
    en: { name: 'Jabal Al-Qarah', note: 'Your next stop is among the rock formations of Jabal Al-Qarah. Keep merging until you reach 128.', tip: 'Keep the big numbers close together and leave room for the small ones.' },
  },
  {
    target: 256, img: 'qaisariyah', h800: 450, ref: { attraction: 'qaisariyah' },
    ar: { name: 'سوق القيصرية', note: 'محطة من أجواء التراث والأسواق. هدف هذه الجولة هو البلاطة 256.', tip: 'فكّر في الحركة التالية قبل أن تختار اتجاه السحب.' },
    en: { name: 'Qaisariyah Souq', note: 'A stop with the feel of heritage and old markets. This round’s goal is the 256 tile.', tip: 'Think about your next move before you choose which way to swipe.' },
  },
  {
    target: 512, img: 'qasr-ibrahim', h800: 450, ref: { attraction: 'qasr-ibrahim' },
    ar: { name: 'قصر إبراهيم', note: 'من معالم الأحساء التاريخية. اختبر تخطيطك واصنع البلاطة 512.', tip: 'حافظ على صف مرتب من الأرقام الكبيرة إلى الصغيرة.' },
    en: { name: 'Qasr Ibrahim', note: 'One of Al-Ahsa’s historic landmarks. Test your planning and make the 512 tile.', tip: 'Keep a tidy row running from the biggest numbers to the smallest.' },
  },
  {
    target: 1024, img: 'asfar', h800: 533, ref: { attraction: 'asfar' },
    ar: { name: 'بحيرة الأصفر', note: 'محطة هادئة يلتقي فيها الماء بالصحراء. اقترب من النهاية بتكوين 1024.', tip: 'وجود خانات فارغة يمنحك خيارات أكثر. لا تدمج بلا خطة.' },
    en: { name: 'Al-Asfar Lake', note: 'A quiet stop where water meets the desert. Get close to the end by making 1024.', tip: 'Empty squares give you more choices. Don’t merge without a plan.' },
  },
  {
    target: 2048, img: 'al-uqair', h800: 575, ref: { attraction: 'al-uqair' },
    ar: { name: 'العُقير', note: 'ختام الرحلة عند العُقير. كوّن 2048 وأكمل أختام الأحساء الستة.', tip: 'خذ وقتك. لا يوجد مؤقت، والحركة المدروسة أقوى من الحركة السريعة.' },
    en: { name: 'Al-Uqair', note: 'The journey ends at Al-Uqair. Make 2048 and collect all six Al-Ahsa stamps.', tip: 'Take your time. There is no timer, and a thoughtful move beats a fast one.' },
  },
];

/** نصوص الصفحة الثابتة. بنود الشرح: [مقطع مشدّد، بقية الجملة]. */
export const MERGE_PAGE = {
  ar: {
    seoTitle: 'رحلة الدمج 2048: لعبة أرقام تفتح محطات الأحساء',
    seoDesc: 'لعبة 2048 مجانية في المتصفح: ادمج الأرقام المتساوية لتفتح ست محطات من الأحساء، من واحة النخيل إلى العُقير، بثلاثة مستويات وختم لكل محطة وبلا مؤقّت.',
    eyebrow: 'ألعاب الاكتشاف',
    title: 'رحلة الدمج 2048',
    lead: 'ادمج الأرقام واكتشف الأحساء: ست محطات، وصور من الواحة، وتحدٍّ يصل بك إلى 2048.',
    noscript: 'تحتاج اللعبة إلى متصفح يعمل فيه JavaScript.',
    headH: 'رحلتك تبدأ بخطوة', headP: 'ادمج المتشابه، واكسب ختمًا لكل محطة.',
    meter: 'أختام الرحلة', help: 'كيف ألعب؟',
    playArea: 'منطقة اللعب', stageLabel: 'المرحلة 1 من 6',
    score: 'النقاط', best: 'أفضل نتيجة',
    levelLabel: 'اختر مستوى الرحلة',
    levels: { easy: 'مستكشف · سهل', normal: 'رحّالة · متوسط', hard: 'خبير · صعب' },
    goal: 'الهدف: كوّن بلاطة', highest: 'أكبر بلاطة', progress: 'التقدم نحو بلاطة الهدف',
    boardCaption: 'رحلة الدمج · زوروا الأحساء', board: 'لوحة الدمج. استخدم الأسهم أو اسحب للتحريك.',
    photos: 'صور المعالم', undo: 'تراجع', restart: 'إعادة المرحلة', next: 'المرحلة التالية ←',
    keys: 'اسحب أو استخدم الأسهم', dpad: 'أزرار الاتجاهات',
    dirs: { left: 'تحريك لليسار', up: 'تحريك للأعلى', down: 'تحريك للأسفل', right: 'تحريك لليمين' },
    youAreIn: 'أنت الآن في', passport: 'جواز رحلتك', stagesNav: 'مراحل الرحلة', tipH: 'نصيحة الرحّالة',
    discover: 'اكتشف هذه المحطة في الموقع',
    stripH: ['رقمان متشابهان،', 'خطوة جديدة.'],
    stripP: 'اسحب لدمج الرقمين المتساويين. عند الوصول إلى بلاطة الهدف، تفتح محطة جديدة من الأحساء. خذ وقتك؛ لا يوجد مؤقّت.',
    miniMerge: '2 مع 2 تصبح 4',
    helpH: 'رقمان… وحكاية أكبر', helpClose: 'إغلاق الشرح',
    helpP: 'حرّك البلاطات في اتجاه واحد، واجمع الأرقام المتساوية للوصول إلى هدف المرحلة.',
    demo: 'جرّب الدمج', demoNote: 'شاهد كيف يتحول رقمان متساويان إلى رقم أكبر.',
    howList: [
      ['اسحب على اللوحة', ' أو استخدم أسهم لوحة المفاتيح أو أزرار الاتجاهات.'],
      ['', 'مثلًا: 2 مع 2 تصبح 4، و4 مع 4 تصبح 8. كل بلاطة تندمج مرة واحدة في الحركة.'],
      ['', 'تظهر بلاطة 2 أو 4 بعد كل حركة تغيّر اللوحة. الحركة غير الممكنة لا تُحسب.'],
      ['كوّن بلاطة الهدف', ' لتحصل على ختم وتفتح المرحلة التالية. النقاط وحدها لا تكفي، وكل مرحلة تبدأ بلوحة جديدة.'],
      ['', 'تنتهي المحاولة عندما تمتلئ اللوحة ولا يبقى دمج ممكن. يمكنك إعادة المرحلة، أو التراجع إذا بقي لك رصيد.'],
    ],
    helpNote: 'مستكشف: لوحة 5×5 و20 تراجعًا. رحّالة: 4×4 و3 تراجعات. خبير: 4×4 بلا تراجع، وظهور الرقم 4 أكثر. لكل مستوى تقدم مستقل، ولا يوجد مؤقت.',
    ready: 'جاهز للرحلة',
    resultEyebrow: 'رحلة الدمج', resultClose: 'إغلاق النتيجة', moves: 'الحركات', resultUndo: 'تراجع وأكمل',
    confirmYes: 'ابدأ من جديد', cancel: 'إلغاء',
  },
  en: {
    seoTitle: '2048 Oasis Journey: a Number Game Across Al-Ahsa',
    seoDesc: 'A free 2048 game in your browser: merge matching numbers to unlock six stops across Al-Ahsa, from the palm oasis to Al-Uqair, with three levels and no timer.',
    eyebrow: 'Discovery games',
    title: '2048 Oasis Journey',
    lead: 'Merge the numbers and discover Al-Ahsa: six stops, photos from the oasis, and a challenge that takes you all the way to 2048.',
    noscript: 'The game needs a browser with JavaScript turned on.',
    headH: 'Your journey starts with one step', headP: 'Merge matching tiles and earn a stamp for every stop.',
    meter: 'Journey stamps', help: 'How to play',
    playArea: 'Play area', stageLabel: 'Stage 1 of 6',
    score: 'Score', best: 'Best',
    levelLabel: 'Choose your level',
    levels: { easy: 'Explorer · easy', normal: 'Traveller · medium', hard: 'Expert · hard' },
    goal: 'Goal: make the tile', highest: 'Highest tile', progress: 'Progress towards the goal tile',
    boardCaption: '2048 Oasis Journey · Visit Al-Ahsa', board: 'Merge board. Use the arrow keys or swipe to move.',
    photos: 'Landmark photos', undo: 'Undo', restart: 'Restart stage', next: 'Next stage →',
    keys: 'Swipe or use the arrow keys', dpad: 'Direction buttons',
    dirs: { left: 'Move left', up: 'Move up', down: 'Move down', right: 'Move right' },
    youAreIn: 'You are now at', passport: 'Your journey passport', stagesNav: 'Journey stages', tipH: 'Traveller’s tip',
    discover: 'Discover this stop on the site',
    stripH: ['Two matching numbers,', 'one new step.'],
    stripP: 'Swipe to merge two equal numbers. Reach the goal tile and a new stop in Al-Ahsa opens. Take your time; there is no timer.',
    miniMerge: '2 and 2 make 4',
    helpH: 'Two numbers… and a bigger story', helpClose: 'Close the instructions',
    helpP: 'Move all the tiles in one direction and merge equal numbers to reach the stage goal.',
    demo: 'Try a merge', demoNote: 'See how two equal numbers become a bigger one.',
    howList: [
      ['Swipe on the board', ' or use the arrow keys or the direction buttons.'],
      ['', 'For example, 2 and 2 make 4, and 4 and 4 make 8. Each tile merges only once per move.'],
      ['', 'A 2 or a 4 appears after every move that changes the board. A move that changes nothing does not count.'],
      ['Make the goal tile', ' to earn a stamp and open the next stage. Points alone are not enough, and every stage starts on a fresh board.'],
      ['', 'A try ends when the board is full and no merge is left. You can restart the stage, or undo if you have any left.'],
    ],
    helpNote: 'Explorer: 5×5 board and 20 undos. Traveller: 4×4 and 3 undos. Expert: 4×4 with no undo, and more 4s. Each level keeps its own progress, and there is no timer.',
    ready: 'Ready to go',
    resultEyebrow: '2048 Oasis Journey', resultClose: 'Close the result', moves: 'Moves', resultUndo: 'Undo and carry on',
    confirmYes: 'Start again', cancel: 'Cancel',
  },
} as const;

/** نصوص يحتاجها السكربت وقت التشغيل. القوالب: {n} {m} {t} {s} {x} {r} {c} {v} {a} {b}. */
export const MERGE_RUNTIME = {
  ar: {
    saved: 'يُحفظ تقدمك تلقائيًا في هذا المتصفح.',
    noSave: 'الحفظ غير متاح هنا؛ ستستمر اللعبة خلال هذه الجلسة فقط.',
    start: 'اسحب على اللوحة، واجمع الرقمين المتساويين.',
    noChange: 'هذا الاتجاه لا يغيّر اللوحة. جرّب اتجاهًا آخر.',
    gained: 'دمج جميل! +{n} نقطة.',
    step: 'خطوة جديدة… ابحث عن رقمين متساويين.',
    undone: 'عدنا خطوة. جرّب اتجاهًا مختلفًا.',
    stageLabel: 'المرحلة {n} من 6',
    progressText: 'أكبر بلاطة {m}، الهدف {t}',
    cell: 'صف {r} عمود {c}: {v}', empty: 'فارغ',
    moves: '{n} حركة', movesOne: '1 حركة',
    undoN: 'تراجع ({n})', undoNone: 'التراجع غير متاح',
    modeDesc: {
      easy: 'لوحة 5×5 · 20 تراجعًا لكل محاولة · مساحة أكبر للتعلّم',
      normal: 'لوحة 4×4 · 3 تراجعات لكل محاولة · التحدي الكلاسيكي',
      hard: 'لوحة 4×4 · دون تراجع · احتمال ظهور 4 هو 20%',
    },
    stampCount: '{n} / 6 أختام',
    locked: 'مقفلة · ', done: 'مكتملة · ', goal: 'هدف {n}',
    nextStage: 'تابع إلى المرحلة التالية ←', nextFinal: 'أكملت الرحلة! شاهد النتيجة ✦',
    switchH: 'الانتقال إلى مرحلة أخرى؟', switchP: 'ستبدأ لوحة جديدة في المرحلة المختارة. تبقى الأختام والمراحل المفتوحة محفوظة.',
    restartH: 'إعادة هذه المرحلة؟', restartP: 'ستبدأ لوحة جديدة. تبقى الأختام والمراحل المفتوحة محفوظة.',
    winFinalH: 'أكملت رحلة الأحساء!', winH: 'ختم جديد في رحلتك!', loseH: 'لكل رحلة محاولة أخرى',
    winFinalP: 'وصلت إلى 2048 وجمعت الأختام الستة. يمكنك إعادة المراحل أو خوض مستوى صعوبة آخر.',
    winP: 'كوّنت {t} وأكملت {s}. المرحلة التالية: {x}.',
    loseP: 'امتلأت اللوحة ولم يعد هناك دمج ممكن. جرّب خطة جديدة.',
    back: 'العودة إلى رحلتي', nextBtn: 'المرحلة التالية ←', retry: 'أعد المحاولة',
    winStatus: 'اكتملت المرحلة. ختم جديد يُضاف إلى رحلتك!',
    loseStatus: 'لا توجد حركات متاحة. أعد المحاولة أو تراجع.',
    levelDone: 'اكتملت المرحلة. يمكنك المتابعة إلى التالية.',
    levelRestored: 'استُعيدت رحلتك في هذا المستوى.',
    welcomeDone: 'اكتملت المرحلة. تابع رحلتك إلى المرحلة التالية.',
    welcome: 'أهلًا بعودتك! أكمل رحلتك من حيث توقفت.',
    demoNote: 'دمج {a} مع {a} يعطي {b}، ويضيف {b} نقطة.',
  },
  en: {
    saved: 'Your progress is saved automatically in this browser.',
    noSave: 'Saving is not available here; the game will last for this session only.',
    start: 'Swipe on the board and merge two equal numbers.',
    noChange: 'That direction doesn’t change the board. Try another one.',
    gained: 'Nice merge! +{n} points.',
    step: 'New move… look for two equal numbers.',
    undone: 'One step back. Try a different direction.',
    stageLabel: 'Stage {n} of 6',
    progressText: 'Highest tile {m}, goal {t}',
    cell: 'Row {r}, column {c}: {v}', empty: 'empty',
    moves: '{n} moves', movesOne: '1 move',
    undoN: 'Undo ({n})', undoNone: 'Undo not available',
    modeDesc: {
      easy: '5×5 board · 20 undos per try · more room to learn',
      normal: '4×4 board · 3 undos per try · the classic challenge',
      hard: '4×4 board · no undo · a 20% chance of a 4',
    },
    stampCount: '{n} / 6 stamps',
    locked: 'Locked · ', done: 'Complete · ', goal: 'Goal {n}',
    nextStage: 'Go on to the next stage →', nextFinal: 'Journey complete! See your result ✦',
    switchH: 'Move to another stage?', switchP: 'A new board will start in the chosen stage. Your stamps and unlocked stages stay saved.',
    restartH: 'Restart this stage?', restartP: 'A new board will start. Your stamps and unlocked stages stay saved.',
    winFinalH: 'You completed the Al-Ahsa journey!', winH: 'A new stamp for your journey!', loseH: 'Every journey has another try',
    winFinalP: 'You reached 2048 and collected all six stamps. You can replay the stages or take on another level.',
    winP: 'You made {t} and completed {s}. Next stage: {x}.',
    loseP: 'The board is full and no merge is left. Try a new plan.',
    back: 'Back to my journey', nextBtn: 'Next stage →', retry: 'Try again',
    winStatus: 'Stage complete. A new stamp joins your journey!',
    loseStatus: 'No moves left. Try again or undo.',
    levelDone: 'Stage complete. You can go on to the next one.',
    levelRestored: 'Your journey at this level has been restored.',
    welcomeDone: 'Stage complete. Carry on to the next stage.',
    welcome: 'Welcome back! Carry on from where you stopped.',
    demoNote: 'Merging {a} with {a} gives {b} and adds {b} points.',
  },
} as const;
export type MergeRuntime = (typeof MERGE_RUNTIME)[MergeLang];
