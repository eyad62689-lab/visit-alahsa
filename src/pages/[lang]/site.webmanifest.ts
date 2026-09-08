// بيان التطبيق لكل لغة غير العربية — الخطوة 2 من خطة التفاعل العالمي.
// كان /site.webmanifest (العربي، start_url على الجذر) هو البيان الوحيد، فمن يثبّت
// الموقع من صفحة إنجليزية أو صينية يعود إلى العربية عند فتحه. العربي يبقى ملفاً
// ثابتاً في public/ كما هو؛ وهنا نظيره لكل من en وzh وde وru بنصوص من قواميسها
// المعتمدة (site.name وhome.hero.lead موجودان في اللغات الخمس) والأيقونات نفسها.
import type { APIRoute, GetStaticPaths } from 'astro';
import type { Lang } from '../../i18n/ui';
import { htmlLang, useTranslations } from '../../i18n/utils';

const LANGS: Lang[] = ['en', 'zh', 'de', 'ru'];

export const getStaticPaths: GetStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const manifest = {
    // الاسم اللاتيني للعلامة ثابت في كل اللغات غير العربية (سياسة الوردمارك)
    name: 'Visit Al-Ahsa',
    short_name: 'Visit Al-Ahsa',
    description: t('home.hero.lead'),
    lang: htmlLang(lang),
    dir: 'ltr',
    id: `/${lang}/`,
    start_url: `/${lang}/`,
    scope: '/',
    display: 'standalone',
    background_color: '#F7F3EA',
    theme_color: '#006E61',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
