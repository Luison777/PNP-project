import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

import { Div, Span } from "../lib/ui/containers";

const CUT1_S = 1;
import { SCENE_DURATIONS_S } from "../lib/sceneDurations";

const SCENE_DURATION_S = SCENE_DURATIONS_S.scene4;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

const Cuadro6: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = interpolate(frame, [0, fps * CUT1_S], [1, 15], {
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
        transformOrigin: "65% 50%",
      }}
    >
      <Div
        frame={frame}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Span
          frame={frame}
          style={{
            fontSize: 180,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#1a1a2e",
          }}
        >
          P
        </Span>
        <Span
          frame={frame}
          style={{
            fontSize: 100,
            fontFamily: "sans-serif",
            fontWeight: 400,
            color: "#555",
          }}
        >
          vs
        </Span>
        <Span
          frame={frame}
          style={{
            fontSize: 180,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#e94560",
          }}
        >
          NP
        </Span>
      </Div>
    </AbsoluteFill>
  );
};

const Cuadro7: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const sceneOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const bulbScale = interpolate(frame, [fps * 5, fps * 6], [0.3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity,
      }}
      className="relative flex justify-center px-30"
    >
      <Div
        frame={frame}
        opacity={{
          input: [fps * 1, fps * 1.8],
          output: [0, 1],
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        }}
        style={{
          width: 500,
          height: 500,
        }}
        className="absolute right-[20%] top-[15%]"
      >
        <Img
          src={staticFile("scene4/thought-bubble.svg")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Div>
      <Div
        frame={frame}
        opacity={{
          input: [fps * 5, fps * 6],
          output: [0, 1],
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        }}
        style={{
          transform: `translate(-50%, 0) scale(${bulbScale})`,
          width: 160,
          height: 160,
        }}
        className="absolute top-[20%] right-[32%]"
      >
        <Img
          src={staticFile("scene4/bulb.svg")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Div>
      <Img
        src={staticFile("scene4/think.svg")}
        style={{
          width: 340,
          height: 340,
          objectFit: "contain",
          marginTop: -40,
        }}
      />
    </AbsoluteFill>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      <Sequence durationInFrames={fps * CUT1_S}>
        <Cuadro6 frame={frame} fps={fps} />
      </Sequence>
      <Sequence
        from={fps * CUT1_S}
        durationInFrames={fps * (SCENE_DURATION_S - CUT1_S)}
      >
        <Cuadro7 frame={frame - fps * CUT1_S} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
