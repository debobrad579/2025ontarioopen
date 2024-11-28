"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Player } from "@/db/types"
import { getAmount } from "@/lib/utils"
import { formatCurrency, formatFIDETitle } from "@/lib/formatters"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export function CheckoutForm({
  player,
  clientSecret,
}: {
  player: Player
  clientSecret: string
}) {
  const { theme, systemTheme } = useTheme()
  const isDarkMode =
    theme === "dark" || (theme === "system" && systemTheme === "dark")

  const amount = getAmount(player)

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div>
        <div className="text-lg">{formatCurrency(amount)}</div>
        <div className="text-2xl font-bold">
          Registration - {player.firstName} {player.lastName}
          {player.FIDETitle != null &&
            ` (${formatFIDETitle(player.FIDETitle)})`}
        </div>
        <div className="text-muted-foreground flex gap-3">
          <div>Email: {player.email}</div>
          <div className="flex gap-1 items-center">
            <div>Playing Up:</div>
            {player.isPlayingUp ? <CheckIcon /> : <Cross2Icon />}
          </div>
          <div>
            Birth Year:{" "}
            {player.ageRange === "65up"
              ? "1960 Or Earlier"
              : player.ageRange === "u18"
              ? "2005 Or Later"
              : "1961 – 2005"}
          </div>
          <div className="flex gap-1 items-center">
            <div>Female:</div>
            {player.isFemale ? <CheckIcon /> : <Cross2Icon />}
          </div>
        </div>
      </div>
      <Elements
        options={{
          clientSecret,
          appearance: {
            theme: isDarkMode ? "night" : "stripe",
            variables: isDarkMode
              ? {
                  colorBackground: "hsl(37 74% 5%)",
                  colorText: "hsl(37 5% 97%)",
                  colorTextPlaceholder: "hsl(37 5% 60%)",
                  iconCardCvcColor: "hsl(37 5% 60%)",
                  colorDanger: "hsl(0 100% 30%)",
                }
              : {
                  colorBackground: "hsl(40 89% 90%)",
                  colorText: "hsl(40 5% 15%)",
                  colorTextPlaceholder: "hsl(40 5% 35%)",
                  iconCardCvcColor: "hsl(40 5% 35%)",
                  colorDanger: "hsl(0 100% 30%)",
                },
            rules: isDarkMode
              ? {
                  ".Input": {
                    borderColor: "hsl(37 74% 15%)",
                  },
                  ".Tab": {
                    borderColor: "hsl(37 74% 15%)",
                  },
                }
              : {
                  ".Input": {
                    borderColor: "hsl(40 89% 56%)",
                  },
                  ".Tab": {
                    borderColor: "hsl(40 89% 56%)",
                  },
                },
          },
        }}
        stripe={stripePromise}
      >
        <Form email={player.email} amount={amount} />
      </Elements>
    </div>
  )
}

function Form({ email, amount }: { email: string; amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (stripe == null || elements == null) return
        setIsLoading(true)

        stripe
          .confirmPayment({
            elements,
            confirmParams: {
              payment_method_data: {
                billing_details: { email },
              },
              return_url: `${process.env.NEXT_PUBLIC_URL}/stripe-success`,
            },
          })
          .then(({ error }) => {
            if (
              error.type === "card_error" ||
              error.type === "validation_error"
            ) {
              setErrorMessage(error.message)
            } else {
              setErrorMessage("An unknown error occured.")
            }
          })
          .finally(() => setIsLoading(false))
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full flex gap-2 items-center"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLoading ? "Registering" : `Register - ${formatCurrency(amount)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
