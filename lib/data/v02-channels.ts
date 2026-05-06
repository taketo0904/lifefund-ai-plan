// §3 チャネル戦略
export type Channel = {
  id: string;
  name: string;
  emoji: string;
  share: number; // %
  listSize: number;
  expectedRevenue: { worst: number; mid: number; best: number }; // 万円
  fockColor: string; // brand color
};

export const channels: Channel[] = [
  {
    id: "kenkyukai",
    name: "AI経営研究会（既存会員）",
    emoji: "🏛",
    share: 50,
    listSize: 30,
    expectedRevenue: { worst: 1500, mid: 3000, best: 6000 },
    fockColor: "#E05B03",
  },
  {
    id: "lifefund-network",
    name: "LIFEFUND建築ネットワーク",
    emoji: "🏗",
    share: 25,
    listSize: 200,
    expectedRevenue: { worst: 800, mid: 2000, best: 5000 },
    fockColor: "#F08C4A",
  },
  {
    id: "video-inbound",
    name: "月10本動画コンテンツ流入",
    emoji: "🎬",
    share: 15,
    listSize: 1000,
    expectedRevenue: { worst: 300, mid: 1000, best: 3000 },
    fockColor: "#F4A668",
  },
  {
    id: "partner-alliance",
    name: "業界団体・パートナー紹介",
    emoji: "🤝",
    share: 10,
    listSize: 50,
    expectedRevenue: { worst: 200, mid: 800, best: 2500 },
    fockColor: "#F8C496",
  },
];

// §6 商材ラインナップ（建築AI経営研究会 アップセル階層）
export type Package = {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceMin: number; // 万円
  priceMax: number; // 万円
  target: string;
  positioning: "entry" | "core" | "premium" | "referral" | "hybrid";
  staffing?: string;
  hours?: string;
  contractTerms?: string;
  contents?: string[];
  skillSet?: {
    required: string[];
    bonus?: string[];
    experience?: string;
  };
  deliverables?: string[];
  targetClient?: string;
  subMemberOption?: {
    note: string;
    pricing: { label: string; price: string }[];
  };
  pendingNote?: string;
};

export const packages: Package[] = [
  // ───── Tier 0: 入口商材（既存） ─────
  {
    id: "kenkyukai",
    name: "Tier 0｜建築AI経営研究会（既存）",
    duration: "月例・継続",
    price: "月 4万円（税別）",
    priceMin: 4,
    priceMax: 4,
    target: "AI経営に興味を持ち始めた建築業の経営者 / 学習フェーズ",
    positioning: "entry",
    staffing: "白都社長＋三山さん＋外部講師",
    hours: "月例会2-3時間 + アーカイブ視聴",
    contractTerms: "月額・自動更新",
    contents: [
      "月1回の例会（建築×AI事例セミナー＋ワーク）",
      "オンラインアーカイブ視聴（過去回・登壇インフルエンサー回）",
      "会員限定Slackコミュニティ（社長同士の情報交換）",
      "建築×AI事例100本ノックの月次配信",
      "懇親会・経営者交流の場",
    ],
    deliverables: [
      "毎月の学習コンテンツ（動画＋資料）",
      "AI経営の意思決定フレーム解説",
      "他社事例の共有レポート",
    ],
    targetClient: "【業界】建築・建設・住宅・不動産関連\n【規模】従業員10〜200名 / 売上3〜30億 / 中小〜中堅\n【買い手】社長本人（学びたい意欲＞すぐ実装したい）\n【状況】『AI経営という言葉は聞くが、何をすればいいか分からない』『同業他社の事例を知りたい』『情報をキャッチしたい』\n【予算感】月4万円は社長個人の研修費 or 役員裁量で稟議不要レベル",
    pendingNote: "アップセルの入口。LTV最大化＋上位商材の商談機会を生む",
  },
  // ───── Tier 1: 経営者AI武装プログラム ─────
  {
    id: "ceo-armament",
    name: "Tier 1｜経営者AI武装プログラム",
    duration: "3ヶ月集中（月2回コーチング）",
    price: "月 20万円（合計60万円）",
    priceMin: 60,
    priceMax: 60,
    target: "研究会で学んだ社長が『次は自社で動きたい』と動き出すフェーズ",
    positioning: "entry",
    staffing: "白都社長 or 三山さんが個別担当（1社1名）",
    hours: "月2回 × 90分の個別セッション + Slack質問対応",
    contractTerms: "3ヶ月一括（途中解約不可）",
    contents: [
      "Kickoff：社長のAI使いこなし診断（現状リテラシー測定）",
      "M1：ChatGPT/Claude を経営判断に使う実技指導（議事録・経営会議シミュレーション）",
      "M2：社内向けAI方針書・社員向けメッセージのドラフト共作",
      "M3：自社の3年AIロードマップ作成（経営層が自分で書ける状態に）",
      "毎月：Slack質問対応・参考事例の都度共有",
    ],
    deliverables: [
      "AI使いこなし診断レポート（Before/After）",
      "社長専用『AI経営判断テンプレ集』（10種以上）",
      "自社AI方針書 v1.0",
      "3年AIロードマップ（社内発表できる状態）",
    ],
    targetClient: "【業界】建築業（研究会卒業 or 並走会員）\n【規模】従業員20〜100名 / 売上5〜20億\n【買い手】社長本人\n【状況】『社員に任せる前に自分が分かりたい』『他人任せで失敗したくない』『でも本格コンサルはまだ早い』\n【具体例】2代目社長の世代交代タイミング / DX室を立ち上げる前段階 / AIで経営判断を変えたい\n【予算感】60万円は社長の自己投資 or 教育研修費で稟議通る",
    pendingNote: "Tier 0からの自然な上昇商材。全研究会員の20-30%獲得が目標",
  },
  // ───── Tier 2: 組織AI実装パッケージ ─────
  {
    id: "org-implementation",
    name: "Tier 2｜建築AI実装パッケージ",
    duration: "6ヶ月伴走",
    price: "月 50万円（合計300万円）",
    priceMin: 300,
    priceMax: 300,
    target: "経営者がAIを理解した次の段階。社員に伝播させ、業務をAI化する会社",
    positioning: "core",
    staffing: "PM1名＋実装担当1-2名（Lv2-3）",
    hours: "月20-30時間（ヒアリング・実装・研修）",
    contractTerms: "6ヶ月一括 or 月次（中途解約条件あり）",
    contents: [
      "Phase 1（M1-2）：業務棚卸し・AI化候補10本リストアップ（積算・図面・見積・営業・採用・経理）",
      "Phase 2（M2-4）：優先3本のAIワークフロー実装（ChatGPT/Claude/Zapier等）",
      "Phase 3（M4-5）：社員向けAI研修（全社研修2回 + 部門別研修）",
      "Phase 4（M5-6）：マニュアル整備・定着化・効果測定",
      "毎月：社長向け進捗報告＋意思決定フォロー",
    ],
    skillSet: {
      required: [
        "ChatGPT/Claude/Gemini を業務利用 6ヶ月以上",
        "Zapier / Make / n8n で自動化を実装可能",
        "業務ヒアリング・要件定義ができる",
        "建築業界の業務知識（積算・施工管理・営業フロー）",
      ],
      bonus: ["社員研修の実施経験", "業務改善コンサル経験"],
    },
    deliverables: [
      "業務棚卸しレポート（AI化候補マップ）",
      "AIワークフロー 3本（実運用レベル）",
      "社員向けAI研修プログラム＋録画",
      "AIマニュアル一式（部門別）",
      "効果測定レポート（削減工数・売上影響）",
    ],
    targetClient: "【業界】建築・建設・住宅\n【規模】従業員30〜200名 / 売上10〜50億\n【買い手】社長＋現場役員（営業部長・工事部長等）\n【状況】『社員にChatGPTを配ったが定着しない』『業務効率化の具体策が欲しい』『DX予算は確保した』\n【具体例】積算業務のAI化 / 図面チェック自動化 / 営業資料の自動生成 / 採用書類審査自動化\n【予算感】300万円はDX予算 or 設備投資枠で稟議通すレベル（補助金併用も可）",
    pendingNote: "本格的な収益貢献Tier。受注3-5件で年商1500万円ライン",
  },
  // ───── Tier 3: 事業変革コンサル ─────
  {
    id: "business-transformation",
    name: "Tier 3｜建築AI事業変革コンサル",
    duration: "12ヶ月伴走（年単位）",
    price: "月 80万円（合計960万円）",
    priceMin: 960,
    priceMax: 960,
    target: "業務AI化の次の段階。事業モデル・サービス・収益構造をAIで再設計する会社",
    positioning: "premium",
    staffing: "白都社長 or 三山さん（チーフ）＋PM1名＋実装2名",
    hours: "月40-60時間（経営伴走 + 実装 + 月次役員会同席）",
    contractTerms: "年契約（四半期見直し）",
    contents: [
      "Q1：経営戦略AI化（PEST/3C/SWOTのAI再分析・中期経営計画リライト）",
      "Q2：新規事業 or 新サービス開発（AI前提のビジネスモデル設計）",
      "Q3：DX投資設計＋AI採用戦略（人材・組織体制・予算配分）",
      "Q4：実装・KPI追跡・次年度計画策定",
      "毎月：経営会議・役員会同席＋ハンズオン",
    ],
    deliverables: [
      "中期経営計画（AI前提の3年計画）",
      "新規事業計画書 1本以上（AIネイティブ事業）",
      "DX投資ロードマップ・組織図",
      "KPIダッシュボード（自社専用構築）",
      "月次経営レポート＋次年度ロードマップ",
    ],
    targetClient: "【業界】建築・建設の中堅以上\n【規模】従業員100〜500名 / 売上30〜200億\n【買い手】社長＋経営企画 or COO\n【状況】『業界再編が始まり次の一手が必要』『新規事業を生まないと10年後生き残れない』『DX室を独立部門化したい』\n【具体例】既存ストック活用の新規サービス / B2C2B転換 / SaaS化 / プラットフォーム事業化\n【予算感】年1000万円は経営戦略コンサル並み（マッキンゼー・BCG級の予算枠）",
    pendingNote: "M&A検討前の準備フェーズも兼ねる。Tier 4への自然な橋渡し",
  },
  // ───── Tier 4: M&A仲介・PMI伴走 ─────
  {
    id: "ma-advisory",
    name: "Tier 4｜M&A仲介・PMI伴走",
    duration: "案件発掘〜PMI完了まで（6〜18ヶ月）",
    price: "着手金 100万円 + 成功報酬 5%",
    priceMin: 100,
    priceMax: 5000,
    target: "後継者問題・事業売却検討の社長 / AI実装で企業価値を高めて売却したい / 業界再編で買収側に回りたい",
    positioning: "hybrid",
    staffing: "白都社長＋三山さん＋外部M&Aアドバイザー（仲介免許者）",
    hours: "案件次第（DD/PMIフェーズで集中投入）",
    contractTerms: "案件別契約（着手金 + 成功報酬）",
    contents: [
      "Stage 1：M&A戦略策定（売り or 買いの戦略立案・価値評価レンジ算定）",
      "Stage 2：候補企業のソーシング（建築業界ネットワーク活用）",
      "Stage 3：DD（デューデリジェンス）支援・契約交渉同席",
      "Stage 4：クロージング（株式譲渡実行・契約締結）",
      "Stage 5：PMI（買収後統合）— AI活用での企業価値向上を実装",
      "売却後 or 買収後の継続伴走（Tier 3に戻る形でリテンション）",
    ],
    deliverables: [
      "M&A戦略書（売却 or 買収の方針定義）",
      "企業価値評価レポート（AI活用前後の比較）",
      "候補リスト＋アプローチ進捗",
      "DDレポート（事業・財務・法務・AI資産評価）",
      "PMI実行計画書＋四半期レビュー",
    ],
    targetClient: "【業界】建築・建設・住宅・不動産\n【規模】売上10〜200億の中小・中堅\n【買い手】創業社長（後継者不在） or 業界再編狙う成長企業\n【状況】『後継者がいない』『高齢化で5年以内に出口を考えたい』『買収して規模拡大したい』『AIで企業価値を上げて売りたい』\n【予算感】成功報酬型のため心理的ハードル低い。譲渡価額3億円なら成功報酬1500万円",
    pendingNote: "M&A仲介免許 or 提携アドバイザーが必要。法務体制の整備優先",
  },
  // ───── スポット商材 ─────
  {
    id: "spot-services",
    name: "スポット施策（単発）",
    duration: "1日〜1ヶ月",
    price: "30万〜150万円",
    priceMin: 30,
    priceMax: 150,
    target: "上位商材未契約の研究会員・新規リードへの入口商材",
    positioning: "referral",
    staffing: "案件別（白都社長 or 三山さん or 講師）",
    hours: "案件次第",
    contractTerms: "単発契約",
    contents: [
      "建築AI 1day社員研修（30〜50万円）",
      "経営合宿でのAI戦略ファシリテーション（80〜150万円）",
      "業界団体・商工会議所での講演（20〜50万円 + 交通費）",
      "AI事例調査レポート作成（30〜80万円）",
      "建築×AIのLP・営業資料制作（50〜120万円）",
    ],
    deliverables: [
      "研修資料＋録画",
      "戦略ファシリ議事録＋アクションプラン",
      "講演資料＋スライド",
      "調査レポート（PDF形式）",
    ],
    targetClient: "【業界】建築業 全般\n【買い手】社長 / 人事 / 営業企画\n【状況】『上位商材はまだ早いが何か単発で試したい』『研究会員以外の知人企業から問い合わせがあった』",
    pendingNote: "案件単価は低いが、Tier 1〜3への商談機会創出が真の目的",
  },
];
