import type { SVGProps } from "react"
import { CircleCheck, RotateCcw, Settings } from "lucide-react"

import { IconThemeDark } from "@/components/theme-icons/icon-theme-dark"
import { IconThemeLight } from "@/components/theme-icons/icon-theme-light"
import { IconThemeSystem } from "@/components/theme-icons/icon-theme-system"
import { useAppearance } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Appearance,
  DEFAULT_THEME_COLOR,
  THEME_STYLE_PRESETS,
  type ThemeMode,
  type ThemeStyleId,
} from "@/lib/appearance"
import { cn } from "@/lib/utils"

export function ThemeSettingsDrawer() {
  const { resetAppearance } = useAppearance()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            aria-label="Open theme settings"
            className="rounded-full"
          />
        }
      >
        <Settings aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-4 text-start">
          <SheetTitle>Theme Settings</SheetTitle>
          <SheetDescription>
            Adjust the appearance to suit your preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 overflow-y-auto p-4">
          <ThemeConfig />
          <StyleConfig />
          <AccentConfig />
        </div>
        <SheetFooter className="border-t p-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={resetAppearance}
            aria-label="Reset all settings to default values"
          >
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SectionTitle({
  title,
  showReset = false,
  onReset,
  resetAriaLabel,
}: {
  title: string
  showReset?: boolean
  onReset?: () => void
  resetAriaLabel?: string
}) {
  return (
    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      {title}
      {showReset && onReset ? (
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="size-4 rounded-full"
          onClick={onReset}
          aria-label={resetAriaLabel}
        >
          <RotateCcw className="size-3" />
        </Button>
      ) : null}
    </div>
  )
}

function OptionCard({
  selected,
  label,
  descriptionId,
  onSelect,
  isTheme = false,
  icon: Icon,
}: {
  selected: boolean
  label: string
  descriptionId: string
  onSelect: () => void
  isTheme?: boolean
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group text-start outline-none transition duration-200 ease-in"
      aria-label={`Select ${label.toLowerCase()}`}
      aria-describedby={descriptionId}
      aria-pressed={selected}
    >
      <div
        className={cn(
          "relative rounded-[6px] ring-1 ring-border",
          selected && "shadow-2xl ring-primary",
          "group-focus-visible:ring-2",
        )}
        role="img"
        aria-label={`${label} option preview`}
      >
        <CircleCheck
          className={cn(
            "absolute top-0 right-0 size-6 translate-x-1/2 -translate-y-1/2 fill-primary stroke-white",
            !selected && "hidden",
          )}
          aria-hidden="true"
        />
        <Icon
          className={cn(
            !isTheme &&
              (selected
                ? "fill-primary stroke-primary"
                : "fill-muted-foreground stroke-muted-foreground"),
          )}
          aria-hidden="true"
        />
      </div>
      <div className="mt-1 text-xs" id={descriptionId}>
        {label}
      </div>
    </button>
  )
}

function ThemeConfig() {
  const { appearance, setThemeMode } = useAppearance()
  const defaultTheme: ThemeMode = "dark"

  return (
    <div>
      <SectionTitle
        title="Theme"
        showReset={appearance.theme !== defaultTheme}
        onReset={() => setThemeMode(defaultTheme)}
        resetAriaLabel="Reset theme preference to default"
      />
      <div
        className="grid w-full max-w-md grid-cols-3 gap-4"
        role="radiogroup"
        aria-label="Select theme preference"
      >
        {(
          [
            { value: "system", label: "System", icon: IconThemeSystem },
            { value: "light", label: "Light", icon: IconThemeLight },
            { value: "dark", label: "Dark", icon: IconThemeDark },
          ] as const
        ).map((item) => (
          <OptionCard
            key={item.value}
            selected={appearance.theme === item.value}
            label={item.label}
            descriptionId={`${item.value}-theme-description`}
            onSelect={() => setThemeMode(item.value)}
            isTheme
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  )
}

function StyleConfig() {
  const { appearance, setThemeStyle, setAccentColor } = useAppearance()
  const appearanceService = new Appearance()

  return (
    <div>
      <SectionTitle
        title="Style"
        showReset={appearance.themeStyle !== "black-white"}
        onReset={() => {
          setThemeStyle("black-white")
          setAccentColor(
            appearanceService.getThemeStylePrimaryColor(
              "black-white",
              appearance.theme,
            ) || DEFAULT_THEME_COLOR,
          )
        }}
        resetAriaLabel="Reset style to black and white"
      />
      <div className="grid grid-cols-2 gap-3">
        {THEME_STYLE_PRESETS.map((preset) => {
          const selected = appearance.themeStyle === preset.id
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setThemeStyle(preset.id as ThemeStyleId)
                setAccentColor(
                  appearanceService.getThemeStylePrimaryColor(
                    preset.id,
                    appearance.theme,
                  ) || DEFAULT_THEME_COLOR,
                )
              }}
              className={cn(
                "relative flex flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-colors",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50",
              )}
              aria-pressed={selected}
            >
              <div className="flex items-center gap-1.5">
                {preset.swatch.map((color) => (
                  <span
                    key={color}
                    className="size-3.5 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="font-medium">{preset.label}</span>
              <CircleCheck
                className={cn(
                  "absolute top-0 right-0 size-6 translate-x-1/2 -translate-y-1/2 fill-primary stroke-white",
                  !selected && "hidden",
                )}
                aria-hidden="true"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AccentConfig() {
  const { appearance, setAccentColor } = useAppearance()
  const appearanceService = new Appearance()
  const accentValue = appearance.accentColor || DEFAULT_THEME_COLOR
  const stylePrimary =
    appearanceService.getThemeStylePrimaryColor(
      appearance.themeStyle,
      appearance.theme,
    ) || DEFAULT_THEME_COLOR

  return (
    <div>
      <SectionTitle
        title="Accent"
        showReset={accentValue !== stylePrimary}
        onReset={() => setAccentColor(stylePrimary)}
        resetAriaLabel="Reset accent to style primary"
      />
      <div className="flex flex-col gap-2">
        <Input
          type="color"
          value={accentValue}
          onChange={(e) => setAccentColor(e.target.value)}
          className="size-9 shrink-0 rounded-full p-1"
          aria-label="Accent color"
        />
        <p className="text-xs text-muted-foreground">
          Primary color for buttons and links. Changing style resets it to that
          style&apos;s color.
        </p>
      </div>
    </div>
  )
}
