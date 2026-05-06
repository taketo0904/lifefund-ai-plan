"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { hypotheses as defaultHypotheses } from "@/lib/data/v02-hypotheses";

type Priority = "ultra" | "high" | "medium";
type Status = "pending" | "in_progress" | "validated_true" | "validated_false";

type Hypothesis = {
  id: string;
  letter: string;
  title: string;
  content: string;
  rationale: string;
  method: string;
  deadline: string;
  cost: string;
  learning: string;
  priority: Priority;
  status: Status;
};

const STORAGE_KEY = "shift-ai-hypotheses-v1";

const PRIORITIES: { value: Priority; label: string; bg: string; text: string; cardBg: string; cardBorder: string }[] = [
  { value: "ultra", label: "🔴 超高", bg: "bg-orange-600", text: "text-white", cardBg: "bg-orange-50", cardBorder: "border-orange-500" },
  { value: "high", label: "🟠 高", bg: "bg-amber-500", text: "text-white", cardBg: "bg-amber-50", cardBorder: "border-amber-500" },
  { value: "medium", label: "🟡 中", bg: "bg-yellow-500", text: "text-white", cardBg: "bg-yellow-50", cardBorder: "border-yellow-500" },
];

const STATUSES: { value: Status; label: string; bg: string; text: string }[] = [
  { value: "pending", label: "未着手", bg: "bg-slate-100", text: "text-slate-700" },
  { value: "in_progress", label: "検証中", bg: "bg-sky-100", text: "text-sky-700" },
  { value: "validated_true", label: "True", bg: "bg-emerald-100", text: "text-emerald-700" },
  { value: "validated_false", label: "False", bg: "bg-rose-100", text: "text-rose-700" },
];

export default function HypothesesPage() {
  const [items, setItems] = useState<Hypothesis[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    setItems([...defaultHypotheses]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {}
    }
  }, [items, loaded]);

  const update = (id: string, patch: Partial<Hypothesis>) => {
    setItems((prev) => prev.map((h) => (h.id === id ? { ...h, ...patch } : h)));
  };
  const del = (id: string) => {
    if (confirm("この仮説を削除しますか？")) setItems((prev) => prev.filter((h) => h.id !== id));
  };
  const add = () => {
    const next = String.fromCharCode(65 + items.length); // A, B, C...
    setItems((prev) => [
      ...prev,
      {
        id: `h${Date.now()}`,
        letter: next,
        title: "新しい仮説",
        content: "（仮説内容を記入）",
        rationale: "（根拠を記入）",
        method: "（検証方法を記入）",
        deadline: "2026-MM-DD",
        cost: "（検証コストを記入）",
        learning: "（学習ゴールを記入）",
        priority: "medium",
        status: "pending",
      },
    ]);
  };
  const reset = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setItems([...defaultHypotheses]);
    }
  };

  const counts = {
    ultra: items.filter((h) => h.priority === "ultra").length,
    high: items.filter((h) => h.priority === "high").length,
    medium: items.filter((h) => h.priority === "medium").length,
  };

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">🔬 5仮説検証</h1>
          <p className="text-slate-500 mt-1 text-sm">
            判断可能なレベルまで具体化された仮説のTrue/False判定
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ※ 全項目クリックで編集 / 仮説の追加・削除可 / 編集はブラウザに自動保存
          </p>
        </div>
        <button onClick={reset} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="🔴 超高優先" value={counts.ultra} color="text-orange-700" bg="bg-orange-50" />
        <Stat label="🟠 高優先" value={counts.high} color="text-amber-700" bg="bg-amber-50" />
        <Stat label="🟡 中優先" value={counts.medium} color="text-yellow-700" bg="bg-yellow-50" />
      </div>

      <div className="space-y-4">
        {items.map((h) => {
          const p = PRIORITIES.find((x) => x.value === h.priority) ?? PRIORITIES[2];
          return (
            <div key={h.id} className={`card relative ${p.cardBg} border-l-4 ${p.cardBorder}`}>
              <button onClick={() => del(h.id)} className="absolute top-3 right-3 text-slate-300 hover:text-rose-500" title="削除">
                <Trash2 size={14} />
              </button>

              <div className="flex items-start justify-between mb-3 gap-3 flex-wrap pr-6">
                <div className="flex items-center gap-3">
                  <EditableText
                    value={h.letter}
                    onChange={(v) => update(h.id, { letter: v })}
                    className="text-3xl font-bold text-slate-900 font-mono w-12 text-center"
                  />
                  <div>
                    <EditableText
                      value={h.title}
                      onChange={(v) => update(h.id, { title: v })}
                      className="text-base font-bold text-slate-900 block"
                    />
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <PillSelect value={h.priority} options={PRIORITIES} onChange={(v) => update(h.id, { priority: v as Priority })} />
                      <PillSelect value={h.status} options={STATUSES} onChange={(v) => update(h.id, { status: v as Status })} />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">検証期限</div>
                  <input
                    type="date"
                    value={h.deadline}
                    onChange={(e) => update(h.id, { deadline: e.target.value })}
                    className="text-sm font-mono px-2 py-1 border border-slate-200 rounded hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200 bg-white"
                  />
                </div>
              </div>

              <div className="bg-white rounded p-3 mb-3">
                <div className="text-xs text-slate-500 mb-1">仮説内容</div>
                <EditableText
                  value={h.content}
                  onChange={(v) => update(h.id, { content: v })}
                  className="text-sm text-slate-900 leading-relaxed block"
                  multiline
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-xs">
                <FieldBox icon="📚" label="根拠" value={h.rationale} onChange={(v) => update(h.id, { rationale: v })} />
                <FieldBox icon="🔬" label="検証方法" value={h.method} onChange={(v) => update(h.id, { method: v })} />
                <FieldBox icon="💰" label="検証コスト" value={h.cost} onChange={(v) => update(h.id, { cost: v })} />
                <FieldBox icon="🎯" label="学習ゴール" value={h.learning} onChange={(v) => update(h.id, { learning: v })} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button onClick={add} className="text-sm px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center gap-2 mx-auto">
          <Plus size={14} /> 仮説を追加
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
  return (
    <div className={`rounded-lg p-3 ${bg}`}>
      <div className="text-xs text-slate-700">{label}</div>
      <div className={`text-3xl font-bold tabular-nums ${color}`}>{value}</div>
    </div>
  );
}

function FieldBox({ icon, label, value, onChange }: { icon: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-slate-500 mb-1 font-bold">
        {icon} {label}
      </div>
      <EditableText value={value} onChange={onChange} className="text-slate-700 leading-relaxed block" multiline />
    </div>
  );
}

function EditableText({ value, onChange, placeholder, className, multiline }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; multiline?: boolean }) {
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

function PillSelect<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: string; bg: string; text: string }[]; onChange: (v: T) => void }) {
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
              <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} className="w-full text-left px-2 py-1 hover:bg-slate-50">
                <span className={`text-[11px] px-2 py-0.5 rounded ${o.bg} ${o.text} font-medium`}>{o.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
