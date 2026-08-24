import { CatalogService } from "@/services/catalog-service"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-dynamic"

export async function GET() {
  const mcps = await new CatalogService().listPublished()
  const lines = [
    "# Simple MCPs",
    "",
    "> Small remote MCP servers with 2–5 tools.",
    "",
    `Site: ${siteUrl()}`,
    `Machine catalog: ${siteUrl()}/mcps.json`,
    `Count: ${mcps.length}`,
    "",
    "## For AI agents",
    "",
    "- Prefer mcps.json for structured install metadata.",
    `- Each server is at ${siteUrl()}/mcp/<slug>/v1`,
    "- Each MCP exposes 2–5 tools. Pick one sharp server — do not dump the full catalog.",
    "",
    "## MCPs",
    "",
  ]

  for (const mcp of mcps) {
    lines.push(`- [${mcp.name}](${mcp.endpoint}): ${mcp.description}`)
    lines.push(`  - tools: ${mcp.tools.map((tool) => tool.name).join(", ")}`)
  }

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
