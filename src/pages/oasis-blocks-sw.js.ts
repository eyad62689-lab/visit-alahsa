import type { APIRoute } from 'astro';
import { LEVELS } from '../data/play-blocks';
import { BLOCKS_ALT } from '../lib/routes';

const version = Date.now().toString(36);
const pages = Object.values(BLOCKS_ALT).map(path => encodeURI(path));
const icons = ['/icon-192.png', '/icon-512.png', '/maskable-512.png'];
const images = LEVELS.flatMap(({ img }) => [400, 800].map(width => `/img/${img}-${width}w.webp`));
const manifests = ['ar', 'en'].map(lang => `/oasis-blocks/manifest.${lang}.webmanifest`);

export const GET: APIRoute = () => new Response(`
const prefix = 'oasis-blocks-';
const cacheName = prefix + ${JSON.stringify(version)};
const pages = ${JSON.stringify(pages)};
const precache = ${JSON.stringify([...images, ...icons, ...manifests])};
const scope = new URL(self.registration.scope).pathname;

const asset = path => /^\\/(_astro|fonts|img)\\//.test(path) || precache.includes(path);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName)
    .then(cache => cache.addAll([...precache, scope]))
    .then(() => self.skipWaiting())
    .catch(error => {
      console.error('Oasis Blocks offline installation failed', error);
      throw error;
    }));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys
      .filter(key => key.startsWith(prefix) && key !== cacheName)
      .map(key => caches.delete(key))))
    .then(() => self.clients.claim())
    .catch(error => {
      console.error('Oasis Blocks offline activation failed', error);
      throw error;
    }));
});

async function fetchAndCache(request, cache, key) {
  const response = await fetch(request);
  if (response.ok && new URL(response.url).origin === self.location.origin) {
    await cache.put(key, response.clone()).catch(() => {});
  }
  return response;
}

async function navigation(request) {
  const cache = await caches.open(cacheName);
  try {
    return await fetchAndCache(request, cache, scope);
  } catch {
    return (await cache.match(scope)) || Response.error();
  }
}

async function resource(request) {
  const cache = await caches.open(cacheName);
  return (await cache.match(request)) || await fetchAndCache(request, cache, request);
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate' && pages.includes(scope) && url.pathname === scope) {
    event.respondWith(navigation(request).catch(() => fetch(request).catch(() => Response.error())));
  } else if (asset(url.pathname)) {
    event.respondWith(resource(request).catch(() => Response.error()));
  }
});

self.addEventListener('message', event => {
  if (event.data?.type !== 'cache-resources' || !Array.isArray(event.data.urls)) return;
  if (!event.source || new URL(event.source.url).pathname !== scope) return;
  const urls = [...new Set(event.data.urls)].filter(value => {
    if (typeof value !== 'string' || !URL.canParse(value)) return false;
    const url = new URL(value);
    return url.origin === self.location.origin && asset(url.pathname);
  });
  event.waitUntil(Promise.allSettled(urls.map(url => resource(url))).catch(() => {}));
});
`, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
