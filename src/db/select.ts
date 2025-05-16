import { sql } from "@vercel/postgres"
import { Player } from "./types"

export async function getPlayer(CFCId: number) {
  return (
    await sql<Player>`
      SELECT * FROM "OntarioOpenPlayer"
      WHERE "CFCId" = ${CFCId};
    `
  ).rows[0]
}

export async function getAllPlayers() {
  return (
    await sql<Player>`
      SELECT * FROM "OntarioOpenPlayer"
      ORDER BY "rating" DESC, "lastName" DESC;
    `
  ).rows
}

export async function getSectionPlayers(bottomBound: number, topBound: number) {
  return (
    await sql<Player>`
      SELECT * FROM "OntarioOpenPlayer"
      WHERE "hasPaid" = TRUE
        AND (
          (
            GREATEST("rating", "FIDERating") BETWEEN ${bottomBound} AND ${topBound}
            AND NOT (
              GREATEST("rating", "FIDERating") BETWEEN ${
                topBound - 399
              } AND ${topBound}
              AND "isPlayingUp" = TRUE
            )
          )
          OR (
            GREATEST("rating", "FIDERating") BETWEEN ${
              bottomBound - 400
            } AND ${bottomBound}
            AND "isPlayingUp" = TRUE
          )
        )
      ORDER BY "rating" DESC, "lastName" DESC;
    `
  ).rows
}

export async function getPlayersCount() {
  const result = await sql<{ count: number }>`
    SELECT COUNT(*) AS count
    FROM "OntarioOpenPlayer"
    WHERE "hasPaid" = true;
  `;
  return result.rows[0].count;
}

export async function getPairings(section: string) {
  return (
    await sql<{ section: string, title: string, pairings: { [key: string]: string }[] }>`
      SELECT * FROM "OntarioOpenPairing"
      WHERE "section" = ${section};
    `
  ).rows[0]
}
