import { getPlayer } from "@/db/select"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./checkout-form"
import { getAmount } from "@/lib/utils"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const revalidate = 0

export default async function Checkout({
  params: { CFCId },
}: {
  params: { CFCId: string }
}) {
  const number = Number(CFCId)
  if (Number.isNaN(number)) return notFound()

  const player = await getPlayer(number)
  if (!player) return notFound()
  if (player.hasPaid)
    return (
      <h1 className="text-lg text-center py-4">
        CFC id <b>"{player.CFCId}"</b> is already registered.
      </h1>
    )

  const paymentIntent = await stripe.paymentIntents.create({
    amount: getAmount(player) * 100,
    currency: "CAD",
    metadata: { CFCId: player.CFCId },
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent.")
  }

  return (
    <div className="py-4 px-5 sm:px-10 md:px-20 lg:px-[10vw]">
      <CheckoutForm
        player={player}
        clientSecret={paymentIntent.client_secret}
      />
    </div>
  )
}
