import { parse } from "tldts"
import type { McpServer } from "@modelcontextprotocol/server"
import { z } from "zod"
import { toolJson } from "@/lib/tool-json"

export class PslService {
  register(server: McpServer) {
    server.registerTool(
      "parse",
      {
        description:
          "Split a hostname into subdomain, registrable domain, and public suffix.",
        inputSchema: z.object({
          host: z.string().describe("Hostname or URL"),
        }),
      },
      async ({ host }) => toolJson(this.parse(host)),
    )
    server.registerTool(
      "registrable",
      {
        description: "Return the registrable domain (eTLD+1) for a host.",
        inputSchema: z.object({
          host: z.string().describe("Hostname or URL"),
        }),
      },
      async ({ host }) => toolJson(this.registrable(host)),
    )
    server.registerTool(
      "is_suffix",
      {
        description: "Whether a label is itself a public suffix.",
        inputSchema: z.object({
          host: z.string().describe("Hostname or label"),
        }),
      },
      async ({ host }) => toolJson(this.isSuffix(host)),
    )
  }

  parse(host: string) {
    const hostname = requireHost(host)
    const parsed = parse(hostname)
    return {
      hostname: parsed.hostname,
      subdomain: parsed.subdomain || undefined,
      registrable: parsed.domain || undefined,
      publicSuffix: parsed.publicSuffix || undefined,
      isIp: parsed.isIp,
    }
  }

  registrable(host: string) {
    const parsed = this.parse(host)
    if (!parsed.registrable) {
      throw new Error(`No registrable domain for host: ${host}`)
    }
    return { registrable: parsed.registrable, publicSuffix: parsed.publicSuffix }
  }

  isSuffix(host: string) {
    const hostname = requireHost(host).replace(/\.$/, "").toLowerCase()
    const parsed = parse(hostname)
    const suffix = parsed.publicSuffix?.toLowerCase()
    return {
      host: hostname,
      publicSuffix: suffix,
      isSuffix: Boolean(suffix && suffix === hostname && !parsed.domain),
    }
  }
}

function requireHost(host: string) {
  const value = host.trim()
  if (!value) throw new Error("host is required")
  return value
}
