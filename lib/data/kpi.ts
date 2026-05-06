export type KpiItem = {
  id: string;
  name: string;
  target6m: number;
  target12m: number;
  current: number;
  unit: string;
  category: "supply" | "demand" | "conversion" | "revenue";
};

export const kpis: KpiItem[] = [
  { id: "k1", name: "候補者プール登録数", target6m: 200, target12m: 500, current: 0, unit: "名", category: "supply" },
  { id: "k2", name: "月次AI面談受検数", target6m: 50, target12m: 150, current: 0, unit: "件/月", category: "supply" },
  { id: "k3", name: "AI面談合格率", target6m: 40, target12m: 50, current: 0, unit: "%", category: "conversion" },
  { id: "k4", name: "月次企業ヒアリング数", target6m: 20, target12m: 40, current: 0, unit: "社/月", category: "demand" },
  { id: "k5", name: "月次マッチング成立数", target6m: 5, target12m: 15, current: 0, unit: "件/月", category: "conversion" },
  { id: "k6", name: "紹介成約数（累計）", target6m: 5, target12m: 20, current: 0, unit: "件", category: "revenue" },
  { id: "k7", name: "稼働中コンサル数", target6m: 10, target12m: 40, current: 0, unit: "名", category: "revenue" },
  { id: "k8", name: "月次粗利", target6m: 400, target12m: 2000, current: 0, unit: "万円/月", category: "revenue" },
];

export type KpiTreeNode = {
  id: string;
  label: string;
  value?: string;
  children?: KpiTreeNode[];
};

export const kpiTree: KpiTreeNode = {
  id: "root",
  label: "KGI: 月次粗利",
  value: "6m: 400万/月 → 12m: 2,000万/月",
  children: [
    {
      id: "referral",
      label: "紹介ライン",
      value: "手数料率25-45%",
      children: [
        {
          id: "referral-success",
          label: "成約数 = リード × 通過率 × 承諾率",
          children: [
            { id: "r1", label: "リード数", value: "既存法人接点の月次活性化数" },
            { id: "r2", label: "一次選考通過率", value: "経歴フィルタ+AI面談スコア合格率" },
            { id: "r3", label: "個別面接通過率", value: "企業×候補者の最終面接通過率" },
            { id: "r4", label: "内定承諾率", value: "オファー承諾率" },
          ],
        },
      ],
    },
    {
      id: "jukunin",
      label: "準委任ライン",
      value: "マージン30-35%",
      children: [
        {
          id: "jukunin-formula",
          label: "稼働中名数 × 月間稼働時間 × 平均マージン",
          children: [
            { id: "j1", label: "稼働中名数", value: "月初時点の稼働人数" },
            { id: "j2", label: "月間稼働時間", value: "1名あたり時間" },
            { id: "j3", label: "平均マージン", value: "価格表の加重平均" },
          ],
        },
      ],
    },
  ],
};

export const milestoneTargets = [
  { period: "〜3ヶ月", achievement: "契約書ひな形完成、選考フローβ運用開始、初期成約1〜3件" },
  { period: "〜6ヶ月", achievement: "月次粗利400万円、稼働中10名、紹介累計5件" },
  { period: "〜12ヶ月", achievement: "月次粗利2,000万円、稼働中40名、紹介累計20件" },
  { period: "〜18ヶ月", achievement: "Phase 3（派遣免許）の意思決定、ARR換算2.5億円規模" },
];
