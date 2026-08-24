import { seedCatalog, type CatalogMcp } from "@/lib/catalog"
import { logError } from "@/lib/log"
import { getPrisma } from "@/lib/prisma"
import { mcpEndpoint } from "@/lib/site"
import { McpCatalog } from "@/services/mcp-catalog"

export class CatalogService {
  async listPublished(): Promise<CatalogMcp[]> {
    const mcpCatalog = new McpCatalog()
    const prisma = getPrisma()
    if (prisma) {
      try {
        const rows = await prisma.mcp.findMany({
          where: { isPublished: true },
          include: { tools: { orderBy: { sortOrder: "asc" } } },
          orderBy: { slug: "asc" },
        })
        if (rows.length) {
          return liveFirst(
            rows.map((row) => ({
              id: row.id,
              slug: row.slug,
              name: row.name,
              description: row.description,
              category: row.category,
              kind: row.kind,
              version: row.version,
              endpoint: mcpEndpoint(row.slug, row.version),
              isLive: mcpCatalog.isLive(row.slug),
              tools: row.tools.map((tool) => ({
                name: tool.name,
                description: tool.description,
              })),
            })),
          )
        }
      } catch (err) {
        logError("services", ["catalog"], err)
      }
    }

    return liveFirst(
      seedCatalog().map((mcp) => ({
        ...mcp,
        isLive: mcpCatalog.isLive(mcp.slug),
      })),
    )
  }

  async getBySlug(slug: string): Promise<CatalogMcp | undefined> {
    const list = await this.listPublished()
    return list.find((mcp) => mcp.slug === slug)
  }
}

function liveFirst(mcps: CatalogMcp[]) {
  return mcps.sort((a, b) => Number(b.isLive) - Number(a.isLive))
}
