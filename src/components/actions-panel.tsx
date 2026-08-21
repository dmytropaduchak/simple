import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
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

  const categories = useMemo(() => {
    const set = new Set(catalog.actions.map((action) => action.category))
    return [ALL, ...[...set].sort((a, b) => a.localeCompare(b))]
  }, [])

  const filtered = useMemo(() => {
    if (category === ALL) return catalog.actions
    return catalog.actions.filter((action) => action.category === category)
  }, [category])

  const groups = groupByCategory(filtered)

  return (
    <div className="flex max-h-[min(48svh,22rem)] min-h-0 w-full flex-col gap-2.5 overflow-hidden rounded-xl border border-border/60 bg-background/70 p-2.5 backdrop-blur-sm md:max-h-[min(52svh,24rem)] md:p-3">
      <div className="flex shrink-0 flex-wrap gap-1.5">
        {categories.map((name) => {
          const isActive = category === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              className={cn(
                "inline-flex h-6 items-center rounded-full border px-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {name}
              {name !== ALL ? (
                <span className="ml-1 opacity-70">
                  {
                    catalog.actions.filter((action) => action.category === name)
                      .length
                  }
                </span>
              ) : (
                <span className="ml-1 opacity-70">{catalog.count}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain">
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
                      className="group block rounded-md px-2 py-1.5 transition-colors hover:bg-muted/70"
                    >
                      <div className="min-w-0 flex flex-col gap-0.5">
                        <span className="truncate font-medium text-sm leading-tight">
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
      </div>
    </div>
  )
}
