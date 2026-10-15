import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import type React from "react";
import { useVideoConfig } from "remotion";
import { UrnScene } from "../scenes/UrnScene";
import { DevicesScene } from "./DevicesScene";
import { EndScene } from "./EndScene";
import { NotesScene } from "./NotesScene";
import { RunoffScene } from "./RunoffScene";

// Landing explainer for the 2026 runoff: 90 + 130 + 150 + 150 + 120 - 4 x 12 = 592 frames (about 19.7 s), looping.
export const LandingVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="2º turno" durationInFrames={90} premountFor={fps}>
        <RunoffScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Às cegas" durationInFrames={130} premountFor={fps}>
        <NotesScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Computador e celular" durationInFrames={150} premountFor={fps}>
        <DevicesScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Urna" durationInFrames={150} premountFor={fps}>
        <UrnScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Encerramento" durationInFrames={120} premountFor={fps}>
        <EndScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
