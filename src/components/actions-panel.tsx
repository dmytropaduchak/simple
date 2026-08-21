import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import catalog from "@/data/actions.json"

type Action = (typeof catalog.actions)[number]

function groupByCategory(actions: Action[]) {
  const map = new Map<string, Action[]>()
  for (const action of actions) {
    const list = map.get(action.category) ?? []
    list.push(action)
    map.set(action.category, list)
  }
  return [...map.entries()]
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
    return byCategory.filter(
      (action) =>
        action.name.toLowerCase().includes(q) ||
        action.description.toLowerCase().includes(q) ||
        action.category.toLowerCase().includes(q),
    )
  }, [category, query])

  const groups = groupByCategory(filtered)

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
        {groups.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">
            No actions match that search.
          </p>
        ) : (
          <div className="flex flex-col gap-4 pb-1">
            {groups.map(([groupName, actions]) => (
              <section key={groupName} className="flex flex-col gap-1.5">
                {category === ALL ? (
                  <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {groupName}
                  </h2>
                ) : null}
                <ul className="flex flex-col gap-0.5">
                  {actions.map((action) => (
                    <li key={action.id}>
                      <a
                        href={action.marketplace}
                        target="_blank"
                        rel="noreferrer"
                        className="group block rounded-md px-2 py-1.5 transition-colors hover:bg-primary/10"
                      >
                        <div className="min-w-0 flex flex-col gap-0.5">
                          <span className="truncate font-medium text-sm leading-tight group-hover:text-primary">
                            {action.name}
                          </span>
                          <span className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                            {action.description}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
