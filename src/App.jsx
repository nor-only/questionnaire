import { useState, useEffect, useRef, useCallback } from 'react';
import { colors } from './styles/tokens';
import { loadResponses, saveResponses } from './utils/storage';
import SurveyForm from './components/SurveyForm';
import ThankYou from './components/ThankYou';
import AdminView from './components/AdminView';

const ADMIN_PASSWORD = 'ai3in123c';

export default function App() {
  const [view, setView] = useState('form'); // form | thanks | admin
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);

  useEffect(() => {
    setResponses(loadResponses());
    setLoading(false);
  }, []);

  const handleSubmit = async (answers) => {
    const entry = { ...answers, timestamp: new Date().toISOString() };
    const updated = [...responses, entry];
    saveResponses(updated);
    setResponses(updated);
    setView('thanks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResponses([]);
    setView('form');
  };

  const handleFooterTap = useCallback(() => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      setPasswordError(false);
      setShowPasswordModal(true);
    } else {
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 800);
    }
  }, []);

  const handlePasswordSubmit = (password) => {
    if (password === ADMIN_PASSWORD) {
      setShowPasswordModal(false);
      setPasswordError(false);
      setView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPasswordError(true);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: colors.bg,
        }}
      >
        <div
          style={{
            color: colors.muted,
            fontSize: 14,
            animation: 'pulse 1.5s infinite',
          }}
        >
          読み込み中…
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        position: 'relative',
      }}
    >
      {/* トップグラデーションバー */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${colors.indigo}, ${colors.violet}, ${colors.cyan})`,
          backgroundSize: '200% 100%',
          animation: 'gradientShift 4s ease infinite',
        }}
      />

      <div style={{ paddingTop: view === 'form' ? 0 : 32, paddingBottom: 40 }}>
        {view === 'form' && <SurveyForm onSubmit={handleSubmit} />}
        {view === 'thanks' && (
          <ThankYou
            onBackToForm={() => {
              setView('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        {view === 'admin' && (
          <AdminView
            responses={responses}
            onBack={() => {
              setView('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReset={handleReset}
          />
        )}
      </div>

      {/* フッター（3回タップで管理画面） */}
      <div
        onClick={handleFooterTap}
        style={{
          textAlign: 'center',
          padding: '16px 20px 20px',
          borderTop: `1px solid ${colors.border}`,
          fontSize: 10,
          color: colors.muted,
          cursor: 'default',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        &copy; {new Date().getFullYear()} AIさんいん / 株式会社タイヨー通信
      </div>

      {/* パスワードモーダル */}
      {showPasswordModal && (
        <PasswordModal
          onSubmit={handlePasswordSubmit}
          onClose={() => {
            setShowPasswordModal(false);
            setPasswordError(false);
          }}
          error={passwordError}
        />
      )}
    </div>
  );
}

function PasswordModal({ onSubmit, onClose, error }) {
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: colors.white,
          borderRadius: 16,
          padding: '28px 24px',
          width: '100%',
          maxWidth: 340,
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          animation: 'scaleIn 0.2s ease',
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: colors.text,
            margin: '0 0 16px',
            textAlign: 'center',
          }}
        >
          管理者パスワード
        </h3>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="パスワードを入力"
          style={{
            width: '100%',
            padding: '12px 14px',
            fontSize: 14,
            border: `1px solid ${error ? colors.rose : colors.border}`,
            borderRadius: 10,
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = colors.indigo;
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = colors.border;
          }}
        />
        {error && (
          <p
            style={{
              fontSize: 11,
              color: colors.rose,
              margin: '8px 0 0',
              textAlign: 'center',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            パスワードが正しくありません
          </p>
        )}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 18,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px 0',
              fontSize: 13,
              fontWeight: 600,
              color: colors.sub,
              background: colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            キャンセル
          </button>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '10px 0',
              fontSize: 13,
              fontWeight: 600,
              color: colors.white,
              background: `linear-gradient(135deg, ${colors.indigo}, ${colors.cyan})`,
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
}
