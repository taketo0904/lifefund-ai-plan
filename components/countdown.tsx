"use client";

import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, parseISO } from "date-fns";

export function Countdown({ target, label }: { target: string; label: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const targetDate = parseISO(target);
  const days = differenceInDays(targetDate, now);
  const hours = differenceInHours(targetDate, now) % 24;

  return (
    <div className="card bg-gradient-to-br from-red-500 to-orange-600 text-white border-0">
      <div className="text-sm opacity-90 mb-2">{label}</div>
      <div className="flex items-baseline gap-3">
        <div className="text-6xl font-bold tabular-nums">{Math.max(0, days)}</div>
        <div className="text-lg opacity-80">日</div>
        <div className="text-3xl font-semibold tabular-nums opacity-90">{Math.max(0, hours)}</div>
        <div className="text-sm opacity-80">時間</div>
      </div>
      <div className="text-xs opacity-75 mt-3 font-mono">🎯 {target} 初回売上確定</div>
    </div>
  );
}
