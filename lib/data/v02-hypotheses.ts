// §5 5仮説
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
    title: "販路仮説",
    content: "for Biz 実アクティブ顧客 50社をヒアリングすると、30%以上「すぐAI人材を借りたい」と返す",
    rationale: "§3 市場データ（法人AI導入率33.9%上昇・人材339万人不足）/ for Biz顧客は『AIを学んだ』ステージにいる",
    method: "for Biz 上位20社に1on1ヒアリング（20分スロット）、「AI人材必要」と返した社数を計測",
    deadline: "2026-05-23",
    cost: "自分の工数 × 20社×20分 = 7h",
    learning: "True→GTM全走、False→ICPセグメント変更（人事セグメントやスタートアップへ軽鈍シフト）",
    priority: "ultra",
    status: "pending",
  },
  {
    id: "b",
    letter: "B",
    title: "予算所在仮説",
    content: "中堅企業のAI人材予算は、DX推進部より人事部のリスキリング予算・採用予算に多く出現する",
    rationale: "中堅企業ではDX推進の独立予算は薄く、人事や事業部を通すケース多い",
    method: "for Biz 5-10社で「AI人材購買予算はどこから出る予定か」をクエスチョン、DXと人事のどちらか集計",
    deadline: "2026-05-16",
    cost: "ヒアリングとセット",
    learning: "DX主導→ペルソナ①集中 / 人事主導→ペルソナ②.5集中 / 両者→二重アプローチをPhase1から設計",
    priority: "ultra",
    status: "pending",
  },
  {
    id: "c",
    letter: "C",
    title: "単価仮説",
    content: "中堅企業はミドル人材に月100-150万まで支払う意思がある",
    rationale: "AIエンジニア市場平均90.6万/月 + マネジメントを考慮",
    method: "5社と見積提案セッション、提示価格帯30-50-100-150-200万で「進める隷長」を計測",
    deadline: "2026-05-30",
    cost: "5社ヒアリング・提案",
    learning: "True→ミドル単価100-150万で設計・PL計算見直し / False→ジュニア中心シフト or パッケージ化",
    priority: "high",
    status: "pending",
  },
  {
    id: "d",
    letter: "D",
    title: "差別化仮説",
    content: "高木氏作成ランク認定試験の提示は、レバテック比較で1/2以上の企業で「決め手」と評価される",
    rationale: "スキル証明は中堅企業ペルソナ②の「見極めコスト」ペインを直接解消",
    method: "A/B提案：同条件で「ランク説明あり」と「なし」を2ターゲット社ずつ、二次面談進捗率で比較",
    deadline: "2026-06-13",
    cost: "提案資料作成 + 4社ジャッジ",
    learning: "True→認定試験をセットコアに / False→別の差別化（コミュニティやら会員チェック）探す",
    priority: "medium",
    status: "pending",
  },
  {
    id: "e",
    letter: "E",
    title: "ハウスリスト仮説（もっとも重要度高い）",
    content: "保有するDX推進多めハウスリスト 45,000件にアプローチしたとき、反応率 1% 以上、提案進捗率 20% 以上が取れる",
    rationale: "DX推進者は「AI人材不足」トピックに反応しやすい / 社内リトチャス起点 / 一般コールドは0.1-0.3%だが、ターゲットフィットしたリストは0.5-1.5%期待",
    method: "ステップ1：500件ピックアップしてABテストメール送信、開封・CTR・反応・アポ率1週間で判定 / ステップ2：反応あり企業と商談 → 提案進捗率",
    deadline: "2026-05-30",
    cost: "送信ツール費 / クリエイティブ / 自分の工数",
    learning: "True→ハウスリストをPhase1主軸チャネル化、送信体制・オペレーションを設計 / False→コールド以外のチャネルを主にしハウスリストはサブ位置",
    priority: "ultra",
    status: "pending",
  },
];

// §10 W1-W12 タスク（ガントチャート用）
export type GanttTask = {
  id: string;
  week: string;
  startWeek: number; // 1-12
  endWeek: number; // 1-12
  title: string;
  owner: string;
  category: "creative" | "validation" | "legal" | "ops" | "sales" | "deploy";
  isCritical: boolean;
};

export const ganttTasks: GanttTask[] = [
  // W1-2 (4/29-5/9)
  { id: "g1", week: "W1-2", startWeek: 1, endWeek: 2, title: "🔑 前任者ヒアリング（23問）", owner: "中川", category: "ops", isCritical: false },
  { id: "g2", week: "W1-2", startWeek: 1, endWeek: 2, title: "⚡ HL用コールドメールAB作成", owner: "中川", category: "creative", isCritical: true },
  { id: "g3", week: "W1-2", startWeek: 1, endWeek: 2, title: "ホスキルシートテンプレ作成", owner: "中川+北", category: "creative", isCritical: true },
  { id: "g4", week: "W1-2", startWeek: 1, endWeek: 2, title: "トークスクリプト作成", owner: "中川", category: "creative", isCritical: true },
  { id: "g5", week: "W1-2", startWeek: 1, endWeek: 2, title: "HL送信ツール選定", owner: "中川+伊田", category: "ops", isCritical: false },
  { id: "g6", week: "W1-2", startWeek: 1, endWeek: 2, title: "ステークホルダー1on1（14名）", owner: "中川", category: "ops", isCritical: false },
  { id: "g7", week: "W1-2", startWeek: 1, endWeek: 2, title: "個人情報規程・コンプラ規程審査スタート", owner: "中川+法務", category: "legal", isCritical: true },

  // W3-4 (5/12-5/23)
  { id: "g8", week: "W3-4", startWeek: 3, endWeek: 4, title: "🔬 仮説B検証（予算所在）", owner: "中川", category: "validation", isCritical: true },
  { id: "g9", week: "W3-4", startWeek: 3, endWeek: 4, title: "🔬 仮説A検証（for Biz反応）", owner: "中川", category: "validation", isCritical: true },
  { id: "g10", week: "W3-4", startWeek: 3, endWeek: 4, title: "🔬 仮説E検証（HL 500件AB配信）", owner: "中川", category: "validation", isCritical: true },
  { id: "g11", week: "W3-4", startWeek: 3, endWeek: 4, title: "LP・提案書テンプレ作成", owner: "中川+伊田", category: "creative", isCritical: false },
  { id: "g12", week: "W3-4", startWeek: 3, endWeek: 4, title: "契約書ひな形v1（準委任×紹介）", owner: "中原→上田", category: "legal", isCritical: true },
  { id: "g13", week: "W3-4", startWeek: 3, endWeek: 4, title: "NDA・個人情報同意書テンプレ", owner: "法務", category: "legal", isCritical: true },

  // W5-6 (5/26-6/6)
  { id: "g14", week: "W5-6", startWeek: 5, endWeek: 6, title: "仮説E結果集計→GTM見直し", owner: "中川", category: "validation", isCritical: true },
  { id: "g15", week: "W5-6", startWeek: 5, endWeek: 6, title: "🔬 仮説C検証（5社見積提案）", owner: "中川+北", category: "validation", isCritical: false },
  { id: "g16", week: "W5-6", startWeek: 5, endWeek: 6, title: "HL本格送信（10,000件）", owner: "中川", category: "sales", isCritical: true },
  { id: "g17", week: "W5-6", startWeek: 5, endWeek: 6, title: "初期商談15-20件実施", owner: "北", category: "sales", isCritical: true },
  { id: "g18", week: "W5-6", startWeek: 5, endWeek: 6, title: "個人情報規程・送信体制明文化", owner: "中川+法務", category: "legal", isCritical: true },

  // W7-8 (6/9-6/20)
  { id: "g19", week: "W7-8", startWeek: 7, endWeek: 8, title: "🔬 仮説D検証（ランク説明AB）", owner: "中川", category: "validation", isCritical: false },
  { id: "g20", week: "W7-8", startWeek: 7, endWeek: 8, title: "🎯 初回受注 2-3件", owner: "中川+北", category: "sales", isCritical: true },
  { id: "g21", week: "W7-8", startWeek: 7, endWeek: 8, title: "6月中旬稼働開始", owner: "候補者+北", category: "ops", isCritical: true },
  { id: "g22", week: "W7-8", startWeek: 7, endWeek: 8, title: "KPIダッシュボード稼働", owner: "中川", category: "ops", isCritical: false },

  // W9-12 (6/23-7/18)
  { id: "g23", week: "W9-12", startWeek: 9, endWeek: 12, title: "月次200万達成", owner: "中川+北", category: "sales", isCritical: true },
  { id: "g24", week: "W9-12", startWeek: 9, endWeek: 12, title: "HLバッチ送信2週間サイクル", owner: "中川", category: "ops", isCritical: false },
  { id: "g25", week: "W9-12", startWeek: 9, endWeek: 12, title: "職業紹介免許取得期待", owner: "重役+中川", category: "legal", isCritical: true },
  { id: "g26", week: "W9-12", startWeek: 9, endWeek: 12, title: "改善ループABCDE週次レビュー", owner: "中川", category: "ops", isCritical: false },
  { id: "g27", week: "W9-12", startWeek: 9, endWeek: 12, title: "月次レビュー（重役層）", owner: "中川+重役", category: "ops", isCritical: false },
];
