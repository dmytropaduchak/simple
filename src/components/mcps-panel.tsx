"use client"

import { useState, type CSSProperties } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { CatalogMcp } from "@/lib/catalog"

const CATEGORY_HUE: Record<string, number> = {
  Internet: 200,
  "Web platform": 250,
  Packages: 55,
  Identifiers: 85,
  Agent: 290,
  World: 145,
}

const KIND_HUE: Record<string, number> = {
  Lookup: 210,
  Parse: 315,
  Inspect: 25,
  Extract: 175,
  Count: 265,
  Decode: 95,
}

function tagHue(label: string, hues: Record<string, number>, offset: number) {
  if (hues[label] !== undefined) return hues[label]
  let hash = 0
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return (hash + offset) % 360
}

function CatalogTag({
  label,
  kind,
}: {
  label: string
  kind: "category" | "subcategory"
}) {
  const hue =
    kind === "category"
      ? tagHue(label, CATEGORY_HUE, 0)
      : tagHue(label, KIND_HUE, 180)

  return (
    <Badge
      variant="outline"
      className={
        kind === "category"
          ? "catalog-tag-category"
          : "catalog-tag-subcategory"
      }
      style={{ "--tag-hue": hue } as CSSProperties}
    >
      {label}
    </Badge>
  )
}

const ALL = "All"
const LIVE = "Live"

export function McpsPanel({ mcps }: { mcps: CatalogMcp[] }) {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState("")

  const categories = [
    ALL,
    LIVE,
    ...[...new Set(mcps.map((mcp) => mcp.category))].sort((a, b) =>
      a.localeCompare(b),
    ),
  ]

  const q = query.trim().toLowerCase()
  const byCategory =
    category === ALL
      ? mcps
      : category === LIVE
        ? mcps.filter((mcp) => mcp.isLive)
        : mcps.filter((mcp) => mcp.category === category)
  const filtered = q
    ? byCategory.filter((mcp) => {
        const toolBlob = mcp.tools.map((tool) => tool.name).join(" ")
        return (
          mcp.name.toLowerCase().includes(q) ||
          mcp.description.toLowerCase().includes(q) ||
          mcp.category.toLowerCase().includes(q) ||
          mcp.kind.toLowerCase().includes(q) ||
          toolBlob.toLowerCase().includes(q)
        )
      })
    : byCategory

  return (
    <div className="flex max-h-[min(32svh,14rem)] min-h-0 w-full flex-col gap-2 overflow-hidden rounded-xl border border-border/60 bg-background/70 p-2 backdrop-blur-sm md:max-h-[min(38svh,16rem)] md:p-2.5">
      <label className="relative block w-full shrink-0">
        <Search
          className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search MCPs…"
          aria-label="Search MCPs"
          className="h-7 w-full pl-8 text-sm"
        />
      </label>

      <div className="scrollbar-none flex shrink-0 gap-1.5 overflow-x-auto overscroll-x-contain pb-0.5">
        {categories.map((name) => {
          const isActive = category === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              className={cn(
                "inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-transparent"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              style={
                isActive
                  ? {
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }
                  : undefined
              }
            >
              {name}
            </button>
          )
        })}
      </div>

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {filtered.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">
            No MCPs match that search.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 pb-1">
            {filtered.map((mcp) => (
              <li key={mcp.id}>
                <Link
                  href={`/mcp/${mcp.slug}`}
                  className="group block rounded-md px-2 py-1.5 transition-colors hover:bg-primary/10"
                >
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <span className="min-w-0 truncate font-medium text-sm leading-tight group-hover:text-primary">
                        {mcp.name}
                      </span>
                      {mcp.isLive ? (
                        <Badge variant="default" className="h-5">
                          Live
                        </Badge>
                      ) : null}
                      <CatalogTag kind="category" label={mcp.category} />
                      <CatalogTag kind="subcategory" label={mcp.kind} />
                    </div>
                    <span className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                      {mcp.description}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
