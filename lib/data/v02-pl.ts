// PL & KPIシナリオ（建築AI経営研究会 アップセル戦略）
export type PLScenario = {
  name: "Best" | "Target" | "Worst";
  jukunin: number; // 万円（Tier 2 + Tier 3 累計）
  referral: number; // 万円（Tier 4 M&A 成功報酬）
  crosssell: number; // 万円（Tier 1 + スポット）
  total: number;
  color: string;
};

export const plScenarios: PLScenario[] = [
  { name: "Best", jukunin: 8000, referral: 5000, crosssell: 4000, total: 17000, color: "#10b981" },
  { name: "Target", jukunin: 5000, referral: 2000, crosssell: 2500, total: 9500, color: "#E05B03" },
  { name: "Worst", jukunin: 2400, referral: 0, crosssell: 1500, total: 3900, color: "#9ca3af" },
];

// Targetシナリオのコスト構造
export type CostItem = {
  name: string;
  monthly: number; // 万円
  annual: number; // 万円
  type: "fixed" | "variable";
  note?: string;
};

export const costStructure: CostItem[] = [
  { name: "白都社長 人件費", monthly: 100, annual: 1200, type: "fixed", note: "代表 / 商談・登壇・PM" },
  { name: "三山さん 人件費", monthly: 70, annual: 840, type: "fixed", note: "営業・CS・コンサル実装" },
  { name: "橋本さん 人件費", monthly: 60, annual: 720, type: "fixed", note: "コンテンツ・運営" },
  { name: "実装メンバー人件費（業務委託）", monthly: 80, annual: 960, type: "variable", note: "Tier 2/3案件に応じ稼働" },
  { name: "外部講師・登壇者謝礼", monthly: 30, annual: 360, type: "fixed", note: "月例会ゲスト" },
  { name: "動画コンテンツ制作費", monthly: 25, annual: 300, type: "fixed", note: "月10本の制作・編集" },
  { name: "SaaS・ツール（Notion・Slack・Zoom等）", monthly: 5, annual: 60, type: "fixed" },
  { name: "オフィス・会場費", monthly: 15, annual: 180, type: "fixed" },
  { name: "外部会計・法務・雑費", monthly: 10, annual: 120, type: "fixed" },
];

// KPI（Targetシナリオ・年商9,500万円ベース）
export const plKPIs = {
  revenue: 9500,
  candidatePay: 800, // 実装メンバー稼働費（売上連動）
  grossProfit: 6500,
  grossMargin: 68,
  fixedCost: 4380,
  operatingProfit: 2120,
  operatingMargin: 22.3,
  cacByChannel: { kenkyukai: 5, network: 8 },
  ltv: { jukunin: 600, referral: 1500 }, // 万円（Tier 2/3 LTV / M&A成功報酬1件）
  ltvCac: 6,
  paybackMonths: 1.5,
};

// 月次推移
export const monthlyProgression = [
  { month: 1, period: "26/06", monthlyRevenue: 120, cumRevenue: 120 },
  { month: 2, period: "26/07", monthlyRevenue: 200, cumRevenue: 320 },
  { month: 3, period: "26/08", monthlyRevenue: 280, cumRevenue: 600 },
  { month: 4, period: "26/09", monthlyRevenue: 400, cumRevenue: 1000 },
  { month: 5, period: "26/10", monthlyRevenue: 500, cumRevenue: 1500 },
  { month: 6, period: "26/11", monthlyRevenue: 700, cumRevenue: 2200 },
  { month: 7, period: "26/12", monthlyRevenue: 850, cumRevenue: 3050 },
  { month: 8, period: "27/01", monthlyRevenue: 950, cumRevenue: 4000 },
  { month: 9, period: "27/02", monthlyRevenue: 1100, cumRevenue: 5100 },
  { month: 10, period: "27/03", monthlyRevenue: 1300, cumRevenue: 6400 },
  { month: 11, period: "27/04", monthlyRevenue: 1500, cumRevenue: 7900 },
  { month: 12, period: "27/05", monthlyRevenue: 1600, cumRevenue: 9500 },
];

// KPIファネル目標（建築AI研究会 アップセル）
export type KPIFunnel = {
  stage: string;
  m3: number;
  m6: number;
  m9: number;
  m12: number;
  unit: string;
};

export const kpiFunnel: KPIFunnel[] = [
  { stage: "認知（コンテンツ視聴・露出）", m3: 5000, m6: 15000, m9: 25000, m12: 40000, unit: "人" },
  { stage: "個別相談・問い合わせ", m3: 30, m6: 80, m9: 130, m12: 200, unit: "件" },
  { stage: "Tier 0 研究会員数（累計）", m3: 35, m6: 45, m9: 55, m12: 70, unit: "社" },
  { stage: "Tier 1 経営者AI武装 契約数（累計）", m3: 3, m6: 8, m9: 15, m12: 22, unit: "社" },
  { stage: "Tier 2 実装パッケージ 契約数（累計）", m3: 1, m6: 3, m9: 6, m12: 10, unit: "社" },
  { stage: "Tier 3 事業変革コンサル 契約数（累計）", m3: 0, m6: 1, m9: 2, m12: 4, unit: "社" },
  { stage: "Tier 4 M&A案件 着手数（累計）", m3: 0, m6: 0, m9: 1, m12: 2, unit: "件" },
  { stage: "月次売上", m3: 280, m6: 700, m9: 1100, m12: 1600, unit: "万円" },
  { stage: "累計売上", m3: 600, m6: 2200, m9: 5100, m12: 9500, unit: "万円" },
];
