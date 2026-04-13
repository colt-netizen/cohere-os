"use client";

import { useEffect, useState, useCallback } from "react";

interface BrainStats {
  pages: number;
  chunks: number;
  embedded: number;
  links: number;
  tags: number;
  timeline: number;
  byType: Record<string, number>;
}

export default function BrainExplorer() {
  const [stats, setStats] = useState<BrainStats | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetch("/api/brain").then((r) => r.json()).then(setStats);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/brain?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results);
    } catch {
      setResults("Search failed.");
    } finally {
      setSearching(false);
    }
  }, [query]);

  const typeColors: Record<string, { text: string; dot: string }> = {
    concept: { text: "text-accent-bright", dot: "bg-accent-bright" },
    person: { text: "text-green", dot: "bg-green" },
    company: { text: "text-purple", dot: "bg-purple" },
    deal: { text: "text-amber", dot: "bg-amber" },
    project: { text: "text-blue", dot: "bg-blue" },
    source: { text: "text-text-quaternary", dot: "bg-text-quaternary" },
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[24px] font-[510] text-text-primary" style={{ letterSpacing: "-0.288px" }}>Brain</h1>
        <p className="text-[13px] text-text-tertiary mt-1" style={{ letterSpacing: "-0.13px" }}>Hybrid RAG knowledge base · gbrain</p>
      </div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Pages", value: stats.pages },
            { label: "Chunks", value: stats.chunks },
            { label: "Embedded", value: stats.embedded },
            { label: "Links", value: stats.links },
            { label: "Tags", value: stats.tags },
            { label: "Timeline", value: stats.timeline },
          ].map((s) => (
            <div key={s.label} className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-4">
              <p className="text-[12px] text-text-quaternary font-[510] mb-1">{s.label}</p>
              <p className="text-[20px] font-[510] font-mono text-text-primary">{s.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Type breakdown */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {Object.entries(stats.byType)
            .sort(([, a], [, b]) => b - a)
            .map(([type, count]) => {
              const color = typeColors[type] || typeColors.source;
              return (
                <div key={type} className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-[6px] h-[6px] rounded-full ${color.dot}`} />
                    <span className="text-[12px] text-text-quaternary font-[510] capitalize">{type}</span>
                  </div>
                  <p className={`text-[24px] font-[510] font-mono ${color.text}`}>{count}</p>
                </div>
              );
            })}
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <h2 className="text-[14px] font-[510] text-text-primary mb-3" style={{ letterSpacing: "-0.182px" }}>Search</h2>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search knowledge base..."
              className="w-full bg-[rgba(255,255,255,0.02)] border border-border rounded-md px-4 py-2.5 text-[14px] text-text-primary placeholder:text-text-quaternary focus:outline-none focus:border-accent-bright/40 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="text-[10px] font-[510] text-text-quaternary bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded border border-border-subtle">Return</kbd>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={searching || !query.trim()}
            className="px-5 py-2.5 bg-accent text-white text-[13px] font-[510] rounded-md hover:bg-accent-hover disabled:opacity-40 transition-all duration-150"
          >
            {searching ? "..." : "Search"}
          </button>
        </div>
      </div>

      {/* Results */}
      {results !== null && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-lg p-5">
          <p className="text-[11px] text-text-quaternary font-[510] mb-3 uppercase tracking-wide">Results</p>
          <pre className="text-[13px] text-text-secondary font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {results}
          </pre>
        </div>
      )}
    </>
  );
}
