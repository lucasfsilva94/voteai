import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame, PhoneFrame, ScreenStack } from "../components/Devices";
import { color, font } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// One result per person: the desktop urn types 22, the phone types 13, then both reveal.
const steps = (prefix: string) => [
  { src: `${prefix}-urn-0.png`, from: 0 },
  { src: `${prefix}-urn-1.png`, from: 26 },
  { src: `${prefix}-urn-2.png`, from: 50 },
  { src: `${prefix}-urn-3.png`, from: 74 },
  { src: `${prefix}-urn-4.png`, from: 102 },
  { src: `${prefix}-result.png`, from: 128 },
];

export const UrnScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Zoom into the urn while it types; back out for the result.
  const zoom = (max: number) => interpolate(frame, [4, 22, 122, 134], [1, max, max, 1], { ...clamp, easing: ease });
  const heading = frame < 102 ? "A urna digita o número, um dígito por vez." : frame < 128 ? "Mostra o candidato e confirma." : "E revela a sua afinidade.";
  const headingFrom = frame < 102 ? 0 : frame < 128 ? 102 : 128;
  return (
    <AbsoluteFill style={{ background: color.paper }}>
      <div
        style={{
          position: "absolute",
          top: 44,
          width: "100%",
          textAlign: "center",
          fontFamily: font.display,
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: "-0.03em",
          color: color.ink,
          opacity: interpolate(frame - headingFrom, [0, 8], [0, 1], clamp),
          translate: interpolate(frame - headingFrom, [0, 10], ["0px 12px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        {heading}
      </div>
      <BrowserFrame width={680} style={{ position: "absolute", left: 120, top: 150 }}>
        <div style={{ position: "absolute", inset: 0, scale: zoom(1.55), transformOrigin: "50% 54%" }}>
          <ScreenStack shots={steps("d")} />
        </div>
      </BrowserFrame>
      <PhoneFrame height={520} style={{ position: "absolute", left: 880, top: 150 }}>
        <ScreenStack shots={steps("m")} />
      </PhoneFrame>
    </AbsoluteFill>
  );
};
