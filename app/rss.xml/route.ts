import notes from "@/content/notes.json";
import type { Note } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-research-os.local";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = (notes as Note[])
    .map(
      (note) => `<item>
  <title>${escapeXml(note.title)}</title>
  <link>${escapeXml(note.href)}</link>
  <guid>${escapeXml(note.href)}</guid>
  <description>${escapeXml(`${note.source} / ${note.tags.join(", ")}`)}</description>
</item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>AI 研究系统</title>
  <link>${siteUrl}</link>
  <description>研究笔记、实验记录与 AI 工作流更新。</description>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
