import {
  countTokens as countCl100k,
  decode as decodeCl100k,
  encode as encodeCl100k,
} from "gpt-tokenizer/encoding/cl100k_base"
import {
  countTokens as countO200k,
  decode as decodeO200k,
  encode as encodeO200k,
} from "gpt-tokenizer/encoding/o200k_base"
import type { McpServer } from "@modelcontextprotocol/server"
import { z } from "zod"
import { toolJson } from "@/lib/tool-json"

const ENCODING = z.enum(["cl100k_base", "o200k_base"])

export class TokensService {
  register(server: McpServer) {
    server.registerTool(
      "count",
      {
        description: "Token count for a string and encoding.",
        inputSchema: z.object({
          text: z.string(),
          encoding: ENCODING.default("o200k_base").describe(
            "cl100k_base = GPT-4; o200k_base = GPT-4o / GPT-5",
          ),
        }),
      },
      async ({ text, encoding }) => toolJson(this.count(text, encoding)),
    )
    server.registerTool(
      "fit",
      {
        description: "Whether text fits a context budget.",
        inputSchema: z.object({
          text: z.string(),
          budget: z.number().int().positive(),
          encoding: ENCODING.default("o200k_base"),
        }),
      },
      async ({ text, budget, encoding }) =>
        toolJson(this.fit(text, budget, encoding)),
    )
    server.registerTool(
      "split",
      {
        description: "Split text into chunks under a token cap.",
        inputSchema: z.object({
          text: z.string(),
          cap: z.number().int().positive(),
          encoding: ENCODING.default("o200k_base"),
        }),
      },
      async ({ text, cap, encoding }) => toolJson(this.split(text, cap, encoding)),
    )
  }

  count(text: string, encoding: "cl100k_base" | "o200k_base") {
    if (text === undefined) throw new Error("text is required")
    return {
      encoding,
      tokens: tokenCount(text, encoding),
    }
  }

  fit(
    text: string,
    budget: number,
    encoding: "cl100k_base" | "o200k_base",
  ) {
    const tokens = tokenCount(text, encoding)
    return {
      encoding,
      tokens,
      budget,
      fits: tokens <= budget,
    }
  }

  split(text: string, cap: number, encoding: "cl100k_base" | "o200k_base") {
    if (!text) throw new Error("text is required")
    const tokens = tokenEncode(text, encoding)
    const chunks: string[] = []
    for (let i = 0; i < tokens.length; i += cap) {
      chunks.push(tokenDecode(tokens.slice(i, i + cap), encoding))
    }
    return {
      encoding,
      cap,
      chunkCount: chunks.length,
      chunks,
    }
  }
}

function tokenCount(text: string, encoding: "cl100k_base" | "o200k_base") {
  return encoding === "cl100k_base" ? countCl100k(text) : countO200k(text)
}

function tokenEncode(text: string, encoding: "cl100k_base" | "o200k_base") {
  return encoding === "cl100k_base" ? encodeCl100k(text) : encodeO200k(text)
}

function tokenDecode(tokens: number[], encoding: "cl100k_base" | "o200k_base") {
  return encoding === "cl100k_base"
    ? decodeCl100k(tokens)
    : decodeO200k(tokens)
}
