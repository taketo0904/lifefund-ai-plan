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
    id: "p1",
    phase: "Phase 1",
    title: "研究会LTV最大化＋Tier 1ローンチ",
    period: "2026/05 - 2026/10",
    startDate: "2026-05-01",
    endDate: "2026-10-31",
    product: "Tier 0（既存研究会）+ Tier 1（経営者AI武装）",
    purpose: "既存30社→継続率85%＋Tier 1へ20%遷移。月次売上300万到達",
    investment: "Tier 1 LP・契約書・診断テンプレ作成。コーチング体制構築（白都・三山）",
    color: "#E05B03",
  },
  {
    id: "p2",
    phase: "Phase 2",
    title: "Tier 2/3 本格運用＋実装メンバー拡充",
    period: "2026/11 - 2027/04",
    startDate: "2026-11-01",
    endDate: "2027-04-30",
    product: "Tier 2（建築AI実装）+ Tier 3（事業変革コンサル）",
    purpose: "実装案件3-5件並走、月次売上1,000万到達。年商9,500万到達",
    investment: "実装メンバー2-3名業務委託、CRM/ATS導入、補助金活用パッケージ整備",
    color: "#F08C4A",
  },
  {
    id: "p3",
    phase: "Phase 3",
    title: "M&A機能搭載＋業界リーディングポジ確立",
    period: "2027/05 - 2028/04",
    startDate: "2027-05-01",
    endDate: "2028-04-30",
    product: "Tier 4（M&A仲介・PMI）+ 全Tier継続運用",
    purpose: "初年度M&A成約1-2件。年商2億円超 + 業界での『建築×AIといえばLIFEFUND』ポジション確立",
    investment: "M&A仲介免許 or 提携アドバイザー契約、PMI実施チーム編成、登壇・寄稿の継続発信",
    color: "#7c3aed",
  },
];

export type MonthlyMilestone = {
  yearMonth: string;
  label: string;
  deliverables: string[];
};

export const monthlyMilestones: MonthlyMilestone[] = [
  {
    yearMonth: "2026-05",
    label: "Tier 1 ローンチ準備",
    deliverables: [
      "Tier 1（経営者AI武装）LP公開",
      "契約書ひな形・診断シート作成",
      "白都社長＋三山さんのコーチング設計書",
      "研究会員30社へのアップセル案内",
    ],
  },
  {
    yearMonth: "2026-06",
    label: "🎯 Tier 1 初回受注",
    deliverables: [
      "Tier 1 契約 3社獲得（合計180万円）",
      "Tier 2 提案書テンプレ作成",
      "建築AI実装事例の動画化（10本）",
    ],
  },
  {
    yearMonth: "2026-08",
    label: "Tier 2 初回案件着手",
    deliverables: [
      "Tier 2 契約 1社獲得（300万円）",
      "実装メンバー1名 業務委託契約",
      "業務棚卸しメソッド v1.0 完成",
    ],
  },
  {
    yearMonth: "2026-11",
    label: "Phase 2 突入",
    deliverables: [
      "Tier 2 累計3社受注（900万円）",
      "Tier 3 提案書テンプレ作成",
      "CRM・ATS導入完了",
    ],
  },
  {
    yearMonth: "2027-01",
    label: "Tier 3 初回受注",
    deliverables: [
      "Tier 3 契約 1社獲得（年960万円）",
      "実装メンバー2名体制構築",
      "補助金活用パッケージ提案実績10社",
    ],
  },
  {
    yearMonth: "2027-04",
    label: "🎯 Phase 2 達成（年商9,500万）",
    deliverables: [
      "年商9,500万到達",
      "Tier 2 累計10社、Tier 3 累計4社",
      "M&A仲介機能の準備完了",
    ],
  },
  {
    yearMonth: "2027-09",
    label: "Tier 4 初案件着手",
    deliverables: [
      "M&A戦略策定支援 1社着手",
      "提携アドバイザー契約締結",
      "建築業界 後継者問題リサーチレポート公開",
    ],
  },
  {
    yearMonth: "2028-04",
    label: "🎯 Phase 3 達成（M&A成約・業界ポジション確立）",
    deliverables: [
      "M&A成約 1-2件達成",
      "年商2億円超",
      "建築×AI業界カンファレンス主催",
    ],
  },
];
