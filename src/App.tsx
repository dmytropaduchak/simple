import Parallax from "@/components/parallax"
import { StoicQuote } from "@/components/stoic-quote"
import { ThemeSettingsDrawer } from "@/components/theme-settings-drawer"
import { ActionsPanel } from "@/components/actions-panel"
import { ActionsHeading } from "@/components/actions-heading"
import { CatalogLinks } from "@/components/catalog-links"

const QUOTE = "What stands in the way becomes the way."
const AUTHOR = "Marcus Aurelius"

export default function App() {
  return (
    <div className="relative z-10 flex min-h-svh flex-col bg-background">
      <Parallax />

      <header className="relative z-10 flex items-center justify-between px-4 py-3 md:px-6">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          dmytropaduchak / simple
        </p>
        <ThemeSettingsDrawer />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-6 md:px-6 md:py-10">
        <div className="grid w-full max-w-sm items-center gap-8 md:max-w-5xl md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10">
          <div className="hidden min-w-0 flex-col gap-6 overflow-hidden pr-1 md:flex animate-in fade-in slide-in-from-left-4 duration-500">
            <StoicQuote text={QUOTE} author={AUTHOR} />
            <CatalogLinks />
          </div>

          <div className="flex w-full min-w-0 flex-col gap-4 justify-center animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col gap-6 md:hidden">
              <StoicQuote text={QUOTE} author={AUTHOR} />
              <CatalogLinks />
            </div>
            <ActionsHeading />
            <ActionsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
