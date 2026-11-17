import { defineConfig } from 'astro/config';
import { syncWorker } from './tools/maplibre-worker.mjs';

// صفحات للتطوير المحلي فقط: تُحقن في `astro dev` وحده ولا تدخل البناء المنشور.
const devOnlyPages = {
  name: 'dev-only-pages',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({ pattern: '/brand', entrypoint: './src/dev-pages/brand.astro' });
    },
  },
};

// عامل MapLibre المستضاف ذاتياً: يُنسخ من الحزمة المثبّتة إلى public/vendor/maplibre-<الإصدار>/
// قبل أي تشغيل (dev وbuild)، فلا يفترق إصداره عن إصدار المكتبة عند ترقيتها.
const maplibreWorker = {
  name: 'maplibre-worker',
  hooks: {
    'astro:config:setup': () => { syncWorker(process.cwd()); },
  },
};

// موقع «زوروا الأحساء» — Astro. عربي افتراضي في الجذر، إنجليزي تحت /en/.
export default defineConfig({
  site: 'https://visit-alahsa.com',
  integrations: [devOnlyPages, maplibreWorker],
  // تضمين كل CSS داخل الصفحة (الخطوة 3 من خطة التفاعل العالمي): كان Astro يقسم CSS
  // إلى ملفات صغيرة لكل مكوّن (PalmMotif وFooter وHomeView… 3–5 كيلوبايت لكل ملف)
  // فتحجب كل صفحة 3 طلبات قبل الرسم الأول — Lighthouse 2026-09-08: توفير مقدَّر
  // 410 مللي ثانية على /en/. مع ClientRouter لا تُعاد قراءة CSS بين التنقلات أصلاً،
  // فخسارة التخزين المؤقت للملفات المنفصلة لا تعوّض تكلفة الطلبات الحاجبة.
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
