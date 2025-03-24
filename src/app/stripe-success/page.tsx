import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getPlayer } from "@/db/select"
import { formatCurrency, formatFIDETitle } from "@/lib/formatters"
import { Cross2Icon } from "@radix-ui/react-icons"
import { CheckIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function StripeSuccess({
  searchParams,
}: {
  searchParams: { payment_intent: string }
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )

  if (paymentIntent.metadata.CFCId == null) return notFound()

  const player = await getPlayer(Number(paymentIntent.metadata.CFCId))

  if (!player) return notFound()

  return (
    <>
      {paymentIntent.status === "succeeded" ? (
        <h1 className="text-4xl font-bold">Success!</h1>
      ) : (
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Error!</h1>
          <Button asChild>
            <Link href={`/register/${player.CFCId}/checkout`}>Try Again</Link>
          </Button>
        </div>
      )}
      <Separator className="my-3" />
      <div className="text-lg">
        {formatCurrency(paymentIntent.amount / 100)}
      </div>
      <div className="text-2xl font-bold">
        Registration - {player.firstName} {player.lastName}
        {player.FIDETitle != null && ` (${formatFIDETitle(player.FIDETitle)})`}
      </div>
      <div className="text-muted-foreground flex flex-wrap gap-1">
        <div className="pr-3">Email: {player.email}</div>
        <div className="flex gap-1 items-center pr-3">
          <div>Playing Up:</div>
          {player.isPlayingUp ? <CheckIcon /> : <Cross2Icon />}
        </div>
        <div className="pr-3">
          Birth Year:{" "}
          {player.ageRange === "65up"
            ? "1960 Or Earlier"
            : player.ageRange === "u18"
            ? "2005 Or Later"
            : "1961 – 2005"}
        </div>
        <div className="flex gap-1 items-center pr-3">
          <div>Female:</div>
          {player.isFemale ? <CheckIcon /> : <Cross2Icon />}
        </div>
      </div>
    </>
  )
}
