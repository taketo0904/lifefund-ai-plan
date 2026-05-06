// 戦略フレームワーク（建築AI経営研究会 アップセル戦略）
// PEST / 3C / Five Forces / SWOT / STP / JTBD

export type FrameworkItem = {
  id: string;
  criterion: string;
  hint: string;
  score: number;
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
  companyName: "建築AI経営研究会（株式会社LIFEFUND）",
  industry: "建築業向けAI経営コンサル・研究会・M&A仲介",
  founded: "研究会ローンチ済 / アップセル商材 2026/05〜",
  employees: "Phase 1: 3名 / Phase 3: 6名（業務委託含む）",
  revenue: "年商9,500万円目標（2027/04・Targetシナリオ）",
  contact: "白都社長",
  hearingDate: "2026-05-06",
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
  modelType: "BtoB アップセル階段モデル（研究会 → 個別コンサル → 事業変革 → M&A）",
  targetCustomer: "建築・建設業の中小〜中堅（従業員10〜500名 / 売上3〜200億）の経営者。AI経営に興味があり、後継者問題・業界再編の課題を持つ。",
  problemValue: "『AI経営をやりたいが、社員任せで失敗する』『業界再編で出口戦略が必要』に対し、CEO先行3ステップ（社長→組織→事業）+ M&A出口で一気通貫支援。研修でもコンサルでもない『建築業界唯一の経営者プログラム』。",
  launchTiming: "2026/05 Phase 1（Tier 1ローンチ）→ 2026/11 Phase 2（Tier 2/3拡大）→ 2027/05 Phase 3（M&A機能搭載）",
  initialInvestment: "Phase 1 月次230万（白都・三山・橋本3名）/ コンテンツ制作25万 / 月例会運営費15万",
  pricing: "Tier 0 月4万 / Tier 1 60万 / Tier 2 300万 / Tier 3 960万 / Tier 4 着手金100万+成功報酬5%",
  kgi: "年商9,500万（2027/04）→ M&A初成約（2027年内）→ 業界リーディングポジション確立（2028）",
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
          { id: "p1", criterion: "建築業のDX推進政策", hint: "建設DX加速化事業・i-Construction・国交省の建築業DX政策が追い風", score: 4 },
          { id: "p2", criterion: "M&A仲介の規制環境", hint: "中小M&A支援機関登録制度・事業承継M&A補助金など追い風／要登録", score: 3 },
          { id: "p3", criterion: "建築業の規制リスク", hint: "建築基準法・建設業法は安定／AI関連の新規規制は緩やか", score: 4 },
        ],
      },
      {
        id: "e",
        label: "E：経済",
        items: [
          { id: "e1", criterion: "建築AI市場の成長性", hint: "国内建築DX市場は2030年に1兆円超、AIは中核セグメント", score: 5 },
          { id: "e2", criterion: "建築業の購買力", hint: "中堅以上は売上比1-3%のDX予算化進む / 補助金活用も拡大", score: 4 },
          { id: "e3", criterion: "建築業の景気感応度", hint: "公共工事は安定／民間住宅は変動。AI投資は生産性向上として残りやすい", score: 3 },
        ],
      },
      {
        id: "s",
        label: "S：社会・文化",
        items: [
          { id: "s1", criterion: "建築業の人手不足×高齢化", hint: "技能労働者2030年30%減、若手不足／AIによる自動化ニーズ強い", score: 5 },
          { id: "s2", criterion: "建築業の後継者問題", hint: "60歳超社長の60%以上が後継者未確定／M&A仲介ニーズ拡大", score: 5 },
          { id: "s3", criterion: "建築業のAI受容性", hint: "若手・2代目社長中心に受容性上昇／中堅・年配層は慎重", score: 3 },
        ],
      },
      {
        id: "t",
        label: "T：技術",
        items: [
          { id: "t1", criterion: "建築×AI技術トレンド", hint: "BIM・図面AI・施工管理AI・積算AIなど分野が広く爆発期", score: 5 },
          { id: "t2", criterion: "技術実現可能性", hint: "ChatGPT/Claude/Zapier/専門ツールで建築業務AI化が即可能", score: 5 },
          { id: "t3", criterion: "技術陳腐化リスク", hint: "LLMは進化中だが業界実装ノウハウ・関係性は残る", score: 4 },
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
          { id: "c1", criterion: "建築業経営者の課題明確度", hint: "AI経営×人手不足×後継者問題×業界再編という4重課題は明確", score: 5 },
          { id: "c2", criterion: "市場ニーズの大きさ", hint: "建築業の中小・中堅 約30万社、AI経営に関心ある層は急拡大中", score: 5 },
          { id: "c3", criterion: "支払意欲", hint: "Tier 1の60万は社長個人の研修費で許容、Tier 2の300万は補助金活用で実質負担減", score: 4 },
          { id: "c4", criterion: "顧客接点の確立度", hint: "既存研究会30社＋月10本動画＋業界ネットワークで継続的接点あり", score: 4 },
        ],
      },
      {
        id: "competitor",
        label: "Competitor：競合",
        items: [
          { id: "co1", criterion: "建築特化×AI×経営の3軸保有競合の少なさ", hint: "汎用AIコンサル・建築DXツール会社は多いが、3軸全保有はLIFEFUNDのみ", score: 5 },
          { id: "co2", criterion: "競合の弱点把握", hint: "汎用ITコンサル＝業界知識浅い、建築DXツール＝経営視点薄い", score: 4 },
          { id: "co3", criterion: "参入障壁（建築業ネットワーク）", hint: "業界団体・既存30社の信頼関係・実装事例は模倣困難", score: 4 },
          { id: "co4", criterion: "競合情報収集度", hint: "汎用大手の動向は把握、建築特化スタートアップの動きはモニタ要", score: 3 },
        ],
      },
      {
        id: "company",
        label: "Company：自社",
        items: [
          { id: "cm1", criterion: "独自リソース", hint: "建築AI研究会の既存30社・月10本動画・白都社長の業界ネットワーク", score: 4 },
          { id: "cm2", criterion: "実行体制", hint: "Phase 1は3人体制で初動可、実装メンバーはPhase 2で拡張", score: 3 },
          { id: "cm3", criterion: "資金調達力", hint: "研究会収入で初期キャッシュ確保、Tier 2案件で先行投資回収可", score: 3 },
          { id: "cm4", criterion: "既存事業との親和性", hint: "研究会という入口商材があり、上位商材へのアップセルが自然", score: 5 },
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
          { id: "f1a", criterion: "建築特化×AI経営コンサル競合の少なさ", hint: "汎用ITコンサルは多いが建築特化AI経営は少ない", score: 4 },
          { id: "f1b", criterion: "差別化度", hint: "研究会×CEO先行3ステップ×M&A出口の組み合わせは独自", score: 5 },
          { id: "f1c", criterion: "市場成長余裕", hint: "建築×AI市場は爆発期で競合間ゼロサムにならない", score: 5 },
        ],
      },
      {
        id: "f2",
        label: "②新規参入の脅威（低いほど有利）",
        items: [
          { id: "f2a", criterion: "資本要件", hint: "AIコンサル参入は資本軽いがM&A仲介機能は要登録・要ノウハウ", score: 3 },
          { id: "f2b", criterion: "顧客慣性", hint: "研究会員30社の信頼関係・継続接触は強い参入障壁", score: 4 },
          { id: "f2c", criterion: "ブランド・実績", hint: "建築×AIの実装事例蓄積（月10本動画）が時間とともに資産化", score: 3 },
        ],
      },
      {
        id: "f3",
        label: "③代替品の脅威（低いほど有利）",
        items: [
          { id: "f3a", criterion: "代替手段の少なさ", hint: "汎用ITコンサル・社内DX室・建築DXツール単体導入と多数", score: 2 },
          { id: "f3b", criterion: "代替品の劣位", hint: "汎用ITコンサル＝建築知識不足、ツール単体＝経営視点不足", score: 4 },
        ],
      },
      {
        id: "f4",
        label: "④買い手の交渉力（低いほど有利）",
        items: [
          { id: "f4a", criterion: "顧客分散度", hint: "建築業中小・中堅で広く分散、特定大顧客依存にならない", score: 4 },
          { id: "f4b", criterion: "価格感度", hint: "成果が見えれば300万・1000万でも稟議通る業界文化", score: 3 },
          { id: "f4c", criterion: "スイッチングコスト", hint: "Tier 2/3案件は数ヶ月のlock-in、研究会は月単位で離脱可（諸刃）", score: 3 },
        ],
      },
      {
        id: "f5",
        label: "⑤売り手の交渉力（低いほど有利）",
        items: [
          { id: "f5a", criterion: "実装人材確保力", hint: "AIエンジニア争奪戦の中、業務委託プールの拡充が課題", score: 3 },
          { id: "f5b", criterion: "内製化可能性", hint: "白都・三山が直接実装可能、外注依存度を抑えられる", score: 4 },
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
          { id: "sw1", criterion: "S 強みの充実度", hint: "研究会基盤＋業界ネットワーク＋M&A視点の3軸", score: 4 },
          { id: "sw2", criterion: "W 弱みの認識度", hint: "実装人材プール・M&A仲介免許・属人化リスクを認識", score: 4 },
          { id: "sw3", criterion: "O 機会の大きさ", hint: "建築業AI需要爆発・後継者問題・業界再編波の3点同時", score: 5 },
          { id: "sw4", criterion: "T 脅威の低さ", hint: "汎用大手参入・景況感・実装人材確保が中程度脅威", score: 3 },
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
          { id: "stp_s1", criterion: "セグメント分解の精度", hint: "売上3-30億の中小／30-200億の中堅／後継者問題層／成長戦略層に分解", score: 4 },
          { id: "stp_s2", criterion: "セグメントの定量把握", hint: "建築業中小30万社・中堅2万社、研究会接触可能層は1,000社規模で把握", score: 3 },
          { id: "stp_s3", criterion: "ニーズの異質性", hint: "中小=学習軸、中堅=実装軸、後継者層=出口軸でJTBD明確に異なる", score: 4 },
        ],
      },
      {
        id: "t",
        label: "T：Targeting（ターゲット選定）",
        items: [
          { id: "stp_t1", criterion: "ターゲット明確度", hint: "Phase 1=既存30社の中堅層、Phase 2=新規中堅、Phase 3=後継者問題層", score: 5 },
          { id: "stp_t2", criterion: "到達可能性", hint: "研究会＋月10本動画＋業界団体＋パートナーで多層チャネル", score: 4 },
          { id: "stp_t3", criterion: "勝てる根拠", hint: "建築特化×AI実装×M&A出口の独自ポジで競合不在領域", score: 5 },
        ],
      },
      {
        id: "p",
        label: "P：Positioning（ポジショニング）",
        items: [
          { id: "stp_p1", criterion: "差別化軸の明確度", hint: "『建築業界唯一の AI経営者プログラム』として唯一無二", score: 5 },
          { id: "stp_p2", criterion: "バリュープロポジション", hint: "『社長→組織→事業→M&A』の縦の伴走で他社にない長期関係", score: 5 },
          { id: "stp_p3", criterion: "価格戦略の適切さ", hint: "月4万入口→60万→300万→960万→成功報酬と段階的アップセル", score: 4 },
        ],
      },
    ],
  },
  {
    id: "jtbd",
    title: "ジョブ理論（JTBD）",
    emoji: "🎭",
    description: "建築業の経営者が本当に『雇いたい』ものは何か",
    weight: 1.2,
    groups: [
      {
        id: "func",
        label: "Functional Job（機能的ジョブ）",
        items: [
          { id: "j_f1", criterion: "主要タスクの特定度", hint: "AI経営判断・社員育成・業務AI化・新規事業・出口戦略", score: 5 },
          { id: "j_f2", criterion: "痛みの深さ", hint: "社員任せで失敗・コンサル丸投げで失敗・後継者不在・業界再編", score: 5 },
          { id: "j_f3", criterion: "頻度・重要度", hint: "AI経営は経営課題TOP3・後継者問題は5年以内に必ず直面", score: 5 },
        ],
      },
      {
        id: "emo",
        label: "Emotional Job（感情的ジョブ）",
        items: [
          { id: "j_e1", criterion: "感情的ベネフィット", hint: "社長として時代に取り残されない安心感・社員から尊敬される自信", score: 4 },
          { id: "j_e2", criterion: "感情的不安", hint: "業界再編で取り残される恐怖・後継者不在の焦り・投資失敗への警戒", score: 5 },
        ],
      },
      {
        id: "soc",
        label: "Social Job（社会的ジョブ）",
        items: [
          { id: "j_s1", criterion: "社会的評価", hint: "業界内で『AI先進企業』『時代の先を行く社長』として認知されたい", score: 4 },
          { id: "j_s2", criterion: "関係者への影響", hint: "社員＝指導力ある社長／取引先＝信頼できる経営者／家族＝安定した経営", score: 4 },
        ],
      },
      {
        id: "fulfill",
        label: "ジョブ充足度",
        items: [
          { id: "j_fu1", criterion: "現状ソリューションの充足度", hint: "汎用ITコンサル・社内DX・ツール単体導入は部分解にとどまる", score: 2 },
          { id: "j_fu2", criterion: "自社ソリューションの適合度", hint: "CEO先行3ステップ＋M&A出口で全方位カバー", score: 5 },
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
    { id: "s1", text: "建築AI経営研究会の既存30社（月4万円・継続接触）" },
    { id: "s2", text: "白都社長の建築業界ネットワーク（業界団体・パートナー関係）" },
    { id: "s3", text: "月10本の建築×AI動画コンテンツ（ストック資産化）" },
    { id: "s4", text: "CEO先行3ステップ（社長→組織→事業）の独自方法論" },
    { id: "s5", text: "三山さん・橋本さんの実行力（営業・実装・コンテンツ）" },
    { id: "s6", text: "建築業界の業務知識（積算・図面・営業・施工管理）" },
    { id: "s7", text: "研究会という入口商材があり、アップセル動線が自然" },
  ],
  weaknesses: [
    { id: "w1", text: "M&A仲介免許 未取得（提携アドバイザー必要）" },
    { id: "w2", text: "Tier 2/3 案件の実装メンバーがまだ薄い（業務委託プール拡張要）" },
    { id: "w3", text: "白都社長＋三山さんへの稼働集中（属人化リスク）" },
    { id: "w4", text: "Tier 1〜4 のオファー設計が初年度（顧客検証中）" },
    { id: "w5", text: "個別案件のKPI測定・効果可視化メソッド整備中" },
    { id: "w6", text: "実装事例の蓄積がこれから（月10本動画でストック中）" },
  ],
  opportunities: [
    { id: "o1", text: "建築業の人手不足×高齢化（2030年技能労働者30%減）" },
    { id: "o2", text: "建築業の後継者問題（60歳超社長の60%超が後継者未確定）" },
    { id: "o3", text: "中小M&A件数 5年で2倍（業界再編加速）" },
    { id: "o4", text: "国交省の建設DX加速化事業・i-Construction" },
    { id: "o5", text: "事業承継M&A補助金・IT導入補助金など各種支援" },
    { id: "o6", text: "BIM・図面AI・積算AI等の建築特化AIツール成熟期" },
  ],
  threats: [
    { id: "t1", text: "汎用ITコンサル大手の建築特化参入" },
    { id: "t2", text: "建築DXツール会社の経営コンサル領域進出" },
    { id: "t3", text: "建築業の景況感悪化でAI投資後ろ倒し" },
    { id: "t4", text: "実装メンバー（AIエンジニア）の採用競争激化" },
    { id: "t5", text: "M&A仲介の競合（大手仲介会社・銀行系）" },
    { id: "t6", text: "AI技術コモディティ化による単価圧迫" },
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
  so: "研究会30社 × 建築業AI需要爆発・後継者問題\n→ Tier 1〜4の段階的アップセルで各社年間60〜960万を見込む\n→ M&A出口を併設して長期関係（5年LTV数千万）を構築\n→ 建築×AI経営の唯一無二ポジションを業界に定着させる",
  wo: "M&A仲介免許未取得 × 建築業の業界再編波\n→ Phase 2前半で提携アドバイザー契約締結（金融機関OB等）\n→ Phase 3でTier 4 ローンチ間に合わせる\n→ Tier 3 顧客で M&A 検討企業を1社以上見つけてプロト案件化",
  st: "建築特化の業界知識・関係性 × 汎用大手参入の脅威\n→ 月10本動画で建築AI事例を継続発信、実装事例100本超を蓄積\n→ 業界団体・パートナーとの独占的協業契約で参入抑止\n→ 既存30社の信頼関係を強化し継続契約・紹介を最大化",
  wt: "属人化×景況感悪化\n→ コーチング・コンサル品質を平準化（テンプレ・録画・マニュアル）\n→ 実装メンバー業務委託プール5名以上を Phase 1中に構築\n→ 補助金活用パッケージで実質負担を減らし景況感影響を軽減",
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
    when: "建築業の社長としてAI経営の必要性を感じ始めたとき",
    iWantTo: "他人任せで失敗せず、自分自身がAIを使いこなして経営判断を下せるようになりたい",
    soI: "業界再編の波で取り残されず、社員と取引先から尊敬される経営者でいられる",
  },
  {
    id: "j2",
    when: "AI経営の方針が見えた次の段階で社員に伝播させたいとき",
    iWantTo: "建築業界の業務（積算・図面・営業・施工管理）に詳しい実装伴走者と組んで、業務AI化と社員育成を一気に進めたい",
    soI: "属人化していた業務を仕組み化し、人手不足下でも生産性を上げ続けられる",
  },
  {
    id: "j3",
    when: "60歳を超えて後継者問題が現実化したとき",
    iWantTo: "AI実装で企業価値を高めた状態で、信頼できる仲介者と共に売却 or 買収の選択肢を検討したい",
    soI: "従業員と取引先を守りながら、自分の出口戦略を実現できる",
  },
];

// ====== 既存代替手段と不満 ======
export type AlternativeAndComplaint = {
  id: string;
  alternative: string;
  complaint: string;
};

export const defaultAlternatives: AlternativeAndComplaint[] = [
  { id: "a1", alternative: "汎用ITコンサル・大手SI", complaint: "建築業の現場知識が浅く、提案が抽象的・実装が現場に合わない" },
  { id: "a2", alternative: "建築DXツール単体導入（BIM・図面AI等）", complaint: "ツールは入れたが組織が変わらず、宝の持ち腐れになる" },
  { id: "a3", alternative: "社内DX室・若手任せ", complaint: "社長がコミットせず縦割りで進まない・経営判断につながらない" },
  { id: "a4", alternative: "業界団体のAI勉強会", complaint: "情報提供止まりで実装に落ちない／個社課題に応えてくれない" },
  { id: "a5", alternative: "大手M&A仲介会社", complaint: "売り急ぎ感あり・PMI（買収後）まで伴走してくれない・AI価値評価できない" },
  { id: "a6", alternative: "顧問税理士・銀行への相談", complaint: "M&A以外の戦略選択肢を出せない・AIによる企業価値向上の発想がない" },
];
