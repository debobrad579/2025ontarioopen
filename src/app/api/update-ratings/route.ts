import { NextResponse } from "next/server"
import { getAllPlayers } from "@/db/select"
import { updateCFCRating, updateFIDERating } from "@/db/update"
import { revalidatePath } from "next/cache"
import { JSDOM } from "jsdom"

export const revalidate = 0

export async function GET() {
  const players = await getAllPlayers()

  const promises: Promise<void>[] = []

  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    if (!player.hasPaid) continue

    promises.push(
      (async () => {
        try {
          const resCFC = await fetch(
            `https://server.chess.ca/api/player/v1/${player.CFCId}`
          )
          if (!resCFC.ok) return

          const data = await resCFC.json()

          const rating: number = data.player.regular_rating

          if (rating !== player.rating)
            await updateCFCRating(player.CFCId, rating)

          const FIDEId = data.player.fide_id
          if (!FIDEId) return

          const resFIDE = await fetch(
            `https://ratings.fide.com/profile/${FIDEId}`,
            {
              method: "GET",
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
              },
            }
          )
          if (!resFIDE.ok) return

          const html = await resFIDE.text()
          const dom = new JSDOM(html)
          const doc = dom.window.document

          const FIDERatingString = doc
            .querySelector(".profile-top-rating-data_gray")
            ?.textContent?.replace(/\D/g, "")
            .trim()

          const FIDERating =
            FIDERatingString != null && FIDERatingString !== ""
              ? parseInt(FIDERatingString)
              : null

          if (FIDERating !== player.FIDERating)
            await updateFIDERating(player.CFCId, FIDERating)
        } catch (error) {
          console.error(error)
        }
      })()
    )
  }

  await Promise.all(promises)

  revalidatePath("/players")

  return new NextResponse()
}
