// أحياء المنشآت والمعالم — مصدر واحد للمفاتيح والتسميات.
//
// كانت قائمة المفاتيح في content.config.ts وتسمياتها الثلاث داخل DiningView؛ الخطوة 9
// من خطة التفاعل العالمي (ف4) تربط بها المعالم أيضاً: حقل `district` في ملف المعلم
// يُسند فقط حين يسمّي نصّ `area` القائم (أو العنوان) الحيَّ نفسه — يفرضه مخطط المعالم
// بـDISTRICT_MENTION — فتعرض صفحة المنشأة «معالم قريبة في الحيّ» بلا حقيقة مضافة.
// التسميات الصينية معتمدة من خط zh-translation-pipeline (دفعة المطاعم) ونُقلت حرفياً.
export const DISTRICTS = ['alkoot', 'downtown', 'rafah-north', 'khalidiyah', 'rawdah',
  'mazrou', 'uwaimriyah', 'olaya', 'khaleej', 'mubarraz', 'khudud', 'qarah'] as const;
export type District = (typeof DISTRICTS)[number];

export const DISTRICT_NAMES: Record<'ar' | 'en' | 'zh', Record<District, string>> = {
  ar: {
    alkoot: 'حي الكوت', downtown: 'وسط الهفوف التاريخي', 'rafah-north': 'الرفعة الشمالية',
    khalidiyah: 'الخالدية', rawdah: 'الروضة', mazrou: 'المزروع', uwaimriyah: 'العويمرية',
    olaya: 'العليا', khaleej: 'طريق الخليج', mubarraz: 'المبرز',
    khudud: 'حي الخدود', qarah: 'القارة',
  },
  en: {
    alkoot: 'Al-Koot district', downtown: 'Historic downtown Hofuf', 'rafah-north': 'Al-Raf‘ah North',
    khalidiyah: 'Al-Khalidiyah', rawdah: 'Al-Rawdah', mazrou: 'Al-Mazrou‘', uwaimriyah: 'Al-Uwaimriyah',
    olaya: 'Al-Olaya', khaleej: 'Al-Khaleej Road', mubarraz: 'Al-Mubarraz',
    khudud: 'Al-Khudud', qarah: 'Al-Qarah',
  },
  zh: {
    alkoot: '库特区', downtown: '胡富夫历史城区', 'rafah-north': '里法阿北区',
    khalidiyah: '哈利迪亚区', rawdah: '拉乌达区', mazrou: '马兹鲁阿区', uwaimriyah: '欧韦米里亚区',
    olaya: '奥拉雅区', khaleej: '海湾路', mubarraz: '穆巴拉兹',
    khudud: '胡杜德区', qarah: '卡拉',
  },
};

/** ما يجب أن يسمّيه نصّ area أو عنوان المعلم كي يُسند إليه الحيّ — لا حيّ بالتقدير. */
export const DISTRICT_MENTION: Record<District, RegExp> = {
  alkoot: /الكوت/, downtown: /وسط الهفوف/, 'rafah-north': /الرفعة الشمالية/, khalidiyah: /الخالدية/,
  rawdah: /الروضة/, mazrou: /المزروع/, uwaimriyah: /العويمرية/, olaya: /العليا/, khaleej: /طريق الخليج/,
  mubarraz: /المبرز/, khudud: /الخدود/, qarah: /القارة/,
};
