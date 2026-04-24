import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, "..", "public", "logo.avif");
const outPath = path.join(__dirname, "..", "public", "logo.png");

const THRESHOLD = 240;

const { data, info } = await sharp(srcPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const result = Buffer.from(data);

for (let i = 0; i < result.length; i += channels) {
  const r = result[i];
  const g = result[i + 1];
  const b = result[i + 2];
  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    result[i + 3] = 0;
  } else {
    const minChan = Math.min(r, g, b);
    if (minChan >= 200) {
      const fade = (minChan - 200) / 40;
      result[i + 3] = Math.round(255 * (1 - fade));
    }
  }
}

await sharp(result, { raw: { width, height, channels } })
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath);

console.log(`Saved ${outPath} (${width}×${height}) with transparent background.`);
