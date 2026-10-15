import { Composition, Folder } from "remotion";
import { VoteAIDemo } from "./Composition";
import { DesktopScene } from "./scenes/DesktopScene";
import { Intro } from "./scenes/Intro";
import { MobileScene } from "./scenes/MobileScene";
import { Outro } from "./scenes/Outro";
import { UrnScene } from "./scenes/UrnScene";
import "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="VoteAIDemo" component={VoteAIDemo} durationInFrames={537} fps={30} width={1280} height={720} />
      <Folder name="Cenas">
        <Composition id="Abertura" component={Intro} durationInFrames={60} fps={30} width={1280} height={720} />
        <Composition id="Desktop" component={DesktopScene} durationInFrames={150} fps={30} width={1280} height={720} />
        <Composition id="Celular" component={MobileScene} durationInFrames={135} fps={30} width={1280} height={720} />
        <Composition id="Urna" component={UrnScene} durationInFrames={150} fps={30} width={1280} height={720} />
        <Composition id="Encerramento" component={Outro} durationInFrames={90} fps={30} width={1280} height={720} />
      </Folder>
    </>
  );
};
