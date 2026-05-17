import {
  AbsoluteFill,
  Html5Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const GRID_START_S = 0.5;
const GRID_END_S = 6;
const FADE_OUT_START_S = 5.5;
const FADE_OUT_END_S = 6.5;
const BOOM_START_S = 6.2;
const BOOM_END_S = 7.2;

const MIN_SIZE = 3;
const MAX_SIZE = 12;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardOpacity = interpolate(frame, [0, fps * GRID_START_S], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const boardFadeOut = interpolate(
    frame,
    [fps * FADE_OUT_START_S, fps * FADE_OUT_END_S],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const gridSizeRaw = interpolate(
    frame,
    [fps * GRID_START_S, fps * GRID_END_S],
    [MIN_SIZE, MAX_SIZE],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const gridSize = Math.floor(gridSizeRaw);

  const cellSize = Math.round(
    interpolate(gridSizeRaw, [MIN_SIZE, MAX_SIZE], [160, 64], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }),
  );

  const boomOpacity = interpolate(
    frame,
    [fps * BOOM_START_S, fps * BOOM_END_S],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const boomScale = interpolate(
    frame,
    [fps * BOOM_START_S, fps * BOOM_END_S],
    [0.2, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const borderColor = "#666";

  return (
    <AbsoluteFill>
      <Html5Audio src={staticFile("audio/11.mp3")} />
      <Background />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          opacity: Math.min(boardOpacity, boardFadeOut),
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#1a1a2e",
          }}
        >
          Encontrar la solución...
        </span>

        <span
          style={{
            fontSize: 48,
            fontFamily: "monospace",
            fontWeight: 900,
            color: "#e94560",
          }}
        >
          {gridSize}×{gridSize}
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
            border: `3px solid ${borderColor}`,
          }}
        >
          {Array.from({ length: gridSize }).map((_, r) =>
            Array.from({ length: gridSize }).map((__, c) => (
              <div
                key={`${r}-${c}`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: `1px solid #ccc`,
                  borderBottom: `1px solid #ccc`,
                  fontSize: Math.max(14, cellSize * 0.4),
                  fontFamily: "monospace",
                  color: "#bbb",
                }}
              >
                ?
              </div>
            )),
          )}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: boomOpacity,
          transform: `scale(${boomScale})`,
        }}
      >
        <Img
          src={staticFile("scene8/boom.svg")}
          style={{ width: 700, height: 700, objectFit: "contain" }}
        />
        <span
          style={{
            fontSize: 72,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#e94560",
            marginTop: 20,
          }}
        >
          ¡Explosión de posibilidades!
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
