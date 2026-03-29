import { colors } from '../../styles/tokens';

export default function GradientCircle({
  size = 40,
  c1 = colors.indigo,
  c2 = colors.cyan,
  className,
  style = {},
  children,
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
