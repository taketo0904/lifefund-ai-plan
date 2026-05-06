export type ChecklistItem = {
  id: string;
  label: string;
  description?: string;
  category: "supply" | "demand" | "legal" | "ops" | "marketing";
  done: boolean;
};

// §11.3 Phase 1 GoLiveチェックリスト（8項目）
export const goLiveChecklist: ChecklistItem[] = [
  {
    id: "gl1",
    label: "コミュニティ稼働可能人材 10名以上確認済み",
    description: "※スプリント用に30→10名に緩和（初回売上優先）",
    category: "supply",
    done: false,
  },
  {
    id: "gl2",
    label: "法人ヒアリング10社以上・準委任ニーズ3社確定",
    description: "for Biz上位顧客から抽出",
    category: "demand",
    done: false,
  },
  {
    id: "gl3",
    label: "準委任契約書ひな形 v1 法務承認済み",
    description: "中原氏→上田氏→ホーム法務",
    category: "legal",
    done: false,
  },
  {
    id: "gl4",
    label: "紹介契約書ひな形 v1 法務承認済み",
    description: "免許取得済み→即実務投入可能",
    category: "legal",
    done: false,
  },
  {
    id: "gl5",
    label: "個人情報取扱いフロー・監査体制明文化",
    description: "72h削除SLA、四半期監査、参謀室要件反映",
    category: "legal",
    done: false,
  },
  {
    id: "gl6",
    label: "既存サイトのLPが公開可能状態",
    description: "企業向け＋候補者向け（サブドメインor別ページ）",
    category: "marketing",
    done: false,
  },
  {
    id: "gl7",
    label: "CS対応スクリプト用意済み（北氏）",
    description: "初期問い合わせ・トラブル対応手順",
    category: "ops",
    done: false,
  },
  {
    id: "gl8",
    label: "請求・契約SaaS連携（クラウドサイン＋freee）",
    description: "初回請求書発行までに完備",
    category: "ops",
    done: false,
  },
];
