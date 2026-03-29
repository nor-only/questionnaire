import { colors } from '../../styles/tokens';

export default function SingleQuestion({ question, value, onChange }) {
  return (
    <div className="choice-options">
      {question.options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={active}
            style={{
              padding: '12px 22px',
              border: active
                ? `2px solid ${colors.violet}`
                : `1px solid ${colors.border}`,
              borderRadius: 12,
              background: active
                ? `rgba(139,92,246,0.08)`
                : colors.white,
              color: active ? colors.violet : colors.sub,
              fontWeight: active ? 600 : 400,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: active ? 'scale(1.03)' : 'scale(1)',
              boxShadow: active
                ? '0 2px 8px rgba(139,92,246,0.15)'
                : '0 1px 2px rgba(0,0,0,0.04)',
            }}
          >
            {active && (
              <span style={{ marginRight: 6, fontSize: 14 }}>●</span>
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
