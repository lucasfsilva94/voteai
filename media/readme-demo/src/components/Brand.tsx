import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { color, font } from "../theme";

// The "Urna" brand mark (brand/logos/concept-1-urna).
// `reversed` swaps the fills for use on the green field.
export const BrandMark: React.FC<{ readonly size: number; readonly reversed?: boolean; readonly style?: React.CSSProperties }> = ({ size, reversed, style }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={style}>
    <rect width="64" height="64" rx="15" fill={reversed ? color.lime : color.green} />
    <rect x="17" y="11" width="30" height="5.5" rx="2.75" fill={reversed ? color.greenDeep : color.lime} />
    <path d="M18.5 36 28.5 46 46.5 26.5" fill="none" stroke={reversed ? color.greenDeep : color.lime} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Caption block beside a device: a short heading that swaps per step, plus one supporting line.
export const Caption: React.FC<{
  readonly label: string;
  readonly steps: readonly { readonly from: number; readonly text: string }[];
  readonly note?: string;
  readonly style?: React.CSSProperties;
}> = ({ label, steps, note, style }) => {
  const frame = useCurrentFrame();
  const active = [...steps].reverse().find((s) => frame >= s.from) ?? steps[0];
  const local = frame - active.from;
  return (
    <div style={{ fontFamily: font.body, color: color.ink, ...style }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: color.green, background: color.sage, borderRadius: 999, padding: "6px 14px" }}>{label}</div>
      <div
        style={{
          fontFamily: font.display,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          marginTop: 22,
          minHeight: 150,
          opacity: interpolate(local, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(local, [0, 10], ["0px 14px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        {active.text}
      </div>
      {note ? <div style={{ fontSize: 20, lineHeight: 1.45, color: color.muted, marginTop: 8 }}>{note}</div> : null}
    </div>
  );
};
