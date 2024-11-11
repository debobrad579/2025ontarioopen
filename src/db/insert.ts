import { sql } from "@vercel/postgres"
import { Player } from "./types"

export async function createPlayer(playerData: Player) {
  return (
    await sql<Player>`
    INSERT INTO "OntarioOpenPlayer" ("CFCId", "rating", "firstName", "lastName", "email", "ageRange", "isFemale", "isPlayingUp")
    VALUES (
      ${playerData.CFCId}, ${playerData.rating}, ${playerData.firstName}, ${playerData.lastName},
      ${playerData.email}, ${playerData.ageRange}, ${playerData.isFemale}, ${playerData.isPlayingUp}
    );
    `
  ).rows[0]
}