import { IdnaService } from "@/services/mcps/idna-service"
import { PhoneService } from "@/services/mcps/phone-service"
import { PslService } from "@/services/mcps/psl-service"
import { TokensService } from "@/services/mcps/tokens-service"
import { UnicodeService } from "@/services/mcps/unicode-service"
import type { McpServer } from "@modelcontextprotocol/server"

export type McpDefinition = {
  register(server: McpServer): void
}

export class McpCatalog {
  definition(slug: string): McpDefinition | undefined {
    switch (slug) {
      case "psl":
        return new PslService()
      case "idna":
        return new IdnaService()
      case "phone":
        return new PhoneService()
      case "unicode":
        return new UnicodeService()
      case "tokens":
        return new TokensService()
      default:
        return undefined
    }
  }

  isLive(slug: string) {
    return Boolean(this.definition(slug))
  }
}
