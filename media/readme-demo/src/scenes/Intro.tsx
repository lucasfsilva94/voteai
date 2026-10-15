import type React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BrandMark } from "../components/Brand";
import { color, font } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Opens on plain green (the same frame the outro ends on, so the loop has no seam).
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: color.green, alignItems: "center", justifyContent: "center", fontFamily: font.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <BrandMark
          size={112}
          reversed
          style={{
            scale: interpolate(frame, [0, 0.5 * fps], [0, 1], { ...clamp, easing: Easing.spring({ damping: 12 }) }),
            rotate: interpolate(frame, [0, 0.5 * fps], ["-18deg", "0deg"], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          }}
        />
        <div
          style={{
            fontFamily: font.brand,
            fontSize: 96,
            letterSpacing: "-0.035em",
            color: color.white,
            lineHeight: 1,
            opacity: interpolate(frame, [0.25 * fps, 0.6 * fps], [0, 1], clamp),
            translate: interpolate(frame, [0.25 * fps, 0.75 * fps], ["-24px 0px", "0px 0px"], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          }}
        >
          <b style={{ fontWeight: 700 }}>vote</b>
          <span style={{ fontWeight: 400 }}>AI</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 34,
          fontFamily: font.display,
          fontWeight: 700,
          fontSize: 46,
          letterSpacing: "-0.01em",
          color: color.white,
          opacity: interpolate(frame, [0.65 * fps, 1 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.65 * fps, 1.1 * fps], ["0px 18px", "0px 0px"], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        Primeiro as ideias. <span style={{ color: color.lime }}>Depois os nomes.</span>
      </div>
    </AbsoluteFill>
  );
};
