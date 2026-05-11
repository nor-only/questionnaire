import { colors } from '../../styles/tokens';

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: `${colors.white}ee`,
        backdropFilter: 'blur(8px)',
        padding: '12px 16px',
        borderBottom: `1px solid ${colors.border}`,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          minWidth: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 6,
            background: `${colors.border}`,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${colors.indigo}, ${colors.cyan})`,
              borderRadius: 3,
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: pct === 100 ? colors.emerald : colors.muted,
            minWidth: 36,
            textAlign: 'right',
            transition: 'color 0.3s',
          }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
}
