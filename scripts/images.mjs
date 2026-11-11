// Builds the web images in public/ from the original photo (IMG_2772.JPG, 3024 x 4032) and the logo (public/logo.svg).
// Run with: npm run images
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'IMG_2772.JPG');
const out = (f) => path.join(root, 'public', f);
const logo = out('logo.svg');
mkdirSync(path.join(root, 'public'), { recursive: true });

// ---- logo: favicon and app icons
copyFileSync(logo, out('favicon.svg'));
const icon = (size) => sharp(logo, { density: 1200 }).resize(size, size).png();
await icon(32).toFile(out('favicon-32.png'));
await icon(180).toFile(out('apple-touch-icon.png'));
await icon(512).toFile(out('logo-512.png'));

// Research section: reading the bound thesis (IMG_2689.JPG), 3:4
const thesisSrc = path.join(root, 'IMG_2689.JPG');
if (existsSync(thesisSrc)) {
  const thesis = () => sharp(thesisSrc).rotate().extract({ left: 60, top: 216, width: 2862, height: 3816 });
  await thesis().resize(900, 1200).webp({ quality: 80 }).toFile(out('ahsan-thesis.webp'));
  await thesis().resize(900, 1200).jpeg({ quality: 80, mozjpeg: true }).toFile(out('ahsan-thesis.jpg'));
  await thesis().resize(600, 800).webp({ quality: 78 }).toFile(out('ahsan-thesis-600.webp'));
}

if (!existsSync(src)) {
  console.log('logo icons written; IMG_2772.JPG not found, so the photos were left as they are');
  process.exit(0);
}

const base = () => sharp(src).rotate(); // respect EXIF orientation; output carries no EXIF/GPS metadata

// Hero: 4:5 portrait, head to thesis book
const hero = { left: 202, top: 766, width: 2620, height: 3266 };
await base().extract(hero).resize(1000, 1250).webp({ quality: 80 }).toFile(out('ahsan-hero.webp'));
await base().extract(hero).resize(1000, 1250).jpeg({ quality: 80, mozjpeg: true }).toFile(out('ahsan-hero.jpg'));
await base().extract(hero).resize(500, 625).webp({ quality: 78 }).toFile(out('ahsan-hero-500.webp'));

// Square avatar: face
const face = { left: 790, top: 660, width: 1300, height: 1300 };
await base().extract(face).resize(320, 320).webp({ quality: 80 }).toFile(out('ahsan-avatar.webp'));
await base().extract(face).resize(512, 512).jpeg({ quality: 82, mozjpeg: true }).toFile(out('ahsan-avatar.jpg'));

// Open Graph card 1200 x 630: logo and text on the left, photo on the right
const photo = await base().extract({ left: 302, top: 766, width: 2420, height: 2700 })
  .resize(520, 580).jpeg({ quality: 85 }).toBuffer();
const badge = await icon(72).toBuffer();
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A0A0B"/>
  <rect x="610" y="0" width="590" height="630" fill="#C6F135"/>
  <text x="152" y="88" font-family="Consolas, monospace" font-size="22" fill="#C6F135">$ curl localhost:1027/api/v1/me</text>
  <text x="64" y="255" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="96" fill="#EDEDEA" letter-spacing="-3">Ahsan</text>
  <text x="64" y="355" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="96" fill="#EDEDEA" letter-spacing="-3">Habib<tspan fill="#C6F135">.</tspan></text>
  <text x="64" y="435" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#EDEDEA">Backend Developer</text>
  <text x="64" y="483" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#9A9A96">Java · Spring Boot · Node.js · PostgreSQL</text>
  <text x="64" y="566" font-family="Consolas, monospace" font-size="22" fill="#9A9A96">Dhaka, Bangladesh</text>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([{ input: badge, left: 64, top: 44 }, { input: photo, left: 650, top: 25 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out('og-image.jpg'));

console.log('images written to public/');
