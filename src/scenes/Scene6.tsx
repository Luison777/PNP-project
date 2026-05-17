import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

// Partial Sudoku board (0 = empty)
const SUDOKU_PARTIAL: number[][] = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const HIGHLIGHT_ROW = 4;
const HIGHLIGHT_COL = 4;
const HIGHLIGHT_BOX_ROW_START = 3;
const HIGHLIGHT_BOX_COL_START = 3;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const rowHighlight = interpolate(frame, [fps * 1, fps * 1.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const colHighlight = interpolate(frame, [fps * 2.5, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const boxHighlight = interpolate(frame, [fps * 4, fps * 4.5], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const cellSize = 96;
  const borderColor = "#222";

  const isInBox = (r: number, c: number) =>
    r >= HIGHLIGHT_BOX_ROW_START &&
    r < HIGHLIGHT_BOX_ROW_START + 3 &&
    c >= HIGHLIGHT_BOX_COL_START &&
    c < HIGHLIGHT_BOX_COL_START + 3;

  const getCellBg = (r: number, c: number): string => {
    const inRow = r === HIGHLIGHT_ROW;
    const inCol = c === HIGHLIGHT_COL;
    const inBox = isInBox(r, c);

    if (inRow && inCol && inBox) {
      // Intersection: blend colors
      const base = `rgba(255, 100, 100, ${0.7 * Math.max(rowHighlight, colHighlight, boxHighlight)})`;
      return base;
    }
    if (inBox) return `rgba(100, 149, 237, ${0.35 * boxHighlight})`;
    if (inRow) return `rgba(255, 200, 50, ${0.45 * rowHighlight})`;
    if (inCol) return `rgba(100, 220, 100, ${0.35 * colHighlight})`;
    return "transparent";
  };

  return (
    <AbsoluteFill>
      <Html5Audio src={staticFile("audio/9.mp3")} />
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity,
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontSize: 64,
              fontFamily: "sans-serif",
              fontWeight: 800,
              color: "#1a1a2e",
            }}
          >
            Sudoku
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
          {SUDOKU_PARTIAL.map((row, r) =>
            row.map((val, c) => {
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
                      ? `3px solid ${borderColor}`
                      : `1px solid #aaa`,
                    borderBottom: isThickBottom
                      ? `3px solid ${borderColor}`
                      : `1px solid #aaa`,
                    backgroundColor: getCellBg(r, c),
                    fontSize: 40,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: val === 0 ? "transparent" : "#1a1a2e",
                  }}
                >
                  {val === 0 ? "." : val}
                </div>
              );
            }),
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            marginTop: 20,
            opacity: Math.max(rowHighlight, colHighlight, boxHighlight),
          }}
        >
          {[
            { color: "rgba(255,200,50,0.7)", label: "Fila" },
            { color: "rgba(100,220,100,0.7)", label: "Columna" },
            { color: "rgba(100,149,237,0.7)", label: "Bloque 3×3" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: color,
                  borderRadius: 6,
                  border: "2px solid #aaa",
                }}
              />
              <span
                style={{
                  fontSize: 36,
                  fontFamily: "sans-serif",
                  color: "#333",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
