import { geistMono } from "@/assets/fonts/fonts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllPlayers } from "@/db/select"
import { PaidButton } from "./paid-button"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import {
  formatCapitalized,
  formatCurrency,
  formatDate,
  formatFIDETitle,
} from "@/lib/formatters"
import Stripe from "stripe"
import { UpdateRatingsButton } from "./update-ratings-button"

export const revalidate = 0

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function Admin() {
  const [players, charges, payouts, availableFunds] = await Promise.all([
    getAllPlayers(),
    fetchAllCharges(),
    fetchAllPayouts(),
    fetchAvailableFunds(),
  ])

  return (
    <div className="space-y-4 pb-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-center">
            Registered Players
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-96 overflow-auto p-4">
            <Table className={geistMono.className}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-0"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>CFC Id</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Female</TableHead>
                  <TableHead>Play Up</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>FIDE</TableHead>
                  <TableHead className="text-right">CFC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.CFCId}>
                    <TableCell>
                      <PaidButton player={player} />
                    </TableCell>
                    <TableCell>
                      {player.lastName}, {player.firstName}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://www.chess.ca/en/ratings/p/?id=${player.CFCId}`}
                        target="_blank"
                        className="hover:underline text-blue-500"
                      >
                        {player.CFCId}
                      </a>
                    </TableCell>
                    <TableCell>{player.email}</TableCell>
                    <TableCell>
                      {player.ageRange == "u18"
                        ? "Junior"
                        : player.ageRange == "18to64"
                        ? "Adult"
                        : "Senior"}
                    </TableCell>
                    <TableCell>
                      {player.isFemale ? <CheckIcon /> : <Cross2Icon />}
                    </TableCell>
                    <TableCell>
                      {player.isPlayingUp ? <CheckIcon /> : <Cross2Icon />}
                    </TableCell>
                    <TableCell>
                      {player.FIDETitle
                        ? formatFIDETitle(player.FIDETitle)
                        : "None"}
                    </TableCell>
                    <TableCell>
                      {player.FIDERating ? player.FIDERating : ""}
                    </TableCell>
                    <TableCell className="text-right">
                      {player.rating === 0 ? "Unrated" : player.rating}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
          <UpdateRatingsButton />
        </CardFooter>
      </Card>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-center">
              Stripe Transactions
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ScrollArea className="h-96 overflow-auto p-4">
              <Table className={geistMono.className}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">CFC Id</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charges
                    .filter((charge) => charge.paid && charge.captured)
                    .map(async (charge) => (
                      <TableRow key={charge.id}>
                        <TableCell>
                          {formatCurrency(charge.amount / 100)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(
                            (await fetchNetAmount(charge.balance_transaction)) /
                              100
                          )}
                        </TableCell>
                        <TableCell>
                          {formatCapitalized(
                            charge.payment_method_details?.type ?? ""
                          )}
                          {(charge.payment_method_details?.card?.country !=
                            null ||
                            charge.payment_method_details?.link?.country !=
                              null) &&
                            ` (${
                              charge.payment_method_details.card?.country ??
                              charge.payment_method_details.link?.country
                            })`}
                        </TableCell>
                        <TableCell>{charge.billing_details.email}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={`https://www.chess.ca/en/ratings/p/?id=${charge.metadata.CFCId}`}
                            target="_blank"
                            className="hover:underline text-blue-500"
                          >
                            {charge.metadata.CFCId}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="w-full lg:w-96 shrink-0">
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-center">
              Payouts
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ScrollArea className="h-96 overflow-auto p-4">
              <Table className={geistMono.className}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Arrival Date</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center">Est. Future</TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(availableFunds / 100)}
                    </TableCell>
                  </TableRow>
                  {payouts
                    .filter(
                      (payout) =>
                        payout.status === "paid" ||
                        payout.status === "in_transit"
                    )
                    .map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="text-center">
                          {formatDate(payout.arrival_date)}
                        </TableCell>
                        <TableCell className="text-center">
                          {formatCurrency(payout.amount / 100)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function fetchNetAmount(
  balance_transaction: string | Stripe.BalanceTransaction | null
) {
  if (balance_transaction == null) return 0

  if (typeof balance_transaction !== "string") {
    return balance_transaction.net
  }

  const balanceTransaction = await stripe.balanceTransactions.retrieve(
    balance_transaction
  )

  return balanceTransaction.net
}

async function fetchAllCharges() {
  const charges: Stripe.Charge[] = []
  let hasMore = true
  let startingAfter: string | undefined

  while (hasMore) {
    const response = await stripe.charges.list({
      limit: 100,
      starting_after: startingAfter,
    })
    charges.push(...response.data)
    hasMore = response.has_more
    if (hasMore) {
      startingAfter = response.data[response.data.length - 1].id
    }
  }

  return charges
}

async function fetchAllPayouts() {
  const payouts: Stripe.Payout[] = []
  let hasMore = true
  let startingAfter: string | undefined

  while (hasMore) {
    const response = await stripe.payouts.list({
      limit: 100,
      starting_after: startingAfter,
    })
    payouts.push(...response.data)
    hasMore = response.has_more
    startingAfter = response.data[response.data.length - 1]?.id
  }

  return payouts
}

async function fetchAvailableFunds() {
  const balance = await stripe.balance.retrieve()
  return (
    balance.pending.map((i) => i.amount).reduce((a, b) => a + b) +
    balance.available.map((i) => i.amount).reduce((a, b) => a + b)
  )
}
