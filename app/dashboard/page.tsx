"use client";

import { useEffect, useState } from "react";
import type { FollowUp, Task } from "@/lib/files";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function isOverdue(due: string) {
  if (!due) return false;
  return due < new Date().toISOString().split("T")[0];
}

function isDueToday(due: string) {
  if (!due) return false;
  return due === new Date().toISOString().split("T")[0];
}

interface BrainStats {
  pages: number;
  chunks: number;
  embedded: number;
  links: number;
  tags: number;
  byType: Record<string, number>;
}

export default function CommandCenter() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [brain, setBrain] = useState<BrainStats | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetch("/api/follow-ups").then((r) => r.json()).then(setFollowUps);
    fetch("/api/tasks").then((r) => r.json()).then(setTasks);
    fetch("/api/brain").then((r) => r.json()).then(setBrain);
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const pendingFollowUps = followUps.filter((f) => f.status !== "done");
  const overdueFollowUps = pendingFollowUps.filter((f) => isOverdue(f.due));
  const todayFollowUps = pendingFollowUps.filter((f) => isDueToday(f.due));
  const urgentFollowUps = [...overdueFollowUps, ...todayFollowUps];

  const tasksByStatus = {
    backlog: tasks.filter((t) => t.status === "backlog").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-[24px] md:text-[32px] font-[510] text-text-primary" style={{ letterSpacing: "-0.704px", lineHeight: 1.13 }}>
              {getGreeting()}, Matt
            </h1>
            <p className="text-text-tertiary text-[13px] mt-2 font-mono font-[510]" style={{ letterSpacing: "-0.13px" }}>
              {formatDate(now)} · {formatTime(now)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-green animate-pulse" />
            <span className="text-[11px] text-text-quaternary font-[510]">Systems online</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <StatCard label="Follow-ups" value={pendingFollowUps.length} sublabel="pending" />
        <StatCard label="Overdue" value={overdueFollowUps.length} sublabel="need attention" variant={overdueFollowUps.length > 0 ? "danger" : "default"} />
        <StatCard label="Brain Pages" value={brain?.pages ?? 0} sublabel="knowledge nodes" />
        <StatCard label="Tasks" value={tasks.length} sublabel={`${tasksByStatus["in-progress"]} active`} />
        <StatCard label="Blocked" value={tasksByStatus.blocked} sublabel="tasks" variant={tasksByStatus.blocked > 0 ? "warning" : "default"} />
      </div>

      {/* Urgent Follow-ups */}
      {urgentFollowUps.length > 0 && (
        <section className="mb-8">
          <SectionHeader title="Needs Attention" count={urgentFollowUps.length} />
          <div className="space-y-1">
            {urgentFollowUps.map((f, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-4 flex items-start gap-4 hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150">
                <div className={`mt-1 w-[6px] h-[6px] rounded-full flex-shrink-0 ${isOverdue(f.due) ? "bg-red" : "bg-amber"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-[510] text-text-primary">{f.person}</span>
                    <ChannelPill channel={f.channel} />
                    <span className={`text-[11px] font-[510] ${isOverdue(f.due) ? "text-red" : "text-amber"}`}>
                      {isOverdue(f.due) ? "OVERDUE" : "TODAY"}
                    </span>
                  </div>
                  <p className="text-[13px] text-text-tertiary truncate" style={{ letterSpacing: "-0.13px" }}>{f.context}</p>
                </div>
                <span className="text-[12px] text-text-quaternary font-mono flex-shrink-0">{f.due}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two column: Tasks overview + Brain stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Pipeline */}
        <section>
          <SectionHeader title="Task Pipeline" />
          <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5">
            <div className="space-y-3">
              {(["in-progress", "blocked", "backlog", "done"] as const).map((status) => {
                const count = tasksByStatus[status];
                const total = tasks.length || 1;
                const colors: Record<string, string> = {
                  "in-progress": "bg-accent-bright",
                  blocked: "bg-red",
                  backlog: "bg-text-quaternary",
                  done: "bg-green",
                };
                const labels: Record<string, string> = {
                  "in-progress": "In Progress",
                  blocked: "Blocked",
                  backlog: "Backlog",
                  done: "Done",
                };
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] text-text-secondary font-[510]">{labels[status]}</span>
                      <span className="text-[12px] text-text-quaternary font-mono">{count}</span>
                    </div>
                    <div className="h-1 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors[status]} transition-all duration-300`}
                        style={{ width: `${Math.max((count / total) * 100, count > 0 ? 4 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {tasks.filter((t) => t.status === "blocked").length > 0 && (
              <div className="mt-5 pt-4 border-t border-border-subtle">
                <p className="text-[11px] text-text-quaternary font-[510] mb-2 uppercase tracking-wide">Blocked</p>
                {tasks
                  .filter((t) => t.status === "blocked")
                  .map((t) => (
                    <div key={t.id} className="flex items-center gap-2 py-1.5">
                      <span className="w-[5px] h-[5px] rounded-full bg-red flex-shrink-0" />
                      <span className="text-[13px] text-text-secondary truncate">{t.title}</span>
                      <span className="text-[11px] text-text-quaternary font-mono ml-auto">{t.id}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Brain Stats */}
        <section>
          <SectionHeader title="Brain" />
          <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5">
            {brain ? (
              <>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <MiniStat label="Pages" value={brain.pages} />
                  <MiniStat label="Chunks" value={brain.chunks} />
                  <MiniStat label="Links" value={brain.links} />
                </div>
                <div className="border-t border-border-subtle pt-4">
                  <p className="text-[11px] text-text-quaternary font-[510] mb-3 uppercase tracking-wide">By Type</p>
                  <div className="space-y-2">
                    {Object.entries(brain.byType)
                      .sort(([, a], [, b]) => b - a)
                      .map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TypeDot type={type} />
                            <span className="text-[13px] text-text-secondary capitalize font-[510]">{type}</span>
                          </div>
                          <span className="text-[13px] text-text-quaternary font-mono">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <span className="text-text-tertiary text-[13px]">Loading brain stats...</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Upcoming Follow-ups */}
      {pendingFollowUps.filter((f) => !isOverdue(f.due) && !isDueToday(f.due)).length > 0 && (
        <section className="mt-8">
          <SectionHeader title="Upcoming" count={pendingFollowUps.filter((f) => !isOverdue(f.due) && !isDueToday(f.due)).length} />
          <div className="space-y-1.5">
            {pendingFollowUps
              .filter((f) => !isOverdue(f.due) && !isDueToday(f.due))
              .slice(0, 5)
              .map((f, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-3.5 hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-[510] text-text-primary">{f.person}</span>
                    <span className="text-[12px] text-text-quaternary font-mono">{f.due}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChannelPill channel={f.channel} />
                    <span className="text-[12px] text-text-tertiary truncate" style={{ letterSpacing: "-0.13px" }}>{f.context}</span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}

function StatCard({ label, value, sublabel, variant = "default" }: { label: string; value: number; sublabel: string; variant?: "default" | "danger" | "warning" }) {
  const borderClass = variant === "danger" ? "border-red/20" : variant === "warning" ? "border-amber/20" : "border-border";
  const valueClass = variant === "danger" ? "text-red" : variant === "warning" ? "text-amber" : "text-text-primary";
  return (
    <div className={`bg-[rgba(255,255,255,0.02)] border ${borderClass} rounded-lg p-4`}>
      <p className="text-[12px] text-text-quaternary font-[510] mb-1">{label}</p>
      <p className={`text-[24px] font-[510] font-mono ${valueClass}`}>{value}</p>
      <p className="text-[11px] text-text-quaternary mt-0.5">{sublabel}</p>
    </div>
  );
}

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <h2 className="text-[14px] font-[510] text-text-primary" style={{ letterSpacing: "-0.182px" }}>{title}</h2>
      {count !== undefined && (
        <span className="text-[11px] font-[510] bg-[rgba(255,255,255,0.05)] text-text-tertiary px-2 py-0.5 rounded-full border border-border-subtle">{count}</span>
      )}
    </div>
  );
}

function ChannelPill({ channel }: { channel: string }) {
  return (
    <span className="text-[11px] font-[510] px-2 py-0.5 rounded-full border border-border-solid text-text-secondary">
      {channel}
    </span>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[12px] text-text-quaternary font-[510] mb-0.5">{label}</p>
      <p className="text-[18px] font-[510] font-mono text-text-primary">{value.toLocaleString()}</p>
    </div>
  );
}

function TypeDot({ type }: { type: string }) {
  const colors: Record<string, string> = {
    concept: "bg-accent-bright",
    person: "bg-green",
    company: "bg-purple",
    deal: "bg-amber",
    project: "bg-blue",
    source: "bg-text-quaternary",
  };
  return <span className={`w-[6px] h-[6px] rounded-full ${colors[type] || "bg-text-quaternary"}`} />;
}
