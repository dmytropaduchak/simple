import type { McpServer } from "@modelcontextprotocol/server"

export type McpDefinition = {
  register(server: McpServer): void
}

const LIVE_SLUGS = new Set(["psl", "idna", "phone", "unicode", "tokens"])

export class McpCatalog {
  isLive(slug: string) {
    return LIVE_SLUGS.has(slug)
  }

  async definition(slug: string): Promise<McpDefinition | undefined> {
    switch (slug) {
      case "psl": {
        const { PslService } = await import("@/services/mcps/psl-service")
        return new PslService()
      }
      case "idna": {
        const { IdnaService } = await import("@/services/mcps/idna-service")
        return new IdnaService()
      }
      case "phone": {
        const { PhoneService } = await import("@/services/mcps/phone-service")
        return new PhoneService()
      }
      case "unicode": {
        const { UnicodeService } = await import("@/services/mcps/unicode-service")
        return new UnicodeService()
      }
      case "tokens": {
        const { TokensService } = await import("@/services/mcps/tokens-service")
        return new TokensService()
      }
      default:
        return undefined
    }
  }
}
