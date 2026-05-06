export type Chapter = {
  id: string;
  num: string;
  title: string;
  summary: string;
  content: string;
};

export const strategyMeta = {
  title: "SHIFT AI 人材事業 戦略案",
  version: "v0.2 (免許取得反映・2ヶ月スプリント版)",
  date: "2026-04-25",
  target: "水曜提出用たたき台 / 5月共有成果物",
  coreStrategy:
    "SHIFT AIコミュニティの『使えるAI人材』を、SHIFT AI for Bizで開いた2,500社の販路に流し込む。取得済み職業紹介免許を活用し、準委任＋紹介の両輪で2ヶ月以内に初回売上を確定させる。",
  threeAdvantages: [
    {
      title: "販路の独自性",
      detail: "法人2,500社の既存接点（営業ゼロから始めない）",
    },
    {
      title: "供給の独自性",
      detail: "コミュニティ20,000人＋ラベリング（沖田氏案件）",
    },
    {
      title: "品質の独自性",
      detail: "AI面談による基礎スキルの可視化（個別面接の運用負荷を最適化）",
    },
  ],
};

export const marketData = {
  demandSide: [
    {
      indicator: "AI・ロボット利活用人材の不足見通し（2040年）",
      value: "約339万人不足（需要782万人 vs 供給443万人）",
      source: "経産省 AI人材需給ギャップマップ2026",
    },
    {
      indicator: "AI関連フリーランス案件数の伸び（Q1比）",
      value: "2025 Q1 88件 → 2026 Q1 184件（約2倍）",
      source: "AI Japan Index 2026",
    },
    {
      indicator: "国内AI市場規模（2027年見通し）",
      value: "約1.1兆円",
      source: "SHIFT AI会社資料",
    },
    {
      indicator: "法人の生成AI導入率",
      value: "33.9%（上昇中）",
      source: "AI Japan Index",
    },
  ],
  marketRates: [
    {
      category: "人材紹介 手数料率（一般職）",
      rate: "30〜35%",
      note: "平均35%前後",
    },
    {
      category: "人材紹介 手数料率（IT・専門・幹部）",
      rate: "40〜50%",
      note: "エンジニアは希少性で40%超",
    },
    {
      category: "AIエンジニア フリーランス 月額単価（2026最新）",
      rate: "90.6万円",
      note: "市場平均・Findy 2026調査",
    },
    {
      category: "AIコンサル 時給（実装支援）",
      rate: "5,000〜10,000円",
      note: "AIdrops",
    },
    {
      category: "AIコンサル 時給（PoC・戦略）",
      rate: "10,000〜20,000円",
      note: "高単価帯",
    },
    {
      category: "SES会社 マージン率相場",
      rate: "30〜40%",
      note: "エージェントは10-20%が多い",
    },
  ],
};

export const targetSegments = {
  enterprise: [
    {
      tier: "A層（最優先）",
      description: "SHIFT AI for Biz 2,500社のうち、研修受講の上位アクティブ層",
      need: "AI実装で成果を出したい",
      offering: "準委任（PoC・伴走支援）",
    },
    {
      tier: "B層（次優先）",
      description: "法人研修の問い合わせ顧客（AI推進意思はあるが社内人材ゼロ）",
      need: "社内AI人材がほしい",
      offering: "準委任 + 紹介",
    },
    {
      tier: "C層（保留）",
      description: "一般公開のリード（SEO・広告）",
      need: "ブランド認知フェーズ",
      offering: "Phase 2以降",
    },
  ],
  talent: [
    { pool: "コミュニティ・アクティブ層", scale: "数百〜数千名", channel: "既存コミュニティ内告知" },
    { pool: "コミュニティ講師層", scale: "100名超", channel: "個別打診" },
    { pool: "野良AIコンサル", scale: "市場全体で数千〜数万名", channel: "SNS発掘" },
    { pool: "転職市場のAI実務者", scale: "不足339万人の一部", channel: "紹介事業" },
  ],
};

// やらないことの宣言
export const dontDoList = [
  { item: "当初から派遣免許取得", reason: "コスト負担大・回収遠い。Phase 3に押し出す" },
  { item: "全業界フラット展開", reason: "for Biz 2,500社のうちAI導入意欲の高い業界へ集中" },
  { item: "自前ATS開発", reason: "既存SaaS（HERP, HRMOS, Notion）で代替、独自開発は当面禁止" },
  { item: "1to1カウンセリング営業", reason: "コミュニティ＋AI面談で標準化、1to1は売上直結時のみ" },
  { item: "人手マッチング精度チューニング", reason: "ラベリング＋AI面談スコアで自動化" },
];

// 競合比較
export type Competitor = {
  name: string;
  operator: string;
  model: string;
  rate: string;
  strength: string;
  diff: string;
};

export const competitors: Competitor[] = [
  {
    name: "レバテックフリーランス",
    operator: "レバレジーズ",
    model: "フリーランスエージェント",
    rate: "月額117万（コンサル平均）",
    strength: "案件数最大級・1,500件超のコンサル案件",
    diff: "汎用IT中心、AI特化ではない",
  },
  {
    name: "ITプロパートナーズ",
    operator: "Hajimari",
    model: "直契約特化、週2〜稼働可",
    rate: "高単価レンジ",
    strength: "副業・少時間対応、登録企業2,000社",
    diff: "コミュニティ資産なし、教育セット販売不可",
  },
  {
    name: "Workship",
    operator: "GIG",
    model: "副業マッチング（マージン10〜20%）",
    rate: "中価格帯",
    strength: "登録44,000人、お祝い金制度",
    diff: "エンタメ・幅広職種、AIに尖らせていない",
  },
  {
    name: "コンサルフリー",
    operator: "コンサルフリー",
    model: "AI特化フリーランス紹介",
    rate: "高単価",
    strength: "生成AI特化を打ち出し",
    diff: "後発、コミュニティ規模が小さい",
  },
];
