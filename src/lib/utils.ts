import type { Player } from "@/db/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatFIDETitle } from "./formatters"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAmount(player: Player) {
  return (
    110 +
    Number(player.isPlayingUp) * 20.0 -
    Math.min(
      Number(player.isFemale) * 10.0 +
        Number(player.ageRange !== "18to64") * 10.0 +
        Number(
          player.FIDETitle != null &&
            player.FIDETitle.includes("FIDE Master") &&
            !player.FIDETitle.includes("Woman FIDE") &&
            !player.FIDETitle.includes("Arena")
        ) *
          10.0,
      20.0
    )
  )
}

export function getsFreeEntry(player: Player) {
  return (
    (player.FIDETitle != null &&
      (player.FIDETitle.includes("Grandmaster") ||
        formatFIDETitle(player.FIDETitle).includes("IM")) &&
      !player.FIDETitle.includes("Arena")) ||
    (player.FIDERating != null && player.FIDERating >= 2400)
  )
}

export function convertMovesToPgn(moves: string[]): string {
  let pgn = ""
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    if (i % 2 === 0) {
      pgn += `${Math.floor(i / 2) + 1}. ${move} `
    } else {
      pgn += `${move} `
    }
  }
  return pgn.trim()
}

export function getMoveNumberArrays(arr: string[]): [string, string][] {
  if (arr.length === 0) {
    return []
  }

  const moveSet: [string, string] = [arr[0] || "", arr[1] || ""]

  return [moveSet, ...getMoveNumberArrays(arr.slice(2))]
}
