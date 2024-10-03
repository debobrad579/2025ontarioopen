import { ModeToggle } from "@/components/themes/mode-toggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  return (
    <div className="flex justify-between items-center gap-4 px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw]">
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/standings">Standings</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/live">Live Games</Link>
        </Button>
      </div>
      <ModeToggle />
    </div>
  )
}
