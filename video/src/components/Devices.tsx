import type React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { color, desktopShot, font, mobileShot } from "../theme";

export type Shot = { readonly src: string; readonly from: number };

// Stack of real screenshots; each one cross-fades in at its `from` frame.
export const ScreenStack: React.FC<{ readonly shots: readonly Shot[]; readonly fade?: number }> = ({ shots, fade = 6 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {shots.map((shot, i) => (
        <Img
          key={shot.src}
          src={staticFile(`shots/${shot.src}`)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            opacity: i === 0 ? 1 : interpolate(frame, [shot.from, shot.from + fade], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        />
      ))}
    </>
  );
};

// A plain browser window: three dots and the address bar, then the page.
export const BrowserFrame: React.FC<{ readonly width: number; readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ width, children, style }) => {
  const screenHeight = (width * desktopShot.height) / desktopShot.width;
  return (
    <div style={{ width, borderRadius: 14, overflow: "hidden", background: "#dfe3d8", boxShadow: "0 30px 60px rgba(18,58,43,.22), 0 4px 10px rgba(18,58,43,.12)", ...style }}>
      <div style={{ height: 38, display: "flex", alignItems: "center", gap: 8, padding: "0 16px" }}>
        {["#e46b5b", "#e8b64c", "#62b366"].map((c) => (
          <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: 18, flex: 1, maxWidth: 420, height: 24, borderRadius: 7, background: color.white, fontFamily: font.body, fontSize: 13, color: color.muted, display: "flex", alignItems: "center", padding: "0 12px" }}>
          lucasfsilva94.github.io/voteai
        </span>
      </div>
      <div style={{ position: "relative", width, height: screenHeight, overflow: "hidden", background: color.paper }}>{children}</div>
    </div>
  );
};

// A phone with a thin bezel and a status bar; below it the page keeps the 390 x 844 capture ratio.
export const PHONE_BEZEL = 11;
export const PHONE_STATUS = 30;
export const phoneScreenWidth = (height: number) => ((height - PHONE_BEZEL * 2 - PHONE_STATUS) * mobileShot.width) / mobileShot.height;
export const PhoneFrame: React.FC<{ readonly height: number; readonly children: React.ReactNode; readonly style?: React.CSSProperties }> = ({ height, children, style }) => {
  const screenW = phoneScreenWidth(height);
  const pageH = height - PHONE_BEZEL * 2 - PHONE_STATUS;
  return (
    <div style={{ width: screenW + PHONE_BEZEL * 2, height, borderRadius: 46, background: "#10251d", padding: PHONE_BEZEL, boxShadow: "0 30px 60px rgba(18,58,43,.28), 0 4px 10px rgba(18,58,43,.15)", ...style }}>
      <div style={{ position: "relative", width: screenW, height: pageH + PHONE_STATUS, borderRadius: 36, overflow: "hidden", background: color.paper }}>
        <div style={{ height: PHONE_STATUS, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 22px 0", fontFamily: font.body, fontWeight: 700, fontSize: 12, color: color.ink }}>
          <span>9:41</span>
          <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ width: 15, height: 9, borderRadius: 2, background: color.ink }} />
            <span style={{ width: 20, height: 10, borderRadius: 3, border: `1.5px solid ${color.ink}`, padding: 1.5, display: "flex" }}>
              <span style={{ flex: 1, borderRadius: 1, background: color.ink }} />
            </span>
          </span>
        </div>
        <div style={{ position: "relative", width: screenW, height: pageH, overflow: "hidden" }}>{children}</div>
        <div style={{ position: "absolute", top: 6, left: "50%", translate: "-50% 0", width: 78, height: 20, borderRadius: 12, background: "#10251d" }} />
      </div>
    </div>
  );
};

// Mouse pointer moving between keyframes, with a ripple on each click.
export const Cursor: React.FC<{
  readonly keys: readonly { readonly f: number; readonly x: number; readonly y: number }[];
  readonly clicks: readonly number[];
  readonly scale: number;
}> = ({ keys, clicks, scale }) => {
  const frame = useCurrentFrame();
  const opts = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.45, 0, 0.2, 1) } as const;
  const x = interpolate(frame, keys.map((k) => k.f), keys.map((k) => k.x * scale), opts);
  const y = interpolate(frame, keys.map((k) => k.f), keys.map((k) => k.y * scale), opts);
  const press = clicks.some((c) => frame >= c && frame < c + 5);
  return (
    <>
      {clicks.map((c) => (
        <Ripple key={c} at={c} x={x} y={y} size={54} />
      ))}
      <svg width={26} height={30} viewBox="0 0 26 30" style={{ position: "absolute", left: x - 4, top: y - 2, scale: press ? 0.86 : 1, filter: "drop-shadow(0 3px 4px rgba(0,0,0,.3))" }}>
        <path d="M3 2 L3 24 L9 18.5 L13.2 28 L17.6 26 L13.4 16.8 L21.5 16.8 Z" fill="#10251d" stroke="#ffffff" strokeWidth={2} strokeLinejoin="round" />
      </svg>
    </>
  );
};

// Finger tap for the phone: a soft dot that presses and ripples.
export const Taps: React.FC<{
  readonly taps: readonly { readonly f: number; readonly x: number; readonly y: number }[];
  readonly scale: number;
}> = ({ taps, scale }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {taps.map((t) => {
        const opacity = interpolate(frame, [t.f - 8, t.f - 2, t.f + 8, t.f + 14], [0, 0.9, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={t.f}>
            <Ripple at={t.f} x={t.x * scale} y={t.y * scale} size={70} />
            <div style={{ position: "absolute", left: t.x * scale - 17, top: t.y * scale - 17, width: 34, height: 34, borderRadius: "50%", background: "rgba(16,37,29,.35)", border: "2px solid rgba(255,255,255,.9)", opacity, scale: frame >= t.f && frame < t.f + 6 ? 0.82 : 1 }} />
          </div>
        );
      })}
    </>
  );
};

const Ripple: React.FC<{ readonly at: number; readonly x: number; readonly y: number; readonly size: number }> = ({ at, x, y, size }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  if (frame < at || t >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%", border: `3px solid ${color.lime}`, background: "rgba(200,238,87,.25)", scale: 0.3 + t * 0.9, opacity: 1 - t }} />
  );
};
