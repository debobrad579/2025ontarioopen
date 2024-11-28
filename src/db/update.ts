import { sql } from "@vercel/postgres"
import { Player } from "./types"
import { revalidatePath } from "next/cache"

export async function updateHasPaid(CFCId: number, hasPaid: boolean) {
  const player = (
    await sql<Player>`
      UPDATE "OntarioOpenPlayer"
      SET "hasPaid" = ${hasPaid}
      WHERE "CFCId" = ${CFCId}
      RETURNING *;
    `
  ).rows[0]
  revalidatePath("/players")
  return player
}
