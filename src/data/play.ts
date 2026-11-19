// فهرس «ألعاب الاكتشاف» — نصوص الصفحة وبطاقات الألعاب الأربع (عربي/إنجليزي فقط).
// صورة كل بطاقة مسار /img بلا امتداد (Photo.astro)، والروابط من lib/routes.ts.

export type PlayLang = 'ar' | 'en';
export type GameId = 'alwan' | 'explorer' | 'merge' | 'blocks';
export const GAME_IDS: readonly GameId[] = ['alwan', 'explorer', 'merge', 'blocks'];

export const GAME_IMAGES: Record<GameId, string> = {
  alwan: '/img/play/alwan-card',
  explorer: '/img/jabal-al-qarah',
  merge: '/img/hero-home',
  blocks: '/img/qasr-ibrahim',
};

export const PLAY_PAGE = {
  ar: {
    seoTitle: 'ألعاب الأحساء للأطفال: تلوين وذاكرة و2048 من معالم الواحة',
    seoDesc: 'أربع ألعاب مجانية في المتصفح تعرّف الأطفال بالأحساء عبر التلوين ومطابقة صور المعالم ودمج الأرقام وترتيب الكتل، ويمكن لعبها بلا تسجيل.',
    eyebrow: 'العب واكتشف',
    title: 'ألعاب الاكتشاف',
    lead: 'أربع ألعاب مجانية تعمل في المتصفح بلا تسجيل، كل صورة فيها من «زوروا الأحساء». يُحفظ التقدم على جهازك وحده.',
    play: 'العب الآن',
    games: {
      alwan: ['ألوان الأحساء', '30 رسمة تلوين من معالم الواحة وطبيعتها وحرفها وثمارها، بأدوات خشبي وشمعي ومائي، وحفظ اللوحة باسم الطفل.'],
      explorer: ['مستكشف الأحساء الصغير', 'لعبة ذاكرة بثلاثة مستويات: طابق صور المعالم، واجمع أختام جواز المستكشف.'],
      blocks: ['كتل الواحة', 'رتّب الكتل لتمحو الصفوف والأعمدة وتجمع أختام 12 معلماً، أو العب بلا هدف محدد في النمط الكلاسيكي.'],
      merge: ['رحلة الدمج 2048', 'ادمج الأرقام المتشابهة لتفتح ست محطات من الواحة، بثلاثة مستويات صعوبة وبلا مؤقّت.'],
    },
  },
  en: {
    seoTitle: 'Al-Ahsa Games for Kids: Colouring, Memory and 2048',
    seoDesc: 'Four free browser games for children about Al-Ahsa, with colouring, photo matching, number merging and block puzzles.',
    eyebrow: 'Play and discover',
    title: 'Discovery games',
    lead: 'Four free games that run in the browser with no sign-up, every picture from Visit Al-Ahsa. Progress stays on your own device.',
    play: 'Play now',
    games: {
      alwan: ['Colours of Al-Ahsa', '30 colouring pages of the oasis’s landmarks, nature, crafts and fruits, with pencil, crayon and watercolour tools, saved with your child’s name.'],
      explorer: ['Little Al-Ahsa Explorer', 'A memory game in three levels: match photos of the landmarks and collect the stamps in your explorer passport.'],
      blocks: ['Oasis Blocks', 'Place blocks to clear rows and columns and collect stamps from 12 landmarks, or play for a high score in Classic mode.'],
      merge: ['2048 Oasis Journey', 'Merge matching numbers to unlock six stops across the oasis, with three difficulty levels and no timer.'],
    },
  },
} as const;
