"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, RotateCcw, List, Grid3x3 } from "lucide-react";

type RiskStatus = "todo" | "doing" | "done" | "monitoring";
type RiskCategory = "legal" | "tech" | "sales" | "talent" | "ops" | "other";

type Risk = {
  id: string;
  title: string;
  detail: string;
  category: RiskCategory;
  impact: 1 | 2 | 3 | 4 | 5;
  probability: 1 | 2 | 3 | 4 | 5;
  mitigation: string;
  status: RiskStatus;
  owner: string;
};

const STORAGE_KEY = "shift-ai-risks-v1";

const STATUSES: { value: RiskStatus; label: string; bg: string; text: string }[] = [
  { value: "todo", label: "未着手", bg: "bg-slate-100", text: "text-slate-700" },
  { value: "doing", label: "対応中", bg: "bg-sky-100", text: "text-sky-700" },
  { value: "done", label: "対応済み", bg: "bg-emerald-100", text: "text-emerald-700" },
  { value: "monitoring", label: "モニタリング", bg: "bg-amber-100", text: "text-amber-700" },
];

const CATEGORIES: { value: RiskCategory; label: string; bg: string; text: string }[] = [
  { value: "legal", label: "法務", bg: "bg-purple-100", text: "text-purple-700" },
  { value: "tech", label: "技術", bg: "bg-sky-100", text: "text-sky-700" },
  { value: "sales", label: "営業", bg: "bg-emerald-100", text: "text-emerald-700" },
  { value: "talent", label: "人材", bg: "bg-orange-100", text: "text-orange-700" },
  { value: "ops", label: "運用", bg: "bg-amber-100", text: "text-amber-700" },
  { value: "other", label: "その他", bg: "bg-slate-100", text: "text-slate-700" },
];

const SCORES = [1, 2, 3, 4, 5] as const;

const DEFAULT_RISKS: Risk[] = [
  {
    id: "r1",
    title: "免許取得の遅延",
    detail: "有料職業紹介免許の取得が想定より遅延し、紹介事業がスタートできない",
    category: "legal",
    impact: 5,
    probability: 4,
    mitigation: "Phase 1中に重役エスカレーション / 事前準備を完璧に / 申請を最速で",
    status: "doing",
    owner: "",
  },
  {
    id: "r2",
    title: "個人情報漏洩",
    detail: "候補者の個人情報が漏洩し、事業停止級のレピュテーション被害",
    category: "legal",
    impact: 5,
    probability: 2,
    mitigation: "個人情報規程整備 / アクセス管理 / 監査ログ / 暗号化",
    status: "doing",
    owner: "",
  },
  {
    id: "r3",
    title: "偽装請負と判定されるリスク",
    detail: "準委任契約で実態が派遣に近いと判断され、行政指導や訴訟",
    category: "legal",
    impact: 4,
    probability: 2,
    mitigation: "契約書ひな形整備 / 指揮命令系統の明確化 / 教育徹底",
    status: "todo",
    owner: "",
  },
  {
    id: "r4",
    title: "使える人材の実数不足",
    detail: "コミュニティから期待数の人材が出てこない、または実力不足で稼働困難",
    category: "talent",
    impact: 4,
    probability: 3,
    mitigation: "Lステップ10万人へ拡大 / 外部スカウト / ミニ試験で早期判定",
    status: "doing",
    owner: "",
  },
  {
    id: "r5",
    title: "レピュテーションリスク",
    detail: "粗悪な人材を送り込んで顧客満足度が下がり、ブランド毀損",
    category: "talent",
    impact: 4,
    probability: 2,
    mitigation: "認定試験の精度向上 / POC期間で見極め / 早期チェンジ運用",
    status: "todo",
    owner: "",
  },
];

const RISK_LEVEL_COLOR = (score: number): string => {
  if (score >= 16) return "#dc2626";
  if (score >= 10) return "#f97316";
  if (score >= 5) return "#eab308";
  return "#10b981";
};

type ViewMode = "list" | "matrix";

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<ViewMode>("list");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRisks(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    setRisks([...DEFAULT_RISKS]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(risks));
      } catch {}
    }
  }, [risks, loaded]);

  const updateRisk = (id: string, patch: Partial<Risk>) => {
    setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };
  const deleteRisk = (id: string) => {
    if (confirm("このリスクを削除しますか？")) setRisks((prev) => prev.filter((r) => r.id !== id));
  };
  const addRisk = () => {
    setRisks((prev) => [
      ...prev,
      {
        id: `risk${Date.now()}`,
        title: "新しいリスク",
        detail: "",
        category: "other",
        impact: 3,
        probability: 3,
        mitigation: "",
        status: "todo",
        owner: "",
      },
    ]);
  };
  const resetAll = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setRisks([...DEFAULT_RISKS]);
    }
  };

  const sortedRisks = useMemo(() => {
    return [...risks].sort((a, b) => b.impact * b.probability - a.impact * a.probability);
  }, [risks]);

  const stats = useMemo(() => {
    const total = risks.length;
    const high = risks.filter((r) => r.impact * r.probability >= 16).length;
    const inProgress = risks.filter((r) => r.status === "doing").length;
    const done = risks.filter((r) => r.status === "done").length;
    return { total, high, inProgress, done };
  }, [risks]);

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">⚠️ リスク管理</h1>
          <p className="text-slate-500 mt-1 text-sm">
            自由追加削除 / 影響度×発生確率マトリクス / 対策の進捗追跡
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ※ 影響度・発生確率は1-5、リスクスコア（赤色閾値16+）でソート / 編集はブラウザに自動保存
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-slate-300 rounded overflow-hidden">
            <ViewBtn active={view === "list"} onClick={() => setView("list")} icon={<List size={12} />} label="リスト" />
            <ViewBtn active={view === "matrix"} onClick={() => setView("matrix")} icon={<Grid3x3 size={12} />} label="マトリクス" />
          </div>
          <button onClick={resetAll} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
            <RotateCcw size={12} /> リセット
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="リスク総数" value={stats.total} bg="bg-slate-50" color="text-slate-900" />
        <StatCard label="高リスク（16+）" value={stats.high} bg="bg-rose-50" color="text-rose-700" />
        <StatCard label="対応中" value={stats.inProgress} bg="bg-sky-50" color="text-sky-700" />
        <StatCard label="対応済み" value={stats.done} bg="bg-emerald-50" color="text-emerald-700" />
      </div>

      {view === "list" && (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] text-slate-500 border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-2 px-3 font-medium w-16">スコア</th>
                  <th className="text-left py-2 px-3 font-medium w-20">カテゴリ</th>
                  <th className="text-left py-2 px-3 font-medium">タイトル</th>
                  <th className="text-left py-2 px-3 font-medium">詳細</th>
                  <th className="text-left py-2 px-3 font-medium w-16">影響度</th>
                  <th className="text-left py-2 px-3 font-medium w-16">確率</th>
                  <th className="text-left py-2 px-3 font-medium">対策</th>
                  <th className="text-left py-2 px-3 font-medium w-32">ステータス</th>
                  <th className="text-left py-2 px-3 font-medium w-12"></th>
                </tr>
              </thead>
              <tbody>
                {sortedRisks.map((r) => (
                  <RiskRow key={r.id} risk={r} onUpdate={(p) => updateRisk(r.id, p)} onDelete={() => deleteRisk(r.id)} />
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addRisk}
            className="w-full px-5 py-2.5 text-xs text-slate-500 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-1.5 border-t border-slate-100"
          >
            <Plus size={12} /> リスクを追加
          </button>
        </div>
      )}

      {view === "matrix" && <RiskMatrix risks={risks} />}

      <div className="card text-xs">
        <div className="font-bold text-slate-700 mb-2">凡例（リスクスコア = 影響度 × 発生確率）</div>
        <div className="flex gap-3 flex-wrap">
          <LegendChip color="#10b981" label="低（1-4）" />
          <LegendChip color="#eab308" label="中（5-9）" />
          <LegendChip color="#f97316" label="高（10-15）" />
          <LegendChip color="#dc2626" label="超高（16-25）" />
        </div>
      </div>
    </div>
  );
}

function ViewBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={`text-xs px-3 py-1.5 flex items-center gap-1.5 ${active ? "bg-orange-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, bg, color }: { label: string; value: number; bg: string; color: string }) {
  return (
    <div className={`rounded-lg p-3 ${bg}`}>
      <div className="text-[11px] text-slate-600">{label}</div>
      <div className={`text-2xl font-bold tabular-nums ${color}`}>{value}</div>
    </div>
  );
}

function LegendChip({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded" style={{ background: color }} />
      <span className="text-slate-700">{label}</span>
    </span>
  );
}

function RiskRow({ risk, onUpdate, onDelete }: { risk: Risk; onUpdate: (p: Partial<Risk>) => void; onDelete: () => void }) {
  const score = risk.impact * risk.probability;
  const color = RISK_LEVEL_COLOR(score);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="py-2 px-3 align-top">
        <span className="inline-block px-2 py-0.5 rounded text-white text-xs font-bold tabular-nums" style={{ background: color }}>
          {score}
        </span>
      </td>
      <td className="py-2 px-3 align-top">
        <PillSelect value={risk.category} options={CATEGORIES} onChange={(v) => onUpdate({ category: v as RiskCategory })} />
      </td>
      <td className="py-2 px-3 align-top">
        <EditableText value={risk.title} onChange={(v) => onUpdate({ title: v })} className="text-sm font-medium text-slate-900" />
      </td>
      <td className="py-2 px-3 align-top">
        <EditableText value={risk.detail} placeholder="（詳細を記入）" onChange={(v) => onUpdate({ detail: v })} className="text-xs text-slate-600" multiline />
      </td>
      <td className="py-2 px-3 align-top">
        <ScoreSelect value={risk.impact} onChange={(v) => onUpdate({ impact: v as Risk["impact"] })} />
      </td>
      <td className="py-2 px-3 align-top">
        <ScoreSelect value={risk.probability} onChange={(v) => onUpdate({ probability: v as Risk["probability"] })} />
      </td>
      <td className="py-2 px-3 align-top">
        <EditableText value={risk.mitigation} placeholder="（対策を記入）" onChange={(v) => onUpdate({ mitigation: v })} className="text-xs text-slate-700" multiline />
      </td>
      <td className="py-2 px-3 align-top">
        <PillSelect value={risk.status} options={STATUSES} onChange={(v) => onUpdate({ status: v as RiskStatus })} />
      </td>
      <td className="py-2 px-3 align-top">
        <button onClick={onDelete} className="text-slate-300 hover:text-rose-500" title="削除">
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
}

function RiskMatrix({ risks }: { risks: Risk[] }) {
  const grid = useMemo(() => {
    const map = new Map<string, Risk[]>();
    risks.forEach((r) => {
      const key = `${r.impact}-${r.probability}`;
      const list = map.get(key) ?? [];
      list.push(r);
      map.set(key, list);
    });
    return map;
  }, [risks]);

  return (
    <div className="card">
      <div className="text-xs font-bold text-slate-700 mb-3">📊 影響度 × 発生確率 マトリクス</div>
      <div className="flex gap-2">
        <div className="flex flex-col justify-center pl-1">
          <div className="text-[10px] text-slate-500 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-bold">
            ← 影響度（高）
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-6 gap-1">
            <div></div>
            {[1, 2, 3, 4, 5].map((p) => (
              <div key={p} className="text-center text-[10px] text-slate-500 font-mono">
                {p}
              </div>
            ))}
            {[5, 4, 3, 2, 1].map((impact) => (
              <div key={`row-${impact}`} className="contents">
                <div className="text-right text-[10px] text-slate-500 font-mono pr-1 self-center">
                  {impact}
                </div>
                {[1, 2, 3, 4, 5].map((prob) => {
                  const key = `${impact}-${prob}`;
                  const cellRisks = grid.get(key) ?? [];
                  const score = impact * prob;
                  const color = RISK_LEVEL_COLOR(score);
                  return (
                    <div
                      key={key}
                      className="aspect-square rounded p-1 relative overflow-hidden"
                      style={{ background: color, opacity: cellRisks.length > 0 ? 1 : 0.25 }}
                    >
                      <div className="text-[9px] text-white font-bold opacity-60 absolute top-0.5 left-0.5">{score}</div>
                      <div className="flex flex-col gap-0.5 pt-3">
                        {cellRisks.map((r) => (
                          <span
                            key={r.id}
                            className="text-[8px] bg-white/95 text-slate-900 rounded px-1 truncate text-left"
                            title={r.title}
                          >
                            {r.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="text-center text-[10px] text-slate-500 mt-2 font-bold">発生確率（高） →</div>
        </div>
      </div>
    </div>
  );
}

function ScoreSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="text-xs px-1 py-0.5 border border-slate-200 rounded hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200 bg-white"
    >
      {SCORES.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
}

function EditableText({
  value,
  onChange,
  placeholder,
  className,
  multiline,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
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
        className={`w-full px-1.5 py-0.5 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white ${className ?? ""}`}
      />
    );
  }

  const isEmpty = value.length === 0;
  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text px-1.5 py-0.5 rounded hover:bg-slate-100 inline-block ${className ?? ""} ${isEmpty ? "text-slate-300 italic" : ""}`}
      title="クリックで編集"
    >
      {isEmpty ? placeholder ?? "（クリックで入力）" : value}
    </span>
  );
}

function PillSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; bg: string; text: string }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className={`text-[11px] px-2 py-0.5 rounded ${current.bg} ${current.text} font-medium hover:opacity-80`}>
        {current.label}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[120px]">
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="w-full text-left px-2 py-1 hover:bg-slate-50"
              >
                <span className={`text-[11px] px-2 py-0.5 rounded ${o.bg} ${o.text} font-medium`}>{o.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
