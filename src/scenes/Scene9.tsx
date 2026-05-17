import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (startS: number) =>
    interpolate(frame, [fps * startS, fps * (startS + 0.6)], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  const slideUp = (startS: number) =>
    interpolate(frame, [fps * startS, fps * (startS + 0.6)], [50, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  const pulse = Math.sin((frame / fps) * Math.PI * 2) * 0.05 + 1;

  return (
    <AbsoluteFill>
      <Html5Audio src={staticFile("audio/12.mp3")} />
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <div
          style={{
            opacity: fadeIn(0),
            transform: `translateY(${slideUp(0)}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 55,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "#555",
            }}
          >
            Y aquí aparece la gran pregunta:
          </span>
        </div>

        <div
          style={{
            opacity: fadeIn(2.5),
            transform: `translateY(${slideUp(2.5)}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 65,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#1a1a2e",
              lineHeight: 1.3,
            }}
          >
            Si un problema puede verificarse rápidamente…
          </span>
        </div>

        <div
          style={{
            opacity: fadeIn(6),
            transform: `translateY(${slideUp(6)}px)`,
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#e94560",
            }}
          >
            ¿También puede
          </span>
        </div>

        <div
          style={{
            opacity: fadeIn(6),
            transform: `translateY(${slideUp(6)}px)`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#e94560",
            }}
          >
            resolverse rápidamente?
          </span>
        </div>

        <div
          style={{
            opacity: fadeIn(6),
            transform: `scale(${pulse})`,
          }}
        >
          <span
            style={{
              fontSize: 200,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#1a1a2e",
              lineHeight: 1,
            }}
          >
            ?
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
