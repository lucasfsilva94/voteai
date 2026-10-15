import { Composition, Folder } from "remotion";
import { DevicesScene } from "./landing/DevicesScene";
import { EndScene } from "./landing/EndScene";
import { LandingVideo } from "./landing/LandingVideo";
import { NotesScene } from "./landing/NotesScene";
import { RunoffScene } from "./landing/RunoffScene";
import { UrnScene } from "./landing/UrnScene";
import "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="LandingVideo" component={LandingVideo} durationInFrames={592} fps={30} width={1280} height={720} />
      <Folder name="Cenas">
        <Composition id="SegundoTurno" component={RunoffScene} durationInFrames={90} fps={30} width={1280} height={720} />
        <Composition id="AsCegas" component={NotesScene} durationInFrames={130} fps={30} width={1280} height={720} />
        <Composition id="ComputadorCelular" component={DevicesScene} durationInFrames={150} fps={30} width={1280} height={720} />
        <Composition id="Urna" component={UrnScene} durationInFrames={150} fps={30} width={1280} height={720} />
        <Composition id="Encerramento" component={EndScene} durationInFrames={120} fps={30} width={1280} height={720} />
      </Folder>
    </>
  );
};
