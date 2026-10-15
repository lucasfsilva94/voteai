import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame, Cursor, PhoneFrame, phoneScreenWidth, ScreenStack, Taps } from "../components/Devices";
import { color, desktopShot, font, mobileShot, targets } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const BROWSER_W = 700;
const PHONE_H = 540;

// The same quiz on both screens: the cursor answers on the computer, the thumb on the phone.
export const DevicesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = frame < 74 ? "No computador ou no celular." : "Um toque por proposta, sem rolagem.";
  const from = frame < 74 ? 0 : 74;
  return (
    <AbsoluteFill style={{ background: color.paper }}>
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: font.display,
          fontWeight: 700,
          fontSize: 46,
          color: color.ink,
          opacity: interpolate(frame - from, [0, 8], [0, 1], clamp),
          translate: interpolate(frame - from, [0, 10], ["0px 12px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        {heading}
      </div>
      <BrowserFrame width={BROWSER_W} style={{ position: "absolute", left: 90, top: 140 }}>
        <ScreenStack
          shots={[
            { src: "d-quiz-1.png", from: 0 },
            { src: "d-quiz-2.png", from: 58 },
            { src: "d-quiz-3.png", from: 112 },
          ]}
        />
        <Cursor
          scale={BROWSER_W / desktopShot.width}
          clicks={[46, 100]}
          keys={[
            { f: 0, x: 640, y: 420 },
            { f: 38, x: targets.d.agree.x, y: targets.d.agree.y },
            { f: 60, x: targets.d.agree.x, y: targets.d.agree.y },
            { f: 92, x: targets.d.important.x, y: targets.d.important.y },
            { f: 150, x: targets.d.important.x + 60, y: targets.d.important.y - 120 },
          ]}
        />
      </BrowserFrame>
      <PhoneFrame height={PHONE_H} style={{ position: "absolute", left: 880, top: 130 }}>
        <ScreenStack
          shots={[
            { src: "m-quiz-1.png", from: 0 },
            { src: "m-quiz-2.png", from: 66 },
            { src: "m-quiz-3.png", from: 120 },
          ]}
        />
        <Taps
          scale={phoneScreenWidth(PHONE_H) / mobileShot.width}
          taps={[
            { f: 58, x: targets.m.agree.x, y: targets.m.agree.y },
            { f: 112, x: targets.m.important.x, y: targets.m.important.y },
          ]}
        />
      </PhoneFrame>
    </AbsoluteFill>
  );
};
