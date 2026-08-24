import { NextResponse } from "next/server"
import { CatalogService } from "@/services/catalog-service"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const mcp = await new CatalogService().getBySlug(slug)
  if (!mcp) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({
    name: mcp.name,
    description: mcp.description,
    url: mcp.endpoint,
    transport: "streamable-http",
    version: mcp.version,
    tools: mcp.tools,
  })
}
