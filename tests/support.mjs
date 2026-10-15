// Shared setup for the browser tests. They run against a built site: `npm run build && npm run preview`.
import { chromium } from 'playwright';
import { createOrder } from '../src/lib/engine.ts';
import { PROPOSALS } from '../src/data/catalog.ts';

export const BASE = process.env.VOTEAI_URL ?? 'http://localhost:4173/voteai/';
export const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
export const launch = (options = {}) => chromium.launch({ executablePath: CHROME, headless: true, ...options });

/** A saved session `index` proposals in, every earlier one answered with `answer`. */
export function session(index, answer = 'agree', revealed = false) {
  const order = createOrder(PROPOSALS);
  return { version: 1, order, answers: Object.fromEntries(order.slice(0, index).map((id) => [id, answer])), index, revealed };
}

/** Stores `value` as the saved session, then opens `path`. */
export async function openWithSession(page, path, value) {
  await page.goto(BASE);
  await page.evaluate((s) => localStorage.setItem('voteai:session:1', JSON.stringify(s)), value);
  await page.goto(BASE + path);
}
