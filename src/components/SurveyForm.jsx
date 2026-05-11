import { useState, useMemo } from 'react';
import { colors, questionGradients } from '../styles/tokens';
import { questions, requiredFieldIds } from '../data/questions';
import GradientCircle from './ui/GradientCircle';
import GradientRing from './ui/GradientRing';
import ProgressBar from './ui/ProgressBar';
import ScaleQuestion from './questions/ScaleQuestion';
import MultiQuestion from './questions/MultiQuestion';
import SingleQuestion from './questions/SingleQuestion';
import TextQuestion from './questions/TextQuestion';

export default function SurveyForm({ onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (id, val) => setAnswers((prev) => ({ ...prev, [id]: val }));

  const canSubmit = requiredFieldIds.every((f) => answers[f]);

  // 回答済み質問数を計算（プログレスバー用）
  const answeredCount = useMemo(() => {
    return questions.filter((q) => {
      const a = answers[q.id];
      if (a === undefined || a === null || a === '') return false;
      if (Array.isArray(a) && a.length === 0) return false;
      return true;
    }).length;
  }, [answers]);

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    await onSubmit(answers);
    setSubmitting(false);
  };

  const renderQuestion = (q) => {
    switch (q.type) {
      case 'scale':
        return (
          <ScaleQuestion
            question={q}
            value={answers[q.id]}
            onChange={(v) => set(q.id, v)}
          />
        );
      case 'multi':
        return (
          <MultiQuestion
            question={q}
            value={answers[q.id] || []}
            onChange={(v) => set(q.id, v)}
          />
        );
      case 'single':
        return (
          <SingleQuestion
            question={q}
            value={answers[q.id]}
            onChange={(v) => set(q.id, v)}
          />
        );
      case 'text':
        return (
          <TextQuestion
            value={answers[q.id] || ''}
            onChange={(v) => set(q.id, v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ProgressBar current={answeredCount} total={questions.length} />

      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0 12px',
          width: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* ヘッダー */}
        <div
          className="fade-in-up"
          style={{
            textAlign: 'center',
            marginBottom: 36,
            marginTop: 24,
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <GradientRing
            size={200}
            style={{ top: -60, right: -40, opacity: 0.12 }}
          />
          <GradientRing
            size={140}
            c1={colors.cyan}
            c2={colors.emerald}
            style={{ bottom: -30, left: -30, opacity: 0.1 }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <GradientCircle size={10} />
            <GradientCircle size={10} c1={colors.cyan} c2={colors.emerald} />
            <GradientCircle size={10} c1={colors.violet} c2={colors.rose} />
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.text,
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
            }}
          >
            AI<span style={{ color: colors.indigo }}>スタンダード</span>研修
          </h1>
          <p
            style={{
              fontSize: 16,
              color: colors.indigo,
              fontWeight: 600,
              margin: '0 0 6px',
            }}
          >
            受講アンケート
          </p>
          <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>
            AIさんいん / 株式会社タイヨー通信
          </p>

          <div
            style={{
              width: 80,
              height: 3,
              background: `linear-gradient(90deg, ${colors.indigo}, ${colors.cyan})`,
              borderRadius: 2,
              margin: '14px auto 0',
            }}
          />
        </div>

        <p
          className="fade-in-up"
          style={{
            fontSize: 13,
            color: colors.sub,
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 1.8,
            animationDelay: '0.1s',
          }}
        >
          本日はご参加いただきありがとうございました。
          <br />
          今後の研修改善のため、ぜひアンケートにご協力ください。（所要時間：約2分）
        </p>

        {/* 質問カード */}
        {questions.map((q, idx) => {
          const grad = questionGradients[idx];
          const isAnswered = (() => {
            const a = answers[q.id];
            if (a === undefined || a === null || a === '') return false;
            if (Array.isArray(a) && a.length === 0) return false;
            return true;
          })();

          return (
            <div
              key={q.id}
              className="fade-in-up question-card"
              style={{
                marginBottom: 24,
                borderRadius: 16,
                border: `1px solid ${isAnswered ? `${colors.indigo}30` : colors.border}`,
                background: colors.white,
                position: 'relative',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                boxShadow: isAnswered
                  ? '0 2px 12px rgba(99,102,241,0.08)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
                animationDelay: `${0.05 * (idx + 2)}s`,
              }}
            >
              {/* 回答済みインジケーター */}
              {isAnswered && (
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: colors.emerald,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'checkBounce 0.3s ease-out',
                  }}
                >
                  <span
                    style={{
                      color: colors.white,
                      fontSize: 11,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    ✓
                  </span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 6,
                }}
              >
                <GradientCircle className="question-header-icon" c1={grad.c1} c2={grad.c2}>
                  <span
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {idx + 1}
                  </span>
                </GradientCircle>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {q.label}
                  {q.required && (
                    <span
                      style={{
                        color: colors.rose,
                        marginLeft: 4,
                        fontSize: 11,
                      }}
                    >
                      必須
                    </span>
                  )}
                </h3>
              </div>
              <p
                className="question-desc"
                style={{
                  fontSize: 12,
                  color: colors.muted,
                }}
              >
                {q.desc}
              </p>
              <div className="question-body">{renderQuestion(q)}</div>
            </div>
          );
        })}

        {/* 送信ボタン */}
        <div
          className="fade-in-up"
          style={{
            textAlign: 'center',
            marginTop: 12,
            marginBottom: 48,
            animationDelay: '0.6s',
          }}
        >
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            style={{
              padding: '16px 56px',
              fontSize: 16,
              fontWeight: 700,
              color: colors.white,
              background: canSubmit
                ? `linear-gradient(135deg, ${colors.indigo}, ${colors.cyan})`
                : colors.border,
              border: 'none',
              borderRadius: 32,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              boxShadow: canSubmit
                ? '0 4px 20px rgba(99,102,241,0.35)'
                : 'none',
              transform: canSubmit ? 'translateY(0)' : 'none',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => {
              if (canSubmit) e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (canSubmit) e.target.style.transform = 'translateY(0)';
            }}
          >
            {submitting ? (
              <span style={{ animation: 'pulse 1s infinite' }}>送信中…</span>
            ) : (
              '回答を送信する'
            )}
          </button>
          {!canSubmit && (
            <p
              style={{
                fontSize: 11,
                color: colors.rose,
                marginTop: 10,
                animation: 'fadeIn 0.3s ease',
              }}
            >
              ※「必須」マーク付きの質問にご回答ください
            </p>
          )}
        </div>
      </div>
    </>
  );
}
