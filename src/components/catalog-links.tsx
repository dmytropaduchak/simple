import { buttonVariants } from "@/components/ui/button"
import { useAppearance } from "@/components/theme-provider"
import { contrastForeground } from "@/lib/appearance"
import { cn } from "@/lib/utils"

const MARKETPLACE_URL =
  "https://github.com/marketplace?query=dmytropaduchak&type=actions"

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={className}
      data-icon="inline-start"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export function CatalogLinks({ className }: { className?: string }) {
  const { appearance } = useAppearance()
  const primary = appearance.accentColor
  const onPrimary = contrastForeground(primary)

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        href={MARKETPLACE_URL}
        target="_blank"
        rel="noreferrer"
        style={{ backgroundColor: primary, color: onPrimary }}
      >
        <GitHubMark className="size-3.5" />
        GitHub Marketplace
      </a>
      <a
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "hover:border-primary hover:text-primary",
        )}
        href={`${import.meta.env.BASE_URL}actions.json`}
        target="_blank"
        rel="noreferrer"
      >
        actions.json
      </a>
      <a
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "hover:border-primary hover:text-primary",
        )}
        href={`${import.meta.env.BASE_URL}llms.txt`}
        target="_blank"
        rel="noreferrer"
      >
        llms.txt
      </a>
    </div>
  )
}
