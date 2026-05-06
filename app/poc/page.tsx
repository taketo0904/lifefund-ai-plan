"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, RotateCcw, ChevronDown, ChevronRight, Settings, Calendar as CalendarIcon, ListChecks, CalendarDays } from "lucide-react";
import {
  pocBasics,
  pocTargets,
  pocMonthly,
  pocActions,
  pocRisks,
  pocPending,
  detailedPocTasks as defaultPocTasks,
  pocProjectDefaults,
  type DetailedPocTask,
  type PocPhase,
  type PocTaskStatus,
} from "@/lib/data/v02-poc";

const STORAGE_KEY_TASKS = "shift-ai-poc-tasks-v1";
const STORAGE_KEY_SETTINGS = "shift-ai-poc-settings-v1";

const STATUSES: { value: PocTaskStatus; label: string; bg: string; text: string }[] = [
  { value: "todo", label: "未着手", bg: "bg-slate-100", text: "text-slate-700" },
  { value: "doing", label: "進行中", bg: "bg-sky-100", text: "text-sky-700" },
  { value: "done", label: "完了", bg: "bg-emerald-100", text: "text-emerald-700" },
  { value: "blocked", label: "ブロック", bg: "bg-rose-100", text: "text-rose-700" },
];

const PHASES: { value: PocPhase; label: string; bg: string; text: string }[] = [
  { value: "phase0", label: "Phase 0", bg: "bg-orange-100", text: "text-orange-700" },
  { value: "phase0_5", label: "Phase 0.5", bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
  { value: "phase1", label: "Phase 1", bg: "bg-purple-100", text: "text-purple-700" },
];

const PHASE_DOT: Record<PocPhase, string> = {
  phase0: "bg-orange-500",
  phase0_5: "bg-fuchsia-500",
  phase1: "bg-purple-500",
};

const STATUS_DOT: Record<PocTaskStatus, string> = {
  todo: "bg-slate-300",
  doing: "bg-sky-500",
  done: "bg-emerald-500",
  blocked: "bg-rose-500",
};

const severityColors: Record<string, { bg: string; text: string }> = {
  高: { bg: "bg-rose-100", text: "text-rose-700" },
  中: { bg: "bg-amber-100", text: "text-amber-700" },
  低: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

type ViewMode = "week" | "calendar" | "list";

type Settings = {
  projectName: string;
  startDate: string; // ISO YYYY-MM-DD
  viewMode: ViewMode;
};

const DEFAULT_SETTINGS: Settings = {
  projectName: pocProjectDefaults.projectName,
  startDate: pocProjectDefaults.startDate,
  viewMode: "calendar",
};

// ===== Date utilities =====
function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function parseISO(iso: string): Date {
  return new Date(iso + "T00:00:00");
}
function fmtMD(iso: string): string {
  const d = parseISO(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
function fmtMonthLabel(year: number, month: number): string {
  return `${year}年${month + 1}月`;
}

export default function PocPage() {
  const [tasks, setTasks] = useState<DetailedPocTask[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const rawTasks = localStorage.getItem(STORAGE_KEY_TASKS);
      const rawSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (rawTasks) {
        const parsed = JSON.parse(rawTasks);
        if (Array.isArray(parsed) && parsed.length > 0) setTasks(parsed);
        else setTasks([...defaultPocTasks]);
      } else {
        setTasks([...defaultPocTasks]);
      }
      if (rawSettings) {
        const s = JSON.parse(rawSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...s });
      }
    } catch {
      setTasks([...defaultPocTasks]);
    }
    setLoaded(true);
  }, []);

  // Save tasks
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
      } catch {}
    }
  }, [tasks, loaded]);

  // Save settings
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
      } catch {}
    }
  }, [settings, loaded]);

  // Compute due date for a task (use explicit dueDate if set, else startDate + (week-1)*7)
  const getDueDate = (task: DetailedPocTask): string => {
    if (task.dueDate) return task.dueDate;
    const start = parseISO(settings.startDate);
    return isoDate(addDays(start, (task.week - 1) * 7));
  };

  // ===== mutations =====
  const updateTask = (id: string, patch: Partial<DetailedPocTask>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  const addTask = (week: number, dueDate?: string) => {
    const newTask: DetailedPocTask = {
      id: `pNew${Date.now()}`,
      week,
      phase: week <= 3 ? "phase0_5" : "phase1",
      title: "新しいタスク",
      detail: "",
      owner: "",
      status: "todo",
      dueDate,
    };
    setTasks((prev) => [...prev, newTask]);
  };
  const resetAll = () => {
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setTasks([...defaultPocTasks]);
      setSettings(DEFAULT_SETTINGS);
    }
  };

  // ===== summary =====
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const doing = tasks.filter((t) => t.status === "doing").length;
    const blocked = tasks.filter((t) => t.status === "blocked").length;
    return { total, done, doing, blocked };
  }, [tasks]);

  // Tasks with computed dueDate
  const tasksWithDate = useMemo(() => {
    return tasks.map((t) => ({ ...t, _due: getDueDate(t) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, settings.startDate]);

  if (!loaded) {
    return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;
  }

  return (
    <div className="max-w-7xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">📋 タスク管理シート / {settings.projectName}</h1>
        <p className="text-slate-500 mt-1 text-sm">
          POC計画 + W1-12 全体WBS統合管理 / 開始日：{settings.startDate} / 期間 12週間
        </p>
        <p className="text-slate-400 text-xs mt-1">
          ※ クリックで編集 / 編集はブラウザに自動保存
        </p>
      </header>

      {/* ① 基本設計 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">① POC基本設計</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Field label="第一目的" value={pocBasics.goal} highlight />
          <Field label="POC商材" value={pocBasics.product} />
          <Field label="価格" value={`${pocBasics.price}万円 / ${pocBasics.duration}`} highlight />
          <Field label="アサイン" value={pocBasics.staffing} />
          <Field label="判定方式" value={pocBasics.judgmentMethod} />
          <Field label="PM体制" value={pocBasics.pm} />
          <div className="md:col-span-2 rounded-lg bg-orange-50 border-l-4 border-orange-500 p-3">
            <div className="text-xs text-orange-700 font-bold tracking-widest mb-1">
              本契約への動線
            </div>
            <div className="text-sm text-slate-800">{pocBasics.conversionPath}</div>
          </div>
        </div>
      </div>

      {/* ② 数値目標 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">② 3ヶ月の数値目標</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="POC受注件数" value={`${pocTargets.pocCount.min}-${pocTargets.pocCount.max}`} unit="件 / 3ヶ月" color="#E05B03" light="#f6e9f0" />
          <Stat label="転換率" value={`${pocTargets.conversionRate.min}-${pocTargets.conversionRate.max}`} unit="%" color="#c026d3" light="#f5e3f8" />
          <Stat label="本契約獲得" value={`${pocTargets.contractCount.min}-${pocTargets.contractCount.max}`} unit="件（3ヶ月目末）" color="#7e22ce" light="#ebdbf5" />
          <Stat label="月次売上ペース" value={String(pocTargets.monthlyRunRate)} unit="万 / 月（本契約のみ）" color="#E05B03" light="#f6e9f0" highlight />
        </div>
      </div>

      {/* ③ タスク管理（カレンダー設定 + ビュー切替 + タスクシート） */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between gap-3 flex-wrap border-b border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">③ 詳細タスクシート</h2>
            <p className="text-xs text-slate-500 mt-1">
              全{stats.total} ／ 完了{stats.done} ／ 進行中{stats.doing} ／ ブロック{stats.blocked}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* View mode toggle */}
            <div className="flex border border-slate-300 rounded overflow-hidden">
              <ViewBtn active={settings.viewMode === "calendar"} onClick={() => setSettings({ ...settings, viewMode: "calendar" })} icon={<CalendarIcon size={12} />} label="カレンダー" />
              <ViewBtn active={settings.viewMode === "list"} onClick={() => setSettings({ ...settings, viewMode: "list" })} icon={<ListChecks size={12} />} label="リスト" />
              <ViewBtn active={settings.viewMode === "week"} onClick={() => setSettings({ ...settings, viewMode: "week" })} icon={<CalendarDays size={12} />} label="週単位" />
            </div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`text-xs px-3 py-1.5 rounded border flex items-center gap-1.5 ${settingsOpen ? "bg-slate-100 border-slate-400" : "border-slate-300 hover:bg-slate-50"} text-slate-600`}
            >
              <Settings size={12} /> 設定
            </button>
            <button onClick={resetAll} className="text-xs px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
              <RotateCcw size={12} /> リセット
            </button>
          </div>
        </div>

        {/* Settings panel */}
        {settingsOpen && (
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1">プロジェクト名</label>
                <input
                  type="text"
                  value={settings.projectName}
                  onChange={(e) => setSettings({ ...settings, projectName: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">プロジェクト開始日（W1の起点）</label>
                <input
                  type="date"
                  value={settings.startDate}
                  onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              ※ 開始日を変えると、各タスクの期日（明示的に指定されていないもの）が自動再計算されます。
            </p>
          </div>
        )}

        {/* View body */}
        {settings.viewMode === "calendar" && (
          <CalendarView
            tasks={tasksWithDate}
            startDate={settings.startDate}
            onUpdate={updateTask}
            onAdd={addTask}
            onDelete={deleteTask}
          />
        )}
        {settings.viewMode === "list" && (
          <ListView
            tasks={tasksWithDate}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onAdd={addTask}
          />
        )}
        {settings.viewMode === "week" && (
          <WeekView
            tasks={tasksWithDate}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            startDate={settings.startDate}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onAdd={addTask}
          />
        )}
      </div>

      {/* ④ 月次売上推移 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">
          ④ 月次売上推移（中庸シナリオ：転換率35%想定）
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs">
                <th className="text-left py-2 px-3">月</th>
                <th className="text-left py-2 px-3">期間</th>
                <th className="text-right py-2 px-3">POC受注</th>
                <th className="text-right py-2 px-3">本契約</th>
                <th className="text-right py-2 px-3">POC売上</th>
                <th className="text-right py-2 px-3">本契約売上</th>
                <th className="text-right py-2 px-3 font-bold text-orange-700">月次売上合計</th>
              </tr>
            </thead>
            <tbody>
              {pocMonthly.map((m) => (
                <tr key={m.month} className={`border-b border-slate-100 ${m.highlight ? "bg-orange-50" : ""}`}>
                  <td className="py-3 px-3 font-bold text-slate-900">{m.label}</td>
                  <td className="py-3 px-3 text-xs text-slate-500">{m.weeks}</td>
                  <td className="py-3 px-3 text-right tabular-nums">{m.pocCount}</td>
                  <td className="py-3 px-3 text-right tabular-nums">{m.contractCount}</td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700">{m.pocRevenue}万</td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700">{m.contractRevenue}万</td>
                  <td className={`py-3 px-3 text-right tabular-nums text-base ${m.highlight ? "font-bold text-orange-700" : "font-bold text-slate-900"}`}>
                    {m.totalRevenue}万
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⑤ Top 5 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">⑤ アクションアイテム（Top 5）</h2>
        <div className="space-y-2">
          {pocActions.map((a) => (
            <div key={a.num} className="border border-slate-200 rounded-lg p-3 flex items-start gap-3">
              <div className="rounded-full bg-orange-700 text-white w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                {a.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-bold text-slate-900">{a.title}</span>
                  <span className="badge bg-orange-100 text-orange-700">{a.deadline}</span>
                </div>
                <div className="text-xs text-slate-700">{a.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⑥ Risks */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">⑥ リスクと対策</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs">
                <th className="text-left py-2 px-3 w-24">深刻度</th>
                <th className="text-left py-2 px-3 w-2/5">リスク</th>
                <th className="text-left py-2 px-3">対策</th>
              </tr>
            </thead>
            <tbody>
              {pocRisks.map((r, i) => {
                const sev = severityColors[r.severity];
                return (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3 px-3">
                      <span className={`badge ${sev.bg} ${sev.text}`}>{r.severity}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-900 font-medium">{r.risk}</td>
                    <td className="py-3 px-3 text-slate-700 text-xs">{r.mitigation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending */}
      <div className="card bg-amber-50 border-amber-200">
        <h2 className="text-base font-bold text-slate-900 mb-2">⏳ 保留事項（別途詰める）</h2>
        <ul className="text-sm space-y-1">
          {pocPending.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-700">
              <span className="text-amber-600">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ====== Views ======

type TaskWithDate = DetailedPocTask & { _due: string };

function CalendarView({
  tasks,
  startDate,
  onUpdate,
  onAdd,
  onDelete,
}: {
  tasks: TaskWithDate[];
  startDate: string;
  onUpdate: (id: string, patch: Partial<DetailedPocTask>) => void;
  onAdd: (week: number, dueDate?: string) => void;
  onDelete: (id: string) => void;
}) {
  const start = parseISO(startDate);
  const end = addDays(start, 12 * 7); // 12週後

  // Determine months covered
  const months: { year: number; month: number }[] = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= lastMonth) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  // Map tasks by date
  const tasksByDate = new Map<string, TaskWithDate[]>();
  tasks.forEach((t) => {
    const list = tasksByDate.get(t._due) ?? [];
    list.push(t);
    tasksByDate.set(t._due, list);
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedTasks = selectedDate ? tasksByDate.get(selectedDate) ?? [] : [];

  return (
    <div className="px-5 py-4">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {months.map((m) => (
          <MonthCalendar
            key={`${m.year}-${m.month}`}
            year={m.year}
            month={m.month}
            tasksByDate={tasksByDate}
            startDate={start}
            endDate={end}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        ))}
      </div>

      {/* Date detail panel */}
      <div className="border-t border-slate-200 pt-4 mt-2">
        {selectedDate ? (
          <DateDetailPanel
            date={selectedDate}
            tasks={selectedTasks}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAddTask={() => {
              const start = parseISO(startDate);
              const target = parseISO(selectedDate);
              const diffDays = Math.floor((target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
              const week = Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1));
              onAdd(week, selectedDate);
            }}
          />
        ) : (
          <p className="text-xs text-slate-500 text-center py-4">
            📅 日付をクリックすると、その日のタスクが表示されます
          </p>
        )}
      </div>
    </div>
  );
}

function MonthCalendar({
  year,
  month,
  tasksByDate,
  startDate,
  endDate,
  selectedDate,
  onSelectDate,
}: {
  year: number;
  month: number;
  tasksByDate: Map<string, TaskWithDate[]>;
  startDate: Date;
  endDate: Date;
  selectedDate: string | null;
  onSelectDate: (d: string) => void;
}) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay(); // 0=Sun
  const daysInMonth = lastDay.getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">
        {fmtMonthLabel(year, month)}
      </div>
      <div className="grid grid-cols-7 text-[10px] text-slate-500 bg-slate-50 border-b border-slate-200">
        {weekdayLabels.map((w, i) => (
          <div key={i} className={`text-center py-1 ${i === 0 ? "text-rose-600" : i === 6 ? "text-sky-600" : ""}`}>
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="bg-slate-50/50 min-h-[60px] border-r border-b border-slate-100 last:border-r-0" />;
          const iso = isoDate(d);
          const isInRange = d >= startDate && d <= endDate;
          const dayTasks = tasksByDate.get(iso) ?? [];
          const isSelected = selectedDate === iso;
          const dow = d.getDay();
          return (
            <button
              key={i}
              onClick={() => onSelectDate(iso)}
              className={`min-h-[60px] p-1 border-r border-b border-slate-100 last:border-r-0 text-left hover:bg-orange-50 transition-colors ${isSelected ? "bg-orange-100 ring-2 ring-orange-300" : ""} ${!isInRange ? "bg-slate-50/30" : ""}`}
            >
              <div className={`text-[10px] font-medium ${dow === 0 ? "text-rose-600" : dow === 6 ? "text-sky-600" : "text-slate-700"} ${!isInRange ? "opacity-50" : ""}`}>
                {d.getDate()}
              </div>
              <div className="space-y-0.5 mt-0.5">
                {dayTasks.slice(0, 3).map((t) => (
                  <div key={t.id} className="flex items-center gap-1 text-[9px] truncate">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${PHASE_DOT[t.phase]}`} />
                    <span className={`truncate ${t.status === "done" ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {t.title}
                    </span>
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-[9px] text-slate-500">+{dayTasks.length - 3}件</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateDetailPanel({
  date,
  tasks,
  onUpdate,
  onDelete,
  onAddTask,
}: {
  date: string;
  tasks: TaskWithDate[];
  onUpdate: (id: string, patch: Partial<DetailedPocTask>) => void;
  onDelete: (id: string) => void;
  onAddTask: () => void;
}) {
  const d = parseISO(date);
  const weekdayJa = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];

  return (
    <div className="px-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900">
          📅 {date}（{weekdayJa}） — {tasks.length}件
        </h3>
        <button
          onClick={onAddTask}
          className="text-xs px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-1.5"
        >
          <Plus size={12} /> この日にタスク追加
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4">この日にはタスクがありません</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-slate-500 border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-2 px-3 font-medium w-24">Phase</th>
                <th className="text-left py-2 px-3 font-medium">タスク</th>
                <th className="text-left py-2 px-3 font-medium">詳細</th>
                <th className="text-left py-2 px-3 font-medium w-32">期日</th>
                <th className="text-left py-2 px-3 font-medium w-32">担当</th>
                <th className="text-left py-2 px-3 font-medium w-28">ステータス</th>
                <th className="text-left py-2 px-3 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <PocRow key={t.id} task={t} onUpdate={(p) => onUpdate(t.id, p)} onDelete={() => onDelete(t.id)} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ListView({
  tasks,
  collapsed,
  setCollapsed,
  onUpdate,
  onDelete,
  onAdd,
}: {
  tasks: TaskWithDate[];
  collapsed: Record<string, boolean>;
  setCollapsed: (v: Record<string, boolean>) => void;
  onUpdate: (id: string, patch: Partial<DetailedPocTask>) => void;
  onDelete: (id: string) => void;
  onAdd: (week: number, dueDate?: string) => void;
}) {
  // Group by date (YYYY-MM-DD)
  const grouped = useMemo(() => {
    const map = new Map<string, TaskWithDate[]>();
    tasks.forEach((t) => {
      const list = map.get(t._due) ?? [];
      list.push(t);
      map.set(t._due, list);
    });
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
  }, [tasks]);

  const toggle = (key: string) => setCollapsed({ ...collapsed, [key]: !collapsed[key] });

  return (
    <div className="divide-y divide-slate-200">
      {grouped.length === 0 ? (
        <div className="px-5 py-8 text-center text-xs text-slate-400">タスクがありません</div>
      ) : (
        grouped.map(([date, list]) => {
          const isCollapsed = collapsed[date];
          const doneCnt = list.filter((t) => t.status === "done").length;
          const d = parseISO(date);
          const wd = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
          return (
            <div key={date}>
              <button
                onClick={() => toggle(date)}
                className="w-full px-5 py-2.5 flex items-center gap-3 bg-slate-50/50 hover:bg-slate-100 text-left"
              >
                {isCollapsed ? <ChevronRight size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
                <span className="font-bold text-slate-900 text-sm font-mono">{fmtMD(date)}</span>
                <span className="text-xs text-slate-500">（{wd}）</span>
                <span className="text-[11px] text-slate-400">{date}</span>
                <span className="ml-auto flex items-center gap-2 text-xs">
                  <span className="text-slate-500">{list.length}件</span>
                  <span className="text-emerald-600 font-mono">{doneCnt}/{list.length} ✓</span>
                </span>
              </button>
              {!isCollapsed && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[10px] text-slate-500 border-b border-slate-100 bg-slate-50/30">
                        <th className="text-left py-2 px-3 font-medium w-24">Phase</th>
                        <th className="text-left py-2 px-3 font-medium">タスク</th>
                        <th className="text-left py-2 px-3 font-medium">詳細</th>
                        <th className="text-left py-2 px-3 font-medium w-32">期日</th>
                        <th className="text-left py-2 px-3 font-medium w-32">担当</th>
                        <th className="text-left py-2 px-3 font-medium w-28">ステータス</th>
                        <th className="text-left py-2 px-3 font-medium w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((t) => (
                        <PocRow key={t.id} task={t} onUpdate={(p) => onUpdate(t.id, p)} onDelete={() => onDelete(t.id)} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

function WeekView({
  tasks,
  collapsed,
  setCollapsed,
  startDate,
  onUpdate,
  onDelete,
  onAdd,
}: {
  tasks: TaskWithDate[];
  collapsed: Record<string, boolean>;
  setCollapsed: (v: Record<string, boolean>) => void;
  startDate: string;
  onUpdate: (id: string, patch: Partial<DetailedPocTask>) => void;
  onDelete: (id: string) => void;
  onAdd: (week: number, dueDate?: string) => void;
}) {
  const grouped = useMemo(() => {
    const map = new Map<number, TaskWithDate[]>();
    for (let w = 1; w <= 12; w++) map.set(w, []);
    tasks.forEach((t) => {
      const list = map.get(t.week) ?? [];
      list.push(t);
      map.set(t.week, list);
    });
    return map;
  }, [tasks]);

  const toggle = (key: string) => setCollapsed({ ...collapsed, [key]: !collapsed[key] });

  const start = parseISO(startDate);

  return (
    <div className="divide-y divide-slate-200">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => {
        const list = grouped.get(w) ?? [];
        const key = `w${w}`;
        const isCollapsed = collapsed[key];
        const doneCnt = list.filter((t) => t.status === "done").length;
        const weekStart = addDays(start, (w - 1) * 7);
        const weekEnd = addDays(start, w * 7 - 1);
        return (
          <div key={w}>
            <button
              onClick={() => toggle(key)}
              className="w-full px-5 py-2.5 flex items-center gap-3 bg-slate-50/50 hover:bg-slate-100 text-left"
            >
              {isCollapsed ? <ChevronRight size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
              <span className="font-bold text-slate-900 text-sm">Week {w}</span>
              <span className="text-xs text-slate-500 font-mono">
                {weekStart.getMonth() + 1}/{weekStart.getDate()} 〜 {weekEnd.getMonth() + 1}/{weekEnd.getDate()}
              </span>
              <span className="ml-auto flex items-center gap-2 text-xs">
                <span className="text-slate-500">{list.length}件</span>
                {list.length > 0 && (
                  <span className="text-emerald-600 font-mono">{doneCnt}/{list.length} ✓</span>
                )}
              </span>
            </button>
            {!isCollapsed && (
              <>
                {list.length === 0 ? (
                  <div className="px-5 py-4 text-xs text-slate-400 text-center">タスクなし</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[10px] text-slate-500 border-b border-slate-100 bg-slate-50/30">
                          <th className="text-left py-2 px-3 font-medium w-24">Phase</th>
                          <th className="text-left py-2 px-3 font-medium">タスク</th>
                          <th className="text-left py-2 px-3 font-medium">詳細</th>
                          <th className="text-left py-2 px-3 font-medium w-32">期日</th>
                          <th className="text-left py-2 px-3 font-medium w-32">担当</th>
                          <th className="text-left py-2 px-3 font-medium w-28">ステータス</th>
                          <th className="text-left py-2 px-3 font-medium w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((t) => (
                          <PocRow key={t.id} task={t} onUpdate={(p) => onUpdate(t.id, p)} onDelete={() => onDelete(t.id)} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <button
                  onClick={() => onAdd(w)}
                  className="w-full px-5 py-2 text-xs text-slate-500 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-1.5 border-t border-slate-100"
                >
                  <Plus size={12} /> Week {w} にタスクを追加
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ===== Sub-components =====

function ViewBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 flex items-center gap-1.5 ${active ? "bg-orange-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
    >
      {icon} {label}
    </button>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-orange-50 border border-orange-200" : "bg-slate-50"}`}>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`text-sm font-medium ${highlight ? "text-orange-700" : "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}

function Stat({ label, value, unit, color, light, highlight }: { label: string; value: string; unit: string; color: string; light: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-4 ${highlight ? "ring-2 ring-orange-300" : ""}`} style={{ background: light }}>
      <div className="text-xs text-slate-600">{label}</div>
      <div className="text-3xl font-bold tabular-nums my-1" style={{ color }}>{value}</div>
      <div className="text-[10px] text-slate-500">{unit}</div>
    </div>
  );
}

function PocRow({ task, onUpdate, onDelete }: { task: TaskWithDate; onUpdate: (p: Partial<DetailedPocTask>) => void; onDelete: () => void }) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="py-2 px-3 align-top">
        <PillSelect value={task.phase} options={PHASES} onChange={(v) => onUpdate({ phase: v as PocPhase })} />
      </td>
      <td className="py-2 px-3 align-top">
        <EditableText value={task.title} onChange={(v) => onUpdate({ title: v })} className="text-sm text-slate-900 font-medium" />
      </td>
      <td className="py-2 px-3 align-top">
        <EditableText value={task.detail} placeholder="（詳細を追加）" onChange={(v) => onUpdate({ detail: v })} className="text-xs text-slate-600" multiline />
      </td>
      <td className="py-2 px-3 align-top">
        <input
          type="date"
          value={task.dueDate ?? task._due}
          onChange={(e) => onUpdate({ dueDate: e.target.value })}
          className="text-xs px-1 py-0.5 border border-slate-200 rounded hover:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-200 bg-transparent"
        />
      </td>
      <td className="py-2 px-3 align-top">
        <EditableText value={task.owner} placeholder="未定" onChange={(v) => onUpdate({ owner: v })} className="text-xs text-slate-600" />
      </td>
      <td className="py-2 px-3 align-top">
        <PillSelect value={task.status} options={STATUSES} onChange={(v) => onUpdate({ status: v as PocTaskStatus })} />
      </td>
      <td className="py-2 px-3 align-top">
        <button
          onClick={() => {
            if (confirm("このタスクを削除しますか？")) onDelete();
          }}
          className="text-slate-300 hover:text-rose-500"
          title="削除"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
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
          className={`w-full px-1.5 py-0.5 -mx-1.5 -my-0.5 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white resize-y ${className ?? ""}`}
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
        className={`w-full px-1.5 py-0.5 -mx-1.5 -my-0.5 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white ${className ?? ""}`}
      />
    );
  }

  const isEmpty = value.length === 0;
  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text px-1.5 py-0.5 -mx-1.5 -my-0.5 rounded hover:bg-slate-100 inline-block min-w-[60px] ${className ?? ""} ${isEmpty ? "text-slate-300 italic" : ""}`}
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
      <button
        onClick={() => setOpen(!open)}
        className={`text-[11px] px-2 py-0.5 rounded ${current.bg} ${current.text} font-medium hover:opacity-80`}
      >
        {current.label}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[100px]">
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
