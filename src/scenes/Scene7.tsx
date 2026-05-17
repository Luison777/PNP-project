import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
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

// ── Timing (segundos) ── ajusta estos valores para sincronizar con el diálogo
const BOARD_FADE_S = 0.5;

const ROWS_START_S = 1;
const ROWS_DURATION_S = 2.5; // duración del barrido de filas

const COLS_START_S = 4;
const COLS_DURATION_S = 2.5; // duración del barrido de columnas

const BLOCKS_START_S = 7;
const BLOCKS_DURATION_S = 2.5; // duración del barrido de bloques 3×3

const CHECK_START_S = 10;
const CHECK_FADE_S = 0.6;
// ────────────────────────────────────────────────────────────────────────────

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardOpacity = interpolate(frame, [0, fps * BOARD_FADE_S], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // ── Progreso de cada fase (0 → 9)
  const sweepRow = interpolate(
    frame,
    [fps * ROWS_START_S, fps * (ROWS_START_S + ROWS_DURATION_S)],
    [0, 9],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const sweepCol = interpolate(
    frame,
    [fps * COLS_START_S, fps * (COLS_START_S + COLS_DURATION_S)],
    [0, 9],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const sweepBlock = interpolate(
    frame,
    [fps * BLOCKS_START_S, fps * (BLOCKS_START_S + BLOCKS_DURATION_S)],
    [0, 9],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const currentRow = Math.floor(sweepRow);
  const currentCol = Math.floor(sweepCol);
  const currentBlock = Math.floor(sweepBlock);

  const rowPhase = frame >= fps * ROWS_START_S && frame < fps * COLS_START_S;
  const colPhase = frame >= fps * COLS_START_S && frame < fps * BLOCKS_START_S;
  const blockPhase = frame >= fps * BLOCKS_START_S;

  function getCellBg(r: number, c: number): string {
    const blockIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
    if (rowPhase) {
      if (r < currentRow) return "rgba(80, 200, 120, 0.3)";
      if (r === currentRow) return "rgba(255, 200, 50, 0.5)";
    } else if (colPhase) {
      if (c < currentCol) return "rgba(100, 149, 237, 0.35)";
      if (c === currentCol) return "rgba(255, 200, 50, 0.5)";
    } else if (blockPhase) {
      if (blockIdx < currentBlock) return "rgba(200, 120, 220, 0.3)";
      if (blockIdx === currentBlock) return "rgba(255, 200, 50, 0.5)";
    }
    return "transparent";
  }

  // ── Opacidad de los labels de fase
  const rowLabelOpacity = interpolate(
    frame,
    [
      fps * ROWS_START_S,
      fps * (ROWS_START_S + 0.4),
      fps * (COLS_START_S - 0.3),
      fps * COLS_START_S,
    ],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const colLabelOpacity = interpolate(
    frame,
    [
      fps * COLS_START_S,
      fps * (COLS_START_S + 0.4),
      fps * (BLOCKS_START_S - 0.3),
      fps * BLOCKS_START_S,
    ],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );
  const blockLabelOpacity = interpolate(
    frame,
    [
      fps * BLOCKS_START_S,
      fps * (BLOCKS_START_S + 0.4),
      fps * (CHECK_START_S - 0.3),
      fps * CHECK_START_S,
    ],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const checkOpacity = interpolate(
    frame,
    [fps * CHECK_START_S, fps * (CHECK_START_S + CHECK_FADE_S)],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const cellSize = 96;
  const borderColor = "#222";

  return (
    <AbsoluteFill>
      <Html5Audio src={staticFile("audio/10.mp3")} />
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          opacity: boardOpacity,
        }}
      >
        {/* Título */}
        <div>
          <span
            style={{
              fontSize: 72,
              fontFamily: "sans-serif",
              fontWeight: 800,
              color: "#1a1a2e",
            }}
          >
            Verificación rápida
          </span>
        </div>

        {/* Label de fase activa */}
        <div
          style={{
            height: 52,
            position: "relative",
            width: "100%",
            textAlign: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              opacity: rowLabelOpacity,
              fontSize: 48,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#50c878",
            }}
          >
            ▶ Filas
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              opacity: colLabelOpacity,
              fontSize: 48,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#6495ed",
            }}
          >
            ▶ Columnas
          </span>
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              opacity: blockLabelOpacity,
              fontSize: 48,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#c878dc",
            }}
          >
            ▶ Bloques 3×3
          </span>
        </div>

        {/* Tablero */}
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
                    color: "#1a1a2e",
                  }}
                >
                  {val}
                </div>
              );
            }),
          )}
        </div>

        {/* Resultado final */}
        <div
          style={{
            opacity: checkOpacity,
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 10,
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
              fontSize: 72,
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
