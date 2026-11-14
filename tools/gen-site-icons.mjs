// Site icons (favicon, apple-touch, PWA, maskable, schema logo) from the bulbul emblem.
// Source: tools/assets/bulbul-emblem.png — the emblem cropped from the brand end card,
// background flattened to the emblem teal. Run: node tools/gen-site-icons.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'tools/assets/bulbul-emblem.png');
const OUT = path.join(ROOT, 'public');
const TEAL = { r: 12, g: 80, b: 78, alpha: 1 }; // #0C504E — the emblem's own field

async function tile(size, scale = 1, radius = 0) {
  const inner = Math.round(size * scale);
  const emblem = await sharp(SRC).resize(inner, inner, { kernel: 'lanczos3' }).png().toBuffer();
  const off = Math.round((size - inner) / 2);
  let img = sharp({ create: { width: size, height: size, channels: 4, background: TEAL } })
    .composite([{ input: emblem, left: off, top: off }]);
  if (radius) {
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
    );
    img = sharp(await img.png().toBuffer()).composite([{ input: mask, blend: 'dest-in' }]);
  }
  // flat illustration: a 96-colour palette keeps it visually identical at a fraction of the size
  return img.png({ palette: true, colours: 96, compressionLevel: 9 }).toBuffer();
}

/** ICO whose entries are PNG images (supported by every current browser). */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach(({ size, png }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += png.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

const files = {
  'icon-512.png': await tile(512),
  'icon-192.png': await tile(192),
  'apple-touch-icon.png': await tile(180),
  // maskable: the emblem kept inside the 80% safe circle
  'maskable-512.png': await tile(512, 0.64),
};
for (const [name, buf] of Object.entries(files)) await writeFile(path.join(OUT, name), buf);

const fav16 = await tile(16, 1, 3);
const fav32 = await tile(32, 1, 6);
await writeFile(path.join(OUT, 'favicon.ico'), ico([{ size: 16, png: fav16 }, { size: 32, png: fav32 }]));

const fav128 = await sharp(await tile(128, 1, 22)).png({ palette: true, colours: 64, compressionLevel: 9 }).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" role="img" aria-label="زوروا الأحساء"><image width="128" height="128" href="data:image/png;base64,${fav128.toString('base64')}"/></svg>\n`;
await writeFile(path.join(OUT, 'favicon.svg'), svg);

console.log('icons written:', [...Object.keys(files), 'favicon.ico', 'favicon.svg'].join(', '));
