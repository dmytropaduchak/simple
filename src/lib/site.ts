export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://brainiac.software"
}

export function mcpEndpoint(slug: string, version = "v1") {
  return `${siteUrl()}/mcp/${slug}/${version}`
}
