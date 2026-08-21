import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

import {
  Appearance,
  type AppearanceState,
  type ThemeMode,
  type ThemeStyleId,
} from "@/lib/appearance"

type AppearanceContextValue = {
  appearance: AppearanceState
  setThemeMode: (theme: ThemeMode) => void
  setThemeStyle: (themeStyle: ThemeStyleId) => void
  setAccentColor: (accentColor: string) => void
  resetAppearance: () => void
}

const AppearanceContext = React.createContext<AppearanceContextValue | undefined>(
  undefined,
)

function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const appearanceService = React.useMemo(() => new Appearance(), [])
  const { setTheme } = useTheme()
  const [appearance, setAppearance] = React.useState<AppearanceState>(
    appearanceService.defaults(),
  )
  const appearanceRef = React.useRef(appearance)
  appearanceRef.current = appearance

  React.useEffect(() => {
    const next = appearanceService.read()
    setAppearance(next)
    setTheme(next.theme)
    appearanceService.applyDom(next)
  }, [appearanceService, setTheme])

  const commit = React.useCallback(
    (partial: Partial<AppearanceState>) => {
      const current = appearanceRef.current
      const merged = { ...current, ...partial }
      if (
        merged.theme === current.theme &&
        merged.themeStyle === current.themeStyle &&
        merged.accentColor === current.accentColor
      ) {
        return
      }
      const next = appearanceService.write(merged)
      setAppearance(next)
      if (partial.theme) {
        setTheme(partial.theme)
      }
    },
    [appearanceService, setTheme],
  )

  const resetAppearance = React.useCallback(() => {
    const next = appearanceService.reset()
    setAppearance(next)
    setTheme(next.theme)
  }, [appearanceService, setTheme])

  const setThemeMode = React.useCallback(
    (theme: ThemeMode) => commit({ theme }),
    [commit],
  )
  const setThemeStyle = React.useCallback(
    (themeStyle: ThemeStyleId) => commit({ themeStyle }),
    [commit],
  )
  const setAccentColor = React.useCallback(
    (accentColor: string) => commit({ accentColor }),
    [commit],
  )

  const value = React.useMemo<AppearanceContextValue>(
    () => ({
      appearance,
      setThemeMode,
      setThemeStyle,
      setAccentColor,
      resetAppearance,
    }),
    [
      appearance,
      resetAppearance,
      setAccentColor,
      setThemeMode,
      setThemeStyle,
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
