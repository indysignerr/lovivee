import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, "..", "public", "logo.avif");
const outPath = path.join(__dirname, "..", "public", "logo.png");

// Aggressive cutoff: anything with min(R,G,B) >= 200 → fully transparent
// Soft fade between 160 and 200 to keep anti-aliasing on letter edges
const HARD_CUTOFF = 200;
const SOFT_START = 160;

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
  const minChan = Math.min(r, g, b);

  if (minChan >= HARD_CUTOFF) {
    result[i + 3] = 0;
  } else if (minChan >= SOFT_START) {
    const fade = (minChan - SOFT_START) / (HARD_CUTOFF - SOFT_START);
    result[i + 3] = Math.round(255 * (1 - fade));
  }
}

await sharp(result, { raw: { width, height, channels } })
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath);

console.log(`Saved ${outPath} (${width}×${height}) — transparent bg, cutoff=${HARD_CUTOFF}.`);
