export type Risk = {
  id: string;
  rank: number;
  title: string;
  impact: "致命" | "高" | "中" | "低";
  probability: "低" | "低〜中" | "中" | "中〜高" | "高";
  mitigation: string;
  status: "monitoring" | "active" | "mitigated";
};

export const risks: Risk[] = [
  {
    id: "r1",
    rank: 1,
    title: "コミュニティの「使える人材」実数が想定を下回る",
    impact: "高",
    probability: "中",
    mitigation: "W1-2で供給調査を最優先実行、講師層から優先打診",
    status: "active",
  },
  {
    id: "r2",
    rank: 2,
    title: "個人情報の漏洩・運用ミス",
    impact: "致命",
    probability: "低〜中",
    mitigation: "§7.3堅牢化、§9.3手続き厳守、ISMS取得検討（Phase 2）",
    status: "monitoring",
  },
  {
    id: "r3",
    rank: 3,
    title: "偽装請負と判定される",
    impact: "高",
    probability: "低",
    mitigation: "契約書で指揮命令明示、運用での実態整合",
    status: "monitoring",
  },
  {
    id: "r4",
    rank: 4,
    title: "紹介後の早期退職によるリファンド集中",
    impact: "中",
    probability: "中",
    mitigation: "リファンド比率の段階設定、候補者ヒアリングの質改善",
    status: "monitoring",
  },
  {
    id: "r5",
    rank: 5,
    title: "レピュテーション（炎上）",
    impact: "高",
    probability: "低",
    mitigation: "木内氏の発信ガバナンス、CSの一次対応訓練",
    status: "monitoring",
  },
];

export type Premise = {
  id: string;
  premise: string;
  verification: string;
  deadline: string;
  verified: boolean;
};

// §10.2 最重要前提
export const premises: Premise[] = [
  {
    id: "p1",
    premise: "コミュニティに稼働可能な人材が100名以上いる（スプリント用に10名に緩和）",
    verification: "西田氏・講師100名へアンケート、稼働意思の確認",
    deadline: "2026-05-15",
    verified: false,
  },
  {
    id: "p2",
    premise: "法人2,500社の上位30社に準委任での需要がある（スプリント用に10社）",
    verification: "既存顧客への一斉ヒアリング（メール+1on1）",
    deadline: "2026-05-31",
    verified: false,
  },
  {
    id: "p3",
    premise: "紹介手数料率35〜40%が市場で受容される",
    verification: "競合（レバテック・チャーム等）への匿名調査",
    deadline: "2026-05-31",
    verified: false,
  },
  {
    id: "p4",
    premise: "AI面談で営業・対面スキルが定量化できる",
    verification: "フュージョン等PoC、内部メンバー10名で先行検証",
    deadline: "2026-05-31",
    verified: false,
  },
];
