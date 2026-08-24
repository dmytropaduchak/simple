import type { McpServer } from "@modelcontextprotocol/server"
import { z } from "zod"
import { scriptsIn } from "@/lib/scripts"
import { toolJson } from "@/lib/tool-json"

const FORM = z.enum(["NFC", "NFD", "NFKC", "NFKD"])

export class UnicodeService {
  register(server: McpServer) {
    server.registerTool(
      "inspect",
      {
        description: "Name, script, category, and code point for characters.",
        inputSchema: z.object({
          text: z.string().describe("Text to inspect (first 32 characters)"),
        }),
      },
      async ({ text }) => toolJson(this.inspect(text)),
    )
    server.registerTool(
      "normalize",
      {
        description: "NFC / NFKC form of a string.",
        inputSchema: z.object({
          text: z.string(),
          form: FORM.default("NFC"),
        }),
      },
      async ({ text, form }) => toolJson(this.normalize(text, form)),
    )
    server.registerTool(
      "confusables",
      {
        description: "Scripts in the string and whether they are mixed.",
        inputSchema: z.object({
          text: z.string(),
        }),
      },
      async ({ text }) => toolJson(this.confusables(text)),
    )
  }

  inspect(text: string) {
    if (!text) throw new Error("text is required")
    const chars = [...text].slice(0, 32)
    return {
      length: [...text].length,
      scripts: scriptsIn(text),
      chars: chars.map((char) => {
        const codePoint = char.codePointAt(0) ?? 0
        return {
          char,
          codePoint,
          hex: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
          scripts: scriptsIn(char),
        }
      }),
    }
  }

  normalize(text: string, form: "NFC" | "NFD" | "NFKC" | "NFKD") {
    if (text === undefined) throw new Error("text is required")
    const normalized = text.normalize(form)
    return {
      form,
      text: normalized,
      changed: normalized !== text,
    }
  }

  confusables(text: string) {
    if (!text) throw new Error("text is required")
    const scripts = scriptsIn(text)
    return {
      scripts,
      mixedScripts: scripts.length > 1,
    }
  }
}
