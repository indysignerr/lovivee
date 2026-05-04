import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcLogo = path.join(__dirname, "..", "public", "logo.png");
const publicDir = path.join(__dirname, "..", "public");

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

const CREAM = { r: 250, g: 248, b: 243, alpha: 1 };

const logoBuffer = await sharp(srcLogo).toBuffer();
const meta = await sharp(logoBuffer).metadata();

for (const { name, size } of sizes) {
  const padding = Math.round(size * 0.12);
  const innerSize = size - padding * 2;

  // Resize the logo to fit centered
  const scale = Math.min(innerSize / meta.width, innerSize / meta.height);
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const resized = await sharp(logoBuffer).resize(w, h, { fit: "contain" }).toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: CREAM },
  })
    .composite([{ input: resized, top: Math.round((size - h) / 2), left: Math.round((size - w) / 2) }])
    .png({ quality: 95 })
    .toFile(path.join(publicDir, name));
}

// favicon.ico — multi-size 16/32/48 PNGs concatenated as ICO
// Use sharp to make 32×32 PNG and write as .ico (browsers happily accept PNG content)
const ico = await sharp(logoBuffer)
  .resize(32, 32, { fit: "contain", background: CREAM })
  .flatten({ background: CREAM })
  .png({ quality: 95 })
  .toBuffer();

// Write a true ICO file (single 32x32 entry) by wrapping the PNG in ICO header
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(1, 4); // 1 image

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(32, 0); // width
dirEntry.writeUInt8(32, 1); // height
dirEntry.writeUInt8(0, 2);  // colors (0 for >256)
dirEntry.writeUInt8(0, 3);  // reserved
dirEntry.writeUInt16LE(1, 4); // color planes
dirEntry.writeUInt16LE(32, 6); // bpp
dirEntry.writeUInt32LE(ico.length, 8); // size of image data
dirEntry.writeUInt32LE(22, 12); // offset (header 6 + dirEntry 16)

import fs from "fs";
fs.writeFileSync(path.join(publicDir, "favicon.ico"), Buffer.concat([header, dirEntry, ico]));

// Web manifest
const manifest = {
  name: "L'Ovive — Pizzeria & Restaurant à Biot",
  short_name: "L'Ovive",
  icons: [
    { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: "#1E2B4F",
  background_color: "#FAF8F3",
  display: "standalone",
  start_url: "/",
};
fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));

console.log("Favicons + apple-touch + manifest generated.");
