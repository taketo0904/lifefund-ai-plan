// 戦略フレームワーク（スプレッドシートから移植）
// PEST / 3C / Five Forces / SWOT / STP / JTBD

export type FrameworkItem = {
  id: string;
  criterion: string; // 評価項目
  hint: string; // 着眼点・ヒアリング質問
  score: number; // 1-5
};

export type FrameworkGroup = {
  id: string;
  label: string;
  items: FrameworkItem[];
};

export type Framework = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  weight: number;
  groups: FrameworkGroup[];
};

// ====== 企業基本情報 ======
export type CompanyBasics = {
  companyName: string;
  industry: string;
  founded: string;
  employees: string;
  revenue: string;
  contact: string;
  hearingDate: string;
};

export const defaultCompanyBasics: CompanyBasics = {
  companyName: "SHIFT AI 人材バンク（仮称：シフトAIワークス）",
  industry: "AI人材紹介・業務委託マッチング",
  founded: "2026/04 事業開始",
  employees: "Phase 1: 2名 / Phase 3: 最大5名",
  revenue: "年商3億円（2027/04目標）",
  contact: "事業推進担当（PM兼務）",
  hearingDate: "2026-04-29",
};

// ====== ビジネスモデル ======
export type BusinessModel = {
  modelType: string;
  targetCustomer: string;
  problemValue: string;
  launchTiming: string;
  initialInvestment: string;
  pricing: string;
  kgi: string;
};

export const defaultBusinessModel: BusinessModel = {
  modelType: "BtoB マッチング（準委任メイン → 紹介・ハイブリッド）",
  targetCustomer: "A層: SHIFT AI for Biz 上位顧客（既存接点 50社） / B層: 研修問合せ顧客 / C層: HL 45,000件のDX推進担当層（外部開拓）",
  problemValue: "AI実装PMが見つからない・採用は時間がかかる・大手SIは高い、という中堅企業の課題に対し『コミュニティ認定済みAI人材を月単位で準委任で稼働、合えば紹介で社員化』を提供。販路（既存接点）×供給（コミュニティ3万）×品質（認定Lv1-5）の3点セット。",
  launchTiming: "2026/05 Phase 1 立ち上げ → 2026/08 Phase 2 拡大（免許取得後・紹介事業）",
  initialInvestment: "Phase 1 月次130万（中川+業務委託）/ HL運用30万 / 販管費50万",
  pricing: "Trial 50万 / 2週間, Lite 月80万, Standard 月120万, Premium 月180万, 紹介 年収×30-45%",
  kgi: "年商3億円・営業利益確保・Phase 2 移行（月次500万達成）",
};

// ====== フレームワーク定義 ======
export const defaultFrameworks: Framework[] = [
  {
    id: "pest",
    title: "PEST分析",
    emoji: "🌐",
    description: "マクロ環境のスコアリング（政治・経済・社会・技術）",
    weight: 1.0,
    groups: [
      {
        id: "p",
        label: "P：政治・規制",
        items: [
          { id: "p1", criterion: "規制環境の追い風", hint: "参入市場に対して法規制は追い風か？（規制緩和・補助金・政策支援）/ DX推進/AI活用補助金あり", score: 3 },
          { id: "p2", criterion: "参入障壁（規制面）", hint: "許認可・資格・法規制による参入コストは低いか？/ 有料職業紹介免許が必要・取得中", score: 2 },
          { id: "p3", criterion: "政治リスク", hint: "政権交代や政策変更による事業リスクは低いか？/ AI/DX政策は超党派的に推進", score: 4 },
        ],
      },
      {
        id: "e",
        label: "E：経済",
        items: [
          { id: "e1", criterion: "市場成長性", hint: "ターゲット市場は成長しているか？/ AI人材339万人不足・フリーランスQ1で2倍", score: 5 },
          { id: "e2", criterion: "顧客購買力", hint: "ターゲット顧客の予算・購買力は十分か？/ 法人AI導入率33.9%・予算化進む", score: 4 },
          { id: "e3", criterion: "景気感応度", hint: "景気後退時でも需要が維持されるか？/ AI/DXは生産性投資として残りやすい", score: 3 },
        ],
      },
      {
        id: "s",
        label: "S：社会・文化",
        items: [
          { id: "s1", criterion: "社会トレンド適合性", hint: "少子高齢化・SDGs・価値観変化などのトレンドに乗っているか？/ AI/DX/働き方改革すべて追い風", score: 5 },
          { id: "s2", criterion: "顧客の受容性", hint: "ターゲット顧客がサービスを受け入れやすい文化・習慣か？/ AI活用への関心高く受容性大", score: 4 },
          { id: "s3", criterion: "労働市場の状況", hint: "必要な人材を採用・確保しやすい環境か？/ フリーランス市場拡大・コミュニティ会員3万", score: 4 },
        ],
      },
      {
        id: "t",
        label: "T：技術",
        items: [
          { id: "t1", criterion: "技術トレンドの追い風", hint: "AI・DX・クラウドなどの技術革新が事業を後押しするか？/ LLM/Agent技術が主役", score: 5 },
          { id: "t2", criterion: "技術実現可能性", hint: "必要な技術はすでに存在・調達可能か？/ ChatGPT/Claude/ノーコードで実装可", score: 5 },
          { id: "t3", criterion: "技術陳腐化リスク", hint: "短期間で技術が陳腐化するリスクは低いか？/ LLMは進化中だがコア知見・運用ノウハウは残る", score: 4 },
        ],
      },
    ],
  },
  {
    id: "3c",
    title: "3C分析",
    emoji: "👥",
    description: "顧客・競合・自社のスコアリング",
    weight: 1.2,
    groups: [
      {
        id: "customer",
        label: "Customer：顧客",
        items: [
          { id: "c1", criterion: "顧客課題の明確度", hint: "顧客が抱える課題は明確に特定できているか？/ AI実装PMがいない・採用は遅い・SI高い", score: 5 },
          { id: "c2", criterion: "市場ニーズの大きさ", hint: "十分な数の顧客がその課題を持っているか？/ 中堅企業・大企業ともに広範", score: 5 },
          { id: "c3", criterion: "顧客の支払意欲", hint: "顧客はお金を払ってでも解決したいと思っているか？/ 月100-180万でも本契約見込み", score: 4 },
          { id: "c4", criterion: "顧客ヒアリング実績", hint: "実際の顧客にインタビュー・PoC等を実施しているか？/ for Bizヒアリング・3ヶ月POC計画策定中", score: 3 },
        ],
      },
      {
        id: "competitor",
        label: "Competitor：競合",
        items: [
          { id: "co1", criterion: "競合との差別化度", hint: "既存競合に対して明確な差別化ポイントがあるか？/ 販路+供給+品質の3点セット", score: 4 },
          { id: "co2", criterion: "競合の弱点認識度", hint: "競合のウィークポイントを具体的に把握しているか？/ Findy/レバテック=AI特化なし、SI=高い・遅い", score: 4 },
          { id: "co3", criterion: "参入障壁（参入側）", hint: "自社が有利な参入障壁（特許・ブランド・ネットワーク等）があるか？/ HL45,000+コミュニティ3万は模倣困難", score: 4 },
          { id: "co4", criterion: "競合情報収集度", hint: "競合の価格・機能・顧客評価を十分に把握しているか？/ 価格帯把握済・詳細評価は未", score: 3 },
        ],
      },
      {
        id: "company",
        label: "Company：自社",
        items: [
          { id: "cm1", criterion: "独自リソース・強み", hint: "他社が真似できないリソース/ HL 45,000件・コミュニティ3万・認定試験設計", score: 5 },
          { id: "cm2", criterion: "実行体制の充実度", hint: "事業を推進するチーム・組織が整っているか？/ Phase 1は2人体制で薄い・拡張計画あり", score: 2 },
          { id: "cm3", criterion: "資金調達力・財務体力", hint: "事業を継続するための資金・財務基盤はあるか？/ SHIFT AI親会社の事業資源", score: 3 },
          { id: "cm4", criterion: "既存事業との親和性", hint: "既存事業とのシナジー/ for Biz 2,500社との完全シナジー", score: 5 },
        ],
      },
    ],
  },
  {
    id: "5f",
    title: "ファイブフォース分析",
    emoji: "⚔️",
    description: "業界の競争構造（スコア高＝自社に有利）",
    weight: 1.0,
    groups: [
      {
        id: "f1",
        label: "①既存競合の脅威（低いほど有利）",
        items: [
          { id: "f1a", criterion: "競合の少なさ", hint: "競合企業の数は少ないか？/ 一般エージェント多数、AI特化は少ない", score: 3 },
          { id: "f1b", criterion: "競合差異化度", hint: "競合間での差別化が進んでおり、価格競争になりにくいか？/ AI特化×認定×販路の組み合わせは独自", score: 4 },
          { id: "f1c", criterion: "市場成長の余裕", hint: "市場が成長しており、競合同士でゼロサム競争にならないか？/ 339万人不足の市場でゼロサムにならない", score: 5 },
        ],
      },
      {
        id: "f2",
        label: "②新規参入の脅威（低いほど有利）",
        items: [
          { id: "f2a", criterion: "資本要件の高さ", hint: "新規参入に必要な初期投資・資本は大きいか？/ 免許取得・コミュニティ構築コスト", score: 3 },
          { id: "f2b", criterion: "ブランド・顧客慣性", hint: "既存顧客が乗り換えにくいブランド/ for Biz 2,500社接点は強み", score: 4 },
          { id: "f2c", criterion: "規制・特許障壁", hint: "参入を阻む規制・特許・資格要件があるか？/ 有料職業紹介免許", score: 3 },
        ],
      },
      {
        id: "f3",
        label: "③代替品の脅威（低いほど有利）",
        items: [
          { id: "f3a", criterion: "代替手段の少なさ", hint: "顧客が代替できる手段が限られているか？/ 採用・SI・コンサル・社内検討と多数", score: 2 },
          { id: "f3b", criterion: "代替品の価格差", hint: "代替品のコストパフォーマンスが自社より劣るか？/ 採用は時間、SIは超高単価、研修は実装に落ちない", score: 4 },
        ],
      },
      {
        id: "f4",
        label: "④買い手の交渉力（低いほど有利）",
        items: [
          { id: "f4a", criterion: "顧客の分散度", hint: "特定顧客への依存度が低い/ 中堅企業中心で広く分散見込み", score: 4 },
          { id: "f4b", criterion: "顧客の価格感度", hint: "顧客は価格より価値・品質を重視するか？/ 動くもの×即時性なら払う", score: 3 },
          { id: "f4c", criterion: "スイッチングコスト", hint: "顧客が競合へ乗り換えるコスト/ 月単位準委任は乗り換え容易（諸刃）", score: 2 },
        ],
      },
      {
        id: "f5",
        label: "⑤売り手の交渉力（低いほど有利）",
        items: [
          { id: "f5a", criterion: "仕入先の分散度", hint: "特定サプライヤー（人材）への依存度が低いか？/ コミュニティ3万人で分散", score: 4 },
          { id: "f5b", criterion: "内製化可能性", hint: "主要なリソース・コンポーネントを内製化できるか？/ コミュニティで自社人材確保可能", score: 4 },
        ],
      },
    ],
  },
  {
    id: "swot",
    title: "SWOT分析",
    emoji: "🎯",
    description: "強み・弱み・機会・脅威の充実度評価",
    weight: 1.0,
    groups: [
      {
        id: "swot",
        label: "■ スコアリング（各軸の充実度）",
        items: [
          { id: "sw1", criterion: "S 強みの充実度", hint: "自社固有の強み（リソース・ケイパビリティ）はどれだけ明確か？/ 販路+供給+品質の3点クリア", score: 4 },
          { id: "sw2", criterion: "W 弱みの認識度", hint: "改善が必要な弱みをどれだけ正確に認識しているか？/ 免許・試験・体制の弱点を認識", score: 4 },
          { id: "sw3", criterion: "O 機会の大きさ", hint: "市場・環境から得られるチャンスはどれだけ大きいか？/ AI需要爆発、中堅市場手付かず", score: 5 },
          { id: "sw4", criterion: "T 脅威の低さ", hint: "外部からの脅威はどれだけ小さい・対処可能か？/ 大手参入・個人情報リスクなど中程度", score: 3 },
        ],
      },
    ],
  },
  {
    id: "stp",
    title: "STP分析",
    emoji: "🎪",
    description: "セグメント・ターゲット・ポジショニング",
    weight: 1.1,
    groups: [
      {
        id: "s",
        label: "S：Segmentation（市場細分化）",
        items: [
          { id: "stp_s1", criterion: "セグメント分解の精度", hint: "市場を業種・規模・地域・属性などで細分化できているか？/ A層 for Biz / B層 研修問合せ / C層 HL外部に分割済", score: 4 },
          { id: "stp_s2", criterion: "セグメントの定量把握", hint: "各セグメントの市場規模・成長率を数値で把握/ A層50社・B層+C層45,000件で把握", score: 4 },
          { id: "stp_s3", criterion: "顧客ニーズの異質性", hint: "セグメント間で課題・ニーズが明確に異なる/ A層=即戦力、B層=学習延長、C層=コスト軸", score: 4 },
        ],
      },
      {
        id: "t",
        label: "T：Targeting（ターゲット選定）",
        items: [
          { id: "stp_t1", criterion: "ターゲットの明確度", hint: "最優先ターゲットセグメントが絞り込まれているか？/ A層を最優先、HLは外部開拓主戦力", score: 4 },
          { id: "stp_t2", criterion: "ターゲットの到達可能性", hint: "ターゲット顧客に効率よくリーチ・接触できるか？/ HL45,000+for Biz既存接点で大量リーチ可", score: 5 },
          { id: "stp_t3", criterion: "勝てる根拠", hint: "選んだターゲットで競合に対して勝てる根拠/ 販路×供給×品質の3点で差別化", score: 4 },
        ],
      },
      {
        id: "p",
        label: "P：Positioning（ポジショニング）",
        items: [
          { id: "stp_p1", criterion: "差別化軸の明確度", hint: "競合と比べて明確な差別化軸/ お試し50万→本契約月100万のスムーズな階段", score: 4 },
          { id: "stp_p2", criterion: "バリュープロポジション", hint: "顧客が一言で理解できる独自の価値提案/ 『動くAIを最短2週間で・認定済み・月単位』", score: 4 },
          { id: "stp_p3", criterion: "価格戦略の適切さ", hint: "ターゲット顧客の予算感に合った価格設定/ 月80-180万、トライアル50万で導入容易", score: 4 },
        ],
      },
    ],
  },
  {
    id: "jtbd",
    title: "ジョブ理論（JTBD）",
    emoji: "🎭",
    description: "顧客が本当に「雇いたい」ものは何か",
    weight: 1.2,
    groups: [
      {
        id: "func",
        label: "Functional Job（機能的ジョブ）",
        items: [
          { id: "j_f1", criterion: "主要タスクの特定度", hint: "顧客が達成しようとしているタスク/ AI実装・PoC構築・運用立ち上げ", score: 4 },
          { id: "j_f2", criterion: "痛みポイントの深さ", hint: "現状の解決策への不満・痛みはどれだけ深いか？/ 採用は遅い・SI高い・研修使えない・社内検討進まない", score: 5 },
          { id: "j_f3", criterion: "頻度・重要度", hint: "そのジョブは顧客にとって頻繁に・重要なタスクか？/ 経営層の最優先課題・継続的需要", score: 5 },
        ],
      },
      {
        id: "emo",
        label: "Emotional Job（感情的ジョブ）",
        items: [
          { id: "j_e1", criterion: "感情的ベネフィット", hint: "課題解決後に顧客が感じたい感情/ AI先行できる安心感・経営層から評価される自信", score: 4 },
          { id: "j_e2", criterion: "感情的不安の理解", hint: "現状の不満から来る不安・ストレス/ 取り残される恐怖・投資した予算が無駄になる懸念", score: 4 },
        ],
      },
      {
        id: "soc",
        label: "Social Job（社会的ジョブ）",
        items: [
          { id: "j_s1", criterion: "社会的評価への影響", hint: "他者からどう見られたいか/ DX先進企業・AIに本気の組織として認知されたい", score: 4 },
          { id: "j_s2", criterion: "組織内・関係者への影響", hint: "意思決定者・現場・経営層それぞれのジョブを理解しているか？/ 経営層=投資判断、現場=実装支援、情シス=連携", score: 4 },
        ],
      },
      {
        id: "fulfill",
        label: "ジョブ充足度",
        items: [
          { id: "j_fu1", criterion: "現状ソリューションの充足度", hint: "今の競合/代替手段はどれだけ充足できているか？（低いほど機会大）/ 採用・SI・研修いずれも不十分", score: 2 },
          { id: "j_fu2", criterion: "自社ソリューションの適合度", hint: "自社のソリューションはどれだけ正確に充足できるか？/ 動くAI×認定済み×月単位で適合", score: 4 },
        ],
      },
    ],
  },
];

// ====== SWOT lists ======
export type SwotLists = {
  strengths: { id: string; text: string }[];
  weaknesses: { id: string; text: string }[];
  opportunities: { id: string; text: string }[];
  threats: { id: string; text: string }[];
};

export const defaultSwotLists: SwotLists = {
  strengths: [
    { id: "s1", text: "販路：SHIFT AI for Biz 2,500社（既存接点 + 上位アクティブ50社）" },
    { id: "s2", text: "販路：DX推進ハウスリスト 45,000件（業界トップクラスの規模）" },
    { id: "s3", text: "供給：コミュニティ会員3万人（実アクティブ1.7万）" },
    { id: "s4", text: "供給：Lステップリスト10万人（拡張余地）" },
    { id: "s5", text: "品質：Lv1-5 ティアリング設計 / 認定試験 v0.0 進行中" },
    { id: "s6", text: "ブランド：シフトAIワークス（名称承認済み）" },
    { id: "s7", text: "親会社の事業基盤・ノウハウ・関係者ネットワーク" },
  ],
  weaknesses: [
    { id: "w1", text: "有料職業紹介免許 未取得（Phase 1中に取得目標）" },
    { id: "w2", text: "認定試験 v0.0 未完成（推定Lv運用が当面必要）" },
    { id: "w3", text: "正式Lv判定済み人材ゼロからスタート" },
    { id: "w4", text: "Phase 1 は 2人体制（PM+業務委託）で薄い" },
    { id: "w5", text: "プラットフォーム未開発（運用は手作業ベース）" },
    { id: "w6", text: "個人情報規程・契約書ひな形 整備中" },
  ],
  opportunities: [
    { id: "o1", text: "AI人材339万人不足（経産省）/ 需給ギャップ拡大" },
    { id: "o2", text: "法人生成AI導入率33.9%（前年から+12pt / IDC Japan）" },
    { id: "o3", text: "フリーランスAI案件 Q1で2倍に成長" },
    { id: "o4", text: "中堅企業（従業員100-1000名）が一番手付かずの層" },
    { id: "o5", text: "LLM/Agent技術の成熟期到来 / 実装フェーズへ" },
    { id: "o6", text: "47都道府県・地方創生×AI連携 機運" },
  ],
  threats: [
    { id: "t1", text: "大手エージェント（Findy/レバテック）のAI特化参入" },
    { id: "t2", text: "大企業のAI内製化・M&A（市場縮小）" },
    { id: "t3", text: "個人情報漏洩リスク（事業停止級・致命的）" },
    { id: "t4", text: "偽装請負と判定されるリスク（行政指導・訴訟）" },
    { id: "t5", text: "粗悪人材を送り込んでブランド毀損" },
    { id: "t6", text: "LLMコモディティ化による単価圧迫" },
  ],
};

// ====== TOWS Matrix ======
export type TowsMatrix = {
  so: string; // 強み×機会
  wo: string; // 弱み×機会
  st: string; // 強み×脅威
  wt: string; // 弱み×脅威
};

export const defaultTowsMatrix: TowsMatrix = {
  so: "既存販路（for Biz 2,500社・HL 45,000件）× AI需要拡大\n→ POC50万→本契約月100万のファネルで一気に占有\n→ Phase 1で月次500万到達 → Phase 2拡大フェーズへ\n→ コミュニティ供給×認定品質で他社が追随できない速度を実現",
  wo: "認定試験 v0.0 未完成 × AI需要拡大\n→ 推定Lv運用で速度優先（経歴+ミニ試験で先行アサイン）\n→ POC運用しながら認定試験を後追い完成\n→ POC終了時に正式Lv判定→本契約への動線で品質訴求",
  st: "認定済み品質 × 大手参入の脅威\n→ 『動くAI×認定済みLv』の二刀流で差別化\n→ 月単位準委任のスムーズな解約・乗換可能性で顧客に安心感\n→ for Biz接点の継続契約で乗換障壁を構築",
  wt: "免許未取得・体制薄い × 個人情報リスク・偽装請負\n→ 重役エスカレで免許取得を最優先\n→ 個人情報規程・契約書ひな形の早期整備\n→ Phase 1中に法務体制構築 → リスク同時クローズ",
};

// ====== JTBD Statements ======
export type JtbdStatement = {
  id: string;
  when: string;
  iWantTo: string;
  soI: string;
};

export const defaultJtbdStatements: JtbdStatement[] = [
  {
    id: "j1",
    when: "中堅企業がAI導入を本格検討し始めたとき",
    iWantTo: "動くAIプロトタイプを最短2週間で1業務分作り、効果を見たい",
    soI: "経営層に対してAI投資の意思決定を促し、本格導入のステップに進める",
  },
  {
    id: "j2",
    when: "AI人材を採用したいが時間もコストもかけられないとき",
    iWantTo: "月単位の準委任で、認定済みのAI人材を即稼働させたい",
    soI: "採用リスクを取らずにAI推進ができ、合えば社員化も検討できる",
  },
  {
    id: "j3",
    when: "AI人材が組織にフィットしたとき",
    iWantTo: "その人材を社員として迎え入れたい",
    soI: "中長期のAI戦略を一緒に進める内製チームを構築できる",
  },
];

// ====== 既存代替手段と不満 ======
export type AlternativeAndComplaint = {
  id: string;
  alternative: string;
  complaint: string;
};

export const defaultAlternatives: AlternativeAndComplaint[] = [
  { id: "a1", alternative: "AI研修（外部スクール・内製研修）", complaint: "知識は得られるが実務に落とし込めない" },
  { id: "a2", alternative: "AIツール導入（Copilot/ChatGPT Team等）", complaint: "ライセンス契約しても使い切れず形骸化" },
  { id: "a3", alternative: "大手SI/コンサル", complaint: "1案件数千万〜・期間が長い・成果が見えにくい" },
  { id: "a4", alternative: "社内検討（DX推進室）", complaint: "縦割り・優先順位がつかず進まない" },
  { id: "a5", alternative: "AI人材の正社員採用", complaint: "母集団形成に半年〜1年・年収1,000万超" },
  { id: "a6", alternative: "副業マッチング（Lancers等）", complaint: "実力者が見つけにくい・品質保証なし" },
];
