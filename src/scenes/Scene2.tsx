import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const CUT1_S = 3;
import { SCENE_DURATIONS_S } from "../lib/sceneDurations";

const SCENE_DURATION_S = SCENE_DURATIONS_S.scene2;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

const Cuadro3: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = interpolate(frame, [0, fps * CUT1_S], [1, 4], {
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
        transformOrigin: "38% 50%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span
          style={{
            fontSize: 180,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#1a1a2e",
          }}
        >
          P
        </span>
        <span
          style={{
            fontSize: 100,
            fontFamily: "sans-serif",
            fontWeight: 400,
            color: "#555",
          }}
        >
          vs
        </span>
        <span
          style={{
            fontSize: 180,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#e94560",
          }}
        >
          NP
        </span>
      </div>
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

  const itemFadeIn = (startS: number) =>
    interpolate(frame, [fps * startS, fps * (startS + 0.5)], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: 60,
        paddingRight: 60,
        opacity: Math.min(opacity, fadeOut),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: itemFadeIn(0),
        }}
      >
        <Img
          src={staticFile("scene1/computer.svg")}
          style={{ width: 240, height: 240, objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: itemFadeIn(0.5),
        }}
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
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: itemFadeIn(1),
        }}
      >
        <Img
          src={staticFile("scene2/clock.svg")}
          style={{ width: 240, height: 240, objectFit: "contain" }}
        />
      </div>
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
        <Cuadro3 frame={frame} fps={fps} />
      </Sequence>
      <Sequence
        from={fps * CUT1_S}
        durationInFrames={fps * (SCENE_DURATION_S - CUT1_S)}
      >
        <Cuadro4 frame={frame - fps * CUT1_S} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
