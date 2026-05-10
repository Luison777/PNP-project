import "./index.css";
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
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
import { SCENE_DURATIONS_S, TOTAL_DURATION_S } from "./lib/sceneDurations";

// 1080x1920 @ 30fps — vertical 9:16 format
const W = 1080;
const H = 1920;
const FPS = 30;

const TOTAL_S = TOTAL_DURATION_S;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={TOTAL_S * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene1-Hook"
        component={Scene1}
        durationInFrames={SCENE_DURATIONS_S.scene1 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene2-IntroVisual"
        component={Scene2}
        durationInFrames={SCENE_DURATIONS_S.scene2 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene3-EjemplosP"
        component={Scene3}
        durationInFrames={SCENE_DURATIONS_S.scene3 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene4-CambioRitmo"
        component={Scene4}
        durationInFrames={SCENE_DURATIONS_S.scene4 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene5-EjemplosNP"
        component={Scene5}
        durationInFrames={SCENE_DURATIONS_S.scene5 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene6-Sudoku"
        component={Scene6}
        durationInFrames={SCENE_DURATIONS_S.scene6 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene7-TablerLleno"
        component={Scene7}
        durationInFrames={SCENE_DURATIONS_S.scene7 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene8-TablerVacio"
        component={Scene8}
        durationInFrames={SCENE_DURATIONS_S.scene8 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene9-PreguntaCentral"
        component={Scene9}
        durationInFrames={SCENE_DURATIONS_S.scene9 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      <Composition
        id="Scene10-Cierre"
        component={Scene10}
        durationInFrames={SCENE_DURATIONS_S.scene10 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />
    </>
  );
};
