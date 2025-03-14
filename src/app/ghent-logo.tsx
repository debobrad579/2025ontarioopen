"use client"

import Ghent from "@/assets/img/ghent.svg"
import GhentDark from "@/assets/img/ghent-dark.svg"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function GhentLogo({ className }: { className: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []);

  const Theme =
    mounted && resolvedTheme === "dark"
      ? GhentDark
      : Ghent

  return <Theme className={className} />
}
