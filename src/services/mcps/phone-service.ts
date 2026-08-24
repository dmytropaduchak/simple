import parsePhoneNumberFromString, {
  isSupportedCountry,
  type CountryCode,
} from "libphonenumber-js"
import type { McpServer } from "@modelcontextprotocol/server"
import { z } from "zod"
import { toolJson } from "@/lib/tool-json"

const FORMAT = z.enum(["E.164", "INTERNATIONAL", "NATIONAL", "RFC3966"])

export class PhoneService {
  register(server: McpServer) {
    server.registerTool(
      "parse",
      {
        description: "Country, type (mobile/fixed), and national format.",
        inputSchema: z.object({
          number: z.string().describe("Phone number"),
          defaultCountry: z
            .string()
            .length(2)
            .optional()
            .describe("ISO 3166-1 alpha-2 when the number is national"),
        }),
      },
      async ({ number, defaultCountry }) =>
        toolJson(this.parse(number, defaultCountry)),
    )
    server.registerTool(
      "format",
      {
        description: "Format as E.164, international, or national.",
        inputSchema: z.object({
          number: z.string().describe("Phone number"),
          style: FORMAT.default("E.164"),
          defaultCountry: z.string().length(2).optional(),
        }),
      },
      async ({ number, style, defaultCountry }) =>
        toolJson(this.format(number, style, defaultCountry)),
    )
    server.registerTool(
      "valid",
      {
        description: "Whether the number is possible and valid for its region.",
        inputSchema: z.object({
          number: z.string().describe("Phone number"),
          defaultCountry: z.string().length(2).optional(),
        }),
      },
      async ({ number, defaultCountry }) =>
        toolJson(this.valid(number, defaultCountry)),
    )
  }

  parse(number: string, defaultCountry?: string) {
    const parsed = parseNumber(number, defaultCountry)
    return {
      number: parsed.number,
      country: parsed.country,
      countryCallingCode: parsed.countryCallingCode,
      nationalNumber: parsed.nationalNumber,
      type: parsed.getType(),
      possible: parsed.isPossible(),
      valid: parsed.isValid(),
    }
  }

  format(
    number: string,
    style: "E.164" | "INTERNATIONAL" | "NATIONAL" | "RFC3966",
    defaultCountry?: string,
  ) {
    const parsed = parseNumber(number, defaultCountry)
    return { formatted: parsed.format(style), style }
  }

  valid(number: string, defaultCountry?: string) {
    const parsed = parseNumber(number, defaultCountry)
    return {
      possible: parsed.isPossible(),
      valid: parsed.isValid(),
      country: parsed.country,
    }
  }
}

function parseNumber(number: string, defaultCountry?: string) {
  const value = number.trim()
  if (!value) throw new Error("number is required")
  const country = countryCode(defaultCountry)
  const parsed = parsePhoneNumberFromString(value, country)
  if (!parsed) throw new Error(`Cannot parse phone number: ${number}`)
  return parsed
}

function countryCode(value?: string): CountryCode | undefined {
  if (!value) return undefined
  const code = value.trim().toUpperCase()
  if (!isSupportedCountry(code)) {
    throw new Error(`Unknown defaultCountry: ${value}`)
  }
  return code
}
