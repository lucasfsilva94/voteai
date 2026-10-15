import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandMark } from "../components/Brand";
import { color, font } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Closing card; it clears back to plain green so the loop restarts on the intro's first frame.
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 0.5 * fps, durationInFrames - 2], [1, 0], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: color.green, alignItems: "center", justifyContent: "center", fontFamily: font.body }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: out, scale: interpolate(out, [0, 1], [0.94, 1]) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <BrandMark size={84} reversed />
          <div style={{ fontSize: 72, letterSpacing: "-0.035em", color: color.white, lineHeight: 1 }}>
            <b style={{ fontWeight: 700 }}>vote</b>
            <span style={{ fontWeight: 400 }}>AI</span>
          </div>
        </div>
        <div style={{ marginTop: 28, fontFamily: font.display, fontWeight: 600, fontSize: 42, letterSpacing: "-0.03em", color: color.white }}>
          Vote nas ideias. <i style={{ color: color.lime }}>Descubra os nomes.</i>
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 26,
            fontWeight: 700,
            color: color.greenDeep,
            background: color.lime,
            borderRadius: 999,
            padding: "14px 28px",
            opacity: interpolate(frame, [0.3 * fps, 0.6 * fps], [0, 1], clamp),
            translate: interpolate(frame, [0.3 * fps, 0.7 * fps], ["0px 14px", "0px 0px"], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          }}
        >
          lucasfsilva94.github.io/voteai
        </div>
      </div>
    </AbsoluteFill>
  );
};
