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
    <div className="flex max-h-[min(70svh,36rem)] min-h-0 w-full flex-col gap-3 overflow-hidden rounded-xl border border-border/60 bg-background/70 p-3 backdrop-blur-sm md:max-h-[min(72svh,40rem)] md:p-4">
      <div className="scrollbar-none flex shrink-0 gap-1.5 overflow-x-auto pb-0.5">
        {categories.map((name) => {
          const isActive = category === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              className={cn(
                "inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-xs font-medium transition-colors",
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
        <div className="flex flex-col gap-6 pb-1">
          {groups.map(([groupName, actions]) => (
            <section key={groupName} className="flex flex-col gap-2">
              {category === ALL ? (
                <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {groupName}
                </h2>
              ) : null}
              <ul className="flex flex-col gap-1.5">
                {actions.map((action) => (
                  <li key={action.id}>
                    <a
                      href={action.marketplace}
                      target="_blank"
                      rel="noreferrer"
                      className="group block rounded-lg px-2 py-2 transition-colors hover:bg-muted/70"
                    >
                      <div className="min-w-0 flex flex-col gap-0.5">
                        <span className="truncate font-medium text-sm">
                          {action.name}
                        </span>
                        <span className="text-xs leading-snug text-muted-foreground">
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
