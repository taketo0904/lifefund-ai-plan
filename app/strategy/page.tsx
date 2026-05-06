"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import {
  defaultFrameworks,
  defaultCompanyBasics,
  defaultBusinessModel,
  defaultSwotLists,
  defaultTowsMatrix,
  defaultJtbdStatements,
  defaultAlternatives,
  type Framework,
  type CompanyBasics,
  type BusinessModel,
  type SwotLists,
  type TowsMatrix,
  type JtbdStatement,
  type AlternativeAndComplaint,
} from "@/lib/data/v02-strategy-framework";

const STORAGE_KEY = "shift-ai-strategy-v2";

type StrategyState = {
  basics: CompanyBasics;
  business: BusinessModel;
  frameworks: Framework[];
  swot: SwotLists;
  tows: TowsMatrix;
  jtbd: JtbdStatement[];
  alternatives: AlternativeAndComplaint[];
};

const DEFAULT_STATE: StrategyState = {
  basics: { ...defaultCompanyBasics },
  business: { ...defaultBusinessModel },
  frameworks: JSON.parse(JSON.stringify(defaultFrameworks)),
  swot: { ...defaultSwotLists, strengths: [], weaknesses: [], opportunities: [], threats: [] },
  tows: { ...defaultTowsMatrix },
  jtbd: [...defaultJtbdStatements],
  alternatives: [...defaultAlternatives],
};

export default function StrategyPage() {
  const [state, setState] = useState<StrategyState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...DEFAULT_STATE, ...parsed });
        setLoaded(true);
        return;
      }
    } catch {}
    setState(DEFAULT_STATE);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {}
    }
  }, [state, loaded]);

  const reset = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setState(DEFAULT_STATE);
    }
  };

  // ===== Calc averages =====
  const frameworkAverages = useMemo(() => {
    return state.frameworks.map((f) => {
      const allItems = f.groups.flatMap((g) => g.items);
      const avg = allItems.length > 0 ? allItems.reduce((s, i) => s + i.score, 0) / allItems.length : 0;
      return { id: f.id, title: f.title, weight: f.weight, avg };
    });
  }, [state.frameworks]);

  const totalScore = useMemo(() => {
    let weightedSum = 0;
    let weightTotal = 0;
    frameworkAverages.forEach((f) => {
      weightedSum += f.avg * f.weight;
      weightTotal += f.weight;
    });
    return weightTotal > 0 ? weightedSum / weightTotal : 0;
  }, [frameworkAverages]);

  // 事業成功確率（推定）：(score - 2.5) / 2.5 * 100
  const successProbability = useMemo(() => Math.round(((totalScore - 2.5) / 2.5) * 100), [totalScore]);
  const probGrade = useMemo(() => {
    if (totalScore >= 4) return { label: "A：有望", color: "text-emerald-700", bg: "bg-emerald-50" };
    if (totalScore >= 3.5) return { label: "B：合格", color: "text-sky-700", bg: "bg-sky-50" };
    if (totalScore >= 3) return { label: "C：要改善", color: "text-amber-700", bg: "bg-amber-50" };
    return { label: "D：要見直し", color: "text-rose-700", bg: "bg-rose-50" };
  }, [totalScore]);

  // ===== Mutations =====
  const updateBasics = (patch: Partial<CompanyBasics>) =>
    setState((p) => ({ ...p, basics: { ...p.basics, ...patch } }));
  const updateBusiness = (patch: Partial<BusinessModel>) =>
    setState((p) => ({ ...p, business: { ...p.business, ...patch } }));
  const updateFrameworkScore = (fId: string, gId: string, iId: string, score: number) =>
    setState((p) => ({
      ...p,
      frameworks: p.frameworks.map((f) =>
        f.id !== fId
          ? f
          : {
              ...f,
              groups: f.groups.map((g) =>
                g.id !== gId
                  ? g
                  : {
                      ...g,
                      items: g.items.map((i) => (i.id !== iId ? i : { ...i, score })),
                    },
              ),
            },
      ),
    }));

  const addSwotItem = (key: keyof SwotLists) =>
    setState((p) => ({
      ...p,
      swot: { ...p.swot, [key]: [...p.swot[key], { id: `${key}${Date.now()}`, text: "" }] },
    }));
  const updateSwotItem = (key: keyof SwotLists, id: string, text: string) =>
    setState((p) => ({
      ...p,
      swot: { ...p.swot, [key]: p.swot[key].map((i) => (i.id === id ? { ...i, text } : i)) },
    }));
  const deleteSwotItem = (key: keyof SwotLists, id: string) =>
    setState((p) => ({
      ...p,
      swot: { ...p.swot, [key]: p.swot[key].filter((i) => i.id !== id) },
    }));

  const updateTows = (key: keyof TowsMatrix, value: string) =>
    setState((p) => ({ ...p, tows: { ...p.tows, [key]: value } }));

  const addJtbd = () =>
    setState((p) => ({
      ...p,
      jtbd: [...p.jtbd, { id: `j${Date.now()}`, when: "", iWantTo: "", soI: "" }],
    }));
  const updateJtbd = (id: string, patch: Partial<JtbdStatement>) =>
    setState((p) => ({
      ...p,
      jtbd: p.jtbd.map((j) => (j.id === id ? { ...j, ...patch } : j)),
    }));
  const deleteJtbd = (id: string) =>
    setState((p) => ({ ...p, jtbd: p.jtbd.filter((j) => j.id !== id) }));

  const addAlt = () =>
    setState((p) => ({
      ...p,
      alternatives: [...p.alternatives, { id: `a${Date.now()}`, alternative: "", complaint: "" }],
    }));
  const updateAlt = (id: string, patch: Partial<AlternativeAndComplaint>) =>
    setState((p) => ({
      ...p,
      alternatives: p.alternatives.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  const deleteAlt = (id: string) =>
    setState((p) => ({ ...p, alternatives: p.alternatives.filter((a) => a.id !== id) }));

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-7xl space-y-6">
      <header className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📚 戦略ドキュメント（事業評価フレームワーク）</h1>
          <p className="text-slate-500 mt-1 text-sm">
            PEST / 3C / 5F / SWOT / STP / JTBD の6フレームワークでスコアリング
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ※ 全項目クリックで編集 / スコア（1-5）の合計から事業成功確率を算出
          </p>
        </div>
        <button onClick={reset} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
          <RotateCcw size={12} /> リセット
        </button>
      </header>

      {/* 総合スコア（上部） */}
      <div className={`card border-l-4 border-orange-500 ${probGrade.bg}`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs text-slate-500">📊 総合スコア（加重平均）</div>
            <div className="text-4xl font-bold text-orange-700 tabular-nums">{totalScore.toFixed(2)}<span className="text-lg ml-1 text-slate-500">/ 5.00</span></div>
          </div>
          <div>
            <div className="text-xs text-slate-500">📈 事業成功確率（推定）</div>
            <div className={`text-3xl font-bold ${probGrade.color}`}>{successProbability >= 0 ? "+" : ""}{successProbability}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">評価グレード</div>
            <div className={`text-2xl font-bold ${probGrade.color}`}>{probGrade.label}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
          {frameworkAverages.map((f) => (
            <div key={f.id} className="bg-white rounded p-2 text-center border border-slate-200">
              <div className="text-[10px] text-slate-500 truncate">{f.title}</div>
              <div className="text-xl font-bold tabular-nums text-orange-700">{f.avg.toFixed(1)}</div>
              <div className="text-[9px] text-slate-400">重み {f.weight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 企業基本情報 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">🏢 企業基本情報</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <FieldRow label="企業名">
            <EditableInput value={state.basics.companyName} onChange={(v) => updateBasics({ companyName: v })} />
          </FieldRow>
          <FieldRow label="業界・業種">
            <EditableInput value={state.basics.industry} onChange={(v) => updateBasics({ industry: v })} />
          </FieldRow>
          <FieldRow label="設立年">
            <EditableInput value={state.basics.founded} onChange={(v) => updateBasics({ founded: v })} />
          </FieldRow>
          <FieldRow label="従業員数">
            <EditableInput value={state.basics.employees} onChange={(v) => updateBasics({ employees: v })} />
          </FieldRow>
          <FieldRow label="年商（概算）">
            <EditableInput value={state.basics.revenue} onChange={(v) => updateBasics({ revenue: v })} />
          </FieldRow>
          <FieldRow label="担当者名・役職">
            <EditableInput value={state.basics.contact} onChange={(v) => updateBasics({ contact: v })} />
          </FieldRow>
          <FieldRow label="ヒアリング日">
            <input
              type="date"
              value={state.basics.hearingDate}
              onChange={(e) => updateBasics({ hearingDate: e.target.value })}
              className="text-sm w-full px-2 py-1 border border-slate-200 rounded hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200"
            />
          </FieldRow>
        </div>
      </div>

      {/* ビジネスモデル */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">💡 ビジネスモデル概要</h2>
        <div className="space-y-3">
          <FieldRow label="モデルタイプ">
            <EditableInput value={state.business.modelType} onChange={(v) => updateBusiness({ modelType: v })} placeholder="例：BtoB SaaS / BtoC EC / マーケットプレイス etc." />
          </FieldRow>
          <FieldRow label="ターゲット顧客">
            <EditableTextarea value={state.business.targetCustomer} onChange={(v) => updateBusiness({ targetCustomer: v })} />
          </FieldRow>
          <FieldRow label="解決する課題・提供価値">
            <EditableTextarea value={state.business.problemValue} onChange={(v) => updateBusiness({ problemValue: v })} />
          </FieldRow>
          <div className="grid md:grid-cols-2 gap-3">
            <FieldRow label="想定リリース時期">
              <EditableInput value={state.business.launchTiming} onChange={(v) => updateBusiness({ launchTiming: v })} />
            </FieldRow>
            <FieldRow label="初期投資規模（概算）">
              <EditableInput value={state.business.initialInvestment} onChange={(v) => updateBusiness({ initialInvestment: v })} />
            </FieldRow>
            <FieldRow label="想定単価・料金設定">
              <EditableInput value={state.business.pricing} onChange={(v) => updateBusiness({ pricing: v })} />
            </FieldRow>
            <FieldRow label="KGI（最終目標指標）">
              <EditableInput value={state.business.kgi} onChange={(v) => updateBusiness({ kgi: v })} />
            </FieldRow>
          </div>
        </div>
      </div>

      {/* 評価基準 */}
      <div className="card bg-slate-50">
        <h2 className="text-sm font-bold text-slate-700 mb-2">📐 評価基準（1-5スコア）</h2>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {[
            { n: 1, label: "非常に不利・全くない" },
            { n: 2, label: "やや不利・ほぼない" },
            { n: 3, label: "中立・普通" },
            { n: 4, label: "やや有利・ある" },
            { n: 5, label: "非常に有利・強い" },
          ].map((s) => (
            <div key={s.n} className="bg-white rounded p-2 text-center border border-slate-200">
              <div className="text-lg font-bold text-orange-700 tabular-nums">{s.n}</div>
              <div className="text-[10px] text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 各フレームワーク */}
      {state.frameworks.map((f) => (
        <FrameworkCard
          key={f.id}
          framework={f}
          onUpdateScore={(gId, iId, score) => updateFrameworkScore(f.id, gId, iId, score)}
        />
      ))}

      {/* SWOT lists */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">🎯 SWOT 4象限リスト</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <SwotBox title="💪 Strengths（強み）" color="emerald" items={state.swot.strengths} onAdd={() => addSwotItem("strengths")} onUpdate={(id, v) => updateSwotItem("strengths", id, v)} onDelete={(id) => deleteSwotItem("strengths", id)} />
          <SwotBox title="⚠️ Weaknesses（弱み）" color="rose" items={state.swot.weaknesses} onAdd={() => addSwotItem("weaknesses")} onUpdate={(id, v) => updateSwotItem("weaknesses", id, v)} onDelete={(id) => deleteSwotItem("weaknesses", id)} />
          <SwotBox title="🚀 Opportunities（機会）" color="sky" items={state.swot.opportunities} onAdd={() => addSwotItem("opportunities")} onUpdate={(id, v) => updateSwotItem("opportunities", id, v)} onDelete={(id) => deleteSwotItem("opportunities", id)} />
          <SwotBox title="🌪 Threats（脅威）" color="amber" items={state.swot.threats} onAdd={() => addSwotItem("threats")} onUpdate={(id, v) => updateSwotItem("threats", id, v)} onDelete={(id) => deleteSwotItem("threats", id)} />
        </div>
      </div>

      {/* TOWS Matrix */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">🔀 TOWSマトリクス（戦略オプション）</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <TowsBox title="SO戦略（強み×機会）" hint="強みを活かして機会を最大化する成長戦略" value={state.tows.so} onChange={(v) => updateTows("so", v)} bg="bg-emerald-50" />
          <TowsBox title="WO戦略（弱み×機会）" hint="弱みを補強して機会を取り込む改善戦略" value={state.tows.wo} onChange={(v) => updateTows("wo", v)} bg="bg-sky-50" />
          <TowsBox title="ST戦略（強み×脅威）" hint="強みで脅威を回避・対抗する差別化戦略" value={state.tows.st} onChange={(v) => updateTows("st", v)} bg="bg-amber-50" />
          <TowsBox title="WT戦略（弱み×脅威）" hint="弱みと脅威の最小化・撤退・提携を検討" value={state.tows.wt} onChange={(v) => updateTows("wt", v)} bg="bg-rose-50" />
        </div>
      </div>

      {/* JTBD Statements */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">🎭 ジョブステートメント（When / I want to / So I can）</h2>
        <div className="space-y-3">
          {state.jtbd.map((j) => (
            <div key={j.id} className="border border-slate-200 rounded p-3 relative">
              <button onClick={() => deleteJtbd(j.id)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500" title="削除">
                <Trash2 size={12} />
              </button>
              <div className="space-y-2 text-sm pr-6">
                <div>
                  <span className="text-[10px] text-orange-700 font-bold tracking-widest">WHEN</span>
                  <EditableTextarea value={j.when} placeholder="（いつ・どんなときに）" onChange={(v) => updateJtbd(j.id, { when: v })} />
                </div>
                <div>
                  <span className="text-[10px] text-orange-700 font-bold tracking-widest">I WANT TO</span>
                  <EditableTextarea value={j.iWantTo} placeholder="（何をしたい）" onChange={(v) => updateJtbd(j.id, { iWantTo: v })} />
                </div>
                <div>
                  <span className="text-[10px] text-orange-700 font-bold tracking-widest">SO I CAN</span>
                  <EditableTextarea value={j.soI} placeholder="（最終的に何を実現したい）" onChange={(v) => updateJtbd(j.id, { soI: v })} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addJtbd} className="w-full text-sm px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700 text-slate-500 flex items-center justify-center gap-2">
            <Plus size={14} /> ジョブステートメントを追加
          </button>
        </div>
      </div>

      {/* 既存代替手段と不満 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">🔄 既存の代替手段と不満</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500">
                <th className="text-left py-2 px-3 w-1/3">代替手段</th>
                <th className="text-left py-2 px-3">不満</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {state.alternatives.map((a) => (
                <tr key={a.id} className="border-b border-slate-100">
                  <td className="py-2 px-3">
                    <EditableInput value={a.alternative} onChange={(v) => updateAlt(a.id, { alternative: v })} />
                  </td>
                  <td className="py-2 px-3">
                    <EditableInput value={a.complaint} onChange={(v) => updateAlt(a.id, { complaint: v })} />
                  </td>
                  <td className="py-2 px-3">
                    <button onClick={() => deleteAlt(a.id)} className="text-slate-300 hover:text-rose-500" title="削除">
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addAlt} className="w-full mt-2 text-xs text-slate-500 hover:bg-orange-50 hover:text-orange-700 py-2 flex items-center justify-center gap-1.5 border border-dashed border-slate-300 rounded">
          <Plus size={12} /> 代替手段を追加
        </button>
      </div>
    </div>
  );
}

// ==================== Sub-components ====================

function FrameworkCard({ framework, onUpdateScore }: { framework: Framework; onUpdateScore: (gId: string, iId: string, score: number) => void }) {
  const allItems = framework.groups.flatMap((g) => g.items);
  const avg = allItems.length > 0 ? allItems.reduce((s, i) => s + i.score, 0) / allItems.length : 0;

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{framework.emoji}</span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{framework.title}</h2>
            <p className="text-xs text-slate-500">{framework.description}</p>
            <p className="text-[10px] text-slate-400 mt-1">重み {framework.weight}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">平均スコア</div>
          <div className="text-3xl font-bold text-orange-700 tabular-nums">{avg.toFixed(2)}</div>
        </div>
      </div>

      <div className="space-y-3">
        {framework.groups.map((g) => {
          const groupAvg = g.items.length > 0 ? g.items.reduce((s, i) => s + i.score, 0) / g.items.length : 0;
          return (
            <div key={g.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-800">{g.label}</span>
                <span className="text-xs">
                  <span className="text-slate-500">平均: </span>
                  <span className="font-bold text-orange-700">{groupAvg.toFixed(2)}</span>
                </span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {g.items.map((i) => (
                    <tr key={i.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-2 px-3 w-2/5 align-top">
                        <div className="text-sm font-medium text-slate-900">{i.criterion}</div>
                      </td>
                      <td className="py-2 px-3 align-top">
                        <div className="text-xs text-slate-500 italic">{i.hint}</div>
                      </td>
                      <td className="py-2 px-3 w-24 align-top">
                        <select
                          value={i.score}
                          onChange={(e) => onUpdateScore(g.id, i.id, Number(e.target.value))}
                          className="text-sm font-bold tabular-nums px-2 py-1 border border-slate-200 rounded hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200 text-orange-700"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-bold text-slate-600 mb-1 tracking-wide">{label}</div>
      {children}
    </div>
  );
}

function SwotBox({ title, color, items, onAdd, onUpdate, onDelete }: { title: string; color: string; items: { id: string; text: string }[]; onAdd: () => void; onUpdate: (id: string, v: string) => void; onDelete: (id: string) => void }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-200",
    rose: "bg-rose-50 border-rose-200",
    sky: "bg-sky-50 border-sky-200",
    amber: "bg-amber-50 border-amber-200",
  };
  return (
    <div className={`rounded-lg p-3 border ${colorMap[color]}`}>
      <div className="text-sm font-bold text-slate-900 mb-2">{title}</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.id} className="flex items-start gap-2 group">
            <span className="text-slate-400 mt-1">•</span>
            <EditableInput value={i.text} placeholder="（記入）" onChange={(v) => onUpdate(i.id, v)} className="flex-1" />
            <button onClick={() => onDelete(i.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100">
              <Trash2 size={11} />
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onAdd} className="mt-2 text-xs text-slate-500 hover:text-orange-700 flex items-center gap-1">
        <Plus size={12} /> 追加
      </button>
    </div>
  );
}

function TowsBox({ title, hint, value, onChange, bg }: { title: string; hint: string; value: string; onChange: (v: string) => void; bg: string }) {
  return (
    <div className={`rounded-lg p-3 border border-slate-200 ${bg}`}>
      <div className="text-sm font-bold text-slate-900 mb-1">{title}</div>
      <div className="text-[10px] text-slate-500 italic mb-2">ヒント：{hint}</div>
      <EditableTextarea value={value} onChange={onChange} placeholder="（戦略を記入）" />
    </div>
  );
}

function EditableInput({ value, onChange, placeholder, className }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "（クリックで入力）"}
      className={`text-sm w-full px-2 py-1 border border-transparent rounded hover:border-slate-300 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-transparent placeholder:text-slate-300 placeholder:italic ${className ?? ""}`}
    />
  );
}

function EditableTextarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "（クリックで入力）"}
      rows={3}
      className="text-sm w-full px-2 py-1 border border-transparent rounded hover:border-slate-300 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-transparent resize-y placeholder:text-slate-300 placeholder:italic whitespace-pre-wrap"
    />
  );
}
