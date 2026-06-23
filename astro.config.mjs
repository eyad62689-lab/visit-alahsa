import { defineConfig } from 'astro/config';

// موقع «زوروا الأحساء» — Astro. عربي افتراضي في الجذر، إنجليزي تحت /en/.
export default defineConfig({
  site: 'https://visit-alahsa.com',
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
