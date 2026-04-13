"use client";

import { useEffect, useState } from "react";
import type { Briefing } from "@/lib/files";
import { marked } from "marked";

export default function BriefingsPage() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [selected, setSelected] = useState<Briefing | null>(null);

  useEffect(() => {
    fetch("/api/briefings").then((r) => r.json()).then((data: Briefing[]) => {
      setBriefings(data);
      if (data.length > 0) setSelected(data[0]);
    });
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[24px] font-[510] text-text-primary" style={{ letterSpacing: "-0.288px" }}>Briefings</h1>
        <p className="text-[13px] text-text-tertiary mt-1" style={{ letterSpacing: "-0.13px" }}>{briefings.length} briefings</p>
      </div>

      {/* Mobile: list or content. Desktop: side by side */}
      <div className="flex flex-col md:flex-row gap-6 md:min-h-[calc(100vh-160px)]">
        {/* List — full width on mobile when nothing selected, sidebar on desktop */}
        <div className={`md:w-[260px] md:flex-shrink-0 space-y-px ${selected ? "hidden md:block" : ""}`}>
          {briefings.map((b) => (
            <button
              key={b.filename}
              onClick={() => setSelected(b)}
              className={`w-full text-left px-3.5 py-3 rounded-lg transition-colors duration-150 ${
                selected?.filename === b.filename
                  ? "bg-[rgba(255,255,255,0.06)] border border-accent-bright/30"
                  : "border border-transparent hover:bg-[rgba(255,255,255,0.03)]"
              }`}
            >
              <p className="text-[13px] font-[510] text-text-primary truncate">{b.title}</p>
              <p className="text-[11px] text-text-quaternary mt-0.5 font-mono">{b.date}</p>
            </button>
          ))}
          {briefings.length === 0 && (
            <div className="text-center py-8">
              <span className="text-[13px] text-text-quaternary">No briefings found</span>
            </div>
          )}
        </div>

        {/* Content — full width on mobile, flex on desktop */}
        {selected && (
          <div className="flex-1 bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5 md:p-8 overflow-y-auto">
            {/* Mobile back button */}
            <button
              onClick={() => setSelected(null)}
              className="md:hidden flex items-center gap-1.5 text-[13px] text-text-tertiary mb-4 hover:text-text-primary transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              All briefings
            </button>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle flex-wrap">
              <span className="text-[12px] font-mono text-text-quaternary">{selected.date}</span>
              <span className="text-text-quaternary hidden md:inline">·</span>
              <span className="text-[12px] font-mono text-text-quaternary hidden md:inline">{selected.filename}</span>
            </div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: marked.parse(selected.body) as string }}
            />
          </div>
        )}

        {/* Desktop: show placeholder when nothing selected */}
        {!selected && (
          <div className="hidden md:flex flex-1 bg-[rgba(255,255,255,0.02)] border border-border rounded-lg items-center justify-center">
            <span className="text-[13px] text-text-quaternary">Select a briefing to view</span>
          </div>
        )}
      </div>
    </>
  );
}
