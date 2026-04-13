import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sb = getSupabase();
    const { data, error } = await sb
      .from("dashboard_follow_ups")
      .select("*")
      .order("due", { ascending: true });

    if (error) throw error;

    const rows = data as Array<{ filename: string; person: string; channel: string; due: string; status: string; resolved: string; context: string; body: string }> || [];
    const followUps = rows.map((r) => ({
      filename: r.filename,
      person: r.person,
      channel: r.channel,
      due: r.due || "",
      status: r.status,
      resolved: r.resolved || undefined,
      context: r.context || "",
      body: r.body || "",
    }));
    return Response.json(followUps);
  } catch (err) {
    console.error("Failed to fetch follow-ups:", err);
    return Response.json([]);
  }
}
