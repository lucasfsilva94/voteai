// Copies the site's fonts and portraits into public/ so the videos use exactly what dist/ ships.
// The copies are git-ignored; run this before `remotion studio` or `remotion render` (the npm scripts do).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.resolve(root, '../dist/assets');
const copies = {
  fonts: ['fonts/rubik-latin.woff2', 'fonts/fredoka-latin.woff2', 'fonts/dotgothic16-latin.woff2', 'fonts/ibmplexmono-500-latin.woff2'],
  portraits: ['flavio.jpg', 'lula.jpg'],
};

for (const [dir, files] of Object.entries(copies)) {
  const target = path.join(root, 'public', dir);
  fs.mkdirSync(target, { recursive: true });
  for (const file of files) fs.copyFileSync(path.join(assets, file), path.join(target, path.basename(file)));
  console.log(`${files.length} arquivos em public/${dir}`);
}
