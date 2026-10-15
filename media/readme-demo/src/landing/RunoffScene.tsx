import type React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { color, font } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Same card for both candidates, alphabetical order, grayscale portraits.
const Candidate: React.FC<{ readonly name: string; readonly meta: string; readonly src: string; readonly style: React.CSSProperties }> = ({ name, meta, src, style }) => (
  <div style={{ width: 290, height: 400, boxSizing: "border-box", background: color.white, borderRadius: 20, padding: 12, boxShadow: "0 30px 40px -24px rgba(0,0,0,.55)", ...style }}>
    <Img src={staticFile(`portraits/${src}`)} style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "50% 20%", borderRadius: 12, filter: "grayscale(1) contrast(1.04)" }} />
    <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 28, color: color.ink, marginTop: 12, lineHeight: 1.1, whiteSpace: "nowrap" }}>{name}</div>
    <div style={{ fontFamily: font.mono, fontSize: 17, color: color.muted, marginTop: 4 }}>{meta}</div>
  </div>
);

// Opens on plain green (the last frame of the video is the same green, so the loop has no seam).
export const RunoffScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: color.green, alignItems: "center", fontFamily: font.body }}>
      <div
        style={{
          marginTop: 46,
          fontFamily: font.display,
          fontWeight: 600,
          fontSize: 32,
          color: color.lime,
          opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0, 0.4 * fps], ["0px -14px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        2º turno para presidente · 25 de outubro de 2026
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 34, marginTop: 34 }}>
        <Candidate
          name="Flávio Bolsonaro"
          meta="PL · 22"
          src="flavio.jpg"
          style={{
            opacity: interpolate(frame, [0.2 * fps, 0.55 * fps], [0, 1], clamp),
            translate: interpolate(frame, [0.2 * fps, 0.8 * fps], ["-120px 0px", "0px 0px"], { ...clamp, easing: ease }),
            rotate: interpolate(frame, [0.2 * fps, 0.8 * fps], ["-6deg", "-2deg"], { ...clamp, easing: ease }),
          }}
        />
        <div
          style={{
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: 84,
            color: color.lime,
            scale: interpolate(frame, [0.75 * fps, 1.05 * fps], [0.2, 1], { ...clamp, easing: Easing.spring({ damping: 10 }), output: "perceptual-scale" }),
            opacity: interpolate(frame, [0.75 * fps, 0.9 * fps], [0, 1], clamp),
          }}
        >
          ×
        </div>
        <Candidate
          name="Lula"
          meta="PT · 13"
          src="lula.jpg"
          style={{
            opacity: interpolate(frame, [0.25 * fps, 0.6 * fps], [0, 1], clamp),
            translate: interpolate(frame, [0.25 * fps, 0.85 * fps], ["120px 0px", "0px 0px"], { ...clamp, easing: ease }),
            rotate: interpolate(frame, [0.25 * fps, 0.85 * fps], ["6deg", "2deg"], { ...clamp, easing: ease }),
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: font.display,
          fontWeight: 700,
          fontSize: 46,
          color: color.white,
          opacity: interpolate(frame, [1.4 * fps, 1.75 * fps], [0, 1], clamp),
          translate: interpolate(frame, [1.4 * fps, 1.9 * fps], ["0px 18px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        Antes dos nomes, que tal conhecer as <span style={{ color: color.lime }}>ideias</span>?
      </div>
    </AbsoluteFill>
  );
};
