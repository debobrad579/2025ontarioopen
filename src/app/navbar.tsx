import { ModeToggle } from "@/components/themes/mode-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Logo from "@/assets/img/logo.svg"

export function Navbar() {
  return (
    <div className="flex justify-between items-center gap-4 px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw] bg-card">
      <div className="flex gap-4 items-center">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:outline-ring outline-offset-4 rounded-xl"
        >
          <Logo className="w-28" />
          <span className="sr-only">Home</span>
        </Link>
        <Button variant="ghost" asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/players">Players</Link>
        </Button>
        {/* <Button variant="ghost" asChild>
          <Link href="/standings">Standings</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/games">Games</Link>
        </Button> */}
      </div>
      <ModeToggle />
    </div>
  )
}
