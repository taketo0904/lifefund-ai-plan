"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Calculator,
  GitBranch,
  FlaskConical,
  Scale,
  AlertTriangle,
  BookOpen,
  Users,
  Target,
  Settings,
  GripVertical,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  emphasize?: boolean;
};

const DEFAULT_ITEMS: NavItem[] = [
  { href: "/", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/economics", label: "📦 商材ラインナップ", icon: Calculator, emphasize: true },
  { href: "/journey", label: "🛤 カスタマージャーニー", icon: GitBranch, emphasize: true },
  { href: "/kpi", label: "📊 KPIツリー", icon: Target },
  { href: "/roadmap", label: "📅 ロードマップ", icon: Calendar },
  { href: "/team", label: "👥 チーム体制", icon: Users },
  { href: "/hypotheses", label: "🔬 仮説検証", icon: FlaskConical },
  { href: "/risks", label: "⚠️ リスク管理", icon: AlertTriangle },
  { href: "/strategy", label: "📚 戦略ドキュメント", icon: BookOpen },
];

const STORAGE_KEY_ORDER = "lifefund-nav-order-v1";
const STORAGE_KEY_THEME = "lifefund-theme-v1";

export const DEFAULT_THEME = {
  primary: "#E05B03",
  primaryLight: "#F08C4A",
};

export function Nav() {
  const pathname = usePathname();
  const [items, setItems] = useState<NavItem[]>(DEFAULT_ITEMS);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load saved order + theme
  useEffect(() => {
    try {
      const orderRaw = localStorage.getItem(STORAGE_KEY_ORDER);
      if (orderRaw) {
        const order: string[] = JSON.parse(orderRaw);
        const map = new Map(DEFAULT_ITEMS.map((i) => [i.href, i]));
        const ordered: NavItem[] = [];
        order.forEach((href) => {
          const item = map.get(href);
          if (item) {
            ordered.push(item);
            map.delete(href);
          }
        });
        // Add any new items not in stored order
        map.forEach((item) => ordered.push(item));
        setItems(ordered);
      }

      const themeRaw = localStorage.getItem(STORAGE_KEY_THEME);
      if (themeRaw) {
        const t = JSON.parse(themeRaw);
        setTheme({ ...DEFAULT_THEME, ...t });
      }
    } catch {}
    setMounted(true);
  }, []);

  // Save order
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(items.map((i) => i.href)));
      } catch {}
    }
  }, [items, mounted]);

  // Drag handlers
  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    setOverIdx(idx);
  };
  const handleDrop = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) {
      setDraggedIdx(null);
      setOverIdx(null);
      return;
    }
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(draggedIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDraggedIdx(null);
    setOverIdx(null);
  };
  const handleDragEnd = () => {
    setDraggedIdx(null);
    setOverIdx(null);
  };

  return (
    <nav className="w-72 shrink-0 border-r border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto">
      <div
        className="p-5 border-b border-slate-200"
        style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)` }}
      >
        <div className="text-xs text-orange-100 mb-1 tracking-widest font-bold">LIFEFUND × 建築AI</div>
        <div className="font-bold text-white text-lg">経営研究会 アップセル戦略</div>
        <div className="text-xs text-orange-100 mt-1">v0.1・建築×AIのリーディングカンパニーへ</div>
      </div>

      <div className="py-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isDragging = draggedIdx === idx;
          const isOver = overIdx === idx && !isDragging;

          return (
            <div
              key={item.href}
              draggable
              onDragStart={handleDragStart(idx)}
              onDragOver={handleDragOver(idx)}
              onDrop={handleDrop(idx)}
              onDragEnd={handleDragEnd}
              className={`relative group ${isOver ? "border-t-2 border-orange-400" : ""} ${isDragging ? "opacity-30" : ""}`}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-2 pl-2 pr-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-700 border-l-2 border-orange-500 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600"
                  title="ドラッグして並び替え"
                  onClick={(e) => e.preventDefault()}
                >
                  <GripVertical size={12} />
                </span>
                <Icon size={16} />
                <span>{item.label}</span>
                {item.emphasize && !isActive && (
                  <span className="ml-auto text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">ホット</span>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-slate-200 mt-2">
        <Link
          href="/settings"
          className={`flex items-center gap-2 text-sm py-2 transition-colors ${
            pathname === "/settings" ? "text-orange-700 font-medium" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Settings size={14} />
          <span>設定</span>
        </Link>
      </div>

      <div className="p-5 border-t border-slate-200">
        <div className="text-xs text-slate-500 leading-relaxed">
          🎯 ゴール<br />
          <span className="font-bold text-base" style={{ color: theme.primary }}>建築×AIの<br />リーディングカンパニー</span>
        </div>
      </div>

      <div className="p-5 mt-2">
        <a
          href="https://www.notion.so/33f959fe811f81ae8d1ae859dc5ea2a7"
          target="_blank"
          rel="noopener"
          className="block text-xs hover:underline"
          style={{ color: theme.primary }}
        >
          📘 Notion LIFEFUNDハブ →
        </a>
      </div>
    </nav>
  );
}
