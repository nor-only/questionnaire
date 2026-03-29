/**
 * アンケート回答の永続化ユーティリティ
 * localStorage を使用してブラウザにデータを保存
 */

const STORAGE_KEY = 'ai-sannin-survey-responses';

export function loadResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveResponses(responses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    return true;
  } catch (e) {
    console.error('Storage error:', e);
    return false;
  }
}

export function clearResponses() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function exportResponsesAsCSV(responses) {
  if (!responses.length) return '';

  const headers = [
    'timestamp',
    'satisfaction',
    'impression',
    'motivation',
    'tools',
    'useful',
    'clarity',
    'expert',
    'freetext',
  ];

  const rows = responses.map((r) =>
    headers.map((h) => {
      const val = r[h];
      if (Array.isArray(val)) return `"${val.join(', ')}"`;
      if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val ?? '';
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
