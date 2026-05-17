import {
  AbsoluteFill,
  Html5Audio,
  Img,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

import { Div, Span } from "../lib/ui/containers";

const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "white" }} />
);

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconSize = 280;

  return (
    <AbsoluteFill>
      <Html5Audio src={staticFile("audio/8.mp3")} />
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
        <Div
          frame={frame}
          opacity={{
            input: [fps * 0, fps * 0.6],
            output: [0, 1],
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }}
          style={{}}
        >
          <Span
            frame={frame}
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
          </Span>
        </Div>

        <Div
          frame={frame}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Div
            frame={frame}
            opacity={{
              input: [fps * 0.5, fps * 1.1],
              output: [0, 1],
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }}
            translateY={{
              input: [fps * 0.5, fps * 1.1],
              output: [60, 0],
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
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
            <Span
              frame={frame}
              style={{
                fontSize: 38,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Caja fuerte
            </Span>
          </Div>

          <Div
            frame={frame}
            opacity={{
              input: [fps * 3, fps * 3.6],
              output: [0, 1],
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }}
            translateY={{
              input: [fps * 3, fps * 3.6],
              output: [60, 0],
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
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
            <Span
              frame={frame}
              style={{
                fontSize: 38,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Combinación
            </Span>
          </Div>

          <Div
            frame={frame}
            opacity={{
              input: [fps * 6, fps * 6.6],
              output: [0, 1],
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }}
            translateY={{
              input: [fps * 6, fps * 6.6],
              output: [60, 0],
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
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
            <Span
              frame={frame}
              style={{
                fontSize: 38,
                fontFamily: "sans-serif",
                fontWeight: 600,
                color: "#333",
              }}
            >
              Verificar
            </Span>
          </Div>
        </Div>

        <Div
          frame={frame}
          opacity={{
            input: [fps * 7, fps * 7.6],
            output: [0, 1],
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }}
          style={{
            textAlign: "center",
          }}
        >
          <Span
            frame={frame}
            style={{
              fontSize: 44,
              fontFamily: "sans-serif",
              fontWeight: 500,
              color: "#444",
              fontStyle: "italic",
            }}
          >
            Difícil de encontrar, fácil de verificar
          </Span>
        </Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
