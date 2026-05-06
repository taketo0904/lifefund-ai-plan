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
    title: "研究会員のアップセル率が想定より低い（Tier 1への遷移20%未満）",
    impact: "高",
    probability: "中",
    mitigation: "個別ヒアリング徹底・社長への定期面談・Tier 1の初年度割引オファー設計",
    status: "active",
  },
  {
    id: "r2",
    rank: 2,
    title: "Tier 2/3 実装メンバーの採用が間に合わず案件を断る",
    impact: "高",
    probability: "中〜高",
    mitigation: "業務委託ネットワーク構築（5名以上のプール）、AIエンジニア採用イベントへの常時露出",
    status: "active",
  },
  {
    id: "r3",
    rank: 3,
    title: "Tier 4（M&A）の仲介免許 or 提携先確保が遅れ、案件が流れる",
    impact: "高",
    probability: "中",
    mitigation: "Phase 2前半で提携アドバイザー候補3社と交渉開始、M&A実務研修受講",
    status: "monitoring",
  },
  {
    id: "r4",
    rank: 4,
    title: "建築業界の景況感悪化で AI投資判断が後ろ倒しになる",
    impact: "中",
    probability: "中",
    mitigation: "補助金活用パッケージ（IT導入補助金等）で実質負担を抑える提案、ROI事例の蓄積発信",
    status: "monitoring",
  },
  {
    id: "r5",
    rank: 5,
    title: "競合（ITコンサル大手・AI特化スタートアップ）の建築業界参入",
    impact: "高",
    probability: "中",
    mitigation: "建築業界特化の事例蓄積（月10本動画）、業界団体・パートナーとの独占的協業契約",
    status: "monitoring",
  },
  {
    id: "r6",
    rank: 6,
    title: "白都社長 / 三山さんへの稼働集中（属人化リスク）",
    impact: "中",
    probability: "中〜高",
    mitigation: "コーチング・コンサル品質の平準化（テンプレ・録画・マニュアル整備）、実装メンバーの自走化",
    status: "active",
  },
  {
    id: "r7",
    rank: 7,
    title: "クライアントAI実装後、効果が定量化できず継続契約に至らない",
    impact: "中",
    probability: "中",
    mitigation: "Kickoff時にKPI合意・月次レビューで効果可視化・Before/Afterレポート標準化",
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

export const premises: Premise[] = [
  {
    id: "p1",
    premise: "建築AI研究会員（30社）の20-30%が Tier 1（月20万）にアップセル可能である",
    verification: "既存会員へのアンケート＋個別面談（10社優先サンプル）",
    deadline: "2026-05-31",
    verified: false,
  },
  {
    id: "p2",
    premise: "建築業の中堅企業（売上10-50億）はAI実装に300万円の予算を確保できる",
    verification: "既存会員5社へのヒアリング、補助金活用案を含めた提案テスト",
    deadline: "2026-06-30",
    verified: false,
  },
  {
    id: "p3",
    premise: "建築業界の後継者問題は『AI企業価値向上→売却』の選択肢に共感する社長が一定数存在",
    verification: "既存会員30社中の年齢構成・後継者状況の調査、3社へのM&A戦略相談トライアル",
    deadline: "2026-12-31",
    verified: false,
  },
  {
    id: "p4",
    premise: "月10本の建築×AI動画コンテンツが新規リードを月20件以上生む",
    verification: "YouTube/LP流入分析、3ヶ月運用後のCV率測定",
    deadline: "2026-09-30",
    verified: false,
  },
];
