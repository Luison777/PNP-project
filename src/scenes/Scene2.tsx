import {
  AbsoluteFill,
  Html5Audio,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { Div, Span } from "../lib/ui/containers";
import { SCENE_DURATIONS_S } from "../lib/sceneDurations";

const CUT1_S = 4;

const SCENE_DURATION_S = SCENE_DURATIONS_S.scene2;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

const Cuadro3: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = interpolate(frame, [fps * 2, fps * CUT1_S], [1, 15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(
    frame,
    [fps * (CUT1_S - 0.3), fps * CUT1_S],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "28% 50%",
      }}
    >
      <Div frame={frame} className="flex flex-row items-center gap-5">
        <Span
          frame={frame}
          className="font-sans font-black text-[#1a1a2e] text-[220px]"
        >
          P
        </Span>
        <Span
          frame={frame}
          className="font-sans font-normal text-[#555] text-[100px]"
        >
          vs
        </Span>
        <Span
          frame={frame}
          className="font-sans font-black text-[#e94560] text-[220px]"
        >
          NP
        </Span>
      </Div>
    </AbsoluteFill>
  );
};

const Cuadro4: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cuadro4Duration = SCENE_DURATION_S - CUT1_S;

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [fps * (cuadro4Duration - 0.5), fps * cuadro4Duration],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const gearRotation = (frame / fps) * 90;

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(opacity, fadeOut),
      }}
      className="flex flex-col items-center px-20 pt-50"
    >
      <Div
        frame={frame}
        className="flex flex-col items-center gap-4 relative"
        opacity={{ input: [0, fps * 0.5], output: [0, 1] }}
      >
        <Img
          src={staticFile("scene1/computer.svg")}
          style={{ width: 450, height: 450, objectFit: "contain" }}
        />
        <Div
          frame={frame}
          className="flex flex-col items-center gap-4 absolute -left-[20%] top-[45%]"
          opacity={{ input: [fps * 0.5, fps * 1], output: [0, 1] }}
        >
          <Img
            src={staticFile("scene2/gear.svg")}
            style={{
              width: 240,
              height: 240,
              objectFit: "contain",
              transform: `rotate(${gearRotation}deg)`,
            }}
          />
        </Div>
        <Div
          frame={frame}
          className="flex flex-col items-center gap-4 absolute -top-[10%] -right-[15%]"
          opacity={{ input: [fps * 1, fps * 1.5], output: [0, 1] }}
        >
          <Img
            src={staticFile("scene2/clock.svg")}
            style={{ width: 200, height: 200, objectFit: "contain" }}
            className="rotate-30"
          />
        </Div>
      </Div>

      <Div
        frame={frame}
        className="flex flex-col items-center gap-4 pt-20"
        opacity={{ input: [fps * 4, fps * 4.5], output: [0, 1] }}
      >
        <Img
          src={staticFile("scene2/arrow-down.svg")}
          style={{ width: 300, height: 300, objectFit: "contain" }}
        />
      </Div>

      <Div
        frame={frame}
        className="flex flex-col items-center gap-4 pt-30"
        opacity={{ input: [fps * 5, fps * 5.5], output: [0, 1] }}
      >
        <Img
          src={staticFile("scene5/check.svg")}
          style={{ width: 400, height: 400, objectFit: "contain" }}
        />
        <Span
          frame={frame}
          className="text-green-500 text-7xl font-sans italic font-bold underline"
        >
          Eficiente
        </Span>
      </Div>
    </AbsoluteFill>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence durationInFrames={fps * CUT1_S}>
        <Html5Audio src={staticFile("audio/3.mp3")} />
        <Cuadro3 frame={frame} fps={fps} />
      </Sequence>
      <Sequence
        from={fps * CUT1_S}
        durationInFrames={fps * (SCENE_DURATION_S - CUT1_S)}
      >
        <Html5Audio src={staticFile("audio/4.mp3")} />
        <Sequence from={fps * 1} durationInFrames={fps * 4}>
          <Html5Audio src={staticFile("audio/chrono.mp3")} volume={0.1} />
        </Sequence>
        <Sequence from={fps * 5} durationInFrames={fps * 2}>
          <Html5Audio src={staticFile("audio/bell.mp3")} volume={0.1} />
        </Sequence>
        <Cuadro4 frame={frame - fps * CUT1_S} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
