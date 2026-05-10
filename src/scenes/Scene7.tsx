import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const SUDOKU_FULL: number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const sweepRow = interpolate(frame, [fps * 1, fps * (1 + 9 * 0.6)], [0, 9], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const currentRow = Math.floor(sweepRow);

  const isVerified = (r: number) => r < currentRow;
  const isCurrent = (r: number) => r === currentRow;

  const cellSize = 96;
  const borderColor = "#222";

  const checkOpacity = interpolate(
    frame,
    [fps * (1 + 9 * 0.6), fps * (1 + 9 * 0.6 + 0.8)],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          opacity: boardOpacity,
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <span
            style={{
              fontSize: 56,
              fontFamily: "sans-serif",
              fontWeight: 800,
              color: "#1a1a2e",
            }}
          >
            Verificación rápida
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(9, ${cellSize}px)`,
            gridTemplateRows: `repeat(9, ${cellSize}px)`,
            border: `4px solid ${borderColor}`,
          }}
        >
          {SUDOKU_FULL.map((row, r) =>
            row.map((val, c) => {
              const isThickRight = c === 2 || c === 5;
              const isThickBottom = r === 2 || r === 5;
              const verified = isVerified(r);
              const current = isCurrent(r);

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
                      ? `3px solid ${borderColor}`
                      : `1px solid #aaa`,
                    borderBottom: isThickBottom
                      ? `3px solid ${borderColor}`
                      : `1px solid #aaa`,
                    backgroundColor: verified
                      ? "rgba(80, 200, 120, 0.25)"
                      : current
                        ? "rgba(255, 200, 50, 0.5)"
                        : "transparent",
                    fontSize: 40,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    transition: "background-color 0.1s",
                  }}
                >
                  {val}
                </div>
              );
            }),
          )}
        </div>

        <div
          style={{
            opacity: checkOpacity,
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 20,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#50c878",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              color: "white",
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          <span
            style={{
              fontSize: 48,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#50c878",
            }}
          >
            ¡Solución válida!
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
