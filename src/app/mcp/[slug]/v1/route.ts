import type { NextRequest } from "next/server"
import { McpHttpService } from "@/services/mcp-http-service"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const maxDuration = 60

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  try {
    const mcpHttpService = new McpHttpService(slug)
    return await mcpHttpService.handle(request)
  } catch (err) {
    const mcpHttpService = new McpHttpService(slug)
    return mcpHttpService.error(err)
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  try {
    const mcpHttpService = new McpHttpService(slug)
    return await mcpHttpService.handle(request)
  } catch (err) {
    const mcpHttpService = new McpHttpService(slug)
    return mcpHttpService.error(err)
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  try {
    const mcpHttpService = new McpHttpService(slug)
    return await mcpHttpService.handle(request)
  } catch (err) {
    const mcpHttpService = new McpHttpService(slug)
    return mcpHttpService.error(err)
  }
}

export async function OPTIONS(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params
  try {
    const mcpHttpService = new McpHttpService(slug)
    return await mcpHttpService.handle(request)
  } catch (err) {
    const mcpHttpService = new McpHttpService(slug)
    return mcpHttpService.error(err)
  }
}
