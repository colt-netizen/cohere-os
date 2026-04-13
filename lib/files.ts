import fs from "fs";
import path from "path";
import matter from "gray-matter";

const HOME = process.env.HOME || "/Users/colt";

export interface FollowUp {
  person: string;
  channel: string;
  due: string;
  status: string;
  resolved?: string;
  context: string;
  body: string;
  filename: string;
}

export interface Task {
  id: string;
  title: string;
  project?: string;
  status: string;
  priority?: string;
  labels: string[];
  depends: string[];
  blocks?: string[];
  created?: string;
  updated?: string;
  body: string;
  filename: string;
}

export interface Briefing {
  filename: string;
  date: string;
  title: string;
  body: string;
}

function formatDateValue(val: unknown): string {
  if (!val) return "";
  if (val instanceof Date) {
    return val.toISOString().split("T")[0];
  }
  return String(val);
}

function readMarkdownFiles(dir: string) {
  const fullDir = path.join(HOME, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md" && f !== "BOARD.md" && f !== "CHANGELOG.md")
    .map((filename) => {
      const raw = fs.readFileSync(path.join(fullDir, filename), "utf-8");
      const { data, content } = matter(raw);
      return { data, content, filename };
    });
}

export function getFollowUps(): FollowUp[] {
  return readMarkdownFiles("follow-ups")
    .map(({ data, content, filename }) => ({
      person: data.person || "Unknown",
      channel: data.channel || "unknown",
      due: formatDateValue(data.due),
      status: data.status || "pending",
      resolved: formatDateValue(data.resolved) || undefined,
      context: data.context || "",
      body: content.trim(),
      filename,
    }))
    .sort((a, b) => {
      if (!a.due) return 1;
      if (!b.due) return -1;
      return a.due.localeCompare(b.due);
    });
}

export function getTasks(): Task[] {
  return readMarkdownFiles("tasks")
    .map(({ data, content, filename }) => ({
      id: data.id || filename.replace(".md", ""),
      title: data.title || filename.replace(".md", "").replace(/-/g, " "),
      project: data.project,
      status: data.status || "backlog",
      priority: data.priority,
      labels: Array.isArray(data.labels) ? data.labels : [],
      depends: Array.isArray(data.depends) ? data.depends : [],
      blocks: Array.isArray(data.blocks) ? data.blocks : [],
      created: formatDateValue(data.created) || undefined,
      updated: formatDateValue(data.updated) || undefined,
      body: content.trim(),
      filename,
    }))
    .sort((a, b) => {
      const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      const pa = priorityOrder[a.priority || "low"] ?? 3;
      const pb = priorityOrder[b.priority || "low"] ?? 3;
      return pa - pb;
    });
}

export function getBriefings(): Briefing[] {
  return readMarkdownFiles("briefings")
    .map(({ content, filename }) => {
      const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? dateMatch[1] : filename.replace(".md", "");
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : filename.replace(".md", "").replace(/-/g, " ");
      return { filename, date, title, body: content.trim() };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBrainStats(): {
  raw: string;
  pages: number;
  chunks: number;
  embedded: number;
  links: number;
  tags: number;
  timeline: number;
  byType: Record<string, number>;
} {
  try {
    const { execSync } = require("child_process");
    const bunPath = path.join(HOME, ".bun/bin/bun");
    const cliPath = path.join(HOME, "gbrain/src/cli.ts");
    const raw = execSync(`${bunPath} run ${cliPath} stats 2>/dev/null`, {
      encoding: "utf-8",
      timeout: 10000,
    }).trim();

    const getNum = (label: string) => {
      const m = raw.match(new RegExp(`${label}:\\s+(\\d+)`));
      return m ? parseInt(m[1]) : 0;
    };

    const byType: Record<string, number> = {};
    const typeSection = raw.split("By type:")[1];
    if (typeSection) {
      const lines = typeSection.trim().split("\n");
      for (const line of lines) {
        const m = line.match(/^\s*(\w+):\s+(\d+)/);
        if (m) byType[m[1]] = parseInt(m[2]);
      }
    }

    return {
      raw,
      pages: getNum("Pages"),
      chunks: getNum("Chunks"),
      embedded: getNum("Embedded"),
      links: getNum("Links"),
      tags: getNum("Tags"),
      timeline: getNum("Timeline"),
      byType,
    };
  } catch {
    return { raw: "gbrain unavailable", pages: 0, chunks: 0, embedded: 0, links: 0, tags: 0, timeline: 0, byType: {} };
  }
}

export function searchBrain(query: string): string {
  try {
    const { execSync } = require("child_process");
    const bunPath = path.join(HOME, ".bun/bin/bun");
    const cliPath = path.join(HOME, "gbrain/src/cli.ts");
    const raw = execSync(`${bunPath} run ${cliPath} search "${query.replace(/"/g, '\\"')}" 2>/dev/null`, {
      encoding: "utf-8",
      timeout: 15000,
    }).trim();
    return raw;
  } catch {
    return "Search failed or gbrain unavailable.";
  }
}
