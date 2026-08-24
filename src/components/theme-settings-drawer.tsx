"use client"

import type { ReactElement, SVGProps } from "react"
import { CircleCheck, SlidersHorizontal } from "lucide-react"

import { IconThemeDark } from "@/components/theme-icons/icon-theme-dark"
import { IconThemeLight } from "@/components/theme-icons/icon-theme-light"
import { IconThemeSystem } from "@/components/theme-icons/icon-theme-system"
import { useAppearance } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DEFAULT_THEME_COLOR,
  THEME_STYLE_PRESETS,
  UI_SIZE_OPTIONS,
  type UiSize,
} from "@/lib/appearance"
import { cn } from "@/lib/utils"

export function ThemeSettingsDrawer() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            aria-label="Open theme settings"
          />
        }
      >
        <SlidersHorizontal aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[400px] max-w-[calc(100vw-24px)] gap-0 p-0"
      >
        <PopoverHeader className="px-3 pt-2 pb-2">
          <PopoverTitle>Theme settings</PopoverTitle>
          <PopoverDescription className="text-xs">
            Appearance preferences for this catalog.
          </PopoverDescription>
        </PopoverHeader>
        <ScrollArea className="h-[min(70svh,560px)]">
          <div className="flex flex-col gap-6 p-3 pt-0">
            <ThemeConfig />
            <SizeConfig />
            <StyleConfig />
            <AccentConfig />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-2 text-sm font-semibold text-muted-foreground">
      {title}
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
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
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

  return (
    <div>
      <SectionTitle title="Theme" />
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

const SIZE_PREVIEW: Record<UiSize, string> = {
  small: "text-lg",
  medium: "text-2xl",
  large: "text-4xl",
}

function SizeConfig() {
  const { appearance, setUiSize } = useAppearance()

  return (
    <div>
      <SectionTitle title="Size" />
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
              className="group text-start outline-none transition duration-200 ease-in"
              aria-label={`Select ${item.label.toLowerCase()} size`}
              aria-describedby={`${item.id}-size-description`}
              aria-pressed={selected}
            >
              <div
                className={cn(
                  "relative flex aspect-[80/51] items-center justify-center rounded-[6px] ring-1 ring-border",
                  selected && "shadow-2xl ring-primary",
                  "group-focus-visible:ring-2",
                )}
              >
                <CircleCheck
                  className={cn(
                    "absolute top-0 right-0 size-6 translate-x-1/2 -translate-y-1/2 fill-primary stroke-white",
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

function StyleConfig() {
  const { appearance, setThemeStyle } = useAppearance()

  return (
    <div>
      <SectionTitle title="Style" />
      <div className="grid grid-cols-2 gap-3">
        {THEME_STYLE_PRESETS.map((preset) => {
          const selected = appearance.themeStyle === preset.id
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setThemeStyle(preset.id)}
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
  const accentValue = appearance.accentColor || DEFAULT_THEME_COLOR

  return (
    <div>
      <SectionTitle title="Theme color" />
      <div className="flex flex-col gap-2">
        <Input
          type="color"
          value={accentValue}
          onChange={(e) => setAccentColor(e.target.value)}
          className="size-9 shrink-0 rounded-full p-1"
          aria-label="Theme color"
        />
        <p className="text-xs text-muted-foreground">
          Primary color for buttons and links. Changing style resets it to that
          style&apos;s color.
        </p>
      </div>
    </div>
  )
}
