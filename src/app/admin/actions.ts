"use server"

import { updateHasPaid } from "@/db/update"
import { revalidatePath } from "next/cache"

export async function updateHasPaidAction(CFCId: number, hasPaid: boolean) {
  await updateHasPaid(CFCId, hasPaid)
  revalidatePath("/players")
}
