"use client"

import Ghent from "@/assets/img/ghent.svg"
import GhentDark from "@/assets/img/ghent-dark.svg"
import { useTheme } from "next-themes"

export function GhentLogo({ className }: { className: string }) {
  "use client"

  const { resolvedTheme } = useTheme()

  const Theme = resolvedTheme === "dark" ? GhentDark : Ghent

  return <Theme className={className} />
}
