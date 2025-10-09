import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UpdatePairingsStandings } from "./update-pairings-standings"

export const revalidate = 0

export default async function Admin() {
  return (
    <div className="space-y-4 pb-4">
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/admin/players">/admin/players</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/stripe">/admin/stripe</Link>
        </Button>
      </div>
      <UpdatePairingsStandings />
    </div>
  )
}

