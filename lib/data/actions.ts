export type ActionItem = {
  id: string;
  owner: "Speaker 1" | "Speaker 2" | "Speaker 3" | "関係者";
  title: string;
  section: string; // 本書の章
  status: "pending" | "in_progress" | "done";
  priority: "high" | "medium" | "low";
  deadline?: string;
};

export const actionItems: ActionItem[] = [
  // Speaker 1
  { id: "a1", owner: "Speaker 1", title: "ターゲット企業の定義、売り方、マーケ手法", section: "§4.1, §11.2", status: "in_progress", priority: "high" },
  { id: "a2", owner: "Speaker 1", title: "マイルストーン・KPI設計", section: "§6.4, §11.1", status: "in_progress", priority: "high" },
  { id: "a3", owner: "Speaker 1", title: "マネタイズ確定とコスト計算", section: "§5", status: "in_progress", priority: "high" },
  { id: "a4", owner: "Speaker 1", title: "競合サーチ（ベンチマーク）", section: "付録A", status: "in_progress", priority: "medium" },
  { id: "a5", owner: "Speaker 1", title: "野良コンサル市場規模調査", section: "§10.2", status: "pending", priority: "medium", deadline: "2026-05-15" },
  { id: "a6", owner: "Speaker 1", title: "人材紹介事業計画（大枠）", section: "全体", status: "in_progress", priority: "high" },

  // Speaker 2
  { id: "a7", owner: "Speaker 2", title: "設置場所（中也氏調整）", section: "§8.1", status: "pending", priority: "medium" },
  { id: "a8", owner: "Speaker 2", title: "個人情報フォーム設計・運用", section: "§7.3, §9.3", status: "pending", priority: "high" },
  { id: "a9", owner: "Speaker 2", title: "西田氏連携（アクティブ層確認）", section: "§10.2", status: "in_progress", priority: "high", deadline: "2026-05-15" },
  { id: "a10", owner: "Speaker 2", title: "4/29 たたき台提出", section: "本書", status: "done", priority: "high", deadline: "2026-04-29" },
  { id: "a11", owner: "Speaker 2", title: "修正再提出", section: "-", status: "pending", priority: "high" },
  { id: "a12", owner: "Speaker 2", title: "27-29日 人数資料", section: "§10.2", status: "pending", priority: "high", deadline: "2026-04-29" },
  { id: "a13", owner: "Speaker 2", title: "プラットフォーム優先順位（伊田氏）", section: "§8.3", status: "pending", priority: "medium" },
  { id: "a14", owner: "Speaker 2", title: "5/7 or 5/16 共有可能成果物", section: "§11", status: "pending", priority: "high", deadline: "2026-05-16" },

  // Speaker 3
  { id: "a15", owner: "Speaker 3", title: "SNS自称コンサルのボリューム把握", section: "§10.2", status: "pending", priority: "medium" },
  { id: "a16", owner: "Speaker 3", title: "事業計画書（理論構成・市場規模等）", section: "§2", status: "pending", priority: "high" },
  { id: "a17", owner: "Speaker 3", title: "人事（源氏）経由のレバテック等接続", section: "付録A", status: "pending", priority: "medium" },
  { id: "a18", owner: "Speaker 3", title: "参謀室セキュリティ要件の契約反映", section: "§9.2, §9.4", status: "pending", priority: "high" },
  { id: "a19", owner: "Speaker 3", title: "事業計画作成2日", section: "-", status: "pending", priority: "high" },
];

export type PendingDecision = {
  id: string;
  issue: string;
  proposal: string;
  owner: string;
  resolved: boolean;
};

// 付録C 未解決事項
export const pendingDecisions: PendingDecision[] = [
  { id: "c1", issue: "紹介手数料率の階層（25-45%）の最終決定", proposal: "階層別設定", owner: "Speaker 1", resolved: false },
  { id: "c2", issue: "準委任マージン率（30-35%）", proposal: "SES中位", owner: "Speaker 1", resolved: false },
  { id: "c3", issue: "プラットフォーム設置場所", proposal: "Phase1=既存サブドメイン", owner: "中也氏", resolved: false },
  { id: "c4", issue: "有料職業紹介事業許可の申請主体", proposal: "株式会社AllDelivered", owner: "上田氏・法務", resolved: true },
  { id: "c5", issue: "AI面談ツール（フュージョン等）の採用", proposal: "フュージョンPoC推奨", owner: "Speaker 2", resolved: false },
  { id: "c6", issue: "ISMS取得の時期", proposal: "Phase 2中（9-12ヶ月目）", owner: "経営層", resolved: false },
  { id: "c7", issue: "競合（レバテック等）との連携戦略", proposal: "補完関係で打診", owner: "Speaker 3", resolved: false },
  { id: "c8", issue: "木内氏コミュニティ発信との連動", proposal: "Phase 1ローンチ時", owner: "木内氏", resolved: false },
  { id: "c9", issue: "価格表の公開範囲", proposal: "法人営業のみ開示、Web非公開", owner: "Speaker 1", resolved: false },
  { id: "c10", issue: "リファンド規定", proposal: "業界標準（80/50/20%）", owner: "法務", resolved: false },
];
