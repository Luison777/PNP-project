/**
 * Scene 5 - Ejemplos NP
 * Cuadro 8 (0–12s): safe.svg → password.svg → check.svg aparecen secuencialmente
 * Total: 12s = 360 frames @ 30fps
 */
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (startS: number, endS = startS + 0.6) =>
    interpolate(frame, [fps * startS, fps * endS], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  const slideUp = (startS: number) =>
    interpolate(frame, [fps * startS, fps * (startS + 0.6)], [60, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  const iconSize = 280;

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Label NP */}
        <div
          style={{
            opacity: fadeIn(0),
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#e94560",
              border: "6px solid #e94560",
              borderRadius: "50%",
              width: 140,
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            NP
          </span>
        </div>

        {/* Icons row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {/* safe.svg */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              opacity: fadeIn(0.5),
              transform: `translateY(${slideUp(0.5)}px)`,
            }}
          >
            <Img
              src={staticFile("scene5/safe.svg")}
              style={{
                width: iconSize,
                height: iconSize,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: 38,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Caja fuerte
            </span>
          </div>

          {/* password.svg */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              opacity: fadeIn(3),
              transform: `translateY(${slideUp(3)}px)`,
            }}
          >
            <Img
              src={staticFile("scene5/password.svg")}
              style={{
                width: iconSize,
                height: iconSize,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: 38,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Combinación
            </span>
          </div>

          {/* check.svg */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              opacity: fadeIn(6),
              transform: `translateY(${slideUp(6)}px)`,
            }}
          >
            <Img
              src={staticFile("scene5/check.svg")}
              style={{
                width: iconSize,
                height: iconSize,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: 38,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Verificar
            </span>
          </div>
        </div>

        {/* Caption */}
        <div
          style={{
            opacity: fadeIn(7),
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 44,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "#444",
              fontStyle: "italic",
            }}
          >
            Difícil de encontrar, fácil de verificar
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
