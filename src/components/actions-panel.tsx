import { ExternalLinkIcon } from "lucide-react"
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

export function ActionsPanel() {
  const groups = groupByCategory(catalog.actions)

  return (
    <div className="flex max-h-[min(70svh,36rem)] min-h-0 w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-background/70 p-3 backdrop-blur-sm md:max-h-[min(72svh,40rem)] md:p-4">
      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-6 pb-1">
          {groups.map(([category, actions]) => (
            <section key={category} className="flex flex-col gap-2">
              <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {category}
              </h2>
              <ul className="flex flex-col gap-1.5">
                {actions.map((action) => (
                  <li key={action.id}>
                    <a
                      href={action.marketplace}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/70"
                    >
                      <div className="min-w-0 flex flex-col gap-0.5">
                        <span className="truncate font-medium text-sm">
                          {action.name}
                        </span>
                        <span className="text-xs leading-snug text-muted-foreground">
                          {action.description}
                        </span>
                      </div>
                      <ExternalLinkIcon className="mt-0.5 size-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-90" />
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
