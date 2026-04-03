import { colors } from '../../styles/tokens';

let ringCounter = 0;

export default function GradientRing({
  size = 120,
  c1 = colors.indigo,
  c2 = colors.cyan,
  strokeWidth = 2,
  style = {},
}) {
  const id = `ring-${size}-${++ringCounter}`;

  return (
    <svg
      width={size}
      height={size}
      style={{ ...style, position: 'absolute', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
