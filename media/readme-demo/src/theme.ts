import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// voteAI palette and type, matching dist/styles.css.
export const color = {
  paper: "#f6f5ee",
  sage: "#e4e9dd",
  green: "#194b39",
  greenDeep: "#123a2b",
  lime: "#c8ee57",
  ink: "#173d2f",
  muted: "#59695e",
  white: "#fffef9",
};

export const font = {
  body: "DM Sans",
  display: "Fraunces",
};

loadFont({ family: font.body, url: staticFile("fonts/dm-sans.ttf"), weight: "400" });
loadFont({ family: font.body, url: staticFile("fonts/dm-sans-bold.ttf"), weight: "700" });
loadFont({ family: font.display, url: staticFile("fonts/fraunces.ttf"), weight: "600" });
loadFont({ family: font.display, url: staticFile("fonts/fraunces-italic.ttf"), weight: "600", style: "italic" });

// Screenshot sizes (CSS pixels) and the button centres measured while capturing them.
export const desktopShot = { width: 1280, height: 900 };
export const mobileShot = { width: 390, height: 844 };
export const targets = {
  d: { cta: { x: 193, y: 603 }, agree: { x: 803, y: 773 }, important: { x: 477, y: 843 } },
  m: { cta: { x: 195, y: 338 }, agree: { x: 285, y: 735 }, important: { x: 106, y: 801 } },
};
