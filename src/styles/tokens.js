/**
 * デザイントークン - プレゼンテーションと統一したカラーパレット
 */
export const colors = {
  // Primary
  indigo: '#6366F1',
  violet: '#8B5CF6',
  cyan: '#06B6D4',
  emerald: '#10B981',
  amber: '#F59E0B',
  rose: '#F43F5E',

  // Neutrals
  bg: '#FAFBFE',
  text: '#111827',
  sub: '#6B7280',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  white: '#FFFFFF',

  // Semantic
  success: '#10B981',
  error: '#F43F5E',
  warning: '#F59E0B',
};

/**
 * 質問カテゴリごとのグラデーション配色
 */
export const questionGradients = [
  { c1: colors.indigo, c2: colors.violet },   // Q1-Q3: 満足度系
  { c1: colors.indigo, c2: colors.violet },
  { c1: colors.indigo, c2: colors.violet },
  { c1: colors.cyan, c2: colors.emerald },    // Q4-Q5: 選択系
  { c1: colors.cyan, c2: colors.emerald },
  { c1: colors.violet, c2: colors.rose },     // Q6-Q7: 評価系
  { c1: colors.violet, c2: colors.rose },
  { c1: colors.amber, c2: colors.amber },     // Q8: 自由記述
];

export const fontFamily = '-apple-system, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", Meiryo, sans-serif';
