"use client"

import HealthSpot from "@/assets/img/health-spot.svg"
import HealthSpotDark from "@/assets/img/health-spot-dark.svg"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HealthSpotLogo({ className }: { className: string }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const Theme =
    mounted && resolvedTheme === "dark" ? HealthSpotDark : HealthSpot

  return <Theme className={className} />
}
