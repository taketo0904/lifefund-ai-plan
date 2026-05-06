import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { legalDocs, feeTable, blockers, legalQuestions } from "@/lib/data/v02-legal";
import { meta } from "@/lib/data/v02-meta";

const statusColors = {
  draft: { label: "📝 ドラフト", cls: "bg-amber-100 text-amber-700" },
  review: { label: "👀 レビュー中", cls: "bg-sky-100 text-sky-700" },
  approved: { label: "✅ 承認済", cls: "bg-emerald-100 text-emerald-700" },
  filed: { label: "📤 提出済", cls: "bg-purple-100 text-purple-700" },
};

export default function LegalDocsPage() {
  const gateDocs = legalDocs.filter((d) => d.isApplicationGate);
  const operationDocs = legalDocs.filter((d) => !d.isApplicationGate);

  return (
    <div className="max-w-6xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">⚖️ 11法務書類トラッカー</h1>
        <p className="text-slate-500 mt-1">§11.6｜全11書類ドラフト完成。残るは確定・レビュー・許可申請</p>
      </header>

      {/* 事業所情報 */}
      <div className="card border-l-4 border-orange-500">
        <h2 className="text-sm font-bold text-slate-900 mb-2">事業所情報</h2>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <div><span className="text-slate-500">事業者名：</span><span className="font-bold">{meta.client}</span></div>
          <div><span className="text-slate-500">所在地：</span>{meta.address}</div>
          <div><span className="text-slate-500">電話：</span>{meta.phone}</div>
          <div><span className="text-slate-500">許可番号：</span><span className="text-amber-700">{meta.license}</span></div>
          <div><span className="text-slate-500">職業紹介責任者：</span><span className="text-amber-700">{meta.responsible}</span></div>
        </div>
      </div>

      {/* 残ストッパー */}
      <div className="card bg-amber-50 border-amber-300">
        <h2 className="text-sm font-bold text-amber-900 mb-3">⚠️ 許可申請を止めている4ストッパー</h2>
        <div className="space-y-2">
          {blockers.map((b, i) => (
            <div key={b.id} className="bg-white rounded p-3 flex items-center gap-3 border border-amber-200">
              <div className="text-2xl font-bold text-amber-700">{i + 1}</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900">{b.title}</div>
                <div className="text-xs text-slate-600">{b.action}</div>
              </div>
              <div className="text-xs font-mono text-slate-500">{b.deadline}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 許可申請ゲート書類 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">📑 許可申請ゲート（①〜⑥）</h2>
        <p className="text-xs text-slate-500 mb-3">各書類をクリックで詳細・内容編集ページへ</p>
        <div className="space-y-2">
          {gateDocs.map((d) => {
            const s = statusColors[d.status];
            return (
              <Link
                key={d.id}
                href={`/legal-docs/${d.id}`}
                className="block border border-slate-200 rounded p-3 hover:bg-orange-50 hover:border-orange-300 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-bold text-orange-700">{d.id}</span>
                  <span className="text-sm font-bold text-slate-900 flex-1">{d.name}</span>
                  <span className={`badge ${s.cls}`}>{s.label}</span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-600" />
                </div>
                <div className="text-xs text-slate-500 grid grid-cols-3 gap-2 ml-7">
                  <div>対象: {d.target}</div>
                  <div>根拠: {d.basis}</div>
                  <div>時期: {d.timing}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 運用書類 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">📋 運用開始時書類（⑦〜⑪）</h2>
        <p className="text-xs text-slate-500 mb-3">各書類をクリックで詳細・内容編集ページへ</p>
        <div className="space-y-2">
          {operationDocs.map((d) => {
            const s = statusColors[d.status];
            return (
              <Link
                key={d.id}
                href={`/legal-docs/${d.id}`}
                className="block border border-slate-200 rounded p-3 hover:bg-orange-50 hover:border-orange-300 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-bold text-slate-500">{d.id}</span>
                  <span className="text-sm font-bold text-slate-900 flex-1">{d.name}</span>
                  <span className={`badge ${s.cls}`}>{s.label}</span>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-600" />
                </div>
                <div className="text-xs text-slate-500 grid grid-cols-3 gap-2 ml-7">
                  <div>対象: {d.target}</div>
                  <div>根拠: {d.basis}</div>
                  <div>時期: {d.timing}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 手数料表 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">💴 手数料表（届出制）ドラフト</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-orange-200">
                <th className="text-left py-2 text-xs text-slate-500">サービス</th>
                <th className="text-right py-2 text-xs text-slate-500">手数料</th>
                <th className="text-right py-2 text-xs text-slate-500">負担者</th>
              </tr>
            </thead>
            <tbody>
              {feeTable.serviceTypes.map((s, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 text-slate-900">{s.service}</td>
                  <td className="py-2 text-right font-mono text-orange-700">{s.fee}</td>
                  <td className="py-2 text-right text-slate-600">{s.payer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <div className="text-xs font-bold text-slate-700 mb-2">⚠️ 内部レート（手数料表に記載しない）</div>
          <div className="grid grid-cols-5 gap-2">
            {feeTable.internalRates.map((r) => (
              <div key={r.rank} className="bg-orange-50 rounded p-2 text-center">
                <div className="text-xs text-slate-500">{r.rank}</div>
                <div className="text-lg font-bold text-orange-700">{r.rate}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-bold text-slate-700 mb-2">🔄 返戻金規定</div>
          <div className="space-y-1">
            {feeTable.refund.map((r, i) => (
              <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-100">
                <span className="text-slate-700">{r.period}の退職</span>
                <span className="font-mono font-bold text-orange-700">{r.rate}%返金</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 法務確認7問 */}
      <div className="card">
        <h2 className="text-base font-bold text-slate-900 mb-3">❓ ホーム法務への確認7問</h2>
        <div className="space-y-2">
          {legalQuestions.map((q) => (
            <div key={q.id} className="flex items-start gap-3 py-2 border-b border-slate-100">
              <span className="font-mono text-orange-700 font-bold">{q.id.toUpperCase()}</span>
              <div className="flex-1">
                <div className="text-sm text-slate-900">{q.question}</div>
                <div className="text-xs text-slate-500 mt-1">期限：{q.deadline}</div>
              </div>
              <span className={`badge ${q.status === "answered" ? "bg-emerald-100 text-emerald-700" : q.status === "in_progress" ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"}`}>
                {q.status === "answered" ? "回答済" : q.status === "in_progress" ? "進行中" : "未着手"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
