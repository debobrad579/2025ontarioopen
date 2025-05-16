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
  revalidatePath("/register")
  return player
}

export async function updateCFCRating(CFCId: number, rating: number) {
  return (
    await sql<Player>`
      UPDATE "OntarioOpenPlayer"
      SET "rating" = ${rating}
      WHERE "CFCId" = ${CFCId}
      RETURNING *;
    `
  ).rows[0]
}

export async function updateFIDERating(CFCId: number, rating: number | null) {
  return (
    await sql<Player>`
      UPDATE "OntarioOpenPlayer"
      SET "FIDERating" = ${rating}
      WHERE "CFCId" = ${CFCId}
      RETURNING *;
    `
  ).rows[0]
}

export async function updatePairing(section: string, title: string, rows: Array<{ [key: string]: string }>) {
  const jsonBlob = JSON.stringify(rows);

  const result = await sql`
    UPDATE "OntarioOpenPairing"
    SET "pairings" = ${jsonBlob}::jsonb, "title" = ${title}
    WHERE "section" = ${section}
    RETURNING *;
  `;

  return result.rows[0];
}

export async function resetPairings() {
  const result = await sql`
    UPDATE "OntarioOpenPairing"
    SET "pairings" = '[]'::jsonb, "title" = ''
    RETURNING *;
  `;

  return result.rows[0];
}

