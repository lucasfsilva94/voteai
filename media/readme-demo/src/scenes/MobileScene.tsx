import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Caption } from "../components/Brand";
import { PhoneFrame, phoneScreenWidth, ScreenStack, Taps } from "../components/Devices";
import { color, mobileShot, targets } from "../theme";

const PHONE_H = 650;
const SCREEN_W = phoneScreenWidth(PHONE_H);
const S = SCREEN_W / mobileShot.width;
const T = targets.m;

// Phone: the whole vote fits one screen, answered with the thumb.
export const MobileScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: color.paper }}>
      <Caption
        label="No celular"
        style={{ position: "absolute", left: 120, top: 190, width: 520 }}
        steps={[
          { from: 0, text: "Toque para começar." },
          { from: 38, text: "Tudo cabe na tela, sem rolagem." },
          { from: 78, text: "Um toque por proposta." },
        ]}
        note="Pergunta, contexto e as quatro respostas sempre ao alcance do polegar."
      />
      <PhoneFrame
        height={PHONE_H}
        style={{
          position: "absolute",
          left: 780,
          top: 35,
          opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0, 18], ["0px 40px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        <ScreenStack
          shots={[
            { src: "m-landing.png", from: 0 },
            { src: "m-quiz-1.png", from: 38 },
            { src: "m-quiz-2.png", from: 78 },
            { src: "m-quiz-3.png", from: 112 },
          ]}
        />
        <Taps
          scale={S}
          taps={[
            { f: 30, x: T.cta.x, y: T.cta.y },
            { f: 70, x: T.agree.x, y: T.agree.y },
            { f: 104, x: T.important.x, y: T.important.y },
          ]}
        />
      </PhoneFrame>
    </AbsoluteFill>
  );
};
