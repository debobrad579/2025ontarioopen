"use server"

import { deletePlayer } from "@/db/delete"
import { resetPairings, updateHasPaid, updatePairing } from "@/db/update"
import { revalidatePath } from "next/cache"

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

export async function resetPairingsAction() {
  await resetPairings()
  revalidatePath("/pairings")
  revalidatePath("/standings")
}

export async function updatePairingsAction(files: { section: string, txt: string }[]) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const lines = file.txt.split("\n")
    if (!lines[0].includes("Pairings") && !lines[0].includes("Standings")) continue
    await updatePairing(file.section, lines[0], parseTable(lines))
  }
  revalidatePath("/pairings")
  revalidatePath("/standings")
}

function parseTable(table: string[]) {
  const result: { [key: string]: string }[] = []
  const headings: string[] = []

  const headerLine = table[1].trim()
  const headerParts = headerLine.split('\t')

  const headingCount: { [key: string]: number } = {}

  for (let i = 0; i < headerParts.length; i++) {
    const trimmedHeading = headerParts[i].trim();
    if (trimmedHeading) {
      headingCount[trimmedHeading] = (headingCount[trimmedHeading] || 0) + 1
      const uniqueHeading = headingCount[trimmedHeading] > 1
        ? `${trimmedHeading.toLowerCase()}${headingCount[trimmedHeading] - 1}`
        : trimmedHeading.toLowerCase().replace("#", "n").replace(" ", "")
      headings.push(uniqueHeading)
    }
  }

  for (let i = 2; i < table.length; i++) {
    const row = table[i].trim()
    if (row) {
      const rowParts = row.split('\t')
      const pairing: { [key: string]: string } = {}
      rowParts.forEach((value, index) => {
        pairing[headings[index]] = value.trim()
      })
      result.push(pairing)
    }
  }

  return result
}
