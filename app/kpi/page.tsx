"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { kpiFunnel as defaultFunnel, plKPIs as defaultPlKpis } from "@/lib/data/v02-pl";

type FunnelStage = {
  id: string;
  stage: string;
  m3: number;
  m6: number;
  m9: number;
  m12: number;
  unit: string;
};

type KGI = {
  label: string;
  amount: string;
  description: string;
};

type CoreKPI = {
  id: string;
  label: string;
  value: string;
  sub: string;
};

const STORAGE_KEY_FUNNEL = "shift-ai-kpi-funnel-v1";
const STORAGE_KEY_KGI = "shift-ai-kpi-kgi-v1";
const STORAGE_KEY_CORE = "shift-ai-kpi-core-v1";

const DEFAULT_KGI: KGI = {
  label: "KGI",
  amount: "3億円",
  description: "12ヶ月後の売上",
};

const DEFAULT_CORE: CoreKPI[] = [
  { id: "k1", label: "営業利益", value: `${(defaultPlKpis.operatingProfit / 10000).toFixed(2)}億`, sub: `${defaultPlKpis.operatingMargin}%` },
  { id: "k2", label: "粗利", value: `${(defaultPlKpis.grossProfit / 10000).toFixed(2)}億`, sub: `${defaultPlKpis.grossMargin}%` },
  { id: "k3", label: "LTV/CAC", value: `${defaultPlKpis.ltvCac}x`, sub: `回収 ${defaultPlKpis.paybackMonths}ヶ月` },
  { id: "k4", label: "LTV(準委任)", value: `${defaultPlKpis.ltv.jukunin}万`, sub: `紹介 ${defaultPlKpis.ltv.referral}万` },
];

const DEFAULT_FUNNEL: FunnelStage[] = defaultFunnel.map((k, i) => ({
  id: `f${i}`,
  stage: k.stage,
  m3: k.m3,
  m6: k.m6,
  m9: k.m9,
  m12: k.m12,
  unit: k.unit,
}));

export default function KpiPage() {
  const [kgi, setKgi] = useState<KGI>(DEFAULT_KGI);
  const [core, setCore] = useState<CoreKPI[]>([]);
  const [funnel, setFunnel] = useState<FunnelStage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawK = localStorage.getItem(STORAGE_KEY_KGI);
      if (rawK) setKgi(JSON.parse(rawK));

      const rawC = localStorage.getItem(STORAGE_KEY_CORE);
      if (rawC) {
        const parsed = JSON.parse(rawC);
        if (Array.isArray(parsed) && parsed.length > 0) setCore(parsed);
        else setCore([...DEFAULT_CORE]);
      } else {
        setCore([...DEFAULT_CORE]);
      }

      const rawF = localStorage.getItem(STORAGE_KEY_FUNNEL);
      if (rawF) {
        const parsed = JSON.parse(rawF);
        if (Array.isArray(parsed) && parsed.length > 0) setFunnel(parsed);
        else setFunnel([...DEFAULT_FUNNEL]);
      } else {
        setFunnel([...DEFAULT_FUNNEL]);
      }
    } catch {
      setCore([...DEFAULT_CORE]);
      setFunnel([...DEFAULT_FUNNEL]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY_KGI, JSON.stringify(kgi));
        localStorage.setItem(STORAGE_KEY_CORE, JSON.stringify(core));
        localStorage.setItem(STORAGE_KEY_FUNNEL, JSON.stringify(funnel));
      } catch {}
    }
  }, [kgi, core, funnel, loaded]);

  const updateKgi = (patch: Partial<KGI>) => setKgi((prev) => ({ ...prev, ...patch }));
  const updateCore = (id: string, patch: Partial<CoreKPI>) =>
    setCore((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const addCore = () =>
    setCore((prev) => [...prev, { id: `k${Date.now()}`, label: "新KPI", value: "0", sub: "" }]);
  const deleteCore = (id: string) => {
    if (confirm("このKPIを削除しますか？")) setCore((prev) => prev.filter((c) => c.id !== id));
  };
  const updateFunnel = (id: string, patch: Partial<FunnelStage>) =>
    setFunnel((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const addFunnel = () =>
    setFunnel((prev) => [
      ...prev,
      { id: `f${Date.now()}`, stage: "新ステージ", m3: 0, m6: 0, m9: 0, m12: 0, unit: "" },
    ]);
  const deleteFunnel = (id: string) => {
    if (confirm("このステージを削除しますか？")) setFunnel((prev) => prev.filter((f) => f.id !== id));
  };

  const reset = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setKgi(DEFAULT_KGI);
      setCore([...DEFAULT_CORE]);
      setFunnel([...DEFAULT_FUNNEL]);
    }
  };

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📊 KPIツリー</h1>
          <p className="text-slate-500 mt-1 text-sm">KGI → 主要KPI → ファネル（3/6/9/12ヶ月マイルストーン）</p>
          <p className="text-slate-400 text-xs mt-1">※ 全項目クリックで編集 / KPI追加・削除可 / 編集はブラウザに自動保存</p>
        </div>
        <button onClick={reset} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      {/* KGI */}
      <div className="card text-white border-0" style={{ background: "linear-gradient(135deg, #E05B03, #F08C4A)" }}>
        <EditableText
          value={kgi.label}
          onChange={(v) => updateKgi({ label: v })}
          className="text-xs opacity-90 tracking-widest font-bold mb-1 block"
        />
        <EditableText
          value={kgi.amount}
          onChange={(v) => updateKgi({ amount: v })}
          className="text-4xl font-bold block"
        />
        <EditableText
          value={kgi.description}
          onChange={(v) => updateKgi({ description: v })}
          className="text-sm opacity-90 mt-1 block"
        />
      </div>

      {/* Core KPIs */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">主要KPI</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {core.map((c) => (
            <div key={c.id} className="card relative group">
              <button
                onClick={() => deleteCore(c.id)}
                className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"
                title="削除"
              >
                <Trash2 size={12} />
              </button>
              <EditableText value={c.label} onChange={(v) => updateCore(c.id, { label: v })} className="text-xs text-slate-500 block" />
              <EditableText value={c.value} onChange={(v) => updateCore(c.id, { value: v })} className="text-2xl font-bold text-orange-700 tabular-nums mt-1 block" />
              <EditableText value={c.sub} placeholder="(補足)" onChange={(v) => updateCore(c.id, { sub: v })} className="text-xs text-slate-600 block" />
            </div>
          ))}
          <button
            onClick={addCore}
            className="card border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center justify-center gap-2 min-h-[100px]"
          >
            <Plus size={14} /> KPI追加
          </button>
        </div>
      </div>

      {/* KPI Funnel */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">🎯 KPIファネル（マイルストーン）</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-orange-200 text-xs text-slate-500 bg-slate-50">
                <th className="text-left py-2 px-3">ステージ</th>
                <th className="text-right py-2 px-3">3ヶ月</th>
                <th className="text-right py-2 px-3">6ヶ月</th>
                <th className="text-right py-2 px-3">9ヶ月</th>
                <th className="text-right py-2 px-3 bg-orange-50">12ヶ月（KGI）</th>
                <th className="text-right py-2 px-3 text-xs">単位</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {funnel.map((f) => (
                <tr key={f.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3">
                    <EditableText value={f.stage} onChange={(v) => updateFunnel(f.id, { stage: v })} className="text-slate-700" />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <NumberInput value={f.m3} onChange={(v) => updateFunnel(f.id, { m3: v })} />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <NumberInput value={f.m6} onChange={(v) => updateFunnel(f.id, { m6: v })} />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <NumberInput value={f.m9} onChange={(v) => updateFunnel(f.id, { m9: v })} />
                  </td>
                  <td className="py-2 px-3 text-right bg-orange-50/50">
                    <NumberInput value={f.m12} onChange={(v) => updateFunnel(f.id, { m12: v })} bold />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <EditableText value={f.unit} placeholder="(単位)" onChange={(v) => updateFunnel(f.id, { unit: v })} className="text-xs text-slate-500" />
                  </td>
                  <td className="py-2 px-3">
                    <button onClick={() => deleteFunnel(f.id)} className="text-slate-300 hover:text-rose-500" title="削除">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addFunnel}
          className="w-full px-5 py-2.5 text-xs text-slate-500 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-1.5 border-t border-slate-100"
        >
          <Plus size={12} /> ステージを追加
        </button>
      </div>
    </div>
  );
}

function NumberInput({ value, onChange, bold }: { value: number; onChange: (v: number) => void; bold?: boolean }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-24 text-right tabular-nums px-2 py-1 border border-slate-200 rounded hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200 bg-transparent ${bold ? "font-bold text-orange-700" : "text-slate-700"}`}
    />
  );
}

function EditableText({ value, onChange, placeholder, className }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const commit = () => { if (draft !== value) onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  if (editing) {
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
