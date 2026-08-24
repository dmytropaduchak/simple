"use client"

import { buttonVariants } from "@/components/ui/button"
import { useAppearance } from "@/components/theme-provider"
import { contrastForeground } from "@/lib/appearance"
import { cn } from "@/lib/utils"

export function CatalogLinks({ className }: { className?: string }) {
  const { appearance } = useAppearance()
  const primary = appearance.accentColor
  const onPrimary = contrastForeground(primary)

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        href="/mcps.json"
        target="_blank"
        rel="noreferrer"
        style={{ backgroundColor: primary, color: onPrimary }}
      >
        mcps.json
      </a>
      <a
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "hover:border-primary hover:text-primary",
        )}
        href="/llms.txt"
        target="_blank"
        rel="noreferrer"
      >
        llms.txt
      </a>
    </div>
  )
}
