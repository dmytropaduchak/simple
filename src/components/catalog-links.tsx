import { GithubIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MARKETPLACE_URL =
  "https://github.com/marketplace?query=dmytropaduchak&type=actions"

export function CatalogLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        href={`${import.meta.env.BASE_URL}actions.json`}
        target="_blank"
        rel="noreferrer"
      >
        actions.json
      </a>
      <a
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        href={`${import.meta.env.BASE_URL}llms.txt`}
        target="_blank"
        rel="noreferrer"
      >
        llms.txt
      </a>
      <a
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        href={MARKETPLACE_URL}
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon data-icon="inline-start" />
        GitHub Marketplace
      </a>
    </div>
  )
}
