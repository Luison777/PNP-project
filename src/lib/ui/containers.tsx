import { interpolate } from "remotion";

type ExtrapolateType = "clamp" | "extend" | "identity";

interface AnimProp {
  input: number[];
  output: number[];
  extrapolateRight?: ExtrapolateType;
  extrapolateLeft?: ExtrapolateType;
}

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  frame: number;
  style?: React.CSSProperties;
  opacity?: AnimProp;
  translateY?: AnimProp;
  translateX?: AnimProp;
}

function safeInterpolate(frame: number, prop?: AnimProp, fallback = 0): number {
  if (!prop || prop.input.length < 2) return prop?.output[0] ?? fallback;
  return interpolate(frame, prop.input, prop.output, {
    extrapolateRight: prop.extrapolateRight ?? "clamp",
    extrapolateLeft: prop.extrapolateLeft ?? "clamp",
  });
}

function useAnimationStyle(
  frame: number,
  props: Pick<ContainerProps, "opacity" | "translateX" | "translateY">,
) {
  const opacityVal = safeInterpolate(frame, props.opacity, 1);
  const translateX = safeInterpolate(frame, props.translateX, 0);
  const translateY = safeInterpolate(frame, props.translateY, 0);
  return {
    opacity: opacityVal,
    transform: `translateX(${translateX}px) translateY(${translateY}px)`,
  };
}

function Div({
  className,
  children,
  frame,
  style,
  opacity,
  translateX,
  translateY,
}: ContainerProps) {
  const animStyle = useAnimationStyle(frame, {
    opacity,
    translateX,
    translateY,
  });
  return (
    <div className={className} style={{ ...style, ...animStyle }}>
      {children}
    </div>
  );
}

function Span({
  className,
  children,
  frame,
  style,
  opacity,
  translateX,
  translateY,
}: ContainerProps) {
  const animStyle = useAnimationStyle(frame, {
    opacity,
    translateX,
    translateY,
  });
  return (
    <span className={className} style={{ ...style, ...animStyle }}>
      {children}
    </span>
  );
}

export { Div, Span };
