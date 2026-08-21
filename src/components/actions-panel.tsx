import { useMemo, useState, type CSSProperties } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import catalog from "@/data/actions.json"

const CATEGORY_HUE: Record<string, number> = {
  "Code quality": 250,
  "Code review": 290,
  "Continuous integration": 200,
  "Dependency management": 55,
  "Project management": 85,
  Publishing: 330,
  Security: 25,
  Testing: 145,
  Utilities: 220,
}

const SUBCATEGORY_HUE: Record<string, number> = {
  Audit: 175,
  Scan: 265,
  Check: 130,
  Lint: 315,
  Report: 210,
  Suggest: 95,
  Gate: 155,
  Validate: 280,
  Risk: 15,
}

function subcategoryOf(name: string) {
  const slug = name.startsWith("simple-") ? name.slice("simple-".length) : name
  const dash = slug.lastIndexOf("-")
  const kind = dash < 0 ? slug : slug.slice(dash + 1)
  return kind ? kind[0].toUpperCase() + kind.slice(1) : kind
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
      : tagHue(label, SUBCATEGORY_HUE, 180)

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

export function ActionsPanel() {
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState("")

  const categories = useMemo(() => {
    const set = new Set(catalog.actions.map((action) => action.category))
    return [ALL, ...[...set].sort((a, b) => a.localeCompare(b))]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byCategory =
      category === ALL
        ? catalog.actions
        : catalog.actions.filter((action) => action.category === category)
    if (!q) return byCategory
    return byCategory.filter((action) => {
      const subcategory = subcategoryOf(action.name).toLowerCase()
      return (
        action.name.toLowerCase().includes(q) ||
        action.description.toLowerCase().includes(q) ||
        action.category.toLowerCase().includes(q) ||
        subcategory.includes(q)
      )
    })
  }, [category, query])

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
          placeholder="Search actions…"
          aria-label="Search actions"
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
            No actions match that search.
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5 pb-1">
            {filtered.map((action) => (
              <li key={action.id}>
                <a
                  href={action.marketplace}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-md px-2 py-1.5 transition-colors hover:bg-primary/10"
                >
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <span className="min-w-0 truncate font-medium text-sm leading-tight group-hover:text-primary">
                        {action.name}
                      </span>
                      <CatalogTag kind="category" label={action.category} />
                      <CatalogTag
                        kind="subcategory"
                        label={subcategoryOf(action.name)}
                      />
                    </div>
                    <span className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                      {action.description}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
