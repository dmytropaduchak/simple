export const DEFAULT_THEME_COLOR = "#ffffff"
export const DEFAULT_THEME_STYLE = "black-white"
export const APPEARANCE_STORAGE_KEY = "dmytropaduchak.simple.appearance"

export type ThemeMode = "light" | "dark" | "system"

export type UiSize = "small" | "medium" | "large"

export const UI_SIZE_SCALE: Record<UiSize, string> = {
  small: "100%",
  medium: "112.5%",
  large: "125%",
}

export const UI_SIZE_OPTIONS: { id: UiSize; label: string }[] = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
]

export const DEFAULT_UI_SIZE: UiSize = "small"

export type ThemeStyleId =
  | "black-white"
  | "gruvbox"
  | "solarized"
  | "tokyo-night"
  | "catppuccin"
  | "everforest"

export type ThemeStylePreset = {
  id: ThemeStyleId
  label: string
  swatch: [string, string, string]
  primaryLight?: string
  primaryDark?: string
}

export type AppearanceState = {
  theme: ThemeMode
  themeStyle: ThemeStyleId
  accentColor: string
  uiSize: UiSize
}

type ThemeSurfaces = {
  background: string
  foreground: string
  card: string
  muted: string
  mutedForeground: string
  secondary: string
  border: string
  destructive: string
}

const THEME_STYLE_SURFACES: Record<
  ThemeStyleId,
  { light: ThemeSurfaces; dark: ThemeSurfaces }
> = {
  "black-white": {
    light: {
      background: "#ffffff",
      foreground: "#171717",
      card: "#ffffff",
      muted: "#f5f5f5",
      mutedForeground: "#737373",
      secondary: "#f5f5f5",
      border: "#e5e5e5",
      destructive: "#e11d48",
    },
    dark: {
      background: "#0a0a0a",
      foreground: "#fafafa",
      card: "#171717",
      muted: "#262626",
      mutedForeground: "#a3a3a3",
      secondary: "#262626",
      border: "#262626",
      destructive: "#fb7185",
    },
  },
  gruvbox: {
    light: {
      background: "#fbf1c7",
      foreground: "#3c3836",
      card: "#f9ecba",
      muted: "#ebdbb2",
      mutedForeground: "#928374",
      secondary: "#d5c4a1",
      border: "#d5c4a1",
      destructive: "#cc241d",
    },
    dark: {
      background: "#282828",
      foreground: "#ebdbb2",
      card: "#32302f",
      muted: "#3c3836",
      mutedForeground: "#a89984",
      secondary: "#504945",
      border: "#504945",
      destructive: "#fb4934",
    },
  },
  solarized: {
    light: {
      background: "#fdf6e3",
      foreground: "#586e75",
      card: "#eee8d5",
      muted: "#eee8d5",
      mutedForeground: "#93a1a1",
      secondary: "#eee8d5",
      border: "#d9d2bc",
      destructive: "#dc322f",
    },
    dark: {
      background: "#002b36",
      foreground: "#93a1a1",
      card: "#073642",
      muted: "#073642",
      mutedForeground: "#586e75",
      secondary: "#073642",
      border: "#0a4655",
      destructive: "#dc322f",
    },
  },
  "tokyo-night": {
    light: {
      background: "#e1e2e7",
      foreground: "#3760bf",
      card: "#d5d6db",
      muted: "#c1c2c7",
      mutedForeground: "#848cb5",
      secondary: "#c1c2c7",
      border: "#c1c2c7",
      destructive: "#f52a65",
    },
    dark: {
      background: "#1a1b26",
      foreground: "#c0caf5",
      card: "#1f2335",
      muted: "#24283b",
      mutedForeground: "#565f89",
      secondary: "#24283b",
      border: "#33385a",
      destructive: "#f7768e",
    },
  },
  catppuccin: {
    light: {
      background: "#eff1f5",
      foreground: "#4c4f69",
      card: "#e6e9ef",
      muted: "#ccd0da",
      mutedForeground: "#8c8fa1",
      secondary: "#ccd0da",
      border: "#ccd0da",
      destructive: "#d20f39",
    },
    dark: {
      background: "#1e1e2e",
      foreground: "#cdd6f4",
      card: "#252537",
      muted: "#313244",
      mutedForeground: "#7f849c",
      secondary: "#313244",
      border: "#3b3c52",
      destructive: "#f38ba8",
    },
  },
  everforest: {
    light: {
      background: "#fdf6e3",
      foreground: "#5c6a72",
      card: "#f4f0d9",
      muted: "#efebd4",
      mutedForeground: "#939f91",
      secondary: "#efebd4",
      border: "#ddd8be",
      destructive: "#f85552",
    },
    dark: {
      background: "#2d353b",
      foreground: "#d3c6aa",
      card: "#343f44",
      muted: "#3d484d",
      mutedForeground: "#859289",
      secondary: "#3d484d",
      border: "#475258",
      destructive: "#e67e80",
    },
  },
}

export const THEME_STYLE_PRESETS: ThemeStylePreset[] = [
  {
    id: "black-white",
    label: "Black & White",
    swatch: ["#0a0a0a", "#fafafa", "#a3a3a3"],
  },
  {
    id: "gruvbox",
    label: "Gruvbox",
    swatch: ["#282828", "#fabd2f", "#ebdbb2"],
    primaryLight: "#d79921",
    primaryDark: "#fabd2f",
  },
  {
    id: "solarized",
    label: "Solarized",
    swatch: ["#002b36", "#268bd2", "#93a1a1"],
    primaryLight: "#268bd2",
    primaryDark: "#268bd2",
  },
  {
    id: "tokyo-night",
    label: "Tokyo Night",
    swatch: ["#1a1b26", "#7aa2f7", "#c0caf5"],
    primaryLight: "#2e7de9",
    primaryDark: "#7aa2f7",
  },
  {
    id: "catppuccin",
    label: "Catppuccin",
    swatch: ["#1e1e2e", "#cba6f7", "#cdd6f4"],
    primaryLight: "#8839ef",
    primaryDark: "#cba6f7",
  },
  {
    id: "everforest",
    label: "Everforest",
    swatch: ["#2d353b", "#a7c080", "#d3c6aa"],
    primaryLight: "#8da101",
    primaryDark: "#a7c080",
  },
]

export function contrastForeground(hex: string) {
  const value = hex.replace(/^#/, "")
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value
  if (full.length !== 6) return "#ffffff"
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? "#0a0a0a" : "#ffffff"
}

export class Appearance {
  defaults(): AppearanceState {
    return {
      theme: "dark",
      themeStyle: "black-white",
      accentColor: DEFAULT_THEME_COLOR,
      uiSize: DEFAULT_UI_SIZE,
    }
  }

  read(): AppearanceState {
    try {
      const raw = window.localStorage.getItem(APPEARANCE_STORAGE_KEY)
      if (!raw) return this.defaults()
      return this.normalize(JSON.parse(raw) as Partial<AppearanceState>)
    } catch {
      return this.defaults()
    }
  }

  write(state: AppearanceState) {
    const next = this.normalize(state)
    window.localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(next))
    this.applyDom(next)
    return next
  }

  reset() {
    return this.write(this.defaults())
  }

  normalize(input?: Partial<AppearanceState>): AppearanceState {
    const defaults = this.defaults()
    const theme =
      input?.theme === "light" ||
      input?.theme === "system" ||
      input?.theme === "dark"
        ? input.theme
        : defaults.theme

    const rawStyle = input?.themeStyle as string | undefined
    const requestedStyle =
      rawStyle === "default" ? "black-white" : input?.themeStyle

    const themeStyle = THEME_STYLE_PRESETS.some(
      (preset) => preset.id === requestedStyle,
    )
      ? (requestedStyle as ThemeStyleId)
      : defaults.themeStyle

    const accentColor =
      typeof input?.accentColor === "string" && input.accentColor.trim()
        ? input.accentColor.trim()
        : this.getThemeStylePrimaryColor(themeStyle, theme) ||
          DEFAULT_THEME_COLOR

    const uiSize =
      input?.uiSize === "small" ||
      input?.uiSize === "medium" ||
      input?.uiSize === "large"
        ? input.uiSize
        : defaults.uiSize

    return { theme, themeStyle, accentColor, uiSize }
  }

  getPreset(id?: string) {
    return (
      THEME_STYLE_PRESETS.find((preset) => preset.id === id) ??
      THEME_STYLE_PRESETS[0]!
    )
  }

  resolvedMode(mode?: string): "light" | "dark" {
    if (mode === "light" || mode === "dark") return mode
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }

  getThemeStylePrimaryColor(styleId?: string, mode?: string) {
    const preset = this.getPreset(styleId)
    const resolvedMode = this.resolvedMode(mode)

    if (preset.id === "black-white") {
      return resolvedMode === "light" ? "#0a0a0a" : DEFAULT_THEME_COLOR
    }

    if (resolvedMode === "light" && preset.primaryLight) return preset.primaryLight
    if (resolvedMode === "dark" && preset.primaryDark) return preset.primaryDark
    if (preset.primaryDark) return preset.primaryDark
    if (preset.primaryLight) return preset.primaryLight
    return preset.swatch[1]
  }

  applyDom(state: AppearanceState) {
    const root = document.documentElement
    root.dataset.themeStyle = state.themeStyle
    root.dataset.uiSize = state.uiSize
    root.style.fontSize = UI_SIZE_SCALE[state.uiSize]

    const mode = this.resolvedMode(state.theme)
    const surfaces = THEME_STYLE_SURFACES[state.themeStyle][mode]
    let accent =
      state.accentColor?.trim() ||
      this.getThemeStylePrimaryColor(state.themeStyle, state.theme) ||
      DEFAULT_THEME_COLOR
    if (
      mode === "light" &&
      (accent.toLowerCase() === DEFAULT_THEME_COLOR.toLowerCase() ||
        accent.toLowerCase() === "#fff")
    ) {
      accent = this.getThemeStylePrimaryColor(state.themeStyle, "light")
    }
    const primaryForeground = contrastForeground(accent)

    const tokens: Record<string, string> = {
      background: surfaces.background,
      foreground: surfaces.foreground,
      card: surfaces.card,
      "card-foreground": surfaces.foreground,
      popover: surfaces.card,
      "popover-foreground": surfaces.foreground,
      secondary: surfaces.secondary,
      "secondary-foreground": surfaces.foreground,
      muted: surfaces.muted,
      "muted-foreground": surfaces.mutedForeground,
      accent: surfaces.muted,
      "accent-foreground": surfaces.foreground,
      destructive: surfaces.destructive,
      border: surfaces.border,
      input: surfaces.border,
      sidebar: surfaces.card,
      "sidebar-foreground": surfaces.foreground,
      "sidebar-accent": surfaces.muted,
      "sidebar-accent-foreground": surfaces.foreground,
      "sidebar-border": surfaces.border,
      primary: accent,
      "primary-foreground": primaryForeground,
      ring: accent,
      "sidebar-primary": accent,
      "sidebar-primary-foreground": primaryForeground,
      "sidebar-ring": accent,
    }

    for (const [name, value] of Object.entries(tokens)) {
      root.style.setProperty(`--${name}`, value)
      root.style.setProperty(`--color-${name}`, value)
    }
    root.style.setProperty("--accent-override", accent)
  }
}
