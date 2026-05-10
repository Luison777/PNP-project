/**
 * Scene 1 - Hook
 * Cuadro 1 (0–6s): computer.svg + maths.svg con subtítulos
 * Cuadro 2 (6–12s): Cuadro 1 sube, entra "P vs NP" desde abajo
 * Total: 12s = 360 frames @ 30fps
 */
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const SCENE_DURATION_S = 12;
const CUT1_S = 6; // frame 180

// Shared white background
const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

// Cuadro 1: Íconos de informática (arriba) y matemáticas (abajo, desfasado)
const Cuadro1: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Fade out + slide up en la transición al cuadro 2
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

  // Informática: aparece de inmediato (0–0.5s) con slide desde abajo
  const opacityInfo = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const slideInfo = interpolate(frame, [0, fps * 0.5], [60, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Matemáticas: aparece ~2s después (diálogo: "...y matemáticas")
  const opacityMath = interpolate(frame, [fps * 2, fps * 2.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const slideMath = interpolate(frame, [fps * 2, fps * 2.5], [60, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

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
      {/* Top: Informática */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: opacityInfo,
          transform: `translateY(${slideInfo}px)`,
        }}
      >
        <Img
          src={staticFile("scene1/computer.svg")}
          style={{ width: 300, height: 300, objectFit: "contain" }}
        />
        <span
          style={{
            fontSize: 52,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#222",
            letterSpacing: 1,
          }}
        >
          Informática
        </span>
      </div>

      {/* Bottom: Matemáticas (desfasado ~2s) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: opacityMath,
          transform: `translateY(${slideMath}px)`,
        }}
      >
        <Img
          src={staticFile("scene1/maths.svg")}
          style={{ width: 300, height: 300, objectFit: "contain" }}
        />
        <span
          style={{
            fontSize: 52,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#222",
            letterSpacing: 1,
          }}
        >
          Matemáticas
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Cuadro 2: Título "P vs NP" entra desde abajo
const Cuadro2: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // frame is relative to the start of this sequence (frame 180)
  const enterY = interpolate(frame, [0, fps * 0.6], [400, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${enterY}px)`,
        opacity,
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
            letterSpacing: -4,
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
            letterSpacing: -4,
          }}
        >
          NP
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Background />
      {/* Cuadro 1: 0–6s */}
      <Sequence durationInFrames={fps * CUT1_S} layout="none">
        <Cuadro1 frame={frame} fps={fps} />
      </Sequence>
      {/* Cuadro 2: 6–12s */}
      <Sequence
        from={fps * CUT1_S}
        durationInFrames={fps * (SCENE_DURATION_S - CUT1_S)}
      >
        <Cuadro2 frame={frame - fps * CUT1_S} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
