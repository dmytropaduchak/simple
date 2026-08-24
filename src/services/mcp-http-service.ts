import { createMcpHandler } from "mcp-handler"
import { HttpError } from "@/lib/http-error"
import { logError } from "@/lib/log"
import { McpCatalog } from "@/services/mcp-catalog"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID, Authorization",
  "Access-Control-Max-Age": "86400",
}

export class McpHttpService {
  constructor(private slug: string) {}

  async handle(request: Request) {
    if (request.method === "OPTIONS") return this.options()

    const mcpCatalog = new McpCatalog()
    const definition = mcpCatalog.definition(this.slug)
    if (!definition) {
      throw new HttpError(404, `MCP not found: ${this.slug}`)
    }

    const slug = this.slug
    const handler = createMcpHandler(
      (server) => {
        definition.register(server)
      },
      {
        serverInfo: {
          name: `brainiac-${slug}`,
          version: "1.0.0",
        },
        onEvent: (event) => {
          if (event.type === "ERROR") {
            logError("api", ["mcp", slug], event.error)
          }
        },
      },
    )

    return withCors(await handler(request))
  }

  options() {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  error(err: unknown) {
    logError("api", ["mcp", this.slug], err)
    const status = err instanceof HttpError ? err.status : 500
    const message = err instanceof Error ? err.message : String(err)
    return Response.json(
      { error: message },
      { status, headers: CORS_HEADERS },
    )
  }
}

function withCors(response: Response) {
  const headers = new Headers(response.headers)
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value)
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
