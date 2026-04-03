/**
 * アンケート質問データ
 */
export const questions = [
  {
    id: 'satisfaction',
    type: 'scale',
    label: '研修全体の満足度',
    desc: '本日の研修についてお聞かせください',
    required: true,
    options: ['1 不満', '2', '3 普通', '4', '5 満足'],
  },
  {
    id: 'impression',
    type: 'scale',
    label: 'AIへの印象の変化',
    desc: '研修前と比べて、AIに対する印象は変わりましたか',
    required: true,
    options: ['1 変わらない', '2', '3 やや前向き', '4', '5 とても前向き'],
  },
  {
    id: 'motivation',
    type: 'scale',
    label: '業務での活用意欲',
    desc: '今後、業務でAIを活用してみたいと思いますか',
    required: true,
    options: ['1 思わない', '2', '3 どちらとも', '4', '5 ぜひ活用したい'],
  },
  {
    id: 'tools',
    type: 'multi',
    label: '使ってみたいツール',
    desc: '今後使ってみたいAIツールをお選びください（複数可）',
    required: false,
    options: ['ChatGPT', 'NotebookLM', 'Claude', 'Copilot', 'その他'],
  },
  {
    id: 'useful',
    type: 'multi',
    label: '特に役立った内容',
    desc: '本日の研修で特に参考になったパートをお選びください（複数可）',
    required: false,
    options: [
      'AIツール紹介',
      '市場動向・ROI',
      '利用時の注意点',
      'デモ体験',
      '入力のコツ（音声・写真）',
    ],
  },
  {
    id: 'clarity',
    type: 'scale',
    label: '説明のわかりやすさ',
    desc: '講師の説明はわかりやすかったですか',
    required: true,
    options: ['1 わかりにくい', '2', '3 普通', '4', '5 わかりやすい'],
  },
  {
    id: 'expert',
    type: 'single',
    label: 'エキスパート研修への関心',
    desc: 'より実践的なエキスパート研修にご興味はありますか',
    required: false,
    options: ['はい、受講したい', '検討中', '今は必要ない'],
  },
  {
    id: 'freetext',
    type: 'text',
    label: 'ご意見・ご感想',
    desc: 'ご質問、ご感想、業務で困っていることなどご自由にお書きください',
    required: false,
  },
];

export const requiredFieldIds = questions
  .filter((q) => q.required)
  .map((q) => q.id);
