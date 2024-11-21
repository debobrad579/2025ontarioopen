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
            "rating" BETWEEN ${bottomBound} AND ${topBound}
            AND NOT (
              "rating" BETWEEN ${topBound - 99} AND ${topBound}
              AND "isPlayingUp" = TRUE
            )
          )
          OR (
            "rating" BETWEEN ${bottomBound - 100}
            AND ${bottomBound} AND "isPlayingUp" = TRUE
          )
        )
      ORDER BY "rating" DESC, "lastName" DESC;
    `
  ).rows
}

export async function getSectionStandings(
  bottomBound: number,
  topBound: number
) {
  return (
    await sql<Player & { totalScore: number }>`
      SELECT *, (
        CASE "result1" WHEN 'WIN' THEN 1 WHEN 'DRAW' THEN 0.5 ELSE 0 END +
        CASE "result2" WHEN 'WIN' THEN 1 WHEN 'DRAW' THEN 0.5 ELSE 0 END +
        CASE "result3" WHEN 'WIN' THEN 1 WHEN 'DRAW' THEN 0.5 ELSE 0 END +
        CASE "result4" WHEN 'WIN' THEN 1 WHEN 'DRAW' THEN 0.5 ELSE 0 END +
        CASE "result5" WHEN 'WIN' THEN 1 WHEN 'DRAW' THEN 0.5 ELSE 0 END +
        CASE "result6" WHEN 'WIN' THEN 1 WHEN 'DRAW' THEN 0.5 ELSE 0 END
      ) AS "totalScore" FROM "OntarioOpenPlayer"
      WHERE "hasPaid" = TRUE
        AND (
          (
            "rating" BETWEEN ${bottomBound} AND ${topBound}
            AND NOT (
              "rating" BETWEEN ${topBound - 99} AND ${topBound}
              AND "isPlayingUp" = TRUE
            )
          )
          OR (
            "rating" BETWEEN ${bottomBound - 100}
            AND ${bottomBound} AND "isPlayingUp" = TRUE
          )
        )
      ORDER BY "totalScore" DESC, "rating" DESC, "lastName" DESC;
    `
  ).rows
}
