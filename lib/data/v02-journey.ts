// アップセルカスタマージャーニー（建築AI経営研究会）
export type JourneyStage = {
  id: string;
  tier: string; // "Pre" | "Tier 0" | "Tier 1" | ...
  stageName: string; // 認知 / 入会 / 上位検討 / 契約 / 拡大 / 出口
  customerState: string; // 顧客の状態
  customerEmotion: string; // 心理・感情
  trigger: string; // 何がきっかけで動くか
  ourActions: string[]; // 我々のアクション
  touchpoints: string[]; // 接点
  nextCondition: string; // 次のステージへの遷移条件
  conversionTarget: string; // 数値目標（例：30%）
  blockers: string[]; // 詰まりポイント・離脱要因
};

export const journeyStages: JourneyStage[] = [
  // ───── Pre: 認知 ─────
  {
    id: "awareness",
    tier: "Pre",
    stageName: "1. 認知（Awareness）",
    customerState: "建築業の経営者として、AIが気になり始めた段階。同業他社のAI事例を断片的に見聞きしている。",
    customerEmotion: "「うちでも何かやらないとマズいかも」「でも何から手を付けるか分からない」「AIは難しそう」",
    trigger: "同業他社のAI導入ニュース / 業界紙でのAI特集 / 取引先からのAI質問 / 後継者からのDX要望",
    ourActions: [
      "月10本動画コンテンツの配信（建築×AI事例）",
      "白都社長のSNS発信・業界誌寄稿",
      "業界団体での講演・パートナー経由での紹介",
      "オープンセミナー（年4-6回・無料 or 5,000円）",
    ],
    touchpoints: ["YouTube/Vimeo", "LinkedIn・X", "業界紙・建設通信新聞", "工務店経営者向けFB", "オープンセミナー"],
    nextCondition: "オープンセミナー参加 or 個別相談予約 or 研究会の資料請求",
    conversionTarget: "認知→個別相談：5%",
    blockers: ["『AIは大企業のもの』という思い込み", "コンテンツが届かない情報接点の少なさ"],
  },
  // ───── Tier 0: 研究会入会 ─────
  {
    id: "join-kenkyukai",
    tier: "Tier 0",
    stageName: "2. 研究会入会（月4万円）",
    customerState: "AI経営研究会の存在を知り、月例会に体験参加。コミュニティの雰囲気と内容に納得して入会。",
    customerEmotion: "「これなら学べそう」「他社の社長と話せるのが安心」「月4万円なら試せる」",
    trigger: "オープンセミナーでの体験 / 知人会員からの紹介 / 月例会の体験参加",
    ourActions: [
      "個別相談（30-60分）で目的・状況ヒアリング",
      "月例会への体験参加（1回無料 or 半額）",
      "入会手続き＋初回オリエンテーション",
      "Slackコミュニティへの招待＋過去アーカイブ案内",
    ],
    touchpoints: ["個別相談Zoom", "月例会会場 or オンライン", "Slack", "オリエン資料（PDF）"],
    nextCondition: "入会後3ヶ月の継続率＋Tier 1検討の意思表示",
    conversionTarget: "個別相談→入会：40% / 入会後3ヶ月継続率：85%",
    blockers: ["月例会の内容が抽象的すぎる印象", "コミュニティに馴染めない孤立", "予算稟議の遅れ"],
  },
  // ───── Tier 0 → Tier 1 ─────
  {
    id: "consider-tier1",
    tier: "Tier 0 → 1",
    stageName: "3. Tier 1（経営者AI武装）検討",
    customerState: "研究会で3-6ヶ月学んだ社長が『そろそろ自分が動きたい』『でも社員に任せる前に自分が分かりたい』フェーズに入る",
    customerEmotion: "「学ぶだけでなく実装したい」「他人任せで失敗したくない」「個別に伴走してほしい」",
    trigger: "月例会で他社の実装事例を見て焦りを感じた / 経営判断でAI使ってみたが上手くいかなかった / 後継者からの要請",
    ourActions: [
      "月例会終了後の個別声かけ（白都社長 or 三山さん）",
      "Tier 1 商材説明資料の送付（社長の課題に合わせてカスタマイズ）",
      "30分の無料コンサル（現状診断）",
      "ローンチオファー（初年度限定価格 or 研究会員割引）",
    ],
    touchpoints: ["月例会後の懇親会", "個別Zoom", "メール", "LINE/Slack DM"],
    nextCondition: "3ヶ月60万円の契約締結",
    conversionTarget: "研究会員→Tier 1：20-30%（30社中6-9社）",
    blockers: ["月20万円の予算稟議で躓く", "効果が見えづらい不安", "本業の繁忙期と重なる"],
  },
  // ───── Tier 1 → Tier 2 ─────
  {
    id: "consider-tier2",
    tier: "Tier 1 → 2",
    stageName: "4. Tier 2（建築AI実装）検討",
    customerState: "Tier 1で社長自身がAI使いこなせるようになり、『次は社員にも使わせたい』『業務をAI化したい』と動き始める",
    customerEmotion: "「自分はOK、次は組織」「業務効率化の具体策が欲しい」「社員に教える自信がない」",
    trigger: "Tier 1の3ヶ月レビューで次フェーズの提案を受けた / 経営会議でDX化を決議 / 補助金活用の機会",
    ourActions: [
      "Tier 1終盤に Tier 2 提案書を作成（自社の業務棚卸し付き）",
      "工事部・営業部の役員にも商談に同席依頼（決裁関係者の巻き込み）",
      "300万円の補助金活用案を提示（IT導入補助金等）",
      "3社の事例見学会・成功事例共有",
    ],
    touchpoints: ["Tier 1レビュー会", "経営会議資料", "補助金申請書（共同作成）", "事例見学会"],
    nextCondition: "6ヶ月300万円の契約締結 or 補助金活用での着手",
    conversionTarget: "Tier 1完了→Tier 2：40-50%",
    blockers: ["社内の現場抵抗（『AIは現場を分かっていない』）", "業務棚卸しが進まない", "実装人材アサインの遅れ"],
  },
  // ───── Tier 2 → Tier 3 ─────
  {
    id: "consider-tier3",
    tier: "Tier 2 → 3",
    stageName: "5. Tier 3（事業変革コンサル）検討",
    customerState: "Tier 2で業務効率化の成果が出始め、『次は事業モデルを変える』『新規事業を生む』『中期計画をAI前提で書き直す』フェーズへ",
    customerEmotion: "「効率化の次の手が必要」「業界再編を勝ち抜きたい」「次世代の収益源が欲しい」",
    trigger: "Tier 2成果報告で経営層に手応えあり / 業界再編・M&Aニュースで危機感 / 後継者からの新規事業提案",
    ourActions: [
      "Tier 2終盤で経営層向け『次の3年』戦略ワークショップ開催",
      "Tier 3提案書（中期経営計画AI再設計プラン）",
      "他のTier 3クライアント（先行事例）の社長との面談セット",
      "年契約割引・分割支払いオプション提示",
    ],
    touchpoints: ["経営戦略ワークショップ", "役員会同席", "先行事例社長との会食", "提案書"],
    nextCondition: "12ヶ月960万円（または分割）の契約締結",
    conversionTarget: "Tier 2完了→Tier 3：20-30%",
    blockers: ["年1000万円の予算決裁プロセス", "現業忙しく事業変革に手が回らない", "経営企画機能の不在"],
  },
  // ───── Tier 3 → Tier 4 ─────
  {
    id: "consider-tier4",
    tier: "Tier 3 → 4",
    stageName: "6. Tier 4（M&A仲介・PMI）検討",
    customerState: "事業変革で企業価値が上がり始めた / 後継者問題が顕在化した / 業界再編の波で売買どちらかの選択を迫られる",
    customerEmotion: "「会社の出口を考え始めた」「子供に継がせるか売るか迷い」「買収して規模拡大したい」",
    trigger: "Tier 3伴走中の経営課題で後継者問題が浮上 / 同業からの買収打診 / 健康・年齢の問題",
    ourActions: [
      "Tier 3レビュー時に M&A 戦略の選択肢提示（売り手・買い手・現状維持の3シナリオ）",
      "企業価値評価レポート作成（AI活用で評価額がどう変わるか）",
      "守秘義務契約締結→候補企業のソーシング開始",
      "PMI（買収後統合）のAI活用プラン提示で他社との差別化",
    ],
    touchpoints: ["経営者個別面談（社長＋家族）", "顧問税理士・銀行との連携", "候補企業との初回面談"],
    nextCondition: "着手金100万円契約 → 案件成約（成功報酬5%）",
    conversionTarget: "Tier 3クライアント中、年1社のM&A成約（初年度目標）",
    blockers: ["心理的ハードル（売却＝失敗の感覚）", "M&A仲介免許 or 提携アドバイザー体制", "DD期間の長さ・案件流れ"],
  },
];

// 全体の遷移率サマリー
export const journeyConversionSummary = {
  awarenessToRelation: 5, // 認知→個別相談
  relationToTier0: 40, // 個別相談→研究会入会
  tier0ToTier1: 25, // 研究会員→Tier 1
  tier1ToTier2: 45, // Tier 1完了→Tier 2
  tier2ToTier3: 25, // Tier 2完了→Tier 3
  tier3ToTier4: 10, // Tier 3完了→Tier 4 M&A
};
