// مسار عامل MapLibre المستضاف ذاتياً — مشتق من إصدار الحزمة المثبّتة.
// الملفات نفسها يولّدها tools/maplibre-worker.mjs في public/vendor/maplibre-<الإصدار>/ عند كل
// تشغيل لـAstro (تكامل maplibre-worker في astro.config.mjs)، وفاحص التضارب يقابل المسار والملفات
// بالحزمة على dist. process.cwd() لا import.meta.url: الأخير يشير إلى الملف المُجمَّع وقت البناء.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const { version } = JSON.parse(readFileSync(join(process.cwd(), 'node_modules', 'maplibre-gl', 'package.json'), 'utf8')) as { version: string };

export const MAPLIBRE_WORKER_URL = `/vendor/maplibre-${version}/maplibre-gl-worker.mjs`;
