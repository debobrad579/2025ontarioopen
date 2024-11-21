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

chromium.setHeadlessMode = true

chromium.setGraphicsMode = false

export async function createPlayerAction(
  values: FormSchemaType
): Promise<
  | { status: "Success"; name: string; rating: number }
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

    const name = await page.evaluate(
      (element) => element?.textContent,
      await page.$("tbody td")
    )

    if (name == null) {
      return {
        status: "Error",
        field: "CFCId",
        message: `CFC id "${values.CFCId}" not found.`,
      }
    }

    const ratingString = await page.evaluate(
      (element) => element?.textContent,
      await page.$("tbody td:nth-child(5)")
    )

    if (ratingString == null) {
      return {
        status: "Error",
        field: "CFCId",
        message: `CFC id "${values.CFCId}" not found.`,
      }
    }

    const [lastName, firstName] = name.split(", ")
    const rating = parseInt(ratingString.replace("(", "").replace(")", ""))

    if (
      values.isPlayingUp &&
      (rating < 1100 ||
        (rating >= 1200 && rating < 1500) ||
        (rating >= 1600 && rating < 1900))
    ) {
      return {
        status: "Error",
        field: "isPlayingUp",
        message: "You are not within 100 points of the next section up.",
      }
    }

    if (values.isPlayingUp && rating >= 2000) {
      return {
        status: "Error",
        field: "isPlayingUp",
        message: "You are already in the top section.",
      }
    }

    await createPlayer({
      CFCId: values.CFCId,
      rating: rating,
      firstName: firstName,
      lastName: lastName,
      email: values.email,
      ageRange: values.age,
      isFemale: values.isFemale,
      isPlayingUp: values.isPlayingUp,
      isFIDEMaster: values.isFIDEMaster,
    })

    return { status: "Success", name: `${firstName} ${lastName}`, rating }
  } catch {
    return {
      status: "Error",
      field: "CFCId",
      message: "Unknown error occured",
    }
  } finally {
    if (browser !== null) await browser.close()
  }
}
