type Shape = 'dot' | 'horizontal' | 'vertical' | 'square' | 'corner' | 'tee' | 'zigzag';
type Piece = { shape: Shape; cells: [number, number][] };

const piece = (shape: Shape, ...pattern: string[]): Piece => ({
  shape,
  cells: pattern.flatMap((row, y) => [...row].flatMap((cell, x): [number, number][] => cell === '#' ? [[y, x]] : [])),
});

export const PIECES: Record<string, Piece> = {
  dot: piece('dot', '#'),
  h2: piece('horizontal', '##'), v2: piece('vertical', '#', '#'),
  h3: piece('horizontal', '###'), v3: piece('vertical', '#', '#', '#'),
  h4: piece('horizontal', '####'), v4: piece('vertical', '#', '#', '#', '#'),
  h5: piece('horizontal', '#####'), v5: piece('vertical', '#', '#', '#', '#', '#'),
  square2: piece('square', '##', '##'),
  square3: piece('square', '###', '###', '###'),
  smallL1: piece('corner', '##', '#.'), smallL2: piece('corner', '##', '.#'),
  smallL3: piece('corner', '#.', '##'), smallL4: piece('corner', '.#', '##'),
  bigL1: piece('corner', '###', '#..', '#..'), bigL2: piece('corner', '###', '..#', '..#'),
  bigL3: piece('corner', '#..', '#..', '###'), bigL4: piece('corner', '..#', '..#', '###'),
  t1: piece('tee', '###', '.#.'), t2: piece('tee', '#.', '##', '#.'),
  t3: piece('tee', '.#.', '###'), t4: piece('tee', '.#', '##', '.#'),
  s1: piece('zigzag', '.##', '##.'), s2: piece('zigzag', '#.', '##', '.#'),
  z1: piece('zigzag', '##.', '.##'), z2: piece('zigzag', '.#', '##', '#.'),
};

export const CLASSIC_POOL = Object.fromEntries(Object.keys(PIECES).map(id => [id, 1]));
const small = { dot: 4, h2: 5, v2: 5 };
const lines = { ...small, h3: 3, v3: 3 };
const corners = { ...lines, smallL1: 1, smallL2: 1, smallL3: 1, smallL4: 1, square2: 2 };
const medium = { ...corners, h4: 2, v4: 2, t1: 1, t2: 1, t3: 1, t4: 1 };
const large = { ...medium, h5: 1, v5: 1, square3: 1, bigL1: 1, bigL2: 1, bigL3: 1, bigL4: 1 };
const full = { ...CLASSIC_POOL, ...large, dot: 7, h2: 8, v2: 8, h3: 4, v3: 4 };
export const BLOCKS_COPY = {
  en: {
    title: 'Oasis Blocks', subtitle: 'A Journey Through Al-Ahsa',
    seoTitle: 'Oasis Blocks: An Al-Ahsa Block Puzzle',
    description: 'Place blocks to clear rows and columns. Collect 12 landmark stamps in Journey mode or play for a high score in Classic mode. Both work offline.',
    noscript: 'Enable JavaScript to play Oasis Blocks.',
    mode: 'Game mode', journey: 'Journey', classic: 'Classic', sound: 'Sound', help: 'How to play',
    score: 'Score', best: 'Best', goal: 'Lines', board: '8 by 8 board', tray: 'Piece tray',
    instructions: 'Drag a piece onto the board, or select a piece and tap its starting cell.',
    keyboard: 'Use 1–3 to select a piece and the arrow keys to move it. Enter or Space places it. Esc cancels.',
    rules: 'Fill rows or columns to clear them. Place all 3 pieces to get a new tray. The run ends when none of the remaining pieces fits.',
    passport: 'Passport', stamps: 'Stamps', level: 'Level', locked: 'Locked', earned: 'Stamp earned',
    close: 'Close', reset: 'Reset progress', confirm: 'Clear all Oasis Blocks scores and stamps on this device?',
    over: 'Game over', again: 'Play again', restart: 'No piece fits. The level has restarted.',
    complete: 'Landmark discovered', next: 'Next level', visit: "Visit this landmark's page",
    cleared: 'Lines cleared', two: '2 lines', streak: 'Streak', clearedBoard: 'Board cleared',
    filled: 'Filled', empty: 'Empty', cell: 'Cell', invalid: 'The piece does not fit here.',
    piece: '{size}-cell piece: {shape}',
    shapes: { dot: 'single block', horizontal: 'horizontal line', vertical: 'vertical line', square: 'square', corner: 'L corner', tee: 'T shape', zigzag: 'zigzag' },
  },
  ar: {
    title: 'كتل الواحة', subtitle: 'رحلة عبر الأحساء',
    seoTitle: 'كتل الواحة: لعبة ألغاز في رحلة عبر الأحساء',
    description: 'رتّب الكتل لتمحو الصفوف والأعمدة وتجمع أختام 12 معلماً في نمط الرحلة، أو حاول تحسين نتيجتك في النمط الكلاسيكي. يمكنك اللعب دون اتصال.',
    noscript: 'فعّل جافاسكربت لتلعب كتل الواحة.',
    mode: 'نمط اللعب', journey: 'الرحلة', classic: 'الكلاسيكي', sound: 'الصوت', help: 'طريقة اللعب',
    score: 'النتيجة', best: 'أفضل نتيجة', goal: 'الخطوط', board: 'لوحة من 8 صفوف و8 أعمدة', tray: 'صينية القطع',
    instructions: 'اسحب قطعة إلى اللوحة، أو اخترها ثم اضغط خلية البداية.',
    keyboard: 'اختر قطعة بالمفاتيح 1–3 وحرّكها بالأسهم. ضعها بمفتاح الإدخال أو المسافة، وألغِ الاختيار بمفتاح Esc.',
    rules: 'املأ الصفوف أو الأعمدة لمحوها. ضع القطع الـ3 لتحصل على صينية جديدة. تنتهي الجولة حين لا تتّسع اللوحة لأي قطعة متبقية.',
    passport: 'جواز الرحلة', stamps: 'الأختام', level: 'المستوى', locked: 'مغلق', earned: 'حصلت على الختم',
    close: 'إغلاق', reset: 'إعادة ضبط التقدم', confirm: 'هل تريد مسح كل نتائج كتل الواحة وأختامها على هذا الجهاز؟',
    over: 'انتهت الجولة', again: 'العب مجدداً', restart: 'لا مكان للقطع المتبقية. بدأ المستوى من جديد.',
    complete: 'اكتشفت المعلم', next: 'المستوى التالي', visit: 'اكتشف المعلم',
    cleared: 'الخطوط الممحوة', two: 'خطّان', streak: 'سلسلة', clearedBoard: 'مُحيت كل الكتل',
    filled: 'ممتلئة', empty: 'فارغة', cell: 'خلية', invalid: 'لا تتّسع هذه الخلية للقطعة.',
    piece: [
      'قطعة من خلية واحدة: {shape}',
      'قطعة من خليتين: {shape}',
      ...Array.from({ length: 8 }, (_, index) => `قطعة من ${index + 3} خلايا: {shape}`),
    ],
    shapes: { dot: 'كتلة واحدة', horizontal: 'خط أفقي', vertical: 'خط عمودي', square: 'مربّع', corner: 'زاوية', tee: 'شكل حرف T', zigzag: 'خط متعرّج' },
  },
} as const;

const blank = Array<string>(8).fill('........');
const A = ['........', '........', '........', '........', '........', '........', '##......', '###.....'];
const B = ['........', '........', '........', '........', '........', '#.......', '###.....', '#####...'];
const C = ['........', '........', '........', '........', '#.......', '##......', '####....', '######..'];

const level = (id: number, attraction: string, img: string, goalLines: number, stones: string[], pool: Record<string, number>) =>
  ({ id, attraction, img, goalLines, stones, pool });

export const LEVELS = [
  level(1, 'jabal-al-qarah', 'jabal-al-qarah', 3, blank, small),
  level(2, 'qasr-ibrahim', 'qasr-ibrahim', 4, blank, lines),
  level(3, 'qaisariyah', 'qaisariyah', 5, blank, corners),
  level(4, 'jawatha-mosque', 'jawatha-mosque', 6, A, corners),
  level(5, 'khuzam', 'khuzam-01', 7, B, medium),
  level(6, 'sahood', 'sahood', 8, B, medium),
  level(7, 'asfar', 'asfar', 9, A, medium),
  level(8, 'baiah', 'baiah-v2', 10, B, medium),
  level(9, 'national-park', 'alahsa-national-park', 11, C, large),
  level(10, 'najm-park', 'najm-park-v2', 12, B, large),
  level(11, 'tahimiyah-e', 'tahimiyah-e', 13, C, large),
  level(12, 'al-uqair', 'al-uqair', 15, C, full),
];
