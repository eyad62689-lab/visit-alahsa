// Languages of the wildlife section on the Al-Asfar Lake page. Arabic and English live in asfar-wildlife.ts;
// every other language has a generated file asfar-wildlife.<lang>.ts, written by the apply script from the
// final strings of that language's translation pipeline (not edited by hand). A language without a file
// does not get the section at all: there is no fallback to English.
import type { Lang } from '../i18n/ui';
import { WILDLIFE_STRINGS, type Bi } from './asfar-wildlife';
import { WILDLIFE_ZH } from './asfar-wildlife.zh';
import { WILDLIFE_DE } from './asfar-wildlife.de';
import { WILDLIFE_RU } from './asfar-wildlife.ru';
import { WILDLIFE_UR } from './asfar-wildlife.ur';
import { WILDLIFE_TR } from './asfar-wildlife.tr';
// @apply-imports

const PACKS: Partial<Record<Lang, Record<string, string>>> = {
  zh: WILDLIFE_ZH,
  de: WILDLIFE_DE,
  ru: WILDLIFE_RU,
  ur: WILDLIFE_UR,
  tr: WILDLIFE_TR,
  // @apply-entries
};

const KEY_OF = new Map<Bi, string>(WILDLIFE_STRINGS.map((s) => [s.v, s.key]));

// A registered language must carry every key: a gap fails the build instead of showing another language.
for (const [lang, pack] of Object.entries(PACKS)) {
  const missing = WILDLIFE_STRINGS.filter((s) => !pack[s.key]?.trim()).map((s) => s.key);
  if (missing.length) throw new Error(`wildlife section (${lang}): missing ${missing.join(', ')}`);
}

export const hasWildlife = (lang: Lang): boolean => lang === 'ar' || lang === 'en' || PACKS[lang] !== undefined;

/** The lookup for one language: takes a string of asfar-wildlife.ts and returns its text in that language. */
export function wildlifeText(lang: Lang): (v: Bi) => string {
  if (lang === 'ar' || lang === 'en') return (v) => v[lang];
  const pack = PACKS[lang];
  if (!pack) throw new Error(`wildlife section: no text for ${lang}`);
  return (v) => {
    const key = KEY_OF.get(v);
    const text = key === undefined ? undefined : pack[key];
    if (!text) throw new Error(`wildlife section (${lang}): no text for ${key ?? 'an unregistered string'}`);
    return text;
  };
}
