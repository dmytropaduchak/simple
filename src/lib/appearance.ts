export const DEFAULT_THEME_COLOR = "#ffffff"
export const DEFAULT_THEME_STYLE = "black-white"
export const APPEARANCE_STORAGE_KEY = "dmytropaduchak.simple.appearance"

export type ThemeMode = "light" | "dark" | "system"

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

function contrastForeground(hex: string) {
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

    return { theme, themeStyle, accentColor }
  }

  getPreset(id?: string) {
    return (
      THEME_STYLE_PRESETS.find((preset) => preset.id === id) ??
      THEME_STYLE_PRESETS[0]!
    )
  }

  getThemeStylePrimaryColor(styleId?: string, mode?: string) {
    const preset = this.getPreset(styleId)
    if (preset.id === "black-white") return DEFAULT_THEME_COLOR

    const resolvedMode =
      mode === "light" || mode === "dark"
        ? mode
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"

    if (resolvedMode === "light" && preset.primaryLight) return preset.primaryLight
    if (resolvedMode === "dark" && preset.primaryDark) return preset.primaryDark
    if (preset.primaryDark) return preset.primaryDark
    if (preset.primaryLight) return preset.primaryLight
    return preset.swatch[1]
  }

  applyDom(state: AppearanceState) {
    const root = document.documentElement
    root.dataset.themeStyle = state.themeStyle

    const accent =
      state.accentColor?.trim() ||
      this.getThemeStylePrimaryColor(state.themeStyle, state.theme) ||
      DEFAULT_THEME_COLOR

    root.style.setProperty("--accent-override", accent)
    const foreground = contrastForeground(accent)
    root.style.setProperty("--primary", accent)
    root.style.setProperty("--primary-foreground", foreground)
    root.style.setProperty("--ring", accent)
  }
}
