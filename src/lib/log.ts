export function log(
  level: "INFO" | "WARN" | "ERROR",
  area: "api" | "services",
  parts: string[],
  detail?: string,
) {
  const prefix = `[${level}][app][${area}]${parts.map((part) => `[${part}]`).join("")}`
  const line = detail ? `${prefix} ${detail}` : prefix
  if (level === "ERROR") console.error(line)
  else if (level === "WARN") console.warn(line)
  else console.log(line)
}

export function logError(area: "api" | "services", parts: string[], err: unknown) {
  const message = err instanceof Error ? err.message : String(err)
  console.error(
    `[ERROR][app][${area}]${parts.map((part) => `[${part}]`).join("")} ${message}`,
    err,
  )
}
