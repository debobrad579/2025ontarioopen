import { sql } from "@vercel/postgres"
import { Player } from "./types"

export async function deletePlayer(CFCId: number) {
  await sql<Player>`
    DELETE FROM "OntarioOpenPlayer"
    WHERE "CFCId" = ${CFCId};
  `
}
