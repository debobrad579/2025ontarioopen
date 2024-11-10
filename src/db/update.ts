import { sql } from "@vercel/postgres"
import { Player } from "./types"

export async function updateHasPaid(CFCId: number, hasPaid: boolean) {
  return (
    await sql<Player>`
      UPDATE "OntarioOpenPlayer"
      SET "hasPaid" = ${hasPaid}
      WHERE "CFCId" = ${CFCId};
    `
  ).rows[0]
}
