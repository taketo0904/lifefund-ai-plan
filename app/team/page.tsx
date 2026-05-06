"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { teamMembers as defaultMembers } from "@/lib/data/v02-team";

type Phase = 1 | 2 | 3;
type Employment = "社員" | "業務委託" | "未定";

type TeamMember = {
  id: string;
  role: string;
  person: string;
  employment: Employment;
  phase: Phase;
  responsibilities: string[];
};

type PhaseInfo = {
  num: Phase;
  period: string;
  trigger: string;
  headcount: number;
  description: string;
};

const STORAGE_KEY_MEMBERS = "shift-ai-team-members-v1";
const STORAGE_KEY_PHASES = "shift-ai-team-phases-v1";

const PHASE_COLORS: Record<Phase, { bg: string; light: string; label: string }> = {
  1: { bg: "#E05B03", light: "#f6e9f0", label: "Phase 1" },
  2: { bg: "#c026d3", light: "#f5e3f8", label: "Phase 2" },
  3: { bg: "#7e22ce", light: "#ebdbf5", label: "Phase 3" },
};

const EMPLOYMENT_OPTIONS: { value: Employment; label: string; bg: string; text: string }[] = [
  { value: "社員", label: "社員", bg: "bg-emerald-100", text: "text-emerald-700" },
  { value: "業務委託", label: "業務委託", bg: "bg-amber-100", text: "text-amber-700" },
  { value: "未定", label: "未定", bg: "bg-slate-100", text: "text-slate-600" },
];

const PHASE_OPTIONS: { value: Phase; label: string; bg: string; text: string }[] = [
  { value: 1, label: "Phase 1〜", bg: "bg-orange-100", text: "text-orange-700" },
  { value: 2, label: "Phase 2〜", bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  { value: 3, label: "Phase 3〜", bg: "bg-purple-100", text: "text-purple-700" },
];

const DEFAULT_PHASE_INFO: PhaseInfo[] = [
  { num: 1, period: "5-7月（W1-12）", trigger: "事業開始時", headcount: 2, description: "PM + 業務委託1名" },
  { num: 2, period: "8月以降", trigger: "月次売上 500万 達成後", headcount: 4, description: "営業AE + SDR 追加" },
  { num: 3, period: "12月以降", trigger: "月次売上 2,500万 達成後", headcount: 5, description: "マーケ追加・最大5名" },
];

function stripDefaults(m: any): TeamMember {
  return {
    id: m.id,
    role: m.role,
    person: "",
    employment: m.employment as Employment,
    phase: m.phase as Phase,
    responsibilities: m.responsibilities,
  };
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [phaseInfo, setPhaseInfo] = useState<PhaseInfo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawM = localStorage.getItem(STORAGE_KEY_MEMBERS);
      const rawP = localStorage.getItem(STORAGE_KEY_PHASES);
      if (rawM) {
        const parsed = JSON.parse(rawM);
        if (Array.isArray(parsed) && parsed.length > 0) setMembers(parsed);
        else setMembers(defaultMembers.map(stripDefaults));
      } else {
        setMembers(defaultMembers.map(stripDefaults));
      }
      if (rawP) {
        const parsed = JSON.parse(rawP);
        if (Array.isArray(parsed) && parsed.length > 0) setPhaseInfo(parsed);
        else setPhaseInfo([...DEFAULT_PHASE_INFO]);
      } else {
        setPhaseInfo([...DEFAULT_PHASE_INFO]);
      }
    } catch {
      setMembers(defaultMembers.map(stripDefaults));
      setPhaseInfo([...DEFAULT_PHASE_INFO]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
        localStorage.setItem(STORAGE_KEY_PHASES, JSON.stringify(phaseInfo));
      } catch {}
    }
  }, [members, phaseInfo, loaded]);

  const updateMember = (id: string, patch: Partial<TeamMember>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };
  const updateResp = (id: string, idx: number, value: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, responsibilities: m.responsibilities.map((r, i) => (i === idx ? value : r)) } : m,
      ),
    );
  };
  const addResp = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, responsibilities: [...m.responsibilities, "新しい責任範囲"] } : m)),
    );
  };
  const deleteResp = (id: string, idx: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, responsibilities: m.responsibilities.filter((_, i) => i !== idx) } : m)),
    );
  };
  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        role: "新メンバー",
        person: "",
        employment: "未定",
        phase: 1,
        responsibilities: ["（責任範囲を記入）"],
      },
    ]);
  };
  const deleteMember = (id: string) => {
    if (confirm("このメンバーを削除しますか？")) setMembers((prev) => prev.filter((m) => m.id !== id));
  };
  const updatePhase = (num: Phase, patch: Partial<PhaseInfo>) => {
    setPhaseInfo((prev) => prev.map((p) => (p.num === num ? { ...p, ...patch } : p)));
  };
  const reset = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setMembers(defaultMembers.map(stripDefaults));
      setPhaseInfo([...DEFAULT_PHASE_INFO]);
    }
  };

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">👥 チーム体制</h1>
          <p className="text-slate-500 mt-1 text-sm">最初2人 → 売上連動で最大5名まで段階拡張</p>
          <p className="text-slate-400 text-xs mt-1">
            ※ 全項目クリックで編集 / メンバー追加・削除・責任範囲も編集可能 / 編集はブラウザに自動保存
          </p>
        </div>
        <button onClick={reset} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        {phaseInfo.map((p) => {
          const c = PHASE_COLORS[p.num];
          return (
            <div key={p.num} className="card border-t-4" style={{ borderTopColor: c.bg }}>
              <div className="text-xs font-bold tracking-widest" style={{ color: c.bg }}>
                {c.label}
              </div>
              <EditableText
                value={p.period}
                onChange={(v) => updatePhase(p.num, { period: v })}
                className="text-base font-bold text-slate-900 mt-1 block"
              />
              <div className="text-xs text-slate-500 mt-1">
                トリガー：
                <EditableText
                  value={p.trigger}
                  onChange={(v) => updatePhase(p.num, { trigger: v })}
                  className="text-xs text-slate-700"
                />
              </div>
              <div className="rounded-lg py-4 mt-3 text-center" style={{ background: c.light }}>
                <div className="text-xs text-slate-500">人数</div>
                <input
                  type="number"
                  value={p.headcount}
                  onChange={(e) => updatePhase(p.num, { headcount: Number(e.target.value) })}
                  className="text-5xl font-bold tabular-nums text-center w-24 bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-200 rounded"
                  style={{ color: c.bg }}
                />
                <span className="text-lg ml-1 font-bold" style={{ color: c.bg }}>
                  名
                </span>
              </div>
              <div className="mt-3">
                <EditableText
                  value={p.description}
                  onChange={(v) => updatePhase(p.num, { description: v })}
                  className="text-xs text-slate-600 italic block"
                  multiline
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">メンバー詳細</h2>
        <div className="space-y-3">
          {members.map((m, idx) => {
            const c = PHASE_COLORS[m.phase];
            return (
              <div key={m.id} className="border border-slate-200 rounded p-4 relative">
                <button
                  onClick={() => deleteMember(m.id)}
                  className="absolute top-3 right-3 text-slate-300 hover:text-rose-500"
                  title="削除"
                >
                  <Trash2 size={14} />
                </button>
                <div className="flex items-start gap-3 pr-6">
                  <div
                    className="rounded-full text-white w-10 h-10 flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: c.bg }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <EditableText
                        value={m.role}
                        onChange={(v) => updateMember(m.id, { role: v })}
                        className="text-base font-bold text-slate-900"
                      />
                      <PillSelect value={m.phase} options={PHASE_OPTIONS} onChange={(v) => updateMember(m.id, { phase: v as Phase })} />
                      <PillSelect value={m.employment} options={EMPLOYMENT_OPTIONS} onChange={(v) => updateMember(m.id, { employment: v as Employment })} />
                    </div>
                    <div className="text-xs text-slate-500 mb-2">
                      担当者：
                      <EditableText
                        value={m.person}
                        placeholder="（未定）"
                        onChange={(v) => updateMember(m.id, { person: v })}
                        className="text-xs text-slate-700"
                      />
                    </div>
                    <ul className="text-xs text-slate-700 space-y-0.5">
                      {m.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 group">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <EditableText
                            value={r}
                            onChange={(v) => updateResp(m.id, i, v)}
                            className="flex-1"
                            multiline
                          />
                          <button
                            onClick={() => deleteResp(m.id, i)}
                            className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"
                            title="削除"
                          >
                            <Trash2 size={11} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => addResp(m.id)}
                      className="mt-1 text-xs text-slate-500 hover:text-orange-700 flex items-center gap-1"
                    >
                      <Plus size={11} /> 責任範囲を追加
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={addMember}
          className="mt-3 w-full text-sm px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center justify-center gap-2"
        >
          <Plus size={14} /> メンバーを追加
        </button>
      </div>

      <div className="card bg-orange-50 border-orange-200">
        <h2 className="text-base font-bold text-slate-900 mb-2">💡 雇用形態の判断軸</h2>
        <div className="text-sm text-slate-700 space-y-2">
          <div>Phase 2-3で加わる3名は <strong>社員採用 / 業務委託 のどちらでも可</strong>。</div>
          <ul className="text-xs space-y-1 list-disc list-inside ml-2">
            <li>検証フェーズ → <strong>業務委託</strong>でテスト採用が低リスク</li>
            <li>フィットしたら社員に切り替え、合わなければ交代</li>
            <li>営業AE/SDRは即戦力獲得しやすい業務委託マーケットあり（Wantedly・LinkedIn）</li>
          </ul>
          <div className="text-xs text-slate-500 italic mt-2">※ 各ポジションの月額は別途財務計画書（xlsx）で管理</div>
        </div>
      </div>
    </div>
  );
}

function EditableText({ value, onChange, placeholder, className, multiline }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; multiline?: boolean }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const commit = () => { if (draft !== value) onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

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

function PillSelect<T extends string | number>({ value, options, onChange }: { value: T; options: { value: T; label: string; bg: string; text: string }[]; onChange: (v: T) => void }) {
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
              <button key={String(o.value)} onClick={() => { onChange(o.value); setOpen(false); }} className="w-full text-left px-2 py-1 hover:bg-slate-50">
                <span className={`text-[11px] px-2 py-0.5 rounded ${o.bg} ${o.text} font-medium`}>{o.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
