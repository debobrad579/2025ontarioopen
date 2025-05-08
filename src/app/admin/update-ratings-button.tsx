"use client"

import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { revalidateAdminAction } from "./actions"

export function UpdateRatingsButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      className="w-full flex gap-2 items-center"
      size="lg"
      onClick={() =>
        startTransition(async () => {
          const res = await fetch("/api/update-ratings", {
            method: "GET",
          })

          if (!res.ok) {
            throw new Error(`HTTP error, status: ${res.status}`)
          }

          await revalidateAdminAction()
        })
      }
      disabled={process.env.NODE_ENV !== "development" || isPending}
    >
      {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
      {isPending ? "Updating Ratings" : "Update Ratings"}
    </Button>
  )
}
