import { geistMono } from "@/assets/fonts/fonts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { formatFIDETitle } from "@/lib/formatters"
import Stripe from "stripe"

export const revalidate = 0

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function Admin() {
  const [players, charges] = await Promise.all([
    getAllPlayers(),
    stripe.charges.list(),
  ])

  return (
    <div className="px-5 py-4 sm:px-10 md:px-20 lg:px-[10vw] space-y-4">
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
      </Card>
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
                  <TableHead>Currency</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">CFC Id</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {charges.data
                  .filter((charge) => charge.paid && charge.captured)
                  .map((charge) => (
                    <TableRow key={charge.id}>
                      <TableCell>${(charge.amount / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <NetAmount
                          balance_transaction={charge.balance_transaction}
                        />
                      </TableCell>
                      <TableCell>{charge.currency.toUpperCase()}</TableCell>
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
    </div>
  )
}

async function NetAmount({
  balance_transaction,
}: {
  balance_transaction: string | Stripe.BalanceTransaction | null
}) {
  if (balance_transaction == null) return

  if (typeof balance_transaction !== "string") {
    return `$${(balance_transaction.net / 100).toFixed(2)}`
  }

  const balanceTransaction = await stripe.balanceTransactions.retrieve(
    balance_transaction
  )

  return `$${(balanceTransaction.net / 100).toFixed(2)}`
}
