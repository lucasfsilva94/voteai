import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Caption } from "../components/Brand";
import { BrowserFrame, Cursor, ScreenStack } from "../components/Devices";
import { color, desktopShot, targets } from "../theme";

const BROWSER_W = 800;
const S = BROWSER_W / desktopShot.width;
const T = targets.d;

// Desktop: start the test, agree with one idea, mark the next as Important.
export const DesktopScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: color.paper }}>
      <Caption
        label="No computador"
        style={{ position: "absolute", left: 60, top: 170, width: 340 }}
        steps={[
          { from: 0, text: "Um clique para começar." },
          { from: 46, text: "Leia a ideia sem saber de quem é." },
          { from: 92, text: "Importante vale o dobro." },
        ]}
        note="Concordo, Discordo, Importante ou Não sei. O nome só aparece no fim."
      />
      <BrowserFrame
        width={BROWSER_W}
        style={{
          position: "absolute",
          left: 432,
          top: 60,
          opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0, 16], ["0px 26px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        <ScreenStack
          shots={[
            { src: "d-landing.png", from: 0 },
            { src: "d-quiz-1.png", from: 46 },
            { src: "d-quiz-2.png", from: 92 },
            { src: "d-quiz-3.png", from: 132 },
          ]}
        />
        <Cursor
          scale={S}
          clicks={[38, 84, 124]}
          keys={[
            { f: 0, x: 700, y: 330 },
            { f: 30, x: T.cta.x, y: T.cta.y },
            { f: 50, x: T.cta.x, y: T.cta.y },
            { f: 76, x: T.agree.x, y: T.agree.y },
            { f: 94, x: T.agree.x, y: T.agree.y },
            { f: 116, x: T.important.x, y: T.important.y },
            { f: 150, x: T.important.x + 40, y: T.important.y - 60 },
          ]}
        />
      </BrowserFrame>
    </AbsoluteFill>
  );
};
