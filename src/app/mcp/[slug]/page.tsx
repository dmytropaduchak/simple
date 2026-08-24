import Link from "next/link"
import { notFound } from "next/navigation"
import Parallax from "@/components/parallax"
import { ThemeSettingsDrawer } from "@/components/theme-settings-drawer"
import { CatalogService } from "@/services/catalog-service"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export default async function McpDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mcp = await new CatalogService().getBySlug(slug)
  if (!mcp) notFound()

  return (
    <div className="relative z-10 flex min-h-svh flex-col bg-background">
      <Parallax />

      <header className="relative z-10 flex items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/"
          className="text-xs tracking-wide text-muted-foreground uppercase hover:text-foreground"
        >
          brainiac.software
        </Link>
        <ThemeSettingsDrawer />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-10 md:px-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
              {mcp.name}
            </h1>
            <Badge variant="outline">{mcp.category}</Badge>
            <Badge variant="outline">{mcp.kind}</Badge>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">
            {mcp.description}
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-background/70 p-3 backdrop-blur-sm">
          <p className="mb-1 text-xs tracking-wide text-muted-foreground uppercase">
            Endpoint
          </p>
          <code className="block break-all text-sm">{mcp.endpoint}</code>
        </div>

        <ul className="flex flex-col gap-2">
          {mcp.tools.map((tool) => (
            <li
              key={tool.name}
              className="rounded-lg border border-border/60 bg-background/70 px-3 py-2 backdrop-blur-sm"
            >
              <p className="font-medium text-sm">{tool.name}</p>
              <p className="text-xs text-muted-foreground">{tool.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
