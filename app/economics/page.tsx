"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { packages as defaultPackages } from "@/lib/data/v02-channels";
import type { Package } from "@/lib/data/v02-channels";

const STORAGE_KEY = "lifefund-economics-packages-v1";

const positioningStyles: Record<string, { border: string; badge: string; badgeText: string; label: string }> = {
  entry: { border: "#E05B03", badge: "bg-orange-100", badgeText: "text-orange-700", label: "ENTRY" },
  core: { border: "#c026d3", badge: "bg-fuchsia-100", badgeText: "text-fuchsia-700", label: "CORE" },
  premium: { border: "#7e22ce", badge: "bg-purple-100", badgeText: "text-purple-700", label: "PREMIUM" },
  referral: { border: "#0891b2", badge: "bg-cyan-100", badgeText: "text-cyan-700", label: "REFERRAL" },
  hybrid: { border: "#0d9488", badge: "bg-teal-100", badgeText: "text-teal-700", label: "HYBRID" },
};

export default function EconomicsPage() {
  const [pkgs, setPkgs] = useState<Package[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPkgs(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch {}
    setPkgs([...defaultPackages]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pkgs));
      } catch {}
    }
  }, [pkgs, loaded]);

  const update = (id: string, patch: Partial<Package>) => {
    setPkgs((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const updateContents = (id: string, idx: number, value: string) => {
    setPkgs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, contents: p.contents?.map((c, i) => (i === idx ? value : c)) ?? [] } : p,
      ),
    );
  };
  const addContent = (id: string) => {
    setPkgs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, contents: [...(p.contents ?? []), "新しい項目"] } : p,
      ),
    );
  };
  const deleteContent = (id: string, idx: number) => {
    setPkgs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, contents: p.contents?.filter((_, i) => i !== idx) ?? [] } : p,
      ),
    );
  };

  const updateDeliverable = (id: string, idx: number, value: string) => {
    setPkgs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, deliverables: p.deliverables?.map((c, i) => (i === idx ? value : c)) ?? [] } : p,
      ),
    );
  };
  const addDeliverable = (id: string) => {
    setPkgs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, deliverables: [...(p.deliverables ?? []), "新しい成果物"] } : p,
      ),
    );
  };
  const deleteDeliverable = (id: string, idx: number) => {
    setPkgs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, deliverables: p.deliverables?.filter((_, i) => i !== idx) ?? [] } : p,
      ),
    );
  };

  const updateSkillRequired = (id: string, idx: number, value: string) => {
    setPkgs((prev) =>
      prev.map((p) => {
        if (p.id !== id || !p.skillSet) return p;
        return {
          ...p,
          skillSet: { ...p.skillSet, required: p.skillSet.required.map((s, i) => (i === idx ? value : s)) },
        };
      }),
    );
  };
  const addSkillRequired = (id: string) => {
    setPkgs((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const ss = p.skillSet ?? { required: [] };
        return { ...p, skillSet: { ...ss, required: [...ss.required, "新しいスキル"] } };
      }),
    );
  };
  const deleteSkillRequired = (id: string, idx: number) => {
    setPkgs((prev) =>
      prev.map((p) => {
        if (p.id !== id || !p.skillSet) return p;
        return {
          ...p,
          skillSet: { ...p.skillSet, required: p.skillSet.required.filter((_, i) => i !== idx) },
        };
      }),
    );
  };

  const addPkg = () => {
    setPkgs((prev) => [
      ...prev,
      {
        id: `pkg${Date.now()}`,
        name: "新しい商材",
        duration: "（期間）",
        price: "（価格）",
        priceMin: 0,
        priceMax: 0,
        target: "（ターゲット）",
        positioning: "core",
        staffing: "1人 / Lv未定",
        hours: "週X時間",
        contractTerms: "（契約形態）",
        contents: ["（提供内容を記入）"],
        skillSet: { required: ["（必須スキルを記入）"] },
        deliverables: ["（成果物を記入）"],
        targetClient: "（想定顧客像を記入）",
      },
    ]);
  };
  const deletePkg = (id: string) => {
    if (confirm("この商材を削除しますか？")) setPkgs((prev) => prev.filter((p) => p.id !== id));
  };
  const reset = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setPkgs([...defaultPackages]);
    }
  };

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📦 商材ラインナップ</h1>
          <p className="text-slate-500 mt-1 text-sm">
            提供する商材の一覧 / 価格・スキルセット・成果物・想定顧客
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ※ 全項目クリックで編集 / 商材追加・削除可 / 編集はブラウザに自動保存
          </p>
        </div>
        <button onClick={reset} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      <div className="space-y-4">
        {pkgs.map((p) => (
          <PackageCard
            key={p.id}
            pkg={p}
            onUpdate={(patch) => update(p.id, patch)}
            onDelete={() => deletePkg(p.id)}
            onUpdateContent={(idx, v) => updateContents(p.id, idx, v)}
            onAddContent={() => addContent(p.id)}
            onDeleteContent={(idx) => deleteContent(p.id, idx)}
            onUpdateDeliverable={(idx, v) => updateDeliverable(p.id, idx, v)}
            onAddDeliverable={() => addDeliverable(p.id)}
            onDeleteDeliverable={(idx) => deleteDeliverable(p.id, idx)}
            onUpdateSkillRequired={(idx, v) => updateSkillRequired(p.id, idx, v)}
            onAddSkillRequired={() => addSkillRequired(p.id)}
            onDeleteSkillRequired={(idx) => deleteSkillRequired(p.id, idx)}
          />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={addPkg}
          className="text-sm px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center gap-2 mx-auto"
        >
          <Plus size={14} /> 商材を追加
        </button>
      </div>
    </div>
  );
}

function PackageCard({
  pkg: p,
  onUpdate,
  onDelete,
  onUpdateContent,
  onAddContent,
  onDeleteContent,
  onUpdateDeliverable,
  onAddDeliverable,
  onDeleteDeliverable,
  onUpdateSkillRequired,
  onAddSkillRequired,
  onDeleteSkillRequired,
}: {
  pkg: Package;
  onUpdate: (patch: Partial<Package>) => void;
  onDelete: () => void;
  onUpdateContent: (idx: number, v: string) => void;
  onAddContent: () => void;
  onDeleteContent: (idx: number) => void;
  onUpdateDeliverable: (idx: number, v: string) => void;
  onAddDeliverable: () => void;
  onDeleteDeliverable: (idx: number) => void;
  onUpdateSkillRequired: (idx: number, v: string) => void;
  onAddSkillRequired: () => void;
  onDeleteSkillRequired: (idx: number) => void;
}) {
  const style = positioningStyles[p.positioning];

  return (
    <div className="border-l-4 border border-slate-200 rounded-lg bg-white p-4 relative" style={{ borderLeftColor: style.border }}>
      <button onClick={onDelete} className="absolute top-3 right-3 text-slate-300 hover:text-rose-500" title="商材を削除">
        <Trash2 size={14} />
      </button>

      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap pr-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`badge ${style.badge} ${style.badgeText} text-[10px] font-bold tracking-widest`}>
              {style.label}
            </span>
            <EditableText value={p.name} onChange={(v) => onUpdate({ name: v })} className="text-base font-bold text-slate-900" />
          </div>
          <EditableText value={p.duration} onChange={(v) => onUpdate({ duration: v })} className="text-xs text-slate-500" />
        </div>
        <div className="text-right shrink-0">
          <EditableText value={p.price} onChange={(v) => onUpdate({ price: v })} className="text-lg font-mono font-bold" />
          {p.staffing !== undefined && (
            <div className="text-[10px] text-slate-500">
              <EditableText value={p.staffing ?? ""} placeholder="（アサイン）" onChange={(v) => onUpdate({ staffing: v })} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 text-[11px]">
        <span className="rounded px-2 py-1 bg-slate-100 text-slate-700">
          ⏱ <EditableText value={p.hours ?? ""} placeholder="（稼働）" onChange={(v) => onUpdate({ hours: v })} />
        </span>
        <span className="rounded px-2 py-1 bg-slate-100 text-slate-700">
          📋 <EditableText value={p.contractTerms ?? ""} placeholder="（契約形態）" onChange={(v) => onUpdate({ contractTerms: v })} />
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Section title="📋 提供内容">
          <ul className="space-y-1">
            {(p.contents ?? []).map((c, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 group">
                <span className="text-slate-400 mt-0.5">•</span>
                <EditableText value={c} onChange={(v) => onUpdateContent(i, v)} className="flex-1" multiline />
                <button onClick={() => onDeleteContent(i)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100">
                  <Trash2 size={11} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onAddContent} className="mt-1 text-[10px] text-slate-500 hover:text-orange-700 flex items-center gap-1">
            <Plus size={10} /> 追加
          </button>
        </Section>

        <Section title="📦 成果物">
          <ul className="space-y-1">
            {(p.deliverables ?? []).map((d, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 group">
                <span className="text-slate-400 mt-0.5">✓</span>
                <EditableText value={d} onChange={(v) => onUpdateDeliverable(i, v)} className="flex-1" multiline />
                <button onClick={() => onDeleteDeliverable(i)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100">
                  <Trash2 size={11} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onAddDeliverable} className="mt-1 text-[10px] text-slate-500 hover:text-orange-700 flex items-center gap-1">
            <Plus size={10} /> 追加
          </button>
        </Section>

        <Section title="🎯 スキルセット要件（必須）">
          <ul className="space-y-1">
            {(p.skillSet?.required ?? []).map((s, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 group">
                <span className="text-orange-400 mt-0.5">▸</span>
                <EditableText value={s} onChange={(v) => onUpdateSkillRequired(i, v)} className="flex-1" multiline />
                <button onClick={() => onDeleteSkillRequired(i)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100">
                  <Trash2 size={11} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onAddSkillRequired} className="mt-1 text-[10px] text-slate-500 hover:text-orange-700 flex items-center gap-1">
            <Plus size={10} /> 追加
          </button>
          {p.skillSet?.experience && (
            <div className="mt-2 rounded bg-slate-100 p-2 text-[11px]">
              <span className="font-bold text-slate-600">経験要件目安：</span>
              <EditableText
                value={p.skillSet.experience}
                onChange={(v) => onUpdate({ skillSet: { ...p.skillSet!, experience: v } })}
                className="text-slate-700"
                multiline
              />
            </div>
          )}
        </Section>

        <Section title="👥 想定顧客">
          <EditableText
            value={p.targetClient ?? ""}
            placeholder="（想定顧客像を記入）"
            onChange={(v) => onUpdate({ targetClient: v })}
            className="text-xs text-slate-700 leading-relaxed block whitespace-pre-wrap"
            multiline
            longText
          />
        </Section>
      </div>

      {p.subMemberOption && (
        <div className="mt-3 rounded-lg bg-purple-50 border border-purple-200 p-3">
          <div className="text-xs font-bold text-purple-800 mb-1">➕ サブメンバー追加オプション</div>
          <div className="text-[11px] text-purple-700 mb-2">
            <EditableText
              value={p.subMemberOption.note}
              onChange={(v) => onUpdate({ subMemberOption: { ...p.subMemberOption!, note: v } })}
              multiline
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-2">
            {p.subMemberOption.pricing.map((opt, i) => (
              <div key={i} className="rounded bg-white border border-purple-200 p-2 text-center">
                <div className="text-[10px] text-slate-600 leading-tight">
                  <EditableText
                    value={opt.label}
                    onChange={(v) => {
                      const newPricing = [...p.subMemberOption!.pricing];
                      newPricing[i] = { ...newPricing[i], label: v };
                      onUpdate({ subMemberOption: { ...p.subMemberOption!, pricing: newPricing } });
                    }}
                  />
                </div>
                <div className="text-sm font-mono font-bold text-purple-700 mt-1">
                  <EditableText
                    value={opt.price}
                    onChange={(v) => {
                      const newPricing = [...p.subMemberOption!.pricing];
                      newPricing[i] = { ...newPricing[i], price: v };
                      onUpdate({ subMemberOption: { ...p.subMemberOption!, pricing: newPricing } });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.pendingNote && (
        <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
          <span className="font-bold">⏳ 保留：</span>
          <EditableText
            value={p.pendingNote}
            onChange={(v) => onUpdate({ pendingNote: v })}
            multiline
          />
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-[11px] font-bold text-slate-700 mb-2 tracking-wide">{title}</div>
      {children}
    </div>
  );
}

function EditableText({ value, onChange, placeholder, className, multiline, longText }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string; multiline?: boolean; longText?: boolean }) {
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
          rows={longText ? 4 : 2}
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
        className={`px-1.5 py-0.5 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white ${className ?? ""}`}
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
