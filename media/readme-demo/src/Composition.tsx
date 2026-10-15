import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import type React from "react";
import { useVideoConfig } from "remotion";
import { DesktopScene } from "./scenes/DesktopScene";
import { Intro } from "./scenes/Intro";
import { MobileScene } from "./scenes/MobileScene";
import { Outro } from "./scenes/Outro";
import { UrnScene } from "./scenes/UrnScene";

// README demo: intro, desktop, phone, urn, outro. 60 + 150 + 135 + 150 + 90 - 4 x 12 = 537 frames.
export const VoteAIDemo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Abertura" durationInFrames={60} premountFor={fps}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Desktop" durationInFrames={150} premountFor={fps}>
        <DesktopScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Celular" durationInFrames={135} premountFor={fps}>
        <MobileScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Urna" durationInFrames={150} premountFor={fps}>
        <UrnScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Encerramento" durationInFrames={90} premountFor={fps}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
