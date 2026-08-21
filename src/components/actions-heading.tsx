import { Badge } from "@/components/ui/badge"
import catalog from "@/data/actions.json"

export function ActionsHeading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Simple Actions
        </h1>
        <Badge variant="secondary">{catalog.count}</Badge>
      </div>
      <p className="max-w-md text-sm text-muted-foreground md:text-base">
        Small GitHub Actions for PR risk, quality, and CI hygiene. Open
        Marketplace for install YAML.
      </p>
    </div>
  )
}
