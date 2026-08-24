import { MCP_SEED } from "@/data/mcps"
import { mcpEndpoint } from "@/lib/site"

export type CatalogTool = {
  name: string
  description: string
}

export type CatalogMcp = {
  id: number
  slug: string
  name: string
  description: string
  category: string
  kind: string
  version: string
  endpoint: string
  isLive: boolean
  tools: CatalogTool[]
}

export function seedCatalog(): CatalogMcp[] {
  return MCP_SEED.map((mcp, index) => ({
    id: index + 1,
    slug: mcp.slug,
    name: mcp.name,
    description: mcp.description,
    category: mcp.category,
    kind: mcp.kind,
    version: mcp.version,
    endpoint: mcpEndpoint(mcp.slug, mcp.version),
    isLive: false,
    tools: mcp.tools,
  }))
}
