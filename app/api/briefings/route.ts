import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("dashboard_briefings")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    const rows = data as Array<{ filename: string; title: string; date: string; body: string }> || [];
    const briefings = rows.map((r) => ({
      filename: r.filename,
      title: r.title,
      date: r.date,
      body: r.body || "",
    }));
    return Response.json(briefings);
  } catch (err) {
    console.error("Failed to fetch briefings:", err);
    return Response.json([]);
  }
}
