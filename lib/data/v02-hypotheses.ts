// 5仮説検証（建築AI経営研究会 アップセル戦略）
export type Hypothesis = {
  id: string;
  letter: "A" | "B" | "C" | "D" | "E";
  title: string;
  content: string;
  rationale: string;
  method: string;
  deadline: string;
  cost: string;
  learning: string;
  priority: "ultra" | "high" | "medium";
  status: "pending" | "in_progress" | "validated_true" | "validated_false";
};

export const hypotheses: Hypothesis[] = [
  {
    id: "a",
    letter: "A",
    title: "アップセル意志仮説",
    content: "既存研究会員（月4万円）の20-30%が、Tier 1（経営者AI武装・3ヶ月60万円）に進む意思がある",
    rationale: "研究会で半年学んだ社長は『次は自社で動きたい』フェーズに入る／海外CxOプログラム平均価格は150-300万円なので60万円は手頃",
    method: "既存30社のうち稼働中の上位10社に1on1ヒアリング（30分）、『60万のTier 1を提示したら検討するか』を計測",
    deadline: "2026-05-31",
    cost: "白都社長＋三山さんの工数 × 10社×30分 = 5h",
    learning: "True→Tier 1ローンチ全速 / False→Tier 1価格を30万円に下げる or 月額20万円のサブスク型に変更",
    priority: "ultra",
    status: "pending",
  },
  {
    id: "b",
    letter: "B",
    title: "予算所在仮説",
    content: "建築業中堅企業のAI実装予算（300万円）は、DX予算ではなく『社長裁量の戦略投資枠』から出ることが多い",
    rationale: "建築中小・中堅では独立DX部門は少なく、社長判断＋経理処理のケースが多い／補助金活用も視野",
    method: "既存会員5社で『Tier 2 300万円の予算はどこから出すか』をヒアリング、補助金活用意向も併せて確認",
    deadline: "2026-06-15",
    cost: "ヒアリングと並行",
    learning: "社長裁量→社長への直販強化 / 補助金主→補助金パッケージ化が必須 / 設備投資枠→工事部役員も商談関係者に",
    priority: "ultra",
    status: "pending",
  },
  {
    id: "c",
    letter: "C",
    title: "M&Aニーズ仮説",
    content: "建築業の社長の30%以上が、後継者問題 or 出口戦略として M&A の選択肢に潜在的関心を持つ",
    rationale: "建築業の社長平均年齢60歳超、中小M&A件数は5年で2倍／業界再編の波",
    method: "既存30社の社長への匿名アンケート（年齢・後継者・出口戦略）＋3社への深掘り面談",
    deadline: "2026-12-31",
    cost: "アンケート設計＋3社深掘り面談 = 10h",
    learning: "True→Tier 4を Phase 2前倒しでローンチ / False→Tier 4は Phase 3に後ろ倒し or 撤退判断",
    priority: "high",
    status: "pending",
  },
  {
    id: "d",
    letter: "D",
    title: "差別化仮説（建築特化の優位性）",
    content: "建築業の社長は、汎用ITコンサルより『建築業界の事例＋AI実装』を持つLIFEFUNDを優先選好する",
    rationale: "建築業の業務（積算・図面・施工管理）は専門性が高く、汎用コンサルでは現場理解に限界",
    method: "Tier 2 提案商談で『建築特化型LIFEFUND』vs『汎用大手AIコンサル』の選好調査（5社で比較提案）",
    deadline: "2026-08-31",
    cost: "提案資料作成＋5社商談 = 15h",
    learning: "True→建築特化を最強の差別化レバーとして発信強化 / False→技術力・実装力で勝負する別軸を探す",
    priority: "high",
    status: "pending",
  },
  {
    id: "e",
    letter: "E",
    title: "コンテンツ流入仮説",
    content: "月10本の建築×AI動画コンテンツが、月20件以上の新規リード（個別相談）を生む",
    rationale: "建築業の経営者はYouTube・LinkedIn視聴率上昇中／AI関連検索ボリュームが業界横断で増加",
    method: "3ヶ月（30本）配信後、YouTube/LP流入CV率を計測、リード数を確認",
    deadline: "2026-09-30",
    cost: "コンテンツ制作費 × 30本（橋本さん中心） = 既存運営工数",
    learning: "True→コンテンツ制作体制を倍増、Tier 0入会の主軸チャネルへ / False→個別相談はパートナー紹介・登壇主軸に切替",
    priority: "ultra",
    status: "pending",
  },
];

// W1-W12 タスク（ガントチャート用・Phase 1ローンチ）
export type GanttTask = {
  id: string;
  week: string;
  startWeek: number;
  endWeek: number;
  title: string;
  owner: string;
  category: "creative" | "validation" | "legal" | "ops" | "sales" | "deploy";
  isCritical: boolean;
};

export const ganttTasks: GanttTask[] = [
  // W1-2: 既存会員ヒアリング・Tier 1設計
  { id: "g1", week: "W1-2", startWeek: 1, endWeek: 2, title: "🔬 仮説A検証（既存30社中10社へのヒアリング）", owner: "白都＋三山", category: "validation", isCritical: true },
  { id: "g2", week: "W1-2", startWeek: 1, endWeek: 2, title: "Tier 1 LP・契約書ひな形作成", owner: "三山＋橋本", category: "creative", isCritical: true },
  { id: "g3", week: "W1-2", startWeek: 1, endWeek: 2, title: "AI使いこなし診断シート設計", owner: "三山", category: "creative", isCritical: false },
  { id: "g4", week: "W1-2", startWeek: 1, endWeek: 2, title: "コーチング設計書 v1.0", owner: "白都", category: "ops", isCritical: true },
  // W3-4: ローンチ準備
  { id: "g5", week: "W3-4", startWeek: 3, endWeek: 4, title: "🔬 仮説B検証（予算所在ヒアリング）", owner: "白都", category: "validation", isCritical: true },
  { id: "g6", week: "W3-4", startWeek: 3, endWeek: 4, title: "Tier 1 提案資料・営業ピッチ作成", owner: "三山＋橋本", category: "creative", isCritical: true },
  { id: "g7", week: "W3-4", startWeek: 3, endWeek: 4, title: "研究会月例会で Tier 1 アナウンス", owner: "白都", category: "sales", isCritical: true },
  // W5-6: 初期受注
  { id: "g8", week: "W5-6", startWeek: 5, endWeek: 6, title: "🎯 Tier 1 初回契約 3社", owner: "白都＋三山", category: "sales", isCritical: true },
  { id: "g9", week: "W5-6", startWeek: 5, endWeek: 6, title: "🔬 仮説E検証（動画コンテンツ流入計測）", owner: "橋本", category: "validation", isCritical: false },
  { id: "g10", week: "W5-6", startWeek: 5, endWeek: 6, title: "Tier 2 提案書テンプレ作成開始", owner: "三山", category: "creative", isCritical: false },
  // W7-8: コーチング開始
  { id: "g11", week: "W7-8", startWeek: 7, endWeek: 8, title: "Tier 1 月2回コーチング開始（3社）", owner: "白都＋三山", category: "ops", isCritical: true },
  { id: "g12", week: "W7-8", startWeek: 7, endWeek: 8, title: "🔬 仮説D検証（建築特化の優位性検証商談）", owner: "三山", category: "validation", isCritical: false },
  { id: "g13", week: "W7-8", startWeek: 7, endWeek: 8, title: "建築AI事例動画 累計20本到達", owner: "橋本", category: "creative", isCritical: false },
  // W9-12: Tier 2 初動
  { id: "g14", week: "W9-12", startWeek: 9, endWeek: 12, title: "🎯 Tier 2 初回案件契約（300万円・1社）", owner: "白都＋三山", category: "sales", isCritical: true },
  { id: "g15", week: "W9-12", startWeek: 9, endWeek: 12, title: "実装メンバー候補プール 5名構築", owner: "三山", category: "ops", isCritical: true },
  { id: "g16", week: "W9-12", startWeek: 9, endWeek: 12, title: "Tier 1 累計5社到達", owner: "白都＋三山", category: "sales", isCritical: false },
  { id: "g17", week: "W9-12", startWeek: 9, endWeek: 12, title: "ABCDE仮説 週次レビュー", owner: "白都", category: "ops", isCritical: false },
];
