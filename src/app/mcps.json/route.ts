import { NextResponse } from "next/server"
import { CatalogService } from "@/services/catalog-service"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-dynamic"

export async function GET() {
  const mcps = await new CatalogService().listPublished()
  return NextResponse.json({
    title: "Simple MCPs",
    description:
      "Small remote MCP servers with 2–5 tools. Catalog for humans and AI agents.",
    site: siteUrl(),
    count: mcps.length,
    mcps,
  })
}
