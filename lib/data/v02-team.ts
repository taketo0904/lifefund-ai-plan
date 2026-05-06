// チーム体制（建築AI経営研究会 アップセル戦略）
export type TeamMember = {
  id: string;
  role: string;
  person: string;
  employment: "社員" | "業務委託" | "未定";
  monthly: number; // 万円
  phase: 1 | 2 | 3;
  responsibilities: string[];
};

export type Phase = {
  num: 1 | 2 | 3;
  period: string;
  trigger: string;
  totalMonthly: number;
  totalAnnual: number;
  headcount: number;
  members: string[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    role: "代表 / 戦略・営業統括",
    person: "白都社長",
    employment: "社員",
    monthly: 100,
    phase: 1,
    responsibilities: [
      "事業戦略・経営判断",
      "Tier 1 経営者AI武装プログラムの主担当（個別コーチング）",
      "研究会月例会の主催・登壇",
      "Tier 3/4 の重要商談クロージング",
      "業界団体・パートナーアライアンス",
    ],
  },
  {
    id: "m2",
    role: "営業＋コンサル実装",
    person: "三山さん",
    employment: "社員",
    monthly: 70,
    phase: 1,
    responsibilities: [
      "Tier 1 個別コーチング（白都と分担）",
      "Tier 2 実装パッケージのPM",
      "新規リード商談・提案書作成",
      "既存会員のCS・継続支援",
      "AI実装の業務ヒアリング・要件定義",
    ],
  },
  {
    id: "m3",
    role: "コンテンツ・運営",
    person: "橋本さん",
    employment: "社員",
    monthly: 60,
    phase: 1,
    responsibilities: [
      "月10本動画コンテンツの制作・編集",
      "研究会月例会の運営・配信",
      "LP・SNS・LinkedInコンテンツ",
      "アーカイブ・コミュニティ運営",
      "事例レポート作成",
    ],
  },
  {
    id: "m4",
    role: "AI実装エンジニア（業務委託）",
    person: "外部パートナー",
    employment: "業務委託",
    monthly: 60,
    phase: 2,
    responsibilities: [
      "Tier 2 案件の実装担当（積算・図面・営業AI化等）",
      "建築業界の業務知識をベースにしたAIワークフロー設計",
      "ChatGPT/Claude/Zapier 等の実装・運用",
      "クライアント社員へのAI研修",
    ],
  },
  {
    id: "m5",
    role: "Tier 3/4 シニアコンサル（業務委託）",
    person: "外部経営コンサル経験者",
    employment: "業務委託",
    monthly: 80,
    phase: 2,
    responsibilities: [
      "Tier 3 事業変革コンサルの実行支援",
      "中期経営計画・新規事業計画の策定支援",
      "経営会議・役員会同席",
      "M&A戦略策定の事前検討（Phase 3前倒し）",
    ],
  },
  {
    id: "m6",
    role: "M&Aアドバイザー（業務委託 / 提携）",
    person: "金融機関OB or M&A仲介経験者",
    employment: "業務委託",
    monthly: 50,
    phase: 3,
    responsibilities: [
      "Tier 4 M&A仲介の実務担当",
      "DD（デューデリジェンス）の遂行",
      "PMI（買収後統合）の実装",
      "金融機関・税理士・弁護士との折衝",
    ],
  },
];

export const phases: Phase[] = [
  {
    num: 1,
    period: "2026/05 - 2026/10（Phase 1）",
    trigger: "Tier 1ローンチ時",
    totalMonthly: 230,
    totalAnnual: 2760,
    headcount: 3,
    members: ["m1", "m2", "m3"],
  },
  {
    num: 2,
    period: "2026/11 - 2027/04（Phase 2）",
    trigger: "Tier 2 初回案件契約後",
    totalMonthly: 370,
    totalAnnual: 4440,
    headcount: 5,
    members: ["m1", "m2", "m3", "m4", "m5"],
  },
  {
    num: 3,
    period: "2027/05 -（Phase 3）",
    trigger: "M&A仲介機能ローンチ時",
    totalMonthly: 420,
    totalAnnual: 5040,
    headcount: 6,
    members: ["m1", "m2", "m3", "m4", "m5", "m6"],
  },
];
