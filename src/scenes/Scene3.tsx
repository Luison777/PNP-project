/**
 * Scene 3 - Ejemplos P
 * Cuadro 5 (0–8s): numbers.svg (top-left) + routes.svg (top-right) + find.svg (bottom-center)
 *                  fade in sequentially → zoom out
 * Total: 8s = 240 frames @ 30fps
 */
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const SCENE_DURATION_S = 8;

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each image fades in sequentially
  const fadeIn = (startS: number) =>
    interpolate(frame, [fps * startS, fps * (startS + 0.6)], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  // Global zoom out at the end (last 1.5s)
  const scale = interpolate(
    frame,
    [fps * (SCENE_DURATION_S - 1.5), fps * SCENE_DURATION_S],
    [1, 0.7],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const globalOpacity = interpolate(
    frame,
    [fps * (SCENE_DURATION_S - 0.4), fps * SCENE_DURATION_S],
    [1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const iconSize = 260;

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          opacity: globalOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Top row: numbers + routes */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {/* numbers.svg – top left */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: fadeIn(0),
            }}
          >
            <Img
              src={staticFile("scene3/numbers.svg")}
              style={{
                width: iconSize,
                height: iconSize,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: 42,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Ordenar números
            </span>
          </div>

          {/* routes.svg – top right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: fadeIn(0.8),
            }}
          >
            <Img
              src={staticFile("scene3/routes.svg")}
              style={{
                width: iconSize,
                height: iconSize,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: 42,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Buscar rutas
            </span>
          </div>
        </div>

        {/* Bottom center: find.svg */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: fadeIn(1.6),
          }}
        >
          <Img
            src={staticFile("scene3/find.svg")}
            style={{ width: iconSize, height: iconSize, objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: 42,
              fontFamily: "sans-serif",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Encontrar el máximo
          </span>
        </div>

        {/* Label P */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            opacity: fadeIn(2.4),
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#1a1a2e",
              border: "6px solid #1a1a2e",
              borderRadius: "50%",
              width: 120,
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            P
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
