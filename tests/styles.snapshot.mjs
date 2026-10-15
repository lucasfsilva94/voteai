// Computed-style snapshot of every element on every route, for refactors that must not change how the site looks.
// Usage, against `npm run preview`: node tests/styles.snapshot.mjs <out.json>, then again after the change and
// node tests/styles.snapshot.mjs --diff <before.json> <after.json>.
import { readFileSync, writeFileSync } from 'node:fs';
import { BASE, launch, openWithSession, session } from './support.mjs';

if (process.argv[2] === '--diff') {
  const [before, after] = process.argv.slice(3).map((f) => JSON.parse(readFileSync(f, 'utf8')));
  let count = 0;
  for (const state of Object.keys(before)) {
    const a = before[state], b = after[state] ?? {};
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[key] === b[key]) continue;
      const pa = Object.fromEntries((a[key] ?? '').split('\n').map((l) => l.split('\t')));
      const pb = Object.fromEntries((b[key] ?? '').split('\n').map((l) => l.split('\t')));
      const props = [...new Set([...Object.keys(pa), ...Object.keys(pb)])].filter((p) => pa[p] !== pb[p]);
      if (count++ < 60) console.log(`${state} ${key}\n  ${props.map((p) => `${p}: ${pa[p]} -> ${pb[p]}`).join('\n  ')}`);
    }
  }
  console.log(count ? `${count} elements differ` : 'No computed-style differences.');
  process.exit(count ? 1 : 0);
}

// Same proposal order and tilt on every run: seed Math.random here (for session()) and in the page.
const seeded = (seed) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const SIZES = [[1700, 1000], [1440, 900], [1000, 800], [800, 900], [390, 844], [390, 560], [320, 640]];
const STATES = [
  ['home', (page) => page.goto(BASE)],
  ['quiz', (page) => openWithSession(page, 'teste', session(0))],
  ['quiz-mid', (page) => openWithSession(page, 'teste', session(24, 'important'))],
  ['urn', (page) => openWithSession(page, 'urna', session(50, 'agree'))],
  ['result', (page) => openWithSession(page, 'resultado', session(50, 'agree', true))],
  ['sources', (page) => page.goto(BASE + 'fontes')],
];

const browser = await launch();
const out = {};
try {
  for (const [width, height] of SIZES) {
    for (const [name, open] of STATES) {
      Math.random = seeded(1);
      const page = await browser.newPage({ viewport: { width, height } });
      await page.addInitScript(`Math.random = (${seeded})(1)`);
      await open(page);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      out[`${name}@${width}x${height}`] = await page.evaluate(() => {
        // Freeze motion so both runs read the same frame.
        for (const a of document.getAnimations()) {
          if (a.effect?.getComputedTiming().iterations === Infinity) { a.pause(); a.currentTime = 0; } else a.finish();
        }
        const path = (el) => {
          const parts = [];
          for (; el && el !== document.documentElement; el = el.parentElement) {
            parts.unshift(`${el.tagName.toLowerCase()}:${[...el.parentElement.children].indexOf(el)}`);
          }
          return parts.join('>');
        };
        const read = (style) => [...style].filter((p) => !p.startsWith('--')).map((p) => `${p}\t${style.getPropertyValue(p)}`).join('\n');
        const result = {};
        for (const el of document.querySelectorAll('body, body *')) {
          const key = `${path(el)}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''}`;
          result[key] = read(getComputedStyle(el));
          for (const pseudo of ['::before', '::after']) {
            const s = getComputedStyle(el, pseudo);
            if (s.content !== 'none' && s.content !== 'normal') result[key + pseudo] = read(s);
          }
        }
        return result;
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
}
writeFileSync(process.argv[2], JSON.stringify(out));
console.log(`Captured ${Object.keys(out).length} states.`);
