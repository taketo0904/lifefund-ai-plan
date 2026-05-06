// §10.2 チーム体制（3フェーズ拡張）
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
  members: string[]; // member ids
};

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    role: "事業推進・PM・営業・CS兼務",
    person: "中川",
    employment: "社員",
    monthly: 0,
    phase: 1,
    responsibilities: [
      "事業全体の推進・意思決定",
      "重役層エスカレーション",
      "初期営業・商談・受注",
      "KPIダッシュボード管理",
      "クリエイティブ作成・仮説検証",
    ],
  },
  {
    id: "m2",
    role: "オペレーション・選考補助",
    person: "業務委託（フリーランス）",
    employment: "業務委託",
    monthly: 50,
    phase: 1,
    responsibilities: [
      "候補者スカウト・選考",
      "求人台帳・求職台帳の運用",
      "請求・契約事務",
      "個人情報運用補助",
    ],
  },
  {
    id: "m3",
    role: "営業AE（中堅商談・受注）",
    person: "新規採用",
    employment: "未定",
    monthly: 70,
    phase: 2,
    responsibilities: [
      "for Biz・中堅企業の本商談",
      "提案書作成・クロージング",
      "リファレンスチェック",
      "見積作成・交渉",
    ],
  },
  {
    id: "m4",
    role: "営業SDR（HL運用・コールド）",
    person: "新規採用",
    employment: "未定",
    monthly: 50,
    phase: 2,
    responsibilities: [
      "HL45,000件の運用・送信",
      "コールドメール・電話",
      "返信対応・アポ取得",
      "ファネルKPI管理",
    ],
  },
  {
    id: "m5",
    role: "マーケティング担当",
    person: "新規採用",
    employment: "未定",
    monthly: 50,
    phase: 3,
    responsibilities: [
      "HLクリエイティブ（タイトル・コピー・CTA）",
      "AB テスト設計・運用",
      "LP改善・コンテンツ作成",
      "SNS運用・スタートアップ層リーチ",
    ],
  },
];

export const phases: Phase[] = [
  {
    num: 1,
    period: "5-7月（W1-12）",
    trigger: "事業開始時",
    totalMonthly: 130,
    totalAnnual: 1560,
    headcount: 2,
    members: ["m1", "m2"],
  },
  {
    num: 2,
    period: "8月以降",
    trigger: "月次売上 500万 達成後",
    totalMonthly: 250,
    totalAnnual: 3000,
    headcount: 4,
    members: ["m1", "m2", "m3", "m4"],
  },
  {
    num: 3,
    period: "12月以降",
    trigger: "月次売上 2,500万 達成後",
    totalMonthly: 300,
    totalAnnual: 3600,
    headcount: 5,
    members: ["m1", "m2", "m3", "m4", "m5"],
  },
];
