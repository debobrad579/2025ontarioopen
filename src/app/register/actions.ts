"use server"

import chromium from "@sparticuz/chromium-min"
import puppeteer from "puppeteer-core"
import { createPlayer } from "@/db/insert"
import {
  type FormSchemaKey,
  type FormSchemaType,
  formSchema,
} from "./form-schema"
import { getPlayer } from "@/db/select"
import type { Player } from "@/db/types"

chromium.setHeadlessMode = true

chromium.setGraphicsMode = false

export async function createPlayerAction(
  values: FormSchemaType
): Promise<
  | { status: "Success"; player: Player }
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

  const player = await getPlayer(values.CFCId)

  if (player != null) {
    return {
      status: "Error",
      field: "CFCId",
      message: "CFC id has already been submitted.",
    }
  }

  let browser = null

  try {
    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        "--hide-scrollbars",
        "--incognito",
        "--no-sandbox",
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        process.env.S3_CHROMIUM_URL
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
    const page = await browser.newPage()
    await page.goto(`https://www.chess.ca/en/ratings/p/?id=${values.CFCId}`)
    await page.waitForSelector("span, .table-container")

    const name = await page.$eval("tbody td", (el) => el?.textContent?.trim())

    if (name == null) {
      return {
        status: "Error",
        field: "CFCId",
        message: `CFC id "${values.CFCId}" not found.`,
      }
    }

    const ratingString = await page.$eval("tbody td:nth-child(5)", (el) =>
      el?.textContent?.trim()
    )

    if (ratingString == null) {
      return {
        status: "Error",
        field: "CFCId",
        message: `CFC id "${values.CFCId}" not found.`,
      }
    }

    const [lastName, firstName] = name.split(", ")
    const rating = parseInt(ratingString.replace(/\D/g, ""))

    const FIDEId = await page.$eval("tbody td:nth-child(9)", (el) =>
      el?.textContent?.trim()
    )

    let FIDERating = null
    let FIDETitle = null

    if (FIDEId) {
      await page.setJavaScriptEnabled(false)
      await page.goto(`https://ratings.fide.com/profile/${FIDEId}`, {
        waitUntil: "load",
      })

      const FIDERatingString = await page.$eval(
        ".profile-top-rating-data_gray",
        (el) => el?.textContent?.replace(/\D/g, "").trim()
      )

      FIDERating =
        FIDERatingString != null && FIDERatingString !== ""
          ? parseInt(FIDERatingString)
          : null

      FIDETitle = await page.evaluate(() => {
        const node = document.evaluate(
          '//div[contains(text(), "FIDE title:")]/following-sibling::div',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue

        if (!node) return null

        return node && node.textContent?.trim() !== "None"
          ? node.textContent?.trim()
          : null
      })
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

    return { status: "Success", player }
  } catch (error) {
    console.log(error)
    return {
      status: "Error",
      field: "CFCId",
      message: "An unknown error occured.",
    }
  } finally {
    if (browser !== null) await browser.close()
  }
}
