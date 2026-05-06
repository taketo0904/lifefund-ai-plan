"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw, GripVertical } from "lucide-react";

type Milestone = {
  id: string;
  text: string;
  done: boolean;
};

type RoadmapPhase = {
  id: string;
  num: number;
  name: string;
  period: string;
  trigger: string;
  focus: string;
  monthlyTarget: string;
  achievementCriteria: string;
  milestones: Milestone[];
  color: string;
};

const STORAGE_KEY = "shift-ai-roadmap-v1";

const COLORS = ["#E05B03", "#c026d3", "#7e22ce", "#0891b2", "#0d9488", "#16a34a"];

const DEFAULT_PHASES: RoadmapPhase[] = [
  {
    id: "p1",
    num: 1,
    name: "Phase 1: 立ち上げ",
    period: "2026/05 - 2026/07",
    trigger: "事業開始時",
    focus: "クリエイティブ・仮説検証・初回受注",
    monthlyTarget: "月次粗利 〜500万",
    achievementCriteria: "POC 1-2件受注 / 初回稼働開始 / 個人情報規程整備完了",
    milestones: [
      { id: "m1-1", text: "HL用コールドメール A/B 完成", done: false },
      { id: "m1-2", text: "5仮説検証完了", done: false },
      { id: "m1-3", text: "個人情報規程・契約書ひな形 v1", done: false },
      { id: "m1-4", text: "初回受注 2-3件 / 6月稼働開始", done: false },
    ],
    color: "#E05B03",
  },
  {
    id: "p2",
    num: 2,
    name: "Phase 2: 拡大",
    period: "2026/08 - 2026/12",
    trigger: "月次売上 500万 達成後",
    focus: "免許取得・紹介事業スタート・スケール",
    monthlyTarget: "月次粗利 1,000万 → 2,500万",
    achievementCriteria: "有料職業紹介免許取得 / 月次売上2,500万到達",
    milestones: [
      { id: "m2-1", text: "有料職業紹介免許 取得", done: false },
      { id: "m2-2", text: "紹介事業 スタート", done: false },
      { id: "m2-3", text: "for Biz クロスセル開始", done: false },
      { id: "m2-4", text: "月次粗利 1,000万 → 2,500万", done: false },
    ],
    color: "#c026d3",
  },
  {
    id: "p3",
    num: 3,
    name: "Phase 3: 拡張",
    period: "2027/01 - 2027/04",
    trigger: "月次売上 2,500万 達成後",
    focus: "規模拡大・47都道府県連携・派遣検討",
    monthlyTarget: "月次粗利 3,000万",
    achievementCriteria: "年商3億達成 / Phase 4 計画策定",
    milestones: [
      { id: "m3-1", text: "年商 3億達成", done: false },
      { id: "m3-2", text: "47都道府県 企画連携", done: false },
      { id: "m3-3", text: "派遣事業 意思決定", done: false },
      { id: "m3-4", text: "Phase 4 ロードマップ策定", done: false },
    ],
    color: "#7e22ce",
  },
];

export default function RoadmapPage() {
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhases(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    setPhases([...DEFAULT_PHASES]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(phases));
      } catch {}
    }
  }, [phases, loaded]);

  const updatePhase = (id: string, patch: Partial<RoadmapPhase>) => {
    setPhases((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };
  const updateMilestone = (phaseId: string, msId: string, patch: Partial<Milestone>) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.id === phaseId
          ? { ...p, milestones: p.milestones.map((m) => (m.id === msId ? { ...m, ...patch } : m)) }
          : p,
      ),
    );
  };
  const addMilestone = (phaseId: string) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.id === phaseId
          ? {
              ...p,
              milestones: [...p.milestones, { id: `ms${Date.now()}`, text: "新しいマイルストーン", done: false }],
            }
          : p,
      ),
    );
  };
  const deleteMilestone = (phaseId: string, msId: string) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.id === phaseId ? { ...p, milestones: p.milestones.filter((m) => m.id !== msId) } : p,
      ),
    );
  };
  const addPhase = () => {
    const num = phases.length + 1;
    const color = COLORS[(num - 1) % COLORS.length];
    setPhases((prev) => [
      ...prev,
      {
        id: `p${Date.now()}`,
        num,
        name: `Phase ${num}: 新フェーズ`,
        period: "YYYY/MM - YYYY/MM",
        trigger: "（達成条件を入力）",
        focus: "（フォーカスを入力）",
        monthlyTarget: "（月次目標を入力）",
        achievementCriteria: "（達成条件を入力）",
        milestones: [],
        color,
      },
    ]);
  };
  const deletePhase = (id: string) => {
    if (confirm("このフェーズを削除しますか？")) {
      setPhases((prev) => prev.filter((p) => p.id !== id));
    }
  };
  const resetAll = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setPhases([...DEFAULT_PHASES]);
    }
  };

  if (!loaded) {
    return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;
  }

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📅 ロードマップ</h1>
          <p className="text-slate-500 mt-1 text-sm">
            四半期単位の戦略目線 / 各フェーズの主要マイルストーンを管理
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ※ クリックで編集 / マイルストーンは追加・削除・チェック可 / 編集はブラウザに自動保存
          </p>
        </div>
        <button
          onClick={resetAll}
          className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600"
        >
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      {/* Phase Cards */}
      <div className={`grid gap-4 ${phases.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {phases.map((p) => (
          <div
            key={p.id}
            className="card border-t-4 relative"
            style={{ borderTopColor: p.color }}
          >
            <div className="absolute top-3 right-3">
              <button
                onClick={() => deletePhase(p.id)}
                className="text-slate-300 hover:text-rose-500"
                title="フェーズ削除"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <EditableText
              value={p.name}
              onChange={(v) => updatePhase(p.id, { name: v })}
              className="text-xs font-bold tracking-widest block"
              style={{ color: p.color }}
            />
            <EditableText
              value={p.period}
              onChange={(v) => updatePhase(p.id, { period: v })}
              className="text-xs text-slate-500 mt-2 block"
            />

            <div className="mt-3 space-y-2">
              <FieldRow label="達成条件（トリガー）">
                <EditableText
                  value={p.trigger}
                  onChange={(v) => updatePhase(p.id, { trigger: v })}
                  className="text-xs text-slate-700"
                  multiline
                />
              </FieldRow>
              <FieldRow label="フォーカス">
                <EditableText
                  value={p.focus}
                  onChange={(v) => updatePhase(p.id, { focus: v })}
                  className="text-xs text-slate-700 italic"
                  multiline
                />
              </FieldRow>
              <FieldRow label="月次目標">
                <EditableText
                  value={p.monthlyTarget}
                  onChange={(v) => updatePhase(p.id, { monthlyTarget: v })}
                  className="text-xs font-bold"
                  style={{ color: p.color }}
                  multiline
                />
              </FieldRow>
              <FieldRow label="達成基準">
                <EditableText
                  value={p.achievementCriteria}
                  onChange={(v) => updatePhase(p.id, { achievementCriteria: v })}
                  className="text-xs text-slate-700"
                  multiline
                />
              </FieldRow>
            </div>

            {/* Milestones */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="text-[11px] font-bold text-slate-700 mb-2 tracking-wide">
                主要マイルストーン
              </div>
              <ul className="space-y-1">
                {p.milestones.map((m) => (
                  <li key={m.id} className="flex items-start gap-2 group">
                    <input
                      type="checkbox"
                      checked={m.done}
                      onChange={(e) => updateMilestone(p.id, m.id, { done: e.target.checked })}
                      className="mt-1 accent-orange-600 cursor-pointer"
                    />
                    <EditableText
                      value={m.text}
                      onChange={(v) => updateMilestone(p.id, m.id, { text: v })}
                      className={`text-xs flex-1 ${m.done ? "text-slate-400 line-through" : "text-slate-700"}`}
                      multiline
                    />
                    <button
                      onClick={() => deleteMilestone(p.id, m.id)}
                      className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="削除"
                    >
                      <Trash2 size={12} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addMilestone(p.id)}
                className="mt-2 text-xs text-slate-500 hover:text-orange-700 flex items-center gap-1"
              >
                <Plus size={12} /> マイルストーン追加
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add phase */}
      <div className="text-center">
        <button
          onClick={addPhase}
          className="text-sm px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center gap-2 mx-auto"
        >
          <Plus size={14} /> フェーズを追加
        </button>
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-0.5">{label}</div>
      {children}
    </div>
  );
}

function EditableText({
  value,
  onChange,
  placeholder,
  className,
  style,
  multiline,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const commit = () => {
    if (draft !== value) onChange(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) commit();
            if (e.key === "Escape") cancel();
          }}
          rows={2}
          style={style}
          className={`w-full px-1.5 py-0.5 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white resize-y ${className ?? ""}`}
        />
      );
    }
    return (
      <input
        autoFocus
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
        }}
        style={style}
        className={`w-full px-1.5 py-0.5 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white ${className ?? ""}`}
      />
    );
  }

  const isEmpty = value.length === 0;
  return (
    <span
      onClick={() => setEditing(true)}
      style={style}
      className={`cursor-text px-1.5 py-0.5 rounded hover:bg-slate-100 inline-block ${className ?? ""} ${isEmpty ? "text-slate-300 italic" : ""}`}
      title="クリックで編集"
    >
      {isEmpty ? placeholder ?? "（クリックで入力）" : value}
    </span>
  );
}
