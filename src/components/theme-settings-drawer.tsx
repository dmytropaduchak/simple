import type { SVGProps } from "react"
import { useState } from "react"
import { CircleCheck, RotateCcw, Settings } from "lucide-react"

import { IconThemeDark } from "@/components/theme-icons/icon-theme-dark"
import { IconThemeLight } from "@/components/theme-icons/icon-theme-light"
import { IconThemeSystem } from "@/components/theme-icons/icon-theme-system"
import { useAppearance } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
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
  DEFAULT_THEME_COLOR,
  DEFAULT_UI_SIZE,
  THEME_STYLE_PRESETS,
  UI_SIZE_OPTIONS,
  type ThemeMode,
  type UiSize,
} from "@/lib/appearance"
import { cn } from "@/lib/utils"

export function ThemeSettingsDrawer() {
  const { resetAppearance } = useAppearance()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
          <SizeConfig />
        </div>
        <SheetFooter className="border-t p-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              resetAppearance()
              setOpen(false)
            }}
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
      className="group text-start outline-none"
      aria-label={`Select ${label.toLowerCase()}`}
      aria-describedby={descriptionId}
      aria-pressed={selected}
      data-state={selected ? "checked" : "unchecked"}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[6px] ring-1 ring-border ring-offset-2 ring-offset-background transition-[box-shadow,ring-color]",
          selected
            ? "ring-2 ring-primary"
            : "group-hover:ring-foreground/30",
        )}
        role="img"
        aria-label={`${label} option preview`}
      >
        <CircleCheck
          className={cn(
            "absolute top-1 right-1 size-4 fill-primary stroke-primary-foreground",
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
  const { appearance, setThemeStyle } = useAppearance()

  return (
    <div>
      <SectionTitle
        title="Style"
        showReset={appearance.themeStyle !== "black-white"}
        onReset={() => setThemeStyle("black-white")}
        resetAriaLabel="Reset style to black and white"
      />
      <div className="grid grid-cols-2 gap-2">
        {THEME_STYLE_PRESETS.map((preset) => {
          const selected = appearance.themeStyle === preset.id
          return (
            <button
              key={preset.id}
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation()
                setThemeStyle(preset.id)
              }}
              className={cn(
                "relative flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-sm font-medium transition-colors",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted",
              )}
              aria-pressed={selected}
            >
              <span
                className="size-3.5 shrink-0 rounded-full border border-border"
                style={{
                  background: `linear-gradient(135deg, ${preset.swatch[0]} 0% 40%, ${preset.swatch[1]} 40% 70%, ${preset.swatch[2]} 70% 100%)`,
                }}
              />
              {preset.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AccentConfig() {
  const { appearance, setAccentColor } = useAppearance()
  const accentValue = appearance.accentColor || DEFAULT_THEME_COLOR

  return (
    <div>
      <SectionTitle title="Accent" />
      <div className="flex flex-col gap-2">
        <input
          type="color"
          value={accentValue}
          onChange={(e) => setAccentColor(e.target.value)}
          aria-label="Accent color"
          className="accent-color-input size-9 shrink-0 cursor-pointer rounded-full border border-border bg-background p-1.5 shadow-sm"
        />
        <p className="text-xs text-muted-foreground">
          Primary color for buttons and links. Changing style resets it to that
          style&apos;s color.
        </p>
      </div>
    </div>
  )
}

const SIZE_PREVIEW: Record<UiSize, string> = {
  small: "text-lg",
  medium: "text-2xl",
  large: "text-4xl",
}

function SizeConfig() {
  const { appearance, setUiSize } = useAppearance()

  return (
    <div>
      <SectionTitle
        title="Size"
        showReset={appearance.uiSize !== DEFAULT_UI_SIZE}
        onReset={() => setUiSize(DEFAULT_UI_SIZE)}
        resetAriaLabel="Reset display size to small"
      />
      <div
        className="grid w-full max-w-md grid-cols-3 gap-4"
        role="radiogroup"
        aria-label="Select display size"
      >
        {UI_SIZE_OPTIONS.map((item) => {
          const selected = appearance.uiSize === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setUiSize(item.id)}
              className="group text-start outline-none"
              aria-label={`Select ${item.label.toLowerCase()} size`}
              aria-describedby={`${item.id}-size-description`}
              aria-pressed={selected}
            >
              <div
                className={cn(
                  "relative flex aspect-[80/51] items-center justify-center overflow-hidden rounded-[6px] ring-1 ring-border ring-offset-2 ring-offset-background",
                  selected
                    ? "ring-2 ring-primary"
                    : "group-hover:ring-foreground/30",
                )}
              >
                <CircleCheck
                  className={cn(
                    "absolute top-1 right-1 size-4 fill-primary stroke-primary-foreground",
                    !selected && "hidden",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "font-medium leading-none",
                    SIZE_PREVIEW[item.id],
                  )}
                >
                  Aa
                </span>
              </div>
              <div className="mt-1 text-xs" id={`${item.id}-size-description`}>
                {item.label}
              </div>
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Small is the default. Medium and Large scale type and spacing.
      </p>
    </div>
  )
}
