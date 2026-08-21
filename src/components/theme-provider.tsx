import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

import {
  Appearance,
  DEFAULT_THEME_COLOR,
  type AppearanceState,
  type ThemeMode,
  type ThemeStyleId,
  type UiSize,
} from "@/lib/appearance"

type AppearanceContextValue = {
  appearance: AppearanceState
  setThemeMode: (theme: ThemeMode) => void
  setThemeStyle: (themeStyle: ThemeStyleId) => void
  setAccentColor: (accentColor: string) => void
  setUiSize: (uiSize: UiSize) => void
  resetAppearance: () => void
}

const AppearanceContext = React.createContext<AppearanceContextValue | undefined>(
  undefined,
)

function sameAppearance(a: AppearanceState, b: AppearanceState) {
  return (
    a.theme === b.theme &&
    a.themeStyle === b.themeStyle &&
    a.accentColor === b.accentColor &&
    a.uiSize === b.uiSize
  )
}

function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const appearanceService = React.useMemo(() => new Appearance(), [])
  const { setTheme } = useTheme()
  const [appearance, setAppearance] = React.useState<AppearanceState>(() =>
    appearanceService.read(),
  )
  const appearanceRef = React.useRef(appearance)
  appearanceRef.current = appearance

  React.useLayoutEffect(() => {
    appearanceService.applyDom(appearance)
  }, [appearance, appearanceService])

  React.useLayoutEffect(() => {
    setTheme(appearance.theme)
  }, [appearance.theme, setTheme])

  const commit = React.useCallback(
    (partial: Partial<AppearanceState>) => {
      const current = appearanceRef.current
      const merged = appearanceService.normalize({ ...current, ...partial })
      if (sameAppearance(merged, current)) return
      const next = appearanceService.write(merged)
      appearanceRef.current = next
      setAppearance(next)
    },
    [appearanceService],
  )

  const resetAppearance = React.useCallback(() => {
    const next = appearanceService.reset()
    appearanceRef.current = next
    setAppearance(next)
  }, [appearanceService])

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      appearanceService.applyDom(appearanceRef.current)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [appearanceService])

  const setThemeMode = React.useCallback(
    (theme: ThemeMode) => {
      const current = appearanceRef.current
      const previousPrimary =
        appearanceService.getThemeStylePrimaryColor(
          current.themeStyle,
          current.theme,
        ) || DEFAULT_THEME_COLOR
      const nextPrimary =
        appearanceService.getThemeStylePrimaryColor(
          current.themeStyle,
          theme,
        ) || DEFAULT_THEME_COLOR
      const accentColor =
        current.accentColor.toLowerCase() === previousPrimary.toLowerCase()
          ? nextPrimary
          : current.accentColor
      commit({ theme, accentColor })
    },
    [appearanceService, commit],
  )
  const setThemeStyle = React.useCallback(
    (themeStyle: ThemeStyleId) => {
      const accentColor =
        appearanceService.getThemeStylePrimaryColor(
          themeStyle,
          appearanceRef.current.theme,
        ) || DEFAULT_THEME_COLOR
      commit({ themeStyle, accentColor })
    },
    [appearanceService, commit],
  )
  const setAccentColor = React.useCallback(
    (accentColor: string) => commit({ accentColor }),
    [commit],
  )
  const setUiSize = React.useCallback(
    (uiSize: UiSize) => commit({ uiSize }),
    [commit],
  )

  const value = React.useMemo<AppearanceContextValue>(
    () => ({
      appearance,
      setThemeMode,
      setThemeStyle,
      setAccentColor,
      setUiSize,
      resetAppearance,
    }),
    [
      appearance,
      resetAppearance,
      setAccentColor,
      setThemeMode,
      setThemeStyle,
      setUiSize,
    ],
  )

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  const context = React.useContext(AppearanceContext)
  if (!context) {
    throw new Error("useAppearance must be used within AppearanceProvider")
  }
  return context
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <AppearanceProvider>{children}</AppearanceProvider>
    </NextThemesProvider>
  )
}
