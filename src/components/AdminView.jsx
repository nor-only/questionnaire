import { colors } from '../styles/tokens';
import { exportResponsesAsCSV, clearResponses } from '../utils/storage';

export default function AdminView({ responses, onBack, onReset }) {
  const avg = (field) => {
    const vals = responses.map((r) => r[field]).filter(Boolean);
    if (!vals.length) return '-';
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  const countMulti = (field) => {
    const map = {};
    responses.forEach((r) => {
      (r[field] || []).forEach((v) => {
        map[v] = (map[v] || 0) + 1;
      });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };

  const countSingle = (field) => {
    const map = {};
    responses.forEach((r) => {
      if (r[field]) map[r[field]] = (map[r[field]] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };

  const handleExportCSV = () => {
    const csv = exportResponsesAsCSV(responses);
    if (!csv) return;
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-results-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm('全データを削除しますか？この操作は取り消せません。')) {
      clearResponses();
      onReset();
    }
  };

  const scaleFields = [
    { id: 'satisfaction', label: '研修満足度', emoji: '' },
    { id: 'impression', label: 'AI印象変化', emoji: '' },
    { id: 'motivation', label: '活用意欲', emoji: '' },
    { id: 'clarity', label: '説明わかりやすさ', emoji: '' },
  ];

  const maxBarWidth = 220;

  return (
    <div
      className="fade-in"
      style={{ maxWidth: 740, margin: '0 auto', padding: '0 20px' }}
    >
      {/* ヘッダー */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: colors.text,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          アンケート集計結果
        </h2>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: '8px 20px',
            fontSize: 13,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            background: colors.white,
            cursor: 'pointer',
            color: colors.sub,
            transition: 'all 0.2s',
          }}
        >
          ← フォームに戻る
        </button>
      </div>

      {/* サマリーバー */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p style={{ fontSize: 14, color: colors.sub, margin: 0 }}>
          回答数：
          <strong
            style={{ color: colors.indigo, fontSize: 20, marginLeft: 4 }}
          >
            {responses.length}
          </strong>{' '}
          件
        </p>
        {responses.length > 0 && (
          <button
            type="button"
            onClick={handleExportCSV}
            style={{
              padding: '6px 16px',
              fontSize: 12,
              border: `1px solid ${colors.indigo}40`,
              borderRadius: 8,
              background: `rgba(99,102,241,0.06)`,
              cursor: 'pointer',
              color: colors.indigo,
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            CSV出力
          </button>
        )}
      </div>

      {responses.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: colors.muted,
          }}
        >
          <p style={{ fontSize: 48, marginBottom: 12 }}>-</p>
          <p style={{ fontSize: 14 }}>まだ回答がありません</p>
        </div>
      ) : (
        <>
          {/* スコアカード */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 14,
              marginBottom: 32,
            }}
          >
            {scaleFields.map((f) => {
              const val = avg(f.id);
              const numVal = parseFloat(val) || 0;
              const barPct = (numVal / 5) * 100;
              return (
                <div
                  key={f.id}
                  style={{
                    padding: '20px 16px',
                    borderRadius: 14,
                    border: `1px solid ${colors.border}`,
                    background: colors.white,
                    textAlign: 'center',
                    transition: 'box-shadow 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${colors.indigo}, ${colors.cyan})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.2,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: colors.muted,
                      margin: '2px 0 8px',
                    }}
                  >
                    / 5.0
                  </div>
                  {/* ミニバー */}
                  <div
                    style={{
                      height: 4,
                      background: colors.border,
                      borderRadius: 2,
                      overflow: 'hidden',
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: `${barPct}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${colors.indigo}, ${colors.cyan})`,
                        borderRadius: 2,
                        transition: 'width 0.6s ease',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: colors.sub,
                      fontWeight: 600,
                    }}
                  >
                    {f.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 使ってみたいツール */}
          <Section title="使ってみたいツール">
            {countMulti('tools').map(([name, count]) => (
              <BarItem
                key={name}
                name={name}
                count={count}
                total={responses.length}
                maxWidth={maxBarWidth}
                gradient={`linear-gradient(90deg, ${colors.indigo}, ${colors.cyan})`}
              />
            ))}
            {countMulti('tools').length === 0 && <EmptyState />}
          </Section>

          {/* 特に役立った内容 */}
          <Section title="特に役立った内容">
            {countMulti('useful').map(([name, count]) => (
              <BarItem
                key={name}
                name={name}
                count={count}
                total={responses.length}
                maxWidth={maxBarWidth}
                gradient={`linear-gradient(90deg, ${colors.emerald}, ${colors.cyan})`}
              />
            ))}
            {countMulti('useful').length === 0 && <EmptyState />}
          </Section>

          {/* エキスパート研修への関心 */}
          <Section title="エキスパート研修への関心">
            {countSingle('expert').map(([name, count]) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: `1px solid ${colors.border}`,
                  fontSize: 13,
                  color: colors.text,
                }}
              >
                <span>{name}</span>
                <strong style={{ color: colors.violet }}>{count} 件</strong>
              </div>
            ))}
            {countSingle('expert').length === 0 && <EmptyState />}
          </Section>

          {/* 自由記述 */}
          <Section title="自由記述">
            {responses.filter((r) => r.freetext).length === 0 ? (
              <p style={{ fontSize: 12, color: colors.muted }}>記述なし</p>
            ) : (
              responses
                .filter((r) => r.freetext)
                .map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 14px',
                      marginBottom: 8,
                      borderRadius: 10,
                      background: '#F8F9FB',
                      border: `1px solid ${colors.border}`,
                      fontSize: 13,
                      color: colors.text,
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ whiteSpace: 'pre-wrap' }}>{r.freetext}</div>
                    <div
                      style={{
                        fontSize: 10,
                        color: colors.muted,
                        marginTop: 6,
                        textAlign: 'right',
                      }}
                    >
                      {new Date(r.timestamp).toLocaleString('ja-JP')}
                    </div>
                  </div>
                ))
            )}
          </Section>

          {/* リセットボタン */}
          <div style={{ textAlign: 'center', margin: '32px 0 48px' }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '8px 24px',
                fontSize: 12,
                border: `1px solid rgba(244,63,94,0.3)`,
                borderRadius: 8,
                background: colors.white,
                cursor: 'pointer',
                color: colors.rose,
                transition: 'all 0.2s',
              }}
            >
              全データをリセット
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div
      style={{
        marginBottom: 24,
        padding: '20px 20px',
        borderRadius: 14,
        border: `1px solid ${colors.border}`,
        background: colors.white,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <h4
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: colors.text,
          margin: '0 0 14px',
          paddingBottom: 10,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function BarItem({ name, count, total, maxWidth, gradient }) {
  const pct = total > 0 ? count / total : 0;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: Math.max(pct * maxWidth, 24),
          height: 24,
          borderRadius: 6,
          background: gradient,
          transition: 'width 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 6,
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: colors.white,
            fontWeight: 700,
          }}
        >
          {Math.round(pct * 100)}%
        </span>
      </div>
      <span style={{ fontSize: 12, color: colors.text, fontWeight: 500 }}>
        {name}
        <span style={{ color: colors.muted, marginLeft: 4 }}>({count})</span>
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <p style={{ fontSize: 12, color: colors.muted, padding: '8px 0' }}>
      データなし
    </p>
  );
}
