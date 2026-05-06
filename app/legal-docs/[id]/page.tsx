"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { legalDocs as defaultLegalDocs } from "@/lib/data/v02-legal";

type Status = "draft" | "review" | "approved" | "filed";

type DocDetail = {
  id: number;
  name: string;
  target: string;
  basis: string;
  timing: string;
  status: Status;
  isApplicationGate: boolean;
  content: string; // 書類の内容（自由記述）
  notes: string; // メモ・補足
};

const STATUSES: { value: Status; label: string; bg: string; text: string }[] = [
  { value: "draft", label: "📝 ドラフト", bg: "bg-amber-100", text: "text-amber-700" },
  { value: "review", label: "👀 レビュー中", bg: "bg-sky-100", text: "text-sky-700" },
  { value: "approved", label: "✅ 承認済み", bg: "bg-emerald-100", text: "text-emerald-700" },
  { value: "filed", label: "📁 提出済み", bg: "bg-purple-100", text: "text-purple-700" },
];

const STORAGE_KEY = (id: string) => `shift-ai-legal-doc-${id}-v1`;

export default function LegalDocDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idParam = String(params.id);
  const id = Number(idParam);
  const defaultDoc = defaultLegalDocs.find((d) => d.id === id);

  const [doc, setDoc] = useState<DocDetail | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!defaultDoc) {
      setLoaded(true);
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY(idParam));
      if (raw) {
        const parsed = JSON.parse(raw);
        setDoc(parsed);
        setLoaded(true);
        return;
      }
    } catch {}
    setDoc({
      ...defaultDoc,
      status: defaultDoc.status as Status,
      content: defaultDoc.content ?? "",
      notes: "",
    });
    setLoaded(true);
  }, [idParam, defaultDoc]);

  useEffect(() => {
    if (loaded && doc) {
      try {
        localStorage.setItem(STORAGE_KEY(idParam), JSON.stringify(doc));
      } catch {}
    }
  }, [doc, loaded, idParam]);

  const update = (patch: Partial<DocDetail>) => {
    setDoc((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const reset = () => {
    if (!defaultDoc) return;
    if (confirm("初期データに戻します。編集内容は失われます。よろしいですか？")) {
      setDoc({
        ...defaultDoc,
        status: defaultDoc.status as Status,
        content: "",
        notes: "",
      });
    }
  };

  if (!loaded) return <div className="max-w-7xl text-slate-400 text-sm">読み込み中...</div>;
  if (!doc)
    return (
      <div className="max-w-7xl space-y-4">
        <button onClick={() => router.push("/legal-docs")} className="text-sm text-orange-700 hover:underline flex items-center gap-1">
          <ArrowLeft size={14} /> 一覧に戻る
        </button>
        <div className="card text-slate-500">該当する書類が見つかりません（ID: {idParam}）</div>
      </div>
    );

  const statusInfo = STATUSES.find((s) => s.value === doc.status) ?? STATUSES[0];

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button onClick={() => router.push("/legal-docs")} className="text-sm text-orange-700 hover:underline flex items-center gap-1">
          <ArrowLeft size={14} /> 一覧に戻る
        </button>
        <button onClick={reset} className="text-xs px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 text-slate-600">
          <RotateCcw size={12} /> リセット
        </button>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-slate-500">No. {doc.id}</span>
          {doc.isApplicationGate && (
            <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold">許可申請ゲート</span>
          )}
          <PillSelect value={doc.status} options={STATUSES} onChange={(v) => update({ status: v as Status })} />
        </div>
        <EditableText value={doc.name} onChange={(v) => update({ name: v })} className="text-2xl font-bold text-slate-900 block" />
      </header>

      {/* 基本情報 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">📋 基本情報</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <Field label="提出先・対象">
            <EditableText value={doc.target} onChange={(v) => update({ target: v })} className="text-slate-900" multiline />
          </Field>
          <Field label="法的根拠">
            <EditableText value={doc.basis} onChange={(v) => update({ basis: v })} className="text-slate-900" multiline />
          </Field>
          <Field label="作成・提出タイミング">
            <EditableText value={doc.timing} onChange={(v) => update({ timing: v })} className="text-slate-900" multiline />
          </Field>
          <Field label="許可申請ゲート">
            <button
              onClick={() => update({ isApplicationGate: !doc.isApplicationGate })}
              className={`text-xs px-2 py-1 rounded ${doc.isApplicationGate ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}
            >
              {doc.isApplicationGate ? "✓ 必要" : "不要"}
            </button>
          </Field>
        </div>
      </div>

      {/* 書類の内容 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">📄 書類の内容（レビュー・編集）</h2>
        <p className="text-xs text-slate-500 mb-3">
          書類のドラフト本文・レビュー観点・条文骨子などをここに記述してください。
        </p>
        <EditableText
          value={doc.content}
          placeholder="（書類の内容をここに記入。条項・条文・必要事項など）"
          onChange={(v) => update({ content: v })}
          className="text-sm text-slate-900 leading-relaxed block whitespace-pre-wrap"
          multiline
          longText
        />
      </div>

      {/* メモ */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">📝 メモ・補足</h2>
        <p className="text-xs text-slate-500 mb-3">
          検討中の論点・関係者からのフィードバック・参考資料など。
        </p>
        <EditableText
          value={doc.notes}
          placeholder="（メモ・補足を自由に記入）"
          onChange={(v) => update({ notes: v })}
          className="text-sm text-slate-900 leading-relaxed block whitespace-pre-wrap"
          multiline
          longText
        />
      </div>

      {/* Status banner */}
      <div className={`card ${statusInfo.bg}`}>
        <div className={`text-sm font-bold ${statusInfo.text}`}>
          現在のステータス：{statusInfo.label}
        </div>
        <p className="text-xs text-slate-600 mt-1">
          上のステータスチップをクリックして変更できます。
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-[11px] font-bold text-slate-600 mb-2 tracking-wide">{label}</div>
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
  longText,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  longText?: boolean;
}) {
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
          rows={longText ? 12 : 2}
          className={`w-full px-2 py-1 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white resize-y ${className ?? ""}`}
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
        className={`w-full px-2 py-1 rounded border border-orange-300 outline-none focus:ring-2 focus:ring-orange-200 bg-white ${className ?? ""}`}
      />
    );
  }

  const isEmpty = value.length === 0;
  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text px-2 py-1 rounded hover:bg-slate-100 inline-block ${className ?? ""} ${isEmpty ? "text-slate-300 italic" : ""}`}
      title="クリックで編集"
    >
      {isEmpty ? placeholder ?? "（クリックで入力）" : value}
    </span>
  );
}

function PillSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; bg: string; text: string }[];
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`text-xs px-2 py-1 rounded ${current.bg} ${current.text} font-medium hover:opacity-80`}
      >
        {current.label}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px]">
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="w-full text-left px-2 py-1 hover:bg-slate-50"
              >
                <span className={`text-xs px-2 py-0.5 rounded ${o.bg} ${o.text} font-medium`}>{o.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
