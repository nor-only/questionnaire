import { colors } from '../../styles/tokens';

export default function ScaleQuestion({ question, value, onChange }) {
  return (
    <div className="scale-options">
      {question.options.map((opt, i) => {
        const val = i + 1;
        const active = value === val;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(val)}
            aria-pressed={active}
            style={{
              border: active
                ? `2px solid ${colors.indigo}`
                : `1px solid ${colors.border}`,
              borderRadius: 12,
              background: active
                ? `linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.08))`
                : colors.white,
              color: active ? colors.indigo : colors.sub,
              fontWeight: active ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: active ? 'scale(1.03)' : 'scale(1)',
              boxShadow: active
                ? '0 2px 8px rgba(99,102,241,0.15)'
                : '0 1px 2px rgba(0,0,0,0.04)',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
