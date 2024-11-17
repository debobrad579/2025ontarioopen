"use server"

import { deletePlayer } from "@/db/delete"
import { updateHasPaid } from "@/db/update"
import { revalidatePath } from "next/cache"

export async function updateHasPaidAction(CFCId: number, hasPaid: boolean) {
  const player = await updateHasPaid(CFCId, hasPaid)
  revalidatePath("/players")
  revalidatePath("/admin")
  return player
}

export async function deleteAction(CFCId: number) {
  await deletePlayer(CFCId)
  revalidatePath("/admin")
}
