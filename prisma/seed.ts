import { PrismaClient } from "@prisma/client"
import { MCP_SEED } from "../src/data/mcps"

const prisma = new PrismaClient()

async function main() {
  for (const mcp of MCP_SEED) {
    await prisma.mcp.upsert({
      where: { slug: mcp.slug },
      update: {
        name: mcp.name,
        description: mcp.description,
        category: mcp.category,
        kind: mcp.kind,
        version: mcp.version,
        isPublished: true,
        tools: {
          deleteMany: {},
          create: mcp.tools.map((tool, index) => ({
            name: tool.name,
            description: tool.description,
            sortOrder: index,
          })),
        },
      },
      create: {
        slug: mcp.slug,
        name: mcp.name,
        description: mcp.description,
        category: mcp.category,
        kind: mcp.kind,
        version: mcp.version,
        isPublished: true,
        tools: {
          create: mcp.tools.map((tool, index) => ({
            name: tool.name,
            description: tool.description,
            sortOrder: index,
          })),
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
