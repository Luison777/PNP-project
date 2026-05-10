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

// 1080x1920 @ 30fps — vertical 9:16 format
const W = 1080;
const H = 1920;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Video completo con audio de fondo | 103s */}
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={103 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 1 – Hook: computer + maths → P vs NP title | 12s */}
      <Composition
        id="Scene1-Hook"
        component={Scene1}
        durationInFrames={12 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 2 – Introducción visual: zoom P → computer/gear/clock | 11s */}
      <Composition
        id="Scene2-IntroVisual"
        component={Scene2}
        durationInFrames={11 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 3 – Ejemplos P: numbers / routes / find | 8s */}
      <Composition
        id="Scene3-EjemplosP"
        component={Scene3}
        durationInFrames={8 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 4 – Cambio de ritmo: zoom NP → think + bulb | 15s */}
      <Composition
        id="Scene4-CambioRitmo"
        component={Scene4}
        durationInFrames={15 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 5 – Ejemplos NP: safe / password / check | 12s */}
      <Composition
        id="Scene5-EjemplosNP"
        component={Scene5}
        durationInFrames={12 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 6 – Sudoku parcial con highlights | 10s */}
      <Composition
        id="Scene6-Sudoku"
        component={Scene6}
        durationInFrames={10 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 7 – Tablero lleno con sweep de verificación | 8s */}
      <Composition
        id="Scene7-TablerLleno"
        component={Scene7}
        durationInFrames={8 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 8 – Tablero vacío que crece → boom.svg | 8s */}
      <Composition
        id="Scene8-TablerVacio"
        component={Scene8}
        durationInFrames={8 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 9 – Pregunta central | 7s */}
      <Composition
        id="Scene9-PreguntaCentral"
        component={Scene9}
        durationInFrames={7 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />

      {/* Scene 10 – Cierre: P=NP? → think+X → dollar | 12s */}
      <Composition
        id="Scene10-Cierre"
        component={Scene10}
        durationInFrames={12 * FPS}
        fps={FPS}
        width={W}
        height={H}
      />
    </>
  );
};
