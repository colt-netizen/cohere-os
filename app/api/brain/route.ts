import { getSupabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    const sb = getSupabase();

    if (query) {
      const { data, error } = await sb
        .from("pages")
        .select("slug, title, type")
        .textSearch("compiled_truth", query)
        .limit(10) as { data: Array<{ slug: string; title: string; type: string }> | null; error: unknown };

      if (error) throw error;

      const formatted = (data || [])
        .map((r: { slug: string; title: string }) => `${r.slug} -- ${r.title}`)
        .join("\n");
      return Response.json({ results: formatted || "No results found." });
    }

    const [pages, chunks, embedded, links, tags, timeline] = await Promise.all([
      sb.from("pages").select("*", { count: "exact", head: true }),
      sb.from("content_chunks").select("*", { count: "exact", head: true }),
      sb.from("content_chunks").select("*", { count: "exact", head: true }).not("embedding", "is", null),
      sb.from("links").select("*", { count: "exact", head: true }),
      sb.from("tags").select("*", { count: "exact", head: true }),
      sb.from("timeline_entries").select("*", { count: "exact", head: true }),
    ]);

    const byType: Record<string, number> = {};
    const { data: pageData } = await sb.from("pages").select("type") as { data: Array<{ type: string }> | null };
    if (pageData) {
      for (const p of pageData) {
        byType[p.type] = (byType[p.type] || 0) + 1;
      }
    }

    return Response.json({
      pages: pages.count || 0,
      chunks: chunks.count || 0,
      embedded: embedded.count || 0,
      links: links.count || 0,
      tags: tags.count || 0,
      timeline: timeline.count || 0,
      byType,
    });
  } catch (err) {
    console.error("Failed to fetch brain stats:", err);
    return Response.json({
      pages: 0, chunks: 0, embedded: 0, links: 0, tags: 0, timeline: 0, byType: {},
      error: String((err as Error)?.message || err),
    });
  }
}
