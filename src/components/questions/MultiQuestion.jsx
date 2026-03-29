import { colors } from '../../styles/tokens';

export default function MultiQuestion({ question, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt)
      ? value.filter((v) => v !== opt)
      : [...value, opt];
    onChange(next);
  };

  return (
    <div className="choice-options">
      {question.options.map((opt) => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            aria-pressed={active}
            style={{
              padding: '10px 18px',
              border: active
                ? `2px solid ${colors.emerald}`
                : `1px solid ${colors.border}`,
              borderRadius: 24,
              background: active
                ? `rgba(16,185,129,0.08)`
                : colors.white,
              color: active ? colors.emerald : colors.sub,
              fontWeight: active ? 600 : 400,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: active ? 'scale(1.03)' : 'scale(1)',
              boxShadow: active
                ? '0 2px 8px rgba(16,185,129,0.15)'
                : '0 1px 2px rgba(0,0,0,0.04)',
            }}
          >
            {active && (
              <span style={{ marginRight: 4 }}>✓</span>
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
