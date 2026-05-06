"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FlaskConical,
  Users,
  Calculator,
  GitBranch,
  Calendar,
  AlertTriangle,
  BookOpen,
  CalendarClock,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";
import { meta, goal, advantages } from "@/lib/data/v02-meta";
import { packages } from "@/lib/data/v02-channels";

const STORAGE_KEY_THEME = "lifefund-theme-v1";
const DEFAULT_THEME = { primary: "#E05B03", primaryLight: "#F08C4A" };

const positioningStyles: Record<string, { label: string; bg: string; text: string }> = {
  entry: { label: "ENTRY", bg: "bg-orange-100", text: "text-orange-700" },
  core: { label: "CORE", bg: "bg-amber-100", text: "text-amber-700" },
  premium: { label: "PREMIUM", bg: "bg-rose-100", text: "text-rose-700" },
  referral: { label: "REFERRAL", bg: "bg-cyan-100", text: "text-cyan-700" },
  hybrid: { label: "HYBRID", bg: "bg-teal-100", text: "text-teal-700" },
};

const QUICK_NAV = [
  { href: "/economics", icon: Calculator, label: "📦 商材ラインナップ", description: "Tier 0〜4 のアップセル階層", emphasize: true },
  { href: "/journey", icon: GitBranch, label: "🛤 カスタマージャーニー", description: "研究会員→上位商材への動線", emphasize: true },
  { href: "/kpi", icon: Target, label: "📊 KPIツリー", description: "会員数→アップセル率→年商" },
  { href: "/roadmap", icon: Calendar, label: "📅 ロードマップ", description: "Phase別ローンチ計画" },
  { href: "/team", icon: Users, label: "👥 チーム体制", description: "白都社長・三山さん・橋本さん" },
  { href: "/hypotheses", icon: FlaskConical, label: "🔬 仮説検証", description: "支払意志・M&Aニーズ検証" },
  { href: "/risks", icon: AlertTriangle, label: "⚠️ リスク管理", description: "影響度×発生確率" },
  { href: "/strategy", icon: BookOpen, label: "📚 戦略ドキュメント", description: "PEST/3C/SWOT/STP/JTBD" },
];

export default function Home() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_THEME);
      if (raw) setTheme({ ...DEFAULT_THEME, ...JSON.parse(raw) });
    } catch {}
    setMounted(true);
  }, []);

  const targetDate = new Date(goal.deadline);
  const now = new Date();
  const daysLeft = Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-7xl space-y-8">
      {/* ===== Header ===== */}
      <header>
        <div className="text-xs font-bold tracking-widest mb-1" style={{ color: theme.primary }}>
          LIFEFUND × 建築AI経営研究会
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{meta.title}</h1>
        <p className="text-slate-500 mt-1 text-sm">
          {meta.subtitle}・{meta.version}・更新 {meta.lastUpdated}
        </p>
      </header>

      {/* ===== Hero: ゴール ===== */}
      <div
        className="rounded-2xl p-8 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)` }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs opacity-90 tracking-widest font-bold mb-3 flex items-center gap-2">
              <Sparkles size={14} /> ゴール
            </div>
            <div className="text-4xl md:text-5xl font-bold leading-tight">
              建築×AIの<br />リーディングカンパニーへ
            </div>
            <div className="text-sm opacity-90 mt-3 max-w-xl">{goal.description}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80 mb-1 flex items-center justify-end gap-1.5">
              <CalendarClock size={12} /> 期限（仮）
            </div>
            <div className="text-xl font-bold tabular-nums">{goal.deadline}</div>
            {mounted && daysLeft > 0 && (
              <div className="text-xs opacity-90 mt-1 tabular-nums">
                残り {daysLeft.toLocaleString()} 日
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== クイックナビ ===== */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-700 tracking-wide">📂 各ページへ</h2>
          <Link href="/settings" className="text-xs text-slate-500 hover:text-slate-900">
            設定 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                  item.emphasize ? "border-orange-200 bg-orange-50/30" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2 shrink-0 ${item.emphasize ? "" : "bg-slate-100"}`}
                    style={item.emphasize ? { background: `${theme.primary}15` } : {}}
                  >
                    <Icon size={18} style={{ color: item.emphasize ? theme.primary : "#475569" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-slate-300 group-hover:text-slate-600 transition-colors mt-1.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== 主要KPI（仮置き） ===== */}
      <section>
        <h2 className="text-sm font-bold text-slate-700 tracking-wide mb-3">📊 主要KPI（仮置き・要確定）</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard
            label="年商目標"
            value="1.2"
            unit="億円"
            sub="2027/04 想定"
            color={theme.primary}
            icon={<TrendingUp size={14} />}
          />
          <KpiCard
            label="研究会員数"
            value="30"
            unit="社"
            sub="月4万円・既存"
            color="#059669"
          />
          <KpiCard
            label="アップセル率（目標）"
            value="30"
            unit="%"
            sub="Tier 1 への遷移"
            color="#0284c7"
          />
          <KpiCard
            label="商材階層"
            value="6"
            unit="種"
            sub="Tier 0〜4 + スポット"
            color="#d97706"
          />
        </div>
      </section>

      {/* ===== 3つの差別化レバー ===== */}
      <section>
        <h2 className="text-sm font-bold text-slate-700 tracking-wide mb-3">🎯 3つの差別化レバー</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {advantages.map((a, i) => (
            <div
              key={i}
              className="rounded-xl border-l-4 border border-slate-200 bg-white p-4"
              style={{ borderLeftColor: theme.primary }}
            >
              <div className="text-xs font-bold mb-2" style={{ color: theme.primary }}>
                レバー {i + 1}
              </div>
              <div className="text-base font-bold text-slate-900 mb-2">{a.title}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{a.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 商材ラインナップ サマリー ===== */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calculator size={18} style={{ color: theme.primary }} />
            商材ラインナップ サマリー
          </h2>
          <Link
            href="/economics"
            className="text-xs hover:underline flex items-center gap-1"
            style={{ color: theme.primary }}
          >
            詳細・編集へ <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-2">
          {packages.map((p) => {
            const style = positioningStyles[p.positioning] ?? positioningStyles.core;
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0"
              >
                <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded ${style.bg} ${style.text} shrink-0 w-[72px] text-center`}>
                  {style.label}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">{p.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 truncate">{p.target}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-mono font-bold text-slate-900">{p.price}</div>
                  <div className="text-[10px] text-slate-500">{p.duration}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Footer info ===== */}
      <footer className="text-xs text-slate-400 text-center py-4">
        建築AI経営研究会 アップセル戦略 / Last updated {meta.lastUpdated} / © 株式会社LIFEFUND
      </footer>
    </div>
  );
}

function KpiCard({
  label,
  value,
  unit,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string;
  unit: string;
  sub: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tabular-nums" style={{ color }}>
          {value}
        </span>
        <span className="text-sm text-slate-500">{unit}</span>
      </div>
      <div className="text-[11px] text-slate-500 mt-1">{sub}</div>
    </div>
  );
}
