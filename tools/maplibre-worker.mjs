// عامل MapLibre المستضاف ذاتياً — يُنسخ من الحزمة المثبّتة عند كل تشغيل لـAstro، ويُفحص على dist.
//
// MapLibre v6 يحمّل عامله ملفَّ ESM منفصلاً لا يُصدره Vite، فيُستضاف تحت /vendor/ ويُشار إليه
// بـsetWorkerUrl (src/scripts/terrain-map/core.ts). العامل وحزمة الصفحة يجب أن يكونا من إصدار
// واحد: عامل إصدار أقدم مع مكتبة أحدث يُسقط الخريطة التضاريسية بصمت إلى التراجع (Leaflet) والبناء
// أخضر. لذلك لا يُحفظ العامل في المستودع: يُنسخ من node_modules/maplibre-gl/dist إلى
// public/vendor/maplibre-<الإصدار>/ (مجلد باسم الإصدار لأن /vendor/* مخزَّن سنة)، والصفحة تشتق
// المسار من الإصدار نفسه (src/lib/maplibre-worker.ts)، فترقية الحزمة لا تحتاج خطوة يدوية.
//
// ما يُصدَّر:
//   syncWorker(root)        ينسخ الملفات ويحذف مجلدات الإصدارات الأخرى (مولَّدة، خارج المستودع).
//   readInstalled(root)     الإصدار المثبّت وملفات العامل من الحزمة.
//   checkWorker(input)      دالة نقية: تقابل الحزمة بما في dist وبما تشير إليه الصفحات.
//   readDistWorker(...)     قراءة مدخل checkWorker من dist.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const PKG_DIR = 'node_modules/maplibre-gl';
const VENDOR_DIR = 'public/vendor';
const DIR_PREFIX = 'maplibre-';
/** ملف العامل، ثم الملف الذي يستورده بجواره في الإصدارات التي تفصله (فارغ أو غائب في غيرها). */
export const WORKER_FILE = 'maplibre-gl-worker.mjs';
const SIBLING_FILES = ['maplibre-gl-shared.mjs'];
const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?$/;

export const isVersion = (v) => typeof v === 'string' && v.length <= 40 && VERSION.test(v);
export const vendorDirName = (version) => `${DIR_PREFIX}${version}`;
export const workerUrl = (version) => `/vendor/${vendorDirName(version)}/${WORKER_FILE}`;
/** مجلد عامل مولَّد: «maplibre-» يليه إصدار. المجلد «maplibre» (ملحق RTL) ليس منها. */
export const isWorkerDir = (name) => name.startsWith(DIR_PREFIX) && isVersion(name.slice(DIR_PREFIX.length));

/** الإصدار المثبّت وملفات العامل (اسم ← بايتات) من الحزمة. الملف المجاور يُؤخذ إن وُجد غير فارغ. */
export function readInstalled(root) {
  const pkgDir = path.join(root, PKG_DIR);
  const { version } = JSON.parse(readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  if (!isVersion(version)) throw new Error(`إصدار maplibre-gl غير مقروء: ${String(version).slice(0, 40)}`);
  const files = new Map([[WORKER_FILE, readFileSync(path.join(pkgDir, 'dist', WORKER_FILE))]]);
  for (const name of SIBLING_FILES) {
    const p = path.join(pkgDir, 'dist', name);
    if (!existsSync(p)) continue;
    const bytes = readFileSync(p);
    if (bytes.length) files.set(name, bytes);
  }
  return { version, files };
}

/** ينسخ ملفات العامل إلى public/vendor/maplibre-<الإصدار>/ ويحذف مجلدات الإصدارات الأخرى. */
export function syncWorker(root) {
  const { version, files } = readInstalled(root);
  const vendor = path.join(root, VENDOR_DIR);
  const target = path.join(vendor, vendorDirName(version));
  mkdirSync(target, { recursive: true });
  const written = [];
  for (const [name, bytes] of files) {
    const p = path.join(target, name);
    if (existsSync(p) && readFileSync(p).equals(bytes)) continue;
    writeFileSync(p, bytes);
    written.push(name);
  }
  // المجلد مرآة لملفات الحزمة: ما ليس منها يُزال
  for (const name of readdirSync(target)) if (!files.has(name)) rmSync(path.join(target, name), { force: true });
  const removed = readdirSync(vendor).filter((n) => isWorkerDir(n) && n !== vendorDirName(version));
  for (const name of removed) rmSync(path.join(vendor, name), { recursive: true, force: true });
  return { version, written, removed };
}

/** قيمة workerUrl من JSON ضبط الخريطة داخل صفحة مبنية، أو null — مسح خطي. */
export function pageWorkerUrl(html) {
  const key = '"workerUrl":"';
  const at = html.indexOf(key);
  if (at === -1) return null;
  const end = html.indexOf('"', at + key.length);
  return end === -1 ? null : html.slice(at + key.length, end);
}

/**
 * يقابل الحزمة المثبّتة بما نُشر في dist.
 * @param {{
 *   version: string,
 *   source: Map<string, Uint8Array>,          ملفات العامل من الحزمة
 *   vendorDirs: string[],                      أسماء مجلدات dist/vendor
 *   built: Map<string, Uint8Array>,            ملفات dist/vendor/maplibre-<version>/
 *   pages: { rel: string, workerUrl: string | null }[]   الصفحات التي تحمل ضبط الخريطة
 * }} input
 */
export function checkWorker({ version, source, vendorDirs, built, pages }) {
  const problems = [];
  const dir = vendorDirName(version);
  const same = (a, b) => a.length === b.length && Buffer.from(a).equals(Buffer.from(b));
  if (!vendorDirs.includes(dir)) problems.push(`dist/vendor/${dir}/ غائب — الحزمة المثبّتة ${version}`);
  for (const [name, bytes] of source) {
    const got = built.get(name);
    if (!got) problems.push(`dist/vendor/${dir}/${name} غائب`);
    else if (!same(got, bytes)) problems.push(`dist/vendor/${dir}/${name} يخالف ملف الحزمة ${version} (${got.length} بايت مقابل ${bytes.length})`);
  }
  for (const name of built.keys()) if (!source.has(name)) problems.push(`dist/vendor/${dir}/${name} ليس من ملفات عامل الحزمة`);
  const stale = vendorDirs.filter((n) => isWorkerDir(n) && n !== dir);
  if (stale.length) problems.push(`مجلد عامل لإصدار آخر في dist/vendor: ${stale.join('، ')}`);
  if (!pages.length) problems.push('لا صفحة مبنية تحمل ضبط الخريطة التضاريسية (tmap-cfg)');
  const expected = workerUrl(version);
  for (const p of pages) if (p.workerUrl !== expected) problems.push(`${p.rel}: workerUrl «${p.workerUrl}» والمتوقع «${expected}»`);
  return { problems, stats: { version, files: source.size, pages: pages.length } };
}

/** يقرأ من dist ما يحتاجه checkWorker: مجلدات vendor وملفات مجلد الإصدار المثبّت. */
export function readDistWorker(dist, version) {
  const vendor = path.join(dist, 'vendor');
  const vendorDirs = existsSync(vendor) ? readdirSync(vendor) : [];
  const built = new Map();
  const dir = path.join(vendor, vendorDirName(version));
  if (existsSync(dir)) for (const name of readdirSync(dir)) built.set(name, readFileSync(path.join(dir, name)));
  return { vendorDirs, built };
}
