import { domainToASCII, domainToUnicode } from "node:url"
import type { McpServer } from "@modelcontextprotocol/server"
import { z } from "zod"
import { scriptsIn } from "@/lib/scripts"
import { toolJson } from "@/lib/tool-json"

export class IdnaService {
  register(server: McpServer) {
    server.registerTool(
      "to_ascii",
      {
        description: "Encode a Unicode domain to A-labels (xn--).",
        inputSchema: z.object({
          domain: z.string().describe("Domain name"),
        }),
      },
      async ({ domain }) => toolJson(this.toAscii(domain)),
    )
    server.registerTool(
      "to_unicode",
      {
        description: "Decode A-labels back to Unicode.",
        inputSchema: z.object({
          domain: z.string().describe("Domain name"),
        }),
      },
      async ({ domain }) => toolJson(this.toUnicode(domain)),
    )
    server.registerTool(
      "looks_confusable",
      {
        description: "Flag homoglyph / mixed-script lookalikes.",
        inputSchema: z.object({
          domain: z.string().describe("Domain name"),
        }),
      },
      async ({ domain }) => toolJson(this.looksConfusable(domain)),
    )
  }

  toAscii(domain: string) {
    const value = requireDomain(domain)
    const ascii = domainToASCII(value)
    if (!ascii) throw new Error(`Cannot encode domain to ASCII: ${domain}`)
    return { domain: value, ascii }
  }

  toUnicode(domain: string) {
    const value = requireDomain(domain)
    const unicode = domainToUnicode(value)
    if (!unicode) throw new Error(`Cannot decode domain to Unicode: ${domain}`)
    return { domain: value, unicode }
  }

  looksConfusable(domain: string) {
    const value = requireDomain(domain)
    const ascii = domainToASCII(value)
    const unicode = domainToUnicode(value)
    const scripts = scriptsIn(unicode || value)
    return {
      domain: value,
      ascii: ascii || undefined,
      unicode: unicode || undefined,
      scripts,
      mixedScripts: scripts.length > 1,
      punycode: /\bxn--/i.test(ascii || value),
    }
  }
}

function requireDomain(domain: string) {
  const value = domain.trim()
  if (!value) throw new Error("domain is required")
  return value
}
