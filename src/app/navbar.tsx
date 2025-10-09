"use client"

import { ModeToggle } from "@/components/themes/mode-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Logo from "@/assets/img/logo.svg"

export function Navbar() {
  return (
    <div className="flex justify-between items-center gap-2 px-5 py-3 sm:px-10 md:px-20 lg:px-[10vw] bg-card">
      <div className="flex gap-2 items-center">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:outline-ring outline-offset-4 rounded-xl"
        >
          <Logo className="w-28" />
          <span className="sr-only">Home</span>
        </Link>
        <Button variant="ghost" asChild>
          <Link href="/standings">Standings</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/games">Games</Link>
        </Button>
      </div>
      <div className="max-[400px]:hidden">
        <ModeToggle />
      </div>
    </div>
  )
}
