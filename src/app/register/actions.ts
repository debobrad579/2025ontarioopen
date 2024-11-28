"use server"

import { createPlayer } from "@/db/insert"
import {
  type FormSchemaKey,
  type FormSchemaType,
  formSchema,
} from "./form-schema"
import { getPlayer } from "@/db/select"
import type { Player } from "@/db/types"
import { JSDOM } from "jsdom"

export async function createPlayerAction(
  values: FormSchemaType
): Promise<
  | { status: "Success" | "Exists"; player: Player }
  | { status: "Error"; field: FormSchemaKey; message: string }
> {
  const validationResults = formSchema.safeParse(values)

  if (!validationResults.success) {
    return {
      status: "Error",
      field: validationResults.error.errors[0].path[0] as FormSchemaKey,
      message: validationResults.error.errors[0].message,
    }
  }

  const existingPlayer = await getPlayer(values.CFCId)

  if (existingPlayer != null) {
    return existingPlayer.hasPaid
      ? {
          status: "Error",
          field: "CFCId",
          message: "Player already registered.",
        }
      : {
          status: "Exists",
          player: existingPlayer,
        }
  }

  try {
    const res = await fetch(
      `https://server.chess.ca/api/player/v1/${values.CFCId}`
    )

    if (!res.ok) {
      return {
        status: "Error",
        field: "CFCId",
        message: "An unknown error occured.",
      }
    }

    const data = await res.json()

    const firstName: string | undefined = data.player.name_first

    if (firstName == null) {
      return {
        status: "Error",
        field: "CFCId",
        message: `CFC id "${values.CFCId}" not found.`,
      }
    }

    const lastName: string = data.player.name_last
    const rating: number = data.player.regular_rating
    const FIDEId: number = data.player.fide_id
    let FIDERating: number | undefined = undefined
    let FIDETitle: string | undefined = undefined

    if (FIDEId) {
      const res = await fetch(`https://ratings.fide.com/profile/${FIDEId}`, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
      })

      if (!res.ok) {
        return {
          status: "Error",
          field: "CFCId",
          message: "An unknown error occured.",
        }
      }

      const html = await res.text()
      const dom = new JSDOM(html)
      const doc = dom.window.document

      const FIDERatingString = doc
        .querySelector(".profile-top-rating-data_gray")
        ?.textContent?.replace(/\D/g, "")
        .trim()

      FIDERating =
        FIDERatingString != null && FIDERatingString !== ""
          ? parseInt(FIDERatingString)
          : undefined

      const node = doc.evaluate(
        '//div[contains(text(), "FIDE title:")]/following-sibling::div',
        doc,
        null,
        dom.window.XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue

      FIDETitle =
        node && node.textContent?.trim() !== "None"
          ? node.textContent?.trim()
          : undefined
    }

    const maxRating = Math.max(rating, FIDERating || 0)

    if (values.isPlayingUp && maxRating >= 2000) {
      return {
        status: "Error",
        field: "isPlayingUp",
        message: "You are already in the top section.",
      }
    }

    if (
      values.isPlayingUp &&
      (maxRating < 1100 ||
        (maxRating >= 1200 && maxRating < 1500) ||
        (maxRating >= 1600 && maxRating < 1900))
    ) {
      return {
        status: "Error",
        field: "isPlayingUp",
        message: "You are not within 100 points of the next section up.",
      }
    }

    const player = await createPlayer({
      CFCId: values.CFCId,
      email: values.email,
      ageRange: values.age,
      isFemale: values.isFemale,
      isPlayingUp: values.isPlayingUp,
      rating,
      firstName,
      lastName,
      FIDERating,
      FIDETitle,
    })

    return {
      status: "Success",
      player,
    }
  } catch {
    return {
      status: "Error",
      field: "CFCId",
      message: "An unknown error occured.",
    }
  }
}
