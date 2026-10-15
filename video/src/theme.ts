import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// voteAI palette and type, matching src/styles/tokens.css.
export const color = {
  paper: "#f6f5ee",
  sage: "#e4e9dd",
  green: "#194b39",
  greenDeep: "#123a2b",
  lime: "#c8ee57",
  limeSoft: "#e2efbb",
  ink: "#173d2f",
  muted: "#59695e",
  white: "#fffef9",
  note2: "#f1f3ea",
  note3: "#e7eadf",
  lcd: "#e8eee0",
};

// Same roles as the site: Fredoka for titles and buttons, Rubik for text, DotGothic16 on the urn display,
// IBM Plex Mono for small labels. The wordmark is an outlined SVG (Wordmark in components/Brand.tsx).
export const font = {
  display: "Fredoka",
  body: "Rubik",
  pixel: "DotGothic16",
  mono: "IBM Plex Mono",
};

loadFont({ family: font.display, url: staticFile("fonts/fredoka-latin.woff2"), weight: "300 700" });
loadFont({ family: font.body, url: staticFile("fonts/rubik-latin.woff2"), weight: "300 900" });
loadFont({ family: font.pixel, url: staticFile("fonts/dotgothic16-latin.woff2"), weight: "400" });
loadFont({ family: font.mono, url: staticFile("fonts/ibmplexmono-500-latin.woff2"), weight: "500" });

// Screenshot sizes (CSS pixels) and the button centres measured while capturing them (public/shots/rects.json).
export const desktopShot = { width: 1280, height: 900 };
export const mobileShot = { width: 390, height: 844 };
export const targets = {
  d: { agree: { x: 803, y: 790 }, important: { x: 477, y: 860 } },
  m: { agree: { x: 285, y: 735 }, important: { x: 106, y: 801 } },
};
