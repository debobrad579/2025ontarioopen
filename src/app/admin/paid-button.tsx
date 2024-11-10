"use client"

import { Button } from "@/components/ui/button"
import { Player } from "@/db/types"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { updateHasPaidAction } from "./actions"
import { useState, useTransition } from "react"
import { cn } from "@/lib/utils"

export function PaidButton({ player }: { player: Player }) {
  const [isPending, startTransition] = useTransition()
  const [hasPaid, setHasPaid] = useState(player.hasPaid)

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      onClick={() => {
        if (isPending) return

        startTransition(async () => {
          await updateHasPaidAction(player.CFCId, !hasPaid)
          setHasPaid((prevHasPaid) => !prevHasPaid)
        })
      }}
    >
      {hasPaid ? (
        <CheckCircledIcon
          className={cn(
            "h-[1.2rem] w-[1.2rem] text-green-500",
            isPending && "opacity-75 hover:text-green-500"
          )}
        />
      ) : (
        <CrossCircledIcon
          className={cn(
            "h-[1.2rem] w-[1.2rem] text-red-500",
            isPending && "opacity-75 hover:text-red-500"
          )}
        />
      )}
    </Button>
  )
}
