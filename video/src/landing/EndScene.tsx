import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandMark } from "../components/Brand";
import { color, font } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const Chip: React.FC<{ readonly children: React.ReactNode; readonly at: number }> = ({ children, at }) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        padding: "10px 18px",
        borderRadius: 999,
        background: color.greenDeep,
        color: color.white,
        fontFamily: font.mono,
        fontSize: 20,
        opacity: interpolate(frame, [at, at + 8], [0, 1], clamp),
        translate: interpolate(frame, [at, at + 12], ["0px 12px", "0px 0px"], { ...clamp, easing: ease }),
      }}
    >
      {children}
    </span>
  );
};

// Closing card; it clears back to plain green so the loop restarts on the first frame.
export const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 0.5 * fps, durationInFrames - 2], [1, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: color.green, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: out, scale: interpolate(out, [0, 1], [0.95, 1]) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <BrandMark size={84} reversed style={{ scale: interpolate(frame, [0, 12], [0.4, 1], { ...clamp, easing: Easing.spring({ damping: 12 }), output: "perceptual-scale" }) }} />
          <div style={{ fontFamily: font.brand, fontSize: 72, letterSpacing: "-0.035em", color: color.white, lineHeight: 1 }}>
            <b style={{ fontWeight: 700 }}>vote</b>
            <span style={{ fontWeight: 400 }}>AI</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: 52,
            color: color.white,
            opacity: interpolate(frame, [6, 16], [0, 1], clamp),
          }}
        >
          Vote nas ideias. <span style={{ color: color.lime }}>Descubra os nomes.</span>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 34 }}>
          <Chip at={18}>2º turno · 25/10</Chip>
          <Chip at={24}>Cerca de 3 minutos</Chip>
          <Chip at={30}>Sem cadastro</Chip>
        </div>
      </div>
    </AbsoluteFill>
  );
};
