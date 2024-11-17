"use client"

import { Button } from "@/components/ui/button"
import { Player } from "@/db/types"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { deleteAction, updateHasPaidAction } from "./actions"
import { useEffect, useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function PaidButton({ player }: { player: Player }) {
  const [hasPaid, setHasPaid] = useState(player.hasPaid)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setHasPaid(player.hasPaid)
  }, [player])

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={hasPaid}>
        <Button
          variant="ghost"
          size="icon"
          asChild
          onClick={() => {
            if (isPending) return

            startTransition(async () => {
              const newPlayer = await updateHasPaidAction(
                player.CFCId,
                !hasPaid
              )
              setHasPaid(newPlayer.hasPaid)
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={async () => {
            await deleteAction(player.CFCId)
            setHasPaid(player.hasPaid)
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
