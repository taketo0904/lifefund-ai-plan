"use client";

import { useEffect, useState } from "react";
import { Palette, RotateCcw, Database, AlertTriangle } from "lucide-react";

const STORAGE_KEY_THEME = "lifefund-theme-v1";
const STORAGE_KEY_NAV_ORDER = "lifefund-nav-order-v1";

const DEFAULT_THEME = {
  primary: "#E05B03",
  primaryLight: "#F08C4A",
};

const PRESET_THEMES = [
  { name: "マゼンタ（標準）", primary: "#E05B03", primaryLight: "#F08C4A" },
  { name: "パープル", primary: "#7e22ce", primaryLight: "#a855f7" },
  { name: "ブルー", primary: "#1e40af", primaryLight: "#3b82f6" },
  { name: "ティール", primary: "#0d9488", primaryLight: "#14b8a6" },
  { name: "エメラルド", primary: "#047857", primaryLight: "#10b981" },
  { name: "アンバー", primary: "#b45309", primaryLight: "#f59e0b" },
  { name: "ローズ", primary: "#be123c", primaryLight: "#f43f5e" },
  { name: "ダークグレー", primary: "#1f2937", primaryLight: "#475569" },
];

// 全ストレージキー一覧（リセット時の対象）
const ALL_STORAGE_KEYS = [
  { key: STORAGE_KEY_THEME, label: "テーマカラー", page: "全体" },
  { key: STORAGE_KEY_NAV_ORDER, label: "ナビゲーション順序", page: "全体" },
  { key: "shift-ai-poc-tasks-v1", label: "POCタスク", page: "タスク管理シート" },
  { key: "shift-ai-poc-settings-v1", label: "POC設定", page: "タスク管理シート" },
  { key: "shift-ai-hypotheses-v1", label: "5仮説検証", page: "仮説検証" },
  { key: "shift-ai-team-members-v1", label: "チームメンバー", page: "チーム体制" },
  { key: "shift-ai-team-phases-v1", label: "チームフェーズ", page: "チーム体制" },
  { key: "lifefund-economics-packages-v1", label: "商材パッケージ", page: "商材ラインナップ" },
  { key: "shift-ai-kpi-funnel-v1", label: "KPIファネル", page: "KPIツリー" },
  { key: "shift-ai-kpi-kgi-v1", label: "KGI", page: "KPIツリー" },
  { key: "shift-ai-kpi-core-v1", label: "主要KPI", page: "KPIツリー" },
  { key: "shift-ai-roadmap-v1", label: "ロードマップ", page: "ロードマップ" },
  { key: "shift-ai-risks-v1", label: "リスク管理", page: "リスク管理" },
  { key: "shift-ai-strategy-v2", label: "戦略ドキュメント", page: "戦略ドキュメント" },
];

type Theme = { primary: string; primaryLight: string };

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_THEME);
      if (raw) setTheme({ ...DEFAULT_THEME, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(theme));
      } catch {}
    }
  }, [theme, loaded]);

  const applyPreset = (preset: { primary: string; primaryLight: string }) => {
    setTheme({ primary: preset.primary, primaryLight: preset.primaryLight });
    setTimeout(() => window.location.reload(), 200); // reload to apply theme to nav
  };

  const updateColor = (which: "primary" | "primaryLight", value: string) => {
    setTheme((prev) => ({ ...prev, [which]: value }));
  };

  const applyManual = () => {
    window.location.reload();
  };

  const resetTheme = () => {
    if (confirm("テーマカラーを標準に戻します。よろしいですか？")) {
      setTheme(DEFAULT_THEME);
      setTimeout(() => window.location.reload(), 200);
    }
  };

  const resetNavOrder = () => {
    if (confirm("ナビゲーション順序を初期化しますか？")) {
      try {
        localStorage.removeItem(STORAGE_KEY_NAV_ORDER);
      } catch {}
      window.location.reload();
    }
  };

  const resetAllData = () => {
    if (
      !confirm(
        "全ての編集データを削除します。\n（タスク・仮説・チーム・商材・KPI・ロードマップ・リスク・戦略すべて）\n本当によろしいですか？",
      )
    )
      return;
    if (!confirm("⚠️ 本当に全消去します。元に戻せません。続行しますか？")) return;
    try {
      ALL_STORAGE_KEYS.forEach(({ key }) => localStorage.removeItem(key));
      // legal-doc keys also clean
      Object.keys(localStorage)
        .filter((k) => k.startsWith("shift-ai-legal-doc-"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {}
    window.location.reload();
  };

  if (!loaded) return <div className="max-w-4xl text-slate-400 text-sm">読み込み中...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">⚙️ 設定</h1>
        <p className="text-slate-500 mt-1 text-sm">テーマ・ナビ順序・データ管理</p>
      </header>

      {/* テーマカラー */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Palette size={18} className="text-orange-700" />
          <h2 className="text-base font-bold text-slate-900">テーマカラー</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          ナビゲーションヘッダーのグラデーション・年商表示・Notionリンクの色に反映されます。
        </p>

        {/* Preview */}
        <div className="mb-5">
          <div className="text-xs text-slate-500 mb-2">プレビュー</div>
          <div
            className="rounded-lg p-4 text-white"
            style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)` }}
          >
            <div className="text-xs opacity-90 tracking-widest font-bold">SAMPLE</div>
            <div className="font-bold text-lg">SHIFT AI 事業計画</div>
            <div className="text-xs opacity-90 mt-1">テーマカラー反映プレビュー</div>
          </div>
        </div>

        {/* Preset palette */}
        <div className="mb-5">
          <div className="text-xs text-slate-700 font-bold mb-2">プリセット</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PRESET_THEMES.map((p) => {
              const isActive = p.primary === theme.primary;
              return (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className={`p-2 rounded-lg border text-left transition-all hover:scale-105 ${isActive ? "border-orange-500 ring-2 ring-orange-200" : "border-slate-200"}`}
                >
                  <div
                    className="rounded h-8 w-full"
                    style={{ background: `linear-gradient(135deg, ${p.primary} 0%, ${p.primaryLight} 100%)` }}
                  />
                  <div className="text-xs text-slate-700 mt-1">{p.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Manual color picker */}
        <div>
          <div className="text-xs text-slate-700 font-bold mb-2">カスタム（任意の色）</div>
          <div className="grid md:grid-cols-2 gap-3">
            <ColorRow
              label="プライマリ（メインカラー）"
              value={theme.primary}
              onChange={(v) => updateColor("primary", v)}
            />
            <ColorRow
              label="プライマリライト（グラデ右側）"
              value={theme.primaryLight}
              onChange={(v) => updateColor("primaryLight", v)}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={applyManual}
              className="text-xs px-4 py-2 rounded text-white"
              style={{ background: theme.primary }}
            >
              適用してリロード
            </button>
            <button
              onClick={resetTheme}
              className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600"
            >
              <RotateCcw size={12} /> 標準に戻す
            </button>
          </div>
        </div>
      </div>

      {/* ナビ順序 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-2">📑 ナビゲーション順序</h2>
        <p className="text-xs text-slate-500 mb-3">
          サイドバーのメニューはドラッグで並び替えできます。各メニュー項目にホバーすると左側に
          グリップ（≡）が出るので、それをドラッグしてください。
        </p>
        <p className="text-xs text-slate-500 mb-3">
          並び替えはブラウザに保存されます。標準順序に戻すには下のボタンを押してください。
        </p>
        <button
          onClick={resetNavOrder}
          className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600"
        >
          <RotateCcw size={12} /> ナビ順序を標準に戻す
        </button>
      </div>

      {/* データ管理 */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Database size={18} className="text-slate-700" />
          <h2 className="text-base font-bold text-slate-900">データ管理</h2>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          このダッシュボードの編集内容はすべてブラウザの localStorage に保存されています。
        </p>

        <div className="rounded-lg border border-slate-200 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                <th className="text-left py-2 px-3 font-medium">データ</th>
                <th className="text-left py-2 px-3 font-medium">対応ページ</th>
              </tr>
            </thead>
            <tbody>
              {ALL_STORAGE_KEYS.map((s) => (
                <tr key={s.key} className="border-b border-slate-100 last:border-0">
                  <td className="py-2 px-3 text-slate-700">{s.label}</td>
                  <td className="py-2 px-3 text-xs text-slate-500">{s.page}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-3 text-slate-700">法務書類詳細（11書類）</td>
                <td className="py-2 px-3 text-xs text-slate-500">11法務書類</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 危険ゾーン */}
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle size={16} className="text-rose-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-bold text-rose-700">危険ゾーン</div>
              <div className="text-xs text-rose-600">
                すべての編集データを一括削除します。元に戻せません。
              </div>
            </div>
          </div>
          <button
            onClick={resetAllData}
            className="text-xs px-3 py-2 rounded bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> すべての編集データを削除
          </button>
        </div>
      </div>
    </div>
  );
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-[11px] text-slate-600 mb-1">{label}</div>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-14 rounded cursor-pointer border border-slate-200"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-sm font-mono border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
        />
      </div>
    </div>
  );
}
