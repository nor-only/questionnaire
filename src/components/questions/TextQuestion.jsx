import { colors } from '../../styles/tokens';

export default function TextQuestion({ value = '', onChange }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="こちらにご記入ください…"
      rows={4}
      style={{
        width: '100%',
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        fontFamily: 'inherit',
        resize: 'vertical',
        outline: 'none',
        boxSizing: 'border-box',
        lineHeight: 1.6,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        background: colors.white,
      }}
    />
  );
}
