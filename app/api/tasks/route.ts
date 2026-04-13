import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("dashboard_tasks")
      .select("*")
      .order("priority", { ascending: true });

    if (error) throw error;

    const rows = data as Array<{ id: string; title: string; project: string; status: string; priority: string; labels: string[]; depends: string[]; blocks: string[]; body: string; created_at: string; updated_at: string }> || [];
    const tasks = rows.map((r) => ({
      id: r.id,
      title: r.title,
      project: r.project,
      status: r.status,
      priority: r.priority,
      labels: r.labels || [],
      depends: r.depends || [],
      blocks: r.blocks || [],
      body: r.body || "",
      created: r.created_at,
      updated: r.updated_at,
      filename: r.id + ".md",
    }));
    return Response.json(tasks);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    return Response.json([]);
  }
}
