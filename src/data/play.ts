// فهرس «ألعاب الاكتشاف» — نصوص الصفحة وبطاقات الألعاب الثلاث (عربي/إنجليزي فقط).
// صورة كل بطاقة مسار /img بلا امتداد (Photo.astro)، والروابط من lib/routes.ts.

export type PlayLang = 'ar' | 'en';
export type GameId = 'alwan' | 'explorer' | 'merge';
export const GAME_IDS: readonly GameId[] = ['alwan', 'explorer', 'merge'];

export const GAME_IMAGES: Record<GameId, string> = {
  alwan: '/img/play/alwan-card',
  explorer: '/img/jabal-al-qarah',
  merge: '/img/hero-home',
};

export const PLAY_PAGE = {
  ar: {
    seoTitle: 'ألعاب الأحساء للأطفال: تلوين وذاكرة و2048 من معالم الواحة',
    seoDesc: 'ثلاث ألعاب مجانية في المتصفح تعرّف الأطفال بالأحساء: لوّن معالمها وثمارها، وطابق صورها في لعبة الذاكرة، وادمج الأرقام لتفتح محطات الواحة.',
    eyebrow: 'العب واكتشف',
    title: 'ألعاب الاكتشاف',
    lead: 'ثلاث ألعاب مجانية تعمل في المتصفح بلا تسجيل، كل صورة فيها من «زوروا الأحساء». يُحفظ التقدم على جهازك وحده.',
    play: 'العب الآن',
    games: {
      alwan: ['ألوان الأحساء', '30 رسمة تلوين من معالم الواحة وطبيعتها وحرفها وثمارها، بأدوات خشبي وشمعي ومائي، وحفظ اللوحة باسم الطفل.'],
      explorer: ['مستكشف الأحساء الصغير', 'لعبة ذاكرة بثلاثة مستويات: طابق صور المعالم، واجمع أختام جواز المستكشف.'],
      merge: ['رحلة الدمج 2048', 'ادمج الأرقام المتشابهة لتفتح ست محطات من الواحة، بثلاثة مستويات صعوبة وبلا مؤقّت.'],
    },
  },
  en: {
    seoTitle: 'Al-Ahsa Games for Kids: Colouring, Memory and 2048',
    seoDesc: 'Three free browser games for children about Al-Ahsa: colour its landmarks and fruits, match photos in a memory game, merge numbers to unlock oasis stops.',
    eyebrow: 'Play and discover',
    title: 'Discovery games',
    lead: 'Three free games that run in the browser with no sign-up, every picture from Visit Al-Ahsa. Progress stays on your own device.',
    play: 'Play now',
    games: {
      alwan: ['Colours of Al-Ahsa', '30 colouring pages of the oasis’s landmarks, nature, crafts and fruits, with pencil, crayon and watercolour tools, saved with your child’s name.'],
      explorer: ['Little Al-Ahsa Explorer', 'A memory game in three levels: match photos of the landmarks and collect the stamps in your explorer passport.'],
      merge: ['2048 Oasis Journey', 'Merge matching numbers to unlock six stops across the oasis, with three difficulty levels and no timer.'],
    },
  },
} as const;
