"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/files";

const columns = [
  { key: "in-progress", label: "In Progress", dot: "bg-accent-bright" },
  { key: "blocked", label: "Blocked", dot: "bg-red" },
  { key: "backlog", label: "Backlog", dot: "bg-text-quaternary" },
  { key: "done", label: "Done", dot: "bg-green" },
] as const;

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);

  useEffect(() => {
    fetch("/api/tasks").then((r) => r.json()).then(setTasks);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-[510] text-text-primary" style={{ letterSpacing: "-0.288px" }}>Tasks</h1>
          <p className="text-[13px] text-text-tertiary mt-1" style={{ letterSpacing: "-0.13px" }}>{tasks.length} tasks across {columns.length} stages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:min-h-[calc(100vh-160px)]">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className={`w-[6px] h-[6px] rounded-full ${col.dot}`} />
                <span className="text-[12px] font-[510] text-text-secondary">{col.label}</span>
                <span className="text-[12px] font-mono text-text-quaternary ml-auto">{colTasks.length}</span>
              </div>

              <div className="space-y-1.5 flex-1">
                {colTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelected(selected?.id === task.id ? null : task)}
                    className={`w-full text-left bg-[rgba(255,255,255,0.02)] border rounded-lg p-3.5 hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150 cursor-pointer ${
                      selected?.id === task.id ? "border-accent-bright/40" : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono text-text-quaternary">{task.id}</span>
                      {task.priority && <PriorityBadge priority={task.priority} />}
                    </div>
                    <p className="text-[13px] text-text-primary font-[510] leading-snug mb-2">{task.title}</p>
                    {task.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.labels.map((label) => (
                          <LabelPill key={label} label={label} />
                        ))}
                      </div>
                    )}
                    {task.depends.length > 0 && (
                      <div className="mt-2 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-quaternary">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <span className="text-[10px] font-mono text-text-quaternary">
                          {task.depends.join(", ")}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
                {colTasks.length === 0 && (
                  <div className="border border-dashed border-border rounded-lg p-4 text-center">
                    <span className="text-[12px] text-text-quaternary">No tasks</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed right-0 top-0 h-screen w-full md:w-[400px] bg-panel border-l border-border z-[60] overflow-y-auto shadow-[rgba(0,0,0,0.4)_0px_2px_4px]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-mono text-text-quaternary">{selected.id}</span>
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
            <h2 className="text-[18px] font-[590] text-text-primary mb-5" style={{ letterSpacing: "-0.165px" }}>{selected.title}</h2>
            <div className="space-y-3 mb-6">
              <DetailRow label="Status"><StatusBadge status={selected.status} /></DetailRow>
              {selected.priority && <DetailRow label="Priority"><PriorityBadge priority={selected.priority} /></DetailRow>}
              {selected.labels.length > 0 && (
                <DetailRow label="Labels">
                  <div className="flex flex-wrap gap-1">{selected.labels.map((l) => <LabelPill key={l} label={l} />)}</div>
                </DetailRow>
              )}
              {selected.depends.length > 0 && (
                <DetailRow label="Depends on">
                  <span className="text-[13px] font-mono text-text-secondary">{selected.depends.join(", ")}</span>
                </DetailRow>
              )}
              {selected.updated && (
                <DetailRow label="Updated">
                  <span className="text-[13px] font-mono text-text-secondary">{selected.updated}</span>
                </DetailRow>
              )}
            </div>
            <div className="border-t border-border-subtle pt-4">
              <p className="text-[11px] text-text-quaternary font-[510] mb-2 uppercase tracking-wide">Description</p>
              <div className="prose text-[14px] text-text-secondary whitespace-pre-wrap leading-relaxed">
                {selected.body}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    urgent: "text-red",
    high: "text-amber",
    medium: "text-accent-bright",
    low: "text-text-quaternary",
  };
  return (
    <span className={`text-[10px] font-[510] px-2 py-0.5 rounded-full border border-border-solid ${colors[priority] || colors.low}`}>
      {priority}
    </span>
  );
}

function LabelPill({ label }: { label: string }) {
  const colors: Record<string, string> = {
    blocker: "text-red",
    "agent-task": "text-accent-bright",
    "matt-decision": "text-amber",
    "quick-win": "text-emerald",
  };
  return (
    <span className={`text-[10px] font-[510] px-1.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle ${colors[label] || "text-text-quaternary"}`}>
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "in-progress": "text-accent-bright",
    blocked: "text-red",
    backlog: "text-text-quaternary",
    done: "text-emerald",
  };
  return (
    <span className={`text-[11px] font-[510] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-border-subtle ${colors[status] || colors.backlog}`}>
      {status}
    </span>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-text-quaternary font-[510]">{label}</span>
      {children}
    </div>
  );
}
