import {
  AbsoluteFill,
  Html5Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const SUDOKU_EMPTY: number[][] = Array(9)
  .fill(null)
  .map(() => Array(9).fill(0));

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const boardScale = interpolate(frame, [0, fps * 5], [0.6, 1.5], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const boardFadeOut = interpolate(frame, [fps * 4.5, fps * 5.5], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const boomOpacity = interpolate(frame, [fps * 5.2, fps * 6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const boomScale = interpolate(frame, [fps * 5.2, fps * 6], [0.2, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const cellSize = 70;
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
          opacity: Math.min(boardOpacity, boardFadeOut),
        }}
      >
        <div
          style={{
            transform: `scale(${boardScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: 10,
            }}
          >
            Encontrar la solución...
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(9, ${cellSize}px)`,
              gridTemplateRows: `repeat(9, ${cellSize}px)`,
              border: `3px solid ${borderColor}`,
            }}
          >
            {SUDOKU_EMPTY.map((row, r) =>
              row.map((_, c) => {
                const isThickRight = c === 2 || c === 5;
                const isThickBottom = r === 2 || r === 5;
                return (
                  <div
                    key={`${r}-${c}`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: isThickRight
                        ? `2px solid ${borderColor}`
                        : `1px solid #ccc`,
                      borderBottom: isThickBottom
                        ? `2px solid ${borderColor}`
                        : `1px solid #ccc`,
                      backgroundColor: "transparent",
                      fontSize: 32,
                      fontFamily: "monospace",
                      color: "#bbb",
                    }}
                  >
                    ?
                  </div>
                );
              }),
            )}
          </div>
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
            marginTop: -60,
          }}
        >
          ¡Explosión de posibilidades!
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
