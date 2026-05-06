// 更新版 価格設計（市場相場2026反映）
export type PricingTier = {
  rank: string;
  candidatePay: number; // 時給
  clientBill: number; // 時給
  marginPerHour: number; // 時給差分
  marginRate: number; // %
};

export const jukuninPricing: PricingTier[] = [
  { rank: "ジュニア", candidatePay: 5000, clientBill: 7500, marginPerHour: 2500, marginRate: 33 },
  { rank: "ミドル", candidatePay: 6500, clientBill: 10000, marginPerHour: 3500, marginRate: 35 },
  { rank: "シニア", candidatePay: 8500, clientBill: 13000, marginPerHour: 4500, marginRate: 35 },
  { rank: "ハイエンド", candidatePay: 12000, clientBill: 18000, marginPerHour: 6000, marginRate: 33 },
];

export type ReferralTier = {
  level: string;
  annualSalary: number; // 万円
  feeRate: number; // %
  feePerPlacement: number; // 万円
};

export const referralPricing: ReferralTier[] = [
  { level: "ジュニア（実務1年未満）", annualSalary: 500, feeRate: 25, feePerPlacement: 125 },
  { level: "ミドル（汎用AI実務者）", annualSalary: 700, feeRate: 30, feePerPlacement: 210 },
  { level: "シニア（特定領域エキスパート）", annualSalary: 900, feeRate: 35, feePerPlacement: 315 },
  { level: "エンジニア帯（実装PM級）", annualSalary: 1000, feeRate: 40, feePerPlacement: 400 },
  { level: "ハイエンド（コンサル/戦略）", annualSalary: 1200, feeRate: 45, feePerPlacement: 540 },
];

// 市場相場ベンチマーク（2026年4月）
export const marketBenchmark = {
  hourlyRates: [
    { tier: "実装・開発支援", min: 5000, max: 8000 },
    { tier: "PoC・技術設計", min: 8000, max: 12000 },
    { tier: "AIコンサル（戦略・PoC）", min: 10000, max: 20000 },
    { tier: "エグゼクティブアドバイザー", min: 20000, max: 30000 },
  ],
  monthlyRates: [
    { tier: "ジュニアAIエンジニア", min: 60, max: 70 },
    { tier: "AIエンジニア（市場平均）", min: 90, max: 91 },
    { tier: "シニアAIエンジニア", min: 100, max: 130 },
    { tier: "AIコンサル（実装PM級）", min: 120, max: 150 },
    { tier: "ハイスキル（AI活用+マネジメント）", min: 150, max: 200 },
  ],
  projectRates: [
    { phase: "AI戦略立案（2-3ヶ月）", min: 300, max: 1000 },
    { phase: "PoC構築（3-6ヶ月）", min: 300, max: 1000 },
    { phase: "中小規模・専門特化型", min: 100, max: 400 },
    { phase: "軽量PoC・小規模", min: 50, max: 150 },
  ],
};
