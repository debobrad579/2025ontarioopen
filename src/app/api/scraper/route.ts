import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"

chromium.setHeadlessMode = true

chromium.setGraphicsMode = false

export async function POST(req: Request) {
  const { CFCId } = await req.json()

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH

  const browser = await puppeteer.launch({
    args: isLocal
      ? puppeteer.defaultArgs()
      : [...chromium.args, "--hide-scrollbars", "--incognito", "--no-sandbox"],
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
    headless: chromium.headless,
  })

  const page = await browser.newPage()
  await page.goto(`https://www.chess.ca/en/ratings/p/?id=${CFCId}`)
  await page.waitForSelector("span, .table-container")

  const name = await page.evaluate(
    (element) => element?.textContent,
    await page.$("tbody td")
  )

  const ratingString = await page.evaluate(
    (element) => element?.textContent,
    await page.$("tbody td:nth-child(5)")
  )

  const [lastName, firstName] = name!.split(", ")
  const rating = parseInt(ratingString!.replace("(", "").replace(")", ""))

  await browser.close()

  return Response.json({
    firstName,
    lastName,
    rating,
  })
}
