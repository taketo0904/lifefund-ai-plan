export type RoadmapPhase = {
  id: string;
  phase: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  product: string;
  purpose: string;
  investment: string;
  color: string;
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: "p0",
    phase: "Phase 0",
    title: "2ヶ月売上スプリント",
    period: "2026/04 - 2026/06",
    startDate: "2026-04-25",
    endDate: "2026-06-25",
    product: "準委任 + 紹介（並行スタート）",
    purpose: "初回売上確定（Target 230万円）",
    investment: "免許あり → 追加許可不要、SaaS連携のみ",
    color: "#ef4444",
  },
  {
    id: "p1",
    phase: "Phase 1",
    title: "準委任先行＋紹介併走",
    period: "2026/05 - 2026/10",
    startDate: "2026-05-01",
    endDate: "2026-10-31",
    product: "準委任による稼働支援＋紹介（免許済みを活用）",
    purpose: "月次キャッシュ＋紹介高単価売上で粗利400万/月達成",
    investment: "契約書ひな形、運用フロー、最低限マッチングUI",
    color: "#f59e0b",
  },
  {
    id: "p2",
    phase: "Phase 2",
    title: "規模化・オペレーション強化",
    period: "2026/11 - 2027/04",
    startDate: "2026-11-01",
    endDate: "2027-04-30",
    product: "準委任＋紹介を本格運用",
    purpose: "月次粗利2,000万到達、独立プラットフォーム化判断",
    investment: "CRM、ATS、独立サイト、ISMS取得検討",
    color: "#3b82f6",
  },
  {
    id: "p3",
    phase: "Phase 3",
    title: "派遣・プール化検討",
    period: "2027/05 〜",
    startDate: "2027-05-01",
    endDate: "2027-10-31",
    product: "派遣/自社雇用プール（意思決定後）",
    purpose: "高単価・継続収益・ブランド資産化",
    investment: "派遣免許、雇用スキーム、財務余力",
    color: "#8b5cf6",
  },
];

export type MonthlyMilestone = {
  yearMonth: string; // "2026-04"
  label: string;
  deliverables: string[];
};

export const monthlyMilestones: MonthlyMilestone[] = [
  {
    yearMonth: "2026-04",
    label: "戦略たたき台提出",
    deliverables: ["議事録レビュー", "戦略案たたき台 v0.1", "4/29 人数調査資料"],
  },
  {
    yearMonth: "2026-05",
    label: "共有可能成果物＋契約書v1",
    deliverables: [
      "5/7 or 5/16 共有可能成果物",
      "コミュニティ供給調査の数値確定",
      "既存30社ヒアリング完了",
      "契約書ひな形 v1（中原→上田）",
    ],
  },
  {
    yearMonth: "2026-06",
    label: "🎯 初回売上確定",
    deliverables: [
      "準委任β運用開始（2社・2-4名）",
      "紹介1件成約",
      "初回請求書発行（6月末締め）",
      "AI面談PoC（内部5名）",
    ],
  },
  {
    yearMonth: "2026-07",
    label: "本格運用開始",
    deliverables: ["7月稼働分フル稼働", "5社・10名目標", "紹介パイプライン5件"],
  },
  {
    yearMonth: "2026-09",
    label: "Phase 1中盤",
    deliverables: ["月次粗利200万目標", "稼働7名", "紹介累計2-3件"],
  },
  {
    yearMonth: "2026-10",
    label: "Phase 1終盤",
    deliverables: ["月次粗利400万到達", "稼働10名", "紹介累計5件"],
  },
  {
    yearMonth: "2027-01",
    label: "Phase 2中盤",
    deliverables: ["月次粗利1,000万", "稼働20名", "独立プラットフォーム判断"],
  },
  {
    yearMonth: "2027-04",
    label: "Phase 2達成",
    deliverables: ["月次粗利2,000万", "稼働40名", "紹介累計20件"],
  },
];
