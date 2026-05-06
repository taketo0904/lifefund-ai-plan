// §9 PL 3シナリオ
export type PLScenario = {
  name: "Best" | "Target" | "Worst";
  jukunin: number; // 万円
  referral: number;
  crosssell: number;
  total: number;
  color: string;
};

export const plScenarios: PLScenario[] = [
  { name: "Best", jukunin: 25000, referral: 12000, crosssell: 3000, total: 40000, color: "#10b981" },
  { name: "Target", jukunin: 20000, referral: 8000, crosssell: 2000, total: 30000, color: "#E05B03" },
  { name: "Worst", jukunin: 10000, referral: 3000, crosssell: 0, total: 13000, color: "#9ca3af" },
];

// §9.2 Targetシナリオのコスト構造
export type CostItem = {
  name: string;
  monthly: number; // 万円
  annual: number; // 万円
  type: "fixed" | "variable";
  note?: string;
};

export const costStructure: CostItem[] = [
  { name: "中川人件費", monthly: 80, annual: 960, type: "fixed", note: "事業推進・PM" },
  { name: "北さん人件費", monthly: 50, annual: 600, type: "fixed", note: "CS・商談担当" },
  { name: "業務委託（選考・スカウト）", monthly: 30, annual: 360, type: "fixed" },
  { name: "法務・契約管理", monthly: 15, annual: 180, type: "fixed" },
  { name: "SaaS（クラウドサイン・freee・Notion・HL送信）", monthly: 15, annual: 180, type: "fixed" },
  { name: "HL送信・クリエイティブ", monthly: 50, annual: 600, type: "fixed" },
  { name: "スタートアップDB・ツール購入", monthly: 5, annual: 60, type: "fixed" },
  { name: "個人情報・セキュリティ", monthly: 5, annual: 60, type: "fixed" },
  { name: "外部会計・雑費", monthly: 10, annual: 120, type: "fixed" },
];

// §9.3 KPI
export const plKPIs = {
  revenue: 30000,
  candidatePay: 13000, // 売上連動65% × 準委任2億
  grossProfit: 14000, // 1.4億
  grossMargin: 47,
  fixedCost: 3120,
  operatingProfit: 10880, // 約1.1億
  operatingMargin: 36.3,
  cacByChannel: { hl: 25, forBiz: 4 }, // 万円/件
  ltv: { jukunin: 252, referral: 168 }, // 万円
  ltvCac: 10,
  paybackMonths: 0.5,
};

// §8 月次推移
export const monthlyProgression = [
  { month: 1, period: "5月", monthlyRevenue: 0, cumRevenue: 0 },
  { month: 2, period: "6月", monthlyRevenue: 100, cumRevenue: 100 },
  { month: 3, period: "7月", monthlyRevenue: 200, cumRevenue: 300 },
  { month: 4, period: "8月", monthlyRevenue: 500, cumRevenue: 800 },
  { month: 5, period: "9月", monthlyRevenue: 800, cumRevenue: 1600 },
  { month: 6, period: "10月", monthlyRevenue: 1400, cumRevenue: 3000 },
  { month: 7, period: "11月", monthlyRevenue: 2000, cumRevenue: 5000 },
  { month: 8, period: "12月", monthlyRevenue: 2500, cumRevenue: 7500 },
  { month: 9, period: "1月", monthlyRevenue: 3000, cumRevenue: 10500 },
  { month: 10, period: "2月", monthlyRevenue: 3500, cumRevenue: 14000 },
  { month: 11, period: "3月", monthlyRevenue: 4000, cumRevenue: 18000 },
  { month: 12, period: "4月", monthlyRevenue: 4500, cumRevenue: 22500 },
  // 注：3億を達成するには、後半の月次を上昇させるか、12ヶ月延長する想定
];

// §8 KPIファネル目標
export type KPIFunnel = {
  stage: string;
  m3: number;
  m6: number;
  m9: number;
  m12: number;
  unit: string;
};

export const kpiFunnel: KPIFunnel[] = [
  { stage: "HL送信数（累計）", m3: 5000, m6: 15000, m9: 25000, m12: 30000, unit: "件" },
  { stage: "HL反応数（累計）", m3: 50, m6: 200, m9: 350, m12: 450, unit: "件" },
  { stage: "HL商談数（累計）", m3: 15, m6: 60, m9: 105, m12: 135, unit: "件" },
  { stage: "HL受注数（累計）", m3: 2, m6: 10, m9: 20, m12: 30, unit: "件" },
  { stage: "for Biz アポ数（累計）", m3: 5, m6: 15, m9: 25, m12: 30, unit: "件" },
  { stage: "for Biz 受注数（累計）", m3: 1, m6: 4, m9: 6, m12: 8, unit: "件" },
  { stage: "稼働中コンサル数", m3: 3, m6: 10, m9: 22, m12: 35, unit: "名" },
  { stage: "月次売上", m3: 200, m6: 1000, m9: 2000, m12: 3000, unit: "万円" },
  { stage: "累計売上", m3: 300, m6: 3000, m9: 12000, m12: 30000, unit: "万円" },
];
