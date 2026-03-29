import { useState, useEffect } from 'react';
import { colors } from './styles/tokens';
import { loadResponses, saveResponses } from './utils/storage';
import SurveyForm from './components/SurveyForm';
import ThankYou from './components/ThankYou';
import AdminView from './components/AdminView';

export default function App() {
  const [view, setView] = useState('form'); // form | thanks | admin
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

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
        overflow: 'hidden',
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

      {/* 管理画面ボタン */}
      {view !== 'admin' && (
        <div style={{ position: 'fixed', top: 14, right: 14, zIndex: 100 }}>
          <button
            type="button"
            onClick={() => {
              setView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              padding: '6px 14px',
              fontSize: 11,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              background: `${colors.white}ee`,
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              color: colors.muted,
              transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            管理画面
          </button>
        </div>
      )}

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

      {/* フッター */}
      <div
        style={{
          textAlign: 'center',
          padding: '16px 20px 20px',
          borderTop: `1px solid ${colors.border}`,
          fontSize: 10,
          color: colors.muted,
        }}
      >
        &copy; {new Date().getFullYear()} AIさんいん / 株式会社タイヨー通信
      </div>
    </div>
  );
}
