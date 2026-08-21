"use client"

import * as React from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { MoveDirection, OutMode, type ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "next-themes"

/**
 * Soft particle parallax used on public auth surfaces.
 * Copied from crm.enginuitysales.com / admin.
 */
export default function Parallax() {
  const { resolvedTheme } = useTheme()
  const [ready, setReady] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const isLight = mounted && resolvedTheme === "light"
  const color = isLight ? "#404040" : "#e5e5e5"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    let cancelled = false
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const options = React.useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 3 },
          repulse: { distance: 160, duration: 0.4 },
        },
      },
      particles: {
        color: { value: color },
        links: {
          color,
          distance: 150,
          enable: true,
          opacity: 0.28,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          random: false,
          speed: 0.7,
          straight: false,
        },
        number: {
          density: { enable: true, width: 1920, height: 1080 },
          value: 100,
        },
        opacity: { value: 0.2 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
    }),
    [color],
  )

  if (!ready || !mounted) {
    return null
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <Particles
        key={color}
        id="simple-actions-parallax"
        className="!absolute inset-0 size-full"
        options={options}
      />
    </div>
  )
}
