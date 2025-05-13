import { Button } from "@/components/ui/button"
import Link from "next/link"

export const revalidate = 0

export default async function Admin() {
  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href="/admin/players">/admin/players</Link>
      </Button>
      <Button asChild>
        <Link href="/admin/stripe">/admin/stripe</Link>
      </Button>
    </div>
  )
}

