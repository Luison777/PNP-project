/**
 * MainVideo - Composición completa con todas las escenas + audio de fondo
 * Total: 103s = 3090 frames @ 30fps
 */
import { AbsoluteFill, Html5Audio, Series, staticFile } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";
import { Scene9 } from "./scenes/Scene9";
import { Scene10 } from "./scenes/Scene10";

const FPS = 30;

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Audio de fondo: ajusta el src al nombre de tu archivo */}
      <Html5Audio
        src={staticFile("audio/backmusic.mp3")}
        volume={0.05} // 0.0 = silencio, 1.0 = volumen completo
        loop
      />

      {/* Secuencia de todas las escenas */}
      <Series>
        <Series.Sequence durationInFrames={12 * FPS}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={11 * FPS}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={8 * FPS}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={15 * FPS}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={12 * FPS}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={10 * FPS}>
          <Scene6 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={8 * FPS}>
          <Scene7 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={8 * FPS}>
          <Scene8 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={7 * FPS}>
          <Scene9 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={12 * FPS}>
          <Scene10 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
