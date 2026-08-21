import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
        href="https://github.com/dmytropaduchak?tab=repositories&q=simple-"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  )
}
