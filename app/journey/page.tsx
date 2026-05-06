"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw, ArrowDown } from "lucide-react";
import { journeyStages as defaultStages, journeyConversionSummary } from "@/lib/data/v02-journey";
import type { JourneyStage } from "@/lib/data/v02-journey";

const STORAGE_KEY = "lifefund-journey-v1";
const THEME = { primary: "#E05B03", primaryLight: "#F08C4A" };

const tierColors: Record<string, string> = {
  Pre: "#94a3b8",
  "Tier 0": "#E05B03",
  "Tier 0 → 1": "#F08C4A",
  "Tier 1 → 2": "#f59e0b",
  "Tier 2 → 3": "#dc2626",
  "Tier 3 → 4": "#7c3aed",
};

export default function JourneyPage() {
  const [stages, setStages] = useState<JourneyStage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStages(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    setStages([...defaultStages]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stages));
      } catch {}
    }
  }, [stages, loaded]);

  const update = (id: string, patch: Partial<JourneyStage>) => {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const updateArrayItem = (id: string, key: "ourActions" | "touchpoints" | "blockers", idx: number, value: string) => {
    setStages((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        return { ...s, [key]: s[key].map((c, i) => (i === idx ? value : c)) };
      }),
    );
  };
  const addArrayItem = (id: string, key: "ourActions" | "touchpoints" | "blockers", placeholder: string) => {
    setStages((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: [...s[key], placeholder] } : s)),
    );
  };
  const deleteArrayItem = (id: string, key: "ourActions" | "touchpoints" | "blockers", idx: number) => {
    setStages((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: s[key].filter((_, i) => i !== idx) } : s)),
    );
  };

  const addStage = () => {
    setStages((prev) => [
      ...prev,
      {
        id: `stage${Date.now()}`,
        tier: "Tier ?",
        stageName: "新しいステージ",
        customerState: "（顧客の状態を記入）",
        customerEmotion: "（顧客の心理を記入）",
        trigger: "（きっかけを記入）",
        ourActions: ["（アクションを記入）"],
        touchpoints: ["（接点を記入）"],
        nextCondition: "（遷移条件を記入）",
        conversionTarget: "（数値目標を記入）",
        blockers: ["（離脱要因を記入）"],
      },
    ]);
  };
  const deleteStage = (id: string) => {
    if (confirm("このステージを削除しますか？")) setStages((prev) => prev.filter((s) => s.id !== id));
  };
  const reset = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setStages([...defaultStages]);
    }
  };

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">🛤 アップセル カスタマージャーニー</h1>
          <p className="text-slate-500 mt-1 text-sm">
            認知 → Tier 0（研究会）→ Tier 1〜4 のアップセル動線。各ステージで顧客状態・我々のアクション・遷移条件を整理。
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ※ 全項目クリックで編集 / ステージ追加・削除可 / 編集はブラウザに自動保存
          </p>
        </div>
        <button
          onClick={reset}
          className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600"
        >
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      {/* 遷移率サマリー */}
      <section className="rounded-xl border border-orange-200 bg-orange-50/40 p-5">
        <h2 className="text-sm font-bold text-slate-700 mb-3">📊 想定遷移率（全体ファネル）</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
          <ConvCard label="認知 → 相談" value={`${journeyConversionSummary.awarenessToRelation}%`} />
          <ConvCard label="相談 → Tier 0" value={`${journeyConversionSummary.relationToTier0}%`} />
          <ConvCard label="Tier 0 → 1" value={`${journeyConversionSummary.tier0ToTier1}%`} highlight />
          <ConvCard label="Tier 1 → 2" value={`${journeyConversionSummary.tier1ToTier2}%`} highlight />
          <ConvCard label="Tier 2 → 3" value={`${journeyConversionSummary.tier2ToTier3}%`} />
          <ConvCard label="Tier 3 → 4" value={`${journeyConversionSummary.tier3ToTier4}%`} />
        </div>
      </section>

      {/* ステージ一覧 */}
      <div className="space-y-4">
        {stages.map((s, idx) => (
          <div key={s.id}>
            <StageCard
              stage={s}
              onUpdate={(patch) => update(s.id, patch)}
              onDelete={() => deleteStage(s.id)}
              onUpdateArrayItem={(k, i, v) => updateArrayItem(s.id, k, i, v)}
              onAddArrayItem={(k, p) => addArrayItem(s.id, k, p)}
              onDeleteArrayItem={(k, i) => deleteArrayItem(s.id, k, i)}
            />
            {idx < stages.length - 1 && (
              <div className="flex justify-center py-2 text-slate-300">
                <ArrowDown size={20} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={addStage}
          className="text-sm px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center gap-2 mx-auto"
        >
          <Plus size={14} /> ステージを追加
        </button>
      </div>
    </div>
  );
}

function ConvCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 text-center ${highlight ? "bg-white border-2 border-orange-300" : "bg-white border border-slate-200"}`}>
      <div className="text-[10px] text-slate-500 mb-0.5">{label}</div>
      <div className={`text-lg font-bold tabular-nums ${highlight ? "" : "text-slate-700"}`} style={highlight ? { color: THEME.primary } : {}}>
        {value}
      </div>
    </div>
  );
}

function StageCard({
  stage: s,
  onUpdate,
  onDelete,
  onUpdateArrayItem,
  onAddArrayItem,
  onDeleteArrayItem,
}: {
  stage: JourneyStage;
  onUpdate: (patch: Partial<JourneyStage>) => void;
  onDelete: () => void;
  onUpdateArrayItem: (key: "ourActions" | "touchpoints" | "blockers", idx: number, value: string) => void;
  onAddArrayItem: (key: "ourActions" | "touchpoints" | "blockers", placeholder: string) => void;
  onDeleteArrayItem: (key: "ourActions" | "touchpoints" | "blockers", idx: number) => void;
}) {
  const tierColor = tierColors[s.tier] ?? "#64748b";

  return (
    <div className="border-l-4 border border-slate-200 rounded-lg bg-white p-5 relative" style={{ borderLeftColor: tierColor }}>
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-slate-300 hover:text-rose-500"
        title="ステージを削除"
      >
        <Trash2 size={14} />
      </button>

      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap pr-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded text-white"
              style={{ background: tierColor }}
            >
              <EditableText value={s.tier} onChange={(v) => onUpdate({ tier: v })} className="text-white" />
            </span>
            <EditableText value={s.stageName} onChange={(v) => onUpdate({ stageName: v })} className="text-base font-bold text-slate-900" />
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] text-slate-500">遷移目標</div>
          <EditableText value={s.conversionTarget} onChange={(v) => onUpdate({ conversionTarget: v })} className="text-sm font-mono font-bold text-slate-900" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* 顧客側 */}
        <Section title="👤 顧客の状態">
          <EditableText
            value={s.customerState}
            onChange={(v) => onUpdate({ customerState: v })}
            className="text-xs text-slate-700 leading-relaxed block"
            multiline
          />
        </Section>

        <Section title="💭 顧客の心理・感情">
          <EditableText
            value={s.customerEmotion}
            onChange={(v) => onUpdate({ customerEmotion: v })}
            className="text-xs text-slate-700 leading-relaxed block italic"
            multiline
          />
        </Section>

        <Section title="⚡ きっかけ（トリガー）">
          <EditableText
            value={s.trigger}
            onChange={(v) => onUpdate({ trigger: v })}
            className="text-xs text-slate-700 leading-relaxed block"
            multiline
          />
        </Section>

        <Section title="🚦 次への遷移条件">
          <EditableText
            value={s.nextCondition}
            onChange={(v) => onUpdate({ nextCondition: v })}
            className="text-xs text-slate-700 leading-relaxed block"
            multiline
          />
        </Section>

        {/* 我々のアクション */}
        <Section title="🎯 我々のアクション">
          <ul className="space-y-1">
            {s.ourActions.map((a, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 group">
                <span className="text-slate-400 mt-0.5">•</span>
                <EditableText
                  value={a}
                  onChange={(v) => onUpdateArrayItem("ourActions", i, v)}
                  className="flex-1"
                  multiline
                />
                <button
                  onClick={() => onDeleteArrayItem("ourActions", i)}
                  className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={11} />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onAddArrayItem("ourActions", "新しいアクション")}
            className="mt-1 text-[10px] text-slate-500 hover:text-orange-700 flex items-center gap-1"
          >
            <Plus size={10} /> 追加
          </button>
        </Section>

        {/* 接点 */}
        <Section title="📡 接点（タッチポイント）">
          <ul className="flex flex-wrap gap-1.5">
            {s.touchpoints.map((t, i) => (
              <li key={i} className="group inline-flex items-center gap-1 bg-slate-100 rounded px-2 py-1 text-[11px] text-slate-700">
                <EditableText
                  value={t}
                  onChange={(v) => onUpdateArrayItem("touchpoints", i, v)}
                />
                <button
                  onClick={() => onDeleteArrayItem("touchpoints", i)}
                  className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={10} />
                </button>
              </li>
            ))}
            <button
              onClick={() => onAddArrayItem("touchpoints", "新しい接点")}
              className="text-[10px] text-slate-500 hover:text-orange-700 flex items-center gap-1 px-2 py-1"
            >
              <Plus size={10} /> 追加
            </button>
          </ul>
        </Section>
      </div>

      {/* 離脱要因 */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <Section title="🚫 離脱要因・詰まりポイント">
          <ul className="space-y-1">
            {s.blockers.map((b, i) => (
              <li key={i} className="text-xs text-rose-700 flex items-start gap-1.5 group">
                <span className="text-rose-300 mt-0.5">⚠</span>
                <EditableText
                  value={b}
                  onChange={(v) => onUpdateArrayItem("blockers", i, v)}
                  className="flex-1"
                  multiline
                />
                <button
                  onClick={() => onDeleteArrayItem("blockers", i)}
                  className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={11} />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onAddArrayItem("blockers", "新しい離脱要因")}
            className="mt-1 text-[10px] text-slate-500 hover:text-orange-700 flex items-center gap-1"
          >
            <Plus size={10} /> 追加
          </button>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold text-slate-500 mb-2 tracking-wide">{title}</h3>
      {children}
    </div>
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
    setEditing(false);
    if (draft !== value) onChange(draft);
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
            if (e.key === "Escape") {
              setDraft(value);
              setEditing(false);
            }
          }}
          className={`${className ?? ""} border border-orange-300 rounded px-1 py-0.5 outline-none w-full bg-white`}
          rows={Math.max(2, draft.split("\n").length)}
        />
      );
    }
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setDraft(value);
            setEditing(false);
          }
        }}
        className={`${className ?? ""} border border-orange-300 rounded px-1 py-0.5 outline-none bg-white`}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`${className ?? ""} cursor-text hover:bg-orange-50 rounded px-0.5 ${!value ? "text-slate-400" : ""}`}
    >
      {value || placeholder || "クリックで編集"}
    </span>
  );
}
