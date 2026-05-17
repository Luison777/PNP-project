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

const SCENE_DURATION_S = SCENE_DURATIONS_S.scene1;
const CUT1_S = 8;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

const Cuadro1: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const fadeOut = interpolate(
    frame,
    [fps * CUT1_S - fps * 0.5, fps * CUT1_S],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const translateY = interpolate(
    frame,
    [fps * CUT1_S - fps * 0.5, fps * CUT1_S],
    [0, -200],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 80,
      }}
    >
      <Div
        frame={frame}
        className="flex flex-col items-center gap-6"
        opacity={{ input: [fps * 0.5, fps * 1], output: [0, 1] }}
        translateY={{
          input: [fps * 0.5, fps * 1, fps * 1.5, fps * 2.0],
          output: [60, 0, 0, -150],
        }}
      >
        <Img
          src={staticFile("scene1/computer.svg")}
          style={{ width: 350, height: 350, objectFit: "contain" }}
        />
        <Span
          frame={frame}
          className="font-sans font-bold text-[#222] text-[60px] tracking-[1px]"
        >
          Informática
        </Span>
      </Div>
      <Span
        frame={frame}
        className="font-sans font-extrabold  text-6xl uppercase text-green-600"
        opacity={{ input: [fps * 3, fps * 3.5], output: [0, 1] }}
        translateY={{
          input: [fps * 3, fps * 3.5],
          output: [60, -50],
        }}
      >
        Fáciles de resolver
      </Span>
      <Span
        frame={frame}
        className="font-sans font-extrabold  text-6xl uppercase text-red-600 text-center"
        opacity={{ input: [fps * 5, fps * 5.5], output: [0, 1] }}
        translateY={{
          input: [fps * 5, fps * 5.5],
          output: [60, -30],
        }}
      >
        Fáciles de comprobar <br />
        Pero difíciles de resolver
      </Span>
    </AbsoluteFill>
  );
};

const Cuadro2: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Div
        frame={frame}
        opacity={{ input: [fps * 0.5, fps * 1], output: [0, 1] }}
      >
        <Img
          src={staticFile("scene1/question.svg")}
          style={{ width: 350, height: 350, objectFit: "contain" }}
        />
      </Div>
      <Div
        frame={frame}
        className="flex flex-row items-center gap-5"
        opacity={{ input: [fps * 4, fps * 4.5], output: [0, 1] }}
      >
        <Span
          frame={frame}
          className="font-sans font-black text-[#1a1a2e] text-[220px] tracking-[-4px]"
        >
          P
        </Span>
        <Span
          frame={frame}
          className="font-sans text-[#555] text-[100px]"
          style={{ fontWeight: 350 }}
        >
          vs
        </Span>
        <Span
          frame={frame}
          className="font-sans font-black text-[#e94560] text-[220px] tracking-[-4px]"
        >
          NP
        </Span>
      </Div>
    </AbsoluteFill>
  );
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence durationInFrames={fps * CUT1_S} layout="none">
        <Html5Audio src={staticFile("audio/1.mp3")} volume={0.4} />
        <Cuadro1 frame={frame} fps={fps} />
      </Sequence>
      <Sequence
        from={fps * CUT1_S}
        durationInFrames={fps * (SCENE_DURATION_S - CUT1_S)}
      >
        <Html5Audio src={staticFile("audio/2.mp3")} />
        <Cuadro2 frame={frame - fps * CUT1_S} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
