/**
 * MainVideo - Composición completa con todas las escenas + audio de fondo
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
import { SCENE_DURATIONS_S } from "./lib/sceneDurations";

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
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene1 * FPS}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene2 * FPS}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene3 * FPS}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene4 * FPS}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene5 * FPS}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene6 * FPS}>
          <Scene6 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene7 * FPS}>
          <Scene7 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene8 * FPS}>
          <Scene8 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene9 * FPS}>
          <Scene9 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_DURATIONS_S.scene10 * FPS}>
          <Scene10 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
