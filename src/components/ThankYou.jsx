import { colors } from '../styles/tokens';

export default function ThankYou({ onBackToForm }) {
  return (
    <div
      className="fade-in-up"
      style={{
        textAlign: 'center',
        padding: '80px 20px',
        maxWidth: 520,
        margin: '0 auto',
      }}
    >
      {/* チェックマークアイコン */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 88,
          height: 88,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.emerald}, ${colors.cyan})`,
          marginBottom: 28,
          animation: 'checkBounce 0.5s ease-out',
          boxShadow: '0 8px 30px rgba(16,185,129,0.3)',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: colors.text,
          margin: '0 0 14px',
          letterSpacing: '-0.02em',
        }}
      >
        ご回答ありがとうございました
      </h2>

      <p
        style={{
          fontSize: 14,
          color: colors.sub,
          lineHeight: 1.8,
          margin: '0 0 24px',
        }}
      >
        いただいたご意見は今後の研修改善に
        <br />
        活用させていただきます。
        <br />
        AIに関するご質問・ご相談はいつでもお気軽にどうぞ。
      </p>

      <div
        style={{
          width: 60,
          height: 3,
          background: `linear-gradient(90deg, ${colors.indigo}, ${colors.cyan})`,
          borderRadius: 2,
          margin: '0 auto 24px',
        }}
      />

      <div
        style={{
          display: 'inline-block',
          padding: '16px 32px',
          borderRadius: 14,
          background: `rgba(99,102,241,0.04)`,
          border: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: colors.indigo,
            margin: '0 0 4px',
          }}
        >
          AIさんいん / 株式会社タイヨー通信
        </p>
        <p style={{ fontSize: 12, color: colors.muted, margin: 0, lineHeight: 1.7 }}>
          TEL: 0859-27-1211
          <br />
          iwanari@taiyo-jp.com
        </p>
      </div>

      {onBackToForm && (
        <div style={{ marginTop: 28 }}>
          <button
            type="button"
            onClick={onBackToForm}
            style={{
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 600,
              color: colors.indigo,
              background: colors.white,
              border: `1px solid ${colors.indigo}40`,
              borderRadius: 24,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            アンケートのトップに戻る
          </button>
        </div>
      )}
    </div>
  );
}
