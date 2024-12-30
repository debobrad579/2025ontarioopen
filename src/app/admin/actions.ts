"use server"

import { deletePlayer } from "@/db/delete"
import { getAllPlayers } from "@/db/select"
import { updateCFCRating, updateFIDERating, updateHasPaid } from "@/db/update"
import { revalidatePath } from "next/cache"
import { JSDOM } from "jsdom"

export async function updateHasPaidAction(CFCId: number, hasPaid: boolean) {
  const player = await updateHasPaid(CFCId, hasPaid)
  revalidatePath("/admin")
  return player
}

export async function deleteAction(CFCId: number) {
  await deletePlayer(CFCId)
  revalidatePath("/admin")
}

export async function revalidateAdminAction() {
  revalidatePath("/admin")
}
