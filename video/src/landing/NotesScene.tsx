import type React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption } from "../components/Brand";
import { color, font } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

type Answer = "agree" | "important" | "disagree";
const STAMP: Record<Answer, { label: string; bg: string; fg: string; border: string; rot: number; dx: number; dy: number }> = {
  agree: { label: "Concordo", bg: color.green, fg: color.white, border: color.white, rot: -5, dx: 1, dy: 0 },
  important: { label: "Importante ×2", bg: color.lime, fg: color.ink, border: color.white, rot: -3, dx: 0, dy: -1 },
  disagree: { label: "Discordo", bg: color.white, fg: color.ink, border: color.ink, rot: 5, dx: -1, dy: 0 },
};

// One sticky note: rises from the pad, gets stamped, peels from its free bottom edge and leaves in the answer's direction.
const Note: React.FC<{ readonly topic: string; readonly text: string; readonly answer: Answer }> = ({ topic, text, answer }) => {
  const frame = useCurrentFrame();
  const s = STAMP[answer];
  const rise = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: ease });
  const peel = interpolate(frame, [16, 24], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const fly = interpolate(frame, [24, 40], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color.white,
        borderRadius: "4px 4px 10px 10px",
        padding: "30px 36px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 0 1px rgba(23,61,47,.08), 0 30px 28px -24px rgba(23,61,47,.55)",
        transformOrigin: "50% 0",
        transform: `translate(${(1 - rise) * 12 + fly * s.dx * 760}px, ${(1 - rise) * 10 + fly * (s.dy * 520 - 40)}px) perspective(900px) rotateX(${peel * 12}deg) rotate(${(1 - rise) * 2.2 - 0.6 + fly * (s.dx * 18 || -5)}deg)`,
        opacity: 1 - fly,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: font.mono, fontSize: 18, color: color.green }}>
        <span>{topic}</span>
        <span style={{ color: color.muted }}>Autoria oculta</span>
      </div>
      <div style={{ margin: "auto 0", fontFamily: font.body, fontWeight: 700, fontSize: 44, lineHeight: 1.15, color: color.ink, letterSpacing: "-0.02em" }}>{text}</div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -26,
          translate: "-50% 0",
          rotate: `${s.rot}deg`,
          padding: "12px 26px 13px",
          background: s.bg,
          color: s.fg,
          border: `4px solid ${s.border}`,
          borderRadius: 16,
          fontFamily: font.display,
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          boxShadow: "0 12px 20px -10px rgba(23,61,47,.6)",
          opacity: interpolate(frame, [9, 13], [0, 1], clamp),
          scale: interpolate(frame, [9, 15], [1.8, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) }),
        }}
      >
        {s.label}
      </div>
    </div>
  );
};

// Proposals both candidates support, so the demo never leans to one side.
export const NotesScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: color.paper }}>
      <Caption
        label="Às cegas"
        style={{ position: "absolute", left: 80, top: 200, width: 420 }}
        steps={[
          { from: 0, text: "Leia 25 propostas sem saber de quem é." },
          { from: 72, text: "Concorde, discorde ou marque Importante." },
        ]}
        note="O nome de quem propôs cada ideia só aparece no final."
      />
      <div style={{ position: "absolute", left: 580, top: 170, width: 600, height: 370 }}>
        <div style={{ position: "absolute", inset: 0, background: color.note3, borderRadius: "4px 4px 10px 10px", transform: "translate(-12px,16px) rotate(-2.4deg)", boxShadow: "0 0 0 1px rgba(23,61,47,.08)" }} />
        <div style={{ position: "absolute", inset: 0, background: color.note2, borderRadius: "4px 4px 10px 10px", transform: "translate(12px,9px) rotate(1.8deg)", boxShadow: "0 0 0 1px rgba(23,61,47,.08)" }} />
        <Sequence name="Nota 1" from={4} durationInFrames={44} premountFor={fps}>
          <Note topic="Saúde e educação" text="Ter mais escolas públicas em tempo integral." answer="agree" />
        </Sequence>
        <Sequence name="Nota 2" from={40} durationInFrames={44} premountFor={fps}>
          <Note topic="Costumes" text="Usar tornozeleira eletrônica em agressores proibidos de chegar perto da mulher." answer="important" />
        </Sequence>
        <Sequence name="Nota 3" from={76} durationInFrames={44} premountFor={fps}>
          <Note topic="Meio ambiente" text="Procurar e extrair petróleo e gás em novas áreas do Brasil." answer="disagree" />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
