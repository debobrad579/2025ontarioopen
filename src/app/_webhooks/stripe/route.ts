import { updateHasPaid } from "@/db/update"
import { NextResponse, type NextRequest } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === "charge.succeeded") {
    const charge = event.data.object
    const CFCId = charge.metadata.CFCId
    const email = charge.billing_details.email

    const player = await updateHasPaid(Number(CFCId), true)

    if (player == null || email == null)
      return new NextResponse("Bad Request", { status: 400 })
  }

  return new NextResponse()
}
