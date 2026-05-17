import {
  AbsoluteFill,
  Html5Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (startS: number, duration = 0.6) =>
    interpolate(frame, [fps * startS, fps * (startS + duration)], [0, 1], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  const slideUp = (startS: number) =>
    interpolate(frame, [fps * startS, fps * (startS + 0.6)], [60, 0], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    });

  // P=NP fades out at 4s
  const pnpFadeOut = interpolate(frame, [fps * 3.5, fps * 4], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Think character appears at 4s
  const thinkOpacity = interpolate(frame, [fps * 4, fps * 4.6], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // X inside bubble appears at 5.5s
  const xOpacity = interpolate(frame, [fps * 5.5, fps * 6.2], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const xScale = interpolate(frame, [fps * 5.5, fps * 6.2], [0.2, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Think fades out at 9s
  const thinkFadeOut = interpolate(frame, [fps * 8.5, fps * 9], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Dollar appears at 9s
  const dollarOpacity = interpolate(frame, [fps * 9, fps * 9.8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const dollarScale = interpolate(frame, [fps * 9, fps * 10], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      <Html5Audio src={staticFile("audio/13.mp3")} />
      <Background />

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeIn(0) * pnpFadeOut,
          transform: `translateY(${slideUp(0)}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 200,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#1a1a2e",
            }}
          >
            P
          </span>
          <span
            style={{
              fontSize: 140,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#555",
            }}
          >
            =
          </span>
          <span
            style={{
              fontSize: 200,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#e94560",
            }}
          >
            NP
          </span>
          <span
            style={{
              fontSize: 130,
              fontFamily: "sans-serif",
              fontWeight: 900,
              color: "#e94560",
              marginLeft: 8,
            }}
          >
            ?
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: thinkOpacity * thinkFadeOut,
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 500,
            height: 380,
          }}
        >
          <Img
            src={staticFile("scene4/thought-bubble.svg")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: `translate(-50%, 0) scale(${xScale})`,
              opacity: xOpacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 160,
              height: 160,
            }}
          >
            <span
              style={{
                fontSize: 160,
                fontFamily: "sans-serif",
                fontWeight: 900,
                color: "#e94560",
                lineHeight: 1,
              }}
            >
              ✗
            </span>
          </div>
        </div>

        <Img
          src={staticFile("scene4/think.svg")}
          style={{
            width: 300,
            height: 300,
            objectFit: "contain",
            marginTop: -40,
          }}
        />

        <div style={{ opacity: xOpacity, marginTop: 20, textAlign: "center" }}>
          <span
            style={{
              fontSize: 48,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#333",
            }}
          >
            Nadie ha podido demostrarlo...
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: dollarOpacity,
          transform: `scale(${dollarScale})`,
        }}
      >
        <Img
          src={staticFile("scene10/dollar.svg")}
          style={{ width: 400, height: 400, objectFit: "contain" }}
        />
        <span
          style={{
            fontSize: 90,
            fontFamily: "sans-serif",
            fontWeight: 900,
            color: "#27ae60",
            textAlign: "center",
          }}
        >
          $1,000,000
        </span>
        <span
          style={{
            fontSize: 52,
            fontFamily: "sans-serif",
            fontWeight: 500,
            color: "#555",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Literalmente.
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
