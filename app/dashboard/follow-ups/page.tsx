"use client";

import { useEffect, useState } from "react";
import type { FollowUp } from "@/lib/files";

function isOverdue(due: string) {
  if (!due) return false;
  return due < new Date().toISOString().split("T")[0];
}

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "done" | "overdue">("all");
  const [selected, setSelected] = useState<FollowUp | null>(null);

  useEffect(() => {
    fetch("/api/follow-ups").then((r) => r.json()).then(setFollowUps);
  }, []);

  const filtered = followUps.filter((f) => {
    if (filter === "pending") return f.status !== "done";
    if (filter === "done") return f.status === "done";
    if (filter === "overdue") return f.status !== "done" && isOverdue(f.due);
    return true;
  });

  const overdueCount = followUps.filter((f) => f.status !== "done" && isOverdue(f.due)).length;
  const pendingCount = followUps.filter((f) => f.status !== "done").length;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-[510] text-text-primary" style={{ letterSpacing: "-0.288px" }}>Follow-ups</h1>
          <p className="text-[13px] text-text-tertiary mt-1" style={{ letterSpacing: "-0.13px" }}>
            {pendingCount} pending{overdueCount > 0 && <span className="text-red"> · {overdueCount} overdue</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-px mb-5 bg-[rgba(255,255,255,0.02)] border border-border rounded-md p-1 w-fit">
        {(["all", "pending", "overdue", "done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-[12px] font-[510] rounded-md transition-colors duration-150 capitalize ${
              filter === f
                ? "bg-[rgba(255,255,255,0.08)] text-text-primary"
                : "text-text-quaternary hover:text-text-secondary"
            }`}
          >
            {f}
            {f === "overdue" && overdueCount > 0 && (
              <span className="ml-1.5 text-red">{overdueCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Desktop: Table | Mobile: Cards */}
      {/* Desktop table */}
      <div className="hidden md:block bg-[rgba(255,255,255,0.02)] border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-[12px] text-text-quaternary font-[510] w-8"></th>
              <th className="text-left px-4 py-3 text-[12px] text-text-quaternary font-[510]">Person</th>
              <th className="text-left px-4 py-3 text-[12px] text-text-quaternary font-[510]">Channel</th>
              <th className="text-left px-4 py-3 text-[12px] text-text-quaternary font-[510]">Due Date</th>
              <th className="text-left px-4 py-3 text-[12px] text-text-quaternary font-[510]">Status</th>
              <th className="text-left px-4 py-3 text-[12px] text-text-quaternary font-[510]">Context</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const overdue = f.status !== "done" && isOverdue(f.due);
              return (
                <tr
                  key={i}
                  onClick={() => setSelected(selected?.filename === f.filename ? null : f)}
                  className={`border-b border-border-subtle cursor-pointer transition-colors duration-150 ${
                    selected?.filename === f.filename ? "bg-[rgba(255,255,255,0.04)]" : "hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className={`inline-block w-[6px] h-[6px] rounded-full ${
                      f.status === "done" ? "bg-emerald" : overdue ? "bg-red" : "bg-amber"
                    }`} />
                  </td>
                  <td className="px-4 py-3 text-[13px] text-text-primary font-[510]">{f.person}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-[510] px-2 py-0.5 rounded-full border border-border-solid text-text-secondary">{f.channel}</span>
                  </td>
                  <td className={`px-4 py-3 text-[13px] font-mono ${overdue ? "text-red" : "text-text-secondary"}`}>{f.due}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-[510] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle ${
                      f.status === "done" ? "text-emerald" : "text-amber"
                    }`}>{f.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-text-tertiary truncate max-w-[350px]">{f.context}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-[13px] text-text-quaternary">No follow-ups match this filter</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {filtered.map((f, i) => {
          const overdue = f.status !== "done" && isOverdue(f.due);
          return (
            <button
              key={i}
              onClick={() => setSelected(selected?.filename === f.filename ? null : f)}
              className={`w-full text-left bg-[rgba(255,255,255,0.02)] border rounded-lg p-3.5 transition-colors duration-150 ${
                selected?.filename === f.filename ? "border-accent-bright/40" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-[6px] h-[6px] rounded-full ${
                    f.status === "done" ? "bg-emerald" : overdue ? "bg-red" : "bg-amber"
                  }`} />
                  <span className="text-[13px] font-[510] text-text-primary">{f.person}</span>
                </div>
                <span className={`text-[12px] font-mono ${overdue ? "text-red" : "text-text-quaternary"}`}>{f.due}</span>
              </div>
              <div className="flex items-center gap-2 pl-4">
                <span className="text-[11px] font-[510] px-2 py-0.5 rounded-full border border-border-solid text-text-secondary">{f.channel}</span>
                <span className={`text-[11px] font-[510] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle ${
                  f.status === "done" ? "text-emerald" : "text-amber"
                }`}>{f.status}</span>
              </div>
              {f.context && (
                <p className="text-[12px] text-text-tertiary mt-2 pl-4 truncate">{f.context}</p>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[13px] text-text-quaternary">No follow-ups match this filter</div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed right-0 top-0 h-screen w-full md:w-[420px] bg-panel border-l border-border z-[60] overflow-y-auto shadow-[rgba(0,0,0,0.4)_0px_2px_4px]">
          <div className="p-6 pt-16 md:pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-[590] text-text-primary" style={{ letterSpacing: "-0.165px" }}>{selected.person}</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-text-quaternary hover:text-text-primary transition-colors p-1 rounded-md hover:bg-[rgba(255,255,255,0.05)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-quaternary font-[510]">Channel</span>
                <span className="text-[11px] font-[510] px-2 py-0.5 rounded-full border border-border-solid text-text-secondary">{selected.channel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-quaternary font-[510]">Due</span>
                <span className={`text-[13px] font-mono ${
                  selected.status !== "done" && isOverdue(selected.due) ? "text-red" : "text-text-secondary"
                }`}>{selected.due}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-quaternary font-[510]">Status</span>
                <span className={`text-[11px] font-[510] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle ${
                  selected.status === "done" ? "text-emerald" : "text-amber"
                }`}>{selected.status}</span>
              </div>
            </div>
            <div className="border-t border-border-subtle pt-4">
              <p className="text-[11px] text-text-quaternary font-[510] mb-2 uppercase tracking-wide">Context</p>
              <p className="text-[14px] text-text-secondary leading-relaxed">{selected.context}</p>
            </div>
            {selected.body && (
              <div className="border-t border-border-subtle pt-4 mt-4">
                <p className="text-[11px] text-text-quaternary font-[510] mb-2 uppercase tracking-wide">Notes</p>
                <p className="text-[14px] text-text-secondary leading-relaxed whitespace-pre-wrap">{selected.body}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
