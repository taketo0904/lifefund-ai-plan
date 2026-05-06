// §3.5 POC計画（3ヶ月）v0.2
// 第一目的: 月額本契約への転換率検証
// 商材: AI人材"お試しアサイン" 50万 / 1ヶ月 / 推定Lv2-3 / 週10-15時間

export const pocBasics = {
  goal: "本契約への転換率検証",
  product: 'AI人材 "お試しアサイン"',
  price: 50, // 万円
  duration: "1ヶ月",
  staffing: "推定Lv2-3 人材1名 × 週10-15時間",
  pm: "PM 1名（兼務 / 担当未定）",
  judgmentMethod: "ミニ試験（30-60分）で推定Lv判定",
  conversionPath: "POC終了時に正式Lv判定 → 月額100万以上の準委任を提案",
};

export const pocTargets = {
  pocCount: { min: 12, max: 15 }, // 件 / 3ヶ月
  conversionRate: { min: 30, max: 40 }, // %
  contractCount: { min: 4, max: 5 }, // 本契約獲得 (3ヶ月目末)
  monthlyRunRate: 500, // 万円 / 月（本契約のみ）
};

export type Phase = {
  num: 0 | 0.5 | 1;
  label: string;
  weeks: string;
  color: string;
  bg: string;
  light: string;
  tasks: { week: string; text: string; bold?: boolean }[];
};

export const pocPhases: Phase[] = [
  {
    num: 0,
    label: "Phase 0: 人材確保",
    weeks: "Week 1-3",
    color: "#E05B03",
    bg: "#E05B03",
    light: "#f6e9f0",
    tasks: [
      { week: "W1", text: "50人にスクリーニング打診（コミュニティ・Lステップ）" },
      { week: "W1-2", text: "ミニ試験設計（認定試験 簡易版 / 自作版）" },
      { week: "W2", text: "試験配布・回答収集" },
      { week: "W3", text: "推定Lv判定 → アサイン可能プール 8-12人 確保", bold: true },
    ],
  },
  {
    num: 0.5,
    label: "Phase 0.5: 営業準備（並走）",
    weeks: "Week 1-3 並走",
    color: "#c026d3",
    bg: "#c026d3",
    light: "#f5e3f8",
    tasks: [
      { week: "W1", text: "HLセグメント策定（DX推進担当層 / 1,500-2,000件 / 月）" },
      { week: "W2", text: "トーク・LP・提案書ドラフト作成" },
      { week: "W3", text: "HL初回送信開始" },
    ],
  },
  {
    num: 1,
    label: "Phase 1: POC実行",
    weeks: "Week 4-12",
    color: "#7e22ce",
    bg: "#7e22ce",
    light: "#ebdbf5",
    tasks: [
      { week: "W4-5", text: "アポ → 商談 → POC初受注 1-2件" },
      { week: "W6-7", text: "POC受注を月4-5件ペースに乗せる", bold: true },
      { week: "W8-9", text: "1件目POC完走 → 本契約クロージング開始" },
      { week: "W10-11", text: "本契約 2-3件 成約" },
      { week: "W12", text: "3ヶ月目末 月500万ペース達成確認", bold: true },
    ],
  },
];

export type MonthlyProjection = {
  month: 1 | 2 | 3;
  label: string;
  weeks: string;
  pocCount: string;
  contractCount: string;
  pocRevenue: number; // 万円
  contractRevenue: number; // 万円
  totalRevenue: number; // 万円
  highlight?: boolean;
};

export const pocMonthly: MonthlyProjection[] = [
  {
    month: 1,
    label: "Month 1",
    weeks: "W1-4",
    pocCount: "1-2件",
    contractCount: "0",
    pocRevenue: 75,
    contractRevenue: 0,
    totalRevenue: 75,
  },
  {
    month: 2,
    label: "Month 2",
    weeks: "W5-8",
    pocCount: "4-5件",
    contractCount: "1-2件",
    pocRevenue: 225,
    contractRevenue: 150,
    totalRevenue: 400,
  },
  {
    month: 3,
    label: "Month 3",
    weeks: "W9-12",
    pocCount: "4-5件",
    contractCount: "4-5件",
    pocRevenue: 225,
    contractRevenue: 500,
    totalRevenue: 725,
    highlight: true,
  },
];

export const pocActions = [
  {
    num: 1,
    title: "ミニ試験の設計",
    detail: "認定試験 v0.0 簡易版 / 並行で自作版を作成",
    deadline: "W2",
  },
  {
    num: 2,
    title: "スクリーニング50人の特定",
    detail: "コミュニティ・Lステップから具体名を出す",
    deadline: "W1",
  },
  {
    num: 3,
    title: "POC提案書ひな形",
    detail: "50万・1ヶ月・週10-15時間・成果物を1枚に",
    deadline: "W2",
  },
  {
    num: 4,
    title: "HLセグメント抽出",
    detail: "45,000件 → DX推進担当 1,500-2,000件 / 月のセグメントを抽出",
    deadline: "W1",
  },
  {
    num: 5,
    title: "本契約への動線設計",
    detail: "POC終了時の正式Lv判定 + 100万/月本契約の提案フロー",
    deadline: "W4",
  },
];

export const pocRisks = [
  {
    risk: "プール8-12人が確保できない",
    mitigation: "Lステップ10万人へ拡大 / 応募率仮定の下方修正",
    severity: "中",
  },
  {
    risk: "ミニ試験設計が遅れる",
    mitigation: "自作の暫定版で先行・正式版で後置換",
    severity: "中",
  },
  {
    risk: "W4までにPOC初受注が出ない",
    mitigation: "A層（for Biz上位顧客）クロスセルを並走",
    severity: "高",
  },
  {
    risk: "本契約への転換率が20%以下",
    mitigation: "POC設計改善・顧客像絞り込み・単価見直し",
    severity: "高",
  },
];

// HLアプローチは別途詰める（保留事項）
export const pocPending = [
  "③ HLアプローチの詳細（誰の名義／入口商材／送信ペース）は別途詰める",
];

// ============== 詳細タスク（W1-12 / 編集可能） ==============
export type PocPhase = "phase0" | "phase0_5" | "phase1";
export type PocTaskStatus = "todo" | "doing" | "done" | "blocked";

export type DetailedPocTask = {
  id: string;
  week: number; // 1-12（参考値）
  phase: PocPhase;
  title: string;
  detail: string;
  owner: string;
  status: PocTaskStatus;
  dueDate?: string; // ISO YYYY-MM-DD（未設定時は POC開始日 + (week-1)*7 で自動計算）
};

// プロジェクト全体設定のデフォルト
export const pocProjectDefaults = {
  projectName: "SHIFT AI 人材バンク POC",
  startDate: "2026-04-29", // POC開始日
  durationWeeks: 12,
};

export const detailedPocTasks: DetailedPocTask[] = [
  // ===== W1: Phase 0 + 0.5 並走 =====
  { id: "p001", week: 1, phase: "phase0", title: "50人スクリーニングリスト確定", detail: "コミュニティ会員＋Lステップから候補50人を特定", owner: "", status: "todo" },
  { id: "p002", week: 1, phase: "phase0", title: "スクリーニング打診メール文面作成", detail: "50万PoC案件の概要 / 興味ある人への次ステップ案内", owner: "", status: "todo" },
  { id: "p003", week: 1, phase: "phase0", title: "50人へ打診送信", detail: "個別 or バッチで送信。返信期限を5日後に設定", owner: "", status: "todo" },
  { id: "p004", week: 1, phase: "phase0", title: "ミニ試験 設計方針決定", detail: "認定試験 v0.0 簡易版 を流用 or 完全自作 を選択", owner: "", status: "todo" },
  { id: "p005", week: 1, phase: "phase0_5", title: "HLセグメント策定（1,500-2,000件抽出）", detail: "DX推進担当 / 業種・規模別 / for Biz未接触者で絞る", owner: "", status: "todo" },
  { id: "p006", week: 1, phase: "phase0_5", title: "HL送信ツール選定・契約", detail: "SendGrid / Mailchimp / lemlist 等を比較し選定", owner: "", status: "todo" },

  // ===== W2: Phase 0 + 0.5 並走 =====
  { id: "p007", week: 2, phase: "phase0", title: "ミニ試験 問題作成（3-5問）", detail: "プロンプト設計 / 業務改善提案 / Zapier等の使いこなし", owner: "", status: "todo" },
  { id: "p008", week: 2, phase: "phase0", title: "ミニ試験 評価基準策定（Lv2/Lv3判定軸）", detail: "Lv2: 基本実装可 / Lv3: 業務理解+改善提案可 のライン", owner: "", status: "todo" },
  { id: "p009", week: 2, phase: "phase0", title: "ミニ試験 50人へ配布", detail: "Google Forms / Notion 等で配布。回答期限3-5日", owner: "", status: "todo" },
  { id: "p010", week: 2, phase: "phase0_5", title: "HLメール文面作成（A/B 2パターン）", detail: "件名・本文を2パターン作成し、AB配信予定", owner: "", status: "todo" },
  { id: "p011", week: 2, phase: "phase0_5", title: "POC紹介LP作成", detail: "50万・2週間・1業務PoC のオファーを1ページに", owner: "", status: "todo" },
  { id: "p012", week: 2, phase: "phase0_5", title: "POC提案書ドラフト作成", detail: "提供内容・スケジュール・成果物・本契約への動線", owner: "", status: "todo" },
  { id: "p013", week: 2, phase: "phase0_5", title: "POC契約書ひな形作成", detail: "業務委託契約 / 成果物の権利 / 機密保持 / 解除条件", owner: "", status: "todo" },

  // ===== W3: 人材プール確定 + HL送信開始 =====
  { id: "p014", week: 3, phase: "phase0", title: "ミニ試験 回答収集・採点", detail: "全員の回答を採点し、評価ランクをつける", owner: "", status: "todo" },
  { id: "p015", week: 3, phase: "phase0", title: "推定Lv判定（Lv2 / Lv3 / 不合格）", detail: "経歴 + ミニ試験結果 のハイブリッド判定", owner: "", status: "todo" },
  { id: "p016", week: 3, phase: "phase0", title: "アサイン可能プール 8-12人 確定", detail: "稼働可能性 / 連絡先 / 専門領域 を整理", owner: "", status: "todo" },
  { id: "p017", week: 3, phase: "phase0", title: "プール管理表作成", detail: "個人情報・契約条件・専門領域・スキルレベルをDB化", owner: "", status: "todo" },
  { id: "p018", week: 3, phase: "phase0_5", title: "HL初回送信開始（500-700件 / 週）", detail: "A/Bパターンで送信。CSVログを残す", owner: "", status: "todo" },
  { id: "p019", week: 3, phase: "phase0_5", title: "返信モニタリング体制", detail: "返信があったらチャネル / 役職 / 関心度を記録", owner: "", status: "todo" },

  // ===== W4: POC初受注フェーズ =====
  { id: "p020", week: 4, phase: "phase1", title: "HL返信からアポ獲得（5-10件目標）", detail: "返信者へ個別フォロー → アポ取得", owner: "", status: "todo" },
  { id: "p021", week: 4, phase: "phase1", title: "商談実施（3-5件）", detail: "POC提案書ベースで商談。価値・期間・成果物を説明", owner: "", status: "todo" },
  { id: "p022", week: 4, phase: "phase1", title: "POC初受注 1-2件", detail: "受注時に契約書取り交わし。キックオフ日設定", owner: "", status: "todo" },

  // ===== W5: PoC実装着手 =====
  { id: "p023", week: 5, phase: "phase1", title: "受注案件のキックオフMTG", detail: "顧客側担当者 / スコープ / スケジュール / 成功基準を確認", owner: "", status: "todo" },
  { id: "p024", week: 5, phase: "phase1", title: "1業務選定（顧客と協議）", detail: "棚卸はせず、顧客が一番困っている1業務に絞り込み", owner: "", status: "todo" },
  { id: "p025", week: 5, phase: "phase1", title: "人材アサイン（推定Lv2-3 1名）", detail: "プールから案件適性の高い1人を選定 / 契約", owner: "", status: "todo" },
  { id: "p026", week: 5, phase: "phase1", title: "PoC実装 着手", detail: "ワークフロー設計 → ツール選定 → 実装スタート", owner: "", status: "todo" },
  { id: "p027", week: 5, phase: "phase1", title: "HL継続送信（700件 / 週）", detail: "毎週バッチで継続送信。返信トラッキング", owner: "", status: "todo" },

  // ===== W6: 案件中盤 =====
  { id: "p028", week: 6, phase: "phase1", title: "商談継続 / 受注ペース確認", detail: "目標：月4-5件のPOC受注ペースに乗せる", owner: "", status: "todo" },
  { id: "p029", week: 6, phase: "phase1", title: "PoC実装 中盤", detail: "1件目の動くプロトタイプができている状態", owner: "", status: "todo" },
  { id: "p030", week: 6, phase: "phase1", title: "月次売上 200-300万到達確認", detail: "Month 2 終了時の売上ペースを確認", owner: "", status: "todo" },

  // ===== W7: 1件目完成 =====
  { id: "p031", week: 7, phase: "phase1", title: "1件目PoC完成", detail: "顧客環境で動く状態に持っていく", owner: "", status: "todo" },
  { id: "p032", week: 7, phase: "phase1", title: "利用マニュアル作成", detail: "顧客の現場担当者が自走できる粒度で記述", owner: "", status: "todo" },
  { id: "p033", week: 7, phase: "phase1", title: "効果測定レポート作成", detail: "削減工数 / コスト削減効果 / 品質向上を数字で示す", owner: "", status: "todo" },

  // ===== W8: 本契約クロージング開始 =====
  { id: "p034", week: 8, phase: "phase1", title: "1件目POC最終報告会", detail: "経営層含む報告会。次フェーズ提案を直後に", owner: "", status: "todo" },
  { id: "p035", week: 8, phase: "phase1", title: "本契約クロージング開始", detail: "Lite (月80万) or Standard (月120万) の提案書を出す", owner: "", status: "todo" },
  { id: "p036", week: 8, phase: "phase1", title: "POC継続受注（月4-5件ペース）", detail: "新規POCの受注を並行で進める", owner: "", status: "todo" },

  // ===== W9: 本契約成約スタート =====
  { id: "p037", week: 9, phase: "phase1", title: "本契約 1-2件成約", detail: "Lite/Standardでの最初の本契約", owner: "", status: "todo" },
  { id: "p038", week: 9, phase: "phase1", title: "POC月次4-5件ペース継続", detail: "POCラインの安定運用", owner: "", status: "todo" },

  // ===== W10: 本契約拡大 =====
  { id: "p039", week: 10, phase: "phase1", title: "本契約 2-3件成約", detail: "累計4-5件の本契約を目指す", owner: "", status: "todo" },
  { id: "p040", week: 10, phase: "phase1", title: "既存POC実行管理", detail: "並行案件の品質管理 / アサイン人材のフォロー", owner: "", status: "todo" },
  { id: "p041", week: 10, phase: "phase1", title: "失注分析（POC→本契約に進まなかった案件）", detail: "失注理由のヒアリング / パターン分析", owner: "", status: "todo" },

  // ===== W11: レビュー =====
  { id: "p042", week: 11, phase: "phase1", title: "POC月次レビュー（転換率測定）", detail: "POC受注数・本契約成約数・転換率を集計", owner: "", status: "todo" },
  { id: "p043", week: 11, phase: "phase1", title: "HL継続送信 / 残リスト消化", detail: "セグメントの絞り込み再検討", owner: "", status: "todo" },
  { id: "p044", week: 11, phase: "phase1", title: "本契約交渉継続", detail: "Phase 2移行に向けた本契約数の積み上げ", owner: "", status: "todo" },

  // ===== W12: 3ヶ月目末締め =====
  { id: "p045", week: 12, phase: "phase1", title: "3ヶ月目末 締め", detail: "Month 3 全体の数値確定。POC・本契約・売上集計", owner: "", status: "todo" },
  { id: "p046", week: 12, phase: "phase1", title: "月500万ペース達成確認", detail: "本契約のみで月500万ペースに到達したか判定", owner: "", status: "todo" },
  { id: "p047", week: 12, phase: "phase1", title: "Phase 2移行判定", detail: "§10.2 Phase 2 トリガー達成可否を判定", owner: "", status: "todo" },
  { id: "p048", week: 12, phase: "phase1", title: "改善ループ振り返り", detail: "うまく行った点 / 失敗 / 次フェーズへの引き継ぎ", owner: "", status: "todo" },

  // ===== 旧ガントから統合した周辺タスク =====
  // W1: 前段の準備系タスク
  { id: "g101", week: 1, phase: "phase0", title: "前任者ヒアリング（23問）", detail: "事業引き継ぎヒアリング / 過去の経緯・課題・ステークホルダー把握", owner: "", status: "todo" },
  { id: "g102", week: 1, phase: "phase0_5", title: "ホスキルシート テンプレ作成", detail: "推薦時に使う候補者プロファイルのテンプレ", owner: "", status: "todo" },
  { id: "g103", week: 1, phase: "phase0_5", title: "営業トークスクリプト作成", detail: "POC営業時の標準トーク / 反対意見への返し集", owner: "", status: "todo" },
  { id: "g104", week: 1, phase: "phase0", title: "ステークホルダー1on1（14名）", detail: "重役・関係者との関係構築・期待値確認", owner: "", status: "todo" },
  { id: "g105", week: 1, phase: "phase0", title: "個人情報規程・コンプラ規程 審査開始", detail: "法務レビュー依頼 / 規程整備の本格スタート", owner: "", status: "todo" },

  // W3: 仮説検証
  { id: "g108", week: 3, phase: "phase0_5", title: "仮説B検証（予算所在）", detail: "for Biz顧客に予算がどこにあるかをヒアリング", owner: "", status: "todo" },
  { id: "g109", week: 3, phase: "phase0_5", title: "仮説A検証（for Biz反応）", detail: "for Biz実アクティブ20社にAI人材ニーズをヒアリング", owner: "", status: "todo" },
  { id: "g110", week: 3, phase: "phase0_5", title: "仮説E検証（HL 500件AB配信）", detail: "HLメール A/B 2パターンで効果差を計測", owner: "", status: "todo" },
  { id: "g113", week: 3, phase: "phase0", title: "NDA・個人情報同意書テンプレ", detail: "NDA / 個人情報同意書 / 候補者書面の整備", owner: "", status: "todo" },

  // W5: 仮説検証＋本格送信
  { id: "g114", week: 5, phase: "phase1", title: "仮説E結果集計 → GTM見直し", detail: "AB配信の結果から営業戦略を調整", owner: "", status: "todo" },
  { id: "g115", week: 5, phase: "phase1", title: "仮説C検証（5社見積提案）", detail: "実際の見積提案で受注確度を検証", owner: "", status: "todo" },
  { id: "g116", week: 5, phase: "phase1", title: "HL本格送信（10,000件）", detail: "セグメント拡張・本格スケール送信", owner: "", status: "todo" },
  { id: "g117", week: 5, phase: "phase1", title: "初期商談 15-20件 実施", detail: "返信からアポ・商談を量で回す", owner: "", status: "todo" },
  { id: "g118", week: 5, phase: "phase1", title: "個人情報規程・送信体制 明文化", detail: "法務レビュー反映 / 運用ルール化", owner: "", status: "todo" },

  // W7: 仮説D + KPIダッシュボード
  { id: "g119", week: 7, phase: "phase1", title: "仮説D検証（ランク説明AB）", detail: "ランク制度のメッセージ訴求力を検証", owner: "", status: "todo" },
  { id: "g122", week: 7, phase: "phase1", title: "KPIダッシュボード稼働", detail: "ファネル / 受注 / 売上の見える化", owner: "", status: "todo" },

  // W9-12: 重役レイヤー
  { id: "g125", week: 9, phase: "phase1", title: "職業紹介免許 取得期待", detail: "Phase 2への移行ゲート / 重役エスカレーションで進捗管理", owner: "", status: "todo" },
  { id: "g127", week: 9, phase: "phase1", title: "月次レビュー（重役層）", detail: "経営層への進捗報告 / 戦略調整の場", owner: "", status: "todo" },
];

// Phase メタ情報
export const pocPhaseMeta: Record<PocPhase, { label: string; color: string; bg: string; light: string }> = {
  phase0: { label: "Phase 0", color: "#E05B03", bg: "bg-orange-100", light: "text-orange-700" },
  phase0_5: { label: "Phase 0.5", color: "#c026d3", bg: "bg-fuchsia-100", light: "text-fuchsia-700" },
  phase1: { label: "Phase 1", color: "#7e22ce", bg: "bg-purple-100", light: "text-purple-700" },
};
