import { MCP_SEED } from "@/data/mcps"
import { seedCatalog, type CatalogMcp } from "@/lib/catalog"
import { getPrisma } from "@/lib/prisma"
import { mcpEndpoint } from "@/lib/site"

export class CatalogService {
  async listPublished(): Promise<CatalogMcp[]> {
    const fromDb = await this.fromDatabase()
    if (fromDb?.length) return fromDb
    return seedCatalog()
  }

  async getBySlug(slug: string): Promise<CatalogMcp | undefined> {
    const list = await this.listPublished()
    return list.find((mcp) => mcp.slug === slug)
  }

  private async fromDatabase(): Promise<CatalogMcp[] | undefined> {
    const prisma = getPrisma()
    if (!prisma) return undefined
    try {
      const rows = await prisma.mcp.findMany({
        where: { isPublished: true },
        include: { tools: { orderBy: { sortOrder: "asc" } } },
        orderBy: { slug: "asc" },
      })
      if (!rows.length) return undefined
      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description,
        category: row.category,
        kind: row.kind,
        version: row.version,
        endpoint: mcpEndpoint(row.slug, row.version),
        tools: row.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
        })),
      }))
    } catch {
      return undefined
    }
  }
}

export function seedRows() {
  return MCP_SEED
}
